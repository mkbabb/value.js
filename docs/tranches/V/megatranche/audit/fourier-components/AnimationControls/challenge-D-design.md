claude-opus-5[1m] (served model id)

# CHALLENGE — `AnimationControls.vue` · axis **D (DESIGN)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/AnimationControls.vue` (224 lines)
**Substrate.** fourier `cd26c653` + the 28-path frozen M.W1a working tree (census §1); this file is **modified in the WT** (`git status --porcelain` → ` M web/src/components/visualization/AnimationControls.vue`). Where a claim could be a WT artifact I re-checked `git show HEAD:` and say so.
**Pin.** `@mkbabb/glass-ui ^4.0.0` / installed `4.0.0` (`web/package.json:14`); producer at **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`). Every 4→7 consequence is in §3.
**Method.** Static + source-derived only. No browser. Read whole: the subject; `stores/animation.ts`; `stores/workspace.ts`; `components/ui/tooltip/Tooltip.vue`+`index.ts`; `GlassTimeline.vue`; `SpeedSelect.vue`; `EasingPicker.vue`; `lib/easings.ts`; both mount sites (`FullscreenViewer.vue`, `VisualizationView.vue`); `src/style.css`; and the installed glass-ui 4.0.0 `dist/dock.js` / `dist/dropdown-menu.d.ts` / `dist/components/custom/metric-badge/MetricBadge.vue.d.ts` / `dist/styles/tokens/*` plus the producer 7.0.0 `src/components/dock/*` and `src/components/metric/*`. **No file outside this one written; no product source touched in any repo.**
**Priors.** Prior read as instructed: `formation/fourier/CENSUS-2026-08-03.md` (+ its addendum), `lane-frontend.md`, `lane-crud.md`, and `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Row ids cited inline where they overlap; §5 records the one place the tree contradicts a prior.

**Tally. 24 defects — 4 BLOCKER · 8 MAJOR · 10 MINOR · 2 INFO. 4 superlatives.** (`defects` = the full finding count; `blockers` is the subset.)

The component is **DEFECTIVE**. Its prose and its architectural intent are genuinely above the constellation baseline (§4) — and its two most carefully-argued design moves (the typed `maxWidth` prop, the `role="group"`-inside-`role="menu"` composition) are the two that do not work. It is a component whose comments are more correct than its CSS.

---

## §1 — BLOCKERS

### D-1 · BLOCKER · The `maxWidth` prop's rule is unreachable — the dock's expanded-width contract is dead at **both** mount sites

**Claim.** `.animation-dock:where(.expanded) { width: min(var(--animation-dock-max-width, 960px), calc(100dvw - 1rem)); }` (`AnimationControls.vue:134-136`) is inside a **`<style scoped>`** block (`:130`). Vue's SFC compiler rewrites it to `.animation-dock[data-v-H]:where(.expanded)`. That attribute is applied by the renderer to `<GlassDock>`'s **root element**. `GlassDock` declares **`inheritAttrs: false`** and spreads `$attrs` onto an **inner** div:

- installed 4.0.0, `node_modules/@mkbabb/glass-ui/dist/dock.js:582` → `inheritAttrs: !1` (the sole occurrence in the file; it belongs to the `GlassDock` definition opened at `:581` and set up at `:603-606`);
- `dock.js:680` → the **root** is `D("div", { class: N(["glass-dock-frame", K(u)]), … })`;
- `dock.js:683-696` → the **inner** div receives `t.$attrs` merged with `class: ["glass-dock", …, { expanded: W.value, collapsed: !W.value, … }]`.

So the element that carries `class="animation-dock"` **and** `.expanded` is `.glass-dock` (inner), which never receives `data-v-H`; and the element that carries `data-v-H` is `.glass-dock-frame` (root), which never carries `.expanded`. **The selector matches nothing, in either direction.** The inline `:style="{ '--animation-dock-max-width': maxWidth }"` (`:62`) *does* land (it rides the same `$attrs`) — the custom property is set and then consumed by no one.

**Consequence.** Both `VisualizationView.vue:236` (default `960px`, `AnimationControls.vue:25`) and `FullscreenViewer.vue:131-139` (`max-width="60rem"`) render the dock at whatever intrinsic width the primitive resolves — the deliberate 960px / 60rem proportion never applies. Proportion is the first named criterion of this axis; the component's single explicit proportion rule is inert.

**This is a WT-era regression that will NOT be cured by F.W1.** The producer 7.0.0 `GlassDock` keeps the same shape and states the contract explicitly — `/Users/mkbabb/Programming/glass-ui/src/components/dock/GlassDock.vue:38-45`:

> *"Fall-through attrs (class, data-testid, aria-\*, the container styles every gate + consumer targets via `.glass-dock[...]`) belong on the `.glass-dock` root exactly as before the frame existed — `inheritAttrs: false` + an explicit `v-bind="$attrs"` on the inner dock div keep the frame **byte-transparent to every existing selector contract**."*

That byte-transparency claim is true for **global** selectors and **false for Vue scoped ones**, because the scope-id attribute follows the component root, not `$attrs`. **Relay to the glass-ui BH inbox per standing law** (`feedback-glassui-bhbi-relay`): the frame introduction silently broke every consumer that styles a dock from a scoped block.

**Falsifier.** The claim dies if (a) the style block were unscoped, (b) `GlassDock` applied `$attrs` to its root, or (c) Vue propagated the parent scope-id to non-root descendants of a child component. (a) is refuted at `:130`; (b) at `dock.js:582`+`:683`; (c) is not how `setScopeId` works — the parent's scope-id is applied only where the mounted element *is* the child's subtree root. **Live confirmation available and cheap** (`getComputedStyle($('.animation-dock')).width` ≠ `min(960px, …)`) — mark **UNPROVEN-NEEDS-LIVE for SS-13** only as corroboration; the source derivation is complete.

---

### D-2 · BLOCKER · The primary control's glyph fails WCAG 1.4.11 in the light theme — white-on-rainbow ≈ **1.14 : 1**

**Claim.** `.play-btn` hard-codes `color: #fff` (`:153`). Directly beneath the glyph sits `.play-btn::before` — a 7-stop saturated gradient at α 0.45–0.55 (`:163`) — and *nothing else*. Paint order is decidable: `.play-btn` sets `backdrop-filter: blur(12px) saturate(1.4)` (`:151`), which **establishes a stacking context**; therefore `::before { z-index:-1 }` (`:164`) paints at CSS 2.1 App. E **step 2** — above the button's own background (step 1), below the in-flow `<svg>` (step 3/5). The rainbow is the glyph's immediate backdrop. `::before` has no opacity rule anywhere in the file (the `transition: opacity` at `:166` never fires — see D-17), so it is **always** at full strength, playing or paused.

**Numbers.** Default theme is light: `src/style.css:119` opens a `:root` arm and `:123` a `.dark` arm; `AppHeader.vue:141` mounts `DarkModeToggle`; glass-ui's `--background: var(--neutral-0)` (`dist/styles/tokens/color-radius.css`). At the `hsl(55 80% 55%)` stop (`:163`), α 0.45 over a near-white backdrop composites to ≈ `rgb(250, 243, 161)`, relative luminance ≈ **0.87**; against `#fff` that is **≈ 1.14 : 1** — against a **3:1** requirement for the graphic that distinguishes *play* from *pause* state. The `drop-shadow(0 1px 1px rgba(0,0,0,0.15))` at `:186` is a 15%-alpha 1px shadow and does not move the ratio meaningfully. Dark theme survives (≈ 4.1 : 1 at the same stop) — **the failure is one whole theme, not a corner case**.

**Aggravator.** `.play-btn.is-playing::before { animation: rainbow-drift … }` (`:176` / `:187`) *scrolls* the gradient, so under light theme the glyph cyclically fades to invisibility and back while the animation plays — precisely when the user most needs to see the pause affordance.

**Falsifier.** Dies if the app has no light theme (refuted: `style.css:119-127`, `AppHeader.vue:141`), or if the dock always sits over a dark canvas (refuted: `backdrop-filter` samples the page, whose `body` is `@apply bg-background` — `style.css:20`), or if 1.4.11 exempted the glyph (it does not: this is "visual information required to identify … states of user interface components").

**Root cause worth naming.** This is the **only** hard-coded colour family in the file — `:149`, `:150`, `:153`, `:156`, `:163`, `:173`, `:181`, `:183` are all literal `rgba(255,255,255,…)` / `#fff` / raw `hsl()`, while `:190-192` correctly use `var(--foreground)` + `color-mix()`. The repo already proves it knows how to do this: `style.css:113-122` darkens `--viz-amber` from 3.54:1 to 4.6:1 *specifically for the light arm*, with the axe carry documented. The play button is the exception to the project's own law.

---

### D-3 · BLOCKER · The focus indicator is invisible in the light theme, and departs from the app's own canonical ring

**Claim.** `.play-btn:focus-visible { outline: 2px solid rgba(255, 255, 255, 0.6); outline-offset: 2px; }` (`:183`). `outline-offset: 2px` places the ring **outside** the button, on the dock's glass surface. In the light theme that surface is near-white; 60% white over near-white composites to ≈ `rgb(253,253,253)` — **≈ 1.0 : 1** against its own adjacent colour, against the 3:1 that both SC 1.4.11 and SC 2.4.11 (Focus Appearance) require. A keyboard user loses the focus indicator on the component's primary control across the entire default theme.

The app **has** a canonical pattern and this file ignores it: `src/style.css:136-142` — `outline: 2px solid var(--ring); outline-offset: 2px;` — installed globally at D.W4.d *precisely because* scoped styles could not reach the sites that needed it. Four other selectors adopt it; `.play-btn` re-invents it in literal white.

**Falsifier.** Dies if `--ring` were itself white in the light arm (refuted — glass-ui's light arm derives `--ring` from the near-black `--foreground: hsl(24 10% 10%)`, `dist/styles/tokens/color-radius.css`), or if `.play-btn` never receives keyboard focus (refuted — it is a native `<button>`, `:67` and `:82`).

---

### D-4 · BLOCKER · Dead parent wiring — the ghost and image-overlay toggles are **unreachable** in fullscreen viewing mode

**Claim.** `FullscreenViewer.vue:131-139` renders:

```
<AnimationControls
    :active-bases="activeBases"
    :show-ghost="showGhost"
    :show-image-overlay="showImageOverlay"
    max-width="60rem"
    @toggle-ghost="emit('toggleGhost')"
    @toggle-image-overlay="emit('toggleImageOverlay')"
    @export-frame="canvasComponent?.exportFrame()"
/>
```

`AnimationControls` declares exactly two props — `activeBases`, `maxWidth` (`:15-26`) — and exactly one emit — `exportFrame` (`:28-30`). Therefore:

1. `show-ghost` / `show-image-overlay` fall through as **literal DOM attributes** onto `.glass-dock` (via the `$attrs` path of D-1), polluting the dock element with `show-ghost="true"`.
2. `@toggle-ghost` / `@toggle-image-overlay` are **never emitted by anything**. `FullscreenViewer`'s own `toggleGhost` / `toggleImageOverlay` emits (`:22`, declared at `:20-24`) are dead code paths, and `VisualizationView.vue:285`'s `@toggle-ghost="showGhost = !showGhost"` handler can never fire from fullscreen.
3. In fullscreen the controls dock is the *only* control surface: `FullscreenViewer.vue:130` gates it on `v-if="!isEditing"`, and `EditorControlsDock` — the component that actually owns the ghost toggle (`EditorControlsDock.vue:30, 42, 143-144`) — mounts only under `isEditing` (`VisualizationView.vue:238`). **So a user in fullscreen cannot toggle the ghost trace or the image overlay at all.**

**Not a WT artifact.** `git show HEAD:web/src/components/visualization/AnimationControls.vue` carries the identical two-prop / one-emit surface (verified: no `showGhost` / `toggleGhost` / `showImageOverlay` token anywhere in the HEAD blob). `FullscreenViewer.vue` is **not** in the 28-path modified set, so live == HEAD there too. The dead wiring predates the frozen tree.

**Falsifier.** Dies if `AnimationControls` rendered those controls via `$attrs`-driven slots (it does not — the template `:57-127` has no ghost/overlay control of any kind), or if another fullscreen surface offered them (refuted by `FullscreenViewer.vue:104-141`, read whole). The one thing this does *not* prove is whether `vue-tsc` currently flags the excess props — I did not run it (`build` is `vue-tsc -b`, which writes `.tsbuildinfo`; the read-only law forbids it). Mark **UNPROVEN-NEEDS-LIVE for SS-13** for the *gate* status only; the unreachability is source-decidable.

---

## §2 — MAJOR

### D-5 · MAJOR · `.summary-speed` text can never reach 4.5 : 1 — in **either** theme

`color: color-mix(in srgb, var(--foreground) 35%, transparent)` (`:192`). 35% alpha is a hard ceiling. Light arm (`--foreground: hsl(24 10% 10%)`, `dist/styles/tokens/color-radius.css`) over a near-white dock → ≈ **2.26 : 1**. Dark arm (`--foreground: hsl(48 10% 90%)`, `dist/styles/tokens/dark-arm.css`) over a near-black dock → ≈ **2.90 : 1**. Requirement for normal text is 4.5:1; the text is not "large" under either the 18.66px-bold or 24px-normal definition (see D-6 for the effective size). This is the collapsed dock's **only** text.

**Falsifier.** Dies only if the dock's own surface were mid-tone in both themes such that a 35%-alpha foreground cleared 4.5:1 — arithmetically impossible: 35% alpha caps the achievable ΔL. The repo ships `@axe-core/playwright ^4.11.3` (`package.json:36`); if that suite is green today, the probe worth running at F.W4 is whether the collapsed dock state is ever asserted.

### D-6 · MAJOR · The declared `size="sm"` is overridden into `text-base` — the badge is ~half the mini-rail's height

`<MetricBadge :value="anim.speed" unit="×" size="sm" class="summary-speed" />` (`:75`) declares the 11px rung of the library's ladder (`dist/components/custom/metric-badge/MetricBadge.vue.d.ts`: *"sm 11px / md 12px / lg 14px / xl 18px"*). The scoped rule `.summary-speed { @apply text-base; … }` (`:192`) — specificity `(0,2,0)` with the scope attribute, against the library's single-class size rule — **wins**, forcing `1rem`. And `src/style.css:40-49` sets the root font to `1.125rem` below 768px, so `1rem` resolves to **18px on mobile / 16px on desktop**. Against a collapsed rail whose play button is `2.5rem × 2rem` = 40×**32px** (`:184`), the badge occupies 50–56% of the rail height. The `size` prop is inert and the proportion is wrong on the narrowest viewport, which is where the collapsed dock matters most.

**Falsifier.** Dies if `MetricBadge`'s size rule targeted a descendant span with higher specificity than the consumer's root override — the d.ts describes `size` as the badge's own "typographic scale", and the only shipped `.metric-badge*` rule in `dist/glass-ui.css` is `.metric-badge__label{font-weight:…}`, i.e. no competing font-size at greater specificity. Mark the exact rendered px **UNPROVEN-NEEDS-LIVE for SS-13**; the contradiction between `size="sm"` and `@apply text-base` is decidable as written.

### D-7 · MAJOR · The collapsed progress bar fails 1.4.11 (**≈ 1.54 : 1**) *and* has no accessible name, role, or value

`<div class="mini-progress"><div class="mini-fill" :style="{ width: (anim.t * 100) + '%' }" /></div>` (`:74`), painted at `:190-191`: track `color-mix(… --foreground 8% …)`, fill `color-mix(… --foreground 25% …)`. Fill-vs-track in the light arm ≈ `#BFBFBF` on `#EBEBEB` → **≈ 1.54 : 1**, against 3:1 for a meaningful graphical object. Simultaneously it carries **no** `role="progressbar"`, no `aria-valuenow` / `aria-valuemin` / `aria-valuemax`, no `aria-label`, and no `aria-hidden` — two bare divs. In the collapsed state this is the **sole** position readout (the caret label at `:52-54` renders only inside `GlassTimeline`, which lives in the expanded branch, `:91`). So assistive tech gets a play button and a speed badge and nothing about where the animation is.

**Falsifier.** Dies if the collapsed dock were decorative-only — refuted by `:65-76`: the collapsed slot is an interactive control surface (a real toggle button plus a live-updating readout). Dies if `MetricBadge` announced position — it announces speed (`:75`).

### D-8 · MAJOR · `prefers-reduced-motion` covers **1 of 6** animated surfaces, and the component omits the WCAG 2.2.2 seat entirely

The file's single `@media (prefers-reduced-motion: reduce)` block (`:178-180`) disables exactly one declaration: the rainbow drift. Ungated:

- `.mini-fill { transition: width 0.1s linear }` (`:191`) — a continuously re-driven width, ticked by the store's 60fps rAF clock;
- `.icon-swap-*` opacity+`scale(0.7)` (`:196-197`);
- `.play-btn:hover { transform: scale(1.08) }` (`:181`) and `:active { transform: scale(0.93) }` (`:182`);
- `.play-btn` transitions on `transform` (`:155`).

Worse than any of these: **the animation itself.** `stores/animation.ts` (read whole, 146 lines) contains **zero** references to `prefers-reduced-motion`; its rAF loop (`:51-75`) is gated on `playing && anyCanvasVisible` only. `AnimationControls` is the seat that owns the play control and it never consults the media query. This corroborates census **[FE §8]** — *"the two rAF clocks themselves are ungated under `prefers-reduced-motion: reduce`"* — and localises it: this file is where the cure belongs.

The cure needs **no** uplift: `DockBackgroundToggle` — census FE §8's named canonical seat — already ships at the installed pin (`dist/components/custom/dock/index.d.ts`) and survives at 7.0.0 (`glass-ui/src/components/dock/index.ts`, *"WCAG 2.2.2 pause/play toggle for animated backgrounds … bound by the consumer to the renderer's pause()/resume()"*).

**Falsifier.** Dies if `glass-ui/styles` shipped a blanket reduced-motion reset that captured these scoped rules — it cannot: scoped `transition` declarations here are not selected by any producer rule, and the producer's own reduced-motion blocks in `dist/glass-ui.css` are per-component (`.aurora-canvas[data-v-…]`, `.card-header--shrink[data-v-…]`).

### D-9 · MAJOR · Wrong primitive, and the menu's rich children are keyboard-unreachable

`DropdownMenu` / `DropdownMenuContent` (`:103`, `:109`) establish a `role="menu"`. Its children are: a `role="group"` div hosting a `SpeedSelect` combobox (`:115-118`), an `EasingPicker` whose six options are plain `<Button role="menuitemradio">` (`EasingPicker.vue:19-36`), and exactly **one** real `DropdownMenuItem` (Export, `:120-123`).

Reka/Radix menus navigate by arrow keys over **registered** menu-item descendants; `Tab` dismisses rather than traverses. A hand-rolled `<Button role="menuitemradio">` registers with nothing. So of the menu's eight interactive children, **one** is reachable by the menu's own keyboard model.

The correct primitives **exist on the subpath this file already imports**: `dist/components/ui/dropdown-menu/index.d.ts` exports `DropdownMenuRadioGroup` and `DropdownMenuRadioItem`. They are not used. And the shape being expressed — two grouped settings plus one command — is a **Popover**, not a menu; the file reaches for a menu and then spends a five-line comment justifying the mismatch.

That comment (`:110-114`) is the sharp part: it argues, correctly, that `role="group"` satisfies `aria-required-children` and that labelling a combobox `menuitem` would be a lie. Both true. But it reasons about **structure** and never about **operation**, and the operation is what breaks. Correct ARIA over an unreachable control is worse than no ARIA, because it makes the surface look conformant to an automated checker.

**Falsifier.** The primitive-omission and the one-real-`menuitem` count are source-decidable. The arrow-key traversal claim rests on Reka's `MenuContent` roving-focus semantics rather than on a keystroke I performed — mark **UNPROVEN-NEEDS-LIVE for SS-13**; it dies if Reka 2.9.x permits Tab-through of unregistered focusables inside `MenuContent`.

### D-10 · MAJOR · Two of the four Tooltips are anchored to **non-focusable** elements — hover-only, never keyboard-reachable

The local shim renders `<TooltipTrigger as-child><slot /></TooltipTrigger>` (`ui/tooltip/Tooltip.vue:27-29`), so the trigger **is** whatever the caller passes. Across this file's four callsites — intake row **R3-7a** counts exactly *"AnimationControls 4"* over the 35/9 budget, which the live template confirms (`:66`, `:81`, `:94`, `:105`):

| line | slot child | focusable? | verdict |
|---|---|---|---|
| `:66-73` | `<button class="play-btn play-btn--mini">` | yes | correct |
| `:81-88` | `<button class="play-btn">` | yes | correct |
| `:94-98` | `<div class="hidden sm:block">` | **no** | hover-only |
| `:105-107` | `<EllipsisVertical>` → an `<svg>` | **no** | hover-only |

WCAG 1.4.13 requires additional content to be available on **hover *or* focus**. Two of four fail. `:94`'s trigger is additionally `display:none` below the `sm` breakpoint — a tooltip trigger that does not exist on mobile.

Compounding, both malformed cases duplicate an accessible name that is already present:
- `:104` sets `aria-label="More options"` on `DockDropdownTrigger` (which *does* forward it — `dist/dock.js:1185-1207` has no `inheritAttrs:false`, so `$attrs` reach the rendered button) and `:105` sets tooltip text to the identical string → the tooltip's `aria-describedby` produces "More options, More options".
- `:94`'s "Playback speed" duplicates `SpeedSelect.vue:32`'s own `aria-label="Playback speed"`.

**Falsifier.** Dies if Reka's `TooltipTrigger as-child` injected `tabindex="0"` onto a non-focusable child — it merges props and listeners, it does not synthesise focusability. Also dies if the wrapped element were focusable — an `<svg>` without `tabindex` and a plain `<div>` are not.

### D-11 · MAJOR · Two icon families collide inside one four-control row, and the glyph markup is duplicated four times

`:69-70` and `:84-85` inline raw path data at `viewBox="0 0 320 512"` (pause) and `"0 0 384 512"` (play) — Font Awesome's solid transport geometry, filled, no stroke. Eight lines away, `:106` and `:121` render `EllipsisVertical` and `Download` from `lucide-vue-next` (`:6`) — 24×24, 2px stroke, rounded caps, unfilled. Two grammars, one control cluster, ~8px apart. `lucide-vue-next@1.0.0` **ships both glyphs** (`node_modules/lucide-vue-next/dist/esm/icons/play.js`, `pause.js`), so the fork buys nothing.

And the four `<svg>` blocks are two **byte-identical pairs** duplicated between the collapsed (`:69-70`) and expanded (`:84-85`) branches — ~1,000 characters of copied path data in a 224-line file, with the same `Transition`/`v-if`/`v-else` scaffold copied around them (`:68-71` ≡ `:83-86`).

**Falsifier.** Dies if the project documented a "filled glyphs for transport controls" rule — no such rule exists in `style.css` or any read sibling; and dies if lucide lacked the glyphs — refuted above.

### D-12 · MAJOR · State coverage: the readout **fabricates** a value during the loading state

`currentLevel` (`:39-50`) returns a hard `1` when both `store.basesData` and `store.epicycleData` are null. `caretLabel` (`:52-54`) therefore renders a confident **`N = 1`** — or `t = 0.00` in the epicycle-only branch — over an empty workspace.

The obvious falsifier is "it only mounts when data exists". **It fails.** `VisualizationView.vue:121` defines `const hasData = computed(() => store.epicycleData || store.basesData || store.computing)` and `:235` gates the dock on `v-if="hasData && !isEditing"`. The `|| store.computing` disjunct is *exactly* the loading state: while the backend computes, the dock mounts with **no data**, renders `N = 1`, and presents a fully enabled play button and scrub track over nothing.

The store exposes `loading`, `computing`, and `error` (`stores/workspace.ts:49-51`); this component consults **none** of them. `MetricBadge` at the installed pin has no loading affordance either. Net: the component has exactly **one** visual state and no empty / loading / error treatment — while its sibling surfaces do it properly (`VisualizationView.vue:156` loading branch, `:162-165` error branch with the message rendered).

**Falsifier.** Dies if `store.computing` implied data present — refuted by `workspace.ts:60-69` (`beginCompute` sets `computing` before any result exists) and by the disjunction's own shape at `VisualizationView.vue:121`.

---

## §3 — Glass-ui conformance **under the old pin**, and the F.W1 tri-package uplift surface

Installed `4.0.0`; producer `7.0.0`. Census break surface cited: **metric-badge, hover-card/-popover, dock members, `ToastVariant`** [FE §5], with C-4's correction that metric-badge is **7 files** not 6 — **this file is one of the seven** (`:10`).

**BREAKS (this file, exhaustive):**

| # | line | 4.0.0 | 7.0.0 | cure |
|---|---|---|---|---|
| B-a | `:10` | `import { MetricBadge } from "@mkbabb/glass-ui/metric-badge"` | subpath **ABSENT** (`glass-ui/package.json` exports has `./metric`, no `./metric-badge`) | `import { Metric } from "@mkbabb/glass-ui/metric"`. `value` / `unit` / `size` all survive (`glass-ui/src/components/metric/types.ts`: `MetricSize = "sm"\|"md"\|"lg"\|"xl"`). |
| B-b | `:8` | `DockDropdownTrigger` | **DEFINITION-ABSENT** — folded onto `DockTrigger` (`glass-ui/src/components/dock/index.ts`: *"folds the retired `DockSelectTrigger`/`DockDropdownTrigger`/`DockPopoverTrigger` onto the shared `.dock-trigger` recipe … clean break, no alias"*) | `<DockTrigger for="dropdown">` (`glass-ui/src/components/dock/DockTrigger.vue:20-27`). `aria-label` still forwards — `DockTrigger` uses `inheritAttrs:false` + explicit `v-bind="$attrs"` (`:31`, `:53`). |
| B-c | `:6` | `lucide-vue-next` | producer has moved to `@lucide/vue` (`glass-ui/src/components/dock/DockTrigger.vue:20`); census FE §5 budgets **×35 sites** | 2 symbols here (`Download`, `EllipsisVertical`) — or **0**, if D-11 is cured by adopting lucide `Play`/`Pause` and deleting the FA forks, which would make this file's icon import a single rename. |

**SURVIVES:** `GlassDock` (`:8`), the whole `DropdownMenu*` family (`:9`), and the tooltip path via the local shim. Neither `hover-card`/`hover-popover` nor `ToastVariant` appears here.

**IMPROVES (uplift makes this file better):**

- **I-a.** `Metric` gains `loading?: boolean` (`glass-ui/src/components/metric/types.ts`, `MetricValueProps`) — a direct, free cure for D-12's missing loading affordance on the speed readout.
- **I-b.** `DockTrigger` normalises the dock control chassis and — per its own doc — turns **hover-scale OFF across the family** *"so portaled content anchors smoothly to the trigger"* (`DockTrigger.vue:26-27`). This file's `.play-btn:hover { transform: scale(1.08) }` (`:181`) is precisely the behaviour the producer retired; post-uplift the play button will be the only dock control in the constellation that still jumps under the pointer. Budget the removal in the same wave.
- **I-c.** `DockBackgroundToggle` remains the canonical WCAG 2.2.2 seat (§D-8) — available now, no uplift needed.

**REGRESSES / DOES NOT IMPROVE:**

- **R-a.** **D-1 survives the uplift.** 7.0.0 keeps `inheritAttrs: false` + `.glass-dock-frame` (`GlassDock.vue:38-45`). Any consumer styling a dock from a `<style scoped>` block is broken at both pins. This is the cross-repo relay named in D-1 and it should be filed against the producer, not patched around in fourier.

---

## §4 — SUPERLATIVES (L-18 runs both ways)

### S-1 · The `aria-required-children` reasoning at `:110-114` is correct, rare, and load-bearing

> *"The Speed + Easing controls are rich grouped settings, not command items; `role="group"` makes them allowed children of the `role="menu"` content (satisfies the ARIA `aria-required-children` contract) without mislabelling a combobox/toggle-grid as `menuitem`."*

This is right on the specification (ARIA 1.2 admits `group` as an owned element of `menu`) and right on the deeper point — that the cheap fix, stamping `menuitem` on a combobox, would produce a *worse* accessibility tree that passes the same automated check. Most codebases do exactly the thing this comment refuses to do. **Falsifier applied:** the claim would collapse if `group` were not an allowed owned element of `menu`; it is. It survives — even though D-9 shows the surrounding composition defeats it operationally. Correct reasoning inside a wrong container is still correct reasoning, and it is the part worth keeping when F.W3 re-homes this to a Popover.

### S-2 · The play/pause accessible name is state-swapped (not `aria-pressed`) and applied consistently in **both** dock branches

`:67` and `:82` both bind `:aria-label="anim.playing ? 'Pause animation' : 'Play animation'"`. This is the APG-recommended pattern for a transport toggle — the *name* changes to describe the action, rather than a `aria-pressed` toggle whose polarity users must infer. It is applied identically in the collapsed and expanded branches even though the visible tooltip text drifted between them (D-19). The a11y contract held where the copy did not.

### S-3 · Replacing a cross-component CSS-var handshake with a typed, defaulted, documented prop is the right architectural move

`:18-25` documents the intent verbatim — *"Replaces the cross-component `--animation-dock-max-width` CSS-var contract (formerly fed by FullscreenViewer's scoped `.fs-controls`) with a typed prop"* — and `FullscreenViewer.vue:225-227` records the other half of the migration in place of the deleted rule. An invisible custom-property handshake between two *scoped* stylesheets is among the most fragile couplings a Vue codebase can have; converting it to `maxWidth?: string` with a default is exactly right, and the pair of comments makes the change auditable from either end. **The intent is superlative; only the delivery fails** (D-1) — and it fails for a reason external to this file's judgement (the producer's frame/`$attrs` split). Cure D-1 and this becomes a model to copy.

### S-4 · The comments record *why*, not *what* — including what was deliberately **not** done

`:100-102` records the retirement rationale (*"role="menu", focus management, Esc + click-outside dismissal all from the primitive; replaces the hand-rolled popup + onClickOutside"*) — the migration's justification survives its author. `:200-202` explains why the second style block is global **and bounds it**: *"The primitive ships its own chrome (background, border, radius, shadow, animations); we only override the column layout + the menu-item chassis."* `:213-215` does the same for `.menu-item`. On the prose-quality sub-axis this is materially above the constellation baseline: the comments state the constraint and the non-goal, which is what makes a later reviewer able to tell a deliberate override from an accretion. (It is also what makes D-9 and D-1 findable at all — the file argues its own case well enough to be checked.)

---

## §5 — MINOR

- **D-13 · MINOR** — `::after`, the specular sheen (`:168-175`), paints **above** the glyph. `.play-btn` establishes a stacking context (`backdrop-filter`, `:151`); `::after` is positioned with `z-index: auto` → App. E **step 6**, above the in-flow `<svg>` (step 3/5), which carries no `position`/`z-index` (`:186`). Currently harmless (white sheen over a white glyph) — it becomes a visible wash the moment the glyph is tokenised, i.e. **the D-2 cure will expose this**. Fix both together. *Falsifier:* dies if `.play-icon` were positioned — it is not.
- **D-14 · MINOR** — Optical centering. The FA play path (`:70`, `:85`) is a right-pointing triangle whose visual centroid sits left of its bounding box; the pause path is symmetric. `.play-icon` (`:186`) applies identical box-centering to both, so the *perceived* centre shifts on every toggle. No compensating `translateX`. *Falsifier:* dies if the paths were pre-nudged — `M73 39c…` starts at the left edge of a `0 0 384 512` box; they are not.
- **D-15 · MINOR** — Three un-tokenised icon sizes in one component: **17px** (`:186`), **14px** (`:185`), **16px** (`h-4 w-4`, `:106`, `:121`). 17px corresponds to no step on any scale in the tree.
- **D-16 · MINOR** — The motion-token discipline is 3-of-5, not 5-of-5, despite the comment at `:195` claiming *"named properties + canonical token"*. `var(--ease-standard)` is used at `:166`, `:176`, `:196`; **omitted** at `:155` (`transform 0.2s, box-shadow 0.3s, border-color 0.3s` → UA default `ease`) and `:191` (`width 0.1s linear`). The token exists (`dist/styles/tokens/scheme-motion.css`: `--ease-standard: var(--motion-ease-standard)`), so the omission is drift, not absence.
- **D-17 · MINOR** — Dead declarations. `::before { transition: opacity 0.3s ease }` (`:166`) — nothing in the file ever changes `::before`'s opacity, so it never fires (and see D-2: the rainbow is therefore permanently at full strength). `border-radius: 9999px` on both pseudos (`:162`, `:171`) is redundant under `overflow: hidden` (`:148`).
- **D-18 · MINOR** — `<Transition mode="out-in">` (`:68`, `:83`) with 0.15s each way (`:196`) yields **~300ms with no glyph at all** on the primary transport control, every toggle. `mode="default"` (cross-fade) or a shorter pair would keep the control legible through its own state change.
- **D-19 · MINOR** — Microcopy drift for one control: tooltip reads `'Pause'/'Play'` collapsed (`:66`) but `'Pause animation'/'Play animation'` expanded (`:81`), while the `aria-label` is `'…animation'` in both (`:67`, `:82`). In the collapsed state the visible tooltip and the accessible name disagree — a WCAG 2.5.3 (Label in Name) smell as well as a copy inconsistency.
- **D-20 · MINOR** — The second `<style>` block (`:203-224`) is **unscoped** and ships two of the most generic class names in any design system — `.menu-popup` and `.menu-item` — app-wide, permanently (Vue injects SFC styles at module evaluation, not on mount). Grep confirms this file is the **sole** in-tree user of both (`grep -rn "menu-item\|menu-popup" src/` → only `AnimationControls.vue`), so it is a zero-reuse global with a collision surface. `:deep()` from the scoped block, or a `data-*` hook, would be exact.
- **D-21 · MINOR** — `calc(100dvw - 1rem)` (`:135`) budgets **8px per side** and measures the viewport *including* a classic scrollbar, so on a scrollbar-bearing desktop the dock can exceed the content box. Its own sibling gutter is 0/2rem (`FullscreenViewer.vue:216-221`). Moot while D-1 stands; it becomes live the moment D-1 is cured — fix in the same edit.
- **D-22 · MINOR** — Import-block formatting drift: `import {\n    Download, EllipsisVertical, } from "lucide-vue-next";` (`:5-6`) — split across two lines with a dangling `, }` — sits directly above a 106-column single-line import (`:9`). No other file read in this pass carries that shape.

## §6 — INFO

- **D-23 · INFO** — The collapsed summary surfaces the *least* dynamic value. It shows speed (`:75`), which is `1` for the overwhelming majority of sessions, and omits `caretLabel` (`:52-54`), the value that changes 60× a second — leaving position to the unlabelled, low-contrast bar of D-7. Inverting the two would cost nothing and would let D-7's bar become decorative (`aria-hidden`) rather than load-bearing.
- **D-24 · INFO** — `DropdownMenuContent` (`:109`) sets `align="end"` and `:side-offset="8"` but no `side`. The dock is bottom-anchored (`GlassDock` supports `position="fixed" … bottom-(--dock-pos)`), so the default `side="bottom"` opens the menu off-screen and the correct placement depends entirely on Reka's collision flip. It will work; it is placement-by-accident, and one explicit `side="top"` makes it placement-by-design. *Falsifier:* dies if `avoidCollisions` were disabled — it is not; it defaults on.

---

## §7 — Corpus reconciliation

**Folded, not re-invented:**
- Census **[FE §5]** break surface → §3, with this file's exact three rows enumerated and the two 7.0.0 improvements added.
- Census **C-4** ("metric-badge is 7 **files**, not 6 — budget 7 for the `./metric` cure") → confirmed: `AnimationControls.vue:10` is one of the seven, and the cure is a two-token rename (§3 B-a).
- Census **[FE §8]** ("the two rAF clocks are ungated under `prefers-reduced-motion: reduce`"; `DockBackgroundToggle` is the canonical seat) → localised at D-8: `stores/animation.ts` carries zero media-query references and *this* component is the seat that owns the play control.
- Census **§5 risk 10** ("uplift lands with no unit-test net; vitest ABSENT") → D-4 is exactly the class of defect a unit test catches and a `vue-tsc`-plus-29-Playwright net does not: a parent passing four undeclared bindings, unchanged since HEAD.
- Intake **R3-7a** (adjudicated TRUE; *"AnimationControls 4"* of the 35-callsite / 9-consumer `ui/tooltip` migration budget for F.W3) → confirmed against the live template (`:66`, `:81`, `:94`, `:105`) and **sharpened**: 2 of those 4 are malformed (D-10). The F.W3 migration should not port them as-is.
- Intake **R3-10** (six live dynamic-`:is` families, budget all six) → this component has **none**; its two branch points are `v-if`/`v-else` (`:69-70`, `:84-85`). Recorded so F.W4's exhaustiveness sweep can mark it clean rather than unexamined.

**Where the tree contradicts a prior — explicitly:** none of the priors is contradicted by this file. One prior is *extended*: census §3a's *"3 local `components/ui/` files are documented thin adapters, keep"* holds as a disposition, but `ui/tooltip/Tooltip.vue:27`'s `as-child` design is what makes D-10 possible at all — a single-component shim that silently inherits its trigger's focusability from the caller. F.W3 should carry that as a shim-hardening row (assert a focusable child, or render the trigger itself), not merely as a rename.

---

*Read-only audit. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui` treated as evidence; no product source touched in any repo. The only file written is this one.*
