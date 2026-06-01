import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Star, ArrowRight, Code2, Palette, Languages, Music2, Video, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explorar — EduConnect" },
      { name: "description", content: "Explore pessoas e habilidades da comunidade EduConnect." },
    ],
  }),
  component: ExplorePage,
});

const FILTERS = ["Todos", "Design", "Programação", "Idiomas", "Música", "Vídeo", "Marketing"];

const TRENDING = [
  { icon: Code2, label: "React", count: "234 pessoas" },
  { icon: Palette, label: "Figma", count: "189 pessoas" },
  { icon: Languages, label: "Inglês", count: "412 pessoas" },
  { icon: Music2, label: "Violão", count: "97 pessoas" },
  { icon: Video, label: "Edição de Vídeo", count: "156 pessoas" },
  { icon: TrendingUp, label: "Marketing", count: "203 pessoas" },
];

const PEOPLE = [
  { id: 1, name: "Ana Lima", initials: "AL", role: "Designer & Ilustradora", teaches: ["Photoshop", "Illustrator", "UI Design"], learns: ["React"], rating: 4.9, services: 23, level: 12, badge: "Top Criadora", badgeBg: "bg-amber-50 text-amber-700" },
  { id: 2, name: "Pedro Costa", initials: "PC", role: "Dev Fullstack", teaches: ["JavaScript", "React", "Python"], learns: ["Design"], rating: 4.8, services: 18, level: 15, badge: "Expert", badgeBg: "bg-primary/10 text-primary" },
  { id: 3, name: "Carla Oliveira", initials: "CO", role: "Professora de Inglês", teaches: ["Inglês", "Espanhol"], learns: ["Programação"], rating: 5.0, services: 31, level: 18, badge: "⭐ Destaque", badgeBg: "bg-amber-50 text-amber-700" },
  { id: 4, name: "Lucas Mendes", initials: "LM", role: "Editor de Vídeo", teaches: ["Premiere", "After Effects"], learns: ["Marketing"], rating: 4.7, services: 14, level: 9, badge: null, badgeBg: "" },
  { id: 5, name: "Beatriz Costa", initials: "BC", role: "Músico & Professor", teaches: ["Violão", "Teoria Musical"], learns: ["Inglês"], rating: 4.9, services: 8, level: 7, badge: "Novo", badgeBg: "bg-emerald-50 text-emerald-700" },
  { id: 6, name: "Felipe Torres", initials: "FT", role: "Dev Front-end", teaches: ["HTML", "CSS", "JavaScript"], learns: ["Design", "Figma"], rating: 4.6, services: 11, level: 10, badge: null, badgeBg: "" },
  { id: 7, name: "Juliana Reis", initials: "JR", role: "Tech Lead & Mentora", teaches: ["Carreira em Tech", "Soft Skills"], learns: ["Inglês Avançado"], rating: 5.0, services: 5, level: 20, badge: "⭐ Premiada", badgeBg: "bg-amber-50 text-amber-700" },
  { id: 8, name: "Rafael Moura", initials: "RM", role: "Fotógrafo", teaches: ["Fotografia", "Edição no Lightroom"], learns: ["Marketing Digital"], rating: 4.7, services: 9, level: 8, badge: null, badgeBg: "" },
];

function ExplorePage() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = PEOPLE.filter((p) => {
    const allSkills = [...p.teaches, ...p.learns, p.role];
    const matchFilter = filter === "Todos" || allSkills.some((s) => s.toLowerCase().includes(filter.toLowerCase()));
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || allSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="grid h-8 w-8 rounded-xl bg-cta-gradient place-items-center">
              <span className="font-display font-bold text-xs text-white">ec</span>
            </div>
            <span className="font-display font-bold text-sm tracking-tight hidden sm:block">educonnect</span>
          </Link>
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar pessoas ou habilidades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-(--shadow-glow) transition-transform hover:scale-105 shrink-0">
            Entrar na comunidade
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        {/* Trending skills */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Habilidades em alta</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {TRENDING.map((t) => (
              <button
                key={t.label}
                onClick={() => setSearch(t.label)}
                className="card-lift flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-left transition-all hover:border-primary"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.count}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-white shadow-(--shadow-glow)"
                  : "border border-border bg-surface text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Comunidade</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} pessoa{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* People grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((u) => (
            <div key={u.id} className="card-lift flex flex-col rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-cta-gradient text-base font-bold text-white">
                    {u.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.role}</div>
                  </div>
                </div>
                {u.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold shrink-0 ${u.badgeBg}`}>{u.badge}</span>
                )}
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Ensina</div>
                  <div className="flex flex-wrap gap-1">
                    {u.teaches.slice(0, 3).map((t) => (
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
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {u.rating}</span>
                <span>{u.services} serviços</span>
                <span className="font-semibold text-primary">Nv. {u.level}</span>
              </div>
              <Link to="/matches" className="mt-3 block w-full rounded-full border border-primary/30 bg-primary/5 py-2 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
                Ver match <ArrowRight className="inline h-3.5 w-3.5 ml-1" />
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-lg font-semibold">Nenhuma pessoa encontrada</p>
            <p className="mt-2 text-sm text-muted-foreground">Tente outro filtro ou habilidade.</p>
          </div>
        )}
      </main>
    </div>
  );
}
