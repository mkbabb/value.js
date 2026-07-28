# CHALLENGE-L — library structure · `demo/workbenches/extract/ExtractWorkbench.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat
was explicitly spawned with. Declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/extract/ExtractWorkbench.vue`, **293 lines** (`wc -l`).
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface.
- Verdict: **DEFECTIVE**. 1 BLOCKER (confirmed live), 5 MAJOR, 4 MINOR, 1 INFO.

---

## 0 · The dependency graph, traced

Every import in the subject file, resolved to its home:

| line | specifier | resolves to | verdict |
|---|---|---|---|
| 185 | `vue` | host `vue` (deduped, `vite.config.ts` `dedupe`) | OK |
| 186 | `@lucide/vue` | devDependency | OK |
| 187 | `@mkbabb/glass-ui/dock` | glass-ui `exports["./dock"]` → `dist/dock.js` | OK — granular subpath |
| 188 | `@mkbabb/glass-ui/dom` | glass-ui `exports["./dom"]` → `dist/dom.js` | OK — granular subpath |
| 189 | `@mkbabb/value.js/color` | **self-reference** through this repo's own `package.json#exports` → `dist/subpaths/color.d.ts` (traced, §L-9) | OK — published surface |
| 190 | `../../color-session/keys` | `demo/color-session/` — the shared color domain | OK direction (feature → domain) |
| 191 | `./composables/useExtractSession` | colocated | OK |
| 193–195 | `./ImageDropZone.vue`, `./ExtractControls.vue`, `./ImageEyedropper/…` | colocated | OK |
| 196–200 | `../../palettes/browser/card` | palette-browser sub-barrel (a named re-export of the top seam, `demo/palettes/browser/index.ts:20-27`) | **structurally legal, semantically inverted — see L-4** |

Transitively, through `useExtractSession.ts`:

| line | specifier | verdict |
|---|---|---|
| 14 | `@mkbabb/value.js/quantize` | OK — published subpath |
| 15 | `@mkbabb/value.js/css` | OK — published subpath |
| 17 | `../../../palettes/usePaletteStore` | **boundary violation — L-3** |
| 18 | `../../../palettes/types` | OK (type-only, `import type`) |

**Positive finding, stated for the record:** the extract subtree consumes value.js *only* through the
seven published bare subpaths — `@mkbabb/value.js/{color,css,quantize}`. There is not a single
`@src/…` or `../../src/…` reach anywhere in `demo/workbenches/extract/**`. `quantize-worker.ts:6-7`
imports `quantizePixels` and its types from `@mkbabb/value.js/quantize` — a real consumer could write
that line verbatim. This is the T.W1 dogfood keystone actually holding. The public-surface half of
this challenge's premise is **not** where the rot is; §L-9 and §L-10 are the two places the *resolution
machinery around it* has rotted, and §L-8 is where the published surface itself is wrong.

---

## L-1 · BLOCKER — the camera stream outlives the view; `onBeforeUnmount` is dead code under `<KeepAlive>`

**The defect.** `ExtractWorkbench.vue:281` releases the `MediaStream` with
`onBeforeUnmount(stopCamera)`. The shell that mounts this pane wraps it in `<KeepAlive>`
(`demo/shell/PaneSlot.vue:120`), sized so the extract pane is **never** evicted
(`demo/color-picker/App.vue:107` `:max="6"` for exactly the 6 non-admin left panes: color-picker ·
browse · **extract** · atmosphere · generate · gradient). A KeepAlive-cached component is
*deactivated*, not unmounted — `onBeforeUnmount` never fires. The camera therefore keeps capturing
after the user navigates away, indefinitely, for the life of the tab.

**Reproduction — CONFIRMED LIVE** against the dev server at `http://localhost:9000`, Playwright
(Chromium). A `canvas.captureStream()` was substituted for `getUserMedia` so the lifecycle is proven
independent of camera hardware:

```
// 1. at #/extract, install fake device, click title="Open camera"
{ "video": true, "tracks": ["live"] }

// 2. location.hash = '#/palettes'; wait 2000ms
{ "hash": "#/palettes",
  "extractStillInDom": false,      // pane deactivated — DOM subtree removed
  "videoStillInDom": false,
  "tracksAfterViewSwitch": ["live"] }   // ← STREAM STILL LIVE. stopCamera() never ran.

// 3. location.hash = '#/extract'; wait 2000ms
{ "extractBack": true,
  "viewfinderStillOpen": true,     // cached state restored, camera never closed
  "tracksNow": ["live"] }
```

**The structural root — not the symptom.** The caching policy is owned by the shell
(`demo/shell/PaneSlot.vue`); the device-resource lifetime is owned by a leaf SFC three layers down;
there is no contract between them. The SFC assumes mount/unmount semantics the shell does not
provide. The repo *knows* this hook exists — `demo/picker/visual/HeroBlob.vue:246` uses
`onActivated` and its comment (lines 232-235) spells the mechanism out: *"The picker pane is
KeepAlive-cached; navigating away parks the blob…"*. `onDeactivated` appears **zero** times in the
entire demo:

```
$ grep -rn "onActivated\|onDeactivated" demo/ --include="*.vue" --include="*.ts"
demo/picker/visual/HeroBlob.vue:27:    onActivated,
demo/picker/visual/HeroBlob.vue:246:onActivated(() => {
```

**Two more resources in this same subtree bind to the same dead hook**, and are dead for the same
reason:

- `demo/workbenches/extract/composables/useImageQuantize.ts:148-151` — `worker?.terminate()`. The
  quantize Worker is never terminated in the shipped shell; it lives for the tab's lifetime.
- `demo/workbenches/extract/composables/useExtractSession.ts:194-196` — the 300 ms re-quantize
  debounce timer is never cleared. A pending timer fires into a deactivated tree.

**Cure — architectural transposition, not a patch.** Do not sprinkle `onDeactivated` at three sites.
Introduce **one** lifecycle primitive that expresses the shell's real contract and make every
resource-owning composable in the demo consume it:

```ts
// demo/shell/usePaneLifecycle.ts — the ONE seam between PaneSlot's caching
// policy and any resource a pane owns. `release` runs on BOTH deactivate and
// unmount; `acquire` on activate and mount. There is no other correct pairing
// under <KeepAlive>.
export function onPaneRelease(fn: () => void) {
  onDeactivated(fn);
  onBeforeUnmount(fn);
}
```

Then the camera itself must leave the SFC entirely — see **L-2**.

---

## L-2 · MAJOR — two implementations of the camera; the composable's copy is dead, the SFC's copy is the live one

`getUserMedia` appears exactly twice in the whole demo, with **byte-identical constraints**:

```
$ grep -rn "getUserMedia" demo/ --include="*.ts" --include="*.vue"
demo/workbenches/extract/ExtractWorkbench.vue:242:        cameraStream = await navigator.mediaDevices.getUserMedia({
demo/workbenches/extract/composables/useImageQuantize.ts:116:        const stream = await navigator.mediaDevices.getUserMedia({
```

both `{ video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } } }`
(`ExtractWorkbench.vue:243-247` / `useImageQuantize.ts:117`).

The composable's version — `quantizeFromCamera` — is a *complete* capability: stream acquisition,
video element, dimension wait, canvas grab, quantize, and a returned `stop()` (i.e. it already solves
L-1's release problem by handing the caller an explicit disposer). It has **zero callers**:

```
$ grep -rn "quantizeFromCamera\|quantizeFromCanvas" --include="*.ts" --include="*.vue" . | grep -v node_modules
demo/workbenches/extract/composables/useImageQuantize.ts:4:   * Provides: quantizeFromFile, quantizeFromCanvas, quantizeFromCamera
demo/workbenches/extract/composables/useImageQuantize.ts:110:    async function quantizeFromCanvas(…)
demo/workbenches/extract/composables/useImageQuantize.ts:115:    async function quantizeFromCamera(…)
demo/workbenches/extract/composables/useImageQuantize.ts:158:        quantizeFromCanvas,
demo/workbenches/extract/composables/useImageQuantize.ts:159:        quantizeFromCamera,
```

`quantizeFromCanvas` is likewise dead. So: **69 lines of unreferenced capability in the composable
layer, while the SFC hand-rolls the same device access inline (lines 228-279) and gets the lifetime
wrong.** This is precisely the "second implementation of the same concept alive elsewhere" the brief
names, and it is the direct cause of L-1 — the disposer the composable already returns was thrown
away when the capability was re-written in the SFC.

Violates edict 2 (no dual paths) and edict 1 (the SFC absorbed a platform capability instead of
delegating).

**Cure.** Delete `quantizeFromCamera`/`quantizeFromCanvas` from `useImageQuantize` — a *quantizer*
client has no business owning a camera — and stand up the capability where the demo already puts
device concerns: `demo/platform/`. `demo/platform/` today holds `auth/`, `storage/`, `transport/`; a
`media/useCameraCapture.ts` is the one missing sibling, not a new invented layer:

```ts
// demo/platform/media/useCameraCapture.ts
export function useCameraCapture() {
  const active = shallowRef(false);
  const error  = ref<string | null>(null);
  let stream: MediaStream | null = null;
  async function open(): Promise<void>  { … }   // sets active only AFTER the grant resolves
  function close(): void { stream?.getTracks().forEach(t => t.stop()); stream = null; active.value = false; }
  async function captureFrame(video: HTMLVideoElement): Promise<File> { … }
  onPaneRelease(close);                          // L-1's seam, applied once, in the right place
  return { active: readonly(active), error, stream: () => stream, open, close, captureFrame };
}
```

`ExtractWorkbench` then owns *zero* lines of `navigator.mediaDevices`, `canvas.toBlob`, `MediaStream`
or `File` construction — it renders a viewfinder and calls `open()`/`captureFrame()`.

---

## L-3 · MAJOR — `useExtractSession` bypasses the port it is supposed to reach through; two paths into `createPalette`

`demo/palettes/usePalettePorts.ts:22-30` states the law of this layer in its own header:

> *"…dissolution of the old `usePaletteManager` god facade … into FIVE narrow, feature-owned ports.
> **no consumer injects a member outside the port it named.**"*

`LIBRARY_PORT_KEY` exposes `createPalette` (`usePalettePorts.ts:142`). Every sibling workbench reaches
it through that port:

```
$ grep -rn "createPalette" demo/ --include="*.vue" --include="*.ts"
demo/workbenches/mix/MixPane.vue:43:        pm.createPalette("Mixed Color", colors);       # LIBRARY_PORT_KEY
demo/workbenches/mix/MixPane.vue:45:        pm.createPalette("Mixed Palette", …);          # LIBRARY_PORT_KEY
demo/workbenches/generate/GeneratePane.vue:19:    pm.createPalette("Generated Palette", …);      # LIBRARY_PORT_KEY
demo/workbenches/extract/composables/useExtractSession.ts:41:    const { createPalette } = usePaletteStore();   # ← RAW STORE
demo/workbenches/extract/composables/useExtractSession.ts:187:        createPalette(p.name, p.colors);
```

Extract is the **only** consumer that reaches past the port into the singleton store. The consequence
is not cosmetic: the port route runs through `usePaletteActions.ts:67-74`, which the code's own
comment says exists to make the save survive a failing side-effect
(*"`createPalette` must run UNCONDITIONALLY … threw before `createPalette` ran and the palette was
silently destroyed"*). The extract save gets none of that surrounding behaviour.

Worse, the *same component* splits its writes across two mechanisms: `pick` and `addColor` are
`emit`s that `ExtractPane.vue:14-15` forwards to `COLOR_TARGET_PORT_KEY`, while `save` dives straight
to the store from inside a composable two levels deeper. One component, two write architectures.

**Cure.** `useExtractSession` takes its persistence as an injected dependency, not an import:
`const { createPalette } = inject(LIBRARY_PORT_KEY)!`, or — better, and symmetric with `pick`/
`addColor` — the workbench emits `save` and `ExtractPane` (the shell that already injects ports) does
the write. The composable then has no dependency on `demo/palettes/` at all beyond the `Palette` type.

---

## L-4 · MAJOR — `ShadowPalette` is owned by the wrong feature: one consumer, and it is outside its home

`ShadowPalette.vue` lives in `demo/palettes/browser/card/` and is exported through the palette-browser
mega-feature's public seam (`demo/palettes/browser/index.ts:20-27`). By enumeration it has **exactly
one consumer, in another feature**:

```
$ grep -rn "\bShadowPalette\b" demo/ --include="*.vue" --include="*.ts"   # non-comment, non-barrel rows
demo/workbenches/extract/ExtractWorkbench.vue:159:  <ShadowPalette :count="session.colorCount.value" />
demo/workbenches/extract/ExtractWorkbench.vue:199:      ShadowPalette,
```

And the codebase has already *ruled* it extract-owned — `demo/shared/ui/EmptyState.vue:34-36`:

> *"The card-scale ShadowPalette no longer seats at empty hosts (**it is solely the Extract
> standing-instrument face**)"*

So the ruling and the physical home disagree. A component whose sole consumer is `workbenches/extract`
is exported as part of the *palette-browser*'s stable public API, which means (a) the palette-browser
seam advertises a symbol it does not use, and (b) any change to the extract instrument's ghost face
is a change to another feature's public contract.

Same shape, one rung weaker: `PaletteCardSkeleton` has two consumers (extract + `BrowsePane`), so it
is genuinely shared and correctly homed. `ShadowPalette` is not.

**Cure.** Move `ShadowPalette.vue` to `demo/workbenches/extract/`, drop it from
`demo/palettes/browser/card/index.ts:7` and `demo/palettes/browser/index.ts:24`. The seam shrinks by
one symbol and the instrument's face lives with the instrument.

---

## L-5 · MAJOR — the demo import-boundary law is **dead**: `no-restricted-imports` resolves to `null` for this file

`demo/palettes/browser/index.ts:11-12` claims the boundary this component's `../../palettes/browser/card`
reach depends on is enforced:

> *"External consumers reach the feature through THIS seam … never a raw internal `.vue` file — **the
> G-DEMO-3b boundary (eslint.config.js) enforces it standing.**"*

It does not. The three demo boundary rule objects in `eslint.config.js` (G-DEMO-3b at :232-255,
G-DEMO-1/3a at :274-…) are scoped to file globs `demo/color-picker/**`, `demo/@/components/**`,
`demo/@/lib/**`, `demo/@/composables/**`, and ban specifiers `@components/custom/palette-browser/**/*.vue`
and `**/color-picker/**`. The W43 (RF-15) restructure deleted that entire tree and every `@…` demo
alias (`vite.config.ts` says so in its own comment: *"W43 (RF-15) killed the demo `@…` path aliases"*).

Measured:

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ grep -rn "@components/" demo/ --include="*.vue" --include="*.ts" | wc -l
1                      # and that one hit is inside a comment (demo/palettes/browser/status/index.ts:5)

$ npx eslint --print-config demo/workbenches/extract/ExtractWorkbench.vue | jq '.rules["no-restricted-imports"]'
null                   # ← the rule is OFF for the subject component

$ npx eslint --print-config src/color/model.ts | jq '.rules["no-restricted-imports"]'
[2, {"patterns":[{"group":["@mkbabb/glass-ui","@mkbabb/glass-ui/*"], …inv-K-1…}]}]   # src/ IS guarded
```

So `inv-K-1` (library must not import glass-ui) is live and enforced; **every demo-side structural
boundary is unenforced**. Today `ExtractWorkbench.vue` could import
`../../palettes/browser/card/PaletteCard/PaletteCard.vue` raw, or `@src/color/model` (the `@src`
alias survives in `vite.config.ts` for the docs pages), and both lint clean. The boundary that keeps
this component honest is currently held up by nothing but convention and the reviewers' memory.

This is the single highest-leverage structural repair in the report: it is what stops every *other*
finding here from recurring.

**Cure.** Re-aim the three objects at the post-W43 physical tree and at *relative* patterns, since
there are no aliases left to match:

```js
{ files: ["demo/**/*.{ts,vue}"],
  rules: { "no-restricted-imports": ["error", { patterns: [
    { group: ["**/palettes/browser/**/*.vue"], message: "G-DEMO-3b: reach palette-browser through its barrel seam." },
    { group: ["@src/*", "**/src/**"],          message: "G-DEMO-2: the demo consumes value.js ONLY through @mkbabb/value.js/* subpaths." },
  ]}]}},
{ files: ["demo/color-session/**", "demo/platform/**", "demo/shared/**"],   // the clean lower layers
  rules: { "no-restricted-imports": ["error", { patterns: [
    { group: ["**/color-picker/**", "**/workbenches/**", "**/scenes/**", "**/shell/**"],
      message: "G-DEMO-1: the lower layers never reach UP into a feature or app boot." },
  ]}]}},
```

The `@src` ban needs a narrow allowance for `assets/docs/*.md` (the `?source` reference pages), which
is a `files:` exclusion, not a weakening of the rule.

---

## L-6 · MAJOR — the `layout="split"` axis is dead parameterization; it costs a live `matchMedia` subscription per mount

`ExtractWorkbench` takes `layout?: "column" | "split"` (line 205) and branches on it four times
(lines 5, 13, 18, 148). Its **sole** consumer passes `layout="column"` (`ExtractPane.vue:12`):

```
$ grep -rn 'layout="split"\|layout: *"split"' demo/
(no matches)

$ grep -rn "ExtractWorkbench" demo/ --include="*.vue" --include="*.ts"
demo/workbenches/extract/ExtractPane.vue:11:            <ExtractWorkbench
demo/workbenches/extract/ExtractPane.vue:25:import ExtractWorkbench from "./ExtractWorkbench.vue";
```

The `split` value is a fossil of the dead `ImagePaletteExtractor` dialog twin — the file's own header
records the merge (`useExtractSession.ts:4-6`: *"The former ExtractPane ↔ ImagePaletteExtractor twins…
**both shells** now consume this session"*). The second shell was deleted; its parameter was not.

The cost is not only dead branches. Line 226 subscribes to a media query whose result is consumed by
exactly one expression, line 148, whose other conjunct is a compile-time-false constant:

```ts
const { matches: isWide } = useBreakpoint("(min-width: 640px)");   // :226
…
:layout="layout === 'split' && isWide ? 'aside' : 'default'"       // :148 — 'split' never holds
```

glass-ui's `useBreakpoint` registers a real listener — `node_modules/@mkbabb/glass-ui/dist/dom.js`,
`src/composables/dom/useBreakpoint.ts` region:

```js
function i() { … n = window.matchMedia(e), t.value = n.matches, n.addEventListener("change", r) }
```

So every mount of this component adds a `matchMedia` change listener that can never affect a pixel.
Violates edict 2 (legacy dual path) and edict 3 (contrivance).

**Cure.** Delete the `layout` prop, all four branches, the `useBreakpoint` call, the `isWide` binding,
and the `@mkbabb/glass-ui/dom` import (line 188). `PaletteCard` gets `layout="default"` literally.
Net: −1 prop, −1 import, −1 subscription, ~−12 lines. If a split dialog is ever wanted again, it is a
*different component composed of the same parts*, not a mode flag on this one.

---

## L-7 · MAJOR — `DisplayColorSpace` has four homes; the canonical one is not among the three the extract tree uses

```
$ grep -rn 'SpaceId | "hex"\|PickerSpace | "hex"' demo/ src/
demo/color-session/color-model.ts:29:                              export type DisplayColorSpace = PickerSpace | "hex";   # CANONICAL
demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:21: export type DisplayColorSpace = SpaceId | "hex";
demo/workbenches/extract/ExtractWorkbench.vue:202:                     type DisplayColorSpace = SpaceId | "hex";
demo/workbenches/extract/ExtractPane.vue:30:                          type DisplayColorSpace = SpaceId | "hex";
```

`demo/color-session/color-model.ts` declares itself, in its own header (lines 1-6), *"the color-picker
DOMAIN model — the specimen/editing-target surface **shared by the picker, palettes, workbenches**,
shell and admin"*. Nine files across `color-session/`, `picker/` and `color-picker/boot` import
`DisplayColorSpace` from there. The three files in the extract tree re-declare it locally instead.

They are structurally identical only by accident — `demo/color-session/picker-color.ts:37` is
`export type PickerSpace = SpaceId;`, itself a bare alias (an edict-2 alias-of-an-alias). The moment
`PickerSpace` narrows to the *subset the picker actually renders* — which is the only reason for the
name to exist at all — the extract tree silently widens back to all 17 library spaces and nothing
catches it.

Nothing catches it *today either*, because the value crosses an untyped seam: `usePaneRouter.ts:139`
supplies it as `{ colorSpace: model.value.selectedColorSpace }` into `PaneSlot["props"]`, declared
`props: Record<string, unknown>` (`usePaneRouter.ts:64`) and spread with `v-bind="liveProps"`
(`demo/shell/PaneSlot.vue:124`). `vue-tsc` checks nothing across that boundary. The three local
re-declarations are decorative.

**Cure.** Delete all three; `import type { DisplayColorSpace } from "../../color-session/color-model"`.
Then narrow the pane-props seam so the type is load-bearing: make `PaneSlot` generic over its
component, or replace `Record<string, unknown>` with a discriminated `PaneProps` union keyed on the
pane name — the router already switches on that name at `usePaneRouter.ts:128-141`.

---

## L-8 · MAJOR — the published `./quantize` surface is wrong: `dominantColor` is a zero-consumer, wrong-shaped export, and the sort invariant it depends on is untyped

`src/subpaths/quantize.ts` publishes two symbols. One of them:

```ts
// src/quantize.ts:132-139
export function dominantColor(pixels, width, height): Result<QuantizedColor | null, QuantizeIssue> {
    const result = quantizePixels(pixels, width, height, { k: 5 });   // ← a SECOND full k-means pass
    return result.ok ? { ok: true, value: result.value[0] ?? null } : result;
}
```

Consumers, by enumeration:

```
$ grep -rn "dominantColor" --include="*.ts" --include="*.vue" . | grep -v node_modules | grep -v '^./docs'
demo/workbenches/extract/composables/useExtractSession.ts:10:  # a COMMENT explaining why it is not used
test/v4-quantize.test.ts:4,59,78                                # tests
test/v4-c1.test.ts:11,342,369                                   # the surface-census test
fixtures/public-types/value-v4.ts:226                           # the type fixture
src/quantize.ts:132 · src/subpaths/quantize.ts:2                # the definition + the export
```

**Zero production consumers.** The demo — the only application in the constellation — explicitly
refuses it, and says why (`useExtractSession.ts:8-10`): *"dominant = max-population with a chroma
tiebreak, derived from the RETURNED palette — never a second worker call; **the library's
`dominantColor()` re-quantizes and is the wrong tool**"*. That is a consumer telling the library its
public surface has the wrong shape, in a comment, instead of the library being fixed.

It is also a one-liner with a hardcoded `k: 5`. `quantizePixels(px, w, h, { k }).value[0]` is the same
answer at the caller's own `k`, without the second O(n·k·iters) pass.

**And the invariant it silently relies on is invisible to consumers.** `src/quantize.ts:128` sorts the
output descending by population:

```
$ grep -n "sort" src/quantize.ts
128:    output.sort((a, b) => b.population - a.population);
```

but the return type is a bare `readonly QuantizedColor[]` — nothing says "population-descending". So
the demo defensively re-derives the maximum by hand, `useExtractSession.ts:121-142`, 22 lines. Because
the array *is* already sorted, the `entry.source.population > best.source.population` branch can never
fire; the only live behaviour in those 22 lines is the chroma tiebreak on exact population ties. Two
codebases independently re-deriving one guarantee the type refuses to state.

**Cure — one transposition, three deletions.** Retire `dominantColor` from `src/quantize.ts` and from
`src/subpaths/quantize.ts` (a 4.0.0 → 5.0.0 surface change; the `test/v4-c1.test.ts:342` census row
updates with it). Replace it with the selector the consumer actually wants, taking the *palette*, not
pixels — and move the chroma tiebreak into the library where the color math already lives:

```ts
// src/quantize.ts — no re-quantization, no hidden k, total on the empty palette.
export function dominantOf(palette: readonly QuantizedColor[]): QuantizedColor | null;
```

and express the sort in the type so no consumer ever re-scans again — return a branded
`PopulationSorted<readonly QuantizedColor[]>`, or simply document it on `QuantizeOptions`' result and
add a `test/v4-quantize.test.ts` case asserting descending population. Then
`useExtractSession.ts:114-142` collapses from 29 lines to `const dominant = computed(() =>
presented.ok ? presented.value[0] ?? null : null)`.

---

## L-9 · MINOR — `tsconfig.demo.json#paths` is a third, drifted copy of the exports map, naming two subpaths that do not exist

`vite.config.ts:36-50` is exemplary: it *generates* the demo's value.js aliases from
`package.json#exports` so they "can never drift from the exports map". `tsconfig.demo.json` then
hand-maintains a second copy that already has:

| `tsconfig.demo.json#paths` | `package.json#exports` | on disk |
|---|---|---|
| `@mkbabb/value.js` → `./dist/index.d.ts` | **absent** (vite.config: *"there is no root or compatibility entry"*) | `ls: dist/index.d.ts: No such file or directory` |
| `@mkbabb/value.js/parsing` | **absent** | `ls: dist/subpaths/parsing.d.ts: No such file` |
| `@mkbabb/value.js/units` | **absent** | `ls: dist/subpaths/units.d.ts: No such file` |
| — | `./css` | **missing from paths** — yet `useExtractSession.ts:15` imports it |
| — | `./value` | **missing from paths** |

The extract subtree survives this only by luck: `paths` fails to match `@mkbabb/value.js/css`, TS falls
through to Node resolution, walks up to the repo's own `package.json`, and uses **package
self-reference**. Traced:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep -A 12 "Resolving module '@mkbabb/value.js/css' from '…/useExtractSession.ts'"
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
File '/Users/mkbabb/Programming/value.js/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' … ========
```

The *unmapped* imports get the correct, fresh, exports-map-mediated answer; the *mapped* ones bypass
the exports map entirely. The `paths` block is strictly worse than absent.

**Cure.** Delete the seven `@mkbabb/value.js*` entries from `tsconfig.demo.json#paths` outright. Node
self-reference through `package.json#exports` is already the resolution, it is the *same* mechanism a
real consumer uses, and it cannot drift. Keep only the `vue` / `@vue/*` dedupe entries.

---

## L-10 · MINOR — the repo installs a stale copy of itself; `dist/subpaths/css.d.ts` and the node_modules copy differ by 10 days

`vite.config.ts:24-26` asserts *"A package does not install itself"*. It does:

```
$ ls -la node_modules/@mkbabb/value.js/     # a real directory, not a symlink (readlink → empty)
$ node -p "require('./node_modules/@mkbabb/value.js/package.json').version"   → 4.0.0

$ for f in css color quantize value; do shasum dist/subpaths/$f.d.ts node_modules/@mkbabb/value.js/dist/subpaths/$f.d.ts; done
css      **DIFFERS**   (12490 bytes vs 10910 bytes)
color    SAME
quantize SAME
value    SAME

$ ls -l dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
-rw-r--r--  12490  Jul 27 11:52  dist/subpaths/css.d.ts
-rw-r--r--  10910  Jul 17 21:10  node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
```

A 1,580-byte, 10-day-stale duplicate of the library's own published types is sitting on the resolution
path. Today, vite wins via its generated alias and tsc wins via self-reference, so nothing reads it —
but `vitest.config.ts` declares **no** `@mkbabb/value.js` alias at all (only `@src`), so any demo test
that imports a value.js subpath is one resolver-behaviour change away from silently type- and
runtime-checking against July 17.

This is a latent dual path in the exact place the "demo dogfoods the published surface" proof lives.
Two live resolution surfaces for one specifier is one too many.

**Cure.** Remove `@mkbabb/value.js` from the install tree (it is not in `dependencies`; it is a
lockfile artifact) and add a repo-hygiene assertion beside the existing ones in `test/dist/` —
`expect(existsSync("node_modules/@mkbabb/value.js")).toBe(false)` — so it cannot come back.

---

## L-11 · MINOR — `.plate-ink` is copy-pasted into five scoped stylesheets

```
$ grep -rln "^\.plate-ink" demo/
demo/workbenches/extract/ExtractWorkbench.vue     :290
demo/workbenches/extract/ImageDropZone.vue        :109
demo/workbenches/extract/ExtractControls.vue      :148
demo/shared/ui/EmptyState.vue                     :102
demo/color-picker/ErrorBoundary.vue               :84
```

All five bodies are byte-identical: `.plate-ink { color: var(--ink-muted, var(--muted-foreground)); }`.
Three of the five are in this component's own subtree.

Scoped `<style>` forces the duplication (a scoped rule cannot be inherited), which is the tell: the
recipe is not a component style at all, it is a **token application**, and the demo already has the
right home for exactly this — `demo/styles/utils.css`, which holds `.fraunces`, `.fira-code`,
`.section-subtitle` for precisely this reason. Violates edict 5 (root-level styling, never
per-instance) and edict 1 (one home per concept).

**Cure.** One Tailwind-v4 `@utility ink-muted { color: var(--ink-muted, var(--muted-foreground)); }`
in `demo/styles/utils.css`; delete all five scoped blocks. `ExtractWorkbench.vue` loses its
`<style scoped>` element entirely (lines 284-293), which is the correct end state — this component has
no genuinely scoped style.

---

## L-12 · MINOR — the empty caption re-implements `EmptyState`, whose shed-affordance was built for this exact case

`ExtractWorkbench.vue:162-166` hand-rolls the empty-plate caption:

```html
<p class="text-mono-caption uppercase tracking-[0.18em] plate-ink text-center">
    · undeveloped plate — feed it an image ·
</p>
```

`demo/shared/ui/EmptyState.vue:55-57` is the same markup, class for class
(`text-mono-caption uppercase tracking-[0.18em] plate-ink`), driven by the `eyebrow` prop — and its
`dots` prop exists **specifically** to serve this component. From the prop's own doc,
`EmptyState.vue:83-88`:

> *"The dot-scale ghost trio … Shed (`false`) **ONLY where a card-scale instrument ghost seats beside
> this caption**"*

That is a description of `ExtractWorkbench.vue:158-167` — `ShadowPalette` (the card-scale instrument
ghost) seated beside this caption. The shared atom was given an affordance for this call site and the
call site did not take it. The `.plate-ink` copy in L-11 exists only to support the clone.

The screenshots show the consequence. In
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/extract.png`, the left (Extract)
and right (My Palettes) plates sit side by side in the same viewport: the right pane's true-empty
state reads as `· EMPTY PLATE ·` eyebrow → Fraunces display line → Fira hint (the atom, three
registers); the left pane's reads as a single mono caption under a gray block. Two empty-state
grammars, one screen.

**Cure.** `EmptyState` gains a caption-only shape — the display line is already slotted
(`EmptyState.vue:59`), so passing no `message` and no slot should render the eyebrow alone rather than
an empty `<p class="font-display text-heading">`; guard it `v-if`. Then:

```html
<EmptyState :dots="false" eyebrow="· undeveloped plate — feed it an image ·" />
```

The `role="status"` the atom carries is a free correctness win — the hand-rolled `<p>` has none, so
the state change is currently silent to AT.

---

## L-13 · MINOR — `PaletteCard` is a god component, and the workbench forges a persistence record to feed it

`demo/palettes/browser/card/PaletteCard/PaletteCard.vue` declares **11 props and 17 emits**
(`:182-218`). `ExtractWorkbench.vue:145-156` binds 4 props and 4 handlers, one of which is
`@click="() => {}"` — a no-op listener for an emit that requires no listener. Dead syntax.

More structurally: the card's contract is `palette: Palette`, the *persistence entity*
(`demo/palettes/types.ts`). Extract has no persisted palette, so `useExtractSession.ts:90-98` forges
one every recomputation:

```ts
return { id: "__extracted__", name: paletteName.value, slug: "extracted",
         colors, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
         isLocal: true };
```

A sentinel id, a fake slug, an `isLocal: true` lie, and two timestamps minted fresh on **every**
evaluation of the computed. Forging a persistence record to satisfy a *display* component is the
canonical symptom of a wrong module boundary: the card's contract should be the thing it draws.

**Cure.** Split the card at its real seam. `PaletteCard` keeps the entity contract (browse/palettes
panes, where a `Palette` genuinely exists) and composes an inner presentational
`PaletteSpecimen { colors: readonly PaletteColor[]; name?: string; swatchClass?: string }` — the
extract workbench and `MixSourceSelector` (the other cross-feature consumer,
`demo/workbenches/mix/MixSourceSelector.vue:264`) render the specimen. No sentinel ids, no forged
timestamps, and the 17-emit surface stops leaking into two workbenches that use four of them.

---

## L-14 · MINOR — the only defaulted `CSS_COLOR_KEY` inject in the codebase, with a `?? ''` mask

Nine files inject `CSS_COLOR_KEY`. Eight assert the provide:

```
demo/workbenches/gradient/GradientPane.vue:8   inject(CSS_COLOR_KEY)!
demo/workbenches/mix/MixPane.vue:15            inject(CSS_COLOR_KEY)!
demo/workbenches/generate/GeneratePane.vue:10  inject(CSS_COLOR_KEY)!
demo/palettes/BrowsePane.vue:201               inject(CSS_COLOR_KEY)!
demo/palettes/PalettesPane.vue:163             inject(CSS_COLOR_KEY)!
demo/palettes/admin/AdminPane.vue:94           inject(CSS_COLOR_KEY)!
demo/scenes/about/ColorNutritionLabel.vue:188  inject(CSS_COLOR_KEY)!
demo/shell/dock/Dock.vue:34                    inject(CSS_COLOR_KEY)!
demo/workbenches/extract/ExtractWorkbench.vue:218   inject(CSS_COLOR_KEY, undefined)   ← the one
```

and the workbench then masks the absence twice, `:69` and `:149`: `:css-color="cssColorOpaque ?? ''"`.
The empty string is not neutral — it flows into `ExtractControls.vue`'s `trackInk`
(`ExtractControls.vue`, `cssColor ? safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR) : "var(--ink-muted)"`),
so a missing provide silently drops the T-44a certified-contrast track ink to the degenerate fallback
instead of failing. A masking fallback that degrades a certified contract is exactly edict 2's target.

Note also the seam inconsistency: the three sibling workbenches inject `CSS_COLOR_KEY` at the **pane**
and prop it down; extract injects at the **leaf** while its pane injects `COLOR_TARGET_PORT_KEY`. Two
levels of the same two-file feature reach two different injection surfaces.

**Cure.** `inject(CSS_COLOR_KEY)!` at `ExtractPane.vue`, propped to the workbench, matching Mix /
Generate / Gradient exactly. Delete both `?? ''`.

---

## L-15 · INFO — two template-ref idioms on adjacent lines

```ts
// ExtractWorkbench.vue
222: const dropZoneRef = ref<InstanceType<typeof ImageDropZone> | null>(null);
223: const videoRef    = useTemplateRef<HTMLVideoElement>("videoRef");
```

Edict 7 names `useTemplateRef` as the Vue 3.5 idiom; line 222 is the pre-3.5 form, one line above the
correct one. Also `verbatimModuleSyntax` (edict 8) is clean throughout the subject file — `import type
{ SpaceId }` at :189 is correctly type-only; no violations found in the subtree.

`ImageDropZone` exposes an imperative `openFilePicker` (`ImageDropZone.vue`, `defineExpose`) that the
parent calls through the ref (`:230-232`). Under the L-2 cure the file-picker trigger becomes a prop
on the drop zone (`:trigger` / a `v-model:open`), and the ref disappears with it.

---

## The lattice, greenfield

If this were structured today with no legacy, the extract feature is **three modules, not one blob**,
and two of the three already have homes the repo established:

```
demo/platform/media/                    ← NEW sibling of auth/ storage/ transport/. Device access.
    useCameraCapture.ts                   open · close · captureFrame(video) → File   (L-2)
    imageToPixels.ts                      createImageBitmap + OffscreenCanvas         (from useImageQuantize)

demo/imaging/                           ← NEW clean lower layer. Pixel-domain, zero Vue-feature deps.
    quantize/
        worker.ts                         (moves verbatim — already correct, dogfoods @mkbabb/value.js/quantize)
        useImageQuantize.ts               ONLY quantizeFromPixels. camera + canvas variants DELETED (L-2)
    sample/
        useImageSampler.ts                (moves from ImageEyedropper/composables — pixel domain, not UI)
        useLoupeCanvas.ts
        useInertiaGesture.ts              → actually belongs in glass-ui/dom beside useDragVelocity (edict 4)

demo/workbenches/extract/               ← thin UI. No device APIs, no persistence, no forged entities.
    ExtractPane.vue                       injects CSS_COLOR_KEY + LIBRARY/COLOR_TARGET ports; props down
    ExtractWorkbench.vue                  ~180 lines after L-1/2/6/11/12/14. One layout. No <style>.
    ExtractControls.vue
    ImageDropZone.vue
    ShadowPalette.vue                     ← moved home from palettes/browser/card (L-4)
    ImageEyedropper/ImageEyedropper.vue
    composables/useExtractSession.ts       persistence INJECTED, not imported (L-3)
```

Four properties this lattice has that the current one does not:

1. **One home per concept.** Camera in one place, `DisplayColorSpace` in one place, `.plate-ink` in one
   place, `dominantOf` in one place, `ShadowPalette` in one place. Nine of the fifteen findings above
   are instances of a concept having two.
2. **Dependency direction is strictly downward.** `workbenches/extract → {imaging, platform,
   color-session, palettes(seam)} → @mkbabb/value.js/*`. Today `useExtractSession` reaches *sideways*
   into `palettes/usePaletteStore` (L-3) and `palettes/browser/card` reaches *sideways* back into
   extract's ownership (L-4).
3. **Resource lifetime is expressed once, at the seam that owns the policy** (`onPaneRelease`,
   §L-1) — not re-guessed by every leaf under a `<KeepAlive>` it cannot see.
4. **The boundaries are machine-enforced** (§L-5). Every finding here is a rule that could have failed
   in CI and did not, because the rules point at a directory tree that was deleted at W43.

Ordered by leverage: **L-5 first** (turn the law back on — it is what prevents regression of all the
rest), then **L-1 + L-2** (the confirmed leak and its structural cause), then **L-8** (the published
surface, which is the only finding that changes a *shipped* API and therefore wants a major-version
wave), then the rest, which are mechanical.

---

## Evidence appendix — commands run

```
wc -l demo/workbenches/extract/ExtractWorkbench.vue                      → 293
grep -rn "quantizeFromCamera\|quantizeFromCanvas" … | grep -v node_modules → 5 hits, all definitions
grep -rn "createPalette" demo/ --include=*.vue --include=*.ts            → extract = the only raw-store caller
grep -rn "\bShadowPalette\b" demo/                                        → 1 consumer, in another feature
grep -rn 'layout="split"' demo/                                           → 0
ls -d demo/@                                                              → No such file or directory
npx eslint --print-config demo/workbenches/extract/ExtractWorkbench.vue   → no-restricted-imports: null
npx eslint --print-config src/color/model.ts                              → no-restricted-imports: [2, inv-K-1]
npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep value.js/css → resolves via self-reference
ls dist/index.d.ts dist/subpaths/{parsing,units}.d.ts                      → all three: No such file
shasum dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts → DIFFER (12490 vs 10910)
grep -rln "^\.plate-ink" demo/                                            → 5 files, byte-identical bodies
grep -rn "onActivated\|onDeactivated" demo/                               → 2 hits, both HeroBlob.vue
grep -n "sort" src/quantize.ts                                            → :128 population-descending
grep -rn "dominantColor" … | grep -v node_modules                         → 0 production consumers
```

Live probes (Playwright/Chromium against `http://localhost:9000`, read-only except the camera click):

```
/#/extract  nameless buttons → 4: "Capture frame" · "Upload image" · "Open camera" · "Reset"
            (matches REPORT.json's namelessButtons: 3 on all four Safari matrices, camera closed)
camera lifecycle → open at #/extract: tracks ["live"]
                 → nav to #/palettes:  extractStillInDom false, tracks ["live"]   ← L-1 CONFIRMED
                 → back to #/extract:  viewfinderStillOpen true, tracks ["live"]
```

Visual audit rows for this component's route (`docs/tranches/V/megatranche/audit/visual/REPORT.json`,
`REPORT.md:122/137/152/167`): `/#/extract` is clean on overflow, page errors, console errors, blank
and `main`-count in all four matrices; it carries `namelessButtons: 3` in **all four** — the highest
of any route (every other route carries 0 or 1) — and 6 small tap targets, of which the two 12×24
slider thumb spans (`aria-label` "Number of colors" / "Chroma weight") are `ExtractControls.vue`'s.
Those two are design-axis findings and are recorded here only as corroboration that this subtree's
controls are the route's a11y hot spot; the structural half is that `DockControl` carries only
`title=` at all four extract call sites, and the accessible-name default belongs in glass-ui's
`DockControl` root (edict 4/5), not as four per-instance `aria-label` patches.
```
