alter table "public"."plays"
           add constraint "plays_card_id_fkey"
           foreign key ("card_id")
           references "public"."cards"
           ("id") on update restrict on delete restrict;
