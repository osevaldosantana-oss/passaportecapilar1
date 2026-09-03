CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  passport_id text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profissionais veem seus clientes"
ON public.clients FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Profissionais cadastram seus clientes"
ON public.clients FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Profissionais atualizam seus clientes"
ON public.clients FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_clients_user_created ON public.clients (user_id, created_at DESC);
