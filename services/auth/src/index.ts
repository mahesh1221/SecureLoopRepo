import Fastify from 'fastify';
import cors from '@fastify/cors';
import { authPlugin } from '@secureloop/auth-client';
import { loadConfig } from './config';
import { loginRoutes } from './routes/login';
import { oauthRoutes } from './routes/oauth';
import { samlRoutes } from './routes/saml';
import { sessionRoutes } from './routes/session';

const config = loadConfig();
const server = Fastify({ logger: true });

const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/refresh',
  '/auth/oauth/:provider/start',
  '/auth/oauth/:provider/callback',
  '/auth/saml/:tenant/sso',
  '/auth/saml/:tenant/metadata',
  '/health',
];

const start = async () => {
  await server.register(cors, { origin: true });
  await server.register(authPlugin, {
    secret: config.JWT_SECRET,
    issuer: config.JWT_ISSUER,
    audience: config.JWT_AUDIENCE,
    publicPaths: PUBLIC_PATHS,
  });

  server.get('/health', async () => ({ status: 'ok', service: 'auth' }));

  await server.register(loginRoutes, { prefix: '/auth' });
  await server.register(sessionRoutes, { prefix: '/auth' });
  await server.register(oauthRoutes, { prefix: '/auth/oauth' });
  await server.register(samlRoutes, { prefix: '/auth/saml' });

  await server.listen({ port: config.PORT, host: '0.0.0.0' });
};

start().catch((err) => {
  server.log.error(err);
  process.exit(1);
});
