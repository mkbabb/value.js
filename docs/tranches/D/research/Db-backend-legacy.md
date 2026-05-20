# Lane Db — Backend (`api/`) Legacy / Workaround / Fail-Explicit Audit

**Scope**: read-only audit of `/Users/mkbabb/Programming/value.js/api/` (Hono + MongoDB palette API; Node 22; Docker Compose).
**Audit date**: 2026-05-19, tranche D planning (master at A.W4 close).
**Mandate**: tranche D directive — excise legacy/workaround/fallback code or fail explicitly; better encapsulation, service boundaries, DI, pipeline orchestration; no god modules (>500 LoC).
**Output mode**: recommendations for tranche D's plan. No edits.

---

## §1 Tree map + line counts

13 TypeScript files in `api/src/`, total **2,800 LoC** (sloc).

| File                                                     | LoC | Role                            | God? (>500) |
| -------------------------------------------------------- | --- | ------------------------------- | ----------- |
| `api/src/routes/palettes.ts`                             | 845 | Palette CRUD + versioning + forks + flags | **YES**  |
| `api/src/routes/admin.ts`                                | 750 | Moderation, users, tags, batch, audit, flags | **YES**  |
| `api/src/middleware.ts`                                  | 306 | CORS, rate limit (×3 limiters), session, admin auth, sanitize, IP hash | borderline |
| `api/src/routes/colors.ts`                               | 163 | Approved/search/propose color names | no |
| `api/src/routes/sessions.ts`                             | 123 | Register, login, /me            | no |
| `api/src/index.ts`                                       | 113 | App composition, env validation, cron schedule | no |
| `api/src/slugWords.ts`                                   |  99 | Word lists + `generateUniqueSlug` | no |
| `api/src/db.ts`                                          |  87 | Singleton, **24 indexes across 9 collections** | no |
| `api/src/migrate-oklab.ts`                               |  84 | One-shot backfill (orphaned)    | no — but stale (see §2-L1) |
| `api/src/migrate-slugs.ts`                               |  73 | One-shot session→user (orphaned) | no — stale (§2-L1) |
| `api/src/cron.ts`                                        |  29 | Daily cleanup                   | no |
| `api/src/hash.ts`                                        |  22 | `computeContentHash` (Merkle)   | no |
| `api/src/types.ts`                                       |   6 | `AppEnv` (sessionToken, userSlug) | no |

Additional surface area touched but not in `src/`:
- `api/scripts/backup.sh` (`mongodump` sidecar; healthy)
- `api/mongo-init/init-user.js` (creates app user; healthy)
- `api/dist/` (33 compiled artifacts committed — see §2-L2)

**Two god modules** flagged: `routes/palettes.ts` (845) and `routes/admin.ts` (750). Both bundle 4+ distinct domain concerns into a single file.

### God-module domain breakdown

`routes/palettes.ts` (845 LoC) contains **6 concerns** that should be 6 files:
1. L11–104  — `formatPalette`, `decodeCursor`/`encodeCursor`, `cssToOklab`, `computeOklabColors` (helpers; mix of formatting + math + base64)
2. L108–149 — `createVersionRecord` (version repository)
3. L158–320 — list/mine endpoints (search + pagination + cursor + color-distance)
4. L323–504 — single-palette CRUD (get/post/delete)
5. L507–589 — patch + version-on-content-change
6. L596–799 — versions, revert, fork, provenance
7. L805–843 — flagging

`routes/admin.ts` (750 LoC) contains **8 concerns**:
1. L12–26   — `audit()` helper (mis-located; should be a middleware or service)
2. L33–159  — color-name moderation (queue/approved/delete/approve/reject)
3. L166–199 — palette moderation (feature/delete)
4. L206–344 — user management (list/palettes/impersonate/status/delete/delete-palettes)
5. L367–469 — empty-prune + palette import
6. L476–560 — batch palettes + batch users
7. L567–622 — tags
8. L628–696 — flags
9. L703–748 — audit log query

---

## §2 Legacy / workaround / fallback / silent-default findings

Findings are tagged **L#** (legacy/dead), **W#** (workaround), **F#** (silent fallback / graceful degrade), **C#** (encapsulation/coupling). Disposition is one of: **EXCISE**, **FAIL-EXPLICIT**, **EXTRACT**, **KEEP** (intentional).

### L1. Orphaned one-shot migration scripts

- **`api/src/migrate-oklab.ts`** (84 LoC) — comment L1–2: "One-time migration: backfill oklabColors for all existing palettes". Not referenced from `package.json` scripts or `index.ts`. Duplicates `cssToOklab`/`linearize` math verbatim from `routes/palettes.ts` (L48–94 ≡ migrate-oklab.ts L8–45).
- **`api/src/migrate-slugs.ts`** (73 LoC) — "One-time migration: assign user slugs to existing sessions and palettes". Idempotent but only meaningful for a pre-Mar-2026 corpus that no longer exists in production.

**Disposition**: **EXCISE both**. Move to a `scripts/migrations-archive/` outside `src/` (or delete entirely if backups cover the rollback case). They're currently included in the Docker `tsc` build (`api/dist/migrate-oklab.js`, `api/dist/migrate-slugs.js` are produced and shipped — see L2). Keeping migration code in the runtime source tree violates the directive ("excise the code entirely") and contaminates the public surface of `src/`.

### L2. `api/dist/` checked into the repo

- 33 build artifacts (`.js`, `.d.ts`, `.js.map`, `.d.ts.map`) live in `api/dist/`.
- `Dockerfile` rebuilds via `npx tsc` (L7), so `dist/` is unused at runtime.
- `.dockerignore` already excludes `dist`. No `.gitignore` exclusion confirmed for `api/dist/` — check during D.

**Disposition**: **EXCISE** — add `api/dist/` to `.gitignore`, remove tracked artifacts.

### L3. Documentation drift: "5 collections" claim vs. reality

- `CLAUDE.md` (root, value.js) and `api/CLAUDE.md` both claim **5 collections** (`palettes`, `votes`, `sessions`, `proposed_names`, `users`).
- `api/src/db.ts` actually indexes **9 collections**: + `palette_versions`, `tags`, `flags`, `admin_audit`.
- 24 indexes total (not the "11 indexes across 5 collections" the docstring at db.ts top of file claims — wait, db.ts has no count comment; the `api/CLAUDE.md` is the source of the stale claim).

**Disposition**: **EXCISE** stale docs sentences; refresh `api/CLAUDE.md` + root `CLAUDE.md` against actual schema. This is a documentation-vs-reality bug that will mislead future agents.

### W1. Hand-rolled validation, no schema library

15 `await c.req.json<T>()` call sites across `routes/*` (count via grep). Each followed by 5–30 lines of `typeof / Array.isArray / .test() / .length` checks. Duplicates:

- Slug regex `^[a-z0-9][a-z0-9-]*$` appears in `palettes.ts:362`, `palettes.ts:697`, `admin.ts:424`.
- Color-array validation (name, slug, colors[]) duplicated `palettes.ts:357–392` ↔ `palettes.ts:517–548` ↔ `admin.ts:419–440`.
- Enum lists ("inappropriate"/"spam"/…, "active"/"suspended", "delete"/"feature"/…) hand-coded across `palettes.ts:813`, `admin.ts:300`, `admin.ts:479`, `admin.ts:517`.

**Disposition**: **EXTRACT** — adopt `@hono/zod-validator` + `zod` (already standard in the Hono ecosystem). Centralize shared schemas (`PaletteInput`, `ColorInput`, `Slug`, `Tag`, `BatchAction`) in a new `api/src/schemas/` directory. Wire as `zValidator('json', schema)` middleware per route. This is the single biggest cleanup lever — collapses ~300 LoC of ad-hoc parsing.

### W2. Silent fallback on `req.json()` parse failure

- `routes/palettes.ts:687` — fork endpoint:
  ```ts
  const body = await c.req.json<{ name?: string; slug?: string }>().catch(() => ({ name: undefined, slug: undefined }));
  ```
  Swallows a JSON parse error and pretends the client sent `{}`. Violates the directive's "no silent or graceful handling unless befitting." It's *barely* defensible (both fields are optional) but should still be **FAIL-EXPLICIT**: a 400 on malformed JSON is preferable to inferring intent.

### W3. Silent audit-write swallow

- `routes/admin.ts:23` (inside `audit()`):
  ```ts
  } catch {
      // Silently swallow audit write failures — don't leak error details
  }
  ```
  Audit-log writes that fail leave admin actions unaccounted. The comment justifies it ("don't leak error details") but the failure mode is invisible to operators.

**Disposition**: **FAIL-EXPLICIT** — keep the response 200 (admin action did succeed), but `console.error("[audit] write failed:", err.message)` so the operator sees it in Docker logs. Better still: emit a structured error event the audit log itself records on next success (best-effort sentinel).

### W4. Silent skip on unsupported CSS color formats (oklab compute)

- `routes/palettes.ts:48–94` (`cssToOklab`): returns `null` on any non-hex, non-`rgb()` input (e.g., `hsl()`, `oklch()`, `color(display-p3 ...)`, named colors).
- `routes/palettes.ts:97–104` (`computeOklabColors`): silently drops null entries. A palette of `[oklch(0.7 0.1 30), hsl(120 50% 50%)]` will store `oklabColors: []` and become invisible to color-distance search.

**Disposition**: depends on tranche policy. Two valid options:
- (a) **FAIL-EXPLICIT** at write time — reject palettes whose colors don't parse server-side; force the client to pre-resolve.
- (b) **EXTRACT + reuse**: the library at `src/units/color/` already has a complete CSS parser. Build a tiny `api/src/color.ts` that imports the library (via `workspace:` or a vendored bundle) and does the right thing. The current 47-line hand-rolled converter is *legacy code by design* — it's a known-incomplete shadow of the library because the API can't easily import the library (Vite-only bundle).
- The library prebuild work in `tranche-b-open` (Bε / "library-side AND") + the freshness gate refactor in `70e61e9` make (b) feasible by tranche D.

Recommend (b): **EXTRACT** — make `api/` depend on the published `@mkbabb/value.js` (or a server build of it), retire the embedded converter, and **FAIL-EXPLICIT** on unparseable CSS.

### W5. `as any` casts — 31 occurrences

All 31 occurrences (grep'd) cluster into two patterns:

- **Pattern A (24 occurrences)**: `{ _id: slug as any }` / `{ _id: token as any }`. MongoDB's `Collection<T>` type defaults to `Document & { _id: ObjectId }`. When `_id` is a string (the chosen convention for `users._id = userSlug`, `sessions._id = token`, `palette_versions._id = hash`), TypeScript complains and `as any` is the escape.
- **Pattern B (7 occurrences)**: `as any[]`, `as any` on `$pull` operator, `$meta` projection type. Cosmetic — driver type-defs lag spec.

**Disposition**: **EXTRACT** typed collection accessors:
```ts
// api/src/db.ts (recommended)
export const collections = {
  users:           () => getDb().then(db => db.collection<UserDoc>('users')),
  sessions:        () => getDb().then(db => db.collection<SessionDoc>('sessions')),
  palettes:        () => getDb().then(db => db.collection<PaletteDoc>('palettes')),
  paletteVersions: () => getDb().then(db => db.collection<PaletteVersionDoc>('palette_versions')),
  votes:           () => getDb().then(db => db.collection<VoteDoc>('votes')),
  proposedNames:   () => getDb().then(db => db.collection<ProposedNameDoc>('proposed_names')),
  tags:            () => getDb().then(db => db.collection<TagDoc>('tags')),
  flags:           () => getDb().then(db => db.collection<FlagDoc>('flags')),
  adminAudit:      () => getDb().then(db => db.collection<AuditDoc>('admin_audit')),
};
```
where each `*Doc` interface uses `_id: string` on the string-keyed collections. This kills Pattern A entirely and centralizes schema. Pair with **F1** below.

### F1. "Defaults for pre-migration documents" silent backfill

- `routes/palettes.ts:18–26` (`formatPalette`):
  ```ts
  // Ensure new fields always have defaults for pre-migration documents
  tags: doc.tags ?? [],
  versionCount: doc.versionCount ?? 1,
  forkCount: doc.forkCount ?? 0,
  forkOf: doc.forkOf ?? null,
  forkOfHash: doc.forkOfHash ?? null,
  currentHash: doc.currentHash ?? null,
  oklabColors: doc.oklabColors ?? [],
  ```
  Self-documenting legacy-shim. The comment ("pre-migration documents") tells you exactly what this is.

**Disposition**: **FAIL-EXPLICIT** via migration — run a one-shot `$set` migration that ensures every palette document has all 7 fields with their defaults at rest, then **EXCISE** the `??` defaults from the formatter. After that, reading `doc.tags` returns `[]` because it's stored as `[]`, not because of a fallback. (And then retire `routes/palettes.ts:704–710` similarly: `source.oklabColors ?? computeOklabColors(...)` is a fallback-recompute that hides the same bug.)

### F2. `palette.sessionToken === sessionToken` ownership fallback

- Owner check appears 3 times: `palettes.ts:486`, `palettes.ts:555`, `palettes.ts:646`:
  ```ts
  const isOwner = palette.sessionToken === sessionToken
                || (userSlug && palette.userSlug === userSlug);
  ```
  The `sessionToken` half is the pre-user-slug ownership model (palettes used to be owned by session tokens). Post-`migrate-slugs.ts`, **every palette has a `userSlug`** and the first comparand is redundant.

**Disposition**: **EXCISE** the `palette.sessionToken === sessionToken` half; **EXTRACT** the remaining check into a helper `assertOwnership(palette, c)` returning a Hono response or `void`. Also retire `sessionToken` from the `palettes` collection at rest (migration).

### F3. Vote-toggle race-condition swallow

- `routes/palettes.ts:463–468`:
  ```ts
  } catch (e: any) {
      if (e?.code === 11000) {
          const updated = await db.collection("palettes").findOne({ slug });
          return c.json({ voted: true, voteCount: updated?.voteCount ?? 0 });
      }
      throw e;
  }
  ```
  Catches the duplicate-key race (`votes` has `{userSlug, paletteSlug}` unique index) and lies to the client: "voted: true" without `$inc`'ing voteCount. Result: voteCount and votes table can drift.

**Disposition**: **FAIL-EXPLICIT** with proper transaction semantics — use a single MongoDB transaction (find + insert vote + $inc) or rely on the `findOneAndUpdate` upsert pattern. Current code is correct under sequential single-threaded use but racy under concurrency.

### F4. `cron` job error fire-and-forget

- `index.ts:101–103`:
  ```ts
  cron.schedule("0 3 * * *", () => {
      cleanup().catch(console.error);
  });
  ```
  An overnight cleanup failure prints to stderr and is forgotten. Acceptable for now but is a candidate for the structured-log layer in D.

**Disposition**: **KEEP** for D, but flag for D+1 (structured-log + healthcheck flag).

### F5. `console.warn("MONGODB_URI not set, using localhost default")`

- `db.ts:14–16`:
  ```ts
  if (!uri) {
      if (process.env.NODE_ENV === "production") {
          throw new Error("MONGODB_URI is required in production");
      }
      console.warn("[WARN] MONGODB_URI not set, using localhost default");
  }
  client = new MongoClient(uri ?? "mongodb://localhost:27017/palette-db");
  ```
  Dev-mode graceful default. Defensible *if* the localhost URI matches a developer's expected default; otherwise it masks misconfiguration with a warning that's easily missed in dev logs.

**Disposition**: **KEEP** — this is the "befitting" graceful handling the directive allows. But move the env-validation block from `index.ts:75–95` into a single `validateEnv()` function called once at boot, and centralize the production-vs-dev branching there.

### F6. Inconsistent crypto import

- `slugWords.ts:1`, `middleware.ts:1`, `hash.ts:1` — `import crypto from "node:crypto"` / `import { createHash } from "node:crypto"` (explicit).
- `routes/sessions.ts:13,71`, `routes/admin.ts:280`, `routes/palettes.ts:694` — **bare `crypto.randomUUID()`** with no import. Relies on Node 19+ global `crypto`. Works at runtime but breaks the project convention.

**Disposition**: **FAIL-EXPLICIT** consistency — either import everywhere, or document the global-crypto convention in `api/CLAUDE.md`. Recommend explicit import (matches verbatim with `node:crypto`'s tree-shake behavior; also unambiguous in `tsconfig` `lib: ES2022`).

### F7. Defensive fallbacks in cursor pagination

- `routes/palettes.ts:252,254,278`:
  ```ts
  createdAt: last.createdAt?.toISOString(),
  forkCount: last.forkCount ?? 0,
  ...
  return c.json({ data, nextCursor: nextCursor ?? null, hasMore });
  ```
  Most are belts-and-braces against schema drift — same root cause as F1. Once F1 lands (every doc has every field at rest), these `?.`/`??` chains can be excised.

**Disposition**: bundle with **F1** excision.

### F8. Color-distance filter runs **after** pagination

- `routes/palettes.ts:266–275`: color-distance filter (`oklabColors[i] within radius of (L,a,b)`) is applied to the **paginated** result set, not pushed into the Mongo query. A search that filters out everything in the first page returns `data: []` with `hasMore: true` — a misleading shape.

**Disposition**: **EXTRACT** + redesign. Either push as `$expr`/`$nearSphere` (requires storing colors as 3D points + 2dsphere index — but Lab isn't spherical), or accept the limitation and **FAIL-EXPLICIT**: document it in API docs, surface a `filteredCount` field, and bail out with 400 if `limit < N` is too small to be meaningful. This is an architectural debt item, candidate for D+1.

### C1. `formatPalette` not reused by admin

- `routes/palettes.ts:11–27` defines `formatPalette(doc, votedSlugs?)`.
- `routes/admin.ts:262–265` re-implements palette formatting inline:
  ```ts
  const { _id, sessionToken, userSlug, ...rest } = p;
  return { id: _id.toString(), ...rest };
  ```
  Same idea, different shape (drops `userSlug` instead of including it; doesn't add defaults).

**Disposition**: **EXTRACT** to a shared formatter under `api/src/format/palette.ts` with an admin-mode flag (or two functions if shapes legitimately differ).

### C2. `audit()` lives in `routes/admin.ts`, not a service

- `routes/admin.ts:12–26`: helper function defined in the route file, used in 17 places.

**Disposition**: **EXTRACT** to `api/src/services/audit.ts`. Better still: write it as middleware that auto-records `(c.req.method, c.req.path, derived target)` so callers don't need to remember to call `audit()`.

### C3. Rate-limiter LRU eviction duplicated 3×

- `middleware.ts:107–133` (`rateLimit`), `middleware.ts:185–205` (`registrationRateLimit`), `middleware.ts:211–231` (`loginRateLimit`). All three contain the same 12-line eviction block, varying only by which `limiter` instance they consult.

**Disposition**: **EXTRACT** — the existing `createRateLimiter` factory already returns `{ map, check }`. Add `check()` itself to handle the LRU-eviction-then-reject logic; rewrite each middleware as a 3-liner `(c, next) => limiter.check(resolveIP(c)) ? next() : c.json({error}, 429)`.

### C4. `closeDb` never called

- `db.ts:81–87` exports `closeDb`. Only called from `migrate-slugs.ts:67`. Production process doesn't call it (no SIGTERM handler in `index.ts`).

**Disposition**: **FAIL-EXPLICIT** — add SIGTERM/SIGINT handler in `index.ts:main()` that calls `closeDb()` and stops the cron schedule. Currently the container relies on `tini` (correct PID 1 handler — Dockerfile L13) but the app does no graceful shutdown of Mongo. Connections will be force-closed.

---

## §3 Service boundaries, DI, pipeline orchestration

### Boundaries: **flat-tangle, no service layer**

There is **no service layer, no repository layer**. Every route handler:
1. Calls `await getDb()` directly.
2. Reads/writes MongoDB collections by string name (`db.collection("palettes")`).
3. Embeds validation, formatting, business logic, and persistence in one function body.

Counts (grep-verified):
- **157** direct `db.collection(...)` calls across the codebase.
- **123** direct MongoDB ops (`findOne` / `insertOne` / `updateOne` / `deleteMany` / `aggregate` / `find`).
- **9** distinct collection name strings referenced; any typo silently creates a new collection on first write.

This is the **most impactful** structural problem in the backend. Adding even a single field to a collection currently requires hunting through ~30 grep matches.

### DI: **module-level singleton, no injection**

- `getDb()` is a module-level singleton (`db.ts:3`). Every handler calls it. No `c.set('db', ...)` middleware, no constructor injection, no test-time substitution.
- `ALLOWED_ORIGINS` (middleware.ts:7) is also module-level and captured at first import. Changing `process.env.ALLOWED_ORIGINS` after import does nothing.
- `process.env.ADMIN_TOKEN` is read **on every request** at `middleware.ts:236` (correct — allows dev reloads).

### Pipeline orchestration: **ad-hoc per-route**

There is a consistent middleware chain at the app level (`index.ts:32–50`):
CORS preflight → CORS-on-response → body-limit → rate-limit → sanitize → resolve-session. Good.

But once inside a route, the flow is:
```
inline validation → inline auth check → inline owner check → inline mongo op(s) → inline format → inline error map
```
with no factoring. Compare to a clean Hono shape:
```
route -> zValidator -> requireUser -> requireOwnership("palette") -> service.update(input, ctx) -> formatPalette
```

### Verdict

- **Service-boundary verdict**: **D** (flat tangle). Route files own validation, persistence, formatting, and business rules. No tests would catch a schema drift bug. Pattern: god-route-file.
- **DI verdict**: **C** (module-level singleton; usable but not testable).
- **Pipeline verdict**: **B-** (app-level middleware is clean; route-level orchestration is bespoke per handler).

---

## §4 Encapsulation assessment

- **No `api/src/index.ts` re-exports** — the entry point is the app bootstrap, not a barrel. That's correct for a service. No accidental public-surface leakage.
- **`middleware.ts` is over-broad**: exports `corsHeaders`, `resolveIP`, `rateLimit`, `resolveSession`, `registrationRateLimit`, `loginRateLimit`, `adminAuth`, `sanitizeBody`, `escapeRegex`, `hashIP` (10 exports across 5 concerns). `escapeRegex` is used by `colors.ts` and `admin.ts` (audit-target regex); it doesn't belong in middleware.
- **`slugWords.ts` exports `generateSlug` and `generateUniqueSlug`**, but the word lists themselves are not exported. Good encapsulation.
- **Migration scripts** (`migrate-oklab.ts`, `migrate-slugs.ts`) are in `src/` alongside runtime code. Encapsulation violation (§2-L1).
- **`types.ts` is anemic** (6 lines, single `AppEnv`). All Mongo document shapes are inferred from `findOne()` return types (i.e., `Document`). No typed doc interfaces.

### Recommended encapsulation target

```
api/src/
├── index.ts               # ONLY app bootstrap + serve()
├── app.ts                 # Hono app composition (split out for testability)
├── env.ts                 # validateEnv(), all process.env reads
├── db.ts                  # getDb() + collections{} factory + closeDb()
├── types/
│   ├── env.ts             # AppEnv
│   ├── docs.ts            # PaletteDoc, UserDoc, SessionDoc, ... (×9)
│   └── api.ts             # request/response types
├── schemas/               # zod schemas (one per resource)
│   ├── palette.ts
│   ├── color.ts
│   ├── user.ts
│   └── admin.ts
├── middleware/
│   ├── cors.ts
│   ├── rate-limit.ts      # consolidates 3 limiters
│   ├── body-limit.ts      # thin wrap
│   ├── sanitize.ts        # $-key guard
│   ├── session.ts         # resolveSession
│   ├── admin-auth.ts
│   └── audit.ts           # auto-audit middleware (replaces audit() helper)
├── services/              # business logic, takes db + ctx
│   ├── palette.ts         # create, update, fork, revert, version
│   ├── vote.ts            # toggle (transactional)
│   ├── user.ts            # register, login, status, delete-cascade
│   ├── color.ts           # propose, approve, reject
│   ├── flag.ts
│   ├── tag.ts
│   └── audit.ts
├── repositories/          # OPTIONAL — typed collection wrappers
│   └── (could be folded into db.collections{})
├── routes/                # thin handlers: parse → service → format → respond
│   ├── palettes.ts        # ~250 LoC target (was 845)
│   ├── palette-versions.ts
│   ├── palette-forks.ts
│   ├── palette-flags.ts
│   ├── sessions.ts
│   ├── colors.ts
│   └── admin/             # split admin/ into 6 files (one per concern §1)
│       ├── colors.ts
│       ├── palettes.ts
│       ├── users.ts
│       ├── batch.ts
│       ├── tags.ts
│       ├── flags.ts
│       └── audit.ts
├── format/                # response shaping
│   ├── palette.ts         # formatPalette (shared by routes + admin)
│   └── pagination.ts      # parsePagination(c) → {limit, offset}
├── color/                 # CSS→OKLab — see §2-W4; ideally re-uses src/units/color
│   └── index.ts
├── hash.ts                # content hash (keep)
├── slug-words.ts          # rename for kebab consistency
└── cron.ts                # cleanup tasks
```

That layout maps cleanly to the directive: encapsulation by domain, service boundaries explicit, DI via context (`c.var.db`, `c.var.services`), pipeline = middleware chain.

---

## §5 Prioritized recommendations for tranche D

### P1 — must do in tranche D backend lane

1. **Excise both god modules** (`palettes.ts` 845 → ≤300 across 4–5 files; `admin.ts` 750 → ≤200 across 6 files). Per §1 breakdown. *Single largest mandate compliance win.*
2. **Extract service layer**. Stop calling `db.collection(...)` in route handlers. Each route handler becomes 5–20 LoC. ~157 direct collection calls → 0 in routes; all in `services/` + `repositories/`. (§3 verdict D → B).
3. **Adopt zod + @hono/zod-validator**. Centralize 15 hand-rolled `req.json<T>()` validations to declarative schemas. Retires §2-W1.
4. **Excise `as any` cast Pattern A** via typed `collections{}` factory in `db.ts`. Retires 24 of 31 `as any` (§2-W5).
5. **Excise legacy ownership fallback** `palette.sessionToken === sessionToken` (§2-F2). Add migration that confirms every palette has `userSlug` and drops the `sessionToken` field from `palettes` at rest.
6. **Excise migration scripts** from `src/` (§2-L1). Move to `api/scripts/migrations-archive/` or delete.
7. **Excise `api/dist/` from git** (§2-L2).
8. **Refresh doc claim "5 collections"** → 9 (§2-L3). Also refresh the index count.

### P2 — should do

9. **Make `audit()` automatic** via middleware that captures `(method, path, user, target)` from the response. Move out of `routes/admin.ts`. (§2-C2)
10. **Vote-toggle transaction** to retire the race-condition swallow (§2-F3).
11. **JSON parse fail-explicit** at `palettes.ts:687` (§2-W2).
12. **Audit-write fail-explicit** with operator-visible log (§2-W3).
13. **Migrate `?? null` defaults out of `formatPalette`** by guaranteeing fields at rest (§2-F1, §2-F7).
14. **Consolidate 3× rate-limiter LRU code** into `createRateLimiter` (§2-C3).
15. **SIGTERM handler** that calls `closeDb()` + stops cron (§2-C4).
16. **Crypto import consistency** (§2-F6).
17. **Pagination helper** `parsePagination(c, defaults)` to retire 11 duplicated `Math.max(1, Math.min(...))` blocks.

### P3 — defer / D+1

18. **Replace embedded `cssToOklab` with library import** (§2-W4 option b) — depends on library prebuild work landing.
19. **Color-distance search pushdown** (§2-F8).
20. **Structured logging layer** (json log lines, request IDs) to replace `console.log` / `console.error`.
21. **Cron job error -> healthcheck signal** (§2-F4).

---

## Appendix: evidence index

| Tag | Evidence (file:line)                                          |
| --- | ------------------------------------------------------------- |
| L1  | `api/src/migrate-oklab.ts:1-84`, `api/src/migrate-slugs.ts:1-73` |
| L2  | `api/dist/` (33 tracked artifacts), `api/.dockerignore:2`       |
| L3  | `api/CLAUDE.md:48`, `api/src/db.ts:21-75` (24 indexes, 9 collections) |
| W1  | `routes/palettes.ts:357-392, 517-548, 813`; `admin.ts:300, 419-440, 479, 517, 582` |
| W2  | `routes/palettes.ts:687`                                       |
| W3  | `routes/admin.ts:23-25`                                        |
| W4  | `routes/palettes.ts:48-104`; duplicate `migrate-oklab.ts:8-45` |
| W5  | 31 grep hits (see §2-W5)                                       |
| F1  | `routes/palettes.ts:18-26` (comment "pre-migration documents") |
| F2  | `routes/palettes.ts:486, 555, 646`                             |
| F3  | `routes/palettes.ts:463-468`                                   |
| F4  | `api/src/index.ts:101-103`                                     |
| F5  | `api/src/db.ts:14-16`                                          |
| F6  | `routes/sessions.ts:13,71`; `routes/admin.ts:280`; `routes/palettes.ts:694` vs `middleware.ts:1`, `slugWords.ts:1`, `hash.ts:1` |
| F7  | `routes/palettes.ts:252, 254, 278, 569-570, 576, 581, 709-710, 719, 727` |
| F8  | `routes/palettes.ts:259-275`                                   |
| C1  | `routes/palettes.ts:11-27` vs `routes/admin.ts:262-265`        |
| C2  | `routes/admin.ts:12-26`                                        |
| C3  | `middleware.ts:107-133, 185-205, 211-231`                      |
| C4  | `api/src/db.ts:81-87`; no SIGTERM handler in `index.ts`        |
