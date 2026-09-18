# CHALLENGE-L — library structure under `demo/picker/ColorPicker.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/picker/ColorPicker.vue` (414 lines; 71 comment lines).
- Write scope honoured: this file is the only artifact produced. No edit to `src/`, `demo/`,
  `api/`, `test/`, `e2e/`, `vnext/**`, `scripts/dev/dev.sh`, or any `INBOX.md`.

---

## 0. The yardstick is the repo's own written law

This audit does not invent a layering opinion. `docs/tranches/V/ARCHITECTURE.md §1` already
declares one, verbatim (lines 47–58):

```text
app            → shell / color-session / feature / platform / shared
shell          → color-session / platform / shared
feature        → color-session / own descendants / platform / shared / published packages
color-session  → platform / shared / published packages
platform       → shared / external packages
shared         → external packages
```

> "Cross-feature internal imports are forbidden by construction."

and, in the same section (line 39):

> "There is no `panes/` dumping ground, `demo/@`, TS/Vite project alias, `@src`, or **one-line
> glass-ui forwarding directory**."

`picker/` is named in that tree as a **feature**. Every finding below is measured against that
law, not against taste.

---

## Findings

### L-1 — BLOCKER — The published `/color` surface withholds the abstraction the picker needs, so the demo re-implements it (badly)

`src/color/model.ts` implements and exports four things that are exactly the picker's problem:

| symbol | site | what it is |
|---|---|---|
| `SPACE_SCHEMA` | `src/color/model.ts:56–74` | per-space channel-name table + `hueIndex` + `css: boolean`, all 17 spaces |
| `SPACE_IDS` | `src/color/model.ts:76` | the frozen space enumeration |
| `makeColor(space, channels, alpha)` | `src/color/model.ts:136–142` | the **generic, runtime-dispatched** constructor |
| `isAnyColor` | `src/color/model.ts:127` | the structural guard |

`src/color/index.ts` (the barrel, 41 lines) re-exports **none of them**. Therefore
`src/subpaths/color.ts` does not, and the published package does not:

```
$ node --input-type=module -e "…await import('./dist/subpaths/color.js')…"
published @mkbabb/value.js/color exports: a98Rgb, convertColor, displayP3, hsl, hsv, hwb, ictcp,
  interpolateHue, jzazbz, kelvin, lab, lch, linearSrgb, mapColorToGamut, mixColors, oklab, oklch,
  prophotoRgb, rec2020, rgb, safeAccentColor, toRgba8, xyz
   makeColor    -> ABSENT
   SPACE_SCHEMA -> ABSENT
   SPACE_IDS    -> ABSENT
   isAnyColor   -> ABSENT
```

They are load-bearing *internally* — `src/color/operations.ts:13,14,45,53,122,162,172,224` and
`src/css/grammar.ts:16,290` consume them — so the library privately depends on the very
abstraction it refuses to publish. `dist/subpaths/color.d.ts` contains zero occurrences of
either name.

**The measured consequence.** `demo/color-session/picker-color.ts` — 218 lines, the module the
entire picker subtree computes through — is a *reconstruction of the withheld surface*:

- `:52–70` `PICKER_CHANNELS` re-declares the channel-name table for all 17 spaces. Its `hue?: true`
  column is `SPACE_SCHEMA[*].hueIndex` re-expressed.
- `:92–95` `CSS_PICKER_SPACES` is **byte-identical** to `src/css/grammar.ts:161–164`'s
  `CSS_COLOR_SPACES` — same 13 members, same order, same literal text.
- `:123–144` `buildColor()` is a 22-line, 17-case `switch` that dispatches to the 17 published
  factories. It is `makeColor` with the type-safety removed (`as unknown as`, `channels[index] ??
  "none"`), and it is the hot path: `withChannel` / `withNormalizedChannel` / `withAlpha` /
  `clampPickerColor` all funnel through it, so every slider drag frame re-enters the switch.

This is the root library-structure defect. A real consumer building a *dynamic-space* colour tool
— which is the single most obvious use of a 17-space colour library — cannot do it through the
published API. The demo proves the API by pretending it is complete and then quietly writing the
missing half.

**Corroborating measurement.** Across the whole `demo/picker/**` subtree the only library import
is `clamp` from `@mkbabb/value.js/math` (4 sites:
`controls/ComponentSliders/ComponentSliders.vue:98`,
`controls/SpectrumCanvas/SpectrumCanvas.vue:37`,
`controls/SpectrumCanvas/composables/useSpectrumPlateStyle.ts:9`, `visual/HeroBlob.vue:40`).
`ColorPicker.vue` itself imports **zero** value.js. The flagship instrument of a colour library
exercises one arithmetic helper of its own `/color` and `/css` surfaces directly, and reaches
everything else through a demo-local shim.

**Cure (transposition, not patch).** Publish the schema and the generic constructor:
`src/color/index.ts` re-exports `SPACE_SCHEMA`, `SPACE_IDS`, `makeColor`, `isAnyColor`;
`src/subpaths/color.ts` follows. Add the two facts the picker needs and the library already knows
privately — per-channel numeric domain and unit — as `SPACE_SCHEMA[space].channels[i] = {key, min,
max, unit, hue}`, since the library is already the authority for them (it clamps kelvin at
`model.ts:91`, and `CHANNEL` ranges are what `mapColorToGamut` is defined against). Then delete
from the demo: `buildColor`, `CSS_PICKER_SPACES`, and the channel-name/hue columns of
`PICKER_CHANNELS`. `picker-color.ts` collapses from 218 lines to a thin `Result`→throw adapter
(`valueOrThrow`, `PickerColorError`) plus the immutable channel algebra — which itself belongs in
`/color` (see L-1b).

### L-1b — MAJOR — Immutable channel algebra is library work living in the demo

`withChannel`, `withNormalizedChannel`, `withAlpha`, `channelNumber`, `normalizedChannel`,
`channelMeta`, `clampPickerColor` (`picker-color.ts:146–204`) are generic operations on
`AnyColor` with no picker semantics whatsoever. The package description is *"Immutable,
failure-explicit CSS color … capabilities"*. `withAlpha(color, a)` is the canonical immutable
colour operation and it is not in the library; every consumer that needs it will write it again.
`demo/color-session/valueDomain.ts` (49 lines) exists solely to rename `clampPickerColor` to
`clampColorToSpaceDomain` — a one-line delegate at `:47–49`.

**Cure.** `/color` gains `withChannel` / `withAlpha` / `channelAt` / `clampToDomain` beside
`mapColorToGamut`; `valueDomain.ts` is deleted outright.

### L-2 — BLOCKER — App-scoped state lives in a route leaf that is not always mounted; the picker's action bar is measurably absent on mobile

`ColorPicker.vue:315–328` constructs `actionBarContext` — the Dock's entire picker toolbar
contract. `:331–344` `defineExpose`s it along with the edit state machine. The Dock is a
**sibling**, so App.vue reaches back through a component instance ref:

- `App.vue:38` — `:action-bar="colorPickerRef?.actionBarContext ?? null"`
- `App.vue:41–42` — `@commit-edit="colorPickerRef?.commitEdit()"` / `@cancel-edit="…"`
- `App.vue:351` — `usePaletteWiring(colorPickerRef, …)`
- `App.vue:342` — `usePaneRouter(… colorPickerRef: () => colorPickerRef.value …)`

`colorPickerRef` is populated only by `onDesktopLeftMount` (`App.vue:323–328`), wired to the two
**desktop** `PaneSlot`s (`:105`, `:131`). The **mobile** `PaneSlot` (`App.vue:83–91`) passes no
`:on-mount`, and `PaneSlot.vue:124` renders `:ref="onMount ? … : undefined"`. Therefore
`colorPickerRef` is permanently `null` at mobile widths.

**Measured, live, `http://localhost:9000/#/`:**

| viewport | `data-layout` | picker action-bar controls in `<nav>` | `#action-bar` DockLayer in DOM |
|---|---|---|---|
| 1440×900 | desktop | `Back`, `Reset color`, `Copy color`, `Random color`, `Palettes`, `Extract palette`, `Open color input` | yes |
| 390×844 | mobile | *(none)* | **no** (`actionBarLayerPresent: false`) |

The toggle element itself survives in the DOM at 390 as a 32×32 button inside a **0-width**
`.action-bar-toggle-slot` with `tabindex="-1"` — a clipped control with an accessible name and no
target. Confirmed against the shipped audit screenshots: `safari-desktop-light/picker.png` shows
the `🖌 Tools →` group in the dock pill; `safari-mobile-light/picker.png` shows `Home ⌄ · Picker |
About · ⋮` and no Tools affordance.

**The same nullity silently degrades three more paths** (see L-4).

The mechanism is not the missing `:on-mount` — that is the symptom. The mechanism is that
`ActionBarContext` is app-scoped state (its nine fields are six straight `useColorPipeline`
members, `isEditing`, `paletteActive` derived from `viewManager`, and three closures) assembled
inside a component whose lifetime is a pane-routing accident.

**Cure.** `ActionBarContext` and the commit/cancel edit machine move to a `color-session`
composable (`useColorEditSession`) provided by App beside `COLOR_MODEL_KEY`. The Dock injects it.
`colorPickerRef` and `defineExpose` disappear entirely; `usePaletteWiring`'s picker parameter and
its retry loop disappear with them.

### L-3 — MAJOR — Four of `ColorPicker.vue`'s import edges violate the declared import-direction law

| line | edge | law |
|---|---|---|
| `:108` | `../ui/card` | ARCHITECTURE §1 line 39 forbids a *"one-line glass-ui forwarding directory"* by name (see L-6) |
| `:129` | `../color-picker/composables/boot/useOverture` | **feature → app**. The law only permits `app → feature`. `demo/color-picker/` is the composition root (App.vue, router, index.html, boot/) and is not even the declared name — the tree says `demo/app/`. |
| `:130` | `../shell/useViewManager` | **feature → shell**. The law is `shell → color-session`, never the reverse. |
| `:131` | `../palettes/usePalettePorts` | **feature → another feature's internal**. "Cross-feature internal imports are forbidden by construction." |

`:130`'s only use is `paletteActive` (`:313`) — one boolean the Dock could derive itself.
`:131`'s only use is `paletteManager.commitColorEdit(...)` at `:294` — a **palette-domain write
executed from inside the picker**. `:129` produces a directory-level cycle
`color-picker/ → picker/ → color-picker/` (App.vue:164 imports `../picker`;
usePaletteWiring.ts:21 imports its type).

**Cure.** Overture beat B4 arrives as a `shell`-owned provide (or the picker simply renders the
blob unconditionally and the shell owns the reveal class). `paletteActive` is computed in the Dock.
The edit-commit call inverts: the picker emits an intent, `color-session`'s edit session owns the
commit, and `palettes/` subscribes to it — the picker never names `palettes/` again.

### L-4 — MAJOR — Masking fallbacks and dual semantics in `usePaletteWiring`

`demo/color-picker/composables/usePaletteWiring.ts` routes four cross-cutting colour operations
through the picker *component instance* and silently changes behaviour when it is absent:

- `:65–73` `emitApply` — picker present → `onPaletteApply(colors)` (replaces `savedColors` with
  **all** parsed colours). Picker absent → `applyColorString(colors[0])` (sets the **current
  colour** to the first entry and touches no palette). Two different products, one API.
- `:121–127` `emitSetCurrentColor` — `applyExternalColor` vs `applyColorString`. These are two
  near-identical implementations of the same concept in the same file
  (`useColorPipeline.ts:182–188` and `:247–257`): one calls `setCurrentColor` (refreshing
  `stableHue`) and throws on a parse failure; the other calls `updateModel` directly and swallows
  the error. Which one you get depends on the viewport.
- `:33–58` `whenColorPickerReady` — a 40 × 50 ms polling loop waiting for a component to mount,
  ending in `console.warn("gave up waiting for the color picker to mount")`. On mobile this loop
  **always** exhausts, so palette colour editing (`emitStartEdit`, `:106–119`) is dead.

Every one of these calls is a pure pipeline call. `App.vue:245` already holds `pipeline`
directly; `colorPickerRef.value.onPaletteApply(colors)` is literally `pipeline.onPaletteApply(colors)`
routed through a component that adds nothing. Five of the twelve `defineExpose` members
(`onPaletteApply`, `onPaletteAddColor`, `parseColor`, `setCurrentColor`, `applyExternalColor`) are
straight re-exports of `inject(COLOR_MODEL_KEY)` — the object App itself created.

Owner edict 2 (no legacy code, no dual paths, no masking fallbacks) is violated three times over.

**Cure.** Delete the picker parameter, the retry loop and both fallback arms; call the pipeline.
Then reconcile `applyExternalColor` and `applyColorString` into one named operation — the
duplication is a `color-session` defect independent of the picker.

### L-5 — MAJOR — KeepAlive lifecycle leak: the picker's global keyboard listener survives deactivation (measured)

`ColorPicker.vue:376–379` registers `window.addEventListener("keydown", handleKeydown)` in
`onMounted`; `:381–385` releases it — and cancels both debounces — in `onUnmounted`. The picker is
rendered inside `PaneSlot.vue:120`'s `<KeepAlive :max>`, so leaving the picker view **deactivates**
rather than unmounts it: `onUnmounted` never runs, and there is no `onDeactivated`/`onActivated`
pair.

**Measured, live** (`http://localhost:9000`, 1440×900):

```
1. on '#/'        → Cmd+K   ⇒ Select color space  aria-expanded: "true", [role=listbox] present
2. on '#/'        → Cmd+K   ⇒ closed
3. navigate '#/browse'      ⇒ picker Select absent from DOM  (pane deactivated)
4. on '#/browse'  → Cmd+K   ⇒ (no visible effect — the picker is not displayed)
5. navigate back to '#/'    ⇒ aria-expanded: "true", [role=listbox] present   ← LEAK
```

The deactivated picker consumed a global shortcut from a route it does not own and mutated
`selectedColorSpaceOpen` (`:243`), so the instrument re-appears with its dropdown spuriously open.
The same lifecycle hole leaves `parseAndSetColorDebounced` (2000 ms) and
`updateColorComponentDebounced` (500 ms) uncancelled on every view switch.

Compounding: the component runs **two** keyboard mechanisms for one shortcut set —
`useMagicKeys()` (`:247`, a `@vueuse` window-wide key-state store) *and* its own raw window
`keydown` handler, with the handler reading magic-keys state (`:263`). One concept, two homes.

**Cure.** The shortcut is app-level, not picker-level: it belongs in a `shell` keyboard-map
composable registered once at the composition root, dispatching to whatever instrument is active.
The picker keeps no window listener at all. If a listener must live in a KeepAlive'd leaf, it is
`onActivated`/`onDeactivated`, never `onMounted`/`onUnmounted`.

### L-6 — MAJOR — `demo/ui/` is 19 one-line glass-ui forwarding directories, forbidden by name

```
$ wc -l demo/ui/*/index.ts | tail -1     →  29 total   (19 directories)
$ grep -rn 'from "[./]*ui/[a-z-]*"' demo --include='*.vue' --include='*.ts' | wc -l   →  90
```

Every barrel is a bare re-export — `demo/ui/card/index.ts` is one line:
`export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";`
Not one adds a variant, a default, or a type. `ColorPicker.vue:108` and
`display/ColorComponentDisplay/ColorComponentDisplay.vue:54`,
`controls/ComponentSliders/ComponentSliders.vue:95–96`,
`controls/ComponentSliders/ConsoleRail.vue:90` all import through them.

ARCHITECTURE.md §1 line 39 forbids exactly this ("no … one-line glass-ui forwarding directory"),
and `demo/ui/` is not in the declared tree at all — the declared home is `shared/ui/` for
*"only genuinely app-owned controls with 2+ consumers"* (today: `EmptyState.vue`,
`PaneHeader.vue`, correctly).

It is also a *de facto* dual path: components arrive via the barrel, composables arrive direct
(`writeClipboard` at `ColorPicker.vue:138`; `useTouchGate` at `SpectrumCanvas.vue:39`;
`useClipboard` at `App.vue:191`). Same package, two spellings, decided by kind.

**Cure.** Delete all 19 directories; rewrite the 90 import sites to `@mkbabb/glass-ui` (and its
declared subpaths). This is a mechanical, zero-behaviour change that removes a whole directory
level the architecture prohibits.

### L-7 — MAJOR — A second, incorrect hex-validity implementation inside the component

`ColorPicker.vue:223–235`:

```ts
if (component === "hex") {
    const hex = text.startsWith("#") ? text : `#${text}`;
    if (/^#[0-9a-fA-F]{3,8}$/.test(hex)) {
        parseAndSetColor(hex);
    }
}
```

Measured against the published parser:

```
$ node -e "…parseCssColor(s)…"
#abc        demo-regex true   library ok
#abcd       demo-regex true   library ok
#12345      demo-regex true   library REJECT
#abcdef     demo-regex true   library ok
#1234567    demo-regex true   library REJECT
#abcdef12   demo-regex true   library ok
```

`{3,8}` admits the two lengths CSS does not define (5 and 7). The gate is therefore *both*
redundant (the library already validates) *and* wrong (it passes garbage through to a parser that
rejects it, producing the 2-second `parseError` flash from `useColorParsing.ts:54–57`). Colour
syntax is the library's unique semantic ownership; a route leaf must not hold a second opinion
about it.

This is also the **fifth** home of the "hex is a display encoding, not a space" special case.
`grep -rn '=== "hex"\|!== "hex"' demo` returns **11** sites, including
`useColorPipeline.ts:118,176`, `useColorParsing.ts:66`, `useSliderGradients.ts:65`,
`useColorNameResolution.ts:43`, `useColorUrl.ts:55`, `ColorSpaceSelector.vue:156`,
`readoutReservation.ts:118`, `ComponentSliders.vue:161`, and `ColorPicker.vue:224`.

**Cure.** Delete the regex; call the pipeline unconditionally and let the library's typed
`ParseResult` decide. Then give `DisplayColorSpace` a real home: one `displaySpace` module in
`color-session` owning `{ resolve, format, parse, channels }` for the `hex` encoding, so the
special case exists exactly once instead of eleven times.

### L-8 — MAJOR — `defineExpose` is the component's real public surface, and a third of it is dead

`ColorPicker.vue:331–344` exposes twelve members. Consumer counts across `demo/`, `test/`, `e2e/`:

| member | consumers | note |
|---|---|---|
| `isTransitioning` | **0** | declared `ref(false)` at `:330`, **never mutated anywhere** |
| `parseColor` | **0** | pipeline pass-through |
| `setCurrentColor` | **0** | pipeline pass-through |
| `editTarget` | **0** | duplicated by the `update:editTarget` emit at `:276` |
| `onPaletteApply` / `onPaletteAddColor` / `applyExternalColor` / `onStartEdit` | 1–2 | all in `usePaletteWiring` (L-4) |
| `commitEdit` / `cancelEdit` | 2 each | **wired twice**: `App.vue:41–42` *and* `usePaneRouter.ts:156–157`. The App path also sets `viewManager.mobilePaneIndex.value = 1`; the router path does not. Divergent duplicate wiring for one action. |
| `actionBarContext` | 1 | L-2 |
| `isEditing` | 1 | via `actionBarContext` |

A component's public surface is its props, emits and slots. An imperative twelve-member handle
reached through a template ref is a service-locator, and this one carries four members no code
reads. `usePaletteWiring.ts:21` imports `type { ColorPicker }` purely to spell
`InstanceType<typeof ColorPicker>` — the leaf's *instance type* has become the app's contract.

**Cure.** `defineExpose` goes to zero when L-2's edit session moves to `color-session`.

### L-9 — MINOR — 703 lines of debug scaffolding ship eagerly, and two controls cannot mount without it

```
demo/picker/composables/usePointerDebug.ts   281
demo/picker/visual/PointerDebugOverlay.vue   286
demo/picker/visual/DebugEventLog.vue         136   = 703
```

`ColorPicker.vue:133,141` imports both statically and mounts `<PointerDebugOverlay />`
unconditionally (`:103`). The gate is runtime-only — `usePointerDebug.ts:34–38` checks
`location.hash/search` for `debug=1` — so the graph is in the eager chunk for every user. The
same file takes the opposite decision for the blob eleven lines earlier
(`:157 defineAsyncComponent(() => import("./visual/HeroBlob.vue"))`, with a 9-line comment
justifying the split). One component, two contradictory bundle policies.

Worse, `ComponentSliders.vue:117` and `SpectrumCanvas.vue:52` both do
`inject(POINTER_DEBUG_KEY)!` and call `debug.log(...)` unguarded — so the picker's two *controls*
throw if mounted anywhere but inside `ColorPicker.vue`. A diagnostic instrument has become a
structural dependency of the product controls.

**Cure.** The instrument was built for a specific iOS-Safari reka-ui pointer-capture hunt. Either
delete it, or make it a `platform/` dev tool behind `import.meta.env.DEV` + a dynamic import, with
the two controls taking `inject(POINTER_DEBUG_KEY, null)` and an optional call.

### L-10 — MINOR — Alias and wrapper cruft in the domain the picker computes through

- `demo/color-session/color-model.ts:58` — `export const CSS_NATIVE_SPACES = CSS_PICKER_SPACES;`
  A pure rename with **zero** consumers in the entire tree (only a 2026-era H-tranche audit doc
  mentions the name). Dead export.
- `:60–64` `colorToHexString(color) { return pickerColorToHex(color); }` — a pure delegate; 10
  call sites all pay the extra name.
- `:66–71` `toCSSColorString(color, _digits: number = 2)` — a pure delegate to
  `serializePickerColor` carrying a **dead second parameter**. `ColorPicker.vue:293` and
  `useColorPipeline.ts:214–216` still spell it. A vestigial signature is exactly the back-compat
  shim edict 2 forbids.
- `demo/color-session/valueDomain.ts` — 49 lines, 38 of them a docstring, wrapping one call
  (L-1b).

### L-11 — MINOR — Dead-API documentation cited as library authority

`valueDomain.ts:7,12` and `readoutReservation.ts:21,26` describe their derivations as coming from
*"the library's own `COLOR_SPACE_RANGES` + `COLOR_SPACE_DENORM_UNITS`"* and *"the same
`getColorSpaceBound` ranges"*, and `valueDomain.ts:44` cites
`src/units/color/conversions/kelvin.ts`.

```
$ ls src/units          → No such file or directory
$ grep -rn "COLOR_SPACE_RANGES\|getColorSpaceBound\|COLOR_SPACE_DENORM_UNITS" src/   → (nothing)
```

None of these symbols or paths exist. `demo/DESIGN.md:81` repeats it. This is the same class
already cured once for the demo colour-space docs at commit `4c1e9270` ("retire dead-API source
refs"); the picker's two derivation modules were missed. The prose asserts a library provenance
the derivation does not have — it actually derives from the demo's own `PICKER_CHANNELS`
(`readoutReservation.ts:42,91,95`), which is L-1's duplicate.

### L-12 — MINOR — Two live `ColorSpaceSelector` instances own one piece of state on `/`

Measured at 1440×900 on `#/`:

```
comboboxes: ["Select view", "Select color space", "Select color space"]
```

`ColorPicker.vue:39` mounts one in the picker header; `demo/scenes/about/AboutPane.vue:20` mounts
a second in the About title (visible in `safari-desktop-light/picker.png` as
*"About the color spaces, **Lab** ⌄"*). Both write `model.selectedColorSpace`. At 390 only one is
present because About is pane-index 1. Two simultaneous editors of one value, with no shared
open/close mutex — `ColorPicker.vue:243` `selectedColorSpaceOpen` is local, so Cmd+K opens only
one of the two.

**Cure.** One instrument owns the space selection (the picker header). About *reads* it —
`inject(COLOR_MODEL_KEY)` and render the name, or delegate to the same control mounted once via a
teleport. Not a second live editor.

### L-13 — INFO — W48's spec, and the visual-audit harness

- **W48 spec check.** `docs/tranches/V/reformation/waves/W46-W48.md` records W46 §6 handing the
  Picker chassis (`<Card>` → landmark-neutral, 0px outer growth, Blob footprint re-centre) to W48,
  and W48 owns "PR-01..03; pointer↔keyboard↔numeric↔AT parity; Blob 0px chassis". Against today's
  tree the *visual* clauses still read correctly — `ColorPicker.vue:6` is still a
  `<Card tier="resting">`, `:12` still carries the sentinel, `seat.css`/`header.css` still hold the
  0-seat blob formula. What the spec does **not** contain is any structural clause: nothing in
  W48 addresses `defineExpose`, the `colorPickerRef` service-locator, the boot/shell/palettes
  import edges, or the mobile action-bar loss (L-2). W48 as written would close GREEN with the
  BLOCKER intact. The spec is *incomplete*, not wrong.
- **Audit-harness artifact.** All 60 captures in
  `docs/tranches/V/megatranche/audit/visual/REPORT.json` rendered **this component**. The harness
  navigated to path URLs (`http://localhost:9000/palettes`) against a hash router
  (`demo/color-picker/router/index.ts:41 createWebHashHistory`), so every capture landed on
  `…/palettes#/` = the `/` view. Proof: every desktop row reports identical
  `allElements: 1744`, `bodyTextLength: 897`, and `url` ends in `#/`. Consequently the report's
  headline "smallTapTargets — 60" is one component's defect counted 60 times: the four channel
  letters `L/A/B/ALPHA` at **12×24** desktop and **12×44** mobile (from
  `controls/ComponentSliders/ConsoleRail.vue`), plus the account-slug input at 160×23/160×20. The
  "consoleErrors — 60" rows are all the single `VITE_API_URL` dev-misconfiguration notice.
- **Silent default.** `demo/shell/usePaneRouter.ts:94` — `componentFor()` ends `return ColorPicker;`,
  so any unknown left-pane name silently renders the picker rather than failing. A masking
  fallback in the shell's dispatch table.

---

## The greenfield lattice

If this were built today with no legacy, concretely:

**Library (`src/`) — publish the schema, not just the constructors.**

```
/color   Color<S>, AnyColor, SpaceId, ChannelsBySpace
         SPACE_SCHEMA  (channels: {key, min, max, unit, hue}[], css: boolean)   ← publish
         SPACE_IDS, isAnyColor, makeColor(space, channels, alpha)               ← publish
         withChannel · withAlpha · channelAt · clampToDomain                    ← promote from demo
         convertColor · mapColorToGamut · mixColors · toRgba8 · interpolateHue
/css     parseCssColor · serializeCssColor  (+ hex encode/decode, the one home for hex validity)
```

That single change deletes `buildColor`, `CSS_PICKER_SPACES`, `clampPickerColor`,
`valueDomain.ts`, the hex regex in the component, and the channel-name half of `PICKER_CHANNELS`
— roughly 150 demo lines, all of them re-derived library knowledge.

**Demo — four layers, one direction, no forwarding.**

```
app/                composition root: model, pipeline, provides, router, overture, boot
shell/              dock (owns ActionBar rendering), pane routing, keyboard map, scene continuity
color-session/      colour domain + display-space policy + the EDIT SESSION
                      useColorPipeline          (already correct)
                      useColorEditSession       ← NEW: editTarget · commit · cancel · isEditing
                      useActionBarContext       ← NEW: assembled here, provided by app
                      displaySpace.ts           ← the ONE hex/display-space home (11 sites → 1)
picker/             a PURE injected consumer, zero exposes, zero emits beyond intent
                      ColorPicker.vue           header + spectrum + sliders + blob seat
                      display/ · controls/ · visual/
```

Edges permitted: `app → shell|color-session|feature`, `shell → color-session`,
`feature → color-session`. `ColorPicker.vue` imports exactly: `vue`, `@mkbabb/glass-ui[/dom]`,
`../color-session/*`, `./`-relative descendants. Nothing else. Its four illegal edges (L-3) all
disappear because the state they reach for lives in `color-session`.

**`ColorPicker.vue` after the transposition.** The template is unchanged. The script drops:
`defineExpose` (12 → 0), the edit state machine (`:271–309`), `actionBarContext` (`:315–328`),
the window keydown handler + `useMagicKeys` (`:247–267`, `:376–379`), the hex regex (`:224–229`),
the `VIEW_MANAGER_KEY`/`COLOR_TARGET_PORT_KEY`/`OVERTURE_KEY` injections, and the debug provide.
What remains is a header, a spectrum, sliders, a blob seat and two model watchers — roughly
**120 lines**, down from 414. That is the shape of a route leaf.

---

## Proved negatives

These were interrogated and are **clean** — recorded so the next seat does not re-hunt them.

1. **The demo consumes value.js only through the published export map.** All 51 `@mkbabb/value.js`
   import sites in `demo/` use bare subpath specifiers (`/color`, `/css`, `/math`, `/easing`,
   `/quantize`); zero deep paths, zero `@src` (the `@src` alias survives only for
   `assets/docs/*.md?source` reference pages, `vite.config.ts:73`). The aliases are **generated
   from `package.json#exports`** (`vite.config.ts:36–50`) and resolve to `dist/`, so a demo import
   that a real consumer could not write is structurally impossible. This is the one axis of the
   library boundary that is *right*.
2. **The three parallel `useDark` stores are dead.** One authority remains — glass-ui's
   `useGlobalDark` — at all 10 demo call sites including both picker-subtree ones
   (`ConsoleRail.vue:127`, `HeroBlob.vue:94`). `useMarkdownHighlighting.ts:70–80` documents the
   kill. Suspect cured.
3. **No component is imported both directly from glass-ui and via a `demo/ui/` barrel.** The only
   direct root-specifier imports are composables (`useClipboard`, `useTouchGate`,
   `writeClipboard`). The forwarding layer is redundant (L-6) but not a true two-implementations
   fork.
4. **`demo/palettes/export.ts` / `usePaletteExport.ts` / `export/serializers`** are outside this
   component's import cone entirely — nothing in `demo/picker/**` reaches them.
5. **`ActionBarLayer`'s local `useLayerTransition` reimplementation** — not present in the current
   file. `ActionBarLayer.vue:22` does carry one real smell (`provide(COLOR_MODEL_KEY,
   actionBar.colorModel)` re-provides a key App already provides at root — a no-op only because
   the object is identical), but it is a consequence of L-2's prop-chain, not an independent
   transition-machinery duplicate.
6. **Page errors, horizontal overflow, blank renders: 0** across all 60 captures. The picker
   renders correctly in both schemes at both widths.

---

## Verdict

**DEFECTIVE.** The premise holds. The strongest defect is L-1: `src/color/model.ts` implements
`SPACE_SCHEMA`, `SPACE_IDS`, `makeColor` and `isAnyColor`, the barrel `src/color/index.ts`
withholds all four, and the flagship consumer therefore reconstructs them in
`demo/color-session/picker-color.ts` — including a 17-case `switch` that is `makeColor` with the
type safety stripped, sitting in the slider hot path. The library's public surface is defined by
what its demo could not use.

L-2 is the strongest *product* consequence: because `ActionBarContext` and the edit state machine
live in a KeepAlive'd route leaf reached by instance ref, the picker's entire action bar — Reset,
Copy, Random, Palettes, Extract, colour input — is measurably absent at 390px, and palette
apply/edit silently degrade to different semantics.
