import { createFileRoute } from "@tanstack/react-router";

const pageCss = "\n        body {\n            background-color: #1A1A1A;\n            color: #F9F6F0;\n            margin: 0;\n            overflow-x: hidden;\n        }\n        .passport-texture {\n            background-image: url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/></svg>');\n            background-color: #1A1A1A;\n        }\n        .gold-accent {\n            color: #C5A059;\n        }\n        .burgundy-accent {\n            color: #4A0E0E;\n        }\n        .glass-panel {\n            background: rgba(26, 26, 26, 0.6);\n            backdrop-filter: blur(12px);\n            border: 1px solid rgba(197, 160, 89, 0.2);\n        }\n        .pulse-dot {\n            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n        }\n        @keyframes pulse {\n            0%, 100% { opacity: 1; }\n            50% { opacity: .5; }\n        }\n    ";

export const Route = createFileRoute("/_authenticated/passaporte")({
  head: () => ({
    meta: [
      { title: "Modo Passaporte — Passaporte Capilar™" },
      { name: "description", content: "Visualize sua caderneta capilar digital em modo passaporte, com selo de validação e capítulos." },
      { property: "og:title", content: "Modo Passaporte — Passaporte Capilar™" },
      { property: "og:description", content: "Visualize sua caderneta capilar digital em modo passaporte, com selo de validação e capítulos." },
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
      <header className="w-full px-margin-desktop py-8 flex justify-between items-center z-50 fixed top-0 glass-panel border-b-0 border-t-0">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-antique-gold text-3xl">
            workspace_premium
          </span>
          <div>
            <h1 className="font-display-lg text-display-lg text-antique-gold m-0 leading-none">
              MODO PASSAPORTE
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-red-500 pulse-dot"></div>
              <span className="font-label-caps text-label-caps text-parchment-white/70">
                CONEXÃO AO VIVO COM A CLIENTE
              </span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-antique-gold/50 text-antique-gold hover:bg-antique-gold/10 transition-colors font-label-caps text-label-caps uppercase">
          <span className="material-symbols-outlined text-[20px]" data-icon="close">
            close
          </span>
          Encerrar Sessão
        </button>
      </header>
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center pt-[120px] pb-12 px-margin-desktop gap-gutter max-w-[1600px] mx-auto w-full">
        <section className="flex-1 w-full max-w-full lg:max-w-[45%] flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[1/1.414] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-antique-gold/30">
            <img alt="Passaporte Capilar Cover" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACqJAZEvmJG_ckx9f7Ft6NZt8niN1kByRirDmKiBGcMBjRcwF1YVYN0hoQGzbQV-N7UtwZqjMyIJkYMEybpfa0AgkTq8m0xmuwnnTvWg9gu2AXIVEDR7kTD-e9bI_lWX8YA7BK5KRilUPkw-nv57t_zd-RwgmEmT7vd2K4JH_i1niWWmBEj7w-VrF5S7GNTeaMAhuQj2YxsXUYg-se491zowjB1rMDw9Jrz3IfHyFAs3WvcPBLg3E2sVO62Qx1zySepA" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 p-8 flex flex-col justify-between">
              <div className="self-end text-right">
                <p className="font-label-caps text-label-caps text-antique-gold mb-1">
                  ID CLIENTE
                </p>
                <p className="font-metadata text-metadata text-parchment-white/80 uppercase tracking-widest">
                  PC-2026
                </p>
              </div>
              <div>
                <h2 className="font-headline-lg text-headline-lg text-parchment-white mb-2">
                  Ana Silva
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-deep-burgundy/80 backdrop-blur-sm rounded border border-stamp-red/30">
                  <span className="material-symbols-outlined text-[16px] text-antique-gold" data-icon="verified">
                    verified
                  </span>
                  <span className="font-label-caps text-label-caps text-antique-gold">
                    Status: Em Progresso
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex-1 flex flex-col h-full gap-8">
          <div className="glass-panel p-6 rounded-xl flex-grow relative overflow-hidden group">
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-60">
              <img alt="Jornada da Rainha Board" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1NFy8gHY9Q9E9wTKIXMafxd8XAdIlDnUCVBna-XZimm75y_kK4tDnsU7fKD0AWOcfNq1_WXfDu3kCWpENT8WXldd-bC_IJVCkaJpJTsx6E4F3fOHwnW9oehx0MVApvlLDwQwHsYtAQafWzf236pxNcovmiG2DwA4xoHPFkYgVoLbnWMYxY386Ok57YwUt7a5-ObnufXffJVKFZMuOhugKbD67p-aecM5_sIFPnwlALXJspldrctQfLxWl8dHG4yFL5g" />
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-headline-lg text-headline-lg text-antique-gold uppercase tracking-widest">
                  Jornada da Rainha
                </h3>
                <span className="font-label-caps text-label-caps px-3 py-1 bg-antique-gold/20 text-antique-gold border border-antique-gold/30 rounded-full">
                  ETAPA 4 DE 6
                </span>
              </div>
              <div className="flex-grow flex items-center justify-center relative">
                <div className="w-full h-1 bg-gradient-to-r from-deep-burgundy via-antique-gold to-transparent absolute top-1/2 -translate-y-1/2 rounded-full"></div>
                <div className="w-full flex justify-between relative z-20 px-4">
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <div className="w-4 h-4 rounded-full bg-deep-burgundy border-2 border-antique-gold"></div>
                    <span className="font-metadata text-metadata text-antique-gold">
                      Diagnóstico
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <div className="w-4 h-4 rounded-full bg-deep-burgundy border-2 border-antique-gold"></div>
                    <span className="font-metadata text-metadata text-antique-gold">
                      Hidratação
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <div className="w-4 h-4 rounded-full bg-deep-burgundy border-2 border-antique-gold"></div>
                    <span className="font-metadata text-metadata text-antique-gold">
                      Nutrição
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 transform scale-125">
                    <div className="w-6 h-6 rounded-full bg-antique-gold shadow-[0_0_15px_rgba(197,160,89,0.5)] flex items-center justify-center">
                      <div className="w-2 h-2 bg-ink-black rounded-full"></div>
                    </div>
                    <span className="font-label-caps text-label-caps text-parchment-white font-bold mt-1">
                      Reconstrução
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <div className="w-4 h-4 rounded-full bg-ink-black border-2 border-outline-variant"></div>
                    <span className="font-metadata text-metadata text-outline-variant">
                      Selagem
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <div className="w-4 h-4 rounded-full bg-ink-black border-2 border-outline-variant"></div>
                    <span className="font-metadata text-metadata text-outline-variant">
                      Finalização
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-xl relative">
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-antique-gold/30 opacity-50 rounded-tr-xl m-2"></div>
            <h4 className="font-label-caps text-label-caps text-parchment-white/60 mb-2 uppercase">
              Capítulo Atual
            </h4>
            <div className="flex justify-between items-start border-b border-antique-gold/20 pb-6 mb-6">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-parchment-white mb-2">
                  Manutenção do Loiro
                </h2>
                <p className="font-body-sm text-body-sm text-parchment-white/70 max-w-md">
                  Tratamento reconstrutivo profundo com infusão de lipídios e neutralização de tons quentes, preparando a base para a próxima selagem.
                </p>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-label-caps text-antique-gold block mb-1">
                  Data
                </span>
                <span className="font-title-md text-title-md text-parchment-white">
                  24 Nov 2023
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <span className="font-label-caps text-label-caps text-parchment-white/50 block mb-2">
                  Fórmula Aplicada
                </span>
                <div className="font-metadata text-metadata text-parchment-white bg-ink-black/50 p-3 border border-antique-gold/10 rounded">
                  RC-Complex + Tonalizante Frio (10g)
                  <br />
                  Tempo de Pausa: 25 min
                </div>
              </div>
              <div className="flex items-center justify-end pr-4">
                <button className="flex flex-col items-center gap-2 group transition-transform hover:scale-105">
                  <div className="w-20 h-20 rounded-full bg-stamp-red flex items-center justify-center shadow-[0_4px_12px_rgba(139,0,0,0.4)] border-2 border-deep-burgundy relative overflow-hidden">
                    <span className="material-symbols-outlined text-parchment-white text-3xl opacity-80 group-hover:opacity-100 transition-opacity" data-icon="fingerprint">
                      fingerprint
                    </span>
                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
                  </div>
                  <span className="font-label-caps text-label-caps text-antique-gold group-hover:text-parchment-white transition-colors">
                    Validar & Carimbar
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
