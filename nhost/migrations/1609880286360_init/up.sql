CREATE EXTENSION IF NOT EXISTS citext;
CREATE SCHEMA auth;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE auth.account_providers (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    account_id uuid NOT NULL,
    auth_provider text NOT NULL,
    auth_provider_unique_id text NOT NULL
);
CREATE TABLE auth.account_roles (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    account_id uuid NOT NULL,
    role text NOT NULL
);
CREATE TABLE auth.accounts (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL,
    active boolean DEFAULT false NOT NULL,
    email public.citext,
    new_email public.citext,
    password_hash text,
    default_role text DEFAULT 'user'::text NOT NULL,
    is_anonymous boolean DEFAULT false NOT NULL,
    custom_register_data jsonb,
    otp_secret text,
    mfa_enabled boolean DEFAULT false NOT NULL,
    ticket uuid DEFAULT public.gen_random_uuid() NOT NULL,
    ticket_expires_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT proper_email CHECK ((email OPERATOR(public.~*) '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::public.citext)),
    CONSTRAINT proper_new_email CHECK ((new_email OPERATOR(public.~*) '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::public.citext))
);
CREATE TABLE auth.providers (
    provider text NOT NULL
);
CREATE TABLE auth.refresh_tokens (
    refresh_token uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    account_id uuid NOT NULL
);
CREATE TABLE auth.roles (
    role text NOT NULL
);
CREATE TABLE public.friends (
    requester_id uuid NOT NULL,
    addressee_id uuid NOT NULL,
    CONSTRAINT friends_requester_id_check_not_equal_addressee_id CHECK ((requester_id IS DISTINCT FROM addressee_id))
);
CREATE TABLE public.games (
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    in_progress boolean DEFAULT false,
    winner_id uuid,
    started_at timestamp with time zone,
    ended_at timestamp with time zone
);
CREATE TABLE public.players (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid,
    email text NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.team_players (
    team_id uuid NOT NULL,
    player_id uuid NOT NULL
);
CREATE TABLE public.teams (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    color text NOT NULL,
    game_id uuid NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    display_name text,
    avatar_url text
);
ALTER TABLE ONLY auth.account_providers
    ADD CONSTRAINT account_providers_account_id_auth_provider_key UNIQUE (account_id, auth_provider);
ALTER TABLE ONLY auth.account_providers
    ADD CONSTRAINT account_providers_auth_provider_auth_provider_unique_id_key UNIQUE (auth_provider, auth_provider_unique_id);
ALTER TABLE ONLY auth.account_providers
    ADD CONSTRAINT account_providers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY auth.account_roles
    ADD CONSTRAINT account_roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);
ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_new_email_key UNIQUE (new_email);
ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_user_id_key UNIQUE (user_id);
ALTER TABLE ONLY auth.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (provider);
ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (refresh_token);
ALTER TABLE ONLY auth.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role);
ALTER TABLE ONLY auth.account_roles
    ADD CONSTRAINT user_roles_account_id_role_key UNIQUE (account_id, role);
ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_email_key UNIQUE (email);
ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT team_players_key PRIMARY KEY (team_id, player_id);
ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.friends
    ADD CONSTRAINT uq_friends_addressee_id_requester_id UNIQUE (addressee_id, requester_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX friends_uni_idx ON public.friends USING btree (GREATEST(requester_id, addressee_id), LEAST(requester_id, addressee_id));
CREATE TRIGGER set_auth_account_providers_updated_at BEFORE UPDATE ON auth.account_providers FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_auth_accounts_updated_at BEFORE UPDATE ON auth.accounts FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_games_updated_at BEFORE UPDATE ON public.games FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_games_updated_at ON public.games IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
ALTER TABLE ONLY auth.account_providers
    ADD CONSTRAINT account_providers_account_id_fkey FOREIGN KEY (account_id) REFERENCES auth.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY auth.account_providers
    ADD CONSTRAINT account_providers_auth_provider_fkey FOREIGN KEY (auth_provider) REFERENCES auth.providers(provider) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY auth.account_roles
    ADD CONSTRAINT account_roles_account_id_fkey FOREIGN KEY (account_id) REFERENCES auth.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY auth.account_roles
    ADD CONSTRAINT account_roles_role_fkey FOREIGN KEY (role) REFERENCES auth.roles(role) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_default_role_fkey FOREIGN KEY (default_role) REFERENCES auth.roles(role) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_account_id_fkey FOREIGN KEY (account_id) REFERENCES auth.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_addressee_id_fkey FOREIGN KEY (addressee_id) REFERENCES public.players(id);
ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_requester_id_fkey FOREIGN KEY (requester_id) REFERENCES public.players(id);
ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_winner_fkey FOREIGN KEY (winner_id) REFERENCES public.teams(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT team_players_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id);
ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT team_players_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id);
ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
