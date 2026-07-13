# V · pass-1 · CRITIQUE — Family 2 · GRAPH-PROJECTION

**Critic**: pass-1 adversarial critic (NON-author; did not write `f2-graph-projection.md` /
`p1-graph-projection.md` / `spec-f2.md` / `proto-f2-graph-projection.md`). **Family**: 2 ·
GRAPH-PROJECTION. **Mode**: RAN — load-bearing claims re-measured against `tranche-u` HEAD (`7fdc975`),
not accepted on assertion. Hardened against the failure-mode checklist + the owner's verbatim clean-break
law + the "grand recursive colocation" D1 edict + the glass-ui referent divergences.

**Family-selection note**: the orchestrator shipped `${f}` UNSUBSTITUTED — the same broken fan-out both
F2 researchers and the F2 prototyper recorded (each self-recovered to Family 2). Sibling critics already
committed `critique-f1.md` (a28c455, 45%), `critique-f5.md` (02ae3ed, 42%), `critique-f6.md` (7fdc975,
37%); the derivation-axis trio F2/F3/F4 is the uncovered batch. I took **F2** — the lowest-numbered
uncovered family, and the one whose own prototype most sharply self-refuted (a critic's richest target).

**Verdict up front: earned convergence 40% — NOT converged, NOT blocked, and NOT a standalone answer.**
F2 is the campaign's most reproducible, cross-validated measurement layer, and its gates genuinely BITE
(unlike F1's vacuous depth/sideEffects). But three facts cap it: (1) the family's CENTRAL thesis —
"placement is a computed output, not a human decree" (§0) — is **self-refuted** by its own §7/§8 (the
graph counts edges; the placement DECISION needs a semantic overlay it cannot compute); (2) its flagship
src win, the color-SCC carve, **compiles green but FAILS at runtime** and needs two unbuilt refactors to
land; (3) the owner's PRIMARY surface (D1, demo) was **never executed** — all four §6 demonstrations are
`src/`, the substrate JSON is src-only, and the demo dead-code list contains a **provably-live control**
(verified below). F2 is honestly a SUBSTRATE for a shape-family, not a shape-thesis — and must be scored
as one.

---

## What HOLDS (verified on HEAD, credited — measurement earns, elegance earns nothing)

- **The dead-`timeline`-barrel delete is real.** `src/parsing/timeline/index.ts` exists (1265 B) and has
  **0 barrel importers** across `src/test/e2e/demo/subpaths` on HEAD (product + tests import
  `timeline/{easing,scroll-timeline}` directly). The proto's `git rm` → 2241 green is a clean, verified
  D4 win. Any family can consume it.
- **The union-entry method correction is a genuine, RAN insight.** Product-only reachability flags
  `units/color/conversions/index.ts` as dead; the `{product ∪ test}` union correctly SPARES it (7 test
  consumers, corrected from the research's 3). This is the family's severest-failure-mode made concrete
  and disarmed — a real methodological contribution every family inherits.
- **The tool-reliability caveat is load-bearing and correct.** madge/dep-cruiser defaults produce a
  "plausible-but-FALSE" graph (343 silent alias under-resolutions; ~11.5× cycle overstate from
  paths-not-SCCs). The runtime-vs-type-edge split + explicit alias map are genuine prerequisites that
  protect every family's numbers. This is the substrate's most valuable export.
- **The gates BITE.** `proof:barrel-cycle` (runtime-edge, deflated) fires RED on 2 real SCCs;
  `union-entry dead-code` fires on the timeline barrel. Unlike F1's depth/sideEffects, these are not
  vacuous-green — run mentally against a compliant-but-wrong tree, they fail on the real defects. Credit.
- **The self-refutation is honest and reusable.** The proto proved the spec's evidence bar
  (`typecheck exit 0 + Tarjan`) is INSUFFICIENT for a cycle-carve — a genuinely load-bearing result that
  hardens every execution family. F2 did the adversary's work on its own headline. That candor is the
  reason this critique credits ~40 rather than ~30.

These are real. Everything below is the distance between "best substrate in the campaign" and "an answer
to the owner's four-surface edict."

---

## OPEN GAPS (enumerated, most-severe first)

### G1 — VACUOUS CONVERGENCE against the owner's PRIMARY edict: D1 (demo) was NEVER EXECUTED
The owner's verbatim OPENS with the demo — "our grand component restructuring, and flattening, alongside
abrogation of `@` … of **our demo**." The spec calls D1 "**the family's strongest surface: computed
placement**" (§1) and prescribes concrete demo moves (fold 9 `composables/palette/` files into a
`usePaletteManager` capsule; colocate the `useColorPipeline` cluster). **None of it was run.** All FOUR
of the proto's §6 demonstrations are `src/` (color-SCC carve, timeline delete, union-entry, scanner) —
verified: the proto's only demo action was `madge … --circular demo/` → "16 cycle-paths" (a
MEASUREMENT), and the substrate JSON it emits is `/tmp/f2-**src**-substrate.json` (src only). No demo
colocation move, no post-move `typecheck` exit, no post-move `vitest`/e2e green.
- **Counterexample (the obligations pass on a compliant-but-wrong tree)**: every §6 demonstration lands
  GREEN while `demo/@/` (the owner's headline) is byte-for-byte unchanged. The "strongest surface" claim
  rests entirely on fan-in COUNTS, never on a single executed relocation.
- **Why this is worse than a measurement gap**: the proto's OWN src run proved that a mechanical
  import-redirect "compiles green, FAILS at runtime" (G3). A demo colocation is exactly such a redirect —
  and demo composables carry Vue `provide`/`inject` + setup-order contracts (`keys.ts` DI, `useColorPipeline`)
  that are the demo analogue of the `XYZ_FUNCTIONS` init-order the src carve broke. F2 never checked
  whether its own severest lesson applies to its own primary surface.
- **What closes it**: RUN one demo colocation move end-to-end in an isolated worktree — the 9-file
  `usePaletteManager` capsule is the spec's own example — with `typecheck` exit 0 AND the smoke suite
  green, and report whether provide/inject/setup-order survived. Until then D1 is un-prototyped by F2.

### G2 — THE CENTRAL THESIS IS SELF-REFUTED (the elegant-reduction trap, at the family's core)
§0 declares: "Placement is a **computed output, not a human decree**." §7/§8 then concede the opposite:
the placement "**needs a human/semantic filter (CC-5)**" because "the graph counts EDGES; T3 asks '≥2
UNRELATED families' — a semantic judgment the DAG cannot supply." So the family's defining mechanism
**cannot decide the one thing it exists to decide.** The "computed placement" is real only for
single-consumer *colocation*; the promote/globality DECISION — which composables float to a shared
`composables/` vs colocate into a feature, i.e. the WHOLE of D1's structural payload — rests on an
undefined "family-relatedness overlay."
- **Counterexample (measured)**: `composables/color/keys.ts` has fan-in 26 (graph) but spans 6 feature
  AREAS (human). A helper imported by 3 sites in ONE feature and a helper imported by 3 UNRELATED
  features produce the **same edge count** — the graph cannot tell "colocate into the feature" from
  "promote as global," and the spec supplies no predicate that can. This is "and then the hard part" at
  the exact center of the mechanism.
- **What closes it**: EITHER define "unrelated families" as a decidable predicate (F2's own
  consumer-set-intersection — two consumers are unrelated iff their nearest common feature-root is the
  demo root — is a credible candidate, and the spec should adopt it explicitly), OR down-scope F2 in §0
  to "diagnostic substrate, NOT placement authority" (§8 half-does this) so the agglomerator never scores
  F2 as a D1/D3 SHAPE answer. As written, §0/§1 read as a placement authority while §7/§8 disclaim one.

### G3 — THE FLAGSHIP src CARVE FAILS AT RUNTIME + NEEDS TWO UNBUILT REFACTORS ("and then the hard part", ×2)
The spec's headline src win (§3, "= glass-ui §2.1, F2 = F1"): "that single edge-redirect **shatters the
16-node SCC**." The proto refuted this on three measured counts, and the residue is **not designed**:
- **(a) Wrong count**: the SCC is **14, not 16** (the "authoritative" scanner had a comment-false-positive
  counting `from "."` inside JSDoc; `base.ts`+`spaces.ts` were phantom members). The spec §3 STILL says
  "16-node" — its own headline number is stale by +2 post-proto.
- **(b) Not GONE**: after the full barrel-purity set, a **residual 5-node `gamutMap` SCC** survives
  (`dispatch ↔ direct/xyz-extended via gamutMap`) — a SEMANTIC cycle barrel-purity cannot touch; it
  "needs DI/late-binding." Not built, not designed. Handed to "F6/pass-2."
- **(c) Compiles green, FAILS at runtime**: verified — `XYZ_FUNCTIONS` (dispatch.ts:111) + the
  `registerColorConverters` sink (dispatch.ts:67) resolve bindings at module-eval time; the barrel cycle
  was silently enforcing the eval order. The carve breaks 2 `color2` round-trip tests
  (`Unknown target color space: "rgb"`) that `tsc` cannot see. The fix — "an order-independent registry
  (lazy registration or an explicit eval-order entrypoint)" — is "a real refactor with behavior risk"
  that the proto explicitly did **not** attempt.
- **What closes it**: co-design + RUN the order-independent registry so the carve passes the `color2`
  runtime suite, AND design the `gamutMap` DI rebind. Until both exist, the src carve is unconverged —
  "shatters the SCC" is false, and the spec must stop presenting it as a demonstrated win.

### G4 — THE DEAD-CODE CENSUS CONTAINS A PROVABLY-LIVE CONTROL (verified false-positive on D1)
The research (F2-5) and spec (§1, §4) list the **ComponentSliders subtree (5 files)** as a dead-code
candidate — "0 fan-in, whole subtree unreachable … flag for VERIFY." **The VERIFY was never run.** I ran
it in 10 seconds on HEAD:
```
demo/@/components/custom/color-picker/ColorPicker.vue:141
  import ComponentSliders from "./controls/ComponentSliders/ComponentSliders.vue";
demo/@/components/custom/color-picker/ColorPicker.vue:70
  <ComponentSliders />
```
ComponentSliders is **statically imported and rendered by the core color picker**, and is the documented
iOS-Safari pointer-capture-recovery control (MEMORY: `pointercancel`/`lostpointercapture` handlers to
recover reka-ui slider capture leaks — confirmed present in the subtree). The family's rule ("0-reach =
dead = deleted") produced a **delete verdict on a live, safety-critical, rendered control.**
- **Why this is severe, not a footnote**: it lands on the OWNER'S PRIMARY surface, where the
  "authoritative" scanner does not reach (G5) — demo falls back to madge, the tool the research itself
  proved "plausible-but-FALSE" by default. A "flag for VERIFY" that the family never verifies, on the one
  surface where its instrument is untrustworthy, is exactly how a real deletion of a live control ships.
- **What closes it**: no demo dead-code verdict is actionable until the ComponentSliders-class
  dynamic/tool-resolution blindness is resolved — re-run the union-entry sweep on demo with a VALIDATED
  `@`-alias resolver (not raw madge), and treat every `.vue` "orphan" as flag-only until the alias graph
  is proven to resolve it. (The proto's own §4 concedes the scanner is "src-authoritative by
  construction; demo needs madge's alias resolver" — that resolver was never validated on the dead-code
  path, only asserted.)

### G5 — THE OWNER'S PRIMARY SURFACE HAS NO AUTHORITATIVE INSTRUMENT
The spec calls the ~90-line deterministic scanner "the authoritative source of truth" (§0). It resolves
**relative imports only** → it is **src-only**. For demo (D1), F2 falls back to madge, whose defaults the
research proved need four classes of deflation (F2-1: 343 silent failures; F2-2: ~11.5× cycle overstate).
The demo SCC decomposition "to exact component sets" is **still OPEN** (p1 §6: "I have the 16 paths, not
the Tarjan SCC grouping for `.vue`"). So F2's trustworthy measurement does not reach the surface that
matters most; every demo number rests on the tool F2 itself flagged as unreliable-by-default.
- **What closes it**: extend the deterministic scanner to resolve `@`-alias + `.vue` (or wire AND VALIDATE
  the madge alias-map on demo against a hand-checked ground truth), then emit the demo SCC/dead/fan-in
  substrate the way §6.1 did for src. Without it, D1's "computed placement" is computed by an instrument
  the family distrusts.

### G6 — GOD-FILE REDUCTION (owner's explicit D3 ask) IS HANDED TO F6
The owner: "Long running dirs must and always be broken into common modules" + "REDUCE complexity." The
"long-running" complexity is the god FILES — verified on HEAD: `parsing/color/color.ts` **754**,
`parsing/index.ts` **644**, `parsing/utils.ts` **603**, `units/index.ts` **451** LoC. F2's hard limit
(§3, F2-6): "the module graph treats a 754-LoC file as ONE node … cannot compute the intra-file split
line. F2 hands the actual cut to F6." So F2 **ranks which file** but **reduces nothing** — its D3
contribution to the owner's complexity-reduction ask is diagnostic-only.
- **What closes it**: nothing F2 can do — this is a structural ceiling of module-granular analysis. F2
  must be scored as "names the carve TARGET," never as "delivers the complexity reduction." (Compare
  F6's critique: F6 has the intra-file tooling but no target tree; F2 has the target ranking but no cut.
  Neither, alone, reduces a god-file.)

### G7 — api "D2 = verify" CONFLATES ACYCLIC WITH COLOCATED (a non-sequitur)
F2 measures api/src acyclic (0 SCCs, 0 route→repository edges) → "verify-not-restructure" (§2). But the
owner's backend edict is COLOCATION + long-dir-breaking "abstracted and made befitting," **not** merely
acyclicity. A clean layered DAG can still hold global buckets the colocation edict would dissolve.
"Acyclic ⇒ conforms to the colocation edict" does not follow — F2 ran Tarjan (cycles), never its own
single-consumer/colocation engine, on api.
- **What closes it**: run F2's colocation analysis on api before declaring D2 answered; keep D2 an
  explicit OWNER-FORK (the F1 critique flags the same at its G9), conditional on "conform-the-vocab" vs
  "ratify-the-clean-boundary."

### G8 — "F2 = F1 CONVERGENCE" IS SCORED AS VALIDATION OF A MOVE THAT DOESN'T WORK
The spec repeatedly cites "the color-SCC carve F2 derives IS glass-ui §2.1 (= F1)" as a cross-family
convergence WIN (§0, §3, §8). But that carve FAILS at runtime and is under-specified (spec's "11 edges"
is really 13+; SCC "gone" is false — G3). Two families deriving the **same incomplete/broken carve** is
not corroboration of correctness — it is shared incomplete analysis presented as independent
confirmation. The convergence is real in DIRECTION (barrel purity is right), false as VALIDATION (the
move is not landable as specified).
- **What closes it**: stop scoring the F1=F2 agreement as evidence the carve is correct until it passes
  the `color2` runtime suite; frame it as "two derivations agree on the direction, neither has landed it."

### G9 (soft) — UNMITIGATED INSTABILITY + a stale headline the spec never reconciled
§7 concedes "unstable placement: structure re-computes on every refactor" — the family's own "churns"
mode. A tree where adding one import can RELOCATE a file is antithetical to the owner's "idiomatic,
gestalt, stable" goal; F2 names it but offers no mitigation. Compounding: the spec §3 still prints
"16-node COLOR tangle" after its own §6 proto corrected it to 14 — the "authoritative" substrate ships a
+2 inflation in its own headline.
- **What closes it**: reconcile 14-vs-16 in the spec; state a churn-mitigation (the computed tree is a
  ONE-TIME carve input ratified by a human, not a standing re-computation the CI re-derives) so
  "computed placement" doesn't imply a perpetually-reshuffling repo.

---

## Failure-mode checklist — verdict per hook

| # | hook | verdict |
|---|---|---|
| 1 | vacuous convergence (spec passes, owner edict unmet) | **PRESENT** — G1: all 4 §6 demonstrations are `src/`; D1 (the owner's PRIMARY surface) has zero executed moves. |
| 2 | spec-cites-itself circularity | **LOW** — the proto RAN and REFUTED the spec (14≠16, SCC-not-gone, runtime-fail), so it is empirically self-correcting. The one soft circularity is scoring the F1=F2 agreement as validation of a move that doesn't work (G8). |
| 3 | gates that cannot fail | **NO (credit)** — `barrel-cycle` (runtime-edge) fires RED on 2 real SCCs; `union-entry dead-code` fires on the timeline barrel. F2's genuine advantage over F1's vacuous depth/sideEffects. |
| 4 | elegant-reduction / "and then the hard part" | **PRESENT + CENTRAL** — G2 (the semantic-family overlay is undefined and IS the design problem), G3 (the order-independent registry + gamutMap DI, ×2, neither built). |
| 5 | legacy aliases / dual paths / masked fallbacks | **MOSTLY CLEAN** — deletes + carves, no shims. One methodological fallback: the src-only scanner silently substitutes untrusted madge on demo, presented as equivalent (G4/G5). Demo-move atomicity (atomic vs churny) is unexamined (G9). |
| 6 | unverified gestalt | **PRESENT** — G4 (a provably-live control listed dead), G1/G5 (the demo "strongest surface" is measurement-only, on an instrument the family distrusts). |
| 7 | consumer-less substrate | **INVERTED** — F2 is almost ALL substrate, and its numbers HAVE real consumers (every family). The failure is the mirror image: substrate MISLABELED as a standalone shape-answer (G2/G6). |
| — | owner "grand recursive colocation" edict | **NOT MET** — no per-file colocation scatter run on demo; F2 measures WHERE files couple, never relocates one (G1). |
| — | glass-ui referent divergences | **direction holds, landing does not** — the src carve = §2.1 is the right barrel-purity direction, but the move fails at runtime and is unbuilt (G3/G8); the demo flatten (the referent's deferred src-execution hazard) is never confronted on demo. |

## Circularity / masked-fallback sweep

- **Spec-cites-itself?** Largely disarmed by the proto's self-refutation — the spec's claims were
  empirically overturned by its own §6 run, which is the opposite of self-citation. Residual: the F1=F2
  "convergence" scored as correctness-validation (G8).
- **Masked fallbacks / dual paths?** No migration shims in the mechanism. The one masked substitution is
  the src-only "authoritative scanner" → untrusted madge on demo, presented without validation as
  equivalent (G4/G5) — a methodological fallback, not a code one.
- **Gates that cannot fail?** None — F2's gates bite on the real tree (credit; this is where F2 beats F1).

## Convergence: **40%** (earned, stingy)

| Surface | State | weight on the score |
|---|---|---|
| D3 src cycle inventory + dead-`timeline` delete + union-entry method | **RAN, cross-validated, clean** — the campaign's best substrate | credits most of the 40 |
| D3 flagship color-SCC carve | **RAN but FAILS at runtime**; 14≠16; residual gamutMap SCC; needs 2 unbuilt refactors (G3) | partial, capped |
| D2 (api) | measured acyclic, but "verify" conflates acyclic with colocated (G7) — owner-fork | partial |
| D4 (dead barrels) | src list clean + RAN; **demo list contains a provably-live control** (G4) | partial, dented |
| D1 (demo — the owner's PRIMARY) | **UN-EXECUTED** (measurement only) + no authoritative instrument (G5) + self-refuted placement thesis (G2) | the dominant drag |

**Why not lower**: F2 is the most reproducible, cross-validated measurement layer in the campaign; its
gates BITE where F1's are vacuous; and its self-refutation (compiles-green-fails-runtime) is a genuine,
reusable result that hardens every execution family. This is not vapor — it is the substrate everyone
else consumes.
**Why not higher**: the family's defining thesis (computed placement, not human decree) is self-refuted
at its core (G2); its flagship src win fails at runtime and needs two unbuilt refactors (G3); and the
owner's PRIMARY surface is un-executed, instrument-less, and carries a verified live-control
false-positive (G1/G4/G5).
**Why not BLOCKED**: F2 does NOT pretend to be a standalone answer — §8 explicitly self-scopes to
"strong DIAGNOSTIC substrate, weak sole AUTHORITY … composes under a shape-family, it does not replace
one," and its missing primitive (the semantic shape) is honestly DEFERRED to F1/F3, not faked. It is
gapped-and-completable AS A SUBSTRATE. The BLOCKED trigger ("a missing primitive as hard as the original
problem, hidden as done") does not fire because F2 discloses the deferral instead of laundering it.

**Recommendation to the agglomerator**: **ADVANCE F2 as the mandatory measurement substrate + the
runtime-gate discipline** under a shape-family (F1/F3 supply the WHAT-tree; F6 supplies the intra-file
cut F2 cannot make). **Do NOT score F2 as a standalone D1 or D3 answer** — its §0 placement-authority
framing must be down-ranked to "diagnostic input" per its own §8. Three preconditions before F2's outputs
are trusted on the owner's surfaces: (a) RUN one demo colocation move (the `usePaletteManager` capsule)
with typecheck + smoke green, proving the src runtime-init lesson (G3) doesn't recur via provide/inject;
(b) resolve the ComponentSliders-class false-positive with a VALIDATED `@`-alias demo scanner before any
demo delete is actionable; (c) co-design the order-independent registry so the flagship src carve passes
the `color2` suite. Composed correctly, F2 is the numeric backbone the whole campaign stands on.
Standalone, against the owner's four-surface edict, it earns **40%** — the best substrate for a shape it
cannot itself supply.
