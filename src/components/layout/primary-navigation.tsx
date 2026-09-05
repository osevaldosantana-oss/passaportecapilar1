import { Link } from "@tanstack/react-router";

type NavigationItem = {
  label: string;
  icon: string;
  to: string;
  children?: Array<{ label: string; to: string }>;
};

export const navigationModules: NavigationItem[] = [
  {
    label: "Início",
    icon: "dashboard",
    to: "/dashboard",
    children: [
      { label: "Visão geral", to: "/dashboard" },
      { label: "Auditoria", to: "/auditoria" },
    ],
  },
  {
    label: "Clientes",
    icon: "group",
    to: "/cliente",
    children: [
      { label: "Lista de clientes", to: "/cliente" },
    ],
  },
  {
    label: "Atender",
    icon: "calendar_today",
    to: "/atendimento",
    children: [
      { label: "Novo atendimento", to: "/atendimento" },
      { label: "Check-in", to: "/check-in" },
      { label: "Check-out", to: "/check-out" },
    ],
  },
  {
    label: "Passaporte",
    icon: "style",
    to: "/passaporte",
    children: [
      { label: "Jornada completa", to: "/passaporte" },
      { label: "Capa", to: "/passaporte/capa" },
      { label: "Coleção de Carimbos", to: "/carimbos/colecao" },
    ],
  },
];

export function PrimaryNavigation() {
  return (
    <>
      {/* Mobile bottom nav */}
      <nav
        aria-label="Navegação principal"
        className="app-primary-navigation fixed inset-x-0 bottom-0 z-[60] flex items-center justify-around border-t border-outline-variant bg-parchment-white/95 px-1 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-4px_20px_rgba(74,14,14,0.08)] backdrop-blur-md md:hidden"
      >
        {navigationModules.map((module) => (
          <Link
            key={module.label}
            to={module.to}
            className="flex min-w-0 flex-1 flex-col items-center gap-1 px-0.5 py-1 text-[9px] text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[19px]">{module.icon}</span>
            <span className="truncate">{module.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
