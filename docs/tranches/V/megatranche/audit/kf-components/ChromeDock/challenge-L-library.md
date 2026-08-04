claude-opus-5[1m]

# CHALLENGE · ChromeDock · axis L (LIBRARY)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/dock/ChromeDock.vue` (385 lines)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. One `tsc` type-level probe was run **out-of-tree** (scratchpad, symlinked `node_modules`) — no file in keyframes.js was written, mutated, or executed.
**Posture:** the component is presumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier and dies if the falsifier fires.

## Read set (whole-file, read-only)

| file | why |
|---|---|
| `demo/app/dock/ChromeDock.vue` | the target |
| `demo/app/dock/index.ts` | barrel |
| `demo/components/instrument/surfaceTabs.ts` | `SURFACE_META` / `dockCardinality` import source (lines 18–21) |
| `demo/state/controlSurfaces.ts` | `BUILT_IN_SURFACES` import source (line 17) + the *other* `SURFACE_META`/`dockCardinality` |
| `demo/state/index.ts` | the `@state` barrel |
| `demo/components/instrument/transport/injectionKeys.ts` | `CONTROLS_PANE_HOVER_KEY` |
| `demo/app/App.vue` (binding block 1–30) | the sole host |
| `demo/app/scene/scenes.ts` (labels) · `demo/scenes/{easing,spring,sequence}/use*Demo.ts` · `demo/scenes/cube/CubeScene.vue` · `demo/composables/scene-facility/index.ts` | reachability of the cardinality arms |
| `node_modules/@mkbabb/glass-ui/dist/components/dock/**` (`GlassDock.vue.d.ts`, `DockTrigger.vue.d.ts`, `DockControl.vue.d.ts`, `DockSeparator.vue.d.ts`, `index.d.ts`, `composables/useDockState.d.ts`, `composables/useDockShellProps.d.ts`, `styles/density.css`) + `dist/dock.js` | the primitive contract this file consumes |
| `vite.config.ts`, `tsconfig.json`, `tsconfig.lib.json`, `package.json`, `.github/workflows/ci.yml` | resolution + verification wiring |

**Tally: 2 BLOCKER · 5 MAJOR · 11 MINOR · 3 INFO (uncharged) · 4 SUPERLATIVE.** Charged defects = **18**.

---

## BLOCKERS

### B-1 · The glass-ui phantom dep bites hardest exactly here — and this component is *why* the resolution cycle exists

**Severity: BLOCKER** · `ChromeDock.vue:6–11, 22–28, 29` · folds lane-frontend **F-1**

ChromeDock carries **three** glass-ui import statements across **three** subpaths — `/dock` (`GlassDock`, `DockControl`, `DockTrigger`, `DockSeparator`), the root barrel (`Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectValue`), and `/status-dot`. That is the densest glass-ui surface in `demo/app/` (App.vue:145 reaches one subpath; MbabbMenu.vue two).

Lane-frontend F-1 establishes the package is **absent from `package.json` and from `package-lock.json`** while 7.0.0 sits installed. I re-confirmed the lock half: `grep -n "node_modules/@mkbabb" package-lock.json` → one hit, `node_modules/@mkbabb/value.js` (line 611). Under `npm ci` the module graph therefore dies at `ChromeDock.vue:7`, before any scene renders — this file is app chrome, mounted unconditionally at `App.vue:4`.

The compounding half is **specific to this component and not recorded in the lane**: `vite.config.ts:28–36` documents that the `@mkbabb/keyframes.js` **self-alias** exists *because glass-ui's dock* bare-imports the engine —

> "glass-ui's bare `import … from "@mkbabb/keyframes.js"` (e.g. `SpringProgress` in its **dock/spring-mount**) has no installed package to resolve against — rolldown would stub it as an empty optional-peer-dep and drop the export."

`GlassDock` runs `useDockSpring` on that engine (`dist/dock.js:` the `Le(...)` spring factory constructs from the keyframes spring type). So the deliberate keyframes↔glass-ui cycle that the self-alias holds together is **load-bearing on this one component's import list**. F-1 is not merely "a dep is undeclared near this file"; ChromeDock is the reason the alias cannot be deleted.

**Falsifier:** a glass-ui entry appearing in `package.json`/`package-lock.json`, or an npm workspace / `.npmrc` mechanism that installs it outside the lock. (`.gitmodules` declares only `docs/precepts`; `node_modules/@mkbabb/glass-ui` is a real directory, not a symlink — so no workspace link.)

---

### B-2 · This component's TypeScript is **never typechecked** — not locally, not in CI

**Severity: BLOCKER** · `package.json` scripts · `tsconfig.lib.json` · `.github/workflows/ci.yml:42`

- `vue-tsc` is **not a dependency**. Probe: `node -e` over `{...dependencies,...devDependencies}` filtered for `/vue|tsc|typescript/i` → `@iconify/vue`, `@lucide/vue`, `@vitejs/plugin-vue`, `@vueuse/core`, `typescript@^6.0.3`, `vue@^3.5.35`, `vue-router`, `vue-sonner`. No `vue-tsc`.
- `grep -rn "vue-tsc" package.json .github/ scripts/` → **no output**.
- `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"` — plain `tsc` cannot parse `.vue`; it only picks up `.ts` under `include: ["src/","demo/"]`.
- CI runs `check:lib` only (`ci.yml:42`, `release.yml:43`), and `tsconfig.lib.json` is `include: ["src/"]` — its own comment says so: *"a clean runner type-checks ONLY the publishable surface (`src/`) — never the demo."*

Consequence: the 210-line `<script setup lang="ts">` block — `defineProps`, `defineEmits`, every computed, and the whole template's prop/emit/slot binding surface — has **zero** static verification. `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` are all configured and all inert over this file. This is the enabling condition for M-1, M-3, M-4 and m-1 below: each is a defect that a `vue-tsc` gate would have surfaced at authoring time.

**Falsifier:** a `vue-tsc` invocation anywhere in the repo (a git hook, a `scripts/` runner, an editor-only config that CI also runs), or evidence that `demo:correctness` (`ci.yml:77`) performs type analysis rather than runtime roster checks.

---

## MAJOR

### M-1 · `SURFACE_META` / `dockCardinality` / `extraTabsFrom` are **duplicated across two modules**, and this file imports from *both* — while its own header asserts there is only one

**Severity: MAJOR** · `ChromeDock.vue:12–21, 43–46, 49–50` · category `duplication`

The file's own header comment is the claim under test:

```
12  // T.C1 — the elision RENDER consumes T.B5's AUTHORITATIVE cardinality model
13  // (the DFA projection; the batch-5 dockZones.ts stand-in was deleted at merge —
14  // ONE source of the count arithmetic, per lane 18's dual-formula rule).
```
```
43  // metadata itself DERIVES from the ONE `SURFACE_META` registry (the former
44  // hand-synced literal here was one of the three triplicated sites)
```

The tree says otherwise. Two live modules export the same three symbols:

| symbol | copy A | copy B |
|---|---|---|
| `SURFACE_META` | `demo/state/controlSurfaces.ts:145` (re-exported `@state`, `state/index.ts:59`) | `demo/components/instrument/surfaceTabs.ts:12` |
| `dockCardinality` | `controlSurfaces.ts:278` | `surfaceTabs.ts:25` |
| `extraTabsFrom` | `controlSurfaces.ts:189` | `surfaceTabs.ts:21` |

And ChromeDock **straddles the split**: `BUILT_IN_SURFACES` from `@state/controlSurfaces` (line 17), `SURFACE_META` + `dockCardinality` from the duplicate (lines 18–21). Meanwhile the in-panel strip takes the *other* copy — `ChannelControls.vue:248` imports `SURFACE_META` from `@state`. So `BUILT_IN_CONTROL_TABS` (line 50, the dock's built-in triad metadata) and `extraControlTabs` (App-computed via `useSceneMachine.ts:318 → extraTabsFrom` from `@state`) — the two halves this component **concatenates on line 100** — resolve from **two different registries**. They agree today only because the literals were hand-copied identically. This is precisely the "three hand-synced copies of one fact" hazard that `controlSurfaces.ts:125–129` claims T.B2 killed; it was reduced from three to two, not to one.

`surfaceTabs.ts:21`'s `extraTabsFrom` is additionally **dead**: `grep -rn extraTabsFrom` shows consumers only at `useSceneMachine.ts:35,318` and `state/index.ts:61` — both the `@state` copy.

**Falsifier:** `surfaceTabs.ts` turning out to be a re-export shim (it is not — lines 12–41 are fresh literals and fresh function bodies, with a *narrower* `dockCardinality` return type: the `DockCardinality` interface at `controlSurfaces.ts:254–264` is not applied), or a consumer requiring a genuinely divergent registry.

---

### M-2 · `controlLabelRedundant` is **structurally unreachable** — the whole "inline" arm is dead code, and three comments assert the exact opposite

**Severity: MAJOR** · `ChromeDock.vue:126–146, 307–318, 372–385` · category `dead-code` + `false-invariant`

The chain, each link sourced:

1. `controlLabelRedundant` is set **only** when `controlZone.kind === "inline"`, i.e. exactly one tab — `surfaceTabs.ts:38` / `controlSurfaces.ts:302–306`.
2. `surfacesFor` grants the **full BUILT_IN triad** to any selected channel carrying an `animation` — `controlSurfaces.ts:107–109`.
3. **easing** — its lone channel carries `animation: previewAnim` (`useEasingDemo.ts:352–354`) and the facility adds one facet (`:361`) ⇒ derived set = 4.
4. **spring** — both channels carry animations (`useSpringDemo.ts:410–427`) plus one facet (`:428`) ⇒ 4.
5. **cube / amiga / square** — built by `facilityFromGroup`, which sets `animation: anim` on **every** group member unconditionally (`scene-facility/index.ts:92–99`) ⇒ ≥3; cube's Matrix channel adds `matrix-controls` as a *channel* facet (`CubeScene.vue:228–238`) ⇒ 4 while selected.
6. **sequence** — its lone channel has **no** `animation` and **no** `surfaces`, facets `[]` (`useSequenceDemo.ts:422–436`) ⇒ 0.
7. **home** — no facility ⇒ `surfacesFor(undefined) → []` (`controlSurfaces.ts:99`) ⇒ 0.
8. **No `ChannelHandle` anywhere declares `surfaces:`** — `grep -rn "surfaces:" demo/scenes/ demo/app/` (minus `controlSurfaces`/`activeSurfaces`) → **no output**. So the only route to a light channel's honest subset is unused.

⇒ over the shipped 7-scene set, `allControlTabs.value.length ∈ {0, 3, 4}` — **never 1**. Therefore `controlZoneKind` ∈ {`"absent"`, `"select"`} only, and:

- `inlineControlTab` (144–146) is permanently `undefined`;
- the `v-else-if="inlineControlTab"` branch (307–318) never renders;
- the `.dock-inline-tab` scoped `<style>` block (372–385) is unreachable CSS;
- `controlLabelRedundant ? "absent" : cz.kind` (line 133) always takes the else — the **#17 dup-KILL machinery the entire T.B5 model was built for is inert**.

And the comments are false in two independent ways:

> `:46–48` "The easing scene's set is `['easing']` … so NONE of this triad renders for it."
> — contradicted by (3): easing's channel paints, so the triad *is* granted.

> `:119–121` "`1 ⇒ absent` when the sole tab's label is redundant … (easing→"Easing", spring→"Spring" — **always true on the surviving scene set**)."
> — contradicted by `SURFACE_META`: `easing → label "Curve"`, `spring → label "Physics"` (`controlSurfaces.ts:153–154`), against scene labels `"Easing"` / `"Spring"` (`scenes.ts:163,171`). The case-folded equality at `surfaceTabs.ts:39` can **never** hold. The T.E8 relabel (which `controlSurfaces.ts:149–152` documents as deliberate) silently voided the redundancy predicate; nobody updated the consumer.

**Net simplification available:** `controlZoneKind`, `multipleControlTabs`, `showControlSection`, `inlineControlTab` and the `dockCardinality` import collapse to one predicate — `allControlTabs.value.length > 1`. Five computeds and a cross-module dependency for one `.length > 1`.

**Falsifier:** any shipped scene whose derived surface set has exactly one member — i.e. a `ChannelHandle` with no `animation` that either declares a one-element `surfaces` or carries a `facets` entry, or a facility with one facet whose channel does not paint. None exists today; adding one immediately revives the arm (and with it m-11 and m-5).

---

### M-3 · `currentLabel` is a required prop with **no live consumer**, and its comment describes a render that does not happen

**Severity: MAJOR** · `ChromeDock.vue:64, 130, 359–360` · category `dead-api`

`grep -n currentLabel ChromeDock.vue` → exactly three hits: the prop declaration (64), the `sceneLabel:` argument to `dockCardinality` (130), and a comment (360). The line-130 read feeds `controlLabelRedundant`, dead per **M-2**. So a required member of this component's public contract — wired at `App.vue:7` (`:current-label="currentLabel"`) — drives nothing.

The comment is independently false:

```
359  // scene-title + chevron belong to the EXPANDED bar (already good);
360  // the EXPANDED scene <Select> trigger above carries the full
361  // `{{ currentLabel }}` for the named identity.
```

The expanded trigger (241–245) renders `currentIcon`/`<Home>` and `<SelectValue />`. `SelectValue` derives its text from reka's registered selected-item text, not from this prop. There is no `{{ currentLabel }}` interpolation anywhere in the template.

**Falsifier:** a fourth `currentLabel` site, or evidence that glass-ui's `SelectValue` reads a provided `currentLabel`. (Checked: `dist/components/select/` exposes no such provide; `SelectItem`'s only relevant prop is `hideIndicator`.)

---

### M-4 · `InstanceType<typeof GlassDock>` resolves to **`any`** — the entire imperative dock API is unchecked

**Severity: MAJOR** · `ChromeDock.vue:158` (and the same idiom at `TransportDock.vue:257`) · category `wrong-types`

```ts
158  const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>("dockRef");
```

`GlassDock`'s default export is `__VLS_WithSlots<typeof __VLS_base, __VLS_Slots>` = `DefineComponent<…> & { new (): { $slots: S } }` (`GlassDock.vue.d.ts:26–34`). `InstanceType<T>` over that intersection collapses to `any`.

**Probe (run out-of-tree; the `.d.ts` was copied to scratchpad with its two relative imports repointed at the installed package, `node_modules` symlinked so `vue` resolves):**

```ts
import type GlassDock from "./gd";
type IsAny<T> = 0 extends (1 & T) ? true : false;
type I = InstanceType<typeof GlassDock>;
declare const inst: I;
const nonsense = inst.thisPropertyDoesNotExistAnywhere;  // errors iff I is typed
const isAnyTrue: IsAny<I> = true;                        // compiles iff I is any
```
`tsc --ignoreConfig --noEmit --strict --moduleResolution bundler --skipLibCheck` → **silent**. Both assertions hold ⇒ `I` is `any`.

Controls run alongside:
- `IsAny<typeof GlassDock> = true` → **errors** (`Type 'true' is not assignable to type 'false'`) ⇒ the *export* is properly typed; only `InstanceType<>` over it degrades.
- `InstanceType<DefineComponent<{}, { foo(): void }>>` is **not** any (`IsAny<P> = false` compiles).
- `import type Nope from "./does-not-exist"` → `TS2307` ⇒ the probe harness is live, not silently passing on unresolved modules.

So `dockRef.value?.expanded` (161, 199), `.expand()` (200), `.keepOpen()` (206), `.expand()` (207), `.release()` (208) are all `any` member accesses. A glass-ui bump that renames or drops any of `expanded`/`expand`/`keepOpen`/`release` (all four are real today — `GlassDock.vue.d.ts:14–22`, `useDockState.d.ts:38–52`) lands as a silent runtime no-op. Under **B-2** even a correct `vue-tsc` would not run — but the annotation gives a *false* impression of safety to any reader or future gate.

Correct idiom: `ComponentExposed<typeof GlassDock>` (vue-component-type-helpers), or annotate against the published `UseDockStateReturn` subset the component actually uses (it is exported from `/dock`: `index.d.ts:11`).

**Falsifier:** a `tsc` run in which `const notAny: IsAny<InstanceType<typeof GlassDock>> = false;` compiles.

---

### M-5 · The re-expand watchdog defends against a collapse path the **installed** primitive does not have — and it is a second watcher on the same source, which flickers the injected pane ref

**Severity: MAJOR** · `ChromeDock.vue:188–202` (with `161–163`) · category `dead-workaround` + `duplication`

The stated rationale:

```
190  // popup remains visible + hit-testable … keepOpen() blocks the idle-TIMER collapse, but
191  // the dock's document-pointerdown path can still force a collapse (its own
192  // dismiss-synthetic pointerdown lands outside the dock and self-collapses it,
193  // bypassing the hold counter).
```

The installed 7.0.0 `useDockState` (`node_modules/@mkbabb/glass-ui/dist/dock.js`, the `Ie(...)` body from line 269) says the opposite. The hold counter is `p` (`p = G(0)`), and:

- `dock.js:337` — `keepOpen` (`P`): `p.value++, S();`
- `dock.js:340` — `release` (`F`): `p.value = Math.max(0, p.value - 1), …`
- `dock.js:345` — **the document-pointerdown handler** (`I`): `if (c() || p.value > 0 || a?.value) return;`

The pointerdown path **bails on a positive hold count**. Every other collapse route is guarded the same way: the idle scheduler `T` (`c() || p.value > 0 || …`), mouseleave `A` (`if (p.value > 0) return`), focusout `M` (`|| p.value > 0`). The only unguarded routes are the imperative `collapse()` and the `alwaysExpanded` watch arm — ChromeDock invokes neither and passes no `always-expanded` (line 224 binds only `collapse-delay`, `start-collapsed`, `fit-content`). So while the `watch(isAnyOpen)` hold is applied, **no collapse is reachable**, and lines 197–202 are dead defensive code.

This is the same class as lane-frontend **F-2 / S-1** (KfPillTabs forked over a 4.0.1 ARIA bug fixed in the installed 7.0.0): a workaround whose cited cause is stale by several majors, still carrying its own justification prose. Contradiction with the lane is *none* — it is a second instance of the pattern, in a different file.

**Compounding (this is what makes it MAJOR, not MINOR):** it is a **second `watch` on the identical source** as line 161. If the watchdog ever *did* fire, the ordering is: watcher-1 writes `controlsPaneHover.value = false` → watcher-2 calls `expand()` → `expanded` flips true → watcher-1 writes `true`. The injected `CONTROLS_PANE_HOVER_KEY` ref (`App.vue:171` — "Dock hover → controls pane opacity") therefore round-trips `true → false → true` within one flush, driving a visible opacity flicker on the controls pane. Two watchers over one source that write and read overlapping state is a merge waiting to happen; one watcher with both effects, ordered, is the correct shape.

*(Sub-note, and a semantic smell in its own right: watcher-1 writes the dock's **expanded** state into a ref named **hover**. The dock is expanded on hover, on focus-in, on pin-click, and on programmatic `expand()` — three of four are not hover.)*

**Falsifier:** any collapse path in glass-ui 7.0.0 that sets `state = "collapsed"` while `p.value > 0`. I enumerated `T`, `A`, `M`, `I`, `N`, `D`, `E` in the `Ie(...)` body; produce one I missed and this finding dies. *(The visible-flicker half is source-derived, not observed — **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.)*

---

## MINOR

### m-1 · Asymmetric icon-lookup posture: the trigger indexes `TAB_ICONS` unguarded, the items guard
**`ChromeDock.vue:292` vs `:299, :313`**

```
292  :is="TAB_ICONS[allControlTabs.find(t => t.value === selectedControl)?.icon ?? 'SlidersHorizontal']"
299  v-if="tab.icon && TAB_ICONS[tab.icon]" :is="TAB_ICONS[tab.icon]"
313  v-if="inlineControlTab.icon && TAB_ICONS[inlineControlTab.icon]"
```

Three lookups, two postures. `extraControlTabs` is typed `icon?: string` (line 72) — an unconstrained string from an external host — so an unregistered key makes `:is` receive `undefined`, which Vue renders as a comment node plus a dev warning. `TAB_ICONS` is total over today's `SURFACE_META` by **coincidence** (its 5 registered keys cover the 6 entries' icons: `SlidersHorizontal`, `Braces`, `Clock`, `Activity`×2, `Grid3X3`), not by type. Fix: `icon?: keyof typeof TAB_ICONS`, or guard uniformly.
**Falsifier:** `TAB_ICONS` typed total over `ControlSurfaceTab["icon"]`, or `extraControlTabs`'s icon narrowed to the registry's key union.

### m-2 · `dockCardinality({ channels: [] })` — a dead argument to a conflated signature
**`ChromeDock.vue:127–131`** passes `channels: []` and discards the returned `channelZone`. `TransportDock.vue:357` does the exact mirror: `dockCardinality({ tabs: [], channels: animationNames }).channelZone.kind`. Each of the two callers uses precisely half the function; neither ever supplies both axes. The "ONE derived cardinality model both docks read" (`controlSurfaces.ts:246–252`) is two independent count predicates welded into one entry point — the shared *module* is real, the shared *call* is fictional.
**Falsifier:** a caller that reads both `controlZone` and `channelZone` from one invocation.

### m-3 · Root-barrel import for `Select*` while `/dock` and `/status-dot` use subpaths
**`ChromeDock.vue:22–28`** — `./select` **exists** in the exports map (`node -e` over `@mkbabb/glass-ui/package.json`.exports → `./dock`, `./select`, `./status-dot`, `./tabs`, …). One file, two granularities; the root-barrel pull is the widest import surface available and the least tree-shake-friendly, under a dependency that is not even declared (**B-1**).
**Falsifier:** `./select` not re-exporting all five symbols, or a documented reason the root barrel is required here.

### m-4 · The nav `<DockSeparator />` is unconditional while every other separator is zone-gated
**`ChromeDock.vue:326`** sits outside any `v-if`; the section separator at `:283` is correctly inside `v-if="showControlSection"`. The header comment claims the invariant:

```
227  // glass-ui DockSeparator; separators derive from INHABITED zones by construction
```

When `hasControlPanel` is false — reachable: home (no facility ⇒ `[]`) and sequence (`useSequenceDemo.ts:434` `facets: []`, non-painting channel ⇒ `[]`) — the nav zone contains only `<slot name="items" />`. A host that leaves that slot empty renders a trailing hairline with nothing after it: VERDICT #6's "superfluous divider," the very thing the model exists to elide. The props doc explicitly contemplates such hosts (`:69–70` "non-App hosts that don't drive the DFA"); App.vue:19–25 always fills it, so the defect is latent, not live.
**Falsifier:** a `$slots.items` guard on line 326, or a contract making `#items` mandatory.

### m-5 · `aria-label` on a bare `<div>` is inert
**`ChromeDock.vue:307–311`** — an accessible name on `role="generic"` is prohibited by ARIA and dropped by AT. Dead today (**M-2**); becomes live the moment the inline arm is revived.
**Falsifier:** an AT that exposes `aria-label` on a nameless generic element.

### m-6 · `[&>span]:line-clamp-none` reaches into `DockTrigger`'s internal DOM
**`ChromeDock.vue:241, 291`** — an arbitrary Tailwind variant targeting a direct `<span>` child that `DockTrigger` renders internally. Same soft-coupling class as lane-frontend §3.4's CSS-layer reach-around (`tab-idiom.css`/`playback-idiom.css` styling reka's generated tree): not an import-boundary breach, but it fails silently if the primitive changes its inner element. `DockTrigger.vue.d.ts` publishes only `for` and `class` — the inner structure is unversioned.
**Falsifier:** glass-ui documenting the `> span` child as a stable seam.

### m-7 · The mobile breakpoint is a hand-copied literal, undocumented at this site
**`ChromeDock.vue:148`** — `useMediaQuery("(max-width: 1023px)")` is the fifth JS copy of the app's mobile boundary (`useControlsLayout.ts:48`, `ControlsPaneWrapper.vue:254`, `usePaneRegister.ts:38` as the 1024 twin) atop ~12 CSS copies. Every other JS site annotates it ("the SAME 1023px" — `ControlsPaneWrapper.vue:253`, `useControlsLayout.ts:56`; "the SAME 1024px line" — `usePaneRegister.ts:26`). This one does not, and no shared token exists.
**Falsifier:** a `--breakpoint-*` token or exported constant these sites already share.

### m-8 · `String(...)` coercion at the emit boundary hides type failures
**`ChromeDock.vue:239, 289`** — `emit('switchScene', String(id))`. The emit is typed `(e:"switchScene", id: string)`; the coercion converts a non-string reka `AcceptableValue` to `"[object Object]"` and emits it as a scene id rather than failing. A `typeof === "string"` guard (or a branded `SceneId`) surfaces the bug instead of laundering it.
**Falsifier:** reka's `update:modelValue` payload proven non-string in this configuration, making the coercion load-bearing.

### m-9 · `allControlTabs.find(...)` inline in the template
**`ChromeDock.vue:292`** — an O(n) scan re-run on every render of that subtree, duplicating the `selectedControl → tab` resolution that belongs beside `inlineControlTab` as a computed. Small n (≤4), so this is hygiene, not perf.
**Falsifier:** none needed — it is a mechanical hoist; the claim is about placement, not cost.

### m-10 · `:start-collapsed="true"` restates the primitive's own default
**`ChromeDock.vue:224`** vs `useDockShellProps.d.ts` — *"Start in the collapsed state (**default true**)."* Harmless today, but it pins a default the primitive owns: a deliberate glass-ui flip would be silently overridden here with no local rationale. (`:collapse-delay="2500"` is a genuine override — the primitive's default is 2000 — but it diverges from `TransportDock`, which takes the default; two docks in one app, two idle timings, no shared token.)
**Falsifier:** a comment or contract requiring the explicit pin.

### m-11 · `--dock-label-padding-inline` is a phantom custom property, and its rationale names a retired primitive
**`ChromeDock.vue:373–384`**

```
381      padding-inline: var(--dock-label-padding-inline, 0.5rem);
```

The token is defined **nowhere**: `grep -rlo "dock-label-padding-inline" node_modules/@mkbabb/glass-ui/dist/` → no output; `grep -rn` over `demo/` → this line only. The rule therefore always resolves to the hardcoded fallback, so the comment's claim —

```
375  … It reads at the same inline height + padding a `DockSelectTrigger` occupies so the
376  dock row keeps its rhythm.
```

— is false twice over. (a) glass-ui's real token is **`--dock-trigger-padding-inline`** (`dist/components/dock/styles/density.css`: `0.4375rem` sm / `0.5rem` md / `0.625rem` lg / `1rem` xl, each `× var(--dock-scale)`), so `0.5rem` matches only md at scale 1 and the rhythm breaks at every other size. (b) **`DockSelectTrigger` does not exist in glass-ui 7.0.0** — `dist/components/dock/index.d.ts` exports `GlassDock`, `DockLayerGroup`, `DockLayer`, `DockCrossfade`, `DockControl`, `DockTrigger`, `DockBackgroundToggle`, `DockSeparator`. Rated MINOR only because the block is unreachable (**M-2**); it is a MAJOR the day the inline arm returns.
**Falsifier:** the token appearing in a glass-ui CSS layer the grep missed, or a consumer-defined `:root` declaration.

---

## INFO (recorded, not charged)

**i-1 · Comment archaeology.** ~110 of 385 lines are prose, much of it naming code that is not present: *"the batch-5 `dockZones.ts` stand-in was deleted at merge"* (:13), *"The K.W4 S6 STATIC-LABEL else-branch is DELETED"* (:122), *"the former `hasSelectedAnimation` AND-clause is DEAD"* (:109). Three cite versions the tree has passed: *"glass-ui's rebuilt 3.3.0 dock"* (:220), *"on glass-ui 4.0.0"* (:348) — installed is 7.0.0. M-2, M-3 and m-11 are all cases where the prose outlived the fact; the density is the mechanism.

**i-2 · The unpaired `release()` is safe, by an undocumented clamp.** `watch(isAnyOpen, …)` (204–209) is not `immediate`, so a mount with `itemsPopupOpen === true` never calls `keepOpen()`, yet the eventual close calls `release()`. `useDockState.d.ts` promises only *"Decrement hold ref-count"*; the implementation clamps — `dock.js:340` `p.value = Math.max(0, p.value - 1)`. No underflow. Recorded because the component relies on an implementation detail the type contract does not guarantee. **Not charged** — my first read of this as a bug was killed by the clamp, and a false defect costs more than a missed one.

**i-3 · Zero direct engine consumption.** ChromeDock imports nothing from `@mkbabb/keyframes.js` / `@kf-engine` — it is one of the 21 demo `.vue` files that do not (lane-frontend §1: 68 of ~206 files dogfood the engine). All of its motion is delegated to `GlassDock`'s `useDockSpring`/`useDockMorph`, which run on keyframes.js through the vite self-alias. That is *correct delegation*, not misuse — but it means the demo's most-visible chrome contributes no direct engine coverage, and the dock's spring behaviour is exercised only transitively.

---

## SUPERLATIVES (L-18 running the other way)

### S★-1 · Zero teardown surface, by construction
**`ChromeDock.vue` whole file.** Every side effect is a `watch()` created during `setup` (161, 197, 204 — all auto-stopped on unmount) plus one VueUse `useMediaQuery` (148, VueUse-owned cleanup). There is **no** `addEventListener`, `setTimeout`, `setInterval`, `requestAnimationFrame`, `ResizeObserver`, `IntersectionObserver`, or `MutationObserver` anywhere in the file — verified by grep. For a component that drives an imperative child API across a package boundary and injects a shared mutable ref, a zero-manual-teardown footprint is the right answer and the rarer one.
**Falsifier:** any manually-registered subscription in the file, or a `watch` created inside a callback rather than at setup scope (which would escape the effect scope). Neither exists.

### S★-2 · The popup mutex is a derived model, not an imperative latch
**`ChromeDock.vue:166–186`.** Mutual exclusion is a consequence of the state's **type** — `openPopup: Ref<PopupKey | null>` can physically hold one key — rather than of cross-clearing code. `popupModel(key)` returns a `WritableComputedRef` whose get/set are total, and the close arm guards `openPopup.value === key`, so a *losing* popup's late close cannot null out the winner. Two dropdowns, one source of truth, no watcher between them, no `nextTick`, no reentrancy window. This is the correct shape for a mutex over N triggers and it generalises to N without edit.
**Falsifier:** a sequence in which both models read `true` simultaneously, or one in which a stale close clears an unrelated key. The `=== key` guard forecloses the second; the single-slot ref forecloses the first.

### S★-3 · kf-CONSUME discipline — the consumer shrank, the primitive was not patched
**`ChromeDock.vue:347–366`.** When glass-ui 4.0.0 necked the collapsed dock to a perfect circle and the three-part chip clipped its label ("Cube" → "Cub"), the recorded resolution was to make the `#collapsed` slot content icon-forward — *"This is a kf-CONSUME fit (no GlassDock patch) — the slot content shrinks to what the circle holds."* Adapting the consumer to the primitive's contract is the correct direction across a repo boundary, and it is the **exact inverse** of the failure lane-frontend F-2/S-1 documents (KfPillTabs forked the primitive over a bug, then rotted three majors behind it). The fix also survived two glass-ui majors intact — the strongest available evidence that the direction was right.
**Falsifier:** a glass-ui slot/prop that already solved the circle-clip, making the local shrink redundant rather than principled. `GlassDock.vue.d.ts`'s slot set (`persistent`, `default`, `collapsed`, `search`, `persistent-end`) offers no label-fitting affordance, so none existed.

### S★-4 · The layout tether is an explicit opt-in attribute, not a selector on a utility class
**`ChromeDock.vue:214`** (`data-dock-tether="top"`) against `styles/layout.css:148–170`, which states the rule and the reason: *"The tether keys on an EXPLICIT `[data-dock-tether]` opt-in attribute on the two real dock bands, NOT a `:has()` test on a generic `.z-dock` utility class (`proof:brittleness` forbids keying layout on a `z-*` or `pointer-events-*` utility class)."* ChromeDock declares it; TransportDock.vue:4 declares `"bottom"`. Two consumers, one contract, and the CSS anchor-positioning block (`layout.css:159–166`) binds to the declared marker rather than to incidental class soup. Structural coupling done the way it should be.
**Falsifier:** a third tethered band that does *not* declare the attribute, or a `:has()`/utility-class fallback in the same `@supports` block. Neither is present.

---

## Repair order (dependency-respecting)

1. **B-1** — declare `@mkbabb/glass-ui: 7.0.0`, regenerate the lock. Nothing below is reproducible until `npm ci` works (lane-frontend §10 item 1 concurs).
2. **B-2** — add `vue-tsc` and put `.vue` under a CI gate. Without it, every repair below is unverifiable and M-1/M-3/M-4/m-1 regress silently.
3. **M-1** — collapse `demo/components/instrument/surfaceTabs.ts` into `@state/controlSurfaces` (delete the duplicate; repoint `ChromeDock.vue:18–21` and `TransportDock.vue:237`). Do this before M-2 so the cardinality edit lands once.
4. **M-2 + M-3 + m-2 + m-5 + m-11 together** — decide the inline arm: revive it with a real one-surface scene, or delete `inlineControlTab`, the `v-else-if` block, the `.dock-inline-tab` style, the `sceneLabel`/`channels` arguments, and the `currentLabel` prop (plus `App.vue:7`). Collapse the five computeds to `allControlTabs.length > 1`. Rewrite the four false comments either way.
5. **M-5** — delete the re-expand watchdog; fold the `controlsPaneHover` write into a single watcher. Re-verify against the glass-ui version actually pinned by step 1.
6. **M-4** — `ComponentExposed<typeof GlassDock>` at `ChromeDock.vue:158` and `TransportDock.vue:257`.
7. **m-1, m-3, m-4, m-6..m-10** — independently landable hygiene.

## Provenance

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy installed in the target tree — so no upgrade is presupposed by any repair. `/Users/mkbabb/Programming/glass-ui` was not read. No file in keyframes.js was written, mutated, or executed; no installs, no dev servers, no browser tooling. The single `tsc` invocation (M-4) ran against copies in the session scratchpad with a symlinked `node_modules`, emitting nothing.
