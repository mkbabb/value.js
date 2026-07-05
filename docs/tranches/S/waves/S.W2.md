# S.W2 — ARCHITECTURAL TRANSPOSITION (the spine)

**Name**: W2 — Architectural transposition (the color-state spine + DI seams + api unification)
**Opens after**: S.W0 (runs parallel with S.W1 — round 1; W2-2 and W2-7 are sequenced LAST, and W2-2 dispatches only after W1-6's `safeAccentCssString` exists in the tree).
**Spec of record**: `audit/SYNTHESIS.md §5` (items W2-1..W2-9 + the wave gate) · §3.4 · the `audit/seeds/SEEDS.md` w2 riders (folded below, binding on W2-1) · doctrine: elegance/simplicity/performance; the graph becomes data instead of watch-registration order; idiomatic Vue 3.5 provide/inject and plain `Services`-in functions — **no framework invention** (KISS; `feedback_kiss_no_contrivance`).
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the S.md charter clause, restated here so the rule is self-evident in-file).
**Agents**: ≤4 parallel (pipeline / DI+composables / api / router), W2-2 + W2-7 sequenced LAST.
**Hard gate**: composite (§Hard gate) — the SYNTHESIS §5 wave gate verbatim: URL-color e2e (URL wins) · grep gates (0 direct `apiAvailability` imports, 0 `Context` params under `services/`, 0 `savedColors` casts) · typecheck + suites green · no new file >400 LoC · the palettes-pane display check (seed rider 4).
**Status**: PENDING (RATIFIED 2026-07-05; gated on S.W0 + W1-6's first landing for W2-2).

---

## §Goal criterion

The color-state spine becomes ONE explicit derivation graph; the demo's runtime capabilities
gain the same DI seam color-state already has; the api service layer speaks one signature.
(SYNTHESIS §3.4 Goal, verbatim.)

## §Completion criterion

`useColorPipeline` owns the one model + one derivation set + declared persistence precedence +
one token sink; a shared URL-color e2e proves URL-wins; `useApiClient` provided at App root with
zero direct singleton imports; 0 api service fns take `Context`; vue-router 5 migrated;
typecheck + suites green. (SYNTHESIS §3.4 Completion, verbatim.)

---

## §Scope (SYNTHESIS §5 item table, transcribed verbatim — anchors + evidence lanes intact)

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W2-1 | **`useColorPipeline`**: ONE model (the picker's second `shallowRef` copy retired or reduced to a pure injected consumer — resolve the `defineModel` staleness at the source, per no-backwards-compat); ONE derivation set (`cssColor`/`cssColorOpaque`/`savedColorStrings`/`safeAccentCss` — deleting the byte-identical `cssColorOpaque` twin and the DIVERGED `savedColorStrings` twin); **persistence precedence declared: URL-hash-wins-on-load**, localStorage the fallback only when the hash carries no color (the P0: shared links are non-authoritative today — localStorage clobbers AND rewrites the hash); one `applyTokens` sink for the 4 root-token writes; keep the composable ≤400 LoC. **The four SEEDS.md w2 riders below are BINDING on this item** (the seed proved the transposition VIABLE_WITH_AMENDMENTS: the `defineModel` staleness IS resolvable at source; `stableHue` preserved bit-for-bit) | `useColorModel.ts:39-65,69-108,154-163`; `useAppColorModel.ts:18-37,74-91`; `App.vue:131-177`; `keys.ts` (injected key/ActionBarContext type); `usePaneRouter.ts` (dead model-prop wiring); the `NORMALIZED_COLOR_NAMES` relocation (2 importers) — the last three per seed rider 2 | state-color-pipeline P0-1/P1-1/-2/-3/P2-2 §3; SEEDS.md w2-usecolorpipeline |
| W2-2 | **src-side accent stringification**: both hand-denorm blocks (`C*0.5`, `H*360` magic literals) replaced by W1-6's `safeAccentCssString`; verify+fix the light-mode near-white contrast-guard miss (P2-1: the guard demonstrably did not fire on the default pick). **Sequenced LAST in W2** — consumes W1-6's export (intra-round ordering, `S.md §3.1`) | `useContrastSafeColor.ts:34-59,82-93` | state-color P1-4/P2-1 |
| W2-3 | **`Normalized`/`Display` brand evaluation** (the E4 class): 24+30 callsites track norm/denorm by positional booleans; a phantom brand (the `ColorChannel` precedent) retires the class. Evaluate + decide in-wave; land if the diff stays mechanical | `normalize.ts:57,73` | state-color P1-4 |
| W2-4 | **`useApiClient()` + `API_CLIENT_KEY`**: one provider owning `{request, adminRequest, sessionToken(ref), availability, baseUrl}`; the 3 module singletons collapse behind the SAME seam color-state uses; the 2 direct `apiAvailability` importers inject; quantize worker gains an optional `workerFactory` param | `client.ts:35-37`; `availability.ts:26`; `ApiOfflineChip.vue:15`; `PaletteCardMenu.vue:159`; `useImageQuantize.ts:11-14` | architecture-di §3/§6 |
| W2-5 | **Browse-actions dedup** (the realized copy-paste-then-diverge): `BrowsePane`'s hand-rolled `onFork`/`onTierChange`/`onTagsChange`/`onClearFilters` collapse onto the one host-agnostic composable; the forkCount increment ported into the shared fn; the silent `console.warn`-only fork catch routed through the same `showFeedback` its own file already uses | `BrowsePane.vue:158-197,260-275`; `useDialogBrowseActions.ts:29-64` | legacy-sweep-components F1/F2 |
| W2-6 | **Composable hygiene**: `ColorModel.savedColors: ParsedColorUnit[]` (the `| any` union collapses the field to `any[]`; 4 casts die); `useSlugMigration` onto `ApiProblem.status` (all three authored messages are unreachable today — the substring branches match nothing); the two unbounded 50ms polls capped + give-up log; `useCustomColorNames` dev-gated diagnostic; the lateral-import lifts (mix/extract/generate → palette-browser primitives to a neutral home) | `color-picker/index.ts:33`; `useSlugMigration.ts:76-82`; `usePaletteManagerWiring.ts:74-99` | legacy-sweep-composables; architecture-di §2b |
| W2-7 | **vue-router 4→5** (the fired book): migrate per W0-7's scope probe. **Sequenced LAST in W2** (`S.md §3.1`); a disproportionate probe result de-scopes to a book per Q11's objective bound without stalling the wave's other closures | `demo/package.json:167` | deferred-books-census §2 |
| W2-8 | **api service-signature unification**: all 30 `Context`-taking fns across `services/{admin,color,session}` → `fn(services: Services, actor, …)`; routes pass `c.var.services` + the resolved actor; mirrors the `palette/*` tier that already proves the shape. Mechanical; the single largest boundary win | `services/color/proposals.ts:31`; `services/admin/users.ts:45,108,150` et al. | architecture-di §2d/§6 |
| W2-9 | **Copy hoists + typed accessors**: the 3 dynamic `copyToClipboard` imports hoisted static; a typed `ColorSpace`-keyed accessor retires the `as any` lookups in `useSliderGradients`; the `'#888'` empty-palette literal named | legacy-sweep-components F7/F8/F10 | legacy-sweep-demo-components |

### Seed riders (SEEDS.md w2-usecolorpipeline, folded at ratification — binding on W2-1)

1. **`applyTokens` ∧ ≤400-LoC are in tension**: the seed's merged composable held 397 LoC only
   because 2 of the "4 root-token writes" (`--accent-live`, `--view-hue-shift`) stayed
   App-scoped (they read `useContrastSafeColor`/viewManager, not the color model). Amended: one
   `applyTokens` sink for the COLOR-MODEL-DERIVED root-token writes; the other two stay
   App-scoped, OR unify into a sibling `useColorTokens` with the ≤400 cap applying per-file.
2. **The anchor list under-counted the blast radius**: `keys.ts` (injected key/ActionBarContext
   type), `usePaneRouter.ts` (dead model-prop wiring), and the `NORMALIZED_COLOR_NAMES`
   relocation (2 importers) are appended to the W2-1 anchor cell above.
3. **Persistence-premise correction**: localStorage (`color-picker`) is WRITE-ONLY today — no
   boot restore exists, so there is no clobber to demote; the work is to ADD a
   localStorage→model restore gated behind URL-wins, sequenced with W6-1.
4. **The `savedColorStrings` twins diverge in OUTPUT** and the loser feeds the palettes pane:
   the canonical formula is the per-space `toFormattedString` version (recommended); a
   palettes-pane display check joins the wave gate (§Hard gate).

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `src/` write other than W2-2's consume site + W2-3's brand (if it
  lands mechanical); any `../glass-ui` write; `useColorPipeline` breaching 400 LoC (the item's
  own bound — decompose, don't waive);
- **non-local gate failures**: the URL-wins e2e failing after the precedence declaration (the
  P0 premise — localStorage clobbers AND rewrites the hash — mis-modeled); the `defineModel`
  staleness proving non-resolvable at the source (the MEMORY.md `shallowRef`-cache caveat class);
  the W2-8 mechanical sweep surfacing a service fn that genuinely needs `Context` (boundary
  design call, not a carve-out);
- **W2-7 de-scope**: Q11's objective bound (>1 non-mechanical breaking-change class OR >300 LoC
  migration diff) → book it and close the wave without it — this is a sanctioned de-scope, not
  a triumvirate; the triumvirate fires only if the probe itself was wrong in kind;
- **loop halt**: the third iteration of any watcher-graph diagnostic loop halts and routes.

## §File bounds · disjointness · worktrees

| Unit | Files | Access |
|---|---|---|
| pipeline (W2-1, W2-2 LAST, W2-3) | `demo/@/composables/color/{useColorModel,useAppColorModel}.ts` → `useColorPipeline` home · `App.vue:131-177` · `useContrastSafeColor.ts` · `src/units/color/normalize.ts:57,73` (brand, if mechanical) | modify/create |
| DI + composables (W2-4, W2-5, W2-6, W2-9) | `demo/@/lib/palette/api/{client,availability}.ts` · `ApiOfflineChip.vue` · `PaletteCardMenu.vue` · `useImageQuantize.ts` · `BrowsePane.vue` · `useDialogBrowseActions.ts` · `color-picker/index.ts` · `useSlugMigration.ts` · `usePaletteManagerWiring.ts` · `useSliderGradients.ts` | modify |
| api (W2-8) | `api/src/services/{admin,color,session}/**` + their routes | modify |
| router (W2-7 LAST) | `demo/package.json` · router wiring per the W0-7 probe | modify |

Do NOT touch: `../glass-ui`, `docs/precepts/`, `src/` beyond the two named sites,
`ColorPicker.vue` structural composition (that is W4-2's — round-2 single-writer law). Units are
path-disjoint; parallel agents in sibling worktrees cut from the wave head.

## §Hard gate (SYNTHESIS §5 wave gate, verbatim)

A URL-color e2e (cold load with populated localStorage → the URL color WINS, field + accent +
readout agree; the localStorage restore is the NEW path seed rider 3 names — added, gated
behind URL-wins); grep gates — 0 direct `apiAvailability` imports, 0 `Context` params under
`services/`, 0 `savedColors` casts; typecheck + vitest + e2e green; no new file >400 LoC.
Plus: `cd api && npx tsc --noEmit` 0; api suite green (224/224 baseline holds); the
palettes-pane display check green (the canonical `savedColorStrings` formula feeds it — seed
rider 4).

## §No-workaround prohibitions (binding)

- **No framework invention** — idiomatic Vue 3.5 provide/inject + plain `Services`-in functions
  only (KISS; `feedback_kiss_no_contrivance`).
- **No backwards-compat shims** — the `defineModel` staleness resolves at the source; the
  second model copy dies or becomes a pure injected consumer, never a synced twin.
- **No `Context` carve-outs** under `services/` — 0 means 0; a genuine need routes through the
  triumvirate as a boundary design call.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each unit batch and before close;
`cd api && npx tsc --noEmit` + the api suite after W2-8; `npx playwright test` (incl. the new
URL-color spec) before close; `boot-smoke` cold after W2-7 (module-graph touch).

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the URL-wins e2e output; the three grep-gate captures
(zero-hit proofs); the W2-3 decision record (brand landed or declined, with the mechanical-diff
evidence); the W2-7 outcome (migrated, or the Q11-bound book record); per-unit commit hashes.

## §Commit plan

W2-1 pipeline (own commit with body — the spine); W2-4 DI seam; W2-5 + W2-6 + W2-9 (composable
hygiene, row-scoped); W2-8 api unification (mechanical sweep, one commit with body); W2-3
decision commit; W2-2 accent stringification (LAST-1); W2-7 router (LAST); a status commit at
close. Scopes name the owned surface (pipeline / di / api-services / router).

## §Dependencies

- **Depends on**: S.W0; W2-2 additionally on W1-6's first landing (`safeAccentCssString`).
- **Blocks**: S.W3 (measures against the coalesced token sink) + S.W4 (shared ColorPicker
  files) + S.W6 (boot-seed integrity rides the pipeline).

## §BOOKS opened/serviced (books-never-gates)

- **vue-router 4→5 (K-W5RT)** — the FIRED book folds here (W2-7); if Q11's de-scope bound
  fires, it re-books with the probe artefact attached.
- **`usePaletteStore` schema migration** — NEW BOOK stands (`S.md §7`); W2-6 does not silently
  discharge it.

## §Evidence packets consumed

`audit/lanes/architecture-di-boundaries.md` · `audit/lanes/state-color-pipeline.md` ·
`audit/lanes/god-module-dry-census.md` · `audit/lanes/legacy-sweep-demo-components.md` ·
`audit/lanes/legacy-sweep-demo-composables-lib.md` · `audit/lanes/deferred-books-census.md` §2 ·
the W0-7 scope-probe artefact.

## §Hand-off

W3 lands the rAF-coalesce with/atop this wave's `applyTokens` sink; W4 recomposes atop the one
model; W6-1's boot-seed integrity rides W2-1's precedence fix (the URL-clobber half). The
URL-color e2e becomes a standing suite member.
