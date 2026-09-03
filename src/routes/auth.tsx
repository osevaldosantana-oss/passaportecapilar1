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
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9F6F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* Outer golden frame */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "3px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #C5A059, #e8d5a3, #C5A059, #a8893e, #C5A059)",
          boxShadow: "0 8px 40px rgba(74, 14, 14, 0.15), 0 0 0 1px rgba(197, 160, 89, 0.3)",
        }}
      >
        {/* Inner card */}
        <div
          style={{
            backgroundColor: "#F9F6F0",
            borderRadius: "13px",
            padding: "40px 36px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top decorative corners */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              width: "24px",
              height: "24px",
              borderTop: "2px solid #C5A059",
              borderLeft: "2px solid #C5A059",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "24px",
              height: "24px",
              borderTop: "2px solid #C5A059",
              borderRight: "2px solid #C5A059",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              width: "24px",
              height: "24px",
              borderBottom: "2px solid #C5A059",
              borderLeft: "2px solid #C5A059",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              width: "24px",
              height: "24px",
              borderBottom: "2px solid #C5A059",
              borderRight: "2px solid #C5A059",
              opacity: 0.7,
            }}
          />

          {/* Logo / Title */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "2px solid #C5A059",
                marginBottom: "16px",
                backgroundColor: "#4A0E0E",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: "24px",
                  color: "#C5A059",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                PC
              </span>
            </div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#877270",
                marginBottom: "4px",
              }}
            >
              Passaporte Capilar™
            </p>
            <h1
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#4A0E0E",
                margin: "0 0 4px 0",
                letterSpacing: "0.02em",
              }}
            >
              Passaporte Capilar™
            </h1>
            <div
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "#C5A059",
                margin: "8px auto",
                opacity: 0.6,
              }}
            />
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#877270",
              }}
            >
              {mode === "signin" ? "Acesso ao sistema" : "Criar nova conta"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
            {mode === "signup" && (
              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="fullName"
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#877270",
                    marginBottom: "6px",
                  }}
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
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    border: "1px solid rgba(26, 26, 26, 0.2)",
                    backgroundColor: "transparent",
                    padding: "10px 14px",
                    fontSize: "14px",
                    color: "#1A1A1A",
                    outline: "none",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    borderRadius: "4px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#4A0E0E")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(26, 26, 26, 0.2)")}
                />
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#877270",
                  marginBottom: "6px",
                }}
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
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: "1px solid rgba(26, 26, 26, 0.2)",
                  backgroundColor: "transparent",
                  padding: "10px 14px",
                  fontSize: "14px",
                  color: "#1A1A1A",
                  outline: "none",
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  borderRadius: "4px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4A0E0E")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(26, 26, 26, 0.2)")}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#877270",
                  marginBottom: "6px",
                }}
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
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: "1px solid rgba(26, 26, 26, 0.2)",
                  backgroundColor: "transparent",
                  padding: "10px 14px",
                  fontSize: "14px",
                  color: "#1A1A1A",
                  outline: "none",
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  borderRadius: "4px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4A0E0E")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(26, 26, 26, 0.2)")}
              />
            </div>

            {error && (
              <p style={{ fontSize: "13px", color: "#ba1a1a", marginBottom: "12px" }}>{error}</p>
            )}
            {notice && (
              <p style={{ fontSize: "13px", color: "#4A0E0E", marginBottom: "12px" }}>{notice}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#4A0E0E",
                color: "#F9F6F0",
                border: "none",
                padding: "14px 24px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                transition: "opacity 0.2s",
                borderRadius: "4px",
              }}
            >
              {loading ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(26, 26, 26, 0.12)" }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#877270",
              }}
            >
              ou
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(26, 26, 26, 0.12)" }} />
          </div>

          {/* Google */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              border: "1px solid rgba(26, 26, 26, 0.25)",
              backgroundColor: "#F9F6F0",
              padding: "12px 24px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#1A1A1A",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.2s",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Entrar com Google
          </button>

          {/* Apple */}
          <button
            type="button"
            disabled={loading}
            onClick={handleAppleSignIn}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              border: "1px solid rgba(26, 26, 26, 0.25)",
              backgroundColor: "#F9F6F0",
              padding: "12px 24px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#1A1A1A",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.2s",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          >
            <svg viewBox="0 0 384 512" style={{ width: "18px", height: "18px", fill: "#1A1A1A" }}>
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            Entrar com Apple
          </button>

          {/* Toggle */}
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setNotice(null);
              }}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#877270",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {mode === "signin" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
            </button>
          </div>

          {/* Access as client link */}
          <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(26, 26, 26, 0.1)" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C5A059",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "12px" }}>↗</span>
              Acessar como cliente
            </button>
          </div>
        </div>
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
