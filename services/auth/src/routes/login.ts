import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { signAccessToken, type Role } from '@secureloop/auth-client';
import { loadConfig } from '../config';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const RefreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export async function loginRoutes(fastify: FastifyInstance) {
  const config = loadConfig();

  fastify.post('/login', async (request, reply) => {
    const body = LoginSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }

    // Stub: real credential verification pending users service + DB.
    // For dev, issue a token with ADMIN role for any well-formed request.
    const claims = {
      userId: 'dev-user-1',
      tenantId: 'dev-tenant-1',
      email: body.data.email,
      roles: ['ADMIN'] as Role[],
    };

    const accessToken = signAccessToken(claims, {
      secret: config.JWT_SECRET,
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE,
      expiresIn: '1h',
    });

    return reply.send({
      accessToken,
      tokenType: 'Bearer',
      expiresIn: 3600,
      user: { id: claims.userId, email: claims.email, tenantId: claims.tenantId, roles: claims.roles },
    });
  });

  fastify.post('/refresh', async (request, reply) => {
    const body = RefreshSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    return reply.status(501).send({ error: 'Not implemented', detail: 'Refresh-token rotation pending session store (Redis).' });
  });
}
