# SyncNC API
Sistema de gerenciamento de Não Conformidades (NC) para processos de recebimento de materiais em almoxarifados e operações de logística.

## Objetivo

Permitir o registro, acompanhamento e resolução de não conformidades encontradas durante o recebimento de materiais, mantendo histórico das ocorrências e facilitando a comunicação com fornecedores.

**Baseado:** <a href="./desafio_backend_junior.md" target="_blank">desafio_backend_junior.md</a>

---

# Tecnologias
- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Zod
- Swagger/OpenAPI
- JWT
- Docker
- Jest/Vitest
- ESLint
- Prettier

---

# Arquitetura

```txt
docs/
src/
    ├── database/
    │   ├── generated/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── prisma.ts
    ├── modules/
    │   ├── NoConformities/
    │   ├── Supplier/
    │   ├── User/
    │   └── response.type.ts
    ├── types/
    └── app.ts
.env
package.json
prisma.config.ts
tsconfig.json
```

---

# Regras de Negócio

## Não Conformidade
- [ ] Não permitir cadastro sem fornecedor
- [ ] Não permitir cadastro sem descrição
- [ ] Não permitir quantidade negativa
- [ ] Calcular quantidade divergente
- [ ] Registrar histórico de alterações
- [ ] Validar transição de status
- [ ] Não permitir exclusão de NC resolvida

---

# Roadmap de Desenvolvimento

## Fase 1 - Setup Inicial
- [x] Inicializar projeto Node
- [x] Configurar TypeScript
- [x] Configurar ESLint
- [x] Configurar Prettier
- [x] Configurar Express
- [x] Configurar variáveis de ambiente
- [ ] Configurar Docker
- [x] Configurar PostgreSQL
- [x] Configurar Prisma

---

## Fase 2 - Modelagem de Banco

### User
- [x] Criar model User
- [x] Criar migration
- [ ] Criar seed

### Supplier
- [x] Criar model Supplier
- [x] Criar migration
- [ ] Criar seed

### NonConformity
- [x] Criar model NonConformity
- [x] Criar migration

### NonConformityHistory
- [x] Criar model NonConformityHistory
- [x] Criar migration

---

## Fase 3 - CRUD de Usuários

### Endpoints
- [x] POST /users
- [ ] GET /users
- [x] GET /users/:username
- [ ] PATCH /users/:username
- [ ] DELETE /users/:username

---

## Fase 4 - CRUD de Fornecedores

### Endpoints
- [x] POST /suppliers
- [ ] GET /suppliers
- [ ] GET /suppliers/:id
- [ ] PATCH /suppliers/:id
- [ ] DELETE /suppliers/:id

---

## Fase 5 - Gestão de Não Conformidades

### Endpoints
- [ ] POST /non-conformities
- [ ] GET /non-conformities
- [ ] GET /non-conformities/:id
- [ ] PATCH /non-conformities/:id
- [ ] DELETE /non-conformities/:id
- [ ] PATCH /non-conformities/:id/status

---

## Fase 6 - Histórico

### Endpoints
- [ ] GET /non-conformities/:id/history
- [ ] Registro automático de movimentações
- [ ] Registro de mudança de status
- [ ] Registro de observações

---

## Fase 7 - Filtros
- [ ] Filtrar por status
- [ ] Filtrar por fornecedor
- [ ] Filtrar por tipo de divergência
- [ ] Filtrar por período
- [ ] Pesquisa por descrição
- [ ] Paginação
- [ ] Ordenação

---

## Fase 8 - Autenticação
- [x] Cadastro de usuário
- [ ] Login
- [ ] JWT
- [ ] Middleware de autenticação
- [ ] Proteção de rotas
- [ ] Controle de permissões

---

## Fase 9 - Documentação
- [x] Swagger
- [x] Exemplos de requests
- [x] Exemplos de responses
- [x] Códigos de erro
- [ ] Diagrama do banco

---

## Fase 10 - Testes

### Unitários
- [ ] Services
- [ ] Validators
- [ ] Utils

### Integração
- [ ] Endpoints
- [ ] Repositories

### Cobertura
- [ ] Cenários de sucesso
- [ ] Cenários de erro
- [ ] Regras de negócio

---

# Fluxo de Não Conformidade

```txt
ABERTA
   ↓
EM_ANALISE
   ↓
AGUARDANDO_FORNECEDOR
   ↓
RESOLVIDA

ou

ABERTA
   ↓
CANCELADA
```

---

# Como executar

## Instalar dependências

```bash
npm install
```

## Variáveis de ambiente

```env
DATABASE_URL=
JWT_SECRET=
PORT=
HASH_SALT=
```

## Executar migrations

```bash
npx prisma migrate dev
```

## Rodar aplicação

```bash
npm run dev
```

## Rodar testes

```bash
npm test
```

---

# Documentação da API

```
http://localhost:3000/api-docs
```

---

# Status do Projeto

🚧 Em desenvolvimento

## Progresso

- [x] Setup
- [x] Banco de Dados
- [ ] CRUD Usuários
- [ ] CRUD Fornecedores
- [ ] Gestão de NC
- [ ] Histórico
- [ ] Filtros
- [ ] Autenticação
- [ ] Testes
- [ ] Documentação