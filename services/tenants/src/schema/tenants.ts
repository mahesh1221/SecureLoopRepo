import { pgTable, uuid, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const tenantStatusEnum = pgEnum('tenant_status', ['draft', 'active', 'suspended']);
export const tenantPlanEnum = pgEnum('tenant_plan', ['starter', 'pro', 'enterprise']);

export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  industry: text('industry'),
  country: text('country'),
  plan: tenantPlanEnum('plan').notNull().default('starter'),
  status: tenantStatusEnum('status').notNull().default('draft'),
  slaCriticalHrs: integer('sla_critical_hrs').notNull().default(4),
  slaHighHrs: integer('sla_high_hrs').notNull().default(24),
  slaMediumHrs: integer('sla_medium_hrs').notNull().default(72),
  slaLowHrs: integer('sla_low_hrs').notNull().default(168),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
