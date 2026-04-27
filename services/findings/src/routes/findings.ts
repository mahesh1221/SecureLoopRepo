import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireAuth, requireRole } from '@secureloop/auth-client';

const SeverityEnum = z.enum(['critical', 'high', 'medium', 'low', 'info']);
const StatusEnum = z.enum(['draft', 'pending-review', 'confirmed', 'fixed', 'risk-accepted', 'closed']);

const CreateFindingSchema = z.object({
  engagementId: z.string().uuid(),
  assetId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  severity: SeverityEnum,
  cvssVector: z.string().optional(),
  cvssScore: z.number().min(0).max(10).optional(),
  cwe: z.string().optional(),
  evidence: z.array(z.string()).default([]),
  scannerSource: z.string().optional(),
});

const UpdateFindingSchema = CreateFindingSchema.partial().extend({
  status: StatusEnum.optional(),
});

export async function findingRoutes(fastify: FastifyInstance) {
  fastify.get('/', { preHandler: requireAuth() }, async (_request, reply) => {
    return reply.send({ data: [], total: 0, page: 1, pageSize: 50 });
  });

  fastify.post('/', { preHandler: requireRole('TSTR', 'SENG', 'ADMIN') }, async (request, reply) => {
    const body = CreateFindingSchema.safeParse(request.body);
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

  fastify.patch('/:id', { preHandler: requireRole('TSTR', 'SENG', 'DM', 'ADMIN') }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = UpdateFindingSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    return reply.send({ id, ...body.data, updatedAt: new Date().toISOString() });
  });
}
