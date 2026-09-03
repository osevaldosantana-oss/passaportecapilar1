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
      { label: "Coleção de Carimbos", to: "/passaporte/colecao" },
    ],
  },
];

export function PrimaryNavigation() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        aria-label="Navegação principal"
        className="app-primary-navigation fixed inset-y-0 left-0 z-[55] hidden w-64 flex-col border-r border-outline-variant bg-parchment-white px-4 py-8 md:flex"
      >
        <div className="mb-10 px-4">
          <p className="font-label-caps text-label-caps uppercase tracking-widest text-antique-gold">
            Passaporte Capilar
          </p>
          <p className="mt-2 font-display-lg text-2xl leading-tight text-deep-burgundy">
            Navegação
          </p>
        </div>
        <nav
          aria-label="Módulos principais"
          className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto"
        >
          {navigationModules.map((module) => (
            <div key={module.label} className="min-w-0">
              <Link
                to={module.to}
                className="flex min-h-11 items-center gap-3 rounded-lg px-4 py-3 font-title-md text-title-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-deep-burgundy"
              >
                <span className="material-symbols-outlined shrink-0">{module.icon}</span>
                <span className="truncate">{module.label}</span>
              </Link>
              {module.children && (
                <div className="ml-11 mt-1 flex flex-col gap-1 border-l border-outline-variant pl-3">
                  {module.children.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded px-2 py-1.5 font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-low hover:text-deep-burgundy"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

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
