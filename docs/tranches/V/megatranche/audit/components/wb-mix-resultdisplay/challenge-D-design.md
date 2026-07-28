# CHALLENGE-D — `demo/workbenches/mix/MixResultDisplay.vue` — the design is wrong (run 3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
spawned with. The declaration is explicit, not inherited.

---

## 0. Verdict

**DEFECTIVE.** Two prior runs of this seat are preserved verbatim at `challenge-D-design.r1-prior.md`
(D-1…D-17) and `challenge-D-design.r2-prior.md` (D-18…D-24 plus corrections C-1/C-2 and promotions
P-1/P-2). This run took a deliberately different method — **it drove the component the way a user
does**, end to end in a real browser, instead of injecting state through
`__vueParentComponent.setupState` — and that single methodological change surfaced a defect neither
prior run could see.

**Strongest defect (this run): D-25 — the result is delivered off-screen. On iPhone 14, at the moment
the convergence completes, `0.00 px` of the 215.81 px result plate is inside the scroll viewport. On
desktop the plate's bottom 28.5 px is clipped, which by its own box model is the action row: Copy,
Save and Reset are sliced in half.** The user issues the pane's one verb, watches a 1.2 s narration,
and the viewport does not change.

This run also **corrects run 2 on a load-bearing premise**: run 2 concluded the component is
"unreachable in the shipped product and none of its design can be validated in-app," and moved to
state injection on that basis. That is true of the *colors* branch only. **The palettes branch is
fully live**, and every measurement in this document was taken through it — real clicks, real
animation clock, real scroll container. State injection is precisely what hides D-25, D-26 and D-27,
because an injected result never travels through the flow that fails.

Net: 3 new findings (one BLOCKER), 1 correction to run 2, 3 promotions from argued-to-measured, and
independent WebKit+Chromium corroboration of run 2's D-18, D-20 and run 1's D-1/D-5/D-11.

---

## 1. Method, and why it matters

| | run 1 | run 2 | **run 3 (this document)** |
|---|---|---|---|
| Engine | Chromium | WebKit | **WebKit + Chromium** |
| How state was reached | reasoned / injected | `setupState` injection via DevTools | **driven**: seed `localStorage` → Palettes tab → select 2 palettes → click Mix |
| Capture | element captures | element captures ×60 | **full-page captures at the settle frame, before any scroll assist** |
| Arms | 2 | 7 | 9 (desktop L/D, mobile L/D, RTL, reduced-motion, clipboard-denied, one-color-result, forced-colors/Chromium) + 1 NOT COVERED |
| Clipboard failure | read from `.d.ts` | read from `.d.ts` | **reproduced** with a rejecting `navigator.clipboard` |
| Forced colors | — | argued from the roster's construction (WebKit could not substitute) | **rendered** in Chromium `forcedColors: "active"` |
| Convergence anchor | inferred from the producer's attr handling | inferred | **`document.querySelector("[data-mix-target]") === null` measured mid-mix** |

Harness (read-only, re-runnable, in-repo):
`docs/tranches/V/megatranche/audit/components/wb-mix-resultdisplay/probe.mjs`
→ `probe-results-webkit.json`, `probe-results-chromium.json`, `shots/` (36 frames).

```
node docs/tranches/V/megatranche/audit/components/wb-mix-resultdisplay/probe.mjs
ENGINE=chromium ONLY=forced-colors node docs/…/probe.mjs
```

**No source file was modified by this seat.** All writes are confined to this component's audit
directory.

---

## 2. Correction to run 2

### C-3 · load-bearing · The component **is** reachable in the shipped product

Run 2 §9.0: *"Until then this component is unreachable in the shipped product and none of its design
can be validated in-app."*

Half right, and the wrong half is load-bearing.

**Colors mode is dead** — confirmed. Both add paths (`MixSourceSelector.vue:164-176` add-slot and
`:211-221` per-palette swatches) are `WatercolorDot tag="button"`, and glass-ui `7.0.0`'s
`WatercolorDot` has no `tag` prop and is `inheritAttrs: false`. Measured on `/#/mix`:

```
add-color buttons: 0
```

— and a full enumeration of the 31 visible buttons on the route contains no add affordance. With
zero operands `canMix` is false, so colors-mode `startMix` can never fire.

**Palettes mode is live.** `MixSourceSelector.vue:246-268` renders a native
`<button type="button" aria-pressed>` per palette — untouched by the P051 cut. Measured:

```
select-palette buttons: 3
Mix buttons: [{d:false,w:88},{d:false,w:0},{d:true→false,w:462}]
plate@180ms : { cls: "mix-plate … mix-plate--ghost vj-morph-enter-active vj-morph-enter-to", op: "0.55" }
plate@6s    : { cls: "mix-plate … bg-well", op: "1", text: "RESULT" }
```

Two saved palettes are all it takes, and `MixPane.onSave` (`MixPane.vue:38-47`) mints saved palettes
from this very component — so an ordinary user reaches the palette branch on their second visit.

**Why the correction matters.** Run 2's injection recipe writes `mixResult` and `animationPhase`
directly. That skips `startMix`, skips the canvas clock, skips the `vj-morph` mount inside
`MixPane`'s own `<Transition>`, and — decisively — skips the fact that the plate is **appended to
the bottom of an inner scroll container**. An injected plate is measured wherever the inspector puts
it. A driven plate lands where the layout puts it, which is off the fold. D-25, D-26 and D-27 below
are all invisible to injection.

---

## 3. New findings

### D-25 · **BLOCKER** · The result is delivered off-screen; on mobile, entirely

`MixPane.vue:62` houses the pane body in a `Card … overflow-y-auto … h-full`. The result plate is
the last child of the column inside it. `settleMix()` (`useMixingState.ts:104-106`) flips a phase and
returns — nothing reveals the plate, moves focus, or announces it.

Measured at the settle frame, **before any scroll assist**
(`probe-results-webkit.json → settledAsDelivered.scroller`):

| arm | plate height | visible px | fully visible |
|---|---:|---:|---|
| desktop-light 1440×900 | 218.69 | **190.22** | **false** |
| desktop-dark 1440×900 | 218.69 | **190.22** | **false** |
| mobile-light iPhone 14 | 215.81 | **0.00** | **false** |
| mobile-dark iPhone 14 | 215.81 | **0.00** | **false** |
| rtl 1440×900 | 218.69 | 190.22 | false |
| reduced-motion 1440×900 | 218.69 | 190.22 | false |
| forced-colors (Chromium) 1440×900 | 218.70 | — | scroller clipped identically |

Desktop arithmetic: plate `top 686.78`, `height 218.69` → `bottom 905.47`; scroller `bottom 877`
→ **28.47 px clipped**. The plate's own box model is
`16 pad + 20 label + 12 gap + 88 swatches + 12 gap + 16 strip + 12 gap + 28 actions + 16 pad = 220`,
so the clipped band lands squarely on the action row: the row spans `862.78 → 890.78` and the fold
is at `877`. **14.2 px of a 28 px control row is below the fold.**

`shots/desktop-light-settled-as-delivered.png` shows exactly that — three half-glyphs at the pane's
bottom edge. `shots/mobile-light-settled-as-delivered.png` shows no plate at all;
`shots/mobile-light-settled.png` is the same moment after a manual `scrollIntoView`, for comparison.

The scroller *is* scrollable (`scrollHeight 817` vs `clientHeight 772`), so the content exists — it
is simply never revealed. This is not an overflow bug; it is a **missing reveal contract**.

**Canon.** `VISUAL-CONSTITUTION.md §5.1`, row 7 — *"successful command that deliberately navigates to
a new resource → focus: new resource H1 · scroll: top · announcement: focused resource identity
followed by one durable operation result; transient celebration is silent."* The mix is exactly that
command shape: a deliberate verb producing a new artifact. The plate satisfies none of the three
columns. `§6` — *"A scene swap preserves the specimen and changes the surrounding instrument"* —
presumes the swapped-in scene is *seen*.

**Reproduction.** `node docs/…/probe.mjs`; read `settledAsDelivered.scroller.plateVisiblePx`.

**Cure.** The settle edge must reveal, not merely un-ghost. The plate owns a completion contract:
`scrollIntoView({ block: "nearest" })` on the transition's `@after-enter`, plus the one polite status
run 1's D-2 and run 2's §9.2 already require. This is a *behavioural* addition, not a layout patch —
lengthening the pane or shrinking the plate would only move the fold.

---

### D-26 · MAJOR · The convergence anchor does not exist; the narration lands on a hard-coded guess

`MixResultDisplay.vue:13-16` states the contract verbatim: *"a seeded WatercolorDot GHOST
(`[data-mix-target]`, the anchor the canvas convergence lands on)"*, and l.69 plants the attribute.

Measured **during the ghost phase of a live mix**:

```
### GHOST target present: { target: false, targetTag: undefined, targetRect: null }
```

The rendered node is `<span aria-hidden="true" class="shrink-0 w-10 h-10 watercolor-swatch"
data-testid="watercolor-swatch" data-variant="ghost" style="…">` — no `data-mix-target`.

**Mechanism** (`dist/watercolor-dot.js`, glass-ui 7.0.0): `inheritAttrs: !1`, and the setup forwards
**only** `attrs.class` and `attrs.style` (`let n = h(), c = i(() => n.class), f = i(() => n.style)`).
Every other consumer attribute is discarded — `data-mix-target`, `tag="div"`, `:title`.

**Consequence.** `mixStage.ts:121-123`:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl ? layoutCenter(targetEl, root)
                        : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

The convergence therefore aims at 70 % of the Card's scroll height — a hard-coded guess.
`shots/desktop-light-ghost.png` shows it: the pigment drops are strewn across the **source cards** at
y ≈ 490-660 while the dashed ghost well sits alone at y ≈ 1093. Combined with D-25, the narration
travels to a point that is not the plate, and then the plate it never reached is off-screen.

Run 1's D-1 identified the fallthrough mechanism and run 2 §9.0 named the anchor in its cure; neither
measured the anchor's absence in flight or the resulting misaim. This promotes the finding from a
source inference to a rendered fact, and escalates it: the docblock's central claim is false in the
shipped build.

**Cure.** The anchor is the *plate's* geometry, not the face's. P051 (`VISUAL-CONSTITUTION §4.2`,
`OPTICAL-BENCH-COMPOSITIONS §5.3`) already rules that WatercolorDot owns "only its noninteractive
organic face" and that named/operable sites use an enclosing geometric seat. One plate-owned element
carries `data-mix-target` and the well geometry, with the face inside it — which also removes the
attribute-forwarding dependency permanently. `collectStage` should then return `null` loudly rather
than guessing (owner edict 2: no masking fallback).

---

### D-27 · MAJOR · In forced colors the plate has no boundary at all

Chromium, `forcedColors: "active"` (`probe-results-chromium.json → settled.plate`):

```
bg        : "rgb(255, 255, 255)"     ← forced to Canvas, identical to the pane behind it
border    : "0px solid"
boxShadow : "none"
radius    : "12px"
```

`MixResultDisplay.vue:55` gives the plate `bg-well` and nothing else — no edge, no elevation. Under
WHCM the background is substituted to Canvas, and with zero border and zero shadow **the container
ceases to exist**: `shots/forced-colors-settled.png` shows the label, the dots and the action glyphs
floating directly on the pane. The palette source cards above keep their Card edge; the sibling
`.dashed-well` (`demo/styles/utils.css:90-107`) would keep its `1.5px dashed var(--card-edge)`. The
result plate keeps nothing.

This is the rendered half of run 2's D-20 that WebKit could not supply, and it extends it: run 2
found the *strip* missing from `foundation.css`'s colour-surface roster; the *plate* is missing a
boundary of any kind, which is a different and more serious loss because the plate is the region
boundary.

Same capture also **confirms run 2's D-20 by render**: the 430×16 gradient strip is not painted at
all in forced colors, and nothing is lost — which is itself the proof that it carries no information
the swatch row does not (run 1 D-7, run 2 D-19/D-20).

**Cure.** One token-anchored in-plate-fixture recipe shared with `.dashed-well` — the solid sibling
of the dashed well — carrying `--radius-card`, `--card-edge` and `--shadow-cartoon-sm`. A real border
survives WHCM; a background alone does not.

---

## 4. Promotions — three prior findings, now measured

### P-3 · copy failure is silent — reproduced

Run 1 D-9 and run 2 read the four-state union out of `useClipboard.d.ts:3` and observed that
`MixResultDisplay.vue:32` maps only `success`. Reproduced with a rejecting clipboard
(`clipboard-denied` arm, `navigator.clipboard.writeText` → rejected promise):

```
copy: { title: "Copy color", innerHtml: "<svg … lucide-copy …>", ariaPressed: null, plateHasLive: false }
```

Byte-identical to idle — same title, same glyph. Compare the success arm on the same harness:
`{ title: "Copied!", innerHtml: "<svg … lucide-check …>" }`. The user is told a copy succeeded by
being told nothing. `pending` is equally unmapped, so a slow write shows no in-flight state and the
button stays activatable.

`VISUAL-CONSTITUTION §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only."* Here failure is not even colour — it is absence.

*Reproduction:* `ONLY=clipboard-denied node docs/…/probe.mjs`.

### P-4 · the one-colour result — an *ordinary reachable* arm, not an injected one

Run 2's P-1 injected `{ type: "palette", colors: [] }` and found a 16 px blank band. The adjacent
arm reachable **without injection** is worse-looking and more likely: `MixPane.onSave`
(`MixPane.vue:41-43`) mints a one-colour `"Mixed Color"` palette; two of those mix to a one-colour
result. Seeded and driven:

```
dots  : 1
strip : background: linear-gradient(to right, oklab(0.72 0 0))    ← a single stop
plate : 170.69 px
```

`shots/one-color-palette-settled.png`: an orange palette mixed with a blue one yields a **grey dot
above a 430×16 flat grey bar**. The "gradient preview" is a solid slab restating the single specimen
12 px above it — 6 880 px² of paint against the specimen's 1 600 px², carrying nothing. And with no
provenance line (run 2 D-21) the user cannot tell the achromatic OKLab midpoint from a bug.

### P-5 · the dock seats, measured against the real dock on the same page

Run 1 D-5 / run 2 corroborated 28×28 in every context. This run measured the **comparison**:

| control | iPhone 14 (`pointer: coarse` = true) | desktop 1440 |
|---|---:|---:|
| plate Copy / Save / Reset | **28 × 28**; `--dock-control-size: (unset)`; `min-width: 0px`; `min-height: auto` | 28 × 28; `(unset)` |
| the real dock's control, same page | **46.8 × 46.8**; `--dock-control-size: max(calc(2.5rem × 1.17), 2.75rem)` | 40 × 40; `max(calc(2.5rem × 1), 0px)` |

The producer contract (`DockControl.vue.d.ts` header) is explicit: *"the HIT CELL stays the full
`--dock-control-size` (≥44px on coarse via the density clamp) — hit box ≠ paint box."* Outside
`.glass-dock` the variable is unset and the clamp cannot apply. glass-ui 7 even ships a guard for
this exact misuse —

```css
.dock-icon-button--compact):not(:where(.glass-dock *)) {
  min-block-size: var(--dock-touch-target, 2.75rem);
  min-inline-size: var(--dock-touch-target, 2.75rem);
}
```

— and it is **not firing**: measured computed `min-width: 0px`, `min-height: auto`, even though
`--dock-touch-target` resolves to `2.75rem` on the element. The floor is lost in fact, not just in
theory. `PROPORTION-AUDIT §5.7` / PR-12 unsatisfied.

Same mechanism, `DockSeparator`: `.dock-separator { width: 1px; height: var(--dock-separator-height) }`
where `--dock-separator-height: calc(var(--dock-h, var(--size-icon-btn)) * 0.5)` is declared **on
`.glass-dock`**. Unset outside it → the `height` declaration is invalid at computed-value time →
`auto` → **`0px`** on an empty block. Measured, both viewports:
`{ w: 1, h: 0, cssH: "0px", margin: "0px 6px", sepH: "(unset)", role: "separator",
data-orientation: "horizontal", aria-orientation: "vertical" }`. All that survives is the 12 px
margin, which is the unexplained gap between Save and Reset in `shots/desktop-dark-settled.png`.

---

## 5. Corroborations — prior findings re-measured in this run

| Prior | This run's independent measurement | Status |
|---|---|---|
| **run 2 D-18** — the scoped `transition` shorthand defeats `vj-morph` | Measured on the plate in **all 9 arms**, including while it carries `vj-morph-enter-active vj-morph-enter-to`: `transitionProperty: "opacity"`, `transitionDuration: "0.2s"`. Ghost `102.69 px` → settled `218.69 px` = **+116.00 px in one frame**. Single-colour arm: `102.69 → 170.69` = +68.00. | **CONFIRMED** in a second driven flow |
| **run 2 D-20** — the strip is outside the colour-surface roster | Chromium WHCM render: the strip is **not painted**; the plate's dots are (they carry `.watercolor-swatch`) | **PROMOTED** from construction-argument to render |
| **run 1 D-2 / run 2** — the palette result carries no readable truth | `plate.innerText === "RESULT"` in all 9 arms; 12 dots with `title: null` (consumer `:title` dropped) and producer-hardcoded `aria-hidden="true"` + `pointer-events: none`; `plateHasLive: false`; `value: null` | **CONFIRMED** |
| **run 1 D-6 / run 2** — three label species in one pane | `RESULT` Fraunces / **italic** / 700 / 14.384 px / ls 0.3596 px (= 0.025 em) vs `.section-label` Fira Code / normal / 400 / 14.384 px / ls 1.4384 px (= 0.1 em), 4 px apart. Adds: `text-caption` itself sets `font-style: italic` and `font-weight: 400`, so the four-utility stack fights its own base; and `--type-tracking-caps` is **0.1 em**, making the uppercase label's tracking **4× too tight** | **CONFIRMED + widened** |
| **run 1 D-11 / run 2** — a `role="separator"` painting nothing | `1 × 0 px`, contradictory orientations, in every arm — with the `--dock-separator-height` scope mechanism now named (P-5) | **CONFIRMED + mechanism** |
| **run 2 C-2** — ghost contrast | Independent compositing arithmetic from the measured label `rgb(112,89,66)` and ground `oklab(0.913299 0.005463 0.013024)` = `rgb(233,225,217)`: settled **5.08 : 1**; ghost at `opacity .55` **2.13 – 2.57 : 1** across plausible backdrops. Agrees with run 2's pixel-sampled ≤ 2.61 : 1 upper bound; **run 2's measured number remains the number of record** | **CONFIRMED** |
| **run 2 D-23** — off the radius token | plate `12px` vs `--radius-card: 1rem` (16 px), no border, no shadow | **CONFIRMED** |
| **run 2 D-21** — zero provenance | `plate.innerText === "RESULT"`; props are `{ result, ghost }` only; `MixPane.vue:113-118` passes neither `colorSpace` nor `hueMethod` | **CONFIRMED** |
| **run 1 D-16** — the visual matrix cannot see this component | `audit/visual/REPORT.md` rows 123/138/153/168 capture `/#/mix` with `mixResult === null`; the component appears in **0 of 60** pre-existing captures | **CONFIRMED** |
| reduced motion | `ghost.plate.h === settled.plate.h === 218.69` at t = 170 ms — the machine settles immediately, no PRM-stranded state | **PASS** |
| horizontal overflow | `docOverflowX === 0` in all 8 reachable arms, including RTL and both mobile schemes | **PASS** |

---

## 6. Coverage honesty

- **200 % zoom: NOT COVERED.** At the 720×450@2× arm the palette rack did not render
  (`nPal: 0`), so the component could not be reached and no frame exists. Run 2 reports a PASS from
  an injected plate; that result is about the plate's own rem-scaling, not about the driven flow,
  and this run neither confirms nor contradicts it. It should be re-driven at a real 400 % in-app
  browser zoom per `PROPORTION-AUDIT §2`, which is the canon's arm anyway.
- **Keyboard focus: UNPROVEN.** WebKit did not reach the plate in 45 Tab stops
  (`focus.inPlate: false`, landing on a 105×32 dock button). macOS ships Full Keyboard Access off by
  default and `audit/visual/states.mjs:8-9` names this exact trap. No focus claim — positive or
  negative — may be made from this run; it must be re-driven under Chromium.
- **The colors branch** (`MixResultDisplay.vue:78-88`) could not be rendered (C-3), so run 1's D-17
  RTL-isolation and `break-all` findings and run 2's D-22 value-formatting findings remain as
  written by those runs; this run adds no new evidence there.

---

## 7. Where run 3 lands the seat law

Additions to run 2 §7's scorecard, from this run's evidence only:

| Law | Verdict from run 3 |
|---|---|
| `VISUAL-CONSTITUTION §5.1` row 7 — a completed deliberate command reveals, focuses and announces its new resource | **FAIL** — none of the three; mobile visibility `0.00 px` (D-25) |
| `§3.1` Mix — *"its own `InstrumentChassis` composition"*, result region at 38.1966011 % | **FAIL** — the result is not a region of a chassis, it is a `div` appended to a scroller with no reveal or boundary contract (D-25, D-27) |
| `§4.1` — *"Text, focus, boundaries and state meet their rendered contrast on the actual material tier; a token name is not evidence"* | **FAIL** — under WHCM the plate's boundary is not merely low-contrast, it is absent (D-27) |
| `§4.1` — failed/pending states are explicit | **FAIL** — reproduced silent copy failure (P-3) |
| `PROPORTION-AUDIT` PR-12 — seat geometry preserves the target floor | **FAIL** — 28 × 28 against the same page's 46.8 × 46.8 dock seat, producer guard not firing (P-5) |
| `PROPORTION-AUDIT §5.5` — a mark is data, status, labelled action, drag affordance, focus register, **or removed** | **FAIL** — the strip is invisible in WHCM and a flat grey slab at N = 1, and nothing is lost either way (P-4, D-27) |
| Owner edict 2 — no masking fallback | **FAIL** — `mixStage.ts:122-123` silently substitutes a geometric guess for the anchor it cannot find (D-26) |

---

## 8. What is sound — the negative proof

Re-verified hostilely in this run, through the driven flow rather than by inspection:

- **Reduced motion is genuinely clean.** At t = 170 ms under `reducedMotion: "reduce"` the plate is
  already at its settled height (`218.69`), i.e. the completion event fires immediately and the phase
  machine is never stranded mid-mix — exactly what `useMixingAnimation.ts:70-76` documents. Measured,
  not assumed.
- **Nothing bleeds.** `docOverflowX === 0` on all 8 reachable arms including RTL and both mobile
  schemes, at plate widths 462 (desktop) and 324 (mobile).
- **The one-clock law holds.** The component owns no timer; its only timing is `useClipboard`'s
  producer-owned `resetMs: 1500`.
- **Motion family naming is disciplined.** `vj-morph` for the in-place swap, `vj-enter` for the
  arriving swatches, and `.swatch-row` (`demo/styles/utils.css:167-179`) is correctly *consumed* —
  the utility names this component as one of its three sanctioned consumers rather than being
  re-minted locally. The names are right; only run 2's D-18 scoped override defeats them.
- **Vue 3.5 idiom and `verbatimModuleSyntax` are clean.** Reactive props destructure with a default
  (l.20-23); `computed` over destructured props stays reactive; no `defineModel` round-trip and so no
  stale-read hazard; `import type { MixResult }` (l.7) is the only type import and is marked.
- **The AT hygiene that exists is correct.** The gradient strip is double-hidden
  (`aria-hidden` + `role="presentation"`), and `aria-pressed` is correctly **absent** on three
  controls that are commands rather than toggles (`ariaPressed: null` measured ×3).
- **The seed-continuity idea remains good design.** A ghost silhouette the arriving specimen fills is
  specific and right for this product. D-26's cure keeps the idea and makes it true for the first
  time.

---

## 9. The gestalt cure — run 3's addition to run 2's three transpositions

Run 2's three moves stand. This run adds a fourth, and it is the one that must land first because
without it the other three are unobservable to the user:

**4 · The plate owns a completion contract, not just a phase.** The mix is a deliberate command that
produces a new artifact, so `VISUAL-CONSTITUTION §5.1` row 7 governs the seam, not §6's scene-swap
row. On settle the plate reveals itself (`scrollIntoView({ block: "nearest" })` from the transition's
completion hook), announces itself once through a polite status that names the artifact
(`"12-colour result · OKLab · shorter"` — the same provenance line run 2's D-21 requires, doing
double duty), and only then un-ghosts. That single contract closes D-25, supplies the announcement
half of run 1's D-2, and gives run 2's D-21 provenance line a second job so it earns its row.

It also constrains the D-26 cure: the plate-owned `[data-mix-target]` seat must be measured **after**
the reveal, or the convergence will aim correctly at an element that is still below the fold.

---

## 10. Artifacts

- Run 1, preserved verbatim: `challenge-D-design.r1-prior.md`
- Run 2, preserved verbatim: `challenge-D-design.r2-prior.md`
- Run 3 harness (in-repo, re-runnable): `probe.mjs`
- Run 3 raw measurements: `probe-results-webkit.json` (9 arms), `probe-results-chromium.json`
- Run 3 frames (36): `shots/` — notably
  `desktop-light-settled-as-delivered.png` (action row sliced),
  `mobile-light-settled-as-delivered.png` (no plate at all) vs `mobile-light-settled.png`,
  `desktop-light-ghost.png` (drops converging on the fallback point),
  `one-color-palette-settled.png` (flat grey "gradient"),
  `forced-colors-settled.png` (no plate boundary, no strip).
- Run 1 element captures: `frames/plate-settled-palette-{light,dark}.png`

**No source file was modified by this seat.**
