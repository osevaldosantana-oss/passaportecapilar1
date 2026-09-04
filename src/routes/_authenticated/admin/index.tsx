import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Cadastros - Passaporte Capilar(TM)" },
      { name: "description", content: "Cadastre e gerencie clientes, profissionais e Papeis no sistema." },
    ],
  }),
  component: Page,
});

function Page() {
  const [activeTab, setActiveTab] = useState<"cliente" | "profissional" | "papel">("cliente");
  const [clienteNome, setClienteNome] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [profNome, setProfNome] = useState("");
  const [profEmail, setProfEmail] = useState("");
  const [papelNome, setPapelNome] = useState("");
  const [papelDesc, setPapelDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function showMsg(msg: string) {
    setMensagem(msg);
    setTimeout(() => setMensagem(""), 4000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    if (activeTab === "cliente") showMsg("Cliente cadastrado com sucesso!");
    else if (activeTab === "profissional") showMsg("Profissional cadastrado com sucesso!");
    else showMsg("Papel criado com sucesso!");
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-parchment-white flex">
      <AppSidebar active="/admin" />
      <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop pb-24">
        <header className="mb-8">
          <p className="font-metadata text-metadata text-antique-gold uppercase tracking-widest">Cadastros</p>
          <h1 className="font-display-lg text-display-lg text-deep-burgundy">Novo Registro</h1>
        </header>

        <div className="flex gap-2 mb-8 border-b border-outline-variant pb-0">
          {(["cliente", "profissional", "papel"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setMensagem(""); }}
              className={`px-4 py-3 font-label-caps text-label-caps capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-deep-burgundy text-deep-burgundy"
                  : "border-transparent text-on-surface-variant hover:text-deep-burgundy"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {mensagem && (
          <div className="mb-6 p-4 bg-secondary-container text-on-secondary-container rounded-lg font-body-sm text-body-sm">
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
          {activeTab === "cliente" && (
            <>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Nome completo *</label>
                <input value={clienteNome} onChange={e => setClienteNome(e.target.value)} required placeholder="Nome da cliente" className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-lg text-body-lg" />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Telefone</label>
                <input value={clienteTelefone} onChange={e => setClienteTelefone(e.target.value)} placeholder="(11) 99999-9999" className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-lg text-body-lg" />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">E-mail</label>
                <input value={clienteEmail} onChange={e => setClienteEmail(e.target.value)} placeholder="email@exemplo.com" type="email" className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-lg text-body-lg" />
              </div>
            </>
          )}
          {activeTab === "profissional" && (
            <>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Nome completo *</label>
                <input value={profNome} onChange={e => setProfNome(e.target.value)} required placeholder="Nome do profissional" className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-lg text-body-lg" />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">E-mail *</label>
                <input value={profEmail} onChange={e => setProfEmail(e.target.value)} required placeholder="profissional@exemplo.com" type="email" className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-lg text-body-lg" />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Papel</label>
                <select className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-lg text-body-lg">
                  <option>Profissional</option>
                  <option>Administrador</option>
                  <option>Consultor</option>
                </select>
              </div>
            </>
          )}
          {activeTab === "papel" && (
            <>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Nome do papel *</label>
                <input value={papelNome} onChange={e => setPapelNome(e.target.value)} required placeholder="Ex: Editor, Visualizador" className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-lg text-body-lg" />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Descricao</label>
                <textarea value={papelDesc} onChange={e => setPapelDesc(e.target.value)} placeholder="Descreva as permissoes deste papel" className="w-full p-3 rounded border border-outline-variant bg-surface-container-lowest font-body-lg text-body-lg min-h-[100px] resize-none" />
              </div>
            </>
          )}
          <button type="submit" disabled={saving} className="bg-deep-burgundy text-antique-gold px-6 py-3 rounded font-label-caps text-label-caps disabled:opacity-60 hover:opacity-90 transition-opacity">
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </main>
    </div>
  );
}
