# D-HARDEN-1 — Wave structure audit

**Agent**: D-HARDEN-1 (read-only, ~30 min cap).
**Substrate**: `docs/tranches/D/D.md` §3 + `docs/tranches/D/waves/D.W0..D.W6.md` (7 wave specs) at commit `33cf235`.
**Comparator**: `docs/tranches/B/B.md` §3 (5-wave hardened shape, collapsed 6 → 5 by folding the standalone layout wave into B.W1).
**Mode**: planning-only audit; no edits except this doc.

---

## §1 — Per-wave verdict

### D.W0 — open + precept advance + coord refresh — VERDICT: right-sized (load-bearing)

Cited: `D.W0.md:1-71`. Three lanes: Lane 0 (precept submodule advance `3c32fae → 68d9b20`, orchestrator-owned), Lane A (B-residual probe + `audit/D.W0-state-at-open.md` baseline), Lane B (`coordination/Q.md` refresh — 5 row reconciliations).

**Right-sized.** This mirrors B.W0 exactly (compare `B.W0.md:1-22` — same Lane 0 precept advance ahead of any structural work; same state-at-open baseline). The cross-repo `coordination/Q.md` refresh is non-trivial — 5 distinct rows (`§3` metaballs from 5→7 surface; `§3` aurora algorithm sketch; `§3` BlobDot count 11→16; `§6` precept SHA post-advance; `§9` keyframes.js framing). The B-residual probe records the gate baseline `126/1409/3 smoke` that D.W6's close audit later references. This is **not orchestrator preamble** — it carries 3 sub-gates and an artefact (`audit/D.W0-state-at-open.md`).

The temptation to fold into D.W1: rejected. The precept advance at Lane 0 is *foundational for D.W1's L4* (the contract-v2 alignment verifies the precept content describes contract-v2 — needs the bump landed first). Folding would entangle the precept-submodule commit with the `package.json` / `vite.config.ts` mutations and violate B.W0's "clean bump, no working-tree entanglement" principle (`B.W0.md:20`).

### D.W1 — contract-v2 alignment — VERDICT: right-sized but candidate for W0 merge if scope shrinks further

Cited: `D.W1.md:1-72`. 5 sequential lanes (L1 `package.json exports` + `build:watch`; L2 `vite.config.ts` strip `demoConditions`+`demoServerFsAllow`; L3 port `proof-resolution-contract.mjs`; L4 precepts verify-only; L5 `coordination/Q.md §9` refresh).

**Right-sized but lean.** Single wave, single commit, orchestrator-owned. L4 is verify-only (no edits — the bump landed at D.W0 Lane 0); L5 is a doc touch already partly done at D.W0 Lane B. The substantive work is L1+L2+L3 — three small surgical edits with one new ~80-line script port.

**The temptation to merge into D.W0** is real and worth considering: D.W0 already touches the precept submodule and `coordination/Q.md §9`; D.W1's L4+L5 are continuations of that. **But L1–L3 are genuinely code-mutating** (touching `package.json` and `vite.config.ts` — the consumer-runtime config), and the wave gate (`D.W1.md:58`) explicitly requires a fresh Playwright boot probe to verify the demo still resolves `@mkbabb/glass-ui` via the published surface after the `development` condition is dropped. **Keep separate.** Merging would let a config-edit failure poison D.W0's clean state-at-open commit; the gate isolation is worth one extra wave boundary.

Recommend: keep D.W1 separate. Tighten the wave-spec by collapsing L4 (verify-only) and L5 (doc-only) into one verification step in the L3 gate text; no need for 5 numbered lanes when L1+L2+L3 carry all the mutation.

### D.W2 — backend api/ god-module splits + service/repo + zod + fail-explicit — VERDICT: right-sized (heaviest wave, correctly bounded)

Cited: `D.W2.md:1-88`. 4 lanes: A (`palettes.ts` 845→split, 6 concerns), B (`admin.ts` 750→split, 8 concerns), C (service/repository layer + zod pipeline), D (legacy excision: 6 silent fallbacks + `api/dist/` + migrate-scripts + `api/CLAUDE.md` reconcile).

**Right-sized.** This is the heaviest wave by design — the user's D-opening directive (`D-PROMPTS.md §1`) names backend refactor as a major clause; `findings.md §2` maps 9 Db-* findings here (Db-1 through Db-9). The 4-lane split is well-bounded:

- **Lane A vs Lane B — keep split** (do NOT merge). Yes, they share the split pattern, but:
  1. They share the `api/src/routes/` namespace — Lane A creates `routes/palettes/**`, Lane B creates `routes/admin/**`. Worktree isolation is named explicitly (`D.W2.md:4`). Two parallel agents in two worktrees = clean.
  2. Different concern counts (6 vs 8) and different domain semantics (CRUD/versions/forks/votes/export/slug for palettes; admin-specific surface incl. `admin-audit`'s W3 silent-catch site for admin).
  3. Merging them would yield a single ≥14-concern lane — one agent's scope explodes to ~1,600 LoC of route-handler surgery. The split pattern justifies parallel execution.

- **Lane C (service/repository + zod)** is correctly file-disjoint from A/B per the spec ("`api/src/db/`, `api/src/repositories/**`, `api/src/validation/**`"). Sequenced after A/B land their splits — this is correct: Lane C verifies "every route handler calls a service + repository" (`D.W2.md:41` sub-gate), which requires Lane A/B's services to exist first.

- **Lane D (legacy excision + doc reconcile)** — file-disjoint from A/B/C per spec (`D.W2.md:67`); the 6 fail-explicit sites land *in* the per-service / per-repository files that Lanes A/B/C create, so D sequences after them. The `api/dist/` retire + migrate-script delete + `api/CLAUDE.md` reconcile are independent and could run in parallel with C, but the spec correctly sequences C → D for gate clarity.

**Worktree isolation needed**: explicitly named for A/B (correct). C/D do not need worktrees (they touch disjoint paths post-A/B). The current scoping is right.

### D.W3 — frontend cohesion: PaletteDialog split + facade + codemod — VERDICT: codemod lane is borderline; keep but consider sequencing

Cited: `D.W3.md:1-74`. 3 lanes: A (`PaletteDialog.vue` 652→colocated dir + `PALETTE_MANAGER_KEY` migration + `TabValue` reconcile), B (palette-manager facade completion — 10 `@lib/palette/api` lifts), C (Vue 3.5 codemod — reactive-props destructure on 38 SFCs + `useTemplateRef` on 8 sites + dead `provide("auroraConfig")` removal).

**Lane A + Lane B — cohesive**. Both are architectural — A consolidates `PaletteDialog`'s parallel wiring through the facade; B completes that same facade by lifting 10 direct `@lib/palette/api` imports. They share the `usePaletteManager` / `PALETTE_MANAGER_KEY` surface. A is the dir-split + `PALETTE_MANAGER_KEY` consumer migration; B extends the facade across the other 10 component-side consumers. Logical pairing.

**Lane C — codemod — borderline**. The 38-SFC reactive-props destructure is a **mechanical sweep** across the entire `demo/@/components/custom/**` tree; the 8 `useTemplateRef` migrations and the 1 dead-provide removal are similarly mechanical. It's a different shape of work from A/B (which are architectural transpositions inside one feature area). The codemod can run with substantial concurrency against A/B per the spec's "file-disjoint enough to run in parallel" claim.

**But**: the codemod touches `PaletteDialog.vue` (which Lane A is splitting) and the 10 facade-lift consumer SFCs that Lane B is editing. The spec says "file-disjoint enough to run in parallel after Lane A lands the dir-split" — which means C must wait for A. Once A lands, C can run alongside B (different SFCs).

**Verdict: keep as Lane C, not a separate wave.** The codemod is mechanical, has a clean per-SFC sub-gate, and shares the W3 gate (the 3-viewport-light Playwright probe walking palette views catches both architectural breakage AND codemod regressions). Splitting it into its own wave would inflate the count for what is a 1-day mechanical sweep with one gate (`D.W3.md:58`).

The borderline argument *against* keeping it: codemods historically have surprise blast radii in Vue 3.5 reactive-props (destructure-default semantics differ from `props.x ?? default`). If this surfaces, the codemod merits its own wave. **Recommendation: keep in W3 with an explicit sequencing note — "Lane C runs after Lane A lands; concurrent with Lane B."** The spec already says this (`D.W3.md:4`); flag it more loudly in the wave gate.

### D.W4 — styling + design-idiom catalog — VERDICT: right-sized

Cited: `D.W4.md:1-67`. 2 lanes: A (43 token-reach surfacing + 4 style.css colocations + brittle-selector fixes + minor drift), B (`demo/DESIGN.md` catalog expansion to ~150 lines).

**Right-sized.** This is the smallest wave by lane count (matching B's smallest waves at 2 lanes — see `B.W2.md` and `B.W3.md`). Lane A is mechanical-but-careful (token surfacing must be perfectly isomorphic per the D-opening directive); Lane B is pure docs. They are disjoint and run in parallel. The Playwright visual probe at 3 viewports light+dark (with pixel-diff against the W3 baseline) is the right gate for a styling-touching wave (B4 invariant: layout/styling waves run the full probe, not the single-viewport).

No merge candidate. The design-idiom catalog is a substantial 10-section narrative doc (`D.W4.md:31-39`) — not a one-paragraph addition.

### D.W5 — Playwright 3 → ~20 specs — VERDICT: right-sized, but watch for inflation risk

Cited: `D.W5.md:1-79`. 3 lanes: A (7 user-view specs + walk + WebGL = ~9 new specs), B (5 admin-view specs + admin-walk + admin-mock fixture = ~6+ new specs), C (`smoke-mobile` Pixel-7 single spec + `playwright.config.ts` projects + CI).

**Right-sized.** The 3 lanes are file-disjoint (different `e2e/smoke/` subdirs); the count goes from 3 specs to ~20 in one wave, but each spec is small (25–55 lines per the wave's per-spec budget — `D.W5.md:7`). The aggregate ~600 lines vs the abrogated B-pre suite's 3,510 lines is a deliberate compression. The "category" pattern of user/admin/mobile = 3 distinct Playwright projects justifies 3 lanes.

**Could this be 1 lane?** Considered. No — the admin-mock fixture (Lane B's `addInitScript` localStorage seed) is a categorical apparatus shift from the user-view specs (Lane A). The killed W5-C in tranche A is named explicitly as the cautionary tale (`D.W5.md:33` — "the categorical opposite of the killed W5-C login-flow mocking"). The fixture work and the spec work have different debugging profiles; mixing them in one lane invites the same hang failure mode. Lane C's CI + `playwright.config.ts` integration also has a distinct sub-gate (≤60s CI runtime). Keep 3 lanes.

### D.W6 — HEADLINE close — VERDICT: right-sized; precept policy

Cited: `D.W6.md:1-59`. 7 read-only close-audit lanes (plan-vs-actual, substrate-without-consumer, doc-drift, idiomatic-gestalt, performance, visual-runtime, integrity sweep) + close ceremony (`FINAL.md`, `PROGRESS.md` reconcile, precept-SHA pin, `coordination/Q.md §3` final state, root + `demo/` + `api/` `CLAUDE.md` reconciles).

**Right-sized — precept policy.** The 7-lane close audit is exactly B.W4's shape (compare `B.W4.md` — same 7 lanes; same close-honesty checklist). The B precedent is that this structure was kept intact through B's hardening (B went 6→5 by collapsing a *non-close* wave, not by trimming the close ceremony). Per the audit's brief: **keep intact, no merge candidate.**

The `api/CLAUDE.md` reconcile (D.W6 close-ceremony item 7) overlaps with D.W2 Lane D's `api/CLAUDE.md` reconcile — but this is verification + finalization, not duplication (`D.W6.md:29` — "verify D.W2's reconcile to 9 collections / 24 indexes is accurate post-Lane-A/B splits; document the new service/repository layer"). The post-A/B splits change the file tree; the W6 pass closes the doc on the final state.

---

## §2 — Recommended hardened wave count: **7, unchanged**

**Verdict: keep the 7-wave count.**

D.W0 (open + precept) and D.W6 (close) are precept-bound bookends — non-negotiable. D.W1 (contract-v2), D.W2 (backend), D.W3 (frontend), D.W4 (styling), D.W5 (e2e) each correspond to a top-level clause in the user's D-opening directive (`D-PROMPTS.md §1`) — they each have distinct file-bound domains, distinct gates, distinct apparatus.

**The B-comparator (6→5) does not apply here.** B's collapse merged a *standalone layout wave* into B.W1 because the layout work shared `floating-panel-item` strip and W5 a11y corrections — a single file-tree neighborhood. D's waves are already in different neighborhoods:

- W1 = `package.json` + `vite.config.ts` + `scripts/`
- W2 = `api/**`
- W3 = `demo/@/components/custom/palette-browser/**` + cross-`demo/` codemod
- W4 = `demo/@/styles/style.css` + `demo/DESIGN.md` + 43 callsite SFCs
- W5 = `e2e/**`

No two adjacent waves share a working-tree neighborhood. There's no B-style merge candidate.

**Considered-and-rejected moves:**

1. **Fold D.W1 into D.W0**. Rejected — D.W1 mutates `package.json` and `vite.config.ts` (consumer-runtime config); D.W0 must close with a clean precept-only state-at-open commit. Mixing precept submodule advance with consumer-config edits poisons D.W0's diff and the baseline `audit/D.W0-state-at-open.md` value.

2. **Merge D.W2 Lane A + Lane B (palettes.ts + admin.ts)**. Rejected — different concern counts, ~1,600 LoC combined surface, named worktree isolation requirement. Two parallel agents in two worktrees is cleaner.

3. **Split D.W3 Lane C (codemod) into its own wave**. Rejected — mechanical sweep, 1-day work, shares W3's Playwright walk gate. The risk-flag is acknowledged: if the destructure-default semantics surface unexpected reactivity breakage at execution time, escalate to a follow-up wave. Plan as-is.

4. **Collapse D.W5 to 1 lane**. Rejected — admin-mock fixture apparatus is categorically distinct from user-view specs; the killed-W5-C precedent argues for keeping them gate-isolated.

**Tightening recommendations (no wave-count change):**

- **D.W1**: collapse L4 (verify-only) and L5 (doc-only refresh already started at D.W0 Lane B) into one verification step inside L3's sub-gate text. The wave is 5 sequential lanes today; making it 3 effective lanes (L1, L2, L3 with L4+L5 folded into L3 verification) tightens it without changing the wave boundary.

- **D.W3**: flag Lane C's sequencing dependency on Lane A more loudly in the wave gate (it's currently in the lanes-header at `D.W3.md:4` but not in the gate text at `D.W3.md:58`). Add a sequencing note: "Lane C may begin after Lane A's `PaletteDialog/` dir-split commits; concurrent with Lane B."

- **D.W6**: explicit cross-walk to B.W4's 7 close-audit lanes (the precept-policy lanes are the same; verify the wave spec doesn't re-invent the wheel where B.W4 already has a template).

---

## §3 — Critical-path analysis: W2/W3 parallelization

**Can D.W2 (backend `api/`) and D.W3 (frontend `demo/`) run in parallel?**

**File-disjointness check** (per the wave specs' File bounds sections):

- D.W2 File bounds (`D.W2.md:62-68`): `api/src/routes/**`, `api/src/services/**`, `api/src/db/`, `api/src/repositories/**`, `api/src/validation/**`, `api/dist/`, `api/.gitignore`, `api/src/migrate-*.ts`, `api/CLAUDE.md`. **All under `api/`.**

- D.W3 File bounds (`D.W3.md:52-54`): `demo/@/components/custom/palette-browser/**`, `demo/@/composables/palette/**` (via Lane B), 38 SFCs across `demo/@/components/custom/**` + `demo/color-picker/**`, `demo/@/App.vue`. **All under `demo/`.**

**Verdict: yes, D.W2 and D.W3 are file-disjoint.** Zero overlap. They could run in parallel worktrees.

**Gate isolation check**: D.W2's gate (`D.W2.md:71`) runs the api backend integration probe + `vitest 1409` (library unchanged) + library build clean + `vue-tsc 126` (demo unaffected). D.W3's gate (`D.W3.md:58`) runs a 3-viewport-light Playwright probe of the demo + `vue-tsc 126` + `vitest 1409` + smoke 3/3. The two gates probe different surfaces (api routes vs demo views); they do not share a test suite. Gate-isolatable.

**Why the spec keeps them linear** (`D.md:48`): "W2 is the heaviest wave; W3/W4 are file-disjoint from W2 (backend vs frontend) and could overlap, but the linear schedule keeps gate-isolation." The author acknowledged the parallel-able shape but chose linearity for "gate-isolation discipline" (`D.W2.md:87` — soft-block on D.W3, not hard).

**Recommendation: ALLOW PARALLEL EXECUTION of D.W2 and D.W3, gated together at a shared close.**

Rationale:

1. **File-disjoint**: zero overlap. No worktree merge conflicts possible at the file level.
2. **Gate-disjoint**: api integration probe vs demo Playwright probe — orthogonal apparatus.
3. **The dependency at `D.W3.md:71` is soft**: "Depends on: D.W2 (the backend's repository layer informs the facade's shape; the demo consumes `pm.X` not `apiFetch(X)` after Lane B)". The facade-completion in D.W3 Lane B lifts `@lib/palette/api` imports into composables — but **D.W3 Lane B does NOT consume D.W2's new repository layer**; it consumes the existing `@lib/palette/api` surface (the demo-side TypeScript client). D.W2's repository layer is server-side; the demo-side `apiFetch` boundary is unchanged. The dependency cited is illusory.
4. **Critical-path savings**: D.W2 is the heaviest wave (~4 lanes, biggest LoC delta). D.W3 has 3 lanes. Running D.W3 in parallel with D.W2 eliminates D.W3's duration from the critical path. Estimated savings: substantial — D.W3 could land alongside D.W2's gate.

**Concrete proposal**: open D.W2 and D.W3 *simultaneously* after D.W1 closes. Each runs in its own worktree (`api/` vs `demo/`). The wave gates close independently; the union of their gates is required before D.W4 opens. D.W4 still depends on D.W3 (styling depends on the dialog dir-split per `D.W4.md:65`).

Revised critical-path: W0 → W1 → **{W2 ∥ W3}** → W4 → W5 → W6. Effective wave count for time-budgeting: 6 (not 7), with W2/W3 parallel.

**Caveat**: if the user wants strict gate-isolation discipline (the B model), keep linear. The recommendation here trades one process discipline (linear gates) for one outcome (faster critical path). Frame as an option for the orchestrator.

---

## §4 — Gate model audit: sub-gates present in every wave?

**Tier 1** (invariants D1–D5 + precept 30–33): named in `D.md §2:26-34`. Cross-tranche, not per-wave. ✓

**Tier 2** (per-lane sub-gates): inspect every wave spec.

| Wave | Per-lane sub-gates? | Cite |
|---|---|---|
| D.W0 | Sub-gate 0, A, B — **3 sub-gates, one per lane** | `D.W0.md:20, 32, 44` |
| D.W1 | "**Sub-gate D.W1** (single, since the 5 lanes are surgical)" — **ONE wave-level sub-gate covering all 5 lanes** | `D.W1.md:58` |
| D.W2 | Sub-gate A, B, C, D — **4 sub-gates, one per lane** | `D.W2.md:23, 29, 41, 58` |
| D.W3 | Sub-gate A, B, C — **3 sub-gates, one per lane** | `D.W3.md:30, 36, 46` |
| D.W4 | Sub-gate A, B — **2 sub-gates, one per lane** | `D.W4.md:20, 41` |
| D.W5 | Sub-gate A, B, C — **3 sub-gates, one per lane** | `D.W5.md:28, 42, 51` |
| D.W6 | 7 close-audit lanes — gate is the conjunction, no per-lane sub-gate text; instead 7 named lane outputs as artefacts | `D.W6.md:13-19, 38-40` |

**Tier 3** (the wave gate = conjunction of sub-gates + one Playwright probe, wave-qualified per D4):

- D.W0: single 1280×800 light boot probe (`D.W0.md:56`). ✓ (audit/library-style wave)
- D.W1: single 1280×800 light boot probe (`D.W1.md:58`). ✓ (config wave)
- D.W2: backend integration probe — *no Playwright probe specified* — relies on `vitest 1409` + library build clean + curl-the-routes (`D.W2.md:71`). ⚠ — see verdict below.
- D.W3: 3-viewport-light Playwright probe walking palette views (`D.W3.md:58`). ✓ (component wave)
- D.W4: 3-viewport-light+dark Playwright probe with pixel-diff (`D.W4.md:52`). ✓ (styling wave — full probe)
- D.W5: all 3 Playwright projects green (`D.W5.md:63`). ✓ (the wave IS the Playwright work)
- D.W6: full smoke+admin+mobile re-probe (`D.W6.md:40`). ✓ (close)

**Tier 2 — D.W1's single wave-level sub-gate is a minor weakness.** The spec rationalizes it ("single, since the 5 lanes are surgical") and the gate enumerates 8 distinct artefact-backed conditions in one paragraph (`D.W1.md:58`). This is functionally equivalent to 5 sub-gates merged into one statement. **Acceptable**; the artefacts are named and verifiable. If hardened, suggest re-splitting L1, L2, L3 each into a numbered sub-gate inside the same paragraph for clarity.

**Tier 2 — D.W6 has 7 lanes but no per-lane sub-gate text.** The lanes are read-only audit lanes whose "sub-gate" is the existence of the lane's audit doc (`audit/D.W6-*`). The wave gate names "the conjunction of the 7 close-audit lanes + the close-honesty checklist + the visual-runtime re-probe" (`D.W6.md:40`). This is precept-policy — B.W4 has the same shape. ✓ acceptable.

**Tier 3 — D.W2's backend-integration probe instead of Playwright.** The wave is api-only; demo is unaffected; the spec correctly substitutes a backend probe (curl each route's smoke endpoint, assert explicit error shapes on the 6 ex-silent paths). This is wave-qualified per D4 ("the probe is wave-qualified — a layout/component wave runs the full 3-viewport-light+dark, a library/audit wave runs a single 1280×800 light"). The spec doesn't explicitly enumerate the api-integration probe in D4's wave-qualified menu — **recommend adding "api-integration probe" to D4's qualifier list** in `D.md §2`.

**Verdict: gate model is B-faithful. 3 tiers present in every wave. Two minor weaknesses (D.W1's single wave-level sub-gate; D4 qualifier menu missing api-integration probe). Neither blocks; both are tightening opportunities.**

---

## §5 — Close-ceremony intactness

D.W6 (`D.W6.md:1-59`) implements:

1. **7 read-only close-audit lanes** — plan-vs-actual, substrate-without-consumer, doc-drift, idiomatic-gestalt, performance, visual-runtime, integrity sweep. ✓ — identical to B.W4's 7 lanes; precept policy preserved.

2. **Close-honesty checklist** (`precepts/SPEC §Close`) — named in the gate (`D.W6.md:40`). ✓

3. **`FINAL.md`** with every D commit + B-close hash pin + finding disposition (every `research/Da..Dh` finding landed / retired / routed). ✓ (`D.W6.md:23`)

4. **Precept SHA pin** to `68d9b20` (D.W0's advance target). ✓ (`D.W6.md:25`)

5. **`coordination/Q.md §3` final state update** — re-verify the 7 standing primitive/blob gaps + `BlobDot` + `deriveAuroraPalette` + `<Tabs variant="underline">`; record glass-ui ships during D's window. ✓ (`D.W6.md:26`)

6. **Doc reconciles**: root `CLAUDE.md` (test+spec counts), `demo/CLAUDE.md` (wholesale reconcile to post-D state — the pre-Mar-2026-restructure section), `api/CLAUDE.md` (post-W2 service/repository layer documented). ✓ (`D.W6.md:27-29`)

7. **Integrity sweep** — `git reflog` since D open for unauthorized agent-attributed mutating git ops; `git stash list` clean; `docs/precepts` shows exactly one expected submodule change. ✓ (`D.W6.md:19`)

**The close-ceremony note at `D.W6.md:56-58`** records the precept-bound truth — every finding lands or retires with rationale or routes to a named successor; the A + B + D `FINAL.md`s together close every prompt clause. This is the *zero-deferral* invariant (D5) bound to the close.

**Verdict: close ceremony intact and B-faithful. Precept policy preserved. No trimming.**

---

## §6 — Cross-wave coherence check

- **Precept SHA chain**: D opens at `3c32fae` (inherited from B close); D.W0 advances to `68d9b20`; D.W6 pins `68d9b20`. ✓ named at `D.md:9, 34, 99`.
- **Wave-log discipline**: every wave spec ends with Dependencies (depends on, blocks). ✓ checked all 7.
- **Verification artefact paths**: every wave names `audit/D.W{n}-*.md` artefacts. ✓
- **Commit plan**: every wave names commit messages. ✓
- **File bounds**: every wave has a File bounds table. ✓ (the cross-walk is per-wave-spec authoritative per `D.md:64`).
- **Finding ownership**: every `research/Da..Dh` finding is mapped at `findings.md §2` to exactly one wave or marked filed/routed. ✓ (verified 38 rows).

---

## §7 — Bottom-line recommendations

1. **Keep 7-wave count.** No merge candidates that survive scrutiny.
2. **Allow D.W2 ∥ D.W3 parallel execution.** They are file-disjoint and gate-disjoint; the spec's stated dependency is soft and the cited rationale ("backend's repository layer informs the facade's shape") is illusory at the inter-repo boundary. Effective critical path becomes 6 waves.
3. **Tighten D.W1's gate text** — split the single wave-level sub-gate into 3 numbered sub-gates (L1, L2, L3) inside the same paragraph; fold L4+L5 into L3's verification list.
4. **Tighten D.W3 Lane C sequencing** — add the "after Lane A; concurrent with Lane B" note to the wave gate text, not just the lane header.
5. **Extend D4's wave-qualified probe menu** — add "api-integration probe (backend-only waves)" alongside the existing single-viewport / 3-viewport-light+dark options.
6. **Keep D.W6 intact** — precept policy; 7 close-audit lanes is the inherited B.W4 shape.

---

## §8 — 7-line summary (for return)

1. **Wave count**: keep at **7**, unchanged. No B-style 6→5 collapse applies (D's waves are file-tree-disjoint).
2. **Per-wave verdict**: D.W0 right-sized; D.W1 right-sized-lean (consider tightening L4/L5 into L3 verification); D.W2 right-sized (4 lanes correct, A/B worktree-isolated); D.W3 right-sized (codemod stays); D.W4 right-sized; D.W5 right-sized (3 lanes justified); D.W6 right-sized (precept policy).
3. **Critical path**: linear today (W0→…→W6); **D.W2 ∥ D.W3 should be allowed to parallelize** — file-disjoint (api/ vs demo/), gate-disjoint, stated dependency is soft and illusory; effective critical path becomes **6 wave-slots**.
4. **Gate model**: B-faithful, 3 tiers present in every wave. Two minor weaknesses (D.W1's single wave-level sub-gate; D4 qualifier menu missing api-integration probe).
5. **Close ceremony**: intact, 7 close-audit lanes = B.W4 shape; precept policy preserved.
6. **Recommend**: 4 small tightenings (per §7) — no structural changes.
7. **Verdict on the brief's question**: **right-sized at 7 waves**; **critical path can be shortened by parallelizing W2/W3**; **gate model is intact**.
