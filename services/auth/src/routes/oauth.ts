import type { FastifyInstance } from 'fastify';

const SUPPORTED = new Set(['google', 'microsoft', 'okta']);

export async function oauthRoutes(fastify: FastifyInstance) {
  fastify.get('/:provider/start', async (request, reply) => {
    const { provider } = request.params as { provider: string };
    if (!SUPPORTED.has(provider)) {
      return reply.status(404).send({ error: `Unknown OAuth provider: ${provider}` });
    }
    return reply.status(501).send({
      error: 'Not implemented',
      detail: 'OAuth 2.0 authorization-code flow pending IdP credential configuration (ADMIN-04).',
      provider,
    });
  });

  fastify.get('/:provider/callback', async (request, reply) => {
    const { provider } = request.params as { provider: string };
    if (!SUPPORTED.has(provider)) {
      return reply.status(404).send({ error: `Unknown OAuth provider: ${provider}` });
    }
    return reply.status(501).send({
      error: 'Not implemented',
      detail: 'OAuth callback pending provider client config.',
      provider,
    });
  });
}
