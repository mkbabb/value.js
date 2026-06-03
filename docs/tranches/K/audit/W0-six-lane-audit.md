# K.W0 — Six-lane deep audit (the synthesized evidence base)

**Date**: 2026-06-02. **Mode**: read-only audit (one IMPL-touch: none — empirical validation ran existing test/build/proof commands only). **Authority**: the user's 6-agent deep-audit mandate. **Method**: six parallel charters — five analytical agents + one empirical-validation lane (run directly after a subagent session-limit failure). Findings below are deduplicated and cross-referenced; the per-lane candidate work-items are folded into `K.md §3/§7`.

---

## Lane 1 — Tranche arc + complete deferred ledger

**Arc** (A→J): A consumer-unbreak+design-audit (CLOSED in B.W0) · B close-A+simplify (CLOSED, `tranche-b`) · **C palette-CRUD RETIRED** (AB+1, never executed) · D contract-v2+api-refactor (v0.6.0) · E architectural-transpositions (v0.7.0) · F "no-deferrals"+lerpLegacy-retirement (v0.8.0) · G type-system-completion+decomposition (v0.9.0) · H cascade-correctness+demo-decomp (v0.10.0) · I CRUD-CONTRACT-v2 (CLOSED, fourier-E cohort) · **J REMIX+atom-diff — authored planning-only, ZERO waves executed**. Next letter: **K**.

**Precepts constraining K** (`docs/precepts/instructions/`): required doc set (`K.md`/`PROGRESS.md`/`FINAL.md` + conditional waves/research/audit/coordination); the paired goal+completion criterion at every unit level; the **zero-deferral ethos** (P-Inv 28 — "deferred to next tranche" is not a close-state when the user binds zero-deferral; the user's "fold chronically-deferred items" binds K); E5 (deferral must record blocker + smallest-unblock + time-bound trigger); F1 (no vague "later"); **G1 relay-before-ratification**; the 7-lane close ceremony incl. **π visual-runtime** (binding for visual changes) + **ι integrity-sweep**; the invariant-codification-as-`proof:*`-script idiom (G4/H4); KISS/DRY/no-legacy/abrogate-before-patch/architectural-transposition-over-patching.

**The chronically-deferred items (deferred ≥2 tranches), with disposition:**

| Item | Origin | Span | Why chronic | K disposition |
|---|---|---|---|---|
| **Aurora derive-from-color** | A m.13 / D-open #6 | A→J (7+) | glass-ui must ship `deriveAurora()`; precept-§10 wire-before-retire | **FOLD → K.W4** (co-author in glass-ui) |
| **Blob extirpation** (`useMetaballRenderer` + `WatercolorDot` → glass-ui) | A m.13 / D-open #6 | A→J (7+) | glass-ui must ship Metaballs/`BlobDot` first | **FOLD → K.W3** (paired-authorship) |
| **8 glass-ui primitive asks** | A coord/Q §3, E | A→I (6–7) | glass-ui authorship; value.js couldn't write | **FOLD → K.W3** (boundary now open) |
| **VAL-9** `spring()→LinearStop[]` emitter | constellation / A3 | G→J (3+) | ≥2-consumer gate unmet (keyframes+glass-ui) | **BOOKED** (gate glass-ui-side) |
| **VAL-1** OKLab aurora-LUT | constellation / A3 | G→J | ≥2-consumer gate unmet | **FOLD → K.W4** (gate fires at picker→atmosphere wiring) |
| **demo/ `as any`** (uncapped; src/-only) | H.W3 / I-SEED | H→J | cap is src-scoped | **FOLD → K.W5/close** (`proof:as-any-budget-demo`) |
| **id-field removal / Idempotency store / conformance suite** (I-tail) | I.W4 | I→J | backward-compat + cross-repo | **FOLD → K api-lane** (per J-disposition) |
| v1.0.0 declaration | H Block E / I-SEED | H→J | user-ratification-shaped | **K.W0 ratification gate** |

**User-request recapitulation** (the corpus across B/D/E/F/G/H-PROMPTS.md): 33 distinct requests across the arc; **all ADDRESSED or actively folded except #23 aurora-derive and #24 blob-extirpation** — both UNADDRESSED purely because glass-ui-peer-blocked, both with preserved algorithm sketches (`D/research/Dc-aurora.md`, `Dd-blob.md`) and named triggers. These two are the substantive K mandates from the user-request side. (Full table in K.md §0 / the agent transcript.)

**J current-state**: opened, planning-only, no `FINAL.md`, no `waves/`. Plans W0-audit → W1-design (DEV/IMPL boundary) → W2-W4 IMPL (REMIX/diff/VAL/I-tail) → W5 paired-close. Also carries an in-flight WAVE-C 4-lens frontend-design refinement (spec-only, not wave-scheduled). → the **J-disposition K.W0 gate** (`K.md §7`).

---

## Lane 2 — glass-ui ⇄ value.js gap audit

**glass-ui** (`@mkbabb/glass-ui@3.1.0`, `file:../glass-ui`): 43 shadcn/reka base + ~35 custom composites + 8 composable subtrees (`motion`/`glass`/`dom`/`dark`/`keyboard`/`sortable`/`reactive`/`sidebar`). Owns `aurora/` (WebGL + a full hand-rolled OKLab stack), `dock/`, `configurator/`, `glass-panel/`, `sortable-list/`, `tabs/`, `HoverPopover`, motion stack (`useViewTransition`/`useScrollProgress`/`useStaggerReveal`/`useYieldToMain`), `useBreakpoint`/`useTokenColor`/`useTouchGate`.

**Dependency direction — the CYCLE verdict: NO RUNTIME CYCLE.**
- value.js **demo** → glass-ui: REAL (`package.json:79` `file:../glass-ui`; ~40 import sites).
- glass-ui → value.js: **PHANTOM** — `glass-ui/package.json` lists `@mkbabb/value.js` in *devDependencies* but **zero src imports** (only prose comments + a `vitest.config.ts` note: it exists solely so `keyframes.js`→value.js resolves transitively in glass-ui's test sandbox).
- value.js **library** (`src/`) → glass-ui: **NONE** (`grep glass-ui src/` = 0). ✓
- **The trap**: the value.js *library* and *demo* are different DAG nodes. The naïve "de-dup OKLab by importing value.js into glass-ui" would promote the phantom into a real edge — and since the library never points back, this closes **no** cycle. Codified as **inv-K-1** so it isn't "fixed" the wrong way.

**Gap matrix** (demo hand-rolls that glass-ui should own): goo-blob (no glass-ui blob primitive) · WatercolorDot (8 consumers, no glass-ui equiv) · `sortablejs` raw dep (glass-ui `useSortable` exists) · ≥5 duplicated 1×1-canvas CSS-color resolvers · WebGL bootstrap triple-duplicated (demo `webgl-utils.ts`, hero-lab, glass-ui aurora inline) · the 8 filed primitive asks. **Already-migrated** (direction proven): `ui/alert` re-export, `useBreakpoint` (4 sites), `<Button>`, dark-mode toggle, search, confirm-dialog, aurora.

**ui/ vs glass-ui-first**: `VENDOR-POLICY.md` still frames `demo/@/components/ui/` as "generated shadcn, don't edit" but **most of the 22 dirs are now one-line glass-ui re-exports** — it has become a glass-ui *adapter shim*. Codify that reality (K.W3) rather than greenfield-migrate.

---

## Lane 3 — goo-blob / aurora / color-math (the technical crux)

**Headlines**: (1) aurora already lives in glass-ui and the demo already consumes it; goo-blob is the *only* WebGL primitive still stranded in the demo. (2) glass-ui carries a **byte-exact** OKLab/OKLCh/sRGB duplicate (`aurora/composables/color.ts`, ~110 LoC, same Ottosson coefficients). (3) The topology is already acyclic and correct — K *activates* the dormant `glass-ui → value.js-lib` edge. (4) **"derive-aurora" does not exist yet** — `App.vue:212` static-clones `DEFAULT_AURORA_CONFIG`; `AuroraPane.vue` is an "under rework" stub; but the derive *primitives* (`cssToOklch`, `flattenPalette`) already exist in glass-ui — only the wiring is missing.

**goo-blob** (`demo/@/components/custom/goo-blob/`, 1270 LoC): `GooBlob.vue` + `useMetaballRenderer` (343, WebGL2 lifecycle + 1×1-canvas color resolver) + `useBlobMood` (5-mood FSM) + `useBlobPointer` + `useBlobSatellites` (294, orbit/merge state machine) + `metaball.{frag,vert}.glsl`. **Zero value.js coupling** (`grep @src|value.js|parseCSS` = nothing — resolves color via its own canvas). **Zero demo-state coupling** (no palette/router/store imports). Consumers: `HeroBlob.vue` (FSM/triggers) + `BlobPane.vue`. → cleanly movable; FSM stays in demo, primitive moves.

**Color-math duplication map**: `linearize`/`delinearize`, `srgbToOKLab`, `oklab↔oklch`, `oklabToLinearRgb`, `oklab→rgb255`/`oklch→rgb`, `rgb→oklch`, `hex↔oklch` — all duplicated in glass-ui `color.ts`, canonical in value.js `gamut.ts`+`conversions/oklab.ts`. The 1×1-canvas CSS resolver exists **3×** (glass-ui aurora, goo-blob, and is what value.js `parseCSSColor` was built to replace). glass-ui has **no** gamut/contrast/mix dup. goo-blob's shader perturbs in **RGB↔HSV** (non-perceptual — the documented "HSV hue drift" footgun) while the ecosystem is OKLab-native → convert to OKLCh-LUT.

**Defects to perfect**: D1 HSV→OKLCh shader · D2 retire the 1×1-canvas resolver (inject) · D4 goo-blob loops 60fps forever (port aurora's demand-driven `needsAnimation`/`wake` gate — idle-power win) · D6 `BlobPane.vue:85-87` `as unknown as` double-cast (typed config schema) · D8 the AuroraPane stub · D9 the missing derive-wiring. Aurora runtime is otherwise exemplary — it's the reference goo-blob should be brought up to.

**Recommended topology**: promote glass-ui's value.js phantom devDep → **peerDep**; glass-ui aurora consumes value.js color math (delete the dup, keep aurora-consumer helpers `flattenPalette`/`oklchToLinear`/`paletteToCssGradient`); goo-blob → glass-ui parameterized by injected color resolver; FSM/triggers stay in demo. Every new arrow is `glass-ui → value.js-lib` or `value.js-demo → glass-ui` — acyclic by construction.

---

## Lane 4 — Pane system + vue-router

**Model**: a declarative two-layer system with **vue-router as the actual state engine**. Chain: `URL hash → route.name → useViewManager.currentView → VIEW_MAP[view] → usePaneRouter slots → PaneSlot <component :is>`. `viewSchema.ts:62` `VIEW_MAP` (14 views, pure data) is the layout source-of-truth; `usePaneRouter.ts` is a pure render-resolver (no state); `useViewManager.ts` wraps `useRouter`/`useRoute`. Views are routed; panes are derived layout — **a sound separation**. Persistence is URL-only (+ color in `?query` via `useColorUrl`).

**vue-router usage**: deliberately *headless* — every route maps to a no-op `Stub` (`router/index.ts:17`); **no `<RouterView>`/`<RouterLink>` anywhere**; rendering is hand-driven in `App.vue` via `PaneSlot` + KeepAlive. Uses ~30% of vue-router (history/query/catch-all) and **reimplements component-resolution by hand** in `componentFor`'s if-ladder (`usePaneRouter.ts:80-94`, incl. a `return ColorPicker` escape hatch). The 14 names live in **3 sync points**: `routes`, `VIEW_MAP`, `componentFor`.

**vue-router 5**: **released stable 2026-03-04** (latest 5.1.0); `unplugin-vue-router` (file-based + typed routes) merged into core. **For this app (v4 without unplugin): ZERO breaking changes** — only caveat is the IIFE/devtools-v8 bundling, irrelevant to ESM. New: file-based routing, **typed routes** (kills `route.name as string`), experimental Data Loaders (NOT for this app — fights the KeepAlive-mounted-pane model). Sibling `keyframes.js` already pins `^5.0.7`; value.js + glass-ui lag at `^4.6.4`.

**Recommendation**: keep vue-router as the (already) single source of truth; **bump to v5 (nearly free)**; **do NOT model panes as routes** (transient layout ≠ URL state — the current split is right); the elegance win is collapsing the 3-way name-sync into `VIEW_MAP` + **deleting `componentFor`'s if-ladder** (Option A, conservative) — a nested-`<router-view>` re-founding (Option B) is a higher-risk spike against the KeepAlive/reactivity gates, decide from a spike if at all. Dead surface: `goBack`/`previousView` have zero consumers.

---

## Lane 5 — Modern-web-guidance conformance

**Guidance** (`developer.chrome.com/docs/modern-web-guidance` + the GoogleChrome/modern-web-guidance catalog: 102 features / 128 use-cases): an installable AI-agent skill pack (`npx modern-web-guidance@latest install`, Claude Code path) pairing modern-platform replacements with Baseline targeting.

**Headline**: **glass-ui already passes** — it's Baseline-forward (view transitions, anchor positioning, scroll-driven, `popover=hint`+`interestfor`, `@starting-style`/`::backdrop`, container queries, subgrid, `field-sizing`, `light-dark()`, `scheduler.yield`, `content-visibility`, `inert`, `moveBefore`, `@supports`-gated throughout). **The value.js demo is the laggard** — it consumes glass-ui's `aurora` + re-exports primitives but does **not** consume glass-ui's motion substrate, and its own surfaces use legacy patterns.

**Legacy patterns present (all demo)**: Vue `<Transition>` pane swaps (`App.vue:244-281`, `PaneSlot.vue:35`) where View Transitions fit · JS `getBoundingClientRect`+rAF layer-width measuring (`useLayerTransition.ts:66-84`) · SVG `feTurbulence` watercolor filter (reconcile w/ watercolor extirpation) · viewport `@media` where `@container` fits (`EditDrawer.vue:91,98`) · `.dark` class fork vs `light-dark()` · **no `@layer`** discipline over Tailwind+reka+glass-ui · `Date.toLocaleString` vs `Intl.DurationFormat`. (Not legacy: the WebGL/canvas rAF render loops — legitimately rAF-driven; do NOT convert to scroll-driven.)

**Prioritized adoptions**: P0 View Transitions for pane switching (consume glass-ui `startViewTransition`) · P1 `@layer` cascade order · P2 `@container` for panes · P3 Popover+anchor for dock menus (glass-ui `HoverPopover`) · P4 scroll-driven for DOM ambience (not the WebGL loop) · P5 `light-dark()`/`text-wrap`/`field-sizing`. Perf: `scheduler.yield()` (INP), `content-visibility` (palette grid), `loading=lazy`, **add a `.browserslistrc`** (value.js has none; glass-ui floors Chrome-111+/Safari-16.2+ → Newly-available is safe with `@supports`). **Theme**: the demo should consume glass-ui's already-modern substrate, not hand-roll.

---

## Lane 6 — Empirical validation (ground truth, run directly)

Environment: `node_modules` present; glass-ui symlinked at `node_modules/@mkbabb/glass-ui → ../../../glass-ui` (HEAD `84a6cc1`, **5 uncommitted files**, **`dist/` NOT built**).

| Gate | Result | Detail |
|---|---|---|
| **vitest** | ✅ **1584 passed / 34 files** | 1.5s; clean |
| **lint** (`eslint . --max-warnings=0`) | ✅ exit 0 | clean |
| **9 proof scripts** | ✅ **all PASS** | `as-any` 0 · `as-unknown-as` 2 · no-deprecated · no-ts-ignore · resolution · dts-layout · codemod-publication · no-deep · no-bare-builtins (89 files) |
| **vue-tsc** (`--noEmit`) | ❌ **92 errors** | **75 `TS7016`** = "Could not find a declaration file for `@mkbabb/glass-ui`" (resolves to `dist/glass-ui.js`; glass-ui `dist/` absent) — **cross-repo build-state coupling**, vanishes when glass-ui is built. **16 `TS7006`** genuine implicit-any (11 in `hero-lab/HeroControls.vue`, 5 in demo SFCs). **1 `TS2339`** genuine (`tier` missing on type, `useAdminUsers.ts:88`). The CI "strict-zero (≤0)" gate (`node.js.yml:52`) is **currently violable**. |
| **Playwright** (5 projects) | ❌ **27 failed / 9 passed** | Root cause (clean single-spec re-run, no contention): the demo fetches `https://api.color.babb.dev/colors/approved`; the prod CORS policy allows `https://color.babb.dev` (not the `api.` subdomain, not `localhost`) → fetch refused → CORS console error → `expect(consoleErrors).toEqual([])` fails suite-wide; the failed data-load cascades into `getByRole('option',{name:'Browse'})` view-select timeouts. `setupEnvNoise` filters 4xx/5xx *text*, not CORS-preflight-class. The wall-clock reactivity spec (532ms vs 50ms) is **contention-inflated** (I ran it under concurrent vitest+vue-tsc load; config explicitly notes `workers:1` sensitivity) — not a genuine regression, but the CORS failure is. |

**Doc-claim vs reality DRIFT**: CLAUDE.md "vue-tsc strict-zero (≤0)" — **DRIFTED** (92 locally; gate green only when glass-ui is pre-built AND hero-lab/demo anys are fixed). I/J FINAL claims of green e2e — **DRIFTED** on this working tree (the demo's prod-API CORS fetch). These two RED gates are why **K.W2 is a substrate-restoration precondition** before any other wave.

**Tooling**: node present; vitest/playwright/vue/vite/typescript current; `vue-router` resolved **4.6.4** (pinned `^4.6.4`); `@mkbabb/glass-ui` `file:../glass-ui` symlink live (dist unbuilt).

---

## Synthesis → K

The six lanes converge on one thesis: **the value.js ⇄ glass-ui boundary is the unfinished, fragile, and most-requested frontier.** The library is hardened; the relationship is not. K's spine — (W2) restore the gates + make the DAG acyclic with one canonical color core; (W3) consummate glass-ui-first by lifting the stranded primitives + landing the carried asks; (W4) discharge the two oldest mandates (aurora-derive + blob-extirpation) now that the boundary is open; (W5) bring the demo to glass-ui's modern-web grade + vue-router 5 — addresses every user-stated concern (glass-ui gaps, goo-blob abstraction, aurora/derive, OKLab dup, cyclical deps, pane system, vue-router 5, modern-web guidance, Playwright validation) and folds every chronic deferral. The three W0 ratification gates (J-disposition, v1.0.0, cohort model) precede dispatch per inv-G1.
