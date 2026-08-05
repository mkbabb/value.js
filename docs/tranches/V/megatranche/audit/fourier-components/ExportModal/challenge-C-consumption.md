claude-opus-5[1m]

# CHALLENGE · ExportModal.vue · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ExportModal.vue` (114 lines)
**Date** 2026-08-05 · **Method** static + source-derived only (component tree, `node_modules` dist of the three producers, lockfile, in-tree test artifacts). No browser tooling. Livable-only claims tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every claim carries its own falsifier; five hypotheses died against the tree and are recorded as kills (§4), not deleted.

## §0 · Read surface (whole, read-only)

| File | Lines read | Why |
|---|---|---|
| `web/src/components/visualization/ExportModal.vue` | 1–114 (whole) | target |
| `web/src/components/visualization/VisualizationView.vue` | 1–130, 180–290 | **sole** mount site (`:281`), the `doExport` sink (`:98-102`), the `hasEpicycles` source (`:122`) |
| `web/src/components/visualization/BasisCanvas.vue` | 100–150, 300–340, 440–520 | the **terminal** sink — `exportFrame(options)` (`:462-513`) + `defineExpose` (`:515`) |
| `web/src/components/visualization/FullscreenViewer.vue` | 100–150 | the *second*, modal-free export entry (`:138`) |
| `web/src/components/visualization/AnimationControls.vue` | 29, 120 | the `exportFrame` emit that raises the modal |
| `web/src/components/visualization/composables/useViewState.ts` | 1–40 | the app's view-preference persistence precedent |
| `web/src/components/visualization/gallery/GalleryCardModal.vue` | 1–110 | sibling always-open Dialog (the *other* spelling of the same trick) |
| `web/src/components/visualization/GalleryView.vue` | 151–173, 401–440 | the canonical `v-model:open` Dialog idiom + footer button idiom |
| `web/src/components/visualization/gallery/AdminFlaggedPanel.vue` | 265–280 | ditto (`surface="opaque"` + `DialogDescription`) |
| `web/src/components/visualization/gallery/AdminUserList.vue` | 455–470 | ditto |
| `web/src/lib/colors.ts` | 1–60 | the hand-rolled colour arms named by the axis (F.W2 surface) |
| `web/src/style.css` | 1–60 | the token cascade entry (`:3` → glass-ui styles) |
| `web/package.json`, `web/package-lock.json` | whole / glass-ui + value.js nodes | pin + peer truth |
| `web/DESIGN.md` | 25–40 | the migration ledger row for this component |
| `web/e2e/visualization-ux.spec.ts` | 15–60, 100–170 | `checkA11y` + the ExportModal keystone |
| `web/e2e/visualization-crud.spec.ts` | 628–660 | the consolidated ExportModal keystone |
| `web/test-results/.last-run.json` + `…-is-clean-desktop-mutating-chromium/error-context.md` | whole | the last recorded run of that keystone |
| `@mkbabb/glass-ui@4.0.0` `dist/dialog.js`, `DialogContent-DDE6pQBU.js`, `Switch-Dr--uLGH.js`, `button-BNDWhAZb.js`, `useSurfaceAxis-*.js`, `useSpringMount-*.js`, `x-*.js`, `createLucideIcon-*.js`, `styles/tokens/color-radius.css`, `styles/utilities/{animate,btn,base}.css`, `package.json` | consumed primitives + token vocabulary + peer block |
| `reka-ui@2.9.10` `dist/Dialog/{DialogRoot,DialogContentImpl,DialogContentModal,utils}.js`, `dist/Switch/SwitchRoot.js` | the actual guarantees behind the component's comments |
| `@mkbabb/keyframes.js@4.3.0` `dist/*.js` (import graph), `package.json` | whether the dialog path reaches value.js |
| `axe-core@4.11.4` `axe.js` (`nativeElementType`, `button-name`, `aria-toggle-field-name`) | whether the a11y gate can see §3 D-21 |
| corpus: `formation/fourier/lane-frontend.md` (46, 59–70, 95, 317–319, 478–492, 636–640), `CENSUS-2026-08-03.md` (37–38, 73, 105–109, 184–185, 219–220), `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (§0) | fold, don't re-invent |

**Consumption baseline, measured.** value.js symbols: **0**. keyframes symbols: **0** (direct). fourier API operations: **0 of 45**. glass-ui symbols: **6** (`Button`, `Switch`, `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogFooter` — 7 identifiers over 3 subpaths, `:3-11`). Third-party: `lucide-vue-next` ×1 (`:12`). Vue: `ref` only (`:2`).

This is consistent with the corpus: lane-frontend §5 fixes the whole repo's value.js surface at *5 statements / 4 files / 6 symbols, easing-only*, and ExportModal is in none of them; CENSUS row 38 concurs. **The F.W2 migration surface (bare specifiers → subpath; delete the `colors.ts` hand-rolled arms) does not touch this file.** What *does* touch it is the other half of the tri-package deadlock (lane-frontend:492, CENSUS:109): this component is a pure glass-ui consumer sitting on top of a **declared-invalid** producer peer (D-6), and it hand-rolls one colour expression that glass-ui already ships as a token (D-10).

---

## §1 · BLOCKER

### D-1 · BLOCKER · Two of the four switches in this dialog do nothing. `withEpicycles` and `withTrail` are emitted and then dropped on the floor.

`ExportModal.vue:23-26,36-41,55-70` → `VisualizationView.vue:99-102` → `BasisCanvas.vue:462-513`

The modal offers four toggles and emits all four:

```
ExportModal.vue:36-41   emit("export", { withEpicycles, withTrail, withGrid, withLabels })
```

The terminal sink destructures **two**:

```
BasisCanvas.vue:466-469
    const {
        withGrid: showGrid = true,
        withLabels: showLabels = true,
    } = options;
```

`withEpicycles` and `withTrail` are never read anywhere in `exportFrame`'s body (`:462-513`). The epicycle decision is re-derived from a *different* input — `props.activeBases.includes("fourier-epicycles")` at `:489` — so the user's "Epicycles" switch cannot influence it. The trail is drawn unconditionally inside the two frame painters (`trail.draw(...)` at `:145` and `:330`), which `exportFrame` calls at `:492`/`:494` with no trail flag in scope.

So: turning **Epicycles** off and exporting yields a PNG **with** epicycles (whenever `fourier-epicycles` is an active basis, which is exactly when the row is rendered — `ExportModal.vue:55` `v-if="hasEpicycles"`). Turning **Trace path** off yields a PNG **with** the trace. The controls are live-looking (reka-ui `SwitchRoot` toggles `data-state`, the thumb translates), so the failure is silent and indistinguishable from success on the affirmative case (default = both ON).

**Severity rationale.** Half of this component's entire reason for existing is inoperative, and it is inoperative in the direction users notice (they toggle *off* to remove clutter). It is user-facing, deterministic, and shipping.

**Falsifier.** Any read of `withEpicycles` / `withTrail` — under any alias — inside `BasisCanvas.vue` or its trail/frame helpers would kill this. Run: `grep -n "withEpicycles\|withTrail" web/src/` → exactly four hits, all four inside `ExportModal.vue` (`:23,24,37,38` plus the template `v-model`s). Zero hits outside. Second falsifier: a *different* sink for the `export` emit — `grep -n "@export" web/src` → one hit, `VisualizationView.vue:281`, forwarding to `doExport` → `canvasComponent.exportFrame` and nowhere else.

**Corpus.** Not previously booked. lane-frontend:95 inventories this file as "Export dialog (`Dialog` + `Switch`)" — a shape row, not a behaviour row. The 2026-05-26 L4/L5 audits examined its *chassis* (Teleport → Dialog) and never opened the options contract. This is new.

---

## §2 · MAJOR

### D-2 · MAJOR · The export-options contract is `Record<string, boolean>` at **both** ends, so D-1 is structurally invisible to `vue-tsc`.

`ExportModal.vue:19` (`(e: "export", options: Record<string, boolean>): void`) · `VisualizationView.vue:99` (`function doExport(options: Record<string, boolean>)`) · `BasisCanvas.vue:462` (`function exportFrame(options: Record<string, boolean> = {})`)

Three declarations of the same contract, none of them naming a single key. The producer can emit `withTrail`, the consumer can destructure `withTrai` or nothing at all, and `vue-tsc -b` (the `build` script, `package.json:8`) is satisfied at every step. The repo *has* the right home for the type — `web/src/lib/types.ts` is the shared contract module (it hosts `Visualization`, the palette fork substrate at `:217`, the atom-diff shapes at `:270-294`) — and this component declines to use it.

This is the enabling defect for D-1: with `type ExportOptions = { withEpicycles: boolean; withTrail: boolean; withGrid: boolean; withLabels: boolean }` shared across the three sites, the unused-destructure would still compile but the *absence* of `withTrail` handling becomes a one-line diff-visible fact, and any rename becomes a hard error.

**Falsifier.** A named exported options type referenced by two or more of the three sites. `grep -rn "ExportOptions\|ExportFrameOptions" web/src` → **0 hits**. Also: `Record<string, boolean>` appears in the repo **only** at these three sites (`grep -rn "Record<string, boolean>" web/src` → 3) — it is not a house idiom being applied consistently; it is this one contract, un-typed thrice.

### D-3 · MAJOR · The props contract carries the flag the sink ignores and omits the flag the sink needs: export is reachable while there is no data, and it downloads a blank PNG.

`ExportModal.vue:14-16` · `VisualizationView.vue:121,235-236` · `BasisCanvas.vue:463,481-500`

The modal's entire props surface is `hasEpicycles: boolean` (`:14-16`) — the flag the sink ignores (D-1). It carries **no** signal of data readiness, and it has no disabled state on "Save PNG" (`:75-78`).

Meanwhile the affordance that raises it is gated on `hasData` (`VisualizationView.vue:235` `v-if="hasData && !isEditing"`), and `hasData` is `store.epicycleData || store.basesData || store.computing` (`:121`) — **`computing` included**. During the compute round-trip both data fields are null, so the export path runs:

```
BasisCanvas.vue:471-474   offCanvas created at canvasRef dimensions
BasisCanvas.vue:481-483   const data = store.epicycleData; const basesData = store.basesData;
                          if (data || basesData) { …draw… }      ← false: nothing is drawn
BasisCanvas.vue:507-513   toDataURL("image/png") → <a download> → click()
```

The download is issued unconditionally at `:507-513` — outside the `if`. Result: a fully transparent PNG named `fourier-frame-<epoch>.png`, no error, no toast, and the dialog closes (`VisualizationView.vue:101`). The app has a toast channel in scope at that exact site (`VisualizationView.vue:13,35`, used at `:110,113`) and does not use it here.

**Falsifier.** (a) A data guard in `exportFrame` before the download — there is none; the `if (data || basesData)` at `:483` wraps only the painting. (b) A `hasData`-shaped prop or a disabled Save — `grep -n "disabled" ExportModal.vue` → 0. (c) An unreachable window: `store.computing` would have to never be true while `epicycleData`/`basesData` are null — the store sets `computing` precisely around the fetch. The *width* of the window is timing-dependent → `UNPROVEN-NEEDS-LIVE` (SS-13) for the race; the code path itself is statically certain.

### D-4 · MAJOR · `withLabels: false` is honoured by clearing a magic 200×100 box — the only option the modal *can* affect is implemented as a guess.

`ExportModal.vue:68-69` → `BasisCanvas.vue:502-504`

```
BasisCanvas.vue:502-504
    if (!showLabels) {
        offCtx.clearRect(0, 0, 200, 100);
    }
```

Not a draw-time flag: the frame is painted *with* labels and then a fixed rectangle in the top-left is erased. The context is in CSS-pixel space (`setTransform(s.dpr,0,0,s.dpr,0,0)` at `:476`), so the box is 200×100 CSS px regardless of canvas size. Two failure modes follow, both from the same line: it **over-clears** (any epicycle, grid, or trace geometry inside the top-left 200×100 region is destroyed — on a small stage that is a substantial fraction of the frame) and it **under-clears** (any label drawn outside that box, or wider than 200 px at large `--ui-scale`, survives).

The consumption reading: ExportModal presents "Labels" as a semantic option; the sink implements it as a coordinate. The modal has no way to know or express the constraint, because the contract is `Record<string, boolean>` (D-2).

**Falsifier.** A labels-aware draw path — `grep -n "showLabels\|drawLabels" BasisCanvas.vue` → `showLabels` appears only at `:468` (destructure) and `:502` (the clear); no painter takes a labels flag. Whether real content lands inside the box at production sizes is geometry-dependent → the *visual* half is `UNPROVEN-NEEDS-LIVE`; the mechanism is certain.

### D-5 · MAJOR · The Dialog's exit choreography can never run: `:open="true"` + parent `v-if` means the primitive never sees `data-state="closed"`.

`ExportModal.vue:46` (`<Dialog :open="true" @update:open="onOpenChange">`) · `VisualizationView.vue:281` (`<ExportModal v-if="showExport" …>`) · glass-ui `DialogContent-DDE6pQBU.js` (base class string) · glass-ui `styles/utilities/animate.css`

glass-ui's `DialogContent` composes `popover-animate` into its class list (the `w` constant: `"-translate-x-1/2 -translate-y-1/2 duration-normal popover-animate"`), and `popover-animate` is defined as a `data-state` pair: `data-[state=open]:animate-in data-[state=closed]:animate-out …` (`styles/utilities/animate.css`, the `@utility popover-animate` block). The scrim is the same story (`ModalOverlay` with `animate="fade"`, `DialogContent-*.js`).

The component pins `open` to the literal `true` and delegates *closing* to the parent's `v-if`, which destroys the entire `<Dialog>` subtree synchronously. reka-ui's `Presence`/`data-state` machinery therefore never transitions to `closed` — the modal and its scrim disappear in one frame, discarding the animation the substrate ships. The whole `popover-animate`/`ModalOverlay` cost is paid on entry and thrown away on exit.

The same tree contains the correct idiom: `GalleryView.vue:401` (`<Dialog v-model:open="batchDialogOpen">`, always mounted, parent owns the ref), matched by `AdminFlaggedPanel.vue:264-ff` and `AdminUserList.vue:460-ff`. Only the two "always-open + parent `v-if`" modals — this one and `GalleryCardModal.vue:36-38` — bypass it, and they don't even agree on the spelling (D-18).

**Falsifier.** (a) `popover-animate` not being state-keyed — falsified by the `@utility` body in `styles/utilities/animate.css`. (b) The parent keeping the node mounted — falsified by `VisualizationView.vue:281`'s `v-if`. (c) A `forceMount` escape — `grep -n "forceMount" ExportModal.vue` → 0. The *perceived* jank is `UNPROVEN-NEEDS-LIVE`; the mechanism is source-certain.

### D-6 · MAJOR · This component's three glass-ui subpaths sit on a **declared-invalid** producer peer: glass-ui@4.0.0 peers `value.js ^0.10.0 || ^0.11.0`; the app pins and installs 0.13.0.

`web/package.json:14,17` · `node_modules/@mkbabb/glass-ui/package.json` peerDependencies · `package-lock.json` (`node_modules/@mkbabb/glass-ui`) · measured

```
$ npm ls @mkbabb/value.js
├─┬ @mkbabb/glass-ui@4.0.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
├─┬ @mkbabb/keyframes.js@4.3.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
└── @mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
npm error code ELSPROBLEMS          ← exit 1
```

The root cause is a genuine triangle, not a typo: `@mkbabb/keyframes.js@4.3.0` **depends** (not peers) on `@mkbabb/value.js: ^0.13.0` (`node_modules/@mkbabb/keyframes.js/package.json`), so 0.13.0 is forced, and glass-ui@4.0.0's declared ceiling of 0.11 is violated by construction. Any installed tree that satisfies keyframes 4.3 violates glass-ui 4.0's peer block.

**Scope honesty — this is a contract defect, not a runtime hazard on this component's path.** I traced the import graph of the three entry points this file uses:

| entry | files in graph | external imports | reaches value.js? |
|---|---:|---|---|
| `@mkbabb/glass-ui/button` | 3 | `class-variance-authority`, `clsx`, `reka-ui`, `vue` | **no** |
| `@mkbabb/glass-ui/switch` | 3 | `clsx`, `reka-ui`, `vue` | **no** |
| `@mkbabb/glass-ui/dialog` | 10 | `@mkbabb/keyframes.js`, `clsx`, `reka-ui`, `vue` | **no** (see §4 K-2) |

So ExportModal cannot break *at runtime* from the mismatch. What it does is (a) make `npm ls` non-zero for the whole repo, (b) make `npm install --strict-peer-deps` / any peer-strict CI mode a hard failure (extrapolation — **not run**, since installing would mutate the read-only evidence tree), and (c) put this component's substrate inside the atomic tri-package uplift the corpus already books.

**Corpus.** Overlaps lane-frontend:59 (dep table row: value.js `^0.10.0` peer / `^0.13.0` declared / 0.13.0 installed) and lane-frontend:490-492 + CENSUS:108-109,219-220 (the *glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0* atomic transaction). **Increment over the corpus:** the corpus states the peer *floors*; it does not record that the **currently installed** tree is already peer-invalid today with a measured non-zero `npm ls`, nor that the invalidity is provably inert on the Button/Switch/Dialog paths. Both are new and both matter to F.W1 sequencing — the uplift can be scheduled on contract grounds, not fear of a live break.

**Falsifier.** A glass-ui 4.0.0 peer range admitting 0.13 (read the installed manifest — it does not), or a value.js import inside the three entry graphs (traced — none).

### D-7 · MAJOR · The modal is not the owner of export options: the fullscreen surface calls the same sink with **no** options at all.

`FullscreenViewer.vue:138` (`@export-frame="canvasComponent?.exportFrame()"`) vs `VisualizationView.vue:98-102`

The same `AnimationControls` "Export" menu item (`AnimationControls.vue:29,120`) means two different things depending on which surface hosts it: in the workspace it raises ExportModal and honours (some of) the options; in fullscreen it exports immediately with `options = {}` → `showGrid = true, showLabels = true` by default (`BasisCanvas.vue:466-469`). No dialog, no choice, no way to drop grid/labels — and, because the fullscreen `BasisCanvas` is a *second* instance (`FullscreenViewer.vue:121-126`), not even the same canvas.

The consumption defect is contractual: ExportModal presents itself as the export-options authority, but the sink accepts a defaulted, partially-specified `Record` (D-2) from anyone, so a second caller silently forks the behaviour. A required options parameter would have made the fullscreen path a compile error.

**Falsifier.** `grep -rn "exportFrame(" web/src` → two callers: `VisualizationView.vue:100` (with options) and `FullscreenViewer.vue:138` (without). If `exportFrame`'s parameter were required rather than `= {}` (`BasisCanvas.vue:462`), `:138` would not typecheck.

---

## §3 · MINOR

### D-8 · MINOR · No `DialogDescription`: the dialog ships a **dangling** `aria-describedby` and trips reka-ui's dev-mode warning on every open.

`ExportModal.vue:49-80` · reka-ui `Dialog/DialogContentImpl.js:51,78` · `Dialog/utils.js:12-20`

`DialogContentImpl` generates the id unconditionally — `rootContext.descriptionId ||= useId(void 0, "reka-dialog-description")` (`:51`) — and always renders `aria-describedby: rootContext.descriptionId` (`:78`). With no `<DialogDescription>` in the subtree, the attribute points at an element that does not exist, in dev *and* production. In dev, `useWarning` (`utils.js:14-19`) additionally logs `Warning: Missing 'Description' or aria-describedby="undefined" for DialogContent.` on mount.

Every other Dialog consumer in the tree supplies one: `GalleryView.vue:415-426`, `AdminFlaggedPanel.vue:268-272`, `AdminUserList.vue` (same shape). ExportModal and `GalleryCardModal` are the two outliers.

**Falsifier.** A `DialogDescription` import — `grep -n "DialogDescription" ExportModal.vue` → 0. Or a reka-ui build that omits the attribute when unregistered — falsified at `DialogContentImpl.js:78` (unconditional binding).

### D-9 · MINOR · The in-file comments assert a guarantee the primitive does not provide: reka-ui never renders `aria-modal`.

`ExportModal.vue:28-30` ("reka-ui's DialogRoot drives the focus-trap, Esc-to-close, and `aria-modal`") and `:47-48` ("DialogContent supplies role=\"dialog\" + aria-modal=\"true\"")

`grep -rn "aria-modal" node_modules/reka-ui/dist/` → **0 hits, whole package**. `DialogContentImpl.js:73-82` renders `role="dialog"`, `aria-describedby`, `aria-labelledby`, `data-state` — and no `aria-modal`. Modality is achieved by a different mechanism: `DialogContentModal.js:47` `useHideOthers(currentElement)` (`aria-hidden` on siblings) plus `FocusScope` trapping and `DismissableLayer`. The *effect* the comment claims is real; the *attribute* it names is not, and the same false claim propagated into `docs/audits/runs/2026-06-16-…` and the 2026-05-27 D-audit design notes ("dialog from reka-ui in `ExportModal.vue:46-49`" … "with `aria-modal`/focus-trap"), so it is a doc-truth error with downstream citations.

**Falsifier.** One `aria-modal` occurrence in reka-ui@2.9.10's dist. There are none.

### D-10 · MINOR · Hand-rolled `color-mix` that is byte-identical to a glass-ui token whose stated purpose is to retire exactly these sites.

`ExportModal.vue:107` (`background: color-mix(in srgb, var(--muted) 50%, transparent);`) vs glass-ui `styles/tokens/color-radius.css:162-163`

```
/* Muted-tinted surface rungs — canonical handles for the 9 raw
   `color-mix(in srgb, var(--muted) N%, transparent)` sites … */
--muted-soft:   color-mix(in srgb, var(--muted) 30%, transparent);
--muted-medium: color-mix(in srgb, var(--muted) 50%, transparent);
```

`var(--muted-medium)` is the exact expression, already in the cascade this app imports (`style.css:3`). The token exists *because* raw sites like this one were a named problem upstream. Cost of the bypass: the consumer freezes the 50% mix, so an upstream re-rung (or a dark-arm adjustment) reaches every other surface and skips this one.

**Falsifier.** `--muted-medium` being absent or differently-valued in the installed glass-ui — it is present at `color-radius.css:163` with the identical expression. (See §4 K-3 for the hypothesis that `--muted` was undefined; it is defined at `color-radius.css:84`.)

### D-11 · MINOR · The icon-size override is dead CSS: `h-3.5 w-3.5` loses to the Button's own glyph rule, so the icon renders at 16 px, not 14 px.

`ExportModal.vue:76` (`<Download class="h-3.5 w-3.5" />`) · glass-ui `button-BNDWhAZb.js` cva base · `styles/tokens/offsets-sizing.css:177`

The Button base class includes `[&_svg:not([class*=size-])]:size-(--ui-glyph)`. Compiled, that is `.…\:size-\(--ui-glyph\) svg:not([class*="size-"])` — specificity (0,2,1). The consumer's `.h-3.5` / `.w-3.5` are (0,1,0). The `:not()` carve-out is keyed on the substring `size-`, which `h-3.5 w-3.5` does not contain, so the rule **applies** and **wins**: `width`/`height` resolve to `var(--ui-glyph)` = `calc(1rem * var(--ui-scale))` (`offsets-sizing.css:177`), i.e. 16 px at scale 1. The author's intended 14 px never renders.

The substrate's documented escape hatch is a `size-*` class (that is precisely what `:not([class*=size-])` exists for). The house idiom elsewhere is the lucide `:size` prop (`GalleryCardModal.vue:85,102`; 31 `:size="1x"` sites repo-wide vs 48 `h-N w-N` class sites) — so the tree is split, and this file picked the branch that the primitive overrides.

**Falsifier.** A `size-*` class on the icon (there is none), or a lower-specificity button rule (compare the two selectors as above). Rendered px is `UNPROVEN-NEEDS-LIVE`; the cascade arithmetic is source-certain.

### D-12 · MINOR · `min-width: 300px` is inert — `DialogContent` is already `w-full max-w-lg`.

`ExportModal.vue:86-88` · glass-ui `DialogContent-DDE6pQBU.js` base class `"fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 p-6"`

The panel is 100 % of the viewport width, capped at 32 rem, with no horizontal inset. `min-width: 300px` can only bind on a viewport narrower than 300 px. Dead declaration + a raw px literal in a tree whose peers express dialog width with the utility idiom (`class="max-w-sm"` at `GalleryView.vue:402`, `AdminFlaggedPanel.vue:265`, `AdminUserList.vue:461`; `max-w-[28rem]` at `GalleryCardModal.vue:73`) — so this dialog is also the **widest** of the five, at `max-w-lg` (32 rem) for four one-line switch rows, purely by not passing anything.

**Falsifier.** A narrower `max-w-*` on this `DialogContent` (there is none — `:49` passes only `class="export-dialog"`), or a viewport < 300 px.

### D-13 · MINOR · `surface` left at the `glass` default while all four peer dialogs pass `surface="opaque"`.

`ExportModal.vue:49` vs `GalleryView.vue:402`, `AdminFlaggedPanel.vue:265`, `AdminUserList.vue:461`, `GalleryCardModal.vue:72`

glass-ui's `DialogContent` declares `surface: { default: "glass" }` and maps it through `useSurfaceAxis(surface, "floating")` → `"glass-floating"` vs `"glass-floating glass-opaque"` (`useSurfaceAxis-CMnF2zHb.js`). ExportModal is the only Dialog in the tree that takes the translucent default — and it is the only one that opens over the animated visualization canvas, i.e. the busiest possible backdrop for translucent chrome. 4-of-5 consistency is a strong prior that `opaque` is the house choice.

**Falsifier.** A fifth peer using the glass default (none), or a legibility measurement showing `glass-floating` is opaque enough over the canvas → `UNPROVEN-NEEDS-LIVE` (SS-13). The *inconsistency* is source-certain; the legibility consequence is not.

### D-14 · MINOR · Button-variant hierarchy is inverted relative to the house idiom: `outline` Cancel next to a `default` (glass) primary.

`ExportModal.vue:74-77` vs `GalleryView.vue:429-431`, `AdminFlaggedPanel.vue:275-276`

The peers use `variant="ghost"` for the dismissive action and `destructive`/`default` for the affirmative. Here Cancel is `outline` — which in glass-ui@4 resolves to `border border-input bg-background hover:bg-accent…` (an *opaque plate*, `button-BNDWhAZb.js`) — while the primary "Save PNG" is `default` = `glass-wash btn-glass text-foreground…` (translucent). The dismissive control is therefore visually heavier than the affirmative one. glass-ui ships `solid` (`bg-primary text-primary-foreground`) for a weighted primary and it is unused here.

**Falsifier.** Another dialog footer in the tree pairing `outline` + `default` — `grep -rn 'variant="outline"' web/src` → 30 sites, none of them a `DialogFooter` (this is the only one; the rest are pills/toolbar/empty-state buttons). Perceived weight is `UNPROVEN-NEEDS-LIVE`; the variant divergence is source-certain.

### D-15 · MINOR · Three redundant prop values re-state the primitive's own defaults.

`ExportModal.vue:74` (`variant="outline" size="default"`), `:75` (`variant="default" size="default"`)

glass-ui's Button cva ends with `defaultVariants: { variant: "default", size: "default" }` (`button-BNDWhAZb.js`). `size="default"` ×2 and `variant="default"` ×1 are no-ops. They also emit `data-size="default"`/`data-variant="default"` attributes the peers don't produce, so any future `[data-size]` styling hook sees a different DOM here than in the four sibling dialogs. Peer footers pass neither (`GalleryView.vue:429`, `AdminFlaggedPanel.vue:275-276`).

**Falsifier.** A cva without those defaults, or a peer footer passing `size="default"` — neither exists.

### D-16 · MINOR · Raw motion + radius literals in scoped CSS where the substrate ships tokens (and the radius is already booked).

`ExportModal.vue:101` (`border-radius: 0.375rem`), `:103` (`transition: background 0.15s`), `:93` (`gap: 0.125rem`), `:100` (`padding: 0.5rem 0.25rem`)

glass-ui ships `--duration-fast`/`--duration-normal` (`tokens/scheme-motion.css`) and the `transition-control` utility that its own `Switch` uses two lines away in the same rendered row (`Switch-Dr--uLGH.js` class list). `0.15s` is a hand-picked near-miss. The radius literal at `:101` is *already recorded* by the fourier M-deep-audit inventory (`docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1890` lists `ExportModal.vue:101 border-radius: 0.375rem` in a 14-file raw-radius cohort) — folded here, not re-invented; the line number still matches at HEAD.

**Falsifier.** Absence of a `--duration-*`/`--radius-*` token in the imported cascade — both families are present (`tokens/scheme-motion.css`, `tokens/color-radius.css`).

### D-17 · MINOR · A runtime import from `devDependencies`, and two lucide runtimes render inside this one dialog.

`ExportModal.vue:12` (`import { Download } from "lucide-vue-next"`) · `package.json:31` (lucide-vue-next in **devDependencies**) · glass-ui `x-BUwTKe50.js` → `createLucideIcon-DydS2qgk.js`

Two distinct facts. (1) `lucide-vue-next` is declared under `devDependencies` yet imported at module scope by shipped components — for a private, bundled app this builds, but the manifest misdeclares what the product needs (same class as `reka-ui` at `:35`, which is at least genuinely un-imported per lane-frontend:70). (2) glass-ui **vendors** `@lucide/vue`'s runtime into its own bundle — `createLucideIcon-DydS2qgk.js` carries inlined `node_modules/@lucide/vue/dist/esm/…` regions and `grep -rl "@lucide/vue" dist/` shows no external import — and `DialogContent` renders its close "X" through it (`x-BUwTKe50.js`). So the rendered dialog contains one icon from glass-ui's vendored lucide and one (`Download`) from `lucide-vue-next@1.0.0`: two copies of the same icon runtime, in the same modal.

**Corpus.** Folds lane-frontend:68,478 (the `lucide-vue-next → @lucide/vue` rename, **35 import sites**; this file is one of them — verified `grep -rn "lucide-vue-next" web/src | wc -l` → 35 today) and CENSUS:105,185. **Increment:** the devDependency classification, and the fact that `@lucide/vue@1.20.0` is *already installed* (`npm ls @lucide/vue` → present under glass-ui) while the app imports the other package.

**Falsifier.** `lucide-vue-next` under `dependencies` (it is not, `package.json:24-35`), or glass-ui importing `@lucide/vue` externally rather than inlining it (grep shows inlining).

### D-18 · MINOR · Emits declared in the legacy call-signature form, diverging from the sibling modal's object form; and the modal-open idiom is a third spelling.

`ExportModal.vue:18-21` vs `GalleryCardModal.vue:24-29`

```
ExportModal.vue:18-21          GalleryCardModal.vue:24-29
(e: "export", options: …)      close: []
(e: "close"): void             like: [hash: string]
```

Two spellings of `defineEmits` for the same job in adjacent files. Likewise the always-open trick: this file uses `:open="true"` + `@update:open` (`:31-33,46`); `GalleryCardModal.vue:36-38` uses a writable `computed({ get: () => true, set: v => { if (!v) emit("close") } })` + `v-model:open`. Same semantics, two implementations, neither matching the four `v-model:open`-with-a-parent-ref peers (D-5).

**Falsifier.** A repo convention document mandating the call-signature form — `grep -rn "defineEmits" web/src | wc -l` shows both forms in use; `DESIGN.md` has no emits row. This is drift, not policy.

### D-19 · MINOR · Export preferences reset to all-ON on every open, in an app that persists its sibling view preferences.

`ExportModal.vue:23-26` + `VisualizationView.vue:281` (`v-if`) · contrast `composables/useViewState.ts:4,18-21`

Because the parent mounts/unmounts the component, the four `ref(true)`s re-initialise every time. A user who exports five frames without grid must toggle grid off five times. The app already has the pattern for exactly this — `useViewState` persists `overlay`/`equation`/`editing` to `localStorage` under `fourier_visualizer_view_state` (`:4,18-21`) — and animation settings round-trip to the workspace document (`VisualizationView.vue:53-64`). Export options are the only user-facing preference set in this view with no persistence at all.

**Falsifier.** Any read of a persisted export preference — `grep -n "localStorage\|store\." ExportModal.vue` → 0.

### D-20 · MINOR · `DESIGN.md` still books this component's migration as an open task, two tranches after it landed.

`web/DESIGN.md:31` — `- [ ] Replace custom Teleport modals (ExportModal, GalleryCardModal) with glass-ui Dialog/DialogContent (A.W3 territory).`

The migration is done: `ExportModal.vue` contains no `Teleport` (`grep -n "Teleport"` → 0), and the repo's own C-audit records it landing at B.W2 (`docs/audits/runs/2026-05-27-C-audit/CA1-b-plan-reality.md:16`: "`ExportModal`→`Dialog`", commits `ca58321` + `1b8b32f`). The adjudicated intake independently fixes the live Teleport count at **2**, at `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105` (`lane-fourier-r3-r6.md §0`) — neither is this file. An unchecked box that is actually done is a live mis-signal for F.W-planning.

**Falsifier.** A `Teleport` in either named component — `GalleryCardModal.vue` also has none (it uses `Dialog` at `:70`). Both halves of the row are stale.

### D-21 · MINOR · The Switch's naming path is unused: no `id`, so reka-ui's `[for]`-derived `aria-label` never fires and the control's name rests on an implicit-label technicality.

`ExportModal.vue:55-70` · reka-ui `Switch/SwitchRoot.js` (`as: { default: "button" }`, and `ariaLabel = computed(() => props.id && … document.querySelector('[for="'+props.id+'"]')?.innerText)`) · axe-core `axe.js` `nativeElementType`

`SwitchRoot` renders a **`<button role="switch">`** whose only child is the thumb span (glass-ui `Switch-Dr--uLGH.js`). Its documented naming affordance is `id` + an explicit `<label for>`: the computed `ariaLabel` above is `undefined` unless `props.id` is set. ExportModal passes no `id` (`:57,61,65,69`) and uses an *implicit* wrapping label (`:55,58,62,66`).

Consequence chain, source-derived: for a `<button>`, axe-core's `nativeElementType` maps to `namingMethods: 'subtreeText'` (`axe.js`, the `{ matches: 'button', namingMethods: 'subtreeText' }` entry) — the wrapping `<label>` is *not* a native naming method for buttons — and the subtree here is an empty thumb. The automated gate nonetheless passes, because axe's `button-name` rule lists `implicit-label` and `explicit-label` in its `any` array (`axe.js`, `id: 'button-name'`), so the wrapper is accepted as a name source by *that rule*. Real AT name computation for a `button` element with a wrapping label is browser-dependent and is **not** what the primitive's author intended you to rely on.

Note ExportModal is the **only** `Switch` consumer in the repo (`grep -rn "glass-ui/switch" web/src` → 1 hit, `:4`), so no sibling's green keystone vouches for this pattern.

**Falsifier.** An `id`/`aria-label` on any of the four switches (none), or an axe `nativeElementType` entry giving `button` a label-based naming method (there is none — verified in the installed axe-core 4.11.4). The **real-AT** name is `UNPROVEN-NEEDS-LIVE` (SS-13): the fix (`id` + `for`, or `aria-label`) is unambiguous either way.

---

## §3b · INFO

### D-22 · INFO · Zero coupling to the 45-operation API surface — and the export artifact has no server counterpart.

Measured: `grep -n "@/lib/api\|@/stores\|vue-router" ExportModal.vue` → 0; the whole export path (`ExportModal` → `VisualizationView.doExport` → `BasisCanvas.exportFrame`) issues no request — the PNG is produced by `offCanvas.toDataURL` and an `<a download>` (`BasisCanvas.vue:507-513`). Of the 45 Python operations the intake re-derived exactly (`lane-fourier-r3-r6.md §0`: `grep -rc "^@.*\.\(get\|post\|put\|patch\|delete\)(" api/` → 45 across 8 files), **none** is an export/render operation; the nearest are `images.py:149` `GET /{imageSlug}/thumbnail` (a server thumbnail of the *uploaded source image*, `services/image_storage.py:72`) and the gallery card's `overlayUrl(entry.image_slug)` (`GalleryCardModal.vue:78`).

So the "frame the user saves" and the "frame the world sees on the gallery card" are produced by two different renderers with no shared options vocabulary — the R6-8 operation↔leaf coupling for this leaf is *empty by construction*, which is worth recording as the reason the leaf is unusually cheap to migrate (F.W2 touches it not at all) and unusually easy to drift.

**Falsifier.** Any network call in the export path — none; or an export-shaped route in `api/routers/` — `grep -rn "export" api/routers/` yields no route decorator.

### D-23 · INFO · The last recorded run of the ExportModal a11y keystone never reached its axe assertion — no in-tree artifact currently attests this dialog is axe-clean.

`web/test-results/.last-run.json` (`"status": "failed"`) · `web/test-results/visualization-crud-…-is-clean-desktop-mutating-chromium/error-context.md:9-21`

```
Name: … a11y keystone: ExportModal Dialog-open is clean @ desktop @mutating
Error: locator.click: Test timeout of 30000ms exceeded.
  - waiting for getByText('Export').first()
```

The run died reaching the affordance (the More-options path), before `checkA11y` (`visualization-crud.spec.ts:659`). The page snapshot in that artifact shows the Canvas tab selected with no dock menu open — i.e. the *affordance discovery* is what broke, not the dialog. Two consequences for this challenge: the keystone is not currently evidence for or against D-8/D-13/D-21, and the export affordance's reachability at desktop viewport is itself suspect (`UNPROVEN-NEEDS-LIVE`, SS-13 — a live rerun settles both).

**Falsifier.** A newer passing artifact (the directory holds exactly one failed-run tree, dated 2026-07-28; `playwright-report/index.html` is older, 2026-06-01).

### D-24 · INFO · The dialog closes unconditionally on Save, with no in-flight, success, or failure signal.

`ExportModal.vue:35-42,75-78` · `VisualizationView.vue:99-102`

`doExport` emits and the parent closes the modal in the next statement, regardless of whether `exportFrame` early-returned at `BasisCanvas.vue:463` (`if (!canvasRef.value || !surface.value) return;`), drew nothing (D-3), or succeeded. The component exposes no `disabled`/`pending` prop, and the parent's toast channel (`VisualizationView.vue:13,35`) is used for publish failures (`:110,113`) but not here. From the user's side, every outcome — real PNG, blank PNG, silent no-op — looks identical.

**Falsifier.** A returned/awaited result from `exportFrame` (its signature returns `void`, `BasisCanvas.vue:462`), or a toast in the export path (none).

---

## §4 · Kills — hypotheses that died against the tree

**K-1 · "The wrapping `<label>` double-toggles the Switch, or leaves it unnamed for axe."** Dead twice over. HTML label activation skips events targeted at interactive descendants, so clicking the switch itself fires once; and axe's `button-name` rule explicitly lists `implicit-label` in its `any` array (`axe-core@4.11.4 axe.js`, `id: 'button-name'`), so the automated gate accepts the wrapper. What survives is the narrower D-21 (the primitive's own `id`/`[for]` naming path is unused, and `button` accname is subtree-only per `nativeElementType`).

**K-2 · "Importing `@mkbabb/glass-ui/dialog` drags value.js 0.13 into the bundle via keyframes' `SpringProgress`, so the invalid peer is live."** Dead. `DialogContent-DDE6pQBU.js` → `useSpringMount-CvopqiFr.js` → `SpringProgress` from `@mkbabb/keyframes.js` is real (a static, module-scope import), but keyframes' **root entry** graph is `binarySearch` + `decay` + `sequence` + `springTimingFunction` + `timeline` — none of which import value.js. The value.js edges live only in `engine-*`, `animations-*`, `compile-*`, `waapi-*`, `scroll-scene-*`, none reachable from `SpringProgress`. Measured, not assumed. D-6 was rewritten to a contract-only finding as a result. (Residual, INFO-grade: the dialog import does pull `SpringProgress` into the chunk even though `spring` is never passed — `ExportModal.vue:49` sets no `spring` prop.)

**K-3 · "`color-mix(in srgb, var(--muted) 50%, transparent)` is dead because `--muted` is undefined in the consumer's cascade."** Dead. `--muted: var(--neutral-1)` is declared at glass-ui `styles/tokens/color-radius.css:84`, reachable via `tokens.css` → `styles/index.css` → `src/style.css:3`. (I searched `glass-ui.css` and the top-level `styles/*.css` first and found only *uses*; the declaration lives in the `tokens/` partials.) What survives is D-10 — the expression duplicates a shipped token rather than failing.

**K-4 · "`min-width: 300px` overflows narrow viewports."** Dead. `DialogContent`'s base class is `w-full max-w-lg` with no horizontal inset, so 300 px never binds above a 300 px viewport. Downgraded to D-12 (inert declaration + widest-dialog-by-default).

**K-5 · "The modal is missing `role=dialog` / Esc / focus-trap (the 2026-05-26 L5 `A1` HIGH)."** Dead — and this is the component's headline credit. See S-1.

---

## §5 · Superlatives (L-18 runs both ways)

**S-1 · The modal mechanics are fully delegated; the historical HIGH a11y finding is genuinely discharged.** `docs/audits/runs/2026-05-26-B-audit-wave-1/L5-docks.md:57,79` recorded D10/`ExportModal` as the tranche's single **HIGH** a11y gap (no `role="dialog"`, no Esc, no focus trap, no autofocus, hand-rolled `Teleport` + `.modal-card`, 147 lines), and `L4-glass-ui-usage.md:96` as MEDIUM `G1`. Today the file has **zero** modal machinery of its own: `grep -c "Teleport\|addEventListener\|keydown\|useFocus" ExportModal.vue` → **0**, and it is 114 lines (33 lighter) with `role="dialog"`, focus-trap, Esc, outside-dismiss, `useHideOthers`, and focus-return all coming from `DialogContentModal`/`DialogContentImpl`. This is the substrate-with-consumer discipline working exactly as the constellation intends. **Falsifier:** any hand-rolled key handler or portal in the file — none; and the 2-Teleport repo count in `lane-fourier-r3-r6.md §0` names the two survivors, neither of which is this file.

**S-2 · The emit site defensively re-applies the visibility invariant.** `ExportModal.vue:37` emits `withEpicycles: props.hasEpicycles && withEpicycles.value` — so a stale `true` from a row that is not rendered (`v-if="hasEpicycles"`, `:55`) can never leak into the payload. That is precisely the micro-discipline most option dialogs skip; it is the one line in the payload that is *provably* correct. (Bitter irony: the sink discards it — D-1.) **Falsifier:** a path where the row is hidden and `withEpicycles: true` still escapes — the `&&` forecloses it.

**S-3 · A genuinely pure leaf: 4 imports, 1 prop, 2 emits, 0 stores, 0 API, 0 router, 0 storage.** Measured: `grep -n "@/stores\|@/lib/api\|vue-router\|localStorage" ExportModal.vue` → **0**. In a 66-SFC tree where the visualization view alone imports 3 stores plus 3 composables, an options dialog that touches nothing but props/emits is unusually testable and unusually cheap to migrate — it is the *only* reason a component this defective (§1–§2) is also a 30-minute fix. **Falsifier:** any injected/global state — none; the only module-level state is four `ref`s.

**S-4 · The Tailwind v4 SFC contract is honoured where 8 sibling files pay it for nothing.** `@reference "tailwindcss"` at `:85` is required for the `@apply text-base` at `:111` to compile inside a scoped block. Repo-wide, 35 files carry `@reference` while only 27 use `@apply` — i.e. ~8 carry the directive with no consumer. This file is on the correct side of that ledger. **Falsifier:** removing `@reference` and having `:111` still build (it would not, under Tailwind v4 SFC scoping), or this file appearing in the `@reference`-without-`@apply` set (it does not).

---

## §6 · Verdict

**DEFECTIVE on the consumption axis — and the defect is not where the prior audits looked.** Every historical finding about this component was about its *chassis* (hand-rolled modal → glass-ui `Dialog`), and that migration is genuinely excellent (S-1). Nobody opened the *contract*. Opened, it yields a shipping BLOCKER: half the dialog's controls are decorative (D-1), protected from discovery by a `Record<string, boolean>` declared three times and typed zero times (D-2), with the surviving option implemented as a magic rectangle (D-4), a second caller that bypasses the dialog entirely (D-7), and a props surface that carries the flag the sink ignores while omitting the one that decides whether the export can succeed at all (D-3).

On the producer axis proper: this leaf touches **no** value.js and **no** API operation, so F.W2 passes it by — but it is a three-subpath glass-ui consumer sitting on a peer block that the installed tree already violates (`npm ls` → ELSPROBLEMS, D-6), it bypasses one shipped token whose comment names this exact bypass as its reason for existing (D-10), and it fights the Button's glyph rule with dead CSS (D-11). The gate that would have caught the a11y half never reached its assertion in the last recorded run (D-23).

**Counts (first pass).** 24 defects — **1 BLOCKER** (D-1), **6 MAJOR** (D-2 … D-7), **14 MINOR** (D-8 … D-21), **3 INFO** (D-22 … D-24). **4 superlatives** (S-1 … S-4). **5 kills** (K-1 … K-5). Two claims carry `UNPROVEN-NEEDS-LIVE` halves for SS-13 (D-3 race width, D-21 real-AT name), plus the perceptual halves of D-5/D-11/D-13/D-14 and the reachability question in D-23; every mechanism underlying them is source-certain.

> **Counts superseded by §7 (second pass).** Final: **30 defects — 1 BLOCKER · 9 MAJOR · 15 MINOR · 5 INFO · 5 superlatives · 6 kills.**

---

# §7 · SECOND-PASS ADDENDUM (independent re-run, same served model)

**Standing edict E-3 — addenda, not patch.** This section was produced by an independent second pass over the same read surface. It does **not** revise §1–§6; it adds six findings (D-25 … D-30), one superlative (S-5), one kill (K-6), and an anchor corrigendum. Everything in §1–§6 was independently re-derived and **survives** — in particular D-1's grep (zero consumer reads of `withEpicycles`/`withTrail`), D-2's three-site `Record<string, boolean>`, D-5's `Presence`/`v-if` mechanism, D-8's unconditional `aria-describedby` binding, D-9's `aria-modal` = 0 occurrences, D-10's byte-identical `--muted-medium`, and D-11's (0,2,1) vs (0,1,0) specificity arithmetic were all reproduced exactly. Where the second pass sharpens a first-pass row, it says so and cites it rather than re-booking it.

## §7.0 · Anchor corrigendum (tail of `BasisCanvas.vue` drifts 1–4 lines)

Re-measured with `grep -n` at HEAD. The head anchors are exact; three tail anchors in §2/§3b are off and should be corrected before any carry lands on them:

| cited in §2/§3b | actual (grep -n, HEAD) | status |
|---|---|---|
| `exportFrame` def `:462`; early return `:463`; destructure `:466-469`; `setTransform` `:476`; `hasEpic` `:489`; `defineExpose` `:515` | 462 / 463 / 467-468 / 476 / 489 / 515 | **exact** |
| `const data`/`const basesData`/`if (data \|\| basesData)` at `:481-483` | `if (data \|\| basesData)` is at **`:484`** (decls `:482-483`) | off by 1 |
| `if (!showLabels) { clearRect(0,0,200,100) }` at `:502-504` | **`:498-500`** (the `clearRect` is `:499`) | **off by 3** |
| `toDataURL → <a download> → click()` at `:507-513` | **`:506-513`** (`toDataURL` is `:506`) | off by 1 |

All `ExportModal.vue` anchors in §1–§6 (`:12, :28-30, :47-48, :76, :85, :87, :103, :107, :111`) re-verified **exact**. All `labels.ts`, `package.json`, and dependency-dist anchors re-verified exact.

## §7.1 · New findings

### D-25 · MAJOR · D-4's under-clear is not hypothetical — the `N = …` legend row **provably survives** `withLabels: false` whenever three bases are active. Exact arithmetic.

`BasisCanvas.vue:498-500` · `lib/canvas-drawing/labels.ts:23,26,63,65,73` · `lib/basis-display.ts:4-6`

D-4 correctly names over-clear and under-clear as consequences but leaves the under-clear geometric ("any label drawn outside that box"). It is computable, and it fires at a reachable configuration:

```
labels.ts:26    let yOff = 16;                                  // first row baseline
labels.ts:63    const rowH = 26;
labels.ts:65    yOff += 26;                                     // once per active basis
labels.ts:73    ctx.fillText(levelText, xBase, yOff - 4);       // 'N = …', textBaseline "top", bold 16px
```

`basis-display.ts:4-6` declares exactly three basis families (`fourier`, `chebyshev`, `legendre`), and `BasisSelector.vue:62-66` exposes all three, so `activeBases.length` reaches 3. Then `yOff = 16 + 3·26 = 94`, and the level row is drawn at `y = 90` with `textBaseline = "top"` and a 16 px font — occupying y ≈ 90…106. The erase is `clearRect(0, 0, 200, 100)` in CSS-pixel space (`:476` sets the dpr transform), so **the bottom ~6 px of the `N = …` glyphs survive** as a clipped text sliver on a PNG the user asked to be label-free. At one or two active bases the level row lands at y 38…54 / 64…80 and is fully erased — i.e. the option appears to work right up until the user turns on a third basis.

**Falsifier.** (a) A fourth-or-later `yOff` advance smaller than 26 — `labels.ts:65` is the only advance and it is a literal 26. (b) `activeBases.length` capped below 3 — `BasisSelector.vue:52-54,115` emits the full selection with no cap. (c) The clear rect being taller than the stack — it is a literal 100. None fire. **CONFIRMED-STATIC** for the arithmetic; the exact surviving pixel count is font-metric dependent → `UNPROVEN-NEEDS-LIVE` (SS-13: export at 3 bases with Labels off and inspect y 100–110).

### D-26 · MINOR · The two text-bearing switches do not partition the canvas's text: the grid's axis glyphs are labels governed by `withGrid`.

`ExportModal.vue:64-69` (the "Grid lines" / "Labels" rows) · `lib/canvas-drawing/grid.ts:98,104` · `BasisCanvas.vue:487`

`drawGrid` renders two text glyphs of its own — `ctx.fillText("x", width - 8 - arrowSize - 4, axisY - 10)` (`grid.ts:98`) and `ctx.fillText("y", axisX + 10, 8 + arrowSize + 2)` (`grid.ts:104`) — and the whole call is gated by `if (showGrid)` (`BasisCanvas.vue:487`). Both sit outside the 200×100 erase box by construction (one is anchored to `width`, the other near the top-centre axis).

So the modal's vocabulary is wrong in both directions: **"Labels" off does not remove all labels** (the axis glyphs stay), and **"Grid lines" off removes labels** (the axis glyphs go with the grid). A user who wants a clean unlabelled frame has no combination that produces one, and no combination that produces axis glyphs without grid lines. This is a naming/partition defect in the *modal's* option vocabulary, not merely in the sink — the modal chose the two words.

**Falsifier.** A separate label gate inside `drawGrid` — `grep -n "showLabels\|labels" grid.ts` → 0 hits; the function's only parameters are `(surface, view)` (`grid.ts:3`). Does not fire. **CONFIRMED-STATIC.**

### D-27 · MAJOR · Every exported PNG has a **transparent** background, so D-4's erase is a hole rather than a smudge — and the strokes are theme-resolved, so a dark-mode export is dark-on-nothing.

`BasisCanvas.vue:485,498-500,506` · `src/lib/colors.ts:22-53,90-97` · `App.vue:11-16`

Two facts compose into one artifact defect.

1. **No background is ever painted.** `grep -n "fillRect" BasisCanvas.vue lib/canvas-drawing/*.ts` → **0 hits, whole export path.** The offscreen canvas is created fresh and then `clearRect`-ed (`:485`); every subsequent operation is a stroke or a glyph fill. So the PNG's background is fully transparent — which upgrades D-4's over-clear from "erases some geometry" to "punches a hard-edged 200×100 transparent rectangle through the grid and the curve", visible against any non-neutral backdrop the file is later composited on.
2. **The stroke colours are whatever the screen theme resolved.** `VIZ_COLORS` is a reactive object filled by `resolveVizColors()` from live computed style (`colors.ts:90-97` → `cssVarToHex`, `colors.ts:22-53`), re-run on every `class` mutation of `<html>` (`App.vue:11-16`, `MutationObserver`). The export path consumes it directly (`BasisCanvas.vue:127`, `labels.ts:4,37`). Nothing in `exportFrame` re-resolves for a light substrate or bakes a background.

Net: exporting in dark mode yields dark-theme strokes on transparency — a file that reads correctly only when composited on a dark surface, with no record in the artifact of which theme produced it. The modal's option set offers no background/theme control and its `Record<string, boolean>` contract (D-2) could not express one.

**Falsifier.** (a) Any background fill — the `fillRect` grep is empty across `BasisCanvas.vue` and all seven `lib/canvas-drawing/*.ts` modules. (b) A theme-independent palette — `colors.ts:91-95` reassigns all five viz colours from `--viz-*` custom properties, which `style.css:113-125` forks per light/dark arm for `--viz-amber`. Neither fires. **CONFIRMED-STATIC** for the mechanism; the perceptual outcome is `UNPROVEN-NEEDS-LIVE`.

### D-28 · MAJOR · Sharpens D-21 — **both** axe rules that could name-check a `role="switch"` are structurally foreclosed, so the keystone provides *zero* naming coverage independently of D-23's failed run. And the fix is one attribute.

`ExportModal.vue:55-70` · `axe-core@4.11.4 axe.js` (rule table + `nativeElementType`) · `reka-ui/dist/Switch/SwitchRoot.js`

D-21 establishes that `button-name` passes via its `implicit-label` check. The second pass closes the other half of the pincer, which D-21 does not reach: the ARIA-side rule cannot fire either.

```
axe.js   id: 'aria-toggle-field-name',
         selector: '[role="checkbox"], …, [role="switch"], [role="option"]',
         matches: 'no-naming-method-matches',
         any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', 'non-empty-title' ],
```

`no-naming-method-matches` admits only elements whose native type has **no** naming method. `nativeElementType` contains `{ matches: 'button', namingMethods: 'subtreeText' }`, and `SwitchRoot` renders `as: { default: "button" }`. So the rule is **skipped before evaluation** — note its `any` array contains no label-based check at all, i.e. had it run, it would have failed. The result is an exact inversion: axe declines the ARIA rule *because* the element is a `<button>`, then passes the button rule *because* of a `<label>` that HTML-AAM does not grant buttons (`button` names from aria-labelledby → aria-label → subtree → title). `axe.js` `role switch` is declared `accessibleNameRequired: true, nameFromContent: true` — a requirement no enabled rule enforces on this markup.

This is stronger than D-23's "the last run never reached the assertion": **even a green run would not have covered it.** The four switches are this component's only interactive controls.

**Fix path, measured.** `SwitchRoot` binds `"aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value` and spreads `mergeProps(_ctx.$attrs, {…})` onto its root, and glass-ui's wrapper strips only `class` before forwarding (`Switch-Dr--uLGH.js`). So `<Switch aria-label="Trace path" v-model="withTrail" />` reaches the button today, with no producer change — four attributes close D-21 + D-28 together. (D-21's alternative, `id` + `for`, additionally re-enables reka-ui's own `document.querySelector('[for=…]').innerText` derivation.)

**Falsifier.** (a) `no-naming-method-matches` admitting elements that *have* a naming method — the matcher's name and the rule's pairing with `aria-tooltip-name`/`aria-treeitem-name` (roles with no native host element) refute it. (b) `button` carrying a label-based naming method in `nativeElementType` — the installed table maps `button` to `subtreeText` alone; only `textarea`/`select`/most `input` types get `labelText`. Neither fires. **CONFIRMED-STATIC.**

### D-29 · INFO · The gate's own rationale states a glass-ui pin two majors stale — and it is the stated justification for the `test.fixme` sitting one line above the ExportModal keystone.

`e2e/visualization-crud.spec.ts:623` vs `package.json:14`

> `visualization-crud.spec.ts:623` — "The app consumes the PUBLISHED `@mkbabb/glass-ui@^2.0.0`, so the fix is a glass-ui release (`inert` on the collapsed layer) + a guarded `^2→^3` bump"

`package.json:14` pins `"@mkbabb/glass-ui": "^4.0.0"` and the installed tree is 4.0.0. The `^2→^3` bump the comment defers has already happened **twice**, so the `aria-hidden-focus` defect it books against glass-ui may well be fixed, still open, or moved — the comment cannot say, and it is the sole written justification for the `test.fixme` at `:630-638` that suppresses the workspace-default a11y keystone. That suppressed keystone is the immediate neighbour of the ExportModal keystone (`:640-659`) and covers the same mounted surface.

Consumption reading: a stale pin inside a *gate rationale* is worse than a stale pin in prose, because it converts an unverified upstream claim into a permanently red-lit test. Pairs with D-6 (the installed tree is peer-invalid **today**) and D-20 (`DESIGN.md` books a migration that already landed) — three independent stale consumption claims about the same three packages, in three different document classes.

**Falsifier.** `package.json` reading `^2.0.0`, or a second glass-ui entry. `grep -n "glass-ui" package.json` → one hit, `:14`, `^4.0.0`. Does not fire. **CONFIRMED-STATIC.**

### D-30 · INFO · Sharpens D-22/§0 — the F.W2 colour surface is *reachable from this component*, even though the component imports none of it. The budget, enumerated.

`ExportModal.vue` (no value.js import) · `src/lib/colors.ts:22,56,70,90,101,111` · `BasisCanvas.vue:127`, `labels.ts:4,37`, `grid.ts`

§0 concludes "the F.W2 migration surface … does not touch this file," which is exactly right as an *import* statement and worth keeping. The second pass records the complementary reachability fact, because F.W2 sequencing needs it: ExportModal is the **sole modal entry point** to a render path that runs entirely on the hand-rolled arms F.W2 exists to delete. Enumerated at HEAD:

| `src/lib/colors.ts` | what it hand-rolls | reached from the export path? |
|---|---|---|
| `:22` `cssVarToHex` | regex-parses `hsl()` / bare Tailwind triplet / `rgb()` out of `getComputedStyle` | yes, via `resolveVizColors` |
| `:56` `hslToHex` | HSL→hex | yes |
| `:70` `rgbToHex` | RGB→hex | yes |
| `:90` `resolveVizColors` | reads five `--viz-*` properties into a reactive palette | yes (`App.vue:11-16`) |
| `:101` `hexToRgba` | hex + alpha → `rgba()` string | yes (`BasisCanvas.vue:6,127`) |
| `:111` `hexToRgb` | hex → `[r,g,b]` | yes |

Every one of those six is a value.js primitive re-implemented in the consumer, and every Save PNG traverses them (`labels.ts:4,37` reads `VIZ_COLORS`; `BasisCanvas.vue:127` calls `hexToRgba`). So: F.W2 does not need to *edit* this file, but this file is the user-facing surface whose output changes when F.W2 lands — which is the difference between "not in scope" and "not in the regression set." Book it in the latter.

**Falsifier.** A value.js import in `visualization/` — `grep -rn "@mkbabb/value.js" src/components/visualization/` → 0 (§0 stands). Or an export path that bypasses `VIZ_COLORS` — `labels.ts:4` and `BasisCanvas.vue:6` import it at module scope and every painter reads it. Does not fire. **CONFIRMED-STATIC.**

## §7.2 · New superlative

**S-5 · The glass-ui import shape is exactly what F.W2 is trying to produce — three *declared* subpath entries, verified against the producer's own exports map.** §0 counts the symbols; this row verifies they resolve legitimately. `ExportModal.vue:3,4,5-11` import `@mkbabb/glass-ui/button`, `/switch`, `/dialog`, and all three are declared keys in glass-ui 4.0.0's `exports` map (80 keys; `./button` → `dist/button.js`, `./switch` → `dist/switch.js`, `./dialog` → `dist/dialog.js`, each with a paired `types` entry). No `dist/` reach-through, no root-barrel import, no relative escape, no deep path that a producer refactor could break — six components over three tree-shakeable entry points, in a file that could trivially have written one barrel import instead. Given that this component's substrate is otherwise the most compromised thing about it (D-6's invalid peer), the *addressing* being flawless is worth the credit.

**Falsifier.** `grep -n "glass-ui/dist\|from \"@mkbabb/glass-ui\"" ExportModal.vue` → 0 hits; and `Object.keys(require('@mkbabb/glass-ui/package.json').exports)` contains all three subpaths plus a `types` condition for each. Second falsifier: a wildcard `./*` entry that would make the subpaths accidental rather than declared — the map has **no** `./*` key (only `./fonts/*`), so each of the three was minted deliberately upstream. Neither fires.

## §7.3 · New kill

**K-6 · "glass-ui's `<Dialog>` silently forwards `modal: false`, so this dialog is non-modal — no focus trap, no `useHideOthers` — and S-1 is wrong."** Dead, and it was a plausible BLOCKER worth chasing: glass-ui's compiled `Dialog` declares `props: { open: {type: Boolean}, defaultOpen: {type: Boolean}, modal: {type: Boolean} }` with **no defaults** (`DialogContent-DDE6pQBU.js`), and Vue's boolean casting makes an absent `Boolean` prop resolve to `false` — which would override `DialogRoot`'s `modal: { default: true }` and route rendering to `DialogContentNonModal`. It does not, because reka-ui's forwarder filters by *assignment*, not by value:

```
reka-ui/dist/shared/useForwardProps.js
  defaultProps  = own props that declare a `default`        → {} for glass-ui's Dialog
  preservedProps = Object.keys(vm.vnode.props)              → { open, onUpdate:open } from ExportModal.vue:46
  return keys({...defaultProps, ...preservedProps}).reduce(…)   → `modal` is not in the key set
```

`modal` is neither defaulted by glass-ui nor assigned by ExportModal, so it is never forwarded and `DialogRoot`'s own `default: true` stands. Confirmed downstream: `DialogContent.js` branches on `rootContext.modal.value` → `DialogContentModal`, which calls `useHideOthers(currentElement)` (`DialogContentModal.js:3,48`) and passes `trapFocus`. **S-1 survives intact**, and D-9's reading is corroborated: modality is real, it is just not spelled `aria-modal`. (Residual, already-booked: the *effective* `modal` is a value no one in the consumer chain writes — a latent hazard if glass-ui ever adds a `default` to that prop, which would flip every consumer's modality without a consumer diff.)

## §7.4 · Second-pass verdict

The first pass's verdict stands unamended: **DEFECTIVE on the consumption axis, at the contract rather than the chassis.** The second pass hardens it in three places and does not soften it anywhere.

* **The export artifact is worse than D-4 alone implies.** D-27 (transparent background, theme-resolved strokes) + D-25 (the surviving legend sliver at three bases) + D-26 (the two switches do not partition the canvas's text) mean that of the modal's four options, two are inert (D-1), one is implemented as a coordinate that both over- and under-shoots by computable amounts, and the fourth removes text the fourth switch does not name. Zero of four options are correct as presented.
* **The a11y gate is not merely broken, it is blind.** D-28 closes the pincer D-21 opened: no enabled axe rule can name-check these switches, so D-23's failed run is a red herring — a green run would have proved nothing about the component's only controls. Cost to close: four `aria-label` attributes, on a path verified to reach the primitive.
* **Three stale consumption claims, three document classes.** D-6 (installed tree peer-invalid today, `npm ls` non-zero), D-20 (`DESIGN.md` books a landed migration as open), D-29 (a gate rationale citing a pin two majors old, load-bearing for an adjacent `test.fixme`). Each is individually minor; together they are the reason a leaf this cheap to fix has stayed broken across two tranches — every document a reader would consult about this component's dependencies is wrong about them.

**Final counts.** **30 defects — 1 BLOCKER (D-1) · 9 MAJOR (D-2 … D-7, D-25, D-27, D-28) · 15 MINOR (D-8 … D-21, D-26) · 5 INFO (D-22 … D-24, D-29, D-30).** **5 superlatives** (S-1 … S-5). **6 kills** (K-1 … K-6). `UNPROVEN-NEEDS-LIVE` halves for SS-13: D-3 (race width), D-21/D-28 (real-AT name), D-25 (surviving pixel count), D-27 (perceptual outcome), plus the perceptual halves of D-5/D-11/D-13/D-14 and D-23's reachability. Every mechanism beneath them is source-certain and re-derived twice.
