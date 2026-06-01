import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Star, Clock, Filter, ArrowRight, X, MessageCircle, ShoppingCart, Shield, ChevronRight } from "lucide-react";

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

type Service = {
  id: number;
  title: string;
  description: string;
  category: string;
  seller: string;
  initials: string;
  rating: number;
  reviews: number;
  price: number;
  delivery: string;
  badge: string | null;
  badgeColor: string;
  image: string;
  includes: string[];
};

const MOCK_SERVICES: Service[] = [
  { id: 1, title: "Logo profissional para sua marca", description: "Criação de identidade visual marcante: receba 3 conceitos iniciais, revisões ilimitadas e todos os arquivos finais em PNG, SVG e PDF vetorizado. Ideal para negócios que querem se destacar.", category: "Design", seller: "Ana Lima", initials: "AL", rating: 4.9, reviews: 127, price: 35, delivery: "3 dias", badge: "Top Vendedor", badgeColor: "bg-amber-50 text-amber-700", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop&auto=format", includes: ["3 conceitos de logo", "Revisões ilimitadas", "Arquivos PNG, SVG e PDF", "Uso comercial"] },
  { id: 2, title: "Aula de inglês conversacional (1h)", description: "Sessão 1-a-1 de inglês focada em conversação real: vocabulário do cotidiano, pronúncia correta e correção de erros comuns. Adaptada ao seu nível, do básico ao avançado.", category: "Idiomas", seller: "Carla Oliveira", initials: "CO", rating: 5.0, reviews: 89, price: 25, delivery: "Imediato", badge: null, badgeColor: "", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=225&fit=crop&auto=format", includes: ["Aula ao vivo por vídeo", "Material de apoio PDF", "Exercícios para praticar", "Feedback personalizado"] },
  { id: 3, title: "Edição de vídeo para YouTube (5min)", description: "Edição profissional de até 5 minutos: cortes dinâmicos, trilha sonora licenciada, legendas automáticas e color grading otimizado para a plataforma. Entrega em até 5 dias úteis.", category: "Vídeo", seller: "Lucas Mendes", initials: "LM", rating: 4.7, reviews: 54, price: 60, delivery: "5 dias", badge: "Em alta", badgeColor: "bg-primary/10 text-primary", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=225&fit=crop&auto=format", includes: ["Até 5 min de vídeo final", "Color grading", "Trilha sonora livre", "Legendas automáticas"] },
  { id: 4, title: "Thumbnail impactante para YouTube", description: "Design de thumbnail feito para aumentar o CTR do seu canal: composição visual chamativa, tipografia impactante e paleta de cores otimizada para aparelhos mobile e TV.", category: "Design", seller: "Carla Souza", initials: "CS", rating: 4.9, reviews: 203, price: 20, delivery: "1 dia", badge: "Mais pedido", badgeColor: "bg-emerald-50 text-emerald-700", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop&auto=format", includes: ["1 thumbnail em alta resolução", "Arquivo editável PSD", "Entrega em 24h", "1 revisão gratuita"] },
  { id: 5, title: "Site responsivo em HTML + CSS", description: "Desenvolvimento de landing page ou site institucional responsivo com código semântico, acessível e otimizado para SEO. Inclui formulário de contato e integração com Google Analytics.", category: "Programação", seller: "Felipe Torres", initials: "FT", rating: 4.6, reviews: 41, price: 80, delivery: "7 dias", badge: null, badgeColor: "", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&auto=format", includes: ["Até 5 seções", "100% responsivo", "Formulário de contato", "SEO básico"] },
  { id: 6, title: "Mentoria de carreira em tech (1h)", description: "Sessão estratégica para quem quer entrar ou crescer na área de tecnologia: revisão de currículo e portfólio, dicas de entrevistas, roadmap personalizado e orientação sobre o mercado.", category: "Programação", seller: "Juliana Reis", initials: "JR", rating: 5.0, reviews: 32, price: 120, delivery: "Agendado", badge: "⭐ Premiado", badgeColor: "bg-amber-50 text-amber-700", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop&auto=format", includes: ["1h ao vivo por vídeo", "Revisão de currículo", "Roadmap de estudos", "Suporte pós-sessão por 7 dias"] },
  { id: 7, title: "Identidade visual completa", description: "Pacote completo de branding: logo, paleta de cores, tipografia, padrões gráficos e manual de marca em PDF. Tudo o que seu negócio precisa para se comunicar com consistência.", category: "Design", seller: "Marcos Silva", initials: "MS", rating: 4.8, reviews: 76, price: 150, delivery: "10 dias", badge: null, badgeColor: "", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=225&fit=crop&auto=format", includes: ["Logo + variações", "Paleta de cores", "Manual de marca PDF", "Arquivos editáveis"] },
  { id: 8, title: "Aula de violão para iniciantes", description: "Aprenda do zero ao ritmo de samba, bossa nova ou pop. Aula prática de 1 hora com tablatura inclusa, exercícios de aquecimento e dicas de postura para evitar lesões.", category: "Música", seller: "Beatriz Costa", initials: "BC", rating: 4.9, reviews: 45, price: 30, delivery: "Imediato", badge: "Novo", badgeColor: "bg-emerald-50 text-emerald-700", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=225&fit=crop&auto=format", includes: ["1h ao vivo por vídeo", "Tablatura da música escolhida", "Exercícios semanais", "Gravação da aula"] },
  { id: 9, title: "Ensaio fotográfico editorial", description: "Ensaio externo ou em estúdio com direção de arte, orientação de poses e pós-produção profissional. Receba 20 fotos editadas em alta resolução para uso em redes sociais e portfólio.", category: "Fotografia", seller: "Rafael Moura", initials: "RM", rating: 4.7, reviews: 28, price: 200, delivery: "3 dias", badge: null, badgeColor: "", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=225&fit=crop&auto=format", includes: ["Até 2h de ensaio", "20 fotos editadas", "Entrega via nuvem", "Uso pessoal e comercial"] },
];

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-3xl sm:rounded-t-2xl bg-muted">
          <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
          {service.badge && (
            <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${service.badgeColor}`}>
              {service.badge}
            </span>
          )}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">{service.category}</span>
          <h2 className="mt-1 text-xl font-bold leading-snug">{service.title}</h2>

          {/* Seller */}
          <div className="mt-3 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-cta-gradient text-xs font-bold text-white shrink-0">
              {service.initials}
            </div>
            <div>
              <p className="text-sm font-semibold">{service.seller}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{service.rating}</span>
                <span>({service.reviews} avaliações)</span>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xs text-muted-foreground">a partir de</div>
              <div className="text-2xl font-bold text-primary">R$ {service.price}</div>
            </div>
          </div>

          {/* Delivery */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-3 py-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> Entrega em {service.delivery}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{service.description}</p>

          {/* Includes */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">O que está incluído</p>
            <ul className="space-y-1.5">
              {service.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badge */}
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-surface border border-border p-3 text-xs text-muted-foreground">
            <Shield className="h-4 w-4 text-primary shrink-0" />
            Pagamento seguro e garantia de satisfação pela EduConnect.
          </div>

          {/* CTAs */}
          <div className="mt-5 flex gap-3">
            <Link
              to="/signup"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-(--shadow-glow) transition-transform hover:scale-[1.02]"
            >
              <ShoppingCart className="h-4 w-4" /> Contratar agora
            </Link>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-primary"
            >
              <MessageCircle className="h-4 w-4" /> Mensagem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplacePage() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
            <div key={s.id} className="group card-lift flex flex-col rounded-2xl border border-border bg-surface overflow-hidden">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {s.badge && (
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${s.badgeColor}`}>{s.badge}</span>
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
                <button
                    onClick={() => setSelectedService(s)}
                    className="mt-3 w-full rounded-full bg-primary/10 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
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

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
}
