claude-opus-5[1m]

# CHALLENGE · EditorShell · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorShell.vue` (261 L)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, integration seams.
**Mode** static, read-only, source-derived. No installs, no dev server, no browser tooling. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Substrate** keyframes.js `master`, HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group`.

> ⚠ **THE TARGET IS DIRTY.** `git status --short demo/components/instrument/shell/` → `M EditorShell.vue`. The audited text is the **uncommitted working tree**, which differs from HEAD at the entire glass-ui seam (`git diff` reproduced in §1). ~40 demo files are dirty — this is an in-flight, repo-wide **glass-ui 7 migration**. Every finding below is scoped to the working tree; where HEAD differs I say so.

**Tally — 15 defects (2 BLOCKER · 4 MAJOR · 7 MINOR · 2 INFO) · 5 superlatives.**

| id | sev | claim (one line) |
|---|---|---|
| C-1 | **BLOCKER** | Against the glass-ui artifact actually on disk, the shell's entire header command set is `inert` + `aria-hidden="true"` + `pointer-events:none` at rest with no touch or keyboard path to expand it. |
| C-2 | **BLOCKER** | `node_modules/@mkbabb/glass-ui@7.0.0` ships a `HeaderRibbon` the producer's own 7.0.0 source and consumer-evidence doc say was **deleted clean-break**; with F-1 (no declaration, no lock) nothing in the repo determines which one builds. |
| C-3 | MAJOR | `<SharePopover />` (`:20`) is rendered with no `onSceneRestore` — the header share path silently cannot switch scenes, while its live twin in the dock is wired. |
| C-4 | MAJOR | The `IconTooltip` → `Tooltip`/`TooltipTrigger`/`TooltipContent` swap made EditorShell hard-require an ancestor `TooltipProvider` it neither supplies nor declares; reka **throws** on the missing injection. Its own child self-provides. |
| C-5 | MAJOR | `extraTabs: SegmentedTabOption[]` (`:169`) is a 4-hop dead prop with zero producers in the tree, and it is the **sole** reason EditorShell touches `@mkbabb/glass-ui/tabs`. |
| C-6 | MAJOR | `defineExpose({ headerRibbonRef })` (`:197`) is a dead ref-forward already named twice in the corpus; the migration rewrote every adjacent line and left it. |
| C-7 | MINOR | `initIOSPlatformClass()` (`:133`) mutates `<html>` from a mid-tree component, against the demo's own two declared homes for document-level singletons. |
| C-8 | MINOR | Three tooltip idioms across four sibling controls in one 40-line ribbon. |
| C-9 | MINOR | The header tooltip inherits App's bare provider → 700 ms, vs 100 ms everywhere else in the instrument. |
| C-10 | MINOR | `onPlayStateChange` (`:192`) is pure pass-through indirection while the sibling emit is inlined (`:86`). |
| C-11 | MINOR | `animationGroup: AnimationGroup<any>` (`:137`) — `any` at the shell's widest prop, erasing the target type for the whole descendant chain. |
| C-12 | MINOR | `Button` from the root barrel (`:124`) beside `Tooltip*` from `/tooltip` (`:125`), with a `./button` subpath present. |
| C-13 | MINOR | `#header-left` (`:18`) and `#header-right` (`:19`) have zero overriding hosts. |
| C-14 | INFO | `import "@styles/style.css"` (`:131`) — a leaf importing the app cascade root, duplicated by `main.ts:18`. |
| C-15 | INFO | Zero test coverage: no file under `test/` references `EditorShell` or `HeaderRibbon`. |
| S-1..S-5 | ✦ | see §4 — five things this component gets right, three of them non-obvious. |

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
+                            <Button emphasis="quiet" icon-only ...>
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

**HEAD is unbuildable.** `./icon-tooltip` and `./controls` are **ABSENT** from the installed package's 73-entry exports map (probe: `node -e "Object.keys(require('./package.json').exports)"` over `node_modules/@mkbabb/glass-ui/package.json`), so `HEAD:demo/.../EditorShell.vue:123,125` resolve to `ERR_PACKAGE_PATH_NOT_EXPORTED`. Five more HEAD files carry the same dead specifiers (`git grep -n "glass-ui/icon-tooltip\|glass-ui/controls" HEAD -- demo/`). The working tree has swept both to zero. **The repair direction is correct** (see S-5); four items were missed, and one regression was introduced.

---

## 2. Defects

### C-1 · BLOCKER · the header command set is inert, aria-hidden and untappable against the on-disk glass-ui

`EditorShell.vue:16`
```vue
<HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">
```

**`mode` is not a prop.** The installed component declares exactly three (`node_modules/@mkbabb/glass-ui/dist/header-ribbon.js:15-17`: `placement`, `ariaLabel`, `class`), and so does the producer source (`/Users/mkbabb/Programming/glass-ui/src/components/header-ribbon/types.ts`). It falls through `useAttrs()` onto the root `<div role="toolbar">` as a literal `mode="persistent"` DOM attribute. Unconditionally dead in **both** builds.

What it was evidently meant to defeat is real, and it is still there in the artifact on disk:

| probe | file:line | fact |
|---|---|---|
| static vnode props | `dist/header-ribbon.js:11` | `_ = ["inert", "aria-hidden"]` |
| actions binding | `dist/header-ribbon.js:74-75` | `inert: !w.value \|\| void 0, "aria-hidden": !w.value` |
| expansion source | `dist/header-ribbon.js:24` | `w = computed(() => pinned \|\| hovered \|\| focusWithin)` — all three initialise `false` |
| hover gate | `dist/header-ribbon.js:28` | `e.pointerType !== "touch" && (S.value = !0)` — **touch never sets hovered** |
| CSS at rest | `dist/components/header-ribbon/styles.css` | `.header-ribbon:not([data-expanded]) .header-ribbon__actions { max-inline-size: 0; opacity: 0; pointer-events: none; }` |
| the only tap affordance | `dist/header-ribbon.js:66-71` | `<div class="header-ribbon__anchor" @click=togglePinned>` renders `$slots.anchor` |
| anchor geometry | `dist/components/header-ribbon/styles.css` | `.header-ribbon__anchor { display: grid; flex: none; place-items: center; }` — no intrinsic size |

**EditorShell supplies no `#anchor` slot** (the working tree deleted the forwarding; `grep -rn "header-anchor" demo/ test/ docs/` → zero hits, so nothing regressed — the anchor was always empty). An empty `flex: none` grid box is 0×0. Therefore, at first paint:

- **Touch:** `pointerenter` is filtered out by the `pointerType !== "touch"` guard; the anchor is 0×0 so the pin toggle cannot be tapped; the actions carry `pointer-events: none` **and** `inert`. **Share, Keyboard-shortcuts and Dark-mode are unreachable on any coarse pointer.**
- **Keyboard:** `inert` removes the subtree from the focus order, and the anchor `<div>` has no `tabindex`, so `focusin` can never fire from within. **The same three controls are unreachable by keyboard.**
- **Screen reader:** `aria-hidden="true"` at rest hides all three from the a11y tree regardless of input modality.
- Desktop mouse works: `pointerenter` fires on `.header-ribbon` when the pointer enters the `pointer-events: auto` band, expanding it.

This also swallows the two host extension points: `<slot name="header-left">` (`:18`) and any `#header-right` override (`:19`) render inside the same inert wrapper.

**Falsifier.** Any one of: (a) `HeaderRibbon`'s installed build declaring a `mode` prop — refuted at `dist/header-ribbon.js:15-17`; (b) demo CSS overriding `.header-ribbon__actions` or forcing `data-expanded` — refuted, `grep -rn "header-ribbon" demo/ --include="*.css" --include="*.vue" --include="*.ts"` returns **only** the five `EditorShell.vue` lines; (c) a host supplying `#anchor`/`#header-anchor` — refuted, zero hits repo-wide; (d) the registry tarball for `@mkbabb/glass-ui@7.0.0` matching the producer source rather than the on-disk artifact — **this is C-2, and it is the live escape hatch**: I cannot run an install, so I claim only what is provable from disk — *the build that `npm run dev` / `vite build --mode gh-pages` produces today, from the files present, has an inert ribbon.*
**Visual reading of the collapsed pill (a blank glass lozenge in the top-right corner, no icon):** UNPROVEN-NEEDS-LIVE.

### C-2 · BLOCKER · the sole glass-ui structural dependency resolves to an artifact its own producer says does not exist

Both stamped `"version": "7.0.0"`. They are not the same component.

| | installed `node_modules/@mkbabb/glass-ui/dist/` | producer `/Users/mkbabb/Programming/glass-ui/src/components/header-ribbon/` |
|---|---|---|
| `anchor` slot | present (`header-ribbon.js:71`) | absent — `defineSlots<{ items?(): unknown }>()` |
| pin / hover / focus disclosure | present (`:24-46`) | absent |
| `inert` / `aria-hidden` | present (`:74-75`) | absent |
| `:not([data-expanded])` collapse CSS | present | absent |
| `--header-ribbon-actions-width` | present | absent |
| `direction: ltr` + `:dir(rtl)` flow | absent | present |

The producer's own consumer-evidence file is explicit:

> `/Users/mkbabb/Programming/glass-ui/docs/consumer-evidence/header-ribbon.md` — "The `collapsible` mode, the `anchor` slot, `mode`, `anchorLabel`, `HeaderRibbonMode`, and `HeaderRibbonAnchorSlotProps` are **DELETED clean-break**… a `role="toolbar"` host, **expanded from first paint**."

The same document names **EditorShell as the single real consumer in the constellation** ("Real consumers of `persistent`: 1 (keyframes, across the published `/header-ribbon` subpath)"). So the one component in the world that exercises this subpath is pointed at a build the producer believes it retired.

This is the census's **F-1** (`formation/keyframes/lane-frontend.md` §2) cashing out. F-1 says glass-ui is absent from `package.json` **and** `package-lock.json` while 7.0.0 sits installed (dir timestamp `Jul 16 05:17`). I extend F-1 with two facts it did not have:

1. **F-1's predicted consequence is now empirically visible without running an install** — HEAD's `EditorShell.vue:123,125` import subpaths that the installed artifact does not export. The tree and the artifact have already diverged enough to break a build.
2. **The drift is not only version-shaped, it is content-shaped.** A pin (`"@mkbabb/glass-ui": "7.0.0"`) would *not* fix this, because the divergent artifact also calls itself 7.0.0. The fix needs a lockfile with an integrity hash, or a workspace link.

**Falsifier.** `npm view @mkbabb/glass-ui@7.0.0` (or an `npm ci` in a scratch tree) yielding a `dist/header-ribbon.js` whose props are `{placement, ariaLabel, class}` **and** which contains no `inert`/`anchor` — that would prove the on-disk copy is a stale local build and demote C-1 to "stale dev environment". Forbidden by lane law; I have not run it. Note it would not clear C-2 itself: an unlockable dependency whose on-disk copy disagrees with its own producer is the defect.

### C-3 · MAJOR · the header share control cannot restore a scene; its dock twin can

`EditorShell.vue:20` — `<SharePopover />`, no props.

`SharePopover.vue:56-61` declares `onSceneRestore?: (sceneId: string) => void` and threads it into `useShareState(props.onSceneRestore)`. `useShareState.ts:79-81`:

```ts
if (result.activeScene && onSceneRestore) {
    onSceneRestore(result.activeScene);
}
```

Undefined ⇒ the branch is skipped. State is decoded and restored, `toast.success("State restored!")` fires (`:83`), and the user stays on the wrong scene.

The App mounts **two live SharePopover instances simultaneously**:

```
demo/app/dock/MbabbMenu.vue:9      <SharePopover :on-scene-restore="onSceneRestore" />   ← WIRED
demo/components/instrument/shell/EditorShell.vue:20   <SharePopover />                   ← NOT WIRED
```

Both are unconditionally rendered in `App.vue` (`ChromeDock`+`MbabbMenu` at `:4-26`, `EditorShell` at `:28`). `App.vue:23` proves the callback exists and is in scope (`:on-scene-restore="runSceneSwitch"`). EditorShell simply never asks for it: it has no `onSceneRestore` prop and offers no forwarding seam short of re-authoring the whole `#header-right` default (`:19-48`).

Two identical share affordances with different behaviour is also a duplicate-command surface — `DarkModeToggle` is likewise mounted twice (`EditorShell.vue:44`, `MbabbMenu.vue:20`). (A third `<SharePopover />`, also unwired, sits in `EditorHeader.vue:23`, which has **zero consumers** — `grep -rn "EditorHeader" demo/` hits only `shell/index.ts:2`. Dead file, out of scope, noted because EditorShell duplicated its ribbon content rather than reusing it.)

**Falsifier.** A host passing `on-scene-restore` through `#header-right`, or `useShareState` acquiring the router-switch itself. Neither exists: `App.vue:28-38` passes no header slot at all, and `useShareState.ts:12` takes the callback only as an argument.

### C-4 · MAJOR · the migration traded a self-contained primitive for one that throws without ambient context

`EditorShell.vue:30-43` now renders reka's tooltip triple through glass-ui. `glass-ui/dist/tooltip-OxciiZm6.js:11-19` shows `Tooltip` is a thin forward to reka's `TooltipRoot`, and `reka-ui/dist/Tooltip/TooltipRoot.js:55`:

```js
const providerContext = injectTooltipProviderContext();
```

no fallback argument. `reka-ui/dist/shared/createContext.js` throws when the injection is absent:

> ``throw new Error(`Injection ${injectionKey.toString()} not found. Component must be used within \`TooltipProvider\``)``

EditorShell provides no `TooltipProvider`. It works **only** because `App.vue:3` wraps the whole tree — and `App.vue:2` says so in a comment ("Shared shell tooltip triggers require one application-lifetime provider").

Three things make this a defect rather than a preference:

1. **The shell's own child does the opposite.** `AnimationControlsGroup.vue:2` opens with `<TooltipProvider :delay-duration="100" :skip-delay-duration="0">`, as does `ChannelControls.vue:2`. The descendant is host-independent; the shell is not.
2. **This exact bug class already bit this repo.** HEAD is `8281638c fix(demo-shell): provide tooltip context for the routed control group`.
3. **EditorShell advertises standalone hosting.** Its own prop docs invoke a non-App host five times (`:141`, `:160-167`, `:163`, and `AnimationControlsGroup.vue:167`, `:174` — "a non-App host (the playground) takes the TRUE default"). A standalone mount of the barrel export (`shell/index.ts:1`) without a provider throws at first tooltip render.

**Falsifier.** `injectTooltipProviderContext` being called with a fallback, or glass-ui's `Tooltip` self-providing — both refuted at the lines above. Alternatively: a `TooltipProvider` inside EditorShell — `grep -rn "TooltipProvider" demo/` returns three sites, none in `shell/`.

### C-5 · MAJOR · `extraTabs` is a dead 4-hop prop, and the only reason this file touches `/tabs`

`EditorShell.vue:126` `import type { SegmentedTabOption } from "@mkbabb/glass-ui/tabs";` → used at `:169` only → forwarded at `:84`.

The chain: `EditorShell:84` → `AnimationControlsGroup.vue:30` → `ControlsPaneWrapper.vue:65` → `ChannelControls.vue:271` (retyped `KfPillTabOption[]`) → `ChannelControls.vue:322` `: (extraTabs ?? [])`.

**Producers: zero.**
- `App.vue:28-38` — the only host that mounts `EditorShell` — passes `animation-group`, `channels`, `super-key`, `show-start-screen`, `auto-play`, `stage-mode`, `has-control-surfaces`. No `extra-tabs`.
- The documented producer, "the playground" (`EditorShell.vue:163-168`), **does not exist**: `find demo -iname "*playground*"` → empty; the six files matching `playground` are all comments.
- The real tab-data producer, `extraTabsFrom` (`state/controlSurfaces.ts:189`), flows `useSceneMachine.ts:318` → `App.vue:12` → **ChromeDock**, never EditorShell.
- In the live host `tabsExternallyManaged` is provided (`App.vue:135`), so `ChannelControls.vue:322` takes the other branch anyway.

**And the contract loses fields at the terminal renderer.** `SegmentedTabOption` is `{label, value, icon?, disabled?, tooltip?}` (`glass-ui/dist/components/tabs/SegmentedTabs.vue.d.ts:5-11`); `KfPillTabOption` is `{label, value, disabled?}` (`KfPillTabs/useKfPillTabs.ts:22-26`). Assignment is legal (excess properties survive a non-fresh array), so tsc is silent — but `grep -n "icon\|tooltip" demo/components/instrument/transport/KfPillTabs.vue` returns **nothing**: `icon` and `tooltip` are silently dropped.

This **sharpens census S-2** (`lane-frontend.md` §5, "the demo has adopted glass-ui's tab data contract while rejecting its renderer"). S-2 named `EditorShell.vue:126` as one of three type-only `/tabs` sites. The tree adds two facts S-2 did not measure: at this site the borrowed contract has **no producer at all**, and the fork **discards two of its five fields**. The cost of the S-1 fork is not abstract; it is measurable here.

**Falsifier.** Any `extra-tabs` binding on an `EditorShell` element anywhere in `demo/` or `test/` (`grep -rn "extra-tabs\|extraTabs" demo/` → 18 hits, none on an `EditorShell` tag), or `KfPillTabs.vue` rendering `option.icon` / `option.tooltip`.

### C-6 · MAJOR · the dead ref-forward the migration walked past

`EditorShell.vue:187,197`
```ts
const headerRibbonRef = useTemplateRef<InstanceType<typeof HeaderRibbon>>("headerRibbonRef");
defineExpose({ headerRibbonRef });
```

- **Zero consumers.** `grep -rn "headerRibbonRef" demo/ test/` returns only these two lines plus the `ref=` binding at `:16`.
- **Nothing to expose.** `HeaderRibbon` calls no `defineExpose` in either build (`dist/components/header-ribbon/HeaderRibbon.vue.d.ts` types the instance with an empty exposed record; the producer SFC has no `defineExpose`). `InstanceType<typeof HeaderRibbon>` yields no public API.
- **Double indirection.** It exposes the `Ref`, not the instance, so a consumer would need `.value` twice through `$refs`.
- **Twice reported already.** `value.js/docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md:22` — "Same file, :197 — the `defineExpose({ headerRibbonRef })` forward is dead (HeaderRibbon has no instance API)"; and `value.js/docs/tranches/G/audit/a-frontend-encapsulation.md:78` marks it "legacy-only". **I fold both rather than re-derive.** The escalation is that the same uncommitted migration which *did* apply items 1 and 3 of that letter (the `mode` rename, the retired subpaths) skipped item 2 — the letter was applied partially and left a regression (C-1) in the same edit.

**Falsifier.** Any `$refs`/template-ref read of an `EditorShell` instance reaching `headerRibbonRef`, or a `defineExpose` appearing in `HeaderRibbon`.

### C-7 · MINOR · a document-level side effect from a mid-tree component

`EditorShell.vue:133` — `initIOSPlatformClass();` in setup body, which does `document.documentElement.classList.add("ios")` (`utils/iosTextEntry.ts:14-18`).

Idempotent, so harmless — but misplaced against the demo's own two declared homes:
- `app/main.ts:1-9` calls itself "the demo's real module-graph root" and is where global boot lives.
- `AnimationControlsGroup.vue:114-118` names `DemoGlobalChrome` as the home for "document-level singletons… they resolve against the DOCUMENT, not this layout grid".

A shell that a standalone host may mount N times re-running a global `<html>` mutation is the pattern those two comments exist to prevent.

**Falsifier.** `main.ts` or `DemoGlobalChrome.vue` already calling it (they do not — `grep -rn "initIOSPlatformClass" demo/` hits only `iosTextEntry.ts:14` and `EditorShell.vue:115,133`), or the class being needed before EditorShell mounts.

### C-8 · MINOR · three tooltip idioms across four sibling controls

Inside one 40-line ribbon (`:19-48`):

| control | idiom | line |
|---|---|---|
| shortcuts Button | glass `<Tooltip>`/`<TooltipTrigger>`/`<TooltipContent>` | `:30-43` |
| `DarkModeToggle` | native `title="Toggle dark mode"` | `:45` |
| `SharePopover` trigger | bare `aria-label`, no tooltip | `SharePopover.vue:5` |
| SharePopover's own buttons | native `title=` | `SharePopover.vue:27,36` |

The `title` on `DarkModeToggle` is additionally **state-blind**: the primitive already computes a live accessible name (`dist/dark-mode-toggle.js:26`: `"aria-label": isDark ? "Switch to light mode" : "Switch to dark mode"`), and the static `title` layers a permanently-stale hover string over it. (The `class` **does** land — `dist/dark-mode-toggle.js:24,32` destructures `class` out of `attrs` and re-merges it through `cn(...)` — so `aspect-square w-8 scale-on-hover` is not dropped. I checked, because `inheritAttrs: !1` made that the obvious suspicion; it is a **non-defect**.)

**Falsifier.** A demo convention doc mandating `title` on `DarkModeToggle` (none found), or `DarkModeToggle` suppressing its own aria-label.

### C-9 · MINOR · the header tooltip is 7× slower than every other tooltip in the app

`EditorShell.vue:30` `<Tooltip>` carries no `delay-duration`, and sits **outside** the `<main>` at `:74`, so its nearest provider is `App.vue:3` `<TooltipProvider>` — bare. reka's default is `delayDuration: 700, skipDelayDuration: 300` (`reka-ui/dist/Tooltip/TooltipProvider.js:12-22`). Every instrument tooltip runs at 100/0 (`AnimationControlsGroup.vue:2`, `ChannelControls.vue:2`).

**Falsifier.** A provider between `App.vue:3` and `EditorShell.vue:30` setting a shorter delay — there is none (`grep -rn "TooltipProvider" demo/` → 3 sites, both non-App ones inside `<main>`). Perceptual severity: UNPROVEN-NEEDS-LIVE.

### C-10 · MINOR · asymmetric emit plumbing, one half of it dead

```
:85   @play-state-change="onPlayStateChange"
:86   @start-state-change="(s: boolean) => emit('startStateChange', s)"
:192  const onPlayStateChange = (playing: boolean) => { emit("playStateChange", playing); };
```
Two identical pass-throughs written two different ways; `onPlayStateChange` adds nothing over the inline form. **Falsifier.** `onPlayStateChange` gaining a body, or being referenced elsewhere (it is not).

### C-11 · MINOR · `any` at the shell's widest prop

`EditorShell.vue:137` `animationGroup: AnimationGroup<any>` — repeated verbatim at `AnimationControlsGroup.vue:141` and downstream. The library ships `AnimationGroup<T>` generic for a reason; the shell erases `T` at the top of the chain, so no descendant can recover it. Type-only import from `@mkbabb/keyframes.js` (`:128`), so it is erased at build — this is a contract-quality defect, not a runtime one. **Falsifier.** A concrete union of scene target types that `AnimationGroup` can be parameterised over across all seven scenes — plausible that none exists, which would make `any` the honest choice; I did not find a discriminated scene-target type, so I file this MINOR rather than MAJOR.

### C-12 · MINOR · adjacent-line subpath inconsistency

```
:124  import { Button } from "@mkbabb/glass-ui";
:125  import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui/tooltip";
```
`./button` is a real subpath (present in the 73-entry map). `KeyboardShortcutsModal.vue:41-47` does the same with `Dialog*` from the root barrel while `./dialog` exists.

**Explicitly NOT a bundle-size claim.** `package.json` declares `sideEffects: ["*.css"]` and `dist/glass-ui.js` (23 938 B) is a pure re-export barrel, so a bundler tree-shakes it. This is a consistency/legibility finding only — I checked precisely so as not to file a false one.

### C-13 · MINOR · two host slots with zero hosts

`:18` `<slot name="header-left">` (no fallback — renders nothing in every live mount) and `:19` `<slot name="header-right">` (fallback always taken). `App.vue:28-102` supplies `#backdrop`, `#start-screen`, `#tabs-trigger`, `#tabs-content`, `#ribbon-content`, `#target` — six of the shell's eight slots. The two header slots have no consumer anywhere in `demo/` or `test/`, and under C-1 anything placed in them would be inert regardless. **Falsifier.** Any `#header-left`/`#header-right` template in the tree.

### C-14 · INFO · a leaf importing the app cascade root

`:131` `import "@styles/style.css";`, duplicated at `main.ts:18` and acknowledged there (`main.ts:16`: "EditorShell.vue also imports these; Vite dedupes"). **No cascade-order hazard** — `main.ts:11` imports `App.vue` *before* `:18`, so ES evaluation order puts EditorShell's copy first either way, dedupe or not. I verified this before filing, to avoid claiming an ordering bug that does not exist. The residual point is coupling: the shell cannot be consumed by any host that does not want tailwind + the whole glass-ui cascade + the demo idiom sheet.

### C-15 · INFO · zero test coverage on the entire glass seam

`grep -rln "EditorShell\|HeaderRibbon\|header-ribbon" test/` → **no output**. `test/demo/instrument/` holds 9 files (incl. `ios-text-entry.test.ts`, which covers `iosTextEntry.ts` but not its call site). Nothing guards the `mode`/`placement` prop names, the ribbon's reachability, the `SharePopover` wiring, or the tooltip-provider requirement. C-1, C-3 and C-4 are all cheap to pin with a mount test; none is pinned.

---

## 3. Cleared — claims I formed and then killed

Recorded because "a false defect is worse than a missed one," and because each of these is the obvious first suspicion.

| suspicion | verdict | why |
|---|---|---|
| `registerShortcut("?")` (`:190`) discards its disposer → leak + N-fold toggle across remounts | **CLEARED** | `glass-ui/dist/keyboard.js` (`y`): `t() && n(l)` — `getCurrentScope() && onScopeDispose(unregister)`. Called inside `<script setup>`, so it auto-disposes. |
| `"?"` combo never matches (needs Shift) | **CLEARED** | `dist/keyboard.js` (`d`): `let i = e.key.length === 1 && e.shiftKey && !t.shift;` explicitly exempts single-char shifted keys from the shift comparison. |
| `class` on `DarkModeToggle` dropped by `inheritAttrs: false` | **CLEARED** | `dist/dark-mode-toggle.js:24,32` — `class` is destructured out and re-merged via `cn("dark-mode-toggle-button", attrs.class)`. |
| `<Transition name="fade" appear>` (`:52`) has no keyframes | **CLEARED** | `.fade-enter-from/-active/-leave-to/-leave-active` all ship in `glass-ui/dist/styles/transitions.css`, loaded via `style.css:3`. Correct consumption of the design system's transition vocabulary. |
| duplicate `style.css` import breaks cascade order | **CLEARED** | see C-14. |
| the R1 `parseCssColor("oklch()")` crash class is reachable through this shell | **CLEARED (conduit, not originator)** | `grep -rn "@mkbabb/value.js" demo/components/instrument/shell/` → **zero**. The subtree's only value.js edges are `clamp` from `/math` (`AnimationControlsGroup.vue:125`, `useAnimationGroupPlayback.ts:7`, `useAnimationProgress.ts:6`, `ChannelOptions.vue:426`), `cubicBezierToString` from `/math`, and `bezierPresets`/`JumpPosition` from `/easing`. The demo's **only** `parseCssColor` site is `scenes/square/useSquareTumble.ts:22`, which enters through the `#target` slot (`:101`) as host-supplied scene content. This **sharpens `lane-library.md` §4.6** rather than contradicting it: EditorShell is on the path to R1 but contributes no parser edge of its own, so an R1 fix has no EditorShell-side obligation. |
| `AnimationGroup` type import drags the HEAVY value.js-bearing barrel into the shell | **CLEARED** | `import type` at `:128`; erased at build. The LIGHT/HEAVY boundary (`lane-library.md` §3.3) is not crossed here. |

---

## 4. Superlatives (L-18 runs both ways)

**S-1 · the `<main>` landmark reasoning (`:67-74`) is correct and non-obvious.** The comment states that `display: contents` strips both the layout box *and* the implicit `main` role from the a11y tree, and that `place-self-stretch` on a real box reproduces the previous geometry exactly. Both halves are true, and the second is the part most authors get wrong when they retreat from `display: contents`. One `<main>`, correctly placed, without a layout regression. *Falsifier: a second `<main>` in the tree — `grep -rn "<main" demo/` returns only this one.*

**S-2 · the `@supports not (height: 100dvh)` block (`:208-221`) supplies both axes with a stated reason.** Most `dvh` fallbacks patch height and leave `w-dvw` broken; this one notes that a browser lacking `dvh` lacks `dvw` (same spec) and supplies `width: 100vw` alongside. Correctly scoped to the two classes that use the units.

**S-3 · the graph-paper substrate (`:238-259`) consumes tokens the way the design system intends.** Four `linear-gradient` layers reading `--graph-pitch`/`--graph-major` with `color-mix(in srgb, var(--foreground) var(--graph-opacity, 5%), transparent)` — so the dark theme retints from the *same four rules* and the duplicated dark data-URI it replaced is gone, not forked. Every custom property carries a fallback. This is the correct answer to `feedback_root_styling` and to the "no legacy beside the replacement" law, and the comment records the measurement (12 % major-line opacity resolving above the former 0.10α floor) that justifies it.

**S-4 · the import boundary is clean.** Zero direct `reka-ui` imports; zero local `ui/` shadcn copies; zero `cva`/`clsx`/`tailwind-merge`; zero raw `z-[N]` — the three z-classes used (`z-controls` `:60`, `z-dock` via ACG, `z-popover` via SharePopover) come from the glass-ui-sourced ordered layer documented at `styles/style.css:23-34`. reka is reached only transitively through glass-ui, which is the correct topology. **Folds census F-6** (`lane-frontend.md` §0) and confirms it holds at this file.

**S-5 · the in-flight migration's direction is right.** It correctly retired the two subpaths that 7.0.0 genuinely deleted (`/icon-tooltip`, `/controls` — both ABSENT from the exports map, so HEAD is literally unbuildable), correctly renamed `position` → `placement`, and correctly dropped the `#anchor` forwarding whose slot props (`{ pinned, toggled }`) were already stale — the installed artifact passes only `{ pinned }`, so `toggled` was permanently `undefined` at HEAD. Four of five migration obligations landed. C-1 and C-6 are what remains.

---

## 5. Corpus reconciliation

| corpus id | source | this challenge |
|---|---|---|
| **F-1** phantom glass-ui dependency | `lane-frontend.md` §2 | **FOLDED + ESCALATED** → C-2. Two new facts: HEAD is provably unbuildable against the installed artifact (no install needed), and the drift is *content*-shaped, not version-shaped — a version pin would not fix it. |
| **F-6** clean glass-ui boundary (GREEN) | `lane-frontend.md` §0 | **CONFIRMED at this file** → S-4. |
| **S-2** type-only `/tabs` consumption (AMBER) | `lane-frontend.md` §5 | **FOLDED + SHARPENED** → C-5. `EditorShell.vue:126` is one of S-2's three sites; the tree adds that here the borrowed contract has *zero producers* and the terminal fork *drops 2 of its 5 fields*. |
| **S-1** `KfPillTabs` fork (RED) | `lane-frontend.md` §5 | **CONSEQUENCE MEASURED** at the far end of EditorShell's `extraTabs` chain (C-5). No independent claim; the fork itself is not this component's defect. |
| **§4.6** demo parse consumers / R1 blast radius | `lane-library.md` | **SHARPENED, not contradicted** → §3, row 6. EditorShell carries no value.js edge; R1 enters via the `#target` scene slot. |
| **§8** the glass-ui ↔ keyframes.js self-alias cycle | `lane-frontend.md` | **NOT CONTRADICTED.** EditorShell's only kf edge is `import type { AnimationGroup }` (`:128`), erased at build, so it does not exercise the alias. |
| HeaderRibbon consumer-update letter | `value.js/docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md` | **FOLDED** → C-6 (its item 2, still unapplied) and C-1 (its `mode`-deletion notice, applied *backwards* — the migration **added** `mode="persistent"`). |
| glass-ui's own consumer census | `glass-ui/docs/consumer-evidence/header-ribbon.md` | **FOLDED** → C-2. It names EditorShell the sole real consumer of `/header-ribbon` in the constellation, which is why C-1/C-2 are BLOCKER rather than MAJOR: there is no second consumer whose breakage would have caught this. |

**No corpus claim is contradicted by the tree.** One is applied in reverse by the working tree itself (the `mode` deletion), and that is C-1.

## 6. Provenance

Every glass-ui runtime claim is read from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy the demo builds against today. Producer claims are read from `/Users/mkbabb/Programming/glass-ui/src/` and `/Users/mkbabb/Programming/glass-ui/docs/` (version field, `header-ribbon/` sources, consumer-evidence). reka claims from `/Users/mkbabb/Programming/keyframes.js/node_modules/reka-ui/dist/`. No file in keyframes.js, glass-ui, or value.js product source was written or mutated; no install, dev server, test run, or browser tool was invoked. The single write of this lane is this file.
