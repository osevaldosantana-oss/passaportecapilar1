import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
  .pulse-dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-1 { animation: fadeInUp 0.6s var(--premium-ease) forwards; opacity: 0; }
  .animate-2 { animation: fadeInUp 0.6s var(--premium-ease) 0.1s forwards; opacity: 0; }
  .animate-3 { animation: fadeInUp 0.6s var(--premium-ease) 0.2s forwards; opacity: 0; }
  .animate-4 { animation: fadeInUp 0.6s var(--premium-ease) 0.3s forwards; opacity: 0; }
  .animate-5 { animation: fadeInUp 0.6s var(--premium-ease) 0.4s forwards; opacity: 0; }
  .animate-6 { animation: fadeInUp 0.6s var(--premium-ease) 0.5s forwards; opacity: 0; }
  .animate-7 { animation: fadeInUp 0.6s var(--premium-ease) 0.6s forwards; opacity: 0; }
  .animate-8 { animation: fadeInUp 0.6s var(--premium-ease) 0.7s forwards; opacity: 0; }
  @keyframes glow {
    from { box-shadow: 0 0 10px rgba(197, 160, 89, 0.2); }
    to { box-shadow: 0 0 25px rgba(197, 160, 89, 0.5); }
  }
  .processing-glow { animation: glow 2s ease-in-out infinite alternate; }
  .intel-input:focus {
    box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.4), 0 4px 16px rgba(197, 160, 89, 0.1);
    border-color: #C5A059;
  }
  .intel-card {
    transition: all 0.3s var(--premium-ease);
    cursor: pointer;
  }
  .intel-card:hover {
    transform: translateY(-2px);
    border-color: rgba(197, 160, 89, 0.4);
    box-shadow: 0 8px 24px rgba(197, 160, 89, 0.12);
  }
  .layer-card {
    transition: all 0.4s var(--premium-ease);
    cursor: default;
  }
  .layer-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(197, 160, 89, 0.2);
  }
  .flow-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(197,160,89,0.4);
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: rgba(26,26,26,0.5); }
  ::-webkit-scrollbar-thumb { background: rgba(197,160,89,0.3); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(197,160,89,0.5); }
`;

export const Route = createFileRoute("/_authenticated/passaporte-intelligence")({
  head: () => ({
    meta: [
      { title: "Passaporte Intelligence™ — Passaporte Capilar" },
      { name: "description", content: "Beauty Journey Intelligence. Documento oficial de implementação da camada de inteligência do Passaporte Capilar™." },
      { property: "og:title", content: "Passaporte Intelligence™ — Passaporte Capilar" },
      { property: "og:description", content: "Beauty Journey Intelligence powered by Tainara Rodrigues" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [activeTab, setActiveTab] = useState<"code" | "prepare" | "destination">("code");
  const [query, setQuery] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [selectedClient] = useState({ name: "Ana Silva", passportId: "PC-8492-A", chapter: "Manutenção do Loiro", step: "4 de 6" });

  const quickQueries = [
    "O que mudou desde o último capítulo?",
    "Qual foi o padrão de manutenção?",
    "Faça um briefing para o próximo atendimento.",
    "Quais informações importantes devo revisar?",
    "Resuma a história desta cliente.",
    "Há alertas de risco no histórico?",
  ];

  const functions = [
    { num: "01", label: "REMEMBER", desc: "Lembrar o que aconteceu.", icon: "history", color: "#6B7280" },
    { num: "02", label: "UNDERSTAND", desc: "Compreender o contexto.", icon: "psychology", color: "#8B5CF6" },
    { num: "03", label: "CONNECT", desc: "Relacionar diferentes momentos.", icon: "account_tree", color: "#3B82F6" },
    { num: "04", label: "INTERPRET", desc: "Identificar padrões e mudanças.", icon: "pattern", color: "#10B981" },
    { num: "05", label: "GUIDE", desc: "Sugerir possíveis caminhos.", icon: "near_me", color: "#C5A059" },
  ];

  const layers = [
    { num: "01", name: "MEMORY", question: "O que aconteceu?", example: '"Último atendimento registrado em 18 Ago 2026."', color: "#6B7280" },
    { num: "02", name: "CONTEXT", question: "Em que momento ela está?", example: '"A cliente está em um ciclo de manutenção do loiro."', color: "#8B5CF6" },
    { num: "03", name: "PATTERN", question: "Existe algum padrão?", example: '"Os últimos três capítulos apresentam intervalos semelhantes."', color: "#3B82F6" },
    { num: "04", name: "CHANGE", question: "O que mudou?", example: '"O objetivo atual é diferente do objetivo anterior."', color: "#10B981" },
    { num: "05", name: "GUIDANCE", question: "O que pode ser considerado?", example: '"Pode ser interessante revisar o objetivo antes de definir o próximo procedimento."', color: "#C5A059" },
  ];

  const brief = [
    { label: "WHO", desc: "Quem é essa cliente dentro da jornada registrada." },
    { label: "NOW", desc: "Onde ela está atualmente." },
    { label: "HISTORY", desc: "O que aconteceu anteriormente." },
    { label: "CHANGE", desc: "O que mudou." },
    { label: "DESIRE", desc: "O que ela declarou desejar." },
    { label: "PATTERN", desc: "Padrões relevantes identificados." },
    { label: "NEXT", desc: "Possíveis próximos caminhos." },
    { label: "ATTENTION", desc: "Pontos que merecem avaliação profissional." },
  ];

  async function handleQuery(text: string) {
    setQuery(text);
    setIsQuerying(true);
    setResponse("");
    await new Promise(r => setTimeout(r, 1200));
    const responses: Record<string, string> = {
      "O que mudou desde o último capítulo?": "A análise do histórico indica uma mudança no objetivo registrado entre o Capítulo 03 e o Capítulo 04. No anterior, a prioridade era reconstrução profunda; agora, o foco shifted para manutenção e preservação do loiro. A porosidade melhorou de Nível 3 para Nível 2 segundo o último diagnóstico.",
      "Qual foi o padrão de manutenção?": "A cliente apresenta um padrão de retorno a cada 30–35 dias nos últimos 4 capítulos. As fórmulas mais frequentemente aplicadas envolvem комплекс reconstructor + tonalizante. Há uma consistência na seleção de produtos da linha profissional, com boa adesão ao home care prescrito.",
      "Faça um briefing para o próximo atendimento.": "INTELLIGENCE BRIEF — Próximo Atendimento\n\nÚLTIMO CAPÍTULO: Manutenção do Loiro (18 Ago 2026)\nHISTÓRICO RELEVANTE: Três capítulos de iluminação, intervalos crescentes, último desejo registrado: menor frequência de manutenção.\nOBJETIVO ATUAL: Preservação do loiro com menor intervenção.\nPADRÃO: Retorno a cada 30–35 dias.\nPONTO DE ATENÇÃO: Verificar estado da raiz e comprimento antes de definir técnica.\nPERGUNTA RECOMENDADA: 'A frequência de manutenção atual está confortável para você?'",
      "Quais informações importantes devo revisar?": "• Última visita: 18 Ago 2026 — Capítulo 04\n• Fórmula aplicada: RC-Complex + Tonalizante Frio (10g), pausa 25min\n• Resultado: Fibra selada, resistência recuperada\n• Objetivo declarado: Menor frequência de manutenção\n• Alerta: Último diagnóstico indicou porosidade em nível 2 — acompanhamento recomendado",
      "Resuma a história desta cliente.": "Jornada iniciada em 2024 com transformação completa. Ao longo de 12 capítulos, passou por correção de cor, inserção de mechas e tratamentos reconstrutores progressivos. O objetivo evoluiu de transformação para preservação. A cliente demonstra alta adesão ao protocolo, com retenção de 100%. Membro Signature do programa Loiro Saudável Premium.",
      "Há alertas de risco no histórico?": "Nenhum alerta crítico identificado no histórico. Pontos de monitoramento:\n• Sensibilidade a produtos com amônia — não registrada, mas merece verificação\n• Intervalo do último capítulo (45 dias)稍微 acima da média (30–35) — possível necessidade de reenquadrar expectativa com a cliente\n• Raiz visível desde a última visita — técnica de manutenção pode ser necessária",
    };
    setResponse(responses[text] || "Consultando o contexto disponível no Passaporte... Informção insuficiente para gerar uma resposta precisa. Por favor, tente reformular a pergunta.");
    setIsQuerying(false);
  }

  function handleAskTheCode(query: string) {
    const match = quickQueries.find(q => q.toLowerCase().includes(query.toLowerCase().split(" ")[0] ?? ""));
    if (match) handleQuery(match);
    else handleQuery(query);
  }

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
          <div className="px-3 py-1.5 bg-stamp-red/20 border border-stamp-red/30 rounded-full">
            <span className="font-label-caps text-label-caps text-parchment-white/70">v1.0</span>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-8 pb-12 px-margin-desktop max-w-[1600px] mx-auto w-full">

        {/* Document Title */}
        <section className="mb-10 animate-1">
          <div className="glass-panel p-8 rounded-xl text-center border-antique-gold/20">
            <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-[0.3em] mb-4">Documento Oficial de Implementação</p>
            <h2 className="font-display-lg text-display-lg text-parchment-white mb-2">Intelligence Architecture</h2>
            <p className="font-body-lg text-body-lg text-parchment-white/60 mb-4">BEAUTY JOURNEY INTELLIGENCE</p>
            <div className="flex justify-center gap-6 text-parchment-white/40 font-metadata text-metadata">
              <span>Produto: PASSAPORTE CAPILAR™</span>
              <span>•</span>
              <span>Assinatura: by Tainara Rodrigues</span>
            </div>
          </div>
        </section>

        {/* 01 — Visão */}
        <section className="mb-8 animate-2">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">01</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Visão</h3>
            </div>
            <p className="font-body-lg text-body-lg text-parchment-white/80 leading-relaxed mb-6">
              O <strong className="text-antique-gold">PASSAPORTE INTELLIGENCE™</strong> é a camada de inteligência do PASSAPORTE CAPILAR™. Sua função é transformar os registros acumulados na jornada da cliente em <span className="text-antique-gold">contexto</span>, <span className="text-antique-gold">memória</span>, <span className="text-antique-gold">interpretação</span> e <span className="text-antique-gold">direcionamento</span>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: "menu_book", text: "O Passaporte registra a história" },
                { icon: "psychology", text: "A Intelligence interpreta a história" },
                { icon: "person", text: "O profissional conduz o próximo capítulo" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-ink-black/50 rounded-lg border border-antique-gold/10">
                  <span className="material-symbols-outlined text-antique-gold/70 text-lg">{item.icon}</span>
                  <span className="font-metadata text-metadata text-parchment-white/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 — Posicionamento + 03 — Funções principais */}
        <section className="mb-8 animate-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">02</span>
                <h3 className="font-headline-lg text-headline-lg text-parchment-white">Posicionamento</h3>
              </div>
              <div className="bg-stamp-red/10 border border-stamp-red/20 rounded-lg p-4 mb-6">
                <p className="font-label-caps text-label-caps text-parchment-white/90 text-center">
                  O PASSAPORTE INTELLIGENCE™ não deve ser apresentado como chatbot, assistente genérico, IA de atendimento, gerador de textos, CRM inteligente ou sistema automático de diagnóstico.
                </p>
              </div>
              <div className="text-center">
                <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-widest mb-2">Seu posicionamento é</p>
                <p className="font-headline-lg text-headline-lg text-antique-gold">
                  BEAUTY JOURNEY<br />INTELLIGENCE
                </p>
                <p className="font-body-lg text-body-lg text-parchment-white/60 mt-2">
                  Uma inteligência criada para compreender a continuidade da jornada de beleza.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">03</span>
                <h3 className="font-headline-lg text-headline-lg text-parchment-white">5 Funções Principais</h3>
              </div>
              <div className="space-y-3">
                {functions.map((fn) => (
                  <div key={fn.num} className="flex items-center gap-4 p-3 bg-ink-black/50 rounded-lg border border-antique-gold/10 hover:border-antique-gold/30 transition-colors">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-label-caps text-xs text-ink-black shrink-0" style={{ backgroundColor: fn.color }}>
                      {fn.num}
                    </div>
                    <div>
                      <p className="font-label-caps text-label-caps text-antique-gold">{fn.label}</p>
                      <p className="font-metadata text-metadata text-parchment-white/50">{fn.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Regra Fundamental */}
        <section className="mb-8 animate-4">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">05</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Regra Fundamental</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <p className="font-label-caps text-label-caps text-green-400 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-400">check_circle</span> COPILOTO DE INTELIGÊNCIA
                </p>
                <p className="font-body-lg text-body-lg text-parchment-white/80">
                  A Intelligence funciona como <strong className="text-antique-gold">copiloto</strong> — interpreta, sugere, apresenta contexto.
                </p>
              </div>
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6">
                <p className="font-label-caps text-label-caps text-red-400 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-400">block</span> AUTORIDADE FINAL
                </p>
                <p className="font-body-lg text-body-lg text-parchment-white/80">
                  A Intelligence <strong className="text-stamp-red">nunca</strong> substitui o profissional. A decisão sempre pertence a quem conduz.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-label-caps text-label-caps text-parchment-white/40 mb-4">Fluxo de Decisão</p>
              <div className="flex flex-wrap items-center gap-2 justify-center">
                {["DADOS", "PASSAPORTE", "INTELLIGENCE", "LEITURA", "INSIGHT", "SUGESTÃO", "PROFISSIONAL", "DECISÃO"].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="px-4 py-2 bg-ink-black/60 border border-antique-gold/20 rounded font-label-caps text-label-caps text-antique-gold/80 text-xs">
                      {step}
                    </div>
                    {i < 7 && (
                      <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_forward</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 06 — Fontes de Dados */}
        <section className="mb-8 animate-5">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">06</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Fontes de Dados</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Histórico", icon: "history", items: ["Atendimentos", "Procedimentos", "Datas", "Profissionais", "Observações", "Registros"] },
                { title: "Jornada", icon: "route", items: ["Capítulos", "Check-ins", "Check-outs", "Carimbos", "Próximos Destinos"] },
                { title: "Preferências", icon: "favorite", items: ["Preferências registradas", "Objetivos declarados", "Observações da cliente", "Preferências de experiência"] },
                { title: "Relacionamento", icon: "people", items: ["Frequência", "Retornos", "Histórico de interação", "Programas", "Memberships"] },
                { title: "Conteúdo Visual", icon: "image", items: ["Fotografias", "Referências", "Registros visuais"] },
              ].map((source, i) => (
                <div key={i} className="bg-ink-black/50 rounded-lg p-4 border border-antique-gold/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-antique-gold/70">{source.icon}</span>
                    <h4 className="font-label-caps text-label-caps text-antique-gold">{source.title}</h4>
                  </div>
                  <ul className="space-y-1">
                    {source.items.map((item, j) => (
                      <li key={j} className="font-metadata text-metadata text-parchment-white/50 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-antique-gold/40"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 — Data Governance */}
        <section className="mb-8 animate-6">
          <div className="glass-panel p-8 rounded-xl border-stamp-red/20">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-stamp-red bg-stamp-red/20 px-2 py-1 rounded">07</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Data Governance</h3>
            </div>
            <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-lg p-6 text-center mb-6">
              <p className="font-label-caps text-label-caps text-parchment-white/80">
                Se o dado <strong className="text-antique-gold">não existe</strong> no Passaporte, a Intelligence <strong className="text-stamp-red">não pode</strong> tratá-lo como fato.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-label-caps text-label-caps text-stamp-red mb-3">Nunca inventar:</p>
                <div className="flex flex-wrap gap-2">
                  {["Nome", "Data", "Procedimento", "Histórico", "Preferência", "Resultado", "Diagnóstico", "Informação pessoal"].map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-ink-black/50 border border-stamp-red/20 rounded-full font-metadata text-metadata text-parchment-white/60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-antique-gold/5 border border-antique-gold/20 rounded-lg p-4">
                <p className="font-label-caps text-label-caps text-antique-gold mb-2">Quando informação for insuficiente:</p>
                <p className="font-body-lg text-body-lg text-parchment-white/80">
                  <strong className="text-antique-gold">INFORMAÇÃO INSUFICIENTE</strong> deve ser preferível a uma suposição.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 08 — Camadas de Inteligência */}
        <section className="mb-8 animate-7">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">08</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Camadas de Inteligência</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {layers.map((layer, i) => (
                <div key={i} className="layer-card bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10 text-center">
                  <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-label-caps text-xs text-ink-black" style={{ backgroundColor: layer.color }}>
                    {layer.num}
                  </div>
                  <h4 className="font-label-caps text-label-caps text-antique-gold mb-2">{layer.name}</h4>
                  <p className="font-metadata text-metadata text-parchment-white/50 mb-3">{layer.question}</p>
                  <div className="bg-ink-black/60 rounded p-2">
                    <p className="font-metadata text-metadata text-parchment-white/40 italic">"...{layer.example.slice(1, -1).slice(0, 50)}..."</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 — Intelligence Brief + 10 — Ask The Code */}
        <section className="mb-8 animate-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">09</span>
                <h3 className="font-headline-lg text-headline-lg text-parchment-white">Intelligence Brief</h3>
              </div>
              <p className="font-body-sm text-body-sm text-parchment-white/60 mb-4">Resumo inteligente de cada cliente.</p>
              <div className="space-y-2">
                {brief.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-ink-black/50 rounded border border-antique-gold/10">
                    <span className="font-label-caps text-label-caps text-antique-gold w-20 shrink-0">{item.label}</span>
                    <span className="font-metadata text-metadata text-parchment-white/60">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">10</span>
                <h3 className="font-headline-lg text-headline-lg text-parchment-white">Ask The Code</h3>
              </div>
              <p className="font-body-sm text-body-sm text-parchment-white/60 mb-4">Interface conversacional própria. A Intelligence responde utilizando o contexto disponível no Passaporte.</p>

              <div className="relative mb-4">
                <textarea
                  className="intel-input w-full p-4 pr-12 bg-ink-black/70 border border-antique-gold/20 rounded-lg text-parchment-white placeholder-parchment-white/30 resize-none focus:outline-none transition-all font-body-lg text-body-lg"
                  placeholder="Pergunte sobre esta jornada..."
                  rows={3}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={() => query.trim() && handleAskTheCode(query)}
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
          </div>
        </section>

        {/* 11 — Prepare My Appointment */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">11</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Prepare My Appointment</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Pré-atendimento</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Briefing automático gerado antes do atendimento. Solicite através do Ask The Code ou clique abaixo.</p>

            <button
              onClick={() => handleQuery("Faça um briefing para o próximo atendimento.")}
              className="w-full p-6 bg-antique-gold/5 border border-antique-gold/20 rounded-xl hover:border-antique-gold/40 hover:bg-antique-gold/10 transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-label-caps text-label-caps text-antique-gold mb-1">PREPARE MY APPOINTMENT</p>
                  <p className="font-body-sm text-body-sm text-parchment-white/60">Gere um resumo completo para o próximo atendimento desta cliente.</p>
                </div>
                <span className="material-symbols-outlined text-antique-gold group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </button>

            {response && query.includes("briefing") && (
              <div className="mt-4 bg-ink-black/30 rounded-lg p-4 border border-antique-gold/10 max-h-[300px] overflow-y-auto">
                <div className="space-y-3">
                  {response.split("\n").filter(l => l.trim()).map((line, i) => (
                    <div key={i} className={`flex gap-3 ${line.startsWith("INTELLIGENCE") ? "border-b border-antique-gold/10 pb-2 mb-1" : ""}`}>
                      <span className="font-metadata text-metadata text-antique-gold/50 shrink-0">{i + 1}.</span>
                      <span className="font-body-sm text-body-sm text-parchment-white/70">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 12 — Next Destination Intelligence */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">12</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Next Destination Intelligence</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Próximo Destino</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">A seção Próximo Destino passa a ter inteligência. A Intelligence apresenta hipóteses — a decisão sempre pertence ao profissional.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: "Destino Possível", value: "Nutrição Intensiva", icon: "explore", color: "#8B5CF6" },
                { label: "Por Quê", value: "Baseado no padrão de reconstrução dos últimos 3 capítulos.", icon: "help", color: "#3B82F6" },
                { label: "O Que Validar", value: "Nível de porosidade atual e tolerância a produtos oleosos.", icon: "fact_check", color: "#10B981" },
                { label: "Decisão", value: "Sempre pertence ao profissional.", icon: "gavel", color: "#C5A059" },
              ].map((item, i) => (
                <div key={i} className="bg-ink-black/50 rounded-lg p-4 border border-antique-gold/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-sm" style={{ color: item.color }}>{item.icon}</span>
                    <span className="font-label-caps text-label-caps text-parchment-white/50">{item.label}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-parchment-white/80">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13 — Exemplo de Raciocínio */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">13</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Exemplo de Raciocínio</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-ink-black/50 rounded-lg p-5 border border-antique-gold/10">
                <p className="font-label-caps text-label-caps text-antique-gold mb-3">Dados analisados</p>
                <ul className="space-y-2">
                  {["Três capítulos de iluminação", "Intervalos crescentes", 'Último registro indicando desejo: "menor manutenção"'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-metadata text-metadata text-parchment-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-antique-gold/40"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-900/20 rounded-lg p-5 border border-green-700/30">
                <p className="font-label-caps text-label-caps text-green-400 mb-3">Intelligence produz:</p>
                <p className="font-body-sm text-body-sm text-parchment-white/80 italic">
                  "A jornada recente indica uma busca por maior praticidade. Antes de propor uma nova transformação, vale confirmar se a prioridade atual continua sendo reduzir a frequência de manutenção."
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="font-label-caps text-label-caps text-parchment-white/40">
                A Intelligence interpreta. <span className="text-antique-gold">O profissional decide.</span>
              </p>
            </div>
          </div>
        </section>

        {/* 14 — Client Experience + 15 — Personalization */}
        <section className="mb-8 animate-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">14</span>
                <h3 className="font-headline-lg text-headline-lg text-parchment-white">Client Experience</h3>
              </div>
              <p className="font-body-sm text-body-sm text-parchment-white/60 mb-4">No Passaporte da cliente, a linguagem é diferente. Ela não precisa visualizar scores, classificações ou algoritmos.</p>
              <div className="space-y-3">
                {[
                  { label: "MY JOURNEY", desc: '"Você está construindo uma história."' },
                  { label: "MY NEXT DESTINATION", desc: '"Seu próximo capítulo pode começar aqui."' },
                  { label: "REFLECT", desc: '"O que mudou desde a sua última transformação?"' },
                  { label: "MY PASSPORT", desc: '"Tudo o que você construiu até aqui."' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-ink-black/50 rounded-lg border border-antique-gold/10">
                    <span className="material-symbols-outlined text-antique-gold/60">auto_awesome</span>
                    <div>
                      <p className="font-label-caps text-label-caps text-antique-gold">{item.label}</p>
                      <p className="font-metadata text-metadata text-parchment-white/50 italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">15</span>
                <h3 className="font-headline-lg text-headline-lg text-parchment-white">Personalização</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-label-caps text-label-caps text-parchment-white/50 mb-2">Edição do profissional pode personalizar:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Identidade", "Linguagem", "Logo", "Cores", "Assinatura", "Especialidade"].map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-antique-gold/10 border border-antique-gold/20 rounded-full font-metadata text-metadata text-antique-gold/80">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-lg p-4">
                  <p className="font-label-caps text-label-caps text-parchment-white/50 mb-2">Mas não pode descaracterizar:</p>
                  <p className="font-headline-lg text-headline-lg text-antique-gold">PASSAPORTE CAPILAR™</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-metadata text-metadata text-parchment-white/40">PASSAPORTE CAPILAR™</span>
                  <span className="material-symbols-outlined text-antique-gold/40 text-sm">arrow_forward</span>
                  <span className="font-metadata text-metadata text-parchment-white/40">PASSAPORTE INTELLIGENCE™</span>
                  <span className="material-symbols-outlined text-antique-gold/40 text-sm">arrow_forward</span>
                  <span className="font-metadata text-metadata text-parchment-white/40">EDIÇÃO DO PROFISSIONAL</span>
                  <span className="material-symbols-outlined text-antique-gold/40 text-sm">arrow_forward</span>
                  <span className="font-metadata text-metadata text-parchment-white/40">CLIENTE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 16 — Multi-Professional Journey */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">16</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Multi-Professional Journey</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Jornada Multi-Profissional</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Uma das funções estratégicas mais importantes. A cliente pode ter capítulos realizados por diferentes profissionais. A Intelligence deve compreender a continuidade.</p>

            <div className="bg-ink-black/50 rounded-xl p-6 border border-antique-gold/10 mb-6">
              <div className="flex flex-col items-center gap-3">
                {[
                  { label: "PROFISSIONAL A", chapter: "CAPÍTULO 01" },
                  { label: "PROFISSIONAL B", chapter: "CAPÍTULO 02" },
                  { label: "PROFISSIONAL C", chapter: "CAPÍTULO 03" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-center px-4 py-2 bg-antique-gold/10 border border-antique-gold/20 rounded-lg">
                        <span className="font-label-caps text-label-caps text-antique-gold">{item.label}</span>
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_downward</span>
                        <span className="px-3 py-1 bg-stamp-red/20 border border-stamp-red/30 rounded font-label-caps text-label-caps text-parchment-white/60 text-xs">{item.chapter}</span>
                        <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_downward</span>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_downward</span>
                        <span className="px-3 py-1 bg-stamp-red/20 border border-stamp-red/30 rounded font-label-caps text-label-caps text-parchment-white/60 text-xs">{item.chapter}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-antique-gold/5 border border-antique-gold/20 rounded-lg p-5 text-center">
              <p className="font-headline-lg text-headline-lg text-antique-gold mb-2">A história permanece com a cliente.</p>
              <p className="font-label-caps text-label-caps text-parchment-white/60">Isso materializa o conceito:</p>
              <div className="mt-3 space-y-1">
                <p className="font-body-lg text-body-lg text-parchment-white/70 italic">"Seu cabelo muda."</p>
                <p className="font-body-lg text-body-lg text-parchment-white/70 italic">"Seu profissional pode mudar."</p>
                <p className="font-body-lg text-body-lg text-antique-gold italic">"Sua história continua com você."</p>
              </div>
            </div>
          </div>
        </section>

        {/* 17 — Professional Handoff */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">17</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Professional Handoff</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Transição de Profissional</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Quando uma cliente chegar a um novo profissional, o Passaporte poderá gerar um resumo autorizado da jornada.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-ink-black/50 rounded-xl p-6 border border-antique-gold/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-antique-gold/20 border border-antique-gold/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-antique-gold">description</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-antique-gold">JOURNEY BRIEF</p>
                    <p className="font-metadata text-metadata text-parchment-white/50">Resumo da jornada</p>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-parchment-white/60">
                  Documento gerado automaticamente com informações relevantes e autorizadas. Inclui histórico de procedimentos, preferências declaradas, objetivos da cliente e padrões identificados — sem expor dados sensíveis ou decisões internas.
                </p>
              </div>

              <div className="bg-ink-black/50 rounded-xl p-6 border border-antique-gold/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-900/30 border border-green-700/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-400">goal</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-green-400">OBJETIVO</p>
                    <p className="font-metadata text-metadata text-parchment-white/50">Continuidade da história</p>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-parchment-white/80 italic">
                  "Evitar que a cliente precise reconstruir toda sua história do zero."
                </p>
                <p className="font-body-sm text-body-sm text-parchment-white/50 mt-2">
                  A cliente não perde contexto. O novo profissional tem informações suficientes para dar continuidade à jornada sem retrabalhos.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-center">
              {["PROFISSIONAL ANTERIOR", "JOURNEY BRIEF", "CLIENTE", "NOVO PROFISSIONAL"].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="px-4 py-2 bg-ink-black/60 border border-antique-gold/20 rounded font-label-caps text-label-caps text-parchment-white/70 text-xs">
                    {step}
                  </div>
                  {i < 3 && <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_forward</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 18 — Privacidade */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">18</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Privacidade</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Data Privacy & Consent</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">A arquitetura deve prever princípios fundamentais de proteção de dados e consentimento.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {[
                { icon: "checklist", label: "Consentimento", desc: "Autorização explícita para uso de dados" },
                { icon: "admin_panel_settings", label: "Controle de acesso", desc: "Permissões granulares por perfil" },
                { icon: "visibility_off", label: "Separação", desc: "Cliente e profissional com dados isolados" },
                { icon: "history", label: "Registro de permissões", desc: "Trilha de auditoria completa" },
                { icon: "cancel", label: "Revogação", desc: "Possibilidade de remover consentimento" },
                { icon: "security", label: "Proteção", desc: "Criptografia e segurança de dados" },
                { icon: "filter_alt", label: "Minimização", desc: "Dados limitados ao necessário" },
                { icon: "info", label: "Transparência", desc: "Uso da IA informado e claro" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-ink-black/50 rounded-lg border border-antique-gold/10">
                  <span className="material-symbols-outlined text-antique-gold/60 text-lg shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-label-caps text-label-caps text-antique-gold text-xs">{item.label}</p>
                    <p className="font-metadata text-metadata text-parchment-white/40 text-[10px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-antique-gold/5 border border-antique-gold/20 rounded-lg p-4 text-center">
              <p className="font-body-sm text-body-sm text-parchment-white/70">
                Informações pessoais devem ser tratadas conforme <strong className="text-antique-gold">finalidade</strong>, <strong className="text-antique-gold">necessidade</strong> e <strong className="text-antique-gold">legislação aplicável</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* 19 — Exclusões */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl border-stamp-red/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-stamp-red bg-stamp-red/20 px-2 py-1 rounded">19</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Exclusões</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">O que a Intelligence não deve fazer</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">A Intelligence não deve, sob nenhuma circunstância:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Diagnosticar doenças",
                "Prescrever medicamentos",
                "Substituir avaliação profissional",
                "Garantir resultado químico",
                "Inventar informações",
                "Determinar procedimentos obrigatórios",
                "Realizar decisões financeiras",
                "Alterar dados históricos automaticamente sem autorização",
                "Modificar registros reais sem rastreabilidade",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-stamp-red/10 border border-stamp-red/20 rounded-lg">
                  <span className="material-symbols-outlined text-stamp-red text-lg shrink-0">block</span>
                  <span className="font-metadata text-metadata text-parchment-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 20 — Confidence Layer */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">20</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Confidence Layer</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Nível de Confiança</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Toda interpretação relevante deverá possuir internamente um nível de confiança.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { level: "HIGH", color: "#10B981", bg: "bg-green-900/20", border: "border-green-700/30", icon: "verified", desc: "Baseada diretamente em dados claros", sub: "Apresentar como conclusão" },
                { level: "MEDIUM", color: "#F59E0B", bg: "bg-yellow-900/20", border: "border-yellow-700/30", icon: "help", desc: "Baseada em múltiplos registros, mas exige confirmação", sub: "Apresentar como hipótese" },
                { level: "LOW", color: "#EF4444", bg: "bg-red-900/20", border: "border-red-700/30", icon: "warning", desc: "Possibilidade que não deve ser apresentada como conclusão", sub: 'Resposta: "Informação insuficiente"' },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} rounded-xl p-5 border ${item.border}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-lg" style={{ color: item.color }}>{item.icon}</span>
                    <span className="font-label-caps text-label-caps" style={{ color: item.color }}>{item.level}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-parchment-white/70 mb-2">{item.desc}</p>
                  <p className="font-metadata text-metadata text-parchment-white/40 text-xs italic">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-lg p-4 text-center">
              <p className="font-body-sm text-body-sm text-parchment-white/70">
                Quando a confiança for <strong className="text-stamp-red">baixa</strong>: <span className="italic">"Não há informações suficientes para concluir isso."</span>
              </p>
            </div>
          </div>
        </section>

        {/* 21 — Human Confirmation */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">21</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Human Confirmation</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Confirmação Humana</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Quando a Intelligence gerar uma sugestão relevante, o profissional deve poder decidir se ela será incorporada à jornada.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { action: "CONFIRMAR", color: "#10B981", bg: "bg-green-900/20", border: "border-green-700/30", icon: "check_circle", desc: "Incorporar a sugestão à jornada. A Intelligence registra como decisão confirmada." },
                { action: "EDITAR", color: "#F59E0B", bg: "bg-yellow-900/20", border: "border-yellow-700/30", icon: "edit", desc: "Ajustar a sugestão antes de incorporar. O profissional modifica o contexto." },
                { action: "IGNORAR", color: "#EF4444", bg: "bg-red-900/20", border: "border-red-700/30", icon: "cancel", desc: "Descartar a sugestão. A Intelligence registra o descarte para referência futura." },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} rounded-xl p-5 border ${item.border} text-center`}>
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${item.color}30` }}>
                    <span className="material-symbols-outlined text-xl" style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <p className="font-label-caps text-label-caps mb-2" style={{ color: item.color }}>{item.action}</p>
                  <p className="font-metadata text-metadata text-parchment-white/60 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-ink-black/50 rounded-lg p-4 border border-antique-gold/10">
              <p className="font-label-caps text-label-caps text-antique-gold mb-2 text-center">Exemplo de fluxo</p>
              <div className="flex flex-wrap items-center gap-2 justify-center">
                {["SUGESTÃO", "PROFISSIONAL", "CONFIRMAR / EDITAR / IGNORAR", "REGISTRO", "JORNADA"].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-antique-gold/10 border border-antique-gold/20 rounded font-label-caps text-label-caps text-antique-gold/70 text-xs">
                      {step}
                    </div>
                    {i < 4 && <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_forward</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 22 — Feedback Loop */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">22</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Feedback Loop</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Ciclo de Aprendizado</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">O sistema deve aprender com decisões humanas sem alterar automaticamente a verdade histórica.</p>

            <div className="bg-ink-black/50 rounded-xl p-6 border border-antique-gold/10 mb-6">
              <div className="flex flex-col items-center gap-4">
                {[
                  { step: "INSIGHT", icon: "lightbulb", color: "#8B5CF6" },
                  { step: "PROFISSIONAL AVALIA", icon: "psychology", color: "#3B82F6" },
                  { step: "CONFIRMA / EDITA / IGNORA", icon: "task_alt", color: "#F59E0B" },
                  { step: "REGISTRO", icon: "save", color: "#10B981" },
                  { step: "MELHORIA FUTURA", icon: "trending_up", color: "#C5A059" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 w-full max-w-md">
                    <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                      <span className="material-symbols-outlined text-sm" style={{ color: item.color }}>{item.icon}</span>
                    </div>
                    <div className="flex-grow flex items-center gap-3">
                      <span className="font-label-caps text-label-caps text-parchment-white/80">{item.step}</span>
                      {i < 4 && (
                        <div className="flex-grow flex justify-center">
                          <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_downward</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-antique-gold/5 border border-antique-gold/20 rounded-lg p-4 text-center">
              <p className="font-body-sm text-body-sm text-parchment-white/70">
                Decisões humanas alimentam a Intelligence sem comprometer a <strong className="text-antique-gold">veracidade dos registros históricos</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* 23 — Intelligence Memory */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">23</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Intelligence Memory</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Arquitetura de Memória</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Separar os tipos de memória é fundamental para que a Intelligence nunca confunda interpretação com fato.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: "FACT MEMORY", icon: "fact_check", color: "#10B981", desc: "Fatos registrados no Passaporte. Dados objetivos, verificáveis e auditáveis.", example: "'Último atendimento: 18 Ago 2026'" },
                { label: "PREFERENCE MEMORY", icon: "favorite", color: "#8B5CF6", desc: "Preferências declaradas pela cliente. Histórico de escolhas e negações.", example: "'Cliente prefere produtos sem amônia'" },
                { label: "JOURNEY MEMORY", icon: "route", color: "#3B82F6", desc: "Histórico da evolução. Mudanças de objetivo, padrões de retorno, transformações.", example: "'Três capítulos de iluminação + reconstrução progressiva'" },
                { label: "INFERENCE", icon: "psychology", color: "#C5A059", desc: "Interpretações da Intelligence. Nunca devem ser confundidas com fatos.", example: "'Possível busca por menor manutenção — requer confirmação'" },
              ].map((item, i) => (
                <div key={i} className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-antique-gold/60">{item.icon}</span>
                    <span className="font-label-caps text-label-caps text-antique-gold">{item.label}</span>
                  </div>
                  <p className="font-metadata text-metadata text-parchment-white/60 mb-3 text-xs">{item.desc}</p>
                  <div className="bg-ink-black/60 rounded p-2">
                    <p className="font-metadata text-metadata text-parchment-white/40 text-[10px] italic">Ex: {item.example}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-lg p-4 text-center">
              <p className="font-body-sm text-body-sm text-parchment-white/70">
                <strong className="text-stamp-red">Importante:</strong> As inferências <strong>nunca</strong> devem ser confundidas com fatos. A marcação visual deve deixar claro quando uma informação é interpretação da Intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* 24 — Interface */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">24</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Interface</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Apresentação Discreta</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">A Intelligence deve aparecer de forma discreta. Não transformar cada tela em uma conversa com IA.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { screen: "Dashboard", feature: "INTELLIGENCE", icon: "dashboard", desc: "Visão geral com Insights da jornada" },
                { screen: "Cliente", feature: "INTELLIGENCE BRIEF", icon: "person", desc: "Resumo inteligente do perfil" },
                { screen: "Atendimento", feature: "PREPARE MY APPOINTMENT", icon: "calendar_today", desc: "Briefing pré-atendimento" },
                { screen: "Jornada", feature: "JOURNEY INSIGHT", icon: "route", desc: "Análise contextualizada" },
                { screen: "Próximo Destino", feature: "NEXT DESTINATION", icon: "explore", desc: "Sugestão inteligentes de destino" },
                { screen: "Busca", feature: "ASK THE CODE", icon: "search", desc: "Interface conversacional" },
              ].map((item, i) => (
                <div key={i} className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10 hover:border-antique-gold/30 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-antique-gold/10 border border-antique-gold/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-antique-gold text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-label-caps text-label-caps text-parchment-white/50">{item.screen}</p>
                      <p className="font-label-caps text-label-caps text-antique-gold">{item.feature}</p>
                    </div>
                  </div>
                  <p className="font-metadata text-metadata text-parchment-white/50 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 25 — Microcopy */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">25</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Microcopy</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Linguagem da Intelligence</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">A linguagem deve ser sofisticada, humana, curta, inteligente e não técnica.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-red-400">block</span>
                  <p className="font-label-caps text-label-caps text-red-400">Evitar</p>
                </div>
                <div className="space-y-3">
                  {[
                    { bad: '"IA detectou…"', good: '"Uma leitura da sua jornada indica…"' },
                    { bad: '"Algoritmo recomenda…"', good: '"Com base nos registros disponíveis…"' },
                    { bad: '"Análise biométrica indicate…"', good: '"Considerando o histórico registrado…"' },
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
                <div className="space-y-3">
                  {[
                    "Sofisticada — sem jargão técnico",
                    "Humana — como um conselheiro experiente",
                    "Curta — sem冗長表述",
                    "Inteligente — mostra compreensão",
                    "Não técnica — acessível a todos",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-ink-black/40 rounded-lg">
                      <span className="material-symbols-outlined text-antique-gold/60 text-sm">check</span>
                      <span className="font-metadata text-metadata text-parchment-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 26 — MVP */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl border-antique-gold/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">26</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">MVP</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Versão 1.0</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">A primeira versão da Intelligence deverá conter apenas funcionalidades essenciais e validadas.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-green-400">check_circle</span>
                  <p className="font-label-caps text-label-caps text-green-400">IMPLEMENTAR</p>
                </div>
                <div className="space-y-2">
                  {[
                    "Leitura do histórico",
                    "Resumo inteligente",
                    "Briefing pré-atendimento",
                    "Identificação de mudanças",
                    "Identificação de padrões",
                    "Sugestão de próximo destino",
                    "ASK THE CODE",
                    "Confirmação humana",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-ink-black/40 rounded">
                      <span className="material-symbols-outlined text-green-400/60 text-sm">done</span>
                      <span className="font-metadata text-metadata text-parchment-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-stamp-red">block</span>
                  <p className="font-label-caps text-label-caps text-stamp-red">NÃO IMPLEMENTAR INICIALMENTE</p>
                </div>
                <div className="space-y-2">
                  {[
                    "Diagnóstico automatizado complexo",
                    "Análise visual avançada",
                    "Previsão financeira",
                    "Automções excessivas",
                    "Agentes autônomos",
                    "Decisões automáticas",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-ink-black/40 rounded">
                      <span className="material-symbols-outlined text-stamp-red/60 text-sm">close</span>
                      <span className="font-metadata text-metadata text-parchment-white/50">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 27 — Fase 02 */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">27</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Fase 02</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Evolução do MVP</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Adicionar funcionalidades avançadas após validação do MVP.</p>

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
                    <p className="font-label-caps text-label-caps text-antique-gold">{item.label}</p>
                  </div>
                  <p className="font-metadata text-metadata text-parchment-white/50 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 28 — Fase 03 */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">28</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Fase 03</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Expansão Avançada</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Funcionalidades que requerem infraestrutura mais robusta.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "image", label: "Análise Multimodal", desc: "Leitura de imagens autorizadas" },
                { icon: "photo_camera", label: "Inteligência Visual", desc: "Processamento de registros visuais" },
                { icon: "trending_up", label: "Inteligência de Tendências", desc: "Identificação de tendências emergentes" },
                { icon: "auto_forecast", label: "Previsão de Necessidades", desc: "Antecipação de demandas" },
                { icon: "automation", label: "Automções", desc: "Processos automatizados inteligentes" },
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
        </section>

        {/* 29 — Fase 04 */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">29</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Fase 04</h3>
              <span className="font-metadata text-metadata text-parchment-white/40 ml-auto">Infraestrutura Escalável</span>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Transformar o PASSAPORTE INTELLIGENCE™ em uma infraestrutura escalável para diferentes aplicações.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Beauty Intelligence API", icon: "api", desc: "API para integração com outros sistemas", color: "#8B5CF6" },
                { label: "Professional Intelligence", icon: "badge", desc: "Inteligência específica para profissionais", color: "#3B82F6" },
                { label: "Client Journey Intelligence", icon: "journey", desc: "Inteligência da jornada da cliente", color: "#10B981" },
                { label: "Beauty Business Intelligence", icon: "analytics", desc: "Inteligência de negócios", color: "#C5A059" },
              ].map((item, i) => (
                <div key={i} className="bg-ink-black/50 rounded-xl p-5 border border-antique-gold/10 text-center">
                  <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                    <span className="material-symbols-outlined text-xl" style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <p className="font-label-caps text-label-caps text-antique-gold mb-2">{item.label}</p>
                  <p className="font-metadata text-metadata text-parchment-white/40 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 30 — Ecossistema Futuro */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">30</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Ecossistema Futuro</h3>
            </div>

            <div className="bg-ink-black/50 rounded-xl p-8 border border-antique-gold/10 mb-6">
              <div className="flex flex-col items-center gap-4">
                {/* THE CODE VISION */}
                <div className="px-8 py-4 bg-antique-gold/10 border border-antique-gold/30 rounded-xl text-center">
                  <p className="font-label-caps text-label-caps text-antique-gold">THE CODE VISION</p>
                </div>
                <span className="material-symbols-outlined text-antique-gold/40">arrow_downward</span>

                {/* BEAUTY INTELLIGENCE */}
                <div className="px-8 py-4 bg-antique-gold/15 border border-antique-gold/40 rounded-xl text-center">
                  <p className="font-label-caps text-label-caps text-antique-gold">BEAUTY INTELLIGENCE</p>
                </div>
                <span className="material-symbols-outlined text-antique-gold/40">arrow_downward</span>

                {/* PASSAPORTE CAPILAR */}
                <div className="px-8 py-4 bg-antique-gold/20 border border-antique-gold/50 rounded-xl text-center">
                  <p className="font-headline-lg text-headline-lg text-antique-gold">PASSAPORTE CAPILAR™</p>
                </div>
                <span className="material-symbols-outlined text-antique-gold/40">arrow_downward</span>

                {/* Three pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                  {[
                    { label: "EXPERIENCE", icon: "auto_awesome" },
                    { label: "PROFESSIONAL", icon: "person" },
                    { label: "INTELLIGENCE", icon: "psychology" },
                  ].map((item, i) => (
                    <div key={i} className="px-4 py-3 bg-ink-black/60 border border-antique-gold/20 rounded-lg text-center">
                      <span className="material-symbols-outlined text-antique-gold/60 mb-1">{item.icon}</span>
                      <p className="font-label-caps text-label-caps text-antique-gold/70 text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>

                <span className="material-symbols-outlined text-antique-gold/40">arrow_downward</span>

                {/* CLIENT JOURNEY */}
                <div className="px-8 py-4 bg-antique-gold/10 border border-antique-gold/30 rounded-xl text-center">
                  <p className="font-label-caps text-label-caps text-antique-gold">CLIENT JOURNEY</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 31 — Princípio de Produto + 32 — Diferencial */}
        <section className="mb-8 animate-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">31</span>
                <h3 className="font-headline-lg text-headline-lg text-parchment-white">Princípio de Produto</h3>
              </div>
              <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">O PASSAPORTE CAPILAR™ não deve competir com softwares tradicionais de salão pela quantidade de funcionalidades.</p>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: "memory", label: "MEMÓRIA", desc: "Cada interação registrada é memória" },
                  { icon: "timeline", label: "CONTINUIDADE", desc: "A história não se perde" },
                  { icon: "badge", label: "IDENTIDADE", desc: "Cada cliente é única" },
                  { icon: "star", label: "EXPERIÊNCIA", desc: "Além do serviço, a vivência" },
                  { icon: "psychology", label: "INTELIGÊNCIA", desc: "Contexto que transforma" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-ink-black/50 rounded-lg border border-antique-gold/10">
                    <span className="material-symbols-outlined text-antique-gold/60 text-xl">{item.icon}</span>
                    <div>
                      <p className="font-label-caps text-label-caps text-antique-gold">{item.label}</p>
                      <p className="font-metadata text-metadata text-parchment-white/50 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">32</span>
                <h3 className="font-headline-lg text-headline-lg text-parchment-white">Diferencial</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Um CRM pergunta:",
                    a: "\"Quando foi seu último atendimento?\"",
                    p: "O Passaporte pode responder:",
                    pa: "\"Qual é a história dessa cliente e onde ela está agora?\"",
                    color: "#8B5CF6"
                  },
                  {
                    q: "Um sistema tradicional registra:",
                    a: "\"Serviço realizado.\"",
                    p: "O Passaporte registra:",
                    pa: "\"Capítulo da jornada.\"",
                    color: "#3B82F6"
                  },
                  {
                    q: "Um sistema tradicional agenda:",
                    a: "\"Próximo horário.\"",
                    p: "O Passaporte constrói:",
                    pa: "\"Próximo destino.\"",
                    color: "#10B981"
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-ink-black/50 rounded-lg p-4 border border-antique-gold/10">
                    <div className="mb-2">
                      <p className="font-metadata text-metadata text-parchment-white/50 text-xs">{item.q}</p>
                      <p className="font-body-sm text-body-sm text-stamp-red/70 italic">{item.a}</p>
                    </div>
                    <div className="border-t border-antique-gold/10 pt-2">
                      <p className="font-metadata text-metadata text-parchment-white/50 text-xs">{item.p}</p>
                      <p className="font-body-sm text-body-sm italic" style={{ color: item.color }}>{item.pa}</p>
                    </div>
                  </div>
                ))}

                <div className="bg-antique-gold/10 border border-antique-gold/20 rounded-lg p-4 text-center">
                  <p className="font-body-sm text-body-sm text-parchment-white/70">
                    E a Intelligence transforma tudo isso em <strong className="text-antique-gold">contexto</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 33 — Definição Oficial */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl text-center">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">33</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Definição Oficial</h3>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-antique-gold/10 border border-antique-gold/20 rounded-xl p-6">
                <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-widest mb-2">PASSAPORTE CAPILAR™</p>
                <p className="font-headline-lg text-headline-lg text-antique-gold italic">A infraestrutura da jornada.</p>
              </div>

              <div className="bg-antique-gold/15 border border-antique-gold/30 rounded-xl p-6">
                <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-widest mb-2">PASSAPORTE INTELLIGENCE™</p>
                <p className="font-headline-lg text-headline-lg text-antique-gold italic">A inteligência que compreende a jornada.</p>
              </div>

              <div className="bg-stamp-red/10 border border-stamp-red/20 rounded-xl p-6">
                <p className="font-label-caps text-label-caps text-antique-gold/60 uppercase tracking-widest mb-2">THE CODE VISION</p>
                <p className="font-headline-lg text-headline-lg text-antique-gold italic">A metodologia e visão que orientam essa inteligência.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 34 — Critério de Sucesso */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">34</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Critério de Sucesso</h3>
            </div>
            <p className="font-body-sm text-body-sm text-parchment-white/60 mb-6">Ao utilizar o sistema, o profissional deve sentir:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "psychology",
                  subject: "O profissional deve sentir:",
                  quote: "\"Eu conheço melhor minha cliente.\"",
                  color: "#8B5CF6"
                },
                {
                  icon: "person",
                  subject: "A cliente deve sentir:",
                  quote: "\"Minha história está comigo.\"",
                  color: "#10B981"
                },
                {
                  icon: "auto_awesome",
                  subject: "A plataforma deve demonstrar:",
                  quote: "\"Eu não apenas armazeno dados. Eu compreendo continuidade.\"",
                  color: "#C5A059"
                },
              ].map((item, i) => (
                <div key={i} className="bg-ink-black/50 rounded-xl p-6 border border-antique-gold/10 text-center">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                    <span className="material-symbols-outlined text-xl" style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <p className="font-metadata text-metadata text-parchment-white/50 text-xs mb-2">{item.subject}</p>
                  <p className="font-body-lg text-body-lg italic" style={{ color: item.color }}>{item.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 35 — Princípio Final */}
        <section className="mb-8 animate-8">
          <div className="glass-panel p-8 rounded-xl border-antique-gold/30">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label-caps text-label-caps text-antique-gold bg-antique-gold/10 px-2 py-1 rounded">35</span>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white">Princípio Final</h3>
            </div>

            <div className="text-center mb-8">
              <p className="font-body-lg text-body-lg text-parchment-white/60 mb-6">
                O futuro do PASSAPORTE CAPILAR™ não está em guardar mais informações.<br />
                Está em transformar informação em:
              </p>

              <div className="flex flex-col items-center gap-3 max-w-xl mx-auto">
                {[
                  { label: "MEMÓRIA", desc: "Informação", arrow: true },
                  { label: "CONTEXTO", desc: "Memória", arrow: true },
                  { label: "INTELIGÊNCIA", desc: "Contexto", arrow: true },
                  { label: "EXPERIÊNCIAS MELHORES", desc: "Inteligência", arrow: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 w-full justify-center">
                    <div className="flex-1 max-w-[200px] px-4 py-3 bg-antique-gold/10 border border-antique-gold/20 rounded-lg text-right">
                      <span className="font-body-sm text-body-sm text-parchment-white/50">{item.desc}</span>
                    </div>
                    <span className="material-symbols-outlined text-antique-gold">arrow_forward</span>
                    <div className="flex-1 max-w-[200px] px-4 py-3 bg-antique-gold/15 border border-antique-gold/30 rounded-lg text-left">
                      <span className="font-label-caps text-label-caps text-antique-gold">{item.label}</span>
                    </div>
                    {item.arrow && <span className="material-symbols-outlined text-antique-gold/30 text-sm">arrow_downward</span>}
                    {item.arrow && <div className="flex-1 max-w-[200px]"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-antique-gold/10 border border-antique-gold/20 rounded-xl p-6 text-center max-w-2xl mx-auto">
              <p className="font-headline-lg text-headline-lg text-antique-gold italic">
                "O futuro não está em guardar mais.<br />
                Está em compreender melhor."
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-antique-gold/10 flex flex-col items-center gap-6">
          <div className="space-y-2 text-center">
            <p className="font-label-caps text-label-caps text-antique-gold">PASSAPORTE CAPILAR™</p>
            <p className="font-body-sm text-body-sm text-parchment-white/40 italic">A INFRAESTRUTURA DA JORNADA.</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-antique-gold/40">verified</span>
              <span className="font-metadata text-metadata text-parchment-white/40">
                PASSAPORTE INTELLIGENCE™ — Camada de Inteligência do PASSAPORTE CAPILAR™
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-parchment-white/30">Criado por:</span>
              <span className="font-label-caps text-label-caps text-antique-gold">TAINARA RODRIGUES</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-parchment-white/30">THE CODE VISION:</span>
              <span className="font-label-caps text-label-caps text-antique-gold">THE INTELLIGENCE BEHIND THE JOURNEY.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
