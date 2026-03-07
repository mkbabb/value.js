# api/

Hono + MongoDB palette API. Dockerized, deployed behind Apache reverse proxy. Node.js server (not Cloudflare Workers or D1).

## Structure

```
api/
├── src/
│   ├── index.ts          # 90 loc — Hono app, middleware stack, route mounting, cron
│   ├── types.ts          # 5 loc — AppEnv (session token context variable)
│   ├── db.ts             # 40 loc — MongoDB singleton, 9 indexes across 4 collections
│   ├── middleware.ts      # 143 loc — CORS, rateLimit, resolveSession, adminAuth, hashIP
│   ├── cron.ts           # 27 loc — daily cleanup: stale sessions (30d), orphaned votes
│   └── routes/
│       ├── palettes.ts   # 247 loc — CRUD, paginated list, atomic vote toggle
│       ├── sessions.ts   # 25 loc — anonymous session creation (UUID)
│       ├── colors.ts     # 99 loc — color name proposal + approved list
│       └── admin.ts      # 121 loc — moderation: approve/reject names, feature/delete palettes
├── package.json          # hono, mongodb, node-cron, dotenv
├── tsconfig.json         # strict, ES2022, Node16 modules
├── Dockerfile            # multi-stage Node 22-alpine build
├── compose.yaml          # api + mongo services, health checks
├── deploy.sh             # rsync + docker compose up on remote
├── apache-vhost.conf     # /colors/ → localhost:3100 reverse proxy
├── .env.example          # MONGODB_URI, ADMIN_TOKEN, PORT
└── .dockerignore
```

## Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/palettes` | — | List (paginated, sort: newest/popular) |
| GET | `/palettes/:slug` | — | Get by slug |
| POST | `/palettes` | Session | Create palette |
| PATCH | `/palettes/:slug` | Session | Rename (owner only) |
| POST | `/palettes/:slug/vote` | Session | Toggle vote (atomic) |
| POST | `/sessions` | — | Create anonymous session |
| GET | `/colors/approved` | — | List approved color names |
| POST | `/colors/propose` | Session | Propose color name |
| GET | `/admin/queue` | Admin | List pending proposals |
| POST | `/admin/palettes/:slug/feature` | Admin | Toggle featured status |
| DELETE | `/admin/palettes/:slug` | Admin | Delete palette + votes |
| POST | `/admin/colors/:id/approve` | Admin | Approve proposed name |
| POST | `/admin/colors/:id/reject` | Admin | Reject proposed name |

## Database (MongoDB)

**Collections**: `palettes`, `votes`, `sessions`, `proposed_names`

Key indexes: `palettes.slug` (unique), `votes.{userSlug,paletteSlug}` (unique composite), `sessions.lastSeenAt`, `proposed_names.name` (unique).

## Middleware stack (order)

1. OPTIONS → 204 + CORS
2. CORS headers on all responses
3. Body size limit: 64 KB
4. Rate limiting: 60 read/min, 10 write/min per IP
5. Session resolution (X-Session-Token header)

Admin routes additionally require `Authorization: Bearer {ADMIN_TOKEN}` (timing-safe comparison).

## Deployment

- **Production URL**: `https://mbabb.fi.ncsu.edu/colors/`
- **Server**: Docker Compose (api + mongo) on port 3100
- **Deploy**: `bash deploy.sh`—rsync → SSH → `docker compose up -d --build` → smoke test
