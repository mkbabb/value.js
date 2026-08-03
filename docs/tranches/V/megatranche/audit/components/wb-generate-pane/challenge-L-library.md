# CHALLENGE-L — library structure · `demo/workbenches/generate/GeneratePane.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the model this
seat was explicitly spawned with. The declaration is honoured, not inherited.

### Prior-seat note (read this first)

A previous CHALLENGE-L seat had already written this exact path (37,194 bytes, at HEAD
`9268f054`). I did **not** destroy it: it is preserved verbatim at
`challenge-L-library.seat-1-9268f054.md` in this directory. This file is a **second,
independently-derived pass** at HEAD `e39da983` (the brief named `c654824e`; the fleet has landed
`9268f054`, `1566cdb6`, `e39da983` since — no file in this component's graph differs, and every
line number below is re-verified against the working tree). The two passes agree on the BLOCKER
and diverge in coverage elsewhere; where they overlap, treat that as independent corroboration.
Divergences worth the adjudicator's attention are listed in §6.

- Subject: `demo/workbenches/generate/GeneratePane.vue` (41 lines) + its owned child
  `GenerateControls.vue` (392 lines) + `composables/useColorGeneration.ts` (48 lines).
- **Verdict: DEFECTIVE.** 14 findings — 1 BLOCKER, 7 MAJOR, 5 MINOR, 1 INFO.
- Writes confined to this directory. No source touched.

---

## 0 · The import ledger — every edge, traced to its home

`GeneratePane.vue:2-8`:

| # | Specifier | Home | Direction | Verdict |
|---|---|---|---|---|
| 1 | `vue` | node_modules | — | OK |
| 2 | `../../ui/card` | `demo/ui/card/index.ts` — a **1-line re-export of `@mkbabb/glass-ui`** | feature → alias shim | **L-4** |
| 3 | `../../shared/ui/PaneHeader.vue` | `demo/shared/ui/` | feature → shared | direction OK; **L-13** (shell copy-pasted 9×) |
| 4 | `./GenerateControls.vue` | own dir | intra-feature | OK |
| 5 | `../../palettes/usePalettePorts` (`LIBRARY_PORT_KEY`) | `demo/palettes/` | **feature → sibling feature** | **L-3** |
| 6 | `../../color-session/keys` (`CSS_COLOR_KEY`) | `demo/color-session/` | feature → shared | **L-2 — the binding is DEAD** |
| 7 | `../../palettes/types` (`type PaletteColor`) | `demo/palettes/` | **feature → sibling feature** | **L-3**, type leg |

`@mkbabb/value.js` appears **zero** times in `GeneratePane.vue` or `GenerateControls.vue`. The
library is reached only transitively, via `demo/color-session/generate-color.ts:33-34`:

```ts
import { mapColorToGamut, oklch } from "@mkbabb/value.js/color";
import { serializeCssColor } from "@mkbabb/value.js/css";
```

Both are **real published-subpath specifiers** a downstream consumer could write verbatim. No
`@src/*` deep path survives anywhere in this graph. On the narrow charter question — *does it
import from `@mkbabb/value.js` correctly?* — the answer is **yes**, and the dev-server probe
confirms the runtime binding lands on this checkout's build, not a stale artifact:

```
$ curl -s "http://localhost:9000/@fs/Users/mkbabb/Programming/value.js/demo/color-session/generate-color.ts" | grep '^import'
32:import { mapColorToGamut, oklch } from "/@fs/Users/mkbabb/Programming/value.js/dist/subpaths/color.js";
33:import { serializeCssColor } from "/@fs/Users/mkbabb/Programming/value.js/dist/subpaths/css.js";
34:import { mulberry32 }          from "/@fs/Users/mkbabb/Programming/value.js/demo/color-session/prng.ts";
```

**State it as the positive it is: a real consumer could write every value.js import in this graph.**
The defects are one level up — the *trust boundary* that certifies those two specifiers has drifted
from the exports map it claims to mirror (L-10), and it is the **design-system** surface, not the
library surface, that carries two parallel import paths (L-4, L-5).

`verbatimModuleSyntax`: **clean.** Every type-only import in both files carries `import type`
(`GeneratePane.vue:8`; `GenerateControls.vue:19,33,34`). No violation.

`npx eslint demo/workbenches/generate/*.vue --max-warnings=0` → **exit 0**. Every finding below
passes the shipped gates.

---

## 1 · BLOCKER

### L-1 · The user's palette name is discarded by the pane. Two homes, one concept.

`GenerateControls.vue:48-50` declares a two-payload emit; `:102-104` fires it with both:

```ts
const emit = defineEmits<{
    save: [colors: string[], name: string];
}>();
...
function save() {
    emit("save", [...palette.value], paletteName.value);
}
```

`GeneratePane.vue:14-20` is the **only** listener, and it takes one parameter:

```ts
function onSave(colors: string[]) {
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({
        css,
        position: i,
    }));
    pm.createPalette("Generated Palette", paletteColors);
}
```

The second payload is dropped and replaced by a string literal. The name the user typed into the
plate's editable title —

```html
<!-- GenerateControls.vue:144-149 -->
<input v-model="paletteName" type="text" aria-label="Palette name" ... />
```

— never reaches the store. `usePaletteStore.ts:66-72` is the sink, and it keys dedup on the name:

```ts
function createPalette(name: string, colors: PaletteColor[]): Palette {
    const existing = store.value.palettes.find(
        (p) => p.isLocal && p.name.toLowerCase() === name.toLowerCase() && colorsMatch(p.colors, colors),
    );
```

So every generated palette in the library is named `Generated Palette` and shares one dedup bucket.
The affordance is live and visible in the shipped build — `shots/safari-desktop-light/generate.png`
renders "Generated Palette" as a hover-underlined editable title with the save verb beside it. The
plate promises naming; the pane silently unnames.

**Why no gate catches it.** TypeScript assigns a 1-arity handler to a 2-arity emit signature by
design. `eslint` exit 0. `e2e/smoke/oracles/o20-generate-plate.spec.ts:47-49` asserts the save
*button exists*, never that the save *carries the name*. The dock path is equally affected:
`usePaneRouter.ts:197` → `GeneratePane` `defineExpose.save` (`:24`) → `controlsRef.save()` → the
same emit → the same truncation.

- **Evidence**: `demo/workbenches/generate/GenerateControls.vue:48-50,102-104,144-149`;
  `demo/workbenches/generate/GeneratePane.vue:14-20`; `demo/palettes/usePaletteStore.ts:66-72`.
- **Reproduction**: static and total — `onSave` has one binding position, the emit has two payload
  slots, and the literal `"Generated Palette"` is the only value that ever reaches `createPalette`.
  (Not driven live: saving mutates the local store, and this seat is read-only.)
- **Mechanism**: split semantic ownership. "The palette's name" has two homes — a `ref` in the
  child, a string literal in the parent — and the emit boundary between them loses one.
- **Cure (transposition, not patch)**: delete `onSave` *and* the pane's `LIBRARY_PORT_KEY` inject
  entirely. Name, colours and save verb already live together — in the plate. Move the store call
  into `useColorGeneration` (renamed `useGenerate`), which owns `name`, `palette` and `save()`. The
  pane then has nothing to forward, which is exactly the point: **a component whose only logic is
  re-emitting its child's data is a place for the data to get lost.**

---

## 2 · MAJOR

### L-2 · A dead injection manufactures a boundary crossing that does not exist

`GeneratePane.vue:7,10`:

```ts
import { CSS_COLOR_KEY } from "../../color-session/keys";
const cssColorOpaque = inject(CSS_COLOR_KEY)!;
```

`cssColorOpaque` is referenced **nowhere** — not in the 17-line script, not in the 12-line template.
Census across the tree:

```
$ for f in $(grep -rln "CSS_COLOR_KEY" demo/ | grep -v keys.ts); do echo "$(grep -c cssColorOpaque $f)  $f"; done | sort -n
1  demo/workbenches/generate/GeneratePane.vue      ← declaration only
1  demo/workbenches/gradient/GradientPane.vue      ← declaration only
2  demo/palettes/BrowsePane.vue
2  demo/workbenches/mix/MixPane.vue
3  demo/palettes/PalettesPane.vue
3  demo/palettes/admin/AdminPane.vue
3  demo/shell/dock/Dock.vue
4  demo/color-picker/App.vue
```

Exactly two files have count 1 — a declaration with zero uses — and they are the two copy-paste
twins (L-13). The non-null assertion compounds it: the pane *hard-asserts* a provider it does not
use, so mounting it outside an ancestor that provides `CSS_COLOR_KEY` makes the `!` a lie with no
consequence, which is the worst kind.

A dependency-graph reader — human or tool — sees `workbenches/generate → color-session/keys` and
concludes the workbench consumes the session colour. It does not.

- **Evidence**: `demo/workbenches/generate/GeneratePane.vue:7,10` (+ twin `GradientPane.vue:6,8`);
  the census above; `npx eslint … --max-warnings=0` → exit 0 (a `<script setup>` top-level binding
  is template-visible, so no unused-var rule fires).
- **Reproduction**: `grep -n cssColorOpaque demo/workbenches/generate/GeneratePane.vue` → one line.
- **Mechanism**: copy-paste residue promoted to a structural edge.
- **Cure**: delete both lines, in both files.

### L-3 · The workbench injects a 15-member port to call one function

`GeneratePane.vue:6,11`:

```ts
import { LIBRARY_PORT_KEY } from "../../palettes/usePalettePorts";
const pm = inject(LIBRARY_PORT_KEY)!;
```

`libraryPort` (`demo/palettes/usePalettePorts.ts:138-153`) carries **15 members**: `savedPalettes,
filteredSaved, searchQuery, createPalette, reorderPalettes, expandedId, toggleExpand, onEditColor,
onDelete, onDeleteAllSaved, onPublish, onRenameSaved, onCurrentPaletteSaved,
onCurrentPaletteUpdated, showDeleteAllConfirm`. GeneratePane uses **one**: `createPalette`
(`:19`). Utilisation 1/15.

The port module's own header (`usePalettePorts.ts:22-31`) states the intent this violates:

> "the RF-15 §b 6 dissolution of the old `usePaletteManager` god facade (153 L, ONE
> cross-everything injected blob) into FIVE narrow, feature-owned ports … no consumer injects a
> member outside the port it named."

The letter holds (Generate names `library`, uses a `library` member). The **spirit does not**: the
injected blob is still 15 members wide for a 1-member need. The god-facade coupling was divided by
five, not removed. `MixPane.vue:16,42,45` repeats the identical pattern for the identical single
member — so two of the three workbenches take a 15-wide dependency to write one palette.

- **Evidence**: `demo/workbenches/generate/GeneratePane.vue:6,11,19`;
  `demo/palettes/usePalettePorts.ts:22-31,138-153`; `demo/workbenches/mix/MixPane.vue:16,42,45`.
- **Reproduction**: `sed -n '138,153p' demo/palettes/usePalettePorts.ts` — count members (15)
  against members read (1).
- **Mechanism**: wrong granularity of ownership. "Save a palette" is a **domain command**, not a
  slice of the palettes-*feature* UI surface, so it should not ride a UI-feature port at all.
- **Cure**: the palette store is domain, not feature. Lift `createPalette`/`updatePalette`/
  `deletePalette` out of `palettes/` into `demo/domain/palette/store.ts` and **import** it — no
  inject, no port, no cross-feature edge, no provider assertion. `LIBRARY_PORT_KEY` then carries
  only what is genuinely the palettes *pane's* UI state, which is what a port is for.

### L-4 · `demo/ui/` is a 19-directory alias layer — and this component uses both names for one system

```
$ ls demo/ui | wc -l               → 19
$ cat demo/ui/*/index.ts | wc -l   → 29        # 19 directories, 19 files, 29 total lines
$ for d in demo/ui/*/; do ls $d | grep -v index.ts | wc -l; done   → 0 for all 19
```

Every one is a bare re-export:

```ts
demo/ui/card/index.ts     export { Card, CardHeader, CardTitle, … } from "@mkbabb/glass-ui";
demo/ui/slider/index.ts   export { Slider }  from "@mkbabb/glass-ui";
demo/ui/button/index.ts   export { Button }  from "@mkbabb/glass-ui";
demo/ui/badge/index.ts    export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";
demo/ui/select/index.ts   export { Select, SelectTrigger, SelectItem, … } from "@mkbabb/glass-ui";
```

No directory holds any other file. It is a pure redirect — the fossil of the deleted shadcn-vue
tree, kept as a second name for the design system.

The subject component pair then uses **both names at once, four lines apart**:

```ts
// GenerateControls.vue:3-12   — via the alias layer
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Slider } from "../../ui/slider";
import { Button } from "../../ui/button";
import { Badge }  from "../../ui/badge";
// GenerateControls.vue:14-15  — direct
import { writeClipboard } from "@mkbabb/glass-ui";
import { WatercolorDot }  from "@mkbabb/glass-ui/watercolor-dot";
```

Standing edict 2 forbids aliases and dual paths by name; edict 3 forbids wrapper layers that add
nothing. This is both, in one file.

- **Evidence**: the `wc`/`ls` output above; `demo/workbenches/generate/GenerateControls.vue:3-15`;
  `demo/workbenches/generate/GeneratePane.vue:3`.
- **Reproduction**: the third command above returns 0 nineteen times — there is no content to keep.
- **Mechanism**: a migration shim that outlived its migration and became a second namespace.
- **Cure**: delete `demo/ui/`; rewrite consumers to `@mkbabb/glass-ui`. Mechanical, one pass, and it
  removes an entire tier from the lattice.

### L-5 · The design system leaks `reka-ui` types, forcing unchecked casts here

`GenerateControls.vue:33,75-81`:

```ts
import type { AcceptableValue } from "reka-ui";
...
function onPresetChange(value: AcceptableValue)  { preset.value  = value as PresetName; }
function onHarmonyChange(value: AcceptableValue) { harmony.value = value as HarmonyName; }
```

glass-ui's `Select` does not export the type of its own `@update:model-value` payload, so a
consumer must reach **past** the design system into glass-ui's transitive UI primitive to name it,
then cast the un-narrowed `AcceptableValue` down to a literal union. Both casts are unchecked: a
value outside the union yields `GENERATION_PRESETS[preset] === undefined` at
`demo/color-session/generate-color.ts:243`, and the next line `p.l[0]` throws.

`reka-ui` is not a runtime dependency of this package:

```
$ node -e "p=require('./package.json'); console.log(p.dependencies['reka-ui'],'|',p.devDependencies['reka-ui'])"
undefined | ^2.9
```

The import is type-only so nothing ships. The architecture is still wrong: the demo's design-system
boundary is not sealed — glass-ui's dependency is part of glass-ui's public API **by omission**.

- **Evidence**: `demo/workbenches/generate/GenerateControls.vue:33,75-81`; the dependency probe
  above; `demo/color-session/generate-color.ts:243-244`.
- **Reproduction**: `grep -rn "AcceptableValue" demo/` shows the leak's blast radius.
- **Mechanism**: incomplete encapsulation of the design system's public surface.
- **Cure**: glass-ui exports `SelectModelValue<T>` (generic over the item value) and types
  `@update:model-value` with it. Both casts and the `reka-ui` import die at every consumer. This is
  a glass-ui BH/BI relay row under the standing relay edict.

### L-6 · The "ramp is the track" slider is hand-rolled twice, and the two copies have diverged

`GenerateControls.vue:288-311` and `ExtractControls.vue:15-35` are the same idiom character-for-
character in the load-bearing parts: a `relative flex-1 h-6 flex items-center` wrapper, an
`absolute inset-0 rounded-full overflow-hidden h-6` div painting the gradient, and a glass-ui
`Slider variant="spectrum"` laid over it with a per-instance
`:style="{ '--slider-track-bg': 'transparent' }"` (`GenerateControls.vue:305`,
`ExtractControls.vue:32`). Two consequences, both measured live at `http://localhost:9000/#/generate`:

**(a) The thumb is below the minimum target size.** Live element measurement under
`[aria-label="Color count"]`:

```js
[ { t:"SPAN", c:"slider-track",                      w:434, h:24 },
  { t:"SPAN", c:"slider-range glass-liquid-fill",    w:158, h:24 },
  { t:"SPAN", c:"slider-thumb glass-specular-track", w: 12, h:24 } ]
```

12 × 24 CSS px — under the 24 × 24 floor. This is the exact row the Safari matrix already flags on
**all four** matrices, `REPORT.json` → `/#/generate` → `a11y.smallTapTargets`:
`{"w":12,"h":24,"tag":"span","label":"Color count"}` (the other four flagged targets on that route
are shell chrome — the slug capsule's 22 × 22 buttons and its unnamed 160 × 23 input).

**(b) The generate copy never received the extract copy's remediation.** `ExtractControls.vue:20`
carries `data-o18="extract-k-rail"` and `:22` carries `backgroundColor: trackInk` plus an
`inset 0 0 0 1.5px ${trackInk}` certified ring. `GenerateControls.vue:293-296` carries **neither**.
The contrast oracle therefore cannot see the generate rail at all:

```
$ grep -rn "data-o18" e2e/ | grep -i slider
e2e/smoke/oracles/o18-contrast-census.spec.ts:1106:  page.locator('[data-o18="extract-kc"] .slider-track'),
e2e/smoke/oracles/o18-contrast-census.spec.ts:1133:  '[data-o18="extract-k-rail"]',
```

`ExtractControls.vue:58-64` records precisely why the un-inked variant was ruled defective
("These sliders are un-readable"). The generate copy **is** that un-remediated variant, still
shipping, outside the gate that would have caught it.

- **Evidence**: the live measurement above;
  `docs/tranches/V/megatranche/audit/visual/REPORT.json`, `/#/generate`, all four matrices;
  `demo/workbenches/generate/GenerateControls.vue:288-311`;
  `demo/workbenches/extract/ExtractControls.vue:15-35,58-64`;
  `e2e/smoke/oracles/o18-contrast-census.spec.ts:1106,1133`.
- **Reproduction**: open `/#/generate`, measure `.slider-thumb` → 12 × 24. Grep the O-18 census for
  any generate selector → none.
- **Mechanism**: a design-system capability implemented in userland twice, so a remediation applied
  to one copy structurally cannot reach the other. Also edict 5 — a per-instance `:style` token
  override instead of root-level styling.
- **Cure**: glass-ui `Slider` gains a `track-gradient` prop (or a `rail` slot) plus a ≥ 24 px thumb
  hit area. Both hand-rolled rails and both `--slider-track-bg: transparent` overrides delete, and
  the O-18 census can then key on **component identity** rather than per-site opt-in attributes —
  which is what a census should key on.

### L-7 · The pane's public surface is four optional-chain hops of `any`

`GeneratePane.vue:22-26`:

```ts
defineExpose({
    regenerate: () => controlsRef.value?.regenerate?.(),
    save:       () => controlsRef.value?.save?.(),
    copyColors: () => controlsRef.value?.copyColors?.(),
});
```

The inner `?.` is a masking fallback on methods statically guaranteed to exist —
`GenerateControls.vue:115` is `defineExpose({ regenerate, save, copyColors })`. They cannot be
`undefined`; the `?.` exists only to make a rename silent. The consumer side compounds it:

```ts
demo/shell/usePaneRouter.ts:108   generate: Ref<any>;
demo/color-picker/App.vue:317     const generatePaneRef = ref<any>(null);
demo/shell/usePaneRouter.ts:196   handler: () => paneRefs.generate.value?.regenerate?.()
```

Four `?.` and two `any`s between a dock button and a `seed.value = …`. Nothing in the chain is
type-checked: rename `regenerate` at either end and the button becomes a no-op with no diagnostic
from `vue-tsc`, `eslint`, or any oracle. Standing edict 2 names masking fallbacks explicitly.

- **Evidence**: `demo/workbenches/generate/GeneratePane.vue:12,22-26`;
  `demo/workbenches/generate/GenerateControls.vue:115`;
  `demo/shell/usePaneRouter.ts:106-110,196-198`; `demo/color-picker/App.vue:317,347`.
- **Reproduction**: the `Ref<any>` declaration is the proof — no member access on it is checked.
- **Mechanism**: imperative ref-drilling used as a command bus. A command bus wants a registry, not
  a chain of instance handles.
- **Cure**: see L-8 — they are one repair.

### L-8 · The dock's three generate actions are dead on mobile

`generatePaneRef` is written in exactly one place:

```
$ grep -rn "generatePaneRef" demo/
demo/color-picker/App.vue:317:  const generatePaneRef = ref<any>(null);
demo/color-picker/App.vue:326:      generatePaneRef.value = left === "generate" ? el : null;
demo/color-picker/App.vue:347:  { generate: generatePaneRef, gradient: gradientPaneRef, mix: mixPaneRef },
```

`:326` is the body of `onDesktopLeftMount`, bound to exactly one slot — `App.vue:101-109`, the
desktop-left `<PaneSlot :on-mount="onDesktopLeftMount">` (`:105`), inside the `<template v-else>`
whose `v-if` was `!isDesktop` (`:77`). The **mobile** `<PaneSlot>` (`App.vue:83-92`) carries no
`:on-mount` at all:

```html
<div v-if="!isDesktop" class="pane-wrapper pane-wrapper--left pane-slot-mobile …">   <!-- :77 -->
    <PaneSlot
        :component="mobile.component"
        :component-key="mobile.key"
        :component-props="mobile.props"
        :transition-name="…" :max="9" appear :on-appeared="…"
    />                                        <!-- NO :on-mount -->
</div>
```

Meanwhile the action bar is keyed on the **view**, with no breakpoint guard —
`usePaneRouter.ts:191`: `if (view === "generate") return { label: "Tools", icon: Paintbrush, … }`.
So on a phone the Tools layer renders its three generate actions (its paintbrush trigger is visible
in `shots/safari-mobile-light/generate.png`, second dock icon), every handler resolves
`paneRefs.generate.value === null`, and the `?.` from L-7 swallows the miss. **Three dock buttons
that do nothing, silently, on every mobile viewport.**

- **Evidence**: `demo/color-picker/App.vue:77,83-92` (no `:on-mount`), `:101-109`, `:317`, `:326`,
  `:347`; `demo/shell/usePaneRouter.ts:191-203`;
  `docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/generate.png`.
- **Reproduction**: **CONFIRMED-BY-CONSTRUCTION.** The write site is unreachable when
  `isDesktop === false` — the same predicate that mounts the mobile slot. I attempted a live 390 px
  probe; the MCP browser is a headed window that ignored `setViewportSize` (`innerWidth` stayed
  1440 after `browser_resize(390, 844)`), so no live capture is offered and none is needed: the
  static chain has no second branch.
- **Mechanism**: an instance-handle command bus whose wiring is duplicated per layout branch, so
  one branch can silently omit it.
- **Cure (one repair for L-7 + L-8 + L-9)**: replace `PaneActionRefs` with a **command registry**.
  `demo/shell/commands.ts` provides a `Ref<Command[]>`; a workbench calls
  `registerCommands([{ key, title, icon, run }])` in its own setup; the dock renders what is
  registered. Layout-independent by construction (registration rides mount, wherever the pane
  mounts), fully typed (no `any`, no `?.`). It deletes `defineExpose` from all three panes,
  `PaneActionRefs` from `usePaneRouter`, three `ref<any>` and both `on*Mount` callbacks from
  `App.vue` — and it makes L-9 impossible, since a command registered once cannot render twice.

---

## 3 · MINOR / INFO

### L-9 · Two live surfaces for the same three verbs; the O-20 oracle measures the wrong property

Live DOM at `/#/generate` (desktop), buttons in order:

```
… "Back", "Regenerate", "Save palette", "Copy colors",        ← the dock action bar
… "Regenerate", "Save palette", "Copy all colors",            ← the plate
```

Two `Regenerate` nodes. Measured state of each:

```js
[ { label:"Regenerate", inPlate:false, inert:true,  ariaHidden:true,  visibility:"hidden",  w:32,  h:32 },
  { label:"Regenerate", inPlate:true,  inert:false, ariaHidden:false, visibility:"visible", w:145, h:40 } ]
```

Two names for one verb, too: the dock says **Copy colors**, the plate says **Copy all colors**.

`e2e/smoke/oracles/o20-generate-plate.spec.ts:36-41` claims to hold the containment:

```ts
// The orphan is dead: EVERY Regenerate on the page lives inside the plate (page-count ≡ plate-count).
expect(await page.getByRole("button", { name: "Regenerate" }).count())
    .toBe(await plate.getByRole("button", { name: "Regenerate" }).count());
```

It passes only because `getByRole` skips the accessibility-hidden node. The assertion the **comment**
makes ("EVERY Regenerate lives inside the plate") is false of the DOM; the assertion the **code**
makes is "every a11y-visible Regenerate lives inside the plate *while the Tools layer is closed*".
The oracle measures visibility, not ownership — so the second surface it was written to kill is
alive one click away, un-asserted.

- **Severity**: MINOR — the duplicate is functional, not broken. But it is exactly the dual path
  the edicts forbid, and its guard oracle cannot see it.
- **Cure**: the command registry (L-8). One registration ⇒ one render site by construction, and the
  oracle can then assert identity instead of counting.

### L-10 · The demo's declared value.js trust boundary has drifted from the exports map — MAJOR

`package.json#exports` — **7 keys, no root**:
`./color ./value ./css ./easing ./math ./transform ./quantize`. There is no fallback either:

```
$ node -e "p=require('./package.json'); console.log(p.main, p.module, p.types)"
undefined undefined undefined
```

`tsconfig.demo.json#compilerOptions.paths` — **8 keys**: `@mkbabb/value.js` · `/color` · `/parsing`
· `/math` · `/easing` · `/units` · `/transform` · `/quantize`, under a comment calling them "the 8
public keys". Three targets do not exist on disk; two real public keys have no entry:

```
$ for f in dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts dist/subpaths/css.d.ts dist/subpaths/value.d.ts; do
    [ -e "$f" ] && echo "EXISTS $f" || echo "MISSING $f"; done
MISSING dist/index.d.ts
MISSING dist/subpaths/parsing.d.ts
MISSING dist/subpaths/units.d.ts
EXISTS  dist/subpaths/css.d.ts
EXISTS  dist/subpaths/value.d.ts
```

This component's transitive core imports one key from each side, and they resolve by **two
different mechanisms**:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "was successfully resolved" | grep value.js | sort -u
Module name '@mkbabb/value.js/color' was successfully resolved to '…/dist/subpaths/color.d.ts'.
Module name '@mkbabb/value.js/css'   was successfully resolved to '…/dist/subpaths/css.d.ts'
                                       with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'.
```

`/color` is path-mapped (no Package ID). `/css` misses `paths` entirely and lands via Node
**package self-reference** through the repo's own `exports` map — hence the Package ID. Both reach
the same file *today*, so this is drift, not a live break. But the config that is supposed to be
the demo-dogfood keystone no longer describes the surface it certifies, and `vite.config.ts:38-50`
already solves exactly this problem correctly, by **generating** its alias set from
`package.json#exports`.

- **Cure**: one mechanism, not two. Either generate `paths` from `exports` the way the Vite alias
  set is generated, or delete `paths` outright and let self-reference serve all seven — it
  demonstrably already serves `/css` and `/value`.

### L-11 · A duplicate `debounce` is justified by a root barrel that does not exist

`demo/shared/utils.ts:9-21`:

> "`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier …
> the demo owns its copy; **the library's root-barrel export stands for external consumers**."

There is no root barrel (see L-10: no `"."` key, no `main`/`module`/`types`). An external consumer
cannot write `import { debounce } from "@mkbabb/value.js"`. Nor is it in any subpath:

```
$ grep -rn "export function debounce" src/     → (no matches)
```

The demo's copy is the **only** `debounce` in the constellation, and the comment justifying it as a
*duplicate* describes a symbol that was deleted from the library.

- **Severity**: MINOR — documentation asserting a public surface that does not exist. Same drift
  family as L-10, surfaced by the same probe. Not in this component's graph.
- **Cure**: correct the comment, or export it from a subpath if external consumers want it.

### L-12 · A second physical copy of value.js is installed in `node_modules` — INFO

```
$ ls node_modules/@mkbabb/ → glass-ui  keyframes.js  value.js
$ grep -n '"node_modules/@mkbabb/value.js"' -A3 package-lock.json
1336:  "node_modules/@mkbabb/value.js": {
1337:      "version": "4.0.0",
1338:      "resolved": "https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz",
$ grep -n "value.js" node_modules/@mkbabb/{glass-ui,keyframes.js}/package.json
keyframes.js:69:  "@mkbabb/value.js": "4.0.0"
glass-ui:543:     "@mkbabb/value.js": "^4.0.0",
```

It is a real directory, not a symlink (`os.path.islink` false at package, `dist`, `subpaths` and
file level), pulled in transitively by both siblings. `vite.config.ts:26-28` asserts the opposite:

> "A package does not install itself, so these exact aliases point the seven public specifiers at
> this checkout's freshly-built published surface."

The package **is** installed. The self-alias still does its job for demo code (proven in §0), so
nothing is broken; the comment's premise is simply false, and a stale published tarball of the
library sits inside the tree meant to dogfood the working copy.

- **HYPOTHESIS (not verified)**: because `resolve.alias` is global, glass-ui's own runtime
  `@mkbabb/value.js/*` imports are probably rebound to the working-tree `dist/` too — meaning
  glass-ui 7.0.0, built and tested against published 4.0.0, silently runs against whatever `src/`
  currently emits. Confirming needs a production build-graph probe I did not run.

### L-13 · `GeneratePane` and `GradientPane` are near-identical twins; the shell is copy-pasted 9×

`GradientPane.vue:1-28` against `GeneratePane.vue:1-41`: same import block shape, same dead
`inject(CSS_COLOR_KEY)` (L-2), same `ref<InstanceType<typeof Child> | null>(null)`, same
`defineExpose` of `?.`-guarded passthroughs, and a byte-identical template skeleton —

```html
<div class="relative w-full mx-auto h-full min-w-0">
  <Card tier="resting" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
    <PaneHeader description="…">Title</PaneHeader>
    <div class="flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2"> <Child ref="…" /> </div>
  </Card>
</div>
```

```
$ grep -rn 'class="[^"]*pane-scroll-fade' demo/ | wc -l   → 9
```

Nine panes hand-repeat the same class string. `demo/DESIGN.md` § Surfaces makes it **normative**
("ONE card species … the picker card AND all 9 pane cards"), which means a law is enforced by nine
copies of a literal instead of by one component.

- **Severity**: MINOR — no live defect; it is the substrate that let L-2 replicate.
- **Cure**: `demo/shell/PaneShell.vue` — `<PaneShell title description>` renders the wrapper, the
  `Card tier="resting"`, the `PaneHeader` and the padded body slot. Nine copies become nine one-line
  usages; the material ladder becomes type-enforced rather than string-enforced.

### L-14 · Not Vue 3.5 idiom — `ref` + `InstanceType` instead of `useTemplateRef`

`GeneratePane.vue:12`:

```ts
const controlsRef = ref<InstanceType<typeof GenerateControls> | null>(null);
```

`useTemplateRef` is the 3.5 idiom and is already in this repo — `demo/color-picker/App.vue:301`:
`const dockNav = useTemplateRef<HTMLElement>("dockNav");`. Standing edict 7. (Subsumed by L-8's
cure, which removes the ref entirely.)

---

## 4 · The greenfield lattice

Structuring this today, with no legacy:

```
src/                                 the library — 7 published subpaths. UNCHANGED.
                                     The demo already speaks only these (§0). This is the
                                     one boundary that is already right; do not touch it.

demo/
  color/                             pure, Vue-free colour domain over @mkbabb/value.js
    generate.ts                      presets · harmonies · generatePalette
                                     (today color-session/generate-color.ts — already correct)
    prng.ts

  domain/palette/                    THE AGGREGATE — one home for "a palette"
    Palette.ts                       type + `fromColors(name, css[]): Palette`
                                     ← kills the three hand-rolled `{ css, position: i }` maps
                                       (GeneratePane.vue:15-18, GenerateControls.vue:55-57,
                                        MixPane.vue:40)
    store.ts                         createPalette / update / delete / reorder — IMPORTED, not injected
                                     ← kills L-3's cross-feature port edge

  features/generate/                 ONE module. No pane/controls split — the split is what lost the name.
    useGenerate.ts                   preset · harmony · count · seed · name · palette + save() → store
                                     ← kills L-1 by construction: name and colours never cross a boundary
    GenerateWorkbench.vue            the plate + marginalia. Owns its verbs. NO defineExpose.

  shell/
    PaneShell.vue                    the 9×-duplicated Card+PaneHeader+body wrapper, once   (L-13)
    commands.ts                      per-view command registry: a workbench REGISTERS
                                     {key,title,icon,run}[]; the dock RENDERS what is registered
                                     ← kills L-7 (typed; no `any`, no `?.`),
                                       L-8 (layout-independent — registration rides mount),
                                       L-9 (one registration ⇒ one render site)

  ui/                                DELETED. 19 dirs, 19 files, 29 lines, zero content.   (L-4)
```

Two upstream moves, relayed to glass-ui per the standing BH/BI edict:

1. **`Slider` gains `track-gradient`** (or a `rail` slot) and a ≥ 24 px thumb hit area — retires
   both hand-rolled rails, both `--slider-track-bg: transparent` per-instance overrides, and the
   12 × 24 tap target the Safari matrix flags on all four generate captures (L-6).
2. **`Select` exports its own model-value type** — retires the `reka-ui` import and the two
   unchecked casts (L-5).

One build-config move: **generate `tsconfig.demo.json#paths` from `package.json#exports`**, exactly
as `vite.config.ts:38-50` already generates its alias set — or delete `paths` and let self-reference
serve all seven uniformly. Two hand-maintained descriptions of one public surface is how L-10's
drift happened, and it will happen again (L-10).

**Net effect on the subject file: `GeneratePane.vue` ceases to exist.** Its 41 lines are one dead
injection (L-2), one over-wide port inject (L-3), one lossy adapter (L-1), one `?.` passthrough
block (L-7), and a shell nine files already duplicate (L-13). Every line is either a defect or a
duplicate. That is the finding this seat exists to produce: the component is not badly written — it
is **structurally unnecessary**, and each thing it does is a boundary that costs something to cross.

---

## 5 · Findings index

| id | severity | one line | evidence anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | the typed palette name is dropped; every save is named `"Generated Palette"` | `GeneratePane.vue:14-20` vs `GenerateControls.vue:48-50,102-104` |
| L-2 | MAJOR | dead `inject(CSS_COLOR_KEY)` manufactures a false dependency edge | `GeneratePane.vue:7,10`; grep census |
| L-3 | MAJOR | injects a 15-member port to call one function | `GeneratePane.vue:6,11`; `usePalettePorts.ts:138-153` |
| L-4 | MAJOR | `demo/ui/` = 19-dir alias layer; both names used four lines apart | `ls`/`wc` = 19/29; `GenerateControls.vue:3-15` |
| L-5 | MAJOR | `reka-ui` type leak forces two unchecked casts | `GenerateControls.vue:33,75-81` |
| L-6 | MAJOR | ramp-slider hand-rolled twice; 12×24 thumb; outside the O-18 census | live measure; `REPORT.json`; `o18-…:1106,1133` |
| L-7 | MAJOR | four `?.` hops of `any` between dock button and pane | `GeneratePane.vue:22-26`; `usePaneRouter.ts:108,196` |
| L-8 | MAJOR | the three dock generate actions are dead on mobile | `App.vue:77,83-92,317,326`; `usePaneRouter.ts:191` |
| L-9 | MINOR | two live surfaces for three verbs; O-20 asserts visibility, not ownership | live DOM; `o20-…:36-41` |
| L-10 | MAJOR | `tsconfig.demo.json#paths` ≠ `package.json#exports`; 3 dangling, 2 missing | `traceResolution`; file-existence probe |
| L-11 | MINOR | duplicate `debounce` justified by a root barrel that does not exist | `shared/utils.ts:9-21`; `exports` dump |
| L-12 | INFO | a second physical `@mkbabb/value.js@4.0.0` sits in `node_modules` | `package-lock.json:1336-1338` |
| L-13 | MINOR | pane shell copy-pasted 9×; Generate/Gradient are twins | `grep … pane-scroll-fade \| wc -l` = 9 |
| L-14 | MINOR | `ref` + `InstanceType` instead of `useTemplateRef` | `GeneratePane.vue:12` vs `App.vue:301` |

**Strongest defect: L-1** — the component's single piece of real logic silently destroys user
input, and no gate in the repository can see it.

---

## 6 · Divergence from seat 1 (`challenge-L-library.seat-1-9268f054.md`)

Recorded so the adjudicator can arbitrate rather than merge blind.

- **Agreed, independently**: the BLOCKER (name destroyed at the pane/controls boundary); the dead
  `CSS_COLOR_KEY` injection; the `demo/ui/` alias layer; the over-wide `LIBRARY_PORT_KEY` inject;
  the "published surface resolves clean" positive. Two seats, two evidence trails, same conclusion.
- **Line numbers**: seat 1 cites `GenerateControls.vue:41-43` for the emit and `GeneratePane.vue:14-20`
  for `onSave`. Against the working tree at `e39da983` the emit is at **48-50**; `onSave` at 14-20
  is correct. Every citation in this file was re-verified by `grep -n` after writing.
- **New in this pass** (not in seat 1, as far as its §Findings headers show): **L-8** (the dock
  actions are dead on mobile — the missing `:on-mount` on the mobile `PaneSlot`); **L-9** (two live
  Regenerate surfaces + the O-20 oracle measuring visibility rather than ownership, with the
  `inert`/`aria-hidden` measurement that explains why it passes); **L-10** (the
  `paths` ⇄ `exports` divergence, with `traceResolution` showing two resolution mechanisms);
  **L-6(b)** (the generate rail is outside the O-18 contrast census while its extract twin is
  inside); **L-11** (the root barrel that does not exist); **L-5**'s throw path through
  `generate-color.ts:243`.
- **Not adjudicated here**: seat 1's `L-4a` (`PaletteColorStrip` imported feature→feature from
  `palettes/browser/card` alongside `PreviewStrip` from `color-session/color-chips` — two
  colour-strip components in one file) and its `L-12` (the `mulberry32`/`prng` placement). Both are
  real edges in the graph I traced in §0; I did not reach independent findings on them and defer to
  seat 1's treatment.
