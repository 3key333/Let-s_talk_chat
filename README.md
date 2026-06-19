# Chat

Фулстек-чат: React + Express + PostgreSQL + Socket.IO.

---

## Мини-гайд

### Структура

```
chat/
├── client/          # React-приложение (Vite)
├── server/          # Express API + WebSocket
├── SHARED/          # Общие TypeScript-типы
└── .env             # Переменные окружения (в корне)
```

### Запуск

1. Создать БД PostgreSQL и таблицы (`users`, `chats`, `messages`).
2. Заполнить `.env` в корне проекта.
3. Сервер:

```bash
cd server
npm install
npm run dev
```

4. Клиент (отдельный терминал):

```bash
cd client
npm install
npm run dev
```

- Клиент: `http://localhost:5173`
- Сервер: `http://localhost:3000`

### Как пользоваться

1. Регистрация на главной странице.
2. Переход в чат → ввод имени комнаты → `+`.
3. Подгружается история из БД, новые сообщения приходят через Socket.IO.

### `.env` (пример)

```env
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=

SERVER_HOST=localhost
SERVER_PORT=3000

JWT_SECRET=
```

---

## Пакеты — client

| Пакет | Назначение |
|-------|------------|
| `react` | UI |
| `react-dom` | Рендер React в DOM |
| `react-router-dom` | Роутинг (`/`, `/chats`) |
| `@reduxjs/toolkit` | Redux store, slices, thunks |
| `react-redux` | Подключение Redux к React |
| `axios` | HTTP-запросы к API |
| `socket.io-client` | Real-time сообщения |
| `vite` | Сборщик и dev-сервер |
| `@vitejs/plugin-react` | React для Vite |
| `typescript` | TypeScript |
| `eslint` | Линтер |
| `typescript-eslint` | ESLint + TypeScript |
| `eslint-plugin-react-hooks` | Правила для хуков |
| `eslint-plugin-react-refresh` | HMR для React |
| `@eslint/js` | Базовый ESLint config |
| `globals` | Глобальные переменные для ESLint |
| `@types/react` | Типы React |
| `@types/react-dom` | Типы react-dom |
| `@types/node` | Типы Node.js |

---

## Пакеты — server

| Пакет | Назначение |
|-------|------------|
| `express` | HTTP API |
| `cors` | CORS для клиента |
| `socket.io` | WebSocket: комнаты, сообщения в реальном времени |
| `pg` | PostgreSQL |
| `dotenv` | Переменные из `.env` |
| `bcrypt` | Хеш паролей |
| `jsonwebtoken` | JWT при регистрации |
| `helmet` | Безопасность HTTP-заголовков |
| `express-rate-limit` | Ограничение частоты запросов |
| `typescript` | TypeScript |
| `ts-node` | Запуск `.ts` без сборки |
| `nodemon` | Автоперезапуск при изменениях |
| `@types/express` | Типы Express |
| `@types/cors` | Типы cors |
| `@types/node` | Типы Node.js |
| `@types/pg` | Типы pg |
| `@types/bcrypt` | Типы bcrypt |
| `@types/jsonwebtoken` | Типы jsonwebtoken |
| `@types/express-rate-limit` | Типы express-rate-limit |
