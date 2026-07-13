# T.W1 — THE MOVE-MAP (old path → new path · ONE table · all three trees)

**Wave**: T.W1 (the colocation grand restructure — the E-1 grand edict). **Deliverable**:
the Q1 mitigation / §The MOVE-MAP binding artefact. Every downstream wave re-derives its
`file:line` anchors against THIS table at wave-open (PP-11).

**Substrate / wave head**: `tranche-t` @ `879ea36` (the demo-dogfood keystone + Q15's 8
primitive promotions already landed on the wave head; the demo speaks only the 8 public
subpath keys, so every src move collapses to a one-barrel edit).

**Consolidation note (§Recovery "MOVE-MAP commits FIRST")**: the three single-writer lanes
(demo ∥ api ∥ src, writer-disjoint by construction) each maintained a per-lane move-map
committed WITH each batch (`w1-move-map-{demo,api,src}.md`). At integration those three are
FOLDED into this single authoritative table (they are superseded and removed from the tree).
The per-batch O-23 verdicts + gate captures survive in the merged commit bodies; the PR-7
keyframe census is its own file (`w1-pr7-keyframes-census.md`); the O-23 wave-close diff is
`w1-o23-diff.md`.

**Frames that bind every row below**:
- **src**: the 3.x public surface is a NAME SET — the 8 `exports` keys + the symbol sets of
  `src/index.ts` and the 7 `src/subpaths/*.ts` barrels. Every src row is **name-preserving at
  the barrels** (semver-free); the fresh-build dts symbol diff is ADDITIVE-ONLY (the §5.3
  FORBIDS ledger). `src/subpaths/` filenames + `src/index.ts` are build-frozen.
- **api**: **MOVE + REGROUP, never a rewrite** — the L boundary laws hold verbatim (typed
  `ApiError`; routes→services; repositories-via-the-DI-seam; H1 cascade-correctness). The ONE
  behavior change is TA-4's enumerated excision.
- **demo**: `→` = old path → new path; **DROP** = deleted; **KEEP** = verified already-correct,
  no move. Barrels are NAMED re-exports only, never `export *` (PI-6). `styles/` +
  `components/ui/` are EXEMPT (untouched).

Notation across all trees: `→` old → new; `—` = a NEW file (no old path); **DROP** = deleted.

---

# TREE A — src/  (W1-src lane · name-preserving at every barrel)

## A1 — the `test/` mirror (§5; the test tree mirrors the src shape)

Tests run under vitest (esbuild + the `@src` alias) and are in NEITHER tsconfig, so this
batch cannot touch the frozen dts surface. `vitest.config.ts` `include: ["test/*.ts"]` →
`["test/**/*.ts"]`. Files kept at `test/` root (pure leaves + meta/cross-cutting shadows):
`math` · `easing` · `easing-export-stability` · `utils` · `color-picker-lifecycle` ·
`dts-published-surface` · `docs-source-snippets` · `parser-snapshot` · `refactor-fixes` ·
`recursion-guard` · `tranche-f` · `tranche-q-1.2.0` · **`round-trip`** (kept-at-root §Recovery
cure — it is the corpus `proof:round-trip-idempotent` consumes by exact path; moving it
reddened the `test:dist` HARD gate) · `aurora-motion` · `gradient-parse` · `view-accents`.

| Old path | New path |
|---|---|
| `test/gamut-mapping.test.ts` | `test/units/color/gamut/gamut-mapping.test.ts` |
| `test/gamut-raytrace.test.ts` | `test/units/color/gamut/gamut-raytrace.test.ts` |
| `test/gamut-boundary.test.ts` | `test/units/color/gamut/gamut-boundary.test.ts` |
| `test/okhsl.test.ts` | `test/units/color/gamut/okhsl.test.ts` |
| `test/oklch-slice-boundary.test.ts` | `test/units/color/gamut/oklch-slice-boundary.test.ts` |
| `test/color-conversions.test.ts` | `test/units/color/conversions/color-conversions.test.ts` |
| `test/color-jzazbz.test.ts` | `test/units/color/conversions/color-jzazbz.test.ts` |
| `test/srgb-transfer-darkband.test.ts` | `test/units/color/conversions/srgb-transfer-darkband.test.ts` |
| `test/color-classes.test.ts` | `test/units/color/color-classes.test.ts` |
| `test/color-contrast.test.ts` | `test/units/color/color-contrast.test.ts` |
| `test/color-difference.test.ts` | `test/units/color/color-difference.test.ts` |
| `test/color-emit.test.ts` | `test/units/color/color-emit.test.ts` |
| `test/color-filter.test.ts` | `test/units/color/color-filter.test.ts` |
| `test/colorFilter-spsa.test.ts` | `test/units/color/colorFilter-spsa.test.ts` |
| `test/color-function.test.ts` | `test/units/color/color-function.test.ts` |
| `test/color-hdr-spaces.test.ts` | `test/units/color/color-hdr-spaces.test.ts` |
| `test/color-hue-interpolation.test.ts` | `test/units/color/color-hue-interpolation.test.ts` |
| `test/color-into.test.ts` | `test/units/color/color-into.test.ts` |
| `test/color-mix.test.ts` | `test/units/color/color-mix.test.ts` |
| `test/color-none.test.ts` | `test/units/color/color-none.test.ts` |
| `test/color-normalize.test.ts` | `test/units/color/color-normalize.test.ts` |
| `test/color-ramp.test.ts` | `test/units/color/color-ramp.test.ts` |
| `test/color-relative.test.ts` | `test/units/color/color-relative.test.ts` |
| `test/color-roundtrip.test.ts` | `test/units/color/color-roundtrip.test.ts` |
| `test/color-sentinels.test.ts` | `test/units/color/color-sentinels.test.ts` |
| `test/color-validation.test.ts` | `test/units/color/color-validation.test.ts` |
| `test/matrix.test.ts` | `test/units/color/matrix.test.ts` |
| `test/unit-normalize.test.ts` | `test/units/unit-normalize.test.ts` |
| `test/unit-utils.test.ts` | `test/units/unit-utils.test.ts` |
| `test/units-interpolate.test.ts` | `test/units/units-interpolate.test.ts` |
| `test/value-unit.test.ts` | `test/units/value-unit.test.ts` |
| `test/computed-endpoint-cache.test.ts` | `test/units/computed-endpoint-cache.test.ts` |
| `test/parsing-easing.test.ts` | `test/parsing/timeline/parsing-easing.test.ts` |
| `test/scroll-timeline.test.ts` | `test/parsing/timeline/scroll-timeline.test.ts` |
| `test/parsing-stylesheet.test.ts` | `test/parsing/stylesheet/parsing-stylesheet.test.ts` |
| `test/parsing-extract.test.ts` | `test/parsing/stylesheet/parsing-extract.test.ts` |
| `test/parsing-extract-functions.test.ts` | `test/parsing/stylesheet/parsing-extract-functions.test.ts` |
| `test/parsing-serialize.test.ts` | `test/parsing/stylesheet/parsing-serialize.test.ts` |
| `test/grammar-2026-atrules.test.ts` | `test/parsing/stylesheet/grammar-2026-atrules.test.ts` |
| `test/parsing.test.ts` | `test/parsing/parsing.test.ts` |
| `test/parsing-sub-value.test.ts` | `test/parsing/parsing-sub-value.test.ts` |
| `test/parsing-balanced-scan.test.ts` | `test/parsing/parsing-balanced-scan.test.ts` |
| `test/parsing-memo-bounds.test.ts` | `test/parsing/parsing-memo-bounds.test.ts` |
| `test/parsing-sibling-index.test.ts` | `test/parsing/parsing-sibling-index.test.ts` |
| `test/parsing-animation-shorthand.test.ts` | `test/parsing/parsing-animation-shorthand.test.ts` |
| `test/grammar-2026-values.test.ts` | `test/parsing/grammar-2026-values.test.ts` |
| `test/math-functions.test.ts` | `test/parsing/math-functions.test.ts` |
| `test/diagnostics-sink.test.ts` | `test/parsing/diagnostics-sink.test.ts` |
| `test/decompose-targeted.test.ts` | `test/transform/decompose-targeted.test.ts` |
| `test/path-geometry.test.ts` | `test/transform/path-geometry.test.ts` |
| `test/quantize.test.ts` | `test/quantize/quantize.test.ts` |
| `test/quantize-chroma-weight.test.ts` | `test/quantize/quantize-chroma-weight.test.ts` |

## A2 — `parsing/{color,timeline,stylesheet}/` (§3; barrel-touching, dts 0/0)

The parse clusters become subdirs with a NEW `index.ts` barrel (named re-exports only). The
flat parse core stays: `index` · `units` · `math` · `utils` · `animation-shorthand` · `syntax`.
The `parsing/color` + `parsing/stylesheet` + `parsing/timeline` HEADS resolve to their new
barrels UNCHANGED.

| Old path | New path |
|---|---|
| `src/parsing/color.ts` | `src/parsing/color/color.ts` |
| `src/parsing/color-unit.ts` | `src/parsing/color/color-unit.ts` |
| `src/parsing/relative-color.ts` | `src/parsing/color/relative-color.ts` |
| — | `src/parsing/color/index.ts` (NEW barrel) |
| `src/parsing/easing.ts` | `src/parsing/timeline/easing.ts` |
| `src/parsing/scroll-timeline.ts` | `src/parsing/timeline/scroll-timeline.ts` |
| — | `src/parsing/timeline/index.ts` (NEW barrel) |
| `src/parsing/stylesheet.ts` | `src/parsing/stylesheet/stylesheet.ts` |
| `src/parsing/stylesheet-types.ts` | `src/parsing/stylesheet/stylesheet-types.ts` |
| `src/parsing/extract.ts` | `src/parsing/stylesheet/extract.ts` |
| `src/parsing/serialize.ts` | `src/parsing/stylesheet/serialize.ts` |
| — | `src/parsing/stylesheet/index.ts` (NEW barrel) |

## A3 — `units/color/gamut/` (§4a; barrel-touching, dts 0/0)

The Ottosson gamut family (one concern across four files) → a colocated subdir. The new
barrel re-exports the `gamut.ts` head ONLY — deliberately NOT eager-aggregating `boundary.ts`
(its top-level `TARGETS` matrix math cycles through `conversions/xyz-extended → dispatch`;
aggregating it reorders that cycle and undefines the matrices).

| Old path | New path |
|---|---|
| `src/units/color/gamut.ts` | `src/units/color/gamut/gamut.ts` |
| `src/units/color/gamut-raytrace.ts` | `src/units/color/gamut/raytrace.ts` |
| `src/units/color/boundary.ts` | `src/units/color/gamut/boundary.ts` |
| `src/units/color/okhsl.ts` | `src/units/color/gamut/okhsl.ts` |
| — | `src/units/color/gamut/index.ts` (NEW barrel — re-exports the gamut.ts head) |

## A4 — the `color/constants.ts` split (§4b; barrel-touching, dts 0/0)

The 3-concern god-table splits by concern. Ranges/bounds + the illuminant white-points (broadly-
shared colorimetric reference data) STAY on `constants.ts`; only the OKLab/LMS transform matrices
(conversion machinery) move; `GAMUT_SECTOR_COEFFICIENTS` moves to its sole consumer.

| Symbol group | From | To |
|---|---|---|
| ranges/bounds + white points (`WHITE_POINT_*`, `WHITE_POINTS`, `WhitePoint`) | `color/constants.ts` | **STAYS** (`color/constants.ts`) |
| OKLab/LMS transform matrices (`XYZ_TO_LMS_MATRIX`, `LMS_TO_XYZ_MATRIX`, `LMS_TO_OKLAB_MATRIX`, `OKLAB_TO_LMS_MATRIX`, `LMS_TO_LINEAR_SRGB`, `LINEAR_SRGB_TO_LMS`, `OKLAB_TO_LMS_COEFF`) | `color/constants.ts` | `color/conversions/matrices.ts` (NEW) |
| `GAMUT_SECTOR_COEFFICIENTS` | `color/constants.ts` | `color/gamut/gamut.ts` (its sole consumer) |

## A5 — the hue-swept boundary sampler (T-21; NEW code, additive dts +3/0)

Not a move — the T-21 src item. `gamut/boundary.ts` gains, beside `sampleOKLChSliceBoundary`,
the hue-swept envelope sampler the gradient instrument (W6-2) consumes, with the zero-alloc
`Into` twin. NEW public exports on the `./color` subpath (semver-MINOR, additive):

| Symbol | Kind |
|---|---|
| `sampleOKLChHueSweepBoundary` | fn (allocating) |
| `sampleOKLChHueSweepBoundaryInto` | fn (zero-alloc `Into` twin) |
| `OKLChHueSweepBoundary` | interface |

Exported from `src/subpaths/color.ts`. Tests: `test/units/color/gamut/oklch-hue-sweep-boundary.test.ts`.

## A6 — L1 Normalized/Display brand DECISION (the §5.3 last item)

**No code change.** The decision (`docs/tranches/T/audit/L1-normalized-display-brand-decision.md`)
is to change NOTHING with cause: the runtime-flag design is ratified; the boolean-literal-param +
conditional-return-type form is refused as churn-for-churn against a frozen 3.x surface. dts public
surface untouched (additive-only preserved). §Hard-gate row 8 met.

---

# TREE B — api/  (W1-api lane · MOVE + REGROUP · L laws verbatim)

## B0 — TA-4 excision (own commit `a8ff779`, sequenced FIRST)

DELETED (no new home — the write-only atom-diff apparatus):

| Old path | Disposition |
|---|---|
| `api/src/routes/palettes/diff.ts` | DROP (`GET /:slug/diff` router unmounted) |
| `api/src/services/palette/diff.ts` | DROP (`computePaletteDiff` — zero consumers) |
| `api/src/lib/crud/atomdiff.ts` | DROP (`diffAtoms`/`DiffResponse`/`AtomDiffOp`; `lib/` dir dissolves) |
| `api/test/conformance/diff.test.ts` | DROP |
| `api/test/services/palette-remix.test.ts` | DROP (fork coverage re-homed onto `palette-forks.test.ts`) |

FOLDED / TRIMMED (behavior-preserving): `POST /:slug/remix` removed from `forks.ts`; `remixPalette`
folded into `forkPalette`; `remixPaletteBody` removed; `PaletteVersion.atomDiff` column dropped
(`models.ts` + `versions.ts`); the two `/remix`+`/diff` `meta-routes.ts` catalog rows removed.
**KEPT**: `computeAtomSetHash` + `computeAtomHash` (`hash.ts` → `modules/palette/hash.ts`).

## B1 — index.ts carve (E-1/F1)

| Old | New | Content |
|---|---|---|
| `src/index.ts` §24–122 | `src/app.ts` | Hono assembly: global middleware + route mounting + 404/onError |
| `src/index.ts` §124–211 | `src/main.ts` | composition root: env-validate → `getDb` → migration probe → cron → `serve()` → SIGTERM (carries the lone `as unknown as` — the `server.close()` handle, inv-L-2) |

Entry re-points: `Dockerfile` `CMD dist/index.js → dist/main.js`; `api/package.json`
`dev: src/index.ts → src/main.ts`, `start: dist/index.js → dist/main.js`.

## B2 — models.ts carve (E-1/F4 — per-domain; brands in session/)

`src/models.ts` → four `modules/<domain>/model.ts` (34 importers re-pointed; `import type` keeps
the graph acyclic).

| New model file | Symbols |
|---|---|
| `modules/palette/model.ts` | `Palette` `PaletteColor` `OklabTriple` `PaletteVersion` `Vote` `Flag` `FlagReason`/`FLAG_REASONS` `PaletteVisibility`/`PALETTE_VISIBILITIES` `PaletteTier`/`PALETTE_TIERS` |
| `modules/color/model.ts` | `ProposedName` `ProposedNameStatus`/`PROPOSED_NAME_STATUSES` `Tag` |
| `modules/session/model.ts` | `Session` `User` `UserStatus`/`USER_STATUSES` + brands `SessionToken` `UserSlug` `asSessionToken` `asUserSlug` |
| `modules/admin/model.ts` | `AdminAuditEvent` |

## B3 — platform/ (the shared server layer)

| Old | New |
|---|---|
| `src/db.ts` | `src/platform/db/db.ts` |
| `src/db/collections.ts` | `src/platform/db/collections.ts` |
| `src/cache/lru.ts` | `src/platform/cache/lru.ts` |
| `src/regex.ts` | `src/platform/text/regex.ts` |
| `src/errors/index.ts` | `src/platform/http/errors/index.ts` |
| `src/middleware/cors.ts` | `src/platform/http/cors.ts` |
| `src/middleware/rate-limit.ts` | `src/platform/http/rate-limit.ts` |
| `src/middleware/sanitize-body.ts` | `src/platform/http/sanitize-body.ts` |
| `src/middleware/ip.ts` | `src/platform/http/ip.ts` |
| `src/middleware/idempotency.ts` | `src/platform/http/idempotency.ts` |
| `src/middleware/inject-services.ts` | `src/platform/http/inject-services.ts` (the DI seam — one repository class per module, F3) |
| `src/migrations/check.ts` | `src/platform/migrations/check.ts` |
| `src/migrations/migrate-soft-delete.ts` | `src/platform/migrations/migrate-soft-delete.ts` |

`src/cron.ts` + `src/types.ts` STAY at the src root (composition/context vocabulary, F9).

## B4 — modules/palette/

| Old | New |
|---|---|
| `src/routes/palettes/index.ts` | `src/modules/palette/routes/index.ts` |
| `src/routes/palettes/{crud,versions,forks,publish,votes,flags}.ts` | `src/modules/palette/routes/{…}.ts` |
| `src/services/palette/{crud,crud-list,forks,versions,votes,flags,oklab,ownership,visibility}.ts` | `src/modules/palette/service/{…}.ts` |
| `src/repositories/{palette,paletteVersion,vote,flag}.ts` | `src/modules/palette/repository/{…}.ts` |
| `src/validation/palette.ts` | `src/modules/palette/schema.ts` |
| `src/format/palette.ts` | `src/modules/palette/format.ts` |
| `src/hash.ts` | `src/modules/palette/hash.ts` |
| `src/middleware/etag.ts` | `src/modules/palette/etag.ts` |
| `src/middleware/require-ownership.ts` | `src/modules/palette/require-ownership.ts` |

## B5 — modules/color/

| Old | New |
|---|---|
| `src/routes/colors.ts` | `src/modules/color/routes.ts` |
| `src/services/color/{queries,proposals}.ts` | `src/modules/color/service/{…}.ts` |
| `src/repositories/{proposedName,tag}.ts` | `src/modules/color/repository/{…}.ts` |
| `src/validation/color.ts` | `src/modules/color/schema.ts` |

## B6 — modules/session/

| Old | New |
|---|---|
| `src/routes/sessions.ts` | `src/modules/session/routes.ts` |
| `src/services/session/auth.ts` | `src/modules/session/service/auth.ts` |
| `src/repositories/{session,user}.ts` | `src/modules/session/repository/{…}.ts` |
| `src/validation/session.ts` | `src/modules/session/schema.ts` |
| `src/slugWords.ts` | `src/modules/session/slugWords.ts` |
| `src/middleware/resolve-session.ts` | `src/modules/session/resolve-session.ts` |

## B7 — modules/admin/

| Old | New |
|---|---|
| `src/routes/admin/{index,audit,batch,colors,flagged,impersonate,palettes,tags,users}.ts` | `src/modules/admin/routes/{…}.ts` |
| `src/services/admin/{audit,batch,colors,flagged,impersonate,import,palettes,tags,users}.ts` | `src/modules/admin/service/{…}.ts` |
| `src/repositories/adminAudit.ts` | `src/modules/admin/repository/adminAudit.ts` |
| `src/validation/admin.ts` | `src/modules/admin/schema.ts` |
| `src/events/auditLog.ts` | `src/modules/admin/audit-log.ts` (`emitAuditEvent`) |
| `src/middleware/admin-auth.ts` | `src/modules/admin/admin-auth.ts` |

## B8 — modules/meta/

| Old | New |
|---|---|
| `src/routes/meta.ts` | `src/modules/meta/routes.ts` |
| `src/routes/meta-routes.ts` | `src/modules/meta/route-table.ts` (the `ROUTES` table) |

## B9 — test colocation (Q17 — `modules/<domain>/__tests__/` + the NAMED `test/conformance/` exception)

Cross-module contract suites (`conformance/{crud,idempotency}`, `db-indexes`, `envelope`, the H1
`withTransaction-rollback*` + `txn-right-sizing`, the sessions+colors route suite) STAY under
`api/test/conformance/`; `test/{helpers,setup}.ts` stay as the shared harness. Per-domain suites
move to `modules/<domain>/__tests__/`.

## B10 — scripts/ regroup (E-1/F7 — `deploy/` · `dev/` · `ci/` · `gates/`)

| Old | New |
|---|---|
| `scripts/deploy.sh` | `scripts/deploy/deploy.sh` |
| `scripts/deploy-hook.sh` | `scripts/deploy/deploy-hook.sh` |
| `scripts/dev.sh` | `scripts/dev/dev.sh` |
| `scripts/boot-smoke.mjs` | `scripts/ci/boot-smoke.mjs` |
| `scripts/abrogation-sweep.mjs` | `scripts/ci/abrogation-sweep.mjs` |
| `scripts/css-emission-probe.mjs` | `scripts/ci/css-emission-probe.mjs` |
| `scripts/proof-css-parity.mjs` | `scripts/gates/proof-css-parity.mjs` |
| `scripts/proof-round-trip-idempotent.mjs` | `scripts/gates/proof-round-trip-idempotent.mjs` |
| `scripts/proof-perf-target.mjs` | `scripts/gates/proof-perf-target.mjs` |
| `scripts/proof-serialize-fidelity.mjs` | `scripts/gates/proof-serialize-fidelity.mjs` |
| `scripts/proof-subpath-budget.mjs` | `scripts/gates/proof-subpath-budget.mjs` |

Re-points: ROOT `package.json` scripts (`dev` → `scripts/dev/dev.sh up`; the three ci probes →
`scripts/ci/*`; the five `proof:*` → `scripts/gates/*`); each moved `.mjs` bumped its
`import.meta.url` root `..` → `../..`; `dev.sh` `down` pkill re-targets `tsx watch src/main.ts`;
`deploy-hook.sh` header carries the on-host webhook path-change note (for W0-X1). **`npm run
test:dist` stays green** (the W0-2 deliverable survives W1).

## B11 — invariants held (re-verified post-move)

L boundary: typed `ApiError` (0 ad-hoc `c.json({error})`); routes→services (0 `services.repositories`
in `routes/`); DI seam sole raw-`db` reach; `as any`=0; `as unknown as`=1 (`main.ts`). H1
cascade-correctness: `services.withTransaction(` sites re-walked in
`docs/tranches/H/audit/api-withTransaction-coverage.md`. inv-L-7 god-module cap held. Q8 depth:
`PaletteVersion.atomDiff` GONE from the schema. NO re-export shims at old paths (grep-zero).

---

# TREE C — demo/  (W1-demo lane · 9 named batches + cohesion cargo)

**Batch 1 — DROP/dissolve (DISCHARGED-BY-W0-3)**: `palette-browser/BulkActionToolbar.vue`,
`palette-browser/SortFilterMenu.vue`, `components/custom/dark-mode-toggle/` were already removed at
W0-3 (`9599319`); grep-zero. No code change; recorded for completeness.

## C2 — gradient (contained feature)

| old path | new path |
|---|---|
| `gradient/GradientVisualizer.vue` | `gradient/GradientVisualizer/GradientVisualizer.vue` |
| `gradient/GradientCodeEditor.vue` | `gradient/GradientVisualizer/GradientCodeEditor.vue` |
| `gradient/GradientEasingEditor.vue` | `gradient/GradientVisualizer/GradientEasingEditor.vue` |
| `gradient/GradientStopEditor.vue` | `gradient/GradientVisualizer/GradientStopEditor.vue` |
| `gradient/PerceivedSpacePlate.vue` | `gradient/GradientVisualizer/PerceivedSpacePlate/PerceivedSpacePlate.vue` |
| `gradient/perceivedSpacePaint.ts` | `gradient/GradientVisualizer/PerceivedSpacePlate/perceivedSpacePaint.ts` |
| `gradient/composables/{gradientParse,useGradientCSS,useGradientInterpolation,useGradientModel,usePerceivedRamp}.ts` | KEEP (feature-shared) |

External edge: `panes/GradientPane.vue` → `…/gradient/GradientVisualizer/GradientVisualizer.vue`.

## C3 — mix (contained feature)

| old path | new path |
|---|---|
| `mix/MixAnimationCanvas.vue` | `mix/MixAnimationCanvas/MixAnimationCanvas.vue` |
| `mix/composables/useMixingAnimation.ts` | `mix/MixAnimationCanvas/composables/useMixingAnimation.ts` |
| `mix/composables/mixStage.ts` | `mix/MixAnimationCanvas/composables/mixStage.ts` |
| `mix/composables/useMixingState.ts` | KEEP (feature-shared) |
| `mix/{MixConfigBar,MixResultDisplay,MixSourceSelector}.vue` | KEEP root |

External edge: `panes/MixPane.vue` → `…/mix/MixAnimationCanvas/MixAnimationCanvas.vue`.

## C4 — image-palette-extractor (contained feature; CL-3 lib colocation)

| old path | new path |
|---|---|
| `image-palette-extractor/composables/useInertiaGesture.ts` | `image-palette-extractor/ImageEyedropper/composables/useInertiaGesture.ts` |
| `lib/quantize-worker.ts` | `image-palette-extractor/quantize-worker.ts` |
| `image-palette-extractor/composables/{useExtractSession,useImageQuantize}.ts` | KEEP (extractor-shared) |
| `image-palette-extractor/ImageEyedropper/` | KEEP (the E-1 exemplar) |

Edges: `ImageEyedropper.vue` → `./composables/useInertiaGesture`; `useImageQuantize.ts`
`@lib/quantize-worker` → `../quantize-worker` (+ `?worker`).

## C5 — palette-browser HARDENED BARRELS (insulate the external deep edges FIRST)

The 6 per-cluster barrels are minted as the feature's public surface (NAMED re-exports only). Files
are NOT moved in this batch; external consumers route through the barrels so C6's moves are internal.

| new barrel | named exports |
|---|---|
| `palette-browser/card/index.ts` | PaletteCard · PaletteCardGrid · PaletteCardSkeleton · PaletteColorStrip · CurrentPaletteEditor |
| `palette-browser/admin/index.ts` | AdminUsersPanel · AdminNamesPanel · AdminAuditPanel · AdminFlaggedPanel · AdminTagsPanel |
| `palette-browser/search/index.ts` | SearchFilterBar · UserSortMenu · TagEditPopover |
| `palette-browser/dialog/index.ts` | FlagReportDialog · VersionHistoryDrawer · MigratePalettesDialog · useDialogBrowseActions |
| `palette-browser/slug/index.ts` | PaletteSlugBar |
| `palette-browser/status/index.ts` | ApiOfflineChip · DevMisconfigBanner |
| `palette-browser/index.ts` | **DROP** — vestigial top barrel (dead surface, E-3) |

**PI-6 exception — App.vue's two imports stay DIRECT** (NOT barrel-routed): App.vue is the eager
`index.js` chunk; a barrel route grew it +1.04% (side-effecting SFC `<style>` pulled the lazy
siblings eager). App reverts to direct `.vue` imports (repointed to the C6 `dialog/`+`status/` files).
**F5 correction**: the census "lift `useAdminUsers`/`useAdminAudit`/`useAdminFlagged`/`useAdminTags`/
`useSlugMigration` INTO palette-browser" is REFUTED — all are consumed by the global
`usePaletteManager` facade; moving them down inverts the graph. They STAY in `@composables/`; only
their `import type` template-ref specifiers repoint (through the admin/slug barrels).

## C6 — palette-browser DECOMPOSITION (the flat 31-`.vue` namespace → 6 sub-feature folders)

External consumers UNCHANGED (routed through the C5 barrels); only the barrels' internal re-export
paths + moved files' intra-tree relatives update.

| old path (flat `palette-browser/`) | new path |
|---|---|
| `PaletteCard.vue` (+ children `PaletteCardMenu`, `PaletteCardSwatches`, `PaletteRenameInput`, `ActionFeedback`) | `card/PaletteCard/*` |
| `PaletteColorStrip.vue`·`PaletteCardGrid.vue`·`PaletteCardSkeleton.vue`·`CurrentPaletteEditor.vue`·`SwatchHoverMenu.vue` | `card/*` |
| `composables/{useHeightTransition,useHoverPopover,useLeaveTimer,useSwatchActions}.ts` | `card/composables/*` |
| `Admin{Users,Names,Audit,Flagged,Tags}Panel.vue`·`AdminListItem`·`AdminListSkeleton`·`PaginationBar` | `admin/*` |
| `SearchFilterBar.vue` (+ child `MiniColorPicker`)·`UserSortMenu`·`TagEditPopover` | `search/*` |
| `FlagReportDialog`·`MigratePalettesDialog`·`VersionHistoryDrawer` | `dialog/*` |
| `PaletteDialog/composables/useDialogBrowseActions.ts` | `dialog/composables/useDialogBrowseActions.ts` (empty `PaletteDialog/` removed) |
| `PaletteSlugBar.vue` | `slug/PaletteSlugBar.vue` |
| `ApiOfflineChip.vue`·`DevMisconfigBanner.vue` (scoped `@keyframes` — census #17/#18) | `status/*` (keyframes travel with the SFC) |
| `@lib/dateFormat.ts` (CL-3) | `palette-browser/dateFormat.ts` |
| `palette-browser/EmptyState.vue` (F7 lift-out; 8 consumers, generic) | `@components/common/EmptyState.vue` (NEW shared demo atom; Q16 book — parked as shared atom) |

Build-only trap fixed: `slug/PaletteSlugBar.vue` + `search/SearchFilterBar.vue` scoped-`<style>`
`@reference "../../../styles/style.css"` → `../../../../styles/…` (only `npm run build` catches it).
PP-8: App.vue trimmed 402 → 400.

## C7 — the color-domain ATOMIC codemod (F2/F3/F6; the LAST of the moves, all-or-nothing)

| old path | new path |
|---|---|
| `color-picker/composables/{useColorParsing,useColorNameResolution,useSliderGradients,useCustomColorNames,useColorUrl,normalizedColorNames}.ts` (F2) | `@composables/color/*` |
| `color-picker/keys.ts` (F3 — `COLOR_MODEL_KEY`·`CSS_COLOR_KEY`·`SAFE_ACCENT_KEY`·`EDIT_TARGET_KEY`·`ActionBarContext`) | `@composables/color/keys.ts` |
| `panes/keys.ts` (F6 — `AURORA_ATOMS_KEY`·`DEFAULT_AURORA_ATOMS`; domain-qualified) | `@composables/color/aurora-atoms.ts` |

F3 blast = ~24 sites (17 out-of-feature alias importers + 8 in-feature relative `./keys`/`../keys`
that vue-tsc caught). The picker↔color type-only pair stays acyclic (both `import type`). PP-3
consumer migration: `test/aurora-motion.test.ts` → `@composables/color/aurora-atoms`.

## C8 — app-shell home `demo/color-picker/composables/` + `boot/` (W2's single-writer surface)

| old path | new path |
|---|---|
| `@composables/useDevicePixelSnap.ts` | `demo/color-picker/composables/useDevicePixelSnap.ts` |
| `@composables/palette/usePaletteManagerWiring.ts` | `demo/color-picker/composables/usePaletteManagerWiring.ts` |
| `@composables/color/useAtmosphereBoot.ts` | `demo/color-picker/composables/boot/useAtmosphereBoot.ts` |
| `@composables/color/useAtmosphere.ts` | `demo/color-picker/composables/boot/useAtmosphere.ts` |
| `@composables/color/useViewAccents.ts` | `demo/color-picker/composables/boot/useViewAccents.ts` |
| `@lib/view-accents.ts` (CL-4/CL-5, the pure half) | `demo/color-picker/composables/boot/view-accents.ts` |

CL-4: the two-HOMES split dissolves — pure + reactive view-accents sit side-by-side in `boot/` (the
pure module kept as its own Vue-free unit-probed file). `useContrastSafeColor` STAYS in
`@composables/color/`. PP-3 test migration: `test/view-accents.test.ts` → the `boot/` paths.

## C9 — per-feature recursion (color-picker depth-N; F1) + the prng CL-3 leaf

| old path | new path |
|---|---|
| `controls/SpectrumCanvas.vue` + `SpectrumDetentLabel.vue` + `SpectrumPlateCaption.vue` | `controls/SpectrumCanvas/*` |
| `color-picker/gamutOverlayPaint.ts` | `controls/SpectrumCanvas/gamutOverlayPaint.ts` |
| `composables/{useGamutDetent,useGamutOverlay,useSpectrumCrossfade,useSpectrumPlateStyle}.ts` | `controls/SpectrumCanvas/composables/*` |
| `controls/ComponentSliders.vue` | `controls/ComponentSliders/ComponentSliders.vue` |
| `composables/useSliderTouchGates.ts` | `controls/ComponentSliders/composables/useSliderTouchGates.ts` |
| `display/ColorComponentDisplay.vue` + `readoutReservation.ts` | `display/ColorComponentDisplay/*` |
| `color-picker/spectrumLuma.ts` (2 sibling consumers ⇒ KEEP at controls/) | `controls/spectrumLuma.ts` |
| `@composables/prng.ts` (CL-3; 1←generate) | `components/custom/generate/composables/prng.ts` |

`usePointerDebug.ts` STAYS at `color-picker/composables/` (feature-wide). Keyframes `field-paint-in`/
`plate-crossfade-out` (#10/#11) travel inside `SpectrumCanvas.vue`'s `<style>` — census 18/18.

## C-cargo — cohesion cargo (distinct commits)

| cargo | disposition | files |
|---|---|---|
| dup-`useDark` fold onto `useGlobalDark` | LANDED | `composables/color/useViewAccents.ts` + `useContrastSafeColor.ts` (the last two `@vueuse/core` `useDark` holdouts fold onto the glass-ui singleton; zero vueuse `useDark` left) |
| MOB-2 route-derived pane index | LANDED | `viewSchema.ts` (+`defaultPaneIndex`), `useViewManager.ts`, `usePaletteManagerWiring.ts` (the `mobilePaneIndex` hash-nav leak dead; playwright `mobile/walk` PASS) |
| PI-DRIFT-1 + `out-in` audit | LANDED (audit; move-neutral) | the 8 live `<Transition mode="out-in">` sites re-enumerated post-move; every transition markup+`<style>` byte-intact inside its SFC — pi-w5b rider satisfied by construction |
| **MOB-1 stamped `data-layout` witness** | **DEFERRED → Fable/frontend-design** | see note ↓ |

**§MOB-1 DEFERRAL note (carried to the wave-close report)**: MOB-1 asks to stamp a
`data-layout="desktop|mobile"` witness and re-key every layout fork onto it, killing the width-only
witnesses + the `styles/style.css:435` aspect-law exception. On reading the surface a
ratified-vs-ratified conflict surfaced: `App.vue:50` documents that the `lg:*` display classes are
"RETAINED untouched — the D8-1 cascade is producer-owned; never demo-cured here." MOB-1 would replace
exactly those producer-owned width witnesses. Per the recovery-brief clause ("Design-sensitive —
route through Fable/frontend-design per E-6"), MOB-1 is the SOLE deferred W1 item, handed to a
Fable/frontend-design pass with the D8-1 conflict named. The current width+aspect mechanism (v-if
`!isDesktop` single-mount + the `:435` aspect exception) is intact and green (smoke-mobile passes);
NOTHING is left half-applied. This is the one open §Hard-gate item at wave-close (row 6, MOB-1 half).
