import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'node:path';
dotenvConfig({ path: resolve(__dirname, '../../../.env') });

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createDbClient, runMigrations } from '@secureloop/db';
import { authPlugin } from '@secureloop/auth-client';
import { loadConfig } from './config';
import { UsersRepository } from './repositories/users';
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
  const dbClient = createDbClient({ connectionString: config.DATABASE_URL_AUTH });

  if (process.env['RUN_MIGRATIONS_ON_BOOT'] !== 'false') {
    await runMigrations(dbClient, {
      migrationsFolder: resolve(__dirname, '../migrations'),
    });
  }

  const usersRepo = new UsersRepository(dbClient);

  await server.register(cors, { origin: true });
  await server.register(authPlugin, {
    secret: config.JWT_SECRET,
    issuer: config.JWT_ISSUER,
    audience: config.JWT_AUDIENCE,
    publicPaths: PUBLIC_PATHS,
  });

  server.get('/health', async () => ({ status: 'ok', service: 'auth' }));

  await server.register(
    (instance, _opts, done) => {
      loginRoutes(instance, usersRepo, config);
      done();
    },
    { prefix: '/auth' },
  );

  await server.register(sessionRoutes, { prefix: '/auth' });
  await server.register(oauthRoutes, { prefix: '/auth/oauth' });
  await server.register(samlRoutes, { prefix: '/auth/saml' });

  await server.listen({ port: config.PORT, host: '0.0.0.0' });
};

start().catch((err) => {
  server.log.error(err);
  process.exit(1);
});
