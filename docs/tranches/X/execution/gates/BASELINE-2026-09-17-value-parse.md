SERVED MODEL: claude-opus-5[1m]

# X·EXEC — GATES BASELINE, 2026-09-17: X·V (gates 1–10) + X·P (gates 23–27)

**Seat**: gates-baseline seat, tranche X begin-word (2026-09-17).
**Authority**: `docs/tranches/X/EXECUTION-RUNBOOK.md` §2.1 (X·V, ten gates) and §2.4 (X·P, five
gates), with the per-gate specs at `docs/tranches/X/parse-that/waves/W0.md` §6 and `W4.md` §G-2.
**Standing law applied (R.2)**: *"Running them at wave-open re-dates the baselines; a PASS on any of
them before its cure lands is itself a finding and goes to the sitting."*
**Discipline**: read-only throughout. No `npm ci`, no build, no install, no fetch, no reset, no
stash, no branch write anywhere. No product source (`src/ demo/ api/ test/ e2e/`) opened for edit.
Sibling trees read-only. Every published count read from settled bytes and **double-run**; the
second pass is pasted at §D and is identical to the first in every cell.
**What this seat did NOT do**: where a gate's GREEN condition is an *act* (gate 23's dated ledger,
gate 25's `census-after` + diff, gate 26's `EVIDENCE-CHAIN.md`), only the read-only half was
measured and the act-half is marked **UNRUN**. Those acts belong to their waves.

---

## §A SUMMARY TABLE

| # | gate | repo/cwd | VERDICT | one-line reading |
|---|---|---|---|---|
| 1 | X-W0 G-F, the register | value.js | **RED-AS-EXPECTED** | 73 records / 604 occurrences; `X/waves/*.md` 0 in all twelve — set-difference non-∅ both ways |
| 2 | X-W0.j Glass-8 repin census | value.js | **RED-AS-EXPECTED** | `7.0.0` — unrepinned; the FAIL branch is the live branch; the `.g` cells stay held |
| 3 | X-W9 G2/NG-2, the R1 throw class | value.js | **RED-AS-EXPECTED** | `TypeError` on `oklch()`, `calc()`, `foo()` — the `<any-ident>()` class; reproduces in the packed 4.0.0 too |
| 4 | W-HYGIENE H-c falsifier | value.js | **RED-AS-EXPECTED** | `10 7` — the key drift, exact |
| 5 | X-W4 A4 witness | value.js | **RED-AS-EXPECTED** | placeholder-only accessible name; **0** `aria-label` on the input (3 siblings carry one) |
| 6 | X-W5 D4 witness | value.js | **RED-AS-EXPECTED** | `0`, against the bare `v-if="mode === 'colors'"` mode swap at `:114` |
| 7 | X-W7 N-1, the mount substrate | value.js | **RED-AS-EXPECTED** | `0` and `0`; `@vue/test-utils` **2.4.11** installed and unused |
| 8 | X-W1 R2, dead-locator census | value.js | **RED-AS-EXPECTED** | 8 rows; 4 are live in an **un-skipped** spec (`o18:648`), 4 are demo comments |
| 9 | X-W8 G-9 null-DELTA witness | value.js | **RED-AS-EXPECTED** | both lines `variant="outline"` |
| 10 | glass exports-map parity watch | value.js | **GREEN-BEFORE-CURE** | `./blob:true ./chip:true ./forms:true` — the runbook's own declared GREEN-at-pin; **already booked**, not a new finding |
| 23 | X·P W0 G-1, handoff identities | value.js + `~/.codex` | **RED-AS-EXPECTED** | all four named rows MATCH byte-for-byte; the wave's dated ledger does not exist — act-half **UNRUN** |
| 24 | X·P W0 G-2, EPERM is not absence | `~/Documents/Codex` | **DIVERGENT** | **the TCC wall is GONE.** Expected EPERM; measured **PRESENT/readable** 2026-09-17. Builder MATCH, residue MATCH, v12 target **ABSENT** — §9 STOP does **not** fire |
| 25 | X·P W0 G-3, eighteen roots | 18 roots | **DIVERGENT** | every git identity holds; but `worktree list` is **7, not 8** — the prunable `m2-baseline` registry record is **gone** (G-3's own named falsifier, fired pre-lane) |
| 26 | X·P W0 G-8, PLAW-BIND both ends | value.js | **RED-AS-EXPECTED** | both fragment greps return **1** row each (reciprocal end declared); the lane's own end absent — **1 of 2** |
| 27 | X·P W4 G-2, zero value.js source bytes | value.js | **GREEN-BEFORE-CURE** | porcelain over `src api demo test e2e` is **empty**. No cure exists — a standing invariant, and it holds |

**Tally — 15 gates owned: 11 RED-AS-EXPECTED · 2 DIVERGENT · 2 GREEN-BEFORE-CURE · 0 UNRUNNABLE.**

### The three rows that go to the sitting

1. **Gate 24 — the `~/Documents/Codex` TCC wall has lifted.** OP-2 of `parse-that/waves/W0.md` §2b
   was measured DENIED at authoring (2026-08-03); it is **GRANTED** as measured on 2026-09-17. The
   consequence is not cosmetic: handoff §9's STOP condition *"a present v12 target"* was, in the
   wave's own words, undetectable by this lane — *"today, this lane cannot detect that STOP
   condition at all — which is itself the finding."* It is detectable now, and **it does not fire**.
   Two of gate 23's three EPERM rows convert to **MATCH** on their exact expected SHA-256 and byte
   size, and the third converts to a **verified ABSENT**. X.P.W0's unit `.a` should be re-scoped:
   seven rows now resolve in-reach, not four.
2. **Gate 25 — G-3's named falsifier has already fired, by an actor outside this lane.** The
   08-03 census recorded `git -C parse-that worktree list` → **eight** entries, the eighth being the
   `prunable` record for `/private/tmp/parse-that-m2-baseline-20260729`, which `W0.md` §4 names
   explicitly: *"do not … `git worktree prune` — the last would delete the `prunable` registry entry
   …, which is itself a record."* Today the list returns **seven** and `.git/worktrees/` holds
   **six** directories; the record is gone. The registry parent's mtime is **Aug 26 16:33**, i.e.
   between the census and the begin-word. No `.git/gc.log` exists. Every surviving root's HEAD,
   branch and file count are byte-identical to the baseline, and `parse-that/.git` is still 28M — so
   this is a lost *record*, not a lost *object store*. The lane must decide whether G-3's census
   table is amended by dated addendum (E-3) to an **eighteen-root / seven-worktree** shape, or
   whether the loss is itself a §3a return.
3. **Gate 10 and gate 27 read GREEN at the begin-word**, both as the runbook expects. Gate 10 is the
   already-booked green-at-pin routed to the sitting via §EXTERNAL and flips RED at the 8.0.0 repin
   (`./forms` dies, X-EXT-2) — it is on the slate to catch exactly that. Gate 27 has no cure: its
   expected reading *is* empty, so its green is conformance, **not** an R.2 finding. Neither is a
   new sitting item; they are recorded so the tally is honest.

### Disclosed method caveats (so no later reader has to take them on trust)

- **Gate 3's substrate is a stale local build.** `dist/subpaths/css.js` is **gitignored, untracked,
  dated Aug 29 15:30**, and this seat is forbidden to rebuild. The gate therefore reads bytes this
  seat did not produce and cannot re-derive. It is cross-checked against the **packed registry copy**
  (`node_modules/@mkbabb/value.js` @ **4.0.0**), which throws the identical `TypeError` — so the R1
  crash is in shipped bytes, not only in a local artifact. X-W9 should still re-measure against a
  fresh build at its own open.
- **Gate 25's census carries one addition by this seat.** The `DIRTY` column is *not* part of G-3's
  command pair (`rev-parse` + `find`); it was taken with `git -C <root> status --porcelain`, which
  may refresh a worktree's index stat-cache. No tracked content, HEAD, ref, branch, or object-store
  byte changed. **The wave's own before/after censuses should use `rev-parse` + `find` only** (or
  `--no-optional-locks`) so the "diff to empty" assertion is untainted by the measuring instrument.
- **`.p-totality` is recorded literally, not adjudicated.** The 08-03 baseline reads *"6 entries +
  evidence-archive-2026-08-03.tar.zst"*; today `ls -1` returns **six** entries **including** the
  archive. Whether the baseline's "6" excluded the archive is not resolvable from the bytes, so this
  seat records the measured list and asserts **no delta**. The archive itself is byte-stable at
  323,894,591 B.

---

## §B PER-GATE RECEIPTS — X·V, gates 1–10

All ten run at `cwd = /Users/mkbabb/Programming/value.js`, node v26.0.0, darwin arm64, 2026-09-17.

### Gate 1 — X-W0 G-F, the register

⟨cmd⟩ `ls docs/tranches/V/megatranche/registry/adjudicated/*.md | grep -vE '/(kf|fr|pt)-' | xargs grep -c 'NO-WAVE-OWNER' | grep -v ':0' | wc -l`

```
      73
```

⟨cmd⟩ (occurrences, `-o` form) `… | xargs grep -o 'NO-WAVE-OWNER' | wc -l`

```
     604
```

⟨cmd⟩ `grep -c NO-WAVE-OWNER docs/tranches/X/waves/*.md`

```
docs/tranches/X/waves/W11.md:0
docs/tranches/X/waves/W0.md:0
docs/tranches/X/waves/W1.md:0
docs/tranches/X/waves/W2.md:0
docs/tranches/X/waves/W10.md:0
docs/tranches/X/waves/W5.md:0
docs/tranches/X/waves/W9.md:0
docs/tranches/X/waves/W6.md:0
docs/tranches/X/waves/W3.md:0
docs/tranches/X/waves/W4.md:0
docs/tranches/X/waves/W8.md:0
docs/tranches/X/waves/W7.md:0
```

Denominators, for the reader: 231 `.md` in `adjudicated/`, **92** after the `kf|fr|pt` exclusion, of
which **73** carry the token.

**Expected** (runbook §2.1): 73 records / 604 occurrences; 0 in all twelve X waves; RED until the
set-difference is ∅ both ways.
**VERDICT: RED-AS-EXPECTED.** Exact on both figures and on all twelve zeros. Note for the reader:
the **line**-sum of `grep -c` is **590**; the runbook's **604** is the `grep -o` **occurrence**
count. Both are reported so the two are never conflated by a later re-measure.

### Gate 2 — X-W0.j, the Glass-8 repin census (the X-W4.g trigger)

⟨cmd⟩ `node -p "JSON.parse(require('fs').readFileSync('node_modules/@mkbabb/glass-ui/package.json','utf8')).version"`

```
7.0.0
```

**Expected**: `7.0.0`; census 1/4; the FAIL branch is the live branch, `.g` cells held; run under
S-11's widened option set (8.0.0 **and** 9.0.0, the latter tag-pinned and registry-absent, §3.2).
**VERDICT: RED-AS-EXPECTED.** The installed pin is unmoved at 7.0.0, so the repin has not occurred
and the held-cells branch stands. The §0i ruling (glass **8.0.0** registry-pinned `17a11bc5` at both
X-W0.j and F.W1 G1) is therefore still entirely ahead of the tree.

### Gate 3 — X-W9 G2/NG-2, the R1 throw class

⟨cmd⟩ `node -e 'import("./dist/subpaths/css.js").then(m=>m.parseCssColor("oklch()"))'`

```
file:///Users/mkbabb/Programming/value.js/dist/subpaths/css.js:265
	let v = x(g[0].replace(/,/g, " "), "space"), y = t.toLowerCase();
	               ^

TypeError: Cannot read properties of undefined (reading 'replace')
    at ae (file:///Users/mkbabb/Programming/value.js/dist/subpaths/css.js:265:17)
    at Module.T (file:///Users/mkbabb/Programming/value.js/dist/subpaths/css.js:354:13)
    at [eval]:1:44

Node.js v26.0.0
```

Class widening, same import, same shape:

```
calc()  -> TypeError: Cannot read properties of undefined (reading 'replace')
foo()   -> TypeError: Cannot read properties of undefined (reading 'replace')
```

Packed-registry cross-check ⟨cmd⟩ `node -p "require('./node_modules/@mkbabb/value.js/package.json').version"` → `4.0.0`;
the same probe against `node_modules/@mkbabb/value.js/dist/subpaths/css.js` →
`TypeError: Cannot read properties of undefined (reading 'replace')`.

**Expected**: `TypeError` (likewise `calc()`, `foo()` — the class is `<any-ident>()`; the
three-parser asymmetry stands); RED, and the battery must widen past the nine colour functions.
**VERDICT: RED-AS-EXPECTED.** The `<any-ident>()` class is confirmed on all three idents, and —
beyond what the gate asked — confirmed in the **published 4.0.0 bytes**, which upgrades R1 from "a
local build crashes" to "the shipped package crashes". Substrate caveat at §A.

### Gate 4 — W-HYGIENE H-c falsifier

⟨cmd⟩ `node -e 'const fs=require("fs");const t=JSON.parse(fs.readFileSync("tsconfig.demo.json","utf8").replace(/^\s*\/\/.*$/gm,""));const p=require("./package.json").exports;console.log(Object.keys(t.compilerOptions.paths).length, Object.keys(p).length)'`

```
10 7
```

**Expected**: `10 7` — the key drift. RED; **cure = DELETE the inert block, never repair.**
**VERDICT: RED-AS-EXPECTED.** Exact.

### Gate 5 — X-W4 A4 witness

⟨cmd⟩ `sed -n '81,87p' demo/shell/dock/layers/SlugEditLayer.vue`

```
        <input
            ref="slugInputRef"
            v-model="slugInput"
            placeholder="enter slug or token..."
            class="text-mono-small bg-transparent border-none outline-none w-40 min-w-0 placeholder:text-muted-foreground"
            @keydown.escape.stop="slugEditMode = false"
        />
```

Corroborating ⟨cmd⟩ `grep -n 'aria-label\|aria-labelledby\|<label' demo/shell/dock/layers/SlugEditLayer.vue`

```
89:             controls carry aria-label (the UA tooltip slab is a foreign
94:            aria-label="Switch to slug"
106:        aria-label="Generate new slug"
114:        aria-label="Cancel"
```

**Expected**: the placeholder-only accessible name. RED at both matrices.
**VERDICT: RED-AS-EXPECTED.** The input carries no `aria-label`, no `aria-labelledby`, and no
`<label>`; its only name source is `placeholder`. The three sibling controls at `:94/:106/:114` *do*
carry one — so the omission is local to the input, which is the sharpest possible form of the
witness.

### Gate 6 — X-W5 D4 witness

⟨cmd⟩ `grep -c '<Transition ' demo/workbenches/mix/MixSourceSelector.vue`

```
0
```

Corroborating ⟨cmd⟩ `sed -n '110,120p' demo/workbenches/mix/MixSourceSelector.vue`

```
            />
        </div>

        <!-- Colors mode -->
        <template v-if="mode === 'colors'">
            <!-- Selected colors + add button -->
            <div class="dashed-well">
                <!-- W5-7: the "N colors" counter died — it restated the
                     visible chips (and read "1 colors" at one). -->
                <span class="text-small font-display font-semibold text-muted-foreground">Selected</span>
                <TransitionGroup
```

**Expected**: `0`, against the bare mode swap at `:114`. RED.
**VERDICT: RED-AS-EXPECTED.** Exact — and `:114` is confirmed to be the bare
`<template v-if="mode === 'colors'">` swap the gate names. (The `<TransitionGroup` at `:120` is a
different element and is correctly not matched by the gate's `'<Transition '` pattern, trailing
space included.)

### Gate 7 — X-W7 N-1, the mount substrate

⟨cmd⟩ `grep -rn 'mount(' test/ demo/ --include='*.test.ts' | wc -l`

```
       0
```

⟨cmd⟩ `grep -c 'plugin-vue' vitest.config.ts`

```
0
```

Corroborating ⟨cmd⟩ `node -p "try{require('./node_modules/@vue/test-utils/package.json').version}catch(e){'ABSENT'}"`

```
2.4.11
```

**Expected**: `0` and `0`; `@vue/test-utils` installed and unused. RED.
**VERDICT: RED-AS-EXPECTED.** All three cells exact: no mount call, no vue plugin in the vitest
config, and the dependency present at 2.4.11 with nothing importing it.

### Gate 8 — X-W1 R2, the dead-locator census headline

⟨cmd⟩ `grep -rn 'plate-caption' e2e/ demo/`

```
e2e/smoke/oracles/o18-contrast-census.spec.ts:654:            const caption = page.locator(".plate-caption").first();
e2e/smoke/oracles/o18-contrast-census.spec.ts:658:                ".plate-caption",
e2e/smoke/oracles/o18-contrast-census.spec.ts:659:                "spectrum-plate-caption",
e2e/smoke/oracles/o18-contrast-census.spec.ts:680:                const caption = document.querySelector(".plate-caption");
demo/shell/dock/ParseEchoReadout.vue:42: * typed color clips visibly in sRGB (the plate-caption register). */
demo/shared/ui/PaneHeader.vue:120: * :root (the plate-caption / parse-echo voice, ≥4.5 on the composited resting
demo/color-session/useContrastSafeColor.ts:318:    // plate — the boot writer stamps it as `--ink-muted` (the plate-caption /
demo/color-picker/composables/boot/useAtmosphereBoot.ts:86:    //     the plate-caption + parse-echo voice; post-hoc opacity died).
```

8 rows. The un-skipped-ness of the owning spec ⟨cmd⟩
`grep -n "test.skip\|test.describe.skip\|test(" e2e/smoke/oracles/o18-contrast-census.spec.ts`:

```
648:        test("plate captions — the certified de-emphasis rung `--ink-muted` (F-4/F-10)", async ({
```

(no `test.skip` / `test.describe.skip` anywhere in the file).

**Expected**: a live un-skipped spec asserts a class deleted at `a68ecdc1`. RED; `test.skip()` is
deferral under a new name and does not discharge it.
**VERDICT: RED-AS-EXPECTED.** The four `e2e/` rows are inside `test("plate captions …")` at `:648`,
which is **un-skipped**; the four `demo/` rows are **prose comments only** — no demo template emits
the class. The live locator therefore asserts against a class no component renders.

### Gate 9 — X-W8 G-9, the null-DELTA witness

⟨cmd⟩ `sed -n '8p;22p' demo/palettes/browser/admin/PaginationBar.vue`

```
            variant="outline"
            variant="outline"
```

**Expected**: both lines `variant="outline"`. RED; the cure collides with X-W7's quiet-migration
reading (a sitting item).
**VERDICT: RED-AS-EXPECTED.** Exact. The collision with X-W7 is carried forward untouched by this
seat.

### Gate 10 — the glass exports-map parity watch

⟨cmd⟩ `node -p "const e=JSON.parse(require('fs').readFileSync('node_modules/@mkbabb/glass-ui/package.json','utf8')).exports;['./blob','./chip','./forms'].map(k=>k+':'+(k in e)).join(' ')"`

```
./blob:true ./chip:true ./forms:true
```

**Expected**: `./blob:true ./chip:true ./forms:true` — **GREEN-at-pin, not RED**; it stays on the
slate because it flips RED at the 8.0.0 repin (`./forms` dies — X-EXT-2).
**VERDICT: GREEN-BEFORE-CURE.** The reading matches the runbook's expected string exactly, and its
green is the *declared* state the runbook already routed to the sitting via §EXTERNAL — so this is
**the re-dated confirmation of a booked item, not a new R.2 finding**. It is consistent with gate 2:
both say the tree is still at glass 7.0.0 and the repin is wholly ahead.

---

## §C PER-GATE RECEIPTS — X·P, gates 23–27

### Gate 23 — W0 G-1, handoff identities re-derived

⟨cmd⟩ `shasum -a 256 docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md`
and the sibling rows `parse-that/waves/W0.md` §6 G-1 names:

```
ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7  docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md
244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7  /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
aa891714b3b6bb3386afda45201b203ac5aa1f2ef028466f303831197e992767  /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md
0002ed933f7628797792c28258c37b150b2eb10a767eb5113db20225757d0f50  docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
```

⟨cmd⟩ `wc -c` on the two matrix copies:

```
   30242 /Users/mkbabb/.codex/worktrees/7e28/value.js/…/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
   30927 docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
```

⟨cmd⟩ `tail -c 30242 docs/tranches/V/megatranche/formation/codex-worktree-7e28/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md | shasum -a 256`

```
244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7  -
```

**Seven-row disposition, re-derived by THIS seat on 2026-09-17** (every row by running `shasum`,
none by quoting the handoff — the gate's own falsifier):

| handoff row | expected | measured 2026-09-17 | disposition |
|---|---|---|---|
| the handoff itself | — (self) | `ced23440…f20f7` | **MATCH** |
| parser-law matrix §3.1 | `244c448a…504a7`, 30,242 B | `244c448a…504a7`, 30,242 B | **MATCH** |
| DREI-v11 owner intake §3.3 | `aa891714…92767` | `aa891714…92767` | **MATCH** |
| in-repo `ADOPT-COPY` of the matrix | tail-30242 ⇒ `244c448a…` | `0002ed93…7d0f50`, 30,927 B; tail-30242 ⇒ `244c448a…504a7` | **EXPLAINED** (685-byte provenance header, re-proved) |
| `BUILD-V12.py` §3.2 | `0732ebc2…64ee8`, 243,827 B, mode 0644, nlink 1 | `0732ebc2…64ee8`, 243,827 B, mode 644, nlink 1 | **MATCH** — was EPERM on 08-03 (see gate 24) |
| `BUILD-V12.cpython-314.pyc` §3.2 | `de1d62ff…c00937`, 154,221 B, mode 0644, nlink 1 | `de1d62ff…c00937`, 154,221 B, mode 644, nlink 1 | **MATCH** — was EPERM on 08-03 |
| v12 target `…/parser-novelty-and-experiment-v12` §3.2 | **ABSENT** at pause | `No such file or directory`, **parent readable** | **ABSENT, verified** — was EPERM-not-ABSENT |

**Expected** (runbook §2.4): `ced23440…` (the handoff) · `244c448a…` (parser-law matrix, 30,242 B) ·
the two further rows — each with the wave's OWN pasted output; a row disposed by quoting the handoff
rather than by running `shasum` fails.
**VERDICT: RED-AS-EXPECTED** — with the act-half **UNRUN** and a material upgrade banked.
The four rows §2.4 names match **byte-for-byte**, so the read-only half of the gate is discharged
against exactly the expected identities. The gate stays RED for the reason W0 §6 G-1 gives: *"the
gate closes when the wave's own dated ledger carries all seven with its own outputs pasted"* — and
`docs/tranches/X/parse-that/evidence/W0/PAUSE-AUTHENTICATION-*.md` **does not exist** (⟨cmd⟩
`find docs/tranches/X/parse-that -type f` returns only `REFINEMENT-FOLD-2026-08-06.md` and eight
`waves/*.md`). Writing that ledger is X.P.W0 unit `.a`'s act, not this seat's. **The upgrade**: all
seven rows — not four — now have in-reach dispositions, and none is a MISMATCH, so no §9 STOP fires
and no §3a triumvirate dispatch is triggered by identity drift.

### Gate 24 — W0 G-2, EPERM is not absence

⟨cmd⟩ `ls /Users/mkbabb/Documents/Codex/` — measured **2026-09-17 12:26:56 EDT**:

```
2026-07-29
2026-07-30
2026-07-31
2026-08-01
2026-08-02
2026-08-03
```

⟨cmd⟩ `ls /Users/mkbabb/Documents/Codex/2026-08-02/` → exit 0, **133 entries** (the parser-novelty
v1–v11 packets, the v10/v11/v12 construction roots, the glass row-8 series, the keyframes b9–b21
series, the pencil/package/fourier packets). First and last rows, for identity ⟨cmd⟩
`ls -1 … | wc -l`, `| head -1`, `| tail -1`:

```
auxiliary-crosspacket-schema-critic-v1
…
value-mobile-safari-v7-quiescent-governing-capture-r2
… (133 entries)
```

The three named rows, three-state, each probed individually:

| row | command | output | state |
|---|---|---|---|
| `…/2026-08-02/parser-novelty-v12-construction` | `ls -d` | `/Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction` (exit 0) | **PRESENT** |
| `…/2026-08-02/parser-novelty-and-experiment-v12` | `ls -d` | `No such file or directory` (exit 1), **parent listable** | **ABSENT** (verified, not inferred) |
| `…/2026-07-29/parser-p4-fresh-sol-adjudication/outputs` | `ls -d` | `/Users/mkbabb/Documents/Codex/2026-07-29/parser-p4-fresh-sol-adjudication/outputs` (exit 0) | **PRESENT** |

Construction-root contents ⟨cmd⟩ `ls -la …/parser-novelty-v12-construction/`:

```
-rw-r--r--    1 mkbabb  staff  243827 Aug  2 13:19 BUILD-V12.py
drwxr-xr-x    3 mkbabb  staff      96 Aug  2 11:37 __pycache__
```

Hashes and stat identities are at gate 23's table above. **The builder was hashed, never opened for
edit and never run; the `__pycache__` residue was hashed and not removed, regenerated, normalized,
or credited** — handoff §3.2 and §7 observed verbatim.

**Expected** (runbook §2.4): report **unreachable**; any "the v12 target is absent" sentence
unqualified by date + access state fails the gate; three-state disposition MATCH / MISMATCH / EPERM,
never conflated.
**VERDICT: DIVERGENT.** The divergence, stated exactly: **the expected access state is EPERM and the
measured access state is PRESENT.** `~/Documents/Codex` was `Operation not permitted` on 2026-08-03
(OP-2 DENIED) and is **fully readable on 2026-09-17** (OP-2 GRANTED). Consequences, in the order
that matters:
(i) the gate's *content* — the EPERM-vs-ABSENT distinction — is no longer hypothetical for these
rows: the v12 target is **ABSENT as measured on 2026-09-17 by a reader with listable-parent
access**, which is the qualified form the gate demands and the unqualified form it forbids;
(ii) handoff §9's *"a present v12 target"* STOP condition is **detectable for the first time and
does not fire**;
(iii) the builder and residue rows convert **EPERM → MATCH** on their exact expected SHA-256, byte
size, mode and nlink;
(iv) W0 §6 G-7's three EPERM-bounded prohibitions (no `BUILD-V12.py` run, no v12 target
materialized, residue not cleaned) become **directly checkable** rather than bounded — and all three
check clean at this reading;
(v) W0 §2b OP-2 and §6 G-2's RED baseline are now **dated history**, to be carried by a dated
addendum per E-3, never by rewriting the 08-03 lines.
The gate's own words govern the reverse direction too: *"the grant does not retroactively make
today's EPERM a verification"* — so the 08-03 EPERM rows stay EPERM in the record, and this seat's
MATCHes are dated 2026-09-17 and stand beside them.

### Gate 25 — W0 G-3, eighteen roots, byte-unchanged

The 'before' census is banked at
`docs/tranches/X/execution/gates/census-before-2026-09-17.txt` (44 lines), **double-run identical**.
⟨cmd⟩ per root: `git -C <root> rev-parse --short HEAD` · `find <root> -type f -not -path '*/.git/*'
-not -path '*node_modules*' | wc -l`.

```
01	/Users/mkbabb/Programming/parse-that	REACH=PRESENT	HEAD=ef10d5b	BRANCH=master	FILES=20261	DIRTY=31
02	/Users/mkbabb/Programming/parse-that-css-totality	REACH=PRESENT	HEAD=f575708	BRANCH=codex/css-totality-combinators-20260729	FILES=757	DIRTY=2
03	/Users/mkbabb/Programming/parse-that-css-totality-p1-e	REACH=PRESENT	HEAD=35fd252	BRANCH=codex/css-totality-p1-e	FILES=277	DIRTY=0
04	/Users/mkbabb/Programming/parse-that-css-totality-p1-r	REACH=PRESENT	HEAD=4175325	BRANCH=codex/css-totality-p1-r	FILES=277	DIRTY=0
05	/Users/mkbabb/Programming/parse-that-css-totality-p1-vk	REACH=PRESENT	HEAD=a0f122f	BRANCH=codex/css-totality-p1-vk	FILES=277	DIRTY=0
06	/Users/mkbabb/Programming/parse-that-runtime-probes	REACH=PRESENT	HEAD=99e9862	BRANCH=codex/runtime-kernel-probes-20260729	FILES=337	DIRTY=0
07	/Users/mkbabb/Programming/parse-that-skv26	REACH=PRESENT	HEAD=e31fbfe	BRANCH=codex/sk-v26-parse-that	FILES=51162	DIRTY=0
08	/private/tmp/parse-that-m2-baseline-20260729	REACH=ABSENT	HEAD=-	BRANCH=-	FILES=-	DIRTY=-
09	/Users/mkbabb/.codex/worktrees/7e28/value.js	REACH=PRESENT	HEAD=e01d0065	BRANCH=HEAD	FILES=3967	DIRTY=15
10	/Users/mkbabb/.codex/worktrees/9167	REACH=PRESENT	HEAD=NOT-A-GIT-ROOT	BRANCH=-	FILES=2988	DIRTY=-
11	/Users/mkbabb/.codex/worktrees/d0be	REACH=PRESENT	HEAD=NOT-A-GIT-ROOT	BRANCH=-	FILES=1100	DIRTY=-
12	/Users/mkbabb/Programming/value-css-totality-audit	REACH=PRESENT	HEAD=dea7a93c	BRANCH=codex/css-totality-prototype-20260729	FILES=3846	DIRTY=0
13	/Users/mkbabb/Programming/value-xw1-demo-boot	REACH=PRESENT	HEAD=d19da6d3	BRANCH=codex/xw1-demo-boot-20260729	FILES=3979	DIRTY=2
14	/Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-v12-construction	REACH=PRESENT	HEAD=NOT-A-GIT-ROOT	BRANCH=-	FILES=2	DIRTY=-
15	/Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12	REACH=ABSENT	HEAD=-	BRANCH=-	FILES=-	DIRTY=-
16	/Users/mkbabb/Documents/Codex/2026-07-29/parser-p4-fresh-sol-adjudication/outputs	REACH=PRESENT	HEAD=NOT-A-GIT-ROOT	BRANCH=-	FILES=8	DIRTY=-
17	/Users/mkbabb/Programming/.p-totality	REACH=PRESENT	HEAD=NOT-A-GIT-ROOT	BRANCH=-	FILES=26056	DIRTY=-
18	/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof	REACH=PRESENT	HEAD=NOT-A-GIT-ROOT	BRANCH=-	FILES=189	DIRTY=-
```

Row-by-row against the 08-03 table: **01** `ef10d5b`/20261 ✓ (DIRTY now enumerated at 31, where the
baseline wrote only "DIRTY (5+ rust paths)") · **02** `f575708`/757/2-untracked ✓ · **03** `35fd252`/277 ✓ ·
**04** `4175325`/277 ✓ · **05** `a0f122f`/277 ✓ · **06** `99e9862`/337 ✓ · **07** `e31fbfe`/51162 ✓ ·
**08** path gone ✓ (as the baseline said) · **09** `e01d0065`/3967 ✓ · **10/11** *"enumerate at open"* →
**now enumerated** (`9167` → `keyframes.js`, 2988 files; `d0be` → `fourier-analysis`, 1100 files;
neither is a git root at the `worktrees/<id>/` level — the repository sits one level down) ·
**12** `dea7a93c` ✓ · **13** `d19da6d3` ✓ · **14/15/16** EPERM → PRESENT / ABSENT / PRESENT (gate 24) ·
**17** archive byte-stable at 323,894,591 B · **18** the parser-proof job tree survives, 189 files.

The structural fact G-3 calls load-bearing ⟨cmd⟩
`git -C /Users/mkbabb/Programming/parse-that worktree list`:

```
/Users/mkbabb/Programming/parse-that                     ef10d5b [master]
/Users/mkbabb/Programming/parse-that-css-totality        f575708 [codex/css-totality-combinators-20260729]
/Users/mkbabb/Programming/parse-that-css-totality-p1-e   35fd252 [codex/css-totality-p1-e]
/Users/mkbabb/Programming/parse-that-css-totality-p1-r   4175325 [codex/css-totality-p1-r]
/Users/mkbabb/Programming/parse-that-css-totality-p1-vk  a0f122f [codex/css-totality-p1-vk]
/Users/mkbabb/Programming/parse-that-runtime-probes      99e9862 [codex/runtime-kernel-probes-20260729]
/Users/mkbabb/Programming/parse-that-skv26               e31fbfe [codex/sk-v26-parse-that]
```

**SEVEN entries. The baseline says EIGHT.** ⟨cmd⟩ `ls -la /Users/mkbabb/Programming/parse-that/.git/worktrees/`:

```
drwxr-xr-x   8 mkbabb  staff  256 Aug 26 16:33 .
drwxr-xr-x   9 mkbabb  staff  288 Sep 17 12:28 parse-that-css-totality
drwxr-xr-x   9 mkbabb  staff  288 Sep 17 12:28 parse-that-css-totality-p1-e
drwxr-xr-x   9 mkbabb  staff  288 Sep 17 12:28 parse-that-css-totality-p1-r
drwxr-xr-x   9 mkbabb  staff  288 Sep 17 12:28 parse-that-css-totality-p1-vk
drwxr-xr-x   9 mkbabb  staff  288 Sep 17 12:28 parse-that-runtime-probes
drwxr-xr-x   9 mkbabb  staff  288 Sep 17 12:28 parse-that-skv26
```

six directories; `ls /Users/mkbabb/Programming/parse-that/.git/gc.log` → `No such file or
directory`; `du -sh /Users/mkbabb/Programming/parse-that/.git` → **28M** (unchanged).

**Expected** (runbook §2.4): the eighteen-root table (`parse-that ef10d5b` 20261 files DIRTY ·
`parse-that-css-totality f575708` 757 · …); GREEN = the `diff census-before.txt census-after.txt`
is empty.
**VERDICT: DIVERGENT.** The divergence, stated exactly: **every root's git identity, branch and file
count is byte-identical to the 2026-08-03 baseline, but the worktree REGISTRY has lost one record —
`git worktree list` returns 7 where the baseline recorded 8, and the missing eighth is exactly the
`prunable` entry for `/private/tmp/parse-that-m2-baseline-20260729` that W0 §4 forbids deleting and
W0 §6 G-3 names as its own falsifier.** The `.git/worktrees/` parent mtime (**Aug 26 16:33**) dates
the loss between the census and the begin-word; the absence of `gc.log` and the unchanged 28M
`.git` say the object store was not touched, so this is a lost *record*, not lost *objects*. The
second, benign divergence is rows 14–16 flipping out of EPERM (gate 24) and rows 10–11 being
enumerated for the first time. The act-half — `census-after.txt` and its diff-to-empty — is
**UNRUN**: it belongs to X.P.W0 unit `.d`, at the wave's close, and the file banked here is the
`before` side it will diff against. Method caveat at §A: the wave's own censuses should drop the
`DIRTY` column.

### Gate 26 — W0 G-8, PLAW-BIND declared from both ends

⟨cmd⟩ `grep -n 'X·P release condition → KF.W3' docs/tranches/X/COHESION.md`

```
66:- **X·P release condition → KF.W3** (parser consumption): gate-keyed, never scheduled; routing is
```

⟨cmd⟩ `grep -n 'parse-that→fourier is FORBIDDEN' docs/tranches/X/COHESION.md`

```
68:  parse-that→fourier is FORBIDDEN** (standing routing law).
```

Each returns **1** row (≥1, as required). The other end ⟨cmd⟩
`find docs/tranches/X/parse-that -type f`:

```
docs/tranches/X/parse-that/REFINEMENT-FOLD-2026-08-06.md
docs/tranches/X/parse-that/waves/CONFORMANCE-2026-08-03.md
docs/tranches/X/parse-that/waves/W0.md
docs/tranches/X/parse-that/waves/W1.md
docs/tranches/X/parse-that/waves/W2-fable-author.md
docs/tranches/X/parse-that/waves/W2-opus-author.md
docs/tranches/X/parse-that/waves/W2.md
docs/tranches/X/parse-that/waves/W3.md
docs/tranches/X/parse-that/waves/W4.md
```

— no `EVIDENCE-CHAIN.md`.

**Expected** (runbook §2.4): each ≥1; located by literal-fragment grep, never by line coordinate,
because COHESION is a live document and a coordinate into it rots by design.
**VERDICT: RED-AS-EXPECTED**, act-half **UNRUN**. Both fragments resolve, so the **reciprocal** end
is intact and neither second-falsifier fires (neither grep returned zero). The gate is RED for the
reason W0 §6 G-8 gives: the law is declared from **one** end only — **1 of 2**. The lane's own end,
`docs/tranches/X/parse-that/EVIDENCE-CHAIN.md` carrying the handoff §2 chain verbatim, does not
exist; creating it is X.P.W0 unit `.d`'s act. Method note observed: the rows above are pasted **in
place of a line pin**, exactly as the gate requires — `:66` and `:68` are recorded as today's
measurement, not as the citation.

### Gate 27 — W4 G-2, zero value.js source bytes

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain -- src api demo test e2e`

```
```

(no output; row count **0**, confirmed twice.)

**Expected** (runbook §2.4): empty at every X·P commit — *"the executable form of 'X·V owns its
bytes'"*. A standing invariant from W0 through W4.
**VERDICT: GREEN-BEFORE-CURE**, and explicitly **NOT an R.2 sitting finding**. R.2 makes a pass a
finding when it arrives *before its cure lands*; this gate has **no cure** — it is an invariant whose
correct reading at every commit, including the first, is empty. It reads empty. The seat records it
green so the tally is honest and so the X·P executor has a dated 'before' for the invariant it must
hold across W0–W4. For completeness, the repository's only dirty rows lie **outside** the five
pathspecs — `docs/tranches/V/reformation/CARRY-LEDGER.md` (modified), `scripts/dev/dev.sh`
(modified, unowned, never touched by this seat), and untracked `docs/` trees under `T/`, `V/` and
`W/`.

---

## §D DOUBLE-RUN PASS 2 — every published count, re-measured from settled bytes

```
[G1a] 73 records / 604 occurrences
[G1b] X-waves nonzero rows: 0
[G2] 7.0.0
[G4] 10 7
[G6] 0
[G7a] 0  [G7b] 0
[G8] 8 rows
[G9] variant="outline"variant="outline"
[G10] ./blob:true ./chip:true ./forms:true
[G26] f1=1 f2=1
[G27] 0 rows
```

Gate 3, pass 2: `oklch()` / `calc()` / `foo()` → `TypeError: Cannot read properties of undefined
(reading 'replace')`, all three.
Gate 5, pass 2: the `sed -n '81,87p'` block is byte-identical.
Gate 25, pass 2: `diff census-run1.txt census-run2.txt` → **empty** (DOUBLE-RUN: IDENTICAL).
Gates 23/24, pass 2: not re-hashed — SHA-256 over settled bytes with matching `stat` size/mode/nlink
is its own second witness, and re-reading TCC-walled evidence twice buys nothing.

**Pass 1 ≡ pass 2 in every cell.** No count in §A/§B/§C is inferred; each is read from settled bytes.

---

## §E WHAT THIS SEAT DID NOT TOUCH

No write of any kind outside `docs/tranches/X/execution/gates/` (this file and
`census-before-2026-09-17.txt`). No `npm ci`/`install`/`build`/`run`. No `git` write anywhere: no
commit outside the pathspec below, no reset, no stash, no `worktree add`/`prune`, no branch write,
no `gc`. `scripts/dev/dev.sh` neither staged nor opened. `src/ demo/ api/ test/ e2e/` read only, and
only by `grep`/`sed`. Sibling trees `../keyframes.js`, `../fourier-analysis`, `../parse-that`,
`../glass-ui` and every frozen root read only. `~/Documents/Codex/**` hashed and listed, never
edited, never run, residue untouched. The one disclosed side-effect — `git status --porcelain` in
the census's `DIRTY` column possibly refreshing a worktree index stat-cache — is recorded at §A and
in the census header rather than left for a later reader to discover.

**Gates 11–22 (X·KF, X·F) are not this seat's** and are not read on here.
