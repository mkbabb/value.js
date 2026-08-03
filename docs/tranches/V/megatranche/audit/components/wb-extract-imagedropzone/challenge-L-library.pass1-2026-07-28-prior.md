# CHALLENGE-L — library structure · `demo/workbenches/extract/ImageDropZone.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant,
declared explicitly at spawn. The seat is declared, not inherited.

- **Axis**: CHALLENGE-L — library structure (module boundaries, ownership, dependency direction,
  public surface).
- **Subject**: `demo/workbenches/extract/ImageDropZone.vue` — 113 lines (`wc -l`), area
  `demo/workbenches`.
- **Repo/HEAD**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict**: **DEFECTIVE** — 6 MAJOR (L-1…L-6), 3 MINOR (L-7…L-9), 1 INFO (L-10).
- **Write scope honoured**: this file is the only artefact written under
  `docs/tranches/V/megatranche/audit/components/wb-extract-imagedropzone/`. No source edited.

---

## 0 · The import closure, traced

```
$ grep -n "^import\|from \"" demo/workbenches/extract/ImageDropZone.vue
66:import { ref, useTemplateRef } from "vue";
67:import { ImagePlus } from "@lucide/vue";
```

Two edges. Both legal. **Everything interesting about this component's library structure is in what
it does *not* import** — the substrate it consumes through the global CSS namespace with no declared
edge at all, and the capabilities it re-implements that already have a home.

The declared surface is only a third of the truth. The component's *real* dependency set is:

| dependency | how it is reached | declared? |
|---|---|---|
| `vue` (`ref`, `useTemplateRef`) | `import` | ✅ |
| `@lucide/vue` (`ImagePlus`) | `import` | ✅ |
| `rounded-panel`, `text-mono-small`, `text-mono-caption` | glass-ui `dist/styles` utilities, global | ❌ implicit |
| `--duration-normal`, `--duration-fast`, `--ease-standard` | glass-ui `dist/styles/tokens/scheme-motion.css` + `scheme-spring.css` | ❌ implicit |
| `--ink-muted` | **written at runtime** by `demo/color-picker/composables/boot/useAtmosphereBoot.ts:103` | ❌ implicit |
| `vj-morph` transition family | `demo/styles/animations.css:70,104` | ❌ implicit |
| `--default-transition-duration/-timing-function` | `demo/styles/foundation.css:128-129` | ❌ implicit (and **contradicted**, see L-6) |

The `--ink-muted` row is the load-bearing one: a leaf presentational component in
`demo/workbenches/` has a hard runtime dependency on `demo/color-picker/composables/boot/` — a
**component → boot** edge, the exact direction the seat names as suspect — carried entirely by an
untyped global custom-property name. That coupling is architecturally *intended* (a token seam is
the right shape), but the seam has no single home, no contract, and — worse — a fallback that
silently substitutes a value the component's own comment declares uncertified (L-1, L-2).

---

## Findings

### L-1 · MAJOR — `.plate-ink` is a 5-consumer cross-feature recipe living as 5 scoped twins

The rule is byte-identical in five files across **three different feature areas**:

```
$ for f in demo/color-picker/ErrorBoundary.vue demo/shared/ui/EmptyState.vue \
      demo/workbenches/extract/ExtractControls.vue demo/workbenches/extract/ExtractWorkbench.vue \
      demo/workbenches/extract/ImageDropZone.vue; do echo "--- $f"; grep -A2 "^\.plate-ink" "$f"; done
--- demo/color-picker/ErrorBoundary.vue
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
--- demo/shared/ui/EmptyState.vue
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
--- demo/workbenches/extract/ExtractControls.vue
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
--- demo/workbenches/extract/ExtractWorkbench.vue
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
--- demo/workbenches/extract/ImageDropZone.vue
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}

$ grep -rn "plate-ink" demo/styles/*.css
(no output)
```

The subject's copy is `ImageDropZone.vue:109-111`, consumed at `:46` and `:58`.

This is not a judgement call — the house has **written the law down twice** and both statements
convict:

> `demo/DESIGN.md:388` — *"**No new global utility class for one consumer** — colocate to the
> component's `<style scoped>` … The shared survivors (`.slug-pill`, `.app-layout`,
> `.pane-container`, `.underline-tabs`) are true cross-feature recipes; each carries a comment
> justifying its global residence."*

> `demo/styles/utils.css` (`.swatch-row` block) — *"A shared recipe (**3 consumers**) per
> DESIGN.md's global-utility rule."*
>
> `demo/styles/utils.css` (`.palettes-ramp-text` block) — *"The ONE recipe for the exactly-TWO
> consume sites … **never a scoped twin (the S.W7-7 lesson)**."*

`.plate-ink` has **five** consumers spanning `demo/color-picker/`, `demo/shared/ui/`, and
`demo/workbenches/extract/`. By the project's own arithmetic it crossed the threshold for
`demo/styles/utils.css` residence long ago and is precisely the "scoped twin" the S.W7-7 lesson
names. `demo/styles/utils.css` already hosts `.gold-shimmer-icon` with a comment recording exactly
this consolidation ("*lifted here because its consumers span components … scoped copies were
byte-identical twins*"). `.plate-ink` is the same species, un-lifted.

- **Mechanism**: a concept (the certified de-emphasis ink rung) with no unique home; five files each
  re-declare it because Vue's `<style scoped>` gives each an isolated namespace, which makes the
  duplication invisible to every gate.
- **Reproduction**: the `grep` above (5 identical rules) + the empty `grep` over `demo/styles/*.css`.
- **Cure**: one rule in `demo/styles/utils.css` with the justifying comment (the existing five
  comments collapse into one), delete all five `<style scoped>` blocks. For `ImageDropZone.vue`
  specifically the *entire* `<style>` element disappears — the file becomes a style-free SFC, 113 →
  ~101 lines.

---

### L-2 · MAJOR — the `var(--ink-muted, var(--muted-foreground))` fallback is a masking fallback, and the masked value is measurably different

Owner edict 2 prohibits masking fallbacks outright. This one is not decorative — I measured both
sides on the live app:

```
$ node scratchpad/probe-utils.mjs      # playwright, http://localhost:9000/#/extract
{
  "inkMuted":         "oklch(44.712054906087% 0.003861589952 34.629978305623deg)",
  "mutedForeground":  "light-dark(hsl(30 22% 40%), hsl(34 14% 62%))"
}
```

Two different colours. And the component's own comment states that the fallback value is the one
that **failed**:

> `ImageDropZone.vue:104-108` — *"the drop-zone caption family … threads the certified de-emphasis
> rung (`--ink-muted` — boot-stamped, floor-clamped against the live resting plate; D6) instead of
> the STATIC `text-muted-foreground` **that failed the text floor over the live-ambient plate in
> light**."*

So the fallback's stated job is to restore, on any failure of the boot writer, the exact value the
remediation was written to eliminate. A fallback whose fallback path is a known contrast failure is
not a safety net — it is the defect wearing a seatbelt.

- **Mechanism**: a cross-boundary token seam (`useAtmosphereBoot.ts:103` writes → 8 demo files read)
  with no declared contract, closed with a `var()` second argument instead of a guaranteed initial
  value.
- **Reproduction**: the measured divergence above is fact. That a user ever *sees* the fallback
  requires `useAtmosphereBoot` to not have run or to have thrown — **HYPOTHESIS**, not reproduced;
  I did not exercise a boot-failure path.
- **Cure**: `@property --ink-muted { syntax: "<color>"; inherits: true; initial-value: … }` (or a
  plain `:root { --ink-muted: … }` seed in `demo/styles/foundation.css`) declared **once**, next to
  the L-1 consolidated rule. Then `.plate-ink { color: var(--ink-muted); }` — one argument, no
  masking, and the pre-boot value is a *declared* certified constant rather than a silent
  substitution of a rejected token.

---

### L-3 · MAJOR — inverted ownership: the file-dialog capability lives in the leaf, and the parent reaches in to pull it

Three modules currently share one capability:

```
ImageDropZone.vue:78    const fileInputRef = useTemplateRef<HTMLInputElement>("fileInputRef");
ImageDropZone.vue:81-83 function openFilePicker() { fileInputRef.value?.click(); }
ImageDropZone.vue:85    defineExpose({ openFilePicker });

ExtractWorkbench.vue:222 const dropZoneRef = ref<InstanceType<typeof ImageDropZone> | null>(null);
ExtractWorkbench.vue:230 function openFilePicker() { dropZoneRef.value?.openFilePicker(); }
ExtractWorkbench.vue:74  @upload="openFilePicker"          ← from ExtractControls
```

The dependency runs **downward and imperatively**: `ExtractControls` (a sibling, in the other grid
column) emits `upload` → `ExtractWorkbench` → reaches *into* `ImageDropZone`'s instance → clicks a
hidden `<input>`. The workbench must know that its presentational child owns a DOM handle.

The correct owner already exists and already does this job. `useExtractSession` owns the whole
intake pipeline:

```
useExtractSession.ts:29-36   function readAsDataUrl(file: File): Promise<string> { … }
useExtractSession.ts:164-168 async function onFile(file) { lastFile.value = file;
                                 previewDataUrl.value = await readAsDataUrl(file); runQuantize(); }
```

The session holds `lastFile`, `previewDataUrl`, and `onFile`. It is missing exactly one thing —
*how the file arrives* — and that one thing is what the leaf component was made to smuggle.

- **Mechanism**: capability placed at the wrong altitude, forcing an `expose`/`InstanceType` back
  channel across two hops to reunite it with its state.
- **Reproduction**: the four line-refs above; `ImageDropZone` has exactly one consumer
  (`grep -rn "ImageDropZone" demo src e2e test` → `ExtractWorkbench.vue:15,193,222` only), so the
  `defineExpose` surface exists solely to serve this one back channel.
- **Cure** (see also L-4): `useFileDialog()` inside `useExtractSession`, returned as
  `session.openPicker`. `ExtractControls`'s `@upload` and the drop zone's own click both call it.
  **Deleted**: `defineExpose` (`:85`), `openFilePicker` (`:81-83`), `fileInputRef` (`:78`), the
  `<input type="file">` (`:27-33`), `onFileSelected` (`:87-92`), `ExtractWorkbench.vue:222` and
  `:230-232`, and the `ref`-vs-`useTemplateRef` idiom split at `ExtractWorkbench.vue:222/223`
  (edict 7) dies as a side effect.

---

### L-4 · MAJOR — hand-rolled drag/file mechanics that `@vueuse/core` already owns, in a project that already depends on it

`@vueuse/core@14.3.0` is a direct dependency (`package.json` devDependencies) with **six** existing
demo consumers:

```
$ grep -rn "@vueuse/core" demo/
demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:12
demo/picker/ColorPicker.vue:123
demo/shell/dock/Dock.vue:16
demo/color-session/useColorPersistence.ts:2
demo/color-picker/composables/boot/useAtmosphere.ts:23
demo/palettes/usePaletteStore.ts:1
```

It ships both halves of what this component re-implements:

```
node_modules/@vueuse/core/dist/index.d.ts:1932
  declare function useDropZone(target, options?: UseDropZoneOptions | …): UseDropZoneReturn;
    // UseDropZoneOptions: { dataTypes, checkValidity, onDrop, onEnter, onLeave, onOver,
    //                       multiple, preventDefaultForUnhandled }
    // UseDropZoneReturn:  { files: ShallowRef<File[]|null>, isOverDropZone: ShallowRef<boolean> }

node_modules/@vueuse/core/dist/index.d.ts:2626
  declare function useFileDialog(options?: UseFileDialogOptions): UseFileDialogReturn;
    // UseFileDialogOptions: { multiple, accept, capture, reset, directory, initialFiles, input }
    // UseFileDialogReturn:  { files, open, reset, onChange, onCancel }
```

Against that, `ImageDropZone.vue:78-100` is 23 lines of script re-deriving `isOverDropZone`
(`dragging`), `accept` (`:30`), the type filter (`:97` `file?.type.startsWith("image/")` ≈
`dataTypes`), `reset` (`:91` `input.value = ""`), and `open` (`:82`) — and it re-derives them
*worse*:

- **`dataTypes` is enforced on one path only.** `:30` `accept="image/*"` is an advisory filter on the
  picker path; `:97` guards the drop path. But `accept` is not enforcement — a user who switches the
  native picker to "All Files" and selects a `.pdf` reaches `:90 emit("file", file)` with no type
  check whatsoever. The drop path rejects it; the picker path admits it. Two paths, one concept,
  divergent behaviour. *(Independently observed by the sibling seat at
  `wb-extract-controls/challenge-C-implementation.md:104-108`.)*
- **`dragging` flickers on child-element traversal.** `:23-24` sets `dragging` from a raw
  `dragover`/`dragleave` pair on the root. Per the HTML drag-and-drop model, moving the pointer from
  the root onto a descendant (`<img>` at `:37`, `<div>` at `:46`) fires `dragleave` on the root with
  `relatedTarget` = the child; the handler unconditionally sets `dragging = false`, dropping the
  `border-primary bg-primary/10 scale-[1.01]` affordance mid-drag. `useDropZone` exists because of
  this exact bug and solves it with an enter/leave counter.
  **HYPOTHESIS** — mechanism is spec-derived, not reproduced live (I did not simulate a native drag
  over the preview child; drag synthesis is an expensive probe and the finding stands on the
  ownership argument regardless).

- **Mechanism**: second implementation of a concept whose home is an installed, already-consumed
  dependency.
- **Reproduction**: the two `d.ts` signatures + the six existing `@vueuse/core` demo consumers +
  the two divergent validation sites.
- **Cure**: `useDropZone(rootRef, { dataTypes: ['image/*'], multiple: false, onDrop })` +
  `useFileDialog({ accept: 'image/*', multiple: false, reset: true })` (the latter hoisted to
  `useExtractSession` per L-3). The component's `<script setup>` drops from 36 lines to ~8 and the
  two-path validation collapses to one `dataTypes` declaration.

---

### L-5 · MAJOR — wrong public surface: two props encode one state, and the extra prop makes two rendered branches unreachable

```
ImageDropZone.vue:69-72
defineProps<{
    preview: string | null;
    disableClick?: boolean;
}>();
```

Single call site, and it derives one prop from the other:

```
ExtractWorkbench.vue:22-23
    :preview="session.previewDataUrl.value"
    :disable-click="!!session.previewDataUrl.value"
```

`grep -rn "ImageDropZone" demo src e2e test` returns `ExtractWorkbench.vue:15,193,222` and nothing
else — there is no second call site that could ever pass a different combination. The prop surface
declares 4 states; exactly 2 are reachable (`preview=null, disableClick=false` and
`preview=<url>, disableClick=true`).

The dead half is not abstract — it is shipped, rendered markup that no user can reach:

- `:20` the `'Replace image, click or drop a new image'` aria-label branch requires
  `preview && !disableClick`. Unreachable.
- `:61` the `'replace'` corner tag requires the same. Unreachable — the tag can only ever read
  `sample`. *(Corroborated independently at
  `wb-extract-workbench/challenge-C-implementation.pass2-2026-07-28.md:372-373`.)*
- `:10` `preview && disableClick ? 'cursor-crosshair' : 'cursor-pointer'` — the `&&` is redundant;
  `preview` alone decides.

Meanwhile the `disableClick` name lies about its own effect: it also drives `:19`
`:tabindex="disableClick ? -1 : 0"`, silently evicting the drop zone from the tab order the moment
an image loads. That is a keyboard-reachability consequence hidden behind a prop named for a mouse
concern — a naming defect that only exists because the prop is a phantom degree of freedom in the
first place.

- **Mechanism**: a prop minted to express a *mode* that is already a total function of an existing
  prop; the redundancy then licenses branches that can never fire.
- **Reproduction**: the single call site above + the grep proving it is the only one.
- **Cure**: delete `disableClick`. The component's public surface becomes
  `props: { preview: string | null }`, `emits: { file: [File], sample: [] }` (see L-8). Every
  `disableClick` read becomes `preview`. The two unreachable branches are deleted, not preserved —
  they are not a feature awaiting a caller, they are residue.

---

### L-6 · MAJOR — per-instance inline transition overrides, in a project whose root already declares the same values, in the only file in the repo that does this

```
ImageDropZone.vue:17  :style="{ transitionDuration: 'var(--duration-normal)',
                                transitionTimingFunction: 'var(--ease-standard)' }"
ImageDropZone.vue:59  :style="{ transitionDuration: 'var(--duration-fast)' }"
```

This is the **only** file in `demo/` + `src/` using the idiom:

```
$ grep -rn "transitionDuration\|transitionTimingFunction\|transition-duration:\s*var(--duration\|transition-timing-function:\s*var(--ease" demo/ src/
demo/workbenches/extract/ImageDropZone.vue:17
demo/workbenches/extract/ImageDropZone.vue:59
demo/styles/foundation.css:128:    --default-transition-duration:         var(--duration-fast);
demo/styles/foundation.css:129:    --default-transition-timing-function:  var(--ease-standard);
```

The last two hits are the root declaration that makes both inline bindings unnecessary, and its
comment states the intent in terms:

> `demo/styles/foundation.css:120-127` — *"Alias it at the `@theme` ROOT to the house motion tokens
> so every un-tuned `transition` utility speaks the app's fast duration + standard ease by
> construction — **no per-callsite modifier**."*

Measured on the live app — this is the decisive evidence:

```
$ node scratchpad/probe-defaults.mjs   # playwright, http://localhost:9000/#/extract
{
  "bare_transition_all":     { "dur": "0.2s", "ease": "cubic-bezier(0.4, 0, 0.2, 1)" },
  "bare_transition_opacity": { "dur": "0.2s", "ease": "cubic-bezier(0.4, 0, 0.2, 1)" },
  "with_duration_normal":    { "dur": "0.3s", "ease": "cubic-bezier(0.4, 0, 0.2, 1)" },
  "with_ease_standard":      { "dur": "0.2s", "ease": "cubic-bezier(0.4, 0, 0.2, 1)" },
  "rootDefaults":            { "d": "0.2s",   "e": "cubic-bezier(0.4, 0, 0.2, 1)" }
}

$ node scratchpad/probe-utils.mjs      # the live drop zone element
"dropZone": {
  "transitionDuration": "0.3s",
  "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
  "inlineStyle": "transition-duration: var(--duration-normal); transition-timing-function: var(--ease-standard);"
}
```

Three inline declarations. All three are provably removable:

| site | inline declaration | computed | root default / utility gives | verdict |
|---|---|---|---|---|
| `:17` | `transitionDuration: var(--duration-normal)` | `0.3s` | `class="duration-normal"` → `0.3s` | **replaceable by one class token** |
| `:17` | `transitionTimingFunction: var(--ease-standard)` | `cubic-bezier(.4,0,.2,1)` | root default already `cubic-bezier(.4,0,.2,1)` | **dead — pure no-op** |
| `:59` | `transitionDuration: var(--duration-fast)` | `0.2s` | bare `transition-opacity` already `0.2s` | **dead — pure no-op** |

`demo/shell/dock/ActionToolbar.vue:9` already ships `duration-normal` as a class in production,
proving the utility compiles in this Tailwind configuration.

- **Mechanism**: a per-instance styling override where the design system already supplies the value
  at the root — owner edict 5, and the exact anti-pattern `foundation.css` was written to abolish.
- **Reproduction**: the two pasted probe outputs.
- **Cure**: `:17` → append `duration-normal` to the existing `:class` array; delete the `:style`
  binding entirely. `:59` → delete the `:style` binding entirely, no replacement. Net: two Vue
  bindings and three CSS declarations removed, zero visual change (measured identical).

---

### L-7 · MINOR — `useExtractSession` hand-rolls a debounce beside "the demo's ONE debounce"

One hop under the subject, `demo/workbenches/extract/composables/useExtractSession.ts` grows its own
timer:

```
useExtractSession.ts:49      let debounceTimer: ReturnType<typeof setTimeout> | null = null;
useExtractSession.ts:159-162 function debouncedReQuantize() {
                                 if (debounceTimer) clearTimeout(debounceTimer);
                                 debounceTimer = setTimeout(runQuantize, 300); }
useExtractSession.ts:194-196 onBeforeUnmount(() => { if (debounceTimer) clearTimeout(debounceTimer); });
```

`demo/shared/utils.ts:23` is the declared home, with a comment that could not be more explicit:

> *"**The demo's ONE debounce** (T.W6.5 Lane M · row 12 — the root-barrel shed) … one pending timer,
> last-args-win, `.cancel()` drops a pending invocation."*

It has seven consumers and `useExtractSession` is not among them:

```
$ grep -rn "from \".*shared/utils\"" demo/
demo/color-picker/composables/boot/useAtmosphere.ts:33
demo/color-session/useColorNameResolution.ts:2
demo/color-session/useColorParsing.ts:2
demo/color-session/useColorPersistence.ts:3
demo/color-session/useColorPipeline.ts:2
demo/color-session/useColorUrl.ts:8
demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue:3
```

The hand-rolled version reimplements the shared one's semantics exactly (trailing edge, one pending
timer, last-args-win) plus a manual `onBeforeUnmount` that `.cancel()` already serves.

- **Mechanism**: dual path — a second implementation of a concept with a named, documented,
  seven-consumer home.
- **Reproduction**: the two greps above.
- **Cure**: `const reQuantize = debounce(runQuantize, 300)` from `../../../shared/utils`;
  `onBeforeUnmount(reQuantize.cancel)`. Four lines and one module-scope `let` die.

---

### L-8 · MINOR — three outward channels for one component; the load-bearing one is undeclared

`ImageDropZone` talks to its parent through **three** distinct mechanisms:

1. `defineEmits<{ file: [file: File] }>()` (`:74-76`) — declared.
2. `defineExpose({ openFilePicker })` (`:85`) — declared, and wrong (L-3).
3. **A native `click` riding attribute fallthrough** — undeclared.

Channel 3 is not incidental; it is how the eyedropper opens:

```
ExtractWorkbench.vue:25   @click="session.previewDataUrl.value && (eyedropperActive = true)"
ImageDropZone.vue:21      @click="!disableClick && openFilePicker()"
```

Both listeners bind to the same root `<div>` (Vue merges the fallthrough `onClick` with the
component's own). The two are mutually exclusive by construction — because `disableClick === !!preview`
(L-5), exactly one fires per state — which means **the component's click state machine is split
across two files**, with the switch living in a prop the child does not name after what it does.
Nothing in `ImageDropZone`'s declared API says "I emit a sampling intent"; a reader of the SFC
cannot know the eyedropper exists.

- **Mechanism**: an implicit contract carried by attribute fallthrough instead of an explicit emit.
- **Reproduction**: the two line-refs; the behaviour is directly readable from Vue's attrs-merge
  semantics for a single-root component with no `inheritAttrs: false`.
- **Cure**: declare it. `emits: { file: [File], sample: [] }`; `:21` becomes
  `@click="preview ? emit('sample') : openPicker()"`; `ExtractWorkbench.vue:25` becomes
  `@sample="eyedropperActive = true"`. One root, one declared surface, no fallthrough dependence.

---

### L-9 · MINOR — `tsconfig.demo.json` `paths` has drifted from `package.json#exports`, and is dead weight regardless

The seat asks whether the demo consumes `@mkbabb/value.js` through the published surface. For
`ImageDropZone` the answer is trivially yes-by-vacuity (it imports nothing from the library — see
Negative proofs). For the *area* it is yes in substance but the config that is supposed to guarantee
it is stale in four ways.

| key | in `package.json#exports`? | in `src/subpaths/`? | in `tsconfig.demo.json#paths`? |
|---|---|---|---|
| `./color` | ✅ | ✅ | ✅ |
| `./value` | ✅ | ✅ | ❌ **missing** |
| `./css` | ✅ | ✅ | ❌ **missing** (10 demo consumers) |
| `./easing` | ✅ | ✅ | ✅ |
| `./math` | ✅ | ✅ | ✅ |
| `./transform` | ✅ | ✅ | ✅ |
| `./quantize` | ✅ | ✅ | ✅ |
| `./parsing` | ❌ | ❌ | ✅ **dead entry** |
| `./units` | ❌ | ❌ | ✅ **dead entry** |
| `.` (bare) | ❌ (no `"."` key) | — | ✅ → `./dist/index.d.ts` |

```
$ ls dist/
anchors-C_wdoOYd.js  gh-pages  operations-CB_1wGy4.js  result-CZJK1CwL.js  subpaths
```

`dist/index.d.ts` **does not exist** — the bare-specifier `paths` entry targets a missing file. The
surrounding comment also miscounts: it says *"the demo speaks only the 8 public keys"* and *"a CLOSED
8-key set"*; the map has **7**.

The measured good news is that none of this currently breaks, because TypeScript resolves the demo's
value.js imports by **package self-reference through the repo's own `exports` map**, not through
`paths` at all:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution 2>&1 | sed -n '407,421p'
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
Explicitly specified module resolution kind: 'Bundler'.
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
File '…/demo/color-session/package.json' does not exist.
File '…/demo/package.json' does not exist.
Found 'package.json' at '…/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
File '…/dist/subpaths/css.d.ts' exists - use it as a name resolution result.
Resolved under condition 'types'.
Exiting conditional exports.
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '…/value.js/dist/subpaths/css.d.ts' with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

`./css` has no `paths` entry, and it resolves correctly anyway — through the exports map, to the
same `dist/subpaths/css.d.ts` the five *present* `paths` entries hard-code. **The entire `paths`
block for `@mkbabb/value.js` is redundant with the mechanism that is actually doing the work**, and
carries two dead names and one dangling file target as interest.

That redundancy is not free — it is a *second* declaration of the published surface that can drift
from the first, and it already has. Owner edict 2 names exactly this shape: dual paths and legacy
config that outlived their mechanism.

One live trap sits behind it, worth recording as a **HYPOTHESIS** (not reproduced): a stray import of
`@mkbabb/value.js/parsing` or `/units` matches a `paths` pattern that points at a nonexistent `.d.ts`
before falling through to the exports map, which has no such key. The failure mode is a
resolution error rather than a silent wrong resolve, so the risk is confusion, not corruption.

- **Mechanism**: the published surface declared twice — once normatively in `package.json#exports`
  (which Vite also generates its alias set from, `vite.config.ts:38-49`), once by hand in
  `tsconfig.demo.json` — with no gate binding them.
- **Reproduction**: the table (all three columns verified by `ls`/`node -e`), the `ls dist/`, and the
  pasted `--traceResolution` block.
- **Cure**: delete the seven-to-nine `@mkbabb/value.js*` entries from `tsconfig.demo.json#paths`
  outright and let self-reference through `exports` be the single source of truth — the same
  single-source discipline `vite.config.ts:38-49` already applies on the runtime side ("*GENERATED
  (not hand-rolled) so the alias set can never drift from the exports map*"). Keep the `vue`/`@vue/*`
  dedupe entries. Fix the stale "8 public keys" prose to 7.

---

### L-10 · INFO — glass-ui has no drop-zone primitive, and it would be contrivance to file one today

Owner edict 4 makes glass-ui the home for design-system primitives. A file drop zone is, in the
abstract, exactly that. But glass-ui 7.0.0 does not ship one:

```
$ node -e "const d=require('./node_modules/@mkbabb/glass-ui/package.json'); \
           console.log(d.version); console.log(Object.keys(d.exports).length)"
7.0.0
73

$ head -5 node_modules/@mkbabb/glass-ui/dist/forms.d.ts
export * from "./components/input";
export * from "./components/textarea";
export * from "./components/combobox";
export { useUserInvalidAria, … } from "./composables/dom/useUserInvalidAria";
export type { ControlSize } from "./components/_shared";
```

`./forms` is input / textarea / combobox. No `file-field`, no `drop-zone`, and no near-miss whose
component-type name should be reused.

With **one** consumer in the whole demo, minting a producer primitive now would be the exact
contrivance edict 3 prohibits. The correct disposition is: **leave it where it is**, and record the
ask so that the *second* consumer — not the first — triggers the glass-ui letter. Should any repair
in this family touch the component's rendered surface, the standing BH/BI relay edict applies (every
component/glass-ui-level change is relayed to the active glass-ui BH inbox).

- **Severity**: INFO — a booked trigger condition, not a present defect.

---

## Negative proofs — what I checked and found SOUND

These are stated because a challenge seat that reports only hits is not evidence.

1. **No deep import into the library.** `ImageDropZone.vue` imports `vue` and `@lucide/vue`, full
   stop (pasted at §0). There is no `@mkbabb/value.js/*`, no `@src/*`, no `../../../src/` reach. A
   real external consumer could write this file's import block verbatim.
2. **The area's library imports are all through the published export map.** All 29
   `@mkbabb/value.js` specifiers under `demo/workbenches/` name a real `exports` key
   (`/color` ×25, `/css` ×10, `/math` ×6, `/easing` ×5, `/quantize` ×4, repo-wide in `demo/`); zero
   bare-root imports survive (`grep -rn '"@mkbabb/value.js"' demo/` → no output). The T.W1
   demo-dogfood keystone holds in substance; only its *config* has drifted (L-9).
3. **`verbatimModuleSyntax` is satisfied.** Both imports are value imports (`ref`,
   `useTemplateRef`, the `ImagePlus` component). No type-only import exists to be mis-declared.
4. **No second file-intake implementation exists.** `<input type="file">` at `:29` is the only one
   in the demo, and `FileReader`/`readAsDataURL` appear only in `useExtractSession.ts:31,34`:
   ```
   $ grep -rn 'type="file"\|dataTransfer\|@drop\|dragover' demo/
   demo/workbenches/extract/ImageDropZone.vue:23,25,29,96   ← all four hits, one file
   $ grep -rn "FileReader\|readAsDataURL\|createObjectURL" demo/ src/
   demo/workbenches/extract/composables/useExtractSession.ts:31,34
   demo/palettes/export.ts:88,126   ← unrelated (SVG/PNG export blobs)
   ```
   The L-4 finding is *under*-implementation against an available library, **not** duplication
   across the demo. That distinction matters for the cure.
5. **Not a god module.** 113 lines, three functions, one concept. It does not accrete.
6. **Its physical home is correct — do not hoist it.** One consumer
   (`ExtractWorkbench.vue:15,193,222`). Moving it to `demo/shared/ui/` alongside `EmptyState.vue` and
   `PaneHeader.vue` would be a speculative shared-directory promotion — edict 3 forbids it and
   `DESIGN.md:388` states the same rule for CSS. `demo/workbenches/extract/` is where it belongs
   until a second consumer exists.
7. **The `@lucide/vue` barrel import is the house idiom and has no alternative.** 47 of 47 demo
   import sites use the bare barrel, and the package ships no `exports` map at all
   (`Object.keys(exports)` → `[]`, v1.17.0), so per-icon subpaths do not exist to be preferred.
8. **The component renders correctly and errors nowhere.** `REPORT.json` for `/#/extract` across all
   four matrices: `pageErrors: []`, `consoleErrors: []`, `overflowX: 0`, `imgNoAlt: 0`. The drop zone
   carries an accessible name (it is not among the 3 `namelessButtons`) and its `role="button"` is
   asserted green by `e2e/smoke/walk.spec.ts:78-81`. I read
   `shots/safari-desktop-light/extract.png` and `shots/safari-mobile-dark/extract.png`: the dashed
   plate, `ImagePlus` glyph and mono prompt render correctly and legibly in both schemes at both
   sizes. **No visual defect on this axis.**

---

## Greenfield lattice — what I would build today

Stated concretely, as the seat demands, without hedging. The transposition is a *net deletion*.

```
demo/workbenches/extract/
├── composables/
│   ├── useImageIntake.ts        NEW ─ the single home for "a File arrives"
│   │     useFileDialog({ accept:'image/*', multiple:false, reset:true })
│   │     useDropZone(target, { dataTypes:['image/*'], multiple:false })
│   │     exposes → { openPicker(), bindDropZone(el), file: ShallowRef<File|null>,
│   │                 isOver: ShallowRef<boolean> }
│   │     ONE accept declaration; ONE validation; ONE drag-state counter.
│   ├── useExtractSession.ts     ─ consumes useImageIntake; keeps quantize
│   │                              orchestration; debounce ← shared/utils
│   ├── useImageQuantize.ts      ─ unchanged
│   └── quantize-worker.ts       ─ unchanged
├── ImageDropZone.vue            ─ PURE VIEW. props { preview: string|null }.
│                                  emits { file:[File], sample:[] }.
│                                  no <input>, no defineExpose, no <style>,
│                                  no inline :style, no dragging ref.
├── ExtractControls.vue          ─ emits upload → session.openPicker()
└── ExtractWorkbench.vue         ─ pure composition; no InstanceType<> ref,
                                   no openFilePicker(), one template-ref idiom

demo/styles/utils.css            ─ + .plate-ink (the ONE rule, 5 twins deleted)
demo/styles/foundation.css       ─ + :root { --ink-muted: <certified seed> }
                                     (kills the masking fallback at the source)
tsconfig.demo.json               ─ − the whole @mkbabb/value.js paths block;
                                     package.json#exports is the ONE surface
```

**The three laws this lattice restores**

1. *Unique semantic ownership.* "A file arrives" lives in `useImageIntake` — once. "The certified
   de-emphasis ink" lives in `utils.css` — once. "The published surface" lives in
   `package.json#exports` — once. Today each of the three has two-to-five homes.
2. *Dependency flows one way.* View → composable → library. No parent reaches into a child's
   instance; no `defineExpose` survives; no capability is smuggled downward to be pulled back up.
3. *Every dependency is declared.* The `--ink-muted` seam gets a declared root value instead of a
   masking fallback; the eyedropper intent gets a declared emit instead of attribute fallthrough;
   the transition timing gets a root default instead of a per-instance escalation.

**Measured cost of the transposition — it is negative.** Deleted, with nothing added but two
`@vueuse/core` imports and one CSS rule that already exists five times:

| deletion | lines |
|---|---|
| 5 × `.plate-ink` scoped blocks (net of one consolidated rule) | ~28 |
| `<input>` + `openFilePicker` + `defineExpose` + `onFileSelected` + `fileInputRef` | ~18 |
| `dragging` ref + raw `dragover`/`dragleave`/`onDrop` handlers | ~10 |
| `disableClick` prop + 2 unreachable branches + the redundant `&&` | ~6 |
| 2 inline `:style` bindings (3 declarations, all measured dead-or-replaceable) | 2 |
| `ExtractWorkbench` `dropZoneRef` + `openFilePicker` + `InstanceType<>` | ~5 |
| `useExtractSession` hand-rolled debounce (net of `debounce()` call) | ~4 |
| `tsconfig.demo.json` `@mkbabb/value.js` `paths` entries | 9 |
| **total** | **~82 lines removed** |

`ImageDropZone.vue` itself goes 113 → ~55 lines and becomes a component that does exactly one thing:
render a plate that shows either a prompt or a specimen, and say when something happened.

---

## Strongest defect

**L-3 + L-4 together — the file-intake capability is homeless.** It is currently split across a leaf
presentational component (`defineExpose`), its grandparent (`InstanceType<>` ref), a sibling
(`@upload` emit), and a composable that owns everything about the file *except how it arrives* — while
an installed, already-consumed dependency (`@vueuse/core@14.3.0`, 6 existing demo consumers) ships
both halves of the capability with the correctness properties the hand-roll lacks (single-point
`dataTypes` enforcement; counter-based drag state). This is the defect that *generates* the others:
`disableClick` (L-5) exists to tell the leaf when its smuggled click means something else; the
fallthrough `@click` (L-8) exists because the leaf has no vocabulary for the intent it is actually
signalling. Fix the ownership and three findings dissolve with it.

## Verdict

**DEFECTIVE.** Six MAJOR (L-1 · L-2 · L-3 · L-4 · L-5 · L-6), three MINOR (L-7 · L-8 · L-9), one
INFO (L-10). Not one of them is a bug in what the component *does* — it
renders correctly, errors nowhere, and passes its e2e oracle. Every one is a defect in *where the
things it does are kept*. That is precisely the axis, and the file is guilty on it.
