import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'node:path';
import { createDbClient, runMigrations, closeDbClient } from '@secureloop/db';

// Load .env from repo root — pnpm runs scripts in the service cwd, so a bare
// `dotenv/config` would miss the monorepo-level .env.
dotenvConfig({ path: resolve(__dirname, '../../../../.env') });

async function main() {
  const url = process.env['DATABASE_URL_AUTH'];
  if (!url) {
    console.error('✗ DATABASE_URL_AUTH env var is required');
    process.exit(1);
  }

  const client = createDbClient({ connectionString: url, max: 1 });
  try {
    await runMigrations(client, {
      migrationsFolder: resolve(__dirname, '../../migrations'),
    });
    console.error('✓ auth migrations applied');
  } finally {
    await closeDbClient(client);
  }
}

main().catch((err) => {
  console.error('✗ migration failed:', err);
  process.exit(1);
});
