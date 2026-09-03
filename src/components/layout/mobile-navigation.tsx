import { Link } from "@tanstack/react-router";

type MobileNavigationProps = {
  onSignOut: () => void;
};

export function MobileNavigation({ onSignOut }: MobileNavigationProps) {
  return (
    <header
      aria-label="Navegação principal"
      className="app-mobile-nav fixed inset-x-0 bottom-0 z-[60] flex items-center justify-around border-t border-[var(--color-outline-variant)] pt-2 shadow-[0_-4px_20px_rgba(74,14,14,0.1)] md:hidden"
    >
      <Link
        to="/dashboard"
        className="mobile-nav-link flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1 text-[10px] text-[var(--color-on-surface-variant)]"
      >
        <span className="material-symbols-outlined text-[22px] leading-none">dashboard</span>
        <span className="truncate leading-tight">Início</span>
      </Link>
      <Link
        to="/cliente"
        className="mobile-nav-link flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1 text-[10px] text-[var(--color-on-surface-variant)]"
      >
        <span className="material-symbols-outlined text-[22px] leading-none">group</span>
        <span className="truncate leading-tight">Clientes</span>
      </Link>
      <Link
        to="/atendimento"
        className="mobile-nav-link flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1 text-[10px] text-[var(--color-on-surface-variant)]"
      >
        <span className="material-symbols-outlined text-[22px] leading-none">calendar_today</span>
        <span className="truncate leading-tight">Atender</span>
      </Link>
      <Link
        to="/passaporte"
        className="mobile-nav-link flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1 text-[10px] text-[var(--color-on-surface-variant)]"
      >
        <span className="material-symbols-outlined text-[22px] leading-none">style</span>
        <span className="truncate leading-tight">Passaporte</span>
      </Link>
      <button
        type="button"
        onClick={onSignOut}
        className="mobile-nav-link flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1 text-[10px] text-[var(--color-on-surface-variant)]"
      >
        <span className="material-symbols-outlined text-[22px] leading-none">logout</span>
        <span className="truncate leading-tight">Sair</span>
      </button>
    </header>
  );
}
