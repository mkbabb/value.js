claude-opus-5[1m]

# CHALLENGE · MatrixEditor · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/matrix-editor/MatrixEditor.vue` (158 lines)
**Date** 2026-08-06 · **Mode** static, source-derived only (no browser tooling, per law)
**Verdict** **21 defects / 2 BLOCKER / 9 MAJOR / 7 MINOR / 3 INFO · 5 superlatives**

---

## 0. Read set (whole, read-only)

| File | Why in scope |
| --- | --- |
| `demo/scenes/cube/matrix-editor/MatrixEditor.vue` (158 L) | **the target** |
| `demo/scenes/cube/matrix-editor/transformMath.ts` (181 L) | `Matrix3dCall` / `MatrixCellMeta` types + **every slider bound and every cell label** the target renders |
| `demo/scenes/cube/matrix-editor/useTransformState.ts` (227 L) | the producer of `matrixCellMeta` (`:52-57`) and `matrix3dEnd` |
| `demo/state/controlOptionsStore.ts` (117 L) | `@state` → `getStoredAnimationGroupControlOptions`; the **declared shape** of `matrixOptions` |
| `demo/state/storeUtils.ts` (`:11-21`) | the 7-day store TTL — bears on the stale-bucket falsifier (D-10) |
| `demo/scenes/cube/CubeScene.vue` (`:173-201`) | the **only** mount site + the ribbon that co-owns `matrixOptions.fixed` |
| `demo/styles/style.css` (`:109-112`) | `--axis-x/y/z/w`, the tokens the scoped block reads |
| `demo/styles/design-idioms.css` (`:47`) | `--rail-width: clamp(25rem, 33svi, 32rem)` — the pane geometry the grid resolves inside |
| `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.css` | desktop rail width / mobile drawer padding |
| `@mkbabb/glass-ui@7.0.0` `dist/components/{input,card,slider}/**`, `dist/Input-DY7soIPd.js`, `dist/field-control-CeLay9Tk.js`, `dist/class-names-Cpy5eaBk.js`, `dist/components/_shared/field-control.css`, `dist/styles/{theme/radius,typography/scale,typography/utilities,tokens/*}.css` | the real API + the real cascade |
| `dist/gh-pages/assets/index-CL_QYCiO.css` (571 110 B, built **2026-07-16 09:11**) | **cascade + emission adjudication** |

**Corroborating-artifact caveat.** The built stylesheet is dated 2026-07-16 09:11; `MatrixEditor.vue`'s last mtime is 2026-07-16 09:08. The build is *after* the last edit and contains the target's scoped rules verbatim (`.x[data-v-f2273298]{--color:var(--axis-x);color:var(--color)}`), so it is current for this component. Where I lean on it I say so. Its `@layer` statement order — `properties · theme · base · components · utilities` — is the basis of every cascade claim below: layer precedence beats specificity, so Tailwind utilities beat glass-ui's `@layer components` `.field-control`.

---

## 1. Hitherto corpus — folded, not re-invented

- **census row** `lane-frontend.md:250` — `158 | cube/matrix-editor/MatrixEditor.vue | G | matrix editor — Slider, Card*, Input`. **I confirm the grade at the container level and contradict it at the control level.** The `G` (glass) grade is earned by `Card`/`CardContent` (real props, real enum values — S-D3). It is *not* earned by the `Input`, which is passed three props that do not exist on `InputProps` (D-8) and is stripped of its plate while keeping its rim, blur and pill radius (D-6). "Consumes glass-ui" and "conforms to glass-ui" are different measurements; the census made the first, this challenge makes the second.
- **`lane-frontend.md:352`** — "`Slider` (already imported elsewhere: … `MatrixEditor.vue:97` …)". **Confirmed exactly**: line 97 is the barrel import. No contradiction.
- **`lane-frontend.md:441`** — "No `--kf-*` namespace exists … demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's." **I fold it and supply a fresh instance**: the target's scoped block declares `--color` (`:143,147,151,155`) — about the most collision-prone custom-property name available — and never reads it anywhere a descendant could benefit (D-20). This is the flat-namespace hazard in its purest form, and here it buys nothing.
- **`lane-frontend.md:442`** — z-index is single-sourced from glass-ui; raw `z-[N]` forbidden. **I confirm the target obeys** and go further: it is the only component I have read that *documents* why its one `z-10` is not a contract layer (`:13-15`) — see S-D1.
- **`lane-frontend.md:462-490` PRM census** (10 CSS blocks + 3 JS sites; the cube contributes exactly one JS site at `useCubeDemo.ts:164`, zero CSS blocks). **I confirm and narrow**: `MatrixEditor.vue` declares *zero* transitions, animations and keyframes. It is not a PRM gap — there is nothing to gate. It cannot lie about reduced motion (S-D2). The cube's PRM debt sits in `CubeScene`/`useCubeDemo`, not here.
- **F-1** (`lane-frontend.md:15,54`) — glass-ui is a phantom dependency (absent from `package.json` and the lock, 7.0.0 installed). **I fold it as the proximate cause of D-8.** Nothing pins the demo to 7.0.0, so nothing failed when `:start`/`:end`/`:step` ceased to be (or never became) `InputProps` members. The target still passes them; the build is silent because unknown attrs fall through.
- **S-1..S-8 shadow census** (`lane-frontend.md:264-397`) — **no MatrixEditor entry, and I do not add one.** The target vendors no glass-ui component. Its sins are misuse and hand-rolling of *utility rungs* (D-14), not component shadowing. Nothing here belongs in the shadow tally.
- `lane-library.md` parse seams — **no overlap.** The target compiles no CSS text and never touches the parser; its `Matrix3dCall` is a local structural type (`transformMath.ts:39-43`), not a `value.js` parse product.

---

## 2. BLOCKER

### D-1 · A missing space in a string concatenation deletes the selected-cell indicator — the Slider's target is unmarkable

**BLOCKER** · `MatrixEditor.vue:16-27` (with `:61-91`) · WCAG 1.3.1 Info & Relationships (A), 3.2.4 Consistent Identification (AA), and a first-order usability failure

The grid's only conditional styling is built by concatenating a multi-line template literal with a single-element array:

```js
`text-body absolute top-0 left-0 z-10 h-full w-full
bg-transparent p-0 text-center font-mono
text-ellipsis` +
[ storedControls.matrixOptions.selectedMatrixCell === i
      ? 'font-bold focus:font-bold' : '' ]
```

The template literal ends at the character `s` of `text-ellipsis`. `Array.prototype.toString` on a one-element array yields the element with **no separator**. Evaluated (node, exact source text):

```
SELECTED  : [... "font-mono", "text-ellipsisfont-bold", "focus:font-bold"]
UNSELECTED: [... "font-mono", "text-ellipsis"]
```

`text-ellipsis` and `font-bold` fuse into the single token `text-ellipsisfont-bold`. Adjudicated against the shipped stylesheet:

| token | occurrences in `index-CL_QYCiO.css` |
| --- | --- |
| `text-ellipsisfont-bold` | **0** |
| `.text-ellipsis` | 1 |
| `.font-bold` | 1 |
| `focus\:font-bold` | 1 |

Tailwind v4 scanned the *source text* and emitted `.font-bold` and `.focus\:font-bold`, so the utilities exist — but no element ever carries the class `font-bold`. glass-ui's `cn` cannot rescue it: `class-names-Cpy5eaBk.js` splits on `/\s+/` and dedupes by group; a fused token is one token, classified into the `["text-color", /^text-/]` group, and no rule matches it.

Consequence, in order of severity:

1. **The selected cell is not bold at rest.** The only survivor is `focus:font-bold` — but focus is a *different state* from selection. Click a cell, then touch the `Slider` (`:61-91`): focus moves to the reka thumb, the input blurs, and **no cell is marked while the very control that edits it is being dragged**. That is exactly when the marker matters.
2. **Selection is persisted** (`storedControls.matrixOptions.selectedMatrixCell`, a `useStorage` bucket). On reload cell *N* is selected with focus nowhere — zero indication, in any state.
3. The selected cell also silently loses `text-ellipsis`, so the two states differ in overflow behaviour as well as weight.
4. Even had it worked: font-weight alone across a 4×4 grid of monospace numbers is a thin affordance. There is no ring, no border tint, no background, no `aria-selected`, no `data-selected` hook anywhere in the file.

**Falsifier.** Any of: (a) a `.text-ellipsisfont-bold` rule existing in the built stylesheet or in any demo CSS — grepped, 0 hits in 571 110 bytes; (b) a second, independent selection affordance elsewhere in the component — the file is 158 lines and read whole, there is none; (c) `cn` splitting on a non-whitespace boundary — `class-names-Cpy5eaBk.js` `a()` splits on `/\s+/` only. A live screenshot showing a bold cell **while the Slider thumb holds focus** would kill this claim outright.

> Note the author got this right 20 lines later: the label div's literal ends `dark:opacity-75 ` **with a trailing space** (`:46`) before the same `+ [ … ]` idiom, and its token list comes out clean (`… "dark:opacity-75", "x"`). The bug is a typo, not a misunderstanding — which is precisely why no reviewer caught it.

### D-2 · Seventeen controls, zero accessible names

**BLOCKER** · `MatrixEditor.vue:16-40` (×16) and `:61-91` · WCAG 4.1.2 Name, Role, Value (A); 1.3.1 (A)

Every interactive element in the component is anonymous to assistive technology:

- **The 16 value fields.** `<Input>` renders `<input type="text" data-slot="input" …>` (`Input-DY7soIPd.js`, `type: { default: "text" }`). No `aria-label`, no `id`+`<label>`, no `aria-labelledby`, no `placeholder`, no `title`. `InputProps` exposes none of these, but `forwardedAttrs` (`field-control-CeLay9Tk.js` — spreads all of `useAttrs()` minus `aria-invalid`) would have forwarded an `aria-label` verbatim; the target simply does not pass one. A screen-reader user meets sixteen identical "edit text, 0" controls.
- **The Slider.** `SliderProps extends SliderRootProps` and the dist bundle references `aria-label`/`aria-labelledby` (`slider-DDia69Fy.js`), so the seam exists. The target passes `class="w-full"` and nothing else (`:90`). reka emits `role="slider"` with `aria-valuenow`, so the *role* and *value* are present and the *name* is absent — the worst of the three, because the control silently retargets between sixteen different quantities with sixteen different units and domains and never announces which.
- **The visible label does not rescue either.** The `<div>` at `:41-57` is a sibling of the input inside the cell, associated by nothing — no `for`, no `id`, no `aria-hidden` either, so AT reads it as loose text *and* it fails as a label. It is also ambiguous and duplicated (D-5) and effectively invisible (D-4).

**Falsifier.** A rendered accessibility tree in which any of the seventeen controls carries a non-empty accessible name. This is decidable from source: `grep -n "aria-\|<label\|title=" MatrixEditor.vue` returns nothing, and the only `for=` in the file is the `v-for` at `:11`.

---

## 3. MAJOR

### D-3 · The Slider's domain is wrong by two to three orders of magnitude for 10 of the 16 cells

**MAJOR** · `transformMath.ts:6-22, 164-180` consumed at `MatrixEditor.vue:75-89` · Aristotelian proportion — the granularity of a control must be commensurate with the quantity it edits

`getSliderOptionsFromIx` buckets every cell into three presets:

```ts
const key = transform === "T" ? "translate" : transform === "S" ? "scale" : "rotate";
```

`getTransformFromIx` returns `"T"` for 12/13/14, `"S"` for 0/5/10, `"P"` for 3/7/11, `""` otherwise. So `"P"` **and** `""` both fall into the `else` branch and get the `rotate` preset: `bounds [-360, 360], step 1`.

That preset was written for *Euler angles in degrees*. It is applied to cells that are not angles:

| cells | what they hold | legal domain | preset given |
| --- | --- | --- | --- |
| 1, 2, 4, 6, 8, 9 | rotation/shear direction cosines | `[-1, 1]` | `[-360, 360]`, step **1** |
| 3, 7, 11 | perspective terms (`perspective(1000px)` ⇒ ∓0.001) | ≈ `[-0.01, 0.01]` | `[-360, 360]`, step **1** |
| 15 | homogeneous `w` | ≈ `1` | `[-360, 360]`, step **1** |

Arithmetic: the entire cosine domain `[-1,1]` occupies **0.28 %** of a 720-unit track, and **one minimum step moves the cell by 50 % of its whole legal range**. For the perspective cells the reachable values adjacent to the correct `-0.001` are `0` and `-1`; the slider physically cannot express the value the cube is actually using. Ten of sixteen cells — 62.5 % of the grid — have a slider that is either a blunt instrument or an unusable one.

Only 6 cells (0, 5, 10 scale; 12, 13, 14 translate) get a preset matched to their quantity, and even there `scale` is `[0.4, 3]` — a mat4 scale entry is legitimately negative (mirroring), which the bounds forbid.

**Falsifier.** A source of truth showing `args[1..2,4,6,8,9]` of a CSS `matrix3d()` can legitimately exceed ±1 by orders of magnitude — the CSS Transforms L2 `matrix3d()` grammar and `mat4` semantics say otherwise (`useTransformState.ts` builds these from `mat4.create()`/`gl-matrix` composition). Or: a live drag showing the Slider snapping to a sub-step resolution — reka honours `step` exactly.

### D-4 · The only per-cell identification renders at 1.20–1.52 : 1 contrast

**MAJOR** · `MatrixEditor.vue:41-48` (`opacity-20 dark:opacity-75`) · WCAG 1.4.3 Contrast (Minimum) (AA)

The axis/transform glyph is the sole visual identification of which cell is which. It is drawn at `opacity-20` (light) / `opacity-75` (dark), coloured by the scoped `--axis-*` rules (`:142-157` → `style.css:109-112`), on the `tier="quiet"` Card.

Computed against the real tokens (`--card: hsl(30 85% 96%)` light / `hsl(26 22% 17%)` dark; `--foreground: hsl(24 10% 10%)` / `hsl(30 14% 90%)`; alpha-composited, sRGB relative luminance):

| glyph | light, opaque | **light @ .20** | dark, opaque | **dark @ .75** |
| --- | --- | --- | --- | --- |
| `x` `hsl(0 72% 54%)` | 4.16 | **1.33** | 3.11 | **2.29** |
| `y` `hsl(120 47% 47%)` | 2.59 | **1.20** | 4.99 | **3.43** |
| `z` `hsl(240 76% 58%)` | 6.15 | **1.36** | 2.10 | **1.68** |
| `w` = `--foreground` | 16.19 | **1.52** | 11.17 | **6.99** |

`--type-heading` is `1.618rem` = 25.9 px, which clears the WCAG "large text" threshold, so the bar is **3 : 1**. The light arm fails every cell by a factor of 2–2.5×. The dark arm fails `x` and `z`. Only dark-`w` and dark-`y` pass.

This is not a decorative flourish that may be dimmed: it is the label. Dimming it to illegibility while it is the *only* label is the design decision under challenge, not the opacity value itself.

**Falsifier.** (a) a demo rule raising the opacity or recolouring the glyph — grepped, the four scoped rules at `:142-157` are the whole story and appear verbatim in the build; (b) evidence the glyph is redundant with some other visible identification — there is none (D-2, D-5); (c) a different card background behind it. Note `tier="quiet"` composites `--glass-bg-quiet` over the stage, which can only move the ratio *toward* the stage colour — my figures use the opaque `--card`, the most favourable assumption available. **UNPROVEN-NEEDS-LIVE**: the exact composited backdrop for the SS-13 visual audit; the *failure* is robust to that composite (a 1.20 : 1 label cannot reach 3 : 1 by backdrop change alone at α = 0.2).

### D-5 · The cell labels are ambiguous and duplicated — three cells read `P` with subscript `w`

**MAJOR** · `transformMath.ts:4, 161-169` rendered at `MatrixEditor.vue:50-56`

`getAxisFromIx(i) = MATRIX_AXES[i % 4]` labels a cell by its **row within its column** (the `matrix3d` argument list is column-major). That is correct for the six cells the author had in mind and wrong or ambiguous for the other ten:

| cells | rendered label | problem |
| --- | --- | --- |
| 0, 5, 10 | `S`+`x`/`y`/`z` | correct |
| 12, 13, 14 | `T`+`x`/`y`/`z` | correct |
| **3, 7, 11** | `P`+`w`, `P`+`w`, `P`+`w` | **three identical labels**; conventionally these are the per-axis perspective terms `p_x`, `p_y`, `p_z` |
| **1, 2, 4, 6, 8, 9** | bare `y`,`z`,`x`,`z`,`x`,`y` | each letter appears **twice**; cell 1 and cell 9 are indistinguishable |
| 15 | bare `w` | homogeneous divisor, presented as an axis |

So 10 of 16 cells carry a label that is either shared with another cell or names the wrong thing. A user cannot answer "which cell am I editing?" from the grid — which is precisely the question D-1 and D-2 also leave unanswered, from three independent directions.

Register is inconsistent too: `MATRIX_AXES` is already lowercase (`transformMath.ts:4`), so `:47`'s `.toLocaleLowerCase()` is a no-op and `:56` renders a bare lowercase `x` at 25.9 px beside an uppercase `T`+subscript. Two typographic registers for one label class.

**Prose-quality sub-axis, recorded here rather than double-counted:** the component contains **no prose at all** — no heading, no legend, no tooltip, no help text, no `title`. There is nothing trite or clichéd to flag; the deficit is *absence*. A `mat4` editor that presumes column-major CSS `matrix3d()` argument order ships with zero explanation of that convention.

**Falsifier.** A legend, tooltip or docs surface elsewhere that disambiguates the ten cells. The mount site (`CubeScene.vue:173-179`) passes exactly five props — `matrix3dEnd`, `matrixCellMeta`, `superKey`, `onUpdateMatrixCell`, `onResetMatrix` — none of them labels; the sibling chrome (`ribbonContent`, `CubeScene.vue:183-202`) contributes only a Reset button and the Free/Fixed toggle; and `MatrixCellMeta` (`transformMath.ts:24-28`) has no description field for a label to come from.

### D-6 · Sixteen pill-radius inputs inside sixteen square cells — the "matrix" renders as a grid of circles

**MAJOR** · `MatrixEditor.vue:8-10, 16-20` × `glass-ui/dist/components/_shared/field-control.css` · glass-ui conformance / proportion

The cell wrapper is `aspect-square … rounded-lg shadow-sm`. The `Input` inside is `absolute top-0 left-0 h-full w-full` and passes **no** `rounded-*` utility, so glass-ui's rule survives untouched — verbatim from the shipped build:

```css
.field-control[data-kind=input]{block-size:var(--field-control-height);border-radius:var(--radius-pill)}
```

with `--radius-pill: 9999px` (`dist/styles/theme/radius.css`). On a square box, `9999px` is a **circle**.

Cell geometry is decidable. The pane is `width: var(--rail-width)` = `clamp(25rem, 33svi, 32rem)` = **400–512 px** (`design-idioms.css:47`, `ControlsPaneWrapper.css:127`). Less `CardContent`'s `p-3` (24 px) and three `gap-1` gutters (12 px), each cell is **91–119 px** square. Sixteen circles, 91–119 px across, 4 px apart, each sitting on a `rounded-lg` drop shadow whose corner radius it contradicts.

The half-undress compounds it. Utilities (layer `utilities`) beat `.field-control` (layer `components`), so `bg-transparent` and `p-0` win — but the consumer overrides *only* those two. Everything else in the glass control survives on a control the author intended to be a bare cell:

| declaration | fate |
| --- | --- |
| `background: var(--control-surface-bg)` | overridden by `bg-transparent` ✔ |
| `padding-inline: calc(1rem * var(--ui-scale))` | overridden by `p-0` ✔ |
| `border: 1.5px solid var(--control-surface-border)` | **survives** — a hard 1.5 px ring per cell |
| `border-radius: var(--radius-pill)` | **survives** — the circle |
| `box-shadow: var(--glass-rim-top), var(--glass-rim-bottom)` | **survives** — glass rim on a plate that was removed |
| `backdrop-filter: var(--control-surface-blur)` | **survives** — ×16 stacked blur layers over a transparent fill |

A rim highlight and a backdrop blur are the *material* of a glass plate. Deleting the plate and keeping the material is the definition of the bespoke-vs-glass failure mode. The right move is `size="sm"` + a radius token, or a plain `<input>`, not a glass control with its skin removed.

**Falsifier.** (a) any demo rule overriding `--radius-pill` or targeting `.field-control[data-kind=input]` — `grep -rn "field-control\|--radius-pill:" demo/` returns zero definitions, only unrelated `var(--radius-pill)` reads; (b) a `rounded-*` utility on the `Input` — line 18-20 read whole, absent; (c) a rail narrower than ~230 px, where cells would fall to a stadium rather than a circle — impossible at `clamp(25rem, …)`.

### D-7 · Selection is mouse-only; the keyboard can focus a cell but cannot select it

**MAJOR** · `MatrixEditor.vue:37-39` · WCAG 2.1.1 Keyboard (A)

```html
@click="storedControls.matrixOptions.selectedMatrixCell = i"
```

`@click` is the sole selection path. `Tab` into cell 7 and the Slider still edits whatever cell was last *clicked*. There is no `@focus`, no `@focusin`, no arrow-key roving, no `tabindex` management, no `aria-selected`. Keyboard users can type into any cell (the inputs are natively focusable) but can never retarget the Slider — the component's headline control.

A 4×4 grid of editable cells is the canonical roving-tabindex / `role="grid"` shape, and glass-ui ships `useTabRovingFocus` (cited by the census at `lane-frontend.md:264` for a different consumer), so the seam exists in-house.

**Falsifier.** A `@focus`/`@focusin`/`keydown` handler anywhere in the file, or a global delegated listener that sets `selectedMatrixCell` — `grep -n "selectedMatrixCell" demo/` gives 7 hits, all inside `MatrixEditor.vue`, only `:38` a writer. A live test showing a `click` event synthesised by keyboard focus would kill it; browsers do not do that.

### D-8 · No numeric-entry contract: three phantom props, a free-text field, no validation, no error state

**MAJOR** · `MatrixEditor.vue:28-36` × `glass-ui/dist/components/input/types.d.ts` · folds census **F-1**

```html
:start="matrixCellMeta[i].sliderOptions.bounds[0]"
:end="matrixCellMeta[i].sliderOptions.bounds[1]"
:step="matrixCellMeta[i].sliderOptions.step"
```

`InputProps` (read whole, `types.d.ts:3-24`) declares **18** members. `start`, `end` and `step` are **not among them**. `Input.vue` sets `inheritAttrs: false` and spreads `forwardedAttrs` — everything from `useAttrs()` except `aria-invalid` (`field-control-CeLay9Tk.js`) — onto the `<input>`. So these land as raw DOM attributes:

```html
<input type="text" start="-360" end="360" step="1" …>
```

`start` and `end` are not HTML attributes at all; `step` is defined only for `number`/`range`/date types and is inert on `type="text"` (glass-ui's default, `Input-DY7soIPd.js`: `type: { default: "text" }`). **The numeric bounds the author wrote are enforced by nothing.** Typing `9e9` into a scale cell is accepted verbatim and emitted upward as a string (`:33`, `updateMatrixCell(v, i)` — `to: number | string`).

The rest of the numeric affordance is missing too, and every piece of it exists on the API being used:

| available | used | consequence |
| --- | --- | --- |
| `inputmode` (`types.d.ts:8`) | ✘ | mobile users get a full QWERTY keyboard for a numeric field |
| `pattern` (`:16`) | ✘ | no client-side validity, so `:user-invalid` never fires |
| `invalid` (`:11`) + `[data-state=invalid]` styling in `field-control.css` | ✘ | **the component has no error state at all** — a fully-designed one ships in the dependency, unreachable |
| `type: "text"` default | left | `:user-invalid` on a text field with no `pattern` is unreachable by construction |

**State-coverage summary for this axis:** *empty* is structurally impossible (S-D5); *loading* does not apply (props are synchronous); *error* — **absent, and the mechanism is sitting unused in the dependency**; *RTL* — D-15; *forced-colors* — D-16.

F-1 is the proximate cause: with glass-ui unpinned and unlocked, nothing in CI could have failed when these three props became (or remained) non-existent — unknown attrs fall through silently by design.

**Falsifier.** A `start`/`end`/`step` member appearing in `InputProps` — the `.d.ts` and the runtime `props` block in `Input-DY7soIPd.js` were both read whole; neither has them. Or a demo-level rule/handler clamping the typed value — `updateMatrixCell` (`:122-124`) is a bare re-emit.

### D-9 · `matrixOptions.fixed` is write-only: the ribbon's Lock/Free toggle changes nothing

**MAJOR** · `MatrixEditor.vue:115-118` vs `:28-32`, with `CubeScene.vue:193-199`

The target declares the flag's default:

```js
const defaultMatrixOptions = { fixed: true, selectedMatrixCell: 0 };
```

`CubeScene.vue:194` gives it a full ribbon control — a `Button` with a `Lock`/`LockOpen` icon and a `"Free"`/`"Fixed"` label — that flips it. Repository-wide, `grep -rn "matrixOptions" demo/` yields **12 hits**: one type declaration (`controlOptionsStore.ts:26`), one default/seed (`MatrixEditor.vue:120`), one toggle (`CubeScene.vue:194`), two label reads (`CubeScene.vue:197-198`), and seven `selectedMatrixCell` lines (`MatrixEditor.vue:22,38,64,71,77,82,87` — one write, six reads). **Nothing reads `fixed` for any purpose other than rendering its own toggle.**

Its evident intent is visible three lines up in the same file: the display formatter at `:28-32` hard-codes `.toFixed(2)`. The flag was meant to gate fixed-point vs. free formatting; the formatter was hard-coded and the flag was orphaned. The result is a visible, prominent, persisted control that produces no observable effect — the worst class of affordance defect, because it teaches the user that the UI lies.

**Falsifier.** Any read of `.fixed` outside `CubeScene.vue:194,197,198` — the grep is exhaustive over `demo/` and the flag is never passed as a prop to `MatrixEditor` (`CubeScene.vue:173-179` passes only `matrix3dEnd`, `matrixCellMeta`, `superKey` and two handlers).

### D-10 · The editor seeds an undeclared member into a persisted store, in violation of that store's stated law — and the read path turns a stale bucket into a render crash

**MAJOR** · `MatrixEditor.vue:113-120, 126-134` vs `demo/state/controlOptionsStore.ts:26, 90-96`

The store declares:

```ts
matrixOptions?: { fixed: boolean };          // controlOptionsStore.ts:26
```

`selectedMatrixCell` is **not** a member of that type, yet the target writes it into the persisted bucket (`:120`) and reads it six times. The store also states its own boundary, in a comment, ten lines below:

```ts
// Persisted pre-U.B4 buckets may predate the editor-state member. The store
// owns this one migration/default boundary; editor components only consume it.
```

`MatrixEditor.vue:120` (`storedControls.matrixOptions ??= defaultMatrixOptions`) is a leaf editor component performing exactly the migration/default the store reserves to itself. That is a design-authority violation with the authority's own words as the citation.

The failure mode is concrete. `??=` fires only when `matrixOptions` is `null`/`undefined`. A `localStorage` bucket shaped as the type declares — `{ fixed: true }`, no `selectedMatrixCell` — passes through untouched, and then:

- `matrixCellMeta[undefined].sliderOptions.bounds[0]` (`:75-79`) → `TypeError`, **during render**;
- `matrixCellValue(undefined)` (`:63-65` → `:126-134`) → the hand-written `RangeError("Matrix cell undefined is outside the matrix3d value.")`, **during render**.

Throwing inside a render binding tears down the subtree: the whole `matrix-controls` tabpanel (`CubeScene.vue:170-181`) goes blank. The guard at `:126-134` — which reads as defensive hygiene — actually *upgrades* a recoverable undefined into a hard crash, because it sits in a render path with no boundary above it.

`storeUtils.ts:11-21` mitigates but does not close: `STORE_TTL_MS` is 7 days, so a bucket written within the window survives a code change intact. Any ordering in which `CubeScene.vue:194`'s toggle writes `fixed` before `MatrixEditor` mounts produces exactly the hazardous shape.

**Falsifier.** (a) `selectedMatrixCell` appearing in `StoredAnimationGroupControlOptions` — `controlOptionsStore.ts:26` read whole, it does not; (b) a store-level migration seeding it — `getStoredAnimationGroupControlOptions` (`:66-97`) migrates `keyframeControls` only; (c) a Vue `errorCaptured`/`onErrorCaptured` boundary above the tabpanel — `CubeScene.vue:170-181` mounts it bare. **UNPROVEN-NEEDS-LIVE**: whether a real user's bucket is currently in the hazardous shape.

### D-11 · The display formatter silently reports non-zero perspective terms as `0`

**MAJOR** · `MatrixEditor.vue:28-32` · truthfulness of a numeric editor

```js
(Math.round(value.payload.value * 100) / 100).toFixed(2).replace(/\.0*$/, "")
```

Two rounding stages, both to 2 dp (the `Math.round(x*100)/100` is redundant before `.toFixed(2)`). Evaluated:

| stored | displayed | |
| --- | --- | --- |
| `1` | `"1"` | |
| `0.5` | `"0.50"` | |
| `1.2` | `"1.20"` | |
| `0.707106` | `"0.71"` | lossy but legible |
| **`0.001`** | **`"0"`** | **a live perspective term reads as zero** |

Cells 3/7/11 are exactly where sub-0.005 magnitudes live: `perspective(1000px)` contributes `-1/1000 = -0.001`. The editor displays `0`. A user reading the grid concludes there is no perspective in the matrix while the cube is visibly perspective-projected — and if they then type `0` to "confirm" it, they destroy a value the display told them was already zero.

The same expression also produces **inconsistent decimal width** across a tabular grid (`"1"`, `"0.50"`, `"1.20"`, `"0.71"`), so the decimal points do not align down a column even in a monospace face. That is the ordinary form of the defect; the `0.001 → "0"` case is the severe one, which is why this sits at MAJOR rather than MINOR.

**Falsifier.** A separate high-precision readout of the matrix elsewhere in the cube surface — `CubeScene.vue` and `CubeTarget.vue` render no numeric matrix. Or evidence that cells 3/7/11 are always exactly 0 in this demo — `useTransformState.ts` composes via `gl-matrix` `mat4` and the perspective row is user-reachable through the very slider under audit (D-3).

---

## 4. MINOR

### D-12 · Type-hierarchy inversion — the decorative label is 30 % larger than the editable value

**MINOR** · `MatrixEditor.vue:18` (`text-body`) vs `:43` (`text-heading`)

`--type-heading: 1.618rem` = **25.9 px**, fixed. `--type-body: clamp(1rem, 0.92rem + 0.27vw, 1.375rem)` = **16–22 px**. The watermark glyph — a static, non-interactive, 20 %-opacity decoration — is rendered one to two full rungs *above* the primary content, the editable number. Rank in the type ladder should track rank in the information hierarchy; here it is inverted.

**Falsifier.** A demo override of `--type-heading`/`--type-body` — `grep -rn -- "--type-heading:\|--type-body:" demo/` returns **0 definitions**; both resolve from `glass-ui/dist/styles/typography/scale.css`.

### D-13 · `text-body` + `font-mono` hand-rolls a rung glass-ui already ships

**MINOR** · `MatrixEditor.vue:18-19` · glass-ui conformance

The component composes two utilities to reach "monospace numeric text". glass-ui ships the rung as one class — `styles/typography/utilities.css`, verbatim:

```css
@utility text-mono-small { font-family: var(--font-mono);
                           font-size: var(--type-small);
                           line-height: var(--type-leading-small); }
```

and it is **emitted in the shipped build** (`text-mono-small`: 1 hit; `text-mono-caption`: 1 hit). Beyond tidiness, the hand-roll picks the wrong size axis: `--type-body` is a viewport-scaling *prose* rung (`0.92rem + 0.27vw`) applied to dense tabular numerics inside a `clamp`-bounded rail, so type grows with the viewport while the cell does not. `--type-small`/`--type-caption` are the registers for this shape.

**Falsifier.** `.text-mono-small` being absent from the build — grepped, present. Or a demo rule already repointing `text-body` for this context — none exists.

### D-14 · No reset affordance in the editor; `resetMatrix` and its emit are dead

**MINOR** · `MatrixEditor.vue:110, 136-138`

```js
const resetMatrix = () => { emit("resetMatrix"); };   // :136-138 — never referenced
```

Read whole, the template never calls it. The `"resetMatrix"` emit (`:110`) is declared, wired by the parent (`CubeScene.vue:178`, `onResetMatrix`), and **never fired** — the parent's ribbon calls its own local `resetMatrix()` directly (`CubeScene.vue:189`). So the editor's one destructive-recovery affordance lives in a separate chrome region, and the component ships a dead function plus a dead emit contract that a reader will reasonably mistake for a live seam.

**Falsifier.** Any `resetMatrix` reference in the template — 158 lines read whole, `grep -n "resetMatrix" MatrixEditor.vue` gives `:110`, `:136`, `:137` only.

### D-15 · RTL: a mathematically ordered grid with no direction guard

**MINOR** (latent) · `MatrixEditor.vue:5-7, 18, 43`

`grid-cols-4` in an RTL context lays columns right-to-left, mirroring a `matrix3d()` argument order that is *not* mirror-symmetric — column 3 (translation) would render on the left. The grid carries no `dir="ltr"`, no `[dir]` handling, and no comment acknowledging the choice. The absolute positioning also uses physical `top-0 left-0` rather than logical `start-0` (benign here, since `w-full h-full` makes them equivalent, but it is the same habit).

Severity is MINOR because the demo has **no RTL infrastructure at all** — `grep -rn 'dir="rtl"\|direction: rtl\|\[dir=\|:dir(' demo/` returns zero hits — so this is latent, not live. It is recorded because a mathematical grid is one of the few surfaces that must *opt out* of RTL rather than adapt to it, and that decision is undocumented.

**Falsifier.** A `dir` attribute or logical-property treatment on the grid, or an established repo-wide LTR lock — neither exists.

### D-16 · Forced-colors: `opacity` is not remapped, so the labels stay invisible in High Contrast Mode

**MINOR** · `MatrixEditor.vue:45-46`

Forced-colors mode overrides `color`, `background-color`, `border-color` and `fill`/`stroke` — it does **not** override `opacity`. `opacity-20` therefore survives verbatim, and the axis glyph remains at α = 0.2 against a forced `Canvas`, i.e. still far below any usable ratio. Simultaneously `bg-transparent` + the surviving `backdrop-filter` (D-6) means the cell has no forced plate to sit on.

glass-ui ships forced-colors handling (`styles/accessibility.css`, `styles/glass/a11y-fallback.css`, `styles/utilities/a11y-overrides.css`); the demo ships **none** (`grep -rn "forced-colors" demo/` → 0). This component's `opacity`-based dimming is the one pattern glass-ui's fallbacks structurally cannot repair for it.

**Falsifier.** A `@media (forced-colors: active)` block in `demo/` or a glass-ui rule that neutralises consumer `opacity` under forced colors — neither exists in the read set.

### D-17 · The focus ring bleeds into the 4 px gutter and onto the neighbouring cell

**MINOR** · `MatrixEditor.vue:6` (`gap-1`) × `field-control.css` focus rule

```css
.field-control:focus-visible{ border-color:…; box-shadow:var(--focus-ring-shadow); outline:none }
--focus-ring-width: 2px;
--focus-ring-shadow: 0 0 0 2px …30%, 0 0 8px …15%;
```

The ring is a 2 px spread plus an 8 px glow, painted outside a circle that already fills its cell edge-to-edge (`absolute … h-full w-full`). The gutter is `gap-1` = **4 px**. The 2 px hard ring consumes half the gutter and the 8 px glow washes across it onto the adjacent cell's rim, on all four sides. With no `overflow` clip on the wrapper and `z-10` on the focused input, the focused cell's ring overlays its neighbours.

**Falsifier.** A larger gutter (it is `gap-1`, read at `:6`), a clipping context (the wrapper at `:8-10` sets none), or a demo override of the ring tokens (`grep -rn -- "--focus-ring-shadow:\|--focus-ring-width:" demo/` → **0 definitions**; `design-idioms.css:76-77` and `playback-idiom.css:73` *read* `--focus-ring-shadow`, they do not redefine it). **UNPROVEN-NEEDS-LIVE**: the perceptual severity of the overlap; the geometry is decidable, the annoyance is not.

### D-18 · `min-h-[3.5rem]` can never bind at any reachable pane width

**MINOR** · `MatrixEditor.vue:9`

`aspect-square min-h-[3.5rem]` guards against the cell collapsing below 56 px. Computed against the real geometry: desktop rail `clamp(25rem, 33svi, 32rem)` = 400–512 px, less `p-3` (24) and three `gap-1` gutters (12) ⇒ cells **91–119 px**. The mobile drawer at `padding-inline: 0.75rem` needs a viewport below ~280 px to reach 56 px. The constraint is unreachable dead weight — and if it *ever* bound it would silently break `aspect-square`, producing non-square cells with no other signal. (Emission confirmed: `.min-h-\[3\.5rem\]` is present in the build, so it is live, merely inert.)

**Falsifier.** A narrower mount context for `MatrixEditor` — `CubeScene.vue:173` is the sole mount site and it renders inside the controls pane; a viewport below 280 px would also vindicate the guard.

---

## 5. INFO

### D-19 · `.matrix-grid` is a dead hook class

**INFO** · `MatrixEditor.vue:5` — `grep -F -c "matrix-grid"` over the 571 110-byte build: **0**. No rule anywhere in `demo/`, `glass-ui`, or the bundle. A semantic hook that hooks nothing; readers will search for its stylesheet.

**Falsifier.** A rule or a JS/E2E selector using it — `grep -rn "matrix-grid" demo/` returns only line 5 itself.

### D-20 · `--color` is a dead one-hop indirection, and unnamespaced (folds `lane-frontend.md:441`)

**INFO** · `MatrixEditor.vue:142-157`

```css
.x { --color: var(--axis-x); color: var(--color); }
```

The custom property is declared and immediately consumed once, in the same rule, by the same selector. Nothing else in the component reads `var(--color)`. The indirection buys nothing here — and the shipped build shows where it was copied from: `CubeAxisLines.vue`'s `.x[data-v-2b59f7a3]{--color:var(--axis-x);transform:rotateX(0)}`, where descendants *do* read it. Cargo-culted.

It is also the census's flat-namespace hazard in miniature: `--color` is a maximally generic name in a codebase with **zero** `--kf-*` prefixed tokens (`lane-frontend.md:441,596`). Scoping saves it today; it is exactly the shape that will not survive a `:root`-level or slotted-content collision.

**Falsifier.** A descendant reading `var(--color)` — the only descendant is `<sub>` (`:52-54`), which inherits `color` directly and needs no variable.

### D-21 · Two read paths for the same datum

**INFO** · `MatrixEditor.vue:11/29` vs `:63/126-134`

The grid reads the cell through the `v-for` binding (`value.payload.value`, `:29`); the Slider reads the same array through `matrixCellValue()` (`:126-134`), which re-derefs `props.matrix3dEnd.args` and throws on miss. Two shapes, two failure behaviours (silent `undefined` vs. `RangeError`) for one structure. Cosmetic today; it is the asymmetry that makes D-10's crash path non-obvious.

**Falsifier.** A behavioural difference requiring the split — none: both read `args[i].payload.value`.

---

## 6. Superlatives (L-18 runs both ways)

### S-D1 · The `z-10` provenance comment is the house standard the census asked for

`MatrixEditor.vue:13-15` — three lines of comment for one utility, and they say the right thing:

```
z-10 on the Input below is LOCAL stacking: the editable value field overlays the
decorative axis-label div within the same matrix cell; not an editor z-contract layer.
```

`lane-frontend.md:442` records that the demo forbids raw `z-[N]` and single-sources the z-scale from glass-ui, with one acknowledged exception. This is the only component I have read that pre-empts the audit question by *scoping its own exception* — declaring the stacking local and explicitly disclaiming membership in the z-contract. Cheap to write, expensive to reconstruct later.

**Falsifier (runs both ways).** If the `z-10` in fact interacts with an ancestor stacking context — the wrapper at `:8-10` is `relative` with no `z-*`/`isolate`, and the only siblings in the cell are the Input and the label div, so the comment is accurate.

### S-D2 · PRM-honest by construction: zero bespoke motion

The file declares no `transition`, no `animation`, no `@keyframes`, no `scroll-behavior`. `grep -n "transition\|animat\|@keyframes" MatrixEditor.vue` → 0. It therefore cannot lie about `prefers-reduced-motion` — the strongest form of PRM honesty, since there is nothing to gate. Its one moving dependency (`Slider`) routes through glass-ui's `useMotionAxis`, which handles the reduced case internally. Against the census's PRM finding (`lane-frontend.md:462-490`, the cube contributing zero CSS PRM blocks), this component is **not** part of that debt.

**Falsifier (runs both ways).** A transition inherited from `.field-control` — the rule was read whole from the shipped build and declares none.

### S-D3 · Correct glass-ui vocabulary at the container level

`MatrixEditor.vue:2-3` — `<Card cartoon tier="quiet">` + `<CardContent>`. Both props are real and both values are legal: `CardProps.cartoon?: boolean` ("Static Memphis edge treatment; it does not add command behavior", `Card.vue.d.ts`), and `tier` inherits `SurfaceProps` where `SURFACE_TIERS = ["wash","quiet","resting","floating","overlay"]` (`_shared/axes.d.ts:5`). No bespoke card, no hand-rolled shadow, no re-implementation of a surface tier. This is the half of the census's `G` grade the tree does uphold.

**Falsifier (runs both ways).** `"quiet"` not being a member of `SURFACE_TIERS`, or `cartoon` not being a `CardProps` member — both verified in the shipped `.d.ts`.

### S-D4 · The axis colours speak one language with the 3D scene

`:142-157` reads `--axis-x/y/z/w` — the demo's declared 3-D axis authority at `style.css:108-112` (`/* ── 3D axis color tokens ── */`) — instead of inlining hex. The four rules are structurally identical to `CubeAxisLines.vue:78-86`, so the axis lines drawn *in the cube* and the axis glyphs *in the matrix editor* are guaranteed to agree, forever, by construction. `--axis-w: var(--foreground)` is a thoughtful touch: the homogeneous row is not an axis and correctly gets no hue of its own.

**Falsifier (runs both ways).** A hard-coded colour in the target — the scoped block is 17 lines, read whole, and appears verbatim in the shipped build. (D-4's contrast failure is the *opacity*, not the colour source; the tokens themselves clear 3:1 opaque in every light-arm case except `y`.)

### S-D5 · Pure-view data flow: the editor never writes the matrix

`:102-106` takes `matrix3dEnd` and `matrixCellMeta` as props; `:108-111` and `:122-124` push every mutation upward as an emit. The component holds no local copy of the matrix, no `watch`, no derived cache — so it cannot desynchronise from `useTransformState`, and there is no reconciliation bug possible in this file. It also makes the *empty* state structurally unreachable: `createMatrix` (`transformMath.ts:69-89`) throws unless the array is exactly 16 finite numbers, so `v-for` over `args` always yields exactly 16 cells. An empty-state design is correctly absent because empty cannot occur.

**Falsifier (runs both ways).** A local matrix ref or a `watch` on the prop — `grep -n "ref(\|watch(\|computed(" MatrixEditor.vue` → zero. The one thing the component *does* write is the selection, into the shared store, which is D-10's finding — and it is the exception that proves the rule.

---

## 7. Tally

| severity | ids | n |
| --- | --- | --- |
| **BLOCKER** | D-1, D-2 | **2** |
| **MAJOR** | D-3, D-4, D-5, D-6, D-7, D-8, D-9, D-10, D-11 | **9** |
| **MINOR** | D-12 … D-18 | **7** |
| **INFO** | D-19, D-20, D-21 | **3** |
| **defects total** | | **21** |
| **superlatives** | S-D1 … S-D5 | **5** |

**The one-line verdict.** A component with excellent bones — pure-view data flow, correct container vocabulary, disciplined z-index prose, single-sourced axis colour, zero motion to lie about — whose entire *interaction* layer is broken at the seams: the selected cell is unmarked because of a missing space character (D-1), the seventeen controls are anonymous (D-2), the slider that edits them is scaled for degrees while ten of sixteen cells hold direction cosines (D-3), and the labels that would disambiguate them are both duplicated (D-5) and rendered at 1.2 : 1 (D-4). Four independent defects converge on the same unanswerable question: *which cell am I editing?*

**Claims marked UNPROVEN-NEEDS-LIVE for SS-13:** the composited backdrop behind the axis glyphs (D-4 — the failure is robust to it, the exact ratio is not); the perceptual severity of the focus-ring overlap (D-17); whether any real persisted bucket is currently in the hazardous shape (D-10). Everything else in this document is decided from source, from the shipped 7.0.0 `.d.ts`/CSS, or from the 2026-07-16 build artifact.
