import { createFileRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
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
      <nav
        aria-label="Navegação principal"
        className="authenticated-mobile-nav fixed inset-x-0 bottom-0 z-[60] flex items-center justify-around border-t border-outline-variant bg-parchment-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-4px_20px_rgba(74,14,14,0.08)] backdrop-blur-md md:hidden"
      >
        <Link to="/dashboard" className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1 text-[10px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span className="truncate">Início</span>
        </Link>
        <Link to="/cliente" className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1 text-[10px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">group</span>
          <span className="truncate">Clientes</span>
        </Link>
        <Link to="/atendimento" className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1 text-[10px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          <span className="truncate">Atender</span>
        </Link>
        <Link to="/passaporte" className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1 text-[10px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">style</span>
          <span className="truncate">Passaporte</span>
        </Link>
        <button type="button" onClick={handleSignOut} className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1 text-[10px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="truncate">Sair</span>
        </button>
      </nav>
      <Outlet />
    </>
  );
}
