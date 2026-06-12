# Lane U-DOCK — grounding U6 / U16 / U12 / U11 (the dock + transitions)

**Fleet:** N second deep-audit fleet (lanes2). **Mode:** tranche-development, implements
nothing. **Live target:** http://localhost:9000 (dev server, cold cache), desktop 1440×900,
`prefers-reduced-motion: false`. **Branch:** `tranche-f-handoff`, HEAD `199fd15` + 0.12.0.
**Evidence:** live chrome-devtools MCP probes + perf trace + read-only source (file:line).
Screenshots: `docs/tranches/N/audit/lanes2/shots/U-DOCK-*.png`.

USER FINDINGS OUTRANK PRIOR AUDITS. PROGRESS.md marks N.W5.D "dock adoptions DONE" and
N.W2.B "desktop `@source` live" — **both are refuted on the live wire below.**

---

## §0 — Verdict (one line each)

| ID | Verdict | Severity |
|---|---|---|
| **U6** (dock too slow/laggy/jittery to squish/morph) | **REPRODUCED, root-caused.** Not CPU/long-tasks — the expand FLIP **mis-measures its target as `to:0px`**, springs the box the WRONG direction (55→19px over ~720ms), dead-holds at 19px, then **snaps 19→280px in one un-animated frame**. The morph is broken, not merely slow. | **P0 (demo-visible, every cycle)** |
| **U16** (dock "not sized properly between transitions") | **REPRODUCED — same root as U6.** The intermediate size is 19px (a wrong shrink target), and the final size arrives by a one-frame snap, never by the spring. The "between" state is the 19px stuck box. | **P0 (same defect as U6)** |
| **U12** (pane + card transitions not smooth; nomenclature mess) | **CONFIRMED.** ≥**13** distinct, ad-hoc-named Vue `<Transition>` mechanisms + a CSS-only `grid 0fr→1fr` idiom + the glass-ui JS-spring dock morph = **three unrelated transition substrates, zero shared vocabulary**; glass-ui's `useViewTransition`/`useSpringMount`/`useStagger` are consumed by **none** of the pane/card transitions. | **P1 (design-system cohesion)** |
| **U11** (desktop missing the right-most pane) | **REPRODUCED — and it is NOT the W1D Residual #1 hydration story.** The picker view's right "About" pane is `display:none` on desktop because **Tailwind never emits `lg:flex` / `lg:block` / `lg:hidden` / `lg:flex-1`** — a responsive-utility generation hole. The `@source`/`@theme` are present but these specific display-variant utilities are absent from the live CSS. | **P0 (every desktop load, all dual-pane views)** |

---

## §1 — U6 / U16: the dock morph is direction-wrong + snaps (the core defect)

### The mechanism (read-only source)

The dock morph is **NOT a CSS transition** — it is a JS spring. glass-ui's
`useDockMorphOrchestrator` (`../glass-ui/src/components/custom/dock/composables/dockMorphContext.ts`)
owns ONE `SpringProgress` (keyframes.js) that writes a single inheriting CSS scalar
`--dock-morph-t` to the `.glass-dock` root once per frame; the CSS `calc()` in
`../glass-ui/src/styles/dock/morph.css:120-143` interpolates `padding-inline` (and bg/border)
between collapsed↔expanded endpoints off that scalar. Spring tuning:

- `DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 }` — `../glass-ui/src/components/custom/dock/constants.ts:32`
- identical to the `dock` preset — `../glass-ui/src/composables/motion/springPresets.ts:74-78`
  ("DOCK register — dock expand/collapse morph … overshoot ~+4.6%").

The width morph is a **FLIP**: `onSwap` (`dockMorphContext.ts:271-361`) captures the live
`from` size, pins `from=to=from` (box holds), then ONE rAF later forces
`.dock-layers { inline-size: max-content }`, reads the shrink-wrapped `to`, clears it, and
arms the spring with the `from→to` span (`armTarget`, `dockMorphContext.ts:251-268`).

The spring register/tuning is **fine** (0.32s response ≈ a brisk iOS control morph). **The
bug is the measured `to` value.**

### The live trace (deterministic, from a pristine collapsed-rest state)

Probe: drove the dock's exposed `expand()` (GlassDock `defineExpose`, GlassDock.vue:298) from a
verified rested-collapsed state (`{w:55, collapsed:true, morphing:false, t:0, from:'', to:''}`),
sampling `getBoundingClientRect().width`, `--dock-morph-t`, and the
`.dock-layers` `--dock-morph-from/to` per rAF.

`window.__exp2` result (expand from rest):

```
restState: {w:55, collapsed:true, morphing:false, t:0}     ← pristine
span armed at dt=115:  from:40px → to:0px                  ← TARGET IS 0px (a SHRINK)
dt 115→318:  w 55 → 45.6 → 25.6 → 19.1   (t 0→0.26→0.82→1.02)  ← box SHRINKS during EXPAND
dt 318→773:  w pinned at ~19px            (t pinned ~1.0)        ← ~455ms DEAD HOLD at 19px
dt 838:      w 19 → 280.1, t=0, morphing=0  (span cleared)       ← SNAP, no animation
morphDurationMs: 723.8   morphingFrames: 22
```

**What the user sees on every expand:** the dock shrinks from a 55px circle to a 19px sliver
over ~200ms, sits dead at 19px for ~450ms, then the full 280px content **pops in instantly**.
That is precisely "FAR too long to squish/morph; slow, laggy, jittery" (U6) and "not sized
properly between transitions" (U16): the only sizes the spring ever animates between are 55 and
19 — both wrong — and the correct 280px arrives by a snap.

### Root cause: the nested DockLayerGroup makes the outer FLIP measure `to≈0`

The demo dock nests a layer group inside the morph region:
`Dock.vue:94` — `<DockLayerGroup v-model:active="activeLayer" :show-rail="false">`. Because it
is rendered inside `<GlassDock>`, `DockLayerGroup` **defers to the dock's single orchestrator**
and registers as a SECOND morph target (`DockLayerGroup.vue:86,92-99` →
`morphHost.registerGroup(...)`). So the spring drives two stacked targets: the outer
collapse↔expand `.dock-layers`, and the inner `.dock-layer-stack`.

Pane-state probe at the FLIP measure window (`window.__paneProbe`):

```
pre-expand (collapsed):  full pane inert+absolute, summary active+relative, layersW=40
measure-window (dt 83):  full pane is-active+relative (fullW=40), summary inactive+absolute,
                         dockExpandedClass=true, morphFrom:40px  morphTo:0px   ← to=0
measure-window (dt 119): morphFrom:40px  morphTo:0px
```

But when the dock is genuinely **settled-expanded** and I replicate the orchestrator's measure
(`window.__measure`):

```
naturalLayersW: 261.1   naturalFullW: 261.1
forced inline-size:max-content → measuredMaxContent: 261.1   fullUnderMax: 261.1   ← correct!
full pane single child: .dock-layer-group  (w 261.1)
```

So the geometry is sound **once the inner group is in-flow**. During the outer collapse→expand
FLIP, the orchestrator forces `max-content` on the OUTER `.dock-layers`, but the active
`.dock-layer--full` pane's only content is the nested `.dock-layer-stack`, which is **itself a
pinned morph target still at its collapsed span** in the same rAF — so the outer measurement
shrink-wraps to ~0, not 261. The `to=0px` span then springs the box 40→0 (the 55→19 visible),
and the real width only appears when `[data-morphing]` clears and the CSS `calc()` reads the
natural shrink-wrap → the snap.

**This is the `AY.W-GOD1 §F2` "first-mount FLIP mis-seat" that glass-ui BOOKED**
(`dockMorphContext.ts:328-343`) — but the booking calls it *intermittent / first-mount only*.
**It is not.** My cycle probe (`window.__cycles`) re-ran collapse→settle→expand four times:

```
cycle 0: morphTo:0px  morphFrom:40px
cycle 1: morphTo:0px  morphFrom:40px
cycle 2: morphTo:0px  morphFrom:40px
cycle 3: morphTo:0px  morphFrom:40px
```

**Every cycle measures `to:0px`.** For the demo dock (a `<DockLayerGroup>`-nested dock, the
exact config glass-ui's booking note says it did NOT witness — it tested a non-`#persistent`
slider dock), the mis-measure is **deterministic and permanent**, not a cold-start edge.

### Performance answer (the brief's "where do transitions burn time")

Perf trace (`reload:false`, 7 collapse/expand cycles driven during the trace; CPU 1×):

- **No long tasks; no layout thrash on the main thread.** The spring is one rAF loop writing a
  single registered `@property` scalar per frame (`dockMorphContext.ts:224-226`); the `calc()`
  reads composite. Cost per frame is negligible.
- **CLS = 0.01** over the cycle window. CLSCulprits: a recurring micro-shift burst, **one per
  cycle** (clusters at ~828ms / ~2595ms / ~4405ms), each a 0.0022 shift (the 19→280 SNAP) plus
  a stagger of 0.0001–0.0003 child-settle shifts. "No root cause identified" because the shifts
  are driven by the CSS-var animation, not a DOM mutation Chrome can attribute.

**Conclusion:** the dock does not burn *CPU* time — it burns *user* time. The ~720ms is wrong-
direction shrink (200ms) + dead hold (455ms) + a 1-frame snap. The "slow/laggy/jittery" read is
100% the mis-measured FLIP target, NOT throughput, NOT the spring constants. The fix is the
nested-target measurement ordering (the outer `to` must be measured with the inner group also
forced to its target `max-content`, or the inner group's contribution composed into the outer
measure), owned by **glass-ui** (`dockMorphContext.ts` / GlassDock.vue first-mount-seat); the
`AY.W-GOD1 §F2` booking must be **re-scoped from "first-mount intermittent" to
"deterministic for any `<DockLayerGroup>`-nested dock"** with this reproduction.

---

## §2 — U11: the desktop right pane is `display:none` — a Tailwind responsive-utility hole

### Live symptom

At 1440×900 (desktop), the default `picker` view (`VIEW_MAP.picker.right = "about"`,
`viewSchema.ts:84-91`) shows ONE card and no right "About" pane (shot U-DOCK-01). DOM probe:

```
.pane-container--dual (1000px grid)
  ├─ pane-shell (480px, VISIBLE — the picker card)
  ├─ pane-wrapper "hidden lg:flex …"   → display:none   (App.vue:45, the desktop LEFT slot)
  └─ pane-wrapper "hidden lg:block …"  → display:none   (App.vue:57, the desktop RIGHT slot)
```

`window.matchMedia('(min-width:1024px)').matches === true`, yet both `lg:*` wrappers compute
`display:none`. So `hidden` wins and neither desktop pane shows.

### Root cause — the responsive display utilities are NOT emitted

I created throwaway elements and asked the live stylesheet what these classes resolve to:

```
hidden lg:flex   → display:none     (lg:flex never overrides)
block  lg:hidden → display:block    (lg:hidden never hides)
hidden sm:flex   → display:none
hidden md:grid   → display:none
```

Direct stylesheet scan: inside `@media (min-width:1024px)` there are only **hand-authored**
rules (`:root`, `.pane-container`, `.pane-container--dual`); rule-existence probe:

```
.transition-opacity  → exists (App.vue is scanned ✓)
.duration-200        → exists ✓
.pane-wrapper--ghost → exists ✓        ← App.vue IS being scanned
.flex-1              → exists ✓
.lg\:grid-cols-…     → exists ✓        ← responsive variants DO generate in general
.lg\:grid-rows-none  → exists ✓
.lg\:flex            → MISSING ✗
.lg\:block           → MISSING ✗
.lg\:hidden          → MISSING ✗
.lg\:flex-1          → MISSING ✗        (used at ColorPicker.vue:3)
```

So this is **not** an `@source` scan miss (App.vue's own classes generate) and **not** a global
responsive failure (`lg:grid-cols-*`, `sm:flex-col` generate). It is specific to the
**display/flex-basis variants** `lg:flex`, `lg:block`, `lg:hidden`, `lg:flex-1` — the exact
utilities that gate the two desktop pane wrappers (App.vue:45,57) and the picker card's
`lg:flex-1` growth (ColorPicker.vue:3,25). The most likely mechanism is a plain-CSS
`.flex/.block/.hidden` definition (in an imported glass-ui/`tw-animate-css` layer) that
suppresses Tailwind's JIT generation of those base utilities and therefore their responsive
variants — but the **decisive live fact is that they do not exist**, so the desktop right pane
can never paint.

### This is the N.W2.B desktop-P0, still LIVE — not the W1D hydration residual

The charter (`N.md §2`) lists "desktop-P0 `@source` directive comment-only → N.W2.B"; PROGRESS.md
claims "desktop `@source` live" under W2.B-executing. **The live wire refutes the claim:** the
`@source` directives ARE present (`demo/@/styles/style.css:60-61`) but the `lg:`
display-utilities are absent, so the desktop dual-pane layout is dead on every load. The
`W1D-closure.md` Residual #1 (direct-hash boot leaves Palettes in the hidden slot) is a
*different, narrower* defect (cold direct-hash nav, view-specific); **U11 is the broad one**:
no `lg:*` display variant exists, so EVERY dual-pane view (picker/palettes/browse/mix/…) loses
its desktop right pane regardless of nav path. The hypothesis in LEDGER ("R1 pane-router
hydration residual") is **wrong**; the cause is CSS, not the router.

Owner: **demo** (the Tailwind v4 utility-generation config — verify the `flex/block/hidden`
base utilities are `@utility`-generated, not shadowed by a plain-CSS layer; add the explicit
display variants to the scan or mint a `.pane-wrapper` desktop rule that does not depend on the
missing `lg:` variants). Folds into **N.W2.B / N.W6.D** (the layout/right-size wave) and
underpins **U32** (the "two cards side-by-side, clamped" desktop mandate cannot land while the
right slot is `display:none`).

---

## §3 — U12: the transition-mechanism census (the nomenclature mess)

The demo's pane + card motion is spread across **three unrelated substrates** with **no shared
vocabulary**, none consuming the glass-ui motion primitives:

**Substrate A — Vue `<Transition>` named CSS classes (≥13 distinct, ad-hoc names):**

| name | site | role |
|---|---|---|
| `pane-left` | App.vue:39,51 (+CSS :343-355) | desktop/mobile left pane swap |
| `pane-right` | App.vue:66 (+CSS :357-368) | desktop right pane swap |
| `pane-slide` | App.vue CSS :331-340 | (defined, mobile pane-container) |
| `fade-slide` | ExtractPane.vue:43 | extract content swap |
| `pop` | MixPane.vue:107 | mix result swap |
| `fade` | (×2) | generic |
| `toggle-icon` | dark-mode toggle | icon morph |
| `slug-bar-swap` | PaletteSlugBar | slug editor |
| `rename-slide` | PaletteRenameInput | rename field |
| `feedback-slide` | ActionFeedback | toast-ish |
| `eyedropper-fade` | ImageEyedropper | eyedropper |
| `error-pop` | error states | error |
| `edit-overlay`, `edit-drawer` | EditDrawer / swatch | edit affordances |

Distinct `*-enter-active` CSS curve families: `pane-left`, `pane-right`, `pane-slide`,
`fade-slide`, `pop`, `edit-drawer`, `edit-overlay`, `error-pop`, `eyedropper-fade`,
`feedback-slide`, `rename-slide`, `slug-bar-swap`, `swatch-item`, `toggle-icon` — **14 families,
each its own duration/easing**, no token discipline. `PaneSlot.vue:35` is the shared shell but
takes a free-form `:name` string (`pane-left`/`pane-right`/`''`) so the vocabulary is unbounded.

**Substrate B — CSS-only `grid 0fr→1fr` width reveal:** `Dock.vue:215-227`
(`.action-bar-toggle-slot`) animates `grid-template-columns: 0fr → 1fr` on
`var(--duration-normal) var(--ease-standard)` — a different idiom again.

**Substrate C — the glass-ui JS-spring dock morph** (§1) — `--dock-morph-t`, response/damping.

glass-ui SHIPS the unification primitives, **consumed by none of the pane/card transitions**:
`useViewTransition`, `useSpringMount`, `useStagger`, `useLayerTransition`, `useNumericTransition`
(`../glass-ui/src/composables/motion/`). The standardization U12 asks for is: (a) one pane-swap
mechanism (the glass-ui View-Transition or a single `usePaneTransition`), (b) a fixed motion-token
vocabulary (the `--spring-*` / `--duration-*` ladder already in springPresets.ts), (c) retire the
14 bespoke `*-enter-active` families to ≤3 semantic ones (pane / pop / fade). Owner: **demo**
(the consume + nomenclature doc) with a possible glass-ui `usePaneTransition` ask if a pane-grade
primitive does not yet exist. Folds into **N.W6** (suffusion) with a standing nomenclature table.

---

## §4 — Disposition (waves + owners)

| ID | Root cause | Owner | Wave |
|---|---|---|---|
| **U6 / U16** | nested-DockLayerGroup makes the outer FLIP measure `to:0px` → wrong-direction spring + snap; deterministic for any nested dock (re-scope glass-ui `AY.W-GOD1 §F2` from "first-mount intermittent" → "always, nested") | **glass-ui** (`dockMorphContext.ts` measure ordering / GlassDock first-mount-seat) | glass-ui tranche BA ask; demo verifies post-pin |
| **U11** | `lg:flex`/`lg:block`/`lg:hidden`/`lg:flex-1` never emitted → desktop right pane `display:none` on every load (NOT the W1D hydration residual; NOT an `@source` miss) | **demo** (Tailwind v4 utility-generation; the base `flex/block/hidden` likely shadowed by a plain-CSS layer) | **N.W2.B** (re-open — claim "live" is false) + N.W6.D layout |
| **U12** | 3 unrelated transition substrates, 14 bespoke `*-enter-active` families, zero glass-ui motion-primitive consumption | **demo** (+ optional glass-ui `usePaneTransition`) | **N.W6** + nomenclature table |

**Standing directives honored:** every finding grounded file:line + live-probe; the two
PROGRESS.md "DONE/live" claims (W5.D dock, W2.B desktop) are refuted on the wire and re-opened;
nothing dropped. Screenshots: `shots/U-DOCK-01-initial.png` (single picker card, no right pane —
U11), `U-DOCK-02-midmorph-shrunk.png`, `U-DOCK-03-during-trace.png`.

---

## §5 — Live-probe appendix (reproduction recipes, for the impl lanes)

All probes drove the dock's exposed API found by walking `el.__vueParentComponent` up to the
`GlassDock` instance whose `.exposed` has `{expand, collapse, keepOpen, release, expanded, …}`
(GlassDock.vue:298).

1. **U6/U16 morph trace** — `release(); collapse();` wait ≥900ms to settle → verify
   `{w:55,collapsed:true,morphing:false,t:0}` → `expand()` → sample width/`--dock-morph-t`/`from`/`to`
   per rAF for 1.4s. Observe `from:40px→to:0px`, w 55→19, snap to 280 at settle.
2. **U6 determinism** — loop {`release();collapse()`; wait 700ms; `expand()`; read `--dock-morph-to`} ×4
   → `0px` every cycle.
3. **U6 geometry sanity** — `keepOpen();expand()`; wait 600ms; force `inline-size:max-content` on
   `.dock-layers`, read width → 261.1 (correct when inner group is in-flow → proves the bug is
   measurement ORDERING, not geometry).
4. **U11** — create `<div class="hidden lg:flex">` at 1440px → `getComputedStyle().display === 'none'`;
   stylesheet scan for `.lg\:flex` selector → absent.
