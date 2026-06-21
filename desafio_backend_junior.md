# Desáfio Técnico - Nível: Back-end Júnior

## Contexto:
O contexto do desáfio é que fui contrato para desenvolver uma API para apoiar o processo de **gestao de não conformidade** em um setor de Almoxarifado.

A ideia é simular um sistema interno simples, mas com padrões profissionais de mercado: organização de código, validação de dados, documentação da API, persistência em banco e boas práticas de arquitetura.

O foco do desáfio não é apenas "fazer funcionar".
O foco é demonstrar a forma que eu penso, como estruturo, valido, documento e entrego uma solução mínima mas bem feita.

---

## Objetivo:
Desenvolver uma **API REST** para registrar, consultar, atualizar e acompanhar não conformidades identificadas durante o recebimento de materiais.

O que a API deve executar:
- cadastrar não conformidades;
- listar não conformidades com filtros;
- visualizar detalhes de uma não conformidade;
- atualizar status;
- registrar histórico de movimentações;
- consultar dados básicos de fornecedores e usuários responsáveis.

---

## Escopo funcional:

### 1. Cadastro de não conformidades:
A aplicação deve permitir criar uma não conformidade com, no mínimo, os seguintes dados:
- número da nota fiscal ou documento de origem;
- fornecedor;
- data de abertura;
- tipo de divergência;
- descrição;
- quantidade prevista;
- quantidade recebida;
- quantidade divergente;
- status inicial;
- usuário responsável pela abertura.

### 2. Tipos de divergência:
A não conformidade deve aceitar, no mínimo, estes tipos:
- quantidade maior que o solicitado;
- quantidade menor que o solicitado;
- item diferente do solicitado;
- avaria / danificado;
- falta de item;
- outro.

### 3. Status da não conformidade:
A não conformidade deve possuir ciclo de vida com status, por exemplo:
- aberta;
- em análise;
- aguardando fornecedor;
- devolvido;
- resolvida;
- cancelada.

<span style="color: cyan"><strong>!! O fluxo pode ser melhorado se justificar a decisão.</strong></span>

## 4. Consulta e filtros:
A API deve permitir listar não conformidades com filtros como:
- status;
- fornecedor;
- tipo de divergência;
- data inicial e final;
- palavra-chave em descrição ou número de documento.

<span style="color: red"><strong>** A listagem deve suportar paginação.</strong></span>

## 5. Detalhamento:
Ao consultar uma não conformidade específica, a API deve retornar:
- dados principais;
- fornecedor;
- histórico de alterações;
- responsável pela abertura;
- status atual.

### 6. Atualização de status
Deve ser possível alterar o status de uma não conformidade seguindo regras mínimas, por exemplo:
- não permitir voltar para “aberta” depois de avançar para “resolvida”;
- registrar no histórico toda mudança;
- impedir transições inválidas.

<span style="color: cyan"><strong>!! Você pode definir as regras desde que sejam consistentes e documentadas.</strong></span>

### 7. Histórico
Cada alteração relevante deve gerar um registro de histórico contendo:
- data e hora;
- usuário responsável;
- ação realizada;
- observação opcional.

---

## Entidades mínimas sugeridas:
Você pode ajustar o modelo, mas a solução deve conter pelo menos estas entidades:
- **User**
- **Supplier**
- **NonConformity**
- **NonConformityHistory**

Se quiser, pode incluir outras entidades como:
- attachments/anexos;
- comentários;
- auditoria;
- categorias de ocorrência.

---

## Requisitos Técnicos:

### Stack sugerida:
Use as ferramentas abaixo como base do desafio:
- **Node.js**
- **TypeScript**
- **Express** ou **Fastify**
- **PostgreSQL**
- **Prisma** ou outro ORM equivalente
- **Swagger / OpenAPI** para documentação
- **Zod** ou validação equivalente
- **JWT** para autenticação, se optar por implementar login
- **Docker / Docker Compose** para subir banco e aplicação
- **Git** para versionamento

### Boas práticas esperadas:
A solução deve demonstrar:
- organização de pastas;
- separação de responsabilidades;
- nomes claros;
- validação de entrada;
- tratamento de erros;
- retorno adequado de status HTTP;
- uso de variáveis de ambiente;
- documentação mínima de setup e execução;
- código legível e fácil de manter.

---

## Requisitos obrigatórios de API

### Autenticação
Implementar autenticação é obrigatório apenas se você quiser elevar o nível do teste.  
Caso implemente, o mínimo esperado é:
- [ ] cadastro de usuário;
- [ ] login;
- [ ] proteção de rotas sensíveis com JWT.

### Rotas mínimas esperadas
A API deve conter, no mínimo:
- [ ] `POST /non-conformities`
- [ ] `GET /non-conformities`
- [ ] `GET /non-conformities/:id`
- [ ] `PATCH /non-conformities/:id/status`
- [ ] `GET /suppliers`
- [ ] `POST /suppliers`
- [ ] `GET /users`
- [ ] `POST /users`

<span style="color: cyan"><strong>!! Você pode adicionar outras rotas que achar necessárias.</strong></span>

---

## Requisitos não funcionais

### Qualidade de código
- evitar duplicação;
- criar funções e classes com responsabilidade clara;
- não concentrar toda a lógica no controller;
- usar tratamento centralizado de erros.

### Persistência
- persistir os dados em banco relacional;
- criar migrations;
- modelar relações corretamente.

### Documentação
- [ ] documentar a API com Swagger;
- [ ] incluir instruções de instalação e execução;
- [ ] descrever decisões técnicas importantes.

### Testes
É obrigatório criar testes em pelo menos uma camada relevante da aplicação.

Sugestão mínima:
- [ ] testes de serviços;
- [ ] testes de validação;
- [ ] testes de rotas;
- [ ] testes de repositório, se fizer sentido.

---

## Regras de negócio mínimas
Sua solução deve respeitar, no mínimo, estas regras:
1. Não permitir cadastrar não conformidade sem fornecedor, tipo de divergência e descrição.
2. Não permitir quantidade negativa.
3. Não permitir atualizar status para um valor inválido.
4. Registrar histórico sempre que houver mudança de status.
5. Não permitir excluir uma não conformidade já resolvida, a menos que você justifique uma regra diferente.
6. Retornar erro claro quando um recurso não for encontrado.
7. Padronizar mensagens de erro.

---

## O que você deve entregar

### Obrigatório
- [ ] código-fonte completo;
- [ ] arquivo `README.md`;
- [ ] arquivo de documentação da API ou Swagger disponível no projeto;
- [ ] script de execução;
- [ ] migrations;
- [ ] testes implementados;
- [ ] estrutura de banco bem definida.

### Desejável
- [ ] arquivo `.env.example`;
- [ ] Docker Compose;
- [ ] seed inicial;
- [ ] coleção do Insomnia ou Postman;
- [ ] diagrama simples do banco;
- [ ] comentários no README explicando decisões técnicas.
---