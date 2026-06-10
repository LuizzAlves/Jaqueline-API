# Deploy no EasyPanel

Configure o app como Node.js usando a raiz do repositorio.

## Comandos

Install command:

```bash
npm install
```

Build command:

```bash
npm run build
```

Start command:

```bash
npm start
```

## Variaveis de ambiente

```txt
PORT=3000
PUBLIC_URL=https://seudominio.com
```

## Como funciona

- `npm install` instala as dependencias dos workspaces `client` e `server`.
- `npm run build` gera o frontend em `client/dist`.
- `npm start` inicia o Express em `server/server.js`.
- O Express serve o frontend buildado e tambem as rotas `/api/health` e `/api/link`.
