import { eq, and, type SQL } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import type { DbClient } from './client';

export class MissingTenantContextError extends Error {
  constructor() {
    super(
      'TenantScopedRepository invoked without tenantId. ' +
        'Every tenant-scoped query MUST be filtered by tenant_id (CLAUDE.md §11 security defaults).',
    );
    this.name = 'MissingTenantContextError';
  }
}

/**
 * Base class for repositories whose every read/write must be scoped to a tenant.
 *
 * Subclasses pass the Drizzle table reference and rely on `tenantFilter()` to
 * inject the `tenant_id` predicate. The class refuses to operate without a
 * tenantId — this is the load-bearing invariant of multi-tenant data isolation.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class TenantScopedRepository<TTable extends PgTableWithColumns<any>> {
  protected readonly client: DbClient;
  protected readonly table: TTable;

  constructor(client: DbClient, table: TTable) {
    this.client = client;
    this.table = table;
  }

  /** Returns the column representing tenant ownership. Default: `tenantId`. Override if your table names it differently. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected tenantColumn(): any {
    const col = (this.table as unknown as Record<string, unknown>)['tenantId'];
    if (!col) {
      throw new Error(
        `Table is missing a tenantId column. Override tenantColumn() if your schema uses a different name.`,
      );
    }
    return col;
  }

  protected tenantFilter(tenantId: string, extra?: SQL): SQL {
    if (!tenantId) {
      throw new MissingTenantContextError();
    }
    const tenantPredicate = eq(this.tenantColumn(), tenantId);
    return extra ? (and(tenantPredicate, extra) as SQL) : tenantPredicate;
  }

  protected get db() {
    return this.client.db;
  }
}
