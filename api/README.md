# Palette API

Hono + MongoDB REST API for saving, sharing, and voting on color palettes. Backs the [demo](https://color.babb.dev) color picker.

## Stack

- **Runtime**: Node 22 (not Cloudflare Workers)
- **Framework**: [Hono](https://hono.dev) via `@hono/node-server`
- **Database**: MongoDB 8
- **Deployment**: Docker Compose behind Apache reverse proxy

## Sessions & authentication

No accounts. Users get anonymous **session tokens**—a UUID minted by `POST /sessions` and passed as `X-Session-Token` on subsequent requests. The server stores each session with a SHA-256-hashed IP and a `lastSeenAt` timestamp; sessions unseen for 30 days are purged by daily cron.

Session tokens gate all writes (palette creation, voting, name proposals). Reads are public.

Admin routes require `Authorization: Bearer {ADMIN_TOKEN}` with timing-safe comparison (`crypto.timingSafeEqual`).

## Palettes

Palettes are slug-addressed collections of 1–50 color stops.

**Schema:**
```
{
  slug:         string    — unique, lowercase alphanumeric + hyphens
  name:         string    — display name, 1–100 chars
  colors:       [{ css: string, name?: string, position: number }]
  voteCount:    number    — denormalized vote tally
  sessionToken: string    — creator's token (used for owner-only operations)
  status:       "published" | "featured"
  createdAt, updatedAt: Date
}
```

- **Create**: `POST /palettes`—validates slug format, enforces uniqueness via index, returns 409 on collision
- **List**: `GET /palettes?sort=newest|popular&limit=N&offset=N`—paginated; includes `voted` flag if session authenticated
- **Get**: `GET /palettes/:slug`—single palette with vote status
- **Rename**: `PATCH /palettes/:slug`—owner-only (matches `sessionToken`), returns 403 otherwise

## Voting

`POST /palettes/:slug/vote`—**idempotent toggle**. First call creates a vote record and increments `voteCount`; second call deletes it and decrements. Race-condition safe: `votes` has a unique composite index on `{sessionToken, paletteSlug}`, so concurrent duplicate inserts fail gracefully via `insertOne` error handling rather than `upsert`.

## Color name proposals

Users can propose custom color names that, once approved, feed the demo's `registerColorNames()` registry.

- `POST /colors/propose`—name (lowercase, letter-first, max 50 chars) + CSS string + optional contributor. Uniqueness enforced across all statuses (proposed, approved, rejected)
- `GET /colors/approved`—public list of approved names, sorted alphabetically
- Admin queue: `GET /admin/queue` → `POST /admin/colors/:id/approve` or `/reject`. All admin actions are audit-logged with timestamp and IP.

## Rate limiting

In-memory per-IP sliding window. Extracts the **rightmost** `X-Forwarded-For` entry (resistant to client-injected headers). Falls back to `X-Real-IP`.

| Tier | Methods | Limit |
|------|---------|-------|
| Read | GET, HEAD | 60 req/min |
| Write | POST, PATCH, DELETE | 10 req/min |

Tracks up to 50,000 IPs before rejecting new clients. Expired entries cleaned every 60s.

## Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/palettes` | — | List (paginated, sortable) |
| GET | `/palettes/:slug` | — | Get by slug |
| POST | `/palettes` | Session | Create palette |
| PATCH | `/palettes/:slug` | Session | Rename (owner only) |
| POST | `/palettes/:slug/vote` | Session | Toggle vote |
| POST | `/sessions` | — | Create anonymous session |
| GET | `/colors/approved` | — | List approved color names |
| POST | `/colors/propose` | Session | Propose color name |
| GET | `/admin/queue` | Admin | List pending proposals |
| POST | `/admin/palettes/:slug/feature` | Admin | Toggle featured |
| DELETE | `/admin/palettes/:slug` | Admin | Delete palette + votes |
| POST | `/admin/colors/:id/approve` | Admin | Approve name |
| POST | `/admin/colors/:id/reject` | Admin | Reject name |

## Database

**MongoDB collections**: `palettes`, `votes`, `sessions`, `proposed_names`.

**Indexes** (9 total):
- `palettes.slug` — unique, primary lookup
- `palettes.createdAt` — descending, "newest" sort
- `palettes.{voteCount, createdAt}` — compound, "popular" sort
- `palettes.status` — featured/published filtering
- `votes.{sessionToken, paletteSlug}` — unique composite, prevents duplicate votes
- `votes.paletteSlug` — cascade deletion
- `sessions.lastSeenAt` — 30-day cleanup scan
- `proposed_names.name` — unique, prevents duplicate proposals
- `proposed_names.status` — queue filtering

## Deployment

```bash
bash deploy.sh   # rsync → SSH → docker compose up -d --build → smoke test
```

- **Production**: `https://mbabb.fi.ncsu.edu/colors/`
- **Infra**: Docker Compose (`api` + `mongo` services), port 3100 behind Apache
- **Config**: `.env` with `MONGODB_URI`, `ADMIN_TOKEN`, `PORT`

## Structure

```
api/
├── src/
│   ├── index.ts        # Hono app, middleware stack, route mounting, cron schedule
│   ├── types.ts        # AppEnv type (session token context)
│   ├── db.ts           # MongoDB connection singleton, index creation
│   ├── middleware.ts    # CORS, rate limiting, session resolution, admin auth, IP hashing
│   ├── cron.ts         # Daily cleanup: stale sessions, orphaned votes
│   └── routes/
│       ├── palettes.ts # CRUD, paginated list, atomic vote toggle
│       ├── sessions.ts # Anonymous session creation
│       ├── colors.ts   # Color name proposal + approved list
│       └── admin.ts    # Moderation: approve/reject names, feature/delete palettes
├── Dockerfile          # Multi-stage Node 22-alpine
├── compose.yaml        # api + mongo, health checks, named volume
├── deploy.sh           # rsync + SSH + docker compose
├── apache-vhost.conf   # /colors/ reverse proxy config
└── .env.example
```
