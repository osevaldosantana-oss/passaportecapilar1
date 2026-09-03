import { createFileRoute } from "@tanstack/react-router";

const pageCss = `
  :root {
    --premium-ease: cubic-bezier(0.16, 1, 0.3, 1);
  }
  body { background-color: #1A1A1A; color: #F9F6F0; margin: 0; overflow-x: hidden; }
  .passport-texture {
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.03"/></svg>');
    background-color: #1A1A1A;
  }
  .glass-panel {
    background: rgba(26, 26, 26, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(197, 160, 89, 0.15);
  }
  .gold-accent { color: #C5A059; }
  .burgundy-accent { color: #4A0E0E; }
  .pulse-dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }

  /* Funnel animation */
  .funnel-stage {
    position: relative;
    transition: all 0.4s var(--premium-ease);
  }
  .funnel-stage:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(197, 160, 89, 0.15);
  }
  .funnel-stage::after {
    content: '';
    position: absolute;
    bottom: -24px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(197, 160, 89, 0.3);
  }
  .funnel-stage:last-child::after { display: none; }

  /* Processing glow */
  .processing-glow {
    animation: glow 2s ease-in-out infinite alternate;
  }
  @keyframes glow {
    from { box-shadow: 0 0 10px rgba(197, 160, 89, 0.2); }
    to { box-shadow: 0 0 25px rgba(197, 160, 89, 0.5); }
  }

  /* Input glow */
  .intelligence-input:focus {
    box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.4), 0 4px 16px rgba(197, 160, 89, 0.1);
    border-color: #C5A059;
  }

  /* Card hover */
  .intel-card {
    transition: all 0.3s var(--premium-ease);
  }
  .intel-card:hover {
    transform: translateY(-2px);
    border-color: rgba(197, 160, 89, 0.4);
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: rgba(26,26,26,0.5); }
  ::-webkit-scrollbar-thumb { background: rgba(197,160,89,0.3); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(197,160,89,0.5); }

  /* Entrance */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-1 { animation: fadeInUp 0.8s var(--premium-ease) forwards; opacity: 0; }
  .animate-2 { animation: fadeInUp 0.8s var(--premium-ease) 0.15s forwards; opacity: 0; }
  .animate-3 { animation: fadeInUp 0.8s var(--premium-ease) 0.3s forwards; opacity: 0; }
  .animate-4 { animation: fadeInUp 0.8s var(--premium-ease) 0.45s forwards; opacity: 0; }
`;

export const Route = createFileRoute("/_authenticated/passaporte-intelligence")({
  head: () => ({
    meta: [
      { title: "Passaporte Intelligence™ — Passaporte Capilar" },
      { name: "description", content: "Camada de inteligência do Passaporte Capilar. Transforma dados da jornada em contexto, memória e direcionamento para decisões mais informadas." },
      { property: "og:title", content: "Passaporte Intelligence™ — Passaporte Capilar" },
      { property: "og:description", content: "Beauty Journey Intelligence powered by Tainara Rodrigues" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="passport-texture min-h-screen flex flex-col font-body-lg">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      {/* Header */}
      <header className="w-full px-margin-desktop py-6 flex justify-between items-center z-50 glass-panel border-t-0 border-x-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-stamp-red/20 border border-antique-gold/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-antique-gold text-xl">psychology</span>
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg text-antique-gold m-0 leading-tight">
              PASSAPORTE INTELLIGENCE™
            </h1>
            <p className="font-metadata text-metadata text-parchment-white/50 uppercase tracking-widest">
              Beauty Journey Intelligence
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-antique-gold/10 rounded-full border border-antique-gold/20">
            <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot"></div>
            <span className="font-metadata text-metadata text-antique-gold">Sistema Ativo</span>
          </div>
          <button className="px-4 py-2 border border-antique-gold/30 text-antique-gold rounded hover:bg-antique-gold/10 transition-colors font-label-caps text-label-caps">
            <span className="material-symbols-outlined text-sm mr-1">settings</span>
            Configurar
          </button>
        </div>
      </header>

      <main className="flex-grow pt-8 pb-12 px-margin-desktop max-w-[1600px] mx-auto w-full">

        {/* Vision Statement */}
        <section className="mb-12 animate-1">
          <div className="glass-panel p-8 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <span className="material-symbols-outlined text-[150px] text-antique-gold">psychology</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-antique-gold">format_quote</span>
                <span className="font-label-caps text-label-caps text-antique-gold uppercase tracking-widest">Visão do Sistema</span>
              </div>
              <div className="space-y-4 max-w-3xl">
                <p className="font-body-lg text-body-lg text-parchment-white/90 leading-relaxed">
                  O <strong className="text-antique-gold">PASSAPORTE INTELLIGENCE™</strong> é a camada de inteligência do PASSAPORTE CAPILAR™.
                </p>
                <p className="font-body-lg text-body-lg text-parchment-white/70 leading-relaxed">
                  Sua função é transformar os registros acumulados na jornada da cliente em <span className="text-antique-gold">contexto</span>, <span className="text-antique-gold">memória</span>, <span className="text-antique-gold">interpretação</span> e <span className="text-antique-gold">direcionamento</span>.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-ink-black/50 rounded border border-antique-gold/10">
                  <span className="material-symbols-outlined text-antique-gold/70 text-lg">menu_book</span>
                  <span className="font-metadata text-metadata text-parchment-white/70">O Passaporte registra a história</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-ink-black/50 rounded border border-antique-gold/10">
                  <span className="material-symbols-outlined text-antique-gold/70 text-lg">psychology</span>
                  <span className="font-metadata text-metadata text-parchment-white/70">A Intelligence interpreta a história</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-ink-black/50 rounded border border-antique-gold/10">
                  <span className="material-symbols-outlined text-antique-gold/70 text-lg">person</span>
                  <span className="font-metadata text-metadata text-parchment-white/70">O profissional conduz o próximo capítulo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Pipeline */}
        <section className="mb-12 animate-2">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-antique-gold text-2xl">account_tree</span>
            <h2 className="font-headline-lg text-headline-lg text-parchment-white">Arquitetura de Transformação</h2>
            <span className="font-label-caps text-label-caps text-parchment-white/40 ml-auto">Versão 1.0</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "database", label: "Dados", desc: "Registros brutos da jornada", color: "#6B7280" },
              { icon: "memory", label: "Memória", desc: "Histórico estruturado", color: "#8B5CF6" },
              { icon: "contextual", label: "Contexto", desc: "Situação atual da cliente", color: "#3B82F6" },
              { icon: "pattern", label: "Padrões", desc: "Tendências identificadas", color: "#10B981" },
              { icon: "lightbulb", label: "Insights", desc: "Interpretações geradas", color: "#F59E0B" },
              { icon: "near_me", label: "Direcionamento", desc: "Próximos passos sugeridos", color: "#C5A059" },
            ].map((stage, i) => (
              <div
                key={i}
                className="funnel-stage glass-panel p-4 rounded-lg text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${stage.color}20`, border: `1px solid ${stage.color}40` }}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ color: stage.color }}
                    data-icon={stage.icon}
                  >
                    {stage.icon}
                  </span>
                </div>
                <h3 className="font-label-caps text-label-caps text-antique-gold mb-1">{stage.label}</h3>
                <p className="font-metadata text-metadata text-parchment-white/50">{stage.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Context Engine */}
          <section className="lg:col-span-1 animate-3">
            <div className="glass-panel p-6 rounded-xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-stamp-red/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-antique-gold text-xl">hub</span>
                </div>
                <div>
                  <h3 className="font-headline-lg text-title-md text-parchment-white">Motor de Contexto</h3>
                  <p className="font-metadata text-metadata text-parchment-white/50">Cliente atual carregada</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-ink-black/50 rounded border border-antique-gold/10">
                  <span className="font-label-caps text-label-caps text-parchment-white/70">Cliente</span>
                  <span className="font-body-lg text-body-lg text-antique-gold">Ana Silva</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-ink-black/50 rounded border border-antique-gold/10">
                  <span className="font-label-caps text-label-caps text-parchment-white/70">Passaporte</span>
                  <span className="font-metadata text-metadata text-parchment-white/80">PC-8492-A</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-ink-black/50 rounded border border-antique-gold/10">
                  <span className="font-label-caps text-label-caps text-parchment-white/70">Capítulo Atual</span>
                  <span className="font-metadata text-metadata text-parchment-white/80">Manutenção do Loiro</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-ink-black/50 rounded border border-antique-gold/10">
                  <span className="font-label-caps text-label-caps text-parchment-white/70">Etapa</span>
                  <span className="font-metadata text-metadata text-parchment-white/80">4 de 6</span>
                </div>
              </div>

              <div className="p-4 bg-antique-gold/5 rounded-lg border border-antique-gold/20 processing-glow">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-antique-gold pulse-dot"></div>
                  <span className="font-label-caps text-label-caps text-antique-gold">Índice de Contexto</span>
                </div>
                <div className="h-2 bg-ink-black rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-antique-gold to-antique-gold/50 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <p className="font-metadata text-metadata text-parchment-white/50 mt-2">78% do contexto carregado</p>
              </div>
            </div>
          </section>

          {/* Direct Query Interface */}
          <section className="lg:col-span-2 animate-4">
            <div className="glass-panel p-6 rounded-xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-antique-gold/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-antique-gold text-xl">search</span>
                </div>
                <div>
                  <h3 className="font-headline-lg text-title-md text-parchment-white">Consulta Direcionada</h3>
                  <p className="font-metadata text-metadata text-parchment-white/50">Pergunte sobre a cliente ou protocole uma decisão</p>
                </div>
              </div>

              {/* Query input */}
              <div className="relative mb-4">
                <textarea
                  className="intelligence-input w-full p-4 pr-12 bg-ink-black/70 border border-antique-gold/20 rounded-lg text-parchment-white placeholder-parchment-white/30 resize-none focus:outline-none transition-all font-body-lg text-body-lg"
                  placeholder="Ex: Qual a melhor abordagem para o próximo capítulo baseado no histórico dela?"
                  rows={3}
                />
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-antique-gold rounded-lg flex items-center justify-center hover:bg-antique-gold/80 transition-colors">
                  <span className="material-symbols-outlined text-ink-black">send</span>
                </button>
              </div>

              {/* Quick queries */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="font-label-caps text-label-caps text-parchment-white/40 mr-2">Consultas rápidas:</span>
                {[
                  "Resumo da Jornada",
                  "Recomendação de Capítulo",
                  "Análise de Padrões",
                  "Alertas de Risco"
                ].map((query, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 bg-ink-black/50 border border-antique-gold/20 rounded-full font-metadata text-metadata text-parchment-white/60 hover:text-antique-gold hover:border-antique-gold/40 transition-all"
                  >
                    {query}
                  </button>
                ))}
              </div>

              {/* Response area */}
              <div className="flex-grow bg-ink-black/30 rounded-lg p-4 border border-antique-gold/10 min-h-[200px]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-antique-gold/60 text-sm">smart_toy</span>
                  <span className="font-label-caps text-label-caps text-parchment-white/60">Inteligência respondendo...</span>
                </div>
                <div className="space-y-3">
                  <p className="font-body-lg text-body-lg text-parchment-white/60 italic">
                    Aguardando consulta. O sistema processará o contexto da cliente e retornará direcionamento baseado no histórico registrado.
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-antique-gold/10">
                    <span className="material-symbols-outlined text-antique-gold/40 text-sm">info</span>
                    <span className="font-metadata text-metadata text-parchment-white/40">
                      Conectado ao Passport Intelligence™ v1.0 — Tainara Rodrigues
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Capabilities Grid */}
        <section className="mt-12 animate-4">
          <h2 className="font-headline-lg text-headline-lg text-parchment-white mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-antique-gold text-2xl">widgets</span>
            Capacidades do Sistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "history",
                title: "Análise de Jornada",
                desc: "Revisa todo o histórico de capítulos, diagnósticos e treatments realizados, identificando progressão e resultados."
              },
              {
                icon: "trending_up",
                title: "Detecção de Padrões",
                desc: "Identifica tendências nos dados da cliente: frequência de visitas, reações a produtos, evolução capilar."
              },
              {
                icon: "tips_and_updates",
                title: "Sugestões Inteligentes",
                desc: "Proporciona recomendações baseadas no contexto atual, histórico e protocolos mais eficazes."
              },
              {
                icon: "warning",
                title: "Alertas de Risco",
                desc: "Identifica incompatibilidades, reações anteriores e fatores de risco no protocolo proposto."
              },
              {
                icon: "auto_graph",
                title: "Projeção de Resultados",
                desc: "Simula resultados esperados de tratamentos baseado em dados históricos e 사례 comprovadas."
              },
              {
                icon: "document_scanner",
                title: "Geração de Relatórios",
                desc: "Cria resumos automáticos da evolução da cliente para apresentação ou arquivo."
              },
            ].map((cap, i) => (
              <div key={i} className="intel-card glass-panel p-5 rounded-lg border border-antique-gold/10">
                <div className="w-10 h-10 rounded-lg bg-antique-gold/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-antique-gold" data-icon={cap.icon}>{cap.icon}</span>
                </div>
                <h3 className="font-headline-lg text-title-md text-parchment-white mb-2">{cap.title}</h3>
                <p className="font-body-sm text-body-sm text-parchment-white/60 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-antique-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-antique-gold/40">verified</span>
            <span className="font-metadata text-metadata text-parchment-white/40">
              PASSAPORTE INTELLIGENCE™ — Camada de Inteligência do PASSAPORTE CAPILAR™
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps text-parchment-white/30">Assinatura:</span>
            <span className="font-label-caps text-label-caps text-antique-gold">Tainara Rodrigues</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
