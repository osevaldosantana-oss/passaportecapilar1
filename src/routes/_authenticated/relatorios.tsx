import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { listCheckoutEvents } from "@/lib/checkout-audit.functions";
import {
  statusLabels,
  stepLabels,
  type CheckoutReportRow,
  type CheckoutStatus,
} from "@/lib/checkout-audit.schema";

export const Route = createFileRoute("/_authenticated/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatório de Check-outs — Passaporte Capilar™" },
      { name: "description", content: "Todos os check-outs concluídos com data, cliente, profissional e status do carimbo." },
      { property: "og:title", content: "Relatório de Check-outs — Passaporte Capilar™" },
      { property: "og:description", content: "Todos os check-outs concluídos com data, cliente, profissional e status do carimbo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const statusStyles: Record<CheckoutStatus, string> = {
  concluido: "bg-secondary-container text-on-secondary-container",
  pendente: "bg-surface-container-high text-on-surface-variant",
  cancelado: "bg-stamp-red/10 text-stamp-red",
};

function Page() {
  const list = useServerFn(listCheckoutEvents);
  const [statusFilter, setStatusFilter] = useState<"todos" | CheckoutStatus>("todos");
  const [search, setSearch] = useState("");

  const report = useQuery({
    queryKey: ["checkout-report"],
    queryFn: () => list({ data: { limit: 500 } }) as Promise<CheckoutReportRow[]>,
  });

  const rows = useMemo(() => {
    const all = report.data ?? [];
    const term = search.trim().toLowerCase();
    return all.filter((row) => {
      if (statusFilter !== "todos" && row.status !== statusFilter) return false;
      if (!term) return true;
      return [row.client_name, row.professional_name, row.chapter]
        .filter(Boolean)
        .some((value) => (value as string).toLowerCase().includes(term));
    });
  }, [report.data, statusFilter, search]);

  const total = report.data?.length ?? 0;
  const concluidos = (report.data ?? []).filter((row) => row.status === "concluido").length;
  const clientesUnicos = new Set((report.data ?? []).map((row) => row.client_id).filter(Boolean)).size;

  return (
    <div className="font-body-lg text-body-lg text-on-surface bg-parchment-white min-h-screen flex">
      <AppSidebar active="/relatorios" />

      <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop pb-24">
        <header className="mb-8">
          <p className="font-metadata text-metadata text-antique-gold uppercase tracking-widest">
            Passaporte Intelligence™
          </p>
          <h1 className="font-display-lg text-display-lg text-deep-burgundy">Relatório de Check-outs</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            Todos os check-outs registrados, com data, cliente, profissional e status.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-gutter mb-8">
          {[
            { label: "Registros", value: total, icon: "receipt_long" },
            { label: "Concluídos", value: concluidos, icon: "verified" },
            { label: "Clientes atendidos", value: clientesUnicos, icon: "group" },
          ].map((card) => (
            <div key={card.label} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
              <span className="material-symbols-outlined text-antique-gold">{card.icon}</span>
              <p className="font-display-lg text-[32px] text-deep-burgundy leading-none mt-2">{card.value}</p>
              <p className="font-metadata text-metadata text-on-surface-variant uppercase mt-1">{card.label}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col md:flex-row gap-4 mb-6">
          <label className="flex-1">
            <span className="sr-only">Buscar por cliente, profissional ou capítulo</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por cliente, profissional ou capítulo"
              className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-sm text-body-sm"
            />
          </label>
          <label>
            <span className="sr-only">Filtrar por status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "todos" | CheckoutStatus)}
              className="w-full md:w-56 p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-sm text-body-sm"
            >
              <option value="todos">Todos os status</option>
              <option value="concluido">Concluído</option>
              <option value="pendente">Pendente</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </label>
        </section>

        {report.isLoading ? (
          <p className="font-body-sm text-body-sm text-on-surface-variant">Carregando relatório...</p>
        ) : report.error ? (
          <p className="font-body-sm text-body-sm text-stamp-red">Não foi possível carregar o relatório.</p>
        ) : rows.length === 0 ? (
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Nenhum check-out encontrado com estes filtros.
          </p>
        ) : (
          <div className="overflow-x-auto border border-outline-variant rounded-lg bg-surface-container-lowest">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant">
                  {["Data", "Cliente", "Profissional", "Etapa", "Capítulo", "Status"].map((head) => (
                    <th key={head} className="font-metadata text-metadata uppercase text-on-surface-variant px-4 py-3 whitespace-nowrap">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-outline-variant/40 last:border-0">
                    <td className="px-4 py-3 font-metadata text-metadata text-on-surface-variant whitespace-nowrap">
                      {dateFormatter.format(new Date(row.created_at))}
                    </td>
                    <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface">{row.client_name ?? "—"}</td>
                    <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface">{row.professional_name ?? "—"}</td>
                    <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">{stepLabels[row.step]}</td>
                    <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">{row.chapter ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full font-metadata text-metadata uppercase ${statusStyles[row.status]}`}>
                        {statusLabels[row.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
