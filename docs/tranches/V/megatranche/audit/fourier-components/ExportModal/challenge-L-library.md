claude-opus-5[1m] (served model id)

# CHALLENGE — `ExportModal` · axis **L (LIBRARY)**

**Subject.** `fourier-analysis` @ `web/src/components/visualization/ExportModal.vue` (114 lines +
trailing newline). All `web/…` paths below are relative to `/Users/mkbabb/Programming/fourier-analysis`
(READ-ONLY evidence — nothing in that tree was written). The only write this lane made is this file.

**Posture.** The component is assumed DEFECTIVE until the tree proves otherwise. Every claim below
carries severity + `file:line` + its own falsifier. Superlatives run the same gauntlet (L-18 both
ways). No browser tooling was used; livability-only claims are tagged **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Read whole (read-only).** The component; its 3 import specifiers resolved into
`web/node_modules/@mkbabb/glass-ui@4.0.0` (`dist/dialog.js`, `dist/switch.js`, `dist/button.js`,
`DialogContent-DDE6pQBU.js`, `Switch-Dr--uLGH.js`, `button-BNDWhAZb.js`, `cn-DJXf4yaB.js`, the
`components/ui/{dialog,switch,button}/*.d.ts` surface, `package.json` exports+peers) and through
into `reka-ui@2.9.10` (`Dialog/DialogRoot.js`, `DialogContentImpl.js`, `DialogContentModal.js`,
`Dialog/utils.js`, `Switch/SwitchRoot.js`, `FocusScope/FocusScope.js`, `shared/useForwardProps.js`,
`shared/useHideOthers.js`); `lucide-vue-next`; the sole consumer `VisualizationView.vue`; the render
path it drives — `BasisCanvas.vue` (`exportFrame`, `drawFrame`, `drawEpicycleFrame`,
`drawMultiBasesFrame`) and `lib/canvas-drawing/{labels,trail,grid}.ts`; the sibling export caller
`FullscreenViewer.vue`; the trigger `AnimationControls.vue`; the two e2e specs that name it
(`web/e2e/visualization-ux.spec.ts`, `web/e2e/visualization-crud.spec.ts`) and the `axe-core`
rule/standard bytes those specs execute.

**Hitherto corpus folded** (not re-invented): `formation/fourier/lane-frontend.md`,
`lane-crud.md`, `CENSUS-2026-08-03.md` (+ its §2 addendum rows), and
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Rows cited and — where the live tree
disagrees — contradicted explicitly in §4.

**Tally.** 18 defects · **1 BLOCKER** · 7 MAJOR · 8 MINOR · 2 INFO · 5 superlatives ·
4 checked non-findings · 1 corpus contradiction · 1 corpus confirmation.

---

## §0 — The one-paragraph verdict

`ExportModal` is a small, clean, leak-free, correctly-parented dialog that **emits a contract half
of which nothing implements**. Two of its four switches — *Epicycles* and *Trace path* — have zero
readers anywhere in `web/src`, `web/e2e`, or `api`; the user toggles them off and the PNG comes out
identical. The third, *Labels*, is "implemented" downstream as a hardcoded `clearRect(0,0,200,100)`
that punches a transparent hole through the grid and the curve instead of suppressing labels. Only
*Grid lines* does what it says. The enabling condition is a `Record<string, boolean>` payload
restated at three sites and named at none, and the reason it survived to today is that the frontend
has **no unit-test runner at all** and the one e2e keystone that opens this dialog asserts nothing
about what it exports. The component's own craft is genuinely above the repo mean (§3) — the defect
is that its contract is a promise nobody kept.

---

## §1 — Defects

### L-1 · **BLOCKER** · Two of the four export switches are inert — the emitted contract is 50 % unimplemented

`ExportModal.vue:35-42` emits four keys. `BasisCanvas.exportFrame` destructures exactly two:

```
web/src/components/visualization/BasisCanvas.vue:462   function exportFrame(options: Record<string, boolean> = {}) {
web/src/components/visualization/BasisCanvas.vue:466       const {
web/src/components/visualization/BasisCanvas.vue:467           withGrid: showGrid = true,
web/src/components/visualization/BasisCanvas.vue:468           withLabels: showLabels = true,
web/src/components/visualization/BasisCanvas.vue:469       } = options;
```

`withEpicycles` (`ExportModal.vue:23,37,57`) and `withTrail` (`ExportModal.vue:24,38,61`) are read
**nowhere**. Enumerated, not estimated:

```
$ grep -rn "withEpicycles\|withTrail\|withGrid\|withLabels" web/src web/e2e api
  → 12 hits in ExportModal.vue (decl/emit/template) + 2 in BasisCanvas.vue:467,468. Zero others.
```

The corroborating half is that the draw calls those two options would have to gate are
unconditional: the trail is drawn at `BasisCanvas.vue:144-145`
(`trail.update(...)` → `trail.draw(s, view, trailColor)`) and the epicycle circles at
`BasisCanvas.vue:172`, with the multi-basis twin at `BasisCanvas.vue:356` — none takes an options
argument, and `exportFrame` calls `drawEpicycleFrame` / `drawMultiBasesFrame`
(`BasisCanvas.vue:489-494`) with `(s, data, view)` / `(s, view)` only.

Severity is BLOCKER on the LIBRARY axis because this is the component's *entire* reason to exist:
its sole product is the options record, and half of it is a lie told to the user in a modal that
makes them affirm it. It is also silent — no console warning, no disabled state, no tooltip.

**Falsifier.** Any reader of `withEpicycles` or `withTrail` — in `web/`, in `api/`, in a build
artifact, in a store, behind a dynamic key (`options[someVar]`), or via spread into a drawing call.
I checked all five shapes: the three `Record<string, boolean>` sites (§L-8) are the complete
population of this wire, and `exportFrame` never spreads or forwards `options`. If such a reader is
produced, L-1 collapses to a MINOR naming complaint.

---

### L-2 · **MAJOR** · `withLabels: false` is a destructive fixed-rect erase, not label suppression

```
web/src/components/visualization/BasisCanvas.vue:497       if (!showLabels) {
web/src/components/visualization/BasisCanvas.vue:498           offCtx.clearRect(0, 0, 200, 100);
web/src/components/visualization/BasisCanvas.vue:499       }
```

Two independent failures, from `lib/canvas-drawing/labels.ts`:

1. **It always over-erases.** The `clearRect` runs *after* `drawGrid` (`BasisCanvas.vue:485`), after
   the ghost path, after the trail, after the circles. On a transparent-backed canvas it does not
   "hide the label" — it deletes every pixel in a 200 × 100 CSS-px rectangle at the top-left,
   grid lines and curve included, and leaves a transparent hole in the PNG. Turning *Labels* off
   therefore mutilates the *Grid lines* the user left on. This fires on **every** `withLabels:false`
   export.
2. **It under-erases at 3 active bases.** `labels.ts:23,26` start the legend at `x=16, yOff=16` and
   `labels.ts:65` steps `yOff += 26`; the trailing `N = …` row prints at `yOff - 4`
   (`labels.ts:71`). `BasisSelector.vue:50-56` admits at most three simultaneous bases (one of
   `fourier-epicycles`/`fourier-series`, plus `chebyshev`, plus `legendre`). At three, rows land at
   y = 16, 42, 68 and the `N =` row at y = 90 with a 16 px `textBaseline:"top"` font — extending to
   ≈ y 109, i.e. **9 px below the 100 px clear line**. A clipped sliver of "N = 42" survives in the
   exported PNG.

**Falsifier.** (a) A background fill before the clear (there is none — `exportFrame` only
`clearRect`s at `:483`, so the PNG is alpha-backed); (b) labels drawn *after* the erase (they are
drawn inside `drawEpicycleFrame`/`drawMultiBasesFrame` at `BasisCanvas.vue:197,370`, i.e. before);
(c) a 4th basis being impossible would not save (b) — it is (b) at three, arithmetic above.
Pixel-exactness of the 9 px overhang is font-metric dependent → that sub-claim is
**UNPROVEN-NEEDS-LIVE**; failure (1) is fully static.

---

### L-3 · **MAJOR** · Export has no error posture: it fails silently in one direction and hangs the modal in the other

```
web/src/components/visualization/VisualizationView.vue:99   function doExport(options: Record<string, boolean>) {
web/src/components/visualization/VisualizationView.vue:100      canvasComponent.value?.exportFrame(options);
web/src/components/visualization/VisualizationView.vue:101      showExport.value = false;
web/src/components/visualization/VisualizationView.vue:102  }
```

`exportFrame` returns `void` and early-returns on `!canvasRef.value || !surface.value`
(`BasisCanvas.vue:463`). It also carries an unguarded non-null assertion
`offCanvas.getContext("2d")!` (`BasisCanvas.vue:477`) and an unguarded
`offCanvas.toDataURL("image/png")` (`BasisCanvas.vue:505`) — both can fail on large canvases or
under memory pressure. So:

- **early-return path** → no file is written, `showExport.value = false` runs anyway, the dialog
  closes, and the user is told nothing;
- **throw path** → line `:101` never runs, so the dialog stays open forever with the Save button
  apparently doing nothing, and an uncaught error lands in the console.

The repo already owns the cure it declined to use: `useToast` is imported and used **in this very
file** for the publish failure path (`VisualizationView.vue:13,110-114`
`toast(e.message ?? "Publish failed", "error")`). Export got neither the `try/catch` nor the toast.

**Falsifier.** A global error boundary that surfaces the throw, or a `boolean`/`Promise` return from
`exportFrame` that `doExport` inspects — neither exists (`defineExpose({ anim, exportFrame,
drawImageOverlay })`, `BasisCanvas.vue:515`, exposes the same `void` function). Whether
`toDataURL` actually throws on this app's canvas sizes is **UNPROVEN-NEEDS-LIVE**; the
early-return-closes-silently half is fully static.

---

### L-4 · **MAJOR** · "Save PNG" is reachable in a state where it downloads a blank file

The export trigger is gated on `hasData`, and `hasData` includes the *in-flight* state:

```
web/src/components/visualization/VisualizationView.vue:121  const hasData = computed(() => store.epicycleData || store.basesData || store.computing);
web/src/components/visualization/VisualizationView.vue:235  <div v-if="hasData && !isEditing" class="controls-overlay">
web/src/components/visualization/VisualizationView.vue:236      <AnimationControls … @export-frame="handleExportFrame" />
```

With `store.computing === true` and neither dataset resolved, `exportFrame`'s guard
`if (data || basesData)` (`BasisCanvas.vue:481`) is false — the whole draw block is skipped — and
control falls straight through to `toDataURL` + the synthetic `<a download>`
(`BasisCanvas.vue:505-511`). A fully transparent PNG lands in the user's Downloads folder.

The divergence is doubly wrong because the *on-screen* canvas is not blank in that state:
`drawFrame` routes to `drawPlaceholderFrame` (`BasisCanvas.vue:96`), which `exportFrame` never
calls. `ExportModal` receives `hasEpicycles` but no `hasData`, so it cannot self-gate either.

**Falsifier.** A guard upstream that hides the export item while computing — `AnimationControls.vue`
has none (`:120` `<DropdownMenuItem … @select="emit('exportFrame')">` is unconditional), and the
dock's own `v-if` is the `hasData` above, which is the thing that admits `computing`.

---

### L-5 · **MAJOR** · The export renderer is a drifted clone of the live renderer — WYSIWYG is broken and the modal offers toggles for the wrong things

`exportFrame` (`BasisCanvas.vue:481-500`) re-implements `drawFrame` (`BasisCanvas.vue:91-117`) line
for line **minus one branch**:

```
web/src/components/visualization/BasisCanvas.vue:104      // Image overlay (behind curves)
web/src/components/visualization/BasisCanvas.vue:105      if (props.showImageOverlay) {
web/src/components/visualization/BasisCanvas.vue:106          drawImageOverlay(s, view);
web/src/components/visualization/BasisCanvas.vue:107      }
```

That branch has no counterpart in the export path. A user viewing the reference-image overlay
(`VisualizationView.vue` `showImageOverlay`, persisted by `useViewState`) exports a PNG without it,
with no warning. Meanwhile the ghost path *is* exported (it is read off `props.showGhost` inside
`drawEpicycleFrame:130`), also with no toggle.

So the modal's option surface and the renderer's actual switchable surface are disjoint in both
directions: it offers two controls nothing reads (L-1) and withholds controls for the two effects
that genuinely differ (overlay, ghost). Two hand-maintained copies of a 25-line render sequence is
exactly the duplication the LIBRARY axis exists to catch; the drift is already realised.

**Falsifier.** `drawImageOverlay` being reachable from `exportFrame` transitively — it is not; the
export path calls only `drawGrid`, `drawEpicycleFrame`, `drawMultiBasesFrame`. (`defineExpose` at
`:515` exposes `drawImageOverlay` to the *parent*, and the parent never calls it —
`grep -rn "drawImageOverlay" web/src` → 4 hits, all inside `BasisCanvas.vue`.)

---

### L-6 · **MAJOR** · The four Switches have no author-supplied accessible name, and the repo's only a11y gate is structurally incapable of catching it

`<Switch v-model="withTrail" />` (`ExportModal.vue:57,61,65,69`) renders, through
`glass-ui/dist/Switch-Dr--uLGH.js` → `reka-ui/dist/Switch/SwitchRoot.js`, a
`<button role="switch">` whose entire subtree is a decorative `SwitchThumb` `<span>` — no text, no
`aria-label`, no `id`. ARIA's `switch` role is *name-from-author*; name-from-content is not a legal
fallback. The only naming source present is the wrapping `<label>` (`ExportModal.vue:55,59,63,67`),
and HTML-AAM does not list `label` among a `button`'s naming methods — a fact **axe-core itself
encodes**:

```
web/node_modules/axe-core/axe.js   button: { contentTypes: […], allowedRoles: […],
                                            namingMethods: [ 'subtreeText' ] }
```

The gate blindness is mechanical, and I traced it to the byte:

- `aria-toggle-field-name` (`impact: 'serious'`, selector includes `[role="switch"]`) uses
  `matches: 'no-naming-method-matches'`, and `noNamingMethodMatches` returns **false** whenever the
  element spec has a non-empty `namingMethods` — `button` has one. **The rule never matches this
  element.**
- `button-name` (`impact: 'critical'`) *does* match, but its `any:` list contains
  `'implicit-label'`, whose evaluator is `closest(virtualNode, 'label')` + accessible-text of that
  label. The wrapping `<label>` satisfies it. **The rule passes regardless of what any AT computes.**

Hence the green keystones `keystone: ExportModal Dialog-open is a11y-clean`
(`web/e2e/visualization-ux.spec.ts:150`) and `a11y keystone: ExportModal Dialog-open is clean @ …`
(`web/e2e/visualization-crud.spec.ts:640`) are **not evidence** here: they are structurally
incapable of failing on this. They also run Chromium only (`web/playwright.config.ts` `projects:
[{ name: "chromium" }]`; CI `npx playwright test --project=chromium`, `.github/workflows/ci.yml:185`).

The substrate hands over the cure and the component declines it: `SwitchRoot.js` computes
`ariaLabel = props.id && document.querySelector('[for="${props.id}"]')?.innerText` — an explicit
`id` + `<label for>` bridge. One `aria-label="Trace path"` per switch, or four `id`/`for` pairs,
closes it.

**Falsifier.** An accname probe (Chromium AX tree / VoiceOver / NVDA) reporting "Epicycles" etc. on
the switch — Blink *may* map a wrapping label onto a `<button>` even though HTML-AAM does not
require it. **That half is UNPROVEN-NEEDS-LIVE (SS-13).** The half that is *proven statically* and
survives any live outcome: the component supplies no author name, and the repo's a11y gate cannot
detect the absence of one. If the live probe comes back named, downgrade to MINOR
(engine-dependent) — do not close it.

---

### L-7 · **MAJOR (UNPROVEN-NEEDS-LIVE)** · Focus restoration on close aims at a trigger reka-ui has already destroyed

Because `:open="true"` is a literal (`ExportModal.vue:46`), the dialog can never transition to
closed *while mounted* — every dismissal is a parent `v-if` unmount
(`VisualizationView.vue:281`). On unmount, `FocusScope`'s cleanup dispatches
`AUTOFOCUS_ON_UNMOUNT` (`reka-ui/dist/FocusScope/FocusScope.js:101-116`), and
`DialogContentModal.js` handles it by **preventing** FocusScope's own body fallback and focusing the
captured trigger instead:

```
reka-ui/dist/Dialog/DialogContentModal.js:57-61   onCloseAutoFocus: (event) => {
                                                     if (!event.defaultPrevented) {
                                                       event.preventDefault();
                                                       rootContext.triggerElement.value?.focus();
                                                     } }
```

`triggerElement` is whatever was focused when `DialogContentImpl` mounted
(`DialogContentImpl.js:51-54` `if (getActiveElement() !== document.body) rootContext.triggerElement.value = getActiveElement()`).
The open path is a `DropdownMenuItem` with an un-prevented `@select`
(`AnimationControls.vue:120`), so reka's DropdownMenu closes and unmounts that menu item in the same
flush that mounts the dialog. A `.focus()` on a detached element is a no-op, and because
`preventDefault()` already fired, FocusScope's `focus(previouslyFocusedElement ?? document.body)`
fallback is skipped — keyboard focus is likely dropped to `<body>`, dumping the user at the top of
the document after every export or cancel.

**Falsifier.** Live `document.activeElement` after Cancel/Esc/Save. If it is the dock's "More
options" trigger, reka restored through the menu's own scope and this is a non-finding. The
*structural* half — hard-coded `:open="true"` forces every close through the unmount path, which is
the path with the detached-trigger hazard — stands either way and is the real LIBRARY complaint
(see L-9).

---

### L-8 · **MAJOR** · `Record<string, boolean>` — one contract, restated three times, named zero times

```
web/src/components/visualization/ExportModal.vue:19        (e: "export", options: Record<string, boolean>): void;
web/src/components/visualization/VisualizationView.vue:99  function doExport(options: Record<string, boolean>) {
web/src/components/visualization/BasisCanvas.vue:462       function exportFrame(options: Record<string, boolean> = {}) {
```

`grep -rn "Record<string, boolean>" web/src` returns exactly these three lines — the complete
population of the type, all on one wire. `grep -rn "ExportOptions\|exportOptions" web/src` → **0**.
An index signature over `boolean` accepts every key and rejects none, so producer and consumer can
drift arbitrarily far apart while `vue-tsc -b` stays green — which is precisely how L-1 shipped: TS
has nothing to compare. This is the enabling condition, not a style note.

The KISS cure is one exported interface (`ExportOptions { withGrid: boolean; withLabels: boolean }`)
in `visualization/lib/`, consumed at all three sites; the compiler then rejects `withEpicycles` and
`withTrail` as excess properties at the emit site and L-1 becomes a build error.

**Falsifier.** A fourth site, or a narrowing alias elsewhere in the tree — neither exists.

---

### L-9 · **MINOR** · `:open="true"` + parent `v-if` = split ownership; the close animation and the scrim fade can never render

`ExportModal.vue:46` hard-codes `:open="true"`; the parent controls existence with
`v-if="showExport"` (`VisualizationView.vue:281`). reka's `DialogRoot` therefore runs
`useVModel(..., { passive: props.open === void 0 })` with `passive === false`
(`DialogRoot.js:31-34`) — a controlled prop that is never anything but `true`, so
`data-state` (`DialogContentImpl.js:79`) is permanently `"open"` and the
`[data-state=closed]` half of glass-ui's `popover-animate duration-normal`
(`DialogContent-DDE6pQBU.js`) is dead CSS. The dialog and its scrim vanish in a hard cut.

The idiomatic shape is a single owner: `v-model:open` bound to the parent's `showExport` (and
`v-if` dropped, or kept as a lazy-mount with Presence handling the exit). Same line count, one
source of truth, and it also removes the forced-unmount hazard behind L-7.

**Falsifier.** A `Transition` or `forceMount` wrapper at the call site restoring an exit —
`VisualizationView.vue:281` has neither (its sibling `FullscreenViewer` at `:282` uses a `:visible`
prop instead, so the file is not even internally consistent about the idiom).

---

### L-10 · **MINOR** · Dangling `aria-describedby` + a dev-console warning on every open — and the gate files it as "incomplete", not a violation

`DialogContentImpl` unconditionally sets `aria-describedby = rootContext.descriptionId`
(`DialogContentImpl.js:78`) and mints that id at `:50`. `ExportModal` renders no `DialogDescription`
(the symbol is exported at `glass-ui/dist/components/ui/dialog/index.d.ts` and never imported here —
`ExportModal.vue:5-11` imports 5 of the 9 dialog parts). Consequences:

- reka's `useWarning` fires `console.warn("Warning: Missing \`Description\` or
  \`aria-describedby=\"undefined\"\` for DialogContent.")` on every mount in dev
  (`reka-ui/dist/Dialog/utils.js`, guarded by `process.env.NODE_ENV !== "production"`);
- the rendered `aria-describedby` points at an id that resolves to nothing.

Second gate blindness, again traced to the byte: axe's `aria-valid-attr-value` has an explicit
`preChecks['aria-describedby']` that, on an unresolvable IDREF, sets `needsReview` and returns
`undefined` — short-circuiting the `&& !validValue` push, so the node lands in **incomplete**, not
`violations`. Both keystones filter `results.violations` only
(`visualization-ux.spec.ts:32-34`, `visualization-crud.spec.ts:89-91`). Invisible by construction.

**Falsifier.** A `DialogDescription` (or `aria-describedby` override) anywhere in the subtree — grep
of the component finds none, and glass-ui's `DialogContent` chunk contains the string `Description`
**0** times.

---

### L-11 · **MINOR** · `aria-modal="true"` is asserted in three comments and rendered by nobody

```
web/src/components/visualization/ExportModal.vue:29   // Esc-to-close, and `aria-modal`. …
web/src/components/visualization/ExportModal.vue:47   <!-- DialogContent supplies role="dialog" + aria-modal="true" + focus-trap
web/e2e/visualization-crud.spec.ts:655                // The glass-ui Dialog exposes role="dialog" + aria-modal.
```

Those are the *only three* occurrences of `aria-modal` in `web/src` + `web/e2e`. The attribute is
emitted by neither dependency: `grep -rl "aria-modal"` over `reka-ui@2.9.10/dist` → **0 files**;
over `@mkbabb/glass-ui@4.0.0/dist` → **0 files**. `DialogContentImpl.js:75-82` renders
`role`, `aria-describedby`, `aria-labelledby`, `data-state` — no `aria-modal`. Modality is instead
achieved by `useHideOthers` → `aria-hidden` on siblings (`DialogContentModal.js:47`), which is a
legitimate alternative technique — so the *outcome* is probably fine and the *documentation* is
false. Worse, the e2e comment documents an assertion the test does not make: both keystones assert
only `page.locator('[role="dialog"]')` visibility.

**Falsifier.** A live DOM dump showing `aria-modal` on the content node — would mean some third
party injects it; there is no third party in this subtree. Comment-vs-tree divergence is static and
final.

---

### L-12 · **MINOR** · Both `Button`s pass the cva defaults explicitly

`variant="default" size="default"` (`ExportModal.vue:74,75`) restate
`defaultVariants: { variant: "default", size: "default" }` verbatim
(`glass-ui/dist/button-BNDWhAZb.js`). Four redundant attribute bytes per button; noise that will
silently become *load-bearing* the day glass-ui changes a default (relevant: the census books this
app for a `glass-ui 4 → 7` uplift). The Cancel button's `variant="outline"` is meaningful and should
stay; `size="default"` on both should go.

**Falsifier.** A different default in the pinned version — read above, it is `default`/`default`.

---

### L-13 · **MINOR** · `props.hasEpicycles &&` dead-guards data nothing reads

`ExportModal.vue:37` masks `withEpicycles` by the prop, but `ExportModal.vue:55` already `v-if`s the
control away in exactly that case, and the emitted key has no reader at all (L-1). It is a guard,
over a control that cannot be reached, on a value nobody consumes — three layers of nothing. It is
also the *only* use of `props` in the file, so retiring L-1 correctly (delete the two dead keys)
lets `const props =` collapse to a bare `defineProps`.

**Falsifier.** A path where `hasEpicycles` flips false while the modal is mounted and the ref is
stale — possible in principle (`activeBases` is reactive), but moot: no reader.

---

### L-14 · **MINOR** · Options reset to `true` on every open, in a file family that persists everything else

`ref(true)` ×4 (`ExportModal.vue:23-26`) + `v-if` remount = the user's last export choice is
discarded every time. The immediate sibling state — editing / ghost / overlay / equation — is
persisted through `useViewState` to localStorage (`VisualizationView.vue:37-38`), and the animation
settings are debounce-persisted to the workspace (`VisualizationView.vue:52-63`). Export preferences
are the one control surface in this view that forgets. Colocation/consistency defect rather than a
correctness one; note that it is only *worth* fixing after L-1, since three of the four toggles
currently have nothing to remember.

**Falsifier.** A store field mirroring these four — `grep` over `stores/` finds none.

---

### L-15 · **MINOR** · `lucide-vue-next` import — one of the 35 sites the census books, and the app ships two icon libraries

`ExportModal.vue:12` imports `Download` from `lucide-vue-next`, which `web/package.json` lists under
**devDependencies**. glass-ui@4.0.0 peers on the *different* package `@lucide/vue`
(`glass-ui/package.json` peerDependencies) and imports it at runtime (1 dist `.js` file); both are
installed (`web/node_modules/@lucide/vue` exists). Two icon packages, one bundle.

This is the census row `lucide-vue-next → @lucide/vue ×35 sites` [CENSUS §3a, "the uplift break
surface"] — **CONFIRMED at this site**, and it is inside the atomic
`glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0` transaction the census calls THE RESOLUTION
DEADLOCK. Booked, not new; recorded so the per-component sweep has its coordinate.

**Falsifier.** `@lucide/vue` re-exporting `lucide-vue-next` (it does not; distinct packages,
distinct specifiers, both resolvable).

---

### L-16 · **MINOR** · The option rows are hand-unrolled — the **R5-7 dual**

R5-7 [`lane-fourier-r3-r6.md` §3, ADOPT-AS-FACT + CARRY → F.W4] holds that *template-loop evidence
keyed to component callsites is blind to native HTML element loops*, instanced by
`PaperSidebar.vue`'s three nested `<li v-for>` at lines 65/87/105, and cured by R6-5's new
`NATIVE_TEMPLATE_LOOP` family.

**R5-7 is NOT-APPLICABLE-AS-STATED here.** Falsifier run and passed:
`grep -c "v-for" web/src/components/visualization/ExportModal.vue` → **0**. There is no loop of
either kind.

The **dual** applies, and it is strictly worse than PaperSidebar's position. The four option rows
(`ExportModal.vue:55-70`) are four near-identical hand-written `<label>` blocks over a set that is
plainly data — `{key, label}` ×4. Because the set is unrolled:

- a component-callsite deriver counts nothing (R5's failure mode), **and**
- R6-5's cured `NATIVE_TEMPLATE_LOOP` family also counts nothing — there is no native loop to
  register either. PaperSidebar's blindness was *curable by a new family*; this one is invisible to
  both families by construction.
- The consequence is not merely metrological: the emitted key strings (`ExportModal.vue:37-40`) have
  no structural relationship to the rendered controls (`:57,61,65,69`), which is why two of them can
  be inert (L-1) with nothing in the tree noticing.

`const OPTIONS = [{ key: "withGrid", label: "Grid lines" }, …] as const` + one `v-for` + a
`Record<(typeof OPTIONS)[number]["key"], boolean>` payload collapses L-8, L-16 and the *mechanism*
of L-1 in about six lines, and hands F.W4 a countable loop. **CARRY → F.W4** as a positive instance
of the R5-7 carry ("count native element loops") extended: *and flag data-shaped hand-unrolls, which
neither family can see.*

**Falsifier.** The set genuinely being heterogeneous (differing control types / conditional
semantics per row). It is not: all four rows are `label > span + Switch`, byte-identical modulo the
string and the ref; only row 1 carries a `v-if`, expressible as a per-entry `when` field.

---

### L-17 · **INFO** · `@reference "tailwindcss"` pulled in to serve a single `@apply text-base`

`ExportModal.vue:85` + `:111`. The `@reference` re-parses the theme graph for this SFC to resolve
one utility whose expansion is `font-size: 1rem; line-height: 1.5rem` — two plain declarations that
would sit beside the `font-weight: 500` already written at `:112`. This is the house idiom
(35 of 66 SFCs carry `@reference "tailwindcss"`), so it is not an ExportModal deviation — recorded
as INFO with the observation that this is the thinnest instance of it in the visualization tree.

**Falsifier.** `text-base` being token-mapped to something non-obvious in this app's theme — it is
not overridden; glass-ui's own conflict table lists `text-base` under the plain font-size family
(`cn-DJXf4yaB.js`).

---

### L-18 · **INFO** · Three dismiss affordances on two code paths

`DialogContent` renders a built-in close X by default (`showClose: boolean` default `true`,
`DialogContent.vue.d.ts`); Esc / backdrop / X all route through `@update:open` → `onOpenChange` →
`emit("close")` (`ExportModal.vue:31-33,46`), while Cancel calls `emit('close')` directly
(`ExportModal.vue:74`). The outcomes coincide today, so this is not a defect — but it means the
component has one dismissal *semantics* reached by two mechanisms, and any future close-time work
(persisting L-14, confirming unsaved state) must be added twice or it will be half-applied. Naming a
single `function close()` and pointing both at it is the one-line hedge.

**Falsifier.** The two paths already diverging — they do not; both emit the same bare `close`.

---

## §2 — Checked non-findings (falsifier discipline: these were suspected and did not survive)

1. **The ctx-swap is not a torn-frame hazard.** `exportFrame` mutates the *shared* surface object
   (`BasisCanvas.vue:479-480` `const origCtx = s.ctx; s.ctx = offCtx;`) and restores at `:502`.
   Suspected: an rAF frame from the animation clock draws into the offscreen canvas and the visible
   canvas drops a frame. **Does not fire** — the entire swap → draw → `toDataURL` → restore sequence
   is synchronous with no `await` and no yield, so no rAF callback can interleave. Non-finding.
2. **The wrapping `<label>` does not double-toggle the Switch.** Suspected: click on the button
   bubbles to the label, whose activation behaviour re-fires a synthetic click → two toggles. **Does
   not fire** — HTML's label activation behaviour is inhibited when the event target is interactive
   content, and the `SwitchThumb` is `pointer-events-none`
   (`glass-ui/dist/Switch-Dr--uLGH.js`), so the button is always the target.
3. **No teardown leak.** `useHideOthers` undoes `aria-hidden` in `onUnmounted`
   (`reka-ui/dist/shared/useHideOthers.js`), and `FocusScope` removes its `focusin`/`focusout`
   listeners and disconnects its MutationObserver in `watchEffect` cleanup
   (`FocusScope.js:79-83`). The v-if unmount is clean. Non-finding (and see S-2).
4. **Modality is not lost to a Boolean-cast footgun.** See S-1 — this one *nearly* fired.

---

## §3 — Superlatives (L-18 runs both ways)

**S-1 · The dialog stays modal across a two-library-deep footgun the component never had to know
about.** glass-ui declares `modal: { type: Boolean }` with **no default**
(`DialogContent-DDE6pQBU.js`, the `Dialog` shim), so Vue's Boolean casting materialises
`props.modal === false` — which, forwarded naively, would demote reka to `DialogContentNonModal`:
no focus trap, no `hideOthers`. It does not, because reka's `useForwardProps` builds its key set
from `{...defaultProps, ...vm.vnode.props}` (`reka-ui/dist/shared/useForwardProps.js`) and
`ExportModal.vue:46` writes only `:open` and `@update:open` — `modal` is never in the vnode props
and glass-ui declares no default for it, so the key is dropped and reka's own `default: true`
(`DialogRoot.js:22-25`) stands. The component is correct here by a margin three files deep.
**Falsifier:** writing `:modal` explicitly at the call site (even `:modal="true"`) would put the key
in `vnode.props` — and *then* the cast would bite for any consumer who omits it elsewhere. The
credit is real and the hazard is one keystroke away; worth relaying to the glass-ui BH inbox per
standing law.

**S-2 · Zero-leak by construction.** No `onMounted`/`onUnmounted`, no `watch`, no timers, no
observers, no listeners, no `defineExpose` — 43 lines of script that own nothing disposable. Every
subscription in the mounted subtree belongs to reka and every one of them cleans up (§2.3). Contrast
the sibling on the very render path this component drives: `BasisCanvas.vue:453-459` must explicitly
`visibilityObserver?.disconnect()`, null the handle, **and** release a visibility credit
(`if (lastVisible) anim.setCanvasVisible(false)`) or the store's canvas count leaks. ExportModal has
no such surface to get wrong. **Falsifier:** any resource acquired in the script block — there is
none.

**S-3 · Textbook glass-consumer purity.** Three glass-ui subpaths (`/button`, `/switch`, `/dialog`),
zero direct `reka-ui` imports, zero shadcn copies, zero local re-implementation of a dialog or a
switch. This is exactly the posture CENSUS §3a credits the repo with ("deepest, cleanest consumer in
the constellation … 0 direct reka-ui; 0 shadcn copies"), instanced here. **Falsifier:** a local
`components/ui/dialog` shadow — none exists.

**S-4 · Single-source-of-truth parenting, without the retrofit its siblings needed.** The child
speaks two events and exposes nothing; the parent owns `showExport`
(`VisualizationView.vue:69,98,101,281`). This is the shape the tranche had to *retrofit* onto a
sibling — `VisualizationView.vue:71-74` records B.W2 converting `CanvasControlsDock`'s out-of-band
`defineExpose(dockExpanded)` into a typed emit. `ExportModal` never had that defect. **Falsifier:**
a `defineExpose` or a mutated prop — neither is present. (L-9's `:open="true"` is a *child-internal*
split with the library, not a parent-child one; the parent-facing contract is clean.)

**S-5 · The offscreen export honours device-pixel-ratio correctly.** `offCanvas.width/height` are
taken from the *backing store* dimensions and the transform is re-established with
`offCtx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)` (`BasisCanvas.vue:473-478`) before any drawing —
so the PNG is a true HiDPI capture and not a CSS-pixel downsample, which is the mistake most
canvas-export implementations make. Credit belongs to `BasisCanvas`, but it is the path this
component exists to invoke. **Falsifier:** a `dpr` of 1 hard-coded or the transform applied after
`drawGrid` — neither.

---

## §4 — Corpus reconciliation

**X-A · CONTRADICTION — `lane-frontend.md:70`, "Dead devDeps (measured, not estimated):
`class-variance-authority`, `clsx`, `tailwind-merge` all have 0 import sites in `src/`".**
The measurement is right and the *inference* is wrong for two of the three. `src/` is not the
denominator that matters: these are **declared peerDependencies of `@mkbabb/glass-ui`**
(`glass-ui/package.json` peerDependencies lists `class-variance-authority: ^0.7` and `clsx: ^2.0`)
and glass-ui's **published dist imports them by bare specifier at runtime**, resolved out of the
app's own `node_modules`:

| package | runtime `.js` files in glass-ui dist that import it | verdict |
|---|---:|---|
| `tailwind-merge` | **0** | **dead — lane-frontend TRUE** (glass-ui ships its own conflict table in `cn-DJXf4yaB.js`) |
| `clsx` | **1** (`cn-DJXf4yaB.js:1` `import { clsx as e } from "clsx"`) | **LIVE — lane-frontend FALSE** |
| `class-variance-authority` | **8** (incl. `button-BNDWhAZb.js:4` `import { cva as u } from "class-variance-authority"`) | **LIVE — lane-frontend FALSE** |

`cn-DJXf4yaB.js` is imported by every glass-ui component in this component's own import list
(`Button`, `Switch`, `DialogContent`). Deleting `clsx` or `class-variance-authority` on the strength
of that row breaks the Vite build of **`ExportModal.vue:3-11` specifically**. Correct the row to:
*"`tailwind-merge` is dead; `clsx` + `class-variance-authority` are live peer deps of glass-ui —
their zero `src/` import count is expected and is not evidence of deadness."* `DESIGN.md:32`'s
booked "Remove unused CVA dependency" inherits the same error and must be re-scoped to
`tailwind-merge` only. **CARRY → the F.W4 dependency sweep.**

**X-B · CONFIRMED — `lane-frontend.md:70`, reka-ui "0 direct imports … 6 mentions are all prose
comments (… `ExportModal.vue:28,48` …)".** Reproduced exactly against the live tree: this file's
reka-ui mentions are the comment at `:28-30` and the comment at `:47-48`, zero import statements.
Adopt as-is.

**X-C · `lane-frontend.md:95` inventory row** (`components/visualization/ExportModal.vue | 114 |
Export dialog (Dialog + Switch)`) reproduces exactly — 114 lines, and the parts are `Dialog`,
`DialogContent/Header/Title/Footer`, `Switch`, `Button`. Adopt.

**X-D · R5-7 disposition** — NOT-APPLICABLE-AS-STATED at this component (0 `v-for`), dual booked as
**L-16** with a proposed extension of the F.W4 carry. See L-16.

**X-E · CENSUS §3a uplift row** — `lucide-vue-next → @lucide/vue` confirmed at `ExportModal.vue:12`
(L-15); no new break surface found in this component beyond that one line.

---

## §5 — Coverage: why L-1 shipped

- **The frontend has no unit-test runner.** `web/package.json` scripts are `dev`, `build`,
  `preview`, `test:e2e`, `test:e2e:ui`; the string `vitest` appears **0** times. There is no test
  anywhere that can call `doExport()` and assert its payload.
- **The two e2e keystones that open this dialog assert nothing about it.**
  `visualization-ux.spec.ts:150-164` and `visualization-crud.spec.ts:640-660` open the modal,
  assert `[role="dialog"]` visibility, and run axe. Neither flips a switch, neither clicks
  **Save PNG**, neither inspects a download.
  `grep -rn "withGrid\|withLabels\|Save PNG" web/e2e` → **0**.
- **The type system was disarmed** by `Record<string, boolean>` (L-8).

Three independent gates, all of which would have caught L-1, and none of which was armed. The
minimum honest cure is the named `ExportOptions` interface (compile-time) plus one e2e that toggles
*Grid lines* off, clicks Save, and asserts the download event fires with a non-empty PNG.

---

## §6 — Ranked remediation (KISS, in order)

1. **L-1 + L-8 together** — name the contract, delete the two inert keys and their switches (or
   implement them in `drawEpicycleFrame`/`drawMultiBasesFrame`; deleting is the honest default until
   the render path grows the parameters). One interface, three call sites, four deleted lines here.
2. **L-2** — replace `clearRect(0,0,200,100)` with a `showLabels` parameter threaded to
   `drawBasisLabels` / `drawEpicycleLabel`; the destructive erase goes away entirely.
3. **L-3 + L-4** — make `exportFrame` return `boolean` (or throw a typed error), `try/catch` in
   `doExport`, `toast(...)` on failure, and close the modal only on success; refuse to export while
   `store.computing`.
4. **L-6** — four `aria-label`s (or `id`/`for` pairs). One line each.
5. **L-5** — collapse `exportFrame` onto `drawFrame` with an `into?: CanvasRenderingContext2D`
   parameter so the two paths cannot drift again; then the overlay/ghost toggles become offerable.
6. **L-9 + L-7** — `v-model:open` at the call site; retire `:open="true"`.
7. **L-16** — the `OPTIONS` array + `v-for`, once (1) has settled the key set.
8. **L-10, L-11, L-12, L-13, L-14, L-15, L-17, L-18** — a single tidy-up commit; L-11's false
   comments should be corrected, not deleted (the `hideOthers` mechanism is worth naming).

---

## §7 — Provenance index

| claim | primary evidence |
|---|---|
| L-1 | `ExportModal.vue:23,24,37,38,57,61` · `BasisCanvas.vue:462,466-469,144-145,172,356,489-494` · exhaustive grep (web/src, web/e2e, api) |
| L-2 | `BasisCanvas.vue:483,485,497-499` · `lib/canvas-drawing/labels.ts:23,26,65,71` · `BasisSelector.vue:50-56` |
| L-3 | `VisualizationView.vue:99-102,13,110-114` · `BasisCanvas.vue:463,477,505,515` |
| L-4 | `VisualizationView.vue:121,235-236,98` · `BasisCanvas.vue:96,481,505-511` · `AnimationControls.vue:120` |
| L-5 | `BasisCanvas.vue:91-117` vs `:481-500` · `:104-107` · `:130` |
| L-6 | `ExportModal.vue:55-70` · `reka-ui/Switch/SwitchRoot.js` · `glass-ui/dist/Switch-Dr--uLGH.js` · `axe-core/axe.js` (`button.namingMethods`, `aria-toggle-field-name`, `noNamingMethodMatches`, `button-name`, `implicitEvaluate`) · `visualization-ux.spec.ts:150` · `visualization-crud.spec.ts:640` · `playwright.config.ts` projects · `.github/workflows/ci.yml:185` |
| L-7 | `ExportModal.vue:46` · `VisualizationView.vue:281` · `reka-ui/Dialog/DialogContentModal.js:57-61` · `DialogContentImpl.js:51-54` · `FocusScope/FocusScope.js:101-116` · `AnimationControls.vue:120` |
| L-8 | `ExportModal.vue:19` · `VisualizationView.vue:99` · `BasisCanvas.vue:462` · grep (3 sites, 0 named type) |
| L-9 | `ExportModal.vue:46` · `DialogRoot.js:31-34` · `DialogContentImpl.js:79` · `DialogContent-DDE6pQBU.js` |
| L-10 | `DialogContentImpl.js:50,55-62,78` · `reka-ui/Dialog/utils.js` · `axe.js` `ariaValidAttrValueEvaluate` preChecks · spec filters `:32-34` / `:89-91` |
| L-11 | `ExportModal.vue:29,47` · `visualization-crud.spec.ts:655` · grep `aria-modal` over both dists → 0 |
| L-12 | `ExportModal.vue:74,75` · `button-BNDWhAZb.js` `defaultVariants` |
| L-13 | `ExportModal.vue:14,37,55` |
| L-14 | `ExportModal.vue:23-26` · `VisualizationView.vue:37-38,52-63` |
| L-15 | `ExportModal.vue:12` · `web/package.json` devDependencies · `glass-ui/package.json` peers · CENSUS §3a |
| L-16 | `ExportModal.vue:37-40,55-70` · `lane-fourier-r3-r6.md` R5-7 / R6-5 · grep `v-for` → 0 |
| L-17 | `ExportModal.vue:85,111` · 35/66 SFC idiom count |
| L-18 | `ExportModal.vue:31-33,46,74` · `DialogContent.vue.d.ts` `showClose` |
| S-1 | `DialogContent-DDE6pQBU.js` Dialog shim props · `shared/useForwardProps.js` · `DialogRoot.js:22-25` · `ExportModal.vue:46` |
| S-2 | `ExportModal.vue:1-43` (no lifecycle) · `useHideOthers.js` · `FocusScope.js:79-83` · contrast `BasisCanvas.vue:453-459` |
| S-3 | `ExportModal.vue:3-11` · CENSUS §3a |
| S-4 | `VisualizationView.vue:69,71-74,98,101,281` |
| S-5 | `BasisCanvas.vue:473-478` |
| X-A | `glass-ui/package.json` peers · `cn-DJXf4yaB.js:1` · `button-BNDWhAZb.js:4` · dist import counts 0/1/8 · `lane-frontend.md:70` · `DESIGN.md:32` |
