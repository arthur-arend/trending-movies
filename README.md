# Trend Movies

Projeto de catálogo de filmes desenvolvido em React com TypeScript, permitindo buscar e visualizar informações sobre filmes populares.

## 🚀 Tecnologias Utilizadas

- **React 19.1.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset JavaScript com tipagem estática
- **Vite 7.1.7** - Build tool e dev server
- **React Router 7.9.5** - Roteamento para aplicações React
- **Axios 1.13.1** - Cliente HTTP para requisições
- **Zustand 5.0.8** - Gerenciamento de estado global
- **Sass** - Pré-processador CSS
- **FontAwesome** - Biblioteca de ícones
- **Vitest** - Framework de testes
- **React Testing Library** - Utilitários para testes de componentes
- **MSW** - Mock Service Worker para testes

## 📦 Como Baixar e Rodar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositório>
```

2. Entre na pasta do projeto:

```bash
cd trend-movies
```

3. Instale as dependências:

```bash
npm install
```

4. Configure a chave de API do TMDB:

   Para rodar o projeto localmente, é necessário obter uma chave de acesso da API do The Movie Database (TMDB):

   - Acesse [https://developer.themoviedb.org/docs/getting-started](https://developer.themoviedb.org/docs/getting-started)
   - Faça login na sua conta ou crie uma nova conta
   - Vá até as configurações da sua conta e clique no link "API"
   - Solicite uma API key (chave de API)
   - Após receber a chave, crie um arquivo `.env` na raiz do projeto
   - Adicione a seguinte variável de ambiente no arquivo `.env`:

```env
VITE_API_KEY=sua_chave_api_aqui
```

**Importante:** Substitua `sua_chave_api_aqui` pela chave de API que você obteve do TMDB.

### Executar em Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

Para gerar a build de produção:

```bash
npm run build
```

### Preview da Build

Para visualizar a build de produção localmente:

```bash
npm run preview
```

### Testes

Para executar os testes:

```bash
npm test
```

Para executar os testes com interface visual:

```bash
npm run test:ui
```

## 🌐 Deploy

O projeto foi publicado na **Vercel** e está disponível em:

🔗 [https://trending-movies-hpedfijq2-arthur-arends-projects.vercel.app/](https://trending-movies-hpedfijq2-arthur-arends-projects.vercel.app/)

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter
- `npm test` - Executa os testes em modo watch
- `npm run test:ui` - Executa os testes com interface visual
- `npm run test:run` - Executa os testes uma vez
