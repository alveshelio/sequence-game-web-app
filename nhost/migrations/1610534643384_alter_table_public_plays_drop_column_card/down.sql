ALTER TABLE "public"."plays" ADD COLUMN "card" text;
ALTER TABLE "public"."plays" ALTER COLUMN "card" DROP NOT NULL;
