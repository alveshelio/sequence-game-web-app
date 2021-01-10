ALTER TABLE "public"."games" ALTER COLUMN "owner" SET NOT NULL;
alter table "public"."games" rename column "owner" to "owner_id";
