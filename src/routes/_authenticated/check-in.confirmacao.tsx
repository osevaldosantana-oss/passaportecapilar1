import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { z } from "zod";

const pageCss = "\n        .scanner-line {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 2px;\n            background: #C5A059;\n            box-shadow: 0 0 10px #C5A059, 0 0 20px #C5A059;\n            animation: scan 3s infinite linear;\n            opacity: 0.7;\n        }\n\n        @keyframes scan {\n            0% { top: 5%; opacity: 0; }\n            10% { opacity: 0.8; }\n            50% { opacity: 1; }\n            90% { opacity: 0.8; }\n            100% { top: 95%; opacity: 0; }\n        }\n\n        .corner-br {\n            position: absolute;\n            width: 32px;\n            height: 32px;\n            border: 2px solid #C5A059;\n        }\n        .corner-tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }\n        .corner-tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }\n        .corner-bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }\n        .corner-br-only { bottom: -2px; right: -2px; border-left: none; border-top: none; }\n\n        .paper-texture {\n            background-image: url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\");\n        }\n    ";

export const Route = createFileRoute("/_authenticated/check-in/confirmacao")({
  validateSearch: z.object({ clientId: z.string().uuid().optional() }),
  head: () => ({
    meta: [
      { title: "Confirmação de Check-in — Passaporte Capilar™" },
      { name: "description", content: "Confirmação de chegada e validação da visita agendada no salão." },
      { property: "og:title", content: "Confirmação de Check-in — Passaporte Capilar™" },
      { property: "og:description", content: "Confirmação de chegada e validação da visita agendada no salão." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-parchment-white text-ink-black min-h-screen flex paper-texture">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <AppSidebar active="/check-in" />
      <main className="hidden md:block ml-64 mt-0 p-margin-desktop w-full max-w-7xl mx-auto flex flex-col gap-chapter-gap">
        <header className="flex justify-between items-end border-b border-outline-variant pb-6 mt-16">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-deep-burgundy">
              Check-in & Sincronização
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
              Estabeleça a conexão com o dispositivo da cliente para iniciar o registro seguro do novo capítulo no Passaporte Capilar™.
            </p>
          </div>
          <div className="font-display-lg text-display-lg text-antique-gold opacity-50">
            01
          </div>
        </header>
        <div className="grid grid-cols-12 gap-gutter">
          <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-8 flex flex-col gap-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-title-md text-title-md text-deep-burgundy flex items-center gap-2">
                <span className="material-symbols-outlined">qr_code_scanner</span>
                Scanner de Identidade
              </h3>
              <span className="font-metadata text-metadata text-outline px-3 py-1 bg-surface-container-high rounded-full tracking-widest">
                SISTEMA ATIVO
              </span>
            </div>
            <div className="relative w-full aspect-video bg-ink-black/5 rounded border border-outline-variant flex items-center justify-center overflow-hidden">
              <div className="absolute inset-8 z-10">
                <div className="corner-br corner-tl"></div>
                <div className="corner-br corner-tr"></div>
                <div className="corner-br corner-bl"></div>
                <div className="corner-br corner-br-only"></div>
              </div>
              <div className="absolute inset-8 z-20 overflow-hidden">
                <div className="scanner-line"></div>
              </div>
              <div className="z-30 text-center flex flex-col items-center gap-4 p-6 bg-parchment-white/80 backdrop-blur-md rounded-lg border border-outline-variant shadow-lg max-w-md">
                <span className="material-symbols-outlined text-4xl text-deep-burgundy animate-pulse">
                  aod
                </span>
                <div>
                  <p className="font-title-md text-title-md text-deep-burgundy">
                    Aguardando QR Code da Cliente
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                    Posicione o código no centro do enquadramento para validação instantânea.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-outline-variant border-dashed">
              <p className="font-metadata text-metadata text-on-surface-variant">
                SECURE CONNECTION: ENABLED
              </p>
              <button className="font-label-caps text-label-caps text-deep-burgundy hover:text-stamp-red flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-sm">vpn_key</span>
                Entrada Manual (Fallback)
              </button>
            </div>
          </section>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <section className="bg-[#F0EDE4] border border-outline-variant p-6 rounded-sm inset-shadow-sm">
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 border-b border-outline-variant pb-2">
                Como Conectar
              </h3>
              <ol className="flex flex-col gap-6 relative before:absolute before:left-3 before:top-4 before:bottom-4 before:w-px before:bg-antique-gold/50">
                <li className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-deep-burgundy text-antique-gold flex items-center justify-center font-label-caps text-[10px] shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-label-caps text-label-caps text-deep-burgundy mb-1">Solicite a Cliente</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Peça que a cliente abra o Modo Identidade no aplicativo Passaporte Capilar™ no celular dela.</p>
                  </div>
                </li>
                <li className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high border border-antique-gold text-antique-gold flex items-center justify-center font-label-caps text-[10px] shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-label-caps text-label-caps text-deep-burgundy mb-1">Aponte o Leitor</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Enquadre o código QR exibido na tela da cliente utilizando o scanner à esquerda.</p>
                  </div>
                </li>
                <li className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high border border-antique-gold text-antique-gold flex items-center justify-center font-label-caps text-[10px] shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-label-caps text-label-caps text-deep-burgundy mb-1">Inicie o Capítulo</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Confirme os dados de identidade e assine digitalmente para iniciar o atendimento.</p>
                  </div>
                </li>
              </ol>
            </section>
            <section>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">history</span>
                Últimos Check-ins
              </h3>
              <ul className="flex flex-col gap-3">
                <li className="bg-surface-container-lowest border border-outline-variant p-4 flex items-center gap-4 hover:border-antique-gold transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant w-full h-full flex items-center justify-center">person</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-title-md text-body-lg text-deep-burgundy group-hover:text-stamp-red transition-colors">Marina Silva</h4>
                    <p className="font-metadata text-metadata text-on-surface-variant">ID: PC-8924 • Sincronizado</p>
                  </div>
                  <div className="text-right">
                    <p className="font-metadata text-metadata text-antique-gold">09:15</p>
                    <p className="font-metadata text-[9px] text-outline">HOJE</p>
                  </div>
                </li>
                <li className="bg-surface-container-lowest border border-outline-variant p-4 flex items-center gap-4 hover:border-antique-gold transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant w-full h-full flex items-center justify-center">person</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-title-md text-body-lg text-deep-burgundy group-hover:text-stamp-red transition-colors">Ana Beatriz Costa</h4>
                    <p className="font-metadata text-metadata text-on-surface-variant">ID: PC-1042 • Capítulo 04</p>
                  </div>
                  <div className="text-right">
                    <p className="font-metadata text-metadata text-antique-gold">14:30</p>
                    <p className="font-metadata text-[9px] text-outline">ONTEM</p>
                  </div>
                </li>
              </ul>
              <button className="w-full mt-4 py-2 border-b border-outline-variant text-center font-label-caps text-label-caps text-deep-burgundy hover:text-antique-gold transition-colors">
                Ver Histórico Completo
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
