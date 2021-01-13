CREATE TABLE player_cards
  (
     player_id uuid NOT NULL REFERENCES players(id),
     card_id uuid NOT NULL REFERENCES cards(id),
     CONSTRAINT PK_cards_player_id_card_id PRIMARY KEY (player_id, card_id),
     CONSTRAINT UQ_player_id_card_id UNIQUE (player_id, card_id)
  );
