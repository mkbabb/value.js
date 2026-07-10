# h-dag — the wave-DAG re-verification (hardening lane)

**Scope**: re-verify the T wave DAG against the live tree and the whole corpus —
(1) dependency soundness (no wave consumes an artifact produced later); (2) rounds/barriers
consistent between `T.md §3` and every wave doc's `§Dependencies`/`Opens-after`; (3) CROSS-WAVE
file-bounds disjointness (the union map — two waves writing one file in the SAME ROUND =
MUSTFIX); (4) the trigger-gated W7 correctly off the critical path; (5) worktree/batch discipline
consistent everywhere.

**Method**: read `T.md §3/§3.1/§3.2` + `SYNTHESIS.md §3` (the DAG spec-of-record) + all ten wave
docs' `§File bounds`/`§Dependencies`/`Opens-after` + the live demo tree for the boot-chain /
ink-contract / picker-knot file topology (`grep BG_LIGHTNESS`, `find useViewAccents/…`,
`ColorComponentDisplay.vue`, `style.css` regions).

**Verdict**: 1 MUSTFIX · 4 SHOULDFIX · 3 NOTE. The DAG core is SOUND — no consumer-before-producer
edge, rounds/barriers consistent across all 10 wave docs, W7 off the critical path in every
operative statement. The break is a **same-round file-bounds collision the single-writer map does
not route**: the D6 ink-on-tier contract (W3-5) is architecturally cross-cutting and its consumer
set reaches into W2's exclusive boot chain in the SAME round (round 2), plus three lower-severity
seam/rendering gaps.

---

## MUSTFIX

### D-1 — Round-2 W2∥W3 are NOT file-disjoint: W3-5's ink contract forces edits to W2's exclusive boot chain (same round, ≥2 shared files)

**Severity**: MUSTFIX (my lane's stated bar: "two waves writing one file in the same round").

**The collision (live-tree-verified)**. Post-W1 colocation the boot chain is
`app/composables/boot/*` = `useAtmosphereBoot` · `useAtmosphere` · `useViewAccents` ·
`view-accents` — declared **W2's EXCLUSIVE single-writer surface** (`T.md §3.2`; `T.W2.md:91`
"Single-writer (§3.2): `app/composables/boot/*`…"; `T.W1.md:47` names the exact four files).
`useContrastSafeColor.ts` is NOT in that set — it lands in the `color/` domain (`T.W1.md §5.1`
"`color/` ONE domain (model/paint/composables…)"), and it is **W3-5's file** (`T.W3.md:52,103`).

But the two files are import-coupled across the W2/W3 boundary (verified in the live tree):

```
demo/@/composables/color/useContrastSafeColor.ts:17-18  export const BG_LIGHTNESS_DARK/LIGHT
demo/@/composables/color/useViewAccents.ts:41-43        import { BG_LIGHTNESS_DARK, BG_LIGHTNESS_LIGHT } from "./useContrastSafeColor"
demo/@/composables/color/useViewAccents.ts:72           const bgL = () => (isDark.value ? BG_LIGHTNESS_DARK : BG_LIGHTNESS_LIGHT)
demo/@/composables/color/useAtmosphereBoot.ts:52,67     import { useContrastSafeColor }; const { safeAccentCss } = useContrastSafeColor(atmosphereColor)
```

W3-5's mandate is D6 "**Retire `BG_LIGHTNESS_DARK/LIGHT`**; thread the atmosphere's live
derived-lightness" and its gate is grep-zero: "`BG_LIGHTNESS_DARK/LIGHT` gone (grep)"
(`T.W3.md:129`). That gate is **unsatisfiable without editing `useViewAccents.ts`** (it imports
and uses the constants) — a W2 boot-chain file. And threading real lightness into the guard family
changes `useContrastSafeColor`'s contract, forcing a co-edit of `useAtmosphereBoot.ts:67`'s call
site — a second W2 boot-chain file. Both are in **W2's do-not-touch set for W3**, and W3's boot
chain is in **W3's do-not-touch set for W2** (`T.W2.md:91-94` ⇄ `T.W3.md:107-109`). Two parallel
waves, same round (round 2), ≥2 shared files.

**Why the map does not catch it**. Round 4 (W5∥W6) carries explicit cross-wave single-writer
clauses for every shared file (`App.vue`→W5 queue, `Dock.vue`→W6 queue,
`GradientStopEditor.vue`→W6 queue — `T.W5.md:107-117`, `T.W6.md:93-97`). **Round 2 (W2∥W3) has NO
analogous clause** for the boot-chain/ink-contract seam — the "disjoint surfaces: boot chain vs
materials" premise (`T.md §3.2`; both waves' Opens-after) is asserted but false for D6.

**Corpus locations**: `T.md §3.2` (the W2∥W3 single-writer law) · `T.W2.md:91-94` (§File bounds,
boot set + do-not-touch) · `T.W3.md:52,103,107-109,129` (W3-5 scope + gate + do-not-touch).

**Proposed amendment** (pick one, encode by name):
(a) **Add a round-2 cross-wave single-writer clause** (the round-4 precedent): the BG_LIGHTNESS
retirement edits to `useViewAccents.ts`/`useAtmosphereBoot.ts` route through **W2's boot-chain
queue** (recorded in both wave logs), W3-5 hands the lightness-threading rows across; **or**
(b) **reassign the boot-chain lightness threading to W2** as a W2 item (the atmosphere-lightness
half is boot-native anyway); **or**
(c) **sequence W3-5 to depend on W2** (move the ink contract's boot-touching rows to round 3, or
gate W3-5 close on W2 close). As written the contract cannot land inside the wave partition that
owns it.

> Cross-ref: `h-wave-w2-w3.md` reached the same defect from the gate/deps angle (A11Y-F1
> un-landable; §Deps omits W2). This lane is the **file-bounds union-map confirmation**: it is a
> literal same-round two-writer collision on `useViewAccents.ts` (+ `useAtmosphereBoot.ts`), which
> is my lane's MUSTFIX condition.

---

## SHOULDFIX

### D-2 — The DAG spec-of-record renders W7 INLINE on the critical path; the charter removes it — under "the spec wins" the imprecise glyph governs

**Evidence**. `SYNTHESIS.md:235` (the DAG of record):
`W0 → W1 → { W2 · W3 } → W4 → { W5 · W6 } → W7(trigger-gated, floats) → W8 → W9` — W7 sits
**inline** in the arrow chain, `… → W7 → W8 → W9`. `T.md §3` (line 222) renders the SAME DAG with
W7 **removed** from the chain (`{T.W5·T.W6} → T.W8 → T.W9`) and W7 on a separate floating line.
Every operative statement follows T.md: W8 opens after W2–W6 (`T.W8.md` Opens-after + §Deps), W7
"Blocks: nothing" (`T.W7.md:162`), no wave `Depends on: W7` (grep-confirmed zero). The round
numbering (W8 = round 5, W7 = trigger) also follows T.md, not the arrow (the arrow would force
W7 = round 5 / W8 = round 6).

**Why it matters**. `T.md §Precedence` + every wave doc state "where the two diverge, **the spec
wins**". A literal read of `SYNTHESIS.md:235`'s arrow places W8 downstream of W7 — i.e. gates the
whole close chain on a trigger (the ~10-tranche-chronic 5.0.0 cut) that "its non-firing inside T's
window is not a miss". The "(trigger-gated, floats)" parenthetical mitigates but does not undo the
arrow topology; the governing glyph and the operative charter disagree on the graph shape.

**Corpus location**: `SYNTHESIS.md:235` (+ the "spec wins" precedence in `T.md §Precedence`/`§1`).

**Proposed amendment**: re-render `SYNTHESIS.md:235`'s DAG so W7 is off-chain, matching T.md — e.g.
`… → { W5 · W6 } → W8 → W9` with a following line `W7 (5.0.0 ADOPT) — trigger-gated, floats,
NOT on the critical path`; or annotate the `→ W7` edge as non-blocking. The spec should not, when
taken at its word, re-place W7 on the path its own prose (`:239-240`) removes.

### D-3 — Round-4 `style.css` is a two-writer file with NO cross-wave single-writer clause

**Evidence**. `style.css` appears in **both** round-4 waves' §File bounds: W5 "`style.css` (motion
region)" (`T.W5.md:102`) and W6 Lane G "`style.css` @254-261 (netting region ONLY)"
(`T.W6.md:82`). The corpus supplies explicit cross-wave clauses for every OTHER shared round-4 file
(`App.vue`, `Dock.vue`, `GradientStopEditor.vue` — `T.W5.md:107-117`, `T.W6.md:93-97`) but **none
for `style.css`**. W6's own intra-wave clause splits `style.css` only *within* W6 (Lane G @254-261;
surviving accent @223-224 read-only — `T.W6.md:90-91`); it says nothing about W5's motion-region
writes. `T.md §3.2` likewise asserts only the intra-W6 disjointness (netting @254-261 vs accent
@223-224), silent on the W5 seam.

**Live-tree check**: the regions are physically disjoint — motion `@theme` aliases live at
`style.css:86-150` (`--default-transition-duration` @119-120), the surviving accent at 223-224,
the netting/gamut-hatch at 254-261. So the collision risk is LOW — but the corpus's own single-writer
discipline ("never two writers"; every other shared round-4 file gets a clause) leaves this seam
**unasserted**.

**Corpus location**: `T.W5.md:98-122` (§File bounds — the cross-wave clauses block) · `T.W6.md:78-97`
· `T.md §3.2` (the W5∥W6 map).

**Proposed amendment**: add the missing cross-wave clause matching the `App.vue` precedent — e.g.
"`style.css` in round 4: W5 writes the motion region (`@theme` aliases @~86-150); W6 Lane G writes
the netting @254-261; the surviving accent @223-224 is READ-ONLY everywhere; the regions are
line-disjoint (no two writers)." One sentence closes the map.

### D-4 — W3-5's readout-frac cure names a file W3's own fence forbids (cross-round ownership gap with W4's knot)

**Evidence**. W3-5's anchors + gate route the ink contract to "readout fracs" and require "**zero
guard-then-alpha sites**" (`T.W3.md:52,129`). The guard-then-alpha readout-frac de-emphasis lives
in `ColorComponentDisplay.vue` (live tree): `.fig-frac { opacity: 0.55 }`, `.fig-unit
{ opacity: 0.5 }`, `.fig-frac-demoted { opacity: 0.4 }` at lines 148-161 — exactly the "post-hoc
opacity" class D6 retires. But `ColorComponentDisplay/` is a **W4 knot file** and appears in
**W3's own do-not-touch fence** (`T.W3.md:107-109` "Do NOT touch … the picker knot files (W4's:
… `ColorComponentDisplay/` …)"). So W3-5's "zero guard-then-alpha" gate cannot be satisfied within
W3's bounds — the site sits in the next round's fenced knot.

The intended owner is ambiguous: W4-4's gate consumes "the W3-5 contract, fed the console's tier
lightness" (`T.W4.md:112`) for the *console*, and W4-2 re-authors the *readout tuple* — but neither
W4 gate names the readout-frac opacity → certified-ink-rung conversion, while W3-5 claims it.

**Corpus location**: `T.W3.md:52` (W3-5 anchors: "readout fracs, ParseEcho") · `T.W3.md:129`
(gate: "zero guard-then-alpha sites") · `T.W3.md:107-109` (fence) · vs `T.W4.md:90,112` (knot set
+ the W3-5-contract consume). (Note: `ParseEchoReadout.vue` is NOT in the knot set — that half is
clean; only the readout-frac half collides.)

**Proposed amendment**: assign the readout-frac de-emphasis cure explicitly to **W4** (it
re-authors the tuple and already consumes the W3-5 contract) — W3-5 threads the *contract* only —
and scope the W3-5 O-18 census to exclude `ColorComponentDisplay` (or mark the readout-frac row
"cured at W4" so the grep gate is honest). As written, one W3-5 gate row is un-landable in-wave.

### D-5 — The floating W7's write set overlaps concurrent waves' files with no serialization clause; W7's own framing wavers concurrent↔between-rounds

**Evidence**. W7 "**FLOATS into whatever round is current when it fires**" (`T.W7.md` Opens-after;
`T.md §3`) with "lane worktrees cut from the tranche head" (`T.md §3.2`). Its write set
(`T.W7.md:93-101`) includes `package.json` + lockfile, `.github/workflows/ci.yml`, `HeroBlob/` +
blob config, "every `@mkbabb/glass-ui` import site in `demo/`", and the W3-1/W3-3/W3-4/W4-4/W6-3
interim sites. These overlap **W1-src** (`package.json` exports, `T.W1.md:123`), **W4** (`HeroBlob/`
in the knot, `T.W4.md:90`), **W1-demo** (`demo/` import sites), and **W3/W4/W6** (the interims) —
yet W7 carries **no cross-wave single-writer clause** (unlike round 4). The only mitigation
("interim swaps only fire where their interims exist", `T.W7.md:158-160`) covers interim EXISTENCE,
not concurrent WRITES to `package.json`/`ci.yml`/`HeroBlob/`/demo-imports.

W7's own framing is internally inconsistent: "floats into whatever round is **current**"
(concurrent) vs §Deps "consumes whatever T waves have **closed** when it fires" (`T.W7.md:157`,
between-rounds). The two readings imply different collision surfaces.

**Corpus location**: `T.W7.md` Opens-after · `T.W7.md:93-101` (§File bounds) · `T.W7.md:157-160`
(§Deps) · `T.md §3` (the float clause).

**Proposed amendment**: state that W7, when triggered, runs as **its own serial act with no
concurrent wave writing its file set** (dispatch it at a round boundary, not interleaved) — i.e.
resolve "floats into whatever round is current" to "floats to the next round boundary and consumes
closed-wave state", consistent with §Deps' "have closed". This makes the mitigation ("interims
where they exist") the only remaining seam, which it already handles.

---

## NOTE

### D-6 — "tranche head" (charter/spec) vs "wave head" (all 10 wave docs) — unify the worktree-base term

`T.md §3.2` + `SYNTHESIS.md:242` say lane worktrees are "cut from the **tranche head**"; all ten
wave docs say "cut from the **wave head**" (e.g. `T.W1.md:129`, `T.W3.md:109`, `T.W6.md:102`). For
serial waves these coincide. For the **parallel rounds (2, 4)** the precise base is the *fixed
wave-open commit* ("wave head") — a *moving* "tranche head" would hand a later-cut lane the sibling
lane's in-flight commits. The wave docs' term is the correct one; the charter/spec transcription is
looser. Amend `T.md §3.2` + `SYNTHESIS.md:242` to "wave head" (or define the two as equal under
strict wave ordering) so the amend pass unifies on the operative term.

### D-7 — W2-4's HeroBlob reveal-wiring grant contradicts W2's do-not-touch-the-W4-knot fence (cross-round)

`T.W2.md:88` grants W2-4 write access to "`HeroBlob` reveal wiring (the FSM's existing `emerging`
state)", but `T.W2.md:91-94`'s fence forbids "the picker knot files (W4's)" — and `HeroBlob/` is a
W4 knot file (`T.W4.md:90`). Cross-round overlap (W2-4 emerge wiring r2 → W4-5 seat r3), sequential
so not a same-round collision, but the W2 doc self-contradicts on `HeroBlob/`. Already filed by
`h-wave-w2-w3.md` as SHOULDFIX (HeroBlob mounts `ColorPicker.vue:66`); recorded here as union-map
corroboration. Amendment: carve `HeroBlob/`'s `emerging`-reveal wiring out of the W2 knot-fence by
name (a bounded exception), as the material/geometry split does for `PaneHeader.vue`.

### D-8 — CLEAN BILL on the axes that hold

- **Rounds/barriers**: every wave doc's Opens-after matches `T.md §3`'s round assignment exactly
  (0:W0 · 1:W1 · 2:W2∥W3 · 3:W4 · 4:W5∥W6 · 5:W8 · close:W9 · trigger:W7) — verified all 10.
- **DAG core soundness (no consumer-before-producer)**: W6-2 ← W1-src sampler (r1<r4); W2 ← W1 boot
  home (r1<r2); W3-2 ShadowPalette ← W1 card family (r1<r3); W4 ← W2/W3 (r2<r3); W5/W6 ← W4
  (r3<r4); W8 ← W2–W6 closed (r4<r5); W9 ← W8. Every edge forward. The font self-host split
  (W2-3 preload r2 → W4-2 verified-tnum face r3) is sequential + coordinated ("coordinated with
  W2-3's preload", `T.W4.md:90`) — a cross-round shared `index.html`, not a forward dependency.
- **W7 off the critical path**: confirmed in every operative statement (W8/W9 record it as-is; W7
  "Blocks: nothing"; grep-zero `Depends on: W7`). The only inline placement is the spec-glyph in
  D-2.
- **Worktree/batch discipline**: every wave declares sibling worktrees cut from the wave head; E-6
  "batches of three" respected (W1 = exactly 3 lanes; W6 = 4 lanes dispatched in batches of 3; W3
  ≤3; W5 ≤3; W8 batches of 3). W6's Lane-D→Lane-N chip-module handoff and W1's keystone→codemod
  seam are both explicitly queue-coordinated (intra-round, handled).
