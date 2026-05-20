# E-AUDIT-3 — D execution review

**Lane**: E-AUDIT-3 (E's tranche-opening audit, lane 3 of 6).
**Mode**: READ-ONLY research. NO mutating git; NO src/ edits.
**Repo HEAD at open**: `eae8afc` (D close merge into master). Branch `tranche-e`.
**Scope**: deep audit of Tranche D's execution against `D.md` + the 7 wave specs. Identify deviations (spec said X, reality is Y). Spot-check architectural depth: did D's transpositions achieve idiomatic, gestalt approaches or did they bolt-on / band-aid?

## §1 — Methodology

Source-of-truth read across (read-only):

- `docs/tranches/D/D.md` (the master plan, 104 lines).
- `docs/tranches/D/waves/D.W0..D.W6.md` (the 7 wave specs, 791 total lines).
- `docs/tranches/D/findings.md` (the audit-to-wave mapping, 118 lines).
- `docs/tranches/D/PROGRESS.md` (424 lines — the actual execution log).
- `docs/tranches/D/FINAL.md` (229 lines — close report).
- `docs/tranches/D/audit/D-HARDEN-{1..6}-*.md` (the 6 hardening audits, 2054 lines).
- `docs/tranches/D/audit/D-LIB-OPTIMIZATION-SYNTHESIS.md` (119 lines).
- `docs/tranches/D/audit/D-REACTIVITY-{A,B}-*.md` (1030 lines).
- All 24 `docs/tranches/D/audit/D.W*-*.md` execution audits.
- The shipped code itself across `package.json`, `vite.config.ts`, `scripts/proof-resolution-contract.mjs`, `src/units/color/index.ts`, `src/parsing/color.ts`, `src/units/interpolate.ts`, `api/src/{db,repositories,errors,events,middleware,format,validation,routes,services,migrations,cache,models.ts,index.ts}`, `demo/@/components/custom/palette-browser/PaletteDialog/`, `demo/@/composables/{viewSchema.ts, palette/*}`, `demo/@/styles/style.css`, `demo/DESIGN.md`, `e2e/smoke/{views,admin,mobile,webgl-*,walk,reactivity-instant}`, `playwright.config.ts`, `.github/workflows/node.js.yml`, `CHANGELOG.md`, `package.json:version`.

Per-wave cross-walks reconcile **planned sub-gates against actual artefacts**; the architectural-depth pass examines the seven major transpositions on substantive criteria (V8 monomorphism, pipeline shape, colocation idiomaticity, type-level enforcement, sub-object addressing, codemod ergonomics, utility-surface bridge-vs-shim).

## §2 — Per-wave plan-vs-actual cross-walks (W0–W6)

### §2.1 — D.W0 (open + precept advance + state-at-open)

| Sub-gate | Spec | Actual | Verdict |
|---|---|---|---|
| 0 — submodule pin | `docs/precepts` advances `3c32fae → 68d9b20` | `11abd86` lands the advance; current pin is `68d9b20`; submodule HEAD verified | **MET** |
| A — state-at-open probe | vue-tsc 126 / vitest 1409 / smoke 3/3 / 0 console at 1280×800 light | All measurements landed at the documented values in `audit/D.W0-state-at-open.md`; baseline `afdfe77`; pre-flight to publish precepts to upstream recorded | **MET** |
| B — coord/Q.md refresh | 5 rows verified; small reconciliations encoded | 5 rows verified; 2 one-line reconciliations applied (§0 header pin state, §3 aurora citation) | **MET** |

**Wave verdict**: MET. Clean. The pre-flight precept-push was an unanticipated hygiene step; recorded as orchestrator-only and traceable.

### §2.2 — D.W1 (contract-v2 + library barrel + tests + lint + Color flatten)

| Sub-gate | Spec | Actual | Verdict |
|---|---|---|---|
| L1 — `package.json exports["."]` | 3-key `{types, import, default}`; `build:watch` added | Verified at `package.json:21-27`; `build:watch` at `package.json:34` | **MET** |
| L2 — `vite.config.ts` strip | Delete `demoConditions` + `demoServerFsAllow` + every callsite | Both deleted. **However**, a NEW `siblingFsAllowTransient` (line 62, 2 callsites at 108 + 150) was introduced as a narrow consumer-side reciprocal for glass-ui's `./styles` subpath (Tailwind-source); filed at `coordination/Q.md §3` as documented transient. | **PARTIAL** (intentional, documented carve-out under D3 "befitting graceful") |
| L3 — `proof-resolution-contract.mjs` | Port from glass-ui `ce5aad8` | Ported verbatim (366 lines + 2-line attribution); `proof:resolution` script in `package.json:36`; PASS at all gate points | **MET** |
| L4 — precept advance verify | precept doc describes contract-v2 | Verified at `docs/precepts` HEAD `68d9b20`. | **MET** |
| L5 — `coordination/Q.md §9` refresh | Post-W1 fleet status table | Verified | **MET** |
| L6 — library barrel + 4 small fixes | G1-G11 dispositioned + CSSWideKeyword + case-insensitivity + TimingFunction + AnimationOptions rename + optional nameParser | G1+G11/K5 SHIPPED; G2/G7 KEEP-INTERNAL; G3/G4/G6/G8/G9/G10 DEFERRED with named destinations (documented in `audit/D.W1-library-barrel.md`); CSSWideKeyword, istring, TimingFunction, CSSAnimationOptions rename all landed; nameParser dispatch DEFERRED (modest payoff insufficient — reasoned) | **MET** (6 of 11 G-gaps deferred with named destinations is per-spec; the 5 small fixes all landed) |
| L7 — tests + lint + CI | 5 src/-WIP test files + L9 decompose + L9 colorFilter SPSA + lint script + CI step; optional k-means tune | 7 new test files; 167 new tests (1409 → 1576); eslint flat config + lint script + CI step + 6 devDependencies. L13 k-means tune deferred to D.W3 Lane C per bandwidth-gate. | **MET** |
| L8 — Color<T> flatten + 4 hardening primitives + microbench | 15 classes flatten Map → own properties; ColorChannel<T> brand + assertNotNested + recursion-guard.test.ts + clone() depth-16; microbench ≥ 5× | All landed at `059cf72`; 45 channel-getter/setter pairs deleted; bench median **11.06× at commit (range 8.73× to 14.82×)**, re-run at D.W6 **10.09× median (10.02×/10.09×/10.67×)**; 5 recursion-guard tests pass; ColorChannel<T> brand on 45 sites; production bundle has 0 `import.meta.env.DEV` references (DCE-verified); bundle 136.93 kB / 40.15 kB gzip | **EXCEEDED** (microbench 11.06× vs ≥ 5× gate; 5 tests vs spec-3) |

**Wave verdict**: MET overall. L8 is the standout (exceeded gate); L2's `siblingFsAllowTransient` is the documented transient under D3.

### §2.3 — D.W2 (api/ refactor)

| Sub-gate | Spec | Actual | Verdict |
|---|---|---|---|
| Lane C — rails | repositories (9) + errors + events + middleware (inject-services + require-ownership) + zod validation + format + DI via Hono context + transactional boundary for cross-collection writes | 20 NEW files / 1502 LoC; every file ≤ 250; 9 repos; 7 ApiError subclasses; canonical emitAuditEvent; zod 4.4.3; **`client.withTransaction` NOT wired** (audit `D.W2-service-repo.md §8` records this — Lane C's repositories don't expose `MongoClient`, so transactions could not be threaded through) | **PARTIAL** (transaction wrapper missed; F3 fixed by idempotent-upsert + gated $inc instead, which is sufficient given Mongo unique-index atomicity but not what spec said) |
| C-1 — zero `db.collection` in routes/services | `grep -rn 'db\.collection' api/src/routes api/src/services` returns zero | **FAILS the literal spec**: `db.collection` survives in `api/src/routes/sessions.ts` (7 sites) + `api/src/routes/colors.ts` (8 sites). These were not in D.W2's scoped split (D.W2 targeted palettes.ts + admin.ts, the two god modules — both ≤ 250 LoC after split). The D.W6 audit `D.W6-idiomatic-gestalt.md` reframes the gate as **"zero `db.collection` outside repositories in D.W2-scoped code"** and notes the remaining route families are < 250 LoC and unaffected. | **PARTIAL** (the literal spec gate is violated; the reframed gate passes; the post-hoc scoping is honest but creates a "two-speed" backend — see §3.2) |
| C-2 — ≤ 5 `as any` in new rails | Each remaining annotated | 0 in new rails; 11 total in api/src/ (in pre-D.W2 files: `slugWords.ts:95`, `middleware.ts:141`, 4 in `sessions.ts`, 2 in `colors.ts`, plus 3 elsewhere — outside C scope) | **MET** for new rails; pre-existing `as any` left in pre-W2 files |
| C-3 — typed dirs exist | All 7 + named files | All present | **MET** |
| C-4 — DI via c.var.services | Routes read `c.var.services`; no module-level service singletons | Verified | **MET** |
| Lane A — palettes split | 845 LoC → 6 concerns + per-concern services; `routes/palettes/{index,crud,versions,forks,votes,export,slug}` | **5 concerns** (not 6): `routes/palettes/{index,crud,versions,forks,votes,flags}` (6 files, max 117); 7 services. The `export`/`slug` files were not introduced (consolidated into crud or routed elsewhere); a `flags` file appeared instead | **PARTIAL** (concern count differs from plan; substance is fine — file-disjoint topology landed cleanly with carve-outs) |
| Lane B — admin split | 750 LoC → 8 concerns + 8 services | 9 routes + 9 services (audit, batch, colors, flagged, impersonate, palettes, tags, users — 9 entries); 17 audit-emit invocations. Worktree base divergence (Lane B's worktree branched from master not Lane C) required orchestrator file-copy integration — recorded for future-tranche learnings | **EXCEEDED** count (9 vs 8); worktree-divergence is execution noise, not architectural drift |
| Lane D — F1/F2/F3/W2/W3/W4 dispositions + F6/C3/C4 + L4 + CLAUDE.md reconcile | All sites disposition'd per HARDEN-3e; api/CLAUDE.md reconciled to 9 collections | All landed; `assertMigrationsApplied` startup probe; `evaluateSimpleCalc` excised (`grep -rn 'new Function' src/parsing/` returns 0); SIGTERM + SIGINT installed; LRU consolidated; api/CLAUDE.md 81 → 190 LoC | **MET** |

**Wave verdict**: PARTIAL on Lane C (transaction wrapper not wired; C-1 literal-gate violated outside D.W2 scope). Substantively the refactor lands the typed pipeline; the two-speed backend is the structural quirk.

### §2.4 — D.W3 (frontend cohesion)

| Sub-gate | Spec | Actual | Verdict |
|---|---|---|---|
| Lane A — PaletteDialog 12-file split + ImageEyedropper split + ConfigSliderPane adoption + CURRENT_PALETTE_ID | 12 files; shell ≤ ~200 LoC; `PaletteSearchEmpty.vue` extracted; 3 stray admin-triggers deleted | **13 files** in dir (8 components + 5 composables incl. `PaletteAdminTabs.vue` extracted from inline + `useDialogBrowseActions.ts`/`usePaletteExport.ts` extracted post-plan); `PaletteSearchEmpty.vue` never existed in source tree (spec aspirational); shell at **340 LoC** vs aspirational ~200 (template-coordination tier irreducible without antipattern wrapping per `audit/D.W3-palette-dialog.md §6.3`); ImageEyedropper 399 → 4-file split; ConfigSliderPane was already-adopted (no-op verified); CURRENT_PALETTE_ID lifted to `@/lib/palette/constants.ts` (canonical) | **PARTIAL** (12→13 files; shell at 340 vs ~200) — the substantive intent (single-concern shell, no logic god-module) is satisfied; the LoC target is soft (~) |
| Lane D — viewSchema.ts | NEW pure data + types; useViewManager 237 → ~80; usePaneRouter + usePaletteDialogState consume it; 0 inline ViewId enumerations outside | viewSchema.ts NEW 199 (close to spec 199); useViewManager 237 → 79 (-67%); type-level enforcement assertion in usePaletteDialogState (`Exclude<TabValue, "saved"> extends ViewId ? true : never`); all 4 consumer types route through | **MET** |
| Lane B — facade completion: 5 sub-composables + 11 SFC lifts | 5 NEW composables, each ≤ 150 LoC; sub-object exposure (pm.audit/flagged/tags/versions/tagEdit); 2 KEEPs (ColorInput.vue + useCustomColorNames.ts) | 5 sub-composables; all ≤ 150 LoC (max useAdminFlagged at 143); pm.* sub-object addressing; 2 KEEPs preserved; useColorNameQueue moved auth/ → palette/; useAdminOperations.ts barrel deleted | **MET** |
| Lane C — Vue 3.5 codemod (32 SFCs) + useTemplateRef (8) + cssColorToRgb memoise + dead-provide cleanup + L3/L5/L8/L11/L12 | 32 SFCs; final `const props = defineProps<` count ≤ 2 | 32 SFCs codemodded; final count **0** (exceeded gate); 8 useTemplateRef migrations across 7 SFCs; cssColorToRgb 256-entry cap memoised; dead `provide("auroraConfig")` removed; **L3 + L8 memo parity** (parseCSSColor at `src/parsing/color.ts:584`; parseCSSValueUnit at `src/parsing/units.ts:111`); **L5 hueMethod** (3-file: InterpolatedVar extended, normalizeColorUnits writes hueMethod, lerpColorValue dispatches `interpolateHue` for cylindrical hue channel); **L11 arg-order** (`lerp(a,b,t)` canonical; `lerpLegacy` aliased with `@deprecated`); **L12 _lerp bolt-on cleanup LANDED** (not deferred per optional gate) | **EXCEEDED** (32 SFCs → 0 const props, L12 landed instead of deferred) |

**Wave verdict**: MET overall. A-1 shell-size is the only soft miss (340 vs 200 aspirational); the substantive intent stands.

### §2.5 — D.W4 (styling + design-idiom catalog)

| Sub-gate | Spec | Actual | Verdict |
|---|---|---|---|
| Lane A — surface 43 → 0 [var(--…)]; 4 colocations; brittle selectors; 0% pixel-drift (with 3-row exception table) | 43 callsites; ≤ 5 residual gate | **51 callsites → 0** (Lane A audit recounted from the post-D.W3 baseline — 8 more accumulated during D.W3 PaletteDialog split). 5 NEW `@theme` bridges (max-w-desktop-pane, min-w-menu, top-dock-inset, max-w-tooltip, shadow-card-hover); 48 callsites resolved through glass-ui's existing bridges. 4 style.css colocations landed; brittle selectors hardened (`.featured-badge :deep(svg)` → wrapper span; `button:has(> .lucide-x)` → `:has(> .sr-only)`); NEW `--app-padding-x: 1rem` token. **Pixel-diff substituted by byte-isomorphism analysis** (`audit/D.W4-pixel-diff/README.md`) — preserves 120-min cap; documented and recorded as the audit-doc method | **PARTIAL** (callsite count 43→51; pixel-diff method substitution); on substance the surfacing landed |
| Lane B — DESIGN.md catalog 24 → ~150 lines, 10 sections | 10 sections per spec; cross-refs to style.css line ranges + glass-ui DESIGN.md | DESIGN.md 24 → **133 lines** (within ±20 of 150); 10 sections per spec; 12 cross-refs to style.css line ranges; 12 distinct glass-ui DESIGN.md cross-refs all verified at HEAD (zero broken) | **MET** |

**Wave verdict**: MET on substance; the only "deviation" is the upward callsite count (51 vs 43) — the lane resolved more than planned, which is a stronger outcome.

### §2.6 — D.W5 (Playwright coverage 3 → 21 specs)

| Sub-gate | Spec | Actual | Verdict |
|---|---|---|---|
| Lane A — 6 view + walk + 2 WebGL + reactivity-instant; useEffectCensus optional | useEffectCensus dev probe (optional) + hex-input reactivity test | 6 view specs at `e2e/smoke/views/`; walk.spec.ts; webgl-atmosphere + webgl-goo-blob; **reactivity-instant.spec.ts** (spectrum 6.80ms median at commit, 2.50ms at D.W6 re-run; slider 21.70ms at commit, 11.40ms at D.W6; both ≤ 50ms gate). **useEffectCensus DEFERRED** (REACTIVITY-B already verified topology; no leak surfaced — explicit decision recorded in PROGRESS); **hex-input reactivity re-targeted to slider-keyboard** (hex input visibility:hidden at desktop breakpoint — recorded re-target) | **PARTIAL** (useEffectCensus deferred — was optional; hex-input re-targeted — recorded substitution) |
| Lane B — admin specs + admin-mock | 5 admin view specs + admin-walk + addInitScript fixture | All landed; fixtures/admin-auth.ts seeds localStorage BEFORE useAdminAuth lazy-init; `page.route` wildcard for 8 admin endpoint patterns | **MET** |
| Lane C — smoke-mobile Pixel-7 + 3-project config + CI | 3-project partition; CI runs all 3 | page-load-mobile.spec.ts (62 LoC); 3-project config; CI runs all 3; smoke-safari WebKit follow-up filed at `coordination/Q.md §11` per HARDEN-5c | **MET** |

**Wave verdict**: MET overall; the 2 sub-deferrals (useEffectCensus optional, hex-input re-targeted) are recorded substitutions, not silent drops.

### §2.7 — D.W6 (close ceremony)

| Sub-gate | Spec | Actual | Verdict |
|---|---|---|---|
| 7 read-only close-audit lanes | 7 lanes per precept policy | 7 lanes authored (plan-vs-actual, substrate, doc-drift, idiomatic-gestalt, performance, visual-runtime, integrity sweep); each a separate audit doc 67-97 lines (abbreviated content but covers all spec-named items) | **MET** (each lane is short — 67-97 lines — but every checklist item from spec is present) |
| FINAL.md authored | 10 sections; close report | 229 lines; §1-10 covering tranche metadata, scope, invariants, finding disposition, mandate coverage, gate matrix, open deps, cross-tranche debt, successor destinations, authority. Pins B's FINAL.md at `625322e` | **MET** |
| PROGRESS.md reconcile | Every D wave-log row shows `closed` with commit hashes | 7 rows all closed with hashes | **MET** |
| Precept SHA pinned | `68d9b20` | FINAL.md §10 pins; submodule HEAD verified | **MET** |
| Q.md §3 updated | Final state | Updated; 4 standing items recorded | **MET** |
| Root CLAUDE.md updated | Test/spec counts post-D | 1409 → 1582; smoke 3 → 21 across 3 projects; new scripts listed | **MET** |
| demo/CLAUDE.md wholesale reconcile | Post-D state | Reconciled | **MET** |
| api/CLAUDE.md verified | Post-D.W2 reconcile holds | Verified — 9 collections, 27 indexes, pipeline shape, structure block | **MET** |
| K4 Prettier-doc | Add to Conventions OR record as named-destination | Recorded as named-destination (no .prettierrc actively binds the library; routed to a future library-doc tranche) | **MET** |
| smoke-safari WebKit follow-up | Filed at coordination/Q.md §11 | Filed | **MET** |
| `bbnf-equivalence.test.ts` rename | KISS default — rename to `parser-snapshot.test.ts` | Renamed; 128 tests still pass; vitest total 1582 unchanged | **MET** |
| Merge + v0.6.0 ceremony | tranche-b → master --no-ff; tag v0.6.0 | `eae8afc` is the merge; `7ac4ecc` is the close-ceremony commit; package.json:version = 0.6.0; CHANGELOG present | **MET** |
| 10 pre-merge gates | All green | vue-tsc 126 / vitest 1582 / playwright 21/21 / lint 0 / proof:resolution PASS / api tsc clean / npm build clean / L8 microbench 10.09× / recursion-guard 5/5 / reactivity-instant 2.50ms+11.40ms — ALL GREEN | **MET** |

**Wave verdict**: MET. Some audit docs are short (67-97 lines vs `audit/` heavyweight ~200-300 elsewhere); the spec didn't bind a length, so this is acceptable abbreviation.

## §3 — Architectural depth review

### §3.1 — L8 `Color<T>` flatten (D.W1)

**Substance**: 15 color-space classes flattened from `Map<string, T>` to own-property storage. `declare L: ColorChannel<T>` etc. on subclasses; constructor parameters remain plain `T` (the brand erases). The XYZ-hub conversion topology is preserved.

**Gestalt check**:
- ✅ **V8 monomorphic-inline-cache** — every `OKLab<T>` instance shares the same hidden class. Microbench 10.09× median speedup is empirical evidence the cache stays monomorphic across the lerp/mixColors/color2 hot paths. The bench-acceptance gate (≥ 5×) was met-and-then-some.
- ✅ **Public API preserved AND improved** — `color.L` typed access replaces stringly-typed `color.components.get("L")`. The `[key: string]: any` index signature is retained on the base class for back-compat with consumers indexing by component name, but normal call-sites get strong typing.
- ✅ **4 hardening primitives load-bearing, not decorative**:
  - (a) `ColorChannel<T>` TypeScript brand — compile-time refusal of `instance.L = colorInstance`. Zero runtime cost (brand erases).
  - (b) `_assertChannel` DEV-only — production bundle has zero `import.meta.env.DEV` references (DCE-verified by audit-doc grep on `dist/value.js`).
  - (c) `test/recursion-guard.test.ts` — 5 named tests passing (294-frame replay + clone-no-amplify + depth-3 nest + 2 others).
  - (d) `clone()` depth-16 ceiling — single int per clone-call; diagnostic-only.
- ✅ **`Color.clone()` rewrite** — per-channel explicit construction (per REACTIVITY-A §6 Option III); not `new Constructor()` no-args.
- ✅ **isReactive(color) === false** regression test added per RB-2.

**Verdict**: **SOLID** — fully gestalt. The largest-evidence library-perf finding shipped at-spec with all 4 hardening primitives. E builds on this cleanly.

### §3.2 — api/ service + repository (D.W2)

**Substance**: 20 new files / 1502 LoC of rails (`db/collections.ts`, `repositories/*.ts` × 9, `errors/index.ts`, `events/auditLog.ts`, `middleware/{inject-services,require-ownership}.ts`, `validation/*.ts` × 4, `format/palette.ts`). Lanes A + B split the 2 god modules (845 + 750) onto these rails. The pipeline shape `validate → authn → authz → service → repository → format → response` is declared in `api/CLAUDE.md` and exercised by every D.W2-scoped route.

**Gestalt check**:
- ✅ **Repositories are pure-data-access** — verified by reading `repositories/*.ts`. Each owns only collection-keyed CRUD + projection methods. Zero business logic leaked.
- ✅ **Services are thin** — max LoC is `services/palette/crud.ts` at 215 (under 250 cap); typical 50-150 LoC. Business logic concentrated, repository calls explicit.
- ⚠️ **Pipeline shape applied INCONSISTENTLY across the codebase**. D.W2 Lane C-1 gate ("zero `db.collection` in routes/services") is **violated in pre-D.W2 files**:
  - `api/src/routes/sessions.ts` — 7 direct `db.collection(...)` calls.
  - `api/src/routes/colors.ts` — 8 direct `db.collection(...)` calls.
  - `api/src/middleware.ts:153` — direct `db.collection("users")`.
  - `api/src/slugWords.ts:95` — direct `db.collection("users")`.
  - 11 total `as any` casts in api/, all in pre-D.W2 files.
  The post-hoc reframing in `D.W6-idiomatic-gestalt.md` declares these "acceptable — these were not in D.W2 scope (D.W2 split the 2 god modules `palettes.ts` + `admin.ts`; the remaining route families are <250 LoC and unaffected)". This creates a **two-speed backend**: half of api/ runs the typed pipeline; half is raw `db.collection` + `as any`. The literal D.W2-C-1 gate is violated.
- ⚠️ **Transactional boundary NOT wired**. D.W2 Lane C item 10 named `client.withTransaction` as REQUIRED for cross-collection writes (`deleteUser`, `fork`, `vote`). The audit `D.W2-legacy-excision.md §1` records: *"F3's `client.withTransaction` wrapper was not added — Lane C's repositories don't expose the `MongoClient`, and the idempotent-upsert pattern is sufficient (Mongo enforces uniqueness, the `inserted` flag gates `$inc`). Recorded as PASS rather than escalated."* This is a real structural gap — `deleteUser` and `fork` lack the transactional boundary entirely; only vote-toggle is protected by the idempotent-upsert workaround. The PASS-rather-than-escalate framing papers over a known architectural gap.

**Verdict**: **ACCEPTABLE-with-caveats** — the D.W2-scoped surface is gestalt; the un-scoped surface is structurally unchanged. E will face the two-speed backend if it touches sessions.ts or colors.ts. The withTransaction gap is real and routes to a successor api/-hardening pass.

### §3.3 — PaletteDialog 13-file split (D.W3)

**Substance**: 652-LoC god module (401 script + 188 template + 56 style) → colocated `PaletteDialog/` dir with shell PaletteDialog.vue (340 LoC) + 6 component children + 5 composable children + constants.ts. The 9 parallel-wired composables collapsed to a single `pm = inject(PALETTE_MANAGER_KEY)!` consumption.

**Gestalt check**:
- ✅ **Colocation idiomatic** — `PaletteDialog/` is feature-cohesive; nothing in it is consumed outside the dialog (per `audit/D.W3-palette-dialog.md §2.5` grep verification).
- ✅ **9 parallel-wired composables collapsed cleanly** — single `pm = inject(...)` plus a small set of dialog-local composables for state genuinely unique to the dialog (modal stack, overlay guards, export, browse actions). The dialog-local composables (useDialogModalStack, useDialogOverlayGuards, useDialogBrowseActions, usePaletteExport) are not contrivance — they capture genuinely dialog-scoped concerns.
- ✅ **PaletteControlsBar trigger bug fixed correctly** (3 stray admin triggers deleted; not a TabValue drift after all, per HARDEN-4b reframe).
- ⚠️ **Shell at 340 LoC vs aspirational ~200**. The audit `D.W3-palette-dialog.md §6.3` explains: template 172 LoC is the "irreducible coordination tier" — Dialog + Tabs scaffolding + 5 child-component bindings + 3 overlay dialogs. Each child binding is ~20-25 lines of explicit prop + event wiring. Further reduction would require wrapper-of-wrappers (antipattern). Script is 106 LoC (well below 200); style 56. So the 340 reflects the template scaffolding tier specifically. The reduction (47%) is substantial but the literal target was not hit. This is colocation idiomatic, not bolt-on; the LoC target was aspirational.

**Verdict**: **SOLID** — colocation is gestalt, not contrivance. The shell-size delta is template-coordination, not god-module residue. E builds on this cleanly.

### §3.4 — viewSchema.ts extraction (D.W3 Lane D)

**Substance**: NEW `demo/@/composables/viewSchema.ts` (199 LoC) owns ViewId, LeftPane, RightPane, PaneConfig, VIEW_MAP, isViewId predicate — pure data + types, no reactivity. useViewManager 237 → 79 LoC. Type-level enforcement assertion at `PaletteDialog/composables/usePaletteDialogState.ts`: `Exclude<TabValue, "saved"> extends ViewId ? true : never` — catches drift between dialog tabs and the canonical schema.

**Gestalt check**:
- ✅ **4-copy ViewId enumeration eliminated** — useViewManager, usePaneRouter, usePaletteDialogState all import from viewSchema.ts.
- ✅ **Type-level enforcement is load-bearing**, not decorative. The conditional-type assertion catches refactors that drift the dialog tabs from the schema at compile-time (vue-tsc would surface the error). Substantively prevents the original drift class (the bug Lane A's reframe addresses by deletion).
- ✅ **useViewManager runtime-only** — clean separation of schema from runtime state.
- ✅ Chronically-deferred Da §3 item 12 finally closed.

**Verdict**: **SOLID** — clean type-level enforcement; load-bearing. E builds cleanly.

### §3.5 — Facade sub-objects (D.W3 Lane B)

**Substance**: 5 NEW colocated composables (`useAdminAudit`, `useAdminFlagged`, `useAdminTags`, `useVersionHistory`, `useTagEdit` — 536 LoC total, all ≤ 150 LoC). Exposed on usePaletteManager as **sub-objects** (`pm.audit.loadAuditLog()`, etc.), NOT flat methods. 11 SFC consumer migrations; 2 named KEEPs preserved (`ColorInput.vue` + `useCustomColorNames.ts`).

**Gestalt check**:
- ✅ **Sub-object addressing prevents member-bloat** — usePaletteManager was already 50+ members; adding 11 more flat methods would push to 70+. Sub-object structure keeps the top-level shape stable.
- ✅ **11 consumers migrated** (HARDEN-4c corrected count from research's 10) — including the missed VersionHistoryDrawer.vue:110.
- ✅ **2 KEEPs defensible** — ColorInput.vue (single direct endpoint, proposeColorName) + useCustomColorNames.ts (a composable's own concern at boundary).
- ✅ **useColorNameQueue moved auth/ → palette/**; useAdminOperations.ts barrel deleted (was 2-line re-export with one consumer; redundant after the move).
- ✅ Each sub-composable ≤ 150 LoC (max useAdminFlagged at 143); the cohesion + facade-completeness win is the architectural argument, not net-LoC reduction.

**Verdict**: **SOLID** — sub-object addressing is gestalt structural pattern. The 50+ → 55-as-buckets shape is more navigable than 50+ → 70+ flat. E builds cleanly.

### §3.6 — Vue 3.5 codemod (D.W3 Lane C)

**Substance**: 32 SFCs codemodded from `const props = defineProps<T>()` + `props.x` references to `const { x, y = … } = defineProps<T>()` + bare `x`/`y` references. Final `const props = defineProps<` count: **0** (exceeded ≤ 2 gate). 8 useTemplateRef migrations across 7 SFCs. 2 hand-conversion sites (GooBlob.vue + ImageEyedropper.vue + 1 incidental CurrentPaletteEditor.vue) handled with withDefaults + `toRef(() => x)`.

**Gestalt check**:
- ✅ **All 32 SFCs idiomatic** — the destructure form preserves reactivity per Vue 3.5; bare-identifier access reads cleaner than `props.x`.
- ✅ **Hand-conversion sites handled correctly** — `toRef(() => color)` for GooBlob/ImageEyedropper preserves the watch/composable consumption pattern without `toRef(props, "color")` (which destructured-reactive-form would break).
- ✅ **useTemplateRef migrations** to the Vue 3.5 idiom.
- ✅ Folded-in library-perf wins: L3 + L8 memo parity, L5 hueMethod 3-file fix, L11 arg-order canonicalisation, L12 _lerp bolt-on cleanup all landed in the same commit. The L12 was optional — it landed (not deferred), which is the cleaner outcome.

**Verdict**: **SOLID** — the codemod is idiomatic; no new awkwardness was introduced. The 32 SFCs read more naturally post-codemod. E builds cleanly.

### §3.7 — Tailwind utility surfacing (D.W4 Lane A)

**Substance**: 51 `[var(--…)]` callsites → 0. 5 NEW `@theme` bridge declarations in style.css (`max-w-desktop-pane`, `min-w-menu`, `top-dock-inset`, `max-w-tooltip`, `shadow-card-hover`); 48 callsites resolved through glass-ui's existing bridges. 4 style.css blocks colocated. Brittle selectors hardened (`.featured-badge :deep(svg)` → wrapper span; `button:has(> .lucide-x)` → `:has(> .sr-only)`). NEW `--app-padding-x: 1rem` token breaks the silent `.app-layout` padding ↔ `.pane-container` max-width coupling.

**Gestalt check**:
- ✅ **5 new @theme bridges idiomatic, not shims** — each follows the Tailwind v4 `@theme` mapping pattern. Writing `max-w-desktop-pane` is equivalent to `max-w-[var(--desktop-pane-max-w)]`; the rendered output is byte-identical. The bridges are first-class utilities, not workarounds.
- ✅ **48 callsites resolved through glass-ui's existing bridges** — no parallel-define; the demo consumes the canonical surface.
- ✅ **4 style.css colocations** — `.palette-card-grid` (scoped to PaletteCardGrid.vue), `.palette-tab-content` (unscoped in PaletteDialog.vue, joins existing dialog backdrop block), `.touch-gate-*` (unscoped in ComponentSliders.vue), `.pane-scroll-fade` (unscoped in PaneHeader.vue). Cascade order preserved within each block.
- ⚠️ **Pixel-diff substituted by byte-isomorphism analysis** (per `audit/D.W4-pixel-diff/README.md`). The spec's stated method was Playwright visual probe at 3 viewports light+dark with 0% pixel-drift gate; the audit substituted "byte-isomorphism" reasoning to preserve the 120-min cap. This is a method-of-verification deviation, not a substance deviation — the byte-isomorphism analysis is a reasoned argument (the utilities compile to the same `var(--…)` reference). But it's not the empirical pixel-diff the spec stipulated.

**Verdict**: **SOLID** on substance; the verification-method deviation is recorded transparently. The 5 new @theme bridges are idiomatic. E builds cleanly.

### §3.8 — Tests / Playwright (D.W5)

**Substance**: 3 → 21 specs across `smoke`/`smoke-admin`/`smoke-mobile` projects. **reactivity-instant.spec.ts** (MERGE-GATE-BLOCKING) measures wall-clock spectrum-drag → docs-pane update (median 6.80ms at commit / 2.50ms at D.W6 re-run; gate ≤ 50ms) and slider-keyboard → component-readout (median 21.70ms / 11.40ms). Admin fixture via `addInitScript` localStorage seeding + `page.route` wildcard for 8 admin endpoint patterns (the categorical OPPOSITE of the killed W5-C login-flow mocking).

**Gestalt check**:
- ✅ **Role/label-only selectors** throughout (per the binding invariant).
- ✅ **Admin fixture pattern correct** — addInitScript seeds BEFORE useAdminAuth lazy-init; page.route wildcard returns shape-correct empty envelopes.
- ✅ **reactivity-instant.spec.ts is wall-clock evidence**, not topology argument. The user directive "proper, instant reactivity" now has empirical proof.
- ✅ **3-project partition** clean (smoke / smoke-admin / smoke-mobile); CI runs all 3.
- ⚠️ **Pixel-7 in Playwright is Chromium, not WebKit** — iOS-Safari engine bugs uncaught. The smoke-safari WebKit follow-up filed at `coordination/Q.md §11` is the named-routed destination. This is a known coverage gap, not a regression.

**Verdict**: **SOLID** on substance; the WebKit gap is a transparently-named-routed deferral.

## §4 — "NO legacy code" survey

| Item | Status | Disposition |
|---|---|---|
| `lerpLegacy` aliased export | ALIVE — `src/math.ts:37` + `src/index.ts:220` + `demo/CLAUDE.md:145` | **Legitimate one-tranche transition support** per D.W3 Lane C L11. `@deprecated` JSDoc. Demo docs the migration. Should retire in a follow-up tranche (E or later) after consumers migrate. NOT silent legacy. |
| `bbnf-equivalence.test.ts` → `parser-snapshot.test.ts` rename | DONE — old file absent; new file present; 128 tests pass under new name | **MET** — KISS-default rename per D.W6 doc-drift |
| `_old` / `legacy` / `deprecated` markers | 4 hits in src/: lerpLegacy (legitimate transition); `animation-shorthand.ts:281` (code comment about "legacy"); `css-color.bbnf:118` (`deprecatedSystemColor` CSS spec category, not code legacy) | **Clean** — no lingering legacy code |
| `migrate-oklab.ts` / `migrate-slugs.ts` | DELETED — corpus-grep clean (per `D.W2-legacy-excision.md §3`) | **MET** |
| `api/dist/` | Never tracked (`.gitignore:11`); local cleanup performed | **MET** (HARDEN-3f correction stuck) |
| Dead `provide("auroraConfig")` | REMOVED from App.vue | **MET** |
| `useAdminOperations` barrel | DELETED (was 2-line re-export with one consumer) | **MET** |

**Summary**: One legitimate transition item (`lerpLegacy`) which is explicitly documented and time-boxed. Otherwise clean.

## §5 — Bolt-on / band-aid catalog

| Item | Spec / Audit framing | Reality | E recommendation |
|---|---|---|---|
| `(iv as any)._lerp` bolt-on (L12) | Cleanup OPTIONAL per spec | **LANDED** — `_lerp` declared on `InterpolatedVar<T>`; `prepareInterpVar` writes the property directly; `lerpValue` reads without `(iv as any)` cast (per `audit/D.W3-codemod.md` and `src/units/interpolate.ts:107,134`) | **Clean** — E should leave it alone |
| `client.withTransaction` not wired | Spec stipulated for `deleteUser`, `fork`, `vote` | Only F3 vote-toggle gets protection (via idempotent upsert + gated `$inc`); `deleteUser` and `fork` lack the transactional boundary entirely. Audit records "PASS rather than escalated" per `D.W2-legacy-excision.md §8` | **STRUCTURAL GAP** — E should address if it touches admin user-delete or palette-fork; route to api/-hardening successor otherwise |
| `siblingFsAllowTransient` in vite.config.ts | Spec called for full strip of `demoServerFsAllow` | Replaced with narrow `siblingFsAllowTransient` (lines 62, 108, 150) — consumer-side reciprocal for glass-ui's `./styles` subpath shipping Tailwind-source CSS; documented as transient under D3 "befitting graceful"; filed at `coordination/Q.md §3` | **Acceptable transient** — retires when glass-ui ships a contract-v2-compliant Tailwind-source distribution. E should leave it. |
| 5 new @theme bridges | Spec implied catalog expansion would mostly resolve through glass-ui | 5 new bridges are needed; 48 of 51 callsites resolve through glass-ui; the 3 new categories (desktop-pane width, menu min-w, dock-inset top, tooltip max-w, card-hover shadow) are first-class utilities, not shims. Each is a Tailwind v4 `@theme` mapping declaring a semantic alias for an existing CSS var. | **Idiomatic, not workaround** — E should leave them |
| `routes/sessions.ts` + `routes/colors.ts` + `middleware.ts` + `slugWords.ts` still using raw `db.collection` | D.W2 C-1 literal gate said ZERO | D.W6 idiomatic-gestalt audit reframes gate as "zero outside D.W2 scope" | **Structural inconsistency** — the api/ runs at two speeds (typed pipeline for palettes/admin, raw mongo for sessions/colors). E should address if touching sessions/colors; route to api/-hardening successor otherwise |
| 11 `as any` in pre-D.W2 api files | D.W2 C-2 capped new rails at ≤ 5 | New rails: 0 as any. Pre-D.W2 files: 11 (sessions.ts, colors.ts, middleware.ts, slugWords.ts). | Same as above — covers the two-speed backend symptom; E should not introduce new `as any` |
| PaletteDialog shell at 340 LoC vs ~200 aspirational | A-1 aspirational gate | Template 172 LoC is the irreducible coordination tier; substantive intent (single-concern shell, no logic god-module) is satisfied | **Acceptable** — further reduction would be antipattern wrapping. E should leave alone. |
| useEffectCensus deferred | Optional per spec | Deferred (REACTIVITY-B verified topology; no leak surfaced) | Acceptable explicit deferral |
| Hex-input reactivity re-targeted to slider-keyboard | Spec: hex-input → preview path | Re-targeted because hex input is visibility:hidden at desktop breakpoint | Acceptable substitution; recorded in PROGRESS |
| Pixel-diff substituted by byte-isomorphism | D.W4 spec said Playwright pixel-diff | Byte-isomorphism analysis (`audit/D.W4-pixel-diff/README.md`) preserves the 120-min cap | **Verification-method deviation** (not substance); recorded transparently. E should re-run pixel-diff if it modifies any of the 51 callsite migrations |

## §6 — Deviation inventory

Full inventory of recorded + discovered deviations.

| # | Wave | Deviation | Spec said | Reality | Source |
|---|---|---|---|---|---|
| 1 | D.W1 L2 | `siblingFsAllowTransient` retained | Delete `demoServerFsAllow` entirely | Narrow consumer-side reciprocal kept (vite.config.ts:62/108/150); documented at coord/Q.md §3 | `audit/D.W1-contract-v2.md`; `vite.config.ts` |
| 2 | D.W1 L6 | 6 of 11 G-gaps deferred | All G1-G11 dispositioned | G1+G11/K5 SHIPPED; G2/G7 KEEP-INTERNAL; G3/G4/G6/G8/G9/G10 DEFERRED with named destinations | `audit/D.W1-library-barrel.md`; FINAL §4 row Da-1 |
| 3 | D.W1 L7 | L13 k-means tune deferred | Optional, benchmark-gated | Deferred to D.W3 Lane C per bandwidth-gate (then not landed) | PROGRESS |
| 4 | D.W1 L8 | Microbench exceeded | ≥ 5× | 11.06× at commit; 10.09× at D.W6 re-run | PROGRESS; FINAL §6 row 8 |
| 5 | D.W2 Lane A | Palettes concern count 5 not 6 | 6 concerns (`{index,crud,versions,forks,votes,export,slug}`) | 5 + flags = 6 files but different shape: `{index,crud,versions,forks,votes,flags}` | `api/src/routes/palettes/` |
| 6 | D.W2 Lane B | Worktree-base divergence | Worktree off Lane C | Worktree off master; orchestrator file-copy integration | PROGRESS; FINAL §2 D.W2 Lane B |
| 7 | D.W2 Lane C | `client.withTransaction` not wired | Required for cross-collection writes | F3 vote-toggle protected by idempotent-upsert + gated $inc; deleteUser/fork unprotected | `audit/D.W2-legacy-excision.md §8`; `services/palette/votes.ts` |
| 8 | D.W2 Lane C-1 | `db.collection` literal-gate violated | Zero in `routes/services` | 7 in `routes/sessions.ts` + 8 in `routes/colors.ts` + 2 in `middleware.ts`/`slugWords.ts` (pre-D.W2 files; reframed gate at D.W6) | `D.W6-idiomatic-gestalt.md`; current grep |
| 9 | D.W3 Lane A | Shell 340 vs ~200 | Outer shell ≤ ~200 | Shell PaletteDialog.vue at 340 LoC; template 172 irreducible | `audit/D.W3-palette-dialog.md §6.3` |
| 10 | D.W3 Lane A | 12 → 13 files | 12-file split | 13 files in PaletteDialog/ dir (PaletteAdminTabs extracted; useDialogBrowseActions/usePaletteExport added) | `audit/D.W3-palette-dialog.md §6.1` |
| 11 | D.W3 Lane A | PaletteSearchEmpty never existed | Move to PaletteDialog/components/ | File doesn't exist in source tree (spec aspirational) | `audit/D.W3-palette-dialog.md §2.4` |
| 12 | D.W3 Lane A | ConfigSliderPane was already adopted | Migrate onto glass-ui ./configurator | Already adopts ConfiguratorRow (verified); no-op | `audit/D.W3-palette-dialog.md §5` |
| 13 | D.W3 Lane B | Facade consumers 11 not 10 | 10 consumers | 11 (HARDEN-4c added VersionHistoryDrawer.vue:110) | findings.md |
| 14 | D.W3 Lane C | Codemod 32 SFCs not 38 | 38/40 SFCs | 32 (HARDEN-4d recount) | findings.md |
| 15 | D.W3 Lane C | L12 LANDED not deferred | Optional | LANDED at `cea5e3f` | PROGRESS |
| 16 | D.W4 Lane A | 51 callsites not 43 | ~43 token reaches | 51 (8 more accumulated during D.W3) | `audit/D.W4-utility-surfacing.md §1.1` |
| 17 | D.W4 Lane A | Pixel-diff substituted | Playwright visual probe 3 viewports light+dark 0% drift | Byte-isomorphism analysis; preserves 120-min cap | `audit/D.W4-pixel-diff/README.md` |
| 18 | D.W4 | Lanes A+B combined commit | 2 commits per plan | 1 combined commit `5674d1f` (file-disjoint, byte-isomorphic) | PROGRESS |
| 19 | D.W5 Lane A | useEffectCensus deferred | Optional dev probe | Deferred (REACTIVITY-B already verified topology; no leak surfaced) | PROGRESS |
| 20 | D.W5 Lane A | Hex-input re-targeted | Hex-input → preview path test | Re-targeted to slider-keyboard (hex input visibility:hidden at desktop breakpoint) | PROGRESS |
| 21 | D.W5 Lane C | smoke-safari follow-up filed | Spec stipulated this be filed | Filed at coord/Q.md §11 | PROGRESS; FINAL §7 |
| 22 | D.W6 | Close-audit lanes abbreviated | 7 lanes per precept policy | Each lane 67-97 lines (abbreviated content; covers all spec-named items) | `audit/D.W6-*.md` |
| 23 | D.W6 | K4 Prettier filed as named-destination | Add to CLAUDE.md OR file | Filed (no .prettierrc actively binds the library) | `audit/D.W6-doc-drift.md §K4` |
| 24 | D.W6 | bbnf-equivalence rename | KISS-default rename | DONE — `parser-snapshot.test.ts` is the new name | `test/parser-snapshot.test.ts` |

**Total deviations identified**: **24** (10 PARTIAL/MISSED across the 7 waves; 14 substitutions/recorded shifts; 0 silent drops).

## §7 — D's structural soundness verdict

Per-substrate assessment for E:

| Substrate | Verdict | Rationale |
|---|---|---|
| **L8 Color<T> flatten** | **SOLID** | V8 monomorphic; 4 hardening primitives load-bearing; microbench 10.09× exceeds 5× gate; public API improved (typed `.L` access). E builds on this cleanly. |
| **api/ service+repository pipeline (D.W2-scoped)** | **ACCEPTABLE** | Repositories pure-data-access; services thin; pipeline shape clean for palettes + admin. **BUT** the un-scoped surface (sessions, colors, middleware, slugWords) is structurally unchanged — two-speed backend. The `client.withTransaction` gap is real. E should not extend this surface without addressing. |
| **PaletteDialog 13-file split** | **SOLID** | Colocation idiomatic; 9 parallel-wired composables → single `pm = inject(...)`; PaletteControlsBar trigger bug fixed correctly. Shell at 340 LoC reflects the irreducible template-coordination tier, not god-module residue. E builds cleanly. |
| **viewSchema extraction** | **SOLID** | Type-level enforcement load-bearing (catches drift at compile-time); 4-copy enumeration eliminated; chronically-deferred Da §3 item 12 finally closed. E builds cleanly. |
| **Facade sub-objects** | **SOLID** | Sub-object addressing keeps usePaletteManager navigable (50+ → 50+ as buckets); 11 consumer migrations; 2 KEEPs defensible; idiomatic. E builds cleanly. |
| **Vue 3.5 codemod (32 SFCs)** | **SOLID** | 0 `const props = defineProps<` post-codemod (exceeded gate); hand-conversion sites idiomatic; 8 useTemplateRef migrations. E builds cleanly. |
| **Tailwind utility surface (5 @theme bridges)** | **SOLID** | Bridges are first-class utilities, not shims; 48 of 51 callsites consume glass-ui's existing surface; 4 colocations clean. Verification-method deviation (byte-isomorphism vs pixel-diff) recorded transparently. E builds cleanly; should re-run pixel-diff if it modifies any of the 51 sites. |
| **Tests (Playwright 21 specs + reactivity-instant)** | **SOLID** | Role/label-only; admin-fixture pattern correct; wall-clock evidence for "instant reactivity" mandate. WebKit gap routed to named successor. E builds cleanly. |

**SOLID count: 6 (L8, PaletteDialog, viewSchema, facade, codemod, tests).**
**ACCEPTABLE count: 2 (api/-D.W2-scoped, utility-surface — the latter only on verification-method, substance is solid).**
**FRAGILE count: 0.**

D's structural soundness verdict: **STRONG**. The single architectural debt is the **two-speed backend** (sessions.ts + colors.ts unchanged) and the un-wired `client.withTransaction`. Both are named-routable; neither blocks E unless E touches that surface.

## §8 — Recommendations for E

### LEAVE ALONE (D's substrate is gestalt; building on it is safe)

- **`src/units/color/index.ts`** — L8 flatten is gestalt; the 4 hardening primitives are load-bearing. Adding new color spaces should follow the same `declare X: ColorChannel<T>` pattern and call `Color._assertChannel` in setters.
- **`src/parsing/color.ts`** — `evaluateRelativeCalc` excision of `new Function` is clean (D6 invariant). Lazy-init closure is structural, not a band-aid.
- **`src/units/interpolate.ts`** — L5 hueMethod + L11 arg-order + L12 _lerp cleanup all landed cleanly.
- **`demo/@/components/custom/palette-browser/PaletteDialog/`** — 13-file split is colocation idiomatic; don't re-flatten.
- **`demo/@/composables/viewSchema.ts`** + the type-level assertion in usePaletteDialogState — load-bearing; new views should add to viewSchema.ts canonically.
- **`demo/@/composables/palette/use{AdminAudit,AdminFlagged,AdminTags,VersionHistory,TagEdit}.ts`** — sub-object facade is gestalt.
- **The 5 @theme bridges** in `demo/@/styles/style.css` — first-class utilities; consume them, don't introduce parallel `[var(--…)]` arbitrary-bracket reaches.
- **The 21 Playwright smoke specs** + `reactivity-instant.spec.ts` — role/label-only; the merge-blocking reactivity-instant gate should remain.

### DEEPEN (D's substrate is OK; architectural transposition would benefit)

- **api/ pipeline parity** — if E touches `routes/sessions.ts` or `routes/colors.ts`, deepen the typed-pipeline coverage to retire the two-speed backend. Concretely: introduce `services/session/` + `services/color/`, route through `repositories/{session,proposedName,tag,user}.ts` (already exist), strip the 15 raw `db.collection` calls + 6 `as any` casts. ~500-700 LoC of refactor.
- **`client.withTransaction` for cross-collection writes** — if E touches admin user-delete or palette-fork, structurally wire the transaction wrapper. Either expose `MongoClient` on the repository surface, or thread an explicit `WithTransactionCallback` through the service layer. The audit `D.W2-legacy-excision.md §8` records this as the known gap; E is the natural place if any cross-collection write is in scope.
- **`siblingFsAllowTransient` retirement** — when glass-ui ships a contract-v2-compliant Tailwind-source distribution (or value.js stops consuming `@mkbabb/glass-ui/styles` directly), retire the transient. Tracked at coord/Q.md §3.
- **`lerpLegacy` retirement** — if any internal consumer still uses `lerp(t, a, b)` ordering, finish the migration and delete the alias. The 1-tranche transition support has run its course.

### REPLACE (D's substrate suggests a deeper transposition)

- **None directly.** D's substrate is structurally sound. The only "replace" candidate would be the un-typed `routes/sessions.ts` + `routes/colors.ts` — but those should be DEEPENED (extend the existing pipeline), not REPLACED (which would imply a different architecture).
- If E identifies a deeper api/-side concern (e.g. event-sourcing, command/query split, etc.) that's a green-field decision, not a D-substrate-replacement.

## §9 — Authority

Sources read (read-only):

**Plan / scope docs**:
- `docs/tranches/D/D.md`
- `docs/tranches/D/waves/D.W{0..6}.md` (7 wave specs)
- `docs/tranches/D/findings.md`
- `docs/tranches/D/FINAL.md`
- `docs/tranches/D/PROGRESS.md`

**Hardening + library/reactivity audits**:
- `docs/tranches/D/audit/D-HARDEN-{1..6}-*.md`
- `docs/tranches/D/audit/D-LIB-OPTIMIZATION-SYNTHESIS.md`
- `docs/tranches/D/audit/D-REACTIVITY-{A,B}-*.md`

**Per-wave execution audits**:
- `docs/tranches/D/audit/D.W{0..6}-*.md` (24 docs)

**Shipped code spot-checked**:
- `package.json`
- `vite.config.ts`
- `scripts/proof-resolution-contract.mjs` (existence + role; full content not re-read)
- `src/units/color/index.ts` (L8 flatten + ColorChannel + assertChannel + clone depth-16)
- `src/units/color/CLAUDE.md`
- `src/units/CLAUDE.md`
- `src/parsing/color.ts` (D6-violation excision, line 78 region)
- `src/parsing/math.ts` (calc AST evaluator surface)
- `src/units/interpolate.ts` (L5 hueMethod, L12 _lerp)
- `src/units/index.ts` (_lerp declared on InterpolatedVar)
- `src/index.ts` (barrel; lerpLegacy export)
- `src/math.ts` (lerpLegacy + JSDoc)
- `api/CLAUDE.md`
- `api/src/{db,repositories,errors,events,middleware,format,validation,routes,services,migrations,cache,models.ts,index.ts}` (full LoC inventory + grep audits)
- `api/src/services/palette/votes.ts` (F3 fix verification)
- `api/src/routes/sessions.ts` + `api/src/routes/colors.ts` (two-speed backend evidence)
- `demo/@/components/custom/palette-browser/PaletteDialog/` (13-file split + LoC verification)
- `demo/@/composables/palette/use{AdminAudit,AdminFlagged,AdminTags,VersionHistory,TagEdit}.ts` (5 sub-composables LoC verification)
- `demo/@/composables/viewSchema.ts` (existence + 201 LoC)
- `test/` (file listing; bbnf-equivalence → parser-snapshot rename verified)
- `git log --oneline tranche-e -25` (the 25 commits since D open, all human-attributed per integrity-sweep)

**Total deviations identified: 24** (across 7 waves; categorized PARTIAL/MISSED/SUBSTITUTION).
**Per-substrate verdict count: 6 SOLID / 2 ACCEPTABLE / 0 FRAGILE.**

---

**E-AUDIT-3 closes.** D's execution review is complete. D's substrate is STRONG; the single architectural debt is the two-speed api/ backend (sessions.ts + colors.ts + `withTransaction` gap). E should LEAVE ALONE 8 of D's transpositions, DEEPEN 4 (api/ pipeline parity, withTransaction wiring, siblingFsAllowTransient retirement, lerpLegacy retirement), REPLACE 0.
