# THRICE — PB-COLOR — SKEPTIC 1 (assume WRONG; attack with evidence) — 2026-07-19

Target: `armB/program-PB-color.md` (14 waves). Verified against: value.js `tranche-u` HEAD,
`git show 164343c1^` (the resurrection source), keyframes-v-exec HEAD, CARRY-LEDGER.md,
DECISIONS.md D54, sweep-value-lib.md. Every claim below is tree- or git-grounded; conceded
ground is listed last.

---

## A. COMPLETENESS — the program's "zero silent drops" table is a LETTER census, not a TREE census

### A1. colorFilter — a SILENT DROP inside the anti-silent-drop program (severity: MAX)

P2.1's own drop prose names **colorFilter** in the extinction list. It was PUBLISHED surface:

```
164343c1^:src/subpaths/color.ts:217: export { rgb2ColorFilter, cssFiltersToString } from "../units/color/colorFilter";
164343c1^:src/index.ts:313:          export { rgb2ColorFilter, cssFiltersToString } from "./units/color/colorFilter";
```

It appears in NO P2.2 row (the 14-row ledger itself missed it), NO PB-color wave, NO OD row,
NO tombstone branch, and NOT EVEN the §4 "non-color rows sighted" footer. The program copied
P2.2 as gospel and never cross-checked it against P2.1's one-paragraph inventory sitting
directly above it in the same packet. The formation thereby RE-RUNS the exact mechanism its
charter §7-law-1 exists to kill: *no advocate ⇒ no tombstone*.

### A2. The export-census the program preaches but never ran (severity: HIGH)

`git show 164343c1^:src/subpaths/color.ts` — minutes of work — surfaces MORE published
symbols with no disposition anywhere in PB-color:

- `GAMUT_SECTOR_COEFFICIENTS` (gamut internals, exported)
- `rawXyz2ictcp` / `rawIctcp2xyz` / `rawXyz2jzazbz` / `rawJzazbz2xyz` (the HDR **conversion**
  raws — wave-10 restores only the PARSE half; the conversion-raw half has no row)
- `hsl2rgb`, `oklch2xyz`, `xyz2rgb`, `linear2srgb`, `hex2rgb` — the direct per-pair fast
  paths. These are the very functions behind P3.2's brag rows ("HSL→RGB 3.8–4.4×"), and
  D58(ii) records them as "wholesale-removed… convertColor/CONVERSION_ANCHORS supersede".
  Superseded is a fine verdict — but it is a VERDICT, and §7 law 1 demands it by name.
  PB-color renders none.

### A3. The capability-diff gate structurally CANNOT catch these — and the program leans on it (severity: HIGH)

Charter: "the capability-diff gate is owned by the gates program — we are its first client."
That gate diffs the export census **vs the prior tag**. 4.0.0 already lacks colorFilter and
the raw family; every future publish diffs clean against a surface that already dropped them.
The gate can only catch NEW removals — it is blind by construction to the v4 drops this
program exists to remediate. The unrestored-drop tombstone duty (the 14-row D ledger's
"six families entirely unpapered") therefore has NO owner in any program. A drop census +
retro-tombstone wave is missing, and nothing else can substitute for it.

### A4. C12 landing is fudged (severity: HIGH)

Row-landing table: "C12 (color-side slice: full spec incl. experimental) → waves 06,07,08,10
+ the OD-C4 exhibit." C12 says **ENTIRE CSS spec incl. experimental as of July 2026**. On
tree: `grep -rniE "light-dark|device-cmyk" src/` = **0 hits** — `light-dark()` is Baseline
2024 and absent from both the grammar and the program; ditto `device-cmyk()`, custom
`color()` profiles, system colors. L1 §2's named restores were "**including**" examples
inside a spec-completeness CENSUS wave; PB-color claims the C12 slice via the examples and
never cites the census as the catching mechanism, nor owns a color-side gap sweep. Four
cherry-picked productions ≠ "entire spec"; the claim as written is a close-class lie in
formation form (counting a partial as done).

---

## B. EVIDENCE-GROUNDING — invented numbers, wrong recipes, refuted routing

### B1. "16 live spaces" is FALSE — there are 17 (severity: MED, but it's the gate-spine wave)

`src/color/model.ts:4-7`: SpaceId = rgb, hsl, hsv, hwb, lab, lch, oklab, oklch, xyz,
kelvin, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, ictcp, jzazbz = **17**.
The sweep never asserts a space count; wave-01 invented one, wrongly, in the wave that
defines the conformance corpus. A corpus specified off-by-one at birth is exactly the kind
of anchor the thrice loop exists to catch.

### B2. The resurrection recipe path is WRONG at birth (severity: MED)

Charter: "Resurrection recipes: `git show 164343c1^:src/color/…`"; wave-09: "resurrect
`164343c1^:…okhsl.ts`". The pre-v4 tree has **no `src/color/`**. The apparatus lives at
`src/units/color/gamut/{gamut,boundary,raytrace,okhsl}.ts`, `src/units/color/difference.ts`,
`src/units/color/colorFilter.ts`, `src/units/color/contrast.ts`. The command as written
fails. §7 law 3 (re-derive anchors at execution) tolerates drift — this anchor was never
derived at all: the program demonstrably never ran its own recipe.

### B3. Wave-03's "novelty tier" routing is REFUTED by the resurrection source (severity: HIGH — C17 money)

The analytical engine the program prices as Fable-novelty numerics ALREADY EXISTS, complete,
in `164343c1^:src/units/color/gamut/gamut.ts`: Ottosson gamutclipping cited at `:3`,
`DELTA_E_OK_JND = 0.02` at `:63`, Halley's-method steps at `:106-142`
(`computeMaxSaturation`), `findCusp` at `:153`, `gamutMapOKLab` at `:263`, `gamutMapSRGB`
at `:427` — plus `bench/gamut-boundary.mjs` as its historical witness. Wave-03 is a
mechanical resurrection + model-modernization, Opus-tier per C17, with Fable needed only at
review. "Cusp/Halley derivation review is exactly the novelty tier" burns outrageous-cost
Fable seats on transcription.

### B4. Wave-04 "designs" an idiom that exists twice already (severity: MED)

`164343c1^` exports `gamutMapOKLabInto`, `mixColorsInto`, `sampleGamutBoundaryInto`,
`sampleOKLChSliceBoundaryInto`, `sampleOKLChHueSweepBoundaryInto` — the deposed tree IS the
Into idiom. And D54 already blessed the SCI-1 shape ("into-variants mirroring the blessed
`lerpArray` out-buffer idiom"). "Fable designs the out-param API idiom ONCE (it becomes the
program standard)" is design theater over a decided, twice-precedented idiom. The wave also
never cites its own resurrection recipe — it frames restore work as greenfield.

### B5. The ≈96-alloc born-RED threshold is a derivation hardened into a gate (severity: MED)

Sweep §9: "**⇒** ~96+ allocs/call" — an INFERENCE from code-reading, never a measurement.
Wave-01 RED-2 gates on it. Worse, the specified instrument cannot produce the number: an
`--expose-gc` heapUsed-delta harness measures **bytes**, not allocation counts; printing
"allocs/call" needs heap-sampling/snapshot object counts — a different instrument the
program never names. And the "≤3 facade allocs" budget is pre-committed in the charter while
the program simultaneously claims the budget table is wave-01 thrice-adjudicated cargo: the
adjudication is scripted to confirm a number already written down.

---

## C. GATES THAT CANNOT FAIL

### C1. Wave-05's dispatch gate is vacuous — and it hides an unpriced co-land dependency (severity: HIGH)

Gate: "the letter EXISTS on disk with both scar rows named." The author satisfies it by
construction the moment the letter is written; it can never be RED. Meanwhile the real
blocker is silently dropped: **kf pins value EXACT `4.0.0`**
(keyframes-v-exec `package.json:70`; P4.2 states it). kf cannot import `sampleColorRamp` or
`deltaEOK` from a 4.1.x it cannot resolve — the scar deletion is executable only after kf's
pin moves, i.e., at the co-land boundary. The charter's headline "the whole program…
owes NOTHING to the value-5 co-land boundary (P4.2)" is false at the single point where the
program dispatches cross-repo work. The scar rows themselves are real
(`src/animation/compile/emit/backward/color.ts:120` hand-rolled `colorDeltaE`;
`backward.ts:30-32` stale docstrings — verified at kf HEAD), which makes the unpriced
blocker worse: a true defect wired to a gate that closes on paperwork.

### C2. The OD scatter violates the single-docket law and inflates the wave count (severity: MED)

L1 §9: "the OWNER-DECISION docket presented as a **single decision sheet**." PB-color
scatters OD-C1..C5 across five waves; wave-12 is a wave that IS a sheet. Net: **5 of 14
waves (10, 11, 12, 13, 14) may ship zero code** — decision shells and pull-gated stubs
counted as waves. C21 ("little time on contrived gates or process") cuts directly against
manufacturing wave-count out of dispositions.

### C3. Wave-01's largest deliverable is born-GREEN by its own admission (severity: LOW-MED)

The 17-space round-trip corpus is expected GREEN on landing ("those are conformant today").
Annotated, so not a lie — but the program's biggest single artifact gates nothing that can
fail, and it is sequenced BEFORE every restore as a hard dependency. Vectors belong with the
waves that can turn them RED.

---

## D. WRONG DECOMPOSITION

### D1. Wave-03 bundles two separable mechanisms — and holds correctness hostage to the big port (severity: HIGH)

The program's own convention: "each wave is one mechanism." Wave-03 contains: kernel
replacement + facade rewire + `safeAccentColor` re-basing (retiring `:266,:283`) + raytrace
oracle port + DELTA plates. But CSS Color 4 §13's reference algorithm IS a chroma bisection
with a ΔE-OK JND stop and local clip — the extant `operations.ts` bisection (verified
`:133/:160`) is a small diff away from CONFORMANT (add the JND stop + clip comparison).
KISS split: (a) minimal §13 cure on the extant bisection — the born-RED conformance vectors
flip fast, correctness ships first; (b) the analytical-engine resurrection as a
perf/zero-alloc wave gated on output-equality with (a) plus resurrected-bench wins. The
program instead couples the correctness fix to the largest numerics port in the tranche.

### D2. Fabricated dependency edge: wave-06 → wave-02 (severity: LOW)

"interpolation-space semantics share ΔE-adjacent constants only where spec'd" — `color-mix()`
involves no ΔE anywhere in its spec; nothing is "spec'd". A contrived edge serializing
grammar work behind the color ladder; the grammar triplet's only real dependency is
EXT:R-PARSER.

### D3. The color-bench corpus falls into a program seam (severity: MED)

8 of the 11 deleted benches are COLOR benches (`color-alloc-hotpath`, `color-channel-access`,
`color-dispatch`, `color-interp`, `color-soa-fold`, `color2-direct-paths`, `gamut-boundary`,
`numeric-soa` — verified in `164343c1^:bench/`). L1 §2's bench-restore wave is the PARSER
regression witness (`css-parse-perf.mjs`). PB-color defers all bench infra to EXT:R-PARSER
and contributes "entries" — if the parsing program scopes to its own witness (its charter),
nobody resurrects the color eight, and wave-13's SoA exhibit depends on infrastructure
without an owner.

### D4. The §13 oracle tests the wrong thing (severity: MED)

Wave-03's oracle gate is raytrace **boundary** agreement — it validates where the gamut
surface is, not what the §13 MAPPING returns (the JND dead-band + clip behavior is the
conformance substance). The "§13 clip-criterion vectors" must be generated from a
spec-reference implementation the program never names as a deliverable; and "WPT
css/css-color" is thin-to-absent on gamut-mapping vectors (mapping is famously
non-interoperable across browsers — Chrome clips). The gate spine's provenance is
hand-waved at its most load-bearing point.

---

## E. WHAT SURVIVES (conceded, verified — the adjudicator should keep these)

- Facade cite `color/index.ts:33-40` and ictcp/jzazbz `:20-21` — EXACT.
- All six `operations.ts` line-cites (`:133/:160/:207/:226/:266/:283`) — hold.
- Tag `v-perceived-space-plate-ref-w40` exists; CARRY-LEDGER W53 B1 arm-A quoted faithfully.
- W56/D54/SCI-1 and D-GAP-6 vehicle-sharing — quoted faithfully (CARRY-LEDGER:27/:30/:48-50,
  DECISIONS D54).
- `CONVERSION_ANCHORS` exists (anchors.ts:334); kf scar line numbers hold at HEAD.
- DELTA_E_OK_JND = 0.02 "restored as-was" — matches the source (:63).
- P2.2 priority order preserved; R-PARSER correctly externalized; SoA tombstone honored as
  NEW-not-restore; wave-14's W53 gating and full π/DELTA are right.

The skeleton (deltaE → gamut → Into → ramp → grammar → gated tails) is sound because the
LEDGER is sound. The failures are the program's OWN additions: invented numbers, unrun
censuses, vacuous gates, decision-shell wave inflation, and mis-priced routing.

---

## F. THE COUNTER-PROGRAM — 12 waves, title+intent grain

1. **K-01 DROP-CENSUS LOCK** — machine export-census diff v3.1.0-tag ↔ 4.0.0 ↔ HEAD over the
   /color-adjacent published surface; EVERY prior symbol gets a terminal row —
   RESTORE-wave / SUPERSEDED-tombstone / DECLINE-tombstone — colorFilter, the raw
   per-pair conversion family, `GAMUT_SECTOR_COEFFICIENTS`, HDR conversion raws adjudicated
   BY NAME; the retro-tombstone paper rides the first 4.1.x CHANGELOG (cures the
   capability-diff gate's structural blindness to pre-existing drops).
2. **K-02 CONFORMANCE SPINE** — executable spec-reference §13 implementation (the vector
   GENERATOR, named deliverable) + spec-derived vectors + **17**-space round-trips + hue
   vectors; alloc harness in honest units (bytes/call budgets; object counts via heap
   sampling only where bytes are ambiguous); budgets RATIFIED here, not pre-committed.
3. **K-03 R-DELTAE** — as-was from `164343c1^:src/units/color/difference.ts` +
   `gamut/gamut.ts` (correct recipes), typing modernized; reference-vector gate.
4. **K-04 §13 MINIMAL CURE** — JND stop + local-clip onto the EXTANT bisection; the born-RED
   conformance vectors flip on a small diff; correctness decoupled from the engine port.
5. **K-05 R-GAMUT-ENGINE** — resurrect `gamutMapOKLab`/`findCusp`/`computeMaxSaturation` +
   Into twins + raytrace test oracle + the color-bench EIGHT; Opus-mechanical port, Fable
   review only (C17); gates: output-equality vs K-04 + alloc/bench wins.
6. **K-06 R-INTO** — SCI-1 extension riding W56, idiom = D54's blessed out-buffer shape
   (no idiom-design seat); equivalence + identity + 0-alloc gates.
7. **K-07 R-RAMP + kf DISPATCH, honestly priced** — restore ramp family; the INBOUND letter
   carries the kf `4.0.0`-EXACT-pin blocker as a priced CO-LAND-LEDGER row; the value-side
   gate = the pin-advance row exists in the co-land chase ledger (falsifiable against a real
   registry state), not letter-existence.
8. **K-08 GRAMMAR TRIPLET** — color-mix + relative-color + contrast-color as ONE wave with
   three born-RED gate families (same mechanism: production + node + serializer + vectors);
   dep: EXT:R-PARSER only; U-F29/U-F30 family regression vectors as cargo.
9. **K-09 SPEC-GAP SWEEP (C12 color slice)** — census vs CSS Color 4/5/HDR as of July 2026:
   `light-dark()`, `device-cmyk()`, custom `color()` profiles, system colors, and whatever
   else the census finds; explicit interface to the parsing program's census; gaps become
   gate rows or waves — the mechanism that makes the C12 claim TRUE instead of asserted.
10. **K-10 R-OKHSL** — recipe `164343c1^:src/units/color/gamut/okhsl.ts`, cusp-kernel reuse.
11. **K-11 THE OD DOCKET** — ONE sheet per L1 §9: OD-C1 (contrast republish), OD-C2 (HDR),
    OD-C3 (spring grammar), OD-C4 (eval), OD-C5 (SoA threshold, ratified pre-exhibit), plus
    the K-01 census's owner-tier rows (colorFilter et al.).
12. **K-12 OD-EXECUTION + GATED TAILS** — HDR parse / spring grammar / SoA exhibit /
    R-BOUNDARY (W53 pull) fire per rulings, each born-RED iff pulled, terminal dispositions
    otherwise; wave-14's π/DELTA obligation inherited intact.

Net vs PB-color: +1 census spine (the missing completeness organ), +1 spec-gap sweep (makes
C12 honest), correctness/perf decoupled (K-04/K-05), grammar triplet merged, five decision
shells collapsed into one docket + one execution wave, routing repriced to C17, and every
gate falsifiable by something other than its own author.

— Skeptic 1, thrice loop, PB-color · 2026-07-19
