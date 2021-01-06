ALTER TABLE "public"."players" ADD COLUMN "user_id" uuid;
ALTER TABLE "public"."players" ALTER COLUMN "user_id" DROP NOT NULL;
ALTER TABLE "public"."players" ADD CONSTRAINT players_user_id_fkey FOREIGN KEY (user_id) REFERENCES "public"."users" (id) ON DELETE restrict ON UPDATE restrict;
