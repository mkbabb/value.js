# L — FINAL (the api/ legacy-excision + architectural-transposition tranche)

**Status: CLOSED 2026-06-04** on branch `docs/constellation-grand-audit-2026-06-03`.
Commit chain `2f5bc10..` (L.W0 ratification) → `c690118` (L.W1) → `d86d75d` (L.W2)
→ `17b6148` (L.W3) → this FINAL (L.W4). Single-repo, value.js-internal `api/src`
(+ the demo consumers of the excised palette fields). No cohort; the fourier
boundary stayed closed; no glass-ui source touched.

L brought `api/src` to the `src/` invariant regime: zero legacy shims, zero ad-hoc
error envelopes, zero un-encapsulated repository leaks, zero type-escape
workarounds. Every backend debt was **excised at the root** or **converted to an
explicit typed failure** — never silent carry.

---

## §1 — Authoritative counts (measured at close)

| Metric | Value |
|---|---|
| api `tsc --noEmit` | exit 0 |
| api vitest | **161 passed / 28 files** (was 159 at dispatch; +2 list-filter coverage in L.W3) |
| library/demo vitest | 1584 passed / 34 files (L-invariant) |
| `eslint .` (root, covers api) | exit 0 |
| `vue-tsc` (check-types, lib + demo) | 0 value.js errors |
| playwright (5 projects) | 12 passed / 24 failed / 1 did-not-run — **identical to the dispatch baseline** (all failures pre-existing demo-side/backend-integration; the lone run-to-run delta is a flake-swap between two `smoke-admin` view-tests, both proven non-deterministic + L-unreachable) |
| `api/src` `as any` | **0** (inv-L-1) |
| `api/src` `as unknown as` | **1** — the `@hono/node-server` `server.close()` irreducible at `index.ts` (inv-L-2) |
| MongoDB indexes | **26** (was 27 — the `palettes` legacy `status` index excised; `palettes` 9→8) |
| largest `api/src` file | `services/palette/crud.ts` **296 LoC** — no file > 350 (inv-L-7) |

## §2 — The 9 invariants (verified at close)

All verified by a 3-auditor independent close-audit (greps + suite re-runs against
the committed tree), not a committed `proof:*` script (that idiom is retired).

| Invariant | Statement | Verdict |
|---|---|---|
| inv-L-1 | api `as any` = 0 | ✅ `grep -rn 'as any' api/src` → 0 |
| inv-L-2 | api `as unknown as` ≤ 1 (the `index.ts` `server.close()` irreducible) | ✅ exactly 1, policy-commented |
| inv-L-3 | no `sessionToken` / 4-state `status` in `api/src` | ✅ palette-field survivors = 0 (auth var distinct, survives) |
| inv-L-4 | no ad-hoc `c.json({ error })` in middleware/routes | ✅ grep → 0 |
| inv-L-5 | no `services.repositories` in routes | ✅ grep → 0; `services/palette/ownership.ts` owns the reads |
| inv-L-6 | no raw `db` outside repositories + factory | ✅ request pipeline clean; `resolve-session.ts` on the DI seam |
| inv-L-7 | no `api/src` file > 350 LoC | ✅ largest 296 |
| inv-L-8 | no implicit/explicit `: any` params | ✅ `tsc` 0; `resolveOrigin` structural |
| inv-L-9 | no transitional drop-comments | ✅ palette-context grep → 0 |

## §3 — What each wave landed

- **L.W0 (ratify)** — confirmed the dispatch gate (`L.md §11`): on the K.W2 head
  the api surface (tsc + 154 tests + lint) + the demo fleet (vue-tsc + 1584 lib
  tests) were green; the playwright 12/24/1 was pinned as the pre-existing
  orthogonal baseline. Reconciled the 26-item ledger against the live substrate
  (3 findings: the `forks.ts:90` second status-write; the inv-L-6 startup-context
  scoping; **inv-L-7 already met** → W4 re-scoped to verify-not-split).
- **L.W1 (boundary fail-explicit)** — 6 ad-hoc envelopes → typed `ApiError`
  throws (+ `ForbiddenError`; `sanitize-body`'s `$`-key throw restructured to sit
  outside the befitting-keep malformed-JSON catch); 4 route repo-leaks → the new
  `services/palette/ownership.ts`; `votes.ts` in-txn null → `NotFoundError`;
  `resolveOrigin` structurally typed. Status codes preserved site-by-site.
- **L.W2 (DI seam + branded types — the atomic brittleness window)** — `SessionToken`
  /`UserSlug` branded nominal types (in `models.ts`, an acyclic deviation from the
  planned `types.ts` home — documented); `resolve-session.ts` rewired onto
  `repositories.{sessions.findAndTouch, users.findBySlug}`; both `as any` casts
  retired at the model boundary. Landed whole in one commit.
- **L.W3 (legacy field excision — bottom-up)** — `Palette.sessionToken` + the
  4-state `status` excised full-stack (writes → filter-transpose-to-`(visibility,
  tier)` → projection → envelope → interface → index → migration), the deferred-
  from-I.W4 demo consumer migration finally executed (`statusFilter`→`tierFilter`,
  `SearchFilterBar` `Status`→`Tier`, `palette.tier`, `updatePaletteTier`),
  `migrations/migrate-visibility-tier.ts` deleted whole. The scan phase caught 5
  ledger inventory-misses (excise-ledger §1.1). **Recovery:** the first run's
  status-api agent crashed mid-excision (a `StructuredOutput` emission failure
  that left the tree RED at the bottom-up handoff); reverted to clean L.W2,
  re-ran hardened (verified work-order injected, status-api split into shorter-turn
  agents) → green.
- **L.W4 (close)** — inv-L-7 verified by measurement (no split: splitting cohesive
  sub-350 modules into read/write/barrel triplets would be the contrivance the
  KISS/no-god-module discipline forbids — see §4); `api/CLAUDE.md` (26 indexes +
  the L-invariants block) + root `CLAUDE.md` (the `as any` + boundary-closure
  conventions) updated; this FINAL.

## §4 — The W4 decomposition re-scope (verify-not-split)

`L.md §3/§5` specced an L.W4 decomposition of `crud.ts`/`forks.ts`/`users.ts` into
read/write/barrel triplets, on the assumption they exceeded the 350-LoC G3 cap. At
L.W0 (and again post-W3) measurement refuted the assumption: `crud.ts` 296,
`users.ts` 249, `forks.ts` 246 — all comfortably under cap, and W3's excisions
shrank them further. **inv-L-7 is met without decomposition.** Splitting cohesive
~250–300 LoC service modules purely to execute the plan — when the only stated
trigger (the LoC cap) is already satisfied — is precisely the KISS/no-contrivance
anti-pattern the project discipline forbids (a god-module split is for shrinking
*over-cap* modules, not for fragmenting healthy ones). The honest close verifies
the cap; the `ownership.ts` lift (L.W1.B) was the one genuinely-warranted new
module and it landed. This re-scope is itself zero-deferral: nothing is booked
forward — the invariant the decomposition existed to serve is satisfied.

## §5 — Befitting-keeps retained (ledger §2, the precept's justified graceful paths)

The 8 graceful paths the "no silent handling UNLESS befitting" precept retains —
all confirmed untouched at close: the `index.ts` `server.close()` cast (inv-L-2's
1); `flag.ts` `countDistinct ?? 0` (zero-groups semantic); `crud-list.ts`
`decodeCursor` stale→null (pagination semantic); `sanitize-body` malformed-JSON
catch (downstream zod's job); `auditLog` graceful catch (audit-infra hiccup must
not roll back a real op); fork/remix/admin optional-body catch (load-bearing
empty-vs-malformed distinction); `versions.ts` `rootHash ?? parentRef` +
`atomDiff ?? null` (legacy-row compat + payload reshaping); color-proposals 11000
race catch (defense-in-depth).

## §6 — L-SEED (successor carry-forward, per `L.md §10`)

Booked-only, no L blocker — re-check at the named trigger (E5):
- **cron transactional semantics** — re-check at any `api/src/cron.ts` change.
- **bench-gate script extraction** — re-check at any `bench/` change.
- **I-tail CRUD-conformance residuals** — K.W2's api-lane landed the idempotency
  replay store, the `api/test/conformance/` suite, the `id`-field removal, and the
  per-call-site `ifMatch`/`idempotencyKey`; if any sub-item is found un-landed at a
  future api change, it inherits here.

L closed **zero-deferral**: every one of the 26 ledger items LANDED (excise /
fail-explicit) or is a named befitting-keep (§5). No item is named-forward beyond
the E5-triggered monitors above.

---

**Close gate (all green):** api `tsc` 0 · api vitest 161/161 · lib vitest 1584 ·
`eslint` 0 · `vue-tsc` lib+demo 0 · playwright = baseline · all 9 invariants
verified by independent close-audit · both `CLAUDE.md` files cite the L invariants.
**L is CLOSED.**
