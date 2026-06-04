# K — PROGRESS

**Status board.** Updated at every wave boundary. K is **planning-only at open**; no IMPL wave dispatches until the three K.W0 ratification gates close + the W1 CORE specs land + explicit user ratification (inv-G1).

## Wave status

| Wave | Disposition | Status | Gate |
|---|---|---|---|
| **K.W0** — Open + six-lane audit | DEV (audit) | **CLOSED** (2026-06-02) | Audit + request-coverage + adversarial verification done; `K.md` authored + revised; **3 ratification gates RESOLVED** (below) |
| **K.W1** — Design | DEV (design) | **CLOSED** (2026-06-02) | **5** CORE specs authored + reviewed PASS (`design/K.W1-{cross-repo-topology,primitive-lift,aurora-derive,modern-web-router,visual-evidence-protocol}.md`), GROUNDED in real value.js + glass-ui code — drift-corrections folded (see "K.W1 grounding corrections" below) |
| **K.W2** — Substrate restoration + acyclic topology | IMPL (cross-repo) | **CLOSED** (2026-06-03) | **All gates GREEN** — see "K.W2 execution record" below. vue-tsc 0 *with glass-ui dist deleted* (inv-K-4 build-state independence proven) · inv-K-1 src/ glass-ui = 0 · glass-ui OKLab dedup + 1e-6 equivalence canary 6/6 (inv-K-2) · value.js peerDep · inv-K-5 page-load console-clean vs no backend · dispatch.ts 349 ≤350 · api-lane (idempotency + conformance 22/22 + id-removal) · unified CI/CD + lighthouse/axe + DEC-9 deploy + provenance · dev.sh/deploy.sh micro-lane (f) |
| **K.W2.5** — Resolution-architecture transposition (NEW) | IMPL (cross-repo, corrective) | **SPECCED** (2026-06-03 post-W2 audit) — awaits user ratification + IMPL. **Reverses `inv-K-4` mechanism-A (a contract-v2 precept violation that fails glass-ui `proof:resolution`) → mechanism-C by deletion** (dist-resolution + `build:watch` JS+dts freshness; retire the 4 band-aids; refresh reka-ui; keep the tsconfig split). Binding: `design/K.W2.5-resolution-transposition.md`. Lands first; dissolves the dock-Select reka-skew. |
| **K.W3** — glass-ui-first consummation (RE-SPECCED) | IMPL (cross-repo) | **SPECCED** — `design/K.W3-respec-*.md`. Re-shaped for **published-dist consumption** (W3a glass-ui-author→publish-3.2.0; W3b value.js-consume-from-dist) + the `parseCSSColor` typing root-fix (value.js 0.11.0, lands here, deleting a 10+-site cast surface) + the J.W3 PaletteDiff fired-orphan. Dispatch after K.W2.5-green. |
| **K.W4** — Aurora-derive + VAL-1 | IMPL | **BOOKED** | gated on glass-ui 3.2.0 (K.W3) + keyframes 3.0.0 (absent — at 2.2.0). The glass-ui `deriveAuroraPalette` builds on the K.W2 post-dedup color.ts (now landed). VAL-1 ship-or-kill at K.W4 close. |
| **K.W5** — Modern-web parity + router | IMPL | **BOOKED** | gated (per user) on glass-ui 3.2.0 + keyframes 3.0.0. The vue-router 4→5 bump pairs with keyframes' ESM-major; the Tabs-underline `@layer`/`light-dark()` levers ride glass-ui 3.2.0 asks. |
| **K.W6** — Close | DEV (close) | **BLOCKED** on W3–W5 | 7-lane ceremony · π visual-runtime · v1.0.0 verdict · cohort close |

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

## K.W2 execution record (2026-06-03) — IMPL dispatched + CLOSED

**Empirical correction at W2-open.** The W0 baseline ("vue-tsc 92 errors, 75 = glass-ui build-state coupling; Playwright 27 failed") reflected glass-ui's `dist/` being absent. At W2-open glass-ui's `dist/` was present (3.1.1) → vue-tsc was **1 error** (`useAdminUsers.ts:88` `tier`), 0 TS7016. The split's value is **build-state independence**, not a specific error delta — and glass-ui's dist `.d.ts` proved *volatile* (rebuilt JS-only mid-session), which is precisely the coupling inv-K-4 removes.

**Lanes landed (per-lane commit + gate):**
- **K.W2a** (`c4c5842`) — `tsconfig.base/lib/demo` split + thin solution root. The library program (`tsconfig.lib.json`, `src/` only) is glass-ui-free *by construction* (inv-K-1). The demo program source-resolves glass-ui via a NEW `development` export condition (added to glass-ui's 68 object-form exports + value.js's own). **inv-K-4 binding gate PROVEN: vue-tsc 0 with glass-ui `dist/` deleted.** Because source-resolution pulls glass-ui `src/` into the demo program, `scripts/check-types.mjs` scopes the gate to value.js-OWNED errors (`src/`+`demo/`), excluding glass-ui-internal diagnostics (glass-ui's CI owns those; a `.ts` dep has no `.d.ts` trust boundary). `vite-plugin-dts` repointed at `tsconfig.lib.json` (flat `dist/*.d.ts` preserved). `tier` fixed type-honestly (the API returns `{slug,status,tier}`).
- **K.W2e** (`5d97030`) — `dispatch.ts` 372→**349** LoC (G3 ≤350). The contrast cluster already lived in `contrast.ts`; dropped the pass-through, repointed both barrels (surface byte-identical).
- **K.W2c cohort** (glass-ui `6d3e151` + value.js `de0c60a`) — **inv-K-2**: glass-ui `aurora/composables/color.ts` DELETES 8 OKLab/sRGB duplicates + dead `clamp`, rewires the 4 kept helpers onto value.js. NEW `__tests__/color-equivalence.test.ts` (the canary) **6/6 green to 1e-6** (incl. out-of-gamut Math.max wrap, hex round-trips, GPU-bake stability). `@mkbabb/value.js` devDep→**peerDependency**. value.js demo self-aliases `@mkbabb/value.js`→`src/` so the single local core resolves when the demo source-loads glass-ui.
- **K.W2b** (`13587f9`) — **inv-K-5 MET**: `page-load.spec.ts` boots with **zero console errors vs no backend** (`VITE_API_URL`→same-origin dev server; optional color-names read fail-silent; narrow CORS clause). Also FIXED a dual-Vue Teleport `insertBefore` crash my source-resolution introduced (expanded `resolve.dedupe` to the `@vue/*` family + reka-ui).
- **K.W2 api-lane** (`59aab42`) — folds J's executed atom-diff/publish substrate + lands the I-tail: `middleware/idempotency.ts` (LRU 24h replay store), conformance `idempotency`+`crud` tests (**22/22**), `id` hard-removed from the palette envelope (consumer audit GREEN), per-call-site `ifMatch`/`idempotencyKey` (found + fixed a latent remote-PATCH 428 break). api suite **153/27**.
- **CI/CD** (`57c0928`) — `ci.yml`+`node.js.yml` collapsed to ONE unified `ci.yml` (concurrency · Node 22/24 · the ladder · playwright page-load HARD + smoke SOFT · NEW lighthouse soft-launch). `release.yml` npm **provenance** + `id-token`. **DEC-9 deploy**: `api/deploy.sh` rsync outlier DELETED; `api/CLAUDE.md` repointed to `api.color.babb.dev :8130` git-push→webhook; `lighthouserc.json` (CLS≤0.1/LCP≤2.5s/INP≤200ms/TBT≤300ms) + `.env.example` + the `dev.sh`/`deploy.sh` micro-lane.

**K.W2 close gate sweep (2026-06-03, all GREEN):** inv-K-1 src/ glass-ui=0 · vue-tsc 0 *with glass-ui dist deleted* · lint 0 · vitest 1584/34 · build+flat-dts(40) · dispatch 349 · glass-ui equivalence 6/6 · Ottosson coeffs defined once · api 154/27 + conformance 23/23 · playwright page-load console-clean.

**Adversarial review (3-critic workflow) caught + FIXED 4 real bugs the gates missed:** (1) `check-types.mjs` matched the foreign-path regex against the WHOLE diagnostic line → a real demo error whose MESSAGE quoted a `@mkbabb/glass-ui/*` subpath was silently dropped (the dominant demo import form) — now matches the FILE PATH prefix only; (2) inv-K-1 was build-state-dependent (a `src/`→glass-ui import resolves to dist when present) — added the structural eslint `no-restricted-imports` ban on `src/`; (3) the idempotency middleware cached 4xx/5xx (Hono's onError maps a thrown ApiError to a response before `next()` returns) → now captures ONLY 2xx, + an error-path conformance guard; (4) the `id`-removal broke remote-card expand (`BrowsePane`/`PaletteBrowseTab` keyed on `palette.id`, now undefined → all cards expanded) — re-keyed on `palette.slug`. Minor: cssToOklch semantics documented; the equivalence-test tautology recorded (parity independently proven by a 200k-sample sweep).

**Booked at K.W2 close (E5 triggers):**
- **dock view-select dropdown** (16 view-switching e2e specs) — pre-existing (fails under BOTH dist- and source-resolution; predates K.W2), orthogonal to the color topology. Root cause: the dock's collapsed summary-layer (`Dock.vue:200`) stacks over the combobox in headless + the glass-ui `DockSelectTrigger`↔demo-reka-ui Select context (reka-ui skew demo 2.8.2 / glass-ui 2.9.7). *Trigger*: a dedicated dock-interaction fix — make the summary layer `pointer-events:none` + the full layer focus-reachable when collapsed (likely a glass-ui GlassDock cohort fix), and/or align the demo's reka-ui to `^2.9`; re-check at K.W5 (the dock Popover lane) or a focused lane.
- **K.W3** (goo-blob/WatercolorDot lift + asks + sortable) — *Trigger*: a 2-session window for the D1 OKLCh shader port + settling the demo-consumption source-resolution dual-instance posture (consume glass-ui dist 3.2.0, OR resolve the reka-ui skew). The K.W2 substrate (peerDep, post-dedup color.ts, the shared-core boundary) is the green foundation it builds on.
- **K.W4 / K.W5** — gated on glass-ui 3.2.0 (K.W3) + keyframes 3.0.0 (absent, at 2.2.0). Not dispatchable this session.

## Post-W2 deep audit (2026-06-03) — tranche perfected, NO implementation

A three-wave, 6-agent-per-wave audit (W1 diagnostic → W2 solution-design → W3
adversarial-grounding) audited the **executed** K.W2 + the remaining plan + the live
cohort. Synthesis + the canonical DAG: **`audit/path-forward-2026-06-03-postW2.md`**.

- **The headline finding (gate-grounded):** K.W2's `inv-K-4` mechanism-A (the
  `development` export condition) is a **contract-v2 precept violation** — it FAILS
  glass-ui's own `proof:resolution` gate on both repos and is the **root cause** of the
  dual-instance fragility (the dock-Select blocker booked above is downstream of it).
  The reka-ui "skew" is a **single stale 2.8.2 install**, not two instances. The
  gestalt: **mechanism-C by deletion** (restore dist-resolution + `build:watch`),
  specced as the NEW corrective lane **K.W2.5**. **Continuation of K** (a mechanism
  swap; the inv-K-1 split + inv-K-2 dedup + api-lane + dispatch + CI/CD stand).
- **The re-specced waves** (all on the contract-v2-clean substrate):
  `design/K.W2.5-resolution-transposition.md`, `design/K.W3-respec-*.md`,
  `design/K.W4-respec-*.md`, `design/K.W5-respec-*.md`,
  `coordination/cohort-glassui-3.2.0-keyframes-3.0.0.md`.
- **Publish spine (acyclic):** value.js 0.11.0 (the `parseCSSColor` typing root-fix)
  → glass-ui 3.2.0 (cut against it) → value.js K.W3b/K.W4 consume the 3.2.0 dist.
- **W3 keystone correction:** glass-ui `build:watch` is JS-only; the cohort must make
  the watch emit dts (the dist-resolved typecheck depends on it). The dock fix is an
  `:inert`-predicate realignment, NOT new CSS (that already ships). The demo `Palette`
  union simplifies to `id?:` + guards. VAL-9 = KILLED (struck). J.W3 PaletteDiff →
  re-homed to K.W3.
- **glass-ui-session coordination:** STRIP — revert only the `development` exports-half
  of `6d3e151` (keep the inv-K-2 dedup); glass-ui ships 3.2.0 contract-v2-clean. No
  tug-of-war (value.js is revoking mechanism-A in K.W2.5).

## Visual-grounded audit round (2026-06-04) — the screenshot session, NOT deferred

Per the "screenshot session of every page, now" mandate: an **84-capture instrumented
session** (every view × 3 viewports × light/dark, `audit/visual-evidence-2026-06-04/`
+ `DELTA.md`) fed **two serial 6-agent workflows** (visual audit → synthesis). It
confirmed the doc-only verdict AND surfaced a P0 only the pixels could reveal.

- **NEW P0 — `K.W2.6` Desktop pane-visibility** (`design/K.W2.6-desktop-pane-visibility.md`):
  desktop secondary-view panels render off-screen-left/blank (mobile fine). **Live-
  reproduced** root cause = a **Tailwind v4 `@source` emission gap** (`App.vue`'s
  `lg:*` pane-visibility utilities never generated → base `hidden` wins). The grand-
  audit P9 class, in the app shell. Fix = `@source` directive. Lands after K.W2.5,
  before K.W3.
- **C2/C3/C1 confirmed in pixels:** aurora palette-blind static Sky (→K.W4, the glass-ui
  session has already authored `deriveAurora`); blob footprint mismatch — satellite
  visible, "0×0" refuted (→K.W3); dock collapsed-not-absent at desktop (→glass-ui W-D).
  The `/atmosphere` "live" footer is provably false (→K.W4 copy-fix).
- **π visual-runtime lane SPECCED + grounded** (`design/K.W6-pi-visual-runtime.md`): the
  84 captures are the K-open baseline; binding K.W6 assertions = aurora re-tint hue-shift,
  blob present/positioned, desktop-panel-in-viewport, distinct-view-content, dock
  focus-reachable, WCAG-AA contrast. `/tmp/capture.mjs` → `scripts/capture-visual-runtime.mjs`.
- **Strengths to guard:** Fraunces typography (not generic-AI), dark-mode parity, the
  inv-K-5 degraded-backend surface, banding-free spectrum (inv-K-2 intact).
- Wave DAG shape UNCHANGED (acyclic; serial publish spine intact); the screenshot-session
  mandate is SATISFIED. Continuation of K. Synthesis: `audit/path-forward-2026-06-03-postW2.md §9`.

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

