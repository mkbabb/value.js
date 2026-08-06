claude-opus-5[1m]

# CHALLENGE — `FrequencyGraph.vue` · axis **L** (LIBRARY)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/FrequencyGraph.vue` — **247 LOC**
(160 script · 52 template · 33 style), census row `formation/fourier/lane-frontend.md:133`
("**Canvas2D spectrum bar graph**") and render-path row **FE §6 Path C** (`lane-frontend.md:561-562`,
"pure watch-driven … No rAF").
**Repo posture** `/Users/mkbabb/Programming/fourier-analysis` is READ-ONLY evidence. Branch
`m/w1-bump-migration`, HEAD `cd26c65`. **The subject is CLEAN**, as are all four modules of its render
neighbourhood and every collaborator but one — `git status --porcelain` over `FrequencyGraph.vue`,
`CoefficientsSpectrum.vue`, `CoefficientsPanel.vue`, `equation/lib/harmonics.ts`,
`canvas-drawing/transforms.ts`, `canvas-drawing/epicycles.ts`, `BasisCanvas.vue`, `useCanvasSetup.ts`,
`ConvergencePlot.vue`, `EqCoefficientsPanel.vue`, `stores/workspace.ts`, `lib/types.ts` returns **empty**.
The single dirty file I cite is `VisualizationView.vue` — see **§0.1**; no finding turns on it.
**Method** static + source-derived only. No browser, no devtools, no Playwright. Where a claim would need a
live browser to close, it is marked **UNPROVEN-NEEDS-LIVE (SS-13)** and is excluded from the BLOCKER count.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries its own
falsifier. §7 records the **six hypotheses the tree falsified** — I was wrong six times and the record says
so, because L-18 runs both ways and so does the burden of proof. §5 records three things this file does
better than its siblings, held to the same evidentiary standard.

**Tally — defects 25 (BLOCKER 1 · MAJOR 7 · MINOR 10 · INFO 7) · superlatives 3.**

---

## §0 — Read set

Whole-file reads of the component and **every module it imports**, plus the modules required to close each
falsifier. All read-only.

| File | LOC | Why in the set |
|---|---|---|
| `web/src/components/equation/FrequencyGraph.vue` | **247** | subject |
| `web/src/lib/types.ts` | 392 | its **sole** import — `BasisComponent` (`:1-6`) |
| `web/src/components/visualization/CoefficientsPanel.vue` | 26 | the **sole** callsite (`:17-22`) |
| `web/src/components/shared/CoefficientsSpectrum.vue` | 168 | the sibling in the same panel; holds the `#graph` slot (`:70`) |
| `web/src/components/equation/lib/harmonics.ts` | 88 | **exports `spectrumColor` from the subject's own directory** (`:81-88`) |
| `web/src/components/visualization/lib/canvas-drawing/transforms.ts` | 39 | the **second** exported `spectrumColor` (`:3-8`) — the epicycle renderer's |
| `web/src/components/visualization/lib/canvas-drawing/epicycles.ts` §120-180 | 297 | `drawEpicycleCircles`, `spectrumColor(i, nVis)` at `:162` |
| `web/src/components/visualization/BasisCanvas.vue` §130-175, §315-360 | 547 | supplies `nVis` (`:135`, `:321`) — closes L-B1's denominator |
| `web/src/components/visualization/VisualizationView.vue` §189-275 | 486 | proves canvas + panel are **co-mounted** (`:199`, `:273`) |
| `web/src/components/visualization/composables/useCanvasSetup.ts` | 49 | the house DPR+ResizeObserver composable the subject bypasses |
| `web/src/components/equation/ConvergencePlot.vue` §1-60 | 410 | the sibling canvas — the in-tree comparator for teardown posture |
| `web/src/components/equation/EqCoefficientsPanel.vue` | 17 | the second `CoefficientsSpectrum` consumer (passes no `#graph`) |
| `web/src/stores/workspace.ts` §40-50, §110-180, §262-302, §410-440 | — | `shallowRef` + `markRaw` provenance — closes L-m1 and L-M1 |
| `web/tsconfig.json` | 20 | no `noUnusedLocals` — closes L-i1 |
| `web/package.json` §6-25 | — | scripts: `dev/build/preview/test:e2e` — **no lint, no vitest** (closes F-5) |
| `web/node_modules/@vue/reactivity/dist/reactivity.cjs.js` (`traverse`) | — | the `__v_skip` bail — closes L-m1 |
| `web/node_modules/@mkbabb/glass-ui/dist/styles/{tokens/scheme-motion,theme/bridges,typography/semantic,typography/utilities}.css` | — | token definitions — **falsifies F-1..F-4** |
| `src/fourier_analysis/epicycles.py` §25-70 | — | `sorted(..., reverse=True)` at `:54`; signed `frequency` — closes L-m4, L-M6 |
| `api/services/computation.py:113` | — | `"index": c.frequency` — the signed-index wire |
| `api/models/visualization.py:76,126,187` | — | `n_harmonics` `le=256` / `le=4096` — the label-width bound (L-M6) |

### §0.1 — the one dirty collaborator

`web/src/components/visualization/VisualizationView.vue` is `M` in the working tree. It is one of the
pre-existing in-scope dirty paths the adjudicated intake already records (`lane-fourier-r3-r6.md:107`,
R4-9: *"both carry the same **24** in-scope dirty paths"*) — **I made no edit in this repo.** The diff is
the M.W1 glass-ui bump, two one-line replacements:

```
@@ -27 +27 @@   -import { UnderlineTabs } from "@mkbabb/glass-ui/tabs";
                +import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
@@ -182 +182 @@ -<UnderlineTabs
                +<SegmentedTabs variant="underline"
```

Both hunks are `-N +N` single-line substitutions, so **line numbering is unchanged**, and the two lines this
challenge cites are byte-identical in `HEAD` and the worktree (verified by
`git show HEAD:… | sed -n '199p;273p'` against `sed -n '199p;273p'`):

- `:199` `<BasisCanvas ref="canvasComponent" :active-bases="activeBases"`
- `:273` `<CoefficientsPanel v-if="store.epicycleData || store.computing" />`

Those are the only two lines of this file **L-B1** depends on (the co-mounting proof). The finding holds at
`HEAD` and at the worktree alike.

**Hitherto corpus folded** — `formation/fourier/{lane-frontend,CENSUS-2026-08-03}.md` and the adjudicated intake
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Rows cited inline and reconciled in §6:
**FE `:133`** (the component row), **FE `:514`** + **CENSUS `:85-87`** (Canvas2D throughout / WebGL ABSENT /
three independent canvases), **FE `:558-562`** (Path B / Path C), **FE `:642`** + CENSUS `:427-432`
(the `FourierField` convergence study), **CENSUS `:121`** (`useCanvasSetup` — "DPR-aware canvas init +
ResizeObserver"), **CENSUS `:123`** (`canvas-drawing/*` incl. `transforms 39`), **R5-7** and **R6-5/R6-6**
(the template-loop invisibility class). One census row is **extended** and one intake carry is **extended
with a third class**; see §6.

---

## §1 — BLOCKER

### L-B1 · `spectrumColor` is forked four ways with **two divergent hue laws**, and the subject's private copy makes the coefficient bars disagree in colour with the epicycle circles of the same harmonic, on the same screen

**Severity BLOCKER.** **Provenance:**

| # | site | body | consumers |
|---|---|---|---|
| 1 | `FrequencyGraph.vue:42-45` | `hue = (1 - i/max(total-1,1)) * 300` → `hsl(...)` | **local, private** — bars `:84`, tooltip swatch `:196` |
| 2 | `equation/lib/harmonics.ts:81-88` | `hue = (1 - i/max(total-1,1)) * 300` → `hsla(..., alpha)` | `ConvergencePlot.vue:207`, `ConvergenceLegend.vue:36` |
| 3 | `visualization/lib/canvas-drawing/transforms.ts:3-8` | `t = i/max(total-1,1)`; **`curved = t**0.6`**; `hue = (1-curved)*300` | `canvas-drawing/epicycles.ts:162` (via `index.ts:2`) |
| 4 | `shared/CoefficientsSpectrum.vue:47-50` | byte-identical to #1 | the amplitude-bar list `:94`, tooltip swatch `:107` |

Site #1 is a **local re-declaration of a function its own directory already exports**: `FrequencyGraph.vue`
lives in `components/equation/`, and `components/equation/lib/harmonics.ts:81` exports `spectrumColor` — the
same file its sibling `ConvergencePlot.vue:10` imports by name. The subject is the only file in
`components/equation/` that declines the shared export and re-types the body.

That is a colocation defect on its own. What makes it a **BLOCKER** is that the fork has already **diverged
mathematically**, and the divergence is visible to the user in a single viewport:

- `VisualizationView.vue:199` mounts `<BasisCanvas>`; `VisualizationView.vue:273` mounts
  `<CoefficientsPanel v-if="store.epicycleData || store.computing">`. **Both read the same
  `store.epicycleData.components`** (`BasisCanvas` via its `components` prop chain; `CoefficientsPanel.vue:10`
  `store.epicycleData?.components ?? []`). They are co-mounted, not alternatives.
- Epicycle circle `i` is painted `spectrumColor(i, nVis)` (`epicycles.ts:162`) using **#3**, with
  `nVis = Math.min(maxCircles.value /* 80 */, components.length)` (`BasisCanvas.vue:135`, and again `:321`).
- Bar `i` is painted `spectrumColor(i, n)` (`FrequencyGraph.vue:84`) using **#1**, with
  `n = displayComponents.length = min(components.length, maxBars)` and `maxBars = 40` at the sole callsite
  (`CoefficientsPanel.vue:20`).
- Both index the **same amplitude-sorted chain** — `epicycles.py:54`
  `sorted(components, key=lambda c: c.amplitude, reverse=True)`, preserved through
  `computation.py:113` and never re-sorted client-side. So bar `i` and circle `i` **are the same harmonic**.

**Failure scenario (arithmetic, not conjecture).** A visualization with ≥ 80 components (routine: `n_harmonics`
defaults to 200 in `api/models/computation.py:44` and admits `le=4096` at `api/models/visualization.py:126`)
gives `nVis = 80`, `n = 40`:

| harmonic slot `i` | epicycle hue (`(1-(i/79)^0.6)·300`) | bar hue (`(1-i/39)·300`) | Δ |
|---|---|---|---|
| 0 | 300.0 (magenta) | 300.0 (magenta) | 0° |
| 10 | 213.2 (cyan-blue) | 223.1 | 9.9° |
| 20 | 168.4 (cyan) | 146.2 (green) | 22.2° |
| 30 | 132.2 (green) | 69.2 (yellow-green) | 63.0° |
| **39** | **103.6 (green)** | **0.0 (red)** | **103.6°** |

The last bar the user can see is **red**; the epicycle circle for that identical harmonic is **green**. The
hue is the *only* channel that binds a bar to its circle — there is no shared label, no shared hover key
(L-M3 shows the hover emit is unwired), no numbering on the canvas circles. The legend is therefore false
across most of its range, and it is false *silently*.

**Falsifier — and why it does not hold.** (a) *"The two denominators coincide when `components.length < 40`."*
They do — but the hue **laws** still differ (`t^0.6` vs `t`), so the two surfaces agree only at `i = 0` and
`i = n-1` and disagree everywhere between; at `n = 20`, slot 10 is hue 168.9 (epicycle) vs 142.1 (bar).
The defect is unconditional except at the two endpoints. (b) *"`colorOverride` may bypass #3."*
`epicycles.ts:162` is `colorOverride ?? spectrumColor(i, nVis)`, and `BasisCanvas.vue:172/356` passes the
override **only** when `epicycleHovered` — the default path is the divergent one. (c) *"Sites #1 and #4 differ
from #2 only by the `hsla` alpha channel."* Correct, and that is the point: #2 is a strict generalisation of
#1 (`alpha` defaults to `1`, and `hsla(h,s,l,1) === hsl(h,s,l)` per CSS Color 4 §5), so **#1 is a pure
subset of an export sitting one directory away** — there is no technical reason for it to exist.

**What would have prevented it.** One export, one denominator law. The tree already has the shape:
`canvas-drawing/index.ts:2` re-exports `spectrumColor` for the visualization side; `equation/lib/harmonics.ts`
does the same for the equation side. The subject needed to import, not retype. Note this is *not* the
`FourierField` convergence study the corpus already books (**FE `:642`**, CENSUS `:427-432`, "highest-value,
highest-risk") — this is a four-line function forked inside one repo, curable in a single edit, and it is
mispainting the shipped product today.

---

## §2 — MAJOR

### L-M1 · `onClick` dereferences a stale `hoveredBar` with no bounds re-validation → uncaught `TypeError`

**Severity MAJOR.** `FrequencyGraph.vue:151-155`:

```ts
function onClick() {
    if (hoveredBar.value !== null) {
        emit("toggle-harmonic", displayComponents.value[hoveredBar.value].index);
    }
}
```

`hoveredBar` is a **display index** written only by `hitTest` (`:127`), which bounds it against
`displayComponents.value.length` **at the time of the pointer move**. The redraw watcher (`:157`) fires on
`props.components` change and calls `draw()` — it **never resets or re-clamps `hoveredBar`**. The template
guards the tooltip (`:186` `hoveredBar !== null && displayComponents[hoveredBar]`); the draw loop guards
itself (`:75` `i < n`); **`onClick` guards nothing but `!== null`**.

**Failure scenario.** The panel is open (`ConfiguratorLayer :default-open="false"` — the user opened it) and
the pointer rests on bar 39. An in-flight async store write lands: `workspace.ts:272-273`
(`saveContourPoints` → `epicycleData.value = null; basesData.value = null`), or `:171/:177` (draft load), or
`:418` (reset), or `:299` `runComputeEpicycles` resolving with a smaller `n_harmonics`. `displayComponents`
becomes `[]` (or length 10). No `mousemove` is required to clear `hoveredBar` — `mouseleave` only fires if
the pointer physically exits the canvas, and it has not. The user clicks: `[] [39]` → `undefined` →
**`TypeError: Cannot read properties of undefined (reading 'index')`**, thrown out of a Vue event handler,
uncaught.

**Falsifier — partially holds, hence MAJOR not BLOCKER.** (a) *"The user must move the pointer to click, and
a move re-runs `hitTest`."* Not true in general — a stationary pointer plus a button press produces `click`
with no `mousemove`; but it *is* the common case, which is why this is MAJOR rather than BLOCKER. (b) *"The
emit is unwired (see L-M3), so nothing downstream breaks."* The emit is unwired; **the throw is not** — it
happens before `emit` is reached, on the property read. (c) *"`epicycleData` is only ever replaced, never
shrunk."* `workspace.ts:117`, `:171`, `:177`, `:273`, `:418` all assign `null`; `:299` assigns a fresh
`markRaw(result)` whose length is `contourSettings.n_harmonics`-dependent and can shrink.

The same stale index is read at `:136` and `:153`; only `:136` is safe (its `idx` is freshly bounded).

---

### L-M2 · the tooltip is mounted **inside** the `overflow-y-hidden` fixed-height scroller — and the correct containing block already exists in the file, unused

**Severity MAJOR.** Structure (`:172-211`):

```
div.scrollbar-thin  [overflow-x:auto · overflow-y:hidden · height: 120px · position:relative (:238)]
├── canvas          [CSS 120px tall]
└── div (tooltip)   [position:absolute · left: tooltipPos.x · top: max(tooltipPos.y-56, 4)]
```

`.freq-graph-host` is declared `position: relative` at `:216-218` — **the file already establishes the
correct, unclipped containing block one level up** — but `.scrollbar-thin { position: relative }` (`:238`)
re-captures the tooltip. `position: relative` on the scroller is required for nothing else in this file; it
exists only to be the tooltip's containing block, and it is the wrong one.

Three consequences, all source-derived:

1. **Bottom clip.** `top = Math.max(tooltipPos.y - 56, 4)` with `tooltipPos.y ∈ [0, 120]` (it is
   `e.clientY - scrollerRect.top`, `:138`) ⇒ `top ∈ [4, 64]`. The tooltip's content is `py-1.5` (12px) +
   a header row (~18px incl. `mb-0.5`) + a 2-row `grid` (~30px) ≈ **60px**, rising to ≈ 74px when
   `logScale` adds the third row (`:203-206`). At `top = 64` the box ends at 124–138px inside a 120px
   `overflow-y: hidden` container: **the Phase row is cut off** — and the bottom of the strip is exactly
   where the tall bars' bases and the index labels are, i.e. the natural hover target.
2. **Left clip.** `-translate-x-1/2` (`:188`) with `left = tooltipPos.x`. Over the first bar,
   `tooltipPos.x ≈ 11` (`startX = BAR_GAP + 4 = 7`, `:73`), so the transformed box starts at ≈ −49px.
   Scroll containers **clip at the inline-start edge and create no scrollable area there** (CSS Overflow 3
   §3), so the first bars' tooltips are permanently truncated on the left.
3. **Right-edge scroll growth.** Symmetrically, over the last bar the transformed box extends past the
   content width. An absolutely-positioned descendant whose containing block **is** the scroll container
   contributes to the scrollable overflow region in the inline-end direction, so hovering the last bar
   *grows the horizontal scroll range* — a scrollbar that changes length under the pointer.

`z-[var(--z-controls)]` (`:187`) is inert against all three: `--z-controls: 20` resolves fine
(`glass-ui/dist/styles/tokens/scheme-motion.css:336` — see F-1) but **z-index cannot escape a clipping
ancestor**. A stacking-order token was applied where the constraint is overflow.

**Falsifier.** (a) *"Exact pixel heights need a browser."* Yes — the *precise* clip threshold is
**UNPROVEN-NEEDS-LIVE (SS-13)**. The *structural* claim needs none: a ≈60px box anchored at up to `top: 64`
inside a `height: 120px; overflow-y: hidden` container overflows by arithmetic, and clauses 2 and 3 follow
from `-translate-x-1/2` at `x ≈ 11` regardless of height. (b) *"`overflow-y: hidden` on a box that also has
`overflow-x: auto` computes to `auto`."* It does **not** — CSS Overflow 3 §3.3 only forces `visible` →
`auto`; an explicit `hidden` stays `hidden` and clips. (c) *"The sibling avoids this."*
`CoefficientsSpectrum.vue:80-121` uses the glass-ui `Tooltip` primitive, which portals — see L-M7.

---

### L-M3 · the entire interaction contract is dead at the sole callsite, while `cursor-pointer` advertises a click affordance the component cannot honour

**Severity MAJOR.** The component declares four interactive surface members:

| member | declared | implemented | wired at the sole callsite |
|---|---|---|---|
| `activeIndices?: Set<number>` | `:7` | `:77` (0.25 alpha dim), `:157` (watch dep) | **no** |
| `logScale?: boolean` | `:9` | `:39`, `:48`, `:169`, `:203-206` | **no** |
| `toggle-harmonic` emit | `:16` | `:153` | **no** |
| `hover-harmonic` emit | `:17` | `:136`, `:146` | **no** |

`CoefficientsPanel.vue:17-22` passes `:components`, `:max-bars="40"`, `class="mb-2"` — nothing else, and no
listeners. `grep -rn "FrequencyGraph" web/src` returns exactly three hits: the import and the tag in
`CoefficientsPanel.vue`, plus two *prose* mentions in `CoefficientsSpectrum.vue:8,68`. There is no second
consumer: `EqCoefficientsPanel.vue:14` passes no `#graph` slot at all.

So **roughly 45% of the declared surface is unreachable**, including the whole log-magnitude axis that
`:164-171` and `:219-235` were written to annotate (the file's best work — see S-1 — is dead code).

**Why MAJOR rather than INFO.** `:179` sets `class="block cursor-pointer text-muted-foreground"` on the
canvas. Every bar therefore presents a pointer cursor and a hover glow (`:88-91` `shadowBlur = 8`), and
`onClick` (`:151`) fires and emits — into nothing. The component **promises a click affordance on 40 targets
and delivers no state change**. That is a user-visible defect, not merely unused code.

**Falsifier.** (a) *"A future callsite will wire it."* Nothing in the tree does, and the whole render path
is enumerated in the corpus (**FE §6**, three canvases, and Path C names this component). (b) *"`cursor-pointer`
is cosmetic."* It is the standard affordance signal, and it is paired with a real `@click` handler and a real
hover highlight — three independent signals of interactivity, zero effects. (c) *"`activeIndices` being
`undefined` is handled."* It is (`:77` `!props.activeIndices || …` → everything active), which proves the
dead branch was *designed* for a consumer that never arrived.

---

### L-M4 · the index labels are drawn in the strip the reserved horizontal scrollbar occupies

**Severity MAJOR · UNPROVEN-NEEDS-LIVE (SS-13); excluded from the BLOCKER count.** Five facts, all in-file:

- the scroller is `height: ${HEIGHT}px` = **120px** exactly (`:175`), with **`overflow-y-hidden`** (`:174`);
- the canvas CSS height is **also** `${HEIGHT}px` = 120px (`:61`) — no allowance is made for chrome;
- the horizontal scrollbar is styled to *reserve* space: `scrollbar-width: thin` (`:237`) and
  `::-webkit-scrollbar { height: 4px }` (`:240-242`);
- the harmonic index labels are `fillText` at `y = HEIGHT - 4` = **116** (`:111`) at `9px` (`:109`) —
  glyphs occupy roughly y ∈ [109, 118] with descenders;
- the content **does** overflow: `canvasWidth = 40·(14+3) + 3 + 8 = 691px` (`:31-34` with `maxBars = 40`)
  inside a `ConfiguratorLayer` panel far narrower than 691px, so the scrollbar is always present.

On any engine where `scrollbar-width: thin` **reserves layout space** rather than overlaying — Firefox's
classic scrollbars (~11px at `thin`), and WebKit/Blink with "always show scrollbars" — the scroller's content
box shrinks to ≈ 109px while the canvas stays 120px, and `overflow-y: hidden` clips everything below.
**Every index label disappears**, taking with it the only mapping from a bar to its harmonic number. Nothing
in the file reacts: there is no resize path (L-M5), and the label band is a hard-coded 18px (`:71`
`pad.bottom`) that the scroller height never accounts for.

**Falsifier.** (a) *"macOS overlay scrollbars don't reserve space."* Correct — and that is precisely why this
is browser-conditional and marked UNPROVEN-NEEDS-LIVE. The source arithmetic is unconditional; only the
engine's scrollbar mode decides whether it bites. (b) *"`::-webkit-scrollbar{height:4px}` only costs 4px, and
the labels end at ~118."* Under WebKit's non-overlay mode the content box is 116px and the label baseline is
at 116 — the glyph bodies survive, descenders do not. The Firefox case is the severe one. (c) *"The label
band could be drawn higher."* It could — `pad.bottom = 18` already reserves the room *inside the canvas*;
the bug is that the *scroller* was sized to the canvas rather than to the canvas + scrollbar.

---

### L-M5 · no repaint on font load and none on DPR change — the house composable that owns exactly this is bypassed

**Severity MAJOR.** `draw()` is invoked from exactly three places: `onMounted` (`:159`), the prop watcher
(`:157`), and the two hover mutations (`:139`, `:148`). There is **no** `ResizeObserver`, **no**
`matchMedia("(resolution: …)")` listener, and **no** `document.fonts.ready` hook.

- **Font.** `:109` sets `ctx.font = "9px 'Fira Code', monospace"` inside `draw()`. Canvas text is rasterised
  at call time and never reflows. If `Fira Code` has not finished loading when `onMounted` fires, every index
  label is baked in the `monospace` fallback for the lifetime of the component — and since the only other
  redraw trigger is a `props.components` change, a static spectrum never corrects itself. The rest of the
  component is font-fastidious (`:223` Computer Modern/EB Garamond for the axis label, `fira-code` on every
  tooltip numeral) — the canvas is the one surface that cannot participate.
- **DPR.** `:56` reads `window.devicePixelRatio` once per `draw()`. Moving the window between a Retina and a
  1× display changes DPR with no resize of *this* element (its width is content-derived, not layout-derived),
  so nothing re-fires and the bitmap stays at the old scale — visibly soft or over-sharp.

The tree already owns the cure. `visualization/composables/useCanvasSetup.ts` (49 LOC; census row
**CENSUS `:121`**, "**DPR-aware canvas init + ResizeObserver**") does the identical `width/height/style/
setTransform` sequence at `:25-31` and adds `ResizeObserver` + `onUnmounted` disconnect at `:38-46`.
`FrequencyGraph.vue:56-64` is a hand-rolled subset of `:25-31` with the observer half dropped. Of the three
canvases the corpus enumerates (**CENSUS `:85-87`**, **FE `:514`**), `BasisCanvas` uses the composable
(`BasisCanvas.vue:55`), `ConvergencePlot` hand-rolls it but at least registers a `ResizeObserver`
(`ConvergencePlot.vue:325`) and disconnects it (`:329`) — **`FrequencyGraph` is the only canvas in the repo
with no resize path at all**.

**Falsifier — partly holds, and narrows the claim honestly.** *"`FrequencyGraph` doesn't need a
`ResizeObserver`: `canvasWidth` is derived from `displayComponents.length` (`:31-34`), not from layout, so
container resize genuinely cannot change the bitmap."* **Correct** — and I accept it. The finding therefore
does *not* claim a missing resize redraw; it claims a missing **font-load** redraw and a missing **DPR-change**
redraw, neither of which container-independence excuses, and both of which the composable's observer would
have incidentally caught on any co-occurring layout change.

---

### L-M6 · harmonic labels are drawn without measurement or elision, at a pitch narrower than the strings the wire can produce

**Severity MAJOR.** `:111` `ctx.fillText(String(comp.index), x + BAR_W/2, HEIGHT - 4)` at `9px 'Fira Code'`
(`:109`), `textAlign: "center"` (`:110`), on a pitch of `BAR_W + BAR_GAP = 17px` (`:25-26`).

`comp.index` is the **signed** harmonic number: `api/services/computation.py:113` maps it straight from the
Python `frequency` field (`epicycles.py:33`), and `EpicycleChain.from_signal` documents `n_harmonics` as
"Max number of positive/**negative** harmonics" (`epicycles.py:66-68`). The sibling confirms signs are live —
`CoefficientsSpectrum.vue:87` renders `comp.index >= 0 ? "+" : ""`. The bound is `n_harmonics ≤ 4096`
(`api/models/visualization.py:126,187`), so `String(comp.index)` reaches **5 characters** (`-4096`).

Fira Code is monospace at advance 0.6 em ⇒ 5.4px per glyph at 9px. Label widths: 1 char 5.4px, 2 chars
10.8px, **3 chars 16.2px** (95% of the 17px pitch — adjacent labels touch), **4 chars 21.6px** and **5 chars
27.0px** (159% of pitch — labels overprint their neighbours' labels). And because the chain is sorted by
**descending amplitude** (`epicycles.py:54`), not by `|n|`, a 4-character label sits next to a 1-character
one with no ordering that would let a strided-label scheme work.

Nothing mitigates: there is no `ctx.measureText`, no elision, no rotation, no stride, and no per-bar clip.

**Falsifier.** (a) *"Typical spectra are small."* The API default is `n_harmonics = 200`
(`api/models/computation.py:44`), which already yields 3-character labels at the touching threshold, and
`le=4096` is a supported input, not a pathological one. (b) *"`maxBars = 40` limits what is shown."* It
limits the *count*, not the *magnitude* — slot 39 of an amplitude-sorted chain can carry any `|n|` up to the
harmonic ceiling. (c) *"Overprinted 9px labels are legible enough."* At 5 characters over a 17px pitch the
glyphs of three adjacent labels interleave; this is not a legibility gradient, it is superposition.

---

### L-M7 · the bespoke tooltip re-introduces the exact shim its sibling's header records as retired

**Severity MAJOR.** `CoefficientsSpectrum.vue:11-15`, in the file's own doc block:

> *"B.W2.c — … the bespoke `:hover` CSS tooltip lifts to the glass-ui `Tooltip` primitive (the local shim
> wraps `Tooltip` + `TooltipTrigger` + `TooltipContent`), **discharging the L5 §5 A8 LOW a11y gap**."*

`FrequencyGraph.vue:185-210` is a hand-rolled absolutely-positioned `div` with manual `left`/`top` arithmetic
(`:191`), a hand-written popover skin (`bg-popover text-popover-foreground border-[1.5px] border-border
shadow-[0_4px_12px_rgba(0,0,0,0.12)]`, `:189-190`) and no primitive — i.e. **precisely the construct B.W2.c
removed from the file sitting 14 lines above it in the same rendered panel**. The two tooltips are stacked in
one `ConfiguratorLayer` (`CoefficientsPanel.vue:14-24`: `#graph` slot then the list) and are visibly
different objects.

They also disagree on **content**: the sibling shows Amplitude / Phase / Relative / **Re / Im**
(`CoefficientsSpectrum.vue:111-118`); the subject shows Amplitude / **log₁₀(·+1)** / Phase (`:200-209`) and
never touches `coefficient` (`types.ts:3`) despite receiving it. One panel, one data row, two tooltip
components, two field sets, two skins, one of them the retired one.

**Falsifier.** (a) *"A canvas has no per-bar DOM node to hang a `TooltipTrigger` on, so the primitive doesn't
apply."* This is the strongest objection and it is **half-right**: the *trigger* half genuinely cannot be
declarative over canvas hit-regions. It does not excuse the *content* half — glass-ui's `TooltipContent`
(or a single controlled `Tooltip` whose open state is driven by `hoveredBar`) would supply the portal,
the skin and the ARIA wiring, and the portal alone would dissolve all three clips of L-M2. (b) *"L5 §5 A8
concerned the list rows, not the graph."* It concerned the pattern; the discharge note names the construct
("bespoke `:hover` CSS tooltip"), and this is that construct. (c) *"The subject predates B.W2.c."* Both files
are clean at `cd26c65`; whatever the order, the cured and uncured forms ship together today.

---

## §3 — MINOR

### L-m1 · `deep: true` buys nothing and costs a full ~7N-node walk — the data it watches is `markRaw`

`:157` `watch(() => [props.components, props.logScale, props.maxBars, props.activeIndices], () => draw(), { deep: true })`
— the exact expression the corpus records at **FE `:562`**.

The store never makes this data reactive: `workspace.ts:44` `const epicycleData = shallowRef<EpicycleData|null>(null)`
and `:299` `epicycleData.value = markRaw(result)`. A `shallowRef` does not proxy its value, and `markRaw`
sets `__v_skip` on it. So `props.components` is a **raw** array of **raw** objects.

Vue 3.5.38's `traverse` (`@vue/reactivity/dist/reactivity.cjs.js`) bails only on
`depth <= 0 || !isObject(value) || value["__v_skip"]`. `__v_skip` is on the *parent* `EpicycleData` object,
which `traverse` never visits (the getter hands it `props.components` directly). So the walk **runs in full**:
outer array → components array → N component objects → each object's 4 keys → each `coefficient` 2-tuple
≈ **7N node visits and ~2N `seen`-Map insertions per watcher run**, and because nothing in the chain is a
proxy, it registers **zero dependencies**. At `n_harmonics = 4096` that is ~28 000 visits and ~8 200 Map
writes bought for nothing.

The watcher still fires correctly — but for a different reason than `deep` suggests: `shallowRef` identity
changes on assignment, the getter returns a **fresh array literal** each run, so `hasChanged` is always true.
`deep: true` is therefore **dead configuration that advertises a mutation-tracking guarantee `markRaw` has
already voided**, and the day someone removes `markRaw` it silently becomes an O(N·fields) tracked traversal.

**Falsifier.** (a) *"`traverse` short-circuits on raw objects."* It does not — verified in the installed
source; the only skip is the explicit `__v_skip` flag, which is not on the array. (b) *"`activeIndices` is a
`Set` and needs `deep`."* True in principle — `traverse` does walk `Set` values — but `activeIndices` is
never passed (L-M3), so today the flag serves nothing. (c) *"7N is negligible."* Per event, yes; the finding
is the false contract, and the cost is the quantified sting, not the headline.

### L-m2 · `getComputedStyle` and the font/alignment setup live **inside** the per-bar loop

`:107-110`, executed once per bar:

```ts
ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("color") || "#888";
ctx.font = "9px 'Fira Code', monospace";
ctx.textAlign = "center";
```

All three are loop-invariant — `canvas`'s computed `color` cannot change mid-loop (nothing in the loop
touches the DOM), and the font/alignment are literals. At `maxBars = 40` that is 40 `getComputedStyle`
calls per `draw()`, and `draw()` runs on **every hover transition** (`:139`, `:148`), i.e. once per bar
crossed while sweeping the strip. `getComputedStyle` returns a live `CSSStyleDeclaration`; each call
allocates a wrapper and each `getPropertyValue` read is a style-system query. Hoisting all three above
`for (let i = 0; …)` (`:75`) is a three-line move with no behavioural change.

**Falsifier.** *"Style recalc is only forced when style is dirty, and the loop dirties nothing, so calls
2..40 are cache hits."* Largely true — which is why this is MINOR and not MAJOR. The allocation and the
query overhead remain, and the `draw()`-per-hover-transition multiplier makes it the hottest loop in a
component whose entire cost model is that loop.

### L-m3 · an all-zero spectrum divides by zero and every bar silently vanishes

`:36-40` returns `1` only for the **empty** case; a non-empty array whose largest amplitude is `0` returns
`0` (or `Math.log10(0+1) = 0` under `logScale`). `:47-50` then computes `val / 0`:

- `0 / 0 = NaN` → `Math.max(NaN, 0.008) = NaN` (per ECMA-262 `Math.max` NaN propagation)
- ⇒ `barH = NaN` (`:82`), `y = NaN` (`:83`)
- ⇒ every `moveTo/lineTo/quadraticCurveTo` with a non-finite argument is **silently discarded** (HTML §4.12.5,
  "if any of the arguments are infinite or NaN, then return"), so `fill()` paints nothing.

Result: **the labels render, the bars do not** — a graph that looks loaded and shows no data, with no console
warning. The `Math.max(…, 0.008)` floor (S-2) was written to prevent exactly this class of vanishing and
cannot, because `NaN` defeats it.

**Falsifier.** *"An all-zero spectrum is unreachable."* It is reachable in principle — a degenerate contour
(a single repeated point) has all-zero Fourier coefficients — but I could not construct it from the tree, so
the severity is MINOR on likelihood, not on consequence. The guard is one character: `return max || 1`.

### L-m4 · an undeclared descending-amplitude precondition, with no upper clamp behind it

`:36-40` takes `displayComponents.value[0].amplitude` as **the maximum**. That is only true if the array is
sorted descending. `BasisComponent` (`types.ts:1-6`) and `BasisDecomposition.components` (`:10`) declare no
such invariant — the type says "array of components", nothing more. `barFraction` (`:47-50`) clamps only
*below* (`Math.max(…, 0.008)`), never above, so an unsorted array yields `frac > 1`, `barH > plotH`, and
`y = pad.top + plotH - barH < pad.top` — bars drawn **above** the padding, overprinting the axis annotation
row and, past `y < 0`, clipped by the canvas edge with no indication.

**Falsifier — holds for today's callsite.** `epicycles.py:54` sorts descending, `computation.py:113`
preserves the order, and no client code re-sorts. **The live path is safe**, so this is a contract-hygiene
claim, not a live bug — the precondition is real, load-bearing, undocumented, and unenforced, on a prop typed
as a bare array that a second consumer (`BasisDecomposition.components`, populated by a different backend
path) could supply unsorted.

### L-m5 · the tooltip is centred on the pointer's **entry edge**, not on the bar

`:134` gates the whole body on `idx !== hoveredBar.value`, so `tooltipPos` (`:138`) is captured **only at the
moment the pointer crosses into a new bar**. Combined with `-translate-x-1/2` (`:188`), the tooltip centres on
the crossing point: sweeping right it sits over the bar's **left** edge, sweeping left over its **right** edge
— a systematic ±7px (`BAR_W/2`) direction-dependent offset, and no correction while the pointer moves within
the bar. The bar centre is one expression away and already computed for the label: `x + BAR_W/2` (`:111`).

**Falsifier.** *"Freezing the tooltip position is deliberate anti-jitter."* Plausibly the intent — but the
frozen value is the arbitrary entry point rather than the stable bar centre, which delivers the jitter
suppression *and* correct placement. The gate is on `idx` change either way.

### L-m6 · `hover-harmonic` goes stale when the data changes under a held hover

`hoveredBar` is a **display slot**, and slot `i` maps to a different harmonic after `props.components`
changes. The watcher (`:157`) redraws and the template tooltip re-renders against the new
`displayComponents[hoveredBar]` — but `emit("hover-harmonic", …)` fires **only** from `onMouseMove` (`:136`)
and `onMouseLeave` (`:146`). A parent that highlighted harmonic *n* keeps highlighting *n* while the canvas
glow and the tooltip have both moved to a different harmonic, until the pointer moves.

**Falsifier.** The emit is unwired today (L-M3), so no consumer observes the staleness — MINOR on that basis
alone. The defect is in the contract: a hover emit that is not re-emitted when the hovered *identity* changes
without pointer motion.

### L-m7 · inconsistent null posture across one call chain

`hitTest` treats both refs as genuinely nullable — `:119` `if (!canvas || !scroll) return null`. Its caller
`onMouseMove` then dereferences the same ref twice with non-null assertions — `:137-138`
`scrollRef.value!.getBoundingClientRect()`, `scrollRef.value!.scrollLeft`. If `scrollRef` were ever unset,
`hitTest` returns `null`, and when `hoveredBar` was non-`null` the branch is entered and the assertion throws
on the very ref the callee just proved nullable. Either the guard at `:119` is unnecessary or the assertions
at `:137-138` are unsound; the file asserts both.

**Falsifier.** Both refs are bound to elements in the same template subtree as the `@mousemove` handler, so
neither can be unset when the handler fires — the crash is unreachable. MINOR as a consistency defect;
`hitTest`'s guard is the honest posture and `!` is the dishonest one.

### L-m8 · hit-testing ignores Y entirely

`:125-128` tests only `mx >= x && mx <= x + BAR_W`. The whole 120px column is live: the empty space far above
a 1%-amplitude bar, and the 18px label band below every bar (`:71` `pad.bottom`). Hovering blank canvas
produces a hover glow on a bar the pointer is nowhere near, plus the tooltip and the emit.

**Falsifier.** *"A full-height column target is the standard bar-chart affordance."* It is — for **hover**.
It is a weaker fit for **click-to-toggle** (`:151`), where a 120×14px target over mostly-empty canvas is
generous to the point of misfiring, and the file offers no visual cue (no column band, no baseline
highlight) that the column rather than the bar is the target.

### L-m9 · three independent truncation constants for one spectrum in one panel — and the panel's own counter does not count the graph

Within `CoefficientsPanel` (`:14-24`) a single `components` array is truncated three ways:

| surface | cap | site |
|---|---|---|
| the bar graph | `maxBars = 40` | `CoefficientsPanel.vue:20` (over a default of `60`, `FrequencyGraph.vue:11`) |
| the row list | `12`, or `40` expanded | `CoefficientsSpectrum.vue:38` |
| the "expand" threshold | `12` | `CoefficientsSpectrum.vue:126` |

and the on-screen readout `{{ topComponents.length }} / {{ totalComponents }}` (`CoefficientsSpectrum.vue:74`)
reports **12 / N** while 40 bars are drawn directly above it. The component's own default (`60`) is a fourth
constant that no callsite uses. Three magic numbers, no shared source, and a counter that disagrees with what
the user can see.

**Falsifier.** *"Graph density and list length are legitimately different design decisions."* Agreed — the
defect is not that they differ, it is that they are four unrelated literals with no named binding, and that
the visible counter silently excludes the larger of the two surfaces it sits under.

### L-m10 · the 40 bars are invisible to **both** the R5-7 blind spot and the R6-5 cure — a third instance-invisibility class

The lane brief asks where **R5-7** applies (adjudicated TRUE at
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:125`: *"template-loop evidence keyed to **component**
callsites is blind to native HTML element loops"*), cured at **R6-5/R6-6** (`:139-140`) by the
`NATIVE_TEMPLATE_LOOP` family (`nativeTemplateLoops: 16`).

**R5-7 does not apply here, and neither does its cure.** `FrequencyGraph.vue` contains **zero `v-for` of any
kind** — no component loop, no native-element loop. Its repetition is an **imperative `for (let i = 0; i < n; i++)`
at `:75`**, emitting 40 canvas paths, 40 `fillText` calls and 40 pointer-addressable hit regions (`:125-128`)
with **no DOM node whatsoever**.

R5-7 named the class *component-callsite-keyed evidence misses native element loops*. R6-5 cured that by
parsing `v-for` on native elements. **Both models are template-shaped.** Neither can see a `for` loop inside a
`<script setup>` function, so **every mounted instance this component renders is uncounted by the deriver at
its cured state** — 40 interactive targets, zero registry rows, on a component the census does enumerate
(**FE `:133`**, **FE `:561-562`**).

This is not a restatement of R5-7; it is a **third class** on the same axis, and it is the class the corpus
has not yet named:

| class | repetition site | R4/R5 deriver | R6 cure |
|---|---|---|---|
| component `v-for` | template, component tag | **counted** (`instance.loop.presets`, keyed by `callsite:…FunctionInput.vue:157:Tooltip:…`) | counted |
| native `v-for` (R5-7) | template, native element | **blind** (`instance.loop.paper-sidebar = []`) | **counted** (`NATIVE_TEMPLATE_LOOP`, 3 rows) |
| **imperative canvas loop (here)** | `<script setup>`, `for` over `ctx` calls | **blind** | **still blind** |

And the class has a **live, user-visible instance in this very panel**: `CoefficientsSpectrum.vue:74` prints
`12 / N` — a DOM-derived count of the `v-for` rows — directly beneath 40 canvas bars it does not count. The
derivation blind spot and the product's own counter are the same mistake at two altitudes.

**Severity MINOR as a code defect** (nothing misbehaves at runtime); **high value as a carry** — see §6.

**Falsifier.** (a) *"The deriver counts render output, not source loops."* R6-5's own evidence is source-line
keyed — `lines 65 / 105 / 87` with the literal expressions `(section, si) in sections` etc.
(`lane-fourier-r3-r6.md:139`) — so it is a template-source parser and cannot reach `:75`. (b) *"Canvas
content is out of scope for an instance census."* Then the scope law must say so explicitly; **X-9**
(`:160`) already books "the formation must pick and publish one scope law before any per-component census
claims a percentage", and this component is the case that forces the question.

---

## §4 — INFO

- **L-i1 · dead import.** `:2` imports `onUnmounted`; it is never called (the file has nothing to tear down —
  see S-3). Nothing catches it: `web/tsconfig.json` sets no `noUnusedLocals`, there is no ESLint config in
  `web/`, and `package.json` has no lint script (`dev`/`build`/`preview`/`test:e2e` only). Rollup drops it,
  so there is no shipped cost — a pure signal defect.
- **L-i2 · unreachable fallback.** `:108` `getComputedStyle(canvas).getPropertyValue("color") || "#888"`.
  `color` is an inherited longhand that always computes to a used value on a connected element, and the
  canvas carries `text-muted-foreground` (`:179`) explicitly. The `|| "#888"` branch cannot be taken.
- **L-i3 · unchecked context.** `:63` `canvas.getContext("2d")!`. A `null` return (context-loss, resource
  exhaustion) becomes a `TypeError` on the next line. Noted as **house style, not a deviation** —
  `useCanvasSetup.ts:30` does the identical assertion.
- **L-i4 · constants leak into template scope.** `BAR_W` (`:25`), `BAR_GAP` (`:26`) and `HEIGHT` (`:27`) are
  top-level `<script setup>` bindings and are therefore all exposed to the render context; only `HEIGHT` is
  consumed (`:175`). Harmless, but it makes the template's true surface larger than it reads.
- **L-i5 · no empty or error posture of its own.** `draw()` returns early at `n === 0` (`:69`) leaving a blank
  `100×120` box (the `Math.max(…, 100)` floor at `:33`); the empty state is supplied entirely by the caller's
  `v-if="components.length"` (`CoefficientsPanel.vue:18`), and nothing in the prop contract records that
  obligation. The sibling, by contrast, owns its empty copy (`CoefficientsSpectrum.vue:27-32`, `:138-140`).
- **L-i6 · zero test coverage of any kind.** No vitest in `web/` (`package.json` scripts), and
  `grep -rn "FrequencyGraph|freq-graph" web/e2e` → empty. Every finding above is unguarded by a regression
  test, including L-B1, which a four-line unit assertion (`spectrumColor(i,n)` agreement across the three
  exports) would have caught at authoring time.
- **L-i7 · module size is *not* the defect.** 247 LOC sits comfortably inside the house band
  (`ConvergencePlot` 410, `BasisCanvas` 547, census `:131`/`:83`). The Goldilocks problem here is **layering,
  not size**: the file inlines the analogues of four extracted house modules — `lib/harmonics.ts`
  (colour, L-B1), `lib/hit-test.ts` (hit-testing, `:116-130`), `lib/grid.ts` (padding/axis geometry,
  `:71-73`) and `composables/useCanvasSetup.ts` (DPR, L-M5) — which is why the file *reads* tidy and still
  carries a BLOCKER.

---

## §5 — Superlatives (L-18 runs both ways)

### S-1 · the axis annotation is the most epistemically honest surface in the repo's chart code

`:164-171` renders the applied transform **as UI**, not as folklore: `log₁₀(|cₙ| + 1)` or `|cₙ|`, with a
`title` that names the convention *and justifies the shift* — *"The +1 shift admits zero amplitudes."* The
comment block above it (`:164-167`) states the reason for the reason: *"the transform applied to bar heights
is named explicitly so the viewer is not left to infer a silent log mapping."* The scoped rule
(`:219-235`) then puts it in Computer Modern / EB Garamond with a documented cross-walk note and
`cursor: help`.

**Held to the same standard.** No other chart surface in the tree does this: `CoefficientsSpectrum.vue:56-59`
computes a `Relative %` against `topComponents[0]` with no stated denominator; `ConvergencePlot` draws a grid
via `lib/grid.ts` with no axis-transform annotation. A silent log axis is one of the most common quiet lies
in data visualisation, and this file refuses to tell it. **Diminished, not erased, by L-M3**: `logScale` is
never `true` at the sole callsite, so the best-argued surface in the file is currently dead code — which is
an argument for wiring it, not for removing it.

### S-2 · the `0.008` minimum-bar floor is a real, deliberate, correctly-placed guard

`:49` `Math.max(val / maxAmplitude.value, 0.008)`. On a spectrum whose tail is 4 orders below the fundamental,
the naive fraction yields sub-pixel bars that anti-alias to nothing, and the user reads "no harmonic here"
instead of "a small harmonic here". `0.008 × plotH (96px) ≈ 0.77px` — a hairline that survives rasterisation.
It is applied at exactly the right layer (after the log/linear branch, before the pixel multiply) so it
behaves identically under both axis modes.

**Held to the same standard.** It is defeated by `NaN` in the all-zero case (L-m3), and it lacks the
symmetric upper clamp (L-m4). Both are one-line repairs to a guard that is otherwise better than its
siblings — `CoefficientsSpectrum.vue:96` reaches for the same idea with `minWidth: '2px'` in CSS, which is
coarser and unit-bound.

### S-3 · it is the only canvas in the repository that structurally cannot leak

Zero `addEventListener`, zero `requestAnimationFrame`, zero `ResizeObserver`, zero `IntersectionObserver`,
zero timers. Every listener is template-bound (`:180-182`) and unbound by Vue on unmount; the only imperative
resource is the 2D context, which dies with the element. Compare the corpus's own census of the three canvases
(**CENSUS `:85-87`**, **FE `:514`**): `BasisCanvas` holds an `IntersectionObserver` (`:435`), a
`ResizeObserver` via `useCanvasSetup` (`:40`) and a registration in the store's rAF gate;
`ConvergencePlot` holds an **ungated** rAF (`:67-69`, **FE `:558-559`**) plus a `ResizeObserver` (`:325`) and
must disconnect both (`:329`). **FrequencyGraph has nothing to unwind, so it can never fail to unwind it** —
and it is the only one of the three that does not compete for the frame budget, exactly as **FE `:561-562`**
records ("pure watch-driven … No rAF").

**Held to the same standard.** The dead `onUnmounted` import (L-i1) is the vestige of a teardown that was
correctly never written; and the same austerity is what produces L-M5 (no font/DPR repaint path). This is a
genuine virtue with a named cost, not a virtue by omission.

---

## §6 — Corpus reconciliation

**Confirmed unchanged.**

- **FE `:133`** — "`FrequencyGraph.vue` | **247** | Canvas2D spectrum bar graph". Exact: `wc -l` → 247.
- **FE `:561-562`** (Path C) — "`:63` `getContext("2d")`; single deep watcher `:157` … No rAF." Every
  coordinate exact, including the verbatim watch expression. This is the most precisely-cited row I checked.
- **FE `:514`** / **CENSUS `:85-87`** — Canvas2D throughout, WebGL/WebGPU absent, three independent canvases.
  Confirmed: the subject is pure `getContext("2d")`; `grep -rn "webgl" web/src` → empty.
- **CENSUS `:121`** — `useCanvasSetup.ts` "**49** | DPR-aware canvas init + ResizeObserver". Exact, and it is
  the module L-M5 shows the subject bypasses.
- **CENSUS `:123`** — `canvas-drawing/*` "9 files, 764 total … **transforms 39**". Exact; `transforms.ts` is
  39 LOC and holds fork #3 of L-B1.

**Extended (one census row).**

- **CENSUS `:85-87` / FE `:514`** characterise the three canvases by their *clock* (store-rAF · own-rAF ·
  watch-driven). That axis is right and complete. **Add a second axis — the colour law.** Two of the three
  paint harmonic `i` with a function named `spectrumColor`, and the two functions are not the same function
  (`transforms.ts:3` applies `t^0.6`; `harmonics.ts:81` and the subject's private copy do not). The census's
  "three independent canvases" is truer than intended: they are independent in their **encoding**, not only
  in their scheduling. **L-B1** is the consequence and belongs in the wave board next to the clock rows.
- Related but **distinct** from **FE `:642`** / CENSUS `:427-432` (the `FourierField` convergence study,
  "highest-value, highest-risk"). That row concerns replacing 1 311 LOC of Canvas2D with glass-ui's
  GPU-backed component. L-B1 is a four-line function forked inside one repo, curable in one edit, and
  mispainting the shipped product **now** — it should not be deferred behind the convergence study.

**Extended (one intake carry).**

- **R5-7** (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT + CARRY → F.W4) and its **R6-5/R6-6** cure (`:139-140`)
  are folded, not re-invented. **This component falsifies the sufficiency of the cure.** It has no `v-for`
  at all, so it is outside both the defect and the fix; its 40 instances live in an imperative `for` at
  `:75`. **L-m10** names the third class and tabulates it against the two the intake already holds. The
  F.W4 direction stated at `:125` — *"F.W4's per-component D/L/C audit must count native element loops or it
  will inherit exactly this blind spot"* — should read **"must count native element loops *and declare a
  scope law for imperative canvas repetition*"**, and it connects directly to **X-9** (`:160`, "the formation
  must pick and publish one scope law before any per-component census claims a percentage").

**No contradictions.** Nothing I measured disagrees with the census or the adjudicated intake. The two
extensions above add axes; they do not overturn rows.

---

## §7 — Hypotheses the tree falsified (I was wrong six times)

| # | hypothesis | why I dropped it |
|---|---|---|
| **F-1** | `z-[var(--z-controls)]` (`:187`) references an undefined token — `grep -rn -- "--z-controls:" web/src` → **empty** — so the tooltip has no stacking priority. | Defined by the dependency: `glass-ui/dist/styles/tokens/scheme-motion.css:336` `--z-controls: 20`, reaching the app through `src/style.css:3` `@import "@mkbabb/glass-ui/styles"`. Token resolves. (The z-index is still inert — but for the *clipping* reason in L-M2, not this one.) |
| **F-2** | `text-admin-label` (`:200`) and `fira-code` (`:202`) are undefined utilities. | Both are glass-ui `@utility` definitions: `typography/semantic.css:213` and `typography/utilities.css:69`, with the `--text-admin-label` bridge at `theme/bridges.css:16`. Valid. |
| **F-3** | The `maxAmplitude = components[0].amplitude` assumption (`:38`) is a **live** bug — the array is not sorted. | `src/fourier_analysis/epicycles.py:54` `sorted(components, key=lambda c: c.amplitude, reverse=True)`, preserved verbatim through `api/services/computation.py:113`, never re-sorted client-side. The live path is safe; the claim survives only as the **undeclared-precondition** form (L-m4), downgraded to MINOR. |
| **F-4** | The dead `onUnmounted` import (`:2`) breaks the typecheck, since `build` runs `vue-tsc -b`. | `web/tsconfig.json` sets no `noUnusedLocals`/`noUnusedParameters`; there is no ESLint config in `web/` and no lint script. Nothing fails. Demoted to INFO (L-i1). |
| **F-5** | The component is missing a `ResizeObserver` that its siblings have (`ConvergencePlot.vue:325`, `useCanvasSetup.ts:40`), so it will not repaint on container resize. | `canvasWidth` (`:31-34`) is derived from `displayComponents.length`, not from layout, and the canvas is the sole in-flow child of an `overflow-x: auto` scroller — container resize genuinely cannot change the required bitmap. The absence is **correct**. L-M5 was narrowed to the two triggers container-independence does *not* excuse: font load and DPR change. |
| **F-6** | `tooltipPos.x` (`:138`) double-counts the scroll offset — it adds `scrollLeft` to a delta already measured against a scrolled element. | It does not. `rect` at `:137` is the **scroller's** rect, so `clientX - rect.left` is a viewport-relative delta; the tooltip's containing block is the scroller (`.scrollbar-thin{position:relative}`, `:238`), and per CSS Overflow 3 §3 an abspos child of a scroll container is positioned from the **unscrolled** padding-box origin and scrolls with the content. `+ scrollLeft` is the correct conversion. The arithmetic is right; only the *choice of anchor* is wrong (L-m5). |

---

## §8 — Ranked repair order (evidence only; no product edit made or proposed as applied)

1. **L-B1** — delete `FrequencyGraph.vue:42-45`; import `spectrumColor` from `./lib/harmonics`; reconcile the
   two hue laws (`t` vs `t^0.6`) and the denominators (`nVis` vs `min(len, maxBars)`) to one export. Also
   deletes `CoefficientsSpectrum.vue:47-50`. Add the four-line agreement test L-i6 says does not exist.
2. **L-M2 + L-M7** — move the tooltip out of the scroller (the `.freq-graph-host` containing block is already
   there, `:216-218`) or drive glass-ui's `TooltipContent` from `hoveredBar`. Dissolves all three clips.
3. **L-M1** — clamp or reset `hoveredBar` in the `:157` watcher; guard `onClick`.
4. **L-M3** — wire `toggle-harmonic`/`hover-harmonic`/`activeIndices`/`logScale` at
   `CoefficientsPanel.vue:17-22`, or remove them **and** `cursor-pointer` (`:179`) together. Do not leave the
   affordance without the effect.
5. **L-M4 + L-M6** — size the scroller to `HEIGHT + scrollbar`, and measure/elide the index labels.
6. **L-M5, L-m1..L-m9** — the mechanical tail (font-ready repaint; drop `deep`; hoist the loop invariants;
   `max || 1`; bar-centre anchor; Y in the hit test; one truncation constant).
7. **L-m10** — carry to F.W4 as a scope-law question, not a code repair.
