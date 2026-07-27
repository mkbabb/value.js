# CHALLENGE-L — library structure — `demo/shell/dock/layers/ActionBarLayer.vue`

*Pass 2 · 2026-07-27 · supersedes `challenge-L-library.pass-1.md` (preserved verbatim alongside).*

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. This
is the tier this seat was explicitly spawned with; it is declared here, not inherited from a parent
seat.

---

## Verdict

**DEFECTIVE.**

The premise holds, and the sharpest defect is one pass 1 got *directionally right and factually
wrong*, which changes both the severity and the cure.

Pass 1 concluded that `.dock-layer` is **orphaned CSS** in glass-ui 7.0.0 — dead rules with no
component owner. That is false. `.dock-layer` is **live, private, and load-bearing**: `GlassDock`
renders exactly two of them — `dock-layer dock-layer--full` and `dock-layer dock-layer--summary` —
as the **expanded↔collapsed shell-pane pair** that the dock's own morph drives. The retired
`<DockLayer>` *faces* moved to `.dock-face`; the `.dock-layer` triple stayed behind as the shell's
private machinery.

So `ActionBarLayer` is not consuming dead CSS. It is **impersonating the dock's own shell panes**,
two levels of nesting below where that contract lives, inside the very element pair whose rules it
is borrowing. I measured the consequence: stamp the producer's `data-morphing` flag on the dock and
`ColorInput`'s content computes **`opacity: 0`, `scale: 0.82`** — driven by
`.glass-dock[data-morphing] .dock-layer.is-active > *`, the shell's stagger rule, reaching two
levels deeper than it was ever written for.

Everything else compounds from that one architectural fact: a consumer took a producer-private
class contract as its integration surface, and got the producer's private behaviour with it.

The successor — `<DockCrossfade>` + `<DockLayer>` — **shipped in the very version W44 adopted**
(`node_modules/@mkbabb/glass-ui@7.0.0/dist/components/dock/index.d.ts:5`), and its own docstring
names this consumer's exact shape. The retirement condition in CARRY-LEDGER §F was satisfied at
adoption and went unchecked for ten days.

**15 findings: 2 BLOCKER · 6 MAJOR · 5 MINOR · 2 INFO.**

---

## Method + environment

- **Repo** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Static.** Every import on the subject traced to its home; grep censuses over `demo/`, `src/`,
  `test/`, `e2e/`; byte-level inspection of the **installed** `node_modules/@mkbabb/glass-ui@7.0.0`
  (the immutable published tarball, never a sibling checkout).
- **Type-resolution.** `npx tsc -p tsconfig.demo.json --noEmit --traceResolution` — a real
  resolution trace, not an inference from the config file.
- **Live.** Playwright against the dev server `http://localhost:9000`, route `/#/`, Chromium,
  1440×900. Four scripted probes; full scripts + raw JSON in §Appendix.
- **Visual.** `D-02-stranded-popover-after-swap.png`, `shot-desktop-light-2-actions.png`,
  `shot-mobile-light-2-actions.png` in this directory, all read as images.

Every number below is pasted from a command or a probe. Where I could not measure something I say
so and label it **HYPOTHESIS**.

---

## §0 — The import graph, edge by edge

`ActionBarLayer.vue` has seven import edges (six statements). Each traced:

| Line | Specifier | Resolves to | Verdict |
|---|---|---|---|
| `:2` | `vue` (incl. `type Ref`) | framework | ✔ inline `type` modifier — `verbatimModuleSyntax` satisfied |
| `:3` | `@lucide/vue` | devDep, also a glass-ui peer | ✔ |
| `:4` | `../../../color-session/keys` | `demo/color-session/keys.ts` | ✘ **inverted ownership** — L-9 |
| `:5` | `type { ActionBarContext }`, same file | — | ✔ marked `import type` |
| `:6-7` | `../ActionToolbar.vue`, `../ColorInput.vue` | `demo/shell/dock/` | ⚠ **directory inversion** — L-15 |
| `:8` | `@mkbabb/glass-ui/dock` | published subpath | ✔ **correct and granular** — the `/dock` subpath, not the root barrel |
| `:9` | `type { EditTarget } from "../../../color-session/color-model"` | — | ✔ marked, but the prop it types is **dead** — L-8 |

**value.js consumption on this edge: none.** This component imports zero symbols from
`@mkbabb/value.js`. That is the correct answer for a dock presentation leaf, and the demo-wide
discipline behind it is intact — see §Negative proof. The one library-boundary defect I found while
establishing that negative is in the demo *program config*, not in any import: **L-11**.

---

# Findings

## L-1 — BLOCKER — the shim squats on `.dock-layer`, glass-ui's **live private shell-pane contract**, and inherits the shell's behaviour two levels down

`ActionBarLayer.vue:88-94` hand-binds the class triple `dock-layer` / `is-active` / `is-leaving`
(plus `inert`) onto its two sub-layers.

### The correction: those classes are not orphaned — they are the dock's own morph panes

```
$ node -e '…scan dist/dock.js for standalone "dock-layer"…'
--- 1 ---
"…M(\"div\", { ref_key: \"layersEl\", ref: _, class: \"dock-layers\" }, [
   M(\"div\", { ref_key: \"fullEl\", ref: v,
     class: L([\"dock-layer dock-layer--full\", { \"is-active\": J(W) === \"full\",
                                                  \"is-leaving\": … }]),
     inert: J(W) !== \"full\" && J(ae) !== \"full\" || void 0 }, …"
--- 2 ---
"…M(\"div\", { ref_key: \"summaryEl\", ref: y,
     class: L([\"dock-layer dock-layer--summary\", { \"is-active\": J(W) === \"summary\",
                                                     \"is-leaving\": J(te) === \"summary\" }])…"
```

`GlassDock` renders **exactly two** `.dock-layer` elements — the expanded (`--full`) and collapsed
(`--summary`) shell panes — and drives their `is-active` / `is-leaving` / `inert` triple from the
dock's own expand↔collapse state machine. `<DockLayer>` *faces* render `.dock-face`
(`DockLayer.vue.d.ts`: *"renders its content in a `.dock-face` host"*).

Live DOM census, route `/#/`, action bar open (probe 2):

```json
{ "dockLayerEls": 4, "dockFaceEls": 4, "dockLayerGridEls": 1 }
```

Four `.dock-layer` elements. Two are the producer's shell panes. **Two are ours** — and ours are the
only ones in the tree that a hand-written template put there:

```
$ grep -rn '"dock-layer"' demo/ | wc -l
1
   → demo/shell/dock/layers/ActionBarLayer.vue:91
```

### The measured consequence: the shell's stagger machinery reaches into `ColorInput`'s content

`layers.css` (producer, `dist/components/dock/styles/layers.css`) carries:

```css
.glass-dock[data-morphing] .dock-layer.is-active > * {
    --child-reveal: clamp(0, calc((var(--dock-expand-t) - var(--dock-stagger-onset))
                                  / var(--dock-stagger-window)), 1);
    opacity: var(--child-reveal);
    scale: calc(0.82 + 0.18 * var(--child-reveal));
    transform-origin: center;
}
```

Because our sub-layers wear `.dock-layer.is-active`, this selector matches **their** children.
Probe 4 stamped `data-morphing` on `.glass-dock`, sampled, and reverted:

| sample | `ColorInput`'s content root (`.relative.w-full.flex…`) |
|---|---|
| before | `opacity: 1`, `scale: none` |
| **`data-morphing` stamped** | **`opacity: 0`**, **`scale: 0.82`** |
| after revert | `opacity: 1`, `scale: none` |

The same probe's `querySelectorAll('.dock-layer.is-active > *')` scoped *inside our grid* returned
that element — the selector genuinely matches through the nesting.

Our sub-layers also inherit, measured at rest: `min-height: 40px`, `gap: 6px` (ColorInput reads
`8px 6px` — its own `gap-y-2` on the row axis, the producer's `6px` on the column axis),
`white-space: nowrap`, `grid-area: 1 / 1`, and the `position: absolute|relative` +
`opacity`/`visibility`/`pointer-events` triple. **Some of that is load-bearing** — see the
retirement condition in §Cure, which is why "just delete the class" is not the cure.

### Mechanism

A consumer adopted a **private, untyped, unexported CSS class contract** as its integration surface,
at a nesting depth the producer never designed for. Nothing in the type system, the build, or CI can
see this edge: `class="dock-layer"` is a string. A glass-ui **patch** release that re-scopes those
rules to a direct child (`.dock-layers > .dock-layer`) — a perfectly reasonable internal tightening —
silently changes our sub-layer stacking, and no test in this repo would notice.

**Severity BLOCKER** because it is an unversioned coupling to producer internals that carries live
behaviour, not merely dead styling.

---

## L-2 — BLOCKER — the crossfade the shim exists to provide **does not happen**

`ActionBarLayer.vue:62` declares `SUB_LAYER_CROSSFADE_MS = 260` and `:71-79` holds `leavingLayer`
for that window. Measured across the full swap (probe 2, `/#/`, click
`[aria-label="Open color input"]`):

| phase | leaving face | entering face |
|---|---|---|
| rest | `opacity 1`, `visibility visible`, `position relative`, w 184 | `opacity 0`, `visibility hidden`, `position absolute`, `inert`, w 302 |
| **swap + 50 ms** | `opacity 0`, `visibility visible`, `position absolute`, `inert`, w 443 | `opacity 1`, `visibility visible`, `position relative`, w 325 |
| swap + 260 ms | `opacity 0`, `is-leaving` cleared, `inert` | `opacity 1` |
| swap + 460 ms | `opacity 0`, `visibility visible`, `inert` | `opacity 1` |

`transition-property` is **`visibility`** and `transition-duration` **`0s`** in *every* sample, on
*both* faces — that is the only transition `layers.css` declares for `.dock-layer`:

```css
:where(.glass-dock, .dock-layer-group) .dock-layer { transition: visibility 0s linear var(--duration-normal); }
```

Opacity is exactly `0` or exactly `1`. Never in between. **There is no crossfade.** In glass-ui 7,
`.dock-layer` opacity is only ever animated by the dock's *own* morph scalar
(`.glass-dock[data-morphing] .dock-layer.is-leaving { opacity: calc(1 - var(--dock-morph-t)) }`) —
which is not running during a sub-layer swap. The real crossfade lives in `crossfade.css`, on
`.dock-crossfade[data-crossfading] > .dock-face`, and our elements are not `.dock-face`.

So the 260 ms timer buys exactly one thing: it keeps an `opacity: 0`, `inert` node at
`visibility: visible` for a quarter second, then hands it to a *further* `0.3s` visibility delay
(measured `transition-delay: 0.3s` on the non-active face). Measured at swap + 460 ms the leaving
face is **still** `visibility: visible`.

**Mechanism.** The shim reproduces the retired composable's *two-refs signature* and none of its
*packaging*. `useLayerTransition` was never the mechanism — the CSS was, and glass-ui moved the CSS
to a different class when it folded the machine into `<DockCrossfade>`. Reproducing the signature
without the packaging yields a state machine that computes correct values that nothing reads.

`:67`'s `void opts.containerEl; // signature parity with the retired producer composable` is the
file's own admission: it is preserving the *shape* of an API whose *substance* it does not have.
Signature parity with a deleted symbol is, by construction, a back-compat shim — **edict 2**.

---

## L-3 — MAJOR — `.dock-layer-grid` matches **zero** rules; the absolute face escapes its containing block

`ActionBarLayer.vue:101` names the container `dock-layer-grid`. Probe 1 walked every rule in every
loaded stylesheet:

```json
{ "needle": "dock-layer-grid", "sheets": 48, "blocked": 0, "count": 0, "sample": [] }
{ "needle": ".dock-layer",     "sheets": 48, "blocked": 0, "count": 61 }
{ "needle": ".dock-face",      "sheets": 48, "blocked": 0, "count": 11 }
```

**Zero of 48 stylesheets** define anything matching `dock-layer-grid`. Measured computed style:
`display: block`, `position: static`. The producer's real container class is `.dock-layers`
(`:where(.glass-dock, .dock-layer-group) .dock-layers { display: grid; min-width: 0 }`). The name is
one character off a live producer class and matches nothing.

Consequence, measured: the inactive face takes `position: absolute; inset: 0` from the borrowed
`.dock-layer` rule, but its nominal parent is `static`, so `inset: 0` resolves against the
**grandparent** `.dock-face.is-active` (`position: relative`, from `crossfade.css`):

| sample | `.dock-layer-grid` width | inactive/leaving face width | delta |
|---|---:|---:|---:|
| boot (actions active) | 184 px | 448 px | **+264 px** |
| action-bar open | 184 px | 302 px | +118 px |
| swap + 50 ms | 325 px | 443 px | +118 px |

The face is consistently wider than the box it is nominally inside. It paints nothing today because
it is also `opacity: 0` — but every measurement of that box (a peak reserve, an overflow fit, a
focus-scroll) reads a wrong number by construction. `grid-area: 1 / 1` is computed on both faces and
is **inert** in a `display: block` parent.

*(The Dock seat found the zero-rule fact on the Dock subtree — `shell-dock-dock/challenge-L-library.md:304-308`.
The containing-block escape and the three paired width deltas are measured here, on this component's
own children.)*

---

## L-4 — MAJOR — no peak reserve: the dock plate snaps **141 px in one frame**

Probe 2, `.glass-dock` bounding width:

| | `.dock-layer-grid` | dock plate |
|---|---:|---:|
| mode `actions` (rest) | 184 px | **326 px** |
| mode `input` (+50 ms) | 325 px | **467 px** |

**+141 px, +43 %, with no intermediate frame.** `min-inline-size: auto` at every sample. The shim
has no size machinery at all, and `:67`'s `void opts.containerEl` discards the one handle that could
have measured it.

The producer's `reserve` prop exists for exactly this axis:

> *"`inline` reserves the peak WIDTH (a horizontal control run). The opacity crossfade is
> axis-agnostic — only the peak reserve axis differs."*
> — `DockCrossfade.vue.d.ts`, `__VLS_Props.reserve`

**Ruling needed, not a one-word fix.** `reserve="inline"` pins the plate to the peak face — it kills
the snap but makes the resting dock permanently **467 px instead of 326 px** (+43 % at rest, on
every route, whether or not the input is ever opened). `reserve="block"` (the default) reserves
height only and leaves the inline snap. Both numbers are measured above; the wave owner should rule
which cost the design accepts. Pass 1 prescribed `inline` without pricing it.

---

## L-5 — MAJOR — the outgoing face's portalled popover **survives the swap**; the antidote is held and never called

`D-02-stranded-popover-after-swap.png` (this directory, read as an image) shows the `ActionToolbar`
"Copy color" popover superimposed on `ColorInput`'s own "Enter a color" popover, both open, after the
sub-layer swap.

**Reproduced live** (probe 3): hover `button[aria-label="Copy color"]` inside the actions face, wait
past the 300 ms open-delay, click the toggle, wait 700 ms.

```json
"afterHover": { "portals": 2, "texts": ["Home…", "Copy colorClick to copy the current color to the c"] },
"afterSwap":  { "portals": 2, "texts": ["Home…", "Copy colorClick to copy the current color to the c"] },
"faces": [ { "cls": "… dock-layer", "inert": true,  "op": "0" },
           { "cls": "… dock-layer is-active min-w-0", "inert": false, "op": "1" } ]
```

The popover content is **still in the document** after the swap, while its owning face is `inert`
and `opacity: 0`.

**Mechanism, and it is a structural one.** The shim hides the outgoing face by *class* only:
`opacity: 0` + `inert` on the face element. `ActionButton`'s popover is **portalled to the body**
(`demo/shell/dock/ActionButton.vue:2-45`, glass-ui `Popover`/`PopoverContent`), so neither the
opacity nor the `inert` reaches it, and its open state is `isOpen = activeHover === hoverKey`
(`ActionButton.vue:81`) reading `ActionToolbar`'s **local** `activeHover` ref
(`ActionToolbar.vue:85`), which the swap does not touch because the component is never unmounted.
A class-only swap has no lifecycle event for the outgoing face; a component swap would.

**The exact indictment.** `ActionToolbar.vue:87-91` exposes `clearHover()` — the dismissal hook, by
name. `ActionBarLayer.vue:29` declares `actionToolbarRef` and `:103` binds it — the handle. **The
call is never made.** The dead template ref of L-12 is not merely dead: it is the un-fired antidote
to this defect.

**Derived consequence — labelled HYPOTHESIS, not measured.** `ActionButton.vue:83-87` calls
`dock?.keepOpen()` on popover-open and `dock?.release()` on popover-close. A popover stranded open
never emits its close, so the `release()` never runs and the dock's ref-counted hold leaks by +1.
Reproduction requires waiting out the 5000 ms `collapse-delay` (`Dock.vue:132`) with the action bar
already dismissed; I did not run it.

---

## L-6 — MAJOR — `provide(COLOR_MODEL_KEY, …)` at `:22` is a provable identity no-op, and its comment states a false reason

```
demo/shell/dock/layers/ActionBarLayer.vue:21  // Re-provide COLOR_MODEL_KEY so ColorInput works unchanged
demo/shell/dock/layers/ActionBarLayer.vue:22  provide(COLOR_MODEL_KEY, actionBar.colorModel);
```

Object identity, traced end to end:

1. `demo/color-picker/App.vue:257` — `provide(COLOR_MODEL_KEY, pipeline);`
2. `demo/picker/ColorPicker.vue:172` — `const colorModel = inject(COLOR_MODEL_KEY)!;` → **that same `pipeline`**
3. `demo/picker/ColorPicker.vue:315,321` — `colorModel` is placed into `actionBarContext`
4. `demo/color-picker/App.vue:35-39` — `<Dock :action-bar="colorPickerRef?.actionBarContext ?? null">`,
   rendered **inside App's own template**, therefore inside App's provide scope
5. `ActionBarLayer.vue:22` re-provides that identical object under the identical key

`ColorInput` (`ColorInput.vue:155`) already resolves `COLOR_MODEL_KEY` from App without this line.
The comment's premise — that `ColorInput` needs it — is untrue.

The knock-on is larger than the line. **`ActionBarContext.colorModel` exists solely to feed this
no-op:**

```
$ grep -rn "actionBar\.\(colorModel\|cssColorOpaque\|formattedCurrentColor\)\|actionBarContext\." demo/
demo/shell/dock/layers/ActionBarLayer.vue:22    ← the only hit in the tree
```

**Cure.** Delete `:21-22`; delete `colorModel` from `ActionBarContext` (`keys.ts:23`) and from
`ColorPicker.vue:321`. A `UseColorPipelineReturn` — the whole colour pipeline — stops travelling
through a dock presentation prop.

---

## L-7 — MAJOR — `ActionToolbar` is a hand-unrolled duplicate of its own sibling `GenericActionBar`

Two files, one concept, rendered twice:

| | `GenericActionBar.vue` | `ActionToolbar.vue` |
|---|---|---|
| root | `<div class="flex items-center justify-around flex-1">` `:15` | `<div class="flex items-center justify-around flex-1">` `:2` |
| child | `<ActionButton v-for="act in actions">` `:16` | 5 hand-written `<ActionButton>` `:3-59` |
| hover model | `const activeHover = ref<string \| null>(null)` `:11` | `const activeHover = ref<string \| null>(null)` `:85` |
| data | `DockAction[]` prop (`usePaneRouter.ts:38`) | hardcoded icon/title/description literals |

Identical root, identical child component, identical local hover model. `ActionToolbar` then
re-declares five emits (`:77-83`) that `ActionBarLayer.vue:109-113` forwards straight back into
`actionBar.reset()/copy()/random()` and its own two emits — a full round trip that exists only
because the five actions are literals instead of `DockAction[]` rows.

`Dock.vue:156-157` renders the two as a mutual exclusion, which is the tell:

```vue
<ActionBarLayer   v-if="actionBar"        … />
<GenericActionBar v-else-if="genericBar"  … />
```

**Cure.** Delete `ActionToolbar.vue`. `ColorPicker` already owns all five handlers — have it publish
them as `DockAction[]`. One renderer, one contract. This collapses with L-9.

---

## L-8 — MAJOR — the `editTarget` prop is drilled through **four** components and read by none

`ActionBarLayer.vue:13` declares `editTarget: EditTarget | null`; `:118` binds it to `ColorInput`.
That binding is the prop's *only* use in this file. And in `ColorInput`:

```
$ grep -n "editTarget" demo/shell/dock/ColorInput.vue
139:    editTarget: EditTarget | null;
```

**One hit — the declaration.** `ColorInput.vue:138` destructures only `{ proposeMode }`; `editTarget`
is never read in its script or its template.

So the chain `App.vue:37` → `Dock.vue:31` → `ActionBarLayer.vue:13` → `ColorInput.vue:139`
terminates in nothing. (`Dock`'s own copy *is* live — `Dock.vue:72-73,136` — so the drill is dead
only from `ActionBarLayer` down. Two of the four hops, plus the `import type { EditTarget }` at
`ActionBarLayer.vue:9` that exists to type it.)

**And the concept already has a DI home.** `EDIT_TARGET_KEY` is declared at `keys.ts:15`, provided by
`App.vue:270`, and consumed by injection at
`demo/palettes/browser/card/composables/useSwatchActions.ts:23`. One concept, two transport
mechanisms, one of them dead end-to-end. **Edict 2** (dual paths).

**Cure.** Delete the prop from `ActionBarLayer` and `ColorInput` and the binding at `Dock.vue:156`.
If `ColorInput` ever needs the edit target, it injects `EDIT_TARGET_KEY` like every other consumer.

---

## L-9 — MAJOR — the dock's action-bar contract has **two homes**, and neither is the dock

| contract | declared at | consumed by |
|---|---|---|
| `ActionBarContext` (8 fields) | `demo/color-session/keys.ts:17-28` | `Dock.vue:22,31`, `ActionBarLayer.vue:12`, `ColorPicker.vue:315` |
| `DockActionBar` / `DockAction` | `demo/shell/usePaneRouter.ts:38,49` | `Dock.vue:24`, `GenericActionBar.vue:4` |

One concept — *the run of actions the dock shows for the current view* — modelled twice: once in a
**colour-domain** key module, once in a **router** module. `Dock.vue:31` declares both as props and
`:156-157` renders them as an either/or. The dock, the sole owner of the concept, owns neither
declaration.

`ActionBarLayer` sits at the bottom of the worse of the two: it reaches three directories up
(`../../../color-session/keys`) to learn the shape of a *dock* prop.

**Cure.** One `demo/shell/dock/action-bar.ts` owning a single `DockActionBar` shape. `ColorPicker`
and `usePaneRouter` both *produce* it. `Dock` consumes one prop and renders one component.

---

## L-10 — MINOR — the whole exposed API of this component, and both of its component refs, are dead

`ActionBarLayer.vue:96` — `defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode })`.

```
$ grep -rn "currentToggleIcon\|cycleToolbarMode\|toolbarMode" demo/ e2e/ test/ | grep -v "layers/ActionBarLayer.vue"
(no output)
```

`Dock.vue:156` mounts `<ActionBarLayer>` with **no `ref`** — nothing can reach the exposed members.
Three template refs are declared, bound, and never read:

- `colorInputRef` — `:28` declared, `:116` bound, zero reads
- `actionToolbarRef` — `:29` declared, `:103` bound, zero reads — **and it is the L-5 antidote**
- `subLayerGridEl` — `:83` declared via `useTemplateRef`, `:101` bound, passed to the shim at `:86`,
  and discarded by the shim itself at `:67` (`void opts.containerEl`)

A template ref that exists only to be `void`-ed is the clearest possible statement that the shim is
a shape, not a mechanism.

---

## L-11 — MINOR — `tsconfig.demo.json` declares a value.js public surface that **does not exist**

This is the seat's charter question — *does the demo speak the published subpath map?* — answered
against the map itself.

```
$ node -e 'console.log(Object.keys(require("./package.json").exports).join(" "))'
./color ./value ./css ./easing ./math ./transform ./quantize          ← 7 keys, NO "." root
$ node -e 'const p=require("./package.json"); console.log(p.main, p.module, p.types)'
undefined undefined undefined
```

`tsconfig.demo.json:38-47` declares **eight** `paths` entries. Three of them name specifiers the
`exports` map does not publish, pointing at files that are not on disk:

```
$ for f in dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts; do …
dist/index.d.ts                    ABSENT
dist/subpaths/parsing.d.ts         ABSENT
dist/subpaths/units.d.ts           ABSENT
```

`/parsing` and `/units` were retired at value 4.0.0 (superseded by `/css` and `/value`); the bare `.`
root was never published at all. Meanwhile the config **omits** the two subpaths that *are*
published and *are* used:

```
$ grep -rhno "@mkbabb/value\.js[a-z./]*" demo/ | sed 's/.*://' | sort | uniq -c | sort -rn
  25 @mkbabb/value.js/color
  10 @mkbabb/value.js/css        ← published, used 10×, NO paths entry
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize
   1 @mkbabb/value.js            ← a COMMENT: demo/shared/utils.ts:12
$ grep -rn "@mkbabb/value.js/\(parsing\|units\)" demo/ test/ e2e/ | wc -l
0
```

And the config's own comment asserts the false version of this: *"the `exports` map is a CLOSED
8-key set"* and *"the bare `.` root + the 7 subpath barrels"*. It is 7 keys and no root.

**I falsified my own first hypothesis here, and the falsification is the finding.** I expected
`/css` to fall through to the self-installed `node_modules/@mkbabb/value.js@4.0.0` copy — whose
`css.d.ts` is byte-different from this checkout's build (`md5 4309648d…` vs `e0968b8d…`, 10 910 vs
12 490 bytes) — giving a genuine split artifact. A real resolution trace says otherwise:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "@mkbabb/value.js/css"
======== Module name '@mkbabb/value.js/css' was successfully resolved to
'/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' with Package ID
'@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

It resolves to **this checkout's build**, via package **self-reference** (the demo lives inside the
package whose `name` is `@mkbabb/value.js`, and `exports` is defined, so Node/TS self-reference
applies). Same target as Vite's generated alias. **No live break.**

So the defect is precisely scoped: **the demo program's declared library surface is a false record.**
Three `paths` entries name a public API that no longer exists; two real ones are undeclared and work
only by a mechanism the config never mentions; and the comment documenting all of it is wrong. It
compiles today because self-reference silently covers the gap — which is exactly the condition under
which a stale config survives a major version. **Edict 2**, at config granularity.

**Cure.** Generate `tsconfig.demo.json#paths` from `package.json#exports`, the way `vite.config.ts`
already generates its alias set (`vite.config.ts:41-52`) — one source, two consumers, no drift
possible. Delete the three dead entries and the "8-key" comment.

---

## L-12 — MINOR — two template-ref idioms in one 158-line file

`:28-29` use the pre-3.5 form `ref<InstanceType<typeof X> | null>(null)`; `:83` uses
`useTemplateRef<HTMLElement>("subLayerGridEl")`. One file, one concept, two idioms — **edict 7**.
(All three are dead — L-10 — so the fix is deletion, not conversion, except for `actionToolbarRef`
which should become live per L-5.)

---

## L-13 — MINOR — the component styles its children's **root elements** from the outside

`:104` and `:117` spread `v-bind="subLayerProps('actions'|'input')"` onto `<ActionToolbar>` and
`<ColorInput>`, pushing `class: ["dock-layer", …]` and `inert` onto **another component's root**
through attribute fallthrough. Measured root classes (probe 2) confirm the merge:

```
"flex items-center justify-around flex-1 dock-layer is-active"     ← ActionToolbar's own root
"grid grid-cols-1 gap-y-2 p-0 m-0 dock-layer is-active min-w-0"    ← ColorInput's own root
```

Layout, stacking, visibility, inertness and (per L-1) morph-stagger participation of two components
are decided by a class neither has heard of. This is the per-instance-override shape **edict 5**
forbids, one level up.

The producer's answer is a **host**: `<DockLayer id="…">` wraps the child and owns `.dock-face`
itself, leaving the child's root untouched.

---

## L-14 — INFO — `SUB_LAYER_CROSSFADE_MS = 260` is untokenized, off-scale, and races a 300 ms delay

`:62`. The demo's duration scale (`demo/DESIGN.md:210-213`) is **200 / 300 / 450 / 550 ms**. 260 is
none of them. The CSS it shadows carries `--duration-normal` (measured `transition-delay: 0.3s`) as
the visibility hand-off. The shim clears `is-leaving` at 260 ms — 40 ms *before* that delay expires —
and the face then enters a fresh 300 ms delay. Measured at swap + 460 ms the leaving face is still
`visibility: visible`.

`<DockCrossfade>` removes the question entirely: the overlap rides the one dock spring
(`useDockSpring`, *"velocity-continuous + interruptible"* — `DockCrossfade.vue.d.ts`), not a
`setTimeout`.

---

## L-15 — INFO — directory inversion, plus a re-export dual path and module cycle one level up

```
$ grep -rn "ColorInput"    demo/ | grep -v "^demo/shell/dock/ColorInput.vue"    → ActionBarLayer.vue only
$ grep -rn "ActionToolbar" demo/ | grep -v "^demo/shell/dock/ActionToolbar.vue" → ActionBarLayer.vue only
```

`demo/shell/dock/ActionToolbar.vue` and `demo/shell/dock/ColorInput.vue` sit in the dock **root**, as
if they were shared dock furniture. Each has exactly one consumer, one directory *deeper*. The
physical tree asserts the opposite of the dependency truth.

One level up, `demo/shell/dock/index.ts` re-exports three producer symbols under a demo path:

```ts
export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
export { default as Dock } from "./Dock.vue";
```

`Dock.vue:4` imports them from `"./"`, `Dock.vue:5` imports `DockControl, DockSeparator` from
`@mkbabb/glass-ui/dock` **directly**, and `ActionBarLayer.vue:8` also imports directly. Two paths to
one producer surface, and `Dock.vue → ./index.ts → Dock.vue` is a genuine module cycle. *(Cycle
credited to the Dock seat, `shell-dock-dock/challenge-L-library.md` L-11; recorded here because the
retirement lands in the same file pair as L-1's cure.)*

---

# The exact retirement condition for the shim

The brief asks for this precisely. Here it is.

**The condition is already met.** CARRY-LEDGER §F says *"retire the shim at the consuming wave (W47)
if glass ships a successor."* Glass shipped it **in 7.0.0 — the version W44 adopted**:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/dock/index.d.ts | sed -n '5p'
export { default as DockCrossfade } from "./DockCrossfade.vue";
$ grep -rn "useLayerTransition" node_modules/@mkbabb/glass-ui/dist/
(no output)
```

`node_modules/@mkbabb/glass-ui/package.json` → `"version": "7.0.0"` — an immutable published
artifact, not a sibling checkout. INBOX I-18 recorded the same verification on 2026-07-24 and ruled
**RETIRE, clean break, no alias**. The shim's own comment at `:55` already names `DockCrossfade`.

**There is no remaining condition. The retirement is unblocked as of 7.0.0's install date
(node_modules mtime `Jul 17 21:10`).**

## The cure, and what must be carried across

Delete `:53-94` (shim + `subLayerProps`) and `:28-29,83` (dead refs), and compose the producer:

```vue
<DockCrossfade :active="toolbarMode === 'actions' ? 'actions' : 'input'" reserve="…">
  <DockLayer id="actions"><ActionToolbar … /></DockLayer>
  <DockLayer id="input"><ColorInput … /></DockLayer>
</DockCrossfade>
```

Nesting is legal and intended: `DockCrossfade` keeps a **module-local** injection key
(`DOCK_CROSSFADE_KEY`, `dockCrossfadeContext.d.ts`) explicitly *"DISTINCT from `DockContext`"*, so
Vue's nearest-ancestor injection binds the inner `<DockLayer>`s to the inner crossfade and leaves the
outer `<DockLayerGroup>`'s face registry untouched. The producer docstring names this consumer by
shape:

> *"The controlled-no-rail 5-pane case (a consumer) consumes this DIRECTLY: a no-selection face-swap
> does NOT route through a selection engine."*

**Style equivalence — what the borrowed `.dock-layer` currently supplies, and what replaces it.**
This table is the retirement's real risk register; "just delete the class" would regress three
measured properties.

| currently inherited from `.dock-layer` (measured) | successor source |
|---|---|
| `white-space: nowrap` | `.dock-crossfade > .dock-face > .dock-face-content { white-space: nowrap }` ✔ |
| `gap: 6px` (column axis) | `.dock-face-content { gap: var(--dock-layer-gap, 0.375rem) }` ✔ (0.375rem = 6px) |
| `display: flex; align-items: center` | `.dock-face-content { display: flex; align-items: center }` ✔ |
| `position: absolute/relative` + `inset: 0` overlay | `.dock-crossfade > .dock-face` grid-area overlay ✔ **and correctly parented** (L-3 cured) |
| `opacity`/`visibility`/`pointer-events` swap | `.dock-crossfade[data-crossfading] > .dock-face` on `--dock-t` ✔ **and actually animated** (L-2 cured) |
| `min-height: 40px` | ✘ **not carried** — `<DockCrossfade>` reserves the *peak face*, not a fixed 40px. Verify the actions face still meets the dock's control height; if it does not, that is a `--dock-layer-height` question for the dock root, not a per-instance min-height |
| the morph-stagger bleed (L-1) | ✔ **gone** — `.dock-face` is not `.dock-layer`, so the shell rule no longer matches |

**Open ruling for the wave:** `reserve="inline"` (kills the 141 px snap, costs +141 px at rest) vs
`reserve="block"` (default, keeps the snap). Numbers in L-4.

**Also required in the same cut, or the swap regresses:** L-5's popover dismissal. `<DockCrossfade>`
transfers *focus* on dissolve but says nothing about portalled overlays. Either call
`ActionToolbar.clearHover()` on the outgoing face, or — better, and the KISS answer — make
`activeHover` die with the face by letting `<DockLayer>` own the mount. If glass-ui does not intend
faces to unmount, that is the **next honest relay mark to BI**: *"a dissolving face's portalled
overlays are not dismissed; consumer evidence attached (`D-02-stranded-popover-after-swap.png`)"* —
the successor to mark M2, now that M2 itself is discharged.

---

# Negative proof — what I checked and found sound

The seat asks for the demo→library edge to be judged, not assumed. It is **sound**, and here is the
positive evidence for that negative:

1. **Every value.js specifier in the demo is a published subpath.**
   ```
   $ grep -rn "@mkbabb/value\.js/\(dist\|src\)\|from \"@src" demo/ | wc -l
   0
   ```
   Zero deep imports, zero `dist/` reaches, zero `@src` in the demo tree. The only bare
   `@mkbabb/value.js` occurrence in `demo/` is prose in a comment (`demo/shared/utils.ts:12`,
   warning against exactly that import). Every runtime specifier is one of `/color /css /math
   /easing /quantize` — all five are real keys in `package.json#exports`. **A real consumer could
   write every import this demo writes.**

2. **This component consumes glass-ui through the granular published subpath**, `@mkbabb/glass-ui/dock`
   (`:8`), not the root barrel — the correct edge.

3. **`verbatimModuleSyntax` is satisfied** at every type-only import here (`:2` inline `type Ref`,
   `:5`, `:9`).

4. **The producer artifact is the published one.** `node_modules/@mkbabb/glass-ui/package.json` →
   `7.0.0`, a plain directory (not a symlinked worktree). Every producer claim in this report was
   checked against it.

5. **glass-ui itself only uses value.js subpaths** — `@mkbabb/value.js/color` ×5, `/css` ×3,
   `/easing` ×1, no root — so the missing `.` export is not a live constellation break either.

---

# If I were structuring this greenfield today

Concretely, with no legacy. The action bar is **one concept with two producers and one renderer** —
today it is two concepts, two renderers, three homes, and a hand-rolled swap.

```
demo/shell/dock/
├── Dock.vue                    the shell: GlassDock + DockLayerGroup + the four faces.
│                               ONE action-bar prop. No either/or render.
├── action-bar.ts               ← THE contract. `DockAction`, `DockActionBar`.
│                               Replaces BOTH `ActionBarContext` (color-session/keys.ts:17)
│                               and `DockActionBar` (usePaneRouter.ts:49).
│                               The dock owns the dock's shape.
└── action-bar/
    ├── ActionBarFace.vue       ← the ONE renderer. Composes:
    │                               <DockCrossfade :active reserve>
    │                                 <DockLayer id="actions"><ActionRun :actions/></DockLayer>
    │                                 <DockLayer id="input"><ColorInput/></DockLayer>
    │                               No shim. No .dock-layer. No setTimeout. No provide.
    ├── ActionRun.vue           ← ex-GenericActionBar. v-for over DockAction[]. The ONLY
    │                             action renderer; ActionToolbar.vue is DELETED and its five
    │                             literals become rows ColorPicker publishes.
    ├── ActionButton.vue        moves down beside its only consumer (L-15 cured)
    └── ColorInput.vue          moves down beside its only consumer (L-15 cured);
                                loses the dead `editTarget` prop (L-8); injects
                                EDIT_TARGET_KEY if it ever needs one.
```

Producers stay where they belong: `ColorPicker` publishes a `DockActionBar` (it already owns the five
handlers), `usePaneRouter` publishes a `DockActionBar` (it already does). Neither the colour domain
nor the router declares the dock's shape.

The measurable products of the transposition:

| | today | greenfield |
|---|---|---|
| homes for "the dock's action run" | 3 (`keys.ts`, `usePaneRouter.ts`, hardcoded in `ActionToolbar`) | 1 (`action-bar.ts`) |
| renderers for an action run | 2 (`ActionToolbar`, `GenericActionBar`) | 1 (`ActionRun`) |
| producer-private classes hand-bound | 1 (`.dock-layer`, 61 rules) | 0 |
| classes matching zero rules | 1 (`.dock-layer-grid`) | 0 |
| swap mechanism | `setTimeout(260)` + class strings | one producer spring |
| dead template refs / exposes | 3 refs + 1 `defineExpose` + 2 dead props | 0 |
| `provide(K, inject(K))` no-ops | 1 | 0 |
| lines in the subject SFC | 158 | ~70 (the mode machine + the toggle; the rest is composition) |

**Elegance test:** after the transposition, `ActionBarLayer.vue` contains a three-state mode machine,
one icon computed, and a template that composes two producer components. That is a component. What
is there today is a component *plus a private reimplementation of a producer subsystem*, and the
reimplementation is the part that does not work.

---

# Appendix — probes

All against `http://localhost:9000`, Chromium via Playwright MCP, 1440×900, route `/#/`. The dev
server's one console error is a pre-existing dev-config warning (`VITE_API_URL` unset), unrelated to
this component.

**Probe 1 — stylesheet rule census.** Walked `document.styleSheets` (48 sheets, 0 CORS-blocked),
recursing into grouping rules, counting `selectorText` matches. Result in L-3.

**Probe 2 — the swap, sampled.** Snapshot function reading `.dock-layer-grid` + its two children
(className, `inert`, opacity, visibility, position, transition property/duration/delay, bounding
width/x) and the `.glass-dock` plate width. Sequence: boot → click
`[aria-label="Toggle action bar"]` → wait 700 ms → click `[aria-label="Open color input"]` → sample
at +50 / +260 / +460 ms. Results in L-1, L-2, L-3, L-4, L-13.

**Probe 3 — the stranded portal.** Dispatched `pointerenter/pointerover/mouseenter/mouseover` on
`.dock-layer button[aria-label="Copy color"]`, waited 700 ms past the 300 ms open-delay, counted
`[data-reka-popper-content-wrapper]` nodes and their text, clicked the toggle, re-counted after
700 ms. Result in L-5.

**Probe 4 — the morph-stagger bleed.** Read the sub-layers' and their children's computed
`opacity`/`scale`; stamped `data-morphing` on `.glass-dock`; re-read after 30 ms; **reverted the
attribute**; re-read to confirm restoration. The mutation was temporary and reverted; the page was
re-navigated afterwards to leave a clean state for other seats. Result in L-1.

**Static commands** are pasted inline at each finding. The `--traceResolution` run in L-11 was a full
`vue-tsc`-equivalent `tsc -p tsconfig.demo.json --noEmit` pass.

---

# Delta against pass 1

Recorded so the wave can see what changed and why, rather than diffing 700 lines.

**Corrected.** Pass 1's L-1 called `.dock-layer` *orphaned CSS with no component owner* on the
strength of `grep -rl '"dock-layer"' dist` returning nothing. That grep searched for the exact
JS string literal `"dock-layer"`; glass emits it as `"dock-layer dock-layer--full"` inside a
`normalizeClass` array, so the literal never appears alone. `.dock-layer` is **live private
shell-pane machinery**, which raises the severity (it carries behaviour, not just styling) and adds
the measured morph-stagger bleed.

**Falsified.** Pass 1 did not raise it, but I pursued and disproved a split-artifact hypothesis at
the value.js type boundary — resolution goes through package self-reference to this checkout's
`dist/`. The residue is the narrower, real L-11.

**New.** L-5 (stranded portal, reproduced + the un-fired `clearHover` antidote), L-8 (the dead
four-hop `editTarget` drill), L-11 (the stale `tsconfig.demo.json` surface), the style-equivalence
carry table in §Retirement, and the priced `reserve` ruling in L-4 (pass 1 prescribed `inline`
without its +141 px resting cost).

**Confirmed independently.** The 141 px plate snap, the zero-rule `.dock-layer-grid`, the
`transition-property: visibility / 0s` measurement, the `provide` identity no-op, the dead
`defineExpose`/refs/props, and the `DockCrossfade` successor's presence in the installed 7.0.0.

**Mobile capture note (INFO).** `shot-mobile-light-2-actions.png` in this directory, labelled the
*actions* state, shows the picker card with **no action-bar run visible** — the state was not reached
in that capture run. That is a states-harness observation for the visual seat, not a defect in this
component; no mobile evidence of the action bar exists in the current matrix.
