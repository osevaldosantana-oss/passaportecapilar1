ALTER TABLE public.atendimento_executions
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS client_uuid uuid REFERENCES public.clients(id) ON DELETE RESTRICT;

ALTER TABLE public.atendimento_executions
  ADD CONSTRAINT atendimento_executions_owner_required
  CHECK (user_id IS NOT NULL AND client_uuid IS NOT NULL)
  NOT VALID;

ALTER TABLE public.atendimento_executions
  ADD CONSTRAINT atendimento_executions_client_name_length
  CHECK (char_length(btrim(client_name)) BETWEEN 2 AND 160),
  ADD CONSTRAINT atendimento_executions_treatment_length
  CHECK (char_length(btrim(base_treatment)) BETWEEN 1 AND 160),
  ADD CONSTRAINT atendimento_executions_pause_range
  CHECK (pause_time_minutes BETWEEN 0 AND 1440),
  ADD CONSTRAINT atendimento_executions_duration_range
  CHECK (execution_time_seconds IS NULL OR execution_time_seconds BETWEEN 0 AND 86400),
  ADD CONSTRAINT atendimento_executions_notes_length
  CHECK (tech_notes IS NULL OR char_length(tech_notes) <= 10000);

CREATE INDEX IF NOT EXISTS idx_atendimento_executions_owner_created
  ON public.atendimento_executions (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_atendimento_executions_client_created
  ON public.atendimento_executions (client_uuid, created_at DESC);

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('profissional'::public.app_role, 'admin'::public.app_role)
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;

DROP POLICY IF EXISTS "Professionals can view all executions" ON public.atendimento_executions;
DROP POLICY IF EXISTS "Professionals can create executions" ON public.atendimento_executions;
DROP POLICY IF EXISTS "Professionals can update executions" ON public.atendimento_executions;

CREATE POLICY "Profissionais veem suas execucoes"
ON public.atendimento_executions FOR SELECT TO authenticated
USING (
  auth.uid() = user_id
  AND (
    public.is_staff()
  )
);

CREATE POLICY "Profissionais criam suas execucoes"
ON public.atendimento_executions FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (
    public.is_staff()
  )
  AND EXISTS (
    SELECT 1
    FROM public.clients
    WHERE clients.id = atendimento_executions.client_uuid
      AND clients.user_id = auth.uid()
  )
);

CREATE POLICY "Profissionais atualizam suas execucoes"
ON public.atendimento_executions FOR UPDATE TO authenticated
USING (
  auth.uid() = user_id
  AND (
    public.is_staff()
  )
)
WITH CHECK (
  auth.uid() = user_id
  AND (
    public.is_staff()
  )
  AND EXISTS (
    SELECT 1
    FROM public.clients
    WHERE clients.id = atendimento_executions.client_uuid
      AND clients.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Profissionais veem seus clientes" ON public.clients;
DROP POLICY IF EXISTS "Profissionais cadastram seus clientes" ON public.clients;
DROP POLICY IF EXISTS "Profissionais atualizam seus clientes" ON public.clients;

CREATE POLICY "Profissionais veem seus clientes"
ON public.clients FOR SELECT TO authenticated
USING (
  auth.uid() = user_id
  AND (
    public.is_staff()
  )
);

CREATE POLICY "Profissionais cadastram seus clientes"
ON public.clients FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (
    public.is_staff()
  )
);

CREATE POLICY "Profissionais atualizam seus clientes"
ON public.clients FOR UPDATE TO authenticated
USING (
  auth.uid() = user_id
  AND (
    public.is_staff()
  )
)
WITH CHECK (
  auth.uid() = user_id
  AND (
    public.is_staff()
  )
);

ALTER TABLE public.clients
  ADD CONSTRAINT clients_full_name_length
  CHECK (char_length(btrim(full_name)) BETWEEN 2 AND 160),
  ADD CONSTRAINT clients_phone_length
  CHECK (phone IS NULL OR char_length(phone) BETWEEN 7 AND 32),
  ADD CONSTRAINT clients_passport_format
  CHECK (passport_id ~ '^PC-[0-9]{10,20}$');

ALTER TABLE public.clients DROP CONSTRAINT IF EXISTS clients_passport_id_key;
CREATE UNIQUE INDEX IF NOT EXISTS clients_user_passport_id_key
  ON public.clients (user_id, passport_id);

DROP POLICY IF EXISTS "Usuarios veem os proprios eventos de check-out" ON public.checkout_events;
DROP POLICY IF EXISTS "Usuarios registram os proprios eventos de check-out" ON public.checkout_events;

CREATE POLICY "Profissionais veem seus eventos de check-out"
ON public.checkout_events FOR SELECT TO authenticated
USING (
  auth.uid() = user_id
  AND public.is_staff()
);

CREATE POLICY "Profissionais registram seus eventos de check-out"
ON public.checkout_events FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND public.is_staff()
);

ALTER TABLE public.checkout_events
  ADD CONSTRAINT checkout_events_details_object
  CHECK (jsonb_typeof(details) = 'object');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS clients_set_updated_at ON public.clients;
CREATE TRIGGER clients_set_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;
