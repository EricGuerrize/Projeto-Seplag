# Gerenciador de Pets - SEPLAG

Sistema de registro público de Pets e Tutores desenvolvido para o Estado de Mato Grosso. Aplicação SPA em React com TypeScript que consome a API disponível em https://pet-manager-api.geia.vip.

**Candidato:** Eric Guerrize  
**Vaga:** Analista de TI - Front-End

---

## Sobre o projeto

O projeto utiliza React 19, Vite, TypeScript e Tailwind CSS. O roteamento é feito com React Router, com lazy loading das páginas. A autenticação é via JWT, com renovação automática do token quando expirado; o Axios está configurado com interceptors para incluir o token nas requisições e para tentar o refresh em caso de resposta 401.

A estrutura está organizada em pastas: `componentes` (Botao, Entrada, Cartao, Carregando, RotaProtegida), `paginas` (Login, Inicio, listagem e detalhes de pets e tutores, formulários de cadastro e edição), `servicos` (configuração da API, autenticação, pets e tutores), `fachadas` (usePetsFachada e useTutoresFachada para estado e operações), `contextos` e `hooks` para autenticação, e `tipos` com as interfaces TypeScript.

As funcionalidades incluem login, listagem de pets com paginação (10 por página) e busca por nome, tela de detalhes do pet com dados do tutor quando houver vínculo (e mensagem quando não houver), cadastro e edição de pet com upload de foto, listagem de tutores, detalhes do tutor com pets vinculados e opção de desvincular, e cadastro/edição de tutor com máscara de telefone e upload de foto.

---

## Como executar

É necessário Node.js 18 ou superior e npm (ou yarn).

```bash
npm install
npm run dev
```

A aplicação ficará disponível em http://localhost:5173.

Para gerar o build de produção:

```bash
npm run build
```

Para executar os testes (Vitest):

```bash
npm test
```

---

## Docker

A aplicação pode ser executada em container. Para construir a imagem e rodar:

```bash
docker build -t seplag-frontend .
docker run -p 8080:80 seplag-frontend
```

Alternativamente, use docker-compose: `docker-compose up -d`. A aplicação ficará disponível em http://localhost:8080. O projeto inclui Dockerfile multi-stage (Node para compilação e Nginx para servir o build) e arquivo de configuração do Nginx.

---

## API

URL base: https://pet-manager-api.geia.vip  
Documentação (Swagger): https://pet-manager-api.geia.vip/q/swagger-ui/

A aplicação utiliza os endpoints de autenticação (login e refresh), CRUD de pets em `/v1/pets` (incluindo upload de foto), e CRUD de tutores em `/v1/tutores` (foto e vinculação/desvinculação de pets). As credenciais para teste são as fornecidas pela organização do processo seletivo.

---

Projeto desenvolvido para o Processo Seletivo Simplificado da SEPLAG/MT.
