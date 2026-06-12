# N.W5 — verification lane (W5.A/B/C/D/E)

**Date**: 2026-06-11 · **Branch**: `tranche-f-handoff` · **HEAD**: `0deca84`
**Verifier**: N.W5 verification lane (independent gate, NO code edits)
**Substrate**: W5.A/B/C/E landed at `e32111c`; W5.D landed in the working tree (the
`useLayerTransition` + `DockSeparator` adoptions); W4 (`e62567a`) + W7.A/B (`9cd815e`,
`0deca84`) landed after e32111c. All W5 surfaces verified against the current tree at HEAD.

---

## 1 · Environment precondition — glass-ui dist health

| Check | Expected | Observed | Verdict |
|---|---|---|---|
| `find ../glass-ui/dist -name "*.d.ts" \| wc -l` | ~551 | **551** | ✓ |
| `../glass-ui/dist/styles/segmented-tabs.css` exists | yes | **9487 bytes** | ✓ |
| `../glass-ui/dist/glass-ui.css` | present | **41361 bytes** | ✓ |

Dist was HEALTHY for the entire run — **no rebuild was needed**. The sibling dts-less
`vite build --watch` (PID 31281, since 3:03PM) IS running and DID flap the demo dev server
intermittently (see §4), but it never wiped the dist d.ts during a gate window. No
`cd ../glass-ui && npm run build` was invoked.

## 2 · Gate matrix (ALL recorded)

| Gate | Command | Result | Evidence |
|---|---|---|---|
| **typecheck** | `npm run typecheck` | **EXIT 0** | `vue-tsc -p tsconfig.lib.json` + `tsconfig.demo.json`, both clean, no TS7016 cohort |
| **lint** | `npm run lint` | **EXIT 0** | `eslint . --max-warnings=0` clean |
| **boot-smoke** | `npm run boot-smoke` | **PASS** | demo mounts (`role=main` "Color tool panes"), console-clean (cold dep-optimizer cache). Attempt 1 FAILED on a `hmr update /style.css` mid-mount (sibling-watch flap); attempt 2 (cleared `node_modules/.vite`) PASSED. boot-smoke is authoritative for console-cleanliness. |
| **abrogation-sweep (inv-N-7)** | `npm run abrogation-sweep` | **EXIT 0** | exports-map diff ✓ (75 live subpaths) + retired-classes sweep ✓ (11 entries, zero consumers in demo/) |

## 3 · Structural invariant checks

### inv-N-4 — bespoke design-system facilities deleted (ALL gone)

| Path | `ls` result |
|---|---|
| `demo/@/components/custom/goo-blob` | **No such file or directory** ✓ |
| `demo/@/components/custom/watercolor-dot` | **No such file or directory** ✓ |
| `demo/@/lib/animation/webgl-utils.ts` | **No such file or directory** ✓ |
| `demo/@/lib/animation/` (dir) | **No such file or directory** ✓ (no orphan dir) |
| `demo/@/components/custom/svg-filters` | **No such file or directory** ✓ |
| `demo/@/components/custom/dock/composables/useLayerTransition.ts` (fork) | **No such file or directory** ✓ |

### Grep invariants

| Check | Expected | Observed |
|---|---|---|
| `grep -rn "watercolor-filter" demo/ index.html` | no GLOBAL filter | only doc-prose (`demo/CLAUDE.md`) + an explanatory comment (`SpectrumCanvas.vue:275`). **`grep "url(#watercolor-filter)" demo/` → 0 hits.** No global filter reference remains. ✓ |
| raw `class="dock-separator"` divs | 0 | **0** (even the broad `dock-separator` literal grep → 0; all 13 are `<DockSeparator>`) ✓ |
| `grep -rn "useLayerTransition" demo/` | only the glass-ui import | **3 hits, all in `ActionBarLayer.vue`: the `@mkbabb/glass-ui/dock` import line + 2 comments.** No fork. ✓ |

## 4 · Adversarial — each lane's 2 boldest claims vs the tree

### W5.A (blob extirpation + consume)
1. **"Fork deleted (1270 LoC / 9 files), consume `@mkbabb/glass-ui/goo-blob` + live-palette via `deriveBlobPalette → config.color.paletteStops`."** — VERIFIED. `App.vue:107-108` imports `BLOB_CONFIG_KEY,BLOB_CONFIG_DEFAULTS` from `@mkbabb/glass-ui/goo-blob` + `deriveBlobPalette,oklchStopToHex` from `@mkbabb/glass-ui/color`; `App.vue:264-268` is the live watch setting `blobConfig.color.paletteStops = deriveBlobPalette(css,…).map(oklchStopToHex)`. Fork dir gone.
2. **"HeroBlob thinned to a 54-LoC consumer (no bespoke FSM)."** — VERIFIED. `HeroBlob.vue` is **54 LoC**, imports `GooBlob` from `@mkbabb/glass-ui/goo-blob`, calls only `setMood`/`nudge` on the component's exposed API; no idle/excited timers.

### W5.B (aurora-derive — the oldest mandate)
1. **"App.vue derives the atmosphere via the `AuroraAtoms` door + `resolveAtoms` getter + guarded `deriveAurora` seed-probe watch; `DEFAULT_AURORA_CONFIG` is gone."** — VERIFIED. `App.vue:104` imports `useAurora,resolveAtoms,deriveAurora,AuroraAtoms` from `@mkbabb/glass-ui/aurora`; `:221` `reactive<AuroraAtoms>(structuredClone(DEFAULT_AURORA_ATOMS))`; `:228` `useAurora(canvas,()=>resolveAtoms(auroraAtoms),…)`; `:241-242` the guarded `deriveAurora(css)` probe before `auroraAtoms.seed=css`. `grep DEFAULT_AURORA_CONFIG App.vue` → 0.
2. **"AuroraPane REBUILT off the stub (~189 LoC), false-footer killed."** — VERIFIED. `AuroraPane.vue` is **189 LoC**. The only "under rework" string is `:4`, a comment explicitly stating *"The W0 'under rework' stub is gone"* — doc-truth, not a live false-footer. Demo-wide sweep for "temporarily unavailable"/"itself is live" → 0.

### W5.C (watercolor-dot consume)
1. **"9 consumers re-pointed to `@mkbabb/glass-ui/watercolor-dot`."** — VERIFIED. `grep -rln @mkbabb/glass-ui/watercolor-dot demo/` → **10 files = 9 `.vue` consumers + `demo/CLAUDE.md` doc-prose** = exactly the 9 claimed.
2. **"The `.spectrum-dot` global-filter override removed; `#watercolor-filter` fully extirpated."** — VERIFIED. `SpectrumCanvas.vue:268-280` `.spectrum-dot` rule retains positioning/border/box-shadow but carries NO `filter:` line (a comment marks the removal). `grep "url(#watercolor-filter)" demo/` → 0.

### W5.D (dock adoptions — passed as MISSING, verified from the tree)
1. **"Local `useLayerTransition` fork deleted; `ActionBarLayer` consumes upstream + a 7-LoC `subLayerProps` adapter off `currentLayer`/`leavingLayer`."** — VERIFIED. Fork file gone. `ActionBarLayer.vue:8` imports `useLayerTransition` from `@mkbabb/glass-ui/dock`; `:62-65` destructures `currentLayer`/`leavingLayer`/`onTransitionEnd`; `:67` `subLayerProps(id)` adapter; 2 `v-bind="subLayerProps(...)"` sites.
2. **"13 raw `dock-separator` divs across 7 files → `<DockSeparator>`."** — VERIFIED. `grep -rn "<DockSeparator" demo/` → **13 usages across 7 files** (Dock.vue, ActionBarLayer.vue, SlugEditLayer.vue, ProfileSection.vue, MixResultDisplay.vue, ExtractControls.vue, ImageEyedropper.vue). 0 raw divs. DOM-confirmed at runtime: 9 live `.dock-separator` elements carry `role="separator"` + `aria-orientation="vertical"` (the a11y win).

W5.D **GREEN by tree-verification** (the W5.D status was passed as MISSING; the tree + the four W5.D gates — typecheck 0, lint 0, boot-smoke PASS, 0 raw divs — all hold).

### W5.E (phantom-class extirpation — inv-N-7)
1. **"`glass-elevated`→`glass-floating`, `glass-subtle`×2→`glass-wash` (retired classes gone)."** — VERIFIED. `grep glass-elevated demo/` → 0; `grep glass-subtle demo/` → 0. `MixResultDisplay.vue:31` `glass-floating`; both gradient editors `glass-wash`. abrogation-sweep (the inv-N-7 gate) is EXIT 0, corroborating zero retired-class consumers.
2. **"`pastel-rainbow-text`+`dashed-well` minted in `utils.css`; `stagger-children` PRM-gated in `animations.css`."** — VERIFIED. `utils.css:35` `.pastel-rainbow-text`, `:56` `.dashed-well`; `animations.css:34` `@keyframes stagger-child-in`, `:40` `.stagger-children > *` inside `@media (prefers-reduced-motion: no-preference)` (inv-N-9 PRM-gating confirmed).

**Verdict: all 10 bold claims hold against the tree. Zero discrepancies.**

## 5 · Visual evidence (the π seed)

Served the demo via `npx vite --force --port 9389` (project-root invocation, mirroring
boot-smoke, so the vite.config aliases + plugin-vue resolve). Headless Chromium (installed
playwright). Shots → `docs/tranches/N/audit/impl/shots/`.

| Shot | Content | Verdict |
|---|---|---|
| `w5-hero-blob.png` | Full demo: rose aurora field + glass picker card + the lit-glass blob (top-center) | ✓ demo renders |
| `w5-aurora.png` | The palette-tracking atmosphere (rose field, full-viewport webgl2 1440×900) | ✓ atmosphere live |
| `w5-blob-canvas.png` | **The blob canvas clip (179×179)** — a lit-glass shaded pink sphere | ✓ **paints** |
| `w5-mix-result.png` | `#/mix` route (the result `.glass-floating` card renders only after a mix; empty-state shows the picker) | ✓ route reachable |
| `w5-dock.png` | The collapsed `.glass-dock` (glass watercolor-dot icon + chevron) | ✓ dock surface |

### Blob non-empty-pixel assertion (THE π seed)
- The in-page `drawImage(webglCanvas)→2D scratch→getImageData` readback returned **all zeros**
  — this is the **WebGL `preserveDrawingBuffer:false` readback artifact** (the drawing buffer is
  cleared after compositing; an out-of-frame readback reads empty), NOT proof of non-paint.
- **Authoritative assertion (composited pixels):** an element-clip screenshot of the
  `canvas.goo-blob-canvas` bbox (363,130, 179×179) was decoded (playwright's bundled pngjs):
  **71 distinct colors (5-bit-quantized), luminance range 139→255 (span 116)** over 32041 px.
  A blank canvas would show 1 flat color and zero luminance range. **The blob canvas paints
  non-empty, varied pixels** — confirmed both numerically and visually (the lit-glass sphere).
- Canvas inventory in the live DOM: aurora atmosphere (1440×900 webgl2) + 2 `goo-blob-canvas`
  (179×179, 200×200, both webgl2). All armed.

### Notes on the two not-fully-populated shots (honest caveats, not defects)
- **Mix result card**: `MixResultDisplay`'s `.glass-floating` card is conditional — it only
  renders after colors are selected AND a mix is computed. The empty `#/mix` state does not
  show it. The `glass-elevated→glass-floating` edit is already structurally verified (grep +
  abrogation-sweep); populating the card needs interactive color-selection, out of scope for a
  flap-resilient capture. The route IS reachable and the pane mounts.
- **Dock**: captured in its collapsed icon state (54×54, top-center; hover →59×59, does not
  expand to a full bar in this layout/state). The 9 `.dock-separator` elements with
  `role="separator"` + `aria-orientation="vertical"` are DOM-confirmed — the W5.D a11y claim.

### The dev-server flap (environmental, documented)
The sibling glass-ui `vite build --watch` (PID 31281) intermittently HMR-churns `style.css`
through the `file:../glass-ui` symlink, making the demo `load` event mis-settle (mount timeouts
in some capture windows). Per the brief, ONE fresh `--force` restart was performed; some
later interactive captures (dock-expand, mix-populate) still hit the flap window. **boot-smoke
is authoritative for console-cleanliness and PASSES.** The standing fix is the glass-ui-owned
dts/CSS-emitting `build:watch` (the C-DTS ask, N.md §8) — outside this lane's scope.

## 6 · Verdict

**N.W5 (all five lanes) GREEN.** Every recorded gate passes: typecheck 0, lint 0, boot-smoke
PASS, abrogation-sweep 0 (inv-N-7). Every structural invariant holds (inv-N-4 all forks gone;
no global watercolor-filter; 0 raw dock-separator divs; useLayerTransition only the glass-ui
import). All 10 adversarial bold-claim checks hold against the tree with zero discrepancies.
The π blob-paint assertion is satisfied by composited-pixel evidence (71 colors, lum-span 116).
No code edits were made by this verification lane.
