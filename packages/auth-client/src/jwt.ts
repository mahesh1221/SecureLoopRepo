import jwt, { type SignOptions } from 'jsonwebtoken';
import type { JwtClaims } from './types';

export interface SignTokenInput {
  userId: string;
  tenantId: string;
  email: string;
  roles: JwtClaims['roles'];
}

export interface SignTokenConfig {
  secret: string;
  issuer?: string;
  audience?: string;
  expiresIn?: SignOptions['expiresIn'];
}

export function signAccessToken(input: SignTokenInput, config: SignTokenConfig): string {
  const payload: Omit<JwtClaims, 'iat' | 'exp' | 'iss' | 'aud'> = {
    sub: input.userId,
    tenantId: input.tenantId,
    email: input.email,
    roles: input.roles,
  };

  const options: SignOptions = {
    expiresIn: config.expiresIn ?? '1h',
    ...(config.issuer ? { issuer: config.issuer } : {}),
    ...(config.audience ? { audience: config.audience } : {}),
  };

  return jwt.sign(payload, config.secret, options);
}

export interface VerifyTokenConfig {
  secret: string;
  issuer?: string;
  audience?: string;
}

export function verifyAccessToken(token: string, config: VerifyTokenConfig): JwtClaims {
  const decoded = jwt.verify(token, config.secret, {
    ...(config.issuer ? { issuer: config.issuer } : {}),
    ...(config.audience ? { audience: config.audience } : {}),
  });

  if (typeof decoded === 'string') {
    throw new Error('Invalid token payload');
  }

  return decoded as JwtClaims;
}
