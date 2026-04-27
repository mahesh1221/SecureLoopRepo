'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authApi, type LoginResponse } from './api';

const STORAGE_KEY = 'sl.auth';

export type AuthUser = LoginResponse['user'];

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface PersistedAuth {
  token: string;
  user: AuthUser;
  expiresAt: number;
}

function readPersisted(): PersistedAuth | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedAuth;
    if (Date.now() > parsed.expiresAt) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function persist(token: string, user: AuthUser, expiresInSec: number) {
  const payload: PersistedAuth = {
    token,
    user,
    expiresAt: Date.now() + expiresInSec * 1000,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function clearPersisted() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ token: null, user: null, loading: true });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const persisted = readPersisted();
    if (persisted) {
      setState({ token: persisted.token, user: persisted.user, loading: false });
    } else {
      setState((s) => ({ ...s, loading: false }));
    }
  }, []);

  // Redirect unauthenticated users away from protected paths.
  useEffect(() => {
    if (state.loading) return;
    const isPublic = pathname === '/login' || pathname === '/';
    if (!state.token && !isPublic) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [state.loading, state.token, pathname, router]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    persist(res.accessToken, res.user, res.expiresIn);
    setState({ token: res.accessToken, user: res.user, loading: false });
  }, []);

  const logout = useCallback(async () => {
    if (state.token) {
      try {
        await authApi.logout(state.token);
      } catch {
        // best-effort; clear locally regardless
      }
    }
    clearPersisted();
    setState({ token: null, user: null, loading: false });
    router.replace('/login');
  }, [state.token, router]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Convenience: returns the JWT or throws if absent. Use inside protected pages. */
export function useAuthToken(): string {
  const { token, loading } = useAuth();
  if (loading) throw new Error('Auth still loading — guard with useAuth().loading');
  if (!token) throw new Error('Not authenticated — page should redirect via AuthProvider');
  return token;
}
