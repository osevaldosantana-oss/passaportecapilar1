import { createFileRoute, Link } from "@tanstack/react-router";
import { AppSidebar } from "@/components/layout/app-sidebar";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administracao - Passaporte Capilar(TM)" },
      { name: "description", content: "Painel de administracao: gerencie clientes, profissionais e Papeis no Passaporte Capilar." },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-parchment-white flex">
      <AppSidebar active="/admin" />
      <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop">
        <header className="mb-8">
          <p className="font-metadata text-metadata text-antique-gold uppercase tracking-widest">Painel</p>
          <h1 className="font-display-lg text-display-lg text-deep-burgundy">Administracao</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            Gerencie clientes, profissionais e Papeis no sistema.
          </p>
        </header>
        <nav className="flex gap-4 mb-8 border-b border-outline-variant pb-4">
          <Link to="/admin" className="font-label-caps text-label-caps text-deep-burgundy border-b-2 border-deep-burgundy pb-1 px-2">Visao Geral</Link>
          <Link to="/cliente" className="font-label-caps text-label-caps text-on-surface-variant hover:text-deep-burgundy transition-colors px-2">Clientes</Link>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Clientes", icon: "group", desc: "Gerenciar cadastro de clientes", to: "/cliente" },
            { label: "Profissionais", icon: "badge", desc: "Cadastro e permissoes", to: "/dashboard" },
            { label: "Papeis", icon: "admin_panel_settings", desc: "Definir permissoes de acesso", to: "/dashboard" },
          ].map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg hover:border-antique-gold/50 hover:shadow-md transition-all group"
            >
              <span className="material-symbols-outlined text-antique-gold text-2xl mb-4 block">{card.icon}</span>
              <h3 className="font-title-md text-title-md text-deep-burgundy group-hover:text-antique-gold transition-colors">{card.label}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
