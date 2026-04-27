/**
 * Seed script — creates a default admin user + one demo tenant for local dev.
 *
 * Run after `pnpm stack:setup` and migrations:
 *   pnpm tsx infra/scripts/seed.ts
 *
 * Idempotent: re-running with the same env will not create duplicates.
 */
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'node:path';
import { hash as argon2Hash } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';

// Always load .env from repo root regardless of cwd.
dotenvConfig({ path: resolve(__dirname, '../../.env') });
import { createDbClient, closeDbClient } from '@secureloop/db';
import { users } from '../../services/auth/src/schema/users';
import { tenants } from '../../services/tenants/src/schema/tenants';
import { tenantFrameworks } from '../../services/tenants/src/schema/frameworks';

const DEMO_TENANT_ID = '00000000-0000-4000-8000-000000000001';
const DEMO_TENANT_SLUG = 'cybrilliant';
const DEMO_ADMIN_EMAIL = 'admin@secureloop.dev';
const DEMO_ADMIN_PASSWORD = 'SecureLoop!2026';

const DEMO_FRAMEWORKS = ['NIST-CSF', 'CIS-V8', 'SOC2-Type-II', 'OWASP-ASVS', 'CSA-CCM'];

async function seedTenants(): Promise<void> {
  const url = process.env['DATABASE_URL_TENANTS'];
  if (!url) throw new Error('DATABASE_URL_TENANTS env var required');
  const client = createDbClient({ connectionString: url, max: 1 });
  try {
    const [existing] = await client.db
      .select()
      .from(tenants)
      .where(eq(tenants.id, DEMO_TENANT_ID))
      .limit(1);

    if (!existing) {
      await client.db.insert(tenants).values({
        id: DEMO_TENANT_ID,
        slug: DEMO_TENANT_SLUG,
        name: 'Cybrilliant (Demo)',
        industry: 'Cybersecurity',
        country: 'AE',
        plan: 'enterprise',
        status: 'active',
      });
      console.error(`✓ Created demo tenant: ${DEMO_TENANT_SLUG} (${DEMO_TENANT_ID})`);
    } else {
      console.error(`· Demo tenant already exists: ${DEMO_TENANT_SLUG}`);
    }

    for (const fw of DEMO_FRAMEWORKS) {
      const [exists] = await client.db
        .select()
        .from(tenantFrameworks)
        .where(eq(tenantFrameworks.frameworkId, fw))
        .limit(1);
      if (exists) continue;
      await client.db.insert(tenantFrameworks).values({
        tenantId: DEMO_TENANT_ID,
        frameworkId: fw,
        enabled: true,
        autoMap: true,
        status: 'enabled',
      });
    }
    console.error(`✓ Frameworks seeded for ${DEMO_TENANT_SLUG}`);
  } finally {
    await closeDbClient(client);
  }
}

async function seedAuth(): Promise<void> {
  const url = process.env['DATABASE_URL_AUTH'];
  if (!url) throw new Error('DATABASE_URL_AUTH env var required');
  const client = createDbClient({ connectionString: url, max: 1 });
  try {
    const [existing] = await client.db
      .select()
      .from(users)
      .where(eq(users.email, DEMO_ADMIN_EMAIL))
      .limit(1);

    if (existing) {
      console.error(`· Admin user already exists: ${DEMO_ADMIN_EMAIL}`);
      return;
    }

    const passwordHash = await argon2Hash(DEMO_ADMIN_PASSWORD);
    await client.db.insert(users).values({
      email: DEMO_ADMIN_EMAIL,
      passwordHash,
      tenantId: DEMO_TENANT_ID,
      roles: ['ADMIN'],
      active: true,
    });
    console.error(`✓ Created admin user: ${DEMO_ADMIN_EMAIL}`);
    console.error(`  Login with: ${DEMO_ADMIN_EMAIL} / ${DEMO_ADMIN_PASSWORD}`);
  } finally {
    await closeDbClient(client);
  }
}

async function main() {
  console.error('→ Seeding SecureLoop dev data');
  await seedTenants();
  await seedAuth();
  console.error('✓ Seed complete');
}

main().catch((err) => {
  console.error('✗ seed failed:', err);
  process.exit(1);
});
