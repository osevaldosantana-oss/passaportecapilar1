import { createFileRoute, Link } from "@tanstack/react-router";
import clientPortrait from "@/assets/client-portrait.jpg";
import waxSeal from "@/assets/wax-seal.png";
import stampRed from "@/assets/stamp-red.png";
import stampBlack from "@/assets/stamp-black.png";
import { useState } from "react";

const pageCss = `
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .material-symbols-outlined[data-weight="fill"] {
        font-variation-settings: 'FILL' 1;
    }
    .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
    .pt-safe { padding-top: env(safe-area-inset-top); }
    
    .passport-hero {
        position: relative;
        aspect-ratio: 1 / 1.414;
        background-size: cover;
        background-position: center;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
        overflow: hidden;
    }
    
    .passport-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(74, 14, 14, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 24px;
    }
    
    .stamp-shadow {
        filter: drop-shadow(0px 4px 12px rgba(139, 0, 0, 0.2));
    }
    
    .debossed-surface {
        background-color: #F0EDE4;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
    }

    .intel-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .intel-card:hover {
        transform: translateY(-2px);
        border-color: rgba(197,160,89,0.5);
        box-shadow: 0 8px 24px rgba(197,160,89,0.15);
    }

    .pulse-dot {
        animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
    }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }

    .glass-panel {
        background: rgba(255,255,255,0.7);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(197,160,89,0.15);
    }

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .fade-in-1 { animation: fadeInUp 0.4s ease forwards; opacity: 0; }
    .fade-in-2 { animation: fadeInUp 0.4s ease 0.1s forwards; opacity: 0; }
    .fade-in-3 { animation: fadeInUp 0.4s ease 0.2s forwards; opacity: 0; }
`;

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Passaporte Capilar™ — Meu Passaporte" },
      { name: "description", content: "Acompanhe sua jornada capilar: próximo destino, capítulos e carimbos da sua edição diplomática." },
      { property: "og:title", content: "Passaporte Capilar™ — Meu Passaporte" },
      { property: "og:description", content: "Acompanhe sua jornada capilar: próximo destino, capítulos e carimbos da sua edição diplomática." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [showAskCode, setShowAskCode] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [response, setResponse] = useState<string>("");

  const quickQueries = [
    "O que mudou desde o último capítulo?",
    "Qual foi o padrão de manutenção?",
    "Faça um briefing para o próximo atendimento.",
    "Resuma a história desta cliente.",
  ];

  const intelligenceResponses: Record<string, string> = {
    "O que mudou desde o último capítulo?": "A análise do histórico indica uma mudança no objetivo entre o Capítulo 03 e o Capítulo 04. No anterior, a prioridade era reconstrução profunda; agora, o foco shifted para manutenção e preservação do loiro. A porosidade melhorou de Nível 3 para Nível 2 segundo o último diagnóstico.",
    "Qual foi o padrão de manutenção?": "A cliente apresenta um padrão de retorno a cada 30–35 dias nos últimos 4 capítulos. As fórmulas mais frequentemente aplicadas envolvem reconstructor + tonalizante. Há uma consistência na seleção de produtos profissionais, com boa adesão ao home care prescrito.",
    "Faça um briefing para o próximo atendimento.": "INTELLIGENCE BRIEF\n\nÚLTIMO CAPÍTULO: Manutenção do Loiro\nOBJETIVO ATUAL: Preservação do loiro com menor frequência\nPADRÃO: Retorno a cada 30–35 dias\nPONTO DE ATENÇÃO: Verificar estado da raiz\nPERGUNTA RECOMENDADA: 'A frequência atual está confortável?'",
    "Resuma a história desta cliente.": "Jornada iniciada em 2024 com transformação completa. Ao longo de 12 capítulos, passou por correção de cor, inserção de mechas e tratamentos reconstrutores progressivos. O objetivo evoluiu de transformação para preservação. Membro Signature do programa Loiro Saudável Premium.",
  };

  async function handleAskCode(text: string) {
    setIsQuerying(true);
    setResponse("");
    await new Promise(r => setTimeout(r, 1200));
    setResponse(intelligenceResponses[text] || "Consultando o contexto disponível no Passaporte... Informação insuficiente para gerar uma resposta precisa.");
    setIsQuerying(false);
  }

  return (
    <div className="bg-parchment-white text-on-surface antialiased pt-safe pb-24 md:pb-0">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <header className="bg-parchment-white border-b border-outline-variant transition-colors duration-300 flex justify-between items-center px-margin-mobile h-16 w-full z-50 sticky top-0 md:hidden">
        <button className="text-deep-burgundy hover:text-antique-gold transition-colors duration-300 p-2">
          <span className="material-symbols-outlined" data-icon="menu">menu</span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-deep-burgundy">
          Passaporte Capilar™
        </h1>
        <div className="h-8 w-8 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden">
          <img alt="Client Portrait" className="w-full h-full object-cover" data-alt="A small, professional portrait of a woman with red hair, soft lighting, elegant." src={clientPortrait} />
        </div>
      </header>

      {/* Intelligence Banner - Mobile */}
      <Link
        to="/dashboard"
        className="md:hidden block glass-panel mx-margin-mobile mt-4 p-4 rounded-xl border-antique-gold/20 hover:border-antique-gold/40 transition-all fade-in-1"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stamp-red/10 border border-stamp-red/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-stamp-red" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-deep-burgundy">Passaporte Intelligence™</p>
              <p className="font-metadata text-metadata text-outline">Beauty Journey Intelligence</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-antique-gold">arrow_forward</span>
        </div>
      </Link>

      <aside className="hidden md:flex flex-col h-screen w-80 rounded-r-none border-r border-outline-variant shadow-2xl bg-parchment-white fixed left-0 top-0 z-40 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden">
            <img alt="Client Avatar" className="w-full h-full object-cover" src={clientPortrait} />
          </div>
          <div>
            <h2 className="font-headline-lg text-deep-burgundy text-xl">Ana Silva</h2>
            <p className="font-body-sm text-on-surface-variant">Edição Diplomática</p>
            <p className="font-metadata text-metadata text-antique-gold">ID: PC-2026</p>
          </div>
        </div>

        <div className="h-px bg-outline-variant/30 mb-4"></div>

        <nav className="flex-1 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-deep-burgundy font-bold bg-surface-container-high hover:bg-surface-container-high/80 transition-colors duration-300">
            <span className="material-symbols-outlined" data-icon="auto_stories" data-weight="fill">auto_stories</span>
            <span className="font-body-lg text-body-lg">My Journey</span>
          </Link>
          <Link to="/carimbos/colecao" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-300">
            <span className="material-symbols-outlined" data-icon="approval">approval</span>
            <span className="font-body-lg text-body-lg">Beauty Stamps</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-300">
            <span className="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
            <span className="font-body-lg text-body-lg">Dashboard</span>
          </Link>
          <Link to="/auditoria" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-300">
            <span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
            <span className="font-body-lg text-body-lg">Auditoria</span>
          </Link>
        </nav>
        <div className="mt-auto">
          <Link to="/auth" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-300">
            <span className="material-symbols-outlined" data-icon="logout">logout</span>
            <span className="font-body-lg text-body-lg">Logout</span>
          </Link>
        </div>
      </aside>

      <main className="w-full md:pl-[320px] min-h-screen">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-chapter-gap">

                {/* Intelligence Banner - Desktop */}
      <Link
        to="/dashboard"
        className="hidden md:flex items-center justify-between glass-panel p-4 rounded-xl border-antique-gold/20 hover:border-antique-gold/40 transition-all fade-in-1"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-stamp-red/10 border border-stamp-red/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-stamp-red text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-deep-burgundy">Dashboard</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Acompanhe sua jornada e métricas</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-antique-gold">arrow_forward</span>
        </div>
      </Link>

          <section className="flex justify-center fade-in-2">
            <div className="passport-hero w-full max-w-sm md:max-w-md mx-auto" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC43jv-enfghhbIp4lYZhHoZyGrChg6S4rabgqJ04NSxiSpyi3W5wrVAaURo6Jo1vkelliEHnkyOM4b6BrlHt40c-ak59azmVoc-FK98pQ6K6GsZ1sMtdhBFyaaYYzxesoy2OVMsMp5fOfoJIuZUIbqeWV1lELmakD6qv6VaiK3bET-06cv6ov0TeWqC309sylU9BgrA8px7ejArjwBKkU1HF-ymxPPlBmZIgyQCmPV7VKsXTgzeca1ftryYKeP-dzEww')" }}>
              <div className="passport-overlay">
                <div className="mb-4">
                  <h2 className="font-headline-lg-mobile md:font-headline-lg text-antique-gold mb-1">
                    Ana Silva
                  </h2>
                  <p className="font-metadata text-metadata text-parchment-white/80 tracking-widest">
                    ID: PC-2026
                  </p>
                </div>
                <div className="w-16 h-1 bg-antique-gold mb-4"></div>
                <p className="font-label-caps text-label-caps text-parchment-white/60 mb-2">
                  CLASSIFICADO
                </p>
                <div className="flex items-center justify-between border-t border-antique-gold/30 pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-antique-gold" data-icon="workspace_premium" data-weight="fill">workspace_premium</span>
                    <span className="font-body-sm text-parchment-white/80">Edição Diplomática</span>
                  </div>
                  <img alt="Wax Seal" className="w-12 h-12 stamp-shadow" data-alt="A highly detailed, elegant red wax seal with an intricate 'PC' monogram, indicating official diplomatic validation." src={waxSeal} />
                </div>
              </div>
            </div>
          </section>

          <section className="fade-in-3">
            <div className="flex items-end justify-between mb-4 border-b border-outline-variant pb-2">
              <h3 className="font-title-md text-title-md text-deep-burgundy">
                Próximo Destino
              </h3>
              <span className="font-metadata text-metadata text-antique-gold">
                CAPÍTULO 04
              </span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container-high rounded-bl-full -z-10 opacity-50"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                    VISITA AGENDADA
                  </p>
                  <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-deep-burgundy mb-2">
                    Manutenção do Loiro
                  </h4>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-antique-gold text-sm" data-icon="event">event</span>
                    <span className="font-metadata text-metadata">22 SET 2026</span>
                    <span className="mx-2">•</span>
                    <span className="material-symbols-outlined text-antique-gold text-sm" data-icon="schedule">schedule</span>
                    <span className="font-metadata text-metadata">14:00 - 18:00</span>
                  </div>
                </div>
                <button className="bg-deep-burgundy text-antique-gold font-label-caps text-label-caps px-6 py-3 rounded uppercase tracking-widest hover:bg-primary-container transition-colors duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
                  <span>Check-in</span>
                  <span className="material-symbols-outlined" data-icon="flight_takeoff">flight_takeoff</span>
                </button>
              </div>

              {/* Navigation Card */}
              <Link
                to="/carimbos/colecao"
                className="intel-card mt-4 p-4 bg-gradient-to-r from-stamp-red/5 to-antique-gold/5 rounded-lg border border-antique-gold/20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-stamp-red/10 border border-stamp-red/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-stamp-red">collections_bookmark</span>
                </div>
                <div className="flex-grow">
                  <p className="font-label-caps text-label-caps text-deep-burgundy">Ver Coleção de Carimbos</p>
                  <p className="font-metadata text-metadata text-outline">Todos os selos conquistados</p>
                </div>
                <span className="material-symbols-outlined text-antique-gold">arrow_forward</span>
              </Link>
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between mb-6 border-b border-outline-variant pb-2">
              <h3 className="font-title-md text-title-md text-deep-burgundy">
                Minha História
              </h3>
            </div>
            <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-antique-gold/30">
              <div className="relative">
                <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-antique-gold border-4 border-parchment-white z-10"></div>
                <div className="debossed-surface p-5 rounded-lg border border-outline-variant/50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-metadata text-metadata text-antique-gold block mb-1">15 JUL 2026</span>
                      <h5 className="font-body-lg text-body-lg font-semibold text-deep-burgundy">Reconstrução Capilar</h5>
                    </div>
                    <span className="font-headline-lg-mobile text-antique-gold/40">03</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                    Tratamento intensivo para recuperação da fibra capilar pós-química.
                  </p>
                  <div className="flex items-center justify-end">
                    <img alt="Carimbo" className="w-16 h-16 opacity-80 mix-blend-multiply" data-alt="A stylized, vintage-looking digital passport stamp in faded red ink, indicating a completed hair reconstruction service." src={stampRed} />
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-antique-gold/50 border-4 border-parchment-white z-10"></div>
                <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-metadata text-metadata text-on-surface-variant block mb-1">02 MAI 2026</span>
                      <h5 className="font-body-lg text-body-lg font-semibold text-deep-burgundy">Coloração Global</h5>
                    </div>
                    <span className="font-headline-lg-mobile text-outline-variant/40">02</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                    Aplicação de tom acobreado com nuances douradas.
                  </p>
                  <div className="flex items-center justify-end">
                    <img alt="Carimbo" className="w-16 h-16 opacity-60 mix-blend-multiply" data-alt="A stylized, vintage-looking digital passport stamp in faded black ink, indicating a completed global hair coloring service." src={stampBlack} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <nav className="bg-deep-burgundy shadow-[0_-4px_12px_rgba(0,0,0,0.15)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe md:hidden rounded-t-xl">
        <Link to="/" className="flex flex-col items-center justify-center text-antique-gold bg-primary-container/20 rounded-xl p-2 transition-all duration-200 scale-95">
          <span className="material-symbols-outlined" data-icon="menu_book" data-weight="fill">menu_book</span>
          <span className="font-label-caps text-label-caps mt-1">Passport</span>
        </Link>
        <Link to="/auditoria" className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all">
          <span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
          <span className="font-label-caps text-label-caps mt-1">History</span>
        </Link>
        <Link to="/carimbos/colecao" className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all">
          <span className="material-symbols-outlined" data-icon="collections_bookmark">collections_bookmark</span>
          <span className="font-label-caps text-label-caps mt-1">Stamps</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all">
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="font-label-caps text-label-caps mt-1">Dashboard</span>
        </Link>
      </nav>
    </div>
  );
}
