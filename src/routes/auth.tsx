import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

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

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);
    setNotice(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      setError("Não foi possível entrar com o Google. Tente novamente.");
      return;
    }
    if (result.redirected) return;
    setLoading(false);
    navigate({ to: "/", replace: true });
  }

  async function handleAppleSignIn() {
    setLoading(true);
    setError(null);
    setNotice(null);
    const result = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      setError("Não foi possível entrar com a Apple. Tente novamente.");
      return;
    }
    if (result.redirected) return;
    setLoading(false);
    navigate({ to: "/", replace: true });
  }

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
      <div className="w-full max-w-sm border border-ink-black/20 bg-parchment-white p-6 shadow-md">
        <p className="font-metadata text-[10px] uppercase tracking-[0.3em] text-ink-black/60">
          Edição Diplomática
        </p>
        <h1 className="mt-2 font-headline-lg text-2xl text-ink-black">Passaporte Capilar™</h1>
        <p className="mt-1 text-sm text-ink-black/70">
          {mode === "signin" ? "Entre para acessar sua caderneta." : "Crie sua conta para começar."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="fullName"
                className="font-metadata text-[10px] uppercase tracking-[0.18em] text-ink-black/70"
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
                className="mt-1 w-full border border-ink-black/25 bg-transparent px-3 py-2 text-sm text-ink-black outline-none focus:border-ink-black"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="font-metadata text-[10px] uppercase tracking-[0.18em] text-ink-black/70"
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
              className="mt-1 w-full border border-ink-black/25 bg-transparent px-3 py-2 text-sm text-ink-black outline-none focus:border-ink-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-metadata text-[10px] uppercase tracking-[0.18em] text-ink-black/70"
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
              className="mt-1 w-full border border-ink-black/25 bg-transparent px-3 py-2 text-sm text-ink-black outline-none focus:border-ink-black"
            />
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}
          {notice && <p className="text-sm text-ink-black">{notice}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink-black px-4 py-2 font-metadata text-[11px] uppercase tracking-[0.2em] text-parchment-white transition-opacity disabled:opacity-60"
          >
            {loading ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-ink-black/15" />
          <span className="font-metadata text-[10px] uppercase tracking-[0.18em] text-ink-black/50">
            ou
          </span>
          <span className="h-px flex-1 bg-ink-black/15" />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleAppleSignIn}
          className="mt-5 flex w-full items-center justify-center gap-2 border border-ink-black bg-parchment-white px-4 py-2 font-metadata text-[11px] uppercase tracking-[0.2em] text-ink-black transition-opacity disabled:opacity-60"
        >
          <svg viewBox="0 0 384 512" aria-hidden="true" className="h-4 w-4 fill-current">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          Entrar com Apple
        </button>


        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setNotice(null);
          }}
          className="mt-4 w-full text-center font-metadata text-[10px] uppercase tracking-[0.18em] text-ink-black/70 underline"
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
