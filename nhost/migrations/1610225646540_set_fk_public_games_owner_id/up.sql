alter table "public"."games"
           add constraint "games_owner_id_fkey"
           foreign key ("owner_id")
           references "public"."players"
           ("id") on update restrict on delete restrict;
