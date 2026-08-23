import { createFileRoute } from "@tanstack/react-router";

const pageCss = "\n        body {\n            background-color: #F9F6F0;\n            color: #221a19;\n        }\n        .stamp-shadow {\n            filter: drop-shadow(0 4px 12px rgba(139, 0, 0, 0.15));\n        }\n        .inset-shadow {\n            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);\n        }\n        .glass-panel {\n            background: rgba(249, 246, 240, 0.7);\n            backdrop-filter: blur(12px);\n            -webkit-backdrop-filter: blur(12px);\n            border: 1px solid rgba(197, 160, 89, 0.2);\n        }\n    ";

export const Route = createFileRoute("/brand-studio")({
  head: () => ({
    meta: [
      { title: "Brand Studio — Passaporte Capilar™" },
      { name: "description", content: "Identidade visual, tipografia e componentes do sistema de design Passaporte Capilar." },
      { property: "og:title", content: "Brand Studio — Passaporte Capilar™" },
      { property: "og:description", content: "Identidade visual, tipografia e componentes do sistema de design Passaporte Capilar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="antialiased min-h-screen flex font-body-lg text-body-lg">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white z-50 py-8 px-4">
        <div className="mb-12 px-4">
          <h1 className="font-display-lg text-display-lg text-deep-burgundy tracking-tight">
            Passaporte Capilar™
          </h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-2">
            Consul de Beleza
          </p>
        </div>
        <button className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-3 rounded-DEFAULT mb-8 hover:bg-primary transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">
            add
          </span>
          Novo Atendimento
        </button>
        <ul className="flex-1 space-y-2">
          <li>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">
                dashboard
              </span>
              <span className="font-title-md text-title-md">
                Visão Geral
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">
                group
              </span>
              <span className="font-title-md text-title-md">
                Clientes
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">
                style
              </span>
              <span className="font-title-md text-title-md">
                Passaportes
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">
                calendar_today
              </span>
              <span className="font-title-md text-title-md">
                Programas
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <span className="font-title-md text-title-md">
                Brand Studio
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">
                settings
              </span>
              <span className="font-title-md text-title-md">
                Configurações
              </span>
            </a>
          </li>
        </ul>
        <div className="mt-auto border-t border-outline-variant pt-4">
          <ul className="space-y-2">
            <li>
              <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high rounded-lg transition-all" href="#">
                <span className="material-symbols-outlined">
                  help_outline
                </span>
                <span className="font-title-md text-title-md">
                  Suporte
                </span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high rounded-lg transition-all" href="#">
                <span className="material-symbols-outlined">
                  logout
                </span>
                <span className="font-title-md text-title-md">
                  Sair
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <header className="hidden md:flex fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-parchment-white/80 backdrop-blur-md border-b border-outline-variant h-16 px-margin-desktop justify-between items-center">
        <div className="flex items-center gap-4"></div>
        <div className="flex items-center gap-6">
          <button className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low p-2 rounded-full transition-all">
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>
          <button className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low p-2 rounded-full transition-all">
            <span className="material-symbols-outlined">
              history_edu
            </span>
          </button>
          <button className="font-label-caps text-label-caps text-deep-burgundy border border-deep-burgundy px-4 py-2 rounded-DEFAULT hover:bg-surface-container-low transition-colors">
            Modo Passaporte
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <img alt="User Profile" className="w-full h-full object-cover" data-alt="A small, circular avatar portrait of a sophisticated female beauty professional with dark hair, soft studio lighting, high fashion photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC10PSN-nZejPUN8ovRRbIpHbFQDECJzTMSm8MMCvzWqTOd0Ny0QqfWmwUEiwhPFaEBhAeGBkqC0HOc-nzXra2T4_IzVYKtEanub13lcQvlyVhjzu7xe_9BM2cxTVidCPLcbiWwJ3S1R4qOWbxgvPXpWrYQaVgTQ_KoE9cUO8bLG45Uat0XTCNUQbuM6UQ8RaaFTXgkYUkP0C-uSo-_eKnbqD-vG64HwV1dZ-tyrUD1JNGgmhBmrH-1" />
          </div>
        </div>
      </header>
      <main className="w-full md:ml-64 pt-16 md:pt-24 px-margin-mobile md:px-margin-desktop pb-24 min-h-screen">
        <div className="mb-12">
          <h2 className="font-headline-lg text-headline-lg text-deep-burgundy mb-2">
            Brand Studio
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Personalize a experiência da sua edição proprietária
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-chapter-gap">
            <section className="bg-surface-container-lowest border-b border-outline-variant pb-8 p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-title-md text-title-md text-on-surface">
                  01. Identidade Visual
                </h3>
                <span className="font-headline-lg text-headline-lg text-antique-gold opacity-50">
                  01
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    Logo Profissional
                  </label>
                  <div className="border border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center bg-surface-dim hover:bg-surface-container-high transition-colors cursor-pointer group h-32 inset-shadow">
                    <span className="material-symbols-outlined text-outline group-hover:text-deep-burgundy mb-2">
                      upload_file
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-center">
                      SVG ou PNG
                      <br />
                      Max 2MB
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    Foto de Perfil
                  </label>
                  <div className="border border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center bg-surface-dim hover:bg-surface-container-high transition-colors cursor-pointer group h-32 inset-shadow">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest mb-2 flex items-center justify-center overflow-hidden">
                      <span className="material-symbols-outlined text-outline group-hover:text-deep-burgundy">
                        add_a_photo
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-center">
                      Alta Resolução
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    Assinatura Digital
                  </label>
                  <div className="border border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center bg-surface-dim hover:bg-surface-container-high transition-colors cursor-pointer group h-32 inset-shadow">
                    <span className="material-symbols-outlined text-outline group-hover:text-deep-burgundy mb-2">
                      draw
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-center">
                      Fundo Transparente
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-surface-container-lowest border-b border-outline-variant pb-8 p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-title-md text-title-md text-on-surface">
                  02. Paleta de Cores
                </h3>
                <span className="font-headline-lg text-headline-lg text-antique-gold opacity-50">
                  02
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-3">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    Primária (Burgundy)
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg bg-surface inset-shadow">
                    <div className="w-8 h-8 rounded-full bg-deep-burgundy shadow-inner border border-black/10"></div>
                    <span className="font-metadata text-metadata text-on-surface uppercase">
                      #4A0E0E
                    </span>
                    <button className="ml-auto text-on-surface-variant hover:text-deep-burgundy">
                      <span className="material-symbols-outlined text-[18px]">
                        colorize
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    Secundária (Gold)
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg bg-surface inset-shadow">
                    <div className="w-8 h-8 rounded-full bg-antique-gold shadow-inner border border-black/10"></div>
                    <span className="font-metadata text-metadata text-on-surface uppercase">
                      #C5A059
                    </span>
                    <button className="ml-auto text-on-surface-variant hover:text-deep-burgundy">
                      <span className="material-symbols-outlined text-[18px]">
                        colorize
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    Fundo (Parchment)
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg bg-surface inset-shadow">
                    <div className="w-8 h-8 rounded-full bg-parchment-white shadow-inner border border-black/10"></div>
                    <span className="font-metadata text-metadata text-on-surface uppercase">
                      #F9F6F0
                    </span>
                    <button className="ml-auto text-on-surface-variant hover:text-deep-burgundy">
                      <span className="material-symbols-outlined text-[18px]">
                        colorize
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-surface-container-lowest border-b border-outline-variant pb-8 p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-title-md text-title-md text-on-surface">
                  03. Presets de Estilo
                </h3>
                <span className="font-headline-lg text-headline-lg text-antique-gold opacity-50">
                  03
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-full aspect-[3/4] rounded-lg border-2 border-antique-gold p-2 bg-deep-burgundy flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="w-8 h-8 rounded-full border border-antique-gold/50 mb-2"></div>
                    <div className="w-12 h-1 bg-antique-gold/50 rounded-full mb-1"></div>
                    <div className="w-8 h-1 bg-antique-gold/30 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <span className="material-symbols-outlined text-antique-gold text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  </div>
                  <span className="font-label-caps text-label-caps text-deep-burgundy font-bold">
                    Luxury
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-full aspect-[3/4] rounded-lg border border-outline-variant p-2 bg-white flex flex-col items-center justify-center hover:border-antique-gold transition-colors">
                    <div className="w-8 h-8 bg-gray-100 mb-2"></div>
                    <div className="w-12 h-1 bg-gray-300 rounded-full mb-1"></div>
                    <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-deep-burgundy transition-colors">
                    Minimal
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-full aspect-[3/4] rounded-lg border border-outline-variant p-2 bg-[#F4F4F4] flex flex-col items-start justify-center hover:border-antique-gold transition-colors">
                    <div className="w-full h-12 bg-gray-300 mb-2"></div>
                    <div className="w-3/4 h-1 bg-gray-400 mb-1"></div>
                    <div className="w-1/2 h-1 bg-gray-400"></div>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-deep-burgundy transition-colors">
                    Editorial
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-full aspect-[3/4] rounded-lg border border-outline-variant p-2 bg-[#EAE6DF] flex flex-col items-center justify-center hover:border-antique-gold transition-colors">
                    <div className="w-10 h-10 border-2 border-[#8B7355] rounded-full mb-2"></div>
                    <div className="w-10 h-[2px] bg-[#8B7355] mb-1"></div>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-deep-burgundy transition-colors">
                    Classic
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-full aspect-[3/4] rounded-lg border border-outline-variant p-2 bg-[#1A1A1A] flex flex-col items-start justify-end hover:border-antique-gold transition-colors">
                    <div className="w-full h-8 bg-white/10 rounded-sm mb-2"></div>
                    <div className="w-8 h-8 bg-[#00FFcc]/20 rounded-full"></div>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-deep-burgundy transition-colors">
                    Modern
                  </span>
                </div>
              </div>
            </section>
            <div className="flex justify-end pt-4">
              <button className="bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-4 px-8 rounded-DEFAULT hover:bg-primary transition-all shadow-md flex items-center gap-2 stamp-shadow">
                <span className="material-symbols-outlined">
                  publish
                </span>
                Publicar Identidade
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-surface-container-highest border border-outline-variant rounded-xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%234A0E0E\\' fillOpacity=\\'0.4\\' fillRule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="font-display-lg text-[24px] leading-tight text-deep-burgundy">
                  Preview da Experiência
                </h3>
                <div className="flex bg-surface rounded-lg p-1 border border-outline-variant">
                  <button className="p-1.5 rounded-md bg-surface-container-high text-deep-burgundy shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      smartphone
                    </span>
                  </button>
                  <button className="p-1.5 rounded-md text-on-surface-variant hover:text-deep-burgundy">
                    <span className="material-symbols-outlined text-[18px]">
                      desktop_windows
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative mx-auto w-[280px] h-[580px] bg-black rounded-[2.5rem] border-[8px] border-black overflow-hidden shadow-2xl flex flex-col z-10">
                <div className="absolute top-0 inset-x-0 h-6 bg-black z-30 rounded-b-xl w-32 mx-auto"></div>
                <div className="flex-1 bg-deep-burgundy relative overflow-hidden flex flex-col items-center justify-start pt-12 pb-8 px-6 text-center">
                  <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" data-alt="A subtle, dark, rich leather texture, slightly distressed, suitable for a book cover background, dimly lit, highly detailed macro photography." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaOjb-b8d9pPEMP8BhAD598RFyTNgRYAqcm6LEOJ67gEyqkKTLXWheONSff-6DowtPkoYBN3dfyt3jgW7iB7om1wTft26fB_Mlw0xUZOmLEk7FgkKrK9X1hzgGch6XtG7IzzbspgG1cOL2iLG6YEh-wdEz3df4X0beAdzCzlVtgdD4Y29LOQpRKRi84muzetWiraRJgxYcv224DCqmDbTduYrNn85_3kqiHHyjVqRQoWtHQkPBu38z')" }}></div>
                  <div className="relative z-20 w-full flex justify-between items-center mb-8 border-b border-antique-gold/30 pb-4">
                    <span className="material-symbols-outlined text-antique-gold opacity-70">
                      menu
                    </span>
                    <h4 className="font-display-lg text-[16px] text-antique-gold tracking-widest uppercase">
                      Passaporte Capilar™
                    </h4>
                    <span className="material-symbols-outlined text-antique-gold opacity-70">
                      account_circle
                    </span>
                  </div>
                  <div className="relative z-20 w-32 h-32 rounded-full border-2 border-antique-gold p-1 mb-6 mt-4 stamp-shadow">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img alt="Reference Cover" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqmcGj2TZdczxRZknccMQiQ8HMsm6V8ziJ1HXW4lMr0tuYp_Nr-XyOK5ffbtYSh4LbEjh91w1MpTvPz1PDZdZDf-RcHQAgr5MmPr11UVMhk8SegbsrZEN64q-MIr3ZfxX82hgrUSt4oKnUTv1XH0r2NcxwqFxAkrx-nNLhfItabfb7tXGxWQL2HM3eQoJpE_fJRQh4_PLVcup6fC6LuqC2F_9zNAN2ISrGhT5dWfDhsvlFWrCguSmuijqsyPKwSdnunA" />
                    </div>
                    <div className="absolute -bottom-4 right-0 w-12 h-12 bg-stamp-red rounded-full flex items-center justify-center border-2 border-[#5c0000] stamp-shadow">
                      <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    </div>
                  </div>
                  <h5 className="font-display-lg text-[22px] text-antique-gold mb-1 relative z-20">
                    Thayna Rodrigues
                  </h5>
                  <p className="font-label-caps text-label-caps text-parchment-white opacity-80 relative z-20 tracking-widest">
                    Edição Diplomática
                  </p>
                  <div className="mt-auto relative z-20 w-full glass-panel py-3 px-4 rounded-sm flex justify-between items-center">
                    <span className="font-label-caps text-[10px] text-deep-burgundy font-bold">
                      ID: PC-2026
                    </span>
                    <span className="font-label-caps text-[10px] text-deep-burgundy">
                      CLASSIFICADO
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-2 inset-x-0 flex justify-center z-30">
                  <div className="w-1/3 h-1 bg-white/50 rounded-full"></div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Visualização baseada no preset
                  <strong>
                    Luxury
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
