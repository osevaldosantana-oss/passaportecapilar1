import { createFileRoute } from "@tanstack/react-router";

const pageCss = "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .material-symbols-outlined[data-weight=\"fill\"] {\n            font-variation-settings: 'FILL' 1;\n        }\n        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }\n        .pt-safe { padding-top: env(safe-area-inset-top); }\n        \n        .passport-hero {\n            position: relative;\n            aspect-ratio: 1 / 1.414;\n            background-size: cover;\n            background-position: center;\n            border-radius: 0.5rem;\n            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5);\n            overflow: hidden;\n        }\n        \n        .passport-overlay {\n            position: absolute;\n            inset: 0;\n            background: linear-gradient(to bottom, rgba(74, 14, 14, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%);\n            display: flex;\n            flex-direction: column;\n            justify-content: flex-end;\n            padding: 24px;\n        }\n        \n        .stamp-shadow {\n            filter: drop-shadow(0px 4px 12px rgba(139, 0, 0, 0.2));\n        }\n        \n        .debossed-surface {\n            background-color: #F0EDE4;\n            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);\n        }\n    ";

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
  return (
    <div className="bg-parchment-white text-on-surface antialiased pt-safe pb-24 md:pb-0">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <header className="bg-parchment-white border-b border-outline-variant transition-colors duration-300 flex justify-between items-center px-margin-mobile h-16 w-full z-50 sticky top-0 md:hidden">
        <button className="text-deep-burgundy hover:text-antique-gold transition-colors duration-300 p-2">
          <span className="material-symbols-outlined" data-icon="menu">
            menu
          </span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-deep-burgundy">
          Passaporte Capilar™
        </h1>
        <div className="h-8 w-8 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden">
          <img alt="Client Portrait" className="w-full h-full object-cover" data-alt="A small, professional portrait of a woman with red hair, soft lighting, elegant." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-_y578LZOFLkY9d31Jao_M8XXtVRCoBG7xz0EgOYkkTHy0Z1OF8In55oWnyNjxCUZWntDXn2PKtEge2YqSMFqCvUYvic--SUa2HL6P_AIDA7nwPhuTohsObPqbuJJmFmG60CGLELdVHBzs6UkKi3Z-GBmcQ9iQ6FV2_FC90aecgnkcFN7ZpbkQFV_O03SLj81ligBQoQ1XSXOWbcKc4Nh5bI5DQUYlubknAhYNOFZZHKqBOz1k_rj" />
        </div>
      </header>
      <aside className="hidden md:flex flex-col h-screen w-80 rounded-r-none border-r border-outline-variant shadow-2xl bg-parchment-white fixed left-0 top-0 z-40 p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden">
            <img alt="Client Avatar" className="w-full h-full object-cover" data-alt="A professional portrait of a woman with red hair, soft lighting, elegant, diplomatic style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIuj8hRZdKrZZ8WfZJ4zRHz9tPq9MH39t4N-FG9GZowyLv4NZTnmTWfbxAURwQ4FJpc2tUdKU3bY6ZLwQB42jVP4mb9qvPtsWSxvhk2sUH4Qa-akPA7UeCSkXgUnn0n22awr0YG4Dpk3YCWXBvM15Oqpfw_d0xrzTCgoS0PQ2yoUJ-waFm1dO-hdzPt6Lct1ssLpOv-tZEkjn8aOcVfsQkmaiARHN89Age5t9HJFNV9tm_wmmd48Ju" />
          </div>
          <div>
            <h2 className="font-headline-lg text-deep-burgundy text-xl">
              Ana Silva
            </h2>
            <p className="font-body-sm text-on-surface-variant">
              Edição Diplomática
            </p>
            <p className="font-metadata text-metadata text-antique-gold">
              ID: PC-2026
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-deep-burgundy font-bold bg-surface-container-high transition-colors duration-300" href="#">
            <span className="material-symbols-outlined" data-icon="auto_stories" data-weight="fill">
              auto_stories
            </span>
            <span className="font-body-lg text-body-lg">
              My Journey
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-300" href="#">
            <span className="material-symbols-outlined" data-icon="approval">
              approval
            </span>
            <span className="font-body-lg text-body-lg">
              Beauty Stamps
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-300" href="#">
            <span className="material-symbols-outlined" data-icon="calendar_today">
              calendar_today
            </span>
            <span className="font-body-lg text-body-lg">
              Scheduled Visits
            </span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-300" href="#">
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            <span className="font-body-lg text-body-lg">
              Settings
            </span>
          </a>
        </nav>
        <div className="mt-auto">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-300" href="#">
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            <span className="font-body-lg text-body-lg">
              Logout
            </span>
          </a>
        </div>
      </aside>
      <main className="w-full md:pl-[320px] min-h-screen">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-chapter-gap">
          <section className="flex justify-center">
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
                    <span className="material-symbols-outlined text-antique-gold" data-icon="workspace_premium" data-weight="fill">
                      workspace_premium
                    </span>
                    <span className="font-body-sm text-parchment-white/80">
                      Edição Diplomática
                    </span>
                  </div>
                  <img alt="Wax Seal" className="w-12 h-12 stamp-shadow" data-alt="A highly detailed, elegant red wax seal with an intricate 'PC' monogram, indicating official diplomatic validation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoFRcZ5Cb_YGRK30vbTVAmi-RXLGmA-ejKMuiKp0E2iP2h_MISd9pp-4S4t7wR-igiNGaezc7eEEIYrTRAOtZ3v1axWT2dtbcqqewuaQM4Sj7FXS83LN3jDFKJlbEjbCcs1FNk4PrYUX9RCN7PD6kKVMW3RWTElXmKUTvYxt6pdYR3Zis8EHlY9lFSLYmpUY3GGUK1glcBxtzo5iGKdZfXjf5WXguXrH8zNQPFm9UAYZovyTJZXi_t" />
                </div>
              </div>
            </div>
          </section>
          <section>
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
                    <span className="material-symbols-outlined text-antique-gold text-sm" data-icon="event">
                      event
                    </span>
                    <span className="font-metadata text-metadata">
                      22 SET 2026
                    </span>
                    <span className="mx-2">
                      •
                    </span>
                    <span className="material-symbols-outlined text-antique-gold text-sm" data-icon="schedule">
                      schedule
                    </span>
                    <span className="font-metadata text-metadata">
                      14:00 - 18:00
                    </span>
                  </div>
                </div>
                <button className="bg-deep-burgundy text-antique-gold font-label-caps text-label-caps px-6 py-3 rounded uppercase tracking-widest hover:bg-primary-container transition-colors duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
                  <span>
                    Check-in
                  </span>
                  <span className="material-symbols-outlined" data-icon="flight_takeoff">
                    flight_takeoff
                  </span>
                </button>
              </div>
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
                      <span className="font-metadata text-metadata text-antique-gold block mb-1">
                        15 JUL 2026
                      </span>
                      <h5 className="font-body-lg text-body-lg font-semibold text-deep-burgundy">
                        Reconstrução Capilar
                      </h5>
                    </div>
                    <span className="font-headline-lg-mobile text-antique-gold/40">
                      03
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                    Tratamento intensivo para recuperação da fibra capilar pós-química.
                  </p>
                  <div className="flex items-center justify-end">
                    <img alt="Carimbo" className="w-16 h-16 opacity-80 mix-blend-multiply" data-alt="A stylized, vintage-looking digital passport stamp in faded red ink, indicating a completed hair reconstruction service." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqy54eUDuK4VOK2pQD-vvLTmuFvucaAkc_rCKS9dLo5JkBvQ662-Wwfk7TovPzCsWir0OP-h7_3TxIe9Qfr3urlBMAVlLX4-RJhZSjN2gXvpt7iSEDSoJ9GgW5VsOs3YCHDZFZT2aSOyEWbJg_XxSzFJuiri57fxLvzMtYdi1PR-Y_uabSeoXUFru5TxZSfrkKDAOl6goe4u4PdoLwe_WsWbJZoRbfTbpjlUG0b40jtxLDFVMUQzd_" />
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-antique-gold/50 border-4 border-parchment-white z-10"></div>
                <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-metadata text-metadata text-on-surface-variant block mb-1">
                        02 MAI 2026
                      </span>
                      <h5 className="font-body-lg text-body-lg font-semibold text-deep-burgundy">
                        Coloração Global
                      </h5>
                    </div>
                    <span className="font-headline-lg-mobile text-outline-variant/40">
                      02
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                    Aplicação de tom acobreado com nuances douradas.
                  </p>
                  <div className="flex items-center justify-end">
                    <img alt="Carimbo" className="w-16 h-16 opacity-60 mix-blend-multiply" data-alt="A stylized, vintage-looking digital passport stamp in faded black ink, indicating a completed global hair coloring service." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBggckGi9p1VE5RercEvmK4wvlp3uWSG-PKLU4JXTAzwZGMv2x5G9e92H3B0N9SScM87QPaGOJXz8kd5T28uQ2DaOmiOSHOPirHQGtDdxDU7G4EsJJM94i3PxkoncEwHdpejB6tMUfpx4q1A862gp37IaikSFS34Y5NeYNEapq14XC_6e_8M7iCQYVy-ddpCsz5ybHSINHSU58CEiyK4QfLPLRHJ4-HV1GGUR6ovYIH1e3YgE8k6Pt0" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <nav className="bg-deep-burgundy shadow-[0_-4px_12px_rgba(0,0,0,0.15)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe md:hidden rounded-t-xl">
        <a className="flex flex-col items-center justify-center text-antique-gold bg-primary-container/20 rounded-xl p-2 transition-all duration-200 scale-95" href="#">
          <span className="material-symbols-outlined" data-icon="menu_book" data-weight="fill">
            menu_book
          </span>
          <span className="font-label-caps text-label-caps mt-1">
            Passport
          </span>
        </a>
        <a className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="history_edu">
            history_edu
          </span>
          <span className="font-label-caps text-label-caps mt-1">
            History
          </span>
        </a>
        <a className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="chat_bubble">
            chat_bubble
          </span>
          <span className="font-label-caps text-label-caps mt-1">
            Messages
          </span>
        </a>
        <a className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="account_circle">
            account_circle
          </span>
          <span className="font-label-caps text-label-caps mt-1">
            Profile
          </span>
        </a>
      </nav>
    </div>
  );
}
