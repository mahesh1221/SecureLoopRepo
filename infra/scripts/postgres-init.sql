-- SecureLoop — Postgres init script
-- Runs once on first container boot to create per-service databases.
-- Each service owns its own DB; cross-service queries are forbidden.

CREATE DATABASE secureloop_auth;
CREATE DATABASE secureloop_tenants;
CREATE DATABASE secureloop_users;
CREATE DATABASE secureloop_engagements;
CREATE DATABASE secureloop_findings;
CREATE DATABASE secureloop_reports;
CREATE DATABASE secureloop_risk;
CREATE DATABASE secureloop_remediation;
CREATE DATABASE secureloop_compliance;
CREATE DATABASE secureloop_assets;
CREATE DATABASE secureloop_integrations;
CREATE DATABASE secureloop_notifications;
CREATE DATABASE secureloop_billing;
CREATE DATABASE secureloop_audit_log;
CREATE DATABASE secureloop_files;
