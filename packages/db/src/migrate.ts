import { migrate } from 'drizzle-orm/postgres-js/migrator';
import type { DbClient } from './client';

export interface RunMigrationsConfig {
  /** Filesystem path to the service's `migrations/` folder. */
  migrationsFolder: string;
  /** Schema/table to record migration history in. Defaults to `drizzle.__drizzle_migrations`. */
  migrationsTable?: string;
  migrationsSchema?: string;
}

export async function runMigrations(client: DbClient, config: RunMigrationsConfig): Promise<void> {
  await migrate(client.db, {
    migrationsFolder: config.migrationsFolder,
    ...(config.migrationsTable ? { migrationsTable: config.migrationsTable } : {}),
    ...(config.migrationsSchema ? { migrationsSchema: config.migrationsSchema } : {}),
  });
}
