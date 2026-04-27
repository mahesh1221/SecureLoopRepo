import type { FastifyInstance } from 'fastify';

export async function samlRoutes(fastify: FastifyInstance) {
  fastify.post('/:tenant/sso', async (request, reply) => {
    const { tenant } = request.params as { tenant: string };
    return reply.status(501).send({
      error: 'Not implemented',
      detail: 'SAML 2.0 SP-initiated SSO ACS pending IdP metadata exchange (ADMIN-04).',
      tenant,
    });
  });

  fastify.get('/:tenant/metadata', async (request, reply) => {
    const { tenant } = request.params as { tenant: string };
    return reply.status(501).send({
      error: 'Not implemented',
      detail: 'SP metadata XML generation pending signing certificate provisioning.',
      tenant,
    });
  });
}
