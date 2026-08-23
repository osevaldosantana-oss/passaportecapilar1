import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrar — Passaporte Capilar™" },
      {
        name: "description",
        content:
          "Acesse sua caderneta capilar digital: entre com e-mail e senha ou crie sua conta no Passaporte Capilar.",
      },
      { property: "og:title", content: "Entrar — Passaporte Capilar™" },
      {
        property: "og:description",
        content:
          "Acesse sua caderneta capilar digital: entre com e-mail e senha ou crie sua conta no Passaporte Capilar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName },
        },
      });
      setLoading(false);
      if (signUpError) {
        setError(traduzErro(signUpError.message));
        return;
      }
      if (data.session) {
        navigate({ to: "/", replace: true });
        return;
      }
      setNotice("Conta criada. Confirme o e-mail enviado para concluir o acesso.");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(traduzErro(signInError.message));
      return;
    }
    navigate({ to: "/", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-parchment-white px-4 py-10">
      <div className="w-full max-w-sm border border-diplomatic-navy/20 bg-parchment-white p-6 shadow-passport">
        <p className="font-mono-code text-[10px] uppercase tracking-[0.3em] text-diplomatic-navy/60">
          Edição Diplomática
        </p>
        <h1 className="mt-2 font-display text-2xl text-diplomatic-navy">Passaporte Capilar™</h1>
        <p className="mt-1 text-sm text-diplomatic-navy/70">
          {mode === "signin" ? "Entre para acessar sua caderneta." : "Crie sua conta para começar."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="fullName"
                className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-diplomatic-navy/70"
              >
                Nome completo
              </label>
              <input
                id="fullName"
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full border border-diplomatic-navy/25 bg-transparent px-3 py-2 text-sm text-diplomatic-navy outline-none focus:border-diplomatic-navy"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-diplomatic-navy/70"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-diplomatic-navy/25 bg-transparent px-3 py-2 text-sm text-diplomatic-navy outline-none focus:border-diplomatic-navy"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-diplomatic-navy/70"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-diplomatic-navy/25 bg-transparent px-3 py-2 text-sm text-diplomatic-navy outline-none focus:border-diplomatic-navy"
            />
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}
          {notice && <p className="text-sm text-diplomatic-navy">{notice}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-diplomatic-navy px-4 py-2 font-mono-code text-[11px] uppercase tracking-[0.2em] text-parchment-white transition-opacity disabled:opacity-60"
          >
            {loading ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setNotice(null);
          }}
          className="mt-4 w-full text-center font-mono-code text-[10px] uppercase tracking-[0.18em] text-diplomatic-navy/70 underline"
        >
          {mode === "signin" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
        </button>
      </div>
    </main>
  );
}

function traduzErro(message: string) {
  if (message.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (message.includes("User already registered")) return "Este e-mail já está cadastrado.";
  if (message.includes("Email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (message.includes("Password should be")) return "A senha deve ter pelo menos 6 caracteres.";
  return "Não foi possível concluir. Tente novamente.";
}
