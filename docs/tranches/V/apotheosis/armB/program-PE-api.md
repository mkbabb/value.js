# F-PE-api — THE API PROGRAM (Fable-side independent formation, Arm B)

Formed 2026-07-19 under the binding canon (L1 charter + L2 packets P0–P6 + CONVERSATION-ADDENDA
C-rows; addenda win). Truth base: `armB/sweep-api-fourier.md` + `armB/sweep-value-demo.md` +
direct probes this session. Tree pins: value.js `tranche-u@db77dbd8` (api `2.0.0`),
fourier-analysis (api `0.2.0`, `main.py:52`), keyframes-v-exec `master@0dac636b` (NO api —
census-proven, sweep PART 2). Independence firewall honored: no `vnext/`, no snapshot, no armA.

---

## 1 — PROGRAM CHARTER

The palette API becomes a FULLY SPECIFIED, machine-witnessed product surface **staying at
`/api`** (C7, reconciled against P3.2's EXTRACT row as owner-decision OD-api-1). The one
facility with zero server implementation — **mixing** (the TA-4-excised J.W2 atom-diff
`/remix`+`/diff` rail) — is restored to isomorphism with fourier-analysis' CRUD visualization
API, the reference implementation value.js authored-then-deleted. Both backends receive the
§4 structure treatment "abstracted and made befitting for those languages": layer-law
enforcement, test displacement, shim dissolution, goldilocks granularity. Every value↔fourier
divergence lands as a CONVERGE or RATIFIED-DIVERGENCE row in a CRUD-CONTRACT v3 amendment,
witnessed by shared conformance vectors — no live cross-repo harness (C21 KISS: vectors, not
apparatus). Auth/session intersections (token-at-rest, anon ownership, idempotency durability)
and the C6 URL-share backend slice are carried as explicit rows. Zero silent drops: §5 maps
every canon row to a wave, gate, OD row, or explicit N/A-with-owner.

---

## 2 — THE WAVE SET (11 waves)

### F-PE-api-01 | value.js | THE PALETTE API SPECIFICATION OF RECORD
- **Intent**: Author the C7 full-facility spec — every route, entity, envelope, error URN,
  invariant across history, variants/forks, CRUD, mixing, publish/share, votes, flags, colors,
  sessions, admin, meta — anchored to CRUD-CONTRACT v2.0.0 + J-diff-shape, with every facility
  row marked EXISTS / GAP / DIVERGENT at file:line. The spec is the program's row inventory.
- **Deliverables**: `api/SPEC.md` (facility × route × invariant matrix; error-URN catalog;
  the 9-collection data model; ETag/cursor/idempotency semantics as normative sections);
  a machine-readable row inventory (JSON/table) the coverage gate consumes.
- **Acceptance gates (born-RED)**: coverage census — every route in the generated
  `openapi.json` (live-registry-derived, `modules/meta`) has a spec row AND every spec'd
  facility has a status. **RED today**: the "mixing" facility row is GAP (route grep proves no
  `/mix`, `/remix`, `/diff` — sweep §1.3); the census cannot close green until OD-api-2 lands
  a verdict and its wave discharges or tombstones the row.
- **Dependencies**: none (opens the program).
- **π/DELTA**: none — non-visual server surface.
- **Model routing**: Fable (spec authorship is design work, C17); file-scoped, tight.

### F-PE-api-02 | value.js | STAY-AT-/api RATIFICATION + BOUNDARY HARDENING IN PLACE
- **Intent**: Execute OD-api-1's recommended verdict (STAY): supersede P3.2's "api/ EXTRACT
  from repo" row with a named tombstone, and deliver EXTRACT's hygiene wins in place —
  api remains a standalone, workspace-excluded service with its own manifest, lockfile, CI lane.
- **Deliverables**: P3.2-row supersession tombstone (named, cited to C7's later ruling);
  a bidirectional zero-import boundary rule (library `src/` never imports `api/`; `api/src`
  never imports repo-relative library source — it consumes `@mkbabb/value.js` published only);
  CI lane separation verified (library gates stay producer+api per P3.4 row 1).
- **Acceptance gates**: boundary rule wired and running in CI. Honest label: expected
  **born-GREEN witness** (sweep P3.2: "zero library imports" already true) — this is an
  enforcement wire, not a cure; RED would mean a boundary import exists or the rule is unwired.
- **Dependencies**: OD-api-1 ratified; F-PE-api-01 (spec houses the boundary rules).
- **π/DELTA**: none.
- **Model routing**: Opus mechanical (rule wiring), Fable sign-off on the tombstone text.

### F-PE-api-03 | value.js | R-REMIX — RESTORE THE ATOM-DIFF MIXING RAIL (TA-4 REVERSAL)
- **Intent**: Restore the J.W2 apparatus excised at T.W1: `POST /palettes/:slug/remix` (fork
  carrying atom OVERRIDES + a RECORDED atom-diff; no-op → 422 `urn:contract:remix-noop`),
  `GET /palettes/:slug/diff` (canonical `{fromHash,toHash,ops[],identical}` envelope, immutable
  Cache-Control, If-None-Match/304), `PaletteVersion.atomDiff`, and `lib/crud/atomdiff.ts` —
  isomorphic to fourier `visualizations.py:488-612`/`:799-852` + `atomdiff.py` (op vocab
  `added/removed/changed`). Resurrection recipe: git history pre-T.W1 (the J.W2 tree), then
  modernized; fourier is the semantic reference. Executes OD-api-2 and OD-api-3 verdicts:
  remix becomes the variant-create write verb; `POST /:slug/fork` retired as a verbatim-copy
  duplicate (`service/forks.ts:64-65`) WITH a by-name tombstone; `GET /forks` + `/provenance`
  stay. The surviving `atomSetHash` fingerprint (`format.ts:43-45`) regains its consumers.
- **Deliverables**: routes + service + `atomdiff.ts` + version-model field + migration note for
  existing versions (atomDiff nullable-backfill, no rewrite); demo client rider —
  `demo/palettes/api/versions.ts` gains `remixPalette`/`getDiff`, `forkPalette` migrated to
  remix (no-backwards-compat edict); tombstone row for the retired fork verb.
- **Acceptance gates (born-RED)**: conformance test asserting the J-diff-shape wire envelope on
  `GET /:slug/diff` — **RED today (404, route absent)**; remix no-op test expecting 422
  `urn:contract:remix-noop` — **RED today (404)**; version-carries-atomDiff test — **RED today
  (no field, `model.ts:84-98`)**. Mirror of fourier's `test_diff_shape.py`/`test_remix.py`.
- **Dependencies**: F-PE-api-01; OD-api-2 + OD-api-3 ratified.
- **π/DELTA**: DELTA obligation ONLY on the demo rider — if remix is surfaced in the browse/
  palette-card UI, one probe-parsimonious screenshot pair (before: fork affordance / after:
  remix flow). Server surface itself: none.
- **Model routing**: Fable designs the diff-algebra port + envelope; Opus mechanical
  resurrection of `atomdiff.ts` from git + test porting patterned on fourier's battery.

### F-PE-api-04 | value.js | OKLAB BOUNDARY — CONSUME THE LIBRARY, ACCEPT ALL CSS COLOR
- **Intent**: Replace the inline hex/rgb-only oklab implementation (`service/oklab.ts`,
  self-flagged for replacement at `oklab.ts:16-21`) with consumption of published
  `@mkbabb/value.js` `/color` (parse + convert). Kills the live product defect: palettes with
  `hsl()`/`oklch()`/named colors are REJECTED at the boundary (`oklab.ts:66-80`). This is the
  api-side member of the P1.5 duplicate-color-parsing defect FAMILY — the register tracks
  families, not instances.
- **Deliverables**: `oklab.ts` rewritten on the library surface; boundary validation widened to
  the library's parse acceptance; defect-family register row citing P1.5.
- **Acceptance gates (born-RED)**: conformance test `POST /palettes` with
  `{css:"oklch(0.7 0.1 200)"}` and a named color → expects 201 + correct denormalized
  `oklabColors` — **RED today (rejected at boundary)**. Round-trip equivalence test vs the old
  impl on hex/rgb inputs (no drift on the previously-accepted domain).
- **Dependencies**: F-PE-api-01. Independent of F-PE-api-03. Consumes value 4.x as published —
  does NOT wait on the R-DELTAE/R-GAMUT color program (parse+convert exist today); a rider
  re-checks after the color program's 4.1.x lands (C13 zero-alloc intersection).
- **π/DELTA**: none.
- **Model routing**: Opus mechanical swap + tests; Fable adjudicates the acceptance-domain
  decision (which CSS color forms the API contract admits).

### F-PE-api-05 | value.js + fourier-analysis | CRUD-CONTRACT v3 — THE CONVERGENCE ADJUDICATION
- **Intent**: Adjudicate every same-facility divergence (sweep §3.4C) into CONVERGE-to-X or
  RATIFIED-DIVERGENCE, amending the cross-repo contract (successor to CRUD-CONTRACT v2.0.0,
  home per precedent: fourier docs, with a value-side mirror row). Rows: cursor stale-sort
  (400 vs silent restart), ETag derivation basis, visibility enum (`private` vs `draft`) +
  unpublish target + transition guard, anon ownership, idempotency store durability, naming
  (camel/snake — already ratified divergence, re-recorded). Runs the C20 thrice loop on the
  contract text (two Fable skeptics assuming the amendment is WRONG, one Fable adjudicator).
- **Deliverables**: CRUD-CONTRACT v3 amendment with per-row verdict + rationale; the OD-api-4/5/6/8
  rows prepared for the owner sheet; per-converged-row born-RED test specifications handed to
  F-PE-api-06 (fourier side) and F-PE-api-11 (value side).
- **Acceptance gates**: every §3.4C divergence row has a verdict — no row left "noted";
  two consecutive clean thrice passes (C20 convergence).
- **Dependencies**: F-PE-api-01 (value's spec truth). Blocking for 06's convergence half, 07, 11.
- **π/DELTA**: none.
- **Model routing**: Fable throughout (adjudication is the work); 3 seats exactly, file-scoped.

### F-PE-api-06 | fourier-analysis | FOURIER-SIDE GAPS + CONVERGENCE IMPLEMENTATION
- **Intent**: Close fourier's own silent-drop candidates (sweep §3.4B, synthesis 3) and land
  its half of the v3 verdicts. Gap half (independent, can start immediately): (a) a like/vote
  write endpoint — `views/likes` fields exist (`models/visualization.py:151`) with NO write
  route; (b) a user-facing flag route — `flag_self`/`flag_duplicate` errors are defined
  (`errors.py:71-72`) but no non-admin route mounts them; (c) session token hashed at-rest —
  today stored as plaintext `uuid4` `_id` (`sessions.py:26,53`), vs value's hashed-at-rest
  standard. Convergence half: whatever v3 assigns fourier.
- **Deliverables**: the three gap routes/changes patterned on their value.js twins
  (`votes/`, `flags/`, session hashing); v3 convergence edits; conformance additions to
  `api/tests/conformance/`.
- **Acceptance gates (born-RED)**: (a) like/vote endpoint probe — **RED today (404/405)**;
  (b) user flag route mounting the defined URNs — **RED today (404)**; (c) at-rest inspection
  test: register → read sessions collection → token must NOT appear in plaintext — **RED today
  (plaintext `_id`)**; convergence rows per v3 spec, born-RED where fourier changes.
- **Dependencies**: gap half — none; convergence half — F-PE-api-05.
- **π/DELTA**: none (fourier's viz UI wiring of like/flag is fourier frontend territory; seam
  noted, not owned here).
- **Model routing**: Opus mechanical (route ports patterned on twins), Fable adjudication of
  the session-hash migration (live-session invalidation policy).

### F-PE-api-07 | both | SHARED CONFORMANCE VECTORS (THE ISOMORPHISM WITNESS)
- **Intent**: Neither repo runs a cross-repo isomorphism check — parity is doc-anchored,
  enforced per-repo (sweep §3.5). Per C21, do NOT build a live cross-repo harness; instead
  author a SHARED VECTOR SET — JSON fixtures for the diff envelope shape, error-URN catalog,
  ETag/If-Match matrix (428/412/`*`), cursor semantics, idempotency replay/409 — consumed by
  each repo's OWN test suite (value `test/conformance/`, fourier `api/tests/conformance/`).
  The vectors ARE the §4 "abstract facility"; per-repo representation divergence (camel/snake)
  is normalized in each consumer shim, never in the vectors.
- **Deliverables**: the vector corpus (home: the contract's repo, mirrored as a fixture file in
  each consumer — no new package, no shim layer); one consumer test per repo per vector family.
- **Acceptance gates**: both suites consume the same vector file hashes; born-RED exactly where
  a v3 CONVERGE row is not yet implemented on that side (the vectors encode v3, so unlanded
  convergence rows show RED on the lagging repo — this is the desired witness).
- **Dependencies**: F-PE-api-05.
- **π/DELTA**: none.
- **Model routing**: Fable designs the vector schema; Opus wires consumers.

### F-PE-api-08 | value.js | /api MODULE-STRUCTURE PERFECTION + GATE SET
- **Intent**: The §4/C11 treatment on `api/`: (a) displace the 28 colocated
  `src/modules/*/__tests__/` files into `api/test/` in a tree isomorphic to `src/` (tests never
  co-located — C11, extended to backends by §4); (b) codify the layer law
  (`validate → authn → authz → service → repository → format → response`; repository as sole DB
  boundary — `platform/db/collections.ts` single-site preserved) as a cheap structural check;
  (c) goldilocks audit of `modules/` + `platform/` (palette's 6 concern routers are the model);
  (d) promote `_parity.ts` from hand-run to a one-line CI step (the P3.3-row-2 pattern: an
  honest gate that runs in NO workflow is unwired, not landed); (e) the §7-law-1 analog for the
  service surface: an `openapi.json` route-census diff vs prior tag — RED on any route removal
  lacking a by-name tombstone (TA-4 is the fired mechanism this kills at the API layer).
- **Deliverables**: displaced test tree + isomorphism check; layer-law check; `_parity` CI wire;
  the route-capability-diff gate; a short structure verdict note (what moved, what was already
  right).
- **Acceptance gates (born-RED)**: the test-isomorphism check — **RED today (28 colocated
  files, probed this session)**; `_parity` + route-diff gates wired and green post-displacement;
  layer-law check green (expected — the layering is live per `api/CLAUDE.md`).
- **Dependencies**: F-PE-api-02 (boundary rule shares the check home). Ordering law: lands
  BEFORE 03/04/06/11 merge their test additions, so new tests are born in the displaced tree.
- **π/DELTA**: none.
- **Model routing**: Opus mechanical displacement + wiring; one Fable seat adjudicates the
  goldilocks verdicts (C21: little time on contrived gates — (b)/(e) stay one-line-cheap or die).

### F-PE-api-09 | fourier-analysis | fourier /api STRUCTURE — SHIM DISSOLUTION + TEST UNIFICATION + LAYOUT ADJUDICATION
- **Intent**: The same §4 treatment "befitting the language": (a) dissolve the thin-wrapper
  shim `api/slugs.py` ("Thin wrapper around api.lib.crud.slugs", probed this session) —
  importers rerouted, no-shims edict; (b) unify the mixed test layout (`api/tests/` +
  `services/__tests__/` both live) into one tree isomorphic to source; (c) thrice-adjudicate
  fourier's horizontal layout (routers/services/models/lib) vs value's vertical domain modules
  under the abstract facility — recommendation going in: KEEP FastAPI-idiomatic horizontal
  layout, codify the shared LAYER VOCABULARY in CRUD-CONTRACT v3 (isomorphism of facility, not
  of directory shape — §4's "abstracted and made befitting").
- **Deliverables**: shim deleted + importer reroute; unified test tree; the layout adjudication
  record (thrice, C20) amending the contract's structure section.
- **Acceptance gates (born-RED)**: shim-absence check — **RED today (shim live)**;
  test-layout check — **RED today (two homes)**; thrice convergence = two clean passes.
- **Dependencies**: F-PE-api-05 (the contract home for the layer vocabulary). Mechanical halves
  (a)/(b) independent.
- **π/DELTA**: none.
- **Model routing**: Fable thrice for (c); Opus mechanical for (a)/(b).

### F-PE-api-10 | value.js | URL-SHARE BACKEND SLICE (BACKING C6)
- **Intent**: Specify the backend facilities behind C6's share-URL mandate. Two ratifications +
  one banked facility: (i) RATIFY `visibility: unlisted` as the palette-share primitive (exists
  today — slug URL + unlisted = shareable-not-listed); (ii) the spec invariant that share URLs
  NEVER carry session material (`X-Session-Token` is header-only; no token query param exists —
  keep it that way by contract row + test); (iii) the `/shares` state-snapshot facility
  (`POST /shares` → short code, `GET /shares/:code` → state blob; TTL; anon-allowed;
  rate-limited) SPEC'D NOW, activation gated by OD-api-7. Recommendation: pure-URL primary
  (KISS/C21 — hash-mode URLs on gh-pages, compact state), `/shares` BANKED with a named
  re-trigger (encoded workbench state exceeding ~1.5KB, or a cross-device share ask). The
  client-side robust-URL-state work (sweep-value-demo §4: only `{color,space}` encoded today)
  is the FRONTEND program's — the seam is: frontend defines the state schema, this wave defines
  its backend landing zone.
- **Deliverables**: SPEC.md §share (the two ratifications + the /shares spec + the re-trigger
  row); the no-token-in-URL contract test; IF OD-api-7 activates: routes + TTL collection +
  conformance tests.
- **Acceptance gates**: contract test green (no token-bearing URL construction exists — expected
  born-GREEN witness); IF activated: `POST /shares` conformance — **born-RED (404 today)**.
- **Dependencies**: F-PE-api-01; OD-api-7; frontend program's state-schema seam (consume-only).
- **π/DELTA**: none server-side; any share-affordance UI change is frontend-program-owned
  (seam noted).
- **Model routing**: Fable spec; Opus implementation iff activated.

### F-PE-api-11 | value.js | VALUE-SIDE CONVERGENCE + SESSION/IDEMPOTENCY HARDENING
- **Intent**: Land value's half of the v3 verdicts plus the auth-adjacent durability holes:
  (a) cursor stale-sort → 400 `urn:contract:cursor-invalid` (recommended CONVERGE — explicit
  failure over silent restart, `crud-list.ts:48-58` today restarts silently); (b) visibility
  transition guard adopted (fourier's `is_legal_visibility_transition` pattern; value has none);
  (c) idempotency store → Mongo-backed TTL per fourier (`viz.py:63-70` precedent) — the
  in-process store forgets replays across restart/multi-instance; (d) any further v3 rows
  assigned to value. Session surfaces re-witnessed: token-at-rest hashing stays (already
  tested), admin-impersonate audit rows verified against the spec.
- **Deliverables**: the converged behaviors + their conformance tests (born in the 08-displaced
  tree); demo client updated where behavior is visible (stale-cursor handling in
  `demo/palettes/api/` — it must now handle 400, not silent restart).
- **Acceptance gates (born-RED)**: stale-cursor test expecting 400 + URN — **RED today (silent
  restart)**; restart-replay idempotency test (same key across store reset → replay honored) —
  **RED today (in-process store)**; transition-guard test (illegal transition → 4xx URN) —
  **RED today (no guard)**.
- **Dependencies**: F-PE-api-05 (verdicts), F-PE-api-08 (test tree). OD-api-4/5/6 ratified.
- **π/DELTA**: none.
- **Model routing**: Opus mechanical implementation from v3's test specs; Fable spot-adjudication
  on the demo-client failure-mode UX (a design decision, not mechanical).

---

## 3 — OWNER-DECISION ROWS (the docket this program surfaces)

| Row | Question | Recommendation |
|---|---|---|
| **OD-api-1** | **EXTRACT vs STAY**: P3.2 rules "api/ EXTRACT from repo (125-file standalone backend; zero library imports)"; C7 (later, this session) rules "stays at its current /api". | **STAY** — the later owner ruling wins on recency and specificity; extraction's real wins (isolation, independent CI, manifest hygiene) are all deliverable in place (F-PE-api-02) at zero repo-split/deploy-rewire/history cost. P3.2's row gets a named SUPERSEDED tombstone (§7 law 1 discipline — no silent drop of the EXTRACT record). |
| **OD-api-2** | **Mixing mode**: restore the server atom-diff rail (remix+diff+version.atomDiff) vs ratify mixing as client-only and tombstone the API expectation. Note the two readings of C7's "mixing": palette-variant mixing (the excised rail) vs color-math mixing (library-owned). | **RESTORE the rail** (F-PE-api-03) — C7 demands mixing "proven and completely addressed"; fourier is the living reference impl; the isomorphism mandate makes client-only a permanent asymmetry. Sub-ruling: NO server color-mix compute endpoint — color math is library-owned (C13); the API records deltas, it does not compute mixes. |
| **OD-api-3** | **Fork vs remix verbs**: keep `POST /:slug/fork` (verbatim-copy) alongside remix, or converge on remix-only (fourier's shape: remix IS the variant-create verb; fork exists only as `GET /forks`). | **CONVERGE on remix** — fork becomes remix-with-zero-overrides; the verbatim-copy route retires WITH a by-name tombstone caught green by the 08(e) route-diff gate; demo client migrated in the same wave (no-backwards-compat edict). |
| **OD-api-4** | **Anon ownership**: value allows `userSlug: null` (anon-owned palettes, `crud.ts:85`); fourier requires non-null owner (anon publish → 401). Converge or ratify divergence. | **RATIFY DIVERGENCE** — value's anon palette save is a live product affordance; killing it is a product regression the isomorphism mandate does not require. Contract v3 records it as intentional, with the invariant that anon-owned palettes cannot publish. |
| **OD-api-5** | **Visibility enum + unpublish target**: value `public\|unlisted\|private`, unpublish→private, no transition guard; fourier `draft\|unlisted\|public`, unpublish→unlisted, guarded. | **CONVERGE SEMANTICS, RATIFY NAMES** — adopt the transition-guard mechanism in value (F-PE-api-11b) with a per-repo legal-transition table; unpublish target stays each repo's non-public default; enum naming is representation divergence like camel/snake. |
| **OD-api-6** | **Stale-cursor behavior**: fourier 400 `urn:contract:cursor-invalid`; value silent restart-from-beginning. | **CONVERGE on 400** — silent restart is a masked fallback (the §7 edict class); explicit contract-visible failure, demo client handles it (F-PE-api-11a). |
| **OD-api-7** | **`/shares` snapshot endpoint activation**: build now vs bank. | **BANK with named re-trigger** (encoded workbench state > ~1.5KB, or cross-device share ask) — pure-URL sharing is primary per C21; the spec ships now (F-PE-api-10) so activation is a switch, not a design. |
| **OD-api-8** | **ETag derivation basis**: value at-rest `currentHash\|updatedAt`; fourier canonical-digest over the mutable projection. | **RATIFY DIVERGENCE** — both strong+quoted with identical 428/412/`*` semantics; byte-compatibility across repos is never exercised; converging would churn one side for zero contract gain. Recorded in v3. |

---

## 4 — SEQUENCING SKETCH

01 → {02, 05, 10-spec} in parallel · 08 lands before any wave adds tests · 03 + 04 (independent
of each other) after 01/OD ratification · 05 → {06-convergence, 07, 11} · 06-gaps + 09-mechanical
anytime · 09-adjudication after 05. Critical path: 01 → 05 → 11/07.

---

## 5 — LANDING MAP (every relevant canon row → where it lands; zero silent drops in this program)

| Canon row | Landing |
|---|---|
| **C7** (stays at /api; full spec; module structure BOTH repos; fourier isomorphism) | F-PE-api-01 (spec) · OD-api-1 + F-02 (stay) · F-08/F-09 (structure both backends; keyframes-v-exec has NO api — census-proven NULL, sweep PART 2, recorded here as the explicit "both repos" resolution: the two api-bearing repos are value.js + fourier-analysis) · F-03/05/06/07 (isomorphism) |
| **C7's noted tension with P3.2 "api/ EXTRACT"** | OD-api-1, recommendation STAY, P3.2 row tombstoned by name |
| **C6** (robust URL state + share-URL facilities) — backend slice | F-PE-api-10 (unlisted-as-primitive ratified; no-token-in-URL invariant; /shares spec'd + OD-api-7). Client slice explicitly SEAMED to the frontend program (sweep-value-demo §4: only `{color,space}` encoded today) — not dropped, not owned here |
| **C8** (mega-tranche scale; fourier-analysis in scope) | 11 waves contributed, 3 fourier-side (06, 09, half of 05/07) |
| **C16** (isolation) | honored — this file is the only write; no repo edits |
| **C17** (Fable design / Opus mechanical; model_served on every seat) | per-wave routing notes; every spawn reports model_served (P0.1 law) |
| **C20** (thrice loop) | F-PE-api-05 (contract) and F-PE-api-09c (layout) run thrice; convergence = two clean passes |
| **C21** (KISS; no contrived gates) | no live cross-repo harness (07 uses shared vectors); gates limited to one-line wires (08d/e) or born-RED conformance tests; 11 waves not 30 |
| **C13** (color zero-alloc, consumers) | F-PE-api-04 rider: api consumes library color; re-check after 4.1.x Into work lands |
| **C11/§4** (tests never co-located; backend structure treatment "befitting those languages") | F-PE-api-08 (value: 28 colocated files displaced, born-RED) · F-PE-api-09 (fourier: shim + mixed test homes, born-RED) |
| **L1 §4** ("same treatment and enforcement applies to all backend files… abstracted and made befitting for those languages") | F-08 + F-09 + the v3 layer vocabulary (05/09c) |
| **L1 §7 law 1** (silent-drop tombstone + capability-diff gate) | F-PE-api-08e (openapi route-census diff — the API-surface analog; TA-4 is the fired mechanism it kills) · fork-verb retirement tombstone (03) · P3.2 supersession tombstone (OD-api-1) |
| **L1 §7 edicts** (no masking fallbacks; chronics decided; partials disposed) | OD-api-6 (silent cursor restart = masked fallback, converged); TA-4 mixing gap DECIDED via OD-api-2 (not re-booked); every banked item (OD-api-7) carries a named re-trigger |
| **P1.5** (defect-FAMILY register, not instances) | F-PE-api-04 cites the duplicate-color-parsing family; the api oklab inline impl is its api-side member |
| **P3.2 api row** (EXTRACT) | OD-api-1 (reconciled, tombstoned) |
| **P3.2 deps-block row** (STRIP/RELOCATE + pre-publish manifest gate) | NOT this program's scope — library-manifest work, owned by the structure program; recorded here as an adjacent non-drop pointer |
| **P3.4 row 1** (library gates stay producer+api) | F-PE-api-02 preserves the api CI lane as-is |
| **P4.5** (cross-repo protocol) | fourier waves are in-tranche per C8; fourier-side landings coordinated via its own tranche docs — kf protocol N/A (kf has no api) |
| **Sweep-api-fourier TA-4** (excised remix/diff/atomdiff) | F-PE-api-03 (restoration, born-RED ×3) |
| **Sweep §1.3** (fork verbatim-copy; mixing ABSENT; oklab hex/rgb-only) | OD-api-3/F-03 · OD-api-2/F-03 · F-04 |
| **Sweep §3.4A** (fourier-has rows: remix, diff, atom_diff, atomdiff.py, problem catalog, cursor-400) | F-03 (first four) · problem-catalog breadth noted in 01's URN catalog (value's ~13 ApiError classes audited for missing rows) · OD-api-6/F-11 |
| **Sweep §3.4B** (value-has rows: votes, user flags, oklab search, tier, hashed tokens) | F-PE-api-06a/b/c (fourier gaps) · oklab search + tier recorded in 01 as value-unique KEEP rows (no fourier port forced — isomorphism of contract, not feature parity where domains differ) |
| **Sweep §3.4C** (divergences: naming, visibility, unpublish, anon-owner, ETag, hashes, idempotency store, prefix) | F-PE-api-05 rows → OD-api-4/5/6/8 + F-06/F-11 implementations; route-prefix divergence recorded RATIFIED (deploy-topology artifact) |
| **Sweep §3.5** (no cross-repo harness; per-repo batteries) | F-PE-api-07 (shared vectors, no harness) |
| **Sweep PART 2** (kf has NO api) | recorded as the C7 "both repos" NULL resolution — no phantom kf wave |
| **Sweep synthesis 1–4** | OD-api-2 · F-03 · F-06a/b · F-05/F-11 respectively |
| **Sweep-value-demo §6** (demo api client surface) | F-03 demo rider (remix/diff wrappers, fork migration) · F-11 (stale-cursor 400 handling) |
| **Sweep-value-demo §4** (share gap: only color+space encoded) | F-10 seam to frontend program |
| **P0.1** (model declared ≠ model served) | every wave's routing note; seats report model_served |

Rows from the canon NOT landed here (C2/C3/C4/C5/C10/C12/C14/C15/C18/C19/C22; P1–P2 parser/color
programs; P3.1/P3.3 kf zones/gates; P4.1–P4.4) are OTHER programs' property in the arm-B
formation — named here so the union pass can verify no orphan, owned elsewhere by design.

— Arm B, F-PE-api program. 11 waves · 8 OD rows · 14 born-RED gate specimens across 7 waves.
