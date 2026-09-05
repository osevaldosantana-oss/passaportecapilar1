import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { CheckoutAuditTrail, useCheckoutAudit } from "@/features/checkout";

const pageCss = `
        body { background-color: #F9F6F0; }
        .bg-pattern {
            background-image: radial-gradient(#dac1bf 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .stamp-seal {
            box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15);
        }
        .chapter-border {
            border-bottom: 1px solid #dac1bf;
        }
        .debossed-input {
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
            background-color: #F0EDE4;
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
            animation: fadeUp 0.6s ease-out forwards;
            opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }

        @keyframes stampPress {
            0% { transform: scale(1) translateY(0); box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15); }
            30% { transform: scale(1.05) translateY(-15px); box-shadow: 0 16px 24px rgba(139, 0, 0, 0.25); }
            45% { transform: scale(1.05) translateY(-15px); box-shadow: 0 16px 24px rgba(139, 0, 0, 0.25); }
            70% { transform: scale(0.92) translateY(5px); box-shadow: 0 1px 3px rgba(139, 0, 0, 0.5); }
            100% { transform: scale(1) translateY(0); box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15); }
        }
        @keyframes inkRadiate {
            0% { transform: scale(0.9); opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
        }
        .is-stamping .stamp-seal-wrapper {
            animation: stampPress 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .ink-ripple {
            position: absolute;
            inset: -20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139,0,0,0.3) 0%, rgba(139,0,0,0) 70%);
            opacity: 0;
            pointer-events: none;
            z-index: 0;
        }
        .is-stamping .ink-ripple {
            animation: inkRadiate 0.6s ease-out 0.8s forwards;
        }
        @keyframes checkmark {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        .stamp-success {
            animation: checkmark 0.4s ease-out forwards;
        }
    `;

export const Route = createFileRoute("/_authenticated/check-out/carimbado")({
  head: () => ({
    meta: [
      { title: "Passaporte Carimbado — Passaporte Capilar™" },
      { name: "description", content: "Capítulo validado e carimbado no passaporte capilar da cliente." },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { events, record } = useCheckoutAudit("carimbo");
  const [homeCare, setHomeCare] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [nextChapter, setNextChapter] = useState("Nutrição Intensiva");
  const [isStamping, setIsStamping] = useState(false);
  const [stamped, setStamped] = useState(false);

  const chapter = "Capítulo 01: Reconstrução Profunda";
  const formulaData = "PROTEÍNA HIDROLISADA 15ML + AMINOÁCIDOS ESSENCIAIS 10ML";
  const pauseTime = "20 MINUTOS";
  const heatSource = "VAPOR DE OZÔNIO";
  const diagnostico = "Porosidade Nível 3, Ruptura Leve.";
  const resultado = "Fibra selada, resistência recuperada.";

  const handleStamp = useCallback(() => {
    if (isStamping || stamped) return;
    setIsStamping(true);
    record.mutate(
      { chapter, details: { origem: "check-out/carimbado", home_care: homeCare, proxima_data: nextDate, proximo_capitulo: nextChapter } },
      {
        onSuccess: () => { setStamped(true); setIsStamping(false); },
        onError: () => { setIsStamping(false); },
      }
    );
  }, [isStamping, stamped, record, chapter, homeCare, nextDate, nextChapter]);

  const handleSync = useCallback(() => {
    navigate({ to: "/passaporte" });
  }, [navigate]);

  return (
    <div className="font-body-lg text-on-surface bg-parchment-white min-h-screen antialiased flex">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      <nav className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white flex flex-col py-8 px-4 z-50 hidden md:flex">
        <div className="mb-12 px-4">
          <h1 className="font-display-lg text-display-lg text-deep-burgundy tracking-tight">Passaporte Capilar™</h1>
          <p className="font-title-md text-title-md text-on-surface-variant mt-2">Consul de Beleza</p>
        </div>
        <div className="flex-1 space-y-2">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-title-md text-title-md">Visão Geral</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="font-title-md text-title-md">Clientes</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>style</span>
            <span className="font-title-md text-title-md">Passaportes</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="font-title-md text-title-md">Brand Studio</span>
          </a>
        </div>
        <div className="mt-auto">
          <button className="w-full bg-deep-burgundy text-antique-gold py-4 rounded-lg hover:opacity-90">Novo Atendimento</button>
        </div>
      </nav>

      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-parchment-white/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop z-40">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-deep-burgundy"><span className="material-symbols-outlined">menu</span></button>
          <div className="hidden md:flex items-center border-b border-outline-variant pb-1 w-64">
            <span className="material-symbols-outlined text-outline mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-outline-variant" placeholder="Buscar cliente ou registro..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-on-surface-variant hover:text-deep-burgundy rounded-full p-2"><span className="material-symbols-outlined">notifications</span></button>
          <button className="font-label-caps text-deep-burgundy border-b-2 border-deep-burgundy pb-1 font-bold opacity-80">Modo Passaporte</button>
        </div>
      </header>

      <main className={`flex-1 md:ml-64 mt-16 p-margin-mobile md:p-margin-desktop bg-pattern min-h-screen ${isStamping || stamped ? "is-stamping" : ""}`}>

        <div className="max-w-4xl mx-auto mb-chapter-gap text-center animate-fade-up">
          <h2 className="font-display-lg text-display-lg text-deep-burgundy mb-2">Check-out & Carimbo</h2>
          <p className="font-headline-lg text-headline-lg text-antique-gold italic">{chapter}</p>
          <div className="w-24 h-px bg-antique-gold mx-auto mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">

          <div className="md:col-span-7 space-y-chapter-gap">

            <section className="bg-surface-container-lowest p-8 rounded-lg chapter-border relative animate-fade-up delay-100">
              <span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">01</span>
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold">science</span>
                Resumo do Capítulo
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Fórmula Executada</label>
                  <div className="p-4 debossed-input rounded border border-outline-variant/30 font-metadata text-metadata text-on-surface">
                    {formulaData}<br />
                    TEMPO DE PAUSA: {pauseTime}<br />
                    FONTE DE CALOR: {heatSource}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Diagnóstico Inicial</label>
                    <div className="p-3 debossed-input rounded border border-outline-variant/30 text-on-surface">{diagnostico}</div>
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Resultado Atingido</label>
                    <div className="p-3 debossed-input rounded border border-outline-variant/30 text-on-surface text-green-800">{resultado}</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest p-8 rounded-lg chapter-border relative animate-fade-up delay-400">
              <span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">04</span>
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold">prescriptions</span>
                Orientações Home Care
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Prescrição Domiciliar</label>
                  <textarea
                    className="w-full p-4 debossed-input rounded border border-outline-variant/30 text-on-surface min-h-[120px] focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy outline-none resize-none"
                    placeholder="Detalhe os produtos e rotina indicados para manutenção..."
                    value={homeCare}
                    onChange={(e) => setHomeCare(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setHomeCare(h => h + (h ? "\n" : "") + "• ")}
                  className="flex items-center gap-2 text-deep-burgundy font-label-caps text-label-caps hover:text-antique-gold transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span> Adicionar Produto da Linha
                </button>
              </div>
            </section>
          </div>

          <div className="md:col-span-5 space-y-chapter-gap">

            <section className="bg-surface-container-highest p-8 rounded-lg chapter-border relative text-center animate-fade-up delay-200">
              <span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">02</span>
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-2">O Ritual do Carimbo</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">Sele a jornada e valide o passaporte capilar da sua cliente.</p>
              <div className="flex justify-center mb-8 relative">
                <div className="ink-ripple"></div>
                <button
                  type="button"
                  onClick={handleStamp}
                  disabled={isStamping || stamped}
                  className={`w-48 h-48 rounded-full border-4 border-stamp-red/20 flex items-center justify-center relative transition-transform duration-300 stamp-seal-wrapper z-10 ${
                    stamped ? "stamp-success cursor-default" : "hover:scale-105 cursor-pointer"
                  } ${isStamping ? "pointer-events-none" : ""}`}
                  aria-label={stamped ? "Carimbo aplicado" : "Clicar para carimbar"}
                >
                  <div className="w-40 h-40 bg-stamp-red rounded-full stamp-seal flex flex-col items-center justify-center text-parchment-white relative overflow-hidden">
                    <div className="absolute inset-2 border border-parchment-white/50 rounded-full border-dashed"></div>
                    {stamped ? (
                      <>
                        <span className="material-symbols-outlined text-4xl mb-1 text-antique-gold">verified</span>
                        <span className="font-label-caps text-[10px] tracking-widest uppercase">Validado</span>
                      </>
                    ) : (
                      <>
                        <span className="font-label-caps text-[10px] tracking-widest uppercase mb-1">Edição Diplomática</span>
                        <span className="material-symbols-outlined text-4xl mb-1 text-antique-gold">verified</span>
                        <span className="font-metadata text-[8px] uppercase">Validado por</span>
                        <span className="font-label-caps text-xs font-bold">Thaynara R.</span>
                      </>
                    )}
                  </div>
                  {!stamped && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-ink-black text-parchment-white font-metadata text-[10px] px-2 py-1 rounded">
                      Clique para Carimbar
                    </div>
                  )}
                </button>
              </div>
              {record.error && (
                <p className="text-stamp-red font-body-sm text-sm mt-2">Erro ao registrar. Tente novamente.</p>
              )}
            </section>

            <section className="bg-surface-container-lowest p-8 rounded-lg chapter-border relative animate-fade-up delay-300">
              <span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">03</span>
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold">flight_takeoff</span>
                Próximo Destino
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Data de Retorno Sugerida</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">calendar_month</span>
                    <input
                      className="w-full pl-10 p-3 debossed-input rounded border border-outline-variant/30 text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy outline-none"
                      type="date"
                      value={nextDate}
                      onChange={(e) => setNextDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Próximo Capítulo (Foco)</label>
                  <select
                    className="w-full p-3 debossed-input rounded border border-outline-variant/30 text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy outline-none appearance-none"
                    value={nextChapter}
                    onChange={(e) => setNextChapter(e.target.value)}
                  >
                    <option>Nutrição Intensiva</option>
                    <option>Selagem Térmica</option>
                    <option>Manutenção de Cor</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="pt-4 animate-fade-up delay-400">
              {stamped ? (
                <button
                  type="button"
                  onClick={handleSync}
                  className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps text-lg uppercase py-5 rounded-lg hover:bg-primary-container transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">sync</span>
                  Sincronizar Passaporte
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStamp}
                  disabled={record.isPending}
                  className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps text-lg uppercase py-5 rounded-lg hover:bg-primary-container transition-all duration-300 shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined">{record.isPending ? "hourglass_top" : "how_to_reg"}</span>
                  {record.isPending ? "Registrando..." : "Finalizar e Carimbar"}
                </button>
              )}
              <p className="text-center font-metadata text-metadata text-on-surface-variant mt-3">
                O carimbo registrará esta etapa permanentemente no histórico da cliente.
              </p>
              <CheckoutAuditTrail
                step="carimbo"
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
