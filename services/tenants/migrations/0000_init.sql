CREATE TYPE "public"."framework_status" AS ENUM('enabled', 'processing', 'disabled', 'error');--> statement-breakpoint
CREATE TYPE "public"."tenant_plan" AS ENUM('starter', 'pro', 'enterprise');--> statement-breakpoint
CREATE TYPE "public"."tenant_status" AS ENUM('draft', 'active', 'suspended');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platform_defaults" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"sla" jsonb NOT NULL,
	"escalation" jsonb NOT NULL,
	"access_policies" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "platform_defaults_singleton" CHECK ("platform_defaults"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platform_integrations" (
	"id" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_frameworks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"framework_id" text NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"auto_map" boolean DEFAULT true NOT NULL,
	"status" "framework_status" DEFAULT 'enabled' NOT NULL,
	"mapped_controls" integer DEFAULT 0 NOT NULL,
	"total_controls" integer DEFAULT 0 NOT NULL,
	"last_sync" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tenant_framework_unique" UNIQUE("tenant_id","framework_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"industry" text,
	"country" text,
	"plan" "tenant_plan" DEFAULT 'starter' NOT NULL,
	"status" "tenant_status" DEFAULT 'draft' NOT NULL,
	"sla_critical_hrs" integer DEFAULT 4 NOT NULL,
	"sla_high_hrs" integer DEFAULT 24 NOT NULL,
	"sla_medium_hrs" integer DEFAULT 72 NOT NULL,
	"sla_low_hrs" integer DEFAULT 168 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tenant_frameworks" ADD CONSTRAINT "tenant_frameworks_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
