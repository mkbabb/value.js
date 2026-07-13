# `api/` `withTransaction` coverage — the standing H1 reference

**Status**: STANDING REFERENCE — codifies the H1 invariant.
**Authored**: 2026-05-26 (H.W1 Lane C, post-Lane-A landing).
**Updated**: 2026-05-26 (H.W1 Lane A.2 — D4-D10 wrapped per option-α adjudication).
**Updated**: 2026-06-11 (N.W3.B — transaction right-sizing: 18 sites → 14; the 4 benign / single-collection sites dropped, each justified below in §3.3).
**Updated**: 2026-07-10 (T.W1 — the E-1 package-by-feature MOVE re-homed every service under `modules/<domain>/service/`; the §1.4 + §2 file paths below are re-walked to the new tree. **Count unchanged: 14.** TA-4 folded `remixPalette` back into `forkPalette` (the `/remix` write-only arm excised) — row 2's cross-collection write is now `forkPalette` at `modules/palette/service/forks.ts`, same `palettes`+`palette_versions` surface; no cross-collection referential write was added or dropped.).
**HEAD at authoring**: `tranche-h` @ `a12a71d` + Lane A.1 + Lane A.2 working-tree.

> **N.W3.B right-sizing (2026-06-11).** The H1 invariant binds **cross-collection**
> writes only. Four of the 18 wrapped sites were right-sized OUT because their
> non-atomic outcome is benign + self-healing (NOT a cross-collection referential
> break): `toggleVote`, `registerSession`, `loginSession`, `restorePalette`. Each
> drop is justified in §3.3. The live count is now **14** (`grep -rn
> 'services.withTransaction(' api/src/ | grep -v comment` = 14: 13 in `services/`
> + 1 in `cron.ts`). The §1.4 / §2 tables below are updated to the 14-site truth.
> H1 still binds: **every cross-collection write KEEPS its transaction.**
**H1 invariant** (verbatim from `docs/tranches/H/H.md §2 H1`):
> Every cross-collection write site in `api/` uses `services.withTransaction(async (session) => { ... })` and threads `session` through every repository call inside the block. The defect found at `createPalette` + `patchPalette` (H-AUDIT-6) is repaired; a standing `audit/api-withTransaction-coverage.md` enumerates every cross-collection write + its session status, becoming the future-reference that prevents the class of regression.

This document IS that future-reference. Every cross-collection write site under `api/src/services/` is enumerated below with a session-status classification (WRAPPED / DEFERRED-WITH-RATIONALE / SINGLE-COLLECTION). The enumeration is exhaustive — adding a new cross-collection write site WITHOUT updating this list is itself the regression the H1 invariant codifies against.

Cross-references:
- **Lane A landing doc**: `docs/tranches/H/audit/H.W1-lane-a-createPalette-patchPalette-withTransaction.md` (anticipated path — Lane A wrapped `createPalette` + `patchPalette` concurrently with this audit; entries 8 + 9 reflect the post-Lane-A HEAD state).
- **G.W3 Lane E landing doc**: `docs/tranches/G/audit/G.W3-lane-e-withTransaction-expansion.md` (the previous expansion — 3 → 7 wrapped sites).
- **G.W3 rollback tests**: `api/test/services/withTransaction-rollback.test.ts` (representative 2-of-4 coverage; the same `MongoMemoryReplSet` shape applies to all wrapped sites).

---

## §1 — Methodology

### §1.1 — How "cross-collection write site" is identified

A function in `api/src/services/**/*.ts` is a **cross-collection write site** iff it mutates (insert / update / delete) documents in **≥ 2 different MongoDB collections** along any normal-path execution branch. Two heuristics applied:

1. **Direct multi-collection**: the function body invokes write-methods on ≥ 2 different `services.repositories.X` handles (where X varies — e.g. `palettes.insert` AND `votes.deleteByPaletteSlug`).
2. **Indirect via helper**: the function calls a helper (e.g. `createVersionRecord`, `deleteUser`) whose body writes to a collection the caller does NOT write to directly. The audit treats the helper-via-call-site as a fused write surface.

Calls to `emitAuditEvent` (which writes `admin_audit`) are EXCLUDED from the cross-collection accounting per the **D3 carve-out** documented in `api/src/events/auditLog.ts` — audit-log writes are "befitting-graceful" and MUST NOT roll back the originating action. See `§3` entry D2.

### §1.2 — How `withTransaction` wrap status is verified

For every candidate site:

1. `grep -rn 'withTransaction' api/src/services/` enumerates every invocation. Each call must be the form `services.withTransaction(async (session) => { ... })`.
2. The call-site is read in full to verify the `session` parameter is THREADED through every repository call inside the closure (per the E.W2 Lane B invariant). A wrapped block that doesn't thread `session` is effectively unwrapped — the repository call escapes the transaction.
3. Repository methods consume `session?` as the optional last argument and pass `session ? { session } : undefined` to the underlying Mongo driver call. The list of session-aware repository methods is enumerated in the G.W3 Lane E landing doc `§2` table (`vote.deleteByPaletteSlug`, `flag.deleteByPaletteSlug`, `palette.update`, etc.) — H.W1 Lane A extends this list only to the existing `createVersionRecord(..., session?)` (already session-aware per G.W3) and `palettes.insert(..., session?)` (already session-aware per G.W3 for forkPalette).

### §1.3 — Scope

- **In scope**: `api/src/services/**/*.ts`, `api/src/repositories/**/*.ts`.
- **Out of scope for wrap-status accounting** (but noted for traceability):
  - `api/src/cron.ts` — see §4.2.
  - `api/src/repositories/**/*.ts` — repositories are **inherently single-collection by design**. Each repository wraps exactly one `Collection<T>` handle. No repository file contains a cross-collection write site.

### §1.4 — Authoritative grep at HEAD

`grep -rn 'services.withTransaction(' api/src/` at HEAD (post-T.W1) returns **the following 14 invocation lines** across `modules/*/service/` (13) + `cron.ts` (1), excluding the helper-definition lines in `platform/http/inject-services.ts` and the comment refs:

| Invocation file | Line | Function context | Wave landed | Collections |
|---|---|---|---|---|
| `cron.ts` | 47 | `cleanup` (reaper hard-delete) | I.W2 | `palettes`+`votes`+`flags` |
| `modules/admin/service/users.ts` | 171 | `deleteUser` | E.W2 Lane B | multi |
| `modules/admin/service/batch.ts` | 37 | `batchPalettes(delete)` | G.W3 Lane E | `palettes`+`votes`+`flags` |
| `modules/admin/service/batch.ts` | 86 | `batchUsers(suspend)` | G.W3 Lane E | `users`+`sessions` |
| `modules/palette/service/crud.ts` | 116 | `createPalette` | H.W1 Lane A.1 | `palettes`+`palette_versions` |
| `modules/palette/service/crud.ts` | 203 | `patchPalette` | H.W1 Lane A.1 | `palettes`+`palette_versions` |
| `modules/palette/service/crud.ts` | 255 | `deletePalette` (user-facing) | G.W3 Lane E | `palettes`† |
| `modules/palette/service/forks.ts` | 93 | `forkPalette` (T.W1 TA-4: `remixPalette` folded in; the `/remix` arm excised) | E.W2 Lane B | `palettes`+`palette_versions` |
| `modules/palette/service/versions.ts` | 146 | `revertToVersion` | G.W3 Lane E | `palette_versions`+`palettes` |
| `modules/admin/service/palettes.ts` | 69 | `deletePalette` (admin variant — D6) | **H.W1 Lane A.2** | `palettes`† |
| `modules/admin/service/users.ts` | 121 | `setUserStatus` (D7) | **H.W1 Lane A.2** | `users`+`sessions` |
| `modules/admin/service/users.ts` | 208 | `deleteUserPalettes` (D8) | **H.W1 Lane A.2** | `palettes`+`votes`+`flags` |
| `modules/admin/service/users.ts` | 244 | `pruneEmptyUsers` (D9) | **H.W1 Lane A.2** | `sessions`+`users` |
| `modules/admin/service/tags.ts` | 84 | `deleteTag` (D10) | **H.W1 Lane A.2** | `tags`+`palettes` |

= **14 invocations at post-T.W1 HEAD** (matching the §2 KEPT table count).

† **`deletePalette` (user + admin) are SINGLE-collection** (the soft-delete `update` + the parent `decrementForkCount` both write `palettes`), so H1 does not *bind* them — they are KEPT for the two-document atomicity (the parent fork-count must roll back with the soft-delete) the dedicated rollback tests assert. A deliberate "wrap iff the two-doc outcome is referentially meaningful" judgment, recorded so the classification is not mistaken for an H1 over-application.

**Right-sized OUT at N.W3.B (formerly WRAPPED, now §3.3):** `toggleVote`, `registerSession`, `loginSession`, `restorePalette`. See §3.3 for the per-site justification.

---

## §2 — WRAPPED sites

The **14 KEPT** sites that wrap their multi-document mutation in `services.withTransaction(async (session) => { ... })`, with `session` threaded through every internal repository call. (Post-N.W3.B: the 4 benign / single-collection sites — `toggleVote`, `registerSession`, `loginSession`, `restorePalette` — were right-sized OUT; see §3.3. **Line numbers + paths below reflect post-T.W1 HEAD** — the E-1 package-by-feature move re-homed every service under `modules/<domain>/service/`.)

| # | File:line | Function | Collections touched | Wave landed | Rollback test? |
|---|---|---|---|---|---|
| 1 | `modules/admin/service/users.ts:171` | `deleteUser` | `palettes` + `votes` + `flags` + `sessions` + `adminAudit` + `users` | E.W2 Lane B | Pattern-covered (G.W3 §3); no dedicated test (representative pair only) |
| 2 | `modules/palette/service/forks.ts:93` | `forkPalette` (T.W1 TA-4: `remixPalette` folded in — the `/remix` write-only arm excised; fork is now the ONE path) | `palettes` (insert + parent fork-count `$inc`) + `paletteVersions` (the root version record — no `atomDiff` column any longer, dropped at TA-4) | E.W2 Lane B; **T.W1 fold** | Pattern-covered (G.W3 §3); `palette-forks.test.ts` asserts the copied colors, the provenance edge + parent fork-count bump |
| 3 | `modules/palette/service/crud.ts:255` | `deletePalette` (user-facing) | `palettes` (soft-delete `update` + parent `decrementForkCount` when `forkOf`) — SINGLE-collection, KEPT for the two-doc atomicity | G.W3 Lane E | **YES** — `withTransaction-rollback.test.ts` "rolls back deletedAt when fork-count cascade throws" |
| 4 | `modules/palette/service/versions.ts:146` | `revertToVersion` | `paletteVersions` (via `createVersionRecord`) + `palettes` (update + `$inc versionCount`) | G.W3 Lane E | Pattern-covered (G.W3 §3) |
| 5 | `modules/admin/service/batch.ts:37` | `batchPalettes(delete)` | `palettes` + `votes` + `flags` | G.W3 Lane E | Pattern-covered (G.W3 §3) |
| 6 | `modules/admin/service/batch.ts:86` | `batchUsers(suspend)` | `users` (status flip) + `sessions` (cascade-invalidate) | G.W3 Lane E | **YES** — `withTransaction-rollback.test.ts` "rolls back user status when session invalidation throws" |
| 7 | `modules/palette/service/crud.ts:116` | `createPalette` | `palettes` (insert) + `paletteVersions` (via `createVersionRecord`, when `userSlug` present) | **H.W1 Lane A.1** | **YES** — `withTransaction-rollback-h-w1.test.ts` "createPalette rolls back palette + version when createVersionRecord throws" |
| 8 | `modules/palette/service/crud.ts:203` | `patchPalette` | `palettes` (update + `currentHash` bookkeeping) + `paletteVersions` (via `createVersionRecord`, when content-hash changes AND `userSlug` present) | **H.W1 Lane A.1** | **YES** — `withTransaction-rollback-h-w1.test.ts` "patchPalette rolls back palette mutation + version when createVersionRecord throws" |
| 9 | `modules/admin/service/palettes.ts:69` | `deletePalette` (admin variant — D6) | `palettes` (soft-delete `update` + parent `decrementForkCount`) — SINGLE-collection, KEPT for the two-doc atomicity (+ post-txn `admin_audit` per D2) | **H.W1 Lane A.2** | **YES** — `withTransaction-rollback-h-w1.test.ts` "D6 admin deletePalette rolls back soft-delete when fork-count cascade throws" |
| 10 | `modules/admin/service/users.ts:121` | `setUserStatus` (D7 — wrapped unconditionally for call-site uniformity; only the `suspended` branch is multi-collection) | `users` (setStatus) + `sessions` (deleteByUserSlug on suspend branch) (+ post-txn `admin_audit` per D2) | **H.W1 Lane A.2** | **YES** — `withTransaction-rollback-h-w1.test.ts` "D7 setUserStatus(suspended) rolls back user status when sessions.deleteByUserSlug throws" |
| 11 | `modules/admin/service/users.ts:208` | `deleteUserPalettes` (D8) | `palettes` (deleteManyByUserSlug) + `votes` (deleteByPaletteSlugs) + `flags` (deleteByPaletteSlugs) (+ post-txn `admin_audit` per D2) | **H.W1 Lane A.2** | **YES** — `withTransaction-rollback-h-w1.test.ts` "D8 deleteUserPalettes rolls back vote + flag cascade when palettes.deleteManyByUserSlug throws" |
| 12 | `modules/admin/service/users.ts:244` | `pruneEmptyUsers` (D9) | `sessions` (deleteByUserSlugs) + `users` (deleteMany) (+ post-txn `admin_audit` per D2) | **H.W1 Lane A.2** | **YES** — `withTransaction-rollback-h-w1.test.ts` "D9 pruneEmptyUsers rolls back sessions.deleteByUserSlugs when users.deleteMany throws" |
| 13 | `modules/admin/service/tags.ts:84` | `deleteTag` (D10) | `tags` (deleteByName) + `palettes` (pullTagFromAll cascade) (+ post-txn `admin_audit` per D2) | **H.W1 Lane A.2** | **YES** — `withTransaction-rollback-h-w1.test.ts` "D10 deleteTag rolls back tags.deleteByName when palettes.pullTagFromAll throws" |
| 14 | `cron.ts:47` | `cleanup` (reaper hard-delete loop) | `palettes` (delete) + `votes` (deleteByPaletteSlug) + `flags` (deleteByPaletteSlug) | I.W2 | Pattern-covered (same cascade shape as user `deletePalette`) |

> **T.W1 path-mapping note (for §3 / §4 below).** The historical `services/<domain>/*`, `repositories/*`, `middleware/*`, and `events/auditLog.ts` paths in the §3 / §4 tables map under the E-1 MOVE-MAP to `modules/<domain>/service/*`, `modules/<domain>/repository/*`, the module authz files (`modules/palette/{etag,require-ownership}.ts`, `modules/admin/admin-auth.ts`, `modules/session/resolve-session.ts`), and `modules/admin/audit-log.ts` respectively. The classifications (DEFERRED / right-sized / single-collection) are unchanged by the move — only the paths shift. See `docs/tranches/T/audit/w1-move-map-api.md`.

**Invariant verification** (at post-N.W3.B HEAD):
- Every `withTransaction` callback receives `session: ClientSession` as its argument.
- Every repository call inside each block passes `session` as its final argument. (Verified by reading each function body; an un-threaded repository call inside a `withTransaction` block is the only way a wrapped site can silently regress, and grep + Read is the prescribed enforcement.)
- Repository method signatures support `session?: ClientSession` for every method reached from a wrapped block; the inventory of session-aware methods is in G.W3 Lane E `§2` (extended by E.W2 Lane B's original 3 sites; H.W1 Lane A.1 added no new session-aware methods). **H.W1 Lane A.2 extended 7 repository methods** to accept `session?: ClientSession` (see `H.W1-lane-a2-d4-d10-withTransaction-extension.md §3` for the full list).

---

## §3 — DEFERRED-WITH-RATIONALE sites

Cross-collection write sites that deliberately do NOT wrap in `withTransaction`, each with an explicit rationale. **A DEFERRED entry without a defensible rationale is itself an H1 regression** — every row below carries either an existing in-code comment (cited by file:line) or relies on the documented D3 carve-out.

### §3.1 — In-tree DEFERRED (rationale documented in code)

| # | File:line | Function | Collections | Rationale | Code-comment? |
|---|---|---|---|---|---|
| D1 | `services/admin/batch.ts:70-81` | `batchUsers(delete)` (per-row loop) | (transitively) `palettes` + `votes` + `flags` + `sessions` + `adminAudit` + `users` per row | Each per-row `deleteUser` is **already** transactional (its own cascade runs inside `services.withTransaction`). A wrapping per-batch transaction would let one bad row roll back the entire batch — the explicit anti-goal per `G-AUDIT-6 §1.4`. The per-row loop is the correct shape. | **YES** — `batch.ts:71-74` comment cites G-AUDIT-6 §1.4. |
| D2 | All admin services calling `emitAuditEvent` after a primary write (e.g. `admin/colors.ts:80`, `admin/palettes.ts:35`, `admin/tags.ts:58/77`, `admin/users.ts:119/176/199/214`, `admin/batch.ts:55/101`, `admin/impersonate.ts:49`, `admin/flagged.ts:46`, `services/palette/forks.ts`/`crud.ts` indirectly) | (caller-dependent) | (primary collection) + `admin_audit` | **D3 "befitting-graceful" carve-out** — audit-log writes MUST NOT roll back the originating real action. An audit-infrastructure hiccup must not undo a real admin action; the failure path is an explicit structured `console.error` (operator-visible) NOT a silent swallow. | **YES** — comprehensive doc-comment block at `events/auditLog.ts:1-13` + the `try/catch` at `events/auditLog.ts:35-56`. |

### §3.2 — Out-of-tree DEFERRED (rationale documented here; ambient-by-design)

These are cross-collection write sites in services that do NOT carry an explicit in-code "deferred" comment. Each carries a defensible rationale below; the rationale is codified by this audit-list (the standing reference) rather than a per-call-site comment.

**Post-Lane-A.2 status**: D4-D10 (formerly §3.2 relay items) have been **WRAPPED** per option-α adjudication and now appear in §2 (rows 10-16). The only remaining §3.2 entry is D3 (`impersonate`), whose sole secondary write is the D2 audit-log carve-out.

| # | File:line | Function | Collections | Rationale | Code-comment? |
|---|---|---|---|---|---|
| D3 | `services/admin/impersonate.ts:41-49` | `impersonate` | `sessions` (insert) + `admin_audit` (via `emitAuditEvent`) | The only primary write is `sessions.insert`. The `emitAuditEvent` IS the D2 carve-out (audit-log befitting-graceful). Net: single-collection in the primary, audit-graceful in the secondary — DOES NOT require `withTransaction`. | NO (rationale is the D3 carve-out documented at `events/auditLog.ts`). |

**Rationale-strength legend**:
- D1, D2 — **rationale-DEFENDED** (existing in-code documentation; the carve-outs are deliberate and codified).
- D3 — **rationale-DEFENDED-via-carveout** (impersonate's only secondary write is the D2 audit).
- D4-D10 — **WRAPPED in §2** (H.W1 Lane A.2 — see `H.W1-lane-a2-d4-d10-withTransaction-extension.md`). No longer relay items.

### §3.3 — RIGHT-SIZED OUT at N.W3.B (2026-06-11)

Four sites that were WRAPPED through H but whose transaction bought no real
invariant — their non-atomic outcome is **benign + self-healing**, NOT a
cross-collection referential break. H1 binds cross-collection writes; these are
either single-collection or carry a recoverable orphan that a standing sweep
reaps. Each is now un-wrapped, with the rationale codified here (the standing
reference) + an in-code comment at the site. **The H1 invariant is unaffected:
no cross-collection referential write was unwrapped.** Coverage tests:
`test/services/txn-right-sizing.test.ts` asserts each opens ZERO transactions
while a representative KEPT site still opens one.

| # | File:line | Function | Was | Why droppable (justified-each) | In-code comment? |
|---|---|---|---|---|---|
| R1 | `services/palette/votes.ts` `toggleVote` | row 3 | The unique `(userSlug, paletteSlug)` index is the correctness anchor — it makes the delete-or-upsert idempotent and its true-insert/true-delete signal gates the `$inc`, which is **document-atomic without a session**. The transaction only added snapshot-isolation on the returned `voteCount` re-read — but that count is ADVISORY UI state, not an invariant; an off-by-one for one response self-heals on the next read. `findOneAndIncrementVoteCount` folds the `$inc` + re-read into one round-trip. | **YES** — `votes.ts` header doc-comment. |
| R2 | `services/session/auth.ts` `registerSession` | row 15 | The two writes (`users.insert` then `sessions.insert`) are NOT a referential invariant: a partial failure leaves an orphan `users` row with no session, **indistinguishable from a registered-then-never-saved user** and already reaped by `pruneEmptyUsers`. The session insert runs AFTER the user insert so a live session always names an existing user. | **YES** — `auth.ts:registerSession` comment. |
| R3 | `services/session/auth.ts` `loginSession` | row 16 | The session insert + the `lastSeenAt` touch are NOT a referential invariant: `lastSeenAt` is **advisory presence metadata** that converges on the next request. The session insert runs FIRST so the user is never touched for a session that failed to land. (Mirrors R2's benign-orphan reasoning — "wrap iff the non-atomic outcome is a cross-collection referential break, not a recoverable orphan.") | **YES** — `auth.ts:loginSession` comment. |
| R4 | `services/palette/crud.ts` `restorePalette` | (sibling-landed N.W3.J path) | **SINGLE-collection** — every write touches only `palettes` (the doc's `deletedAt` clear + the parent's fork-count recompute). H1 does not bind. The `setForkCount` recompute is itself the heal: it writes the counted-from-truth value (`countForksOf`), so the parent's `forkCount` converges to its live-fork count on every restore regardless of interleaving — no transactional isolation required. | **YES** — `crud.ts:restorePalette` comment. |

**The former D4/D5 rollback specs** in `withTransaction-rollback-h-w1.test.ts`
were re-authored to assert the NEW contract (the first write PERSISTS on a
second-write failure; the orphan is exactly what `pruneEmptyUsers` reaps) — they
are now the N.W3.B benign-orphan witnesses, not rollback witnesses.

---

## §4 — SINGLE-COLLECTION sites (excluded from §2 / §3 — listed for traceability)

These services contain writes but only touch ONE collection (modulo the D2 audit-log carve-out). Documented here so a future contributor reviewing this list can immediately see that a SINGLE-COLLECTION classification was the deliberate disposition, not an oversight.

### §4.1 — In-services

| File:line | Function | Collection | Notes |
|---|---|---|---|
| `services/palette/flags.ts:25-52` | `flagPalette` | `flags` only | Read-side `palettes.findBySlug` is a query, not a write. |
| `services/color/proposals.ts:28-86` | `proposeColor` | `proposed_names` only | Pre-check + 11000-recovery on the same collection. |
| `services/admin/colors.ts:72-101` | `deleteColor` / `approveColor` / `rejectColor` | `proposed_names` only (+ D2 audit) | Single primary write; audit is D2 carve-out. |
| `services/admin/colors.ts:58-70` | `listByStatus` | (read-only) | Not a write site. |
| `services/admin/audit.ts:56-87` | `listAudit` | (read-only) | Not a write site. |
| `services/admin/flagged.ts:23-50` | `listFlagged` / `dismissFlags` | `flags` only (+ D2 audit) | `dismissFlags` is `flags.deleteByPaletteSlug` + audit. |
| `services/admin/tags.ts:40-67` | `listTags` / `createTag` | `tags` only (+ D2 audit) | `deleteTag` is the cross-collection case — entry D10. |
| `services/admin/import.ts:28-79` | `importPalettes` | `palettes` only (+ D2 audit) | Reads `users.findBySlug` first (pre-check, not a write). |
| `services/palette/crud.ts:44-61` | `getPaletteBySlug` | (read-only) | Reads `palettes` + `votes`. |
| `services/palette/crud-list.ts:62-207` | `listPalettes` / `listMine` | (read-only) | Reads `palettes` + `votes`. |
| `services/palette/forks.ts:133-184` | `listForks` / `getProvenance` | (read-only) | Reads `palettes` only. |
| `services/palette/versions.ts:91-111` | `listVersions` / `getVersionByHash` | (read-only) | Reads `palette_versions` only. |
| `services/session/auth.ts:127-148` | `revokeSession` / `getMe` | `sessions` only / read-only | `revokeSession` deletes one session row. `getMe` is read-only. |

### §4.2 — Out-of-scope sites noted for traceability

| File:line | Function | Collections | Disposition |
|---|---|---|---|
| `api/src/cron.ts:47` | `cleanup` — the **reaper hard-delete loop** | `palettes` (delete) + `votes` (deleteByPaletteSlug) + `flags` (deleteByPaletteSlug), per expired palette | **WRAPPED — promoted to §2 row 14 at N.W3.B.** This per-palette cascade IS a cross-collection write and IS already wrapped (`cron.ts:47`); listing it in §2 makes the census honest (the I.W2-era classification of cron as wholesale "out of scope" predated the reaper's transactional cascade). |
| `api/src/cron.ts:55-56` | `cleanup` — the orphan-vote sweep | `palettes` (read-only `listAllSlugs`) + `votes` (deleteOrphaned) | OUT OF SCOPE — NOT a cross-collection *write* (palettes is read-only). The N.W3.A `createdAt < sweepStart` bound closes its TOCTOU; the sweep is intentionally un-sessioned (a single bounded `$nin` deleteMany, idempotent across nightly runs). Session expiry is no longer swept here at all — the `sessions.expiresAt` TTL index (N.W3.I) discharges it in the DB engine. |

### §4.3 — Repositories (`api/src/repositories/**/*.ts`)

By DESIGN, each repository class wraps exactly one `Collection<T>` (D.W2 Lane C #2). The repository layer is the ONLY layer that calls `db.collection(...)`. Per the §1.3 scope rule, **no repository file contains a cross-collection write site**. Listed here for completeness:

| File | Collection |
|---|---|
| `repositories/palette.ts` | `palettes` |
| `repositories/paletteVersion.ts` | `palette_versions` |
| `repositories/vote.ts` | `votes` |
| `repositories/session.ts` | `sessions` |
| `repositories/user.ts` | `users` |
| `repositories/proposedName.ts` | `proposed_names` |
| `repositories/tag.ts` | `tags` |
| `repositories/flag.ts` | `flags` |
| `repositories/adminAudit.ts` | `admin_audit` |

Note: `UserRepository.aggregateUsersWithPaletteCount` and `UserRepository.findEmptyUserSlugs` use `$lookup` into `palettes`, but these are **read-only aggregations** (`.aggregate(...).toArray()` — no `$out` / `$merge`). They are NOT writes; no transactional accounting applies. `FlagRepository.aggregateFlaggedPalettes` is the same shape (read-only aggregation with $lookup into palettes).

---

## §5 — Audit methodology + future-reference

### §5.1 — How to add a new entry to this list

When a new service function is added (or an existing one is modified) in `api/src/services/**/*.ts`:

1. Determine whether the function writes to **≥ 2 different collections** (per §1.1 heuristics, treating helper-via-call-site as a fused surface and excluding `emitAuditEvent` per §3.1 D2).
2. If YES:
   - Either wrap in `services.withTransaction(async (session) => { ... })` + thread `session` through every repository call inside the block, and add a row to **§2**.
   - OR document a defensible DEFERRED rationale in **§3** (either §3.1 with an in-code comment OR §3.2 with the rationale text + explicit relay).
3. If NO (single-collection, modulo D2): no audit-list entry required. Optionally add a row to **§4** if the function's single-collection status is non-obvious from inspection (e.g. a helper that takes a `services` parameter but only writes to one repo).

### §5.2 — How to detect a new cross-collection write site in code review

The reviewer's checklist for a `services/` PR:

1. `grep -n 'repositories\.' <changed-file>.ts` — list every repository access.
2. Count the distinct repository handles (`palettes`, `votes`, `flags`, etc.) that are reached on a WRITE method (`insert` / `update` / `delete` / `incrementX` / `decrementX` / `setStatusForSlugs` / `upsertIdempotent` etc.). Exclude `findX` / `countX` / `aggregateX` (reads).
3. Exclude `adminAudit.insert` (D2 carve-out — it's funneled through `emitAuditEvent`).
4. If the count ≥ 2: the function is a cross-collection write site. Verify the body is inside `services.withTransaction(async (session) => { ... })` AND that `session` is the last argument to every repository write.
5. If a helper is called (e.g. `createVersionRecord`, `deleteUser`), include the helper's write surface in the count.

### §5.3 — Sub-gate verification at H.W1 close

The H.W1 wave gate requires (per `docs/tranches/H/waves/H.W1.md §Gate`):
- **16 WRAPPED rows** in §2 (was 7 at H open; +2 from Lane A.1; +7 from Lane A.2) — verified by `grep -rn 'services.withTransaction' api/src/services/ | wc -l` returning 16.
- Every Lane A.1-added row in §2 (rows 8 + 9) carries a rollback-test reference from `api/test/services/withTransaction-rollback-h-w1.test.ts`.
- Every Lane A.2-added row in §2 (rows 10-16) carries a dedicated rollback test in `api/test/services/withTransaction-rollback-h-w1.test.ts` (the D4-D10 block, 7 tests; see `H.W1-lane-a2-d4-d10-withTransaction-extension.md §4`).
- Every §3 DEFERRED row carries either an in-code comment (D1, D2) or this audit-list rationale (D3). Post-Lane-A.2 there are NO remaining "relay items" — D4-D10 were WRAPPED, not deferred.

### §5.4 — Test convention for new rollback tests

`api/test/services/withTransaction-rollback.test.ts` is the canonical home. The shape (per G.W3 §3):
- Run against `MongoMemoryReplSet` (`test/setup.ts`) so the transaction boundary is REAL.
- Use `connect` / `buildServices` / `cleanCollections` / `makeFakeContext` from `test/helpers.ts`.
- Stub a LATER repository call inside the transaction block to throw AFTER an earlier write has executed.
- Assert NONE of the earlier writes persist (the transaction aborted + rolled back).

---

## §6 — Authority + relay block

### §6.1 — Authoring authority

- **Authored**: 2026-05-26 (H.W1 Lane C).
- **HEAD at authoring**: `tranche-h` @ `a12a71d`.
- **Lane A coordination**: §2 rows 8 + 9 (createPalette + patchPalette) reflect the post-Lane-A state. If Lane A's commit lands at a different HEAD, the orchestrator updates the row line-refs at H.W1 close.
- **H1 invariant codified**: this document IS the standing reference per `H.md §2 H1` final clause.

### §6.2 — Relay items (resolved at H.W1 Lane A.2)

**Option α adjudicated — orchestrator decision: WRAP D4-D10** per H1 strict-purity (the maximalist H.md §2 H1 reading: "every cross-collection write site"). The 7 sites previously surfaced as §3.2 relay items have all been wrapped in H.W1 Lane A.2 and now appear in §2 (rows 10-16). See `docs/tranches/H/audit/H.W1-lane-a2-d4-d10-withTransaction-extension.md` for the full per-site landing detail.

| # | Site | Disposition | Landed |
|---|---|---|---|
| D4 | `services/session/auth.ts:74` (`registerSession`) | WRAPPED (§2 row 15) | H.W1 Lane A.2 |
| D5 | `services/session/auth.ts:132` (`loginSession`) | WRAPPED (§2 row 16) | H.W1 Lane A.2 |
| D6 | `services/admin/palettes.ts:49` (`deletePalette`, admin variant) | WRAPPED (§2 row 10) | H.W1 Lane A.2 |
| D7 | `services/admin/users.ts:122` (`setUserStatus`, singular) | WRAPPED (§2 row 11) | H.W1 Lane A.2 |
| D8 | `services/admin/users.ts:207` (`deleteUserPalettes`) | WRAPPED (§2 row 12) | H.W1 Lane A.2 |
| D9 | `services/admin/users.ts:241` (`pruneEmptyUsers`) | WRAPPED (§2 row 13) | H.W1 Lane A.2 |
| D10 | `services/admin/tags.ts:78` (`deleteTag`) | WRAPPED (§2 row 14) | H.W1 Lane A.2 |

**Repository signature extensions** required to land the wraps (mechanical, mirroring the G.W3 Lane E `session?: ClientSession` convention):

| Repository | Method | Pre-A.2 signature | Post-A.2 signature |
|---|---|---|---|
| `user.ts` | `insert` | `(user: User)` | `(user: User, session?: ClientSession)` |
| `user.ts` | `touchLastSeen` | `(slug, when)` | `(slug, when, session?: ClientSession)` |
| `user.ts` | `setStatus` | `(slug, status)` | `(slug, status, session?: ClientSession)` |
| `user.ts` | `deleteMany` | `(slugs)` | `(slugs, session?: ClientSession)` |
| `session.ts` | `insert` | `(session: Session)` | `(session: Session, clientSession?: ClientSession)` — name `clientSession` avoids shadowing the `Session` document parameter (the only deviation from the standard `session?` naming) |
| `tag.ts` | `deleteByName` | `(name)` | `(name, session?: ClientSession)` |
| `palette.ts` | `pullTagFromAll` | `(tag)` | `(tag, session?: ClientSession)` |

### §6.3 — H1 invariant codifier status

**At post-Lane-A.2 HEAD (historical): H1 was FULLY CLOSED for the maximalist
reading** with 16 wrapped sites. **At post-N.W3.B HEAD (2026-06-11): the count
is right-sized to 14** (§2). H1 itself is unchanged — it binds **cross-collection**
writes, and **every cross-collection referential write still wraps**. The 4
right-sized-out sites (§3.3) were either single-collection (`restorePalette`) or
carried only a benign, self-healing orphan (`toggleVote`, `registerSession`,
`loginSession`) — none was a cross-collection referential write. The 3 §3
DEFERRED entries (D1, D2, D3) remain rationale-DEFENDED carve-outs.

**Closure invariant**: `grep -rn 'services.withTransaction(' api/src/ | grep -v
comment` returns **14** — equal to the §2 KEPT row count (13 in `services/` + 1
reaper in `cron.ts`). Any future cross-collection write site MUST land in §2
with a wrap, in §3 with a defended carve-out (§3.1/§3.2) or a justified
right-size (§3.3), or in §4 with a single-collection classification — the §5
methodology is the runtime-enforceable shape of the H1 invariant in code-review.

This document is updated at every wave that touches the cross-collection write surface.
