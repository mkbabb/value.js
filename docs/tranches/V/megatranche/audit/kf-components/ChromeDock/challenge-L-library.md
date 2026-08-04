claude-opus-5[1m]

# CHALLENGE · ChromeDock · axis L (LIBRARY) — pass 2 (superseding)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/app/dock/ChromeDock.vue` (385 lines; script 1–210, template 212–370, style 372–385)
**Mode** static + read-only. No installs, no dev server, no browser tooling. Four probes were executed **entirely in the session scratchpad** against the *unmodified, in-situ* `node_modules` of the target tree (path-mapped, never copied or repointed); nothing in keyframes.js was written, mutated, or executed.
**Posture** the component is DEFECTIVE until the tree proves otherwise — and a **false defect is worse than a missed one**, which is why §0 exists.

> ### §0 · RETRACTION — pass 1's **M-4 is FALSE**. Do not action it.
>
> A prior pass at this path charged **M-4 · MAJOR · "`InstanceType<typeof GlassDock>` resolves to `any` — the entire imperative dock API is unchecked."** It does not. Probed against the installed package in place:
>
> ```
> isany.ts(9,7):  error TS2322: Type 'true' is not assignable to type 'false'.   // IsAny<InstanceType<typeof GlassDock>> === false
> isany.ts(20,23): error TS2339: Property 'thisMemberDoesNotExistAnywhereAtAll' does not exist on type
>   '{ $: ComponentInternalInstance; $data: {}; $props: { readonly fitContent?: boolean; …
>      readonly backdropMode?: DockBackdropMode; … readonly search?: boolean; } & VNodeProps & … }'
> ```
>
> `InstanceType<>` resolves to a **fully typed `ComponentPublicInstance` carrying `DockProps`** — not `any`. A companion probe confirms the four members the component actually calls are genuinely typed, not `any`-laundered: `x.expanded`, `x.expand()`, `x.keepOpen()`, `x.release()` compile clean (**exit 0**) *and* `IsAny` is false, so those accesses are checked. Both live-harness controls fired as expected (`IsAny<typeof GlassDock>` and `IsAny<InstanceType<DefineComponent<…>>>` both error), so the probe was not silently passing.
>
> **Why pass 1 got the opposite result:** its own method note says it ran against `.d.ts` **copies** in scratchpad "with its two relative imports repointed at the installed package." Repointing is the fault: if either relative import fails to resolve, `DockProps` degrades, `__VLS_base` widens, and `InstanceType<>` poisons to `any` — an artefact of the harness, not a property of the tree. This pass path-maps `@mkbabb/glass-ui/*` → the real `dist/`, leaving every file byte-identical.
>
> **Falsifier for the retraction** — a `tsc` run in which `const notAny: IsAny<InstanceType<typeof GlassDock>> = false;` **errors**, using the installed package unmodified. It does not.
>
> Pass 1's `ComponentExposed<>` remedy (its repair step 6) should therefore **not** be landed: it would be a no-op change justified by a measurement error. Every other pass-1 row I re-derived independently and **confirmed**; those are carried below with credit.

**Read set (whole-file, read-only)** — the target; `demo/app/dock/{index.ts,MbabbMenu.vue}`; `demo/components/instrument/{surfaceTabs.ts,transport/injectionKeys.ts}`; `demo/state/{controlSurfaces.ts,useSceneMachine.ts,index.ts}`; `demo/app/App.vue`; `demo/app/scene/scenes.ts`; `demo/scenes/{easing,spring,sequence}/use*Demo.ts` facility blocks; `demo/scenes/cube/CubeScene.vue`; `demo/composables/scene-facility/index.ts`; `vite.config.ts`; `tsconfig.json`; `tsconfig.lib.json`; `package.json`; `.github/workflows/ci.yml`; and the installed `@mkbabb/glass-ui@7.0.0` type + `dist/dock.js` surface for `/dock`, `/select`, `/status-dot`.

**Corpus folded** — lane-frontend **F-1** (phantom glass-ui): confirmed, localised (B-1). Lane-frontend **S-1..S-8** name no ChromeDock row; **no contradiction**, and B-5 below is a second instance of S-1's *stale-workaround* pattern in a different file. No lane-library parse-seam row touches this component.

**Tally — 2 BLOCKER · 5 MAJOR · 13 MINOR · 3 INFO (uncharged) · 7 SUPERLATIVE. Charged defects = 20.**
**New in pass 2:** B-2's live proof, M-4, m-12, m-13, S★-5, S★-6, S★-7, and §0.

---

## BLOCKERS

### B-1 · The phantom glass-ui dep bites hardest exactly here — this component is *why* the resolution cycle exists
**BLOCKER** · `ChromeDock.vue:6–11, 22–28, 29, 158` · folds lane-frontend **F-1**; confirms pass-1 B-1

Three glass-ui import statements across three subpaths — `/dock` (`GlassDock, DockControl, DockTrigger, DockSeparator`), the root barrel (`Select, SelectContent, SelectGroup, SelectItem, SelectValue`), `/status-dot` (`StatusDot`) — nine value bindings plus a **type** dependency at `:158`. Densest glass-ui surface in `demo/app/`.

Re-confirmed independently at this commit: `@mkbabb/glass-ui` is in **neither** `dependencies` nor `devDependencies`; the only `@mkbabb` lock entry is `value.js`; `node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`, a real directory, not a symlink. `tsconfig.lib.json`'s own comment concedes it — *"the whole-project `check` … stays for demo development **after that dependency is restored**."* Under `npm ci` the graph dies at `ChromeDock.vue:11`, before any scene renders; this file is chrome, mounted unconditionally at `App.vue:4`.

**The compounding half, specific to this component:** `vite.config.ts:22–35` documents that the `@mkbabb/keyframes.js` self-alias exists *because glass-ui's dock* bare-imports the engine. Verified in the artifact — `dist/dock.js` line 24, `import { SpringProgress as fe } from "@mkbabb/keyframes.js"`, consumed by `useDockSpring` (`new fe({response, dampingFraction, initial, respectReducedMotion:true})`) and driven by `useDockMorph`. The deliberate keyframes↔glass-ui cycle the alias holds together is load-bearing on **this file's import list**: ChromeDock is the reason the alias cannot be deleted, and every contract it leans on is pinned to whatever happens to be installed. B-5 is the live cost of that.

**Falsifier** — a glass-ui entry in `package.json`/`package-lock.json`, or a workspace/`.npmrc` mechanism installing it outside the lock (`.npmrc` is one line, `legacy-peer-deps=true`; `.gitmodules` declares only `docs/precepts`; the install is a real dir, so no workspace link).

---

### B-2 · This component's TypeScript is never typechecked — **and the hole is already hiding a real error**
**BLOCKER** · `ChromeDock.vue:128` (the error) · `package.json` scripts · `tsconfig.lib.json` · `ci.yml:41–42` · confirms **and materially upgrades** pass-1 B-2

Pass 1 established the gate hole. This pass **measures** it and produces the error it conceals — which is what moves this from "a gate is missing" to "the tree is already wrong and cannot know it."

**The hole, measured.** No `vue-tsc` in `package.json` (deps, devDeps, scripts) or any workflow. `check` is `tsc --noEmit && tsc --noEmit -p tsconfig.test.json` — plain `tsc`, which cannot parse an SFC. CI runs only `check:lib` (`ci.yml:41–42`), and `tsconfig.lib.json` narrows `include` to `["src/"]`. Measured on the whole-project config:

```
$ tsc --noEmit --listFilesOnly -p tsconfig.json | grep -c 'demo/'   → 126
$ tsc --noEmit --listFilesOnly -p tsconfig.json | grep -c '\.vue$'  →   0
```

126 demo files in the program; **zero** `.vue`. `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` are all configured and all inert over this file.

**The error it hides.** Script block 2–209 extracted verbatim to a scratch `.ts`, compiled with the repo's own `typescript` and the repo's own compiler options, deps path-mapped to the repo's `node_modules`:

```
script.ts(127,9): error TS2322: Type '{ value: string; label: string; icon?: string; }[]'
  is not assignable to type 'readonly ControlSurfaceTab[]'.
    Types of property 'value' are incompatible.
      Type 'string' is not assignable to type 'ControlSurface'.
```

`script.ts:127` ≡ **`ChromeDock.vue:128`** — the `tabs: allControlTabs.value` argument to `dockCardinality`. It is the **only** error in the shipped script block; the extraction was exhaustive, not sampled.

**Root** — the component restates `ControlSurfaceTab` structurally, twice, each time widening `value` from the `ControlSurface` union to `string`:

- `:49` `const BUILT_IN_CONTROL_TABS: { value: string; label: string; icon?: string }[] = …`
- `:72` `extraControlTabs?: { value: string; label: string; icon?: string }[]`

`allControlTabs` (`:95–101`) is their union; `:128` hands it back to a parameter typed `readonly ControlSurfaceTab[]` (`surfaceTabs.ts:26`). Isolation probe: the same call with the `value` union narrowed compiles clean, and with `ControlSurfaceTab[]` compiles clean — only the `value: string` shape fails. `exactOptionalPropertyTypes` is *named* in the diagnostic but is **not** the cause.

The fix is the same edit M-1 wants: import the type instead of restating it.

**Falsifier** — a `vue-tsc` (or `--allowArbitraryExtensions` + SFC plugin) run over `demo/` reporting **0** errors on this file; or a demonstration that the `dockCardinality` ChromeDock imports takes `readonly {value: string;…}[]`. It takes `ControlSurface`.

---

## MAJOR

### M-1 · `SURFACE_META` / `dockCardinality` / `extraTabsFrom` are duplicated across two modules, and this file imports from **both** — while its own header asserts there is only one
**MAJOR** · `ChromeDock.vue:12–21, 43–46, 49–50, 95–101` · confirms pass-1 M-1

The header is the claim under test — `:12–14` *"ONE source of the count arithmetic"*; `:43–44` *"DERIVES from the ONE `SURFACE_META` registry."* Two live modules export the same three symbols:

| symbol | copy A | copy B |
|---|---|---|
| `SURFACE_META` | `controlSurfaces.ts:145` (re-exported `@state`) | `surfaceTabs.ts:12` |
| `dockCardinality` | `controlSurfaces.ts:278` | `surfaceTabs.ts:25` |
| `extraTabsFrom` | `controlSurfaces.ts:189` | `surfaceTabs.ts:21` |

ChromeDock **straddles the split**: `BUILT_IN_SURFACES` from `@state/controlSurfaces` (`:15–17`), `SURFACE_META` + `dockCardinality` from the duplicate (`:18–21`). So the two halves it concatenates on `:100` resolve from **two different registries**:

- `BUILT_IN_CONTROL_TABS` (`:49–50`) ← `surfaceTabs.SURFACE_META`
- `props.extraControlTabs` (`:72`) ← `App.vue:264` → `useSceneMachine.ts:317–318` `extraTabsFrom` → `controlSurfaces.SURFACE_META`

One dropdown, two label dialects, agreeing today only because the literals were hand-copied identically (verified content-equal: `Controls/SlidersHorizontal`, `Keyframes/Braces`, `Timeline/Clock`, `Curve/Activity`, `Physics/Activity`, `Matrix Controls/Grid3X3`). This is the exact "three hand-synced copies of one fact" hazard `controlSurfaces.ts:125–129` claims T.B2 killed — reduced from three to two, not to one, and `controlSurfaces.ts:141–144` still asserts *"THE ONE SURFACE-METADATA REGISTRY … `proof:dfa-derived`'s 'resolves from exactly ONE module' clause."* That clause is violated in fact.

The fork is also the weaker copy: `surfaceTabs.ts:25` drops the `: DockCardinality` return annotation `controlSurfaces.ts:278` carries. And `surfaceTabs.ts:21`'s `extraTabsFrom` is **dead** — every consumer (`useSceneMachine.ts:35,318`, `state/index.ts:61`) takes the `@state` copy.

**Falsifier** — `surfaceTabs.ts` proving to be a re-export shim (it is not: `:1–4` imports only `BUILT_IN_SURFACES` + the `ControlSurface` type; `:12–41` are fresh literals and fresh bodies), or a consumer needing a genuinely divergent registry.

---

### M-2 · The `inline` arm and `controlLabelRedundant` are **structurally unreachable**, three comments assert the opposite, and the cardinality arithmetic is re-derived three times
**MAJOR** · `ChromeDock.vue:114, 126–146, 307–318, 372–385` · confirms pass-1 M-2, folding pass-2's duplication finding

Independently re-derived. `controlLabelRedundant` is set only when `controlZone.kind === "inline"` — exactly one tab (`surfaceTabs.ts:38`). `surfacesFor` grants the **full triad** to any selected channel carrying an `animation` (`controlSurfaces.ts:107–109`). Over the shipped scene set:

| scene | selected/first channel | derived set | `length` |
|---|---|---|---|
| home | — (App forces `[]`, `App.vue:250–257`) | `[]` | 0 |
| cube · amiga · square | `facilityFromGroup` sets `animation` on every member (`scene-facility/index.ts:92–99`) | triad (+`matrix-controls` while Matrix selected, `CubeScene.vue:228–238`) | 3–4 |
| easing | `"Easing"`, `animation: previewAnim` (`useEasingDemo.ts:349–358`) | triad + `easing` | **4** |
| spring | `"Sweep"`, `animation: springEditAnim` (`useSpringDemo.ts:405–411`) | triad + `spring` | **4** |
| sequence | `"Sequence"`, **no** `animation`, no `surfaces` (`useSequenceDemo.ts:423–433`) | `[]` | 0 |

No `ChannelHandle` anywhere declares `surfaces:` — the only route to a light channel's honest subset is unused. ⇒ `allControlTabs.length ∈ {0, 3, 4}` — **never 1**. Therefore `inlineControlTab` (`:144–146`) is permanently `undefined`, the `v-else-if` arm (`:307–318`) never renders, the `.dock-inline-tab` scoped block (`:372–385`) is unreachable CSS, and the `controlLabelRedundant ? "absent" : cz.kind` ternary (`:133`) always takes the else — **the #17 dup-KILL machinery the whole T.B5 model was built for is inert.**

**Two independent falsehoods in the prose:**

- `:46–48` *"The easing scene's set is `['easing']` … so NONE of this triad renders for it"* — easing's channel paints; the triad *is* granted.
- `:118–121` *"`1 ⇒ absent` when the sole tab's label is redundant (easing→"Easing", spring→"Spring" — **always true on the surviving scene set**)"* — `SURFACE_META` labels these **`Curve`** and **`Physics`** (`controlSurfaces.ts:153–154`) against scene labels `Easing`/`Spring` (`scenes.ts:163,171`). The case-folded equality at `surfaceTabs.ts:39` can **never** hold. The T.E8 relabel — deliberate, documented at `controlSurfaces.ts:149–152`, *"the facet names the FACET, not the scene"* — silently voided the redundancy predicate. Two independent cures shipped for VERDICT #17; the relabel worked, and it killed the elision. Nobody updated the consumer. `:141–142` says the arm is *"never on the surviving scene set"* — true, and the exact opposite of `:120`, in the same file.

**Folded (pass-2 addition): the arithmetic is re-derived three times** — `:114` `length > 0`, `:137` `length > 1`, `:126–134` the sanctioned projection — against `controlSurfaces.ts:217–225`, which names `ChromeDock multipleControlTabs` explicitly and says *"Lane 3 … **DELETES** the per-dock `.length` arithmetic."* The template branches on the hand-rolled copy (`:285`), not the projection. Divergence mode: move `dockCardinality`'s threshold (`surfaceTabs.ts:30`) and you get `showControlSection === true` with **both** template arms false — `<DockSeparator/>` (`:283`) renders with nothing after it, the orphan hairline VERDICT #6 forbids, emitted by the code that claims to forbid it by construction (`:227–229`).

**Net simplification** — `controlZoneKind`, `multipleControlTabs`, `showControlSection`, `inlineControlTab` and the cross-module `dockCardinality` import collapse to one predicate: `allControlTabs.value.length > 1`. Five computeds and a module dependency for one comparison.

**Falsifier** — any shipped scene with a one-member derived set (a non-painting channel declaring a one-element `surfaces`, or one facet on a non-painting channel), or a `SURFACE_META` label case-folding equal to a `scenes.ts` label. Neither exists; either revives the arm — and m-5 and m-11 with it.

---

### M-3 · `currentLabel` is a required prop with **no live consumer**, and its comment describes a render that does not happen
**MAJOR** · `ChromeDock.vue:64, 130, 360` · confirms pass-1 M-3

`grep -n currentLabel ChromeDock.vue` → exactly three hits: the declaration (`:64`), the `sceneLabel:` argument to `dockCardinality` (`:130`), and a comment (`:360`). The `:130` read feeds `controlLabelRedundant` — **dead per M-2**. So a required member of the public contract, wired at `App.vue:8`, drives nothing.

The comment is independently false: `:359–361` claims *"the EXPANDED scene `<Select>` trigger above carries the full `{{ currentLabel }}`."* The expanded trigger (`:241–245`) renders `currentIcon`/`<Home>` and `<SelectValue />`; `SelectValue` derives its text from reka's registered selected-item text, not from this prop. There is no `{{ currentLabel }}` interpolation anywhere in the template.

**Falsifier** — a fourth `currentLabel` site, or glass-ui's `SelectValue` reading a provided `currentLabel` (checked: `dist/components/select/` provides no such thing; `SelectItem`'s only added prop is `hideIndicator`).

---

### M-4 · **NEW** — the `itemsPopupOpen` prop and its five-site round-trip rest on a **provably false** Vue mechanism claim
**MAJOR** · `ChromeDock.vue:73–78, 172` · not present in pass 1

`:73–78`:
> *"A slotted `#items` popup (the @mbabb dropdown) is open. The slot content is set up in the PARENT (App.vue), so its `useOptionalDockContext()` resolves **ABOVE this provider and cannot hold the dock open itself**; the parent surfaces the open state here so the dock's own keep-open hold (dockRef) pins it."*

Vue 3 resolves `provide`/`inject` along the **runtime component tree** (`instance.parent.provides`), not the lexical authoring scope. Forwarded slot content mounts inside `<GlassDock>`'s subtree, so its parent chain runs *through* the provider.

**Probed on both renderers**, reproducing the exact three-level shape (App authors `#items` → ChromeDock forwards it into GlassDock's default slot → GlassDock `provide`s):

```
SSR    : <div><i>sep</i><!--[--><span>GLASSDOCK_CONTEXT</span><!--]--></div>
client : <div><i>sep</i><span>GLASSDOCK_CONTEXT</span></div>
```

The injected value is the provider's, on both. `MbabbMenu`'s `useOptionalDockContext()` **does** reach `GlassDock` and **can** hold the dock open itself — via `keepOpen()/release()` on the context (`dockContext.d.ts` `DockContext`), via glass-ui's shipped `useDockHold` (`useDockHold.d.ts`, whose docblock names `useOptionalDockContext()` as its DI path), or via the sealed `<Popover trigger="hover" keep-dock-open>` union `dockContext.d.ts` documents.

**Cost of the false premise** — a prop (`:78`), a term in `isAnyOpen` (`:172`), a `v-model:open` in `MbabbMenu` (`MbabbMenu.vue:96`), a `ref` in App (`App.vue:347`), two template bindings (`App.vue:13,21`): a five-site cross-component round-trip existing only to reach a `keepOpen()` the menu can call directly.

**The file relies on the opposite mechanism one screen away.** `<DockSeparator>` (`:283, :326`) is authored in ChromeDock's template and mounted inside `<GlassDock>`; its entire orientation contract is `useOptionalDockContext()` (`DockSeparator.vue.d.ts`). If slot content injected lexically, that would be broken too. The file cannot be right both times.

**Falsifier** — a Vue version or configuration in which forwarded slot content injects from its lexical owner rather than its render-tree parent; re-running the probe at the repo's `vue@^3.5.35` settles it in one command. Or a `MbabbMenu` constraint forbidding `useDockHold`.

**Severity note** — MAJOR, not BLOCKER: current behaviour is correct. The defect is unnecessary coupling justified by a wrong fact, which is exactly how coupling survives the next refactor.

---

### M-5 · The re-expand watchdog defends against a collapse path the **installed** primitive does not have
**MAJOR** · `ChromeDock.vue:188–202` (with `161–163`) · confirms pass-1 M-5

Stated rationale, `:190–194`: *"`keepOpen()` blocks the idle-TIMER collapse, but the dock's document-pointerdown path **can still force a collapse** … **bypassing the hold counter**."*

Installed 7.0.0 `useDockState` (`dist/dock.js`, the `Ie(…)` body) says the opposite. The hold counter is `p = G(0)`, `isHeld` is `O(() => p.value > 0)`:

```js
function P(){ p.value++; S(); }                                   // keepOpen
function F(){ p.value = Math.max(0, p.value - 1); … }             // release
function I(e){ if (c() || p.value > 0 || a?.value) return;        // document pointerdown — BAILS ON HOLD
              let t = n.value;
              !t || t.contains(e.target) || Fe(e.target, o) || E(); }   // E() = collapse
```

`p.value > 0` short-circuits **before** any target test. Every other collapse route is guarded identically — idle scheduler `T` (`c() || p.value > 0 || …`), mouseleave `A` (`if (p.value > 0) return`), focusout `M` (`|| p.value > 0`). The only unguarded routes are imperative `collapse()` and the `alwaysExpanded` watch arm; ChromeDock invokes neither and passes no `always-expanded` (`:224` binds only `collapse-delay`, `start-collapsed`, `fit-content`). `useDockState.d.ts` states it outright: *"keepOpen/release ref-counting prevents **both** timer-based collapse **and** click-away dismissal."* While the `watch(isAnyOpen)` hold is applied, **no collapse is reachable** — `:197–202` is dead defensive code.

Same class as lane-frontend **S-1** (KfPillTabs forked over a 4.0.1 ARIA bug fixed in the installed 7.0.0): a workaround whose cited cause is stale by several majors, still carrying its justification prose. **No contradiction with the lane** — a second instance of the pattern, in a different file. B-1 is why it went unnoticed: the comment was written against a glass-ui the lockfile cannot name.

**Compounding** — it is a **second `watch` on the identical source** as `:161`. Were the watchdog ever to fire, the ordering is watcher-1 writes `controlsPaneHover.value = false` → watcher-2 calls `expand()` → `expanded` flips true → watcher-1 writes `true`: the injected `CONTROLS_PANE_HOVER_KEY` ref (`App.vue:174`, "Dock hover → controls pane opacity") round-trips `true → false → true` in one flush. Two watchers over one source that write and read overlapping state is a merge waiting to happen; one watcher with both effects, ordered, is the correct shape.
*Sub-notes:* (a) watcher-1 writes the dock's **expanded** state into a ref named **hover** — the dock expands on hover, focus-in, pin-click and programmatic `expand()`; three of four are not hover. (b) Neither watcher is `immediate`, so the mount-tick sync is skipped; this is invisible only because `start-collapsed` is `true` (`:224`) and `App.vue:174` seeds `false` — two independent defaults that happen to agree.

**Falsifier** — any collapse path in the installed 7.0.0 that sets `state = "collapsed"` while `p.value > 0`. I enumerated `T, A, M, I, N, D, E` in the `Ie(…)` body; produce one I missed and this dies. *(The flicker half is source-derived, not observed — **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.)*

---

## MINOR

**m-1 · Asymmetric icon-lookup posture** — `:292` indexes `TAB_ICONS` unguarded; `:299` and `:313` guard (`v-if="tab.icon && TAB_ICONS[tab.icon]"`). *Pass-2 addition — the type-level proof:* under the repo's `noUncheckedIndexedAccess`, the `:292` expression is `Component | undefined`, confirmed by probe against the real modules — `error TS2322: Type 'Component | undefined' is not assignable to type 'Component'`. The `?? 'SlidersHorizontal'` fallback covers a missing `icon` **field**, not a missing **registry entry**, and `:292` is the *trigger* — the one glyph visible when the dropdown is shut. `TAB_ICONS` is total over today's `SURFACE_META` by coincidence (5 keys covering 6 entries), not by type. Fix: `icon?: keyof typeof TAB_ICONS`, which also turns M-1's fork into a compile error. **Falsifier** — a type- or test-level binding making every `SURFACE_META.icon` provably a `TAB_ICONS` key; none exists.

**m-2 · `dockCardinality({ channels: [] })` — a dead argument to a conflated signature** — `:127–131` passes `channels: []` and discards `channelZone`. `TransportDock.vue:357` is the exact mirror (`tabs: []`, reads `channelZone`). Each caller uses half the function; neither supplies both axes. The shared *module* is real; the shared *call* is fictional. **Falsifier** — a caller reading both zones from one invocation.

**m-3 · Root-barrel import for `Select*` while `/dock` and `/status-dot` use subpaths** — `:22–28`. `./select` **exists** in the exports map (73 subpaths; `./dock`, `./select`, `./status-dot` all present). One file, two granularities; the root barrel is the widest and least tree-shakeable surface available, under a dependency that is not even declared (B-1). **Falsifier** — `./select` not re-exporting all five symbols.

**m-4 · The nav `<DockSeparator />` is unconditional while every other separator is zone-gated** — `:326` sits outside any `v-if`; the section separator (`:283`) is correctly inside `v-if="showControlSection"`. The header claims the invariant (`:227–229`, *"separators derive from INHABITED zones by construction"*). When `hasControlPanel` is false — reachable on home and sequence — the nav zone holds only `<slot name="items" />` (`:344`, no fallback, `$slots` never checked). A host leaving it empty renders a trailing hairline with nothing after it: VERDICT #6's superfluous divider, from the model built to elide it. The props doc contemplates such hosts (`:69–70`); `App.vue:19–25` always fills the slot, so latent, not live. Fix: `v-if="hasControlPanel || $slots.items"`. **Falsifier** — a contract making `#items` mandatory.

**m-5 · `aria-label` on a bare `<div>` is inert** — `:307–311`. An accessible name on `role="generic"` is dropped by AT. It also duplicates the `aria-label` on the `DockTrigger` (`:291`) it alternates with. Dead today (M-2); live the moment the inline arm returns. **Falsifier** — an AT exposing `aria-label` on a nameless generic element. *(AT observation UNPROVEN-NEEDS-LIVE; the source fact — no `role` — is static.)*

**m-6 · `[&>span]:line-clamp-none` reaches into `DockTrigger`'s internal DOM** — `:241, :291`. An arbitrary variant targeting a `<span>` that `DockTrigger` renders internally. `DockTrigger.vue.d.ts` publishes only `for` and `class`; the inner structure is unversioned, so this fails silently if the primitive changes its inner element. Same soft-coupling class as lane-frontend §3.4's CSS reach-around. **Falsifier** — glass-ui documenting `> span` as a stable seam.

**m-7 · The mobile breakpoint is a hand-copied literal, undocumented at this site** — `:148` `useMediaQuery("(max-width: 1023px)")`. Measured: three JS copies (`ChromeDock.vue:148`, `useControlsLayout.ts:48`, `ControlsPaneWrapper.vue:254`) atop CSS copies at `CubeScene.vue:265`, `SequenceAxis.vue:43`, `EditorStartScreen.vue:117,182`. The other two JS sites annotate the shared boundary (`useControlsLayout.ts:56` and `ControlsPaneWrapper.vue:253` both say "the SAME 1023px"); this one does not, and no shared token exists. **Falsifier** — a `--breakpoint-*` token or exported constant these sites share.

**m-8 · `String(...)` coercion at the emit boundary hides type failures** — `:239, :289`. The emit is typed `(e:"switchScene", id: string)`; the coercion turns a non-string reka `AcceptableValue` into `"[object Object]"` and emits it as a scene id rather than failing. A `typeof === "string"` guard (or a branded `SceneId`) surfaces the bug instead of laundering it. **Falsifier** — reka's payload proven non-string here, making the coercion load-bearing.

**m-9 · `allControlTabs.find(...)` inline in the template** — `:292`. An O(n) scan re-run on every render of that subtree, duplicating a `selectedControl → tab` resolution that belongs beside `inlineControlTab` as a computed. n ≤ 4, so hygiene, not perf. **Falsifier** — none needed; the claim is about placement.

**m-10 · `:start-collapsed="true"` restates the primitive's own default** — `:224` vs `useDockShellProps.d.ts` (*"Start in the collapsed state (**default true**)"*). Harmless, but it pins a default the primitive owns. (`:collapse-delay="2500"` *is* a genuine override — the primitive defaults to 2000 — but it diverges from `TransportDock`, which takes the default: two docks, two idle timings, no shared token.) **Falsifier** — a contract requiring the explicit pin.

**m-11 · `--dock-label-padding-inline` is a phantom custom property, and its rationale names a retired primitive** — `:381`. Repo-wide grep (source, styles, **and** `node_modules`) returns exactly one hit: this line. The rule always resolves to the hardcoded `0.5rem`, so `:375–376`'s claim that it *"reads at the same inline height + padding a `DockSelectTrigger` occupies"* is false twice: (a) glass-ui's real token is `--dock-trigger-padding-inline` (`dist/components/dock/styles/density.css` — `0.4375rem` sm / `0.5rem` md / `0.625rem` lg / `1rem` xl, each `× var(--dock-scale)`), so `0.5rem` matches only md at scale 1; (b) **`DockSelectTrigger` does not exist in 7.0.0** — `dist/components/dock/index.d.ts` exports `GlassDock, DockLayerGroup, DockLayer, DockCrossfade, DockControl, DockTrigger, DockBackgroundToggle, DockSeparator`. MINOR only because the block is unreachable (M-2); MAJOR the day the inline arm returns. **Falsifier** — the token appearing in a CSS layer the grep missed.

**m-12 · NEW · `:model-value="selectedControl ?? 'controls'"` hardcodes a member the rendered set need not contain** — `:286`. `controls` is guaranteed present only when the built-in triad is. The prop is optional (`:66`) and the file documents non-App hosts (`:69–70`); for any host whose set is ≥2 tabs without `controls`, reka receives a `modelValue` matching no `SelectItem` and `<SelectValue/>` (`:293`) renders empty — an icon with no label. The set-derived fallback is one expression away: `allControlTabs[0]?.value`. **Falsifier** — a rule that `selectedControl` is always supplied *and* always a member; `App.vue:272–276` supplies it, but the prop's optionality and the non-App-host contract deny the rule.

**m-13 · NEW · Intra-file render asymmetries between the two `SelectContent` lists** — same file, same construct, two shapes. **Row order:** scene list `[StatusDot, icon, label]` (`:250–252`) vs controls list `[icon, StatusDot, label]` (`:299–301`) — the status marker changes column between two dropdowns in one dock. **Missing fallback:** the scene trigger (`:242–243`) and the collapsed slot (`:364–365`) both carry `<Home v-else>`; the scene *list item* (`:265`) has `v-if="scene.icon"` and **no** `v-else`, so an icon-less descriptor — which `:62`'s `icon?: Component` explicitly admits — shows a Home glyph on the trigger and no glyph in the list, for the same scene. Unreachable today: all six `scenes.ts` descriptors carry an icon (`:139–183`). **Falsifier** — a spec prescribing the differing orders; or making `icon` required, which retires the second half. *(Visual consequence UNPROVEN-NEEDS-LIVE; the source asymmetry is static.)*

---

## INFO (recorded, not charged)

**i-1 · Comment archaeology.** ~110 of 385 lines are prose, much naming code that is not present (`:13` the deleted `dockZones.ts`; `:122` the deleted K.W4 else-branch; `:109` the dead `hasSelectedAnimation` clause) and versions the tree has passed (`:220` "glass-ui's rebuilt 3.3.0 dock"; `:348` "on glass-ui 4.0.0" — installed is 7.0.0). M-2, M-3, M-4 and m-11 are each a case of prose outliving fact; the density is the mechanism. A comment asserting a false fact is worse than none — it is what stops the next reader deleting the dead code beneath it.

**i-2 · The unpaired `release()` is safe, by an undocumented clamp.** `watch(isAnyOpen, …)` (`:204–209`) is not `immediate`, so a mount with `itemsPopupOpen === true` never calls `keepOpen()`, yet the eventual close calls `release()`. `useDockState.d.ts` promises only *"Decrement hold ref-count"*; the implementation clamps — `p.value = Math.max(0, p.value - 1)`. No underflow. Recorded because the component relies on an implementation detail the type contract does not guarantee. **Not charged** — read as a bug on first pass, killed by the clamp.

**i-3 · Zero direct engine consumption — correct delegation, thin coverage.** ChromeDock imports nothing from `@mkbabb/keyframes.js` / `@kf-engine`. All its motion is delegated to `GlassDock`'s `useDockSpring`/`useDockMorph`, which run on keyframes.js `SpringProgress` through the vite self-alias (B-1). That is *correct delegation*, not misuse — but the demo's most-visible chrome contributes no direct engine coverage, and the dock's spring path is exercised only transitively, over an edge held by a bundler alias rather than a declared dependency.

---

## SUPERLATIVES (L-18 running the other way)

**S★-1 · Zero teardown surface, by construction.** Whole file. Every side effect is a `watch()` created during `setup` (`:161, :197, :204` — auto-stopped on unmount) plus one VueUse `useMediaQuery` (`:148`, VueUse-owned cleanup). No `addEventListener`, `setTimeout`, `setInterval`, `requestAnimationFrame`, `ResizeObserver`, `IntersectionObserver`, `MutationObserver` anywhere — verified by grep. For a component driving an imperative child API across a package boundary and injecting a shared mutable ref, a zero-manual-teardown footprint is the right answer and the rarer one. **Falsifier** — any manually-registered subscription, or a `watch` created inside a callback rather than at setup scope (which would escape the effect scope). Neither exists.

**S★-2 · The popup mutex is a derived model, not an imperative latch.** `:166–186`. Mutual exclusion follows from the state's **type** — `openPopup: Ref<PopupKey | null>` can physically hold one key — rather than from cross-clearing code. `popupModel(key)` returns a `WritableComputedRef` with total get/set, and the close arm guards `openPopup.value === key`, so a *losing* popup's late close cannot null out the winner — the classic race here, since reka fires the outgoing menu's close after the incoming menu's open. Two dropdowns, one source of truth, no watcher between them, no `nextTick`, no reentrancy window; generalises to N without edit. It is also genuinely necessary, not ceremonial: glass-ui's `Select` is a bare `SelectRootProps` passthrough with no `keepDockOpen` (`Select.vue.d.ts`), and `SelectContent` carries no `data-glass-dock-portal`/`data-glass-dock-owner` stamp, so `isTeleportedTarget` cannot scope the portalled menu for click-away. **Falsifier** — a sequence where both models read `true`, or a stale close clearing an unrelated key; the single-slot ref forecloses the first, the `=== key` guard the second.

**S★-3 · kf-CONSUME discipline — the consumer shrank, the primitive was not patched.** `:347–366`. When glass-ui 4.0.0 necked the collapsed dock to a perfect circle and the three-part chip clipped its label ("Cube" → "Cub"), the resolution was to make the `#collapsed` slot content icon-forward — *"a kf-CONSUME fit (no GlassDock patch) — the slot content shrinks to what the circle holds."* Adapting the consumer to the primitive's contract is the correct direction across a repo boundary, and the exact inverse of lane-frontend S-1's failure (KfPillTabs forked the primitive over a bug, then rotted three majors behind it). It survived two glass-ui majors intact — the strongest available evidence the direction was right. **Falsifier** — a glass-ui slot/prop that already solved the circle-clip; `GlassDock.vue.d.ts`'s slot set (`persistent`, `default`, `collapsed`, `search`, `persistent-end`) offers no label-fitting affordance.

**S★-4 · The layout tether is an explicit opt-in attribute, not a selector on a utility class.** `:214` `data-dock-tether="top"` against `styles/layout.css:148–170`, which states the rule and the reason: *"keys on an EXPLICIT `[data-dock-tether]` opt-in attribute … NOT a `:has()` test on a generic `.z-dock` utility class (`proof:brittleness` forbids keying layout on a `z-*` or `pointer-events-*` utility class)."* ChromeDock declares `"top"`, `TransportDock.vue:4` declares `"bottom"`; the anchor-positioning block binds to the declared marker rather than incidental class soup. **Falsifier** — a third tethered band not declaring the attribute, or a `:has()`/utility fallback in the same `@supports` block. Neither present.

**S★-5 · NEW · The control-zone separator is elided by construction, not by a second predicate.** `:282–283` places `<DockSeparator/>` **inside** `<template v-if="showControlSection">`. The separator cannot outlive the zone it demarcates — no `v-if` restating the condition, no orphan-hairline class of bug for this zone, ever. This is the correct structural expression of "separators derive from inhabited zones," and it is precisely what makes m-4's unconditional twin at `:326` legible as the outlier rather than the norm — the same file getting it right and wrong 43 lines apart. **Falsifier** — a render in which the control-zone separator appears without a control node; structurally impossible in this template.

**S★-6 · NEW · The scene glyph is single-sourced onto the descriptor at all three render sites.** `:242`, `:265`, `:364` all render `<component :is="…icon">` off the descriptor (`:62`, `scenes.ts`), and `:83–85` derives the active glyph by lookup rather than by a parallel map. `:33–38` records what this replaced — a string-keyed `Record` of imported image URLs, the D8 drift root cause — and the replacement is better on two axes: one source of truth, and inline SVG inheriting `currentColor`, which an `<img :src>` structurally cannot. Zero drift surface remains. **Tempered:** the *fallback* is not equally single-sourced — `:243` and `:365` carry `<Home v-else>`, `:265` does not (m-13). The binding is exemplary; the fallback rule is two-thirds applied.

**S★-7 · NEW · An absent DFA projection degrades to the full triad — total, never partial.** `:95–101`. When `controlSurfaces` is absent the fallback is the **complete** built-in set, never `undefined` and never a subset, so a missing prop degrades to "show everything built-in" rather than to a half-populated or empty control zone — the right direction for chrome. `:111–113` records the failure this replaced: the former `hasSelectedAnimation` AND-clause keyed the affordance on a post-mount fact, so the trigger *vanished* for the cross-scene mount window. **Falsifier** — a host for which the full triad is actively wrong (it would render a collapse toggle for a panel with nothing to show); none exists, and the conservative direction remains the defensible one.

---

## Repair order (dependency-respecting)

1. **B-1** — declare `@mkbabb/glass-ui: 7.0.0`, regenerate the lock. Nothing below is reproducible until `npm ci` works (lane-frontend §10 item 1 concurs). It is also what let M-5's rationale go stale unnoticed.
2. **B-2** — add `vue-tsc` and put `.vue` under a CI gate. The `:128` TS2322 lands red immediately; without the gate every repair below regresses silently.
3. **M-1** — collapse `demo/components/instrument/surfaceTabs.ts` into `@state/controlSurfaces` (delete the duplicate; repoint `ChromeDock.vue:18–21` and `TransportDock.vue:237`). Import `ControlSurfaceTab` instead of restating it at `:49` and `:72` — this is also the fix for B-2's error and for m-1. Land before M-2 so the cardinality edit happens once.
4. **M-2 + M-3 + m-2 + m-5 + m-11 together** — decide the inline arm: revive it with a real one-surface scene, or delete `inlineControlTab`, the `v-else-if` block, the `.dock-inline-tab` style, the `sceneLabel`/`channels` arguments and the `currentLabel` prop (plus `App.vue:8`). Collapse the five computeds to `allControlTabs.length > 1`. Rewrite the four false comments either way.
5. **M-5** — delete the re-expand watchdog; fold the `controlsPaneHover` write into a single watcher. Re-verify against the glass-ui pinned by step 1.
6. **M-4** — compose `useDockHold` (or `useOptionalDockContext().keepOpen/release`) in `MbabbMenu`; retire the `itemsPopupOpen` prop, the `App.vue` ref and both bindings.
7. **m-1, m-3, m-4, m-6..m-10, m-12, m-13** — independently landable hygiene.
8. **~~Pass-1 M-4 (`ComponentExposed<>`)~~ — DO NOT LAND.** Retracted in §0; the annotation at `:158` is correct as written.

## Provenance

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy installed in the target tree — so no upgrade is presupposed by any repair. `/Users/mkbabb/Programming/glass-ui` was not read. No file in keyframes.js was written, mutated, or executed; no installs, no dev servers, no browser tooling.

Four probes ran, all in the session scratchpad, all against the target tree's **unmodified** `node_modules` via `paths` mapping (never copies, never repointed imports — the flaw that produced pass-1 M-4):
1. `InstanceType<typeof GlassDock>` `IsAny` + exposed-member probe, with three live-harness controls → §0 retraction.
2. Verbatim extraction of script block 2–209, repo compiler + repo compiler options → B-2's TS2322 at `:128`, plus an isolation probe narrowing the cause to the `value: string` widening.
3. `tsc --noEmit --listFilesOnly -p tsconfig.json` over the real repo (read-only, emits nothing) → 126 demo files, 0 `.vue`.
4. Vue `provide`/`inject` through a three-level forwarded slot, SSR **and** client (jsdom) → M-4.
