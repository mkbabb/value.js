# S.W5 — SUFFUSION II (Fable: browse/palettes/extract/mix/generate/gradient/admin)

**Name**: W5 — Suffusion II (the remaining panes on-register)
**Opens after**: S.W1 + S.W3 (round 3; runs parallel with S.W6).
**Spec of record**: `audit/SYNTHESIS.md §3.7` (items W5-1..W5-13 + the lane structure) · §2 recalibrations (copy register, fail-explicit, one ink for type) · Q1/Q4/Q6 outcomes from `S.md §12`.
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the S.md charter clause, restated here so the rule is self-evident in-file).
**Agents**: ≤6 total — the three-lane structure below (the R.W4 precedent applied); each lane independently gated; Fable + frontend-design; π archives per page.
**Hard gate**: composite (§Hard gate) — π paired archives per page · the three `Loader2` browse sites dead · zero hand-rolled `<input>` · gradient round-trip atomic + explicit-failure · admin populated-fixture specs green · per-item gates.
**Status**: PENDING-RATIFICATION.

---

## §Goal criterion

One loading grammar, one card species, one input species, honest empty/error states, the
superfluity table excised, the gradient page's correctness holes closed, admin on-register.
(SYNTHESIS §3.7 Goal, verbatim.)

## §Completion criterion

π paired archives per page; the three `Loader2` browse sites dead; zero hand-rolled `<input>`;
the gradient round-trip atomic + explicit-failure; admin populated-fixture specs green; per-item
gates below. (SYNTHESIS §3.7 Completion, verbatim.)

---

## §Lane structure (SYNTHESIS §3.7, transcribed verbatim)

**Lane A — browse/palettes/admin grammar unification**: W5-1, W5-2, W5-3, W5-4, W5-5, W5-12,
plus W5-13 as Lane A's own second agent (the api/product-truth half is non-visual and runs
beside the grammar work, not inside it). **Lane B — extract/mix/generate**: W5-6. **Lane C —
gradient correctness + visual + aliasing**: W5-8, W5-9, W5-10, W5-11. W5-7 (the superfluity
table) executes PER-LANE — each lane excises its own pages' rows; no lane waits on another's
excisions. Each lane closes on its own π archive + item gates; the wave closes when all three
lanes do.

## §Scope (SYNTHESIS §3.7 item table, transcribed verbatim — anchors + evidence lanes intact)

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W5-1 | **Loading-grammar suite** (S-10): skeleton base re-pointed to the `ec1b200` register (muted-ink family, one `color-mix` recipe, both schemes); `variant: shadow|specimen|developing` on `PaletteCardSkeleton`; the sequential "developing plate" choreography via the producer's `--skeleton-shimmer-delay`/`--skeleton-shimmer-tint` seams (letter L9 — the stagger is structurally dead until the `::after` reads a custom property); Browse + dialog + admin lists consume skeletons; all 3 `Loader2` sites die; a delayed-route fixture pins the state for e2e | `PaletteCardSkeleton.vue:9,20-37`; `BrowsePane.vue:24-29,57`; `PaletteBrowseTab.vue:5-11,50-57` | design-browse S-10; design-admin F-13 |
| W5-2 | **Card-grammar unify** (S-20): `PaletteCard` → glass rung (`bg-card/75` + blur, or the Card tier at W8); `.dashed-well` keeps the dashed edge (in-progress semantics) but joins the cartoon family; skeleton shell matches by construction; pane-plate grammar unified at the PaneShell root (the shell half) | `PaletteCard.vue:11`; `utils.css:56-68` | design-browse S-20; design-dock-shell P2-11 |
| W5-3 | **Input consume** (S-17): the 6 hand-rolled `<input>` sites + `PaletteRenameInput`'s `.input-bar-field` + strip `CurrentPaletteEditor.vue:118`'s override list (incl. the suppressed focus ring — an a11y regression); admin's 4 square inputs in the same sweep | sites at glassui-consume-map §4-F1; `CurrentPaletteEditor.vue:118` | glassui-consume-map; design-browse S-17; design-admin F-7 |
| W5-4 | **Menu + trigger dedup**: the triplicated icon-button recipe onto `<Button iconOnly variant="ghost">`; 2 missing `aria-label`s; ProfileSection's 3 hand-rolled buttons onto glass-ui Button; form-select grammar (`class="h-9"` → `size="sm"` ×11; 3 missing gradient `aria-label`s; bare-noun naming); dropdown glass-surface tokens = letter L11 | dropdown-select §4-5 | dropdown-select-consistency |
| W5-5 | **Empty/error register**: error ≠ empty plates in EVERY panel (admin's silently-costumed backend-down state is the P0 case); eyebrow contrast (drop the `/70` double-attenuation); "Retry" as a real Button; dialog-tab eyebrow parity; per-context eyebrows (Q6); Flagged's grey-italic defector onto EmptyState; `palette:null` says "palette deleted" | `EmptyState.vue:13`; `BrowsePane.vue:41-47`; design-admin F-2/F-11 | design-browse; design-admin |
| W5-6 | **Extract + Mix + Generate recomposition**: extract — plate copy deleted, empty-state de-shimmered, hover veil → edge affordance (the one surface whose colors must never lie), ONE proportional strip w/ the stat folded into the card header, eyedropper centered; mix — Button-primary-over-wash verified at the producer root (letter L6 rider), honest palettes-tab empty state (the eternal-skeleton silent-handling violation), `useColorGeneration` moved home, mix↔gradient shared vocabulary to a neutral home; generate — palette plate as hero, real Regenerate action, count slider carries the ramp (the extract k-slider pattern) | design-extract F1-F8, F11-F16 | design-extract-mix-generate |
| W5-7 | **Superfluity excision** (S-12, the per-page table): "1 colors" plural · triple count · twin search placeholders · delete-all demotion · rainbow recipe per Q4 · truncating select subtitles (generate/mix/gradient ×5) · gradient hint line (once gestures are self-evident) · detent `⊣` glyph · doubled config-pane labels · audit naked `12` · names-badge sum · title-during-rename | rows cited per lane | all design lanes |
| W5-8 | **The perceived-space plate** (S-6): the L×C slice at the running hue, gamut-truth hatch outside sRGB (+ the paper-ink second net for wide interpolation spaces), the coalesced ramp as an inked trajectory with stops ON the path, iso-ΔE_OK rungs on the editing rail (easing's perceptual effect becomes visible netting); dissolves the duplicated hero-preview/stop-bar pair; the hatch painter + ink probe lift to ONE home; consumes W1-6's `sampleOKLChSliceBoundary` — ZERO new demo math | `GradientVisualizer.vue:167-172`; `gamutOverlayPaint.ts` | design-gradient P1-6/P2-16 |
| W5-9 | **Easing pane v2** (S-13): demo half — per-interval live ramp strip (the gradient page's "ball": what `steps(4,end)` does to green→blue, visible in-row), first-row auto-trace on open, consume W1-6's `resolveEasing`; producer half (play-button un-blob, loop seam, curve-glyph presets, travel-dot rest, PRM) = letter L7 | `GradientVisualizer.vue:253-303`; `useEasingPicker.ts:111,239-249` | design-gradient P1-5; motion §4 |
| W5-10 | **Aliasing demo halves** (S-15): PaletteCard strip corner via mask/radius-inherit (drop the card `overflow-hidden` clip); the big washes opt back into the producer grain register as dither; more mid-stops on the largest washes; verify no pane subtree rests on a permanent compositing transform. Producer halves (mask-clip primitive, `paletteToCssGradient` dither, WatercolorDot Safari edge) = letter L10 | `PaletteCard.vue:11`; aliasing lane §A/§B | aliasing-dithering |
| W5-11 | **Gradient correctness P0s**: atomic `applyCSS` (complete-model-or-null; ≥2 valid stops; no unconsumed tokens; the dead `parseError` ref wired or excised — explicit destructive border + one-line Fira verdict); code-editor truce (never rewrite while focused; preserve authored literals); stop-editor rework (dblclick/warp truce, touch remove, end-handle geometry, z-tier); radial `circle at` silent-drop → model-or-reject; `resolution` dead affordance inlined | `useGradientModel.ts:144-154`; `useGradientCSS.ts:125-236`; `GradientCodeEditor.vue:102-117,109,139`; `GradientStopEditor.vue:32-63,96-134` | design-gradient P0-1/P1-3/-4/P2-14/-17 |
| W5-12 | **Admin on-register**: glass-ui Tabs adoption sweep (7 raw-reka sites — carries the F-1 min-width overflow cure: the moderation flow is INOPERABLE on mobile today); danger grammar (shift-click bypass EXCISED — no special-cases; per-row red quieted to ink-at-rest; Dismiss/delete weighted; disabled-delete dropped); machine strings in Fira not italic display; taxonomy seams (atmosphere/blob out of the admin menu or the asymmetric watch fixed; gold identity on the collapsed dock rides W7-1); slug middle-truncation; populated-fixture e2e (the suite's admin surface only ever sees empty envelopes today) | `AdminNamesPanel.vue:5,78`; `AdminUsersPanel.vue:81-89,237-254`; `useDockAdminMode.ts:27,51-55`; `admin-auth.ts:25-26` | design-admin F-1/F-4/F-8/F-9/F-12/F-13/F-14 |
| W5-13 | **Palette CRUD truth**: visibility per Q1 (wire publish/unpublish + a visibility affordance, or excise the dead 3-state machine); Browse pagination past 50 (wire `nextCursor` — the N.W3.D keyset machinery is entirely unused for its primary purpose); `/remix` wire-or-retire; the 10 zero-consumer wrappers wired-or-deleted; `publishPalette` naming collision resolved with Q1; envelope drift (3 missing optional fields typed); dead `offset` plumbing dropped; tag-edit ETag threading | api-crud F-1..F-9 | api-crud-audit |

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `src/` write (W5-8/W5-9 consume W1-6's exports — ZERO new demo
  math; a missing export is a W1 defect, not a W5 improvisation); any `../glass-ui` write
  (L9/L10/L11 halves are letters);
- **non-local gate failures**: the gradient atomic round-trip failing on legitimately-authored
  CSS (the model-or-reject boundary mis-drawn); the admin populated-fixture specs exposing an
  api envelope defect beyond W5-13's typed drift (api boundary call); a lane's π archive
  refuting another lane's register claim (cross-lane contradiction → resolve against the live
  tree before elevation, S lesson 1);
- **loop halt**: the third iteration of any skeleton/shimmer choreography loop halts and routes.

## §File bounds · disjointness · worktrees

| Lane | Files | Access |
|---|---|---|
| A (grammar: W5-1..W5-5, W5-12, its W5-7 rows) | `PaletteCardSkeleton.vue` · `PaletteCard.vue` · `BrowsePane.vue` · `PaletteBrowseTab.vue` · `EmptyState.vue` · `CurrentPaletteEditor.vue` · `PaletteRenameInput` · `ProfileSection.vue` (buttons only — W7-6 owns its casing later) · `Admin*.vue` · `useDockAdminMode.ts` · `utils.css` | modify |
| A2 (W5-13 CRUD truth) | `demo/@/lib/palette/api/**` wrappers · `api/` envelope types + the Q1 verb wiring · e2e fixtures | modify/create |
| B (W5-6 + its W5-7 rows) | extract/mix/generate pane trees · `useColorGeneration` home | modify |
| C (W5-8..W5-11 + its W5-7 rows) | `GradientVisualizer.vue` · `gamutOverlayPaint.ts` · `useGradientModel.ts` · `useGradientCSS.ts` · `GradientCodeEditor.vue` · `GradientStopEditor.vue` · `useEasingPicker.ts` | modify |

Lanes are page-disjoint by construction; `PaletteCard.vue` is Lane A's (W5-10's strip-corner
hunk coordinates through Lane A's queue, or C sequences after A's card commit). Do NOT touch:
`src/`, `../glass-ui`, `docs/precepts/`, the dock/shell (W7's), atmosphere/blob (W6's). Each
lane runs in its own sibling worktree cut from the wave head.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.7)

1. π paired archives per page (each lane's own baseline/close pair + DELTA), incl. the
   skeleton-mid-fetch state via the delayed-route fixture.
2. The three `Loader2` browse sites dead; skeletons consumed at Browse + dialog + admin lists;
   the loading grammar one recipe both schemes.
3. Zero hand-rolled `<input>` in `demo/` (grep gate) — incl. the suppressed-focus-ring override
   stripped (a11y regression cured).
4. Gradient: `applyCSS` atomic (complete-model-or-null), explicit destructive failure surface,
   round-trip e2e green (stop add/remove/drag + easing + radial reject — the §6.1 gradient
   interaction spec).
5. Admin: populated-fixture specs green (the moderation flow operable at 390px — the F-1 cure);
   shift-click bypass gone.
6. W5-13: the Q1 outcome landed (wire or excise, never the dead 3-state limbo); Browse
   paginates past 50; zero-consumer wrappers wired-or-deleted (grep proof).
7. The superfluity table excised per-lane (each row's before/after in the π DELTA).
8. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e 5-project green (incl. the
   new fixtures) · `cd api && npx tsc --noEmit` 0 · no `demo/` file >400 LoC.

## §No-workaround prohibitions (binding)

- **ZERO new demo math** for W5-8 — the slice boundary comes from W1-6's export, or the wave
  halts on a W1 defect.
- **No silent-handling** — the eternal-skeleton class (loading ≠ empty), and error ≠ empty, are
  binding register rules (SYNTHESIS §2.4).
- **No special-case danger affordances** — the shift-click bypass is EXCISED, not re-costumed.
- **Never define-in-demo** the skeleton shimmer seams (L9), mask-clip primitive (L10), or
  dropdown surface tokens (L11) — producer letters.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each lane batch and before each lane
close; `npx playwright test` (incl. new fixtures) per lane close and at wave close;
`cd api && npx tsc --noEmit` after any W5-13 api touch.

## §Verification artefacts (π lane)

Saved at close (cited in `PROGRESS.md`): **per-lane π paired baseline/close archives + DELTA**
(the §6.1 matrix rows owned here: skeleton mid-fetch via delayed-route fixture, light+dark ×
3 viewports per page); the grep-gate captures (Loader2, hand-rolled inputs, zero-consumer
wrappers); the gradient interaction spec output; the admin populated-fixture spec output; the
W5-13 Q1 decision record; per-lane commit hashes.

## §Commit plan

Per-lane row-scoped commits (lane A: skeleton suite / card grammar / input consume / dedup /
empty-error / admin; A2: CRUD truth with body; lane B: extract-mix-generate recomposition; lane
C: gradient P0s / perceived-space plate / easing v2 / aliasing); each lane's π + close commit;
a wave status commit when all three lanes close.

## §Dependencies

- **Depends on**: S.W1 (`sampleOKLChSliceBoundary`, `resolveEasing`) + S.W3 (budgets stand;
  loading choreography must live inside them).
- **Blocks**: S.W7's round-4 entry (round barrier — NOT a dependency edge; W7 depends only on
  W1 + W3).

## §BOOKS opened/serviced (books-never-gates)

- **K-W3DIFF** — its alt-exit (stop persisting `atomDiff`) is decided WITH Q1's outcome at
  W5-13; the decision is recorded on the book row either way.
- **L9/L10/L11 producer halves** — letter items; misses recorded as producer-gap rows,
  re-verified at W8.

## §Evidence packets consumed

`audit/lanes/design-browse-palettes.md` · `audit/lanes/design-admin.md` ·
`audit/lanes/design-extract-mix-generate.md` · `audit/lanes/design-gradient.md` ·
`audit/lanes/aliasing-dithering.md` · `audit/lanes/dropdown-select-consistency.md` §4-5 ·
`audit/lanes/glassui-consume-map.md` §4 · `audit/lanes/api-crud-audit.md` ·
`audit/lanes/e2e-coverage-gaps.md` (the delayed-route fixture + gradient spec shapes).

## §Hand-off

W7 enters at round 4 after this wave and W6 both close (round barrier). The register rules
minted here (loading grammar, error ≠ empty, one input species) bind W7's shell work; the
populated-fixture pattern becomes a standing suite member. S.W9 re-runs the repo-wide caps
sweep this wave's decompositions must survive.
