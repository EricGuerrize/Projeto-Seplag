# Gerenciador de Pets - Projeto SEPLAG

Sistema de registro público de Pets e seus Tutores desenvolvido para o Estado de Mato Grosso.

## Sobre o Projeto

Aplicação SPA (Single Page Application) desenvolvida em React com TypeScript para gerenciamento de pets e tutores, consumindo a API pública disponível em `https://pet-manager-api.geia.vip`.

## Tecnologias Utilizadas

- **React 19** - Framework JavaScript para construção da interface
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Ferramenta de build e desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **React Router DOM** - Roteamento de páginas
- **Axios** - Cliente HTTP para requisições à API
- **Vitest** - Framework de testes unitários
- **React Testing Library** - Biblioteca para testes de componentes

## Estrutura do Projeto

```
src/
├── componentes/          # Componentes reutilizáveis da interface
│   ├── Botao/
│   ├── Entrada/
│   ├── Cartao/
│   ├── Carregando/
│   └── RotaProtegida/
├── paginas/              # Páginas da aplicação
│   ├── Login/
│   ├── Inicio/
│   ├── DetalhesPet/
│   ├── FormularioPet/
│   ├── Tutores/
│   ├── DetalhesTutor/
│   └── FormularioTutor/
├── servicos/             # Camada de serviços (chamadas à API)
│   ├── api.ts            # Configuração do Axios
│   ├── autenticacaoServico.ts
│   ├── petServico.ts
│   └── tutorServico.ts
├── fachadas/             # Padrão Facade para gerenciamento de estado
│   ├── usePetsFachada.ts
│   ├── useTutoresFachada.ts
│   └── index.ts
├── contextos/            # Contextos React
│   └── AutenticacaoContexto.tsx
├── hooks/                # Hooks customizados
│   └── useAuth.ts
├── tipos/                # Interfaces e tipos TypeScript
│   ├── pet.ts
│   ├── tutor.ts
│   ├── autenticacao.ts
│   └── index.ts
├── utilitarios/          # Funções utilitárias
└── testes/               # Testes unitários
```

## Funcionalidades Implementadas

### Configuração Inicial
- [x] Projeto React com Vite e TypeScript
- [x] Tailwind CSS configurado
- [x] Estrutura de pastas organizada
- [x] Vitest configurado para testes

### Tipos TypeScript
- [x] Interfaces para Pet (Pet, PetRequest, PetResponse, PagedPetResponse)
- [x] Interfaces para Tutor (Tutor, TutorRequest, TutorResponse, PagedTutorResponse)
- [x] Interfaces para Autenticação (AuthRequest, AuthResponse)
- [x] Interface Anexo para fotos

### Serviços de API
- [x] Configuração do Axios com interceptors
- [x] Interceptor para adicionar token JWT automaticamente
- [x] Interceptor para renovação automática de token
- [x] Serviço de autenticação (login, renovação de token, logout)
- [x] Serviço de pets (CRUD completo, upload de fotos)
- [x] Serviço de tutores (CRUD completo, upload de fotos, vinculação de pets)

### Autenticação
- [x] Contexto de autenticação (AutenticacaoContexto)
- [x] Hook useAuth para facilitar acesso ao contexto
- [x] Gerenciamento de estado de autenticação
- [x] Verificação automática de token ao carregar aplicação

### Componentes Reutilizáveis
- [x] Botão (Botao) - com variantes e tamanhos
- [x] Entrada (Entrada) - input com label e tratamento de erro
- [x] Cartão (Cartao) - container reutilizável
- [x] Carregando (Carregando) - indicador de loading

### Padrão Facade (Gerenciamento de Estado)
- [x] usePetsFachada - gerencia estado e operações de pets
- [x] useTutoresFachada - gerencia estado e operações de tutores
- [x] Controle de paginação integrado
- [x] Tratamento de erros e estado de carregamento

### Páginas
- [x] Login - autenticação do usuário
- [x] Rota protegida - redirecionamento automático para login
- [x] Configuração de rotas com React Router
- [x] Início (Listagem de Pets) - exibição em cards com paginação e busca
- [x] Detalhes do Pet - informações completas e dados do tutor
- [x] Formulário de Pet - cadastro e edição com upload de foto
- [x] Listagem de Tutores - exibição em cards com paginação e busca
- [x] Detalhes do Tutor - informações e pets vinculados
- [x] Formulário de Tutor - cadastro e edição com máscara de telefone

## Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

### Testes
```bash
npm test
```

## Deploy com Docker

A aplicação está preparada para ser executada em container Docker.

### Construir a imagem
```bash
docker build -t seplag-frontend .
```

### Executar o container
```bash
docker run -p 8080:80 seplag-frontend
```

A aplicação estará disponível em `http://localhost:8080`

### Usando docker-compose
```bash
docker-compose up -d
```

Para parar o container:
```bash
docker-compose down
```

### Arquivos de configuração Docker

- `Dockerfile` - Build multi-stage (Node.js para compilação + Nginx para produção)
- `nginx.conf` - Configuração do Nginx para servir a SPA
- `docker-compose.yml` - Orquestração do container
- `.dockerignore` - Arquivos ignorados no contexto de build

## API

A aplicação consome a API pública disponível em:
- Base URL: `https://pet-manager-api.geia.vip`
- Documentação Swagger: `https://pet-manager-api.geia.vip/q/swagger-ui/`

### Endpoints Principais

#### Autenticação
- `POST /autenticacao/login` - Realizar login
- `PUT /autenticacao/refresh` - Renovar token de acesso

> Para testar a aplicação, utilize as credenciais disponíveis na API de teste fornecida pela organização do processo seletivo.

#### Pets
- `GET /v1/pets` - Listar pets (com paginação e busca)
- `GET /v1/pets/{id}` - Buscar pet por ID
- `POST /v1/pets` - Cadastrar novo pet
- `PUT /v1/pets/{id}` - Atualizar pet
- `DELETE /v1/pets/{id}` - Excluir pet
- `POST /v1/pets/{id}/fotos` - Adicionar foto ao pet

#### Tutores
- `GET /v1/tutores` - Listar tutores (com paginação)
- `GET /v1/tutores/{id}` - Buscar tutor por ID
- `POST /v1/tutores` - Cadastrar novo tutor
- `PUT /v1/tutores/{id}` - Atualizar tutor
- `DELETE /v1/tutores/{id}` - Excluir tutor
- `POST /v1/tutores/{id}/fotos` - Adicionar foto ao tutor
- `POST /v1/tutores/{id}/pets/{petId}` - Vincular pet ao tutor
- `DELETE /v1/tutores/{id}/pets/{petId}` - Desvincular pet do tutor

## Próximos Passos

- [ ] Configuração de rotas com lazy loading
- [ ] Testes unitários

## Autor

Eric Guerrize

## Licença

Este projeto foi desenvolvido para o Processo Seletivo Simplificado da SEPLAG/MT.
