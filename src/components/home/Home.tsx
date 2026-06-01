import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search, Bell, ArrowRight, Star, Users, Zap, Repeat2,
  Code2, Palette, Languages, Music2, Video, TrendingUp, Calculator, Camera,
  LogOut, Menu, X, Sparkles, ChevronRight, Shield, Clock, Award,
  GraduationCap, BookOpen, MessageSquare,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth-service";
import heroImg from "@/assets/hero-student.jpg";
import courseTech from "@/assets/course-tech.jpg";
import courseData from "@/assets/course-data.jpg";
import courseProject from "@/assets/course-project.jpg";
import courseSustain from "@/assets/course-sustainability.jpg";
import courseWeb from "@/assets/course-web.jpg";
import progFullstack from "@/assets/program-fullstack.jpg";
import progSchool from "@/assets/program-school.jpg";
import progHealth from "@/assets/program-health.jpg";
import avatarMariana from "@/assets/avatar-mariana.jpg";

/* ─── Dados estáticos ─────────────────────────────────────────────────────── */

const navLinks = [
  { label: "Explorar", to: "/explore" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Matches", to: "/matches" },
  { label: "Perfil", to: "/profile" },
];

const categories = [
  { icon: Code2, label: "Programação", count: "1.240+", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  { icon: Palette, label: "Design", count: "890+", color: "bg-pink-50 text-pink-600 border-pink-100" },
  { icon: Languages, label: "Idiomas", count: "640+", color: "bg-sky-50 text-sky-600 border-sky-100" },
  { icon: Music2, label: "Música", count: "310+", color: "bg-purple-50 text-purple-600 border-purple-100" },
  { icon: Video, label: "Vídeo", count: "520+", color: "bg-red-50 text-red-600 border-red-100" },
  { icon: TrendingUp, label: "Marketing", count: "750+", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { icon: Calculator, label: "Matemática", count: "280+", color: "bg-amber-50 text-amber-600 border-amber-100" },
  { icon: Camera, label: "Fotografia", count: "190+", color: "bg-slate-50 text-slate-600 border-slate-100" },
];

const services = [
  {
    img: courseWeb, category: "Design", title: "Criação de logo profissional",
    seller: "Ana Lima", avatar: avatarMariana, rating: 4.9, reviews: 127, price: 35,
    delivery: "3 dias", badge: "Top Vendedor", badgeColor: "bg-amber-50 text-amber-700",
  },
  {
    img: courseData, category: "Idiomas", title: "Aula de inglês conversacional",
    seller: "Pedro Costa", avatar: null, initials: "PC", rating: 4.8, reviews: 89, price: 25,
    delivery: "Imediato", badge: null, badgeColor: "",
  },
  {
    img: courseTech, category: "Vídeo", title: "Edição de vídeo para YouTube",
    seller: "Lucas Mendes", avatar: null, initials: "LM", rating: 4.7, reviews: 54, price: 60,
    delivery: "5 dias", badge: "Em alta", badgeColor: "bg-primary/10 text-primary",
  },
  {
    img: courseSustain, category: "Design", title: "Thumbnail impactante YouTube",
    seller: "Carla Souza", avatar: null, initials: "CS", rating: 4.9, reviews: 203, price: 20,
    delivery: "1 dia", badge: "Mais pedido", badgeColor: "bg-emerald-50 text-emerald-700",
  },
  {
    img: courseProject, category: "Programação", title: "Site responsivo em HTML + CSS",
    seller: "Felipe Torres", avatar: null, initials: "FT", rating: 4.6, reviews: 41, price: 80,
    delivery: "7 dias", badge: null, badgeColor: "",
  },
  {
    img: progFullstack, category: "Mentoria", title: "Mentoria de carreira em tech",
    seller: "Juliana Reis", avatar: null, initials: "JR", rating: 5.0, reviews: 32, price: 120,
    delivery: "Agendado", badge: "⭐ Premiado", badgeColor: "bg-amber-50 text-amber-700",
  },
];

const featuredUsers = [
  {
    name: "Ana Lima", avatar: avatarMariana, initials: "AL", role: "Designer & Ilustradora",
    teaches: ["Photoshop", "Illustrator", "UI Design"], learns: ["React", "Programação"],
    rating: 4.9, services: 23, xp: 2840, level: 12, badge: "Top Criadora", badgeBg: "bg-amber-50 text-amber-700",
  },
  {
    name: "Pedro Costa", avatar: null, initials: "PC", role: "Dev Fullstack",
    teaches: ["JavaScript", "Python", "React"], learns: ["Design", "Figma"],
    rating: 4.8, services: 18, xp: 3120, level: 15, badge: "Expert", badgeBg: "bg-primary/10 text-primary",
  },
  {
    name: "Carla Oliveira", avatar: null, initials: "CO", role: "Professora de Inglês",
    teaches: ["Inglês", "Espanhol"], learns: ["Edição de Vídeo", "Canva"],
    rating: 5.0, services: 31, xp: 4200, level: 18, badge: "⭐ Destaque", badgeBg: "bg-amber-50 text-amber-700",
  },
  {
    name: "Lucas Mendes", avatar: null, initials: "LM", role: "Editor de Vídeo",
    teaches: ["Premiere", "After Effects", "DaVinci"], learns: ["Marketing", "SEO"],
    rating: 4.7, services: 14, xp: 1650, level: 9, badge: null, badgeBg: "",
  },
];

const howItWorks = [
  { step: "01", icon: Search, title: "Encontre ou ofereça", desc: "Busque habilidades que deseja aprender ou crie seu perfil mostrando o que você sabe ensinar.", color: "bg-primary/10 text-primary" },
  { step: "02", icon: Repeat2, title: "Conecte-se", desc: "Faça trocas de conhecimento, contrate serviços ou encontre um match perfeito para aprender junto.", color: "bg-secondary/10 text-secondary" },
  { step: "03", icon: Zap, title: "Evolua e ganhe", desc: "Acumule XP, suba de nível, colete badges e transforme seu conhecimento em renda.", color: "bg-accent/10 text-accent-foreground" },
];

const stats = [
  { value: "12.400+", label: "Usuários ativos", icon: Users },
  { value: "3.200+", label: "Serviços disponíveis", icon: Zap },
  { value: "890+", label: "Trocas realizadas", icon: Repeat2 },
  { value: "4.9★", label: "Avaliação média", icon: Star },
];

const badges = [
  { emoji: "🎓", label: "Primeiro ensino", xp: "+50 XP" },
  { emoji: "⭐", label: "5 estrelas", xp: "+100 XP" },
  { emoji: "🤝", label: "10 trocas", xp: "+200 XP" },
  { emoji: "🚀", label: "Mentoria #1", xp: "+150 XP" },
  { emoji: "🏆", label: "Top Vendedor", xp: "+500 XP" },
  { emoji: "💡", label: "Mestre do Match", xp: "+300 XP" },
];



function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative h-9 w-9 rounded-xl bg-cta-gradient shadow-(--shadow-glow) flex items-center justify-center transition-transform group-hover:scale-105">
        <span className="text-white font-display font-bold text-sm leading-none">ec</span>
        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-secondary border-2 border-background" />
      </div>
      <div className="leading-tight">
        <span className="font-display text-[15px] font-bold tracking-tight text-foreground">edu</span>
        <span className="font-display text-[15px] font-bold tracking-tight text-primary">connect</span>
      </div>
    </Link>
  );
}

function SectionHeader({ title, subtitle, link }: { title: string; subtitle?: string; link?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold lg:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>}
      </div>
      {link && (
        <Link to="/" className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
          {link} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await authService.signOut();
    navigate({ to: "/" });
  };
  const initial = (session?.user.user_metadata?.display_name || session?.user.email || "?").charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-4">
        <Logo />
        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="relative hidden max-w-xs flex-1 lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar habilidades..."
              className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <button aria-label="Notificações" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground">
            <Bell className="h-4 w-4" />
          </button>
          {session ? (
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-cta-gradient text-sm font-bold text-white">{initial}</div>
              <button onClick={handleLogout} title="Sair" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="h-10 inline-flex items-center rounded-full px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                Entrar
              </Link>
              <Link to="/signup" className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-(--shadow-glow) transition-transform hover:scale-105">
                Cadastre-se
              </Link>
            </div>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full bg-surface lg:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          {!session && (
            <div className="mt-4 flex gap-2">
              <Link to="/login" className="flex-1 rounded-full border border-border py-2.5 text-center text-sm font-semibold">Entrar</Link>
              <Link to="/signup" className="flex-1 rounded-full bg-primary py-2.5 text-center text-sm font-semibold text-white">Cadastrar</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-dot-pattern border border-border mt-6">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Aprenda, ensine e ganhe
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
            Aprenda <span className="text-gradient-accent">ensinando.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto">
            A plataforma onde você troca habilidades, oferece serviços e cresce junto com uma comunidade que valoriza o conhecimento.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="O que você quer aprender ou ensinar?"
                className="h-14 w-full rounded-full border border-border bg-background pl-12 pr-32 text-sm shadow-sm outline-none transition-colors focus:border-primary"
              />
              <button className="absolute right-1.5 top-1.5 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-transform hover:scale-105">
                Buscar <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span>Popular:</span>
            {["React", "Design", "Inglês", "Fotografia", "Python"].map((tag) => (
              <button key={tag} className="rounded-full border border-border bg-surface px-3 py-1 transition-colors hover:border-primary hover:text-primary">
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-background/80 p-5 text-center backdrop-blur-sm">
              <s.icon className="mx-auto h-5 w-5 text-primary mb-2" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mt-16 mx-auto max-w-[1400px] px-6">
      <SectionHeader title="Explore por categoria" subtitle="Encontre habilidades em qualquer área do conhecimento" link="Ver todas" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((c) => (
          <button key={c.label} className={`card-lift flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all hover:scale-105 ${c.color}`}>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/60">
              <c.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">{c.label}</div>
              <div className="text-xs opacity-70">{c.count}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

type Service = (typeof services)[number];

function ServiceCard({ s }: { s: Service }) {
  return (
    <div className="card-lift group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="relative aspect-16/10 overflow-hidden">
        <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {s.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${s.badgeColor}`}>{s.badge}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-primary">{s.category}</span>
        <h3 className="mt-1 text-sm font-semibold line-clamp-2">{s.title}</h3>
        <div className="mt-3 flex items-center gap-2">
          {s.avatar ? (
            <img src={s.avatar} alt={s.seller} className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{(s as any).initials}</div>
          )}
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
      </div>
    </div>
  );
}

function FeaturedServices() {
  return (
    <section className="mt-16 mx-auto max-w-[1400px] px-6">
      <SectionHeader title="Serviços em destaque" subtitle="Contrate habilidades de pessoas talentosas da comunidade" link="Ver marketplace" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {services.map((s, i) => <ServiceCard key={i} s={s} />)}
      </div>
    </section>
  );
}

type FeaturedUser = (typeof featuredUsers)[number];

function UserCard({ u }: { u: FeaturedUser }) {
  return (
    <div className="card-lift flex flex-col rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {u.avatar ? (
            <img src={u.avatar} alt={u.name} className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <div className="grid h-12 w-12 place-items-center rounded-full bg-cta-gradient text-base font-bold text-white">{u.initials}</div>
          )}
          <div>
            <div className="font-semibold text-sm">{u.name}</div>
            <div className="text-xs text-muted-foreground">{u.role}</div>
          </div>
        </div>
        {u.badge && (
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${u.badgeBg}`}>{u.badge}</span>
        )}
      </div>
      <div className="mt-4 space-y-2">
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
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {u.rating}</span>
        <span>{u.services} serviços</span>
        <span className="font-semibold text-primary">Nv. {u.level}</span>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">XP</span>
          <span className="font-semibold">{u.xp.toLocaleString()}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-cta-gradient transition-all" style={{ width: `${Math.min((u.xp % 1000) / 10, 100)}%` }} />
        </div>
      </div>
      <button className="mt-4 w-full rounded-full border border-primary/30 bg-primary/5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
        Ver perfil
      </button>
    </div>
  );
}

function FeaturedUsers() {
  return (
    <section className="mt-16 mx-auto max-w-[1400px] px-6">
      <SectionHeader title="Pessoas da comunidade" subtitle="Conecte-se com quem ensina e aprende na EduConnect" link="Explorar comunidade" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredUsers.map((u, i) => <UserCard key={i} u={u} />)}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mt-20 mx-auto max-w-[1400px] px-6">
      <SectionHeader title="Como funciona" subtitle="Em 3 passos simples você começa a aprender e ganhar" />
      <div className="grid gap-6 md:grid-cols-3">
        {howItWorks.map((s) => (
          <div key={s.step} className="card-lift relative rounded-2xl border border-border bg-surface p-8">
            <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-cta-gradient text-xs font-bold text-white shadow-(--shadow-glow)">
              {s.step}
            </div>
            <div className={`mt-2 grid h-14 w-14 place-items-center rounded-2xl ${s.color}`}>
              <s.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MatchesTeaser() {
  const examples = [
    { a: "Ensina React", b: "Quer aprender React", match: "Sabe inglês", bg: "from-indigo-50 to-blue-50" },
    { a: "Ensina Inglês", b: "Sabe design", match: "Quer aprender UI", bg: "from-emerald-50 to-teal-50" },
    { a: "Ensina Violão", b: "Quer aprender música", match: "Sabe edição", bg: "from-amber-50 to-yellow-50" },
  ];
  return (
    <section className="mt-20 mx-auto max-w-[1400px] px-6">
      <div className="rounded-3xl border border-border bg-linear-to-br from-primary/5 to-secondary/5 p-10 lg:p-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1.5 text-sm font-medium text-secondary mb-4">
              <Repeat2 className="h-4 w-4" /> Troca de habilidades
            </div>
            <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
              Encontre seu <span className="text-gradient-accent">match perfeito</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Nosso algoritmo conecta você com pessoas que têm exatamente o que você quer aprender — e querem aprender o que você sabe.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/matches" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-(--shadow-glow) transition-transform hover:scale-105">
                Encontrar matches <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/explore" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                Explorar comunidade
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {examples.map((ex, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-2xl bg-linear-to-r ${ex.bg} border border-border/40 p-4`}>
                <div className="flex-1 rounded-xl bg-white/70 px-3 py-2 text-center text-xs font-medium">{ex.a}</div>
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white shadow-sm">
                  <Repeat2 className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex-1 rounded-xl bg-white/70 px-3 py-2 text-center text-xs font-medium">{ex.b}</div>
                <div className="flex-1 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-center text-xs font-medium text-primary">{ex.match}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gamification() {
  return (
    <section className="mt-20 mx-auto max-w-[1400px] px-6">
      <SectionHeader title="Evolua e seja reconhecido" subtitle="Cada interação gera XP, badges e reputação na comunidade" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-7">
          <div className="flex items-center gap-4 mb-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-cta-gradient text-xl font-bold text-white shadow-(--shadow-glow)">AL</div>
            <div>
              <div className="font-bold">Ana Lima</div>
              <div className="text-sm text-muted-foreground">Nível 12 · Designer & Criadora</div>
            </div>
            <span className="ml-auto rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Top Criadora</span>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso até Nível 13</span>
            <span className="font-semibold">2.840 / 3.000 XP</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-cta-gradient transition-all animate-shimmer" style={{ width: "94.7%" }} />
          </div>
          <div className="mt-6 grid grid-cols-3 divide-x divide-border text-center">
            <div className="pr-4"><div className="text-xl font-bold">23</div><div className="text-xs text-muted-foreground">Serviços</div></div>
            <div className="px-4"><div className="text-xl font-bold">4.9</div><div className="text-xs text-muted-foreground">Avaliação</div></div>
            <div className="pl-4"><div className="text-xl font-bold">127</div><div className="text-xs text-muted-foreground">Clientes</div></div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-7">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" /> Conquistas disponíveis
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-xl p-3 ${i < 3 ? "border border-primary/20 bg-primary/5" : "border border-border bg-muted/30 opacity-60"}`}>
                <span className="text-2xl">{b.emoji}</span>
                <div>
                  <div className="text-xs font-semibold">{b.label}</div>
                  <div className={`text-xs ${i < 3 ? "text-primary font-medium" : "text-muted-foreground"}`}>{b.xp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    { icon: Shield, title: "Pagamentos seguros", desc: "Transações protegidas com criptografia de ponta." },
    { icon: GraduationCap, title: "Vendedores verificados", desc: "Todos os perfis passam por validação da comunidade." },
    { icon: Star, title: "Avaliações reais", desc: "Sistema de reviews verificados por compradores reais." },
    { icon: MessageSquare, title: "Suporte dedicado", desc: "Time humano disponível para resolver qualquer situação." },
  ];
  return (
    <section className="mt-20 mx-auto max-w-[1400px] px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="card-lift flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">{item.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mt-20 mx-auto max-w-[1400px] px-6">
      <div className="relative overflow-hidden rounded-3xl bg-cta-gradient p-12 text-white shadow-(--shadow-glow) lg:p-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold leading-tight lg:text-5xl">Comece agora. É grátis.</h2>
            <p className="mt-4 max-w-xl text-lg opacity-90">
              Crie seu perfil, liste suas habilidades e comece a conectar com a comunidade hoje mesmo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary transition-transform hover:scale-105">
              Criar conta grátis <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/explore" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10">
              Explorar antes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Plataforma", links: ["Explorar", "Marketplace", "Matches", "Perfil"] },
    { title: "Categorias", links: ["Programação", "Design", "Idiomas", "Música", "Marketing"] },
    { title: "Comunidade", links: ["Como funciona", "Gamificação", "Top criadores", "Blog"] },
    { title: "Empresa", links: ["Sobre nós", "Termos de uso", "Privacidade", "Contato"] },
  ];
  return (
    <footer className="mt-20 border-t border-border bg-surface/50">
      <div className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Aprenda ensinando. Cresça com a comunidade. Transforme conhecimento em valor.
            </p>
          </div>
          {cols.map((c, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">© 2024 EduConnect. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Feito com 💙 para a comunidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-20">
        <Hero />
        <Categories />
        <FeaturedServices />
        <FeaturedUsers />
        <HowItWorks />
        <MatchesTeaser />
        <Gamification />
        <Security />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}