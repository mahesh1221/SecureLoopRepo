'use client';

import { useState } from 'react';
import { Breadcrumb, Callout, Button } from '@secureloop/ui';
import { cn } from '@secureloop/ui';
import * as s from './page.css';

const TABS = [
  'SLA defaults',
  'Escalation chains',
  'Notification templates',
  'Access policies',
  'Integration defaults',
];

const INFO_ICON = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const SLA_ROWS = [
  { sev: 'critical', label: 'Critical', dot: 'critical', default: 4 },
  { sev: 'high', label: 'High', dot: 'high', default: 24 },
  { sev: 'medium', label: 'Medium', dot: 'medium', default: 72 },
  { sev: 'low', label: 'Low', dot: 'low', default: 168 },
] as const;

const ESCALATION_LEVELS = [
  { level: 1, delay: '0h', roles: 'Security Eng.' },
  { level: 2, delay: '+24h', roles: 'Delivery Mgr.' },
  { level: 3, delay: '+72h', roles: 'CISO' },
  { level: 4, delay: '+168h', roles: 'Business Owner' },
];

const ACCESS_POLICIES = [
  {
    label: 'Multi-factor authentication',
    desc: 'Require MFA for all logins',
    options: ['Required', 'Optional'],
    value: 'Required',
  },
  {
    label: 'Session timeout',
    desc: 'Inactivity timeout policy',
    options: ['Standard', 'Strict'],
    value: 'Standard',
  },
  {
    label: 'API access',
    desc: 'Allow API key generation',
    options: ['Enabled', 'Disabled'],
    value: 'Enabled',
  },
  {
    label: 'SSO enforcement',
    desc: 'Force SSO when configured',
    options: ['Required', 'Optional'],
    value: 'Optional',
  },
];

export default function PlatformDefaultsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [slaValues, setSlaValues] = useState({ critical: 4, high: 24, medium: 72, low: 168 });
  const [policies, setPolicies] = useState(ACCESS_POLICIES.map((p) => p.value));
  const [hasChanges, setHasChanges] = useState(false);

  const adjSla = (sev: keyof typeof slaValues, delta: number) => {
    setSlaValues((prev) => ({ ...prev, [sev]: Math.max(1, prev[sev] + delta) }));
    setHasChanges(true);
  };

  const setPolicyValue = (idx: number, val: string) => {
    setPolicies((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
    setHasChanges(true);
  };

  return (
    <div className={s.page}>
      <Breadcrumb
        items={[{ label: 'Platform Admin', onClick: () => {} }, { label: 'Platform Defaults' }]}
      />
      <h1 className={s.pageTitle}>Platform Defaults</h1>
      <p className={s.pageSubtitle}>
        Configure default settings applied when new tenants are provisioned
      </p>

      <Callout icon={INFO_ICON} tone="brand">
        Changes to platform defaults apply to <strong>new tenants only</strong>. Existing tenant
        settings are not affected.
      </Callout>

      <div style={{ marginTop: '20px' }}>
        {/* Tabs */}
        <div className={s.tabBar}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={cn(s.tabItem, activeTab === i && s.tabItemActive)}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={s.bodyGrid}>
          {/* Left: content */}
          <div>
            {activeTab === 0 && (
              <div className={s.card}>
                <div className={s.cardHeader}>SLA defaults</div>
                <div className={s.cardBody}>
                  <div className={s.slaHeader}>
                    <span className={s.thCell}>Severity</span>
                    <span className={s.thCell}>SLA (hours)</span>
                    <span className={s.thCell}>Grace period</span>
                    <span className={s.thCell}>Clock setting</span>
                  </div>
                  {SLA_ROWS.map((row) => (
                    <div key={row.sev} className={s.slaRow}>
                      <div className={s.slaSev}>
                        <div className={cn(s.slaDot, s.slaDotVariants[row.dot])} />
                        {row.label}
                      </div>
                      <div className={s.slaStepper}>
                        <button
                          type="button"
                          className={s.slaStepBtn}
                          onClick={() => adjSla(row.sev, -1)}
                        >
                          −
                        </button>
                        <input
                          className={s.slaInput}
                          type="number"
                          value={slaValues[row.sev]}
                          onChange={(e) => {
                            setSlaValues((p) => ({ ...p, [row.sev]: Number(e.target.value) }));
                            setHasChanges(true);
                          }}
                          min={1}
                        />
                        <button
                          type="button"
                          className={s.slaStepBtn}
                          onClick={() => adjSla(row.sev, 1)}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--sl-ink-60)' }}>24h grace</span>
                      <span style={{ fontSize: '13px', color: 'var(--sl-ink-60)' }}>
                        Business hours
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className={s.card}>
                <div className={s.cardHeader}>Escalation chains</div>
                <div className={s.cardBody}>
                  <div className={s.escalationChain}>
                    {ESCALATION_LEVELS.map((lvl, i) => (
                      <>
                        <div key={lvl.level} className={s.escalationCard}>
                          <div className={s.escalationLevel}>Level {lvl.level}</div>
                          <div className={s.escalationDelay}>{lvl.delay}</div>
                          <div
                            style={{
                              fontSize: '11px',
                              color: 'var(--sl-ink-60)',
                              marginTop: '4px',
                            }}
                          >
                            {lvl.roles}
                          </div>
                        </div>
                        {i < ESCALATION_LEVELS.length - 1 && (
                          <span className={s.escalationArrow}>→</span>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className={s.card}>
                <div className={s.cardHeader}>Notification templates</div>
                <div className={s.cardBody}>
                  <p style={{ color: 'var(--sl-ink-60)', fontSize: '13px' }}>
                    Configure default email and Slack notification templates for new tenants.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className={s.card}>
                <div className={s.cardHeader}>Access policies</div>
                <div className={s.cardBody}>
                  {ACCESS_POLICIES.map((policy, i) => (
                    <div key={policy.label} className={s.policyRow}>
                      <div className={s.policyText}>
                        <div className={s.policyLabel}>{policy.label}</div>
                        <div className={s.policyDesc}>{policy.desc}</div>
                      </div>
                      <div className={s.segPill}>
                        {policy.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={cn(s.segPillBtn, policies[i] === opt && s.segPillBtnActive)}
                            onClick={() => setPolicyValue(i, opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div className={s.card}>
                <div className={s.cardHeader}>Integration defaults</div>
                <div className={s.cardBody}>
                  <p style={{ color: 'var(--sl-ink-60)', fontSize: '13px' }}>
                    Configure which integrations are pre-enabled for new tenants.
                  </p>
                </div>
              </div>
            )}

            {/* Footer actions */}
            <div className={s.footerActions}>
              <Button variant="ghost" size="sm">
                Reset to defaults
              </Button>
              <Button variant="ghost" size="sm">
                Apply to selected tenants
              </Button>
              <Button variant="ghost" size="sm">
                Preview impact
              </Button>
              <div style={{ flex: 1 }} />
              <Button variant="primary" size="sm" disabled={!hasChanges}>
                Save changes · new tenants only
              </Button>
            </div>
          </div>

          {/* Right: sidebar */}
          <div className={s.sidebar}>
            <div className={s.sidebarCard}>
              <div className={s.sidebarCardHeader}>Impact preview</div>
              <div className={s.sidebarCardBody}>
                {[
                  { label: 'Tenants affected', value: '0' },
                  { label: 'Users notified', value: '0' },
                  { label: 'Next provision', value: 'Uses new defaults' },
                ].map((item) => (
                  <div key={item.label} className={s.impactStat}>
                    <span className={s.impactLabel}>{item.label}</span>
                    <span className={s.impactValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {hasChanges && (
              <div className={s.sidebarCard}>
                <div className={s.sidebarCardHeader}>Pending changes</div>
                <div className={s.sidebarCardBody}>
                  {slaValues.critical !== 4 && (
                    <div className={s.diffItem}>
                      <div className={s.diffLabel}>Critical SLA</div>
                      <div className={s.diffOld}>Was: 4h</div>
                      <div className={s.diffNew}>Now: {slaValues.critical}h</div>
                    </div>
                  )}
                  {slaValues.high !== 24 && (
                    <div className={s.diffItem}>
                      <div className={s.diffLabel}>High SLA</div>
                      <div className={s.diffOld}>Was: 24h</div>
                      <div className={s.diffNew}>Now: {slaValues.high}h</div>
                    </div>
                  )}
                  {!slaValues.critical && !slaValues.high && (
                    <p style={{ fontSize: '13px', color: 'var(--sl-ink-40)' }}>
                      Policy changes pending
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className={s.sidebarCard}>
              <div className={s.sidebarCardHeader}>Recent changes</div>
              <div className={s.sidebarCardBody}>
                {[
                  { text: 'Critical SLA updated: 4h → 2h', time: '3 days ago · Platform Admin' },
                  { text: 'MFA set to required', time: '1 week ago · Platform Admin' },
                  {
                    text: 'Grace period removed from Low SLA',
                    time: '2 weeks ago · Platform Admin',
                  },
                ].map((item) => (
                  <div key={item.text} className={s.historyItem}>
                    <div className={s.historyText}>{item.text}</div>
                    <div className={s.historyTime}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
