import fp from 'fastify-plugin';
import type { FastifyPluginAsync, FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify';
import { verifyAccessToken } from './jwt';
import type { AuthPluginOptions, Role } from './types';

const plugin: FastifyPluginAsync<AuthPluginOptions> = async (fastify, opts) => {
  const publicPaths = new Set(opts.publicPaths ?? []);

  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    if (publicPaths.has(request.routerPath ?? request.url)) {
      return;
    }

    const header = request.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'Missing or malformed Authorization header' });
    }

    const token = header.slice('Bearer '.length).trim();
    try {
      const claims = verifyAccessToken(token, {
        secret: opts.secret,
        ...(opts.issuer ? { issuer: opts.issuer } : {}),
        ...(opts.audience ? { audience: opts.audience } : {}),
      });
      request.auth = {
        userId: claims.sub,
        tenantId: claims.tenantId,
        email: claims.email,
        roles: claims.roles,
      };
    } catch {
      return reply.status(401).send({ error: 'Invalid or expired token' });
    }
  });
};

export const authPlugin = fp(plugin, { name: '@secureloop/auth-client' });

export function requireAuth(): preHandlerHookHandler {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.auth) {
      return reply.status(401).send({ error: 'Authentication required' });
    }
  };
}

export function requireRole(...allowed: Role[]): preHandlerHookHandler {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.auth) {
      return reply.status(401).send({ error: 'Authentication required' });
    }
    const has = request.auth.roles.some((r) => allowed.includes(r));
    if (!has) {
      return reply.status(403).send({ error: 'Insufficient role', required: allowed });
    }
  };
}

