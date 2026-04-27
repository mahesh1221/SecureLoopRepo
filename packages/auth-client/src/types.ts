export type Role =
  | 'CISO'
  | 'CTRL'
  | 'TSTR'
  | 'SENG'
  | 'TEAM'
  | 'BO'
  | 'DM'
  | 'FIN'
  | 'LGL'
  | 'SUB'
  | 'AUD'
  | 'ADMIN'
  | 'IE';

export interface JwtClaims {
  sub: string;
  tenantId: string;
  email: string;
  roles: Role[];
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export interface AuthContext {
  userId: string;
  tenantId: string;
  email: string;
  roles: Role[];
}

export interface AuthPluginOptions {
  secret: string;
  issuer?: string;
  audience?: string;
  publicPaths?: string[];
}

declare module 'fastify' {
  interface FastifyRequest {
    auth?: AuthContext;
  }
}
