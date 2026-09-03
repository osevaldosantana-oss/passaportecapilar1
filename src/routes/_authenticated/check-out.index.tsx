import { createFileRoute } from "@tanstack/react-router";
import { CheckoutAuditTrail, useCheckoutAudit } from "@/components/checkout-audit-trail";

const pageCss = "\n        body { background-color: #F9F6F0; }\n        .bg-pattern {\n            background-image: radial-gradient(#dac1bf 1px, transparent 1px);\n            background-size: 20px 20px;\n        }\n        .stamp-seal {\n            box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15);\n        }\n        .chapter-border {\n            border-bottom: 1px solid #dac1bf;\n        }\n        .debossed-input {\n            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);\n            background-color: #F0EDE4;\n        }\n    ";

export const Route = createFileRoute("/_authenticated/check-out/")({
  head: () => ({
    meta: [
      { title: "Check-out & Carimbo — Passaporte Capilar™" },
      { name: "description", content: "Finalize o atendimento, registre o resumo do capítulo e carimbe o passaporte da cliente." },
      { property: "og:title", content: "Check-out & Carimbo — Passaporte Capilar™" },
      { property: "og:description", content: "Finalize o atendimento, registre o resumo do capítulo e carimbe o passaporte da cliente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { events, record } = useCheckoutAudit("criacao");
  const chapter = "Capítulo 01: Reconstrução Profunda";
  return (
    <div className="font-body-lg text-on-surface bg-parchment-white min-h-screen antialiased flex">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      

<nav className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white dark:bg-ink-black flex flex-col py-8 px-4 z-50 hidden md:flex">
<div className="mb-12 px-4">
<h1 className="font-display-lg text-display-lg text-deep-burgundy dark:text-antique-gold tracking-tight">Passaporte Capilar™</h1>
<p className="font-title-md text-title-md font-label-caps text-label-caps text-on-surface-variant mt-2">Consul de Beleza</p>
</div>
<div className="flex-1 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg group" href="#">
<span className="material-symbols-outlined group-hover:scale-[0.98] transition-transform duration-150 ease-in-out">dashboard</span>
<span className="font-title-md text-title-md font-label-caps text-label-caps">Visão Geral</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg group" href="#">
<span className="material-symbols-outlined group-hover:scale-[0.98] transition-transform duration-150 ease-in-out">group</span>
<span className="font-title-md text-title-md font-label-caps text-label-caps">Clientes</span>
</a>

<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold scale-[0.98] transition-transform duration-150 ease-in-out" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>style</span>
<span className="font-title-md text-title-md font-label-caps text-label-caps">Passaportes</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg group" href="#">
<span className="material-symbols-outlined group-hover:scale-[0.98] transition-transform duration-150 ease-in-out">calendar_today</span>
<span className="font-title-md text-title-md font-label-caps text-label-caps">Programas</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg group" href="#">
<span className="material-symbols-outlined group-hover:scale-[0.98] transition-transform duration-150 ease-in-out">auto_awesome</span>
<span className="font-title-md text-title-md font-label-caps text-label-caps">Brand Studio</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg group" href="#">
<span className="material-symbols-outlined group-hover:scale-[0.98] transition-transform duration-150 ease-in-out">settings</span>
<span className="font-title-md text-title-md font-label-caps text-label-caps">Configurações</span>
</a>
</div>
<div className="mt-auto space-y-4">
<button className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase py-4 rounded-lg hover:opacity-90 transition-opacity">
                Novo Atendimento
            </button>
<div className="space-y-1">
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-deep-burgundy transition-colors" href="#">
<span className="material-symbols-outlined">help_outline</span>
<span className="font-label-caps text-label-caps">Suporte</span>
</a>
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-deep-burgundy transition-colors" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-caps text-label-caps">Sair</span>
</a>
</div>
<div className="flex items-center gap-3 px-4 pt-4 border-t border-outline-variant">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant">
<img alt="Professional Stylist Avatar" className="w-full h-full object-cover" data-alt="A small, professional avatar portrait of a high-end beauty stylist in a minimal, well-lit studio setting. Warm, natural lighting, luxurious aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-SydTK1sTWCt_XtoqDCnqVERyYxzS5Vr5924LSsEbZshv96ylFZ6R5q4GyJMY2p5EI7m9ZeUnco3NiLMfYZDnq9txqyK5X-wgfp6VY8XUsGs5XEbrb5QdhvwsR1HTLM6s5l2ITXdfPf4cyQOLwoqwe_L692ZnqhLAks2w8ZHBbwcYvznFDg8ON_KZPlzFvK_vToddpaImP27vLzhmfdtu1AszOuUNZf03GIY2jPszb5WXIR2NmuCh" />
</div>
<div>
<p className="font-label-caps text-label-caps text-on-surface">Profissional</p>
<p className="font-metadata text-metadata text-on-surface-variant">ID: PC-2026</p>
</div>
</div>
</div>
</nav>

<header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-parchment-white/80 dark:bg-ink-black/80 backdrop-blur-md flex justify-between items-center px-margin-mobile md:px-margin-desktop z-40">
<div className="flex items-center gap-4">

<button className="md:hidden text-deep-burgundy">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="hidden md:flex items-center border-b border-outline-variant pb-1 w-64">
<span className="material-symbols-outlined text-outline mr-2">search</span>
<input className="bg-transparent border-none focus:ring-0 font-label-caps text-label-caps w-full text-on-surface placeholder:text-outline-variant" placeholder="Buscar cliente ou registro..." type="text" />
</div>
</div>
<div className="flex items-center gap-6">
<button className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low dark:hover:bg-inverse-surface rounded-full p-2 transition-all">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low dark:hover:bg-inverse-surface rounded-full p-2 transition-all">
<span className="material-symbols-outlined">history_edu</span>
</button>
<button className="font-label-caps text-label-caps font-body-lg text-body-lg text-deep-burgundy border-b-2 border-deep-burgundy pb-1 font-bold opacity-80 hover:opacity-100 transition-opacity">
                Modo Passaporte
            </button>
</div>
</header>

<main className="flex-1 md:ml-64 mt-16 p-margin-mobile md:p-margin-desktop bg-pattern min-h-screen">

<div className="max-w-4xl mx-auto mb-chapter-gap text-center">
<h2 className="font-display-lg text-display-lg text-deep-burgundy mb-2">Check-out & Carimbo</h2>
<p className="font-headline-lg text-headline-lg text-antique-gold italic">Capítulo 01: Reconstrução Profunda</p>
<div className="w-24 h-px bg-antique-gold mx-auto mt-6"></div>
</div>
<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-7 space-y-chapter-gap">

<section className="bg-surface-container-lowest p-8 rounded-lg chapter-border relative">
<span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">01</span>
<h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-antique-gold">science</span>
                        Resumo do Capítulo
                    </h3>
<div className="space-y-4">
<div>
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Fórmula Executada</label>
<div className="p-4 debossed-input rounded border border-outline-variant/30 font-metadata text-metadata text-on-surface">
                                PROTEÍNA HIDROLISADA 15ML + AMINOÁCIDOS ESSENCIAIS 10ML<br />
                                TEMPO DE PAUSA: 20 MINUTOS<br />
                                FONTE DE CALOR: VAPOR DE OZÔNIO
                            </div>
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Diagnóstico Inicial</label>
<div className="p-3 debossed-input rounded border border-outline-variant/30 font-body-sm text-body-sm text-on-surface">
                                    Porosidade Nível 3, Ruptura Leve.
                                </div>
</div>
<div>
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Resultado Atingido</label>
<div className="p-3 debossed-input rounded border border-outline-variant/30 font-body-sm text-body-sm text-on-surface text-green-800">
                                    Fibra selada, resistência recuperada.
                                </div>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-8 rounded-lg chapter-border relative">
<span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">04</span>
<h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-antique-gold">prescriptions</span>
                        Orientações Home Care
                    </h3>
<div className="space-y-4">
<div>
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Prescrição Domiciliar</label>
<textarea className="w-full p-4 debossed-input rounded border border-outline-variant/30 font-body-lg text-body-lg text-on-surface min-h-[120px] focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy outline-none resize-none" placeholder="Detalhe os produtos e rotina indicados para manutenção..." />
</div>
<button className="flex items-center gap-2 text-deep-burgundy font-label-caps text-label-caps hover:text-antique-gold transition-colors">
<span className="material-symbols-outlined text-sm">add</span> Adicionar Produto da Linha
                        </button>
</div>
</section>
</div>

<div className="md:col-span-5 space-y-chapter-gap">

<section className="bg-surface-container-highest p-8 rounded-lg chapter-border relative text-center">
<span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">02</span>
<h3 className="font-title-md text-title-md text-deep-burgundy mb-2">O Ritual do Carimbo</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-8">Sele a jornada e valide o passaporte capilar da sua cliente.</p>
<div className="flex justify-center mb-8 relative">

<div className="w-48 h-48 rounded-full border-4 border-stamp-red/20 flex items-center justify-center relative cursor-pointer group hover:scale-105 transition-transform duration-300">
<div className="w-40 h-40 bg-stamp-red rounded-full stamp-seal flex flex-col items-center justify-center text-parchment-white relative overflow-hidden">

<div className="absolute inset-2 border border-parchment-white/50 rounded-full border-dashed"></div>
<span className="font-label-caps text-[10px] tracking-widest uppercase mb-1">Edição Diplomática</span>
<span className="material-symbols-outlined text-4xl mb-1 text-antique-gold">verified</span>
<span className="font-metadata text-[8px] uppercase">Validado por</span>
<span className="font-label-caps text-xs font-bold">Thaynara R.</span>
</div>

<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-ink-black text-parchment-white font-metadata text-[10px] px-2 py-1 rounded">
                                Clique para Carimbar
                            </div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-8 rounded-lg chapter-border relative">
<span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">03</span>
<h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-antique-gold">flight_takeoff</span>
                        Próximo Destino
                    </h3>
<div className="space-y-4">
<div>
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Data de Retorno Sugerida</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">calendar_month</span>
<input className="w-full pl-10 p-3 debossed-input rounded border border-outline-variant/30 font-body-lg text-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy outline-none" type="date" />
</div>
</div>
<div>
<label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Próximo Capítulo (Foco)</label>
<select className="w-full p-3 debossed-input rounded border border-outline-variant/30 font-body-lg text-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy outline-none appearance-none">
<option>Nutrição Intensiva</option>
<option>Selagem Térmica</option>
<option>Manutenção de Cor</option>
</select>
</div>
</div>
</section>

<div className="pt-4">
<button
  type="button"
  disabled={record.isPending}
  onClick={() => record.mutate({ chapter, details: { origem: "check-out" } })}
  className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps text-lg uppercase py-5 rounded-lg hover:bg-primary-container transition-colors shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
>
<span className="material-symbols-outlined">how_to_reg</span>
                        {record.isPending ? "Registrando..." : "Finalizar e Carimbar"}
                    </button>
<p className="text-center font-metadata text-metadata text-on-surface-variant mt-3">
                        O carimbo registrará esta etapa permanentemente no histórico da cliente.
                    </p>
<CheckoutAuditTrail
  step="criacao"
  events={events.data}
  isLoading={events.isLoading}
  error={events.error ? "Não foi possível carregar o registro de auditoria." : record.error ? "Não foi possível registrar o evento." : null}
/>
</div>
</div>
</div>
</main>


    </div>
  );
}
