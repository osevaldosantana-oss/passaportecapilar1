import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

type SidebarItem = { label: string; icon: string; to: string };

export const sidebarItems: SidebarItem[] = [
  { label: "Visão Geral", icon: "dashboard", to: "/dashboard" },
  { label: "Clientes", icon: "group", to: "/cliente" },
  { label: "Atendimento", icon: "calendar_today", to: "/atendimento" },
  { label: "Check-in", icon: "login", to: "/check-in" },
  { label: "Check-out", icon: "how_to_reg", to: "/check-out" },
  { label: "Passaportes", icon: "style", to: "/passaporte" },
  { label: "Carimbos", icon: "approval", to: "/carimbos/colecao" },
  { label: "Relatórios", icon: "assessment", to: "/relatorios" },
  { label: "Auditoria", icon: "history_edu", to: "/auditoria" },
  { label: "Administração", icon: "admin_panel_settings", to: "/admin" },
];

export function AppSidebar({
  active,
  professionalName,
  passportId,
}: {
  active?: string;
  professionalName?: string | null;
  passportId?: string | null;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <nav
      aria-label="Navegação principal"
      className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white z-50 justify-between py-8 px-4 overflow-y-auto"
    >
      <div>
        <Link to="/dashboard" className="mb-8 px-4 flex items-center gap-3">
          <img src={logo} alt="Passaporte Capilar" width={40} height={40} className="w-10 h-10 shrink-0" />
          <span>
            <span className="block font-display-lg text-[18px] text-deep-burgundy tracking-tight leading-tight">
              Passaporte Capilar™
            </span>
            <span className="block font-metadata text-metadata text-antique-gold uppercase tracking-widest">
              Consul de Beleza
            </span>
          </span>
        </Link>

        <Link
          to="/check-in"
          className="w-full mb-6 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Novo Atendimento
        </Link>

        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={
                  active === item.to
                    ? "flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold"
                    : "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg"
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-title-md text-body-lg">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-1">
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-title-md text-body-lg">Sair</span>
        </button>
        <div className="flex items-center gap-3 px-4 pt-4 border-t border-outline-variant">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant">
            <span className="material-symbols-outlined text-deep-burgundy text-[20px]">person</span>
          </div>
          <div className="min-w-0">
            <p className="font-label-caps text-label-caps text-on-surface truncate">
              {professionalName || "Profissional"}
            </p>
            <p className="font-metadata text-metadata text-on-surface-variant truncate">
              {passportId || "Passaporte Capilar™"}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
