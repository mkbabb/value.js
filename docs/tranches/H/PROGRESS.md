# H — Progress

Execution log for tranche H. Updated at wave boundaries. **Planning-only at H open** per the user directive ("This is NOT an implementation phase. Tranche development only.").

## 2026-05-22 — H open (the 6-agent audit directive)

### Trigger

User issued the canonical 6-agent-audit invocation immediately following the G merge + v0.9.0 tag (commit `e166d37`). Verbatim charter at `H-PROMPTS.md §1`.

### Repo state at H open

- Branch: `tranche-h` (off master `e166d37`).
- F merge: `6b3a41b` (v0.8.0).
- G merge: `e166d37` (v0.9.0).
- `docs/precepts`: `68d9b20` (unchanged through D-G).
- `as any` in src/: **0** (G2; codified).
- `as unknown as` in src/: 4 (genuine irreducible boundary casts).
- `@ts-ignore` / `@deprecated`: 0.
- vue-tsc: 0 errors.
- vitest: 1584/34.
- api vitest: 106/21.
- e2e specs: 36.
- 8 proof scripts: all exit 0.
- `dist/value.js`: 125,496 B (≤ 148,480 ceiling).

### Audit round — 6 parallel research lanes (DONE)

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| H-AUDIT-1 | prompts + precepts recap | `audit/H-AUDIT-1-prompts-precepts.md` | 27 cumulative prompts (22 + 5 new); ALL precepts/invariants HOLD; 8 silent-gap candidates; **Gap #5 — demo/ god-module audit is the highest-value new finding** |
| H-AUDIT-2 | deferred-items ledger | `audit/H-AUDIT-2-deferred-ledger.md` | 22 H-dispositions: 6 FOLD + 1 RETIRE + 10 PEER-AUTH + 5 CARRY + 1 INFO; **9 chronic at 6-tranche carry** (the 8 glass-ui asks + keyframes.js precept-pin) — doubled-clause demands sharper disposition |
| H-AUDIT-3 | state-at-H-open | `audit/H-AUDIT-3-state-at-H-open.md` | 15/15 gates PASS at HEAD `e166d37`; bench L8 10.14× / DIRECT_PATHS 4.50× / nameParser 37.93× (all within noise of G close); zero drift |
| H-AUDIT-4 | cross-repo state | `audit/H-AUDIT-4-cross-repo-state.md` | **ZERO-mutation G→H boundary** across every sibling; **speedtest AL opened** same weekend (planning-only); value.js confirmed sole-identified-consumer of `glass-ui/MetaballCanvas`; 0 (c) triggers fired |
| H-AUDIT-5 | architecture | `audit/H-AUDIT-5-architecture.md` | 9 H-OPP candidates; substrate cleaner than at G open; `Color<T>` deeper restructure REJECTED (would defeat L8 monomorphic storage) |
| H-AUDIT-6 | api + e2e + CI | `audit/H-AUDIT-6-api-e2e-ci.md` | **DEFECT**: createPalette + patchPalette miss withTransaction (orphan-version exposure class); 4-flag api/tsconfig strictness gap; `proof:as-unknown-as-budget` codification candidate |

### Plan synthesis (DONE)

`H.md` synthesized from the 6 audit deliverables. Five substantive waves (W1-W4) + 2 HEADLINE wave-pair (W0 + W5):
- **H.W0** — open + 6 audit lanes + plan substrate + **ratification ask** (planning-only).
- **H.W1** — api/ cascade-correctness + strictness lift.
- **H.W2** — type-system completion II (`as unknown as` ≤ 3 + codified).
- **H.W3** — demo decomposition + invariant extension.
- **H.W4** — micro-polish + flake mitigation + close docs.
- **H.W5 HEADLINE close** — FINAL.md + I-SEED + merge + tag.

Plus 4 H-specific invariants (H1-H4): H1 cascade-correctness; H2 `as unknown as` ≤ 3; H3 no demo god module (≤ 400 LoC); H4 cross-tree invariant codification.

Wave specs `waves/H.W0..H.W5.md`. Cross-repo coordination `coordination/Q.md`. Dispatch contract `dispatch/AGENT.md` (deltas vs G).

### State at H open (planning-only)

Plan substrate: `H.md`, `H-PROMPTS.md`, `findings.md`, `audit/H-AUDIT-1..6` (6 audit docs), `coordination/Q.md`, `dispatch/AGENT.md`, `waves/H.W0..H.W5.md`, this file. **No implementation has run — planning-only + ratification ask outstanding.**

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| H.W0 HEADLINE — open + 6 audits + plan substrate + ratification ask | **closed** | 2026-05-22 | 2026-05-26 | `cacdb14` open + close-ratification |
| H.W1 — api/ cascade-correctness + strictness lift | **closed** | 2026-05-26 | 2026-05-26 | `ef39ad9` Lanes A + A.2 + B impl + `9c32e7a` Lane C audit-list + PROGRESS |
| H.W2 — type-system completion II (`as unknown as` ≤ 2; tightened from plan's 3) | **closed** | 2026-05-26 | 2026-05-26 | `62fe15d` Lanes A + C retirements + `3b0d933` Lane B codifier + PROGRESS |
| H.W3 — demo decomposition + invariant extension | **closed** | 2026-05-26 | 2026-05-26 | `f4ba240` Lanes A + B + C (H3 demo decomp) + `da8b68d` Lanes D + E (H4 codification) + `d5d570b` close |
| H.W4 — micro-polish + flake mitigation + close docs | **closed** | 2026-05-26 | 2026-05-26 | `d8bc2b7` Lanes A + B + C + D + E (combined polish-grade) + (this commit) close |
| H.W5 HEADLINE close — FINAL.md, merge, vN.N.N tag | planned | — | — | — |

## Open dependencies — H open (awaiting ratification)

Per G1 binding ("Relay all carry-forward items to me for ratification"), the following 5 blocks are presented to the user for explicit ratification before H.W1+ dispatch. Full detail at `H.md §7`.

**Block A** — 9 chronic 6-tranche-carry items (4-option ask: continue / re-frame / propose API shapes + brief AL / selectively retire).

**Block B** — 6 FOLD-INTO-H items (H.W1-W3 lanes — cascade-correctness defect + tsconfig + XYZ_FUNCTIONS + proof:as-unknown-as-budget + demo decomposition + invariant extensions).

**Block C** — 5 micro-polish FOLD items (H.W4 lanes — Rolldown markers + bench provenance + e2e flake + CI release docs + CONTRIBUTING gaps).

**Block D** — PEER-AUTHORSHIP carry-forwards under chosen Block-A Option.

**Block E** — release version: v0.10.0 (default, idiomatic semver-minor) vs v1.0.0 (declare stable public API).

## 2026-05-26 — H.W0 close + user ratification received

User ratification (via AskUserQuestion 3-question response):

- **Block A (9 chronic 6-tranche-carry items)**: **Option C+A+D combo** — Propose Metaballs API shapes + brief speedtest AL with value.js's sole-identified-consumer stake (C); carry the 7 other glass-ui asks under sharpened (c) triggers per `coordination/Q.md §2` (A); review for selective retirement at H.W5 close (D). value.js authors the proposed Metaballs sub-ask shapes (already drafted in `docs/tranches/G/coordination/Q.md §2.1.1`) + a brief to speedtest AL surfacing the sole-consumer stake before AL ratifies publisher-retirement. **PEER-AUTHORSHIP remains for shipment.**
- **Block B+C (16 FOLD-INTO-H lanes)**: **Ratify all 16** — proceed to H.W1 on next "Begin and continue" authorization. Full plan as written.
- **Block E (release version)**: **v0.10.0** — idiomatic semver-minor bump. The v1.0.0 stability-declaration is deferred (separate marketing/comms decision).

Block D implicit acceptance: PEER-AUTHORSHIP carry-forwards routed under the Block-A Option (C+A+D); status-quo for the remaining peer-asks (contract-v2 font, keyframes.js precept-pin, R11 LEAVE LOCAL).

H.W0 CLOSED on this ratification. **H.W1 awaits explicit user execution authorization** ("Begin and continue the current tranche…" — per the established F+G pattern). Tranche substrate is fully committed at `cacdb14`.

## 2026-05-26 — H execution authorized (user directive)

User issued the H execution authorization (verbatim from the F+G precedent): "Begin and continue the current tranche. You must read any and all appurtenant documentation and adhere exactly to the plan, in particular regarding agent orchestration and deep parallelization. Do not edit items directly unless befitting and fully orchestrate the processes as team lead. Continue through this indefatigably: do not relinquish control back to me until you have completed the plan IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt approaches."

## 2026-05-26 — H.W1 close (Lanes A + A.2 + B + C)

H.W1 dispatched on the execution authorization. Lane A (createPalette + patchPalette withTransaction wraps + 2 rollback tests) + Lane C (exhaustive cross-collection audit-list) ran in parallel. Lane C's exhaustive sweep surfaced **7 additional cross-collection write sites** not enumerated in H-AUDIT-6 §1.4 — same defect class as Lane A's findings.

Per F1 "no deferrals" + the H1 maximalist invariant text ("Every cross-collection write site in api/ uses withTransaction") + the H-opening doctrine ("NO workarounds: idiomatic, gestalt approaches"), the orchestrator adjudicated **Option α (full in-wave fold)** — Lane A.2 was dispatched as an in-wave extension wrapping all 7 surfaced sites (D4-D10) + adding 7 rollback tests + extending 7 repository signatures + updating the standing reference. Precedent: G.W1 Lane B's assets/docs in-wave remediation (committed as `27f2183`) and G.W4's dispatch.ts in-wave LoC remediation (committed as `9902036`).

Lane B (api/tsconfig strictness lift to root parity — 4 flags) ran sequentially after Lanes A + A.2 so the strictness probe saw the final api/ state. 36 surfaced errors repaired genuinely (zero `@ts-ignore`, zero `as any`, zero `as unknown as` added to api/). Incidental finding (JC-2): a latent duplicate `PaletteColor` interface in `api/src/hash.ts` was unified to the canonical `models.ts` source-of-truth — an elegance finding the H thesis predicted.

**Wave-level evidence**:
- api vitest: 22 files, 115 tests pass (was 21/106 at H open; +1 file + 9 new tests).
- api `tsc --noEmit`: exit 0 with the 4 new strictness flags active.
- Root vitest: 1584/34 unchanged (no src/ changes in H.W1).
- `grep -rn 'services.withTransaction' api/src/services/ | wc -l`: 16 (was 9 at H open).
- Zero escape-hatches added to api/ corpus.
- precepts submodule pinned at `68d9b20` (one upstream-drift `f27627e` working-tree reset at execution start).

**Commits**:
- `ef39ad9` — Lanes A + A.2 + B implementation (22 files, +1255/−130).
- (following commit) — Lane C standing reference + PROGRESS.md update.

**Carry-forward at H.W1 close**: NONE. H1 invariant fully closed for the maximalist reading. The 3 remaining DEFERRED entries (D1, D2, D3) all carry defensible documented carve-outs (D1 batchUsers(delete) per-row already-transactional + in-code comment; D2 emitAuditEvent befitting-graceful + comprehensive doc-comment at events/auditLog.ts; D3 impersonate via D2 carve-out).

## 2026-05-26 — H.W2 close (Lanes A + B + C)

H.W2 — type-system completion II (H2 invariant). Three lanes; Lanes A + C dispatched in parallel (file-disjoint: `src/units/color/dispatch.ts` vs `src/units/normalize.ts`); Lane B (the codifier) sequenced after so its budget reflected the actual post-(A+C) count.

**Lane A** — typed `XyzFunctionsTable` mapped-type retires the XYZ-hub fallback cast at `src/units/color/dispatch.ts:143`. Two typed lookup helpers (`getXyzToFn` / `getXyzFromFn`) mirror G.W2 Lane B's `getDirectPath` precedent in `conversions/direct.ts`. Bench gates all GREEN (L8 10.49×, DIRECT_PATHS HSL→RGB 4.19×, nameParser 39.42×).

**Lane C** — type-predicate `isColorValueUnit(value): value is Parameters<typeof normalizeColorUnits>[0]` retires the cast at `src/units/normalize.ts:319` AND removes a dead-helper runtime branch. The duplicated discriminant check at the call sites collapses into the predicate's narrowing — pure code cleanup driven by the type-retirement. `src/units/normalize.ts:117` (DOM `CSSStyleDeclaration` cast) examined + KEPT with a 7-line policy-comment classifying it as the DOM-structural-impossibility irreducible class per H.md §2 H2.

**Budget-tightening adjustment**: H.W2.md anticipated budget = 3 (post-Lane-A count). Lane C retired more than the plan anticipated — the actual post-(A+C) count is **2**. Per the H2 invariant text "budget headroom is zero, count can only be lowered, never raised", **budget = 2** (no headroom, strictest reading). The plan's "≤ 3" is supplanted by the cleaner-than-anticipated outcome.

**Lane B** — `scripts/proof-as-unknown-as-budget.mjs` (75 LoC; sub-60 target missed by header comment + budget-tightening rationale documentation co-located with the enforcement). Mirrors `scripts/proof-as-any-budget.mjs` (G.W3 Lane D) shape exactly. Wired into `package.json scripts` (sibling-adjacent to `proof:as-any-budget`) + `.github/workflows/node.js.yml` proof block (after the existing as-any-budget step).

**Wave-level evidence**:
- `npm run proof:as-unknown-as-budget` → PASS, exit 0, count = 2 ≤ 2.
- `grep -rn 'as unknown as' src/ | wc -l` → 2 (was 4 at H open).
- `npx vitest run` → 1584 / 34 pass.
- `npx vue-tsc --noEmit` → 0 errors.
- `npm run build` → exit 0; `dist/value.js` 125,421 B (delta −75 B from H open's 125,496; well under 148,480 ceiling).
- Bench gates all ≥ floors.

**Remaining 2 `as unknown as` sites** (now policy-documented + codified by `proof:as-unknown-as-budget` CI gate):
1. `src/units/normalize.ts:117` — DOM-structural-impossibility (CSSStyleDeclaration).
2. `src/parsing/color.ts:59` — clone-reinterpret (Color<T> generic widening across `.clone()` boundary).

**Commits**:
- `62fe15d` — Lanes A + C retirements (4 files, +544/−23).
- (following commit) — Lane B codifier + PROGRESS.md update.

**Carry-forward at H.W2 close**: NONE. H2 invariant fully closed for the maximalist reading with budget tightened to the actual residue.

## 2026-05-26 — H.W3 close (Lanes A + B + C + D + E)

H.W3 — demo decomposition (H3 invariant) + invariant codification II (H4 invariant). Five lanes dispatched in parallel (all file-disjoint after the orchestrator surveyed Lane A's 14 importer surface — none overlapped Lane B's PointerDebugOverlay + PaletteCard targets, Lane C's color-picker/index.ts, Lane D's markdown/highlighting, or Lane E's plugins/).

**Lane A** — `demo/@/lib/palette/api.ts` 484 LoC decomposed into **9** cohesion-honest modules (vs plan's 8 — the extra `client.ts` extracts HTTP transport infra that couldn't honestly live inside any single domain module). All ≤ 350 LoC (max 110). Old `api.ts` DELETED (not shimmed). 14 importers auto-resolve through the barrel via TypeScript's directory-as-module resolution; ZERO explicit consumer edits.

**Lane B** — Gap #5 audit found 2 demo/ files > 400 LoC (excluding Lane A's target): `PointerDebugOverlay.vue` 449→286 (extracted `DebugEventLog.vue` 136-LoC sub-component; lifted DOM-walk pointer-capture recovery into `usePointerDebug` composable) and `PaletteCard.vue` 435→388 (extracted `PaletteCardSwatches.vue` 96-LoC sub-component; folded dead `toggleMenu`; inlined single-call-site helper). Zero "cohesion-tight, leave + document" cases.

**Lane C** — `color-picker/index.ts` 376→99 LoC (−277). `colorSpaceInfo` pure-data object lifted to `colorSpaceInfo.ts` (291 LoC). Both consumers already imported via barrel; ZERO consumer impact.

**Lane D** — H4 codification: `proof:no-ts-ignore` extended `src/` → `src/ + demo/` (with `--exclude-dir=ui` for vendored shadcn). 2 `@ts-ignore` annotations in `useMarkdownHighlighting.ts` retired via `declare module "*.css?inline"` in `demo/color-picker/vite.d.ts`.

**Lane E** — H4 codification: `proof:no-bare-builtins` extended `api/src/` → `api/src/ + plugins/ + scripts/ + bench/`. 1 outlier (`plugins/vite-source-export.ts:2`) fixed with `node:fs` prefix.

**Wave-level H3 + H4 evidence**:
- `find demo/ -name '*.vue' -o -name '*.ts' | xargs wc -l | awk '$1 > 400'` (excluding `demo/@/components/ui/` shadcn-vue) → 0 files (was 3 at H open: palette/api.ts + PointerDebugOverlay + PaletteCard).
- `npm run proof:no-ts-ignore` → PASS at `src/ + demo/` (exit 0).
- `npm run proof:no-bare-builtins` → PASS at `api/src/ + plugins/ + scripts/ + bench/` (scanned 86 files; exit 0).
- `npx vue-tsc --noEmit` → 0 errors.
- `npx vitest run` → 1584 / 34 pass.
- `npm run gh-pages` → exit 0.
- `npm run build` → exit 0.
- `npm run lint` → exit 0.
- All 9 proof scripts now exit 0 at their full applicability.

**Commits**:
- `f4ba240` — H3 demo decomp (Lanes A + B + C). 21 files, +1705/−1009.
- `da8b68d` — H4 invariant codification (Lanes D + E). 7 files, +378/−35.
- (this commit) — PROGRESS.md close.

**Carry-forward at H.W3 close**: NONE. H3 fully closed (demo/ god-modules eliminated). H4 fully closed (proof scripts at full applicability for their declared trees).

**Side-note**: Lane C reported a pre-existing `(colorSpaceInfo as any)[space]` at `ComponentSliders.vue:162` (consumer-side; out of Lane C bounds; not src/-scope so G2 doesn't apply; left untouched — `demo/` `as any` ratio is not under the H2/G2 cap). Surfaced as an informational item; not a carry-forward action.

## 2026-05-26 — H.W4 close (Lanes A + B + C + D + E)

H.W4 — polish-grade transpositions. Five lanes dispatched in full parallel (5-way; all file-disjoint). Each lane landed cleanly; per-lane judgment calls all positive (Lane A's −1291 B was 4× the H-SEED estimate, Lane C found a second symmetric flake site at :95 not enumerated in the audit).

**Lane A** — Rolldown `experimental.attachDebugInfo: "none"` strips `//#region` markers from `dist/value.js`. 125,421 → 124,130 B (−1,291 B). Scoped to `mode === "production"` only; gh-pages/hero-lab/dev untouched.

**Lane B** — Bench provenance hygiene: 7 line-number refs (6 in color2-direct-paths, 1 in parser-namelookup) repointed to symbol references. `color-channel-access.mjs` untouched (no `:NNN` refs at lane open). Bench medians unaffected.

**Lane C** — Reactivity-instant flake mitigation: TWO sites (slider-keyboard :198 AND symmetric spectrum-drag :95). Outer "alive?" wait 200ms → 2000ms; perceptual gates (50ms spectrum, 100ms slider) UNCHANGED. `--repeat-each=5 --workers=1` deterministic post-fix.

**Lane D** — `docs/RELEASE.md` (NEW; 6 sections) codifies the manual tranche-close publish ceremony. NO `.github/workflows/release.yml` authored — manual ceremony preserved per H-AUDIT-6 §3.4 Option (a).

**Lane E** — `CONTRIBUTING.md` +6 lines: playwright install quickstart + 5-project topology + new `## Release` section referencing `docs/RELEASE.md`.

**Wave-level evidence**:
- `npm run build` → exit 0; dist/value.js 124,130 B (Lane A delta).
- `npx vitest run` → 1584 / 34 pass.
- `npm run bench` → all gates GREEN (L8 10.45×, color2 HSL→RGB 3.31×, nameParser 55.46×).
- `npm run lint` → exit 0.
- `npx playwright test --project=smoke-reactivity --repeat-each=5 --workers=1` → PASS deterministic.
- All 9 proof scripts exit 0.

**Commits**:
- `d8bc2b7` — Lanes A + B + C + D + E (11 files, +1075/−12).
- (this commit) — PROGRESS.md close.

**Carry-forward at H.W4 close**: NONE. All polish-grade items landed.

H.W5 close ceremony unblocked.

## Authority

Per `H-PROMPTS.md §4`: H's substrate flows from the 6 audit deliverables + the synthesis in `H.md` + `findings.md` + the predecessor-authored `docs/tranches/G/H-SEED.md`.
