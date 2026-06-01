import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Star, Clock, Filter, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — EduConnect" },
      { name: "description", content: "Contrate habilidades e serviços da comunidade EduConnect." },
    ],
  }),
  component: MarketplacePage,
});

const CATEGORIES = ["Todos", "Design", "Programação", "Idiomas", "Música", "Vídeo", "Marketing", "Fotografia"];

const MOCK_SERVICES = [
  { id: 1, title: "Logo profissional para sua marca", category: "Design", seller: "Ana Lima", initials: "AL", rating: 4.9, reviews: 127, price: 35, delivery: "3 dias", badge: "Top Vendedor", badgeColor: "bg-amber-50 text-amber-700" },
  { id: 2, title: "Aula de inglês conversacional (1h)", category: "Idiomas", seller: "Carla Oliveira", initials: "CO", rating: 5.0, reviews: 89, price: 25, delivery: "Imediato", badge: null, badgeColor: "" },
  { id: 3, title: "Edição de vídeo para YouTube (5min)", category: "Vídeo", seller: "Lucas Mendes", initials: "LM", rating: 4.7, reviews: 54, price: 60, delivery: "5 dias", badge: "Em alta", badgeColor: "bg-primary/10 text-primary" },
  { id: 4, title: "Thumbnail impactante para YouTube", category: "Design", seller: "Carla Souza", initials: "CS", rating: 4.9, reviews: 203, price: 20, delivery: "1 dia", badge: "Mais pedido", badgeColor: "bg-emerald-50 text-emerald-700" },
  { id: 5, title: "Site responsivo em HTML + CSS", category: "Programação", seller: "Felipe Torres", initials: "FT", rating: 4.6, reviews: 41, price: 80, delivery: "7 dias", badge: null, badgeColor: "" },
  { id: 6, title: "Mentoria de carreira em tech (1h)", category: "Programação", seller: "Juliana Reis", initials: "JR", rating: 5.0, reviews: 32, price: 120, delivery: "Agendado", badge: "⭐ Premiado", badgeColor: "bg-amber-50 text-amber-700" },
  { id: 7, title: "Identidade visual completa", category: "Design", seller: "Marcos Silva", initials: "MS", rating: 4.8, reviews: 76, price: 150, delivery: "10 dias", badge: null, badgeColor: "" },
  { id: 8, title: "Aula de violão para iniciantes", category: "Música", seller: "Beatriz Costa", initials: "BC", rating: 4.9, reviews: 45, price: 30, delivery: "Imediato", badge: "Novo", badgeColor: "bg-emerald-50 text-emerald-700" },
  { id: 9, title: "Ensaio fotográfico editorial", category: "Fotografia", seller: "Rafael Moura", initials: "RM", rating: 4.7, reviews: 28, price: 200, delivery: "3 dias", badge: null, badgeColor: "" },
];

function MarketplacePage() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = MOCK_SERVICES.filter((s) => {
    const matchCat = category === "Todos" || s.category === category;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.seller.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
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
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-primary">
            <Filter className="h-4 w-4" /> Filtros
          </button>
          <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-(--shadow-glow) transition-transform hover:scale-105">
            Publicar serviço
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold lg:text-5xl">
            Contrate <span className="text-gradient-accent">talentos reais</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Serviços criados por pessoas da comunidade que amam o que fazem.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-primary text-white shadow-(--shadow-glow)"
                  : "border border-border bg-surface text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} serviço{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <div key={s.id} className="card-lift flex flex-col rounded-2xl border border-border bg-surface overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-cta-gradient text-xl font-bold text-white">
                  {s.initials}
                </div>
                {s.badge && (
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${s.badgeColor}`}>{s.badge}</span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="text-xs font-medium text-primary">{s.category}</span>
                <h3 className="mt-1 text-sm font-semibold line-clamp-2">{s.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-cta-gradient text-[10px] font-bold text-white">{s.initials}</div>
                  <span className="text-xs text-muted-foreground">{s.seller}</span>
                </div>
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{s.rating}</span>
                    <span className="text-muted-foreground">({s.reviews})</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">a partir de</div>
                    <div className="text-base font-bold text-primary">R$ {s.price}</div>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Entrega em {s.delivery}
                </div>
                <button className="mt-3 w-full rounded-full bg-primary/10 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-lg font-semibold">Nenhum serviço encontrado</p>
            <p className="mt-2 text-sm text-muted-foreground">Tente outra categoria ou termo de busca.</p>
            <Link to="/signup" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
              Publicar o primeiro serviço <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
