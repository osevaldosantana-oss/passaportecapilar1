# Agentes — Passaporte Capilar™

## Visão Geral

PASSAPORTE CAPILAR™ é uma infraestrutura premium de jornada capilar. A experiência combina a elegância de um passaporte diplomático com a inteligência de uma plataforma moderna.

---

## Nomenclatura

| Termo | Definição |
|---|---|
| **Passaporte** | Documento visual principal da cliente, organizado em capítulos |
| **Capítulo** | Registro de um atendimento realizado |
| **Carimbo** | Validação visual do capítulo — o "visto" do passaporte |
| **Jornada** | Sequência de capítulos ao longo do tempo |
| **Próximo Destino** | Sugestão de próxima etapa na jornada |
| **Check-in** | Abertura de atendimento |
| **Check-out** | Finalização e carimbo do atendimento |
| **Passaporte Intelligence™** | Camada de inteligência sobre os dados da jornada |
| **The Code Vision** | Metodologia e visão que orientam a plataforma |

---

## Estrutura de Navegação

### Grupos Funcionais

O app é organizado em **7 grupos funcionais** que refletem o fluxo natural de trabalho:

| # | Grupo | Rotas | Propósito |
|---|---|---|---|
| 1 | **Início** | `/dashboard`, `/index` | Visão geral, métricas e acesso rápido |
| 2 | **Clientes** | `/cliente` | Gestão completa da base de clientes |
| 3 | **Agenda** | — | Punto de entrada futuro para agenda |
| 4 | **Atender** | `/atendimento` | Fluxo principal: check-in, diagnóstico, atendimento |
| 5 | **Passaporte** | `/passaporte`, `/passaporte/capa` | Visualização do passaporte da cliente |
| 6 | **Inteligência** | `/passaporte-intelligence` | Documentação e interface da Intelligence |
| 7 | **Carimbos** | `/carimbos` | Coleção e gestão de carimbos |
| 8 | **Configurações** | `/identidade`, `/brand-studio` | Identidade visual e preferências |

### Navegação Mobile (Bottom Nav)

```
Início  |  Clientes  |  Atender  |  Passaporte  |  Sair
```

Presente em todas as telas autenticadas via `src/routes/_authenticated/route.tsx`.

---

## Inventário de Rotas

### `/dashboard` — Dashboard
**Alias:** `/index`

Página inicial autenticada. Exibe:
- Métricas da operação
- Clientes recentes
- Atalhos de ação rápida
- Status do sistema

### `/cliente` — Clientes

Gestão da base de clientes. Funcionalidades:
- Listagem de clientes
- Cadastro e edição
- Visualização de perfil
- Histórico de atendimentos

### `/atendimento` — Atendimento

Ponto central do fluxo operacional:
- Check-in: abrir novo atendimento
- Scanner: ler código da cliente
- Confirmação: validar dados antes de iniciar
- Diagnóstico: análise capilar
- Diagnóstico Inicial: primeiro atendimento
- Check-out: finalizar e carimbar

### `/passaporte` — Passaporte

**Sub-rotas:**

| Rota | Descrição |
|---|---|
| `/passaporte` | Passaporte completo com jornada e capítulos |
| `/passaporte/capa` | Capa do passaporte (visualização elegante) |

### `/passaporte-intelligence` — Passaporte Intelligence™

Documentação oficial da camada de inteligência. Módulos:

1. **Visão & Posicionamento** — Posicionamento, 5 funções, regra fundamental
2. **Arquitetura** — 5 camadas, memória, confiança, feedback loop
3. **Interface** — Interface discreta, microcopy, Ask The Code
4. **Roadmap** — MVP, Fases 02, 03 e 04
5. **Diferencial & Ecossistema** — Diferença competitiva, ecossistema futuro
6. **Princípios Fundamentais** — Privacidade, exclusões, definições oficiais

### `/carimbos` — Carimbos

**Sub-rotas:**

| Rota | Descrição |
|---|---|
| `/carimbos` | Listagem de carimbos disponíveis |
| `/carimbos/colecao` | Coleção pessoal de carimbos conquistados |

### `/identidade` — Identidade

**Sub-rotas:**

| Rota | Descrição |
|---|---|
| `/identidade` | Configurações de identidade |
| `/identidade/perfil` | Perfil do profissional |
| `/identidade/cartao` | Cartão de apresentação digital |

### `/brand-studio` — Brand Studio

Ferramenta de customização visual para o profissional.

### `/chapter-loop` — Chapter Loop

Loop visual de navegação entre capítulos do passaporte.

### `/auditoria` — Auditoria

Rastreabilidade completa dos eventos de check-out:
- Data, hora e etapa
- Usuário responsável
- Detalhes do evento
- Timeline visual

---

## Fluxos de Usuário

### Fluxo de Atendimento Completo

```
Dashboard
  ↓
Atendimento (Check-in)
  ↓ Scanner ou busca manual
Confirmação de dados
  ↓
Diagnóstico
  ↓
Diagnóstico Inicial (primeira vez)
  ↓
Atendimento executado
  ↓
Check-out
  ├── Criação do evento
  ├── Carimbo do passaporte
  └── Sincronização
  ↓
Auditoria (verificação)
```

### Fluxo do Passaporte

```
Dashboard
  ↓
Clientes → Selecionar cliente
  ↓
Passaporte → Ver capa
  ↓
Capítulo Atual
  ↓
Validar & Carimbar
  ↓
Próximo Destino
```

### Fluxo da Intelligence

```
Dashboard
  ↓
Passaporte Intelligence™
  ↓
Selecionar módulo
  ↓
Visualizar documentação / interações
  ↓
Ask The Code (perguntas sobre a jornada)
```

---

## Visão por Área

### Área Profissional

| Rota | Quem acessa |
|---|---|
| `/dashboard` | Profissional |
| `/cliente` | Profissional |
| `/atendimento` | Profissional |
| `/passaporte` | Profissional |
| `/auditoria` | Profissional |
| `/brand-studio` | Profissional |

### Área Cliente

| Rota | Quem acessa |
|---|---|
| `/passaporte/capa` | Cliente (via link ou QR code) |

> **Nota:** A experiência da cliente é intencionalmente limitada à visualização do passaporte. A gestão permanece com o profissional.

---

## Princípios de Arquitetura

### Autenticação

- Todas as rotas sob `/_authenticated` exigem login via Supabase Auth
- O middleware `requireSupabaseAuth` valida sessão em cada server function
- Preview Auth via `auth-attacher` e `previewAuthStorage`

### Banco de Dados

| Tabela | Propósito |
|---|---|
| `profiles` | Perfis de usuário (nome, avatar, passport_id) |
| `clients` | Cadastro de clientes |
| `chapters` | Capítulos/jornadas de cada cliente |
| `stamps` | Carimbos disponíveis |
| `client_stamps` | Carimbos conquistados por cliente |
| `atendimento_executions` | Registros de atendimento |
| `checkout_events` | Auditoria de check-out |

### Server Functions

| Função | Arquivo | Propósito |
|---|---|---|
| `logCheckoutEvent` | `checkout-audit.functions.ts` | Registrar evento de check-out |
| `listCheckoutEvents` | `checkout-audit.functions.ts` | Listar eventos de auditoria |
| `getClientProfile` | `checkout-audit.functions.ts` | Obter perfil do profissional |
| `getAtendimentoExecution` | `checkout-audit.functions.ts` | Obter execução de atendimento |

### Schemas

| Schema | Arquivo | Propósito |
|---|---|---|
| `checkoutStepSchema` | `checkout-audit.schema.ts` | Enum de etapas de check-out |
| `logInputSchema` | `checkout-audit.schema.ts` | Validação de entrada para log |
| `listInputSchema` | `checkout-audit.schema.ts` | Validação de entrada para listagem |

### Camadas de Inteligência (Passaporte Intelligence™)

| Camada | Função |
|---|---|
| MEMORY | Lembrar o que aconteceu |
| CONTEXT | Compreender o momento atual |
| PATTERN | Identificar padrões |
| CHANGE | Detectar mudanças |
| GUIDANCE | Sugerir próximos caminhos |

---

## Extensões e Temas UI

O app utiliza um sistema de **CSS customizado** com variáveis Tailwind estendidas:

| Variável | Valor | Uso |
|---|---|---|
| `antique-gold` | `#C5A059` | Acentos principais |
| `parchment-white` | `#F9F6F0` | Textos claros |
| `ink-black` | `#1A1A1A` | Fundos escuros |
| `deep-burgundy` | `#4A0E0E` | Cor secundária |
| `stamp-red` | `#8B0000` | Estados de alerta |

Estilos globais em: `src/styles.css`

---

## Extensões de Arquivo

| Extensão | Framework | Propósito |
|---|---|---|
| `.tsx` | React | Componentes e páginas |
| `.ts` | TypeScript | Lógica e tipos |
| `.sql` | SQL | Migrações de banco |
| `.css` | CSS | Estilos globais |

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| **TanStack Router** | Roteamento e navegação |
| **TanStack Query** | Gerenciamento de estado servidor |
| **Supabase** | Backend (auth, banco, realtime) |
| **Tailwind CSS** | Estilização |
| **Radix UI** | Componentes acessíveis |
| **Zod** | Validação de esquemas |
| **Bun** | Runtime e package manager |

---

## Autores

- **PASSAPORTE CAPILAR™** — A infraestrutura da jornada
- **PASSAPORTE INTELLIGENCE™** — A inteligência que compreende a jornada
- **THE CODE VISION** — A metodologia e visão que orientam essa inteligência
- Criado por **Tainara Rodrigues**
