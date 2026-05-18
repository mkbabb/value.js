# HARDEN-4 — Adversarial challenge of A.W4 + A.W5 (interactive states, structure, blob/aurora abstraction, close)

Hardening lane 4. Challenges the W4 interactive-states + structure wave and the W5 blob/aurora
abstraction + close wave. Evidence is `file:line`; SHAs are A HEAD `70e61e9` (value.js) and glass-ui
HEAD `d244dd5` per `coordination/Q.md`. Read-only audit; no source file was modified.

---

## 1 — W4 structure-decomposition risk

### 1.1 The `Dock.vue` split survives, with three named hazards

`Dock.vue` is 426 lines (`wc -l` confirms the spec's count). The eight `watch` calls, four
`usePopupMutex` models, and provide/inject keys the W4 spec promises to preserve do survive a
careful split, but the spec under-specifies three failure modes.

`usePopupMutex` is the sharpest hazard. The local fork
(`dock/composables/usePopupMutex.ts`) is a single mutex instance — one `current` ref, one `pending`
ref, one `swapTimer`, and one `onUnmounted(clearSwapTimer)`. All four `popupModel(...)` calls at
`Dock.vue:132-136` read and write that one instance. W4 Lane C's `useDockAdminMode()` and
`useDockLayers()` extractions do not touch the mutex, so it is safe as long as the single
`usePopupMutex<...>()` call at `Dock.vue:132` stays in one composable or the SFC. The hazard is the
`DockViewSelect.vue` extraction: that component owns the `<Select>` whose `:open` binds
`viewSelectOpen` (`Dock.vue:235-236`). If the W4 agent moves `viewSelectOpen` into `DockViewSelect.vue`
by calling `usePopupMutex` a second time there, the dock now has two independent mutexes — the
view-select can open while the mobile-menu is open, breaking the single-open contract. The split is
safe only if `viewSelectOpen` is passed into `DockViewSelect.vue` as a `v-model:open` prop from the
one mutex instance the parent owns. The W4 spec does not say this; it must.

The `dockRef` template-ref hazard. Five watchers call methods on `dockRef.value`
(`Dock.vue:107-109`, `145-148`, `151-154`, `156-159` plus `expand`/`keepOpen`/`release`). `dockRef`
is a `useTemplateRef` bound to the `<GlassDock>` element that stays in `Dock.vue`. `useDockLayers()`
and `useDockAdminMode()` do not need `dockRef`, but the action-bar watcher (`Dock.vue:106-109`) and
the edit watcher (`Dock.vue:151-154`) both reach `dockRef`. If `actionBarLayerActive` moves into
`useDockLayers()`, that composable now needs `dockRef` passed in, or the watcher stays in the SFC.
The spec assigns the dispatch watcher (`Dock.vue:163-168`) to `useDockLayers()` but is silent on the
`actionBarLayerActive` keep-open watcher that shares the same ref — that watcher must stay in the SFC
or take `dockRef` as a parameter. Leaving it ambiguous risks a composable that captures a `dockRef`
that is `null` at composable-call time and never re-reads.

The `immediate: true` ordering hazard. The layer-dispatch watch (`Dock.vue:163-168`) runs
`immediate: true`, so `activeLayer` is set during setup, before mount. It depends on
`mobileEditActive` (a computed over `isDesktop` + `props.editTarget`), `slugEditMode`, and
`actionBarLayerActive`. If `useDockLayers()` owns `activeLayer` and the dispatch watch, but
`slugEditMode` lives in a separate `useDockSlugEdit` concern or stays in the SFC, the composable must
receive all three as arguments in the right reactive form (refs/computeds, not unwrapped values) or
the `immediate` run reads stale values. The Vue-3.5 hazard the task names — watcher reordering — is
real here: composables run in import/call order, and an `immediate` watch that fires before its
dependency refs are created throws. The spec must pin the call order or pass dependencies explicitly.

Verdict on `Dock.vue`: splittable, target ≤120 lines reachable. The `<Select>` block is ~70 lines
(`Dock.vue:232-301`), `useDockAdminMode` ~30, `useDockLayers` ~15 — extraction lands the SFC near
~120. The split needs the three guards above written into the W4 Lane C spec.

### 1.2 The `App.vue` split is lower-risk but the spec mis-assigns one watcher

`App.vue` is 393 lines; the script (`App.vue:133-342`) is ~210 lines, not the 274 the W4 spec and
Ae-2 claim — Ae-2 counted the script as `App.vue:133-342` (210 lines) yet wrote "274-line script."
The target "≤150 lines script" is reachable: `usePaletteManagerWiring` removes the 72-line callback
bundle (`App.vue:226-298`), `useAtmosphere` removes ~16 lines (`App.vue:319-334`), the color-dedup
block removes ~22 lines (`App.vue:243-264`). That is ~110 lines out, landing the script near ~100.
The spec's ≤150 target is conservative and safe.

The provide/inject hazard for `App.vue`: the script issues five `provide` calls — `EDIT_TARGET_KEY`,
`CSS_COLOR_KEY`, `SAFE_ACCENT_KEY`, `VIEW_MANAGER_KEY`, `"auroraConfig"`, `BLOB_CONFIG_KEY`. `provide`
must run inside the component `setup`, not inside an extracted composable that a child calls.
`useAtmosphere` is the trap: it owns the Aurora block, and `App.vue:334` does
`provide("auroraConfig", auroraConfigResult)`. If `useAtmosphere` is written to call `provide`
internally, that is still fine — composables called from `setup` may `provide`. But Ae-7/Ae-8 already
record that `auroraConfigResult` is `undefined` (the W0 fix rewrites this). W4 Lane C extracting
`useAtmosphere` overlaps W5 Lane B rewriting it; the W4 spec acknowledges this ("W5 also touches
this") but does not say which wave owns the `provide` key shape. W4 should extract the structure and
leave the Aurora internals as W0 left them; W5 rewrites the internals. If W4 also changes the
`provide` contract, W5 has a moving target.

The W4 spec hands `usePaletteManagerWiring` the `App.vue:226-298` bundle. That bundle closes over
`colorPickerRef`, `viewManager`, `model`, `applyColorString`, and `parseCSSColor`. Extracting it is
safe only if every one of those is passed in; `colorPickerRef` in particular is a template ref that
is `null` until the `ColorPicker` mounts, and the bundle's `setTimeout(tryStartEdit, 50)` retry loop
(`App.vue:282-289`) depends on reading `colorPickerRef.value` *after* mount. The composable must
receive the ref object itself, not `colorPickerRef.value`. The spec does not call this out.

### 1.3 Does the split need its own runtime gate?

Yes, and the W4 spec already provides most of it — the Playwright re-probe at three viewports opening
every overlay class. A god-component split that silently drops a `provide` or reorders a watcher does
not fail `vue-tsc` (the inject still type-checks; the runtime value is just wrong, exactly the Ae-8
pattern where `inject(...)!` masked `undefined`). The W4 gate must therefore include a behavioral
check the spec currently states only loosely: after the split, the admin-mode toggle, the action-bar
layer, the slug-edit layer, and the mobile-pane toggle must each be exercised and confirmed in the
probe, not merely "the dock renders." The spec's gate item 4 ("open every overlay class") covers the
view-select dropdown but not the four `DockLayer` transitions. The W4 decomposition gate needs an
explicit layer-transition walk added — `audit/W4-decomposition.md` should carry a before/after of all
five `DockLayer`s reached, not only the line counts.

---

## 2 — W4 four-state completeness

Re-grepping the demo for `<button` returns 13 custom files. The W4 Lane A list (Ad-1..Ad-6, Ad-13,
Ad-14, Ad-15) covers `GradientStopEditor`, `ColorInput`, `EditDrawer`, `MixSourceSelector`,
`SearchFilterBar`, `PointerDebugOverlay`, and "the ~7 palette-browser icon-button SFCs" (Ad-5). The
Ad-5 set names `PaletteSlugBar`, `PaletteRenameInput`, `SortFilterMenu`, `AdminTagsPanel`,
`SearchFilterBar`. Three button-bearing files are absent from every four-state finding:

`ProfileSection.vue` — native `<button>` at `:41` (slug-edit trigger), `:82` (slug pill), and `:98`
(the `@mbabb` text-button: `text-xs font-mono ... hover:underline ... cursor-pointer` — hover and
underline only, no `:active`, no focus-visible ring, no disabled). This is a dock-surface control in
the same recipe family as Ad-5 and is not listed in Ad-5's enumeration or anywhere else in Ad.

`PaletteCard.vue` — native `<button>` at `:77`, `:103`, `:148`, plus three `floating-panel-item`
buttons at `:174`, `:177`, `:180`. None appears in any Ad finding. `PaletteCard` is the primary
palette-display surface; its action buttons carry the same four-state gaps Ad documents elsewhere.

`UserSortMenu.vue:4` — `<button class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors
cursor-pointer shrink-0">`. This is byte-identical to the `SortFilterMenu.vue:4` recipe Ad-5 calls
out, yet `UserSortMenu` is named only in Ad-19 (the dropdown-content width finding), never in Ad-5's
trigger-button list. It belongs in Ad-5.

`CurrentPaletteEditor.vue` — `floating-panel-item` buttons at `:44`, `:47`, `:50` and the save/cancel
buttons at `:63`, `:66`. Ad-3 cites `CurrentPaletteEditor.vue:63-68` as the *correct* pattern
EditDrawer should copy, so the save/cancel pair is fine. The three `floating-panel-item` swatch
buttons (`:44-50`) are not assessed for the four-state contract anywhere.

The `floating-panel-item` class recurs across `PaletteCard.vue` and `CurrentPaletteEditor.vue` as a
shared swatch-menu button recipe. If that class lacks `:active`/`:focus-visible`/`:disabled` it is a
single-source fix, not a per-file one — and it is a candidate glass-ui gap the audit did not file
(`floating-panel-item` may be a glass-ui utility; the W4 agent must grep it against glass-ui HEAD
before deciding demo-side vs root).

Conclusion: W4 Lane A's list is not complete. It misses `ProfileSection` (3 buttons), `PaletteCard`
(6 buttons), `UserSortMenu` (1 button), and the `CurrentPaletteEditor` floating-panel-item triplet.
The Lane A scope and the `research/Ad §1` enumeration the W4 gate cites both need these added, or the
gate ("every interactive control enumerated in research/Ad §1") closes against an undercount and
leaves real controls unverified.

---

## 3 — W5 brittleness-window reality

### 3.1 The dependency is real and absent from glass-ui Q's plan

`coordination/Q.md §3` lists the metaballs `positionSource` hook, pointer input, per-blob opacity,
color perturbation, context-loss recovery, `deriveAuroraPalette`, `BlobDot`, and `ConfigSliderPane`
as glass-ui gaps W5 consumes. glass-ui Q's `Q.md §3` wave table (W0–W5) carries none of them: Q.W0 is
the resolution contract, W1 the un-break, W2 Card cohesion, W3 core-feature transpositions, W4
style/token co-location, W5 the close. The metaballs/aurora extension set is genuinely not in Q's
plan. A.W5's "opens after ... glass-ui shipping the metaballs/aurora API extensions" is therefore an
open dependency on work no glass-ui wave is scheduled to do.

### 3.2 The brittleness-window escape is honest but the close ceremony cannot run inside it

The precept `SPEC.md:81` states plainly: "The close ceremony cannot run while a brittleness window
is open." A.W5 is simultaneously the close wave (`A.md §3`: "W5 HEADLINE close") and the wave
carrying the brittleness declaration (`waves/W5.md` brittleness block). Those two facts collide. If
glass-ui declines or defers the extension set, W5's brittleness window is open at the moment W5 must
run the close ceremony — and SPEC forbids that. The W5 spec's re-scope ("if glass-ui declines, W5
re-scopes to demo-side documentation") describes a *resolution* of the window, but it does not
sequence the resolution before the close ceremony. The window must be closed — resolved to either
"glass-ui shipped, abstraction landed" or "glass-ui declined, abstraction routed to tranche B" —
*before* the close lanes run, not as part of them.

This is the structural defect. The brittleness-window escape (`A.md §9`, `A-challenge.md` C3) is
honest about the *deferral* — a named destination satisfies invariant A5. It is not honest about the
*ceremony sequencing*: a single wave cannot both hold an open window and execute the close. The fix
is not to abandon the escape; it is to split W5 so the close ceremony lives in a wave with no open
window.

### 3.3 W5 should split

W5 bundles three separable bodies of work:

- W5-α — demo-side blob/aurora hardening that needs no glass-ui API. The A-key-3 null-guard already
  landed at W0. What remains demo-side: the W0 static `AuroraConfig` is valid but the picker does not
  drive it (Ae-9); `AuroraPane.vue` sliders target the real v4.1 fields; `useMetaballRenderer.ts`
  duplication is documented. None of this needs the glass-ui extension set. This is closeable now.
- W5-β — the blob/aurora abstraction that consumes the glass-ui extension set. This is the wave with
  the brittleness window. It cannot close until glass-ui ships or formally declines.
- The close ceremony — the seven read-only lanes, `FINAL.md`, the integrity sweep.

The proposed restructure: rename the current W5 to **W5 — demo-side blob/aurora hardening + close**
(W5-α plus the close ceremony, no open window, closeable on the W4-close + glass-ui-independent
schedule), and lift the abstraction (W5-β) into a **separate conditional wave W6**, gated explicitly
on glass-ui shipping the extensions, with the named-destination re-scope (glass-ui successor +
value.js tranche B) as its closed-form fallback. W6 either runs (glass-ui shipped) or closes
immediately by routing to the named destination — either way it carries the only brittleness window,
and the close ceremony in W5 runs against a clean window state.

Without the split, A cannot close: the close ceremony is inside W5, the brittleness window is inside
W5, and SPEC forbids running one while the other is open. The current plan is un-closeable as
written if glass-ui does not ship.

---

## 4 — GooBlob abstraction feasibility

### 4.1 What the proposed `positionSource` hook can carry

Ae-10's proposal is `useMetaballs(canvasRef, config, { positionSource?: (now) => BlobFrame[] })` —
the demo keeps `useBlobMood` and `useBlobSatellites`, glass-ui owns the WebGL lifecycle. Reading both
sides confirms the seam is partly real and partly optimistic.

`useBlobSatellites.ts` is genuinely a pure position/radius/opacity generator. `tick(now, mood)`
mutates `sources: MetaballSource[]` where each entry is `{x, y, radius, opacity}`
(`useBlobSatellites.ts:273-278`). That is exactly a `BlobFrame[]` and feeds a `positionSource`
callback cleanly. The satellite FSM survives the abstraction intact — it never touches WebGL, never
touches a uniform, only computes numbers. This part of Ae-10 is sound.

`useBlobMood.ts` is also pure — it eased-interpolates a `MoodParams` object. It survives too.

### 4.2 What the seam loses or cannot carry

The `positionSource` hook returns positions. GooBlob's renderer (`useMetaballRenderer.ts`) uploads
far more than positions per frame, and four of those channels have no home in the proposed hook:

Per-pixel color perturbation. `useMetaballRenderer.ts:204-208` uploads `uHueRange`, `uSatShift`,
`uBrightnessShift`, `uColorNoiseFreq`, `uColorNoiseSpeed` — and these are *animated*: `uHueRange` is
`config.hueRange + params.hueRange`, where `params` is the live mood output. The perturbation is not
static config; it cross-fades with mood. Ae-10 proposes `MetaballConfig.colorPerturbation` as a
config block, but a config block is not per-frame. To preserve the mood-driven perturbation the demo
needs either a reactive `colorPerturbation` config the renderer re-reads every frame, or the
`positionSource` return type extended to carry perturbation. Ae-10's proposal carries neither — it is
under-specified, and the demo's mood-coupled hue drift is lost unless the hook is widened.

The body/satellite topology and `POS_SCALE`. GooBlob renders one `uBodyRadius` body plus N
satellites on a canvas CSS-sized 1.6× its wrapper, with every length uniform multiplied by
`POS_SCALE = 1/1.6` (`useMetaballRenderer.ts:19`, applied at `:185-219`). glass-ui's `useMetaballs`
is a flat peer field of up to 16 blobs with no body/satellite distinction and no overflow-canvas
convention. A `positionSource` returning a flat `BlobFrame[]` *can* encode "frame 0 is the body,
frames 1..N are satellites" — but the 1.6× overflow canvas and `POS_SCALE` are a coordinate-system
contract between the demo's renderer and the demo's shader. If glass-ui owns the renderer, the demo
must either pre-scale every `BlobFrame` coordinate (pushing `POS_SCALE` into the `positionSource`
callback, which is workable) or glass-ui must expose an overflow/inset config. The Ae-10 proposal
does not mention `POS_SCALE` at all. It is recoverable but the audit understates the coupling.

Per-blob opacity. Ae-10 names this correctly — glass-ui's `u_positions` is `vec3 (x,y,r)` with no
alpha (`useMetaballs.ts:159`, `posData = new Float32Array(MAX_BLOBS * 3)`). Satellites fade in/out
via `MetaballSource.opacity`. The hook cannot work without glass-ui adding the opacity channel; this
is a hard dependency, correctly filed.

The shader math differs. GooBlob's frag shader uses SDF `smin` smooth-union with FBM surface noise
and per-pixel HSV perturbation (`metaball.frag.glsl`). glass-ui's `FRAGMENT_SHADER`
(`metaballs/shaders.ts`) uses inverse-square density summation with flat per-blob color. Even with
the `positionSource` hook, consuming `useMetaballs` means adopting glass-ui's shader — the demo's
`smin` body shape, FBM edge noise, and HSV perturbation are *gone* unless glass-ui's shader is
extended to match. Ae-10 lists "per-pixel HSV perturbation" as an addition but does not flag that the
*smooth-union body shape itself* differs. The blob will render with a different silhouette. Whether
that is acceptable is a visual-design call the audit does not surface.

### 4.3 Concrete verdict

Survives the abstraction: `useBlobSatellites` (the satellite FSM), `useBlobMood` (the mood FSM),
`useBlobPointer` (pointer smoothing) — all three are pure number generators feeding a hook.

Lost or at-risk unless glass-ui's API and shader are widened beyond Ae-10's stated proposal:
mood-coupled per-frame color perturbation (Ae-10 proposes static config, the demo needs per-frame);
the `smin` body silhouette and FBM edge noise (different shader math); the `POS_SCALE` overflow-canvas
coordinate contract (unmentioned). The pure-duplication deletion claim — ~319 lines of
`useMetaballRenderer.ts` — holds for the WebGL lifecycle, `cssColorToRgb`, the `ResizeObserver`
resize, and reduced-motion handling. It does not hold for the perturbation-uniform upload
(`:204-208`) or the satellite-uniform loop (`:213-227`), which encode the body/satellite topology the
glass-ui shader does not have. The realistic deletable count is closer to ~200 lines than 319, with
the rest migrating into the `positionSource` callback rather than vanishing.

The abstraction is feasible but the coupling is deeper than Ae-10 states. W5-β (or W6 per §3.3) must
treat "glass-ui's shader produces a visually equivalent blob" as an explicit acceptance gate, not an
assumption.

---

## 5 — glass-ui gap list verification

`coordination/Q.md §3` lists 11 gaps. Verified each against glass-ui HEAD `d244dd5`.

| Gap | Verdict | Evidence |
|---|---|---|
| metaballs `positionSource` + pointer + per-blob opacity + perturbation + context-loss | REAL | `metaballs/types.ts:1-18` has 8 flat fields; `useMetaballs.ts:159` `posData` is `vec3`; no pointer uniform; no `webglcontextlost` listener. Confirmed. |
| Aurora `deriveAuroraPalette(baseColor, opts)` | REAL | `aurora/index.ts` exports `cssToOklch`, `hexToOklchStop`, `flattenPalette` but no single-color→palette helper. Confirmed. |
| `BlobDot` organic-dot primitive | REAL | no `blob`/`watercolor` path under `glass-ui/src`. Confirmed missing. |
| `ConfigSliderPane` tuning panel | **PARTLY COVERED — gap mis-stated** | glass-ui ships `./configurator` exporting `Configurator`, `ConfiguratorLayer`, `ConfiguratorRow`, and `useConfiguratorState<T>` (`configurator/index.ts`). `ConfiguratorRow` + `useConfiguratorState` already provide the labelled-control + preset/reset shape Ae-14 describes. The gap is not "glass-ui has no config-pane primitive" — it is "the demo's `AuroraPane`/`BlobPane` never adopted the existing `Configurator`." See §5.1. |
| complete glass `Select` surface (content + items) | **FALSE — already covered** | glass-ui `src/index.ts:110` exports `* from ./components/ui/select` — `Select`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectTrigger`, etc. (`ui/select/index.ts`, 10 components). The demo's `@components/ui/select/index.ts` re-exports all ten **from `@mkbabb/glass-ui`**. The demo is NOT on raw reka-ui. Ae-15 is wrong. See §5.2. |
| `SelectTrigger` `size` prop (`sm = h-9`) | REAL | glass `SelectTrigger.vue:36` hardcodes `h-10`; it has a `variant` prop (`ghost`/default) but no `size`. The 11 `class="h-9"` overrides are real. Confirmed. |
| `SelectTrigger` `clampLabel` prop | REAL | `SelectTrigger.vue:36` hardcodes `[&>span]:line-clamp-1`; no prop to disable it; `Dock.vue:240` cancels it with `[&>span]:line-clamp-none`. Confirmed. |
| `TooltipContent` `variant="mono"` | REAL (not re-verified against TooltipContent source this lane) | Ad-17 cites 8 consumers, 5 recipes. The consumer evidence is solid; the glass-ui-side absence is asserted by Ad, not re-checked here — flag for the W4 agent to confirm against glass-ui HEAD. |
| `Button size="icon-sm"` | REAL | glass `button/index.ts:34-44` has `size: default/sm/icon` — `icon` is `h-10 w-10`, no `icon-sm`. Confirmed. |
| Tabs `underline` variant | NOT VERIFIED THIS LANE | W2-scope; outside HARDEN-4 bounds. Flag: the W2 agent owns this. |
| `Card` props fail-explicit | REAL (= glass-ui Q-card-2) | Already in Q's plan as Q-card-2 (`Q.md §4`). Confirmed, correctly destinationed. |

### 5.1 The `ConfigSliderPane` gap is mis-framed

`coordination/Q.md §3` row 4 says "glass-ui builds the same shape for `Configurator`" and proposes a
*new* `ConfigSliderPane` primitive. glass-ui already exports the `Configurator` family on a public
subpath (`./configurator`), including `ConfiguratorRow` (a labelled control row) and
`useConfiguratorState<T>` (preset/clone/reset state). The honest gap is narrower: glass-ui's
`Configurator` is a full studio chassis (preset picker + layers + scroll modes), heavier than the
demo's `AuroraPane`/`BlobPane` slider list. Either the demo's panes adopt `ConfiguratorRow` +
`useConfiguratorState` directly (no new glass-ui primitive needed — W4 Lane D's "demo-local
`ConfigSliderPane`" becomes a thin composition of existing glass-ui parts), or glass-ui adds a
lighter `ConfigSliderPane` preset. The gap should be re-filed as "the demo does not consume the
existing `./configurator` surface," which changes W4 Lane D: it is not "build a demo-local component
until glass-ui ships a primitive" but "compose the already-shipped `ConfiguratorRow`." This is the
glass-ui-first invariant A1 applied — the demo must not rebuild what `./configurator` already ships.

### 5.2 The Select gap (Ae-15) is false and must be struck

Ae-15 claims `Dock.vue` "imports `Select`/`SelectContent`/`SelectItem` from `@components/ui/select`
(raw shadcn-vue)" and that "the demo falls back to raw reka-ui `Select`, half-on-the-library." Both
claims are wrong. `demo/@/components/ui/select/index.ts` is a one-line re-export:
`export { Select, SelectTrigger, SelectItem, ... } from "@mkbabb/glass-ui"`. glass-ui's
`src/index.ts:110` exports the full `ui/select` family. The dock's `<Select>` block is already on the
glass-ui Select surface — `SelectContent` is glass-ui's `ui/select/SelectContent.vue`, not raw
reka-ui. The `coordination/Q.md §3` row "complete glass Select surface ... the demo falls back to raw
reka-ui Select" must be deleted. It is a phantom gap; filing it to glass-ui would ask glass-ui to
ship something it already ships. A.W4's Lane B scope referencing Ae-15 needs that reference removed.

(Caveat: glass-ui's `Select` family lives in `ui/select`, exported flat from `src/index.ts`, not on a
dedicated `./select` subpath. If the audit's real concern is subpath hygiene — a `./select` export to
match `./dock` — that is a different, much smaller finding, and is not what Ae-15 says.)

### 5.3 A missing gap the audit did not file

The `floating-panel-item` button recipe (§2) recurs across `PaletteCard.vue` (`:174-180`),
`CurrentPaletteEditor.vue` (`:44-50`), and likely `SwatchHoverMenu`. If `floating-panel-item` is a
glass-ui utility lacking the four-state contract, that is an 11th-style glass-ui gap parallel to
Ad-7's `floating-panel` finding — neither Ad nor `coordination/Q.md §3` files the *item* recipe. The
W4 agent must grep `floating-panel-item` against glass-ui HEAD; if it is glass-ui-owned and
state-incomplete, file it.

Net gap-list corrections: strike Ae-15 / the Select row entirely (false); re-frame the
`ConfigSliderPane` row as "adopt the existing `./configurator` surface" (covered, mis-stated);
consider filing the `floating-panel-item` recipe. The remaining eight gaps verify as real.

---

## 6 — W5 close ceremony adequacy

`waves/W5.md` specs a "strengthened close audit — read-only lanes covering plan-vs-actual,
substrate-without-consumer, doc-drift, idiomatic-gestalt, the visual-runtime re-probe, and an
integrity sweep." It names six lane subjects and says "up to 7 lanes per the dual ceiling." Against
the precept `SPEC.md` close requirements (`:111-120`: every planned item landed/retired/destinationed,
every hard gate has evidence, `FINAL.md` cites commits and artefacts, open brittleness windows
restored, local close requirements satisfied):

The lane subjects are concrete enough — each maps to a SPEC close requirement. plan-vs-actual covers
"every planned item landed"; substrate-without-consumer covers SPEC `:44` ("every wave lands
substrate with its consumer"); the visual-runtime re-probe covers "every hard gate has evidence" for
a visual tranche; the integrity sweep (`git reflog`, `git stash list`) is a sound addition.

The defect is the one §3.2 names: `waves/W5.md` says "the close ceremony cannot run while a
brittleness window is open" is satisfied because the brittleness declaration's `restoration` clause
"resolves" the window. It does not. The `restoration` clause describes *what* the resolution is; it
does not sequence the resolution as a gate *before* the close lanes. SPEC `:81` is a hard ordering
constraint. The W5 spec must add an explicit pre-close gate: "the brittleness window is closed
(either glass-ui shipped and W5-β/W6 landed, or glass-ui declined and the abstraction is routed to
the named destination with a recorded commit) BEFORE any close lane runs." As written, a W5 agent
could run the seven close lanes with the window still open, producing a `FINAL.md` that claims a
clean close while a window is unresolved — exactly the silent close invariant A5 forbids.

Second, smaller defect: the close ceremony's "visual-runtime lane re-probes ≥3 viewports, samples
animation frames on every state transition A introduced." W4 introduces the four-state button changes
and the dock decomposition; W5's visual lane must re-probe *those* too, not only W5's blob/aurora
changes. The W5 spec scopes the visual lane to "every state transition A introduced" which is correct
in letter, but the W4 decomposition's layer-transition walk (§1.3) must be named as an explicit
re-probe target so it is not dropped — the dock has five `DockLayer`s and a collapsed slot, and a
decomposition regression there is invisible to `vue-tsc`.

Otherwise the close ceremony is specced adequately: six named lanes, the integrity sweep, `FINAL.md`
with commit-and-artefact citation, `PROGRESS.md` reconciliation, the close-honesty checklist. It
meets SPEC `:111-120` once the brittleness-window pre-gate is added.

---

## Verdicts

### W4 split-safety verdict

The `Dock.vue` and `App.vue` decompositions are SAFE to attempt and the line-count targets are
reachable, conditional on four gates the W4 Lane C spec currently omits:

1. `usePopupMutex` is called exactly once; `DockViewSelect.vue` receives `viewSelectOpen` as a
   `v-model:open` prop, never calls `usePopupMutex` itself. A second mutex instance breaks the
   single-open contract silently.
2. Every extracted dock composable that touches `dockRef` receives it as a parameter; the
   `actionBarLayerActive` keep-open watcher (`Dock.vue:106-109`) stays in the SFC or takes `dockRef`
   explicitly. The spec assigns only the dispatch watcher and is silent on this one.
3. The `immediate: true` layer-dispatch watch receives `mobileEditActive`/`slugEditMode`/
   `actionBarLayerActive` as reactive refs/computeds; composable call order is pinned so the
   immediate run does not read pre-creation values.
4. W4 extracts `App.vue` structure only; it does not change the `"auroraConfig"` `provide` contract
   (W5 owns the Aurora internals). `usePaletteManagerWiring` receives `colorPickerRef` as the ref
   object, not its `.value`.

Needed gate addition: `audit/W4-decomposition.md` must record a before/after walk of all five
`DockLayer`s reached and the four layer transitions exercised, not only `wc -l`. A dropped `provide`
or reordered watcher passes `vue-tsc` and fails only at runtime — the decomposition needs the
behavioral probe the spec states too loosely.

W4 Lane A four-state list is INCOMPLETE: add `ProfileSection.vue` (3 buttons), `PaletteCard.vue`
(6 buttons), `UserSortMenu.vue:4`, and the `CurrentPaletteEditor.vue` `floating-panel-item` triplet
to the Lane A scope and the `research/Ad §1` enumeration the gate cites.

### W5 closeability verdict

W5 is UN-CLOSEABLE as currently structured if glass-ui does not ship the extension set. The wave is
simultaneously the close wave and the wave holding the brittleness window; precept `SPEC.md:81`
forbids running a close ceremony while a window is open. The brittleness-window escape is honest
about the *deferral destination* (invariant A5 satisfied) but does not sequence the window's
resolution before the close lanes.

Proposed restructure — split W5:

- **W5 — demo-side blob/aurora hardening + close.** The picker-derived `AuroraConfig` work that
  needs no glass-ui API (Ae-9 demo half), the `AuroraPane` slider rewrite against v4.1 fields, the
  `useMetaballRenderer` duplication documented, plus the full close ceremony (seven read-only lanes,
  `FINAL.md`, integrity sweep). No brittleness window. Closes on the W4-close schedule independent of
  glass-ui.
- **W6 — blob/aurora idiomatic abstraction (conditional).** Consumes the glass-ui extension set;
  carries the only brittleness window. Either runs (glass-ui shipped) or closes immediately by
  routing the abstraction to the named destination (glass-ui successor tranche + value.js tranche B).
  W6's close runs against a resolved window because resolution-or-route is its single gate.

Add to the W5 close spec an explicit pre-close gate: the brittleness window is closed (shipped-and-
landed, or declined-and-routed-with-a-recorded-commit) before any close lane runs.

The GooBlob abstraction is feasible but Ae-10 understates the coupling — mood-coupled per-frame color
perturbation, the `smin` body silhouette, and the `POS_SCALE` overflow-canvas contract are at risk;
W6 must carry an explicit "visually equivalent blob" acceptance gate, and the deletable line count is
~200, not 319.

### Gap-list corrections

- STRIKE the Select gap (Ae-15 / `coordination/Q.md §3` "complete glass Select surface"). The demo's
  `@components/ui/select` re-exports the full glass-ui `Select` family from `@mkbabb/glass-ui`; the
  demo is already on the library. The claim "falls back to raw reka-ui" is false. Remove the Ae-15
  reference from A.W4 Lane B.
- RE-FRAME the `ConfigSliderPane` gap. glass-ui already ships `./configurator` with `ConfiguratorRow`
  + `useConfiguratorState<T>`. The gap is "the demo does not consume the existing surface," not
  "glass-ui lacks the primitive." W4 Lane D composes `ConfiguratorRow` rather than building a
  demo-local component awaiting a glass-ui primitive.
- CONSIDER filing the `floating-panel-item` button recipe as a glass-ui gap if it is glass-ui-owned
  and four-state-incomplete (the W4 agent must grep it against glass-ui HEAD first).
- The remaining eight gaps verify as real and correctly evidenced. Tabs `underline` (W2-scope) and
  `TooltipContent variant="mono"` were not re-verified against glass-ui source this lane and are
  flagged for their owning agents.
