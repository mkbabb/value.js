# D-HARDEN-3 — backend D.W2 depth + Db research fidelity

**Lane**: D-HARDEN-3 (read-only). **Date**: 2026-05-19. **Source**: `docs/tranches/D/research/Db-backend-legacy.md`, `docs/tranches/D/waves/D.W2.md`, `api/src/**`, `api/CLAUDE.md`.
**Mandate**: depth-audit the Db→D.W2 plan fidelity, surface missed concerns, validate architectural transposition. No edits, no git.

---

## §1 — Db → D.W2 cross-walk

Every Db finding mapped to a D.W2 lane.  **Covered?** column: `Y` (named + dispositioned), `P` (partial — named but no explicit closure), `N` (missed).

| Db tag | Subject (file:line) | Db disposition | D.W2 lane | Covered? | Note |
|---|---|---|---|---|---|
| L1   | `migrate-oklab.ts:1-84`, `migrate-slugs.ts:1-73` — orphaned one-shots | EXCISE | D | **Y** | D.W2 §Lane D #3 names "delete `migrate-{oklab,slugs}.ts`" |
| L2   | `api/dist/` 33 artefacts | EXCISE | D | **P** | D.W2 §Lane D #2 says "delete `api/dist/`". **Audit-side correction**: `api/dist/` is **NOT git-tracked** (root `.gitignore:11` excludes `dist/`). `git ls-files api/dist` returns 0. Db L2 was an overclaim. D.W2 Lane D should be re-scoped to *verify gitignore* + `rm -rf api/dist/` from on-disk noise; no `git rm` required. |
| L3   | `api/CLAUDE.md` claims 5 collections / 11 indexes — reality 9 / 24 | EXCISE stale docs | D | **Y** | D.W2 §Lane D #4 explicit. **Confirmed today**: `api/CLAUDE.md:25,49` still says 11 indexes / 5 collections. |
| W1   | 15 hand-rolled `req.json<T>()` validators; slug regex duplicated 3×; enum lists hand-coded | EXTRACT zod | C | **Y** | D.W2 §Lane C #4 names `validation/**` zod. |
| W2   | `palettes.ts:687` fork — `req.json().catch(() => ({...}))` silent | FAIL-EXPLICIT | D | **Y** | D.W2 §Lane D #1.W2 |
| W3   | `admin.ts:23-25` audit-write silent catch | FAIL-EXPLICIT or operator-visible | D | **Y** | D.W2 §Lane D #1.W3 |
| W4   | `palettes.ts:48-104` `cssToOklab` returns-null-then-drop | EXTRACT (use library) + FAIL-EXPLICIT | D | **P** | D.W2 names "fail-explicit at validation boundary" but **does not** name the "import the library" half. Db §2-W4 option-b was the substantive recommendation — without it, the validation will reject every `oklch()`/`hsl()`/`color()` palette the demo currently accepts. **Amendment: explicitly name library-import OR document acceptance of the breakage.** |
| W5   | 31 `as any` casts — pattern A `{_id: x as any}` (24×); pattern B (7×) | EXTRACT typed collections | C | **Y** | D.W2 §Lane C #1 typed `collections{}`; §sub-gate-C "`grep -rn 'as any' api/src/` returns zero (or each remaining ≤ 5 with rationale)" |
| F1   | `palettes.ts:18-26` pre-migration `?? null` defaults | FAIL-EXPLICIT via migration + excise | D | **P** | D.W2 §Lane D #1.F1 names the excise. **Missing**: the migration *script* that ensures every doc has the 7 fields. Db said "run a one-shot `$set` migration"; D.W2 says "the migration is done" — but **provides no evidence**. Without the migration script run + a smoke probe ("`db.palettes.countDocuments({tags: {$exists:false}})` = 0"), excising the `??` is a regression. **Amendment: name the migration smoke probe in the Lane D gate.** |
| F2   | `palettes.ts:486, 555, 646` `sessionToken === sessionToken` half-shim | EXCISE + extract `assertOwnership` | D | **Y** | D.W2 §Lane D #1.F2; helper `assertOwnership` not named but implied by service layer |
| F3   | `palettes.ts:463-468` vote-toggle race swallow | FAIL-EXPLICIT + transaction | D | **P** | D.W2 §Lane D #1.F3 names "optimistic-write + explicit conflict error". But Db §F3 specifically called for *MongoDB transaction* (find + insert + $inc). **Amendment: pick one** — optimistic-write is correct but the *commit plan* should name the chosen pattern (transaction vs upsert vs idempotent-key) and the test must exercise concurrent toggles. |
| F4   | `index.ts:101-103` cron error fire-and-forget | KEEP for D, defer | — | **Y** | Db said defer; D.W2 silent (correct — deferral) |
| F5   | `db.ts:14-16` `MONGODB_URI not set` dev warn | KEEP — befitting graceful | — | **Y** | Db marked KEEP; D.W2 silent (correct) |
| F6   | bare `crypto.randomUUID()` w/o import vs `node:crypto` import | FAIL-EXPLICIT consistency | — | **N** | **Missed by D.W2 entirely.** No lane references the crypto import inconsistency. Sites: `sessions.ts:13,71`, `admin.ts:280`, `palettes.ts:694`. Trivial fix; should land in Lane D or a separate Lane D sweep. |
| F7   | `palettes.ts:252,254,278,…` `?.` / `??` defensive in pagination | bundle with F1 | D | **Y** | D.W2 sub-gate `grep -rn '?? null\|console\.warn\b'` enforces it |
| F8   | `palettes.ts:259-275` color-distance after pagination | DEFER (architectural) | — | **Y** | Db deferred to D+1; D.W2 silent (correct) |
| C1   | `formatPalette` not reused by admin (`admin.ts:262-265`) | EXTRACT shared formatter | A/B/C | **P** | D.W2 §Lane A names "thin routes → validate → service → response shape" implying a shared formatter. **Amendment: name a `format/palette.ts` location** — without it Lanes A and B will each re-implement the formatter, undoing C1. |
| C2   | `audit()` lives in `routes/admin.ts:12-26`, not a service | EXTRACT to service or middleware | B/D | **P** | D.W2 §Lane B says "audit route should NOT silently catch failures" but does not name the *relocation* of `audit()` out of the route file. Db §C2 strongly preferred middleware-form. **Amendment: name `services/audit.ts` OR `middleware/audit.ts` as the home; recommend middleware (auto-records from response shape).** |
| C3   | `middleware.ts:107-133, 185-205, 211-231` 3× rate-limiter LRU eviction duplicated | EXTRACT into `createRateLimiter.check()` | — | **N** | **Missed by D.W2.** Three 12-line eviction blocks remain. Not a god-module concern, but a P2 directive ("better encapsulation") item. **Amendment: add to Lane D or open a Lane E.** |
| C4   | `db.ts:81-87` `closeDb` never called from runtime | FAIL-EXPLICIT — add SIGTERM | — | **N** | **Missed by D.W2.** Db named this as a "fail-explicit" item; D.W2 has no SIGTERM/graceful-shutdown deliverable. **Amendment: add to Lane D, sub-gate "`index.ts` registers SIGTERM/SIGINT that calls `closeDb()` + stops cron".** |

**Coverage tally**: 19 Db findings. **Y = 9, P = 6, N = 4.** Coverage rate ~47% fully-named, ~79% at-least-partial; **4 misses (F6, C3, C4, and the migration-evidence gap noted under F1)**.

### Cross-walk — anything in D.W2 NOT grounded in Db?

- D.W2 Lane C names a `validation/**` directory; Db §4 named `schemas/` (cosmetic; pick one and pin).
- D.W2 Lane C names a `db/collections.ts` factory; Db §2-W5 named `api/src/db.ts` as the host (the factory inline in db.ts). Both are valid; the `db/collections.ts` separation is *better* (Db's verdict §4 supports it).
- D.W2 Lane C #2 lists **`color_names, color_proposals`** as repositories. **Defect**: the actual collection is **`proposed_names`** (singular collection, two distinct status-filters). D.W2's enumeration is **(a)** wrong (two non-existent collection names) and **(b)** missing `votes`. Real list: `palettes, palette_versions, votes, sessions, proposed_names, users, tags, flags, admin_audit` (9). **Amendment: fix repository enumeration.**

---

## §2 — Architectural transposition assessment

### §2.1 Service vs repository grain

**D.W2 pattern**: repository-per-collection (1:1 with Mongo collections); service-per-concern (CRUD/versions/forks/votes/export/slug under `services/palette/**`).

**Verdict**: **correct for this scale** with one caveat.

- Repository-per-collection is the right granularity here. The alternative — repository-per-aggregate-root — would collapse `palette + palette_versions + votes + flags` into a `PaletteRepository`. That's the DDD-canonical answer for a domain with strong invariants, but this codebase doesn't have those invariants and the collections are queried independently (the admin tooling pages each collection separately). Aggregate-root grouping would force every admin tool through the palette aggregate and lose the type-clean per-collection queries.
- **Caveat**: a few cross-collection operations (`deleteUser` cascades to palettes/votes/flags/sessions, per `admin.ts:331-340`) **straddle** repository boundaries. These must live in a service that calls multiple repositories — not in any one repository. D.W2 doesn't name this; it should.

**Service grain**: D.W2 does not distinguish *application* services (request-scoped, orchestrate repositories + cross-cutting concerns) from *domain* services (stateless business rules). At this scale the distinction is overkill — a single service tier is fine. **Pin in the doc that `services/**` are application services** (orchestrate, not stateless rules) so future agents don't introduce DDD layering.

### §2.2 DI pattern

**D.W2 silent on DI mechanism.** Three options, ordered by Hono-idiomatic-gestalt:

1. **Hono context (`c.var`) middleware** — `app.use("*", async (c, next) => { c.set("services", buildServices(await getDb())); await next(); })`. Services constructed once per request (or cached); accessed via `c.var.services.palette.create(...)` in routes. **Idiomatic for Hono.** Request-scoped, mockable, no module-level singletons in routes.
2. **Module-level factory + closure** — `services/palette.ts` exports `createPaletteService(repos)`; bootstrap composes once at app init. Simpler but ties service lifetime to app lifetime (loses request-scoping for things like `c.var.userSlug`).
3. **Constructor injection via class** — typical OO; over-engineered for Hono.

**Recommendation: option 1 (Hono context middleware).** This matches `c.set("sessionToken", ...)` (`middleware.ts:152`) and `c.set("userSlug", ...)` (`middleware.ts:176`) already established. Pin it in D.W2 Lane C as the DI mechanism + add `c.var.services`/`c.var.repos` to `AppEnv` in `types.ts`.

### §2.3 Request → service mapping

**D.W2 silent on where the mapping happens.** Recommendation: **in the route handler itself** — that is the controller in Hono. Route handlers stay thin (5–20 LoC); they do:

```ts
palettes.post("/", zValidator("json", PaletteCreate), async (c) => {
  const input = c.req.valid("json");
  const result = await c.var.services.palette.create(input, { userSlug: c.var.userSlug });
  return c.json(formatPalette(result), 201);
});
```

No separate `controllers/` directory — Hono routes ARE the controllers. **Pin in D.W2 Lane C.**

### §2.4 Pipeline shape

**D.W2 names**: `validate → authn → authz → service → repository → response`. This is correct for read paths and single-collection writes.

**Missing**: transactional boundary. The pipeline as written has no explicit point where multi-collection writes coordinate. Examples currently in the code:

- `admin.ts:324-344` `DELETE /users/:slug` — writes to `palettes`, `votes`, `flags`, `sessions`, `users` (5 collections). Currently sequential `await`s; any failure mid-way leaves the DB in a partial-delete state.
- `palettes.ts:705-734` fork — writes to `palettes`, `palette_versions`, parent `palettes` ($inc forkCount). Same partial-state risk.
- `palettes.ts:458-469` vote-toggle (Db F3) — writes to `votes` + `palettes`. Db named this for *transactions* explicitly.

**Recommendation**: pin a **transactional boundary at the service layer**. Two options:
- **MongoDB sessions/transactions** — `client.startSession()` + `session.withTransaction(...)`. Requires replica set or load balancer; Docker single-node may need config check.
- **Saga / compensating writes** — write log → apply → on failure run compensations. Heavyweight; skip.
- **Idempotent + retry** — for the vote-toggle case, an upsert pattern (`findOneAndUpdate({_id: voteId}, ..., {upsert:true})`) avoids the race entirely without a transaction.

**Pipeline amendment**: `validate → authn → authz → service [→ tx-begin] → repository(s) [→ tx-commit] → response`. The `tx-begin` is opt-in per service method, decorated by the service (not exposed to routes).

### §2.5 Audit-log emit point

D.W2 Lane B says "the `admin-audit` route in particular should NOT silently catch write failures". But the **emit point** is not pinned. Current code calls `audit(c, "delete-user", ...)` after each admin op (`admin.ts:342`). This is fragile (caller-driven, easy to forget — `admin.ts:386` requires manual `count=0` audit on empty-pruned).

**Recommendation**: convert to **post-response middleware** that emits an `AdminAction` event from the response shape + route metadata. Pin as `middleware/audit.ts` + `events/admin-action.ts`. Db §C2 named this. D.W2 omits the event-emit mechanism.

### §2.6 Architectural verdict

- Service/repo grain: **B+** (correct shape; missing cross-collection-service note + application-vs-domain pin)
- DI pattern: **D** (unspecified) → must promote to **B** by pinning Hono-context-middleware
- Request→service mapping: **D** (unspecified) → must promote to **B** by pinning route-as-controller
- Pipeline: **C** (correct as far as it goes; missing transactional boundary + audit-event emit)
- Overall transposition: **C+**. The lane *outline* is correct; the *mechanism* is under-specified.

---

## §3 — Fail-explicit depth — per silent-fallback site

For each of the 6 silent-fallback sites Db named, defend the D.W2 disposition.

### F1 — `formatPalette` pre-migration defaults (`palettes.ts:18-26`)

D.W2 disposition: **excise + make missing fields explicit errors / schema-asserted non-null**.

**Defense**: correct disposition; **incomplete plan**. The `??` excise depends on every existing doc having the 7 fields at rest. D.W2 §Lane D says "the migration is done" but provides no evidence. The migration in `migrate-oklab.ts` is the *only* one in the repo and it only backfills `oklabColors`. The other 6 fields (`tags`, `versionCount`, `forkCount`, `forkOf`, `forkOfHash`, `currentHash`) have no migration script. **Either**:
- (a) Run a one-shot `db.palettes.updateMany({tags: {$exists:false}}, {$set: {tags: []}})` etc. per field, OR
- (b) Assert at read-time: throw `PreMigrationDocumentError` and catch at the route boundary with a 500 + ops alert.

(a) is better; (b) trades a silent fallback for a noisy crash. **Verdict: D.W2 should name the migration smoke probe** (`db.palettes.countDocuments({$or: [{tags:{$exists:false}}, {versionCount:{$exists:false}}, ...]}) == 0`).

### F2 — `sessionToken === sessionToken` ownership shim (`palettes.ts:486, 555, 646`)

D.W2 disposition: **excise the half-shim; ownership = explicit owner field**.

**Defense**: correct. Post-`migrate-slugs`, every palette has `userSlug`. Extract `assertOwnership(palette, c)` helper into `services/palette/ownership.ts` or a `middleware/require-ownership.ts`. The latter is more Hono-idiomatic — `palettes.patch("/:slug", requireOwnership("palette"), handler)`.

**Verdict: keep disposition. Pin the location** (service helper or middleware). Add a smoke probe: `db.palettes.countDocuments({userSlug: {$exists:false}}) == 0`.

### F3 — vote-toggle race swallow (`palettes.ts:463-468`)

D.W2 disposition: **optimistic-write + explicit conflict error**.

**Defense**: this is a *change* from Db's recommendation (Db said "single MongoDB transaction"). Optimistic-write means: try insert; on duplicate-key, return 409 to client. That's a valid disposition but it **changes the client contract** — the demo currently expects vote-toggle to be idempotent (re-clicking already-voted = unvote). The current swallow-and-return-true is actually preserving idempotency.

**Verdict**: D.W2's "optimistic-write + 409" is **wrong** for this endpoint's semantics. The endpoint is "toggle". Three viable patterns:
- **Idempotent upsert**: `findOneAndUpdate({userSlug, paletteSlug: slug}, {$setOnInsert: {...}}, {upsert: true})` returns null-or-doc; null means insert happened; doc means already voted. No race.
- **Transaction with explicit toggle semantics**: read state → compute desired-state → conditional write.
- **Atomic delete-or-insert**: try `findOneAndDelete({userSlug, paletteSlug})`; if null, `insertOne({...})`. Already 90% the current code (`palettes.ts:450-461`); the race is in the catch.

**Recommendation**: use idempotent upsert. The current `try { insertOne } catch (11000) { return voted:true }` is actually correct under concurrency (the dup-key means a parallel insert already happened — voted:true is the truth); the **real bug** is the `$inc voteCount` not being conditional on insert success. Fix: switch order to `votes.insertOne` first; only if `acknowledged && !duplicate`, run `palettes.updateOne $inc`. **Amendment: D.W2's wording "optimistic-write + 409" should be revised to "idempotent upsert; voteCount $inc gated on insert".**

### W2 — JSON-parse silent fallback (`palettes.ts:687`)

D.W2 disposition: **fail-explicit (400 invalid body)**.

**Defense**: correct. Both fields (`name`, `slug`) are optional, so `{}` is a legal body. The fix: don't `.catch(() => ...)`; let the body-parse error propagate to the Hono error handler which returns 400. zod's `safeParse` with an empty-object default handles this cleanly: `const body = await c.req.json().catch(() => undefined); const input = ForkBody.safeParse(body ?? {});`.

**Verdict: keep disposition.**

### W3 — audit-write silent catch (`admin.ts:23-25`)

D.W2 disposition: **audit writes NOT best-effort; if they fail, the request fails OR audit failure is logged with structured context AND the rationale is recorded inline**.

**Defense**: D.W2 offers a fork (fail OR log+rationale). Db §W3 split it the same way. **The two outcomes have different consequences**:
- If audit-write failure fails the request: an admin user runs `delete-user`, the delete *succeeds* in `users`/`palettes`/`votes`/`flags`/`sessions`, but the audit insert fails → request returns 500 → admin thinks the delete failed → retries → audit shows two deletes (or now-orphaned cascade). **Bad.**
- If audit-write failure logs + 200s: an admin op is unaudited. Comparable to current behavior, but with operator visibility.

**Recommendation**: **option (b)** — log + rationale + structured event. The audit log itself is a best-effort observability layer; making the request fail when audit fails inverts the priority. Add a `console.error("[audit] write failed:", {action, target, err: err.message})` so it surfaces in Docker logs. **Amendment: D.W2 should pin option (b).**

### W4 — `cssToOklab` returns-null-then-drop (`palettes.ts:48-104`)

D.W2 disposition: **fail-explicit at the validation boundary**.

**Defense**: this is a *partial* response. Db §W4 named two halves:
- (a) fail-explicit on unparseable CSS (D.W2 names this)
- (b) replace the embedded 47-line `cssToOklab` with the library's CSS parser (D.W2 silent)

Without (b), every palette using `oklch()`, `hsl()`, `color(display-p3)`, named colors, or CSS variables will now be **rejected** (current: silently stored with empty `oklabColors`). That's a **client-visible breaking change**. The demo passes `oklch()` through to the API today (every palette saved via the picker is an oklch string).

**Verdict**: D.W2 must name **one** of:
- (a-only) accept the breaking change → demo must convert all color strings to hex/rgb pre-save (forced client change).
- (b) import the library → defer to D+1 since library prebuild is a tranche-B-open dependency.
- (c) keep `cssToOklab` for the non-hex/rgb subset and explicit-error otherwise — *current behavior + an error code* — least useful.

**Recommendation: (b) or defer F-W4 explicitly to D+1.** D.W2 as written assumes (a) which is a silent breaking-change disposition. **Amendment.**

### Summary of fail-explicit depth verdict

| Site | D.W2 disposition | Correct? | Amendment |
|---|---|---|---|
| F1 | Excise + missing-field explicit error | Partial | Name the migration smoke probe |
| F2 | Excise; explicit owner field | Yes | Pin location (`middleware/require-ownership.ts`) |
| F3 | Optimistic-write + 409 | **Wrong** | Revise to "idempotent upsert; voteCount gated on insert" |
| W2 | Fail-explicit 400 | Yes | OK |
| W3 | Fail OR log+rationale (fork) | Partial | Pin option (b): log + rationale, don't fail |
| W4 | Fail-explicit at validation | Partial | Add library-import OR explicit defer to D+1 |

**Befitting graceful?** None of the 6 are "befitting graceful". F5 (`MONGODB_URI not set` dev warn) is the only befitting-graceful site in the codebase; both Db and D.W2 leave it untouched (correct).

---

## §4 — Post-split `api/src/` tree sketch

Combining D.W2 prose with Db §4 + amendments from §2 of this audit:

```
api/src/
├── index.ts                # app bootstrap; SIGTERM handler (closeDb + cron.stop) — C4
├── app.ts                  # Hono app composition (extracted from index.ts for testability)
├── env.ts                  # validateEnv() — single env-read site
├── types/
│   ├── env.ts              # AppEnv (sessionToken, userSlug, services, repos)
│   ├── docs.ts             # PaletteDoc, UserDoc, SessionDoc, … ×9
│   └── api.ts              # request/response types
├── db/
│   ├── index.ts            # getDb() singleton + closeDb()
│   └── collections.ts      # typed Collection<T> factory — W5 pattern A retired
├── repositories/           # one per collection (9) — NO `db.collection()` outside this dir
│   ├── palette.ts
│   ├── palette-versions.ts
│   ├── votes.ts            # — missing from D.W2's list
│   ├── users.ts
│   ├── sessions.ts
│   ├── proposed-names.ts   # — D.W2 wrongly named color_names + color_proposals
│   ├── tags.ts
│   ├── flags.ts
│   └── admin-audit.ts
├── services/               # application services — orchestrate, not pure-domain
│   ├── palette/
│   │   ├── crud.ts
│   │   ├── versions.ts
│   │   ├── forks.ts        # cross-repo (palette + palette-versions)
│   │   ├── votes.ts        # idempotent upsert; voteCount gated on insert
│   │   └── ownership.ts    # assertOwnership helper — F2
│   ├── admin/
│   │   ├── colors.ts       # proposed-names CRUD
│   │   ├── palettes.ts     # moderation
│   │   ├── users.ts        # cross-repo cascades
│   │   ├── batch.ts
│   │   ├── tags.ts
│   │   ├── flags.ts
│   │   └── audit.ts        # audit-log emit
│   ├── color/              # if library-import lands: cssToOklab from value.js
│   └── session.ts
├── validation/             # zod schemas — W1
│   ├── palette.ts
│   ├── color.ts
│   ├── user.ts
│   ├── admin.ts
│   └── primitives.ts       # Slug, Tag, HexColor, BatchAction
├── middleware/
│   ├── cors.ts
│   ├── rate-limit.ts       # consolidates 3 LRU eviction blocks — C3
│   ├── body-limit.ts
│   ├── sanitize.ts
│   ├── session.ts          # resolveSession
│   ├── admin-auth.ts
│   ├── require-ownership.ts  # F2
│   ├── inject-services.ts  # DI: c.set("services", …) per request
│   └── audit.ts            # post-response audit emit — C2
├── routes/                 # thin controllers — Hono routers
│   ├── palettes/
│   │   ├── index.ts        # mounts sub-routes
│   │   ├── crud.ts
│   │   ├── versions.ts
│   │   ├── forks.ts
│   │   ├── votes.ts
│   │   ├── export.ts
│   │   └── slug.ts
│   ├── admin/
│   │   ├── index.ts
│   │   ├── colors.ts
│   │   ├── palettes.ts
│   │   ├── users.ts
│   │   ├── batch.ts
│   │   ├── tags.ts
│   │   ├── flags.ts
│   │   └── audit.ts
│   ├── sessions.ts
│   └── colors.ts
├── format/
│   ├── palette.ts          # shared formatPalette — C1
│   └── pagination.ts       # parsePagination(c, defaults)
├── errors/                 # MISSING from D.W2 — typed error classes
│   ├── index.ts            # AppError base, toResponse(err): Response
│   ├── validation.ts       # ValidationError → 400
│   ├── auth.ts             # UnauthorizedError → 401, ForbiddenError → 403
│   ├── not-found.ts        # NotFoundError → 404
│   ├── conflict.ts         # ConflictError → 409 (dup-key)
│   └── pre-migration.ts    # PreMigrationDocumentError → 500 — F1 enforcement
├── events/                 # MISSING from D.W2 — domain events (audit emit)
│   └── admin-action.ts     # AdminActionEvent shape; published from audit middleware
├── hash.ts                 # content hash (keep)
├── slug-words.ts           # rename for kebab consistency
├── cron.ts                 # cleanup tasks
└── (deleted)               # migrate-oklab.ts, migrate-slugs.ts → scripts/migrations-archive/
```

**Drift from D.W2's outline**:
1. D.W2 has no `errors/` directory. Recommended: add one for typed error classes + a `toResponse()` mapper so service-thrown errors land as proper HTTP responses without ad-hoc `c.json({...}, 4xx)` repetition.
2. D.W2 has no `events/` directory. Recommended: add for the audit-emit decoupling (C2).
3. D.W2 has no `middleware/inject-services.ts` (or equivalent). **Required** for DI per §2.2.
4. D.W2 has no `middleware/require-ownership.ts`. **Required** for F2 cleanup per §3.
5. D.W2 has no `format/` or names it inside services. Db §4 had it; keeping it separate prevents Lanes A and B re-implementing the formatter (C1).
6. D.W2 has no `db/collections.ts` extraction (it's named but the directory split isn't pinned).
7. D.W2 repository list **is wrong**: it names `color_names` + `color_proposals` (non-existent collections) and omits `votes`. Real list per `api/src/db.ts:21-75` and grep of `db.collection("…")`: 9 collections — `palettes, palette_versions, votes, sessions, proposed_names, users, tags, flags, admin_audit`.
8. D.W2 says `validation/` but Db said `schemas/`. Cosmetic; pin one.

---

## §5 — Worktree isolation + missed concerns + recommended amendments

### §5.1 Worktree isolation (Lanes A + B)

**D.W2 says**: A and B share `api/src/routes/` namespace and need worktree isolation.

**Verdict**: correct call. Both lanes delete `api/src/routes/{palettes,admin}.ts` AND create directories at `routes/palettes/**` and `routes/admin/**`. Even though the directories are disjoint, the *parent file deletions* and the `app.route("/palettes", palettes)` / `app.route("/admin", admin)` mount-point changes in `index.ts` would collide. Worktree isolation is the right discipline.

**However**: Lanes A and B *both* depend on Lane C's repository layer to write services that don't call `db.collection(...)`. D.W2 §file-bounds says "services/palette/** (new — partial; full wiring after Lane C)". This is a sequencing trap. **Recommendation**: pin the order — **Lane C first** (lays down `db/collections.ts` + `repositories/**` + `validation/**`), then **Lane A + Lane B in parallel** (each consume Lane C's layer), then **Lane D** (legacy excision on the post-split tree). The current D.W2 order (A/B first, then C, then D) means A/B will write services that call `getDb().collection(...)` and then Lane C has to rewrite them. **Re-order: C → (A ‖ B) → D.**

### §5.2 Chronically-deferred from Db — verification

Db's "ancillaries" that should NOT slip:
- **No zod** — D.W2 Lane C covers (W1).
- **31 `as any`** — D.W2 Lane C sub-gate covers (W5).
- **Audit-write silent catch** — D.W2 Lane D covers (W3).
- **Migration scripts in `src/`** — D.W2 Lane D covers (L1).
- **`api/dist/` tracked** — D.W2 Lane D covers, but the premise is wrong (see L2 row in §1).
- **Doc drift "5 collections"** — D.W2 Lane D covers (L3).
- **Inconsistent crypto import (F6)** — **slipped**. Not named in D.W2.
- **Rate-limiter LRU duplication (C3)** — **slipped**.
- **`closeDb` never called / no SIGTERM (C4)** — **slipped**.
- **`formatPalette` not shared (C1)** — **partially slipped** (named in Lane A prose but no formatter location).
- **`audit()` not a service (C2)** — **partially slipped** (Lane B mentions audit but doesn't name relocation).

### §5.3 Missed concerns + recommended D.W2 amendments

**Missed concerns (10)**:

1. **F6 crypto import inconsistency** — 4 sites use bare `crypto.randomUUID()`. Trivial; add to Lane D.
2. **C3 rate-limiter LRU triplication** — 36 LoC across 3 middleware. Add to Lane D OR as part of Lane C's middleware refactor.
3. **C4 SIGTERM/closeDb** — no graceful shutdown. Add to Lane D.
4. **Repository list defect** — D.W2 names `color_names`/`color_proposals` (non-existent) and omits `votes`. Fix the enumeration.
5. **DI mechanism unspecified** — pin Hono-context-middleware in Lane C.
6. **Request→service mapping unspecified** — pin route-as-controller in Lane C.
7. **Transactional boundary unspecified** — pin per-method opt-in via `client.startSession()` + `withTransaction` in Lane C.
8. **Audit-emit mechanism unspecified** — pin post-response middleware + `events/admin-action.ts` in Lane B.
9. **`errors/` directory missing** — typed error classes + `toResponse()` mapper. Add to Lane C structure.
10. **L2 premise wrong** — `api/dist/` is not git-tracked. Re-scope Lane D #2 from "delete from git" to "verify gitignore + clean local artifacts".

**Disposition errors (3)**:

11. **F3 vote-toggle** — "optimistic-write + 409" changes semantics from toggle to one-shot. Revise to "idempotent upsert; voteCount $inc gated on insert".
12. **W4 cssToOklab** — Lane D's "fail-explicit at validation" assumes a breaking change. Either name library-import (option-b) OR explicitly defer F-W4 to D+1.
13. **W3 audit-write** — "fail-OR-log" fork should pin "log + rationale + don't fail the request" (failing the request inverts the priority).

**Process amendments (2)**:

14. **Lane order: C → (A ‖ B) → D** instead of (A ‖ B) → C → D. A/B without C will write services that call `db.collection(...)` and have to be rewritten.
15. **F1 migration evidence** — Lane D needs a smoke probe (`db.palettes.countDocuments({tags:{$exists:false}}) == 0` etc.) before excising the `?? null` defaults.

**Total recommended D.W2 amendments: 15.**

---

## Appendix — citations

- `api/src/db.ts:21-75` — 24 indexes / 9 collections (confirms Db L3 finding; `api/CLAUDE.md:25,49` claims 11/5)
- `api/src/routes/palettes.ts:11-27` `formatPalette` w/ pre-migration defaults (F1)
- `api/src/routes/palettes.ts:48-104` `cssToOklab` (W4)
- `api/src/routes/palettes.ts:486, 555, 646` ownership shim (F2)
- `api/src/routes/palettes.ts:463-469` vote-toggle race (F3)
- `api/src/routes/palettes.ts:687` JSON-parse fallback (W2)
- `api/src/routes/palettes.ts:694` `crypto.randomUUID()` bare (F6)
- `api/src/routes/admin.ts:12-26` `audit()` helper in route file (C2 + W3)
- `api/src/routes/admin.ts:280` `crypto.randomUUID()` bare (F6)
- `api/src/routes/admin.ts:331-340` cross-collection cascade (transactional boundary)
- `api/src/routes/sessions.ts:13,71` `crypto.randomUUID()` bare (F6)
- `api/src/middleware.ts:107-133, 185-205, 211-231` LRU eviction triplication (C3)
- `api/src/middleware.ts:152, 176` `c.set` precedent for DI middleware pattern
- `api/src/db.ts:81-87` `closeDb` exported but unused (C4)
- `api/src/index.ts:101-103` cron fire-and-forget (F4 — KEEP)
- `api/src/migrate-oklab.ts:1-84`, `api/src/migrate-slugs.ts:1-73` (L1)
- root `.gitignore:11` `dist/` (covers `api/dist/`; refutes Db L2 "tracked artifacts")
- `git ls-files api/dist` returns 0 (refutes Db L2)
- `docs/tranches/D/waves/D.W2.md:36` lists `color_names, color_proposals` (non-existent collections)
- `docs/tranches/D/research/Db-backend-legacy.md` §1–§5 (the source)
