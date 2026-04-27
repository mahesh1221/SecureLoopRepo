import Fastify from 'fastify';
import cors from '@fastify/cors';
import { authPlugin } from '@secureloop/auth-client';
import { loadConfig } from './config';
import { findingRoutes } from './routes/findings';

const config = loadConfig();
const server = Fastify({ logger: true });

const start = async () => {
  await server.register(cors, { origin: true });
  await server.register(authPlugin, {
    secret: config.JWT_SECRET,
    issuer: config.JWT_ISSUER,
    audience: config.JWT_AUDIENCE,
    publicPaths: ['/health'],
  });

  server.get('/health', async () => ({ status: 'ok', service: 'findings' }));

  await server.register(findingRoutes, { prefix: '/findings' });

  await server.listen({ port: config.PORT, host: '0.0.0.0' });
};

start().catch((err) => {
  server.log.error(err);
  process.exit(1);
});
