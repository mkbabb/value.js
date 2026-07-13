# V · pass-3 · AUDIT — THE OWNER-VERBATIM / CLEAN-BREAK LENS

**Lane**: pass-3 fresh non-author adversarial audit (owner-verbatim / clean-break register). **Date**:
2026-07-13. **Mode**: docs-read + on-disk verification (tranche-u HEAD; every number carries its command).
**Model**: opus (declared). **Non-author**: this lane authored none of the specs/protos/charters it audits;
it reads the owner's §0 verbatim clause-by-clause and asks ONE question per clause — *does a charter carry
it, and where?* Anything the owner said that no charter carries is a surviving gap, reported as such.

**Scope note (the lens, not a re-run).** This is NOT the full-thesis convergence auditor (that is the other
pass-3 fresh audit). This lane holds the composed thesis against the owner's WORDS and the clean-break law,
and hunts every surviving alias/shim/dual-path/masking-fallback across every spec. Where the survey already
carries a clause honestly (api, BH/BI, diagnostics) it says CARRIED and cites the site; where a clause lives
ONLY in the Pass-0 portfolio survey and was never advanced through the convergent loop into a charter/plan,
it says GAP — because the survey is not the plan, and the owner's edict is a plan obligation.

---

## §0 Verdict up front

| axis | verdict |
|---|---|
| **CLEAN / NOT-CLEAN** | **CLEAN, with ONE owner-routed residual.** The clean-break law is carried and *demonstrated* (atomic `git mv` + one-pass rewrite, **no** transitional-alias window; the strangler dual-path pole was KILLED precisely for being a dual path; the F6 vehicle is the clean-break mechanism). The single surviving tension is **OF-3 embed-warn at the spec-forced `@keyframes` ignored-declaration class** — which charter-γ §4/§7 *itself* discloses is "a masking fallback by §0's own definition." It is disclosed + owner-routed, not hidden. No undisclosed alias/shim/dual-path found in any spec. |
| **EARNED %** | **62%** (owner-verbatim CARRIAGE across all 12 clauses + §0.1/§0.2). High on the five advanced clauses (backend-befitting, BH/BI, process, library-validations, clean-break: ~80–90%); dragged by four clauses the convergent loop left at SURVEY-ONLY — **long-dirs-broken (clause 4), D4-hygiene-minus-gates (clause 11), library-complexity-REDUCTION (clause 12), styles-restructure (part of clause 3)**. These are not refuted; they are un-advanced into any charter. |
| **the one-line finding** | The campaign did DEEP, honest, RAN work on ~half the owner's surface (D1 placement METHOD + D3 library diagnostics/merge/battery + backend ratify + clean-break + BH/BI) and left the other explicitly-named half — **the long-dir breaking, the bulk of D4 hygiene, and above all the LIBRARY COMPLEXITY REDUCTION the owner gave its own paragraph** — in the Pass-0 survey, never promoted to a charter. The convergent loop narrowed onto `composables/color/` + the color-merge/diagnostics/battery and did not fan back out to the surfaces it deferred. |

---

## §1 The clause-by-clause table (owner §0 verbatim → CARRIED-where / GAP)

Each owner clause is quoted, then scored CARRIED (a charter advances it) / PARTIAL / GAP (survey-only or
absent), with the site and the on-disk check.

| # | Owner clause (verbatim, condensed) | State | CARRIED where / the GAP | on-disk check |
|---|---|---|---|---|
| **1** | "grand component restructuring, and **flattening**, alongside **abrogation of `@`** and a simplification of the module and directory structure of our **demo**" | **PARTIAL (method carried, full manifest deferred)** | The @-abrogation MECHANISM is proven ATOMIC (charter-a §3: physical `git mv` + rewrite, one pass, no alias window; charter-α §5 RAN the 18-file scatter, 87 rewrites, typecheck Δ0, build 0, smoke 182/1). But this is proven on **ONE bucket** (`composables/color/`); the general demo flatten across all 6 `demo/@/` sub-dirs + the whole ~321-site @-abrogation manifest is explicitly the "landing wave's job" (charter-α §7·2, charter-b §7.4). **Residual: `@src`/`@assets` aliases survive un-ruled** — portfolio A1 notes `@src` "SURVIVES (vitest + `?source` only)"; no charter rules whether a *literal* "abrogation of @" keeps them. | `@` alias sites: `@components` 152 · `@lib` 85 · `@composables` 78 · `@utils` 6 (portfolio A1). Only the 18 `@composables/color/*` sites scattered. |
| **2** | "components should be **COLOCATED** with their sub-components, composables, skeletons, constants, etc (and this should be done **recursively** for nested components)" — "a grand edict for **ALL file directories**" | **PARTIAL** | The recursive-colocation LAW is adopted (glass-ui STRUCTURE-SPEC §0.3, portfolio A5) and the 3-tier predicate (KERNEL/APP-CLUSTER/FEATURE) is ground-truth-validated + ratified for one bucket (charter-α-manifest, harness 3/3). But "ALL file directories" is carried as a validated INSTRUMENT + one ratified table, NOT as a demo-wide per-dir manifest. `panes/`, `styles/`, `composables/palette/` (F3-sealed, cited) and the balance of `demo/@/components/` have no ratified colocation table. | 214 demo source files; colocation ~60% landed at the leaf, the failure at the globals (portfolio A1). |
| **3** | "Composables truly module-/global-level … within a **composables/ dir** therein, but otherwise **COLOCATED** — **same for styles**, etc" | **PARTIAL — styles is a GAP** | Composables half CARRIED (KERNEL → `demo/@/composables/`; else the 3-tier colocation — charter-α-manifest). **Styles half is a GAP**: portfolio A1/A4 flags `style.css` (55 KB god-sheet) needs a "cohesion carve" + single-owner colocation, but **`style.css` appears in NO pass-2/pass-3 charter** (grep: only specs f6/r1 + portfolio). The owner's "same for styles" was never advanced. | `style.css` in V docs: `pass-1/protos/f6`, `research/r1`, `portfolio` only — 0 charters. |
| **4** | "**Long running dirs** must and always be **broken into common modules and encapsulated** thereof" | **GAP (survey-only)** | Named exemplars — `panes/` (16 flat files, 2009 LoC → a `panes/chassis/` carve), `style.css`, and the **14 src files > 500 LoC** (`color.ts` 754, `scroll-timeline.ts` 658, `parsing/index.ts` 644, …) — are surveyed in portfolio A1/A3 but carried into **NO charter plan**. The only carve RAN is `units/index.ts` (451 LoC — *below* the 500 ceiling, a barrel-purity split, not a long-dir break). `god-module` appears in pass-1 docs + portfolio, **never in a pass-2/pass-3 charter**. | 14 src files > 500 LoC on disk (`find src -name '*.ts' \| xargs wc -l \| awk '$1>500'`). `panes/`, `god-module` absent from pass-3 charters (grep). |
| **5** | "Similar treatment and enforcement … applied to all **backend files**, too — abstracted and befitting for those languages" | **CARRIED** | charter-a §4: value.js api passes **glass-ui's OWN `proof-backend-structure` gate GREEN** (0 violations, self-test 9/9); 5 vertical capsules, 0 route→repo edges; portfolio A2: api ~90% aligned, tests colocated, no file > 350 LoC. The one open item — segment vocabulary (`routes/service/repository` vs `api/model/lib`) — is surfaced as **OF-2**, owner-routed not pre-decided. Residual: portfolio A2 frictions 3–4 (thin `color/`/`meta/` modules; `__tests__/` naming) are surveyed, not planned — minor. | api boundary GREEN by measurement (portfolio A2). |
| **6** | "**Read over the glass-ui tranches BH, BI**, and that planned module/directory structure and codification … for frontend and backend" | **CARRIED** | charter-a §5 RAN a referent-stability audit against READ-ONLY glass-ui BH (recovered divergences #4–5, confirmed STRUCTURE-SPEC is a round-6 2026-07-10 artifact); portfolio A5 distils BH (LAW §0–§6, G1–G10, backend §5.1) + BI (src flatten rides 5.1.0, un-landed → value.js aligns to SPEC not tree). The **BH/BI relay** obligation (MEMORY invariant) is honored: #11 is booked with a "standing BH/BI relay" (AGGLOMERATION §4 booked-not-forked). | glass-ui BH read READ-ONLY; align-to-SPEC stated (charter-a §5). |
| **7** | "Deploy a **fastidious, convergent and iterative** design triumvariate of research, harden, tranche wave update and author" | **CARRIED (process; wave-author pending by design)** | The campaign IS this loop: Pass-0 portfolio → Pass-1/2/3 (RESEARCH→SYNTH→PROTO→CRITIQUE→AGGLOMERATE), ≥3 passes, fresh non-author adversaries. "tranche wave update and author" is deliberately DEFERRED to convergence (the composed thesis is 50%, pass-3 in flight) — not a gap, a sequencing. | 3 passes on disk (`pass-1/ pass-2/ pass-3/`). |
| **8** | "These edicts must apply to our **backend library**, too, alongside **parsing validations** … analyze the recent **keyframes.js** tranches … **parseCSSValue buggies and goblins**" | **CARRIED** | Charter C (pass-2) + charter-γ (pass-3): diagnostics fork resolved (Axis-A embed / Axis-B fail-closed), **#11 renamed + re-costed as a kf-coupled 2.0.0 MAJOR** (retro-f4 G1), `proof:grammar-fuzz` born-RED over the 11-input VJ corpus, U-F29 `.eof()` idiom credited + extended, the partial-recovery lossy class measured + closed, a SECOND spec-forced drop found (`animation-composition` invalid keyword). 2/11 VJ bugs verified open at HEAD. Strong. | VJ corpus + `.eof()` at `parsing/index.ts` (portfolio A6, charter-γ §1). |
| **9** | "NO quick solutions, NO workarounds: **idiomatic, gestalt** approaches … elegance, **simplicity, and performance above all**" | **PARTIAL** | Idiomatic/gestalt spirit CARRIED (architectural transpositions, no workarounds; strangler killed as a workaround-shaped dual path). **But "simplicity … above all" is undercut by clause 12** — the delivered moves are re-STRUCTURE (barrel splits, coupling relocation), not net SIMPLIFICATION; and **performance is only GATED (`perf-target` kept), never advanced** — no charter delivers a perf or complexity improvement. | see clause 12. |
| **10** | "NO legacy code. **Clean breaks: no aliases, no migration shims, no dual paths, no masking fallbacks**" | **CARRIED, one owner-routed residual** | Aliases/shims/dual-paths: CLEAN — atomic cut, no transitional `@` window (charter-a §3); strangler dual-path pole KILLED (AGGLOMERATION-pass-1 §2·F5). **Masking fallbacks: ONE residual** — OF-3 embed-warn at the spec-forced `@keyframes` ignored-declaration class, which charter-γ §4/§7 honestly labels "a masking fallback by §0's own definition," fail-closed being spec-INVALID there. Disclosed, scoped to 2 sites, owner-routed. | §2 below (the clean-break sweep). |
| **11** | "base repo is a mess: **top-level screenshots · stale working trees · docs · benches** out of date · **plugins worthless → deleted entirely** · scripts pointless bar dev + deploy.sh · **gates overfit nonsense**" | **PARTIAL — 6 of 7 items are GAPs** | **Gates-cull: CARRIED** (charter-C battery `test:dist` 10→7; portfolio A4 gate table). **The other six: survey-only.** `screenshot` appears in V docs ONLY in the owner quote — no deletion plan (39 PNGs still on disk). `worktree` cleanup: no plan (14 worktrees on disk, survey said 2). `plugins`: portfolio A4 CONTRADICTS the owner ("NOT worthless — BOTH are live vite plugins wired in `vite.config.ts`") — an honest correction, but it lives only in the survey and is never turned into an owner-fork or a booked disposition. `bench`, stale `docs`, `scripts`-prune: survey-only, no charter. **No pass-3 charter mentions any D4 hygiene item** (grep = empty). | 39 root `*.png`; `git worktree list` = 14; `plugins/` = 2 live files; `bench/*.mjs` = 11. No pass-3 charter carries hygiene. |
| **12** | "Our library has grown in **file size and complexity dramatically** — what are calls, ways, facilities to **REDUCE complexity**, better structure directories, modules, files" | **GAP (the sharpest — reshuffle, not reduction)** | "better structure" CARRIED (barrel carves, color merge, colocation method). **"REDUCE complexity / file size" is NOT delivered measured.** Every RAN library move is behavior-PRESERVING re-structure: `units/index.ts` 452→17 barrel + 4 siblings (net LoC ~preserved, one dead `UNITS` import dropped); the color merge is "cycle-neutral … relocates graph nodes without rewiring edge semantics" (charter-β §5, full suite 2326=2326). **The 14 god-modules > 500 LoC — the literal "grown in file size" — are un-carved and un-planned**; `parsing/index.ts` (644, born-RED under `barrel-pure`) is fenced but not run; `color.ts` (754, the largest file in the repo) is neither fenced nor planned. The owner's own emphatic paragraph is the least-carried clause. | 14 files > 500 LoC on disk; only `units/index.ts` (451) carved. |
| **§0.1/§0.2** | glass-ui codified the template (`@` abrogated, components flattened, improved colocation); CODIFIED + AUTHORITATIVE but **partially executed** upstream; align to the SPEC, name both poles of the partially-unexecuted-referent risk | **CARRIED** | charter-a §5 states F1's exposure to the round-6 referent instability + the deferred-src risk; adopts the convention NOW (adoptable without waiting on upstream execution); `barrel-pure` is a derived runtime property, not a hardcoded set (the mitigation the survey demanded). | STRUCTURE-SPEC round-6 confirmed on disk (charter-a §5). |

---

## §2 The clean-break sweep (every surviving alias / shim / dual-path / masking-fallback, hunted across all specs)

The task's hard obligation: hunt any surviving alias, shim, dual path, or masking fallback in ANY spec —
including transitional states inside the atomic cut. Result: **no undisclosed violation; one disclosed,
owner-routed masking residual.**

| candidate | where | verdict |
|---|---|---|
| **transitional `@`-alias window** (glass-ui's `@glass` 719-rewrite codemod straddle) | charter-a §3 | **CLEAN — explicitly NOT replayed.** value.js's `@` is a PHYSICAL dir; abrogation is a `git mv` + rewrite in one pass → "no `@composables/color/*` alias left resolving to anything." The atomic cut is the shape of the problem, RAN-proven (charter-α §5: scatter, Δ0, build 0, smoke). |
| **strangler half-migrated transient** (F5's execution pole) | AGGLOMERATION-pass-1 §2·F5 | **CLEAN — KILLED for being a dual path.** "the strangler's tolerated half-migrated transient IS a dual path the owner's clean-break law forbids" → reconciled to F6 atomic. |
| **OF-3 embed-warn = a masking fallback** | charter-c §1.1, charter-γ §4/§7 | **RESIDUAL — disclosed + owner-routed.** At the spec-forced `@keyframes` ignored-declaration class (2 sites: `!important` D1 + invalid `animation-composition` D2), fail-closed is spec-INVALID, so the drop stays and rides `KeyframeRule.diagnostics`. charter-γ §7 states plainly: "a consumer ignoring `KeyframeRule.diagnostics` sees the identical silent-drop — a masking fallback by §0's own definition." **Presented at true narrow scope (1 class / 2 sites, not the retro's 491), routed to the owner (OF-3), not shipped as the general answer** (fail-closed IS the general answer everywhere the grammar auto-recovers). |
| **`proof-subpath-budget` C1 predicate "moves out from under itself" post-merge** | charter-β §1.3 | **CLEAN as designed — gate-integrity finding, booked.** The C1 regex `/src/parsing/` no longer matches `units/color/parse/` after the merge, so C1 could silently stop guarding the seam. charter-β re-proved the property at BOTH homes (`trace-color.mjs`, 34/0/0) and books "widen C1's regex" for the landing wave. A masking RISK, surfaced not hidden. |
| **new `@app-composables` alias for the app-cluster tier** | charter-a §1.6 friction 2 | **CLEAN — flagged, not taken.** The 12 app-cluster files land as *relative* imports (no new alias asserted); "if this home is ratified it earns an alias — an owner call, noted not taken." A NEW-alias-while-abrogating-`@` tension exists but is not introduced by any charter. |
| **`@src`/`@assets` survive the "@ abrogation"** | portfolio A1 | **RESIDUAL — un-ruled.** The campaign scopes "@ abrogation" to the `demo/@/` tree + its 4–5 aliases (defensible per §0.1: "`@` abrogated, components flattened"). But a *literal* reading of "abrogation of @" would also kill `@src`/`@assets`; no charter states whether they survive by intent. Minor; owner should confirm the scoping. |

---

## §3 Surviving gaps — the owner said it; no charter carries it

Enumerated so the tranche plan owns them (each is a clause the convergent loop left at survey-only or
un-advanced). These are the load-bearing residuals for pass-3 convergence + the fresh full audit.

1. **Library complexity REDUCTION (clause 12) — measured, not reshuffled.** The 14 god-modules > 500 LoC
   (`color.ts` 754, `scroll-timeline.ts` 658, `parsing/index.ts` 644, `stylesheet.ts` 643, …) are un-carved
   and un-planned. Every RAN library move is behavior-preserving re-structure. The owner's emphatic
   paragraph has no charter. **A charter must (a) enumerate the god-module carve set with a per-file
   before/after LoC target, and (b) name the actual complexity metric that goes DOWN** (file count? LoC?
   cyclomatic? the `dispatch.ts` fan-in hub?) — not a barrel split that preserves net LoC.
2. **Long-running dirs broken (clause 4).** `panes/` (16 flat files, 2009 LoC), `style.css` (55 KB), and the
   god-module set. Named in portfolio A1/A3, carried nowhere. `units/index.ts` (451, below the ceiling) is
   the only carve RAN.
3. **Styles restructure (clause 3, "same for styles").** `style.css` cohesion-carve + single-owner
   colocation — survey-only, 0 charters.
4. **D4 hygiene minus the gate-cull (clause 11).** Screenshots (39 PNGs), stale worktrees (14), stale docs,
   benches (11, "out of date"), scripts-prune, and — pointedly — the **plugins "delete entirely" edict the
   survey HONESTLY CONTRADICTS** ("NOT worthless — live vite plugins wired in `vite.config.ts`") but never
   promotes to an owner-fork or booked disposition. Six of seven D4 items are survey-only; no pass-3 charter
   touches hygiene.
5. **Demo-wide flatten / full @-abrogation manifest (clause 1).** The METHOD is validated on one bucket; the
   per-dir manifest across all 6 `demo/@/` sub-dirs + the ~321-site abrogation is deferred to the landing
   wave, not yet a ratified table. `@src`/`@assets` survival un-ruled.

**Credits (the campaign's epistemic discipline is genuine, and it earns saying so):** charter-γ RETRACTED
its own friction #1 (permissive-string is NON-lossy, measured verbatim) and its brief's "aurora-atoms 3-not-2"
(honest self-refutation by measurement); charter-c re-costed #11 from "0-caller freebie" to a kf-coupled 2.0.0
MAJOR; U-F29 (`329932b`) is credited as prior art for the `.eof()` idiom; charter-γ's "451-not-452" is correct
on disk (`wc -l src/units/index.ts` = **451**) — which also exposes charter-b §0/§3's "452" as the wrong
number. These retractions-earned-by-measurement are exactly the campaign law, honored.

---

## §4 The earned number — 62%

Owner-verbatim CARRIAGE, clause-weighted:

- **Strong (CARRIED, ~80–90%)**: clause 5 backend-befitting · clause 6 BH/BI · clause 7 process · clause 8
  library-validations · clause 10 clean-break · §0.1/§0.2 referent — six clauses the charters advance with
  RAN evidence.
- **Partial (~55–70%)**: clause 1 demo-flatten (method carried, full manifest deferred) · clause 2 recursive
  colocation (one ratified bucket) · clause 9 idiomatic/simplicity (spirit carried, simplicity undercut).
- **Weak / GAP (~30–35%)**: clause 3 styles · clause 4 long-dirs · clause 11 D4-hygiene-minus-gates · clause
  12 library-complexity-REDUCTION — four clauses the loop left survey-only.

**62%** is the honest carriage mean: the composed thesis's own 50% self-score measures the CONVERGENCE of what
it advanced; owner-verbatim carriage across ALL clauses sits higher on the six advanced clauses but is dragged
by the four un-advanced ones — and the drag is real, because the un-advanced clauses include the owner's most
emphatic ask (clause 12) and its longest sentence (clause 11). This is not a refutation of the thesis; it is
the map of what the tranche plan must still carry before it can claim the owner's edict whole. The clean-break
law itself is CLEAN (one disclosed, owner-routed residual). **Convergence to 100% requires the four gap
clauses advanced through a charter — not merely surveyed — plus the demo-wide manifest and the C1-widen /
test-repoint / canon-sweep landing costs booked.**

---

## §5 Owner-reserved forks (untouched by this audit lane — presented, not decided)

- **OF-3** (the `{value,diagnostics}` boundary vs embed-warn) — this lane confirms it is the ONE surviving
  masking residual and that charter-γ discloses it honestly at 1 class / 2 sites; the owner rules.
- **OF-1** (@-ban idiom), **OF-2** (api vocabulary), **OF-4** (app-cluster directory), **OF-5** (the coupled
  owner event) — untouched; this lane audits carriage, it decides no fork.
- **NEW owner surface this audit raises (routed, not decided):** the plugins "delete entirely" edict vs the
  survey's measured "they are LIVE, wired in `vite.config.ts`" — an owner-verbatim divergence that must become
  an explicit disposition (delete-after-relocate vs keep-wired), currently living only in the Pass-0 survey.

**Nothing merged; this lane authored only this audit doc, pathspec `docs/tranches/V/**`. The composed thesis
is CLEAN on clean-break, CARRIED on the backend/BH-BI/process/validation half, and GAPPED — survey-only — on
the long-dir / hygiene / complexity-reduction half the owner named explicitly. Earned 62%.**
