import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { CheckoutAuditTrail, useCheckoutAudit } from "@/components/checkout-audit-trail";

const pageCss = `
        .wax-seal-shadow {
            filter: drop-shadow(0px 4px 12px rgba(139, 0, 0, 0.15));
        }
        .debossed-input {
            box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.05);
            background-color: #F0EDE4;
        }
        .passport-container {
            aspect-ratio: 1 / 1.414;
        }
        @keyframes syncPulse {
            0% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.4); }
            70% { box-shadow: 0 0 0 12px rgba(197, 160, 89, 0); }
            100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); }
        }
        .sync-pulse {
            animation: syncPulse 1.5s infinite;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
        }
    `;

export const Route = createFileRoute("/_authenticated/check-out/sincronizar")({
  head: () => ({
    meta: [
      { title: "Sincronizar Passaporte — Passaporte Capilar™" },
      { name: "description", content: "Revise o resumo do capítulo e sincronize o passaporte com o dispositivo da cliente." },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { events, record } = useCheckoutAudit("sincronizacao");
  const [intervalDays, setIntervalDays] = useState("21");
  const [objetivo, setObjetivo] = useState("Nutrição Celular");
  const [prescricao, setPrescricao] = useState("Uso contínuo do Sérum Selador Noturno. Evitar fontes de calor acima de 180°C nos próximos 7 dias.");
  const [synced, setSynced] = useState(false);

  const chapter = "Capítulo 01: Reconstrução Profunda";
  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  const handleSync = useCallback(() => {
    if (synced || record.isPending) return;
    record.mutate(
      { chapter, details: { intervalo_dias: intervalDays, objetivo, prescricao, origem: "check-out/sincronizar" } },
      { onSuccess: () => setSynced(true) }
    );
  }, [synced, record, chapter, intervalDays, objetivo, prescricao]);

  const handleBack = useCallback(() => {
    navigate({ to: "/check-out/carimbado" });
  }, [navigate]);

  return (
    <div className="bg-parchment-white text-on-surface font-body-lg antialiased min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      <nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white flex-col py-8 px-4 z-50">
        <div className="mb-12 px-4">
          <h1 className="font-display-lg text-display-lg text-deep-burgundy tracking-tight">Passaporte Capilar™</h1>
          <p className="font-metadata text-metadata text-on-surface-variant uppercase tracking-widest mt-2">Consul de Beleza</p>
        </div>
        <div className="flex-1 space-y-2">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg" href="#">
            <span className="material-symbols-outlined">dashboard</span> Visão Geral
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span> Clientes
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg" href="#">
            <span className="material-symbols-outlined">style</span> Passaportes
          </a>
        </div>
        <div className="mt-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-deep-burgundy text-antique-gold py-3 rounded hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span> Novo Atendimento
          </button>
        </div>
      </nav>

      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-parchment-white/90 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop z-40">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="text-on-surface-variant hover:text-deep-burgundy p-2 rounded-full hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="font-label-caps text-label-caps text-deep-burgundy hidden md:block">CLIENTES / CHECK-OUT</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-deep-burgundy font-label-caps text-label-caps hover:bg-surface-container-low px-4 py-2 rounded-full transition-all">
            <span className="material-symbols-outlined">history_edu</span> MODO PASSAPORTE
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
            <img className="w-full h-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrZM-CK9vFHYdV8vKbKc66AhBSHc09LNKKwls5roYsRAuC4Umx3HJOgG2-_dSJQ-PkHqDxGqJ_EvViF4iN-lC69Y8Lvvzr_0x0OIaA3ECWBWez0upxnxF9Ognw5p-s0mDOpIV5rse61fcvZice0GzKIdOOS9DG9VvmN-2KDKDGqxfvmngq3Ub8VAaXaSZmC5TDRdZ_h242CD7hmfIZRhllr8nsnSVVzk8nqDYbnojkUpeyrsu0cSU_" />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-24 md:pl-64 md:px-margin-desktop px-margin-mobile max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          <div className="lg:col-span-7 flex justify-center animate-in">
            <div className="relative w-full max-w-lg passport-container bg-[#4A0E0E] rounded-lg shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-[#3A0A0A] overflow-hidden">
              <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0yFGvh2RiJJpicWPEODRfChfi9gyEjE76YdBNAuKrAsl9Ld5Z2z55eQfS-W2pKdj2Up2EdIC5T90cfkqqEIgSCLNAzg5UFc9hAR3tD9n7X2M44oQ3zKCtunJLBegNChYhQbyWFLKu-7jAGc5Y-JF0IMaSaWHOPhIXMu2enaq8k-lbZsvZM3OfgHOheFU9rXL_MbYvofQn4cXNAvw3lIpXgxWjpHKi3JOtt8Hdx7libPpHKptq-P43')" }}></div>
              <div className="absolute inset-4 border border-antique-gold/30 rounded pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center mb-8">
                <div className="w-48 h-48 wax-seal-shadow">
                  {synced ? (
                    <div className="w-full h-full rounded-full border-4 border-antique-gold/30 flex items-center justify-center bg-stamp-red text-parchment-white animate-in">
                      <div className="text-center">
                        <span className="material-symbols-outlined text-5xl text-antique-gold block">verified</span>
                        <p className="font-label-caps text-[9px] mt-1">SINCRONIZADO</p>
                      </div>
                    </div>
                  ) : (
                    <img alt="Ceremonial Wax Seal" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZyxeHQE2smF1Gv9DDtXXW6boTvdE6bP9QCzHgM3KjsMYmKnTHdYG4NMxwR4jMUNlcoX1-y8igTV8NKHnew1W5lBFxz-S_wsLBfinycnGQgEyDs5oOUCsf-dNcDBhdppOX_WRKNx8AHTa9uuSvWtYW6w0c2dh_rgxxz3hwvveLF7f0M7hIWKrpFjRGHOVQNEhjvoxZCLWgh4r-cbpKdu4iZ8Yk8jaRDWEsnWzwFQAj4YHQTDFzpYWegizdSGxSc_tBA" />
                  )}
                </div>
              </div>

              <div className="relative z-10 text-center space-y-6 w-full">
                <h3 className="font-display-lg text-headline-lg text-antique-gold uppercase tracking-widest border-b border-antique-gold/20 pb-4 inline-block px-8">
                  {synced ? "Passaporte Sincronizado" : "Carimbo Oficial"}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center font-metadata text-metadata text-parchment-white/80 uppercase">
                  <div>
                    <p className="text-antique-gold mb-1">Data de Validação</p>
                    <p className="text-sm">{today}</p>
                  </div>
                  <div>
                    <p className="text-antique-gold mb-1">Consul</p>
                    <p className="text-sm">Thaynara Rodrigues</p>
                  </div>
                </div>
                <div className="mt-8 border border-antique-gold/40 rounded p-3 bg-black/20 backdrop-blur-sm mx-auto w-3/4">
                  <p className="font-metadata text-metadata text-antique-gold uppercase tracking-[0.2em]">ID: PC-2026 • Classificado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-chapter-gap mt-12 lg:mt-0">

            <section className="relative animate-in" style={{ animationDelay: "100ms" }}>
              <div className="absolute -top-6 right-0 font-display-lg text-headline-lg text-antique-gold/30 select-none">Cap. 01</div>
              <h4 className="font-title-md text-title-md text-deep-burgundy mb-6 border-b border-outline-variant pb-2">Resumo do Capítulo</h4>
              <div className="space-y-4">
                <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/50">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Tratamento Realizado</label>
                  <p className="font-body-lg text-on-surface">Reconstrução Profunda</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/50">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Porosidade</label>
                    <p className="font-body-lg text-on-surface flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-antique-gold"></span> Estabilizada
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/50">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Elasticidade</label>
                    <p className="font-body-lg text-on-surface flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-antique-gold"></span> Restaurada
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="animate-in" style={{ animationDelay: "200ms" }}>
              <h4 className="font-title-md text-title-md text-deep-burgundy mb-6 border-b border-outline-variant pb-2">Próximo Destino</h4>
              <div className="space-y-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Intervalo Recomendado (Dias)</label>
                  <input
                    className="w-full debossed-input border-none rounded p-3 text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:outline-none transition-shadow"
                    type="number"
                    value={intervalDays}
                    onChange={(e) => setIntervalDays(e.target.value)}
                    min="1"
                    max="90"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Objetivo Primário</label>
                  <select
                    className="w-full debossed-input border-none rounded p-3 text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:outline-none transition-shadow appearance-none"
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                  >
                    <option>Nutrição Celular</option>
                    <option>Hidratação Intensiva</option>
                    <option>Manutenção de Cor</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="animate-in" style={{ animationDelay: "300ms" }}>
              <h4 className="font-title-md text-title-md text-deep-burgundy mb-6 border-b border-outline-variant pb-2">Prescrição Home Care</h4>
              <textarea
                className="w-full debossed-input border-none rounded p-4 text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:outline-none transition-shadow resize-none"
                rows={3}
                value={prescricao}
                onChange={(e) => setPrescricao(e.target.value)}
              />
            </section>

            <div className="pt-8 mt-auto animate-in" style={{ animationDelay: "400ms" }}>
              {synced ? (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3 text-green-700">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                    <p className="font-title-md text-title-md font-bold">Sincronização Concluída!</p>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Os dados foram criptografados e enviados ao dispositivo da cliente.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/" })}
                    className="w-full flex items-center justify-center gap-3 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-5 rounded hover:bg-primary-container transition-all shadow-lg"
                  >
                    <span className="material-symbols-outlined">home</span>
                    Voltar ao Início
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={record.isPending}
                    onClick={handleSync}
                    className={`w-full flex items-center justify-center gap-3 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-5 rounded transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-60 ${!record.isPending ? "sync-pulse" : ""}`}
                  >
                    <span className="material-symbols-outlined">sync</span>
                    {record.isPending ? "Sincronizando..." : "Sincronizar Passaporte"}
                  </button>
                  <p className="text-center font-metadata text-metadata text-on-surface-variant mt-4">
                    Os dados serão criptografados e enviados ao dispositivo do cliente.
                  </p>
                </>
              )}
              <CheckoutAuditTrail
                step="sincronizacao"
                events={events.data}
                isLoading={events.isLoading}
                error={events.error ? "Não foi possível carregar o registro de auditoria." : record.error ? "Não foi possível registrar o evento." : null}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
