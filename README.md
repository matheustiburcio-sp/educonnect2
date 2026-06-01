# EduConnect 2

Aplicação web para conectar pessoas interessadas em **ensinar, aprender e trocar habilidades** em uma comunidade digital colaborativa. O projeto combina descoberta de perfis, compatibilidade entre usuários, gamificação e oferta de serviços em uma experiência moderna construída com **React**, **TypeScript** e **Supabase**.

## Acesso ao projeto

- **Site em produção:** https://educonnect2.matheus-tiburzio.workers.dev/

## Visão geral

O **EduConnect 2** foi desenvolvido com a proposta de democratizar o acesso ao conhecimento, permitindo que usuários compartilhem competências, encontrem oportunidades de aprendizado e construam reputação dentro da plataforma.

A aplicação reúne funcionalidades voltadas para descoberta de talentos, trocas de habilidades, autenticação segura e organização de perfis, servindo como base para uma plataforma educacional social escalável.

## Principais funcionalidades

- Autenticação com e-mail e senha
- Login social com Google
- Cadastro de novos usuários
- Exploração de perfis e habilidades da comunidade
- Sistema de matches por compatibilidade entre interesses e competências
- Marketplace para oferta e contratação de serviços
- Perfil com progresso, XP e badges
- Gerenciamento de sessão com Supabase
- Estrutura preparada para SSR e deploy com Cloudflare

## Stack tecnológica

### Frontend
- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack React Query
- Tailwind CSS
- shadcn/ui
- Radix UI
- Lucide React

### Backend e serviços
- Supabase
- TanStack Start
- Cloudflare

### Qualidade de código
- ESLint
- Prettier

## Estrutura do projeto

```bash
educonnect2/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── integrations/
│   ├── lib/
│   ├── routes/
│   ├── services/
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
├── supabase/
│   └── migrations/
├── components.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
```

## Autenticação e dados

O projeto utiliza o **Supabase** para autenticação, persistência de sessão e estrutura inicial de dados.

Recursos já identificados no repositório:
- autenticação com e-mail e senha
- autenticação com Google
- contexto global de autenticação
- criação automática de perfil após cadastro
- políticas de segurança com **Row Level Security (RLS)**
- migrações versionadas para o banco de dados

## Principais páginas

- **Home** — página inicial da plataforma
- **Login** — autenticação de usuários
- **Signup** — criação de conta
- **Explore** — descoberta de perfis e habilidades
- **Matches** — conexões por compatibilidade
- **Marketplace** — vitrine de serviços e ofertas
- **Profile** — visualização de progresso, badges e histórico

## Como executar localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- Node.js
- npm

> O repositório também contém arquivos relacionados ao Bun, mas os scripts atualmente podem ser executados normalmente com **npm**.

### 1. Clonar o repositório

```bash
git clone https://github.com/matheustiburcio-sp/educonnect2.git
cd educonnect2
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

> As funcionalidades de autenticação e partes do fluxo SSR dependem da configuração correta do Supabase.

### 4. Executar em ambiente de desenvolvimento

```bash
npm run dev
```

### 5. Gerar build de produção

```bash
npm run build
```

### 6. Visualizar a build localmente

```bash
npm run preview
```

## Scripts disponíveis

```bash
npm run dev        # inicia o ambiente de desenvolvimento
npm run build      # gera a build de produção
npm run build:dev  # gera build em modo development
npm run preview    # executa a visualização local da build
npm run lint       # analisa o código com ESLint
npm run format     # formata o projeto com Prettier
```

## Banco de dados

A estrutura inicial do banco inclui uma tabela `profiles`, com criação automática de registros para novos usuários autenticados.

Também foram identificados:
- trigger para criação de perfil no cadastro
- políticas de acesso por usuário autenticado
- uso de RLS para proteção dos dados

## Roadmap sugerido

- Integração completa do marketplace com dados persistidos
- Persistência real dos matches e interações entre usuários
- Sistema de mensagens ou chat entre participantes
- Avaliações e reputação com dados reais
- Edição avançada de perfil com upload de avatar
- Painel administrativo
- Testes automatizados
- Pipeline de deploy contínuo

## Licença

Este projeto está licenciado sob a **MIT License**.

Caso deseje, adicione um arquivo `LICENSE` ao repositório para formalizar a licença.