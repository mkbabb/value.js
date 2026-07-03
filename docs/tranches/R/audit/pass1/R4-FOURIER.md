# R4-FOURIER — fourier-analysis db/CRUD health + the CRUD-UNION verdict

**Lane**: R4-FOURIER (value.js Tranche R, pass 1)
**Date**: 2026-07-02
**Scope**: audit fourier-analysis's db/CRUD layer for health + uplift; deliver the
CRUD-UNION verdict groundwork (shared vs copy-pasted vs divergent between value.js
palette CRUD and fourier viz CRUD); name fourier uplift items for a fourier-N
tranche; name what value.js Tranche R must carry on its side of the union.
**Mode**: READ-ONLY (tranche development). No source touched in either repo.

---

## §0 — TL;DR

1. **fourier's db/CRUD layer is HEALTHY and disciplined.** It carries the same
   SOTA CRUD contract value.js does — RFC 9457 `application/problem+json` with a
   closed `urn:contract:*` catalog, strong-validator ETag/`If-Match`, 24h-TTL
   idempotency store, opaque base64url cursors, `deleted_at` soft-delete, crypto
   slug mint, and ONE `canonical_digest` serialize-then-hash primitive. No schema
   drift, strong index hygiene, no `as`-cast epidemic (Pydantic — the whole
   `WithId<T>` cast class doesn't exist in Python).

2. **The CRUD-UNION verdict is LEAVE-ALONE / paired-convergence-of-CONTRACT —
   NOT extract-a-shared-package.** The two APIs are cross-language (fourier =
   Python/FastAPI/Pydantic/motor; value.js = TypeScript/Hono/mongodb). A shared
   runtime package is *impossible* and was *deliberately rejected* (fourier
   `inv-16`: "shared by contract; per-language utility modules admitted; frameworks
   rejected"). The union already EXISTS and is HEALTHY: it is the shared **contract
   docs** (`CRUD-CONTRACT.md` v2.0.0 + `SCHEMA.md` + `CONFORMANCE-MATRIX.md` 187
   rows + `J-diff-shape.md`), hand-typed twice. value.js already converged its
   error-type URNs onto `urn:contract:*` at N.W3.H. There is **nothing to extract**;
   the correct move is to KEEP the contract current and let each repo hand-type it.

3. **Three genuine DIVERGENCES worth naming** (none a defect, all worth a note):
   (a) **layering** — value.js holds a route→service→repository seam (only
   `repositories/` touch `db`); fourier routers call `get_db()` directly (14× in
   `visualizations.py`), no repository boundary for viz CRUD. (b) **transaction
   posture** — value.js wraps cross-collection writes in `withTransaction` (needs a
   replica set); fourier uses ZERO Mongo transactions, relying on content-addressed
   idempotent version inserts + self-healing counters + write-ordering
   (crash-safe-by-construction). (c) **soft-delete index shape** — value.js leads
   its compound gallery indexes with `deletedAt`; fourier leads with `visibility`
   and treats `deleted_at` as a non-indexed residual predicate.

4. **fourier's next letter is N.** Its current head tranche **M** (authored
   2026-06-16, NOT executed — awaits "Begin") is a huge deploy+design+motion
   convergence tranche; **the db/CRUD layer is out of M's scope entirely** (it was
   finished through J/M substrate). So the db/CRUD uplift items below are net-new
   fourier-N candidates, not M residuals.

5. **value.js Tranche R's side of the union**: keep the `atomdiff` twin + the
   `urn:contract` catalog + the version-chain shape in lock-step with any fourier
   contract revision; there is NO code to extract or converge on value.js's side —
   R carries a **contract-currency invariant** (the value.js analog of fourier's
   `inv-32` version-currency), not a refactor.

---

## §1 — fourier db/CRUD health audit

### 1.1 The crud lib (`api/lib/crud/`, 721 LoC, 10 modules)

fourier factored its CRUD SOTA into a pure utility package — one module per
CRUD-CONTRACT section, explicitly **NOT** a `BaseCRUDRouter`/`CRUDMixin`/
`@crud_endpoint` framework (`__init__.py:29-36`: "The Wχ.P1 `framework-in-disguise`
probe rejects any helper that owns the request lifecycle. Each router composes the
helpers explicitly"). This is the same anti-god-module discipline value.js holds.

| Module | LoC | Role | value.js twin |
|---|---|---|---|
| `errors.py` | 80 | RFC 9457 `problem()` builder + 20-row closed `urn:contract:*` catalog via `functools.partial` | `api/src/errors/index.ts` (`ApiError` → `toResponseEnvelope`) |
| `etag.py` | 50 | strong ETag over mutable-field projection + `require_if_match` (428/412) | `api/src/middleware/etag.ts` |
| `idempotency.py` | 89 | Mongo-backed `Idempotency-Key` replay store, 24h TTL, `replay_or_record` callback (not a decorator) | `api/src/middleware/idempotency.ts` |
| `cursors.py` | 79 | opaque `base64url(json({id,sort_key,sort_value}))` + stale-sort detection | value.js `palettes` list cursor (crud-list.ts) |
| `softdelete.py` | 72 | `deleted_at` mixin + `soft_delete`/`restore` (30d grace) — no cascade | `models.ts:137 deletedAt` + `cron.ts` reaper |
| `slugs.py` | 68 | `secrets.choice` 4-word slug + insert-then-catch-DuplicateKey retry | `slugWords.ts generateUniqueSlug` |
| `canonical_digest.py` | 47 | THE ONE serialize-then-hash primitive (ETag + content_hash + atom_hash + set_hash all derive from it) | `hash.ts computeContentHash/computeAtomHash/computeAtomSetHash` |
| `atomdiff.py` | 145 | per-atom set-difference (the J-era shared piece) | `api/src/lib/crud/atomdiff.ts` |
| `pinned_cron.py` | 49 | `pinned` flag + bounded batched cron prune (retires unbounded `$nin`-over-`distinct()`) | value.js `cron.ts` reaper |

**Verdict: HEALTHY.** This is a mature, well-decomposed CRUD substrate. The
`canonical_digest` unification (three ad-hoc "canonicalise-a-dict-then-sha256"
mechanisms collapsed to one primitive over three projections, `canonical_digest.py:1-32`)
is *more* elegant than value.js's `hash.ts`, which still has three sibling
functions rather than one primitive over three projections (a candidate
cross-pollination INTO value.js — see §4).

### 1.2 Typed-error boundary — PASS

fourier's error boundary matches value.js's discipline: every failure returns a
typed `problem()` `JSONResponse` with `media_type="application/problem+json"` and a
`urn:contract:<kebab>` type URI (`errors.py:57-79`). The catalog is closed (20
named partials). This is the exact contract value.js's `ApiError` subclasses now
emit after N.W3.H's URN convergence (`api/src/errors/index.ts:24-49` documents the
convergence onto `fourier-analysis/.../CRUD-CONTRACT.md v2.0.0 §5`). **The two
repos are wire-identical on the error envelope.**

One nuance: fourier does NOT have a single global `onError` mapper the way value.js
does (`app.onError → toResponseEnvelope`). Instead each handler *returns* an
`errors.<row>()` response directly, and the ETag/cursor helpers `raise
HTTPException` with the problem body stuffed in `.detail` (`etag.py:44`,
`cursors.py:34`). This is a minor stylistic divergence (return-vs-raise), idiomatic
for FastAPI; it is NOT a defect but it does mean fourier's problem+json envelope is
constructed at ~two layers (direct return + HTTPException-detail-unwrap) rather than
one. Low-priority uplift candidate (§3).

### 1.3 Index hygiene — STRONG, one shape-divergence

`api/services/database.py` declares a comprehensive, query-shape-matched index set
(37 `create_index` calls). Every gallery cursor sort has a matching compound index:
`(visibility, created_at, _id)`, `(visibility, views, _id)`, `(visibility, likes,
_id)`, `(visibility, fork_count, _id)` (`database.py:109-125`), plus the janitor's
bounded `(pinned, last_accessed_at)` prune index on every content collection.
Version reads use `(viz_slug, depth)` (`database.py:132`). TTL indexes on
`sessions.expires_at` and `idempotency.created_at`. There's even a
conflict-resolution branch that drops+recreates a mis-typed TTL index
(`database.py:86-89`). **This is disciplined index hygiene.**

**The one divergence**: fourier's gallery compound indexes lead with `visibility`,
so the near-universal `{visibility: "public", deleted_at: None}` filter treats
`deleted_at: None` as a **non-indexed residual predicate** (fetch-then-discard).
value.js explicitly REDESIGNED its palette indexes to lead with `deletedAt`
(`api/src/db.ts:51`: `{deletedAt:1, visibility:1, createdAt:-1}`), with a code
comment that a partial index "forced the planner to filter deletedAt/visibility."
value.js learned this lesson; fourier hasn't adopted it. Impact is small while
soft-deleted rows are rare, but it's a genuine cross-pollination item (§3 UPLIFT-2).

### 1.4 Transaction / atomicity posture — DIVERGENT-BY-DESIGN, one small durability gap

fourier uses **ZERO MongoDB transactions** (grep for `start_session` / `with_transaction`
across `api/**.py` = 0 hits). Its cross-collection writes (`visualizations` +
`visualization_versions`, and the `fork_count` counter) are made non-atomically and
kept correct by construction:

- **content-addressed idempotent version inserts** — a root version's `_id` is
  `f"{viz_slug}:{set_hash}"`, and `_write_root_version` swallows `DuplicateKeyError`
  (`visualizations.py:145-148`), so a re-insert of the same (viz, atoms) is a no-op
  (the "§11 crash-safe property").
- **self-healing counters** — the fork path bumps `source.fork_count` LAST and
  conditionally, documented as "self-healing — an over-count is cosmetic"
  (`visualizations.py:598-600`).
- **write-ordering** — viz row first, then version, then counter.

This is a legitimately elegant, replica-set-free design that AVOIDS the need for
transactions — arguably *simpler* than value.js's `withTransaction` (which forces
the `rs0` replica-set dependency documented in `api/CLAUDE.md`). It is NOT a defect.

**BUT one small durability asymmetry exists**: in `create_visualization`, the viz
row is inserted (`visualizations.py:219`) THEN the root version
(`visualizations.py:220`). If the process dies between those two awaits, you get a
viz row with **no root version**, and nothing re-drives the version write — reads
of `/versions` would return empty for that row until the next remix. fourier
accepts this (the version is derivable from the live row's atoms; it's cosmetic for
an un-forked original). value.js's transaction closes exactly this window for
`createPalette`. This is worth a NOTE, not a fix — but if fourier-N ever wants
create/fork to be genuinely atomic, the lever is either a transaction (costs the
replica-set dep) or a startup/read-time "heal missing root version" recompute (KISS,
no new dep). See §3 UPLIFT-1.

### 1.5 Schema / model discipline — PASS

`models/visualization.py` is a converged single-entity Pydantic model
(`Visibility` 3-state enum, required non-null `owner_slug`, `deleted_at` soft-delete
via `SoftDeleteMixin`, `extra="forbid"` on every model). The version collection
(`VisualizationVersion`) is the one genuinely-new persisted shape and it explicitly
mirrors value.js's `PaletteVersion` (comment at `visualization.py:137-138`: "The
substrate fourier INHERITS from value.js's proven `Palette` shape"). The response
twins (`DiffResponse`, `ProvenanceResponse`, `VersionsResponse`) are hand-typed
(no codegen — `inv-26`, documented at `visualization.py:294-296`). No schema drift
observed; legacy identity schemes (uuid4 token / ObjectId / IndexedDB key) were
already collapsed at fourier-B.W3 onto the one slug identity.

The `WithId<T>` / branded-id / `as`-cast discipline the task asks me to compare
against **does not map to fourier**: that class of problem is TypeScript+mongodb-
driver-specific (the driver's `WithId<T>` return type forcing casts). Pydantic uses
`model_validate(doc)` + `_id` field aliasing, so there are no id-casts to count.
value.js's WithId-0-cast and branded `SessionToken`/`UserSlug` discipline is a
TS-only concern with no fourier analog.

---

## §2 — The CRUD-UNION verdict (groundwork)

### 2.1 What is actually shared vs copy-pasted vs divergent

| Facility | value.js | fourier | Relationship |
|---|---|---|---|
| **atom-diff** | `lib/crud/atomdiff.ts` (keys by `PaletteColor.position`) | `lib/crud/atomdiff.py` (keys by 5 config atoms) | **Shared-by-CONTRACT twin.** Both bind `J-diff-shape.md`; identical wire envelope (`{from_hash,to_hash,ops,identical}`, op vocab `added/removed/changed`); atom VALUE differs per repo. Explicitly "no shared package, no codegen (inv-16/inv-26)." |
| **version chain** | `PaletteVersion` (`parentHash/forkedFromHash/rootHash/depth/atomDiff`) | `VisualizationVersion` (same fields) | **Shape-shared twin.** fourier's comment: "INHERITS from value.js's proven Palette shape." Hand-typed each side. |
| **problem+json errors** | `ApiError`→`toResponseEnvelope`, `urn:contract:*` | `errors.problem()` + `urn:contract:*` catalog | **Shared vocabulary (contract catalog).** value.js converged onto fourier's URN namespace at N.W3.H. Wire-identical envelope; builder code is per-language. |
| **ETag / If-Match** | `middleware/etag.ts` | `lib/crud/etag.py` | **Convergent semantics** (strong validator, 428/412), independent impls. Both are `canonical_digest`-over-mutable-projection. |
| **idempotency** | `middleware/idempotency.ts` | `lib/crud/idempotency.py` | **Convergent semantics** (Mongo replay store, 24h TTL, key+scope unique, 409 on body-hash mismatch). Independent impls. |
| **cursors** | palette list cursor | `lib/crud/cursors.py` | **Convergent shape** (`base64url(json({id,sort_key,sort_value}))`). `cursors.py:9-10` literally cites unifying `gallery.py` and value.js `palettes.ts` into one form. Independent impls. |
| **soft-delete** | `deletedAt` + cron reaper | `lib/crud/softdelete.py` + `pinned_cron.py` | **Convergent semantics.** Independent impls; index-shape divergence (§1.3). |
| **slug mint** | `slugWords.ts` | `lib/crud/slugs.py` | **Convergent** (4-word crypto RNG, insert-then-catch retry). Independent impls + independent word lists. |
| **canonical hash** | `hash.ts` (3 sibling fns) | `canonical_digest.py` (1 primitive, 3 projections) | **Convergent output** (byte-compatible canonical JSON). fourier's is more unified (§4). |

**There is ZERO copy-pasted code between the repos** (cross-language makes it
impossible). Everything is either (a) a **contract-shared twin** hand-typed on both
sides against a repo-neutral doc, or (b) **convergent-by-independent-implementation**
of the same CRUD-CONTRACT section.

### 2.2 Extraction-candidate analysis + costs

- **A shared runtime package?** → **NO. Rejected, correctly.** The two runtimes are
  Python and TypeScript. A shared npm/PyPI package would require either (i) a codegen
  seam (fourier `inv-26` forbids it; both repos hand-type deliberately) or (ii)
  picking one host language and FFI/subprocess-bridging the other (absurd for a
  145-LoC pure function). Cost: enormous complexity for negative benefit. The
  existing "shared-by-contract" design is the *correct* SOTA answer and is already
  codified as an invariant on both sides.

- **A shared CONTRACT (docs)?** → **ALREADY EXISTS, keep-current.** The union is
  `CRUD-CONTRACT.md` v2.0.0 + `SCHEMA.md` + `CONFORMANCE-MATRIX.md` (187 rows) +
  `J-diff-shape.md`, all under `fourier-analysis/docs/tranches/{B,J}/`. value.js
  already binds to these (see `errors/index.ts`, `services/palette/diff.ts`,
  `models.ts` comments). The only "extraction" that would help: **relocate the
  contract docs out of `fourier-analysis/docs/tranches/B/coordination/` into a
  constellation-neutral home** so value.js isn't importing its contract-of-record
  from a *sibling's tranche folder*. Cost: low (a doc move + a `CONSTELLATION.md`
  pointer). Benefit: the contract stops looking fourier-owned when it's genuinely
  bilateral. This is a **coordination ask**, not a code change. (Candidate for R or
  fourier-N — whoever moves first; see §5.)

- **Paired convergence (keep twins, tighten the tie)?** → **YES, this is the live
  seam.** The twins can drift silently: nothing today FAILS if value.js's `atomdiff.ts`
  wire shape diverges from fourier's `atomdiff.py`. The `CONFORMANCE-MATRIX.md`
  parity rows are the intended guard, but they're per-repo test rows, not a
  cross-repo diff. The cheap tightening: a **shared golden-vector fixture** (a JSON
  file of canonical diff inputs→outputs) that BOTH repos' tests assert against — so a
  wire divergence reddens a test on both sides. Cost: low (one fixture file + two
  test readers). This is the single highest-value union action and belongs to
  whichever tranche executes next.

### 2.3 Union verdict

> **LEAVE-ALONE the code; KEEP-CURRENT the contract; TIGHTEN the twin-tie with a
> shared golden-vector fixture.** No shared package. No cross-language extraction.
> The union is a *contract*, it already exists, it is healthy, and both repos already
> bind it. The only live risk is silent twin-drift, closed cheaply by a shared
> conformance fixture + a doc relocation to a neutral home.

---

## §3 — fourier uplift items (candidates for a fourier-N tranche)

fourier's head tranche M is authored-not-executed and is entirely deploy/design/
motion — the db/CRUD layer is out of its scope. These are net-new fourier-N candidates:

- **UPLIFT-1 (durability, low)** — close the create/fork non-atomic window (§1.4)
  with a read-time/startup "heal missing root version" recompute (KISS, no new dep),
  OR document the accepted-gap explicitly as an invariant. Do NOT reach for
  transactions (costs the replica-set dep fourier deliberately avoids).
- **UPLIFT-2 (index hygiene, low)** — adopt value.js's `deletedAt`-leading compound
  index shape for the gallery cursor sorts (§1.3), so `deleted_at: None` is index-
  covered rather than a residual filter. Cross-pollination from value.js `db.ts:51`.
- **UPLIFT-3 (layering, medium/optional)** — fourier viz routers call `get_db()`
  directly (14× in `visualizations.py`); there is no repository/service seam for viz
  CRUD (value.js holds route→service→repository, only `repositories/` touch `db`).
  This is idiomatic FastAPI and NOT required, but if fourier-N wants the value.js
  boundary discipline, a thin `repositories/visualization.py` would localize the
  `db.visualizations` access now scattered across the router. Weigh against the
  deliberate "no framework-in-disguise" stance — this is a boundary, not a framework,
  so it's compatible. OPTIONAL.
- **UPLIFT-4 (error-envelope uniformity, low)** — fourier constructs problem+json at
  two layers (direct `errors.<row>()` return + `HTTPException(detail=...problem body)`
  in etag/cursor helpers, §1.2). A single FastAPI exception handler that renders a
  typed `ContractError` (value.js's `onError` analog) would unify the envelope
  construction. LOW priority — current output is already wire-correct.
- **UPLIFT-5 (contract-currency, structural)** — fourier `inv-32` (version-currency)
  already governs pin-staleness; extend its spirit to the CRUD-CONTRACT twin: a
  fourier-N invariant that any `atomdiff.py` / version-shape / `urn:contract` catalog
  change re-verifies the value.js twin + updates `CONFORMANCE-MATRIX.md`. Pairs with
  the value.js R-side invariant (§5).
- **UPLIFT-6 (shared golden-vector fixture)** — author the cross-repo diff/hash
  golden-vector fixture (§2.2) and wire fourier's `test_crud_lib_atomdiff.py` to
  read it. Paired with value.js R.

---

## §4 — Cross-pollination INTO value.js (relevant to R)

- **`canonical_digest` unification** — fourier collapsed three ad-hoc canonicalise-
  then-sha256 mechanisms into ONE primitive over three projections
  (`canonical_digest.py`). value.js's `hash.ts` still exposes three sibling functions
  (`computeContentHash` / `computeAtomHash` / `computeAtomSetHash`). If they share a
  canonical-JSON core, value.js could adopt fourier's one-primitive-three-projections
  shape (net code decrease, no behavior change). Candidate R cleanup — verify the
  canonical-JSON serializers are byte-identical first (they must be, for the wire
  twins to match).

---

## §5 — What value.js Tranche R must carry on its side of the union

1. **A contract-currency invariant (the value.js analog of fourier `inv-32`).**
   value.js's `atomdiff.ts`, `PaletteVersion` shape, and `urn:contract` catalog are
   twins bound to fourier-owned contract docs. R should codify that any change to
   these re-verifies the fourier twin and updates `CONFORMANCE-MATRIX.md`. This is a
   discipline/invariant, **not a refactor** — there is no value.js code to extract or
   converge.

2. **Co-author the shared golden-vector fixture (§2.2 / UPLIFT-6).** value.js's
   `atomdiff` test reads the same fixture fourier's does. This is the one concrete
   cross-repo deliverable and it is symmetric — either repo can land the fixture; the
   other reads it. Small.

3. **Push (or accept) the contract-doc relocation to a neutral home (§2.2).** Today
   value.js imports its CRUD contract-of-record from `fourier-analysis/docs/tranches/
   B/coordination/`. R should either relocate those docs to a constellation-neutral
   home or, at minimum, add a `CONSTELLATION.md` pointer so the bilateral contract
   stops reading as fourier-tranche-local. Coordination ask, low cost.

4. **(Optional) adopt fourier's `canonical_digest` one-primitive shape (§4).** Only
   if the canonical-JSON cores are verified byte-identical. Net code decrease, KISS.

**What R must NOT do**: attempt to extract a shared runtime package, introduce a
codegen seam, or "converge" the two implementations into one — all three violate
the standing `inv-16`/`inv-26` design and the cross-language reality. The union is a
contract, and value.js already honors it.

---

## §6 — Evidence index (file:line)

- fourier crud lib: `api/lib/crud/{atomdiff,errors,etag,idempotency,cursors,softdelete,slugs,canonical_digest,pinned_cron,__init__}.py`
- fourier viz model + version twin: `api/models/visualization.py:109-372` (shape-inherits-value.js note at `:137-138`; hand-typed-no-codegen at `:294-296`)
- fourier viz router (get_db-direct ×14; non-atomic create/fork): `api/routers/visualizations.py:164-236` (create), `:560-612` (fork), `:110-148` (`_write_root_version`, DuplicateKey no-op)
- fourier index hygiene: `api/services/database.py:48-146`
- fourier NO transactions: grep `start_session|with_transaction` over `api/**.py` = 0
- fourier contract docs (the union-of-record): `docs/tranches/B/coordination/{CRUD-CONTRACT.md,SCHEMA.md,CONFORMANCE-MATRIX.md}`, `docs/tranches/J/design/J-diff-shape.md`
- fourier invariant ledger (inv-16 shared-by-contract, inv-26 single-contract-source, inv-32 version-currency): `docs/tranches/INVARIANTS.md §1`
- fourier M status (authored, not executed; db out of scope): `docs/tranches/M/PROGRESS.md`, `M/M.md §0`
- value.js atomdiff twin: `api/src/lib/crud/atomdiff.ts:1-96`
- value.js URN convergence onto fourier catalog (N.W3.H): `api/src/errors/index.ts:24-49`
- value.js deletedAt-leading index (the lesson fourier could adopt): `api/src/db.ts:51-53`
- value.js version chain + diff service: `api/src/models.ts:153-172`, `api/src/services/palette/diff.ts:1-50`
