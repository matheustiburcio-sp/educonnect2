import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Sparkles, Repeat2, Zap, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth-service";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — EduConnect" },
      { name: "description", content: "Acesse sua conta EduConnect para continuar aprendendo." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await authService.signInWithPassword(email, password);
    setLoading(false);
    if (signInError) {
      setError(signInError.message === "Invalid login credentials" ? "E-mail ou senha incorretos." : signInError.message);
      return;
    }
    navigate({ to: "/" });
  };

  const handleGoogle = async () => {
    setError(null);
    const result = await authService.signInWithGoogle(window.location.origin);
    if (result.error) setError("Não foi possível entrar com o Google.");
    if (result.redirected) return;
    if (!result.error) navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-cta-gradient p-12 text-white">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 rounded-xl bg-white/20 place-items-center">
            <span className="font-display font-bold text-sm">ec</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">educonnect</span>
        </Link>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Aprenda ensinando
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Transforme seu conhecimento em oportunidade.
          </h2>
          <p className="mt-4 text-base opacity-80 leading-relaxed">
            Conecte-se com milhares de pessoas que ensinam, aprendem e crescem juntas.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { icon: Repeat2, text: "Troque habilidades com a comunidade" },
              { icon: Zap, text: "Ganhe XP e suba de nível" },
              { icon: Star, text: "Construa sua reputação como educador" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs opacity-60">© 2024 EduConnect</p>
      </div>
      {/* Right form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="grid h-9 w-9 rounded-xl bg-cta-gradient place-items-center">
              <span className="font-display font-bold text-sm text-white">ec</span>
            </div>
            <span className="font-display font-bold text-base tracking-tight">educonnect</span>
          </Link>
          <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-muted-foreground">Entre para continuar sua jornada.</p>
          <div className="mt-8 space-y-4">
            <button onClick={handleGoogle} type="button" className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-primary">
              <GoogleIcon /> Continuar com Google
            </button>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="E-mail" type="email" value={email} onChange={setEmail} placeholder="voce@email.com" required />
              <Field label="Senha" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-(--shadow-glow) transition-transform hover:scale-[1.02] disabled:opacity-60">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Entrar <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
            <p className="text-center text-xs text-muted-foreground">
              Não tem conta? <Link to="/signup" className="font-semibold text-primary hover:underline">Cadastre-se grátis</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder, required }: { label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary" />
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