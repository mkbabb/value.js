claude-opus-5[1m]

# CHALLENGE · `RibbonBar.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/controls-pane/RibbonBar.vue` (151 lines)
**Axis:** how this component consumes **keyframes.js** (the library) and **glass-ui** (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, sibling integration seams.
**Mode:** static, read-only. No installs, no builds, no browser. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE`.
**Evidence trees:** `keyframes.js` @ working tree (READ-ONLY), `keyframes.js/node_modules/@mkbabb/glass-ui` **7.0.0** (the installed copy — every glass-ui claim is sourced from what the demo already has on disk).

**Tally: 13 defects · 0 BLOCKER · 7 MAJOR · 6 MINOR · 5 superlatives.**

---

## 0. What the component actually is

RibbonBar imports **nothing** from `@mkbabb/keyframes.js`. Its whole relationship to the library is a pair of `any`-typed opaque refs (`:139-140`) whose members it invokes through optional-call chains. It is a **remote control** for two library-bearing sibling components it does not import, does not type against, and cannot see.

The full read-graph (every file read whole):

| file | role |
|---|---|
| `controls-pane/RibbonBar.vue` | the target |
| `controls-pane/ControlsPaneWrapper.vue` | parent — passes the two `any` refs (`:94-95`, `:195-196`) |
| `transport/AnimationControlsGroup.vue` | grandparent — *derives* the two refs (`:193-201`) |
| `channel-controls/ChannelControls.vue` | sibling — owns the panes + `defineExpose` (`:410-413`) |
| `keyframes/KeyframesStringControls.vue` | the keyframes action target (`defineExpose :171-182`) |
| `timeline/KeyframeTimeline.vue` | the timeline action target (`defineExpose :296-307`) |
| `keyframes/composables/useKeyframeBrushApply.ts`, `useApplyCSS.ts` | Apply-CSS mechanics |
| `channel-controls/composables/useKeyframesPaneReveal.ts`, `useSelectedControlSurface.ts` | the surface gates |
| `state/controlOptionsStore.ts`, `state/controlSurfaces.ts` | the `storedControls` prop's type + the surface alphabet |
| `transport/components/DemoGlobalChrome.vue` | the `#rainbow-gradient` paint server |
| `utils/clipboard.ts`, `timeline/composables/useTimelineBuild.ts`, `useTimelineOps.ts` | the action tails |
| `demo/styles/design-idioms.css`, `demo/styles/style.css` | the demo cascade |
| glass-ui 7.0.0 `dist/components/button/Button.vue.d.ts`, `card/Card.vue.d.ts`, `surface/Surface.vue.d.ts`, `_shared/axes.d.ts`, `components/button/styles.css`, `styles/utilities/btn.css`, `styles/index.css`, `button-B7c944jy.js` | the consumed surface |

---

## 1. Findings

### C-1 · MAJOR — the triple-`any` remote-control seam: 9 library-bearing members reached with zero type relationship

**Provenance.** `RibbonBar.vue:139-140` declares
```
activeKeyframesRef: any;
activeTimelineRef: any;
```
and then invokes **nine** members off them: `copyCSS` (`:20`), `formatCSS` (`:28`), `exportCompiledCSS` (`:40`), `cssApplied` (`:49`, `:58`), `applyCSSStyles` (`:53`), `snapshot` (`:76`), `openImportDialog` (`:84`), `exportCSS` (`:92`), `openAddCSSDialog` (`:100`).

The `any` runs **three hops**, all provable:
- `ControlsPaneWrapper.vue:195-196` — `activeKeyframesRef: any; activeTimelineRef: any;`
- `AnimationControlsGroup.vue:193-201` — `computed(() => animControlRefs[name]?.keyframesControlsRef)` where `animControlRefs = reactive<Record<string, any>>({})` (`:191`)
- `ChannelControls.vue:410-413` — `defineExpose({ keyframesControlsRef, timelineRef, selectControl })`

The *real* contracts exist and are typed at the source (`ChannelControls.vue:372-373` uses `useTemplateRef<InstanceType<typeof KeyframesStringControls>>`), and are then **thrown away** at the first hop. Nothing in `vue-tsc` connects RibbonBar's nine string member names to `KeyframesStringControls.vue:171-182` (6 exposed members) or `KeyframeTimeline.vue:296-307` (10 exposed members).

**Falsifier.** Show a type declaration anywhere on the three-hop path that constrains `activeKeyframesRef` to the exposed shape, or show `npm run check` (`tsc --noEmit`) failing when `copyCSS` is renamed in `KeyframesStringControls.vue`.

**Failure scenario (concrete).** Rename `KeyframesStringControls.defineExpose`'s `exportCompiledCSS` → `exportCSS` (harmonising it with the timeline's identically-purposed member name). `tsc --noEmit` passes clean; `vue-tsc` passes clean; every gate passes. At runtime `activeKeyframesRef?.exportCompiledCSS?.()` evaluates the second `?.` against `undefined`, short-circuits, and the **Export CSS button becomes a permanently silent no-op** — no console error, no toast, no failed test. The `?.()` idiom is not defensive here; it is the mechanism that converts a contract breach into invisibility.

**Note on the alternative.** RibbonBar declares **no `defineEmits` at all**. The idiomatic Vue contract for chrome that triggers work owned elsewhere is an emit (or a typed `actions` prop object) — `ControlsPaneWrapper.vue:305-316` and `ChannelControls.vue` both demonstrate the fully-typed `defineEmits<{...}>()` idiom **six lines of tree away**. RibbonBar is the only member of this cluster that reaches sideways instead of upward.

---

### C-2 · MAJOR — `btn-interactive` is applied to 8/8 ribbon buttons and has **no definition** in glass-ui 7.0.0 or in the demo

**Provenance.** `RibbonBar.vue:135`
```
const RIBBON_BUTTON_CLASS = "h-8 gap-1.5 text-body rounded-full btn-interactive";
```
bound at `:19, :27, :39, :48, :75, :83, :91, :99` — all eight buttons.

Probes:
```
$ grep -rn "btn-interactive" node_modules/@mkbabb/glass-ui/            → 0
$ grep -rn "btn-interactive" --exclude-dir=node_modules --exclude-dir=dist .   → 41
```
All 41 in-tree hits are **call-sites or docs prose** — zero are a definition. The eight demo call-sites are `RibbonBar.vue:135`, `CubeScene.vue:188,193`, `SpringScene.vue:167`, `SequenceTarget.vue:31`, `SpringPhysicsFacet.vue:74,105`, `PlaybackRibbon.vue:55`. Glass-ui's sibling utilities from the same family **are** present and reachable — `node_modules/@mkbabb/glass-ui/dist/styles/utilities/btn.css` publishes `@utility scale-on-hover`, `@utility transition-control`, `@utility rainbow-vivid`, `@utility rainbow-pastel` — but no `btn-interactive`.

The repo's own corpus names this exact regression class. `keyframes.js/docs/precepts/instructions/LESSONS-LEARNED.md:603`:

> substrate `b0debec` (D.W2.D "delete zero-site orphans" — retired `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` under a false zero-site verdict; keyframes.js consumed `.rainbow-*`)

**Two of the three came back in 7.0.0. `btn-interactive` did not.** Two other in-repo audits still assert it is glass-ui-owned and correct: `docs/tranches/G/audit/a-styling.md:357` ("consume glass-ui idiomatically (correct usage, not gaps)") and `docs/tranches/H/audit/harden/impl-w12-styling-decomp.md:76` ("`btn-interactive` … all glass-ui-owned"). **The tree disagrees with both.**

**Falsifier.** Produce any emitted CSS rule or `@utility` declaration named `btn-interactive` that the demo's Tailwind build actually generates (Tailwind v4 does **not** synthesise unknown class names — there is no `btn-*` theme namespace), or a computed-style probe on a ribbon button showing the hover/press treatment the name promises. Either kills this.

**Failure scenario.** The eight ribbon buttons render with glass-ui `Button`'s own base interactivity only; whatever cross-component press/hover/focus idiom `btn-interactive` was the single source of is absent — silently, uniformly, and identically at seven other call-sites. Nothing fails; the affordance is just gone.

---

### C-3 · MAJOR — `RIBBON_BUTTON_CLASS` defeats two glass-ui scaling axes; of its five tokens, **none is both live and correct**

Glass-ui 7.0.0 `dist/components/button/styles.css` (all in `@layer components`, so every Tailwind utility in `@layer utilities` **outranks** it):
```
.button { min-block-size: var(--button-size); gap: calc(0.375rem * var(--ui-scale));
          border: 0; border-radius: var(--radius-pill); font-size: var(--control-text); }
.button[data-size="sm"] { --button-size: var(--control-h-sm); padding-inline: calc(0.75rem * var(--ui-scale)); }
```
Token values (`dist/styles/**`):
```
--control-h-sm : max(calc(2.25rem * var(--ui-scale)), var(--control-floor))
--control-text : calc(var(--type-small) * var(--ui-scale))
--type-small   : clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)
--text-body    : var(--type-body)
--type-body    : clamp(1rem, 0.92rem + 0.27vw, 1.375rem)
--ui-scale     : 1  |  var(--ui-coarse-scale, 1.5)      ← the coarse-pointer branch
--control-floor: 0px |  var(--touch-target, 2.75rem)    ← the coarse-pointer branch
```

Token-by-token audit of `RibbonBar.vue:135`:

| token | verdict | proof |
|---|---|---|
| `h-8` (32px `height`) | **DEAD** | loses to `min-block-size: var(--control-h-sm)` = 36px (fine) / 54px (coarse). The declared height never applies. |
| `gap-1.5` (0.375rem flat) | **DEFEATS an axis** | utilities beat `@layer components`; pins the gap at the ×1 value, so the coarse-pointer 1.5× (0.5625rem) never lands. |
| `text-body` (`--type-body`) | **DEFEATS an axis** | overrides `font-size: var(--control-text)`. Fine pointer: 16px vs glass's 14px (2px too big). **Coarse pointer: 16px vs glass's 21px — the ribbon labels are 5px smaller than every other glass control and do not respond to the coarse-pointer scale at all.** |
| `rounded-full` | **REDUNDANT** | `.button` already sets `border-radius: var(--radius-pill)`. |
| `btn-interactive` | **UNDEFINED** | see C-2. |

**Falsifier.** Show `--ui-scale` never leaves 1 in the demo's shipped cascade (then the coarse half of C-3 dies and the finding drops to MINOR), or show a later utility-layer rule that restores `--ui-scale`-aware sizing to these buttons. `UNPROVEN-NEEDS-LIVE` for the rendered pixel deltas; the cascade ranking and token arithmetic are static-provable as written.

**Failure scenario.** On the mobile path — which is the *primary* path for this component, since `ControlsPaneWrapper.vue:117-137` portals the whole pane into the glass-ui `<Drawer>` below 1024px — every glass control in the drawer scales its type 1.5× for coarse pointers while the ribbon's eight button labels stay pinned at 16px. This is the per-instance override the project's own standing law forbids (`feedback_root_styling`: "style changes at the root component level, not per-instance overrides").

---

### C-4 · MAJOR — the ribbon advertises capability before the async, library-bearing panes exist; `?.()` renders the whole toolbar inert with zero feedback

**Provenance.** Both action targets are lazily loaded:
```
ChannelControls.vue:252  const KeyframesStringControls = defineAsyncComponent(() => import("../../keyframes/KeyframesStringControls.vue"));
ChannelControls.vue:253  const KeyframeTimeline      = defineAsyncComponent(() => import("../../timeline/KeyframeTimeline.vue"));
```
`KeyframesStringControls` pulls Monaco. `vite.config.ts` (gh-pages branch) groups it as `vendor-monaco` and the inline comment sizes it: *"Monaco (3.7 MB)"*; `useKeyframesPaneReveal.ts:29-34` records the pre-cure cost as *"mobile LCP 10–16 s"*.

RibbonBar renders its four keyframes buttons on `storedControls.selectedControl === 'keyframes'` (`:13`) **and nothing else** — no `loading`, no `:disabled`, no reference to `keyframesWarmed`, no reference to the ref's nullity. Glass-ui `Button` publishes both levers and neither is used (`Button.vue.d.ts`: `loading?: boolean`, `disabled?: ButtonHTMLAttributes["disabled"]`).

`storedControls` is **persisted**: `controlOptionsStore.ts:48-57` wraps it in `useStorage("animation-groups-control-options-store", …)`.

**Falsifier.** Show the `vendor-monaco` chunk is statically imported by the app entry (it is explicitly excluded from `modulePreload` at `vite.config.ts`'s `lazyChunks` list, and `advancedChunks` isolates it), or show a `:disabled`/`loading` binding on any of the eight buttons. Either kills this.

**Failure scenario (concrete, always-reachable).** A returning user whose last pick was `keyframes` re-enters the scene. `getStoredAnimationGroupControlOptions` rehydrates `selectedControl: "keyframes"` from localStorage → `ControlsPaneWrapper.vue:91` mounts RibbonBar → four fully-styled, fully-enabled buttons paint at first render. `keyframesWarmed` flips true the same tick (`useKeyframesPaneReveal.ts:110-116`, `immediate: true`), which *begins* the ~3.7 MB dynamic import. For the entire download+parse+mount window (10–16 s on the mobile profile the composable itself cites), `activeKeyframesRef` is `null`, and every click on Copy / Format / Export CSS / Apply CSS resolves to `undefined?.()` — **no toast, no console line, no visual change**. The identical shape holds for the timeline four (`:76,:84,:92,:100`) against `KeyframeTimeline`'s own async chunk.

---

### C-5 · MAJOR — Apply CSS is a two-state toggle rendered as a plain button: no `aria-pressed`, state carried by colour alone

**Provenance.** `RibbonBar.vue:44-64`. The state is real and reactive — `cssApplied` traces to `useApplyCSS.ts:27` `const isApplied = ref(false)` and is flipped by `toggle()` (`:30-52`). The **only** encodings of that state in the DOM are:
- `:47-52` — the class swap to `'rainbow-vivid text-white ribbon-apply--active'`
- `:57-61` — the icon's `stroke: url(#rainbow-gradient)` present/absent

Probe for any programmatic state:
```
$ grep -n "aria-\|role=" RibbonBar.vue   → (no output)
```
Zero ARIA attributes in the file. The button's accessible name is the constant string "Apply CSS" in both states; an assistive-tech user gets **no signal whatsoever** that CSS is currently applied, and a low-vision or colour-deficient sighted user gets only a hue change.

This is not a missing primitive — glass-ui 7.0.0 ships `/toggle-group` (already consumed at `scenes/easing/EasingTarget.vue:139`) and `Button` accepts arbitrary `$attrs`, so `:aria-pressed="!!activeKeyframesRef?.cssApplied"` is a one-line fix.

**Falsifier.** Show glass-ui's `Button` injecting `aria-pressed` from some state it can infer (it cannot — `Button.vue.d.ts` has no pressed/toggle prop), or an `aria-live` region elsewhere announcing the apply state. WCAG mapping (1.4.1 use-of-colour, 4.1.2 name-role-value) is `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit; the *absence of any ARIA attribute* is static-provable.

**Failure scenario.** A screen-reader user activates "Apply CSS", the page's live animation halts (`useApplyCSS.ts:45` `animation.paused = animation.started`), and the control still announces as an unpressed button named "Apply CSS". Activating again silently reverses it. The toggle is unusable non-visually.

---

### C-6 · MAJOR — the ribbon dispatches on the **raw** stored pick; its sibling dispatches on the DFA projection. The ribbon has no `hasSurface` gate at all.

**Provenance.** RibbonBar branches four ways on `storedControls.selectedControl` (`:8, :13, :69, :108`) — the raw persisted field, straight off `StoredAnimationGroupControlOptions`.

`ChannelControls.vue` — the component that owns the panes those buttons drive — gates **every** panel on the derived surface set:
```
ChannelControls.vue:297  const hasSurface = (surface: ControlSurface): boolean =>
                             !tabsExternallyManaged || machine.controlSurfaces.value.includes(surface);
ChannelControls.vue:98   v-if="hasSurface('controls') && selectedControlSurface === 'controls'"
ChannelControls.vue:130  v-if="hasSurface('keyframes') && keyframesWarmed"
ChannelControls.vue:150  v-if="hasSurface('timeline') && selectedControlSurface === 'timeline'"
```
An entire composable exists to make the raw field untrustworthy — `useSelectedControlSurface.ts:29-56` — and it says so:

> The `<SegmentedTabs> :model-value` is a MACHINE-PROJECTED, synchronously-correct value … On a scene SWITCH this is born correct on the very tick the strip mounts (no stale latch …)

and its write-back is explicitly **gated off** during the transition window (`:70-80`, `isActiveSceneHost`):

> during the NAVIGATE → SCENE_READY window the controls still host the LEAVING scene's animations, so a host whose `animation.superKey` is not the active scene's must NOT write the destination scene's projection …

RibbonBar imports neither `useSceneMachine`, nor `hasSurface`, nor `ControlSurface`, nor `selectedControlSurface`. Its correctness is **inherited from a watcher in a sibling composable**, not structural.

**Falsifier.** Enumerate every `(scene × derived surface set × persisted pick)` triple and show `storedControls.selectedControl` is *never* a surface absent from `machine.controlSurfaces` at any render tick — including during `NAVIGATE → SCENE_READY` where `useSelectedControlSurface.ts:88-100`'s reconciling write is suppressed by `isActiveSceneHost`. I could not construct that proof statically, and I could not construct a reachable counter-example either; the structural claim (duplicated dispatch on a deliberately-non-authoritative source) stands on the file:line above. Reachability of a visible divergence: `UNPROVEN-NEEDS-LIVE`.

**Failure scenario.** In the suppressed-write window a scene whose derived set excludes `keyframes` still carries `selectedControl: "keyframes"` in its bucket. `ChannelControls.vue:130`'s `hasSurface('keyframes')` is false → the pane cannot mount → `activeKeyframesRef` is `null` **permanently**, not transiently. RibbonBar, gated on nothing, renders four live buttons for a pane that will never exist. This is C-4's silent no-op with no self-healing.

---

### C-7 · MAJOR — the engine-driven brush feedback plays on a `display:none` twin; the ribbon's visible Paintbrush is inert

**Provenance.** The Apply-CSS affordance the user sees is `RibbonBar.vue:55-62` — a `Paintbrush` with a static rainbow stroke and **no animation binding**.

The `CSSKeyframesAnimation` that exists to give that action feedback is bound to a *different, hidden* Paintbrush inside the sibling pane:
```
useKeyframeBrushApply.ts:15   /** Owns the editor surfaces' single apply-CSS identity and brush feedback. */
useKeyframeBrushApply.ts:18-27  const brushAnimation = new CSSKeyframesAnimation({ duration: 700, iterationCount: "infinite",
                                   direction: "alternate" }).fromString(`@keyframes keyframeBrushApply { … rotate(…) … }`);
useKeyframeBrushApply.ts:37-40  const applyCSSStyles = () => { toggle(); if (isApplied.value) void brushAnimation.play(); else brushAnimation.pause(); };
useKeyframeBrushApply.ts:42     onMounted(() => brushAnimation.setTargets(brush.value!));

KeyframesStringControls.vue:15-18   <Paintbrush ref="brushEl" class="hidden" />
```
`class="hidden"` is Tailwind `display: none`. A `transform: rotate()` animation on a `display:none` element produces **zero paint**.

**Falsifier.** Show a rule that un-hides `brushEl` under any state (grep `brushEl` in the tree: one declaration, one `useTemplateRef`, one `setTargets` — no conditional class), or show the ribbon's visible Paintbrush receiving `brushAnimation`'s target set. Either kills this.

**Failure scenario.** The user clicks Apply CSS. The named feedback — a 700 ms infinite alternate brush wobble, one of the demo's engine-dogfood animations — runs forever against an invisible node in a force-mounted pane (`ChannelControls.vue:120-127`: "the pane is ALWAYS rendered … never unmounted"), while the button the user actually pressed shows no motion. The library work happens; the affordance does not. Secondary consequence (attributed to the composable, not the ribbon): because the pane is force-mounted, `onUnmounted(() => brushAnimation.pause())` (`:43`) never fires on tab or scene switch, so the invisible animation keeps ticking for the session.

---

### C-8 · MINOR — `copyCSS` and `formatCSS` promise rejections reach nothing; the other two ribbon actions both catch. The asymmetry is inside one four-button row.

**Provenance.** All eight handlers are bare optional calls (`:20, :28, :40, :53, :76, :84, :92, :100`) — no `await`, no `.catch`, no wrapper. Four of the eight tails are guarded, two are not:

| ribbon button | tail | guarded? |
|---|---|---|
| Export CSS | `KeyframesStringControls.vue:133-168` | **yes** — `try/catch` + verbatim refusal toasts |
| Export (timeline) | `useTimelineBuild.ts:119-142` | **yes** — `try/catch` + `toast.error` |
| Snapshot | `useTimelineOps.ts:21-33` | yes — empty-target guard + toast |
| Copy | `KeyframesStringControls.vue:173-177` → `utils/clipboard.ts:3-8` | **NO** — `await navigator.clipboard.writeText(text)` with no catch, at either level |
| Format | `KeyframesStringControls.vue:83-88` → `CSSCodeEditor.vue:178-187` | **NO** — `await formatEditorCSS(...)` with no catch |

The only global rejection listener is deliberately narrow — `app/lifecycle/useMonacoCancellationGuard.ts:20-24` matches **only** `name/message === "Canceled"** and its own docstring says "every real error class … is left to surface untouched." Untouched means *console*, not *user*.

**Falsifier.** Show a `window.unhandledrejection` → toast bridge (there is exactly one listener in the demo, and it is the Monaco guard), or a try/catch in `copyText`/`formatEditor`.

**Failure scenario.** `formatCSS`: `formatEditorCSS` rejects (the lazy `vendor-prettier` chunk fails to fetch, or Monaco throws a non-`Canceled` error). The rejection escapes to the console. Because `startFormattingReset()` at `KeyframesStringControls.vue:87` sits **after** the un-caught `await`, it never runs, so `isFormatting` (`:71`) is stuck `true` for the component's lifetime — and since the pane is force-mounted, that is the session. Every subsequent successful edit then silently loses its "Keyframes parsed 🎉" confirmation (`:101` `if (!isFormatting.value) toast.success(...)`). One un-caught ribbon click permanently corrupts a sibling's feedback state.

---

### C-9 · MINOR — `text-emerald-500` is the demo's **sole** raw-Tailwind-palette colour, in a tree that is otherwise 100% token-driven

**Provenance.** `RibbonBar.vue:42` — `<FileCode class="icon-sm text-emerald-500" />`.
```
$ grep -rn "emerald" --include="*.vue" --include="*.css" demo/   → 1 hit (RibbonBar.vue:42)
```
Its three siblings in the same row are all token-driven: `Copy` bare (`:22`), `Sparkles class="… text-gold"` (`:30`, resolving `--color-gold: hsl(43 74% 49%)` at `design-idioms.css:36`), `Paintbrush` on the `--rainbow-*` paint server (`:59`). Glass-ui publishes the semantic register this wants — `_shared/axes.d.ts` `TONES = ["neutral","success","warning","info","destructive"]`, surfaced as `--success` and as `Button`'s `tone` prop.

**Falsifier.** Show a second raw-palette utility in `demo/` (the grep is the whole claim), or show `--color-emerald-500` re-mapped by glass-ui's theme to a demo-semantic value (probe for `--color-*: initial` / an emerald override in `dist/styles/**` → no hits; the class resolves to stock Tailwind emerald).

**Failure scenario.** The single unmapped hue does not participate in dark-mode remapping, the `.dark` custom-variant (`styles/style.css:14`), or any tone/token retune — a design-system change moves 100% of the demo's colour except this glyph. Cosmetic and low-blast-radius, but it is the exact seam this axis exists to find.

---

### C-10 · MINOR — the surface alphabet is consumed as bare string literals; the `ControlSurface` union exists and is not used

**Provenance.** RibbonBar compares against `'controls'` (`:8`, `:108`), `'keyframes'` (`:13`), `'timeline'` (`:69`). The prop type permits any string — `controlOptionsStore.ts:11-12` `selectedControl: string;`. The exhaustive union is published two files away and *is* imported by the sibling:
```
controlSurfaces.ts:34-40  export type ControlSurface = "controls" | "keyframes" | "timeline" | "easing" | "spring" | "matrix-controls";
ChannelControls.vue:249   type ControlSurface,        ← the sibling imports it; RibbonBar does not
```

**Falsifier.** Show a lint/gate that pins these three literals to the union (`proof:scene-control-dfa`'s D1 anchor greps `ChannelControls.vue` for `stripOptions`/`builtInTabs`, per `useSelectedControlSurface.ts:31-33` — not RibbonBar), or show `selectedControl` narrowed to `ControlSurface` anywhere on the path.

**Failure scenario.** Rename `"keyframes"` → `"editor"` in `ControlSurface` + `BUILT_IN_SURFACES` + `SURFACE_META`. Every type-checked consumer errors and gets fixed; RibbonBar compiles clean and silently falls through `:13` and `:69` into the catch-all slot branch at `:108`, rendering an empty Card where the four editor buttons used to be.

---

### C-11 · MINOR — two undeclared document-scoped dependencies on components RibbonBar does not import

**Provenance.**
1. `:7` `id="controls-ribbon-target"` — a global DOM id that is a **Teleport landing zone** filled from an unrelated subtree: `ChannelOptions.vue:377` `<Teleport v-if="active" to="#controls-ribbon-target" defer>`. Nothing in RibbonBar's props, types, or imports records that the "controls" branch renders an empty div by design.
2. `:59` `stroke: 'url(#rainbow-gradient)'` — an SVG paint-server reference resolved against the **document**, whose `<defs>` live in a different component entirely: `DemoGlobalChrome.vue:16` `<linearGradient id="rainbow-gradient" …>`. That component's own comment names RibbonBar as the reason it exists (`:11-13`: *"the Apply-CSS paintbrush in the ribbon strokes `url(#rainbow-gradient)`"*) — the dependency is documented **one way only**, from the provider.

**Falsifier.** Show a provide/inject, a prop, or a shared constant module that makes either edge type-visible from RibbonBar (there is none: `injectionKeys.ts` carries `ACTIVE_SCENE_KEY`/`TABS_EXTERNALLY_MANAGED_KEY`, neither of these).

**Failure scenario.** Render RibbonBar without `DemoGlobalChrome` mounted (a standalone host, a unit/visual test harness, a future scene shell that does not route through `AnimationControlsGroup.vue:114`): `url(#rainbow-gradient)` resolves to nothing and the un-applied Paintbrush paints with **no stroke** — an invisible icon on a live button. The failure is silent in both DOM and console.

---

### C-12 · MINOR — the `<style scoped>` block is dead: glass-ui 7.0.0's default-tone `Button` has **no border** to transparentise

**Provenance.** `RibbonBar.vue:144-151`:
```
/* The active rainbow-vivid Apply button drops its border so the gradient
   reads edge-to-edge — was a `!border-transparent` Tailwind escape at the
   callsite (D.W2.S3); a scoped rule fights the cascade honestly. */
.ribbon-apply--active { border-color: transparent; }
```
Glass-ui 7.0.0:
```
components/button/styles.css   .button { … border: 0; … }
components/button/styles.css   .button:not([data-tone="neutral"]) { border: 1px solid color-mix(…); … }
button-B7c944jy.js             props: { emphasis: { default: "secondary" }, tone: { default: "neutral" }, size: { default: "md" } }
```
RibbonBar never sets `tone`, so `data-tone="neutral"` → the `:not()` rule **does not match** → the base `border: 0` stands. `border-color: transparent` on a zero-width border is a no-op, and the `'ribbon-apply--active'` class at `:50` exists solely to feed it.

Adjacent (INFO): the same defaults table makes `emphasis="secondary"` — repeated on all eight buttons (`:18,:26,:38,:46,:74,:82,:90,:98`) — exactly the component default. Eight redundant bindings.

**Falsifier.** Show a rule that gives a `tone="neutral"` glass-ui 7.0.0 `Button` a non-zero border (`.button.glass-wash`, the specular/capsule rules, and the emphasis rules were read — none set `border-width`), or a `tone` binding on the Apply button.

**Failure scenario.** No user-visible failure — that *is* the finding. This is version-drift residue from glass-ui 4.0.1 that survived the 7.0.0 adoption because a no-op rule cannot fail a gate. It is 8 lines of dead CSS plus one dead class in a hot `:class` array, and its comment actively misinforms the next reader about the cascade.

---

### C-13 · MINOR — the slot branch has no emptiness guard, and the slot contract permits `null`

**Provenance.** `RibbonBar.vue:107-115` renders the flex container (and therefore keeps the `Card`/`CardContent p-3` plate) whenever `selectedControl !== 'controls'` and neither editor branch matched — **regardless of whether the slot yields anything**. The scene-side contract explicitly allows nothing:
```
app/scene/sceneExposedApi.ts:26   ribbonContent?: (slotProps: { selectedControl: string }) => VNode | null;
app/App.vue:65-71                 <component :is="sceneRef?.ribbonContent" v-bind="slotProps" v-if="sceneRef?.ribbonContent" />
scenes/spring/SpringScene.vue:136  if (slotProps.selectedControl !== "spring") return null;
scenes/easing/EasingScene.vue:94-110  … : null;
scenes/cube/CubeScene.vue:184      slotProps.selectedControl === "matrix-controls" ? [ … ] : (implicit undefined)
```
`ribbonContent` is optional at `sceneExposedApi.ts:26` — three of seven scenes (`amiga`, `square`, `sequence`) declare none at all, so `App.vue:69`'s `v-if` renders nothing into the slot.

**Falsifier.** Enumerate all `(scene × derived surface)` pairs that reach `:108` and show every one yields a non-null vnode. I walked the three scenes that define `ribbonContent` and each returns content exactly for its own facet surface — I could **not** construct a reachable empty case, so this is a structural claim only: `UNPROVEN-NEEDS-LIVE`. Vue's `$slots['ribbon-content']?.()` emptiness idiom would make it structural instead of incidental.

**Failure scenario (if reachable).** An empty `cartoon`/`quiet` glass Card with `p-3` padding floats above the pane — the same "chrome without content" shape that `AnimationControlsGroup.vue:12-17` (SQ-T3) already had to be re-architected to eliminate one level up ("*no chrome without content … an empty sheet with a grab handle over a void*"). The lesson was applied to the pane and not to the ribbon inside it.

---

## 2. Superlatives (L-18, running the other way)

### S-A · RibbonBar is on the **current** glass-ui 7.0.0 API — and is the more-current consumer inside its own Card

Every glass-ui prop it passes type-checks against the installed 7.0.0 declarations:
- `Card cartoon tier="quiet"` (`:3`) — `CardProps.cartoon?: boolean` (`Card.vue.d.ts`) and `tier?: SurfaceTier` inherited from `SurfaceProps` (`Surface.vue.d.ts`), with `"quiet"` a member of `SURFACE_TIERS = ["wash","quiet","resting","floating","overlay"]` (`_shared/axes.d.ts`).
- `Button size="sm" emphasis="secondary"` (×8) — `ButtonSize = Extract<Size,"xs"|"sm"|"md"|"lg">`, `ButtonEmphasis = "primary"|"secondary"|"quiet"|"text"`.

Contrast the **scene render-fns that fill RibbonBar's own slot**: they still pass the retired 4.x `variant` prop.
```
$ grep -rn 'variant: *"outline"' demo/   → 4
  scenes/cube/CubeScene.vue:187, :192
  scenes/spring/SpringScene.vue:143, :166
```
`variant` is **not** in `ButtonProps` (7.0.0 has `emphasis`/`tone`/`size`/`iconOnly`/`loading`), so those four fall through to the DOM as inert attributes. Inside one `CardContent`, RibbonBar's four buttons render on the current emphasis system and the scene-injected buttons render on a prop that no longer exists. **The ribbon is the correct half of that seam.**
*Falsifier:* find `variant` in any glass-ui 7.0.0 Button declaration, or find a `variant`/`emphasis` shim.

### S-B · `rainbow-vivid` is consumed as a published glass-ui utility, not forked — the correct call on the very class the corpus records as a false-deletion casualty

`:50` uses `rainbow-vivid`, which glass-ui 7.0.0 ships at `dist/styles/utilities/btn.css` as `@utility rainbow-vivid { background: linear-gradient(…) }`. `LESSONS-LEARNED.md:603` records that this class was once deleted from the substrate "under a false zero-site verdict" *because keyframes.js consumed it*; the consumer did **not** respond by forking a local copy, and the class is back upstream. This is the anti-pattern of `lane-frontend.md` **S-1** (`KfPillTabs`, 217 lines forked over a defect since fixed upstream) done right.
*Falsifier:* find a local `.rainbow-vivid` re-definition in `demo/styles/` (grep: the demo defines the `--rainbow-*` *tokens* at `design-idioms.css:15-21`, never the utility).

### S-C · Zero shadow surface — RibbonBar adds nothing to the S-1..S-8 census

No local `ui/` copy, no `cn()`, no `cva`, no direct `reka-ui` import, no re-authored button/card primitive. Consistent with `lane-frontend.md` **F-6** ("the glass-ui boundary is otherwise clean") and outside every row of the S-1..S-8 shadow census — the component neither adds a shadow nor is one.
*Falsifier:* identify a glass-ui primitive that RibbonBar re-implements (`Toolbar`/`ButtonGroup` were checked against the 73-subpath export map — neither exists in 7.0.0).

### S-D · Zero keyframes.js import → the ribbon does not undermine the T.G9 Monaco-eager LCP cure

`:122-133` imports exactly three things: 8 lucide glyphs, 3 glass-ui components, 1 type from `@state`. **No `@mkbabb/keyframes.js`, no `@kf-engine`, no `@src`.** The engine-bearing work stays entirely behind `ChannelControls.vue:252-253`'s async boundary, so mounting the ribbon costs the scene's critical path nothing. Given that `useKeyframesPaneReveal.ts:29-34` exists precisely because the pane once cost 10–16 s of mobile LCP, a chrome component that stays engine-free here is a real (if quiet) win — and it is *why* C-4 is a UX gap rather than a perf regression.
*Falsifier:* any keyframes.js/`@kf-engine` specifier in RibbonBar's import block.

### S-E · Zero R1 exposure — the parser crash class is not reachable from any ribbon action

The R1 class is `parseCssColor("oklch()")`. Probes:
```
$ grep -rn "parseCssColor" keyframes.js/src/        → 0
```
The library source never calls it; `lane-library.md:243` locates the single demo call at `demo/scenes/square/useSquareTumble.ts:22` — a scene, not this cluster. **Confirms lane-library, contradicts nothing.**

The one ribbon action that *does* reach value.js is Export CSS: `:40` → `KeyframesStringControls.vue:133-168` `compileToCSS([animation])` → `src/animation/public.ts:140` → `compile/emit/backward.ts:352`, whose serializer tier calls value.js `serializeCssColor` (`compile/interp-slot.ts:325`) and **throws** on `!ok` (`compile/emit/css-text.ts:54`, per `lane-library.md:229`). That throw is the one ribbon-reachable value.js failure mode — and it is the **one** ribbon action wrapped in a full `try/catch` with a verbatim, un-softened refusal report (`:161-167` plus the CC-3 partial/total branches at `:141-160`). The most dangerous action in the row is the best-guarded one.
*Falsifier:* a `parseCssColor` (or any value.js `/css` parse entry) reachable from `copyCSS`, `formatCSS`, `applyCSSStyles`, or the four timeline members. `applyCSSStyles` was traced to `useApplyCSS.ts:30-52` — it consumes an **already-serialized** string and injects it via `useHighlightCSS`; no value.js call. `formatCSS` routes to Monaco/prettier (`CSSCodeEditor.vue:178-187`), not value.js.

---

## 3. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| `lane-frontend.md` **F-1** (glass-ui phantom dep: installed 7.0.0, absent from `package.json` *and* `package-lock.json`) | **CONFIRMED, unchanged.** `RibbonBar.vue:132` `import { Button, Card, CardContent } from "@mkbabb/glass-ui"` is one of the 82 undeclared-dependency import lines. Not re-litigated here; C-2 and C-12 are *downstream* of it — an unpinned, unlocked design system is exactly how a utility silently disappears (`btn-interactive`) and a border silently vanishes (`border: 0`) with no signal at the consumer. **F-1 must land before C-2/C-3/C-12 can be verified as fixed.** |
| `lane-frontend.md` **F-6** (clean glass-ui boundary: 0 reka imports, 0 local `ui/`) | **CONFIRMED** for this file — see S-C. |
| `lane-frontend.md` **§3.1** (21/73 subpaths; root barrel 31 sites) | **CONFIRMED, and this file is INFO not a defect.** `:132` uses the root barrel although `./button` and `./card` subpaths exist. Glass-ui declares `"sideEffects": ["*.css"]` and its root `dist/glass-ui.js` is a pure 44-chunk re-export barrel, so the graph is tree-shakeable — and **no demo file uses `/button` or `/card`**, so RibbonBar is consistent with the (unwritten) house convention. Recording as INFO, not counted as a defect. *Falsifier for anyone who wants to escalate it:* a `KF_ANALYZE=1` gh-pages build showing glass-ui modules beyond button+card reaching the entry chunk via this import. |
| `lane-frontend.md` **§6.3** ("no `--kf-*` namespace; 98 unprefixed demo tokens share a flat global namespace with glass-ui's") | **SHARPENED — the collision is live and I found an instance.** `design-idioms.css:12-21` redefines six `--rainbow-*` tokens in an unlayered `:root` explicitly "so the demo's copy overrides glass-ui's incidental same-named tokens". Glass-ui's `@utility rainbow-vivid` (`utilities/btn.css`) is a **seven**-stop gradient that also references `--rainbow-indigo` — which the demo does **not** redefine. So `RibbonBar.vue:50`'s active Apply button paints six demo crayon HSL stops plus one glass-ui `oklch(0.566 0.206 294.1)` indigo. Not counted as a separate defect (it is the §6.3 namespace finding, instantiated) and the visible hue discontinuity is `UNPROVEN-NEEDS-LIVE`. *Falsifier:* a `--rainbow-indigo` definition in `demo/styles/**` (grep: absent). |
| `lane-library.md` **:243** (`parseCssColor` R1 site = `demo/scenes/square/useSquareTumble.ts:22`) | **CONFIRMED, no contradiction.** See S-E. |
| `lane-library.md` **:229** (`serializeCssValue` throws when value.js returns `!ok`) | **CONFIRMED reachable from `:40`**, and **guarded** at the consumer. See S-E. |
| `lane-frontend.md` **S-1..S-8** shadow census | **No new shadow row.** RibbonBar is not a shadow and does not contain one. |
| `docs/tranches/G/audit/a-styling.md:357` + `docs/tranches/H/audit/harden/impl-w12-styling-decomp.md:76` (both assert `btn-interactive` is glass-ui-owned / correct usage) | **CONTRADICTED by the tree.** `grep -rn "btn-interactive" node_modules/@mkbabb/glass-ui/` → **0**. Both audits predate the 7.0.0 pin. See C-2. |

---

## 4. Repair order (dependency-correct)

1. **`lane-frontend` F-1 first.** Declare `@mkbabb/glass-ui: 7.0.0` and regenerate the lock. Nothing below is reproducible until an `npm ci` can rebuild the tree.
2. **C-2 + C-3 + C-12 as one edit.** Retire `RIBBON_BUTTON_CLASS` entirely: `h-8`/`rounded-full` are dead-or-redundant, `gap-1.5`/`text-body` actively defeat `--ui-scale`, `btn-interactive` resolves to nothing. `<Button size="sm">` alone reproduces the intended geometry *and* restores the coarse-pointer scale. Delete `<style scoped>` and the `ribbon-apply--active` class with it. Net: `:135` collapses to nothing, `:144-151` deletes, `:50` loses one class.
3. **C-5** — one line: `:aria-pressed="!!activeKeyframesRef?.cssApplied"` on `:44`. Independent of everything else.
4. **C-1 + C-4 + C-6 as one wave** (they are one seam). Replace the two `any` props with either typed emits or a single typed `actions` object; derive `:disabled` from action presence, which closes C-4 for free; gate the branches on the machine's derived surface set rather than the raw store, which closes C-6.
5. **C-7** — decide which Paintbrush is the affordance. Either bind `brushAnimation` to the ribbon's visible glyph, or delete the hidden twin and the animation with it (it is currently paying rAF cost for zero pixels).
6. **C-8** — `try/catch` + `toast.error` in `utils/clipboard.ts:3-8` and `KeyframesStringControls.vue:83-88`, matching the two Export paths.
7. **C-9, C-10, C-11, C-13** — cosmetic/structural cleanups, each independently landable.

Nothing above requires a glass-ui change. Every replacement is present in the **already-installed** 7.0.0.

---

## Provenance note

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy the demo already resolves against — so no upgrade is presupposed by any finding or repair. `/Users/mkbabb/Programming/glass-ui` was not read. No file in `keyframes.js` was written, mutated, or executed; no installs, no builds, no dev server, no browser. The sole write of this lane is this file.
