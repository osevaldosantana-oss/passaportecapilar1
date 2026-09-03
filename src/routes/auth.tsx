import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrar — Passaporte Capilar(TM)" },
      { name: "description", content: "Acesse sua caderneta capilar digital: entre com e-mail e senha ou crie sua conta no Passaporte Capilar." },
      { property: "og:title", content: "Entrar — Passaporte Capilar(TM)" },
      { property: "og:description", content: "Acesse sua caderneta capilar digital: entre com e-mail e senha ou crie sua conta no Passaporte Capilar." },
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
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      setLoading(false);
      setError("Nao foi possivel entrar com o Google. Tente novamente.");
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
    const result = await lovable.auth.signInWithOAuth("apple", { redirect_uri: window.location.origin });
    if (result.error) {
      setLoading(false);
      setError("Nao foi possivel entrar com a Apple. Tente novamente.");
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
        options: { emailRedirectTo: window.location.origin, data: { full_name: fullName } },
      });
      setLoading(false);
      if (signUpError) { setError(traduzErro(signUpError.message)); return; }
      if (data.session) { navigate({ to: "/", replace: true }); return; }
      setNotice("Conta criada. Confirme o e-mail enviado para concluir o acesso.");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) { setError(traduzErro(signInError.message)); return; }
    navigate({ to: "/", replace: true });
  }

  return (
    <main className="min-h-screen bg-parchment-white flex items-center justify-center p-4 font-body-lg"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>

      <div className="w-full max-w-md p-[3px] rounded-2xl"
        style={{ background: "linear-gradient(135deg, #C5A059, #e8d5a3, #C5A059, #a8893e, #C5A059)", boxShadow: "0 8px 40px rgba(74,14,14,0.15), 0 0 0 1px rgba(197,160,89,0.3)" }}>

        <div className="bg-parchment-white rounded-[13px] p-10 relative overflow-hidden">

          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-antique-gold opacity-60" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-antique-gold opacity-60" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-antique-gold opacity-60" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-antique-gold opacity-60" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-antique-gold mb-4 bg-deep-burgundy">
              <span className="font-display-lg text-2xl text-antique-gold font-bold tracking-wider">PC</span>
            </div>
            <p className="font-label-caps text-label-caps text-outline uppercase tracking-[0.3em] mb-1">Passaporte Capilar(TM)</p>
            <h1 className="font-headline-lg text-headline-lg text-deep-burgundy mb-1">Passaporte Capilar(TM)</h1>
            <div className="w-10 h-[1px] bg-antique-gold mx-auto my-3 opacity-60" />
            <p className="font-label-caps text-label-caps text-outline uppercase tracking-[0.2em]">
              {mode === "signin" ? "Acesso ao sistema" : "Criar nova conta"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            {mode === "signup" && (
              <div>
                <label htmlFor="fullName" className="block font-label-caps text-label-caps text-outline uppercase tracking-[0.18em] mb-1.5">Nome completo</label>
                <input id="fullName" type="text" required autoComplete="name" value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-ink-black/20 bg-transparent px-4 py-2.5 text-body-lg text-ink-black outline-none focus:border-deep-burgundy rounded transition-colors font-body-lg"
                  placeholder="Seu nome completo" />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block font-label-caps text-label-caps text-outline uppercase tracking-[0.18em] mb-1.5">E-mail</label>
              <input id="email" type="email" required autoComplete="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-ink-black/20 bg-transparent px-4 py-2.5 text-body-lg text-ink-black outline-none focus:border-deep-burgundy rounded transition-colors font-body-lg"
                placeholder="seu@email.com" />
            </div>

            <div>
              <label htmlFor="password" className="block font-label-caps text-label-caps text-outline uppercase tracking-[0.18em] mb-1.5">Senha</label>
              <input id="password" type="password" required minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-ink-black/20 bg-transparent px-4 py-2.5 text-body-lg text-ink-black outline-none focus:border-deep-burgundy rounded transition-colors font-body-lg"
                placeholder="Sua senha" />
            </div>

            {error && <p className="text-[13px] text-error">{error}</p>}
            {notice && <p className="text-[13px] text-deep-burgundy">{notice}</p>}

            <button type="submit" disabled={loading}
              className="btn-press w-full bg-deep-burgundy text-parchment-white border-none py-3.5 px-6 font-label-caps text-label-caps tracking-[0.25em] uppercase cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed rounded transition-colors hover:bg-primary-container hover:text-on-primary-fixed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  Aguarde
                </span>
              ) : mode === "signin" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-[1px] bg-ink-black/10" />
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-[0.18em]">ou</span>
            <div className="flex-1 h-[1px] bg-ink-black/10" />
          </div>

          <div className="space-y-2 mb-5">
            <button type="button" disabled={loading} onClick={handleGoogleSignIn}
              className="btn-press w-full flex items-center justify-center gap-3 border border-ink-black/25 bg-parchment-white py-3 px-6 font-label-caps text-label-caps tracking-[0.2em] uppercase text-ink-black disabled:opacity-60 disabled:cursor-not-allowed rounded transition-colors hover:bg-surface-container hover:border-ink-black/40">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Entrar com Google
            </button>

            <button type="button" disabled={loading} onClick={handleAppleSignIn}
              className="btn-press w-full flex items-center justify-center gap-3 border border-ink-black/25 bg-parchment-white py-3 px-6 font-label-caps text-label-caps tracking-[0.2em] uppercase text-ink-black disabled:opacity-60 disabled:cursor-not-allowed rounded transition-colors hover:bg-surface-container hover:border-ink-black/40">
              <svg viewBox="0 0 384 512" className="w-[18px] h-[18px]" style={{ fill: "#1A1A1A" }}>
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Entrar com Apple
            </button>
          </div>

          <div className="text-center">
            <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setNotice(null); }}
              className="bg-none border-none font-label-caps text-label-caps text-outline uppercase tracking-[0.15em] cursor-pointer underline underline-offset-3 hover:text-deep-burgundy transition-colors">
              {mode === "signin" ? "Nao tem conta? Cadastre-se" : "Ja tem conta? Entrar"}
            </button>
          </div>

          <div className="text-center mt-6 pt-5 border-t border-ink-black/10">
            <button type="button"
              className="bg-none border-none font-label-caps text-label-caps text-antique-gold uppercase tracking-[0.15em] cursor-pointer inline-flex items-center gap-1.5 hover:text-deep-burgundy transition-colors">
              <span className="text-base">Acessar como cliente</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function traduzErro(message: string) {
  if (message.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (message.includes("User already registered")) return "Este e-mail ja esta cadastrado.";
  if (message.includes("Email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (message.includes("Password should be")) return "A senha deve ter pelo menos 6 caracteres.";
  return "Nao foi possivel concluir. Tente novamente.";
}