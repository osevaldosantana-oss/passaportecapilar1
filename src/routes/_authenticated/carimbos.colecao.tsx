import { createFileRoute } from "@tanstack/react-router";

const pageCss = `
  body { background-color: #1A1A1A; color: #F9F6F0; margin: 0; overflow-x: hidden; }
  .passport-texture {
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.05"/></svg>');
    background-color: #1A1A1A;
  }
  .glass-panel {
    background: rgba(26, 26, 26, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(197, 160, 89, 0.2);
  }
  .stamp-card {
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid rgba(197, 160, 89, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    cursor: pointer;
  }
  .stamp-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 40px rgba(197, 160, 89, 0.15);
    border-color: rgba(197, 160, 89, 0.6);
  }
`;

export const Route = createFileRoute("/_authenticated/carimbos/colecao")({
  head: () => ({
    meta: [
      { title: "Coleção de Carimbos — Passaporte Capilar™" },
      { name: "description", content: "Coleção completa de carimbos conquistados na jornada capilar." },
    ],
  }),
  component: Page,
});

function Page() {
  const stamps = [
    {
      id: 1,
      name: "Diagnóstico Completo",
      subtitle: "Capítulo I",
      icon: "science",
      color: "#C5A059",
      earned: true,
      date: "15 Jan 2026",
      description: "Análise profunda da fibra capilar, diagnóstico técnico e plano personalizado.",
    },
    {
      id: 2,
      name: "Hidratação Profunda",
      subtitle: "Capítulo II",
      icon: "water_drop",
      color: "#4A90A4",
      earned: true,
      date: "22 Jan 2026",
      description: "Reposição de massa hídrica com ativos de alta penetração.",
    },
    {
      id: 3,
      name: "Nutrição Capilar",
      subtitle: "Capítulo III",
      icon: "spa",
      color: "#7B9E5F",
      earned: true,
      date: "05 Fev 2026",
      description: "Infusão lipídica com óleos vegetais selecionados.",
    },
    {
      id: 4,
      name: "Reconstrução",
      subtitle: "Capítulo IV",
      icon: "build",
      color: "#C5A059",
      earned: true,
      date: "18 Fev 2026",
      description: "Restruturação da córtex com complexo proteico avançado.",
    },
    {
      id: 5,
      name: "Selagem Térmica",
      subtitle: "Capítulo V",
      icon: "whatshot",
      color: "#A04A4A",
      earned: false,
      date: null,
      description: "Fechamento das escamas e selamento da cutícula com calor controlado.",
    },
    {
      id: 6,
      name: "Finalização Premium",
      subtitle: "Capítulo VI",
      icon: "auto_awesome",
      color: "#9B7BB8",
      earned: false,
      date: null,
      description: "Finalização de gala com técnicas avançadas de styling.",
    },
    {
      id: 7,
      name: "Maestria Total",
      subtitle: "Conclusão",
      icon: "military_tech",
      color: "#C5A059",
      earned: false,
      date: null,
      description: "Conclusão completa de todos os capítulos da jornada.",
    },
  ];

  const earnedCount = stamps.filter((s) => s.earned).length;
  const progress = Math.round((earnedCount / stamps.length) * 100);

  return (
    <div className="passport-texture min-h-screen pb-8">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      <header className="w-full px-margin-desktop py-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-antique-gold text-3xl">
            collections_bookmark
          </span>
          <div>
            <h1 className="font-display-lg text-display-lg text-antique-gold m-0 leading-none">
              COLEÇÃO DE CARIMBOS
            </h1>
            <p className="font-label-caps text-label-caps text-parchment-white/60 mt-1">
              Sua jornada diplomática
            </p>
          </div>
        </div>
        <div className="glass-panel px-5 py-3 rounded-xl flex items-center gap-4">
          <div className="text-right">
            <p className="font-label-caps text-label-caps text-parchment-white/60">
              Progresso
            </p>
            <p className="font-headline-lg text-headline-lg text-antique-gold">
              {earnedCount}/{stamps.length}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-antique-gold/40 flex items-center justify-center relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(197,160,89,0.2)" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#C5A059"
                strokeWidth="3"
                strokeDasharray={`${progress} 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-label-caps text-label-caps text-antique-gold">
              {progress}%
            </span>
          </div>
        </div>
      </header>

      <main className="px-margin-desktop">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stamps.map((stamp) => (
            <div
              key={stamp.id}
              className={`stamp-card rounded-2xl p-6 flex flex-col items-center text-center ${!stamp.earned ? "opacity-50 grayscale" : ""}`}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-4 relative"
                style={{
                  background: `radial-gradient(circle, ${stamp.color}22 0%, transparent 70%)`,
                  border: `2px solid ${stamp.earned ? stamp.color : "rgba(197,160,89,0.2)"}`,
                  boxShadow: stamp.earned ? `0 0 20px ${stamp.color}44` : "none",
                }}
              >
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ color: stamp.earned ? stamp.color : "rgba(197,160,89,0.3)" }}
                >
                  {stamp.icon}
                </span>
                {stamp.earned && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-antique-gold flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-ink-black" style={{ fontSize: "14px" }}>
                      check
                    </span>
                  </div>
                )}
              </div>
              <p className="font-label-caps text-label-caps text-parchment-white/50 mb-1 uppercase tracking-wider">
                {stamp.subtitle}
              </p>
              <h3 className="font-headline-lg text-headline-lg text-parchment-white mb-2">
                {stamp.name}
              </h3>
              <p className="font-body-sm text-body-sm text-parchment-white/50 mb-3 leading-relaxed">
                {stamp.description}
              </p>
              {stamp.earned && stamp.date && (
                <span className="font-metadata text-metadata text-antique-gold/70 px-3 py-1 bg-antique-gold/10 rounded-full">
                  {stamp.date}
                </span>
              )}
              {!stamp.earned && (
                <span className="font-label-caps text-label-caps text-outline-variant px-3 py-1 border border-outline-variant/30 rounded-full">
                  Bloqueado
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
