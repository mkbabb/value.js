# Tranche A — Interactive-Element State Handling & Overlay Consistency

Audit of `demo/color-picker/` and `demo/@/` for the four-state button contract, overlay-surface
consistency, affordance/feedback gaps, and ad-hoc per-instance overrides of glass-ui primitives.

The demo's `demo/@/components/ui/*` directory is not shadcn-vue source — every file there is a
one-line re-export of `@mkbabb/glass-ui` (verified: `select/index.ts`, `popover/index.ts`,
`button/index.ts`, etc. all `export { ... } from "@mkbabb/glass-ui"`). So "restyle at the root"
means a change inside the glass-ui package, not inside `demo/@/components/ui/`.

glass-ui's four-state contract (from `glass-ui/src/components/ui/button/index.ts`): every `Button`
variant ships `default / hover / active / aria-pressed`, and the shared base locks
`focus-ring`, `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled`,
and `active:scale-[var(--scale-press-btn)]`. glass-ui's overlay primitives (`PopoverContent`,
`TooltipContent`, `DropdownMenuContent`, `HoverCardContent`, `DialogContent`) all converge on
`glass-floating` + `z-popover`/`z-tooltip`/`z-hovercard` + `popover-animate slide-in-from-side` and
need no per-instance surface classes.

---

## 1. Four-state buttons

### Ad-1 — GradientStopEditor stop handle has no disabled state and no hover feedback
`demo/@/components/custom/gradient/GradientStopEditor.vue:115-138`

The stop handle is a native `<button>` with selected/unselected styling only:

```
class="absolute top-1/2 w-5 h-5 rounded-full border-2 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
:class="[ selectedId === stop.id ? 'border-white ring-2 ring-primary z-[var(--z-popover)]' : 'border-white/80 z-0' ]"
```

There is no `:hover` rule (no scale, no border change), so an unselected handle gives no
pointer feedback until it is clicked. There is no disabled treatment at all; when `stops.length <= 2`
the right-click remove is silently ignored (`onHandleContextMenu`, line 95) but the handle still
looks fully interactive. The `transform: scale()` in the inline `:style` (line 130) responds to
`selectedId`/`draggingId` but never to `:hover`.

Fix (demo-level): add a `hover:scale-110` and a `[&:disabled]:opacity-disabled` branch driven by a
`removable` computed (`stops.length > 2`); set `disabled` on the handle when not removable so the
state matches behavior. The handle is a one-off drag affordance, so this stays in the component, not
glass-ui.

### Ad-2 — ColorInput `send-btn` lacks active and focus-visible states
`demo/@/components/custom/color-picker/controls/ColorInput.vue:61-76`, CSS `:305-322`

`.send-btn` defines `:hover` (`scale(1.1)`) and `:disabled` (`opacity: 0.3; cursor: not-allowed`) but
no `:active` press feedback and no `:focus-visible` ring. The button is keyboard-reachable
(native `<button>`) yet shows no focus outline, and the non-propose variant (line 70-76) is never
disabled even while a parse is mid-flight.

Fix (demo-level): add `.send-btn:active { transform: translateY(-50%) scale(0.95); }` and a
`focus-ring` (the glass-ui utility) or `:focus-visible` outline. This is a custom inline control, so
it stays in the component.

### Ad-3 — EditDrawer save/cancel are bare SVG icons, not buttons
`demo/@/components/custom/color-picker/editing/EditDrawer.vue:23-26, 34-37`

Save and Cancel are `<Check>` and `<Undo2>` lucide components with `@click` handlers directly on the
SVG:

```
<Check class="h-14 aspect-square stroke-foreground hover:scale-125 active:scale-90 transition-transform cursor-pointer focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none rounded-sm" @click="emit('commit')" />
```

An SVG is not focusable or keyboard-activatable without `tabindex` + `role`, so the
`focus-visible:ring-*` classes never trigger and the control can't be reached by Tab or activated by
Enter/Space. There is no disabled state, which matters because the drawer fires `commit` even when
the edited color equals the original. The same pattern repeats in `CurrentPaletteEditor.vue:63-68`
where the equivalent action is correctly wrapped in `<button>` — so the codebase already has the
right shape one file over.

Fix (demo-level): wrap each icon in a `<button type="button">` (matching `CurrentPaletteEditor`),
or use glass-ui `Button` with `variant="ghost" size="icon"`.

### Ad-4 — PointerDebugOverlay `.debug-btn` has no hover/active/focus/disabled
`demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue:75-86`, CSS `:332-355`

`.debug-btn`, `.debug-btn-danger`, `.debug-btn-copy` set only resting colors plus
`cursor: pointer`. No `:hover`, `:active`, `:focus-visible`, or `:disabled`. This is a dev-only
overlay so the priority is low, but the buttons still violate the contract.

Fix (demo-level, low priority): add `:hover` brightness and `:active` scale, or switch to glass-ui
`Button variant="ghost"/"destructive"`. Keep in the component.

### Ad-5 — Inline icon buttons across palette-browser use a repeated bespoke recipe
`PaletteSlugBar.vue:24-28, 74-76`, `PaletteRenameInput.vue:15-25`, `SortFilterMenu.vue:4-6`,
`AdminTagsPanel.vue:60-63`, `SearchFilterBar.vue:89-92`

At least seven native `<button>`s repeat the same hand-written recipe with small drift:

- `PaletteSlugBar.vue:24` — `class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0"` (no `:disabled`, no `:active`, no focus ring)
- `PaletteSlugBar.vue:19` — same recipe but adds `disabled:opacity-50 disabled:cursor-not-allowed` and `duration-[var(--duration-fast)]`
- `PaletteRenameInput.vue:15,21` — `class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0"`
- `SortFilterMenu.vue:4` — `class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0"`
- `AdminTagsPanel.vue:60` — `class="ml-0.5 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"` (no hover bg, no focus ring)

Only one of the five has a disabled treatment, none has `:active`, none has a focus-visible ring.
This is a `Button variant="ghost" size="icon"`-shaped need that has been re-implemented inline.

Fix (root, glass-ui): glass-ui already ships `Button variant="ghost" size="icon"` which covers
hover/active/aria-pressed/disabled/focus. Migrate these consumers to `<Button variant="ghost"
size="icon">`. If `size="icon"` (h-10 w-10) is too large for slug-bar context, add a glass-ui
`size="icon-sm"` variant rather than re-passing `p-0.5` per instance.

### Ad-6 — MixSourceSelector add/remove swatch buttons have no disabled or focus state
`demo/@/components/custom/mix/MixSourceSelector.vue:121-134`

The remove button (`:122`) and add button (`:130-134`) are native `<button>`s with hover styling
(`group-hover:opacity-100`, `hover:scale-110`) but no `:active`, no `disabled`, no focus ring. The
add button has no upper bound check visible here, and the remove has no disabled when only the
minimum sources remain.

Fix (demo-level): add `focus-visible` ring and `active:scale-95`; bind `disabled` to the
min/max-source guards.

---

## 2. Modals / dropdowns / popovers / hover-cards

There is one canonical overlay convention (glass-ui `glass-floating`) and a parallel hand-rolled one.

### Ad-7 — BulkActionToolbar uses a raw shadow + bg-card surface instead of glass-floating
`demo/@/components/custom/palette-browser/BulkActionToolbar.vue:10-13`

```
class="sticky bottom-2 z-[var(--z-popover)] mx-auto flex w-fit items-center gap-2 rounded-xl border border-border bg-card/95 px-4 py-2 shadow-lg backdrop-blur-sm"
```

This is a floating action surface built from raw primitives: `bg-card/95`, `shadow-lg`,
`backdrop-blur-sm`, `rounded-xl`, hand-set `border-border`. glass-ui's floating surfaces use
`glass-floating` (token-driven background, blur, border, shadow) and `rounded-panel`. The toolbar
diverges on every surface dimension — background opacity, shadow scale, blur amount, radius.

Fix (root + demo): use the glass-ui `.floating-panel` utility (already defined in
`glass-ui/src/styles/floating-panel.css` with `--glass-bg-resting`, `--glass-blur-resting`,
`--glass-shadow-resting`, `--radius-panel`) for the surface, keeping the layout classes local. If a
sticky/centered action-bar pattern is reused, that belongs as a glass-ui primitive, not re-derived
here.

### Ad-8 — PaletteControlsBar sticky header uses raw bg-card, no surface token
`demo/@/components/custom/palette-browser/PaletteControlsBar.vue:2`

```
class="flex flex-col gap-2 mb-4 min-w-0 sticky top-0 z-[var(--z-popover)] bg-card pb-2"
```

A sticky header painted with raw `bg-card` and `z-[var(--z-popover)]` (z 130 — popover level — for a
non-floating in-flow header is too high; it will paint over genuine popovers). It is not a glass
surface and not consistent with the BulkActionToolbar `bg-card/95`. Two sibling toolbars, two
backgrounds.

Fix (demo-level): pick one demo surface convention for in-flow toolbars (`bg-card` opaque is
defensible for a scroll-pinned header since content scrolls under it). Drop the
`z-[var(--z-popover)]` down to `z-[var(--z-controls)]` or a sticky-header token so it does not
outrank actual overlays.

### Ad-9 — SwatchHoverMenu hand-rolls a teleported panel parallel to PopoverContent
`demo/@/components/custom/palette-browser/SwatchHoverMenu.vue:21-23` vs `:35-45`

The component renders two different surfaces for the same menu. Touch path:
`<PopoverContent class="w-auto p-1.5 flex items-center gap-1" :side-offset="8">`. Hover path: a
`<Teleport to="body">` `<div class="floating-panel flex items-center gap-1 p-1.5">` positioned by a
JS `floatingStyle` prop. The `floating-panel` class is the glass-ui utility (good — same surface
tokens), so the visual result matches, but the menu now exists as two code paths with two
positioning systems (reka-ui Popover floating-ui vs a manual `useHoverPopover` style object).

This is a structural divergence rather than a styling one. It is acceptable if intentional
(hover-intent timing reka-ui's HoverCard doesn't give), but it doubles the maintenance surface and
the touch/hover paths can drift in padding (`p-1.5` is duplicated literally in both).

Fix (demo-level, lower priority): if reka-ui `HoverCard` open/close delays suffice, collapse to one
`HoverCard`; otherwise extract the shared `p-1.5 flex items-center gap-1` into a single constant so
the two paths can't drift.

### Ad-10 — PaletteSlugBar HoverCardContent forces z-popover, overriding the correct z-hovercard
`demo/@/components/custom/palette-browser/PaletteSlugBar.vue:45`

```
<HoverCardContent class="text-small font-display w-56 z-[var(--z-popover)]">
```

glass-ui's `HoverCardContent` already applies `z-hovercard` (z 120). Re-passing
`z-[var(--z-popover)]` (z 130) on this one instance raises a hover-card above popover level, which
is the wrong stacking order — a hover-card should sit below popovers. Two other consumers
(`ActionButton.vue:27`, `ColorInput.vue:87`) re-pass `z-[var(--z-hovercard)]`, which is harmless
duplication of the default but still noise.

Fix (demo-level): delete the `z-*` class from all three `HoverCardContent` instances; the primitive
already sets the correct token.

### Ad-11 — MigratePalettesDialog re-passes the dialog radius the primitive already sets
`demo/@/components/custom/palette-browser/MigratePalettesDialog.vue:3`

```
<DialogContent class="rounded-[var(--radius-dialog)] max-w-sm">
```

glass-ui `DialogContent` already composes `rounded-dialog` (verified in
`glass-ui/src/components/ui/dialog/DialogContent.vue:39-40`). The `rounded-[var(--radius-dialog)]`
is redundant; `FlagReportDialog.vue:3` (`<DialogContent class="sm:max-w-md">`) shows the correct
minimal form.

Fix (demo-level): drop the radius class, keep only `max-w-sm`.

### Ad-12 — PaletteDialog overrides the dialog surface with a fully bespoke shadow + outline block
`demo/@/components/custom/palette-browser/PaletteDialog.vue:5` and `<style>` `:594-658`

The dialog content class is `palette-dialog ... bg-card text-card-foreground ... rounded-[var(--radius-dialog)]`
and the scoped style replaces the glass-floating surface entirely:

```
.palette-dialog {
    box-shadow: 0 25px 50px -12px color-mix(in srgb, var(--foreground) 25%, transparent),
                0 0 0 1px var(--border);
}
```

This opts the largest modal in the app out of `glass-floating` and re-derives shadow, border, and
backdrop (`backdrop-filter: blur(4px) saturate(0.7)`, `:597`). The backdrop deviation carries an
`INTENTIONAL` comment, so leave that. The surface shadow/border re-derivation is not annotated and
is a divergence from every other dialog (`FlagReportDialog`, `MigratePalettesDialog`) that uses the
glass-ui default.

Fix (demo-level): keep the bespoke entry/exit animations and the annotated backdrop, but let the
surface itself fall back to the glass-ui `DialogContent` default (`glass-floating rounded-dialog`)
instead of `bg-card` + the hand-set `box-shadow`/`outline` block, unless the opaque surface is a
deliberate, documented choice like the backdrop.

---

## 3. Affordances & feedback

### Ad-13 — SearchFilterBar color-search button has no loading state for its async query
`demo/@/components/custom/palette-browser/SearchFilterBar.vue:89-93`

```
<button class="absolute right-0.5 top-0.5 h-6 px-2 ... cursor-pointer" @click="applyColorSearch">Search</button>
```

`applyColorSearch` triggers a remote palette query, but the button has no disabled-while-pending and
no spinner. `FlagReportDialog` (`:42`) and `ColorInput` (`:67`) both show the correct pattern with
`Loader2 ... animate-spin`. The color-search button gives no feedback that a request is in flight,
so a user can fire duplicate queries.

Fix (demo-level): bind `disabled` to a `searching` ref and swap the label for `<Loader2
class="animate-spin" />`, matching the `FlagReportDialog`/`ColorInput` pattern.

### Ad-14 — SearchFilterBar color-swatch trigger button has no focus-visible ring
`demo/@/components/custom/palette-browser/SearchFilterBar.vue:74-77`

```
<button class="block h-7 w-7 rounded-full border-2 border-border shadow-cartoon-sm cursor-pointer transition-shadow hover:shadow-cartoon-md shrink-0" :style="{ backgroundColor: pickerHex }" />
```

Hover feedback exists (`hover:shadow-cartoon-md`) but there is no `:active` and no focus-visible
ring; as a `PopoverTrigger` it is keyboard-reachable and should show focus.

Fix (demo-level): add the glass-ui `focus-ring` utility class.

### Ad-15 — MixSourceSelector add/remove and GradientStopEditor handles give no error/empty feedback
`MixSourceSelector.vue:121-134`, `GradientStopEditor.vue:93-98`

Right-click remove on a gradient stop (`GradientStopEditor.vue:95`) is silently dropped when
`stops.length <= 2`; the remove swatch in `MixSourceSelector` similarly has no guard messaging. The
user gets no signal that the action was rejected.

Fix (demo-level): disable the control (Ad-1, Ad-6) so the rejected state is visible rather than
silent. No new toast infrastructure — `disabled` is the feedback.

---

## 4. Ad-hoc per-instance overrides of glass-ui primitives

### Ad-16 — `<SelectTrigger class="h-9">` repeated 11 times
`GradientVisualizer.vue:143,161,179`, `EasingSelector.vue:40`, `MixConfigBar.vue:47,65,84`,
`AuroraPane.vue:125,141`, `GenerateControls.vue:87,109`

Every `SelectTrigger` in the demo overrides the height: 11 instances pass `class="h-9"` (one,
`EasingSelector.vue:40`, also adds `text-xs min-w-[9rem]`). glass-ui's `SelectTrigger` defaults to
`h-10` (`glass-ui/src/components/ui/select/SelectTrigger.vue:36`). The demo has unanimously decided
it wants `h-9`; that decision is being re-typed at every call site.

Fix (root, glass-ui): the cleanest fix is a glass-ui `Select` size variant. glass-ui's `Button`
already has `size: 'sm'` = `h-9`; mirror that on `SelectTrigger` (add a `size` prop with
`sm` = `h-9`). Then every call site becomes `<SelectTrigger size="sm">`. If a size prop is out of
scope, change the `SelectTrigger` default to `h-9` since 11/11 demo uses want it — but the variant
is the correct, contract-preserving move.

### Ad-17 — TooltipContent font/size re-specified per instance, 5 distinct recipes
`EditDrawer.vue:28,39` + `CurrentPaletteEditor.vue:86` + `ComponentSliders.vue:25` (`text-mono-small`),
`ComponentSliders.vue:85` + `HeroBlob.vue:12` (`font-mono-code`),
`ColorInput.vue:41` (`text-mono-small max-w-[200px]`),
`ColorNutritionLabel.vue:121` (`contents w-64 p-2 text-sm`)

Eight `TooltipContent` uses, five different class strings. Three want `text-mono-small`, two want
`font-mono-code`, and `ColorNutritionLabel` overrides the surface itself with `contents` (which
discards the tooltip's own box) plus `w-64 p-2`. The default glass-ui `TooltipContent` is
`text-sm` + `px-3 py-1.5` + `glass-floating`.

Fix (root + demo): the demo clearly wants a monospace tooltip for value/code readouts. Add a
glass-ui `TooltipContent` variant (e.g. `variant="mono"`) that bakes in the mono font + small size,
then replace the seven `text-mono-small`/`font-mono-code` overrides with `variant="mono"`. The
`ColorNutritionLabel.vue:121` `contents` override is a different problem — it is using a tooltip as
a layout-transparent wrapper, which fights the primitive; that one should be re-evaluated as a
real popover or restructured, not styled.

### Ad-18 — DockSelectTrigger arbitrary child selector to undo a glass-ui clamp
`demo/@/components/custom/dock/Dock.vue:240`

```
<DockSelectTrigger ... class="text-small font-display font-normal [&>span]:line-clamp-none" ... >
```

The `[&>span]:line-clamp-none` arbitrary-variant selector exists to cancel a `line-clamp-1` that the
glass-ui `SelectTrigger`/`DockSelectTrigger` applies to its `<span>` child
(`glass-ui/src/components/ui/select/SelectTrigger.vue:36` has `[&>span]:line-clamp-1`). The demo is
reaching into the primitive's internals with a child combinator to opt out.

Fix (root, glass-ui): give `DockSelectTrigger` (or `SelectTrigger`) a `clampLabel?: boolean` prop,
or a variant, so the dock can request `clampLabel={false}` instead of a `[&>span]:` hack. Arbitrary
child selectors against a vendored component break the moment glass-ui changes its internal markup.

### Ad-19 — DropdownMenuContent repeats `min-w-[11rem] font-display` and width literals
`SortFilterMenu.vue:8` + 3 more (`min-w-[11rem] font-display`), `PaletteCardMenu.vue:7`
(`w-48 text-sm`), `UserSortMenu` (`w-48 font-display`)

Six `DropdownMenuContent` uses, each re-passing a width and usually `font-display`. The
`font-display` choice is consistent enough to be a default; the width literals (`min-w-[11rem]`,
`w-48`) drift.

Fix (root, glass-ui): if the demo always wants `font-display` inside dropdowns, set it on the
glass-ui `DropdownMenuContent` default (or expose a `font` token). Width stays per-instance since it
is genuinely content-dependent — that one is not an override worth eliminating.

### Ad-20 — SelectContent `min-w-*` / `max-h-*` literals scattered across instances
`min-w-[14rem]` (×2), `min-w-[12rem]`, `max-h-[16rem] min-w-[10rem]`, `min-w-[10rem]`

Six different width/height literals on `SelectContent`. Unlike Ad-16 (height — unanimous, fixable as
a variant), these are content-driven and inconsistent with no clear single intent. Lower priority;
not a single-fix target.

Fix: leave per-instance, or standardize on two named widths if a pattern emerges. Not a glass-ui
change.

---

## Prioritized action list

Glass-ui root fixes (change once, all consumers benefit):

1. **Ad-16** — add a `size` prop / `sm` variant to glass-ui `SelectTrigger` (`h-9`); kills 11 repeats.
2. **Ad-18** — add `clampLabel` prop to glass-ui `DockSelectTrigger`/`SelectTrigger`; removes the
   `[&>span]:` internal-markup hack.
3. **Ad-17** — add a `mono` variant to glass-ui `TooltipContent`; collapses 7 of 8 per-instance recipes.
4. **Ad-5** — migrate inline icon buttons to glass-ui `Button variant="ghost" size="icon"`; add an
   `icon-sm` size if `h-10` is too large. Restores the four-state contract for ~7 controls.
5. **Ad-19** — set `font-display` as the glass-ui `DropdownMenuContent` default if intended.

Demo-level fixes (component-local, no glass-ui change):

6. **Ad-1** — GradientStopEditor stop handle: add `:hover` scale + `disabled` when `stops.length <= 2`.
7. **Ad-3** — EditDrawer save/cancel: wrap SVG icons in `<button>` (match `CurrentPaletteEditor`).
8. **Ad-7** — BulkActionToolbar: replace raw `bg-card/95 shadow-lg backdrop-blur-sm` with the
   glass-ui `.floating-panel` utility.
9. **Ad-10** — delete `z-[var(--z-popover)]` / `z-[var(--z-hovercard)]` from the 3 `HoverCardContent`
   instances; the primitive already sets the correct z token (Ad-10 is also a correctness bug).
10. **Ad-2** — ColorInput `.send-btn`: add `:active` and `:focus-visible`.
11. **Ad-13 / Ad-14** — SearchFilterBar: add loading state to color-search button, focus ring to
    the swatch trigger.
12. **Ad-8** — PaletteControlsBar: lower the sticky-header `z-index` below popover level.
13. **Ad-12** — PaletteDialog: let the surface fall back to `glass-floating` instead of the bespoke
    `bg-card` + `box-shadow` block (keep the annotated backdrop + animations).
14. **Ad-6 / Ad-15** — MixSourceSelector buttons: add `disabled`/`active`/focus states.
15. **Ad-11** — MigratePalettesDialog: drop the redundant `rounded-[var(--radius-dialog)]`.
16. **Ad-4** — PointerDebugOverlay `.debug-btn`: add hover/active states (low priority, dev-only).
17. **Ad-9** — SwatchHoverMenu: deduplicate the two-path panel padding, or collapse to one `HoverCard`
    (lower priority — divergence is structural and possibly intentional).

Not worth fixing as a single change: **Ad-20** (`SelectContent` widths are genuinely
content-dependent) and the width literals in Ad-19.
