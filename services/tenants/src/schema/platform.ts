import { pgTable, integer, jsonb, timestamp, text, boolean, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

interface SlaConfig {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface EscalationStep {
  level: number;
  delayHours: number;
  notifyRoles: string[];
}

interface AccessPolicies {
  mfaRequired: boolean;
  sessionTimeout: 'standard' | 'strict';
  apiAccess: boolean;
}

export const platformDefaults = pgTable(
  'platform_defaults',
  {
    id: integer('id').primaryKey().default(1),
    sla: jsonb('sla').$type<SlaConfig>().notNull(),
    escalation: jsonb('escalation').$type<EscalationStep[]>().notNull(),
    accessPolicies: jsonb('access_policies').$type<AccessPolicies>().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    singletonCheck: check('platform_defaults_singleton', sql`${t.id} = 1`),
  }),
);

export const platformIntegrations = pgTable('platform_integrations', {
  id: text('id').primaryKey(),
  category: text('category').notNull(),
  enabled: boolean('enabled').notNull().default(false),
  config: jsonb('config').$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type PlatformDefaults = typeof platformDefaults.$inferSelect;
export type PlatformIntegration = typeof platformIntegrations.$inferSelect;
