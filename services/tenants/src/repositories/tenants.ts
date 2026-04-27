import { eq, sql } from 'drizzle-orm';
import type { DbClient } from '@secureloop/db';
import { tenants, type Tenant, type NewTenant } from '../schema/tenants';
import { tenantFrameworks } from '../schema/frameworks';

export interface ListTenantsParams {
  page?: number;
  pageSize?: number;
}

export class TenantsRepository {
  constructor(private readonly client: DbClient) {}

  private get db() {
    return this.client.db;
  }

  async create(input: NewTenant): Promise<Tenant> {
    const [row] = await this.db.insert(tenants).values(input).returning();
    if (!row) throw new Error('Insert returned no row');
    return row;
  }

  async list(
    params: ListTenantsParams = {},
  ): Promise<{ data: Tenant[]; total: number; page: number; pageSize: number }> {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 50, 200);
    const offset = (page - 1) * pageSize;

    const [data, totalResult] = await Promise.all([
      this.db.select().from(tenants).limit(pageSize).offset(offset).orderBy(tenants.createdAt),
      this.db.select({ count: sql<number>`count(*)::int` }).from(tenants),
    ]);

    return {
      data,
      total: Number(totalResult[0]?.count ?? 0),
      page,
      pageSize,
    };
  }

  async findById(id: string): Promise<Tenant | null> {
    const [row] = await this.db.select().from(tenants).where(eq(tenants.id, id)).limit(1);
    return row ?? null;
  }

  async findBySlug(slug: string): Promise<Tenant | null> {
    const [row] = await this.db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1);
    return row ?? null;
  }

  async clone(
    sourceId: string,
    overrides: Pick<NewTenant, 'name' | 'slug'>,
    options: { cloneFrameworks: boolean; cloneSla: boolean },
  ): Promise<Tenant> {
    const source = await this.findById(sourceId);
    if (!source) throw new Error(`Source tenant ${sourceId} not found`);

    const insert: NewTenant = {
      name: overrides.name,
      slug: overrides.slug,
      industry: source.industry,
      country: source.country,
      plan: source.plan,
      status: 'draft',
      ...(options.cloneSla
        ? {
            slaCriticalHrs: source.slaCriticalHrs,
            slaHighHrs: source.slaHighHrs,
            slaMediumHrs: source.slaMediumHrs,
            slaLowHrs: source.slaLowHrs,
          }
        : {}),
    };

    const cloned = await this.create(insert);

    if (options.cloneFrameworks) {
      const sourceFrameworks = await this.db
        .select()
        .from(tenantFrameworks)
        .where(eq(tenantFrameworks.tenantId, sourceId));
      if (sourceFrameworks.length > 0) {
        await this.db.insert(tenantFrameworks).values(
          sourceFrameworks.map((f) => ({
            tenantId: cloned.id,
            frameworkId: f.frameworkId,
            enabled: f.enabled,
            autoMap: f.autoMap,
          })),
        );
      }
    }

    return cloned;
  }
}
