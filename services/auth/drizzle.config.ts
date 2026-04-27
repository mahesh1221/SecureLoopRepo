import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const url = process.env['DATABASE_URL_AUTH'];
if (!url) {
  throw new Error('DATABASE_URL_AUTH env var is required to run drizzle-kit');
}

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
