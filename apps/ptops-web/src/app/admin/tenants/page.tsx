'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Button, Input, Select, Breadcrumb } from '@secureloop/ui';
import { cn } from '@secureloop/ui';
import { useAuth } from '../../../lib/auth';
import { tenantsApi, type Tenant } from '../../../lib/api';
import * as s from './page.css';

type TenantStatus = Tenant['status'];

const PLAN_LABEL: Record<Tenant['plan'], string> = {
  enterprise: 'ENT',
  pro: 'PRO',
  starter: 'STR',
};

const STATUS_TABS: { key: 'all' | TenantStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'draft', label: 'Draft' },
  { key: 'suspended', label: 'Suspended' },
];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function TenantsPage() {
  const { token, loading: authLoading } = useAuth();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | TenantStatus>('active');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (authLoading || !token) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    tenantsApi
      .list(token)
      .then((res) => {
        if (cancelled) return;
        setTenants(res.data);
        if (res.data[0]) setSelectedId((prev) => prev ?? res.data[0]!.id);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token, authLoading]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: tenants.length, active: 0, draft: 0, suspended: 0 };
    for (const t of tenants) c[t.status] = (c[t.status] ?? 0) + 1;
    return c;
  }, [tenants]);

  const filtered = useMemo(() => {
    return tenants.filter((t) => {
      if (activeTab !== 'all' && t.status !== activeTab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.slug.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [tenants, activeTab, search]);

  const selectedTenant = filtered.find((t) => t.id === selectedId) ?? filtered[0];

  return (
    <div className={s.page}>
      <Breadcrumb items={[{ label: 'Platform Admin', onClick: () => {} }, { label: 'Tenants' }]} />

      <div className={s.pageHeader}>
        <div className={s.pageHeaderText}>
          <h1 className={s.pageTitle}>Tenant Management</h1>
          <p className={s.pageSubtitle}>Provision and manage customer tenant environments</p>
        </div>
        <div className={s.pageActions}>
          <Button variant="ghost" size="sm">
            Export
          </Button>
          <Link href="/admin/tenants/new">
            <Button variant="primary" size="sm">
              Create tenant
            </Button>
          </Link>
        </div>
      </div>

      <div className={s.kpiRow}>
        <div className={s.kpiCard}>
          <div className={s.kpiLabel}>Active tenants</div>
          <div className={cn(s.kpiValue, s.kpiValueVariants.good)}>{counts['active'] ?? 0}</div>
          <div className={s.kpiSub}>Out of {counts['all']}</div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiLabel}>Draft wizards</div>
          <div className={cn(s.kpiValue, s.kpiValueVariants.warn)}>{counts['draft'] ?? 0}</div>
          <div className={s.kpiSub}>Awaiting activation</div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiLabel}>Suspended</div>
          <div className={cn(s.kpiValue, s.kpiValueVariants.default)}>
            {counts['suspended'] ?? 0}
          </div>
          <div className={s.kpiSub}>—</div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiLabel}>Total tenants</div>
          <div className={cn(s.kpiValue, s.kpiValueVariants.default)}>{counts['all']}</div>
          <div className={s.kpiSub}>All statuses</div>
        </div>
      </div>

      <div className={s.tabBar}>
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={cn(s.tabItem, activeTab === tab.key && s.tabItemActive)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className={s.tabCount}>{counts[tab.key] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className={s.filterBar}>
        <Input
          placeholder="Search tenants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '240px' }}
        />
        <Select options={[{ value: '', label: 'All industries' }]} value="" onChange={() => {}} />
        <Select options={[{ value: '', label: 'All countries' }]} value="" onChange={() => {}} />
        <Select options={[{ value: '', label: 'All plans' }]} value="" onChange={() => {}} />
        <Select options={[{ value: '', label: 'Any status' }]} value="" onChange={() => {}} />
        <div className={s.filterSpacer} />
        <span className={s.recordCount}>{filtered.length} records</span>
      </div>

      {error && (
        <div role="alert" style={{ padding: '12px', color: 'var(--sl-crit)', fontSize: '13px' }}>
          Failed to load tenants: {error}
        </div>
      )}

      <div className={s.bodyGrid}>
        <div className={s.tableWrap}>
          <div className={s.tableHeader}>
            <div className={s.thCell} />
            <div className={s.thCell}>Tenant</div>
            <div className={s.thCell}>Industry</div>
            <div className={s.thCell}>Country</div>
            <div className={s.thCell}>Plan</div>
            <div className={s.thCell}>Users</div>
            <div className={s.thCell}>FW</div>
            <div className={s.thCell}>Created</div>
            <div className={s.thCell}>Status</div>
            <div className={s.thCell} />
          </div>

          {loading && (
            <div style={{ padding: '24px', color: 'var(--sl-ink-60)', fontSize: '13px' }}>
              Loading tenants…
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ padding: '24px', color: 'var(--sl-ink-60)', fontSize: '13px' }}>
              {tenants.length === 0
                ? 'No tenants yet — click “Create tenant” to provision the first one.'
                : 'No tenants match the current filters.'}
            </div>
          )}

          {filtered.map((tenant) => (
            <div
              key={tenant.id}
              className={s.tableRow}
              data-selected={selectedTenant?.id === tenant.id ? 'true' : undefined}
              onClick={() => setSelectedId(tenant.id)}
            >
              <div className={s.tdCell}>
                <input
                  type="checkbox"
                  checked={selectedTenant?.id === tenant.id}
                  onChange={() => setSelectedId(tenant.id)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <div className={s.tenantName}>{tenant.name}</div>
                <div className={s.tenantUrl}>{tenant.slug}.secureloop.io</div>
              </div>
              <div className={s.tdCell}>{tenant.industry ?? '—'}</div>
              <div className={s.tdMono}>{tenant.country ?? '—'}</div>
              <div>
                <span className={cn(s.planBadge, s.planBadgeVariants[tenant.plan])}>
                  {PLAN_LABEL[tenant.plan]}
                </span>
              </div>
              <div className={s.tdMono}>—</div>
              <div className={s.tdMono}>—</div>
              <div className={s.tdMono}>{formatDate(tenant.createdAt)}</div>
              <div>
                <div className={s.statusCell}>
                  <div className={cn(s.statusDot, s.statusDotVariants[tenant.status])} />
                  <div>
                    <div className={s.statusLabel}>
                      {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button type="button" className={s.menuBtn} onClick={(e) => e.stopPropagation()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedTenant ? (
          <div className={s.sidebar}>
            <div className={s.sidebarHeader}>
              <div>
                <div className={s.sidebarTitle}>{selectedTenant.name}</div>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--sl-ink-60)',
                    fontFamily: 'var(--sl-font-mono)',
                    marginTop: '2px',
                  }}
                >
                  {selectedTenant.slug}.secureloop.io
                </div>
              </div>
              <div
                className={cn(s.statusDot, s.statusDotVariants[selectedTenant.status])}
                style={{ width: '10px', height: '10px' }}
              />
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Overview</div>
              <div className={s.metaGrid}>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Industry</span>
                  <span className={s.metaValue}>{selectedTenant.industry ?? '—'}</span>
                </div>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Country</span>
                  <span className={s.metaValue}>{selectedTenant.country ?? '—'}</span>
                </div>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Plan</span>
                  <span className={cn(s.planBadge, s.planBadgeVariants[selectedTenant.plan])}>
                    {selectedTenant.plan}
                  </span>
                </div>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Created</span>
                  <span className={s.metaValue}>{formatDate(selectedTenant.createdAt)}</span>
                </div>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>SLA · Critical</span>
                  <span className={s.metaValue}>{selectedTenant.slaCriticalHrs}h</span>
                </div>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>SLA · High</span>
                  <span className={s.metaValue}>{selectedTenant.slaHighHrs}h</span>
                </div>
              </div>
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Quick actions</div>
              <div className={s.quickActions}>
                <button type="button" className={s.qaBtn}>
                  Configure frameworks
                </button>
                <button type="button" className={s.qaBtn}>
                  Manage users
                </button>
                <button type="button" className={s.qaBtn}>
                  View billing
                </button>
                <button type="button" className={s.qaBtn}>
                  Clone tenant
                </button>
                <button type="button" className={s.qaBtnDanger}>
                  Suspend tenant
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.sidebar}>
            <div className={s.emptyState}>
              {loading ? 'Loading…' : 'Select a tenant to view details'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
