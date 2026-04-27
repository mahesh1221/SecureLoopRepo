import { and, eq } from 'drizzle-orm';
import type { DbClient } from '@secureloop/db';
import { tenantFrameworks, type TenantFramework } from '../schema/frameworks';

export class FrameworksRepository {
  constructor(private readonly client: DbClient) {}

  private get db() {
    return this.client.db;
  }

  async upsert(
    tenantId: string,
    frameworkId: string,
    patch: { enabled: boolean; autoMap: boolean },
  ): Promise<TenantFramework> {
    const existing = await this.findOne(tenantId, frameworkId);
    if (existing) {
      const [updated] = await this.db
        .update(tenantFrameworks)
        .set({
          enabled: patch.enabled,
          autoMap: patch.autoMap,
          status: patch.enabled ? 'processing' : 'disabled',
          updatedAt: new Date(),
        })
        .where(eq(tenantFrameworks.id, existing.id))
        .returning();
      if (!updated) throw new Error('Update returned no row');
      return updated;
    }

    const [created] = await this.db
      .insert(tenantFrameworks)
      .values({
        tenantId,
        frameworkId,
        enabled: patch.enabled,
        autoMap: patch.autoMap,
        status: patch.enabled ? 'processing' : 'disabled',
      })
      .returning();
    if (!created) throw new Error('Insert returned no row');
    return created;
  }

  async findOne(tenantId: string, frameworkId: string): Promise<TenantFramework | null> {
    const [row] = await this.db
      .select()
      .from(tenantFrameworks)
      .where(
        and(eq(tenantFrameworks.tenantId, tenantId), eq(tenantFrameworks.frameworkId, frameworkId)),
      )
      .limit(1);
    return row ?? null;
  }

  async listForTenant(tenantId: string): Promise<TenantFramework[]> {
    return this.db.select().from(tenantFrameworks).where(eq(tenantFrameworks.tenantId, tenantId));
  }
}
