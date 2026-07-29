# CHALLENGE-C · `demo/workbenches/generate/GeneratePane.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the tier this seat was spawned with. The
declaration is explicit, not inherited.

- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`
- HEAD at execution: `9268f054` (the prompt named `c654824e`; the branch advanced under the running
  fleet — `git log --oneline -3` pasted below). Nothing under `demo/workbenches/generate/` differs
  between the two: `git log --oneline --follow -- demo/workbenches/generate/GeneratePane.vue` tops
  out at `f2c8f565`, far behind both.
- Writes confined to `docs/tranches/V/megatranche/audit/components/wb-generate-pane/`. No source
  edits. Probes are read-only drivers of the live dev server.

```
$ git log --oneline -3
9268f054 docs(V·mega): picker band COMPLETE 12/12 validated — flagship corpus banked; two bands remain
ef06618b docs(V·mega): L-15.9 — the cwd-poisoning failure class; child scriptPath now ABSOLUTE; palettes relaunched
e9cf0aa4 docs(V·mega): scenes band COMPLETE 21/21 validated — fleet at workbenches/palettes/picker
```

---

## VERDICT — **DEFECTIVE**

The pane is 41 lines and it is defective in three independent ways, two of which I reproduced as
live user-visible breakage:

1. it **destroys the palette name the user typed** on every save (measured);
2. its sole child ships **five to twelve dead controls** — the per-swatch copy verb does not fire on
   click, has no accessible name, is not focusable, and is `aria-hidden` (measured), which also
   erases the pane's entire output from the accessibility tree;
3. its `defineExpose` action surface is **a silent no-op on mobile** (measured: seed unchanged,
   localStorage empty), because two layers of `?.` masking sit on an untyped `Ref<any>` wire that
   the mobile layout never connects.

None of these are caught by any gate. There is **no test anywhere** that mounts this pane, its
child, or its composable, and the one e2e oracle that touches the view asserts only that buttons are
*visible*.

**Strongest defect: C-2** — the generated palette is simultaneously un-clickable and invisible to
assistive technology, at 5–12 elements per render, caused by an unmigrated consumer of a
glass-ui 7 breaking change. C-1 (name destruction) is the closest second and the one a sighted
mouse user will hit first.

---

## The file under audit

```vue
 1  <script setup lang="ts">
 2  import { inject, ref } from "vue";
 …
10  const cssColorOpaque = inject(CSS_COLOR_KEY)!;
11  const pm = inject(LIBRARY_PORT_KEY)!;
12  const controlsRef = ref<InstanceType<typeof GenerateControls> | null>(null);
13
14  function onSave(colors: string[]) {
15      const paletteColors: PaletteColor[] = colors.map((css, i) => ({ css, position: i }));
19      pm.createPalette("Generated Palette", paletteColors);
20  }
21
22  defineExpose({
23      regenerate: () => controlsRef.value?.regenerate?.(),
24      save: () => controlsRef.value?.save?.(),
25      copyColors: () => controlsRef.value?.copyColors?.(),
26  });
27  </script>
```

Every one of lines 10, 12, 14, 19, 23–25 is a defect site. Detail follows.

---

## C-1 · BLOCKER — the palette name the user types is discarded on every save

**Evidence.**

`demo/workbenches/generate/GenerateControls.vue:48-50` declares a **two-argument** emit and
`:103` sends both:

```ts
const emit = defineEmits<{ save: [colors: string[], name: string] }>();
…
function save() { emit("save", [...palette.value], paletteName.value); }
```

`demo/workbenches/generate/GeneratePane.vue:14` accepts **one** argument and `:19` hardcodes the
name it was just sent:

```ts
function onSave(colors: string[]) {           // ← `name` never bound
    …
    pm.createPalette("Generated Palette", paletteColors);   // ← the literal, again
}
```

The name input is real, labelled, and editable — `GenerateControls.vue:144-149`,
`aria-label="Palette name"`, `v-model="paletteName"`.

**Reproduction** (`probes/c1-name-drop.mjs`, live server, clean localStorage):

```
$ node docs/tranches/V/megatranche/audit/components/wb-generate-pane/probes/c1-name-drop.mjs
default name value: "Generated Palette"
typed name value:   "MY-CUSTOM-NAME-42"
---- localStorage color-palettes ----
[ { "name": "Generated Palette", "slug": "generated-palette-17a2ab30", "n": 5 } ]
EXPECTED name: MY-CUSTOM-NAME-42
ACTUAL   name: Generated Palette
VERDICT: NAME DROPPED
```

**Mechanism.** Emit-arity truncation. A handler with fewer parameters is assignable to a listener
type with more — legal TypeScript, so `vue-tsc` is structurally incapable of seeing it. Proved in
isolation with this repo's own `typescript`:

```ts
type SaveEmit = (colors: string[], name: string) => void;
const onSave = (colors: string[]) => { void colors; };
const h: SaveEmit = onSave;   // accepted; the `name` argument is silently dropped
```
```
$ node node_modules/typescript/bin/tsc --noEmit --strict --ignoreConfig t.ts ; echo exit=$?
exit=0
```

The second half of the mechanism is the **duplicated default literal**: `"Generated Palette"` is
authored independently in `GenerateControls.vue:52` (the ref default) and `GeneratePane.vue:19`
(the store call). Two owners of one string is exactly the drift site that lets the pane look
correct at rest — the stored name matches the untouched default — so the bug only surfaces once a
user edits, which no gate does.

Aggravation: `usePaletteStore.ts:66-81` dedups on `(name.toLowerCase(), colorsMatch)`. Because the
name is a constant, the library fills with N entries all called "Generated Palette",
distinguishable only by slug hash.

**Cure (gestalt, not patch).** The name is *palette state*, not chrome state. Move `paletteName`
into `useColorGeneration()` alongside `preset`/`harmony`/`count`/`seed`, and let the save path read
it from the one owner. That deletes the emit payload, deletes the second literal, and deletes the
pane's pass-through handler at the same time — there is no argument left to truncate. If the emit
must survive as the seam, then at minimum `onSave(colors: string[], name: string)` and
`pm.createPalette(name, paletteColors)`, with the default literal existing exactly once.

---

## C-2 · BLOCKER — the per-swatch copy verb is wholly dead, and the pane's output is erased from the accessibility tree

**The authored intent** (`GenerateControls.vue:110-113, 199-208`):

```vue
/** Per-swatch copy — the specimen face's one direct verb. */
async function copyColor(css: string) { await writeClipboard(css); }
…
<WatercolorDot v-for="(css, i) in palette" :key="i" :color="css"
    tag="button" :seed="`gen-${css}-${i}`"
    class="generate-swatch w-9 h-9 … cursor-pointer active:scale-95 … focus-visible:outline-none"
    :aria-label="`Copy ${css}`" @click="copyColor(css)" />
```

**What glass-ui 7.0.0 actually ships** (`node_modules/@mkbabb/glass-ui@7.0.0/dist/watercolor-dot.js`,
and its `.d.ts`):

- props are exactly `color | variant | animate | cycleDuration | range | seed`. **There is no `tag`
  prop.**
- `inheritAttrs: !1` and the setup reads **only** `n.class` and `n.style` out of `useAttrs()` —
  `aria-label` and the `onClick` listener are never bound to anything.
- the root is a hardcoded `<span … "aria-hidden": "true" …>` with `pointerEvents: "none"` written
  into its inline `style` object.

**Measured against the live pane** (`probes/c2-swatch-dom.mjs`):

```
=== .generate-swatch DOM ===
{ "tagName": "SPAN",
  "attrs": [ "aria-hidden=\"true\"", "class=\"generate-swatch w-9 h-9 …\"",
             "data-testid=\"watercolor-swatch\"", "data-variant=\"solid\"", "style=…" ],
  "pointerEvents": "none",
  "outlineStyle": "none",
  "hitTestIsSwatch": false,
  "tabIndexProp": -1 }

=== aria snapshot of the plate ===
- region "Generated palette":
  - textbox "Palette name": Generated Palette
  - text: "5"
  - button "Regenerate": …
  - button "Save palette"
  - button "Copy all colors"
  - paragraph: "seed: 1e933539"

=== after clicking swatch #1 (force:true) ===
clipboard.writeText calls: []
=== control: 'Copy all colors' button ===
clipboard.writeText calls: ["oklch(77.368845855817% 0.121326101635 286.73723269254deg), …"]

SWATCH KEYBOARD-REACHABLE: false
```

So, per swatch, all measured:

| claim in source | reality |
|---|---|
| `tag="button"` | renders `<span>`; prop does not exist in glass-ui 7 |
| `@click="copyColor(css)"` | **never fires** — `writeText` call count 0 after a forced click; control button writes fine. `copyColor()` is dead code |
| `:aria-label="Copy ${css}"` | dropped (`inheritAttrs:false`); the element is `aria-hidden="true"` besides |
| `cursor-pointer`, `active:scale-95` | inert — `pointer-events: none`, own-centre hit test resolves to another element |
| `focus-visible:outline-none` | inert — `tabIndex: -1`, not focusable, `SWATCH KEYBOARD-REACHABLE: false` |

**The a11y consequence is larger than the dead verb.** The generated colors appear in the a11y tree
**nowhere**. The face strip is deliberately hidden (`PaletteColorStrip.vue:2-4`,
`aria-hidden="true" role="presentation"`), the dots are hidden by glass-ui, and nothing supplies a
text alternative. The aria snapshot above is the complete Generate result as a screen reader sees
it: a textbox, the digit "5", three buttons, and a hex seed. WCAG 2.1.1 (Keyboard), 4.1.2
(Name/Role/Value) and 1.1.1 (Non-text Content) all fail on the same elements.

**Provenance — this is an unmigrated consumer, i.e. legacy code left standing.**

```
$ git log --oneline -S 'tag="button"' -- demo/workbenches/generate/GenerateControls.vue
a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)
$ git log --oneline --follow -- demo/workbenches/generate/GeneratePane.vue | head -1
f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface
```

`tag="button"` was authored in the glass-5 era (`a61094e3`); the glass-7 adoption (`f2c8f565`)
changed the primitive out from under it and left the prop behind. The standing edict is *migrate the
consumer at the root, never leave a dual path* — a prop that no longer exists is precisely the
masking residue that edict forbids. **This is a family, not a singleton:** six further demo sites
pass `tag=` to `WatercolorDot` — `MixSourceSelector.vue:148,168,215`, `MixResultDisplay.vue:67,81,101`,
`SwatchHoverMenu.vue:17,32` (with `@click.stop`), `CurrentPaletteEditor.vue:62,64,98`,
`ImageEyedropper.vue:30`, `ConsoleRail.vue:58`, `Dock.vue:136,138,271`, `EmptyState.vue:45-47`,
`ColorSpaceSelector.vue:82`. The `tag="div"` sites are merely inert; the `tag="button"` + `@click`
sites (`SwatchHoverMenu`, `CurrentPaletteEditor`, `MixSourceSelector`) are the same dead-verb class
as this one and should be swept together.

**Cure.** glass-ui 7's `WatercolorDot` is, by its own docstring, a decorative face
("an organic pastel blob swatch"), and it declares that by rendering `aria-hidden` +
`pointer-events:none`. The verb therefore belongs to a real `<button aria-label="Copy {css}">` that
*wraps* the dot — a seat plus a face, which is the composition the primitive's contract implies.
If the register genuinely requires the dot itself to be the interactive seat, that is a request for
a polymorphic `as`/`tag` prop **in glass-ui** (edict 4: variants and primitives live in the design
system), never a consumer attribute the primitive throws away. Either way, `focus-visible:outline-none`
must be replaced by a real focus indicator on whatever the focusable seat becomes; suppressing the
ring on an element that cannot be focused is not a design decision, it is a leftover.

---

## C-3 · MAJOR — the dock action bar's Generate verbs are silent no-ops on mobile

**Measured** (`probes/c3b-dock-action-wiring.mjs`, one clean context per breakpoint, clicking the
dock's Regenerate/Save — never the plate's — and reading the plate's seed and localStorage):

```
[mobile-390]   Regenerate buttons: [{"i":0,"inPlate":false,"dockAncestor":true}, {"i":1,"inPlate":true}]
[mobile-390]   DOCK Regenerate: seed: 4b1ccfcd -> seed: 4b1ccfcd :: DEAD (silent no-op)
[mobile-390]   DOCK Save (clicked) -> localStorage: NULL :: DEAD (silent no-op)
[desktop-1440] DOCK Regenerate: seed: 9368cd40 -> seed: be6170e8 :: WORKS
[desktop-1440] DOCK Save (clicked) -> localStorage: WROTE {"version":1,"palettes":[{…,"name":"Generated Pa…
```

The plate's own in-plate Regenerate works at both sizes (`probes/c3-mobile-dock-actions.mjs`:
`IN-PLATE Regenerate: seed: c9ba611d -> seed: a28ecf52 WORKS`), so the pane is fine; the *action
surface* is broken. `pageErrors: (none)` — the failure is completely silent.

**Mechanism — a three-link chain of masking.**

1. `demo/color-picker/App.vue:83-91` — the **mobile** `<PaneSlot>` passes no `:on-mount`. The two
   desktop slots (`:101`, `:127`) do. So `generatePaneRef` (`App.vue:317`) is never populated below
   the `lg`+aspect breakpoint.
2. `demo/shell/usePaneRouter.ts:106` types the wire as `generate: Ref<any>` — the pane→dock contract
   is erased, so nothing can typecheck the dispatch.
3. `usePaneRouter.ts:196-198` dispatches `paneRefs.generate.value?.regenerate?.()` — one `?.` for the
   null ref, one for the possibly-absent method. `GeneratePane.vue:23-25` adds the *same two* again:
   `controlsRef.value?.regenerate?.()`.

Four optional-chain guards in series over an `any`. That is four independent ways for a broken wire
to become silence, and it is the standing "no masking fallbacks" edict violated four times in five
lines. The pane's own contribution is lines 22–26.

**Cure (architectural transposition).** Delete the imperative expose. The pane already lives in a
provide/inject world — it injects `LIBRARY_PORT_KEY` at `:11` from the five-port surface
`usePalettePorts` establishes. Hoist `useColorGeneration()` to the pane and `provide` it (or, keeping
the house idiom, add a `GENERATE_PORT_KEY` alongside the existing five) so the dock action bar
**calls the same typed functions the plate calls**. No template ref, no `InstanceType`, no `any`, no
`?.`, and — decisively — no mobile/desktop fork, because a provided port does not care which
`<PaneSlot>` mounted the component. The existing `Ref<any>` `PaneActionRefs` mechanism is the whole
defect; `gradient` and `mix` ride the identical wire and warrant the same sweep.

---

## C-4 · MAJOR — nothing about the result, the save, or the copy is ever announced

Three async/state-changing outcomes, zero feedback:

- **Regenerate** replaces the entire palette. There is no `aria-live` region anywhere in the plate
  (aria snapshot in C-2: no `status`, no `alert`). A screen-reader user gets nothing — and per C-2
  could not read the result even if told.
- **Save** writes to `localStorage` and returns a `Palette`; `GeneratePane.vue:19` discards the
  return and renders no confirmation. Nothing on screen changes. Worse: `usePaletteStore.ts:66-81`
  dedups on `(name.toLowerCase(), colorsMatch)` — and since the name is a constant (C-1), pressing
  Save twice without regenerating is a genuine no-op with, again, no feedback.
- **Copy** — `GenerateControls.vue:106-108` does `await writeClipboard(...)` and throws the result
  away. glass-ui's declared contract
  (`dist/composables/dom/useClipboard.d.ts:37`) is
  `writeClipboard(text): Promise<CopyResult>` where `CopyResult = {ok:true} | {ok:false, reason}`,
  documented verbatim as *"returns the discriminated result … rather than a lossy boolean"*. A
  failed copy (no clipboard API, denied permission, Safari gesture loss) is indistinguishable from a
  successful one. The repo already knows better — `App.vue:365` uses
  `useClipboard({ resetMs: 2000 })` and drives a visible `linkCopied` state off `status`.

**Cure.** One `aria-live="polite"` status seat inside the plate that reports the generated palette
and the outcome of save/copy, fed by `useClipboard`'s existing scope-owned `status` rather than the
bare primitive. This is the same fix as C-2's text alternative — one status line discharges both.

---

## C-5 · MAJOR — the pane injects a dependency it does not have

`GeneratePane.vue:7,10`:

```ts
import { CSS_COLOR_KEY } from "../../color-session/keys";
const cssColorOpaque = inject(CSS_COLOR_KEY)!;
```

`cssColorOpaque` appears exactly once in the file — its own declaration. It is never read in script
or template. The `!` makes the dead dependency *unfalsifiable*: if the provider is ever removed, this
line still passes typecheck and still returns `undefined` with no runtime complaint.

A 41-line file cannot afford a phantom dependency; it materially misstates what the pane needs to
anyone reading the composition graph. Delete lines 7 and 10.

(The sibling `inject(LIBRARY_PORT_KEY)!` at `:11` is *used*, but carries the same `!`. It is a latent
crash — `pm.createPalette` throws `TypeError` on save if the pane is ever mounted outside
`providePalettePorts`, e.g. in the component test this pane does not have. **Labelled hypothesis:**
not reproduced, because no such mount site exists today.)

---

## C-6 · MINOR — not Vue 3.5 idiom

`GeneratePane.vue:12` — `ref<InstanceType<typeof GenerateControls> | null>(null)` with a
string `ref="controlsRef"` in the template. The house idiom is `useTemplateRef` (edict 7); the repo
uses it correctly next door at `App.vue:301`:
`const dockNav = useTemplateRef<HTMLElement>("dockNav")`.

Subsumed by C-3's cure — under a provided port there is no template ref at all, which is the better
outcome than migrating the wrong construct to a newer API.

---

## C-7 · MINOR — the count slider thumb is a 12 px tap target

From the fleet's own capture, `audit/visual/REPORT.json`,
`safari-mobile-light /#/generate → probe.a11y.smallTapTargets`:

```json
{ "w": 12, "h": 44, "tag": "span", "label": "Color count" }
```

Five small targets are counted on `/#/generate` in all four matrices (REPORT.md lines 38/53/68/83);
four of them are shared dock/slug chrome ("Switch to slug", "Generate new slug", "Cancel", the
unnamed dock input). **`Color count` at 12 × 44 is this component's own contribution** —
`GenerateControls.vue:297-307`. 12 px < the 24 px minimum (WCAG 2.5.8).

Adjacent, same block: the count control hand-rolls a parallel track — an `absolute inset-0` div
painted with `countSliderGradient` (`:293-296`) sitting behind a `Slider` whose track is knocked out
per-instance with `:style="{ '--slider-track-bg': 'transparent' }"` (`:305`). That is a per-instance
override of a design-system control (edict 5) standing in for what should be a glass-ui `Slider`
variant that accepts a track paint (edict 4). The pane-level symptom is a thumb geometry the demo no
longer controls.

---

## C-8 · MINOR — the editable plate title reads as static text

`GenerateControls.vue:144-149` is a transparent, borderless `<input>` whose only affordance is
`hover:underline decoration-dashed`. In `audit/visual/shots/safari-mobile-light/generate.png` it
renders as plain display type — "Generated Palette" set in the display face, visually identical to
the pane title above it. Touch has no hover, so on the mobile matrix there is no affordance at any
time. Compounded by C-1: a user who does discover it has their input destroyed.

---

## C-9 · BLOCKER (test truth) — the gate is vacuous

**No test mounts this pane, its child, or its composable.** By enumeration:

```
$ grep -rln "GenerateControls\|useColorGeneration\|GeneratePane" test/ e2e/ demo/test/
(no matches under test/, e2e/, demo/test/ — the only hits are the source files themselves
 plus demo/DESIGN.md and demo/shell/usePaneRouter.ts)
$ grep -rn "Save palette\|createPalette\|copyColor\|Copy all colors" test/ e2e/ demo/test/
e2e/smoke/oracles/o20-generate-plate.spec.ts:48:  plate.getByRole("button", { name: "Save palette" }),
e2e/smoke/oracles/o20-generate-plate.spec.ts:51:  plate.getByRole("button", { name: "Copy all colors" }),
```

The sole oracle, `e2e/smoke/oracles/o20-generate-plate.spec.ts`, asserts exactly three things:
that Regenerate/Save/Copy buttons are **visible** and live inside the plate (`:33-52`); that the seed
text **changes** after clicking Regenerate (`:56-60`); and that a preset row's stamped `data-stops`
equals the plate swatches' **computed `backgroundColor`** (`:98-105`).

Mutations that keep every gate in the repository green:

| # | mutation | why it survives |
|---|---|---|
| M1 | empty the body of `onSave` in `GeneratePane.vue:14-20` — saving becomes a no-op | nothing asserts a palette is ever stored; the o20 spec only asserts the *button exists* |
| M2 | delete `@click="copyColor(css)"` and `:aria-label` from `GenerateControls.vue:199-208`, and delete `copyColor` | already dead in production (C-2); no spec clicks a swatch or reads its role/name — o20 reads `backgroundColor` off `.generate-swatch`, which a `<div>` satisfies |
| M3 | delete `defineExpose` entirely from `GeneratePane.vue:22-26` | the dock action bar is already dead on mobile and no spec drives it for this view; the in-plate buttons are wired directly to `GenerateControls` |
| M4 | hardcode `pm.createPalette("x", …)` | identical to today's defect, one literal different; nothing reads the stored name |

M2 is the sharpest indictment: the oracle's seed-exactness test passes *because* it reads
`getComputedStyle(...).backgroundColor`, the one property that survives the register decaying from
a labelled button into an `aria-hidden` decorative span. The gate was written to guard a *design
law* (the strip must not lie) and it does that faithfully — but it certifies a control surface it
never touches.

**Cure.** Three oracles, each cheap:
1. save-round-trip — type a name, click Save, read `localStorage["color-palettes"]`, assert
   `palettes[0].name` equals what was typed and `colors` equals the live swatches (kills C-1, M1, M4);
2. swatch-verb — `plate.getByRole("button", { name: /^Copy / })` has `count === palette.length`,
   click one, assert the clipboard (kills C-2, M2 — and the role/name query alone fails today);
3. action-bar parity — run the dock's Regenerate/Save at **both** the mobile and desktop viewports
   and assert identical effects (kills C-3, M3).

---

## What is NOT defective (positive findings, so the negatives above are load-bearing)

- **`useColorGeneration` is clean.** `composables/useColorGeneration.ts` is four refs and one
  `computed` over a pure, `mulberry32`-seeded generator. No `watch`, no listener, no timer, **no
  `requestAnimationFrame`** — the pane is not part of the PRM-RAF epidemic. `regenerate()` reseeds
  and the computed re-derives; there is no imperative palette array to fall out of sync.
- **No `ValueUnit` wrapping**, no `defineModel`, no HSV round-trip, no `parseCssColor` call, no WebGL,
  no network. The four local-hazard classes that could apply here do not appear.
- **No leak surface at all** in `GeneratePane.vue`: no mounted hook, no observer, no subscription.
  Under `KeepAlive :max="6"` (`App.vue:101-110`) a deactivated instance holds only five refs.
- **The seed-exactness law genuinely holds.** o20's `data-stops` ≡ live-swatch assertion is real and
  it passes; the preview strips do not lie.
- **The "zero rest cost" claim at `GenerateControls.vue:88-93` is true.** The aria snapshot of the
  closed pane contains no `listbox`, confirming reka-ui unmounts `SelectContent`; the 10 × 6
  `generatePalette` preview calls only run while a menu is open, and a menu cannot be open while the
  count slider moves. I looked for a per-tick generation storm and did not find one — the comment is
  honest.
- **`verbatimModuleSyntax` is satisfied**: `import type { PaletteColor }` (`GeneratePane.vue:8`),
  `import type { PresetName, HarmonyName }` and `import type { AcceptableValue }`
  (`GenerateControls.vue:32-33`), `import type { PresetName, HarmonyName }`
  (`useColorGeneration.ts:15-18`). No mixed imports.
- **The plate's landmark is correct**: `aria-label="Generated palette"` on the `<section>`
  (`GenerateControls.vue:129-132`) resolves to `region "Generated palette"` in the a11y tree, and the
  three chrome buttons all carry accessible names — `namelessButtons: 0` on `/#/generate` in all four
  matrices (REPORT.json). The nameless-button count on this route is genuinely zero; the a11y defect
  here is erasure (C-2/C-4), not anonymity.
- **No console or page errors, no horizontal overflow** on `/#/generate` in any matrix
  (REPORT.md rows: `overflowX 0`, `pageErr 0`, `consoleErr 0`, all four). The two console errors my
  probes captured are the dev-server `VITE_API_URL` misconfiguration notice, unrelated to this pane.

Two shared-chrome observations recorded but **not charged to this component**: `PaneHeader.vue`
renders the pane title as `<h3>` in a document with no `<h1>` (`counts.h1: 0` on every route,
REPORT.json) — a heading-order issue owned by `demo/shared/ui/PaneHeader.vue` across nine panes; and
the `Card` scroll host (`GeneratePane.vue:31`) is a non-focusable scroll container, which is only a
keyboard-scroll defect once its content overflows (`scrollHeight 452 === clientHeight 452` at the
desktop capture, so unproven here).

---

## Defect table

| id | severity | site | one-line |
|---|---|---|---|
| C-1 | BLOCKER | `GeneratePane.vue:14,19` | the typed palette name is discarded; every save is named "Generated Palette" |
| C-2 | BLOCKER | `GenerateControls.vue:199-208` | 5–12 swatches: no click, no name, no focus, `aria-hidden` — the verb and the output are both dead |
| C-9 | BLOCKER | `e2e/smoke/oracles/o20-generate-plate.spec.ts` | vacuous gate: four listed mutations keep the whole suite green |
| C-3 | MAJOR | `GeneratePane.vue:22-26` + `usePaneRouter.ts:196-198` | dock Regenerate/Save/Copy are silent no-ops on mobile |
| C-4 | MAJOR | `GeneratePane.vue:19`, `GenerateControls.vue:106-108` | no `aria-live`, no save confirmation, `CopyResult.ok` discarded |
| C-5 | MAJOR | `GeneratePane.vue:7,10` | `CSS_COLOR_KEY` injected with `!` and never used |
| C-6 | MINOR | `GeneratePane.vue:12` | `ref` + `InstanceType` where the house idiom is `useTemplateRef` |
| C-7 | MINOR | `GenerateControls.vue:293-307` | 12 px slider thumb; per-instance track override standing in for a glass-ui variant |
| C-8 | MINOR | `GenerateControls.vue:144-149` | the editable title has no rest-state affordance; none at all on touch |

## Probes (re-runnable, read-only)

- `probes/c1-name-drop.mjs` — reproduces C-1; also dumps the plate's tap targets and scroller state.
- `probes/c2-swatch-dom.mjs` — reproduces C-2: swatch DOM, aria snapshot, clipboard instrumentation
  with a passing control, tab-order walk.
- `probes/c3-mobile-dock-actions.mjs` / `probes/c3b-dock-action-wiring.mjs` — reproduces C-3;
  `c3b` is the disambiguated one (clicks the dock button by DOM identity, never the plate's).

All three drive `http://localhost:9000` read-only, clear only the `color-palettes` localStorage key
they write, and mutate no repository file.
