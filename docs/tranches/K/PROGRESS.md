# K — PROGRESS

**Status board.** Updated at every wave boundary. K is **planning-only at open**; no IMPL wave dispatches until the three K.W0 ratification gates close + the W1 CORE specs land + explicit user ratification (inv-G1).

## Wave status

| Wave | Disposition | Status | Gate |
|---|---|---|---|
| **K.W0** — Open + six-lane audit | DEV (audit) | **CLOSED** (2026-06-02) | Audit + request-coverage + adversarial verification done; `K.md` authored + revised; **3 ratification gates RESOLVED** (below) |
| **K.W1** — Design | DEV (design) | **CLOSED** (2026-06-02) | **5** CORE specs authored + reviewed PASS (`design/K.W1-{cross-repo-topology,primitive-lift,aurora-derive,modern-web-router,visual-evidence-protocol}.md`), GROUNDED in real value.js + glass-ui code — drift-corrections folded (see "K.W1 grounding corrections" below) |
| **K.W2** — Substrate restoration + acyclic topology | IMPL (cross-repo) | **BLOCKED** on W1 + ratification | vue-tsc 0 (source-resolved via `tsconfig.lib` split) · e2e green vs no backend · peerDep · color dedup · dev.sh/deploy.sh micro-lane (f) |
| **K.W3** — glass-ui-first consummation | IMPL (cross-repo) | **BLOCKED** on W2 | goo-blob + WatercolorDot lifted (deletion proof) · 8 asks landed · ui/ codified · sortable migrated |
| **K.W4** — Aurora-derive + VAL-1 | IMPL | **BLOCKED** on W3 | derive wired (runtime-observed re-tint) · VAL-1 2nd-consumer gate fires |
| **K.W5** — Modern-web parity + router | IMPL | **BLOCKED** on W2 (parallel to W4) | View Transitions · @layer · @container · vue-router ^5 · VIEW_MAP single-source · typed routes |
| **K.W6** — Close | DEV (close) | **BLOCKED** | 7-lane ceremony · π visual-runtime · v1.0.0 verdict · cohort close |

## K.W0 ratification gates (must close before IMPL dispatch — inv-G1)

**Closure mechanism**: each gate closes on an explicit user decision recorded below. **ALL THREE RESOLVED 2026-06-02** → K.W0 ratification gate CLOSED → **K.W1 (design) unblocked.** K.W2+ (IMPL) dispatches after the W1 CORE specs land.

| Gate | Recommendation | USER VERDICT | Date |
|---|---|---|---|
| 1. **J-disposition** | supersede-and-fold | **RESOLVED — supersede-and-fold** (J retired via C-precedent; REMIX CORE spec preserved-as-substrate; live I-tail + VAL-9 folded into K per §7 path (b)) | 2026-06-02 |
| 2. **v1.0.0 declaration** | approve, execute at K.W6 | **RESOLVED — approved, cut at K.W6 close** | 2026-06-02 |
| 3. **Cohort model** | paired-authorship | **RESOLVED — paired-authorship** (glass-ui source boundary OPEN per amended inv-I-1; fourier boundary stays closed) | 2026-06-02 |

## Empirical baseline captured at W0 (the two RED gates K.W2 restores)

- ✅ vitest 1584/34 · ✅ lint exit 0 · `as any` 0 · `as unknown as` 2 (the `proof:*` scripts that once codified these are RETIRED — now structural; see the path-forward synthesis below)
- ❌ vue-tsc **92 errors** (75 = glass-ui `dist/` build-state coupling; 16 genuine implicit-any; 1 genuine `tier`) — CI strict-zero gate violable
- ❌ Playwright **27 failed / 9 passed** — demo fetches prod API refused by CORS; `setupEnvNoise` doesn't filter CORS-class; reactivity spec contention-inflated (not a genuine regression)
- **Sizings captured at W0** (the verifier's "unsized" findings): demo `as any` = **12 sites** (outside `ui/`); `src/units/color/dispatch.ts` = **372 LoC — OVER the G3 ≤350 cap** (monitor trigger FIRED → folded into K.W2(e), no longer a "monitor"); glass-ui `dist/*.d.ts` = **0** (the resolution-blocker — value.js resolves glass-ui from source per inv-K-4, sidestepping it for value.js's own typecheck; the dist dts emission is a cohort prerequisite for *external* glass-ui consumers)
- **Adversarial verification**: a 4-critic workflow (prompt-coverage · topology-correctness · deferred-ledger · precept-conformance) reviewed the authored plan; findings folded — inv-K-1 strengthened (`tsconfig.lib` split, not grep-alone), inv-K-3 artefact-gated + color-agnostic resolver, D1/D6 bound to K.W3 gates, booked-items given E5 triggers, ratification closure mechanism added, request-coverage table authored (`audit/request-coverage.md`).

## Carry-forward ledger (folded into K — see `K.md §7`)

Chronic: aurora-derive (→W4) · blob-extirpation (→W3) · VAL-1 (→W4) · 8 glass-ui asks (→W3) · demo `as any` budget (→W5/close). Booked: VAL-9 · WebMCP/G2/G4 · passkeys · cron-txn / dispatch-LoC / bench-script monitors. I-tail (per J-disposition): Idempotency store · conformance suite · id-field removal · per-call-site ifMatch/idempotencyKey.

## Path-forward synthesis (2026-06-02) — folds + decisions recorded

The 5-audit path-forward + 3 new mandates are synthesized in `audit/path-forward-2026-06-02.md` (the consolidated SHIP/KILL/BOOK ledger, the de-ceremony record, prompt-coverage recap, C/ disposition). Folds applied to `K.md` this session:

- **SPLIT-K-PLUS-L.** K stays as authored + absorbs 2 folds; the `api/` backend legacy-excision becomes **successor L** (charter = `audit/path-forward §2` L-1..L-9; `K.md §10`). L opens planning-only at K.W6 close; IMPL dispatches after K.W2 restores green.
- **Visual-evidence protocol** (session-mandate #2) → **NEW K.W1 spec** `design/K.W1-visual-evidence-protocol.md` (a sibling agent authors it); consumed by the K.W6 π-lane; precepts-sync folded as ledger #10.
- **dev.sh/deploy.sh standardization** (session-mandate #1) → **K.W2 infra micro-lane (f)** (impl already done this session; schema `docs/dev-deploy-standard.md`, sibling-authored). Gates nothing on the color-topology critical path.
- **`proof:*` codification idiom RETIRED as overfit.** Invariants enforced **structurally** (branded types + tsc/vue-tsc, eslint, the excision itself, close-time human grep-review) — no committed `proof:*` scripts. All `K.md` text naming `proof:no-glass-in-lib` / `proof:resolution` / `proof:as-any-budget-demo` / `proof:i1-fourier-closed` / "9 prior proof scripts" de-referenced. The 9 `scripts/proof-*.mjs` + `package.json` `proof:*` entries are **deleted** (along with CHANGELOG/CONTRIBUTING/VENDOR-POLICY/migrate-keyframes/mongo-init/backup.sh — see `audit/path-forward §3` de-ceremony).
- **`docs/tranches/C/` disposition** → **commit-as-retired-record** (untracked but cited as canonical "C-precedent" arc-wide; already in terminal close-state). One-shot `git add`; do not re-open.
- **Baseline correction (folded forward to L):** the transposition audit's "Smell #6" mis-cited `dispatch.ts` as `api/src/...`; it is `src/units/color/dispatch.ts` (372 LoC, library) — already K.W2(e), **not** an L item.

## K.W1 grounding corrections (2026-06-02) — the specs supersede stale K.md/coordination details

The 5 K.W1 CORE specs were authored GROUNDED in real value.js + glass-ui code (file:line-cited); they are the binding work-orders and caught drifts the doc-only W0 audit had wrong. Where a spec diverges from K.md prose, the **spec is authoritative**:

- **glass-ui re-pinned**: `84a6cc1`/@3.1.0/tranche-K → **`756adcc`/@3.1.1/tranche-AS**; `dist/` now ships **464 `.d.ts`** → the dts cohort-prerequisite is **CLOSED** (dropped from K.W2). (`coordination/glass-ui.md` updated.)
- **inv-K-4 resolution**: both resolvers currently target `dist/` (the "Vite=source / vue-tsc=dist" framing was wrong); the real fix is the symmetric `development` export-condition — `K.W1-cross-repo-topology.md`.
- **OKLab dedup** rewires the **4 KEPT** aurora helpers (they call the deleted primitives), not just deletes the 8 dups — `K.W1-cross-repo-topology.md §5`.
- **glass-ui's value.js dep** is a registry devDep `^0.10.0` (0 `src/` imports), not a `file:` phantom → peerDep promotion is clean.
- **WatercolorDot = 9 consumers (not 8)** + an SVG-filter `filterId` seam + a `prng` lift prerequisite — `K.W1-primitive-lift.md`.
- **The "8 glass-ui asks" collapse to ~4 net-new**: Tabs-underline already ships (`UnderlineTabs.vue`); BlobDot = the WatercolorDot lift; Metaballs API = the GooBlob lift — `K.W1-primitive-lift.md §6`.
- **D1 fix is GLSL OKLab** (not a speculative LUT; LUT-bake BOOKED to K.W4) — `K.W1-primitive-lift.md §3`.
- **Modern-web refutes**: `scheduler.yield` on image-quantization REFUTED (already a Web Worker) → re-sited to the palette-list loop; `Intl.DurationFormat` REFUTED (timestamps already modern); `sortablejs` is consumed via `@vueuse/integrations` (a K.W3 concern) — `K.W1-modern-web-router.md §0`.
- **vue-router 4→5 confirmed zero-breaking** (no `unplugin-vue-router`); VIEW_MAP single-source deletes `componentFor`'s if-ladder + its `return ColorPicker` escape hatch.

## Grand-audit fold (2026-06-03) — the Playwright-grounded constellation audit

The 2026-06-02/03 mandate (Playwright + frontend-design plugin + Google modern-web guidance across the whole constellation, local + prod, 8+ agents) ran as a long-horizon workflow (W0 orientation → W1 capture → W2 4-lens → W3 modern-web/glass-gap/8-rules → W4 chronic → synthesis → W5 per-repo authorship). value.js artefacts under `audit/visual-evidence-2026-06-02/grand-audit/`: `constellation-grand-audit-2026-06-02.md` (spine), `W1-FINDINGS.md` + `W1b-LOCAL-CAPTURES.md` (live capture, local :9001 + prod), `W4-CHRONIC-LEDGER.md`, `MASTER-FINDINGS.md` (185-row consolidated ledger, 11 repos), captures in `grand-audit/` + `grand-audit/local/`.

- **CORE spec added**: `design/K.W1-grand-audit-refinement.md` — folds the grounded value.js findings into K.W3 (blob C3 footprint-contract/corner-anchor/satellite/spring-mood), K.W4 (aurora C2 palette-derive + `@property --active-color` + dynamic-bg contrast-guard + AuroraPane-live), a new **K-motion lane** (C1 dock `transition:all` strip + spectrum/slider/`@starting-style`), a new **K-typo/a11y lane** (Fraunces axes, φ-ladder, `:user-valid`), K.W5 modern-web (`@container`/content-visibility/`scheduler.yield`/`light-dark()`), and a **K.W2 api-lane CRUD functional test** (the user "test the CRUD" mandate).
- **The 3 critiques are confirmed live + at prod** (`color.babb.dev`, `grand-audit/valuejs-picker-PROD.png`): C1 dock = host-wrapper `transition:all` (glass-ui `.glass-dock` already correct); C2 aurora = full-viewport WebGL canvas overpaints the palette-tinted body with glass-ui's static "Sky" preset (palette-blind by construction); C3 blob = 160%-canvas-in-112px-cell footprint/render disagreement + 0×0 satellite. Card chrome is OK (transient earlier read, dropped).
- **DEC-1 (configurator side)**: keep RIGHT constellation-wide, reversibly (glass-ui `asideSide` defaulted RIGHT); fourier's real defect is the empty-state void, not the side. value.js is unaffected (picker is 2-col picker|info, not a stage|aside). Recorded in `audit/constellation-grand-audit-2026-06-02.md §6.5`.
- **Cross-repo**: glass-ui-owned levers (deriveAurora · Metaballs/BlobDot · self-hosted Fraunces face · Input-invalid · `--dock-motion` · Configurator `asideSide`) are ADOPTION ASKS to the glass-ui AS peer under `coordination/glass-ui.md`. Sibling tranche specs authored in-repo (fourier J · glass-ui AS · speedtest AT · keyframes A · muster K · slides B · words A + sudoku/bbnf/deploy audit docs). Execution ordering: `audit/.../grand-audit` (W_final, pending).

