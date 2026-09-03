import { createFileRoute } from "@tanstack/react-router";

const pageCss = "\n        .qr-scanner-line {\n            position: absolute;\n            width: 100%;\n            height: 2px;\n            background: linear-gradient(90deg, transparent, rgba(197, 160, 89, 0.8), transparent);\n            box-shadow: 0 0 8px rgba(197, 160, 89, 0.5);\n            animation: scan 3s infinite linear;\n            top: 0;\n            left: 0;\n            z-index: 10;\n        }\n\n        @keyframes scan {\n            0% { top: 0; opacity: 0; }\n            10% { opacity: 1; }\n            90% { opacity: 1; }\n            100% { top: 100%; opacity: 0; }\n        }\n\n        .luxury-border {\n            position: relative;\n            background: linear-gradient(135deg, #4A0E0E, #2a0002);\n            padding: 4px;\n            border-radius: 12px;\n            box-shadow: 0 10px 30px rgba(74, 14, 14, 0.2);\n        }\n        \n        .luxury-border::before {\n            content: '';\n            position: absolute;\n            inset: 0;\n            border: 1px solid rgba(197, 160, 89, 0.3);\n            border-radius: 12px;\n            pointer-events: none;\n        }\n\n        .qr-inner {\n            background: #F9F6F0;\n            border-radius: 8px;\n            padding: 16px;\n            position: relative;\n            overflow: hidden;\n        }\n    \n\n    body {\n      min-height: max(884px, 100dvh);\n    }\n  ";

export const Route = createFileRoute("/_authenticated/identidade/cartao")({
  head: () => ({
    meta: [
      { title: "Cartão de Identidade — Passaporte Capilar™" },
      { name: "description", content: "Cartão de identidade capilar com dados essenciais do perfil da cliente." },
      { property: "og:title", content: "Cartão de Identidade — Passaporte Capilar™" },
      { property: "og:description", content: "Cartão de identidade capilar com dados essenciais do perfil da cliente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-parchment-white text-on-background min-h-screen flex flex-col font-body-sm relative selection:bg-antique-gold selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <style>{`body { min-height: 100dvh; }`}</style>
      <header className="flex justify-between items-center px-margin-mobile h-16 w-full z-50 bg-parchment-white docked full-width top-0 border-b border-outline-variant flat no shadows transition-colors duration-300">
        <button className="p-2 -ml-2 text-deep-burgundy hover:text-antique-gold transition-colors focus:outline-none">
          <span className="material-symbols-outlined" data-icon="menu">
            menu
          </span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-deep-burgundy tracking-tight">
          Passaporte Capilar™
        </h1>
        <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
          <img alt="Client Portrait" className="w-full h-full object-cover" data-alt="A small, elegant portrait of a woman with well-styled hair, serving as a profile avatar. High fashion lighting, luxurious studio background in light mode, soft elegant skin tones, perfectly exposed, premium beauty salon aesthetic, 8k resolution, photorealistic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-YO-ryrtLGIaTiVHtmUcWQEvgFzy68fiJGPHfwO_HL4wOH25oC-9KnoVFKRxw2SbgkHiLWxJICQeASIDIzPxL7FRpYU86U_z85dTqIS0Vw5ypwxs2h1ALFz1AH2pKxj0tBRtb4vCYLANZI0HbSO_jMknRzpUm2h0xCsAHeoVGVFrISscdrtPPhyWyUTVdWF0Gz-bg6f4gLNLFyp2DNYzr-cnuHJgkcih3lYX0P5LDdfTTjon2MnM-" />
        </div>
      </header>
      <main className="flex-grow px-margin-mobile pt-8 pb-32 flex flex-col items-center max-w-lg mx-auto w-full">
        <div className="text-center mb-10 w-full animate-fade-in-up">
          <h2 className="font-title-md text-title-md text-on-surface-variant mb-2 uppercase tracking-widest">
            Meus Dados
          </h2>
          <div className="h-[1px] w-12 bg-antique-gold mx-auto opacity-50"></div>
        </div>
        <div className="w-full max-w-[280px] mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="luxury-border">
            <div className="qr-inner flex flex-col items-center justify-center">
              <div className="w-full aspect-square relative mb-4 flex items-center justify-center border border-outline-variant/30 bg-white">
                <div className="qr-scanner-line"></div>
                <img alt="QR Code Passaporte" className="w-[85%] h-[85%] object-contain" data-alt="A high-contrast, intricately designed QR code, crisp and clear. The QR code features subtle integrated design elements suggesting luxury and security, perhaps a faint watermark of a seal in the background. It is presented on a clean, bright white background, evenly lit, ultra-sharp focus, professional graphic design aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLVV22xtw6u1egWO4OqPQPfvHwmVulkQdVFAYjweq4wNwVKRAoIhi3aGPc2wc4dBG1r6zpV0nT5JdSNpGyl3D5IN7dSGOP_cntm-_5m-PLn5WOPQ4hczlu2gPdaBRONQI6zCFaWG47cBLbwz3g6i9_5BP7SkqJHqGFmHUx0E7Zgx4xTAciXm8bGZkFgbXGQMUynV2NE-oVmXHSuB_SigJAJgIVHaY4xy3qTykmXKDkDlGnsUoOoSi7" />
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-antique-gold"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-antique-gold"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-antique-gold"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-antique-gold"></div>
              </div>
              <div className="text-center w-full mt-2">
                <p className="font-metadata text-metadata text-outline tracking-widest uppercase mb-1">
                  ID: PC-2026
                </p>
                <p className="font-label-caps text-label-caps text-deep-burgundy">
                  Validar Sessão
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#F0EDE4] border border-outline-variant/50 rounded-xl p-6 shadow-sm mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-deep-burgundy mb-1">
                Ana Silva
              </h3>
              <p className="font-metadata text-metadata text-antique-gold uppercase tracking-wider">
                Edição Diplomática
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-antique-gold/30 flex items-center justify-center bg-parchment-white text-antique-gold">
              <span className="material-symbols-outlined" data-icon="verified_user">
                verified_user
              </span>
            </div>
          </div>
          <div className="h-[1px] w-full bg-outline-variant/40 my-4"></div>
          <div className="flex justify-between items-end">
            <div>
              <p className="font-metadata text-metadata text-on-surface-variant mb-1">
                ÚLTIMO CARIMBO
              </p>
              <p className="font-body-sm text-body-sm text-deep-burgundy">
                15 Nov, 2023
              </p>
            </div>
            <div className="text-right">
              <p className="font-metadata text-metadata text-on-surface-variant mb-1">
                STATUS
              </p>
              <p className="font-body-sm text-body-sm text-security-blue flex items-center gap-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-security-blue animate-pulse"></span>
                Ativo
              </p>
            </div>
          </div>
        </div>
        <div className="text-center px-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <p className="font-metadata text-metadata text-outline flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[14px]" data-icon="lock">
              lock
            </span>
            Este código é renovado a cada sessão para sua segurança.
          </p>
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-deep-burgundy docked full-width bottom-0 rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.15)] md:hidden">
        <button className="flex flex-col items-center justify-center text-antique-gold bg-primary-container/20 rounded-xl p-2 scale-95 duration-200 transition-all focus:outline-none w-16">
          <span className="material-symbols-outlined mb-1" data-icon="menu_book" style={{ fontVariationSettings: "'FILL' 1" }}>
            menu_book
          </span>
          <span className="font-label-caps text-[10px] leading-tight text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
            Passport
          </span>
        </button>
        <button className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all focus:outline-none w-16">
          <span className="material-symbols-outlined mb-1" data-icon="history_edu">
            history_edu
          </span>
          <span className="font-label-caps text-[10px] leading-tight text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
            History
          </span>
        </button>
        <button className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all focus:outline-none w-16 relative">
          <span className="material-symbols-outlined mb-1" data-icon="chat_bubble">
            chat_bubble
          </span>
          <span className="absolute top-1 right-2 w-2 h-2 bg-antique-gold rounded-full border border-deep-burgundy"></span>
          <span className="font-label-caps text-[10px] leading-tight text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
            Messages
          </span>
        </button>
        <button className="flex flex-col items-center justify-center text-parchment-white/60 p-2 hover:text-antique-gold transition-all focus:outline-none w-16">
          <span className="material-symbols-outlined mb-1" data-icon="account_circle">
            account_circle
          </span>
          <span className="font-label-caps text-[10px] leading-tight text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
            Profile
          </span>
        </button>
      </nav>
      <style dangerouslySetInnerHTML={{ __html: "\n        @keyframes fadeInUp {\n            from {\n                opacity: 0;\n                transform: translateY(10px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        .animate-fade-in-up {\n            animation: fadeInUp 0.6s ease-out forwards;\n            opacity: 0;\n        }\n    " }} />
    </div>
  );
}
