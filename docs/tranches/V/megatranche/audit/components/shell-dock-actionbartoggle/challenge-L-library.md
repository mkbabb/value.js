# CHALLENGE-L — library structure · `demo/shell/dock/ActionBarToggle.vue`

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`), the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## 0 · Scope, method, evidence ledger

Subject: `demo/shell/dock/ActionBarToggle.vue` (159 lines) at HEAD `c654824e`, branch `tranche-u`.
Axis: **library structure** — module boundaries, ownership, direction of dependency, public surface.

Everything below is either a `file:line`, a pasted command output, a measured number from a live
probe against `http://localhost:9000`, or a quoted producer stylesheet. Hypotheses are labelled.

| # | Instrument | What it decided |
|---|---|---|
| E-1 | Source read of the SFC + `Dock.vue`, `App.vue`, `usePaneRouter.ts`, `color-session/keys.ts`, `shell/dock/index.ts` | the real import + ownership graph |
| E-2 | `node_modules/@mkbabb/glass-ui@7.0.0` `exports` map + `dist/components/dock/**` + `dist/styles/glass/glass-capsule.css` | which producer API exists and which is bypassed |
| E-3 | Chrome DevTools Protocol `CSS.getMatchedStylesForNode` on `.dock-tools-btn` | the actual cascade winner for `padding` |
| E-4 | `npx playwright test e2e/smoke/oracles/o15-dock-register.spec.ts -g "true-button box-model"` | a **RED gate at HEAD** |
| E-5 | Headless-Chromium geometry probes at 1440×900, 1200×1100, 1024×960, 390×844 (12 routes) | breakpoint divergence + the mobile dead trigger |
| E-6 | `docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/picker.png` (read visually) | corroborates E-5's mobile finding in real Safari |
| E-7 | `md5`/`wc -c` on `dist/subpaths/css.d.ts` vs `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts`, + `vue-tsc --traceResolution` | the demo types two of seven subpaths against a *different copy* of the library |

---

## 1 · What this component imports, and whether it should

```
demo/shell/dock/ActionBarToggle.vue
├── vue                        ref, watch                        (:2)  ✔
├── vue                        import type { Component }         (:3)  ✔ verbatimModuleSyntax honoured
├── @lucide/vue                ArrowRight                        (:4)  ✔ devDependency, demo-only
├── @mkbabb/glass-ui/dock      DockControl, DockSeparator        (:5)  ✔ PUBLISHED subpath
└── @reference "../../styles/foundation.css"                     (:110) ✔ relative, no alias
```

**Verified negative proofs** (these matter — a challenge seat that finds nothing must prove the
negative):

- `@mkbabb/glass-ui/dock` **is** a real published subpath. `node -e` over
  `node_modules/@mkbabb/glass-ui/package.json` shows `"./dock": { "types": "./dist/dock.d.ts",
  "import": "./dist/dock.js" }`. This is not a repo-only deep path; a real consumer could write it.
- This component imports **nothing** from `@mkbabb/value.js`, and nothing from `src/`. There is no
  deep-import violation *originating here*. (The published-surface defect in §2 is area machinery
  this component sits inside, not an edge it draws.)
- No boundary is crossed upward: `demo/shell/dock/*` → `demo/styles/*` and → producer. No
  feature→shell or component→boot edge is drawn **by this file**. Its *parent* draws three
  (`Dock.vue:18` → `../../palettes/usePalettePorts`, `:19,:22,:23` → `../../color-session/*`,
  `:17` → `../useViewManager`) — shell reaching into feature trees — but that is `Dock.vue`'s row.

The import list is clean. **The structural defects here are not in what it imports — they are in
what it re-implements, what it flattens, and what it is handed.**

---

## 2 · The published surface — `@mkbabb/value.js`

The component does not touch it, so this section is an area finding, reported because the brief
asks whether the demo proves the public API honestly. **It does not, for two of seven subpaths.**

`package.json` `exports` — 7 keys, **no `.` root**:

```
./color  ./value  ./css  ./easing  ./math  ./transform  ./quantize
```

`tsconfig.demo.json` `paths` — 8 keys, hand-rolled, and a **different set**:

```
@mkbabb/value.js            → ./dist/index.d.ts        ← target DOES NOT EXIST; "." is not in exports
@mkbabb/value.js/color      → ./dist/subpaths/color.d.ts      ✔
@mkbabb/value.js/parsing    → ./dist/subpaths/parsing.d.ts    ← NOT AN EXPORT; file does not exist
@mkbabb/value.js/math       ✔   /easing ✔   /transform ✔   /quantize ✔
@mkbabb/value.js/units      → ./dist/subpaths/units.d.ts      ← NOT AN EXPORT; file does not exist
                                (no entry for /css, no entry for /value)
```

`ls dist/subpaths/` → `color css easing math quantize transform value` (`.js`+`.d.ts`). No
`parsing`, no `units`, no `dist/index.d.ts`.

The demo *uses* `@mkbabb/value.js/css` in **10 files** (`grep -rhoE 'from "@mkbabb/value\.js[^"]*"'
demo/ | sort | uniq -c` → 24 `/color`, 10 `/css`, 6 `/math`, 5 `/easing`, 4 `/quantize`).
`/css` has **no `paths` entry**, so TypeScript falls through to node resolution and finds the
**physically installed registry tarball** — `node_modules/@mkbabb/value.js@4.0.0` is a real install,
not a symlink (`ls -la node_modules/@mkbabb/value.js` → `LICENSE README.md dist package.json`, no
symlink target). The `--traceResolution` capture confirms that directory is consulted:

```
File '/…/node_modules/@mkbabb/value.js/dist/subpaths/package.json' does not exist.
Found 'package.json' at '/…/node_modules/@mkbabb/value.js/package.json'.
```

And the two copies are **not the same file**:

```
$ md5 -q dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
e0968b8d3b9a5ecabc7c8c1d01de9995      # working tree, 12490 bytes
4309648d15b521dc8281eab37ccc32a2      # registry 4.0.0,  10910 bytes
```

Meanwhile `vite.config.ts:37-50` **generates** its alias set from `package.json#exports`, so the
*runtime* for `/css` is the working tree's `dist/`. Types come from the frozen tarball; runtime comes
from the checkout. `pretypecheck` rebuilds `dist/` — which the `/css` and `/value` type view cannot
see. The `tsconfig.demo.json` header calls this "the `dist/*.d.ts` trust boundary … the T.W1
demo-dogfood keystone … the `exports` map is a CLOSED 8-key set". The map is a closed **7**-key set,
and the keystone leaks on two of them. → **L-6**.

---

## 3 · The findings

### L-1 · BLOCKER — the Tools trigger is DEAD ON MOBILE for every ColorPicker-sourced action bar, because the dock's presence is gated on a template ref only the *desktop* pane tree populates

`visible` (`ActionBarToggle.vue:40`) is `hasAnyActionBar` (`Dock.vue:41`) = `actionBar || genericBar`.
`actionBar` arrives from `App.vue:38`:

```vue
:action-bar="colorPickerRef?.actionBarContext ?? null"
```

`colorPickerRef` has exactly **one writer** — `App.vue:325`, inside `onDesktopLeftMount`, whose own
comment at `App.vue:321` reads *"Ref-capture callbacks for **desktop pane slots**"*. The desktop
`<PaneSlot>` passes `:on-mount="onDesktopLeftMount"` (`App.vue:104`). The **mobile** `<PaneSlot>`
(`App.vue:84-91`, under `v-if="!isDesktop"` at `:77`) passes **no `:on-mount` at all**. So on mobile
`colorPickerRef` is permanently `null`, `:action-bar` is permanently `null`, and the toggle's
`visible` is false unless a *generic* action bar happens to exist.

Measured, headless Chromium, `.action-bar-toggle-slot` class + width:

| route | 390×844 (mobile) | 1440×900 (desktop) |
|---|---|---|
| `/` (picker) | `(bare)` · **0 px** | `is-visible is-live is-settled` · **125.5 px** |
| `/palettes` | `is-live` · **0 px** | `is-visible is-live is-settled` · **125.5 px** |
| `/blob` | `is-live` · **0 px** | `is-visible is-live is-settled` · **125.5 px** |
| `/gradient` | `is-visible is-live is-settled` · 41.3 px | 125.5 px |
| `/mix`, `/generate` | 41.3 px | 125.5 px |

The three working mobile routes are exactly the `genericActionBar` routes (sourced from
`usePaneRouter`'s router computed, not a template ref). The dead ones are exactly the
`ActionBarContext` routes.

Corroborated in **real Safari** by the existing capture:
`docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/picker.png` — the mobile dock
renders `Home ▾ │ [Picker|About] │ ⋮` with **no paintbrush trigger**. It is not clipped by
`min-width`; it is 0-width by presence.

Consequence: on mobile the entire colour-session action bar (`ActionBarContext` —
`reset`/`copy`/`random`/`canProposeName`, `demo/color-session/keys.ts:17-27`) has **no entry point**.
The trigger is the sole affordance that swaps to `DockLayer id="action-bar"` (`Dock.vue:153`).

**Mechanism (library structure, not a typo):** the dock's presence predicate is coupled to a *pane
instance handle* rather than to a *state owner*. A component's existence in one breakpoint's subtree
is being used as an ownership channel. That is the wrong direction of dependency — the shell's dock
depends on a feature component's mounted instance.

*Corollary, labelled **HYPOTHESIS** (statically certain, not separately reproduced):* the same null
ref makes the mobile-edit layer's Save/Cancel no-ops — `Dock.vue:143-144` emits `commitEdit`/
`cancelEdit` → `App.vue:41-42` `colorPickerRef?.commitEdit()` → `undefined` on mobile. Owner: the
`Dock`/`App` seats, recorded here because it shares L-1's exact mechanism.

**Cure (transposition, not patch):** the action-bar context is *session state*, not a component
handle. Provide it the way every other session concept is provided — an `InjectionKey` alongside
`COLOR_MODEL_KEY`/`CSS_COLOR_KEY`/`SAFE_ACCENT_KEY` in `demo/color-session/keys.ts`, written by the
colour-session owner and injected by `Dock`. `colorPickerRef`, `onDesktopLeftMount`'s three-way
assignment, and the `:action-bar` prop all die. Breakpoint stops being an ownership channel.

---

### L-2 · BLOCKER — the T-36 "true-button box-model" is DEAD CSS; its guarding oracle is RED at HEAD; the SFC's 12-line comment is a false record

`ActionBarToggle.vue:147-158` claims the cure "rides the producer's OWN token hook
(`--dock-compact-control-padding`, dock-controls/icon-button.css), never a specificity fight" and
that "the box lands at the sibling controls' 2.5rem height".

**Measured (1440×900, `/`):**

- `getComputedStyle(btn).getPropertyValue("--dock-compact-control-padding")` → `"0.5rem 0.75rem"` — the token *is* set.
- `getComputedStyle(btn).padding` → **`"4px"`** — the producer default.
- `.dock-tools-btn` box → **104.5 × 32 px**. Sibling `DockControl`s ("Save edit", "Cancel edit", "Back") → **40 × 40 px**. 2.5rem = 40px. The claim is false by 8px.
- Setting the token inline at highest priority (`btn.style.setProperty(...)`) changes padding **not at all** (`4px` → `4px`).

**Why** — CDP `CSS.getMatchedStylesForNode` on `.dock-tools-btn`, every rule declaring `padding`:

```
layer components   .dock-icon-button            padding: var(--dock-icon-padding, 0)
layer components   .dock-icon-button--compact   padding: var(--dock-compact-control-padding, 0.25rem)
layer components   .glass-dock .dock-icon-button  padding: var(--dock-icon-padding, var(--dock-control-safe-inset, 0))   ← WINS (0,2,0)
(unlayered)        .dock-tools-btn[data-v-69d6f73e]  --dock-compact-control-padding: 0.5rem 0.75rem
```

Source: `node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-capsule.css` —
`.glass-dock .dock-icon-button { padding: var(--dock-icon-padding, var(--dock-control-safe-inset, 0)); }`,
and `--dock-control-safe-inset: calc(var(--dock-control-size) * 0.1)` = 40px × 0.1 = **4px**, exactly
the measured value. Inside a `.glass-dock`, `--dock-compact-control-padding` is **structurally
unreachable** — the producer superseded it with the dock-scoped "folded safe-inset" (documented in
`DockControl.vue.d.ts`: *"ONE FACE, the folded safe-inset … the painted plate insets via the
dock-scoped `--dock-control-safe-inset` fold"*).

**The guarding oracle fails at HEAD.** Run, pasted verbatim:

```
$ npx playwright test e2e/smoke/oracles/o15-dock-register.spec.ts --project=smoke \
    -g "true-button box-model" --reporter=line

  1) [smoke] › o15-dock-register.spec.ts:105 › T-36 (§0.6): the Tools trigger wears the true-button box-model
     Error: expect(received).toBe(expected)
     Expected: "8px 12px"
     Received: "4px"
       > 126 |         expect(box.padding).toBe("8px 12px");
  1 failed
```

**Mechanism:** a **design-system variant was synthesised inside a consumer** (edict 4), through a
producer token chosen without reading the producer's cascade. The consumer owns no register; it owns
a wish.

**Cure — the producer already ships the variant.** `DockControl` has a `shape` discriminant
(`DockControl.vue.d.ts`): `shape="tab"` is *"auto-sized text-tab control"*, and
`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/controls/tab-button.css` gives it
`padding-inline: var(--dock-tab-padding-inline, 0.75rem); padding-block: var(--dock-tab-padding-block, 0.375rem)`
— **12px / 6px**: the Button-primitive scale T-36 asked for and never got, delivered by the design
system. `<DockControl shape="tab">` deletes the entire scoped `.dock-tools-btn` block except `gap`.

---

### L-3 · MAJOR — `DockControl`'s first-class `active` prop is bypassed; the selected seat never composes

`ActionBarToggle.vue:88-93` hand-rolls the pressed state:

```vue
:class="{ 'is-active': active }"
:aria-pressed="active"
```

`DockControl` ships `active?: boolean` as a documented prop — *"Selected/toggled state. Stamps
`aria-pressed` + `data-active`; the icon shape composes the `.glass-capsule` selected seat."*
Implementation (`node_modules/@mkbabb/glass-ui/dist/dock.js:1152-1157`):

```js
e("dock-icon-button glass-specular-track glass-capsule-hover", { "glass-capsule": r.active }, …)
…r.active ? { "aria-pressed": "true", "data-active": "" } : {}
```

**Measured after clicking the trigger** (1440×900, `/#/gradient`):

```
class = "dock-icon-button glass-specular-track glass-capsule-hover dock-icon-button--compact dock-tools-btn is-active"
aria-pressed = "true"     data-active = ABSENT     .glass-capsule = ABSENT
```

The control therefore lands the **legacy** `:is(.is-active, .active, [aria-expanded], [aria-pressed="true"])`
branch (`--dock-active-bg` / `--dock-active-color` / `--dock-active-scale` / `--dock-active-border`
/ `--dock-active-shadow`, of which `border: none` and `shadow: none`) instead of the sanctioned
`[data-active]` branch (`--glass-capsule-fill: var(--dock-control-active-bg, var(--glass-bg-floating))`).
The active Tools pill paints a flat fill where every producer-idiomatic sibling paints the glass
capsule. Two registers for one state, one of them by accident.

**Cure:** `:active="active"`, delete both bindings. With `shape="tab"` (L-2) the tab register
(`&:is(.is-active, .active, [aria-current="page"], [aria-pressed="true"]) { background: var(--dock-control-active-bg); … }`,
`tab-button.css`) is the producer's intended selected face for a text tab.

---

### L-4 · MAJOR — "desktop" has three homes and two inequivalent definitions; the app's own layout truth and this component disagree, measurably

| Home | Mechanism | Predicate |
|---|---|---|
| `App.vue:310-312` | glass-ui `useBreakpoint` (`@mkbabb/glass-ui/dom`) | `(min-width: 1024px) and (min-aspect-ratio: 1.1)` — stamps `[data-layout]` (`App.vue:2`) |
| `Dock.vue:71` | `@vueuse/core` `useMediaQuery` | `(min-width: 1024px)` — **no aspect clause**; prop-drilled as `isDesktop` into this SFC (`Dock.vue:185`) |
| `ActionBarToggle.vue:82, :103` | Tailwind `hidden lg:block` | width ≥ 64rem, no aspect clause |

`App.vue:305-309` asserts of its own query: *"the JS mount condition and the CSS dual grid share one
compound query, **so they can never disagree**"*. The dock is a third query and it does disagree.

**Measured:**

| viewport | aspect | `[data-layout]` | Tools label | ArrowRight | separator |
|---|---|---|---|---|---|
| 1440×900 | 1.600 | `desktop` | visible | visible | visible |
| 1200×1100 | 1.091 | **`mobile`** | **visible** | **visible** | **visible** |
| 1024×960 | 1.067 | **`mobile`** | **visible** | **visible** | **visible** |

Reproduction: open `http://localhost:9000/`, resize to 1200×1100. The app runs the single-slot mobile
grammar while the dock wears full desktop furniture.

Also note the fourth mechanism in the same demo: `demo/picker/visual/HeroBlob.vue:71` and
`demo/picker/controls/ComponentSliders/ConsoleRail.vue:118` use `useBreakpoint("(min-width: 1024px)")`
— glass-ui's composable with the *dock's* predicate. Three composables, two predicates, one word.

**Cure:** `isDesktop` is app-layout state with exactly one legitimate owner — `App.vue`'s
`useBreakpoint` result. `provide` it (`LAYOUT_KEY`, next to the other session keys), inject it in
`Dock`, and let this component read the injected value. The `isDesktop` prop dies; the two `lg:`
utilities become `v-if="isDesktop"` (one mechanism, one predicate). `Dock.vue:71`'s `useMediaQuery`
import dies with it.

---

### L-5 · MAJOR — one concept ("the dock's contextual action bar"), two types, two renderers, and a `??` chain; this component flattens one of them into three anonymous scalars

Two independently-declared shapes, in two different trees:

- `demo/color-session/keys.ts:17-27` — `interface ActionBarContext` (colour-session semantics:
  `cssColorOpaque`, `isEditing`, `canProposeName`, `colorModel`, `reset`, `copy`, `random`).
- `demo/shell/usePaneRouter.ts:49-58` — `interface DockActionBar` (`label`, `icon`, `accentColor?`,
  `actions: Ref<DockAction[]>`).

`Dock.vue:153-158` renders them through **two parallel components** (`ActionBarLayer` vs
`GenericActionBar`) selected by `v-if`/`v-else-if`, and `Dock.vue:182-190` feeds this component a
three-way `??` chain:

```vue
:icon="genericBar?.icon ?? Paintbrush"
:label="genericBar?.label ?? 'Tools'"
:accent="genericBar?.accentColor ?? safeAccent"
```

The toggle re-declares three of `DockActionBar`'s four fields as **anonymous scalars**
(`ActionBarToggle.vue:44-46`), so the descriptor's owner cannot enforce anything: rename
`DockActionBar.label` and this component still compiles and still renders.

**Measured — the flattened props carry no variance in the shipped app.** Across 12 routes at
1440×900 the label read `"Tools"` on every single one (`/`, `/palettes`, `/browse`, `/extract`,
`/mix`, `/generate`, `/gradient`, `/about`, `/atmosphere`, `/blob`, `/admin/users`,
`/does-not-exist`). Three props, one observable value, and a defaulted chain hiding whether the
source ever spoke. This is exactly the surface that let L-1 hide: `visible` collapses a two-source
union to a boolean, so "the mobile source is null" is indistinguishable from "no action bar here".

**Cure:** one type. `ActionBarContext` is a *payload*; `DockActionBar` is the *dock's descriptor*.
Fold: the colour session publishes a `DockActionBar` like every other view does (its actions are
already `reset`/`copy`/`random`/`propose` — `DockAction[]` verbatim), `GenericActionBar` becomes the
only renderer, `ActionBarLayer` and the `v-if`/`v-else-if` pair die, and this component takes the
descriptor whole: `:bar="bar | null"`. Presence is `bar !== null`; icon/label/accent are `bar`'s
fields, not the parent's guesses.

---

### L-6 · MAJOR — the demo's *type* view and *runtime* view of `@mkbabb/value.js` are different copies of the library (2 of 7 subpaths)

Full evidence in §2. Restated as the defect:

- `tsconfig.demo.json` `paths` is **hand-rolled** and has drifted from `package.json#exports`: it
  declares 3 specifiers that are not exports (`@mkbabb/value.js`, `/parsing`, `/units` — the latter
  two pointing at `dist/subpaths/{parsing,units}.d.ts`, files that do not exist; the first at
  `dist/index.d.ts`, which also does not exist) and **omits 2 that are** (`/css`, `/value`).
- `vite.config.ts:37-50` **generates** its alias set from `exports`, and its own comment says the
  generation exists "so the alias set can never drift from the exports map". The type side has no
  such generator, and it drifted.
- Result: `@mkbabb/value.js/css` — **10 demo files** — typechecks against
  `node_modules/@mkbabb/value.js@4.0.0` (md5 `4309648…`, 10910 B) while running against
  `dist/subpaths/css.js` from this checkout (md5 `e0968b8…`, 12490 B). A breaking change to the
  `/css` surface in `src/` is invisible to `npm run typecheck` and visible only at runtime.
- `npx vue-tsc -p tsconfig.demo.json --noEmit` exits **0** today, so the gate is green while the
  proof is false.

**Cure:** delete `paths` for the value.js specifiers entirely and generate them from
`package.json#exports` in the same breath as the Vite aliases (one generator, two consumers) — or,
simpler and more honest, `npm link`/`file:` the checkout so both sides resolve the same `dist/`.
Either way: **one derivation of the published surface**, never two hand-kept lists. Also delete the
stale `@mkbabb/value.js` / `/parsing` / `/units` rows — they assert a public API the package does
not have.

---

### L-7 · MAJOR — the boot-vs-runtime phase is re-derived locally with a frame count, against the app's own named-predicate law, and the local machine has a reachable stuck state

The app owns a boot-phase authority: `OVERTURE_KEY` (`demo/color-picker/composables/boot/useOverture.ts:81`),
`provide`d at `App.vue:297`, exposing named beats `b1 b2 b3 b3Complete b4` and **`dockLanded`**. Its
module header states the law: *"each beat opens on a NAMED arming predicate, **never a timer**, so
throttling stretches the overture without reshuffling it"*. `<Dock>` is rendered at `App.vue:35`,
i.e. inside that provide — this component can inject it.

It does not. `ActionBarToggle.vue:50-68` re-derives "has boot finished?" from a **double
`requestAnimationFrame`** — a frame count, which is precisely the timer-shaped predicate the law
forbids. The same beat is re-rolled at `demo/color-picker/composables/boot/useOverture.ts`,
`useDockArrival.ts`, and `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue`
(`grep -rlE "requestAnimationFrame\(\(\) => *\{?$" demo/` → 4 files).

**The local machine has a reachable stuck state.** `:59` early-returns once `slotLive` is true, so
after the first arm, `settled` is re-established *only* by the `grid-template-columns`
`transitionend` (`:69-72`). If presence flickers false→true without a committed width change, no
transition runs, no `transitionend` fires, and `is-settled` never returns — leaving
`.action-bar-toggle-inner` at `overflow: hidden`, which is the exact T-29 amputation the 30-line
header exists to cure.

**Measured, deterministic, four fresh page loads:**

```
direct load /#/about ......  is-visible is-live is-settled   overflow: visible
gradient -> about .........  is-visible is-live              overflow: HIDDEN     ← stuck
picker  -> about ..........  is-visible is-live is-settled   overflow: visible
browse  -> about ..........  is-visible is-live is-settled   overflow: visible
```

Reproduction: load `http://localhost:9000/#/gradient`, wait for settle, navigate to `#/about`. The
clip is back and the producer's hover capsule / focus shadow are amputated again on that route.
`o15-dock-register.spec.ts:74-78` asserts `overflow: visible` only on `/` after a fresh load, so the
oracle cannot see this path.

**Cure:** two moves, both removals. (a) Boot-vs-runtime is `inject(OVERTURE_KEY)`'s `b1`/`dockLanded`
— one authority, named predicate, PRM-correct by construction. (b) Presence is the producer's job:
glass-ui ships `DockCrossfade`, `DockLayer`, and `useLiquidReveal`/`useBloomUp`
(`@mkbabb/glass-ui/motion`). A 0fr↔1fr grid presence transition hand-rolled in a dock consumer is a
second implementation of the dock's own presence grammar. With presence owned upstream, `slotLive`,
`settled`, `onSlotSettled`, the three `is-*` classes, and 30 lines of scoped CSS all disappear —
along with the stuck state, which cannot exist in a machine that has no state.

---

### L-8 · MINOR — the local dock barrel is a dual path used two ways on adjacent lines

`demo/shell/dock/index.ts` (4 lines of code):

```ts
export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
export { default as Dock } from "./Dock.vue";
```

It re-exports **3 of the 5** producer dock symbols the directory uses, and `Dock.vue` consumes both
paths on consecutive lines:

```
Dock.vue:4   import { GlassDock, DockLayerGroup, DockLayer } from "./";
Dock.vue:5   import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
```

`ActionBarToggle.vue:5` and every other consumer in the tree (`layers/ActionBarLayer.vue:8`,
`layers/SlugEditLayer.vue:4`, `menus/ProfileSection.vue:6`, `scenes/ConfigSliderPane.vue:20`,
`workbenches/**` ×5) use the direct producer path. The barrel adds a second name for one thing
(edict 2) and a wrapper that earns nothing (edict 3). `Dock` itself is re-exported and *is* used
(`App.vue:167`) — that row is fine.

**Cure:** the barrel exports `Dock` only; `Dock.vue:4` imports the three producer symbols from
`@mkbabb/glass-ui/dock` like everyone else. One path to the design system, repo-wide.

---

### L-9 · MINOR — per-instance ink and glyph overrides on a producer control (edict 5)

```vue
:95  <component :is="icon" class="w-6 h-6" :style="{ color: accent }" />
:96  <span … class="text-small font-display" :style="{ color: accent }">
```

- **Ink:** `.dock-icon-button` already resolves colour through a token —
  `color: color-mix(in srgb, var(--dock-fg-on-aurora, var(--foreground)) …)` (`icon-button.css`).
  Two inline `color` declarations on two children override it independently. Measured live value:
  `style="color: oklch(0.471189 0.188448 9.83402);"`.
- **Glyph:** `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem) }`. Measured on the
  live dock: `--dock-icon-glyph` computes to `max(calc(max(calc(2.5rem*1),0px)*0.5),1rem)` = **20px**,
  and the sibling "Save edit" control's glyph measures **20×20**. This component's paintbrush
  measures **24×24** (`w-6 h-6`, a Tailwind utility in a later cascade layer than `components`), and
  its arrow **12×12** (`w-3 h-3`). Three glyph scales in one dock, two of them declared per instance.

**Cure:** one root-level declaration on the control —
`:style="{ '--dock-fg-on-aurora': accent }"` — and drop both `w-*/h-*` pairs so the producer's
`--dock-icon-glyph` (or, under `shape="tab"`, the tab's own type scale) governs. If the arrow needs a
smaller glyph than the icon, that is a producer affordance (`--dock-tab-affordance-glyph`), not a
consumer utility. → relay, §6.

---

### L-10 · MINOR — the published library forces a Vue design system on every consumer

`package.json` `dependencies`:

```json
"@mkbabb/glass-ui": "^7.0.0",
"@mkbabb/keyframes.js": "^6.0.0"
```

`grep -rn "@mkbabb" src/` returns **two matches, both doc-comment prose** (`src/subpaths/math.ts:2`,
`src/subpaths/transform.ts:2`). The library source imports neither package. `tsconfig.demo.json`'s own
header states the invariant: *"the library program (tsconfig.lib.json) never [sees glass-ui] (inv-K-1
— structurally glass-ui-free)"*. Yet `npm i @mkbabb/value.js` installs glass-ui 7 + keyframes 6 into
every consumer's tree. Both are demo-only. → `devDependencies`.

---

### L-11 · INFO — the shell/feature boundary is inverted at the directory level

`demo/color-picker/` holds `App.vue`, `index.html`, `router/`, and `composables/boot/` — this is the
**application shell**, named after a feature. The actual picker scene is `demo/picker/`. The dock and
pane router are a third home, `demo/shell/`. So reaching the app's boot authority from the dock
(L-7's cure) means importing `../../color-picker/composables/boot/useOverture`: shell → a
feature-named directory. `Dock.vue` already draws the same class of edge for state
(`:18` → `../../palettes/usePalettePorts`).

No measurement, no user-visible symptom; recorded because the greenfield lattice below cannot be
stated without it.

---

## 4 · God modules and second implementations

- **This SFC is not a god module.** 159 lines; one prop group, one emit, one local machine.
  It gains that rating only by comparison — the machine it owns (L-7) does not belong to it.
- **Second implementations found and evidenced:** the boot-phase predicate (L-7, 4 sites), the
  desktop breakpoint (L-4, 3 mechanisms / 2 predicates), the action-bar concept (L-5, 2 types /
  2 renderers), the dock-primitive import path (L-8, 2 paths), the pressed-state register (L-3,
  producer prop vs hand-rolled classes).
- **The named historical suspects are out of this component's cone and belong to other seats;**
  I did not re-litigate them: `ActionBarLayer`'s local `useLayerTransition` reimplementation
  (`demo/shell/dock/layers/ActionBarLayer.vue`), `demo/palettes/export.ts` + `usePaletteExport.ts`
  vs `export/serializers`, and the three `useDark` stores
  (`demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76`). None is imported by
  `ActionBarToggle.vue`; recorded as scope, not as a finding.

---

## 5 · The greenfield lattice

Structured today with no legacy, the dock's contextual-action feature is **four modules and one
type**, and this component largely ceases to exist.

```
demo/session/action-bar.ts              ← the ONE type + the ONE key
    export interface DockAction { key; icon; title; description; disabled?; handler }
    export interface DockActionBar { label; icon; accent?; actions: Ref<DockAction[]> }
    export const ACTION_BAR_KEY: InjectionKey<Readonly<Ref<DockActionBar | null>>>

demo/session/layout.ts                  ← the ONE breakpoint truth
    export const LAYOUT_KEY: InjectionKey<Readonly<Ref<"desktop" | "mobile">>>
    // written once, from glass-ui useBreakpoint("(min-width:1024px) and (min-aspect-ratio:1.1)")

demo/shell/dock/Dock.vue                ← injects ACTION_BAR_KEY, LAYOUT_KEY, OVERTURE_KEY.
                                           No colorPickerRef. No useMediaQuery. No ?? chains.

demo/shell/dock/ActionBarToggle.vue     ← ~20 lines:
    const bar = inject(ACTION_BAR_KEY)!;      const layout = inject(LAYOUT_KEY)!;
    <DockCrossfade>  <!-- producer owns presence -->
      <DockControl v-if="bar" shape="tab" :active="active"
                   aria-label="Toggle action bar" @click="emit('toggle')"
                   :style="{ '--dock-fg-on-aurora': bar.accent }">
        <component :is="bar.icon" />
        <span v-if="layout === 'desktop'">{{ bar.label }}</span>
        <ArrowRight v-if="layout === 'desktop'" />
      </DockControl>
    </DockCrossfade>
```

What that lattice buys, concretely:

| deleted | why it can go |
|---|---|
| `slotLive`, `settled`, `onSlotSettled`, 3 `is-*` classes, 34 lines of scoped CSS | presence is the producer's (L-7) |
| `.dock-tools-btn { --dock-compact-control-padding … }` | `shape="tab"` *is* the true-button box (L-2) |
| `:class="{'is-active'}"` + `:aria-pressed` | `:active` stamps both, plus the capsule (L-3) |
| the `isDesktop` prop, `Dock.vue:71`'s `useMediaQuery`, both `lg:` utilities | one injected layout truth (L-4) |
| `icon`/`label`/`accent` props + 3 `??` defaults + `visible` | one descriptor, presence = `bar !== null` (L-5) |
| `colorPickerRef`, `onDesktopLeftMount`'s 3-way assign, `:action-bar` | session state is provided, not ref-captured (L-1) |
| `ActionBarLayer` vs `GenericActionBar` fork in `Dock.vue:153-158` | one renderer over one type (L-5) |
| `demo/shell/dock/index.ts`'s producer re-exports | one path to glass-ui (L-8) |

Zero new directories, zero new wrapper components (edict 3 respected): `demo/session/` is the honest
rename of the existing `demo/color-session/`, which already holds `keys.ts` with four `InjectionKey`s
of exactly this shape. Every deletion above is a *removal*, and the two additions are two symbols in
a file that already exists. That is the transposition: **the component stops owning concepts it did
not invent, and shrinks to the one thing it is — a trigger.**

---

## 6 · Relay items for the glass-ui BH inbox (standing edict)

Two producer gaps surfaced, both blocking the §5 lattice:

1. **`.dock-tab-button` has no `gap` token.** `tab-button.css` is `display:inline-flex;
   align-items:center` with no `gap`, so an icon+label+affordance tab needs a consumer declaration.
   Ask: `gap: var(--dock-tab-gap, 0)`. (This is the *only* line of `ActionBarToggle.vue`'s scoped
   block that survives the L-2 cure — measured `gap: 9.304px` from `0.5em` at the live type scale.)
2. **`--dock-compact-control-padding` is unreachable inside `.glass-dock`.** `glass-capsule.css`'s
   `.glass-dock .dock-icon-button` (0,2,0) outranks `.dock-icon-button--compact` (0,1,0) in the same
   `components` layer. Either the compact rule should carry the `.glass-dock` prefix too, or the
   token should be retired from the published surface — a documented hook that silently does nothing
   inside the only container it ships for is a trap, and this repo fell in it (L-2).

---

## 7 · Findings

| id | sev | one line | evidence anchor |
|---|---|---|---|
| L-1 | BLOCKER | Tools trigger 0-width on mobile for all ColorPicker-sourced action bars — presence gated on a desktop-only template ref | `App.vue:38,84-91,104,321-325`; 390w vs 1440w measurements; `shots/safari-mobile-light/picker.png` |
| L-2 | BLOCKER | T-36 "true-button" cure is dead CSS; oracle RED at HEAD; the SFC comment is a false record | CDP cascade; measured `4px` vs declared `8px 12px`; 32px vs 40px; pasted Playwright failure |
| L-3 | MAJOR | `DockControl`'s `active` prop bypassed — no `.glass-capsule`, no `data-active`, legacy register | `ActionBarToggle.vue:88-93`; `dock.js:1152-1157`; measured class list |
| L-4 | MAJOR | "desktop" = 3 mechanisms / 2 predicates; app says mobile while the dock wears desktop furniture | `App.vue:2,310-312`; `Dock.vue:71`; `:82,:103`; 1200×1100 + 1024×960 measurements |
| L-5 | MAJOR | one action-bar concept, two types, two renderers, a `??` chain, 3 anonymous scalars | `color-session/keys.ts:17-27`; `usePaneRouter.ts:49-58`; `Dock.vue:153-158,182-190`; label invariant across 12 routes |
| L-6 | MAJOR | demo types 2 of 7 value.js subpaths against a *different copy* than it runs | `tsconfig.demo.json` paths vs `package.json` exports; md5 `e0968b8…` vs `4309648…`; traceResolution |
| L-7 | MAJOR | boot phase re-derived by frame count against the app's named-predicate law; reachable stuck clip | `useOverture.ts:81`; `App.vue:297`; `ActionBarToggle.vue:50-72`; gradient→about repro |
| L-8 | MINOR | `shell/dock/index.ts` barrel = dual path, used both ways on adjacent lines | `index.ts:2`; `Dock.vue:4,5` |
| L-9 | MINOR | per-instance ink + glyph overrides on a producer control | `:95,:96`; measured 24px vs the dock's 20px |
| L-10 | MINOR | glass-ui + keyframes.js in `dependencies`, unused by `src/` | `package.json`; `grep -rn "@mkbabb" src/` → 2 prose hits |
| L-11 | INFO | shell split across `demo/color-picker/` + `demo/shell/`; boot lives under a feature name | `App.vue` path; `Dock.vue:18` |

**Strongest defect:** L-1 by consequence (a whole action bar with no mobile entry point), L-2 by
proof quality (a gate that is RED at HEAD while its source comment asserts the opposite). Both share
one mechanism family with L-3/L-4/L-5/L-7: **concepts owned in the wrong module** — presence,
breakpoint, pressed-state, boot-phase, and the action-bar descriptor each have a rightful owner
(the producer, the app shell, the session) and each was re-implemented one level down.

## 8 · What is sound

Stated as positive evidence, not as absence of looking:

- Import graph is clean: three specifiers, all legitimate, all correctly typed
  (`import type { Component }` at `:3` — `verbatimModuleSyntax` satisfied).
- `@mkbabb/glass-ui/dock` is a genuine published subpath (verified against glass-ui 7.0.0's
  `exports`), not a repo-only deep path.
- No `src/` reach, no `@src` alias, no deep library import — this component draws **zero**
  boundary-violating edges of its own.
- No animation was deleted to reach any of the above: the SFC declares no `@keyframes`, and its
  transitions ride the shared `--duration-normal` / `--ease-standard` tokens (edict 6 satisfied).
  The §5 lattice *moves* the presence beat to the producer; it deletes no motion.
- Vue 3.5 idioms are correct: reactive props destructure at `:38`, and `watch(() => visible, …)` is
  the correct getter form for a destructured prop.
