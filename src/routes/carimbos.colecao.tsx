import { createFileRoute } from "@tanstack/react-router";

const pageCss = "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .stamp-shadow {\n            filter: drop-shadow(0px 4px 12px rgba(139, 0, 0, 0.15));\n        }\n        .bg-texture {\n            background-color: #F9F6F0;\n            background-image: url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\");\n        }\n    ";

export const Route = createFileRoute("/carimbos/colecao")({
  head: () => ({
    meta: [
      { title: "Coleção de Carimbos — Passaporte Capilar™" },
      { name: "description", content: "Galeria estática da coleção de carimbos e selos conquistados na jornada capilar." },
      { property: "og:title", content: "Coleção de Carimbos — Passaporte Capilar™" },
      { property: "og:description", content: "Galeria estática da coleção de carimbos e selos conquistados na jornada capilar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-parchment-white text-on-surface font-body-lg min-h-screen pb-24 bg-texture">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <header className="flex justify-between items-center px-margin-mobile h-16 w-full z-50 bg-parchment-white border-b border-outline-variant docked full-width top-0 sticky top-0 transition-colors duration-300">
        <button className="text-deep-burgundy hover:text-antique-gold transition-colors duration-300 p-2 -ml-2 rounded-full hover:bg-surface-container">
          <span className="material-symbols-outlined">
            menu
          </span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-deep-burgundy tracking-tight">
          Passaporte Capilar™
        </h1>
        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-outline-variant bg-surface-container-high">
          <img alt="Client Portrait" className="w-full h-full object-cover" data-alt="A small, high-quality, professional headshot of an elegant woman with beautifully styled hair, softly lit, serving as a profile avatar in a luxury app. Warm color palette, luxury editorial style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC32K_oaO2CISmBoaZzRxbIbS6ZDmtBjTLbHJjNFo5o3Nj6njSQG6VcW6vDAwOEBofyKbaSq2VPTnWPUIbF4tqVUJkRr-KUf-ken7Ls-mLN0d0o_GxMu3LXQYzdYjg8snmErD2yb81w01xeMlntziJKzfivdcbT_ieKVO-IO8dfhTsUvBOMRawVhNw2XGCMAHTjEeIfGkAJLWIPIPFhl4bm9G8GdxP1z4ZG5wQ5LbZtkVaxb6vEX6R7" />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
        <div className="text-center mb-12">
          <p className="font-label-caps text-label-caps text-outline mb-2 uppercase">
            Coleção Oficial
          </p>
          <h2 className="font-display-lg text-display-lg text-deep-burgundy mb-4">
            Meus Carimbos
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            Seu histórico validado de tratamentos e transformações. Cada selo representa um capítulo da sua jornada capilar.
          </p>
        </div>
        <div className="relative w-full rounded-xl overflow-hidden shadow-sm border border-outline-variant bg-[#F0EDE4] p-4 md:p-8 mb-chapter-gap">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu32E3FtyHm8hg4wN1rm15GOWLyAbAApdFPOfpRYk-On_D40tsA16h-Wl0vm8Z00m56ZRjN2Gr7iGDi3vuhUEIiAQg5f_J6Q8IyTbro_jxXb0x0d1k-2-33g8NQONegjdX47WyULZX5O8pofsyXJtZJtJT27v7Eh4jBUs0LUMy8OxC3OfwN0zpeieHfUdnAmonKOZ1AgICln_yG80E8tLH8JK85vBT6SrX82XJJsC9HKQD5DfGJg-bq-slyMpRrFHGNA')", backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "multiply" }}></div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col items-center group relative cursor-pointer">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-stamp-red/30 flex items-center justify-center relative mb-4 bg-parchment-white/80 backdrop-blur-sm stamp-shadow transition-transform duration-300 group-hover:scale-105">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-stamp-red flex items-center justify-center border-dashed">
                  <div className="text-stamp-red text-center">
                    <span className="material-symbols-outlined text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                      spa
                    </span>
                    <div className="font-headline-lg-mobile text-sm font-bold leading-tight">
                      HIDRATAÇÃO
                    </div>
                    <div className="font-metadata text-[8px] mt-1 opacity-70">
                      VALIDADO
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-title-md text-sm md:text-base text-deep-burgundy font-bold">
                  Tratamento Profundo
                </h3>
                <p className="font-metadata text-metadata text-outline mt-1">
                  12 OUT 2023
                </p>
                <p className="font-label-caps text-[10px] text-on-surface-variant mt-2 border-t border-outline-variant pt-1 inline-block">
                  POR ANA SILVA
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center group relative cursor-pointer pt-8 md:pt-16">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-deep-burgundy/30 flex items-center justify-center relative mb-4 bg-parchment-white/80 backdrop-blur-sm stamp-shadow transition-transform duration-300 group-hover:scale-105">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-deep-burgundy flex items-center justify-center border-solid">
                  <div className="text-deep-burgundy text-center">
                    <span className="material-symbols-outlined text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                      content_cut
                    </span>
                    <div className="font-headline-lg-mobile text-sm font-bold leading-tight">
                      TRANSFORMAÇÃO
                    </div>
                    <div className="font-metadata text-[8px] mt-1 opacity-70">
                      VALIDADO
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-title-md text-sm md:text-base text-deep-burgundy font-bold">
                  Corte & Cor
                </h3>
                <p className="font-metadata text-metadata text-outline mt-1">
                  28 NOV 2023
                </p>
                <p className="font-label-caps text-[10px] text-on-surface-variant mt-2 border-t border-outline-variant pt-1 inline-block">
                  POR ANA SILVA
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center group relative cursor-pointer pt-4 md:pt-8">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-antique-gold/40 flex items-center justify-center relative mb-4 bg-parchment-white/80 backdrop-blur-sm stamp-shadow transition-transform duration-300 group-hover:scale-105">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-antique-gold flex items-center justify-center border-double border-4">
                  <div className="text-secondary text-center">
                    <span className="material-symbols-outlined text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                      water_drop
                    </span>
                    <div className="font-headline-lg-mobile text-sm font-bold leading-tight">
                      NUTRIÇÃO
                    </div>
                    <div className="font-metadata text-[8px] mt-1 opacity-70">
                      VALIDADO
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-title-md text-sm md:text-base text-deep-burgundy font-bold">
                  Banho de Ouro
                </h3>
                <p className="font-metadata text-metadata text-outline mt-1">
                  15 JAN 2024
                </p>
                <p className="font-label-caps text-[10px] text-on-surface-variant mt-2 border-t border-outline-variant pt-1 inline-block">
                  POR MARCOS V.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center group relative cursor-pointer pt-12 md:pt-24 opacity-60">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-outline-variant flex items-center justify-center relative mb-4 bg-transparent border-dashed">
                <div className="text-outline-variant text-center">
                  <span className="material-symbols-outlined text-4xl opacity-50">
                    lock
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-title-md text-sm md:text-base text-outline font-normal italic">
                  Próxima Etapa
                </h3>
                <p className="font-metadata text-metadata text-outline-variant mt-1">
                  RECONSTRUÇÃO
                </p>
              </div>
            </div>
          </div>
          <svg className="absolute top-1/2 left-0 w-full h-24 -mt-12 pointer-events-none hidden md:block" style={{ zIndex: "5" }}>
            <path d="M 100,50 Q 250,150 400,50 T 700,50 T 1000,50" fill="transparent" stroke="#dac1bf" stroke-dasharray="5,5" stroke-width="2"></path>
          </svg>
        </div>
        <div className="mt-8 border border-outline-variant rounded-lg p-6 flex flex-col md:flex-row items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="material-symbols-outlined text-antique-gold text-3xl">
              verified_user
            </span>
            <div>
              <h4 className="font-title-md text-base text-deep-burgundy">
                Registros Autenticados
              </h4>
              <p className="font-body-sm text-sm text-on-surface-variant">
                Todos os carimbos são validados criptograficamente.
              </p>
            </div>
          </div>
          <div className="font-metadata text-metadata text-outline bg-surface-container py-2 px-4 rounded border border-outline-variant/50">
            ID: PC-2026-X89
          </div>
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-deep-burgundy docked full-width rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.15)] md:hidden">
        <a className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all duration-200" href="#">
          <span className="material-symbols-outlined mb-1">
            menu_book
          </span>
          <span className="font-label-caps text-label-caps">
            Passport
          </span>
        </a>
        <a className="flex flex-col items-center justify-center text-antique-gold bg-primary-container/20 rounded-xl p-2 scale-95 transition-all duration-200" href="#">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            history_edu
          </span>
          <span className="font-label-caps text-label-caps">
            History
          </span>
        </a>
        <a className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all duration-200" href="#">
          <span className="material-symbols-outlined mb-1">
            chat_bubble
          </span>
          <span className="font-label-caps text-label-caps">
            Messages
          </span>
        </a>
        <a className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all duration-200" href="#">
          <span className="material-symbols-outlined mb-1">
            account_circle
          </span>
          <span className="font-label-caps text-label-caps">
            Profile
          </span>
        </a>
      </nav>
    </div>
  );
}
