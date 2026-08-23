DROP POLICY IF EXISTS "Somente admins inserem papeis" ON public.user_roles;
DROP POLICY IF EXISTS "Somente admins atualizam papeis" ON public.user_roles;
DROP POLICY IF EXISTS "Somente admins removem papeis" ON public.user_roles;
DROP POLICY IF EXISTS "Usuarios veem os proprios papeis" ON public.user_roles;

CREATE POLICY "Usuarios veem os proprios papeis"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Ninguem altera papeis pela API" 
ON public.user_roles FOR ALL TO anon, authenticated
USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "Usuarios veem o proprio perfil" ON public.profiles;
CREATE POLICY "Usuarios veem o proprio perfil"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id);