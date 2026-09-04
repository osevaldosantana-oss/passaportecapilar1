import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppSidebar } from "@/components/layout/app-sidebar";

type Role = "admin" | "professional" | "manager";
type Tab = "clientes" | "profissionais" | "papeis";

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  phone: string | null;
  created_at: string;
}

const roleLabels: Record<Role, string> = {
  admin: "Administrador",
  professional: "Profissional",
  manager: "Gerente",
};

const roleColors: Record<Role, string> = {
  admin: "bg-stamp-red/10 text-stamp-red border-stamp-red/30",
  professional: "bg-antique-gold/10 text-antique-gold border-antique-gold/30",
  manager: "bg-blue-500/10 text-blue-600 border-blue-500/30",
};

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Administração — Passaporte Capilar™" },
      { name: "description", content: "Painel de administração: gerencie clientes, profissionais e papéis." },
      { property: "og:title", content: "Administração — Passaporte Capilar™" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState<Tab>("clientes");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Form cliente
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [cPhone, setCPhone] = useState("");

  // Form profissional
  const [pName, setPName] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [pPassword, setPPassword] = useState("");
  const [pRole, setPRole] = useState<Role>("professional");

  // Edit papel
  const [editId, setEditId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<Role>("professional");

  useEffect(() => { loadUsers(); }, []);

  async function loadUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_users")
      .select("id, email, full_name, role, phone, created_at")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (!error && data) setUsers(data as AdminUser[]);
  }

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  }

  async function registerCliente(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("admin_users").insert({
      email: cEmail, full_name: cName, phone: cPhone || null,
      password_hash: btoa(cPassword),
      role: "professional",
    });
    setLoading(false);
    if (error) { flash("err", error.message); return; }
    flash("ok", "Cliente cadastrado com sucesso.");
    setCName(""); setCEmail(""); setCPassword(""); setCPhone("");
    loadUsers();
  }

  async function registerProfissional(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("admin_users").insert({
      email: pEmail, full_name: pName, password_hash: btoa(pPassword), role: pRole,
    });
    setLoading(false);
    if (error) { flash("err", error.message); return; }
    flash("ok", "Profissional cadastrado com sucesso.");
    setPName(""); setPEmail(""); setPPassword("");
    loadUsers();
  }

  async function updateRole(id: string) {
    const { error } = await supabase
      .from("admin_users")
      .update({ role: editRole })
      .eq("id", id);
    if (error) { flash("err", error.message); return; }
    setEditId(null);
    flash("ok", "Papel atualizado.");
    loadUsers();
  }

  async function deleteUser(id: string) {
    if (!confirm("Remover este usuário?")) return;
    const { error } = await supabase.from("admin_users").delete().eq("id", id);
    if (error) { flash("err", error.message); return; }
    flash("ok", "Usuário removido.");
    loadUsers();
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "clientes", label: "Clientes", icon: "group" },
    { id: "profissionais", label: "Profissionais", icon: "badge" },
    { id: "papeis", label: "Papéis", icon: "admin_panel_settings" },
  ];

  return (
    <div className="min-h-screen bg-parchment-white text-on-surface flex">
      <AppSidebar active="/admin" />
      <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop pb-24">
        <header className="mb-8">
          <p className="font-metadata text-metadata text-antique-gold uppercase tracking-widest">
            Passaporte Intelligence™
          </p>
          <h1 className="font-display-lg text-display-lg text-deep-burgundy">Administração</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            Gerencie clientes, profissionais e permissões do sistema.
          </p>
        </header>

        {msg && (
          <div className={`mb-6 px-5 py-3 rounded-lg border font-body-sm text-body-sm ${
            msg.type === "ok"
              ? "bg-secondary-container text-on-secondary-container border-secondary-container"
              : "bg-stamp-red/10 text-stamp-red border-stamp-red/30"
          }`}>
            {msg.text}
          </div>
        )}

        {/* Tab bar */}
        <div className="flex gap-2 mb-8 border-b border-outline-variant pb-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 font-label-caps text-label-caps uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                tab === t.id
                  ? "border-deep-burgundy text-deep-burgundy"
                  : "border-transparent text-on-surface-variant hover:text-deep-burgundy"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ——— ABA CLIENTES ——— */}
        {tab === "clientes" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
              <h2 className="font-title-md text-title-md text-deep-burgundy mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold">person_add</span>
                Cadastrar Cliente
              </h2>
              <p className="font-metadata text-metadata text-on-surface-variant mb-6">
                Cria um registro de cliente no sistema.
              </p>
              <form onSubmit={registerCliente} className="space-y-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Nome completo
                  </label>
                  <input
                    type="text" required value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    placeholder="Nome da cliente"
                    className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-lg text-on-surface rounded focus:border-deep-burgundy focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email" required value={cEmail}
                    onChange={(e) => setCEmail(e.target.value)}
                    placeholder="cliente@email.com"
                    className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-lg text-on-surface rounded focus:border-deep-burgundy focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Senha
                  </label>
                  <input
                    type="password" required minLength={6} value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-lg text-on-surface rounded focus:border-deep-burgundy focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Telefone <span className="text-outline">(opcional)</span>
                  </label>
                  <input
                    type="tel" value={cPhone}
                    onChange={(e) => setCPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-lg text-on-surface rounded focus:border-deep-burgundy focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase tracking-widest py-3 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Salvando..." : "Cadastrar Cliente"}
                </button>
              </form>
            </section>

            <section>
              <h2 className="font-title-md text-title-md text-deep-burgundy mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold">group</span>
                Clientes Cadastrados
                <span className="font-metadata text-metadata text-on-surface-variant ml-2">
                  ({users.filter((u) => u.role === "professional" || u.role === "manager").length})
                </span>
              </h2>
              {loading && users.length === 0 ? (
                <p className="font-body-sm text-body-sm text-on-surface-variant">Carregando...</p>
              ) : users.filter((u) => u.role === "professional" || u.role === "manager").length === 0 ? (
                <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-lg p-6 text-center">
                  Nenhum cliente cadastrado ainda.
                </p>
              ) : (
                <div className="space-y-3">
                  {users
                    .filter((u) => u.role === "professional" || u.role === "manager")
                    .map((u) => (
                      <div key={u.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-title-md text-title-md text-deep-burgundy">{u.full_name}</p>
                          <p className="font-metadata text-metadata text-on-surface-variant">{u.email}</p>
                          {u.phone && <p className="font-metadata text-metadata text-on-surface-variant">{u.phone}</p>}
                        </div>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-2 text-stamp-red hover:bg-stamp-red/10 rounded transition-colors cursor-pointer"
                          title="Remover"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ——— ABA PROFISSIONAIS ——— */}
        {tab === "profissionais" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
              <h2 className="font-title-md text-title-md text-deep-burgundy mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold">badge</span>
                Cadastrar Profissional
              </h2>
              <p className="font-metadata text-metadata text-on-surface-variant mb-6">
                Cria uma conta de profissional com papel definido.
              </p>
              <form onSubmit={registerProfissional} className="space-y-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Nome completo
                  </label>
                  <input
                    type="text" required value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="Nome do profissional"
                    className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-lg text-on-surface rounded focus:border-deep-burgundy focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email" required value={pEmail}
                    onChange={(e) => setPEmail(e.target.value)}
                    placeholder="profissional@email.com"
                    className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-lg text-on-surface rounded focus:border-deep-burgundy focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Senha
                  </label>
                  <input
                    type="password" required minLength={6} value={pPassword}
                    onChange={(e) => setPPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-lg text-on-surface rounded focus:border-deep-burgundy focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1.5">
                    Papel
                  </label>
                  <select
                    value={pRole}
                    onChange={(e) => setPRole(e.target.value as Role)}
                    className="w-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-lg text-on-surface rounded focus:border-deep-burgundy focus:outline-none transition-colors"
                  >
                    <option value="professional">Profissional</option>
                    <option value="manager">Gerente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps uppercase tracking-widest py-3 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Salvando..." : "Cadastrar Profissional"}
                </button>
              </form>
            </section>

            <section>
              <h2 className="font-title-md text-title-md text-deep-burgundy mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-antique-gold">group</span>
                Profissionais Cadastrados
                <span className="font-metadata text-metadata text-on-surface-variant ml-2">
                  ({users.filter((u) => u.role === "admin").length})
                </span>
              </h2>
              {loading && users.length === 0 ? (
                <p className="font-body-sm text-body-sm text-on-surface-variant">Carregando...</p>
              ) : users.filter((u) => u.role === "admin").length === 0 ? (
                <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-lg p-6 text-center">
                  Nenhum profissional cadastrado ainda.
                </p>
              ) : (
                <div className="space-y-3">
                  {users
                    .filter((u) => u.role === "admin")
                    .map((u) => (
                      <div key={u.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-title-md text-title-md text-deep-burgundy">{u.full_name}</p>
                          <p className="font-metadata text-metadata text-on-surface-variant">{u.email}</p>
                        </div>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-2 text-stamp-red hover:bg-stamp-red/10 rounded transition-colors cursor-pointer"
                          title="Remover"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ——— ABA PAPÉIS ——— */}
        {tab === "papeis" && (
          <div>
            <h2 className="font-title-md text-title-md text-deep-burgundy mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-antique-gold">admin_panel_settings</span>
              Gerenciar Papéis
            </h2>
            <p className="font-metadata text-metadata text-on-surface-variant mb-6">
              Atualize o papel de qualquer usuário do sistema.
            </p>
            {loading && users.length === 0 ? (
              <p className="font-body-sm text-body-sm text-on-surface-variant">Carregando...</p>
            ) : (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container">
                      <th className="px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs">Nome</th>
                      <th className="px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs hidden md:table-cell">E-mail</th>
                      <th className="px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs">Papel Atual</th>
                      <th className="px-5 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-outline-variant/40 last:border-0 hover:bg-surface-container-low">
                        <td className="px-5 py-4">
                          <p className="font-title-md text-title-md text-deep-burgundy">{u.full_name}</p>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{u.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          {editId === u.id ? (
                            <select
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value as Role)}
                              className="border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-body-sm text-on-surface rounded focus:border-deep-burgundy focus:outline-none"
                            >
                              <option value="admin">Administrador</option>
                              <option value="professional">Profissional</option>
                              <option value="manager">Gerente</option>
                            </select>
                          ) : (
                            <span className={`inline-block px-3 py-1 rounded-full border font-metadata text-metadata uppercase ${roleColors[u.role]}`}>
                              {roleLabels[u.role]}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {editId === u.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateRole(u.id)}
                                className="px-3 py-1.5 bg-deep-burgundy text-antique-gold font-label-caps text-label-caps rounded hover:bg-primary transition-colors cursor-pointer text-xs"
                              >
                                Salvar
                              </button>
                              <button
                                onClick={() => setEditId(null)}
                                className="px-3 py-1.5 border border-outline-variant text-on-surface-variant font-label-caps text-label-caps rounded hover:bg-surface-container transition-colors cursor-pointer text-xs"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => { setEditId(u.id); setEditRole(u.role); }}
                                className="px-3 py-1.5 border border-outline-variant text-on-surface-variant font-label-caps text-label-caps rounded hover:border-deep-burgundy hover:text-deep-burgundy transition-colors cursor-pointer text-xs"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => deleteUser(u.id)}
                                className="px-3 py-1.5 text-stamp-red border border-stamp-red/30 font-label-caps text-label-caps rounded hover:bg-stamp-red/10 transition-colors cursor-pointer text-xs"
                              >
                                Remover
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
