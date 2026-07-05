# S.W4 — THE INSTRUMENT, REFINED (Fable: picker + docs/About)

**Name**: W4 — The instrument, refined (picker + docs/About)
**Opens after**: S.W1 + S.W2 (round 2; runs parallel with S.W3). Round-2 single-writer law: **W4-2's `ColorPicker.vue` header re-composition lands FIRST**; W3-4 rebases atop it.
**Spec of record**: `audit/SYNTHESIS.md §3.6` (items W4-1..W4-8) · §2 design-POV continuity (the editorial instrument CARRIES; excision and consistency against the standing register) · Q4/Q5/Q6 outcomes from `S.md §12`.
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the S.md charter clause, restated here so the rule is self-evident in-file).
**Agents**: ≤6 — Fable + frontend-design lanes (title+register / header / thumbs+rail / docs pipeline / code-plate), π paired baseline/close archive, taste bar reviewed by a NON-authoring agent.
**Hard gate**: composite (§Hard gate) — π paired archive: capsule gone, both hosts identical, Lab readout one line at 1440; all 11 docs pages complete snippets (build-failing guard); inline-code chips restored; non-authoring taste review.
**Status**: PENDING-RATIFICATION.

---

## §Goal criterion

The picker card's remaining furniture excised and its hero typography inked on one line; the
docs pages become true atlas plates (complete code, real inline code, owned faces). (SYNTHESIS
§3.6 Goal, verbatim.)

## §Completion criterion

π paired archive shows — capsule gone, both hosts identical, Lab readout one line at 1440, all
11 docs pages ship complete snippets (build-failing guard), inline-code chips restored; taste
bar reviewed by a non-authoring agent. (SYNTHESIS §3.6 Completion, verbatim.)

---

## §Scope (SYNTHESIS §3.6 item table, transcribed verbatim — anchors + evidence lanes intact)

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W4-1 | **Title-as-component** (S-1 + S-14): kill the `veil-surface` capsule + eyebrow counter + per-row index; the space name becomes the plate TITLE — a bare `SelectTrigger variant="ghost"` whose class list OWNS `font-display italic` (host-independent face, the `DockViewSelect.vue:54` pattern), safeAccent ink, size riding the producer `size="audacious"` rung. **The full affordance grammar, bound** (the flagship gets treatment, not a fragment): **rest** — the small inked caret is the ONLY affordance; no background, border, radius, padding rhythm, or shadow survives the excision — the title sits directly on the field like every other piece of plate typography. **hover** — the editorial link grammar: an ink-shift (safeAccent deepening toward full strength) and/or a 1px underline in the same ink at ~3px offset, entering as ink, not as surface; the letterforms never move, and NO treatment may re-grow a surface — any hover that paints a background/veil is a regression of this exact item (design-picker P1-2's own clause, folded verbatim). **focus-visible** — the existing C5 focus register (`:169-174`) unchanged: ring, never pill. **open** — the caret rotates 180° on the house micro duration; the title HOLDS its hover ink while open; all glass belongs to the SelectContent specimen catalog (which stays — WatercolorDot rows + live conversions are good instrument work); the surface is the dropdown's, never the title's. About provides `COLOR_MODEL_KEY` so the specimen rows are identical in both hosts (the parity half of S-1); both hosts get THIS grammar verbatim — zero per-instance overrides (S-21) | `ColorSpaceSelector.vue:5,9-11,22-36,72,151-166`; `AboutPane.vue:8-16` | design-picker P1-2/-3; dropdown-select §2; design-docs-about P1-1/-2/-3 |
| W4-2 | **Header re-composition** (S-19): blob reservation scoped to the title row only; readout spans the full header; per-space line-count lock from the reservation table (not a blanket 2); optional `cqi` display rung | `ColorPicker.vue:29`; `ColorComponentDisplay.vue:93-99`; `readoutReservation.ts:26-41` | design-picker P1-1 |
| W4-3 | **Spectrum-thumb ink + hover, demo half** (S-2/S-16): soften ink alphas (0.8→~0.55 black leg; 0.9→~0.8 white); fix the gradient dead-hover (fold hover scale into the inline transform — the class utility is shadowed). Producer halves (border-w token, hover recipe scale 1.06 + tint-15 + `cursor:grab`, spectrum-without-bg loud failure) = letter L6; root consume of `/slider` = W8 | `ComponentSliders.vue:188-193`; `GradientStopEditor.vue:124,134` | design-picker P1-4/-5; design-extract F14 |
| W4-4 | **Docs source-export P0**: the extractor's first-brace scan truncates 15/18 destructured-param conversions to one invalid line, and the prettier catch silently ships the fragment — scan past the balanced param list (or real TS parse), make prettier failure THROW, add a per-page snippet golden | `plugins/vite-source-export.ts:89,131-133` | design-docs-about P0-1 |
| W4-5 | **Channel rail re-home** (S-3): `ComponentSliders`' hand-rolled rail (~35 lines of bespoke CSS + 40 lines of tablist nav) onto `<SegmentedTabs orientation="vertical">` (already shipped, already consumed elsewhere in this app); WatercolorDot active ring in the safeAccent-modified current color (the existing register, no new recipe); `α` breaks the L/A/B/A collision; the channel-color conceit retired (degenerate by construction). **First task in-wave**: verify against the live component that SegmentedTabs' native sliding-pill active indicator can yield to the WatercolorDot ring — ONE active indicator, never two competing — before any adoption CSS is authored; on failure the letter-rail book fires immediately, not as an afterthought. A producer "letter-rail" variant is BOOKED against the dock-fission DECIDE only if the vertical variant proves insufficient | `ComponentSliders.vue:9-40,152-182,219-261,310-344` | glassui-consume-map F2; design-picker P1-6 |
| W4-6 | **Docs math pipeline**: delete the classless-`<code>`→KaTeX hijack (inline code is extinct on all 11 pages today); explicit math authoring; `htmlAndMathml` output + ship KaTeX fonts; Safari verify; the stateful treewalker-regex `lastIndex` fix | `useMarkdownHighlighting.ts:38-41,74-98,94` | design-docs-about P1-6/P2-1/P3 |
| W4-7 | **Pane register**: `PaneHeader` gains `font-display` (Q5; all 9 panes inherit); the About sticky band shrinks with the de-capsuled selector participating (167px→≤ one title line) | `PaneHeader.vue:3,47-51`; `AboutPane.vue:23,29` | design-docs-about P1-4/-7; design-browse type-hierarchy |
| W4-8 | **Code-plate + dark truth**: ONE house hljs token theme (crayon primaries, Fira) consumed by gradient + markdown, GitHub css imports deleted, head-injection swap killed; both markdown composables onto `useGlobalDark` (three dark stores today, one observed wrong-theme paint); heading ink one-accent L/C ladder (no per-level hue spin); φ tokens promoted to `style.css`; Definition/Type dedupe. **The register boundary, stated**: letterforms speak ONE ink — an L/C ladder on the single accent hue, everywhere headings render; hue-variation belongs to color-DATA surfaces (dots, ramps, palette strips), never to type. Q4's EXCISE flip applies this same law to the pane title | `GradientCodeEditor.vue:11-12,32-46`; `useMarkdownColors.ts:15,43-45`; `useMarkdownHighlighting.ts:5-6,111` | design-gradient P1-8; design-docs P2-2/-3/-5/-7 |

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `src/` write (the library surfaces landed at W1); any `../glass-ui`
  write (the L6 slider halves, the audacious rung, SegmentedTabs internals are producer-owned);
- **non-local gate failures**: the W4-5 first-task verify failing (SegmentedTabs' sliding pill
  cannot yield to the WatercolorDot ring) — the letter-rail book FIRES immediately (sanctioned
  path, not a triumvirate) but a rail that can neither adopt nor book cleanly routes; the W4-4
  extractor rewrite still truncating any page (the balanced-scan premise wrong → real TS parse);
  both-hosts parity failing after `COLOR_MODEL_KEY` provision (the S-1 ambient-context model
  mis-diagnosed);
- **loop halt**: the third iteration of any hljs/KaTeX pipeline diagnostic loop halts and routes.

## §File bounds · disjointness · worktrees

| Unit | Files | Access |
|---|---|---|
| title + register (W4-1, W4-7) | `ColorSpaceSelector.vue` · `AboutPane.vue` · `PaneHeader.vue` | modify |
| header (W4-2 — FIRST) | `ColorPicker.vue` · `ColorComponentDisplay.vue` · `readoutReservation.ts` | modify |
| thumbs + rail (W4-3, W4-5) | `ComponentSliders.vue` · `GradientStopEditor.vue:124,134` | modify |
| docs pipeline (W4-4, W4-6) | `plugins/vite-source-export.ts` · `useMarkdownHighlighting.ts` · KaTeX font shipping | modify |
| code-plate (W4-8) | `GradientCodeEditor.vue` · `useMarkdownColors.ts` · `useMarkdownHighlighting.ts` (token theme + dark store) · `demo/@/styles/style.css` (φ tokens) | modify |

`useMarkdownHighlighting.ts` is shared by the docs-pipeline and code-plate units — sequence or
fold; never parallel. Do NOT touch: `src/`, `api/`, `../glass-ui`, `docs/precepts/`,
`App.vue`/pane-swap surfaces (W3's). Parallel Fable lanes in sibling worktrees cut from the
wave head.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.6)

1. π paired archive (baseline at open, close at close) shows: the veil capsule GONE; the
   About-vs-picker selector **identical in both hosts** (side-by-side π state); the Lab readout
   ONE line at 1440.
2. The W4-1 affordance grammar holds in all four states (rest/hover/focus-visible/open) — no
   surface re-growth anywhere (a hover that paints a background/veil is a regression of the
   item itself).
3. All 11 docs pages ship complete snippets — the extractor guard FAILS THE BUILD on truncation
   (prettier failure throws); per-page snippet goldens green.
4. Inline-code chips restored (the classless-`<code>` hijack dead); KaTeX `htmlAndMathml` +
   shipped fonts verified on `smoke-safari`.
5. `PaneHeader` speaks `font-display` (Q5) across all 9 panes; the About sticky band ≤ one
   title line.
6. One hljs token theme both schemes; one dark store (`useGlobalDark`); heading ink = one-accent
   L/C ladder (the register boundary holds — no per-level hue spin).
7. **Taste bar reviewed by a NON-authoring agent** against the π archive.
8. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e 5-project green · no
   `demo/` file >400 LoC.

## §No-workaround prohibitions (binding)

- **Zero per-instance overrides** (S-21) — both hosts get the W4-1 grammar verbatim.
- **NO hover treatment that re-grows a surface** on the title (design-picker P1-2's clause,
  binding as a named regression).
- **NO two competing active indicators** on the channel rail — verify-first, else the book
  fires; never adoption CSS that fights the producer pill.
- **NO demo-defined slider/rail primitives** — producer halves are letter L6 / the W8 consume.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each lane batch and before close;
`npm run gh-pages` after W4-4 (the build-failing guard must be exercised); `npx playwright test`
before close.

## §Verification artefacts (π lane)

Saved at close (cited in `PROGRESS.md`): **π paired baseline/close archives** (the §6.1 matrix
states owned by this wave: About-vs-picker selector side-by-side, slider `:hover`, light+dark ×
3 viewports) + DELTA notes; the non-authoring taste-review record; the W4-5 first-task verify
record (indicator-yield evidence or the fired book); the per-page snippet goldens; per-lane
commit hashes.

## §Commit plan

W4-2 FIRST (header re-composition — the round-2 single-writer anchor); W4-1 title-as-component
(commit with body — the flagship); W4-3; W4-5 (verify record + re-home, or the book record);
W4-4 + W4-6 (docs pipeline, row-scoped); W4-7; W4-8 (code-plate + dark truth, commit with body);
π + status commit at close.

## §Dependencies

- **Depends on**: S.W1 (published surfaces) + S.W2 (the one model; shared ColorPicker files).
- **Blocks**: round 3 (W5 ∥ W6); W3-4 rebases atop W4-2 within round 2.

## §BOOKS opened/serviced (books-never-gates)

- **S-3 letter-rail producer variant** — fires ONLY on the W4-5 verify failing (recorded
  immediately, `S.md §7` row).
- **L6 slider producer halves** — letter items; root consume of `/slider` at W8.

## §Evidence packets consumed

`audit/lanes/design-picker.md` · `audit/lanes/design-docs-about.md` ·
`audit/lanes/dropdown-select-consistency.md` §2 · `audit/lanes/glassui-consume-map.md` F2/F5 ·
`audit/lanes/design-gradient.md` P1-8 · `audit/lanes/god-module-dry-census.md` §2.5.

## §Hand-off

Round 3 opens on this wave (+W3): W5 extends the register to every remaining pane (the W4-8
register boundary — one ink for type — binds W5's title work); W7 inherits the
title-grammar precedent for the dock. The π matrix states minted here become standing rows.
