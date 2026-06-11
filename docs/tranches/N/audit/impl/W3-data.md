# N.W3-DATA — impl lane report (W3.A / W3.C / W3.I / W3.J)

**Branch**: tranche-f-handoff  **Date**: 2026-06-11  **Ownership**: `api/**` only.
**Gates**: `cd api && npx tsc --noEmit` → exit 0; `cd api && npm test` → **172 passed / 29 files**
(was 161/28 at lane start — GREW by 11 tests across 4 files, none shrank).
**Escape-cast discipline preserved**: zero new `as any` / `as unknown as` / `_id`-intersection
casts in any touched file (verified by grep over all 7 changed `src/` files). N.W2.A's
`WithId<T>` return sigs untouched.

---

## W3.A — orphaned-vote sweep TOCTOU (`cron.ts` + `vote.ts`)

**Fix.** `VoteRepository.deleteOrphaned` now takes a second arg `before: Date` and filters
`{ paletteSlug: { $nin: validSlugs }, createdAt: { $lt: before } }`. `cron.ts` captures
`const sweepStart = new Date()` as the FIRST statement (before any read), derives the grace
cutoff from it, and passes it to `deleteOrphaned(paletteSlugs, sweepStart)`.

**Why it closes the race.** The TOCTOU (D2 §3.1 CONFIRMED, V2 (b)) was: a palette created
between `listAllSlugs()` (the `$nin` snapshot) and `deleteOrphaned()` is absent from the snapshot,
so any vote cast on it in that window was reaped as "orphaned" — genuine data loss. With the
boundary, a vote on a palette created after `sweepStart` carries `createdAt >= sweepStart` and
falls OUTSIDE the `createdAt < sweepStart` window, so it can never be reaped. `sweepStart` is
captured before the slug snapshot so the two are mutually consistent. Only votes that BOTH point
at a now-missing slug AND predate the snapshot are genuine orphans — exactly the set we want.

**Rationale (recorded).** D1 offered two fixes — (a) the `createdAt < sweepStart` bound, or (b)
enumerate vote `paletteSlug`s via `distinct` and diff. (a) is the smaller, KISS change and the
one the lane prompt names; it requires no extra round-trip and no inverse-set machinery. Chosen.

---

## W3.C — index right-sizing (`db.ts`) + repo-method excision (`session.ts`)

Net index count **26 → 22** (`grep -c createIndex src/db.ts`). The moves:

1. **Dropped the 3 write-only `palette_versions` indexes** (`forkedFromHash`, `rootHash`,
   `authorSlug+createdAt`). V2 (b)#5 + D1 §2 CONFIRMED: no query in `api/src` filters on these
   fields; `paletteVersion.ts`'s four methods use only `{_id}` (implicit) and `{paletteSlug,
   createdAt}`. Kept `{paletteSlug, createdAt}`. **Did NOT touch `Palette.forkOfHash` the FIELD**
   — it is live on the wire (`format/palette.ts:76` `forkOfHash: rest.forkOfHash`; the prompt
   cites `:74`, off by 2). D4's delete-claim conflated the live field with the write-only indexes.

2. **Replaced the 3 bare palette sort indexes with 3 `{deletedAt, visibility, <sortkey>}`
   compounds** (net-0 index count). Decision recorded per the ACTUAL query shapes in
   `crud-list.ts`: every public-list query unconditionally sets `f.deletedAt = null` (`:85`) and
   the foreign/anon view sets `f.visibility = "public"` (`:114`) as EQUALITY predicates; the three
   sort specs are `{createdAt:-1}` / `{voteCount:-1,createdAt:-1}` / `{forkCount:-1,createdAt:-1}`.
   By the ESR rule (Equality, Sort, Range) the optimal index leads with the two equality fields
   then the sort key:
   - `{deletedAt:1, visibility:1, createdAt:-1}` — newest browse
   - `{deletedAt:1, visibility:1, voteCount:-1, createdAt:-1}` — popular browse
   - `{deletedAt:1, visibility:1, forkCount:-1, createdAt:-1}` — most-forked browse

   **Each earns its write cost** because it replaces (1:1) an existing sort index that LACKED the
   equality prefix and forced the planner to walk the sort order and filter `deletedAt`/`visibility`
   in memory on the single busiest endpoint (the public browse). The compounds make that path a
   pure index range scan. We pay for exactly 3 palette sort indexes before and after — the shape is
   strictly better, the count is unchanged. **D1 proposed `tier`-appended variants**; rejected: the
   `tier` filter (`crud-list.ts:90`) is lower-traffic and optional, and appending `tier` between the
   equality prefix and the sort key would break the ESR ordering for the common (no-tier) query
   while only marginally helping the rare tier-filtered one. KISS: do not multiply indexes for a
   niche filter. (`$text`/`tags`/`userSlug` filters keep their dedicated indexes; the text index and
   `{userSlug,createdAt}` are unchanged.)

3. **Added the sessions TTL index** `{expiresAt:1}` with `{expireAfterSeconds:0,
   name:"sessions_ttl_expiresAt"}`. This IS CRUD-CONTRACT §6's "the cron hard-deletes sessions
   where expires_at < now()", discharged by the DB engine. It REPLACES the former plain
   `{expiresAt:1}` index (same field, now TTL) and lets us delete the application-level sweep.

4. **Dropped the `sessions.lastSeenAt` index** — it existed only to serve the
   `deleteStale(lastSeenAt < now−30d)` cron arm, now dead (see W3.I). `lastSeenAt` is still written
   by `findAndTouch` + register/login (a legit tracked field), just no longer indexed/swept.

5. **Deleted `SessionRepository.deleteExpired` + `deleteStale`** outright (no legacy) — both became
   dead code once the TTL index reaps. Verified zero other callers (`grep -rn` across `src/` +
   `test/` → only the cron arms, now removed). Left a 4-line pointer comment so the absence is
   intentional, not an oversight.

---

## W3.I — session-TTL contract reconcile (`auth.ts` + cron)

**Decision: honor the documented cross-repo 30d contract.** `SESSION_TTL_MS` in `auth.ts` is now
`30 * 24 * 60 * 60 * 1000` (was `7 *`). Rationale: D2 §3 + critics K2/K3 verified this as a P1
one-contract-source breach — CRUD-CONTRACT §6 binds `session_ttl_days = 30` at registration; I read
the contract directly (`fourier-analysis/docs/tranches/B/coordination/CRUD-CONTRACT.md` §6/§10:
"30-day TTL", "`session_ttl_days = 30` at registration", "The cron (§8) hard-deletes sessions where
`expires_at < now()`"). The lane prompt's default was to honor the 30d contract unless D2 showed
the 7d was deliberate hardening — D2 showed the OPPOSITE: the 7d-mint comment ("the only place this
constant lives") was an accidental drift, and it created an INTERNAL inconsistency (the 30d cron
sweep was dead because the 7d `expiresAt` reaped first). No deliberate-hardening signal exists.

**Coherent cron.** The 30d `expiresAt` mint + the `expireAfterSeconds:0` TTL index together fully
discharge §6's session reaping at the DB layer, so BOTH the `deleteExpired` arm (`expiresAt < now`)
AND the `deleteStale` arm (`lastSeenAt < now−30d`) are removed from `cron.ts`. The stale arm is
genuinely subsumed: `expiresAt` is set once at mint to `createdAt + 30d` and NEVER extended
(`findAndTouch` bumps only `lastSeenAt`), so any session whose `lastSeenAt` is older than 30d
already has `expiresAt < now` and is already TTL-reaped. The contract has no `lastSeenAt`-based
stale sweep — that was value.js-local drift. The cron now performs exactly two sweeps (palette
reaper + orphaned votes); its docstring + the `THIRTY_DAYS_MS`/grace logic are updated.

---

## W3.J — fork-count drift on restore (`palette.ts` + `crud.ts`)

**Fix.** `restorePalette` no longer blind-`incrementForkCount`s the parent. Inside the same
transaction, AFTER the restore `update`, it recomputes the parent's count from the live-fork truth:
`countForksOf(parent, session)` → `setForkCount(parent, liveForks, session)`.

- `countForksOf` now accepts an optional `session` so the recompute reads the in-transaction state
  (the just-restored fork is `deletedAt:null` and counted; `countForksOf` filters `deletedAt:null`).
- New `setForkCount(slug, count, session?)` repository method (absolute `$set`).
- `incrementForkCount` is KEPT — it is correct + symmetric at fork CREATION (`forks.ts:143`: one
  genuinely-new live fork). The drift was ONLY the restore path.

**Why recompute, not symmetric-gate.** D1 §3 + §5 item 4 + critic K2 A2: the soft-delete
`decrementForkCount` is gated `{forkCount:{$gt:0}}` (correctly preventing underflow), but that gate
breaks the delete/restore round-trip's symmetry — a restore that blind-increments past the true
live-fork count permanently inflates a public-facing number whenever the stored count had drifted
below truth. Recomputing from `countForksOf` is self-healing regardless of how the decrement
behaved or any prior desync; it is the KISS fix D1 names ("recompute from `countForksOf` on
restore"). **H1 preserved**: the count read + write stay inside the existing `withTransaction`,
session threaded through both.

---

## Tests added (11 new across 4 files)

- **`test/repositories/vote.test.ts`** (+3): `deleteOrphaned` reaps slug-absent votes; the TOCTOU
  boundary — a vote with `createdAt > sweepStart` survives even when its slug is absent from the
  snapshot; a genuinely-old orphan (absent AND predating) IS reaped. (Votes inserted directly with
  controlled `createdAt` to exercise the boundary; the repo upsert always stamps `new Date()`.)
- **`test/db-indexes.test.ts`** (+5, NEW FILE): drives the REAL `getDb()` index path against the
  ephemeral replica set and asserts via `listIndexes()` — the `sessions.expiresAt` TTL index with
  `expireAfterSeconds:0`; the absence of the `lastSeenAt` sweep index; the three browse compounds;
  the absence of the bare `{createdAt}` sort index; `palette_versions` keeps only `{paletteSlug,
  createdAt}` (length 2 incl. `_id`) with the 3 write-only indexes gone.
- **`test/services/palette-crud.test.ts`** (+2): restore recomputes the parent forkCount from live
  forks (desynced parent `forkCount:5` + one soft-deleted fork → restored → parent count = 1, NOT
  the blind 6); already-live restore is an idempotent no-op.
- **`test/repositories/palette.test.ts`** (+1): `setForkCount` writes an absolute value.

## Files touched

- `api/src/cron.ts` — sweepStart capture, TOCTOU-safe orphan sweep, session arms removed, docstring.
- `api/src/db.ts` — browse compounds, dropped write-only + lastSeenAt indexes, TTL index.
- `api/src/repositories/vote.ts` — `deleteOrphaned(validSlugs, before)`.
- `api/src/repositories/session.ts` — deleted `deleteExpired`/`deleteStale` + pointer comment.
- `api/src/repositories/palette.ts` — `countForksOf(session?)`, new `setForkCount`.
- `api/src/services/palette/crud.ts` — `restorePalette` recompute.
- `api/src/services/session/auth.ts` — `SESSION_TTL_MS` 7d → 30d + contract docstring.
- `api/test/{repositories/vote,db-indexes,services/palette-crud,repositories/palette}.test.ts`.

## Doc-drift note (for N.W8.D, NOT touched here — out of lane scope)

`api/CLAUDE.md` + root `CLAUDE.md` state "26 indexes / 9 collections". Post-W3.C the count is **22**
(palettes 6, palette_versions 1, votes 2, sessions 1 [TTL], proposed_names 3, users 1, tags 1,
flags 3, admin_audit 2 + the slug/text unique indexes counted within palettes/proposed_names). The
`api/CLAUDE.md` cron docstring + "Database" table also list the old `sessions: lastSeenAt, expiresAt`
and `palette_versions` index set. Flagged for the W8 doc-truth wave.

---

## W3 Verification

**Date**: 2026-06-11  **Verifier**: N.W3 verification lane  **Branch**: tranche-f-handoff

### Hard gates

| Gate | Command | Result | Pass? |
|---|---|---|---|
| tsc --noEmit | `cd api && npx tsc --noEmit` | exit 0 | YES |
| npm test count ≥161 | `cd api && npm test` | 214 passed / 36 files | YES |
| WithId cast grep | `grep -nE "as \(?(Palette|ProposedName|Tag|AdminAuditEvent) &" api/src` | 0 matches | YES |
| as any grep | `grep -rn "as any" api/src` | 0 matches | YES |

### (a) withTransaction sites ≤14

Actual `services.withTransaction(` call sites in `api/src` (excluding comments, docs, and helper definition lines):

| File | Line(s) | Count |
|---|---|---|
| `cron.ts` | 47 | 1 |
| `services/admin/palettes.ts` | 66 | 1 |
| `services/admin/batch.ts` | 38, 87 | 2 |
| `services/admin/tags.ts` | 79 | 1 |
| `services/admin/users.ts` | 121, 169, 206, 240 | 4 |
| `services/palette/versions.ts` | 156 | 1 |
| `services/palette/crud.ts` | 116, 203, 255 | 3 |
| `services/palette/forks.ts` | 107 | 1 |
| **Total** | | **14** |

Target ≤14: **MET (exactly 14)**. The W3-txns.md justification table covers all 18 originals (14 KEEP + 4 DROP: `toggleVote`, `registerSession`, `loginSession`, `restorePalette`). **PASS.**

### (b) palette_versions write-only indexes dropped; Palette.forkOfHash field survives

- `db.ts` `palette_versions` block: only `{ paletteSlug: 1, createdAt: -1 }` remains (line 67). Former `forkedFromHash`, `rootHash`, `authorSlug+createdAt` indexes: absent (line 65 comment confirms). **PASS.**
- `format/palette.ts:76` `forkOfHash: rest.forkOfHash` still present. `models.ts:144` `forkOfHash: string | null` still present. **PASS.**

### (c) sessions TTL index + cron arm deletion — no dead code

- `db.ts:81–83`: `sessions.expiresAt` TTL index `{ expireAfterSeconds: 0, name: "sessions_ttl_expiresAt" }` present. `lastSeenAt` index: absent (removed, see db.ts comment lines 79-80). **PASS.**
- `cron.ts`: session expiry comment (lines 16–18) correctly states the TTL index discharges §6; NO `deleteExpired`/`deleteStale` call sites in `cron.ts`. **PASS.**
- `repositories/session.ts`: `deleteExpired`/`deleteStale` methods deleted; replaced with a 4-line pointer comment (line 70) explaining the intentional absence. `grep -rn "deleteExpired|deleteStale" api/src` returns only that comment line — no callable implementations. **PASS.**

### (d) idempotency 409-on-different-body has a test

`test/conformance/idempotency.test.ts:143`: `"same key + DIFFERENT body → 409 urn:contract:idempotency-replay-conflict (CS3.2)"`. Asserts `second.status === 409` and `body.type === "urn:contract:idempotency-replay-conflict"`. **PASS.**

### (e) URN decision recorded AND tests assert the chosen scheme

- Decision recorded at `docs/tranches/N/audit/impl/W3-contract.md §W3.H`: ADOPT `urn:contract:<kebab>` namespace, with full class→URN mapping table. Justification: fourier conformance matrix DEFERRED-TO-VALUE.JS disposition + C2.5 literal binding. **PASS.**
- Tests assert the scheme: `test/envelope.test.ts` (13 URN assertions covering all `ApiError` subclasses); `test/conformance/idempotency.test.ts:170` (`urn:contract:idempotency-replay-conflict`); `test/routes/palettes-votes-flags.test.ts:83,113,154,165` (session-invalid, not-found, slug-conflict, validation-failed); `test/routes/palettes-ownership.test.ts:90` (contract URN). **PASS.**

### (f) 4 named conformance gaps each gained a wire test

Per N.W3 row (H-tests): sessions/colors (D5 zero-coverage), remix HTTP surface (fork/remix/atomDiff composite), revert→200 (E4 gap), adminAuth bearer gate (D5 "not exercised by any test").

| Gap | Test file | Tests | Key assertions |
|---|---|---|---|
| sessions register/me/logout + colors propose/approved/tags | `test/routes/sessions-colors.test.ts` | 11 | Real `resolveSession`+DB; 401/400 envelopes; colors propose 201; approved+tags 200 shapes |
| remix HTTP surface, fork/provenance, stored atomDiff serve (W3.F), revert→200 (E4) | `test/routes/palettes-forks.test.ts` | 9 | `{remixedFrom, atomDiff}` composite; `GET /:slug/versions/:hash` atomDiff round-trip; `POST /:slug/revert → 200`; auth gates |
| votes (401/toggle/404) + flags (401/201/double-flag-409/flag-own-400) | `test/routes/palettes-votes-flags.test.ts` | 7 | Service-layer-only before; now HTTP-layer too |
| impersonate route + adminAuth bearer gate (401/403/503) | `test/routes/admin-impersonate.test.ts` | 5 | 401 no-auth; 403 wrong-token; 503 unconfigured; 200 success |

All 4 conformance gaps covered. **PASS.**

### Summary

| Gate | Status |
|---|---|
| tsc --noEmit = 0 | PASS |
| npm test ≥161 (got 214/36) | PASS |
| WithId casts = 0 | PASS |
| as any = 0 | PASS |
| withTransaction sites ≤14 (got 14, W3-txns.md covers all 18) | PASS |
| palette_versions 3 write-only indexes gone; Palette.forkOfHash field survives | PASS |
| sessions TTL index present; cron arm + deleteExpired/deleteStale deleted; no dead code | PASS |
| idempotency 409-on-different-body test present | PASS |
| URN decision recorded; tests assert urn:contract:* scheme | PASS |
| 4 conformance gaps covered (sessions-colors/11, forks/9, votes-flags/7, impersonate/5) | PASS |

**Overall: GREEN — all N.W3 gates pass.**
