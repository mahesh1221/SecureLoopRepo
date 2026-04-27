/**
 * Typed fetch wrappers for SecureLoop services.
 *
 * Reads service URLs from `NEXT_PUBLIC_SERVICE_*_URL` (browser-side).
 * Adds `Authorization: Bearer <jwt>` from the auth context when present.
 */

const AUTH_BASE = process.env['NEXT_PUBLIC_SERVICE_AUTH_URL'] ?? 'http://localhost:4000';
const TENANTS_BASE = process.env['NEXT_PUBLIC_SERVICE_TENANTS_URL'] ?? 'http://localhost:4001';

export class ApiError extends Error {
  status: number;
  details: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function request<T>(
  base: string,
  path: string,
  init: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const { token, headers, ...rest } = init;
  const res = await fetch(`${base}${path}`, {
    ...rest,
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
  });

  if (!res.ok) {
    let payload: unknown;
    try {
      payload = await res.json();
    } catch {
      payload = await res.text();
    }
    const message =
      typeof payload === 'object' &&
      payload &&
      'error' in payload &&
      typeof payload.error === 'string'
        ? payload.error
        : `HTTP ${res.status}`;
    throw new ApiError(res.status, message, payload);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  user: { id: string; email: string; tenantId: string; roles: string[] };
}

export const authApi = {
  login: (email: string, password: string) =>
    request<LoginResponse>(AUTH_BASE, '/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: (token: string) => request<LoginResponse['user']>(AUTH_BASE, '/auth/me', { token }),
  logout: (token: string) =>
    request<{ ok: true }>(AUTH_BASE, '/auth/logout', { method: 'POST', token }),
};

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  industry: string | null;
  country: string | null;
  plan: 'starter' | 'pro' | 'enterprise';
  status: 'draft' | 'active' | 'suspended';
  slaCriticalHrs: number;
  slaHighHrs: number;
  slaMediumHrs: number;
  slaLowHrs: number;
  createdAt: string;
  updatedAt: string;
}

export interface TenantList {
  data: Tenant[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateTenantInput {
  name: string;
  slug: string;
  industry?: string;
  country?: string;
  plan?: Tenant['plan'];
  sla?: { critical: number; high: number; medium: number; low: number };
}

export interface TenantFramework {
  id: string;
  tenantId: string;
  frameworkId: string;
  enabled: boolean;
  autoMap: boolean;
  status: 'enabled' | 'processing' | 'disabled' | 'error';
  mappedControls: number;
  totalControls: number;
  lastSync: string | null;
  updatedAt: string;
}

export interface PlatformDefaults {
  id: number;
  sla: { critical: number; high: number; medium: number; low: number };
  escalation: { level: number; delayHours: number; notifyRoles: string[] }[];
  accessPolicies: {
    mfaRequired: boolean;
    sessionTimeout: 'standard' | 'strict';
    apiAccess: boolean;
  };
  updatedAt: string;
}

export interface PlatformIntegration {
  id: string;
  category: string;
  enabled: boolean;
  config: Record<string, unknown>;
  updatedAt: string;
}

export const tenantsApi = {
  list: (token: string, page = 1, pageSize = 50) =>
    request<TenantList>(TENANTS_BASE, `/tenants?page=${page}&pageSize=${pageSize}`, { token }),
  get: (token: string, id: string) => request<Tenant>(TENANTS_BASE, `/tenants/${id}`, { token }),
  create: (token: string, input: CreateTenantInput) =>
    request<Tenant>(TENANTS_BASE, '/tenants', {
      method: 'POST',
      body: JSON.stringify(input),
      token,
    }),
  clone: (
    token: string,
    sourceId: string,
    body: { name: string; slug: string; cloneFrameworks: boolean; cloneSla: boolean },
  ) =>
    request<Tenant & { sourceId: string }>(TENANTS_BASE, `/tenants/${sourceId}/clone`, {
      method: 'POST',
      body: JSON.stringify(body),
      token,
    }),
  listFrameworks: (token: string, tenantId: string) =>
    request<{ data: TenantFramework[] }>(TENANTS_BASE, `/tenants/${tenantId}/frameworks`, {
      token,
    }),
  setFramework: (
    token: string,
    tenantId: string,
    frameworkId: string,
    body: { enabled: boolean; autoMap: boolean },
  ) =>
    request<TenantFramework>(TENANTS_BASE, `/tenants/${tenantId}/frameworks/${frameworkId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      token,
    }),
};

export const platformApi = {
  getDefaults: (token: string) =>
    request<PlatformDefaults>(TENANTS_BASE, '/platform/defaults', { token }),
  updateDefaults: (token: string, body: Partial<Omit<PlatformDefaults, 'id' | 'updatedAt'>>) =>
    request<PlatformDefaults>(TENANTS_BASE, '/platform/defaults', {
      method: 'PUT',
      body: JSON.stringify(body),
      token,
    }),
  listIntegrations: (token: string) =>
    request<{ data: PlatformIntegration[]; total: number }>(
      TENANTS_BASE,
      '/platform/integrations',
      { token },
    ),
  upsertIntegrations: (
    token: string,
    items: { id: string; category: string; enabled: boolean; config?: Record<string, unknown> }[],
  ) =>
    request<{ updated: number; data: PlatformIntegration[] }>(
      TENANTS_BASE,
      '/platform/integrations',
      {
        method: 'PUT',
        body: JSON.stringify(items),
        token,
      },
    ),
  health: (token: string) =>
    request<{
      status: string;
      uptime: number;
      lastCheck: string;
      nextCheck: string;
      services: Record<string, string>;
    }>(TENANTS_BASE, '/platform/health', { token }),
};
