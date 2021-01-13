ALTER TABLE "public"."plays" ADD COLUMN "team_id" uuid;
ALTER TABLE "public"."plays" ALTER COLUMN "team_id" DROP NOT NULL;
