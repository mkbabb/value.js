# Arm B — value.js DEMO Truth Sweep

Scope pins: value.js `tranche-u@db77dbd8` (working tree). All paths below are
under `/Users/mkbabb/Programming/value.js/`. This sweep is INDEPENDENT of the
Codex `vnext/` corpus (never read). Evidence is file:line; glass-ui internals
read at `/Users/mkbabb/Programming/glass-ui/src`.

---

## 0. Correcting the stale record (MEMORY.md drift)

MEMORY.md describes the demo as `demo/@/components/...` with "~178 shadcn-vue
files in `demo/@/components/ui/`". **That tree no longer exists.** The demo was
restructured (W43/RF-15 killed the `@…` path aliases — `vite.config.ts:68`).
The live layout is a flat, physically-colocated tree rooted at `demo/`, with the
single app entry at `demo/color-picker/`. Any downstream plan citing
`demo/@/components` is citing a dead path (see §2, the stale `components.json`).

---

## 1. Component census (as-is)

**Single app.** `vite.config.ts:244,284` set `root: "./demo/color-picker/"` for
both `gh-pages` and `dev`. There is exactly ONE demo application (the color
picker); every other top-level `demo/` dir is a relatively-imported feature
module of it. No second app in this repo.

**Totals:** 259 source files (`.vue`/`.ts`/`.css`) under `demo/` (excl.
node_modules). Per top-level dir (files → LOC):

| Dir | .vue | .ts | .css | LOC |
|---|---|---|---|---|
| `palettes/` | 32 | 52 | 0 | 9015 |
| `workbenches/` | 19 | 17 | 0 | 6327 |
| `color-session/` | 3 | 24 | 0 | 3342 |
| `picker/` | 8 | 9 | 2 | 3590 |
| `shell/` | 15 | 7 | 0 | 3045 |
| `color-picker/` (entry) | 2 | 14 | 1 | 2596 |
| `scenes/` | 7 | 6 | 0 | 1679 |
| `styles/` | 0 | 0 | 6 | 1692 |
| `platform/` | 0 | 10 | 0 | 852 |
| `test/` | 0 | 3 | 0 | 682 |
| `shared/` | 2 | 1 | 0 | 373 |
| `ui/` (barrels) | 0 | 19 | 0 | 29 |

**Views/panes** (router-driven, `demo/color-picker/router/index.ts:21-38`, 15
routes): picker `/`, palettes `/palettes`, browse `/browse`, extract `/extract`,
mix `/mix`, generate `/generate`, gradient `/gradient`, atmosphere
`/atmosphere`, blob `/blob`, + 5 admin routes `/admin/{users,names,audit,flagged,tags}`.

**Largest SFCs** (god-module watch): `picker/ColorPicker.vue` 414,
`scenes/about/markdown/Markdown.vue` 408, `ComponentSliders.vue` 395,
`workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` 392,
`palettes/browser/admin/AdminUsersPanel.vue` 391, `PaletteCard.vue` 364,
`palettes/BrowsePane.vue` 360, `ConsoleRail.vue` 329. None are egregious
god-modules; the `palettes/` subtree (9k LOC / 84 files) is the heaviest feature.

---

## 2. Colocation vs the recursive-colocation edict

The tree is **largely compliant** post-W43: every feature owns a colocated
`composables/` (14 of them): `color-picker/`, `picker/`,
`picker/controls/ComponentSliders/`, `picker/controls/SpectrumCanvas/`,
`shell/dock/`, `scenes/about/markdown/`, `palettes/browser/card/`,
`palettes/browser/dialog/`, and the 5 workbench trees. Feature sub-components
nest correctly (e.g. `workbenches/gradient/GradientVisualizer/easing/`,
`palettes/browser/card/PaletteCard/`). No stray top-level `demo/composables/`
god-bucket exists (MEMORY's `color/ palette/ auth/` bucket is gone; its role is
now split across `color-session/` and `platform/`).

**Module-level composable homes (legitimate, not violations):**
`color-session/` (24 files — the shared color-state spine: `color-model.ts`,
`useColorPipeline.ts`, `useColorUrl.ts`, `useColorParsing.ts`, `keys.ts`, …),
`platform/{transport,auth,storage}/` (the app's I/O/session spine).

**Colocation smells / violations found:**
- **`demo/ui/` (19 barrels) — a shim indirection layer.** Each file is a 1-line
  re-export forwarding to `@mkbabb/glass-ui` (e.g. `ui/button/index.ts` →
  `export { Button } from "@mkbabb/glass-ui"`; `ui/input/index.ts` →
  `@mkbabb/glass-ui/forms`). These are NOT components; they are a compat barrel
  the demo still routes 48 import sites through (§3). Per the no-shims edict
  this whole dir is a dissolution target.
- **Stale `components.json` at repo root** — a shadcn-vue config
  (`"$schema": "https://shadcn-vue.com/schema.json"`) pointing at
  `"components": "demo/@/components"` (DEAD path) and `"css": "@styles/style.scss"`
  (Sass, removed in the Feb-2026 migration). A dead artifact; a live shadcn
  scaffolding config on a repo the owner wants shadcn-free (C5).
- **`ActionBarLayer.vue:62-81`** hand-rolls a local `useLayerTransition` shim
  because glass-7 removed the public composable (self-documented, relay-noted).
  A colocated stopgap, retire-on-adopt.

---

## 3. shadcn usage census (COMPLETE)

**Headline: shadcn is already abrogated at the component layer.** There are ZERO
shadcn-vue component implementations left in the demo. The `demo/ui/*` dirs are
pure re-export barrels onto `@mkbabb/glass-ui`. So the C5 work is (a) dissolve
the barrels, (b) delete the stale `components.json`, (c) close the 4 reka-ui type
leaks — NOT reimplement components.

**Barrel importer census** (48 sites route through `demo/ui/*`; every one has a
glass-ui equivalent — it IS glass-ui):

| ui barrel | importer sites | glass-ui source | equiv? |
|---|---|---|---|
| button | 22 | `@mkbabb/glass-ui` `Button` | YES |
| card | 12 | `Card*` | YES |
| popover | 7 | `Popover*` | YES |
| badge | 7 | `Badge` | YES |
| select | 6 | `Select*` | YES |
| slider | 5 | `Slider` | YES |
| dialog | 5 | `Dialog*` | YES |
| tooltip | 4 | `Tooltip*` | YES |
| skeleton | 4 | `Skeleton` | YES |
| input | 4 | `@mkbabb/glass-ui/forms` `Input` | YES |
| dropdown-menu | 4 | `DropdownMenu*` | YES |
| separator | 3 | `Separator` | YES |
| radio-group | 2 | `RadioGroup*` | YES |
| checkbox | 2 | `Checkbox` | YES |
| avatar | 2 | `Avatar*` | YES |
| alert | 2 | `Alert*` (+ `AlertVariants`) | YES |
| collapsible | 1 | `Collapsible*` | YES |

**Direct glass-ui imports (bypass the barrels):** 79 files already import
`@mkbabb/glass-ui` (or subpaths `/dock`, `/watercolor-dot`, `/easing`,
`/fading-scroll`, `/chip`, `/forms`) directly. So the demo is a two-track
importer (barrels + direct) — an inconsistency C5 must unify onto direct
glass-ui imports.

**reka-ui primitive leak (4 sites, type-only):** `AcceptableValue` imported
straight from `reka-ui` at `workbenches/mix/MixConfigBar.vue:15`,
`workbenches/generate/GenerateControls.vue:33`,
`scenes/atmosphere/AuroraPane.vue:25`,
`workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:28`. A
low-level primitive-type leak that should route through a glass-ui-exported type.

---

## 4. Routing + URL/state (as-is; share-URL facility EXISTS)

**Router:** `vue-router` in **hash mode** (`createWebHashHistory()`,
`router/index.ts:41`) — chosen for GitHub-Pages static hosting (`:12`). The
routes use **`Stub = { render: () => null }`** components (`:19`); there is NO
`<router-view>`. Routes are a NAVIGATION MODEL only — the route name drives
`useViewManager` (`shell/useViewManager.ts`) which selects the pane layout in
`App.vue` (`:16-18` comment). `installDocumentTitle(router)` (`:48`) tracks the
picked color + pane into the tab title.

**State management:** the color-state spine lives in `color-session/` — a
`shallowRef<ColorModel>` (`color-model.ts`) fed through `useColorPipeline.ts`,
persisted via `useColorPersistence.ts` + `platform/storage/useSafeStorage.ts`,
provided by injection keys (`color-session/keys.ts`: `CSS_COLOR_KEY`,
`SAFE_ACCENT_KEY`, `COLOR_MODEL_KEY`, `EDIT_TARGET_KEY`). Pane routing state is
`shell/usePaneRouter.ts` + `useViewManager.ts` + `viewSchema.ts`. Server/session
state is `platform/{transport,auth}` (a typed `client.ts` + `useApiClient.ts`,
`api-problem.ts`, `sessions.ts`, `sessionToken.ts`).

**Share-URL facility (yes, it exists but is thin):**
- `color-session/useColorUrl.ts` — bidirectional sync of `{space, color}` as
  **router query params** (`/#/browse?space=oklch&color=oklch(...)`). URL→Model
  on load + on back/forward (`:70-76`); Model→URL debounced 300ms + generation-
  guarded to break the cycle (`:22,51-65`); writes via `router.replace`.
- Boot seed precedence `hydrate.ts:53-56,94-99`: URL hash (`window.location.hash`
  parsed with `URLSearchParams`) WINS, else localStorage, else default.
- Share action: `App.vue:365-366` `shareLink = () => copyLink(window.location.href)`
  (emitted from the dock, `Dock.vue:32`; consumed `App.vue:40`).
- **Gap:** ONLY color+space are URL-encoded. Pane/view, palette slug, gradient
  stops, mix inputs, generate config, admin route etc. are NOT in the shareable
  query (route path carries the view, but workbench state is ephemeral). No
  general URL-state facility — C6's "robust URL state + share-URL" is a real
  net-add.

---

## 5. Owner-mark code traces (file:line)

### Mark C3 — mobile toolbar LOST (dock responsive)

The "tools bar" is the 5-action `ActionToolbar.vue` (reset/copy/random/palettes/
extract, `:2-62`, laid out `flex items-center justify-around flex-1`). It is NOT
a persistent bar — it is mounted **inside a collapsible dock LAYER**:
`ActionToolbar` ← `ActionBarLayer.vue:102` ← the `action-bar` `<DockLayer>`
(`Dock.vue:153-158`), which only renders when the user toggles the **Tools**
button (`ActionBarToggle.vue`, `Dock.vue:182-190`).

Responsive mechanics:
- `Dock.vue:71` `isDesktop = useMediaQuery("(min-width: 1024px)")`;
  `:132` `<GlassDock … :always-expanded="!isDesktop">`.
- On mobile the Tools trigger collapses to icon-only: its label and the
  ArrowRight affordance and the desktop separator are all gated
  `v-if="isDesktop"` / `hidden lg:block` (`ActionBarToggle.vue:82,96,103`).
- The mobile dock main layer instead surfaces `PaneSegmentedControl`
  (`Dock.vue:197-204`, `.dock-mobile-panes`) + `MobileMenuDropdown` (lg:hidden,
  `menus/MobileMenuDropdown.vue:38`). The 5 tool actions are reachable ONLY by
  first tapping the icon-only Tools trigger to swap into the action-bar layer —
  and the header comments (`Dock.vue:180-196`, `ActionBarToggle.vue` header)
  record that below `sm` the 312px aperture was already crowding controls out.
- Net: on a phone the toolbar's affordance is a single unlabeled icon that swaps
  the whole dock into another layer — the "lost toolbar" the owner marks.
  Anchor set for redesign: `Dock.vue:71,132,182-204`; `ActionBarToggle.vue:82,96,103`;
  `ActionToolbar.vue:1-62`; `ActionBarLayer.vue:100-143`.

### Mark C2 — easing-curve selector (too rounded / too large / low-res on mobile)

The selector is a two-part demo composition seating the **glass-ui `EasingPicker`**:
- Demo host: `workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue`
  (an accordion of per-interval specimen rows). Two children:
  - `easing/EasingSpecimenStrip.vue` — the SELECT surface: a horizontal
    `FadingScroll` of glass-ui `Chip mode="selectable" shape="cell"` tiles, each
    holding an SVG sparkline (`viewBox="0 0 1 1"`, `vector-effect="non-scaling-
    stroke"`, `:114`). Tiles `min-width: 2.75rem` (`:170`), glyph `1.375rem`
    (`:176`).
  - `easing/EasingAuthoringStage.vue` — the AUTHOR surface: glass-ui
    `<EasingPicker :readout="false" :playback="false">` (`:76-82`). The seat
    imposes three CSS `:deep()` overrides (`:88-115`): one column, wells-not-
    cards, and a "zero-letterbox" law that sizes the picker SVG
    `inline-size: min(100%, 19rem); aspect-ratio: calc(1/var(--vb-ratio))`
    (`:104-107`), where `--vb-ratio` is read from the live viewBox each frame
    (`:47-53`).
- Rendering approach (glass-ui `EasingPicker.vue`): **pure SVG**, NOT canvas —
  `viewBox="0 0 1 1"` bezier canvas (`:340-344`, `preserveAspectRatio="xMidYMid
  meet"`), curve drawn as `<path stroke-width="0.035">` in unit space (`:367`),
  grid lines `0.006`, handles `0.02`. Control points **rounded to 3 decimals**
  (`useEasingPicker.ts:162-163,191`; `EasingPicker.vue:396` `toFixed(3)`).
  Steps rounded `Math.round(next.steps)` (`:169`).
- Diagnosis of the marks (evidence-anchored, mechanism named):
  - "too large" — the mobile seat sizes the picker at up to `19rem` (≈304px)
    with NO mobile-specific shrink (`EasingAuthoringStage.vue:104`).
  - "too rounded" — stroke widths are UNIT-RELATIVE (`0.035` of the box), so at
    304px the curve renders a very thick, blobby stroke; the SpecimenStrip tiles
    are `shape="cell"` rounded Chips.
  - "low-res" — the curve itself is resolution-independent SVG; the perceptible
    coarseness is the **3-decimal point quantization** on drag
    (`useEasingPicker.ts:162`) making the curve step, not the raster. This is a
    **glass-ui-owned** render surface (`EasingPicker.vue`) — the redesign is a
    glass-ui batch item (C5/§4) surfaced through the demo seat.

### Mark C10 — watercolor-dot components + hover/procedural-beget + slider value styling

- **The component is glass-ui `WatercolorDot`** (`@mkbabb/glass-ui/watercolor-dot`),
  consumed at ~20 sites across 7 demo files: `shell/dock/Dock.vue:136,138,271`
  (the collapsed dock "wax seal"), `picker/controls/ComponentSliders/ConsoleRail.vue:57`
  (the active-channel indicator), `picker/controls/SpectrumCanvas/SpectrumCanvas.vue:23`,
  `workbenches/mix/{MixResultDisplay,MixSourceSelector}.vue`,
  `workbenches/generate/GenerateControls.vue:199`,
  `workbenches/extract/ImageEyedropper/ImageEyedropper.vue:18,26`,
  `shared/ui/EmptyState.vue:45-47`, `color-session/ColorSpaceSelector.vue:81`,
  `palettes/browser/card/{CurrentPaletteEditor,SwatchHoverMenu}.vue`.
- **Render approach** (`glass-ui/src/components/watercolor-dot/`): a seeded
  `border-radius` blob silhouette (PRNG off `hashString(color+seed)`,
  `WatercolorDot.vue:81-86`) with a wet bleeding edge = an **internalised,
  per-instance-namespaced SVG feTurbulence + feDisplacementMap filter**
  (`:12-22,76-78`). Two variants: `solid` | `ghost` (dashed outline of the same
  silhouette, `:38-51`). An optional `animate` prop drives a seeded COMPOSITOR
  transform wobble via the library's single `useRAFLoop` (`useWatercolorBlob.ts:3,73`).
- **Hover / procedural-beget: DOES NOT EXIST YET.** grep for
  `@mouseenter|@pointerenter|:hover|beget|spawn|procedural` near every demo
  WatercolorDot site returns nothing; the component exposes no hover/beget API
  and every demo consumer passes only `color`/`seed`/`variant` (static; most
  don't even pass `animate`). The C10 "dots animate/change on hover and
  procedurally beget" is a **net-new behavior** to design into glass-ui and wire
  in the demo — not a refinement of existing code.
- **Slider value styling** (`picker/controls/ComponentSliders/`): the channel
  sliders are glass-ui `Slider variant="spectrum"` (`ComponentSliders.vue:65-82`)
  fed three token vars (`--slider-thumb-bg`, `--slider-thumb-border-color`,
  value-aware needle, `:189-204`); the live value renders as a plain
  `<span class="channel-meter fira-code">` (`:84-86`). The only watercolor-dot in
  the slider area today is the ConsoleRail ACTIVE-CHANNEL indicator
  (`ConsoleRail.vue:38-63`, seated in a demo-owned positioned box per the
  T.W8-P1-R1 note `:44-56`). The C10 ask — "slider-area value styling with little
  watercolor-dot backgrounds" — is likewise a net-add (no per-value dot
  backgrounds exist on the meters).

---

## 6. Palette API surface (C7 anchor)

Demo-side API client at `demo/palettes/api/` (typed fetch wrappers, not the
backend — the backend is `/api`). CRUD/mixing/history facilities enumerated:
- `palettes.ts`: `listPalettes`, `getPalette`, `createAndSavePalette`,
  `updatePalette`, `renamePalette`, `publishPalette`, `unpublishPalette`,
  `votePalette`, `deletePaletteUser`, `flagPalette`, `paletteETag` (ETag/`ifMatch`
  optimistic-concurrency — `:121,133`).
- `versions.ts`: `listVersions`, `revertPalette`, `forkPalette` (history/fork).
- `colors.ts`, `tags` (`getTags`), + `admin-{audit,users,colors,palettes}.ts`.
Transport spine: `platform/transport/{client,useApiClient,api-problem,availability}.ts`.
This is the surface C7 wants fully specified + made isomorphic to fourier's CRUD
viz API (fourier not read in this arm).

---

## 7. Load-bearing conclusions

1. shadcn is already component-abrogated — remaining C5 work is barrel
   dissolution (`demo/ui/`, 48 sites), stale `components.json` deletion, and 4
   reka-ui type-leak closures. Not a reimplementation.
2. Two-track glass-ui imports (48 barrel + 79 direct) is the real inconsistency.
3. Mobile toolbar (C3): the 5 actions are buried behind an icon-only layer-swap
   trigger below `lg`; no persistent mobile tool affordance.
4. Easing selector (C2): glass-ui `EasingPicker` (SVG, unit-relative strokes,
   3-decimal point quantization) seated at up to 19rem with no mobile shrink;
   the redesign is a glass-ui batch item surfaced via the demo seat.
5. WatercolorDot hover/procedural-beget (C10) is NET-NEW — no such behavior
   exists in glass-ui or demo today; consumers pass static seeds.
6. Share-URL facility exists but encodes only `{color,space}`; C6's robust
   URL-state/share is a genuine net-add.
