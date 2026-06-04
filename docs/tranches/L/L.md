# L — The api/ legacy-excision + architectural-transposition tranche

**Tranche letter**: L — value.js's tenth tranche; the **backend fastidious-closure** tranche. Where K consummated the value.js ⇄ glass-ui *frontend* boundary, L brings `api/src` to the same invariant discipline `src/` already holds: zero legacy shims, zero ad-hoc error envelopes, zero un-encapsulated repository leaks, zero type-escape workarounds.
**Predecessor**: K — cross-repo cohesion (`docs/tranches/K/K.md`). L is K's named successor for the backend surface K's W2 api-lane only opened, never fully excised.
**Opened**: 2026-06-02 (split-K-plus-L decision: K absorbs the dev.sh + visual-evidence folds and stays as authored; L holds the `api/` excision and dispatches IMPL only after K.W2 restores green).
**Mode**: **planning-only at open.** This document authors no code. The api/src J work + `scripts/dev.sh` are already done — L does not touch them.

---

## §0 — Goal criterion + completion criterion (paired)

**Goal criterion (the aim).** Bring `api/src` to fastidious parity with the `src/` invariant regime. Every backend debt is either **excised at the root** (delete the field, the comment, the cast) or **converted to an explicit, typed failure** (throw the typed `ApiError`) — never silent carry. No "drop scheduled at I.W4" comment survives the close; no second representation of state K and `(visibility, tier)` already make canonical persists; no route reaches past the service wall into a repository. The precept governs the carve-outs: **no silent/graceful handling UNLESS befitting** — each kept graceful path is named and justified in the excise ledger.

**Completion criterion (the close gate).** L is CLOSED, on a green substrate (K.W2 restored), iff:

1. `sessionToken` appears nowhere in `api/src` — field, write, strip, or doc-comment. `userSlug` is the sole canonical owner; the `migrations/check.ts` probe requires `userSlug` (it already does) with the legacy-path comment removed.
2. The 4-state `status` field appears nowhere in `api/src` — no read, write, filter, projection, envelope, or validation schema. Canonical curation state is `(visibility, tier)`; the one load-bearing filter site (`crud-list.ts`) is *transposed* to a `(visibility, tier)` filter, not deleted.
3. `as any` count in `api/src` is **0**; `as unknown as` count is **1** (the policy-documented `@hono/node-server` `.close()` irreducible at `index.ts:181`).
4. No ad-hoc `c.json({ error … })` envelope survives in `api/src/middleware/` or `api/src/routes/` — every failure throws a typed `ApiError` routed through `onError → toResponseEnvelope`.
5. No route handler in `api/src/routes/` accesses `c.var.services.repositories.*` — the repository boundary is owned exclusively by the services layer.
6. No `getDb()`/`db.collection()` call outside `api/src/repositories/` and the inject-services factory — the `resolve-session.ts` DI-bypass is closed.
7. No `api/src` file exceeds **350 LoC** (G3 cap); `crud.ts`/`forks.ts`/`users.ts` decomposed below it.
8. `tsc` (`api/`) and `eslint` exit 0; full vitest + 5-project playwright exit 0; `docs/tranches/L/FINAL.md` carries the authoritative spec/test counts.

The §6 hard-gate list is the binding ledger. The §2 invariants are the design constraints those gates verify.

---

## §1 — Thesis

The K.W2 substrate audit proved `api/src` is **architecturally sound but fastidiously incomplete**. The DI seam, transaction coverage (H1, 16 wrapped sites), pipeline shape, and god-module discipline are all green — yet **two classes of debt leak through every audit lens.**

**First, transitional legacy that outlived its window.** The `sessionToken` ownership shim and the 4-state `status` field both carry "drop at I.W4" comments that I.W4 never executed. Both are now pure carry-cost: `userSlug` is the sole live ownership read; `(visibility, tier)` is the sole canonical curation state. `sessionToken` is write-only-then-stripped-at-format — dead weight. `status` is *almost* dead: one live query filter (`crud-list.ts`) keeps it load-bearing, which is precisely why naive deletion would break list-filtering and why the excision must be a transposition, sequenced bottom-up (writes → filter → projection → envelope → interface).

**Second, boundary erosion.** Five middleware/route sites return ad-hoc `{ error }` envelopes instead of throwing typed `ApiError` — silently forking the pipeline's single error contract so clients get a bare `{error}` shape instead of canonical `application/problem+json`. Four route handlers reach past the service boundary straight into repositories for ownership extraction + ETag pre-checks. One middleware (`resolve-session.ts`) bypasses the DI seam to call `db.collection()` raw, with two `as any` ObjectId casts.

L is the fastidious closure: each debt gets **excise** or **fail-explicit**, never silent carry. The single architectural transposition — branded `SessionToken`/`UserSlug` nominal types — converts the two `as any` casts from a workaround into an intentional one-time assertion *at the model boundary*, **retiring** (not relocating) the escape. The DI-bypass fix and the brand land as one atomic wave-lane so the two never half-land.

**The KISS / no-legacy line.** L *excises and converts*; it invents nothing. No new abstraction layer, no compat shim, no second state representation. `status` collapses into the single canonical `(visibility, tier)` source of truth (KISS + DRY). The grep-based `proof:*` codification idiom is **retired as overfit** — L's invariants are design constraints enforced **structurally** (branded types + `tsc` + `eslint` + the excision itself) and verified at close by a human-run review/grep check, not a committed script.

---

## §2 — Invariants (design constraints, not proof scripts)

L inherits the `src/` invariant regime (the `as any`/`as unknown as` budgets, no-`@deprecated`, no-`@ts-ignore`, cascade-correctness, the god-module cap) and extends it to `api/src`. **The grep-based `proof:*`-script idiom is retired as overfit** (per the K-arc shedding-ceremony decision; the 9 `scripts/proof-*.mjs` were intentionally deleted). Each L invariant is a **design constraint** enforced structurally and verified at close by `tsc` + `eslint` + the excision itself + a one-time human-run grep in review — **not** by a committed script.

- **inv-L-1 — api `as any` is zero.** Zero `as any` in `api/src`. The branded-types transposition retires the only 2 (`resolve-session.ts:35,47`); thereafter `eslint`'s `no-explicit-any` rule keeps it at zero structurally. *Verified at close by* `eslint` exit 0 + a `grep -rn 'as any' api/src` returning 0 in review.

- **inv-L-2 — api `as unknown as` ≤ 1.** At most one `as unknown as` in `api/` — the `@hono/node-server` `.close()` irreducible at `index.ts:181` (the library's `serve()` return type omits the `.close()` the underlying `http.Server` runtime provides; a third-party type-stub gap, not domain logic). *Verified at close by* a `grep` confirming the single hit is `index.ts` and carries its policy comment.

- **inv-L-3 — no legacy palette fields.** Neither `sessionToken` nor the 4-state `status` appears anywhere in `api/src` — field, write, filter, projection, envelope, or validation schema. Canonical ownership is `userSlug`; canonical curation state is `(visibility, tier)`. *Enforced structurally*: the fields are deleted from `models.ts`, so `tsc` rejects any surviving read/write at compile time (the deletion is itself the enforcement). *Verified at close by* `grep -rn 'sessionToken' api/src` → 0 and a palette-`status` read/write/filter/projection scan → 0.

- **inv-L-4 — no ad-hoc error envelopes.** Zero ad-hoc error-shaped `c.json({ error … })` in `api/src/middleware/` and `api/src/routes/`. Every failure throws a typed `ApiError` routed through `onError → toResponseEnvelope`. *Verified at close by* a `grep` for `c.json({ error` across middleware + routes → 0; behavioral parity confirmed by playwright (no status-code drift).

- **inv-L-5 — no route→repository leak.** No `api/src/routes/` handler accesses `c.var.services.repositories.*`. Routes call services only; the `validate → authn → authz → SERVICE → repository` boundary holds. *Verified at close by* a `grep` for `services.repositories` across `api/src/routes/` → 0.

- **inv-L-6 — DI seam holds (no raw db outside repositories).** Only `api/src/repositories/` and the inject-services factory call `getDb()`/`db.collection()`; middleware and services access data exclusively via `c.var.services.repositories`. *Verified at close by* a `grep` for `db.collection(`/`getDb()` outside `repositories/` + the factory → 0.

- **inv-L-7 — api god-module cap.** No `api/src` file exceeds 350 LoC (the project G3 cap). `crud.ts`/`forks.ts`/`users.ts` decomposed below the threshold with slack for cascade growth. *Verified at close by* `wc -l api/src/**/*.ts` showing no file > 350.

- **inv-L-8 — no implicit/explicit any params.** Zero `: any` parameter or return annotations in `api/src` — `resolveOrigin` (`index.ts:27`) re-typed with a minimal structural type. *Enforced structurally* by `tsconfig` `noImplicitAny` (already on under `strict`) + `eslint` `no-explicit-any`. *Verified at close by* `tsc` exit 0.

- **inv-L-9 — no transitional drop-comments survive.** No `Drop scheduled at I.W4` / `Legacy ownership shim` / `backward-compat during the … transition` comment strings remain in `api/src`. The excision is complete, not merely re-deferred — this guards against comment-only debt survival. *Verified at close by* a case-insensitive `grep` for those phrases → 0.

---

## §3 — Wave schedule

The **DEV/IMPL boundary** sits between L.W0 and L.W1. L.W0 is planning-only (charter ratification at K.W6 close). L.W1–L.W4 are IMPL and dispatch **only after K.W2 restores green** (the dispatch gate — see §11). The IMPL waves are sequenced by dependency: boundary fail-explicit (W1) is field-churn-free and lands first; the branded-types transposition (W2) is atomic with the DI-bypass fix; legacy-field excision (W3) is sequenced bottom-up and depends on W1's clean boundary; decomposition (W4) shrinks modules already lightened by W3's deletions.

| Wave | Disposition | Lanes | Hard gate |
|---|---|---|---|
| **L.W0 — Charter ratification** | DEV (planning, at K.W6 close) | A: ratify §0 goal+criterion · B: confirm the 26-item excise ledger dispositions against the live K.W2 substrate · C: freeze the ledger | `L.md` + `audit/excise-ledger.md` committed; ledger frozen; **BLOCKED on dispatch gate (K.W2 green)** |
| **L.W1 — Boundary fail-explicit** (no field churn) | IMPL | A: 5 ad-hoc envelopes → typed `ApiError` (+ `ForbiddenError` if the admin-token-mismatch case needs it) [inv-L-4] · B: 4 route repo-leaks → service-owned `services/palette/ownership.ts` (`getOwnerSlug`/`getPaletteETagData`) [inv-L-5] · C: `votes.ts` `?? 0` → explicit `NotFoundError` on in-txn re-read null · D: `resolveOrigin` structural type [inv-L-8] | `tsc` + `eslint` exit 0; vitest + playwright parity (no status-code drift); inv-L-4/5/8 grep-clean |
| **L.W2 — DI seam + branded types** (the architectural transposition) | IMPL | A: `SessionToken`/`UserSlug` branded nominal types in `types.ts` + brand `Session._id`/`User._id` in `models.ts` · B: `resolve-session.ts` → `c.var.services.repositories.{sessions,users}`; add `SessionRepository.findByTokenAndTouch` + `UserRepository.findBySlug`; delete `getDb()`/`db.collection()` [inv-L-6] · C: the 2 `as any` casts retire as a byproduct [inv-L-1] | inv-L-1/2/6 grep-clean; `tsc` exit 0; vitest + playwright parity |
| **L.W3 — Legacy field excision** (sequenced bottom-up) | IMPL | A: `sessionToken` — delete from `models` + `crud` + `forks` + `import` + the `format` strip [inv-L-3 partial] · B: `status` WRITES — `crud.ts:99` + `admin/palettes.ts` dual-write removed · C: `status` FILTER transposition — `crud-list.ts` → `(visibility, tier)` filter + `validation/palette.ts` query params · D: `status` projection (`flag.ts`) + envelope (`format/palette.ts`) + interface; migration-probe comment cleanup [inv-L-3 full, inv-L-9] | inv-L-3/9 grep-clean; **demo/ + api consumer scan confirms no `.status` reader before the envelope removal** (the deferred-from-I.W4 consumer migration, finally executed); vitest + playwright parity |
| **L.W4 — Decomposition + close** | IMPL | A: `crud.ts` → `crud-read`/`crud-write`/barrel · B: `forks.ts` → `forks-write`/`forks-read`/barrel · C: `users.ts` → `users-list`/`users-delete`/`users-status`/barrel [inv-L-7] · D: update `api/CLAUDE.md` + root `CLAUDE.md` conventions to cite the L invariants; author `docs/tranches/L/FINAL.md` with authoritative counts | inv-L-7 satisfied (no file > 350 LoC); ALL 9 invariants verified at close; full vitest + 5-project playwright + `eslint` exit 0; `FINAL.md` committed = L CLOSED |

---

## §4 — Modern-web spine mapping — **REFUTED**

L's surface is `api/src` — Hono + MongoDB, backend-internal. There is no browser, no DOM, no CSS, no visual runtime. The Chrome Modern-Web-Guidance catalog is **inapplicable in full** and is REFUTED-in-record (no invented work). Modern-web parity was K's concern (folded into K.W5 for the demo); it has no L analogue. No §4 levers; no §9 cohort (L is single-repo, value.js-internal — see §9).

---

## §5 — Critical files + ownership

| Surface | Files | Owning wave |
|---|---|---|
| Typed-error conversion | `api/src/middleware/admin-auth.ts` (`:21/25/29/32`), `sanitize-body.ts:33`, `resolve-session.ts:56`; `api/src/errors/` (add `ForbiddenError` if needed) | L.W1 |
| Ownership/ETag service helper (NEW) | `api/src/services/palette/ownership.ts` (`getOwnerSlug`, `getPaletteETagData`); the 4 callers `routes/palettes/crud.ts:97/113`, `publish.ts:31`, `versions.ts:54` | L.W1 |
| Vote in-txn null | `api/src/services/palette/votes.ts:62,79` | L.W1 |
| resolveOrigin type | `api/src/index.ts:27` | L.W1 |
| Branded nominal types | `api/src/types.ts` (`SessionToken`/`UserSlug`), `api/src/models.ts` (`Session._id`/`User._id` brands) | L.W2 |
| DI-seam restoration | `api/src/middleware/resolve-session.ts:31-47` (delete `getDb()`/`db.collection()`); `api/src/repositories/{session,user}.ts` (add `findByTokenAndTouch`/`findBySlug`) | L.W2 |
| `sessionToken` excision | `api/src/models.ts:84-85`, `services/palette/crud.ts:77,97`, `forks.ts:26,166,189`, `services/admin/import.ts:52`, `format/palette.ts:64-68` | L.W3 |
| `status` excision + transposition | `api/src/models.ts:87-92`, `services/palette/crud.ts:99`, `services/admin/palettes.ts:41/47/51/53`, `services/palette/crud-list.ts:90-93` (transpose), `validation/palette.ts:97`, `repositories/flag.ts:81`, `format/palette.ts:27-30,88`, `migrations/check.ts:54-55` | L.W3 |
| Decomposition | `api/src/services/palette/crud.ts` (300→read/write/barrel), `forks.ts` (251→write/read/barrel), `services/admin/users.ts` (249→list/delete/status/barrel) | L.W4 |
| Convention docs | `api/CLAUDE.md`, root `CLAUDE.md` (cite L invariants) | L.W4 |

The decomposition LoC targets are in `audit/excise-ledger.md`'s companion plan. Cohort-marked rows: none — L is single-repo.

---

## §6 — Hard gates (completion criterion)

- **L.W0**: `L.md` + `audit/excise-ledger.md` authored + reviewed; the 26-item ledger frozen against the live K.W2 substrate; **dispatch gate (K.W2 green) recorded as the IMPL precondition.**
- **L.W1**: zero `c.json({ error` in middleware + routes (inv-L-4); zero `services.repositories` in routes (inv-L-5); `resolveOrigin` structurally typed (inv-L-8); `votes.ts` throws `NotFoundError` on in-txn null; `tsc` + `eslint` + vitest + playwright exit 0 with **no HTTP-status-code drift** (the thrown-error codes match the prior literal 503/401/403/400).
- **L.W2**: `SessionToken`/`UserSlug` branded; `resolve-session.ts` reads via `c.var.services.repositories` (inv-L-6); zero raw `db.collection`/`getDb` outside `repositories/` + the factory; `as any` = 0 (inv-L-1); `as unknown as` = 1, the policy-documented `index.ts:181` (inv-L-2); `tsc` exit 0; suites parity.
- **L.W3**: `sessionToken` grep → 0; palette-`status` read/write/filter/projection/envelope/validation scan → 0 (inv-L-3); no deferral-comment residue (inv-L-9); the `crud-list.ts` filter is a working `(visibility, tier)` transposition (vitest list-filter test green); **the demo/ + api consumer scan confirmed no `.status` reader before envelope removal**; suites parity.
- **L.W4**: no `api/src` file > 350 LoC (inv-L-7); `api/CLAUDE.md` + root `CLAUDE.md` cite the L invariants; all 9 invariants verified at close (the human-run grep checks pass); full vitest + 5-project playwright + `eslint` exit 0; `FINAL.md` authored with authoritative counts.

**Invalid hard gates** (rejected): authoring any committed `proof:api-*.mjs` script (the grep-codification idiom is retired); a compat shim or dual-write that "keeps `status` working during migration" (no legacy, no workaround — the transposition is atomic per the bottom-up sequence); relocating the `as any` casts to call sites rather than retiring them at the model boundary (defeats the brand's purpose); silencing a graceful catch the ledger marks befitting-keep (those are intentional, justified carve-outs — see §2 of the ledger).

---

## §7 — Deferrals + brittleness-adjacent debt

L carries the **zero-deferral discipline**: every ledger item LANDS (excise or fail-explicit) or is BOOKED with rationale. The booked items here are the ledger's **befitting-keep** rows — graceful paths the "no silent handling UNLESS befitting" precept *retains*, each named + justified in `audit/excise-ledger.md`:

- `flag.countDistinctPalettes ?? 0` — MongoDB `$count` emits no `total` when zero groups match; `?? 0` IS the correct zero-groups semantic (gets a documenting comment, no code change).
- `decodeCursor` malformed/stale → null — the documented pagination semantic (stale cursor → page 1), per D3 befitting-graceful.
- `sanitize-body` malformed-JSON catch — $-key injection defense is this middleware's job; malformed JSON is the downstream zod `ValidationError`'s job (only the `:33` envelope inside it is excised).
- `emitAuditEvent` graceful catch — the canonical D3 / D-HARDEN-3 carve-out: audit-infra hiccup must not roll back a real admin op; the structured `console.error` is operator-visible.
- fork/remix + admin optional-body `c.req.json().catch(()=>({}))` — load-bearing: `/fork` + `/remix` support optional bodies; distinguishes empty-body from malformed-JSON (F-W2 Lane D).
- `versions.ts` `rootHash ?? parentRef` (legacy-row compat for pre-J rows; gets a comment) + `atomDiff ?? null` (deliberate undefined→null payload reshaping, not error-swallowing).
- color proposal `11000` duplicate-index race catch — defense-in-depth for a real pre-check/insert race; maps to the same `ConflictError` envelope.

No item is named-forward out of L; the tranche is self-contained to `api/src`.

---

## §8 — Brittleness window

L plans **one bounded brittleness window, in L.W2**, created by the branded-types + DI-bypass transposition landing as a single atomic unit:

- **The window**: branding `Session._id`/`User._id` touches every repository method that filters/inserts by `_id` (`session.ts`, `user.ts`), and the DI-bypass fix rewires `resolve-session.ts` from raw `db.collection()` to `c.var.services.repositories` in the same lane. While both are mid-flight, the session-resolution path is internally inconsistent.
- **Containment**: (1) the brand is applied at the **repository boundary**, keeping the DTO surface raw-string so the blast radius is bounded; (2) the DI-bypass fix and the brand land as **one atomic wave-lane** (L.W2.A+B+C) — they never half-land; (3) `injectServices` runs before `resolveSession` in the `index.ts` middleware order, so `c.var.services` is guaranteed present when the rewired middleware reads it; (4) verify no third collection accidentally shares the brand.
- **Exit**: the window closes when L.W2's gates pass (zero raw db, zero `as any`, `tsc` + suites green). After L.W2 the session-resolution path is stable and inv-L-1/2/6 hold permanently.

L.W3 (field excision) is sequenced bottom-up so that at no commit does the filter read a field no longer written — it is reversible at each step's own boundary, not a brittleness window. L.W1 + L.W4 are additive against the then-stable substrate.

---

## §9 — Cohort coordination — **N/A**

L is **single-repo**: every L surface is `value.js`-internal `api/src`. There is no cross-repo cohort, no paired-authorship, no peer-tranche pin. The fourier boundary stays closed (inv-I-1, unchanged); the glass-ui boundary K opened is not L's concern (L touches no glass-ui source). No `coordination/` directory.

---

## §10 — Successor

L's successor inherits, if surfaced: the booked monitors K carried forward that touch `api/` (cron transactional semantics — re-check at any `api/src/cron.ts` change; the bench-gate script extraction — re-check at any `bench/` change); the I-tail CRUD-conformance residuals K folded into its W2 api-lane *if any remain un-landed at K close* (the Idempotency-Key replay store, the per-repo `api/test/conformance/` suite, the `id`-field hard-removal, the per-call-site `ifMatch`/`idempotencyKey` adoption). The L-SEED authored at close (`FINAL.md`) enumerates these with E5 triggers. L expects to close zero-deferral: every ledger item LANDS or is BOOKED-befitting (§7).

---

## §11 — Mode + authority

**Mode**: planning-only at open. This document authors **no code**; L.W0 (ratification) is DEV; L.W1–L.W4 are IMPL.

**Dispatch gate (the binding precondition).** L's IMPL **dispatches only after K.W2 restores the green substrate.** Concretely, IMPL is hard-blocked until, on the K.W2 baseline: `npm test` (vitest, jsdom) + `npx playwright test` (all 5 projects: smoke / smoke-admin / smoke-mobile / smoke-reactivity / smoke-safari) + `npm run lint` all exit 0, AND `vue-tsc --noEmit` reports 0 errors. No L excision may merge against a red substrate, because every L excision (legacy-field deletion, branded-type migration, envelope-throw conversion) is verified by re-running the full vitest + playwright + lint + `tsc` fleet against a known-good baseline — without it, a regression cannot be distinguished from a pre-existing K-substrate failure. **L.W0 records the dispatch as: IMPL dispatch authorized after K.W2-green is confirmed by the orchestrator and noted in `PROGRESS.md`.**

**Authority**: the split-K-plus-L decision of 2026-06-02 (K stays as authored and absorbs the dev.sh + visual-evidence folds; L is the new successor holding the `api/` backend legacy-excision). The `proof:*` grep-codification idiom is **retired** (shedding-ceremony decision: the 9 `scripts/proof-*.mjs`, CHANGELOG.md, CONTRIBUTING.md, VENDOR-POLICY.md, and the migrate scripts were intentionally deleted — never referenced as live). L's invariants are enforced structurally (branded types + `tsc` + `eslint` + the excision itself + close-time human-run review/grep), never by committed scripts. NO legacy, NO workarounds, idiomatic gestalt.
