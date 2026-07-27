# CHALLENGE-L — library structure under `demo/shell/dock/ActionButton.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat was
explicitly spawned with. Declared, not inherited.

## Scope and substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD at audit time is `5c13465d`**, not the `c654824e` named in the commission — the tree moved
  under the workflow (`docs(V): M-15 — Codex abrogated; vnext/ transfers to Claude ownership`).
  `demo/shell/dock/ActionButton.vue` is untouched between the two.
- Subject: `demo/shell/dock/ActionButton.vue` (137 lines), its two consumers
  (`ActionToolbar.vue`, `layers/GenericActionBar.vue`), and the module lattice they sit in.
- Live dev server `http://localhost:9000` (Vite dev, `demo/color-picker/` root) driven read-only.

## Verdict

**DEFECTIVE.** The premise holds. This component is a demo-local re-implementation of two things the
library already owns — glass-ui's dock hold protocol and glass-ui's dock control primitive — and the
re-implementation is *wrong*, not merely redundant: it drives a **shared reference counter it does not
own** with an unbalanced acquire/release pair, and I measured it stealing another owner's hold and
collapsing the dock out from under an open action bar. Below that, the action it dispatches is a
three-hop `?.` chain through `Ref<any>` that is **structurally dead on the mobile layout**, while the
button still plays its 400 ms success animation. Two BLOCKERs, five MAJORs, four MINORs.

---

## L-1 — BLOCKER — the hand-rolled dock hold corrupts a shared ref-count it does not own

### The edge

`ActionButton.vue:55` imports the dock DI context **directly out of the design system**:

```ts
import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";
const dock = useOptionalDockContext();
```

and drives it by hand (`ActionButton.vue:81-88`):

```ts
function onHoverOpenChange(v: boolean) {
    emit("update:activeHover", v ? hoverKey : null);
    if (v) { dock?.keepOpen(); } else { dock?.release(); }
}
```

This protocol is **already a first-class prop on the very component ActionButton is wrapping.**
`node_modules/@mkbabb/glass-ui/dist/components/popover/Popover.vue.d.ts:16`:

```ts
/** Hold an ancestor GlassDock open while this surface is visible. */
keepDockOpen?: boolean;
```

and the producer's own docblock names this exact composition as the sanctioned one —
`node_modules/@mkbabb/glass-ui/dist/components/dock/composables/dockContext.d.ts:14`:

> Hover-driven dock popovers compose `<Popover trigger="hover" keep-dock-open>`. Reka's hover
> primitives own open/close cadence and cluster transit.

### Why the copy is not equivalent

glass-ui's implementation (`dist/popover-BQGYXZyO.js:41-47`) carries a **latch** and an
**unmount release**:

```js
let b = r(), x = !1;                       // b = dock context, x = "we hold a token"
function S() { x &&= (b?.release(), !1); } // release IFF we hold
h([c, () => n.keepDockOpen], ([e, t]) => {
    e && t && b && !x ? (b.keepOpen(), x = !0) : (!e || !t) && S();
}, { immediate: !0 }), l(S)                // l === onScopeDispose (see import line 5)
```

`x` guarantees exactly one outstanding token per popover, and `onScopeDispose(S)` guarantees it is
returned on unmount. ActionButton has **neither**. It fires `keepOpen()` on every `true` edge and
`release()` on every `false` edge of an emit it does not control, with no latch and no teardown.

The counter it is driving is `dock.js:270,332,336`:

```js
let g = G(0), _ = O(() => g.value > 0);                 // g = keepOpenCount, _ = held
function I() { g.value++, T(); }                        // keepOpen
function L() { g.value = Math.max(0, g.value - 1), … }  // release — CLAMPS AT ZERO
```

`Math.max(0, …)` is the tell: the producer's counter is designed for **balanced** owners. An
unmatched `release()` silently consumes **someone else's** token.

### Reproduction (measured, live)

Instrumented the shared `DockContext` in the running page by wrapping `keepOpen`/`release` with a
call log + `new Error().stack` frame attribution, then ran one hover → click → leave cycle on the
`Copy CSS` action of `/#/gradient` at 1440×900 with the Tools action bar open:

```
a (after hover)  log = [ release   <- at onHoverOpenChange (ActionButton.vue:71),
                         keepOpen  <- at onHoverOpenChange (ActionButton.vue:69) ]
                 held = true   dock = expanded   toolsPressed = "true"
b (after click)  log += [ release <- ActionButton.vue:71, keepOpen <- ActionButton.vue:69 ]
                 held = true   dock = expanded   toolsPressed = "true"
c (after leave)  log += [ release <- ActionButton.vue:71 ]
                 held = FALSE  dock = expanded   toolsPressed = "true"
d (after 8 s)    log += [ release <- ActionButton.vue:71 ]
                 held = false  dock = COLLAPSED  toolsPressed = "true"
```

(The served-SFC line numbers 69/71 are `<script setup>` offsets for source lines **84** and **86**.
Every single call in the log is attributed to `ActionButton.vue` — no other owner appears.)

Three facts fall out of that log:

1. **The very first call is a `release` with no prior `keepOpen`.** Unbalanced out of the gate.
2. **Final tally: `keepOpen` ×2, `release` ×4.** Net −2 against a counter that clamps at 0.
3. **`held` went false, and the dock collapsed after 8 s, while `aria-pressed="true"` on the Tools
   toggle** — i.e. the action bar was still open. `Dock.vue:87` holds the dock open for exactly that
   condition:

   ```ts
   const shouldKeepOpen = computed(() => actionBarLayerActive.value || anyEditActive.value || isAnyOpen.value);
   watch(shouldKeepOpen, (open) => { if (open) dockRef.value?.keepOpen(); else dockRef.value?.release(); });
   ```

   **ActionButton ate Dock.vue's token.** The dock idle-collapses with its own action bar open — the
   layer the user is looking at folds itself away.

The irony is documented in the tree: `Dock.vue:79-86` records that U-F48 collapsed *three* scattered
imperative `keepOpen`/`release` watchers into that one declarative predicate. ActionButton is the
**fourth**, never converted, and it does not even go through `dockRef` — it reaches around the shell
into the producer's DI context from a leaf.

### Cure (architectural, not a patch)

Delete the import, both handlers, and the entire manual hold. One attribute:

```vue
<Popover trigger="hover" keep-dock-open :open-delay="300" :close-delay="0">
```

Net: −1 import, −6 lines, −1 cross-boundary DI reach, and the latch + `onScopeDispose` come for free
from the owner of the counter. **Unique semantic ownership restored: the dock hold is glass-ui's.**

---

## L-2 — BLOCKER — the action this button fires is dead on the mobile layout

### The chain

`ActionButton` emits `action` → `GenericActionBar.vue:28` `@action="act.handler()"` → the handler
literal in `demo/shell/usePaneRouter.ts:196-222`, e.g. line 208:

```ts
{ key: "reset", …, handler: () => paneRefs.gradient.value?.reset?.() },
```

→ `GradientPane.vue:12` `reset: () => visualizerRef.value?.resetGradient?.()`.

**Three optional-chained hops, every one untyped.** `usePaneRouter.ts:106-110`:

```ts
export interface PaneActionRefs {
    generate: Ref<any>;
    gradient: Ref<any>;
    mix: Ref<any>;
}
```

and `App.vue:317-319` `const gradientPaneRef = ref<any>(null)`. `@typescript-eslint/no-explicit-any`
is `off` (`eslint.config.js:70,184`), so nothing catches a rename anywhere along the chain: the button
animates, the emit fires, `undefined?.()` short-circuits, nothing happens, no error.

### It is not hypothetical — it is dead right now on phones

`App.vue:83-91` is the **mobile** `<PaneSlot>`. It has **no `:on-mount`**. Only the two desktop slots
bind the ref-capture callbacks (`App.vue:105` `:on-mount="onDesktopLeftMount"`, `:131`
`:on-mount="onDesktopRightMount"`), and the code says so out loud at `App.vue:315`:

> Populated by the onMount callbacks on the **desktop** PaneSlots

Measured at 390×844 on `/#/gradient`, reading the live `App` instance's `setupState`:

```json
{ "innerWidth": 390, "innerHeight": 844,
  "mq": false, "isDesktopSetup": false,
  "gradientPaneRef": "null",
  "dockActionButtons": 3 }
```

Three `ActionButton`s mounted in the dock; the ref they dispatch onto is `null`. **All nine generic
dock actions (generate ×3, gradient ×3, mix ×3) are guaranteed silent no-ops on the mobile layout** —
and `ActionButton.handleClick` (`:92-99`) unconditionally sets `isClicked` for 400 ms, so the icon
plays `action-flash` / `action-rotate`: the button *confirms* an action that provably did not run.

### Mechanism

Ownership is inverted. A pane's own commands (`reset`, `copyCSS`, `regenerate`, `startMix`) are
declared in the **shell router**, keyed by string, and dispatched onto the pane through a template
ref captured by a **layout-specific** callback. The pane's capability is therefore a function of which
`<PaneSlot>` rendered it. That is the wrong direction of dependency: the shell should not know a
pane's verbs, and a verb should not evaporate because the viewport is narrow.

### Cure

Invert it. The pane **provides** its action bar; the dock **consumes** it:

```ts
// demo/shell/dock/dockActions.ts — one typed injection seam, replaces PaneActionRefs entirely
export interface DockAction { key: string; icon: Component; title: string; description: string;
                              rotateOnClick?: boolean; iconClass?: string; disabled?: boolean;
                              run: () => void }
export const DOCK_ACTIONS_KEY: InjectionKey<Ref<DockAction[]>>
export function provideDockActions(actions: MaybeRefOrGetter<DockAction[]>): void
```

`GradientPane` calls `provideDockActions([...])` inside its own setup, closing over its own local
functions — fully typed, no refs, no `any`, no `?.`, layout-independent. `usePaneRouter` loses
`PaneActionRefs`, the three `Ref<any>`, and 27 lines of handler literals; `App.vue` loses
`generatePaneRef` / `gradientPaneRef` / `mixPaneRef` and both `onDesktop*Mount` callbacks.
`GeneratePane`/`GradientPane` lose their pure-forwarding `defineExpose` shims. The mobile/desktop
asymmetry cannot be expressed in the new lattice, so the bug cannot recur.

---

## L-3 — MAJOR — bare `<button>` where the design system ships the primitive

`ActionButton.vue:13-20` hand-rolls a native `<button>` with a Tailwind focus ring and a scoped
32×32 box (`:105-116`), inside a `<GlassDock>` whose every other control is `<DockControl>`.

glass-ui 7.0.0 ships both halves of exactly this component
(`dist/components/dock/index.d.ts:8,9`): `DockControl` (`shape="icon"`, glass hover, interruptible
spring press, pointer-anchored specular gleam, `.glass-capsule` seat, `active` → `aria-pressed` +
`data-active`, four-state `disabled`) and **`DockTrigger for="popover"`**, whose entire reason to
exist is "a dock control that opens a popover" (`dist/dock.js:1225` — renders the glass
`PopoverTrigger` with the `dock-trigger` classes and press directive attached).

Measured in the same dock row, `/#/gradient`, action bar open, 1440×900:

| control | class | box |
|---|---|---|
| `Back` | `dock-icon-button glass-specular-track` (DockControl) | **40 × 40** |
| `Reset` | `action-button-wrapper focus-visible:outline-none` | **32 × 32** |
| `Copy CSS` | `action-button-wrapper …` | **32 × 32** |
| `Seed from palette` | `action-button-wrapper …` | **32 × 32** |

(and 44 × 44 for `Back` in an earlier capture of the same row before the layer settled — the
DockControl box is token-driven and adapts; the demo's `2rem` is a constant.)

`probe-actionbar-open-desktop.png` (this directory) shows the result: a glass-capsule control
followed by three naked strokes with no seat, no hover capsule, no press spring. The producer's
`--dock-control-size` carries a **density clamp to ≥44 px on coarse pointers**
(`DockControl.vue.d.ts:12-16`); `width: 2rem` opts out of it, so on touch the mismatch widens to
32 vs 44 in one row. Owner edict 4 (glass-ui is the design system) and 5 (root-level styling).

**Cure:** `<DockTrigger for="popover">` (or `<PopoverTrigger as-child><DockControl …>`), delete
`.action-button-wrapper` and the local focus-ring utilities entirely. No new glass-ui primitive is
required — nothing to relay to the BH inbox for this one.

---

## L-4 — MAJOR — `activeStyle` is an inline style-bag escape hatch that also drops the a11y semantic

`ActionButton.vue:67` declares `activeStyle?: Record<string, string>` and spreads it inline onto the
icon (`:30`). `ActionToolbar.vue:46` is its only use:

```vue
:active-style="paletteActive ? { stroke: cssColorOpaque, strokeWidth: '2' } : {}"
```

So "this control is currently active" is expressed **only** as an inline SVG stroke override.
Nothing reaches assistive tech — no `aria-pressed`, no `data-active`, no `role` state. Screen-reader
users cannot tell the Palettes action is engaged. Meanwhile `DockControl` has `active` as a
first-class prop that stamps `aria-pressed` *and* `data-active` and reads the
`--dock-control-active-bg` tier (`DockControl.vue.d.ts:26-31`).

A prop typed `Record<string, string>` is an unbounded per-instance styling channel — precisely edict
5's target. **Cure:** delete `activeStyle`; pass `:active="paletteActive"` to `DockControl`.

---

## L-5 — MAJOR — two import disciplines for one design system, inside one 137-line file

`ActionButton.vue` imports glass-ui **twice, two different ways**:

```ts
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";   // :50-54
import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";               // :55
```

`demo/ui/popover/index.ts` is one line: `export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";`
— a demo-local **alias** onto the **root barrel**, while glass-ui publishes a dedicated `./popover`
subpath (`package.json#exports["./popover"] → dist/popover.js`, 131 bytes, re-exporting the shared
popover chunk; the root `./` entry is `dist/glass-ui.js`, **25 239 bytes / 47 top-level import-export
statements**).

Census over `demo/`:

| spelling | files |
|---|---|
| `demo/ui/*` alias barrels (19 files, all pure re-exports) | **48 consumers** |
| bare root `@mkbabb/glass-ui` | **36 files** |
| real subpaths (`/dock` ×15, `/watercolor-dot` ×11, `/dom` ×9, …) | ~75 sites |
| `@mkbabb/glass-ui/popover` | **0** |

Every `demo/ui/*/index.ts` is a second name for a symbol the design system already exports —
`demo/ui/alert/index.ts` even carries a comment recording that it *used* to hold a local
implementation and was converted to a re-export. Converting a shim to a thinner shim is not
retirement. This is an alias/dual-path layer (edict 2) sitting exactly where edict 4 says nothing
should sit (`demo/ui/`).

**Cure:** delete all 19 barrels; rewrite the 48 consumers to the glass-ui subpath that owns each
symbol (a mechanical codemod — the mapping is one line per barrel). ActionButton becomes:

```ts
import { Popover, PopoverContent, PopoverTrigger } from "@mkbabb/glass-ui/popover";
```

One discipline, one hop, and the import states which capability it depends on rather than "the whole
design system."

---

## L-6 — MAJOR — four live implementations of "exactly one of a set is open"

| # | implementation | home | shape |
|---|---|---|---|
| 1 | `hoverKey` + `activeHover` + `update:activeHover` | **`ActionButton.vue:59-79`**, re-implemented in `ActionToolbar.vue:85` and `GenericActionBar.vue:11` | string-keyed prop/emit pair, leaf-owned, parent-stored |
| 2 | `usePopupMutex<K>` | `demo/shell/dock/composables/usePopupMutex.ts` — **the same directory** | typed key, `popupModel(key)` writable computed, swap delay |
| 3 | `useHoverPopover` | `demo/palettes/browser/card/composables/useHoverPopover.ts` | `openIndex` singleton + leave timer + manual positioning |
| 4 | Reka hover-card cluster transit | glass-ui `<Popover trigger="hover">` (`popover-BQGYXZyO.js:39-47`) | producer-owned, the documented owner |

`usePopupMutex.ts:1-2` is candid: *"`usePopupMutex` was retired upstream from glass-ui at the D-II
tranche. Local fork."* A local fork of a retired producer composable is a legacy dual path (edict 2),
and it sits four directories from a *second* ad-hoc mutex for the same concept.

The protocol in #1 also inverts control: the **leaf** defines the mutex and every parent must
re-implement its half — `const activeHover = ref<string | null>(null)` plus
`@update:active-hover="(v) => activeHover = v"` appears verbatim in both consumers
(`ActionToolbar.vue:13,24,35,48,60,85`; `GenericActionBar.vue:11,29`). Adding a third action bar
means writing it a third time.

**Cure:** delete #1 outright. glass-ui's `<Popover trigger="hover">` with `openDelay`/`closeDelay`
already gives per-trigger open state *and* cluster transit — the dock's own docblock says so. The
three props (`hoverKey`, `activeHover`, `cssColorOpaque`… ) and the emit collapse to zero, along with
`ActionToolbar.clearHover` (L-8). If a hard single-open invariant is genuinely wanted, it is
`usePopupMutex` — one mutex in the dock folder, not two.

---

## L-7 — MAJOR — the demo's structural import guard matches zero files

`eslint.config.js:232-238,275-277` encodes the demo module-graph invariants G-DEMO-1 / G-DEMO-3a /
G-DEMO-3b over these globs:

```
demo/color-picker/**/*.{ts,vue}
demo/@/components/**/*.{ts,vue}
demo/@/lib/**/*.{ts,vue}
demo/@/composables/**/*.{ts,vue}
```

Measured:

```
$ ls -d demo/@
ls: demo/@: No such file or directory
```

`demo/@` was dissolved by the W43 restructure. Three of the four globs match **nothing**. The one
that survives, `demo/color-picker/**` (16 files, the boot root), carries a single ban keyed on
`@components/custom/palette-browser/**/*.vue` — an `@…` alias that **W43 RF-15 also retired**
(`vite.config.ts:66-71` and `tsconfig.demo.json`: *"No `@styles`/`@components`/`@utils`/`@lib`/
`@composables`/`@assets` project alias survives"*), so the pattern can never match a real specifier
either.

**Net: zero effective import bans over the current demo tree.** `demo/shell/` — this component's home,
the shell layer that everything else must not reach into — has no boundary enforcement at all. The
invariants survive as prose in dead config, which is worse than absent: it reads as guarded.

That is the *permissive condition* for L-1 (a leaf in `demo/shell/dock/` reaching into
`@mkbabb/glass-ui/dock`'s DI context) and L-2 (the shell reaching down into three feature panes'
verbs). Both edges are exactly what G-DEMO-1/3a were written to forbid.

**Cure:** re-key the rules onto the real tree and make the layering explicit —
`demo/shell/**` may not import `demo/{picker,palettes,workbenches,scenes}/**`;
`demo/{shared,platform,color-session}/**` may not import `demo/{shell,color-picker}/**`;
`demo/**` may not import `@mkbabb/glass-ui` bare (subpaths only, which retires L-5 structurally).

---

## L-8 — MINOR — dead public surface on the component and its consumer

| symbol | site | status |
|---|---|---|
| `label?: string` | `ActionButton.vue:65`, rendered `:32` | **never passed** by either consumer |
| `.action-label` | `ActionButton.vue:32` | **no CSS rule anywhere** — `grep -rn "action-label" demo/` returns exactly that one template line |
| `hidden?: boolean` | `ActionButton.vue:69`, gates the whole `v-if` at `:3` | **never passed** by either consumer |
| `canProposeName` | `ActionToolbar.vue:72` | declared in `defineProps`, **referenced nowhere** in that SFC; still threaded from `ActionBarLayer.vue:106` |
| `clearHover()` + `defineExpose` | `ActionToolbar.vue:87-91` | **zero callers** across `demo/` and `e2e/` |

Five dead members on a 137-line leaf and its 92-line parent. Each is a prop the type system forces
future call sites to reason about for no behaviour. Delete all five (the `hidden` gate in particular:
a control that can be `v-if`-ed out by a prop is a second, competing visibility mechanism next to the
`v-if="hasAnyActionBar"` the dock already applies at `Dock.vue:153`).

---

## L-9 — MINOR — two custom properties carrying one value, written per-instance

`ActionButton.vue:30`:

```
:style="{ ...activeStyle, '--flash-color': cssColorOpaque ?? 'currentColor', '--hover-color': cssColorOpaque ?? 'currentColor' }"
```

Identical expression twice, stamped inline on every icon of every action button on every render.
`cssColorOpaque` itself arrives by a four-hop drill — `inject(SAFE_ACCENT_KEY)` at
`ActionBarLayer.vue:24` → prop `cssColorOpaque` → `ActionToolbar.vue:71` → prop → leaf — when
`SAFE_ACCENT_KEY` is a provided injection key already reachable from the leaf
(`demo/color-session/keys.ts`, injected directly by `Dock.vue:35`, `GradientPane.vue`, `MixPane.vue`,
`ColorNutritionLabel.vue`, …).

**Cure:** one token, set once at the action-bar root, consumed by the scoped rules —
`.dock-action-bar { --action-ink: <accent> }` — and the leaf stops carrying a colour prop at all.
Root-level styling (edict 5) and one owner for the accent.

---

## L-10 — MINOR — uncancelled timer

`ActionButton.vue:95-97` starts a 400 ms `setTimeout` with no `onScopeDispose`/`onUnmounted`
cancellation. `usePopupMutex.ts:80` in the same folder does it correctly (`onUnmounted(clearSwapTimer)`).
If the component unmounts inside the window (route change, action-bar close, `actions` array
re-render) the callback writes to a disposed ref. Harmless today; it is the same class of missing
teardown that makes L-1 unsafe. Dissolves entirely if the flash becomes a `DockControl` press state.

---

## L-11 — INFO — value.js published-surface fidelity (subject component is clean; its neighbourhood is not)

**ActionButton imports nothing from `@mkbabb/value.js`.** Correct — it is chrome, it receives a
pre-resolved CSS string. On the challenge's second bullet the component itself is sound.

The surrounding surface is not, and it is worth recording since the challenge asks:

- `package.json#exports` = 7 keys: `./color ./value ./css ./easing ./math ./transform ./quantize`.
  **There is no `.` root key**, and no `dist/index.d.ts` exists.
- `tsconfig.demo.json` `paths` declares **8** keys: `"@mkbabb/value.js"` (→ the non-existent
  `./dist/index.d.ts`), `color`, **`parsing`**, `math`, `easing`, **`units`**, `transform`, `quantize`.
  `parsing` and `units` are **phantom** — not in the exports map, not in `dist/subpaths/`.
  `value` and `css` are **missing** from `paths` but present in the exports map.
- The demo imports `@mkbabb/value.js/css` **10 times**. With no `paths` entry, `moduleResolution:
  bundler` falls through to `node_modules/@mkbabb/value.js` — the **registry-installed 4.0.0 tarball**
  (`package-lock.json:1336-1339`, `resolved: https://registry.npmjs.org/…value.js-4.0.0.tgz`) — while
  `vite.config.ts`'s generated self-alias points the *runtime* at this checkout's `dist/`.

  Measured divergence:

  ```
  dist/subpaths/css.js                              43973 B  Jul 27 11:52   (local build)
  node_modules/@mkbabb/value.js/dist/subpaths/css.js 43972 B  Jul 17 21:10   (registry 4.0.0)
  $ cmp …  → differ: char 141, line 2
  ```

  So 10 demo imports **typecheck against a different artifact than they execute against**, and the two
  are already byte-divergent. The `vite.config.ts` self-alias is generated from the exports map
  precisely so it can never drift (its comment says so); the TypeScript half was left hand-maintained
  and has drifted. Single-source it the same way — emit `tsconfig.demo.json`'s `paths` from
  `package.json#exports`, or drop `paths` entirely and let both halves resolve through the one map.

---

## The greenfield lattice

Structuring this today, with no legacy, the dock is four layers and the subject file does not exist:

```
glass-ui/dock          GlassDock · DockLayerGroup · DockLayer · DockControl · DockTrigger
glass-ui/popover       Popover(trigger, keepDockOpen, openDelay/closeDelay) · Trigger · Content
       ▲  consumed by bare subpath specifier only — no demo/ui alias layer
demo/shell/dock        Dock.vue          — composition + the ONE hold predicate
                       dockActions.ts    — DockAction type + DOCK_ACTIONS_KEY + provideDockActions
                       ActionBar.vue     — v-for over injected actions; ~20 lines, no local state
       ▲  provides nothing downward; consumes an injected action list
demo/{workbenches,picker,palettes,scenes}/*Pane.vue
                       provideDockActions([...]) in its own setup, closing over its own functions
```

`ActionBar.vue` in full:

```vue
<script setup lang="ts">
import { inject } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "@mkbabb/glass-ui/popover";
import { DockControl } from "@mkbabb/glass-ui/dock";
import { DOCK_ACTIONS_KEY } from "./dockActions";
const actions = inject(DOCK_ACTIONS_KEY, undefined);
</script>

<template>
    <div class="flex items-center justify-around flex-1">
        <Popover v-for="a in actions?.value" :key="a.key"
                 trigger="hover" keep-dock-open :open-delay="300" :close-delay="0">
            <PopoverTrigger as-child>
                <DockControl :aria-label="a.title" :active="a.active" :disabled="a.disabled"
                             @click="a.run()">
                    <component :is="a.icon" class="w-6 h-6" aria-hidden="true" />
                </DockControl>
            </PopoverTrigger>
            <PopoverContent class="font-display">
                <p class="font-display font-medium text-subheading">{{ a.title }}</p>
                <p class="text-small text-muted-foreground">{{ a.description }}</p>
            </PopoverContent>
        </Popover>
    </div>
</template>
```

What that deletes, and what each deletion buys:

| deleted | buys |
|---|---|
| `ActionButton.vue` (137), `ActionToolbar.vue`'s action half, `GenericActionBar.vue` (33) | one action-bar renderer instead of three files and two duplicated mutex halves |
| the manual `keepOpen`/`release` pair + the `@mkbabb/glass-ui/dock` DI reach | **L-1: no shared counter to corrupt** |
| `PaneActionRefs`, 3 × `Ref<any>`, 27 lines of handler literals, `onDesktopLeftMount`/`onDesktopRightMount`, two pure-forwarding `defineExpose` shims | **L-2: typed actions, layout-independent, mobile parity by construction** |
| `.action-button-wrapper` + focus-ring utilities + `--flash-color`/`--hover-color` inline pair | **L-3/L-9: one register, one token, density clamp inherited** |
| `activeStyle` | **L-4: `aria-pressed` restored** |
| `demo/ui/*` (19 barrels) | **L-5: one import discipline** |
| `hoverKey`/`activeHover`/`update:activeHover`, `clearHover`, `label`, `hidden`, `canProposeName` | **L-6/L-8: no leaf-owned protocol, no dead members** |

The animations are **not** deleted — edict 6. `action-pulse` / `action-spin` move onto the
`DockControl` press/active state (or, if the -360° spin has no `DockControl` equivalent, they stay as
scoped keyframes on the new `ActionBar.vue`, which is where scoped keyframes are allowed to live).
The `rotateOnClick` axis survives as a `DockAction` field.

---

## Checked and found sound (negative results)

- **`verbatimModuleSyntax`** — `import { computed, ref, type Component } from "vue"` (`:49`) uses the
  inline `type` qualifier; `GenericActionBar.vue:4` and `ActionBarLayer.vue:5,9` all use
  `import type`. No violation in the subject or its consumers.
- **Vue 3.5 idioms** — reactive props destructure at `:59` is correct; no stale `defineModel`
  round-trip exists here (no `defineModel` at all); `useTemplateRef` is used correctly by the
  neighbours that need it (`Dock.vue:74`, `ActionBarLayer.vue:83`).
- **God module** — 137 lines / 12 props / 2 emits. Not a god module by size. Its defect is
  *misplacement*, not bulk.
- **`@src/*` leakage** — zero. `grep` for `@src` under `demo/` returns nothing outside the exempt
  `assets/docs/*.md` reference pages. The T.W1 demo-dogfood keystone holds.
- **Relative-home imports** — `../../ui/popover`, `../../styles/foundation.css`, `../ActionButton.vue`
  all point at physical homes; no revived `@…` project alias. W43 RF-15 holds.
- **Visual-audit rows** — `/#/mix`, `/#/generate`, `/#/gradient`, `/#/` in
  `docs/tranches/V/megatranche/audit/visual/REPORT.json` show **no** ActionButton entries in
  `smallTapTargets`, and I verified why: the `action-bar` `DockLayer` is inactive at capture time, so
  the probe measures the buttons at zero effective size. The 32 × 32 finding in L-3 is **invisible to
  the existing visual matrix** — it needed a live interaction probe. That is a gap in the capture
  harness worth carrying: `capture.mjs` should open the Tools layer on the three workbench routes.

## Artifacts in this directory

- `probe-actionbar-open-desktop.png` — `/#/gradient`, 1440×900, action bar open: the glass-capsule
  `Back` DockControl beside the three unseated 32 px ActionButton glyphs (L-3).
