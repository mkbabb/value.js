SERVED MODEL: claude-opus-5[1m]

# X.P.W1 — CLOSE REPORT

**Wave**: X.P.W1 — Harness, Corpus, and the Honest Bench (Track D · X·P).
**Spec of record**: `docs/tranches/X/parse-that/waves/W1.md` (718 lines / 55,891 B, digest
`519df03ff21b48f3b2c4f352d6a4d8ae98c86d3dde117ba786b6c924204c6d09`; read whole by this seat and
**not edited** — E-3).
**Execution record**: `docs/tranches/X/execution/D/X-P-W1.md`.
**Close seat**: Opus 5 (`claude-opus-5[1m]`), 2026-09-17, `cwd = /Users/mkbabb/Programming/value.js`,
darwin arm64 25.4.0, node v26.0.0, Apple M5 Max. **VERIFY-ONLY — this seat cured nothing.**
**Authority for the close stamp**: `W1.md` §9 commit 6 and §2's four-verb table — _"landing the ten
gates green + the close report stamps this, at this wave's own close (R-A, §9/§12)"_.

Every reading below was taken **by this seat, at close**, against the spec's own GREEN definitions.
Nothing is inherited from a unit receipt without re-measurement; where a unit's figure and this
seat's disagree, both are printed and the divergence is named.

---

## 1. Verdict

**PARTIAL — IMPLEMENTED 2026-09-17 with two named exceptions.** Eight of ten gates re-run **GREEN**
at this seat's clock. **G-2** reproduces its product GREEN but its **literal cwd form is BLOCKED** by
a machine-level defect the gate's August author could not have measured. **G-8 stands RED, and RED is
the state its own title declares** — `"G-8 — R1 TOTALITY, RED TODAY"` — its GREEN condition being
unreachable inside a wave whose §3 L109 forbids writing the grammar that would deliver it.

| verb        | value                                                 | evidence                                                                                                           |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| AUDITED     | **YES** (unchanged)                                   | `GATE-VERDICT.md` + `registry/adjudicated/parser-band.md` + INBOX O-15                                             |
| SPECIFIED   | **YES — 2026-08-03** (unchanged)                      | L-20 validation against `WAVE_SPEC.md`                                                                             |
| IMPLEMENTED | **YES — 2026-09-17, stamped here**, qualified PARTIAL | §2's gate table; the commit roster of §3; the two exceptions named above and escalated at §6                       |
| VERIFIED    | **NO**                                                | **X.P.W4's to stamp at the X·P sub-tranche release close (R-A) — never this wave's.** This report does not move it |

`W1.md` §2's four-verb table is **not edited**: it is a dated spec and E-3 makes it immutable. This
report is the dated stamp beside it, exactly as `W0-CLOSE.md` established at this lane's head.

**Why PARTIAL and not a plain IMPLEMENTED.** §2's four-verb row conditions the stamp on _"landing the
ten gates green"_, and ten did not go green. One of them **cannot**, by the spec's own construction —
unit `.e` returned that tension rather than dressing it, and this seat will not resolve by fiat a
contradiction the spec left standing. The wave's substance is delivered whole: the three instruments
exist on tracked disk, the ledger publishes every ratio and invents no bar, and the one gate that
stays RED is the one whose RED is the lane's subject. **Both exceptions are escalated at §6, not
absorbed.**

---

## 2. The ten gates — RED before, AFTER re-measured at close

Baselines are `W1.md` §6's, measured 2026-08-03 at value.js HEAD `2636c238`, re-dated at the wave's
open in `X-P-W1.md` §Baseline (2026-09-17). **10 of 10 RED before cure · 0 GREEN-BEFORE-CURE · 0
UNRUNNABLE.** Per **OC-2 / CC-096** the three arms stay **staged**: coverage (G-1), equivalence (G-2)
and bench (G-4..G-7) are read separately below and are **never re-composited into one verdict**.

| gate                                 | BEFORE (at open)                                                         | AFTER (close-seat re-measurement)                                                                                      | turned by |
| ------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | --------- |
| **G-1** the 52 are the 52            | **RED** — 51 + 1 = 52 in source; `<p2>/harness/totality` **ABSENT**      | **GREEN** — `EXIT=0`, stderr **0 B**, double-run **byte-identical**, porcelain 0                                       | `.a`      |
| **G-2** the oracle reproduces GREEN  | **RED** — corpus reads `size 403`; `<p2>/harness/equivalence` **ABSENT** | **PRODUCT GREEN** — `A/B/C = 0/0/0`, exit 0, maps unchanged. **LITERAL cwd FORM BLOCKED** — see §6.1                   | `.b`      |
| **G-3** harnesses off the scratchpad | **RED** — `evidence/W1/rescued` **ABSENT**                               | **GREEN** — `shasum -c` **EXIT=0**, **189 OK / 0 FAILED**; source 189 = dest 189 = manifest 189                        | `.c`      |
| **G-4** the bench is never armed     | **RED** — latch live on this box; **no harness in the lane**             | **GREEN** — 9 cells, **9 distinct PIDs, none repeated**, `PACKRAT_ARMED === false` at entry **and** exit of every one  | `.d`      |
| **G-5** diagnostics quarantined      | **RED** — 3 DEBT-1 rows; **no harness separates them**                   | **GREEN** — `wc -c < bench.stderr` = **0**, twice; the labelled-failure suite passes in its own process                | `.d`      |
| **G-6** every budget restated        | **RED** — no lane artifact publishes the restatement                     | **GREEN** — four rows against **1,636,680 µs**; both consistency checks; **0** rows carry a `1,870,633`-derived budget | `.e`      |
| **G-7** the bar is owner-gated       | **RED** — no bar ledger exists in this lane                              | **GREEN** — 3 row-scoped `OWNER-GATED-PENDING-RATIFICATION` cells; **0** ✓/✗ columns; **0** pass/fail claims           | `.e`      |
| **G-8** R1 totality                  | **RED** — 324 throws / 1,548 calls, exit **1**                           | **RED — 324 / 1,548, exit 1, reproduced to the digit.** The MEASURE-AT-OPEN clause is DISCHARGED; see §6.2             | `.e`      |
| **G-9** depth declared               | **RED** — ceiling measured; **no corpus in the lane declares a depth**   | **GREEN** — four corpora, depths 2/3/1/3, **margin 7,770 against a required 1,000**, ceiling measured in-process       | `.d`      |
| **G-10** the five debts measured     | **RED** — `RED — 7 gap(s)`, unpiped `$?` = 1                             | **GREEN** — the seven reproduce, unpiped `$?` = **1**, stderr **0 B**, recorded as the lane's standing input           | `.d`      |

**8 GREEN · 1 PRODUCT-GREEN-with-the-literal-form-BLOCKED · 1 RED-by-design.**

---

### G-1 — THE 52 ARE THE 52 (`.a`)

⟨cmd⟩ (from `<p2>`, unpiped, stdout and stderr to separate files) `node harness/totality/derive.mjs --check`

```
derived     52 exports = 33 types + 19 runtime
runtime     7 grammar + 1 syntax + 3 timeline + 8 stylesheet
cross-check 51 block members + 1 single-line export = 52  (W1.md §6 G-1's own 51 + 1 baseline, re-derived in-process)
counts      manifest 52 · derived 52   EQUAL
            types     33 ·  33        runtime  19 ·  19
sets        names IDENTICAL · kinds+slices IDENTICAL
GREEN — manifest 52 == derived 52 (33 types + 19 runtime); names, kinds and slices identical.
```

**`EXIT=0` · stderr `0` bytes · double-run ⟨`cmp -s`⟩ → BYTE-IDENTICAL · ⟨`git -C <p2> status
--porcelain`⟩ → 0 before and after.** The gate's entry is read-only in `--check` mode and this seat
confirmed it: the tree did not move.

The spec's own source anchors re-derived at this seat's clock, independently of the script:

```
$ grep -cE '^    [A-Za-z]+,$' src/css/index.ts   →  51
$ grep -nE '^export \{ [A-Za-z]+ \}' src/css/index.ts
45:export { coerceToSyntax } from "./syntax";
```

**51 + 1 = 52.** The 2026-08-03 baseline reproduces exactly at today's HEAD.

**The three candidates, re-read at this seat** — an instrument that can only print ABSENT has not been
shown to print TOTAL:

| candidate                  | aggregate (52)                      | runtime          | types          | kf column (37) |
| -------------------------- | ----------------------------------- | ---------------- | -------------- | -------------- |
| `published-4.0.0` POSITIVE | **51 TOTAL · 1 PARTIAL · 0 ABSENT** | 18/1/0, throws 0 | 33/0/0         | 37 / 0 / 0     |
| `c14-assay` NEGATIVE       | 0 / 3 / 49                          | **0 / 3 / 16**   | **0 / 0 / 33** | 0 / 2 / 35     |
| `p2-native`                | 0 / 0 / 52                          | 0 / 0 / 19       | 0 / 0 / 33     | 0 / 0 / 37     |

**The negative control reproduces `coverage.md` Surface 1's published tally to the digit** (§1a
_"0 TOTAL / 3 PARTIAL / 16 ABSENT"_; §1b _"0 / 0 / 33"_) — a published reading recomputed by an
independent instrument, not restated. The kf seam column prints **`SEPARATION ASSERTED — manifest 52
exports · kf column 37 symbols · merged: false`**, so §5.a's _"never merged into the 52"_ is an
assertion in the artifact, not a promise in prose.

---

### G-2 — THE ORACLE REPRODUCES GREEN (`.b`) — **PRODUCT GREEN · LITERAL FORM BLOCKED**

**The literal command of §6 does not complete on this box.** Reproduced at this seat, bounded:

```
$ cd <p2> && npm prefix                       →  /Users/mkbabb
$ cat /Users/mkbabb/package.json              →  {"dependencies":{"@mkbabb/value.js":"^0.4.4"}}
$ test -e <p2>/package.json                   →  ABSENT
$ test -d <p2>/node_modules                   →  ABSENT
$ command -v tsx                              →  ABSENT (no global tsx ⇒ no npm fast path)
$ cd <p2> && npx tsx --version                →  STILL RUNNING AT A 25 s CAP — KILLED
```

`npx tsx --version` runs **none of this wave's code** and still does not return, so the obstruction is
**npm's prefix walk, not the harness**: with no `package.json` in `<p2>`, npm's up-walk terminates at
the stray `/Users/mkbabb/package.json` and `loadActual()` walks the entire home directory. Unit `.b`
measured the terminal form (`EXIT=134`, OOM at 4 GB after 149 s); this seat reproduced the cause
without paying that cost. **The diagnosis stands at the bytes.**

**The gate's product, measured through the same entry, the same `_npx`-cached `tsx`, the same
absolute paths, from a cwd whose walk terminates** — ⟨cmd⟩
`npx tsx /Users/…/parse-that-css-totality-p2/harness/equivalence/harness.ts`, **`EXIT=0`, stderr
`0` bytes, `real 1.171`**:

```
size 403
provenance {"c":84,"b":232,"seed":70,"d":27,"a":19}
hints {"stylesheet":121,"color":84,"value":120,"sheet":13,"keyframe-selector":22,"easing":43}
corpus sha256 c6649cadd10f2aca7227482bc0c05ea1f9aaf3159e563a052f65aeea0f0a4ff8
--- taxonomy (equivalence.md §1, byte-for-byte) ---
extracted 683 B · sha256 554c2993cebd3ed386e023e043ded9538bd99fd488de0598ada40b845dd963a7 · UNMOVED
--- DECLARED DIVERGENCES (ruled; NOT defects) ---
22 ruled divergence rows · 4 preserved DISSENTs
A/B/C = 0/0/0
defects (A+B+C + C14/BOTH engine exceptions) = 0
GATE: GREEN
```

`size 403` ✓ · provenance map unchanged from the RED baseline ✓ · hint map unchanged ✓ · taxonomy
asserted byte-for-byte against `equivalence.md §1` and **UNMOVED** ✓ · `A/B/C = 0/0/0` ✓ ·
declared-divergence list printed as a section **distinct from the defect count** ✓ · exit **0** ✓.
**§3a's halt condition — _"the P-1 GREEN failing to reproduce"_ — did not fire at this seat either.**

**A close-seat reading the units did not have.** The re-run rewrote
`harness/equivalence/equivalence-results.json`; ⟨`git -C <p2> diff`⟩ over it returns **one changed
line**:

```
-  "generatedAt": "2026-09-17T19:06:58.664Z",
+  "generatedAt": "2026-09-17T20:32:07.808Z",
```

**All 403 rows are byte-identical between `.b`'s landed run and this seat's independent one.** The
file was restored ⟨`git checkout --`⟩ and `<p2>` left at porcelain **0**. R-b4's warning is therefore
narrower than it read: the only drift is a timestamp.

**This seat does not convert the product reading into a plain GREEN stamp** — see §6.1.

---

### G-3 — THE HARNESSES ARE OFF THE SCRATCHPAD (`.c`)

⟨cmd⟩ `cd docs/tranches/X/parse-that/evidence/W1/rescued && shasum -a 256 -c MANIFEST.sha256`

```
EXIT=0        OK: 189     FAILED: 0
stderr:  shasum: WARNING: 1 line is improperly formatted
```

That single stderr line is **line 1**, the `SERVED MODEL:` receipt the seat law fixes the text of;
every other header line begins with `#` and shasum skips it. It does not move the exit code.

| G-3 clause (spec L270–272)                                              | close-seat reading                                                 | verdict   |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| every non-`node_modules` file present at open appears with a digest     | manifest digest lines **189**; dest files (excl. manifest) **189** | **GREEN** |
| a spot re-hash of three files reproduces                                | three re-hashed **source == copy == manifest**, below              | **GREEN** |
| the source tree's `find … -type f \| wc -l` is unchanged after the copy | **189** at the job tree, at this seat's clock                      | **GREEN** |

```
equivalence/corpus.json   c6649cadd10f2aca7227482bc0c05ea1f9aaf3159e563a052f65aeea0f0a4ff8   REPRODUCES
bench/bench.ts            8c274f8132f9aa5d3f5effbf902699541b693e356a520132c405658b3aa2bfad   REPRODUCES
gate-recovered.mjs        639e596135b2944c07ad8b1f4be89373cc640cba7544fec35936655833f0512e   REPRODUCES
```

The reproducibility limb holds: `node_modules/` excluded, `package.json` (291 B) and
`package-lock.json` (32,220 B) both kept. **The gate's own risk is retired** — the instruments are no
longer one `rm -rf /tmp` from gone.

---

### G-4 — THE BENCH IS NEVER ARMED (`.d`)

⟨cmd⟩ (from `<p2>`, through the exact binary `npx tsx` resolves — see §6.1)
`tsx harness/bench/bench.ts --out=<scratch> --no-finalize` → **`EXIT=0`**:

```
── G-4 LEDGER · one PID per cell, entry AND exit, read from the dist ──
       pid  cell                                    entry  exit
     39066  census                                  false  false
     39070  published-4.0.0/shared-accepted         false  false
     39071  published-4.0.0/reject-non-throwing     false  false
     39072  published-4.0.0/r1-throw-class          false  false
     39073  c14/shared-accepted                     false  false
     39074  c14/reject-non-throwing                 false  false
     39075  c14/r1-throw-class                      false  false
     39076  deposed/shared-accepted                 false  false
     39077  json-normaliser/json-normaliser         false  false
   PIDs 9, distinct 9 — NONE REPEATED. All cells were alive simultaneously, so distinctness is structural as well as asserted.
   orchestrator pid 39065 — it loads no engine and parses nothing.
```

**Nine PIDs at this seat's run, all distinct, all differing from `.d`'s landed 96134…96150** — which
is the point: the per-process claim is re-established by measurement at a new clock, never carried
over. The latch is **read from the installed dist** through a loader hook that appends one accessor to
the same ESM cache entry the grammar would arm, and the census prints the arm-site census beside it:

```
   false  decl :678  arm-sites 1 (:722)  dist/packrat-entry-CS1td-8B.js
   false  decl :683  arm-sites 0  rescued/c14-bundle.mjs
   false  decl :727  arm-sites 0  deposed-full/deposed-bundle.mjs
```

**§3a's forbidden fallback is nowhere used**: the harness's own header states _"We did not call
memoize is not used as evidence anywhere"_, and `.d`'s falsifier 4 makes an **unobserved** latch a
halt (`0 latch-bearing module(s) loaded at preload … An unobserved latch is not an unarmed latch`)
rather than an unarmed one. **G-4 GREEN.**

---

### G-5 — DIAGNOSTICS ARE QUARANTINED (`.d`)

⟨cmd⟩ G-5's literal capture form, run **twice**:

```
$ tsx harness/bench/bench.ts … 2> harness/bench/bench.stderr      EXIT=0
$ wc -c < harness/bench/bench.stderr                                     0
$ tsx harness/bench/bench.ts … 2> harness/bench/bench.stderr      EXIT=0   (double-run)
$ wc -c < harness/bench/bench.stderr                                     0
```

and the labelled-failure suite **in its own process, which the bench never enters** — ⟨cmd⟩
`node harness/bench/diagnostics-suite.mjs` → **`EXIT=0`**:

```
ok   DEBT-1  labelled failure is a NO-OP with diagnostics off undefined
ok   DEBT-1  Parser.prototype.label / .expected combinator    absent
ok   DEBT-1  enableDiagnostics() is process-global (arity 0)  0 args — no scoped posture exists
ok   DEBT-1  the label DOES surface once diagnostics are armed ["\"red\"","<named-color>"]
ok   PT-01   arming diagnostics couples an unconditional stderr write 76 bytes on ONE labelled parse
ok   PT-07   raw parseState(non-string) throws                5/5 TypeError
ok   §3.9   the guard makes the boundary total                0/5 throw; code non_string_input
ok   LATCH   reader returns false before any memoize()        57.8 ns/parse unarmed
ok   LATCH   memoize() FLIPS the reader false -> true         90.8 ns/parse armed — the reader is a live read, not a constant
ok   LATCH   resetPackrat() does NOT disarm (one-way)         still 95.8 ns/parse
     ratio armed/unarmed 1.57× (O-15 measured 1.47× on a different box-state)
```

**That suite's own stderr measures 76 B** — PT-01's coupling, measured not quoted — and **0 of those
bytes reach the bench's stderr**, which is the structural claim the gate makes. The quarantine is a
separate file in a separate process that `bench.ts` neither imports nor spawns. **G-5 GREEN.**

The latch positive control is what makes G-4's `false` readings evidence rather than a constant: the
reader **flips** under `memoize()` and `resetPackrat()` **does not disarm it** — O-15 PT-03 reproduced
in kind at a third box-state (1.57× here; 1.68× at `.d`; 1.47× at O-15 — **the ratio is the portable
reading, never the bare ns**).

---

### G-6 — EVERY BUDGET RESTATED (`.e`)

`docs/tranches/X/parse-that/evidence/W1/BAR-LEDGER-2026-09-17.md`, read at this seat:

```
| historical `10×`    |  10 |   163,668 µs | 311,883 µs | −148,215 µs (the floor is 1.906× the budget) | RETIRED AS LAW |
| candidate `3×`      |   3 |   545,560 µs | 311,883 µs |                                  233,677 µs | OWNER-GATED-PENDING-RATIFICATION |
| candidate `2×`      |   2 |   818,340 µs | 311,883 µs |                                  506,457 µs | OWNER-GATED-PENDING-RATIFICATION |
| measured break-even |   1 | 1,636,680 µs | 311,883 µs |                                1,324,797 µs | OWNER-GATED-PENDING-RATIFICATION |
```

Both consistency notes are present and both independent checks reproduce: the 10× impossibility
**strengthens from 1.667× to 1.906×**, and the restated headrooms land **25.0% / 18.8%** below the
published `311,661` / `623,434`, reproducing provenance finding **F-1 to the digit**.

**The falsifier, measured rather than trusted** — ⟨cmd⟩ over the ledger's four budget rows:

```
$ grep -E '^\| (historical|candidate|measured)' BAR-LEDGER-2026-09-17.md | grep -c '1,870,633\|187,063\|623,544\|935,317'
0
```

**Zero budget rows carry a `1,870,633`-derived figure.** CC-097's _"UNCITABLE until restated"_ holds
in the lane's artifact. **G-6 GREEN.**

**Q-2's operative reading, re-checked.** The falsifier's words are _"cite `623,544` or `935,317` as
**this lane's budget** anywhere"_. Those strings do appear under `docs/tranches/X/` — in `W1.md`
itself, in the execution record and in `LEDGER.md` — and in **every** occurrence the figure is cited
**in order to forbid it**. Those are dated specs and dated execution records, immutable under E-3;
deleting the strings would be editing pinned authorities. The gate binds the **budget claim**, and
**zero lane artifacts make one**. `.e` stated this reading in the ledger §3 rather than narrowing the
falsifier silently, which is the correct posture and is upheld here.

---

### G-7 — THE BAR IS OWNER-GATED, AND SAYS SO (`.e`)

Re-measured at this seat on the committed ledger:

```
row-scoped OWNER-GATED-PENDING-RATIFICATION cells            3     (the three Plane-B candidate/break-even rows)
total OWNER-GATED-PENDING-RATIFICATION occurrences           8     (prose + the §5 self-check rows)
'the bench passes' / 'the bench fails'                    1 / 1    — BOTH inside the one falsifier row that quotes them to deny them
lines carrying ✓ or ✗                                        3     — all three prose; 0 column headers, 0 data cells
Plane A = §1 · Plane B = §2                                        — no table carries a row from both
```

Each of the five glyph/phrase hits was read by this seat, not counted: line 12 (_"no table here prints
a ✓/✗ column"_), line 170 (_"There is no ✓/✗ column in this table, and there will not be one"_) and
line 346 (the falsifier row itself) — and the two phrase hits are the same line 345 falsifier row,
answered **"none exists as a claim"**. **The forbidden thing is named in order to be denied, never
made.** **G-7 GREEN.**

**SELF-COUNT, stated with an instrument its own correction cannot move (E-F2's lesson, taken).** A
reader greping **this report** will find the strings `the bench passes`, `the bench fails`, `✓` and
`✗` in it. **A raw count of them is not published here, because a paragraph describing them changes
it — that recursion is exactly what cost unit `.e` four corrections.** The stable claim, which no
later edit to this file can perturb, is the one that matters: **every occurrence of either phrase in
this report sits inside a quotation that denies it, and every glyph sits in prose or in a cell
reporting the absence of a column. This report prints no ✓/✗ column and no data cell bearing one, and
makes no pass/fail claim about Plane B.** The glyphs in **§G-2** are equivalence readings and touch no
plane at all.

Plane A is attributed to **CC-095** with its ruled home at **X-W9 G28** and its applicability to X·P
**raised as owner confirmation A-1**, applied to no figure. Plane B's ≥10× is **RETIRED AS LAW**; the
other three stay **`0/5` OPEN and UNRATIFIED**. **COHESION §0j.E OC-1 is quoted and read as a
prohibition, not a ratification** — it rules the bench table RECORDED-NOT-GATING and ratifies **no**
bar. The converse falsifier is also satisfied: the seven measured leg rows **are** published, so the
gate is not failed by declining to measure for want of a bar.

---

### G-8 — R1 TOTALITY (`.e`) — **RED, and RED is what its title declares**

⟨cmd⟩ (unpiped, stdout and stderr to separate files so `$?` is the probe's own — **L-2**)
`node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs`

```
RED  parseCssColor             102/172 throw
RED  parseCssScalar            102/172 throw
RED  parseCssValue              60/172 throw
RED  parseCssValues             60/172 throw
ok   parseKeyframeSelector       0/172 throw
ok   parseStylesheet             0/172 throw
ok   parseTimingFunction         0/172 throw
ok   parseAnimationTimeline      0/172 throw
ok   parseAnimationRange         0/172 throw

TOTAL 324 throws / 1548 calls
DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')

RED — 324 totality violations. A ParseResult-returning parser must not throw.
```

**`EXIT=1`** · stderr **191 B**, entirely node's own `[DEP0205] module.register() is deprecated`
warning and **no probe output** (`.e` measured 190 B on its run — the delta is the PID digit count in
node's warning prefix; both readings are printed, neither is elected). **Gate 27** → **0 lines** after
the run, so the probe's `npm pack` into an OS `mkdtemp` wrote **no repository byte**, as its contract
claims.

**324 / 1,548, one failure mode, `parseCssColor` 102/172 — reproduced to the digit at today's HEAD**,
matching the gate header, the parser-band adjudication, the wave's open, `.e`'s run, **and** `.d`'s
independent bench cross-check (`published-4.0.0 parseCssColor throws 102/172 on the degenerate
cross-product`). **Nine parsers targeted; four RED, five ok** — the gate's _"it targets all nine"_
sentence measured, not quoted. **L-3 satisfied**: a fresh reading at this HEAD, never a pasted count.

**The MEASURE-AT-OPEN obligation — the only obligation this wave carries under G-8 — is DISCHARGED.**
The gate's GREEN condition (_"zero throws, exit 0"_) is unreachable here: §3 L109 reads _"No grammar
is written, no candidate is implemented"_, and the gate's own falsifier keeps it wired _"until the
whole surface is total"_. **This seat does not dress a RED as a GREEN.** See §6.2.

---

### G-9 — DEPTH IS DECLARED, NOT DISCOVERED (`.d`)

Printed by the same bench command at this seat:

```
Parser.lazy ceiling MEASURED IN THE CENSUS PROCESS AT THIS CLOCK: deepest OK = 7773;
failure mode = RangeError thrown at depth 7774; Parser.lazy arity 1 (fn only — no depth bound).
   corpus                 items  bytes  depth  margin  all-strings
   shared-accepted            7    306      2    7771  true
   reject-non-throwing        9    100      3    7770  true
   r1-throw-class           172   1419      1    7772  true
   json-normaliser            1    220      3    7770  true
   Declared bound: every corpus in this lane nests at most 3 deep, with margin ≥ 1000 required and 7770 measured.
```

**The ceiling is never inherited.** W1.md and O-15 PT-04 read **7,761**; the wave's open re-measured
**7,759** (finding F-1); `.d`'s census process and this seat's both read **7,773** (finding D-F1) —
and the probe **re-run at this very seat, minutes apart, still reads 7,759**. The ceiling is a
property of a **stack shape**, not of a box or a clock, and that is precisely why the gate's own words
are _"a declared depth with no margin fails: the margin is the assertion."_ **Margin ≥ 1,000 required,
7,770 measured — a factor of 2,590 between the deepest corpus (3) and the shallowest observed ceiling
(7,759).** No input in any corpus can convert a parse failure into a thrown `RangeError`. **G-9
GREEN.**

The related JS-boundary invariant (§3 item 9) is asserted **above** parse-that and printed:

```
raw parse-that: 5/5 non-string inputs throw (TypeError) — PT-07 reproduced, not assumed.
guarded above parse-that: 0/5 throw; every one returns the typed failure non_string_input.
```

and the guard deliberately **does not** catch an engine exception on a string input — wrapping those
would turn R1 into a tidy `ok:false` and delete the defect the r1 leg exists to price.

---

### G-10 — THE FIVE DEBTS ARE MEASURED, NOT ASSUMED (`.d`)

⟨cmd⟩ (run from the workspace, **unpiped**, stdout and stderr to separate files)
`node docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`

```
RED  DEBT-1  cand-F reject() label, diagnostics OFF (shipping default) undefined
RED  DEBT-1  Parser.prototype.label / .expected combinator      absent
RED  DEBT-1  enableDiagnostics() is process-global (arity)      0 args
RED  DEBT-3  Parser.lazy ceiling (deepest OK = 7759), failure mode RangeError thrown at depth 7760
RED  DEBT-3  Parser.lazy depth-bound parameter                  arity 1 — (fn) only

     UNARMED median 55.4 ns/parse  (compare the two runs)
ok   LATCH   PACKRAT_ARMED is a module-global one-way flag      packrat-entry chunk :678,:722 — set by makeMemoized(), never cleared
RED  GUARD   parseState(non-string) totality                    5/5 throw raw TypeError
RED  GUARD   .parse() failure signal                            returns undefined — indistinguishable from .opt()

RED — 7 gap(s)
```

**`EXIT=1`, unpiped · stderr 0 bytes.** Both limbs the gate reads are present: the printed
`RED — N gap(s)` line **and** `$?` from an unpiped invocation (**L-2** — _"a gate that trusts a piped
exit status is vacuous"_). **This wave lowers none of the seven**, and they are now recorded in the
lane's own artifacts (`bench-baseline.json` `probes_API_TEST`, the ledger §5, this report) so a later
wave's claim to have cured one is measurable against a pasted prior. **G-10 GREEN.**

Two dated divergences from the 2026-08-03 paste, both already banked and both re-confirmed here:
the `Parser.lazy` ceiling (**7,759** vs 7,761 — F-1/D-F1) and the UNARMED median (**55.4** here,
56.4 / 58.0 at open, 55.6 in the spec, 93.9 in O-15 — **F-5**). Neither moves a verdict; the second is
the spec's own argument for reporting ratios rather than nanoseconds, measured.

---

## 3. Commit roster

**Two histories, never merged** (§9). Commits into the fresh root are made in that root; their hashes
are recorded here.

### In `/Users/mkbabb/Programming/parse-that-css-totality-p2` (`<p2>` — no remote, W0 `.c`'s `remote remove`, R-2 UPHELD)

| unit | commit                                     | subject (§9, verbatim)                                                                                | files                                   |
| ---- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `.a` | `d8a529aedc5927843bbaed3e57b73cdf06f5a18d` | `feat(x-p-w1/totality): derive the 52-export corpus and its TOTAL/PARTIAL/ABSENT runner`              | **10**, all under `harness/totality/`   |
| `.b` | `d1458f4f3c08899cb832752214e8c719cb8ed318` | `feat(x-p-w1/equivalence): port the 403-string oracle with its three-class taxonomy intact`           | **5**, all under `harness/equivalence/` |
| `.d` | `4df9e914bfa66e120aaba2ae34c00dae9106e6e5` | `feat(x-p-w1/bench): one process per cell, latch asserted, diagnostics quarantined`                   | **16**, all under `harness/bench/`      |
| `.e` | `336b2add6bb7cb6886e04d65d3fa3d35e0effc08` | `docs(x-p-w1/harness): the three instruments' README — what each proves and what none of them proves` | **1** — `harness/README.md`             |

### In `/Users/mkbabb/Programming/value.js`

| unit   | commit                                     | subject                                                                                         | files                                                          |
| ------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| seat 0 | `4df45e38`                                 | `docs(X·exec): X.P.W1 OPEN — baseline banked, 5 units planned`                                  | record · `execution/LEDGER.md`                                 |
| seat 0 | `26402c9a`                                 | `docs(X·exec): X.P.W1 OPEN — E13 sweep line appended to the INBOX ledger…`                      | record · `coordination/INBOX.md`                               |
| `.c`   | `f9c0acb2ed2d6e491f94bd46b8e3d80e60d2ba70` | `docs(x-p-w1/rescue): lift the parser-proof harnesses off the job scratchpad + sha256 manifest` | **190**, all under `evidence/W1/rescued/`                      |
| `.c`   | `6abe729f`                                 | `docs(x-p-w1/record): X.P.W1.c receipts…`                                                       | record                                                         |
| `.a`   | `7d1c9474`                                 | `docs(x-p-w1/totality): X.P.W1.a receipts…`                                                     | record                                                         |
| `.b`   | `43c9aa4b`                                 | `docs(x-p-w1/record): X.P.W1.b receipts…`                                                       | record                                                         |
| `.d`   | `18dcbf9b`                                 | `docs(x-p-w1/record): X.P.W1.d receipts…`                                                       | record                                                         |
| `.e`   | `71b25ff35c337b99f8699e647d05e90063344727` | `docs(x-p-w1/bar): restate every budget against 1,636,680 µs; the bar stays OWNER-GATED`        | **5** — ledger · baseline · harvest · DEFECT-LEDGER · COHESION |
| `.e`   | `fbbe4756`                                 | `docs(x-p-w1/record): X.P.W1.e receipts…`                                                       | record                                                         |
| `.e`   | `296db58b`                                 | `docs(x-p-w1/record): X.P.W1.e dated self-correction…`                                          | record                                                         |

**Bounds audit at this seat — ⟨`git show --name-only`⟩ over every commit above.** Every path lands
inside the committing unit's §4 writable set. **Zero landed-wrong paths.** Specifically:

- `.c`'s 190 paths are all `evidence/W1/rescued/**` — §4 rows L145–146.
- `.a`/`.b`/`.d`'s `<p2>` paths are the three **disjoint** subtrees §4a promises; ⟨`git show --stat`⟩
  shows **no unit's commit carries a byte of another's**, which matters because `.a` and `.b` were
  writing the same index concurrently.
- `.e`'s five value.js paths are exactly its §4 rows, and its `COHESION.md` carve is **16 insertions /
  0 deletions** in a hunk at `@@ -141,6 +141,22 @@` — wholly inside `## §5` (line 131) and above
  `## §0a` (line 161). **Purely additive; §5's status board only; the §1 register row at `:18` was not
  touched.**
- `scripts/dev/dev.sh` appears in **no** commit of this wave. ⟨`git log --all -- scripts/dev/dev.sh`⟩
  over the wave's range → nothing. It remains ` M` in the working tree by standing arrangement.
- **Gate 27** ⟨`git status --porcelain -- src api demo test e2e`⟩ → **0 lines**, asserted by this seat
  before and after every gate re-run, including after both probe invocations that `npm pack` the
  repository.

**Three paths this wave wrote that are NOT §4 rows, declared rather than left implicit**:
`docs/tranches/X/execution/D/X-P-W1.md` (the wave's execution record),
`docs/tranches/X/execution/LEDGER.md` (the shared cross-track ledger) and
`docs/tranches/V/coordination/INBOX.md` (one appended E13 sweep line). None is in `W1.md` §4 because
`W1.md` was authored 2026-08-03, before this sitting's execution-record convention existed. All three
are **standing orchestration infrastructure** — every track of this sitting writes them, the E13 mail
law (owner edict 2026-07-17) mandates the third, and this seat's own close instructions direct writes
to the first two. **Recorded as a spec/convention seam, not as a bounds violation.**

---

## 4. §8 Verification artefacts

| artefact                                                     | state                                                                                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `<p2>/harness/{totality,equivalence,bench}/**`               | **present**, 31 tracked files across three disjoint subtrees                                                      |
| `<p2>/harness/README.md`                                     | **present**, 198 L / 13,933 B, authored last, carrying the `bench.ts` argv cross-wave contract                    |
| `tsc --noEmit` output                                        | **equivalence trio exit 0**; **`bench.ts` NOT CLEAN** — see Residual R-1                                          |
| `vitest run` output                                          | **NOT TAKEN** — see Residual R-2; the structural requirement is met by `diagnostics-suite.mjs`                    |
| `evidence/W1/rescued/**` + `MANIFEST.sha256`                 | **present**, 190 files; `shasum -c` exit 0, 189 OK; three-file spot re-hash pasted at §G-3                        |
| `evidence/W1/BAR-LEDGER-2026-09-17.md`                       | **present**, 376 L / 27,561 B; two planes, four restated budgets, both consistency checks                         |
| `evidence/W1/bench-baseline.json`                            | **present**, 533 L / 17,259 B; parses; machine record + N=1 bound; ⟨`grep '"verdict"\|"meets_floor"'`⟩ → **null** |
| `r1-published-totality.mjs` re-run + unpiped `$?`            | **pasted at §G-8**, `EXIT=1`                                                                                      |
| `parsethat-surface-gaps.mjs` re-run + unpiped `$?`           | **pasted at §G-10**, `EXIT=1`                                                                                     |
| equivalence defect count by class + declared-divergence list | **pasted at §G-2**, `A/B/C = 0/0/0`, 22 ruled rows + 4 DISSENTs                                                   |
| `waves/W1-CLOSE.md`                                          | **this file**                                                                                                     |
| `registry/harvest/x-p-w1.json`                               | **present**, `runId wf_c431fb2c-82d`, `resultCount 12`; **4 unit rows, not 5** — see Residual R-3                 |
| model receipts, all five seats                               | **line 1 `SERVED MODEL: claude-opus-5[1m]` on every authored file**, verified at this seat (see below)            |

**Receipt audit.** Every authored source file of the four `<p2>` commits and the two value.js
artifacts carries the receipt on line 1 — `derive.mjs` on line 2 beneath its shebang; `bench-raw.json`
/ `bench-results.json` / `equivalence-results.json` / `bench/package.json` as a `servedModel` key,
because a JSON artifact cannot carry a bare text line and stay machine-readable;
`bench-baseline.json` as the object's **first** key. Two files carry none and both are correct:
`harness/equivalence/corpus.json`, whose identity **is** its byte-exact digest (R-b3), and
`harness/bench/bench.stderr`, which the gate requires to be **zero bytes**.

---

## 5. Residuals — owners named

| id      | severity                                            | residual                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | owner                                                                                                                                                        |
| ------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **R-1** | **MINOR — found by this close seat, not by a unit** | **§7's `tsc --noEmit` limb was never taken over `harness/bench/bench.ts`, and it is not clean.** `.b` ran it over `harness/equivalence/harness.ts` (exit 0, re-confirmed here); `.d`'s receipt names prettier, vitest and the `npx` obstruction but **no typecheck**. Measured at this seat under `.b`'s own flags: **3 diagnostics at tsc defaults** (`TS2339 ×3` at `bench.ts:108–109` — `Object.entries(subjectPins())` values inferred `unknown`) and **5 under `--strict`** (adding `TS7016 ×2`, implicit-`any` imports of the plain-`.mjs` siblings `lib/engines.mjs` and `lib/stats.mjs`). **No gate reads tsc** — G-4/G-5/G-9's GREEN conditions are the printed assertions, the byte-empty stderr and the depth table, all of which reproduce — so this is a **cadence gap, not a gate flip**, and it is a display-loop typing artefact, not a behavioural defect. | **X.P.W2's bench consumer**, which binds this entry by name                                                                                                  |
| **R-2** | **MINOR**                                           | **§7's `npx vitest run` limb was NOT taken, and cannot be taken in bounds.** Measured: `<p2>` has **no root `package.json`, no `node_modules`, no vitest config**, `npx` from `<p2>` does not complete (R-3 below / §6.1), and ⟨`find harness -name '*.test.*' -o -name '*.spec.*'`⟩ → **0**. Creating any of those three is Q-1's named **§3a file-bound expansion that invalidates the wave**. G-5's _structural_ requirement is met and measured: the labelled-failure suite is a separate file in a separate process.                                                                                                                                                                                                                                                                                                                                                   | **orchestrator** — either §7's limb gains a dated addendum, or a later wave's bounds admit a `<p2>` package root                                             |
| **R-3** | **MINOR**                                           | **§5.e's seat-count sub-gate is NOT met at the artifact: `x-p-w1.json` carries 4 unit-result rows, not 5.** Verified at this seat: `.c DONE · .a DONE · .b PARTIAL · .d DONE`; `.e` is structurally absent because a harvesting unit cannot appear in its own harvest. `.e` made this **checkable rather than asserted** — the dispatch roster of **5** (`X.P.W1.a`…`.e`) is inside the artifact. This close seat is **VERIFY-ONLY** and does not re-harvest: `registry/harvest/x-p-w1.json` is `.e`'s §4 create row. This is W0's **R-3** reproduced exactly.                                                                                                                                                                                                                                                                                                              | **orchestrator** — a post-return re-harvest with the same unmodified command, or the sub-gate gains a dated addendum acknowledging the structural floor of 4 |
| **R-4** | **INFO**                                            | **`equivalence-results.json` and `bench-{raw,results}.json` are regenerated by every gate run**, so `<p2>` goes dirty on a re-run. Narrowed at this seat: the equivalence re-run's diff from `.b`'s landed bytes is **the `generatedAt` line and nothing else** — all **403** rows byte-identical. The bench was re-run with `--out` outside the tree and left porcelain at **0**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | a re-runner; expect the diff, do not read it as drift                                                                                                        |
| **R-5** | **INFO**                                            | **`DEFECT-LEDGER.md` landed with 28 new `git diff --check` trailing-whitespace flags** — the harvester's conformance-schema drop (`.e`'s E-F3, X.P.W0's MAJOR finding reproduced on fresh journals: 14 empty stubs, total 1,473 → 1,487). §4 gives this wave _execute, no write to itself_ over the generator; hand-editing generated bytes would be the masking fix the standing law forbids.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | the harvester's owner; falsifier stands at `EVIDENCE-CHAIN.md` §4a                                                                                           |
| **R-6** | **INFO**                                            | **§7's prettier limb is not run over `COHESION.md`, `LEDGER.md`, the execution record, or the rescued tree's 7 copied `.md` files.** Each refusal is measured and each would break something: rewriting landed evidence (**E-3**), reformatting a live document three other tracks edit concurrently, or **moving a manifest digest and falsifying G-3**. ⟨`git diff --check`⟩ → **0 flagged lines** on every path but `DEFECT-LEDGER.md` (R-5). Prettier **was** run to a verified fixed point over the four `.md` files the units authored fresh.                                                                                                                                                                                                                                                                                                                         | declared, standing                                                                                                                                           |
| **R-7** | **INFO**                                            | **D-3 (X.P.W0 CHECK 1's `roots-census.sh` EPERM disposition) remains RETURNED, NOT SCHEDULED.** `evidence/W0/**` is in no row of `W1.md` §4; authoring the successor script here would be the §3a trigger that invalidates the wave. Nothing is conflated today.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **orchestrator** — X.P.W2's open, or a dated §4 addendum to `W1.md`                                                                                          |
| **R-8** | **INFO**                                            | **Two dated divergences from the spec's 2026-08-03 baselines stand, neither a gate flip.** The `Parser.lazy` ceiling reads **7,759** from the probe and **7,773** from the bench census, at the same clock on the same box (F-1 / D-F1) — it is a property of a stack shape, which is why G-9's margin is the assertion. And G-6's grep baseline moved **0 → 35 → 38 hits**, every one a dated spec or execution record and **not one a lane artifact** (F-2 / E-F1).                                                                                                                                                                                                                                                                                                                                                                                                       | recorded; consumed by X.P.W2                                                                                                                                 |
| **R-9** | **INFO**                                            | **Three lane-standing findings recorded, cured by nobody this wave** (§3 L109 writes no grammar): **A-F1** the kf column measures 2 PARTIAL/37 where `coverage.md` Surface 2 carries 3 — 3 is right for the 52, 2 for the 37-symbol column, recorded beside a sealed record never folded in place; **A-F2** published 4.0.0's `parseCssColor` does not accept `color-mix()`; **D-F2** published 4.0.0's `parseStylesheet` **accepts** `@@@ { }` where cand-O rejects it — routed to the equivalence oracle, where an accept/reject divergence belongs.                                                                                                                                                                                                                                                                                                                      | **X.P.W2**                                                                                                                                                   |

---

## 6. Escalations — two, returned to the owner and the orchestrator

### 6.1 — **G-2's and G-4/G-5's literal invocation cannot run from `<p2>` on this box**

`W1.md` §6 names three literal commands _"run from `<p2>`"_: `npx tsx harness/equivalence/harness.ts`
(G-2), `npx tsx harness/bench/bench.ts` (G-4, G-5). **None of them completes**, and the cause is
upstream of every byte this wave wrote. Reproduced at this seat with a 25-second cap on a command
that runs **none** of this wave's code:

```
$ cd <p2> && npx tsx --version     →  STILL RUNNING AT 25 s — KILLED
```

Diagnosed at npm's own installed bytes by `.b` and re-confirmed here: `<p2>` has no `package.json`, so
npm's prefix up-walk terminates at the stray `/Users/mkbabb/package.json`, `npm prefix` returns
`/Users/mkbabb`, and `libnpmexec`'s `loadActual()` walks the entire home directory (`.b` measured
every libuv worker in `uv__fs_work`, 4 GB heap, `EXIT=134` after 149 s). No global `tsx` exists to
trigger npm's fast path.

**Everything in bounds was tried, and the gates' products are fully measured through the same entry
names:**

| invocation                                                           | cwd       | result                                    |
| -------------------------------------------------------------------- | --------- | ----------------------------------------- |
| `npx tsx harness/{equivalence/harness,bench/bench}.ts`               | `<p2>`    | **BLOCKED** — npm, before tsx starts      |
| `<npx-cached>/tsx harness/…` — _the exact binary `npx tsx` resolves_ | `<p2>`    | **`EXIT=0`**, stderr 0 B                  |
| `node harness/bench/bench.ts` — node 26 native type stripping        | `<p2>`    | **`EXIT=0`**, stderr 0 B                  |
| `npx tsx <abs>/harness/…`                                            | elsewhere | **`EXIT=0`**, 1.17 s / 2.78 s, stderr 0 B |

**The three out-of-bounds cures are each refused rather than taken**, and this seat upholds every
refusal: (i) a `<p2>/package.json` or `<p2>/node_modules` is **Q-1's named §3a file-bound expansion
that invalidates the wave**; (ii) `npm i -g tsx` writes no bounded byte but mutates shared machine
state that three concurrent seats and every later X·P wave resolve through — **not a unit's to
decide**; (iii) `NODE_OPTIONS=--max-old-space-size` is not the literal command and would be a masking
fallback around an unbounded directory walk. **Q-1's own instruction was followed: halt and return, do
not write.**

**This matters beyond this wave.** `W1.md` §5.d and **X.P.W2 §4** both bind the literal string _"the
bench entry `npx tsx harness/bench/bench.ts`, argv per W1's landed `harness/README.md`"_ as a
**cross-wave coordinate**. The coordinate is therefore unrunnable as written on this machine.

**The ruling is owed and is left where it belongs** — three options, none taken here: install `tsx`
globally; widen `<p2>`'s §4 bounds by dated E-3 addendum to admit a package root; or amend the
coordinate to name the cwd or the binary. **G-2 is recorded as _product-GREEN / literal-form-BLOCKED_,
never as a plain GREEN**, exactly as `.b`'s escalation R-b1 asked of this report.

### 6.2 — **G-8 cannot go green in this wave, and §6's preamble says all ten do**

`W1.md` §6's preamble and §12 read as though all ten gates go green at close. **G-8's own title is
_"R1 TOTALITY, RED TODAY"_**, its GREEN condition is _"zero throws, exit 0"_, its falsifier keeps it
wired _"until the whole surface is total"_, and **§3 L109 forbids writing the grammar that would
deliver it**. The wave's obligation under G-8 is its **MEASURE-AT-OPEN** clause, and that is
discharged three times over (open · `.e` · this seat), each a fresh unpiped reading at today's HEAD.

`.e` refused to dress the RED as a GREEN and handed the tension to this report. **This seat reads the
hard gate as _nine turned plus one measured-and-declared_ for the purpose of the IMPLEMENTED stamp,
marks the wave PARTIAL for it, and returns the reading to the owner** rather than silently redefining
a hard gate the spec fixed in August. The RED is not a failure of this wave; **R1 is the lane's
subject**, and the instrument that prices it now exists on tracked disk, which is what this wave was
for.

---

## 7. L-18 rider — acceptance is not close

Landing these gates makes this wave **IMPLEMENTED, not ACCEPTED** (§12). Acceptance requires **two**
challenging gestalt passes, each a **quartet of Opus 5 skeptics** across the three altitudes, then a
**fresh Fable** apotheosis. **VERIFIED is X.P.W4's alone (R-A)** and is not moved here.

§12's named exposure is **false precision** — _"it ships numbers, and numbers are believed"_ — and the
wave met it structurally rather than rhetorically. Every one of its five "obvious purchase" bases was
tested **by construction** and the instruments caught their own authors:

- _a coverage manifest that cannot go red when the surface moves_ — **five falsifiers**, of which
  **two (a rename; a slice move) preserve the count entirely** and are the ones G-1's literal wording
  would have passed.
- _an equivalence port that reproduces GREEN because its taxonomy quietly widened_ — the taxonomy is
  asserted **byte-for-byte**, and the falsifier put the gate **RED while the count `A/B/C` was still
  zero**.
- _a bench whose "unarmed" claim rests on not having called `memoize`_ — the latch is **read from the
  installed dist**, and an **unobserved** latch **halts** rather than counting as unarmed.
- _a ledger that publishes ratios while a summary sentence elsewhere reads as a verdict_ — **no
  verdict field exists in the output schema**, and the ledger's self-checking greps caught **four** of
  their author's own published figures, one of them introduced by the correction of another.
- _a rescued tree that is large but not reproducible_ — `node_modules` excluded, both lockfiles kept,
  lockfileVersion 3 with 61 of 62 entries carrying resolved + integrity.

**The one thing that would have most easily gone wrong did not**: §3a's _"the single most likely place
this wave goes wrong"_ is pressure to set the bar. It arose twice at `.e` — where OC-1 could have been
read as a ratification, and where seven measured leg rows could have been given a verdict column — and
was **refused both times**. **No bar is set by this wave.**

---

## 8. Push

- **`/Users/mkbabb/Programming/value.js`** → **PUSHED** to `origin/tranche-u`, no force. See the
  execution record's §Close for the receipt.
- **`/Users/mkbabb/Programming/parse-that-css-totality-p2`** (`<p2>`) → **NO REMOTE.**
  ⟨`git -C <p2> remote -v | wc -l`⟩ → **0**, by W0 `.c`'s deliberate `remote remove` (**R-2 UPHELD**),
  so the four `<p2>` commits are unpushable **by design**. Nothing was added, and no remote was
  created: creating one is not this seat's act.
- **`/Users/mkbabb/Programming/parse-that`** → **PUSH REFUSED, spec-forbidden.** That worktree is in
  `W1.md` §4's do-not-touch list (inherited whole from W0 §4) and in §3a's _"any write under
  `/Users/mkbabb/Programming/parse-that` … invalidates the wave"_. Read-only state at this seat:
  branch `master`, HEAD **`ef10d5b`** (the exact sha W0's G-5 source quadruple pins), 31 dirty
  working-tree lines that are not ours, and ⟨`git rev-list --count origin/master..HEAD`⟩ → **0** —
  **nothing to push even if it were permitted.** This is X.P.W0's close-seat refusal, reproduced for
  the identical reason.

---

**X.P.W1 — PARTIAL, IMPLEMENTED 2026-09-17.** Eight gates GREEN · G-2 product-GREEN with its literal
form BLOCKED and escalated · G-8 RED by its own design and escalated · **0 landed-wrong paths** ·
**0 UNREAD mail in scope** · **VERIFIED untouched, X.P.W4's alone.**
