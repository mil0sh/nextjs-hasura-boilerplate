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
CREATE TABLE public.accounts (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    compound_id character varying NOT NULL,
    user_id uuid NOT NULL,
    provider_type character varying NOT NULL,
    provider_id character varying NOT NULL,
    provider_account_id character varying NOT NULL,
    refresh_token text,
    access_token text,
    access_token_expires timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.animal_types (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.breeds (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    animal_type uuid NOT NULL,
    name text NOT NULL,
    original_name text,
    category text,
    official_id text
);
CREATE TABLE public.feeds (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    author_id uuid NOT NULL,
    body text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.sessions (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id integer NOT NULL,
    expires timestamp with time zone NOT NULL,
    session_token character varying NOT NULL,
    access_token character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying,
    email character varying NOT NULL,
    email_verified timestamp with time zone,
    image character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    role text DEFAULT 'user'::text,
    title text DEFAULT 'Dr Vet.Med.'::text,
    password text DEFAULT 'vetplaneta'::text NOT NULL
);
CREATE TABLE public.verification_requests (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    identifier character varying NOT NULL,
    token character varying NOT NULL,
    expires timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.animal_types
    ADD CONSTRAINT animal_types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT breeds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.feeds
    ADD CONSTRAINT feeds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.verification_requests
    ADD CONSTRAINT verification_requests_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_accounts_updated_at BEFORE UPDATE ON public.accounts FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_accounts_updated_at ON public.accounts IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_feeds_updated_at BEFORE UPDATE ON public.feeds FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_feeds_updated_at ON public.feeds IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_sessions_updated_at BEFORE UPDATE ON public.sessions FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_sessions_updated_at ON public.sessions IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_verification_requests_updated_at BEFORE UPDATE ON public.verification_requests FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_verification_requests_updated_at ON public.verification_requests IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT breeds_animal_type_fkey FOREIGN KEY (animal_type) REFERENCES public.animal_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
