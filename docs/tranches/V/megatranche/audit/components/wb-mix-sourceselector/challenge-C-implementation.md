# CHALLENGE-C — `demo/workbenches/mix/MixSourceSelector.vue` — implementation

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The component's primary affordance is **inert on the live tree**. In `colors` mode — the default
mode — there is **no reachable way to add a color**. Both add paths (the ghost add-slot and the
"From palettes" swatches) are rendered as `aria-hidden`, `pointer-events: none` `<span>` elements
with no click listener, no accessible name, and no glyph. The Mix workbench cannot be driven to a
mixable state through this component at all.

The cause is a **glass-ui 5→7 breaking change that the W44 adoption commit `f2c8f565` missed**:
`WatercolorDot` lost its `tag` prop, its default slot, and its attribute/listener fallthrough. Three
Playwright specs already encode the correct behaviour and are RED. **CI does not run Playwright.**
`vue-tsc` on the demo project exits 0 — it is structurally blind to a removed component prop.

Scope of the audit: the whole file (283 lines), `composables/useMixingState.ts`, `MixPane.vue`,
`MixAnimationCanvas/composables/mixStage.ts`, the consumed glass-ui 5.0.0 / 6.0.0 / 7.0.0
`WatercolorDot` + `SegmentedTabs` dist surfaces, `PaletteCard`, `demo/styles/utils.css` +
`animations.css`, the three e2e specs, `.github/workflows/ci.yml`, and the live tree at
`http://localhost:9000/#/mix`.

---

## C-1 · BLOCKER — every interactive `WatercolorDot` in this file is a dead `<span>`; colors mode cannot add a color

### The break

`@mkbabb/glass-ui@7.0.0` `WatercolorDot`:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts
type __VLS_Props = {
    color: string;
    variant?: "solid" | "ghost";
    animate?: boolean;
    cycleDuration?: number;
    range?: [number, number];
    seed?: string;
};
```

No `tag`. No slots type. And the compiled render (`dist/watercolor-dot.js:80`, `:96-110`):

```js
inheritAttrs: !1,                                  // ← nothing falls through
__name: "WatercolorDot",
...
let n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style);   // ← ONLY class + style are read
return (t, n) => (d(), o("span", {                 // ← ALWAYS a <span>; no resolveDynamicComponent
    "aria-hidden": "true",                         // ← hardcoded, unconditional
    ...
    style: u([f.value, { ..., pointerEvents: "none", ... }])   // ← hardcoded
}, [ /* filter host svg */, ghost stroke ]));      // ← no renderSlot: children are DISCARDED
```

This is a regression, and it landed exactly at 7.0.0:

```
$ npm pack @mkbabb/glass-ui@5.0.0 && grep -n "tag?" package/dist/components/watercolor-dot/WatercolorDot.vue.d.ts
46:    /** Host tag — `div` (decorative) or `button` (interactive). */
47:    tag?: "div" | "button";
$ npm pack @mkbabb/glass-ui@6.0.0 && grep -n "tag?" .../WatercolorDot.vue.d.ts
47:    tag?: "div" | "button";        →  6.0.0 HAS tag
```

5.0.0's render (`dist/watercolor-dot.js:117`) was
`a(h(e.tag), { ... }, { default: y(() => [m(t.$slots, "default")]) })` — a dynamic host tag, default
`inheritAttrs` (listeners + `aria-*` + `title` + `disabled` all forwarded), and a rendered default
slot. glass-ui 7 removed all three. The demo bumped to `^7.0.0` at `f2c8f565`
("adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface"); its commit body enumerates a
dozen migrated drifts and does not mention `WatercolorDot`.

### What this does to this file — measured on the live tree

`MixSourceSelector.vue:164-176` (the add-slot) and `:211-221` (the palette swatches) both pass
`tag="button"`, an `aria-label`/`:title`, an `@click`, and (for the add-slot) a `<Plus>` child and
`:disabled`. **All of it is discarded.**

```
$ # http://localhost:9000/#/mix, Playwright evaluate on the live dev server
{
  "addSlot": {
    "tagName": "SPAN",
    "ariaHidden": "true",
    "ariaLabel": null,
    "disabled": null,
    "pointerEvents": "none",
    "tabIndex": -1,
    "svgClasses": ["watercolor-filter-host"],     ← the <Plus> glyph is NOT in the DOM
    "hasPlusSvg": false,
    "rect": { "width": 48, "height": 48 },
    "outerHTMLHead": "<span aria-hidden=\"true\" class=\"add-slot-ghost w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer hover:scale-110 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none watercolor-swatch\" ...>"
  },
  "addByRole": false                              ← 0 elements match [aria-label="Add current color to the mix"]
}
```

Five simultaneous failures on one element: **not a button** · **no click listener** ·
**`aria-hidden="true"`** · **`pointer-events: none`** (so even a coordinate click cannot reach it)
· **no glyph**. It is a decorative dashed blob. The identical five apply to every palette swatch at
`:211-221`, so the second add path is dead too.

The screenshots confirm the visual half — a naked dashed silhouette with **no `+`**, on both
matrices:
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/mix.png` and
`.../safari-mobile-dark/mix.png`.

Consequence for the *selected* chips at `:146-151`: `tag="div"` is harmless (a `<span>` also lays
out inline), but `:title="\`${sc.css} (${sc.source})\`"` is dropped, and the chip carries
`aria-hidden="true"` — so each selected color is **completely invisible to assistive technology**
and its only human-readable identification never renders.

### Reproduction

```
$ VJS_E2E_PORT=9000 npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
Running 1 test using 1 worker
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget

    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
      42 |     await expect(addSlot).toBeVisible();
  1 failed
```

Two more specs are RED for the same reason (not run, but the same locator on the same dead node):
`e2e/smoke/safari/mix-flow.spec.ts:29-35` and `e2e/smoke/oracles/o15-dock-register.spec.ts:53-56`.

### Cure (gestalt, not patch)

Do **not** re-hand-roll a wrapper. The `tag` + slot seam is a glass-ui-owned regression: relay it to
the glass-ui BH inbox (standing fond, `feedback-glassui-bhbi-relay`) and restore `tag` +
`renderSlot` + attr fallthrough upstream, which repairs every consumer at once (this repo has
**19 files** importing `WatercolorDot`). Until then, the correct local shape is the one PaletteCard
already uses at `PaletteCard.vue:96-105` — a real glass-ui `<Button icon-only variant="ghost">`
that *hosts* a decorative `<WatercolorDot>`, never a `WatercolorDot` pretending to be a button.

---

## C-2 · BLOCKER — the only gate that catches C-1 is not wired; the type gate is structurally blind

```
$ grep -n "run:" .github/workflows/ci.yml
32: - run: npm ci
33: - run: npm run lint
34: - run: npx vue-tsc -p tsconfig.lib.json --noEmit
35: - run: npx vue-tsc -p tsconfig.demo.json --noEmit
36: - run: npm run build
37: - run: npm test
50: - run: node scripts/ci/verify-packed-surface.mjs ...
70: - run: npx tsc --noEmit        (api job)
71: - run: npm test                (api job)

$ grep -rn "playwright\|test:e2e" .github/workflows/
(no output)
```

**Playwright is never invoked in CI.** `package.json` defines `test:e2e = playwright test`; nothing
calls it. The three specs that encode this component's contract are decorative.

And the type gate cannot see the break:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "exit=$?"
exit=0          (zero lines of output)
```

`tag="button"`, `:title`, `:disabled`, `aria-label` on a component whose props type declares none of
them are accepted as fallthrough attributes. **Removing a prop from a design-system component is
invisible to `vue-tsc` by construction.**

Unit-test truth: `grep -rn "MixSourceSelector" test/` → **zero hits.** There is no vitest coverage
of this component at all. The exact mutation that keeps every wired gate green: *delete the entire
`<template>` block.* `npm run lint`, both `vue-tsc` passes, `npm run build`, and `npm test` all stay
green.

**Cure.** Wire `test:e2e` into `ci.yml` as a hard step (the W44 precedent — D48/D56 flipped
demo-typecheck + test to hard; e2e was left out). Separately, a **consumer-contract gate** is the
real structural cure for the C-1 *class*: an assertion that every glass-ui component the demo passes
`tag=`/slot children to still declares them — a build-time read of the installed `.d.ts`, not a
runtime probe. Without it the next major glass-ui bump repeats this exactly.

---

## C-3 · MAJOR — the "stable keys" scheme is index-derived, so a removal re-keys every chip after it

`MixSourceSelector.vue:78-98`. The map key is `` `${sc.css}::${i}` `` — it embeds the array index,
so it is not an identity. The `watch` prune (`:90-98`, default `flush: 'pre'`, therefore running
**before** the render that re-evaluates `swatchKeys`) then deletes every entry whose index shifted,
guaranteeing a fresh counter value on the next read.

Reproduction — the algorithm transcribed verbatim from `:79-98` and driven through
`useMixingState.removeColor` / `addColor` (`composables/useMixingState.ts:55-61`):

```
$ node docs/tranches/V/megatranche/audit/components/wb-mix-sourceselector/swatch-key-churn.repro.mjs
render 1  [red,green,blue]      keys = [ 0, 1, 2 ]
render 2  [green,blue]          keys = [ 3, 4 ]   <- green/blue DID NOT CHANGE
render 3  [green,blue,gold]     keys = [ 3, 4, 5 ]
render 4  [green,gold]          keys = [ 3, 6 ]   <- green STILL unchanged
counter   = 7  (index-only keying would have used 0..2 forever)
```

Removing the head of a 3-chip row re-keys **both** survivors. Vue therefore unmounts and remounts
them, which means:

1. **The FLIP move animation never runs.** `demo/styles/utils.css:167-179` documents the intent
   verbatim — *"neighbours reflow on the family move class"* — and `.vj-enter-move` exists at
   `demo/styles/animations.css:99`. A re-keyed node is a *new* node: it gets `enter`, never `move`.
   The shared recipe's central promise is unreachable through this component.
2. **The row visibly collapses.** `demo/styles/utils.css:177-179` sets
   `.swatch-row > .vj-enter-leave-active { position: absolute }`. Removing one chip from a row of
   N puts up to N−1 *unchanged* chips into `position: absolute` at once; the row's flow content
   empties and re-inflates.
3. **N−1 glass-ui filter graphs are rebuilt.** Each `WatercolorDot` mounts its own namespaced
   `<filter>` with `feTurbulence numOctaves="5"` keyed on `useId()`
   (`dist/watercolor-dot.js:96,119-127`). glass-ui's own header warns this is the Safari §H
   rasterization hazard. At the `MAX_COLORS = 12` ceiling, removing chip 0 re-rasterizes 11
   turbulence filters in one frame.

This is strictly worse than `:key="i"`, which the scheme was introduced to improve on.

**Cure.** Key on identity, not position. `SelectedColor` (`useMixingState.ts:25-28`) has no id; give
it one at the single mint point (`addColor`) — `{ id: ++seq, css, source }` — and use `:key="sc.id"`.
The counter, the `Map`, the prune `watch`, and the `swatchKeys` computed all delete. Twenty lines
become zero, and the keys become actually stable.

---

## C-4 · MAJOR — the remove control is a nameless 16 px button that is invisible to touch

`MixSourceSelector.vue:152-158`:

```html
<button
    class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive ... opacity-0 group-hover:opacity-100 ..."
    :disabled="!canRemoveColor || undefined"
    @click="emit('removeColor', i)"
>
    <X class="w-2.5 h-2.5" />
</button>
```

Four defects on five lines:

- **No accessible name.** The only child is a lucide `<svg>`; `@lucide/vue@1.17.0`'s
  `dist/esm/defaultAttributes.mjs` emits no `<title>` and no `aria-label` — the button's accessible
  name is the empty string. The author knew the idiom: the `<Plus>` two elements away at `:175`
  carries `aria-hidden="true"`, and `PaletteCard.vue:97-104` pairs `aria-label="Palette menu"` with
  `aria-hidden` on its glyph. This one got neither.
- **Target size 16 × 16 CSS px**, measured live (`w-4 h-4` → `{ w4: 16, h4: 16 }`, root font-size
  16px). WCAG 2.2 SC 2.5.8 floor is 24 × 24; the mega-tranche visual probe uses the same 24 px
  threshold.
- **`opacity-0` with only `group-hover:` and `focus-visible:` escapes.** There is no hover on touch.
  On iOS Safari the control is a fully transparent 16 px hit area at the corner of a 48 px dot — an
  invisible destructive action. (`opacity: 0` does not remove pointer events, so it is *hittable*,
  just not *visible*: the worst of both.)
- **No `type="button"`.**

It is also a **4th copy of a recipe this repo already retired.** `PaletteCard.vue:93-95` records the
kill: *"S.W5-4: 3rd copy of the hand-rolled icon-trigger recipe dies onto the glass-ui atom; the sm
square also cures the ~24px touch target."* This file re-mints both the recipe and the undersized
target the cure removed — edict 4 (glass-ui is the design system) and edict 5 (root-level styling)
in one control.

**Reproduction:** hypothesis at the *live DOM* level only — the chip cannot be rendered because
C-1 makes adding a color impossible. Static: `MixSourceSelector.vue:152-158`, the measured 16 px,
and the lucide default-attribute dump. This coupling is itself the finding: **the component's a11y
defects are absent from `REPORT.json`'s `/#/mix` rows (`namelessButtons: 1`, all 8
`smallTapTargets` belonging to the picker pane and dock) purely because its own primary affordance
is broken.** The visual audit under-reports this route.

**Cure.** `<Button icon-only variant="ghost" size="sm" aria-label="Remove {{ sc.css }}">` from
glass-ui, with `aria-hidden` on the glyph — the exact atom S.W5-4 established. Replace `opacity-0`
with a token-driven de-emphasis that keeps the control perceivable at rest.

---

## C-5 · MAJOR — `<button>` wrapping `<PaletteCard>` nests interactive content, against PaletteCard's own documented contract

`MixSourceSelector.vue:246-268` wraps `<PaletteCard>` in a native `<button>`. `PaletteCard.vue`
opens with (verbatim, lines 2-4):

> *"W5-a11y: `role="article"` provides a landmark for each palette; **button semantics on the card
> are omitted because inner interactive controls must be reachable** — using article + click is the
> correct pattern for a card container that also houses nested interactive elements."*

And it unconditionally renders one (`PaletteCard.vue:83-105`):

```html
<PaletteCardMenu ...>
    <template #trigger>
        <Button icon-only variant="ghost" size="sm" aria-label="Palette menu" ...>
```

So the produced tree is `button > div[role=article][aria-label="Palette: X"] > … > button`. The HTML
`button` content model forbids interactive descendants; the accessibility tree is malformed, the
inner "Palette menu" button is a tab stop inside a button, and the card's `role="article"` +
`aria-label` collide with the wrapper's own `:aria-label` (`:251`). `PaletteCardMeta` adds a vote
control on the same path.

**Reproduction:** static — hypothesis at the live-DOM level (`savedPalettes` is empty on the probed
tree, so palettes mode renders `EmptyState` only). The nesting is unconditional in the template and
the inner `<Button>` is unconditional in `PaletteCard`.

**Cure.** Adopt PaletteCard's contract instead of overriding it: drop the wrapper `<button>`, bind
`@click="togglePalette(palette)"` to the card's own `click` emit, and express selection with the
card's own state surface. If a pressed semantic is genuinely needed on a card, it belongs in
glass-ui / PaletteCard as a `selectable` mode — not as a consumer-side wrapper (edicts 3 and 4).

---

## C-6 · MAJOR — the `MAX_COLORS` guard is not in the state machine, and one of the two add paths bypasses it entirely

`MixSourceSelector.vue:37-40` declares `MAX_COLORS = 12` and `canAddColor`. It is consumed in
exactly one place — `:disabled` on the add-slot (`:172`) — which C-1 proves is dropped. Meanwhile:

- `addCurrentColor()` (`:69-73`) checks only `cssColorOpaque` truthiness; it never reads
  `canAddColor`. The cap rides entirely on an attribute.
- The palette-swatch path (`:220`) emits `addColor` with **no guard at all**.
- `useMixingState.addColor` (`useMixingState.ts:55-57`) is `[...selectedColors.value, {…}]` — an
  unconditional append. The state machine has no ceiling.

So the cap is trivially bypassable the moment C-1 is repaired. It is also an undeclared coupling:
`mixStage.ts:29` sets `const MAX_DROPS = 12` — the same number, in a different module, with no
shared constant. Exceeding it silently truncates the convergence animation
(`mixStage.ts:157 origins.slice(0, MAX_DROPS)`) — the mix computes over N colors while the
choreography narrates 12.

**Reproduction:** static (blocked live by C-1). `:220` has no guard token in it; grep of
`useMixingState.ts` for `MAX` returns nothing.

**Cure.** The ceiling is a machine invariant, not a view decoration: enforce it in
`useMixingState.addColor` (early-return at the cap) and export the constant once, consumed by both
the selector and `mixStage` — one number, one owner.

---

## C-7 · MINOR — the Selected region is silent to assistive technology

Adding or removing a chip changes only `aria-hidden` `<span>`s (C-1) inside a plain `<div>`. There
is no `aria-live`, no `role="status"`, no visible count (the counter was deliberately retired at
W5-7, `:117-118` — a defensible call, but nothing replaced its announcement).

```
$ # live, http://localhost:9000/#/mix
document.querySelectorAll('[aria-live]')  →  []      (zero on the entire route)
```

A screen-reader user gets no feedback that the action succeeded, and cannot enumerate what is
selected.

**Cure.** A polite live region owned by the `Selected` well announcing the roster ("3 colors
selected: …"), and real accessible names on the chips once C-1 restores attribute fallthrough.

---

## C-8 · MINOR — the mode strip is an unnamed `role="group"`

`SegmentedTabs` (glass-ui 7.0.0) declares `ariaLabel?: string` — *"Accessible name shared by the
desktop strip and responsive Select"* (`dist/components/tabs/SegmentedTabs.vue.d.ts:52`).
`MixSourceSelector.vue:105-110` omits it. Live:

```
{ "role": "group", "ariaLabel": null, "ariaLabelledby": null,
  "options": [ {"name":"Colors","pressed":"true","w":77,"h":31},
               {"name":"Palettes","pressed":"false","w":77,"h":31} ], "inMain": true }
```

The buttons are named; the *group* is not. If `responsive` ever resolves to a collapse, the mobile
`<SelectTrigger>` inherits the same missing name.

**Cure.** `aria-label="Mix source"` on the `<SegmentedTabs>`.

---

## C-9 · MINOR — `onTabChange` defends against a signature that does not exist (masking fallback)

`MixSourceSelector.vue:47-53` types the handler `(value: string | string[])` and branches
`Array.isArray(value) ? value[0] : value`, with the comment *"Single-select tabs always emit a
string; guard the union honestly."* The producer's emit type is unambiguous:

```
$ grep -n "update:modelValue" node_modules/@mkbabb/glass-ui/dist/components/tabs/SegmentedTabs.vue.d.ts
"update:modelValue": (value: string) => any;
```

The array branch is unreachable. The comment concedes it. This is a defensive shim against a
non-existent producer shape — edict 2 (no masking fallbacks). It also widens the handler so that a
*real* future producer change would be silently absorbed instead of failing the type gate.

**Cure.** `function onTabChange(next: "colors" | "palettes") { emit("update:mode", next); }` — and
let `vue-tsc` be the guard.

---

## C-10 · MINOR — the machine's own initial state is unreachable from the component

`MIN_COLORS = 1` / `canRemoveColor = selectedColors.length > 1` (`:37,39`). `useMixingState` starts
at `selectedColors = ref([])` (`useMixingState.ts:42`) — zero is the boot state and a legal state.
Once a user reaches exactly one chip, the component can never return there: the last remove is
permanently disabled. The only escape is the dock action bar
(`demo/shell/usePaneRouter.ts:220`, `handler: () => paneRefs.mix.value?.clearSelection?.()`) — a
control in a different surface, with a different label ("Clear"), which the user must know exists.

**Cure.** `MIN_COLORS = 0`. Nothing downstream needs a floor: `canMix` already requires ≥2
(`useMixingState.ts:50-53`) and `collectStage` already returns `null` on zero origins
(`mixStage.ts:155`).

---

## C-11 · MINOR — `:css-color="''"` defeats PaletteCard's empty-palette fallback

`MixSourceSelector.vue:266` passes `:css-color="''"`. `PaletteCard.vue:226`:

```ts
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);
```

`''` is not nullish, so `??` keeps it: for a zero-color palette — which PaletteCard explicitly
supports (*"S.W2 W2-9: a palette with zero colors is a real, reachable state"*) — `firstColor`
becomes `''` and `EMPTY_PALETTE_SWATCH` is never reached. Not a crash:
`certifyAccentInk('')` → `parseOklch('')` → `null` → returns `''` (`demo/color-session/ink.ts:135-136`),
so the parse-crash class is dodged by one guard. But an empty-string sentinel threaded into a color
resolver is exactly the shape the repo's live `parseCssColor` crash class comes from, and one
refactor of `certifyAccentInk` away from `PickerColorError`
(`demo/color-session/picker-color.ts:109-113` throws on `''`).

**Cure.** Omit the prop. It is optional (`cssColor?: string | undefined`).

---

## C-12 · MINOR — dead CSS + a per-instance interaction stack minted onto a design-system primitive

- `MixSourceSelector.vue:275-282` — the scoped `.add-slot-ghost { display: inline-flex; align-items:
  center; justify-content: center }` exists solely to centre the `<Plus>` slot child that glass-ui 7
  never renders (C-1). Dead rule, live comment.
- `:170` mints `hover:scale-110 active:scale-95 transition-transform focus-visible:ring-2
  focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed
  disabled:pointer-events-none` **per instance** onto a glass-ui primitive. Every `disabled:` and
  `focus-visible:` variant in that stack is inert on a `<span aria-hidden pointer-events:none>` (see
  the live `outerHTMLHead` in C-1) — dead utilities that ship on every render. Interaction registers
  belong in glass-ui (edicts 4 + 5), not in a consumer's class attribute.
- `<Plus>` (`:175`) and the `Plus` import (`:3`) construct a vnode every render that is immediately
  discarded.

---

## C-13 · MINOR — `SelectedColor.source` is dead data

`useMixingState.ts:25-28` carries `source: string  // palette name or "picker"`; it is threaded
through `addColor(css, source)` at three call sites. Its only sink in the entire tree:

```
$ grep -rn "\.source" demo/workbenches/mix/
demo/workbenches/mix/MixSourceSelector.vue:150:  :title="`${sc.css} (${sc.source})`"
```

— the `:title` that glass-ui 7 drops (C-1). The field is stored, plumbed, and never surfaced.

**Cure.** Once C-1 is repaired the `title` returns and the field earns its keep; if provenance is
not wanted in the UI, delete the field rather than keep unread state.

---

## C-14 · INFO — index keys and repeated linear scans in palettes mode

- `:213` `:key="ci"` on palette swatches, with `:seed="\`palette-${palette.slug}-${ci}\`"` — the
  blob silhouette is keyed on *position*, so reordering a palette's colors elsewhere reshapes the
  dots rather than moving them.
- `isPaletteSelected` (`:57-59`, a linear `some`) is invoked **five times per palette per render**
  (`:250, :251, :252, :253, :258`). At the current scale this is free; a `computed` `Set` of
  selected slugs is the one-line idiomatic form.

---

## What is NOT wrong (the negative proof)

Checked against the brief's named local hazards, each with the evidence that rules it out:

- **`defineModel` stale-read.** Not used. The component is pure props-down / events-up
  (`:13-31`), and `useMixingState` replaces arrays immutably (`useMixingState.ts:56,60,67,71`) —
  there is no write-then-read seam in this file at all.
- **oklch→HSV hue drift / `stableHue`.** No hue math here; the component only forwards CSS strings.
- **`ValueUnit` nesting accumulation.** No `ValueUnit` construction anywhere in the mix workbench
  (`grep -rn "ValueUnit" demo/workbenches/mix/` → 0).
- **reka-ui pointer-capture leaks.** No slider, no `setPointerCapture`, no drag surface.
- **Ungated rAF (PRM-RAF epidemic).** Zero `requestAnimationFrame` in this file. The one clock lives
  in `useMixingAnimation` and the file's docblock (`useMixingState.ts:5-15`) is accurate — this
  component owns no timer.
- **WebGL / context loss.** No GL surface. The mix canvas is 2D and PRM-aware by construction.
- **Listener / observer leaks, unbounded growth.** The only long-lived structure is `swatchKeyMap`,
  and its prune (`:90-98`) does bound it — the defect there is key *churn* (C-3), not a leak. No
  `addEventListener`, no observer, no interval.
- **Reactivity that will not fire.** `watch(() => selectedColors, …)` is sound: `useMixingState`
  always assigns a **new array**, so the shallow ref-identity watcher fires on every mutation.
- **`verbatimModuleSyntax`.** Compliant — `import type { Palette }` (`:10`), `import type
  { SelectedColor }` (`:11`); all other imports are genuine value imports.
- **Vue 3.5 reactive props destructure.** Correct (`:13-23`), and the derived `computed`s at
  `:34,39,40` track properly.
- **Console / page errors on the route.** `REPORT.json` `/#/mix`: `consoleErrors: []`,
  `pageErrors: []`, `failedRequests: []`, `overflowX: 0`, `main: 1` on all four matrices. The single
  live console error is the dev-server `VITE_API_URL` misconfiguration notice, not this component.
- **Animations deleted.** None. The retired `ring-2 ring-primary/50` (`:134-145`) was excised with a
  cited live probe and a standing oracle (`o15-dock-register.spec.ts`); the `vj-enter` family is
  consumed from `demo/styles/`, not forked.

---

## Family grouping

| family | findings |
|---|---|
| **glass-ui 5→7 consumer regression** | C-1 (dead `tag`/slot/attrs), C-12 (dead CSS + dead variants), C-13 (dead `source`) |
| **gate architecture** | C-2 (no e2e in CI; `vue-tsc` blind to removed props; zero unit tests) |
| **list identity / reconciliation** | C-3 (index-derived keys) |
| **a11y + target size** | C-4 (nameless 16 px, touch-invisible), C-5 (nested interactive), C-7 (no live region), C-8 (unnamed group) |
| **invariant placement (view vs. machine)** | C-6 (`MAX_COLORS` outside the machine), C-10 (`MIN_COLORS` strands the initial state) |
| **sentinels / defensive shims** | C-9 (phantom union), C-11 (`''` css-color) |

**Strongest defect: C-1.** It is not a degradation — it is a total functional loss of the
workbench's default mode, live, today, on `master`'s descendant. Everything else in this report is
downstream of, or masked by, it.
