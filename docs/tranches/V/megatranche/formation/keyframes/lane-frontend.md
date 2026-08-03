claude-opus-5[1m]

# Lane · keyframes.js DEMO/FRONTEND census

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo` (located; the demo is an in-repo tree, not a workspace package)
**Mode:** static, read-only. No installs, no dev servers, no browser tooling.
**Census date:** 2026-08-03. Tree HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group` (`git log --oneline -12`).

---

## 0. Headline

| # | Finding | Severity |
|---|---|---|
| F-1 | `@mkbabb/glass-ui` is a **phantom dependency** — absent from `package.json` AND `package-lock.json`, yet 7.0.0 sits installed in `node_modules`. | **RED** |
| F-2 | `KfPillTabs` (217 lines) forks glass-ui `SegmentedTabs` over a **4.0.1** ARIA bug that is **fixed in the installed 7.0.0**. | **RED** |
| F-3 | Demo consumes glass-ui `/tabs` **type-only** (3 sites) while rendering a bespoke tablist. | AMBER |
| F-4 | glass-ui ships a whole `/timeline` family; the demo hand-rolls its 4-component timeline cluster (666 lines). | AMBER |
| F-5 | One **dead** backwards-compat re-export shim (0 consumers) — violates `feedback_no_backwards_compat`. | AMBER |
| F-6 | Zero local `ui/` shadcn copies, zero direct `reka-ui` imports — the glass-ui boundary is otherwise **clean**. | GREEN |

---

## 1. Scale of the tree

```
$ cd demo && find . -type f | wc -l                      → 206
$ find . -name "*.vue" | wc -l                           → 58
$ find . -name "*.vue" -exec cat {} + | wc -l            → 11984
$ find . -name "use*.ts" | wc -l                         → 71
$ find . -name "*.css" | wc -l                           → 12   (2137 lines, summed below)
$ grep -rlc "<style" --include="*.vue" . | wc -l         → 40   (.vue files carrying a <style> block)
```

Seven scenes (`app/scene/scenes.ts:129–182`): `home` (HOME_SCENE_ID), `cube`, `amiga`, `square`, `easing`, `spring`, `sequence`.

**Engine dogfooding:** 68 files import the library under test —
`grep -rl "@kf-engine\|from \"@mkbabb/keyframes.js\"" --include="*.vue" --include="*.ts" . | wc -l → 68`.
The demo is the library's own proving ground (the "inv-ζ seam" named at `components/instrument/shell/TypingDots.vue:8`).

---

## 2. glass-ui: pinned version vs producer latest

| Fact | Value | Probe |
|---|---|---|
| Producer latest | **7.0.0** | `/Users/mkbabb/Programming/glass-ui/package.json` → `"version": "7.0.0"` |
| Declared in `package.json` | **ABSENT** | `grep -n "mkbabb" package.json` → only `"@mkbabb/value.js": "4.0.0"` (line 69) and repo-URL/name lines |
| Declared in `package-lock.json` | **ABSENT** | `grep -c "glass-ui" package-lock.json` → **0** |
| Installed in `node_modules` | **7.0.0** | `node_modules/@mkbabb/glass-ui/package.json` → `"version": "7.0.0"` |
| Install shape | real directory, **not** a symlink | `ls -ld node_modules/@mkbabb/glass-ui` → `drwxr-xr-x  6 mkbabb wheel 192 Jul 16 05:17` |
| Git submodule? | no | `.gitmodules` declares only `docs/precepts` |

### F-1 — the phantom dependency (RED)

The only `@mkbabb` entry in the lockfile is value.js:

```
$ grep -n "node_modules/@mkbabb" package-lock.json
611:        "node_modules/@mkbabb/value.js": {
```

Yet 42 demo files import from `@mkbabb/glass-ui`, and `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` is load-bearing for the entire cascade.

**Consequence (deduction, not executed — installs are forbidden by lane law):** `npm ci` reconstructs `node_modules` strictly from the lockfile. With zero glass-ui entries there, a clean checkout has no glass-ui to resolve, and both `vite build --mode gh-pages` and `npm run dev` fail at the first import. The working tree survives only because the `Jul 16 05:17` install predates whatever removed the declaration.

Note the contrast with HEAD~1's message: `a59d3a22 fix(dependencies): consume Glass UI 6 from one registry core` — the commit narrates a *Glass 6* registry consolidation while the installed artifact is *7.0.0* and the declaration is gone entirely. The version pin is unreproducible in both directions: no floor, no ceiling, no lock.

**Also stale:** `.npmrc` is `legacy-peer-deps=true` (single line, no newline) — peer-dep drift is silently absorbed.

---

## 3. glass-ui usage census

```
$ grep -rn "@mkbabb/glass-ui" --include="*.vue" --include="*.ts" --include="*.css" . | wc -l   → 82   (import/mention lines)
$ grep -rl "@mkbabb/glass-ui" --include="*.vue" --include="*.ts" --include="*.css" . | wc -l   → 42   (files)
$ grep -rl "@mkbabb/glass-ui" --include="*.vue" . | wc -l                                      → 37   (.vue files)
```

58 `.vue` total − 37 glass-consuming = **21 `.vue` with no glass-ui import**.

### 3.1 Subpath consumption — 21 distinct of 73 available

`node -e '...Object.keys(exports)'` on the installed package → **73** subpath exports. The demo reaches 21:

| count | subpath | | count | subpath |
|---|---|---|---|---|
| 31 | `@mkbabb/glass-ui` (root) | | 2 | `/status-dot` |
| 6 | `/tooltip` | | 2 | `/easing` |
| 5 | `/forms` | | 2 | `/chip` |
| 5 | `/dock` | | 1 | `/toggle-group` |
| 4 | `/styles` | | 1 | `/styles/fonts` |
| 4 | `/labeled-field` | | 1 | `/motion-core` |
| 3 | `/tabs` | | 1 | `/metric` |
| 3 | `/keyboard` | | 1 | `/header-ribbon` |
| 3 | `/dark-mode-toggle` | | 1 | `/fading-scroll` |
| 3 | `/dark` | | 1 | `/drawer` |
| | | | 1 | `/aurora` |

**Utilisation: 21/73 ≈ 29%.** The unreached 52 include `/timeline`, `/typewriter`, `/pulse`, `/pager-dots`, `/instrument-chassis`, `/number-field`, `/progress`, `/surface`, `/skeleton`(root-reachable) — several of which are exactly what the bespoke components below reimplement (§5).

### 3.2 Named-import surface (exact lines)

Root barrel `@mkbabb/glass-ui` — components drawn: `Avatar`, `AvatarImage`, `Button`, `Card`, `CardContent`, `CardTitle`, `Dialog`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogTitle`, `DialogTrigger`, `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `Label`, `Popover`, `PopoverContent`, `PopoverTrigger`, `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `Separator`, `Slider`, `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`, `useTouchGate`.

Representative lines (all 82 available via the grep above):

```
app/App.vue:145:import { TooltipProvider } from "@mkbabb/glass-ui/tooltip";
app/dock/ChromeDock.vue:6-11:import { GlassDock, DockControl, DockTrigger, DockSeparator } from "@mkbabb/glass-ui/dock";
app/dock/ChromeDock.vue:29:import { StatusDot } from "@mkbabb/glass-ui/status-dot";
app/dock/MbabbMenu.vue:83:import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";
app/transition/useSceneSwap.ts:2:import { supportsViewTransitions } from "@mkbabb/glass-ui/motion-core";
components/instrument/keyframes/CSSCodeEditor.vue:38:import { useGlobalDark } from "@mkbabb/glass-ui/dark";
components/instrument/keyframes/KeyframeCard.vue:58:import { Input } from "@mkbabb/glass-ui/forms";
components/instrument/shell/EditorShell.vue:116:import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";
components/instrument/shell/EditorShell.vue:122:import { registerShortcut } from "@mkbabb/glass-ui/keyboard";
components/instrument/shell/HeroAurora.vue:37-41:import { Aurora, PAPER_WASH_GROUND, resolveAtoms } from "@mkbabb/glass-ui/aurora";
components/instrument/shell/KeyboardShortcutsModal.vue:48-51:import { useRegisteredShortcuts, formatComboParts } from "@mkbabb/glass-ui/keyboard";
components/instrument/transport/channel-controls/ChannelOptions.vue:423:import { LabeledSelect, LabeledInput } from "@mkbabb/glass-ui/labeled-field";
components/instrument/transport/channel-controls/LayerConfigPanel.vue:74:import { LabeledField, LabeledSelect, LabeledSlider, LabeledSwitch } from "@mkbabb/glass-ui/labeled-field";
components/instrument/transport/channel-controls/TimingFunctionPanel.vue:57-61:import { EasingPicker, type EasingPickerValue, type JumpTerm } from "@mkbabb/glass-ui/easing";
components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:166:import { Drawer, DrawerContent, DrawerTitle } from "@mkbabb/glass-ui/drawer";
scenes/easing/EasingTarget.vue:137:import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
scenes/easing/EasingTarget.vue:139:import { ToggleGroup, ToggleGroupItem } from "@mkbabb/glass-ui/toggle-group";
scenes/sequence/SequenceTarget.vue:138:import { Metric } from "@mkbabb/glass-ui/metric";
styles/style.css:3:@import "@mkbabb/glass-ui/styles";
styles/style.css:9:@import "@mkbabb/glass-ui/styles/fonts";
```

### 3.3 shadcn-style local `ui/` copies — **ABSENT**

```
$ find . -type d -name "ui"        → (no output)
$ grep -rn "class-variance-authority\|tailwind-merge\|from \"clsx\"" --include="*.vue" --include="*.ts" .
                                    → (no output)
```

No vendored primitive tree, no local `cn()` util, no cva variant factories anywhere in `demo/`. (`class-variance-authority`, `clsx`, `tailwind-merge` sit in `package.json:81,82,100` as devDeps but are **unused by demo source** — they are transitive build-surface only.) This is the clean half of the picture: value.js's `demo/@/components/ui/` ~178-file shadcn vendoring has **no counterpart here**.

### 3.4 Direct `reka-ui` imports — **ZERO**

```
$ grep -rn "from \"reka-ui\"\|from 'reka-ui'" --include="*.vue" --include="*.ts" .   → (no output)
```

`reka-ui` is mentioned in 8 lines across 4 files, and **every one is a comment or a CSS-selector-targeting note**, never an import:

```
scenes/cube/CubeScene.vue:43:// (re-sourced from reka-ui here) are now ORPHANS — this throws "Injection
styles/tab-idiom.css:6,8,10,73        (rules targeting reka-ui's generated DOM)
styles/playback-idiom.css:5,8         (.btn-playback* land on reka-ui <Button> DOM)
components/playback/PlaybackRibbon.vue:86:// global rules — the .btn-playback* classes land on reka-ui's <Button> DOM
```

reka is reached **only transitively through glass-ui** — the correct topology. The demo does reach *around* glass-ui at the CSS layer (styling reka's generated DOM directly, `tab-idiom.css` / `playback-idiom.css`), which is a soft coupling to glass-ui's internal render tree, but not an import-boundary breach.

---

## 4. Component roster (58 `.vue`, 11 984 lines)

Legend: **G** = imports glass-ui · **b** = no glass-ui import.

### app/ — shell, dock, scene routing (1 094 lines)

| L | file | G/b | purpose |
|---|---|---|---|
| 387 | `app/App.vue` | G | app shell; `TooltipProvider` root; view-transition host (`:114`, `:357`) |
| 385 | `app/dock/ChromeDock.vue` | G | routed chrome dock — `GlassDock`/`DockControl`/`DockTrigger`/`DockSeparator` + `StatusDot` + `Select*` |
| 121 | `app/dock/MbabbMenu.vue` | G | author menu — `Avatar`, `DropdownMenu*`, `DarkModeToggle`, `DockTrigger` |
| 101 | `app/App.skeleton.vue` | b | `SceneSkeleton` — `<Suspense>` fallback, glass-plate shimmer (`:6`) |

### components/instrument/keyframes/ — CSS editor (1 022 lines)

| L | file | G/b | purpose |
|---|---|---|---|
| 284 | `KeyframesEditor.vue` | G | keyframe editing surface — `Card`, `CardContent`, `Slider` |
| 229 | `CSSCodeEditor.vue` | G | Monaco host; `useGlobalDark` for theme sync |
| 185 | `KeyframesStringControls.vue` | b | raw-CSS string control strip (async-loaded, `ChannelControls.vue:252`) |
| 161 | `components/KeyframesAddDialog.vue` | G | add-keyframe dialog — `Dialog*` + `Button` + `CardTitle` |
| 82 | `components/KeyframeCardList.vue` | G | card list — `Separator` |
| 81 | `KeyframeCard.vue` | G | single keyframe card — `Label` + `Input` |

### components/instrument/shell/ — editor chrome (1 070 lines)

| L | file | G/b | purpose |
|---|---|---|---|
| 261 | `EditorShell.vue` | G | shell frame — `HeaderRibbon`, `registerShortcut`, `DarkModeToggle`, `Button`, `Tooltip*` |
| 191 | `EditorStartScreen.vue` | b | first-paint hero; hosts `AnimatedText` + `TypingDots` |
| 128 | `HeroAurora.vue` | G | hero backdrop — `Aurora`, `PAPER_WASH_GROUND`, `resolveAtoms` |
| 126 | `AnimatedText.vue` | b | **per-char hero uplift** (`:1` "T P-HERO / OD-4"); sr-only a11y mirror |
| 125 | `TypingDots.vue` | b | engine-driven typing dots (N spans, each its own animation) |
| 108 | `EditorHeader.vue` | G | header bar — `DarkModeToggle` |
| 69 | `KeyboardShortcutsModal.vue` | G | shortcuts modal — `Dialog*` + `useRegisteredShortcuts`/`formatComboParts` |
| 62 | `SharePopover.vue` | G | share popover — `Popover*`, `Button`, `Input` |

### components/instrument/timeline/ — timeline cluster (746 lines)

| L | file | G/b | purpose |
|---|---|---|---|
| 312 | `KeyframeTimeline.vue` | G | timeline root — but glass imports are only `Button`/`Card`/`CardContent`/`Separator`/`Input`/`Tooltip*` |
| 246 | `components/TimelineTrack.vue` | G | track lane render — `Tooltip*` only |
| 80 | `CSSPasteDialog.vue` | G | paste-CSS dialog — `Dialog*` + `Button` |
| 70 | `TimelineCaret.vue` | b | **hand-rolled playhead caret** (absolute-positioned, `%`-driven) |
| 38 | `components/TimelineHoverPreview.vue` | b | hover thumbnail (html2canvas capture) |

### components/instrument/transport/ — transport + channel controls (2 705 lines)

| L | file | G/b | purpose |
|---|---|---|---|
| 609 | `channel-controls/ChannelOptions.vue` | G | per-channel option grid — `Card*`, `Select*`, `Separator`, `DockControl`, `Tooltip*`, `LabeledSelect`/`LabeledInput` |
| 456 | `channel-controls/ChannelControls.vue` | G | channel host — `TooltipProvider`, `Button`; **renders `<KfPillTabs>` (`:74`)** |
| 403 | `TransportDock.vue` | G | bottom transport dock — `DockControl`/`DockTrigger`/`DockSeparator`/`GlassDock`, `Select*`, `Tooltip*`, `StatusDot` |
| 336 | `AnimationControlsGroup.vue` | G | controls group — `TooltipProvider` + `type SegmentedTabOption` |
| 319 | `controls-pane/ControlsPaneWrapper.vue` | G | pane wrapper — `Drawer*` + `type SegmentedTabOption` |
| 166 | `channel-controls/TimingFunctionPanel.vue` | G | easing editor — `EasingPicker` + `Button` |
| 151 | `controls-pane/RibbonBar.vue` | G | ribbon — `Button`, `Card`, `CardContent` |
| **124** | **`KfPillTabs.vue`** | **b** | **bespoke `role=tablist` pill strip — see F-2** |
| 92 | `channel-controls/LayerConfigPanel.vue` | G | layer config — `LabeledField`/`LabeledSelect`/`LabeledSlider`/`LabeledSwitch`, `Input`, `Separator` |
| 49 | `components/DemoGlobalChrome.vue` | b | document-level singletons (SVG paint-server defs + `<html>` teleport) |

### components/playback/ + shared (613 lines)

| L | file | G/b | purpose |
|---|---|---|---|
| 256 | `playback/AnimationVisualizer.vue` | G | visualizer — `useTouchGate` |
| 244 | `playback/PlaybackRibbon.vue` | G | playback ribbon — `Button`, `Slider`, `useTouchGate`, `Tooltip*` |
| 113 | `components/CopyButton.vue` | b | clipboard button; **injects `@keyframes` as a runtime JS string (`:70`, `:83`)** |

### scenes/ — 7 scene trees (4 734 lines)

| L | file | G/b | purpose |
|---|---|---|---|
| 470 | `spring/SpringTarget.vue` | G | spring subject — `Card` |
| 352 | `cube/orbital-drag/OrbitalDrag.vue` | b | pointer/pinch/inertia orbital drag harness |
| 338 | `spring/SpringHeatmap.vue` | G | parameter heatmap — `useGlobalDark` |
| 335 | `easing/EasingTarget.vue` | G | easing subject — `Card`, `FadingScroll`, `Chip`, `ToggleGroup*` |
| 331 | `square/SquareScene.vue` | G | square scene — `Card` |
| 287 | `cube/CubeScene.vue` | G | cube scene — `Popover*`, `Button` |
| 271 | `amiga/AmigaScene.vue` | b | Three.js Amiga-ball scene |
| 252 | `sequence/SequenceTarget.vue` | G | sequence subject — `Button`, `Card`, `Metric` |
| 242 | `spring/SpringPhysicsFacet.vue` | G | physics facet — `Card*`, `LabeledSlider`, `Chip` |
| 239 | `cube/CubeTarget.vue` | b | cube subject plane |
| 234 | `easing/EasingSidebar.vue` | G | easing sidebar — `Card*`, `LabeledSlider`, `EasingPicker` |
| 216 | `spring/StartingStyleTarget.vue` | G | `@starting-style` demo — `Button`, `Card` |
| 212 | `square/SquareInstrument.vue` | b | square instrument panel |
| 204 | `spring/SpringScene.vue` | G | spring scene — `Button` |
| 162 | `sequence/SequenceScrubber.vue` | b | **master scrubber, rail/ball idiom (`:1`)** |
| 158 | `cube/matrix-editor/MatrixEditor.vue` | G | matrix editor — `Slider`, `Card*`, `Input` |
| 133 | `easing/EasingScene.vue` | b | easing scene shell |
| 129 | `spring/SpringTrace.vue` | b | spring trace plot |
| 90 | `cube/CubeAxisLines.vue` | b | axis lines (raw `z-index:-10`) |
| 87 | `sequence/SequencePlayhead.vue` | b | sequence playhead |
| 49 | `sequence/SequenceAxis.vue` | b | sequence ruler axis |
| 43 | `sequence/SequenceScene.vue` | b | sequence scene shell |

---

## 5. BESPOKE → GLASS-UI SHADOW CENSUS (the commissioned flag)

Primitive roster sourced from the **installed** copy (`node_modules/@mkbabb/glass-ui/dist/`), i.e. exactly what the demo already has on disk — no upgrade required for any replacement below.

### S-1 · `KfPillTabs` → `SegmentedTabs` + `useTabRovingFocus` — **RED, 217 lines, stale rationale**

| bespoke | lines |
|---|---|
| `components/instrument/transport/KfPillTabs.vue` | 124 |
| `components/instrument/transport/KfPillTabs/useKfPillTabs.ts` | 93 |
| **total** | **217** |

The fork is *documented*, and the documentation is what condemns it. `KfPillTabs.vue:1–13`:

> `R.W6 / DM-5 CONTINGENCY KILL — a kf-internal, ARIA-compliant pill tab strip. It replaces <SegmentedTabs variant="pill" :aria-orientation= undefined-suppress at the two band-aid sites (SpringSidebar + AnimationControls): glass-ui 4.0.1's SegmentedTabs emits the orientation attribute UNCONDITIONALLY on its role=group pill variant (a WCAG breach on a non-composite container)…`

**The cited defect is fixed in the installed 7.0.0.** The emission is now conditional:

```
$ grep -n "aria-orientation" node_modules/@mkbabb/glass-ui/dist/tabs.js
97:	"aria-orientation",
232:			"aria-orientation": W.value ? B.value ? "vertical" : "horizontal" : void 0,
```

`… : void 0` — Vue omits the attribute entirely when the binding is `undefined`. The sibling pill implementation is explicit about the `group` case:

```
$ grep -n "aria-orientation" node_modules/@mkbabb/glass-ui/dist/PagerDots-DScQImdx.js
218:			"aria-orientation": t.pattern === "group" ? void 0 : t.orientation,
```

`SegmentedTabs` ships and is reachable: `dist/components/tabs/SegmentedTabs.vue.d.ts`, exported via the `./tabs` subpath.

The composable half is shadowed too — glass-ui ships the identical roving-tabindex core:

```
$ grep -o "declare function useTabRovingFocus[^;]*" node_modules/@mkbabb/glass-ui/dist/components/tabs/composables/useTabRovingFocus.d.ts
declare function useTabRovingFocus(params: UseTabRovingFocusParams): UseTabRovingFocusReturn
```

…which `demo/components/instrument/transport/KfPillTabs/useKfPillTabs.ts:37` reimplements as `export function useKfPillTabs(params: UseKfPillTabsParams)`. Its own header (`:3–4`) already concedes the temporariness:

> `// Roving focus is kept with the local tablist until the published Glass pill material can be used independently of its ARIA role.`

**It is live, not dead** — rendered at `components/instrument/transport/channel-controls/ChannelControls.vue:74` (`<KfPillTabs`), registered async at `components/instrument/transport/index.ts:12`. (Two other files carry only *prose* about a removed strip: `scenes/spring/useSpringDemo.ts:61`, `scenes/spring/SpringPhysicsFacet.vue:7` — "the KfPillTabs strip is gone" refers to the spring site only.)

**Verdict: replace.** 217 lines retire; the blocking rationale is 3 majors stale.

### S-2 · type-only `/tabs` consumption — **AMBER (the S-1 tell)**

```
components/instrument/transport/AnimationControlsGroup.vue:126:import type { SegmentedTabOption } from "@mkbabb/glass-ui/tabs";
components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:165:import type { SegmentedTabOption } from "@mkbabb/glass-ui/tabs";
components/instrument/shell/EditorShell.vue:126:import type { SegmentedTabOption } from "@mkbabb/glass-ui/tabs";
```

All three are `import type`. Probe for the *component*:

```
$ grep -rn "SegmentedTabs\|{ Tabs\|Tabs," --include="*.vue" --include="*.ts" . | grep "glass-ui"
→ 7 hits, ALL comments (KfPillTabs.vue:5, ChannelControls.vue:67/86/209/305, useTabStripScroll.ts:23/47)
```

The demo has adopted glass-ui's tab **data contract** while rejecting its **renderer** — carrying the option shape across a boundary it then re-implements. Comments at `ChannelControls.vue:86` and `useTabStripScroll.ts:23` still describe `<SegmentedTabs>` as owning the strip ("glass-ui 4.0.0 (BA.W-TABS)"), so the prose and the tree disagree.

### S-3 · timeline cluster → glass-ui `/timeline` family — **AMBER, 666 lines**

glass-ui 7.0.0 ships a full timeline suite:

```
$ ls node_modules/@mkbabb/glass-ui/dist/components/timeline/
ContinuousMarkers.vue.d.ts  ContinuousRail.vue.d.ts  ContinuousTimeline.vue.d.ts
GlassTimeline.vue.d.ts      ScrubberTimeline.vue.d.ts  SegmentedTimeline.vue.d.ts
geometry.d.ts  index.d.ts  types.d.ts
```

The `/timeline` subpath is **never imported** by the demo (§3.1). Meanwhile the demo hand-rolls:

| bespoke | lines | glass counterpart |
|---|---|---|
| `timeline/KeyframeTimeline.vue` | 312 | `GlassTimeline` / `SegmentedTimeline` |
| `timeline/components/TimelineTrack.vue` | 246 | `ContinuousRail` + `ContinuousMarkers` |
| `timeline/TimelineCaret.vue` | 70 | `ScrubberTimeline` caret / `geometry` |
| `timeline/components/TimelineHoverPreview.vue` | 38 | marker-tooltip slot |
| **total** | **666** | |

Note `KeyframeTimeline` and `TimelineTrack` *do* import glass-ui — but only leaf chrome (`Button`, `Card`, `Input`, `Tooltip`). The **timeline geometry itself is entirely bespoke**, including percent-positioning arithmetic (`TimelineCaret.vue:4` `left: ${position}%`) that `dist/components/timeline/geometry.d.ts` exists to own.

**Caveat for the replacement wave:** this is the demo's core instrument, and keyframe-editing semantics (drag-to-retime, per-channel lanes, brush apply) may exceed the primitive's contract. Treat as *evaluate*, not *mechanical swap*.

### S-4 · `SequenceScrubber` → `ScrubberTimeline` / `Slider` — **AMBER, 162 lines**

`scenes/sequence/SequenceScrubber.vue:1–6` describes itself as "Master scrubber — the F.W16 rail/ball idiom". glass-ui ships `ScrubberTimeline.vue` (unimported) and `Slider` (already imported elsewhere: `KeyframesEditor.vue:109`, `MatrixEditor.vue:97`, `PlaybackRibbon.vue:92`). A rail-with-ball is the `Slider` primitive's exact shape.

### S-5 · `AnimatedText` → `TypewriterText` — **AMBER, 126 lines**

```
$ ls node_modules/@mkbabb/glass-ui/dist/components/typewriter/
TypewriterText.vue.d.ts  composables  index.d.ts  types.d.ts  utils
```

`/typewriter` is never imported. `components/instrument/shell/AnimatedText.vue` hand-rolls a per-char wave with its own `@keyframes charLift` (`:103`) plus a bespoke sr-only a11y mirror (`:7–8`) — the accessibility concern `TypewriterText` exists to solve centrally.

**Partial justification:** the owner explicitly rejected word-granular animation ("should uplift each individual char", `:3`). Verify `TypewriterText` supports per-char granularity before swapping.

### S-6 · `App.skeleton` → `Skeleton` — **AMBER, 101 lines**

glass-ui exports `Skeleton` from the **root barrel**:

```
$ grep -o "export \* from \"[^\"]*\"" node_modules/@mkbabb/glass-ui/dist/index.d.ts | grep skeleton
export * from "./components/skeleton"
```

`app/App.skeleton.vue` hand-rolls the shimmer plate:

```
81:    animation: scene-skeleton-sweep 1.6s ease-in-out infinite;
85:@keyframes scene-skeleton-sweep {
```

The *stage-geometry composition* is legitimately demo-owned; the **shimmer plate underneath it is the primitive**. Recommend: keep the layout, delegate the plate.

### S-7 · `CopyButton` → `Button` + `Tooltip` — **AMBER, 113 lines**

No copy-specific primitive exists in glass-ui (`grep -rl "Copy" dist/components/*/index.d.ts` → no output), so this is a **partial** shadow: the shell should be glass `Button`, the copy logic stays local. Independently flagged: `CopyButton.vue:70` and `:83` build `@keyframes fade-in` / `fade-out` as **runtime JS template strings** and inject them — style-injection from script, bypassing the cascade entirely. That is its own defect regardless of the glass question.

### S-8 · `TypingDots` — **JUSTIFIED BESPOKE, do not replace**

glass-ui has `Pulse` (`dist/components/pulse/Pulse.vue.d.ts`) and `PagerDots`. But `TypingDots.vue:1–9` states the component exists precisely to **dogfood the keyframes.js engine** — "a dedicated substrate that CAN stagger: N explicit dot `<span>`s, each driven by its OWN engine animation — the inv-ζ seam (the demo's signature animation IS the library, not pure CSS)". Replacing it with a glass primitive would *remove library coverage*. **Keep.**

### Shadow tally

| verdict | components | lines |
|---|---|---|
| **Replace (rationale void)** | S-1 KfPillTabs (+composable) | 217 |
| **Evaluate** | S-3 timeline ×4, S-4 scrubber, S-5 AnimatedText, S-6 skeleton, S-7 CopyButton | 1 168 |
| **Keep (justified)** | S-8 TypingDots | 125 |
| **Bespoke, no glass counterpart** | 12 remaining (scene shells, Three.js, orbital drag, axis/playhead, DemoGlobalChrome, KeyframesStringControls) | ~1 900 |

---

## 6. Styling surfaces

### 6.1 CSS files — 12 files, 2 137 lines

| lines | file | role |
|---|---|---|
| 300 | `styles/design-idioms.css` | demo-owned idioms: `--rainbow-*`, `--color-gold`, `@keyframes enter` (`:278`) |
| 294 | `styles/style.css` | **cascade root** — imports + the z-index ordered-layer contract |
| 259 | `scenes/sequence/SequenceTarget.css` | sequence subject; `@keyframes seq-ruler-wipe` (`:228`), `seq-lane-drop` (`:232`) |
| 223 | `components/instrument/transport/AnimationControlsGroup.css` | controls-group layout |
| 210 | `styles/layout.css` | work-area / dock / rail geometry; `--z-behind` |
| 193 | `scenes/easing/EasingTarget.css` | easing subject |
| 159 | `scenes/square/SquareScene.css` | square scene |
| 154 | `scenes/cube/CubeTarget.css` | cube subject |
| 148 | `components/instrument/transport/controls-pane/ControlsPaneWrapper.css` | pane wrapper |
| 87 | `styles/playback-idiom.css` | `.btn-playback*` — targets **reka-ui's generated DOM** (`:5,8`) |
| 79 | `styles/tab-idiom.css` | tab-panel slide; targets **reka-ui `<TabsTrigger>`** (`:6,8,10,73`) |
| 31 | `styles/brand.css` | brand constants |

Plus **40** `.vue` files carrying a `<style>` block, and `styles/font-roles.json` (a non-CSS token descriptor).

### 6.2 Cascade order — `styles/style.css:1–16`

```
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@import "@mkbabb/glass-ui/styles/fonts";   /* the AUTHORITATIVE Fira Code payload */
@import "./design-idioms.css";
@import "./layout.css";
@custom-variant dark (&:where(.dark, .dark *));
```

Documented intent (`:10–13`): demo idioms land **immediately after** the glass cascade so `--rainbow-*` / `--color-gold` / `@keyframes enter` are the authoritative copy. The fonts note (`:4–8`) records that glass-ui deliberately excludes the OFL woff2 corpus from its `styles` index, so the consumer **must** import `/styles/fonts` or `--font-mono` silently falls back.

### 6.3 Tokens

- **Demo-owned custom properties: 98** (`grep -rhoE "^\s*--[a-z0-9-]+:" styles/*.css | sort -u | wc -l`).
- By prefix: `--work-*` 16, `--color-*` 14, `--dock-*` 11, `--accent-*` 8, `--rainbow-*` 7, `--badge-*` 7, `--face-*` 6, `--spring-*` 4, `--graph-*` 4, `--axis-*` 4, `--font-*` 3, `--tw-*` 2, `--target-*` 2, `--primary-*` 2, `--glow-*` 2, then singletons (`--z-behind`, `--visualizer-*`, `--subject-*`, `--start-*`, `--stage-*`).
- **No `--kf-*` namespace exists** (`grep -rho "\-\-kf-[a-z0-9-]*" styles/*.css | sort -u | wc -l` → **0**). Demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own.
- **z-index is single-sourced from glass-ui** (`style.css:20–24`): the scale lives in `node_modules/@mkbabb/glass-ui/dist/styles/tokens.css`; the demo owns only the documented *order* (`--z-behind` −10 → `--z-modal` 140) and forbids raw `z-[N]` brackets. One acknowledged exception: `CubeAxisLines.vue`'s raw `z-index:-10`.

### 6.4 Animation / motion

**9 `@keyframes` definitions** (21 grep hits total; the rest are prop names, titles, and prose):

| site | name |
|---|---|
| `styles/design-idioms.css:278` | `enter` (shared tab-panel slide; consumed by `tab-idiom.css:72`) |
| `app/App.skeleton.vue:85` | `scene-skeleton-sweep` |
| `components/CopyButton.vue:70` | `fade-in` — **runtime JS string injection** |
| `components/CopyButton.vue:83` | `fade-out` — **runtime JS string injection** |
| `components/instrument/shell/AnimatedText.vue:103` | `charLift` |
| `scenes/sequence/SequenceTarget.css:228` | `seq-ruler-wipe` |
| `scenes/sequence/SequenceTarget.css:232` | `seq-lane-drop` |
| `scenes/spring/SpringTarget.vue:387` | `spring-settle-pulse` |
| `scenes/spring/SpringTarget.vue:457` | `derby-fade-in` |

The dominant motion substrate is **not** CSS — it is the library itself (68 engine-consuming files, §1). View transitions are gated through glass-ui: `app/transition/useSceneSwap.ts:2` imports `supportsViewTransitions` from `/motion-core`, and `useSceneTransition.ts:18` records that the **glass cascade owns the LOOK** of the scene swap ("no demo-side VT CSS duplicates it", `App.vue:357`).

### 6.5 `prefers-reduced-motion` — 13 enforcement sites across 12 files

**10 CSS `@media (prefers-reduced-motion: reduce)` blocks:**

```
app/App.skeleton.vue:95
components/instrument/shell/AnimatedText.vue:121
components/instrument/transport/controls-pane/ControlsPaneWrapper.css:144   (nested in min-width:1024px)
scenes/easing/EasingTarget.css:48
scenes/sequence/SequenceTarget.css:238
scenes/spring/SpringHeatmap.vue:333
scenes/spring/SpringTarget.vue:462
scenes/spring/StartingStyleTarget.vue:211
scenes/square/SquareInstrument.vue:207
scenes/square/SquareScene.css:136
```

**3 JS query sites:**

```
scenes/cube/useCubeDemo.ts:164:            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
scenes/sequence/useSequenceInstrument.ts:31:            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
scenes/easing/EasingTarget.vue:234:const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
```

Coverage is **conscientious but inconsistent in mechanism**: two scenes use raw `window.matchMedia?.()`, one uses VueUse `useMediaQuery`. The engine-driven path is handled separately — `useSceneSwap.ts:29` documents a "spring snap to terminal in one emit under prefers-reduced-motion".

**Gaps:** `TypingDots.vue:121` only *mentions* PRM in prose (deferring to the engine's resting state); `KeyframeTimeline.vue:94` defers to glass-ui's `transitions.css` PRM block. Neither carries a local guard — correct if the delegation holds, unverified statically.

---

## 7. State / composables shape

### 7.1 `state/` — 9 files, 1 663 lines (a hoisted peer, aliased `@state`)

| lines | file | role |
|---|---|---|
| 342 | `useSceneMachine.ts` | scene-machine hook |
| 309 | `controlSurfaces.ts` | `BUILT_IN_SURFACES` — the control-surface registry |
| 270 | `sceneMachine.ts` | the FSM proper |
| 219 | `scenePlaybackAdapters.ts` | per-scene playback adapters |
| 149 | `animationOptionsStore.ts` | animation options store |
| 116 | `controlOptionsStore.ts` | control options store |
| 116 | `index.ts` | barrel (`@state`) |
| 73 | `storeUtils.ts` | store helpers |
| 69 | `hashSharing.ts` | URL-hash share encoding |

Shape: **hand-rolled reactive stores + an explicit scene FSM** — no Pinia, no Vuex. `vite.config.ts:44–46` documents `@state` as a **dir alias** resolving both the bare barrel and subpaths ("S.D2 — the hoisted demo state peer").

### 7.2 Composables — 71 `use*.ts` files

**Top-level shared (`demo/composables/`, 8 files):**
```
composables/scene-facility/index.ts
composables/scene-runtime/usePainterRegistry.ts
composables/scene-runtime/useSceneTransport.ts
composables/scene-runtime/useSceneVisibilityPause.ts
composables/scene-runtime/useSweepScene.ts
composables/useDoubleTap.ts
composables/useDragScrub.ts
composables/useThrottledReadout.ts
```

**The remaining 63 are colocated** beside their consumer — `components/instrument/keyframes/composables/` (7), `timeline/composables/` (4), `transport/channel-controls/composables/` (6), `transport/composables/` (7), plus per-component dirs (`AnimationControlsGroup/` 4, `TransportDock/` 3, `ControlsPaneWrapper/` 3, `KfPillTabs/` 1) and per-scene composables (`scenes/spring/` 7, `scenes/cube/` incl. `orbital-drag/composables/` 4, etc.).

This mirrors value.js's colocation idiom. Injection keys are centralised per-domain (`transport/injectionKeys.ts`, `scenes/*/[scene]Keys.ts` — 6 scene key modules).

### 7.3 F-5 — backwards-compat re-export shims (AMBER)

Two files exist **solely** to re-export from a relocated path:

```
components/instrument/transport/composables/useAnimationGroupPlayback.ts   (1 line)
  export { useAnimationGroupPlayback } from "../AnimationControlsGroup/useAnimationGroupPlayback";

components/instrument/transport/composables/useKfPillTabs.ts               (4 lines)
  export { useKfPillTabs, type KfPillTabOption } from "../KfPillTabs/useKfPillTabs";
```

**`useAnimationGroupPlayback.ts` is DEAD** — zero consumers:
```
$ grep -rn "composables/useAnimationGroupPlayback" --include="*.vue" --include="*.ts" .
→ (no output)
```

**`useKfPillTabs.ts` has exactly one consumer, and it is incoherent** — `ChannelControls.vue` imports the *component* from the real path but the *type* through the shim, on adjacent lines:
```
components/instrument/transport/channel-controls/ChannelControls.vue:229:import KfPillTabs from "../KfPillTabs.vue";
components/instrument/transport/channel-controls/ChannelControls.vue:230:import type { KfPillTabOption } from "../composables/useKfPillTabs";
```

Both violate the standing `feedback_no_backwards_compat` law ("Never add legacy-compat shims; migrate the consumer to the new API at the root"). Fix is one line + two deletions — and if S-1 lands, both files vanish with `KfPillTabs` anyway.

### 7.4 Duplicate-name hazard

`useAnimationGroupPlayback` and `useKfPillTabs` each resolve at **two** paths. `useKfPillTabs` additionally sits in a directory (`KfPillTabs/`) named identically to a sibling file (`KfPillTabs.vue`) — legal, but it makes `../KfPillTabs` ambiguous to a reader and defeats grep-by-path.

---

## 8. Build wiring (context for any replacement wave)

`vite.config.ts:37–60` — 9 aliases: `@src`, `@mkbabb/keyframes.js` (**self-alias** → `src/animation/index.ts`), `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets`.

The self-alias is directly load-bearing on glass-ui (`vite.config.ts:28–36`):

> `with glass-ui consumed from the registry (not a workspace link), glass-ui's bare import … from "@mkbabb/keyframes.js" (e.g. SpringProgress in its dock/spring-mount) has no installed package to resolve against — rolldown would stub it as an empty optional-peer-dep and drop the export. The self-alias dedupes glass-ui onto the SAME keyframes instance the demo uses via @src, so the consumer and its UI lib share one engine.`

So **glass-ui depends on keyframes.js** (peer), and keyframes.js's demo depends on glass-ui — a deliberate cycle held together by an alias. Combined with **F-1** (glass-ui undeclared/unlocked), the resolution graph is intact only by accident of the current `node_modules` state. Any replacement wave must fix F-1 *first*.

---

## 9. Counts (single table)

| metric | value |
|---|---|
| demo files (all types) | 206 |
| `.vue` components | 58 |
| `.vue` total lines | 11 984 |
| `.vue` importing glass-ui | 37 |
| `.vue` NOT importing glass-ui | 21 |
| files importing glass-ui (any type) | 42 |
| glass-ui import/mention lines | 82 |
| distinct glass-ui subpaths consumed | 21 |
| glass-ui subpath exports available | 73 |
| subpath utilisation | 29% |
| direct `reka-ui` imports | **0** |
| local shadcn `ui/` dirs | **0 (ABSENT)** |
| cva/clsx/tailwind-merge uses in demo | **0** |
| `use*.ts` composables | 71 |
| shared top-level composables | 8 |
| `state/` files | 9 (1 663 lines) |
| CSS files | 12 (2 137 lines) |
| `.vue` with `<style>` block | 40 |
| demo-owned CSS custom properties | 98 |
| `--kf-*` namespaced tokens | **0** |
| `@keyframes` definitions | 9 |
| `prefers-reduced-motion` enforcement sites | 13 (10 CSS + 3 JS) |
| scenes | 7 |
| engine-consuming files | 68 |
| glass-ui installed | 7.0.0 |
| glass-ui declared | **ABSENT** |
| producer glass-ui latest | 7.0.0 |
| shadow: replace-now lines | 217 |
| shadow: evaluate lines | 1 168 |
| dead re-export shims | 1 (+1 incoherent) |

---

## 10. Recommended wave order

1. **F-1 first** — declare `@mkbabb/glass-ui: 7.0.0` in `package.json` and regenerate the lock. Nothing below is reproducible until this lands; `npm ci` is currently broken.
2. **S-1** — retire `KfPillTabs.vue` + `useKfPillTabs.ts` (217 lines) onto `SegmentedTabs` + `useTabRovingFocus`. Rationale is void against 7.0.0 (`dist/tabs.js:232`). Verify the `role=group` / `role=tablist` semantic choice survives the swap — the fork's *secondary* claim (that a panel-switcher wants `role=tablist`, not `role=group`) is a **design** argument that the 7.0.0 aria fix does not by itself answer.
3. **F-5** — delete the dead shim; repoint `ChannelControls.vue:230` to the real path.
4. **S-2** — reconcile the stale `<SegmentedTabs>` prose in `ChannelControls.vue` / `useTabStripScroll.ts` with whatever S-1 decides.
5. **S-6, S-7, S-5** — low-risk partials (skeleton plate, button shell, typewriter), each independently landable.
6. **S-3, S-4** — the timeline cluster. Largest prize (828 lines) and largest risk; wants its own spec, not a mechanical swap.
7. **Token namespace** — 98 unprefixed demo custom properties sharing a global namespace with glass-ui's. Worth a dedicated collision audit.

---

## Provenance note

Every glass-ui primitive claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy already installed in the census target — so all replacements are available without an upgrade. The producer repo at `/Users/mkbabb/Programming/glass-ui` was read for its `package.json` version field only (7.0.0), per lane law. No file in keyframes.js or fourier-analysis was written, mutated, or executed; no installs and no dev servers were run.
