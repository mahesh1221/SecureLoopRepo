import { eq } from 'drizzle-orm';
import type { DbClient } from '@secureloop/db';
import {
  platformDefaults,
  platformIntegrations,
  type PlatformDefaults,
  type PlatformIntegration,
} from '../schema/platform';

const DEFAULT_SLA = { critical: 4, high: 24, medium: 72, low: 168 };
const DEFAULT_ESCALATION = [
  { level: 1, delayHours: 0, notifyRoles: ['security-engineer'] },
  { level: 2, delayHours: 24, notifyRoles: ['delivery-manager'] },
  { level: 3, delayHours: 72, notifyRoles: ['ciso'] },
  { level: 4, delayHours: 168, notifyRoles: ['business-owner'] },
];
const DEFAULT_ACCESS = { mfaRequired: true, sessionTimeout: 'standard' as const, apiAccess: true };

export class PlatformRepository {
  constructor(private readonly client: DbClient) {}

  private get db() {
    return this.client.db;
  }

  async getDefaults(): Promise<PlatformDefaults> {
    const [row] = await this.db
      .select()
      .from(platformDefaults)
      .where(eq(platformDefaults.id, 1))
      .limit(1);
    if (row) return row;
    const [created] = await this.db
      .insert(platformDefaults)
      .values({
        id: 1,
        sla: DEFAULT_SLA,
        escalation: DEFAULT_ESCALATION,
        accessPolicies: DEFAULT_ACCESS,
      })
      .returning();
    if (!created) throw new Error('Insert returned no row');
    return created;
  }

  async updateDefaults(
    patch: Partial<Omit<PlatformDefaults, 'id' | 'updatedAt'>>,
  ): Promise<PlatformDefaults> {
    const current = await this.getDefaults();
    const [updated] = await this.db
      .update(platformDefaults)
      .set({
        sla: patch.sla ?? current.sla,
        escalation: patch.escalation ?? current.escalation,
        accessPolicies: patch.accessPolicies ?? current.accessPolicies,
        updatedAt: new Date(),
      })
      .where(eq(platformDefaults.id, 1))
      .returning();
    if (!updated) throw new Error('Update returned no row');
    return updated;
  }

  async listIntegrations(): Promise<PlatformIntegration[]> {
    return this.db.select().from(platformIntegrations).orderBy(platformIntegrations.id);
  }

  async upsertIntegration(input: {
    id: string;
    category: string;
    enabled: boolean;
    config?: Record<string, unknown>;
  }): Promise<PlatformIntegration> {
    const [existing] = await this.db
      .select()
      .from(platformIntegrations)
      .where(eq(platformIntegrations.id, input.id))
      .limit(1);

    if (existing) {
      const [updated] = await this.db
        .update(platformIntegrations)
        .set({
          enabled: input.enabled,
          config: input.config ?? existing.config,
          updatedAt: new Date(),
        })
        .where(eq(platformIntegrations.id, input.id))
        .returning();
      if (!updated) throw new Error('Update returned no row');
      return updated;
    }

    const [created] = await this.db
      .insert(platformIntegrations)
      .values({
        id: input.id,
        category: input.category,
        enabled: input.enabled,
        config: input.config ?? {},
      })
      .returning();
    if (!created) throw new Error('Insert returned no row');
    return created;
  }
}
