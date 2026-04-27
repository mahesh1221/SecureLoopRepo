import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireRole, requireAuth } from '@secureloop/auth-client';
import type { FrameworksRepository } from '../repositories/frameworks';

const UpdateFrameworkSchema = z.object({
  enabled: z.boolean(),
  autoMap: z.boolean().default(true),
});

export function frameworkRoutes(fastify: FastifyInstance, repo: FrameworksRepository) {
  fastify.patch(
    '/:id/frameworks/:fwId',
    { preHandler: requireRole('ADMIN', 'SENG') },
    async (request, reply) => {
      const { id, fwId } = request.params as { id: string; fwId: string };
      const body = UpdateFrameworkSchema.safeParse(request.body);
      if (!body.success) {
        return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
      }
      const result = await repo.upsert(id, fwId, {
        enabled: body.data.enabled,
        autoMap: body.data.autoMap,
      });
      return reply.send(result);
    },
  );

  fastify.get('/:id/frameworks', { preHandler: requireAuth() }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = await repo.listForTenant(id);
    return reply.send({ data });
  });

  fastify.get(
    '/:id/frameworks/:fwId/status',
    { preHandler: requireAuth() },
    async (request, reply) => {
      const { id, fwId } = request.params as { id: string; fwId: string };
      const row = await repo.findOne(id, fwId);
      if (!row) {
        return reply.status(404).send({ error: 'Framework not configured for tenant', id, fwId });
      }
      return reply.send({
        tenantId: row.tenantId,
        frameworkId: row.frameworkId,
        status: row.status,
        mappedControls: row.mappedControls,
        totalControls: row.totalControls,
        progress:
          row.totalControls > 0 ? Math.round((row.mappedControls / row.totalControls) * 100) : 0,
        lastSync: row.lastSync,
      });
    },
  );
}
