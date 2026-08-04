claude-opus-5[1m]

# CHALLENGE · `ChannelControls.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/ChannelControls.vue` (456 L)
**Substrate** keyframes.js `master`, HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group`. glass-ui **7.0.0 installed / UNDECLARED** (F-1 re-verified: `grep -n glass-ui package.json package-lock.json` → zero hits). value.js **4.0.0** pinned exact.
**Mode** static, read-only. No installs, no dev server, no browser. Livable-only claims carry `UNPROVEN-NEEDS-LIVE`.
**Posture** DEFECTIVE until the tree proves otherwise — but every claim below carries the observation that would kill it, and §4 lists the five claims I built and then **killed against the tree**.

**Corpus folded (not re-invented):** `formation/keyframes/lane-frontend.md` (F-1 phantom dep; S-1 KfPillTabs fork; S-2 type-only `/tabs`; F-5 shim) and `lane-library.md` (§4.6 demo parse consumers; §7.5 parse failure-posture). Where this component's tree **contradicts** those lanes it is said so explicitly and in bold.

---

## 0. Headline

| # | Finding | Sev |
|---|---|---|
| **C-1** | The **entire tab-strip consumption seam is unreachable in the shipped app.** `<KfPillTabs>` (`:74`) sits under `v-if="!tabsExternallyManaged"` (`:56`) and `App.vue:169` provides `TABS_EXTERNALLY_MANAGED_KEY = true` unconditionally from the only `createApp` root. ~300 L of this component + its composable + its CSS never execute. **CONTRADICTS lane-frontend S-1's "It is live, not dead."** | **BLOCKER** |
| **C-2** | `:key="storedControls.selectedControl"` on the teleported timeline wrapper (`:189`) **destroys and re-creates `KeyframeTimeline`** on any surface switch while the timeline is expanded — silently wiping every authored keyframe and the whole `useRefHistory` undo/redo stack. | **BLOCKER** |
| C-3 | Three `role="tabpanel"` nodes with **no `role=tablist`/`role=tab` anywhere in the tree** and no `aria-labelledby`. The file's own comment (`:26–30`) names this exact shape "an ARIA defect". | MAJOR |
| C-4 | **`SURFACE_META` exists TWICE.** ChannelControls reads `@state/controlSurfaces.ts:145`; ChromeDock reads `components/instrument/surfaceTabs.ts:12`. The "one authority, no drift" claim at `:283–286`/`:294–296` is false against the tree. **Not in the census.** | MAJOR |
| C-5 | A **third** nested `TooltipProvider` — App `:3` → AnimationControlsGroup `:2` → ChannelControls `:2`, the last two with identical `100/0` timings. Contradicts HEAD `8281638c`'s own stated goal. | MAJOR |
| C-6 | The file asserts **glass-ui 4.0.1** facts against an installed **7.0.0** that fixes both. 7.0.0 additionally ships `semantics: "toggle" \| "tabs"`, which **closes the design question lane-frontend §10 step 2 left open**. | MAJOR |
| C-7 | `defineExpose({ keyframesControlsRef })` hands the parent a **nullable it cannot see**; RibbonBar's four keyframes actions silently no-op through the warm/resolve window with no `disabled`/`loading`. | MAJOR |
| C-8 | The `timeline` tabpanel (`:149–172`) is **empty**; the actual `KeyframeTimeline` renders *outside* it. | MAJOR |
| C-9…C-16 | subpath discipline, F-5 realized, dropped vendor capability, type-name drift, void vendor-DOM rationale, global panel-slide over Monaco, 48 L of dead skin + two false prose claims, `any` at the library boundary. | MINOR/INFO |
| **L-1…L-3** | Superlatives: **zero R1 blast radius**, the `inert` + `@supports` pairing, and a 6-event emits contract verified 1:1 across three hops. | — |

**defects 16 · blockers 2 · superlatives 3**

---

## 1. BLOCKERS

### C-1 — the tab-strip consumption seam is dead code in the shipped app · **BLOCKER**

**Provenance (the full chain, each link a single mount site):**

```
demo/app/main.ts:32           createApp(App)                     ← the ONLY createApp; demo/app/index.html is the ONLY html entry
demo/app/App.vue:169          provide(TABS_EXTERNALLY_MANAGED_KEY, true)     ← unconditional, app-root
demo/app/App.vue              → EditorShell
  shell/EditorShell.vue:75    → <AnimationControlsGroup>
  transport/AnimationControlsGroup.vue:18 → <ControlsPaneWrapper>
  controls-pane/ControlsPaneWrapper.vue:50 → <ChannelControls>          ← the ONLY importer (:170)
ChannelControls.vue:277       inject(TABS_EXTERNALLY_MANAGED_KEY, false)     ← resolves TRUE, always
ChannelControls.vue:56        <div v-if="!tabsExternallyManaged" …>          ← therefore ALWAYS false
ChannelControls.vue:74          <KfPillTabs …>                               ← NEVER RENDERS
```

`grep -rn "TABS_EXTERNALLY_MANAGED_KEY"` over `demo/` returns exactly four lines: the key declaration, the one `provide(…, true)`, the one `inject`, and the import. There is no second provide, no `false` override, no second app root.

**What this kills, all in or under this file:**

| dead surface | site | lines |
|---|---|---|
| `<KfPillTabs>` render (+ its `:options`, `:model-value`, `@update:model-value`) | `:74–82` | 9 |
| the `stripOptions` computed | `:313–324` | 12 |
| the `extraTabs` prop + its 8-line rationale | `:263–271` | 9 |
| `useTabStripScroll(…)` and everything it returns | `:398`, composable 81 L | 82 |
| `overflowClass` binding + `reMeasure()` + `watch(selectedControl, reMeasure)` | `:81`, `:404`, `:408` | 3 |
| `.tabs-overflow-{right,left,both}` mask block | `:441–455` | 15 |
| the T.G9 **interaction** warm (`@pointerenter` / `@focusin` → `warmKeyframes`) | `:79–80` | 2 |
| `transport/index.ts:12` `KfPillTabs` async barrel export (zero importers) | — | 1 |
| `KfPillTabs.vue` + `KfPillTabs/useKfPillTabs.ts` (the S-1 fork) | — | 217 |

`import KfPillTabs from "../KfPillTabs.vue"` (`:229`) is a **static** import, so the fork is in the transport chunk's module graph regardless — paid for, never painted.

**Contradiction of the census, stated explicitly.** `lane-frontend.md` §5 S-1 writes: *"**It is live, not dead** — rendered at `components/…/ChannelControls.vue:74` (`<KfPillTabs`), registered async at `components/instrument/transport/index.ts:12`."* Both citations are correct; the conclusion is not. The lane read the render site and the barrel registration but not the enclosing `v-if` nor the App-level provide. The consequence for the census's own wave order (§10 step 2, *"S-1 — retire KfPillTabs onto SegmentedTabs + useTabRovingFocus"*) is that **step 2 is a DELETE, not a REPLACE**: there is no live pill strip to port, and porting one would resurrect an unreachable branch.

**Second-order consequence (the one that actually costs the user).** `useKeyframesPaneReveal` documents two warm paths (`useKeyframesPaneReveal.ts:26–33`): the post-LCP idle warm, and *"the instant the user selects/**interacts with**"* the surface. The interaction half is wired **only** to the never-rendered strip (`:79–80`). In the shipped app the Monaco pane's first mount is therefore governed solely by `requestIdleCallback(…, {timeout: 4000})` (`useKeyframesPaneReveal.ts:95–97`) or the 1500 ms vueuse fallback (`:72`) — or by the user selecting the surface, at which point the deferral bought nothing. Feeds C-7.

**Falsifier.** Any of: (a) a second `createApp`/entry html mounting `ChannelControls` outside `App`'s provide tree; (b) any `provide(TABS_EXTERNALLY_MANAGED_KEY, false)` between `App` and `ChannelControls`; (c) a second importer of `ChannelControls.vue`; (d) `App.vue:169` made conditional. I probed (a) `find demo -name "*.html"` → one file, `grep -rn "createApp"` → one site; (b),(d) the four-line grep above; (c) `grep -rn "ChannelControls"` → one importer. Any one of these turning up kills the finding wholesale.

---

### C-2 — the timeline `:key` remount destroys authored keyframes and the undo/redo history · **BLOCKER**

```
ChannelControls.vue:186  <Teleport to="#timeline-expanded-target" :disabled="!storedControls.isTimelineExpanded" defer>
ChannelControls.vue:187      <div v-if="isTimelineVisible"
ChannelControls.vue:189           :key="storedControls.selectedControl"          ← the defect
ChannelControls.vue:192          <KeyframeTimeline ref="timelineRef" … />
ChannelControls.vue:377  const isTimelineVisible = computed(() =>
ChannelControls.vue:378      storedControls.selectedControl === "timeline" || storedControls.isTimelineExpanded)
```

`isTimelineVisible` stays **true** on `isTimelineExpanded` alone. So when the timeline is docked into the bottom bar, `selectedControl` is free to move to `controls`/`keyframes` while the node remains mounted — and the `:key` moves with it. A keyed vnode whose key changes is not patched; it is unmounted and a fresh one mounted.

`KeyframeTimeline`'s state is **entirely component-local**: `useTimeline` (`timeline/composables/useTimeline.ts:22`) opens `const state = ref<TimelineState>({ keyframes: [], … })` and binds `useRefHistory` over it (`:56+`); there is no `createGlobalState`, no `useStorage`, no persistence (`grep -n "createGlobalState\|useStorage" useTimeline.ts` → nothing). `KeyframeTimeline.vue:194–210` destructures `state, sortedKeyframes, snapshot, undo, redo, canUndo, canRedo` from it, and `:216–217` holds `previewCache`/`previewLoading` locally.

**Failure scenario (concrete).**
1. Cube or square scene (full built-in triad). User picks the **Timeline** surface and captures several keyframes (`snapshot()`, drag-to-retime).
2. User clicks expand — `KeyframeTimeline @toggle-expand` → `storedControls.isTimelineExpanded = true` (`:197`). The timeline teleports into `#timeline-expanded-target` (`AnimationControlsGroup.vue:80`) and the tab body shows the "Timeline expanded below" placeholder (`:156–171`).
3. The timeline is now visible **below** the panel, so switching the control surface is the natural next move — the user picks **Controls** from ChromeDock's `<Select>` (`ChromeDock.vue:235`) → `storedControls.selectedControl = "controls"`.
4. `:key` changes `"timeline"` → `"controls"`. Vue unmounts `KeyframeTimeline`, mounts a new one.
5. **Every authored keyframe, the entire undo/redo history, the selected-keyframe id and the hover-preview cache are gone.** The expanded bar the user is still looking at blanks to an empty track. There is no confirm, no toast, no restore path — `canUndo` is false on the new instance.

The `defer` + `:disabled` pair on the `<Teleport>` already handles relocation; the `:key` buys nothing that Teleport does not, and its comment (`:183–185`) explains only why the Teleport sits outside the gated panels — it never justifies the key.

**Falsifier.** (a) Vue preserving a subtree across a key change — it does not; (b) `useTimeline` restoring from a persisted/global store on mount — the `ref` initialiser is a literal empty array and no store import exists; (c) `isTimelineExpanded` and `selectedControl` being unable to diverge — they are two independent fields of the same store, written from three separate sites (`ChannelControls.vue:166`, `:197`, `AnimationControlsGroup.vue` `@expand-timeline`), and ChromeDock writes `selectedControl` while the timeline is expanded. Producing a live session where step 3 is impossible would kill this.

---

## 2. MAJORS

### C-3 — three orphan `role="tabpanel"` nodes; the file's own rule, broken by its own branch · MAJOR

`:99`, `:132`, `:151` each emit `role="tabpanel"` + `data-state`. In the shipped configuration (C-1) there is **no** `role=tablist` and no `role=tab` anywhere on the page: the in-panel strip never renders, and the external manager — `ChromeDock.vue` — draws a `<Select>`, not a tablist (`grep -n "role=\"tab" ChromeDock.vue` → nothing; `:235`, `:284` are `<Select>`). None of the three panels carries `aria-labelledby` or `id`, so even a tablist elsewhere could not own them.

The condemnation is written in this file, twenty lines above the offence — `:26–30`:

> *"a bare tabpanel role without a tablist would be an ARIA defect, so the seam is a class, not a role."*

That reasoning produced `class="single-surface-panel"` on the flat branch (`:31`). The `v-else` branch then does the exact thing the comment forbids, three times — and because of C-1 the `v-else` branch is the **only** branch a multi-surface scene ever renders.

**Falsifier.** A `role=tablist` reachable in the same accessibility tree (a shadow host, a hidden strip, a dock control I mis-read), or `aria-labelledby` wiring I missed. `grep -rn "role=\"tab" demo/` returns only `KfPillTabs.vue:14,22` — inside the unreachable component.

### C-4 — `SURFACE_META` is duplicated; "one authority, no drift" is false · MAJOR · **fresh (not in the census)**

```
ChannelControls.vue:245-250   import { useSceneMachine, BUILT_IN_SURFACES, SURFACE_META, type ControlSurface } from "@state";
                                → demo/state/controlSurfaces.ts:145   export const SURFACE_META
app/dock/ChromeDock.vue:19-21 import { SURFACE_META, dockCardinality, … } from "@components/instrument/surfaceTabs";
                                → demo/components/instrument/surfaceTabs.ts:12  export const SURFACE_META
transport/TransportDock.vue:237 import { dockCardinality } from "@components/instrument/surfaceTabs";
```

`surfaceTabs.ts` is **not** a re-export. It re-declares `ControlSurfaceTab` (`:6–10`), `SURFACE_META` (`:12–19`), `extraTabsFrom` (`:21–23`) and `dockCardinality` (`:25–41`) with independent bodies, importing only `BUILT_IN_SURFACES`/`ControlSurface` from `@state/controlSurfaces`. The two `SURFACE_META` literals are today value-identical — six rows, same labels, same icon keys.

This component makes two load-bearing claims that the tree refutes:

- `:283–286` — *"Reading the SAME projection the dock reads keeps the two tab hosts in lockstep — one authority, no drift."*
- `:294–296` — *"the tab {label,icon} metadata resolves from the ONE `SURFACE_META` registry (controlSurfaces.ts); the former local `BUILT_IN_TAB_META` copy (one of the three hand-synced sites) is DELETED."*

The count went 3 → 2, not 3 → 1. `controlSurfaces.ts:141–144` states the invariant being violated: *"THE ONE SURFACE-METADATA REGISTRY … both docks and the in-panel strip resolve every tab's `{label,icon}` from HERE (proof:dfa-derived's 'resolves from exactly ONE module' clause)."* The in-panel strip does; **ChromeDock does not**. `TransportDock` additionally reads the duplicate's `dockCardinality` while the `@state` copy is what the surface derivation is documented against.

There is no visible drift today because the copies agree. The defect is that nothing holds them in agreement — the next label edit (`T.E8`-class: `easing → "Curve"`, `spring → "Physics"`) applied to one file silently desynchronises the panel strip from the dock.

**Falsifier.** `surfaceTabs.ts` turning out to be a re-export of `@state/controlSurfaces` (it is not — read the file), or ChromeDock importing `SURFACE_META` from `@state` (it does not — `ChromeDock.vue:19–21`).

### C-5 — a third, redundant `TooltipProvider` · MAJOR

```
app/App.vue:3                       <TooltipProvider>                                    (no props → glass-ui defaults)
transport/AnimationControlsGroup.vue:2  <TooltipProvider :delay-duration="100" :skip-delay-duration="0">
channel-controls/ChannelControls.vue:2  <TooltipProvider :delay-duration="100" :skip-delay-duration="0">
```

`git blame -L 1,4` puts ChannelControls's provider at `1fe4000f` (2026-02-26). The App-root provider is **HEAD** (`8281638c`, 4 lines added to `App.vue`), whose message reads:

> *"mount the single provider at the stable application control-group boundary — **keep tooltip timing ownership out of leaf controls**."*

The leaf still owns it. Worse, the *immediate* ancestor `AnimationControlsGroup` already provides the identical `100/0` pair, so ChannelControls's provider re-provides values that are byte-identical to the ones already in scope: it is pure redundancy, not a deliberate local override. Reka's `TooltipProvider` nests legally, so nothing breaks — but the app now carries three provider scopes on one path with two distinct timing regimes (App's defaults for shell chrome, `100/0` for everything under the controls group), which is exactly the split the HEAD commit set out to remove.

Note also that ChannelControls's own template renders **no** tooltip trigger. Every consumer of this provider is a descendant (`ChannelOptions.vue:423` `Tooltip/TooltipContent/TooltipTrigger`, `KeyframeTimeline.vue:172` likewise), all of which sit under `AnimationControlsGroup` anyway.

**Falsifier.** A mount path where `ChannelControls` is *not* a descendant of `AnimationControlsGroup` — impossible on the single chain proved in C-1 — or a deliberate divergence in the two prop sets, which there is not (both `100`/`0`).

### C-6 — the vendor prose is three majors stale, and 7.0.0 answers the fork's *second* argument too · MAJOR (extends S-1/S-2)

The file states, as fact, in a comment attached to the render site (`:66–73`):

> *"the installed 4.0.1 pill emits the orientation attribute UNCONDITIONALLY on its `role=group`, forcing an undefined-binding suppress."*

The installed package is **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`). Lane-frontend S-1 already established the emission is now conditional (`dist/tabs.js:232` `… : void 0`). This challenge adds the piece the lane left open. Lane-frontend §10 step 2 wrote:

> *"the fork's **secondary** claim (that a panel-switcher wants `role=tablist`, not `role=group`) is a **design** argument that the 7.0.0 aria fix does not by itself answer."*

It does answer it. `dist/components/tabs/SegmentedTabs.vue.d.ts` ships:

```ts
export type SegmentedTabsVariant   = "pill" | "underline";
export type SegmentedTabsSemantics = "toggle" | "tabs";   // "tabs exposes a tablist with selected tabs"
/** Interaction semantics, independent of `variant`. */
semantics?: SegmentedTabsSemantics;
```

Material and ARIA role are **decoupled** in 7.0.0: `<SegmentedTabs variant="pill" semantics="tabs">` is the pill chip register *with* `role=tablist`/`role=tab` — precisely the fork's stated requirement (`KfPillTabs.vue:9–11`). Both the primary (aria-orientation) and secondary (role) rationales are void against the installed artifact. Combined with C-1, the disposition is delete-not-port.

Three further prose claims in this file are stale in the same direction, all describing a `<SegmentedTabs>` the tree does not render (this is S-2's "prose and tree disagree", localised here):

- `:41–55` — *"the reka `<Tabs>`/`<TabsList>` strip is the canonical `<SegmentedTabs>`"* (it is `KfPillTabs`).
- `:220–228` — *"the canonical panel-nav is `<SegmentedTabs variant=\"underline\">` from `/tabs`"* — which also **contradicts `:57–65` in the same file**, where the material is asserted to be `pill` ("pills if tabs at all"). One file, two mutually exclusive statements about the same strip.
- `:86–96`, `:305–312` — panel/strip ownership described in `<SegmentedTabs>` terms.

**Falsifier.** A second glass-ui install resolving 4.0.1 for this import (there is one directory, real, not a symlink, version 7.0.0), or `semantics` not reaching the `role` attribute at runtime — the latter is a d.ts-level read and is marked **UNPROVEN-NEEDS-LIVE** for the emitted DOM; the *contract* claim stands on the shipped types.

### C-7 — the exposed keyframes handle is a nullable the parent cannot see · MAJOR

```
ChannelControls.vue:372  const keyframesControlsRef = useTemplateRef<…>("keyframesControlsRef")
ChannelControls.vue:410  defineExpose({ keyframesControlsRef, timelineRef, selectControl })
AnimationControlsGroup.vue:193-196  activeKeyframesRef = computed(() => animControlRefs[name]?.keyframesControlsRef)
RibbonBar.vue:20,28,40,53           @click="activeKeyframesRef?.copyCSS?.()"  … formatCSS  … exportCompiledCSS  … applyCSSStyles
```

`keyframesControlsRef` is `null` whenever the pane has not mounted — which is gated twice: `v-if="hasSurface('keyframes') && keyframesWarmed"` (`:130`) and then the `defineAsyncComponent(() => import("../../keyframes/KeyframesStringControls.vue"))` (`:252`) resolution, which pulls Monaco. RibbonBar's keyframes block renders on `storedControls.selectedControl === 'keyframes'` (`RibbonBar.vue:16`), i.e. on the *same tick* the warm is triggered — so all four buttons paint before the handle exists.

They carry no `:disabled`, no `loading`, no skeleton. glass-ui's `ButtonProps` ships both levers (`dist/components/button/Button.vue.d.ts`: `loading?: boolean` — *"Marks an in-flight command and suppresses activation until it settles"* — and `disabled?`). The optional-chain `?.` converts every click in that window into a silent no-op: **Copy**, **Format**, **Export CSS** and **Apply CSS** appear live and do nothing, with no feedback of any kind.

This is a contract defect owned by ChannelControls, not RibbonBar: the component chose to expose a raw nullable template ref as its public handle rather than a readiness flag (`keyframesWarmed` is right there at `:389`) or a promise-shaped API.

**Falsifier.** A `:disabled`/`loading` binding on those four buttons that I missed (`RibbonBar.vue:16–66` has none), or the async chunk resolving synchronously (it cannot — it is a dynamic `import()` of a Monaco-bearing SFC). The *duration* of the window is **UNPROVEN-NEEDS-LIVE**; its existence is static.

### C-8 — the `timeline` tabpanel contains no timeline · MAJOR

```
:149  <div v-if="hasSurface('timeline') && selectedControlSurface === 'timeline'" role="tabpanel" …>
:156      <div v-if="storedControls.isTimelineExpanded"> … "Timeline expanded below" + Collapse … </div>
:172  </div>
:180  <slot name="tabs-content"></slot>
:186  <Teleport …><KeyframeTimeline … /></Teleport>          ← SIBLING of the panel, not inside it
```

When the Timeline surface is selected and *not* expanded, the panel that carries `role="tabpanel"` renders **empty** (its only child is gated on `isTimelineExpanded`), and the actual timeline renders after the slot, outside every panel, via a `:disabled` Teleport. A user (or an AT) that reaches the "Timeline" panel finds nothing in it; the widget is a floating sibling.

The comment (`:183–185`) justifies the placement — *"outside the gated panels but inside the scrollable area so Teleport lifecycle isn't tied to a panel mount/unmount (which breaks moveTeleport)"* — which explains the *mechanism* and concedes the *structure*. The panel is left as an empty labelled shell.

**Falsifier.** The Teleport rendering inside the panel (it does not — read the nesting), or the panel gaining `aria-owns`/`aria-controls` to the teleported node (it has none).

---

## 3. MINORS / INFO

### C-9 — root-barrel glass-ui import where per-component subpaths exist · MINOR

```
ChannelControls.vue:219  import { TooltipProvider, Button } from "@mkbabb/glass-ui";
ChannelOptions.vue:423   import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui/tooltip";
```

`./tooltip` and `./button` are both first-class subpath exports (73 total, verified from the installed `package.json.exports`). Two sibling files **in the same directory** consume the same family through two different specifiers. `sideEffects: ["*.css"]` means the JS is nominally tree-shakeable, so I make **no** bundle-size claim; the defect is discipline — it is the fork of the census's 31-root/6-`/tooltip` split, reproduced inside one folder.

*Falsifier:* a measured bundle showing the root barrel adds nothing, which would leave only the stylistic half — that measurement is **UNPROVEN-NEEDS-LIVE** and would not change the discipline finding.

### C-10 — F-5 realized on adjacent lines · MINOR (cites lane-frontend F-5)

```
:229  import KfPillTabs from "../KfPillTabs.vue";                          ← real path
:230  import type { KfPillTabOption } from "../composables/useKfPillTabs";  ← the 4-line back-compat shim
```

`transport/composables/useKfPillTabs.ts` exists solely to `export { useKfPillTabs, type KfPillTabOption } from "../KfPillTabs/useKfPillTabs"`. Lane-frontend F-5 already named this pair "incoherent"; this challenge confirms it verbatim and adds that it violates the standing `feedback_no_backwards_compat` law. Under C-1 the whole triple deletes together.

### C-11 — the fork drops vendor capability the registry already supplies · MINOR

`builtInTabs` (`:299–303`) maps `SURFACE_META[s]`, i.e. full `ControlSurfaceTab` objects carrying `icon` (`SlidersHorizontal`/`Braces`/`Clock`/`Activity`/`Grid3X3`). `KfPillTabs.vue:33` renders `{{ opt.label }}` — icons dropped. glass-ui's `SegmentedTabOption` supports `icon?: string` **and** `tooltip?: string`. The fork is a capability *regression* against the primitive it replaced, on data the demo already computes and ChromeDock already renders. Dead under C-1, live again the moment anyone "fixes" C-1 by un-hiding the strip.

### C-12 — one payload, two type names, three hops · MINOR

```
EditorShell.vue:169                 extraTabs?: SegmentedTabOption[]   (glass-ui/tabs)
AnimationControlsGroup.vue:173      extraTabs?: SegmentedTabOption[]
ControlsPaneWrapper.vue:198         extraTabs?: SegmentedTabOption[]
ChannelControls.vue:271             extraTabs?: KfPillTabOption[]      (the kf fork)
```

I verified this **type-checks**: `SegmentedTabOption` = `{label; value: string; icon?; disabled?; tooltip?}` is a structural superset of `KfPillTabOption` = `{label; value: string; disabled?}`, and the assignment is not an object literal, so excess-property checking does not fire. So this is **not** a type error — it is the S-2 pattern at its sharpest: the demo carries glass-ui's data contract across three components and then renames it at the terminal consumer that rejects glass-ui's renderer. `EditorShell.vue:178` defaults it to `() => []` and nothing overrides, so the chain is dead end-to-end (C-1).

### C-13 — `useTabStripScroll`'s "documented vendor-DOM contract" is void · MINOR

`useTabStripScroll.ts:28–30`, `:47–56`, `:65–70` justify a raw `querySelector("[role=tablist]")` / `querySelector("[role=tab][aria-selected=true]")` as *"a single DOCUMENTED vendor-DOM contract (the `[data-sonner-toaster]` disposition)"* because `<SegmentedTabs>` *"owns its option buttons internally (no per-trigger ref hook)"*. The strip is `KfPillTabs` — **first-party**, 124 lines, editable, which could `defineExpose` its list node in one line. There is no vendor and no contract; it is a first-party DOM reach wearing a vendor exemption. (Inert anyway under C-1: `tabsHeaderEl` is permanently `null`, so `onMounted` sets `tabsListElRef = null` and every probe no-ops.)

### C-14 — the global panel-slide re-fires over the force-mounted Monaco subtree · MINOR

`styles/tab-idiom.css:75–79` is a **global**, unscoped rule:

```css
[data-state="active"][role="tabpanel"] { animation: enter var(--duration-fast) var(--ease-out); … }
```

`ChannelControls.vue:132` binds `:data-state="keyframesActive ? 'active' : 'inactive'"` on the *force-mounted, never-unmounted* Monaco pane. Every switch-back therefore flips the attribute, re-triggering an opacity+translate animation across the whole cached Monaco subtree in the same frame that `content-visibility: hidden` → visible restoration forces layout on it (`:422–424`). Mechanism **CONFIRMED statically** (global selector + reactive attribute + the B-2 force-mount are all in the tree); the cost is **UNPROVEN-NEEDS-LIVE** and belongs to the SS-13 visual/perf audit.

### C-15 — 48 L of dead skin, and two false prose claims about it · MINOR

`grep -rn "tab-trigger"` over `demo/` returns **no consumer**: the only hits are `styles/tab-idiom.css` itself, one prose line in `playback-idiom.css:7`, and three comments in this file. So `tab-idiom.css:22–69` (`.tab-trigger-base`, `-pill`, `-underline` + their `[data-state]` variants, 48 lines) has zero users. This file asserts the opposite at `:213–214`:

> *"the `.tab-trigger-*` classes survive for the scene tab triggers that still reference them (a cross-cluster follow-on migrates those)."*

No scene tab trigger references them. Separately, `tab-idiom.css`'s own header (`:14`, `:18`) claims it is *"a non-scoped colocated partial imported by AnimationControls.vue … The partial loads whenever AnimationControls mounts"* — it is actually imported by `styles/design-idioms.css:7`, a global stylesheet loaded on every page, from the app cascade root. Only `:75–79` (the panel slide) is live, and it lands correctly on this host's panels — the one true sentence in `:208–214`.

### C-16 — `any` at the library boundary · INFO

`animation: KeyframesAnimation<any>` (`:258`) is the component's central prop and rides every emit payload (`:357`, `:363`); `useTemplateRef<any>("keyframesPaneEl")` (`:388`) discards the element type, forcing the `$el ?? value` duck-resolve in `useKeyframesPaneReveal.ts:128–130`. The `any` is inherited from `ControlsPaneWrapper.vue:204` and ultimately `AnimationGroup<any>`, so this is a repo-wide idiom, not a local choice — recorded for the library-boundary lane, not scored against this file.

---

## 4. Claims I built and then KILLED against the tree

Recorded because a false defect is worse than a missed one — each of these looked like a finding and did not survive its own falsifier.

| killed claim | what killed it |
|---|---|
| *`storedControls` is captured once from a destructured prop (`:274`) and never re-resolves when `animation` changes.* | `ControlsPaneWrapper.vue:45–48` keys the `v-for` by `host.animation.id`, so a `ChannelControls` instance is born and dies with one animation — the prop cannot change under an instance. Their comment (`:41–44`) says exactly this. **Not a defect.** |
| *`aria-label="Control surface"` (`:76`) will not bind to `KfPillTabs`' camelCase `ariaLabel` prop.* | Vue camelizes incoming prop keys in `setFullProps`; `aria-label` → `ariaLabel` resolves, and being declared it does not also fall through as an attribute. **Not a defect.** |
| *`SegmentedTabOption[]` → `KfPillTabOption[]` (`ControlsPaneWrapper.vue:65` → `ChannelControls.vue:271`) is a type error.* | Structural superset, non-literal assignment, no excess-property check. Demoted to C-12 (contract-quality, not correctness). |
| *`.tabs-overflow-*` scoped rules cannot match, because they are bound onto a child component's root (`:81`).* | Vue applies the parent's `data-v-*` scope id to a child's root node; the selector would match. Killed on the CSS mechanism; the block is dead for the unrelated reason C-1. |
| *`useTemplateRef` on `defineAsyncComponent` wrappers (`:372–373`) yields the wrapper, not the inner instance, so `defineExpose` hands the parent the wrong object.* | The async wrapper forwards `vnode.ref` to the inner component vnode (`createInnerComp`), so the ref resolves to the inner instance once loaded. The *nullability* survives as C-7; the *identity* claim is dead. |

---

## 5. Superlatives (L-18 runs both ways)

### L-1 — the value.js R1 blast radius through this subtree is **ZERO** · superlative

The R1 class is `parseCssColor`'s shipping crash (`parseCssColor("oklch()")`). Across the whole demo it appears **once**:

```
demo/scenes/square/useSquareTumble.ts:2,22   parseCssColor(css)      ← the known R1 crash surface
```

— and that file is in `scenes/square/`, unreachable from `ChannelControls`. I walked the component's full import closure (`ChannelOptions` → `TimingFunctionPanel`, `LayerConfigPanel`, `PlaybackRibbon`, `useAnimationSync`, `usePlaybackToggle`, `useTimingFunctionEditor`, `easingGroups`, `animationDescriptions`; plus the two async panes `KeyframesStringControls`, `KeyframeTimeline`). The value.js edges it reaches are:

```
ChannelOptions.vue:426                    clamp                 @mkbabb/value.js/math      (no grammar)
useTimingFunctionEditor.ts:1              cubicBezierToString   @mkbabb/value.js/math      (serialize)
TimingFunctionPanel.vue:49,52             JumpPosition, bezierPresets  @mkbabb/value.js/easing  (data/types)
utils/reference-data/animationDescriptions.ts:76  parseTimingFunction  ← the ONLY grammar call
```

And that one grammar call is consumed **correctly**. `timingFunctionState` (`animationDescriptions.ts:68–96`) takes the result-typed contract and branches on it:

```ts
const parsed = parseTimingFunction(value);
if (parsed.ok) { … }
const registered = easing(value);
if (registered.ok) return { status: "registry", kind: value };
return { status: "invalid", source: value, diagnostics: parsed.diagnostics };
```

No throw, no swallow, no `!`-assert — it surfaces `diagnostics` and falls back to the keyframes easing registry. Against `lane-library.md §7.5`'s five inconsistent postures on the parse seam (absorb / throw `TypeError` / swallow to `[]` / throw `AnimationOptionError` / throw `TypeError`), this consumer picks the best available one and is the **only** grammar edge in the component's closure. A value.js parser wave can change diagnostic shape without reaching this component's failure behaviour at all.

*Falsifier:* a dynamic `import()` chain into a `parseCssColor`/`parseStylesheet` caller that a static grep misses. I checked the two `defineAsyncComponent` targets (`:252`, `:253`) explicitly; both are grep-clean.

### L-2 — the B-2 cache is correct on **both** the a11y and the fallback axis · superlative

`:129–137` + `:417–433` do three things most force-mount caches get wrong:

1. **`inert`, not bare `aria-hidden`** (`:136`). The comment (`:120–127`) names the exact defect avoided — *"bare aria-hidden … leaves focusable Monaco descendants in the tab order — the aria-hidden-focus a11y defect"*. `inert` removes the cached editor from the tab order *and* the AT tree; the reveal-focus in `useKeyframesPaneReveal.ts:123–136` restores it.
2. **A correctness fallback for `content-visibility`** (`:429–433`): `@supports not (content-visibility: hidden) { display: none }` — the cache benefit is lost where unsupported, but the "exactly one visible pane" invariant holds. The comment states that trade explicitly.
3. **`tabindex` mirrors the active flag** (`:133`) so the panel is focusable exactly when revealed.

A force-mounted 4 MB editor subtree is the single most likely place in this tree to leak focus into a hidden region, and it does not.

### L-3 — the 6-event emits contract is typed and verified 1:1 across three hops · superlative

`:352–370` declares six events with full payload types. I checked every one against both the source and the sink:

| event | emitted by | payload declared at | consumed at |
|---|---|---|---|
| `sliderUpdate` | `ChannelOptions.vue:514–519` | `{t: number; animation: KeyframesAnimation<any>}` | `ControlsPaneWrapper.vue:306` — identical |
| `keyframesUpdate` | `KeyframesStringControls.vue:53–60` | `{animation: KeyframesAnimation<any>}` | `ControlsPaneWrapper.vue:307` — identical |
| `togglePlay` | `ChannelOptions.vue:520` | — | `:308` |
| `layerConfigUpdate` | `ChannelOptions.vue:521` | `Partial<AnimationLayerConfig>` | `:309–313` (re-keyed with `name`) |
| `scrubStart` / `scrubEnd` | `ChannelOptions.vue:522–523` | — | `:314–315` |

Zero string drift, zero `any` payloads beyond the repo-wide `KeyframesAnimation<any>` (C-16), and no `$emit` escape hatches. For a component that is a pure pass-through on this axis, the emit surface is the cleanest thing in the file.

---

## 6. Disposition for the replacement wave

1. **C-1 first, and it is a DELETE.** Remove the `v-if="!tabsExternallyManaged"` branch and everything downstream of it — `KfPillTabs.vue`, `KfPillTabs/useKfPillTabs.ts`, `composables/useKfPillTabs.ts` (C-10), `useTabStripScroll.ts`, `stripOptions`, the `extraTabs` prop and its three upstream hops (C-12), the `.tabs-overflow-*` block, and `transport/index.ts:12`. **Re-home the T.G9 interaction warm** (`:79–80`) onto ChromeDock's control `<Select>` before deleting, or the perf mechanism dies with the branch. This supersedes lane-frontend §10 step 2.
2. **C-2 next** — drop `:key` from `:189`; it is data loss and it is a one-token fix.
3. **C-3 + C-8** — with the strip gone the three panels have no tablist by construction: either give them `aria-labelledby` pointing at a real tab in ChromeDock, or take the flat-mount seam the file already invented at `:31` (`class="single-surface-panel"`, no role) and use it for all panels. Move the timeline inside its own panel or stop labelling the empty shell.
4. **C-4** — collapse `components/instrument/surfaceTabs.ts` into `@state/controlSurfaces.ts`; repoint `ChromeDock.vue:19–21` and `TransportDock.vue:237`. Restores the invariant this component's comments already claim.
5. **C-5** — delete `ChannelControls.vue:2`/`:204`; keep `AnimationControlsGroup.vue:2` (or fold that into App's too, per the HEAD commit's intent).
6. **C-6, C-15** — the comment sweep. This file's prose is the densest false-fact surface I read: five stale `<SegmentedTabs>` claims, one internally contradictory pair (`:57–65` pill vs `:222` underline), one false "ONE registry", one false ".tab-trigger-* survives".
7. **C-7** — expose `keyframesWarmed` (or a `ready` flag) alongside the handle; bind `RibbonBar`'s four buttons to `:disabled` / `loading`, both of which glass-ui `Button` already ships.

F-1 remains the precondition for all of it: nothing here is reproducible while `@mkbabb/glass-ui` is absent from `package.json` **and** `package-lock.json`.

---

## Provenance note

Read whole and read-only: `ChannelControls.vue` and all 13 of its direct imports plus their transitive first ring — `KfPillTabs.vue`, `KfPillTabs/useKfPillTabs.ts`, `composables/useKfPillTabs.ts`, `injectionKeys.ts`, `useSelectedControlSurface.ts`, `useKeyframesPaneReveal.ts`, `useTabStripScroll.ts`, `state/controlSurfaces.ts`, `state/useSceneMachine.ts`, `state/controlOptionsStore.ts`, `ChannelOptions.vue` (script), `KeyframesStringControls.vue`, `KeyframeTimeline.vue` (script), `useTimeline.ts`, `ControlsPaneWrapper.vue`, `AnimationControlsGroup.vue`, `RibbonBar.vue`, `App.vue` (script+provides), `ChromeDock.vue` (imports), `surfaceTabs.ts`, `styles/tab-idiom.css`, `animationDescriptions.ts`. Vendor evidence read from `keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (7.0.0, the installed copy) and `node_modules/@mkbabb/value.js/package.json` (4.0.0). No file in any repo was written, mutated, or executed except this challenge document; no installs, no dev servers, no browser tooling.
