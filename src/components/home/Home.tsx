import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search, Bell, BookOpen, GraduationCap, Briefcase, Leaf, Heart, Brain, Languages, Palette,
  Bookmark, Star, ArrowRight, ChevronRight, Sparkles, Award, Clock, Users, Building2,
  Facebook, Instagram, Linkedin, Youtube, Quote, TrendingUp, Globe, ShieldCheck, X, CheckCircle2, LogOut,
  Lightbulb, Target, Rocket, Plus, Minus, MapPin, Phone, Mail,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth-service";
import heroImg from "@/assets/hero-student.jpg";
import courseTech from "@/assets/course-tech.jpg";
import courseSustain from "@/assets/course-sustainability.jpg";
import courseData from "@/assets/course-data.jpg";
import courseProject from "@/assets/course-project.jpg";
import courseWeb from "@/assets/course-web.jpg";
import progFullstack from "@/assets/program-fullstack.jpg";
import progSchool from "@/assets/program-school.jpg";
import progHealth from "@/assets/program-health.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import avatarMariana from "@/assets/avatar-mariana.jpg";

const navItems = ["Home", "Cursos", "Programas", "Instituições", "Sobre nós", "Notícias", "Contato"];

const categories = [
  { icon: TrendingUp, label: "Tecnologia" },
  { icon: GraduationCap, label: "Educação" },
  { icon: Briefcase, label: "Negócios" },
  { icon: Leaf, label: "Meio Ambiente" },
  { icon: Heart, label: "Saúde" },
  { icon: Brain, label: "Humanas" },
  { icon: Languages, label: "Idiomas" },
  { icon: Palette, label: "Artes" },
];

const stats = [
  { icon: GraduationCap, value: "1.200+", label: "Cursos disponíveis" },
  { icon: Users, value: "85.000+", label: "Alunos impactados" },
  { icon: Building2, value: "250+", label: "Instituições parceiras" },
  { icon: ShieldCheck, value: "95%", label: "Satisfação dos alunos" },
];

const features = [
  { icon: BookOpen, color: "text-primary", bg: "bg-primary/10", title: "Cursos de qualidade", desc: "Aprenda com conteúdo de alto nível." },
  { icon: Bookmark, color: "text-success", bg: "bg-success/10", title: "Programas flexíveis", desc: "Estude no seu tempo, com autonomia." },
  { icon: Building2, color: "text-chart-4", bg: "bg-chart-4/10", title: "Instituições parceiras", desc: "Conectamos você às melhores instituições." },
  { icon: Users, color: "text-warning", bg: "bg-warning/10", title: "Para todos", desc: "Educação inclusiva, gratuita e acessível." },
];

const courses = [
  { img: courseTech, tag: "Gratuito", tagColor: "bg-success", title: "Introdução à Tecnologia da Informação", level: "Iniciante", duration: "20h", rating: 4.8, reviews: "1.250", instructor: "Prof. Carlos Lima", students: "12.430", desc: "Compreenda os fundamentos da TI moderna: hardware, software, redes, segurança e o ecossistema digital atual.", topics: ["História e fundamentos da computação", "Sistemas operacionais e arquitetura", "Redes e Internet", "Segurança da informação", "Carreiras em TI"] },
  { img: courseSustain, tag: "Novo", tagColor: "bg-primary", title: "Sustentabilidade e Meio Ambiente", level: "Iniciante", duration: "15h", rating: 4.7, reviews: "890", instructor: "Profa. Renata Alves", students: "5.210", desc: "Explore práticas sustentáveis aplicadas ao cotidiano, ao trabalho e às organizações para construir um futuro melhor.", topics: ["Mudanças climáticas", "Consumo consciente", "ESG nas empresas", "Energias renováveis", "Educação ambiental"] },
  { img: courseData, tag: "Mais procurado", tagColor: "bg-chart-4", title: "Análise de Dados com Excel", level: "Intermediário", duration: "30h", rating: 4.9, reviews: "2.100", instructor: "Prof. Marcos Tavares", students: "18.900", desc: "Transforme dados em decisões com fórmulas avançadas, tabelas dinâmicas e dashboards profissionais no Excel.", topics: ["Fórmulas e funções avançadas", "Tabelas dinâmicas", "Dashboards interativos", "Power Query", "Storytelling com dados"] },
  { img: courseProject, tag: "Certificado", tagColor: "bg-warning", title: "Gestão de Projetos na Prática", level: "Intermediário", duration: "25h", rating: 4.6, reviews: "750", instructor: "Profa. Juliana Reis", students: "7.640", desc: "Aprenda a planejar, executar e entregar projetos com técnicas ágeis e tradicionais reconhecidas no mercado.", topics: ["Ciclo de vida de projetos", "Metodologias ágeis (Scrum/Kanban)", "Gestão de stakeholders", "Riscos e cronogramas", "Liderança de equipes"] },
  { img: courseWeb, tag: "Novo", tagColor: "bg-primary", title: "Desenvolvimento Web com HTML e CSS", level: "Iniciante", duration: "20h", rating: 4.5, reviews: "620", instructor: "Prof. Felipe Costa", students: "4.880", desc: "Construa páginas web modernas e responsivas do zero usando as melhores práticas atuais.", topics: ["HTML semântico", "CSS moderno e Flexbox", "Design responsivo", "Acessibilidade", "Publicação online"] },
  { img: courseTech, tag: "Avançado", tagColor: "bg-chart-4", title: "Inteligência Artificial Aplicada", level: "Avançado", duration: "40h", rating: 4.9, reviews: "1.580", instructor: "Profa. Ana Beatriz", students: "9.120", desc: "Domine os fundamentos de IA, machine learning e suas aplicações práticas no mercado atual.", topics: ["Fundamentos de machine learning", "Redes neurais", "Processamento de linguagem natural", "Visão computacional", "Ética em IA"] },
  { img: courseSustain, tag: "Gratuito", tagColor: "bg-success", title: "Empreendedorismo Social", level: "Iniciante", duration: "18h", rating: 4.7, reviews: "540", instructor: "Prof. Rafael Mendes", students: "3.650", desc: "Aprenda a criar negócios de impacto que geram valor social e financeiro de forma sustentável.", topics: ["Modelo de negócio social", "Captação de recursos", "Métricas de impacto", "Networking estratégico", "Cases de sucesso"] },
  { img: courseData, tag: "Mais procurado", tagColor: "bg-chart-4", title: "Marketing Digital Estratégico", level: "Intermediário", duration: "28h", rating: 4.8, reviews: "1.820", instructor: "Profa. Camila Souza", students: "14.200", desc: "Construa estratégias completas de marketing digital, do tráfego ao funil de conversão.", topics: ["SEO e tráfego orgânico", "Anúncios pagos (Google e Meta)", "E-mail marketing", "Funis de vendas", "Métricas e análise"] },
];

const institutions = ["SENAI", "SEBRAE", "Instituto Federal", "FIOCRUZ", "FGV", "UNESP", "UFSC", "USP", "PUC", "UFMG", "UFRJ", "Mackenzie"];

const programs = [
  { img: progFullstack, title: "Desenvolvedor Full Stack", desc: "Formação completa em desenvolvimento web", duration: "6 meses", level: "Intermediário", long: "Programa intensivo que cobre toda a stack moderna: front-end com React, back-end com Node.js, banco de dados e deploy em nuvem.", topics: ["HTML, CSS e JavaScript moderno", "React e TanStack", "APIs com Node.js", "Banco de dados SQL e NoSQL", "Deploy e DevOps básico"], certificate: true, students: "3.200" },
  { img: progSchool, title: "Gestão Escolar", desc: "Liderança e gestão para transformar escolas", duration: "4 meses", level: "Intermediário", long: "Capacite-se para liderar escolas com visão pedagógica, financeira e humana, transformando comunidades educacionais.", topics: ["Liderança pedagógica", "Gestão financeira escolar", "Legislação educacional", "Inclusão e diversidade", "Indicadores e avaliação"], certificate: true, students: "1.450" },
  { img: progHealth, title: "Saúde Digital", desc: "Tecnologia e inovação na área da saúde", duration: "5 meses", level: "Intermediário", long: "Conheça as principais tecnologias que transformam a saúde: prontuário eletrônico, telemedicina, dados clínicos e IA.", topics: ["Prontuário eletrônico", "Telemedicina", "Análise de dados em saúde", "Inteligência artificial aplicada", "Privacidade e LGPD na saúde"], certificate: true, students: "2.110" },
];

type Course = (typeof courses)[number];
type Program = (typeof programs)[number];
type DetailItem =
  | { kind: "course"; data: Course }
  | { kind: "program"; data: Program };

const news = [
  { img: news1, title: "Educação online: o futuro que já chegou", date: "12 de Maio de 2024" },
  { img: news2, title: "Novos cursos gratuitos disponíveis", date: "08 de Maio de 2024" },
  { img: news3, title: "Parcerias que transformam vidas", date: "02 de Maio de 2024" },
  { img: news1, title: "EduConnect supera 100 mil alunos formados", date: "28 de Abril de 2024" },
  { img: news2, title: "Bolsas integrais para cursos de tecnologia", date: "20 de Abril de 2024" },
];

const highlights = [
  { title: "Novos cursos toda semana", desc: "Conteúdos atualizados constantemente" },
  { title: "Certificados reconhecidos", desc: "Valide seus conhecimentos" },
  { title: "Aprenda do seu jeito", desc: "Estude no seu tempo e ritmo" },
];

const howItWorks = [
  { icon: Lightbulb, title: "1. Descubra", desc: "Explore o catálogo e encontre cursos e programas alinhados aos seus objetivos." },
  { icon: Target, title: "2. Matricule-se", desc: "Crie sua conta gratuita e inscreva-se nos conteúdos em poucos cliques." },
  { icon: Rocket, title: "3. Transforme-se", desc: "Estude no seu ritmo, conquiste certificados e dê o próximo passo na carreira." },
];

const testimonials = [
  { name: "Pedro Henrique", role: "Desenvolvedor Júnior", text: "Saí do zero e consegui meu primeiro emprego na área de tecnologia em menos de um ano." },
  { name: "Beatriz Lima", role: "Gestora Pedagógica", text: "Os programas me deram visão estratégica e ferramentas práticas para liderar minha escola." },
  { name: "Lucas Oliveira", role: "Analista de Dados", text: "Conteúdo de altíssimo nível e professores incríveis. Recomendo de olhos fechados." },
];

const faqs = [
  { q: "Os cursos são realmente gratuitos?", a: "Sim! Grande parte do nosso catálogo é 100% gratuito. Alguns programas avançados possuem custo simbólico que pode ser coberto por bolsas." },
  { q: "Os certificados têm validade?", a: "Todos os certificados são emitidos pela EduConnect e instituições parceiras, com validade nacional para comprovação de horas complementares e currículo." },
  { q: "Preciso de algum conhecimento prévio?", a: "Depende do curso. Cada conteúdo indica o nível (Iniciante, Intermediário ou Avançado) e os pré-requisitos sugeridos." },
  { q: "Posso estudar pelo celular?", a: "Sim, a plataforma é totalmente responsiva e funciona em qualquer dispositivo com acesso à internet." },
  { q: "Como funciona o suporte aos alunos?", a: "Contamos com tutores, fóruns de dúvidas e atendimento dedicado por e-mail e chat em horário comercial." },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
        <BookOpen className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <div className="font-display text-base font-bold tracking-tight">EDU</div>
        <div className="-mt-1 font-display text-base font-bold tracking-tight text-primary">CONNECT</div>
      </div>
    </div>
  );
}

function Header() {
  const [active, setActive] = useState("Home");
  const { session } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await authService.signOut();
    navigate({ to: "/" });
  };
  const initial = (session?.user.user_metadata?.display_name || session?.user.email || "?").charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-6 py-4">
        <Logo />
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                active === item ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
              {active === item && (
                <span className="absolute -bottom-[17px] left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>
        <div className="hidden flex-1 items-center gap-3 lg:flex max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar cursos, programas..."
              className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
        </div>
        <button aria-label="Abrir notificações" title="Notificações" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground">
          <Bell className="h-4 w-4" />
        </button>
        {session ? (
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-sm font-bold text-primary-foreground">{initial}</div>
            <button onClick={handleLogout} title="Sair" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden h-10 items-center rounded-full px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">
              Entrar
            </Link>
            <Link to="/signup" className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
              Cadastre-se
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-hero-gradient relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
      <div className="grid items-center gap-6 lg:grid-cols-2">
        <div className="p-10 lg:p-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" /> Educação aberta para um mundo melhor
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] lg:text-7xl">
            Educação acessível <br />
            <span className="text-gradient">para todos.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Democratizamos o acesso ao conhecimento por meio de cursos, programas e oportunidades que transformam vidas e constroem um futuro melhor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
              Explorar cursos
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
              Conheça os programas
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        <div className="relative h-full min-h-[480px]">
          <img src={heroImg} alt="Estudante aprendendo online" className="absolute inset-0 h-full w-full object-cover" width={1280} height={896} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-border bg-surface/90 p-5 backdrop-blur-md md:block w-60 shadow-[var(--shadow-card)]">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-primary/15">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">Conhecimento<br />sem fronteiras</h3>
            <p className="mt-2 text-xs text-muted-foreground">Aprenda onde estiver, quando quiser.</p>
            <svg className="mt-3 h-6 w-full" viewBox="0 0 100 24">
              <path d="M0 18 Q 25 4, 50 12 T 100 6" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2" />
            </svg>
            <div className="mt-3 flex justify-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 border-t border-border/60 bg-surface/60 p-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="mt-6 grid gap-4 rounded-2xl border border-border bg-surface/60 p-5 md:grid-cols-4">
      {features.map((f) => (
        <button key={f.title} className="card-interactive flex items-start gap-3 rounded-xl p-3 text-left">
          <div className={`grid h-11 w-11 place-items-center rounded-xl ${f.bg}`}>
            <f.icon className={`h-5 w-5 ${f.color}`} />
          </div>
          <div>
            <div className="text-sm font-semibold">{f.title}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{f.desc}</div>
          </div>
        </button>
      ))}
    </section>
  );
}

function SectionHeader({ title, subtitle, link }: { title: string; subtitle?: string; link?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold lg:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>}
      </div>
      {link && (
        <button className="group inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
          {link} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </div>
  );
}

function CourseCard({ course, onOpen }: { course: Course; onOpen: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <button onClick={onOpen} className="card-interactive group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={course.img} alt={course.title} loading="lazy" width={640} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <span className={`absolute left-3 top-3 rounded-full ${course.tagColor} px-3 py-1 text-xs font-semibold text-white`}>{course.tag}</span>
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          type="button"
          aria-label={saved ? "Remover dos salvos" : "Salvar curso"}
          title={saved ? "Remover dos salvos" : "Salvar curso"}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/70 backdrop-blur-md transition-colors hover:bg-primary"
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 min-h-[2.8em] text-sm font-semibold">{course.title}</h3>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-3">
            <span>{course.level}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" /> {course.rating} ({course.reviews})
          </span>
        </div>
      </div>
    </button>
  );
}

function FeaturedCourses({ onOpen }: { onOpen: (item: DetailItem) => void }) {
  return (
    <section className="mt-12">
      <SectionHeader title="Cursos em destaque" subtitle="Seleção especial para impulsionar seu aprendizado" link="Ver todos os cursos" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {courses.map((c) => <CourseCard key={c.title} course={c} onOpen={() => onOpen({ kind: "course", data: c })} />)}
      </div>
    </section>
  );
}

function Institutions() {
  return (
    <section className="mt-12">
      <SectionHeader title="Instituições parceiras" subtitle="Trabalhamos com as melhores instituições para oferecer educação de qualidade" link="Ver todas as instituições" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {institutions.map((i) => (
          <button key={i} className="card-interactive grid h-20 place-items-center rounded-xl border border-border bg-surface text-sm font-bold tracking-wide text-muted-foreground hover:text-primary">
            {i}
          </button>
        ))}
      </div>
    </section>
  );
}

function ProgramsAndNews({ onOpen }: { onOpen: (item: DetailItem) => void }) {
  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div>
        <SectionHeader title="Programas em destaque" subtitle="Formações completas para sua carreira" link="Ver todos os programas" />
        <div className="grid gap-4 sm:grid-cols-3">
          {programs.map((p) => (
            <button key={p.title} onClick={() => onOpen({ kind: "program", data: p })} className="card-interactive overflow-hidden rounded-2xl border border-border bg-surface text-left">
              <div className="aspect-video overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" width={640} height={360} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-primary">Programa</span>
                <h3 className="mt-1 text-sm font-semibold">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{p.duration}</span><span>·</span><span>{p.level}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader title="Últimas notícias" link="Ver todas as notícias" />
        <div className="space-y-3">
          {news.map((n) => (
            <button key={n.title} className="card-interactive flex w-full items-center gap-3 rounded-2xl border border-border bg-surface p-3 text-left">
              <img src={n.img} alt={n.title} loading="lazy" width={80} height={80} className="h-16 w-16 flex-shrink-0 rounded-lg object-cover" />
              <div className="min-w-0">
                <h4 className="line-clamp-2 text-sm font-semibold">{n.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{n.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-base font-semibold">Encontre o que você precisa</h3>
        <p className="mt-1 text-xs text-muted-foreground">Busque entre milhares de cursos e programas.</p>
        <div className="relative mt-4">
          <input type="text" placeholder="O que você deseja aprender?" className="h-11 w-full rounded-full border border-border bg-background pl-4 pr-12 text-sm outline-none transition-colors focus:border-primary" />
          <button aria-label="Buscar" title="Buscar" className="absolute right-1 top-1 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Search className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {categories.map((c) => (
            <button key={c.label} className="card-interactive flex flex-col items-center gap-2 rounded-xl p-2 text-center">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-base font-semibold">Destaques da plataforma</h3>
        <ul className="mt-4 space-y-3">
          {highlights.map((h) => (
            <li key={h.title} className="flex items-start gap-3">
              <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">{h.title}</div>
                <div className="text-xs text-muted-foreground">{h.desc}</div>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Saiba mais sobre a plataforma <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-base font-semibold">O que nossos alunos dizem</h3>
        <Quote className="mt-3 h-5 w-5 text-primary" />
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          "A plataforma mudou minha forma de aprender. Hoje consigo aplicar o que aprendi no meu trabalho e alcançar novos objetivos."
        </p>
        <div className="mt-4 flex items-center gap-3">
          <img src={avatarMariana} alt="Mariana Santos" loading="lazy" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <div className="text-sm font-semibold">Mariana Santos</div>
            <div className="text-xs text-muted-foreground">Aluna do curso de Gestão de Projetos</div>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-1">
          {[0,1,2,3].map((i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? "w-6 bg-primary" : "w-1.5 bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-base font-semibold">Fique por dentro das novidades</h3>
        <p className="mt-1 text-xs text-muted-foreground">Receba novidades sobre cursos, programas e oportunidades.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
          <input type="email" placeholder="Seu melhor e-mail" className="h-10 w-full min-w-0 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary" />
          <button className="inline-flex h-10 flex-shrink-0 items-center rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105">
            Inscrever-se
          </button>
        </form>
        <div className="mt-4 flex gap-2">
          {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
            <button key={i} aria-label={`Abrir ${Icon.displayName ?? 'rede social'}`} title={Icon.displayName ?? 'Rede social'} className="grid h-9 w-9 place-items-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Footer() {
  return <FooterMain />;
}

function HowItWorks() {
  return (
    <section className="mt-16">
      <SectionHeader title="Como funciona" subtitle="Em três passos simples você começa a transformar sua trajetória" />
      <div className="grid gap-6 md:grid-cols-3">
        {howItWorks.map((s) => (
          <div key={s.title} className="card-interactive rounded-2xl border border-border bg-surface p-8">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
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

function Testimonials() {
  return (
    <section className="mt-16 rounded-3xl border border-border bg-surface/70 p-8 lg:p-12">
      <SectionHeader title="Histórias que inspiram" subtitle="Alunos que transformaram suas carreiras com a EduConnect" />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="card-interactive rounded-2xl border border-border bg-background p-7">
            <Quote className="h-6 w-6 text-primary" />
            <p className="mt-4 text-base leading-relaxed text-foreground">"{t.text}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-base font-bold text-primary-foreground">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mt-16">
      <SectionHeader title="Perguntas frequentes" subtitle="Tudo o que você precisa saber antes de começar" />
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={f.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="card-interactive w-full rounded-2xl border border-border bg-surface p-6 text-left"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold lg:text-lg">{f.q}</h3>
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </div>
              {isOpen && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="mt-16 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-primary-glow p-10 text-primary-foreground shadow-[var(--shadow-card)] lg:p-16">
      <div className="grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-3xl font-bold leading-tight lg:text-5xl">Pronto para começar sua jornada de aprendizado?</h2>
          <p className="mt-4 max-w-xl text-base opacity-90 lg:text-lg">
            Junte-se a mais de 85 mil alunos que já estão transformando suas carreiras com a EduConnect. Crie sua conta gratuita agora.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-base font-semibold text-foreground transition-transform hover:scale-105">
            Criar conta gratuita <ArrowRight className="h-5 w-5" />
          </Link>
          <Link to="/login" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-transparent px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">
            Já tenho conta
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  const items = [
    { icon: Mail, title: "E-mail", value: "contato@educonnect.com.br" },
    { icon: Phone, title: "Telefone", value: "0800 123 4567" },
    { icon: MapPin, title: "Endereço", value: "Av. das Letras, 1000 — São Paulo, SP" },
  ];
  return (
    <section className="mt-16 grid gap-4 md:grid-cols-3">
      {items.map((i) => (
        <div key={i.title} className="card-interactive flex items-center gap-4 rounded-2xl border border-border bg-surface p-6">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <i.icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{i.title}</div>
            <div className="mt-0.5 text-sm font-semibold">{i.value}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

function FooterMain() {
  const cols = [
    { title: "Navegação", links: ["Home", "Cursos", "Programas", "Instituições", "Sobre nós", "Notícias", "Contato"] },
    { title: "Categorias", links: ["Tecnologia", "Educação", "Negócios", "Meio Ambiente"] },
    { title: " ", links: ["Saúde", "Humanas", "Idiomas", "Artes"] },
    { title: "Institucional", links: ["Sobre nós", "Como funciona", "Perguntas frequentes", "Termos de uso", "Política de privacidade"] },
    { title: "Suporte", links: ["Central de ajuda", "Fale conosco", "Para instituições", "Seja um parceiro"] },
  ];
  return (
    <footer className="mt-16 border-t border-border bg-surface/50">
      <div className="mx-auto max-w-[1600px] px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Educação acessível para um mundo melhor. Conectamos pessoas ao conhecimento e transformamos vidas.
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
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Siga-nos</span>
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label={`Abrir ${Icon.displayName ?? 'rede social'}`} title={Icon.displayName ?? 'Rede social'} className="grid h-8 w-8 place-items-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Home() {
  const [detail, setDetail] = useState<DetailItem | null>(null);
  const { session } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-[1600px] px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <Hero />
            <FeatureStrip />
            <FeaturedCourses onOpen={setDetail} />
            <HowItWorks />
            <Institutions />
            <ProgramsAndNews onOpen={setDetail} />
            <Testimonials />
            <FAQ />
            <CallToAction />
            <ContactStrip />
          </div>
          <Sidebar />
        </div>
      </main>
      <Footer />
      <DetailModal
        item={detail}
        onClose={() => setDetail(null)}
        onEnroll={() => {
          if (session) {
            setDetail(null);
          } else {
            setDetail(null);
            navigate({ to: "/login" });
          }
        }}
        isAuthed={!!session}
      />
    </div>
  );
}

function DetailModal({ item, onClose, onEnroll, isAuthed }: { item: DetailItem | null; onClose: () => void; onEnroll: () => void; isAuthed: boolean }) {
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [item, onClose]);

  if (!item) return null;
  const isCourse = item.kind === "course";
  const d = item.data as Course & Partial<Program>;
  const ratingText = isCourse ? `${(d as Course).rating} (${(d as Course).reviews} avaliações)` : `${(d as Program).students} alunos`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-md md:items-center md:p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-t-3xl border border-border bg-surface shadow-[var(--shadow-card)] md:rounded-3xl">
        <button onClick={onClose} aria-label="Fechar detalhes" title="Fechar" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground">
          <X className="h-4 w-4" />
        </button>
        <div className="relative aspect-[16/7] overflow-hidden">
          <img src={d.img} alt={d.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
              {isCourse ? (d as Course).tag : "Programa"}
            </span>
            <h2 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">{d.title}</h2>
          </div>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-6">
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" /> {d.duration}</span>
            <span className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-primary" /> {d.level}</span>
            <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {ratingText}</span>
            {isCourse && (d as Course).instructor && (
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> {(d as Course).instructor}</span>
            )}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {isCourse ? (d as Course).desc : (d as Program).long}
          </p>
          <h3 className="mt-6 text-sm font-semibold">O que você vai aprender</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {(isCourse ? (d as Course).topics : (d as Program).topics)!.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" /> <span>{t}</span>
              </li>
            ))}
          </ul>
          {!isCourse && (d as Program).certificate && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-background p-4">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-semibold">Certificado reconhecido</div>
                <div className="text-xs text-muted-foreground">Receba um certificado ao concluir o programa.</div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border bg-background/60 p-4">
          <div className="text-xs text-muted-foreground">{isAuthed ? "Pronto para começar?" : "Crie sua conta gratuita para se inscrever."}</div>
          <button onClick={onEnroll} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
            {isAuthed ? "Inscrever-se" : "Entrar para se inscrever"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}