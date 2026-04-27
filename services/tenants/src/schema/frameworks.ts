import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
  pgEnum,
  unique,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenants';

export const frameworkStatusEnum = pgEnum('framework_status', [
  'enabled',
  'processing',
  'disabled',
  'error',
]);

export const tenantFrameworks = pgTable(
  'tenant_frameworks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'cascade' }),
    frameworkId: text('framework_id').notNull(),
    enabled: boolean('enabled').notNull().default(true),
    autoMap: boolean('auto_map').notNull().default(true),
    status: frameworkStatusEnum('status').notNull().default('enabled'),
    mappedControls: integer('mapped_controls').notNull().default(0),
    totalControls: integer('total_controls').notNull().default(0),
    lastSync: timestamp('last_sync', { withTimezone: true }),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    tenantFrameworkUnique: unique('tenant_framework_unique').on(t.tenantId, t.frameworkId),
  }),
);

export type TenantFramework = typeof tenantFrameworks.$inferSelect;
export type NewTenantFramework = typeof tenantFrameworks.$inferInsert;
