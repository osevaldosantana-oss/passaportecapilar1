CREATE TYPE public.checkout_step AS ENUM ('criacao', 'carimbo', 'sincronizacao');

CREATE TABLE public.checkout_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  step public.checkout_step NOT NULL,
  chapter text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.checkout_events TO authenticated;
GRANT ALL ON public.checkout_events TO service_role;

ALTER TABLE public.checkout_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios veem os proprios eventos de check-out"
ON public.checkout_events FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios registram os proprios eventos de check-out"
ON public.checkout_events FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_checkout_events_user_created ON public.checkout_events (user_id, created_at DESC);