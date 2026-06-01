import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Repeat2, Search, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Matches — EduConnect" },
      { name: "description", content: "Encontre seu match perfeito para trocar habilidades na EduConnect." },
    ],
  }),
  component: MatchesPage,
});

const MOCK_MATCHES = [
  {
    id: 1,
    name: "Pedro Costa",
    initials: "PC",
    role: "Dev Fullstack",
    teaches: ["JavaScript", "React", "Python"],
    learns: ["Design", "Figma"],
    compatibility: 97,
    level: 15,
    bg: "from-indigo-50 to-blue-50",
  },
  {
    id: 2,
    name: "Carla Oliveira",
    initials: "CO",
    role: "Professora de Inglês",
    teaches: ["Inglês", "Espanhol"],
    learns: ["Programação", "Python"],
    compatibility: 89,
    level: 18,
    bg: "from-emerald-50 to-teal-50",
  },
  {
    id: 3,
    name: "Lucas Mendes",
    initials: "LM",
    role: "Editor de Vídeo",
    teaches: ["Premiere", "After Effects"],
    learns: ["Marketing", "SEO"],
    compatibility: 82,
    level: 9,
    bg: "from-amber-50 to-yellow-50",
  },
  {
    id: 4,
    name: "Beatriz Costa",
    initials: "BC",
    role: "Músico & Professor",
    teaches: ["Violão", "Teoria Musical"],
    learns: ["Inglês", "Edição de Vídeo"],
    compatibility: 76,
    level: 7,
    bg: "from-purple-50 to-pink-50",
  },
];

function MatchesPage() {
  const [myTeach, setMyTeach] = useState("");
  const [myLearn, setMyLearn] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

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
          <nav className="hidden items-center gap-1 lg:flex ml-4">
            {[{ label: "Explorar", to: "/explore" }, { label: "Marketplace", to: "/marketplace" }, { label: "Matches", to: "/matches" }].map((link) => (
              <Link key={link.to} to={link.to} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1.5 text-sm font-medium text-secondary mb-4">
            <Repeat2 className="h-4 w-4" /> Troca de habilidades
          </div>
          <h1 className="text-4xl font-bold lg:text-5xl">
            Encontre seu <span className="text-gradient-accent">match perfeito</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto">
            Diga o que você ensina e o que quer aprender. Nosso algoritmo encontra as melhores combinações.
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="mx-auto max-w-2xl mb-12">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Eu sei ensinar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ex: React, Inglês, Design..."
                    value={myTeach}
                    onChange={(e) => setMyTeach(e.target.value)}
                    className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Quero aprender</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ex: Python, Violão, Marketing..."
                    value={myLearn}
                    onChange={(e) => setMyLearn(e.target.value)}
                    className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-(--shadow-glow) transition-transform hover:scale-[1.01]"
            >
              <Sparkles className="h-4 w-4" /> Encontrar matches
            </button>
          </div>
        </form>

        {/* Results */}
        {(searched || true) && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {searched && myTeach ? `Matches para "${myTeach}"` : "Matches sugeridos para você"}
              </h2>
              <span className="text-sm text-muted-foreground">{MOCK_MATCHES.length} encontrados</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MOCK_MATCHES.map((u) => (
                <div key={u.id} className={`card-lift rounded-2xl border border-border bg-linear-to-br ${u.bg} p-5`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-cta-gradient text-sm font-bold text-white">
                        {u.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{u.compatibility}%</div>
                      <div className="text-xs text-muted-foreground">match</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Ensina</div>
                      <div className="flex flex-wrap gap-1">
                        {u.teaches.map((t) => (
                          <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Quer aprender</div>
                      <div className="flex flex-wrap gap-1">
                        {u.learns.map((t) => (
                          <span key={t} className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 w-full rounded-full bg-white/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cta-gradient"
                      style={{ width: `${u.compatibility}%` }}
                    />
                  </div>
                  <button className="mt-4 w-full rounded-full border border-primary/30 bg-white/60 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
                    Conectar <ArrowRight className="inline h-3.5 w-3.5 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA for unauth */}
        <div className="mt-16 rounded-3xl bg-cta-gradient p-10 text-center text-white">
          <h2 className="text-2xl font-bold">Crie seu perfil para matches mais precisos</h2>
          <p className="mt-3 text-sm opacity-80">Quanto mais completo seu perfil, melhores são as sugestões do algoritmo.</p>
          <Link to="/signup" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary transition-transform hover:scale-105">
            Criar conta grátis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
