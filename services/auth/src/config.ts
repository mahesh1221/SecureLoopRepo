import { z } from 'zod';

const ConfigSchema = z.object({
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be ≥16 chars'),
  JWT_ISSUER: z.string().default('secureloop-dev'),
  JWT_AUDIENCE: z.string().default('secureloop-dev'),
  DATABASE_URL_AUTH: z.string().min(1, 'DATABASE_URL_AUTH required'),
});

export type AuthServiceConfig = z.infer<typeof ConfigSchema>;

export function loadConfig(): AuthServiceConfig {
  const parsed = ConfigSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('✗ Invalid auth-service config:', parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}
