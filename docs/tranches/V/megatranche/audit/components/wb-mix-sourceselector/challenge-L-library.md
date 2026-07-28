# CHALLENGE-L — library structure · `demo/workbenches/mix/MixSourceSelector.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context) — the tier this seat was
explicitly spawned with. Declared, not inherited.

- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Subject: `demo/workbenches/mix/MixSourceSelector.vue` (283 lines)
- Axis: library structure — module boundaries, ownership, direction of dependency, public surface
- Verdict: **DEFECTIVE** — 3 BLOCKER, 8 MAJOR, 3 MINOR, 1 INFO

> **PASS 2 (Opus 5, second seating).** L-1..L-12 below are pass-1 findings; I re-derived L-1
> independently from the published dist + a live DOM/hit-test probe and **confirm** them. Pass 2
> adds **§P2** at the foot of this document: one new **BLOCKER** (L-13 — the production build emits
> zero application JavaScript), four new MAJORs, one **correction** to L-9, and the decisive
> corroboration pass 1 lacked — **I ran the repo's own e2e gate and it is RED.** Read §P2 with
> L-1/L-3/L-4/L-6/L-9; it supplies measured numbers where pass 1 argued structurally.

---

## Summary of the strongest defect

**The premise is correct, and the wrongness is load-bearing.** The component codes against a
`WatercolorDot` public surface that `@mkbabb/glass-ui@7.0.0` **does not ship** — a `tag` prop, a
default slot, and attribute fallthrough — all three of which glass-ui deliberately deleted in the
Glass 7 public-surface cut. Because Vue absorbs unknown props as fallthrough attrs, and because
glass-ui suppresses fallthrough attrs, every one of these is discarded **silently**: no runtime
error, no type error, no lint error, a GREEN hard CI gate.

The measured consequence: **both color-add paths in the Mix workbench's Colors mode are dead
elements.** `canMix` requires ≥ 2 selected colors; neither the "add current color" ghost nor the
"From palettes" swatches can ever produce one. The Colors half of the Mix workbench cannot be
operated at all — by mouse, by keyboard, or by assistive technology.

---

## L-1 · BLOCKER — the `WatercolorDot` phantom API: Colors mode is inoperable

### The published surface

`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts` declares
exactly six props:

```
color: string;  variant?: "solid"|"ghost";  animate?: boolean;
cycleDuration?: number;  range?: [number, number];  seed?: string;
```

There is **no `tag` prop and no slot**. The source (`../glass-ui/src/components/watercolor-dot/WatercolorDot.vue`)
is explicit about why:

```
defineOptions({ inheritAttrs: false });
...
// A WatercolorDot is paint, never the seat. Suppress every semantic/action
// fallthrough attribute and forward only the two visual composition channels.
const attrs = useAttrs();
const visualClass = computed(() => attrs.class as HTMLAttributes["class"]);
const visualStyle = computed(() => attrs.style as HTMLAttributes["style"]);
```

and the root element is

```html
<span aria-hidden="true" :class="[visualClass, 'watercolor-swatch', …]" :style="[visualStyle, { …, pointerEvents: 'none', … }]">
```

`grep -c renderSlot node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` → **0**.
`grep -c '$slots' …` → **0**.

### When the API was removed

glass-ui commit `490cc46e` — *"feat(BI): land the Glass 7 component, motion, material, and
public-surface cut"* — `git show 490cc46e -- src/components/watercolor-dot/WatercolorDot.vue`:

```
-        /** Host tag — `div` (decorative) or `button` (interactive). */
-        tag?: "div" | "button";
-        tag: "div",
-        :is="tag"
-        :type="tag === 'button' ? 'button' : undefined"
-        <slot />
+import { computed, toRef, useAttrs, useId, type HTMLAttributes } from "vue";
+defineOptions({ inheritAttrs: false });
+const attrs = useAttrs();
+                pointerEvents: 'none',
```

value.js adopted Glass 7.0.0 **whole** at W44 without migrating a single call site.

### What this component still writes

`MixSourceSelector.vue:164-176` — the primary affordance of Colors mode:

```html
<WatercolorDot
    key="__add__"
    :color="cssColorOpaque ?? 'var(--muted-foreground)'"
    variant="ghost"
    tag="button"                                    <!-- DROPPED: not a prop, attrs suppressed -->
    seed="mix-add-slot"
    class="add-slot-ghost … focus-visible:ring-2 … disabled:opacity-30 …"
    aria-label="Add current color to the mix"       <!-- DROPPED -->
    :disabled="!canAddColor || undefined"          <!-- DROPPED: MAX_COLORS=12 is inoperative -->
    @click="addCurrentColor"                       <!-- DROPPED: onClick is a fallthrough attr -->
>
    <Plus class="w-5 h-5 text-primary/60 …" />      <!-- DROPPED: no <slot/> in the component -->
</WatercolorDot>
```

`MixSourceSelector.vue:211-221` — the "From palettes" swatches: same shape, plus `:title` and a
`:aria-label` carrying a comment that certifies it (`<!-- W5-a11y: swatch button needs accessible
name -->`). The label is discarded; the certification is false.

`MixSourceSelector.vue:146-151` — the selected chips: `tag="div"` and
`:title="\`${sc.css} (${sc.source})\`"`. The title is discarded — the chips have **no** hover
disclosure of which color/source they are, and the dot is `aria-hidden`, so the chip has no
accessible content at all.

### Live proof (dev server, `http://localhost:9000/#/mix`, Playwright/WebKit)

DOM of the add slot:

```json
{
  "tagName": "SPAN",
  "outerHTML": "<span data-v-292b9032 data-v-a3e86846 aria-hidden=\"true\" class=\"add-slot-ghost w-11 h-11 … focus-visible:ring-2 … watercolor-swatch\" data-testid=\"watercolor-swatch\" data-variant=\"ghost\" style=\"border-radius: 76.8317% 21.2696% …\">",
  "ariaHidden": "true",
  "ariaLabel": null,          ← dropped
  "tagAttr": null,            ← dropped
  "disabledAttr": null,       ← dropped
  "pointerEvents": "none",    ← untouchable
  "tabIndex": -1,             ← unreachable by keyboard
  "childTags": ["svg.watercolor-filter-host", "SPAN.watercolor-ghost-stroke"],   ← no Plus icon
  "innerTextLen": 0,
  "rect": { "x": 767.5, "y": 347.125, "w": 48, "h": 48 },
  "hitAtCenter": "DIV.swatch-row flex items-center gap-2.5 flex-wrap"   ← hit-test at its own centre returns the PARENT
}
```

Behavioural proof — a **synthetic** click, which bypasses hit-testing entirely and therefore tests
only whether a listener was ever bound:

```json
{ "chipsBefore": 0, "addSlotPresent": true, "chipsAfterSyntheticClickOnAddSlot": 0 }
```

Zero chips before, zero after. No listener exists. The control is dead three ways over:
`pointer-events: none`, no bound handler, `tabindex: -1` + `aria-hidden`.

Visual proof — `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/mix.png`,
region `(1470,600)-(1900,850)` magnified 2.2×: the seeded dashed ghost silhouette renders correctly
and **the `+` glyph is absent**. Identical in `safari-desktop-dark`. The screenshot has been
carrying this defect through the whole visual matrix; the automated probes never flagged it because
the probes count `<button>` elements, and these controls are not buttons.

### The blast radius

`MixPane.vue` wires `addColor` **only** from `MixSourceSelector`'s emit. `useMixingState.ts:51-53`:

```ts
const canMix = computed(() => {
    if (mode.value === "colors") return selectedColors.value.length >= 2;
```

Both producers of `addColor` are dead ⇒ `selectedColors` can never be non-empty ⇒ `canMix` is
permanently `false` ⇒ the Mix CTA never enables in Colors mode. **The Colors half of the workbench
— which is the default `mode` (`useMixingState.ts:42`) — does nothing.**

### Cure (architectural, not a patch)

Do **not** re-add `tag` to glass-ui — the producer's "paint, never the seat" ruling is correct and
is the better boundary. The seat belongs to the consumer:

```html
<button type="button" class="mix-add-slot" :disabled="!canAddColor"
        aria-label="Add current color to the mix" @click="addCurrentColor">
    <WatercolorDot :color="cssColorOpaque ?? 'var(--muted-foreground)'" variant="ghost"
                   seed="mix-add-slot" class="w-11 h-11 sm:w-12 sm:h-12" />
    <Plus class="mix-add-slot__glyph" aria-hidden="true" />
</button>
```

But the repeat of that wrapper at 4 sites (below) is the tell that the *right* home is a glass-ui
primitive: **`Chip` already exists as a glass-ui subpath (`@mkbabb/glass-ui/chip`)**. The idiomatic
cure is a glass-ui `SwatchButton` (or a `Chip` variant) that composes `WatercolorDot` as its paint
and owns the seat semantics once — relayed to the glass-ui BH inbox per the standing relay edict.

---

## L-2 · BLOCKER — the phantom API is repo-wide: 21 of 23 call sites, 4 dead controls

Static census (script run against `demo/**/*.vue`, HEAD `c654824e`):

```
total <WatercolorDot> call sites: 23
call sites passing an attr/child WatercolorDot 7.0.0 DROPS: 21
  demo/color-session/ColorSpaceSelector.vue:81                      -> tag
  demo/palettes/browser/card/CurrentPaletteEditor.vue:62,64         -> tag
  demo/palettes/browser/card/CurrentPaletteEditor.vue:95            -> @click,SLOT-CHILDREN,aria-label,tag   ← DEAD CONTROL
  demo/palettes/browser/card/SwatchHoverMenu.vue:14,29              -> aria-label,tag
  demo/picker/controls/ComponentSliders/ConsoleRail.vue:57          -> tag
  demo/shared/ui/EmptyState.vue:45,46,47                            -> tag
  demo/shell/dock/Dock.vue:136,138                                  -> tag
  demo/shell/dock/Dock.vue:271                                      -> SLOT-CHILDREN,tag                     ← dock seal glyph dropped
  demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:26   -> tag
  demo/workbenches/generate/GenerateControls.vue:199                -> @click,aria-label,tag                 ← DEAD CONTROL
  demo/workbenches/mix/MixResultDisplay.vue:64,79                   -> tag
  demo/workbenches/mix/MixResultDisplay.vue:97                      -> tag,title
  demo/workbenches/mix/MixSourceSelector.vue:146                    -> tag,title
  demo/workbenches/mix/MixSourceSelector.vue:164                    -> @click,SLOT-CHILDREN,aria-label,disabled,tag  ← DEAD CONTROL
  demo/workbenches/mix/MixSourceSelector.vue:211                    -> @click,aria-label,tag,title           ← DEAD CONTROL
```

MixSourceSelector holds **2 of the 4** dead interactive controls and is the **only** site that also
loses a `:disabled` guard. `Dock.vue:271` loses the dock seal's slot glyph. This is one mechanism
with 21 instances — a single cure retires all of them.

---

## L-3 · MAJOR — the hard demo-typecheck gate is structurally blind to L-1 and L-2

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "exit=$?"
exit=0
```

Zero diagnostics. Vue's type system models an unknown prop on a component as a legal fallthrough
attribute, and models nothing at all about `inheritAttrs: false` attr-suppression or about slot
content handed to a slotless component. `npm run lint` cannot see it either — it is not a lint
class. W44 flipped these steps to HARD and the run went green **while shipping a dead primary
affordance**.

This is a gate-design defect, not merely a code defect: the adoption of a producer major version
was certified by gates that are provably incapable of detecting the exact breakage a major version
introduces (a deleted prop, a deleted slot, a flipped `inheritAttrs`).

**Cure:** the producer-adoption gate needs a *behavioural* oracle, not a type oracle. The cheapest
sufficient one is an e2e assertion that every element carrying `@click` in a `.vue` template is
hit-testable and focusable — or, structurally, an ESLint rule that forbids `@click`/`aria-label`/
`:disabled`/`tag=` on any glass-ui component whose `.d.ts` declares neither the prop nor
`inheritAttrs: true`. The second is derivable mechanically from the shipped `.d.ts` surface.

---

## L-4 · MAJOR — three design-system import idioms in one 10-line block; a single-consumer alias barrel

`MixSourceSelector.vue:4-8`:

```ts
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";                                  // subpath
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";  // demo alias barrel
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";                        // subpath
```

`demo/ui/collapsible/index.ts` in full — 88 bytes, one line:

```ts
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mkbabb/glass-ui";
```

Measurements:

- **`demo/ui/collapsible` has exactly ONE consumer in the entire repo — this file.**
  (`grep -rl "Collapsible" demo` → `demo/ui/collapsible/index.ts`, `MixSourceSelector.vue`.)
- glass-ui ships **`./collapsible` as a first-class subpath** (74 subpaths in
  `node_modules/@mkbabb/glass-ui/package.json#exports`). `dist/collapsible.js` is **147 bytes**;
  the root barrel `dist/glass-ui.js` the alias re-exports through is **25,239 bytes**.
- `demo/ui/switch` and `demo/ui/label` have **zero** consumers — dead barrels.

The barrel layer is a documented **migration shim**, in its own words. `demo/ui/alert/index.ts`:

> *"This barrel previously held a local shadcn-vue re-implementation … B.W2 … converted it to a
> re-export … The two consumers … import from this barrel unchanged."*

"import from this barrel unchanged" is the definition of a back-compat alias, which standing edict
2 forbids outright. 48 demo files import through the barrels; 79 import glass-ui directly. The
layer is half-retired and unowned.

**Cure:** delete `demo/ui/` entirely. Every barrel is a bare re-export; every consumer rewrites to
the glass-ui subpath (`@mkbabb/glass-ui/collapsible`, `/button`, `/card`, …). One idiom, one home,
one hop, and the subpath import is the only form that is honest about what a real consumer writes.

---

## L-5 · MAJOR — identity is invented in the view, and the surrogate keys are unstable

`MixSourceSelector.vue:78-98` — 20 lines of component-local mutable state to manufacture a key:

```ts
let swatchKeyCounter = 0;
const swatchKeyMap = new Map<string, number>();
const swatchKeys = computed(() =>
    selectedColors.map((sc, i) => {
        const mapKey = `${sc.css}::${i}`;
        if (!swatchKeyMap.has(mapKey)) swatchKeyMap.set(mapKey, swatchKeyCounter++);
        return swatchKeyMap.get(mapKey)!;
    }),
);
watch(() => selectedColors, () => { /* prune stale mapKeys */ });
```

The function is a pure function of `(css, index)`. It is therefore **exactly equivalent** to
`:key="\`${sc.css}::${i}\`"` — the Map, the counter, and the watcher buy nothing. Worse, it is
*wrong*: deterministic replay of the exact algorithm —

```
$ node -e "<verbatim replay of lines 79-89>"
[A,B,C]      -> [ 0, 1, 2 ]
remove A -> [B,C] -> [ 3, 4 ]
=> B and C receive BRAND-NEW keys: TransitionGroup sees 3 leaves + 2 enters, not 1 leave + 2 moves
```

Removing any non-last chip re-mints the key of every chip after it. `<TransitionGroup name="vj-enter">`
(line 120) consequently unmounts and re-enters the survivors instead of FLIP-moving them — the one
thing a `TransitionGroup` key exists to prevent. (Currently unobservable because L-1 makes it
impossible to get two chips into the row; it becomes visible the instant L-1 is cured.)

The real defect is a boundary error: **identity is a state-machine concern, and the state machine
does not model it.** `useMixingState.ts:26-29`:

```ts
export interface SelectedColor { css: string; source: string; }
```

**Cure (architectural transposition):** give `SelectedColor` an `id`, minted at `addColor`:

```ts
export interface SelectedColor { id: string; css: string; source: string; }
function addColor(css: string, source = "picker") {
    selectedColors.value = [...selectedColors.value, { id: crypto.randomUUID(), css, source }];
}
```

The view keys on `sc.id`; lines 78-98 delete entirely; the removal choreography becomes correct by
construction; and duplicate colors (legal, and currently colliding in the `css::i` map when
re-added at the same index) become first-class.

---

## L-6 · MAJOR — two disagreeing contracts on one injected port, four lines apart

| site | contract |
|---|---|
| `MixPane.vue:16` | `const pm = inject(LIBRARY_PORT_KEY)!;` — asserts presence |
| `MixSourceSelector.vue:33-34` | `const pm = inject(LIBRARY_PORT_KEY);` + `pm?.savedPalettes.value ?? []` — masks absence |

Parent and child, same port, same feature directory, opposite assumptions. The `?.` + `?? []` is a
**masking fallback** — standing edict 2. If the provider is ever absent, `MixPane` throws loudly on
line 43 and `MixSourceSelector` silently renders an empty-state lie.

There is a deeper boundary error underneath. `MixSourceSelector` is otherwise **100% controlled**:
four props in (`mode`, `selectedColors`, `selectedPalettes`, `cssColorOpaque`), five emits out
(lines 25-31). The single `inject` is the one impurity, and it is redundant — `MixPane` **already**
holds `pm` (line 16) and could pass `savedPalettes` down with the other four props. As written the
component cannot be mounted, storybooked, or unit-tested outside a `providePalettePorts` tree, for
one array.

Note also the coupling direction: a **workbench** (`demo/workbenches/mix/`) imports an injection key
from a **sibling feature's** composable (`demo/palettes/usePalettePorts`) and two SFCs from that
feature's *sub*-directory (`demo/palettes/browser/card`, line 8). `workbenches/mix` → `palettes` →
`palettes/browser` is a three-level reach across a peer boundary.

**Cure:** drop the `inject`; add `savedPalettes: Palette[]` to the prop list. `MixPane` becomes the
only place in the mix workbench that knows the palettes feature exists — one seam instead of two,
and the leaf becomes a pure function of its props.

---

## L-7 · MAJOR — `<button>` wrapping `PaletteCard`: nested interactive content + per-instance override

`MixSourceSelector.vue:246-268` wraps the whole `PaletteCard` in a native `<button>` to add
selection semantics and a selection ring:

```html
<button type="button" :aria-pressed="…" :class="[…, isPaletteSelected(palette.slug)
        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
        : 'opacity-75 hover:opacity-100']" @click="togglePalette(palette)">
    <PaletteCard :palette="palette" :css-color="''" />
</button>
```

`PaletteCard` is not phrasing content. It renders, among others, a glass-ui `<Button icon-only>`
menu trigger (`PaletteCard.vue:96-104`), a `@click.stop` rename affordance
(`PaletteCard.vue:56-59`), and an expandable swatch grid with popovers
(`PaletteCard.vue:139-150`). HTML Living Standard, §4.10.6 `<button>` content model:

> *Phrasing content, but there must be no interactive content descendant and no descendant with
> the `tabindex` attribute specified.*

So this is a content-model violation with real consequences: a nested `<button>` inside a `<button>`
has undefined activation behaviour, and the inner control's click bubbles to the outer toggle.

It is also a **per-instance styling override** — standing edict 5 — of a component that already
owns a full interaction register (`cartoon-surface`, `press.handlers`, `press.pressStyle`,
`role="article"`, `@click`). The component's own comment at lines 137-145 excises a `ring-2` from a
`WatercolorDot` as CASCADE-DEAD and declares a register law; 110 lines later the same `ring-2`
idiom is re-minted on a wrapper. And `:css-color="''"` (L-10) is an explicit empty string passed to
an **optional** prop purely to satisfy the call shape.

**Cure:** `PaletteCard` owns `selected?: boolean` and emits `toggle`, rendering `aria-pressed` and
the selection register on its own root (where the `cartoon-surface` cascade is already resolved).
The wrapper `<button>`, the class array, and the `:css-color=""` all die. One home for
"a selectable palette card", used by Mix and by any future multi-select consumer.

---

## L-8 · MAJOR — `demo/palettes/mix.ts` is in the wrong home, and `test/` depends on `demo/`

`demo/palettes/mix.ts` (146 lines) implements N-ary weighted color mixing plus three
length-reconciliation strategies (`discard`/`repeat`/`distribute`). Its only consumers:

```
demo/workbenches/mix/MixConfigBar.vue:14            (type LeftoverStrategy)
demo/workbenches/mix/composables/useMixingState.ts:21
test/mix-v4.test.ts:4
```

Two problems, both directional:

1. **It lives in `palettes/`, is used only by `workbenches/mix/`.** The concept "how to mix" is the
   mix workbench's domain; `palettes/` owns storage and browsing.
2. **The library's own test suite reaches into the demo tree.** `test/mix-v4.test.ts:4`:
   `import { mixColorSequence } from "../demo/palettes/mix";`. This is not an isolated case —
   **10 files under `test/` import from `../demo/`** (`status-lamp`, `slider-announcement`,
   `value-domain-clamp`, `gradient-parse`, `ink`, `gradient-v4-consume`, `view-accents`,
   `image-sampler-v4`, `preview-chips`, `mix-v4`), and `vitest.config.ts:21` includes them by
   design. `test/` is the library's coverage; `demo/` is the library's *consumer*. The arrow points
   backwards.

The content is the tell. `@mkbabb/value.js/color` ships only **binary** `mixColors(from, to,
progress, {space, hue})` (`src/subpaths/color.ts:29`). `demo/palettes/mix.ts` is a *generalization*
of a library primitive — N-ary, weighted, sequence-and-matrix — sitting in the demo. It is exactly
the kind of thing the library should own, which is why the library's tests already treat it as
library code.

**Cure:** promote N-ary weighted mixing into `src/units/color/` and export it from
`@mkbabb/value.js/color` (`mixColorSequence`, and the palette-shaped `mixSequences` with its
leftover strategy as a plain enum — no `Palette` type crosses the boundary, only
`readonly AnyColor[][]`). `test/mix-v4.test.ts` then tests `src/` and stops importing `demo/`. The
thin demo adapter that maps `Palette[] → AnyColor[][]` moves to
`demo/workbenches/mix/composables/`, where its one consumer lives.

---

## L-9 · MINOR — `tsconfig.demo.json` paths ≠ `package.json#exports`; a false published surface

```
$ python3 <compare exports keys vs tsconfig.demo.json paths>
exports  : ['color', 'css', 'easing', 'math', 'quantize', 'transform', 'value']
tsc paths: ['.', 'color', 'easing', 'math', 'parsing', 'quantize', 'transform', 'units']
in tsconfig but NOT published: ['.', 'parsing', 'units']
published but NOT in tsconfig: ['css', 'value']
```

Proven against the real resolver (Node, against the installed `@mkbabb/value.js@4.0.0`):

```
BARE ROOT: ERR_PACKAGE_PATH_NOT_EXPORTED - No "exports" main defined in …/@mkbabb/value.js/package.json
/parsing:  ERR_PACKAGE_PATH_NOT_EXPORTED
/units:    ERR_PACKAGE_PATH_NOT_EXPORTED
/color:    RESOLVED, keys= 23
```

Three consequences:

- `tsconfig.demo.json` maps `"@mkbabb/value.js"` → `"./dist/index.d.ts"`, a file that **does not
  exist** (`ls dist/index.d.ts` → MISSING), for an export key that **does not exist**. A demo file
  writing the bare specifier would typecheck-fail *and* runtime-fail — but the tsconfig comment
  advertises it as one of "the 8 public keys … a CLOSED 8-key set" (the map is 7 keys, and a
  *different* 7). `demo/shared/utils.ts:14-16` repeats the falsehood: *"the library's root-barrel
  export stands for external consumers"* — it does not; no external consumer can reach it.
- `/parsing` and `/units` are TS paths for subpaths that exist in neither `src/subpaths/` nor
  `exports`. A demo import of either would **typecheck clean and fail at runtime** —
  `vite.config.ts:41-50` generates its alias set from `package.json#exports`, so Vite has no entry
  and Node rejects the bare specifier.
- `/css` (used **10×** in `demo/`) and `/value` are absent from the tsconfig paths, so vue-tsc
  resolves them through `node_modules/@mkbabb/value.js` — a **self-installed copy of the published
  tarball**, a different artifact from `./dist` that Vite aliases at runtime. Same version today
  (4.0.0 / 4.0.0), so no live break; but type-time and run-time are resolving two different files,
  which is the precise thing the "dist trust boundary" was built to prevent.

`MixSourceSelector.vue` imports no value.js specifier itself (its data is CSS strings all the way
down) — so this is a finding *on this component's axis* rather than *caused by* it. Its sibling
`useMixingState.ts:20` sits on the surface correctly (`import type { HueInterpolationMethod } from
"@mkbabb/value.js/color"` — published subpath, `import type`, `verbatimModuleSyntax`-clean).

**Cure:** generate the tsconfig `paths` from `package.json#exports` the way `vite.config.ts` already
generates its alias set (a 6-line `scripts/` step writing a generated `tsconfig.paths.json` the demo
program extends), so the three surfaces — Node exports, Vite aliases, TS paths — cannot drift. Then
either add a `"."` export or delete every claim that a root barrel is reachable.

---

## L-10 · MINOR — `:css-color="''"` defeats `PaletteCard`'s empty sentinel

`MixSourceSelector.vue:266` passes an empty string to an **optional** prop
(`PaletteCard.vue:186`: `cssColor?: string | undefined`). `PaletteCard.vue:226`:

```ts
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);
```

`'' ` is not nullish, so `?? EMPTY_PALETTE_SWATCH` ("#888", line 223) can never fire for this
consumer: a zero-color palette renders `firstColor === ''` here and `"#888"` at every other call
site (`BrowsePane.vue:92`, `PalettesPane.vue:82`, `ExtractWorkbench.vue:145`,
`AdminUsersPanel.vue:140`). **HYPOTHESIS** for reachability — I did not find a path that persists a
zero-color palette (`createPalette` is always called with ≥ 1 color), so this is a latent
divergence rather than a demonstrated break. The *contrivance* is not a hypothesis: the prop is
optional and should simply be omitted (standing edict 3).

---

## L-11 · MINOR — dead scoped CSS and a redundant built-in import

- `MixSourceSelector.vue:275-282`: the `.add-slot-ghost { display:inline-flex; align-items:center;
  justify-content:center }` scoped block exists solely to centre the `<Plus>` glyph. There is no
  slot, so it centres nothing. Live computed `display` on that element is `flex` — the rule applies
  and has no effect. It dies with L-1's cure (the glyph moves into the real `<button>`).
- `MixSourceSelector.vue:2`: `import { … TransitionGroup } from "vue"`. `<TransitionGroup>` is a
  compiler built-in resolved without an import (as `<Transition>` is in `MixPane.vue:111`, which
  imports nothing). Inconsistent with its own sibling, and noise.

---

## L-12 · INFO — `EmptyState` is a design-system primitive living in the demo

`demo/shared/ui/EmptyState.vue` (5,304 bytes) ships two ratified species (`empty` / `error`), a
seeded `WatercolorDot` ghost trio, an eyebrow/message/hint type ladder, `role="status"` vs
`role="alert"`, and an `action` slot. It has **12 consumers** across five features (mix, palettes,
browse, admin ×5, markdown, error boundary, three card modules).

That is a design-system component by every measure except its address. glass-ui's 74 subpaths do
not include one. Standing edict 4 puts variants and primitives in glass-ui; `demo/shared/ui/` is
the same half-retired indirection layer as `demo/ui/` (L-4), one directory over.

**Cure:** relay `EmptyState` to glass-ui as a first-class primitive (`@mkbabb/glass-ui/empty-state`),
composing the existing `WatercolorDot`. This is a producer relay under the standing BH/BI edict, and
it retires `demo/shared/ui/` down to `PaneHeader.vue` alone — which should follow it.

---

## The greenfield lattice

If I were structuring this today with no legacy, the mix workbench would be four layers with one
arrow direction and no back-edges:

```
@mkbabb/value.js/color        ← N-ary weighted mixing lives HERE (L-8)
    mixColors(a,b,t,opts)  ·  mixColorSequence(colors[], weights[], opts)
    mixSequences(rows: AnyColor[][], opts) → AnyColor[]
        ▲ pure, no Vue, no Palette, tested by test/ (which imports NOTHING from demo/)
        │
@mkbabb/glass-ui              ← every seat + every primitive lives HERE (L-1, L-4, L-7, L-12)
    /watercolor-dot  WatercolorDot        (paint — unchanged, the producer ruling stands)
    /chip            SwatchButton          NEW: the seat that composes the paint
    /empty-state     EmptyState            PROMOTED from demo/shared/ui
    /collapsible /tabs /card …            consumed by SUBPATH, never through a demo barrel
        ▲
        │
demo/palettes/                ← storage + identity + the card, only
    types.ts  usePaletteStore  usePalettePorts  browser/card/{PaletteCard(+selected/@toggle), PaletteColorStrip}
        ▲                                                        ↑ owns its own selection register (L-7)
        │
demo/workbenches/mix/         ← the workbench owns its whole domain
    composables/useMixingState.ts   ← SelectedColor carries `id` (L-5); state machine owns identity
    composables/paletteMix.ts       ← the thin Palette[] → AnyColor[][] adapter (L-8)
    MixPane.vue                     ← THE ONLY seam to demo/palettes: injects LIBRARY_PORT once
    MixSourceSelector.vue           ← 5 props in, 5 emits out, ZERO injects (L-6)
    MixConfigBar.vue  MixResultDisplay.vue  MixAnimationCanvas/
```

Concretely, on `MixSourceSelector.vue` itself: **283 → ~150 lines**, and its import block loses two
edges and gains none.

- lines 78-98 delete (identity moves to `useMixingState`, L-5)
- lines 275-282 delete (dead scoped CSS, L-11)
- line 5 becomes `@mkbabb/glass-ui/collapsible`; `demo/ui/` ceases to exist (L-4)
- line 6 deletes; `savedPalettes` arrives as a prop (L-6)
- line 9 becomes `@mkbabb/glass-ui/empty-state` (L-12)
- lines 164-176 and 211-221 become `<SwatchButton>` from glass-ui — one seat, real semantics (L-1)
- lines 246-268 become `<PaletteCard :selected @toggle>` — no wrapper button, no class array (L-7)

Deletions: **two whole directories** (`demo/ui/`, and `demo/shared/ui/` after `PaneHeader` follows),
one file's worth of surrogate-identity machinery, one 146-line module relocated across a repo
boundary, and one back-edge from `test/` to `demo/`. Nothing is added to the demo. Every addition is
in a producer where the concept is already at home.

---

## What I checked and did NOT find defective

- **The value.js public surface is not violated by this component.** It imports no `@mkbabb/value.js`
  specifier at all; its sibling `useMixingState.ts:20` uses the published subpath
  `@mkbabb/value.js/color` with `import type`. No `@src/*` reach, no deep path into `src/` anywhere
  in the mix workbench. `tsconfig.demo.json` no longer carries an `@src/*` path; `vite.config.ts:74`
  keeps `@src` only for the `assets/docs/*.md` source-embed plugin. The T.W1 dogfood keystone holds
  here.
- **`verbatimModuleSyntax` is clean.** Both type-only imports (lines 10, 11) are `import type`.
  `npx vue-tsc -p tsconfig.demo.json --noEmit` → exit 0.
- **Vue 3.5 idioms are correct**: reactive props destructure (lines 13-23), `computed` over
  destructured props (lines 34, 39, 40, 81) — the props stay reactive under 3.5 destructure.
- **`slug` really is the universal identity** the K-PALID comment (line 55) claims:
  `demo/palettes/types.ts` declares `id?: string` (local-only) and `slug: string` (required). The
  comment is accurate.
- **No god module here.** 283 lines, one concern (source selection), five emits. The composable it
  types against (`useMixingState.ts`, 138 lines) is likewise small and single-purpose, and the
  ONE-CLOCK law it documents is honoured — it owns no timer.
- **No duplicate implementation of *this* component's concept.** The named historical suspects
  (`ActionBarLayer`/`useLayerTransition`, `palettes/export.ts` vs `export/serializers`, the three
  `useDark` stores) do not touch this tree — `grep -rn "useLayerTransition\|usePaletteExport" demo`
  finds nothing in `workbenches/mix/`.
- **No animation was deleted, only excised-with-reason.** The `ring-2` removal at lines 137-145 and
  the counter removals at 118-119 / 269-270 are documented excisions of dead or redundant
  affordances, not lost motion. `vj-enter` / `vj-morph` are global demo keyframe families.
- **The visual matrix rows for `/#/mix` are clean of this component's fingerprints.** `REPORT.json`
  `/#/mix` × 4 matrices: `overflowX: 0`, `pageErrors: []`, `consoleErrors: []`, `main: 1`. The 8
  `smallTapTargets` are the login capsule (`Switch to slug`, `Generate new slug`, `Cancel`, 22×22)
  and the picker channel rails (`L/a/b/ALPHA channel`, 12×24) — the shell and the picker, not this
  component. The 1 `namelessButton` appears on 6 desktop routes and 0 mobile routes ⇒ dock-level.
  **The probes are silent about L-1 precisely because the dead controls are not `<button>`s** — the
  matrix's blindness is itself corroboration.

---
---

# §P2 — Pass 2 (Opus 5, second seating)

Everything in this section is new evidence gathered in a second, independent seating. Where it
touches a pass-1 finding I say so explicitly. No source file was edited; all probe artefacts were
written to the session scratchpad, never into the repo tree.

## P2-0 · Independent re-derivation of L-1 — CONFIRMED, and the repo's own gate is RED

Pass 1 proved L-1 from the glass-ui source and a synthetic click. I re-derived it from the
**published dist** (`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — `inheritAttrs: !1`,
hardcoded `o("span", { "aria-hidden": "true", style: […, pointerEvents: "none"] })`, no
`renderSlot`, props `{color, variant, animate, cycleDuration, range, seed}`) and from a live
hit-test at the control's own centre:

```
add-slot rect:            x=1276.4 y=295.5 w=49.5 h=49.5
elementFromPoint(centre): DIV.swatch-row …          ← the PARENT, not the control
click at centre → [data-mix-source] count: 0 → 0
"Mix" button .disabled:   true
```

**The new fact pass 1 did not have.** Pass 1's L-3 concluded that the gates are blind and CI is
green. That is true of `vue-tsc` and `eslint` — and **false of the e2e suite, which encodes this
exact contract and is failing today**:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line --workers=1
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate
     Test timeout of 30000ms exceeded.
     Error: expect(locator).toBeVisible() failed
     Locator: getByRole('main', { name: 'Color tool panes' })
              .getByRole('button', { name: 'Add current color to the mix' })
     Expected: visible
     Error: element(s) not found
  1 failed
```

`e2e/smoke/safari/mix-flow.spec.ts:31-34` asserts the identical locator and fails identically by
construction. So the correct statement of the gate defect is sharper than pass 1's: **the
behavioural oracle L-3 proposes already exists, is already written, already fails — and is not
gating.** The cure is therefore cheaper than pass 1 assumed (no new oracle to design) and the
process defect is graver (a red suite is being carried). This should be the first thing the
mega-tranche's mix wave asserts.

---

## L-13 · **BLOCKER (new)** — `package.json` `"sideEffects": false` deletes the entire demo application from the production build

**The claim.** `demo/` and `src/` share one package manifest. `package.json:20` declares
`"sideEffects": false` — correct and load-bearing for the published library, catastrophic for the
application in the same tree. `vite build --mode gh-pages` emits **zero application JavaScript**.
`MixSourceSelector.vue` is absent from the production bundle entirely.

**Evidence 1 — reproduced into the scratchpad, repo tree untouched.**

```
$ npx vite build --mode gh-pages --outDir <scratchpad>/ghp --emptyOutDir
  … ghp/assets/index-Dezn_h7o.js   0.69 kB │ gzip: 0.39 kB
  ✓ built in 6.38s

$ ls <scratchpad>/ghp/assets/*.js  <scratchpad>/ghp/assets/*.css
  glass-fonts-DH5GtBvs.css     132943   ← fonts only
  index-Dezn_h7o.js               698   ← the Vite modulepreload polyfill IIFE, nothing else
  quantize-worker-xMwe415C.js   11774   ← a worker, emitted from its own entry
```

`cat index-Dezn_h7o.js` is the polyfill and nothing more. No `createApp`, no `App.vue`, no
application CSS bundle. The built `index.html:205` points its module entry at that file. The repo's
stale `dist/gh-pages/` carries the **same content hash** (`index-Dezn_h7o.js`), so this is the
standing state, not a one-off. (This is the `§F` W44 carry the CARRY-LEDGER names as "the gh-pages
prod-preview empty-mount" — here it is, with a cause.)

**Evidence 2 — minimal A/B isolating the single variable.** Three files in the scratchpad, built
with this repo's own Vite binary; the *only* difference between arms is the `sideEffects` field:

```
package.json { "sideEffects": false }  → dist/assets/index-Dezn_h7o.js  698 bytes
                                          (polyfill only; boot() eliminated)
package.json { }                       → dist/assets/index-e_Viud93.js  754 bytes
                                          …;function e(){document.body.textContent=`MOUNTED-OK`}e();
```

The `sideEffects:false` arm emits an entry chunk whose **content hash is byte-identical to the real
gh-pages build's** — the strongest available confirmation that the real entry chunk contains the
polyfill and nothing else.

**Mechanism.** One manifest owns two artifacts with contradictory requirements: a tree-shakeable ES
library (for which `sideEffects: false` is correct and valuable) and an application whose entry is
*pure side effect*. Rolldown reads the manifest, concludes every module in this package is
side-effect-free, and eliminates the application entry — which, being an inline
`<script type="module">` at `demo/color-picker/index.html:205-213` that exports nothing, is 100%
dead code under that assumption.

**Why this is the pass-2 headline.** It subsumes the whole component axis: every other finding in
this document concerns how `MixSourceSelector.vue` behaves in the shipped app, and in the shipped
production bundle **it does not exist**. L-1 makes the component inoperable in dev; L-13 makes it
absent in prod.

**Proposed cure — architectural transposition, not a flag edit.** The boundary is wrong, not the
value. `demo/` becomes its own package in an npm workspace: `demo/package.json`, its own dependency
set, no `sideEffects` field, and `@mkbabb/value.js` as a real `file:..` dependency. That one move
also (a) makes the demo a *genuine external consumer* of the published surface — the dogfood proof
the T.W1 keystone asserts and `vite.config.ts`'s `valueJsSelfAlias` currently simulates — and (b)
deletes the entire drifted `tsconfig.demo.json` `paths` block (L-9 / L-17). Editing the field to
`"sideEffects": ["demo/**"]` would also make the build pass and is exactly the masking patch
standing edict 2 forbids: it leaves the application inside the library's manifest, and the next
drift is guaranteed.

---

## L-14 · **MAJOR (new)** — the demo module-boundary lattice in `eslint.config.js` is dead code; **no** import rule applies to this file

Pass 1 (L-4, L-6, L-8) argues several boundary crossings. None of them is enforced, and I measured
why rather than reading it.

```
$ npx eslint --print-config demo/workbenches/mix/MixSourceSelector.vue | jq '.rules["no-restricted-imports"]'
  null
$ npx eslint --print-config src/value.ts | jq '.rules["no-restricted-imports"]'
  [2, {"patterns":[{"group":["@mkbabb/glass-ui","@mkbabb/glass-ui/*"], "message":"inv-K-1: …"}]}]
```

The library invariant (inv-K-1) is **live**. Every demo invariant is **unset** for this file.
The three named demo rules — G-DEMO-1, G-DEMO-3a, G-DEMO-3b, with extensive prose about the
palette-browser barrel seam — are scoped to globs that match essentially nothing:

```
$ ls -d demo/@                                    → ls: demo/@: No such file or directory
$ find demo/color-picker -name '*.vue' | wc -l    → 2
$ find demo             -name '*.vue' | wc -l     → 88
$ grep -rn "@components" demo/ tsconfig.demo.json
  demo/DESIGN.md:384 · demo/palettes/browser/status/index.ts:5   (prose only)
  tsconfig.demo.json:33  ← records the alias as KILLED at W43 (RF-15)
```

The globs are `demo/@/components/**`, `demo/@/lib/**`, `demo/@/composables/**` (a directory that
does not exist) and `demo/color-picker/**` (2 of 88 `.vue` files); the banned specifier
`@components/custom/palette-browser/**/*.vue` names an alias the demo deleted a tranche ago. So the
seam law that `demo/palettes/browser/index.ts:6-8` advertises as *"the G-DEMO-3b boundary
(eslint.config.js) enforces it standing"* is enforced for **zero** of its consumers, this file
included.

**Mechanism.** The lattice was keyed to a *physical* tree layout; W43 moved the tree and the config
was never re-keyed. Prose survived; enforcement did not. That is precisely how pass 1's L-4 shim
edge and L-6 cross-feature edge stayed alive through a hardened CI.

**Proposed cure.** Re-key the lattice onto the tree that exists — the eight real demo areas
(`color-session`, `palettes`, `picker`, `platform`, `scenes`, `shared`, `shell`, `workbenches`) —
as *layer* bans rather than *alias* bans: a workbench may reach `../../palettes/{types,browser/*}`
(declared seams) but not `../../palettes/use*` (feature internals); nothing outside `shell/` may
reach `../color-picker/**` (app-root boot). Then add a CI assertion that **every `files:` glob
matches ≥ 1 file**, so the next restructure fails the gate instead of silently disarming it.

---

## L-15 · **MAJOR (new)** — `strictTemplates` is off; turning it on fires **7** errors in this file, and I measured the cure's exact cost

Pass 1's L-3 establishes that `vue-tsc` cannot see L-1. It is worth stating *why* and what the cure
costs, because "turn on strictTemplates" is not free and should not be planned as if it were.

```
$ grep -rn "vueCompilerOptions\|strictTemplates" tsconfig*.json    → (no output)
$ time npx vue-tsc -p tsconfig.demo.json --noEmit
  21.2s total,  0 errors                                            ← GREEN today
```

Scratchpad probe extending `tsconfig.demo.json` with `vueCompilerOptions.strictTemplates: true`,
`include` = this file only:

```
MixSourceSelector.vue(150,30) TS2353  'title'           not in WatercolorDot props
MixSourceSelector.vue(171,25) TS2353  'aria-label'      not in WatercolorDot props
MixSourceSelector.vue(173,26) TS2353  'onClick'         not in WatercolorDot props
MixSourceSelector.vue(217,38) TS2353  'title'           not in WatercolorDot props
MixSourceSelector.vue(220,38) TS2353  'onClick'         not in WatercolorDot props
MixSourceSelector.vue(131,25) TS2353  'data-mix-source' not in HTMLAttributes & ReservedProps
MixSourceSelector.vue(252,18) TS2353  'data-mix-source' not in ButtonHTMLAttributes & ReservedProps
```

Five of the seven **are** L-1, caught statically at zero runtime cost. Two are the price: vue-tsc's
template checking has no JSX-style `data-*` carve-out, so the mix choreography's DOM protocol
(L-18) must be declared. A second probe with the granular flags
`{ checkUnknownProps: true, checkUnknownEvents: true }` produces the **identical** seven — the
narrower switch buys nothing here and does **not** exempt `data-*`. Plan for it; do not discover it
mid-wave.

Note `tag="div"` / `tag="button"` (lines 148, 167, 215) is **not** flagged even under
strictTemplates — it is absorbed by `AllowedComponentProps`. Type-checking narrows the hole; only
pass 1's L-1 architectural cure closes it. The two must land together.

**Proposed cure.** `"vueCompilerOptions": { "strictTemplates": true }` in `tsconfig.demo.json`
(demo only — the library program has no templates), landed with (a) the L-1 seat repair and (b) one
ambient `HTMLAttributes` augmentation declaring the three mix-stage data attributes, which L-18
wants anyway.

---

## L-16 · **MAJOR (new)** — the measured cost of pass 1's L-4 and L-6 edges

Pass 1 argued both structurally. Here are the numbers, computed as static module closures the way a
bundler walks them.

**L-4, the `demo/ui/collapsible` shim → glass-ui *root* barrel.** Closure over glass-ui's own
`dist/`:

```
dist/glass-ui.js        (root ".")            66 modules   224,193 bytes
dist/collapsible.js     ("./collapsible")      3 modules     7,407 bytes   ← 30.3× smaller
dist/tabs.js            ("./tabs")            20 modules    50,466 bytes
dist/watercolor-dot.js  ("./watercolor-dot")   6 modules     9,503 bytes
```

`MixSourceSelector.vue` reaches `SegmentedTabs` and `WatercolorDot` by subpath (lines 4, 7) and
`Collapsible` through the root barrel (line 5) — a **30.3×** larger module graph for the one import
that uses the shim. glass-ui declares `"sideEffects": ["*.css"]`, so the CSS carried by those 66
modules is explicitly **not** prunable even where the JS is — which is the same tree-shake-honesty
argument `demo/palettes/browser/index.ts` (PI-6 / T.W1 F7) already writes down for its own
sub-barrels. The palettes feature learned this; `demo/ui/` never did.

Repo-wide idiom census (my counts; pass 1's 48/79 measured a different grep shape — both show the
split, mine counts import *sites* including `.ts`):

```
$ ls demo/ui | wc -l                                          → 19  (all pure re-export shims)
$ grep -L "@mkbabb/glass-ui" demo/ui/*/index.ts                → (empty — none has content)
$ grep -rn 'from "\.\./*.*ui/' demo --include=*.vue --include=*.ts | grep -v shared/ui | wc -l  → 90
$ grep -rn "@mkbabb/glass-ui/" demo --include=*.vue --include=*.ts | wc -l                      → 85
```

Ninety sites through shims, eighty-five direct: two live paths to one design system.

**Weakening note, stated honestly:** I could not measure *delivered* bytes for this edge, because
the production build emits no application JS at all (L-13), and the live network probe was
unavailable (a concurrent seat held the MCP browser). The 224 kB figure is an exact static-closure
measurement; the delivered-bytes claim is a **hypothesis** pending L-13's cure.

**L-6, the `LIBRARY_PORT_KEY` import.** Closure over the demo tree, resolving
`.ts`/`.vue`/`index.ts`:

```
MixSourceSelector.vue  full closure                  96 local modules   387,167 bytes
MixSourceSelector.vue  with usePalettePorts.ts cut   54 local modules   219,029 bytes
                                              delta  42 modules         168,138 bytes
```

Importing **one `Symbol`** drags in 42 modules: `demo/palettes/api/{admin-audit,admin-colors,
admin-palettes,admin-users,versions}.ts` and the SFCs `AdminUsersPanel.vue`, `AdminAuditPanel.vue`,
`AdminNamesPanel.vue`, `AdminTagsPanel.vue`, `AdminFlaggedPanel.vue`, `AdminListItem.vue`,
`PaginationBar.vue`, `PaletteSlugBar.vue`. `vue-router` enters this leaf's external set through
this edge and no other. A public colour-mixing selector statically depends on the admin API client.

Independent corroboration from the type layer: a tsconfig whose `include` names **exactly one
file** builds a program in which **16 distinct `.vue` files** report strictTemplates errors — all
of them admin/browse surfaces reached only through this import.

`MixPane.vue:16` is a lazy `defineAsyncComponent` boundary (`demo/shell/usePaneRouter.ts:75`), so
the pollution lands on a real code-split seam.

**Structural addendum to pass 1's cure.** Pass 1 says "drop the inject, add a prop" — correct, and
sufficient here. Make it *unrepeatable*: injection keys are data, not wiring. Move the five
`InjectionKey` constants and the five port types out of `usePalettePorts.ts` into a
dependency-free `demo/palettes/ports.keys.ts`; the provider imports them to `provide()`. A consumer
that needs a key can then never reach the provider graph. `demo/color-session/keys.ts` already
applies exactly this discipline to `CSS_COLOR_KEY` / `EDIT_TARGET_KEY` — the pattern is in-tree;
palettes simply did not adopt it.

---

## L-17 · **CORRECTION to L-9** — the two value.js artifacts are **not** the same file; type-time and run-time resolve different content

Pass 1's L-9 is right about the drift and concludes *"Same version today (4.0.0 / 4.0.0), so no
live break."* That conclusion is too generous. Both artifacts claim `4.0.0`; their **contents
differ**:

```
$ wc -c dist/subpaths/css.d.ts  node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
  12490  dist/subpaths/css.d.ts                                  ← what Vite serves (checkout build)
  10910  node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts    ← what vue-tsc reads (npm tarball)
```

A **1,580-byte divergence** on a surface this component transitively depends on:
`@mkbabb/value.js/css` is imported at `demo/color-session/picker-color.ts:34`,
`generate-color.ts:34`, `view-accent.ts:9` and `ink.ts:11` — all four on
`MixSourceSelector.vue`'s 96-module closure. The demo is typechecked against the published tarball
and executed against the local build. A capability added to the checkout's `css` surface is a
compile error in the demo until the tarball is republished; a capability *removed* from the
checkout still typechecks. Same for `@mkbabb/value.js/value`.

Provenance of the phantom copy, which pass 1 did not trace: `node_modules/@mkbabb/value.js` is a
real directory, not a symlink, and value.js declares **no dependency on itself**. It arrives
transitively — `node_modules/@mkbabb/keyframes.js@6.0.0` declares `"@mkbabb/value.js": "4.0.0"` as
a hard dependency (glass-ui declares it as a peer). So the repo silently contains a second, pinned,
immutable copy of its own published surface, and TS reaches it for exactly the two subpaths the
hand-written `paths` block forgot.

The severity should read **MAJOR**, not MINOR: it is a live dual-resolution of the package's own
public surface, and it is the precise failure the "dist trust boundary" was built to prevent.
Pass 1's cure (generate `paths` from `package.json#exports`) is right; L-13's workspace split makes
it unnecessary, because a real `file:..` dependency needs no `paths` at all.

---

## L-18 · **MAJOR (new)** — the mix choreography is a stringly-typed DOM protocol spanning three modules and three specs

`MixSourceSelector.vue` **writes** `data-mix-source` + `data-mix-color` (lines 131-132) and
`data-mix-colors` — a `JSON.stringify`'d slice — (lines 252-255).
`demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:126-129` **reads** them back with
`root.querySelectorAll<HTMLElement>("[data-mix-source]")` and parses the JSON. Three e2e specs
hard-code the same magic strings (`e2e/smoke/views/mix.spec.ts:45`,
`e2e/smoke/safari/mix-flow.spec.ts:35`, `e2e/smoke/oracles/o15-dock-register.spec.ts:55`).

Five modules share a contract that **no type, no test and no lint rule binds**. Rename an attribute
in the writer and the animation silently stops lifting pigment; the typecheck stays green, the lint
stays green, and only a full e2e run notices — the same suite already demonstrated to be red and
ungated (P2-0).

I am **not** proposing to replace the mechanism: reading real laid-out geometry off the DOM is the
*correct* implementation for a convergence animation that must lift pigment from where the chips
actually are, and `mixStage.ts` is right to do it. The defect is that the vocabulary is undeclared.

**Cure.** One leaf module — `demo/workbenches/mix/mixStageAttrs.ts`, no new directory, no wrapper
(edict 3) — exporting the three attribute names and the `data-mix-colors` payload type, imported by
the writer, the reader, and the ambient `HTMLAttributes` augmentation that L-15's cure requires
anyway. One file discharges both findings; the e2e specs import the same constants instead of
retyping them.

---

## P2 · Additions to the greenfield lattice

Pass 1's lattice stands. Pass 2 adds two layers above it and one law:

```
WORKSPACE ROOT (npm workspaces)
  ├─ packages/value.js/   ← package.json owns "sideEffects": false. Library ONLY. (L-13)
  │     src/  test/       ← test/ imports src/ only; the demo back-edge (L-8) dies here too
  └─ demo/                ← its OWN package.json. No sideEffects field. Explicit main.ts entry.
        depends on @mkbabb/value.js by file: — a GENUINE external consumer, so the
        published surface is proven by construction and tsconfig `paths` ceases to exist (L-9/L-17)

        …then pass 1's four demo layers, unchanged…

LAW, enforced not asserted:
  · eslint demo lattice re-keyed to the eight real areas + a CI check that every glob matches ≥1 file  (L-14)
  · vueCompilerOptions.strictTemplates: true in tsconfig.demo.json                                     (L-15)
  · injection keys live in dependency-free *.keys.ts leaves, never beside their provider              (L-16)
  · the mix DOM protocol is a typed constant module, not a string convention                          (L-18)
  · e2e/smoke/views/mix.spec.ts GATES — it already encodes the truth and is already red               (P2-0)
```

Four properties this buys, each making a finding **unrepresentable** rather than merely fixed:

1. **`demo/` is its own package** — a library publishing hint can no longer reach the app build
   (L-13), and the dogfood proof stops being simulated by a Vite alias (L-9/L-17).
2. **Keys are leaves** — a consumer wanting an injection key cannot reach the admin console (L-16).
3. **`demo/ui/` does not exist** — an import can only name a glass-ui subpath (L-4).
4. **`strictTemplates` on + the lattice re-keyed** — a prop the design system does not publish is a
   compile error, and a boundary crossing is a lint error (L-1, L-14, L-15).

**Ordering.** L-13 first (nothing else reaches production until it lands), then L-1's seat repair
with L-15's strictTemplates in the same wave (they must land together or the typecheck goes red on
a defect that is still shipping), then L-14/L-16/L-18 as the standing-law wave, then pass 1's
L-4/L-7/L-8/L-12 producer relays.

## P2 · What I checked and did NOT find defective

- **The value.js public surface is not violated by this component.** Independently re-confirmed:
  `MixSourceSelector.vue` imports no `@mkbabb/value.js` specifier; the closure's only value.js
  externals are `@mkbabb/value.js/color` and `/css`, both published subpaths, both reached by
  `import type` where type-only. No `@src/*` and no deep `src/` path anywhere on the 96-module
  closure.
- **`verbatimModuleSyntax` is clean** (lines 10, 11 are `import type`). Re-verified.
- **The three named historical suspects are not on this chain.** I computed the closure and searched
  it: `demo/palettes/export.ts` / `usePaletteExport.ts` / `export/serializers` → absent;
  `useLayerTransition` → absent; `useMarkdownHighlighting` / the `useDark` trio → absent. The
  export dual path **is real** (`usePaletteExport.ts:9` imports `./export`; only
  `demo/test/export/byte-exact.test.ts` imports `export/serializers`) but it belongs to another
  component's report, and I do not claim it here.
- **The `/#/mix` visual-matrix rows carry no fingerprint of this component.** `REPORT.json`,
  `safari-desktop-light /#/mix`: `overflowX: 0`, `pageErrors: []`, `consoleErrors: []`, `main: 1`,
  `button: 30`. The 8 `smallTapTargets` are the login capsule (22×22) and the picker channel rails
  (12×24); the 1 `namelessButton` is dock-level. Pass 1's reading is correct and I confirm it —
  **none of the 30 buttons is the add slot or a palette swatch, because those are `aria-hidden`
  `<span>`s the scanner cannot see.** The matrix's silence is corroboration, not absolution.
