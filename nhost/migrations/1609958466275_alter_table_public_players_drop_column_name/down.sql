ALTER TABLE "public"."players" ADD COLUMN "name" text;
ALTER TABLE "public"."players" ALTER COLUMN "name" DROP NOT NULL;
