import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-diplomatic-navy/15 bg-parchment-white px-4 py-2">
        <span className="truncate font-mono-code text-[10px] uppercase tracking-[0.18em] text-diplomatic-navy/70">
          {user.email}
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 border border-diplomatic-navy/30 px-3 py-1 font-mono-code text-[10px] uppercase tracking-[0.18em] text-diplomatic-navy transition-colors hover:bg-diplomatic-navy hover:text-parchment-white"
        >
          Sair
        </button>
      </div>
      <Outlet />
    </>
  );
}
