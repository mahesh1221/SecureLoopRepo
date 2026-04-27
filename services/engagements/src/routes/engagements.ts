import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireAuth, requireRole } from '@secureloop/auth-client';

const StatusEnum = z.enum([
  'draft',
  'quoted',
  'signed',
  'in-progress',
  'reporting',
  'delivered',
  'closed',
]);

const CreateEngagementSchema = z.object({
  customerName: z.string().min(1),
  customerTenantId: z.string().uuid(),
  scope: z.object({
    assetIds: z.array(z.string().uuid()).default([]),
    frameworks: z.array(z.string()).default([]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
  team: z.array(z.string().uuid()).default([]),
  quote: z
    .object({
      amount: z.number().nonnegative(),
      currency: z.string().length(3),
    })
    .optional(),
});

const UpdateEngagementSchema = CreateEngagementSchema.partial().extend({
  status: StatusEnum.optional(),
});

export async function engagementRoutes(fastify: FastifyInstance) {
  fastify.get('/', { preHandler: requireAuth() }, async (_request, reply) => {
    return reply.send({ data: [], total: 0, page: 1, pageSize: 50 });
  });

  fastify.post('/', { preHandler: requireRole('DM', 'ADMIN') }, async (request, reply) => {
    const body = CreateEngagementSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    return reply.status(201).send({
      id: crypto.randomUUID(),
      tenantId: request.auth!.tenantId,
      ...body.data,
      status: 'draft',
      createdBy: request.auth!.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });

  fastify.get('/:id', { preHandler: requireAuth() }, async (request, reply) => {
    const { id } = request.params as { id: string };
    return reply.status(404).send({ error: 'Not found', id });
  });

  fastify.patch('/:id', { preHandler: requireRole('DM', 'ADMIN') }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = UpdateEngagementSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    return reply.send({ id, ...body.data, updatedAt: new Date().toISOString() });
  });
}
