claude-opus-5[1m]

# Challenge · RibbonBar · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/controls-pane/RibbonBar.vue` (151 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser. Contrast ratios are COMPUTED from the token values in the tree (sRGB relative luminance, WCAG 2.x formula); anything requiring paint is marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier and dies if the falsifier holds.

**Tally: 20 defects (2 BLOCKER · 7 MAJOR · 7 MINOR · 4 INFO) · 3 superlatives.**

---

## 0. What the file actually is

A 4-branch conditional action bar. One always-rendered wrapper (`:2`) → glass-ui `Card cartoon tier="quiet"` (`:3`) → `CardContent p-3` (`:4`) → then a mutually-exclusive chain: a `v-show` Teleport landing pad for the *controls* tab (`:6-9`), a 4-button *keyframes* strip (`:12-65`), a 4-button *timeline* strip (`:68-104`), and a catch-all `<slot name="ribbon-content">` for everything else (`:107-115`). Script surface is 21 lines: 8 Lucide icons, 3 glass-ui components, one module-private class constant (`:135`), a 3-prop `defineProps` with two `any`s (`:137-141`), and one 3-line scoped rule (`:144-150`).

Read whole. Every import read: `@lucide/vue` (8 icon modules), `@mkbabb/glass-ui` root barrel (`Button`, `Card`, `CardContent`) resolved to the installed 7.0.0 dist, `@state` (`controlOptionsStore.ts`). Transitive design surface read: `design-idioms.css`, `style.css`, `playback-idiom.css`, `ControlsPaneWrapper.css`/`.vue`, `DemoGlobalChrome.vue`, `KeyframesEditor.vue`, `PlaybackRibbon.vue`, `ChannelControls.vue`, `controlSurfaces.ts`, `sceneExposedApi.ts`, and the glass-ui token/utility/component sheets named inline below.

**Corpus folded (not re-derived):** `formation/keyframes/lane-frontend.md` — F-1 (glass-ui is a phantom dependency; every glass claim below is sourced from the *installed* 7.0.0 dist, which the lane established is what is actually on disk), §3.2 (RibbonBar's glass import roster), §5 shadow census S-1..S-8, §6.3 (98 unprefixed demo custom properties, **zero `--kf-*`**, "a collision surface worth a lane of its own"), §6.5 (13 PRM sites). **I contradict the lane in one place, marked in D-3.**

---

## 1. BLOCKERS

### D-1 · BLOCKER · The active "Apply CSS" button paints white text on a rainbow. Every stop under the label fails WCAG AA.

`RibbonBar.vue:44-64`. When `cssApplied` is true the button takes `'rainbow-vivid text-white ribbon-apply--active'` (`:50`) and the Paintbrush icon drops its gradient stroke to inherit `currentColor` = white (`:57-61`).

`.rainbow-vivid` is glass-ui's utility (`node_modules/@mkbabb/glass-ui/dist/styles/utilities/btn.css`), verbatim in the shipped sheet (`dist/gh-pages/assets/index-CL_QYCiO.css`):

```css
.rainbow-vivid{background:linear-gradient(to right, var(--rainbow-red), var(--rainbow-orange), var(--rainbow-yellow), var(--rainbow-green), var(--rainbow-blue), var(--rainbow-indigo), var(--rainbow-violet))}
```

Six of the seven stops resolve to the demo's own values (`design-idioms.css:15-21`); indigo falls through to glass-ui (`dist/styles/tokens/scale-paper.css`). Computed contrast against `#fff`:

| stop | value | source | rel. luminance | contrast vs white | AA text (4.5:1) | AA non-text (3:1) |
|---|---|---|---|---|---|---|
| red 0% | `hsl(0 85% 60%)` | design-idioms.css:15 | 0.2280 | **3.78:1** | ✗ | ✓ |
| orange 16.7% | `hsl(30 90% 55%)` | :16 | 0.3811 | **2.44:1** | ✗ | ✗ |
| yellow 33.3% | `hsl(55 90% 55%)` | :17 | 0.7384 | **1.33:1** | ✗ | ✗ |
| green 50% | `hsl(130 70% 50%)` | :18 | 0.5034 | **1.90:1** | ✗ | ✗ |
| blue 66.7% | `hsl(210 80% 55%)` | :19 | 0.2530 | **3.47:1** | ✗ | ✓ |
| indigo 83.3% | `oklch(0.566 0.206 294.1)` | glass scale-paper.css | ≈0.13–0.18 | ≈4.6–5.8:1 | ~✓ | ✓ |
| violet 100% | `hsl(300 75% 60%)` | :20 | 0.2766 | **3.21:1** | ✗ | ✓ |

The label is `justify-center`-ed (`:14`), so "Apply CSS" + its 16px glyph sit across the **green→blue** span: **1.90:1 to 3.47:1**. WCAG 1.4.3 wants 4.5:1 (the label is `--type-body` ≈16–22px at weight 400 — normal text, not large, so the 3:1 large-text exemption does not apply). The glyph fails 1.4.11's 3:1 over yellow and green. The single stop that would pass is the one the demo does not even own.

The cascade confirms the gradient actually paints and is not sitting under a glass plate: `.glass-capsule { background: var(--glass-capsule-fill, …) }` lives in `@layer components` (`dist/styles/glass/glass-capsule.css:1`), `.rainbow-vivid` is a Tailwind `@utility` → `@layer utilities`, which orders after. The author asserts the same (`:145-147`, "so the gradient reads edge-to-edge").

**Falsifier:** a measured ≥4.5:1 over the label's actual band. That requires either the glass plate to out-cascade `rainbow-vivid` (it cannot — layer order above) or the plate to darken the gradient. In the light theme the plates are light-tinted (`--card: light-dark(hsl(30 85% 96%), …)`, `dist/styles/tokens/light-dark.css`), so any overlay pushes luminance *up* and the ratio *down*. The claim is strongest exactly where the app defaults (`style.css:92` `color-scheme: light`).

### D-2 · BLOCKER · The Apply-CSS toggle signals its state by colour alone and exposes no state to AT — and the repo already ships the correct pattern twice.

`RibbonBar.vue:44-64`. `cssApplied` drives a class swap and nothing else: no `aria-pressed`, no `role`, no text change, no glyph change (the icon is the same Paintbrush in both states — only its stroke paint moves). The single distinguishing signal is background + text colour. WCAG 1.4.1 (use of colour) and 4.1.2 (name/role/value) both fail; a screen-reader user hears "Apply CSS, button" in both states.

The demo knows how to do this. Same fact, same session, two other call-sites:

- `demo/components/instrument/keyframes/KeyframesEditor.vue:87-95` — the *same* Apply-CSS command: `type="button"`, `aria-label="Apply CSS keyframes to the target"`, `:aria-pressed="cssApplied"`, `focus-visible:ring-2`.
- `demo/components/playback/PlaybackRibbon.vue:54-58` — a glass-ui `Button` toggle in the *same transport band*: `:aria-pressed="userReversed"` plus `'aria-pressed:bg-primary/10 aria-pressed:border-primary/40'`, i.e. the state styling is *derived from* the ARIA fact rather than duplicated beside it.

So RibbonBar is a third, degraded copy of a control the codebase has already solved correctly — and `KeyframesEditor`'s copy is live simultaneously, meaning one `cssApplied` fact is surfaced by two competing UIs with different accessibility characteristics.

**Falsifier:** glass-ui `Button` forwarding a pressed state implicitly. It does not — `ButtonProps` (`dist/components/button/Button.vue.d.ts`) is `emphasis | tone | size | iconOnly | loading | type | disabled | class` + `PrimitiveProps`. No `pressed`, no `toggle`.

---

## 2. MAJOR

### D-3 · MAJOR · `btn-interactive` is a phantom class. It generates zero CSS in the shipped build.

`RibbonBar.vue:135` — `const RIBBON_BUTTON_CLASS = "h-8 gap-1.5 text-body rounded-full btn-interactive"`.

```
$ grep -rn "btn-interactive" --exclude-dir=node_modules .   → 8 call-sites, 0 definitions
$ grep -rln "btn-interactive" node_modules/@mkbabb/glass-ui/ → (no output)   # whole package, 7.0.0
$ grep -c  "btn-interactive" dist/gh-pages/assets/*.css      → 0 on all 9 sheets
$ grep -rl "btn-interactive" dist/gh-pages/assets/*.js       → 3 chunks (markup strings only)
```

The class ships to the DOM and matches nothing. The repo carries its own post-mortem: `docs/precepts/instructions/LESSONS-LEARNED.md:603` records glass-ui substrate `b0debec` ("delete zero-site orphans") retiring `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` under a false zero-site verdict. The two rainbow utilities came back (they are in 7.0.0's `btn.css`); **`btn-interactive` did not.** The consumer never noticed because the class is silent when absent.

Design consequence: the ribbon's buttons have no interaction affordance of their *own* — hover/press falls entirely to glass-ui's `.glass-capsule-hover` (`scale: 1.015` on hover, `--scale-press-sm` on active, `dist/styles/glass/glass-capsule.css`). That happens to be a decent fallback, which is exactly why the rot is invisible. The class string is a promise the cascade does not keep, in a file whose *only* shared style token is that string.

**Contradiction with the corpus (explicit, per instruction):** `lane-frontend.md §9` reports `--kf-*` namespaced tokens = 0 and treats the demo's styling surface as unprefixed-but-present. It does not enumerate *phantom* classes. The tree here is worse than the census implies: the demo's shared button idiom is not merely unprefixed, it is undefined. The lane's §10.7 "token namespace" recommendation should be widened from a collision audit to a **phantom-class audit** — `proof-phantom-classes.mjs` is named in LESSONS-LEARNED.md:603 as the gate for exactly this and does not exist in `keyframes.js/scripts/` (`ls scripts/` → `baselines build capture.mjs color-fidelity-harness.mjs demo-roster.mjs gates lib observe pages-deploy.sh probe-webkit-linear-accel.mjs release run-demo-roster.mjs`).

**Falsifier:** any rule matching `.btn-interactive` in the served cascade. Three independent greps (source, package, built artifact) say none.

### D-4 · MAJOR · On coarse pointers the ribbon renders a 54px pill filled with content sized for a 36px pill.

glass-ui runs a density axis. `dist/styles/tokens/sizing.css:1` defines every control dimension against `--ui-scale`; `dist/styles/tokens/light-dark.css:1` flips it:

```css
@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }
```

Resolved on touch (`--ui-scale: 1.5`):

| axis | glass-ui intends | RibbonBar hard-codes | ratio |
|---|---|---|---|
| height | `--control-h-sm` = `max(2.25rem×1.5, 2.75rem)` = **54px** | `h-8` = 32px, inert (see D-6) | 54px ✓ |
| glyph | `--ui-glyph` = `calc(1rem × 1.5)` = **24px** | `icon-sm` = `size-4` = **16px** (`design-idioms.css:102-107`) | **67%** |
| gap | `calc(0.375rem × 1.5)` = **9px** | `gap-1.5` = **6px** | **67%** |
| label | `--control-text` = `--type-small × 1.5` ≈ **21px** @390px vw | `text-body` = `--type-body` ≈ **16px** @390px vw | **76%** |

RibbonBar is *primarily* a touch surface: `ControlsPaneWrapper.vue:117-137` mounts the whole pane body inside the glass-ui `<Drawer>` below 1024px, and `:254` pins that boundary. So the ribbon's dominant rendering is the one where three of four axes are pinned at desktop values inside a control box that grew 1.5×. The pill reads hollow — a 54px capsule with a 16px glyph and 16px type floating in it, at 6px separation.

The mechanism is layer order, not accident: `.button` sits in `@layer components` (`dist/components/button/styles.css:1`), the Tailwind utilities sit in `@layer utilities`, so `gap-1.5` / `icon-sm`'s `size-4` / `text-body`'s `font-size` each defeat their scaled counterpart. `icon-sm` also slips glass-ui's own guard: `.button > svg:not([class*="size-"])` would have applied `--ui-glyph`, but the class string is literally `icon-sm`, which does not contain the substring `size-`, so the guard matches and is then out-cascaded anyway.

**Falsifier:** a demo-side pin of `--ui-scale` to 1, or icon classes matching `[class*="size-"]`. `grep -rn "ui-scale\|ui-coarse" demo/` → **0 hits**; `icon-sm` is the demo's own utility, not `size-4` at the call-site.

### D-5 · MAJOR · `text-body` demotes a control to prose typography — against a law this repo wrote down one directory away.

`RibbonBar.vue:135` applies `text-body`. glass-ui's `.button` establishes the control register (`dist/components/button/styles.css:1`):

```css
.button { … font-size: var(--control-text); font-weight: 500; line-height: 1.1; … }
```

`text-body` (`dist/styles/typography/semantic.css:1`, utilities layer) overwrites all three:

```css
@utility text-body { font-family: var(--font-text); font-size: var(--type-body); line-height: var(--type-leading-body); font-weight: 400; text-wrap: pretty; }
```

So the ribbon labels render at **weight 400** (not 500), **leading 1.5** (not 1.1 — prose leading inside a 54px capsule), and pick up **`text-wrap: pretty`**, a paragraph-balancing property applied to a two-word button label.

The demo already legislated the opposite for this exact band. `demo/styles/playback-idiom.css:20-26`:

> `T.D3 (OD-6 / T-TY2) — the K.W2 display bind dies: transport buttons are CONTROLS, so they ride the inherited Jakarta body register at medium weight (a display-optical serif at 16px read spindly-then-smudged; the P-THEME blessed reference re-voiced the whole transport band).` → `font-weight: 500;`

`.btn-playback` is unlayered and therefore beats every layer, so `PlaybackRibbon`'s transport buttons render at 500 while `RibbonBar`'s — same pane, same band, ~40px apart on screen — render at 400. One transport band, two weights, and the file that documents the rule is not the one that breaks it.

**Falsifier:** a later unlayered rule restoring 500 on the ribbon's buttons. None: the file's only scoped rule sets `border-color` (`:148-150`), and no demo sheet targets `.button` weight.

### D-6 · MAJOR · `h-8` is inert, and PlaybackRibbon documented that lesson before this file was last touched.

`.button` sets `min-block-size: var(--button-size)` where `--button-size` = `--control-h-sm` = `max(2.25rem × --ui-scale, --control-floor)` — **36px** on fine pointers, **54px** on coarse. `h-8` sets `height: 2rem` = 32px. A used height can never go below its min-height, so the authored 32px never renders, anywhere, at any pointer type.

`demo/components/playback/PlaybackRibbon.vue:38-45` records the discovery in prose:

> `G7 (H.W10.S2) — the Reverse cell matches the Play cell's HEIGHT. The reka <Button> default applies h-10 (40px) to the Play cell (it out-specifies the unlayered .btn-playback { height:2rem }), so the Reverse cell adopts the SAME h-10 (was h-8 = 32px) …`

That sibling learned the rule and moved to `h-10`. `RibbonBar.vue:135` still ships `h-8`. The cost is not visual (the button is correctly sized by glass — see SUP-1) but epistemic: the file's geometry is a fiction, and the next person tuning the ribbon by editing `h-8` will change nothing and conclude the cascade is haunted.

**Falsifier:** `--control-h-sm` resolving below 2rem. It is a `max()` with a `2.25rem × scale` arm; it cannot.

### D-7 · MAJOR · Five sibling commands with no group semantics, no accessible name, and destroyed focus on every tab switch.

`RibbonBar.vue:12-15`, `:68-71`, `:107-110` each render a bare `<div class="flex items-center justify-center gap-2 flex-wrap">`. No `role="toolbar"`, no `role="group"`, no `aria-label`, no `aria-describedby`, no `aria-live`.

Two consequences:

1. **No grouping.** AT users encounter four unrelated buttons and are never told they form a bar, nor that the bar's *membership changes with the selected control surface*. The set silently swaps Copy/Format/Export CSS/Apply CSS ↔ Snapshot/Import/Export/Add CSS with no announcement.
2. **Focus is destroyed on swap.** The branches are `v-if` / `v-else-if` (`:13`, `:69`, `:108`), so switching tabs unmounts the focused element. Focus falls to `<body>`; a keyboard user's position is lost with no `nextTick` refocus and no `aria-live` narration.

This is out of step with its own neighbourhood, which labels aggressively: `TransportDock.vue:63` (`:aria-label="isPlaying ? 'Pause animation' : 'Play animation'"`), `:104`, `:158`, `:171`, `:195`; `ChannelControls.vue:77` (`aria-label="Control surface"`); `KfPillTabs.vue:16`; `TimingFunctionPanel.vue:19`.

**Falsifier:** an ancestor supplying the role/name. `grep -rn 'role="toolbar"\|role="group"' demo/components/instrument/transport/` → **0 hits**; `ControlsPaneWrapper.vue`'s only a11y affordance is a `sr-only` `DrawerTitle` (`:134`) that names the whole sheet, not the ribbon.

### D-8 · MAJOR · One raw Tailwind ramp colour sits one line from a theme-aware token, and the icon-colour scheme carries no meaning.

`RibbonBar.vue:42` — `<FileCode class="icon-sm text-emerald-500" />`.

`text-emerald-500` is Tailwind's default palette: a hard-coded oklch with no dark-arm, no `@theme` bridge, no token. It is the **only** occurrence of `emerald` in the entire demo (`grep -rn emerald demo/` → 1 hit, this line), and glass-ui's token sheets define no emerald (`grep -rl emerald dist/styles/` → no output). The demo's own `@theme` block (`style.css:42-67`) bridges exactly four colours and none of them is this.

Twelve lines earlier, `:30` — `<Sparkles class="icon-sm text-gold" />` — uses the discipline the demo *does* own: `.text-gold { color: var(--color-gold) }` (`design-idioms.css:87-90`) with an explicit dark-arm ramp (`:36-38` light, `:67-71` dark) and a written rationale tying it to glass-ui's `--gold` base. Two adjacent icons, two irreconcilable colour disciplines, one of which will not follow the theme toggle.

Compounding it, the colour *system* is absent. Across the keyframes strip: Copy = inherited, Format = gold, Export CSS = emerald, Apply CSS = rainbow-gradient stroke. Four icons, three unrelated treatments, no legend, no shared axis (they are not severity, not destructiveness, not frequency). Across the timeline strip (`:78`, `:86`, `:94`, `:102`): zero coloured icons. So "this icon is coloured" carries no information at all — it is decoration masquerading as signal, and the two tabs disagree about whether the decoration exists.

**Falsifier:** a demo `--color-emerald-*` token, or a documented icon-colour taxonomy anywhere in the tree. Neither exists.

### D-9 · MAJOR · The `ribbon-content` extension seam has no skin contract, and the one shared token is module-private.

`RibbonBar.vue:111-114` opens the bar to arbitrary scene-authored content, passing only `selected-control`. `RIBBON_BUTTON_CLASS` (`:135`) — the ribbon's entire visual grammar — is a `const` in `<script setup>`: not exported, not provided, not a CSS class, not passed through the slot props. No consumer can conform to it even if it wanted to.

The result is four competing ribbon-item grammars inside one bar:

| author | skin | file:line |
|---|---|---|
| RibbonBar itself | `h-8 gap-1.5 text-body rounded-full btn-interactive` | `:135` |
| CubeScene (`matrix-controls`) | `h-8 gap-1.5 cursor-pointer text-small font-medium px-3 **rounded-lg** btn-interactive` | `CubeScene.vue:188`, `:193` |
| SpringScene (`spring`) | `btn-playback btn-playback-accent` | `SpringScene.vue:143` |
| EasingScene (`easing`) | an entire `<PlaybackRibbon>` component | `EasingScene.vue:96` |

The cube's items are **`rounded-lg`** where the ribbon's own are **`rounded-full`** — literally different pill geometry rendering in the same 4px-padded row depending on which scene is mounted, plus a different type rung (`text-small` vs `text-body`). The seam also leaks glass-ui API drift: `CubeScene.vue:188/193` passes `variant: "outline"` to a glass-ui `Button`, and `ButtonProps` (7.0.0) has no `variant` — the axis is `emphasis`. Another silently-inert prop, in content the ribbon renders as its own.

**Falsifier:** a documented ribbon-item contract, or an exported/provided skin token. `grep -rn "RIBBON_BUTTON_CLASS" demo/` → 4 hits, all inside RibbonBar.vue.

---

## 3. MINOR

### D-10 · MINOR · Two disagreeing rainbows, and the demo owns only six of the seven stops it repaints.

`design-idioms.css:9-21` declares itself authoritative — *"the demo's copy overrides glass-ui's incidental same-named tokens"* — and redefines `--rainbow-red/-orange/-yellow/-green/-blue/-violet` in **hsl**, plus an unused `--rainbow-cyan`. It never declares `--rainbow-indigo` (`grep -rn -- "--rainbow-indigo" --exclude-dir=node_modules .` → **0**).

`.rainbow-vivid` needs seven. The sixth stop therefore falls through to glass-ui's `oklch(0.566 0.206 294.1)` (`dist/styles/tokens/scale-paper.css`) — one foreign hue, in a different colour space, inside a family the file's own header calls the authoritative demo copy. This is exactly the flat-namespace hazard `lane-frontend.md §6.3` named ("98 unprefixed demo custom properties sharing a global namespace with glass-ui's"), realised at a live call-site: a partial override of a foreign token family produces a hybrid nobody designed.

Second disagreement: the button's background is glass-ui's **7-stop, `to right`** vivid; the inactive Paintbrush stroke is the demo's **6-stop, diagonal** `#rainbow-gradient` (`DemoGlobalChrome.vue:16-23`, `x1 0% y1 0% → x2 100% y2 100%`, no indigo). The same control shows two different rainbows in its two states, at two different angles, with two different stop counts.

**Falsifier:** a `--rainbow-indigo` declaration in `demo/`, or matching stop sets. Neither.

### D-11 · MINOR · The gradient icon-stroke renders as three independent rainbows, not one.

`RibbonBar.vue:57-61` binds `:style="{ stroke: 'url(#rainbow-gradient)' }"` on the Lucide `<svg>` root; `stroke` is an inherited presentation property, so each child `<path>` inherits it. `#rainbow-gradient` (`DemoGlobalChrome.vue:16`) sets no `gradientUnits`, so it defaults to `objectBoundingBox` — resolved against **the bbox of each element the paint is applied to**, i.e. per path.

Lucide's Paintbrush is 3 paths (`node_modules/@lucide/vue/dist/esm/icons/paintbrush.mjs`), one of which is a bare 2-point line (`m14.622 17.897-10.68-2.913`, a 10.68 × 2.91 unit box). So the intended "one rainbow across the brush" is three full red→violet sweeps at three unrelated scales, the smallest of them compressing the whole spectrum into a 3-unit-tall hairline.

**Falsifier:** `gradientUnits="userSpaceOnUse"` on the def (absent — `DemoGlobalChrome.vue:16`), or a single-path icon.

### D-12 · MINOR · Every control is a silent no-op when its ref is unresolved. No disabled, no loading, no error state exists.

All eight handlers are doubly optional-chained: `activeKeyframesRef?.copyCSS?.()` (`:20`), `?.formatCSS?.()` (`:28`), `?.exportCompiledCSS?.()` (`:40`), `?.applyCSSStyles?.()` (`:53`), `activeTimelineRef?.snapshot?.()` (`:76`), `?.openImportDialog?.()` (`:84`), `?.exportCSS?.()` (`:92`), `?.openAddCSSDialog?.()` (`:100`).

The `?.` is the author's own admission the refs can be absent. When they are, the button renders at full opacity, accepts the click, reports nothing, and does nothing. glass-ui `Button` ships `disabled` and `loading` (`Button.vue.d.ts`) — `loading` is documented as *"Marks an in-flight command and suppresses activation until it settles"* — and the file uses neither. `Export CSS` in particular is a compile step (`:32-35` narrates `compileToCSS` plus an "ineligibility report") with no in-flight affordance whatsoever.

State coverage across the component: **no loading state, no error state, no disabled state, no success feedback.**

**Falsifier:** a guarantee that the refs are always populated whenever a branch renders. `ControlsPaneWrapper.vue:94-95` forwards them as untyped `any` props (`RibbonBar.vue:139-140`) with no such guarantee anywhere in the chain.

### D-13 · MINOR · The empty ribbon is reachable by the extension protocol's own type.

`:2-4` render the wrapper, the cartoon `Card` and its `p-3` `CardContent` **unconditionally**. Every content branch is conditional. The catch-all (`:107-115`) fires for any `selectedControl` that is not one of the three built-ins, and its `<slot>` can legitimately be empty:

- `selectedControl` is typed `string`, not the `ControlSurface` union (`state/controlOptionsStore.ts:12`), so the branch chain is unclosed by construction.
- The scene protocol explicitly permits null: `app/scene/sceneExposedApi.ts:26` — `ribbonContent?: (slotProps: { selectedControl: string }) => VNode | null;`
- Every implementation exercises that permission: `SpringScene.vue:136` `if (slotProps.selectedControl !== "spring") return null;`, `CubeScene.vue:181` `: null`, `EasingScene.vue:94-96` ternary.
- Only 3 of 7 scenes expose `ribbonContent` at all (`grep -rn ribbonContent demo/` → easing, cube, spring), and `App.vue:69` renders it only `v-if="sceneRef?.ribbonContent"`.

Result: a ~24px cartoon `Card` with a 2px border and a 3-layer offset shadow (`--shadow-cartoon-md` = `-3px 3px, -5px 5px, -7px 7px`, `dist/components/card/styles.css`) containing nothing. There is no `v-if="$slots['ribbon-content']"` guard, and even that would not catch a `null` return.

**Falsifier:** an enumeration proving every reachable non-built-in `selectedControl` always yields content. The store's type is `string` and the protocol's return type includes `null`; the enumeration cannot be written.

### D-14 · MINOR · The file's only scoped rule is dead — it recolours a border that glass-ui 7.0.0 does not draw.

`:144-150`:

```css
/* The active rainbow-vivid Apply button drops its border so the gradient
   reads edge-to-edge — was a `!border-transparent` Tailwind escape at the
   callsite (D.W2.S3); a scoped rule fights the cascade honestly. */
.ribbon-apply--active { border-color: transparent; }
```

glass-ui `Button` defaults to `tone: "neutral"` (`dist/button-B7c944jy.js` → `tone: { default: "neutral" }`), and the border is drawn only by `.button:not([data-tone="neutral"]) { border: 1px solid …; }`. For the neutral default the base rule wins: `.button { … border: 0; … }` (`dist/components/button/styles.css:1`). Tailwind preflight zeroes `border-width` globally, and `style.css:211-212`'s `* { @apply border-border }` sets colour, not width.

So there is no border to hide. The rule compiles (`dist/gh-pages/assets/index-CL_QYCiO.css` → `.ribbon-apply--active[data-v-76c81a6f]{border-color:#0000}`), applies, and changes zero pixels. Six lines of comment defending a fix whose problem was retired upstream.

The *instrument* choice remains right (scoped rule over a `!` escape — see SUP-2's neighbourhood), which is why this is MINOR rather than MAJOR. But it is now cargo.

**Falsifier:** any rule giving `.button[data-tone="neutral"]` a non-zero border-width in the served cascade. Grep of `button/styles.css`, `glass-capsule.css` and every demo sheet finds none.

### D-15 · MINOR · No `forced-colors` treatment for the only state the component encodes.

The Apply-CSS on/off distinction lives entirely in `background` + `color` (`:47-52`). Under Windows High Contrast / `forced-colors: active`, `color` and `background-color` are overridden by the user's palette; glass-ui's own fallback (`dist/styles/glass/a11y-fallback.css`) zeroes `--glass-level`, grain and highlight and flattens the glass classes, but nothing in it re-expresses a *consumer-painted gradient state*. With `aria-pressed` also absent (D-2), the toggle has **no** non-visual channel and **no** high-contrast channel — it is unreadable in forced colours and invisible to AT simultaneously.

The demo has 10 `prefers-reduced-motion` blocks (`lane-frontend.md §6.5`) and **zero** `forced-colors` blocks: `grep -rn "forced-colors" demo/` → no output. Motion accessibility is conscientious here; contrast-mode accessibility is unattempted.

**Falsifier:** a `@media (forced-colors: active)` rule in the demo cascade, or a glass-ui rule restoring `.rainbow-vivid` state legibility under forced colours. Neither exists.

### D-16 · MINOR · Physical-direction padding with an undocumented magic step, copy-pasted three times.

`:2` — `class="flex-shrink-0 pl-4 pr-7 pb-2"`. Two problems, one mitigated:

- **Physical, not logical.** `pl-*`/`pr-*` emit `padding-left`/`padding-right`. The layer directly above is logical (`ControlsPaneWrapper.css` → `.controls-drawer-content .controls-content { padding-inline: 0.75rem }`). Under `dir="rtl"` the 28px gutter lands on the wrong edge while its parent's padding does not flip at all. Severity held at MINOR because the demo ships no RTL affordance today (`grep -rn 'dir="rtl"\|ps-4\|pe-7' demo/` → 0).
- **Magic + duplicated.** `pr-7` (1.75rem) is a non-standard step with zero explanation anywhere in the tree, and the exact string `pl-4 pr-7` is triplicated: `RibbonBar.vue:2`, `ChannelControls.vue:17`, `ChannelControls.vue:39`. Three hand-synced copies of one alignment fact, with no token — the same disease `controlSurfaces.ts:120-126` congratulates itself for curing in the tab-metadata domain ("Formerly the surface→{label,icon} map existed THREE times … This is the SINGLE source").

*Credit where due:* the triplication does mean the ribbon Card's edges currently align with the channel panel above it. The defect is the mechanism (copy-paste), not the current pixel result.

**Falsifier:** a shared padding token or an RTL requirement. Neither found.

---

## 4. INFO

### D-17 · INFO · Import/Export iconography is inverted against the dominant convention.

`:86` `<Download class="icon-sm" /> Import` · `:94` `<Upload class="icon-sm" /> Export`. Both target local-file operations (`KeyframeTimeline.vue:281` `openImportDialog`, `:203` `exportCSS`), where the prevailing convention is Upload = bring a file *in*, Download = take a file *out*. **Falsifier:** a house style rule fixing the opposite mapping, or an import path that pulls from a remote source rather than a file dialog. The "download into the app / upload out of it" mental model is genuinely attested in the wild, so this is INFO, not a defect I would defend hard.

### D-18 · INFO · Label prose: no clichés, but no consistent grammar either.

Keyframes strip: `Copy` · `Format` · `Export CSS` · `Apply CSS`. Timeline strip: `Snapshot` · `Import` · `Export` · `Add CSS`. Bare verbs and verb+object mix inside a single strip, and **`Export CSS` and `Export` are two different commands one tab apart, distinguished only by a suffix**. `Copy` never says what it copies — `KeyframesEditor.vue:88` does (`aria-label="Apply CSS keyframes to the target"`). No tooltips are used anywhere in the file, though the transport band already imports `Tooltip*` at three other sites (`TransportDock`, `ChannelControls`, `PlaybackRibbon`).

*Positive:* zero trite or marketing copy. No "Seamlessly…", no "Effortlessly…", no exclamation marks, no filler. The labels are terse and honest — the failing is systematisation, not voice.

### D-19 · INFO · **UNPROVEN-NEEDS-LIVE** · The ribbon's surfaces inherit an AA-tint opt-out whose stated premise is contradicted by the app's default theme.

`RibbonBar.vue:3` selects `tier="quiet"`; glass-ui `Button` applies `.glass-wash` (`dist/button-B7c944jy.js`). Both are enrolled by `style.css:203-208`:

```css
:where(.glass-quiet, .glass-wash, .glass-resting),
[data-tier="quiet"], [data-tier="wash"], [data-tier="resting"] { --glass-tint-strength-aa: 0%; }
```

Its rationale (`:192-202`) is *"The keyframes.js stage is a DARK substrate"* — while `:root` declares `color-scheme: light` (`:92`) and the app ships a light theme. `--glass-tint-strength-aa` is consumed in two consumer-visible places: the `@container style(--glass-backdrop: light)` lift and the `@media (prefers-contrast: more)` fallback (`dist/styles/glass/ladder.css`, `dist/styles/glass/a11y-fallback.css`).

**Deliberately not escalated.** The other `ladder.css` arm is `clamp(--glass-tint-strength-floor, …, var(--glass-tint-strength-aa))`, and CSS `clamp` with `max < min` yields `min` — so the 0% may pin to the floor rather than zero, contradicting the demo's own comment ("the mix resolves as a ZERO-delta"). Which arm binds is not decidable from source. **SS-13 ask:** measure ribbon Card plate ↔ page and button ink ↔ plate contrast in the **light** theme and under `prefers-contrast: more`. **Falsifier:** measured contrast meeting the tier's intended floor in both.

### D-20 · INFO · **UNPROVEN-NEEDS-LIVE** · "Persistent controls ribbon" is aspirational — it is inside the scroller, not pinned to it.

`ControlsPaneWrapper.vue:90` labels it *"Persistent controls ribbon"*. It renders as the last in-flow child of `.controls-content`, inside `.controls-pane`, which becomes `overflow-y-auto` whenever the pane is open (`ControlsPaneWrapper.vue:36`, `:299-303`). RibbonBar's wrapper carries `flex-shrink-0` (`:2`) but no `position: sticky` and no `position` at all. The sibling that genuinely stays put uses the idiom explicitly — `KeyframesEditor.vue:99-101`, `class="progress-bar sticky bottom mt-2"`.

Whether it actually scrolls away turns on whether `ChannelControls` bounds its own height: its root is `h-full … overflow-hidden` (`ChannelControls.vue:4`) but its parent is a bare `<div v-show>` (`ControlsPaneWrapper.vue:49`) with auto main-axis size, against which `height: 100%` resolves to auto. **SS-13 ask:** open a channel panel with enough facets to overflow and check whether the ribbon leaves the viewport. **Falsifier:** the ribbon staying at the pane foot with a tall channel panel open.

---

## 5. Superlatives (L-18 runs both ways)

### SUP-1 · The touch target is compliant *despite* the authored geometry — because the author delegated.

By reaching for glass-ui `Button size="sm"` instead of hand-rolling a pill, the ribbon inherits `min-block-size: var(--control-h-sm)` = `max(2.25rem × --ui-scale, --control-floor)`. Under `@media (pointer: coarse)` that is `max(54px, 44px)` = **54px** (`dist/styles/tokens/sizing.css:1` + `dist/styles/tokens/light-dark.css:1`). WCAG 2.5.5's 44px AAA target is cleared with 10px to spare on the mobile Drawer — the surface where it matters — even though the file asks for 32px (D-6). This is the single strongest argument in the tree for the delegation posture: the primitive defended a requirement the consumer had actively mis-specified.

**Falsifier:** a demo override of `--ui-scale` or `--control-floor` (grep → 0 hits), or `height` overriding `min-height` (it cannot).

### SUP-2 · Zero shadow-census debt. The one file in the transport cluster that reimplements nothing.

Against `lane-frontend.md §5`'s roster — 217 lines to retire outright (S-1 `KfPillTabs` + its composable), 1 168 lines to evaluate (S-3 timeline ×4, S-4 scrubber, S-5 `AnimatedText`, S-6 skeleton, S-7 `CopyButton`) — **RibbonBar contributes 0 shadow lines.** Its imports (`:122-133`) are 8 Lucide icons, 3 glass-ui components, and one store type. It hand-rolls no card, no button, no tablist, no motion. Its entire local CSS is 3 lines. In a demo whose sibling components fork `SegmentedTabs` over a bug fixed three majors ago (S-1) and inject `@keyframes` as runtime JS strings (S-7, `CopyButton.vue:70/83`), that restraint is the exception, not the norm.

**Falsifier:** a bespoke primitive in the file. There is none — the only local CSS is the (now-dead, D-14) `border-color` rule.

### SUP-3 · The Teleport seam is the right instrument, and `v-show` was the right verb.

`:6-9` gives the *controls* tab a named landing pad (`#controls-ribbon-target`) that `ChannelOptions.vue:377` fills via `<Teleport … defer>`. RibbonBar therefore hosts the controls-domain ribbon **without importing a single thing from that domain** — the content is authored where its state lives, and the bar stays ignorant. Two details make it better than the obvious version:

- **`v-show`, not `v-if`** (`:8`) — the teleported subtree survives tab switches instead of being torn down and rebuilt on every toggle, so any engine-driven state inside it persists. (Contrast the three sibling branches, which are `v-if` and *do* destroy focus — D-7. The right verb was used in exactly one of four places, and it was the one where it mattered most.)
- **`defer` on the source** — the mount-order hazard is handled at the producer, not papered over with a `nextTick` in the consumer.

**Falsifier:** a `v-if` on the target (it is `v-show`, `:8`), or an import of `ChannelOptions`/its state into RibbonBar (`:122-133` contains none).

---

## 6. Provenance

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (installed 7.0.0 — the copy `lane-frontend.md F-1` established is what is actually on disk), every built-artifact claim from `/Users/mkbabb/Programming/keyframes.js/dist/gh-pages/assets/`, every source claim from the working tree at the session's HEAD. Contrast figures are computed from the token literals cited, via sRGB→linear→WCAG relative luminance; no colour was sampled from a rendered pixel. **No file in keyframes.js or glass-ui was written, mutated, or executed; no install and no dev server was run.** The only write performed by this lane is this file.
