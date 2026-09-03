import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const pageCss = `
    .material-symbols-outlined {
        font-family: 'Material Symbols Outlined';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
    }
    
    .inset-shadow {
        box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    }
    
    .wax-seal-shadow {
        box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15);
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #dac1bf;
        border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #877270;
    }

    @keyframes shimmer {
        100% { transform: translateX(100%); }
    }

    .shimmer-effect {
        position: relative;
        overflow: hidden;
    }
    .shimmer-effect::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        transform: translateX(-100%);
    }
    .shimmer-effect:hover::after {
        animation: shimmer 1.5s infinite;
    }

    .active-ingredient-tag {
        animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }

    .checkbox-custom {
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid #877270;
        border-radius: 4px;
        background: #F0EDE4;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
    }
    .checkbox-custom:checked {
        background: #4A0E0E;
        border-color: #4A0E0E;
    }
    .checkbox-custom:checked::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #C5A059;
        font-size: 14px;
        font-weight: bold;
    }
    .checkbox-custom:hover {
        border-color: #4A0E0E;
    }
`;

interface ProtocolStep {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

const BASE_TREATMENTS = [
  "Máscara de Reconstrução Intensa - Lote A4",
  "Máscara de Nutrição Profunda",
  "Máscara Hidratação Profunda",
  "Creme de Tratamento Anticrise",
  "Serum Reconstrutor noturno"
];

const AVAILABLE_ACTIVES = [
  "Queratina",
  "Pantenol",
  "Colágeno",
  "Elastina",
  "Ácido Hialurônico",
  "Proteína da Seda",
  "Extrato de Bambu",
  "Óleo de Argan",
  "Vitamina E"
];

const PROTOCOL_STEPS_INITIAL: ProtocolStep[] = [
  { id: "umido", label: "Aplicação em cabelo úmido", description: "Umidificação em 30% recomendada", checked: true },
  { id: "massagem", label: "Massagem Capilar (Enluvamento)", description: "Mecha a mecha, fricção média", checked: false },
  { id: "calor", label: "Fonte de Calor Utilizada", description: "Vaporizador de Ozônio (10 min)", checked: false },
  { id: "blindagem", label: "Blindagem Térmica Final", description: "Leave-in com proteção UV", checked: false }
];

export const Route = createFileRoute("/_authenticated/atendimento")({
  validateSearch: z.object({
    clientId: z.string().optional(),
    clientName: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Atendimento — Passaporte Capilar™" },
      { name: "description", content: "Registro do atendimento em andamento com serviços, produtos e assinatura do capítulo." },
      { property: "og:title", content: "Atendimento — Passaporte Capilar™" },
      { property: "og:description", content: "Registro do atendimento em andamento com serviços, produtos e assinatura do capítulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { clientId: searchClientId, clientName: searchClientName } = Route.useSearch();
  const clientId = searchClientId ?? "";
  const clientName = searchClientName ?? "Selecione um cliente";
  
  const [baseTreatment, setBaseTreatment] = useState(BASE_TREATMENTS[0]);
  const [activeIngredients, setActiveIngredients] = useState<string[]>(["Queratina", "Pantenol"]);
  const [newActive, setNewActive] = useState("");
  const [proportionBase, setProportionBase] = useState(1);
  const [proportionActive, setProportionActive] = useState(1.5);
  const [pauseMinutes, setPauseMinutes] = useState(20);
  
  const [protocolSteps, setProtocolSteps] = useState<ProtocolStep[]>(PROTOCOL_STEPS_INITIAL);
  
  const [timerSeconds, setTimerSeconds] = useState(pauseMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const sessionRef = useRef<NodeJS.Timeout | null>(null);
  
  const [techNotes, setTechNotes] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<"" | "success" | "error">("");

  useEffect(() => {
    sessionRef.current = setInterval(() => {
      setSessionSeconds(s => s + 1);
    }, 1000);
    return () => {
      if (sessionRef.current) clearInterval(sessionRef.current);
    };
  }, []);

  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatSessionTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const addActiveIngredient = () => {
    const trimmed = newActive.trim();
    if (trimmed && !activeIngredients.includes(trimmed)) {
      setActiveIngredients([...activeIngredients, trimmed]);
      setNewActive("");
    }
  };

  const removeActiveIngredient = (ingredient: string) => {
    setActiveIngredients(activeIngredients.filter(i => i !== ingredient));
  };

  const toggleProtocolStep = (stepId: string) => {
    setProtocolSteps(steps =>
      steps.map(step =>
        step.id === stepId ? { ...step, checked: !step.checked } : step
      )
    );
  };

  const handleSaveExecution = useCallback(async () => {
    setIsSaving(true);
    setSaveMessage("");
    
    try {
      const executionData = {
        client_id: clientId,
        client_name: clientName,
        base_treatment: baseTreatment,
        active_ingredients: activeIngredients,
        proportion_base: proportionBase,
        proportion_active: proportionActive,
        pause_time_minutes: pauseMinutes,
        protocol_steps: protocolSteps.filter(s => s.checked).map(s => s.label),
        tech_notes: techNotes,
        execution_time_seconds: sessionSeconds,
        professional_name: "Dr. Thay"
      };

      const { error } = await supabase
        .from("atendimento_executions")
        .insert(executionData);

      if (error) {
        console.error("Erro ao salvar:", error);
        setSaveMessage("error");
      } else {
        setSaveMessage("success");
        setTimeout(() => {
          navigate({ to: "/chapter-loop" });
        }, 1500);
      }
    } catch (err) {
      console.error("Erro ao salvar execução:", err);
      setSaveMessage("error");
    } finally {
      setIsSaving(false);
    }
  }, [clientId, clientName, baseTreatment, activeIngredients, proportionBase, proportionActive, pauseMinutes, protocolSteps, techNotes, sessionSeconds, navigate, supabase]);

  const checkedStepsCount = protocolSteps.filter(s => s.checked).length;

  return (
    <div className="bg-surface text-on-surface min-h-screen flex font-body-lg">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white py-8 px-4 z-50">
        <div className="mb-12 px-4">
          <h1 className="font-display-lg text-[32px] text-deep-burgundy tracking-tight leading-none mb-1">
            Passaporte Capilar™
          </h1>
          <p className="font-label-caps text-label-caps text-antique-gold">
            Consul de Beleza
          </p>
        </div>
        <button 
          className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps py-4 uppercase mb-8 hover:bg-opacity-90 transition-all rounded cursor-pointer"
          onClick={() => navigate({ to: "/check-in" })}
        >
          Novo Atendimento
        </button>
        <div className="flex flex-col gap-2 flex-grow">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-title-md text-body-lg">Visão Geral</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="font-title-md text-body-lg">Clientes</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">style</span>
            <span className="font-title-md text-body-lg">Passaportes</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
            <span className="font-title-md text-body-lg">Programas</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="font-title-md text-body-lg">Brand Studio</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-title-md text-body-lg">Configurações</span>
          </a>
        </div>
        <div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors" href="#">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-title-md text-body-sm">Suporte</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy transition-colors" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-title-md text-body-sm">Sair</span>
          </a>
        </div>
      </nav>
      <main className="flex-1 md:ml-64 bg-surface min-h-screen relative pt-16">
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 flex justify-between items-center h-16 px-4 md:px-margin-desktop bg-parchment-white/80 backdrop-blur-md border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              Protocolo em Andamento
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-deep-burgundy font-bold">Atendimento</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <button className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low rounded-full p-2 transition-all">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-low rounded-full p-2 transition-all">
                <span className="material-symbols-outlined">history_edu</span>
              </button>
            </div>
            <button className="border border-deep-burgundy text-deep-burgundy font-label-caps text-label-caps px-4 py-2 uppercase tracking-widest hover:bg-deep-burgundy hover:text-antique-gold transition-colors cursor-pointer">
              Modo Passaporte
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
              <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPcXFALkq2nZWjpdECELR5cEQLZvEIS1NzBCmrgZs4AhwBmqD1qb1TnqOm0hj6jibUkxjhtfKlFx2w7z5c-4EWQNIHQDYFjuuEE34-fUmpcyEKcp7GrW1TH8btRncxp7belbzf3iVOTCb51R84U58NaEG3fiN4QO-wXALPpbYbQwOAKKe2wyYKH7PkVJpjPrTcLPuGst4ALsT87BQjSMNAWbj0cP01iUwoOmjxSNUj7CROJRK9m-aM" />
            </div>
          </div>
        </header>
        <div className="px-4 md:px-margin-desktop py-12 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-8 space-y-chapter-gap">
              <section className="border-b border-outline-variant pb-8 relative">
                <div className="absolute top-0 right-0 font-display-lg text-headline-lg text-antique-gold opacity-50">01</div>
                <h2 className="font-headline-lg text-headline-lg text-deep-burgundy mb-8">Laboratório de Fórmula</h2>
                <div className="bg-parchment-white border border-outline-variant rounded-sm p-8 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6 border-r border-outline-variant pr-8">
                      <div>
                        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                          Base de Tratamento
                        </label>
                        <div className="relative inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3">
                          <select 
                            className="w-full bg-transparent border-none p-0 focus:ring-0 font-metadata text-body-sm text-deep-burgundy outline-none appearance-none cursor-pointer"
                            value={baseTreatment}
                            onChange={(e) => setBaseTreatment(e.target.value)}
                          >
                            {BASE_TREATMENTS.map(treatment => (
                              <option key={treatment} value={treatment}>{treatment}</option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">expand_more</span>
                        </div>
                      </div>
                      <div>
                        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                          Aditivos Ativos (Ampolas)
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {activeIngredients.map(ingredient => (
                            <span 
                              key={ingredient}
                              className="active-ingredient-tag bg-secondary-container text-on-secondary-container font-metadata text-metadata px-2 py-1 rounded-sm border border-antique-gold/30 flex items-center gap-1 cursor-pointer hover:bg-red-100 transition-colors"
                              onClick={() => removeActiveIngredient(ingredient)}
                            >
                              {ingredient}
                              <button type="button">
                                <span className="material-symbols-outlined text-[12px]">close</span>
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <div className="relative inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3 flex-1 flex items-center">
                            <input 
                              className="w-full bg-transparent border-none p-0 focus:ring-0 font-metadata text-body-sm outline-none placeholder:text-outline-variant"
                              placeholder="Adicionar ativo..."
                              type="text"
                              value={newActive}
                              onChange={(e) => setNewActive(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && addActiveIngredient()}
                              list="available-actives"
                            />
                            <datalist id="available-actives">
                              {AVAILABLE_ACTIVES.filter(a => !activeIngredients.includes(a)).map(active => (
                                <option key={active} value={active} />
                              ))}
                            </datalist>
                          </div>
                          <button 
                            type="button"
                            className="p-3 border border-outline-variant rounded-sm hover:bg-surface-container-low text-deep-burgundy transition-colors cursor-pointer"
                            onClick={addActiveIngredient}
                          >
                            <span className="material-symbols-outlined">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                          Proporção (Base : Ativo)
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3 text-center">
                            <input 
                              className="w-full bg-transparent border-none p-0 focus:ring-0 font-metadata text-title-md text-deep-burgundy outline-none text-center cursor-pointer"
                              type="number"
                              min="1"
                              max="10"
                              value={proportionBase}
                              onChange={(e) => setProportionBase(parseInt(e.target.value) || 1)}
                            />
                          </div>
                          <span className="font-display-lg text-title-md text-antique-gold">:</span>
                          <div className="flex-1 inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3 text-center">
                            <input 
                              className="w-full bg-transparent border-none p-0 focus:ring-0 font-metadata text-title-md text-deep-burgundy outline-none text-center cursor-pointer"
                              type="number"
                              min="0.5"
                              max="10"
                              step="0.5"
                              value={proportionActive}
                              onChange={(e) => setProportionActive(parseFloat(e.target.value) || 1)}
                            />
                          </div>
                        </div>
                        <p className="font-metadata text-metadata text-outline-variant mt-2 text-right">
                          Gramas por aplicação recomendada: {Math.round(30 * (proportionActive / proportionBase))}g
                        </p>
                      </div>
                      <div>
                        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                          Tempo de Pausa Previsto
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-3 flex-1 flex justify-between items-center">
                            <input 
                              className="w-16 bg-transparent border-none p-0 focus:ring-0 font-metadata text-title-md text-deep-burgundy outline-none text-right cursor-pointer"
                              type="number"
                              min="1"
                              max="120"
                              value={pauseMinutes}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                setPauseMinutes(val);
                                if (!isTimerRunning) setTimerSeconds(val * 60);
                              }}
                            />
                            <span className="font-metadata text-body-sm text-outline-variant ml-2">minutos</span>
                          </div>
                          <button 
                            type="button"
                            className="p-3 border border-outline-variant rounded-sm hover:bg-surface-container-low text-deep-burgundy transition-colors cursor-pointer"
                            onClick={toggleTimer}
                          >
                            <span className="material-symbols-outlined">
                              {isTimerRunning ? "pause" : "timer"}
                            </span>
                          </button>
                        </div>
                        {timerSeconds > 0 && (
                          <p className="font-metadata text-metadata text-deep-burgundy mt-2 text-center font-bold">
                            Timer: {formatTime(timerSeconds)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="border-b border-outline-variant pb-8 relative">
                <div className="absolute top-0 right-0 font-display-lg text-headline-lg text-antique-gold opacity-50">02</div>
                <h2 className="font-headline-lg text-headline-lg text-deep-burgundy mb-8">
                  Protocolo de Aplicação
                  <span className="text-body-sm font-normal text-on-surface-variant ml-2">
                    ({checkedStepsCount}/{protocolSteps.length} etapas)
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {protocolSteps.map((step) => (
                    <label 
                      key={step.id} 
                      className={`flex items-start gap-3 cursor-pointer group p-4 rounded-lg border transition-all ${
                        step.checked 
                          ? "border-deep-burgundy bg-secondary-container/30" 
                          : "border-outline-variant hover:border-deep-burgundy/50"
                      }`}
                    >
                      <div className="flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox" 
                          className="checkbox-custom"
                          checked={step.checked}
                          onChange={() => toggleProtocolStep(step.id)}
                        />
                      </div>
                      <div>
                        <span className="block font-title-md text-body-lg text-on-surface">
                          {step.label}
                        </span>
                        <span className="block font-metadata text-metadata text-on-surface-variant mt-1">
                          {step.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
              <section className="pb-8 relative">
                <h2 className="font-headline-lg text-headline-lg text-deep-burgundy mb-4">
                  Observações Técnicas
                </h2>
                <textarea 
                  className="w-full inset-shadow bg-surface-container-lowest border border-outline-variant rounded-sm p-4 font-body-lg text-body-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-antique-gold resize-none"
                  placeholder="Detalhes adicionais sobre o procedimento, reações observadas ou notas para próximas sessões..."
                  rows={4}
                  value={techNotes}
                  onChange={(e) => setTechNotes(e.target.value)}
                />
              </section>
            </div>
            <aside className="lg:col-span-4 space-y-8 sticky top-24">
              <div className="bg-parchment-white border border-outline-variant p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6 border-b border-outline-variant pb-4">
                  <div>
                    <h3 className="font-label-caps text-label-caps text-antique-gold uppercase tracking-widest mb-1">
                      Cliente Ativo
                    </h3>
                    <p className="font-display-lg text-title-md text-deep-burgundy">{clientName}</p>
                    <p className="font-metadata text-metadata text-on-surface-variant mt-1">ID: {clientId}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-outline-variant">
                    <img alt="Client Image" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbaeiCTwzDymnBgrQP2ZtebU1GUk-ken_moHKS7F0YiHGN543JVyVjIbjMgFo8akEQHgF7yz7Kdz_HnPx8PzOWR_aZ-dPSyCrfI-BNvX_fsAAnFR4mW9CUgWwkB2t1mdvuTceRzvge1AMUqga2HRk-7PiS52OsHwaPh4OjemGbxShQ_QqxUNep99F9Lc_CHROaSrhvmwLWt0EnJ34P7LaPIPFNyg8wEzfEWb0QcqnwD5sjWCH0F6P0" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest border-l-2 border-deep-burgundy pl-2">
                    Diagnóstico Validado
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-lowest p-3 border border-outline-variant rounded-sm text-center">
                      <span className="block font-metadata text-metadata text-on-surface-variant uppercase">Porosidade</span>
                      <span className="block font-title-md text-body-lg text-deep-burgundy mt-1">Alta</span>
                    </div>
                    <div className="bg-surface-container-lowest p-3 border border-outline-variant rounded-sm text-center">
                      <span className="block font-metadata text-metadata text-on-surface-variant uppercase">Elasticidade</span>
                      <span className="block font-title-md text-body-lg text-deep-burgundy mt-1">Boa</span>
                    </div>
                    <div className="bg-surface-container-lowest p-3 border border-outline-variant rounded-sm text-center col-span-2">
                      <span className="block font-metadata text-metadata text-on-surface-variant uppercase">Foco Principal</span>
                      <span className="block font-title-md text-body-lg text-deep-burgundy mt-1">Reposição Lipídica</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-ink-black text-parchment-white p-6 rounded-sm text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #1a1a1a 25%, #1a1a1a 75%, #000 75%, #000)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }}></div>
                <h4 className="font-label-caps text-label-caps text-antique-gold uppercase tracking-widest mb-4 relative z-10">
                  Tempo de Sessão
                </h4>
                <div className="font-display-lg text-[48px] font-light tracking-wider relative z-10 text-surface">
                  {formatSessionTime(sessionSeconds)}
                </div>
                <div className="flex justify-center gap-2 mt-4 relative z-10">
                  <span className="w-2 h-2 rounded-full bg-antique-gold animate-pulse"></span>
                  <span className="font-metadata text-metadata text-outline-variant uppercase">Em andamento</span>
                </div>
              </div>
              {saveMessage === "success" && (
                <div className="bg-green-100 border border-green-500 text-green-700 p-4 rounded-sm text-center">
                  <span className="material-symbols-outlined align-middle mr-2">check_circle</span>
                  Execução salva com sucesso!
                </div>
              )}
              {saveMessage === "error" && (
                <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded-sm text-center">
                  <span className="material-symbols-outlined align-middle mr-2">error</span>
                  Erro ao salvar. Tente novamente.
                </div>
              )}
              <div className="space-y-4 pt-4 border-t border-outline-variant">
                <button 
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border border-deep-burgundy text-deep-burgundy font-label-caps text-label-caps px-4 py-4 uppercase tracking-widest hover:bg-surface-container-low transition-colors rounded-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  Adicionar Obs Técnica
                </button>
                <button 
                  type="button"
                  className={`w-full flex items-center justify-center gap-3 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps px-4 py-5 uppercase tracking-widest transition-all rounded-sm shadow-md group relative overflow-hidden cursor-pointer ${
                    isSaving ? "opacity-70 cursor-wait" : "hover:bg-opacity-95"
                  }`}
                  onClick={handleSaveExecution}
                  disabled={isSaving}
                >
                  {!isSaving && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  )}
                  <span className="material-symbols-outlined text-[20px]">
                    {isSaving ? "hourglass_empty" : "task_alt"}
                  </span>
                  {isSaving ? "Salvando..." : "Finalizar Execução"}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
