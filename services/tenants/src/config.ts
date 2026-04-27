import { z } from 'zod';

const ConfigSchema = z.object({
  PORT: z.coerce.number().default(3001),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be ≥16 chars'),
  JWT_ISSUER: z.string().default('secureloop-dev'),
  JWT_AUDIENCE: z.string().default('secureloop-dev'),
});

export type TenantsServiceConfig = z.infer<typeof ConfigSchema>;

export function loadConfig(): TenantsServiceConfig {
  const parsed = ConfigSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('✗ Invalid tenants-service config:', parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}
