# CHALLENGE-D — `demo/workbenches/mix/MixResultDisplay.vue` — the design is wrong (run 2)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was spawned
with. The declaration is explicit, not inherited.

---

## 0. Verdict

**DEFECTIVE.** A prior run of this seat is preserved verbatim at `challenge-D-design.r1-prior.md`
(seventeen findings, D-1…D-17). This run re-derived the component independently in **WebKit** across
**seven render contexts**, and it does three things to that record:

1. **Corroborates** the prior's structural core with independent measurements in a second engine.
2. **Corrects** the prior on two points — one of them load-bearing, because the prior's proposed cure
   for its own D-3 provably would not work.
3. **Adds seven findings** the prior did not have, and **promotes two** of the prior's hypotheses to
   measured MAJORs.

**Strongest defect (this run): D-18 — the component's two-line `<style scoped>` block silently
overrides the producer motion family on the same element by attribute specificity, so the plate's
`vj-morph` arrival is a 116.0 px single-frame snap with no transform and no height morph.** This
supersedes the prior's D-3 diagnosis and invalidates its cure.

The component's own docblock (`MixResultDisplay.vue:9–18`) makes four claims — *"the announced
destination"*, *"one surface, new content"*, *"the silhouette the pigment poured into is the
silhouette the result wears"*, *"the swap rides `vj-morph` … the family law"*. **All four are false in
the shipped render**, and this run measures each of them.

---

## 1. What run 2 did differently

| | run 1 (`.r1-prior.md`) | run 2 (this document) |
|---|---|---|
| Engine | Chromium | **WebKit** (matches the Safari audit matrix) |
| Contexts | desktop light/dark | **7**: desktop L/D, mobile L/D (`hasTouch`), reduced-motion, forced-colors, 200 %-equivalent |
| Ghost measurement | one 3-colour palette | single-colour **and** 12-colour palette; rAF-sampled every frame |
| Contrast | computed by compositing arithmetic | **pixel-sampled** from the painted render (own minimal PNG decoder) |
| Empty arms | reasoned; explicitly labelled `Reproduction: NONE` | **both reproduced and measured** |
| Save | reasoned from the code path | **round-trip measured** (`savedCount 0→1`, plate diffed) |
| Motion | inspected the family stylesheet | **read the live CSSOM and the computed cascade during `.vj-morph-enter-active`** |
| Gradient | attacked on size ratio + RTL order | **interpolation space measured A/B/C at the midpoint** |

Probe scripts (read-only; **no source file was modified by this seat**):
`chD-mixresult-probe2.mjs` · `chD-probe3.mjs` · `chD-probe4.mjs` · `chD-probe5.mjs` · `chD-probe6.mjs`,
with 60 captures in `chD-shots/`, under
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`.

Populating state without touching source (for anyone re-running by hand in DevTools):

```js
let i = document.querySelector('.mix-plate, .dashed-well').__vueParentComponent;
while (i && !Object.keys(i.setupState ?? {}).includes('mixResult')) i = i.parent;
i.setupState.mixResult = { type: 'palette', colors: [/* … */] };
i.setupState.animationPhase = 'done';   // or 'mixing' for the ghost
```

---

## 2. Corroborated — the prior's core, re-measured in WebKit

| Prior finding | Run-2 independent measurement | Status |
|---|---|---|
| **D-1** producer drops fallthrough attrs → the add-slot is dead | live DOM: `<span aria-hidden="true" … style="… pointer-events: none">` where `tag="button"` was passed; Playwright timed out 30 s on `button[aria-label="Add current color to the mix"]` | **CONFIRMED** |
| **D-2** palette result carries no readable truth | 12 colours on screen → `plate.innerText === "RESULT"`; all 12 dots `aria-hidden="true"`, `pointer-events: none`, `title: null`; `liveRegions: 0` | **CONFIRMED** |
| **D-5** three 28 px unlabeled seats | 28 × 28 in **all seven** contexts incl. `hasTouch: true` at 390 px; `aria-label: null` ×3 | **CONFIRMED + widened** |
| **D-6** three label species in one pane | `RESULT` Fraunces 700 / 14.384 px / ls 0.3596 px · `.section-label` Fira Code 400 / ls 1.4384 px · `Selected` Fraunces 600 / 16.4 px | **CONFIRMED** |
| **D-8** the ghost wears a shape the result never wears | 12-colour arrival announced by **one** 40 px dot and **zero** buttons | **CONFIRMED** |
| **D-9** Copy exists twice, failure unhandled | `useClipboard.d.ts:3` union is 4-state; component maps `success` only; dock seat is the *named* one and the *silent* one | **CONFIRMED** |
| **D-11** a `role="separator"` that paints nothing | `1 × 0` px, `data-orientation="horizontal"` vs `aria-orientation="vertical"`, `closest('.glass-dock') === null`, in all 7 contexts | **CONFIRMED** |
| **D-14** `:key="i"` makes the TransitionGroup inert | source; sibling `MixSourceSelector.vue:78–98` builds a stable-key map for exactly this reason | **CONFIRMED** |
| **D-16** the visual matrix never sees this component | `REPORT.md:123,138,153,168` measure a Mix pane with no plate | **CONFIRMED** |

Two producer-source facts from run 1 that this run did **not** re-derive and adopts as-is, with
credit: `touch-floor.css`'s explicit `:not(.dock-icon-button--compact)` carve-out (run-1 D-5), and
`.section-label`'s `text-mono-caption` recipe with 20 consumers across 9 files (run-1 D-6). Both are
load-bearing for the cures below.

---

## 3. Corrections to the prior run

### C-1 · load-bearing · run-1 D-3's mechanism and cure are wrong

Run 1 diagnosed the dead height morph as *"`--vj-morph-collapse` and `--vj-morph-expanded` never set,
so `animations.css:104–136`'s `max-height` arm resolves `none → none` and does nothing"*, and
prescribed *"set the `--vj-morph-collapse/-expanded` the family already exposes"*.

**That cure would have no effect.** The `max-height` arm is not merely unparameterised — it is not in
the element's transition-property list at all. Measured while the plate carries
`vj-morph-enter-active` (`chD-probe4.mjs`, WebKit):

```
classes            : mix-plate … bg-well mix-plate--ghost vj-morph-enter-active vj-morph-enter-to
transitionProperty : opacity                              ← not "opacity, transform, max-height"
transitionDuration : 0.2s
transitionTiming   : cubic-bezier(0.4, 0, 0.2, 1)         ← --ease-standard, not --ease-decelerate
transform          : none
maxHeight          : none
```

See **D-18**. Setting `--vj-morph-collapse/-expanded` on an element whose `transition-property` is
`opacity` changes nothing.

### C-2 · run-1 D-4's contrast number

Run 1 reported **2.21 : 1** from compositing arithmetic. Run 2 sampled the painted pixels
(`chD-probe3.mjs`, darkest ink vs lightest background inside the label box — an **upper bound**):

| state | darkest ink | lightest bg | contrast |
|---|---|---|---|
| ghost (`opacity: .55`) | `rgb(164,127,122)` | `rgb(235,217,210)` | **≤ 2.61 : 1** |
| settled | `rgb(112,89,66)` | `rgb(233,225,217)` | 5.08 : 1 |

The verdict is unchanged — the label computes to Fraunces **700 at 14.384 px**, below WCAG's
large-text floor (18.66 px bold), so **4.5 : 1** is required and the ghost state fails — but the
number of record should be the measured one. During the ghost phase this label is the *only* text in
the plate.

---

## 4. Promotions — two of the prior's hypotheses are now measured

### P-1 · run-1 D-13 · MINOR-hypothesis → **MAJOR-measured**

Run 1 wrote: *"Reproduction: NONE — this is a hypothesis."* Both arms reproduce.

**`{ type: "color" }` with no `css`** — `chD-shots/d-light-P6-emptycolor.png`:

```
plate h = 90.7   dots = 0   value = null   buttons = 3   innerText = "RESULT"
```

A plate labelled `RESULT` with three operable buttons and no result. Pressing Copy calls `copy("")`,
writes an empty string to the clipboard, and flashes `Copied!`.

**`{ type: "palette", colors: [] }`** — `chD-shots/d-light-P7-emptypalette.png`:

```
plate h = 130.7   dots = 0   grad = { bgImage: "none", h: 16 }   innerText = "RESULT"
```

A **16 px blank band** is reserved and painted where the strip would be — literal filler.
`VISUAL-CONSTITUTION.md §7 · Mix`: *"No shadow palette filler appears when an operand is absent."*
`§3` law 2: *"Empty secondary content occupies at most a narrow invitation tray … or disappears."*

Note also that `MixResult` (`useMixingState.ts:32–36`) declares **both** payload fields optional, and
the component's own `wellColor` computed (`MixResultDisplay.vue:36–40`) defends against absence twice
with `?? "var(--muted-foreground)"` — the author anticipated the state in the ghost branch and did not
design it in the settled branch. The guard at line 78 protects the specimen but not the actions or the
strip; there is no `v-else` and no invalid arm anywhere in the file.

### P-2 · run-1 D-10 · code-reasoned → **measured**

`chD-probe6.mjs` — click the Save seat, diff the plate:

```
before: {"h":158.7,"text":"RESULT | oklch(70% 0.18 25)","titles":[…],"live":0,"savedCount":0}
after : {"h":158.7,"text":"RESULT | oklch(70% 0.18 25)","titles":[…],"live":0,"savedCount":1}
```

The palette **was** created and the plate is byte-identical: no pending, no success, no failure, no
name. Aggravating: the dev console carries `value.js dev is MISCONFIGURED … every palette request will
be blocked`, so in this very configuration a *failed* save would be equally invisible.

---

## 5. New findings

### D-18 · MAJOR · The scoped `transition` shorthand defeats the `vj-morph` family on the same element

**Evidence.** The two competing rules, read out of the live CSSOM (`chD-probe4.mjs`):

```
.vj-morph-enter-active      { transition: opacity var(--duration-fast) var(--ease-decelerate),
                                          transform var(--spring-snappy-duration) var(--spring-snappy),
                                          max-height var(--duration-normal) var(--ease-decelerate); }
.mix-plate[data-v-0f138735] { transition: opacity var(--duration-fast) var(--ease-standard); }
```

Specificity `(0,2,0)` beats `(0,1,0)`, and the shorthand resets `transition-property` to `opacity`
alone. Computed during the enter frame: `transitionProperty: "opacity"`, `transitionTimingFunction:
cubic-bezier(0.4, 0, 0.2, 1)` (`--ease-standard`), `transform: none`, `maxHeight: none`.
`MixResultDisplay.vue:152–154` is the whole cause.

**Mechanism.** `animations.css:59–62` states the family law verbatim: *"The family owns the CURVE +
TOKEN pairing; a consuming site may parameterise only GEOMETRY through the `--vj-*` custom
properties."* This component parameterises the **curve** (`--ease-standard` in place of
`--ease-decelerate` / `--spring-snappy`) and the **property set** (drops `transform` and `max-height`)
— the two things the law forbids — through a scoped rule that wins by attribute specificity. The
`<Transition name="vj-morph">` at `MixPane.vue:111` is therefore decorative: it applies classes whose
declarations never take effect on this element. No gate in the tranche can see this.

**Consequence, rAF-sampled** (`chD-probe5.mjs`, every frame for 2.5 s across a 12-colour swap,
compressed to state changes):

```
[{"t":44,"h":102.7,"op":0.55,"dots":1,"btns":0},
 {"t":265,"h":218.7,"op":1,"dots":12,"btns":3}]
minHeight: 102.7   maxHeight: 218.7
```

No intermediate height exists: **+116.0 px = 2.13× in one frame.** Single-colour arm, real flow:
desktop 118.7 → 158.7 (**+40.0**), mobile 112.3 → 158.6 (**+46.3**).

**Reproduction.** `chD-probe4.mjs`; or in DevTools, arm a mix and read
`getComputedStyle($('.mix-plate')).transitionProperty` during the enter frame.

**Cure (supersedes run-1 D-3's).** Delete `<style scoped>` whole. The ghost dimming belongs on the
*specimen*, not the container (run-1 D-4 / run-2 C-2), and the family already owns the plate's
arrival. Combined with run-1 D-8's cure — the ghost renders the result's own shape and count — the
container never resizes, `mode="out-in"` becomes unnecessary, and there is no height to morph.

---

### D-19 · MAJOR · The gradient strip depicts an interpolation the user did not choose, while the pane already owns the correct primitive

**(a) The space is observable, and the component hard-wires the engine default.** Measured at the
strip's midpoint with identical stops (`chD-probe3.mjs`, WebKit):

```
linear-gradient(to right, …)          → rgb(135,117,169)
linear-gradient(in oklab to right, …) → rgb(135,117,169)   Δ = 0
linear-gradient(in srgb  to right, …) → rgb(100,108,168)   Δ = 36
```

The computed `background-image` carries **no `in <space>` clause**, because
`MixResultDisplay.vue:109–116` builds the declaration from `result.colors` alone.
`MixPane.vue:113–118` passes only `result` and `ghost`: the component never receives `colorSpace` or
`hueMethod`. Select `srgb`, `lch`, `hsl`, or hue method `longer`, and the swatch **stops** honour the
selection while the continuum **between** them does not. For an instrument whose entire subject is
the interpolation space, its only continuous depiction of the result is unconditional.

**(b) The correct primitive is forty lines away.** `MixConfigBar.vue:23,111,133` already consumes
`sampleInterpolationRamp` + `<PreviewRamp>` from `../../color-session/color-chips` — library-sampled
ramps that *are* space- and hue-method-aware, with a `data-stops` oracle behind them (T-17). The
result plate hand-rolled a CSS gradient inside the same pane that ships the honest one. Owner edict 4
(*glass-ui / the design system is the source of primitives, reuse existing names*) and edict 3 (KISS —
do not mint a second thing that already exists) both apply.

This is an independent axis from run-1 D-7, which attacked the same element on size ratio (3.16× the
data's inline extent) and RTL ordinal contradiction. All three arguments hold simultaneously and all
three point at deletion.

---

### D-20 · MAJOR · The strip is outside both colour-surface rosters its neighbours are inside

`demo/styles/foundation.css` maintains **one enumerated roster**, reused by
`@media (forced-colors: active)` (≈ lines 683–698) and `@media print` (≈ lines 832–846), precisely so
that *"the surfaces whose whole PURPOSE is to show a color … must survive WHCM's system-color
substitution"*:

```
canvas, .spectrum-picker, .gamut-overlay, .atmosphere-canvas, [data-glass-field-canvas],
.gradient-rail, .rail-handle, .readout-rail, .swatch-row > *, .generate-swatch,
.shadow-swatch, .goo-blob-canvas, .watercolor-swatch, … , [data-color-surface]
```

The strip is an anonymous `<div>` with an inline `background`, **no class and no
`data-color-surface`**, and it is a *sibling* of `.swatch-row`, not a child — so it matches neither
selector. Its twelve neighbouring dots are covered twice over (`.swatch-row > *` **and**
`.watercolor-swatch`); the strip is covered zero times. In high-contrast mode and in print the plate's
dots keep their colour and the strip does not.

**Mechanism.** The app maintains a *named* colour-surface register; this element was authored as
anonymous inline style, so it fell out of a register it structurally belongs in. That is the general
cost of hand-rolling a primitive (D-19b) rather than consuming one.

**Reproduction.** `grep -n "swatch-row > \*" demo/styles/foundation.css`; then inspect the strip — no
class, no data attribute.

---

### D-21 · MAJOR · The result region carries zero provenance

**Evidence.** `plate.innerText` for a 12-colour result is the single word `RESULT`. Nothing in the
DOM records how many operands were mixed, in which space, with which hue arc, or under which leftover
strategy — and the operand rack above can be empty while the plate still shows a result
(`chD-shots/d-light-P1F-full.png`).

Three canon citations make this a named requirement, not a preference:

- `VISUAL-CONSTITUTION.md §3.1` defines the Mix support region as *"result/**provenance** inspector"*.
- `§7 · Mix`: *"Source mode, add/remove/reorder, method, unequal-palette strategy, **provenance** and
  commit share the same control grammar."*
- `OPTICAL-BENCH-COMPOSITIONS.md §3` closes Mix on *"modes, 2/3/12/unequal inputs/order/
  **provenance**."*

**Mechanism.** The component's props are `{ result, ghost }`. Provenance was never modelled as an
input, so the plate cannot state it.

**Cure.** One `text-mono-small` line: `3 colours · OKLab · shorter` (`· discard` when the leftover
strategy applies). It costs one row and it is the only thing that makes the result reproducible — and
it is the same row that would carry D-19's honest ramp.

---

### D-22 · MAJOR · The value readout is raw machine output that breaks mid-number

**Evidence.** `chD-shots/d-light-P5-long.png` — the plate renders:

```
oklab(71.666666666667% -0.002284954
563 0.014917814848)
```

Measured: 54 characters; desktop `w = 362`, `h = 45.9` at `line-height 22.96` → **2 lines**; mobile
`h = 58.8` at `19.6` → **3 lines**; `word-break: break-all`; `font-variant-numeric: normal`.
`break-all` splits **inside a number**: `-0.002284954` / `563`.

Run 1 raised `break-all` abstractly in its D-17; this is the rendered artifact plus the numbers.

**Mechanism.** `MixResultDisplay.vue:85` pairs `select-all break-all` with an unrounded serialisation.
Both halves are forbidden by the tranche's own laws. `VISUAL-CONSTITUTION.md §4`: *"Live numbers use
tabular figures and reserve their widest legal representation so value changes never reflow the
settled chassis"* — measured `font-variant-numeric: normal`, and the line count changes 2 ↔ 3 with
the payload, so the chassis reflows. `PALETTE-CONTRACT.md §3` fixes the project's canonical spelling
at 3/6/3/6 decimals; the plate prints 12. Compare the Picker headline in the same viewport:
`92.0%, 88.8, 20.0`.

**Cure.** Format at the plate: canonical fixed decimals, tabular figures, `overflow-wrap: anywhere`
(never `break-all`), and reserve the widest legal representation so the plate does not reflow.

---

### D-23 · MINOR · The plate is the only surface in the Mix pane off the radius token

Measured in all seven contexts:

```
{"plate":"12px","dashedWell":"16px","paneCard":"16px","tokenCard":"1rem"}
```

`MixResultDisplay.vue:55` uses `rounded-xl` (a raw Tailwind rung) where its sibling well
(`MixSourceSelector.vue:116` → `.dashed-well`) and the pane Card both resolve `--radius-card: 1rem`.
Two identical-tier grey wells stacked 40 px apart with a 4 px radius difference is exactly the
incoherence the owner marked as `owner-marked/OM-4-easing-radius-incoherence.png`. Owner edict 5:
style at the root, not per instance.

**Cure.** `rounded-card`.

---

### D-24 · INFO · The three preference arms are clear — recorded so they are not re-litigated

| Arm | Result |
|---|---|
| `prefers-reduced-motion: reduce` | **PASS** — the global guard at `animations.css:183–191` neutralises every transition; `useMixingState.ts:13–15` documents the immediate-settle path and the state machine honours it |
| `forced-colors: active` | **PASS for the specimen** — `.watercolor-swatch` and `.swatch-row > *` are both in the roster, so the dots keep their colour; the focus ring correctly falls back to a real `outline` (`2px solid`). **FAILS for the strip** — see D-20 |
| 200 % zoom (720 px-equivalent) | **PASS** — rem-based throughout; plate 216.7 px, no clipping, no horizontal overflow |

Honest limit: WebKit's `forcedColors: "active"` emulation changed the focus outline but did not
visibly substitute system colours elsewhere in this page, so D-20's forced-colors half is argued from
the roster's own construction rather than from a rendered high-contrast capture. The `@media print`
half needs no such caveat — the roster omission is textual.

---

## 6. Consolidated state-coverage matrix (run 2, 7 contexts)

**Nine of nineteen states are unhandled.**

| State | Handled? | Measured |
|---|---|---|
| ghost / announced destination | partially | 102.7 px, 1 dot, 0 buttons; ≤ 2.61 : 1 (D-18, C-2) |
| populated · single colour | partially | value unformatted, wraps 2–3 lines (D-22) |
| populated · palette 2–12 | partially | no values, no names; 9 + 3 ragged wrap at 1440 |
| populated · palette 0 | **no** | 130.7 px plate + 16 px blank strip band + 3 live buttons (P-1) |
| populated · colour with no `css` | **no** | 90.7 px plate + 3 live buttons, Copy writes `""` (P-1) |
| empty / no result | n/a | unmounted by `MixPane` — correct |
| loading / pending | **no** | none; `useClipboard`'s `pending` unmapped |
| error — mix failure | **no** | no arm in the file |
| error — copy failure | **no** | `failure` + `onCopyError` both discarded |
| error — save failure | **no** | `onSave` never inspects the port result (P-2) |
| success — save | **no** | `savedCount 0→1`, plate byte-identical (P-2) |
| success — copy | weak | 1500 ms icon + `title` swap, `liveRegions: 0` |
| disabled | **no** | actions never disable; empty payloads keep them live (P-1) |
| focused | producer-owned | box-shadow ring; WHCM restores a real outline |
| hover / active / pressed | producer-owned | `glass-capsule-hover`, `data-press-armed` |
| selected | n/a | no selection semantics — correct |
| dragging | n/a | result order is not editable |
| overflowing / truncated | **no** | 9 + 3 orphan wrap; value wraps 2 ↔ 3 lines (D-22) |
| RTL | partially | row mirrors; value not LTR-isolated (run-1 D-17); strip contradicts the row's order (run-1 D-7) |
| reduced-motion | **yes** | D-24 |
| forced-colors | partially | dots pass, strip absent from the roster (D-20) |
| print | partially | same roster gap (D-20) |
| zoomed 200 % | **yes** | D-24 |

---

## 7. Proportion and seat-law scorecard

| Law | Verdict |
|---|---|
| `OPTICAL-BENCH-COMPOSITIONS.md §5` — Mix retained dividing line `none`; *"Any additional line … is a defect"* | **FAIL** (run-1 D-11) |
| `PROPORTION-AUDIT.md` PR-05 — dividers/ornaments REMOVE | **FAIL** — separator + redundant strip |
| PR-06 / PR-13 — one action owner, Copy 2→1 | **FAIL** — three copy paths (run-1 D-9 + `select-all`) |
| PR-07 — no hover-only / unlabelled controls | **FAIL** — three `title`-only seats |
| PR-08 — persistent pending/failure truth | **FAIL** — copy, save and mix all lack it (P-2) |
| PR-12 — seat geometry preserves the target floor | **FAIL** — 28 × 28 on `hasTouch` |
| `VISUAL-CONSTITUTION.md §4` — closed type matrix | **FAIL** — Fraunces-bold-uppercase control label |
| §4.1 — rendered contrast on the actual tier | **FAIL** — ≤ 2.61 : 1 in the ghost state (C-2) |
| §5 — a transient flourish never carries the only truth | **FAIL** — the copy confirmation is the only truth |
| §6 — no full-slab remount hole | **FAIL** — 116 px single-frame snap (D-18) |
| §6 — *"Spatial continuity uses one producer-owned glass-ui spring register"* | **FAIL** — the register is overridden by a scoped rule (D-18) |
| §6.1 — CSS strings LTR-isolated | **FAIL by construction** (run-1 D-17) |
| §7 Mix — provenance in the result region | **FAIL** (D-21) |
| §7 Mix — no filler when an operand is absent | **FAIL** — 16 px blank band (P-1) |
| Owner edict 1 — no god modules | **PASS** — 159 lines, one job |
| Owner edict 2 — no legacy / masking fallback | **FAIL** — the `mixStage` geometric fallback (run-1 D-1) |
| Owner edict 3 — KISS, no contrivance | **FAIL** — a hand-rolled ramp beside the real one (D-19b) |
| Owner edict 4 — glass-ui is the design system | **FAIL** — dock primitives borrowed for look; `.section-label` bypassed |
| Owner edict 5 — root-level styling | **FAIL** — `rounded-xl` per instance (D-23) |
| Owner edict 6 — animations never deleted | **PASS in letter, FAIL in fact** — one is silently disabled (D-18) |
| Owner edict 7 — idiomatic Vue 3.5 | **PASS** — reactive props destructure, no `defineModel` round-trip, so no stale-read hazard |
| Owner edict 8 — `verbatimModuleSyntax` | **PASS** — `import type { MixResult }` (line 7) is the only type import |

---

## 8. What is sound — the negative proof

The seat should say what survived a hostile second pass:

- **Reactive props destructure with a default** (lines 20–23) is the correct Vue 3.5 idiom; there is
  no `defineModel` round-trip and therefore no stale-read hazard, so no `shallowRef` is warranted.
- **`import type { MixResult }`** (line 7) is the only type-only import and is correctly marked —
  `verbatimModuleSyntax` clean.
- **The one-clock law holds.** The component owns no timer; the only timing it introduces is
  `useClipboard`'s producer-owned `resetMs`. `useMixingState.ts:5–15` documents the discipline and
  this file respects it.
- **Motion family naming is disciplined** — `vj-morph` for the in-place swap, `vj-enter` for the
  arriving swatches, no fourth name (the `animations.css:59` hard gate). The *names* are right; only
  the scoped override defeats them.
- **Reduced-motion and 200 % zoom are genuinely clean** (D-24), measured, not assumed.
- **The specimen faces are correctly ornamental** — `aria-hidden`, non-interactive, inside the
  forced-colors and print rosters. §4.2's face/seat law is respected for the dots (the strip is the
  exception, D-20).
- **The seed-continuity idea is genuinely good design thinking.** A ghost silhouette that the arriving
  specimen fills is specific, memorable and right for this product. It is worth fixing rather than
  deleting; D-18's and run-1 D-8's cures keep it and make it true.

---

## 9. The gestalt cure — three transpositions

Twenty-four findings across both runs collapse into **three** architectural moves plus one upstream
repair.

**0 · Upstream (not this file).** `MixSourceSelector`'s add-slot must become a real named `<button>`
seat with the `WatercolorDot` as its face (the §4.2 face-inside-seat law), and `[data-mix-target]`
must live on markup the consumer owns, with `mixStage.collectStage` returning `null` — loudly —
when the anchor is missing. Until then this component is unreachable in the shipped product and none
of its design can be validated in-app. (run-1 D-1; corroborated.)

**1 · Make the ghost a reservation, not a stand-in.** Render the real result tree with a `data-ghost`
attribute; the swatches become `variant="ghost"` faces of themselves. The container never resizes, the
docblock's promise becomes literally true, `mode="out-in"` and the container `opacity` both become
unnecessary, and `<style scoped>` can be deleted whole — which is the only thing that restores the
producer motion family. → **D-18, run-1 D-3, D-4/C-2, D-8.**

**2 · Make the plate a readout, not a picture.** One named region: a producer `.section-label`
identity, a provenance line (`3 colours · OKLab · shorter`), one value per colour in `text-mono-small`
at canonical fixed precision with tabular figures, an honest empty/failure arm, and the redundant
strip deleted — or replaced by the pane's existing `<PreviewRamp>` fed the real space, at which point
it stops being decoration and becomes the one thing the swatch row cannot say. → **D-19, D-20, D-21,
D-22, P-1, run-1 D-2, D-6, D-7, D-12.**

**3 · Give the action row one owner, real names, and real state.** Delete `MixPane.copyResult` and its
`usePaneRouter.ts:222` entry; name the three seats; map `useClipboard`'s full four-state contract and
call `invalidate()` on result change; give Save a durable, named result; drop the dock separator and
drop `compact` — or better, replace the borrowed dock primitives with a named glass-ui action-row seat
that owns its own ≥ 44 px hit cell. → **P-2, run-1 D-5, D-9, D-10, D-11.**

The residue — D-23, run-1 D-14, D-15, D-17 — are one-line corrections that should ride whichever wave
owns the above. Run-1 D-16 (the visual matrix cannot see this component) is a gate repair:
`audit/visual/states.mjs` must drive Mix to `done` and capture the ghost and the settled plate in both
schemes and both form factors, or no `π/DELTA` claim about this component may cite the matrix.

---

## 10. Artifacts

- Prior run, preserved verbatim: `challenge-D-design.r1-prior.md`
- Element captures from run 1: `frames/plate-settled-palette-{light,dark}.png`
- Run-2 captures and raw measurements (scratch, not in-repo):
  `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
  — `chD-shots/` (60 element + full-page captures across 7 contexts), `chD-probe{2,3}.json`,
  `chD-mixresult-probe2.mjs`, `chD-probe{3,4,5,6}.mjs`, `chD-png.mjs` (minimal PNG decoder used for
  the contrast and gradient measurements).

**No source file was modified by this seat.** All writes are confined to
`docs/tranches/V/megatranche/audit/components/wb-mix-resultdisplay/`.
