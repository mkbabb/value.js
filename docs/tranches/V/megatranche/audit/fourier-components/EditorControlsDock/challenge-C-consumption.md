claude-opus-5[1m]

# CHALLENGE · `EditorControlsDock.vue` · axis C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EditorControlsDock.vue` (230 lines).
**Axis** how this component consumes value.js `0.13.0` (the F.W2 migration surface — bare specifiers, the hand-rolled `lib/colors.ts` arms), keyframes.js `4.3.0`, glass-ui `^4.0.0` (installed **4.0.0**), the local `@/components/ui/tooltip` adapter, and the 45-operation fourier API (operation↔client leaf coupling per **R6-8** where reachable); plus props/emits contract quality and integration seams.
**Mode** static + source-derived, read-only. No browser tooling. `fourier-analysis` and `glass-ui` were read as evidence only; the single write of this lane is this file. Two numeric receipts (§1 C-2) were produced by executing the **installed** `@mkbabb/value.js@0.13.0` dist in Node — library code, no browser, no product source touched.
**Substrate** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` / tree `9a66411d…` — the coordinate adjudicated TRUE at intake row **R4-9**. **`EditorControlsDock.vue` IS one of the 24 dirty in-scope working-tree paths** (`git status --porcelain` → ` M`), so every claim below is tagged **[WT]** or **[HEAD]** where the two differ. The WT delta is exactly two lines (§1 C-1) and is load-bearing.
**Producer pins** glass-ui installed `4.0.0`; producer working tree at `5f003a56` (= the 7.0.0 line, the F.W2 migration target).
**Posture** the component was assumed **DEFECTIVE** until the tree proved otherwise. Four hypotheses were **refuted by the tree** and are recorded at **§R** rather than published as findings — L-18 runs both ways.

**Imports read whole (the closure):**

| import | resolved to | read |
|---|---|---|
| `vue` (`computed`) | 3.5.x | — |
| `@mkbabb/glass-ui/slider` | `dist/components/ui/slider/{Slider.vue.d.ts,index.d.ts}` + compiled `dist/slider-DQ95MET2.js` props/setup + `dist/glass-ui.css` slider recipe | whole |
| `@mkbabb/glass-ui/hover-popover` | `dist/components/custom/hover-popover/HoverPopover.vue.d.ts` | whole |
| `@mkbabb/glass-ui/metric-badge` | `dist/components/custom/metric-badge/MetricBadge.vue.d.ts` | whole |
| `@mkbabb/glass-ui/dock` | `dist/components/custom/dock/{GlassDock.vue,DockIconButton.vue}.d.ts` + `composables/useDockShellProps.d.ts` | whole |
| `@/components/ui/tooltip` | `web/src/components/ui/tooltip/{Tooltip.vue,index.ts}` (38 + 1 LOC) | whole |
| `@/lib/colors` | `web/src/lib/colors.ts` (117 LOC) | **whole — this is the axis's epicentre** |
| `lucide-vue-next` ×12 icons | `lucide-vue-next@1.0.0` | targeted |
| CSS contract (implicit) | glass-ui `dist/styles/{index,tokens.css, theme/bridges.css, tokens/{color-radius,dark-arm,light-dark,property-regs}.css, dock-controls/{icon-button,touch-floor,triggers}.css}` + `dist/glass-ui.css` | targeted |
| consumer (the seam's other half) | `VisualizationView.vue:79-96,239-247`, `ContourEditorCanvas.vue:38,217-227`, `CanvasControlsDock.vue:1-40`, `stores/workspace.ts:263-283`, `lib/api.ts:35-110,215-225,316-324`, `src/style.css`, `App.vue:8-17` | targeted |
| API (the operation leaf) | `api/main.py:54-111`, `api/routers/contours.py:1-35`, `api/dependencies.py:207-209` | targeted |
| value.js (the migration surface) | installed `dist/{value.js,index.d.ts,parsing/color.d.ts,units/color/gamut.d.ts}` | targeted + **executed** |

**Corpus folded (not re-invented):** `formation/fourier/lane-frontend.md` §1/§3/§4/§5/§8/§9 · `CENSUS-2026-08-03.md` · `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-7a**, **R3-7b**, **R3-7c**, **R3-10**, **R4-9**, **R6-8**, **X-3** · the sibling lane `audit/fourier-components/CanvasControlsDock/challenge-C-consumption.md` (row C-1 folded at §1 C-3). Contradictions and extensions are stated in place and tabulated at **§7**.

---

## §0 — Tally

| severity | count | ids |
|---|---:|---|
| **BLOCKER** | **3** | C-1, C-2, C-3 |
| MAJOR | 8 | C-4 … C-11 |
| MINOR | 9 | C-12 … C-20 |
| INFO | 5 | C-21 … C-25 |
| **defects total** | **25** | |
| **superlatives** | **7** | S-1 … S-7 |
| refuted hypotheses (not published as findings) | 4 | §R |

**The one-sentence verdict.** Within 120 lines this component consumes the *same* design token — `--viz-fourier` — through **three** different mechanisms; two of them (the Tailwind bridge at `:106`, the native `var()` at `:205`/`:208`) are exactly right, and the third (the JS resolver at `:123`) delivers **`#888888` grey** into **four CSS custom properties that no version of glass-ui has ever read**. The component is not sloppy; it is a precise record of a migration that renamed an API and forgot the API's CSS-variable surface.

---

## §1 — BLOCKERS

### C-1 · BLOCKER · The entire per-instance slider retint is **dead**: `--slider-scrub-*` is not a token namespace at glass-ui 4.0.0 **or** 7.0.0

**Provenance.** `EditorControlsDock.vue:222-229`:
```css
/* A.W2.c — glass-scrubber per-instance retint hook + full-width sizing. */
.magnet-slider-track {
    width: 100%;
    --slider-scrub-range-bg: color-mix(in srgb, var(--track-color) 30%, transparent);
    --slider-scrub-range-bg-hover: color-mix(in srgb, var(--track-color) 45%, transparent);
    --slider-scrub-thumb-bg: var(--track-color);
    --slider-scrub-thumb-bg-hover: var(--track-color);
}
```
The complete `--slider-*` namespace at the **installed 4.0.0** (`grep -rhoE -- "--slider-[a-z0-9-]+" dist/ | sort -u`) is exactly ten names:
`--slider-range-bg` · `--slider-range-blur` · `--slider-range-shadow` · `--slider-thumb-bg` · `--slider-thumb-border-color` · `--slider-thumb-shadow` · `--slider-thumb-size` · `--slider-thumb-spring` · `--slider-track-bg` · `--slider-track-height`.
The compiled read sites in `dist/glass-ui.css` are `var(--slider-range-bg,var(--primary))`, `var(--slider-thumb-bg,transparent)`, `var(--slider-track-bg,…)`, … — **zero** occurrences of `scrub`, and **no `-hover` variant of any slider token exists**. The producer at `5f003a56` (7.0.0 line) adds `--slider-range-origin`, `--slider-thumb-border-w`, `--slider-thumb-hover-ring-{color,w}`, `--slider-vertical-size` and still has **no `--slider-scrub-*`**. All four declarations have zero readers in both the pinned and the target version.

**The mechanism — the WT diff is the smoking gun.** `git diff -- web/src/components/visualization/EditorControlsDock.vue` is **two lines**:
```
-<MetricBadge :amount="magnetRadius" size="sm" />      +<MetricBadge :value="magnetRadius" size="sm" />
-    variant="glass-scrubber"                          +    variant="standard"
```
The 3.1→4.0 bump renamed the **variant** and left its **companion token block** (`:222-229`) and its **comment** untouched. `lane-frontend.md §5` characterises that sweep as *"24 files, 46 insertions, 46 deletions — a pure rename sweep, no logic"*. That reading is correct about the *lines changed* and **misses the residue**: a rename sweep that renames the prop but not the prop's CSS-variable surface converts working code into silent dead code with a zero-line diff footprint. This file is the specimen.

**Failure.** The magnet slider — the component's only continuous control — paints in glass-ui's default register (`--slider-range-bg` falls back to `var(--primary)`), not in the viz-fourier brand tint the author wrote 8 lines of CSS to obtain. No error, no warning, no typecheck signal: unknown CSS custom properties are legal.

**Falsifier.** Produce any file in `@mkbabb/glass-ui@4.0.0` or in the producer tree at `5f003a56` containing the substring `slider-scrub`. `grep -rn "slider-scrub"` over both returns empty. Alternatively: show a browser that resolves an unread custom property onto a painted surface.

**Fix, and the trap.** Rename → `--slider-range-bg` / `--slider-track-bg`. **Do not fix this row alone** — see C-2.

---

### C-2 · BLOCKER · `VIZ_COLORS.fourier` at `:123` resolves to **`#888888`**, because the hand-rolled `lib/colors.ts` cannot parse the `oklch()` / `light-dark()` forms glass-ui 4.0.0 authors — while **value.js 0.13, already installed and already imported by this repo, parses both**

**Provenance — the consumption site.** `EditorControlsDock.vue:8` `import { VIZ_COLORS } from "@/lib/colors";` → `:123` `:style="{ '--track-color': VIZ_COLORS.fourier }"`.

**Provenance — the resolver.** `web/src/lib/colors.ts:22-54` `cssVarToHex()` has exactly four branches: `startsWith("#")` (`:29`), `hsl(…)` (`:32-34`), a bare Tailwind HSL triplet `^h s% l%$` (`:40`), `rgb(…)` (`:46-48`). Anything else falls through to `:53` `return "#888888";`.

**Provenance — the token's authored value.** glass-ui **4.0.0** declares `--viz-fourier` at three sites, in cascade order:
- `dist/styles/tokens/color-radius.css:263` → `oklch(0.579 0.201 30.4)`
- `dist/styles/tokens/light-dark.css:145` → `light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))` *(imported after color-radius — `tokens.css:27` then `:32` — so this wins on `:root`)*
- `dist/styles/tokens/dark-arm.css:113` → `oklch(0.693 0.151 28.1)` *(`.dark` arm)*

`--viz-fourier` is **not** Houdini-registered: `dist/styles/tokens/property-regs.css` registers only `--progress-crescendo`, `--phase-tint-amount`, `--specular-x/-y`, and the ripple/glass-level/ui-scale cohort. An **unregistered** custom property's computed value is its token stream with `var()`/`env()` substituted — `light-dark()` is a *used-value* color function and is **not** substituted. So `getComputedStyle(document.documentElement).getPropertyValue("--viz-fourier")` (`colors.ts:23-25`) returns a string beginning `light-dark(` or `oklch(` — **neither matches any of the four branches** → `#888888`.

**The runtime sequence.** Module init seeds `VIZ_COLORS.fourier = "#bf4040"` (`colors.ts:78`). `App.vue:11` calls `resolveVizColors()` on mount, and `App.vue:13` re-calls it on every `.dark` flip via `MutationObserver`. Each call **replaces a stale-but-red literal with grey**. This is a regression-on-mount, not a cold-start gap.

**Receipts — computed with value.js itself.** Executing the installed `@mkbabb/value.js@0.13.0` dist (`rawOklchToOklab(L,C,H)` → `oklabToRgb255(L,a,b)`, signatures from `dist/units/color/gamut.d.ts:64,66`):

| token | authored (glass-ui 4.0.0) | true sRGB | `colors.ts` seed | **delivered after `resolveVizColors()`** |
|---|---|---|---|---|
| `--viz-fourier` light | `oklch(0.579 0.201 30.4)` | **`#d73523`** | `#bf4040` | **`#888888`** |
| `--viz-fourier` dark | `oklch(0.693 0.151 28.1)` | **`#eb7366`** | — | **`#888888`** |

**value.js 0.13 already does this — proven by execution.** `parseCSSColor("oklch(0.579 0.201 30.4)")` returns `{colorSpace:"oklch", alpha:1, whitePoint:"D65", l:0.579, c:0.201, h:30.4}`, and — decisively — `parseCSSColor("light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))")` returns `{name:"light-dark", values:[{colorSpace:"oklch",…},{colorSpace:"oklch",…}]}`, i.e. **it structurally understands the exact two-arm form the hand-rolled resolver cannot conceive of** — the same two-arm form whose absence is *why* `App.vue:13` needs a `MutationObserver` at all. value.js is `web/package.json`-pinned at `^0.13.0`, installed, and already imported at five sites (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`) — **for easing functions only**. The color engine in the same bundle is untouched.

**Failure.** Any consumer of `VIZ_COLORS.fourier` gets grey. Within this file the consequence is currently *masked* by C-1 (the grey is written into `--track-color`, which is read only by the four dead declarations at `:225-228`). **That masking is the trap:** whoever fixes C-1 alone — a one-line rename, the obvious fix — ships a **grey** magnet slider and will conclude the rename did nothing. **C-1 and C-2 must be discharged in the same commit.**

**Scope note (honest).** The defect lives in `lib/colors.ts`, which has **14 consuming files** and resolves five tokens; `--viz-amber` survives only because fourier's own `style.css:120` overrides it back to `hsl(35 76% 35%)` for a WCAG reason (`style.css:113-118`). This row claims only the `EditorControlsDock.vue:123` instance; the repo-wide blast radius is a **CARRY → F.W2**.

**Falsifier.** (a) Show a `#`/`hsl(`/`h s% l%`/`rgb(` authored value for `--viz-fourier` anywhere in the resolved cascade — `grep -rn -- "--viz-fourier:" web/src/ web/node_modules/@mkbabb/glass-ui/dist/` returns only the three `oklch`/`light-dark` rows above, and `web/src` declares it **nowhere**. (b) Show an `@property` registration typing it as `<color>` — `property-regs.css` has none. (c) **UNPROVEN-NEEDS-LIVE (SS-13):** the *exact* serialization returned by `getPropertyValue` in a given engine. The claim survives either candidate string (`light-dark(…)` or `oklch(…)`); it would be falsified only by an engine that legacy-serializes an *unregistered* custom property into `rgb(…)`, which no engine does.

---

### C-3 · BLOCKER · **10 of 12** `DockIconButton`s have no accessible name; the tooltip supplies a *description*, never a name  `[folded from CanvasControlsDock/challenge-C-consumption.md C-1; extended]`

**Folded, not re-derived.** The sibling lane established the mechanism against the same adapter and the same producer: `@/components/ui/tooltip/Tooltip.vue:26-38` renders `TooltipTrigger as-child` + `TooltipContent`; reka-ui supplies **only** `aria-describedby`, and only while open; `aria-describedby` never satisfies the accessible-name computation. That analysis stands and is not repeated.

**This file's census (new).** `grep -c '<DockIconButton'` → **12** (`:63, :74, :79, :87, :92, :97, :105, :136, :143, :148, :157, :166`). `grep -n aria-label` → **3**, of which two are on `DockIconButton` (`:105`, `:136`) and one on the `Slider` (`:121`). `grep -c '<Tooltip'` → **10** — confirming **R3-7a** live (*"EditorControlsDock 10"*, the largest of the nine named consumers).

**The file-specific proof of the mechanism.** The two `aria-label`ed buttons are exactly the two **without** a Tooltip (the popover triggers at `:105`, `:136`); the ten Tooltip-wrapped buttons are exactly the ten **without** an `aria-label`. The mapping is 1:1 and total. The author's rule was *"tooltip **or** aria-label"* — and that rule is the defect, stated with perfect consistency across twelve controls. Ten unnamed controls include **both** Save buttons (`:63`, `:166`), i.e. the only action in the component that persists anything.

**Falsifier.** Show `aria-label`, `aria-labelledby`, `title`, or non-empty text content on any of `:63, :74, :79, :87, :92, :97, :143, :148, :157, :166`. Each renders exactly one lucide glyph child (`Check`/`Save`/`Undo2`/`Redo2`/`Wand2`/`Minimize2`/`Trash2`/`Eye`/`EyeOff`/`Image`/`RotateCcw`), and `lucide-vue-next@1.0.0`'s `Icon.js:41` stamps `aria-hidden="true"` when no a11y prop and no default slot are present — so the glyph contributes no name either.

---

## §2 — MAJOR

### C-4 · MAJOR · The `save` emit has **no result channel**, and the parent's handler has no `catch` over a store function that re-throws → a reachable unhandled rejection

`EditorControlsDock.vue:45` declares `save: []` — a void, fire-and-forget signal. `VisualizationView.vue:92-96`:
```ts
async function onEditorSave() {
    if (!editorRef.value) return;
    await store.saveContourPoints(editorRef.value.getPoints());
    editorSaved.value = true;
}
```
No `try`/`catch`. `stores/workspace.ts:276-279` sets `error.value` **and then `throw e`**. The re-throw escapes an `async` DOM event handler → unhandled promise rejection.

The dock's only feedback surface is `isSaved: boolean` (`:32`) driving `Check` vs `Save` (`:64-65`, `:167-168`) — a **two-state** model for a **four-state** reality (idle / in-flight / saved / failed). On failure the icon simply stays `Save`, which is indistinguishable from "never clicked".

**Falsifier.** Show a `catch` on the `await` at `VisualizationView.vue:94`, or a `saved`/`error` payload on the emit signature at `:45`. Neither exists.

**Same-repo proof this is a gap, not a style.** The sibling dock `CanvasControlsDock.vue:17` declares `publishing: boolean` — an explicit in-flight prop for *its* API action, written by the same hand in the same wave, 100 lines away.

---

### C-5 · MAJOR · Neither Save button is in-flight-guarded, and the client's own abort registry turns a double-click into a **silent** unhandled rejection

`lib/api.ts:54-58` — `abortable(key)` **aborts any in-flight request for the same key** before issuing a new one. `saveContour` (`api.ts:320`) passes the key `"saveContour"`. So a second click on `:63` or `:166` aborts the first request. The first promise then rejects with an `AbortError`, and `workspace.ts:277-279` suppresses the *message* (`if (!api.isAbortError(e)) error.value = …`) **but still `throw e`** — so the first click produces an unhandled rejection with **no user-visible signal at all**, not even `store.error`.

Both buttons are unconditionally enabled: neither `:63` nor `:166` carries `:disabled`, though three sibling buttons do (`:74`, `:79`, `:97`), proving the pattern was available and consciously not applied here. `store.computing` exists (`workspace.ts:265,281` `beginCompute`/`endCompute`) and is not consumed by this dock.

**Falsifier.** Show a `:disabled` binding, a `saving` prop, or a guard in `onEditorSave` preventing re-entry.

---

### C-6 · MAJOR · The dock's **only** API seam is an **unauthenticated write** — the client attaches `X-Session-Token`, the operation never reads it  `[instantiates R3-7b]`

The seam: `:45 save` → `VisualizationView.vue:247 @save="onEditorSave"` → `workspace.ts:271 api.saveContour(...)` → `api.ts:316-324` → `apiFetch("/api/contours", "saveContour", {method:"POST", …})` → `api.ts:220-223`, which hard-codes **`auth: "session"`** on every `apiFetch` call → the request carries `X-Session-Token`.

The operation: `api/routers/contours.py:21-26`
```python
@router.post("")
async def save_contour(req: SaveContourRequest):
```
No `Depends`, no `Header`, no `Request`. The router is `APIRouter(prefix="/api/contours", tags=["contours"])` with **no `dependencies=`** (`contours.py:18`), and `api/main.py:106` `app.include_router(contours.router)` adds none. The only middlewares are `CORSMiddleware` and `RateLimitHeaderMiddleware` (`main.py:56-67`). The session resolver exists (`api/dependencies.py:207-209`, `request.headers.get("X-Session-Token")`) and `contours.py:7` imports **only** `get_contour` from that module.

This is **R3-7b** (`OpenAPI security 0 of 45`, `securityGate: RED_0_OF_45`) made concrete, and it **sharpens** it: at this operation the gate is not merely a *documentation* gap — the endpoint genuinely enforces nothing while its sole client unconditionally authenticates. Under **X-3**'s resolved denominator (45 total / 30 public-non-admin / 13 admin), `POST /api/contours` sits in the 30-operation public arm.

**Honest counter-reading.** `store_contour_asset(xs, ys, req.image_slug, source="editor")` is content-addressed, so an anonymous write may be deliberate (a shared compute cache). The defect claimed here is the **asymmetry**, not a proven exploit: the client pays for auth the operation does not model, so no conformance fixture can specify parity across this seam. **CARRY → F.W5.**

**Falsifier.** Show a `Depends`, a router-level `dependencies=[…]`, or an ASGI middleware that rejects `POST /api/contours` without a session token.

---

### C-7 · MAJOR · `saveContour` skips the `Idempotency-Key` channel its own client core declares — on the one non-idempotent operation this dock can double-fire

`lib/api.ts:100` documents `idempotencyKey?: string | null;` — *"honoured by the API for POST + PUT"*. `saveContour` (`api.ts:316-324`) is a `POST` and passes none. Combined with C-5 (two unguarded Save buttons, client-side abort only — the server may already have committed the aborted request), the single operation in this component's reach that most needs the channel is the one that declines it.

**Falsifier.** Show an `idempotencyKey` on the `saveContour` call, or show that `POST /api/contours` is server-side idempotent under concurrent identical bodies (`store_contour_asset` is content-addressed, which makes it *probably* so — hence MAJOR, not BLOCKER; the claim is that the declared channel is unused, which is textually certain).

---

### C-8 · MAJOR · The magnet domain `[0, 10]` is declared **three times independently**, in three files, with no shared constant

1. `ContourEditorCanvas.vue:38` — `const magnetRadius = ref(3); // 0 = off, 1-10 = number of adjacent points affected; default on`
2. `EditorControlsDock.vue:118-119` — `:min="0" :max="10"`
3. `EditorControlsDock.vue:51` — `Math.max(0, Math.min(10, arr[0] ?? 0))`

Three sources of truth for one domain, across a component boundary. `usePointDrag.ts:34` (`const radius = magnetRadius.value;`) consumes it as an unvalidated number. Widening the range requires three coordinated edits with no compiler or test to catch a miss (`lane-frontend.md §9 row 11`: **vitest is ABSENT**; the only frontend gate is `vue-tsc -b` + 8 Playwright specs).

**Falsifier.** Show a shared exported constant or type consumed by all three sites.

---

### C-9 · MAJOR · The `update:magnetRadius` round-trip can **silently no-op and snap the slider to 0** mid-drag

`VisualizationView.vue:82-85`:
```ts
const magnetRadius = computed({
    get: () => editorRef.value?.magnetRadius ?? 0,
    set: (v: number) => { if (editorRef.value) editorRef.value.magnetRadius = v; },
});
```
The setter is guarded and **silent** when `editorRef` is null; the getter falls back to `0`. `Slider` is a controlled component (`v-model="magnetModel"`, `:49-52`), so a rejected write re-renders the slider at the getter's value — **0**, i.e. magnet *off*, not the previous value. The value crosses four hops (`ContourEditorCanvas.magnetRadius` → parent computed → prop → `magnetModel` array → `Slider`) with a clamp injected at hop three (`:51`) and a null-guard at hop two, and there is no error path on either.

`ContourEditorCanvas.vue:217-227` `defineExpose` publishes `magnetRadius` as a raw `ref`, so the component boundary is crossed by **imperative ref reach-in** for the value and by **typed emit** for the mutation — two directions, two mechanisms, one datum.

**Falsifier.** Show an `else` branch, an emitted rejection, or a non-zero getter fallback preserving the prior value.

---

### C-10 · MAJOR · `showGhost?: boolean` is **optional here and required in the sibling dock**, for the same parent flag

`EditorControlsDock.vue:30` `showGhost?: boolean;` — the only optional member of an 8-prop interface whose other seven are required (`:25-32`). `CanvasControlsDock.vue:14` declares the identical flag as `showGhost: boolean;` — required. Both are bound by the same parent from the same source (`VisualizationView.vue:38` `useViewState()`; passed at `:215` and `:241`).

The optionality is not defensive: with no `withDefaults`, `undefined` flows into `:143` `:class="{ 'is-active': showGhost }"` (falsy → no state class) and `:144` `<component :is="showGhost ? Eye : EyeOff">` (→ `EyeOff`). An omitted prop renders **identically to `false`**, so the optional arm is unreachable-by-design *and* untyped-as-such. Two sibling docks, one parent, one flag, two contracts.

**Falsifier.** Show a call site that omits `:show-ghost`, or a `withDefaults` supplying a value. `grep -rn "EditorControlsDock" web/src/` yields exactly one instantiation (`VisualizationView.vue:239`), and it passes the prop.

---

### C-11 · MAJOR · Emit-name divergence: `toggleOverlay` here vs `toggleImageOverlay` in the sibling dock, for the identical parent action

`EditorControlsDock.vue:41` `toggleOverlay: [];` → `VisualizationView.vue:245` `@toggle-overlay="showImageOverlay = !showImageOverlay"`.
`CanvasControlsDock.vue:24` `toggleImageOverlay: [];` → `VisualizationView.vue:223` `@toggle-image-overlay="showImageOverlay = !showImageOverlay"`.

Byte-identical handlers, same parent, same wave, two names. Note that the *prop* is named consistently (`showImageOverlay` in both) — only the emit drifted, so the pair is internally inconsistent within this very file (`:29 showImageOverlay` ↔ `:41 toggleOverlay`). The neighbouring pair is consistent (`:30 showGhost` ↔ `:42 toggleGhost`), which is what makes the drift a defect rather than a convention.

**Falsifier.** Show a semantic difference between the two emitted actions. Both parent handlers are the same expression.

---

## §3 — MINOR

### C-12 · MINOR · `.is-active` is a class-only state hook; the producer's `[aria-pressed="true"]` arm is left unconsumed

`:143` and `:148` toggle `{ 'is-active': showGhost }` / `{ 'is-active': showImageOverlay }`. glass-ui 4.0.0's own selector set treats three hooks as equivalent — `dist/styles/dock-controls/icon-button.css:109` `&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` and `touch-floor.css:64` `.dock-icon-button:is(.is-active, [aria-current="page"], [aria-pressed="true"])`. The component picks the one arm that is invisible to assistive technology, for two controls that are genuinely toggles. `:aria-pressed="showGhost"` would light the same paint **and** announce the state.

**Falsifier.** Show `aria-pressed` on `:143`/`:148`, or show that `.is-active` carries an implicit accessible state.

### C-13 · MINOR · Two of C-1's four dead declarations are **doubly** dead: `variant="standard"` paints the thumb invisible by contract

`dist/components/ui/slider/index.d.ts:13-25` specifies `standard` as *"the CONTINUOUS GLASS CYLINDER with **NO VISIBLE THUMB AT ALL** … the reka `<SliderThumb>` STAYS MOUNTED … but paints **INVISIBLE: width 0, opacity 0, transparent**"*. `:227-228` set thumb colours. Renaming them to `--slider-thumb-bg` (C-1's fix) would still paint nothing under this variant. Only the two *range* declarations have a live target (`--slider-range-bg`, default `var(--primary)`).

### C-14 · MINOR · `variant="standard"` (`:117`) restates the component's own default — a no-op prop

`dist/slider-DQ95MET2.js` setup: `D = a(() => C.variant ?? "standard")`. The prop is inert. (It is not *wrong* — it is the correct post-4.0.0 name, per S-6 — but as written it is a rename artefact carried at full width rather than deleted.)

### C-15 · MINOR · The producer ships a variant purpose-built for exactly this need — `spectrum`, *"the value.js gradient-track color slider"* — and it is unconsumed

`index.d.ts:26-34`: *"spectrum — the value.js gradient-track color slider: a tall capsule whose background is a **consumer-supplied `--slider-track-bg`** linear-gradient … a THIN VISIBLE squircle thumb … (the iOS/value.js color-picker idiom)"*. glass-ui names **value.js** in the recipe. This component wants a consumer-supplied colour on the track and a visible tinted handle — the spectrum contract verbatim — and instead uses `standard` plus a token namespace that does not exist. `grep -rn 'variant="spectrum"' web/src/` → **0** across all 66 SFCs.

### C-16 · MINOR · `@mousedown.stop @pointerdown.stop` (`:124-125`) is redundant against **two** producer contracts

(a) `HoverPopover keep-dock-open` is already set on the enclosing popover (`:103`), and `HoverPopover.vue.d.ts` documents it as the J.W3.B dock-keep sink: *"the dock's collapse timer is suppressed via the parent-provided `dockKeepOpen`/`dockRelease` callbacks … ref-counted so multiple keep-open holds compose cleanly."* (b) `Slider` itself declares `keepDockOpen?: boolean` **defaulting to `true`** (`Slider.vue.d.ts:9-16`; compiled `keepDockOpen: { type: Boolean, default: !0 }`) — *"Acquire a `dockKeepOpen` token while the user drags the slider, so an enclosing dock doesn't auto-collapse mid-gesture."* The hand-rolled `.stop` pair is a third mechanism over two already-active ones, and it is the only one that can interfere with ancestor pointer handling.

### C-17 · MINOR · `import { Image }` (`:15`) shadows the global `Image` constructor; the sibling dock avoids it

`CanvasControlsDock.vue:4` imports `ImageIcon` from the same package for the same glyph family. Two files, same directory, same wave, divergent handling of a known global-shadow footgun. No live consequence in *this* file (no `new Image()` here) — but the divergence is the finding.

### C-18 · MINOR · `MetricBadge` (`:113`) leaves `color` and `unit` unconsumed while the component hand-rolls tinting beside it

`MetricBadge.vue.d.ts` declares `color?: string` (*"Color applied to the value when it's non-empty"*) and `unit?: string`. `:113` passes only `:value` + `size`. The result: an untinted, unitless badge sits 10 lines above 8 lines of bespoke CSS attempting to tint the adjacent slider (C-1). The producer's one-prop path to the same effect is not taken.

### C-19 · MINOR · `:disabled` is **not** a declared `DockIconButton` prop — it works only by untyped attribute fallthrough

`DockIconButton.vue.d.ts` declares exactly `compact`, `type`, `as`, `asChild`, `class`. `:74`, `:79`, `:97` bind `:disabled`. It functions — the default host is `<button>` and reka's `Primitive` spreads `$attrs`; glass-ui guards `&:hover:not(:disabled)` / `&:active:not(:disabled)` (`icon-button.css:80,93`) — but it is invisible to `vue-tsc`, and it breaks silently the moment any consumer sets `as="a"` or `as-child`. See **§R R-2**: this was initially hypothesised as inert and refuted.

### C-20 · MINOR · The `Slider`'s `valueCommit` emit is unconsumed here while two sibling sliders consume it

`Slider.vue.d.ts` emits `"update:modelValue"` **and** `valueCommit`. This component binds only `v-model`, so every drag frame round-trips through the four-hop chain of C-9 and writes into `ContourEditorCanvas`'s ref. Two other fourier sliders take the commit channel: `GlassTimeline.vue:74` `@value-commit="onValueCommit"` and `ConvergenceTimeline.vue:81`. Cheap here (11 discrete integer values), so MINOR — but the producer's drag-end channel is available and the in-repo idiom exists.

---

## §4 — INFO

### C-21 · INFO · Three accent classes, three naming conventions, three adjacent lines

`:199` `.is-amber → var(--viz-amber)` (name matches token) · `:200` `.is-sky → var(--viz-chebyshev)` (name encodes a hue, value encodes a **basis**) · `:201` `.is-rose → var(--accent-pink)` (name and token disagree on the hue word). All three tokens exist at 4.0.0 (`color-radius.css:256,263`; `--viz-amber` is locally overridden at `style.css:120`) so nothing breaks — but a reader cannot infer the token from the class in two of three cases.

### C-22 · INFO · Two stale references to a variant retired at 4.0.0

`:48` *"adapt the scalar `magnetRadius` to **glass-scrubber**'s array model"* and `:222` *"**glass-scrubber** per-instance retint hook"*. `lane-frontend.md §3` counts these among *"all 11 `glass-scrubber` … prose comments only"* — accurate **[WT]**, and see §7 for the [HEAD] correction and why the "comments only" framing let C-1 pass.

### C-23 · INFO · `@reference "tailwindcss"` (`:176`) rather than the project entry

Tailwind v4's `@reference` should target the stylesheet that carries the project's `@theme`. Pointing at bare `tailwindcss` makes glass-ui's `@theme inline` bridge (`bridges.css:12,189`) and fourier's own `--font-sans` (`style.css:13-15`) **invisible to `@apply` inside this scoped block**. No live consequence today — the block applies only `text-base` (`:191`), a core utility — but any future `@apply text-viz-fourier`/`font-sans` here would silently fail while the identical class works in the template (S-1).

### C-24 · INFO · The collapsed and expanded arms duplicate the Save control and the point badge verbatim, at two icon sizes

`:62-67` ≡ `:165-170` (Save, `:size="18"` vs `20`, `@click.stop` vs `@click`); `:63` ≡ `:163` (`.dock-badge` + `{{ pointCount }} pts`). Two literal copies of the file's most important control, kept in sync by hand.

### C-25 · INFO · `arr[0] ?? 0` (`:51`) silently coerces a malformed emit to *magnet off*

reka's `SliderRoot` emits `number[] | undefined`; the fallback maps an empty/absent payload to `0` (magnet disabled) rather than preserving `props.magnetRadius`. Defensive, but it chooses the destructive default.

---

## §5 — SUPERLATIVES  *(L-18 runs both ways)*

### S-1 · The `text-viz-fourier` binding at `:106` is **exactly right** — and it is the only `text-viz-*` consumption in the entire 66-SFC tree

`:106` `<Magnet :size="20" :class="magnetRadius > 0 ? 'text-viz-fourier' : ''" />`. The utility is real: glass-ui `dist/styles/theme/bridges.css:12` opens `@theme inline` and `:189` declares `--color-viz-fourier: var(--viz-fourier)`, reached from the consumer via `style.css:3 → index.css:151 → theme.css:31`. Tailwind v4 generates `text-viz-fourier` from that namespace. `grep -rn "text-viz-\|bg-viz-\|border-viz-" web/src/` returns **one** hit — this line. It is the single site in the repository that takes the producer's Tailwind colour bridge instead of a hand-rolled resolver, and it is therefore the **only** consumption of `--viz-fourier` in this file that delivers the true `#d73523` (see §R R-1 — I expected this to be a phantom class and the tree refuted me).

### S-2 · `--btn-hover-color` (`:199-206`) is genuine public-token theming — no `!important`, no descendant reach-in, no `:deep()`

`dist/styles/dock-controls/icon-button.css:85` and `triggers.css:69` both read `var(--btn-hover-color, var(--foreground))`. The component sets it on its own class and lets inheritance do the work — the textbook way to retint a producer control. `grep -c "!important\|:deep(" EditorControlsDock.vue` → **0**. This is the *correct* version of the mechanism C-1 got wrong, sitting 25 lines above it.

### S-3 · Both `HoverPopover`s consume the documented dock-keep contract exactly

`:103` and `:134` carry `keep-dock-open`, the J.W3.B `dockKeepOpen`/`dockRelease` sink documented at `HoverPopover.vue.d.ts` — *"No-op outside a dock context — the inject fallbacks are `null`, so non-dock consumers pay nothing."* Both are inside a `GlassDock`. Correct prop, correct context, and `side`/`align` are both valid members of the declared unions.

### S-4 · The `#collapsed` slot is used for a real affordance decision, not scaffolding

`:58-69` fills the declared `collapsed` slot (`GlassDock.vue.d.ts` `__VLS_Slots.collapsed`) with a summary that **re-exposes Save** — so the one action that persists work is reachable without expanding a dock that auto-collapses after 2 s (`:56 :collapse-delay="2000" :start-collapsed="true"`). The `@click.stop` at `:63` (absent at `:166`) correctly prevents the collapsed-state click from being consumed as an expand gesture. That is a considered interaction, correctly expressed through the producer's slot API.

### S-5 · The props/emits contract is fully type-only and has **zero dead members**

`:24-33` / `:35-46` are `defineProps<{…}>` / `defineEmits<{…}>` generics with tuple payloads — no runtime validators, no `PropType` casts, `verbatimModuleSyntax`-clean. All **8** props are bound and all **10** emits are wired at the single call site (`VisualizationView.vue:239-247`), verified member-by-member. For a 230-line, 12-control dock that is an unusually tight surface.

### S-6 · The `amount → value` rename landed correctly here

`:113` `<MetricBadge :value="magnetRadius" size="sm" />` matches `MetricBadgeProps.value` at 4.0.0. The WT diff shows the rename applied. Contrast C-1: on the **same two-line diff**, one of the two renames was completed and one was left half-done — which is precisely why the F.W2 4→7 budget must treat rename sweeps as incomplete until their CSS-variable surface is swept too.

### S-7 · Exactly **one** of ten emits crosses the API seam — the right shape under **R6-8**

`grep -c "@mkbabb/keyframes\|lib/api\|stores/" EditorControlsDock.vue` → **0**. No store import, no API import, no `reka-ui` import, no keyframes.js import. Nine emits are pure local-state signals; only `save` reaches an operation, and it reaches it through the parent. R6-8's lesson — *"an API-operation record that embeds derived client back-references cannot attribute a defect to one side of the seam"* — is satisfied here by construction: this component holds **no** client↔operation join at all, so a defect on either side is attributable without ambiguity. Note also that the component is entirely uninvolved in the tri-package deadlock's keyframes leg (`lane-frontend.md §5`): its motion is 100% producer- and CSS-owned.

---

## §R — Hypotheses **refuted by the tree** (not published as findings)

**R-1 · `text-viz-fourier` (`:106`) is a phantom Tailwind class.** Motivated: `style.css:13-15` declares only `--font-sans` in `@theme`, and `web/src` declares no `--viz-*` at all except the `--viz-amber` override. **REFUTED** — glass-ui `bridges.css:12` opens `@theme inline` and `:189` supplies `--color-viz-fourier`, imported transitively from `style.css:3`. Promoted to **S-1**.

**R-2 · `:disabled` on `DockIconButton` is inert** (it is not a declared prop). **REFUTED** — the default host is `<button>`, reka's `Primitive` spreads `$attrs`, and `icon-button.css:80,93` explicitly guards `:not(:disabled)`. Downgraded to **C-19** (typing gap only).

**R-3 · `MetricBadge` still binds the pre-4.0.0 `amount` prop.** **REFUTED** by `git diff` — already renamed in the working tree. Promoted to **S-6**.

**R-4 · Setting slider tokens via the `class` prop cannot reach the Slider's scoped-CSS internals** (`[data-v-534634a7]`). **REFUTED** — custom properties inherit through Vue's scope boundary; scoping constrains selector matching, not variable inheritance, and `dist/glass-ui.css` reads `var(--slider-range-bg, var(--primary))` on descendants of the element the `class` lands on. This matters: it means **C-1 is a four-token rename, not an architecture problem** — the mechanism the author reached for is sound and only its vocabulary is stale.

---

## §6 — value.js consumption: the F.W2 surface as this component sees it

| axis | today | evidence |
|---|---|---|
| direct value.js imports in this file | **0** | `grep -c "value.js" EditorControlsDock.vue` → 0 |
| indirect value.js need | **1 — the colour resolve at `:123`** | C-2 |
| repo-wide value.js consumption | **5 sites, easings only** (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`) | `lane-frontend.md §9 row 5` — *"the cheapest leg of the deadlock"* |
| the colour engine, unconsumed | `parseCSSColor`, `Color`, `OKLCHColor`, `convert2`, `color2`, `rawOklchToOklab`, `oklabToRgb255`, `gamutMapSRGB`, `mixColors`, `deltaEOK`, … | `dist/index.d.ts:22,42` |
| the shadow | `lib/colors.ts` (117 LOC): a 4-branch regex CSS-colour parser + `hslToHex` + `rgbToHex` + `hexToRgba` + `hexToRgb`, **14 consuming files** | `colors.ts:22-117` |
| **is the fix gated on the tri-package bump?** | **NO** | `parseCSSColor` at the **installed 0.13.0** already returns structured `oklch` *and* two-arm `light-dark` — executed and verified (§1 C-2) |

**The lane's sharpest single conclusion.** `lane-frontend.md §9 row 5` frames the value.js leg as *"tiny (5 sites, `easeInOutSine` + `timingFunctions`) — the cheapest leg of the deadlock"*. That is true of the **import count** and understates the **interest**: fourier already ships a 117-line hand-rolled CSS-colour parser that is *wrong at the pinned glass-ui version*, and the correct implementation is sitting unimported in a package already in `node_modules`. Retiring `cssVarToHex`/`hslToHex`/`rgbToHex` onto `parseCSSColor` is a value.js-side win available **before** the `glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0` atomic transaction, not after it. **CARRY → F.W2, un-gated.**

---

## §7 — Corpus reconciliation (explicit AGREE / EXTEND / CONTRADICT)

| # | subject | corpus says | this lane finds | resolution |
|---|---|---|---|---|
| K-1 | `<Tooltip` callsites in this file | **R3-7a**: EditorControlsDock **10** (largest of nine consumers) | `grep -c '<Tooltip'` → **10** | **AGREE — exact.** Extended: 12 `DockIconButton`s, 2 `aria-label`s, and the 10 tooltips map 1:1 onto the 10 unnamed controls (C-3). |
| K-2 | dynamic `:is` family at `:144` | **R3-10**: one of the two families silently dropped between R3's two registries, at `EditorControlsDock.vue:144` | live at `:144` — `<component :is="showGhost ? Eye : EyeOff" :size="20" />` | **AGREE — exact, live.** |
| K-3 | `glass-scrubber` occurrences | `lane-frontend.md §3`: *"all 11 … are prose comments only"*, listing `EditorControlsDock.vue:48,222` | **[WT] AGREE** (2 comments). **[HEAD] CONTRADICT**: `git show HEAD:…` carries `variant="glass-scrubber"` as a **live prop value**. | **EXTEND.** The census measured [WT] and is correct there. But the "comments only" framing is what let the **four live, dead `--slider-scrub-*` declarations at `:225-228`** pass unremarked — they are not prose. **The class-surface census should count CSS custom-property *declarations with no reader*, not just class tokens.** CARRY → F.W2. |
| K-4 | the 3.1→4.0 rename sweep | `lane-frontend.md §5`: *"24 files, 46 insertions, 46 deletions — a pure rename sweep, no logic"* | For this file: 2 lines, **and the sweep was incomplete** — the renamed variant's companion token namespace was not swept (C-1) | **EXTEND — a direct constraint on the F.W2 4→7 budget.** *"Pure rename sweep"* understates the residue class: renaming an API without renaming its CSS-variable surface produces silent dead code with a **zero-line** diff footprint. Budget a token-namespace audit alongside every prop rename. |
| K-5 | API security | **R3-7b**: `OpenAPI security 0 of 45` (`RED_0_OF_45`) | `POST /api/contours` (`contours.py:21-26`) enforces **nothing** while its sole client hard-codes `auth:"session"` (`api.ts:222`) | **AGREE and SHARPEN.** At this operation the gate is not merely undocumented — it is unenforced in fact. CARRY → F.W5 (C-6). |
| K-6 | client↔operation coupling | **R6-8**: operation records embedding client back-references are non-isolable | this dock's one seam is `client:saveContour` ↔ `operation:POST:/api/contours`; the component holds **no** join | **AGREE — and this component is the positive example.** S-7. |
| K-7 | operation denominator | **X-3**: 45 total / 30 public-non-admin / 13 admin | `POST /api/contours` ∈ the 30-operation public arm (`main.py:106`, `contours.py:18`) | **AGREE.** |
| K-8 | `metric-badge` removal at 7.0.0 | `lane-frontend.md §5`: `./metric-badge` removed, 7 imports / 6 files incl. `EditorControlsDock.vue:5`; *"another prop pass is due"* | confirmed; `:113` is the site. `:value` is already 4.0.0-correct (S-6) | **AGREE.** The 7.0.0 hop moves it to `./metric` (`Metric`); the `color`/`unit` gap (C-18) should be closed in the same pass. |
| K-9 | `hover-popover` removal at 7.0.0 | `lane-frontend.md §5`: removed at 5.0.0 → `<Popover>`; 2 sites incl. `EditorControlsDock.vue:4` | confirmed; **two** instantiations in this file (`:103`, `:134`), both using `keep-dock-open` | **AGREE — and add a migration risk:** the J.W3.B dock-keep contract (S-3) must survive the `HoverPopover → Popover` fold or C-16's redundant `.stop` handlers become the only thing holding the dock open. |
| K-10 | `DockIconButton` removal at 7.0.0 | `lane-frontend.md §5`: member-absent at 5.0.0 → `<DockControl shape="icon">`, *"clean break, no alias"*; 2 files | confirmed — **12 callsites in this file alone**, the largest single-file concentration | **EXTEND.** The lane counts *import statements* (2); the migration budget is *callsites* (12 here + 7 in `CanvasControlsDock`). |

---

## §8 — Method and limits

- **Read-only** throughout `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`. The single write of this lane is this file. No product source in any repo was modified; `scripts/dev/dev.sh` was not touched.
- Evidence: `grep`/`find`/`sed`/`wc`/`git diff`/`git show`/`git status`/`git rev-parse`, plus **Node execution of the installed `@mkbabb/value.js@0.13.0` dist** (library code only, no DOM, no network) for the two hex receipts and the `parseCSSColor` capability proof at §1 C-2.
- **No browser tooling** (owner edict, probe parsimony). Exactly one claim is livable-only and is marked **UNPROVEN-NEEDS-LIVE (SS-13)**: the precise `getComputedStyle().getPropertyValue()` serialization for `--viz-fourier` (§1 C-2 falsifier (c)). Every other claim is static or source-derived; each carries `file:line` provenance and its own falsifier.
- **Working-tree caveat honoured.** `EditorControlsDock.vue` is dirty. Claims tagged **[WT]** describe the on-disk file that F.W2 will open; **[HEAD]** claims are stated only where the two differ (K-3, C-1).
- **Not claimed.** The repo-wide blast radius of C-2 (14 consumers, 5 tokens, 4 of them grey) is named but not audited here — it is a **CARRY → F.W2**, not a finding of this component. The a11y-name mechanism (C-3) is **folded** from the sibling lane, not re-derived; only this file's census is new.
