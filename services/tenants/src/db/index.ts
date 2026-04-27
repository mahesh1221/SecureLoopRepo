import { createDbClient, type DbClient } from '@secureloop/db';
import * as schema from '../schema';

let cached: DbClient | undefined;

export function getDb(connectionString: string): DbClient {
  if (!cached) {
    cached = createDbClient({ connectionString });
  }
  return cached;
}

export { schema };
