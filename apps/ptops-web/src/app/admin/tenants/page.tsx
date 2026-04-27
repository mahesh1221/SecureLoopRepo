'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Select, Breadcrumb } from '@secureloop/ui';
import * as s from './page.css';
import { cn } from '@secureloop/ui';

type TenantStatus = 'active' | 'archived' | 'draft' | 'suspended';
type Plan = 'enterprise' | 'pro' | 'starter';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  industry: string;
  country: string;
  plan: Plan;
  users: number;
  frameworks: number;
  createdAt: string;
  status: TenantStatus;
  statusHint?: string;
}

const MOCK_TENANTS: Tenant[] = [
  { id: '1', name: 'Acme Financial Corp', slug: 'acme-financial', industry: 'Finance', country: 'US', plan: 'enterprise', users: 142, frameworks: 5, createdAt: 'Dec 14, 2024', status: 'active' },
  { id: '2', name: 'CyberShield Ltd', slug: 'cybershield', industry: 'Technology', country: 'UK', plan: 'pro', users: 38, frameworks: 3, createdAt: 'Jan 03, 2025', status: 'active' },
  { id: '3', name: 'MediTrust Hospital', slug: 'meditrust', industry: 'Healthcare', country: 'AU', plan: 'enterprise', users: 89, frameworks: 4, createdAt: 'Nov 22, 2024', status: 'active' },
  { id: '4', name: 'RetailMax Group', slug: 'retailmax', industry: 'Retail', country: 'CA', plan: 'starter', users: 15, frameworks: 1, createdAt: 'Feb 11, 2025', status: 'draft' },
  { id: '5', name: 'GlobalLogistics Inc', slug: 'global-logistics', industry: 'Logistics', country: 'DE', plan: 'pro', users: 61, frameworks: 2, createdAt: 'Oct 05, 2024', status: 'archived', statusHint: '72 days remaining' },
];

const TABS = [
  { key: 'all', label: 'All', count: 55 },
  { key: 'active', label: 'Active', count: 47 },
  { key: 'archived', label: 'Archived', count: 5 },
  { key: 'draft', label: 'Draft', count: 3 },
  { key: 'suspended', label: 'Suspended', count: 1 },
] as const;

const KPI = [
  { label: 'Active tenants', value: '47', sub: '+3 this week', variant: 'good' as const },
  { label: 'Archived · retention', value: '5', sub: '90-day countdown', variant: 'default' as const },
  { label: 'Draft wizards', value: '3', sub: 'Awaiting activation', variant: 'warn' as const },
  { label: 'New this month', value: '8', sub: 'Feb 2025', variant: 'default' as const },
];

export default function TenantsPage() {
  const [activeTab, setActiveTab] = useState<string>('active');
  const [selectedId, setSelectedId] = useState<string>('1');
  const [search, setSearch] = useState('');

  const selectedTenant = MOCK_TENANTS.find((t) => t.id === selectedId);

  return (
    <div className={s.page}>
      <Breadcrumb items={[{ label: 'Platform Admin', onClick: () => {} }, { label: 'Tenants' }]} />

      <div className={s.pageHeader}>
        <div className={s.pageHeaderText}>
          <h1 className={s.pageTitle}>Tenant Management</h1>
          <p className={s.pageSubtitle}>Provision and manage customer tenant environments</p>
        </div>
        <div className={s.pageActions}>
          <Button variant="ghost" size="sm">Export</Button>
          <Link href="/admin/tenants/new">
            <Button variant="primary" size="sm">Create tenant</Button>
          </Link>
        </div>
      </div>

      {/* KPI row */}
      <div className={s.kpiRow}>
        {KPI.map((k) => (
          <div key={k.label} className={s.kpiCard}>
            <div className={s.kpiLabel}>{k.label}</div>
            <div className={cn(s.kpiValue, s.kpiValueVariants[k.variant])}>{k.value}</div>
            <div className={s.kpiSub}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className={s.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={cn(s.tabItem, activeTab === tab.key && s.tabItemActive)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className={s.tabCount}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filter bar */}
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
        <span className={s.recordCount}>47 records</span>
      </div>

      {/* Body grid */}
      <div className={s.bodyGrid}>
        {/* Table */}
        <div className={s.tableWrap}>
          {/* Header */}
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

          {/* Rows */}
          {MOCK_TENANTS.map((tenant) => (
            <div
              key={tenant.id}
              className={s.tableRow}
              data-selected={selectedId === tenant.id ? 'true' : undefined}
              onClick={() => setSelectedId(tenant.id)}
            >
              <div className={s.tdCell}>
                <input
                  type="checkbox"
                  checked={selectedId === tenant.id}
                  onChange={() => setSelectedId(tenant.id)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <div className={s.tenantName}>{tenant.name}</div>
                <div className={s.tenantUrl}>{tenant.slug}.secureloop.io</div>
              </div>
              <div className={s.tdCell}>{tenant.industry}</div>
              <div className={s.tdMono}>{tenant.country}</div>
              <div>
                <span className={cn(s.planBadge, s.planBadgeVariants[tenant.plan])}>
                  {tenant.plan === 'enterprise' ? 'ENT' : tenant.plan === 'pro' ? 'PRO' : 'STR'}
                </span>
              </div>
              <div className={s.tdMono}>{tenant.users}</div>
              <div className={s.tdMono}>{tenant.frameworks}</div>
              <div className={s.tdMono}>{tenant.createdAt}</div>
              <div>
                <div className={s.statusCell}>
                  <div className={cn(s.statusDot, s.statusDotVariants[tenant.status])} />
                  <div>
                    <div className={s.statusLabel}>
                      {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                    </div>
                    {tenant.statusHint && (
                      <div className={s.statusHint}>{tenant.statusHint}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button type="button" className={s.menuBtn} onClick={(e) => e.stopPropagation()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detail sidebar */}
        {selectedTenant ? (
          <div className={s.sidebar}>
            <div className={s.sidebarHeader}>
              <div>
                <div className={s.sidebarTitle}>{selectedTenant.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--sl-ink-60)', fontFamily: 'var(--sl-font-mono)', marginTop: '2px' }}>
                  {selectedTenant.slug}.secureloop.io
                </div>
              </div>
              <div className={cn(s.statusDot, s.statusDotVariants[selectedTenant.status])} style={{ width: '10px', height: '10px' }} />
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Overview</div>
              <div className={s.metaGrid}>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Industry</span>
                  <span className={s.metaValue}>{selectedTenant.industry}</span>
                </div>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Country</span>
                  <span className={s.metaValue}>{selectedTenant.country}</span>
                </div>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Plan</span>
                  <span className={cn(s.planBadge, s.planBadgeVariants[selectedTenant.plan])}>
                    {selectedTenant.plan}
                  </span>
                </div>
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Created</span>
                  <span className={s.metaValue}>{selectedTenant.createdAt}</span>
                </div>
              </div>
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Usage</div>
              <div className={s.usageGrid}>
                <div className={s.usageStat}>
                  <span className={s.usageValue}>{selectedTenant.users}</span>
                  <span className={s.usageLabel}>Users</span>
                </div>
                <div className={s.usageStat}>
                  <span className={s.usageValue}>{selectedTenant.frameworks}</span>
                  <span className={s.usageLabel}>Frameworks</span>
                </div>
                <div className={s.usageStat}>
                  <span className={s.usageValue}>—</span>
                  <span className={s.usageLabel}>Findings</span>
                </div>
                <div className={s.usageStat}>
                  <span className={s.usageValue}>—</span>
                  <span className={s.usageLabel}>Engagements</span>
                </div>
                <div className={s.usageStat}>
                  <span className={s.usageValue}>—</span>
                  <span className={s.usageLabel}>Assets</span>
                </div>
                <div className={s.usageStat}>
                  <span className={s.usageValue}>—</span>
                  <span className={s.usageLabel}>Reports</span>
                </div>
              </div>
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Recent activity</div>
              <div className={s.activityList}>
                <div className={s.activityItem}>
                  <span className={s.activityText}>Framework NIST-CSF enabled</span>
                  <span className={s.activityTime}>2 hours ago</span>
                </div>
                <div className={s.activityItem}>
                  <span className={s.activityText}>New user invited: j.doe@acme.com</span>
                  <span className={s.activityTime}>Yesterday</span>
                </div>
                <div className={s.activityItem}>
                  <span className={s.activityText}>SLA defaults updated</span>
                  <span className={s.activityTime}>3 days ago</span>
                </div>
              </div>
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Quick actions</div>
              <div className={s.quickActions}>
                <button type="button" className={s.qaBtn}>Configure frameworks</button>
                <button type="button" className={s.qaBtn}>Manage users</button>
                <button type="button" className={s.qaBtn}>View billing</button>
                <button type="button" className={s.qaBtn}>Clone tenant</button>
                <button type="button" className={s.qaBtnDanger}>Archive · 90-day retention</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.sidebar}>
            <div className={s.emptyState}>Select a tenant to view details</div>
          </div>
        )}
      </div>
    </div>
  );
}
