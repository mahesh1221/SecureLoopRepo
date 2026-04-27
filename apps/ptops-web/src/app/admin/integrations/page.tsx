'use client';

import { useState } from 'react';
import { Breadcrumb } from '@secureloop/ui';
import { cn } from '@secureloop/ui';
import * as s from './page.css';

type Health = 'good' | 'warn' | 'crit' | 'off';
type ErrorType = 'auth' | 'rate' | 'conn';

interface Integration {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  health: Health;
  tenantsUsing: number;
  lastSync?: string;
}

const INTEGRATIONS: Integration[] = [
  { id: 'nessus', name: 'Nessus', category: 'Scanner', enabled: true, health: 'good', tenantsUsing: 23, lastSync: '2m ago' },
  { id: 'qualys', name: 'Qualys VMDR', category: 'Scanner', enabled: true, health: 'warn', tenantsUsing: 12, lastSync: '18m ago' },
  { id: 'rapid7', name: 'Rapid7 InsightVM', category: 'Scanner', enabled: false, health: 'off', tenantsUsing: 0 },
  { id: 'crowdstrike', name: 'CrowdStrike', category: 'Scanner', enabled: true, health: 'good', tenantsUsing: 8, lastSync: '5m ago' },
  { id: 'jira', name: 'Jira', category: 'Remediation', enabled: true, health: 'good', tenantsUsing: 31, lastSync: '1m ago' },
  { id: 'servicenow', name: 'ServiceNow', category: 'Remediation', enabled: true, health: 'crit', tenantsUsing: 7, lastSync: '3h ago' },
  { id: 'github', name: 'GitHub', category: 'Remediation', enabled: true, health: 'good', tenantsUsing: 19, lastSync: '3m ago' },
  { id: 'slack', name: 'Slack', category: 'Notifications', enabled: true, health: 'good', tenantsUsing: 38, lastSync: '30s ago' },
  { id: 'teams', name: 'MS Teams', category: 'Notifications', enabled: true, health: 'good', tenantsUsing: 14, lastSync: '2m ago' },
  { id: 'okta', name: 'Okta', category: 'SSO/Auth', enabled: true, health: 'good', tenantsUsing: 21, lastSync: '1m ago' },
  { id: 'azure-ad', name: 'Azure AD', category: 'SSO/Auth', enabled: true, health: 'warn', tenantsUsing: 9, lastSync: '22m ago' },
];

const FAILURES = [
  { tenant: 'MediTrust Hospital', integration: 'ServiceNow', error: 'auth' as const, since: '3h ago', detail: 'OAuth token expired' },
  { tenant: 'RetailMax Group', integration: 'Qualys VMDR', error: 'rate' as const, since: '28m ago', detail: 'Rate limit exceeded' },
  { tenant: 'Acme Financial Corp', integration: 'Azure AD', error: 'conn' as const, since: '18m ago', detail: 'Connection timeout' },
];

const TABS = [
  { key: 'all', label: 'All', count: 27 },
  { key: 'scanners', label: 'Scanners', count: 5 },
  { key: 'remediation', label: 'Remediation', count: 9 },
  { key: 'notifications', label: 'Notifications', count: 5 },
  { key: 'sso', label: 'SSO/Auth', count: 3 },
  { key: 'accounting', label: 'Accounting', count: 3 },
  { key: 'cloud', label: 'Cloud', count: 3 },
] as const;

const CATEGORIES = ['Scanner', 'Remediation', 'Notifications', 'SSO/Auth'];

const KPI = [
  { label: 'Integrations enabled', value: '19', variant: 'good' as const },
  { label: 'Healthy', value: '15', variant: 'good' as const },
  { label: 'Degraded', value: '3', variant: 'warn' as const },
  { label: 'Failed', value: '1', variant: 'crit' as const },
];

export default function GlobalIntegrationsPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string>('jira');
  const [integrations, setIntegrations] = useState(INTEGRATIONS);

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i))
    );
  };

  const selected = integrations.find((i) => i.id === selectedId);

  const filteredByCategory = (cat: string) =>
    integrations.filter((i) => i.category === cat);

  return (
    <div className={s.page}>
      <Breadcrumb items={[{ label: 'Platform Admin', onClick: () => {} }, { label: 'Global Integrations' }]} />
      <h1 className={s.pageTitle}>Global Integrations</h1>
      <p className={s.pageSubtitle}>Configure platform-wide integrations available to all tenants</p>

      {/* KPI strip */}
      <div className={s.kpiRow}>
        {KPI.map((k) => (
          <div key={k.label} className={s.kpiCard}>
            <div className={s.kpiLabel}>{k.label}</div>
            <div className={cn(s.kpiValue, s.kpiValueVariants[k.variant])}>{k.value}</div>
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

      <div className={s.bodyGrid}>
        {/* Integration grid */}
        <div>
          {CATEGORIES.map((cat) => {
            const catIntegrations = filteredByCategory(cat);
            if (!catIntegrations.length) return null;
            return (
              <div key={cat}>
                <div className={s.categoryHead}>
                  <span className={s.categoryChip}>{cat}</span>
                  <span className={s.categoryTitle} />
                  <span style={{ fontSize: '11px', color: 'var(--sl-ink-40)' }}>{catIntegrations.length}</span>
                </div>
                <div className={s.intGrid}>
                  {catIntegrations.map((int) => (
                    <div
                      key={int.id}
                      className={cn(s.intCard, !int.enabled && s.intCardDisabled)}
                      data-selected={selectedId === int.id ? 'true' : undefined}
                      onClick={() => setSelectedId(int.id)}
                    >
                      <div className={s.intCardTop}>
                        <div className={s.intLogo}>{int.name.slice(0, 2).toUpperCase()}</div>
                        <div className={s.intInfo}>
                          <div className={s.intName}>{int.name}</div>
                          <div className={s.intCategory}>{int.category}</div>
                        </div>
                        {/* Segmented pill — NEVER iOS switch per CLAUDE.md §7/§8 */}
                        <div
                          className={s.segPill}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className={cn(s.segPillBtn, int.enabled && s.segPillBtnActive)}
                            onClick={() => toggleIntegration(int.id)}
                          >
                            Enabled
                          </button>
                          <button
                            type="button"
                            className={cn(s.segPillBtn, !int.enabled && s.segPillBtnActive)}
                            onClick={() => toggleIntegration(int.id)}
                          >
                            Disabled
                          </button>
                        </div>
                      </div>
                      <div className={s.intMeta}>
                        <span>
                          <span className={cn(s.healthDot, s.healthDotVariants[int.health])} />
                          {int.health.charAt(0).toUpperCase() + int.health.slice(1)}
                        </span>
                        <span>{int.tenantsUsing} tenants{int.lastSync ? ` · ${int.lastSync}` : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Failure table */}
          {FAILURES.length > 0 && (
            <div className={s.failureSection}>
              <div className={s.failureSectionTitle}>Active failures ({FAILURES.length})</div>
              <div className={s.failureTable}>
                <div className={s.failureHeader}>
                  <span className={s.failureThCell}>Tenant</span>
                  <span className={s.failureThCell}>Integration</span>
                  <span className={s.failureThCell}>Error type</span>
                  <span className={s.failureThCell}>Since</span>
                </div>
                {FAILURES.map((f, i) => (
                  <div key={i} className={s.failureRow}>
                    <span className={s.failureTdCell}>{f.tenant}</span>
                    <span className={s.failureTdCell}>{f.integration}</span>
                    <span>
                      <span className={cn(s.errorBadge, s.errorBadgeVariants[f.error])}>
                        {f.error === 'auth' ? 'Auth error' : f.error === 'rate' ? 'Rate limit' : 'Conn. error'}
                      </span>
                    </span>
                    <span className={s.failureTdCell}>{f.since}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detail sidebar */}
        {selected ? (
          <div className={s.sidebar}>
            <div className={s.sidebarHeader}>
              <div className={s.sidebarLogoBox}>{selected.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--sl-ink-100)', fontSize: '15px' }}>{selected.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--sl-ink-40)' }}>{selected.category}</div>
              </div>
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Global status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className={cn(s.healthDot, s.healthDotVariants[selected.health])} />
                <span style={{ fontSize: '13px', color: 'var(--sl-ink-80)' }}>
                  {selected.health.charAt(0).toUpperCase() + selected.health.slice(1)}
                </span>
              </div>
              <div className={s.segPill} style={{ width: 'fit-content' }}>
                <button
                  type="button"
                  className={cn(s.segPillBtn, selected.enabled && s.segPillBtnActive)}
                  onClick={() => toggleIntegration(selected.id)}
                >Enabled</button>
                <button
                  type="button"
                  className={cn(s.segPillBtn, !selected.enabled && s.segPillBtnActive)}
                  onClick={() => toggleIntegration(selected.id)}
                >Disabled</button>
              </div>
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Platform usage ({selected.tenantsUsing} tenants)</div>
              {['Acme Financial Corp', 'CyberShield Ltd', 'MediTrust Hospital'].slice(0, Math.min(3, selected.tenantsUsing)).map((t) => (
                <div key={t} className={s.usageTenantItem}>
                  <span>{t}</span>
                  <span style={{ fontSize: '11px', color: 'var(--sl-ink-40)' }}>Active</span>
                </div>
              ))}
              {selected.tenantsUsing > 3 && (
                <div style={{ fontSize: '11px', color: 'var(--sl-ink-40)', marginTop: '6px' }}>+{selected.tenantsUsing - 3} more</div>
              )}
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Health · last 24h</div>
              <p style={{ fontSize: '13px', color: 'var(--sl-ink-60)' }}>
                {selected.lastSync ? `Last sync: ${selected.lastSync}` : 'No recent activity'}
              </p>
            </div>

            <div className={s.sidebarSection}>
              <div className={s.sidebarSectionTitle}>Danger zone</div>
              <button type="button" className={s.dangerBtn}>Disconnect all tenants</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
