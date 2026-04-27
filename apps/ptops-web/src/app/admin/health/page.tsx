'use client';

import { useState } from 'react';
import { Breadcrumb, LiveDot, Button } from '@secureloop/ui';
import { cn } from '@secureloop/ui';
import * as s from './page.css';

type IncidentStatus = 'open' | 'investigating' | 'mitigated' | 'resolved';
type Severity = 'crit' | 'high' | 'warn';
type TileVariant = 'good' | 'warn' | 'crit';

interface MetricTile {
  id: string;
  title: string;
  sub: string;
  variant: TileVariant;
  statusLabel: string;
  stats: { label: string; value: string }[];
  sparkPoints: number[];
}

interface TenantImpact {
  name: string;
  severity: Severity;
  desc: string;
  users: number;
}

interface Incident {
  id: string;
  started: string;
  duration: string;
  service: string;
  tenants: number;
  status: IncidentStatus;
}

const TILES: MetricTile[] = [
  {
    id: 'api',
    title: 'API response time',
    sub: 'All endpoints',
    variant: 'good',
    statusLabel: 'Nominal',
    stats: [
      { label: 'Avg', value: '42ms' },
      { label: 'P95', value: '118ms' },
      { label: 'P99', value: '287ms' },
    ],
    sparkPoints: [35, 42, 38, 55, 41, 37, 44, 39, 42, 40, 43, 41],
  },
  {
    id: 'db',
    title: 'Database',
    sub: 'PostgreSQL primary',
    variant: 'warn',
    statusLabel: 'High load',
    stats: [
      { label: 'Avg', value: '18ms' },
      { label: 'P95', value: '94ms' },
      { label: 'Conns', value: '312' },
    ],
    sparkPoints: [14, 16, 18, 22, 31, 45, 62, 74, 81, 88, 91, 94],
  },
  {
    id: 'integrations',
    title: 'Integration health',
    sub: 'Active connectors',
    variant: 'warn',
    statusLabel: '4 failures',
    stats: [
      { label: 'Active', value: '19' },
      { label: 'Healthy', value: '15' },
      { label: 'Failed', value: '4' },
    ],
    sparkPoints: [19, 19, 18, 18, 17, 16, 17, 18, 18, 17, 16, 15],
  },
  {
    id: 'sessions',
    title: 'Active sessions',
    sub: 'All tenants',
    variant: 'good',
    statusLabel: 'Normal',
    stats: [
      { label: 'Active', value: '847' },
      { label: 'Peak', value: '1,204' },
      { label: 'Auth/min', value: '38' },
    ],
    sparkPoints: [620, 710, 820, 950, 1100, 1200, 1100, 980, 900, 850, 847, 840],
  },
];

const TENANT_IMPACTS: TenantImpact[] = [
  {
    name: 'MediTrust Hospital',
    severity: 'crit',
    desc: 'ServiceNow sync failure — 12 open findings not synced',
    users: 89,
  },
  {
    name: 'RetailMax Group',
    severity: 'high',
    desc: 'Qualys rate limit — scanner polling paused',
    users: 15,
  },
  {
    name: 'CyberShield Ltd',
    severity: 'warn',
    desc: 'Azure AD auth degraded — some SSO logins slow',
    users: 38,
  },
];

const INCIDENTS: Incident[] = [
  {
    id: 'INC-0041',
    started: 'Apr 27, 09:14',
    duration: 'Ongoing',
    service: 'ServiceNow connector',
    tenants: 7,
    status: 'open',
  },
  {
    id: 'INC-0040',
    started: 'Apr 26, 22:51',
    duration: '1h 14m',
    service: 'Database · primary',
    tenants: 0,
    status: 'resolved',
  },
  {
    id: 'INC-0039',
    started: 'Apr 25, 15:08',
    duration: '48m',
    service: 'Auth service',
    tenants: 3,
    status: 'resolved',
  },
  {
    id: 'INC-0038',
    started: 'Apr 24, 11:33',
    duration: '2h 07m',
    service: 'Qualys poller',
    tenants: 12,
    status: 'mitigated',
  },
];

function Sparkline({ points, variant }: { points: number[]; variant: TileVariant }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const w = 240;
  const h = 60;
  const pad = 4;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - pad * 2));
  const ys = points.map((v) => h - pad - ((v - min) / range) * (h - pad * 2));
  const linePath = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  const areaPath = `${linePath} L${xs[xs.length - 1]},${h - pad} L${xs[0]},${h - pad} Z`;
  const colors = {
    good: { stroke: 'var(--sl-status-good)', fill: 'var(--sl-status-good-bg)' },
    warn: { stroke: 'var(--sl-status-high)', fill: 'var(--sl-status-high-bg)' },
    crit: { stroke: 'var(--sl-status-critical)', fill: 'var(--sl-status-critical-bg)' },
  };
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={s.sparkline}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d={areaPath} fill={colors[variant].fill} opacity={0.6} />
      <path
        d={linePath}
        stroke={colors[variant].stroke}
        strokeWidth={1.5}
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PlatformHealthPage() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={s.page}>
      <Breadcrumb
        items={[{ label: 'Platform Admin', onClick: () => {} }, { label: 'Platform Health' }]}
      />

      {/* Page header */}
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>Platform Health</h1>
        {!paused && <LiveDot interval="refresh 30s" />}
        <div className={s.headerActions}>
          <Button variant="ghost" size="sm" onClick={() => setPaused((p) => !p)}>
            {paused ? 'Resume' : 'Pause'}
          </Button>
          <Button variant="ghost" size="sm">
            Alert config
          </Button>
        </div>
      </div>

      {/* Health status bar */}
      <div className={cn(s.healthBar, s.healthBarDegraded)}>
        <div className={s.trafficLight}>
          <div className={cn(s.trafficCircle, s.trafficCircleVariants.dimGreen)} />
          <div className={cn(s.trafficCircle, s.trafficCircleVariants.amber)} />
          <div className={cn(s.trafficCircle, s.trafficCircleVariants.dimRed)} />
        </div>
        <div className={s.healthStatusLabel}>Degraded — integration layer impacted</div>
        <div className={s.healthBarMeta}>
          <span>Last check: 30s ago</span>
          <span>Next: in 30s</span>
          <span>Uptime: 99.71%</span>
        </div>
      </div>

      {/* Incident banner */}
      <div className={s.incidentBanner}>
        <span className={s.incidentIcon}>
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
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </span>
        <span className={s.incidentText}>
          <strong>INC-0041</strong> · ServiceNow connector failing for 7 tenants — auth token
          rotation in progress
        </span>
        <Button variant="ghost" size="sm">
          View incident
        </Button>
      </div>

      {/* Body grid */}
      <div className={s.bodyGrid}>
        {/* 2×2 metrics */}
        <div className={s.metricsGrid}>
          {TILES.map((tile) => (
            <div key={tile.id} className={s.metricTile}>
              <div className={s.tileTop}>
                <div className={cn(s.tileIconWrap, s.tileIconVariants[tile.variant])}>
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
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className={s.tileTitle}>{tile.title}</div>
                  <div className={s.tileSub}>{tile.sub}</div>
                </div>
                <span className={cn(s.tileBadge, s.tileBadgeVariants[tile.variant])}>
                  {tile.statusLabel}
                </span>
              </div>
              <div className={s.tileStats}>
                {tile.stats.map((stat) => (
                  <div key={stat.label} className={s.tileStat}>
                    <span className={s.tileStatLabel}>{stat.label}</span>
                    <span className={s.tileStatValue}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <Sparkline points={tile.sparkPoints} variant={tile.variant} />
            </div>
          ))}
        </div>

        {/* Tenant impact sidebar */}
        <div className={s.sidebar}>
          <div className={s.sidebarHeader}>
            <span>Tenant impact</span>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--sl-ink-40)',
                fontFamily: 'var(--sl-font-mono)',
              }}
            >
              {TENANT_IMPACTS.length} affected
            </span>
          </div>
          <div className={s.impactList}>
            {TENANT_IMPACTS.map((t) => (
              <div key={t.name} className={s.impactItem}>
                <span className={cn(s.impactBadge, s.impactBadgeVariants[t.severity])}>
                  {t.severity.toUpperCase()}
                </span>
                <div>
                  <div className={s.impactTenantName}>{t.name}</div>
                  <div className={s.impactDesc}>{t.desc}</div>
                  <div className={s.impactUsers}>{t.users} users</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incident timeline table */}
      <div className={s.timelineSection}>
        <div className={s.timelineSectionTitle}>Incident timeline · last 7 days</div>
        <div className={s.timelineTable}>
          <div className={s.timelineHeader}>
            <span className={s.thCell}>Incident ID</span>
            <span className={s.thCell}>Started</span>
            <span className={s.thCell}>Duration</span>
            <span className={s.thCell}>Affected service</span>
            <span className={s.thCell}>Tenants</span>
            <span className={s.thCell}>Status</span>
          </div>
          {INCIDENTS.map((inc) => (
            <div key={inc.id} className={s.timelineRow}>
              <span className={s.tdMono}>{inc.id}</span>
              <span className={s.tdCell}>{inc.started}</span>
              <span className={s.tdMono}>{inc.duration}</span>
              <span className={s.tdCell}>{inc.service}</span>
              <span className={s.tdMono}>{inc.tenants > 0 ? inc.tenants : '—'}</span>
              <span>
                {inc.status === 'open' && <span className={s.openStatusDot} />}
                <span className={cn(s.statusBadge, s.statusBadgeVariants[inc.status])}>
                  {inc.status.charAt(0).toUpperCase() + inc.status.slice(1)}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
