import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireRole } from '@secureloop/auth-client';

const CreateTenantSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  industry: z.string().optional(),
  country: z.string().optional(),
  plan: z.enum(['starter', 'pro', 'enterprise']).default('starter'),
  frameworks: z.array(z.string()).default([]),
  sla: z
    .object({
      critical: z.number().default(4),
      high: z.number().default(24),
      medium: z.number().default(72),
      low: z.number().default(168),
    })
    .optional(),
  adminUser: z
    .object({
      name: z.string(),
      email: z.string().email(),
    })
    .optional(),
});

const CloneTenantSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  cloneFrameworks: z.boolean().default(true),
  cloneSla: z.boolean().default(true),
});

export async function tenantRoutes(fastify: FastifyInstance) {
  fastify.post('/', { preHandler: requireRole('ADMIN') }, async (request, reply) => {
    const body = CreateTenantSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    const tenant = {
      id: crypto.randomUUID(),
      ...body.data,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return reply.status(201).send(tenant);
  });

  fastify.get('/', { preHandler: requireRole('ADMIN', 'DM') }, async (_request, reply) => {
    return reply.send({
      data: [],
      total: 0,
      page: 1,
      pageSize: 50,
    });
  });

  fastify.post('/:id/clone', { preHandler: requireRole('ADMIN') }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = CloneTenantSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    const cloned = {
      id: crypto.randomUUID(),
      sourceId: id,
      ...body.data,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return reply.status(201).send(cloned);
  });
}
