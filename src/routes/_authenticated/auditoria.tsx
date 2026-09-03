import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  listCheckoutEvents,
} from "@/lib/checkout-audit.functions";
import {
  stepLabels,
  stepColors,
  stepIcons,
  type CheckoutEvent,
  type CheckoutStep,
} from "@/lib/checkout-audit.schema";

const pageCss = `
  .bg-dots {
    background-image: radial-gradient(#dac1bf 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .stat-card {
    transition: all 0.3s ease;
  }
  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139,0,0,0.12);
  }
  .event-row {
    transition: background-color 0.2s ease;
  }
  .event-row:hover {
    background-color: rgba(197,160,89,0.06);
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .table-header th {
    position: sticky;
    top: 0;
    background: #F9F6F0;
    z-index: 1;
  }
  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
  .shimmer-bar {
    position: relative;
    overflow: hidden;
  }
  .shimmer-bar::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(197,160,89,0.12), transparent);
    animation: shimmer 2s infinite;
  }
`;

export const Route = createFileRoute("/_authenticated/auditoria")({
  head: () => ({
    meta: [
      { title: "Auditoria — Passaporte Capilar" },
      { name: "description", content: "Registro completo de todos os eventos de check-out e atendimento." },
    ],
  }),
  component: Page,
});

type FilterStep = CheckoutStep | "TODOS";

function Page() {
  const [filterStep, setFilterStep] = useState<FilterStep>("TODOS");
  const [searchChapter, setSearchChapter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const allEvents = (listCheckoutEvents({ data: { limit: 500 } }) ?? []) as CheckoutEvent[];

  const filtered = allEvents.filter((ev) => {
    const matchStep = filterStep === "TODOS" || ev.step === filterStep;
    const matchSearch =
      !searchChapter ||
      (ev.chapter ?? "").toLowerCase().includes(searchChapter.toLowerCase()) ||
      (ev.details && JSON.stringify(ev.details).toLowerCase().includes(searchChapter.toLowerCase()));
    return matchStep && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const countByStep = (step: CheckoutStep) => allEvents.filter((e) => e.step === step).length;

  const stats = [
    { label: "Total de Eventos", value: allEvents.length, icon: "history", color: "#4A0E0E" },
    { label: "Carimbos", value: countByStep("carimbo"), icon: "verified", color: "#4A0E0E" },
    { label: "Criados", value: countByStep("criacao"), icon: "add_circle", color: "#C5A059" },
    { label: "Sincronizados", value: countByStep("sincronizacao"), icon: "sync", color: "#877270" },
  ];

  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const steps: FilterStep[] = ["TODOS", "criacao", "carimbo", "sincronizacao"];

  return (
    <div className="min-h-screen bg-parchment-white text-on-surface antialiased">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      {/* Header */}
      <header className="bg-parchment-white/90 backdrop-blur-md border-b border-outline-variant sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display-lg text-display-lg text-deep-burgundy">Auditoria</h1>
            <p className="font-metadata text-metadata text-on-surface-variant mt-1">
              Registro completo de todos os eventos de check-out
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 border border-outline-variant text-on-surface-variant hover:text-deep-burgundy hover:border-deep-burgundy px-4 py-2 rounded-sm transition-colors font-label-caps text-label-caps"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            Atualizar
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card bg-surface-container-lowest border border-outline-variant rounded-sm p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-xl" style={{ color: stat.color }}>
                  {stat.icon}
                </span>
                <span className="font-display-lg text-3xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </span>
              </div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-antique-gold font-body-lg"
              placeholder="Buscar por capítulo ou detalhe..."
              value={searchChapter}
              onChange={(e) => { setSearchChapter(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {steps.map((step) => (
              <button
                key={step}
                onClick={() => { setFilterStep(step); setPage(1); }}
                className={`px-4 py-2 rounded-sm font-label-caps text-label-caps border transition-all cursor-pointer ${
                  filterStep === step
                    ? "bg-deep-burgundy text-antique-gold border-deep-burgundy"
                    : "border-outline-variant text-on-surface-variant hover:border-deep-burgundy hover:text-deep-burgundy"
                }`}
              >
                {step === "TODOS" ? "Todos" : stepLabels[step]}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="table-header border-b border-outline-variant">
                  <th className="text-left px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs">
                    Etapa
                  </th>
                  <th className="text-left px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs">
                    Capítulo
                  </th>
                  <th className="text-left px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs hidden md:table-cell">
                    Detalhes
                  </th>
                  <th className="text-left px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs">
                    Data / Hora
                  </th>
                  <th className="text-left px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs hidden lg:table-cell">
                    ID Sessão
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <span className="material-symbols-outlined text-4xl text-outline mb-3 block">
                        search_off
                      </span>
                      <p className="font-title-md text-title-md text-on-surface-variant">
                        Nenhum evento encontrado
                      </p>
                      <p className="font-metadata text-metadata text-on-surface-variant mt-1">
                        Tente ajustar os filtros ou aguarde novos registros.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((event, idx) => {
                    const color = stepColors[event.step];
                    const icon = stepIcons[event.step];
                    return (
                      <tr
                        key={event.id}
                        className={`event-row border-b border-outline-variant/40 ${idx === paginated.length - 1 ? "border-0" : ""}`}
                      >
                        <td className="px-5 py-4">
                          <span
                            className="badge"
                            style={{
                              backgroundColor: `${color}18`,
                              color: color,
                              border: `1px solid ${color}40`,
                            }}
                          >
                            <span className="material-symbols-outlined text-xs">{icon}</span>
                            {stepLabels[event.step]}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-title-md text-title-md text-on-surface">
                            {event.chapter ?? "—"}
                          </p>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          {event.details && Object.keys(event.details).length > 0 ? (
                            <p className="font-metadata text-metadata text-on-surface-variant max-w-xs truncate">
                              {Object.entries(event.details)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(" · ")}
                            </p>
                          ) : (
                            <span className="text-outline font-metadata text-metadata">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-body-sm text-body-sm text-on-surface">
                            {dateFormatter.format(new Date(event.created_at))}
                          </p>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <code className="font-mono text-[11px] text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                            {event.id.slice(0, 16)}…
                          </code>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-outline-variant">
              <p className="font-metadata text-metadata text-on-surface-variant">
                Mostrando {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} de{" "}
                {filtered.length} eventos
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 flex items-center justify-center border border-outline-variant rounded-sm text-on-surface-variant hover:text-deep-burgundy hover:border-deep-burgundy disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-sm font-metadata text-metadata transition-colors cursor-pointer ${
                      p === page
                        ? "bg-deep-burgundy text-antique-gold border border-deep-burgundy"
                        : "border border-outline-variant text-on-surface-variant hover:text-deep-burgundy hover:border-deep-burgundy"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 flex items-center justify-center border border-outline-variant rounded-sm text-on-surface-variant hover:text-deep-burgundy hover:border-deep-burgundy disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
