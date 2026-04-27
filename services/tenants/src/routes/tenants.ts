import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireRole } from '@secureloop/auth-client';
import type { TenantsRepository } from '../repositories/tenants';

const CreateTenantSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'slug must be lowercase alphanumeric + hyphens'),
  industry: z.string().optional(),
  country: z.string().optional(),
  plan: z.enum(['starter', 'pro', 'enterprise']).default('starter'),
  sla: z
    .object({
      critical: z.number().int().positive().default(4),
      high: z.number().int().positive().default(24),
      medium: z.number().int().positive().default(72),
      low: z.number().int().positive().default(168),
    })
    .optional(),
});

const CloneTenantSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  cloneFrameworks: z.boolean().default(true),
  cloneSla: z.boolean().default(true),
});

const ListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(200).default(50),
});

export function tenantRoutes(fastify: FastifyInstance, repo: TenantsRepository) {
  fastify.post('/', { preHandler: requireRole('ADMIN') }, async (request, reply) => {
    const body = CreateTenantSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }

    const existing = await repo.findBySlug(body.data.slug);
    if (existing) {
      return reply.status(409).send({ error: 'Tenant slug already in use', slug: body.data.slug });
    }

    const sla = body.data.sla;
    const tenant = await repo.create({
      name: body.data.name,
      slug: body.data.slug,
      industry: body.data.industry ?? null,
      country: body.data.country ?? null,
      plan: body.data.plan,
      ...(sla
        ? {
            slaCriticalHrs: sla.critical,
            slaHighHrs: sla.high,
            slaMediumHrs: sla.medium,
            slaLowHrs: sla.low,
          }
        : {}),
    });

    return reply.status(201).send(tenant);
  });

  fastify.get('/', { preHandler: requireRole('ADMIN', 'DM') }, async (request, reply) => {
    const query = ListQuerySchema.safeParse(request.query);
    if (!query.success) {
      return reply.status(400).send({ error: 'Invalid query', issues: query.error.issues });
    }
    const result = await repo.list(query.data);
    return reply.send(result);
  });

  fastify.get('/:id', { preHandler: requireRole('ADMIN', 'DM') }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const tenant = await repo.findById(id);
    if (!tenant) return reply.status(404).send({ error: 'Tenant not found', id });
    return reply.send(tenant);
  });

  fastify.post('/:id/clone', { preHandler: requireRole('ADMIN') }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = CloneTenantSchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }

    const slugTaken = await repo.findBySlug(body.data.slug);
    if (slugTaken) {
      return reply.status(409).send({ error: 'Tenant slug already in use', slug: body.data.slug });
    }

    try {
      const cloned = await repo.clone(
        id,
        { name: body.data.name, slug: body.data.slug },
        { cloneFrameworks: body.data.cloneFrameworks, cloneSla: body.data.cloneSla },
      );
      return reply.status(201).send({ ...cloned, sourceId: id });
    } catch (err) {
      if (err instanceof Error && err.message.includes('not found')) {
        return reply.status(404).send({ error: err.message });
      }
      throw err;
    }
  });
}
