-- 1. Clientes
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  passport_id text NOT NULL,
  phone text,
  email text,
  notes text,
  status text NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, passport_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profissionais veem os proprios clientes"
  ON public.clients FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Profissionais criam os proprios clientes"
  ON public.clients FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Profissionais atualizam os proprios clientes"
  ON public.clients FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Profissionais excluem os proprios clientes"
  ON public.clients FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_clients_user_created ON public.clients (user_id, created_at DESC);

-- 2. Execucoes de atendimento
CREATE TABLE public.atendimento_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_uuid uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  client_id text NOT NULL,
  client_name text NOT NULL,
  professional_name text,
  base_treatment text NOT NULL,
  active_ingredients text[],
  proportion_base numeric,
  proportion_active numeric,
  pause_time_minutes integer,
  execution_time_seconds integer,
  protocol_steps jsonb,
  tech_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.atendimento_executions TO authenticated;
GRANT ALL ON public.atendimento_executions TO service_role;

ALTER TABLE public.atendimento_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profissionais veem as proprias execucoes"
  ON public.atendimento_executions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Profissionais criam as proprias execucoes"
  ON public.atendimento_executions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Profissionais atualizam as proprias execucoes"
  ON public.atendimento_executions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_atendimento_executions_updated_at
  BEFORE UPDATE ON public.atendimento_executions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_exec_user_created ON public.atendimento_executions (user_id, created_at DESC);

-- 3. Check-out com cliente, profissional e status
CREATE TYPE public.checkout_status AS ENUM ('concluido', 'pendente', 'cancelado');

ALTER TABLE public.checkout_events
  ADD COLUMN client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  ADD COLUMN client_name text,
  ADD COLUMN professional_name text,
  ADD COLUMN status public.checkout_status NOT NULL DEFAULT 'concluido';

CREATE INDEX idx_checkout_events_client ON public.checkout_events (client_id);

-- 4. Perfil profissional
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS passport_id text,
  ADD COLUMN IF NOT EXISTS role_title text,
  ADD COLUMN IF NOT EXISTS avatar_url text;