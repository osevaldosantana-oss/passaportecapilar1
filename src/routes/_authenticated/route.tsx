import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PrimaryNavigation } from "@/components/layout/primary-navigation";

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
      <PrimaryNavigation />
      <Outlet />
      <style dangerouslySetInnerHTML={{ __html: `
        .app-mobile-nav {
          height: calc(72px + env(safe-area-inset-bottom));
          padding-bottom: env(safe-area-inset-bottom);
          background-color: rgba(249, 246, 240, 0.97);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
        }
        .mobile-nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 4px 6px;
          border-radius: 12px;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
          min-width: 48px;
          min-height: 48px;
          cursor: pointer;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link:focus-visible {
          background-color: rgba(74, 14, 14, 0.07);
          color: #4A0E0E;
          transform: translateY(-1px);
        }
        .mobile-nav-link:active {
          transform: translateY(0) scale(0.94);
          background-color: rgba(74, 14, 14, 0.12);
        }
        .mobile-nav-link .material-symbols-outlined {
          font-size: 22px;
          line-height: 1;
          transition: transform 0.2s ease;
        }
        .mobile-nav-link:hover .material-symbols-outlined {
          transform: scale(1.06);
        }
      ` }} />
    </>
  );
}
