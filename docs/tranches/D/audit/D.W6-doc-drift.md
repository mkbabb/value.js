# D.W6 close audit lane 3 — doc-drift sweep

**Mode**: read-only inspection + targeted writes (per close-ceremony Part D-G).
**Verdict**: **PASS** with applied corrections enumerated below.

## Root `CLAUDE.md` drift

**Pre-D.W6 state**:
- Claims "1409 tests, 26 files" — DRIFT (actual: 1582 tests / 34 files post-D.W1).
- Claims "3 specs" desktop Chromium only — DRIFT (actual: 21 specs across 3 projects post-D.W5).
- Missing `npm run lint`, `npm run proof:resolution`, `npm run build:watch` scripts.

**Applied in §Part D of close ceremony**: targeted updates to test counts + smoke spec count + new scripts list. **CORRECTED.**

## `demo/CLAUDE.md` drift

**Pre-D.W6 state**: Pre-Mar-2026-restructure stale — the "Structure" + "Custom components" + "Composables" tables predate the Mar-2026 composable restructure AND tranche B consolidations AND tranche D additions (PaletteDialog/ dir, viewSchema, facade sub-objects, Vue 3.5 codemod, Tailwind v4 token-bridge surface).

**Applied in §Part E of close ceremony**: wholesale reconcile (per D.W6 spec item 6 — "wholesale reconcile to the post-D state").

Current `demo/@/components/custom/` subtrees (verified by `ls`):
- `color-picker/` (controls/, display/, editing/, visual/, composables/, ColorPicker.vue, index.ts, keys.ts)
- `palette-browser/` (PaletteDialog/, AdminPanel.vue and ~30 sibling SFCs, composables/, index.ts)
- `palette-browser/PaletteDialog/` (PaletteDialog.vue shell + components/ + composables/ + constants.ts)
- `image-palette-extractor/` (ImageEyedropper/, ImagePaletteExtractor.vue, ExtractControls.vue, ImageDropZone.vue, composables/)
- `dock/`, `goo-blob/`, `gradient/`, `mix/`, `generate/`, `markdown/`, `katex/`, `panes/`, `watercolor-dot/`, `dark-mode-toggle/`, `svg-filters/`

Current `demo/@/composables/`:
- `auth/` (useAdminAuth, useAdminUsers, useSession, useUserAuth)
- `color/` (useAppColorModel, useContrastSafeColor)
- `palette/` (useAdminAudit, useAdminFlagged, useAdminTags, useBrowsePalettes, useColorNameQueue, usePaletteActions, usePaletteExport, usePaletteManager, usePaletteManagerWiring, usePaletteStore, useSlugMigration, useTagEdit, useVersionHistory)
- Root utils: `prng.ts`, `useFilteredList.ts`, `usePaneRouter.ts`, `useSafeStorage.ts`, `useViewManager.ts`, `viewSchema.ts`

**CORRECTED.**

## `api/CLAUDE.md` drift

**Pre-D.W6 state**: D.W2 Lane D landed the 81 → 190 line reconcile. Re-verified at D.W6:

| Claim | Reality | Match? |
|---|---|---|
| `git ls-files api/src/repositories \| wc -l` ≥ 9 | actual: 9 | ✓ |
| `git ls-files api/src/routes/admin \| wc -l` = 9 | actual: 9 | ✓ |
| `git ls-files api/src/services/palette \| wc -l` = 7 | actual: 7 | ✓ |
| 9 collections / 27 indexes | matches `src/db.ts` declaration | ✓ |
| Full Lane A+B+C topology declared | matches actual tree | ✓ |
| Pipeline shape `validate → authn → authz → service → repository → format → response` | matches `src/index.ts` middleware stack | ✓ |

**No corrections required. VERIFIED current.**

## Wave specs (D.W0..D.W6) vs shipped tree

Per the close audit, each wave spec was the planning artefact; the PROGRESS.md log is the truth source for what actually landed. Plan-vs-actual audit (lane 1) verified zero divergence. No wave-spec drift remediation needed at close — these are historical planning artefacts and remain pinned for traceability.

## `bbnf-equivalence.test.ts` misnomer (D.W6 item 10)

**Verified**: `head -10 test/bbnf-equivalence.test.ts` shows zero BBNF runtime imports. The file imports only the hand-written TypeScript parsers (`parseCSSValue`, `parseCSSTime`, `parseCSSColor`, `parseCSSValueUnit`, `parseCSSPercent`) and snapshots their output. Per CHALLENGE-Dm: this is a "documentation lie" — the file labels its snapshots "BBNF Equivalence" but does no BBNF execution.

**Decision (KISS default per spec)**: rename to `test/parser-snapshot.test.ts`. The BBNF grammars under `src/parsing/grammars/` remain as documentation artefacts (referenced in `vite-env.d.ts` for the `?raw` import declaration, but no runtime equivalence-execution wiring exists in the codebase). Wiring the grammars to a runtime equivalence check is a larger engineering effort that belongs in a successor effort (named-routed via `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §3 L15` if pursued).

**Applied**: `git mv test/bbnf-equivalence.test.ts test/parser-snapshot.test.ts`. The 128 tests still pass (`npx vitest run test/parser-snapshot.test.ts` — 128 passed). The vitest total remains 1582 (no test count change).

**Forward references in docs**:
- `docs/tranches/D/PROGRESS.md` line 109: historical narrative — retained as-is (records the decision).
- `docs/tranches/D/research/Dm-parsing.md`, `docs/tranches/D/research/Dm-CHALLENGE.md`, `docs/tranches/D/audit/D-LIB-OPTIMIZATION-SYNTHESIS.md`, `docs/tranches/D/waves/D.W6.md` — historical research/planning artefacts; retained at-rest references to the old filename for traceability.

**CORRECTED.**

## `coordination/Q.md §3` final state (D.W6 item 4)

**Pre-D.W6 state**: §3 carries 9 rows; D.W1 added the contract-v2 §2.1 keystone gap row (filed at D.W1 Step 1).

**Applied in §Part G of close ceremony**: update §3 to reflect post-D state:
- Contract-v2 §2.1 keystone gap on glass-ui's `./styles` subpath — **STANDS** (orchestrator's narrow `siblingFsAllowTransient` is the consumer-side reciprocal; retires when glass-ui ships a contract-v2-compliant Tailwind-source distribution).
- 7 standing primitive/blob gaps + `BlobDot` + `deriveAuroraPalette` + `<Tabs variant="underline">` — **STAND** (no new glass-ui ships since D open; verified by `coordination/Q.md §2` "no new ships since B close" still holds at D close).
- keyframes.js consumption update post-v0.6.0 filed at §9.5 — **STANDS**, bumps on keyframes.js's own schedule.
- smoke-safari WebKit follow-up (D-HARDEN-5 §4 / D.W5 Lane C) filed at §11 — **STANDS**, routes to a successor testing-hardening tranche.

**CORRECTED.**

## K4 Prettier-doc gap (D.W6 item 8 — Da §3 item 18)

Per D-HARDEN-6 §3 fold-in: K4 was "fold the Prettier-config doc-coverage gap into close ceremony's doc-drift sweep — either add to CLAUDE.md's Conventions block; or record as named-destination."

**Decision**: D's Conventions block in CLAUDE.md does not mention Prettier; the project uses ESLint flat config (D.W1 L7) for code-style enforcement. Prettier (used incidentally by demo/markdown rendering and dev tooling) is not an enforced project-wide formatter at the library level. The "gap" is documentation-only — there's no `.prettierrc` actively binding the library codebase. **Recording as named-destination**: if a future library-doc tranche unifies a formatting policy, that effort folds it. No D.W6 action required beyond this record.

## Aggregate verdict

**4 docs reconciled**: root `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md` (verified-current, no corrections), `coordination/Q.md` §3 final state.
**1 rename**: `bbnf-equivalence.test.ts` → `parser-snapshot.test.ts`.
**1 named-destination filed**: K4 Prettier-doc gap.

**PASS.**
