import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add 'request' to the enum_jobs_status enum type
  await db.execute(sql`
    ALTER TYPE "public"."enum_jobs_status" ADD VALUE IF NOT EXISTS 'request';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: PostgreSQL doesn't support removing enum values directly
  // You would need to recreate the enum type to remove a value
  // For now, this is a no-op
}
