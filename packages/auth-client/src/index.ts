export { signAccessToken, verifyAccessToken } from './jwt';
export { authPlugin, requireAuth, requireRole } from './middleware';
export type { AuthContext, JwtClaims, Role, AuthPluginOptions } from './types';
