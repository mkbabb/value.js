# V · pass-1 · CRITIQUE — Family 6 · BIG-BANG CODEMOD TRANSPOSITION

**Critic**: pass-1 adversarial critic (NON-author; did not write spec-f6 / proto-f6). **Family**: 6 ·
BIG-BANG CODEMOD. **Mode**: RAN — load-bearing claims re-checked against `tranche-u` HEAD (the proto ran
at `6abef80`, T-close). Hardened against the failure-mode checklist + the owner's verbatim clean-break law
+ "grand component restructuring / recursive colocation" edict + the glass-ui referent divergences.

**Family-selection note**: the orchestrator shipped `${f}` UNSUBSTITUTED (the broken fan-out every F6
artifact records). Parallel critics already committed `critique-f1.md` (a28c455) and `critique-f5.md`
(16:47) — the F1-over-selection skew the f1 critic logged as its own finding G8 is live. I twice lost a
write race (F1, then F5) and pivoted to **F6**: the highest-numbered (lowest-collision) uncovered family,
and — given my just-completed F5 critique found F5's execution *dissolves into* F6 — the load-bearing
execution family to harden, since if F5 is F6's gate add-on then F6 must carry the whole execution weight.

**Earned convergence: 37%.** NOT blocked-for-tooling — F6 is the campaign's best-executed proto: it RAN
end-to-end, discovered a real two-gate correctness mechanism, and honestly self-refuted. But it answers a
DIFFERENT question than the owner asked. It proved it can atomically **drop the `@` alias and rename six
whole directories**; it did NOT prove — or even attempt — the **per-file recursive colocation scatter**
that is the owner's actual D1 edict, and its correctness ceiling is a target tree that **does not exist in
any family**. The impressive numbers (373 rewrites, `SAFE:true`, oracle delta 0, 2241 green) measure the
TRIVIAL half of the problem.

---

## What survives (credited — genuinely the strongest proto in the campaign)

- **S1 · it RAN, end to end.** Adapted glass-ui's regex codemod, dryrun `SAFE:true` (373 rewrites, 0 REVIEW
  hits), executed for real, `vue-tsc` delta **0 new errors**, vitest **2241/2241**, `git log --follow`
  survives (ColorPicker.vue → 112 commits). Not a paper claim.
- **S2 · the two-gate discovery is a real, load-bearing insight.** The fail-closed audit alone would have
  SHIPPED 3 broken imports (§4: the stay-put-sibling `demo/color-picker/` boundary-relative class the audit
  is structurally blind to, caught only by the typecheck oracle). "F6 = `audit SAFE:true` ∧ `oracle
  delta==0`" is honest and correct, and it emerged from RUNNING, not theorizing.
- **S3 · the `ts-morph`-is-wrong-tool correction is verified.** 67% of the `@`-blast lives in `.vue`
  `<script setup>`, which AST tools skip; glass-ui's regex + fail-closed audit over `CODE_EXT` (treating
  `.vue` as text) is the right kit. On HEAD I confirm `@`-sites = **351 static + 10 dynamic** (the proto's
  "341 from + 10 dynamic + 4 side-effect css-in-script = 355 alias-rewrites" reconciles).
- **S4 · the fence check is measured** — 1 `demo/@/` product file touched in the last 30 `tranche-u`
  commits, not the portfolio's feared 214.

These are real. Everything below is the distance between "vehicle proven" and "owner's edict answered."

---

## OPEN GAPS (enumerated, exact)

### GAP F6-1 — SEVEREST (the elegant-reduction trap): F6 demonstrated a RENAME, not the owner's RESTRUCTURE

The owner's D1 edict (§0 verbatim) is *"grand component restructuring, and flattening … components should
be COLOCATED with their sub-components, composables, skeletons, constants … recursively for nested
components."* That is **per-file relocation to computed homes** — dissolve the global buckets
(`composables/color` 18 files, `composables/palette` 12) INTO their consuming components.

What F6 actually RAN (§1 reproduction, verbatim):
```
for d in components composables lib router styles utils; do git mv demo/@/$d demo/$d; done
```
Six **whole-directory renames** + specifier rewrites — an `@`-prefix elision. The output tree is
`demo/{components,composables,lib,router,styles,utils}/` — i.e. **the six global buckets PRESERVED, minus
the `@`.** That is the *antithesis* of the owner's target: it keeps the exact global-bucket structure the
edict exists to dissolve. The proto §9.1 concedes it: *"It did NOT execute the deeper recursive colocation
target tree … that is a SHAPE the families F1–F4 must supply."*

- **Counterexample / sharpening.** F6's codemod moved DIRECTORIES (`git mv <dir> <dir>`). The colocation
  restructure requires moving **individual files to scattered, per-file-computed destinations** (composable
  X → component Y's folder) with import rewrites for each. F6 never built or ran that move-map — so the
  vehicle is proven for the EASY move class (whole-dir prefix-drop) and **UNPROVEN for the HARD move class**
  (per-file colocation scatter) that is the owner's actual ask. The "373 rewrites SAFE:true, oracle delta
  0" measures the trivial transformation.
- **What closes it.** Build and RUN the per-file colocation move-map (221 files → 221 computed homes) with
  import rewrites, and prove the two-gate discipline survives it (audit + oracle on a per-file scatter, not
  a whole-dir rename). Until then F6 has proven `@`-abrogation, not restructuring.

### GAP F6-2 — the missing primitive IS the original problem: no family drew the recursive-colocation target tree

F6's own ceiling (§8): *"its correctness is only as good as the target-tree SPEC it executes … it does not
validate one."* The target tree — the concrete recursive-colocation demo layout — is the **actual D1 design
problem, as hard as the original problem.** And it does not exist: I verified the F1 critique's finding
that "the value.js demo target tree is never drawn"; F6 §9.1 punts it to "F1–F4"; F5 (my prior critique)
punts D1 placement to F3's family census, which is itself a shell. So the WHAT F6 needs as input is absent
across the campaign.

Per my brief's rule — *"a missing primitive as hard as the original problem = BLOCKED-recommendation"* —
F6 standalone is **blocked-for-cargo**: a proven vehicle with no designed load. The demo run only looked
complete because the trivial rename needs no target-tree design (a rename preserves structure). The moment
the real colocation cargo is required, F6 has nothing to execute.

- **What closes it.** A concrete, per-file recursive-colocation target tree for value.js's demo (the
  kernel-vs-colocate disposition for all 221 files) — owned by a SHAPE family, not F6. F6 cannot close its
  own top gap; it is gated on an artifact no family has produced.

### GAP F6-3 — the "reviewable via oracle not eyeball" claim holds ONLY for the rename it demonstrated

The proto's gap-c refutation (§5): reviewability via `vue-tsc delta==0` + the dryrun JSON, not the 231-file
diff. But the oracle proves **RESOLUTION correctness** (every specifier resolves), which the proto itself
scopes: §4/§9.1 *"the oracle catches resolution errors, not design errors."* For a pure RENAME (F6's demo
run) resolution-correctness IS sufficient — the semantics are unchanged. But for the actual COLOCATION move
(the owner's ask), whether each file landed in the RIGHT home is a **design** judgment the oracle is blind
to: `vue-tsc` says "it compiles," never "it's colocated correctly." So the reviewability refutation
**collapses for the real transformation** — a human must review placement, and for a 221-file per-file
scatter the "review the script not the diff" move means reviewing the script's placement logic, which is
reviewing the design, no cheaper than the diff.

- **What closes it.** Show a reviewability story for the per-file colocation move where the placement
  decisions (not just resolution) are auditable without eyeballing 221 diffs — likely a per-file
  destination manifest the human ratifies BEFORE the codemod runs.

### GAP F6-4 — F6 RAN one of four surfaces; D2/D3/D4 are asserted, not executed

"F6 RAN end-to-end" is true only for **D1**. D2 = *"likely a no-op"* (asserted). D3 = *"one commit per
god-module carve … supplied by the shape families"* — never run; the src carves (units/index.ts, color-SCC,
barrel siblings) are F1/F2/F4 artifacts, not F6's. D4 = *"one sweep deletes plugins/, PNGs, gates"* — never
run, and the CC-2 dead-code-union safety caveat is explicitly *"belongs to F2's engine; not authored here."*
So the "measured" status covers 25% of the surface; the D3 zero-export-churn hazard (the atomic-vs-publish
risk glass-ui deferred) is acknowledged (§3/§8) but untested on any src run.

- **What closes it.** RUN at least one src god-module carve through the codemod (per-file own-export
  extraction + importer rewrite behind the untouched 8-key exports map) to prove the vehicle on D3, where
  the atomic-vs-publish hazard actually lives; disposition D2/D4 as run or explicitly spec-only.

### GAP F6-5 — provenance: measured at 6abef80, not HEAD; self-reported ~5% blast-surface drift

The proto RAN at `6abef80` (T-close), not tranche-u HEAD. Self-reported drift (§9.3): test-mirror **8**
files (spec said 4), physical move **231** renames (spec 221), CSS/e2e `@`-refs **2** (spec said 0) — *"the
paper blast-surface was ~5% low."* The baseline typecheck "12 errors" is a 6abef80 figure; on HEAD the lib
arm is 0 errors and the demo arm carries the `glass-ui/goo-blob` + `HeroBlob` failures — so the "delta 0
against a 12-error baseline" must be re-derived on HEAD. The METHOD (normalize prefix, `comm` the sets) is
sound; the specific numbers are stale.

- **What closes it.** Re-run the dryrun + oracle against tranche-u HEAD; pin the HEAD blast surface (351
  static + 10 dynamic, verified here) and the HEAD baseline error set.

### GAP F6-6 — soft: the "two-gate" mechanism has a third blind class (docs/prose), and the fence win is moot by its own admission

- (a) §9.5: `CLAUDE.md`'s "Path aliases" table + `demo/CLAUDE.md` still list the 5 dropped aliases; *"the
  typecheck oracle does not see them."* Neither the `@`-token audit (scoped to `CODE_EXT`) nor the oracle
  covers prose/doc references — so "two-gate (audit ∧ oracle)" is really "two-gate + a manual doc sweep."
- (b) §8 concedes the fence refutation is *"moot regardless — charter §2 defers the codemod to the eventual
  wave"* — so the real protection is the deferral, not the measured 1-file conflict count; the "hazard
  REFUTED by measurement" headline does less work than it appears.
- **What closes it.** Fold a doc/prose reference sweep into the audit's scan scope (or name it as an
  explicit third manual gate); state the fence result as "moot by deferral" not "refuted by low conflict."

---

## Failure-mode checklist — verdict per hook

| # | hook | verdict |
|---|---|---|
| 1 | vacuous convergence (spec passes, owner edict unmet) | **PRESENT** — F6-1 (demonstrated a rename, not the colocation restructure), F6-2 (target tree absent). |
| 2 | spec-cites-itself circularity | **LOW** — spec cites the f6 research; the proto RAN and refuted the spec (2 refutations + 1 missed class), so it is empirically anchored, not self-citing. |
| 3 | gates that cannot fail | **NO** — the dryrun FAILED first (`SAFE:false`, 4 REVIEW), the oracle FOUND 6 errors; both gates demonstrably fire. |
| 4 | elegant-reduction / "and then the hard part" | **PRESENT + CENTRAL** — the "measurable big-bang core" F6 ran is the alias-drop; the recursive colocation ("the WHAT") is deferred to F1–F4 and does not exist (F6-1/-2). |
| 5 | legacy aliases / dual paths / masked fallbacks | **CLEAN** — one atomic commit, no dual path; `@src`/`@assets`/`@styles` correctly out-of-scope. F6 genuinely honors clean-break for the transformation it ran. |
| 6 | unverified gestalt | **PARTIAL** — D2/D3/D4 asserted not run (F6-4); the src atomic-vs-publish hazard untested. |
| 7 | consumer-less substrate | **PRESENT (as a family)** — a proven vehicle with no designed cargo; the codemod serves a target tree no family produced (F6-2). |
| — | owner "grand recursive colocation" edict | **NOT MET** — F6 preserved the six global buckets minus `@`; colocation untouched (F6-1). |
| — | glass-ui referent divergences | **holds on mechanism** — F6 correctly reuses glass-ui's proven codemod + fail-closed audit (the referent's landed practice), and its heavier physical-move class is honestly named. |

## Recommendation

**ADVANCE F6 as the execution VEHICLE, but score it low as a standalone answer and BLOCK it on the missing
target tree.** F6 is the campaign's most-proven mechanism — the two-gate discipline (audit `SAFE:true` ∧
oracle `delta==0`) is a genuine, reusable result, and the glass-ui codemod transplants cleanly. But it
demonstrated the trivial half (alias-drop + whole-dir rename) while the owner's edict — per-file recursive
colocation — was neither attempted nor is its target tree drawn anywhere (F6-1/-2). F6's convergence is
therefore **ceilinged by a missing primitive as hard as the original problem**: it cannot advance the
owner's restructure until a SHAPE family (F1/F3/F4) produces the concrete per-file colocation target tree,
and until F6 RUNS its codemod on a per-file scatter (not a whole-dir rename) and on at least one src carve
(D3, where the atomic-vs-publish hazard lives). Composed correctly (F3/F4 supply the WHAT; F6 lands it;
a minimal F5 gate holds the `@`-ban line), F6 is the right execution vehicle. Standalone, against the
owner's four-surface edict, it earns **37%** — an excellent vehicle proof for the wrong (easy) cargo.
