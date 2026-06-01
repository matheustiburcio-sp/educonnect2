import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth-service";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Criar conta — EduConnect" },
      { name: "description", content: "Crie sua conta gratuita na EduConnect e comece a aprender hoje." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setInfo(null); setLoading(true);
    const { data, error } = await authService.signUp({ email, name, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    if (data.session) navigate({ to: "/" });
    else setInfo("Conta criada! Verifique seu e-mail para confirmar antes de entrar.");
  };

  const handleGoogle = async () => {
    setError(null);
    const result = await authService.signInWithGoogle(window.location.origin);
    if (result.error) setError("Não foi possível entrar com o Google.");
    if (result.redirected) return;
    if (!result.error) navigate({ to: "/" });
  };

  return (
    <div className="bg-hero-gradient min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-10">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
            <BookOpen className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">EDU</div>
            <div className="-mt-1 font-display text-base font-bold tracking-tight text-primary">CONNECT</div>
          </div>
        </Link>
        <div className="w-full rounded-3xl border border-border bg-surface/80 p-8 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="mt-1 text-sm text-muted-foreground">Comece a aprender de forma gratuita.</p>
          <div className="mt-6 space-y-4">
            <button onClick={handleGoogle} type="button" className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-primary">
              <GoogleIcon /> Cadastrar com Google
            </button>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldRow label="Nome completo">
                <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Como devemos te chamar?" className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary" />
              </FieldRow>
              <FieldRow label="E-mail">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="voce@email.com" className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary" />
              </FieldRow>
              <FieldRow label="Senha">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Mínimo de 6 caracteres" className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary" />
              </FieldRow>
              {error && <p className="text-xs text-destructive">{error}</p>}
              {info && <p className="text-xs text-success">{info}</p>}
              <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02] disabled:opacity-60">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Criar conta <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Já tem conta? <Link to="/login" className="font-semibold text-primary hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.6 14.5 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12s4.2 9.4 9.4 9.4c5.4 0 9-3.8 9-9.2 0-.6-.07-1.1-.16-1.6H12z"/>
      <path fill="#34A853" d="M12 21.4c2.5 0 4.6-.8 6.1-2.2l-3-2.3c-.8.6-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.7H3.8v2.3C5.4 19.7 8.5 21.4 12 21.4z"/>
      <path fill="#FBBC05" d="M6.9 14.1c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V8h-3C3.3 9.2 3 10.6 3 12s.3 2.8.9 4l3-2z"/>
      <path fill="#4285F4" d="M21.4 12.2c0-.6-.06-1.2-.16-1.8H12v3.9h5.3c-.2 1.2-.9 2.2-1.9 2.9l3 2.3c1.7-1.6 2.9-3.9 2.9-7.3z"/>
    </svg>
  );
}