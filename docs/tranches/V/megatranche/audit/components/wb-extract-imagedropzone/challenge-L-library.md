# CHALLENGE-L — library structure · `demo/workbenches/extract/ImageDropZone.vue`

**Pass 2 · 2026-07-28.** Pass 1 (same seat/axis, 19:20 today) is archived verbatim at
`challenge-L-library.pass1-2026-07-28-prior.md`. This file is authoritative. Pass-1 findings are
carried forward by ID with an explicit disposition; three findings are NEW (L-11, L-12, L-13) and
two pass-1 findings are UPGRADED on measured evidence this pass produced.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
The seat was declared explicitly at spawn; it is not inherited. Axis: **CHALLENGE-L — library
structure** (module boundaries, ownership, dependency direction, public surface).

- **Subject**: `demo/workbenches/extract/ImageDropZone.vue` — 113 lines, area `demo/workbenches`.
- **Repo/HEAD**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Write scope honoured**: everything written this pass lives under
  `docs/tranches/V/megatranche/audit/components/wb-extract-imagedropzone/`
  (this file, the pass-1 archive, `pass2-probe/`). **No source edited.**

---

## Verdict

**DEFECTIVE.** 1 BLOCKER · 8 MAJOR · 3 MINOR · 1 INFO.

The component is 113 lines with two import edges, both legal, and zero deep-path reaches into
`src/`. Every defect on this axis is about what it *does not* declare: a capability it owns but
cannot deliver (intake), a material it re-mints by hand (the well), a token seam it duplicates five
times (`.plate-ink`), and a contract it carries through attribute fallthrough instead of an emit —
which is why the pane's sampling affordance has **no keyboard path at all**, measured this pass.

| ID | Severity | Disposition | One line |
|---|---|---|---|
| **L-13** | **BLOCKER** | **NEW (upgrade of L-8)** | The sample intent rides an undeclared native `click`; there is no keyboard twin — measured: Enter → nothing, pointer → eyedropper |
| **L-12** | MAJOR | **NEW (promoted from L-4's bullet, now measured)** | Two intake paths, one MIME guard: a `.txt` through the picker reaches `<img src="data:text/plain…">` + 2 unhandled `InvalidStateError`, no user-visible error |
| **L-11** | MAJOR | **NEW** | The plate material is hand-minted from `--primary` @ 5/10/30% α — a parallel mint of the certified rung-2 WELL, whose home (`.dashed-well`, `--well-bg`, `--card-edge`) already exists with two consumers |
| L-1 | MAJOR | CONFIRMED | `.plate-ink` is a 5-consumer cross-feature recipe living as 5 scoped twins; 0 declarations in `demo/styles/` |
| L-2 | MAJOR | CONFIRMED + measured | `var(--ink-muted, var(--muted-foreground))` is a masking fallback; `--ink-muted` is stamped live, so the second arm never fires |
| L-3 | MAJOR | CONFIRMED | Inverted ownership: the file-dialog lives in the leaf; the parent reaches in through `defineExpose` + a template ref |
| L-4 | MAJOR | CONFIRMED | Hand-rolled drag/file mechanics that installed `@vueuse/core@14.3.0` already owns |
| L-5 | MAJOR | CONFIRMED + measured | `disableClick` is a phantom degree of freedom; two rendered branches are unreachable |
| L-6 | MAJOR | CONFIRMED + measured | The only inline-`:style` motion override in the demo; half of it is provably inert |
| L-7 | MINOR | CARRIED (adjacent file) | `useExtractSession` hand-rolls a debounce beside the demo's ONE debounce |
| L-8 | — | **SUPERSEDED by L-13** | (was MINOR: three outward channels, the load-bearing one undeclared) |
| L-9 | MINOR | CARRIED | `tsconfig.demo.json` `paths` drift |
| L-10 | INFO | CONFIRMED | glass-ui 7.0.0 ships no drop-zone primitive; demo-local residence is correct |
| **L-14** | MINOR | **NEW** | The consumer holds this component with the pre-3.5 `ref<InstanceType<typeof …>>` idiom in the same file that uses `useTemplateRef` |

---

## 0 · The import closure, traced

```
$ grep -n "^import" demo/workbenches/extract/ImageDropZone.vue
66:import { ref, useTemplateRef } from "vue";
67:import { ImagePlus } from "@lucide/vue";
```

Two edges. Both legal. Both **correct**:

- `@lucide/vue@^1.16.0` is the single icon source in the tree — 11/11 workbench files import from it,
  0 from `lucide-vue-next`. No dual icon path.
- No `@src/` reach. `grep -rn "@src/" demo/ | grep -v assets/docs` → **empty**. The T.W1 dogfood
  posture holds: the demo never touches library internals.

**The published-surface question, answered.** `ImageDropZone` imports nothing from
`@mkbabb/value.js`. The feature around it does, and does it correctly — every specifier is a bare
published subpath a real consumer could write, and every type-only import is `import type`
(`verbatimModuleSyntax` satisfied):

```
$ grep -rn "@mkbabb/value.js" demo/workbenches/extract/
ExtractPane.vue:28:                      import type { SpaceId } from "@mkbabb/value.js/color";
quantize-worker.ts:6:                    import { quantizePixels } from "@mkbabb/value.js/quantize";
quantize-worker.ts:7:                    import type { QuantizeOptions, QuantizedColor } from "@mkbabb/value.js/quantize";
ExtractWorkbench.vue:189:                import type { SpaceId } from "@mkbabb/value.js/color";
ImageEyedropper/composables/useImageSampler.ts:12: import type { SpaceId } from "@mkbabb/value.js/color";
ImageEyedropper/composables/useImageSampler.ts:13: import { parseCssColor } from "@mkbabb/value.js/css";
composables/useExtractSession.ts:14:     import type { QuantizedColor } from "@mkbabb/value.js/quantize";
composables/useExtractSession.ts:15:     import { serializeCssColor } from "@mkbabb/value.js/css";
composables/useImageQuantize.ts:9:       import type { QuantizedColor, QuantizeOptions } from "@mkbabb/value.js/quantize";
```

`/color`, `/css`, `/quantize` are all in `package.json#exports` (7 subpaths, no root `.`). **No false
proof of the public API in this component's cone.**

### The undeclared dependency set

The declared surface is a third of the truth. The component's *real* dependency set:

| dependency | how it is reached | declared? |
|---|---|---|
| `vue`, `@lucide/vue` | `import` | ✅ |
| `rounded-panel`, `text-mono-small`, `text-mono-caption` | glass-ui `dist/styles` utilities, global | ❌ implicit — correct producer, fine |
| `--duration-normal`/`--duration-fast`/`--ease-standard` | glass-ui motion tokens | ❌ implicit (and **contradicted** — L-6) |
| `--ink-muted` | **written at runtime** by `demo/color-picker/composables/boot/useAtmosphereBoot.ts:103` | ❌ implicit — a `demo/workbenches` leaf → `demo/color-picker/…/boot` edge |
| `vj-morph` family | `demo/styles/animations.css` | ❌ implicit — global keyframes, correct home |
| `--default-transition-duration/-timing-function` | `demo/styles/foundation.css:128-129` | ❌ implicit and **overridden** (L-6) |
| `--primary` @ post-hoc α | shadcn/glass token, reached raw | ❌ implicit and **wrong family** (L-11) |

The `--ink-muted` row is a **feature → boot** edge carried by an untyped global custom-property name.
The seam shape is right (a token seam is the correct coupling); it has no single home and a masking
fallback (L-1, L-2).

---

## NEW findings

### L-13 · BLOCKER — the sample intent rides an undeclared native `click`, so it has no keyboard twin; the eyedropper is keyboard-unreachable

This is the structural defect of the component, and it ships.

`ImageDropZone` talks to its parent through **three** channels, and the load-bearing one is
undeclared:

1. `defineEmits<{ file: [file: File] }>()` (`:74-76`) — declared.
2. `defineExpose({ openFilePicker })` (`:85`) — declared, and inverted (L-3).
3. **A native `click` riding attribute fallthrough** — *undeclared*. It is how the eyedropper opens:

```
ExtractWorkbench.vue:25   @click="session.previewDataUrl.value && (eyedropperActive = true)"
ImageDropZone.vue:21      @click="!disableClick && openFilePicker()"
ImageDropZone.vue:22      @keydown.enter.space.prevent="!disableClick && openFilePicker()"
```

Both listeners bind the same root `<div>` (single root, no `inheritAttrs: false`, so Vue merges the
fallthrough `onClick`). The child's keyboard handler `:22` mirrors **only the child's own branch**.
The parent's branch has no keyboard mirror, because *the parent cannot write one* — there is no
event to listen for. An undeclared contract cannot carry its keyboard equivalent.

The consequence compounds with `:19` `:tabindex="disableClick ? -1 : 0"` and `disableClick ===
!!preview` (L-5): the moment a specimen loads, the element leaves the tab order **and** the only
remaining intent on it is the one with no keyboard path.

**MEASURED** (`pass2-probe/idz-probe3.mjs`, chromium 1440×900, live dev server, output at
`pass2-probe/probe3-intake-and-keyboard.json`):

```json
"before":     { "tabindex": "0",  "aria": "Upload image, click to browse or drop an image here" },
"afterPng":   { "tabindex": "-1", "aria": "Image preview area, tap to sample colors",
                "cornerTag": "sample", "imgNaturalWidth": 8 },
"focusProbe": { "activeIsZone": true, "activeLabel": "Image preview area, tap to sample colors" },
"afterEnter": { "dialogCount": 0, "eyedropperCanvas": false },
"afterClick": { "dialogCount": 0, "eyedropperCanvas": true  }
```

Read it in order: after a real PNG loads, `tabindex` is `-1` (so a Tab-key user never arrives); even
after a *programmatic* `.focus()` succeeds, **Enter does nothing** (`eyedropperCanvas: false`); a
pointer click **opens the eyedropper** (`eyedropperCanvas: true`). And `@keydown.enter.space.prevent`
fires `preventDefault()` unconditionally, so in the specimen state the element actively swallows
Enter/Space while offering no action.

The eyedropper is the pane's only image-sampling affordance (`ExtractControls` emits only
`upload`/`camera`/`reset`). **Keyboard-only users cannot sample a color from an image.** WCAG 2.1.1
Keyboard (Level A) failure on a shipped route. `role="button"` + `tabindex="-1"` + no key handler is
also an ARIA lie: it announces as a button and cannot be operated as one.

- **Mechanism**: an implicit contract carried by attribute fallthrough instead of a declared emit;
  the child owns the keyboard mirror for the branches it knows about, and cannot own one for the
  branch it does not.
- **Reproduction**: `node docs/tranches/V/megatranche/audit/components/wb-extract-imagedropzone/pass2-probe/idz-probe3.mjs <tmpdir>` against
  `http://localhost:9000/#/extract`. Deterministic — ran twice, identical output.
- **Cure**: declare the intent. `emits: { file: [File], sample: [] }`; `:21` →
  `@click="preview ? emit('sample') : openPicker()"`, `:22` → the same expression; `tabindex` becomes
  a constant `0`; `ExtractWorkbench.vue:25` → `@sample="eyedropperActive = true"`. One root, one
  declared surface, one keyboard path per intent. **Better still — the cure L-13 shares with L-5:
  split the two roles into two components** (see the lattice), and the multiplex disappears rather
  than being renamed.

---

### L-12 · MAJOR — one intake concept, two entry paths, one guard; the unguarded path fails silently with an unhandled rejection

`ImageDropZone` guards the *drop* path and not the *picker* path:

```
ImageDropZone.vue:87-92   function onFileSelected(e) { … if (file) emit("file", file); … }   // NO type check
ImageDropZone.vue:94-100  function onDrop(e) { … if (file?.type.startsWith("image/")) emit("file", file); }
```

`:30 accept="image/*"` is an advisory picker filter, not enforcement — every desktop file dialog lets
the user switch to "All Files". The declared emit says `file: [File]`; the drop path guarantees an
image, the picker path guarantees nothing, and **no downstream owner re-guards**:
`useExtractSession.ts:164-168` calls `readAsDataUrl(file)` then `runQuantize()`, and
`useImageQuantize.ts` calls `createImageBitmap(file)` unguarded.

**MEASURED** — selecting a `.txt` through the picker (`pass2-probe/probe3-intake-and-keyboard.json`):

```json
"afterTxt": {
  "imgSrcPrefix":     "data:text/plain;base64,ZGVmaW5pdGVseSBub",
  "imgNaturalWidth":  0,
  "destructiveText":  [],
  "aria":             "Image preview area, tap to sample colors",
  "cornerTag":        "sample"
},
"pageErrors": ["InvalidStateError: The source image could not be decoded.",
               "InvalidStateError: The source image could not be decoded."]
```

A `text/plain` data URL is bound to `<img src>`; the zone flips to its specimen state and announces
"Image preview area, tap to sample colors"; `destructiveText: []` — `ExtractWorkbench.vue:79`'s
"error ≠ empty: an explicit destructive line" never fires; and two unhandled `InvalidStateError`
rejections reach `window.onerror`. The component's own header comment — *"the specimen never lies"*
(`ImageDropZone.vue:3`) — is falsified by its own unguarded path.

- **Mechanism**: split ownership of one invariant ("what may become a specimen"). The guard is a
  property of the *concept*, and it lives on one of the concept's two entrances.
- **Reproduction**: `page.setInputFiles('input[type="file"]', 'not-an-image.txt')` on `/#/extract`;
  full script at `pass2-probe/idz-probe3.mjs`.
- **Cure**: the guard is not this component's job at all — it belongs to the intake owner.
  `useDropZone(root, { dataTypes: ['image/*'], multiple: false })` +
  `useFileDialog({ accept: 'image/*', multiple: false, reset: true })` declare it **once**, and the
  session returns a typed failure for a decode error instead of discarding the promise. One
  declaration, both entrances, one error register.

---

### L-11 · MAJOR — the plate material is a parallel mint: `--primary` @ post-hoc alpha, where the certified rung-2 WELL already has a home and two consumers

The repo has a written material ladder and a minted global recipe for exactly this affordance:

```
demo/DESIGN.md:98   | 2 · WELL | an opaque tone-step of the plate, NO backdrop-blur … the ONE
                      `--well-bg` token … consumed as `bg-well`/`var(--well-bg)`; dashed edge /
                      `--shadow-cartoon-sm` where the affordance calls for it |
                      `.dashed-well` · PaletteCard (+skeleton) · the gradient plate + stop chip ·
                      VersionHistoryDrawer rows · the mix result plate · markdown interiors |

demo/styles/utils.css:85-105  /* Dashed inset well — the recessed container that collects an
                                 in-progress set of colors … a dashed-bordered, faintly-recessed
                                 column */
                              .dashed-well { border: 1.5px dashed var(--card-edge);
                                             border-radius: var(--radius-card);
                                             background: var(--well-bg);
                                             box-shadow: var(--shadow-cartoon-sm); }
```

`.dashed-well` has two consumers (`MixSourceSelector.vue:116`, `CurrentPaletteEditor.vue:3`).
`ImageDropZone` — a dashed-edged, recessed, in-plate fixture, i.e. the textbook rung-2 WELL — is
**not in DESIGN.md:98's consumer list** and does not wear the recipe. It re-mints the material by
hand from a third token family:

```
ImageDropZone.vue:8,12,14,15
  'rounded-panel border-2 border-dashed …'
  dragging ? 'border-primary bg-primary/10 scale-[1.01]'
           : preview ? 'border-transparent hover:border-primary/50 bg-primary/5'
                     : 'border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10'
```

**MEASURED A/B on the live route** (`pass2-probe/probe2-token-ab.json`, `/#/extract`, light):

| | `ImageDropZone` (measured) | `.dashed-well` (measured, same page) |
|---|---|---|
| fill | `oklab(0.471189 −0.081033 0.097141 / 0.05)` — `--primary` @ 5 % | `oklab(0.913295 0.005505 0.013042)` — `--well-bg`, opaque tone-step |
| edge | `2px dashed` `--primary` @ 30 % | `1px dashed` `--card-edge` (12 % foreground, neutral) |
| radius | `12px` (`--radius-panel`) | `16px` (`--radius-card`) |
| stamp | `none` | `--shadow-cartoon-sm` (3-layer cartoon caster) |

Two dashed wells, two radii, two edge mints, two fills, one of them with no cartoon stamp — in a
tree whose foundation says the ladder bridges exist *"so no consumer ever re-mints a well alpha or a
raw black/white stage by hand again (the T-CM-4 parallel-mint pathology, closed at the token)"*
(`demo/styles/foundation.css:141-145`).

**And the hue is off-axis.** Measured on the same page:

```
--primary      = oklch(0.471189 0.126502 129.834)   ← hue 129.8°, green
--accent-live  = oklch(0.471189 0.188448   9.834)   ← hue   9.8°, the pane's live crimson
```

Every certified affordance in the pane rides `--accent-live` (boot-stamped, contrast-guarded —
`useAtmosphereBoot.ts:93-97`); the ladder rides the neutral `--well-bg`/`--card-edge` family.
`ImageDropZone` rides a **third** family, 120° of hue away from the sliders directly beneath it
(visible in `audit/visual/shots/safari-desktop-light/extract.png` — grey-green dashed frame above
crimson rails).

Proof it is a species of one — `bg-primary/<α>` as a *surface fill* exists in exactly one file:

```
$ grep -rn "bg-primary\b\|border-primary\b" demo/ | grep -v megatranche
ImageDropZone.vue:12,14,15                 ← the only α-fills
Markdown.vue:346   @apply bg-well border-l-4 border-primary rounded-r-2xl;   ← the CORRECT idiom
SearchFilterBar.vue:9   bg-primary  (opaque count badge)
VersionHistoryDrawer.vue:31   bg-primary  (opaque 4px rail)
```

`Markdown.vue:346` is the in-repo precedent one file away: **ladder fill + solid accent edge**, never
a post-hoc alpha wash. The component itself already killed one post-hoc alpha for exactly this reason
(`ImageDropZone.vue:44-45`: *"the `/50` post-hoc alpha dies — the muted token is already the
de-emphasis rung"*) — and kept five more on `primary`.

- **Mechanism**: a concept with a certified home (rung-2 WELL material) re-implemented locally
  because the affordance's *geometry* is bespoke; geometry and material were not separated.
- **Reproduction**: `node …/pass2-probe/idz-probe2.mjs` against `/#/extract` (computed styles pasted
  above); `grep -rn "bg-primary\b" demo/` for the enumeration.
- **Cure**: separate them. Material comes from the ladder — `bg-well`, `border-card-edge`
  (`shadow-cartoon-sm` if the affordance wants the chip stamp), and `--radius-card` to match the
  recipe's own radius. Geometry stays local (`min-h`, centering, `overflow-hidden`). The *droppable*
  and *drag-over* states are exactly what an accent edge is for — but the live, certified
  `--accent-live` (or the `safeCss` seam `ExtractControls.vue:124` already threads through this very
  pane), not raw `--primary` at 30 %. This is a three-class change, not a new abstraction.

---

### L-14 · MINOR — the consumer holds this component with the pre-3.5 idiom, in the same file that uses `useTemplateRef`

```
ExtractWorkbench.vue:222  const dropZoneRef = ref<InstanceType<typeof ImageDropZone> | null>(null);
ExtractWorkbench.vue:223  const videoRef = useTemplateRef<HTMLVideoElement>("videoRef");
```

Two template-ref idioms, one file, adjacent lines. Edict 7 names `useTemplateRef` as the Vue 3.5
idiom. This is a direct consequence of this component's exposed surface: the ref only exists to
reach `defineExpose` (L-3). Killing L-3 kills the ref and the idiom split with it.

- **Mechanism**: an imperative child surface forces the consumer to hold an instance, and instance
  refs invite the legacy spelling.
- **Reproduction**: the two line-refs.
- **Cure**: falls out of L-3's cure — no instance ref, nothing to spell.

---

## Carried-forward findings (pass 1), with this pass's additional evidence

### L-1 · MAJOR — CONFIRMED. `.plate-ink` is a 5-consumer recipe living as 5 scoped twins

```
$ grep -rn "plate-ink" demo/ | grep -v megatranche
ImageDropZone.vue:46,58   :109 .plate-ink { color: var(--ink-muted, var(--muted-foreground)); }
ExtractWorkbench.vue:125,131,138,163   :290 (byte-identical rule)
ExtractControls.vue:15,66,78           :148 (byte-identical rule)
EmptyState.vue:23,55,61                :102 (byte-identical rule)
ErrorBoundary.vue:27                   :84  (byte-identical rule)
$ grep -rn "plate-ink" demo/styles/
(no output)
```

Five identical declarations, four files across **three** areas (`workbenches/extract`, `shared/ui`,
`color-picker`), zero global declarations. The repo's own rule is the inverse of what is on the
ground — `demo/DESIGN.md:388`: *"**No new global utility class for one consumer** … The shared
survivors … are true cross-feature recipes; each carries a comment justifying its global residence."*
`demo/styles/utils.css` already hosts precisely this species with a stated 3-consumer threshold
(`utils.css:172` *"A shared recipe (3 consumers) per DESIGN.md's global-utility rule"*).

- **Cure**: one declaration in `demo/styles/utils.css` with the justifying comment; delete five
  `<style scoped>` blocks. `ImageDropZone`'s `<style>` block disappears entirely.

### L-2 · MAJOR — CONFIRMED, now measured. The fallback arm is dead, and the spelling is dual

`var(--ink-muted, var(--muted-foreground))` appears at `ImageDropZone.vue:110`,
`ExtractWorkbench.vue:291`, `ExtractControls.vue:149`, `EmptyState.vue:102`, `ErrorBoundary.vue:84`,
`ConfigSliderPane.vue:202,205`, `ColorComponentDisplay.vue:200,205,211` — while
`ParseEchoReadout.vue:38,44` writes the **bare** `var(--ink-muted)`. Two spellings of one token
reference; they cannot both be right.

**MEASURED** (`pass2-probe/probe1-computed-style.json`, live `/#/extract`):

```
--ink-muted                       = oklch(44.712054906087% 0.003861589952 34.629978305623deg)
.plate-ink computed color         = oklch(0.447121 0.00386159 34.63)      ← the stamped value
--muted-foreground                = light-dark(hsl(30 22% 40%), hsl(34 14% 62%))   ← never used
```

The token is stamped (`useAtmosphereBoot.ts:100-106`, `watch(..., { immediate: true })`) and the
fallback arm never resolves at runtime. It is a masking fallback for a boot failure — and the value
it would substitute is the *uncertified static* one the component's own comment (`:104-108`) says
failed the text floor. Edict 2: no masking fallbacks.

- **Cure**: bare `var(--ink-muted)` in the single global declaration (L-1). If the pre-stamp frame is
  a real concern, stamp the token in CSS at `:root` as its own initial value — one home, no fork.

### L-3 · MAJOR — CONFIRMED. Inverted ownership: the file dialog lives in the leaf and the parent reaches in

```
ImageDropZone.vue:27-33   <input ref="fileInputRef" type="file" accept="image/*" class="hidden" … />
ImageDropZone.vue:81-85   function openFilePicker() { fileInputRef.value?.click(); }
                          defineExpose({ openFilePicker });
ExtractWorkbench.vue:230  function openFilePicker() { dropZoneRef.value?.openFilePicker(); }
ExtractWorkbench.vue:74   <ExtractControls … @upload="openFilePicker" />
```

The capability has **two** triggers — the zone's own click and `ExtractControls`' upload button — and
lives in neither's parent. The second trigger travels sibling → parent → template ref → child method.
Direction of dependency is inverted: a leaf presentational component owns a capability two peers
consume.

- **Cure**: the intake capability moves up to the owner (see the lattice). `defineExpose` dies, the
  hidden `<input>` dies, `dropZoneRef` dies (and L-14 with it).

### L-4 · MAJOR — CONFIRMED. Hand-rolled mechanics an installed dependency already owns

`@vueuse/core@14.3.0` is installed and consumed six times in `demo/`, and ships both halves:

```
node_modules/@vueuse/core/dist/index.d.ts:1932  declare function useDropZone(target, options?)
  // UseDropZoneOptions: { dataTypes, checkValidity, onDrop, onEnter, onLeave, onOver, multiple, … }
node_modules/@vueuse/core/dist/index.d.ts:2626  declare function useFileDialog(options?)
  // UseFileDialogReturn: { files, open, reset, onChange, onCancel }
```

`ImageDropZone.vue:78-100` re-derives `isOverDropZone` (`dragging`), `dataTypes` (`:97`, on one path
only — L-12), `reset` (`:91`), and `open` (`:82`), worse. `useFileDialog().open` is *exactly* the API
`ExtractControls` needs, callable from a composable with no template ref and no `defineExpose` — it
dissolves L-3 and L-14 as a side effect. This is not a new abstraction (edict 3): it is consuming an
already-installed, already-used dependency.

- **HYPOTHESIS (pass 1, not reproduced, still unreproduced)**: `@dragover`/`@dragleave` on the root
  (`:23-24`) should flicker when the pointer crosses onto a descendant (`<img>` `:37`, placeholder
  `:46`), because `dragleave` fires on the root with `relatedTarget` = child and the handler
  unconditionally clears `dragging`. `useDropZone` carries an enter/leave counter for this exact
  reason. Labelled a hypothesis: native drag synthesis is an expensive probe and the ownership
  argument stands without it.

### L-5 · MAJOR — CONFIRMED, now measured. `disableClick` is a phantom degree of freedom

The single call site derives one prop from the other:

```
ExtractWorkbench.vue:22-23   :preview="session.previewDataUrl.value"
                             :disable-click="!!session.previewDataUrl.value"
```

`grep -rn "ImageDropZone" demo src e2e test` → `ExtractWorkbench.vue:15,193,222` and nothing else.
`preview !== null ⟺ disableClick === true`; 4 declared states, 2 reachable. **Measured** — after both
a `.txt` and a `.png`, `aria` was `"Image preview area, tap to sample colors"` and `cornerTag` was
`"sample"`; the `'Replace image, click or drop a new image'` label (`:20`) and the `'replace'` tag
(`:61`) never appeared. Shipped, unreachable markup. `:10`'s `preview && disableClick` is likewise
redundant.

The prop also silently drives `:19 tabindex` — a keyboard-reachability decision hidden behind a
mouse-named prop. That is the seed of L-13.

- **Cure**: delete `disableClick` — or, better, delete the multiplex (lattice below).

### L-6 · MAJOR — CONFIRMED, now measured. The only inline-`:style` motion override in the demo, half of it inert

```
$ grep -rn "transitionDuration:" demo/
demo/workbenches/extract/ImageDropZone.vue:17
demo/workbenches/extract/ImageDropZone.vue:59
```

2 of 2 occurrences tree-wide, both in this file. Every sibling writes motion either as a scoped
`transition:` rule (`GradientEasingEditor.vue:223`) or lets the root default apply. The root
*already* declares the pairing, and says so:

```
demo/styles/foundation.css:121-129
  /* Alias it at the `@theme` ROOT to the house motion tokens so every un-tuned `transition`
     utility speaks the app's fast duration + standard ease by construction —
     no per-callsite modifier. */
  --default-transition-duration:        var(--duration-fast);
  --default-transition-timing-function: var(--ease-standard);
```

**MEASURED** (`pass2-probe/probe1-computed-style.json` + `probe2-token-ab.json`):

```
--default-transition-duration = 0.2s     --duration-normal = 0.3s
zone computed transition-duration        = 0.3s                      ← the override lands
zone computed transition-timing-function = cubic-bezier(0.4, 0, 0.2, 1)
--ease-standard                          = cubic-bezier(0.4, 0, 0.2, 1)   ← IDENTICAL
```

So the timing-function half of the only inline style in the demo is **provably a no-op** — it
restates the value the root already supplies. The duration half is a real 0.2 s → 0.3 s deviation
that appears nowhere in DESIGN.md's *"§ Bespoke literals (KEEP, not migrated)"* table
(`demo/DESIGN.md:258-266`, which enumerates `ImageEyedropper`, `ActionButton`,
`PointerDebugOverlay`, `PaletteCard`, `useHeightTransition` — **not** `ImageDropZone`): an unbooked
deviation. And because it is an inline `style` attribute it outranks every class the parent passes
(`ExtractWorkbench.vue:17-21` already passes a `:class`), so the material cannot be retimed from
outside — edict 5, per-instance override.

- **Cure**: delete both `:style` bindings. If 0.3 s is deliberate, it is one line in the (now single,
  per L-1) scoped block — `transition: all var(--duration-normal) var(--ease-standard);` — plus a
  row in DESIGN.md's bespoke table. If it is not deliberate, the root default is already correct.

### L-7 · MINOR — CARRIED. `useExtractSession` hand-rolls a debounce (adjacent file, in this component's cone via the intake it feeds)

`useExtractSession.ts:158-162` — a raw `setTimeout`/`clearTimeout` pair plus an `onBeforeUnmount`
teardown, beside a codebase that has one debounce home. Out of this SFC, in the feature.

### L-9 · MINOR — CARRIED. `tsconfig.demo.json` `paths` drift (pass 1 evidence stands)

### L-10 · INFO — CONFIRMED. glass-ui has no drop-zone primitive; demo-local residence is correct

```
$ grep -rli "dropzone\|drop-zone\|dragover" node_modules/@mkbabb/glass-ui/dist/
(no output)
```

glass-ui@7.0.0 exports 70+ subpaths, none of them a file/drop primitive. Edict 4 is satisfied by the
component living in `demo/workbenches/extract/` rather than `demo/ui/` — this is a feature-local
component with exactly one consumer, and filing a glass-ui primitive for a single consumer would be
contrivance (edict 3). **The material, however, must still come from the ladder (L-11).** Residence
correct; substrate wrong.

---

## Greenfield lattice — what I would build today

The extract feature's real concepts are: **intake** (a File arrives, from a picker or a drop, and
must be an image), **the specimen** (a decoded, previewable image), **quantization** (pixels →
palette), and **sampling** (a point on the specimen → a color). Today, intake is smeared across a
leaf component, its parent, and a sibling; and the specimen and the empty state share one component
with a boolean multiplex.

```
demo/workbenches/extract/
  ExtractPane.vue              pane shell — Card + PaneHeader        [unchanged]
  ExtractWorkbench.vue         orchestrator; owns intake + specimen lifecycle
  composables/
    useImageIntake.ts          NEW — THE ONE HOME for intake.
                                 useFileDialog({ accept:'image/*', multiple:false, reset:true })
                               + useDropZone(target, { dataTypes:['image/*'], multiple:false })
                               returns { open, isOver, onFile, error }
                               ONE MIME declaration; both entrances; typed decode failure
    useExtractSession.ts       session state (k, chroma, palette, dominant); consumes intake
    useImageQuantize.ts        worker transport                       [unchanged]
  ImageDropZone.vue            EMPTY STATE ONLY — a drop target + a real <button>.
                               props: { isOver: boolean }   emits: { file: [File] }
                               always tabbable; no hidden <input>; no defineExpose
  ImagePreview.vue             SPECIMEN ONLY — <img> + a real <button> "Sample colors".
                               props: { src: string }       emits: { sample: [] }
                               keyboard path by construction (it IS a button)
  ImageEyedropper/…            the sampler                           [unchanged]
```

The transposition is one idea: **two states are two components, and one capability has one home.**

What falls out for free, without a single compensating abstraction:

- L-13 dies — `sample` is a `<button>`, so Enter/Space work because the platform makes them work.
  No `role="button"`, no `tabindex` juggling, no fallthrough contract.
- L-12 dies — `dataTypes: ['image/*']` is declared once and covers both entrances.
- L-5 dies — there is no `disableClick`, because there is no multiplex; no unreachable branch exists
  to be shipped.
- L-3 + L-14 die — `ExtractControls`' `@upload` calls `intake.open()` directly; no template ref,
  no `defineExpose`, no `InstanceType<typeof …>`.
- L-4 dies — `dragging` becomes `useDropZone`'s `isOverDropZone`, with the enter/leave counter.
- The `<Transition name="vj-morph" mode="out-in">` at `:36` stays, and gets *better*: it now morphs
  between two components with distinct identities rather than between two branches of one — which is
  what `mode="out-in"` was written for. **No animation is deleted** (edict 6).
- L-11's cure lands cleanly, because material and geometry are finally separate: both new components
  wear `bg-well` + `border-card-edge` + `--radius-card`, and the drag-over state paints the certified
  `--accent-live` on the edge only.
- L-1 + L-2 die at the tree level, not per-file: one `.plate-ink` in `demo/styles/utils.css`,
  spelled `var(--ink-muted)` bare.

**Blast radius of the cure**: the only external assertion on this component is
`e2e/smoke/walk.spec.ts:78-81` — `getByRole("button", { name: /Upload image/i })` — which survives
any cure keeping an "Upload image…" accessible name on the empty state, and is *strengthened* by the
empty state becoming a real `<button>`.

---

## Negative proofs — checked, and SOUND

1. **No deep-path reach into the library.** `grep -rn "@src/" demo/ | grep -v assets/docs` → empty.
   `ImageDropZone` imports nothing from `@mkbabb/value.js`; the feature imports it only through the
   published bare subpaths `/color`, `/css`, `/quantize`, all present in `package.json#exports`.
   A real consumer could write every specifier in this cone. **No false proof of the public API.**
2. **`verbatimModuleSyntax` satisfied** across the cone — every type-only import is `import type`,
   including the split at `quantize-worker.ts:6-7`.
3. **No second drop-zone implementation.** `grep -rn 'type="file"' demo/` → 1 site;
   `grep -rn "dataTransfer" demo/` → 1 site; `grep -rn "@drop\|dragover" demo/` → 1 site. All this
   file. The *concept* is duplicated against `@vueuse/core` (L-4), not against another demo module.
4. **Icon source is uniform** — `@lucide/vue` in 11/11 workbench files, 0 `lucide-vue-next`. No dual
   path.
5. **`demo/ui/card` is a pure re-export barrel** (`export { Card, … } from "@mkbabb/glass-ui";`), the
   idiom DESIGN.md sanctions — not a fork. This component's shell crosses no boundary.
6. **Component → shell / component → boot**: the only boot edge is the `--ink-muted` token seam,
   which is a token seam by design. No JS import from `demo/workbenches/` into `demo/shell/` or
   `demo/color-picker/composables/boot/`.
7. **`defineExpose` is not per se un-idiomatic here** — 15 demo components use it. What is wrong is
   *this* use: sibling→parent→child imperative reach for a capability (L-3), not the mechanism.
8. **Visual-audit rows are clean for this component.** `/#/extract` across all four Safari matrices:
   `overflowX: 0`, `pageErrors: 0`, `consoleErrors: 0`, `imgNoAlt: 0`. The 6 `smallTapTargets` are
   the slug bar (3 × 22 × 22 buttons), the slug input, and the two slider thumbs — none is this
   component (measured 462 × 180 at 1440 px). The 3 `namelessButtons` are not this component: its
   `aria-label` resolves in every state (measured). Screenshot
   `audit/visual/shots/safari-desktop-light/extract.png` read: the zone renders as intended
   structurally — the defect it *does* show is L-11's off-axis grey-green frame above crimson rails.
9. **Named historical suspects — out of this component's import cone.** `demo/palettes/export.ts` +
   `usePaletteExport.ts` + `demo/palettes/export/{json,bytes,rfc8785,canonical,svg,css,png,tailwind}.ts`
   all still exist (`find demo -path "*export*" -name "*.ts"`), and the three-`useDark` note is still
   live at `useMarkdownColors.ts:16` / `useMarkdownHighlighting.ts:76`. Neither is reachable from
   `ImageDropZone`; I did not trace them and make no claim about their current state.
   `ActionBarLayer`'s `useLayerTransition` reimplementation: not traced, out of cone.

---

## Strongest defect

**The intake-and-intent capability is homeless — L-3 · L-4 · L-12 · L-13 · L-14 are one mechanism,
not five findings.** The capability ("a File becomes a specimen; a specimen can be sampled") is
split across a leaf SFC that owns the hidden `<input>`, a parent that reaches into it through a
template ref, a sibling that emits `upload` into that reach, and an undeclared native `click` that
carries the sampling intent back out. Because no single module owns it, the MIME guard exists on one
of two entrances (**L-12: a `.txt` reaches `<img src="data:text/plain…">` with two unhandled
`InvalidStateError`s and no user-visible error**) and the sampling intent has no keyboard twin
(**L-13: measured — programmatic focus + Enter opens nothing; a pointer click opens the eyedropper;
and `tabindex` is `-1` so a keyboard user never arrives**). Both are shipped on `/#/extract` today.

The cure is not five patches. It is the transposition above: **two states → two components; one
capability → one composable (`useImageIntake`, built on `useFileDialog` + `useDropZone`, both already
installed).** The component's `<script setup>` drops from 36 lines to a props/emits pair, its
`<style>` block disappears into the one global `.plate-ink`, its material joins the ladder, and every
finding on this axis except L-9 dies with it.

---

## Commands run this pass

```
grep -rn "ImageDropZone" demo src e2e test docs/tranches/V
grep -rn "plate-ink" demo/ ; grep -rn "plate-ink" demo/styles/
grep -rn "ink-muted" demo/ ; grep -rn "transitionDuration:" demo/
grep -rn "dashed-well|border-dashed|bg-well" demo/
grep -rn "bg-primary\b|border-primary\b" demo/
grep -rn 'type="file"|dataTransfer|@drop|dragover' demo/
grep -rn "@src/" demo/ | grep -v assets/docs        → empty
grep -rn "@mkbabb/value.js" demo/workbenches/extract/
grep -rli "dropzone|drop-zone|dragover" node_modules/@mkbabb/glass-ui/dist/   → empty
grep -n "declare function useDropZone|useFileDialog" node_modules/@vueuse/core/dist/index.d.ts
node .../pass2-probe/idz-probe.mjs    → pass2-probe/probe1-computed-style.json
node .../pass2-probe/idz-probe2.mjs   → pass2-probe/probe2-token-ab.json
node .../pass2-probe/idz-probe3.mjs   → pass2-probe/probe3-intake-and-keyboard.json   (ran 2×, identical)
```

Evidence index (all under this component's audit directory):
`pass2-probe/idz-probe{,2,3}.mjs` · `pass2-probe/probe1-computed-style.json` ·
`pass2-probe/probe2-token-ab.json` · `pass2-probe/probe3-intake-and-keyboard.json` ·
`challenge-L-library.pass1-2026-07-28-prior.md` · pass-1's `evidence/`.
