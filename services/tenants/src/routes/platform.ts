import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireRole } from '@secureloop/auth-client';

const DefaultsSchema = z.object({
  sla: z
    .object({
      critical: z.number().default(4),
      high: z.number().default(24),
      medium: z.number().default(72),
      low: z.number().default(168),
    })
    .optional(),
  escalation: z
    .array(
      z.object({
        level: z.number(),
        delayHours: z.number(),
        notifyRoles: z.array(z.string()),
      })
    )
    .optional(),
  accessPolicies: z
    .object({
      mfaRequired: z.boolean().default(true),
      sessionTimeout: z.enum(['standard', 'strict']).default('standard'),
      apiAccess: z.boolean().default(true),
    })
    .optional(),
});

const IntegrationUpdateSchema = z.object({
  enabled: z.boolean(),
  config: z.record(z.unknown()).optional(),
});

export async function platformRoutes(fastify: FastifyInstance) {
  fastify.get('/defaults', { preHandler: requireRole('ADMIN') }, async (_request, reply) => {
    return reply.send({
      sla: { critical: 4, high: 24, medium: 72, low: 168 },
      escalation: [
        { level: 1, delayHours: 0, notifyRoles: ['security-engineer'] },
        { level: 2, delayHours: 24, notifyRoles: ['delivery-manager'] },
        { level: 3, delayHours: 72, notifyRoles: ['ciso'] },
        { level: 4, delayHours: 168, notifyRoles: ['business-owner'] },
      ],
      accessPolicies: {
        mfaRequired: true,
        sessionTimeout: 'standard',
        apiAccess: true,
      },
    });
  });

  fastify.put('/defaults', { preHandler: requireRole('ADMIN') }, async (request, reply) => {
    const body = DefaultsSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    return reply.send({ ...body.data, updatedAt: new Date().toISOString() });
  });

  fastify.get('/integrations', { preHandler: requireRole('ADMIN', 'IE') }, async (_request, reply) => {
    return reply.send({ data: [], total: 0 });
  });

  fastify.put('/integrations', { preHandler: requireRole('ADMIN', 'IE') }, async (request, reply) => {
    const body = z.array(IntegrationUpdateSchema).safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    return reply.send({ updated: body.data.length, updatedAt: new Date().toISOString() });
  });

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

  fastify.get('/health/tenants/:id', { preHandler: requireRole('ADMIN') }, async (request, reply) => {
    const { id } = request.params as { id: string };
    return reply.send({
      tenantId: id,
      status: 'operational',
      affectedServices: [],
      lastIncident: null,
    });
  });
}
