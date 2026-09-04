import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckoutAuditTrail, useCheckoutAudit } from "@/features/checkout";
import { createClient, listClients, type ClientSummary } from "@/features/clients";
import { AppSidebar } from "@/components/layout/app-sidebar";

const pageCss = `
        body { background-color: #F9F6F0; }
        .bg-pattern {
            background-image: radial-gradient(#dac1bf 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .stamp-seal {
            box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15);
        }
        .chapter-border {
            border-bottom: 1px solid #dac1bf;
        }
        .debossed-input {
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
            background-color: #F0EDE4;
        }
    `;

export const Route = createFileRoute("/_authenticated/check-out/")({
  head: () => ({
    meta: [
      { title: "Check-out & Carimbo - Passaporte Capilar(TM)" },
      { name: "description", content: "Finalize o atendimento, registre o resumo do capitulo e carimbe o passaporte da cliente." },
      { property: "og:title", content: "Check-out & Carimbo - Passaporte Capilar(TM)" },
      { property: "og:description", content: "Finalize o atendimento, registre o resumo do capitulo e carimbe o passaporte da cliente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { events, record } = useCheckoutAudit("criacao");
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [clientError, setClientError] = useState("");
  const chapter = "Capitulo 01: Reconstrucao Profunda";

  useEffect(() => {
    listClients().then(setClients).catch(() => setClients([]));
  }, []);

  const selectedClient = clients.find((client) => client.id === selectedClientId);

  async function handleCreateClient(event: React.FormEvent) {
    event.preventDefault();
    const fullName = newClientName.trim();
    if (!fullName) return;
    setIsCreatingClient(true);
    setClientError("");
    try {
      const data = await createClient(fullName, newClientPhone.trim() || null);
      setClients((current) => [data, ...current]);
      setSelectedClientId(data.id);
      setNewClientName("");
      setNewClientPhone("");
    } catch (error) {
      if (error instanceof Error && error.message === "AUTH_REQUIRED") {
        setClientError("Sua sessao expirou. Entre novamente para cadastrar o cliente.");
      } else {
        setClientError("Nao foi possivel cadastrar este cliente.");
      }
    }
    setIsCreatingClient(false);
  }

  return (
    <div className="font-body-lg text-on-surface bg-parchment-white min-h-screen antialiased flex">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <AppSidebar active="/check-out" />

      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-parchment-white/80 backdrop-blur-md flex justify-between items-center px-margin-mobile md:px-margin-desktop z-40">
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
          <Link className="font-label-caps text-label-caps font-body-lg text-body-lg text-deep-burgundy border-b-2 border-deep-burgundy pb-1 font-bold opacity-80 hover:opacity-100 transition-opacity" to="/passaporte">
            Modo Passaporte
          </Link>
        </div>
      </header>

      <main className="flex-1 md:ml-64 mt-16 p-margin-mobile md:p-margin-desktop bg-pattern min-h-screen">

        <section className="max-w-4xl mx-auto mb-8 bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Cliente do atendimento</label>
              <select value={selectedClientId} onChange={(event) => setSelectedClientId(event.target.value)} className="w-full md:w-80 p-3 debossed-input rounded border border-outline-variant/30 font-body-lg text-body-lg text-on-surface">
                <option value="">Selecione um cliente</option>
                {clients.map((client) => <option key={client.id} value={client.id}>{client.full_name} - {client.passport_id}</option>)}
              </select>
            </div>
            <form onSubmit={handleCreateClient} className="flex flex-col md:flex-row gap-2">
              <input value={newClientName} onChange={(event) => setNewClientName(event.target.value)} required placeholder="Nome do novo cliente" className="p-3 debossed-input rounded border border-outline-variant/30 font-body-sm" />
              <input value={newClientPhone} onChange={(event) => setNewClientPhone(event.target.value)} placeholder="Telefone" className="p-3 debossed-input rounded border border-outline-variant/30 font-body-sm" />
              <button type="submit" disabled={isCreatingClient} className="bg-deep-burgundy text-antique-gold px-4 py-3 rounded font-label-caps text-label-caps disabled:opacity-60">{isCreatingClient ? "Cadastrando..." : "Novo cliente"}</button>
            </form>
          </div>
          {selectedClient && <p className="font-metadata text-metadata text-on-surface-variant mt-3">Cliente selecionado: {selectedClient.full_name}</p>}
          {clientError && <p className="font-body-sm text-body-sm text-stamp-red mt-3">{clientError}</p>}
        </section>

        <div className="max-w-4xl mx-auto mb-chapter-gap text-center">
          <h2 className="font-display-lg text-display-lg text-deep-burgundy mb-2">Check-out & Carimbo</h2>
          <p className="font-headline-lg text-headline-lg text-antique-gold italic">Capitulo 01: Reconstrucao Profunda</p>
          <div className="w-24 h-px bg-antique-gold mx-auto mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">

          <div className="md:col-span-7 space-y-chapter-gap">

            <section className="bg-surface-container-lowest p-8 rounded-lg chapter-border relative">
              <span className="absolute top-4 right-4 font-metadata text-metadata text-antique-gold">01</span>
              <h3 className="font-title-md text-title-md text-deep-burgundy mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold">science</span>
                Resumo do Capitulo
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Formula Executada</label>
                  <div className="p-4 debossed-input rounded border border-outline-variant/30 font-metadata text-metadata text-on-surface">
                    PROTEINA HIDROLISADA 15ML + AMINOACIDOS ESSENCIAIS 10ML<br />
                    TEMPO DE PAUSA: 20 MINUTOS<br />
                    FONTE DE CALOR: VAPOR DE OZONIO
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Diagnostico Inicial</label>
                    <div className="p-3 debossed-input rounded border border-outline-variant/30 font-body-sm text-body-sm text-on-surface">
                      Porosidade Nivel 3, Ruptura Leve.
                    </div>
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Resultado Atingido</label>
                    <div className="p-3 debossed-input rounded border border-outline-variant/30 font-body-sm text-body-sm text-on-surface text-green-800">
                      Fibra selada, resistencia recuperada.
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
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Prescricao Domiciliar</label>
                  <textarea className="w-full p-4 debossed-input rounded border border-outline-variant/30 font-body-lg text-body-lg text-on-surface min-h-[120px] focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy outline-none resize-none" placeholder="Detalhe os produtos e rotina indicados para manutencao..." />
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
                    <span className="font-label-caps text-[10px] tracking-widest uppercase mb-1">Edicao Diplomática</span>
                    <span className="material-symbols-outlined text-4xl mb-1 text-antique-gold">verified</span>
                    <span className="font-metadata text-[8px] uppercase">Validado por</span>
                    <span className="font-label-caps text-xs font-bold">Passaporte Capilar(TM)</span>
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
                Proximo Destino
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
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Proximo Capitulo (Foco)</label>
                  <select className="w-full p-3 debossed-input rounded border border-outline-variant/30 font-body-lg text-body-lg text-on-surface focus:ring-1 focus:ring-deep-burgundy focus:border-deep-burgundy outline-none appearance-none">
                    <option>Nutricao Intensiva</option>
                    <option>Selagem Termica</option>
                    <option>Manutencao de Cor</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <button
                type="button"
                disabled={record.isPending || !selectedClient}
                onClick={() => {
                  if (!selectedClient) return;
                  record.mutate({ chapter, details: { origem: "check-out", client_id: selectedClient.id, client_name: selectedClient.full_name } });
                }}
                className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps text-lg uppercase py-5 rounded-lg hover:bg-primary-container transition-colors shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
              >
                <span className="material-symbols-outlined">how_to_reg</span>
                {record.isPending ? "Registrando..." : "Finalizar e Carimbar"}
              </button>
              <button type="button" disabled={!selectedClient} onClick={() => selectedClient && navigate({ to: "/atendimento", search: { clientId: selectedClient.id, clientName: selectedClient.full_name } })} className="w-full mt-3 border border-deep-burgundy text-deep-burgundy font-label-caps text-label-caps uppercase py-3 rounded-lg disabled:opacity-40">
                Abrir atendimento deste cliente
              </button>
              <p className="text-center font-metadata text-metadata text-on-surface-variant mt-3">
                O carimbo registrara esta etapa permanentemente no historico da cliente.
              </p>
              <CheckoutAuditTrail
                step="criacao"
                events={events.data}
                isLoading={events.isLoading}
                error={events.error ? "Nao foi possivel carregar o registro de auditoria." : record.error ? "Nao foi possivel registrar o evento." : null}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
