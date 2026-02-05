# ANEXO II-B - Projeto Desenvolvedor Front-End

## SEPLAG/MT 001/2026 - Processo Seletivo Simplificado

---

## 📋 INFORMAÇÕES DO PROJETO

**Sistema:** Registro público de Pets e seus Tutores  
**API Base:** https://pet-manager-spi.geia.vip/q/swagger-ui/  
**Pontuação Máxima:** 50 pontos  
**Pontuação Mínima para Aprovação:** 30 pontos  
**Prazo de Entrega:** 05/02/2026 às 23h59  

---

## 🎯 OBJETIVO

O Estado de Mato Grosso pretende oferecer um registro público de Pets e seus tutores, com uma API pública. O objetivo é avaliar a capacidade de cadastrar, editar, excluir e apresentar os dados fornecidos pela API.

---

## 🛠️ PRÉ-REQUISITOS

- Leia todo o documento antes de iniciar
- **Stack Obrigatória:** Angular ou React + TypeScript
- Requisitar dados em tempo real (axios, fetch ou similar)
- Layout responsivo
- Se usar framework CSS, priorize Tailwind
- Lazy Loading Routes para módulos (Pets e Tutores)
- Paginação ou scroll infinito
- Boas práticas de organização e componentização
- Incluir testes unitários básicos

---

## 📱 REQUISITOS ESPECÍFICOS - 5 TELAS OBRIGATÓRIAS

### 1️⃣ TELA INICIAL - LISTAGEM DE PETS

**Endpoint:** `GET /v1/pets`

**Funcionalidades:**
- Exibir em cards (foto se existir, nome, espécie, idade)
- **Paginação (10 por página)** - OBRIGATÓRIO
- **Busca por nome** para filtrar - OBRIGATÓRIO
- Ao clicar no card → ir ao detalhamento do Pet

**Critérios de Avaliação:**
- Implementação correta da paginação
- Funcionalidade de busca
- Layout responsivo dos cards
- Tratamento de estados (loading, erro, vazio)

---

### 2️⃣ TELA DE DETALHAMENTO DO PET

**Endpoints:**
- `GET /v1/pets/{id}` - Dados do pet
- `GET /v1/tutores/{id}` - Dados do tutor (se houver)

**Funcionalidades:**
- Exibir dados do pet: nome, espécie, idade, raça, foto
- **Se houver tutor:** exibir dados do tutor (nome e contato)
- **Dar destaque ao nome do pet**
- Se não houver tutor, exibir mensagem apropriada
- Botão para editar o pet
- Botão para voltar à listagem

**Critérios de Avaliação:**
- Integração correta com a API
- Exibição condicional de dados do tutor
- Design hierárquico (destaque do nome)
- Navegação funcional

---

### 3️⃣ TELA DE CADASTRO/EDIÇÃO DE PET

**Endpoints:**
- `POST /v1/pets` - Criar novo pet
- `PUT /v1/pets/{id}` - Editar pet existente
- `POST /v1/pets/{id}/fotos` - Upload de foto

**Campos do Formulário:**
- Nome (obrigatório)
- Espécie (obrigatório)
- Idade (obrigatório)
- Raça (opcional)

**Funcionalidades:**
- Formulário de criação/edição
- Upload de foto do pet
- Validação de campos obrigatórios
- Aplicar máscaras quando necessário
- Feedback de sucesso/erro
- Redirecionamento após salvar

**Critérios de Avaliação:**
- Validação de formulário
- Upload de imagens funcional
- Tratamento de erros
- UX do formulário

---

### 4️⃣ TELA DE CADASTRO/EDIÇÃO DE TUTOR

**Endpoints:**
- `POST /v1/tutores` - Criar tutor
- `PUT /v1/tutores/{id}` - Atualizar tutor
- `POST /v1/tutores/{id}/fotos` - Upload de foto do tutor

**Campos do Formulário:**
- Nome completo (obrigatório)
- Telefone (obrigatório)
- Endereço (obrigatório)

**Funcionalidades:**
- Formulário de criação/edição
- Upload de foto do tutor
- Validação de campos
- Máscara de telefone

**VINCULAÇÃO PET-TUTOR:**
- Na tela do tutor, listar pets vinculados
- Vincular novo pet ao tutor: `POST /v1/tutores/{id}/pets/{petId}`
- Remover vínculo: `DELETE /v1/tutores/{id}/pets/{petId}`

**Critérios de Avaliação:**
- CRUD completo de tutor
- Funcionalidade de vinculação pet-tutor
- Interface para gerenciar vínculos
- Validações e máscaras

---

### 5️⃣ AUTENTICAÇÃO

**Endpoints:**
- `POST /autenticacao/login` - Fazer login
- `PUT /autenticacao/refresh` - Renovar token

**Funcionalidades:**
- Tela de login
- Autenticação via JWT consumindo o endpoint
- Gerenciar expiração do token
- Renovação automática do token (refresh)
- **Acesso ao front exige login** - OBRIGATÓRIO
- Logout funcional
- Redirecionamento de rotas protegidas

**Critérios de Avaliação:**
- Implementação correta de JWT
- Refresh token automático
- Guards/proteção de rotas
- Persistência de sessão (localStorage/sessionStorage)
- Tratamento de token expirado

---

## 🏆 REQUISITOS APENAS PARA SÊNIOR (DIFERENCIAIS)

### a) Health Checks e Liveness/Readiness
- Endpoint de verificação de saúde da aplicação
- Monitoramento de conectividade com a API
- Status de disponibilidade

### b) Testes unitários
- Mínimo de 5 testes de componentes principais
- Testes de integração com a API (mocking)
- Coverage mínimo aceitável
- Uso de Jest + Testing Library (React) ou Jasmine/Karma (Angular)

### c) Padrão Facade (arquitetura em camadas)
- Gerenciamento de estado com **BehaviorSubject** (Angular) ou **Context API/Redux** (React)
- Separação clara de responsabilidades
- Services para chamadas de API
- Componentes focados apenas em apresentação

**Pontuação Extra:** Implementar estes requisitos pode adicionar até 9 pontos ao projeto

---

## 📦 INSTRUÇÕES DE ENTREGA

### 1. Repositório GitHub
- Projeto em repositório **público** no GitHub
- Nome do repositório no formato: `https://github.com/seunome123456.git`
- Informar o link durante a inscrição

### 2. README.md (OBRIGATÓRIO)

**Deve conter:**
- Documentação da arquitetura do projeto
- Dados de inscrição (nome do candidato)
- Vaga: Analista de TI - Front-End
- Instruções de como executar/testar o projeto
- Tecnologias utilizadas
- Decisões técnicas tomadas

**Exemplo de estrutura:**
```markdown
# Sistema de Gerenciamento de Pets

**Candidato:** [Seu Nome]
**Vaga:** Analista de TI - Front-End
**Processo:** SEPLAG/MT 001/2026

## Como executar
...

## Tecnologias
...

## Decisões técnicas
...
```

### 3. Estrutura do Repositório

**Deve conter:**
- Todos os arquivos necessários para rodar o projeto
- Scripts de build e desenvolvimento
- Arquivo de variáveis de ambiente (.env.example)
- Configurações de Docker (opcional, mas diferencial)

### 4. Alterações no Projeto

- Alterações permitidas **até 05/02/2026**
- **Após essa data, NENHUMA modificação é permitida**
- Commits após o prazo = DESCLASSIFICAÇÃO

### 5. Não Reenviar

- Após enviar o link na inscrição, NÃO é possível reenviar
- O projeto NÃO pode ser submetido novamente
- Certifique-se de que o link está correto antes de inscrever

---

## 📊 CRITÉRIOS DE AVALIAÇÃO (50 PONTOS)

### A. ESTRUTURA E ORGANIZAÇÃO (0-10 pts)

| Critério | Pontos Máx |
|----------|-----------|
| Modularização Angular ou React - Estrutura organizada em módulos, componentes e services | 0-4 |
| Responsividade e UX - Layout adaptável, visual limpo e intuitivo | 0-3 |
| Documentação (README) - Instruções de execução e dependências bem descritas | 0-3 |

---

### B. FUNCIONALIDADES (0-25 pts)

| Critério | Pontos Máx |
|----------|-----------|
| Consumo da API - CRUD completo consumindo endpoints (pets/tutores) | 0-6 |
| Paginação e Busca - Implementação de paginação e filtros dinâmicos | 0-3 |
| Autenticação JWT - Login, expiração e renovação do token | 0-5 |
| Upload de imagens - Upload funcional e exibição das fotos | 0-3 |
| Lazy Loading - Implementação de rotas dinâmicas para performance | 0-2 |
| State Management (Sênior) - Uso de BehaviorSubject, RxJS ou Facade Pattern | 0-3 |
| Testes Unitários - Testes de componentes e services | 0-3 |

---

### C. BOAS PRÁTICAS E ENTREGA (0-15 pts)

| Critério | Pontos Máx |
|----------|-----------|
| Clean Code - Código limpo, reutilizável e padronizado | 0-4 |
| Commits e versionamento - Histórico coerente e incremental | 0-2 |
| Performance e carregamento - Lazy loading, cache e otimizações | 0-2 |
| Documentação técnica e justificativas - Clareza nas decisões técnicas | 0-3 |
| Containerização/Deploy - Aplicação empacotada via Docker funcional | 0-4 |

---

## ✅ O QUE ESPERAM

### Implementação dos requisitos:
- Como rodar localmente
- Como seria o deploy
- Testes (quando aplicável)
- Legibilidade do código
- Escalabilidade da solução
- Commits pequenos e descritivos
- Experiência técnica demonstrada
- Clean Code
- Soluções simples e eficientes

---

## ❌ O QUE NÃO ESPERAM

- Trabalho não autoral (plágio)
- Commits grandes sem explicação
- Código sem testes
- Documentação incompleta
- Projeto que não roda

---

## 🔍 O QUE SERÁ AVALIADO

- Histórico de commits (qualidade e frequência)
- Instruções de execução (clareza do README)
- Organização do código (estrutura de pastas)
- Semântica e boas práticas
- Estrutura e arquitetura
- Legibilidade do código
- Manutenibilidade
- Implementação correta dos requisitos
- Tratamento de erros
- Experiência do usuário (UX/UI)

---

## ⚠️ CAUSAS DE DESCLASSIFICAÇÃO

### O candidato NÃO receberá pontuação quando:

a) **Não atender rigorosamente ao estabelecido no Edital**
- Falta de requisitos obrigatórios
- Stack tecnológica diferente da especificada

b) **Apresentar documentação incompleta ou ilegível**
- README ausente ou incompleto
- Instruções que não funcionam
- Código sem comentários quando necessário

c) **Projetos caracterizados como cópias**
- Código plagiado de outros candidatos
- Projeto idêntico a tutoriais/templates
- **TODOS os candidatos envolvidos serão desclassificados**

---

## 🎯 CHECKLIST DE FUNCIONALIDADES MÍNIMAS

### Autenticação
- [ ] Tela de login funcional
- [ ] JWT implementado
- [ ] Refresh token automático
- [ ] Logout funcional
- [ ] Rotas protegidas (guard/middleware)

### Listagem de Pets
- [ ] GET /v1/pets funcionando
- [ ] Cards exibindo foto, nome, espécie, idade
- [ ] Paginação de 10 itens por página
- [ ] Busca por nome funcional
- [ ] Click no card navega para detalhamento

### Detalhamento do Pet
- [ ] GET /v1/pets/{id} funcionando
- [ ] Exibir todos dados do pet
- [ ] Se houver tutor, exibir dados do tutor
- [ ] Nome do pet em destaque
- [ ] Botão de editar funcionando
- [ ] Botão de voltar funcionando

### CRUD de Pet
- [ ] Formulário de criação
- [ ] POST /v1/pets funcionando
- [ ] Formulário de edição
- [ ] PUT /v1/pets/{id} funcionando
- [ ] Upload de foto funcional
- [ ] Validações implementadas

### CRUD de Tutor
- [ ] Formulário de criação
- [ ] POST /v1/tutores funcionando
- [ ] Formulário de edição
- [ ] PUT /v1/tutores/{id} funcionando
- [ ] Upload de foto funcional
- [ ] Máscara de telefone
- [ ] Lista de pets vinculados
- [ ] Vincular pet funcionando
- [ ] Desvincular pet funcionando

### Layout e UX
- [ ] 100% responsivo (mobile, tablet, desktop)
- [ ] Loading states em requisições
- [ ] Tratamento de erros com feedback visual
- [ ] Navegação intuitiva

### Código e Documentação
- [ ] TypeScript configurado
- [ ] ESLint sem erros
- [ ] Código organizado e limpo
- [ ] README completo
- [ ] Commits semânticos

### Diferenciais (Sênior)
- [ ] Context API / BehaviorSubject implementado
- [ ] Lazy Loading de rotas
- [ ] Mínimo 5 testes unitários
- [ ] Docker configurado
- [ ] Health checks (opcional)

---

## 📝 EXEMPLO DE ESTRUTURA DE PROJETO

### React + TypeScript + Vite

```
pet-manager-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   ├── pages/
│   │   ├── Auth/
│   │   ├── Pets/
│   │   └── Tutors/
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── petsService.ts
│   │   └── tutorsService.ts
│   ├── contexts/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── tests/
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 COMANDOS ESSENCIAIS

### Desenvolvimento
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Testes
```bash
npm run test
npm run test:coverage
```

### Docker
```bash
docker-compose up
```

---

## 🔗 LINKS IMPORTANTES

- **API Swagger:** https://pet-manager-spi.geia.vip/q/swagger-ui/
- **Sistema de Inscrição:** https://seletivo.seplag.mt.gov.br
- **Edital Completo:** Diário Oficial do Estado de Mato Grosso

---

## ⏰ PRAZOS CRÍTICOS

| Ação | Data Limite |
|------|-------------|
| Inscrição (enviar link GitHub) | 25/01/2026 |
| Desenvolvimento | 26/01 a 05/02/2026 |
| **Último commit permitido** | **05/02/2026 23h59** |
| Resultado do Projeto | 19/02/2026 |
| Entrevistas Técnicas | 25/02 a 27/02/2026 |
| Resultado Final | 03/03/2026 |

---

## 💡 DICAS FINAIS

### Para maximizar sua pontuação:

1. **Funcionalidades completas** (30 pts básico)
   - Implemente TUDO que é obrigatório primeiro
   - Teste exaustivamente cada funcionalidade

2. **Código limpo e organizado** (4 pts)
   - Use TypeScript corretamente
   - Siga padrões de nomenclatura
   - Evite código duplicado

3. **README excelente** (3 pts)
   - Instruções claras e funcionais
   - Explique suas decisões técnicas
   - Seja profissional

4. **Diferenciais Sênior** (9 pts extra)
   - Testes unitários são relativamente fáceis
   - Docker é um grande diferencial
   - State management mostra maturidade

5. **Commits semânticos** (2 pts)
   - Use conventional commits
   - Commits pequenos e frequentes
   - Mensagens descritivas

---

## 🎯 META DE PONTUAÇÃO

**Mínimo para não eliminar:** 30 pontos  
**Meta realista:** 40-45 pontos  
**Meta ideal:** 45-50 pontos  

**Lembre-se:** Qualidade > Quantidade

É melhor entregar menos funcionalidades perfeitas do que muitas com bugs!

---

**BOA SORTE! 🚀**
