# 💕 Pedido Jaqueline

Aplicação web romântica e interativa com 3 etapas: história visual, quiz bem-humorado e pedido de namoro com confetes.

## Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Estilo:** CSS puro, mobile-first
- **Efeito final:** canvas-confetti

## Estrutura

```
pedido-jaqueline/
  client/           → Frontend React + Vite
  server/           → Servidor Express
  deploy/           → Configuração Nginx
```

## Desenvolvimento local

### 1. Instalar dependências

```bash
# Na pasta client
cd client
npm install

# Na pasta server
cd ../server
npm install
```

### 2. Rodar em desenvolvimento

```bash
# Terminal 1 — Frontend (com hot reload)
cd client
npm run dev

# Terminal 2 — Backend (opcional, para testar API)
cd server
npm run dev
```

O frontend estará disponível em `http://localhost:5173` e faz proxy automático das chamadas `/api` para o backend na porta 3000.

### 3. Adicionar música (opcional)

Coloque o arquivo de áudio em:

```
client/public/musica.mp3
```

Caso o arquivo não exista, a experiência funciona normalmente sem música.

## Build de produção

```bash
cd client
npm run build
```

Os arquivos de build serão gerados em `client/dist/`.

## Rodar em produção

```bash
cd server
PORT=3000 PUBLIC_URL=https://seudominio.com node server.js
```

O servidor Express servirá os arquivos estáticos do build e as rotas de API.

### Com PM2 (recomendado)

```bash
npm install -g pm2
cd server
PORT=3000 PUBLIC_URL=https://seudominio.com pm2 start server.js --name pedido-jaqueline
pm2 save
pm2 startup
```

## Deploy na VPS (Hostinger Ubuntu)

### 1. Enviar arquivos para a VPS

```bash
scp -r pedido-jaqueline/ usuario@ip-da-vps:/home/usuario/
```

### 2. Instalar dependências na VPS

```bash
ssh usuario@ip-da-vps
cd pedido-jaqueline/client && npm install && npm run build
cd ../server && npm install
```

### 3. Configurar Nginx

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/pedido-jaqueline
sudo ln -s /etc/nginx/sites-available/pedido-jaqueline /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Edite o arquivo para substituir `seudominio.com` pelo seu domínio real.

### 4. Configurar HTTPS com Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seudominio.com -d www.seudominio.com
```

### 5. Iniciar o servidor com PM2

```bash
cd /home/usuario/pedido-jaqueline/server
PORT=3000 PUBLIC_URL=https://seudominio.com pm2 start server.js --name pedido-jaqueline
pm2 save
pm2 startup
```

## API

| Endpoint | Método | Resposta |
|---|---|---|
| `/api/health` | GET | `{ "status": "ok" }` |
| `/api/link` | GET | `{ "url": "..." }` |

---

Feito com ❤️ para a Jaqueline.
