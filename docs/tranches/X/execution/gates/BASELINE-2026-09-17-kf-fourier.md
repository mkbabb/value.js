SERVED MODEL: claude-opus-5[1m]

# X EXECUTION — GATES BASELINE, 2026-09-17 · X·KF (11–15) + X·F (16–22)

**Seat**: GATES-BASELINE, tranche X begin-word. **Authority**: `docs/tranches/X/EXECUTION-RUNBOOK.md`
§2.2 (five X·KF gates) + §2.3 (seven X·F gates), commands taken **literally** from those tables.

**Standing law R.2** ⟨`EXECUTION-RUNBOOK.md` §2, quoting X·V §READINESS R.2⟩: *"Running them at
wave-open re-dates the baselines; a PASS on any of them before its cure lands is itself a finding
and goes to the sitting."* **No gate in this seat's twelve came back GREEN-BEFORE-CURE.**

**Seat discipline observed.** Read-only in every sibling tree (`keyframes.js`, `keyframes-v-exec`,
`fourier-analysis`, `glass-ui`): no `npm ci`, no `npm install`, no build, no `reset`, no `stash`, no
producer write. `npx tsc --noEmit --listFiles` (gate 15) resolved the **locally installed**
`node_modules/.bin/tsc` — no fetch — and `keyframes.js` has **no** `incremental`/`composite`/
`tsBuildInfo` setting, so the run emitted nothing; the tree's `git status --short` read **252**
before the run and **252** after. Where a gate's GREEN is an **act** (G-5's build, G-12's table,
G-3's ledger) only the read-only receipts are banked and the act-half is marked **UNRUN**.
Every published count is a **settled double-run** (§Settle below). No product source (`src/`
`demo/` `api/` `test/` `e2e/`) was opened for edit.

---

## §0 SUMMARY

| # | gate | repo | verdict | one-line reading |
|---|---|---|---|---|
| 11 | **G-0.1** SUBSTRATE SETTLED + measured falsifier | keyframes.js | **RED-AS-EXPECTED** | `41` · `252` · `325`; HEAD `8281638c`, `origin/master` `81a56990`; falsifier `comm -13` → **225** (`-23` **152** · `-12` **100** · untracked **124**) — every figure exact |
| 12 | **G-0.2** MANIFEST SINGLE-STATE | keyframes.js | **RED-AS-EXPECTED** | `origin/master:package.json:77` = `"@mkbabb/glass-ui": "7.0.0"` · worktree `grep -c` → **0** · installed **7.0.0** — three disagreeing states |
| 13 | **G-KF1-1** DELIVERY | keyframes-v-exec | **RED-AS-EXPECTED** | **9 entries + `vnext/`**; no addendum, no O-8, no O-11 |
| 14 | **G-KF1-2** ANCHOR LIVENESS | keyframes-v-exec | **RED-AS-EXPECTED** | `src/animation/compile/value-ast.ts` **ABSENT** at `origin/master` (exit 128); per-anchor, nothing named `value-ast` anywhere in the tree |
| 15 | **G-KFW4-1** the vue-tsc gate (sequencing head) | keyframes.js | **RED-AS-EXPECTED** | `node_modules/.bin/vue-tsc` **ABSENT** · `tsc --noEmit --listFiles` → **126 demo files, 0 `.vue`** · the `demo/env.d.ts:3-7` `DefineComponent<{},{},any>` shim **still standing** |
| 16 | **G-1** the 28-path M.W1a tree SETTLED | fourier-analysis | **RED-AS-EXPECTED** | `m/w1-bump-migration` · `cd26c65` · **28** = **27 ` M` + 1 `??`** — all 28 rows pasted at §2.16 |
| 17 | **G-2** the O-14 letter COMMITTED | fourier-analysis | **RED-AS-EXPECTED** | `git ls-files` returns **nothing**; the file is on disk (11,041 B, Jul 27 12:30) and is the sole `??` row of gate 16 |
| 18 | **G-4** the adopted producer stylesheet PARSES | fourier-analysis | **RED-AS-EXPECTED** | **17** `/*` vs **8** `*/` in `web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` — exact. `node_modules` PRESENT, so runnable. postcss repro half **UNRUN** (toolchain act). ⚠ dated addendum on the *"(src is 15/6)"* parenthetical → §3 A-1 |
| 19 | **G-5** `npm ci && npm run build` in `web/` | fourier-analysis | **RED-AS-EXPECTED** | `git ls-files web/dist` → **0** · `web/dist` present, **Jun 12 18:13** — both read-only receipts exact. The build **act-half is UNRUN** (seat law) |
| 20 | **G-13** producer pin re-derived at the ADOPTED commit | glass-ui + fourier-analysis | **RED-AS-EXPECTED** | producer `package.json` **9.0.0** (satisfies *"8.0.0+"*) · declared consumer pin `^4.0.0` · installed consumer **4.0.0**. Pin cell = **commit hash**: `v8.0.0^{commit}` = **`17a11bc5`** as expected. ⚠ trap → §3 A-2 (bare `rev-parse v8.0.0` yields a **tag object**, `478aa462`, not a commit) |
| 21 | **G-12** ONE corrected-denominator table published | fourier-analysis | **UNRUNNABLE** | §2.3's command column is *"the §4 G-12 table act"* — there is **no read-only command to run**. RED corroborated read-only: `docs/tranches/F/SUBSTRATE-LEDGER.md` (the artefact that carries the table, `F-W0.md` §Artefacts) **does not exist**, and the live e2e denominator measures **8** (the forbidden 7-spec figure is dead) |
| 22 | **G-3** the mail seat | fourier-analysis | **RED-AS-EXPECTED** | `ls .../F/coordination/INBOX.md` → **No such file**; `F/CLAUDE.md` **absent**; the three 2026-05-29 letters present and **untriaged**. Ledger/`CLAUDE.md` act-half **UNRUN** |

**Tally — 11 RED-AS-EXPECTED · 0 DIVERGENT · 0 GREEN-BEFORE-CURE · 1 UNRUNNABLE.**

**R.2 sitting items from this seat: none of the twelve passed early.** Two **dated addenda** (§3)
are raised — both about the *reading*, not the verdict: A-1 (gate 18's stale `src is 15/6`
parenthetical) and A-2 (gate 20's annotated-tag trap against the P-4 *"the pin cell is the COMMIT
HASH"* law). Neither flips a gate; both are things the cure seat will trip over if unrecorded.

---

## §1 X·KF — gates 11–15 ⟨runbook §2.2⟩

### 2.11 — Gate 11 · **G-0.1 SUBSTRATE SETTLED** (+ its measured falsifier)

- **coordinate**: `KF-W0.md` §Gates
- **cwd**: `/Users/mkbabb/Programming/keyframes.js`
- **runbook expected**: **41** · **252** · **325**; HEAD `8281638c`, `origin/master` `81a56990`.
  Falsifier: *"the two surfaces do not nest"* — `comm -13` → **225** (`comm -23` → **152**,
  `comm -12` → **100**, untracked **124**); *"GREEN requires BOTH enumerations, never one plus a
  difference."* **RED.**

⟨cmd⟩ `git rev-list --count HEAD..origin/master` · `git status --short | wc -l` · `git diff --name-only origin/master | wc -l`

```
--- rev-list count HEAD..origin/master ---
41
--- git status --short | wc -l ---
     252
--- git diff --name-only origin/master | wc -l ---
     325
--- HEAD / origin-master ---
8281638c
81a56990
--- branch ---
master
```

⟨cmd⟩ the falsifier, run under `bash -c` (process substitution) —
`comm -13 <(git status --short | sed 's/^...//' | sort -u) <(git diff --name-only origin/master | sort -u) | wc -l`
and its three counter-figures:

```
--- comm -13 (frontier-only) ---
     225
--- comm -23 (status-only) ---
     152
--- comm -12 (overlap) ---
     100
--- untracked ---
     124
```

**VERDICT: RED-AS-EXPECTED.** All seven figures reproduce exactly — `41 / 252 / 325`, both refs,
and the full non-nesting set `225 / 152 / 100 / 124`. The struck arithmetic `325 − 252 = 73`
remains struck by measurement, not by citation: the two surfaces do not nest, `152` status rows
(124 of them untracked) lie **outside** the frontier diff entirely.

### 2.12 — Gate 12 · **G-0.2 MANIFEST SINGLE-STATE**

- **coordinate**: `KF-W0.md` §Gates
- **cwd**: `/Users/mkbabb/Programming/keyframes.js`
- **runbook expected**: `"@mkbabb/glass-ui": "7.0.0"` exact devDep at `origin/master` (`:77`) ·
  **0** (*"the worktree DELETES the row"*) · **7.0.0** installed — disagreeing states. **RED.**

⟨cmd⟩ `git show origin/master:package.json` (`:77`) · `grep -c glass-ui package.json` · `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`

```
--- git show origin/master:package.json (lines 70–80) ---
        "@mkbabb/value.js": "4.0.0"
    },
    "devDependencies": {
        "@iconify-json/radix-icons": "^1.2.6",
        "@iconify/vue": "^5.0.1",
        "@lucide/vue": "^1.17.0",
        "@microsoft/api-extractor": "^7.58.7",
        "@mkbabb/glass-ui": "7.0.0",
        "@tailwindcss/postcss": "^4.3.0",
        "@types/node": "^22.20.0",
        "@types/three": "^0.184.1",
--- grep -c glass-ui package.json ---
0
(exit 1)
--- node -p installed version ---
7.0.0
```

⟨cmd⟩ the `:77` coordinate re-derived rather than asserted —
`git show origin/master:package.json | grep -n 'glass-ui'`:

```
77:        "@mkbabb/glass-ui": "7.0.0",
```

**VERDICT: RED-AS-EXPECTED.** The line coordinate `:77` is exact, the value is the exact (non-range)
`7.0.0` devDep, the worktree `grep -c` is **0** — the uncommitted local deletion survives — and the
installed artifact reads **7.0.0**. Three coordinates, two states, one installed artifact. The
disagreement this gate exists to close is live.

### 2.13 — Gate 13 · **G-KF1-1 DELIVERY**

- **coordinate**: `KF-W1.md` §Gates
- **cwd**: `/Users/mkbabb/Programming/keyframes-v-exec` (the `$PROG/keyframes-v-exec` of the spec)
- **runbook expected**: **9 entries + `vnext/`** — *"No addendum. No O-8. No O-11."* **RED.**

⟨cmd⟩ `ls $PROG/keyframes-v-exec/docs/tranches/V/coordination/`

```
ATLAS-INBOUND-2026-07-16-consumer-crossing-report.md
ATLAS-INBOUND-2026-07-17-crossing-reply-ack-and-census-correction.md
GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md
GLASS-INBOUND-2026-07-17-install-truth-marks.md
INBOUND-LEDGER.md
SPEEDTEST-INBOUND-2026-07-17-install-truth-relay-ack.md
VALUEJS-INBOUND-2026-07-17-formation-exchange-marks.md
VALUEJS-INBOUND-2026-07-17-formation-exchange.md
VALUEJS-INBOUND-2026-07-17-wl-verdicts.md
vnext
```
`ls -1 … | wc -l` → **10** (nine files + the `vnext/` directory).

**VERDICT: RED-AS-EXPECTED.** Exactly the banked shape: **9 entries + `vnext/`**. The three
negatives hold by enumeration — no addendum file, no `O-8`, no `O-11` row in the directory. The
delivery this gate measures has not occurred.

### 2.14 — Gate 14 · **G-KF1-2 ANCHOR LIVENESS**

- **coordinate**: `KF-W1.md` §Gates
- **cwd**: `/Users/mkbabb/Programming/keyframes-v-exec`, against **`origin/master`, never bare
  `HEAD`** (*"bare HEAD silently answers the wrong question"*)
- **runbook expected**: **ABSENT** — O-11 §A3's primary authored-input anchor. **RED.**
  *"Per-anchor, not blanket."*

⟨cmd⟩ `git cat-file -e origin/master:src/animation/compile/value-ast.ts`

```
fatal: path 'src/animation/compile/value-ast.ts' does not exist in 'origin/master'
exit=128
```

⟨cmd⟩ the ref this seat actually addressed, banked so the answer is attributable —
`git rev-parse --short=8 HEAD` · `… origin/master` · `git rev-parse --abbrev-ref HEAD`:

```
81a56990
81a56990
master
```
(`keyframes-v-exec`'s `origin/master` is the **same SHA** as `keyframes.js`'s — `81a56990` — so the
frontier both kf gates address is one coordinate, and the bare-`HEAD` hazard the gate warns about is
*dormant here*, not absent: it is live in `keyframes.js`, where HEAD is `8281638c`, 41 behind.)

⟨cmd⟩ per-anchor context, so the ABSENT verdict is not read as a blanket claim about the directory —
`git ls-tree --name-only origin/master src/animation/compile/` and a tree-wide name probe:

```
src/animation/compile/adapter.ts
src/animation/compile/easing
src/animation/compile/emit
src/animation/compile/frame
src/animation/compile/index.ts
src/animation/compile/selector.ts
src/animation/compile/value
--- any 'value-ast' anywhere at origin/master ---
(empty = none)
```

**VERDICT: RED-AS-EXPECTED.** The anchor is ABSENT at the frontier. The directory around it is
**live and populated** (seven entries, including a `value` subtree) — which is exactly why this gate
is per-anchor: a blanket *"the compile tree is absent"* reading would be false, and the true finding
is that one named authored-input anchor does not exist under any spelling in the tree.

### 2.15 — Gate 15 · **G-KFW4-1 the vue-tsc gate** (THE SEQUENCING HEAD)

- **coordinate**: `KF-W4.md` §Gates `:207`
- **cwd**: `/Users/mkbabb/Programming/keyframes.js` (KF-W4's own clause: *"the run happens in the
  keyframes.js clone"*)
- **runbook expected**: **ABSENT** · **126 demo files, 0 `.vue`**. **RED.** GREEN additionally
  requires the `proof:structure` tail to survive verbatim AND the `demo/env.d.ts:3-7`
  `DefineComponent<{},{},any>` shim retired — *"a green run with the shim standing is the no-op this
  gate exists to prevent."*

⟨cmd⟩ `ls node_modules/.bin/vue-tsc`

```
ls: node_modules/.bin/vue-tsc: No such file or directory
exit=1
```

⟨cmd⟩ `npx tsc --noEmit --listFiles` — exit **0**, empty stderr, **908** listed files. Head of the
listing (first 30 of 908), then the census:

```
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es5.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2016.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2017.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2018.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2019.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2020.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2021.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2022.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2023.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.dom.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.core.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.collection.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.generator.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.iterable.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.promise.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.proxy.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.reflect.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.symbol.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2016.array.include.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2016.intl.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2017.arraybuffer.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2017.date.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2017.object.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2017.sharedmemory.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2017.string.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2017.intl.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2017.typedarrays.d.ts
/Users/mkbabb/Programming/keyframes.js/node_modules/typescript/lib/lib.es2018.asyncgenerator.d.ts
… (908 lines)
```

Census over the settled listing ⟨cmd⟩ `grep -c '/keyframes.js/demo/'` · `grep -c '\.vue$'` ·
`grep -c '/keyframes.js/src/'`:

```
total listed: 908
demo files:   126
.vue files:     0
src files:    145
```

⟨cmd⟩ the shim half of GREEN, read not asserted — `sed -n '1,9p' demo/env.d.ts`:

```
/// <reference types="vite/client" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "*.svg?component" {
```

**VERDICT: RED-AS-EXPECTED.** Both born-RED witnesses reproduce exactly: `vue-tsc` is **ABSENT**
(not merely unwired — KF-ES-34's distinction holds at the bytes), and the compiler sees **126 demo
files and zero `.vue` files**. The `DefineComponent<{},{},any>` shim is **standing verbatim** at
`demo/env.d.ts:3-7`, so even a future green `tsc` run would be the no-op the gate names. Nothing to
escalate: the sequencing head is RED on all three limbs.

---

## §2 X·F — gates 16–22 ⟨runbook §2.3, all `F-W0.md` §4⟩

### 2.16 — Gate 16 · **G-1** the 28-path M.W1a tree SETTLED, per path, minuted

- **cwd**: `/Users/mkbabb/Programming/fourier-analysis`
- **runbook expected**: `m/w1-bump-migration` · `cd26c65` · **28** (**27 ` M`** + **1 `??`**). Every
  path ruled LAND / ABANDON / LAND-WITH-CORRECTION in `SUBSTRATE-LEDGER.md`; rows 24 (FR-EMT-25) and
  25 (C:S-2) MUST LAND; *"a wholesale reset is a gate FAILURE, not a gate pass."* **RED.**

⟨cmd⟩ `git rev-parse --abbrev-ref HEAD` · `git rev-parse --short HEAD` · `git status --porcelain | wc -l`

```
--- abbrev-ref ---
m/w1-bump-migration
--- short HEAD ---
cd26c65
--- porcelain | wc -l ---
      28
```

⟨cmd⟩ `git status --porcelain` — **all 28 rows pasted**:

```
 M docs/constellation/tri-tranche-run/RUN-BOARD.md
 M web/package-lock.json
 M web/package.json
 M web/src/components/equation/EquationModeToggle.vue
 M web/src/components/equation/EquationView.vue
 M web/src/components/equation/InfoCard.vue
 M web/src/components/equation/convergence/ConvergenceLegend.vue
 M web/src/components/equation/convergence/ConvergenceTimeline.vue
 M web/src/components/morph/HarmonicLevelGrid.vue
 M web/src/components/morph/MorphPhaseConfig.vue
 M web/src/components/paper/MobileFloatingToc.vue
 M web/src/components/paper/PaperView.vue
 M web/src/components/paper/search/PaperSearchDropdown.vue
 M web/src/components/ui/SliderControl.vue
 M web/src/components/visualization/AnimationControls.vue
 M web/src/components/visualization/BasisSelector.vue
 M web/src/components/visualization/EditorControlsDock.vue
 M web/src/components/visualization/EquationPanel.vue
 M web/src/components/visualization/GalleryView.vue
 M web/src/components/visualization/GlassTimeline.vue
 M web/src/components/visualization/VisualizationView.vue
 M web/src/components/visualization/gallery/AdminFlaggedPanel.vue
 M web/src/components/visualization/gallery/AdminUserList.vue
 M web/src/components/visualization/gallery/GalleryAdminBanner.vue
 M web/src/components/visualization/gallery/GalleryCardModal.vue
 M web/src/components/visualization/gallery/GalleryDraftsSection.vue
 M web/src/components/visualization/gallery/GallerySearchBar.vue
?? docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md
```

⟨cmd⟩ the row-class split re-derived rather than counted by eye —
`git status --porcelain | cut -c1-2 | sort | uniq -c`:

```
  27  M
   1 ??
```

**VERDICT: RED-AS-EXPECTED.** Branch, commit and count are exact, and the **27 ` M` + 1 `??`**
decomposition holds at the bytes. The tree is **unreset** — the *"a wholesale reset is a gate
FAILURE, not a gate pass"* hazard has not been committed by anyone between the 2026-08-28 fold
measurement and this begin-word read. The 24 SFCs among the 27 ` M` rows are present and unruled:
`SUBSTRATE-LEDGER.md` does not exist (§2.21), so **zero of 28 paths carry a LAND / ABANDON /
LAND-WITH-CORRECTION disposition**, which is the gate's whole content. **Cross-lock note for the
executor**: this listing also *is* gate 17's evidence — the single `??` row is the O-14 letter.

### 2.17 — Gate 17 · **G-2** the O-14 letter COMMITTED

- **cwd**: `/Users/mkbabb/Programming/fourier-analysis`
- **runbook expected**: returns the path. **RED today: it is the sole `??` row.**

⟨cmd⟩ `git ls-files docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md`

```
(no output; exit 0)
```

⟨cmd⟩ the letter's on-disk state, so *"untracked"* is distinguished from *"absent"* —
`ls -l docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md`:

```
-rw-r--r--  1 mkbabb  staff  11041 Jul 27 12:30 docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md
```

**VERDICT: RED-AS-EXPECTED.** `ls-files` returns nothing — the letter is **not tracked**. It is,
however, **on disk** (11,041 bytes, dated Jul 27 12:30) and is precisely the `??` row that gate 16's
porcelain listing shows. The distinction is load-bearing for the cure: this is a **commit**, not an
authoring act — the bytes exist and have existed since 2026-07-27.

### 2.18 — Gate 18 · **G-4** the adopted producer stylesheet PARSES

- **cwd**: `/Users/mkbabb/Programming/fourier-analysis` (the `web/` subtree)
- **runbook expected**: **17** vs **8** (*"src is 15/6"*); repro with the app's toolchain —
  `postcss([@tailwindcss/postcss])` → `CssSyntaxError: Unterminated string: 's own'`. **GREEN only
  upstream — "A consumer-side patch is a GATE FAILURE."** ⟨**FR-NP-32 (≡ fr-PaperSidebar M1)** — cite
  both, never substitute.⟩ **RED.**

**`node_modules` is PRESENT** — the gate is runnable; no `UNRUNNABLE-NO-INSTALL` disposition is
owed. ⟨cmd⟩ `ls -l web/node_modules/@mkbabb/glass-ui/dist/styles/index.css`:

```
-rw-r--r--  1 mkbabb  staff  13949 Jun 17 21:48 web/node_modules/@mkbabb/glass-ui/dist/styles/index.css
```

⟨cmd⟩ `grep -o '/\*' web/node_modules/@mkbabb/glass-ui/dist/styles/index.css | wc -l` vs
`grep -o '\*/' …` (pasted with its settle re-run):

```
--- open tokens /* ---
      17
--- close tokens */ ---
       8
--- second run (settle) ---
      17
       8
```

⟨cmd⟩ the named syntax witness located rather than asserted —
`grep -n "s own" web/node_modules/@mkbabb/glass-ui/dist/styles/index.css`:

```
203:@source` line, Tailwind scanned an empty dir and glass-ui's own
209:   In glass-ui's OWN source build it is `src/*.js` (empty — glass-ui's own components
```

**VERDICT: RED-AS-EXPECTED.** The delimiter asymmetry is **exact: 17 open, 8 close** — nine
unterminated comment opens in the adopted 4.0.0 dist bytes, and the `'s own` apostrophe the
`CssSyntaxError` names is live at `:203` and `:209`. **Act-half UNRUN**: the
`postcss([@tailwindcss/postcss])` reproduction is a toolchain act and this seat runs no build; the
counts half is the gate's falsifiable reading and it reproduces. **The upstream-only law is
untouched by this baseline** — nothing was patched consumer-side, and `web/node_modules` was read,
never written. See §3 **A-1** for a dated addendum on the *"(src is 15/6)"* parenthetical.

### 2.19 — Gate 19 · **G-5** `npm ci && npm run build` completes in `web/`

- **cwd**: `/Users/mkbabb/Programming/fourier-analysis`
- **runbook expected**: **0** · present, **dated Jun 12**. GREEN = build exits 0 **and** the
  post-build readbacks fire. `web/dist` is not touched until G-4 and G-5 are green. **RED.**

⟨cmd⟩ `git ls-files web/dist` · `ls -ld web/dist`

```
--- git ls-files web/dist | wc -l ---
       0
--- ls -ld web/dist ---
drwxr-xr-x  10 mkbabb  staff  320 Jun 12 18:13 web/dist
```

**VERDICT: RED-AS-EXPECTED** on both read-only receipts — **0** tracked paths under `web/dist`
(the brief's correction holds: it is untracked and gitignored, so a `git rm` would target nothing),
and the directory is present at the banked **Jun 12 18:13** timestamp, i.e. the 3.1.0-era residue
has not moved. **The `npm ci && npm run build` act-half is UNRUN by seat law** (no install, no
build, no write into a sibling tree); its exit code and the post-build readbacks are the cure seat's
to produce. `web/dist` was not touched — the `ls -ld` above is a stat, and the directory's mtime is
unchanged by it.

### 2.20 — Gate 20 · **G-13** the producer pin re-derived at the ADOPTED commit

- **cwd**: `/Users/mkbabb/Programming/glass-ui` (producer) + `/Users/mkbabb/Programming/fourier-analysis/web` (consumer)
- **runbook expected**: producer reads **8.0.0+** ; installed consumer pin **4.0.0**. **The pin cell
  is the COMMIT HASH, never the version string** (P-4); the dated addendum reading is *"never a live
  fact — re-measure at wave open."* **RED.**

⟨cmd⟩ producer manifest —
`node -p "JSON.parse(require('fs').readFileSync('/Users/mkbabb/Programming/glass-ui/package.json','utf8')).version"`;
declared consumer pin — `grep -n 'glass-ui' web/package.json`; installed consumer —
`node -p "…/web/node_modules/@mkbabb/glass-ui/package.json).version"`:

```
--- producer package.json version ---
9.0.0
--- consumer pin: web/package.json ---
14:        "@mkbabb/glass-ui": "^4.0.0",
--- installed consumer version (web/node_modules) ---
4.0.0
```

⟨cmd⟩ the **pin cell** — `git -C /Users/mkbabb/Programming/glass-ui rev-parse v8.0.0` and `… v9.0.0`,
then the same refs dereferenced, then the object types:

```
--- rev-parse v8.0.0 ---
478aa4622a1d0fdab829729de6f7c5e4b58097ba
--- rev-parse v9.0.0 ---
6d71e66351c719cabfda19ade23615ee7be934f3
--- rev-parse 'v8.0.0^{commit}' ---
17a11bc580b99306e0928f8e0be3329d30deb9f1   (--short=8: 17a11bc5)
--- rev-parse 'v9.0.0^{commit}' ---
d4f7b24fc260489fbbd99995e78876784a5e79dd   (--short=8: d4f7b24f)
--- cat-file -t v8.0.0 / v9.0.0 ---
tag
tag
```

⟨cmd⟩ the Q16 drift receipt re-dated at this begin-word —
`git -C /Users/mkbabb/Programming/glass-ui rev-parse --short=8 HEAD` +
`git -C … log -1 --format='%s'` + `git -C … status --porcelain | wc -l`:

```
849c5547
docs(BK/census): bank the 2026-09-17 status census — 90 rows verifier-corrected, 21 SEALED / 49 LANDED-partial / 14 never started
4
```

**VERDICT: RED-AS-EXPECTED.** Producer reads **9.0.0**, which satisfies the *"8.0.0+"* expectation
and is the live state §0i/§0i.5 already minuted; the consumer is pinned `^4.0.0` and **installed at
4.0.0**, so the 4→8 hop the sizing is re-costed against is untouched. The **§0i-ratified pin cell
reproduces exactly: `v8.0.0^{commit}` = `17a11bc5`** (the registry-pinned adoption commit for both
X-W0.j and F.W1 G1), and `v9.0.0^{commit}` = `d4f7b24f`. The drift receipt re-dates as the gate's own
law demands: producer HEAD is now **`849c5547`** (a 2026-09-17 BK census commit, 4 dirty rows),
far past the round-2/3 readings `eb2e9428` / `87464122` / `5cd70d08` — *"a dated reading, never a
live fact"* holds, and the gate is RED because no pin table re-derived **at the adopted commit** has
been published. **A live trap is raised at §3 A-2.**

### 2.21 — Gate 21 · **G-12** ONE corrected-denominator table published

- **cwd**: `/Users/mkbabb/Programming/fourier-analysis`
- **runbook command column**: *"the §4 G-12 table act"* — **there is no command**.
- **runbook expected**: superseded figures FORBIDDEN downstream (e.g. the 8-spec e2e count; any
  7-spec figure is dead). **RED until published.**

**The gate's GREEN is an ACT**, so per seat law only read-only receipts are banked and the act-half
is **UNRUN**. Two receipts, both corroborating RED:

⟨cmd⟩ the artefact that carries the table (`F-W0.md` §Artefacts:
`fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` — *"the 28-path minute · … · the G-12 denominator
table · the G-13 pin table + lattice · …"*) — `ls docs/tranches/F/SUBSTRATE-LEDGER.md`:

```
ls: docs/tranches/F/SUBSTRATE-LEDGER.md: No such file or directory
```

⟨cmd⟩ the one denominator the runbook names by value, live-measured — `ls web/e2e/*.spec.ts`:

```
web/e2e/contour-extraction.spec.ts
web/e2e/gallery.spec.ts
web/e2e/paper-performance.spec.ts
web/e2e/settings-persistence.spec.ts
web/e2e/visual-baseline.spec.ts
web/e2e/visualization-crud.spec.ts
web/e2e/visualization-ux.spec.ts
web/e2e/workspace-flow.spec.ts
count: 8
```

**VERDICT: UNRUNNABLE.** §2.3 supplies no runnable command for this gate — its cell is an act, and a
seat forbidden to perform acts cannot produce a reading. Recorded as UNRUNNABLE rather than RED so
no later seat mistakes an absence-of-measurement for a measurement. **The RED is nonetheless
corroborated read-only, twice**: the artefact that would carry the published table **does not
exist**, and the live e2e denominator measures **8** — the banked figure (thrice-banked at
`fr-AdminFlaggedPanel.md:110` · `fr-CollapsibleSection.md:65` · `fr-CanvasOverlayButton.md:74`)
reproduces at the tree, and **any 7-spec figure downstream is dead** exactly as §2.3 states. Nothing
here licenses the act; F.W0's seat publishes the table.

### 2.22 — Gate 22 · **G-3** the mail seat

- **cwd**: the F coordination path in `/Users/mkbabb/Programming/fourier-analysis`
- **runbook expected**: *No such file* today. GREEN = ledger + `CLAUDE.md` exist, the three extant
  2026-05-29 letters TRIAGED AT CREATION, P-1/P-6 logged SENT. **G-3 gates the SENDs.** **RED.**

⟨cmd⟩ `ls ../fourier-analysis/docs/tranches/F/coordination/INBOX.md`

```
ls: /Users/mkbabb/Programming/fourier-analysis/docs/tranches/F/coordination/INBOX.md: No such file or directory
```

⟨cmd⟩ the three letters enumerated (the F-W0 register's **Q15** receipt, re-run at this begin-word)
— `ls -la docs/tranches/F/coordination/` + `head -1` ×3:

```
total 64
drwxr-xr-x  5 mkbabb  staff   160 May 29 14:42 .
drwxr-xr-x  9 mkbabb  staff   288 May 29 15:37 ..
-rw-r--r--  1 mkbabb  staff  8463 May 29 13:35 F-OPERATOR-WINDOW.md
-rw-r--r--  1 mkbabb  staff  4836 May 29 14:42 F-T-N1-status-field-drop.md
-rw-r--r--  1 mkbabb  staff  8357 May 29 13:27 F-VHOST-CORRECTNESS.md
--- head -1 ×3 ---
[F-OPERATOR-WINDOW.md]        # F — operator-window runbook (F.W3 binding)
[F-T-N1-status-field-drop.md] # F-T-N1 — coordination ASK: drop the legacy `status` field from `FormattedPalette`
[F-VHOST-CORRECTNESS.md]      # F — vhost-correctness spec (inv-22 binding; F.α first land)
```

⟨cmd⟩ the second GREEN limb — `ls docs/tranches/F/CLAUDE.md`:

```
ls: /Users/mkbabb/Programming/fourier-analysis/docs/tranches/F/CLAUDE.md: No such file or directory
```

**VERDICT: RED-AS-EXPECTED.** `INBOX.md` is absent — *No such file*, verbatim as the runbook
predicts — and the second limb, `docs/tranches/F/CLAUDE.md`, is absent too. **All three 2026-05-29
letters are present and untriaged** (mtimes 13:27 / 13:35 / 14:42 on 2026-05-29; the directory's own
mtime is 14:42, i.e. nothing has been filed since the day they were written), and the Q15 inventory
reproduces name-for-name. **Act-half UNRUN**: creating the ledger and `CLAUDE.md`, triaging the
three, and logging P-1/P-6 SENT are the F.W0 mail seat's acts. **G-3 gates the SENDs — no letter
leaves this tranche until it is green**, and this baseline does not move it.

---

## §3 DATED ADDENDA — raised, not cured (E-3: corrections are addenda, never rewrites)

Neither addendum changes a verdict. Both are recorded because a cure seat reading only the §2.x
expected-column will trip on them.

### A-1 — Gate 18's *"(src is 15/6)"* parenthetical does not reproduce at any producer coordinate

The gate's own oracle — the **adopted dist bytes** at
`web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` — reads **17 / 8**, exactly as expected.
The parenthetical *"(src is 15/6)"* is a **producer-side** figure, and the producer has moved five
majors since it was taken. Measured this seat, read-only:

| coordinate | `/*` | `*/` |
|---|---|---|
| producer HEAD `849c5547` — `src/styles/index.css` | **28** | **17** |
| `v8.0.0^{commit}` `17a11bc5` — `src/styles/index.css` ⟨`git show`⟩ | **28** | **17** |
| `v9.0.0^{commit}` `d4f7b24f` — `src/styles/index.css` ⟨`git show`⟩ | **28** | **17** |

**15 / 6 reproduces at none of the three.** The asymmetry itself is *worse* upstream (28 open vs 17
close, an eleven-token gap against the dist's nine), so the finding is not weakened — only the
figure is stale. **This is a reading correction, not a gate flip**: G-4's GREEN is defined *"only
upstream"* at the adopted 4.0.0 bytes, and the seat that lands the upstream cure should re-derive
the src side at the commit it is actually curing rather than inherit `15/6`. Booked for the sitting
as a dated observation under FR-NP-32 (≡ fr-PaperSidebar M1), both cited, neither substituted.

### A-2 — Gate 20: a bare `rev-parse` of an annotated tag returns a TAG OBJECT, not a commit hash

`glass-ui`'s `v8.0.0` and `v9.0.0` are **annotated tags** (`git cat-file -t` → `tag` for both).
Therefore:

- `git -C ../glass-ui rev-parse v8.0.0` → **`478aa462…`** — a **tag object** SHA.
- `git -C ../glass-ui rev-parse 'v8.0.0^{commit}'` → **`17a11bc5…`** — the **commit**, and the value
  §0i ratified as the registry pin for X-W0.j and F.W1 G1.

The two differ, and **only the second is a commit hash**. G-13 mints the standing rule *"producer-side
evidence carries the producer COMMIT HASH, never the version string"* (P-4) — a seat that satisfies
P-4 by pasting a bare `rev-parse v8.0.0` writes a SHA that is neither the version string nor a
commit, and it will not match `17a11bc5` in any registry or seam row. **`^{commit}` is mandatory at
every G-13 pin cell.** Same for v9: tag object `6d71e663…`, commit `d4f7b24f…`. Recorded here so the
trap is caught once rather than at each of the pin table's rows.

---

## §4 SETTLE — the double-run (WRITE-THEN-MEASURE)

Every published count was read twice from settled bytes; the second pass is pasted here whole:

```
=== SETTLE DOUBLE-RUN ===
kf:  41 / 252 / 325
fr:  m/w1-bump-migration / cd26c65 / 28
fr G-4: 17 vs 8
kf-v-exec cat-file: fatal: path 'src/animation/compile/value-ast.ts' does not exist in 'origin/master'  exit=128
```

Gate 18's own in-line settle is pasted at §2.18. Gate 11's `252` was additionally re-read **after**
the gate-15 `tsc` run (`post-gate15 status count: 252`) to prove the compiler emitted nothing into
the sibling tree.

**Self-count law**: this file publishes no count of its own contents. The tallies at §0 are counts of
**gates**, enumerated in the table above them and checkable row by row.

---

## §5 WHAT THIS SEAT DID NOT DO

- No `npm ci`, `npm install`, `npm run build`, `git reset`, `git stash`, or write of any kind in
  `keyframes.js`, `keyframes-v-exec`, `fourier-analysis` or `glass-ui`.
- No product source (`src/` `demo/` `api/` `test/` `e2e/`) opened for edit in any tree.
- `scripts/dev/dev.sh` neither touched nor staged.
- No act-half performed: G-5's build, G-12's table, G-3's ledger/`CLAUDE.md`/triage/SENDs, G-4's
  postcss reproduction, and G-1's 28 per-path dispositions all remain **UNRUN** and owed to their
  waves.
- No gate's expected column was edited, and no banked figure was rewritten — §3's two corrections
  are **addenda**, dated 2026-09-17.
