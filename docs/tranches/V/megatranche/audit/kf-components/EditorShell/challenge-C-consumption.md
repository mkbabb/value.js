claude-opus-5[1m]

# CHALLENGE · EditorShell · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorShell.vue` (261 L)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, shadow components (S-1..S-8), value.js transitive exposure (R1), props/emits/slots contract quality, sibling integration seams.
**Mode** static, read-only, source-derived. No installs, no dev server, no browser tooling. Livable-only claims marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Substrate** keyframes.js `master`, HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group`.

> ⚠ **THE TARGET IS DIRTY.** `git status --short demo/components/instrument/shell/` → `M EditorHeader.vue · M EditorShell.vue · M SharePopover.vue · M TypingDots.vue`. The audited text is the **uncommitted working tree**, which differs from HEAD across the entire glass-ui seam (diff in §1). This is an in-flight glass-ui-7 migration. Every finding is scoped to the working tree; where HEAD differs I say so.

> **This file supersedes a prior pass at this path.** Its two blockers, and the producer/artifact fork behind them, I re-derived independently and **confirm**. Two of its citations do not survive verification and are **corrected** in §6; six findings are new. Net: 22 defects (2 BLOCKER · 6 MAJOR · 11 MINOR · 3 INFO) · 5 superlatives.

| id | sev | claim (one line) | new? |
|---|---|---|---|
| C-1 | **BLOCKER** | Against the glass-ui artifact actually on disk, the shell's whole header command set is `inert` + `aria-hidden="true"` + zero-width at rest, with **no touch and no keyboard path** to expand it. `mode="persistent"` is a phantom prop in *both* candidate builds. | |
| C-2 | **BLOCKER** | The installed `@mkbabb/glass-ui@7.0.0` `HeaderRibbon` is a **different component** from the producer's 7.0.0 — and I found the decisive tell proving the installed copy is a stale **pre-cut** build. With F-1 (no declaration, no lock) nothing in the repo determines which one builds. | tell is new |
| C-3 | MAJOR | `<SharePopover />` (`:20`) is rendered with no `onSceneRestore`; the header share path silently cannot switch scenes, while its live twin in the dock is wired. | |
| C-4 | MAJOR | The `IconTooltip` → `Tooltip`/`TooltipTrigger`/`TooltipContent` swap made EditorShell hard-require an ancestor `TooltipProvider` it neither supplies nor declares; reka **throws** on the missing injection. Its own child self-provides. | |
| **C-5** | **MAJOR** | `class="aspect-square w-8"` defeats the glass `Button icon-only` square geometry **and glass-ui's coarse-pointer control floor** — 40→32 px desktop, **60→32 px on touch**. Introduced *by this migration*. | ✦ NEW |
| **C-6** | **MAJOR** | `.vue` files are **never type-checked** (`check` runs bare `tsc`; no `vue-tsc` in devDeps or `.bin`). The entire invalid-prop class that produced C-1 has **no gate**. | ✦ NEW |
| C-7 | MAJOR | `extraTabs: SegmentedTabOption[]` (`:169`) is a 4-hop dead prop with zero producers, the **sole** reason this file touches `/tabs`, and it drops 2 of its 5 fields at the terminal fork. | |
| C-8 | MAJOR | `defineExpose({ headerRibbonRef })` (`:197`) is a dead ref-forward the migration rewrote every adjacent line around and left. | citations fixed |
| **C-9** | MINOR | `#tabs-content` forwarding drops the scoped props the chain publishes — asymmetric with its own `#tabs-trigger` / `#ribbon-content`, which both `v-bind`. | ✦ NEW |
| C-10 | MINOR | `initIOSPlatformClass()` (`:133`) mutates `<html>` from a mid-tree component, against the demo's own two declared homes for document-level singletons. | |
| C-11 | MINOR | Three tooltip idioms across four sibling controls in one 40-line ribbon; the `title` on `DarkModeToggle` is state-blind. | |
| C-12 | MINOR | The header tooltip inherits App's bare provider → 700 ms, vs 100 ms everywhere else in the instrument. | |
| C-13 | MINOR | `onPlayStateChange` (`:192`) is pure pass-through indirection while the sibling emit is inlined (`:86`). | |
| C-14 | MINOR | `animationGroup: AnimationGroup<any>` (`:137`) — `any` at the shell's widest prop, erasing `T` for the whole descendant chain. | |
| C-15 | MINOR | `Button` from the root barrel (`:124`) beside `Tooltip*` from `/tooltip` (`:125`), with a `./button` subpath present. | |
| C-16 | MINOR | `#header-left` (`:18`) and `#header-right` (`:19`) have zero overriding hosts. | |
| **C-17** | MINOR | The demo's own z-contract prose (`style.css:27–39`) omits `--z-header` (35) — the layer its ribbon occupies. | ✦ NEW |
| **C-18** | MINOR | `const props = withDefaults(…)` (`:135`) is never read; no lint and no type gate catches it. | ✦ NEW |
| **C-19** | MINOR | Measured: `parseCssColor("color-mix(…)")` → `{ok:false}`. EditorShell's own `<style scoped>` establishes `color-mix()` as the graph-token idiom; a sibling scene pipes `getComputedStyle` token text into `parseCssColor` and throws on `!ok`. | ✦ NEW |
| C-20 | INFO | `import "@styles/style.css"` (`:131`) — a leaf importing the app cascade root, duplicated by `main.ts:18`. | |
| C-21 | INFO | Zero test coverage: no file under `test/` references `EditorShell` or `HeaderRibbon`. | |
| C-22 | INFO | `EditorHeader.vue` — barrel-exported, zero consumers, duplicates this ribbon including the same unwired `<SharePopover />`. | |
| S-1..S-5 | ✦ | §5 — five things this component gets right, three of them non-obvious. | |

---

## 0. Files read whole (read-only)

Target + every import, one hop past each: `shell/{index.ts, SharePopover.vue, useShareState.ts, EditorStartScreen.vue, KeyboardShortcutsModal.vue}` · `transport/AnimationControlsGroup.vue` · `transport/controls-pane/ControlsPaneWrapper.vue` (§40–169) · `transport/transportSource.ts` · `instrument/utils/iosTextEntry.ts` · `app/{App.vue, main.ts, dock/MbabbMenu.vue}` · `styles/{style.css, design-idioms.css}` · `scenes/square/useSquareTumble.ts` · `scenes/cube/CubeScene.vue` (§142–181) · `vite.config.ts`, `tsconfig.json`, `package.json`.
Artifact evidence: `node_modules/@mkbabb/glass-ui/dist/{header-ribbon.js, tooltip-OxciiZm6.js, keyboard.js, dark-mode-toggle.js, components/{header-ribbon,tooltip,button,dark-mode-toggle}/**, styles/tokens/{sizing,light-dark,scheme-motion}.css}` · `node_modules/reka-ui/dist/{Tooltip/{TooltipRoot,TooltipProvider}.js, shared/createContext.js}` · `node_modules/@mkbabb/value.js@4.0.0` (one Node probe).
Producer evidence: `glass-ui/{package.json, src/components/header-ribbon/**, docs/consumer-evidence/header-ribbon.md}` · `value.js/docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md`.

---

## 1. The working-tree diff (the frame for everything below)

```diff
-        <HeaderRibbon ref="headerRibbonRef" position="right">
+        <HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">
...
-                    <IconTooltip text="Keyboard shortcuts (?)">
-                        <Button variant="ghost" size="icon" ...>
+                    <Tooltip>
+                        <TooltipTrigger as-child>
+                            <Button emphasis="quiet" icon-only class="aspect-square w-8 ...">
+                        </TooltipTrigger>
+                        <TooltipContent>Keyboard shortcuts (?)</TooltipContent>
+                    </Tooltip>
...
-            <template #anchor="{ pinned, toggled }">
-                <slot name="header-anchor" :pinned="pinned" :toggled="toggled"></slot>
-            </template>
...
-import { DarkModeToggle } from "@mkbabb/glass-ui/controls";
+import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";
-import { IconTooltip } from "@mkbabb/glass-ui/icon-tooltip";
+import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui/tooltip";
```

**HEAD is unbuildable.** `./icon-tooltip` and `./controls` are **absent** from the installed package's 73-entry exports map, so `HEAD:EditorShell.vue:123,125` resolve to `ERR_PACKAGE_PATH_NOT_EXPORTED`. The working tree has swept both to zero. **The repair direction is correct** (S-5); the migration missed four items and introduced two regressions (C-1, C-5).

---

## 2. BLOCKERS

### C-1 · the header command set is inert, aria-hidden and untappable against the on-disk glass-ui

`EditorShell.vue:16` — `<HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">`

**`mode` is not a prop in either candidate build.** The installed component declares exactly three (`dist/header-ribbon.js`: `placement`, `ariaLabel`, `class`); so does the producer (`glass-ui/src/components/header-ribbon/types.ts`, read whole — `{placement?, ariaLabel?, class?}`). Both set `inheritAttrs: false` and re-bind `useAttrs()` onto the root, so `mode="persistent"` is emitted as a literal DOM attribute on a `<div role="toolbar">`. Unconditionally dead.

What it was evidently meant to defeat is real, and it is still in the artifact on disk:

| probe | file | fact |
|---|---|---|
| actions binding | `dist/header-ribbon.js` | `inert: !w.value \|\| void 0, "aria-hidden": !w.value` |
| expansion source | `dist/header-ribbon.js` | `w = computed(() => pinned \|\| hovered \|\| focusWithin)` — all three init `false` (`l(!1)` ×3) |
| hover gate | `dist/header-ribbon.js` | `e.pointerType !== "touch" && (S.value = !0)` — **touch never sets hovered** |
| CSS at rest | `dist/components/header-ribbon/styles.css` | `.header-ribbon:not([data-expanded]) .header-ribbon__actions { max-inline-size: 0; opacity: 0; pointer-events: none; }` + `overflow: clip` |
| only tap affordance | `dist/header-ribbon.js` | `<div class="header-ribbon__anchor" @click=togglePinned>` renders `$slots.anchor` |
| anchor geometry | same CSS | `.header-ribbon__anchor { display: grid; flex: none; place-items: center; }` — no intrinsic size |
| Esc rescue | `dist/header-ribbon.js` | `A()` pins then `anchor.querySelector("button, a, [tabindex]:not([tabindex='-1']))?.focus()` — queries the **empty** anchor |

**EditorShell supplies no `#anchor`** (the migration deleted the forwarding; `grep -rn "header-anchor" demo/ test/ docs/` → zero, so nothing regressed — the anchor was always empty). An empty `flex: none` grid box is 0×0. At first paint, every path to `expanded` is closed:

- **Touch:** `pointerenter` filtered by the `pointerType !== "touch"` guard; the 0×0 anchor cannot be tapped; actions carry `pointer-events: none` **and** `inert`. **Share, Keyboard-shortcuts and Dark-mode are unreachable on any coarse pointer.**
- **Keyboard:** `inert` removes the subtree from focus order and the anchor `<div>` has no `tabindex`, so `focusin` can never fire from within — circular. The Esc handler needs a focused descendant that cannot exist, then queries an empty anchor. **Dead in both directions.**
- **Screen reader:** `aria-hidden="true"` at rest, regardless of modality.
- **Desktop mouse works** — the band is `pointer-events: auto` and `pointerenter` expands it.

Derived rest geometry of that band (`min-block-size: var(--size-icon-btn)` = 2.5 rem; `padding: var(--panel-padding)` = 0.375 rem/side; zero-width content): a **≈12 × 40 px empty glass pill** in the top-right corner. *Visual reading of it: UNPROVEN-NEEDS-LIVE.*

This also swallows both host extension points: `#header-left` (`:18`) and any `#header-right` override (`:19`) render inside the same inert wrapper.

**The self-refuting comment.** `:21–29` justifies the shortcuts button as breaking "the discoverability paradox" — the 19-shortcut registry being reachable only via `?`. Against the on-disk artifact the cure has the disease: the control added to solve invisibility is itself invisible, inert and AT-hidden. Same failure mode as census **S-1** (`KfPillTabs` forked over a 4.0.1 bug fixed in 7.0.0) — a consumer reasoning against a glass-ui it no longer has.

**Falsifier.** (a) the installed build declaring `mode` — refuted in `dist/header-ribbon.js`; (b) demo CSS overriding `.header-ribbon__actions` or forcing `data-expanded` — refuted, `grep -rn "header-ribbon" demo/ --include=*.css --include=*.vue --include=*.ts` returns **only** the `EditorShell.vue` lines, and `inert` is a DOM property CSS cannot undo; (c) a host supplying `#anchor` — zero hits repo-wide; (d) **the registry tarball differing from the on-disk copy — this is C-2, and it is the live escape hatch.** I cannot install, so I claim only what disk proves: *the build `npm run dev` / `vite build --mode gh-pages` produces today, from the files present, has an inert ribbon.*

### C-2 · the sole glass-ui structural dependency resolves to an artifact its own producer deleted

Both stamped `"version": "7.0.0"`. They are not the same component. Producer `HeaderRibbon.vue` read whole — 34 lines, `defineSlots<{ items?(): unknown }>()`, a `Surface` band wrapping one `.header-ribbon__actions` div containing `<slot name="items" />`. No anchor, no pin/hover/focus state, no `inert`, no `aria-hidden`, no `data-expanded`, no collapse CSS.

| | installed `dist/` | producer `src/` |
|---|---|---|
| `anchor` slot | present | **absent** |
| pin / hover / focus disclosure | present | **absent** |
| `inert` / `aria-hidden` | present | **absent** |
| `:not([data-expanded])` collapse CSS | present | **absent** |
| `--header-ribbon-actions-width` | present | **absent** |

**The decisive tell (new).** The archived Glass letter — `value.js/docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md` — states the collapsible arm was cut because it *"carried a **dead width knob** and magic 30/32rem widths"*. The installed artifact still contains **`--header-ribbon-actions-width`** and **`min(32rem, …)` / `30rem`** (`grep -c` → 1 hit for the knob; both magic widths present in its CSS). The installed copy is therefore provably the **pre-cut build**, not shipped Glass 7 — this is a stale artifact, not a producer/registry disagreement.

Two producer documents corroborate:
- `glass-ui/docs/consumer-evidence/header-ribbon.md:9,25,27,66` — the `collapsible` mode, `anchor` slot, `mode`, `anchorLabel` are *"**DELETED clean-break**"*; *"Real consumers of `persistent`: **1** (keyframes)"*; *"Real consumers of `collapsible`: **0**"*; the survivor is *"a `role="toolbar"` host, **expanded from first paint**"*.
- the letter: *"The only real consumer is keyframes `EditorShell.vue:16`, persistent/right/`#items` — **untouched, zero behavior change**."*

So the correct migration was the `position` → `placement` rename **and nothing else**. The working tree **over-applied** the letter by adding `mode="persistent"` — a prop the same letter lists as deleted.

This is census **F-1** (`lane-frontend.md` §2: glass-ui absent from `package.json` **and** `package-lock.json` while 7.0.0 sits installed, dir stamp `Jul 16 05:17`) cashing out. I extend F-1 with three facts it did not have:

1. **F-1's predicted consequence is empirically visible without an install** — HEAD imports two subpaths the installed artifact does not export.
2. **The drift is content-shaped, not version-shaped.** A pin (`"@mkbabb/glass-ui": "7.0.0"`) would **not** fix it; the divergent artifact also calls itself 7.0.0. The fix needs a lockfile with an integrity hash, or a workspace link.
3. **The stale copy predates the cut**, by the width-knob tell — so the failure is an un-refreshed `node_modules` that no gate can detect, because there is no lockfile entry to detect it against.

**Falsifier.** An `npm ci` in a scratch tree yielding a `dist/header-ribbon.js` with props `{placement, ariaLabel, class}` and no `inert`/`anchor` — that would demote C-1 to "stale dev environment". Forbidden by lane law; not run. It would **not** clear C-2: an undeclared, unlocked dependency whose on-disk copy disagrees with its own producer *is* the defect.

---

## 3. MAJORS

### C-3 · the header share control cannot restore a scene; its dock twin can

`EditorShell.vue:20` — `<SharePopover />`, no props. `SharePopover.vue:56–61` declares `onSceneRestore?: (sceneId: string) => void` → `useShareState(props.onSceneRestore)`. `useShareState.ts:79–81`:

```ts
if (result.activeScene && onSceneRestore) { onSceneRestore(result.activeScene); }
```

Undefined ⇒ branch skipped. State decodes, `toast.success("State restored!")` fires (`:83`), the user stays on the wrong scene. Two instances ship simultaneously:

```
app/dock/MbabbMenu.vue:9                <SharePopover :on-scene-restore="onSceneRestore" />   ← WIRED
components/instrument/shell/EditorShell.vue:20   <SharePopover />                             ← NOT WIRED
```

Both unconditionally rendered (`App.vue:4–26`, `:28`). `App.vue:23` proves the callback is in scope. `App.vue:335`'s own comment — *"Every scene-nav entry (the dock @switch-scene, the SharePopover restore) goes through this"* — is false for one of its two copies. `DarkModeToggle` is likewise doubled (`EditorShell.vue:44`, `MbabbMenu.vue:20`).

**Falsifier.** A host passing `on-scene-restore` through `#header-right` (`App.vue:28–38` passes no header slot at all), or `useShareState` acquiring the switch itself (`:12` takes it only as an argument).

### C-4 · the migration traded a self-contained primitive for one that throws without ambient context

`:30–43` now renders reka's tooltip triple through glass-ui. `dist/tooltip-OxciiZm6.js` shows `Tooltip` is a thin forward to reka `TooltipRoot`; `reka-ui/dist/Tooltip/TooltipRoot.js:55` calls `injectTooltipProviderContext()` **with no fallback**, and `reka-ui/dist/shared/createContext.js` throws on miss:

```js
throw new Error(`Injection \`${injectionKey.toString()}\` not found. Component must be used within \`TooltipProvider\``);
```

EditorShell provides none. It works only because `App.vue:3` wraps the tree — and `App.vue:2` says so. Three things make this a defect, not a preference: (1) **the shell's own child does the opposite** — `AnimationControlsGroup.vue:2` self-provides, as does `ChannelControls.vue:2`; (2) **this bug class already bit this repo** — HEAD is `8281638c fix(demo-shell): provide tooltip context for the routed control group`; (3) **EditorShell advertises standalone hosting** five times in its own prop docs (`:141`, `:159–160`, `:163–168`), and the barrel export (`shell/index.ts:1`) invites it.

**Falsifier.** A fallback on the injection, or glass-ui self-providing — both refuted above. Or a `TooltipProvider` inside `shell/` — `grep -rn "TooltipProvider" demo/` → 3 sites, none in `shell/`.

### C-5 · utility classes defeat the icon-command geometry **and the coarse-pointer control floor** ✦ NEW

`:36` and `:46` — `class="aspect-square w-8 scale-on-hover"` on both `<Button emphasis="quiet" icon-only>` and `<DarkModeToggle>`. `ButtonProps.iconOnly` is documented *"Square geometry for an accessibly named icon command"*, implemented as

```css
.button[data-icon-only] { inline-size: var(--button-size); block-size: var(--button-size);
                          min-block-size: var(--button-size); padding: 0; }
.button { --button-size: var(--control-h-md); }
```

with (`dist/styles/tokens/sizing.css`, `light-dark.css`):

```css
:root { --ui-scale: 1; --control-floor: 0px;
        --control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor)); }
@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5);
                                   --control-floor: var(--touch-target, 2.75rem); } }
```

glass-ui's rules live in `@layer components`; Tailwind v4 declares `theme, base, components, utilities` and `w-8` lands in **utilities**, which outranks `components` regardless of specificity or import order (`style.css:1` tailwindcss, `:3` glass-ui). So `w-8` wins on `width` while `block-size` is untouched:

| context | primitive geometry | after `w-8` |
|---|---|---|
| desktop (`pointer: fine`) | 40 × 40 | **32 × 40** — not square; `aspect-square` is inert because both axes are definite |
| touch (`pointer: coarse`) | 60 × 60 | **32 × 60** — the coarse-pointer up-scale defeated on the width axis only |

`DarkModeToggle` takes it too: its `size` prop (`"sm"|"md"|"lg"|"control"|"dock"`, default `md` → `--dark-mode-toggle-size: 2.25rem`) is never passed; `w-8` forces 32 × 36. **This is a migration regression** — HEAD used `variant="ghost" size="icon"`, i.e. the primitive's own size axis. The design system publishes that axis for exactly this, and the rewrite routed around it — a direct hit on `feedback_root_styling` and `feedback_glass_ui_first_class`.

**Falsifier.** Tailwind utilities not outranking glass-ui's components layer in the emitted bundle; `w-8` purged; or the demo overriding `--control-floor`/`--ui-scale` (grep: it defines neither). Any one kills this. *Pixel confirmation: UNPROVEN-NEEDS-LIVE; the layer order and token arithmetic are dispositive from source.*

### C-6 · `.vue` files are never type-checked — the gate behind C-1 ✦ NEW

```
package.json  "check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"
tsconfig.json "include": ["src/", "demo/"]
grep -c "vue-tsc" package.json → 0      ls node_modules/.bin | grep vue-tsc → (nothing)
```

Bare `tsc` cannot parse SFCs; `include` silently matches no `.vue`. All 58 demo SFCs (11 984 lines, lane-frontend §1) get **zero** type checking, template or script. `mode="persistent"` against a three-key props interface is precisely what `vue-tsc` reports, and nothing here can. The `paths` block's careful `@mkbabb/keyframes.js → src/animation/index.ts` realm unification (`tsconfig.json:27–30`) is therefore enforced only for `.ts` — never for the SFCs doing most of the consuming. C-1, C-5, C-7 and C-18 are all in the class this missing gate would catch.

**Falsifier.** A `vue-tsc` / `vue-language-tools` invocation in CI or another script — probed `package.json` scripts and `node_modules/.bin`; neither has one.

### C-7 · `extraTabs` is a dead 4-hop prop, and the only reason this file touches `/tabs`

`:126` `import type { SegmentedTabOption } from "@mkbabb/glass-ui/tabs"` → used at `:169` only → forwarded at `:84`. Chain: `EditorShell:84` → `AnimationControlsGroup.vue:30` → `ControlsPaneWrapper.vue:65` → `ChannelControls.vue:271` (retyped `KfPillTabOption[]`) → `:322` `(extraTabs ?? [])`.

**Producers: zero.** `App.vue:28–38` — the only host — passes seven props, none of them `extra-tabs`. The documented producer, *"the playground"* (`:163–168`), **does not exist**: `find … -iname "*playground*"` returns only `docs/` and stale worktree copies; the six source files matching `playground` are all comments. The real tab-data producer (`state/controlSurfaces.ts` `extraTabsFrom`) flows to **ChromeDock**, never here. And in the live host `tabsExternallyManaged` is provided (`App.vue:135`/`:169`), so the terminal branch is not even taken.

**The contract also loses fields.** `SegmentedTabOption` is `{label, value, icon?, disabled?, tooltip?}`; `KfPillTabOption` is `{label, value, disabled?}`. Assignment is legal (excess properties survive a non-fresh array) so tsc is silent — but `icon` and `tooltip` are silently dropped at the fork.

This **sharpens census S-2 / F-3** (three type-only `/tabs` sites, "the demo adopted glass-ui's tab data contract while rejecting its renderer"). Two facts S-2 did not measure: at this site the borrowed contract has **no producer at all**, and the fork **discards 2 of its 5 fields**. The cost of the S-1 fork is measurable here.

**Falsifier.** Any `extra-tabs` binding on an `EditorShell` tag in `demo/` or `test/` (18 `extraTabs` hits, none on an `EditorShell` element), or `KfPillTabs.vue` rendering `option.icon` / `option.tooltip` (grep → nothing).

### C-8 · the dead ref-forward the migration walked past

`:187`/`:197` — `useTemplateRef<InstanceType<typeof HeaderRibbon>>` + `defineExpose({ headerRibbonRef })`.

- **Zero consumers.** `grep -rn "headerRibbonRef" demo/ test/` → only these two lines plus the `ref=` at `:16`.
- **Nothing to expose.** `HeaderRibbon` calls no `defineExpose` in **either** build (the producer SFC, read whole, has none; the installed `.d.ts` types an empty exposed record). `InstanceType<typeof HeaderRibbon>` yields no public API.
- **Double indirection.** It exposes the `Ref`, not the instance.

> **Correction to the prior pass.** It asserted this was "twice reported already", citing `V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md:22` and `V/../G/audit/a-frontend-encapsulation.md:78`. **Neither citation survives.** The first path does not exist (the letter is `V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md`, and `grep -n "defineExpose\|headerRibbonRef"` over it returns **nothing**); the second file does not exist at all. The finding is true — I verified it independently above — but its provenance was not. Filed on the tree alone.

**Falsifier.** Any `$refs`/template-ref read reaching `headerRibbonRef`, or a `defineExpose` appearing in either `HeaderRibbon`.

---

## 4. MINOR / INFO

**C-9 · `#tabs-content` drops its scoped props ✦ NEW.** `ControlsPaneWrapper.vue:77–85` publishes `:selected-animation` and `:is-playing`; `AnimationControlsGroup.vue:41–43` forwards with `v-bind="slotProps"`; `EditorShell.vue:92–94` forwards **without** — asymmetric with its own `:88` and `:96`, which both bind. Corroborating prose: `scenes/cube/CubeScene.vue:167` — *"the `tabs-content` slot chain does not forward it — ControlsPaneWrapper/App re-expose only selectedAnimation"* — a scene already reaching into the store around this chain. **Falsifier:** no consumer needs them on that slot — true at HEAD (`App.vue:61` ignores them), which is why MINOR not MAJOR.

**C-10 · a document-level side effect from a mid-tree component.** `:133` `initIOSPlatformClass()` in setup body → `document.documentElement.classList.add("ios")` (`iosTextEntry.ts:14–18`). Idempotent, so harmless — but misplaced against the demo's own two declared homes: `main.ts:1–9` ("the demo's real module-graph root") and `AnimationControlsGroup.vue:114–118` (`DemoGlobalChrome` owns "document-level singletons… they resolve against the DOCUMENT"). **Falsifier:** either already calling it — `grep -rn "initIOSPlatformClass" demo/` hits only `iosTextEntry.ts:14` and `EditorShell.vue:115,133`.

**C-11 · three tooltip idioms across four sibling controls.** glass `<Tooltip>` on the shortcuts Button (`:30–43`); native `title` on `DarkModeToggle` (`:45`); bare `aria-label`, no tooltip, on the SharePopover trigger (`SharePopover.vue:5`); native `title` on SharePopover's own buttons (`:27,36`). The `title` is additionally **state-blind**: the primitive already computes a live accessible name (`dist/dark-mode-toggle.js`: `"aria-label": isDark ? "Switch to light mode" : "Switch to dark mode"`), and a static hover string layers a permanently-stale label over it.

**C-12 · the header tooltip is 7× slower than every other tooltip in the app.** `:30` carries no `delay-duration` and sits **outside** `<main>` (`:74`), so its nearest provider is `App.vue:3` — bare. reka defaults to `delayDuration: 700`; every instrument tooltip runs at 100/0 (`AnimationControlsGroup.vue:2`, `ChannelControls.vue:2`). *Perceptual severity: UNPROVEN-NEEDS-LIVE.*

**C-13 · asymmetric emit plumbing.** `:85` `@play-state-change="onPlayStateChange"` vs `:86` `@start-state-change="(s: boolean) => emit('startStateChange', s)"`; `:192` `onPlayStateChange` adds nothing over the inline form. Two identical pass-throughs, two spellings.

**C-14 · `any` at the shell's widest prop.** `:137` `animationGroup: AnimationGroup<any>`, repeated at `AnimationControlsGroup.vue:141` and downstream. `import type` (`:128`), so erased at build — a contract-quality defect, not a runtime one. **Falsifier:** a discriminated scene-target union `AnimationGroup` could be parameterised over across all seven scenes; I found none, so MINOR rather than MAJOR.

**C-15 · adjacent-line subpath inconsistency.** `:124` `Button` from the root barrel beside `:125` `Tooltip*` from `/tooltip`, with `./button` present in the 73-entry map. `KeyboardShortcutsModal.vue:41–47` does the same with `Dialog*`. **Explicitly not a bundle-size claim** — `sideEffects` is CSS-only and `dist/glass-ui.js` is a pure re-export barrel, so bundlers shake it. Consistency/legibility only; I checked so as not to file a false one.

**C-16 · two host slots with zero hosts.** `:18` `#header-left` (no fallback — renders nothing in every live mount) and `:19` `#header-right` (fallback always taken). `App.vue:28–102` supplies six of the shell's eight slots; these two have no consumer anywhere, and under C-1 anything placed in them would be inert regardless.

**C-17 · the z-contract prose is short one layer ✦ NEW.** `styles/style.css:27–39` enumerates the glass-ui scale it claims to single-source (`--z-behind/-content/-controls/-bar/-dock/-overlay/-popover/-modal`) but omits `--z-header: 35` (`glass-ui/dist/styles/tokens/scheme-motion.css`), the layer `.header-ribbon` occupies between `--z-bar` (30) and `--z-dock` (40). The *value* is right — the ribbon does out-paint the shell's `z-controls` start screen (`:60`) as intended. The documented contract simply omits the layer the shell's own chrome sits in. **Falsifier:** `--z-header` appearing in the demo's list — it does not.

**C-18 · unused binding ✦ NEW.** `const props = withDefaults(…)` at `:135`; `grep -n "props" EditorShell.vue` returns that single line. `<script setup>` compiles template reads against `__props`, so it is genuinely unread. Not caught: no `noUnusedLocals` in `tsconfig.json`, `lint` is `depcruise src` (source-only, not SFCs), no eslint, and no `vue-tsc` (C-6).

**C-19 · the value.js parse coupling ✦ NEW.** Probed against the installed `@mkbabb/value.js@4.0.0`:

```
"hsl(300 75% 60%)"                   -> OK
"oklch(0.7 0.1 200)"                 -> OK
"oklch()"                            -> THROW TypeError: Cannot read properties of undefined (reading 'replace')   ← R1
"color-mix(in srgb, red 50%, blue)"  -> NOT-OK  ({ok:false}, no throw)
"#C462D8"                            -> OK
```

`scenes/square/useSquareTumble.ts:11–25` reads `--rainbow-violet/-cyan/-green` via `getComputedStyle` and feeds the **text** to `parseCssColor`, throwing on `!ok`. Those tokens are `hsl(...)` today (`design-idioms.css:18,20,21`), so the site is green. But EditorShell's own `<style scoped>:239–248` establishes `color-mix(in srgb, …)` as *the* idiom for the demo's graph tokens — exactly the form value.js 4.0.0 rejects. A retint of `--rainbow-*` into the shell's own idiom converts a styling change into a runtime throw two components away. **Falsifier:** value.js gaining `color-mix()` support, or the square scene ceasing to throw on `!ok`.

**C-20 · a leaf importing the app cascade root.** `:131`, duplicated at `main.ts:18` and acknowledged there (`main.ts:16`). **No cascade-order hazard** — `main.ts:11` imports `App.vue` before `:18`, so ES evaluation order puts EditorShell's copy first either way; I verified before filing, to avoid claiming an ordering bug that does not exist. Residual point is coupling: no host can mount the shell without tailwind + the whole glass-ui cascade + the demo idiom sheet.

**C-21 · zero test coverage on the entire glass seam.** `grep -rln "EditorShell\|HeaderRibbon\|header-ribbon" test/` → **no output**. Nothing guards the prop names, the ribbon's reachability, the `SharePopover` wiring, or the provider requirement. C-1, C-3, C-4 and C-5 are all cheap to pin with a mount test; none is pinned. With C-6 (no SFC type-check) this is the full extent of the gate: **there is none**.

**C-22 · a dead twin in the same barrel.** `shell/index.ts:2` exports `EditorHeader.vue`; `grep -rn "EditorHeader" demo/` hits only that line. It mounts the same `<SharePopover />` unwired (`:23`). The barrel publishes two competing header implementations, one dead, both carrying C-3.

---

## 5. Cleared — claims I formed and then killed

Recorded because "a false defect is worse than a missed one," and because each is an obvious first suspicion.

| suspicion | verdict | why |
|---|---|---|
| `registerShortcut("?")` (`:190`) discards its disposer → leak + N-fold toggle across remounts | **CLEARED** | `dist/keyboard.js`: `t() && n(l)` — `getCurrentScope() && onScopeDispose(unregister)`. Called in `<script setup>`, so it auto-disposes. |
| `"?"` never matches (needs Shift) | **CLEARED** | `dist/keyboard.js`: `let i = e.key.length === 1 && e.shiftKey && !t.shift;` explicitly exempts single-char shifted keys from the shift comparison. |
| `class` on `DarkModeToggle` dropped by `inheritAttrs: false` | **CLEARED** | `dist/dark-mode-toggle.js` destructures `class` out of attrs and re-merges via `cn(…)`. (The *geometry* consequence is not cleared — that is C-5, which this check does not reach.) |
| `--z-header` undefined → `z-index: auto` → ribbon occludable | **CLEARED** | defined at `glass-ui/dist/styles/tokens/scheme-motion.css` (`--z-header: 35`). Only the demo's *prose* omits it → C-17. |
| `<Transition name="fade" appear>` (`:52`) has no keyframes | **CLEARED** | `.fade-*` ship in `glass-ui/dist/styles/transitions.css`, loaded via `style.css:3`. Correct use of the design system's transition vocabulary. |
| duplicate `style.css` import breaks cascade order | **CLEARED** | see C-20. |
| the R1 `parseCssColor("oklch()")` crash class is reachable through this shell | **CLEARED (conduit, not originator)** | `grep -rn "@mkbabb/value.js" demo/components/instrument/shell/` → **zero**. The subtree's only value.js edges are `clamp`/`cubicBezierToString` from `/math` and `bezierPresets`/`JumpPosition` from `/easing` — all valid subpaths in value.js 4.0.0's exports map. The demo's only `parseCssColor` site enters through the `#target` slot (`:101`) as host-supplied scene content, and measurement shows R1 fires **only** on the degenerate empty `oklch()`, which nothing in this graph constructs. **Sharpens `lane-library.md` §4.6** rather than contradicting it: EditorShell contributes no parser edge, so an R1 fix carries no EditorShell-side obligation. The live coupling is `color-mix()` → C-19. |
| `AnimationGroup` type import drags the value.js-bearing HEAVY barrel into the shell | **CLEARED** | `import type` at `:128`; erased at build. The LIGHT/HEAVY boundary (`lane-library.md` §3.3) is not crossed here. |

---

## 6. Superlatives (L-18 runs both ways)

**S-1 · the `<main>` landmark reasoning (`:67–74`) is correct and non-obvious.** The comment states that `display: contents` strips both the layout box *and* the implicit `main` role from the a11y tree, and that `place-self-stretch` on a real box reproduces the previous geometry exactly. Both halves are true, and the second is the part most authors get wrong when retreating from `display: contents`. One `<main>`, correctly placed, no layout regression. *Falsifier: a second `<main>` — `grep -rn "<main" demo/` returns only this one.*

**S-2 · the `@supports not (height: 100dvh)` block (`:208–221`) supplies both axes with a stated reason.** Most `dvh` fallbacks patch height and leave `w-dvw` broken; this one notes that a browser lacking `dvh` lacks `dvw` (same spec) and supplies `width: 100vw` alongside, correctly scoped to the two classes that use the units.

**S-3 · the graph-paper substrate (`:238–259`) consumes tokens the way the design system intends.** Four `linear-gradient` layers reading `--graph-pitch`/`--graph-major` through `color-mix(in srgb, var(--foreground) var(--graph-opacity, 5%), transparent)`, so the dark theme retints from the *same four rules* and the duplicated dark data-URI it replaced is gone, not forked. Every custom property carries a fallback. The correct answer to `feedback_root_styling` and to "no legacy beside the replacement", and the comment records the measurement (12 % major-line opacity, above the former 0.10α floor) that justifies it.

**S-4 · the import boundary is clean.** Zero direct `reka-ui` imports; zero local `ui/` shadcn copies; zero `cva`/`clsx`/`tailwind-merge`; zero raw `z-[N]` — the three z-classes used come from the glass-ui-sourced ordered layer. reka is reached only transitively through glass-ui: the correct topology. **Folds census F-6** and confirms it holds at this file. Every defect above is *misuse* of a clean boundary, never a breach of it.

**S-5 · the in-flight migration's direction is right.** It correctly retired the two subpaths 7.0.0 genuinely deleted (`/icon-tooltip`, `/controls` — both absent from the exports map, so HEAD is literally unbuildable), correctly renamed `position` → `placement`, and correctly dropped the `#anchor` forwarding whose slot props `{pinned, toggled}` were already stale (the installed artifact passes only `{pinned}`, so `toggled` was permanently `undefined` at HEAD). Four of five obligations landed. C-1, C-5 and C-8 are what remains.

---

## 7. Corpus reconciliation

| corpus id | source | this challenge |
|---|---|---|
| **F-1** phantom glass-ui dependency | `lane-frontend.md` §2 | **FOLDED + ESCALATED** → C-2. Three new facts: HEAD is provably unbuildable against the installed artifact without an install; the drift is *content*-shaped (a version pin would not fix it); and the width-knob tell proves the installed copy **predates the producer's cut**. |
| **F-6** clean glass-ui boundary (GREEN) | `lane-frontend.md` §0 | **CONFIRMED at this file** → S-4. |
| **S-2 / F-3** type-only `/tabs` (AMBER) | `lane-frontend.md` §5 | **FOLDED + SHARPENED** → C-7. `EditorShell.vue:126` is one of S-2's three sites; the tree adds that here the borrowed contract has *zero producers* and the terminal fork *drops 2 of its 5 fields*. |
| **S-1** `KfPillTabs` fork (RED) | `lane-frontend.md` §5 | **CONSEQUENCE MEASURED** at the far end of the `extraTabs` chain (C-7); and C-1 is the **same disease one axis over** — a rationale written against a glass-ui the tree no longer has. No independent claim on the fork itself. |
| **S-5 / S-8** `AnimatedText` / `TypingDots` | `lane-frontend.md` §5 | Both enter this graph only through the `#start-screen` fallback and App's override. S-8's "keep" verdict stands; unaffected by this axis. |
| **S-7** `CopyButton` (partial shadow + runtime style injection) | `lane-frontend.md` §5 | **Counter-example in the same subtree:** `SharePopover.vue:22–39` uses glass `Button` + `Input` for its copy affordance with no style injection. |
| **§4.6** demo parse consumers / R1 blast radius | `lane-library.md` | **SHARPENED, not contradicted** → §5 row 7 + C-19. EditorShell carries no value.js edge; R1 enters via the `#target` scene slot and fires only on the degenerate `oklch()`. The live coupling is `color-mix()`, measured. |
| **§8** the glass-ui ↔ keyframes.js self-alias cycle | `lane-frontend.md` | **NOT CONTRADICTED.** The only kf edge is `import type { AnimationGroup }` (`:128`), erased at build, so the alias is not exercised here. |
| HeaderRibbon persistent-only letter | `V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md` | **FOLDED** → C-2. It names `EditorShell.vue:16` the sole consumer and prescribes *zero behavior change*; the working tree over-applied it by adding a deleted prop. Its "dead width knob" line is the tell that dates the installed artifact. |
| glass-ui consumer census | `glass-ui/docs/consumer-evidence/header-ribbon.md` | **FOLDED** → C-2. Names EditorShell the sole real `/header-ribbon` consumer in the constellation — which is why C-1/C-2 are BLOCKER: there is no second consumer whose breakage would have caught this. |
| prior pass at this path | same file, earlier run | **2 blockers CONFIRMED** by independent re-derivation; **2 citations CORRECTED** (C-8, §3); **6 findings ADDED** (C-5, C-6, C-9, C-17, C-18, C-19). |

**No corpus claim is contradicted by the tree.** One is applied in reverse by the working tree itself (the `mode` deletion), and that is C-1.

---

## 8. Repair order (consumption axis only; nothing written to product source)

1. **C-2 first.** Declare `@mkbabb/glass-ui` in `package.json`, regenerate the lock with an integrity hash, reinstall. Nothing below is reproducible until the artifact is determined — this is lane-frontend's "F-1 first", now with a proven stale artifact behind it.
2. **C-6 next.** Add `vue-tsc` and put SFC checking in `check`. C-1, C-5, C-7 and C-18 are all in the class it catches; without it every repair below can silently regress.
3. **C-1.** Delete `mode="persistent"` (the letter's prescription was the `placement` rename and nothing else). If the post-(1) artifact still carries the disclosure machinery, either supply a real focusable `#anchor` or stop consuming `/header-ribbon` for the app's only Share / Shortcuts / Dark-mode controls.
4. **C-3.** Thread `onSceneRestore`, or delete the shell's copy and let the dock's wired one stand — which also settles C-22.
5. **C-5.** Restore the primitive's size axis (`size="…"`), drop `aspect-square w-8` from both controls.
6. **C-4.** Self-provide `TooltipProvider`, or declare the requirement on the barrel export.
7. **C-21.** Pin C-1/C-3/C-4/C-5 with mount tests before touching anything else in `shell/`.
8. **C-7, C-8, C-16, C-18.** Delete the phantom-host contract surface, the dead expose, the dead slots, the unused binding — after 3 and 4, since `#header-left`/`#header-right` may become the landing for a persistent cluster.
9. **C-9..C-15, C-17, C-19, C-20.** Contract-fidelity and idiom cleanups; each independently landable.
