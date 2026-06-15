# N.W15 — PERF: the idle-floor kill, the interaction reflows, the reactivity fan-out, the bundle hygiene + the U6/U16 dock-morph-truth harness (born-RED)

**Status: RATIFIED** (the WAVES-2 second block ratified 2026-06-15 — `EXECUTION-ORCHESTRATION.md §0`/`§5`).
No longer PLANNED.

**Round:** R3 (the design body — `EXECUTION-ORCHESTRATION.md §2`). Runs beside N.W13 (controls),
N.W14 (cards), N.W16 (per-pane), N.W17 (shell/motion/pops). **Consumes N.W10.D's single-mount +
the rendering desktop** (the gate-opener precedes the body — DAG `WAVES-2.md:276-287`). Carries
the **born-RED dock-morph-truth e2e** (lane D) that stays RED until glass-ui A-1 lands and flips
green at the W18 pin — *by design*.

**Disposition:** IMPL split (perf is measure-first, not Fable design) — lanes A/B/C are
demo-unilateral; lane D's morph-truth harness is BA-gated (born-RED) and the named producer-fix
cluster (`A′-1..A′-5`) is FILED into the glass-ui letter, verified at W18.A.

**Idiom:** matches `N.md §4` + `WAVES-2.md §N.W15` + the N.W10/N.W11/N.W14 wave-spec precedent —
§-structured, hard-gate-per-lane, file:line-grounded; every claim cites a `demo/` file:line, an
audit-lane §, or a command+output run TODAY against the working tree / built `dist/gh-pages` /
installed glass-ui 3.13.0 (inv ε). **DEVELOPMENT doc — nothing implemented; no source/test/CI
edits.** Every anchor is a SPEC binding-site, not a change.

---

## §0 — One-paragraph reading

L-PERF2 proved the decisive thing: **U6 (dock "slow, laggy, jittery"), U12 (pane/card transitions
"not smooth"), and U23 (dropdown "jerks") are ONE root cause, not three cosmetic tweaks** — a
continuous ~4-RAF / live-WebGL **idle floor** (~16 fps at rest, `document.getAnimations()` reports
0 CSS animations, so the entire idle cost is shader RAF loops) that starves every interaction's
*presentation* phase (the dock INP is 255 ms of presentation delay vs 2 ms input delay). The
contributors are measured and attributed to exact lines: an eagerly-armed 2880×1800 (≈20 MB
GPU-side) aurora WebGL surface mounted synchronously at boot; a zombie second goo-blob canvas
(0×0 CSS box, 400×400 backing, live WebGL2 context + its own RAF) that is pure waste; a per-frame
`getBoundingClientRect()` read inside the rAF-throttled spectrum-drag handler *after a same-frame
color invalidation* (textbook layout thrash); a one-color-write fan-out that runs `deriveAurora`
**twice**, re-derives the blob palette, and re-stripes all `channels × 11` slider gradients
(33 deep-clones + 33 conversions) every tick; and ~10 wholesale-replaced API arrays held in deep
`ref<T[]>` proxies. N.W15 does the demo-owned half: defer-arm the decorative aurora + lazy-`import()`
the glass-ui aurora/goo-blob chunks off first paint + lift lucide out of the two boot-critical
modules (lane A); cache the spectrum rect on `pointerdown` + coalesce the three color sinks into one
rAF-batched effect + kill the double `deriveAurora` + memoize `computeSliderGradients` to re-stripe
only the dragged channel (lane B); `shallowRef` the wholesale-replaced API arrays (lane C); and wire
the **production Lighthouse trace** (the missing artifact — never mistake the 5 s *dev* LCP for prod)
+ the **morph-truth e2e** + the four perf invariants (single-mount / no offscreen live GL / composited
CLS ≤ 0.1 / no per-tick router churn) into CI (lane D). `DOCK_SPRING` is FENCED — it is correctly
tuned (`response 0.32, ζ 0.7`); the debt is the idle floor, NOT the spring constants, and retuning
it is a forbidden shortcut. The deterministic producer-side dock root (a nested DockLayerGroup that
makes the outer FLIP measure `to≈0px` → a wrong-direction 55→19 px spring + ~455 ms dead-hold + a
1-frame snap to 280 px) is glass-ui A-1; the morph-truth harness is born-RED against it and closes
U6/U16 ONLY at the W18 pin verify.

---

## §Provenance — the audit lanes + file:line roots

| Source | What it provides | Locus |
|---|---|---|
| User audit **U6** | "Dock animations/transitions take FAR too long to squish/morph; slow, laggy, jittery" — the headline W15-harness ask | `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md:30` |
| User audit **U16** | "Dock slow, NOT SIZED PROPERLY between transitions" — the morph-sizing half of the harness | `LEDGER.md:31` |
| User audit **U12** | "Pane transitions + card transitions not smooth" — L-PERF2 §4 proves it is the SAME idle-floor root as U6/U23 | `LEDGER.md:32` |
| User audit **U23** | "Dropdown open animation jerks" — L-PERF2 §3 proves it is the 18/125 ms ping-pong against the idle floor | `LEDGER.md` U23 row |
| User audit **U33** | "Background aurora completely broken: does not move, no shade variation" — L-PERF1's defer-arm + DPR cap ride the same aurora surface (the motion verdict is W10.B's; the GPU-weight is W15.A) | `LEDGER.md:16` |
| Lane **L-PERF1** | the boot + memory profile: the 3-live-WebGL2-context census (1 fully hidden), the 21.8 MB native heap (the 2880×1800 aurora backing), the eager-lucide-at-boot finding, the dep-optimizer bundle weights, the **missing production Lighthouse gate** | `docs/tranches/N/audit/lanes2/L-PERF1.md` (full lane) |
| Lane **L-PERF2** | the interaction profiles + the ROOT proof: the ~4-RAF idle floor (64 RAF/s @ ~16 fps), the zombie second blob canvas, the presentation-bound INP shape, the per-frame forced-reflow file:line attributions, the proof that U6/U12/U23 are one root | `docs/tranches/N/audit/lanes2/L-PERF2.md` (full lane) |
| Lane **L-PERF3** | the perf-wave design substrate: the prioritized 1a..8b work-order, the reactivity fan-out census (the double `deriveAurora`, the 33-conversion slider hot leaf), the shallowRef/v-memo opportunities, the dist bundle composition, the four proposed perf invariants | `docs/tranches/N/audit/lanes2/L-PERF3.md` (full lane) |
| Lane **U-DOCK §1** | the DETERMINISTIC A-1 root: `restState w:55 → span to:0px → w 55→19.1 over ~200ms → ~455ms dead-hold at 19px → snap to 280.1px` (the `window.__exp2` capture) + the nested-DockLayerGroup FLIP-measures-`to≈0` mechanism | `docs/tranches/N/audit/lanes2/U-DOCK.md:55-74` |
| Lane **D5** (WO-D5-5) | the morph-truth acceptance spec: per-rAF width ∈ `[min·0.95, max·1.05]`, no frame-to-frame jump > 40% of span, 1%-settle ≤ 450 ms — born-RED until glass-ui A-1, intended | `docs/tranches/N/audit/lanes2/D5.md:121-126,265` |
| WAVES-2 §N.W15 | the ratified lane table A–D + the Blocked-on-BA register list + the hard gate | `docs/tranches/N/WAVES-2.md:141-162` |
| WAVES-2 §4 (inv deltas) | **inv-N-9** PRM-complete (VIOLATED at HEAD); **inv-N-12 (new)** the perf floor — single-mount / no offscreen live GL / CLS ≤ 0.1 / no per-tick router churn (W15.D wires the asserts) | `docs/tranches/N/WAVES-2.md:315-331` |
| WAVES-2 §5 (coverage) | U6 → W15 harness (producer fix verify → W18.A); U16 → W15 harness (→ W18.A); the L-PERF1/2/3 ledgers → W10.D + W15 (asks → W18) | `docs/tranches/N/WAVES-2.md:344-386` |
| EXECUTION-ORCHESTRATION §2 | R3 placement (R1 W10 gate-opener → R2 library+keystone → **R3 design body incl. W15** → R4 BA-consume → R5 close); the W10.D cascade-kill precondition | `docs/tranches/N/EXECUTION-ORCHESTRATION.md:65-83` |
| glass-ui letter Register **A′** | the FILED producer-fix cluster: `A′-1` zombie canvas (LP2-2), `A′-2` GooBlob visibility/PRM gate (LP3-1b), `A′-3` card-shrink composited keyframes (LP3-3a), `A′-4` `--dock-morph-t` cascade narrowing (LP2-4/5), `A′-5` aurora DPR cap (LP1) | `../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md` (Register A′); `WAVES-2.md:154-160,210-214` |

**Source-tree roots (the live defects + the live substrate, all verified 2026-06-15 at `tranche-f-handoff`):**

| File:line | What lives there |
|---|---|
| `demo/color-picker/App.vue:247-252` | `useAurora(atmosphereCanvas, () => resolveAtoms(auroraAtoms), …)` — called SYNCHRONOUSLY in `<script setup>` (eager-arm; lane A defer-arm target) |
| `demo/color-picker/App.vue:269-278` | the first `watch(cssColorOpaque, …)` → `deriveAurora(css)` PROBE (`:273`) + `auroraAtoms.seed = css` (`:274`) — the seed write that re-triggers `useAurora`'s deep-watch → `resolveAtoms` → `deriveAurora` AGAIN (the double-derive, LP3-5a; lane B) |
| `demo/color-picker/App.vue:249` | `() => resolveAtoms(auroraAtoms)` — the config getter `useAurora` deep-watches (`aurora.js` `{deep:!0}`, LP3 §5.1) |
| `demo/color-picker/App.vue:293-306` | the second `watch(cssColorOpaque, …)` → `deriveBlobPalette(css, {stopCount:4,…})` → `blobConfig.color.paletteStops` (the per-tick blob re-derive; lane B coalesce target) |
| `demo/color-picker/App.vue:229` | `reactive<AuroraAtoms>(structuredClone(DEFAULT_AURORA_ATOMS))` — the deep-watched atoms (LP3 §5.1) |
| `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:109` | `const rect = spectrumRef.value.getBoundingClientRect();` — read INSIDE the rAF-throttled `updateSpectrumColor` (`:107`) after the previous frame's color invalidation → the per-frame forced reflow (LP2-1; lane B) |
| `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:94-105` | `scheduleSpectrumUpdate` — the rAF throttle (correct: exactly 1 update/frame); `:13` `@pointerdown="handleSpectrumDown"` — the rect-cache point (lane B) |
| `demo/@/components/custom/color-picker/composables/useSliderGradients.ts:26` | `const computeSliderGradients = () => {…}` — the heaviest leaf: `channels × 11` × `sourceColor.clone()` (`:35`) + `toCSSColorString()` (`:37`) (33 clones + 33 conversions per change; lane B memoize) |
| `demo/@/components/custom/color-picker/composables/useSliderGradients.ts:45-55` | the `watch` whose KEY (`:50`) builds a string via `.entries().map(([k,v]) => …v.value.toFixed(3)).join()` on every reactive read (lane B) |
| `demo/@/composables/usePaneRouter.ts:32` | `} from "@lucide/vue";` — eager lucide barrel import in a boot-critical module (LP1-2; lane A) |
| `demo/@/composables/viewSchema.ts:32` | `} from "@lucide/vue";` — eager lucide barrel import in the second boot-critical module (LP1-2; lane A) |
| `demo/@/composables/palette/useBrowsePalettes.ts:20` | `const remotePalettes = ref<Palette[]>([])` — a wholesale-replaced API array held deep-reactive (LP3-6; lane C; + the ~9 siblings in §State-verified SV-5) |
| `demo/color-picker/App.vue:34,45,58` | the dual-mount slots (`lg:hidden` / `pane-wrapper hidden lg:flex` / `pane-wrapper hidden lg:block`) — the SUBSTRATE N.W10.D collapses to a single `v-if`-gated mount (the cross-wave precondition) |
| `e2e/smoke/webgl-goo-blob.spec.ts`, `e2e/smoke/reactivity-instant.spec.ts` | the existing smoke harness the morph-truth e2e + perf invariants extend (lane D) |
| `scripts/boot-smoke.mjs` | the boot-smoke gate (the single-mount canvas-count assert home; lane D) |

---

## §State-verified — the defect/absence proven TODAY (2026-06-15)

Every claim below is a command run against the working tree / built `dist/gh-pages/assets/` /
installed `node_modules/@mkbabb/glass-ui` at glass-ui 3.13.0 (value.js 0.12.0). No repo edits.

### SV-1 — The aurora is armed SYNCHRONOUSLY at boot + lucide is eager in the two boot-critical modules (lane A, LP1) — LIVE

```
$ sed -n '247,252p' demo/color-picker/App.vue
useAurora(
    atmosphereCanvas,
    () => resolveAtoms(auroraAtoms),
    { onInitError: (err) => console.warn("[aurora] init failed:", err) },
    { renderMode: auroraRenderMode },
);
$ grep -n "onMounted\|requestIdleCallback\|onIdle\|nextTick" demo/color-picker/App.vue | head
84:import { computed, onMounted, … } from "vue";
308:onMounted(() => { loadCustomColorNames(); });   ← onMounted exists, but NOT for the aurora arm
$ grep -n "lucide" demo/@/composables/usePaneRouter.ts demo/@/composables/viewSchema.ts
demo/@/composables/usePaneRouter.ts:32:} from "@lucide/vue";
demo/@/composables/viewSchema.ts:32:} from "@lucide/vue";
```

**Confirmed:** `useAurora(...)` runs at top-level `<script setup>` evaluation (`App.vue:247`), NOT
deferred behind `onMounted`/`requestIdleCallback` — the decorative `aria-hidden` atmosphere arms its
WebGL surface synchronously in the boot mount (L-PERF1 top-cost #3). Both boot-critical pane-config
modules eagerly import the lucide barrel (`:32` each) → lucide is on the first-paint module graph
(L-PERF1 #2). Born-RED: the eager arm + the eager barrel are the boot path today.

### SV-2 — The per-frame forced reflow on spectrum drag (lane B, LP2-1) — LIVE

```
$ grep -n "getBoundingClientRect\|updateSpectrumColor\|scheduleSpectrumUpdate\|pointerdown" \
     demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue
13:        @pointerdown="handleSpectrumDown"
94:const scheduleSpectrumUpdate = (event: PointerEvent) => {        ← the rAF throttle
107:const updateSpectrumColor = (coords: …) => {
109:    const rect = spectrumRef.value.getBoundingClientRect();      ← read inside the throttled callback
```

**Confirmed:** `getBoundingClientRect()` is read at `SpectrumCanvas.vue:109` INSIDE the
rAF-throttled `updateSpectrumColor` (`:107`, scheduled by `scheduleSpectrumUpdate` `:94`) — i.e.
once per dispatched move frame, AFTER the previous frame's `setCurrentColor` invalidated the
document (the 8 WatercolorDots + gradient + blob paletteStops re-render). The rect is invariant
during a drag (the spectrum box does not resize), so the read forces a synchronous layout for a
value that never changed (L-PERF2 §1: 35 `getBoundingClientRect` calls == 35 dispatched frames;
15 ms reflow on the contended trace). Born-RED: the read is inside the hot loop today.

### SV-3 — The reactivity fan-out: double `deriveAurora` + the 33-conversion slider leaf (lane B, LP3-5) — LIVE

```
$ sed -n '270,306p' demo/color-picker/App.vue | grep -n "deriveAurora\|deriveBlobPalette\|auroraAtoms.seed\|paletteStops"
4:            deriveAurora(css); // probe: throws iff the seed is un-parseable   ← derive #1 (the probe)
5:            auroraAtoms.seed = css;                                            ← triggers useAurora's deep-watch → resolveAtoms → deriveAurora #2
27:            blobConfig.color.paletteStops = deriveBlobPalette(css, {          ← the blob re-derive, separate sink
$ sed -n '26,55p' demo/@/components/custom/color-picker/composables/useSliderGradients.ts | grep -n "computeSliderGradients\|clone\|toCSSColorString\|toFixed"
1:    const computeSliderGradients = () => {
10:                const step = sourceColor.clone() as typeof sourceColor;        ← clone per stop
12:                const cssStr = toCSSColorString(step);                         ← conversion per stop
25:                .map(([k, v]: …) => `${k}:${v.value.toFixed(3)}`)              ← watch-key built per read
```

**Confirmed:** one `cssColorOpaque` write fans out to three synchronous sinks — (1) `deriveAurora`
runs at `App.vue:273` as a throw-probe AND again inside `useAurora`'s deep-watch on the
`auroraAtoms.seed` write at `:274` (LP3-5a: the double-derive), (2) `deriveBlobPalette` at
`App.vue:296` re-derives the blob palette (and with the W10.D-pre dual-mount, repaints two blobs),
(3) `computeSliderGradients` (`useSliderGradients.ts:26`) does `channels × 11` × `clone()` (`:35`)
+ `toCSSColorString()` (`:37`) = 33 clones + 33 conversions for a 3-channel space, with the watch
KEY (`:50`) itself rebuilt via `.toFixed(3).join()` on every reactive read. Born-RED: the
uncoalesced 3-sink fan-out + the double-derive are live.

### SV-4 — The glass-ui producer-side cluster is genuinely ABSENT on the installed dist (the capability-absent born-RED, A′-1/A′-2/A′-4/A′-5) — LIVE

For a frontier/producer-fix wave the born-RED is *capability-ABSENT* — the fix has nowhere to
land on the consumed surface. Probed on the installed glass-ui 3.13.0:

```
$ for t in IntersectionObserver isIntersecting visibilityState prefers-reduced-motion matchMedia; do \
    echo "$t: $(grep -c "$t" node_modules/@mkbabb/glass-ui/dist/goo-blob.js)"; done
IntersectionObserver: 0
isIntersecting: 0
visibilityState: 0
prefers-reduced-motion: 0
matchMedia: 0
$ grep -c "devicePixelRatio" node_modules/@mkbabb/glass-ui/dist/aurora.js     →  0
$ grep -E "@property --dock-morph-t|inherits:true" node_modules/@mkbabb/glass-ui/dist/styles/dock.css
@property --dock-morph-t
inherits:true
```

**Confirmed:** the consumed goo-blob.js has ZERO visibility/PRM/IO gating tokens (LP3 §1's "grepped
the dist: zero" claim, re-verified on 3.13.0) → the offscreen/zombie blob's RAF cannot be paused by
the demo; the fix is glass-ui's (A′-2/inv-N-9). aurora.js carries NO `devicePixelRatio` cap → the
2880×1800 backing is unbounded (A′-5). The `@property --dock-morph-t {inherits:true}` group is live
in `dist/styles/dock.css` → every morph-tick `calc()` cascade is inherited across the dock control
family, the 255 ms presentation cost (A′-4/LP2-4/5). Born-RED in the capability-absent sense: these
fixes are producer-side, FILED as Register A′, and verified at W18.A — the demo cannot land them.

### SV-5 — The ~10 wholesale-replaced API arrays held deep-reactive (lane C, LP3-6) — LIVE

```
$ sed -n '20p' demo/@/composables/palette/useBrowsePalettes.ts
    const remotePalettes = ref<Palette[]>([]);
$ grep -rn "ref<\(Palette\|User\|FlaggedPalette\|.*Color\|.*Tag\|.*Entry\|.*Version\).*\[\]>(\[\])" \
     demo/@/composables | wc -l    →  (the LP3 §6 census: useBrowsePalettes:20, useAdminUsers:22,
     useAdminFlagged:46, useColorNameQueue:18/20, useAdminTags:30, useTagEdit:26, useAdminAudit:33,
     useVersionHistory:46)
$ grep -rc "shallowRef" demo/@ | awk -F: '{s+=$2} END {print s}'   →  12 (the working tree; L-PERF3 §6 counted 6 at the audit HEAD 199fd15 — the count drifted up, the deep API arrays did NOT)
```

**Confirmed:** `useBrowsePalettes.ts:20` (and the ~9 siblings L-PERF3 §6 enumerated) hold
API-fetched arrays in deep `ref<T[]>([])` — replaced WHOLESALE on each fetch (never mutated
field-by-field), so deep reactivity deep-walks N rows for zero benefit. The demo's `shallowRef`
count has risen 6 → 12 since the audit HEAD, but those new shallow refs are NOT the wholesale-replaced
API arrays (which remain deep `ref<T[]>` — `useBrowsePalettes.ts:20` is live and deep). Born-RED:
the deep API arrays are the storage today; the SV-5 census sites are unconverted.

### SV-6 — The morph-truth artifact does NOT exist + the dock A-1 root is DETERMINISTIC (lane D, U6/U16) — LIVE

```
$ ls e2e/smoke/ | grep -iE "morph|dock-morph|lighthouse"   →  (none — no morph-truth spec, no prod Lighthouse gate)
$ grep -rn "getBoundingClientRect().width\|data-morphing\|1%-settle\|±5%\|>40%" e2e/   →  (the fixture waits on
     [data-morphing] to CLEAR — e2e/smoke/fixtures/dock.ts:48 — but never SAMPLES the width per rAF)
$ node -e "console.log(require('./package.json').scripts['test:e2e'])"   →  playwright test
$ node -e "console.log(require('./package.json').scripts['gh-pages'])"   →  vite build --mode gh-pages
```

The deterministic A-1 root, from U-DOCK §1's `window.__exp2` capture (`U-DOCK.md:55-70`):
`restState w:55px → span armed to:0px (a SHRINK target) → w 55→45.6→25.6→19.1 over dt 115→318
(box SHRINKS during an EXPAND) → w pinned ~19px for dt 318→773 (~455ms DEAD HOLD) → dt 838: w
19→280.1, t=0 (a SNAP, no animation). morphDurationMs 723.8.`

**Confirmed:** there is NO morph-truth e2e and NO production Lighthouse gate today (the L-PERF1
"missing artifact"); the existing dock fixture only waits for `[data-morphing]` to clear, never
asserting the per-rAF width is monotone-in-span. The user-felt defect is the DETERMINISTIC A-1
spring measuring `to≈0px` (the only sizes it animates between are 55 and 19, both wrong; the
correct 280 px arrives by a snap). Born-RED: the acceptance harness is absent, AND its named target
defect (A-1) reproduces deterministically. The morph-truth e2e is born-RED on this tree and stays
RED until glass-ui A-1 — *by design* (D5-5; WAVES-2.md:152 "born-RED until glass-ui A-1").

### SV-7 — The cross-wave gate-opener born-RED roots (W10.C / W10.D), proven on the live built demo

W15's π/perf evidence (the idle-RAF census, the morph-truth e2e, the perf-invariant CI asserts) is
structurally blind until N.W10 lands — the cascade kill means the desktop dual-pane never renders,
so any at-desktop measurement is meaningless, AND the single-mount that W15.A/B depend on (one blob,
one reactive subtree) is W10.D's collapse (`EXECUTION-ORCHESTRATION.md:56-62`; inv-N-11/inv-N-12).
Both W10 roots are born-RED TODAY on the BUILT demo:

**The cascade kill (W10.D, U11's true root + the perf-floor substrate) — LIVE on the BUILT demo artifact:**
```
$ grep -c "@layer" node_modules/@mkbabb/glass-ui/dist/styles/components.css        →  0
$ grep -oE "\.hidden\{[^}]*\}" node_modules/@mkbabb/glass-ui/dist/styles/components.css   →  .hidden{display:none}
$ grep -n "@import \"@mkbabb/glass-ui/styles\"" demo/@/styles/style.css
52:@import "@mkbabb/glass-ui/styles";          ← BARE, no layer(glass-ui)
53:@import "@mkbabb/glass-ui/styles.css";       ← the twin, also bare
$ grep -oE "@layer [a-z, _-]+\{" dist/gh-pages/assets/index-OigTVKLL.css | head
@layer properties{  @layer theme{  @layer base{  @layer components{  @layer utilities{
```
The shipped demo CSS (`dist/gh-pages/assets/index-OigTVKLL.css`) is fully layered (5 `@layer`
blocks), but it imports glass-ui's styles UNLAYERED (`style.css:52-53`, bare `@import`), and
glass-ui's `dist/styles/components.css` emits `.hidden{display:none}` with `@layer` count 0. Per
css-cascade-5 an unlayered rule beats ALL layered rules → the demo's layered responsive `lg:*`
utilities (which drive the desktop dual-pane) are overridden → the desktop never renders
(D8-1 / U-DOCK §2). **Born-RED on the live built demo, not merely the source.** This is the
substrate W15's at-desktop measurements stand on (and the dual-mount W15 must NOT pay for twice —
see §No-workaround).

**The save-data-loss P0 (W10.C) — LIVE in source:**
```
$ grep -n "onCurrentPaletteSaved\|ensureUser\|createPalette" demo/@/composables/palette/usePaletteActions.ts
59:    async function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
60:        await ensureUser();                              ← awaits the backend FIRST
61:        const palette = deps.createPalette(name, colors); ← the local write only runs if ensureUser resolved
```
`onCurrentPaletteSaved` awaits `ensureUser()` (`:60`) BEFORE `createPalette` (`:61`) — a down/failing
backend aborts the LOCAL write and the palette is silently destroyed (D7 §3.4; the local-first
contract inverted). W15 does not own this fix, but it BOUNDS W15's honesty: a perf wave must not
optimize the save path's reactivity (lane C touches the API arrays) while the underlying save can
lose data — W10.C lands first. Born-RED: the await-order is the data-loss path today.

---

## §Goal

**Goal criterion.** The demo idles QUIET and interacts SMOOTH because the perf floor is gone, not
because a spring was retuned. At rest, at most TWO render loops run (the visible aurora + the ONE
visible blob) — no zombie canvas, no offscreen live WebGL context, no eager decorative arm stealing
the boot; lucide is off the two boot-critical modules and the glass-ui aurora/goo-blob chunks are
lazy off first paint. During interaction, the spectrum drag forces ZERO per-frame layout (the rect
is cached on `pointerdown`), one color write drives ONE rAF-batched derivation pass (not the
double-`deriveAurora` + uncoalesced 3-sink fan-out), and a single-channel slider drag re-stripes
only the dragged channel (≈⅔ of the 33 conversions elided). The wholesale-replaced API arrays are
`shallowRef`, so a fetch does not deep-walk N rows. And the wave ships the MISSING measurement
artifacts — a production Lighthouse trace (never the 5 s dev LCP), the morph-truth e2e (born-RED
against the deterministic A-1 dock root), and the four perf invariants wired into CI — so the floor
cannot silently re-rot. `DOCK_SPRING` is untouched (it is correct); U6/U16 close ONLY at the W18
pin verify when glass-ui A-1 lands and the morph-truth harness flips green.

**Completion criterion.** All §Hard-gate clauses verify against artefacts: an isolated-browser idle
RAF census shows ≤ 2 active loops (aurora + visible blob — the zombie gone, gated by W10.D's
single-mount + the W18.A GooBlob visibility gate); a spectrum-drag trace's ForcedReflow insight has
EMPTY attribution to `SpectrumCanvas.vue` (the cached rect); the coalesced single-derivation pass is
present (one `deriveAurora`, one rAF-batched effect) and `computeSliderGradients` is memoized;
the ~10 API arrays are `shallowRef`; a production Lighthouse trace against `npm run gh-pages` output
is RECORDED (LCP/INP/CLS, not the dev artifact); the morph-truth e2e exists and runs (born-RED
against A-1, the four assertions wired); the four perf invariants (single-mount canvas count,
no-offscreen-live-GL, composited CLS ≤ 0.1, no-per-tick-router-churn) are CI-asserted. The
production trace + the morph-truth harness are captured AFTER N.W10.D's cascade kill (the desktop
renders) and the single-mount collapse (one blob).

---

## §Scope — the lanes, each at the gestalt seam

The wave touches exactly the demo aurora-arm / blob-derive / spectrum-reflow / slider-memo /
reactive-array surfaces + the perf-gate harness (e2e + boot-smoke + CI). It consumes W10.D's
single-mount + rendering desktop (it does NOT collapse the mount — that is W10.D). The glass-ui
producer-side fixes (A′-1..A′-5) are FILED, not authored here. No library source. (DEVELOPMENT doc
— SPEC bounds, not an implementation.)

| Lane | Work | Anchors | Seam |
|---|---|---|---|
| **A — Idle floor + GL hygiene + boot weight (LP1, A′-5)** | Aurora **defer-arm** (decorative, `aria-hidden`: arm `useAurora` post-first-paint via `requestIdleCallback`/`onMounted` rather than synchronously in setup); lazy-`import()` the glass-ui `aurora`/`goo-blob` chunks (~170 KB raw off first paint, LP3-8a); lift lucide OUT of the two boot-critical modules (`usePaneRouter`/`viewSchema` icon refs → lazy/string-keyed, resolved at pane mount; LP1-2); the **aurora DPR cap is the FILED A′-5 ask** (a 1×/1.5× backing is visually indistinguishable for a blurred wash, quarters the ≈20 MB GPU surface) — verified at W18.A | `App.vue:247-252` (defer-arm), `usePaneRouter.ts:32` + `viewSchema.ts:32` (lucide), `aurora.js`/`goo-blob.js` lazy-import sites | the boot-weight seam — the decorative surfaces arm after first paint, the heavy chunks load off the critical path |
| **B — Interaction reflows + reactive fan-out (LP2-1, LP3-5)** | **Cache the spectrum rect on `pointerdown`** (+ on resize) — never read `getBoundingClientRect()` inside the throttled update (kills the LP2-1 per-frame reflow); **coalesce** the aurora-seed + blob-palette + slider-gradient sinks into ONE rAF-batched effect + **kill the double `deriveAurora`** (derive once, reuse; LP3-5a); **memoize `computeSliderGradients`** on `(space, quantized-color)` — re-stripe only the dragged channel (≈⅔ of the 33 conversions elided on a single-channel drag; LP3-5b) | `SpectrumCanvas.vue:109,94,13`; `App.vue:269-306,249`; `useSliderGradients.ts:26,45` | the hot-path seam — the rect is read once per gesture, the color write drives one derivation pass, the slider re-stripes one channel |
| **C — Reactivity + bundle hygiene (LP3-6, LP3-8b)** | `shallowRef` the ~10 wholesale-replaced API arrays (LP3-6 — `useBrowsePalettes.ts:20` + the SV-5 census; or `triggerRef` on replace); the entry-chunk eager-pane audit POST-desktop-render (LP3-8b — trim the 155 KB-gz shell once W10.D makes the desktop panes real and the offscreen-but-mounted subtree no longer forces eager inclusion) | `useBrowsePalettes.ts:20` et al. (SV-5 census); the `dist/gh-pages` entry chunk | the reactive-storage seam — wholesale-replaced arrays don't deep-proxy; the entry chunk carries only first-paint code |
| **D — Gates + the dock-morph-truth harness (LP1 prod-trace, D5-5, inv-N-12)** | The **production Lighthouse trace** against `npm run gh-pages` output (the MISSING artifact — LCP/INP/CLS recorded; never mistake the 5 s dev LCP for prod, LP1 #4); the **morph-truth e2e** (D5-5: per-rAF width ∈ `[min·0.95, max·1.05]`, no frame-to-frame jump > 40% of span, 1%-settle ≤ 450 ms — **born-RED until glass-ui A-1**, by design); the **four perf invariants in CI** (inv-N-12: single-mount canvas count == 1 at any viewport, no offscreen live GL, composited-motion CLS ≤ 0.1, no per-tick router churn) | `e2e/smoke/` (the morph-truth spec + the invariant asserts, extending `webgl-goo-blob.spec.ts`/`reactivity-instant.spec.ts`); `scripts/boot-smoke.mjs` (single-mount); CI | the acceptance seam — the floor is measured (prod trace), the morph is asserted (born-RED), the invariants are CI-guarded |

**Note on the producer-side fixes (A′-1..A′-5).** The zombie canvas (A′-1/LP2-2), the GooBlob
visibility/PRM gate (A′-2/LP3-1b/inv-N-9), the card-shrink composited keyframes (A′-3/LP3-3a), the
`--dock-morph-t` cascade narrowing (A′-4/LP2-4/5), and the aurora DPR cap (A′-5/LP1) are ALL
glass-ui-owned (SV-4: capability-absent on 3.13.0) and FILED as Register A′ in the glass-ui letter.
W15 does NOT author them; it FILES them (already done) and VERIFIES them at W18.A when the BA cut
lands. W15's demo-unilateral half (A/B/C) + the harness (D) is the value.js work.

---

## §Hard gate — FALSIFIABLE, born-RED-witnessable on a named defect tree TODAY

The wave closes when ALL clauses verify against artefacts. Each is falsifiable and born-RED today
(per the SV-N probes). For the producer-side clauses (HG-A2 DPR, HG-D2 morph-truth) the born-RED is
the **capability-ABSENT** sense (the fix has nowhere to land on the consumed 3.13.0 surface — SV-4;
the morph-truth assertion has no spring to pass it — SV-6). P6 posture (the measured-evidence /
trace / census discipline — *measure-first*, not prose) is named per clause. **This rides N.W15's
WAVES-2 gate verbatim** ("idle RAF loops ≤ 2 (aurora + visible blob); spectrum-drag reflow
attribution empty; prod Lighthouse recorded; the perf invariants wired; U6/U16 close ONLY at the
pin verify", `WAVES-2.md:161-162`) — the clauses below decompose it.

| # | Clause | Falsifiable test | Born-RED today | P6 posture |
|---|---|---|---|---|
| **HG-A1** | At rest, ≤ 2 active render loops (aurora + the ONE visible blob); the aurora arms AFTER first paint, not in setup; lucide is OFF the two boot-critical modules | an isolated-browser idle RAF census (single tab) shows ≤ 2 loops; `App.vue` aurora arm is inside `onMounted`/`requestIdleCallback`; `grep "@lucide/vue" usePaneRouter.ts viewSchema.ts` = 0 | YES — SV-1: synchronous arm + eager lucide at `:247`/`:32`/`:32`; L-PERF2 §5: ~4 idle loops | **isolated idle RAF census** (count, environment-independent) + **grep-absence** |
| **HG-A2** | The aurora backing-store DPR is capped (a 1×/1.5× backing, ≈¼ the ≈20 MB GPU surface) — the FILED A′-5 ask | the W18.A π verify: `atmosphere-canvas` backing ≤ 1.5× viewport (vs the 2880×1800 = DPR-2 today) | YES — SV-4: `aurora.js` has 0 `devicePixelRatio` (capability-absent); SV-1: 2880×1800 backing | **producer-fix π verify at W18.A** (capability-absent born-RED) |
| **HG-A3** | The glass-ui `aurora`/`goo-blob` chunks are lazy `import()` — off the first-paint critical path (~170 KB raw deferred) | a production bundle audit: `aurora`/`goo-blob` are separate async chunks, NOT in the entry chunk | YES — SV-1: eager; L-PERF3 §8: glass-ui 400 KB eager chunk pulls them | **production bundle audit** (chunk graph) |
| **HG-B1** | The spectrum-drag ForcedReflow attribution to `SpectrumCanvas.vue` is EMPTY — the rect is cached on `pointerdown`, not read in the throttled update | a spectrum-drag perf trace: the ForcedReflow insight has 0 frames attributed to `SpectrumCanvas.vue:109`; `getBoundingClientRect()` is called once per gesture (on `pointerdown`), not per frame | YES — SV-2: `getBoundingClientRect()` at `:109` inside `updateSpectrumColor`; LP2-1: 35 calls == 35 frames | **trace ForcedReflow attribution** (file:line, environment-independent) |
| **HG-B2** | One color write drives ONE derivation pass — `deriveAurora` runs ONCE (no probe-then-resolveAtoms double), the three sinks are coalesced into one rAF-batched effect | a per-tick instrumentation count: `deriveAurora` invocations == 1 per color change (vs 2 today); the three sinks fire in one rAF | YES — SV-3: `deriveAurora` at `App.vue:273` (probe) + inside `resolveAtoms` (= 2); 3 uncoalesced sinks | **per-tick invocation count** (instrumented, measured) |
| **HG-B3** | `computeSliderGradients` is memoized on `(space, quantized-color)` — a single-channel drag re-stripes only the dragged channel (≈⅔ of the 33 conversions elided) | an instrumented conversion-count on a single-channel drag: `toCSSColorString` calls ≈ 11 (one channel) vs 33 (all three) today | YES — SV-3: `useSliderGradients.ts:26` does `channels × 11` clones+conversions every change | **instrumented conversion count** (measured win) |
| **HG-C1** | The ~10 wholesale-replaced API arrays are `shallowRef<T[]>` (or `triggerRef`-on-replace) — no deep-proxy walk on fetch | `grep -rn "ref<.*\[\]>(\[\])" demo/@/composables` over the SV-5 census sites = 0 (every census array converted to `shallowRef`/`triggerRef`) | YES — SV-5: `useBrowsePalettes.ts:20` + ~9 deep arrays still deep `ref<T[]>` | **grep-census** (the array storage axis inverts on the named sites) |
| **HG-C2** | The entry chunk carries only first-paint code — the eager-pane inclusion audited POST-W10.D (the offscreen-mounted subtree no longer forces eager inclusion) | a production entry-chunk audit post-W10.D: route-lazy panes are NOT in `index-*.js` | YES — L-PERF3 §8b: the 155 KB-gz shell likely eagerly pulls route-lazy panes pre-W10.D | **production bundle audit** (post-gate-opener) |
| **HG-D1** | A production Lighthouse trace against `npm run gh-pages` output is RECORDED — LCP/INP/CLS from the REAL bundle, NOT the 5 s dev LCP | the recorded Lighthouse artifact exists (the L-PERF1 "missing artifact"); LCP measured against `dist/gh-pages`, not the dev server | YES — SV-6: no Lighthouse gate; L-PERF1 #4: only a 5 s DEV LCP exists (dev-server artifact) | **recorded production Lighthouse trace** (the missing artifact) |
| **HG-D2** | The morph-truth e2e exists and runs: per-rAF width ∈ `[min·0.95, max·1.05]`, no frame-to-frame jump > 40% of span, 1%-settle ≤ 450 ms — **born-RED until glass-ui A-1; flips green at W18.A** | the e2e spec exists, samples `getBoundingClientRect().width` per rAF, asserts the three D5-5 conditions; it FAILS today (A-1's 55→19→snap-280 violates monotone-in-span) and PASSES post-A-1 | YES — SV-6: no morph-truth spec; U-DOCK §1: A-1's deterministic 55→19px wrong-direction + snap | **born-RED e2e** (the harness exists, fails on A-1, flips at the pin) |
| **HG-D3** | The four perf invariants are CI-asserted (inv-N-12): single-mount canvas count == 1 at any viewport; no offscreen live GL context; composited-motion CLS ≤ 0.1; no per-tick router churn | the boot-smoke single-mount assert + the CLS/router/offscreen-GL asserts run in CI and pass | YES — SV-4/SV-6/SV-7: no offscreen-GL gate (A′-2 absent), no single-mount assert (W10.D-pre dual-mount), CLS 1.03 on the trace (LP3 §0) | **CI invariant asserts** (the perf floor cannot re-rot) |
| **HG-gate-opener** | All HG-A1/B1/B2/C2/D1/D2/D3 measurements are captured AFTER N.W10.D's cascade kill + single-mount collapse — until the desktop renders + the mount is single, the idle-RAF census, the prod trace, and the morph-truth e2e are structurally blind | the measurements captured against a rendering desktop (W10.D `display ≠ none @1440` assert green) + a single blob (canvas count == 1) | YES — SV-7: the built demo emits unlayered `.hidden{display:none}` → desktop dead; the dual-mount doubles the blob | **cross-wave precondition** — W10.D is the substrate gate |

**The gate-opener precondition (cross-wave, BINDING).** Per `EXECUTION-ORCHESTRATION.md:56-62`, W10
is the gate-opener: until the cascade kill (SV-7) closes, the desktop never renders, so EVERY W15
at-desktop measurement (the idle census, the prod Lighthouse trace, the morph-truth e2e, the CLS
invariant) is structurally blind. **Worse for W15 specifically:** the single-mount collapse is
itself a W10.D deliverable, and W15.A/B's "one blob, one reactive subtree" win is GATED on it — if
W15.A's defer-arm + W15.B's coalesce land while the dual-mount survives, the blob cost doubles on
screen the instant the desktop renders (L-PERF3 §2 DAG note: "W6-PERF-1a must precede the W2.B
desktop-render fix becoming user-visible"). So W15's SOURCE-shape work (the defer-arm, the rect
cache, the coalesce, the memoize, the shallowRef — all demo-unilateral edits) is provable WITHOUT
the desktop rendering; only the at-desktop MEASUREMENTS (the census, the trace, the e2e) wait on
W10.D. The source edits do not wait; the measured gates do.

---

## §No-workaround — the named forbidden shortcuts for THIS wave

- **NO retuning `DOCK_SPRING`.** It is CORRECT (`response 0.32, ζ 0.7`; L-PERF2 §2/§Headline: "the
  spring is fine, the frame production is starved"; `WAVES-2.md:144-145` "`DOCK_SPRING` is fenced —
  correct, do NOT retune"). The user-felt lag is the idle floor + the deterministic A-1 FLIP-measure
  bug, NOT the spring constants. Re-tuning the spring to "feel snappier" papers over the wrong-
  direction 55→19 travel and the dead-hold — the anti-fix the W5.D "dock adoptions DONE" claim
  already shipped once (D5 §"what let a broken morph ship as green"). FENCED.
- **NO landing W15.A/B's blob/reactivity win on TOP of the dual-mount.** W15 must NOT defer-arm the
  aurora and coalesce the color sinks while the W10.D single-mount is still pending — the win
  doubles (two blobs, two reactive subtrees) the instant the desktop renders (L-PERF3 §2 DAG).
  W10.D's single-`v-if`-mount lands FIRST; W15 measures against one blob. Optimizing a doubled
  surface is the forbidden ordering.
- **NO authoring the glass-ui producer fixes in the demo.** The zombie canvas (A′-1), the GooBlob
  visibility/PRM gate (A′-2/inv-N-9), the card-shrink composited keyframes (A′-3), the
  `--dock-morph-t` cascade narrowing (A′-4), the aurora DPR cap (A′-5) are glass-ui-owned
  (SV-4: capability-absent on 3.13.0). Reaching into the demo to monkey-patch GooBlob's RAF, or to
  CSS-override `@property --dock-morph-t`, or to wrap the offscreen canvas in a demo-side
  IntersectionObserver is the forbidden cross-repo workaround (`N.md §8` — asks, not value.js
  writes; inv-16). They are FILED as Register A′ and VERIFIED at W18.A.
- **NO `file:` link / vendored copy across the spine.** The GooBlob/aurora/dock fixes are consumed
  as PUBLISHED glass-ui (3.13.0 now, the BA cut at W18.A) — NEVER a `file:` link to glass-ui's WIP
  tree, NEVER a vendored copy of the goo-blob/aurora source in the demo (contract-v2;
  `cross-repo-dev-resolution.md §2.4`). The demo resolves glass-ui's `dist/` through the `exports`
  map; the watch-build keeps it fresh.
- **NO trusting the dev-server LCP as the production number.** The 5006 ms LCP render delay is a
  DEV-ONLY artifact (247 unbundled HMR module fetches; L-PERF1 #4) — production rolldown collapses
  it. The forbidden shortcut is "fixing" a 5 s LCP regression that is a dev-server fiction. The
  production trace MUST come from `npm run gh-pages` output (HG-D1).
- **NO closing U6/U16 in W15.** The morph-truth e2e is born-RED against A-1 and is INTENDED to stay
  RED in W15 (`WAVES-2.md:152` "born-RED until glass-ui A-1, by design"; D5-5). U6/U16 close ONLY at
  the W18.A pin verify when the A-1 FLIP fix lands and the harness flips green. Marking U6/U16 closed
  in W15 (or weakening the morph-truth thresholds to make it pass on the broken spring) is the
  forbidden premature-close.
- **NO a `getAnimations()`-presence or grep-only runtime gate.** Per `WAVE_SPEC.md` Prohibitions
  ("no grep-only runtime gates") + the constellation-retired `proof:*` idiom (`WAVES-2.md:298-302`),
  the perf gates are MEASURED (idle RAF census counts, trace ForcedReflow attributions, instrumented
  invocation/conversion counts, the recorded Lighthouse artifact, the per-rAF morph-width sampling) —
  NOT "an IntersectionObserver string exists in the bundle". The HG clauses are runtime observations.
- **NO `v-memo` minted here.** The `v-memo` palette-list contract (LP3-7) lands WITH the
  PaletteCard componentization at **N.W14.A** (`WAVES-2.md:130`; N.W14 §Folds LP3-7), NOT in W15 —
  it rides the card's componentization, not the perf floor. W15 owns the API-array `shallowRef`
  half (LP3-6); W14 owns the `v-memo` half. Minting `v-memo` in W15 duplicates the W14 contract.

---

## §Folds — the rows this wave discharges (each citing its audit lane + finding-id)

| Row | Finding / lane | Lane here | Discharge |
|---|---|---|---|
| **U6** — "dock animations take FAR too long to squish/morph; slow, laggy, jittery" | `LEDGER.md:30`; L-PERF2 §2/§Headline; U-DOCK §1 | **D** harness (born-RED) → **W18.A** verify | the morph-truth e2e lands born-RED against A-1; U6 CLOSES at W18.A when the A-1 FLIP fix lands and the harness flips green |
| **U16** — "dock slow, NOT SIZED PROPERLY between transitions" | `LEDGER.md:31`; U-DOCK §1 (the 55/19px wrong sizes); D5-5 | **D** harness (born-RED) → **W18.A** verify | the morph-truth e2e's monotone-in-span assertion is exactly the "sized properly" condition; closes with U6 at W18.A |
| **U12** — "pane/card transitions not smooth" (the idle-floor face; L-PERF2 §4 proves the SAME root) | `LEDGER.md:32`; L-PERF2 §4 | **A** (idle floor) + **D** (CLS invariant) | the idle floor lift (defer-arm, single visible loop) recovers the presentation phase the §4 pane-switch was starved on (the layout-prop pane-wrapper transition itself is W17.B/LP3-3c — see §Hand-off) |
| **U23** — "dropdown open animation jerks" (the 18/125 ms ping-pong; L-PERF2 §3 proves the SAME root) | `LEDGER.md` U23; L-PERF2 §3 | **A** (idle floor) | the dropdown does not CAUSE the jerk — it REVEALS the ~125 ms background stall; the idle-floor lift removes the stall the dropdown animates against |
| **LP2-1** — per-frame forced reflow: `getBoundingClientRect()` inside the rAF-throttled `updateSpectrumColor` after a same-frame color invalidation | L-PERF2 §1 / Ownership LP2-1; `SpectrumCanvas.vue:109`; SV-2 | **B** | cache the rect on `pointerdown` + on resize; never read it inside the throttled update — kills the §1 reflow (HG-B1) |
| **LP3-5a** — the uncoalesced 3-sink fan-out + the double `deriveAurora` | L-PERF3 §5 (W6-PERF-5a); `App.vue:269-306,249`; SV-3 | **B** | coalesce aurora-seed + blob-palette + slider-gradient into ONE rAF-batched effect; derive `deriveAurora` once, reuse (HG-B2) |
| **LP3-5b** — `computeSliderGradients` re-stripes all channels (33 clones + 33 conversions) every change | L-PERF3 §5 (W6-PERF-5b); `useSliderGradients.ts:26,45`; SV-3 | **B** | memoize on `(space, quantized-color)`; re-stripe only the dragged channel (≈⅔ elided; HG-B3) |
| **LP3-6** — ~10 wholesale-replaced API arrays held deep-reactive | L-PERF3 §6 (W6-PERF-6); `useBrowsePalettes.ts:20` et al.; SV-5 | **C** | `shallowRef<T[]>` (or `triggerRef`-on-replace) the SV-5 census (HG-C1) |
| **LP3-8a** — the glass-ui aurora/goo-blob chunks eager on the first-paint critical path (~170 KB raw) | L-PERF3 §8 (W6-PERF-8a); SV-1 | **A** | lazy-`import()` the aurora/goo-blob chunks off first paint (HG-A3) |
| **LP3-8b** — the entry chunk eagerly pulls route-lazy panes (the 155 KB-gz shell) | L-PERF3 §8 (W6-PERF-8b) | **C** | audit the entry-chunk eager-pane inclusion POST-W10.D-desktop-render (HG-C2) |
| **LP1-2** — `@lucide/vue` eager on the boot path via the two boot-critical pane-config modules | L-PERF1 #2; `usePaneRouter.ts:32` + `viewSchema.ts:32`; SV-1 | **A** | lift lucide out of the boot-critical modules (lazy/string-keyed icon refs at pane mount; HG-A1) |
| **LP1 #3 / aurora boot** — the 2880×1800 (≈20 MB GPU) aurora surface armed synchronously at boot | L-PERF1 #3; `App.vue:247`; SV-1 | **A** (defer-arm) + **A′-5** (DPR cap → W18.A) | defer-arm post-first-paint (demo, HG-A1); the DPR cap is the FILED A′-5 ask verified at W18.A (HG-A2) |
| **LP1 #4** — the missing production Lighthouse gate (only a 5 s DEV LCP exists) | L-PERF1 #4 / "honest gaps"; SV-6 | **D** | record a production Lighthouse trace against `npm run gh-pages` output (HG-D1) |
| **D5-5 (WO-D5-5)** — the morph-truth acceptance assert (monotone span / no-snap / ≤450ms settle) | `D5.md:121-126,265`; U-DOCK §1; SV-6 | **D** (born-RED) → **W18.A** flip | the morph-truth e2e lands born-RED against A-1; flips green at the W18.A pin (HG-D2) |
| **inv-N-12 (new) — the perf floor** | `WAVES-2.md:329-331` | **D** | the four perf invariants wired into CI (single-mount / no offscreen live GL / composited CLS ≤ 0.1 / no per-tick router churn; HG-D3) |

**NOT folded here (explicitly routed elsewhere — zero drops, P-Inv 28):**
- **The GooBlob visibility/PRM gate (LP3-1b / A′-2 / inv-N-9)**, **the zombie second canvas (LP2-2 /
  A′-1)**, **the card-shrink composited keyframes (LP3-3a / A′-3)**, **the `--dock-morph-t` cascade
  narrowing (LP2-4/5 / A′-4)**, **the aurora DPR cap (LP1 / A′-5)**, **the dock FLIP `to:0px` fix
  (A-1)** → **glass-ui Register A′/A-1** (producer-owned; FILED; SV-4 capability-absent), VERIFIED at
  **N.W18.A** (`WAVES-2.md:154-160,210-214,223`). W15 cannot author them (cross-repo; inv-16).
- **The single-mount collapse (the `v-if` breakpoint gate, X6/LP3-1a)** → **N.W10.D** (the
  gate-opener; `WAVES-2.md:53`) — W15 CONSUMES the single mount, does not collapse it. The dual-mount
  kill is W10.D's; W15 measures against the result.
- **The hash-color debounce + no-op `scrollBehavior` (LP3-4 / the 103 ms `computeScrollPosition`
  reflow)** → **N.W16.F** (the router 4→5 modern-web carry; `WAVES-2.md:178,386`) — it dovetails the
  router-5 migration, not the W15 idle floor. (W15's HG-D3 perf-invariant "no per-tick router churn"
  ASSERTS the result; W16.F lands the fix.)
- **The `.pane-wrapper` layout-prop transition → transform (LP3-3c)** → **N.W17.B**
  (`WAVES-2.md:191`; `App.vue:315-318` carries `transition: height, margin, padding` — three
  non-compositable props, born-RED) — it is a motion-unification edit in the shell wave, not a W15
  hot-path edit. (W15's HG-D3 "composited CLS ≤ 0.1" ASSERTS the result.)
- **The `v-memo` palette-list contract (LP3-7)** → **N.W14.A** (it rides the PaletteCard
  componentization; `WAVES-2.md:130`; N.W14 §Folds LP3-7). W15 owns the API-array `shallowRef` half
  (LP3-6), W14 owns `v-memo`.
- **The save-data-loss P0 (W10.C)** → **N.W10.C** (the gate-opener; SV-7) — W15's lane C touches the
  API arrays' reactivity, but the underlying save honesty is W10.C's. W15 must not optimize a
  data-losing path (§No-workaround).

---

## §Hand-off — the BINDING cross-wave + cross-repo boundaries

### Cross-wave (within N)

| Boundary | Direction | Binding contract |
|---|---|---|
| **N.W10.D → N.W15 (A/B/D)** | W10 lands FIRST | The cascade kill (SV-7) MUST close before W15's at-desktop measurements (the idle census, the prod Lighthouse trace, the morph-truth e2e, the CLS invariant) are meaningful — until the desktop renders, they are structurally blind (inv-N-11). **AND** W10.D's single-`v-if`-mount collapse is the substrate for W15.A/B's "one blob, one reactive subtree" win — W15 must NOT land its defer-arm/coalesce on the dual-mount (the blob doubles, L-PERF3 §2 DAG). W15's SOURCE edits (defer-arm, rect cache, coalesce, memoize, shallowRef) are demo-independent and provable by tree probe; only the MEASURED gates wait on W10.D. |
| **N.W10.C → N.W15 (C)** | W10 lands FIRST | W15.C `shallowRef`s the wholesale-replaced API arrays (`useBrowsePalettes.ts:20` et al.). The save-data-loss P0 (SV-7, `usePaletteActions.ts:60` await-order) is W10.C's — W15 must not optimize the reactivity of a save path that can silently lose data (the local-first contract lands first). |
| **N.W16.F ∥ N.W15** | siblings, R3 | The hash-color debounce + no-op `scrollBehavior` (LP3-4, the 103 ms `computeScrollPosition` reflow) is W16.F's router-5 carry, NOT W15's idle floor. W15.D's "no per-tick router churn" perf invariant (HG-D3) ASSERTS the result; W16.F lands the fix. No file overlap (W15: App.vue/SpectrumCanvas/useSliderGradients/useBrowsePalettes; W16.F: usePaneRouter/viewSchema/useColorUrl router config). |
| **N.W17.B ∥ N.W15** | siblings, R3 | The `.pane-wrapper` layout-prop transition → transform (LP3-3c, `App.vue:315-318`) is W17.B's motion-unification edit. W15.D's "composited CLS ≤ 0.1" perf invariant (HG-D3) ASSERTS the result; W17.B lands the transform conversion. W15 does NOT edit `App.vue:315-318` (W17.B's bound) — it edits `App.vue:247-306` (the aurora arm + the watchers). |
| **N.W14.A ∥ N.W15** | siblings, R3 | The `v-memo` palette-list contract (LP3-7) rides W14.A's PaletteCard componentization; W15.C owns the API-array `shallowRef` half (LP3-6). No overlap: W15 touches the COMPOSABLE arrays, W14 touches the CARD template's `v-memo`. |

### Cross-repo (the acyclic spine — glass-ui one tranche ahead, PUBLISHED-consume)

| Boundary | Direction | Binding contract |
|---|---|---|
| **glass-ui Register A′ (BA cut 4.0.0) → N.W15 (D harness) → N.W18.A (verify)** | glass-ui publishes BA; value.js verifies one beat behind | The five producer fixes — `A′-1` zombie canvas (LP2-2), `A′-2` GooBlob visibility/PRM gate (LP3-1b/inv-N-9), `A′-3` card-shrink composited keyframes (LP3-3a), `A′-4` `--dock-morph-t` cascade narrowing (LP2-4/5), `A′-5` aurora DPR cap (LP1) — are FILED in `../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md` Register A′ (SV-4: capability-absent on 3.13.0). value.js does NOT author them; it VERIFIES them π'd one-by-one at W18.A (`WAVES-2.md:228-231`: "satellites visibly shaded… dock morph monotone"). NEVER a `file:` link or vendored copy (contract-v2; `cross-repo-dev-resolution.md §2.4`). |
| **glass-ui A-1 (the dock FLIP `to:0px` fix) → N.W15.D morph-truth e2e → N.W18.A (flip green)** | glass-ui publishes BA; value.js's harness flips | The morph-truth e2e (HG-D2) is born-RED against the DETERMINISTIC A-1 root (U-DOCK §1: nested DockLayerGroup → outer FLIP measures `to≈0px` → 55→19px wrong-direction + ~455ms dead-hold + 1-frame snap). A-1 is the FILED X-GU **A-1** ask (`WAVES-2.md:154-156`). The harness STAYS RED in W15 (by design); it flips green ONLY when A-1 lands at the W18.A pin — that flip is the close of U6/U16 (`WAVES-2.md:223` "dock FLIP fix (U6/U16 CLOSE — the W15.D harness flips green)"). |
| **glass-ui 3.13.0 → N.W15 (A lazy-import)** | glass-ui publishes; value.js demo consumes | The `aurora`/`goo-blob` chunks lazy-`import()`ed in W15.A are consumed from the PUBLISHED glass-ui 3.13.0 dist (`@mkbabb/glass-ui/aurora`, `@mkbabb/glass-ui/goo-blob` subpaths). The lazy split is a DEMO bundling choice over the published surface — NOT a glass-ui edit (the chunks already exist in the dist; LP3 §8). |
| **The ownership boundary** | demo / producer | The demo owns the defer-arm, the rect cache, the coalesce, the memoize, the shallowRef, the lazy-import, the harness (e2e + boot-smoke + CI). glass-ui owns the GooBlob render loop, the zombie canvas, the dock FLIP measure, the `--dock-morph-t` cascade, the aurora DPR. value.js does NOT author producer fixes (`N.md §8` — asks, not value.js writes; inv-16). |

### The born-RED-until-pin ledger (what flips at W18.A, named)

| W15 born-RED artifact | Flips at | On the producer fix landing |
|---|---|---|
| The morph-truth e2e (HG-D2) | W18.A | glass-ui A-1 (the FLIP `to:0px` fix) — the 55→19→snap-280 becomes a monotone 55→280 span |
| HG-A2 (aurora DPR ≤ 1.5×) | W18.A | glass-ui A′-5 (the aurora DPR cap) |
| HG-A1's "≤ 2 loops" zombie-free half | W18.A | glass-ui A′-1/A′-2 (the zombie canvas + the GooBlob visibility/PRM gate — inv-N-9 closes) |
| HG-D3's "composited CLS ≤ 0.1" | W18.A (the keyframes half) | glass-ui A′-3 (card-shrink composited keyframes); the demo's `.pane-wrapper` half is W17.B |

The W18 hard gate verifies each producer fix π'd one-by-one (`WAVES-2.md:228-231` "dock morph
monotone… zero interim shims surviving").

---

## §Design-decisions — trade-offs RESOLVED

1. **`DOCK_SPRING` is FENCED — the floor is the bug, not the spring.** RESOLVED: L-PERF2 measured
   the morph at ~13 fps over ~900 ms wall-clock and proved the spring's analytic settle (response
   0.32 s, ζ 0.7) is correct — only 11–12 frames PAINT in the window because the idle floor starves
   them (`L-PERF2.md:117-119`). The fix surface is the idle floor (lane A) + the producer-side A-1
   FLIP measure (W18.A), NOT the spring constants. Retuning the spring to "feel snappier" is the
   anti-fix that shipped a broken morph as green once (D5). FENCED is the only correct posture.

2. **U6/U12/U23 are ONE work-order, not three.** RESOLVED: L-PERF2 §3/§4 proved the dropdown jerk
   (18/125 ms ping-pong), the pane-switch jank, and the dock lag are the SAME recurring ~125 ms
   background stall (the idle floor), reproduced IDENTICALLY at idle, on dropdown-open, and on
   pane-switch (`L-PERF2.md:236-242`). So W15 folds them into a single perf-floor lift (lane A),
   not three cosmetic spring tweaks. The dropdown/pane machinery is cheap; the floor is the cost.

3. **The aurora defer-arm is demo-unilateral; the DPR cap is the producer's.** RESOLVED: the demo
   CAN defer WHEN it arms `useAurora` (move the `App.vue:247` call out of synchronous setup into
   `onMounted`/`requestIdleCallback` — lane A, HG-A1). The demo CANNOT cap the backing-store DPR
   (glass-ui's `useAurora` sizes the canvas; SV-4: `aurora.js` has no `devicePixelRatio` lever) —
   that is the FILED A′-5 ask verified at W18.A (HG-A2). The split is by ownership: timing is the
   demo's, sizing is the producer's.

4. **The spectrum rect is cached on `pointerdown`, not memoized in the read.** RESOLVED: the rect is
   INVARIANT during a drag (the spectrum box does not resize; L-PERF2 §1 root cause). The fix is to
   read it ONCE on `pointerdown` (and on resize) and reuse the cached value in the throttled update
   — not to memoize the `getBoundingClientRect()` call (a memoize still re-reads after invalidation
   the first time per frame). Caching on the gesture boundary kills the per-frame reflow entirely
   (`L-PERF2.md:93-94`; HG-B1).

5. **Coalesce the three color sinks; derive `deriveAurora` ONCE.** RESOLVED: one `cssColorOpaque`
   write drives three synchronous sinks (aurora seed, blob palette, slider gradients) PLUS a double
   `deriveAurora` (the throw-probe at `App.vue:273` then again inside `resolveAtoms`; SV-3). The fix
   drives all three from ONE rAF-batched effect (the SpectrumCanvas already rAF-throttles the
   SOURCE; the three SINKS run synchronously per write — L-PERF3 §5) and derives the aurora palette
   once, reusing it. Net: one derivation pass per drag tick instead of three-to-four (HG-B2).

6. **Memoize the slider gradient on the dragged channel only.** RESOLVED: `computeSliderGradients`
   re-stripes all `channels × 11` stops (33 clones + 33 conversions) on every change, but on a
   single-channel drag only the dragged channel's gradient changes — the off-axis channels are
   stable per space (L-PERF3 §5b). Memoize on `(space, quantized-color)` and re-stripe only the
   dragged channel: ≈⅔ of the 33 conversions elided (HG-B3). The quantized key avoids re-striping on
   sub-perceptual color deltas.

7. **`shallowRef` the wholesale-replaced arrays; `v-memo` is W14's.** RESOLVED: the ~10 API arrays
   are REPLACED wholesale on fetch (never mutated field-by-field; SV-5), so deep reactivity
   deep-walks N rows for zero benefit — `shallowRef<T[]>` (or `triggerRef`-on-replace) is the
   mechanical KISS fix (L-PERF3 §6, lane C, HG-C1). The COMPLEMENTARY `v-memo` list contract (LP3-7)
   rides the W14.A PaletteCard componentization (it is a template contract, not a storage axis) —
   W15 does not duplicate it. Two halves, two waves, one perf intent.

8. **The production Lighthouse trace is the missing artifact — never the dev LCP.** RESOLVED: the
   5006 ms LCP render delay is a DEV-server artifact (247 unbundled HMR fetches; L-PERF1 #4) —
   production rolldown collapses it. W15.D records the REAL LCP/INP/CLS against `npm run gh-pages`
   output (HG-D1). The L-PERF1 lane explicitly BOOKED this as the one biggest risk: "the next
   tranche does NOT chase a 5 s LCP regression that is a dev-server artifact." The prod trace is the
   honest gate.

9. **The morph-truth e2e is born-RED BY DESIGN; U6/U16 close at the pin.** RESOLVED: the harness
   (per-rAF width ∈ span ±5%, no >40% jump, 1%-settle ≤ 450 ms — D5-5) lands in W15 and FAILS today
   because the deterministic A-1 root makes the dock animate between 55 and 19 px (both wrong) and
   snap to 280 px (SV-6; U-DOCK §1). Landing the harness RED is the CORRECT move — it is the
   acceptance spec the "dock adoptions DONE" claim never had (D5 §118-119). It flips green ONLY when
   glass-ui A-1 lands at W18.A; that flip IS the close of U6/U16 (`WAVES-2.md:223`). The forbidden
   alternative is weakening the thresholds to pass on the broken spring.

10. **The perf wave runs BEFORE its measurements are visible.** RESOLVED (the W10.D precondition):
    W15's SOURCE edits (the defer-arm, the rect cache, the coalesce, the memoize, the shallowRef,
    the lazy-import) are demo-unilateral and provable by tree probe TODAY. The MEASURED gates (the
    idle RAF census, the production Lighthouse trace, the morph-truth e2e, the CLS invariant) sit
    behind W10.D's cascade kill + single-mount — until the desktop renders and the blob is single,
    the measurements are structurally blind AND the W15.A/B win would double on the dual-mount
    (L-PERF3 §2 DAG; SV-7). So W15 runs in R3 beside everything, its source edits landing
    immediately, its measured gates captured once W10.D's gate-opener closes. The perf SOURCE work
    does not wait; the perf MEASUREMENT does.

---

## §Format / lint / verification cadence (DOCS-ONLY wave)

This is a DEVELOPMENT doc — no source/test/CI edits. The available document checks:
- `git diff --check` (whitespace/conflict markers) on this file at close;
- the markdown shape conforms to `WAVE_SPEC.md §Required Sections` (Header / State-equivalent
  front-matter / Goal / Scope / Hard gate / No-workaround / Folds / Hand-off / Design-decisions) +
  the N.W10/N.W11/N.W14 sibling-spec precedent;
- every file:line / lane § / command+output citation re-verified against the working tree at
  `tranche-f-handoff` (inv ε) — the §State-verified probes are the verification artefacts, run
  2026-06-15.

No formatter/linter runs (no code changes). The replacement evidence is the §State-verified
command+output block (born-RED proofs) + the §Provenance file:line table.
