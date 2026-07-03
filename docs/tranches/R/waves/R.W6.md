# R.W6 — TWIN-TIE (CRUD union + fourier pairing; independent of the demo lanes)

**Name**: W6 — Twin-tie (the CRUD-union LEAVE verdict made durable)
**Opens after**: R.W0 (substrate; runs parallel with R.W1 / R.W2 — no demo-lane dependency). R.W7 (wire + close) requires this wave.
**Spec of record**: `SYNTHESIS-v2.md §3 R.W6` (the M4-rescoped charter) + `§5` (the CRUD-union LEAVE verdict) + `§6` (the fourier-N charter) · `dispatch-homes.md PART A` (the Q9 resolution: A.0 decisive fact, A.1 fixture home, A.2 doc home, A.3 rescope wording).
**Agents**: 1, serial (value.js-tree writes), plus the one sanctioned fourier-tree paired-authoring write (item 4). The wave is a single agent unit; the §Goal criterion / §Completion criterion pair below is its unit-level Goal/Sub-gate pair.
**Hard gate**: the 5 inline shape rows green with no sibling checkout · the contract-of-record note present · the contract-currency invariant recorded · gates on nothing outside this repo.
**Status**: planned / DISPATCHABLE (RATIFIED-2026-07-03 — no owner Q-row gated this wave; Q9 is RESOLVED on the record: fixture-inline / doc-stays-put / pointer→FN-7; `PASS3-VERDICT.md §3` closed-rows line).

---

## §Charter

The CRUD twins (value.js `api/` × fourier-analysis) are wire-identical today and share no code — by design (`SYNTHESIS-v2.md §5`: extract impossible + rejected on both sides; converge already happened as the contract corpus). The one live risk is **silent twin-drift**, and it closes for the price of a fixture + a pair of contract-currency invariants. Everything this wave *lands* is value.js-tree-local; everything fourier-side is *paired-authoring work* that lands where fourier's docs land.

## §Goal criterion

The wire-envelope contract binding is durable inside value.js's own tree: the 5 shape vectors assert green in the local conformance probe with no sibling checkout anywhere in the path; the contract-currency invariant names exactly which file-changes re-open the twin question; the contract-of-record note makes the bilateral binding legible to a fresh reader of the R docs; and fourier's successor tranche (N) receives a charter that carries its half of the tie (FN-5 mirror invariant, FN-6 reader, FN-7 doc-home + pointer co-decision).

## §Completion criterion

The §Hard gate below — every condition verifiable against value.js-tree state only, per M4.

---

## §Items

### 1 · The 5 wire-envelope shape-fixture rows — INLINE in the existing probe (M4)

Add the 5 rows as **inline rows inside `api/test/conformance/diff.test.ts`** (the J.W2 probe whose docstring at `:5-6` already cites `fourier-analysis/docs/tranches/J/design/J-diff-shape.md §3/§4` as its source of rules, and whose wire-envelope block at `:121-153` already transcribes the four-field envelope). **NOT a co-located JSON file** — the form is committed to inline rows (dispatch-homes A.1): it keeps the vectors adjacent to the `expect(...)` assertions that transcribe §3/§4 and avoids a second artifact to keep current. Transcribed against `J-diff-shape.md` §3/§4:

| Row (named, binding) | Asserts |
|---|---|
| `changed-scalar` | a scalar atom change emits exactly one `changed` op carrying both `before` and `after` |
| `added-before-absent` | an `added` op has **only** `after` — `before` absent, never null |
| `removed-after-absent` | a `removed` op has **only** `before` — `after` absent, never null |
| `identical-empty-ops` | identical sets ⇒ `ops: []` (empty array, **never null**) and `identical: true` |
| `reorder-degrades-to-changed` | reorder produces **no `moved` op** — the op vocabulary is the closed triple `added`/`removed`/`changed` (§2.1) |

Each row's `atomValues` payload is repo-tagged and asserted **per-repo against value.js's own schema only** — never cross-asserted (J-diff-shape §6 BINDING; byte-parity is **struck permanently**: Python/JS float-repr `1.0`↔`"1"` + negative zero are irreducible, and the set-hash constructions differ structurally — 64-hex pipe-join vs 16-hex JSON-array, demonstrated to DIFFER on identical inputs). The fixture asserts **shape**.

### 2 · The contract-currency invariant (the value.js half; fourier FN-5 is its mirror)

RECORD (in this wave doc — here — and in the R.W6 close entry in `PROGRESS.md`): **any change to `api/src/lib/crud/atomdiff.ts`, `api/src/hash.ts`, the `PaletteVersion` shape (`api/src/models.ts:153`), or the URN catalog re-verifies the fourier twin and updates CONFORMANCE-MATRIX** — the value.js analog of fourier `inv-32`. Rationale rider (PASS1 P2-#17, discharged): `hash.ts`'s projection keys are hardcoded (`hash.ts:9-15`/`:27-30`) — a refactor-time key-order fragility, not runtime-reachable; this invariant is the guard that makes that fragility harmless. Currency is held by the **paired invariants** (this one + fourier FN-5), never by a shared file — duplication-with-invariant-guard is the constellation's existing, working pattern for the contract itself (dispatch-homes A.1).

### 3 · The in-tree contract-of-record note (M4 — value.js's own deliverable)

One line in the R docs (this section IS that note, and `R/FINAL.md` carries it forward):

> **Contract of record**: `fourier-analysis/docs/tranches/J/design/J-diff-shape.md` **§3/§4** is the bilateral wire-envelope contract for the CRUD twins. value.js binds to it **by transcription** (zero cross-repo reads — dispatch-homes A.0, verified): `api/test/conformance/diff.test.ts:5-6` cites it as the source of rules; the probe's assertions re-encode §3/§4 locally.

The doc stays physically where it is. The **CONSTELLATION.md pointer** that elevates it at the constellation index is a **fourier-tree write** (`CONSTELLATION.md` exists only at `fourier-analysis/docs/constellation/CONSTELLATION.md`; authoring it from an R lane would breach read-only-main-trees) — it **books to FN-7 alongside the relocation co-decision** (M4; a book — a recorded follow-up bound to a named trigger, never a gate). Neither is an R.W6 deliverable; this note de-urgents both.

### 4 · The fourier-N charter — paired-authoring work (fourier-tree write, at this wave)

Paired-author the FN charter into `fourier-analysis/docs/tranches/N/` (the one sanctioned sibling coordination path; fourier owns execution — its head tranche M is deploy/design-only, so these are net-new N candidates, `SYNTHESIS-v2.md §6` verbatim):

| # | Item | Shape |
|---|---|---|
| FN-1 | Heal the create/fork non-atomic root-version window via read-time/startup recompute (KISS, no replica-set dep) — or record the accepted gap as an invariant | small |
| FN-2 | Adopt `deletedAt`-leading compound indexes for gallery cursor sorts (the value.js `db.ts:51` lesson) | small |
| FN-3 | Optional: thin `repositories/visualization.py` seam (14× direct `get_db()` in the viz router) — a boundary, not a framework | optional |
| FN-4 | Unify problem+json construction under one FastAPI exception handler | low |
| FN-5 | Extend `inv-32`'s spirit to the CRUD twins: any `atomdiff.py`/version-shape/URN change re-verifies the value.js twin + CONFORMANCE-MATRIX (pairs with item 2 above) | invariant |
| FN-6 | Wire fourier's own reader for the wire-envelope shape fixture (value.js's rows are in-tree in value.js; fourier vendors its copy — recommended — or chooses otherwise; fourier-owned, guarded by FN-5) | small |
| FN-7 | Co-decide the contract-doc neutral home (relocation of `J-diff-shape.md`) **and author the CONSTELLATION.md pointer naming it the bilateral contract-of-record** (both fourier-tree writes, M4; value.js's item-3 note de-urgents them) | coordination |

fourier's FN-6 reader strategy is **fourier's call** — value.js neither dictates it nor reads from fourier's tree (dispatch-homes A.1).

The charter also **names the R8-18 carry** (fourier-owned: the CONFORMANCE-MATRIX corrections + the fourier-web pin bump) so the fold ledger's fourier-owned row travels with the document fourier will actually execute from (`SYNTHESIS-v2.md §10`).

### 5 · Optional: `canonical_digest` one-primitive adoption

If parity holds under value.js's own schema, adopt fourier's `canonical_digest` primitive in `api/src/hash.ts` — the one knowledge-transfer item flowing fourier→value.js (`SYNTHESIS-v2.md §5` tail: what crosses the seam is knowledge, not code). Optional; skipping it is not a miss. The three named twin divergences (layering, txn posture, index-lead order) are legitimate per-repo design choices — **do not "unify" them**.

---

## §Hard gate (rescoped to value.js-tree state ONLY — M4, verbatim per SYNTHESIS-v2 §3 R.W6)

- value.js's `diff.test.ts` probe asserts the 5 **inline** rows green **with no sibling checkout required** (the api suite runs in an isolated clone — the A.0 decisive fact preserved).
- The in-tree contract-of-record note present (item 3).
- The contract-currency invariant recorded (item 2).
- **The CONSTELLATION.md pointer and the fourier-N charter are fourier-tree writes booked to FN-7** — they are R.W6 *paired-authoring work* (item 4) but **not** value.js-local gate conditions.
- **Gates on nothing outside this repo.**

The struck framing stays dead: "shape + byte-parity" does not appear in any gate — byte-parity is impossible AND contract-forbidden (§5; dispatch-homes A.3).

The π visual-runtime lane (the paired before/after visual probe binding for visual-shipping waves) is SKIPPED: this wave is backend/doc-only — api conformance rows, records, and the paired-authored charter; no demo surface changes. This paragraph is the wave-spec skip justification `SPEC.md §"The π visual-runtime lane"` requires.

## §Triumvirate dispatch

A triumvirate (the mandatory research + plan-augment + redress escalation; `ORCHESTRATION.md §Triumvirate Auto-Triggers`) fires on: any file-bound expansion beyond §File bounds (in particular any pressure to change `atomdiff.ts`/`hash.ts` semantics rather than assert their shape — that re-opens the twin question, per item 2); any fixture row that cannot go green without a cross-repo read (a violation of the A.0 decisive fact, not a local edit); the third iteration of any parity-diagnostic loop under item 5.

## §File bounds + disjointness

| Surface | Access |
|---|---|
| `api/test/conformance/diff.test.ts` (the 5 inline rows) | modify |
| `api/src/hash.ts` (item 5, optional adoption only) | modify |
| `docs/tranches/R/` (this spec's records + the PROGRESS close entry) | modify |
| `fourier-analysis/docs/tranches/N/` (item 4 — the sanctioned paired-authoring write; fourier owns execution) | create |

Do NOT touch: `api/src/lib/crud/atomdiff.ts`, `api/src/models.ts`, `src/**`, `demo/**`, `docs/precepts/**`, anything else in the fourier tree. Single writer, one agent unit: disjointness holds trivially; no worktree plan.

## §Format + lint cadence

The api suite after the fixture rows land and before close: `cd api && npx tsc --noEmit` + the api vitest run (in an isolated clone, proving the no-sibling-checkout condition); `git diff --check` on the doc writes.

## §Verification artefacts

- The 5-row green test output from the isolated-clone run (the no-sibling-checkout proof).
- The charter file path in the fourier tree (item 4 delivery evidence).
- The `PROGRESS.md` close entry carrying the contract-currency invariant text (item 2) and the contract-of-record note (item 3); close commit hashes.

## §Commit plan + dependencies

One api-test commit (the fixture rows), one records/doc commit at close (+ the optional item-5 `hash.ts` adoption commit if taken); the fourier-tree charter lands under fourier's own commit conventions, orchestrator-authored (cross-repo pushes are never agent-authored). **Depends on**: R.W0 (substrate). **Blocks**: R.W7 (wire + close).

## §BOOKS opened/serviced by this wave (books, NEVER gates)

- **FN-7 doc-relocation co-decision + CONSTELLATION.md pointer** — fires on fourier-N execution; both fourier-tree writes (M4). The item-3 note holds the binding in the interim, so neither is urgent.
- **FN-6 fourier reader** — fourier-owned, guarded by FN-5; value.js takes no action at its landing.

## §Evidence packets consumed

`audit/pass2/dispatch-homes.md` (PART A — the Q9 resolution: A.0 zero-cross-repo-reads fact, A.1 inline-rows form, A.2 pointer-as-fourier-write, A.3 rescope wording) · `SYNTHESIS-v2.md §5` (the LEAVE verdict + byte-parity strike) + `§6` (the FN charter, verbatim) · `PASS3-VERDICT.md §1` (M4 in the dispatch-homes row) · `fourier-analysis/docs/tranches/J/design/J-diff-shape.md §3/§4` (the contract itself — read for transcription, never imported).

## §Hand-off

R.W7 records the contract-of-record note in `R/FINAL.md` and confirms the FN charter was delivered. fourier-N consumes the charter (fourier-owned from that point; FN-5 mirrors item 2). No demo lane consumes anything from this wave.
