import { Link } from "@tanstack/react-router";

type MobileNavigationProps = {
  onSignOut: () => void;
};

export function MobileNavigation({ onSignOut }: MobileNavigationProps) {
  return (
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
      <button type="button" onClick={onSignOut} className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1 text-[10px] text-on-surface-variant">
        <span className="material-symbols-outlined text-[20px]">logout</span>
        <span className="truncate">Sair</span>
      </button>
    </nav>
  );
}
