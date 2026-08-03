# CHALLENGE-D — `demo/workbenches/mix/MixResultDisplay.vue` — the design is wrong (run 5)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M context), the tier this
seat was spawned with. The declaration is explicit, not inherited.

---

## 0. Verdict

**DEFECTIVE** — concurring with runs 1–4, preserved verbatim at `challenge-D-design.r1-prior.md`
(D-1…D-17), `.r2-prior.md` (D-18…D-24, C-1/C-2, P-1/P-2), `.r3-prior.md` (D-25…D-27, C-3, P-3/P-5)
and `.r4-prior.md` (D-28…D-30, C-4).

I probed cold — live app, fresh WebKit and Chromium sessions, six matrices — before reading any
prior, then reconciled. Fourteen prior measurements reproduce. This run's contribution is **fourteen
new findings, D-31…D-44**, of which three are structurally important:

* **Strongest defect this run: D-31 (BLOCKER).** Run 3's D-26 established that `[data-mix-target]`
  is absent from the DOM. It did not follow the wire. The **consumer**
  (`MixAnimationCanvas/composables/mixStage.ts:121-124`) carries a **silent masking fallback** —
  `{ x: root.clientWidth/2, y: root.scrollHeight*0.7 }` — so the convergence *always* lands on an
  arbitrary geometric point and *always* looks like it is working. Measured error in the colors arm:
  **78 px**. Rendered proof in the palettes arm: the drops rain over the *operand cards*, ≈280 CSS px
  above the well they were announced to land in (`frames/F1`). This is why the defect survived three
  audits: it is designed to be invisible. Owner edict 2 (no masking fallbacks) applies to the
  fallback, not merely to the missing attribute.
* **Two corrections to run 4's negative proof (§7).** Run 4 certifies (§7.4) that `.swatch-row`'s
  shared motion recipe is *"consumed"* by this component, and (§7.5) that *"reduced motion is
  genuinely clean"*. Both are refuted by measurement here: **D-32** — the `<TransitionGroup
  name="vj-enter">` never fires a single class in any frame (no `appear`, index keys); **D-33** —
  under `prefers-reduced-motion: reduce` the plate's `transition-duration` computes **`0.1s`**, not
  the global guard's `0.01ms`, and the ghost renders for **zero frames**, so the component's central
  design has no reduced-motion arm at all.
* **One standing UNPROVEN closed.** Run 4 §6: *"Keyboard focus. Not probed; run 3's UNPROVEN
  stands."* Probed. **D-34**: activating `Reset` unmounts the focused button and
  `document.activeElement` becomes `<body>`.

Raw measurements and frames: `./frames/F1`…`F10`, `./frames/measurements-*.json`.
Probe scripts (session scratchpad, read-only, re-runnable): `wbmix/probe{2,3,4,5,6}.mjs`,
`wbmix/contrast2.py`, `wbmix/welldelta.py`.

**No source file was modified by this seat.**

---

## 1. Method

Playwright against `http://localhost:9000/#/mix`. **WebKit** (the audit-matrix engine) for the visual
and geometric arms; **Chromium** for forced-colors, whose WebKit emulation does not engage (run 4 §6
records the same and I confirm it: my WebKit `forcedColors: "active"` arm returned unchanged computed
colors, my Chromium arm returned `matchMedia("(forced-colors: active)").matches === true`).

Component states were reached two ways, deliberately:

* **Through the product** for the colors arm — `addColor()` on the live `MixPane` setup state, then
  the real `startMix()` → the real `MixAnimationCanvas` rAF clock → the real `settleMix()`. This is
  what makes D-31 and D-40 possible: the anchor and the swap timeline only exist on the real clock.
* **By injecting `mixResult`** for the union's unreachable arms (empty palette, 1 colour, 24, 50).
  No delivery claim is made from injected frames — run 3's D-25 criticism is accepted in full.

Six matrices: 1440 light · 1440 dark · 390 · 320 + `hasTouch` · RTL · forced-colors · reduced-motion.

**A note the visual-audit corpus needs.** This component appears in **zero** captures under
`audit/visual/shots/**`. It mounts only when `mixResult !== null`, and no capture performs a mix. The
`/#/mix` rows in `audit/visual/REPORT.md:123,138,153,168` measure a route on which this component is
absent — including their `smallTapTargets: 8` counts, which do **not** include this component's three
28 px seats.

---

## 2. Replication — fourteen prior measurements independently reproduced

Measured cold, before reading the priors.

| Prior | Run 5 measurement | File |
|---|---|---|
| r3 **D-26** — anchor absent | `[data-mix-target].length === 0` in ghost **and** settled, all 4 matrices | `measurements-desktop-light.json`, `-dark`, `-mobile-light` |
| r1 **D-2** — palette result unreadable | `plate.innerText === "RESULT"`; all faces `aria-hidden`, `title: null`, `pointer-events: none` | `measurements-focus-keyboard.json`, `measurements-desktop-light.json → palAria` |
| r1 **D-5** — seat geometry | `28 × 28` × 3 at 1440 light, 1440 dark, 390, and 320 + `hasTouch`; `aria-label: null` ×3 | all `measurements-*.json → *.btns` |
| r1 **D-11** — separator paints nothing | `{w:1, h:0, role:"separator", data-orientation:"horizontal", aria-orientation:"vertical"}` ×4 matrices | `*.seps[0]` |
| r1 **D-6** — label species | Fraunces / 14.384 px / 700 / uppercase / ls 0.3596 px (12.179 px at 390) | `*.label` |
| r2 **D-18** — height snap | ghost `118.7` → color `158.7` (**+40.0**); palette ghost `102.7` → `170.7` (**+68.0**, +66 %) | `measurements-desktop-light.json` |
| r2 **D-22** — value formatting | `oklab(73% 0.013018351724 0.016817844922)` — 12 fractional digits, `word-break: break-all`, 2 lines at 1440 and 390, **4 lines** at 320 | `*.code`, `measurements-edge-states.json → longString320` |
| r1 **D-17** — no bidi isolation | `unicode-bidi: normal`, `direction: rtl`, `text-align: start`, no `dir="ltr"` | `measurements-states.json → rtl` |
| r2 **P-1** — `colors: []` | plate `131`, `rowKids 0`, `rowH 0`, strip `430 × 16` with `background-image: none` | `measurements-edge-states.json → empty-palette` |
| r2 **D-23** — off the radius token | plate `border-radius: 12px`, `box-shadow: none`, no border | `*.radius` |
| r4 **§5** — ghost contrast fails AA | **light 2.43 : 1**, **dark 2.70 : 1**; resting 5.03 / 5.97 | `wbmix/contrast2.py` output |
| r3 **D-27** — no boundary under WHCM | Chromium forced-colors: plate `background-color: rgb(255,255,255)`, no border | `measurements-forcedcolors-motion.json` |
| r4 **§7.1** — seed continuity | ghost and settled share `seed="mix-result"` and colour ⇒ one silhouette; holds | code + `*.dots[].variant` |
| r4 **§7.2** — nothing bleeds | `documentElement.scrollWidth − clientWidth === 0` at 1440 / 720 / 390 / 320, incl. N=50 and `display-p3` | `measurements-edge-states.json → *.docOverflowX` |

Fourteen for fourteen. **One numeric divergence, declared:** my ghost-contrast numbers (2.43 light /
2.70 dark) are sampled from **painted PNG pixels** (darkest glyph ink vs plate field, `contrast2.py`);
run 4's (2.21 / 2.93) are **analytically composited** from computed styles. Both fail 4.5 : 1 and both
fail 3 : 1; the methods differ in how they treat glyph antialiasing. Neither number changes the finding.

---

## 3. New findings

### D-31 · BLOCKER · The anchor's consumer carries a masking fallback, so a dead contract renders as a working animation. Measured error 78 px; visually ~280 px.

`MixResultDisplay.vue:69` stamps `data-mix-target` on the ghost dot. glass-ui 7.0.0's `WatercolorDot`
forwards no fallthrough attributes — the rendered element's complete attribute list is:

```
["data-v-292b9032","data-v-0f138735","aria-hidden","class","data-testid","data-variant","style"]
```

Run 3 found the count is 0. The finding this run adds is **what the other end does about it**:

```ts
// demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:121-124
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

The `else` arm is **always** taken. Measured divergence, colors arm, 1440 × 900, live clock
(`measurements-states.json → anchor`):

| | x | y |
|---|---|---|
| where the drops actually land (fallback) | 720 | 630 |
| where the announced well is | 798 | 636 |
| **error** | **+78 px** | +6 px |

`targetsInDom: 0` on the same frame. In the palettes arm the pane is taller, so `scrollHeight × 0.7`
lands much higher and the miss becomes obvious to the eye:
**`frames/F1-anchor-drops-miss-the-well.png`** — the pigment drops converge over the *Probe A / Probe B
operand cards* while the ghost well sits alone and unvisited at the bottom of the pane, roughly
**280 CSS px** below the convergence.

Three consequences, in order of weight:

1. **The component's stated design is falsified.** `MixResultDisplay.vue:9-19` says the plate is *"the
   announced destination … the anchor the canvas convergence lands on."* It is not, and has never been.
2. **Owner edict 2 — masking fallbacks.** `mixStage.ts:123` is the textbook case: it converts a broken
   integration into a plausible animation. A missing anchor must fail loudly, not degrade to a magic
   number. This is *why* the defect outlived three audits.
3. **The ghost's whole reason for existing evaporates.** Absent a landing, the dashed silhouette is
   decoration — `PROPORTION-AUDIT §5.5`: *"A small icon/mark is either data, status, labeled action,
   drag affordance, focus/selection register **or removed**."*

**Reproduction.** `/#/mix`, palettes mode, two saved palettes, press Mix, screenshot at t ≈ 300 ms.
Or: `document.querySelectorAll("[data-mix-target]").length` at any moment.

**Cure.** Either give `WatercolorDot` a producer-owned anchor seam (exposed root ref or a sanctioned
`data-*` passthrough) **and delete the fallback so a missing anchor throws**, or delete the ghost and
have the plate reserve its settled geometry. Never both, and never a fallback that hides which one shipped.

---

### D-32 · MAJOR · The `<TransitionGroup name="vj-enter">` is inert. Run 4 §7.4's "the `.swatch-row` recipe is *consumed*" is refuted.

`MixResultDisplay.vue:92-106`. Two independent causes:

1. `<TransitionGroup>` applies **no** enter transition on initial render unless `appear` is set. It is
   not set (`:92-96`). The palette swatches only ever appear on that branch's initial render.
2. `:key="i"` (`:99`) keys by **array index**. A re-mix producing the same colour count patches every
   node in place — no enter, no leave, no move.

Empirical, frame-by-frame rAF sampling across the entire ghost → settled swap
(`measurements-swap-timeline.json`, column `rowKidVj` = each swatch's `vj-*` classes):

```
t=1187  rowKids=3  rowKidVj="||"      ← content mounts; three empty class lists
t=1654  rowKids=3  rowKidVj="||"      ← settled; still empty
```

Not one `vj-enter-*` class in any sampled frame.

The consequence reaches outside the component. `demo/styles/utils.css:167-179` maintains a shared
recipe explicitly documented as serving *"the three swatch TransitionGroups (CurrentPaletteEditor,
MixSourceSelector, **MixResultDisplay**)"*:

```css
.swatch-row { --vj-enter-y: 0px; --vj-enter-scale: 0; }
.swatch-row > .vj-enter-leave-active { position: absolute; }
```

One third of that utility's declared consumers never runs it. Run 4 §7.4 reads the *class name* on
`:95` and certifies consumption; the class is present and the transition is dead.

Owner edict 6 — animations are never deleted, only moved or tokenized. This one was tokenized and then
disconnected, which is the same loss with a paper trail.

---

### D-33 · MAJOR · Reduced motion is not clean. The scoped transition escapes the global guard, and the ghost renders for zero frames.

Run 4 §7.5 certifies *"Reduced motion is genuinely clean … no PRM-stranded ghost."* Measured:

**WebKit, `reducedMotion: "reduce"`** (`measurements-states.json → reducedMotion`):

```json
{ "settleMs": 17, "ghostFrames": 0, "plateTransitionDur": "0.1s" }
```

**Chromium, `reducedMotion: "reduce"`** (`measurements-forcedcolors-motion.json → reducedMotionCss`):

```json
{ "matches": true,
  "plateTransition": "0.1s / opacity, color, background-color, border-color, box-shadow",
  "durationFast": "0.2s" }
```

Two facts, both new:

* **`transition-duration` computes `0.1s`.** The app-wide guard at
  `demo/styles/animations.css:184-192` sets `transition-duration: 0.01ms !important` on `*`. It does
  not reach `.mix-plate`. The plate keeps a 100 ms transition across five animatable properties under
  an explicit reduced-motion request. Attribution is honest: the guard's cascade reach is a global
  stylesheet matter — but the **exposure exists because the component authored its own scoped
  transition** (`:152-154`) instead of consuming a producer/utility register (owner edict 5).
* **`ghostFrames: 0`.** Under reduced motion the animation composable settles immediately, so the
  ghost — the announced destination, this component's entire raison d'être — **never renders at all**.
  That is not an accommodation; it is a second, undrawn design. `VISUAL-CONSTITUTION §6`: *"Reduced
  motion resolves directly to the final geometry and stable chromatic state."* The final geometry is
  reached, but the component has no account of what the mixing state *is* for these users, and D-31's
  cure must answer for both arms.

---

### D-34 · MAJOR · `Reset` destroys focus. (Closes run 4 §6's standing UNPROVEN.)

`measurements-focus-keyboard.json → focusOnReset`, WebKit 1440:

```json
{ "before": { "tag": "BUTTON", "title": "Reset" },
  "after":  { "tag": "BODY" },
  "isBody": true,
  "plateStillThere": false }
```

Activating Reset emits `reset` → `mixResult = null` (`useMixingState.ts:108-111`) → `MixPane.vue:112`'s
`v-if` unmounts the component that owns the focused button. Focus falls to `<body>`; a keyboard user is
returned to the top of the document with no announcement and no way back except re-tabbing the page.

`VISUAL-CONSTITUTION §5.1` binds this: focus after a closing action goes to *"exact connected opener on
close, otherwise the nearest surviving owning action."* The nearest surviving owning action is
`MixConfigBar`'s Mix button. Nothing moves focus to it.

Complete tab inventory of the plate (`tabOrder`), for the record:

```json
{ "count": 3,
  "names": ["Copy color", "Save to palettes", "Reset"],
  "dotsFocusable": 0, "dotsTotal": 3,
  "textNodes": "RESULT" }
```

Three seats, named only by `title`; zero focusable specimens; total text content `"RESULT"`.

---

### D-35 · MAJOR · The clipboard's failure and pending arms are unhandled, and the producer's `CopyResult` is discarded.

The producer contract, `node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts`:

```ts
export type CopyFailureReason = "clipboard-api" | "no-api";
export type ClipboardStatus = "idle" | "pending" | "success" | "failure";
export interface UseClipboardOptions { resetMs?; timeoutMs?; onCopyError?: (r: CopyFailureReason) => void }
export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };
copy: (text: string) => Promise<CopyResult>;
```

The consumer, `MixResultDisplay.vue:31-32,42-47`:

```ts
const { status, copy } = useClipboard({ resetMs: 1500 });
const copied = computed(() => status.value === "success");
…
await copy(text);                    // ← CopyResult discarded
```

`"pending"` and `"failure"` are never read; `onCopyError` and `timeoutMs` are never supplied; the
returned discriminated result is thrown away. A rejected write is **pixel-identical to never having
pressed the button** — the icon stays `Copy`, the `title` stays `"Copy color"`.

Measured happy path for contrast (`measurements-states.json → clipboard`):
`"Copy color"` → `"Copied!"` → `"Copy color"` after 1.5 s. So the component *has* a feedback channel; it
simply routes only one of four states through it.

`VISUAL-CONSTITUTION §4.1`: *"Selected, **failed**, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."*
`PROPORTION-AUDIT PR-08`: *"Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**."*

---

### D-36 · MAJOR · The Mix composition's *provenance* half is absent from the inspector that is named for it.

Three binding statements name it:

* `VISUAL-CONSTITUTION §3.1`, Mix row — support region is the **"result/provenance inspector"**.
* `VISUAL-CONSTITUTION §7 · Mix` — *"Source mode, add/remove/reorder, method, unequal-palette strategy,
  **provenance** and commit share the same control grammar."*
* `OPTICAL-BENCH-COMPOSITIONS.md §3`, Mix row, mobile order — *"source mode/rack; result;
  **method/provenance/commit**."*

The rendered plate contains: the word `RESULT`, one specimen (or a grid), optionally one CSS string,
three icons. It carries **no** operand identity, **no** operand count, **no** colour space, **no** hue
method, **no** leftover strategy. `frames/F3-palette-settled-light.png` is the demonstration: five taupe
blobs whose provenance — *Probe A ⊕ Probe B, OKLab, shorter hue, discard extras* — exists only in
controls 300 px away that the user may change immediately afterwards, at which point the plate becomes
a silent misstatement of itself.

The plate's whole information payload for a palette mix is one word. That is not an inspector.

---

### D-37 · MAJOR · `<DockSeparator>` is a retained dividing line that the binding boundary inventory sets to `none`.

`MixResultDisplay.vue:135`. `OPTICAL-BENCH-COMPOSITIONS.md §5`, the complete binding inventory:

| Composition | P122 boundaries | P122 reserve | **Retained non-P122 dividing line** |
|---|---|---|---|
| Mix | `[]` | `none` | **none** — *"rack, result and action regions remain distinct through geometry"* |

followed immediately by: *"Any additional line, automatic P122 divider, consumer-hidden producer line,
terminal row rule, caster stroke or corner rule **is a defect**."*

Run 1's D-11 found this element paints nothing (`h = 0`, reproduced here in all four matrices). Run 5
adds that **even if it painted, it would be forbidden** — `PROPORTION-AUDIT PR-05` names
`OPTICAL-BENCH §5` as *binding* on exactly this. So the element is triply wrong: canon-forbidden,
invisible (`frames/F2`, `F3`, `F8`, `F9` — a gap between Save and Reset with no rule in it), and
mis-axised (`data-orientation="horizontal"` vs `aria-orientation="vertical"`) while still being
announced to AT as a `separator` in the ARIA snapshot.

Related, same cause: under forced colors the plate computes `background-color: rgb(255,255,255)`
(= Canvas) with no border, so the specimen well **ceases to exist as a surface**
(`frames/F8-forced-colors.png`, corroborating r3 D-27). The plate's only boundary is a background tone,
and its only intra-region grouping is a line that does not paint.

---

### D-38 · MAJOR · Arbitrary N is undesigned: 744 px of plate inside a 720 px viewport, at a colour count the domain explicitly permits.

Injected result arms, measured (`measurements-edge-states.json`):

| N | viewport | plate H | swatch-row H | row share | pane scroll overflow |
|---|---|---|---|---|---|
| 5 | 1440 | 171 | 40 | 23 % | 0 |
| 24 | 1440 | 267 | 136 | 51 % | 0 |
| 50 | 1440 | 411 | 280 | 68 % | 60 |
| **50** | **320** | **744** | **616** | **83 %** | **543** |

`frames/F7-50-colors-at-320.png`: the plate is taller than the viewport, the `RESULT` label is under
the sticky header, and 83 % of the surface is an undifferentiated blob grid. There is **no** count, no
cap, no disclosure, no truncation, no summary.

`PALETTE-CONTRACT §3` fixes palette content at **1–50** `CanonicalNamedColor` atoms, so N = 50 is inside
the domain, not a stress case. `VISUAL-CONSTITUTION §7 · Mix` requires the *rack* to stay legible at
2/3/12; the *result* got no equivalent law and, measurably, no equivalent design. The 16 px gradient
strip — the one compact representation available — stays 16 px while the verbose one grows without bound.
`OM-16-palette-item-arbitrary-n.png` is already an owner-marked family; this is that family, in the
result plate.

---

### D-39 · MINOR · A single-colour palette result builds an invalid one-stop `linear-gradient`.

`MixResultDisplay.vue:111-113`:

```ts
background: `linear-gradient(to right, ${result.colors.map(c => c.css).join(', ')})`
```

With `colors.length === 1` this is `linear-gradient(to right, oklch(0.6 0.2 30))`. CSS Images 3 requires
`<linear-gradient()>` to take a `<color-stop-list>` of **at least two** stops; one stop is invalid.
Measured (`measurements-edge-states.json → one-color-palette`): the strip still occupies `430 × 16`
and depicts nothing informative. Reachable whenever the operands are one-colour palettes — inside the
`1–50` domain, and not covered by r2's P-1 (which measured `colors: []`).

---

### D-40 · MINOR · A frame-accurate timeline of the swap: `mode="out-in"` is a **third** independent cause of the height snap, and it costs a 200 ms hand-off.

Runs 2 and 4 identified two causes of the snap (the `transition` shorthand resetting
`transition-property`; `--vj-morph-collapse/-expanded` never set). Here is the swap itself, sampled every
animation frame on the real clock (`measurements-swap-timeline.json`, palettes arm, WebKit 1440):

```
t=   6  phase=mixing  plateH=100  plateY=727   ghost mounted
t= 950  phase=done    plateH=103  plateY=722   innerCls = vj-morph-leave-from + leave-active
t= 987  phase=done    plateH=103  plateY=722   innerCls = vj-morph-leave-active + leave-to
t=1187  phase=done    plateH=171  plateY=688   innerCls = vj-morph-enter-from + enter-active   rowKids=3
t=1654  phase=done    plateH=171  plateY=688   innerCls = ""                                    settled
```

* `mode="out-in"` (`:60`) means the two states **can never coexist in one frame by construction**.
  The leave costs a full `--duration-fast` = 0.2 s (measured `durationFast: "0.2s"`), so the incoming
  content does not begin until **t = 1187** — a **200 ms hand-off** with nothing arriving.
* At `t = 1187` the plate goes **103 → 171 px (+66 %)** and **y 722 → 688 (−34 px)** in a *single frame*,
  *before* the enter transition starts. The announced destination moves up 34 px and grows by two-thirds
  at the instant the result lands.
* Total mix-start → content-visible ≈ **1.19 s**, for a computation the state machine's own docblock
  calls *"instant"* (`useMixingState.ts:13`).

Therefore run 2's D-18 cure (delete the shorthand) and run 4's D-30 cure (set the morph variables) are
**both** insufficient while `mode="out-in"` stands: the mechanism that would interpolate the height is
denied two simultaneous frames to interpolate between. The acceptance test for that wave must be a
measured multi-frame height ramp on the **real** clock, not the absence of a shorthand.

---

### D-41 · MINOR · `title="Copy color"` is wrong in half the component's state space, and `"Copied!"` is an accessible name.

`MixResultDisplay.vue:123`. In the palettes arm the button copies *N* comma-joined colours (`:45`) while
naming itself "Copy color". Measured accessible name on a five-colour result
(`measurements-desktop-light.json → palAria`): `button "Copy color"`. And the success state replaces the
button's only accessible name with `"Copied!"` — an exclamation mark inside a control name, which AT
reads aloud as the control's identity.

---

### D-42 · MINOR · Three dead `tag="div"` props — legacy of an API glass-ui 7.0.0 has already removed, now provably inert.

`MixResultDisplay.vue:67`, `:81`, `:100`. `WatercolorDot`'s glass-7 prop surface is exactly
`{ color, variant, animate, cycleDuration, range, seed }`
(`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) — no `tag`. Measured `tagAttrCount = 0` in the
rendered DOM in every matrix: the props are neither honoured nor emitted.

The canon anticipated these three exact sites: `VISUAL-CONSTITUTION §4.2` / `OPTICAL-BENCH §5.3` —
*"P051 removes the public `tag="button"`/interactive-host branch in the clean major. W17 owns the live
exhaustive manifest — currently 25 explicit `tag="div|button"` calls — and W19–W22/**W25–W27** execute …
**Mix** … sites."* These are 3 of the 25, un-executed, and now demonstrably inert rather than merely
pending. Owner edict 2 (no legacy code).

---

### D-43 · MINOR · Two copy paths for one artifact, on two different clipboard mechanisms.

`MixResultDisplay.vue:42-47` and `MixPane.vue:49-55` implement the same serialization rule twice:

```ts
// MixResultDisplay.vue:43-45                 // MixPane.vue:51-53
result.type === "color"                        mixResult.value.type === "color"
  ? result.css ?? ""                             ? mixResult.value.css ?? ""
  : result.colors?.map(c => c.css).join(", ") ?? ""
```

The plate uses `useClipboard` (1.5 s confirmation); the pane uses the bare `writeClipboard` primitive
(no confirmation) and exposes it as `copyResult` via `defineExpose` (`MixPane.vue:57`) for the dock. So
the product ships **two Copy affordances for the same artifact with two feedback models and two failure
behaviours**. Owner edict 2 forbids dual paths; edict 1 forbids the duplication.

---

### D-44 · INFO · Dead `TransitionGroup` import; and a resize destroys the result.

* `MixResultDisplay.vue:4` — `import { computed, TransitionGroup } from "vue"`. Built-in components
  resolve in `<script setup>` templates without import, as this same file proves by using
  `<Transition>` (`:60`) **without** importing it. Run 4 §7.6 certifies the import as "correctly a
  value import", which it is; it is also unnecessary. Owner edict 3 (KISS).
* `measurements-states.json → zoom200: null`. After a 1440 → 720 resize the plate is gone;
  `frames/F10-narrow-720-state-loss.png` shows the pane remounted with an empty `Selected` well and no
  result — **the mix and its operands are both destroyed by a viewport change**. Recorded here because
  the brief enumerates "zoomed to 200 %" as a state this component must survive; the owning defect is
  the pane/shell remount, not `MixResultDisplay.vue`. Distinct from run 4 §6's CSS-`zoom: 2` arm, which
  does not remount.

---

## 4. What is sound — run 5's negative proof

Probed hostilely, not assumed.

1. **Seed continuity holds.** Ghost and settled both pass `seed="mix-result"` with the same colour, and
   `WatercolorDot` derives its silhouette from `hashString(color + seed)`. One shape, as claimed. It
   fails only in the `wellColor` fallback arm (`:39`, `var(--muted-foreground)` hashes differently) and
   is, per D-40, never *observable* because `out-in` denies the two states a shared frame. Every cure
   must preserve this; it is the best idea in the file.
2. **Nothing bleeds.** `documentElement.scrollWidth − clientWidth === 0` at 1440, 720, 390 and 320,
   including N = 50 and a 51-character `color(display-p3 …)` string.
3. **No console or page errors** attributable to this component in any matrix (`consoleErrors: []` in
   all three per-matrix measurement files).
4. **Resting contrast passes AA in both schemes** — label 5.03 (light) / 5.97 (dark); value 13.52
   (light) / and comfortably above floor in dark. The failure is confined to the ghost state (D-3/r4 §5).
5. **The well is correctly a neutral opaque stage, not seed-tinted** (`VISUAL-CONSTITUTION §2`).
   Measured tone step against the pane behind it: light `1.359 : 1` (well lighter), dark `1.693 : 1`
   (well darker) — directionally sane in both schemes. `wbmix/welldelta.py`. No finding.
6. **`text-mono-small` + Fira Code on the value span is the correct type role** per the binding type
   matrix. The defects on that span are `break-all` and precision (r1 D-17 / r2 D-22), not the role.
7. **`WatercolorDot` sets `forced-color-adjust: none` on the specimen face**
   (`measurements-forcedcolors-motion.json → forcedColors.dots[0].fca`), so the specimen colour
   correctly survives WHCM. The producer is right here; the plate's missing boundary (D-37) is the
   consumer's.
8. **Vue 3.5 and `verbatimModuleSyntax` are clean.** Reactive props destructure with default (`:20-23`);
   `computed` over destructured props stays reactive; no `defineModel` round-trip and so no stale-read
   hazard; `import type { MixResult }` (`:7`) is the only type import and is marked.
9. **No god module.** 159 lines, one job, one scoped rule.

---

## 5. Where run 5 lands the gestalt cure

The priors converge on the right shape and I do not improve on it. Run 5 changes the **ordering** and
adds **two acceptance constraints**.

1. **D-31 lands first, before the completion contract.** Run 3's move 4 (the plate owns a completion
   contract) presumes there is something to complete *onto*. While `mixStage.ts:123` silently
   substitutes a magic point, every downstream cure is unfalsifiable — the animation will keep looking
   fine. **Delete the fallback, make a missing anchor throw, then decide whether the ghost earns its
   existence.** If it does not, the plate simply reserves its settled geometry and D-40's 200 ms
   hand-off dies with it.
2. **The motion wave's acceptance test is a measured ramp, not a diff.** Run 2's D-18 and run 4's D-30
   are both necessary and both insufficient while `mode="out-in"` stands (D-40). Accept on a
   frame-sampled height curve over the real clock; reject on any single-frame delta > 2 px.
3. **The result becomes a named ordered list, not a picture.** One change discharges r1 D-2, D-36,
   D-38, D-41 and half of r2 D-19/D-20: an `<ol>` of noninteractive named rows — ordinal, canonical
   value, optional name — with the `WatercolorDot` as each row's `aria-hidden` face, a count in the
   heading, disclosure past *n*, and the gradient strip demoted to the *compact* representation shown
   in place of the list rather than alongside it.
4. **The provenance line is one line and it is not optional.** Operands, space, hue method, strategy,
   in `text-mono-small` under the specimen. It is the named half of "result/provenance inspector" and it
   is what makes the plate honest when the controls change underneath it.
5. **Take the action set from the producer whole.** Drop `compact`, drop `<DockSeparator>` (D-37), give
   each control a real `aria-label`, wire `onCopyError` to a visible failure state (D-35), move focus to
   the surviving `Mix` control on Reset (D-34), and keep exactly one copy path owned by `MixPane` (D-43).
6. **Style reduced presence at the tier, not with `opacity`,** and give reduced-motion users a drawn
   mixing state rather than none (D-33).

**Net shape, unchanged from the priors and now with its first domino named:** the result plate is a
`div` that hand-rolls a surface, hand-rolls a label, hand-rolls a gradient, borrows dock chrome for its
actions, announces nothing — and points at a destination that was never wired. Cut the wire's lie first;
the rest falls out in order.

---

## 6. Artifacts

| File | Proves |
|---|---|
| `frames/F1-anchor-drops-miss-the-well.png` | **D-31** — drops converge over the operand cards, ≈280 px above the ghost well |
| `frames/F2-color-settled-light.png` | D-37, r1 D-5/D-6, r2 D-22 — invisible separator, 28 px seats, Fraunces eyebrow, mid-numeral wrap |
| `frames/F3-palette-settled-light.png` | D-36, r1 D-2, r2 D-19/D-20 — five blobs, no text, no provenance, strip measure ≠ row measure |
| `frames/F4-palette-settled-dark.png` | dark twin of F3 |
| `frames/F5-ghost-055-light.png` | r4 §5 / this run's 2.43 : 1 painted-pixel measurement |
| `frames/F6-empty-palette-void.png` | r2 P-1 — RESULT, a void, three live buttons |
| `frames/F7-50-colors-at-320.png` | **D-38** — 744 px plate in a 720 px viewport, 83 % blob grid |
| `frames/F8-forced-colors.png` | D-37 §, r3 D-27 — no boundary under WHCM (Chromium, `matches: true`) |
| `frames/F9-rtl.png` | r1 D-17 — the wrapped numeral flushed to the opposite edge |
| `frames/F10-narrow-720-state-loss.png` | D-44 — result and operands destroyed by resize |
| `frames/measurements-desktop-light.json` · `-dark` · `-mobile-light` | per-matrix rects, computed type, seat sizes, ARIA snapshots |
| `frames/measurements-states.json` | **D-31** anchor divergence · contrast · clipboard arms · RTL · **D-33** reduced motion |
| `frames/measurements-forcedcolors-motion.json` | Chromium forced-colors + **D-33** reduced-motion CSS |
| `frames/measurements-swap-timeline.json` | **D-32** inert TransitionGroup · **D-40** frame-accurate swap |
| `frames/measurements-edge-states.json` | **D-38** N = 5/24/50 · **D-39** one-stop gradient · r2 P-1 · 320 px long string |
| `frames/measurements-focus-keyboard.json` | **D-34** focus loss · tab inventory · `innerText === "RESULT"` |

Probe scripts (session scratchpad, read-only, re-runnable): `wbmix/probe2.mjs` (states),
`wbmix/probe3.mjs` (Chromium forced-colors + motion), `wbmix/probe4.mjs` (frame timeline),
`wbmix/probe5.mjs` (edge states), `wbmix/probe6.mjs` (focus/keyboard), `wbmix/contrast2.py`,
`wbmix/welldelta.py`.

**No source file was modified by this seat.**
