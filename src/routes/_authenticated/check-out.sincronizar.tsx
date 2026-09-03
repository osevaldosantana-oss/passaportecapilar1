import { createFileRoute } from "@tanstack/react-router";
import { CheckoutAuditTrail, useCheckoutAudit } from "@/components/checkout-audit-trail";

const pageCss = "\n        .wax-seal-shadow {\n            filter: drop-shadow(0px 4px 12px rgba(139, 0, 0, 0.15));\n        }\n        .debossed-input {\n            box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.05);\n            background-color: #F0EDE4;\n        }\n        .passport-container {\n            aspect-ratio: 1 / 1.414;\n        }\n    ";

export const Route = createFileRoute("/_authenticated/check-out/sincronizar")({
  head: () => ({
    meta: [
      { title: "Sincronizar Passaporte — Passaporte Capilar™" },
      { name: "description", content: "Revise o resumo do capítulo e sincronize o passaporte com o dispositivo da cliente." },
      { property: "og:title", content: "Sincronizar Passaporte — Passaporte Capilar™" },
      { property: "og:description", content: "Revise o resumo do capítulo e sincronize o passaporte com o dispositivo da cliente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { events, record } = useCheckoutAudit("sincronizacao");
  const chapter = "Capítulo 04: Reconstrução Cortex-Lipídica";
  return (
    <div className="bg-parchment-white text-on-surface font-body-lg antialiased min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      

<nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white flex-col py-8 px-4 z-50">
<div className="mb-12 px-4">
<h1 className="font-display-lg text-display-lg text-deep-burgundy tracking-tight">Passaporte Capilar™</h1>
<p className="font-metadata text-metadata text-on-surface-variant uppercase tracking-widest mt-2">Consul de Beleza</p>
</div>
<div className="flex-1 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-title-md text-title-md" href="#">
<span className="material-symbols-outlined">dashboard</span>
                Visão Geral
            </a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold font-title-md text-title-md scale-[0.98] transition-transform duration-150 ease-in-out" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                Clientes
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-title-md text-title-md" href="#">
<span className="material-symbols-outlined">style</span>
                Passaportes
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-title-md text-title-md" href="#">
<span className="material-symbols-outlined">calendar_today</span>
                Programas
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-title-md text-title-md" href="#">
<span className="material-symbols-outlined">auto_awesome</span>
                Brand Studio
            </a>
</div>
<div className="mt-auto space-y-2 border-t border-outline-variant pt-4">
<button className="w-full flex items-center justify-center gap-2 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-3 rounded-DEFAULT hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined text-[18px]">add</span>
                Novo Atendimento
            </button>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-title-md text-title-md mt-4" href="#">
<span className="material-symbols-outlined">settings</span>
                Configurações
            </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-title-md text-title-md" href="#">
<span className="material-symbols-outlined">logout</span>
                Sair
            </a>
</div>
</nav>

<header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-parchment-white/90 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop z-40">
<div className="flex items-center gap-4">
<button className="md:hidden text-deep-burgundy p-2">
<span className="material-symbols-outlined">menu</span>
</button>
<h2 className="font-label-caps text-label-caps text-deep-burgundy hidden md:block">CLIENTES / CHECK-OUT</h2>
</div>
<div className="flex items-center gap-6">
<button className="flex items-center gap-2 text-deep-burgundy font-label-caps text-label-caps hover:bg-surface-container-low px-4 py-2 rounded-full transition-all">
<span className="material-symbols-outlined">history_edu</span>
                MODO PASSAPORTE
            </button>
<button className="text-on-surface-variant hover:text-deep-burgundy transition-colors p-2 rounded-full hover:bg-surface-container-low">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A small, circular avatar portrait of a sophisticated beauty professional with a neutral expression, warm studio lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrZM-CK9vFHYdV8vKbKc66AhBSHc09LNKKwls5roYsRAuC4Umx3HJOgG2-_dSJQ-PkHqDxGqJ_EvViF4iN-lC69Y8Lvvzr_0x0OIaA3ECWBWez0upxnxF9Ognw5p-s0mDOpIV5rse61fcvZice0GzKIdOOS9DG9VvmN-2KDKDGqxfvmngq3Ub8VAaXaSZmC5TDRdZ_h242CD7hmfIZRhllr8nsnSVVzk8nqDYbnojkUpeyrsu0cSU_" />
</div>
</div>
</header>

<main className="pt-24 pb-24 md:pl-64 md:px-margin-desktop px-margin-mobile max-w-7xl mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-7 flex justify-center">
<div className="relative w-full max-w-lg passport-container bg-[#4A0E0E] rounded-lg shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-[#3A0A0A] overflow-hidden group">

<div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" data-alt="A subtle, dark leather texture with fine grain, suitable for a luxury book cover, evenly lit." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0yFGvh2RiJJpicWPEODRfChfi9gyEjE76YdBNAuKrAsl9Ld5Z2z55eQfS-W2pKdj2Up2EdIC5T90cfkqqEIgSCLNAzg5UFc9hAR3tD9n7X2M44oQ3zKCtunJLBegNChYhQbyWFLKu-7jAGc5Y-JF0IMaSaWHOPhIXMu2enaq8k-lbZsvZM3OfgHOheFU9rXL_MbYvofQn4cXNAvw3lIpXgxWjpHKi3JOtt8Hdx7libPpHKptq-P43')" }}></div>

<div className="absolute inset-4 border border-antique-gold/30 rounded-DEFAULT pointer-events-none"></div>

<div className="relative z-10 flex flex-col items-center mb-8 transform group-hover:scale-105 transition-transform duration-700 ease-out">
<img alt="Ceremonial Wax Seal" className="w-48 h-48 object-contain wax-seal-shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZyxeHQE2smF1Gv9DDtXXW6boTvdE6bP9QCzHgM3KjsMYmKnTHdYG4NMxwR4jMUNlcoX1-y8igTV8NKHnew1W5lBFxz-S_wsLBfinycnGQgEyDs5oOUCsf-dNcDBhdppOX_WRKNx8AHTa9uuSvWtYW6w0c2dh_rgxxz3hwvveLF7f0M7hIWKrpFjRGHOVQNEhjvoxZCLWgh4r-cbpKdu4iZ8Yk8jaRDWEsnWzwFQAj4YHQTDFzpYWegizdSGxSc_tBA" />
</div>
<div className="relative z-10 text-center space-y-6 w-full">
<div className="space-y-2">
<h3 className="font-display-lg text-headline-lg text-antique-gold uppercase tracking-widest border-b border-antique-gold/20 pb-4 inline-block px-8">
                                Carimbo Oficial
                            </h3>
</div>
<div className="grid grid-cols-2 gap-4 text-center font-metadata text-metadata text-parchment-white/80 uppercase">
<div>
<p className="text-antique-gold mb-1">Data de Validação</p>
<p className="text-sm">24 Out 2023</p>
</div>
<div>
<p className="text-antique-gold mb-1">Consul</p>
<p className="text-sm">Thaynara Rodrigues</p>
</div>
</div>
<div className="mt-8 border border-antique-gold/40 rounded-DEFAULT p-3 bg-black/20 backdrop-blur-sm mx-auto w-3/4">
<p className="font-metadata text-metadata text-antique-gold uppercase tracking-[0.2em]">ID: PC-2026 • Classificado</p>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-chapter-gap mt-12 lg:mt-0">

<section className="relative">
<div className="absolute -top-6 right-0 font-display-lg text-headline-lg text-antique-gold/30 select-none">Capítulo 04</div>
<h4 className="font-title-md text-title-md text-deep-burgundy mb-6 border-b border-outline-variant pb-2">Resumo do Capítulo</h4>
<div className="space-y-4">
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/50">
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Tratamento Realizado</label>
<p className="font-body-lg text-on-surface">Reconstrução Profunda Cortex-Lipídica</p>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/50">
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Porosidade</label>
<p className="font-body-lg text-on-surface flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-antique-gold"></span>
                                    Estabilizada
                                </p>
</div>
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/50">
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Elasticidade</label>
<p className="font-body-lg text-on-surface flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-antique-gold"></span>
                                    Restaurada
                                </p>
</div>
</div>
</div>
</section>

<section>
<h4 className="font-title-md text-title-md text-deep-burgundy mb-6 border-b border-outline-variant pb-2">Próximo Destino</h4>
<div className="space-y-4">
<div>
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Intervalo Recomendado (Dias)</label>
<input className="w-full debossed-input border-none rounded-DEFAULT p-3 font-metadata text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:outline-none transition-shadow" type="number" defaultValue="21" />
</div>
<div>
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Objetivo Primário</label>
<select className="w-full debossed-input border-none rounded-DEFAULT p-3 font-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:outline-none transition-shadow appearance-none">
<option>Nutrição Celular</option>
<option>Hidratação Intensiva</option>
<option>Manutenção de Cor</option>
</select>
</div>
</div>
</section>

<section>
<h4 className="font-title-md text-title-md text-deep-burgundy mb-6 border-b border-outline-variant pb-2">Prescrição Home Care</h4>
<textarea className="w-full debossed-input border-none rounded-DEFAULT p-4 font-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:outline-none transition-shadow resize-none" placeholder="Recomendações para manutenção..." rows={3} defaultValue="Uso contínuo do Sérum Selador Noturno. Evitar fontes de calor acima de 180°C nos próximos 7 dias." />
</section>

<div className="pt-8 mt-auto">
<button className="w-full flex items-center justify-center gap-3 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-5 rounded-DEFAULT hover:bg-primary-container transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
<span className="material-symbols-outlined">sync</span>
                        Sincronizar Passaporte
                    </button>
<p className="text-center font-metadata text-metadata text-on-surface-variant mt-4">Os dados serão criptografados e enviados ao dispositivo do cliente.</p>
</div>
</div>
</div>
</main>

    </div>
  );
}
