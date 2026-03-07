# api/

Hono + MongoDB palette API. Dockerized, deployed behind Apache reverse proxy. Node.js server (not Cloudflare Workers or D1).

## Structure

```
api/
├── src/
│   ├── index.ts          # Hono app, middleware stack, route mounting, cron
│   ├── types.ts          # AppEnv (session token + userSlug context variables)
│   ├── db.ts             # MongoDB singleton, 11 indexes across 5 collections
│   ├── middleware.ts      # CORS, rateLimit, loginRateLimit, resolveSession, adminAuth, hashIP
│   ├── cron.ts           # daily cleanup: stale sessions (30d), orphaned votes
│   ├── slugWords.ts      # word lists + generateUniqueSlug for user slug creation
│   └── routes/
│       ├── palettes.ts   # CRUD, paginated list, atomic vote toggle
│       ├── sessions.ts   # user registration, slug-based login, /me endpoint
│       ├── colors.ts     # color name proposal + approved list
│       └── admin.ts      # moderation, user management, impersonation, palette import
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
| POST | `/sessions` | — | Register (creates user + session) |
| POST | `/sessions/login` | — | Log in with existing slug |
| GET | `/sessions/me` | Session | Current user info |
| GET | `/palettes` | — | List (paginated, sort: newest/popular) |
| GET | `/palettes/:slug` | — | Get by slug |
| POST | `/palettes` | Session | Create palette |
| PATCH | `/palettes/:slug` | Session | Rename (owner only) |
| POST | `/palettes/:slug/vote` | Session | Toggle vote (atomic) |
| GET | `/colors/approved` | — | List approved color names |
| POST | `/colors/propose` | Session | Propose color name |
| GET | `/admin/queue` | Admin | List pending proposals |
| GET | `/admin/colors/approved` | Admin | List approved names |
| DELETE | `/admin/colors/:id` | Admin | Delete color name |
| POST | `/admin/colors/:id/approve` | Admin | Approve proposed name |
| POST | `/admin/colors/:id/reject` | Admin | Reject proposed name |
| POST | `/admin/palettes/:slug/feature` | Admin | Toggle featured status |
| DELETE | `/admin/palettes/:slug` | Admin | Delete palette + votes |
| GET | `/admin/users` | Admin | List users (paginated) |
| GET | `/admin/users/:slug/palettes` | Admin | View user's palettes |
| POST | `/admin/impersonate` | Admin | Create session as user |
| DELETE | `/admin/users/:slug` | Admin | Delete user + all data |
| DELETE | `/admin/users/:slug/palettes` | Admin | Delete user's palettes |
| POST | `/admin/users/prune-empty` | Admin | Prune users with 0 palettes |
| POST | `/admin/users/:slug/import` | Admin | Import palettes to user |

## Database (MongoDB)

**Collections**: `palettes`, `votes`, `sessions`, `proposed_names`, `users`

Key indexes: `palettes.slug` (unique), `votes.{userSlug, paletteSlug}` (unique composite), `sessions.lastSeenAt`, `proposed_names.name` (unique), `users.createdAt`.

## Middleware stack (order)

1. OPTIONS → 204 + CORS
2. CORS headers on all responses
3. Body size limit: 64 KB
4. Rate limiting: 60 read/min, 10 write/min per IP (login: 5/min)
5. Session resolution (X-Session-Token header → sessionToken + userSlug)

Admin routes additionally require `Authorization: Bearer {ADMIN_TOKEN}` (timing-safe comparison).

## Deployment

- **Production URL**: `https://mbabb.fi.ncsu.edu/colors/`
- **Server**: Docker Compose (api + mongo) on port 3100
- **Deploy**: `bash deploy.sh`—rsync → SSH → `docker compose up -d --build` → smoke test
