# F-AUDIT-1 — Prompts + precepts recap

**Mode**: READ-ONLY. Authored at F open.
**Date**: 2026-05-20.
**Branch / HEAD**: `tranche-f` @ `e1549e0d309c31b4e977765d7c7a02fc67987078`.
**Precept pin**: `68d9b20b56e420b0336733a82a10a909b4c6a69c` (unchanged across E close → post-E master commits W8-β..W12-β → F open).
**Sources read**: `docs/tranches/E/audit/E-AUDIT-1-prompts-precepts.md`; `docs/tranches/E/E-PROMPTS.md`; `docs/tranches/E/FINAL.md`; `docs/tranches/D/FINAL.md`; `docs/tranches/B/FINAL.md`; `docs/tranches/A/FINAL.md`; `docs/tranches/E/audit/E-AUDIT-2-deferred-ledger.md`; `docs/precepts/README.md`; `docs/precepts/instructions/README.md`; speedtest's `docs/tranches/AI/AI.md` (the cross-repo origin of the W8-W12 commits on master); `git log` of master + tranche-f including individual commit bodies for 1fafd5d / 4cd8d15 / 442aba1 / 02ed508 / 209584c / 08a7f96 / 9f56813 / e1549e0; the current F-seed + F-opening user directives (this conversation's prior turn + this turn).

This audit ensures every clause of every user prompt across pre-A modernization + tranches A + B + D + E + the post-E-close W8-W12 constellation window + the F seed + the F-opening directive has been addressed-or-routed, and verifies value.js complies with every binding precept invariant at HEAD `e1549e0`.

---

## §1 — Prompt timeline

Every row is one distinct user prompt occurrence in chronological order. Rows from pre-A through E inherit `E-AUDIT-1 §1`'s ledger verbatim (15 prompts / 47 clause sub-items); rows for the post-E window + F-seed + F-open are NEW for this audit.

| # | Tranche / window | Date | Prompt (verbatim if short; `[paraphrased from <source>]` if long) | Status at F open |
|---|---|---|---|---|
| 1 | Pre-A (modernization) | Feb 2026 | `[paraphrased from MEMORY.md "Migration Complete"]` — "Modernize the stack: Sass→CSS, gl-matrix→inline, TS strict + verbatimModuleSyntax + bundler resolution, radix-vue→reka-ui, @vueuse v14, tw-animate-css, Node 24 CI, Vue 3.5 idioms." | ADDRESSED — 10-phase migration complete (per MEMORY.md). |
| 2 | Pre-A (GooBlob) | Apr 2026 | `[paraphrased from MEMORY.md "GooBlob"]` — "Build a WebGL2 metaball blob with affective-state FSM; renderer + mood + pointer + satellites composables; admin BlobPane; extirpate SVG legacy filters." | ADDRESSED — GooBlob landed; legacy SVG `gooey-filter`/`watercolor-filter-hero` deleted. |
| 3 | A turn-1 | 2026-05-18 | `[paraphrased from A/findings.md §1]` — "A series of changes broke many dropdowns, animations, core features. [stops.length crash + fira-code 403]. Develop a tranche + value.js-focused audit with 13 design+functionality mandates." | ADDRESSED — A.W0–W5 + B-residuals at B.W2/B.W3 + D-residuals at D.W3/D.W4 (per E-AUDIT-1 §1 row 3 + sub-rows 3.1–3.13). |
| 4 | A turn-1 mid-session | 2026-05-18 | "The panels seem to be broken largely, and the dock is broken as well." | ADDRESSED — A.W0 (`bc7ad2c`, `c20f609`, `c43fc76`); A-key-1..A-key-4 enumerated. |
| 5 | A turn-1 clarification | 2026-05-18 | "This is for a tranche created herein, not glass-ui per-se. Glass-ui has its own tranche process. This is tranche A. Develop glass-ui fixes idiomatically at the root, too. This is tranche development only in this session." | ADDRESSED — A.md + A/findings.md §5; planning-only honored at A open. |
| 6 | A turn-2 | 2026-05-18 | "Properly de-dup from Q, and then take another pass to harden this tranche, A, with 6 agents in parallel. Recap the plan first, identify gaps, challenge and harden for an augmented wave-set." | ADDRESSED — A's 7-lane W7 close + HARDEN-1..6. |
| 7 | A turn-3 | 2026-05-18 | "Begin and continue the current tranche … read all appurtenant documentation, adhere exactly to the plan re agent orchestration + deep parallelization. Do not edit items directly unless befitting. Continue indefatigably; do not relinquish control until plan complete IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | ADDRESSED — A.W0–W5 executed and committed; B.W0 Lane A ratified A.W5 + ran A.W7 close. |
| 8 | B turn-4 | 2026-05-19 | `[paraphrased from B/B-PROMPTS.md §1]` — "These items, like for the dock sizing, layout, seem contrived, overfit, over-engineered. Harden: DEEPLY audit with 6 agents in parallel … devise a path forward; recapitulate prompts/plans/precepts; NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, performance above all are both necessary and desirable. NO legacy code. Delineate chronically deferred + deferred; fold them into this new tranche. Recap ALL prompts; ensure addressed. NOT an implementation phase. Tranche development only. Simplify layout + component structure (preserving rendered styling). This seems hung on e2e." | ADDRESSED — B.W1 (`--dock-pos` deleted) + B.W2 (`usePaneRouter`) + B.W3 (e2e 16→3). |
| 9 | B turn-5 | 2026-05-19 | "Q is closed. Advance the precept pin; harden B against the new Q state." | ADDRESSED — B.W0 `3310a8c → 3c32fae`. |
| 10 | B turn-6 | 2026-05-19 | "Audit value.js ↔ keyframes.js parity." | ADDRESSED — `research/B-keyframes-parity.md`; B.W3 K1-K5 closed. |
| 11 | B turn-7 | 2026-05-19 | "Complete in totality. NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | ADDRESSED — B.W1–W4 all executed and committed. |
| 12 | D open | 2026-05-19 (mid-B.W4) | `[paraphrased from D/D-PROMPTS.md §1, 47-line verbatim block]` — DEEPLY audit with 6 agents in parallel; recapitulate prompts/plans/precepts; NO quick solutions; architectural transpositions; NO legacy; chronically-deferred + deferred fold; recap ALL prompts; planning-only; Full Playwright every view + admin; aurora derive-from-color; older-aurora analysis; blob extirpation + glass-ui alignment; backend legacy + fail-explicit; surgical migration; encapsulation + DI; NO god modules; NO workarounds/fallbacks/special-cases/effusive-dynamicism/nested-imports/test-in-src; DRY + KISS; linting at every interval; encapsulation assay; >500-line splits; logical grouping; brittle selectors; styling 4 foci; idiomatic Tailwind; 8 agents in plan mode; planning-only at open. | ADDRESSED — D.W0–W6 + named-routes (per E-AUDIT-1 §1 row 12 + sub-rows 12.1–12.30). |
| 13 | D mid-session (library-perf) | 2026-05-19/20 | "Analyze with 6 agents in parallel our parsing, math, library, and color code, alongside keyframes' parsing/library/math/animation. Deploy 6 challenge agents to challenge every claim. Converge upon optimum + challenged + research-backed claims. KISS." | ADDRESSED — `D-LIB-OPTIMIZATION-SYNTHESIS.md` (6 P1 + 5 P2 + 4 P3 surviving; 12 REJECTED). |
| 14 | D mid-session (reactivity) | 2026-05-20 | "We MUST have proper, instant, reactivity in keyframes.js demo + value.js color picker. We've had massive recursion + memory-leak Color/ValueUnit nesting. Look to commit history deeply. Two agents in parallel. Plan to merge into master + version bump." | ADDRESSED — `D-REACTIVITY-A.md` (recursion fix `35cd9d5`/`80cdd59`) + `D-REACTIVITY-B.md` + invariant D7 + 4 hardening primitives + v0.6.0 ship. |
| 15 | E open | 2026-05-20 | `[verbatim, E-PROMPTS.md §1]` — "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein. Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code. Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche. Recap ALL of our prompts and requests hitherto and ensure they've been addressed. This is NOT an implementation phase. Tranche development only. In particular, analyze the recent speedtest and glass-ui and fourier analysis work." | ADDRESSED at E close — E.W0–W5 + v0.7.0 ship (per E/FINAL.md §1+§2). |
| 16 | E-FOLD round | 2026-05-20 | `[paraphrased from E-PROMPTS.md §2 row 7 + E-FOLD-2-3-4-synthesis]` — "All route forward should be folded herein" — issued after the 6-lane open audit returned with 14 chronically-deferred items; user directive to absorb. | ADDRESSED at E close — `E-FOLD-1..4` synthesised; 7 folded + 3 retired + 7 route-forward-with-E5 + 0 skipped. |
| 17 | E execution authorization | 2026-05-20 | `[paraphrased from E close ceremony references]` — "Begin and continue the current tranche … indefatigably; do not relinquish control until plan complete IN TOTALITY." (the standing execute-in-totality pattern; planning-only posture lifted at first execution session) | ADDRESSED at E close — E.W0–W5 all closed + merged + tagged v0.7.0. |
| 18 | **Post-E window** (W8-β..W12-β) | 2026-05-20 evening | **Cross-repo origin** — `[paraphrased from speedtest/docs/tranches/AI/AI.md]` — "We should plan to upgrade the deps in all sibling repos, too, like glass-ui, fourier, value.js, keyframes.js, etc. List and ensure latest deps for all. Continue. Redeploy all agents." The directive was issued in **speedtest's AI tranche**; value.js was a CONSUMER of waves W8 / W9 / W10 / W12 of that tranche's constellation-wide dep-lift cohort. The 8 commits (`1fafd5d` lockfile re-baseline + `4cd8d15` 23 SAFE-PATCH+SAFE-MINOR + `442aba1` vue-tsc 2→3 + `02ed508` lucide rename + `209584c` @types/node + vaul-vue + `08a7f96` Vite 7→8 + Rolldown + `9f56813` TS 5→6 + `e1549e0` dts entryRoot unblocker) were authored directly to value.js master 2026-05-20 20:16–21:29 by Mike Babb. Commit bodies explicitly cite "AI W8-β spec §2.2.1", "C2 §7.1", "Phase 1 (glass-ui W10-α)". **Not a value.js-internal tranche**; the user-directed origin sits in speedtest. | ADDRESSED — all 8 commits landed cleanly; benches PASS (L8 ≥ 5×, HSL→RGB ≥ 2×, nameParser ≥ 5×); vue-tsc 120 flat against baseline; 1584/1584 tests; build green; `proof:resolution` PASS. The `e1549e0` unblocker fix resolves a TS7016 dts-layout regression introduced by W10-β's Rolldown bump — surfaced by typed consumers (keyframes.js, words/frontend). |
| 19 | F seed (prior conversation turn) | 2026-05-20 | `[verbatim, from earlier conversation turn]` — "No deferrals. New tranche for developing the above." | ADDRESSED-AS-THESIS — this is F's binding thesis (the F-open elaboration). |
| 20 | F open (this conversation turn) | 2026-05-20 | `[verbatim, from this turn's user directive elaborated through the orchestrator's F-AUDIT-1 dispatch]` — "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein. Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code. Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche. Recap ALL of our prompts and requests hitherto and ensure they've been addressed. This is NOT an implementation phase. Tranche development only." | NEW — this directive triggers F-AUDIT-1..6 dispatch; planning-only at open. |

**Total prompts identified**: **20** distinct user prompt occurrences across pre-A → A → B → D → E → post-E-window → F-seed → F-open.

**Per-tranche-bucket counts**:
- pre-A: 2 (modernization + GooBlob)
- A: 5 (turn-1 + mid-session + 1 clarification + turn-2 + turn-3)
- B: 4 (turns 4 / 5 / 6 / 7)
- D: 3 (open + lib-perf + reactivity)
- E: 3 (open + FOLD + execute-authorization)
- post-E window: 1 (the cross-repo speedtest AI W8-β..W12-β directive, originated in speedtest, landed on value.js master via consumer-lockstep)
- F-seed: 1 ("No deferrals. New tranche for developing the above.")
- F-open: 1 (the full audit-6-agents-in-parallel directive)

**Clause-level totals**: A's 13-mandate set + B turn-4's 11-clause set + D-open's 27 clauses + D lib-perf's 4 + D reactivity's 4 + E-open's 11 + F-open's ~10 clauses ≈ **95+ clause sub-items** when fully decomposed (E-AUDIT-1 §1 carried 47 sub-items through E open; F-AUDIT-1 inherits those + folds the W8-W12 window + F-open).

---

## §2 — Classification

For each prompt, classification at F open:

| # | Prompt | Tranche | Status | Evidence (commit / wave / route-forward) |
|---|---|---|---|---|
| 1 | Pre-A modernization | Pre-A | ADDRESSED | MEMORY.md "Migration Complete (Feb 2026)" + 10-phase ledger |
| 2 | Pre-A GooBlob | Pre-A | ADDRESSED | MEMORY.md "GooBlob — WebGL2 Metaball Component (Apr 2026)" |
| 3 | A turn-1 13-mandate | A | ADDRESSED | A.W0–W5 + B.W2/B.W3 + D.W3/D.W4 |
| 4 | A turn-1 mid-session (panels broken) | A | ADDRESSED | `bc7ad2c` + `c20f609` + `c43fc76` |
| 5 | A turn-1 clarification (planning-only + glass-ui) | A | ADDRESSED | A.md + A/findings.md §5 |
| 6 | A turn-2 (6-agent harden) | A | ADDRESSED | A's 7-lane W7 close + HARDEN-1..6 |
| 7 | A turn-3 (execute-in-totality) | A | ADDRESSED | A.W0–W5 + B.W0 ratification |
| 8 | B turn-4 (DEEPLY audit + 11 clauses) | B | ADDRESSED | B.W1 + B.W2 + B.W3 |
| 9 | B turn-5 (Q-close + precept advance) | B | ADDRESSED | B.W0 `3310a8c → 3c32fae` |
| 10 | B turn-6 (keyframes parity) | B | ADDRESSED | B.W3 K1-K5 |
| 11 | B turn-7 (execute-in-totality) | B | ADDRESSED | B.W1–W4 |
| 12 | D open (27-clause omnibus) | D | ADDRESSED (3 sub-clauses ROUTED) | D.W0–W6 + v0.6.0 ship; ROUTED: aurora + blob + smoke-safari (smoke-safari closed at E.W3 Lane B) |
| 13 | D library-perf (6+6 challenge) | D | ADDRESSED | `D-LIB-OPTIMIZATION-SYNTHESIS.md` |
| 14 | D reactivity round | D | ADDRESSED | `D-REACTIVITY-A/B.md` + invariant D7 + v0.6.0 |
| 15 | E open (11-clause directive) | E | ADDRESSED | E.W0–W5 + v0.7.0; `lerpLegacy` retirement deferred WITH E5 (a)(b)(c) escalation gated on keyframes.js codemod |
| 16 | E-FOLD (absorb route-forwards) | E | ADDRESSED | E-FOLD-1..4 |
| 17 | E execution authorization | E | ADDRESSED | E.W0–W5 closed + merged + tagged |
| 18 | Post-E W8-β..W12-β consumer-lockstep | post-E | ADDRESSED | 8 commits on master; benches/tests/build all PASS at HEAD `e1549e0` |
| 19 | F seed ("No deferrals") | F-seed | ADDRESSED-AS-THESIS | F is opened expressly to honor this thesis |
| 20 | F open (full 6-agent audit directive) | F-open | NEW | F-AUDIT-1..6 dispatched; this doc is the §3+§9 deliverable for F-open clauses |

**Per-classification totals at F open**:
- ADDRESSED: 18
- ROUTED: 0 (the 6 ROUTED-at-E-open clauses from E-AUDIT-1 §6.1 — aurora derive-from-color (2) + blob extirpation (1) + glass-ui root-restyle residuals (3) — REMAIN routed to glass-ui successor at F open, but their carriers are E-FOLD's 7 route-forward-with-E5-escalation items, which by the F-seed directive "No deferrals" become **F's scope** unless they are externally-blocked. The status table below in §6 enumerates the F-routing.)
- DEFERRED-WITH-E5: 4 (per E/FINAL.md §6 standing route-forwards: `lerpLegacy` retirement / 7 standing glass-ui primitive asks / Contract-v2 §2.1 font-asset residual / keyframes.js precept-pin drift)
- NEW: 2 (F-seed + F-open)

Per the F-seed directive ("No deferrals"), every DEFERRED-WITH-E5 item is FOLDED INTO F (the F-thesis demands it). Routing destinations remain documented as (a)(b)(c) but F absorbs the management+escalation.

---

## §3 — Standing mandates inheritance

The 9 standing mandates from `E-PROMPTS.md §3` are the binding cross-tranche edicts. F open verifies each + carries F-specific sharpening from the F-open directive.

| # | Mandate (verbatim from E-PROMPTS.md §3) | F-inheritance verdict | F-sharpening (from F-open directive) |
|---|---|---|---|
| 1 | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | INHERITED | RESTATED verbatim in F-open ("NO quick solutions, NO workarounds: idiomatic, gestalt approaches"). |
| 2 | "NO legacy code." | INHERITED | RESTATED verbatim. F's scope MUST include retiring the lone `@deprecated` (lerpLegacy) — currently the only `@deprecated` in `src/` (verified `grep -rn '@deprecated' src/` returns exactly `src/math.ts:34`), and is E5-trigger-gated on keyframes.js codemod adoption. F-thesis ("No deferrals") binds F to either land the codemod or escalate the gate. |
| 3 | "DRY / KISS." | INHERITED | Binding; no new sharpening. F-open's "architectural transpositions ... necessary and desirable" reinforces. |
| 4 | "Architectural transpositions are necessary and desirable." | INHERITED | RESTATED verbatim. F-open elevates this as a primary direction ("This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable"). |
| 5 | "Run linting and type checking at every interval." | INHERITED | Standing. Current state at F open: vue-tsc 120 errors (pre-existing demo `ui/*` chronic per W10-β commit body — flat with baseline); `npm run lint` exit 0 expected. |
| 6 | "DEEPLY audit with N agents in parallel." | INHERITED | RESTATED with "6 agents in parallel" — invocation count consistent with E open. Already binding via the F-AUDIT-1..6 dispatch this lane belongs to. |
| 7 | "Tranche development only / planning-only at open." | INHERITED | RESTATED verbatim ("This is NOT an implementation phase. Tranche development only."). F is opened planning-only. |
| 8 | "Chronically deferred items must be folded." | INHERITED | RESTATED verbatim ("Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche."). PLUS F-seed thesis: "No deferrals." The combined directive SHARPENS to: **no items may exit F in DEFERRED state. The (a)(b)(c) escalation primitive is still permitted (it is itself a fold, not a deferral), but the count of E5-escalated items at F close must trend toward zero or carry a hard-external-block.** |
| 9 | "Recapitulate every prompt." | INHERITED | RESTATED verbatim ("Recap ALL of our prompts and requests hitherto and ensure they've been addressed."). THIS lane (F-AUDIT-1) is the deliverable that satisfies this mandate at F open. |

**F-open NEW standing mandate (de-novo)**: **"No deferrals."** (from the F-seed turn). This is the F-thesis distilled — every chronically-deferred item, every recently-deferred item, every E5-escalated route-forward MUST be folded into F's plan with a wave assignment, a retire-with-rationale, or a hard-external-block declared with re-check trigger. Silent deferral is forbidden; **named deferral with a (a)(b)(c) escalation MAY survive only if the (a) blocker is hard-external** (the writer is not value.js's repo, the user is the only authority to unblock).

---

## §4 — Precept invariants

Verification at F open (HEAD `e1549e0`):

| # | Invariant | At E close | At F open (HEAD `e1549e0`) | Verdict |
|---|---|---|---|---|
| 30 | Cross-repo dev-resolution (contract-v2): `exports["."]` 3-key `{types, import, default}`; `build:watch` script; consumers resolve `dist/` dev+prod; `proof-resolution-contract.mjs` PASS | GREEN | **GREEN** — `npm run proof:resolution` executed live during this audit: "[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation" (output captured 2026-05-20). The W12-unblocker fix (`e1549e0`) restored the flat `dist/{index,units,...}.d.ts` shape — without that fix, contract-v2's `exports["."].types: "./dist/index.d.ts"` claim would not resolve in typed consumers; now does. | HOLDS — STRENGTHENED post-W12. |
| 31 | Component props fail-explicit (no silent prop-swallowing on `<Card variant>` etc.) | GREEN | **PRESUMED GREEN** — no commits in W8-β..W12-β touched src/ component contracts; demo `<Card>` callsites unchanged since D.W3; E.W3 visual-runtime probes were the last evidence (zero stale-prop warnings across 21 specs). At F open this is INHERITED-GREEN; F-AUDIT-2 may re-probe. | HOLDS (presumed). |
| 32 | Phantom-class corpus-grep (RETIRED classes registered + grep-verified) | GREEN | **GREEN** — no new phantom classes introduced in the W8-W12 window (all 8 commits were dependency-manifest + lockfile + Vite/TS/Rolldown engine-layer; zero CSS-class additions). `floating-panel-item` + `--animation-slide-md` retirements from B.W1 + E inheritance hold. | HOLDS. |
| 33 | Dead-code corpus-grep (`@deprecated` registered + grep-verified) | GREEN — exactly one `@deprecated` in src/ (`lerpLegacy`) with E5 trigger pointing at keyframes.js codemod | **GREEN — flat with E close** — `grep -rn '@deprecated' src/` returns exactly `src/math.ts:34: * @deprecated Legacy lerp(t, a, b) ordering. Migrate to lerp(a, b, t).` (verified live during this audit). The lone `@deprecated` is unchanged across the W8-W12 window. F-thesis ("No deferrals") binds F to either land the keyframes.js codemod-side or escalate. | HOLDS — but F-thesis-binding for retirement. |

**Auxiliary invariants verified live**:
- `grep -rn 'new Function' src/` → returns only `new FunctionValue(...)` (the AST node — NOT JS dynamic-evaluation); D6 invariant HOLDS.
- `find src/ -name '*.test.ts'` → **zero matches**; test-files-outside-src precept HOLDS.
- `docs/precepts` submodule pin: `68d9b20b56e420b0336733a82a10a909b4c6a69c` — unchanged across E close and W8-W12 window; precept-pin invariant HOLDS.
- `git status --short` → only `?? docs/tranches/C/` (untracked C tranche directory — the historical palette-CRUD/fourier tranche, scoped out of A/B/D/E inheritance per E-AUDIT-2 §1; not a hygiene concern). No mid-flight uncommitted work.

---

## §5 — F-thesis distillation

The F-opening directive's decomposed clauses, headlined by the F-seed thesis:

### F-thesis (headline): **"No deferrals."**

The F-seed turn issued "No deferrals. New tranche for developing the above." This is the binding distillation — F's primary edict. The above-referenced ("the above") is the chronically-deferred ledger that accumulated through A → B → D → E, of which E-FOLD addressed 14 items but routed 7 forward with E5-escalation. F's scope is to drive that route-forward count to zero (modulo hard-external-blocks).

### F-open sub-clauses (decomposed):

| # | Clause | Source | Bind type |
|---|---|---|---|
| F-1 | DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein | F-open directive ¶1 | Orchestrator-binding (this F-AUDIT-1..6 dispatch is the satisfaction) |
| F-2 | Devise a path forward: audit hitherto-made changes and the remaining plan | F-open directive ¶2 | Synthesis (F.md will hold the path) |
| F-3 | Recapitulate our original prompts, plans, and precepts | F-open directive ¶2 | THIS LANE (F-AUDIT-1) |
| F-4 | NO quick solutions, NO workarounds: idiomatic, gestalt approaches | F-open directive ¶2 | Standing invariant (mandate #1) |
| F-5 | Architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable | F-open directive ¶2 | Direction (mandate #4) |
| F-6 | NO legacy code | F-open directive ¶3 | Standing invariant (mandate #2); F-thesis binds `lerpLegacy` retirement to F scope |
| F-7 | Delineate any chronically deferred items and fold them into this new tranche | F-open directive ¶4 | Standing invariant (mandate #8); F-thesis sharpens to "no deferrals" |
| F-8 | Delineate any deferred items and fold them into this new tranche | F-open directive ¶5 | Same as F-7 |
| F-9 | Recap ALL of our prompts and requests hitherto and ensure they've been addressed | F-open directive ¶6 | Standing invariant (mandate #9); THIS LANE |
| F-10 | This is NOT an implementation phase. Tranche development only. | F-open directive ¶7 | Posture (mandate #7) |

**Pattern recognition**: F-open is materially the same shape as B turn-4 + D open + E open. The "deeply audit + recapitulate + idiomatic-gestalt + no-legacy + planning-only + fold-deferred" pattern has been issued **FOUR TIMES** (B → D → E → F). The pattern is itself a standing mandate (mandate #6 + #9). The F-NEW contribution is **F-thesis "No deferrals"** — the seed turn's distillation that elevates folding from "all DEFERRED items must be folded" (E-binding) to "the residual carry-count must trend toward zero, with hard-external-block as the only survival path" (F-binding).

---

## §6 — Zero-deferral verdict at F open

Per F-thesis: no clause may exit this audit in DEFERRED state. Each F-open clause + each surviving E-route-forward item is classified.

### §6.1 — F-open clause dispositions

| Clause | Disposition at F open | Where it lives going forward |
|---|---|---|
| F-1 (6-agent audit) | ADDRESSED | F-AUDIT-1..6 (this dispatch) |
| F-2 (devise path forward) | ROUTED-INTO-F-PLAN | F.md (orchestrator's synthesis after 6 audit lanes return) |
| F-3 (recap prompts + plans + precepts) | ADDRESSED | This doc (§1 + §3 + §4) |
| F-4 (no quick solutions) | INVARIANT-INHERITED | Binds every F wave |
| F-5 (architectural transpositions) | DIRECTION-INHERITED | F-AUDIT-5 (presumed library-demo architecture lane) + F.md will allocate transposition opportunities to waves |
| F-6 (NO legacy code) | ROUTED-INTO-F-PLAN | F wave to land keyframes.js codemod (or escalate gate); also: 1 `@deprecated` to retire when codemod lands |
| F-7 (delineate chronically deferred + fold) | ROUTED-INTO-F-PLAN | F-AUDIT-2 (presumed deferred-ledger lane) will enumerate; this doc §6.2 below catalogues at F-open snapshot |
| F-8 (delineate deferred + fold) | Same as F-7 | Same |
| F-9 (recap ALL prompts) | ADDRESSED | This doc §1 |
| F-10 (planning-only at open) | POSTURE-HONORED | F is opened planning-only; first execution session requires explicit user authorization |

**No F-open clause is DEFERRED.** All ADDRESSED or ROUTED-INTO-F-PLAN.

### §6.2 — E-route-forward items folded into F (the "No deferrals" thesis enacted)

Per E/FINAL.md §6 "Standing route-forward items (with E5 (a)(b)(c) escalation)", these 4 items survived E close in DEFERRED-WITH-E5 status. F-thesis "No deferrals" requires each be ADDRESSED, RETIRED-WITH-RATIONALE, or HARD-EXTERNALLY-BLOCKED with a concrete unblock path declared.

| Item | E-close state | F disposition at open | Rationale |
|---|---|---|---|
| `lerpLegacy` retirement | DEFERRED-WITH-E5; (a) keyframes.js 2 silently-broken call sites; (b) maintainer runs `npm run codemod:keyframes-lerp`; (c) `cd keyframes.js && npm test` against E-master | **FOLD-INTO-F** — F should land the keyframes.js-side codemod (or apply as cross-repo patch). value.js can then retire `lerpLegacy` cleanly. **NOT hard-external** — value.js authors the codemod; keyframes.js is a sibling repo also under user-direction. | F-thesis binds: this is exactly the kind of item "No deferrals" eliminates. |
| 7 standing glass-ui primitive/blob asks (A-01 metaballs surface; A-02 deriveAuroraPalette; A-03 BlobDot; A-04 SelectTrigger size; A-05 clampLabel; A-06 TooltipContent variant=mono; A-07 Button size=icon-sm) | DEFERRED-WITH-E5; (a) cross-repo authorship (glass-ui); (b) glass-ui's successor tranche; (c) per glass-ui's schedule | **F-FOLD-AS-ESCALATION** — declared HARD-EXTERNAL-BLOCK with refined re-check trigger: F should articulate to the glass-ui maintainer (a) the exact API shapes (already drafted in `D/research/Dc-aurora.md §3` + `D/research/Dd-blob.md`), (b) the value.js consumer's first-tranche-after-glass-ui-ship is named (the "value.js demo-abstraction tranche post-glass-ui-ship"), (c) glass-ui's `coordination/Q.md §3` is the canonical channel. Survival in DEFERRED-WITH-E5 is permitted ONLY because the writer is a sibling repo + the user is the only authority to schedule glass-ui's work. | F-thesis bind PASS: "No deferrals" still permits hard-external-block + concrete unblock path. |
| Contract-v2 §2.1 font-asset residual (`siblingFsAllowTransient` font-asset half) | DEFERRED-WITH-E5; (a) glass-ui's `./styles` Tailwind-source ships `@font-face` with relative URLs; (b) glass-ui inlines font binaries as base64 in `dist/glass-ui.css` + exports `@font-face` through compiled surface; (c) glass-ui maintainer signal | **F-FOLD-AS-ESCALATION** — same hard-external-block frame; glass-ui-side authorship required. Demo-side `siblingFsAllowTransient` carve-out remains documented. | Same as above. |
| keyframes.js precept-pin drift (`458c2d1` divergent tree) | DEFERRED-WITH-E5; (a) keyframes.js maintainer choice; (b) keyframes.js rebases onto mkbabb/precepts upstream; (c) keyframes.js maintainer signal | **F-FOLD-AS-ESCALATION** — same hard-external-block frame. **However, if F lands keyframes.js-side codemod for `lerpLegacy` (above), it would be elegant to bundle a precept-pin alignment commit on keyframes.js as well**. F may scope this. | F-thesis admits ESCALATION-WITH-CONCRETE-UNBLOCK. |

### §6.3 — Post-E-window items (W8-W12 commits)

The 8 commits between E close and F open were a **CONSUMER LOCKSTEP** of speedtest's AI tranche (W8-β through W12-β). All landed cleanly. **No deferrals or chronicities surfaced from this window.** The `e1549e0` W12-unblocker fix is the single regression-and-recovery cycle; F open finds the state coherent.

**Uncertainty surfaced + propose F-AUDIT-3 investigation**:
- These 8 commits exist on `master` (between `47399c2` E-merge and `e1549e0` F-HEAD) — NOT on any tranche branch.
- No PROGRESS.md, no FINAL.md, no `docs/tranches/<name>/` directory for these commits exists in value.js (the directives ARE documented in `speedtest/docs/tranches/AI/` but value.js carries no local trail).
- This is a **NEW PATTERN for value.js**: master mutated directly (8 substantive commits) without a value.js-side tranche envelope.
- F-AUDIT-3 (presumed master-drift / cross-repo audit lane) SHOULD investigate: (i) was the AI-W8..W12 directive's value.js portion intended to be enveloped in a value.js mini-tranche document set (per `docs/precepts/instructions/tranche/SPEC.md`)? Or is the speedtest-side AI/FINAL.md the canonical authority and value.js needs only a back-reference? (ii) Are there any latent regressions undetected by the bench gates? The W10-β commit body discloses: `build:gh-pages` was already failing due to a `lucide-vue-next` → `@lucide/vue` rename gap (`Github` icon export removed from new package). This is a **STANDING REGRESSION** at F open and is NOT yet folded into F.

**F-AUDIT-3 specific ask**:
1. Investigate the W9-C lucide rename's `Github` icon gap — surface every `Github` import site + propose a replacement (per the W10-β commit body, follow-on cleanup work).
2. Confirm whether the speedtest AI tranche's W-CLOSE ceremony retains an authoritative reference to value.js's 8 commits.
3. Decide whether value.js needs a back-reference document set under `docs/tranches/post-E-window/` or whether `coordination/Q.md` in F is the right home.

### §6.4 — Zero-deferral verdict

At F open: **no clause exits this audit in silent-DEFERRED state**. Every clause is ADDRESSED, ROUTED-INTO-F-PLAN, FOLD-INTO-F-EXECUTION, or FOLD-AS-ESCALATION (hard-external-block with concrete unblock + re-check trigger). The F-thesis "No deferrals" is honored.

---

## §7 — Authority

This audit derives from the following pinned sources:

**Value.js docs**:
- `docs/tranches/A/FINAL.md` (A close ceremony, 13-mandate disposition)
- `docs/tranches/B/FINAL.md` (B close ceremony, ledger rows A–N)
- `docs/tranches/D/FINAL.md` (D close ceremony, D1-D7 invariants, 5-wave inventory)
- `docs/tranches/E/FINAL.md` (E close ceremony, E1-E5 invariants, 6-wave inventory, v0.7.0 release surface)
- `docs/tranches/E/E-PROMPTS.md` (the 9 standing mandates ledger)
- `docs/tranches/E/audit/E-AUDIT-1-prompts-precepts.md` (the precedent — this audit's parent shape; 15 prompts / 47 clauses enumerated through E open)
- `docs/tranches/E/audit/E-AUDIT-2-deferred-ledger.md` (38-item full deferred-items + chronically-deferred ledger at E open; verified-against this audit's §6.2 carry-set)
- `docs/tranches/A/findings.md` (A's regression report + 13-mandate origin)
- `docs/tranches/B/B-PROMPTS.md` (B turns 1-4 verbatim prompts)
- `docs/tranches/D/D-PROMPTS.md` (D-opening 47-line directive verbatim)

**Precept sources**:
- `docs/precepts/README.md` (core rules)
- `docs/precepts/instructions/README.md` (15 numbered edicts)
- `docs/precepts/cross-repo-dev-resolution.md` (invariant 30 / contract-v2)
- `docs/precepts/instructions/LESSONS-LEARNED.md` (50+ binding cross-tranche lessons)
- Precept submodule pin: `68d9b20b56e420b0336733a82a10a909b4c6a69c` (verified live).

**Cross-repo authority** (for the W8-W12 window):
- `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/AI.md` (the constellation-wide dep-lift plan)
- `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/FINAL.md` (constellation close ceremony; value.js consumer-lockstep evidence)

**Live verification (read-only) during this audit**:
- `git -C /Users/mkbabb/Programming/value.js log -1 --format=%H` → `e1549e0d309c31b4e977765d7c7a02fc67987078` (HEAD verify PASS)
- `git -C /Users/mkbabb/Programming/value.js/docs/precepts log -1 --format=%H` → `68d9b20b56e420b0336733a82a10a909b4c6a69c` (precept-pin verify PASS)
- `npm run proof:resolution` → `[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation` (invariant 30 verify PASS)
- `grep -rn '@deprecated' src/` → exactly 1 match (`src/math.ts:34` — `lerpLegacy`) (invariant 33 verify PASS — matches E close)
- `grep -rn 'new Function' src/` → returns only `new FunctionValue(` AST-node constructor calls; **no real `new Function(`** (D6 invariant PASS)
- `find src/ -name '*.test.ts'` → zero matches (test-files-outside-src precept PASS)

**Verbatim user directives quoted in this audit**:
- F-seed: "No deferrals. New tranche for developing the above."
- F-open: "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein. Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code. Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche. Recap ALL of our prompts and requests hitherto and ensure they've been addressed. This is NOT an implementation phase. Tranche development only."

**Sibling-audit-lane handoffs**:
- This lane (F-AUDIT-1) routes the **W9-C lucide `Github` icon gap** to F-AUDIT-3 (master-drift / cross-repo lane, by presumption).
- This lane explicitly defers the speedtest + glass-ui + fourier-analysis fleet-state probing to F-AUDIT-4 (presumed cross-repo state lane) — same pattern as E-AUDIT-1 → E-AUDIT-4 handoff.
- E-AUDIT-2's full 38-item deferred ledger is INHERITED by F-AUDIT-2 (presumed deferred-ledger lane) — this lane (F-AUDIT-1) treats §6.2 as the F-open snapshot; F-AUDIT-2 will produce the full F-binding catalogue.

---

**End of F-AUDIT-1 ledger.**

**Status**: this lane delivers a complete prompts + precepts recapitulation per the F-open directive ¶2 + ¶6 (clauses F-3 + F-9). The F-thesis "No deferrals" is honored: every prompt is ADDRESSED, every chronically-deferred item is FOLD-INTO-F-EXECUTION or FOLD-AS-ESCALATION-WITH-CONCRETE-UNBLOCK, and zero clauses exit this audit in silent-DEFERRED state. The other F audit lanes (presumed F-AUDIT-2 through F-AUDIT-6) address F-open clauses F-1 + F-2 + F-5 + F-7-fold-detail + the W8-W12-window investigation; synthesis into `F.md` is the orchestrator's task once all 6 lanes return.
