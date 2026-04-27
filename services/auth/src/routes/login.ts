import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { verify as argon2Verify } from '@node-rs/argon2';
import { signAccessToken, type Role } from '@secureloop/auth-client';
import type { UsersRepository } from '../repositories/users';
import type { AuthServiceConfig } from '../config';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const RefreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export function loginRoutes(
  fastify: FastifyInstance,
  usersRepo: UsersRepository,
  config: AuthServiceConfig,
) {
  fastify.post('/login', async (request, reply) => {
    const body = LoginSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }

    const user = await usersRepo.findByEmail(body.data.email);
    if (!user || !user.active) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const ok = await argon2Verify(user.passwordHash, body.data.password);
    if (!ok) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const roles = user.roles as Role[];
    const accessToken = signAccessToken(
      { userId: user.id, tenantId: user.tenantId, email: user.email, roles },
      {
        secret: config.JWT_SECRET,
        issuer: config.JWT_ISSUER,
        audience: config.JWT_AUDIENCE,
        expiresIn: '1h',
      },
    );

    await usersRepo.recordLogin(user.id);

    return reply.send({
      accessToken,
      tokenType: 'Bearer',
      expiresIn: 3600,
      user: { id: user.id, email: user.email, tenantId: user.tenantId, roles },
    });
  });

  fastify.post('/refresh', async (request, reply) => {
    const body = RefreshSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }
    return reply.status(501).send({
      error: 'Not implemented',
      detail: 'Refresh-token rotation pending session store (Redis).',
    });
  });
}
