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
├── paginas/              # Páginas da aplicação
├── servicos/             # Camada de serviços (chamadas à API)
│   ├── api.ts            # Configuração do Axios
│   ├── autenticacaoServico.ts
│   ├── petServico.ts
│   └── tutorServico.ts
├── fachadas/             # Padrão Facade para gerenciamento de estado
├── contextos/            # Contextos React
├── hooks/                # Hooks customizados
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

## API

A aplicação consome a API pública disponível em:
- Base URL: `https://pet-manager-api.geia.vip`
- Documentação Swagger: `https://pet-manager-api.geia.vip/q/swagger-ui/`

### Endpoints Principais

#### Autenticação
- `POST /autenticacao/login` - Realizar login
- `PUT /autenticacao/refresh` - Renovar token de acesso

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

- [ ] Contexto de autenticação e hook useAuth
- [ ] Padrão Facade para gerenciamento de estado
- [ ] Componentes reutilizáveis (Botão, Card, Input, Modal)
- [ ] Página de Login
- [ ] Página de listagem de Pets
- [ ] Página de detalhes do Pet
- [ ] Página de cadastro/edição de Pet
- [ ] Página de cadastro/edição de Tutor
- [ ] Configuração de rotas com lazy loading
- [ ] Testes unitários
- [ ] Docker e configuração de deploy

## Autor

Eric Guerrize

## Licença

Este projeto foi desenvolvido para o Processo Seletivo Simplificado da SEPLAG/MT.
