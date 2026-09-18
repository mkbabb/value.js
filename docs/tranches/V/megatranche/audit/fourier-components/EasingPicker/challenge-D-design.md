claude-opus-5[1m] (served model id)

# CHALLENGE · EasingPicker · axis D (DESIGN)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EasingPicker.vue` (98 lines)
**Read whole, read-only** — subject + `EasingCurvePreview.vue` (41) + `stores/animation.ts` (161) + `lib/easings.ts` (127) + the sole host `AnimationControls.vue` (224) + the installed producer surface (`@mkbabb/glass-ui@4.0.0` dist: `button-BNDWhAZb.js`, `toggle-chip.js`, `dropdown-menu.js`, `styles/glass/surfaces.css`, `styles/tokens/*`, `styles/typography/scale.css`) + `reka-ui/dist/Menu/MenuContentImpl.js` + producer-latest evidence (`glass-ui/src/components/easing/*`, `src/components/chip/chipVariants.ts`).
**Pin under audit** glass `^4.0.0` / installed **4.0.0**; producer latest **7.0.0** (`package.json:14`; CENSUS §1).
**No browser tooling used.** Every claim is static or source-derived; the two that need a live paint are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; each claim carries its own falsifier and dies if the falsifier holds.

**Tally — 23 defects (3 BLOCKER · 7 MAJOR · 10 MINOR · 3 INFO) · 4 superlatives · 2 explicit contradictions of the hitherto corpus.**

---

## §0 · The two corpus contradictions (stated first, because they re-home the wave budget)

### X-D1 · lane-frontend §4's "fourth fork → `glass-ui/easing`" disposition is WRONG on function, right on name

`lane-frontend.md:409-413` books `EasingPicker.vue` (98) + `EasingCurvePreview.vue` (41) + `lib/easings.ts` (127) as a HARD shadow of `glass-ui/src/components/easing/`, quoting the producer README's "no fourth fork", and routes the cure to **F.W3** — i.e. *after* the F.W1 tri-package uplift. CENSUS §4 item 4 carries it forward verbatim.

**The tree contradicts this.** The producer's `EasingPicker` is a **curve-authoring editor** over two CSS-reparseable families:

- props are `mode: "bezier" | "steps"` / `preset` / `steps` / `term` — there is **no catalogue prop** (`glass-ui/src/components/easing/EasingPicker.vue:49-60`);
- `index.ts:1-12` exports only `EasingPicker`/`EasingConfigurator` + `useEasingPicker`;
- `README.md:60-64` binds the math to `CubicBezier(x1,y1,x2,y2)`, `steppedEase(n,term)`, `bezierPresets`, `jumpTerms`;
- `README.md:70-72`: *"Analytic bounce and spring catalogues remain value.js/keyframes-owned; **this component does not duplicate them**."*

Fourier's picker is a **6-way selector over analytic in-out easings** — `easeInOutSine/Quad/Cubic/Circ/Expo` + identity (`lib/easings.ts:78-83`). Three of those (`sine`, `circ`, `expo`) are **not** cubic-bezier curves at all (`value.js/src/easing.ts:22,25-29`: cosine, circular-radical, and a `2**(20p-10)` exponential), so `./easing` cannot represent them, and by its own README declines to. **`./easing` is not a drop-in and never will be.** The name collides; the function does not.

**Consequence for the plan:** the F.W3 "retire the fourth fork" line is unexecutable as written, and — more importantly — **the real cure is available at the OLD pin and does not wait on F.W1** (see D-4, D-1). Re-home the budget: the chassis goes to `./toggle-chip`→`./chip` (a line already open for `NotationPills.vue`, `lane-frontend.md:441`), the *catalogue* stays local and legitimate, and `lib/easings.ts`'s `ANIMATION_EASINGS` is **not** a shadow of anything the producer ships.
**Falsifier:** a `presets`/`catalogue`/`options` prop on producer `EasingPicker` accepting arbitrary `(t:number)=>number` entries — `defineProps` at `EasingPicker.vue:49-60` has none, and `constants.ts:10-13` hard-codes `CUSTOM_PRESET`/`DEFAULT_BEZIER_PRESET`.

### X-D2 · lane-frontend §8:629's superlative ("ARIA-correct radio-in-menu roles with a written rationale") is *correct reasoning applied to unreachable elements*

The rationale at `EasingPicker.vue:10-15` is sound (see S-1). But the roles are painted on six plain `<button>`s that the host menu's keyboard model **cannot focus** (D-1). The corpus banked the comment and never tested the interaction. I carry the superlative — and file the BLOCKER underneath it.
**Falsifier:** any keyboard path that lands focus on a chip; §D-1 enumerates the three reka handlers that each exclude it.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The six easing chips are keyboard-unreachable inside the dropdown (WCAG 2.1.1 Keyboard, Level A)

`EasingPicker.vue:19-36` renders each option as `<Button …>` — glass-ui's Button is reka's `Primitive` with `data-slot="button"` and nothing else (`glass-ui/dist/button-BNDWhAZb.js:33-38`). The component's sole mount is inside `<DropdownMenuContent>` (`AnimationControls.vue:109,119`), whose keyboard model is reka's `MenuContentImpl`:

| line | mechanism | effect on the chips |
|---|---|---|
| `MenuContentImpl.js:194-200` | `useArrowNavigation(…, attributeName: "[data-reka-collection-item]:not([data-disabled])")` | ↑/↓ walk **only** collection items. `data-reka-collection-item` is minted by `reka-ui/dist/Collection/Collection.js:6` for registered `MenuItem`/`MenuRadioItem`/`MenuCheckboxItem`/`MenuSubTrigger`. A bare `Primitive` button registers nothing ⇒ **arrows skip all six.** |
| `MenuContentImpl.js:204-205` | `if (isKeyDownInside) { if (event.key === "Tab") event.preventDefault(); }` | **Tab is swallowed inside the content** ⇒ no sequential-focus escape into the group. |
| `MenuContentImpl.js:206` | `handleTypeaheadSearch(event.key, collectionItems)` | typeahead searches the same collection ⇒ typing `e` never reaches "Exponential". |
| `MenuContentImpl.js:209-213` | Home/End `focusFirst(candidateNodes)` over `collectionItems` | first/last also skip them. |

Three independent reach mechanisms, all keyed to the same collection, all excluding the chips. **The easing control is pointer-only.** For a control that changes the global animation curve this is a Level-A failure, and the same pattern condemns the `SpeedSelect` sibling at `:117` (out of scope; flag for the sibling challenge).

**The cure is one word, at the installed pin, in an import statement the host already writes.** `AnimationControls.vue:9` imports from `@mkbabb/glass-ui/dropdown-menu`, and that exact subpath at 4.0.0 already exports `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuLabel` and `DropdownMenuGroup` (`glass-ui/dist/dropdown-menu.js` export table). `MenuRadioItem` registers into the collection, ships `role="menuitemradio"` + `aria-checked` + roving tabindex natively — which also deletes the hand-written rationale comment's whole reason to exist.
**Falsifier:** if glass-ui's `DropdownMenuContent` re-registered arbitrary descendants into the collection, or if `Button` forwarded `data-reka-collection-item`. Neither: `Collection.js:6` is the only mint site and `button-BNDWhAZb.js:33-38` emits `data-slot`/`data-variant`/`data-size` only. Residual live check (SS-13): confirm no third-party global key handler re-enables Tab — nothing in the fourier tree registers one on the menu.

### D-2 · BLOCKER · The **selected** chip's label fails WCAG 1.4.3 AA in light mode at ~3.2–3.4:1 — the one state that must read

`EasingPicker.vue:49` pins `--easing-accent: hsl(248 88% 71%)` as a raw literal with **no light/dark arm**; `:95-97` paints the active label with it at `font-size: 0.5625rem` (9px — normal text by every WCAG threshold, nowhere near the 18.66px/24px large-text carve-out).

Computed (sRGB relative luminance, WCAG 2.x formula):

- `hsl(248 88% 71%)` → `#8574F6` → **L = 0.2415**
- light popover surface `--popover: hsl(36 48% 97%)` (`glass-ui/dist/styles/tokens/light-dark.css:99`) → **L = 0.9421** ⇒ **3.40 : 1**
- the chip additionally washes `color-mix(in srgb, var(--easing-accent) 8%, transparent)` over it (`:86`), dropping the backdrop to L ≈ 0.88 ⇒ **≈ 3.2 : 1**

Both are below the 4.5:1 AA floor. Dark arm passes (`--popover: hsl(24 8% 16%)`, `dark-arm.css:65` → ≈ 4.7:1), so this is a **light-mode-only** failure — and fourier ships a light mode (`layout/DarkModeToggle.vue`).

The aggravating fact: **this repo already cured the identical defect class for a sibling token and did not extend it here.** `src/style.css:113-125` reads *"D.W4.d — light-mode `--viz-amber` darken (axe contrast carry). glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 …"* and darkens it to `hsl(35 76% 35%)`. `--easing-accent` is **worse than the token they fixed** (3.2–3.4 vs 3.54) and sits four lines from the fixed one in the same stylesheet family, unaudited.

Note the precise scope: the *curve stroke* also uses this colour (`:33`), and at 3.2–3.4:1 it clears WCAG 1.4.11 non-text 3:1 — so the graphic is fine and only the **text** fails. The inactive label is safe (`--muted-foreground` → `--neutral-5` → `hsl(30 22% 40%)`, documented at 5.21:1 vs page, `color-radius.css:45`).
**Falsifier:** if the active label sat on a darker backdrop, or if the popover painted dark in both schemes. `light-dark.css:99` is explicit; `:86`'s 8% wash only darkens the backdrop by ~6% of L, moving the ratio the wrong way.

### D-3 · BLOCKER · The curve preview — the component's entire visual reason to exist — renders at **27.3 % of its own box**, because the viewBox reserves 37.5 % of its height for overshoot none of the six easings can produce

`EasingCurvePreview.vue:19-22`:

```
viewBox="-0.05 -0.3 1.1 1.6"   preserveAspectRatio="xMidYMid meet"
:width="size" (28)             :height="size * 0.7" (19.6)
```

The path is generated in normalized coordinates, `x ∈ [0,1]`, `y = 1 - fn(t)` (`lib/easings.ts:89-97`). Geometry:

- viewBox aspect **1.1 : 1.6 = 0.6875** (taller than wide); element aspect **28 : 19.6 = 1.4286** (wider than tall).
- `meet` fits the constraining axis: `scale = min(28/1.1, 19.6/1.6) = min(25.45, 12.25) = **12.25**`.
- drawn curve = `1.0 × 12.25 = 12.25 px` wide × `12.25 px` tall, centred in a 28 × 19.6 box.
- ⇒ **43.75 % of the width, 62.5 % of the height, 27.3 % of the area.** 72.7 % of the element is empty letterbox: 7.26 px of dead margin on each side.

The `-0.3 … 1.3` vertical range is headroom for an overshooting curve. **None of the six can overshoot.** All are monotone and bounded in `[0,1]` — verified in the value.js source the store actually imports (`value.js/src/easing.ts`): `linear` identity, `easeInOutSine :22` (`-(cos(πp)-1)/2`), `easeInOutQuad :24`, `easeInOutCubic :23`, `easeInOutExpo :25-27`, `easeInOutCirc :28-29`. No back/elastic/spring member exists in `ANIMATION_EASINGS` (`lib/easings.ts:78-83`). The headroom is dead by construction, and because `meet` fits by the *long* axis it is not merely dead — it actively shrinks the curve horizontally to 44 %.

The producer solved exactly this and the solution is legible in the tree: `glass-ui/src/components/easing/constants.ts:31-33,40` ships `VIEW_PAD = 0.1`, `MAX_OVERSHOOT = 0.6` and `VIEWBOX_FIT_SAMPLES = 16` — *"the number of curve samples the viewBox bounds-fit walks"*. The producer **derives** the viewBox from the curve's measured bounds; the consumer **guesses** it, and guesses wrong by 37.5 % of the height.
**Falsifier:** any member of `ANIMATION_EASINGS` returning a value outside `[0,1]` for `t ∈ [0,1]`, which would justify the pad. Enumerated above — none does. (`EASING_PRESETS` *does* carry back-overshoot curves, `lib/easings.ts:32-34` — but that catalogue is the morph subsystem's and never reaches this component.)

---

## §2 · MAJOR

### D-4 · MAJOR · 40 lines of scoped CSS reimplement `ToggleChip variant="cell"` — a primitive shipped by the **installed** pin, which also survives the uplift as `./chip`

`EasingPicker.vue:68-97` hand-builds a vertical two-line chip. `@mkbabb/glass-ui@4.0.0` already ships it (`dist/toggle-chip.js:59-68`, `cell` variant). Line-for-line:

| intent | fourier scoped CSS | producer `ToggleChip` `cell` (installed 4.0.0) |
|---|---|---|
| layout | `display:flex; flex-direction:column; align-items:center` `:69-71` | `flex flex-col items-center justify-center` |
| gap | `0.125rem` (2px) `:72` | `gap-1.5` (6px) |
| padding | `0.375rem 0.25rem 0.25rem` `:73` | `px-2 py-2.5` |
| radius | `0.5rem` `:74` | `rounded-[0.625rem]` |
| border | `1.5px solid transparent` `:75` | `border border-transparent` (1px) |
| rest bg | `background: none` `:76` | `bg-transparent` |
| hover | `background: var(--muted)` — **opaque** `:81-83` | `hover:bg-[color-mix(in srgb,var(--accent) 40%,transparent)]` + `hover:border-[color-mix(…--border 50%…)]` |
| selected | `.is-active { border-color: …accent 60%; background: …accent 8% }` `:84-87` | `data-[state=on]:bg-[color-mix(…--primary 15%…)] data-[state=on]:border-primary` |
| label size | `0.5625rem` literal `:89` | `text-micro` (the named register) |

Every constant is off the system by a notch, and the *interactive* rows are off in kind, not just degree (opaque `--muted` vs a translucent accent mix; a bespoke class vs `data-[state=on]`). This is a design-system conformance defect provable **entirely at the old pin** — it needs no uplift.

Uplift-stability is confirmed, not assumed: `./toggle-chip` is in lane-frontend's REMOVED-at-7.0.0 list (`lane-frontend.md:461-463`) and folds to `./chip` (`lane-frontend.md:441`, the `NotationPills.vue` row) — and 7.0.0's `chipVariants.ts:14` still reads `cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`. **The same target, before and after F.W1.** Budget this with the NotationPills line, not separately.
**Falsifier:** if `cell` were shaped for a different content stack. Its `flex-col` + `gap-1.5` + `text-micro` is precisely glyph-over-micro-label — this component's exact stack. Residual (SS-13): reka's `Toggle` root emits `aria-pressed`/`data-state`, so the `role="menuitemradio"` override must be re-layered — but D-1's cure (`DropdownMenuRadioItem` + `asChild`) supersedes that question entirely.

### D-5 · MAJOR · `size="sm"` imports a **fixed control height** the chip's content does not fit, and the chip then opts out of the library's `--ui-scale` comfort axis

`:23` selects `size="sm"` → `h-(--control-h-sm)` (`button-BNDWhAZb.js`, size table). That utility is **precompiled and shipped**, so it lands regardless of any JIT scan: `dist/styles/components.css` contains `.h-\(--control-h-sm\){height:var(--control-h-sm)}`. The token: `--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor))` (`tokens/offsets-sizing.css:150`).

**Fine pointer** (`--ui-scale: 1`, `--control-floor: 0px` — `offsets-sizing.css:136,148`): box = **36 px**. Content stack = `0.375rem` pad-top (6) + SVG 19.6 + `0.125rem` gap (2) + 9 px label (`line-height:1`) + `0.25rem` pad-bottom (4) = **40.6 px**. The box is definite, so the extra **4.6 px overflows the bottom** — into a 4 px row gutter (`:66`), i.e. row-1 labels descend past the gutter into row-2's box.

**Coarse pointer** (`@media (pointer: coarse)` → `--ui-scale: 1.5`, `--control-floor: 2.75rem`, `tokens/light-dark.css:19-20`): box = `max(3.375rem, 2.75rem)` = **54 px**, while `:73`'s padding and `:72`'s gap are fixed rem literals that do **not** scale. Content is still ~40.6 px, flex main-axis default `flex-start` ⇒ the whole stack pins to the top with **~13 px of dead space below it**. The library's own comment for that block is explicit about what the chip is opting out of: *"the WHOLE library — buttons, inputs, badges, toggles, the dock — grows ~1.5× on touch from this ONE place"* (`light-dark.css:6-10`). And `.btn-pill` — which Button's base class stacks — scales its own geometry from the same scalar (`glass/surfaces.css:133,135`: `gap: calc(0.375rem * var(--ui-scale))`, `padding: calc(0.5rem * var(--ui-scale)) calc(1rem * var(--ui-scale))`), all of it overridden away at `:72-73`. So the chip inherits the scaled **height** and discards the scaled **interior** — the worst of both.

Aristotelian reading: on desktop the chip is 13 % too small for its content; on touch it is 33 % too large, top-heavy, and off its own optical centre. `ToggleChip cell` has no fixed height at all (D-4).
**Falsifier:** a scoped `height`/`min-height` on `.easing-chip` overriding the utility — there is none (`:68-80`); or `overflow` clipping making the fine-pointer overflow invisible — `.btn-pill` sets neither `overflow` nor `contain` (`surfaces.css:119-167`). Exact painted geometry: **UNPROVEN-NEEDS-LIVE (SS-13)** — the mechanism and both token arms are static-certain.

### D-6 · MAJOR · Button's glyph-normalizing rule overrides `:size="28"`, squaring the curve preview into a 16 px (24 px on touch) icon slot

Button's base cva string carries `[&_svg:not([class*=size-])]:size-(--ui-glyph)` (`button-BNDWhAZb.js`, base string). `EasingCurvePreview`'s root is `<svg class="easing-preview">` (`:23`) — no `size-` substring ⇒ it matches. `size-*` sets CSS `width`/`height`, which beat the SVG **presentation attributes** `width`/`height` bound at `:21-22`. `--ui-glyph: calc(1rem * var(--ui-scale))` (`offsets-sizing.css:177`) ⇒ **16 × 16 px fine, 24 × 24 px coarse — square.**

Consequences: (a) the `:size="28"` prop at `EasingPicker.vue:32` and the deliberate `size * 0.7` ratio at `EasingCurvePreview.vue:22` are **dead code**; (b) the box goes square, so `meet` refits at `scale = min(16/1.1, 16/1.6) = 10` and the curve draws **10 × 10 in a 16 × 16 box = 39 % of area** — compounding D-3; (c) `EasingCurvePreview`'s `size` prop and its `28` default (`:11`) become a lie for its only consumer.
**Falsifier:** this utility is *not* in the precompiled `dist/styles/components.css` (grepped: no `ui-glyph` occurrence), so it depends on Tailwind's JIT reaching the producer's compiled chunk. It does have a declared path — `dist/styles/index.css:222` ships `@source "../*.js"` (rationale at `:190-221`, resolving to `dist/*.js`, "the 150+ flat compiled chunks that carry glass-ui's utility class strings"), and fourier imports that exact cascade file (`src/style.css:3`). But the same rationale block warns that *"Fully-arbitrary BRACKET utilities … are not reliably reachable by a JIT scan"*. **UNPROVEN-NEEDS-LIVE (SS-13):** read back the computed `width` of one `.easing-preview`. If 28 px → this row dies and D-3 stands alone at 27.3 %; if 16 px → D-3 worsens to 39 % and the `size` prop is deletable.

### D-7 · MAJOR · The 9 px label literal sits 25 % below the library's smallest register, and is the one type in the component that cannot grow

`:89` `font-size: 0.5625rem` = **9 px**, a raw literal. The library's ladder (`typography/scale.css`):

- `--type-micro: 0.6875rem` = **11 px** — `:87`, *"fixed sub-control micro (NOT fluid)"*, the floor of the scale;
- `--type-caption: clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` — `:100-104`, *"12px floor — `--control-text-sm` source"*.

9 px is **2 px under the documented floor** and **3 px under the smallest control register**. Worse, it is *fixed* while every register above it is a `clamp()` — and `scale.css:88-99` names precisely the complaint the fluid ladder was built to answer: *"the control/body register grows ~1-2 steps on a wide display (the 27" 'font too small' the user flagged)"*. On that 27" display every other string in the menu grows and the easing labels stay 9 px. On coarse pointer the same: `--control-text`/`-sm` multiply by `--ui-scale` exactly once (`offsets-sizing.css:170-171`); the literal does not.

Six of these strings ("Linear", "Sine", "Quadratic", "Cubic", "Circular", "Exponential") are the *only* words that disambiguate six near-identical monotone S-curves. They are the component's copy, set below the system's floor.
**Falsifier:** a `--ui-scale`-aware or `text-micro` declaration on `.easing-chip-label` — `:88-94` has neither. (`ToggleChip cell` uses `text-micro`; see D-4.)

### D-8 · MAJOR · Six authored descriptions exist and are never rendered; the chips are the only controls in the dock without a tooltip

`lib/easings.ts:73-83` types `ANIMATION_EASINGS` with a **required `description: string`** and authors all six: `"Constant rate"`, `"Gentle ebb and flow"`, `"Smooth acceleration"`, `"Pronounced ease"`, `"Snappy midpoint"`, `"Dramatic slow-fast-slow"`. `EasingPicker.vue:35` renders `opt.label` only. There is no `title`, no `aria-description`, no `<Tooltip>`, no `aria-describedby` anywhere in the file.

Meanwhile the host wraps **every** other transport control in the local `<Tooltip>` adapter — play/pause `:66,81`, speed `:94`, the overflow trigger `:105` — and the pattern is repo-wide (`grep -c Tooltip`: `EditorControlsDock.vue` 21, `CanvasControlsDock.vue` 13, `ContourSettings.vue` 13, `BasisSelector.vue` 8, `AnimationControls.vue` 9; `EasingPicker.vue` **0**). So the component that most needs disambiguation — six 9 px labels over six visually similar curves — is the single member of the family with no secondary affordance, while the copy that would fill it is already written, typed as required, and shipped in the bundle.

Prose quality of the unused copy is high ("Snappy midpoint" for `easeInOutCirc` is exactly right); prose quality of what *ships* is six bare adjectives. Wiring `description` into a `Tooltip` (or `aria-description`) is a ~2-line change that discharges a state/affordance gap and a prose gap at once.
**Falsifier:** any render of `description` in the tree — `grep -rn "description" src/components/visualization/EasingPicker.vue src/components/visualization/EasingCurvePreview.vue` → no match; `ANIMATION_EASINGS[...].description` has zero readers repo-wide.

### D-9 · MAJOR · The selected state is hand-rolled, so Button's shipped selected-state visuals are inert dead weight

Button's `ghost` variant ships four `aria-pressed:` rungs — `aria-pressed:bg-foreground/10 aria-pressed:text-foreground` (`button-BNDWhAZb.js`, ghost row). The component correctly declines `aria-pressed` on ARIA grounds (`:14-15`), so **all of them are inert**, and selection is re-expressed through a bespoke `.is-active` class (`:26,84-87,95-97`) with a bespoke colour. The component therefore ships the ghost variant's *entire* pressed vocabulary as dead CSS and pays for a second, uncoordinated one.

This is the same root cause as D-4/D-5: `Button` is a horizontal text-pill chassis whose selected-state protocol is `aria-pressed`. The primitives whose protocol is `data-[state=on]`/`data-[state=checked]` — `ToggleChip` (installed) and `DropdownMenuRadioItem` (installed, same import line) — are the correct chassis and each ships its selected visuals on the state the component actually has.
**Falsifier:** if `.is-active` produced a materially different affordance than `data-[state=on]` — it does not; both are "tint the surface + tint the border" (compare `:84-87` to `toggle-chip.js:66-67`).

### D-10 · MAJOR · An **opaque** hover fill inside a translucent glass popover

`:81-83` paints hover as `background: var(--muted)` — `--muted: var(--neutral-1)` = `hsl(38 26% 95%)` light / `hsl(28 12% 11%)` dark (`color-radius.css:41,84`; `dark-arm.css:43`), **fully opaque**. It sits inside a portaled `DropdownMenuContent` whose whole chrome is a blurred translucent glass surface (`AnimationControls.vue:200-202`: *"The primitive ships its own chrome (background, border, radius, shadow, animations)"*).

An opaque rectangle on a backdrop-blurred surface reads as a patch: it occludes the wash instead of deepening it, and the hovered chip visibly leaves the material. Every producer answer for this surface is a `color-mix(…, transparent)`: ghost's own `hover:bg-foreground/8` (`button-BNDWhAZb.js`), `ToggleChip cell`'s `hover:bg-[color-mix(in srgb,var(--accent) 40%,transparent)]` (`toggle-chip.js:64`) — and the component's *own* active state, four lines below, correctly uses `color-mix(… 8%, transparent)` (`:86`). So the file is internally inconsistent: the selected state respects the glass idiom; the hover state does not.

Scoped-CSS specificity makes this decisive rather than theoretical: `.easing-chip:hover[data-v-…]` is unlayered, Tailwind utilities live in `@layer utilities` ⇒ the scoped opaque rule wins over ghost's translucent one unconditionally.
**Falsifier:** if `--muted` carried alpha in fourier's overrides — `src/style.css` overrides only `--viz-amber` (`:113-125`); `--muted` resolves to the opaque producer value.

---

## §3 · MINOR

### D-11 · MINOR · Two sibling group labels in one popup at two type sizes and two tracking values
`:55-62` sets the "Easing" heading to `@apply text-sm` (14 px) + `font-weight:500` + `letter-spacing:0.02em`. Its sibling group label, 4 lines away in the same `DropdownMenuContent`, is `<span class="text-muted-foreground text-xs">Speed</span>` (`AnimationControls.vue:116`) — 12 px, no tracking, no weight bump. Same role, same surface, different type. Both should be `DropdownMenuLabel` (exported at the installed pin, `dropdown-menu.js`).
**Falsifier:** a deliberate hierarchy between them — none exists; they are peer group headings in one column, and the *smaller* one heads the *simpler* control.

### D-12 · MINOR · The horizontal inset breaks the popup's shared 0.75 rem rhythm by 4 px
`:50` sets `padding: 0.375rem 0.5rem`. Its two siblings in the same column use `0.75rem`: the Speed group's `px-3` (`AnimationControls.vue:115`) and the menu-item chassis' `padding: 0.5rem 0.75rem` (`AnimationControls.vue:220`). So the easing block's left/right edges sit 4 px inside everything above and below it — a visible ragged edge down a 9 rem-wide column. Notably the author **did** mirror the vertical rhythm exactly (`margin-bottom:0.125rem` + `padding-bottom:0.5rem` at `:52-53` ↔ `mb-0.5 pb-2` at `:115`), which makes the horizontal miss an oversight rather than a choice.
**Falsifier:** if the grid needed the extra 8 px — it does not; the grid is `1fr`-based (`:65`) and would simply narrow.

### D-13 · MINOR · Two 1 px dividers, same popup, same intent, computed in different colour spaces
`:51` `border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent)`. `AnimationControls.vue:115` uses `border-b border-border/50`, which Tailwind v4 compiles to `color-mix(in oklab, var(--border) 50%, transparent)`. Same nominal 50 % of the same token, two different interpolation spaces ⇒ two subtly different greys stacked 40 px apart. Use the utility (or the `oklab` mix) for both.
**Falsifier:** if Tailwind v4 emitted an sRGB mix for the `/50` modifier — it does not; `oklab` is v4's opacity-modifier space.

### D-14 · MINOR · The label transition violates the law the file cites 14 lines above it
`:78` — *"A.W3.d — named properties + canonical token, no `transition: all`."* — then `:79` correctly uses `var(--ease-standard)` twice. `:93` then writes `transition: color 0.15s` with **no timing function**, defaulting to the CSS `ease` keyword. Both legs of one state change (chip surface + label colour) therefore run 0.15 s on two different curves. Self-falsifying comment; one-token fix.
**Falsifier:** if `--ease-standard` resolved to `ease` — it resolves to `var(--motion-ease-standard)` (`styles/theme/bridges.css:325`, `tokens/scheme-motion.css:216`), a bezier.

### D-15 · MINOR · Shorthand-then-longhand padding masks the intended asymmetric inset
`:50` `padding: 0.375rem 0.5rem;` then `:53` `padding-bottom: 0.5rem;`, with `:51-52` (border, margin) interleaved between them. The effective box is `0.375rem 0.5rem 0.5rem`, but a reader has to diff two non-adjacent declarations to see it, and any future edit to `:50` silently loses to `:53`. Write the three-value shorthand once.
**Falsifier:** none — this is a pure legibility defect with no behavioural consequence.

### D-16 · MINOR · The accent literal has two sources of truth and no dark arm
`hsl(248 88% 71%)` appears at `EasingPicker.vue:49` (as `--easing-accent`) **and** at `EasingCurvePreview.vue:12` (as the `color` prop default). The preview's default is dead for its only consumer — `:33` always passes an explicit colour — but it is a second literal that will drift. Separately, it is the only colour in the component with no `light-dark()` arm while `--muted-foreground`, `--muted` and `--border` all flip; that single fixed value is what forces D-2. The producer has since minted the landing site the `:44-47` carry comment is waiting for: `--motion-accent`, folded into `--easing-curve-accent` with a `--viz-legendre` self-sufficient default (`glass-ui/src/components/easing/README.md`, "The single color event"; `EasingPicker.vue:14-20` in the producer). Update the carry note; the upstream filing is answered.
**Falsifier:** if the preview's default were reachable — `:30-34` is the only mount and always binds `color`.

### D-17 · MINOR · The decorative SVG carries no `aria-hidden` — the one ARIA omission in an otherwise ARIA-rigorous file
`EasingCurvePreview.vue:18-24` renders a bare `<svg>` with no `role`, no `aria-hidden`, no `<title>`. It is purely decorative (the label carries the name), so it should be `aria-hidden="true"`. In a component that spends six lines justifying its role choice (`EasingPicker.vue:10-15`), this is the gap.
**Falsifier:** if the SVG carried the accessible name — it does not; the name comes from `:35`'s text. Impact is low (an unnamed `<svg>` contributes no text), which is why this is MINOR not MAJOR.

### D-18 · MINOR · `aria-label` duplicates the visible heading instead of referencing it
`:16` `aria-label="Easing"` and `:17` `<span>Easing</span>` are two independent copies of one string. `aria-labelledby` pointing at the heading would keep the accessible name locked to the rendered text; as written, an edit to one silently desynchronizes the other (a latent WCAG 2.5.3 label-in-name drift). `DropdownMenuLabel` + `DropdownMenuRadioGroup` wire this natively.
**Falsifier:** if the heading were not the group's visible label — it is, positionally and semantically.

### D-19 · MINOR · The only member of the visualization family with zero `prefers-reduced-motion` reference
`lane-frontend.md:612-622` counts 18 reduced-motion references across 12 files, including 8 CSS `reduce` blocks in this exact family (`AnimationControls.vue:178`, `ContourSettings.vue:370`, `ConvergencePlot.vue:405`, `CollapsibleSection.vue:66`, `GalleryCard.vue:304`, `GalleryMarquee.vue:126-129`, `DarkModeToggle.vue:104`, `style.css:92`). `EasingPicker.vue` has none. Its own motion is small (two 0.15 s colour/geometry fades at `:79,93` — defensible under WCAG 2.3.3 as non-essential-but-minimal), so this is MINOR on its own merits. It is booked here because the file is the *selector for the animation curve* and therefore the natural seat for the reduced-motion story the corpus already flagged as a coverage gap (`lane-frontend.md:624`, CENSUS §5 risk — `stores/animation.ts` runs its rAF clock ungated under `reduce`). The picker is where a user would look for it.
**Falsifier:** a global `@media (prefers-reduced-motion: reduce) * { transition: none }` in `src/style.css` — `:92` is a scoped block, not a universal reset.

### D-20 · MINOR · The popup's width is set by the longest label, because the chips cannot shrink
`.menu-popup` declares `min-width: 9rem` (`AnimationControls.vue:210`), not a width. The grid is `repeat(3, 1fr)` (`:65`) whose `1fr` floors at min-content; Button's base adds `whitespace-nowrap` and `.btn-pill > * { @apply flex-shrink-0 }` (`glass/surfaces.css:158-160`) pins both children. So "Exponential" — 11 characters at 9 px, the longest of six incidental strings — sets a column's min-content, and thereby the whole menu's width, and thereby the layout of the Speed row and the Export item that share the column. Rename an easing and the menu resizes.
**Falsifier:** a `max-width` or `overflow` on the popup — `:206-211` sets neither. Exact resulting px: **UNPROVEN-NEEDS-LIVE (SS-13)**; the dependency chain is static-certain.

---

## §4 · INFO

### D-21 · INFO · State coverage: empty / loading / error are genuinely N/A — closed, not skipped
`EASING_OPTIONS` is a compile-time `Record<AnimationEasingName, …>` over a 6-member string-literal union (`lib/easings.ts:71-83`), re-exported statically (`stores/animation.ts:11`). There is no fetch, no async, no failure mode; the grid can never be empty and never loads. The states that *do* exist — rest / hover / active-selected / focus — are all painted, with focus delegated to the producer's `focus-ring` base class rather than hand-rolled (a good call; see S-3). The one un-covered state is **focus-visible on the selected chip**, where the 1.5 px transparent-to-accent border (`:75,85`) and the producer's ring share the same edge; whether they stack legibly is **UNPROVEN-NEEDS-LIVE (SS-13)** — and moot once D-1's cure lands (`DropdownMenuRadioItem` owns the ring).
**Falsifier:** any runtime source for the catalogue — none; it is a module const.

### D-22 · INFO · Two `as EasingName` casts in the template
`:28` and `:31` each cast, because `v-for` over a `Record` widens the key to `string`. A `computed` yielding typed `Object.entries` pairs removes both and lets the template stay assertion-free. Cosmetic; no runtime consequence.
**Falsifier:** none — it is a readability note, filed because the file is otherwise fastidious about explaining itself.

### D-23 · INFO · `repeat(3, 1fr)` hard-codes an arity the catalogue does not pin
`:65` assumes 6. A seventh easing added to `ANIMATION_EASINGS` (a one-line change in a file whose stated purpose is to be a catalogue) yields a single orphan on row 3. `repeat(auto-fit, minmax(…, 1fr))` is arity-safe. Filed INFO because 3 × 2 is the correct proportion *for six* — the grid is right today and brittle tomorrow.
**Falsifier:** a type-level pin of the union's cardinality — `AnimationEasingName` (`lib/easings.ts:71`) is an open-to-edit union with no such constraint.

---

## §5 · Superlatives (L-18 runs both ways — each carries its own falsifier)

### S-1 · The ARIA rationale is genuinely correct, and better-reasoned than most of the corpus
`:10-15` reasons through `role="group"` (an allowed child of `role="menu"`, satisfying `aria-required-children`) and `role="menuitemradio"` + `aria-checked`, and explicitly rejects `aria-pressed` because it *"would mislabel a radio as a toggle."* That is right — `aria-pressed` denotes a toggle button, not a member of a mutually-exclusive set — and it is right in the face of a real temptation, since the ghost variant ships `aria-pressed:` styling that would have "just worked" (D-9). Corroborates `lane-frontend.md:629`.
**Falsifier (and it bites):** the roles are painted on elements the host menu's keyboard model cannot focus (D-1), so the correctness is inert — a screen-reader user is told these are radio options in a group and then cannot reach them. Correct ARIA over an unreachable control is a *more* confusing outcome than no ARIA. The superlative stands for the reasoning; the interaction is a BLOCKER.

### S-2 · The carry is documented with a named upstream filing
`:44-47` names the token (`--viz-easing`), the destination (glass-ui), the ledger (`coordination/CONSTELLATION.md`), and the reason it lives locally (*"EasingPicker is the sole in-tree consumer"*). This is the carry discipline the standing BH/BI relay law asks for, executed unprompted in a 98-line file.
**Falsifier:** the literal is duplicated in a second file (`EasingCurvePreview.vue:12`) so "the carry lives here" is not quite true; and the upstream landing site has since shipped (`--motion-accent` → `--easing-curve-accent`, producer `easing/README.md`), so the carry is now overdue rather than merely open — the note needs a date and a re-check, not just a filing.

### S-3 · Motion discipline: named properties, canonical token, cited law, and no hand-rolled focus ring
`:78-79` transitions exactly two named properties on `var(--ease-standard)` and cites the tranche law (`A.W3.d`) that forbids `transition: all`. The component also declines to hand-roll a focus ring, inheriting `focus-ring` from Button's base class — the correct instinct, and one many sibling components in this repo do not follow (`AnimationControls.vue:183` rolls its own `outline: 2px solid rgba(255,255,255,0.6)`).
**Falsifier:** `:93` breaks the cited law 14 lines later (D-14), and the inherited focus ring may collide with the bespoke 1.5 px active border (D-21) — so the discipline is real but not carried through the file.

### S-4 · `_svgCache` is exactly the right memoization, correctly bounded
`lib/easings.ts:99-108` caches each generated 32-sample path by name. Six previews therefore cost six path builds **once for the process**, not one per render — and because the key type is a 6-member string-literal union (`:71`), the cache is provably bounded at six entries with no eviction policy needed. Precisely-sized engineering: no library, no `computed` ceremony, no unbounded growth.
**Falsifier:** if the cache key could be attacker- or user-controlled (unbounded growth) — it cannot; `getEasingSVGPath(name: AnimationEasingName)` is typed to the closed union and every call site passes a catalogue key. The one nit: `generateCurveSVGPath`'s `n = 32` (`:89`) is unrelated to `--ui-scale` or DPR, so at the coarse 24 px render (D-6) the polyline is over-sampled ~2×, and at a hypothetical large render under-sampled — immaterial at every size this component actually paints.

---

## §6 · What this axis hands the wave board

1. **Re-home the F.W3 line** (X-D1): `./easing` is not the target; `./toggle-chip` → `./chip` is, and it shares the `NotationPills.vue` budget already open at `lane-frontend.md:441`.
2. **Three cures land at the OLD pin, before F.W1** — D-1 (`DropdownMenuRadioGroup`/`RadioItem`/`Label`, same import line, `AnimationControls.vue:9`), D-2 (a light-arm darken, following the `--viz-amber` precedent at `src/style.css:113-125` exactly), D-3 (a bounds-fit or `-0.05 -0.05 1.1 1.1` viewBox). None waits on the tri-package deadlock. Given CENSUS §5 risk 10 (**vitest ABSENT**; the only gates are `vue-tsc` + 29 single-chromium Playwright tests), landing them pre-uplift also means landing them against a stable baseline rather than inside the largest break surface in the tree.
3. **Two rows need one live paint each** to close (SS-13): D-6 (computed `width` of `.easing-preview` — decides whether D-3 reads 27.3 % or 39 %) and D-5 (the fine/coarse box vs content overflow). D-20's exact popup width rides along.
4. **The uplift break surface for *this* component is narrow**: `./button` survives 4→7; the file imports no removed subpath (no `metric-badge`, no `hover-card`/`-popover`, no dock member, no `ToastVariant`). Its exposure to F.W1 is indirect only — `lib/easings.ts:9,16` is two of the five bare-root `value.js` specifiers in the deadlock (`lane-frontend.md:480`), and the six curves this component draws are exactly what breaks if that import moves to `/easing` incorrectly. **That makes EasingPicker the cheapest visual witness for the F.W1 value.js half**: if the six curve previews still draw after the bump, `easeInOutSine/Quad/Cubic/Circ/Expo` all resolved.

---

*Challenge only. One file written (this one). No product source in any repo was modified; fourier-analysis, glass-ui, reka-ui and value.js were read read-only.*
