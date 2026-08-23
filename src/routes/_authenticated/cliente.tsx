import { createFileRoute } from "@tanstack/react-router";

const pageCss = "\n        body { background-color: #F9F6F0; color: #221a19; }\n        .lux-border { border: 1px solid #dac1bf; }\n        .lux-border-b { border-bottom: 1px solid #dac1bf; }\n        .timeline-dot { width: 8px; height: 8px; border-radius: 50%; background-color: #C5A059; border: 2px solid #F9F6F0; box-shadow: 0 0 0 1px #C5A059; }\n        .timeline-line { width: 1px; background-color: #C5A059; opacity: 0.3; }\n        .seal-shadow { box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15); }\n    ";

export const Route = createFileRoute("/_authenticated/cliente")({
  head: () => ({
    meta: [
      { title: "Perfil da Cliente — Passaporte Capilar™" },
      { name: "description", content: "Ficha completa da cliente com histórico de serviços, fórmulas e observações técnicas." },
      { property: "og:title", content: "Perfil da Cliente — Passaporte Capilar™" },
      { property: "og:description", content: "Ficha completa da cliente com histórico de serviços, fórmulas e observações técnicas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="font-body-lg text-body-lg min-h-screen flex selection:bg-antique-gold/30">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white z-50 justify-between py-8 px-4">
        <div>
          <div className="mb-10 px-4">
            <h1 className="font-display-lg text-headline-lg text-deep-burgundy tracking-tight">
              Passaporte
              <br />
              Capilar™
            </h1>
            <p className="font-label-caps text-metadata text-on-surface-variant mt-2 uppercase">
              Consul de Beleza
            </p>
          </div>
          <button className="w-full mb-8 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-3 rounded-DEFAULT hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              add
            </span>
            Novo Atendimento
          </button>
          <ul className="space-y-1">
            <li>
              <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
                <span className="material-symbols-outlined">
                  dashboard
                </span>
                <span className="font-title-md text-body-lg">
                  Visão Geral
                </span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold" href="#">
                <span className="material-symbols-outlined">
                  group
                </span>
                <span className="font-title-md text-body-lg">
                  Clientes
                </span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
                <span className="material-symbols-outlined">
                  style
                </span>
                <span className="font-title-md text-body-lg">
                  Passaportes
                </span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                <span className="font-title-md text-body-lg">
                  Programas
                </span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
                <span className="material-symbols-outlined">
                  auto_awesome
                </span>
                <span className="font-title-md text-body-lg">
                  Brand Studio
                </span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
                <span className="material-symbols-outlined">
                  settings
                </span>
                <span className="font-title-md text-body-lg">
                  Configurações
                </span>
              </a>
            </li>
          </ul>
        </div>
        <ul className="space-y-1">
          <li>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
              <span className="material-symbols-outlined">
                help_outline
              </span>
              <span className="font-title-md text-body-lg">
                Suporte
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
              <span className="material-symbols-outlined">
                logout
              </span>
              <span className="font-title-md text-body-lg">
                Sair
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <header className="hidden md:flex justify-between items-center h-16 px-margin-desktop ml-64 fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-parchment-white/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-on-surface-variant bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
            <span className="font-label-caps text-metadata">
              Buscar...
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="font-label-caps text-label-caps text-deep-burgundy uppercase border border-deep-burgundy px-4 py-1.5 rounded-full hover:bg-surface-container-low transition-colors">
            Modo Passaporte
          </button>
          <div className="flex gap-2">
            <button className="p-2 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low rounded-full transition-all">
              <span className="material-symbols-outlined">
                notifications
              </span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low rounded-full transition-all">
              <span className="material-symbols-outlined">
                history_edu
              </span>
            </button>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden lux-border">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX4xzovnUFNX5yKh3EfMKWkczQ0UNB36Ek9t-KL73OEMGncNt6xE_q7NiCHhtu-0hLP_e2J53XAVuMT4Rwn5G8RNdl3zdFAWd9u877xL9xzS-X8ixufAIC6atIk2MXnozUgdNh9NqyiAtNQ-ZB1S94WOsay83EVacfoOVJQt1l67NOlckwJfZLu5nPVZ7sItD9naqfKXSyoQ6ikNJxb1FAE76twKeRP19MfRlIV32wWBXhgwxLN5_K" />
          </div>
        </div>
      </header>
      <main className="w-full md:ml-64 pt-20 md:pt-24 px-margin-mobile md:px-margin-desktop pb-24">
        <div className="flex items-center gap-2 text-on-surface-variant font-label-caps text-metadata uppercase tracking-widest mb-8">
          <a className="hover:text-deep-burgundy transition-colors" href="#">
            Clientes
          </a>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-deep-burgundy">
            Ana Silva
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-chapter-gap">
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 md:w-48 aspect-[1/1.414] lux-border rounded-sm overflow-hidden shadow-lg relative flex-shrink-0 group cursor-pointer">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A highly detailed, photorealistic close-up of a luxurious, dark burgundy leather-bound document resembling a passport. The cover features elegant, embossed gold foil typography and a rich, textured surface. The mood is exclusive, official, and high-end, set against a dark, moody background with subtle directional lighting highlighting the gold details and leather grain." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQdR8FjOdLxBFF8U5ILqzp17uCgEQNp8_aZDblFjG1ERM9gYJDMLpmT2kyz0FKS-i-cfnLnjnFu0gtDwdpoK2bWbMfxerVb16VGdCOMlMtbWp7Ef3pRhnsPMcPOS0wPL9Ac9YX2LaSxAWaC-kQen0CSfxMgzqqzagSRLiaqqIS4osGTFbTZ0kQklU_aNAu3tt5_RvszWcOOJQ1Nnrgo9I3VRLMCdHsGju9taod8PwYZIVuSl3zgrvi8oPJUzXDb23DZg" />
              <div className="absolute inset-0 bg-ink-black/20 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="font-label-caps text-[8px] text-antique-gold bg-deep-burgundy/80 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                  ID: PC-2026
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-deep-burgundy">
                  Ana Silva
                </h2>
                <span className="px-2 py-1 bg-surface-container text-deep-burgundy font-label-caps text-[10px] uppercase rounded-sm border border-outline-variant/50">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="font-label-caps text-metadata text-on-surface-variant uppercase mb-1">
                    Último Capítulo
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface">
                    18 AGO 2026
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-metadata text-on-surface-variant uppercase mb-1">
                    Próximo Capítulo
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface">
                    22 SET 2026
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <button className="bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase px-8 py-4 rounded-DEFAULT hover:bg-primary transition-colors flex items-center gap-3 seal-shadow w-full md:w-auto justify-center">
                  <span className="material-symbols-outlined">
                    menu_book
                  </span>
                  Abrir Passaporte
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-lowest lux-border p-6 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[64px] text-deep-burgundy">
                  verified
                </span>
              </div>
              <h3 className="font-label-caps text-metadata text-on-surface-variant uppercase mb-4">
                Programa Atual
              </h3>
              <p className="font-title-md text-title-md text-deep-burgundy mb-1">
                Loiro Saudável Premium
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-antique-gold" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                Membro Signature
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest lux-border p-4 rounded-lg">
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">
                  Retenção
                </p>
                <p className="font-headline-lg text-headline-lg text-deep-burgundy">
                  100%
                </p>
              </div>
              <div className="bg-surface-container-lowest lux-border p-4 rounded-lg">
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">
                  Capítulos
                </p>
                <p className="font-headline-lg text-headline-lg text-deep-burgundy">
                  12
                </p>
              </div>
              <div className="bg-surface-container-lowest lux-border p-4 rounded-lg col-span-2 flex items-center justify-between">
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                  LTV Estimado
                </p>
                <p className="font-title-md text-title-md text-on-surface">
                  R$ 8.450
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4">
            <h3 className="font-display-lg text-headline-lg text-deep-burgundy mb-8 lux-border-b pb-4">
              Histórico
            </h3>
            <div className="relative pl-4 space-y-8">
              <div className="absolute left-[19px] top-2 bottom-2 timeline-line"></div>
              <div className="relative">
                <div className="absolute -left-[20px] top-1.5 timeline-dot bg-deep-burgundy"></div>
                <p className="font-label-caps text-metadata text-antique-gold uppercase mb-1">
                  2026 • Atual
                </p>
                <p className="font-title-md text-body-lg text-on-surface">
                  Loiro Saudável
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[20px] top-1.5 timeline-dot opacity-50"></div>
                <p className="font-label-caps text-metadata text-on-surface-variant uppercase mb-1">
                  2025
                </p>
                <p className="font-title-md text-body-lg text-on-surface-variant">
                  Correção de Cor
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[20px] top-1.5 timeline-dot opacity-50"></div>
                <p className="font-label-caps text-metadata text-on-surface-variant uppercase mb-1">
                  2025
                </p>
                <p className="font-title-md text-body-lg text-on-surface-variant">
                  Primeiras Mechas
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[20px] top-1.5 timeline-dot opacity-50"></div>
                <p className="font-label-caps text-metadata text-on-surface-variant uppercase mb-1">
                  2024
                </p>
                <p className="font-title-md text-body-lg text-on-surface-variant">
                  Transformação Inicial
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="flex items-end justify-between mb-8 lux-border-b pb-4">
              <h3 className="font-display-lg text-headline-lg text-deep-burgundy">
                Capítulos Recentes
              </h3>
              <a className="font-label-caps text-metadata text-antique-gold uppercase hover:text-deep-burgundy transition-colors" href="#">
                Ver Todos
              </a>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest lux-border p-6 rounded-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 font-display-lg text-[64px] text-surface-variant opacity-20 -mt-4 -mr-2 select-none">
                  012
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div>
                    <p className="font-label-caps text-metadata text-on-surface-variant uppercase mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">
                        event
                      </span>
                      18 AGO 2026
                    </p>
                    <h4 className="font-title-md text-title-md text-deep-burgundy mb-1 group-hover:text-antique-gold transition-colors">
                      Manutenção do Loiro
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Profissional: Thaynara Rodrigues
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 border border-outline-variant rounded-sm font-label-caps text-[10px] text-on-surface-variant uppercase">
                      Validado
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-deep-burgundy transition-colors">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest lux-border p-6 rounded-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 font-display-lg text-[64px] text-surface-variant opacity-20 -mt-4 -mr-2 select-none">
                  011
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div>
                    <p className="font-label-caps text-metadata text-on-surface-variant uppercase mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">
                        event
                      </span>
                      15 JUL 2026
                    </p>
                    <h4 className="font-title-md text-title-md text-deep-burgundy mb-1 group-hover:text-antique-gold transition-colors">
                      Tratamento Reconstrutor
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Profissional: Thaynara Rodrigues
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 border border-outline-variant rounded-sm font-label-caps text-[10px] text-on-surface-variant uppercase">
                      Validado
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-deep-burgundy transition-colors">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest lux-border p-6 rounded-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 font-display-lg text-[64px] text-surface-variant opacity-20 -mt-4 -mr-2 select-none">
                  010
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div>
                    <p className="font-label-caps text-metadata text-on-surface-variant uppercase mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">
                        event
                      </span>
                      10 JUN 2026
                    </p>
                    <h4 className="font-title-md text-title-md text-deep-burgundy mb-1 group-hover:text-antique-gold transition-colors">
                      Avaliação e Corte
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Profissional: Thaynara Rodrigues
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 border border-outline-variant rounded-sm font-label-caps text-[10px] text-on-surface-variant uppercase">
                      Validado
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-deep-burgundy transition-colors">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
