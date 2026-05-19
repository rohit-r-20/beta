# BETA Universal Booking Platform

A production-grade, scalable SaaS booking ecosystem supporting multi-vendor operations, real-time availability, and enterprise-grade concurrency handling.

## 🏗️ Architecture

```
BETA-BOOKING/
├── frontend-user/      # Next.js 15 — User-facing booking app
├── frontend-admin/     # Next.js 15 — Merchant admin dashboard
├── backend-api/        # NestJS — RESTful API with WebSocket
├── shared/             # Shared types, constants, utilities
├── infrastructure/     # Docker, CI/CD configs
└── docs/               # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Redis 7+
- PostgreSQL 15+ (via Supabase)

### Development Setup

```bash
# 1. Clone and install
npm install

# 2. Set up environment variables
cp backend-api/.env.example backend-api/.env
cp frontend-user/.env.example frontend-user/.env
cp frontend-admin/.env.example frontend-admin/.env

# 3. Start Redis
docker compose up redis -d

# 4. Set up database
cd backend-api && npx prisma db push && cd ..

# 5. Run all services
npm run dev:all
```

### Access Points
| Service | URL |
|---------|-----|
| User App | http://localhost:3000 |
| Admin Dashboard | http://localhost:3001 |
| API Server | http://localhost:4000 |
| Swagger Docs | http://localhost:4000/docs |

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Zustand, TanStack Query, Framer Motion |
| Backend | NestJS, TypeScript, Prisma ORM |
| Database | Supabase PostgreSQL + PostGIS |
| Cache/Queue | Redis, BullMQ |
| Realtime | Socket.IO |
| Payments | Razorpay (Stripe-ready) |
| Storage | Supabase Storage |
| DevOps | Docker, GitHub Actions |

## 🏛️ Backend Modules

| Module | Description |
|--------|-------------|
| Auth | JWT integration with external auth service |
| Users | User profiles, favorites, preferences |
| Merchants | Merchant CRUD, staff, dashboard |
| Services | Service listings, categories, search |
| Availability | Slot generation, rules, blocking |
| Bookings | **Distributed-lock booking engine** |
| Payments | Razorpay abstraction with webhook verification |
| QR | Secure QR generation and check-in |
| Notifications | In-app notification system |
| Analytics | KPIs, revenue tracking, trends |
| Geolocation | Haversine-based nearby search |
| WebSocket | Real-time slot/booking updates |

## 🔒 Booking Engine

The booking engine prevents double-bookings using:

1. **Redis distributed locks** (SET NX EX)
2. **PostgreSQL transactions** (atomic capacity updates)
3. **Temporary booking holds** (10-minute TTL)
4. **BullMQ delayed jobs** (hold expiry checks)
5. **Lua scripts** (atomic lock release)

## 📄 API Documentation

Full Swagger docs available at `/docs` when the backend is running.

## 🐳 Docker

```bash
# Build all services
docker compose build

# Start all services
docker compose up -d

# Stop
docker compose down
```

## License

Private — All rights reserved.
