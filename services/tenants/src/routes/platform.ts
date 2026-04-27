import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireRole } from '@secureloop/auth-client';
import type { PlatformRepository } from '../repositories/platform';

const SlaSchema = z.object({
  critical: z.number().int().positive(),
  high: z.number().int().positive(),
  medium: z.number().int().positive(),
  low: z.number().int().positive(),
});

const EscalationStepSchema = z.object({
  level: z.number().int().positive(),
  delayHours: z.number().int().nonnegative(),
  notifyRoles: z.array(z.string().min(1)).min(1),
});

const AccessPoliciesSchema = z.object({
  mfaRequired: z.boolean(),
  sessionTimeout: z.enum(['standard', 'strict']),
  apiAccess: z.boolean(),
});

const DefaultsSchema = z.object({
  sla: SlaSchema.optional(),
  escalation: z.array(EscalationStepSchema).optional(),
  accessPolicies: AccessPoliciesSchema.optional(),
});

const IntegrationUpdateSchema = z.object({
  id: z.string().min(1),
  category: z.string().min(1),
  enabled: z.boolean(),
  config: z.record(z.unknown()).optional(),
});

export function platformRoutes(fastify: FastifyInstance, repo: PlatformRepository) {
  fastify.get('/defaults', { preHandler: requireRole('ADMIN') }, async (_request, reply) => {
    const row = await repo.getDefaults();
    return reply.send(row);
  });

  fastify.put('/defaults', { preHandler: requireRole('ADMIN') }, async (request, reply) => {
    const body = DefaultsSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    const updated = await repo.updateDefaults({
      ...(body.data.sla ? { sla: body.data.sla } : {}),
      ...(body.data.escalation ? { escalation: body.data.escalation } : {}),
      ...(body.data.accessPolicies ? { accessPolicies: body.data.accessPolicies } : {}),
    });
    return reply.send(updated);
  });

  fastify.get(
    '/integrations',
    { preHandler: requireRole('ADMIN', 'IE') },
    async (_request, reply) => {
      const data = await repo.listIntegrations();
      return reply.send({ data, total: data.length });
    },
  );

  fastify.put(
    '/integrations',
    { preHandler: requireRole('ADMIN', 'IE') },
    async (request, reply) => {
      const body = z.array(IntegrationUpdateSchema).safeParse(request.body);
      if (!body.success) {
        return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
      }
      const results = await Promise.all(
        body.data.map((item) =>
          repo.upsertIntegration({
            id: item.id,
            category: item.category,
            enabled: item.enabled,
            ...(item.config ? { config: item.config } : {}),
          }),
        ),
      );
      return reply.send({ updated: results.length, data: results });
    },
  );

  fastify.get('/health', { preHandler: requireRole('ADMIN') }, async (_request, reply) => {
    return reply.send({
      status: 'operational',
      uptime: 99.97,
      lastCheck: new Date().toISOString(),
      nextCheck: new Date(Date.now() + 60_000).toISOString(),
      services: {
        api: 'healthy',
        database: 'healthy',
        integrations: 'degraded',
        sessions: 'healthy',
      },
    });
  });

  fastify.get(
    '/health/tenants/:id',
    { preHandler: requireRole('ADMIN') },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      return reply.send({
        tenantId: id,
        status: 'operational',
        affectedServices: [],
        lastIncident: null,
      });
    },
  );
}
