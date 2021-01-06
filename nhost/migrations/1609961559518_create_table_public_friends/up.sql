CREATE TABLE "public"."friends"("requester_id" uuid NOT NULL, "addressee_id" uuid NOT NULL, PRIMARY KEY ("requester_id","addressee_id") , FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON UPDATE no action ON DELETE no action, FOREIGN KEY ("addressee_id") REFERENCES "public"."users"("id") ON UPDATE no action ON DELETE no action, UNIQUE ("requester_id", "addressee_id"), CONSTRAINT "friends_requester_id_check_not_equal_addressee_id" CHECK (requester_id IS DISTINCT FROM addressee_id));
