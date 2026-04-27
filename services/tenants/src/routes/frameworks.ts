import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireRole, requireAuth } from '@secureloop/auth-client';

const UpdateFrameworkSchema = z.object({
  enabled: z.boolean(),
  autoMap: z.boolean().default(true),
});

export async function frameworkRoutes(fastify: FastifyInstance) {
  fastify.patch(
    '/:id/frameworks/:fwId',
    { preHandler: requireRole('ADMIN', 'SENG') },
    async (request, reply) => {
      const { id, fwId } = request.params as { id: string; fwId: string };
      const body = UpdateFrameworkSchema.safeParse(request.body);
      if (!body.success) {
        return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
      }
      return reply.send({
        tenantId: id,
        frameworkId: fwId,
        ...body.data,
        status: body.data.enabled ? 'processing' : 'disabled',
        updatedAt: new Date().toISOString(),
      });
    },
  );

  fastify.get(
    '/:id/frameworks/:fwId/status',
    { preHandler: requireAuth() },
    async (request, reply) => {
      const { id, fwId } = request.params as { id: string; fwId: string };
      return reply.send({
        tenantId: id,
        frameworkId: fwId,
        status: 'enabled',
        mappedControls: 0,
        totalControls: 0,
        progress: 100,
        lastSync: new Date().toISOString(),
      });
    },
  );
}
