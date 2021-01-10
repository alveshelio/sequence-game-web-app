ALTER TABLE "public"."games" ALTER COLUMN "owner" DROP NOT NULL;
alter table "public"."games" rename column "owner_id" to "owner";
