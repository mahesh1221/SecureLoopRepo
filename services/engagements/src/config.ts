import { z } from 'zod';

const ConfigSchema = z.object({
  PORT: z.coerce.number().default(4003),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be ≥16 chars'),
  JWT_ISSUER: z.string().default('secureloop-dev'),
  JWT_AUDIENCE: z.string().default('secureloop-dev'),
});

export type EngagementsServiceConfig = z.infer<typeof ConfigSchema>;

export function loadConfig(): EngagementsServiceConfig {
  const parsed = ConfigSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('✗ Invalid engagements-service config:', parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}
