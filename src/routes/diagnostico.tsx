import { createFileRoute } from "@tanstack/react-router";

const pageCss = "\n        :root {\n            --premium-ease: cubic-bezier(0.16, 1, 0.3, 1);\n        }\n\n        body { background-color: #F9F6F0; } /* parchment-white */\n        .wax-seal-shadow { box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15); }\n        .debossed-input { border: 1px inset #e6d7d5; background-color: #F0EDE4; }\n        \n        /* 1. Selection Feedback */\n        input[type=\"radio\"].luxury-radio:checked + label {\n            background-color: #4A0E0E; /* deep-burgundy */\n            color: #C5A059; /* antique-gold */\n            border-color: #C5A059;\n            transform: scale(1.02);\n            box-shadow: 0 0 0 2px #C5A059, 0 4px 12px rgba(197, 160, 89, 0.2);\n        }\n\n        label:has(input[type=\"checkbox\"].accent-deep-burgundy:checked) {\n            transform: scale(1.02);\n            box-shadow: 0 0 0 2px #C5A059, 0 4px 12px rgba(197, 160, 89, 0.2);\n            border-color: #C5A059;\n            background-color: #fff0ef;\n        }\n\n        /* 2. Progress Indicators */\n        @keyframes fillProgress {\n            from { width: 0%; opacity: 0; }\n            to { width: 100%; opacity: 1; }\n        }\n        .progress-fill {\n            position: absolute;\n            left: 0;\n            top: 0;\n            height: 100%;\n            background-color: #C5A059;\n            animation: fillProgress 1.5s var(--premium-ease) forwards;\n            transform-origin: left;\n        }\n        \n        @keyframes softPulse {\n            0%, 100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.4); transform: scale(1); }\n            50% { box-shadow: 0 0 10px 4px rgba(197, 160, 89, 0.1); transform: scale(1.02); }\n        }\n        .stage-pulse {\n            animation: softPulse 3s infinite ease-in-out;\n        }\n\n        /* 3. Hover States */\n        .tech-option {\n            position: relative;\n            overflow: hidden;\n            transition: all 0.4s var(--premium-ease);\n        }\n        .tech-option::after {\n            content: '';\n            position: absolute;\n            top: -50%;\n            left: -50%;\n            width: 200%;\n            height: 200%;\n            background: linear-gradient(45deg, transparent 45%, rgba(197, 160, 89, 0.15) 50%, transparent 55%);\n            transform: translateX(-100%);\n            transition: transform 0.6s var(--premium-ease);\n            pointer-events: none;\n        }\n        .tech-option:hover::after {\n            transform: translateX(100%);\n        }\n        .tech-option:hover {\n            border-color: #C5A059;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n        }\n\n        /* 4. Entrance Staging */\n        @keyframes slideUpFade {\n            from { opacity: 0; transform: translateY(30px); }\n            to { opacity: 1; transform: translateY(0); }\n        }\n        .stagger-1 { animation: slideUpFade 0.8s var(--premium-ease) forwards; opacity: 0; }\n        .stagger-2 { animation: slideUpFade 0.8s var(--premium-ease) 0.15s forwards; opacity: 0; }\n        .stagger-3 { animation: slideUpFade 0.8s var(--premium-ease) 0.3s forwards; opacity: 0; }\n\n        /* 5. Button Interactivity */\n        @keyframes buttonPulse {\n            0% { box-shadow: 0 4px 12px rgba(74,14,14,0.2), 0 0 0 0 rgba(74, 14, 14, 0.4); }\n            70% { box-shadow: 0 4px 12px rgba(74,14,14,0.2), 0 0 0 8px rgba(74, 14, 14, 0); }\n            100% { box-shadow: 0 4px 12px rgba(74,14,14,0.2), 0 0 0 0 rgba(74, 14, 14, 0); }\n        }\n        .btn-validate {\n            animation: buttonPulse 2.5s infinite;\n            transition: all 0.3s var(--premium-ease);\n        }\n        .btn-validate:active {\n            transform: scale(0.96);\n            background-color: #2a0002;\n            box-shadow: inset 0 3px 6px rgba(0,0,0,0.3) !important;\n            animation: none;\n        }\n    ";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico — Passaporte Capilar™" },
      { name: "description", content: "Diagnóstico técnico completo do fio: porosidade, elasticidade e plano de tratamento." },
      { property: "og:title", content: "Diagnóstico — Passaporte Capilar™" },
      { property: "og:description", content: "Diagnóstico técnico completo do fio: porosidade, elasticidade e plano de tratamento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="font-body-lg text-on-surface bg-parchment-white antialiased selection:bg-antique-gold selection:text-deep-burgundy">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-parchment-white/80 dark:bg-ink-black/80 backdrop-blur-md border-b border-outline-variant dark:border-tertiary-container h-16 px-margin-desktop ml-64 flex justify-between items-center hidden md:flex">
        <div className="font-display-lg text-display-lg text-deep-burgundy dark:text-antique-gold tracking-tight">
          Passaporte Capilar™
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button aria-label="Notifications" className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low dark:hover:bg-inverse-surface rounded-full transition-all p-2">
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
            </button>
            <button aria-label="History" className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low dark:hover:bg-inverse-surface rounded-full transition-all p-2">
              <span className="material-symbols-outlined" data-icon="history_edu">
                history_edu
              </span>
            </button>
          </div>
          <button className="font-label-caps text-label-caps font-body-lg text-body-lg bg-deep-burgundy text-antique-gold px-6 py-2 rounded uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2">
            Modo Passaporte
          </button>
          <div className="h-8 w-8 rounded-full bg-surface-variant overflow-hidden ml-4 border border-outline-variant">
            <img alt="User Profile" className="w-full h-full object-cover" data-alt="A small, circular avatar portrait of a professional hair stylist, elegant lighting, modern studio background, high quality, professional photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuARu4rxe7gPbE6oLpCywPQH0ZJfbeuS87Aa5yrijzhHTdRuGYUHDRXcnSkH--q_hVTd_YYXociKMFToSJR44cRRS3H2HJqcjHFwTwRQc4yhkyGffdOQhWvatSr9dKGBthwuMRirgEMaKSQQV593bTUgwNKKqok5Aebnhhxi9dzGxsHHvEVFU1HymLqlSo8oY49qu14hqUv6FNsm0hhQvA2yjZk5cRS1K5OJrZj-5ZRDIgrULnRreRC8" />
          </div>
        </div>
      </header>
      <nav className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-tertiary-container bg-parchment-white dark:bg-ink-black flex flex-col py-8 px-4 z-50">
        <div className="mb-10 px-4">
          <h1 className="font-display-lg text-[32px] leading-tight text-deep-burgundy dark:text-antique-gold tracking-tight mb-1">
            Passaporte Capilar™
          </h1>
          <p className="font-metadata text-metadata text-on-surface-variant uppercase tracking-widest">
            Consul de Beleza
          </p>
        </div>
        <button className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-3 rounded mb-8 hover:bg-primary transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">
            add
          </span>
          Novo Atendimento
        </button>
        <div className="flex flex-col gap-2 flex-grow">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-lg font-title-md text-title-md" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            <span>
              Visão Geral
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold font-title-md text-title-md scale-[0.98] transition-transform duration-150 ease-in-out" href="#">
            <span className="material-symbols-outlined" data-icon="group" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
              group
            </span>
            <span>
              Clientes
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-lg font-title-md text-title-md" href="#">
            <span className="material-symbols-outlined" data-icon="style">
              style
            </span>
            <span>
              Passaportes
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-lg font-title-md text-title-md" href="#">
            <span className="material-symbols-outlined" data-icon="calendar_today">
              calendar_today
            </span>
            <span>
              Programas
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-lg font-title-md text-title-md" href="#">
            <span className="material-symbols-outlined" data-icon="auto_awesome">
              auto_awesome
            </span>
            <span>
              Brand Studio
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-lg font-title-md text-title-md" href="#">
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span>
              Configurações
            </span>
          </a>
        </div>
        <div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors font-title-md text-title-md" href="#">
            <span className="material-symbols-outlined" data-icon="help_outline">
              help_outline
            </span>
            <span>
              Suporte
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors font-title-md text-title-md" href="#">
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            <span>
              Sair
            </span>
          </a>
        </div>
      </nav>
      <main className="ml-0 md:ml-64 pt-16 md:pt-24 px-4 md:px-margin-desktop min-h-screen flex flex-col pb-24">
        <div className="mb-10 flex flex-col items-center max-w-4xl mx-auto w-full stagger-1">
          <div className="flex items-center w-full justify-between mb-4">
            <span className="font-label-caps text-label-caps text-antique-gold uppercase tracking-[0.2em]">
              Protocolo em Andamento
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              Cliente: Ana Silva
            </span>
          </div>
          <div className="w-full flex items-center gap-2 mb-6">
            <div className="flex-1 h-px bg-antique-gold/30 relative overflow-hidden">
              <div className="progress-fill"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-antique-gold"></div>
            </div>
            <div className="font-label-caps text-label-caps text-deep-burgundy px-4 py-1 border border-antique-gold/50 rounded-full bg-surface stage-pulse">
              Etapa 2 de 8: Diagnóstico
            </div>
            <div className="flex-1 h-px bg-antique-gold/30 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-antique-gold/30"></div>
            </div>
          </div>
          <h2 className="font-headline-lg md:font-display-lg text-headline-lg-mobile md:text-display-lg text-deep-burgundy text-center">
            Registro de Diagnóstico Capilar
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 text-center max-w-2xl">
            Avaliação técnica do estado atual da fibra e couro cabeludo para fundamentação do protocolo.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter max-w-7xl mx-auto w-full">
          <div className="lg:col-span-8 space-y-chapter-gap">
            <section className="bg-surface border-b border-outline-variant pb-10 relative stagger-1">
              <div className="absolute top-0 right-0 font-headline-lg text-headline-lg text-antique-gold/20 select-none">
                01
              </div>
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold" data-icon="science">
                  science
                </span>
                Análise Estrutural
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-4">
                    Nível de Porosidade
                  </label>
                  <div className="flex gap-2">
                    <input className="hidden luxury-radio" id="por-baixa" name="porosity" type="radio" />
                    <label className="tech-option flex-1 text-center py-3 border border-outline-variant rounded cursor-pointer transition-all font-body-sm text-body-sm text-on-surface hover:border-deep-burgundy" htmlFor="por-baixa">
                      Baixa (Resistente)
                    </label>
                    <input defaultChecked={true} className="hidden luxury-radio" id="por-media" name="porosity" type="radio" />
                    <label className="tech-option flex-1 text-center py-3 border border-outline-variant rounded cursor-pointer transition-all font-body-sm text-body-sm text-on-surface hover:border-deep-burgundy" htmlFor="por-media">
                      Média (Normal)
                    </label>
                    <input className="hidden luxury-radio" id="por-alta" name="porosity" type="radio" />
                    <label className="tech-option flex-1 text-center py-3 border border-outline-variant rounded cursor-pointer transition-all font-body-sm text-body-sm text-on-surface hover:border-deep-burgundy" htmlFor="por-alta">
                      Alta (Danificado)
                    </label>
                  </div>
                  <div className="mt-3 text-metadata font-metadata text-on-surface-variant">
                    Teste de mecha indica leve abertura das cutículas.
                  </div>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-4">
                    Elasticidade (Teste de Tração)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input className="hidden luxury-radio" id="elas-excelente" name="elasticity" type="radio" />
                    <label className="tech-option text-center py-3 border border-outline-variant rounded cursor-pointer transition-all font-body-sm text-body-sm text-on-surface hover:border-deep-burgundy" htmlFor="elas-excelente">
                      Excelente (Retorna)
                    </label>
                    <input defaultChecked={true} className="hidden luxury-radio" id="elas-boa" name="elasticity" type="radio" />
                    <label className="tech-option text-center py-3 border border-outline-variant rounded cursor-pointer transition-all font-body-sm text-body-sm text-on-surface hover:border-deep-burgundy" htmlFor="elas-boa">
                      Boa (Lenta)
                    </label>
                    <input className="hidden luxury-radio" id="elas-ruim" name="elasticity" type="radio" />
                    <label className="tech-option text-center py-3 border border-outline-variant rounded cursor-pointer transition-all font-body-sm text-body-sm text-on-surface hover:border-deep-burgundy" htmlFor="elas-ruim">
                      Baixa (Estica e não volta)
                    </label>
                    <input className="hidden luxury-radio" id="elas-critica" name="elasticity" type="radio" />
                    <label className="tech-option text-center py-3 border border-outline-variant rounded cursor-pointer transition-all font-body-sm text-body-sm text-on-surface hover:border-deep-burgundy" htmlFor="elas-critica">
                      Crítica (Rompe)
                    </label>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-surface border-b border-outline-variant pb-10 relative mt-12 stagger-2">
              <div className="absolute top-0 right-0 font-headline-lg text-headline-lg text-antique-gold/20 select-none">
                02
              </div>
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold" data-icon="spa">
                  spa
                </span>
                Condição do Couro Cabeludo
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="tech-option flex flex-col items-center justify-center p-4 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low transition-colors group">
                  <input defaultChecked={true} className="accent-deep-burgundy w-4 h-4 mb-3" type="checkbox" />
                  <span className="font-body-sm text-body-sm font-medium text-center group-hover:text-deep-burgundy transition-colors duration-300">
                    Normal / Saudável
                  </span>
                </label>
                <label className="tech-option flex flex-col items-center justify-center p-4 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low transition-colors group">
                  <input className="accent-deep-burgundy w-4 h-4 mb-3" type="checkbox" />
                  <span className="font-body-sm text-body-sm font-medium text-center group-hover:text-deep-burgundy transition-colors duration-300">
                    Oleoso
                  </span>
                </label>
                <label className="tech-option flex flex-col items-center justify-center p-4 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low transition-colors group">
                  <input className="accent-deep-burgundy w-4 h-4 mb-3" type="checkbox" />
                  <span className="font-body-sm text-body-sm font-medium text-center group-hover:text-deep-burgundy transition-colors duration-300">
                    Seco / Descamativo
                  </span>
                </label>
                <label className="tech-option flex flex-col items-center justify-center p-4 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low transition-colors group">
                  <input className="accent-deep-burgundy w-4 h-4 mb-3" type="checkbox" />
                  <span className="font-body-sm text-body-sm font-medium text-center group-hover:text-deep-burgundy transition-colors duration-300">
                    Sensível / Irritado
                  </span>
                </label>
              </div>
            </section>
            <section className="bg-surface pb-10 relative mt-12 stagger-3">
              <div className="absolute top-0 right-0 font-headline-lg text-headline-lg text-antique-gold/20 select-none">
                03
              </div>
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold" data-icon="edit_note">
                  edit_note
                </span>
                Observações Técnicas
              </h3>
              <div className="relative">
                <label className="sr-only" htmlFor="tech-notes">
                  Observações
                </label>
                <textarea className="w-full debossed-input p-4 rounded-md font-body-lg text-body-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-antique-gold focus:border-transparent transition-all resize-none" id="tech-notes" placeholder="Detalhes adicionais sobre histórico químico recente, incompatibilidades ou notas para a execução..." rows={4}></textarea>
                <div className="absolute bottom-3 right-3 text-metadata font-metadata text-on-surface-variant">
                  Carimbo de Registro: Dr. Thay
                </div>
              </div>
            </section>
            <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-outline-variant stagger-3">
              <button className="px-6 py-3 border border-deep-burgundy text-deep-burgundy font-label-caps text-label-caps uppercase rounded hover:bg-surface-container-low transition-colors">
                Salvar Rascunho
              </button>
              <button className="btn-validate px-8 py-3 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase rounded shadow-[0_4px_12px_rgba(74,14,14,0.2)] flex items-center gap-2 group">
                Validar Diagnóstico
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
          <aside className="lg:col-span-4 space-y-6 stagger-2">
            <div className="bg-parchment-white border border-outline-variant rounded-lg p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[150px]" data-icon="verified">
                  verified
                </span>
              </div>
              <div className="flex items-center gap-4 border-b border-outline-variant pb-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-antique-gold transition-transform duration-500 hover:scale-105">
                  <img alt="Client Photo" className="w-full h-full object-cover" data-alt="A portrait of a female client, elegant styling, neutral background, looking professional and calm, warm lighting, high quality portrait photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdLdhPR9qaflEcoAW-WBjuJFxRlur69hli_sY0pBytKp1cgZb_bSOYxWzq0nJkF4w3d1UZ8r0_7VBSi-1u4aBED4xeRtwA5vkmnXxnXfAABeTKGxNvavycRTnkNRIW2Zi-XYOejY59hGRJg31JiPY_eTFq1YLsUalWD9dteAifWFiLhLDo0A8zp8A2JRl5Ql0jMq5b8X37GZGsKoS0RUD_Z1kT266PBX7wgvtVCdezxlX_gcCg1tlh" />
                </div>
                <div>
                  <h4 className="font-headline-lg text-title-md text-deep-burgundy">
                    Ana Silva
                  </h4>
                  <p className="font-metadata text-metadata text-on-surface-variant uppercase tracking-wider">
                    ID: PC-8492-A
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
                    Última Visita
                  </span>
                  <span className="font-body-md text-body-lg text-on-surface">
                    15 Outubro 2023
                  </span>
                </div>
                <div>
                  <span className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
                    Diagnóstico Anterior
                  </span>
                  <div className="bg-surface-container-low p-3 rounded text-sm text-on-surface-variant border-l-2 border-antique-gold transition-all duration-300 hover:bg-surface-variant">
                    Porosidade: Alta
                    <br />
                    Foco: Reconstrução Profunda
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-outline-variant shadow-sm bg-surface group">
              <div className="bg-deep-burgundy text-antique-gold p-3 font-label-caps text-label-caps uppercase text-center tracking-widest border-b border-antique-gold/30">
                Referência de Estilo
              </div>
              <div className="relative h-48 w-full overflow-hidden">
                <img alt="Reference Passport Style" className="w-full h-full object-cover grayscale-[20%] sepia-[10%] opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 group-hover:sepia-0" data-alt="DO NOT PROCESS" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYd7VnnscWWyF-XwAYr42Qug7_09L_x2bqme2NLn1j82J7is8r1Oqpz2A5VOLX0q8Sgd5rRoQjVXIDEsrkbyY8mO8urVq8f32-Lm4gBoPBr4WxEcXlajG0mVtmt7Pb5gHHQGm8a1RCnuUaWMpEzbu8jfgfx2UDTYglho3qD72e0rWmVomrGqZMpz6DArYeBpkOM9Pj9hWZ_OAukJxaRubLuwkge_0Ev0eq6r3oFMHTiU_lqclesojPM3RmkGfvlmPxGw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 transition-opacity duration-300 group-hover:opacity-80">
                  <span className="text-white font-metadata text-metadata uppercase tracking-wider">
                    Inspiração Atual
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-default">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-deep-burgundy mb-2" data-icon="local_police">
                  local_police
                </span>
                <div className="font-metadata text-metadata uppercase tracking-[0.3em] text-on-surface-variant">
                  Acesso Restrito
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
