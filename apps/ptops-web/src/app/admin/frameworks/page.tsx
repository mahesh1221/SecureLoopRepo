'use client';

import { useEffect, useMemo, useState } from 'react';
import { Breadcrumb, Select } from '@secureloop/ui';
import { cn } from '@secureloop/ui';
import { useAuth } from '../../../lib/auth';
import { tenantsApi, type Tenant, type TenantFramework } from '../../../lib/api';
import * as s from './page.css';

// Map server framework_id (e.g. 'NIST-CSF') to the static metadata id used by
// the mock display so we can overlay live status onto the rich UI.
const FW_ID_TO_DISPLAY: Record<string, string> = {
  'NIST-CSF': 'nist',
  'CIS-V8': 'cis',
  'SOC2-Type-II': 'soc2',
  'OWASP-ASVS': 'owasp',
  'CSA-CCM': 'csa',
  'PCI-DSS': 'pci',
  'ISO-27001': 'iso',
  HIPAA: 'hipaa',
};
const DISPLAY_TO_FW_ID = Object.fromEntries(
  Object.entries(FW_ID_TO_DISPLAY).map(([k, v]) => [v, k]),
) as Record<string, string>;

type FwStatus = 'enabled' | 'processing' | 'disabled';

interface Framework {
  id: string;
  name: string;
  desc: string;
  status: FwStatus;
  phase: 'P1' | 'P2';
  progress?: number;
  progressText?: string;
  hasUpgrade?: boolean;
  mappedControls?: number;
  totalControls?: number;
}

const FRAMEWORKS: Framework[] = [
  {
    id: 'nist',
    name: 'NIST-CSF',
    desc: 'NIST Cybersecurity Framework v1.1 — 108 subcategories across 5 functions.',
    status: 'enabled',
    phase: 'P1',
    mappedControls: 108,
    totalControls: 108,
  },
  {
    id: 'cis',
    name: 'CIS v8',
    desc: 'Center for Internet Security Controls v8 — 18 control groups.',
    status: 'processing',
    phase: 'P1',
    progress: 39,
    progressText: '112/286',
    mappedControls: 112,
    totalControls: 286,
  },
  {
    id: 'soc2',
    name: 'SOC2 Type II',
    desc: 'Service Organization Control 2 — Trust Service Criteria.',
    status: 'enabled',
    phase: 'P1',
    mappedControls: 64,
    totalControls: 64,
  },
  {
    id: 'owasp',
    name: 'OWASP ASVS',
    desc: 'Application Security Verification Standard v4.0 — 286 requirements.',
    status: 'disabled',
    phase: 'P1',
    mappedControls: 0,
    totalControls: 286,
  },
  {
    id: 'csa',
    name: 'CSA CCM',
    desc: 'Cloud Controls Matrix v4 — 197 control specifications.',
    status: 'disabled',
    phase: 'P1',
    mappedControls: 0,
    totalControls: 197,
  },
  {
    id: 'pci',
    name: 'PCI-DSS v4',
    desc: 'Payment Card Industry Data Security Standard v4.0.',
    status: 'disabled',
    phase: 'P2',
    mappedControls: 0,
    totalControls: 259,
    hasUpgrade: true,
  },
  {
    id: 'iso',
    name: 'ISO 27001',
    desc: 'Information security management systems — Annex A controls.',
    status: 'disabled',
    phase: 'P2',
    mappedControls: 0,
    totalControls: 93,
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    desc: 'Health Insurance Portability and Accountability Act safeguards.',
    status: 'disabled',
    phase: 'P2',
    mappedControls: 0,
    totalControls: 54,
  },
];

const QUEUE_ITEMS = [
  { name: 'CIS v8', progress: 39 },
  { name: 'Acme · NIST-CSF re-sync', progress: 74 },
];

export default function FrameworkConfigPage() {
  const { token, loading: authLoading } = useAuth();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [tenant, setTenant] = useState<string>('');
  const [serverFrameworks, setServerFrameworks] = useState<TenantFramework[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !token) return;
    let cancelled = false;
    tenantsApi
      .list(token)
      .then((res) => {
        if (cancelled) return;
        setTenants(res.data);
        if (res.data[0] && !tenant) setTenant(res.data[0].id);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
    // tenant intentionally excluded: only auto-pick on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authLoading]);

  useEffect(() => {
    if (!token || !tenant) return;
    let cancelled = false;
    tenantsApi
      .listFrameworks(token, tenant)
      .then((res) => {
        if (!cancelled) setServerFrameworks(res.data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [token, tenant]);

  const TENANT_OPTS = useMemo(
    () => tenants.map((t) => ({ value: t.id, label: t.name })),
    [tenants],
  );

  // Overlay server status onto mock metadata. Frameworks not in the server
  // response are treated as 'disabled' (their compiled-in default).
  const liveFrameworks = useMemo(() => {
    const byDisplayId = new Map(
      serverFrameworks.map((sf) => [FW_ID_TO_DISPLAY[sf.frameworkId] ?? sf.frameworkId, sf]),
    );
    return FRAMEWORKS.map((f): Framework => {
      const live = byDisplayId.get(f.id);
      if (!live) return { ...f, status: 'disabled' };
      const mapped = {
        ...f,
        status: live.status === 'error' ? 'disabled' : (live.status as FwStatus),
        mappedControls: live.mappedControls,
        totalControls: live.totalControls || f.totalControls || 0,
      };
      if (live.status === 'processing' && live.totalControls > 0) {
        return {
          ...mapped,
          progress: Math.round((live.mappedControls / live.totalControls) * 100),
          progressText: `${live.mappedControls}/${live.totalControls}`,
        };
      }
      return mapped;
    });
  }, [serverFrameworks]);

  const processingCount = liveFrameworks.filter((f) => f.status === 'processing').length;
  const tenantName = tenants.find((t) => t.id === tenant)?.name ?? '';

  const toggleFramework = async (displayId: string, currentlyEnabled: boolean) => {
    if (!token || !tenant) return;
    const fwId = DISPLAY_TO_FW_ID[displayId] ?? displayId;
    try {
      const updated = await tenantsApi.setFramework(token, tenant, fwId, {
        enabled: !currentlyEnabled,
        autoMap: true,
      });
      setServerFrameworks((prev) => {
        const others = prev.filter((p) => p.frameworkId !== fwId);
        return [...others, updated];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle framework');
    }
  };

  return (
    <div className={s.page}>
      <Breadcrumb
        items={[
          { label: 'Platform Admin', onClick: () => {} },
          { label: 'Framework Configuration' },
        ]}
      />
      <h1 className={s.pageTitle}>Framework Configuration</h1>
      <p className={s.pageSubtitle}>Enable and manage compliance frameworks per tenant</p>

      {/* Tenant selector bar */}
      <div className={s.tenantBar}>
        <div className={s.tenantBarIcon}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </div>
        <span className={s.tenantBarName}>{tenantName || '—'}</span>
        <Select options={TENANT_OPTS} value={tenant} onChange={(e) => setTenant(e.target.value)} />
        {processingCount > 0 && (
          <div className={s.processingPulse}>
            <div className={s.pulseDot} />
            {processingCount} processing
          </div>
        )}
      </div>

      {error && (
        <div role="alert" style={{ padding: '12px', color: 'var(--sl-crit)', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <div className={s.bodyGrid}>
        {/* Framework grid */}
        <div>
          {[
            ['P1', liveFrameworks.filter((f) => f.phase === 'P1')] as const,
            ['P2', liveFrameworks.filter((f) => f.phase === 'P2')] as const,
          ].map(([phase, fws]) => (
            <div key={phase}>
              <div className={s.phaseHead}>
                <span className={cn(s.phaseChip, phase === 'P1' ? s.phaseChipP1 : s.phaseChipP2)}>
                  {phase}
                </span>
                <span className={s.phaseTitle}>
                  {phase === 'P1' ? 'Phase 1 — Launch frameworks' : 'Phase 2 — Extended frameworks'}
                </span>
                <span className={s.phaseCount}>{fws.length} available</span>
              </div>
              <div className={s.fwGrid}>
                {fws.map((fw) => (
                  <div
                    key={fw.id}
                    className={cn(
                      s.fwCard,
                      fw.status === 'processing' && s.fwCardProcessing,
                      fw.status === 'disabled' && s.fwCardDisabled,
                    )}
                    onClick={() => toggleFramework(fw.id, fw.status === 'enabled')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleFramework(fw.id, fw.status === 'enabled');
                      }
                    }}
                    style={{ cursor: tenant ? 'pointer' : 'not-allowed' }}
                  >
                    <div className={s.fwCardHeader}>
                      <span className={s.fwCardTitle}>{fw.name}</span>
                      <span className={cn(s.fwBadge, s.fwBadgeVariants[fw.status])}>
                        {fw.status === 'enabled' && '✓ '}
                        {fw.status === 'processing' && '↻ '}
                        {fw.status.charAt(0).toUpperCase() + fw.status.slice(1)}
                      </span>
                    </div>
                    <p className={s.fwCardDesc}>{fw.desc}</p>
                    {fw.status === 'processing' && fw.progress !== undefined && (
                      <div className={s.progressWrap}>
                        <div className={s.progressBar}>
                          <div className={s.progressFill} style={{ width: `${fw.progress}%` }} />
                        </div>
                        <div className={s.progressText}>
                          <span>Auto-mapping · {fw.progress}%</span>
                          <span>{fw.progressText}</span>
                        </div>
                      </div>
                    )}
                    {fw.hasUpgrade && (
                      <div className={s.upgradeBanner}>
                        <span>Version update available</span>
                        <button
                          type="button"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            fontSize: '11px',
                          }}
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className={s.sidebar}>
          <div className={s.sidebarSection}>
            <div className={s.sidebarTitle}>Config status</div>
            <div className={s.statRow}>
              <span className={s.statLabel}>Active frameworks</span>
              <span className={s.statValue}>
                {liveFrameworks.filter((f) => f.status === 'enabled').length}
              </span>
            </div>
            <div className={s.statRow}>
              <span className={s.statLabel}>Controls monitored</span>
              <span className={s.statValue}>
                {liveFrameworks
                  .filter((f) => f.status === 'enabled')
                  .reduce((a, f) => a + (f.mappedControls ?? 0), 0)}
              </span>
            </div>
            <div className={s.statRow}>
              <span className={s.statLabel}>Coverage</span>
              <span className={s.statValue}>38%</span>
            </div>
          </div>

          <div className={s.sidebarSection}>
            <div className={s.sidebarTitle}>Processing queue ({QUEUE_ITEMS.length})</div>
            {QUEUE_ITEMS.map((item) => (
              <div key={item.name} className={s.queueItem}>
                <div className={s.queueItemName}>
                  <span>{item.name}</span>
                  <span>{item.progress}%</span>
                </div>
                <div className={s.queueProgressBar}>
                  <div className={s.queueProgressFill} style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className={s.sidebarSection}>
            <div className={s.sidebarTitle}>Bulk actions</div>
            <div className={s.bulkActions}>
              <button type="button" className={s.bulkBtn}>
                Enable all P1 frameworks
              </button>
              <button type="button" className={s.bulkBtn}>
                Re-sync all mappings
              </button>
              <button type="button" className={s.bulkBtn}>
                Export framework report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
