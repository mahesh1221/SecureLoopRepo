import type { FastifyInstance } from 'fastify';
import { requireAuth } from '@secureloop/auth-client';

export async function sessionRoutes(fastify: FastifyInstance) {
  fastify.get('/me', { preHandler: requireAuth() }, async (request) => {
    return request.auth;
  });

  fastify.post('/logout', { preHandler: requireAuth() }, async (_request, reply) => {
    // Stub: real revocation pending session store. Client should drop the token locally.
    return reply.send({ ok: true });
  });
}
