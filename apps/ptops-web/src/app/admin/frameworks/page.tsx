'use client';

import { useState } from 'react';
import { Breadcrumb, Select } from '@secureloop/ui';
import { cn } from '@secureloop/ui';
import * as s from './page.css';

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
  { id: 'nist', name: 'NIST-CSF', desc: 'NIST Cybersecurity Framework v1.1 — 108 subcategories across 5 functions.', status: 'enabled', phase: 'P1', mappedControls: 108, totalControls: 108 },
  { id: 'cis', name: 'CIS v8', desc: 'Center for Internet Security Controls v8 — 18 control groups.', status: 'processing', phase: 'P1', progress: 39, progressText: '112/286', mappedControls: 112, totalControls: 286 },
  { id: 'soc2', name: 'SOC2 Type II', desc: 'Service Organization Control 2 — Trust Service Criteria.', status: 'enabled', phase: 'P1', mappedControls: 64, totalControls: 64 },
  { id: 'owasp', name: 'OWASP ASVS', desc: 'Application Security Verification Standard v4.0 — 286 requirements.', status: 'disabled', phase: 'P1', mappedControls: 0, totalControls: 286 },
  { id: 'csa', name: 'CSA CCM', desc: 'Cloud Controls Matrix v4 — 197 control specifications.', status: 'disabled', phase: 'P1', mappedControls: 0, totalControls: 197 },
  { id: 'pci', name: 'PCI-DSS v4', desc: 'Payment Card Industry Data Security Standard v4.0.', status: 'disabled', phase: 'P2', mappedControls: 0, totalControls: 259, hasUpgrade: true },
  { id: 'iso', name: 'ISO 27001', desc: 'Information security management systems — Annex A controls.', status: 'disabled', phase: 'P2', mappedControls: 0, totalControls: 93 },
  { id: 'hipaa', name: 'HIPAA', desc: 'Health Insurance Portability and Accountability Act safeguards.', status: 'disabled', phase: 'P2', mappedControls: 0, totalControls: 54 },
];

const TENANTS = [
  { value: '1', label: 'Acme Financial Corp' },
  { value: '2', label: 'CyberShield Ltd' },
  { value: '3', label: 'MediTrust Hospital' },
];

const QUEUE_ITEMS = [
  { name: 'CIS v8', progress: 39 },
  { name: 'Acme · NIST-CSF re-sync', progress: 74 },
];

const p1 = FRAMEWORKS.filter((f) => f.phase === 'P1');
const p2 = FRAMEWORKS.filter((f) => f.phase === 'P2');

export default function FrameworkConfigPage() {
  const [tenant, setTenant] = useState('1');

  const processingCount = FRAMEWORKS.filter((f) => f.status === 'processing').length;
  const tenantName = TENANTS.find((t) => t.value === tenant)?.label ?? '';

  return (
    <div className={s.page}>
      <Breadcrumb items={[{ label: 'Platform Admin', onClick: () => {} }, { label: 'Framework Configuration' }]} />
      <h1 className={s.pageTitle}>Framework Configuration</h1>
      <p className={s.pageSubtitle}>Enable and manage compliance frameworks per tenant</p>

      {/* Tenant selector bar */}
      <div className={s.tenantBar}>
        <div className={s.tenantBarIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
        </div>
        <span className={s.tenantBarName}>{tenantName}</span>
        <Select options={TENANTS} value={tenant} onChange={(e) => setTenant(e.target.value)} />
        {processingCount > 0 && (
          <div className={s.processingPulse}>
            <div className={s.pulseDot} />
            {processingCount} processing
          </div>
        )}
      </div>

      <div className={s.bodyGrid}>
        {/* Framework grid */}
        <div>
          {[['P1', p1] as const, ['P2', p2] as const].map(([phase, fws]) => (
            <div key={phase}>
              <div className={s.phaseHead}>
                <span className={cn(s.phaseChip, phase === 'P1' ? s.phaseChipP1 : s.phaseChipP2)}>{phase}</span>
                <span className={s.phaseTitle}>{phase === 'P1' ? 'Phase 1 — Launch frameworks' : 'Phase 2 — Extended frameworks'}</span>
                <span className={s.phaseCount}>{fws.length} available</span>
              </div>
              <div className={s.fwGrid}>
                {fws.map((fw) => (
                  <div
                    key={fw.id}
                    className={cn(
                      s.fwCard,
                      fw.status === 'processing' && s.fwCardProcessing,
                      fw.status === 'disabled' && s.fwCardDisabled
                    )}
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
                        <button type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '11px' }}>Update</button>
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
              <span className={s.statValue}>{FRAMEWORKS.filter((f) => f.status === 'enabled').length}</span>
            </div>
            <div className={s.statRow}>
              <span className={s.statLabel}>Controls monitored</span>
              <span className={s.statValue}>{FRAMEWORKS.filter((f) => f.status === 'enabled').reduce((a, f) => a + (f.mappedControls ?? 0), 0)}</span>
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
              <button type="button" className={s.bulkBtn}>Enable all P1 frameworks</button>
              <button type="button" className={s.bulkBtn}>Re-sync all mappings</button>
              <button type="button" className={s.bulkBtn}>Export framework report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
