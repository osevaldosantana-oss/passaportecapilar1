import { createFileRoute } from "@tanstack/react-router";

const pageCss = "";

export const Route = createFileRoute("/_authenticated/chapter-loop")({
  head: () => ({
    meta: [
      { title: "Chapter Loop — Passaporte Capilar™" },
      { name: "description", content: "Fechamento do capítulo e programação do próximo destino da jornada da cliente." },
      { property: "og:title", content: "Chapter Loop — Passaporte Capilar™" },
      { property: "og:description", content: "Fechamento do capítulo e programação do próximo destino da jornada da cliente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-parchment-white text-on-surface antialiased min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <nav className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 border-b border-outline-variant bg-parchment-white/80 backdrop-blur-md hidden md:flex">
        <div className="flex justify-between items-center h-16 px-margin-desktop w-full">
          <div className="flex items-center"></div>
          <div className="font-display-lg text-display-lg text-deep-burgundy tracking-tight absolute left-1/2 -translate-x-1/2">
            Passaporte Capilar™
          </div>
          <div className="flex items-center gap-6">
            <button className="text-deep-burgundy hover:bg-surface-container-low rounded-full transition-all p-2 flex items-center justify-center">
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
            </button>
            <button className="text-deep-burgundy hover:bg-surface-container-low rounded-full transition-all p-2 flex items-center justify-center">
              <span className="material-symbols-outlined" data-icon="history_edu">
                history_edu
              </span>
            </button>
            <button className="bg-deep-burgundy text-antique-gold px-6 py-2 rounded-full font-label-caps text-label-caps uppercase hover:bg-primary transition-colors">
              Modo Passaporte
            </button>
            <img alt="User Profile" className="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A small circular profile picture of a professional stylist, warm lighting, elegant setting, luxury salon background, soft focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJcuxCp3RYunInT6PdbWSUWOhP_46Rd9JaP70e16tEF0CuUJthGulVhEGz6JCSd6r5oJrZwhh9KBGOSvOc-1feJz6etXJapalAR6fcMjCyE8rihRF7sf63tPsYHzji5kQP85vzSbzW8r1FigEV3xBrEDr0rwTfrHutBNUFHYYzLHOanxlLZbQRD9PknUngGiiv59rsDxZjZY_O4WYJnhr0pBtuUWdYaTCtvaiTOU5nAqHuP2DxsO_r" />
          </div>
        </div>
      </nav>
      <aside className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white hidden md:flex">
        <div className="flex flex-col h-full py-8 px-4 w-full">
          <div className="mb-10 text-center px-4">
            <img alt="Professional Stylist Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-antique-gold p-0.5" data-alt="A detailed, professional avatar for a beauty consul, elegant styling, sophisticated makeup, neutral soft background, luxury lighting, high resolution." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs2XpjW5f8a3AK9jJhKcSqz1q1XoV5xGWBioS7ujkPcBD35dxcSPv6LViRePgUFpHlvK74CutYWE_84V0WNEkjGxYXUFYcNni7uEfo0SA3qyl8A-nvE3Qww1IcAdUEqG0WILoPrNhtxUF-uTVUK9mE2W8L_YXi1Ty2Et-R_2psCg4k-feQpwpRgs8BgkZwyNswo1cNn7qFRPIoUSOPh3hZbPbNFuTOqO3CZA9nf3FetSU-36B4cuDK" />
            <h2 className="font-display-lg text-display-lg text-deep-burgundy tracking-tight text-xl leading-none mb-1">
              Passaporte Capilar™
            </h2>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px]">
              Consul de Beleza
            </p>
          </div>
          <nav className="flex-1 space-y-2">
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
              <span className="material-symbols-outlined" data-icon="dashboard">
                dashboard
              </span>
              <span className="font-title-md text-title-md text-base">
                Visão Geral
              </span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
              <span className="material-symbols-outlined" data-icon="group">
                group
              </span>
              <span className="font-title-md text-title-md text-base">
                Clientes
              </span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold scale-[0.98] transition-transform duration-150 ease-in-out" href="#">
              <span className="material-symbols-outlined" data-icon="style" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                style
              </span>
              <span className="font-title-md text-title-md text-base">
                Passaportes
              </span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
              <span className="material-symbols-outlined" data-icon="calendar_today">
                calendar_today
              </span>
              <span className="font-title-md text-title-md text-base">
                Programas
              </span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
              <span className="material-symbols-outlined" data-icon="auto_awesome">
                auto_awesome
              </span>
              <span className="font-title-md text-title-md text-base">
                Brand Studio
              </span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
              <span className="material-symbols-outlined" data-icon="settings">
                settings
              </span>
              <span className="font-title-md text-title-md text-base">
                Configurações
              </span>
            </a>
          </nav>
          <div className="mt-auto pt-6 border-t border-outline-variant space-y-4">
            <button className="w-full bg-deep-burgundy text-antique-gold py-3 rounded border border-transparent font-label-caps text-label-caps uppercase hover:bg-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">
                add
              </span>
              Novo Atendimento
            </button>
            <div className="flex justify-between px-2">
              <a className="text-on-surface-variant hover:text-deep-burgundy transition-colors p-2 rounded hover:bg-surface-container-high" href="#">
                <span className="material-symbols-outlined" data-icon="help_outline">
                  help_outline
                </span>
              </a>
              <a className="text-on-surface-variant hover:text-deep-burgundy transition-colors p-2 rounded hover:bg-surface-container-high" href="#">
                <span className="material-symbols-outlined" data-icon="logout">
                  logout
                </span>
              </a>
            </div>
          </div>
        </div>
      </aside>
      <main className="md:ml-64 pt-16 min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-margin-desktop py-12">
          <header className="mb-chapter-gap flex justify-between items-end border-b border-outline-variant pb-6">
            <div>
              <h1 className="font-display-lg text-display-lg text-deep-burgundy mb-2">
                Chapter Loop
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Technical Record & Execution Ledger
              </p>
            </div>
            <div className="font-display-lg text-display-lg text-antique-gold opacity-50">
              01
            </div>
          </header>
          <section className="mb-chapter-gap grid grid-cols-12 gap-gutter items-center bg-surface-container-lowest p-8 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-surface-container-high">
            <div className="col-span-12 md:col-span-8 flex items-center gap-6">
              <div className="relative">
                <img alt="Client Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-highest" data-alt="A medium shot profile picture of a female client, Ana Silva, smiling subtly, soft diffused lighting, natural look, elegant beauty salon environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe7aHZMnVdYLFmBGNGbGpDoLCdyUWDCmng6ZWqi7OeF2CoHBAdQQxNru20x4DvzCrKQQ8hDxDjom8fjGnPPw10Q0-K5h7swSVFKR9MUlrzKIjFwjy1CPMy7sKpRCsnvt9EsIiCubGU8zCuzAkJvbLiXP_Fku9DdY5R-H8OUM47-E1dhB62MhGTCQZaeQsv0IfxFnDkBLuGQB4AQgvtt8n7N38wOP9sU6NyrxLk3buzUV3cj2oKHzbc" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-antique-gold rounded-full border-2 border-surface-container-lowest" title="Active"></div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-antique-gold uppercase tracking-widest mb-1">
                  Check-in Concluído
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Ana Silva
                </h2>
                <div className="flex items-center gap-4 mt-2 text-on-surface-variant font-metadata text-metadata">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    14:30 BRT
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      badge
                    </span>
                    Thaynara Rodrigues
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <div className="p-4 bg-parchment-white border border-outline-variant rounded flex flex-col items-end">
                <span className="font-metadata text-metadata text-on-surface-variant uppercase mb-1">
                  ID do Passaporte
                </span>
                <span className="font-metadata text-metadata text-deep-burgundy tracking-[0.2em]">
                  PC-2024-892A
                </span>
              </div>
            </div>
          </section>
          <section className="mb-chapter-gap relative">
            <div className="absolute top-0 right-0 font-display-lg text-display-lg text-antique-gold opacity-30 -mt-8">
              02
            </div>
            <h3 className="font-title-md text-title-md text-deep-burgundy border-b border-outline-variant pb-4 mb-8">
              Diagnosis & Assessment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-6">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                    Condição Atual
                  </label>
                  <textarea className="w-full bg-parchment-white border border-outline-variant rounded p-4 font-body-lg text-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy resize-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]" placeholder="Descreva a porosidade, elasticidade e histórico químico..." rows={4}></textarea>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                    Objetivo
                  </label>
                  <input className="w-full bg-parchment-white border border-outline-variant rounded p-4 font-body-lg text-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]" placeholder="Ex: Correção de cor, nutrição profunda..." type="text" />
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                  Plano de Atendimento
                </label>
                <textarea className="w-full h-[calc(100%-28px)] bg-[#F0EDE4] border-none rounded p-6 font-body-sm text-body-sm text-on-surface focus:ring-1 focus:ring-deep-burgundy resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]" placeholder="Defina as etapas técnicas do procedimento..."></textarea>
              </div>
            </div>
          </section>
          <section className="mb-chapter-gap relative">
            <div className="absolute top-0 right-0 font-display-lg text-display-lg text-antique-gold opacity-30 -mt-8">
              03
            </div>
            <h3 className="font-title-md text-title-md text-deep-burgundy border-b border-outline-variant pb-4 mb-8">
              Execution Ledger
            </h3>
            <div className="bg-surface-container-highest p-6 rounded-lg border border-outline-variant">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                      Fórmula Aplicada
                    </label>
                    <div className="font-metadata text-metadata text-on-surface flex items-center bg-parchment-white border border-outline-variant rounded px-4 py-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                      <span className="material-symbols-outlined text-antique-gold mr-3">
                        science
                      </span>
                      <input className="w-full bg-transparent border-none focus:ring-0 p-0" placeholder="Ex: 30g 8.0 + 15g 8.1 + 60ml OX 20vol" type="text" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                      Técnica
                    </label>
                    <input className="w-full bg-parchment-white border border-outline-variant rounded p-3 font-body-sm text-body-sm focus:ring-1 focus:ring-deep-burgundy shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]" placeholder="Ex: Freehand Balayage" type="text" />
                  </div>
                </div>
                <div className="col-span-1 border-l border-outline-variant pl-6">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">
                    Produtos Principais
                  </label>
                  <ul className="space-y-3 font-body-sm text-body-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-antique-gold rounded-full"></span>
                      Olaplex No. 1
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-antique-gold rounded-full"></span>
                      Wella Blondor
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-antique-gold rounded-full"></span>
                      Máscara Nutritiva Kérastase
                    </li>
                  </ul>
                  <button className="mt-4 text-antique-gold hover:text-deep-burgundy font-label-caps text-label-caps uppercase flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>
                    Adicionar Produto
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter relative">
            <div className="absolute top-0 right-0 font-display-lg text-display-lg text-antique-gold opacity-30 -mt-8">
              04
            </div>
            <div className="bg-surface-bright border border-outline-variant rounded-lg p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-4 left-4 font-metadata text-metadata text-on-surface-variant opacity-50">
                FINALIZATION
              </div>
              <div className="w-32 h-32 rounded-full border-4 border-stamp-red/20 flex items-center justify-center mb-6 relative shadow-[0_4px_12px_rgba(139,0,0,0.15)] bg-parchment-white group cursor-pointer hover:border-stamp-red/40 transition-colors">
                <div className="absolute inset-2 border border-dashed border-stamp-red/30 rounded-full group-hover:rotate-12 transition-transform duration-500"></div>
                <span className="material-symbols-outlined text-4xl text-stamp-red">
                  verified
                </span>
              </div>
              <h4 className="font-headline-lg text-headline-lg text-deep-burgundy mb-2">
                Manutenção do Loiro
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">
                Validado por Thaynara Rodrigues • 24 Out 2024
              </p>
              <button className="bg-deep-burgundy text-antique-gold px-8 py-4 rounded font-label-caps text-label-caps uppercase hover:bg-primary transition-colors flex items-center gap-3 w-full justify-center group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Carimbar Passaporte
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </span>
                <div className="absolute inset-0 bg-antique-gold/10 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></div>
              </button>
            </div>
            <div className="bg-parchment-white border-t-2 md:border-t-0 md:border-l-2 border-antique-gold p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-antique-gold">
                    flight_takeoff
                  </span>
                  Próximo Destino
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                      Tratamento Recomendado
                    </label>
                    <select className="w-full bg-surface-container-highest border-b border-outline-variant rounded-t p-3 font-body-lg text-body-lg focus:ring-0 focus:border-deep-burgundy">
                      <option>
                        Cronograma Capilar - Reconstrução
                      </option>
                      <option>
                        Retoque de Raiz
                      </option>
                      <option>
                        Glossing
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                      Data Sugerida de Retorno
                    </label>
                    <div className="flex items-center gap-4">
                      <input className="bg-surface-container-highest border-b border-outline-variant rounded-t p-3 font-metadata text-metadata focus:ring-0 focus:border-deep-burgundy" type="date" value="2024-11-24" />
                      <span className="font-body-sm text-body-sm text-on-surface-variant italic">
                        Daqui a 30 dias
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/50">
                <p className="font-metadata text-metadata text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    lock
                  </span>
                  O loop será fechado e selado digitalmente após o carimbo.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
