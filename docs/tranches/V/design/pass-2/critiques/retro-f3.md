# V · pass-2 · RETRO-CRITIQUE — Family 3 · FEATURE-CAPSULE

**Critic**: pass-2 adversarial retro-critic (NON-author — did not write `f3-feature-capsule.md` /
`spec-f3.md` / the f3 proto / AGGLOMERATION.md). **Family**: 3 · FEATURE-CAPSULE. **Mode**: RAN —
load-bearing claims re-measured against `tranche-u` HEAD (`8f87b38`), not accepted on assertion.
This is the **missing adversarial pass** the fold flagged as a standing obligation (AGGLOMERATION §0:
"F3 and F4 carry … no adversarial critique … flagged for a **pass-2 adversarial pass**"). Pass 1
scored F3 **48% by the agglomerator with an explicit un-adversaried discount** (no critic re-measured
it). My job is to convert that discount into a measurement.

**Verdict up front: earned convergence 40% — DOWN from the un-adversaried 48%.** F3 has two genuinely
RAN wins that survive re-measurement (the api D2 ratify holds by first-hand grep; the src color merge's
"directory ≠ export map" coexistence is proven by a real gate). But the surface that *earned F3 its
premium over F1* — D1, the owner's PRIMARY surface, the "only family to RUN D1" — does not survive
adversarial measurement: (1) the ONE executed D1 move validates **helper-colocation of a KERNEL**, not
the feature-capsule thesis; (2) the *general* colocation map (the actual thesis test) is **refuted by
the consumer set** on F3's own worst-offender bucket; (3) **CC-5 — the cross-family payload the whole
fold banks on to unblock F6 — is asserted, non-reproducible, and self-contradicting on its own flagship
example.** F3 is a real src-merge result + an api ratify wearing a D1 headline the numbers don't support.

---

## What HOLDS (verified on HEAD — measurement earns, elegance earns nothing)

- **The KERNEL identification is SOUND.** The 3–5 promoted composables genuinely serve multiple
  unrelated features (distinct feature-root fan-out, real import lines, `.vue` included):
  `keys` → color-picker(10)·panes(6)·palette-browser(3)·dock(2)·app-root(2)·image-palette·markdown =
  **7 areas**; `useContrastSafeColor` → **6 areas**; `ink` → **3**; `useViewManager` → **3**. These
  are correctly promoted, none breaches 500 LoC (largest 376). The kernel is small and earned. CREDIT.
- **api D2 = verify-not-restructure holds by measurement.** `api/src/modules/` = **5 vertical capsules**
  (`admin color meta palette session`); `rg repositor api/src/modules/*/routes/` = **2 comment matches,
  0 real route→repository imports** (re-run on HEAD). D2 is a genuine ratify. CREDIT (but shared with
  F1/F2 — low marginal; §2 fact below).
- **The src color-parse leak is real and one-directional.** `parsing/color → units/color` = **15**
  statement-level (concentrated in **3 files**); `units/color → parsing*` = **0** (color-repr never
  imports the grammar). The one-directional shape that makes a merge *safe* is confirmed on HEAD.
- **"Directory ≠ export map" is PROVEN by a running gate, not argued.** The proto's `proof:subpath-budget`
  **11/11 GREEN** on the merged tree, with an esbuild trace showing the `/color` barrel pulls 0 modules
  from the physically-colocated grammar — a real coexistence proof. This is F3's best-earned result.
- **The proto is candid where the spec over-claims.** The proto walked back "internally acyclic"
  (conceded the merge inherits the barrel SCC + gains `color→parsing`=5), labelled the palette win
  "best case," and disclosed the 15-vs-11 methodology delta. The candor lives in the proto; the spec
  does not inherit it (G2, G5).

Everything below is the distance between those RAN results and "an answer to the owner's D1 headline."

---

## OPEN GAPS (enumerated, most-severe first)

### G1 — the ONE executed D1 move validates HELPER-COLOCATION of a KERNEL, not the feature-capsule thesis
F3's entire premium ("the only family to RUN D1," AGGLOMERATION §1 fact 5, the reason 48% > F1's 45%)
rests on the `composables/palette/` colocation. Re-measured on HEAD, that bucket is **not a feature
capsule** — it is a **cross-cutting KERNEL DI-hub**:
- `usePaletteManager` has **24 external import sites** — and **21 of them import `PALETTE_MANAGER_KEY`**
  (a provide/inject key), spanning **every other feature**: gradient, mix, panes, color-picker, dock,
  palette-browser. Only `usePaletteManagerWiring.ts` imports the composable function itself. F3's own
  research lists `usePaletteManager` as **KERNEL** (6 feature-capsules). So the "palette capsule" *is
  the kernel*, consumed by 6 features via a DI key — the **opposite** of a sealed vertical feature.
- The move that ran with 0 regression colocated the kernel's **9 privates** (measured: all 9 have 0
  external *import* consumers) UNDER the kernel. That is "a composable's private helpers live next to
  it" — a near-tautological hygiene win no family disputes. It does **not** exercise "features seal into
  vertical capsules; `composables/color` dissolves INTO the color-picker capsule" — the actual F3 thesis.
- **Counterexample**: the identical move succeeds under F2 (graph: single-consumer colocates into its
  consumer), under F1 (glass-ui §0.3 recursive colocation), and under plain hygiene. A demonstration
  that every competing family also produces is **not evidence for the mechanism under test.**
- **What closes it**: RUN the thesis-testing move — `composables/color/`'s 15 non-kernel files INTO
  feature capsules — with the placement derived from the CC-5 predicate, and report typecheck + smoke.
  Until then, D1 is *un-tested* by F3, not merely *best-case*. (And see G2: when I run it, it refutes.)

### G2 — the GENERAL colocation MAP is REFUTED by the consumer set (the elegant-reduction trap + unverified gestalt)
The research (F3-Q(a)) and spec §1 assert the 18-file `composables/color/` bucket "**dissolves cleanly**:
the other 15 are single-consumer → **color-picker** capsule." I ran the consumer census on HEAD. It is
false on the flagship and on the pattern:
- **`useColorPipeline` (373 LoC, the spec's named exemplar)** is imported by `demo/color-picker/App.vue`
  (line 186, the **app composition root**), by **4 sibling composables** in the same bucket
  (`valueDomain`, `useColorPersistence`, `keys`, `useAtmosphereFrameCoalesce`), and by
  `panes/AboutPane.vue` (a **different** feature). It is imported by the color-picker FEATURE
  (`components/custom/color-picker/`) **0 times**. The spec says "→ color-picker"; the measured
  consumer set says "→ app-root + panes + intra-bucket web."
- The pattern holds across the cluster: `useColorParsing` → `generate-color` + `useColorPipeline`
  (intra-bucket only); `valueDomain` → `useColorPipeline` + one color-picker readout file;
  `useColorPersistence`/`useAtmosphereFrameCoalesce` → app-root + siblings. Of 7 spot-checked
  "single-consumer → color-picker" files, **0 are imported by the color-picker feature component.**
  Their real external entry point is `demo/color-picker/App.vue` — which already owns a
  `demo/color-picker/composables/` dir (the owner's "truly global-level composables in a `composables/`
  dir" home). The bucket is an **app-root pipeline cluster with heavy intra-coupling**, not 15
  independent leaves that colocate into a feature.
- **This is F3's OWN CC-5 predicate contradicting F3's OWN verdict.** CC-5 (AGGLOMERATION §1 fact 4):
  "two consumers are UNRELATED iff their nearest common feature-root is the demo root → promote to
  kernel." `useColorPipeline`'s consumers = {App.vue (demo root), AboutPane (panes), 4 bucket siblings}
  → nearest common feature-root = **the demo root** → CC-5 says **KERNEL/global**. The spec says
  **colocate → color-picker**. The predicate the fold trusts and the placement the spec ships **disagree
  on F3's own flagship.** "Dissolves cleanly" is unverified gestalt; the hard part — running the
  predicate on the tangled general case — was never done, and doing it refutes the map.
- **What closes it**: emit the per-file move-map by actually running CC-5 (with a validated resolver —
  G3), RUN the scatter in a worktree, and report how many of the 15 land in a feature vs promote to the
  app-root `composables/`. My measurement predicts the honest answer is "most promote," which makes D1's
  structure closer to F2's graph/global answer than to F3's feature-capsule answer.

### G3 — CC-5 (the payload the FOLD BANKS ON to unblock F6) is asserted, NON-REPRODUCIBLE, and inherits F2's docked debt
The fold's single sharpest cross-pollination (AGGLOMERATION §0, §1 fact 4, §2·F6: "the F6 critic's BLOCK
is **LIFTED** … because **F3 supplies the per-file placement predicate**"). The entire F6-unblock — and
Charter B — rests on CC-5 being a real, runnable closer. It is not yet:
- **No committed instrument.** The census lives in throwaway scripts (`scratchpad/census.py`,
  `_proto/palette-consumers.mjs`) that are NOT merged (evidence-only). CC-5 has no validated, reproducible
  tool — the predicate the campaign's F6-unblock depends on cannot be re-run by anyone.
- **Independent runs disagree.** `parsing/color→units/color` = **15** (research) vs **11** (proto) — a
  ±27% swing on the headline edge. `usePaletteManager` consumers = **21** (portfolio A1) vs **22**
  (research) vs **24** (my HEAD count). Small, but it is the *substrate CC-5 computes on*, and it is not
  stable across three runs by three methods.
- **F3 inherits the exact debt F2 was DOCKED for.** critique-f2 G4/G5 docked F2 because its demo scanner
  had a **provably-live-control false-positive** (`ComponentSliders`) and was never validated on `@`-alias
  + `.vue` resolution. F3's census is *the same class of instrument* ("import-specifier match over
  `demo/**/*.{ts,vue}`") and is *less* validated (F2 at least built a deterministic scanner). F3 was NOT
  docked for it (un-adversaried) — and G2 above shows the census DID mis-resolve (app-root conflated with
  the color-picker feature). The fold trusts F3's census as CC-5's closer while docking F2's for the same
  un-validation. Both cannot stand.
- **What closes it**: BUILD the CC-5 predicate as a committed, `@`-alias-and-`.vue`-resolving instrument,
  validate it against a hand-checked ground truth (the `ComponentSliders`-class test), and RUN it end-to-
  end on demo — the precondition F2 was told it must meet before ANY demo verdict is actionable applies
  verbatim to F3.

### G4 — the ONE D1 move has NO GREEN GATE behind it; the provide/inject risk is UN-checked (unverified gestalt)
The proto's palette move is validated by exactly one number: **typecheck delta = 0**. But that delta is
against a **RED baseline** — the worktree's `npm run typecheck` exits **2** both before and after, with
**12 `@mkbabb/glass-ui/goo-blob` module-resolution errors** (pinned glass-ui 5.0.0 lacks `./goo-blob`;
the demo is **unbuildable**). Consequences the fold's "0 typecheck regression" credit hides:
- **Smoke was SPEC-ONLY** (the demo cannot vite-build) → the move was never exercised at runtime.
- **The provide/inject / setup-order risk F2's critique made load-bearing (G1/G3) is UN-checked on F3's
  move too** — and it is *acute* here: the palette hub's cross-feature glue IS a provide/inject key
  (`PALETTE_MANAGER_KEY`), the demo analogue of the `XYZ_FUNCTIONS` init-order the src carve broke.
  Whether inject-order survives colocation was never observed.
- So "F3 executed D1" reduces to "F3 ran a `git mv` + import rewrite whose sole evidence is a zero-delta
  on an already-failing typecheck, no smoke, no runtime." That is weaker than the fold's "executed" framing.
- **What closes it**: re-run the move on a worktree where the demo BUILDS (resolve the goo-blob pin skew,
  or stub it), land a GREEN typecheck + smoke, and confirm provide/inject/setup-order survives.

### G5 — the merged src capsule VIOLATES the family's OWN "one barrel per capsule" center → the src mechanism EVAPORATES
F3's defining center (portfolio, spec §0): "the feature as a sealed vertical capsule **with ONE public
barrel**." Re-measured, the merged src `color` capsule breaks exactly that:
- Post-merge, the `units/color/` directory sources **TWO** publish barrels: `/color` (33 `units/color`
  import lines, parse-that-free) AND `/parsing` (`subpaths/parsing.ts:134-135` imports from
  `../parsing/color`, which the merge repoints to `../units/color/parse`). One capsule dir, two
  publish surfaces.
- The spec reframes this as a feature ("directory ≠ export map, ORTHOGONAL projections," §1). But that
  reframing **dissolves the mechanism for src**: if the capsule directory has no correspondence to any
  barrel, then "capsule = vertical feature with one barrel" is abandoned, and even the fallback "domain
  capsule with one barrel" (§7) fails the one-barrel test. What remains is "a directory grouping
  orthogonal to publish" — i.e. *put related files near each other*, which no one disputes and which
  needs no family. The src answer's mechanism has evaporated into proximity.
- **What closes it**: state honestly that for src, F3 contributes a **leak-reducing merge move**, NOT a
  capsule mechanism — the "one barrel" thesis does not survive contact with the parse-that publish seam,
  and F3's src value is the 15→0 cross-boundary reduction, scored as such, not as a capsule shape.

### G6 — "internally acyclic" is FALSE (proto-conceded ×2), and the "standing report" gate is BLIND to what got worse
The spec §3/§8 headline: a merged `color/` capsule is "**internally acyclic** and turns 20 cross-top-
level edges into intra-capsule imports." The proto refuted the acyclicity on two measured counts, and
the residue is not designed — it is handed to F2:
- The merge **inherits `units/color`'s pre-existing 17-file barrel SCC** (every leaf routed through
  `index.ts`) AND **pulls `units/color` INTO the `units↔parsing` cycle** by adding `color→parsing`=5
  (the `layout-cache.ts` back-edge is real on HEAD: `layout-cache.ts:1,3` import
  `parseCSSValue`/`parseCSSValueUnit`). Cluster SCC goes 4-node → 3-node — the cycle is not eliminated.
- **The gate F3 proposes (§5, "cross-capsule import-leak census as a standing report") measures the wrong
  thing.** A leak-count gate reads the merge as 20→5 = a WIN, while the capsule's *cycle membership* got
  WORSE (units/color newly inside the SCC). A report is not a boundary gate, and a count is blind to the
  SCC growth — the one metric that regressed.
- **What closes it**: F3 cannot close this — cycle severance is F2's order-independent-registry primitive
  (§1 fact 3). Score the merge as "kills the cross-boundary color coupling, does NOT deliver an acyclic
  capsule," and make any leak gate a runtime-edge SCC gate (F2's `barrel-cycle`), never a raw count.

### G7 (soft) — D2/D4 are shared, low-marginal; the api "ratify" is owner-forked, not an F3 delivery
D2 (api ratify) holds by measurement but is reached identically by F1 (glass-ui's own gate GREEN), F2
(Tarjan 0 SCCs), and F3 (grep) — F3's marginal contribution is a re-measurement, and the *only* open
item (the `routes/service/repository` vs `api/model/lib` vocabulary) is **owner-reserved**, not an F3
decision. D4 (benches owned by their capsule) is explicitly "shared with F1/F5" (spec §4) — F3 adds only
the ownership home. Neither is an independent F3 win; both are correctly folded, but they cannot carry
convergence weight F1/F2 also claim.

---

## Failure-mode checklist — verdict per hook

| # | hook | verdict |
|---|---|---|
| 1 | vacuous convergence (spec passes, owner edict unmet) | **PRESENT** — G1: the one RAN D1 move is kernel-helper colocation every family produces; the feature-capsule thesis (buckets dissolve INTO features) is un-run, and G2 refutes it when run. |
| 2 | gates that cannot fail | **PRESENT** — G6: the §5 "leak census as a standing **report**" cannot fail (a report enforces nothing) and, as a count, is blind to the SCC growth the merge causes. The kernel-membership gate's verdict flips on a hand-drawn "feature" partition + an arbitrary ≥2/≥3 threshold (5 vs 6 composables). |
| 3 | elegant-reduction / "and then the hard part" | **PRESENT + CENTRAL** — G2 (running CC-5 on the tangled general bucket is the hard part, never done, refutes the map), G3 (the CC-5 instrument itself is unbuilt), G6 (cycle severance handed to F2, ×2 residue). |
| 4 | dual paths / masked fallbacks / aliases | **MOSTLY CLEAN (credit)** — the merge + palette move are clean `git mv` + rewrite, no alias window. One methodological fallback: "0 regression" is measured against a RED, non-building baseline (G4). |
| 5 | unverified gestalt | **PRESENT** — G2 ("dissolves cleanly" refuted on the flagship), G4 (no smoke/runtime, DI-order unchecked), G3 (CC-5 asserted, non-reproducible). |
| 6 | consumer-less substrate | **INVERTED, like F2** — CC-5 HAS a consumer (the F6-unblock, all of Charter B). The failure is the mirror: the substrate is **mislabeled as demonstrated** when it is un-committed + non-reproducible + self-contradicting (G3). |
| — | owner "grand recursive colocation" D1 edict | **PARTIALLY MET** — one kernel's privates colocated (real, small); the general per-file scatter into features (the actual edict) un-run and measurement-refuted (G1/G2). |
| — | glass-ui referent | **direction holds, landing does not** — api = glass-ui "domain package" law (measured GREEN); the src merge is the right barrel-purity direction but breaks glass-ui's own "one barrel" rule for the capsule (G5) and does not land acyclic (G6). |

## Circularity / masked-fallback sweep

- **Spec-cites-itself?** Partial. The proto is self-correcting (it refuted the spec's "acyclic"). The
  residual circularity is severe and NEW: the spec's D1 colocation map cites F3's *own* consumer census
  as authority, that census is un-committed + non-reproducible (G3), and re-running it by hand **refutes
  the map** (G2). The authority and the claim are the same un-validated instrument.
- **Masked fallbacks?** No code shims. One methodological one: "0 typecheck regression" silently
  substitutes a RED, non-building baseline for a green gate (G4).
- **Gates that cannot fail?** Yes — the "leak census standing report" (G6); it reports, it does not gate.

## Convergence: **40%** (earned, stingy) — DOWN from the un-adversaried 48%

| Surface | State | weight on the score |
|---|---|---|
| D2 (api ratify) | **measured clean** — 5 capsules, 0 route→repo — but shared with F1/F2, vocab owner-forked (G7) | credits, low marginal |
| D3 src color merge — leak kill + "directory≠export map" coexistence | **RAN, `subpath-budget` 11/11 GREEN** — the best-earned result; but "one barrel" thesis dissolves (G5), not acyclic (G6) | credits most of the 40 |
| D1 kernel identification | **SOUND** — 3–5 composables, genuine cross-feature fan-out, ≤376 LoC | credits |
| D1 general colocation (the thesis + the headline premium) | **un-run AND measurement-REFUTED** (G1/G2); the one RAN move is kernel-helper colocation, no smoke, RED baseline (G4) | the dominant drag |
| CC-5 (the fold's F6-unblock payload) | **asserted, non-reproducible, self-contradicting, un-committed instrument** (G3) | severe drag — the fold banks on it |

**Why not higher (than 48%)**: the surface that earned F3 its premium over F1 — "the only family to RUN
D1" — does not survive re-measurement. The one executed move tests helper-colocation of a kernel, not the
feature-capsule thesis (G1); the general colocation map is refuted by the consumer set on F3's own worst
bucket (G2); and CC-5, the payload the fold uses to LIFT F6's block, is un-committed, non-reproducible,
and contradicts the spec's own placement on its own flagship (G3). The un-adversaried discount was real
debt, now measured.
**Why not lower (than 40%)**: F3 is not vapor. Two results survive adversarial re-measurement fully — the
api D2 ratify (0 route→repo on HEAD) and the src color-merge coexistence proof (`subpath-budget` 11/11
GREEN, real esbuild trace) — and the kernel identification is sound. That is *more RAN and re-verified
evidence than F2's* (which had no landed move); it holds F3 at the pack, not below it.
**Why not BLOCKED**: F3 discloses its own limits in the PROTO (acyclic over-promise conceded, best-case
labelled, methodology delta owned) rather than laundering them; its missing primitives (cycle severance,
the general scatter) are honestly DEFERRED to F2/F6, not faked as done. The BLOCKED trigger (a missing
primitive as hard as the original problem, hidden as complete) does not fire — the gaps are enumerated
and completable, and the src-merge + api-ratify are real floor value.

**Recommendation to the pass-2 agglomerator**: **ADVANCE F3 as the WHAT-tree PLACEMENT half + the src
color-merge move, at 40% — NOT at 48%, and NOT as a demonstrated D1 answer.** Three preconditions before
F3's D1/CC-5 outputs are load-bearing: (a) BUILD CC-5 as a committed, `@`-alias+`.vue`-resolving,
ground-truth-validated instrument and RUN it on `composables/color/` — the general scatter, not the
pre-sealed palette kernel (G1/G2/G3); (b) re-run the D1 move on a BUILDING demo with green typecheck +
smoke + confirmed provide/inject-order survival (G4); (c) reframe the src contribution as a leak-reducing
merge, NOT a one-barrel capsule, and route cycle severance to F2's order-independent registry (G5/G6).
Composed correctly — F1's law × F3's *validated* placement × F6's atomic vehicle × F2's cycle severance —
F3 is a real half of the shape. Standalone, against the owner's D1 headline, its earned number is **40%**:
one re-verified src move + an api ratify, wearing a demo headline the consumer set does not support.
