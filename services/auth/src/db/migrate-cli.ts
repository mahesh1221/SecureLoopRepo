import 'dotenv/config';
import { resolve } from 'node:path';
import { createDbClient, runMigrations, closeDbClient } from '@secureloop/db';

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
