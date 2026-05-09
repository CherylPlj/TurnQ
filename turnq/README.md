# TurnQ Queue Management System

Production-ready starter using:
- Backend: Node.js + Express + Prisma + PostgreSQL + Socket.io
- Frontend: React (Vite) + Tailwind CSS
- Auth: JWT

## 1) Folder Structure

```txt
turnq/
  backend/
    prisma/
      schema.prisma
    src/
      config/
      controllers/
      middlewares/
      repositories/
      routes/
      services/
      types/
      utils/
      validators/
      app.ts
      server.ts
      socket.ts
  frontend/
    src/
      components/
      lib/
      pages/
      App.tsx
      main.tsx
      styles.css
```

## 2) Prisma Schema

See `backend/prisma/schema.prisma`.
Includes:
- RBAC: `Role` enum (`ADMIN`, `STAFF`, `USER`)
- Queue states: `QueueStatus`
- Priority tiers: `PriorityType` (`SENIOR`, `PWD`, `REGULAR`)
- Core models: `User`, `Establishment`, `Service`, `Queue`, `QrCheckIn`, `Notification`

## 3) Backend API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/queues/qr/:establishmentCode/:serviceId` (QR payload generation)
- `POST /api/queues` (authenticated queue creation)
- `POST /api/queues/:establishmentId/call-next` (admin/staff only)

## 4) Queue Algorithm Logic

Implemented in `backend/src/services/queue.service.ts`:
- Assigns queue number prefix by priority (`S`, `P`, `R`)
- Computes sortable position using weighted priority:
  - `SENIOR = 1xxx`
  - `PWD = 2xxx`
  - `REGULAR = 3xxx`
- Calls next queue by lowest computed position

## 5) WebSocket Implementation

- Socket server in `backend/src/socket.ts`
- Client subscription event: `queue:subscribe` with `establishmentId`
- Broadcast event from admin action: `queue:called`
- Display board listens to live called queue updates

## 6) Sample Frontend Components

- `SignInPage` (JWT login form + validation)
- `QueuePage` (priority queue join actions)
- `AdminDashboardPage` (call next queue)
- `DisplayBoardPage` (public realtime now-serving screen)
- `QueueCard` (queue state card)

## Run

Backend:
1. `cd turnq/backend`
2. `cp .env.example .env`
3. Update `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`
4. `npm install`
5. `npx prisma generate`
6. `npx prisma migrate dev`
7. `npm run dev`

Frontend:
1. `cd turnq/frontend`
2. `npm install`
3. Set `VITE_API_BASE_URL=http://localhost:4000` in `.env`
4. `npm run dev`
