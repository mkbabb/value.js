claude-opus-5[1m]

# CHALLENGE · RibbonBar · axis L (LIBRARY)

**Target** `keyframes.js/demo/components/instrument/transport/controls-pane/RibbonBar.vue` (151 lines)
**Date** 2026-08-06 · **Mode** static, source-derived. No browser tooling (SS-13 owns the live pass).
**Repo law** keyframes.js read-only. Sole write = this file.

**Verdict** — 13 defects (1 BLOCKER · 4 MAJOR · 6 MINOR · 2 INFO), 3 superlatives.
The component is small, legible, and its *Controls* surface is the best-designed seam in the
transport cluster. Its *Keyframes* and *Timeline* surfaces are the worst: eight buttons that
remote-control two components three hops away by string name, through `any`, inside a file that
**no typechecker in this repository reads**. The file therefore contains both the disease and the
cure — S-3 is the pattern M-4 asks for.

---

## 0. Read set

Whole file + every module reachable from its three imports, plus the props' provenance chain
(read-only, all under `/Users/mkbabb/Programming/keyframes.js/`):

| | file |
|---|---|
| imports | `@lucide/vue` (`node_modules/@lucide/vue/dist/lucide-vue.d.ts`) |
| | `@mkbabb/glass-ui` → `node_modules/@mkbabb/glass-ui/dist/components/{button/Button.vue.d.ts, card/Card.vue.d.ts, card/CardContent.vue.d.ts, surface/Surface.vue.d.ts, _shared/axes.d.ts}` + compiled `dist/button-B7c944jy.js` |
| | `@state` → `demo/state/controlOptionsStore.ts`, `demo/state/controlSurfaces.ts` |
| prop provenance | `controls-pane/ControlsPaneWrapper.vue` · `AnimationControlsGroup.vue` · `AnimationControlsGroup/useControlsKeyboardShortcuts.ts` · `channel-controls/ChannelControls.vue` · `channel-controls/ChannelOptions.vue` · `channel-controls/composables/{useSelectedControlSurface,useKeyframesPaneReveal}.ts` |
| callee surfaces | `instrument/keyframes/KeyframesStringControls.vue` (+`composables/useKeyframeBrushApply.ts`, `demo/utils/clipboard.ts`) · `instrument/timeline/KeyframeTimeline.vue` (+`composables/{useTimeline,useTimelineBuild,useTimelineOps}.ts`) |
| slot consumers | `scenes/{cube/CubeScene,spring/SpringScene,easing/EasingScene}.vue` · `app/App.vue` · `shell/EditorShell.vue` |
| chrome | `transport/components/DemoGlobalChrome.vue` · `app/lifecycle/useMonacoCancellationGuard.ts` |
| build/type | `package.json` · `package-lock.json` · `tsconfig.json` · `demo/env.d.ts` · `vite.config.ts` · `.github/workflows/ci.yml` · `demo/styles/{style,design-idioms,playback-idiom}.css` |

**Hitherto corpus folded** — `V/megatranche/formation/keyframes/lane-frontend.md` §0/§2 **F-1** (phantom
dep) and §3.2 (named-import surface, which lists this file's barrel draw). Not re-derived; independently
re-verified once (see i-1) and cited thereafter.

---

## 1. BLOCKER

### B-1 · Nothing typechecks this file. The `: any` on lines 139–140 is a symptom, not the cause.

**Severity** BLOCKER · **Provenance** `RibbonBar.vue:137-141`; `demo/env.d.ts:3-7`; `package.json:41`
(`"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`); `tsconfig.json` (`"include": ["src/", "demo/"]`);
`.github/workflows/ci.yml:41-42`

Four independent facts, each measured:

1. `demo/env.d.ts:3-7` shims every SFC to `DefineComponent<{}, {}, any>`:
   ```ts
   declare module "*.vue" {
       import type { DefineComponent } from "vue";
       const component: DefineComponent<{}, {}, any>;
       export default component;
   }
   ```
2. `vue-tsc` is **absent** — not in `package.json` devDependencies, not in `node_modules/.bin`
   (`ls node_modules/.bin | grep -i vue-tsc` → empty).
3. `npm run check` is plain `tsc`, which cannot parse SFCs. Measured: `npx tsc --noEmit --listFiles`
   emits **126** `demo/` files and **zero** `.vue` files. `RibbonBar.vue` is not in the program.
4. CI never runs `check` at all — `ci.yml:41-42` runs only `check:lib` (`tsconfig.lib.json`, `src/` only).
   The nightly `demo-correctness` job builds (`gh-pages`) and runs a browser roster; Vite does not typecheck.

**Consequence at this file.** Its 3 props, 8 `@click` expressions, 2 `:class` arrays, 1 `:style`
ternary, and 4 glass-ui prop names are verified by *runtime only*. I confirmed this empirically:
`npx tsc --noEmit` over the whole repo exits **0** while `scenes/cube/CubeScene.vue:187` passes a
`variant` prop that glass-ui 7.0.0's `ButtonProps` does not declare (see m-2) — the checker cannot
see either file.

This reframes every downstream finding: replacing `activeKeyframesRef: any` with an honest type
would change **nothing today**, because no tool reads the annotation. B-1 must land before M-2 is
worth doing.

**Falsifier** — produce any checker in this repo that parses SFCs: a `vue-tsc` invocation in a script
or workflow, a `@vue/language-tools` / `vue-tsc` dependency, `allowArbitraryExtensions` + a `.vue.d.ts`
emitter, or a type-aware `eslint-plugin-vue` config. Or show one `.vue` path in
`npx tsc --noEmit --listFiles`. Any one of these kills B-1. (`npm run lint` is
`depcruise src` — `src/` only, and structural, not type-aware.)

---

## 2. MAJOR

### M-1 · Eight buttons that silently do nothing during a multi-second, deterministic window

**Severity** MAJOR · **Provenance** `RibbonBar.vue:20,28,40,53,76,84,92,100`;
`ChannelControls.vue:252-253,130,188`; `useKeyframesPaneReveal.ts:60-110`; `vite.config.ts:315-317,345`

Every handler is `target?.method?.()`. Both targets are `defineAsyncComponent`:

```
ChannelControls.vue:252  const KeyframesStringControls = defineAsyncComponent(() => import("../../keyframes/KeyframesStringControls.vue"));
ChannelControls.vue:253  const KeyframeTimeline      = defineAsyncComponent(() => import("../../timeline/KeyframeTimeline.vue"));
```

No `Suspense` wraps them (the only `<Suspense>` in the demo is the scene host, `App.vue:74`), no
`loadingComponent`, no `delay`. So `keyframesControlsRef` / `timelineRef` stay `null` until the chunk
resolves.

RibbonBar's gate is **synchronous**: `storedControls.selectedControl === 'keyframes'` (`:13`) flips the
instant the tab is picked. The editor's gate is `hasSurface('keyframes') && keyframesWarmed`
(`ChannelControls.vue:130`), and `keyframesWarmed` gates a chunk that `vite.config.ts:315-317` parks in
`vendor-monaco` — described in-tree as "the 4 MB editor" (`vite.config.ts:296`), with a dedicated
deferred-CSS plugin (`:345`). Ordering is therefore fixed:

```
t0  user selects Keyframes → store writes → RibbonBar renders 4 enabled buttons
t0  warmKeyframes() fires (useKeyframesPaneReveal.ts:105-110, immediate watch)
t1  ChannelControls re-renders, async component begins fetching vendor-monaco (~4 MB)
t2  chunk resolves → inner component mounts → keyframesControlsRef finally non-null
```

Between t0 and t2 all four buttons are rendered, hit-testable, at full opacity, with no `disabled`,
no `loading`, no toast, no console warning. `?.` swallows the null. The Timeline tab is identical
(`isTimelineVisible`, `ChannelControls.vue:377-379` → an async `KeyframeTimeline` behind a
`<Teleport … defer>` at `:188`).

The repo already owns the correct idiom four files away — `KeyframeTimeline.vue:19,35` binds
`:disabled="!canUndo"` / `:disabled="!canRedo"` on the same glass-ui `Button`. And `ButtonProps`
declares both `disabled` and `loading` (`dist/components/button/Button.vue.d.ts:15-17`), with the
compiled component honouring them (`dist/button-B7c944jy.js`: `m = loading || disabled === true`,
gating the native `disabled` attribute). The lever exists and is unused here.

**Falsifier** — show `keyframesControlsRef` non-null before the `vendor-monaco` chunk resolves; or find a
`disabled` / `loading` / `aria-disabled` binding on any of the eight; or show a user-visible signal on a
null-target click. Any one kills M-1. (`_KF_ANALYZE_` chunk map or a live network trace would *quantify*
the window; the window's existence does not depend on it.)

### M-2 · Remote control by string, through `any`, across three hops — where the real type exists one hop up

**Severity** MAJOR · **Provenance** `RibbonBar.vue:139-140`; `ControlsPaneWrapper.vue:195-196`;
`AnimationControlsGroup.vue:191-201`; `ChannelControls.vue:372-373,411-412`;
`useControlsKeyboardShortcuts.ts:20-22`

The chain, verbatim:

```
ChannelControls.vue:372   useTemplateRef<InstanceType<typeof KeyframesStringControls>>("keyframesControlsRef")   ← typed (nominally)
AnimationControlsGroup.vue:191  const animControlRefs = reactive<Record<string, any>>({});                       ← erased
AnimationControlsGroup.vue:193-196  computed(() => animControlRefs[name]?.keyframesControlsRef)                   ← any
ControlsPaneWrapper.vue:195   activeKeyframesRef: any;                                                            ← any
RibbonBar.vue:139             activeKeyframesRef: any;                                                            ← any
```

RibbonBar names eight members it can neither see nor import: `copyCSS`, `formatCSS`,
`exportCompiledCSS`, `applyCSSStyles`, `cssApplied`, `snapshot`, `openImportDialog`, `exportCSS`,
`openAddCSSDialog`. **All nine currently exist** — verified against
`KeyframesStringControls.vue:171-182` and `KeyframeTimeline.vue:296-307`. Renaming any one of them
produces: no compile error (B-1), no runtime error (`?.`), no log. A dead button.

Two aggravations:

- **The "typed" hop is itself fictional.** `InstanceType<typeof KeyframesStringControls>` where
  `KeyframesStringControls` is a `defineAsyncComponent(...)` yields the *wrapper's* instance type,
  which carries none of the inner `defineExpose` members. So the type is not merely erased downstream —
  it never carried the surface. (Runtime is fine: Vue forwards the ref to the loaded inner component.)
- **The name means two different shapes.** `RibbonBar.vue:139` `activeKeyframesRef: any` holds the
  *unwrapped instance* (`activeKeyframesRef?.copyCSS?.()`), while `useControlsKeyboardShortcuts.ts:20`
  `activeKeyframesRef: Ref<any>` holds a *ref* (`activeKeyframesRef.value?.copyCSS?.()`). Same
  identifier, same producer (`AnimationControlsGroup.vue:330-331` passes the computed to both), two
  incompatible contracts, both `any`. Swapping them is undetectable.

The prop is also declared **required** (`activeKeyframesRef: any`, no `?`) while its producer returns
`null` whenever no animation is selected (`AnimationControlsGroup.vue:195`).

**Falsifier** — find an exported interface (or a `defineExpose` satisfying one) that RibbonBar's props
reference; or show that `InstanceType<typeof defineAsyncComponent(...)>` resolves the inner exposed
members in TS 6; or show a checker that would flag a renamed `copyCSS`.

### M-3 · `Copy` and `Format` can fail with total silence — in a ribbon where the other six report honestly

**Severity** MAJOR · **Provenance** `RibbonBar.vue:20,28`; `KeyframesStringControls.vue:83-88,173-177`;
`demo/utils/clipboard.ts`; `app/lifecycle/useMonacoCancellationGuard.ts:26-33`

`demo/utils/clipboard.ts` in full:

```ts
export async function copyText(text: string, successMessage?: string): Promise<void> {
    await navigator.clipboard.writeText(text);            // ← no catch
    if (successMessage) toast.success(successMessage);
}
```

`copyCSS` (`KeyframesStringControls.vue:173-177`) awaits it with no `try`. `RibbonBar.vue:20` calls it
as `activeKeyframesRef?.copyCSS?.()` — a floating promise, neither awaited nor caught. A rejection
(`writeText` denied; `navigator.clipboard` undefined on a non-secure origin — the LAN-device path this
demo supports via `vite.config.ts` `server.host`) becomes an unhandled rejection.

Nothing surfaces it. The one global handler
(`useMonacoCancellationGuard.ts:26-33`) `preventDefault()`s **only** Monaco's `"Canceled"` signature and
deliberately leaves everything else "to surface untouched" — i.e. as console noise, invisible to the user.
Net effect: the Copy button appears to work and does not.

`formatCSS` is the second silent path: `formatEditor` (`:83-88`) is `if (!editorRef.value) return;` —
no feedback. And `copyCSS` no-ops silently when `cssKeyframesString.value` is empty (`:174`).

The asymmetry is the sharpest part. In the **same ribbon**, `exportCompiledCSS` (`:161-167`) wraps
everything in `try/catch` + `toast.error`; `exportCSS` (`useTimelineBuild.ts:119-142`) validates
(`< 2 keyframes` → `toast.error`) *and* catches; `snapshot` (`useTimelineOps.ts:21-35`) validates
(`no target` → `toast.error`) *and* confirms on success. Six of eight buttons are honest; two are mute.

**Falsifier** — show a `try`/`catch` or `.catch()` on the `copyCSS` path; or a global
`unhandledrejection` → toast; or `app.config.errorHandler` surfacing it (grep found neither); or show
`navigator.clipboard.writeText` cannot reject in every context this demo runs in.

### M-4 · The colocation inversion — the file's *Controls* surface disproves its *Keyframes* and *Timeline* surfaces

**Severity** MAJOR · **Provenance** `RibbonBar.vue:5-9` vs `:11-104`; `ChannelOptions.vue:377-400`

RibbonBar hosts three surfaces by two irreconcilable mechanisms.

**Controls (`:5-9`)** — nine lines. RibbonBar publishes an empty div and knows *nothing*:

```html
<!-- Controls tab: filled via Teleport from ChannelOptions -->
<div id="controls-ribbon-target" v-show="storedControls.selectedControl === 'controls'"></div>
```

The feature that owns the buttons renders them (`ChannelOptions.vue:377` `<Teleport v-if="active"
to="#controls-ribbon-target" defer>` → `<PlaybackRibbon>` with 8 typed props/handlers). Zero `any`.
Zero method-name knowledge. Zero coupling. See S-1/S-3.

**Keyframes + Timeline (`:11-104`)** — ninety-four lines that reach *across* the tree into two
components RibbonBar does not import, cannot see, and cannot typecheck, invoking them by string
through `any` (M-2), with a silent-failure posture (M-1, M-3).

Both feature clusters already own their own Teleport plumbing — `KeyframeTimeline` is *itself*
teleported (`ChannelControls.vue:188` `<Teleport to="#timeline-expanded-target" defer>`). Hoisting the
two ribbons into `instrument/keyframes/` and `instrument/timeline/` would delete M-1, M-2, M-3 and
~90 lines at once, and leave RibbonBar as what its name says: a bar. The migration target is not
hypothetical — it is nine lines up in the same file.

**Falsifier** — show a constraint that forbids `KeyframesStringControls` / `KeyframeTimeline` from
teleporting their own ribbon: a mount-order dependency the `defer` flag cannot satisfy, a lifecycle
the force-mount/`content-visibility` cache (`ChannelControls.vue:118-136`) would break, or a scene
that needs the keyframes ribbon without the keyframes pane. I found none; `defer` (Vue 3.5, and vue
is `^3.5.35`) exists precisely to remove the ordering constraint.

---

## 3. MINOR

### m-1 · `.btn-interactive` — a dead class on every ribbon button

**Severity** MINOR · **Provenance** `RibbonBar.vue:135`

```ts
const RIBBON_BUTTON_CLASS = "h-8 gap-1.5 text-body rounded-full btn-interactive";
```

`.btn-interactive` has **no definition in the resolved tree**. Searched: all 12 demo CSS files
(`design-idioms`, `tab-idiom`, `playback-idiom`, `style`, `brand`, `layout`, + 6 component CSS), and all
of `node_modules/@mkbabb/glass-ui/` (7.0.0) — zero hits. It is not a Tailwind-generable utility. The
other three classes resolve: `h-8`/`rounded-full` are core Tailwind, `text-body` is glass-ui
(`dist/styles/typography/semantic.css`).

Consumed at 8 demo sites (`CubeScene.vue:188,193`, `SequenceTarget.vue:31`,
`SpringPhysicsFacet.vue:74,105`, `SpringScene.vue:167`, `PlaybackRibbon.vue:55`, and here).

The tree records the cause: `keyframes.js/docs/precepts/instructions/LESSONS-LEARNED.md:603` — glass-ui
`b0debec` "retired `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` under a false zero-site
verdict". `.rainbow-vivid` was restored (it is live at
`glass-ui/dist/styles/utilities/btn.css`, and RibbonBar:50 depends on it). `.btn-interactive` was not.

Blast radius is *small*, and that is the honest part: glass-ui's `Button` supplies its own interaction
skin unconditionally — `dist/button-B7c944jy.js` composes `"button tap-squish focus-ring"` +
`glass-capsule-hover` + a `useLiquidPress` press directive. So the keyboard-focus contract
(`design-idioms.css:73-76`, `.focus-ring:focus-visible`) is intact and this is **not** an a11y
regression.

**Falsifier** — produce the rule (any layer, any file, including a Tailwind `@utility` I missed) or show
the demo's Tailwind config generating it. **UNPROVEN-NEEDS-LIVE**: whether any *visual* affordance was
lost when glass-ui retired it — that needs the SS-13 pass, not this one.

### m-2 · The `ribbon-content` slot's four consumers all pass a prop glass-ui 7.0.0 deleted

**Severity** MINOR · **Provenance** `RibbonBar.vue:111-114`; `CubeScene.vue:187,192`;
`SpringScene.vue:143,166`; `glass-ui/dist/components/button/Button.vue.d.ts:8-19`

`ButtonProps` in 7.0.0: `emphasis | tone | size | iconOnly | loading | type | disabled | class` +
`PrimitiveProps` (`as`, `asChild`). There is **no `variant`** — confirmed in both the `.d.ts` and the
compiled props table in `dist/button-B7c944jy.js`.

Every consumer of RibbonBar's `ribbon-content` slot passes it anyway:

```
CubeScene.vue:187    h(Button, { size: "sm", variant: "outline", … })
CubeScene.vue:192    h(Button, { size: "sm", variant: "outline", … })
SpringScene.vue:143  h(Button, { variant: "outline", … })
SpringScene.vue:166  h(Button, { variant: "outline", … })
```

4 sites, 4/4 of the slot's render-function consumers, 0 elsewhere in `demo/`. Each falls through as a
literal `variant="outline"` DOM attribute; the button paints glass-ui's default `emphasis: "secondary"`.
RibbonBar's own eight buttons use the current API (`emphasis="secondary"`, `:18` et al.) — so the
component and its slot consumers are on opposite sides of a glass-ui major.

Type-blind twice over: B-1 excludes the SFC, and `h()`'s signature admits excess props even in a `.ts`
file — measured, `npx tsc --noEmit` exits 0 with all four in place.

**Falsifier** — find `variant` on `ButtonProps` (or a `Primitive` passthrough that consumes it), in
7.0.0 or in whatever version actually resolves at build time.

### m-3 · Dispatch on an untyped `string`, and on the raw pick rather than the projected authority

**Severity** MINOR · **Provenance** `RibbonBar.vue:8,13,69,108,113`; `controlOptionsStore.ts:12`;
`controlSurfaces.ts:41-47`; `useSelectedControlSurface.ts:83-104`

Two smaller defects that share a root.

**(a) The alphabet is thrown away.** `controlSurfaces.ts:41-47` declares the real union:

```ts
export type ControlSurface = "controls" | "keyframes" | "timeline" | "easing" | "spring" | "matrix-controls";
```

`controlOptionsStore.ts:12` stores it as `selectedControl: string`. RibbonBar — which *imports that very
type* at `:133` — compares the bare string against three literals at `:8`, `:13`, `:69`, `:108` and
forwards it to the slot as an untyped string at `:113`. Extend `ControlSurface` and nothing points at
this file. A typo in any of the four literals is a permanently dead branch. (Cost is currently zero
because of B-1 — but this is the annotation that would make B-1's fix *bite*.)

**(b) A different authority than its sibling.** RibbonBar gates on `storedControls.selectedControl` —
the **raw stored pick**. Its sibling panel host gates on `selectedControlSurface`, the DFA **projection**
(`useSelectedControlSurface.ts:83-88`), *and* on `hasSurface(...)` (`ChannelControls.vue:98,130,150`).
RibbonBar checks neither: it will paint the Keyframes ribbon for a `selectedControl` of `"keyframes"`
whether or not the scene has that surface.

I could **not** prove a reachable divergence and say so plainly: every write path is projected
(`selectControl` → `projectPick`, `ChannelControls.vue:400-403`; `switchTab` → `selectControl`,
`AnimationControlsGroup.vue:315-320`), and the reconciliation watch is `immediate: true`
(`useSelectedControlSurface.ts:91-104`). The residual window is the *documented* suspend-on-leave gate
(`isActiveSceneHost`, `:76-81`), where the store is deliberately left unreconciled during
NAVIGATE → SCENE_READY.

The structure is not novel: `keyframes.js/docs/tranches/I/audit/investigate/probes/rc-easing-editor-gate.mjs:13`
records exactly this shape as hypothesis **H2** — "the RibbonBar (gated only by
`v-if="selectedAnimation"`, outside the v-for/v-show) **survives**" a gate its sibling failed.

**Falsifier** — (a) dies if `selectedControl` is retyped to `ControlSurface`, or if a proof gate greps
these literals. (b) dies if RibbonBar is shown to read the projection, or if the suspend-on-leave window
provably cannot hold a surface the scene lacks. **UNPROVEN-NEEDS-LIVE** for (b)'s observability.

### m-4 · The module is split across two directories, against a ruling already on the books

**Severity** MINOR · **Provenance** `RibbonBar.vue` path; `ControlsPaneWrapper.vue:172-173`

```
transport/controls-pane/        ControlsPaneWrapper.vue · ControlsPaneWrapper.css · RibbonBar.vue
transport/ControlsPaneWrapper/  useControlsLayout.ts · usePaneHover.ts · usePaneRegister.ts
```

One component, two homes, and the directory *named after the component* does not contain it.
`ControlsPaneWrapper.vue:172-173` hops out and back:

```ts
import { usePaneRegister }   from "../ControlsPaneWrapper/usePaneRegister";
import { useControlsLayout } from "../ControlsPaneWrapper/useControlsLayout";
```

Every sibling cluster in `transport/` uses the `X.vue` + `X/` convention correctly
(`AnimationControlsGroup`, `TransportDock`, `KfPillTabs`). This one does not, and RibbonBar is the third
orphan. The correct target is recorded and unexecuted:
`value.js/docs/tranches/U/loop/pass1-research-demo-module-census.md:54` — "`components/RibbonBar.vue` | 151 |
into `ControlsPaneWrapper/` module (U.B2)"; `U/waves/U.B.md:251-254` states the rule ("names encode
nothing — RibbonBar renders INSIDE ControlsPaneWrapper yet sits in …").

Size itself is fine — 151 lines is squarely Goldilocks, and it would be ~60 after M-4.

**Falsifier** — show a build/alias constraint requiring the split, or a superseding ruling that
`controls-pane/` is the intended home.

### m-5 · Renders chrome with no content — the precept the parent enforces, one level up

**Severity** MINOR · **Provenance** `RibbonBar.vue:2-4,107-115`; `AnimationControlsGroup.vue:12-17`

The `Card cartoon tier="quiet"` + `CardContent class="p-3"` wrapper (`:3-4`) is **unconditional**. Every
inner branch can be empty:

- `selectedControl === 'controls'` before ChannelOptions' deferred Teleport lands (`:6-9` is an empty div);
- an extra surface whose scene returns `null` from `ribbonContent` — which all three do:
  `CubeScene.vue:183-184` (`!== "matrix-controls" ? … : null`), `EasingScene.vue:94-95`,
  `SpringScene.vue:135-136` (`if (… !== "spring") return null;`) — leaving `:107-115`'s flex div empty
  inside a padded glass Card.

The parent states the opposing precept explicitly at `AnimationControlsGroup.vue:12-17`:
*"SQ-T3 — no chrome without content: the pane wrapper mounts IFF the scene's control-surface DFA set is
non-empty … proof:panel-naked-rail asserts this."* RibbonBar re-introduces the same shape one level down,
where no proof gate watches. A `v-if` on "any branch has content" restores it.

**Falsifier** — show the empty Card collapses to zero visible box (it will not: `p-3` + a Card surface),
or that no reachable state yields an empty branch — contradicted by the three `null` returns above.
**UNPROVEN-NEEDS-LIVE** for the visible magnitude.

### m-6 · The `v-show` that makes S-1 correct also keeps a per-frame-updating subtree alive behind `display:none`

**Severity** MINOR · **Provenance** `RibbonBar.vue:8`; `ChannelOptions.vue:377-380`;
`composables/useAnimationSync.ts:33,49-53`

`:8` is `v-show`, so the target div — and therefore the teleported `<PlaybackRibbon>` — stays mounted
while the Keyframes or Timeline tab is selected. ChannelOptions' Teleport is gated on `v-if="active"`
(= *selected animation*, `ChannelOptions.vue:377`), **not** on the selected control surface, and it feeds
`:current-t="currentT"` (`:380`), a ref written from the animation sync loop
(`useAnimationSync.ts:49-53`). So while the user edits keyframes, a hidden scrubber keeps re-rendering
each frame the animation advances.

This is a genuine trade-off, not a mistake: `v-if` here would be *worse* (S-1). The cheap cure is
`content-visibility: hidden` on the hidden target — the exact idiom this repo already uses for the
inactive Monaco pane (`ChannelControls.vue:118-124`).

**Falsifier** — show `currentT` only updates on scrub (it does not; `useAnimationSync` drives it from the
loop), or that Vue skips patches on a `display:none` subtree (it does not), or that ChannelOptions gates
the Teleport on the control surface. **UNPROVEN-NEEDS-LIVE** for the cost magnitude.

---

## 4. INFO

### i-1 · The phantom-dep exposure, as it lands on line 132 (folds **lane-frontend F-1**)

**Severity** INFO (the RED is F-1's, not re-scored here) · **Provenance** `RibbonBar.vue:132`;
`package.json`; `package-lock.json:611`

`import { Button, Card, CardContent } from "@mkbabb/glass-ui";` — re-verified independently, and the
tree **agrees** with F-1: `grep -n "node_modules/@mkbabb" package-lock.json` returns exactly one line
(`611: node_modules/@mkbabb/value.js`), `@mkbabb/glass-ui` appears in neither `dependencies` nor
`devDependencies`, and 7.0.0 sits installed. `npm ci` on a clean runner cannot resolve line 132.
Nothing to add to F-1; recorded here only so this component's row is complete.

Two adjacent things I checked and can **clear**, so the phantom-dep finding is not over-read:

- **Barrel vs. subpath is not a bundle defect here.** `./button` and `./card` subpaths exist (73 exports),
  but glass-ui declares `sideEffects: ["*.css"]` and its JS carries **zero** CSS imports
  (`grep -o '"[^"]*\.css"' dist/glass-ui.js` → 0). CSS ships once via `style.css:3`. The barrel
  tree-shakes; `:132` costs nothing in the bundle. (Cold dev-server module graph is marginally larger —
  not worth a finding.)
- **Every glass-ui prop this file passes is valid in 7.0.0.** `cartoon` (`Card.vue.d.ts:11`),
  `tier="quiet"` (`SurfaceProps.tier: SurfaceTier`, `axes.d.ts` — `"quiet"` is rung 2 of 5),
  `emphasis="secondary"` and `size="sm"` (`Button.vue.d.ts:3-4,10-12`). Contrast m-2.

### i-2 · 94 lines of near-identical markup; the one hoisted token is not the shared one

**Severity** INFO · **Provenance** `RibbonBar.vue:16-103,135`; `SpringScene.vue:167`;
`CubeScene.vue:188,193`; `PlaybackRibbon.vue:55`

Eight `<Button>` blocks differ only in (icon, label, handler) — three of them are byte-identical but for
those. A `v-for` over an 8-row descriptor would take `:11-104` to ~25 lines. I am **not** filing this as a
defect: the markup is static, explicit, greppable, and `feedback_kiss_no_contrivance` cuts against a
descriptor indirection for 8 rows. If M-4 lands, most of it leaves anyway.

The real duplication is one level out. `RIBBON_BUTTON_CLASS` (`:135`) is correctly hoisted *within* this
file, but four sibling ribbon surfaces hand-roll their own divergent strings —
`"h-8 w-full rounded-full gap-2 text-body btn-interactive"` (`SpringScene.vue:167`),
`"h-8 gap-1.5 cursor-pointer text-small font-medium px-3 rounded-lg btn-interactive"`
(`CubeScene.vue:188,193`), `"btn-playback h-10 w-full rounded-full gap-2 btn-interactive"`
(`PlaybackRibbon.vue:55`) — note `text-body` vs `text-small`, `rounded-full` vs `rounded-lg`. Already on
the books: `value.js/docs/tranches/H/audit/feedback/g-r3-reconcile.md:58` ("a BESPOKE skin"),
`g-_PLAN.md:228,399`.

**Falsifier** — a design ruling that ribbon buttons are intentionally per-scene, not a shared token.

---

## 5. Superlatives (L-18, running the other way)

### S-1 · `v-show`, not `v-if`, on the Teleport target — the one-character decision that holds the seam

**Provenance** `RibbonBar.vue:6-9`; `ChannelOptions.vue:377`

```html
<div id="controls-ribbon-target" v-show="storedControls.selectedControl === 'controls'"></div>
```

`v-if` here would be a live defect: leaving the Controls tab would destroy the target while
ChannelOptions' `<Teleport v-if="active" to="#controls-ribbon-target" defer>` is still mounted, producing
a "Failed to locate Teleport target" warning and dropping `<PlaybackRibbon>` — losing its scrub state on
every tab round-trip. `v-show` keeps the anchor stable and lets the source and target be gated
independently. Paired with `defer` (Vue 3.5) on the source, the two need no mount-ordering contract at all.
This is correct on the first read and non-obvious; the cost is m-6, and m-6 is the cheaper problem.

### S-2 · The scoped rule at `:144-151` — an `!important` escape retired *and* explained in place

**Provenance** `RibbonBar.vue:144-151`

```css
/* … was a `!border-transparent` Tailwind escape at the callsite (D.W2.S3);
   a scoped rule fights the cascade honestly. */
.ribbon-apply--active { border-color: transparent; }
```

Two lines of CSS replacing a `!important` utility, with the *reason* and the *wave* recorded at the
change. And it is mechanically sound, which I verified rather than assumed: glass-ui's `Button` renders a
**single root** (`dist/button-B7c944jy.js` → one `<Primitive as="button">`, not a fragment), so Vue's
scope id lands on it and `.ribbon-apply--active[data-v-…]` (specificity 0,2,0) beats glass-ui's
class-level border (0,1,0) without `!important`. The idiom holds because of a property of the child
component — and it happens to be true.

### S-3 · The Controls surface is the pattern the rest of the file should be

**Provenance** `RibbonBar.vue:5-9` vs `:11-104`; `ChannelOptions.vue:377-400`

Worth naming separately from M-4, because it is a *positive* asset and it is already shipping. Nine
lines give the Controls surface: correct inversion of control, no `any`, no cross-tree method-name
knowledge, no async-mount race (M-1 cannot touch it — `<PlaybackRibbon>` is a static import in the
component that owns it), no error-posture question (its 8 handlers are the owner's own typed emits),
and it survives the exact gate divergence recorded as H2 in `rc-easing-editor-gate.mjs:13`.

Ninety-four lines below it do the opposite and pay for it four times over. The remediation for
M-1/M-2/M-3/M-4 does not need to be designed — it needs to be **copied from line 6**.

---

## 6. Engine-consumption idioms

**Direct consumption: none, correctly.** RibbonBar imports nothing from `@mkbabb/keyframes.js`. It is a
presentational relay, and it should be — no misuse to flag.

**Its one engine-facing claim is true**, which I checked because a stale comment here would be worse than
none. `:32-35` says Export CSS compiles "the orchestration graph … via the gated `compileToCSS` … + the
honest CC-3 ineligibility report." `KeyframesStringControls.vue:133-168` does exactly that:
`compileToCSS([animation])` from the warmed `kfEngine()` (`:44-45`), then branches on
`eligible` / partial / total refusal and surfaces `refusal.reason` + `refusal.message` **verbatim**
(`:146-158`). The dogfood is real and the comment is honest.

**The exemplary engine idiom is one hop away and worth recording** for the cluster: `useKeyframeBrushApply.ts:18-27`
builds the brush feedback as a `CSSKeyframesAnimation(...).fromString('@keyframes … ')` — the demo's own
library parsing its own CSS to animate its own icon. That is the dogfood the ribbon's Apply button
displays (`RibbonBar.vue:53`), even though RibbonBar itself never touches the engine.

---

## 7. Checked and cleared (no defect — recorded so the negatives are auditable)

A false defect is worse than a missed one. Each of these was a live hypothesis, and each died:

| # | Hypothesis | Killed by |
|---|---|---|
| 1 | One or more of the 9 remote-controlled members does not exist → dead button | All 9 present: `KeyframesStringControls.vue:171-182`, `KeyframeTimeline.vue:296-307` |
| 2 | `FilePlus2` is not a `@lucide/vue` export | It is (aliased) — `lucide-vue.d.ts`, `FilePlus2` + `FilePlus2Icon` |
| 3 | `url(#rainbow-gradient)` (`:59`) resolves to nothing | Defined at `DemoGlobalChrome.vue:16`, mounted document-level from `AnimationControlsGroup.vue:118` |
| 4 | `rainbow-vivid` (`:50`) is dead like `btn-interactive` | Live — `glass-ui/dist/styles/utilities/btn.css` `@utility rainbow-vivid` |
| 5 | `cartoon` / `tier="quiet"` / `emphasis` / `size` are stale glass-ui props | All valid in 7.0.0 (see i-1) |
| 6 | The scoped rule cannot reach a child component root | Button has a single root (see S-2) |
| 7 | Duplicate `#controls-ribbon-target` (global id) when two ribbons coexist | Unreachable: one `AnimationControlsGroup` (`EditorShell.vue:76`, `:key="superKey"`, no wrapping Transition), one `ControlsPaneWrapper`, and its mobile/desktop branches are mutually exclusive (`ControlsPaneWrapper.vue:117-157`) |
| 8 | `animControlRefs` grows monotonically (function ref ignores `null` on unmount, `ControlsPaneWrapper.vue:51`) | Bounded by the `:key="superKey"` remount at `EditorShell.vue:76` — cannot cross scenes. Within a scene it retains a stale entry only if a channel set mutates post-mount; I found no such scene. **Not filed.** |
| 9 | Timeline Undo/Redo are exposed but unreachable without a keyboard | They are in-pane with honest availability — `KeyframeTimeline.vue:19,35`, `:disabled="!canUndo/!canRedo"` |
| 10 | The ribbon duplicates the timeline pane's own buttons | It does not — pane owns undo/redo/clear/expand, ribbon owns snapshot/import/export/add-CSS. Clean split. |
| 11 | Leak / missing teardown in RibbonBar | Nothing to leak: no listener, timer, observer, watcher, or lifecycle hook in the entire `<script setup>` (`:121-142`, 6 statements). Correct by construction. |
| 12 | Barrel import drags glass-ui CSS into the bundle | It does not (see i-1) |

---

## 8. Ledger

| id | sev | one line | file:line |
|---|---|---|---|
| B-1 | BLOCKER | No typechecker reads this file (or any SFC): `*.vue` shimmed to `any`, no `vue-tsc`, 0 `.vue` in the tsc program, CI runs `check:lib` only | `env.d.ts:3-7`; `package.json:41`; `ci.yml:41-42` |
| M-1 | MAJOR | 8 buttons enabled and inert across the async-component / 4 MB `vendor-monaco` window; `?.` swallows it; `disabled`/`loading` exist and are unused | `RibbonBar.vue:20,28,40,53,76,84,92,100` |
| M-2 | MAJOR | Remote control by string through 3 hops of `any`; the "typed" hop is an async wrapper that never carried the surface; the name means `Ref` in one consumer and instance in this one | `RibbonBar.vue:139-140` |
| M-3 | MAJOR | `copyCSS` floats an uncaught promise (`copyText` has no catch); `formatCSS` returns silently; 6 of 8 siblings report honestly | `RibbonBar.vue:20,28` |
| M-4 | MAJOR | Colocation inversion — 94 lines of cross-tree reach-in, disproved by the 9-line Teleport seam directly above them | `RibbonBar.vue:11-104` vs `:5-9` |
| m-1 | MINOR | `.btn-interactive` has no definition anywhere in the resolved tree (8 demo sites) | `RibbonBar.vue:135` |
| m-2 | MINOR | All 4 `ribbon-content` slot consumers pass `variant`, deleted from glass-ui 7.0.0's `ButtonProps` | `CubeScene.vue:187,192`; `SpringScene.vue:143,166` |
| m-3 | MINOR | Dispatches on untyped `string`, not `ControlSurface`; gates on the raw pick, not the DFA projection its sibling uses | `RibbonBar.vue:8,13,69,108` |
| m-4 | MINOR | Module split across `controls-pane/` and `ControlsPaneWrapper/`; U.B2 ruling unexecuted | `RibbonBar.vue` path |
| m-5 | MINOR | Unconditional Card + `p-3` around branches that can all be empty — violates the parent's own SQ-T3 precept | `RibbonBar.vue:2-4,107-115` |
| m-6 | MINOR | `v-show` keeps a per-frame-updating `<PlaybackRibbon>` alive behind `display:none`; `content-visibility` is the in-repo cure | `RibbonBar.vue:8` |
| i-1 | INFO | glass-ui phantom dep lands on the import line (folds **F-1**); barrel + all 4 props cleared | `RibbonBar.vue:132` |
| i-2 | INFO | 94 lines of near-identical markup (not filed); `RIBBON_BUTTON_CLASS` diverges from 4 sibling hand-rolls (on the books) | `RibbonBar.vue:135` |
| **S-1** | ★ | `v-show` not `v-if` on the Teleport target — correct, non-obvious, load-bearing | `RibbonBar.vue:6-9` |
| **S-2** | ★ | Scoped rule retiring an `!important` escape, explained in place, mechanically sound against a single-root child | `RibbonBar.vue:144-151` |
| **S-3** | ★ | The Controls surface: inversion of control, zero `any`, zero coupling — the migration target for M-1..M-4, already in the file | `RibbonBar.vue:5-9` |

**Totals** — defects **13** (BLOCKER 1 · MAJOR 4 · MINOR 6 · INFO 2) · superlatives **3**.

**Remediation order** (each unblocks the next): **B-1** (install `vue-tsc`, wire `check`, gate CI — until
this lands, M-2/m-2/m-3 are unenforceable) → **M-4** (hoist the two ribbons behind Teleports; M-1, M-2,
M-3 fall out with ~90 lines) → **m-1**, **m-2** (two dead strings) → **m-4**, **m-5**, **m-6** (cosmetic
/ structural). **F-1** is prior to all of it: `npm ci` cannot currently resolve line 132.
