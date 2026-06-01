import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Award, Zap, ArrowRight, BookOpen, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Perfil — EduConnect" },
      { name: "description", content: "Veja seu perfil, XP, badges e histórico na EduConnect." },
    ],
  }),
  component: ProfilePage,
});

const BADGES = [
  { emoji: "🎓", label: "Primeiro ensino", xp: "+50 XP", earned: true },
  { emoji: "⭐", label: "5 estrelas", xp: "+100 XP", earned: true },
  { emoji: "🤝", label: "10 trocas", xp: "+200 XP", earned: true },
  { emoji: "🚀", label: "Mentoria #1", xp: "+150 XP", earned: false },
  { emoji: "🏆", label: "Top Vendedor", xp: "+500 XP", earned: false },
  { emoji: "💡", label: "Mestre do Match", xp: "+300 XP", earned: false },
];

const SKILLS_TEACH = ["JavaScript", "React", "TypeScript", "Node.js"];
const SKILLS_LEARN = ["Design", "Figma", "UI/UX"];

const ACTIVITY = [
  { type: "teach", text: "Ensinou React para Pedro Costa", xp: "+50 XP", time: "há 2h" },
  { type: "review", text: "Recebeu avaliação 5★ de Ana Lima", xp: "+20 XP", time: "há 5h" },
  { type: "match", text: "Novo match com Carla Oliveira", xp: "+10 XP", time: "há 1d" },
  { type: "level", text: "Subiu para Nível 12!", xp: "+100 XP", time: "há 3d" },
];

function ProfilePage() {
  const XP = 2840;
  const XP_NEXT = 3000;
  const progress = Math.round((XP / XP_NEXT) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 rounded-xl bg-cta-gradient place-items-center">
              <span className="font-display font-bold text-xs text-white">ec</span>
            </div>
            <span className="font-display font-bold text-sm tracking-tight">educonnect</span>
          </Link>
          <div className="flex-1" />
          <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-(--shadow-glow) transition-transform hover:scale-105">
            Criar conta grátis
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Main column */}
          <div className="space-y-6">
            {/* Profile card */}
            <div className="rounded-2xl border border-border bg-surface p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="relative">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-cta-gradient text-2xl font-bold text-white shadow-(--shadow-glow)">
                    AL
                  </div>
                  <div className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white border-2 border-background">
                    12
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">Ana Lima</h1>
                      <p className="text-sm text-muted-foreground">Designer & Criadora de Conteúdo</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Top Criadora</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 avaliação
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <BookOpen className="h-4 w-4 text-primary" /> 23 serviços
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MessageSquare className="h-4 w-4 text-secondary" /> 127 clientes
                    </span>
                  </div>
                  {/* XP bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Nível 12 → 13</span>
                      <span className="font-semibold">{XP.toLocaleString()} / {XP_NEXT.toLocaleString()} XP</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-cta-gradient transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">{XP_NEXT - XP} XP para o próximo nível</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-semibold mb-3 text-sm">O que eu ensino</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_TEACH.map((s) => (
                    <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{s}</span>
                  ))}
                  <button className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    + Adicionar
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-semibold mb-3 text-sm">Quero aprender</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_LEARN.map((s) => (
                    <span key={s} className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">{s}</span>
                  ))}
                  <button className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-secondary hover:text-secondary">
                    + Adicionar
                  </button>
                </div>
              </div>
            </div>

            {/* Activity feed */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" /> Atividade recente
              </h3>
              <div className="space-y-4">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        {a.type === "teach" ? <BookOpen className="h-3.5 w-3.5" /> : a.type === "review" ? <Star className="h-3.5 w-3.5" /> : <Zap className="h-3.5 w-3.5" />}
                      </div>
                      <p className="text-sm">{a.text}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-semibold text-primary">{a.xp}</div>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-semibold mb-4">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total XP", value: XP.toLocaleString(), color: "text-primary" },
                  { label: "Nível", value: "12", color: "text-amber-600" },
                  { label: "Serviços", value: "23", color: "text-secondary" },
                  { label: "Avaliação", value: "4.9★", color: "text-amber-500" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-background p-3 text-center">
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" /> Conquistas
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {BADGES.map((b, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-xl p-2.5 ${
                      b.earned
                        ? "border border-primary/20 bg-primary/5"
                        : "border border-border bg-muted/20 opacity-50"
                    }`}
                  >
                    <span className="text-xl">{b.emoji}</span>
                    <div>
                      <div className="text-[11px] font-semibold leading-tight">{b.label}</div>
                      <div className={`text-[10px] ${b.earned ? "text-primary" : "text-muted-foreground"}`}>{b.xp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-cta-gradient p-5 text-white text-center">
              <h3 className="font-bold">Personalize seu perfil</h3>
              <p className="mt-1 text-xs opacity-80">Adicione foto, bio e mais habilidades para atrair mais clientes.</p>
              <Link to="/signup" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary transition-transform hover:scale-105">
                Criar conta <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
