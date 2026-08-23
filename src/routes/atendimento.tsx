import { createFileRoute } from "@tanstack/react-router";

const pageCss = "\n        .material-symbols-outlined {\n            font-family: 'Material Symbols Outlined';\n            font-weight: normal;\n            font-style: normal;\n            font-size: 24px;\n            line-height: 1;\n            letter-spacing: normal;\n            text-transform: none;\n            display: inline-block;\n            white-space: nowrap;\n            word-wrap: normal;\n            direction: ltr;\n            font-feature-settings: 'liga';\n            -webkit-font-smoothing: antialiased;\n        }\n        \n        .inset-shadow {\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);\n        }\n        \n        .wax-seal-shadow {\n            box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15);\n        }\n\n        /* Custom Scrollbar */\n        ::-webkit-scrollbar {\n            width: 6px;\n            height: 6px;\n        }\n        ::-webkit-scrollbar-track {\n            background: transparent;\n        }\n        ::-webkit-scrollbar-thumb {\n            background: #dac1bf;\n            border-radius: 4px;\n        }\n        ::-webkit-scrollbar-thumb:hover {\n            background: #877270;\n        }\n    ";

export const Route = createFileRoute("/atendimento")({
  head: () => ({
    meta: [
      { title: "Atendimento — Passaporte Capilar™" },
      { name: "description", content: "Registro do atendimento em andamento com serviços, produtos e assinatura do capítulo." },
      { property: "og:title", content: "Atendimento — Passaporte Capilar™" },
      { property: "og:description", content: "Registro do atendimento em andamento com serviços, produtos e assinatura do capítulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex font-body-lg">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white py-8 px-4 z-50">
        <div className="mb-12 px-4">
          <h1 className="font-display-lg text-[32px] text-deep-burgundy tracking-tight leading-none mb-1">
            Passaporte Capilar™
          </h1>
          <p className="font-label-caps text-label-caps text-antique-gold">
            Consul de Beleza
          </p>
        </div>
        <button className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps py-4 uppercase mb-8 hover:bg-opacity-90 transition-all rounded">
          Novo Atendimento
        </button>
        <div className="flex flex-col gap-2 flex-grow">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            <span className="font-title-md text-body-lg">
              Visão Geral
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="group">
              group
            </span>
            <span className="font-title-md text-body-lg">
              Clientes
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="style">
              style
            </span>
            <span className="font-title-md text-body-lg">
              Passaportes
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold" href="#">
            <span className="material-symbols-outlined" data-icon="calendar_today" style={{ fontVariationSettings: "'FILL' 1" }}>
              calendar_today
            </span>
            <span className="font-title-md text-body-lg">
              Programas
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="auto_awesome">
              auto_awesome
            </span>
            <span className="font-title-md text-body-lg">
              Brand Studio
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span className="font-title-md text-body-lg">
              Configurações
            </span>
          </a>
        </div>
        <div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors" href="#">
            <span className="material-symbols-outlined" data-icon="help_outline">
              help_outline
            </span>
            <span className="font-title-md text-body-sm">
              Suporte
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors" href="#">
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            <span className="font-title-md text-body-sm">
              Sair
            </span>
          </a>
        </div>
      </nav>
      <main className="flex-1 md:ml-64 bg-surface min-h-screen relative pt-16">
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 flex justify-between items-center h-16 px-4 md:px-margin-desktop bg-parchment-white/80 backdrop-blur-md border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              Protocolo em Andamento
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <span className="text-deep-burgundy font-bold">
                Atendimento
              </span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <button className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low rounded-full p-2 transition-all">
                <span className="material-symbols-outlined" data-icon="notifications">
                  notifications
                </span>
              </button>
              <button className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low rounded-full p-2 transition-all">
                <span className="material-symbols-outlined" data-icon="history_edu">
                  history_edu
                </span>
              </button>
            </div>
            <button className="border border-deep-burgundy text-deep-burgundy font-label-caps text-label-caps px-4 py-2 uppercase tracking-widest hover:bg-deep-burgundy hover:text-antique-gold transition-colors">
              Modo Passaporte
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
              <img alt="User Profile" className="w-full h-full object-cover" data-alt="A macro shot of a sleek, minimalist digital profile avatar graphic featuring a subtle monogram on a soft parchment texture background, bathed in warm, high-end editorial lighting, luxury minimalist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPcXFALkq2nZWjpdECELR5cEQLZvEIS1NzBCmrgZs4AhwBmqD1qb1TnqOm0hj6jibUkxjhtfKlFx2w7z5c-4EWQNIHQDYFjuuEE34-fUmpcyEKcp7GrW1TH8btRncxp7belbzf3iVOTCb51R84U58NaEG3fiN4QO-wXALPpbYbQwOAKKe2wyYKH7PkVJpjPrTcLPuGst4ALsT87BQjSMNAWbj0cP01iUwoOmjxSNUj7CROJRK9m-aM" />
            </div>
          </div>
        </header>
        <div className="px-4 md:px-margin-desktop py-12 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-8 space-y-chapter-gap">
              <section className="border-b border-outline-variant pb-8 relative">
                <div className="absolute top-0 right-0 font-display-lg text-headline-lg text-antique-gold opacity-50">
                  01
                </div>
                <h2 className="font-headline-lg text-headline-lg text-deep-burgundy mb-8">
                  Laboratório de Fórmula
                </h2>
                <div className="bg-parchment-white border border-outline-variant rounded-sm p-8 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6 border-r border-outline-variant pr-8">
                      <div>
                        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                          Base de Tratamento
                        </label>
                        <div className="relative inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3">
                          <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-metadata text-body-sm text-deep-burgundy outline-none appearance-none">
                            <option>
                              Máscara de Reconstrução Intensa - Lote A4
                            </option>
                            <option>
                              Máscara de Nutrição Profunda
                            </option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                          Aditivos Ativos (Ampolas)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <span className="bg-secondary-container text-on-secondary-container font-metadata text-metadata px-2 py-1 rounded-sm border border-antique-gold/30 flex items-center gap-1">
                            Queratina
                            <button>
                              <span className="material-symbols-outlined text-[12px]">
                                close
                              </span>
                            </button>
                          </span>
                          <span className="bg-secondary-container text-on-secondary-container font-metadata text-metadata px-2 py-1 rounded-sm border border-antique-gold/30 flex items-center gap-1">
                            Pantenol
                            <button>
                              <span className="material-symbols-outlined text-[12px]">
                                close
                              </span>
                            </button>
                          </span>
                        </div>
                        <div className="relative inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3 flex items-center">
                          <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-metadata text-body-sm outline-none placeholder:text-outline-variant" placeholder="Adicionar ativo..." type="text" />
                          <span className="material-symbols-outlined text-outline-variant">
                            add
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                          Proporção (Base : Ativo)
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3 text-center">
                            <span className="font-metadata text-title-md text-deep-burgundy">
                              1
                            </span>
                          </div>
                          <span className="font-display-lg text-title-md text-antique-gold">
                            :
                          </span>
                          <div className="flex-1 inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3 text-center">
                            <span className="font-metadata text-title-md text-deep-burgundy">
                              1.5
                            </span>
                          </div>
                        </div>
                        <p className="font-metadata text-metadata text-outline-variant mt-2 text-right">
                          Gramas por aplicação recomendada: 30g
                        </p>
                      </div>
                      <div>
                        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                          Tempo de Pausa Previsto
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3 flex-1 flex justify-between items-center">
                            <input className="w-16 bg-transparent border-none p-0 focus:ring-0 font-metadata text-title-md text-deep-burgundy outline-none text-right" type="number" value="20" />
                            <span className="font-metadata text-body-sm text-outline-variant ml-2">
                              minutos
                            </span>
                          </div>
                          <button className="p-3 border border-outline-variant rounded-sm hover:bg-surface-container-low text-deep-burgundy transition-colors">
                            <span className="material-symbols-outlined">
                              timer
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="border-b border-outline-variant pb-8 relative">
                <div className="absolute top-0 right-0 font-display-lg text-headline-lg text-antique-gold opacity-50">
                  02
                </div>
                <h2 className="font-headline-lg text-headline-lg text-deep-burgundy mb-8">
                  Protocolo de Aplicação
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 border border-outline-variant bg-surface-container-lowest rounded-sm group-hover:border-deep-burgundy transition-colors">
                        <input defaultChecked={true} className="opacity-0 absolute w-full h-full cursor-pointer peer" type="checkbox" />
                        <span className="material-symbols-outlined text-[16px] text-deep-burgundy opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                          check
                        </span>
                      </div>
                      <div>
                        <span className="block font-title-md text-body-lg text-on-surface">
                          Aplicação em cabelo úmido
                        </span>
                        <span className="block font-metadata text-metadata text-on-surface-variant mt-1">
                          Umidificação em 30% recomendada
                        </span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 border border-outline-variant bg-surface-container-lowest rounded-sm group-hover:border-deep-burgundy transition-colors">
                        <input className="opacity-0 absolute w-full h-full cursor-pointer peer" type="checkbox" />
                        <span className="material-symbols-outlined text-[16px] text-deep-burgundy opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                          check
                        </span>
                      </div>
                      <div>
                        <span className="block font-title-md text-body-lg text-on-surface">
                          Massagem Capilar (Enluvamento)
                        </span>
                        <span className="block font-metadata text-metadata text-on-surface-variant mt-1">
                          Mecha a mecha, fricção média
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 border border-outline-variant bg-surface-container-lowest rounded-sm group-hover:border-deep-burgundy transition-colors">
                        <input className="opacity-0 absolute w-full h-full cursor-pointer peer" type="checkbox" />
                        <span className="material-symbols-outlined text-[16px] text-deep-burgundy opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                          check
                        </span>
                      </div>
                      <div>
                        <span className="block font-title-md text-body-lg text-on-surface">
                          Fonte de Calor Utilizada
                        </span>
                        <span className="block font-metadata text-metadata text-on-surface-variant mt-1">
                          Vaporizador de Ozônio (10 min)
                        </span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 border border-outline-variant bg-surface-container-lowest rounded-sm group-hover:border-deep-burgundy transition-colors">
                        <input className="opacity-0 absolute w-full h-full cursor-pointer peer" type="checkbox" />
                        <span className="material-symbols-outlined text-[16px] text-deep-burgundy opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                          check
                        </span>
                      </div>
                      <div>
                        <span className="block font-title-md text-body-lg text-on-surface">
                          Blindagem Térmica Final
                        </span>
                        <span className="block font-metadata text-metadata text-on-surface-variant mt-1">
                          Leave-in com proteção UV
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </section>
            </div>
            <aside className="lg:col-span-4 space-y-8 sticky top-24">
              <div className="bg-parchment-white border border-outline-variant p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6 border-b border-outline-variant pb-4">
                  <div>
                    <h3 className="font-label-caps text-label-caps text-antique-gold uppercase tracking-widest mb-1">
                      Cliente Ativo
                    </h3>
                    <p className="font-display-lg text-title-md text-deep-burgundy">
                      Ana Silva
                    </p>
                    <p className="font-metadata text-metadata text-on-surface-variant mt-1">
                      ID: PC-2024-892
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-outline-variant">
                    <img alt="Client Image" className="w-full h-full object-cover" data-alt="A portrait of a confident woman with healthy, glowing skin and textured hair, shot in soft, natural window light with a neutral parchment background, high fashion editorial style, warm tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbaeiCTwzDymnBgrQP2ZtebU1GUk-ken_moHKS7F0YiHGN543JVyVjIbjMgFo8akEQHgF7yz7Kdz_HnPx8PzOWR_aZ-dPSyCrfI-BNvX_fsAAnFR4mW9CUgWwkB2t1mdvuTceRzvge1AMUqga2HRk-7PiS52OsHwaPh4OjemGbxShQ_QqxUNep99F9Lc_CHROaSrhvmwLWt0EnJ34P7LaPIPFNyg8wEzfEWb0QcqnwD5sjWCH0F6P0" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest border-l-2 border-deep-burgundy pl-2">
                    Diagnóstico Validado
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-lowest p-3 border border-outline-variant rounded-sm text-center">
                      <span className="block font-metadata text-metadata text-on-surface-variant uppercase">
                        Porosidade
                      </span>
                      <span className="block font-title-md text-body-lg text-deep-burgundy mt-1">
                        Alta
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest p-3 border border-outline-variant rounded-sm text-center">
                      <span className="block font-metadata text-metadata text-on-surface-variant uppercase">
                        Elasticidade
                      </span>
                      <span className="block font-title-md text-body-lg text-deep-burgundy mt-1">
                        Boa
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest p-3 border border-outline-variant rounded-sm text-center col-span-2">
                      <span className="block font-metadata text-metadata text-on-surface-variant uppercase">
                        Foco Principal
                      </span>
                      <span className="block font-title-md text-body-lg text-deep-burgundy mt-1">
                        Reposição Lipídica
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-ink-black text-parchment-white p-6 rounded-sm text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #1a1a1a 25%, #1a1a1a 75%, #000 75%, #000)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }}></div>
                <h4 className="font-label-caps text-label-caps text-antique-gold uppercase tracking-widest mb-4 relative z-10">
                  Tempo de Sessão
                </h4>
                <div className="font-display-lg text-[48px] font-light tracking-wider relative z-10 text-surface">
                  12:45
                </div>
                <div className="flex justify-center gap-2 mt-4 relative z-10">
                  <span className="w-2 h-2 rounded-full bg-antique-gold animate-pulse"></span>
                  <span className="font-metadata text-metadata text-outline-variant uppercase">
                    Em andamento
                  </span>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-outline-variant">
                <button className="w-full flex items-center justify-center gap-2 border border-deep-burgundy text-deep-burgundy font-label-caps text-label-caps px-4 py-4 uppercase tracking-widest hover:bg-surface-container-low transition-colors rounded-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    edit_note
                  </span>
                  Adicionar Obs Técnica
                </button>
                <button className="w-full flex items-center justify-center gap-3 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps px-4 py-5 uppercase tracking-widest hover:bg-opacity-95 transition-all rounded-sm shadow-md group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="material-symbols-outlined text-[20px]">
                    task_alt
                  </span>
                  Finalizar Execução
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{ __html: "\n        @keyframes shimmer {\n            100% { transform: translateX(100%); }\n        }\n    " }} />
    </div>
  );
}
