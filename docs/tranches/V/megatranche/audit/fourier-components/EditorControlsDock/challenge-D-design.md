claude-opus-5[1m]

# CHALLENGE · EditorControlsDock · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EditorControlsDock.vue` (230 LOC)
**Pin under audit** `@mkbabb/glass-ui@4.0.0` installed (`web/package.json:14` `^4.0.0`; `node_modules/@mkbabb/glass-ui/package.json` → `4.0.0`) · producer HEAD `/Users/mkbabb/Programming/glass-ui/package.json` → `7.0.0`
**Method** static + source-derived only. No browser. Livable-only claims carry `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** component assumed DEFECTIVE until the tree proved otherwise. Three premises I *started* with were killed by their own falsifiers and are recorded as cleared, not as findings (§5) — L-18 runs both ways.

**Tally** 28 defects (1 BLOCKER · 12 MAJOR · 15 MINOR) · 7 superlatives · 3 cleared premises.

## Read set (whole, read-only)

Component; `web/src/components/ui/tooltip/Tooltip.vue`; `web/src/lib/colors.ts`; `web/src/style.css`; `web/src/App.vue`; `web/src/main.ts`; call-site `web/src/components/visualization/VisualizationView.vue`; `web/src/components/visualization/ContourEditorCanvas.vue`; `web/src/components/visualization/composables/useWorkspaceLoader.ts`; `web/src/stores/workspace.ts §saveContourPoints`; installed glass-ui 4.0.0 `dist/dock.js`, `dist/HoverPopover-Dpzwvc4t.js`, `dist/MetricBadge-BpC0R_Ec.js`, `dist/slider-DQ95MET2.js`, `dist/TooltipProvider-B3MkB_8P.js`, `dist/components/**/*.d.ts`, `dist/styles/**` (dock/, dock-controls/, tokens/, theme/, utilities/, typography/); `reka-ui/dist/{Tooltip,HoverCard}/*`; `lucide-vue-next/dist/esm/Icon.js`; producer 7.0.0 `src/components/dock/index.ts`, `src/components/dock/DockControl.vue`, `src/components/popover/Popover.vue`, `src/components/metric/`.

## Corpus folded (not re-invented)

- `formation/fourier/lane-frontend.md:89` (component row), `:311-314` (the four glass import lines), `:472-475` (the break-surface table rows that name THIS file).
- `formation/fourier/CENSUS-2026-08-03.md:102-104` (the uplift break surface), `:185-186` (the atomic tri-package transaction), `:63` (C-4 metric-badge is 7 *files*).
- `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` **R3-7a** (EditorControlsDock = 10 of the 35 Tooltip callsites — the largest single consumer; F.W3 budget) and **R3-10** (`EditorControlsDock.vue:144` is one of the two dynamic-`:is` families dropped between registries; F.W4 budget). Both TRUE in the live tree at the lines cited; I confirm `:144` reads `<component :is="showGhost ? Eye : EyeOff" :size="20" />` verbatim. **No contradiction with the tree on any intake row touching this file.**

---

# §1 · BLOCKER

## D-1 · The magnet slider and BOTH overlay toggles are keyboard-inoperable — three of ten dock controls fail WCAG 2.1.1 (Level A)

**Severity** BLOCKER
**Provenance** `EditorControlsDock.vue:103-129` (magnet `HoverPopover` → `Slider`), `:134-154` (overlay `HoverPopover` → two `DockIconButton`s) → `glass-ui/dist/HoverPopover-Dpzwvc4t.js` (bare reka `HoverCardRoot`/`Trigger`/`Content`, no click or keyboard path) → `reka-ui/dist/HoverCard/HoverCardContentImpl.js:139-140` and `reka-ui/dist/HoverCard/HoverCardTrigger.js:48-49`.

The mechanism is two independent locks, either of which alone is fatal:

1. **Content is stripped out of the tab sequence at mount.** `HoverCardContentImpl.js` `onMounted`:
   ```js
   const tabbables = getTabbableNodes(contentElement.value);
   tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
   ```
   Vue mounts children before parents, so reka's `SliderThumb` (`tabindex=0`) and both `<button>` toggles exist inside `contentElement` when this runs and are rewritten to `tabindex="-1"`.
2. **Focusing away closes the panel.** `HoverCardTrigger.js`: `onFocus: rootContext.onOpen()`, `onBlur: rootContext.onClose()`. Content is portaled to `document.body`, so DOM tab order after the trigger is the *next dock button*, not the panel. Tabbing forward blurs the trigger → panel closes.

Net: `magnetRadius`, `showGhost`, and `showImageOverlay` have **no keyboard operation path at all** on this surface. `showGhost`/`showImageOverlay` are also reachable from `FullscreenViewer` (`VisualizationView.vue:282-285`), but `magnetRadius` is reachable **only** here (`VisualizationView.vue:82-85` — the sole writer is this dock's `update:magnetRadius`), so magnet radius is keyboard-unreachable application-wide.

**Falsifier** — the finding dies if any one holds: (a) `getTabbableNodes` returns empty at mount because the Slider/buttons render later than `HoverCardContentImpl`'s `onMounted` — refuted by Vue's child-before-parent mount order and by the fact that reka's own comment scopes this as the *intended* HoverCard preview semantic; (b) `glass-ui` re-sets `tabindex` after mount — grep of the entire published `dist/` for `tabindex` returns **absent** in `HoverPopover-Dpzwvc4t.js`; (c) some ancestor supplies an alternate keyboard route — none exists (`VisualizationView.vue:239-247` binds no keyboard handler; `ContourEditorCanvas.vue:169-173` binds only ⌘Z / ⌘⇧Z / ⌘Y for undo/redo).

**F.W1 uplift disposition — CURED.** `lane-frontend.md:474` routes `./hover-popover` → `<Popover>` at glass 5.0.0. Producer `src/components/popover/Popover.vue:11,18,63` ships `PopoverTriggerMode = "click" | "hover"` with `usesHoverRoot = props.trigger === "hover" && !isCoarsePointer` over reka `PopoverRoot` (a real focus-managed surface). Migrating to `<Popover trigger="click">` retires both locks. **This is the single highest-value row in the whole break surface for this file — cite it when F.W1 sequences the popover cure ahead of the cosmetic sweep.**

---

# §2 · MAJOR

## D-2 · The magnet slider's fourier-red retint is 100 % dead CSS, and the variant it targets paints no thumb at all

**Severity** MAJOR
**Provenance** `:122-125` (`class="magnet-slider-track"`, `:style="{ '--track-color': VIZ_COLORS.fourier }"`), `:222-229` (the four `--slider-scrub-*` declarations).

```
$ grep -rho -- "--slider-[a-z0-9-]*" node_modules/@mkbabb/glass-ui/dist | sort -u
--slider-range-bg  --slider-range-blur  --slider-range-shadow
--slider-thumb-bg  --slider-thumb-bg… (border-color, shadow, spring, size)
--slider-track-bg  --slider-track-height
```
`--slider-scrub-range-bg`, `--slider-scrub-range-bg-hover`, `--slider-scrub-thumb-bg`, `--slider-scrub-thumb-bg-hover` **do not exist anywhere in glass-ui 4.0.0** — not in `dist/styles/**`, not in `dist/glass-ui.css`, not in `dist/*.js`. They are the vocabulary of the retired `variant="glass-scrubber"` recipe that `lane-frontend.md`'s prior-art diff renamed to `variant="standard"` in the 3.1→4.0 hop ("9 − variant=\"glass-scrubber\" / 9 + variant=\"standard\"", CENSUS prior-art block) — the *class* rename landed, the *custom-property* rename did not.

The uncommitted working tree proves the omission at this exact file. `git diff web/src/components/visualization/EditorControlsDock.vue` is two lines, both from that sweep:
```diff
-  <MetricBadge :amount="magnetRadius" size="sm" />
+  <MetricBadge :value="magnetRadius" size="sm" />
-  variant="glass-scrubber"
+  variant="standard"
```
The sweep touched `:116` and `:113` and stopped. `:222-229` — the `--slider-scrub-*` block the retired variant owned, and the `/* A.W2.c — glass-scrubber per-instance retint hook */` comment that names it — were left behind, four lines below the line that was edited. (This diff is pre-existing, not mine; it is the same WT diff the CENSUS measures the 3.1→4.0 rate from.)

Compounding: the live paint is `.slider-range { background: color-mix(in oklab, var(--slider-range-bg, var(--primary)) 88%, transparent) }` and `.slider-thumb { width: 0; opacity: 0 }` (`dist/glass-ui.css`, variant `standard`; documented at `dist/components/ui/slider/index.d.ts` — "NO VISIBLE THUMB AT ALL"). So the magnet slider today paints `--primary`, and the two `--slider-scrub-thumb-*` lines would be dead even under the correct names.

**Consequence** the one control in the dock that carries a continuous value has no colour relationship to the magnet glyph it belongs to (`:106` tints that glyph `--viz-fourier`). Six lines of CSS + one reactive inline binding pay for nothing.
**Falsifier** produce any selector in glass-ui 4.0.0 that reads `--slider-scrub-*`. Exhaustive `grep -rn` over the published package returns zero. Cure = `--slider-range-bg` (2 lines, hover leg deletable — the live rule has no hover variant).

## D-3 · Brand-red and saturated-hue interactive registers violate glass-ui 4.0.0's own R3-6 doctrine, twice-stated in the installed pin

**Severity** MAJOR
**Provenance** `:199-201` (`.is-amber`/`.is-sky`/`.is-rose` → `--btn-hover-color`), `:203-209` (`.is-save` → `--viz-fourier` hover colour *and* a 15 % `--viz-fourier` plate), `:106` (`text-viz-fourier` as the magnet ON state).

The installed pin states the law twice, verbatim:

> `dist/styles/tokens/offsets-sizing.css:410-427` — "**R3-6 retired the brand-red (`--viz-fourier`) interactive register** (hover/active/selected/pressed) in favour of the iOS-glassy luminance-lift … red survives only as static brand INK (the ℱ wordmark / data-viz strokes / the gold-CTA family), **never as an interactive register**."

> `dist/styles/dock-controls/touch-floor.css` (AZ.W-REGISTER-IOS block) — "the demo no longer overrides it to `--viz-fourier` (the brand red survives only as static wordmark/viz/CTA ink)."

`--btn-hover-color` *is* live (`dist/styles/dock-controls/icon-button.css:85`), so these declarations paint — that is precisely the problem: the component is the surface the producer's own migration note describes as retired. `.is-save:hover` additionally replaces the glass hover fill (`--dock-icon-hover-bg` → `--dock-control-hover-bg`) with a flat saturated tint, undoing AX.W45 DK2 ("the icon-button active no longer stamps a solid cream rectangle over the dock glass").

**Falsifier** the finding dies if `--btn-hover-color` is dead at this pin (it is not — `icon-button.css:85`, `triggers.css:69`) or if R3-6 scoped the retirement to the *selected* state only (it does not — the parenthetical enumerates "hover/active/selected/pressed"). Cure = `--dock-selected-accent` / `--dock-control-hover-bg`, the documented single retint knobs.

## D-4 · `.dock-spacer` is structurally inert under `fit-content` — the authored right-hand status/commit cluster never separates

**Severity** MAJOR
**Provenance** `:56` (`fit-content` on `<GlassDock>`), `:72` (`class="flex items-center gap-2 w-full"`), `:162` (`<span class="dock-spacer" />`), `:186-188` (`flex: 1`) → `dist/styles/dock/layers.css:318-324`.

```css
.glass-dock.expanded:not(.fit-content):not([data-morphing]) .dock-layers { width: 100%; }
.glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100%; }
```
With `fit-content` present, neither rule applies: `.dock-layer--full` shrink-wraps. The row is `w-full` of a shrink-wrapped parent whose max-content contribution from an empty `flex: 1 1 0%` span is **0**. Free space is therefore 0 and the spacer resolves to 0 px.

**Consequence** the ONE intentional asymmetry in a 10-control row — the "status + commit" zone (`{{ pointCount }} pts` + Save) pushed to the far right, away from the tool cluster — is nullified. The badge and Save sit `gap-2` from Reset exactly like every tool, so the layout reads as one undifferentiated 10-item strip. This is the Aristotelian proportion failure of the component: the parts carry no hierarchy of magnitude.
**Falsifier** `document.querySelector('.dock-spacer').getBoundingClientRect().width` — if > 0 at rest expanded, the finding is dead. Transient exception acknowledged: during the FLIP morph `--dock-morph-size` sets an explicit px width (`dock/layers.css` AX.W01 note), so the spacer *may* flex for the duration of the spring only. `UNPROVEN-NEEDS-LIVE` on the transient; the at-rest claim is decidable from the two selectors above.

## D-5 · `.dock-badge` measures 3.32 : 1 in light mode — WCAG 1.4.3 AA fail on the dock's only text

**Severity** MAJOR
**Provenance** `:190-196` — `@apply text-base` + `color: color-mix(in srgb, var(--foreground) 50%, transparent)`; rendered at `:61` and `:163`.

Tokens: `--foreground: hsl(24 10% 10%)`, `--background: var(--neutral-0) = hsl(40 30% 98%)` (`dist/styles/tokens/color-radius.css:40,57-58`). 50 % composite over background → **3.32 : 1**. Size is `text-base` = 1 rem = 18 px on `<768 px` / 16 px on `≥768 px` (`web/src/style.css:40-50`) — normal text either way (large-scale needs ≥ 24 px, or ≥ 18.66 px **bold**), so the threshold is 4.5 : 1. Dark arm computes 4.52 : 1 — passes by 0.02.

The system already did this arithmetic: `--muted-foreground: var(--neutral-5)` and `color-radius.css:45` annotates it in-token — *"L 40 — muted text (warm, C≈0.043; **WCAG AA: 5.21 : 1 vs page** / 4.90 : 1 vs muted)"*. I reproduce 5.21 : 1. The cure is one token substitution the library ships pre-measured.

**Falsifier** the dock floats on `.controls-overlay` over the epicycle canvas with `autoLuminance` default-true (`useDockShellProps` → `DockProps.autoLuminance`), so the true composite backdrop is the dock's glass plate over that canvas, not `--background`. If the plate resolves materially darker than L98 in light mode the ratio moves. Measure the computed colour of `.dock-badge` against its painted backdrop. The 3.32 figure is the light-page bound and is the correct order of magnitude — the plate tiers (`--glass-bg-quiet/-resting`) are all *lighter-over-light*, which moves the ratio **down**, not up.

## D-6 · The saved-state Check glyph measures 2.21 : 1 in light mode — WCAG 1.4.11 non-text-contrast fail

**Severity** MAJOR
**Provenance** `:210-212` (`.is-save.saved { color: var(--success) }`), rendered `:64`, `:167`. `--success: oklch(0.720 0.192 149.5)` light / `oklch(0.805 0.186 151.6)` dark (`tokens/color-radius.css:273`, `tokens/dark-arm.css:144`).

Computed vs `--background`: **light 2.21 : 1** (threshold 3 : 1 for a meaningful graphical object), **dark 11.54 : 1**. The Check *is* the sole success signal on this surface, so it is a meaningful graphic, not decoration. 1.4.1 (Use of Colour) is satisfied — the glyph itself swaps `Save → Check` — but 1.4.11 is not.

**In-repo precedent for the cure.** `web/src/style.css:113-127` already carries exactly this remedy for exactly this reason: *"D.W4.d — light-mode `--viz-amber` darken (axe contrast carry). glass-ui ships light `--viz-amber` at hsl(35 70% 42%) ≈ 3.54 : 1 against `--background` — fails WCAG AA … darkens to hsl(35 76% 35%) ≈ 4.6 : 1"*. A `--success` carry belongs in the same block, and — per standing law — in the same glass-ui BH relay.
**Falsifier** same backdrop caveat as D-5 (`UNPROVEN-NEEDS-LIVE` on the exact composite); the *direction* is not in doubt — a vivid mid-lightness green on a warm near-white plate cannot reach 3 : 1.

## D-7 · Magnet ON/OFF is signalled by colour alone — WCAG 1.4.1, Level A

**Severity** MAJOR
**Provenance** `:106` — `<Magnet :size="20" :class="magnetRadius > 0 ? 'text-viz-fourier' : ''" />`.

The *only* difference between magnet-off and magnet-on is the glyph hue. No `.is-active`, no `aria-pressed`, no plate, no shape change, no text. Contrast is fine (`--viz-fourier` 4.56 : 1 light / 6.75 : 1 dark) — hue is not the failure, **hue-as-sole-channel** is.

The component is internally inconsistent about this: the two overlay toggles 20 lines below use `.is-active` (`:143`, `:148`), which the library paints as a glass-capsule plate (`dock-controls/icon-button.css:109-115` — `background/color/scale/border/shadow` from the `--dock-active-*` ladder). Two toggle-ish controls, two different state vocabularies, in one dock.
**Falsifier** find a second, non-colour channel on the magnet trigger. There is none in `:105-108`; the `aria-label` is static.

## D-8 · The overlay toggles carry visual state but no `aria-pressed` — AT users get no state, and the library's own hook is one attribute away

**Severity** MAJOR
**Provenance** `:143` (`:class="{ 'is-active': showGhost }"`), `:148` (`:class="{ 'is-active': showImageOverlay }"`).

`dock-controls/icon-button.css:109` — the library's active selector is
```css
&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])
```
i.e. `aria-pressed="true"` is *already* an accepted paint hook. Adding `:aria-pressed="showGhost"` / `:aria-pressed="showImageOverlay"` supplies the missing semantic **and** keeps the paint, at which point `.is-active` becomes deletable. Today a screen reader announces "Contour trace, button" with no on/off state.

**F.W1 uplift disposition — CURED, and it becomes the default.** Producer 7.0.0 `DockControl.vue:38-52,101-116` makes `active` a tri-state discriminant that *stamps* `aria-pressed` (`"aria-pressed": String(props.active)` plus `data-active`), with an explicit `undefined` third state so a nav control never mis-announces as an off toggle. `lane-frontend.md:475` routes `DockIconButton` → `<DockControl>`.
**Falsifier** show that reka or glass injects `aria-pressed` from `.is-active`. Neither does — `.is-active` is a pure CSS class in `dist/dock.js`'s `DockIconButton` render.

## D-9 · The local `.dock-separator` shadows a library primitive that ships in this very pin, with divergent geometry, tint, and rhythm

**Severity** MAJOR
**Provenance** `:84`, `:131` (`<span class="dock-separator" />`), `:179-184` (the local recipe) → `dist/dock.js` export tail (`at as DockSeparator`), `dist/components/custom/dock/index.d.ts`, `dist/styles/dock/layer-group.css:35-41`.

`<DockSeparator>` **is exported from `@mkbabb/glass-ui/dock` at 4.0.0** — confirmed in the runtime export list, not merely the types. Its paint:

| | library (`layer-group.css:35-41`) | component (`:179-184`) | delta |
|---|---|---|---|
| height | `var(--dock-separator-height)` = `calc(var(--dock-h, --size-icon-btn) * 0.5)` → **1.25 rem**, rides `--dock-scale` | `1.5rem`, fixed | +20 %, and **desyncs at any `--ui-scale` ≠ 1** |
| background | `var(--surface-tint-15)` | `color-mix(in srgb, var(--foreground) 20%, transparent)` | +33 % weight; and the dark arm re-bases `--surface-tint-15` onto `hsl(48 12% 96%)` (`tokens/dark-arm.css:260`) while the local mix stays on `--foreground` → a *different dark-mode hairline* from every other dock in the constellation |
| margin | `0 0.375rem` | none | see below |
| flex-shrink | `@apply flex-shrink-0` | `flex-shrink: 0` | equivalent |

The margin drop is the design-visible one. Library rhythm around a group break = `0.5rem` gap + `0.375rem` margin ‖ 1 px ‖ `0.375rem` + `0.5rem` ≈ **1.81 rem trough**. Component = `0.5rem` ‖ 1 px ‖ `0.5rem` ≈ **1.06 rem** — a **42 % narrower** group break. Combined with D-18 (the row gap widened to `0.5rem` from the family's `0.375rem`), the intra-group gap and the inter-group break converge to near-indistinguishable: the separator hairline is doing all the grouping work alone.

Cascade note: the component's `<style scoped>` is **unlayered**, and unlayered author declarations outrank every `@layer` (CSS Cascade 5) regardless of specificity — so the local values win over `@layer components` deterministically. This is not a specificity accident that could tip either way; it is a hard override.

**Falsifier** show `.dock-separator` unpainted at 4.0.0 (my own first pass believed this — `grep` of `dist/glass-ui.css` returns 0 — and it was **wrong**: the paint lives at `dist/styles/dock/layer-group.css:35`, reached via the `./styles` cascade root, which is what the app imports at `style.css:3`). Or show `DockSeparator` absent from the 4.0.0 runtime — it is present.

## D-10 · Every `:size` on a dock glyph is inert; the authored 18/20 px collapsed-vs-expanded ladder never paints, and the collapsed row pairs a hard-18 px glyph with a 20–26 px one

**Severity** MAJOR
**Provenance** `:60`, `:63-66` (collapsed, `:size="18"`), `:74-169` (expanded, `:size="20"` ×11) → `lucide-vue-next/dist/esm/Icon.js` (`width: size, height: size` as SVG **attributes**) → `dist/styles/dock-controls/icon-button.css:132-135`:
```css
.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); height: var(--dock-icon-glyph, 1.25rem); }
```
CSS `width`/`height` beat SVG presentational attributes. `icon-button.css:124-131` states the contract: *"A consumer passing an explicit lucide size **class** still WINS (utility layer > component layer)"* — a **class**, not the `size` prop. So for every glyph inside a `DockIconButton`, `:size` is dead.

Resolved geometry (`tokens/offsets-sizing.css:136,142,264,287`; `dock/density.css:82-112`; `dock/overflow.css:219-250`):

| pointer | `--dock-scale` | `--dock-icon-glyph` | root px | painted glyph |
|---|---|---|---|---|
| fine | 1 | `1.25rem` | 16 px (`≥768px`) | **20 px** |
| coarse | 1.5 × 0.78 ≈ 1.17 | `1.4625rem` | 18 px (`<768px`) | **≈ 26 px** |

The `Wand2` at `:60` is the one glyph **outside** a `DockIconButton`, so its `:size="18"` *does* paint — at a hard 18 px, which never scales. Result in the collapsed pill: an 18 px leading wand beside a 20 px Save glyph on desktop, and beside a **26 px** Save glyph on touch, inside a 53 px button. The divergence grows with `--ui-scale` and is exactly inverted from authorial intent (the author asked for the collapsed glyphs to be *smaller*, `18` vs `20`).

**Falsifier** show `--dock-icon-glyph` unset so the `1.25rem` fallback and `:size="20"` coincide — it is set at `offsets-sizing.css:287` and re-resolved at `dock/overflow.css:250` for the coarse register. Or show lucide emitting inline `style` rather than attributes — `Icon.js` spreads `width: size, height: size` into the `h("svg", {...})` props object, which Vue serialises as attributes for unknown-to-SVG-DOM props.

## D-11 · Neither popover opens on touch — `excludeTouch` gates the only trigger

**Severity** MAJOR (`UNPROVEN-NEEDS-LIVE` on the focus-on-tap residual)
**Provenance** `:103-108`, `:134-139` → `reka-ui/dist/HoverCard/HoverCardTrigger.js:46-47` + `reka-ui/dist/HoverCard/utils.js`:
```js
function excludeTouch(eventHandler) {
  return (event) => event.pointerType === "touch" ? void 0 : eventHandler();
}
```
`onPointerenter` and `onPointerleave` are both wrapped; `onFocus`/`onBlur` are not. The trigger is a `<button>` with no `@click`. So on a coarse pointer the panel opens **only** if the engine focuses a `<button>` on tap.

This is the residual: Safari on macOS historically does not focus `<button>` on click; iOS/Chromium behaviour has moved over versions. Marked `UNPROVEN-NEEDS-LIVE` — SS-13 should tap both triggers on iOS Safari and Android Chrome. Note that even in the engines where it *does* open, D-1's tabindex strip still applies, so the panel is pointer-drag-only.

The app is explicitly mobile-targeted (`web/src/style.css:38-50` mobile-first root sizing; `vite.config.ts` LAN host per project memory), which raises this above theoretical.
**F.W1 uplift disposition — CURED.** Producer `popover/Popover.vue:63` — `usesHoverRoot = props.trigger === "hover" && !isCoarsePointer` — a hover-configured Popover *automatically* degrades to the click root on coarse pointers. The producer solved this exact defect one major after the installed pin.

## D-12 · An async network commit with no pending state — the Save button is clickable throughout, and the dock carries no error affordance

**Severity** MAJOR
**Provenance** `:32` (`isSaved: boolean` — the entire state surface), `:63`, `:166` (`@click="emit('save')"`, no guard) → `VisualizationView.vue:92-96` (`onEditorSave`, `await store.saveContourPoints(...)`) → `stores/workspace.ts:263-282`.

`saveContourPoints` calls `beginCompute()`, `await api.saveContour(...)`, and **rethrows** on failure. The dock is told only `isSaved`, which is `false` during the flight and `false` after a failure — the two are indistinguishable from "never saved". Nothing disables the button while in flight, so a slow network invites a double-submit against an endpoint that mutates `contour` and nulls `epicycleData`/`basesData`.

The store already exposes the two missing inputs — `computing` (used at `VisualizationView.vue:121,273`) and `error`. The dock binds neither.

**Falsifier, partially successful — and it downgrades this from BLOCKER.** My first pass held that a failed save is *silent*. It is not: `composables/useWorkspaceLoader.ts:124-133` watches `store.error` and toasts it, and `VisualizationView.vue:50` mounts that composable. So the user *is* told, remotely, via `<Toaster />` (`App.vue:31`). What survives: (a) no pending affordance, (b) no double-submit guard, (c) the *control* never changes state, so the feedback is spatially divorced from the action. Also surviving as a code-quality note outside this axis: `onEditorSave` does not `catch`, so the rethrow becomes an `unhandledrejection` from a Vue event handler.

## D-13 · The unlayered `.is-save` background kills the library's iOS press-darken on the dock's commit control

**Severity** MAJOR
**Provenance** `:203-206` (`.is-save { background: color-mix(in srgb, var(--foreground) 6%, transparent) }`) vs `dist/styles/dock-controls/icon-button.css:93-96`:
```css
&:active:not(:disabled) { background: var(--dock-control-press-bg); scale: var(--scale-press-dock); }
```
The library rule sits in `@layer components`; the component's declaration is unlayered and therefore wins unconditionally. The `scale` press survives (different property), the **darken** does not. AZ.W-REGISTER-IOS introduced the darken precisely because *"Press today scales only (`--scale-press-dock`, C4-INV-4); iOS lands 'darken + shrink'"* (`tokens/offsets-sizing.css:433-441`) — so the one button in this dock that commits work to the server is the one button that lost half its press feedback.

**Falsifier** DevTools: hold pointer-down on Save and read computed `background-color`; if it resolves to `--dock-control-press-bg` the finding is dead. Static cure: scope the base fill to `:not(:active)`, or move it onto `--dock-icon-hover-bg` / a layered block.

---

# §3 · MINOR

## D-14 · `.is-save`'s base fill is byte-identical to a shipped token
`:204` `color-mix(in srgb, var(--foreground) 6%, transparent)` ≡ `--surface-tint-6` (`tokens/color-radius.css:140`). A pure token bypass — and it forfeits the dark-arm re-base the ladder performs (`dark-arm.css`). Same class of bypass as D-9's tint. **Falsifier** show the ladder rung differs — it does not, the definitions are character-identical.

## D-15 · Two numeral faces and a 45–64 % size delta for the same kind of datum, in one dock
`:191` `.dock-badge { @apply text-base }` inherits the body face — `html,body { @apply … font-serif }` (`style.css:20`) → `--font-serif: var(--font-stack-text)` = **"Plus Jakarta Sans"** (`theme/bridges.css:68` → `tokens/scheme-motion.css:43`). `:113` `<MetricBadge size="sm">` resolves `text-mono-micro` = **Fira Code @ `--type-micro: 0.6875rem` = 11 px** (`typography/utilities.css:50-55`, `typography/scale.css:87`). So: a 16–18 px sans integer and an 11 px mono integer, both small counts, both in the same dock.
*Premise correction:* I first assumed the badge inherits Computer Modern (the app remaps `--font-sans` at `style.css:13-15`). It does not — the body applies `font-serif`, which glass owns. The two-face finding survives the correction; the face names changed.

## D-16 · The magnet label row hand-rolls an affordance MetricBadge already ships
`:111-114` builds `justify-between` + a raw `<span class="text-xs font-medium">Magnet</span>` + a bare `<MetricBadge :value>`. `MetricBadge` ships `label` + `labelPosition="inline"` (`metric-badge/MetricBadge.vue.d.ts`), which renders the annotation as a sibling with the tracked-uppercase-mono contract (`font-mono uppercase text-muted-foreground/80` + `letter-spacing: 0.18em`, `utilities/components.css:171-173`) and baseline-aligns the pair as one phrase (`.metric-badge--label-inline`, `:86-93`). The hand-roll loses the contract and produces D-15's two-face row.

## D-17 · A static readout that advertises itself as clickable
`:113` — `MetricBadge`'s root class list hardcodes **`cursor-pointer`** plus `focus-visible:outline-2` (`dist/MetricBadge-BpC0R_Ec.js`, root `cn(...)`), and `utilities/components.css:50-62` gives it `:hover { scale: 1.02 }` / `:active { scale: 0.96 }`. Here it is a pure readout of the adjacent slider's value, with no handler and no `tabindex`. Pointer cursor + grow-on-hover, 4 px from a real control, is a false affordance. Library wart; consumer-curable via `--metric-badge-hover-scale: 1` / `--metric-badge-press-scale: 1` and a `cursor-default` class.

## D-18 · The row gap overrides the dock family rhythm and does not ride `--dock-scale`
`:59`, `:72` `gap-2` = a fixed `0.5rem`. The family token is `--dock-layer-gap: calc(var(--dock-density-comfortable-gap, 0.375rem) * var(--dock-scale))` (`dock/density.css:105-107`; density resolves to `"comfortable"` by default — `useDockShellProps` compiled: `e.density ?? "comfortable"`). So the gap is 33 % wide of family at 1× and *stays* 8 px while every control grows to ~53 px on touch. See D-9 for the compounded group-break collapse.

## D-19 · `@mousedown.stop @pointerdown.stop` are inert and redundant
`:124-125`. `GlassDock` listens `onPointerdownCapture` and `onClickCapture` (`dist/dock.js` GlassDock render) — **capture** phase runs top-down *before* the target, so a bubble-phase `stopPropagation()` cannot suppress it. The dock's only bubble-phase pointer listener is `onTouchstart`, which `pointerdown.stop` does not touch. The real mechanism is already in place twice over: `Slider`'s `keepDockOpen` **defaults true** (`ui/slider/Slider.vue.d.ts` — "Default: true") and `HoverPopover keep-dock-open` is set at `:103`.

## D-20 · `magnetModel` clamps on write only
`:49-52` — the setter clamps to `[0,10]`, the getter passes `props.magnetRadius` through raw. An out-of-range prop renders an out-of-range slider. Asymmetric guards on a two-way adapter; either both ends or neither.

## D-21 · "N pts" — undefined abbreviation, no pluralisation
`:61`, `:163`. Renders "1 pts". The abbreviation is never expanded anywhere on the surface, and it is the accessible reading too (no `aria-label`, no `<abbr>`). Two occurrences, one string.

## D-22 · The tooltips omit the shortcuts the editor actually binds
`:73-82` — "Undo" / "Redo", while `ContourEditorCanvas.vue:169-173,210` binds ⌘/Ctrl+Z, ⌘/Ctrl+⇧+Z and ⌘/Ctrl+Y on `window`. Both affordances for showing them exist and are unused: the local shim exposes a `#content` slot for rich bodies (`ui/tooltip/Tooltip.vue:35`), and `HoverPopover`'s own docstring names "kbd hints" as its richer-content case.

## D-23 · Tooltips die on exactly the buttons whose disabled state needs explaining
`:74`, `:79`, `:97` — `:disabled` on `DockIconButton` emits the **native** `disabled` attribute (`DockIconButton.vue.d.ts` — `type` is a `ButtonHTMLAttributes`, and `dock.css:109-113` styles `.dock-icon-button:disabled`). Browsers do not dispatch mouse/pointer events to disabled form controls, and disabled buttons are not focusable — while reka's `TooltipTrigger` opens on exactly `pointermove` and `focus` (`Tooltip/TooltipTrigger.js:36-42`). So "Undo" / "Redo" / "Delete point" are unreachable precisely when greyed out. **Falsifier** hover a disabled Undo and see a tooltip. **F.W1 uplift disposition — CURED:** producer `DockControl.vue:105-116` stamps **`aria-disabled` alone, never the native attribute** ("PRESENT-but-disabled — FOCUSABLE via `aria-disabled`"), which restores both the pointer and the focus path.

## D-24 · A ten-control toolbar with no accessible group name and no `role`
`:56` passes nothing. `GlassDock`'s root has no landmark and no `aria-label` of its own (`dist/dock.js` render — the outer `.glass-dock-frame` and inner `.glass-dock` carry `class`/`data-*` only), and it spreads `$attrs` onto `.glass-dock`, so `aria-label="Contour editor controls"` (and, if wanted, `role="toolbar"`) fall straight through from the consumer. One attribute.

## D-25 · Popover triggers announce as plain buttons
`:105`, `:136` — `aria-label` is present (good), but no `aria-haspopup="dialog"` and no `aria-expanded`. reka's `HoverCardTrigger` sets only `data-state` (`HoverCardTrigger.js:42`). A screen-reader user is told there is a button and nothing about what it reveals. Compounds D-1/D-11.

## D-26 · `.dock-spacer` is re-declared identically to the library's
`:186-188` `flex: 1` ≡ `layer-group.css:65` `.dock-spacer { @apply flex-1 }` (= `flex: 1 1 0%`). Dead duplication. (Whether it *does* anything is D-4.)

## D-27 · `text-viz-fourier` blocks the library's hover colour on the magnet glyph alone
`:106`. Tailwind v4 orders `@layer theme, base, components, utilities` — the utility beats `icon-button.css:85`'s `&:hover { color: var(--btn-hover-color, var(--foreground)) }` in `@layer components`. So when magnet is ON, hovering its button changes nothing, while every sibling brightens. A silent inconsistency in the hover register, one of ten.

## D-28 · No empty state
`:87-95`, `:156-160` — at `pointCount === 0`, Delete correctly disables (`canDelete`), but **Smooth, Simplify, and Reset stay enabled** and no-op. The parent already computes the predicate (`editorState.pointCount`, `VisualizationView.vue:79,241`); the dock already receives it (`:28`). Three enabled controls that cannot act is the one state the state-machine forgot.

---

# §4 · SUPERLATIVES (L-18 both ways)

**S-1 · Zero component-authored motion, on a surface that is nothing but motion.** The file declares no `@keyframes`, no `transition`, no `animation` — every moving part (dock morph, child stagger, hover lift, press spring) is library-owned and rides the shipped nuanced PRM gate at `dist/styles/utilities/a11y-overrides.css:6-31`, which strips `transform`/`scale` out of `transition-property` under `prefers-reduced-motion: reduce` while preserving opacity/colour fades. Nothing here to gate, nothing here ungated. *Falsifier:* grep the `<style scoped>` block for `transition|animation|@keyframes` — zero hits. Contrast the app's own `style.css:83-96`, which had to hand-write a PRM escape for its tab animation.

**S-2 · `font-variant-numeric: tabular-nums` on the one number that changes constantly.** `:194`. The point count mutates on every add/delete/drag (`ContourEditorCanvas.vue:127-128`); proportional figures would jitter the whole right-hand cluster mid-gesture. This is the correct, unglamorous detail, and the author reached for it unprompted.

**S-3 · `keep-dock-open` on both popovers — exact conformance with a non-obvious contract.** `:103`, `:134`. `HoverPopover`'s `keepDockOpen` hooks the ref-counted `dockKeepOpen`/`dockRelease` provide/inject pair and additionally stamps `data-glass-dock-portal` + `data-glass-dock-owner` so the dock's click-away treats the portaled panel as inside (`HoverPopover.vue.d.ts` J.W3.B block; `HoverPopover-Dpzwvc4t.js` watcher). Without it the 2000 ms collapse timer would eat the panel mid-scrub. Worth noting against the constellation baseline: producer `dock/index.ts` (7.0.0) records that fourier still has **two** `inject<...>("dockKeepOpen", null)` sites using the retired string keys (`SliderControl.vue`, `GlassTimeline.vue`) which "silently no-op … a functional regression on scrub gestures". **This component is not one of them** — it uses the prop, correctly.

**S-4 · The local separator uses the exact class the library primitive emits.** `:84`/`:131`/`:179` use `dock-separator`, which is precisely what `<DockSeparator>` renders (`dist/dock.js` — `class: N(["dock-separator", …])`). So the D-9 cure is a delete-and-replace with **zero selector churn** in any sibling stylesheet. Accidental or not, it is the shape that makes the fix cheap.

**S-5 · `.is-active` is the library's documented hook, and both icon-only triggers are labelled.** `:143`, `:148` reach for the right class rather than inventing `.active-magnet` or a `:style` override — `icon-button.css:109` accepts it first in the `:is()` list. And `:105`/`:136` both carry `aria-label` on icon-only buttons, which is the failure mode this axis usually finds. The gap in D-8 is the ARIA half only; the CSS half is correct.

**S-6 · Touch targets clear 44 px — verified, not assumed.** I went looking for a target-size failure and did not find one. `dock/overflow.css:219-239` lifts `--dock-control-floor: var(--dock-touch-target, 2.75rem)` under `@media (pointer: coarse)`, and every density rung wraps its control size in `max(calc(base * --dock-scale), var(--dock-control-floor, 0px))` (`dock/density.css:89-96`), so in-dock controls resolve ≥ 44 px on touch (≈ 53 px at the comfortable rung). WCAG 2.5.5 AAA is met by construction. Recorded as a cleared premise so no downstream reviewer re-spends the budget.

**S-7 · "Delete point" is exactly true.** `:96` says *point*, singular; `ContourEditorCanvas.vue:127` sets `canDelete: selectedIdx.value !== null` — single selection, one point. The label neither over- nor under-promises. Trivial, and most components get it wrong.

---

# §5 · Premises killed by their own falsifiers (recorded, not charged)

1. **"`.dock-separator` is unpainted at 4.0.0."** `grep` of `dist/glass-ui.css` returns 0 and I nearly filed the local block as a *virtuous* workaround for a producer gap. The paint is at `dist/styles/dock/layer-group.css:35-41`, reached through the `./styles` cascade root the app imports at `style.css:3`. Finding inverted into D-9.
2. **"A failed save is silent."** Refuted by `useWorkspaceLoader.ts:124-133` + `VisualizationView.vue:50` — `store.error` is watched and toasted. D-12 downgraded BLOCKER → MAJOR and rewritten to the surviving claims (no pending state, no double-submit guard, feedback divorced from the control).
3. **"The badge inherits Computer Modern Serif."** The app remaps `--font-sans` (`style.css:13-15`) but the body applies `font-serif` (`style.css:20`), which resolves to glass's `--font-stack-text` = Plus Jakarta Sans. D-15 survives with corrected face names. *(Separately: that `font-sans`-remapped-but-`font-serif`-applied mismatch is an app-level finding for whoever audits `style.css` — out of scope here, flagged for the frontend lane.)*

Additionally checked and cleared, no defect: disabled-control contrast (2.50 : 1 light — WCAG explicitly exempts inactive components, 1.4.3/1.4.11); the collapsed `text-foreground/50` wand glyph (3.32 : 1 vs a 3 : 1 non-text threshold — passes); WCAG 2.5.3 Label-in-Name on the magnet slider ("Magnet radius" contains the visible "Magnet" — passes); text-resize at 200 % on the `width: 9rem` popover (`:218` — rem-based, scales with root, no clip); `TooltipProvider` presence (`App.vue:23`, `delay-duration=400` — reka's `injectTooltipProviderContext` is satisfied).

---

# §6 · Uplift ledger for F.W1 — every surface in this file, break or improve

Break rows keyed to `lane-frontend.md:472-475` and `CENSUS-2026-08-03.md:102-104`. All four of this file's glass imports are on the break surface; it is the densest single-file exposure in the fourier tree alongside `CanvasControlsDock.vue`.

| Line | Surface | 4→7 | Effect |
|---|---|---|---|
| `:5` `MetricBadge` | `./metric-badge` **REMOVED** → `./metric` (`Metric`) | **BREAK** | `lane-frontend.md:472` (1 of 7 files, per CENSUS C-4). Prop pass due on top of the rename; re-tune D-16/D-17 at the same edit. |
| `:4` `HoverPopover` | `./hover-popover` **REMOVED** → `<Popover>` at 5.0.0 | **BREAK → then CURES D-1, D-11, D-25** | `lane-frontend.md:474`, `CHANGELOG.md:217`. `Popover trigger="click"|"hover"` + `!isCoarsePointer` (`popover/Popover.vue:11,63`). The highest-value cure in the file. |
| `:6` `DockIconButton` | member **REMOVED** → `<DockControl shape="icon">` | **BREAK → then CURES D-8, D-23** | `lane-frontend.md:475`; producer `dock/index.ts` — "DEFINITION-ABSENT — clean break, no alias". `DockControl.vue:38-52,101-116` supplies tri-state `aria-pressed` + `aria-disabled`-not-native-`disabled`. |
| `:6` `GlassDock` | survives | neutral | Re-audit `fit-content` semantics against 7.0.0's layer rules before assuming D-4 persists. |
| `:3` `Slider` | survives | neutral | D-2's dead `--slider-scrub-*` must be cured **now**, not at uplift — it is dead at both pins. |
| `:7` `Tooltip` (local shim) | 10 callsites here | **CARRY** | intake **R3-7a**: this file is 10 of the 35 callsites over 9 consumers — the largest single share of the F.W3 shim-disposition budget. |
| `:144` `<component :is>` | dynamic family | **CARRY** | intake **R3-10**: one of the two `:is` families dropped between registries; F.W4 must budget it. Confirmed live. |
| `:84`, `:131` separator | `<DockSeparator>` ships at both pins | **improve now** | D-9; no uplift dependency. |
| `--btn-hover-color` / `--viz-fourier` registers | R3-6 doctrine predates 4.0.0 | **improve now** | D-3; already non-conformant at the installed pin. |
| — | `ToastVariant` definition-absent (hard typecheck break) | n/a here | `CENSUS:103-104` — this file imports no toast surface. Recorded so the file is not mis-counted into that row. |

**Sequencing ask.** D-1 (BLOCKER) is cured by the popover migration, and D-8/D-23 by the dock-control migration — but both sit behind the **atomic tri-package transaction** (`CENSUS:185-186`: glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0; none lands alone, per the `keyframes@4.3.0 → glass ~4.0.0` tilde deadlock). A Level-A keyboard failure should not wait on a three-package bump: **D-1 admits an interim, uplift-compatible cure at the current pin** — bind `v-model:open` on `HoverPopover` (the `defineModel` surface is already published, `HoverPopover.vue.d.ts` AB.W2) and add a `@click` on the trigger, giving a click path that survives the migration to `<Popover trigger="click">` unchanged. Recommend F.W1 land that ahead of the transaction.

**Whole-file verdict.** The composition is competent and the library-contract literacy is genuinely above the constellation baseline (S-3, S-5, S-6) — but the surface fails Level A on keyboard, fails AA on its only text, and its single authored proportional gesture (the right-hand commit cluster) does not paint. Three of its four glass imports are on the removal list. It is not a cosmetic pass; it is a re-composition.
