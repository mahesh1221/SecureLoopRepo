import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { authPlugin } from '@secureloop/auth-client';
import { resolve } from 'node:path';
import { createDbClient, runMigrations } from '@secureloop/db';
import { loadConfig } from './config';
import { TenantsRepository } from './repositories/tenants';
import { FrameworksRepository } from './repositories/frameworks';
import { PlatformRepository } from './repositories/platform';
import { tenantRoutes } from './routes/tenants';
import { frameworkRoutes } from './routes/frameworks';
import { platformRoutes } from './routes/platform';

const config = loadConfig();
const server = Fastify({ logger: true });

const start = async () => {
  const dbClient = createDbClient({ connectionString: config.DATABASE_URL_TENANTS });

  if (process.env['RUN_MIGRATIONS_ON_BOOT'] !== 'false') {
    await runMigrations(dbClient, {
      migrationsFolder: resolve(__dirname, '../migrations'),
    });
  }

  const repos = {
    tenants: new TenantsRepository(dbClient),
    frameworks: new FrameworksRepository(dbClient),
    platform: new PlatformRepository(dbClient),
  };

  await server.register(cors, { origin: true });
  await server.register(authPlugin, {
    secret: config.JWT_SECRET,
    issuer: config.JWT_ISSUER,
    audience: config.JWT_AUDIENCE,
    publicPaths: ['/health'],
  });

  server.get('/health', async () => ({ status: 'ok', service: 'tenants' }));

  await server.register(
    (instance, _opts, done) => {
      tenantRoutes(instance, repos.tenants);
      done();
    },
    { prefix: '/tenants' },
  );

  await server.register(
    (instance, _opts, done) => {
      frameworkRoutes(instance, repos.frameworks);
      done();
    },
    { prefix: '/tenants' },
  );

  await server.register(
    (instance, _opts, done) => {
      platformRoutes(instance, repos.platform);
      done();
    },
    { prefix: '/platform' },
  );

  await server.listen({ port: config.PORT, host: '0.0.0.0' });
};

start().catch((err) => {
  server.log.error(err);
  process.exit(1);
});
