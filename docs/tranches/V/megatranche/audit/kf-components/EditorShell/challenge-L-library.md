claude-opus-5[1m]

# CHALLENGE · EditorShell · axis L (LIBRARY)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorShell.vue` (261 lines: 110 template · 86 script · 62 style)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise — but every claim below carries its own falsifier, and seven candidate defects were **killed in flight** and are recorded in §4 so the next lane does not re-raise them.

**Import graph read whole (read-only):**

| file | lines | read |
|---|---|---|
| `demo/components/instrument/shell/EditorShell.vue` | 261 | ✓ |
| `demo/components/instrument/utils/iosTextEntry.ts` | 18 | ✓ |
| `demo/components/instrument/shell/SharePopover.vue` | 62 | ✓ |
| `demo/components/instrument/shell/EditorStartScreen.vue` | 191 | ✓ |
| `demo/components/instrument/shell/KeyboardShortcutsModal.vue` | 69 | ✓ |
| `demo/components/instrument/transport/AnimationControlsGroup.vue` | 336 | ✓ |
| `demo/components/instrument/transport/transportSource.ts` | 33 | ✓ |
| `demo/styles/style.css` (+ `layout.css`, `design-idioms.css` probes) | 294 | ✓ |
| `@mkbabb/glass-ui/header-ribbon` → `dist/header-ribbon.js`, `dist/components/header-ribbon/{types,HeaderRibbon.vue}.d.ts`, `dist/components/header-ribbon/styles.css` | — | ✓ |
| `@mkbabb/glass-ui/keyboard` → `dist/keyboard.js`, `dist/composables/keyboard/useKeyboardShortcuts.d.ts` | — | ✓ |
| `@mkbabb/glass-ui/tabs` (type-only), `/tooltip`, `/dark-mode-toggle`, root barrel | — | ✓ |
| `@mkbabb/keyframes.js` → `src/animation/group/group.ts:42` (type-only) | — | ✓ |
| consumer: `demo/app/App.vue` (387), `demo/app/main.ts` (65) | — | ✓ |
| producer evidence: `/Users/mkbabb/Programming/glass-ui/src/components/header-ribbon/*`, `docs/consumer-evidence/header-ribbon.md`, `dist/header-ribbon.js` | — | ✓ |

**Hitherto corpus folded:** `formation/keyframes/lane-frontend.md` **F-1** (glass-ui phantom dependency, RED) and **S-2** (type-only `/tabs` consumption; `EditorShell.vue:126` is one of its three cited sites). L-2 below is the *first measured consequence* of F-1 — not a re-discovery. No contradiction of the census was found; §4 C-2 refines its §6.3 token census (`--graph-*` lives in `layout.css`, not `design-idioms.css`).

---

## 0. Headline

| # | Finding | Severity |
|---|---|---|
| **L-1** | The three primary header controls (Share · Shortcuts · Dark-mode) render `inert` + `aria-hidden="true"` + zero-width by default, and EditorShell binds no `#anchor` — leaving **no keyboard route and no touch route** to any of them. | **BLOCKER** |
| **L-2** | Two structurally different `HeaderRibbon` components both ship as `@mkbabb/glass-ui@7.0.0`; with glass-ui absent from `package.json` **and** `package-lock.json`, which one a build gets is unpinned. EditorShell is the only file in the tree that can tell them apart. | **BLOCKER** |
| **L-3** | `mode="persistent"` (`:16`) is a prop **deleted clean-break** from the contract. It is not typed, not read, and lands as a stray DOM attribute on a `role="toolbar"` div. | MAJOR |
| **L-4** | **No script and no CI job type-checks this file.** `npm run check` is `tsc --noEmit`; `tsc` cannot read `.vue`. `vue-tsc` appears nowhere in the repo. The demo job is nightly + explicitly non-blocking. | MAJOR |
| **L-5** | Dead template ref + dead `defineExpose` (`:187`, `:197`) — zero readers repo-wide; independently corroborated by the producer's own consumer-evidence doc. | MINOR |
| **L-6** | `const props = withDefaults(…)` (`:135`) — the binding is never read. Sole occurrence of the identifier in the file. | MINOR |
| **L-7** | `#header-left` / `#header-right` are unbound extension points, and `#header-right`'s default is an all-or-nothing bundle: filling it silently drops dark-mode **and** the shortcuts trigger. | MINOR |
| **L-8** | The "standalone playground host" that justifies five of this file's defaults **does not exist**. | MINOR |
| **L-9** | `:key="superKey"` (`:76`) is a compensating full-subtree remount for a non-reactive store read in the child. App.vue already demonstrates the reactive idiom — two idioms for one fact. | MINOR |
| **L-10** | Comment/tree drift inside a gate-exit rationale (`:229–246`): wrong owning file + two wrong token values. | MINOR |
| **L-11** | `initIOSPlatformClass()` (`:133`) — app-bootstrap document mutation executed in a leaf component's `setup()`. | INFO |
| **L-12** | Hidden ambient `TooltipProvider` requirement; the child self-provides, the shell does not. The last commit in this area paid for exactly this class of bug. | INFO |
| **L-13** | `AnimationGroup<any>` (`:137`) erases the `V extends Vars` bound on a pure pass-through prop. | INFO |
| **S-1..S-5** | Five superlatives — L-18 runs both ways. See §3. | — |

**Defects: 13 · Blockers: 2 · Superlatives: 5 · Cleared-in-flight: 7**

---

## 1. Blockers

### L-1 · The header ribbon's actions are inert, aria-hidden, and zero-width by default — and EditorShell supplies no affordance to open them — **BLOCKER**

EditorShell mounts three primary controls inside `HeaderRibbon`'s `#items` slot and binds **no `#anchor`**:

```
EditorShell.vue:16   <HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">
EditorShell.vue:17       <template #items>
EditorShell.vue:18           <slot name="header-left"></slot>
EditorShell.vue:19           <slot name="header-right">
EditorShell.vue:20               <SharePopover />
EditorShell.vue:32                 <Button … @click="shortcutsOpen = true">   ← the F.W15.S3 "VISIBLE" trigger
EditorShell.vue:44               <DarkModeToggle … />
EditorShell.vue:50   </HeaderRibbon>
```

The installed artifact renders those items behind a hover/pin disclosure. From the render function of `node_modules/@mkbabb/glass-ui/dist/header-ribbon.js`:

```js
w = n(() => x.value || S.value || C.value)        // expanded = pinned || hovered || focus-within
function T(e) { e.pointerType !== "touch" && (S.value = !0) }   // ← touch hover deliberately suppressed
…
i("div", { class: "header-ribbon__anchor", … onClick: k },
  [u(n.$slots, "anchor", { pinned: x.value })], 512),
i("div", { class: "header-ribbon__actions", …
   inert: !w.value || void 0,                      // ← inert when collapsed
   "aria-hidden": !w.value                         // ← removed from the a11y tree
}, [u(n.$slots, "items")], 8, _)
```

and from `dist/components/header-ribbon/styles.css`:

```css
.header-ribbon__anchor { display: grid; flex: none; place-items: center; }         /* no min-size */
.header-ribbon:not([data-expanded]) .header-ribbon__actions {
    max-inline-size: 0; opacity: 0; pointer-events: none;
}
@media (pointer: coarse) { .header-ribbon { padding: .75rem } … }                  /* padding only */
```

**The deduction (mechanism, not a screenshot):**

1. Initial state is `pinned=false, hovered=false, focusWithin=false` ⇒ `expanded=false` ⇒ the actions container is `inert`, `aria-hidden="true"`, `max-inline-size:0`, `opacity:0`, `pointer-events:none`.
2. `inert` makes every descendant unfocusable ⇒ `focusin` — the *only* non-pointer expansion route — **can never fire**. The expansion condition is unreachable from the keyboard.
3. The `Escape` handler `A()` focuses the first action, but `onKeydown` is bound to the ribbon root, which requires focus already inside it. Circular.
4. Touch hover is explicitly discarded (`pointerType !== "touch"`).
5. The only remaining target is the anchor's `onClick` — but EditorShell binds nothing to `#anchor`, so `.header-ribbon__anchor` is an **empty grid box with no intrinsic size**. There is no hit target to tap.

Net: mouse hover over the small empty band is the *sole* route to Share, Keyboard-shortcuts, and Dark-mode. Keyboard-only users and touch users have none. That is a WCAG 2.1.1 (Keyboard) failure on three controls, plus `aria-hidden` on all three by default.

The file's own `F.W15.S3` comment (`:21–29`) states the shortcuts Button is "the **VISIBLE** shortcuts-discovery trigger" that "breaks the discoverability paradox with one control". The tree falsifies that sentence: `opacity:0; max-inline-size:0; inert; aria-hidden`.

**Falsifiers (any one kills or downgrades this claim):**
- *A demo-side override forcing expansion.* Killed: `grep -rn "header-ribbon" demo/` returns exactly one line — the import at `EditorShell.vue:116`. Zero demo CSS touches the component.
- *Some consumer binds `#anchor`.* Killed: EditorShell declares 8 slots (`:10,18,19,61,89,93,97,101`), none named `anchor`, and never forwards one to `HeaderRibbon`. App.vue binds `#backdrop`(`:45`), `#start-screen`(`:49`), `#tabs-trigger`(`:53`), `#tabs-content`(`:61`), `#ribbon-content`(`:65`), `#target`(`:73`) — no anchor, and no `#header-*`.
- *`inert` is unsupported in the target browser.* Downgrades the a11y half only; `max-inline-size:0` + `opacity:0` + `pointer-events:none` still hold, so the controls remain invisible and unclickable.
- *The 7.0.0 you actually install has no disclosure machinery.* **TRUE of the producer's 7.0.0 source** — which is exactly L-2, and why this is nondeterministic rather than merely broken.

**UNPROVEN-NEEDS-LIVE:** the rendered pixel size of the collapsed band and whether any residual hit area exists. The `inert` / `aria-hidden` / `max-inline-size:0` facts are static-provable from the render function and the shipped stylesheet and need no browser.

---

### L-2 · Two different components ship as `@mkbabb/glass-ui@7.0.0`; nothing pins which one this file builds against — **BLOCKER** (the first measured bite of census F-1)

| | installed (what `npm run dev` / `gh-pages` compiles today) | producer (`/Users/mkbabb/Programming/glass-ui`) |
|---|---|---|
| version string | `node_modules/@mkbabb/glass-ui/package.json` → **7.0.0** | `package.json` → **7.0.0** |
| dir mtime | `Jul 16 05:17` | — |
| `#anchor` slot | **yes** (`dist/components/header-ribbon/HeaderRibbon.vue.d.ts`: `anchor?: (props: { pinned: boolean }) => any`) | **no** (`src/…/HeaderRibbon.vue`: `defineSlots<{ items?(): unknown }>()`) |
| disclosure / pin / `inert` / `aria-hidden` | **yes** (render fn, quoted above) | **none** — flat `<div class="header-ribbon__actions"><slot name="items"/></div>` |
| `grep -c "inert\|anchor" dist/header-ribbon.js` | ≥1 | **0** |
| `cmp` installed vs producer `dist/header-ribbon.js` | **DIFFERENT** | |

The producer's own README settles the intended contract:

> `src/components/header-ribbon/README.md:14–16` — "The single public slot is `items`. **There is no disclosure mode, anchor button, or reveal gesture — the band is expanded and operable from first paint.**"

And there is no pin anywhere:

```
$ grep -c "glass-ui" package.json package-lock.json
package.json:0
package-lock.json:0
```

So the demo compiles against an artifact that (a) cannot be reconstructed by `npm ci`, (b) contradicts the producer's stated 7.0.0 contract, and (c) inverts the reachability of three controls. Census F-1 called `npm ci` unreproducible; this is the first place the *behavioral* cost has been measured, and it lands on EditorShell — the tree's **only** `HeaderRibbon` consumer (`grep -rn "HeaderRibbon" demo/` → 5 hits, all in this file).

Note the producer's own sweep asserts the opposite outcome for this exact file:

> `docs/consumer-evidence/header-ribbon.md` — "The one code consumer (keyframes `EditorShell`) is `persistent`/`right`/`#items` and survives the flatten with **zero behavior change**."

That is true against the *published flatten* and false against the *artifact on disk*. Both parties reasoned correctly about a version string that names two different components.

**Falsifier:** install `@mkbabb/glass-ui@7.0.0` from the registry into a clean tree and `grep dist/header-ribbon.js` for `inert`. A hit means the installed copy **is** the published 7.0.0 — L-1 becomes unconditional and this finding becomes purely a supply-chain defect. A miss means the on-disk copy is a stale pre-cut build — L-1 is a working-tree-only defect and **this** finding is the whole bug. Either branch leaves at least one blocker standing; the two cannot both be discharged.

---

## 2. Major / Minor / Info

### L-3 · `mode="persistent"` is a deleted prop — **MAJOR**

`EditorShell.vue:16` passes `mode="persistent"`. `HeaderRibbonProps` has three members in **both** artifacts:

```ts
// installed dist/components/header-ribbon/types.d.ts  ==  producer src/components/header-ribbon/types.ts
export interface HeaderRibbonProps {
    placement?: HeaderRibbonPlacement;  // "left" | "right"
    ariaLabel?: string;
    class?: HTMLAttributes["class"];
}
```

The producer's consumer-evidence doc records the removal explicitly: "*The `collapsible` mode, the `anchor` slot, **`mode`**, `anchorLabel`, `HeaderRibbonMode` … are **DELETED clean-break** (no alias)*".

Because both builds do `inheritAttrs: false` + `v-bind="useAttrs()"` on the root (installed: `mergeProps(useAttrs(), {…})`; producer: `fixedHostAttrs(attrs)`, which filters only `as`/`asChild`/`as-child`), `mode` is **not dropped** — it renders as a literal `mode="persistent"` attribute on the `<div role="toolbar">`. It is an invalid attribute on a `div`, and it buys nothing.

The word choice is the tell: `persistent` is precisely the behavior L-1 shows the component does not have. This is a consumer written against a contract that no longer exists, silently degraded — the exact failure mode a version pin exists to prevent.

**Falsifier:** find `mode` in `HeaderRibbonProps` in any artifact the demo can resolve. Both were read; neither has it.

---

### L-4 · Nothing in the repo type-checks this file — **MAJOR**

```json
"check":      "tsc --noEmit && tsc --noEmit -p tsconfig.test.json",
"check:lib":  "tsc --noEmit -p tsconfig.lib.json",
"gh-pages":   "vite build --mode gh-pages",
"lint":       "depcruise src"
```

- `tsc` cannot parse `.vue` files. `tsconfig.json` `include: ["src/","demo/"]` therefore admits the demo's `.ts` and **not one line** of any `.vue` SFC.
- `vue-tsc` / `@vue/language-tools` appear **nowhere** — not in `package.json`, not in `.github/`, not in `scripts/`.
- The blocking CI job runs `check:lib` (`ci.yml:41–42`), i.e. `tsconfig.lib.json`, which includes only `src/`.
- The demo job is gated `if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'` (`ci.yml:50–55`) and its own header says "*a scheduled red is recorded for deploy ancestry; **it does not block library merges***".
- `vite build` transpiles; it does not type-check. `lint` is `depcruise src` — the demo is not linted either.

So the 86-line `<script setup lang="ts">` and the 110-line typed template of this file are outside every gate in the repository. **This is the mechanism that let L-3 land and survive**: a deleted prop on a typed component is precisely what a template type-check catches, and there is no template type-check. It is also why L-5 and L-6 (dead bindings `noUnusedLocals` would surface) sit undisturbed.

**Falsifier:** any `vue-tsc` invocation in `package.json` scripts, `.github/workflows/*`, or `scripts/`. `grep -rn "vue-tsc" .github/ scripts/ package.json` → no output.

---

### L-5 · Dead template ref + dead expose — **MINOR** (independently corroborated)

```
:113  import { ref, useTemplateRef } from "vue";
:187  const headerRibbonRef = useTemplateRef<InstanceType<typeof HeaderRibbon>>("headerRibbonRef");
:197  defineExpose({ headerRibbonRef });
```

`grep -rn "headerRibbonRef" demo/` → 3 hits, all inside this file. App.vue puts **no** `ref` on `<EditorShell>` (`App.vue:28`). And `HeaderRibbon` exposes no instance API in either build (no `defineExpose` in the producer source; no expose in the installed render fn) — so even a reader would get an object with nothing on it. Three lines and one import exist to hold a value nobody can use.

The producer flagged the identical line independently: "*The sole consumer's `defineExpose({ headerRibbonRef })` (`EditorShell.vue:197`) is a **dead ref-forward** — never read, and `HeaderRibbon` exposed no instance API.*"

**Falsifier:** any `ref="…"` on `<EditorShell>` or any `.headerRibbonRef` read. Neither exists. (Note the *shape* is fine — Vue proxies the exposed object through `proxyRefs`, so a parent would read the unwrapped instance. The defect is deadness, not incorrectness.)

---

### L-6 · `const props` is never read — **MINOR**

`grep -n "\bprops\b" EditorShell.vue` → exactly one hit: `:135  const props = withDefaults(`. The template reaches props by name; the script never touches the binding. `withDefaults(defineProps<…>(), …)` without a binding is the honest form. Invisible to the toolchain because of L-4 (and `noUnusedLocals` is not set in `tsconfig.json` anyway).

**Falsifier:** any second `props` occurrence in the file.

---

### L-7 · The header slots are unbound, and the `#header-right` default is an all-or-nothing bundle — **MINOR**

`:18` `#header-left` (no fallback) and `:19` `#header-right` (fallback = SharePopover + shortcuts Button + DarkModeToggle) are declared. `grep` over the tree finds **no consumer** of either. Worse, the fallback is a single indivisible block: a host that wants to add one header item must re-supply all three, and a host that supplies its own `#header-right` **silently loses dark-mode and the shortcuts trigger** — the two controls the file's own comments (`:21–29`, `:44`) treat as load-bearing. A per-control slot, or `#header-right` composed *beside* rather than *instead of* the defaults, is the non-trapping shape.

**Falsifier:** a consumer binding `#header-left` or `#header-right`. `grep -rn "#header-left\|#header-right" demo/` → only the declarations in this file.

---

### L-8 · The "standalone playground host" does not exist — **MINOR**

Five props/defaults in this file are justified by a second host: `superKey?` optional, `hasControlSurfaces` defaulting `true` ("*a non-App host (the playground) takes the TRUE default*", `:159–161`), `extraTabs: () => []` ("*the playground's 'Assets' tab*", `:162–169`), the `#header-*` slots, and the component-level `import "@styles/style.css"` (`:131`). Five files reason about it (`EditorShell.vue`, `AnimationControlsGroup.vue`, `ChannelControls.vue:264,289,311`, `useSelectedControlSurface.ts:38`, `useAnimationGroupPlayback.ts`).

There is no playground component: `find demo -iname "*playground*"` → nothing; every `playground` hit is prose. `EditorShell` is instantiated exactly once, at `App.vue:28`. And the demo is not a published surface — `package.json` `files: ["dist", "!dist/gh-pages", "!dist/_*"]`, `exports: ["." , "./engine"]` — so no external consumer can reach `@components/instrument/shell`. This is speculative generality with a five-file comment footprint and zero call sites.

**Falsifier:** a second `<EditorShell>` instantiation anywhere in-tree, or a published entry point exposing the shell. Neither exists.

---

### L-9 · `:key="superKey"` is a compensating remount for a non-reactive store read — **MINOR**

```
EditorShell.vue:75-79   <AnimationControlsGroup :key="superKey" … :super-key="superKey" …>
```

`superKey` is passed **twice**: once as a prop and once as the reconciliation key, so every scene change tears down and rebuilds the entire transport subtree (`ControlsPaneWrapper` + `TransportDock` + `DemoGlobalChrome` + the whole `useControlsKeyboardShortcuts` registry). The key is load-bearing, not an optimization — the child reads the store **once, non-reactively**:

```
AnimationControlsGroup.vue:140  const { superKey, animationGroup, … } = defineProps<…>();
AnimationControlsGroup.vue:176  const storedControls = getStoredAnimationGroupControlOptions(superKey);
```

Without the key, a `superKey` change would leave `storedControls` pointing at the previous scene's store. App.vue already writes the reactive form of the very same expression:

```
App.vue:229  const storedControls = computed(() => getStoredAnimationGroupControlOptions(currentSuperKey.value));
```

Two idioms for one fact, in files one hop apart, with the shell paying a full-subtree remount per navigation to paper over the weaker one.

**Falsifier:** show that `getStoredAnimationGroupControlOptions` returns a store that internally re-keys on `superKey` change (then the `:key` is gratuitous, a different defect), or show a documented remount requirement independent of the store read. Neither appears in the file or its comments — `:76` carries no rationale comment at all, unusually for this file.

---

### L-10 · Comment/tree drift inside a gate-exit rationale — **MINOR**

The `.grid-background` block (`:223–237`) makes three checkable assertions; all three miss:

| assertion (`EditorShell.vue`) | tree |
|---|---|
| `:231` "all four layers reading the demo-owned `--graph-*` tokens (**design-idioms.css**)" | `demo/styles/layout.css:32–35` |
| `:234` "`--graph-major-opacity` (**12%**)" | `layout.css:35` → `11%` |
| `:246` fallback `var(--graph-major-opacity, **12%**)`, `:241` `var(--graph-opacity, **5%**)` | live values `11%` / `3%` (`layout.css:34–35`) |

This matters more than ordinary comment rot because the 12% figure is the *stated exit criterion* for a twice-deferred gate — "*deliberately resolves above the former 0.10α floor … W6-3 exits on a runtime clause, never deferred again*". The conclusion survives (11% > 10%), but the argument cites a number the tree does not have, and the reader is pointed at the wrong file to check it. (`DESIGN.md:134–135` notes a *planned* move of `--graph-opacity`/`--graph-major-opacity` out of `layout.css`; the comment describes the destination of a move that has not landed.)

**Falsifier:** any `--graph-pitch` / `--graph-major` / `--graph-opacity` / `--graph-major-opacity` declaration in `design-idioms.css`. `grep -rn -- "--graph-" demo/styles/` → all four are in `layout.css` only.

---

### L-11 · App-bootstrap document mutation inside a leaf `setup()` — **INFO**

`:133  initIOSPlatformClass();` runs `document.documentElement.classList.add("ios")` (`iosTextEntry.ts:14–18`) once **per component instantiation**, from inside `<script setup>`. It is idempotent and the shell mounts once, so there is no bug today. But `main.ts:1–9` states outright that it is "the demo's real module-graph root", and it already owns the sibling global concerns (the cascade import at `:18`, the font decode at `:45–48`, the engine warm at `:50`). A document-level, app-lifetime class stamp belongs there, not in a component that also declares itself reusable by a second host (L-8).

**Falsifier:** make `initIOSPlatformClass` non-idempotent, or mount a second `EditorShell` — either escalates this to MAJOR. Neither holds now, which is why it is INFO and not higher.

---

### L-12 · Hidden ambient `TooltipProvider` requirement — **INFO** (partly UNPROVEN)

`:30–43` renders `<Tooltip><TooltipTrigger …/><TooltipContent/></Tooltip>` with no provider in EditorShell's own tree. It resolves only because `App.vue:3` wraps everything in `<TooltipProvider>` — an ambient requirement the shell neither supplies nor documents, on a component exported through a public barrel (`shell/index.ts:1`).

The tree contains both conventions one hop apart: EditorShell's **own child** self-provides (`AnimationControlsGroup.vue:2  <TooltipProvider :delay-duration="100" …>`). And the most recent commit touching this seam is `8281638c fix(demo-shell): provide tooltip context for the routed control group` — this class of bug has already been paid for once here. The demo's own prose records the failure mode: "*they throw 'Injection Symbol(TabsRootContext) not found' at runtime*" (`CubeScene.vue:43–44`).

**UNPROVEN:** glass-ui's `createContext` ships **both** a throwing `use()` and a tolerant `useOptional()` (`dist/createContext-BhkE9mLH.js`), and the tooltip chunk is minified past the point where the choice is readable. So whether a provider-less mount throws or merely no-ops is not statically decidable from the installed artifact. **Falsifier:** read `/Users/mkbabb/Programming/glass-ui/src/components/tooltip/*` for the `use()` vs `useOptional()` call, or mount the shell without `App.vue`'s provider. If glass-ui's Tooltip uses `useOptional()`, this drops to a pure style inconsistency.

---

### L-13 · `AnimationGroup<any>` erases the `Vars` bound — **INFO**

`:137  animationGroup: AnimationGroup<any>;` — the class is declared `export class AnimationGroup<V extends Vars>` (`src/animation/group/group.ts:42`), and `Vars` is exported (`src/animation/constants/types.ts:39`). `AnimationGroup<Vars>` accepts every group the demo constructs *and* preserves assignability checking; `<any>` turns the type argument into a hole in both directions. This is a tree-wide idiom (13 sites incl. `App.vue:218`, `AnimationControlsGroup.vue:141`, `scene-facility/index.ts:72`), so EditorShell is a follower, not the origin — hence INFO. It is worth naming here because this is the **only** value the shell takes from the library under test.

**Falsifier:** show a demo call site that genuinely needs the unsound `any` (a bivariant assignment `Vars` would reject). None was found; the shell itself never reads the group at all (see S-2).

---

## 3. Superlatives — exemplary, with falsifiers (L-18 runs both ways)

### S-1 · `registerShortcut` consumed exactly right — no leak, no ceremony

```
:190  registerShortcut("?", () => { shortcutsOpen.value = !shortcutsOpen.value; }, { label: "Show shortcuts", group: "General" });
```

glass-ui's implementation self-registers scope teardown:

```js
// dist/keyboard.js
function y(e, r, i = {}) { … a.add(s), o.value++;
    let l = () => { a.delete(s) && o.value++ };
    return t() && n(l), l;          // getCurrentScope() && onScopeDispose(unregister)
}
```

Because the call sits at `<script setup>` top level, it runs **inside** the component's effect scope, so the handler is torn down with the component. No `onUnmounted`, no stored disposer, no leak. The registration also carries `label` + `group`, which is what puts it into `KeyboardShortcutsModal`'s `useRegisteredShortcuts()` listing (only labeled shortcuts survive the `labeled` filter) — the shortcut and its own documentation are registered in one call. This is the correct idiom and the file uses it without inventing a wrapper.

**Falsifier:** if `registerShortcut` returned a disposer the caller were obliged to call, or if the call had been hoisted to module scope (outside `getCurrentScope()`), this would be a leak. Neither is the case.

### S-2 · Engine consumption is a pure, type-only pass-through

The shell's **entire** contact with the library under test is `:128  import type { AnimationGroup } from "@mkbabb/keyframes.js"`. It never constructs, starts, pauses, seeks, disposes, or even reads the group — it forwards the reference down (`:77`) and forwards `playStateChange` up (`:85`, `:192–194`). For a shell that is exactly right: an engine leak cannot originate here, and there is zero misuse surface. In a demo where 68 files consume the engine, having the outermost frame hold *no* engine state is a deliberate and correct altitude choice.

**Falsifier:** any value-level `@mkbabb/keyframes.js` / `@kf-engine` import in this file. There is none — line 128 is `import type`, and `verbatimModuleSyntax: true` guarantees it is erased.

### S-3 · The `dvh` fallback covers both axes, and says why

```css
:208  @supports not (height: 100dvh) {
:211      /* A browser without `dvh` also lacks `dvw` (same spec) — supply the static
:212         `vw` width baseline alongside the height so the shell does not mis-size
:213         horizontally either. */
:212-220  .editor-shell { height:100vh; max-height:100vh; width:100vw } .grid-background { … }
```

Most `dvh` fallbacks patch height and forget width, leaving a half-corrected box. This one patches both, on both elements that use the unit, and writes down the spec fact that licenses the inference. Negative feature query, so the happy path emits nothing.

**Falsifier:** an engine that shipped `dvh` without `dvw`. They landed together in every implementation; if a counterexample exists, the fallback is merely over-broad, never wrong.

### S-4 · The `<main>` landmark correction records its own mechanism

`:67–73` explains that the landmark is "*A REAL layout box — not `display:contents`, which strips the box AND the implicit `main` role from the a11y tree*", and that `place-self-stretch` + `grid place-items-center` reproduce the prior geometry. That is the actual, frequently-missed browser behavior, and writing it at the site is what stops a well-meaning "simplify to `display:contents`" from re-landing.

**Falsifier:** the a11y half is static-true (the `display:contents` role-stripping behavior is specified and shipped). The "byte-identical layout" half is **UNPROVEN-NEEDS-LIVE** — computed-box equality against the pre-`<main>` shell root needs a measurement.

### S-5 · One rule set, two themes — the graph paper de-duplicates the dark twin

`.grid-background` (`:238–259`) derives both line tints from `--foreground` through `color-mix`, so the dark theme retints from the **same** four gradients. The comment records that this *replaced* a light data-URI and its duplicated dark twin, with "*no legacy beside the replacement — both data-URIs die*" — the standing `feedback_no_backwards_compat` posture, applied to CSS. Two tokens, four layers, zero theme forks.

**Falsifier:** a `.dark .grid-background` override anywhere. `grep -rn "grid-background" demo/` → only this file.

---

## 4. Cleared in flight — candidate defects that did **not** survive their falsifier

Recorded so the next lane does not spend the probe again. A false defect is worse than a missed one.

| id | candidate | why it died |
|---|---|---|
| **C-1** | `<Transition name="fade" appear>` (`:52`) is a dead transition name — no `.fade-*` classes in the demo. | glass-ui ships them: `dist/styles/transitions.css:1` defines `.fade-enter-active/.fade-leave-active/.fade-enter-from/.fade-leave-to` in `@layer components`, plus a `prefers-reduced-motion` clamp. Reached via `style.css:3 @import "@mkbabb/glass-ui/styles"` → `dist/styles/index.css`. **Correct delegation, not a gap.** |
| **C-2** | `class="icon-sm"` / `icon-lg` are no-ops — glass-ui only defines `--spacing-icon-*` theme bridges, which generate `w-icon-sm`, not a bare `icon-sm`. | They are demo-owned Tailwind v4 utilities: `demo/styles/design-idioms.css:96,102,108,114` → `@utility icon-xs/sm/md/lg`. |
| **C-3** | `class="scale-on-hover"` is undefined (only a comment mentions it in `design-idioms.css:40`). | glass-ui `@utility scale-on-hover` at `dist/styles/utilities/btn.css:1`, reached through the same `@import` chain. |
| **C-4** | `background-size: var(--graph-pitch) …` has no fallback ⇒ IACVT ⇒ `background-size: auto` ⇒ the tiling collapses. | `--graph-pitch: 1rem` / `--graph-major: 5rem` are defined at `demo/styles/layout.css:32–33`, imported at `style.css:15`. The *inconsistency* (opacities carry fallbacks, geometry does not) is cosmetic; the values resolve. (The wrong-file/wrong-value drift is real and is L-10.) |
| **C-5** | `registerShortcut` at `:190` leaks a global keydown handler across scene navigations. | Auto-disposed via `getCurrentScope() && onScopeDispose(…)` — see S-1. |
| **C-6** | `import "@styles/style.css"` (`:131`) duplicates `main.ts:18` — the app cascade root pulled from a leaf. | Deliberate and documented at `main.ts:16–17`: "*EditorShell.vue also imports these; Vite dedupes the shared modules, so dev and prod resolve identically.*" The *layering* smell is folded into L-8 (it exists for the phantom second host); the duplication itself is not a defect. |
| **C-7** | `defineExpose({ headerRibbonRef })` exposes a `Ref`, so a parent would need `.value` — a broken expose shape. | Vue passes the exposed object through `proxyRefs`, so a reader gets the unwrapped instance. The shape is fine; the deadness is the defect (L-5). |

---

## 5. Counts

| metric | value |
|---|---|
| target lines | 261 (template 110 · script 86 · style 62) |
| comment lines in the file | ~95 (≈36%) — dense, mostly load-bearing rationale; two blocks now contradict the tree (L-1 `F.W15.S3`, L-10 `J.W7a S4`) |
| props declared / defaulted | 9 / 7 |
| props passed by the sole consumer | 7 of 9 (`extraTabs`, and `showStartScreen` only via `isHome`) |
| slots declared / bound anywhere | 8 / 6 (`#header-left`, `#header-right` unbound — L-7) |
| glass-ui specifiers imported | **6** (`root`, `/header-ribbon`, `/keyboard`, `/dark-mode-toggle`, `/tooltip`, `/tabs` type-only) — the tree's joint-highest exposure to census F-1 |
| keyframes.js imports | 1, **type-only** (S-2) |
| instantiations in-tree | 1 (`App.vue:28`) |
| tests referencing this file or `HeaderRibbon` | **0** (`grep -rln` over `test/`) |
| CI jobs that type-check or build this file on merge | **0** (L-4) |
| module size verdict | **Goldilocks-OK.** 86 script lines, one `ref`, one shortcut, one emit adapter — no god-module risk. The bulk is prose, and the two extraction candidates (the `.grid-background` recipe → a demo idiom sheet; the header action row → its own `EditorHeaderActions.vue`) are optional, not owed. |

---

## 6. Verdict

EditorShell's **own logic** is small, correct, and leak-free: one ref, one auto-disposed shortcut, one emit adapter, a type-only engine touch (S-1, S-2). Nothing in the 86 script lines is wrong on its own terms.

Its **boundary** is where it fails. The file consumes a component whose contract it does not match (L-3), against an artifact nothing pins (L-2), with a disclosure model that renders three primary controls keyboard- and touch-unreachable (L-1) — and no gate in the repository can see any of it (L-4). The four compound: L-4 is why L-3 survived, L-3 is the fingerprint of L-2, and L-2 is why L-1 is nondeterministic instead of simply broken.

**Ordering for any remediation wave:** L-2 first (declare + lock `@mkbabb/glass-ui`; nothing below is reproducible until the artifact is pinned) → L-4 (add `vue-tsc --noEmit` over `demo/` to the blocking job; it will surface L-3 and L-6 mechanically) → L-1/L-3 together (once the artifact is known, either drop `mode` against the persistent build, or bind a real `#anchor` affordance against the collapsible one — the choice is made *by* L-2, not before it) → the L-5..L-10 cleanups, each independently landable.
