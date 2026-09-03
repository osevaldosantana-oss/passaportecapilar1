import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const pageCss = `
  :root { --premium-ease: cubic-bezier(0.16, 1, 0.3, 1); }
  body { background-color: #1A1A1A; color: #F9F6F0; margin: 0; overflow-x: hidden; }
  .passport-texture {
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.03"/></svg>');
    background-color: #1A1A1A;
  }
  .glass-panel { background: rgba(26, 26, 26, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(197, 160, 89, 0.15); }
  .gold-accent { color: #C5A059; }
  .pulse-dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-in { animation: fadeInUp 0.6s var(--premium-ease) forwards; opacity: 0; }
  .module-btn { transition: all 0.3s var(--premium-ease); }
  .module-btn.active { background: rgba(197, 160, 89, 0.15); border-color: rgba(197, 160, 89, 0.5); }
  .module-btn:hover:not(.active) { background: rgba(197, 160, 89, 0.08); border-color: rgba(197, 160, 89, 0.3); }
  .layer-card { transition: all 0.4s var(--premium-ease); }
  .layer-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(197, 160, 89, 0.2); }
  .intel-card { transition: all 0.3s var(--premium-ease); cursor: pointer; }
  .intel-card:hover { transform: translateY(-2px); border-color: rgba(197, 160, 89, 0.4); }
  .intel-input:focus { box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.4); border-color: #C5A059; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: rgba(26,26,26,0.5); }
  ::-webkit-scrollbar-thumb { background: rgba(197,160,89,0.3); border-radius: 3px; }
  .section-enter { animation: fadeInUp 0.4s var(--premium-ease) forwards; }
`;

export const Route = createFileRoute("/_authenticated/passaporte-intelligence")({
  head: () => ({
    meta: [
      { title: "Passaporte Intelligence™ — Passaporte Capilar" },
      { name: "description", content: "Beauty Journey Intelligence. Documento oficial de implementação da camada de inteligência do Passaporte Capilar™." },
    ],
  }),
  component: Page,
});

type Module = "visao" | "arquitetura" | "interface" | "roadmap" | "diferencial" | "principios";

const modules: { id: Module; label: string; icon: string; desc: string }[] = [
  { id: "visao", label: "Visão & Posicionamento", icon: "visibility", desc: "Posicionamento, 5 funções, regra fundamental" },
  { id: "arquitetura", label: "Arquitetura", icon: "account_tree", desc: "Camadas, memória, confiança, feedback" },
  { id: "interface", label: "Interface", icon: "widgets", desc: "Interface discreta, microcopy, Ask The Code" },
  { id: "roadmap", label: "Roadmap", icon: "map", desc: "MVP, Fases 02, 03 e 04" },
  { id: "diferencial", label: "Diferencial & Ecossistema", icon: "auto_awesome", desc: "Diferença competitiva, ecossistema futuro" },
  { id: "principios", label: "Princípios Fundamentais", icon: "gavel", desc: "Privacidade, exclusões, definições oficiais" },
];

function Page() {
  const [activeModule, setActiveModule] = useState<Module>("visao");
  const [query, setQuery] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [response, setResponse] = useState<string>("");

  const quickQueries = [
    "O que mudou desde o último capítulo?",
    "Qual foi o padrão de manutenção?",
    "Faça um briefing para o próximo atendimento.",
    "Quais informações importantes devo revisar?",
    "Resuma a história desta cliente.",
    "Há alertas de risco no histórico?",
  ];

  const responses: Record<string, string> = {
    "O que mudou desde o último capítulo?": "A análise do histórico indica uma mudança no objetivo registrado entre o Capítulo 03 e o Capítulo 04. No anterior, a prioridade era reconstrução profunda; agora, o foco shifted para manutenção e preservação do loiro.",
    "Qual foi o padrão de manutenção?": "A cliente apresenta um padrão de retorno a cada 30–35 dias nos últimos 4 capítulos. As fórmulas mais frequentemente aplicadas envolvem reconstructor + tonalizante. Há boa adesão ao home care prescrito.",
    "Faça um briefing para o próximo atendimento.": "INTELLIGENCE BRIEF — Próximo Atendimento\n\nÚLTIMO CAPÍTULO: Manutenção do Loiro (18 Ago 2026)\nHISTÓRICO RELEVANTE: Três capítulos de iluminação, intervalos crescentes.\nOBJETIVO ATUAL: Preservação do loiro com menor intervenção.\nPADRÃO: Retorno a cada 30–35 dias.\nPONTO DE ATENÇÃO: Verificar estado da raiz antes de definir técnica.\nPERGUNTA RECOMENDADA: 'A frequência de manutenção atual está confortável para você?'",
    "Quais informações importantes devo revisar?": "• Última visita: 18 Ago 2026 — Capítulo 04\n• Fórmula aplicada: RC-Complex + Tonalizante Frio (10g)\n• Resultado: Fibra selada, resistência recuperada\n• Objetivo declarado: Menor frequência de manutenção",
    "Resuma a história desta cliente.": "Jornada iniciada em 2024 com transformação completa. Ao longo de 12 capítulos, passou por correção de cor, inserção de mechas e tratamentos reconstrutores progressivos. O objetivo evoluiu de transformação para preservação.",
    "Há alertas de risco no histórico?": "Nenhum alerta crítico identificado. Pontos de monitoramento:\n• Intervalo do último capítulo (45 dias) acima da média — possível necessidade de reenquadrar expectativa\n• Raiz visível desde a última visita",
  };

  async function handleQuery(text: string) {
    setQuery(text);
    setIsQuerying(true);
    setResponse("");
    await new Promise(r => setTimeout(r, 1200));
    setResponse(responses[text] || "Informação insuficiente para gerar uma resposta precisa. Por favor, tente reformular a pergunta.");
    setIsQuerying(false);
  }

  return (
    <div className="passport-texture min-h-screen flex flex-col font-body-lg">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      {/* Header */}
      <header className="w-full px-margin-desktop py-5 flex justify-between items-center z-50 glass-panel border-t-0 border-x-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-stamp-red/20 border border-antique-gold/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-antique-gold text-xl">psychology</span>
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg text-antique-gold m-0 leading-tight">PASSAPORTE INTELLIGENCE™</h1>
            <p className="font-metadata text-metadata text-parchment-white/50 uppercase tracking-widest">Beauty Journey Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-antique-gold/10 rounded-full border border-antique-gold/20">
            <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot"></div>
            <span className="font-metadata text-metadata text-antique-gold">Sistema Ativo</span>
          </div>
          <div className="px-3 py-1.5 bg-stamp-red/20 border border-stamp-red/30 rounded-full">
            <span className="font-label-caps text-label-caps text-parchment-white/70">v1.0</span>
          </div>
        </div>
      </header>

      <main className="flex flex-row flex-grow pt-6 pb-12 px-margin-desktop gap-8 max-w-[1600px] mx-auto w-full animate-in">

        {/* Sidebar Navigation */}
        <nav className="w-64 shrink-0 flex flex-col gap-2 sticky top-6 self-start">
          <p className="font-label-caps text-label-caps text-parchment-white/40 uppercase tracking-widest mb-2 px-2">Módulos</p>
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`module-btn text-left px-4 py-3 rounded-xl border border-antique-gold/10 ${activeModule === mod.id ? "active" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-antique-gold/70 text-lg">{mod.icon}</span>
                <div>
                  <p className="font-label-caps text-label-caps text-antique-gold">{mod.label}</p>
                  <p className="font-metadata text-metadata text-parchment-white/40 text-[10px]">{mod.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="flex-grow min-w-0">

          {/* MODULE 1 — Visão & Posicionamento */}
          {activeModule === "visao" && (
            <div className="space-y-6 section-enter">
              <div className="glass-panel p-8 rounded-xl text-center border-antique-gold/20">
                <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-[0.3em] mb-3">Documento Oficial de Implementação</p>
                <h2 className="font-display-lg text-display-lg text-parchment-white mb-1">Intelligence Architecture</h2>
                <p className="font-body-lg text-body-lg text-parchment-white/60">BEAUTY JOURNEY INTELLIGENCE</p>
                <div className="flex justify-center gap-4 mt-3 text-parchment-white/40 font-metadata text-metadata">
                  <span>PASSAPORTE CAPILAR™</span><span>•</span><span>by Tainara Rodrigues</span>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">01 — Visão</h3>
                <p className="font-body-lg text-body-lg text-parchment-white/80 leading-relaxed mb-5">
                  O <strong className="text-antique-gold">PASSAPORTE INTELLIGENCE™</strong> é a camada de inteligência do PASSAPORTE CAPILAR™. Sua função é transformar os registros acumulados na jornada da cliente em <span className="text-antique-gold">contexto</span>, <span className="text-antique-gold">memória</span>, <span className="text-antique-gold">interpretação</span> e <span className="text-antique-gold">direcionamento</span>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { icon: "menu_book", text: "O Passaporte registra a história" },
                    { icon: "psychology", text: "A Intelligence interpreta a história" },
                    { icon: "person", text: "O profissional conduz o próximo capítulo" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 bg-ink-black/50 rounded-lg border border-antique-gold/10">
                      <span className="material-symbols-outlined text-antique-gold/70">{item.icon}</span>
                      <span className="font-metadata text-metadata text-parchment-white/70">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-8 rounded-xl">
                  <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">02 — Posicionamento</h3>
                  <div className="bg-stamp-red/10 border border-stamp-red/20 rounded-lg p-4 mb-5">
                    <p className="font-label-caps text-label-caps text-parchment-white/90 text-center">
                      O PASSAPORTE INTELLIGENCE™ não deve ser apresentado como chatbot, assistente genérico, IA de atendimento, gerador de textos, CRM inteligente ou sistema automático de diagnóstico.
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-widest mb-2">Seu posicionamento é</p>
                    <p className="font-headline-lg text-headline-lg text-antique-gold">BEAUTY JOURNEY<br />INTELLIGENCE</p>
                    <p className="font-body-lg text-body-lg text-parchment-white/60 mt-2">Uma inteligência criada para compreender a continuidade da jornada de beleza.</p>
                  </div>
                </div>

                <div className="glass-panel p-8 rounded-xl">
                  <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">03 — 5 Funções Principais</h3>
                  <div className="space-y-3">
                    {[
                      { num: "01", label: "REMEMBER", desc: "Lembrar o que aconteceu.", color: "#6B7280" },
                      { num: "02", label: "UNDERSTAND", desc: "Compreender o contexto.", color: "#8B5CF6" },
                      { num: "03", label: "CONNECT", desc: "Relacionar diferentes momentos.", color: "#3B82F6" },
                      { num: "04", label: "INTERPRET", desc: "Identificar padrões e mudanças.", color: "#10B981" },
                      { num: "05", label: "GUIDE", desc: "Sugerir possíveis caminhos.", color: "#C5A059" },
                    ].map((fn) => (
                      <div key={fn.num} className="flex items-center gap-4 p-3 bg-ink-black/50 rounded-lg border border-antique-gold/10 hover:border-antique-gold/30 transition-colors">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-label-caps text-xs text-ink-black shrink-0" style={{ backgroundColor: fn.color }}>{fn.num}</div>
                        <div>
                          <p className="font-label-caps text-label-caps text-antique-gold">{fn.label}</p>
                          <p className="font-metadata text-metadata text-parchment-white/50">{fn.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">05 — Regra Fundamental</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-5">
                    <p className="font-label-caps text-label-caps text-green-400 mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400">check_circle</span> COPILOTO DE INTELIGÊNCIA
                    </p>
                    <p className="font-body-sm text-body-sm text-parchment-white/80">A Intelligence funciona como <strong className="text-antique-gold">copiloto</strong> — interpreta, sugere, apresenta contexto.</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-5">
                    <p className="font-label-caps text-label-caps text-red-400 mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-red-400">block</span> AUTORIDADE FINAL
                    </p>
                    <p className="font-body-sm text-body-sm text-parchment-white/80">A Intelligence <strong className="text-stamp-red">nunca</strong> substitui o profissional. A decisão sempre pertence a quem conduz.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 justify-center">
                  {["DADOS", "PASSAPORTE", "INTELLIGENCE", "LEITURA", "INSIGHT", "SUGESTÃO", "PROFISSIONAL", "DECISÃO"].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="px-3 py-1.5 bg-ink-black/60 border border-antique-gold/20 rounded font-label-caps text-label-caps text-antique-gold/80 text-xs">{step}</div>
                      {i < 7 && <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_forward</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 2 — Arquitetura */}
          {activeModule === "arquitetura" && (
            <div className="space-y-6 section-enter">
              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">08 — 5 Camadas de Inteligência</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { num: "01", name: "MEMORY", question: "O que aconteceu?", example: '"Último atendimento registrado em 18 Ago 2026."', color: "#6B7280" },
                    { num: "02", name: "CONTEXT", question: "Em que momento ela está?", example: '"A cliente está em um ciclo de manutenção."', color: "#8B5CF6" },
                    { num: "03", name: "PATTERN", question: "Existe algum padrão?", example: '"Os últimos três capítulos apresentam intervalos semelhantes."', color: "#3B82F6" },
                    { num: "04", name: "CHANGE", question: "O que mudou?", example: '"O objetivo atual é diferente do objetivo anterior."', color: "#10B981" },
                    { num: "05", name: "GUIDANCE", question: "O que pode ser considerado?", example: '"Revisar o objetivo antes de definir o próximo procedimento."', color: "#C5A059" },
                  ].map((layer, i) => (
                    <div key={i} className="layer-card bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10 text-center">
                      <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-label-caps text-xs text-ink-black" style={{ backgroundColor: layer.color }}>{layer.num}</div>
                      <h4 className="font-label-caps text-label-caps text-antique-gold mb-2">{layer.name}</h4>
                      <p className="font-metadata text-metadata text-parchment-white/50 mb-3 text-xs">{layer.question}</p>
                      <div className="bg-ink-black/60 rounded p-2">
                        <p className="font-metadata text-metadata text-parchment-white/40 italic text-[10px]">"...{layer.example.slice(1, -1).slice(0, 45)}..."</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">23 — Intelligence Memory</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "FACT MEMORY", icon: "fact_check", color: "#10B981", desc: "Fatos registrados no Passaporte. Dados objetivos e auditáveis.", example: "'Último atendimento: 18 Ago 2026'" },
                    { label: "PREFERENCE MEMORY", icon: "favorite", color: "#8B5CF6", desc: "Preferências declaradas pela cliente.", example: "'Cliente prefere produtos sem amônia'" },
                    { label: "JOURNEY MEMORY", icon: "route", color: "#3B82F6", desc: "Histórico da evolução da jornada.", example: "'Três capítulos de iluminação + reconstrução progressiva'" },
                    { label: "INFERENCE", icon: "psychology", color: "#C5A059", desc: "Interpretações da Intelligence. Nunca confundi-las com fatos.", example: "'Possível busca por menor manutenção — requer confirmação'" },
                  ].map((item, i) => (
                    <div key={i} className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-antique-gold/60">{item.icon}</span>
                        <span className="font-label-caps text-label-caps text-antique-gold text-xs">{item.label}</span>
                      </div>
                      <p className="font-metadata text-metadata text-parchment-white/60 mb-3 text-xs">{item.desc}</p>
                      <div className="bg-ink-black/60 rounded p-2">
                        <p className="font-metadata text-metadata text-parchment-white/40 text-[10px] italic">Ex: {item.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-stamp-red/10 border border-stamp-red/30 rounded-lg p-4 text-center">
                  <p className="font-body-sm text-body-sm text-parchment-white/70">
                    <strong className="text-stamp-red">Importante:</strong> As inferências <strong>nunca</strong> devem ser confundidas com fatos.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">20 — Confidence Layer & 21 — Human Confirmation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { level: "HIGH", color: "#10B981", bg: "bg-green-900/20", border: "border-green-700/30", icon: "verified", desc: "Baseada diretamente em dados claros.", sub: "Apresentar como conclusão" },
                    { level: "MEDIUM", color: "#F59E0B", bg: "bg-yellow-900/20", border: "border-yellow-700/30", icon: "help", desc: "Baseada em múltiplos registros, exige confirmação.", sub: "Apresentar como hipótese" },
                    { level: "LOW", color: "#EF4444", bg: "bg-red-900/20", border: "border-red-700/30", icon: "warning", desc: "Possibilidade não deve ser apresentada como conclusão.", sub: '"Informação insuficiente"' },
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} rounded-xl p-5 border ${item.border}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined" style={{ color: item.color }}>{item.icon}</span>
                        <span className="font-label-caps text-label-caps" style={{ color: item.color }}>{item.level}</span>
                      </div>
                      <p className="font-metadata text-metadata text-parchment-white/70 text-xs mb-2">{item.desc}</p>
                      <p className="font-metadata text-metadata text-parchment-white/40 text-[10px] italic">{item.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { action: "CONFIRMAR", color: "#10B981", bg: "bg-green-900/20", border: "border-green-700/30", icon: "check_circle", desc: "Incorporar a sugestão à jornada." },
                    { action: "EDITAR", color: "#F59E0B", bg: "bg-yellow-900/20", border: "border-yellow-700/30", icon: "edit", desc: "Ajustar a sugestão antes de incorporar." },
                    { action: "IGNORAR", color: "#EF4444", bg: "bg-red-900/20", border: "border-red-700/30", icon: "cancel", desc: "Descartar a sugestão." },
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} rounded-xl p-4 border ${item.border} text-center`}>
                      <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${item.color}30` }}>
                        <span className="material-symbols-outlined" style={{ color: item.color }}>{item.icon}</span>
                      </div>
                      <p className="font-label-caps text-label-caps" style={{ color: item.color }}>{item.action}</p>
                      <p className="font-metadata text-metadata text-parchment-white/60 text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">22 — Feedback Loop</h3>
                <p className="font-body-sm text-body-sm text-parchment-white/60 mb-4">O sistema aprende com decisões humanas sem alterar automaticamente a verdade histórica.</p>
                <div className="flex flex-wrap items-center gap-2 justify-center">
                  {["INSIGHT", "PROFISSIONAL AVALIA", "CONFIRMA / EDITA / IGNORA", "REGISTRO", "MELHORIA FUTURA"].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="px-3 py-1.5 bg-antique-gold/10 border border-antique-gold/20 rounded font-label-caps text-label-caps text-antique-gold/70 text-xs">{step}</div>
                      {i < 4 && <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_forward</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">13 — Exemplo de Raciocínio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-ink-black/50 rounded-lg p-5 border border-antique-gold/10">
                    <p className="font-label-caps text-label-caps text-antique-gold mb-3">Dados analisados</p>
                    <ul className="space-y-2">
                      {["Três capítulos de iluminação", "Intervalos crescentes", 'Último registro: desejo de menor manutenção"'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 font-metadata text-metadata text-parchment-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-antique-gold/40"></span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-900/20 rounded-lg p-5 border border-green-700/30">
                    <p className="font-label-caps text-label-caps text-green-400 mb-3">Intelligence produz:</p>
                    <p className="font-body-sm text-body-sm text-parchment-white/80 italic">"A jornada recente indica uma busca por maior praticidade. Antes de propor uma nova transformação, vale confirmar se a prioridade atual continua sendo reduzir a frequência de manutenção."</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-label-caps text-label-caps text-parchment-white/40">A Intelligence interpreta. <span className="text-antique-gold">O profissional decide.</span></p>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 3 — Interface */}
          {activeModule === "interface" && (
            <div className="space-y-6 section-enter">
              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">24 — Interface</h3>
                <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">A Intelligence deve aparecer de forma discreta. Não transformar cada tela em uma conversa com IA.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { screen: "Dashboard", feature: "INTELLIGENCE", icon: "dashboard", desc: "Visão geral com Insights da jornada" },
                    { screen: "Cliente", feature: "INTELLIGENCE BRIEF", icon: "person", desc: "Resumo inteligente do perfil" },
                    { screen: "Atendimento", feature: "PREPARE MY APPOINTMENT", icon: "calendar_today", desc: "Briefing pré-atendimento" },
                    { screen: "Jornada", feature: "JOURNEY INSIGHT", icon: "route", desc: "Análise contextualizada" },
                    { screen: "Próximo Destino", feature: "NEXT DESTINATION", icon: "explore", desc: "Sugestão inteligente de destino" },
                    { screen: "Busca", feature: "ASK THE CODE", icon: "search", desc: "Interface conversacional" },
                  ].map((item, i) => (
                    <div key={i} className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10 hover:border-antique-gold/30 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-antique-gold/10 border border-antique-gold/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-antique-gold text-lg">{item.icon}</span>
                        </div>
                        <div>
                          <p className="font-label-caps text-label-caps text-parchment-white/50 text-xs">{item.screen}</p>
                          <p className="font-label-caps text-label-caps text-antique-gold text-xs">{item.feature}</p>
                        </div>
                      </div>
                      <p className="font-metadata text-metadata text-parchment-white/50 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">25 — Microcopy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-red-400">block</span>
                      <p className="font-label-caps text-label-caps text-red-400">Evitar</p>
                    </div>
                    <div className="space-y-2">
                      {[
                        { bad: '"IA detectou…"', good: '"Uma leitura da sua jornada indica…"' },
                        { bad: '"Algoritmo recomenda…"', good: '"Com base nos registros disponíveis…"' },
                        { bad: '"Score de risco: 78%"', good: '"Padrão identificado nos últimos 3 capítulos"' },
                      ].map((item, i) => (
                        <div key={i} className="bg-ink-black/40 rounded-lg p-3">
                          <p className="font-metadata text-metadata text-red-400/70 text-xs mb-1">✗ {item.bad}</p>
                          <p className="font-metadata text-metadata text-green-400 text-xs">✓ {item.good}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-antique-gold/5 border border-antique-gold/20 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-antique-gold">auto_awesome</span>
                      <p className="font-label-caps text-label-caps text-antique-gold">Princípios de Linguagem</p>
                    </div>
                    <div className="space-y-2">
                      {["Sofisticada — sem jargão técnico", "Humana — como um conselheiro experiente", "Curta — sem verbosidade", "Inteligente — mostra compreensão", "Não técnica — acessível a todos"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-ink-black/40 rounded-lg">
                          <span className="material-symbols-outlined text-antique-gold/60 text-sm">check</span>
                          <span className="font-metadata text-metadata text-parchment-white/70 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">10 — Ask The Code</h3>
                <p className="font-body-sm text-body-sm text-parchment-white/60 mb-4">Interface conversacional própria. A Intelligence responde utilizando o contexto disponível no Passaporte.</p>
                <div className="relative mb-4">
                  <textarea
                    className="intel-input w-full p-4 pr-12 bg-ink-black/70 border border-antique-gold/20 rounded-lg text-parchment-white placeholder-parchment-white/30 resize-none focus:outline-none transition-all font-body-sm text-body-sm"
                    placeholder="Pergunte sobre esta jornada..."
                    rows={3}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button
                    onClick={() => query.trim() && handleQuery(query)}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-antique-gold rounded-lg flex items-center justify-center hover:bg-antique-gold/80 transition-colors"
                  >
                    {isQuerying ? (
                      <span className="material-symbols-outlined text-ink-black animate-spin">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined text-ink-black">send</span>
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickQueries.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuery(q)}
                      className="px-3 py-1 bg-ink-black/50 border border-antique-gold/20 rounded-full font-metadata text-metadata text-parchment-white/60 hover:text-antique-gold hover:border-antique-gold/40 transition-all text-xs"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                {response && (
                  <div className="bg-ink-black/30 rounded-lg p-4 border border-antique-gold/10 max-h-[200px] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-antique-gold/60 text-sm">smart_toy</span>
                      <span className="font-label-caps text-label-caps text-parchment-white/60">Intelligence</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-parchment-white/70 whitespace-pre-line">{response}</p>
                  </div>
                )}
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">09 — Intelligence Brief</h3>
                <p className="font-body-sm text-body-sm text-parchment-white/60 mb-4">Resumo inteligente de cada cliente.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: "WHO", desc: "Quem é essa cliente dentro da jornada." },
                    { label: "NOW", desc: "Onde ela está atualmente." },
                    { label: "HISTORY", desc: "O que aconteceu anteriormente." },
                    { label: "CHANGE", desc: "O que mudou." },
                    { label: "DESIRE", desc: "O que ela declarou desejar." },
                    { label: "PATTERN", desc: "Padrões relevantes identificados." },
                    { label: "NEXT", desc: "Possíveis próximos caminhos." },
                    { label: "ATTENTION", desc: "Pontos que merecem avaliação profissional." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-ink-black/50 rounded border border-antique-gold/10">
                      <span className="font-label-caps text-label-caps text-antique-gold w-20 shrink-0 text-xs">{item.label}</span>
                      <span className="font-metadata text-metadata text-parchment-white/60 text-xs">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 4 — Roadmap */}
          {activeModule === "roadmap" && (
            <div className="space-y-6 section-enter">
              <div className="glass-panel p-8 rounded-xl border-antique-gold/20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">26</span>
                  <h3 className="font-headline-lg text-headline-lg text-parchment-white">MVP — Versão 1.0</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-green-400">check_circle</span>
                      <p className="font-label-caps text-label-caps text-green-400">IMPLEMENTAR</p>
                    </div>
                    <div className="space-y-2">
                      {["Leitura do histórico", "Resumo inteligente", "Briefing pré-atendimento", "Identificação de mudanças", "Identificação de padrões", "Sugestão de próximo destino", "ASK THE CODE", "Confirmação humana"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-ink-black/40 rounded">
                          <span className="material-symbols-outlined text-green-400/60 text-sm">done</span>
                          <span className="font-metadata text-metadata text-parchment-white/70 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-stamp-red">block</span>
                      <p className="font-label-caps text-label-caps text-stamp-red">NÃO IMPLEMENTAR</p>
                    </div>
                    <div className="space-y-2">
                      {["Diagnóstico automatizado complexo", "Análise visual avançada", "Previsão financeira", "Automação excessiva", "Agentes autônomos", "Decisões automáticas"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-ink-black/40 rounded">
                          <span className="material-symbols-outlined text-stamp-red/60 text-sm">close</span>
                          <span className="font-metadata text-metadata text-parchment-white/50 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">27 — Fase 02</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: "storage", label: "Memória Longitudinal", desc: "Análise de longo prazo da jornada" },
                    { icon: "replay", label: "Análise de Recorrência", desc: "Identificação de padrões cíclicos" },
                    { icon: "lightbulb", label: "Recomendações Contextuais", desc: "Sugestões baseadas no momento atual" },
                    { icon: "person", label: "Personalização por Profissional", desc: "Adaptação ao estilo de cada profissional" },
                    { icon: "favorite", label: "Inteligência de Relacionamento", desc: "Análise da relação profissional-cliente" },
                    { icon: "notifications", label: "Follow-up Inteligente", desc: "Lembretes e retornos automáticos" },
                  ].map((item, i) => (
                    <div key={i} className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10 hover:border-antique-gold/30 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-antique-gold/60">{item.icon}</span>
                        <p className="font-label-caps text-label-caps text-antique-gold text-xs">{item.label}</p>
                      </div>
                      <p className="font-metadata text-metadata text-parchment-white/50 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">28 — Fase 03</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: "image", label: "Análise Multimodal", desc: "Leitura de imagens autorizadas" },
                    { icon: "photo_camera", label: "Inteligência Visual", desc: "Processamento de registros visuais" },
                    { icon: "trending_up", label: "Inteligência de Tendências", desc: "Identificação de tendências emergentes" },
                    { icon: "auto_forecast", label: "Previsão de Necessidades", desc: "Antecipação de demandas" },
                    { icon: "automation", label: "Automação", desc: "Processos automatizados inteligentes" },
                    { icon: "calendar_month", label: "Integração com Agenda", desc: "Sincronização inteligente" },
                    { icon: "contacts", label: "CRM", desc: "Gestão inteligente de clientes" },
                    { icon: "chat", label: "WhatsApp", desc: "Comunicação integrada" },
                  ].map((item, i) => (
                    <div key={i} className="bg-ink-black/50 rounded-xl p-4 border border-antique-gold/10 text-center">
                      <div className="w-10 h-10 rounded-full bg-antique-gold/10 border border-antique-gold/20 mx-auto mb-3 flex items-center justify-center">
                        <span className="material-symbols-outlined text-antique-gold/70">{item.icon}</span>
                      </div>
                      <p className="font-label-caps text-label-caps text-antique-gold text-xs mb-1">{item.label}</p>
                      <p className="font-metadata text-metadata text-parchment-white/40 text-[10px]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">29 — Fase 04</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Beauty Intelligence API", icon: "api", desc: "API para integração com outros sistemas", color: "#8B5CF6" },
                    { label: "Professional Intelligence", icon: "badge", desc: "Inteligência para profissionais", color: "#3B82F6" },
                    { label: "Client Journey Intelligence", icon: "journey", desc: "Inteligência da jornada da cliente", color: "#10B981" },
                    { label: "Beauty Business Intelligence", icon: "analytics", desc: "Inteligência de negócios", color: "#C5A059" },
                  ].map((item, i) => (
                    <div key={i} className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10 text-center">
                      <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                        <span className="material-symbols-outlined text-xl" style={{ color: item.color }}>{item.icon}</span>
                      </div>
                      <p className="font-label-caps text-label-caps text-antique-gold text-xs mb-2">{item.label}</p>
                      <p className="font-metadata text-metadata text-parchment-white/40 text-[10px]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 5 — Diferencial & Ecossistema */}
          {activeModule === "diferencial" && (
            <div className="space-y-6 section-enter">
              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">30 — Ecossistema Futuro</h3>
                <div className="bg-ink-black/50 rounded-xl p-8 border border-antique-gold/10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="px-8 py-3 bg-antique-gold/10 border border-antique-gold/30 rounded-xl text-center">
                      <p className="font-label-caps text-label-caps text-antique-gold">THE CODE VISION</p>
                    </div>
                    <span className="material-symbols-outlined text-antique-gold/40">arrow_downward</span>
                    <div className="px-8 py-3 bg-antique-gold/15 border border-antique-gold/40 rounded-xl text-center">
                      <p className="font-label-caps text-label-caps text-antique-gold">BEAUTY INTELLIGENCE</p>
                    </div>
                    <span className="material-symbols-outlined text-antique-gold/40">arrow_downward</span>
                    <div className="px-8 py-3 bg-antique-gold/20 border border-antique-gold/50 rounded-xl text-center">
                      <p className="font-headline-lg text-headline-lg text-antique-gold">PASSAPORTE CAPILAR™</p>
                    </div>
                    <span className="material-symbols-outlined text-antique-gold/40">arrow_downward</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                      {[{ label: "EXPERIENCE", icon: "auto_awesome" }, { label: "PROFESSIONAL", icon: "person" }, { label: "INTELLIGENCE", icon: "psychology" }].map((item, i) => (
                        <div key={i} className="px-4 py-3 bg-ink-black/60 border border-antique-gold/20 rounded-lg text-center">
                          <span className="material-symbols-outlined text-antique-gold/60 mb-1">{item.icon}</span>
                          <p className="font-label-caps text-label-caps text-antique-gold/70 text-xs">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="material-symbols-outlined text-antique-gold/40">arrow_downward</span>
                    <div className="px-8 py-3 bg-antique-gold/10 border border-antique-gold/30 rounded-xl text-center">
                      <p className="font-label-caps text-label-caps text-antique-gold">CLIENT JOURNEY</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">31 — Princípio de Produto & 32 — Diferencial</h3>
                <p className="font-body-sm text-body-sm text-parchment-white/60 mb-5">O PASSAPORTE CAPILAR™ não compete por quantidade de funcionalidades, mas por qualidade de experiência.</p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                  {[
                    { icon: "memory", label: "MEMÓRIA" },
                    { icon: "timeline", label: "CONTINUIDADE" },
                    { icon: "badge", label: "IDENTIDADE" },
                    { icon: "star", label: "EXPERIÊNCIA" },
                    { icon: "psychology", label: "INTELIGÊNCIA" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-4 bg-ink-black/50 rounded-lg border border-antique-gold/10 text-center">
                      <span className="material-symbols-outlined text-antique-gold/60 text-xl">{item.icon}</span>
                      <p className="font-label-caps text-label-caps text-antique-gold text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { q: "Um CRM pergunta:", a: "'Quando foi seu último atendimento?'", p: "O Passaporte responde:", pa: "'Qual é a história dessa cliente e onde ela está agora?'", color: "#8B5CF6" },
                    { q: "Um sistema registra:", a: "'Serviço realizado.'", p: "O Passaporte registra:", pa: "'Capítulo da jornada.'", color: "#3B82F6" },
                    { q: "Um sistema agenda:", a: "'Próximo horário.'", p: "O Passaporte constrói:", pa: "'Próximo destino.'", color: "#10B981" },
                  ].map((item, i) => (
                    <div key={i} className="bg-ink-black/50 rounded-lg p-4 border border-antique-gold/10">
                      <p className="font-metadata text-metadata text-parchment-white/50 text-xs">{item.q} <span className="italic text-stamp-red/70">{item.a}</span></p>
                      <p className="font-metadata text-metadata text-parchment-white/50 text-xs mt-1">{item.p} <span className="italic" style={{ color: item.color }}>{item.pa}</span></p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl border-antique-gold/30">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">35 — Princípio Final</h3>
                <p className="font-body-lg text-body-lg text-parchment-white/60 text-center mb-6">O futuro do PASSAPORTE CAPILAR™ não está em guardar mais informações. Está em transformar informação em:</p>
                <div className="flex flex-col items-center gap-2 max-w-xl mx-auto mb-6">
                  {["Informação → Memória", "Memória → Contexto", "Contexto → Inteligência", "Inteligência → Experiências Melhores"].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 w-full justify-center">
                      <span className="font-body-sm text-body-sm text-parchment-white/50">{step}</span>
                      {i < 3 && <span className="material-symbols-outlined text-antique-gold">arrow_downward</span>}
                    </div>
                  ))}
                </div>
                <div className="bg-antique-gold/10 border border-antique-gold/20 rounded-xl p-6 text-center max-w-lg mx-auto">
                  <p className="font-headline-lg text-headline-lg text-antique-gold italic">"O futuro não está em guardar mais. Está em compreender melhor."</p>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 6 — Princípios Fundamentais */}
          {activeModule === "principios" && (
            <div className="space-y-6 section-enter">
              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">06 & 07 — Fontes de Dados & Data Governance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    { title: "Histórico", icon: "history", items: ["Atendimentos", "Procedimentos", "Datas", "Profissionais", "Observações"] },
                    { title: "Jornada", icon: "route", items: ["Capítulos", "Check-ins", "Check-outs", "Carimbos", "Próximos Destinos"] },
                    { title: "Preferências", icon: "favorite", items: ["Preferências registradas", "Objetivos declarados", "Observações da cliente"] },
                    { title: "Relacionamento", icon: "people", items: ["Frequência", "Retornos", "Programas", "Memberships"] },
                    { title: "Conteúdo Visual", icon: "image", items: ["Fotografias", "Referências", "Registros visuais"] },
                  ].map((source, i) => (
                    <div key={i} className="bg-ink-black/50 rounded-lg p-4 border border-antique-gold/10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-antique-gold/70">{source.icon}</span>
                        <h4 className="font-label-caps text-label-caps text-antique-gold text-xs">{source.title}</h4>
                      </div>
                      <ul className="space-y-1">
                        {source.items.map((item, j) => (
                          <li key={j} className="font-metadata text-metadata text-parchment-white/50 text-xs flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-antique-gold/40"></span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-lg p-5 text-center mb-4">
                  <p className="font-label-caps text-label-caps text-parchment-white/80">
                    Se o dado <strong className="text-antique-gold">não existe</strong> no Passaporte, a Intelligence <strong className="text-stamp-red">não pode</strong> tratá-lo como fato.
                  </p>
                </div>
                <div className="bg-antique-gold/5 border border-antique-gold/20 rounded-lg p-4 text-center">
                  <p className="font-body-sm text-body-sm text-parchment-white/80">
                    <strong className="text-antique-gold">INFORMAÇÃO INSUFICIENTE</strong> deve ser preferível a uma suposição.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl border-stamp-red/20">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">18 — Privacidade & 19 — Exclusões</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {[
                    { icon: "checklist", label: "Consentimento" },
                    { icon: "admin_panel_settings", label: "Controle de acesso" },
                    { icon: "visibility_off", label: "Separação" },
                    { icon: "history", label: "Registro de permissões" },
                    { icon: "cancel", label: "Revogação" },
                    { icon: "security", label: "Proteção" },
                    { icon: "filter_alt", label: "Minimização" },
                    { icon: "info", label: "Transparência" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-ink-black/50 rounded-lg border border-antique-gold/10">
                      <span className="material-symbols-outlined text-antique-gold/60 text-lg shrink-0">{item.icon}</span>
                      <p className="font-label-caps text-label-caps text-antique-gold text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-stamp-red/10 border border-stamp-red/20 rounded-lg p-4 mb-4">
                  <p className="font-label-caps text-label-caps text-stamp-red mb-3">A Intelligence nunca deve:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Diagnosticar doenças", "Prescrever medicamentos", "Substituir avaliação profissional", "Garantir resultado químico", "Inventar informações", "Determinar procedimentos obrigatórios", "Realizar decisões financeiras", "Alterar dados históricos automaticamente"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-stamp-red text-sm shrink-0">block</span>
                        <span className="font-metadata text-metadata text-parchment-white/70 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-antique-gold/5 border border-antique-gold/20 rounded-lg p-4 text-center">
                  <p className="font-body-sm text-body-sm text-parchment-white/70">Informações pessoais tratadas conforme <strong className="text-antique-gold">finalidade</strong>, <strong className="text-antique-gold">necessidade</strong> e <strong className="text-antique-gold">legislação aplicável</strong>.</p>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-4">16 & 17 — Multi-Professional Journey & Professional Handoff</h3>
                <div className="bg-antique-gold/5 border border-antique-gold/20 rounded-lg p-5 mb-6 text-center">
                  <p className="font-headline-lg text-headline-lg text-antique-gold mb-2">A história permanece com a cliente.</p>
                  <div className="space-y-1">
                    <p className="font-body-lg text-body-lg text-parchment-white/70 italic">"Seu cabelo muda."</p>
                    <p className="font-body-lg text-body-lg text-parchment-white/70 italic">"Seu profissional pode mudar."</p>
                    <p className="font-body-lg text-body-lg text-antique-gold italic">"Sua história continua com você."</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-antique-gold/20 border border-antique-gold/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-antique-gold">description</span>
                      </div>
                      <p className="font-label-caps text-label-caps text-antique-gold">JOURNEY BRIEF</p>
                    </div>
                    <p className="font-metadata text-metadata text-parchment-white/60 text-xs">Resumo autorizado da jornada ao trocar de profissional. Informações relevantes e permitidas apenas.</p>
                  </div>
                  <div className="bg-green-900/20 rounded-xl p-5 border border-green-700/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-green-900/30 border border-green-700/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-400">goal</span>
                      </div>
                      <p className="font-label-caps text-label-caps text-green-400">OBJETIVO</p>
                    </div>
                    <p className="font-metadata text-metadata text-parchment-white/60 text-xs italic">"Evitar que a cliente precise reconstruir toda sua história do zero."</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl text-center">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">33 — Definição Oficial</h3>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="bg-antique-gold/10 border border-antique-gold/20 rounded-xl p-5">
                    <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-widest mb-1 text-xs">PASSAPORTE CAPILAR™</p>
                    <p className="font-headline-lg text-headline-lg text-antique-gold italic">A infraestrutura da jornada.</p>
                  </div>
                  <div className="bg-antique-gold/15 border border-antique-gold/30 rounded-xl p-5">
                    <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-widest mb-1 text-xs">PASSAPORTE INTELLIGENCE™</p>
                    <p className="font-headline-lg text-headline-lg text-antique-gold italic">A inteligência que compreende a jornada.</p>
                  </div>
                  <div className="bg-stamp-red/10 border border-stamp-red/20 rounded-xl p-5">
                    <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-widest mb-1 text-xs">THE CODE VISION</p>
                    <p className="font-headline-lg text-headline-lg text-antique-gold italic">A metodologia e visão que orientam essa inteligência.</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl">
                <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-6">34 — Critério de Sucesso</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: "psychology", subject: "O profissional deve sentir:", quote: "'Eu conheço melhor minha cliente.'", color: "#8B5CF6" },
                    { icon: "person", subject: "A cliente deve sentir:", quote: "'Minha história está comigo.'", color: "#10B981" },
                    { icon: "auto_awesome", subject: "A plataforma deve demonstrar:", quote: "'Eu não apenas armazeno dados. Eu compreendo continuidade.'", color: "#C5A059" },
                  ].map((item, i) => (
                    <div key={i} className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10 text-center">
                      <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                        <span className="material-symbols-outlined text-xl" style={{ color: item.color }}>{item.icon}</span>
                      </div>
                      <p className="font-metadata text-metadata text-parchment-white/50 text-xs mb-2">{item.subject}</p>
                      <p className="font-body-sm text-body-sm italic" style={{ color: item.color }}>{item.quote}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-antique-gold/10 flex flex-col items-center gap-4 pb-8">
        <div className="text-center">
          <p className="font-label-caps text-label-caps text-antique-gold">PASSAPORTE CAPILAR™</p>
          <p className="font-body-sm text-body-sm text-parchment-white/40 italic">A INFRAESTRUTURA DA JORNADA.</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-label-caps text-label-caps text-antique-gold">TAINARA RODRIGUES</p>
          <p className="font-label-caps text-label-caps text-parchment-white/30 text-xs">PASSAPORTE INTELLIGENCE™ — THE INTELLIGENCE BEHIND THE JOURNEY.</p>
        </div>
      </footer>
    </div>
  );
}
