# L — PROGRESS

**Status board.** Updated at every wave boundary. L is **planning-only at open**. IMPL (L.W1–L.W4) is **hard-blocked on the dispatch gate: K.W2 restores the green substrate** (vitest + 5-project playwright + lint + `vue-tsc --noEmit` all exit 0 against the K.W2 baseline; recorded by the orchestrator here when confirmed). No L excision merges against a red substrate — see `L.md §11`.

## Wave status

| Wave | Disposition | Status | Gate |
|---|---|---|---|
| **L.W0** — Charter ratification | DEV (planning) | **PLANNED** (authored 2026-06-02) | `L.md` + `audit/excise-ledger.md` committed; 26-item ledger frozen; **BLOCKED on dispatch gate (K.W2 green)** |
| **L.W1** — Boundary fail-explicit (no field churn) | IMPL | **BLOCKED** on K.W2-green | 5 envelopes → typed `ApiError` [inv-L-4] · 4 route repo-leaks → `ownership.ts` [inv-L-5] · `votes.ts` `?? 0` → `NotFoundError` · `resolveOrigin` typed [inv-L-8]; `tsc`+`eslint`+suites parity (no status-code drift) |
| **L.W2** — DI seam + branded types | IMPL | **BLOCKED** on L.W1 | `SessionToken`/`UserSlug` branded · `resolve-session` via `c.var.services.repositories` [inv-L-6] · 2 `as any` retired [inv-L-1] · `as unknown as` = 1 [inv-L-2]; atomic lane (brittleness window) |
| **L.W3** — Legacy field excision (bottom-up) | IMPL | **BLOCKED** on L.W2 | `sessionToken` → 0 [inv-L-3a] · `status` writes/filter-transpose/projection/envelope → 0 [inv-L-3 full] · drop-comments → 0 [inv-L-9]; demo/+api consumer scan before envelope removal |
| **L.W4** — Decomposition + close | IMPL | **BLOCKED** on L.W3 | crud/forks/users < 350 LoC [inv-L-7] · `api/CLAUDE.md`+root `CLAUDE.md` updated · `FINAL.md` authored = L CLOSED; all 9 invariants verified at close |

## Dispatch gate (the IMPL precondition — inv-G1 lineage)

**Gate**: K.W2 substrate-green. **Status**: **OPEN** (K.W2 is BLOCKED-on-K.W1 at K's PROGRESS board as of 2026-06-02). L.W1+ dispatch is authorized only when the orchestrator confirms — and records below — that on the K.W2 baseline: `npm test` + `npx playwright test` (5 projects) + `npm run lint` + `vue-tsc --noEmit` (0 errors) all exit 0.

| Gate | Recommendation | VERDICT | Date |
|---|---|---|---|
| **K.W2 green substrate** | dispatch L.W1 after confirmed-green | **PENDING — awaiting K.W2 close** | — |

## Invariant ledger (design constraints — NOT proof scripts)

The `proof:*` grep-codification idiom is **retired as overfit**. Each invariant is enforced structurally and verified at close by `tsc` + `eslint` + the excision itself + a human-run grep in review — no committed script.

| Invariant | Statement | Enforced by | Lands |
|---|---|---|---|
| inv-L-1 | api `as any` = 0 | branded types + `eslint no-explicit-any` + close grep | L.W2 |
| inv-L-2 | api `as unknown as` ≤ 1 (the `index.ts:173` irreducible) | policy comment + close grep | L.W2 |
| inv-L-3 | no `sessionToken` / 4-state `status` anywhere in `api/src` | field deletion makes `tsc` reject reads + close grep | L.W3 |
| inv-L-4 | no ad-hoc `c.json({ error })` in middleware/routes | typed `ApiError` throws + close grep | L.W1 |
| inv-L-5 | no `services.repositories` in routes | service-owned `ownership.ts` + close grep | L.W1 |
| inv-L-6 | no raw `db.collection`/`getDb` outside repositories + factory | DI rewire + close grep | L.W2 |
| inv-L-7 | no `api/src` file > 350 LoC | decomposition + `wc -l` at close | L.W4 |
| inv-L-8 | no implicit/explicit `: any` params/returns | `noImplicitAny` + `eslint` + `tsc` 0 | L.W1 |
| inv-L-9 | no transitional drop-comments survive | comment deletion + close grep | L.W3 |

## Excise ledger summary (frozen at L.W0 — see `audit/excise-ledger.md`)

26 items: **excise** (8 — sessionToken ×5, status ×3 of the pure-deletes) · **fail-explicit** (6 — envelopes, route-leaks, DI-bypass, votes null, resolveOrigin, the `status` filter transpose) · **befitting-keep** (8 — the precept's justified graceful carve-outs: `as unknown as` close()-handle, `$count ?? 0`, stale-cursor→null, sanitize-body catch, audit-event catch, optional-body catch, version normalization ×2, proposal-11000 race). One brittleness window (L.W2, branded-types + DI-bypass atomic). Single-repo — no cohort.

## Carry-forward (potential successors — see `L.md §10`)

Booked-only (no L blocker): cron-txn monitor (re-check at `api/src/cron.ts` change) · bench-script extraction (re-check at `bench/` change) · any I-tail CRUD-conformance residual un-landed at K close (idempotency store · conformance suite · `id`-field removal · per-call-site ifMatch/idempotencyKey). L expects zero-deferral close: every ledger item LANDS or is BOOKED-befitting.
