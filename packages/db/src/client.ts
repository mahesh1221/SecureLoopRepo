import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export interface DbClientConfig {
  connectionString: string;
  /** Connection-pool max size. Default 10. */
  max?: number;
  /** Idle timeout in seconds. Default 20. */
  idleTimeout?: number;
  /** Verbose logging. Default false. */
  debug?: boolean;
}

export type DbConnection = ReturnType<typeof postgres>;

export interface DbClient {
  db: ReturnType<typeof drizzle>;
  connection: DbConnection;
}

export function createDbClient(config: DbClientConfig): DbClient {
  const connection = postgres(config.connectionString, {
    max: config.max ?? 10,
    idle_timeout: config.idleTimeout ?? 20,
    debug: config.debug ?? false,
  });
  const db = drizzle(connection);
  return { db, connection };
}

export async function closeDbClient(client: DbClient): Promise<void> {
  await client.connection.end({ timeout: 5 });
}
