import Fastify from 'fastify';
import cors from '@fastify/cors';
import { tenantRoutes } from './routes/tenants';
import { frameworkRoutes } from './routes/frameworks';
import { platformRoutes } from './routes/platform';

const server = Fastify({ logger: true });

const start = async () => {
  await server.register(cors, { origin: true });
  await server.register(tenantRoutes, { prefix: '/tenants' });
  await server.register(frameworkRoutes, { prefix: '/tenants' });
  await server.register(platformRoutes, { prefix: '/platform' });

  const port = Number(process.env['PORT'] ?? 3001);
  await server.listen({ port, host: '0.0.0.0' });
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
