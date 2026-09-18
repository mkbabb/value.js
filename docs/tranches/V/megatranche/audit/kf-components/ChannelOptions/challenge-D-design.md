claude-opus-5[1m]

# CHALLENGE · `ChannelOptions.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/ChannelOptions.vue` (609 L)
**Mode** static, read-only, source-derived. No browser, no installs, no dev server. Nothing in keyframes.js was written.
**Evidence roots**
- target + every file it imports (read whole);
- the **installed** `@mkbabb/glass-ui@7.0.0` at `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy the demo actually resolves against;
- `reka-ui` dist (glass-ui's render substrate);
- `demo/DESIGN.md` — the demo's self-declared design authority;
- hitherto corpus: `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` (F-1, S-1..S-8).

**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its falsifier. **A false defect is worse than a missed one** — three candidate findings were investigated, failed their falsifier, and are recorded as non-defects in §5 rather than counted.

**Tally** 20 defects — **3 BLOCKER**, 8 MAJOR, 9 MINOR — and **5 superlatives** (L-18 both ways).

---

## 0. Headline

| # | Finding | Sev |
|---|---|---|
| **D-1** | **Twelve prop bindings across the five option fields bind nothing.** `tooltip`, `label-class`, `descriptions`, `is-open` are not props of any glass-ui `Labeled*` component in 7.0.0. Every field's explanatory tooltip, every field label's type register, both dropdowns' per-item descriptions, and the entire exclusive-open mutex are dead fallthrough attributes. | **BLOCKER** |
| **D-2** | **Collapsed panels stay in the tab order and the AT tree.** `opacity:0` + `pointer-events:none`, no `inert`. The sibling file names this exact defect and fixes it correctly 200 lines away. | **BLOCKER** |
| **D-3** | **The easing trigger renders a run-on: `ease-in-outslow start & end`.** Name and description both sit in `SelectItem`'s default slot → both land inside reka `SelectItemText`, whose `textContent` is what `SelectValue` prints. glass-ui ships a dedicated `description` slot, rendered *outside* `SelectItemText`, unused. | **BLOCKER** |
| D-4 | `.gold-shimmer` is inert at this call site — a `@layer utilities` color utility out-cascades its `@layer components` `color: transparent`. The sole signal that the current easing has a detail editor never paints. | MAJOR |
| D-5 | Gold pencil glyph computes **2.08:1** on the light card plate. WCAG 1.4.11 wants 3:1. | MAJOR |
| D-6 | The "advanced" chevron — the only indicator that the row navigates — computes **2.01:1**. | MAJOR |
| D-7 | WCAG 2.5.3 *Label in Name* (Level A): visible label `easing`, accessible name `Timing function`. | MAJOR |
| D-8 | The `easing` tooltip is unreachable by keyboard **and** by touch — `as-child` onto a non-focusable `<label>`. | MAJOR |
| D-9 | Two catalogue entries (`cubic-bezier`, `steps`) exist only to open an editor, and selecting them opens nothing. | MAJOR |
| D-10 | 24×24 CSS-px pencil target; glass-ui **explicitly excludes** `compact` from its own coarse-pointer 44px floor; the demo's own `.tap-floor` idiom is unused. | MAJOR |
| D-11 | `∞` is a display-only glyph the field cannot accept back, and the same concept renders two ways in one input. | MAJOR |
| D-12 … D-20 | see §3 | MINOR ×9 |

---

## 1. BLOCKERS

### D-1 · Twelve dead prop bindings — the whole explanatory layer of the option grid is inert · **BLOCKER**

**Claim.** Of the props ChannelOptions passes to glass-ui's `labeled-field` family, **four names do not exist** on any of `LabeledField` / `LabeledInput` / `LabeledSelect` in the installed 7.0.0. Vue silently demotes each to a fallthrough attribute, which lands as a dead DOM attribute on `<div class="labeled-field">`.

**Provenance — the call sites (12 bindings, 5 fields):**

| binding | ChannelOptions.vue lines |
|---|---|
| `tooltip="…"` | 32, 51, 79, 101, 125 |
| `label-class="text-small font-medium text-muted-foreground"` | 31, 50, 78, 100, 124 |
| `:descriptions="…"` | 98, 122 |
| `:is-open="isOpen('…')"` | 96, 120 |

**Provenance — the contract.** `node_modules/@mkbabb/glass-ui/dist/components/labeled-field/types.d.ts`:

```ts
export interface LabeledFieldCommonProps {
    label: string; description?: string; requirement?: LabelRequirement;
    layout?: LabeledFieldLayout; errorLive?: LabeledFieldErrorLive;
}
export interface LabeledSelectProps extends LabeledFieldCommonProps {
    modelValue: string; items: readonly string[];
    open?: boolean;              // ← `open`, NOT `isOpen`
    placeholder?: string; invalid?: boolean; disabled?: boolean; required?: boolean;
}
```

No `tooltip`. No `labelClass`. No `descriptions`. `LabeledInputProps = Omit<InputProps,"class"> & LabeledFieldCommonProps`, and `components/input/types.d.ts` `InputProps` has **no index signature** — nothing absorbs the extras.

Corroborated against the compiled runtime, which is the authority on what is actually declared:

```
$ grep -c "tooltip\|labelClass\|label-class" node_modules/@mkbabb/glass-ui/dist/labeled-field.js
0
$ grep -c "tooltip" node_modules/@mkbabb/glass-ui/dist/label-DJA3eNLS.js
0
```

`LabeledField`'s compiled `props` block is exactly `{invalid, disabled, label, description, requirement, layout, errorLive}`, and its `Label` child is rendered with only `id / for / requirement / disabled` — there is no seam for a tooltip or a label class.

**Consequences, itemised.**

1. **Every field tooltip is gone.** "Animation length (e.g. 5s, 200ms)", "Delay before start", "Repeat count (number or 'infinite')", "Playback direction", "Style applied when not playing" — five strings authored, five strings rendered nowhere. Not even as a native `title` (the attribute name is `tooltip`, which HTML does not define). A user has no way to learn what `fill mode` means. This is the *entire* explanatory affordance of the panel.
2. **Every field label's type register is gone.** `text-small font-medium text-muted-foreground` never reaches the `<label>`. The labels render in whatever `LabeledField`'s own `.labeled-field-copy` / `Label` styling gives them. Note that `LayerConfigPanel.vue` (the advanced sub-pane, mounted into the *same card*, ChannelOptions.vue:359–368) passes **no** `label-class` at all — so the author's mental model is "the main pane's labels are overridden, the advanced pane's are not," and the tree delivers one uniform register for both. The intended two-register distinction does not exist, and neither does the one that was written.
3. **Both dropdowns lose their per-item descriptions.** `DIRECTION_DESCRIPTIONS` / `FILL_MODE_DESCRIPTIONS` (`utils/reference-data/animationDescriptions.ts:1–13`) are authored, imported (ChannelOptions.vue:445–449), bound — and dropped. The compiled `LabeledSelect` renders each item as bare `{{ item }}` (`labeled-field.js`, `renderList(e.items, (e) => … v(T(e), 1))`). So `direction` offers `normal / reverse / alternate / alternate-reverse` with no gloss, while the easing dropdown twelve lines below hand-builds a two-column name+description row. Two dropdowns, two grammars, in one card.
4. **The exclusive-select mutex is one-way and therefore non-functional.** `openSelect` (ChannelOptions.vue:488–493) is documented as "only one dropdown open at a time". `@update:open` **is** a declared emit, so `setOpen` runs and the ref updates. But the controlled `open` prop is never received (`is-open` ≠ `open`), so reka's Select stays **uncontrolled** and the mutex state is written and never read. Opening `direction` cannot close `fillMode`. The composable is bookkeeping for a mechanism that isn't wired. Note that `LayerConfigPanel.vue:11,17` repeats the same `:is-open` / `setOpen` pair — the defect propagates through the prop-drilled `isOpen`/`setOpen` pair at ChannelOptions.vue:363–364.

**Why it survived.** `package.json:37` — `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`. **There is no `vue-tsc` anywhere in the repo** (`grep -rn "vue-tsc" package.json .github/workflows/` → nothing). Plain `tsc` does not parse SFC templates, so `tsconfig.json:47`'s `"include": ["src/", "demo/"]` typechecks the `<script setup>` blocks' *imports* and nothing about the markup. Twelve excess-prop errors that `vue-tsc` would flag on sight are invisible to the gate that exists.

**Falsifier.** Any one of: (a) a `tooltip` / `labelClass` / `descriptions` prop, or an `isOpen` alias, appearing in `components/labeled-field/types.d.ts` or in `labeled-field.js`'s compiled `props` objects; (b) an index signature on `InputProps` that would make these legal passthroughs with meaning; (c) a demo-side global CSS rule keyed on `[tooltip]` or `[label-class]` that resurrects them (`grep -rn "\[tooltip\]\|\[label-class\]" demo/styles/` → nothing); (d) `vue-tsc` appearing in the check script and passing. None hold.

---

### D-2 · The two collapsed panels keep every control in the tab order and the AT tree · **BLOCKER**

**Claim.** All three `panel-row`s are permanently mounted. Inactive rows are hidden with `grid-template-rows: 0fr` + `overflow:hidden` + `opacity: 0` + `pointer-events: none` — **none of which removes a descendant from sequential focus navigation or from the accessibility tree.** A keyboard user tabbing off `fill mode` lands inside a zero-height, invisible panel.

**Provenance.**

- ChannelOptions.vue:303–324 — the detail panel row, always rendered, always containing `<TimingFunctionPanel>` → glass-ui `<EasingPicker>` (a draggable curve canvas) + a `<Button aria-label="back to controls">` (`TimingFunctionPanel.vue:15–23,32–41`).
- ChannelOptions.vue:327–371 — the advanced sub-pane row, always rendered, containing a `<DockControl>` Back button (337–345) and, when `layerConfig` is present, `LayerConfigPanel`'s `LabeledSelect` + number `Input` + `LabeledSlider` + `LabeledSwitch` (`LayerConfigPanel.vue:8–66`).
- ChannelOptions.vue:576–583 — the entire hiding mechanism:

```css
.panel-row--inactive > .panel-content { opacity: 0; pointer-events: none; }
```

`opacity: 0` is a paint-time property; `pointer-events: none` gates hit-testing only. Neither is `visibility: hidden`, `display: none`, `inert`, nor `aria-hidden`. `overflow: hidden` on a `0fr` grid row clips the box; the children keep their generated boxes and remain focusable.

**The in-tree contradiction — this is decisive.** The sibling that *mounts* this component names the defect and fixes it, `ChannelControls.vue:118–137`:

> *"…toggles visibility via the `.inactive` class + `inert`. **`inert` (not bare aria-hidden, which leaves focusable Monaco descendants in the tab order — the aria-hidden-focus a11y defect)** takes the cached pane out of BOTH the tab order and the AT tree while inactive; the focus-move on reveal restores it."*

```vue
:class="['monaco-pane', keyframesActive ? '' : 'inactive']"
:inert="!keyframesActive"
:tabindex="keyframesActive ? 0 : -1"
```

The Monaco pane gets `inert`. ChannelOptions' own two hidden panels — sitting one level *inside* that same pane cluster — get nothing. The house rule is written down, enforced next door, and unapplied here.

**Severity rationale.** This is not a cosmetic miss: it makes the panel's primary keyboard traversal path terminate in an invisible sink containing a *canvas drag surface*. It is BLOCKER on the DESIGN axis because keyboard/AT is a first-class design surface, and because the correct remedy is already authored in the same directory.

**Falsifier.** Any of: an `inert` / `aria-hidden` / `visibility:hidden` / `content-visibility:hidden` binding on `.panel-row--inactive` or `.panel-content`; a `v-if` gating the detail/advanced rows; an ancestor applying `inert` to the whole `ChannelOptions` subtree while a panel is closed (`ChannelControls.vue:100–114` renders it in a plain active `role="tabpanel"` div with **no** `inert`); or a global rule in `demo/styles/` setting `visibility` off `[class*="panel-row--inactive"]` (`grep -rn "panel-row" demo/styles/` → nothing; `.panel-stack` and `.panel-row*` exist only inside this SFC).

---

### D-3 · The easing trigger prints a run-on concatenation; glass-ui's `description` slot goes unused · **BLOCKER**

**Claim.** The closed easing control does not read `ease-in-out`. It reads **`ease-in-outslow start & end`** — the curve name and its gloss, concatenated with no separator, then truncated by a `line-clamp-1`.

**The chain, each link sourced.**

1. **The call site puts both spans in the default slot.** ChannelOptions.vue:240–271:

```vue
<SelectItem :value="curveItem.name" class="pr-2">
    <span class="flex w-full min-w-0 items-center gap-1.5">
        <span data-register="code" class="font-mono normal-case">{{ curveItem.name }}</span>
        <span class="text-dropdown-secondary … ml-auto pl-2 …">{{ curveItem.description }}</span>
    </span>
</SelectItem>
```

2. **glass-ui wraps the default slot in reka `SelectItemText`, and offers a separate `description` slot outside it.** `dist/select-DD6Ly6xg.js`, `SelectItem`:

```js
c("div", K /* class:"flex flex-col gap-0.5 min-w-0" */, [
    l(_(w) /* SelectItemText */, { default: v(() => [ g(t.$slots, "default") ]) }),
    g(t.$slots, "description")          // ← rendered OUTSIDE SelectItemText
])
```

3. **`SelectItemText` publishes its raw `textContent` as the option label.** `reka-ui/dist/Select/SelectItemText.js`:

```js
const optionProps = computed(() => ({
    value: itemContext.value, disabled: itemContext.disabled.value,
    textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? ""
}));
```

4. **`SelectValue` prints exactly that string.** `reka-ui/dist/Select/SelectValue.js`:

```js
list = [ getOption(rootContext.modelValue.value)?.textContent ?? "" ];
const slotText = computed(() => selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder);
```

5. **No separator survives.** Vue's default template whitespace mode is `condense`, which deletes whitespace-only text nodes containing a newline — and `vite.config.ts` sets no `template.compilerOptions.whitespace`. The two `<span>`s in the source are separated only by newline+indent. `textContent` is therefore `"ease-in-out" + "slow start & end"` with **zero** intervening character.

**Blast radius.** This string is (a) the always-visible resting state of the easing field — the first thing a user reads; (b) the accessible name contributed to the `combobox` (compounding D-7); (c) squeezed through `SelectTrigger`'s `[&>span]:line-clamp-1` (`select-DD6Ly6xg.js`), so on a narrow rail it truncates mid-garble.

**The design-system half.** glass-ui hands the demo the exact two-part item shape it wants: `SelectItem`'s outer `div` is already `flex flex-col gap-0.5 min-w-0` (name over description), with `description` as a first-class slot. The call site instead injects a `flex … items-center` span *inside* the default slot to force a row, which (i) fights the primitive's stacking, (ii) poisons the trigger label, and (iii) re-authors the secondary-text register (`text-dropdown-secondary`) that the `description` slot would have supplied. This is `lane-frontend.md`'s bespoke-vs-glass pattern (S-1..S-7) reappearing *inside* an adopted primitive rather than as a whole forked component — a shadow at the slot level, which the census's file-granular sweep could not see. **Contradiction of the census by refinement, not by disagreement:** `lane-frontend.md §3` scores `ChannelOptions` as a clean glass consumer (`G`, 8 primitives). It consumes the imports and misuses the contracts.

**Falsifier.** Any of: glass-ui's `SelectItem` rendering the default slot *outside* `SelectItemText`; reka's `SelectValue` deriving its label from `value` rather than `textContent`; a `text-value` prop on the `SelectItem` at ChannelOptions.vue:240–244 (there is none — reka's `textValue` prop exists and would override the derived label, and it is not passed); a `whitespace: 'preserve'` compiler option in `vite.config.ts` (absent — and it would only insert a newline, still not a designed separator); or a custom default-slot on `<SelectValue>` (ChannelOptions.vue:220–222 passes only `placeholder`).

---

## 2. MAJOR

### D-4 · `.gold-shimmer` cannot paint here — a utilities-layer color out-cascades it · MAJOR

ChannelOptions.vue:152–159:

```vue
:class="[ `text-small text-muted-foreground cursor-help font-medium`,
          isDetailEasing ? 'gold-shimmer' : '' ]"
```

`.gold-shimmer` is glass-ui's, at `dist/styles/utilities/base-misc.css`, and it is **inside `@layer components`**:

```css
@layer components { … .gold-shimmer {
  background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold-light), …);
  background-size: 250% 100%; background-clip: text; -webkit-background-clip: text;
  color: transparent; } … }
```

The technique requires `color: transparent` so the clipped gradient shows through the glyphs. But `text-muted-foreground` is a Tailwind utility, and `node_modules/tailwindcss/index.css:1` declares `@layer theme, base, components, utilities;` — **utilities wins**. The glyphs render opaque `--muted-foreground`, and the gradient, clipped to those same glyphs, is painted entirely behind them.

`isDetailEasing` (`useTimingFunctionEditor.ts:51–55`) is the *only* rendered signal that the current easing is a `cubic-bezier`/`steps` curve with a dedicated editor. It never appears. This is also what makes D-9 a silent dead end.

The demo does not own a competing copy: `grep -rn "gold-shimmer" demo/` returns exactly two hits — this call site and a *prose mention* at `design-idioms.css:34`. There is no local `.gold-shimmer` rule to break the tie.

**Falsifier.** A demo-side unlayered or `!important` `.gold-shimmer`; the class appearing in `@layer utilities` after the color utility; or the call site dropping `text-muted-foreground` when `isDetailEasing` is true (it does not — the trio is unconditional, only `gold-shimmer` is conditional).

---

### D-5 · Gold pencil icon: **2.08:1** on the light card — WCAG 1.4.11 wants 3:1 · MAJOR

ChannelOptions.vue:176 — `class="easing-edit-btn text-gold"`; ChannelOptions.vue:185 — `<Pencil class="icon-sm" />` (16 px, `stroke: currentColor`).

Tokens: `design-idioms.css:88–90` `.text-gold { color: var(--color-gold) }`; `design-idioms.css:36` light `--color-gold: hsl(43 74% 49%)`. Plate: `glass-ui/dist/styles/tokens/color-radius.css` `--card: hsl(30 85% 96%)`; page `--background: --neutral-0 = hsl(40 30% 98%)`.

Relative luminance (WCAG 2.x, sRGB):

| color | sRGB | L |
|---|---|---|
| `--color-gold` light `hsl(43 74% 49%)` | (0.853, 0.647, 0.127) | **0.4184** |
| `--card` light `hsl(30 85% 96%)` | (0.994, 0.960, 0.926) | **0.9222** |
| `--background` light `hsl(40 30% 98%)` | (0.986, 0.982, 0.974) | **0.9602** |

Ratio vs `--card` = (0.9222+0.05)/(0.4184+0.05) = **2.08:1**.

The Card is a *glass* plate (`Card cartoon tier="quiet"` → `.glass-quiet`, `styles/glass/ladder.css`, `--glass-bg-quiet = color-mix(in srgb, var(--card) …%, transparent)`), so the true backdrop is a composite of card over page background. **This does not rescue the claim: both endpoints are lighter than the card alone**, so the composite ratio is bounded in **[2.08, 2.16]** — the whole reachable range is below 3:1. The dark arm is fine (`--color-gold: hsl(43 74% 55%)` L=0.4777 over `--card: hsl(26 22% 17%)` L=0.0253 → **7.01:1**), so this is a **light-theme-only** failure.

The glyph is the sole affordance for reaching the curve editor and carries no text label, which is exactly the 1.4.11 "graphical object required to understand the content" case.

**Ironic provenance.** ChannelOptions.vue:605–608 records that a scoped `.easing-edit-btn { color: var(--color-gold) }` rule was deliberately deleted in favour of the `.text-gold` idiom — "one idiom, one home, **identical computed color**." The consolidation was correct; it also means the failing value is now the demo's single gold authority, so the fix belongs in `design-idioms.css:36`, not here.

**Falsifier.** A `.dock-icon-button` rest-state background darker than the card (there is none — `dist/components/dock/styles/controls/icon-button.css`: `background: transparent`, tinted only on `:hover` / `:active` / `[data-active]`); a demo override of `--color-gold` scoped to this subtree (none); a text label accompanying the icon (none); or a ruling that the pencil is decorative (it is the only control that opens the editor).

---

### D-6 · The "advanced" chevron computes **2.01:1** — the navigation indicator is below 1.4.11 · MAJOR

ChannelOptions.vue:287–297:

```vue
class="hover:text-foreground text-muted-foreground flex w-full cursor-pointer items-center justify-between gap-x-3 py-1.5 transition-colors"
…
<ChevronRight class="icon-md opacity-50" />
```

The chevron inherits `--muted-foreground` (= `--neutral-5` = light `hsl(30 22% 40%)`, sRGB (0.488,0.400,0.312)) and is painted at `opacity-50`. Compositing at α=0.5 over `--card` (0.994,0.960,0.926) gives (0.741,0.680,0.619) → L = **0.4332**. Ratio vs card L 0.9222 = **2.01:1**.

The label text beside it passes comfortably (5.01:1, see S-3) — so the *word* "advanced" is legible while the **only mark that says this row goes somewhere** is not. A 20 px glyph at 2:1 is the thing a user must notice to discover the layer-config sub-pane at all.

`opacity-50` on an already-muted role is the mechanism: `--muted-foreground` is tuned to sit just above 4.5:1 for text, and halving it lands squarely under the 3:1 non-text floor. Dark arm: composite of `hsl(34 14% 62%)` at α=0.5 over `hsl(26 22% 17%)` → ratio ≈ 2.5:1, also below 3:1. **This one fails in both themes.**

**Falsifier.** A `forced-colors` or `prefers-contrast` override reaching this glyph (`glass-ui/dist/styles/accessibility.css`'s `prefers-contrast`/`forced-colors` blocks key on `[aria-current]/[aria-selected]/[aria-pressed]/[aria-checked]/[data-state]` — this `div[role=button]` carries none of them, see D-14); a redundant textual "›"/"more" affordance (none); or a ruling that the row's `cursor-pointer` alone discloses navigability (it does not exist on touch).

---

### D-7 · WCAG 2.5.3 *Label in Name* (Level A): visible `easing`, accessible name `Timing function` · MAJOR

ChannelOptions.vue:151–161 renders the visible label:

```vue
<label :class="[…]">easing</label>
```

— a bare `<label>` with **no `for`** and wrapping no control. It is not programmatically associated with anything. ChannelOptions.vue:219 then names the control differently:

```vue
<SelectTrigger aria-label="Timing function">
```

Two failures compound:

1. **2.5.3 (Level A).** The accessible name (`Timing function`, or under D-3 the run-on item text) does not contain the visible label string `easing`. Speech-input users saying "click easing" get no match — the canonical 2.5.3 harm.
2. **The `<label>` is semantically dangling.** Every *other* field in the card gets its label wired by `LabeledField`, which emits `Label` with `for={id}-control` (`labeled-field.js`: `y(E(t), { id: o, for: a, … })`). The easing field is the one hand-rolled row (the wrapper fallback documented at ChannelOptions.vue:140–146) and it is the one row that loses the association. The wrapper was built to add a label-action affordance; it dropped the label contract on the way.

The fix is one attribute — but note the trigger's id is generated inside reka, so the honest repair is `aria-labelledby` pointing at an id'd `<label>`, or simply making the accessible name `easing`.

**Falsifier.** A `for` on the label, an `id` on the trigger + `aria-labelledby`, or a `SelectTrigger` accessible name containing "easing". None present. (Note: `LabeledSelect` *does* do this correctly for the four wired fields — `y(E(a), { id: t, "aria-labelledby": u, … })` — which is why this is a defect of the bespoke row specifically.)

---

### D-8 · The `easing` tooltip is unreachable by keyboard and by touch · MAJOR

ChannelOptions.vue:149–164 wraps the bare `<label>` in `<TooltipTrigger as-child>`:

```vue
<Tooltip>
  <TooltipTrigger as-child>
    <label :class="[…cursor-help…]">easing</label>
  </TooltipTrigger>
  <TooltipContent>Timing function curve</TooltipContent>
</Tooltip>
```

`reka-ui/dist/Tooltip/TooltipTrigger.js` defaults to `as: "button"` precisely so the trigger is focusable; `as-child` merges the listeners onto the provided child and **adds no `tabindex`**. Its open paths are:

```js
click: handleClick, focus: handleFocus, pointermove: handlePointerMove, …
function handlePointerMove(event) { if (event.pointerType === "touch") return; … }
function handleFocus(event) { … rootContext.onOpen(); }
```

A `<label>` with no `for` and no `tabindex` is not focusable → `focus` never fires. `pointermove` early-returns for touch. So the tooltip opens on **mouse hover only**. On a touch device or via keyboard, "Timing function curve" is unreachable — and `cursor-help` (ChannelOptions.vue:155) is a mouse-only cue advertising a mouse-only affordance.

This is the *surviving* tooltip in the component; the other five are dead outright (D-1). So the panel's explanatory layer is: five that never render, and one that renders only for a mouse user.

**Falsifier.** `tabindex="0"` on the `<label>`; reka's `TooltipTrigger` injecting `tabindex` under `asChild` (it does not — the compiled setup adds only listeners + `PopperAnchor`); or a `TooltipProvider` config that opens on touch (`ignoreNonKeyboardFocus` only *narrows* the focus path; nothing widens the touch path).

---

### D-9 · Two catalogue entries whose entire meaning is "open an editor" open nothing · MAJOR

`EASING_GROUPS` (`utils/reference-data/easingGroups.ts:91–102`) ends with:

```ts
{ family: "Steps",  items: [ item("steps", "discrete jumps"), … ] },
{ family: "Custom", items: [ item("cubic-bezier", "custom curve") ] },
```

Selecting either fires ChannelOptions.vue:212–217 → `updateTimingFunctionFromName(key)`, which writes the literal and returns. The detail panel does **not** open:

- `useTimingFunctionEditor.ts:41` — `detailPanelDismissed = ref(true)` (starts dismissed);
- `:58–63` — `showDetailPanel = isDetailTimingFunction(tf) && !detailPanelDismissed`;
- `:83–92` — the watch that clears `detailPanelDismissed` fires **only if `openEditorOnChange` is true**;
- `:44` + `:170–174` — `openEditorOnChange` is set **exclusively** by `onEditIconClick`, i.e. the pencil.

So the dropdown route can never reveal the editor. A user who reads "cubic-bezier — custom curve" and picks it gets: the timing function silently swapped to whatever quad is in `cubicBezierOptions.controlPoints`, no editor, and — because of **D-4** — not even the gold-shimmer that was designed to acknowledge the state change. **Zero feedback for an action whose only purpose is to open something.**

The affordance that *does* work (the pencil, ChannelOptions.vue:172–186) is a 16 px glyph at 2.08:1 (D-5) with a mouse-only tooltip.

**Falsifier.** Any other writer of `openEditorOnChange` (`grep` in `useTimingFunctionEditor.ts` → one write, line 172); a watcher elsewhere clearing `detailPanelDismissed` on a dropdown change (`exitDetailPanel` only *sets* it true, `:214–217`); or a ruling that "cubic-bezier"/"steps" are meaningful as bare selections — they are not: `timingFunctionLiteralFor` (`:120–133`) exists precisely because the bare tokens are *rejected* by the engine, and both entries carry editor-shaped descriptions ("custom curve", "discrete jumps").

---

### D-10 · 24×24 px pencil target — `compact` is *explicitly excluded* from glass-ui's touch floor · MAJOR

ChannelOptions.vue:172–186 — `<DockControl shape="icon" compact …><Pencil class="icon-sm" /></DockControl>`.

`compact` stamps `dock-icon-button--compact` (`dist/dock.js`, `DockControl` setup: `{"dock-icon-button--compact": r.compact}`), and that class replaces the fixed square with content sizing (`dist/components/dock/styles/controls/icon-button.css`):

```css
.dock-icon-button--compact { width: var(--dock-compact-control-size, auto);
  height: var(--dock-compact-control-size, auto);
  min-width: var(--dock-compact-control-min-width, 0);
  padding: var(--dock-compact-control-padding, 0.25rem); }
```

Outside a `.glass-dock`, the `--dock-compact-*` variables are unset → `auto` size, `0` min-width, **4 px** padding. The glyph is `icon-sm` = `size-4` = 16 px (`design-idioms.css:102–107`; the `@utility` lands in `@layer utilities` and so beats `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem) }` in `@layer components`). Box = 16 + 2×4 = **24 × 24 CSS px**.

And glass-ui's coarse-pointer floor deliberately skips it — `dist/components/dock/styles/controls/touch-floor.css`:

```css
@media (pointer: coarse) {
  .dock-icon-button:not(.dock-icon-button--compact):not(:where(.glass-dock *)) {
    min-block-size: var(--dock-touch-target, 2.75rem);
    min-inline-size: var(--dock-touch-target, 2.75rem); } … }
```

`:not(.dock-icon-button--compact)` is explicit: **`compact` is a dense-dock-row variant that opts out of the 44 px floor**, and this call site uses it standalone in a card. 24×24 sits exactly on the WCAG 2.5.8 (AA) minimum with zero margin and fails 2.5.5 (AAA) by 20 px.

The demo owns the correct utility and does not use it — `design-idioms.css:82–85`:

```css
/* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */
.tap-floor { min-height: 44px; min-width: 44px; }
```

The Back control (ChannelOptions.vue:337–345, `compact` + `icon-md` = 20 px) computes 28×28 — same class of miss.

**Falsifier.** A `--dock-compact-control-size` / `--dock-compact-control-min-width` set by an ancestor of this Card (`grep -rn "dock-compact-control" demo/` → nothing); the button being inside a `.glass-dock` (it is inside `Card > CardContent`); or `.tap-floor` reaching it (it is not on the element).

---

### D-11 · `∞` is a display-only glyph the field cannot accept back — and the same concept renders two ways · MAJOR

ChannelOptions.vue:63–89:

```vue
:model-value="… .iterationCount === 'infinite' || … === Infinity
    ? '∞'
    : String(… .iterationCount ?? 'infinite')"
label="iterations"
@update:model-value="(v: string) => { trySetOption(() => animation.setIterationCount(v));
                                      storedAnimationOptions.animationOptions.iterationCount = v; }"
```

Two design faults, both decidable from this block plus `trySetOption` (ChannelOptions.vue:469–476):

1. **Round-trip trap.** The control is a free-text `LabeledInput`. It shows `∞`. If the user touches that field at all, the handler runs `setIterationCount("∞")` — which throws `AnimationOptionError`, which `trySetOption` **swallows by design** ("ignore until it parses") — and then unconditionally writes `"∞"` into the store. The store now holds a string that is neither `'infinite'` nor `Infinity`, so the display branch falls through to `String("∞")` = `"∞"`: the field looks unchanged, the engine is stale, and there is no error state, no `invalid` flag, no message. `LabeledField` ships `invalid` + an `error` slot with `aria-live` (`labeled-field.js`) — neither is used anywhere in this component. **The panel has no error state at all**, which is the deeper miss: `trySetOption` converts every malformed `duration`/`delay`/`iterations` keystroke into silence.
2. **Two glyphs for one concept.** The infinite state renders as `∞` when the value is `'infinite'`/`Infinity`, and as the word `infinite` when the value is nullish (the `?? 'infinite'` fallback on line 74). One field, one meaning, two typographic treatments, chosen by which branch fires. The tooltip that would have explained the accepted vocabulary — "Repeat count (number or 'infinite')" — is dead per D-1.

`∞` is also the only non-ASCII glyph in the control surface, set in the body face (no `font-mono`, cf. D-18), where its metrics differ from the digits it alternates with.

**Falsifier.** A normaliser mapping `∞ → 'infinite'` on input (none in the handler or in `state/animationOptionsStore.ts`'s path); an `invalid`/`error` binding on any field in the card (none); or `setIterationCount` accepting `'∞'` (it is the engine's fail-explicit setter, whose thrown `AnimationOptionError` is the documented reason `trySetOption` exists, ChannelOptions.vue:461–468).

---

## 3. MINOR

### D-12 · Empty state: two dropdowns render itemless for a chunk fetch, and the comment says otherwise · MINOR
ChannelOptions.vue:531–547. `directions`/`fillModes` are `ref([])` until `await loadAnimationEngine()` resolves. The comment claims *"The select items populate within microtasks of mount (well before the panel is interactive); until then the dropdowns render empty — an honest pre-load frame."* But `loadAnimationEngine` is a **dynamic `import()`** — `src/animation/index.ts:19`: *"`loadAnimationEngine()` — an `await import("./engine")`"*. That is a chunk request (network on cold cache), not a microtask. During that window `direction` and `fill mode` render with a value but an empty item list, no `disabled`, no skeleton, no "loading" affordance — and opening one shows an empty popover with no empty-state copy. `LabeledSelect` exposes `disabled` and `placeholder`; neither is used. **Falsifier:** `loadAnimationEngine` resolving synchronously or from a preloaded module graph; or a `disabled`/skeleton binding gating the two selects.

### D-13 · Group-heading rung: 10 px, or a dead class — both readings are defects · MINOR
ChannelOptions.vue:233–237 overrides `SelectLabel` with `text-admin-label text-muted-foreground px-2 py-1`. glass-ui's default is `py-1.5 pl-8 pr-2 text-dropdown-secondary font-semibold` (`select-DD6Ly6xg.js`). `--type-admin-label: 0.625rem` = **10 px** (`styles/typography/scale.css`) vs `--dropdown-text-secondary = --control-text-sm = calc(--type-caption × --ui-scale)` where `--type-caption: clamp(0.75rem, …)` ≥ **12 px**. glass-ui's `cn` (`class-names-Cpy5eaBk.js`) keys `font-size` and `text-color` as separate conflict groups and lets both survive into the class string, so which wins is decided by Tailwind's emission order — i.e. **either the family headings are the smallest type in the component at 10 px (a rung authored for admin chrome, per `design-idioms.css:225`), or the override is inert**. Also `px-2` (0.5 rem) is authored against `pl-8` (2 rem), the indent that aligns headings with item text past the indicator gutter (`absolute left-2 w-3.5`); by Tailwind's canonical property order `pl-8` should still win, so this is class-soup rather than a proven misalignment — recorded honestly as such. **Falsifier:** a resolved-order proof that `text-dropdown-secondary` wins (then it is dead-class churn, still a defect of a different kind).

### D-14 · The "advanced" row: `role="button"` with no expansion state and no focus idiom · MINOR
ChannelOptions.vue:281–291. A `div` with `role="button"`, `tabindex="0"`, and Enter/Space handlers — correctly keyboard-operable, but: no `aria-expanded`, no `aria-controls` pointing at the sub-pane it reveals, so AT gets "advanced, button" and no notion that a panel opened or that the same row does not close it (there is no close path here — only the Back control inside the revealed pane, ChannelOptions.vue:337–345). It also does not wear `.focus-ring`, which `design-idioms.css:73–79` declares to be **"the demo-owned `:focus-visible` contract — the SINGLE keyboard-focus affordance"**. And it is the element that D-6's 2.01:1 chevron sits inside. **Falsifier:** a global `[role="button"]:focus-visible` rule in `demo/styles/` (none), or `aria-expanded` bound anywhere in the file (none).

### D-15 · Double tooltip on the pencil — a styled one and a native one, same string · MINOR
ChannelOptions.vue:165–189: a reka `<Tooltip>` whose content is `Edit easing curve`, wrapping a `<DockControl … title="Edit easing curve">`. `title` is not a `DockControl` prop (`DockControl.vue.d.ts`: `shape/compact/active/type/disabled/as/asChild/class`), so it falls through to the rendered `<button>` as the native attribute. On hover the user gets the glass tooltip *and*, ~1 s later, the OS bubble, in a different typeface, at a different anchor. (It is the accessible-name source, so deleting `title` requires adding `aria-label` — which is the right shape anyway.) **Falsifier:** `DockControl` consuming `title` internally (`grep -o "title" dock.js` shows no prop declaration), or a global `[title]` suppression (impossible in CSS).

### D-16 · The advanced sub-pane's header contradicts the main pane's row · MINOR
Main pane (ChannelOptions.vue:281–298): text-left, chevron-right, whole row clickable, `py-1.5`, `text-small font-medium`. Sub-pane header (ChannelOptions.vue:336–351): a `DockControl` icon-left + a `text-small font-medium text-muted-foreground` span, `mb-1 … gap-1`, only the icon clickable. Enter and exit are the same navigational act at the same level of the hierarchy and share neither geometry, nor hit-area shape, nor gap rhythm (`gap-x-3` vs `gap-1`), nor label color (inherited-muted vs explicitly-muted). **Falsifier:** a design rule elsewhere prescribing asymmetric enter/exit chrome — `DESIGN.md §7` prescribes the opposite (one grammar for "what release/keyboard action does").

### D-17 · Asymmetric optical insets on the advanced row · MINOR
ChannelOptions.vue:295 wraps the chevron in `<div class="flex items-center justify-end px-3">` inside a row that is already inset by `CardContent`'s `px-4` (ChannelOptions.vue:4) and already spaced by `justify-between gap-x-3`. Net: the word "advanced" is flush at the content edge, the chevron is **12 px further in** than the card's right content edge — the row is optically unbalanced against every `.labeled-field-grid` row above it, which share one left edge and one right edge. `gap-x-3` is additionally inert alongside `justify-between` for a two-child row, and `justify-end` is inert inside a content-sized wrapper. Three layout declarations, one of which distorts the proportion and two of which do nothing. **Falsifier:** a wider `Separator`/row inset making 12 px the intended alignment to some other column (nothing in the card establishes such a column — the subgrid at `design-idioms.css:255–261` defines only `[label] auto [value] 1fr`).

### D-18 · Mono-as-data register applied inconsistently against `DESIGN.md §1` · MINOR
`DESIGN.md:25–29` is explicit: *"Mono-as-data. Fira Code is reserved for literals, tabular-number readouts, code/keyboard content, and explicitly marked identifiers (`data-register="code"`)."* In this component: the dropdown's curve names get `font-mono` + `data-register="code"` (ChannelOptions.vue:252–254) — correct. But the **same identifier in the trigger** (ChannelOptions.vue:220) carries neither, so `ease-in-out` is mono inside the popover and body-voice in the closed control. And `duration` / `delay` / `iterations` — which hold CSS literals (`5s`, `200ms`) and tabular numbers, the two named cases — get no mono, while the sibling `LayerConfigPanel.vue:43` gives its numeric `Input` `class="font-mono"` for the identical role. Same card, same row grammar, three different answers. **Falsifier:** `demo/styles/font-roles.json`'s `monoAllowedSelectors` explicitly excluding option-panel inputs (the file describes a *ceiling* on non-editor mono leaves, which argues against adding mono — but does not explain the trigger/popover split, which remains incoherent either way). Flagged MINOR, not MAJOR, because the governing manifest could ratify either direction — it cannot ratify both at once.

### D-19 · RTL: hard-coded directional glyphs and physical-axis spacing · MINOR
`ChevronRight` = "forward into sub-pane" (ChannelOptions.vue:296) and `ArrowLeft` = "back" (ChannelOptions.vue:344, and `TimingFunctionPanel.vue:22`) are imported as fixed glyphs with no logical mirroring; the item row uses physical `ml-auto pl-2` (ChannelOptions.vue:261–262) rather than `ms-auto ps-2`, and `LayerConfigPanel.vue:24` uses `text-right`. Under `dir="rtl"` the flex/grid axes flip while the arrows and the description's push-away do not, so the chevron points *back* along the reading direction. Recorded MINOR because the demo makes no RTL claim (`grep -rn 'dir="rtl"' demo/` → nothing) — but glass-ui's own dock sheets use logical properties throughout (`inset-inline-start`, `inline-size`, `padding-inline`), so the primitive layer is RTL-ready and only the demo's overlay is not. **Falsifier:** a documented LTR-only scope for the demo.

### D-20 · Dead hooks and dead layout, including a documented seam with zero consumers · MINOR
Four, all `grep`-decidable:
- **ChannelOptions.vue:2** — `<div class="grid items-center gap-4">` has exactly **one** in-flow child (the `Card`); the `<Teleport>` at :377 renders elsewhere. `gap-4` and `items-center` are both inert.
- **ChannelOptions.vue:6** — `class="panel-stack relative"`. `grep -rn "panel-stack" demo/` returns this line only. No rule anywhere.
- **ChannelOptions.vue:167–176** — the comment calls `easing-edit-btn` *"the NAMED BEHAVIORAL SEAM (the pencil hook proof:bezier-{no-scroll,single-card,grown})"*. `grep -rn "easing-edit-btn\|bezier-no-scroll\|bezier-single-card\|bezier-grown" demo/ scripts/ test/` → **the three named gates do not exist**, and the class has zero CSS and zero test consumers (STY-4 deleted its only rule, :605–608). A hook documented as load-bearing, holding nothing.
- **`DESIGN.md §9`/R3** — *"an SFC over 300L gets a sibling sheet; every demo CSS file remains ≤300L."* This SFC is **609 L** with a 60-line inline `<style scoped>` and no sibling sheet. Its named witnesses are absent: `ls scripts/gates/` → `surface  visual` only; no `proof:style-file-ceiling`, no `proof:styling-idioms`, no `proof:colocation`. The rule is authority without enforcement, and this file is over it by 2×.
**Falsifier for each:** a second in-flow child of the outer grid; any `.panel-stack` rule; any consumer of `easing-edit-btn`; a sibling `ChannelOptions.css` or an R3 exemption.

---

## 4. SUPERLATIVES (L-18 runs both ways)

### S-1 · `prefers-reduced-motion` is honest **by delegation**, and the delegation actually holds
The component carries no PRM block, which reads as a gap until the substrate is checked. `glass-ui/dist/styles/utilities/a11y-overrides.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: 0.1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important; } … }
```

The `transition-property` allow-list **excludes `grid-template-rows`**, so under PRM the `.panel-row` height animation (ChannelOptions.vue:559) is not merely shortened — it is *removed*, and the panel snaps, while `.panel-content`'s opacity crossfade (:574) survives at 0.1 s. That is exactly the right reduction: kill the size morph, keep a legibility-preserving fade. `lane-frontend.md §6.5` lists this file among the "gaps: defers to glass-ui, unverified statically" — **verified here, and the delegation is correct.** Zero lines of local PRM code for correct PRM behaviour is the best possible outcome.
**Falsifier:** the demo's cascade landing after `a11y-overrides.css` and re-declaring the transition with `!important` (`style.css:1–15` imports glass-ui at :3 and the demo sheets at :14–15, but neither `design-idioms.css` nor the scoped block uses `!important` on `transition`).

### S-2 · The focus-ring inset is a genuinely precise fix for a real geometric conflict
ChannelOptions.vue:567–575:

```css
.panel-content { overflow: hidden; min-height: 0;
  /* Inset padding so focus rings (ring-2 + ring-offset-2 = 4px) aren't clipped
     by the overflow:hidden required for grid-template-rows collapse animation. */
  padding: 2px; margin: -2px; }
```

`overflow:hidden` is *mandatory* for the `0fr↔1fr` idiom and it clips outside-drawn focus rings — a conflict most implementations either don't notice or "solve" by weakening the ring. The `padding: 2px; margin: -2px` pair buys the bleed room at exactly the ring's radius while contributing zero to layout. The `min-height: 0` beside it is the correct companion for a grid item that must be allowed below its content height. Three declarations, three distinct correct reasons.
**Falsifier:** a ring whose total outset exceeds 2 px on any control in these panels — `glass-ui`'s `--focus-ring-shadow` is the demo's declared affordance (`design-idioms.css:76–79`) and is shadow-based, i.e. already outside layout, so 2 px is a floor not a guess. Marked **UNPROVEN-NEEDS-LIVE** only for the exact pixel sufficiency; the *reasoning* is sound as authored.

### S-3 · Label contrast passes in both theme arms, with margin — computed, not asserted
`text-muted-foreground` (`--muted-foreground` → `--neutral-5`) against the card plate:

| arm | fg | bg | ratio |
|---|---|---|---|
| light | `hsl(30 22% 40%)` L=0.1440 | `hsl(30 85% 96%)` L=0.9222 | **5.01:1** |
| dark | `hsl(34 14% 62%)` L=0.3587 | `hsl(26 22% 17%)` L=0.0253 | **5.43:1** |

Both clear 4.5:1 for normal text, and the two arms are tuned within 0.4 of each other — the token pair was balanced deliberately, not inherited. This is what makes D-5/D-6 diagnosable as *local* failures (a hard-coded gold; an `opacity-50`) rather than a broken palette.

### S-4 · `50dvh`, and the honesty of the comment that explains it
ChannelOptions.vue:585–592 caps the detail panel at `min(50dvh, 480px)` and states why: *"`50dvh` (dynamic viewport): tracks the real visible height on mobile (no URL-bar over-reservation); identical to 50vh on desktop. The honest host-cap fix, not a scoped override band-aid."* Correct unit choice, correct dual bound (ratio *and* absolute ceiling, so the bezier canvas cannot dominate a tall screen), and a comment that names the alternative it rejected. `DESIGN.md §4` forbids "a viewport literal that bypasses those tokens" — a `dvh`-based host cap on a component's own overflow container is the sanctioned shape, not a bypass.

### S-5 · Scoped CSS is token-plain, and the STY-4 consolidation was the right call even though it exposed D-5
`DESIGN.md §10 R4`: *"Utilities belong in templates; scoped CSS is token-plain. `@apply` is design-system-only and `@reference` is banned."* The 60-line `<style scoped>` block obeys exactly: no `@apply`, no `@reference`, no raw color, no raw duration — only `var(--duration-normal)` / `var(--ease-standard)` and geometry. Both deletions recorded in it (`H.W11.I1`'s per-row `:deep(.labeled-field)` → the shared `.labeled-field-grid` subgrid; `J.W7b STY-4`'s scoped `.easing-edit-btn { color }` → the `.text-gold` idiom) move rules *toward* the shared vocabulary and leave a note saying so instead of a shim — squarely `feedback_no_backwards_compat`. STY-4 is what routed the pencil onto the single gold authority, which is why D-5's fix is a one-token change in `design-idioms.css` rather than a hunt across call sites. **Good architecture is what made the contrast bug cheap to fix.**

---

## 5. Investigated and REJECTED (recorded so they are not re-raised)

- **`Card cartoon tier="quiet"` vs `DESIGN.md §3`.** The codex (`DESIGN.md:67`) prescribes `Card surface="cartoon" tier="quiet"`. The installed contract says `SURFACES = ["glass","veil","opaque"]` (`_shared/axes.d.ts:2`) and `cartoon?: boolean` is a *separate* `CardProps` axis (`components/card/types.d.ts`). **The component is right and the codex is stale against 7.0.0.** No defect against ChannelOptions; a currency defect in `DESIGN.md` that belongs to a docs lane.
- **Teleport target absence.** `#controls-ribbon-target` (ChannelOptions.vue:377) resolves to `RibbonBar.vue:7`, which is `v-show`-gated — present in the DOM whenever `RibbonBar` is mounted, so the ordinary tab-switch case is safe (and the ribbon is correctly `display:none`-hidden, i.e. out of the tab order, when another surface is selected). The residual failure mode — `RibbonBar` unmounted inside the mobile `Drawer` while `active` is true → missing target → the playback ribbon silently vanishes — is **UNPROVEN-NEEDS-LIVE** and is left for the SS-13 visual audit rather than counted here.
- **`max-h-[var(--easing-dropdown-max-h)]` as a raw bracket escape.** `style.css:37–39` forbids raw `z-[N]`; it does not forbid arbitrary values generally, and the value is a *named token* (`layout.css:24`, `min(24rem, 60dvh)`) reached through the bracket, which is the sanctioned way to consume a custom property in a Tailwind utility. Not a defect. (Whether the 29-item catalogue scrolls correctly under that cap is a live question, not a static one.)

---

## 6. Provenance

Read whole: `ChannelOptions.vue`; its three local imports (`TimingFunctionPanel.vue`, `LayerConfigPanel.vue`, `composables/useTimingFunctionEditor.ts`); its two data modules (`utils/reference-data/animationDescriptions.ts`, `easingGroups.ts`); `RibbonBar.vue` (the teleport host); the relevant span of `ChannelControls.vue` (the mount site + the `inert` precedent); `demo/DESIGN.md`; `demo/styles/design-idioms.css`; `demo/styles/style.css`.
Consulted for contracts: `glass-ui@7.0.0` `dist/components/{labeled-field,dock,card,surface,select,label,input,_shared}` type declarations and the compiled `labeled-field.js` / `select-DD6Ly6xg.js` / `dock.js` / `Surface-*.js` / `class-names-*.js`; `dist/styles/{index,utilities,accessibility,tokens,typography}` and the leaf sheets `utilities/base-misc.css`, `utilities/a11y-overrides.css`, `glass/ladder.css`, `dock/styles/controls/{icon-button,touch-floor}.css`, `tokens/{color-radius,light-dark,sizing,scheme-motion}.css`, `typography/scale.css`; `reka-ui/dist/{Tooltip/TooltipTrigger,Select/SelectValue,Select/SelectItemText}.js`; `tailwindcss/index.css:1`.
Contrast arithmetic is WCAG 2.x relative luminance over sRGB, computed by hand from the token values quoted inline; every ratio states its two endpoints so it can be re-derived or refuted.
**Nothing in `/Users/mkbabb/Programming/keyframes.js` was written, mutated, installed, or executed.** The single write of this lane is this file.
