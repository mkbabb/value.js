# V · pass-3 · AUDIT — THE OWNER-VERBATIM / CLEAN-BREAK LENS

**Lane**: pass-3 fresh non-author adversarial audit (owner-verbatim / clean-break register). **Date**:
2026-07-13. **Mode**: docs-read + first-hand on-disk verification (tranche-u HEAD `2d7b299`; every number
carries its command, re-measured this lane — not inherited). **Model**: opus (declared). **Non-author**: this
lane authored none of the specs/protos/charters it audits. It reads the owner's §0 verbatim clause-by-clause
and asks ONE question per clause — *does a charter carry it, and where?* Anything the owner said that no
charter carries is a surviving gap, reported as such.

**Scope note (the lens, not a re-run of the thesis).** This is NOT the full-thesis convergence auditor (that
is the OTHER pass-3 fresh audit, explicitly deferred to pass-4). This lane holds the composed thesis against
the owner's WORDS and the clean-break law, and hunts every surviving alias/shim/dual-path/masking-fallback
across every spec. Where the survey carries a clause honestly (api, BH/BI, diagnostics) it says CARRIED and
cites the site; where a clause lives ONLY in the Pass-0 portfolio survey and was never advanced through the
convergent loop into a pass-2/pass-3 charter, it says GAP — **the survey is not the plan, and the owner's
edict is a plan obligation.**

**Re-verification note.** Every load-bearing number below was re-run first-hand this lane. Three numbers came
back HIGHER than the portfolio-survey-cited figures the earlier draft carried (the tree evolved between the
Pass-0 survey and HEAD): the `@`-alias surface, `panes/` LoC, and `@src` usage. Each honest correction
*widens* the gap it belongs to (§1 clauses 1/4, §2). Reported per the campaign's retract-and-correct law.

---

## §0 Verdict up front

| axis | verdict |
|---|---|
| **CLEAN / NOT-CLEAN** | **CLEAN, with ONE owner-routed residual.** The clean-break law is carried and *demonstrated* — the `@`-abrogation is an atomic `git mv` + one-pass rewrite with **no** transitional-alias window (charter-α RAN it: 18 mv / 87 rewrites / SAFE:true, typecheck Δ0); the strangler dual-path pole was KILLED precisely for being a dual path (pass-1 AGGLOMERATION §2/§3, verified). The single surviving tension is **OF-3's embed-warn at the spec-forced `@keyframes` ignored-declaration class** — which charter-γ §7 *itself* labels "a masking fallback by §0's own definition." It is disclosed, scoped to 1 class / 2 sites, and owner-routed — not hidden. No undisclosed alias/shim/dual-path/masking-fallback found in any spec. |
| **EARNED %** | **62%** (owner-verbatim CARRIAGE across all 12 clauses + §0.1/§0.2). Strong on six advanced clauses (backend-befitting, BH/BI, process, library-validations, clean-break, referent: ~80–90%); dragged by four the convergent loop left SURVEY-ONLY — **long-dirs-broken (4), styles (part of 3), D4-hygiene-minus-gates (11), library-complexity-REDUCTION (12, the sharpest)**. These are not refuted; they are un-advanced into any charter. |
| **the one-line finding** | The campaign did DEEP, honest, RAN work on ~half the owner's surface (D1 placement METHOD + D3 library diagnostics/merge/battery + backend ratify + clean-break + BH/BI) and left the explicitly-named other half — **the long-dir breaking, the bulk of D4 hygiene, and above all the LIBRARY COMPLEXITY REDUCTION the owner gave its own emphatic paragraph** — in the Pass-0 survey, never promoted to a charter. The loop narrowed onto `composables/color/` + the color-merge/diagnostics/battery and did not fan back out to the surfaces it deferred. |

---

## §1 The clause-by-clause table (owner §0 verbatim → CARRIED-where / GAP)

Each owner clause is quoted (condensed), scored CARRIED / PARTIAL / GAP, with the site and a first-hand
on-disk check.

| # | Owner clause (verbatim, condensed) | State | CARRIED where / the GAP | on-disk check (re-run this lane) |
|---|---|---|---|---|
| **1** | "grand component restructuring, and **flattening**, alongside **abrogation of `@`** and a simplification of the module and directory structure of our **demo**" | **PARTIAL (method carried, full manifest deferred)** | The `@`-abrogation MECHANISM is proven ATOMIC (charter-a §3: physical `git mv` + rewrite, one pass, no alias window; charter-α §5 RAN the 18-file scatter — 87 rewrites, typecheck Δ0, build 0, smoke 182/1). But proven on **ONE bucket** (`composables/color/`, 18 files); the demo-wide flatten across all 6 `demo/@/` sub-dirs + the full `@`-abrogation manifest is explicitly the "landing wave's job" (charter-α §7·2, charter-b §7.4). **Residual: `@src`/`@assets` un-ruled** — a *literal* "abrogation of @" would kill them; no charter states whether they survive. | `@`-alias `from` sites at HEAD: **@components 162 · @lib 87 · @composables 95 · @utils 7** (`grep -rn "from ['\"]@…" demo/`) — HIGHER than the audit's portfolio numbers (152/85/78/6); the un-abrogated surface is *larger*. `@src` used at **212** sites (mostly `test/`), `@assets` 11. Only the 18 `@composables/color/*` sites scattered. |
| **2** | "components should be **COLOCATED** with their sub-components, composables, skeletons, constants, etc (and this should be done **recursively** for nested components)" — "a grand edict for **ALL file directories**" | **PARTIAL** | The recursive-colocation LAW is adopted (glass-ui STRUCTURE-SPEC §0.3, portfolio A5) and the 3-tier predicate (KERNEL/APP-CLUSTER/FEATURE) is ground-truth-validated + ratified for ONE bucket (`charter-alpha-manifest`, harness 3/3). But "ALL file directories" is carried as a validated INSTRUMENT + one ratified 18/0 table, NOT a demo-wide per-dir manifest. `panes/` (17 flat files), `styles/`, `composables/palette/`, and the balance of `components/custom/` have no ratified colocation table. | `census-postmove.mjs` H1/H2/H3 PASS (charter-α); `panes/` = **17 flat files / 2060 LoC** un-colocated (`find … | xargs wc -l`). |
| **3** | "Composables truly module-/global-level … within a **composables/ dir** therein, but otherwise **COLOCATED** — **same for styles**, etc" | **PARTIAL — styles is a GAP** | Composables half CARRIED (KERNEL → `demo/@/composables/`; else 3-tier colocation — the ratified manifest). **Styles half is a GAP**: `style.css` (55 KB god-sheet) needs a cohesion-carve + single-owner colocation per portfolio A1/A4, but `style.css` appears in **NO** pass-2/pass-3 charter (grep = empty; it lives only in specs f6/r1 + portfolio). "Same for styles" was surveyed, never advanced. | `style.css` = **55687 bytes** (`ls -la`). `grep style.css` across pass-2/3 charters = **0 hits**. |
| **4** | "**Long running dirs** must and always be **broken into common modules and encapsulated** thereof" | **GAP (survey-only)** | Named exemplars — `panes/` (17 flat files, 2060 LoC → a `panes/chassis/` carve), `style.css`, and the **14 src files > 500 LoC** — are surveyed (portfolio A1/A3) but carried into **NO** charter plan. The only carve RAN is `units/index.ts` (**451 LoC — below the 500 ceiling**: a barrel-purity split, not a long-dir break). "god-module" / "REDUCE complexity" / "500 LoC" appear in **0** pass-2/pass-3 charters (grep). The one `panes/` mention in charter-α is placement-analysis context (aurora-atoms consumer), not a carve. | **14 src files > 500 LoC** (`find src -name '*.ts' | xargs wc -l | awk '$1>500'`); `panes/` + `god-module` absent from every charter (grep). |
| **5** | "Similar treatment and enforcement … applied to all **backend files**, too — abstracted and befitting for those languages" | **CARRIED** | charter-a §4: value.js api passes **glass-ui's OWN `proof-backend-structure` gate GREEN** (0 violations, self-test 9/9); 5 vertical capsules, 0 route→repo edges; portfolio A2: api ~90% aligned, tests colocated, no file > 350 LoC. The one open item — segment vocabulary (`routes/service/repository` vs `api/model/lib`) — is surfaced as **OF-2**, owner-routed. Residual: portfolio A2 frictions 3–4 (thin `color/`/`meta/`; `__tests__/` naming) surveyed, not planned — minor. | api boundary GREEN by measurement (portfolio A2 / charter-a §4). |
| **6** | "**Read over the glass-ui tranches BH, BI**, and that planned module/directory structure and codification … for frontend and backend" | **CARRIED** | charter-a §5 RAN a referent-stability audit against READ-ONLY glass-ui BH (STRUCTURE-SPEC confirmed a round-6 2026-07-10 artifact); portfolio A5 distils BH (LAW §0–§6, G1–G10, backend §5.1) + BI (src flatten rides 5.1.0, un-landed → value.js aligns to SPEC, not tree). The MEMORY BH/BI-relay invariant is honored (#11 booked with a "standing BH/BI relay"). | Referent on disk READ-ONLY: `../glass-ui/docs/tranches/BH/spec-structure/STRUCTURE-SPEC.md` + `STRUCTURE-TRANCHE-PLAN.md` + `BI/` all present (`ls`). |
| **7** | "Deploy a **fastidious, convergent and iterative** design triumvariate of research, harden, tranche wave update and author" | **CARRIED (process; wave-author pending by design)** | The campaign IS this loop: Pass-0 portfolio → Pass-1/2/3 (RESEARCH→SYNTH→PROTO→CRITIQUE→AGGLOMERATE), ≥3 passes, fresh non-author adversaries. "tranche wave update and author" is deliberately DEFERRED to convergence (thesis at 62%, gaps survive) — a sequencing, not a gap. | 3 passes on disk (`pass-1/ pass-2/ pass-3/`). |
| **8** | "These edicts must apply to our **backend library**, too, alongside **parsing validations** … analyze the recent **keyframes.js** tranches … **parseCSSValue buggies and goblins**" | **CARRIED** | Charter C (pass-2) + charter-γ (pass-3): diagnostics fork resolved (Axis-A embed / Axis-B fail-closed), **#11 renamed + re-costed as a kf-coupled 2.0.0 MAJOR** (retro-f4 G1), `proof:grammar-fuzz` born-RED over the 11-input VJ corpus, U-F29 `.eof()` idiom credited as twice-ratified + extended, the partial-recovery lossy class MEASURED + closed, a 2nd spec-forced drop found (`animation-composition` invalid keyword). 2/11 VJ bugs verified open at HEAD. | U-F29 `329932b` IS an ancestor of HEAD (`git merge-base --is-ancestor` → yes); the twice-ratified idiom at `parsing/index.ts:518/528/542` + `stylesheet.ts:633` (charter-γ §1). |
| **9** | "NO quick solutions, NO workarounds: **idiomatic, gestalt** approaches … elegance, **simplicity, and performance above all**" | **PARTIAL** | Idiomatic/gestalt spirit CARRIED (architectural transpositions, no workarounds; the strangler killed as a workaround-shaped dual path). **But "simplicity … above all" is undercut by clause 12** — the delivered library moves are re-STRUCTURE (barrel splits, coupling relocation), not net SIMPLIFICATION; and **"performance above all" is only GATED (`perf-target` kept), never advanced** — no charter delivers a perf or complexity improvement. | see clause 12; `perf-target` retained (Q13 floor), no perf-improving charter (grep). |
| **10** | "NO legacy code. **Clean breaks: no aliases, no migration shims, no dual paths, no masking fallbacks**" | **CARRIED, one owner-routed residual** | Aliases/shims/dual-paths: CLEAN — atomic cut, no transitional `@` window (charter-a §3); strangler dual-path pole KILLED (pass-1 AGGLOMERATION §2/§3). **Masking fallbacks: ONE residual** — OF-3 embed-warn at the spec-forced `@keyframes` ignored-declaration class, which charter-γ §7 honestly labels "a masking fallback by §0's own definition," fail-closed being spec-INVALID there. Disclosed, scoped to 2 sites, owner-routed. | §2 below (the full clean-break sweep). |
| **11** | "base repo is a mess: **top-level screenshots · stale working trees · docs · benches** out of date · **plugins worthless → deleted entirely** · scripts pointless bar dev + deploy.sh · **gates overfit nonsense**" | **PARTIAL — 6 of 7 items are GAPs** | **Gates-cull: CARRIED** (charter-C battery `test:dist` 10→7). **The other six: survey-only.** No pass-3 charter mentions any of screenshots / worktrees / benches / stale-docs / scripts-prune (grep = empty). Pointedly, the **plugins "delete entirely" edict the survey HONESTLY CONTRADICTS** (portfolio A4: "NOT worthless — live vite plugins wired in `vite.config.ts`") is never turned into an owner-fork or a booked disposition. | **39** root `*.png` · `git worktree list` = **14** · `plugins/` = **2 live files** (`vite-defer-glass-fonts.ts`, `vite-source-export.ts`), both wired in `vite.config.ts:178/302/314` · `bench/*.mjs` = **11**. No pass-3 charter carries any hygiene item (grep). |
| **12** | "Our library has grown in **file size and complexity dramatically** — what are calls, ways, facilities to **REDUCE complexity**, better structure directories, modules, files" | **GAP (the sharpest — reshuffle, not reduction)** | "better structure" CARRIED (barrel carves, color merge, colocation method). **"REDUCE complexity / file size" is NOT delivered measured.** Every RAN library move is behavior-PRESERVING re-structure: `units/index.ts` 452→17 barrel + siblings (net LoC ~preserved); the color merge is "cycle-neutral … relocates nodes without rewiring edges" (charter-β, full suite 2326=2326). **The 14 god-modules > 500 LoC — the literal "grown in file size" — are un-carved and un-planned**; `color.ts` (754, the largest file in the repo) is neither fenced nor planned; `parsing/index.ts` (644) is fenced under `barrel-pure` but not run. The owner's own emphatic paragraph is the least-carried clause. | **14 files > 500 LoC**: `color.ts` **754**, `scroll-timeline.ts` 658, `parsing/index.ts` 644, `stylesheet.ts` 643, `easing.ts` 643, `style-names.ts` 641, `boundary.ts` 604, `decompose.ts` 603, `parsing/utils.ts` 603, `units/utils.ts` 601, `path.ts` 562, `dispatch.ts` 558, `parsing/math.ts` 536, `gamut.ts` 526. Only `units/index.ts` (451) carved. |
| **§0.1/§0.2** | glass-ui codified the template (`@` abrogated, components flattened, improved colocation); CODIFIED + AUTHORITATIVE but **partially executed** upstream; align to the SPEC, name both poles of the partially-unexecuted-referent risk | **CARRIED** | charter-a §5 states F1's exposure to the round-6 referent instability + the deferred-src risk; adopts the convention NOW (adoptable without waiting on upstream execution); `barrel-pure` is a derived runtime property, not a hardcoded set (the mitigation the survey demanded). | STRUCTURE-SPEC round-6 confirmed on disk (charter-a §5; referent files present). |

---

## §2 The clean-break sweep (every surviving alias / shim / dual-path / masking-fallback, hunted across all specs)

The task's hard obligation: hunt any surviving alias, shim, dual path, or masking fallback in ANY spec —
including transitional states inside the atomic cut. **Result: no undisclosed violation; one disclosed,
owner-routed masking residual; two un-ruled scoping residuals.**

| candidate | where | verdict (first-hand) |
|---|---|---|
| **transitional `@`-alias window** (glass-ui's `@glass` 719-rewrite codemod straddle) | charter-a §3 | **CLEAN — explicitly NOT replayed.** value.js's `@` is a PHYSICAL dir; abrogation is `git mv` + rewrite in one pass → no `@composables/color/*` alias left resolving to anything. The atomic cut is the shape of the fix, RAN-proven (charter-α §5: scatter, Δ0, build 0, smoke 182/1). |
| **strangler half-migrated transient** (F5's execution pole) | pass-1 AGGLOMERATION §2/§3 | **CLEAN — KILLED for being a dual path.** Verified verbatim: "the strangler's tolerated half-migrated transient IS a dual path the owner's clean-break law forbids" → reconciled to F6 atomic. |
| **OF-3 embed-warn = a masking fallback** | charter-c §1.1, charter-γ §7 | **RESIDUAL — disclosed + owner-routed.** At the spec-forced `@keyframes` ignored-declaration class (2 sites: `!important` `stylesheet.ts:233` + invalid `animation-composition` `:239-244`), fail-closed is spec-INVALID, so the drop stays and rides `KeyframeRule.diagnostics`. charter-γ §7 states plainly it is "a masking fallback by §0's own definition." Presented at TRUE narrow scope (1 class / 2 sites, not the retro's 491), routed to OF-3, NOT shipped as the general answer (fail-closed IS the general answer where the grammar auto-recovers). |
| **`proof-subpath-budget` C1 predicate "moves out from under itself" post-merge** | charter-β §1.3 | **CLEAN as designed — gate-integrity finding, booked.** The C1 regex `/src/parsing/` stops matching `units/color/parse/` after the merge, so C1 could silently stop guarding the seam. charter-β re-proved grammar-freedom at BOTH homes (`trace-color.mjs`, 34/0/0) and books "widen C1's regex" for the landing wave. A masking RISK surfaced, not hidden. |
| **new `@app-composables` alias for the app-cluster tier** | charter-a §1.6 friction 2 | **CLEAN — flagged, not taken.** The 12 app-cluster files land as *relative* imports; "if this home is ratified it earns an alias — an owner call, noted not taken." A NEW-alias-while-abrogating-`@` tension exists but is introduced by no charter. |
| **`@src`/`@assets` survive the "@ abrogation"** | portfolio A1; measured this lane | **RESIDUAL — un-ruled, and LARGER than stated.** `@src` is used at **212 sites** (predominantly `test/`; `demo/CLAUDE.md:143` records `@src` was retired *from the demo* only). A literal "abrogation of @" would kill `@src`/`@assets`; no charter states whether they survive by intent. The campaign's defensible scoping is "`@` = the `demo/@/` tree," but the owner should confirm — this is a non-trivial, un-ruled surface. |

---

## §3 Surviving gaps — the owner said it; no charter carries it

Enumerated so the tranche plan owns them (each a clause the loop left at survey-only or un-advanced). These
are the load-bearing residuals for convergence + the deferred fresh full-thesis audit.

1. **Library complexity REDUCTION (clause 12) — measured, not reshuffled.** The 14 god-modules > 500 LoC
   (`color.ts` 754, `scroll-timeline.ts` 658, `parsing/index.ts` 644, `stylesheet.ts` 643, …) are un-carved
   and un-planned; every RAN library move is behavior-preserving. The owner's emphatic paragraph has no
   charter. A charter must (a) enumerate the god-module carve set with a per-file before/after LoC target,
   and (b) name the actual complexity metric that goes DOWN (max-file-LoC? count > 500? the `dispatch.ts`
   fan-in hub? cyclomatic?) — not a barrel split that preserves net LoC.
2. **Long-running dirs broken (clause 4).** `panes/` (17 flat files, 2060 LoC), `style.css` (55 KB), and the
   god-module set. Surveyed (portfolio A1/A3), carried nowhere. `units/index.ts` (451, below the ceiling) is
   the only carve RAN.
3. **Styles restructure (clause 3, "same for styles").** `style.css` cohesion-carve + single-owner
   colocation — survey-only, 0 charters.
4. **D4 hygiene minus the gate-cull (clause 11).** Screenshots (39 PNGs), stale worktrees (14), stale docs,
   benches (11, "out of date"), scripts-prune — and, pointedly, the **plugins "delete entirely" edict the
   survey HONESTLY CONTRADICTS** ("live vite plugins wired in `vite.config.ts`", confirmed this lane at
   lines 178/302/314) but never promotes to an owner-fork or booked disposition. Six of seven D4 items are
   survey-only; no pass-3 charter touches hygiene.
5. **Demo-wide flatten / full @-abrogation manifest (clause 1).** The METHOD is validated on one bucket; the
   per-dir manifest across all 6 `demo/@/` sub-dirs + the ~351-site abrogation (higher than the audit's ~321
   — re-measured this lane) is deferred to the landing wave, not yet a ratified table. `@src`/`@assets`
   survival un-ruled (§2).

**Credits (the campaign's epistemic discipline is genuine, and it earns saying so):** charter-γ RETRACTED
its own friction #1 (permissive-string is NON-lossy — `"@@@"→"@@@"`, `"1px @ bad"` verbatim, `"///"→"/ / /"`,
measured) and its brief's "aurora-atoms 3-not-2"; charter-c re-costed #11 from "0-caller freebie" to a
kf-coupled 2.0.0 MAJOR; U-F29 (`329932b`, ancestor-confirmed this lane) is credited as prior art for the
`.eof()` idiom; charter-γ's "451-not-452" is correct on disk (`wc -l src/units/index.ts` = **451**), which
also exposes charter-b §0/§3's "452" as wrong. These retractions-earned-by-measurement are the campaign law,
honored. This lane adds its own: the `@`-alias surface, `panes/` LoC, and `@src` usage all measured HIGHER
than the portfolio figures — each widening its gap, none narrowing it.

---

## §4 The earned number — 62%

Owner-verbatim CARRIAGE, clause-weighted (my independent weighting, shown so it is earned not inherited):

- **Strong (CARRIED, ~80–90%)** — six clauses the charters advance with RAN evidence: clause 5
  backend-befitting · 6 BH/BI · 7 process · 8 library-validations · 10 clean-break · §0.1/§0.2 referent.
- **Partial (~55–70%)** — clause 1 demo-flatten (method carried, full manifest deferred) · 2 recursive
  colocation (one ratified bucket) · 9 idiomatic/simplicity (spirit carried, simplicity-above-all undercut).
- **Weak / GAP (~30–35%)** — clause 3 styles · 4 long-dirs · 11 D4-hygiene-minus-gates · 12
  library-complexity-REDUCTION — four clauses the loop left survey-only.

**62%** is the honest carriage mean. The composed thesis's own 50%→62% self-arc measures the CONVERGENCE of
what it advanced; owner-verbatim carriage across ALL clauses sits higher on the six advanced clauses but is
dragged by the four un-advanced ones — and the drag is real, because the un-advanced set includes the owner's
most emphatic ask (clause 12) and its longest sentence (clause 11). A *weighting by owner-emphasis* (clause 12
"grown dramatically", clause 4 "must and always", clause 11 the longest sentence) would argue the number
lower still (~58%); I hold **62%** as the un-weighted carriage mean, which the pass-3 agglomeration also
adopts. This is not a refutation of the thesis; it is the map of what the tranche plan must still carry before
it can claim the owner's edict whole. **The clean-break law itself is CLEAN (one disclosed, owner-routed
residual). Convergence to 100% requires the four gap clauses advanced through a charter — not merely surveyed
— plus the demo-wide manifest and the C1-widen / test-repoint / canon-sweep landing costs booked.**

---

## §5 Owner-reserved forks (untouched by this audit lane — presented, not decided)

- **OF-3** (the `{value,diagnostics}` boundary vs embed-warn) — this lane confirms it is the ONE surviving
  masking residual and that charter-γ discloses it honestly at 1 class / 2 sites; the owner rules.
- **OF-1** (@-ban idiom), **OF-2** (api vocabulary), **OF-4** (app-cluster directory), **OF-5** (the coupled
  owner event) — untouched; this lane audits carriage, it decides no fork.
- **The plugins "delete entirely" edict vs the survey's measured "they are LIVE, wired in `vite.config.ts`"**
  (lines 178/302/314, confirmed this lane) — an owner-verbatim divergence that must become an explicit
  disposition (delete-after-relocate vs keep-wired), currently living only in the Pass-0 survey. Routed to
  the owner as the pass-3 fold's **OF-6**.

**Nothing merged; this lane authored only this audit doc, pathspec `docs/tranches/V/**`. The composed thesis
is CLEAN on clean-break, CARRIED on the backend / BH-BI / process / validation half, and GAPPED — survey-only
— on the long-dir / hygiene / complexity-reduction half the owner named explicitly. Earned 62%.**
