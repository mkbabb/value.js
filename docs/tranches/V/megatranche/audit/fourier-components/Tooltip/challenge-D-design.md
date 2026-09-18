claude-opus-5[1m]

# CHALLENGE — `Tooltip` · axis D (DESIGN)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/tooltip/Tooltip.vue` (38 lines)
**Barrel** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/tooltip/index.ts` (1 line)
**Pin under audit** `@mkbabb/glass-ui@4.0.0` installed (`web/package.json:14` `^4.0.0`; `node_modules/@mkbabb/glass-ui/package.json:3` = `4.0.0`) · producer latest = `7.0.0` (`/Users/mkbabb/Programming/glass-ui/package.json:3`)
**Method** static, source-derived. No browser. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise; each claim below carries its own falsifier, and §6 records the hypotheses whose falsifiers KILLED them.

**Tally — 17 defects · 2 BLOCKER · 3 superlatives.**

---

## §0 · The read (whole component + every import)

Read in full, read-only:

| file | why |
|---|---|
| `web/src/components/ui/tooltip/Tooltip.vue` | subject |
| `web/src/components/ui/tooltip/index.ts` | barrel |
| `@mkbabb/glass-ui@4.0.0` `dist/tooltip.js` → `dist/TooltipProvider-B3MkB_8P.js` | THE installed implementation of `Tooltip` / `TooltipTrigger` / `TooltipContent` / `TooltipProvider` (the package ships no `src/` for components — only `src/fonts` + `src/styles`) |
| `@mkbabb/glass-ui@4.0.0` `dist/components/ui/tooltip/*.d.ts` | the declared prop contract under the OLD PIN |
| `reka-ui@2.9.10` `dist/Tooltip/{TooltipTrigger,TooltipContent,TooltipContentImpl}.js`, `dist/Primitive/Slot.js`, `dist/shared/useForwardProps.js` | the real behaviour glass forwards to |
| glass-ui 4.0.0 `src/styles/{utilities/animate.css, utilities/a11y-overrides.css, typography/scale.css, typography/semantic.css, theme/radius.css, theme/bridges.css, tokens/scheme-motion.css}` | tokens/motion/type under the OLD PIN |
| glass-ui 7.0.0 `src/components/tooltip/*.vue` + `_shared/{floating,axes,resolveSurfaceClass}.ts` + `dist/components/tooltip/TooltipContent.vue.d.ts` | the F.W1 target shape |
| glass-ui 7.0.0 `src/styles/{tokens/offsets.css, typography/semantic.css, glass/reveal.css, glass/material-roles.css}` | the uplift's token/type deltas |
| all 9 consumers + `App.vue` + `style.css` + `SliderControl.vue` + `paperTree.ts` | the 35 callsites this shim is the sole API for |

**Independent re-derivation of the intake's budget.** Counting `<Tooltip` per consumer: FunctionInput 2 (`:157`, `:188`) · PaperSidebar 2 (`:70`, `:88`) · CoefficientsSpectrum 2 (`:80`, `:124`) · AnimationControls 4 (`:66`, `:81`, `:94`, `:105`) · BasisSelector 2 (`:124`, `:139`) · CanvasControlsDock 6 · ContourSettings 6 (`:194`, `:229`, `:242`, `:268`, `:281`, `:294`) · EditorControlsDock 10 (`:62`, `:73`, `:78`, `:86`, `:91`, `:96`, `:142`, `:147`, `:156`, `:165`) · VisualizationView 1 (`:166`) = **35 over 9**. This reproduces intake row **R3-7a** exactly (`lane-fourier-r3-r6.md:79`) and `CENSUS-2026-08-03.md:337,361`. **No contradiction** — adopted, and every finding below multiplies by that 35.

The component in full (numbered, for provenance):

```
19  defineProps<{
20      text?: string;
21      side?: "top" | "right" | "bottom" | "left";
22  }>();
25  <template>
26      <GlassTooltip>
27          <TooltipTrigger as-child>
28              <slot />
29          </TooltipTrigger>
30          <TooltipContent
31              :side="side ?? 'top'"
32              :side-offset="6"
33              :collision-padding="8"
34          >
35              <slot name="content">{{ text }}</slot>
36          </TooltipContent>
37      </GlassTooltip>
38  </template>
```

Eleven lines of template are the entire design surface of every hint in the application. That is the reason a 38-line file earns a full challenge.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · a11y — the shim is the *only* label on 16 icon-only dock buttons, and it wires a DESCRIPTION, never a NAME

**Provenance.**
- `Tooltip.vue:27-29` — `<TooltipTrigger as-child><slot /></TooltipTrigger>`. The consumer's element *is* the trigger; the shim contributes no naming.
- `reka-ui@2.9.10 dist/Tooltip/TooltipTrigger.js:88` — the only ARIA the trigger receives:
  `"aria-describedby": unref(rootContext).open.value ? unref(rootContext).contentId : void 0`.
  `aria-describedby` is a **description** relation, and it is **conditional on `open`** — at rest the attribute is `undefined`.
- `reka-ui dist/Tooltip/TooltipContentImpl.js:134-139` — the announced text lands in a `VisuallyHidden` with `role="tooltip"`, referenced only by that describedby.
- Consumers: all 10 `EditorControlsDock.vue` tooltips (`:62,:73,:78,:86,:91,:96,:142,:147,:156,:165`) and all 6 `CanvasControlsDock.vue` tooltips (`:42,:49,:53,:58,:70,:76`) wrap a `<DockIconButton>` whose sole child is a Lucide icon component. **16 buttons.**
- `EditorControlsDock.vue` / `CanvasControlsDock.vue` contain exactly four `aria-label`s between them — `EditorControlsDock.vue:105,121,136` and `CanvasControlsDock.vue:46` — and **all four sit on `HoverPopover`/scrubber triggers, none on a tooltip-wrapped button.**
- `@mkbabb/glass-ui@4.0.0 dist/components/custom/dock/DockIconButton.vue.d.ts` — declared props are `compact | type | as | asChild | class`. No naming affordance; the host is a bare `<button>` around a slot.

**Failure scenario.** VoiceOver/NVDA tabbing the contour editor dock announces `button` ten consecutive times. There is no name, and the description only materialises after the tooltip has opened — which, per D-2, requires a focus event the disabled and non-focusable triggers never emit. WCAG 4.1.2 (Name, Role, Value) fails at 16 sites.

**Falsifier.** Show either (a) `DockIconButton` synthesising an accessible name from its slot, or (b) reka emitting `aria-labelledby`/`title` on the trigger. `grep -n "aria-label\|aria-labelledby\|title" reka-ui/dist/Tooltip/TooltipTrigger.js` → 0 hits beyond line 88's describedby; the `DockIconButton` d.ts is quoted above. Both arms fail.

**Attribution.** The consumers each forgot an `aria-label`, but the *systemic* cause is the shim: it is the project's sole tooltip API, it accepts `text` — the exact string that should be the name — and it spends it on a describedby. A 3-line change (`:aria-label` promotion when the trigger has no text content, or a documented `label`-vs-`describe` prop) fixes 16 sites at one seam.

---

### D-2 · BLOCKER · a11y/state — the hint is unreachable on touch (35/35) and on keyboard (8/35 structurally, +3 by disablement)

**Touch — 35 of 35 callsites.**
- `reka-ui dist/Tooltip/TooltipTrigger.js:59-60` — `function handlePointerMove(event) { if (event.pointerType === "touch") return; ... }`. Touch pointers can never open a tooltip.
- `TooltipTrigger.js:54-58` — `handlePointerDown` sets `isPointerDown = true` **and** calls `rootContext.onClose()`.
- `TooltipTrigger.js:70-71` — `handleFocus` returns early `if (isPointerDown.value)`.
  A tap therefore (i) cannot open via pointermove, (ii) actively closes, (iii) suppresses the focus fallback. There is no touch path at all.
- The application declares mobile intent: `web/src/style.css:25` `padding-bottom: env(safe-area-inset-bottom)`, `style.css:40-50` a mobile-first root-font staircase, `AnimationControls.vue:95` a `sm:` breakpoint. So the 16 unnamed icon buttons of D-1 have, on a phone, *neither* a name *nor* a hint.

**Keyboard — 8 callsites are structurally dead.** `focus` does not bubble, and reka binds `focus`, not `focusin` (`TooltipTrigger.js:39-43`). An `as-child` trigger therefore opens on keyboard **only if the merged element is itself focusable**. It is not, at:
- `ContourSettings.vue:229,242,268,281,294` — the child is `<SliderControl>`, whose root is `<div class="slider-control">` (`web/src/components/ui/SliderControl.vue`, `<template>` line 65-66). Focusing the inner `<input>` or the Slider thumb never reaches the div.
- `AnimationControls.vue:94-98` — the child is `<div class="hidden sm:block">`.
- `AnimationControls.vue:105-107` — the child is `<EllipsisVertical />`, an inline `<svg>` (not in the tab order).
- `CoefficientsSpectrum.vue:80-85` — the child is `<div class="coeff-row">`.

**Keyboard + pointer — 3 more callsites die on disablement.** `EditorControlsDock.vue:74` (`:disabled="!canUndo"`), `:79` (`!canRedo`), `:97` (`!canDelete`) wrap a `DockIconButton` that renders a real `<button disabled>`. A disabled form control is inert to pointer events and is removed from the tab order, so neither `pointermove` nor `focus` fires — the hint vanishes in precisely the state where "why is Undo grey?" is the user's question. The shim forwards no `disabled` / `open` (`Tooltip.vue:19-22`), so there is no controlled escape either.

**Failure scenario.** A keyboard-only user tabbing `ContourSettings` reaches five sliders labelled `ML Threshold`, `Blur Sigma`, `Min Area %`, `Max Contours`, `Smoothing` and never learns what any of them do — the explanatory prose exists *only* inside the tooltip (`:229`, `:242`, `:268`, `:281`, `:294`). WCAG 1.4.13 is not even reachable, because the content cannot be triggered.

**Falsifier.** (a) Show `focus` bubbling — it does not (DOM spec; reka would have bound `focusin` otherwise). (b) Show a focusable root on `SliderControl` — the template's first element is a `<div>`. (c) Show a browser dispatching `pointermove` to a `disabled` button — `UNPROVEN-NEEDS-LIVE` for the exact matrix, though the HTML inertness rule makes Chromium/WebKit/Gecko unanimous. Arms (a) and (b) are settled statically and alone carry the BLOCKER.

---

## §2 · MAJOR — proportion, measure, state

### D-3 · MAJOR · proportion — unbounded measure, and no seam through which to bound it

**Provenance.** No `max-width` exists anywhere in the chain:
- `Tooltip.vue:30-34` passes `side`, `side-offset`, `collision-padding`. No `class`. The shim declares no `class` prop (`:19-22`).
- OLD PIN class string, verbatim from `dist/TooltipProvider-B3MkB_8P.js` (TooltipContent setup):
  `"z-tooltip overflow-hidden rounded-tooltip border glass-floating px-3 py-1.5 text-sm text-popover-foreground popover-animate slide-in-from-side"` — no `max-w-*`.
- NEW PIN, `glass-ui@7.0.0 src/components/tooltip/TooltipContent.vue:45-52` — also no `max-w-*`.
- `web/src/style.css` (143 lines, read whole) contains no tooltip rule.
- reka **hands the fix over and nobody takes it**: `TooltipContentImpl.js:129` publishes `--reka-tooltip-content-available-width: var(--reka-popper-available-width)`. `grep -rn "available-width"` over glass-ui 4.0.0's *and* 7.0.0's entire style trees → **0 hits in both**. The viewport-aware ceiling is computed every frame and discarded.

**Arithmetic.** `PaperSidebar.vue:70,88` bind `:text="getPreview(section)"`, supplied by `PaperView.vue:346` `:get-preview="getPaperPreview"`, i.e. `web/src/components/paper/paperTree.ts:11-21`:
```
14  const preview = clean.length > 100 ? `${clean.slice(0, 100)}…` : clean;
20  return parts.join(" · ");     // preview + " · " + section.summary
```
The string is `≤100 chars + 3 + |summary|` — i.e. **≥103 characters and unbounded above**. At the old pin's `text-sm` (0.875rem = 14px, ~0.5em mean advance) a 103-char single line measures ≈ 103 × 7 + 24 (px-3 ×2) + 2 (border) ≈ **745px**, in a 34px-tall chip: aspect ratio ≈ **22 : 1**. On a 1280px viewport, anchored `side="right"` off a ~280px sidebar, the hint spans x ≈ 286 → 1031 — 58% of the viewport width — to explain one table-of-contents row. `ContourSettings.vue:281`'s 77-char hint measures ≈ 565px against a configurator panel of a few hundred px.

**The author already knows the rule and withheld it from the tooltip.** In the *same file*, `ContourSettings.vue:220`, the Select's description is bounded: `class="text-xs text-muted-foreground max-w-[280px]"`. Descriptive prose in a menu gets a 280px measure; identical descriptive prose in a tooltip gets none. That inconsistency is the design defect, not merely the width.

**Compounding.** Passing `class` to `<Tooltip>` cannot rescue it: the shim's root is `GlassTooltip` → reka `TooltipRoot`, which renders a fragment (`dist/TooltipProvider-B3MkB_8P.js`, the `Tooltip` component renders only its slot). Vue logs *"Extraneous non-props attributes (class) were passed… could not be automatically inherited because component renders fragment"* and drops it. The escape hatch is not merely absent — it is silently inert.

**Falsifier.** Produce a `max-width` for the rendered node from `.glass-floating`, `[data-slot="tooltip"]`, `rounded-tooltip`, or `web/src/style.css`. Greps over all four → 0. The px figures are `UNPROVEN-NEEDS-LIVE` (font metrics); the *absence of any bound* is proven.

---

### D-4 · MAJOR · proportion/layering — `side` defaults to `top` at `sideOffset: 6`, so an open hint eats the control above it

**Provenance.** `Tooltip.vue:31-32` — `:side="side ?? 'top'"` and `:side-offset="6"`. Of the 35 callsites, **26 pass no `side`** and therefore render upward.

**Arithmetic (old pin, token-derived).** Chip height = line-height(`text-sm` → 1.25rem = 20px) + `py-1.5` ×2 (12px) + border ×2 (2px) = **34px**; plus `sideOffset` 6 ⇒ **40px of upward reach** measured from the trigger's top edge.
`ContourSettings.vue:266-303` stacks three `SliderControl`s inside `.advanced-grid`; one `SliderControl` is a label row + a track (`SliderControl.vue` template) ≈ 44px. So hovering **Max Contours** (`:281`) paints a 34px chip across roughly the whole of **Min Area %** (`:268`) — the control the pointer just left, and the one the user is comparing against.

**Design reading (Aristotelian).** A hint is a *marginal* gloss; the shim gives it a default that makes it *superimposed*, and gives every consumer the same default regardless of density. The correct posture for a vertically-dense control stack is `side="right"` (which `PaperSidebar.vue:70,88` chose, correctly, for its own dense list) — but the shim's default fights the grain and 26 of 35 callsites simply accept it.

**Falsifier.** If `.advanced-grid` (scoped in `ContourSettings.vue`) resolves to a multi-column grid whose vertical neighbours are ≥ 40px apart, the specific occlusion is void — the 40px reach and the `top` default remain. `UNPROVEN-NEEDS-LIVE` for the measured overlap; the reach is exact.

---

### D-5 · MAJOR · a11y/prose — rich `#content` is announced as one unpunctuated run, and the one-line cure is not exposed

**Provenance.** `reka-ui dist/Tooltip/TooltipContentImpl.js:87`:
`const ariaLabel = computed(() => props.ariaLabel || currentElement.value?.textContent)`, rendered at `:134-139` into `VisuallyHidden role="tooltip"` via `toDisplayString`. Raw `textContent` — **no separators are inserted between element boundaries.**

Applied to this shim's two rich callsites:
- `CoefficientsSpectrum.vue:105-121` — a `grid-cols-[auto_1fr]` of four label/value pairs. Announced: `n = 5Amplitude0.1234Phaseπ/3Relative12.3%Re / Im0.100 / 0.070`.
- `FunctionInput.vue:195-206` — a heading + two paragraphs + a `<sub>`. Announced: `Auto (Parseval's theorem)Sets N to the minimum harmonics capturing ≥99.99% of total energy ‖f‖².Neff = 12 · 99.9% energy`.

**The cure ships and is withheld.** `ariaLabel` is a declared prop on **both** pins — old: `dist/components/ui/tooltip/TooltipContent.vue.d.ts` (via reka's `TooltipContentProps`) and the compiled `ariaLabel: {}`; new: `glass-ui@7 src/components/tooltip/TooltipContent.vue:16` with the docstring *"Override the text announced through the trigger's description relation."* The shim (`Tooltip.vue:19-22`) declares neither an `ariaLabel` prop nor forwards one. One prop + one pass-through would have made both rich tooltips announceable.

**Falsifier.** Show reka joining text nodes with whitespace — `toDisplayString(currentElement.textContent)` does not. Show the shim forwarding `ariaLabel` — `defineProps` has two keys.

---

### D-6 · MAJOR (F.W1 uplift) · typography — the uplift **deletes `text-admin-label`**, and this component's richest content depends on it. The census break surface does not list it

**Provenance.**
- glass-ui **4.0.0** ships the full recipe — `node_modules/@mkbabb/glass-ui/src/styles/typography/semantic.css:213-220`:
  ```
  @utility text-admin-label {
      font-family: var(--font-mono);
      font-size: var(--type-admin-label);   /* scale.css:86 → 0.625rem, fixed */
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: var(--type-tracking-caps);
      font-weight: 500;
  }
  ```
- glass-ui **7.0.0** does not. Its `src/styles/typography/semantic.css` `@utility` roll is `…text-prose (:197) · text-body (:207) · text-small (:215) · text-caption (:222) · text-micro (:233)` — **no `admin-label` rung.** `grep -rn "admin-label" glass-ui@7/src/` returns exactly **one** hit, and it is a *dangling* one: `src/components/_shared/class-names.ts:84` still names `admin-label` inside the twMerge typography-collapse regex, for a class the CSS no longer emits.
- Blast radius **inside this component**: `CoefficientsSpectrum.vue:110` — `<div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-admin-label">` — is the `#content` body of the tooltip at `:80`. Post-uplift the four micro-labels (`Amplitude`, `Phase`, `Relative`, `Re / Im`) lose mono face, 10px size, `line-height: 1`, uppercase and caps-tracking in one silent step, reverting to the tooltip's inherited type — which is itself changing (D-8). The same deletion also hits `AdminFlaggedPanel.vue:176,180,189` and `AdminUserList.vue:376,379`.

**Against the corpus — this is an ADDITION to the break surface.** `CENSUS-2026-08-03.md:102-104` enumerates the uplift break surface as *"removed subpaths in live use (`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2), removed dock members (`DockIconButton` ×2, `DockDropdownTrigger` ×1), `ToastVariant` definition-absent → hard typecheck break"*, repeated at `:185-186`. **Deleted typography `@utility` rungs are not on that list.** Unlike `ToastVariant`, an absent Tailwind `@utility` produces **no typecheck signal at all** — the class simply stops generating — which is exactly the exposure `CENSUS-2026-08-03.md:256-258` names as *"[P2] Uplift lands with no unit-test net."* F.W1 must widen its break inventory from *subpaths + members + types* to *subpaths + members + types + emitted utilities/tokens*.

**Falsifier.** `grep -rn "text-admin-label" /Users/mkbabb/Programming/glass-ui/src/styles/` → 0. If glass 7 emits the utility from a Tailwind preset, `@theme`, or a generated layer I did not read, this claim collapses to INFO. The `class-names.ts:84` dangling reference is independent evidence of an incomplete removal.

---

### D-7 · MAJOR (F.W1 uplift) · contract — `:collision-padding="8"` is not a declared prop of glass 7's `TooltipContent`

**Provenance.** `Tooltip.vue:33` passes it.
- OLD PIN: declared. Compiled props in `dist/TooltipProvider-B3MkB_8P.js` include `collisionPadding: {}`, inherited from reka's `TooltipContentProps` (`dist/components/ui/tooltip/TooltipContent.vue.d.ts` → `TooltipContentProps & { class? }`).
- NEW PIN: **not declared.** `glass-ui@7 src/components/tooltip/TooltipContent.vue:12-17` — `TooltipContentProps extends FloatingPlacementProps { class?; surface?; ariaLabel? }`, and `src/components/_shared/floating.ts:11-16` — `FloatingPlacementProps { side?; sideOffset?; align?; alignOffset? }`. Confirmed against the *built* declaration, `glass-ui/dist/components/tooltip/TooltipContent.vue.d.ts`, whose resolved defaults are `{ surface, align, side, sideOffset, alignOffset }` — no collision key.

**Consequence.** Runtime survives: `TooltipContent.vue:58` spreads `...forwardedAttrs` onto reka's content, and Vue camelizes the `collision-padding` attr key when resolving reka's prop. But the value leaves the *checked* contract: with `TooltipContentProps` fully closed, `vue-tsc` excess-attribute checking flags `Tooltip.vue:33`, and `CENSUS-2026-08-03.md:258` records `vue-tsc` as one of only two gates the uplift has.

**Falsifier.** Run `vue-tsc --noEmit` after the tri-package uplift. If `Tooltip.vue:33` does not error, downgrade to INFO — *contract-silent fallthrough*: the app's only tooltip API would then be tuning collision behaviour through an untyped attr that any future `inheritAttrs`/attr-filter change in glass silently drops.

---

### D-8 · MAJOR (F.W1 uplift) · proportion + typography — the chip's padding ratio **inverts**, its line-height pairing is **dropped**, and its type rung is **demoted**

Three coupled deltas, all token-derived.

**(a) Padding ratio inverts.** OLD (compiled class string): `px-3 py-1.5` = 12px inline / 6px block ⇒ inline : block = **2.00**.
NEW (`glass-ui@7 src/components/tooltip/TooltipContent.vue:49`):
`[--overlay-pad-inline:--spacing(2)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)`
= 8px inline / 10.18px block ⇒ ratio **0.79**. Inline padding −33%, block +70%. `1.272 = √φ`, so the new figure is a deliberate golden-ladder choice — but it makes the chip's padding *portrait* while 33 of the 35 callsites are single-line landscape hints (`"Undo"`, `"Redo"`, `"Smooth"`, `"Fullscreen"`). A one-word hint gains 8px of vertical air and loses 8px of horizontal breathing room: exactly backwards for the corpus it serves.

**(b) The line-height pairing is dropped.** `text-sm` sets font-size **and** line-height (0.875rem / 1.25rem). `text-(length:--tooltip-text)` sets **font-size only**. The tooltip is portalled to `document.body`, so leading falls to the page cascade — `web/src/style.css:40-49`: `html { line-height: 1.75rem }` below 768px, `1.5rem` at ≥768px. A ~13px caption then carries a 24px leading (ratio ≈ 1.85 — a prose leading on a hint). One-line chip height goes 34px → 24 + 20.4 + 2 ≈ **46px (+36%)**; the 3-paragraph `FunctionInput.vue:195-206` body and the 4-row `CoefficientsSpectrum.vue:110` grid inflate line-for-line.

**(c) The type rung is demoted, and the producer's own comment mis-states it.** `glass-ui@7 src/styles/tokens/offsets.css:82` → `--tooltip-text: var(--type-caption)`, i.e. `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` (`typography/scale.css:99-103`, byte-identical in both pins). Against a fixed `0.875rem`: **768px → 12.97px (−7.4%)**, parity at ≈1287px, **1920px → 15.4px (+10%)**. Making the rung fluid and tokenised is right; the landing rung is not. `offsets.css:79-81` calls `--tooltip-text` *"the token-backing of the bare `text-sm` on TooltipContent"* — but the token-backing of `text-sm` is `--type-small` (floor 0.875rem), not `--type-caption` (floor 0.75rem). The comment describes a no-op; the change is a rung demotion. **Producer-side prose defect — relay to the glass-ui BH inbox per the standing formation invariant.**

**Falsifier.** Show glass 7 setting a line-height for the tooltip. `grep -n "line-height"` over `glass/reveal.css` and `tokens/offsets.css` → 0; the single `[data-material="overlay"]` rule (`glass/material-roles.css:16-18`) sets only `--surface-role-shadow`. If a `@theme` pairing for `--tooltip-text--line-height` exists elsewhere, (b) collapses.

---

### D-9 · MAJOR · state coverage (empty) — the shim renders a blank glass chip and nothing guards it

**Provenance.** `Tooltip.vue:35` — `<slot name="content">{{ text }}</slot>` with `text?: string` optional (`:20`) and **no `v-if`** on `TooltipContent`. With neither supplied, reka mounts the content unconditionally and glass paints it: `border`, `rounded-tooltip` (`--radius-lg`), `glass-floating` backdrop, `px-3 py-1.5` — an empty ~24×14px blurred bordered box on hover.

**This is live, not hypothetical.** `paperTree.ts:11-21`:
```
12  const text = section.content?.find((b): b is string => typeof b === "string") ?? "";
17  if (preview) parts.push(preview);
18  if (section.summary) parts.push(section.summary);
20  return parts.join(" · ");
```
A section with no string content block **and** no `summary` returns `""`. `PaperSidebar.vue:70` and `:88` bind that directly to `:text`. The function is total but not non-empty, and the shim has no guard.

**Failure scenario.** Hovering such a TOC row paints a small empty glass rectangle beside the sidebar — reading as a rendering artefact, not as "no preview available".

**Falsifier.** Enumerate `paperSections` (`@/lib/paperContent`) and show every entry has a string block or a summary — `UNPROVEN-NEEDS-LIVE` for that data sweep. The **contract** defect (no guard on an optional-text API used with a can-return-empty producer) is proven statically and is the claim's core.

---

## §3 · MINOR

### D-10 · MINOR · conformance — `sideOffset: 6` is off the design system's floating ladder, and the app now shows three uncoordinated anchor gaps

`Tooltip.vue:32` hardcodes 6. The system's shipped defaults (glass-ui 7, one grep): `DropdownMenuContent.vue:31` = 4 · `PopoverContent.vue:31` = 4 · `TooltipContent.vue:28` = 4 · `SelectContent.vue:44` = 0 · `DropdownMenuSubContent.vue:20` = 0. The old pin's compiled `TooltipContent` default is likewise `sideOffset: { default: 4 }`. Meanwhile fourier's own `AnimationControls.vue:109` sets `:side-offset="8"` on its `DropdownMenuContent`. Inside one dock the user sees a hint at 6px and a menu at 8px from adjacent anchors, against a house rhythm of 4. Three gaps, no token.
**Falsifier / scope note.** No offset token exists in *either* pin (`grep -- "--overlay-offset\|side-offset" tokens/` → 0), so this is a literal against a shipped default, not a token violation — and the missing token is itself a design-system gap worth relaying. Severity held at MINOR for that reason.

### D-11 · MINOR · structure — `as-child` wrapping a conditionally-rendered child, plus a numeral the tooltip and the label disagree on

`CoefficientsSpectrum.vue:124-126` — `<Tooltip :text="…">` wraps `<Button v-if="totalComponents > 12">`. When false the `as-child` trigger receives an empty slot; reka's `Slot` (`dist/Primitive/Slot.js:9-13`) finds no non-comment child and returns the children unchanged, and `onTriggerChange(undefined)` fires — a live `TooltipRoot` with no anchor. The `v-if` belongs on `<Tooltip>`, exactly as `CanvasControlsDock.vue:70,76` and `ContourSettings.vue:229` already do.
Separately, the same tooltip promises `Show top 40 of {{ totalComponents }} coefficients` (`:124`) while its own button reads `Show more ({{ totalComponents }} total)` (`:131`) — the hint names 40, the label names N. A hint that contradicts its trigger is a prose defect, not a copy nit.

### D-12 · MINOR · layering — a tooltip trigger nested inside another overlay's trigger

`AnimationControls.vue:104-108` — `<DockDropdownTrigger><Tooltip text="More options"><EllipsisVertical /></Tooltip></DockDropdownTrigger>`. `as-child` merges `data-state`, `data-grace-area-trigger`, `aria-describedby` and six pointer/focus/click handlers (`reka TooltipTrigger.js:86-93`) onto an `<svg>`. Two consequences: (i) the `data-state` stamped on the icon is the **tooltip's** state, inside a dock control family; (ii) `--z-tooltip: 120` vs `--z-popover: 130` (`tokens/scheme-motion.css:343-346`) means the opened menu covers the hint, but nothing closes the hint when the menu opens — hover-then-click leaves a stale tooltip under the menu until `pointerleave`.
**Falsifier — partly run.** `grep -n "data-state" glass-ui@4/src/styles/dock.css` → **0**, so (i) is inert today: a contract defect, not a visual one. (ii) is `UNPROVEN-NEEDS-LIVE`.

### D-13 · MINOR · motion — under the old pin the tooltip has no *authored* reduced-motion end-state; only a blanket kill

`popover-animate` (`glass-ui@4 src/styles/utilities/animate.css:10-14` — `fade-in-0`/`fade-out-0` + `zoom-in-95`/`zoom-out-95`) and `slide-in-from-side` (`:21-26` — a 0.5rem directional slide) declare **no** reduced-motion arm. The only guard is the blanket `@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { animation-duration: 0.01ms !important } }` (`utilities/a11y-overrides.css:6-10`). That is *correct and sufficient for safety* — but it **truncates** rather than **replaces**: the surface is cut off at its `zoom-out-95`/`fade-0` start values in 0.01ms rather than given a designed instant end-state. Glass 7 does it properly: `.glass-reveal[data-reveal="tooltip"]` (`glass/reveal.css:118-127`) binds a per-register spring/clock/scale/blur/slide, and `animations.css:177` ships a dedicated `glass-reveal-out-reduced` keyframe. **This is the uplift's clearest design win for this component**, and it lands with no shim change.

### D-14 · MINOR · API surface — 7 of the design system's declared knobs are unreachable through the project's only tooltip API

`Tooltip.vue:19-22` exposes `text` and `side`. Unreachable at every one of the 35 callsites: `align`, `alignOffset`, `class`, `ariaLabel`, `delayDuration`, `disabled`, `open` — all declared on the glass primitives under both pins (old: compiled props of `Tooltip`/`TooltipContent`; new: `Tooltip.vue:4-12`, `TooltipContent.vue:12-17`). `class` is worse than absent: it is *silently dropped* (D-3). `ariaLabel` is the D-5 cure. `disabled`/`open` are the D-2 escape. A shim is allowed to narrow an API — but it must not narrow away the three knobs that fix its own defects.

### D-15 · INFO · redundancy — `:side="side ?? 'top'"`

`Tooltip.vue:31`. Both pins already default `side` to `top` (old: reka's `defu` default at `TooltipContentImpl.js:91-93`; new: `TooltipContent.vue:27`). The coalescer is a harmless belt-and-braces that also guarantees `side` always lands in `vm.vnode.props` and is therefore always forwarded by `useForwardProps` — deterministic, so I do not call it a defect. It is recorded because it is the *one* place the shim editorialises about defaults, and it chose the redundant knob over the four that matter.

### D-16 · INFO (producer) · `data-material="overlay"` is stamped on the glass-7 tooltip and never read

`glass-ui@7 src/components/tooltip/TooltipContent.vue:60-62` sets `:data-surface`, `data-material="overlay"`, `data-reveal="tooltip"`. The only rule keyed on that material is `glass/material-roles.css:16-18` (`--surface-role-shadow: var(--shadow-modal)`), applied solely through `[data-material][data-shadow]` (`:22-24`) — and `TooltipContent` never sets `data-shadow`, nor does `resolveSurfaceClass("floating")`, which returns the bare string `glass-floating` (`_shared/resolveSurfaceClass.ts:4-6`). The attribute is inert on the tooltip. Relay candidate, not a fourier defect.

### D-17 · INFO · contrast — second-tier foreground inside a translucent overlay, over arbitrary backdrops

`CoefficientsSpectrum.vue:108,111,113,115,117` put `text-muted-foreground` labels **inside** the tooltip, whose surface is `glass-floating` — a `backdrop-filter` material whose effective background is whatever the tooltip happens to float over: the WebGL canvas, the `paper-texture` shell (`App.vue:24`), or the spectrum bars themselves. Contrast is therefore **not token-decidable** and I make no ratio claim. The *design* criticism stands on its own: a muted (deliberately de-emphasised) foreground layered on a deliberately non-opaque surface has no contrast floor by construction, and the shim offers no `surface` pass-through to select an opaque tier (glass 7 declares `surface?: Surface` at `TooltipContent.vue:15`; the shim does not forward it). `UNPROVEN-NEEDS-LIVE` for measured ratios (SS-13).

---

## §4 · SUPERLATIVES (L-18 both ways)

### S-1 · The doc comment is load-bearing and exactly right

`Tooltip.vue:2-12` states the adapted API, shows a two-line usage example, and names the `#content` affordance — in eleven lines, with no drift from the implementation. It is why `lane-frontend.md:371` could classify this file as a *"thin API-shape adapter, not a shadow"* without reading the consumers, and why intake **R3-7a** could scope a 35-callsite migration budget from a barrel grep. **Falsifier — run:** verify each documented member exists. `text` (`:20`), `side` (`:21`), `#content` (`:35`) — all three present and behaving as described. The comment survives.

### S-2 · `collision-padding: 8` beats every default in the stack

`Tooltip.vue:33`. reka's default is **0** (`TooltipContentImpl.js:96` — `collisionPadding: 0` in the `defu` floor); neither glass pin sets one. This shim is the only layer in the whole chain that keeps a hint off the viewport edge, and it survives the uplift at runtime (D-7 concerns the *type* contract, not the behaviour). A small, deliberate, correct refinement that the design system itself has not made.

### S-3 · The single-seam `<slot name="content">{{ text }}</slot>` is better than the upstream equivalent — and I refine, not contradict, the intake's "keep"

`Tooltip.vue:35` degrades rich → plain through one seam: no `v-if`, no second component, no `richText` boolean. Compare glass-ui 4.0.0's own shipped single-component tooltip, `IconTooltip` (`dist/icon-tooltip.js` → `dist/IconTooltip-DSjasZIt.js`), decompiled:
```
props: { text: {} }
<TooltipProvider :delay-duration="250">
  <Tooltip><TooltipTrigger as-child><slot/></TooltipTrigger>
    <TooltipContent class="font-display text-base">{{ text }}</TooltipContent>
  </Tooltip>
</TooltipProvider>
```
The fourier shim beats it on three counts: it exposes `side` (used by 9 callsites), it accepts a `#content` slot (used by 2 rich callsites that `IconTooltip` could not serve at all), and it does **not** nest a second `TooltipProvider` — `IconTooltip`'s inner provider would override the app's deliberate `delay-duration="400" skip-delay-duration="200"` (`App.vue:23`) at every callsite, silently.
This **sustains** `lane-frontend.md:371` ("*the correct posture — keep*") and supplies the mechanism that verdict lacked: the keep is earned by `side` + `#content` + provider-non-nesting, not by thinness. **Caveat for F.W3:** the two glass tooltips ship *inconsistent* type registers — `TooltipContent`'s bare `text-sm` vs `IconTooltip`'s `font-display text-base` — and this shim inherits the former by default rather than choosing either. That inconsistency is a glass-ui relay, and the F.W3 migration budget should carry the `side`/`#content`/provider gaps upstream rather than delete the shim.

---

## §5 · Consequences for F.W1 / F.W3

1. **F.W1 break inventory must widen.** `CENSUS-2026-08-03.md:102-104,185-186` inventories *removed subpaths · removed members · absent types*. D-6 proves a fourth class — **removed emitted utilities** (`text-admin-label`) — which produces **zero** typecheck signal and lands inside this component's rich content (`CoefficientsSpectrum.vue:110`). Add a "utilities/tokens emitted at 4.0.0 and not at 7.0.0" diff to the uplift gate. Cross-check `--type-admin-label`, and `class-names.ts:84`'s dangling twMerge entry, as producer relays.
2. **`/tooltip` is NOT on the break surface, but the tooltip's *form* changes materially.** Verified: `glass-ui@7 package.json:445-448` still exports `./tooltip`, and `src/components/tooltip/index.ts:1-18` still exports all four names the fourier files import. The uplift is import-safe here — and simultaneously re-proportions padding (D-8a), drops the line-height pairing (D-8b), demotes the type rung (D-8c), un-types `collision-padding` (D-7), and *fixes* the reduced-motion end-state (D-13). F.W1 must budget a visual re-baseline for tooltips even though nothing breaks at the import boundary.
3. **F.W3's 35-callsite migration should carry the a11y seam, not just the import.** D-1, D-2 and D-5 are all one-seam fixes at this file. Migrating 35 callsites to `@mkbabb/glass-ui/tooltip` *without* first curing the name/touch/announcement defects would spread them across 35 direct callsites where they can no longer be fixed once.

---

## §6 · Hypotheses whose falsifiers KILLED them (recorded so the tally is honest)

| hypothesis | falsifier run | verdict |
|---|---|---|
| Tooltips render under the dock (portal z-order) | `tokens/scheme-motion.css:337-346` — `--z-dock: 40`, `--z-tooltip: 120` | **CLEARED** — no conflict |
| glass 4's undefaulted `avoidCollisions: { type: Boolean }` Boolean-casts to `false` and is forwarded, killing collision avoidance | `reka-ui dist/shared/useForwardProps.js:13-31` — forwards only keys with a declared `default` **or** explicitly present in `vm.vnode.props`. `avoidCollisions` has neither ⇒ never forwarded; reka's own `true` default (`TooltipContentImpl.js:94`) applies | **CLEARED** |
| No `TooltipProvider` ancestor ⇒ reka injection failure | `App.vue:4,23` — `<TooltipProvider :delay-duration="400" :skip-delay-duration="200">` wraps the whole shell | **CLEARED** — and the tuning is deliberate and good |
| WCAG 1.4.13 "hoverable" fails (hint dismisses when the pointer enters it) | `reka TooltipContent.js` selects `TooltipContentHoverable` unless `disableHoverableContent`; neither `App.vue:23` nor the shim sets it | **CLEARED** — a pass |
| Dock CSS keys on the `data-state` the nested tooltip trigger mis-stamps on an `<svg>` (D-12i) | `grep -n "data-state" glass-ui@4/src/styles/dock.css` → 0 | **CLEARED** — contract defect only, no visual |
| The shim's tooltips are typographically divorced from the app because they portal to `<body>` | `style.css:17-22` puts `font-serif` on `html, body`; portalled content inherits the same cascade; `.dark` sits on `<html>` | **CLEARED** |

---

## §7 · Verdict

The component is **DEFECTIVE**, and the defects are load-bearing rather than cosmetic: two BLOCKERs (D-1 unnamed icon buttons ×16; D-2 no touch path ×35 / no keyboard path ×8+3) that make the application's entire hint layer inaccessible to two whole input modalities, plus five MAJORs spanning unbounded measure (D-3), occluding default placement (D-4), unannounceable rich content (D-5), an uplift-deleted type utility the census does not list (D-6), an uplift-un-typed prop (D-7), an inverted padding ratio with a dropped leading pairing (D-8) and an unguarded empty state (D-9).

Every one of them is fixable **at this one 38-line seam** — which is also the case *for* the shim, and the reason S-3 sustains the intake's keep verdict. The correct disposition is not deletion and not a 35-callsite spread: it is to harden this file (name promotion, focusable-trigger contract, `max-width`, `ariaLabel`/`class`/`disabled` pass-through, empty guard, `side` default reconsidered) **before** F.W1 re-proportions the surface underneath it and **before** F.W3 migrates the callsites away from it.
