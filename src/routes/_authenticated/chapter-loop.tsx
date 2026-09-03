import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { CheckoutAuditTrail, useCheckoutAudit } from "@/components/checkout-audit-trail";

const pageCss = `
  .animate-stamp {
    animation: stampIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  @keyframes stampIn {
    0% { transform: scale(1.4) rotate(-10deg); opacity: 0; }
    60% { transform: scale(0.92) rotate(2deg); opacity: 1; }
    80% { transform: scale(1.04) rotate(-1deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes confettiFall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(120px) rotate(720deg); opacity: 0; }
  }
  .confetti-particle {
    animation: confettiFall 1.4s ease-in forwards;
  }
`;

type Product = { id: string; name: string };
type ScalpCondition = "normal" | "oleoso" | "seco" | "sensivel";

export const Route = createFileRoute("/_authenticated/chapter-loop")({
  head: () => ({
    meta: [
      { title: "Chapter Loop — Passaporte Capilar™" },
      { name: "description", content: "Fechamento do capítulo e programação do próximo destino da jornada da cliente." },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { events, record } = useCheckoutAudit("carimbo");

  // ── Diagnosis state ──────────────────────────────────────────
  const [porosity, setPorosity] = useState<"baixa" | "media" | "alta">("media");
  const [elasticity, setElasticity] = useState<"excelente" | "boa" | "ruim" | "critica">("boa");
  const [scalpConditions, setScalpConditions] = useState<Set<ScalpCondition>>(
    new Set(["normal"])
  );
  const [diagnosisNotes, setDiagnosisNotes] = useState("");

  // ── Execution Ledger state ───────────────────────────────────
  const [formula, setFormula] = useState("");
  const [technique, setTechnique] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Olaplex No. 1" },
    { id: "2", name: "Wella Blondor" },
    { id: "3", name: "Máscara Nutritiva Kérastase" },
  ]);
  const [newProduct, setNewProduct] = useState("");
  const [planNotes, setPlanNotes] = useState("");
  const [currentObjective, setCurrentObjective] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");

  // ── Stamp state ──────────────────────────────────────────────
  const [stamped, setStamped] = useState(false);
  const [stamping, setStamping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // ── Next Destination state ───────────────────────────────────
  const [recommendedTreatment, setRecommendedTreatment] = useState("Cronograma Capilar - Reconstrução");
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0] ?? "";
  });

  // ── Diagnosis handlers ───────────────────────────────────────
  const toggleScalp = useCallback((cond: ScalpCondition) => {
    setScalpConditions((prev) => {
      const next = new Set(prev);
      if (next.has(cond)) {
        if (next.size > 1) next.delete(cond);
      } else {
        next.add(cond);
      }
      return next;
    });
  }, []);

  // ── Products handlers ────────────────────────────────────────
  const addProduct = useCallback(() => {
    const trimmed = newProduct.trim();
    if (!trimmed) return;
    setProducts((prev) => [...prev, { id: Date.now().toString(), name: trimmed }]);
    setNewProduct("");
  }, [newProduct]);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ── Stamp handler ────────────────────────────────────────────
  const handleStamp = useCallback(async () => {
    setStamping(true);
    setShowConfetti(true);

    await new Promise((r) => setTimeout(r, 600));

    try {
      await record.mutateAsync({
        chapter: "Carimbo aplicado no Chapter Loop",
        details: {
          treatment: recommendedTreatment,
          returnDate,
          productsCount: products.length,
        },
      });
    } catch {
      // stamp still animates even if logging fails
    }

    setStamped(true);
    setStamping(false);

    setTimeout(() => setShowConfetti(false), 1500);
  }, [record, recommendedTreatment, returnDate, products.length]);

  // ── Confetti particles ───────────────────────────────────────
  const confettiColors = ["#C5A059", "#4A0E0E", "#8B0000", "#D4AF37", "#F9F6F0"];
  const confettiPieces = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: confettiColors[i % confettiColors.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.6}s`,
    size: `${6 + Math.random() * 8}px`,
    rotate: Math.random() * 360,
  }));

  return (
    <div className="bg-parchment-white text-on-surface antialiased min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      {/* ── Top nav ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 border-b border-outline-variant bg-parchment-white/80 backdrop-blur-md hidden md:flex">
        <div className="flex justify-between items-center h-16 px-margin-desktop w-full">
          <div />
          <div className="font-display-lg text-display-lg text-deep-burgundy tracking-tight absolute left-1/2 -translate-x-1/2">
            Passaporte Capilar™
          </div>
          <div className="flex items-center gap-6">
            <button className="text-deep-burgundy hover:bg-surface-container-low rounded-full transition-all p-2 flex items-center justify-center">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-deep-burgundy hover:bg-surface-container-low rounded-full transition-all p-2 flex items-center justify-center">
              <span className="material-symbols-outlined">history_edu</span>
            </button>
            <button className="bg-deep-burgundy text-antique-gold px-6 py-2 rounded-full font-label-caps text-label-caps uppercase hover:bg-primary transition-colors">
              Modo Passaporte
            </button>
            <img
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJcuxCp3RYunInT6PdbWSUWOhP_46Rd9JaP70e16tEF0CuUJthGulVhEGz6JCSd6r5oJrZwhh9KBGOSvOc-1feJz6etXJapalAR6fcMjCyE8rihRF7sf63tPsYHzji5kQP85vzSbzW8r1FigEV3xBrEDr0rwTfrHutBNUFHYYzLHOanxlLZbQRD9PknUngGiiv59rsDxZjZY_O4WYJnhr0pBtuUWdYaTCtvaiTOU5nAqHuP2DxsO_r"
            />
          </div>
        </div>
      </nav>

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white hidden md:flex">
        <div className="flex flex-col h-full py-8 px-4 w-full">
          <div className="mb-10 text-center px-4">
            <img
              alt="Professional Stylist Avatar"
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-antique-gold p-0.5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs2XpjW5f8a3AK9jJhKcSqz1q1XoV5xGWBioS7ujkPcBD35dxcSPv6LViRePgUFpHlvK74CutYWE_84V0WNEkjGxYXUFYcNni7uEfo0SA3qyl8A-nvE3Qww1IcAdUEqG0WILoPrNhtxUF-uTVUK9mE2W8L_YXi1Ty2Et-R_2psCg4k-feQpwpRgs8BgkZwyNswo1cNn7qFRPIoUSOPh3hZbPbNFuTOqO3CZA9nf3FetSU-36B4cuDK"
            />
            <h2 className="font-display-lg text-display-lg text-deep-burgundy tracking-tight text-xl leading-none mb-1">
              Passaporte Capilar™
            </h2>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px]">
              Consul de Beleza
            </p>
          </div>
          <nav className="flex-1 space-y-2">
            {[
              { icon: "dashboard", label: "Visão Geral" },
              { icon: "group", label: "Clientes" },
              { icon: "style", label: "Passaportes", active: true },
              { icon: "calendar_today", label: "Programas" },
              { icon: "auto_awesome", label: "Brand Studio" },
              { icon: "settings", label: "Configurações" },
            ].map(({ icon, label, active }) => (
              <button
                key={label}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all rounded-lg ${
                  active
                    ? "bg-secondary-container text-on-secondary-container font-bold scale-[0.98]"
                    : "text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined">{icon}</span>
                <span className="font-title-md text-base">{label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-6 border-t border-outline-variant space-y-4">
            <button className="w-full bg-deep-burgundy text-antique-gold py-3 rounded border border-transparent font-label-caps text-label-caps uppercase hover:bg-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              Novo Atendimento
            </button>
            <div className="flex justify-between px-2">
              {["help_outline", "logout"].map((icon) => (
                <button key={icon} className="text-on-surface-variant hover:text-deep-burgundy transition-colors p-2 rounded hover:bg-surface-container-high">
                  <span className="material-symbols-outlined">{icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────── */}
      <main className="md:ml-64 pt-16 min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-margin-desktop py-12">

          {/* Header */}
          <header className="mb-chapter-gap flex justify-between items-end border-b border-outline-variant pb-6">
            <div>
              <h1 className="font-display-lg text-display-lg text-deep-burgundy mb-2">Chapter Loop</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Technical Record & Execution Ledger</p>
            </div>
            <div className="font-display-lg text-display-lg text-antique-gold opacity-50">01</div>
          </header>

          {/* Client info banner */}
          <section className="mb-chapter-gap grid grid-cols-12 gap-gutter items-center bg-surface-container-lowest p-8 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-surface-container-high">
            <div className="col-span-12 md:col-span-8 flex items-center gap-6">
              <div className="relative">
                <img
                  alt="Client Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-highest"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe7aHZMnVdYLFmBGNGbGpDoLCdyUWDCmng6ZWqi7OeF2CoHBAdQQxNru20x4DvzCrKQQ8hDxDjom8fjGnPPw10Q0-K5h7swSVFKR9MUlrzKIjFwjy1CPMy7sKpRCsnvt9EsIiCubGU8zCuzAkJvbLiXP_Fku9DdY5R-H8OUM47-E1dhB62MhGTCQZaeQsv0IfxFnDkBLuGQB4AQgvtt8n7N38wOP9sU6NyrxLk3buzUV3cj2oKHzbc"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-antique-gold rounded-full border-2 border-surface-container-lowest" />
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-antique-gold uppercase tracking-widest mb-1">Check-in Concluído</div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Ana Silva</h2>
                <div className="flex items-center gap-4 mt-2 text-on-surface-variant font-metadata text-metadata">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>14:30 BRT
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">badge</span>Thaynara Rodrigues
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <div className="p-4 bg-parchment-white border border-outline-variant rounded flex flex-col items-end">
                <span className="font-metadata text-metadata text-on-surface-variant uppercase mb-1">ID do Passaporte</span>
                <span className="font-metadata text-metadata text-deep-burgundy tracking-[0.2em]">PC-2024-892A</span>
              </div>
            </div>
          </section>

          {/* ── Section 02: Diagnosis ──────────────────────────────── */}
          <section className="mb-chapter-gap relative">
            <div className="absolute top-0 right-0 font-display-lg text-display-lg text-antique-gold opacity-30 -mt-8">02</div>
            <h3 className="font-title-md text-title-md text-deep-burgundy border-b border-outline-variant pb-4 mb-8">Diagnosis & Assessment</h3>

            {/* Condition + Objective row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-8">
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Condição Atual</label>
                <textarea
                  className="w-full bg-parchment-white border border-outline-variant rounded p-4 font-body-lg text-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy resize-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]"
                  placeholder="Descreva a porosidade, elasticidade e histórico químico..."
                  rows={4}
                  value={currentCondition}
                  onChange={(e) => setCurrentCondition(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Objetivo</label>
                <textarea
                  className="w-full h-[calc(100%-28px)] bg-[#F0EDE4] border-none rounded p-6 font-body-sm text-body-sm text-on-surface focus:ring-1 focus:ring-deep-burgundy resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]"
                  placeholder="Defina as etapas técnicas do procedimento..."
                  value={currentObjective}
                  onChange={(e) => setCurrentObjective(e.target.value)}
                />
              </div>
            </div>

            {/* Structural analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface-container-lowest p-6 rounded-lg border border-outline-variant mb-6">
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-3">Nível de Porosidade</label>
                <div className="flex gap-2">
                  {(["baixa", "media", "alta"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPorosity(p)}
                      className={`flex-1 py-2 rounded border text-sm font-body-sm transition-all ${
                        porosity === p
                          ? "bg-deep-burgundy text-antique-gold border-deep-burgundy"
                          : "border-outline-variant text-on-surface hover:border-deep-burgundy"
                      }`}
                    >
                      {p === "baixa" ? "Baixa" : p === "media" ? "Média" : "Alta"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-3">Elasticidade</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["excelente", "boa", "ruim", "critica"] as const).map((e) => (
                    <button
                      key={e}
                      onClick={() => setElasticity(e)}
                      className={`py-2 rounded border text-sm font-body-sm transition-all ${
                        elasticity === e
                          ? "bg-deep-burgundy text-antique-gold border-deep-burgundy"
                          : "border-outline-variant text-on-surface hover:border-deep-burgundy"
                      }`}
                    >
                      {e === "excelente" ? "Excelente" : e === "boa" ? "Boa" : e === "ruim" ? "Baixa" : "Crítica"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scalp conditions */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-3">Condição do Couro Cabeludo</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(["normal", "oleoso", "seco", "sensivel"] as const).map((cond) => (
                  <button
                    key={cond}
                    onClick={() => toggleScalp(cond)}
                    className={`py-3 rounded border text-sm font-body-sm transition-all ${
                      scalpConditions.has(cond)
                        ? "bg-deep-burgundy text-antique-gold border-deep-burgundy"
                        : "border-outline-variant text-on-surface hover:border-deep-burgundy"
                    }`}
                  >
                    {cond === "normal" ? "Normal / Saudável" : cond === "oleoso" ? "Oleoso" : cond === "seco" ? "Seco / Descamativo" : "Sensível / Irritado"}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6">
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Observações Técnicas</label>
              <textarea
                className="w-full bg-parchment-white border border-outline-variant rounded p-4 font-body-lg text-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy resize-none"
                placeholder="Detalhes adicionais sobre histórico químico recente, incompatibilidades ou notas para a execução..."
                rows={3}
                value={diagnosisNotes}
                onChange={(e) => setDiagnosisNotes(e.target.value)}
              />
            </div>
          </section>

          {/* ── Section 03: Execution Ledger ─────────────────────────── */}
          <section className="mb-chapter-gap relative">
            <div className="absolute top-0 right-0 font-display-lg text-display-lg text-antique-gold opacity-30 -mt-8">03</div>
            <h3 className="font-title-md text-title-md text-deep-burgundy border-b border-outline-variant pb-4 mb-8">Execution Ledger</h3>

            <div className="bg-surface-container-highest p-6 rounded-lg border border-outline-variant">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Fórmula Aplicada</label>
                    <div className="font-metadata text-metadata text-on-surface flex items-center bg-parchment-white border border-outline-variant rounded px-4 py-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                      <span className="material-symbols-outlined text-antique-gold mr-3">science</span>
                      <input
                        className="w-full bg-transparent border-none focus:ring-0 p-0"
                        placeholder="Ex: 30g 8.0 + 15g 8.1 + 60ml OX 20vol"
                        type="text"
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Técnica</label>
                    <input
                      className="w-full bg-parchment-white border border-outline-variant rounded p-3 font-body-sm text-body-sm focus:ring-1 focus:ring-deep-burgundy shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
                      placeholder="Ex: Freehand Balayage"
                      type="text"
                      value={technique}
                      onChange={(e) => setTechnique(e.target.value)}
                    />
                  </div>
                </div>

                {/* Products list */}
                <div className="col-span-1 border-t md:border-t-0 md:border-l border-outline-variant pt-6 md:pt-0 md:pl-6">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">Produtos Principais</label>
                  <ul className="space-y-3 font-body-sm text-body-sm max-h-36 overflow-y-auto">
                    {products.map((p) => (
                      <li key={p.id} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-antique-gold rounded-full flex-shrink-0" />
                        <span className="flex-1 truncate">{p.name}</span>
                        <button
                          onClick={() => removeProduct(p.id)}
                          className="text-outline hover:text-stamp-red transition-colors flex-shrink-0"
                          aria-label={`Remover ${p.name}`}
                        >
                          <span className="material-symbols-outlined text-base">close</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex gap-1">
                    <input
                      className="flex-1 bg-parchment-white border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-deep-burgundy"
                      placeholder="Nome do produto..."
                      value={newProduct}
                      onChange={(e) => setNewProduct(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addProduct())}
                    />
                    <button
                      onClick={addProduct}
                      className="text-antique-gold hover:text-deep-burgundy transition-colors p-2"
                      aria-label="Adicionar produto"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 04: Finalization ───────────────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter relative">
            <div className="absolute top-0 right-0 font-display-lg text-display-lg text-antique-gold opacity-30 -mt-8">04</div>

            {/* Stamp card */}
            <div className="bg-surface-bright border border-outline-variant rounded-lg p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-4 left-4 font-metadata text-metadata text-on-surface-variant opacity-50">FINALIZATION</div>

              {/* Confetti */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {confettiPieces.map((piece) => (
                    <div
                      key={piece.id}
                      className="confetti-particle absolute rounded-sm"
                      style={{
                        backgroundColor: piece.color,
                        left: piece.left,
                        top: "30%",
                        width: piece.size,
                        height: piece.size,
                        animationDelay: piece.delay,
                        transform: `rotate(${piece.rotate}deg)`,
                      }}
                    />
                  ))}
                </div>
              )}

              <div
                className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-6 relative shadow-[0_4px_12px_rgba(139,0,0,0.15)] bg-parchment-white transition-all duration-500 ${
                  stamped
                    ? "border-stamp-red/40"
                    : stamping
                    ? "border-stamp-red animate-stamp"
                    : "border-stamp-red/20 group hover:border-stamp-red/40 cursor-pointer"
                }`}
              >
                <div
                  className={`absolute inset-2 border rounded-full transition-all duration-500 ${
                    stamped || stamping
                      ? "border-stamp-red/60 rotate-0"
                      : "border-dashed border-stamp-red/30 group-hover:rotate-12"
                  }`}
                />
                {stamped ? (
                  <span className="material-symbols-outlined text-4xl text-stamp-red animate-stamp" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                ) : (
                  <span className="material-symbols-outlined text-4xl text-stamp-red">verified</span>
                )}
              </div>

              <h4 className="font-headline-lg text-headline-lg text-deep-burgundy mb-2">
                {stamped ? "Carimbo Aplicado!" : "Manutenção do Loiro"}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">
                {stamped
                  ? "Validado por Thaynara Rodrigues • " + new Date().toLocaleDateString("pt-BR")
                  : "Aguarde a validação final do profissional"}
              </p>

              {stamped ? (
                <button
                  onClick={() => navigate({ to: "/check-out/carimbado" })}
                  className="bg-deep-burgundy text-antique-gold px-8 py-4 rounded font-label-caps text-label-caps uppercase hover:bg-primary transition-colors flex items-center gap-3 w-full justify-center group"
                >
                  <span className="flex items-center gap-2">
                    Avançar para Check-out
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleStamp}
                  disabled={stamping}
                  className="bg-deep-burgundy text-antique-gold px-8 py-4 rounded font-label-caps text-label-caps uppercase hover:bg-primary transition-colors flex items-center gap-3 w-full justify-center group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    {stamping ? "Carimbando..." : "Carimbar Passaporte"}
                    {!stamping && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                  </span>
                </button>
              )}
            </div>

            {/* Next destination */}
            <div className="bg-parchment-white border-t-2 md:border-t-0 md:border-l-2 border-antique-gold p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-antique-gold">flight_takeoff</span>
                  Próximo Destino
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Tratamento Recomendado</label>
                    <select
                      className="w-full bg-surface-container-highest border-b border-outline-variant rounded-t p-3 font-body-lg text-body-lg focus:ring-0 focus:border-deep-burgundy"
                      value={recommendedTreatment}
                      onChange={(e) => setRecommendedTreatment(e.target.value)}
                    >
                      <option>Cronograma Capilar - Reconstrução</option>
                      <option>Retoque de Raiz</option>
                      <option>Glossing</option>
                      <option>Hidratação Profunda</option>
                      <option>Nutrição Capilar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">Data Sugerida de Retorno</label>
                    <div className="flex items-center gap-4">
                      <input
                        className="bg-surface-container-highest border-b border-outline-variant rounded-t p-3 font-metadata text-metadata focus:ring-0 focus:border-deep-burgundy"
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                      <span className="font-body-sm text-body-sm text-on-surface-variant italic">
                        {(() => {
                          const diff = Math.round((new Date(returnDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                          return diff > 0 ? `Daqui a ${diff} dias` : "Data no passado";
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/50">
                <p className="font-metadata text-metadata text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  O loop será fechado e selado digitalmente após o carimbo.
                </p>
              </div>
            </div>
          </section>

          {/* ── Audit Trail ─────────────────────────────────────────── */}
          <CheckoutAuditTrail
            step="carimbo"
            events={events.data}
            isLoading={events.isLoading}
            error={events.error ? String(events.error) : null}
          />
        </div>
      </main>
    </div>
  );
}
