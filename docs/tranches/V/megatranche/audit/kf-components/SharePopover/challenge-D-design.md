claude-opus-5[1m]

# CHALLENGE · SharePopover · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/SharePopover.vue` (62 lines)
**Behaviour peer (read, not the target)** `.../shell/useShareState.ts` (95 lines)
**Mode** static, source-derived. No browser, no dev server, no installs. One build-tool invocation was made — a `tailwindcss@4.3.0` **in-memory compile** using the target repo's own installed compiler, to settle two cascade-order questions that are otherwise guesswork (§M-1, §M-2). It wrote nothing into either repo.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries a falsifier; claims that the falsifier could not be settled statically are marked **UNPROVEN-NEEDS-LIVE** and are excluded from the defect count only where noted.

**Tally — defects 24 (BLOCKER 2 · MAJOR 7 · MINOR 11 · INFO 4) · superlatives 5.**

---

## 0. The import closure actually read

| file | why |
|---|---|
| `keyframes.js/demo/components/instrument/shell/SharePopover.vue` | target |
| `keyframes.js/demo/components/instrument/shell/useShareState.ts` | the behaviour half |
| `keyframes.js/demo/utils/clipboard.ts` | `copyText` |
| `glass-ui/src/components/popover/{Popover,PopoverTrigger,PopoverContent}.vue`, `popoverContext.ts`, `index.ts` | the three imported compounds |
| `glass-ui/src/components/button/{Button.vue,styles.css}` | the two action controls |
| `glass-ui/src/components/input/Input.vue`, `_shared/field/{field-control.css,fieldControl.ts}` | the field |
| `glass-ui/src/components/_shared/class-names.ts` | `cn()` — the merge law that decides consumer overrides |
| `glass-ui/src/styles/tokens/{sizing,scheme-motion,color-radius,dark-arm,light-dark,scale-paper}.css` | control rungs, z-scale, colour, focus ring |
| `glass-ui/src/styles/utilities/{btn,responsive,a11y-overrides}.css` | `scale-on-hover`, the coarse touch floor, the PRM/forced-colors tail |
| `glass-ui/src/styles/typography/{utilities,scale}.css` | `text-mono-caption` and the type ladder |
| `keyframes.js/demo/styles/{design-idioms.css,style.css}` | the demo's own idiom + z contract |
| call sites: `demo/components/instrument/shell/{EditorHeader,EditorShell}.vue`, `demo/app/dock/MbabbMenu.vue` | the three consumers |
| peers for idiom comparison: `KeyframesAddDialog.vue`, `CSSPasteDialog.vue`, `KeyframesEditor.vue`, `scenes/cube/CubeScene.vue`, `components/instrument/utils/toastGuard.ts` | the house idioms this file departs from |
| `keyframes.js/node_modules/reka-ui/dist/Popover/PopoverContentImpl.js`, `dist/Menu/MenuItemImpl.js` | the rendered roles |

**Corpus fold.** Lane `formation/keyframes/lane-frontend.md` is folded, not re-run. This file is its row *"62 · `SharePopover.vue` · G · share popover — `Popover*`, `Button`, `Input`"* (§4, shell table). Nothing here contradicts the lane. Three of its findings land directly on this component and are cited in place rather than restated: **F-1** (glass-ui is a phantom dependency — every glass claim below is sourced from the copy already on disk, so no upgrade is implied by any fix), **§6.3** (the demo owns 98 unprefixed custom properties and **zero** `--kf-*` — see §I-1 for this file's share of that hazard), **§6.5** (13 PRM enforcement sites — this file needs none, see §S-1).

---

## 1. BLOCKERS

### B-1 · The trigger is a 24×24 tap target with zero padding — under the 44px floor that *both* libraries in this stack declare as their own bar — **BLOCKER**

`SharePopover.vue:4–12`. The trigger is a raw `<button>` carrying `p-0` and nothing else dimensional; its only child is `<Share2 class="icon-lg" />` (`:11`). `icon-lg` is `@apply size-6` (`demo/styles/design-idioms.css:114–119`) = `1.5rem` = **24 CSS px**. With `p-0`, `inline-flex`, and no width/height/min-* class, the button's border box **is** the glyph box: 24×24.

Three separate declarations in this stack put the floor at 44:

1. `glass-ui/src/styles/tokens/sizing.css:533` — `--touch-target: 2.75rem; /* 44px */`, commented at `:526–531` as the *"Canonical WCAG 2.5.5 (44px) touch-target floor for the NON-dock coarse-pointer surfaces (`Button iconOnly` …)"*.
2. `glass-ui/src/styles/utilities/responsive.css:3–7` — `@media (pointer: coarse) { [data-control-target] { min-block-size: var(--touch-target); min-inline-size: var(--touch-target) } }`.
3. **the demo's own** `design-idioms.css:81–85` — `/* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */ .tap-floor { min-height: 44px; min-width: 44px }`.

The trigger reaches none of them. `[data-control-target]` is emitted **only** by `Button.vue:92` (`:data-control-target="iconOnly ? '' : undefined"`), and this is not a `Button`. `.tap-floor` is not applied. So on a touch device the primary share affordance of the entire demo is a 24px square — and because it is a raw element rather than a glass `Button`, the coarse-pointer floor cannot reach it even in principle.

Against WCAG 2.2 **2.5.8 (AA, 24×24)** it passes *exactly*, with zero margin and zero spacing exception claimed. Against the 44px bar the house itself declares three times, it fails by 45%.

The size is also an outlier among its own siblings — see §M-4 and the table in §3.

> **Falsifier.** Any of: (a) an ancestor rule that grows this button — none exists; the two header hosts are `flex items-center gap-2 lg:gap-4` (`EditorHeader.vue:18`) and `HeaderRibbon` `#items` (`EditorShell.vue:17–20`), neither sizing children; (b) `icon-lg` resolving to something other than `size-6` — `design-idioms.css:114` is the sole definition and the lane records the family as live at 61 call sites (§6, lane-frontend); (c) a demo-wide `button { min-height }` rule — `grep -rn "min-height" demo/styles/` yields nothing touching bare `button`. Measure the trigger's border box on a coarse-pointer device: **≥44px in either axis kills this claim.**

### B-2 · SharePopover cannot be composed into a labelled row, and its one such use is an ARIA violation whose popover paints *underneath* its host — **BLOCKER**

The component hard-codes its own trigger (`:3–13`) and exposes **no trigger slot and no label prop** (`:56–58` — the entire public API is `onSceneRestore?`). A consumer that needs a *labelled* share row therefore has exactly one option: place the self-contained popover next to a text node. `MbabbMenu.vue:8–14` does precisely that:

```
 8  <DropdownMenuItem @select.prevent class="flex items-center gap-2.5 px-1.5 py-1 rounded-lg">
 9      <SharePopover :on-scene-restore="onSceneRestore" />
10      <div class="flex-1 min-w-0">
11          <span class="text-small text-foreground">Share</span>
12          <p class="text-admin-label text-muted-foreground leading-tight">Copy link or load shared state</p>
```

Three consequences, all decidable from source:

**(a) An interactive button nested inside `role="menuitem"`.** `reka-ui/dist/Menu/MenuItemImpl.js:63` renders `role: "menuitem"`. ARIA forbids interactive descendants of `menuitem` (it is not a composite widget, and its accessible name is computed from its contents). The row's computed name therefore concatenates the trigger's `aria-label` ("Share animation") with "Share" and "Copy link or load shared state".

**(b) The visible label is not the control.** `@select.prevent` (`MbabbMenu.vue:8`) suppresses the row's own actuation, and the text at `:11–12` is a plain `<span>`/`<p>`. Only the 24px glyph from **B-1** actuates. A ~230px-wide row reads as clickable and is inert across ~90% of its width.

**(c) The popover paints beneath its host.** `PopoverContent` defaults `side: "bottom"`, `portal: true` (`PopoverContent.vue:30,34`) and its base class pins `z-popover` (`:64`) = **130** (`glass-ui/src/styles/tokens/scheme-motion.css:223`). The host `DropdownMenuContent` is explicitly `z-modal` (`MbabbMenu.vue:6`) = **140** (`scheme-motion.css:224`), and is likewise portalled (`glass-ui/src/components/dropdown-menu/DropdownMenuContent.vue:47,66`). Two body-level siblings; 130 < 140. The trigger sits in row 1 of a ≥5-row panel, so a 288px `w-72` surface opened 8px *below* it lands squarely on rows 2+ — and is occluded. The demo's own z-contract narrates this rung as *"`--z-popover : 130  popovers (share)`"* (`demo/styles/style.css:34`), i.e. the contract names this component and still places it under the menu it is nested in.

Note the disjunction is exhaustive and both arms are bad: if reka's `DropdownMenu` instead treats the popover's focus move as `focusOutside` and closes the menu, `DropdownMenuContent` unmounts, taking `SharePopover` — trigger, root, and content — with it, and the popover never paints at all.

> **Falsifier.** (a) and (b) die if `DropdownMenuItem` is shown to render something other than `role="menuitem"` in the installed reka build — it does not (`MenuItemImpl.js:63`). (c) dies if the popover's collision avoidance (`avoidCollisions: true`, `PopoverContent.vue:54`) flips it to `side="top"` far enough to clear the dropdown box, or if a stacking context between the two portals reorders them. **Which arm fires is UNPROVEN-NEEDS-LIVE — that the composition is broken in every arm is proven.** The fix may legitimately land in either file; the *design* defect is SharePopover's, because a trigger slot would have made the nesting unnecessary.

---

## 2. MAJORS

### M-1 · `p-2` on the popover surface is DEAD — the density the author asked for never ships, and `cn()` cannot collapse the dead token — **MAJOR**

`SharePopover.vue:14` — `class="z-popover w-72 p-2"`.

`PopoverContent.vue:62–67` composes its class through glass's `cn()`:

```
"popover-content z-popover w-72 glass-floating
 [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)]
 px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal"
```

Two facts decide the outcome, and neither is intuitive:

**(i) `cn()` is not tailwind-merge.** `_shared/class-names.ts:98–106` buckets `^px-` as `padding-x`, `^py-` as `padding-y`, and `^p-` as `padding` — **three disjoint buckets**, and `bucketFor` returns the first match (`:222–227`). `p-2` therefore never collides with `px-(--overlay-pad-inline)`. All three tokens survive into the DOM `class` attribute. (`z-popover` and `w-72` *do* collide — buckets `z-index`/`width` — so the consumer's duplicates simply replace the base's, see §I-1.)

**(ii) Tailwind emits `.p-*` before `.px-*`/`.py-*`.** Verified against the target repo's own compiler. `node_modules/tailwindcss/dist/lib.js` registers the padding family in the literal order `[["p","padding"],["px","padding-inline"],["py","padding-block"], …]`, and an in-memory `compile()` of tailwindcss **4.3.0** with exactly these candidates emits, inside `@layer utilities`:

```
.p-0 { padding: … }
.p-2 { padding: calc(var(--spacing) * 2) }
.px-\(--overlay-pad-inline\)  { padding-inline: var(--overlay-pad-inline) }
.py-\(--overlay-pad-block\)   { padding-block:  var(--overlay-pad-block)  }
```

Equal specificity (0,1,0), same layer, longhands last → **the longhands win**. The popover ships `padding-inline: 1rem` / `padding-block: 1.272rem` — glass's √φ-anisotropic overlay rung — and `p-2` contributes nothing.

This is worse than a wrong value. The class *persists in the rendered DOM*, so every future reader, reviewer, and DevTools inspection sees a `p-2` that looks operative. The demo's only other popover asks for `p-4` (`scenes/cube/CubeScene.vue:127`), which is 16px — i.e. it *agrees* with the glass inline rung and is likewise redundant. SharePopover is the only site attempting to compress the overlay, and it is the only one that silently fails to.

> **Falsifier.** Computed style on `.popover-content` when this popover is open: **`padding: 8px` on all four sides kills the claim.** Equally fatal: a demo-side `@layer` declaration that re-orders utilities relative to each other (none exists — `style.css:1–16` declares only `@custom-variant dark`), or a Tailwind version bump that reorders the padding registration.

### M-2 · `transition-all duration-fast` overwrites `scale-on-hover`'s spring with a bezier, at the exact duration glass-ui's own strike forbids for a control attack — **MAJOR**

`SharePopover.vue:7` composes `scale-on-hover transition-all duration-fast` on one element.

`glass-ui/src/styles/utilities/btn.css:15–27` defines the canonical utility, and its comment states the doctrine explicitly:

```
@utility scale-on-hover {
    scale: 1;
    transition: scale var(--spring-press-duration) var(--spring-press);
    &:hover { scale: var(--scale-hover); }
}
```
> *"the `scale` transform leg rides `--spring-press` (the touch answer), NOT the bezier `--ease-standard` (a transform on a bezier reads mechanical; springs read alive on transform)."* (`btn.css:17–20`)

Compiling `["transition-all","duration-fast","scale-on-hover", …]` against tailwindcss 4.3.0 with the glass `@theme` bridge in place emits, in the utilities layer, **in this order**: `.scale-on-hover` → `.transition-all` → `.duration-fast`. `.transition-all` writes `transition-property: all`, `transition-timing-function: var(--tw-ease, var(--default-transition-timing-function))`, `transition-duration: var(--tw-duration, …)`; `.duration-fast` writes `transition-duration: var(--transition-duration-fast)`. All three longhands land **after** `scale-on-hover`'s shorthand and replace it.

Net effect on this one control:

| leg | authored by the utility | what actually ships |
|---|---|---|
| property | `scale` only | `all` |
| timing | `var(--spring-press)` | `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind default; `--tw-ease` unset) |
| duration | `var(--spring-press-duration)` | `var(--duration-fast)` = **0.2s** (`tokens/scheme-motion.css:100`) |

`duration-fast` *does* resolve — `glass-ui/src/styles/theme/bridges.css:367` bridges `--transition-duration-fast: var(--duration-fast)` inside `@theme inline`, so the utility is real. That is what makes this a defect rather than a no-op: the file successfully re-times the control to the **calm 0.2s** clock. `btn.css:37–47` is a signed strike against exactly this: *"A control the user actively pokes wants the ~100-120ms quick beat that tracks the cursor; 0.2s drags the colour/border/shadow VISIBLY behind the press (the §F 'super laggy' read)"* — with the attack budget named as `ACKNOWLEDGE_WINDOW_MS` (150ms). 0.2s exceeds it by 33%.

`SharePopover.vue:7` is the **only** one of the eight `scale-on-hover` sites in the demo that pairs the utility with `transition-all` (`EditorHeader.vue:26`, `EditorShell.vue:36,46`, `KeyframesEditor.vue:83,91`, `KeyframesAddDialog.vue:10`, `MbabbMenu.vue:30`, `CubeScene.vue:124`, `TransportDock.vue:65,201` all omit it). The spring survives at every other site.

`transition-property: all` is independently a cost: it makes the glass surface's blur/background/shadow legs transitionable on a control that never intended to animate them.

> **Falsifier.** Read `transition-property` / `transition-timing-function` on the trigger in DevTools: **`scale` + the spring function kills the claim.** Also fatal: a demo `@layer` re-order placing custom utilities after core ones, or a Tailwind change that sorts custom `@utility` after `transition-*` (compiled order was verified, not assumed).

### M-3 · The URL field wears glass's UPPERCASE caps-label recipe; `normal-case` cancels the case but not the 0.1em caps tracking — **MAJOR**

`SharePopover.vue:19` — `class="text-mono-caption normal-case h-8 flex-1"`.

`glass-ui/src/styles/typography/utilities.css:42–47`:

```
@utility text-mono-caption {
    font-family: var(--font-mono);
    font-size: var(--type-caption);
    letter-spacing: var(--type-tracking-caps);   /* 0.1em — tokens/scheme-motion.css:77 */
    text-transform: uppercase;
}
```

This is a four-property **caps-label** recipe. Applied to a user-editable field, then half-cancelled: `normal-case` removes `text-transform`, and **`letter-spacing: 0.1em` remains**. A pasted share URL therefore renders lowercase, in mono, at 12px, with the letter-spacing designed for small uppercase labels — the one case where added tracking is a legibility *loss*, not a gain.

The correct in-library recipe is one token away and needs no cancel: `text-mono-small` (`typography/utilities.css:49–53` — `font-mono` + `--type-small` + `--type-leading-small`, no case transform, no tracking). It is registered in `cn()`'s conflict table (`class-names.ts:84`) so it merges cleanly.

The cost compounds with the field's width. On the ~180px the field gets after the row arithmetic (§M-4), 12px mono at 0.1em tracking shows roughly 17 characters of a base64 share URL instead of ~20 — a ~15% loss of the field's entire job.

Honest scope note: `text-mono-caption normal-case` is a *house* pairing, not a bespoke invention — `MbabbMenu.vue:5` and `:64` do the same on the "@mbabb" wordmark. The pairing is defensible on a short brand wordmark. It is not defensible on a long, case-significant, user-pasted URL, and this is the only site that applies it to an `<input>`.

> **Falsifier.** Computed `letter-spacing` on the input: **`normal` / `0` kills the claim.** Also fatal: evidence that `--type-tracking-caps` resolves to 0 in the demo (it does not — the demo declares no override; `grep -rn "type-tracking" demo/styles/` is empty).

### M-4 · `h-8 w-8 p-0` hand-rolls `iconOnly`, forfeits the coarse-pointer floor, and produces a row that is never the uniform 32px it describes — **MAJOR**

`SharePopover.vue:25` and `:34` — both action buttons carry `class="h-8 w-8 p-0 shrink-0"` with `size="sm"`.

`Button` already ships this geometry as a first-class axis: `iconOnly` — *"Square geometry for an accessibly named icon command"* (`Button.vue:24`) — which sets `inline-size / block-size / min-block-size: var(--button-size); padding: 0` (`button/styles.css:155–160`) **and** stamps `data-control-target` (`Button.vue:92`), the sole hook the coarse-pointer 44px floor reads (`utilities/responsive.css:4`). Hand-rolling the geometry gets the padding and forfeits the floor.

Worse, the hand-roll does not produce the box it names. `.button` declares `min-block-size: var(--button-size)` (`styles.css:7`) with `--button-size: var(--control-h-sm)` under `size="sm"` (`:144–147`). `min-block-size` is a *different property* from `h-8`'s `height`, so there is no cascade contest — the used height is `max(min-block-size, height)`:

| pointer | `--ui-scale` | `--control-h-sm` | Input (`h-8`, no min) | each Button (`h-8 w-8`) |
|---|---|---|---|---|
| fine | 1 (`sizing.css:51`) | `max(2.25rem, 0px)` = **36px** | 32 × flex | **32 × 36** |
| coarse | 1.5 (`tokens/light-dark.css:17–21`) | `max(3.375rem, 2.75rem)` = **54px** | 32 × flex | **32 × 54** |

`.field-control[data-kind="input"]` sets `block-size` (`field-control.css:33`), which *is* the same property as `height` — so there the utilities-layer `h-8` genuinely wins and the field lands at 32px. The result is a three-control row of **32 / 36 / 36** on desktop and **32 / 54 / 54** on touch. The author asked for one rung and got two, in every environment. On coarse pointers the two action buttons are 1.69:1 tall rectangles with a pill radius (`border-radius: calc(var(--button-size)/2)`, `styles.css:26`, engine-clamped to half the 32px short edge) flanking a 32px pill — an aspect break, not a density choice.

`EditorShell.vue:23–31` shows the house doing it correctly in the *same slot* this component occupies: `<Button emphasis="quiet" icon-only aria-label="…" class="aspect-square w-8 scale-on-hover">`.

> **Falsifier.** Measure the two action buttons: **32×32 in both pointer modes kills the claim.** Also fatal: a demo rule setting `min-block-size: 0` on `.button` (none — `grep -rn "min-block-size" demo/` is empty).

### M-5 · The field has no programmatic label and none of the five URL-input hints the primitive exposes — **MAJOR**

`SharePopover.vue:16–21`. The only naming is `placeholder="Paste share URL..."`.

Placeholder-as-label satisfies the accname algorithm's last-resort step, so the field is not *nameless* — but the visible instruction vanishes the instant a character is typed, which is the WCAG 3.3.2 failure the pattern is named for. The house has both fixes on the shelf and uses them elsewhere: `Label` from the root barrel, and `LabeledInput` / `LabeledField` from `@mkbabb/glass-ui/labeled-field` (live at `ChannelOptions.vue:423`, `LayerConfigPanel.vue:74` — lane-frontend §3.2).

Separately, `Input.vue:27–41` forwards **eleven** native props as first-class API — `type`, `inputmode`, `enterkeyhint`, `autocomplete`, `pattern`, `maxlength`, `name`, `required`, `readonly`, `minlength`, `form`. A field whose entire purpose is pasting a URL sets **none** of them. On a touch keyboard the consequences are concrete and additive: `type="text"` yields a Return key instead of the `enterkeyhint="go"` the component's own `@keydown.enter` handler (`:20`) is waiting for; no `inputmode="url"` means no `/` or `.` row; no `autocapitalize`/`autocorrect`/`spellcheck="false"` means the platform will capitalise and red-squiggle a base64 blob.

> **Falsifier.** Any of: an ancestor `<label for>` or `aria-labelledby` reaching this input (none — the input has no `id` and no wrapping label anywhere in `:14–41`); or evidence that `Input` injects a default `inputmode`/`enterkeyhint` (it does not — `nativeProps` at `Input.vue:27–41` passes `props.*` straight through, undefined when unset).

### M-6 · Zero state coverage: no disabled, no loading, no in-surface error, and the field is never cleared — **MAJOR**

Four gaps, each with a primitive-level answer that is unused:

- **empty.** `useShareState.ts:44–45` — `if (!input) return;`. Pressing the load button (or Enter) with an empty field does nothing at all: no toast, no shake, no disabled state. `Button` ships `disabled` (`Button.vue:29`) and a full disabled skin (`styles.css:162–170`). Binding `:disabled="!loadHashInput.trim()"` is one attribute.
- **loading.** `shareState` is `async` and awaits `navigator.clipboard.writeText` (`useShareState.ts:18,31` → `utils/clipboard.ts:4`). There is no pending affordance and no re-entry guard; the button remains fully actuable across the await. `Button` ships `loading` (`Button.vue:27` — *"Marks an in-flight command and suppresses activation until it settles"*), which sets `aria-busy`, `cursor: progress`, and blocks activation (`Button.vue:42–44,95`; `styles.css:172–174`).
- **error.** Both failure paths (`useShareState.ts:64–67`, `:70–73`) fire a toast and `return`, leaving the popover open with the offending text still in the field and **no error state on the field**. `Input` ships `invalid` → `data-state="invalid"` → a destructive-tinted surface and `aria-invalid` (`Input.vue:11,52`; `field-control.css:62–73`). The user is told the input is wrong by a transient toast rendered somewhere else on screen, while the input itself keeps painting "valid".
- **stale.** `loadHashInput` is never reset — not on success (`:75–86`), not on close. Reopening the popover after any load redisplays the previous URL, so the surface's default state is "already full", and the placeholder that carries the *only* instruction (§M-5) is permanently hidden after first use.

> **Falsifier.** A watcher or `@update:open` handler clearing `loadHashInput`, or a `:disabled`/`:loading` binding, anywhere in the pair — `SharePopover.vue` has 62 lines and `useShareState.ts` 95; neither contains `disabled`, `loading`, `invalid`, or a reset of `loadHashInput.value` (only `:16`'s initialiser). Re-grep to kill.

### M-7 · Three different naming/hinting mechanisms in 62 lines, and the trigger — the only control a user meets first — has the weakest — **MAJOR**

| control | line | naming | hover hint | keyboard hint |
|---|---|---|---|---|
| share trigger | `:5` | `aria-label` | **none** | **none** |
| load | `:27` | `title` | native `title` (≈1s delay, UA-styled) | none |
| copy | `:36` | `title` | native `title` | none |

`title` is not announced on touch, is not surfaced on keyboard focus, and paints in the UA's own chrome — i.e. it is the one hint mechanism that renders *outside* the glass design language, inside a glass surface. The demo mounts a `TooltipProvider` at the app root (`app/App.vue:145`) precisely so this is unnecessary, and the sibling control in the very slot this component occupies uses it properly:

```
EditorShell.vue:21–34
  <Tooltip><TooltipTrigger as-child>
      <Button emphasis="quiet" icon-only aria-label="Show keyboard shortcuts" class="aspect-square w-8 scale-on-hover">
        <Keyboard class="icon-sm" />
      </Button>
  </TooltipTrigger><TooltipContent>Keyboard shortcuts (?)</TooltipContent></Tooltip>
```

The trigger's total absence of a hover hint is the sharper half: in `EditorHeader.vue:22–28` it stands beside a `DarkModeToggle` that *does* carry `title="Toggle dark mode"` (`:25`), so within one two-item row the user gets a hint on one glyph and silence on the other.

Scope honesty: the house is genuinely split between `<Tooltip>` (`EditorShell.vue:21`) and `title` (`EditorHeader.vue:25`, `MbabbMenu.vue:20`). The defect claimed here is not "picked the wrong one of two" — it is that **this single file uses three mechanisms across three controls**, and gives the entry point the emptiest one.

> **Falsifier.** A `<Tooltip>` wrapper, `title`, or `aria-describedby` on the trigger — `:4–12` has `aria-label` and `:class` only. Or a demo-level rule that suppresses native `title` tooltips (none).

---

## 3. The five-axis outlier table (evidence for B-1 / M-4 / M-7)

`EditorShell.vue:17–39` renders `<SharePopover />` and two peers into one `HeaderRibbon #items` slot. Same row, same rung, same purpose — an icon command in the editor header:

| axis | `SharePopover` trigger `:4–12` | shortcuts button `EditorShell.vue:23–31` | `DarkModeToggle` `EditorShell.vue:35–38` |
|---|---|---|---|
| element | raw `<button>` | glass `Button` | glass component |
| box | **24 × 24** (`p-0` + `icon-lg`) | 32 × 32 (`aspect-square w-8`) | 32 × 32 (`aspect-square w-8`) |
| glyph : box | **1.00** (`icon-lg` = 24) | 0.50 (`icon-sm` = 16) | — |
| coarse 44px floor | **no** (`icon-only` absent) | yes (`icon-only`) | library-owned |
| hover hint | **none** | `<Tooltip>` + `<TooltipContent>` | `title` |
| focus affordance | UA default | `.focus-ring` (via `Button.vue:68`) | `.dark-mode-toggle-button` |
| motion | **bezier 0.2s on `all`** (§M-2) | `scale-on-hover` spring | `scale-on-hover` spring |

The same shape holds at `EditorHeader.vue:22–28`, where the single sibling is `class="aspect-square w-8 scale-on-hover hover:opacity-50"` — 32px, spring intact.

The trigger is the outlier on **every** axis simultaneously. That is the strongest single statement this challenge can make: it is not a matter of taste against the design system, it is a matter of this one control against its own two neighbours in its own container.

---

## 4. MINORS

### m-1 · Hover collapses icon contrast from ~16.8:1 to **3.32:1** — 11% of headroom over the 3:1 non-text floor — MINOR

`SharePopover.vue:8` — `sharePopoverOpen ? 'opacity-100' : 'hover:opacity-50'`. The glyph inherits `currentColor` (no colour class), i.e. `--foreground`.

Computed from tokens, sRGB compositing, WCAG relative luminance, **light theme over the flat page surface** (`--foreground: hsl(24 10% 10%)` `color-radius.css:59`; `--background: --neutral-0 = hsl(40 30% 98%)` `:40,58`):

| state | effective glyph sRGB | contrast vs page |
|---|---|---|
| rest | (28, 25, 23) | **16.83 : 1** |
| hover (α .5) | (140, 138, 136) | **3.32 : 1** |

Dark theme (`dark-arm.css:83,54`): 15.85:1 → **4.48:1**. So light is the tight arm: it clears WCAG 1.4.11's 3:1 non-text floor by 0.32.

Two aggravations. First, the direction is inverted: hovering *dims* the control — the standard affordance is that hover raises salience, and here the only two hover legs (`scale-on-hover` up 8%, opacity down 50%) pull against each other. Second, and decisively for the margin: the header is **not** over the flat page surface. It is `absolute top-0` over the scene (`EditorHeader.vue:3`) with `HeroAurora` / `grid-background` beneath (`EditorShell.vue:12–16`). Over any mid-tone aurora stop the 0.32 of headroom is very plausibly gone.

> **Falsifier.** Sample the hovered glyph against its actual painted backdrop and compute: **≥3:1 over the real backdrop keeps it passing.** The 3.32:1 flat-surface figure is proven; the live figure is **UNPROVEN-NEEDS-LIVE** and is the SS-13 probe this claim asks for.

### m-2 · The `opacity-100` branch is dead — MINOR
`:8`. When `sharePopoverOpen` is true the ternary already omits `hover:opacity-50`, and `opacity: 1` is the initial value. The true branch changes nothing. It reads as a deliberate open-state emphasis and is a no-op. **Falsifier:** any rule setting a non-1 opacity on this button that `opacity-100` would counter — none exists.

### m-3 · No `type="button"` on an `as-child` trigger — MINOR (latent)
`PopoverTrigger.vue:24–27` injects `type: "button"` **only when `asChild` is false**: `return props.asChild ? forwarded : { ...forwarded, type: "button" };`. `SharePopover.vue:3` uses `as-child`, so the raw button at `:4` ships with no `type` and defaults to `submit`. The house idiom sets it explicitly at the identical construction — `KeyframesAddDialog.vue:7–8`: `<button type="button" aria-label="Add keyframes" …>`. **Latent only:** `grep -rn "<form" demo/` returns nothing. **Falsifier:** find a `<form>` ancestor (would upgrade this to MAJOR), or show reka injects a type at the primitive level (it does not — glass strips and re-adds it, conditionally, above).

### m-4 · The demo's declared "SINGLE keyboard-focus affordance" is skipped — MINOR
`design-idioms.css:73–79` declares `.focus-ring:focus-visible` as *"the demo-owned :focus-visible contract — the SINGLE keyboard-focus affordance"*. The trigger applies neither `.focus-ring` nor anything else and falls to the UA outline; glass `Button` applies it automatically (`Button.vue:68`), so the two controls *inside* the popover are compliant and the one outside is not. There is a third idiom in the tree (`KeyframesEditor.vue:91` — `outline-none focus-visible:ring-2 focus-visible:ring-accent`), so the demo carries three; this file adds the fourth (none). Note the trigger is also outside the forced-colors focus restore list, which enumerates `.focus-ring` and friends (`utilities/a11y-overrides.css:36–53`) — harmless, because the UA outline survives forced-colors natively. **Falsifier:** a `:focus-visible` rule in the demo cascade matching a bare `button` — `grep -rn "focus-visible" demo/styles/` yields only the `.focus-ring` rule.

### m-5 · No `isInsideToaster` guard, and this component has the one state where it matters — MINOR
The demo owns a documented guard for exactly this hazard (`components/instrument/utils/toastGuard.ts`), installed on both sibling overlays: `KeyframesAddDialog.vue:17–22` and `CSSPasteDialog.vue:4–9` (`@interact-outside` → `if (isInsideToaster(event.target)) return event.preventDefault()`). `PopoverContent` emits the same `interactOutside` / `pointerDownOutside` (`PopoverContent.vue:102–103`) and SharePopover binds neither. The reachable state is specific and real: both `loadFromInput` error paths (`useShareState.ts:64–67`, `:70–73`) fire a toast **and leave the popover open** — the only place in the pair where a toast and this surface coexist. Clicking that toast (e.g. its close control) dismisses the popover, discarding the text the user was about to fix. **Falsifier:** show that vue-sonner's viewport is inside the popover's DOM subtree (it is not — `DemoGlobalChrome.vue:28` teleports the `<Toaster>` to document level), or that reka's outside-interaction detection ignores portalled siblings.

### m-6 · The field is not focused on open — MINOR
`PopoverContent` forwards `@open-auto-focus` (`PopoverContent.vue:105`) precisely so a consumer can redirect initial focus. Unused. reka's default parks focus on the content container, so a paste-target surface costs one extra Tab before the user can paste — on a surface whose placeholder is an imperative ("Paste share URL…"). **Falsifier:** an `autofocus` attribute or a focus call anywhere in the pair — neither file contains one.

### m-7 · `keepDockOpen` unused at the one dock-hosted call site — MINOR
`Popover` exposes `keepDockOpen` — *"Hold an ancestor GlassDock open while this surface is visible"* (`Popover.vue:24–25`) — wired to `dock.keepOpen()`/`release()` (`:67–86`). `SharePopover.vue:2` passes only `v-model:open`. The `MbabbMenu` call site sits inside `ChromeDock` (`MbabbMenu.vue:5` renders a `DockTrigger`), and Vue provide/inject crosses the portal, so `useOptionalDockContext()` resolves there. No demo file passes the prop (`grep -rn "keep-dock-open\|keepDockOpen" demo/` → 0 hits), so the dock is free to collapse under an open share surface. **Falsifier:** show `ChromeDock` never auto-collapses, or that no dock context reaches this subtree — either kills it. Given **B-2**, this site may be removed entirely.

### m-8 · `gap-1.5` is off the row-gap rungs used everywhere around it — MINOR
`:15` — `gap-1.5` = 6px. Its own consumers use `gap-2` / `gap-4` (`EditorHeader.vue:18`) and `gap-2.5` (`MbabbMenu.vue:8,18,29`); the peer popover uses `gap-3` (`CubeScene.vue:129`). 6px is the tightest gap in the demo's overlay vocabulary and appears once. Combined with §M-1 (the surface pads at 16/20.35px, not the intended 8px), the surface reads as generous padding wrapped around an unusually tight control row — the inverse of the intended proportion. **Falsifier:** find `gap-1.5` at ≥2 other overlay sites — `grep -rn "gap-1\.5" demo/` to settle.

### m-9 · Copy: three ASCII dots, two exclamation marks, one redundant description — MINOR
`:18` `"Paste share URL..."` — three periods where the demo's own prose uses real typography (`useShareState.ts:37` correctly uses an em dash: `"URL updated — copy from address bar"`). `useShareState.ts:31` `"Link copied to clipboard!"` and `:83` `"State restored!"` are the only exclamatory strings in the pair; `:85`'s description `"Animation state loaded from shared URL."` restates `:83` in longer form, so the toast says the same thing twice at two register levels. The exclamation mark is the trite register the rest of this codebase avoids. **Falsifier:** a house style doc mandating exclamation-terminated confirmations — none found under `demo/` or `docs/precepts/`.

### m-10 · The surface's hierarchy is inverted against its own name — MINOR
The trigger is named "Share animation" (`:5`) and the MbabbMenu row labels it "Share" (`MbabbMenu.vue:11`). Inside, the *share* action is the last 32px of a ~256px row (`:31–39`), while the *load* affordance — an input plus its submit button — occupies roughly 70% of the width (`:16–30`). The primary action named on the trigger is the smallest, last, right-most element in the surface, and is visually indistinguishable from the secondary one (both `size="sm" emphasis="quiet"`, identical classes). `Button` exposes `emphasis="primary"` for exactly this ranking (`Button.vue:15`) and it is unused. **Falsifier:** evidence that loading is the intended primary — `MbabbMenu.vue:12`'s own description orders it *"Copy link or load shared state"*, share first.

### m-11 · The dialog's name is inherited and under-describes — MINOR (downgraded)
Worth recording *because the obvious stronger claim is false*. `PopoverContent` exposes `ariaLabel` — *"Accessible name for the hover group or click dialog"* (`PopoverContent.vue:21–22`) — and `SharePopover.vue:14` does not pass it. That is **not** an unnamed dialog: `reka-ui/dist/Popover/PopoverContentImpl.js:140,148` renders `role: "dialog"` with `aria-labelledby` pointing at the trigger id, so the dialog resolves to the trigger's `aria-label`, "Share animation". The residual defect is only accuracy: a dialog whose dominant control is a *load* field announces as "Share animation" (cf. §m-10). **Falsifier:** an accessibility-tree dump showing an empty dialog name would *upgrade* this to MAJOR; showing "Share animation" confirms it as filed.

---

## 5. INFO

- **i-1 · `z-popover w-72` restate the primitive's own defaults.** `PopoverContent.vue:64` already pins `z-popover w-72`; `:14` repeats both. `cn()` collides them (buckets `z-index`, `width` — `class-names.ts:125,201`) and keeps the consumer's identical copies, so the output is byte-equivalent. Harmless, but it makes `:14` read as three deliberate overrides when one of the three is dead (§M-1) and two are echoes. Relevant to lane-frontend §6.3's flat-namespace hazard: the demo restates library tokens rather than deriving from them, and owns zero `--kf-*` prefix to signal which is which.
- **i-2 · `icon-lg`/`icon-md` are invisible to glass's glyph-sizing escape hatch.** `button/styles.css:48` sizes un-sized child SVGs via `.button > svg:not([class*="size-"])`, with `sizing.css:108–109` naming that `[class*=size-]` probe as the deliberate host-sized-icon escape. `icon-md` (`:29`, `:38`) does not contain the substring `size-`, so the probe *fails to detect it* and glass writes `--ui-glyph` anyway; `icon-md`'s `@apply size-5` wins only because `@utility` output lands in the `utilities` layer and `.button` is in `components`. Correct today, by layer order rather than by the intended handshake. **Falsifier:** rename the family to `size-icon-md` and the handshake becomes explicit; any change to glass's layer assignment flips the result.
- **i-3 · `ArrowRight` is a directional glyph with no RTL mirror.** `:29`. Latent only: `grep -rn "rtl\|dir=" demo/ --include=*.vue --include=*.ts --include=*.css` returns **zero** hits, so the demo declares no RTL support at all. Recorded so a future RTL wave finds it. (`align="start"` at `:14` is correctly logical and would flip for free.)
- **i-4 · `props.onSceneRestore` is captured once, non-reactively.** `:60–61` reads `props.onSceneRestore` at setup and hands the value to `useShareState`. A parent that swaps the handler after mount is ignored. Only 1 of 3 call sites passes it at all (`MbabbMenu.vue:9`), and that site is the one **B-2** puts in question — so the reactive-capture question may be moot after the fix. Primarily a correctness-axis note, recorded here because it shapes the component's API story (see B-2: the public surface is one optional callback and nothing else).

---

## 6. SUPERLATIVES (L-18, running the other way)

- **S-1 · The component correctly needs no local `prefers-reduced-motion` gate, and correctly does not add one.** `glass-ui/src/styles/utilities/a11y-overrides.css:40–48` installs a blanket `* , *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0s !important }` under `reduce`, with a signed rationale for why it deliberately does *not* mint a `transition-property` (the "no-resurrection" law, `:6–39`). The `transition-all` of §M-2 is therefore fully neutralised under PRM — the hover scale snaps with zero frames. Against lane-frontend §6.5's 13 enforcement sites, this file's zero is the *correct* count, not a gap. **Falsifier:** show `utilities/a11y-overrides.css` is not reached by `@import "@mkbabb/glass-ui/styles"` (`demo/styles/style.css:3`) — then this becomes a defect and §M-2 becomes a BLOCKER.
- **S-2 · The two error messages discriminate two genuinely different failure modes, accurately.** `useShareState.ts:49–73`: a parseable URL whose hash carries no `state` param yields *"No shared state found in URL"*; anything that fails `new URL()` is treated as a raw param and, if it will not decode, yields *"Invalid shared state"*. The control flow at `:59–62` makes the two paths actually disjoint. Most share-loaders emit one generic string for both. **Falsifier:** an input that reaches the wrong message — e.g. a valid URL with a corrupt `state` correctly lands on "Invalid", not "No shared state found".
- **S-3 · The share URL is resolved, not concatenated.** `useShareState.ts:24–28` builds through `router.resolve({ name, query })` with the comment *"for correct hash-mode URLs"*, then prefixes `window.location.origin`. This is the one construction that survives hash-mode routing, a base path, and query merging (`...route.query` is preserved). Hand-concatenated share links are the usual failure here. **Falsifier:** a router base config that `resolve().href` omits — none is set in the demo's router.
- **S-4 · The clipboard failure path degrades to something the user can still act on.** `:33–39` — on a `writeText` rejection (Safari user-gesture loss, insecure context, denied permission) it writes the state into the address bar via `router.replace` and tells the user where to find it, at a 5s duration rather than the 3s used for errors. A silent catch was the easy option. **Falsifier:** show `router.replace` cannot land the param in hash mode — `:35` mirrors the same query shape `:26` resolves.
- **S-5 · The z-rung and the overlay offset are both taken from the semantic vocabulary, not from raw numbers.** `:14` uses `z-popover`, honouring `style.css:37`'s explicit prohibition (*"do NOT introduce a raw `z-[N]` bracket value"*), and `:side-offset="8"` matches the 8px overlay offset `MbabbMenu.vue:6` uses for the dropdown — one offset rung across two adjacent surfaces. The rung choice is right even though **B-2** shows the *rung itself* is below its host.

---

## 7. What the fix wave should touch first

Ordered by blast radius, not by severity alone:

1. **B-2** — decide whether `MbabbMenu` keeps a share row at all. If yes, SharePopover needs a trigger slot (or a `label` prop) so the row is one `menuitem`, and the surface must not be rendered inside a `z-modal` host. Everything else about the MbabbMenu call site is downstream of this.
2. **B-1 + M-4 + M-7 together** — they are one edit: make the trigger a glass `Button emphasis="quiet" icon-only aria-label="…"` wrapped in `<Tooltip>`, matching `EditorShell.vue:23–31` verbatim; drop `h-8 w-8 p-0` from both action buttons in favour of `icon-only`; drop both `title` attributes for `aria-label` + `TooltipContent`. The whole outlier table in §3 collapses in one pass.
3. **M-2** — delete `transition-all duration-fast` from `:7`. One token pair; restores the spring.
4. **M-1** — delete `p-2` (dead) and, if the surface genuinely wants compression, set `[--overlay-pad-inline:0.5rem]` instead, which the primitive's own `calc` will carry into the block axis at √φ.
5. **M-3** — `text-mono-caption normal-case` → `text-mono-small`. Removes a class and a cancel-class.
6. **M-5 + M-6** — the field's props (`type="url" inputmode="url" enterkeyhint="go" spellcheck="false"` + a real `Label`/`LabeledInput`) and the four state bindings (`:disabled`, `:loading`, `:invalid`, reset-on-close). Largest behavioural surface; independently landable.
7. The MINORs are one-liners each and can ride any of the above.

**Nothing above requires a glass-ui upgrade.** Every primitive, prop, token, and utility cited is present in the **7.0.0** copy already installed at `keyframes.js/node_modules/@mkbabb/glass-ui` (lane-frontend §2, F-1). Per that lane's ordering, **F-1 must land first** — none of these fixes is reproducible from a clean checkout until glass-ui is declared and locked.
