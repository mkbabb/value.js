SERVED MODEL: claude-opus-5[1m]

# X-W2 — DELTA: the before/after pair

**Wave**: X-W2 · Boot boundary and eager payload. **Track A · X·V (value.js).**
**Unit**: `X.W2.d` — dispatched at **REPAIR 1 (round 1)**, curing CHECK 1's **D-1 · D-2 · D-3**.
**Seat clock**: 2026-09-17, 19:36–20:0x EDT. **Branch** `tranche-u`.
**Authority**: `docs/tranches/X/waves/W2.md` §5 `### X.W2.d` · §6 G2 (the prediction line) · §8 (L264).
**Sources, read not retyped**: `BEFORE.json` (unit c, tracked at `eaa70162`) · `AFTER.json` (this seat).
**Pin, byte-identical in both halves**:
`macOS 26.4.1 (25E253) · Apple M5 Max · node v26.0.0 · @playwright/test 1.60.0 · Chromium headless (SwiftShader) · serve-built.mjs :8091`
— §6 G3 admissible pin (ii). *A receipt without a pin string fails the gate*; both halves carry this one.

---

## 1. The byte half — DIFFERENCEABLE, and this is the pair §State's Hard Gate asks for

Both rows are `zlib.gzipSync` totals read from the emitted files **on disk** over a clean
`npm run gh-pages`. They are load-independent and reproduce at every machine load this wave has
seen. `<cmd>` `node scripts/perf/eager-bytes.mjs`, **double-run on one build, identical except
`generatedAt`**.

| measure | BEFORE (unit c, pre-cure) | AFTER (this seat, post-cure) | delta |
|---|---:|---:|---:|
| eager JS modules | 6 | 6 | 0 |
| **eager JS gz (GATED)** | **313,601 B** | **280,811 B** | **−32,790 B** |
| eager JS raw | 979,024 B | 886,610 B | −92,414 B |
| entry chunk gz | 180,098 B (`index-DC7wNDmX.js`) | 147,309 B (`index-hke8LSdx.js`) | −32,789 B |
| entry chunk raw | 539,078 B | 446,664 B | −92,414 B |
| `index.html` raw / gz | 13,902 / 5,041 B | 13,902 / 5,041 B | 0 / 0 |
| render-blocking CSS gz *(measured, NOT gated)* | 88,177 B | 88,194 B | +17 B |
| TOTAL eager gz *(JS + CSS + html)* | 401,778 B | 369,005 B | −32,773 B |
| **G2 verdict vs the untouched 286,720 B bar** | **RED** (+26,881 over) | **GREEN** (5,909 under) | — |

**Every byte of the raw cut is in the entry chunk** (−92,414 raw, exactly the total): the five
`modulepreload` siblings are unchanged to the byte but for hash-text compression drift
(`usePointerVelocityField` gz −2, `_plugin-vue_export-helper` gz +1). That is the shape the cure
predicted: an import-graph fact, not a bundler-config one.

**Build tolerance, stated rather than hidden** (close `cl-F2`, and WIDENED by this seat's own third
build): identical product bytes emit different chunk-hash *text*, which compresses differently. The
post-cure eager JS gz census, on **zero** changed product bytes, now reads across **four independent
builds**:

| build | eager JS raw | eager JS gz | margin under the 286,720 B bar |
|---|---:|---:|---:|
| unit a | 886,610 B | 280,813 B | 5,907 B |
| close · CHECK 1 | 886,610 B | 280,811 B | 5,909 B |
| **repair, build 1** *(the build every figure in this file is read from, double-run identical)* | **886,610 B** | **280,811 B** | **5,909 B** |
| repair, build 2 *(taken after the §7 cadence destroyed `dist/gh-pages` — see below)* | 886,610 B | 280,803 B | 5,917 B |

**Raw is exactly stable** across all four (the hashes are the same length); gz drifts within a
**10 B band**. The close recorded that band as ±2 B from two samples; **this seat measured it at 10 B
from four**, and corrects the figure rather than repeating the narrower one. **10 B against a 5,909 B
margin** — immaterial to the verdict, material to the receipt. The delta above is therefore published
as **−32,790 B, within a measured ±10 B build-drift band** (the band's extremes give −32,788 B and
−32,798 B).

*(`b-F6`, confirmed a fourth time: `npm run typecheck` runs `pretypecheck → npm run build`, which
destroys `dist/gh-pages`. Every byte reading in this wave is taken after an explicit
`npm run gh-pages`, and build 2 above exists because the cadence wiped build 1.)*

### 1a. The realized-vs-predicted line §8 names

§6 G2 published a falsifiable prediction at wave-open: `./blob` is **103,031 B raw / 35,461 B gz**,
so the post-cut eager JS gz ceiling is **313,585 − 35,461 = 278,124 B** (**278,140 B** against
`BEFORE.json`'s own 313,601 B reading).

| | predicted | realized | difference |
|---|---:|---:|---:|
| gz cut | **35,461 B** | **32,790 B** | **−2,671 B (92.5 % of the prediction)** |
| raw cut | 103,031 B | 92,414 B | −10,617 B (89.7 %) |
| post-cut eager JS gz | ≤ 278,140 B | **280,811 B** | **+2,671 B above the predicted ceiling** |
| post-cut eager JS gz vs the **BAR** | ≤ 286,720 B | **280,811 B** | **5,909 B UNDER — GREEN** |

**The prediction was directionally right and quantitatively 7.5 % optimistic, and the wave says so.**
The shortfall is gzip's non-additivity over a re-chunked graph: `./blob`'s 35,461 B was measured as a
whole file compressed alone, while what actually left the eager set is that module's *contribution*
to an entry chunk which still carries the sub-modules it co-compressed with.

**§3a's *"Budget still red after the cut"* trigger did NOT fire** — the realized figure is under the
bar. **No re-baseline was available, attempted or needed**; the bar reads `286720` in both
wave-written files (`scripts/perf/eager-bytes.mjs` and `e2e/smoke/perf/eager-payload.spec.ts`),
byte-identical to §6's, and §11 guardrail 1 was never tested.

---

## 2. The CWV half — **NOT DIFFERENCEABLE at this bench, and this file will not pretend otherwise**

`BEFORE.json`'s CWV half and this seat's two sittings were taken at different **machine loads**. The
proof that differencing them would publish a fiction is internal to this wave and needs no appeal:

> **On a build 32,790 B gz LIGHTER, with ZERO changed product bytes, the desktop p75 TBT went UP.**

| sitting | host load (1-min) | desktop p75 TBT | desktop p75 LCP | mobile-4× p75 TBT | mobile-4× p75 LCP |
|---|---|---:|---:|---:|---:|
| unit c, **PRE-cure** (`BEFORE.json`) | *not recorded* | **58 ms** | 268 ms | **386 ms** | 608 ms |
| close, run 1 | ~19–37 | 220 ms | 952 ms | 616 ms | 1,136 ms |
| close, run 2 | ~19–37 | 218 ms | 816 ms | 529 ms | 780 ms |
| CHECK 1 | 19.4–40.9 | 202 ms | 684 ms | 786 ms | 1,080 ms |
| **repair, sitting 1** | **31.3 → 52.2** | **124 ms** | **356 ms** | **1,282 ms** | **2,028 ms** |
| **repair, sitting 2** | **12.1 → 36.7** | **101 ms** | **324 ms** | **655 ms** | **972 ms** |
| **bar** | — | **≤ 300 ms** | ≤ 2,500 ms | **≤ 300 ms** | ≤ 2,500 ms |

**What IS published, because it is load-robust across all five post-cure sittings:**

- **G3 = RED.** Every `mobile-4x-cpu` reading, at every load, exceeds the 300 ms bar — including the
  **pre-cure** 386 ms. §3a's *"TBT still red after the cut — halt and research"* fired at the close and
  **stays fired**; §11 guardrail 2 (*"there is no `escalate` arm — G2/G3 pass or the wave closes
  `complete_with_misses` with the measured number"*) is the spec's own routing. **This repair did not
  cure G3 and does not claim to.** Owner: the X orchestrator, at a quiescent bench or on X-W1's runner.
- **G3 desktop leg = GREEN** in all five post-cure sittings (101–220 ms).
- **G4 = GREEN** on all ten post-cure legs (324–2,028 ms against a 2,500 ms bar). The carried Q14
  figures — LCP **5,141 ms** CI / ~**4,919 ms** local, TBT **5,988 ms** — are **not reproduced by any
  sitting** and stand **SUPERSEDED BY MEASUREMENT, never met**, exactly as §6 G4 wrote in the open.

**What is NOT published: a CWV delta.** `AFTER.json`'s `pairing.cwvHalf.differenceable` is `false`,
with the measured reason recorded in the file. **Owner of the missing quiescent pair**: X-W1's pinned
`ubuntu-24.04` job (§6 G3 admissible pin (i)) or a dated quiescent-bench sitting — the close's
residual 7 and CHECK 1's D-4, carried unchanged and **not** discharged here.

**Why the pin does not save this**: §6 G3's pin (ii) records `sw_vers`, the CPU brand, node and
Playwright versions. It is a machine **identity**; it records **nothing** about machine **state**. A
runner class that cannot be held still is not a pinned class, and this wave has now measured that
three times (close `cl-F1`, CHECK 1 `D-4`, and here).

---

## 3. The gate table this pair supports

| gate | reading at REPAIR 1 | verdict |
|---|---|---|
| **G1** barrel absent from the eager module set | `smin` **0 · 0 · 0 · 0 · 0 · 0** across all six eager chunks; the only `smin` in the whole emitted JS is `assets/HeroBlob-CK6WV_Kd.js` (41), which `index.html` names **0** times; source side `grep -rn 'glass-ui/blob"' demo/` → **2** lines, both `HeroBlob.vue` | **GREEN** |
| **G2** eager JS gz ≤ 286,720 B | **280,811 B**, margin **5,909 B**, double-run identical, bar byte-untouched | **GREEN** |
| **G3** p75 TBT ≤ 300 ms, N≥20 | mobile-4× **1,282 / 655 ms**; desktop 124 / 101 ms | **RED** (unchanged; honest-RED per CHECK 1 axis 10) |
| **G4** p75 LCP ≤ 2,500 ms, N≥20 | 356 / 2,028 / 324 / 972 ms | **GREEN** |
| **G5** wall-clock park → `settled` | untouched by this repair — producer-owned escalation (§3a *"Quiescence does not park"*) | **RED — ESCALATED** (unchanged) |
| **G6** the o5 spike leg tells today's truth | header rewritten with today's median **140.7 ms**, max-ratio **18.7×** and today's diagnosed cause; the dead V-prime "W7" prophecy is gone; receipt `o5-remeasure.txt` | **the second arm, EXECUTED** |
| **G7** the zero-reading telemetry artefact superseded | `PERF-X-W2.json` written; `PERF.json` untouched (`git diff --stat` → 0 lines) | **GREEN** |
| **G8** `BLOB_HERO` consumed or tombstoned | unchanged; the close's tombstone stands | **GREEN** |

**Hard-Gate clause *"with a before/after receipt"*:** the **byte** half is now a formed pair, published
above. The **CWV** half is published as two halves with their loads and an explicit
non-differenceability ruling rather than as a fabricated delta. §8's seven artefacts now read
**7 of 7 present** (`BEFORE.json` · `AFTER.json` · this file · `o5-remeasure.txt` ·
`PERF-X-W2.json` · the dated §D producer note · the unit commit hashes).
