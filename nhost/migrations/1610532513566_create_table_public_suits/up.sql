CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."suits"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "suit" Text NOT NULL, PRIMARY KEY ("id") );
