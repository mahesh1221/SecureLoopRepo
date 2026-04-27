'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wizard, Callout, Input, Select } from '@secureloop/ui';
import { cn } from '@secureloop/ui';
import * as s from './page.css';

const FW_P1 = ['NIST-CSF', 'CIS v8', 'SOC2 Type II', 'OWASP ASVS', 'CSA CCM'];
const FW_P2 = ['PCI-DSS', 'ISO 27001', 'HIPAA', 'CMMC', 'FedRAMP', 'SAMA'];

const SLA_ROWS = [
  { sev: 'critical', label: 'Critical', dot: 'critical', default: 4 },
  { sev: 'high', label: 'High', dot: 'high', default: 24 },
  { sev: 'medium', label: 'Medium', dot: 'medium', default: 72 },
  { sev: 'low', label: 'Low', dot: 'low', default: 168 },
] as const;

const INFO_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function TenantCreationWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [cloneEnabled, setCloneEnabled] = useState(false);
  const [selectedFw, setSelectedFw] = useState<string[]>(['NIST-CSF', 'SOC2 Type II']);
  const [slaValues, setSlaValues] = useState({ critical: 4, high: 24, medium: 72, low: 168 });
  const [orgName, setOrgName] = useState('');
  const [orgSlug, setOrgSlug] = useState('');
  const [plan, setPlan] = useState('enterprise');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  const toggleFw = (fw: string) => {
    setSelectedFw((prev) =>
      prev.includes(fw) ? prev.filter((f) => f !== fw) : [...prev, fw]
    );
  };

  const adjSla = (sev: keyof typeof slaValues, delta: number) => {
    setSlaValues((prev) => ({
      ...prev,
      [sev]: Math.max(1, prev[sev] + delta),
    }));
  };

  const previewSidebar = (
    <div className={s.previewSidebar}>
      <div className={s.previewTitle}>Preview</div>
      <div className={s.previewItem}>
        <span className={s.previewLabel}>Tenant name</span>
        <span className={s.previewValue}>{orgName || '—'}</span>
      </div>
      <div className={s.previewItem}>
        <span className={s.previewLabel}>Slug</span>
        <span className={s.previewValue}>{orgSlug ? `${orgSlug}.secureloop.io` : '—'}</span>
      </div>
      <div className={s.previewDivider} />
      <div className={s.previewItem}>
        <span className={s.previewLabel}>Plan</span>
        <span className={s.previewValue}>{plan}</span>
      </div>
      <div className={s.previewItem}>
        <span className={s.previewLabel}>Frameworks</span>
        <span className={s.previewValue}>{selectedFw.length} selected</span>
      </div>
      <div className={s.previewDivider} />
      <div className={s.previewItem}>
        <span className={s.previewLabel}>SLA · Critical</span>
        <span className={s.previewValue}>{slaValues.critical}h</span>
      </div>
      <div className={s.previewItem}>
        <span className={s.previewLabel}>SLA · High</span>
        <span className={s.previewValue}>{slaValues.high}h</span>
      </div>
    </div>
  );

  const steps = [
    {
      label: 'Organisation details',
      content: (
        <div className={s.wizardBody}>
          <div>
            <div className={s.cloneBar}>
              <span className={s.cloneLabel}>Clone existing tenant</span>
              <div className={s.segPill}>
                <button
                  type="button"
                  className={cn(s.segPillBtn, !cloneEnabled && s.segPillBtnActive)}
                  onClick={() => setCloneEnabled(false)}
                >Off</button>
                <button
                  type="button"
                  className={cn(s.segPillBtn, cloneEnabled && s.segPillBtnActive)}
                  onClick={() => setCloneEnabled(true)}
                >On</button>
              </div>
            </div>
            <p className={s.stepLabel}>Step 1 of 5</p>
            <h2 className={s.stepTitle}>Organisation details</h2>
            <div className={s.formRow}>
              <div className={s.formField}>
                <label className={s.formLabel}>Organisation name</label>
                <Input placeholder="Acme Corp" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              </div>
              <div className={s.formField}>
                <label className={s.formLabel}>Tenant slug</label>
                <Input placeholder="acme-corp" value={orgSlug} onChange={(e) => setOrgSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
              </div>
            </div>
            <div className={s.formRow}>
              <div className={s.formField}>
                <label className={s.formLabel}>Industry</label>
                <Select options={[
                  { value: 'finance', label: 'Finance' },
                  { value: 'technology', label: 'Technology' },
                  { value: 'healthcare', label: 'Healthcare' },
                  { value: 'retail', label: 'Retail' },
                  { value: 'logistics', label: 'Logistics' },
                ]} value="finance" onChange={() => {}} />
              </div>
              <div className={s.formField}>
                <label className={s.formLabel}>Country</label>
                <Select options={[
                  { value: 'us', label: 'United States' },
                  { value: 'uk', label: 'United Kingdom' },
                  { value: 'au', label: 'Australia' },
                  { value: 'ca', label: 'Canada' },
                ]} value="us" onChange={() => {}} />
              </div>
            </div>
            <div className={s.formField}>
              <label className={s.formLabel}>Plan</label>
              <Select
                options={[
                  { value: 'starter', label: 'Starter' },
                  { value: 'pro', label: 'Pro' },
                  { value: 'enterprise', label: 'Enterprise' },
                ]}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              />
            </div>
          </div>
          {previewSidebar}
        </div>
      ),
    },
    {
      label: 'Compliance frameworks',
      content: (
        <div className={s.wizardBody}>
          <div>
            <p className={s.stepLabel}>Step 2 of 5</p>
            <h2 className={s.stepTitle}>Compliance frameworks</h2>
            <Callout icon={INFO_ICON} tone="brand">
              Frameworks marked P1 are auto-mapped at activation. P2 frameworks can be enabled later.
            </Callout>
            <div style={{ marginTop: '16px' }}>
              <div className={s.phaseHead}>
                <span className={cn(s.phaseChip, s.phaseChipP1)}>P1</span>
                <span className={s.phaseTitle}>Phase 1 — Launch frameworks</span>
                <span className={s.phaseCount}>{FW_P1.length} available</span>
              </div>
              <div className={s.fwGrid}>
                {FW_P1.map((fw) => (
                  <div
                    key={fw}
                    className={s.fwCard}
                    data-checked={selectedFw.includes(fw) ? 'true' : 'false'}
                    onClick={() => toggleFw(fw)}
                    role="checkbox"
                    aria-checked={selectedFw.includes(fw)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === ' ' && toggleFw(fw)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFw.includes(fw)}
                      onChange={() => toggleFw(fw)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span className={s.fwName}>{fw}</span>
                  </div>
                ))}
              </div>
              <div className={s.phaseHead}>
                <span className={cn(s.phaseChip, s.phaseChipP2)}>P2</span>
                <span className={s.phaseTitle}>Phase 2 — Extended frameworks</span>
                <span className={s.phaseCount}>{FW_P2.length} available</span>
              </div>
              <div className={s.fwGrid}>
                {FW_P2.map((fw) => (
                  <div
                    key={fw}
                    className={s.fwCard}
                    data-checked={selectedFw.includes(fw) ? 'true' : 'false'}
                    onClick={() => toggleFw(fw)}
                    role="checkbox"
                    aria-checked={selectedFw.includes(fw)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === ' ' && toggleFw(fw)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFw.includes(fw)}
                      onChange={() => toggleFw(fw)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span className={s.fwName}>{fw}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {previewSidebar}
        </div>
      ),
    },
    {
      label: 'SLA configuration',
      content: (
        <div className={s.wizardBody}>
          <div>
            <p className={s.stepLabel}>Step 3 of 5</p>
            <h2 className={s.stepTitle}>SLA configuration</h2>
            <Callout icon={INFO_ICON} tone="brand">
              SLA hours define the remediation deadline after a finding is confirmed. These override platform defaults for this tenant.
            </Callout>
            <div style={{ marginTop: '16px' }}>
              <div className={s.slaRow}>
                <span className={s.formLabel}>Severity</span>
                <span className={s.formLabel}>SLA (hours)</span>
                <span className={s.formLabel}>Grace period</span>
                <span className={s.formLabel}>Clock</span>
              </div>
              {SLA_ROWS.map((row) => (
                <div key={row.sev} className={s.slaRow}>
                  <div className={s.slaSev}>
                    <div className={cn(s.slaDot, s.slaDotVariants[row.dot])} />
                    {row.label}
                  </div>
                  <div className={s.slaStepper}>
                    <button type="button" className={s.slaStepBtn} onClick={() => adjSla(row.sev, -1)}>−</button>
                    <input
                      className={s.slaInput}
                      type="number"
                      value={slaValues[row.sev]}
                      onChange={(e) => setSlaValues((p) => ({ ...p, [row.sev]: Number(e.target.value) }))}
                      min={1}
                    />
                    <button type="button" className={s.slaStepBtn} onClick={() => adjSla(row.sev, 1)}>+</button>
                  </div>
                  <Select options={[{ value: '24', label: '24h' }, { value: '48', label: '48h' }]} value="24" onChange={() => {}} />
                  <Select options={[{ value: 'business', label: 'Business hours' }, { value: 'calendar', label: 'Calendar' }]} value="business" onChange={() => {}} />
                </div>
              ))}
            </div>
          </div>
          {previewSidebar}
        </div>
      ),
    },
    {
      label: 'Admin user',
      content: (
        <div className={s.wizardBody}>
          <div>
            <p className={s.stepLabel}>Step 4 of 5</p>
            <h2 className={s.stepTitle}>Admin user</h2>
            <p style={{ fontSize: '13px', color: 'var(--sl-ink-60)', marginBottom: '16px' }}>
              The admin user receives an invitation email and has full tenant access until additional users are configured.
            </p>
            <div className={s.adminCard}>
              <div className={s.formRow}>
                <div className={s.formField}>
                  <label className={s.formLabel}>Full name</label>
                  <Input placeholder="Jane Smith" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>Email address</label>
                  <Input type="email" placeholder="jane@acme.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                </div>
              </div>
              <div className={s.formField}>
                <label className={s.formLabel}>Job title</label>
                <Input placeholder="CISO" />
              </div>
            </div>
          </div>
          {previewSidebar}
        </div>
      ),
    },
    {
      label: 'Activate',
      content: (
        <div className={s.wizardBody}>
          <div>
            <p className={s.stepLabel}>Step 5 of 5</p>
            <h2 className={s.stepTitle}>Ready to activate</h2>
            <p style={{ fontSize: '13px', color: 'var(--sl-ink-60)', marginBottom: '16px' }}>
              The following will be provisioned when you activate this tenant.
            </p>
            <div className={s.activateList}>
              {[
                'Tenant environment provisioned',
                `${selectedFw.length} compliance framework${selectedFw.length !== 1 ? 's' : ''} enabled and mapped`,
                'SLA configuration applied',
                adminEmail ? `Invitation sent to ${adminEmail}` : 'Admin user invited',
                'Audit log initialised',
              ].map((item) => (
                <div key={item} className={s.activateItem}>
                  <div className={cn(s.activateIcon, s.activateIconGood)}>{CHECK_ICON}</div>
                  <span className={s.activateText}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          {previewSidebar}
        </div>
      ),
    },
  ];

  const STEP_LABELS: Record<number, string> = {
    0: 'Save as draft',
    1: 'Next · Default SLA',
    2: 'Next · Admin user',
    3: 'Next · Activate',
    4: 'Activate tenant',
  };

  return (
    <Wizard
      open={true}
      title="Create new tenant"
      steps={steps}
      currentStep={step}
      onNext={() => {
        if (step < steps.length - 1) setStep(step + 1);
        else router.push('/admin/tenants');
      }}
      onBack={() => setStep(Math.max(0, step - 1))}
      onClose={() => router.push('/admin/tenants')}
      nextLabel={STEP_LABELS[step] ?? 'Next'}
    />
  );
}
