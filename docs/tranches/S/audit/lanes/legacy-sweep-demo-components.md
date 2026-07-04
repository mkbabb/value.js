# S · legacy/workaround/fallback sweep — `demo/@/components/**`

Audit-only. Repo `value.js` @ `c5aa091` (branch `tranche-q`). Scope: 142
non-vendor files under `demo/@/components/custom/` (the shadcn-vue `ui/` tree
excluded per CLAUDE.md). Method: full-tree grep sweep for `catch`,
`TODO|FIXME|HACK`, `as any`/`as unknown as`, `??`/`?.` chains, dynamic
`import()`, dead `v-if`, commented code, deprecated/compat naming — every hit
read in context; cross-referenced against the S-ledger where a root cause
surfaced.

---

## P0

### F1 — `onFork` is duplicated + DRIFTED between the pane and the dialog (DRY + silent-failure)
- `demo/@/components/custom/panes/BrowsePane.vue:178-197` (`onFork`) and
  `demo/@/components/custom/palette-browser/PaletteDialog/composables/useDialogBrowseActions.ts:29-39`
  (`onFork`) are the same operation — `pm.ensureUser()` → `pm.ensureSession()`
  → `pm.versions.fork(slug)` → prepend to `pm.remotePalettes` — hand-copied
  into two call sites instead of one shared composable/action.
- **They have already drifted**: `BrowsePane`'s copy additionally increments
  the source palette's `forkCount` (lines 185-193); the composable's copy does
  not. Forking the *same* palette from the standalone Browse pane vs. from
  inside `PaletteDialog` now produces **different observable state** — the
  fork-count badge updates in one surface and silently fails to update in the
  other. This is exactly the copy-paste-then-diverge failure DRY exists to
  prevent, already realized.
- The composable's own docstring
  (`useDialogBrowseActions.ts:1-17`) claims it was "Extracted from
  `PaletteDialog.vue`" — the extraction never absorbed `BrowsePane.vue`, so
  the god-module split created a second silent fork of the logic rather than
  a single shared source.
- `onTierChange` / `onTagsChange` / `onClearFilters` are **also** byte-for-byte
  duplicated between the same two files (`BrowsePane.vue:260-275` vs.
  `useDialogBrowseActions.ts:50-64`) — same pattern, not yet drifted, but the
  same DRY defect.
- **Verdict: EXCISE.** Both call sites should consume the one
  `useDialogBrowseActions`-shaped composable (rename it host-agnostic, e.g.
  `usePaletteBrowseActions`, and have `BrowsePane.vue` inject/call it instead
  of hand-rolling a second copy). Root-fix the fork-count drift by porting
  `BrowsePane`'s increment step into the shared function — whichever site is
  "correct" wins, but there must be exactly one implementation.
- **ROOT-ROUTE: value.js demo.**

### F2 — silent `console.warn`-only failure on `onFork`, inconsistent with its own file's established pattern
- `BrowsePane.vue:194-196`: `catch (e) { console.warn("Failed to remix palette:", e); }`
  — no user-facing surface at all.
- `useDialogBrowseActions.ts:36-38`: identical — `console.warn` only.
- This is a **silent catch** by the sweep's own definition, and it's not even
  internally consistent: the *same file* (`BrowsePane.vue`) wires
  `card.showFeedback(message, "error")` for `onSave` (line 158-163) and
  `onDeleteOwned` (line 166-174) failures, but the sibling `onFork` — an
  equally user-triggered, equally fallible remote mutation — swallows its
  error with a console line only. A user who forks a palette that 409s/500s
  sees nothing happen and has no idea why.
- **Verdict: FAIL-EXPLICIT.** Route the catch through the same
  `card.showFeedback(..., "error")` (or the dialog-side equivalent) that
  `onSave`/`onDeleteOwned` already use in the same file, in both call sites
  identified in F1.
- **ROOT-ROUTE: value.js demo.**

---

## P1

### F3 — `ColorSpaceSelector`'s trigger has no font-family of its own; it silently inherits from an ambient ancestor class (root cause of ledger S-1)
- `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:28-36`
  — the `SelectTrigger` carries `space-trigger w-fit h-fit italic
  tracking-tight ...` and **no `font-display` class**. The Fraunces face only
  ever appears on the `SelectItemText` span inside `SelectContent` (line 55:
  `class="font-display italic text-title leading-tight"`), which
  `SelectValue` (a glass-ui wrapper, `demo/@/components/ui/select/index.ts:1`
  re-exports it from `@mkbabb/glass-ui`) renders into the trigger — but the
  rendered trigger text does not carry the source item's classes forward in
  a way that survives outside an ancestor that already sets `font-display`.
- Consumer 1, `ColorPicker.vue:24`: `<CardHeader class="font-display ...">` —
  wraps `<ColorSpaceSelector>` in an ancestor that happens to already declare
  `font-display`. The trigger renders correctly **by accident of ambient
  inheritance**, not because the component supplies its own face.
- Consumer 2, `AboutPane.vue:8-16`: the same `<ColorSpaceSelector>` sits
  inside `PaneHeader.vue:3`'s `<h3 class="pane-header-title text-heading">`
  — no `font-display` ancestor anywhere in the chain. This is the literal
  ledger S-1 defect: "the About one paints the wrong face" — confirmed, and
  the root cause is that the component was authored assuming a specific
  ambient class from ONE of its two consumers, never stated as an explicit
  contract (no comment, no prop, no self-supplied class).
- **Verdict: FAIL-EXPLICIT → EXCISE the ambient dependency.** The trigger
  must declare `font-display` on itself (`ColorSpaceSelector.vue:33`), not
  rely on whichever ancestor happens to wrap it. This also directly unblocks
  S-1's "same component, restyled as a pure component of the title" ask.
- **ROOT-ROUTE: value.js demo.**

### F4 — `ColorSpaceSelector` still renders the pill/veil capsule + counter text the ledger asks to remove (S-1 / S-14 confirmed at source)
- `ColorSpaceSelector.vue:5`: `<div class="space-capsule veil-surface w-fit ...">`
  plus the `.space-capsule` rule at lines 151-158 (`border-radius:
  var(--radius-pill)`, padding, veil border) is the exact "background +
  rounded pill bg" S-1 says must go — it's the SAME single component
  consumed by both the picker and About page (confirmed: only one file,
  `display/ColorSpaceSelector.vue`, imported at `ColorPicker.vue:74` and
  `AboutPane.vue:49`), so one fix here satisfies "both must be the same" by
  construction — the inconsistency users see (S-1) is purely the font-face
  bug (F3 above), not a duplicated-component problem.
- `ColorSpaceSelector.vue:9-11`: the `space-eyebrow` span renders `color
  space — {{ pad(activeIndex + 1) }} / {{ pad(spaceEntries.length) }}` — this
  is the literal `— 06 / 16` counter ledger item S-14 asks removed from "both
  dropdowns"; since both dropdowns are this one component, one deletion
  satisfies both.
- **Verdict: EXCISE** the `.space-capsule`/`veil-surface` wrapper div's
  background/pill treatment (S-1: "just the space name + caret") and the
  `.space-eyebrow` counter block (S-14) directly in this one file.
- **ROOT-ROUTE: value.js demo.**

### F5 — `Dock.vue` collapsed slot still renders a text label that clips (root cause of ledger S-8)
- `demo/@/components/custom/dock/Dock.vue:217-230`, the `#collapsed`
  template: renders `<WatercolorDot>` (line 218) then a breakpoint-gated pair
  — an icon `sm:hidden` (line 225) and a text label `hidden sm:inline` (line
  226: `{{ viewManager.currentConfig.value.label }}`). This is precisely the
  S-8 defect: "'Pal' text clipped over the dot" — the collapsed dock swaps
  between two entirely different visual treatments (icon-only vs.
  label-plus-dot) depending on viewport width, i.e. **runtime shape-shifting
  that should be static** per the sweep's own "effusive dynamism" criterion.
  S-8's ask ("should be the WatercolorDot + an icon, NO text") wants exactly
  ONE of these two branches, always — not a breakpoint-conditional fork.
- **Verdict: EXCISE** the `hidden sm:inline` label span (line 226) entirely;
  keep the dot + icon pairing unconditionally (drop the `sm:hidden` on the
  icon too, since there is no longer a competing text branch to hide it for).
- **ROOT-ROUTE: value.js demo.**

### F6 — `@mbabb` handle rendered uppercase by a mis-borrowed utility class (root cause of ledger S-5)
- `demo/@/components/custom/dock/menus/ProfileSection.vue:99`: the
  `@mbabb` `DropdownMenuTrigger` button carries `class="text-mono-caption
  ..."`. `text-mono-caption` is glass-ui's canonical **eyebrow** vocabulary
  (`../glass-ui/src/styles/typography/utilities.css:42-47`): `font-family:
  var(--font-mono); font-size: var(--type-caption); text-transform:
  uppercase;` — uppercase is baked into the utility BY DESIGN for eyebrows/
  captions, documented at utilities.css:29-40 as "mono · caption-size ·
  uppercase · tracking-CAPS."
- The literal DOM text is already lowercase (`@mbabb`, line 100) — the
  visible `@MBABB` in the S-5 screenshot is a pure CSS `text-transform` side
  effect of applying an eyebrow utility to a case-sensitive handle string,
  not a source-text bug. Confirmed by contrast: the same handle rendered
  inside the dropdown's expanded content
  (`ProfileSection.vue:109`, `MobileMenuDropdown.vue:78`) uses
  `text-mono-small` (no `text-transform`) and correctly shows lowercase
  `@mbabb` today.
- **Verdict: FAIL-EXPLICIT (misapplied class, not a workaround to special-case).**
  Swap the trigger's `text-mono-caption` for a sizing-only mono utility
  (`text-mono-small` + the caption font-size/tracking pulled in explicitly,
  or an explicit `normal-case` override) so the handle keeps its authored
  case. Do not special-case an override class onto the eyebrow utility
  itself — that utility's uppercase is used correctly by 17+ other sites
  per the glass-ui doc comment; this one caller chose the wrong utility.
- **ROOT-ROUTE: value.js demo** (glass-ui's `text-mono-caption` is correct
  as documented; the defect is the demo's choice of utility at this one
  call site).

---

## P2

### F7 — `copyToClipboard` needlessly dynamic-imported in 3 files vs. statically imported in 12+ others
- `demo/@/components/custom/gradient/GradientVisualizer.vue:156`,
  `demo/@/components/custom/panes/MixPane.vue:49`,
  `demo/@/components/custom/generate/GenerateControls.vue:71` — all three do
  `const { copyToClipboard } = await import("@mkbabb/glass-ui");` inline
  inside a click handler.
- `@mkbabb/glass-ui` is already a hard, eagerly-loaded dependency of the app
  — it's statically imported at module scope in 12+ other files (e.g.
  `ColorPicker.vue`, `PaletteCard.vue`, `PaletteDialog.vue`,
  `SlugEditLayer.vue`, `usePaletteActions.ts`, …). The dynamic `import()`
  buys no code-splitting benefit (the chunk is already resident) and is
  needless async indirection — runtime dynamism standing in for what should
  be a plain static import, purely inconsistent with the rest of the tree.
- **Verdict: EXCISE.** Hoist `import { copyToClipboard } from
  "@mkbabb/glass-ui";` to the top of all three files; delete the inline
  `await import(...)`.
- **ROOT-ROUTE: value.js demo.**

### F8 — string-indexed `as any` lookups where a `keyof ColorSpace` narrowing would type-check
- `demo/@/components/custom/color-picker/composables/useSliderGradients.ts:81-82`:
  `(COLOR_SPACE_DENORM_UNITS as any)[currentColorSpace.value][key]` and
  `(COLOR_SPACE_RANGES as any)[currentColorSpace.value][key]`.
- `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:159`:
  `(colorSpaceInfo as any)[space]`.
- `demo/@/components/custom/color-picker/display/ColorNutritionLabel.vue:99,144`
  and `display/ColorComponentDisplay.vue:30`: similar `as any` casts around
  dynamic-key record access / DOM event target reads.
- CLAUDE.md's discipline ("minimize `as any`/`as unknown as` — prefer typed
  narrowing") is stated as a `src/` invariant (0 `as any` there); it isn't
  formally extended to `demo/`, but these are exactly the shape the
  discipline exists to prevent — a typed `ColorSpace`-keyed lookup helper (or
  a `Record<ColorSpace, ...>` indexed type) would remove all of them without
  behavior change.
- **Verdict: BEFITTING-KEEP as filed today** (no functional defect, and out
  of the formally-scoped `src/` invariant) but flagged as a concrete,
  low-risk wave candidate — a single typed accessor helper in
  `useSliderGradients.ts` would retire 2 of the 6 sites in one edit.
- **ROOT-ROUTE: value.js demo.**

### F9 — tracked TODO awaiting an upstream glass-ui primitive
- `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:16`:
  `<!-- TODO: collapse to <Button size='icon-sm'> when glass-ui ships the rung (Q.md ask #7) -->`
- This is a properly-tracked, upstream-gated TODO (cites the specific
  glass-ui ask), not drift or an orphaned marker.
- **Verdict: BEFITTING-KEEP** — legitimate cross-repo dependency note: revisit
  once glass-ui's Q.md ask #7 lands (glass-ui is tranche BG/BH, executing
  toward 5.0.0, per the session brief).
- **ROOT-ROUTE: glass-ui producer** (the rung itself) — no demo-side action
  until it ships.

### F10 — hardcoded `'#888'` gray fallback for a palette with zero colors
- `demo/@/components/custom/palette-browser/PaletteCard.vue:242`:
  `const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? '#888');`
- `Palette.colors` is typed `PaletteColor[]` with no non-empty invariant
  (`demo/@/lib/palette/types.ts:24,48`), so an empty array is a real,
  reachable state (e.g. a freshly-created palette before any swatch is
  added), and a placeholder swatch color is a defensible empty-state choice
  — this isn't masking an upstream contract break so much as substituting a
  magic literal for an explicit empty-state branch.
- **Verdict: BEFITTING-KEEP the fallback semantics**, but the magic hex
  literal should become a named constant (or an explicit `v-if
  palette.colors.length === 0` empty-swatch treatment) rather than an inline
  `'#888'` buried in a `??` chain — minor hygiene, not urgent.
- **ROOT-ROUTE: value.js demo.**

---

## Reviewed and cleared (no finding)

- `demo/@/components/custom/image-palette-extractor/ExtractWorkbench.vue:240-256`
  (`startCamera` catch) — `getUserMedia` legitimately rejects (permission
  denied/no device); the catch surfaces `session.quantizeError` explicitly to
  the UI and resets `cameraActive`. **BEFITTING-KEEP.**
- `useColorUrl.ts:45-48`, `useColorParsing.ts:33-36,128-135` — all parse
  failures are either explicitly logged + safely defaulted to a real named
  brand color (`lavendi`, defined at `src/units/color/constants.ts:608` — not
  a typo) or surfaced via `parseError`/`flashParseError` to the input field.
  No silent state corruption. **BEFITTING-KEEP.**
- `ColorInput.vue:234-238`, `PaletteSlugBar.vue:216-` area,
  `SlugEditLayer.vue:57-65` — all three catch blocks route the error into a
  user-visible field (`slugError.value = ...`, propose-name `console.warn`
  paired with `proposing.value` reset) rather than swallowing it; the
  `SlugEditLayer` catch even discriminates HTTP status codes into distinct
  user messages (409/404/429). **BEFITTING-KEEP.**
- `HeroBlob.vue` — thin, current wrapper over glass-ui's `GooBlob`; the
  file's own comment (lines 39-43) confirms the prior bespoke FSM/idle-timer/
  rapid-change heuristic was already excised (N.W5.A). The ledger's S-4
  breakage (spazzing/too-small/clipped/no-satellites) is very likely a
  glass-ui producer defect or a demo-side CSS/sizing issue at the
  `ColorPicker.vue` `CardHeader` overflow boundary, not a legacy-code residue
  in this file — **out of this lane's scope; route to a visual/CSS or
  glass-ui-producer audit lane, not further chased here.**
- `BlobPane.vue` — fully re-authored at N.W5.A against the current 8-atom
  `BlobConfig`; the file's own header comment documents exactly what died
  (`orbitSpeedScale`/`wobbleScale`/`mergeRate`) and why. The
  `(cfg as unknown) as Record<string, unknown>` / `(BLOB_CONFIG_DEFAULTS as
  unknown) as Record<string, unknown>` casts (lines 116, 118) are a generic
  `ConfigSliderPane` interface tax, not legacy drift. **BEFITTING-KEEP.**
- No dead `v-if="true|false"`/`v-show="false"` branches, no commented-out
  code blocks, and no `Legacy`/`deprecated`/`compat`-named props or symbols
  found anywhere in the 142-file sweep.

---

## Candidate wave items (ranked)

1. **F1+F2** — collapse `BrowsePane.vue`'s hand-rolled fork/filter actions
   onto the (renamed, host-agnostic) `useDialogBrowseActions` composable;
   port the fork-count increment into the shared function; wire
   `card.showFeedback(..., "error")` into the shared catch. (P0, DRY +
   correctness.)
2. **F3+F4** — `ColorSpaceSelector.vue`: self-supply `font-display` on the
   trigger (kills the About-page wrong-face bug at its root, S-1); delete the
   `.space-capsule`/`veil-surface` background treatment (S-1) and the
   `space-eyebrow` counter (S-14) — three ledger items closed in one file.
   (P1.)
3. **F5** — `Dock.vue` collapsed slot: drop the `hidden sm:inline` label
   span; keep dot + icon unconditionally. (P1, closes S-8.)
4. **F6** — `ProfileSection.vue`: swap the `@mbabb` trigger's
   `text-mono-caption` for a non-uppercasing mono utility. (P1, closes S-5.)
5. **F7** — hoist the 3 dynamic `copyToClipboard` imports to static. (P2,
   trivial, zero risk.)
6. **F8** — typed `ColorSpace`-keyed accessor helper to retire the `as any`
   lookups in `useSliderGradients.ts` (2 sites) as a quick win; leave the
   remaining 4 sites for a broader typed-narrowing pass if one is opened.
   (P2.)
7. **F10** — name the `'#888'` empty-palette fallback constant. (P2, cosmetic.)

No god-module violations, no nested-import violations, and no
dead/commented-code residue were found in this tree — the 142-file sweep
otherwise reads clean against the precepts.
