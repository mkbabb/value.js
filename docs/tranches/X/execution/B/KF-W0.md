SERVED MODEL: claude-opus-5[1m]

# KF.W0 — Substrate Settle · EXECUTION RECORD (Track B · X·KF)

Spec (GOVERNING, immutable per E-3): `docs/tranches/X/keyframes/waves/KF-W0.md` (758 L, `planned` at
repair round 6). Order: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.2; seat law §5; first gates §2.2.
Rulings: `docs/tranches/X/COHESION.md` §0i + §0j (§0j.C is this wave's).
Ledger row: `docs/tranches/X/execution/LEDGER.md` · Track B · KF.W0.

---

## Open

**Date**: 2026-09-17. **Seat**: KF.W0 seat 0 (OPEN). **Status set**: `planned` → `OPEN 2026-09-17`.

### Preconditions, verified at the bytes AND in the ledger

| # | condition (spec §State "Opens after" / runbook §1.2) | verdict | receipt |
|---|---|---|---|
| 1 | The owner's begin-word | **MET** | `COHESION.md` §0j carries it verbatim (2026-09-17), commit `b42d775a`. It opens execution of the 39 authored waves, all four tracks (§1.0), and grants *"publish, push, and pull whatever items you need"*. |
| 2 | Sub-tranche X·KF opens | **MET** | Runbook §1.2: `KF.W0 ∥ KF.W1 ── both open at begin-word`. KF.W0 is a track head; **no predecessor wave** (spec §State: *"No predecessor wave; this is the lane's first-executing file."*) |
| 3 | Pre-acts P-1 · P-2 · P-3 | **MET** | `LEDGER.md` §Pre-acts: P-1 `CLOSED 2026-09-17` (`642a0098`) · P-2 `CLOSED 2026-09-17` (`fd40535c` · `0bed8379`) · P-3 `CLOSED 2026-09-17` (§0j). |
| 4 | **OP-1 / §B-12 ruled** (the reset is owner-gated; a seat that performs it unruled invalidates the wave) | **MET — RULED** | `COHESION.md` §0j.C **KF-OP1**: *"the reset is PERFORMED, as the owner's delegated hand, in a reversible form"*, citing the begin-word's *"pull whatever items you need"* by quotation, in an **exact three-step snapshot-first order** (below). Never a bare reset. |
| 5 | kf write authority named | **MET — RULED** | §0j.C **KF-WRITE**: after §B-12 the sacred checkout on `master` is the execution substrate for KF.W2·W4·W5·W6·W7·W8·W9·W10; KF.W1's delivery rides `keyframes-v-exec`. Hand = the value.js orchestrator under the 2026-09-17 grant. `/Users/mkbabb/Programming/keyframes-v-exec` PRESENT. |
| 6 | The v8 owner item (G-0.8's input) | **RULED, not re-openable** | §0j.C **KF-OGKF1**: the Codex "Keyframes v8" B-lineage is **STALE-BY-SUBSTRATE and does not continue**; citable only as *"345 exact / 12 partial / 57 unresolved @ 8281638c"*; the five conditional TCC re-reads never open; **185-at-HEAD adopted** (X-2). |
| 7 | Substrate at the pinned coordinates | **MET** | ⟨`git rev-parse HEAD`⟩ → `8281638c0ac4ac8c54a67a018ca5bf6a9117174f`; ⟨`git rev-parse origin/master`⟩ → `81a56990736ced5b5edde0b84c527680ac7689b1`; ⟨`git merge-base HEAD origin/master`⟩ → `a59d3a22da080a8ed224e8d675112bb3bb0135b0`; branch `master`. Every anchor in this wave re-resolves at `origin/master 81a56990`; local `8281638c` **DISQUALIFIED**. |
| 8 | The snapshot ref OP-1 must create is free | **MET** | ⟨`git rev-parse --verify kf-sacred-snapshot-2026-09-17`⟩ → **absent**. ⟨`git ls-files --others --exclude-standard \| grep -c '^docs/tranches/V/'`⟩ → **99** untracked V docs, which OP-1's step (2) must NOT add and the reset must leave in place (*"untracked V docs unharmed"* ⟨lane-docs.md:380⟩). |
| 9 | W0 work-product absent (nothing pre-written) | **MET** | `docs/tranches/X/keyframes/W0/` and `docs/tranches/X/keyframes/artefacts/W0/` both **do not exist**; the four lane/census files and the 58 adjudicated records are present and unstamped. |

**Verdict: NOT BLOCKED.** The wave opens.

### E13 Step-0 — the four-path mail sweep (runbook §5.3)

Swept 2026-09-17 at this seat, read-only:

1. `docs/tranches/V/` + `docs/tranches/V/coordination/` — 10 + 15 files; newest non-self entry
   `value-inbox-2026-07-20-bbnf-coordination.md`@2026-07-21 (an outbound of ours). `INBOX.md` is
   self-excluded under the SELF-COUNT law.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK confirmed still the newest tranche dir**
   ⟨`ls -dlt .../tranches/B*/`⟩ → `BK`@Sep 17 12:28 > `BJ`@Aug 3 > `BI`@Jul 28 > `BH`@Jul 15. Four
   files; newest `glass-outbound-2026-08-29-valuejs-o20-ack.md`@2026-08-29 = **I-30**, already rowed.
3. `../keyframes.js/docs/tranches/V/coordination/` — 10 files; newest
   `VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md` (ours, outbound).
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 28 files; newest
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` (ours, outbound).

**Delta test** ⟨`find <each of the four paths> -maxdepth 1 -type f -newermt '2026-09-17 00:00'`⟩ →
**the only hit is `docs/tranches/V/coordination/INBOX.md` itself** (P-1's own sweep line, 12:32).

**Result: 0 unrowed · 0 new I-n minted · I-30 remains the ledger tail.** No mail is addressed to
KF.W0's scope that is not already rowed. A dated sweep line is appended at `INBOX.md`'s end.

---

## Baseline — the ten born-RED gates, run READ-ONLY at this seat (2026-09-17)

Substrate: `/Users/mkbabb/Programming/keyframes.js` at `origin/master 81a56990` / HEAD `8281638c`
(and `/Users/mkbabb/Programming/glass-ui` where named), plus the value.js corpus at its current
bytes. **No fetch was run** — `git fetch` is OP-1's own step (3) and this baseline measures the
tree as the wave found it. Every published figure was **double-run** (write-then-measure); both
runs agreed on every count.

| gate | subject | verdict | one-line reading |
|---|---|---|---|
| **G-0.1** | Substrate settled | **RED-AS-EXPECTED** | 41 behind · 1 ahead · 252 · 325 · 124; the two surfaces do not nest (225/152/100). |
| **G-0.2** | Manifest single-state | **RED-AS-EXPECTED** | four disagreeing coordinates: HEAD 6.0.0 (optionalDeps) · master 7.0.0 (exact devDep) · worktree DELETED · installed 7.0.0; `.npmrc` unruled. |
| **G-0.3** | EE-02 css-twin not regressed | **RED-AS-EXPECTED** | the four-path diff reproduces byte-for-byte (`6 insertions / 76 deletions`). |
| **G-0.4** | Re-regression guard | **RED-AS-EXPECTED** | all three oracles red at the audited disk, green at the frontier. |
| **G-0.5** | Header-ribbon tripwire (negative gate) | **RED-AS-EXPECTED as a tripwire; GREEN-BEFORE-CURE on its disjunct (a)** — see the finding below | producer deleted the dir at `4bf53962`; the one live consumer still imports it; installed 7.0.0 still ships `dist/header-ribbon.js`. |
| **G-0.6** | Counts re-run | **RED-AS-EXPECTED** | 153 / 58 / 185 reproduce; SCH-4 is MEASURE-AT-OPEN and its census predicate does not reproduce at any stated spelling (below). |
| **G-0.7** | Gate-inventory truth | **RED-AS-EXPECTED** | 3 entry points · 9 gate files · 54 distinct names + 1 bare token · 1 runnable → **53 dead** · 116 hits / 51 files; `build:gh-pages` exists nowhere. |
| **G-0.8** | Codex v8 pin dispositioned | **RED-AS-EXPECTED** | `V8-DISPOSITION.md` does not exist; no disposition is written anywhere. |
| **G-0.9** | Registry re-anchor | **RED-AS-EXPECTED** | 58 records, **0** stamped; `D-19` reaches 42 records by bare token. |
| **G-0.10** | Source-over-dist provenance | **RED-AS-EXPECTED** | `dist/gh-pages/assets/index-CL_QYCiO.css` mtime **Jul 16 09:11** — every byte-offset receipt in the corpus is provisional. |

### Pasted outputs

**G-0.1 — SUBSTRATE SETTLED** (spec §Gates `:497`; runbook §2.2 gate 11)

```
$ git rev-parse HEAD                              → 8281638c0ac4ac8c54a67a018ca5bf6a9117174f
$ git rev-parse origin/master                     → 81a56990736ced5b5edde0b84c527680ac7689b1
$ git rev-list --count HEAD..origin/master        → 41
$ git rev-list --count origin/master..HEAD        → 1
$ git status --short | wc -l                      → 252
$ git diff --name-only origin/master | wc -l      → 325
$ git ls-files --others --exclude-standard | wc -l → 124
$ git merge-base HEAD origin/master               → a59d3a22da080a8ed224e8d675112bb3bb0135b0
  (neither ref an ancestor of the other — the hybrid of C-2)

falsifier (D-2, repair round 4 — measured, never subtracted):
$ comm -13 <(git status --short | sed 's/^...//' | sort -u) \
           <(git diff --name-only origin/master | sort -u) | wc -l   → 225   frontier-diff NOT in status
$ comm -23 …                                                          → 152   status rows NOT in frontier diff
$ comm -12 …                                                          → 100   overlap   (252 = 152+100 · 325 = 225+100)
```

Every figure reproduces the CARRY seat's 2026-08-25 run and the fold seat's 2026-08-28 re-run
**exactly**, twenty days on. RED for its intended reason (L-19): the checkout is unreconciled.

**G-0.2 — MANIFEST SINGLE-STATE** (spec `:510`; runbook §2.2 gate 12)

```
$ git show HEAD:package.json          | grep -n glass-ui → 71:  "@mkbabb/glass-ui": "6.0.0"   (optionalDependencies)
$ git show origin/master:package.json | grep -n glass-ui → 77:  "@mkbabb/glass-ui": "7.0.0",  (devDependencies, EXACT)
$ grep -c glass-ui package.json                          → 0    ← the worktree DELETES the row
$ grep -c glass-ui package-lock.json                     → 0    ← and from the lock
$ git show HEAD:package-lock.json          | grep -c glass-ui → 3
$ git show origin/master:package-lock.json | grep -c glass-ui → 3
$ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version" → 7.0.0
$ cat .npmrc                                             → legacy-peer-deps=true
$ ls node_modules/@mkbabb/                               → glass-ui  parse-that  value.js   (no pencil-boil)
```

Four coordinates, three distinct states. RED. The `.npmrc` ruling is owed (silence is not a
disposition — G-0.2's own falsifier).

**G-0.3 — EE-02 CSS-TWIN NOT REGRESSED** (spec `:526`)

```
$ git diff origin/master --stat -- <the four paths>
 .../channel-controls/TimingFunctionPanel.vue       |  9 +---
 .../composables/useTimingFunctionEditor.ts         | 19 ++------
 package-lock.json                                  | 50 ----------------------
 package.json                                       |  4 +-
 4 files changed, 6 insertions(+), 76 deletions(-)
```

Byte-identical to the fold seat's 2026-08-28 paste. The disk carries `{ fn }` where master carries
`{ fn, css }` + `timingFunctionLiteralFor`. RED; the **direction lock is disk←master** (C-4).

**G-0.4 — RE-REGRESSION GUARD** (spec `:540`)

```
EE-01  git show HEAD:demo/components/CopyButton.vue         | sed -n 42p →     timingFunction: "bounceInEase",
       git show origin/master:demo/components/CopyButton.vue | sed -n 42p →     timingFunction: "easeInBounce",
       git status --short -- demo/components/CopyButton.vue  → (empty)   disk == HEAD == the dead name
FE-3   demo/components/instrument/keyframes/components/KeyframeCardList.vue:11
       HEAD          →                 :frame-start="frames[i].start.toString()"
       origin/master →                 :frame-start="startScalar(frames[i].start)"
EE-03  origin/master:.../composables/useKeyframesParsing.ts:97 →         () => animation.templateFrames.length,
       git grep -c '() => animation.templateFrames.length,' HEAD -- demo/ → 0   (the CURE LINE absent at HEAD — N-3's
                                                                                precise form, never the bare token grep)
```

Three oracles, each red at the audited disk and green at the frontier — which is what makes them
oracles. RED. **These run only AFTER the settle** (running them before measures the frontier and
proves nothing — the gate's own falsifier).

**G-0.5 — HEADER-RIBBON TRIPWIRE (negative gate)** (spec `:574`)

```
$ git -C ../glass-ui ls-tree --name-only HEAD src/components/header-ribbon/        → (empty)
$ git -C ../glass-ui ls-tree --name-only '4bf53962^' src/components/header-ribbon/
        → HeaderRibbon.vue  README.md  index.ts  styles.css  types.ts
$ grep -c header-ribbon ../glass-ui/package.json                                   → 0
$ git show origin/master:demo/.../shell/EditorShell.vue | grep -n header-ribbon
        → 116:import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";
$ ls node_modules/@mkbabb/glass-ui/dist/header-ribbon.js                           → present (installed 7.0.0)
$ git grep -cF 'glass-ui/header-ribbon' origin/master -- .
        → EditorShell.vue:1  +  2 docs-prose hits (H/audit/a-glass-ui-consumption.md · V/audit/R1-15-cross-repo.md)
          — non-import context, never counted (LAW A). CONSUMER SET = exactly one, tests included.
```

**R.2 FINDING — G-0.5 is GREEN-BEFORE-CURE on its stated GREEN, and it is declared, not latent.**
The gate's GREEN reads *"**either** the installed producer stays at-or-below `4bf53962` (i.e. 7.0.0,
today's state), **or** `origin/master:EditorShell.vue:116` no longer imports the deleted subpath."*
Disjunct (a) **holds at today's bytes** — installed = 7.0.0, measured at this seat — exactly as the
gate's own parenthetical predicts. The spec nonetheless declares it RED at authoring, and both
readings are true of different objects: the *state* is safe, the *tripwire* is undeclared. Nothing
here is a cure to skip. **KF.W0.b's act is the declaration**, not a state change: bank
`headerribbon-tripwire.txt`, and carry the OUTBOUND **HOLD** of §Sequencing (installed glass-ui may
not advance past `4bf53962` while `:116` stands) into `MANIFEST-RULING.md`, so that **G-0.5 BOUNDS
G-0.2** — a *"declare the newest glass-ui and regenerate the lock"* remediation passes G-0.2 and
destroys the build. Recorded here rather than absorbed, per R.2.

**G-0.6 — COUNTS RE-RUN** (spec `:589`)

```
SCH-3  git ls-tree -r --name-only origin/master src/  | grep -c '\.ts$'        → 153   (census claimed 145)
SCH-6  git ls-tree -r --name-only origin/master demo/ | grep -c '\.vue$'       → 58    (holds; contents drifted)
X-2    git ls-tree -r --name-only origin/master demo/ | grep -cE '\.(ts|vue)$' → 185   (Codex + census both said 184 —
                                                                                       the stale-worktree figure)
```

**SCH-4 is MEASURE-AT-OPEN, and its census predicate does not reproduce at any spelling this seat
can state.** The claim is *"61 value.js `from`-lines (`/value` 15) vs 62 (16)"*. At `origin/master`:

```
$ git grep -h 'from "@mkbabb/value.js'       origin/master -- src demo test scripts | wc -l → 148
$ git grep -h 'from "@mkbabb/value.js/value' origin/master -- src demo test scripts | wc -l →  30
$ git grep -h 'from "@mkbabb/value.js'       origin/master -- .                     | wc -l → 207
```

Neither 61/15 nor 62/16 is reachable from any of the three. **This is not a gate divergence — it is
precisely the row the gate marks MEASURE-AT-OPEN**, and it is the SCH-3 drift class (*"a figure
restated without its command is indistinguishable from the stale one it replaces"*). **Unit `.d`
owns it**: it must state the predicate it measures under and paste both readings, never inherit the
census's unstated one. Banked here as the open reading with its commands, dated.

**G-0.7 — GATE-INVENTORY TRUTH** (spec `:607`)

```
$ git show origin/master:package.json | grep -n 'proof:\|"check"\|"lint"\|"gh-pages"'
  37:  "check":            "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"   ← NO vue-tsc
  43:  "gh-pages":         "vite build --mode gh-pages"
  44:  "lint":             "depcruise src"
  50:  "proof:structure":  "node scripts/gates/structure/index.mjs"
  51:  "proof:publish":    "node scripts/gates/surface/index.mjs"
  52:  "proof:owner-golden":"node scripts/gates/visual/index.mjs"
$ git ls-tree   --name-only origin/master scripts/gates/ → structure  surface  visual   (three DIRECTORIES)
$ git ls-tree -r --name-only origin/master scripts/gates/ | wc -l → 9   (nine FILES)
$ git grep -ho 'proof:[a-z0-9-]*' origin/master -- demo/ | grep -v -- '-$' | sort -u | wc -l          → 55
$ …                                                                        | grep -cx 'proof:'        →  1   (the bare token)
$ …                                                                        | grep -vx 'proof:' | wc -l → 54   DISTINCT NAMES
$ …                                                       | grep -E 'proof:(publish|structure|owner-golden)$' → proof:publish
                                                                                           → 1 runnable → 53 DEAD
$ git grep -c 'proof:' origin/master -- demo/  → 51 files / 116 hits  (per-file sum)
$ git grep -c 'build:gh-pages' origin/master   → no hits   ← R-11 holds: the script is `npm run gh-pages`
```

The round-2 re-derivation reproduces **exactly** (54 names + 1 bare token; 1 runnable; 53 dead;
116/51). RED: no roster artifact exists. **`.e` writes `docs/**` only and strikes nothing** — a
strike under `demo/**` is Dispatch-fatal.

**G-0.8 — CODEX v8 PIN DISPOSITIONED** (spec `:647`)

```
$ ls docs/tranches/X/keyframes/W0/V8-DISPOSITION.md → No such file or directory
```

No disposition exists anywhere. RED. **The ruling is already made and is NOT re-openable**:
COHESION §0j.C **KF-OGKF1** — STALE-BY-SUBSTRATE, citable only as *"345 exact / 12 partial / 57
unresolved @ 8281638c"*, the five conditional TCC re-reads never open, **185** adopted. `.e` writes
the ruling **as ruled**, adds the 185 receipt, and **NAMES** OG-KF1 for KF.W10 — *"a seat that rules
it here fails the wave"* (§Excluded).

**G-0.9 — REGISTRY RE-ANCHOR** (spec `:653`)

```
$ ls docs/tranches/V/megatranche/registry/adjudicated/kf-*.md | wc -l            → 58
$ grep -li 'ref-of-record' docs/tranches/V/megatranche/registry/adjudicated/kf-*.md | wc -l → 0
$ grep -l 'D-19' docs/tranches/V/megatranche/registry/adjudicated/kf-*.md | wc -l → 42   (bare token; 34 in the
                                                                                    re-anchor sense per C-1.R row 6)
```

58 records, **zero** stamped. RED for its intended reason. Six named appended corrections plus the
`D-19` key are owed; the pass must be demonstrably **per-file** (C-21) — a blanket per-repo stamp
corrupts three banked rows.

**G-0.10 — SOURCE-OVER-DIST PROVENANCE** (spec `:659`)

```
$ ls -l dist/gh-pages/assets/index-CL_QYCiO.css → 571142 bytes, mtime Jul 16 09:11
$ ls node_modules/@mkbabb/glass-ui/dist/ | wc -l → 225   (the consumed 7.0.0 artifact, present)
$ git cat-file -e origin/master:docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md
        → PRESENT   (letter (b), the keyframes-side one)
$ ls ../value.js/docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md
        → PRESENT   (letter (a), the value.js-side one)
```

The Jul-16 build artifact stands; every byte-offset receipt in the corpus is provisional. RED. Both
repo-qualified letters exist and **both** must be named in the re-read — *"a receipt naming one
letter is RED"* (D-1, repair round 3).

### Baseline summary

**10 gates · 10 RED-AS-EXPECTED · 0 UNRUNNABLE · 1 GREEN-BEFORE-CURE finding (G-0.5, on its stated
GREEN disjunct (a), declared by the spec itself) · 1 MEASURE-AT-OPEN row banked with a
non-reproducing census predicate (SCH-4, routed to `.d`).** No gate was cured, turned, or touched;
no product byte moved; nothing was fetched.

---

## Unit plan

**Shape** (spec §Agent Units `:665-677` + §Sequencing `:681` + §Disjointness `:353`):
`OP-1 → (.b ∥ .c) → (.d ∥ .e)`. **Peak concurrency 2**, inside the four-workflow cap (§5.1).
**All seats Opus** — spec §Agent Units `:667`: *"this wave is enumeration, measurement, ruling, and
appended correction; there is no design content."* No Fable seat, no adjudicator, no design author.

**Ordered groups**

1. `[KF.W0.OP-1]` — alone and first. It is the only unit that moves a product byte; every other unit
   reads what it moves.
2. `[KF.W0.b, KF.W0.c]` — disjoint: `.b` writes `MANIFEST-RULING.md` + `INBOX.md`; `.c` writes
   `SUBSTRATE-SETTLE-*.md`. The two EE-02 paths are the owner's hand and are **verified, not
   written**, by `.c`.
3. `[KF.W0.d, KF.W0.e]` — disjoint: `.d` owns `COUNTS-*`, `CENSUS`, `lane-frontend`, `lane-library`;
   `.e` owns `GATE-ROSTER`, `REF-OF-RECORD`, `V8-DISPOSITION`, the 58 records,
   `INTAKE-ADJUDICATION`, `lane-docs`. **No two concurrent units share a modify path.**

**Hard orders inside the wave** (spec `:681`): C-9's cascade column **before** F-1's remediation
scopes its blast radius · C-17's id minting **inside** the census re-anchor · **G-0.5 BOUNDS G-0.2**
(negative gate) · G-0.4's oracles run **after** the migration lands, never before.

**Commits** (spec §Cadence `:753`, pathspec only, `scripts/dev/dev.sh` never included):
`docs(kf-w0/settle)` · `docs(kf-w0/manifest)` · `docs(kf-w0/counts)` · `docs(kf-w0/roster+provenance)`
· `docs(kf-w0/ref-of-record)` · `docs(kf-w0/v8)` · `docs(kf/w0 close)` — the last stamps
**IMPLEMENTED**; **VERIFIED is KF.W10's** (R-A).

**Dispatch (wave-invalidating, spec `:317-323`)**: the reset by any seat other than the ruled OP-1
hand · any write under `keyframes.js/{src,demo,test,scripts}/**` beyond the two EE-02 paths · any
producer-repo write · a blanket per-repo re-anchor · a MANIFEST MISMATCH after the settle (owner
return, not local repair) · a third diagnostic iteration on one gate.

### Units

| id | model | sub-gates | writable set (authoritative) |
|---|---|---|---|
| `KF.W0.OP-1` | opus | G-0.1 | `/Users/mkbabb/Programming/keyframes.js` — refs + working tree, **via the §0j.C three-step command sequence only**; the four OWNER'S-HAND bounds rows (`package.json`, `package-lock.json`, the two EE-02 files) are reconciled **by the reset itself**, never authored |
| `KF.W0.b` | opus | G-0.2 · G-0.5 | `…/X/keyframes/W0/MANIFEST-RULING.md` · `…/V/coordination/INBOX.md` · `…/X/keyframes/artefacts/W0/{manifest-four-coordinates.txt,headerribbon-tripwire.txt}` |
| `KF.W0.c` | opus | G-0.3 · G-0.4 | `…/X/keyframes/W0/SUBSTRATE-SETTLE-2026-09-17.md` · `…/X/keyframes/artefacts/W0/{substrate-open.txt,substrate-close.txt,ee02-diff-open.txt,ee02-diff-close.txt,oracle-ee01-fe3-ee03.txt}` |
| `KF.W0.d` | opus | G-0.6 | `…/X/keyframes/W0/COUNTS-2026-09-17.md` · `…/V/megatranche/formation/keyframes/{CENSUS-2026-08-03.md,lane-frontend.md,lane-library.md}` · `…/X/keyframes/artefacts/W0/counts-2026-09-17.txt` |
| `KF.W0.e` | opus | G-0.7 · G-0.8 · G-0.9 · G-0.10 | `…/X/keyframes/W0/{GATE-ROSTER.md,REF-OF-RECORD.md,V8-DISPOSITION.md}` · `…/V/megatranche/registry/adjudicated/kf-*.md` (all 58, **modify-append only**) · `…/V/megatranche/audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md` · `…/V/megatranche/formation/keyframes/lane-docs.md` (modify-carve, §B-12 row 16 disposition cell ONLY) · `…/X/keyframes/artefacts/W0/{gate-roster.txt,refofrecord-stamp-audit.txt,glass-citation-rederivation.txt,v8-disposition.txt}` · `keyframes.js/dist/gh-pages/**` **regenerate-only** via one `npm run gh-pages` |

**Spec sections each unit executes**

- **OP-1** — §Agent Units `:669` · §Gates G-0.1 `:496-508` · §Scope 1 `:305` · §Bounds owner-hand
  rows `:345-348` · **COHESION §0j.C KF-OP1 `:543-558`** (the ruled command order) · runbook §5.5
  (kf read-only law, lifted by KF-WRITE).
- **.b** — §Agent Units `:671` · §Gates G-0.2 `:510-524` + G-0.5 `:574-587` · §Scope 2 `:306` ·
  §Carry C-1 `:361` · C-3 `:363` · C-16 · §Sequencing glass-ui OUTBOUND HOLD + FYI row `:688` ·
  §LAW-A Census 2 `:134-152`.
- **.c** — §Agent Units `:673` · §Gates G-0.3 `:526-538` + G-0.4 `:540-572` · §Scope 1,3,4
  `:305,:307,:308` · §Carry C-2 `:362` · C-4 `:364` · C-5 `:365` · C-6 `:366` · C-7 `:367` · C-15 ·
  §LAW-A Census 1 `:75-132` (the flat-triad removal, stated by path) · §L-18 rider `:757`.
- **.d** — §Agent Units `:675` · §Gates G-0.6 `:589-605` · §Scope 5,6,7 `:309-311` · §Carry C-8
  `:368` · C-9 `:369` · C-10 `:370` · C-11 · C-17 · **C-17.R `:457-482`** (the 15-row roster) ·
  §Sequencing KF.W5 row `:691` and KF.W10 row `:695`.
- **.e** — §Agent Units `:677` · §Gates G-0.7 `:607-645` · G-0.8 `:647-651` · G-0.9 `:653-657` ·
  G-0.10 `:659-663` · §Scope 8,9,10,11 `:312-316` · §Carry C-12..C-14, C-18..C-22, C-1.R `:441-456`
  · §Excluded `:701-745` (the sixteen-id EH partition + its SHADOW line).

### Briefs

**KF.W0.OP-1 — the reset (the owner's delegated hand).** In `/Users/mkbabb/Programming/keyframes.js`,
alone and first, the §0j.C order and **no other**: (1) `git branch kf-sacred-snapshot-2026-09-17` at
HEAD `8281638c` — the 1-ahead commit preserved by ref; (2) `git checkout
kf-sacred-snapshot-2026-09-17 && git add -u && git commit -m "snapshot(kf): the sacred checkout's
252 tracked modifications as found 2026-09-17 (OWNER'S HAND record; KF.W0 §B-12)"` — **`add -u`
only; untracked files are NOT added**, so the 99 untracked V docs survive; (3) `git checkout master
&& git fetch origin && git reset --hard origin/master`. Bank `substrate-open.txt` before and the
sextuple after. FORBIDDEN: partial `git checkout origin/master -- src/`, any stash, any
`master←disk`. Hand off the snapshot sha to `.c`.

**KF.W0.b — The Manifest Ruling.** Re-measure the four coordinates on the settled tree and paste
them into `MANIFEST-RULING.md` + `manifest-four-coordinates.txt`: single state at `"@mkbabb/glass-ui":
"7.0.0"` **exact devDep** + lock. **Rule the worktree deletion** (committing it as-is revives census
F-1) and **rule `legacy-peer-deps=true` against the two genuinely-absent peers** (`pencil-boil`,
`embla-carousel-vue`) — silence is not a disposition. Carry G-0.5's HOLD into the ruling: installed
glass-ui may not advance past `4bf53962` while `EditorShell.vue:116` stands; bank
`headerribbon-tripwire.txt` from the LAW-A Census-2 graph, one consumer. Append the three relay
packets (KF-APP-59 unmet peers · the EH-1 two-letter rider · KF-APP-5 producer-half MOOT) to
`INBOX.md` — **`.b` alone, once, at close**. Commit `docs(kf-w0/manifest)`.

**KF.W0.c — Reconciliation Record and the Rebase Oracle.** Write
`SUBSTRATE-SETTLE-2026-09-17.md`: disposition the 1-ahead commit (committed → the snapshot sha) and
**BOTH enumerations, never one plus a difference** — the 252 status rows (152 outside the frontier
diff, 124 untracked → kept) and the 225 frontier-diff files outside the status set, `comm -13`/`-23`/
`-12` pasted. State the flat `emit/{backward,backward-walk,backward-color}.ts` triad's **removal by
path** (LAW-A Census 1: zero importers traverse the flat spelling). **Diff the reconciliation, never
assume it** (C-15: `position="right"` must not carry forward under a different spelling). Verify —
never author — the two EE-02 paths: G-0.3 GREEN is an **empty diff** for the `.ts`/`.vue` pair.
Then run G-0.4's three static probes on the settled tree with the date and `git rev-parse HEAD`
beside each output, plus the two negative probes; the runtime tier is `live-session.mjs` by path.
Commit `docs(kf-w0/settle)`.

**KF.W0.d — Counts, Columns, and Fresh Shadow Ids.** Re-run SCH-1..7 + X-2 at `origin/master`,
command + literal output + date per row, into `COUNTS-2026-09-17.md`. **SCH-4: state your predicate
and paste both readings** — the census's 61/15 reproduces at no spelling this wave can state (see
Baseline). Add the **cascade-coupled column beside the import census** (C-9's hard order: before
F-1's remediation scopes its blast radius, now against C-1.F's full thirteen). Re-scope
`lane-frontend.md` **§6.5's PRM roster (13 sites / 12 files) + its counts-table tally row** and the
z-index cells **in ONE motion**; `CENSUS-2026-08-03.md` gets the **pointer-cell correction only**
(D-4). Mint every C-17.R claimant — **14 live rows + 1 enumerated strike, ONE motion**, each id
citing its originating record; dead/refused are enumerated, never minted. Run OP-4's probe `git grep
-n 'parseAnimationCSS' 81a56990 -- src demo`, output pasted literally — **measure, never decide the
home**. Commit `docs(kf-w0/counts)`.

**KF.W0.e — Ref-of-Record, Gate Roster, Provenance, v8.** `GATE-ROSTER.md`: 3 npm entry points + the
9 `scripts/gates/` files by path, then **ROSTER + ROUTE the 53 dead names** re-run at authoring —
each name with its sites and a per-name disposition (struck-in-owner-wave / routed-with-named-owner /
a loud NO-WAVE-OWNER line); the three R-8 families by name **and by family** (D-13's seven · L-6's
16×13 · KF-EST-1's eight incl. `TypingDots.vue:45`/`:51`/`:59`); `proof:brittleness` → **KF.W6**.
**Strike nothing** — `docs/**` only; a `demo/**` strike invalidates the wave. `REF-OF-RECORD.md`:
stamp all 58 records by **appended** correction (E-3), keyed to **`D-19`** via C-1.R row 6,
demonstrably **per-file** (C-21), with C-19's **30 members + 2 anti-firings enumerated separately**
and the six named corrections landed by id. `V8-DISPOSITION.md`: write §0j.C's **KF-OGKF1** ruling as
ruled, adopt **185**, **NAME** OG-KF1 for KF.W10 — never rule it. Re-derive or strike every
`glass-ui/src/**` citation against `node_modules/@mkbabb/glass-ui/dist/**`, re-read XR-4 /
IN-GLASS-1 / `DISPOSITIONS.md:21` against **both** repo-qualified letters **and** `dist/header-ribbon.js`,
and run **one `npm run gh-pages`**, banking the build hash. Commits `docs(kf-w0/roster+provenance)` ·
`docs(kf-w0/ref-of-record)` · `docs(kf-w0/v8)`.

---

## Unit receipts

*(each unit appends its receipt here — served model, acts, commands, commit hashes, gate
before/after — in unit order; nothing above this line is rewritten, per E-3)*

### KF.W0.OP-1

**SERVED MODEL: claude-opus-5[1m]** · **Date**: 2026-09-17 · **Substrate**:
`/Users/mkbabb/Programming/keyframes.js` · **Charge**: spec §Agent Units `:669` · §Gates G-0.1
`:496-508` · §Scope 1 `:305` · §Bounds OWNER'S-HAND rows `:345-348` · §Triumvirate Dispatch
`:317-323` · **COHESION §0j.C KF-OP1** (the ruled command order) · runbook §5.5 (kf read-only,
lifted by §0j.C KF-WRITE). Ran **alone and first**; no other unit had opened.

#### Act 0 — measure before you act (read-only, double-run)

Every anchor verified at true bytes before a ref moved. Both runs of the sextuple agreed on every
count, and every figure reproduces seat-0's Baseline and the fold seat's 2026-08-28 re-run exactly.

```
⟨git rev-parse --abbrev-ref HEAD⟩            → master
⟨git rev-parse HEAD⟩                         → 8281638c0ac4ac8c54a67a018ca5bf6a9117174f     ← the pin
⟨git rev-parse origin/master⟩                → 81a56990736ced5b5edde0b84c527680ac7689b1     ← the pin
⟨git rev-parse --verify kf-sacred-snapshot-2026-09-17⟩ → fatal: Needed a single revision     ← the ref is free
⟨git rev-list --count HEAD..origin/master⟩   → 41      ⟨…origin/master..HEAD⟩      → 1
⟨git status --short | wc -l⟩                 → 252     ⟨git diff --name-only origin/master | wc -l⟩ → 325
⟨git ls-files --others --exclude-standard | wc -l⟩ → 124   ⟨… | grep -c '^docs/tranches/V/'⟩ → 99
⟨git merge-base HEAD origin/master⟩          → a59d3a22da080a8ed224e8d675112bb3bb0135b0
⟨comm -13 / -23 / -12⟩                       → 225 / 152 / 100   (252 = 152+100 · 325 = 225+100)
```

**One reading this seat added, because `git add -u`'s reach depends on it and no prior seat had
stated it** — the 252 status rows are **not** 252 tracked rows:

```
⟨git status --short | grep -vc '^??'⟩        → 226   TRACKED rows — exactly what `add -u` stages (219 M + 7 D)
⟨git status --short | grep -c  '^??'⟩        →  26   untracked STATUS rows, 2 of them DIRECTORIES
                                                     (`docs/tranches/V/` · `test/demo/reference-data/`)
⟨git ls-files --others --exclude-standard | wc -l⟩ → 124   the same 26 rows expanded to FILES
```

E-3 addendum-beside, amending nothing: COHESION §0j.C's ruled commit message reads *"the sacred
checkout's **252** tracked modifications"*. **252 is the status-row denominator; the tracked subset
the ruled `add -u` commits is 226.** The message was used **verbatim as ruled** — the correction
rides beside it, never in it.

Two further read-only probes, both pre-act:

- **hooks** — ⟨`git config --get core.hooksPath`⟩ → `.git/hooks`; ⟨`ls .git/hooks | grep -v '\.sample$'`⟩
  → none. The ruled bare `git commit -m` was run **as ruled**, with no `--no-verify` substitution.
- **the remote, before the fetch could move the pin under the act** — ⟨`git ls-remote origin
  refs/heads/master`⟩ → `81a56990736ced5b5edde0b84c527680ac7689b1`. Identical to the pinned
  coordinate, so step (3)'s `fetch` was proven inert **before** it ran.

Banked: `docs/tranches/X/keyframes/artefacts/W0/substrate-open.txt` (78 L).

#### Acts 1–3 — the §0j.C order, exactly and no other

| # | ruled command, run verbatim | result |
|---|---|---|
| 1 | `git branch kf-sacred-snapshot-2026-09-17` | ref created at HEAD; ⟨`git for-each-ref …`⟩ → `refs/heads/kf-sacred-snapshot-2026-09-17 8281638c0ac4ac8c54a67a018ca5bf6a9117174f`. The 1-ahead commit is preserved **by ref** before anything else moves. |
| 2 | `git checkout kf-sacred-snapshot-2026-09-17 && git add -u && git commit -m "snapshot(kf): the sacred checkout's 252 tracked modifications as found 2026-09-17 (OWNER'S HAND record; KF.W0 §B-12)"` | **`6d280ee7bec7793846b2e2e1d250e1ea0a21859a`** — *226 files changed, 4483 insertions(+), 6156 deletions(-)*, incl. the 7 deletions. Parent = `8281638c`. **`add -u` ONLY**: ⟨`git status --short \| grep -vc '^??'`⟩ → **0** tracked rows left, ⟨`git ls-files --others --exclude-standard \| wc -l`⟩ → **124** untracked still unstaged and on disk at this instant. |
| 3 | `git checkout master && git fetch origin && git reset --hard origin/master` | `Switched to branch 'master'` → `HEAD is now at 81a56990 docs(V·vnext): trim tape to out-of-scope pointer per owner context ruling`. |

**Forbidden forms, none used**: no partial `git checkout origin/master -- src/`, no `git stash`, no
`master←disk`, no bare reset, no `--force` anywhere, no reset of any other shape.

**Snapshot sha handed to `.c`** (the G-0.1 disposition receipt): **`6d280ee7bec7793846b2e2e1d250e1ea0a21859a`**
(short `6d280ee7`); ⟨`git merge-base --is-ancestor 8281638c kf-sacred-snapshot-2026-09-17`⟩ → **0**,
so `8281638c` remains reachable.

#### Act 4 — the close reading (double-run; both runs agreed)

```
⟨git rev-parse HEAD⟩                         → 81a56990736ced5b5edde0b84c527680ac7689b1   (== origin/master)
⟨git rev-parse --abbrev-ref HEAD⟩            → master
⟨git rev-list --count HEAD..origin/master⟩   → 0       (was 41)
⟨git rev-list --count origin/master..HEAD⟩   → 0       (was  1)
⟨git status --short | wc -l⟩                 → 6       (was 252)   — 0 of them tracked
⟨git diff --name-only origin/master | wc -l⟩ → 0       (was 325)
⟨git ls-files --others --exclude-standard | wc -l⟩ → 6 (was 124)   ← see the FINDING
⟨git merge-base HEAD origin/master⟩          → 81a56990…           (was a59d3a22…)
⟨git diff --check⟩                           → (clean)             — §Cadence unit-boundary check
```

**G-0.1's `emit` clause, stated BY PATH** (N-2 + LAW-A Census 1 — the clause only a **full** reset
can discharge): ⟨`test -e`⟩ → `src/animation/compile/emit/{backward,backward-walk,backward-color}.ts`
**all three ABSENT**; ⟨`ls src/animation/compile/emit/`⟩ → `backward/ · format/` (modules) + 7 flat
siblings. Had a partial `checkout -- src/` been used, the flat triad would have survived as
**zero-importer orphans no build error surfaces**.

**Dispatch check — MANIFEST MISMATCH does not fire** (the *ruling* is `.b`'s, G-0.2; this is only the
owner-return trigger): HEAD `:77` · origin/master `:77` · worktree `:77` all `"@mkbabb/glass-ui":
"7.0.0"`; ⟨`node -p …glass-ui/package.json).version`⟩ → `7.0.0`; ⟨`grep -c '@mkbabb/glass-ui'
package-lock.json`⟩ → `3`. The worktree **deletion is gone, reconciled BY the reset, never authored** —
the four OWNER'S-HAND bounds rows (`package.json`, `package-lock.json`, the two EE-02 paths) were
moved by the reset alone. ⟨`cat .npmrc`⟩ → `legacy-peer-deps=true`, **still unruled — `.b`'s**.

**EE-02 (G-0.3's evidence, produced by the reset; the GATE is `.c`'s)**: ⟨`git diff origin/master
--stat -- <the four paths>`⟩ → **empty**. Direction lock disk←master honoured; the css-twin is not
regressed.

Banked: `docs/tranches/X/keyframes/artefacts/W0/substrate-close.txt` (127 L).

#### FINDING — LOUD, IRREVERSIBLE, and this seat's own miss

**The ruled premise *"untracked V docs unharmed"* does not hold for untracked paths that exist in the
target tree.** COHESION §0j.C step (2) reasons that because untracked files are not added, *"[they]
are therefore left in place by the reset"*. **Step (2) held exactly as ruled** — `add -u` staged 226
tracked rows and zero untracked ones. **The inference about step (3) does not**: `git reset --hard <t>`
skips `verify_absent`, so an untracked working-tree file whose path exists in `<t>` is **overwritten
with `<t>` bytes** (unlike `git checkout`, which refuses). Only untracked paths **absent** from `<t>`
survive.

Measured, not inferred:

| | before | after | disposition |
|---|---|---|---|
| untracked files | **124** | **6** | **118 ABSORBED** — now tracked, carrying `origin/master` bytes |
| untracked `docs/tranches/V/` | **99** | **2** | **97 ABSORBED** |

⟨`git diff --name-status 8281638c origin/master \| grep -c '^A'`⟩ → **219** paths the 41 commits add;
⟨`git ls-tree -r --name-only origin/master docs/tranches/V/ \| wc -l`⟩ → **175** V files at the
frontier. `8281638c` carries **no** `docs/tranches/V/` at all — which is why `git status --short`
collapsed the whole dir to one `?? docs/tranches/V/` row at open.

**The six survivors, byte- and mtime-intact** (⟨`stat -f '%Sm'`⟩): the two V docs are
`VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md` (2026-07-24 16:41) and
`VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md` (2026-07-27 12:27) — **value.js's own
outbound mail, delivered into this tree and never committed here**; plus four local-only src files
(`compile/{compiled-frame,interp-slot,value-ast}.ts` · `group/composite-storage.ts`, all 2026-07-16).

**E13 consequence: the cross-repo mail value.js delivered is UNHARMED.** The 97 absorbed V docs are
keyframes.js's **own** V-tranche docs, every one of which exists at `origin/master` and now carries
the frontier bytes — the authority this entire wave declares (local `8281638c` is DISQUALIFIED).

**What is unrecoverable, stated rather than minimised**: if any of the 118 absorbed files held local
bytes *differing* from `origin/master`, those bytes are gone — `add -u` never staged them (correctly,
as ruled), so no git object holds them. **No filesystem signal survives to name which 97 of the 175
frontier V paths pre-existed**: git unlinked and recreated all of them — ⟨`find docs/tranches/V -type
f -exec stat -f '%SB' …`⟩ → **175 with birthtime 2026-09-17**, the two survivors alone keeping their
July birthtimes.

**Routed to KF.W0.c — G-0.1's GREEN disposition must be re-cut**: the surface partitions as
**226 COMMITTED** (snapshot `6d280ee7`) · **118 DISCARDED, superseded by `origin/master`** — *not*
"kept (untracked)", the class the ruling anticipated · **6 KEPT**.

**The probe this seat should have run before step (3), and did not — recorded as the seat's miss, not
as a property of git**:

```
comm -12 <(git ls-files --others --exclude-standard | sort) \
         <(git ls-tree -r --name-only origin/master | sort) | wc -l
```

Any nonzero reading is the set of untracked files `reset --hard` will clobber, and it is an **owner
question before the act, never a finding after it**. This seat had no authority to deviate from the
ruled order (*"this exact order and no other"*), so the lawful shape of the miss was a **pre-act
escalation**, not a substituted command. Booked here so the next substrate seat anywhere in X runs it
first.

#### E13 — mail, at this unit's scope

Seat 0's four-path sweep (record §Open) returned **0 unrowed · I-30 the ledger tail**. The settle
changed what is *visible* in `keyframes.js/docs/tranches/V/coordination/`, so it was re-swept
read-only at close: 11 files + `vnext/`; ⟨`ls -1 … | grep -oE '20[0-9]{2}-[0-9]{2}-[0-9]{2}' | sort -u
| tail`⟩ → newest dated packet **2026-07-27**, which is value.js's own outbound. **No packet addressed
to value.js was surfaced by the settle. 0 UNREAD in scope.** `INBOX.md` appends stay `.b`'s alone,
once, at close (§Disjointness).

#### Gates

| gate | BEFORE | AFTER |
|---|---|---|
| **G-0.1** | **RED-AS-EXPECTED** — 41 behind · 1 ahead · 252 · 325 · 124; merge-base `a59d3a22`, neither ref an ancestor | **GREEN on every clause this unit owns** — 0 behind · 0 ahead · 0 tracked status rows · 0 frontier-diff; the 1-ahead commit preserved by ref and committed to `6d280ee7`; the flat `emit` triad's removal stated by path; the reconciliation **diffed, not assumed**. **Two clauses remain `.c`'s**: the written disposition record over BOTH enumerations, and C-15's `position="right"` non-carry-forward check. |

No other gate was touched, cured or turned by this unit.

#### Commits

| repo | sha | meaning |
|---|---|---|
| keyframes.js | `6d280ee7bec7793846b2e2e1d250e1ea0a21859a` | the ruled OWNER'S-HAND snapshot (step 2) — message verbatim as ruled |
| value.js | *(this receipt + the two artefacts, below)* | `docs(kf-w0/op-1)` |

`substrate-open.txt` and `substrate-close.txt` are committed **with this receipt** rather than left
for `docs(kf-w0/settle)`: they are the only readings of a tree that no longer exists, and leaving an
irreplaceable open reading uncommitted after an irreversible act is the fragility this program
legislates against. **`.c` verifies them; it does not re-author them** (§Disjointness is satisfied —
OP-1 and `.c` are not concurrent).

#### Residuals

1. The **118-file absorption** above — irreversible, routed to `.c`'s disposition record and to the
   orchestrator.
2. `.npmrc` `legacy-peer-deps=true` still unruled (G-0.2, `.b`'s).
3. The snapshot branch `kf-sacred-snapshot-2026-09-17` is **local-only** — not pushed. Whether it is
   pushed to `origin` is not this unit's call; named here so it is not assumed durable off-machine.
4. No escalation fired: none of the five §Triumvirate Dispatch triggers is met (the reset was
   performed by the ruled OP-1 hand under the begin-word; no write under
   `keyframes.js/{src,demo,test,scripts}/**` beyond the reset's own act; no producer-repo write; no
   blanket re-anchor; no manifest mismatch; no second diagnostic iteration on any gate).

### KF.W0.c

**SERVED MODEL: claude-opus-5[1m]** · **Date**: 2026-09-17 · **Substrate**:
`/Users/mkbabb/Programming/keyframes.js` at the SETTLED coordinate — ⟨`date "+%Y-%m-%d"`⟩ →
**2026-09-17**, ⟨`git rev-parse HEAD`⟩ → **`81a56990736ced5b5edde0b84c527680ac7689b1`** ·
**Charge**: spec §Agent Units `:673` · §Gates G-0.3 `:526-538` + G-0.4 `:540-572` · §Scope 1, 3, 4
(`:305`, `:307`, `:308`) · §Carry C-2 `:362` · C-4 `:364` · C-5 `:365` · C-6 `:366` · C-7 `:367` ·
C-15 `:375` · §LAW-A Census 1 `:75-132` · §L-18 rider `:757` · COHESION §0j.C **KF-OP1**/**KF-WRITE**.
Ran **after OP-1**, concurrent with `.b` (§Disjointness: `.b` writes `MANIFEST-RULING.md` +
`INBOX.md`; `.c` writes `SUBSTRATE-SETTLE-*.md`; **no shared modify path**).

**This unit moved no byte in `keyframes.js`.** Every command below is `git` / `ls` / `grep` / `sed` /
`wc` / `diff`, read-only. The two EE-02 paths are OWNER'S-HAND bounds rows and were **verified,
never authored**. No fetch was run — moving the `origin/master` ref under this wave's anchors is not
this seat's act (see the finding at act 6).

#### Act 1 — measure before you write: the settled coordinate, double-run

```
⟨git rev-parse HEAD⟩                        → 81a56990736ced5b5edde0b84c527680ac7689b1
⟨git rev-parse origin/master⟩               → 81a56990736ced5b5edde0b84c527680ac7689b1
⟨git rev-list --count HEAD..origin/master⟩  → 0     ⟨origin/master..HEAD⟩ → 0
⟨git status --short | wc -l⟩                → 6     ⟨git ls-files --others --exclude-standard | wc -l⟩ → 6
⟨git diff --name-only origin/master | wc -l⟩→ 0     ⟨git diff --check⟩ → (clean)
⟨git rev-parse kf-sacred-snapshot-2026-09-17⟩  → 6d280ee7bec7793846b2e2e1d250e1ea0a21859a
⟨git rev-parse kf-sacred-snapshot-2026-09-17^⟩ → 8281638c0ac4ac8c54a67a018ca5bf6a9117174f
```

Every figure double-run; both runs agreed. The open tree no longer exists, so both open enumerations
were **re-derived from the snapshot commit** — declared at every use, never assumed silently.

#### Act 2 — the 1-ahead commit dispositioned, and BOTH enumerations re-derived

**1-ahead → COMMITTED to `6d280ee7`.** ⟨`git merge-base --is-ancestor 8281638c kf-sacred-snapshot-2026-09-17; echo $?`⟩ → **0**;
⟨`git merge-base --is-ancestor kf-sacred-snapshot-2026-09-17 origin/master; echo $?`⟩ → **1** (an
evidence ref, not on the frontier's history — stated, not glossed).

```
⟨git diff --name-status 8281638c kf-sacred-snapshot-2026-09-17 | wc -l⟩            → 226  (219 M · 7 D)
  + the 26 untracked rows banked at artefacts/W0/substrate-open.txt                = 252  ✔
⟨git diff --name-only origin/master kf-sacred-snapshot-2026-09-17 | sort -u | wc -l⟩ → 325 ✔
⟨comm -13 <status-252> <frontier-325> | wc -l⟩ → 225   ← frontier-diff files NOT in the status set
⟨comm -23 <status-252> <frontier-325> | wc -l⟩ → 152   ← status rows NOT in the frontier diff
⟨comm -12 <status-252> <frontier-325> | wc -l⟩ → 100   ← the overlap
252 = 152 + 100 ✔      325 = 225 + 100 ✔      (the two surfaces do NOT nest)
```

**`325 − 252 = 73` is used nowhere.** Both enumerations are dispositioned member-by-member — A at the
record's §4, B at §5, the overlap at §6 — so all **477** distinct members resolve to a named
disposition. Classification predicate for B and the overlap, stated so it reproduces: presence in
⟨`git ls-tree -r --name-only origin/master`⟩ × presence in ⟨`git ls-tree -r --name-only kf-sacred-snapshot-2026-09-17`⟩.

```
enumeration B (225) = 196 CREATED + 24 UPDATED + 5 REMOVED                    ✔ sums to 225
the overlap  (100) =  20 CREATED + 62 UPDATED + 18 REMOVED                    ✔ sums to 100
enumeration A (252) = 226 tracked COMMITTED + 26 untracked rows → 124 files
                    = 6 KEPT + 118 DISCARDED at the file altitude             ✔ 6 + 118 = 124
```

#### Act 3 — OP-1's routed clause re-cut: the 118 are **DISCARDED**, not "kept (untracked)"

A per-row probe over all 26 untracked rows (`PRESENT at origin/master` is the predicate that decides
the row) turns OP-1's aggregate finding into an addressable table (record §4.2): **20 named file rows
PRESENT → DISCARDED · 4 named file rows ABSENT → KEPT · `docs/tranches/V/` → 97 DISCARDED + 2 KEPT ·
`test/demo/reference-data/` → 1 DISCARDED.** The two V survivors are **value.js's own outbound mail**,
byte- and mtime-intact.

**The absorption figure derived twice, independently, agreeing at 118** — and neither number carried
from the other:

```
untracked before − after                       : 124 − 6                        = 118
index-class × disk-presence crossing (§5.4)    : 98 (enum B CREATED) + 20 (overlap CREATED) = 118
```

**Limit declared rather than papered over**: the COUNT of absorbed V docs is known (99 − 2 = 97);
their MEMBERSHIP is not — git unlinked and recreated all 175 frontier V paths. The record states the
count and declines to name the members.

#### Act 4 — the flat `emit` triad's REMOVAL stated by path; LAW-A Census 1 re-run at the settled tree

```
⟨ls src/animation/compile/emit/backward.ts | backward-walk.ts | backward-color.ts⟩ → ABSENT ×3
⟨ls src/animation/compile/emit/⟩ → backward/ · format/ (MODULES) + 7 flat siblings
⟨git grep -nE 'backward-(walk|color)' -- src/ demo/ test/ scripts/⟩ → 5 hits, ALL stale doc-COMMENTS
        (backward/backward.ts:158 · densify.ts:17 · densify.ts:70 · emit/index.ts:7 · emit/index.ts:8)
   → ZERO import specifiers traverse the flat spelling
⟨git grep -nF 'emit/backward' -- src/ demo/ test/ scripts/⟩ → 2 in-module docblocks + test/compile/value4-color-emit.test.ts:9
⟨git grep -nE '"\.{1,2}/backward' -- src/ demo/ test/ scripts/⟩ → 14 specifier sites (12 + 2 intra-module)
```

CONSUMER SET reproduces the census exactly: **3 frontier source files + 1 test**. A sharper limb this
seat measured and booked (labelled an inference about resolution order, not a measurement of it): the
12 non-intra-module specifiers read `"./backward"`, which now resolves to the **directory module**; a
surviving flat `backward.ts` would sit at the spelling standard file-over-directory resolution
prefers and would **shadow** the module at every one of those sites, silently. Only the full
`reset --hard` discharged it.

**A fourth orphan class found and booked as a residual (not cured — `src/**` is out of bounds)**: the
four KEPT untracked src files are flat-layout drafts of material the frontier ships in module dirs
(⟨`diff … | grep -c '^[<>]'`⟩ → 4 · 24 · 6 differing lines for three of them; `value-ast.ts` 400 L
corresponds to the `compile/value/` **module**, not to `ast.ts` 55 L — stated as it measures). No
frontier specifier can reach them; the reset could not remove them because their paths are absent
upstream.

#### Act 5 — C-15: the reconciliation **DIFFED, never assumed** (and sharpened)

Phantom-attr census at four coordinates, `demo/`-scoped:

| coordinate | `position="right"` | `mode="persistent"` |
|---|---|---|
| HEAD `8281638c` | **1** | 0 |
| snapshot `6d280ee7` (the disk as found) | 0 | **1** |
| `origin/master` `81a56990` | 0 | 0 |
| **the settled worktree** | **0** | **0** |

```
⟨git show 8281638c:…/EditorShell.vue | sed -n 16p⟩  → <HeaderRibbon ref="headerRibbonRef" position="right">
⟨git show kf-sacred-snapshot-2026-09-17:… | sed -n 16p⟩ → <HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">
⟨sed -n 16p …/EditorShell.vue⟩ (settled)            → <HeaderRibbon placement="right">
```

**C-15 sharpened, as a dated observation beside the banked cell (E-3 — nothing at the bank is
rewritten)**: the two phantom spellings are **disjoint by coordinate** — `position=` at HEAD only,
`mode=` on the disk only. The disk had already half-migrated `position=`→`placement=` while acquiring
a *second* phantom, which is precisely the carry-forward mechanism C-15 warns of. Neither survives.
The live `/header-ribbon` import stands at `:116` (one consumer, as LAW-A Census 2 derives) — C-3's
tripwire, `.b`'s gate, named here only so its survival is on the record.

#### Act 6 — FINDING: the remote has advanced past the pin (hazard, not defect)

```
⟨git ls-remote origin refs/heads/master⟩ → 55e9bf0d2391bbc6d9871bb3f0555a6225daae92   (double-run)
⟨git rev-parse origin/master⟩            → 81a56990736ced5b5edde0b84c527680ac7689b1   (local ref, unfetched)
resolved read-only at /Users/mkbabb/Programming/keyframes-v-exec:
⟨git log -1 --format='parent=%P' 55e9bf0d⟩ → parent=81a56990736ced5b5edde0b84c527680ac7689b1
⟨git show --name-only --format= 55e9bf0d⟩  → docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md
⟨… | grep -vc '^docs/'⟩                    → 0     (docs-only, +309 lines, one file)
```

It is **KF.W1's delivery**; the pin is its parent; it touches **zero** paths in this wave's gate
surface, so no reading above is disturbed. **The hazard**: a later `git fetch` in the sacred checkout
moves the *ref* `origin/master` to `55e9bf0d`, after which `git diff --name-only origin/master` no
longer measures the pin. Every anchor in the settle record names the **sha**, for that reason.
Handed to the orchestrator and to every later X·KF wave.

#### Act 7 — G-0.3 verified (never authored)

```
OPEN, re-derived: ⟨git diff origin/master kf-sacred-snapshot-2026-09-17 --stat -- <the four paths>⟩
    4 files changed, 6 insertions(+), 76 deletions(-)        ← reproduces the spec's RED baseline byte-for-byte
CLOSE:            ⟨git diff origin/master --stat -- <the .ts/.vue pair>⟩            → (EMPTY)
                  ⟨git diff origin/master --stat -- <the pair> package.json package-lock.json⟩ → (EMPTY)
```

**Emptiness is not the gate; the DIRECTION is** (the falsifier: master←disk also empties the diff
while destroying the cure). Settled by three readings: (1) **content** — `:96-98`
`setAnimationTimingFunction(timingFunction, css?)`, `:128` `timingFunctionLiteralFor`, `:170` the twin
**passed**, and `TimingFunctionPanel.vue` `:144` the bezier-drag write with `:148`'s
`{ fn, css: cubicBezierToString(...pts) }` — where the snapshot carries the one-arg `{ fn }` form at
both sites; (2) the frontier ref did not move (`origin/master` = the pin; `origin/master..HEAD` = 0);
(3) the disk's prior bytes live in `6d280ee7`, not upstream. **SUBJECT-IDENTITY holds at both §Bounds
rows.** Artefacts `ee02-diff-open.txt` / `ee02-diff-close.txt`.

#### Act 8 — G-0.4 run AFTER the migration landed

Sequencing lock honoured (`:681`). Coordinate pasted beside each output: **2026-09-17 · HEAD
`81a56990736ced5b5edde0b84c527680ac7689b1`**.

```
EE-01 ⟨sed -n 42p demo/components/CopyButton.vue⟩                                  →     timingFunction: "easeInBounce",
FE-3  ⟨sed -n 11p demo/…/keyframes/components/KeyframeCardList.vue⟩                →     :frame-start="startScalar(frames[i].start)"
EE-03 ⟨sed -n 97p demo/…/keyframes/composables/useKeyframesParsing.ts⟩             →     () => animation.templateFrames.length,
NEG-1 ⟨git grep -n 'bounceInEase' -- demo/ | wc -l⟩        → 0      [coordinate = THE SETTLED WORKTREE, not a ref]
NEG-2 ⟨git grep -n '\.start\.toString()' -- demo/ | wc -l⟩ → 0      [same]
```

N-3's guard observed (the bare `templateFrames.length` grep is not the witness). **EE-01's and FE-3's
files carried NO status row** (they sit in enumeration B's UPDATED class), so the status surface
could never have shown whether the dead name survived — only the probe on the settled tree can, and
it did. **Runtime tier NAMED, wiring verified, deliberately NOT run** under the spec's own division
(`:552`, the gate closes on the static tier) and probe parsimony: ⟨`git grep -ln 'console-budget' --
scripts/observe/`⟩ → `live-session.mjs` · `live-session-mobile.mjs` (exactly two) ·
⟨`git grep -c 'pageerror' -- scripts/observe/demo/smoke.mjs`⟩ → **0**, reproducing D-7 exactly.
FE-3's `/\[object Object\]/` assertion is **not** asserted here (keyframes.js's own tranche-V W1
born-RED gate; `test/**` is out of bounds — inventing it would be the vacuous evidence L-19 kills).
Artefact `oracle-ee01-fe3-ee03.txt`.

#### Act 9 — cadence

⟨`git diff --check`⟩ in keyframes.js → clean. Prettier run over the one `.md` this unit authored
(⟨`npx prettier --check`⟩ → *"All matched files use Prettier code style"*); **not** run over the
shared execution record or any sibling doc — ⟨`npx prettier --check` on `waves/KF-W0.md`,
`execution/B/KF-W0.md`, `COHESION.md`⟩ → all three `[warn]`, i.e. the lane's dated artifacts are not
prettier-formatted, and reformatting another seat's committed prose would be an E-3 rewrite and a
concurrent-edit hazard. The decision is recorded rather than taken silently.

#### E13 — mail, at this unit's scope

The only packet in `keyframes.js/docs/tranches/V/coordination/` dated after seat 0's sweep is
`VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` — **value.js's own outbound**, delivered by
KF.W1 (act 6), not inbound mail. The two untracked survivors are likewise value.js outbound and are
unharmed. **0 UNREAD in this unit's scope.** `INBOX.md` appends remain `.b`'s alone, once, at close.

#### Gates

| gate | BEFORE (seat-0 baseline) | AFTER (this unit) |
|---|---|---|
| **G-0.3** | **RED-AS-EXPECTED** — the four-path diff at `6 insertions(+) / 76 deletions(−)`; disk carries `{ fn }` at both EE-02 write sites | **GREEN** — empty diff for the `.ts`/`.vue` pair (and all four paths); the twin present at **both** write sites; direction proven **disk←master** by content, by the unmoved frontier ref, and by the snapshot holding the disk's prior bytes |
| **G-0.4** | **RED-AS-EXPECTED** — all three oracles red at the audited disk, green at the frontier | **GREEN** — 3 static + 2 negative probes on the **settled worktree**, date + `git rev-parse HEAD` beside each; runtime tier named and wiring-verified, not run (confirmation only, `:552`) |
| **G-0.1** *(OP-1's gate; the two clauses it routed here)* | the written disposition over BOTH enumerations, and C-15's non-carry-forward check, were outstanding | **DISCHARGED** — `comm -13`/`-23`/`-12` pasted (225/152/100); both enumerations dispositioned member-by-member; the flat triad's removal stated by path; C-15 diffed at four coordinates, not assumed |

No other gate was touched, cured or turned by this unit.

#### Commits

| sha | meaning |
|---|---|
| `388dbf1f64e5761c349350a2436ad86fa0fb0b4e` | `docs(kf-w0/settle)` — `SUBSTRATE-SETTLE-2026-09-17.md` (750 L) + `ee02-diff-open.txt` + `ee02-diff-close.txt` + `oracle-ee01-fe3-ee03.txt`; one commit, one meaning, the family not split |

`substrate-open.txt` / `substrate-close.txt` were **verified, not re-authored** — they are OP-1's
committed readings of a tree that no longer exists, and E-3 makes them immutable. Every figure in
them that this unit re-derived reproduced exactly.

#### Residuals

1. **The 118-file absorption is irreversible** (act 3) — re-cut in the record as DISCARDED. The
   pre-act probe that converts it from a finding into an owner question is booked at the record's
   §11.1; at this act it would have read **118**.
2. **The remote is one docs-only commit ahead of the pin** (act 6) — benign now, a live hazard for
   any later seat that fetches in the sacred checkout. Anchors must name the sha.
3. **The snapshot ref `kf-sacred-snapshot-2026-09-17` is local-only and not an ancestor of the
   frontier** — every "COMMITTED" disposition in the record cites it, so 226 tracked rows and 23
   removed files lose their receipt if it is deleted. Push is the orchestrator's call, not this
   unit's (carried forward from OP-1's residual 3, now load-bearing for a written record).
4. **Four orphaned flat-layout src drafts survive on disk** (act 4) — unreachable by any frontier
   specifier; `src/**` is out of bounds for this wave, so the record states the finding and cures
   nothing. Belongs to a wave whose §Bounds carries `src/**`.
5. **FE-3's PARTIAL-cure residue is explicitly not G-0.4's** (fraction-for-percent, named-selector
   fallthrough, `selectorText` uncalled at both seams) — KFED-UNIT's, after KF.W4. Named so a later
   seat does not read G-0.4 GREEN as FE-3 fully cured.
6. **No escalation fired**: none of the five §Triumvirate Dispatch triggers is met — the reset was
   OP-1's ruled hand, not this seat's; no write under `keyframes.js/{src,demo,test,scripts}/**`
   (this unit wrote **zero** bytes there); no producer-repo write; no blanket per-repo re-anchor (the
   record's dispositions are per-file, C-21); no manifest mismatch surfaced at this unit's readings;
   no second diagnostic iteration on either gate — both turned on their first run.

---

### KF.W0.b

**SERVED MODEL: claude-opus-5[1m]** · **Date**: 2026-09-17 · **Substrate**:
`/Users/mkbabb/Programming/keyframes.js` at `master` == `origin/master` == `81a56990` (**settled** by
OP-1), producer `/Users/mkbabb/Programming/glass-ui` at HEAD `887a0db9` **read/hash only** ·
**Charge**: spec §Agent Units `:671` · §Gates **G-0.2** `:510-524` + **G-0.5** `:574-587` · §Scope 2
`:306` · §Carry **C-1** `:361` · **C-3** `:363` · **C-16** `:376` · §LAW-A CENSUSES **Census 2**
`:134-152` · §Sequencing, the glass-ui **OUTBOUND HOLD + FYI** row `:688` · §Bounds, the `INBOX.md`
row `:344`. Ran after OP-1, concurrent with `.c` (disjoint paths — no shared `modify` path;
`INBOX.md` is `.b`'s alone, once, at close).

*Ordering note, declared rather than corrected*: this receipt sits **below** `### KF.W0.c` because
`.c` finished first and this record is **append-only** — *"nothing above this line is rewritten, per
E-3."* Re-ordering the two blocks would be a rewrite of a sibling's dated evidence, so the file keeps
**write order**, not unit order, and says so here. `.b ∥ .c` were concurrent by design (spec
§Sequencing `:681`), so no order between them is load-bearing.

**Writable set honoured exactly** — four paths, no fifth: `X/keyframes/W0/MANIFEST-RULING.md` ·
`V/coordination/INBOX.md` · `X/keyframes/artefacts/W0/manifest-four-coordinates.txt` ·
`.../headerribbon-tripwire.txt` (plus this receipt, by instruction). **No product byte moved by this
unit**, in either repository: keyframes.js re-verified at close against OP-1's own close reading —
⟨`git status --short \| wc -l`⟩ → **6**, all untracked, **0 tracked**; ⟨`git diff --name-only
origin/master \| wc -l`⟩ → **0**; ⟨`git rev-parse HEAD`⟩ → `81a56990…`; ⟨`git diff --check`⟩ → clean;
⟨`git status --short -- package.json package-lock.json .npmrc`⟩ → **empty**.

#### Act 1 — G-0.2's four coordinates, re-measured on the settled tree (double-run)

Both runs agreed on every byte. Full paste banked at
`docs/tranches/X/keyframes/artefacts/W0/manifest-four-coordinates.txt`.

```
⟨git show HEAD:package.json          | grep -n glass-ui⟩ → 77:        "@mkbabb/glass-ui": "7.0.0",
⟨git show origin/master:package.json | grep -n glass-ui⟩ → 77:        "@mkbabb/glass-ui": "7.0.0",
⟨grep -n glass-ui package.json⟩                          → 77:        "@mkbabb/glass-ui": "7.0.0",
⟨node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"⟩ → 7.0.0
⟨grep -c glass-ui package-lock.json⟩ → 3   ⟨HEAD⟩ → 3   ⟨origin/master⟩ → 3
⟨grep -n glass-ui package-lock.json⟩ → :19 (root devDeps mirror) · :612 (installed node) · :614 (resolved)
⟨sed -n '613,617p' package-lock.json⟩ → "version": "7.0.0" · resolved · "integrity": "sha512-iK2DaPNb…" ·
                                        "dev": true · "license": "MIT"
```

**One reading this seat added, because a grep proves the string and never the section — and the RED
baseline's defect was a SECTION as much as a version** (HEAD's `:71` sat under `optionalDependencies`):

```
⟨node -e "const p=require('./package.json'); …"⟩
    devDependencies['@mkbabb/glass-ui'] = "7.0.0"      ← EXACT (no ^, no ~, no range)
    dependencies / optionalDependencies / peerDependencies → undefined
⟨grep -c optionalDependencies package.json⟩ → 0        ← the whole SECTION is gone at the frontier
```

Consequence, booked as nothing and stated so it is not re-filed: the `npm ci --omit=optional` failure
**shape** (kf-CubeAxisLines β-miss-1) is killed **by substrate**, not by version. §Excluded carries it
as narrative; this receipt leaves it there.

| coordinate | BEFORE (spec RED baseline; reproduced by seat 0) | AFTER (this seat) |
|---|---|---|
| `HEAD` | `:71 "6.0.0"` under **optionalDependencies** | `:77 "7.0.0"` devDependencies, EXACT |
| `origin/master` | `:77 "7.0.0"` devDependencies, EXACT | `:77 "7.0.0"` devDependencies, EXACT |
| worktree | **row DELETED** from `package.json` *and* lock | `:77 "7.0.0"` devDependencies, EXACT |
| installed | `7.0.0` | `7.0.0` |
| | four coordinates · **THREE states** | four coordinates · **ONE state** |

#### Act 2 — RULING 1: the worktree deletion (the spec's first named ruling)

**DISCARDED AND SUPERSEDED — preserved by commit on a DISQUALIFIED ref, never re-raised.** Landed at
`MANIFEST-RULING.md` §2 with three measured limbs. The limb the wave turns on:

```
⟨git rev-parse kf-sacred-snapshot-2026-09-17⟩                      → 6d280ee7bec7793846b2e2e1d250e1ea0a21859a
⟨git show kf-sacred-snapshot-2026-09-17:package.json      | grep -c glass-ui⟩            → 0
⟨git show kf-sacred-snapshot-2026-09-17:package-lock.json | grep -c glass-ui⟩            → 0
⟨git show kf-sacred-snapshot-2026-09-17:package.json      | grep -c optionalDependencies⟩ → 0
⟨git diff --stat 8281638c kf-sacred-snapshot-2026-09-17 -- package.json package-lock.json⟩
      → 2 files changed, 9 insertions(+), 81 deletions(-)
```

**The falsifier is read at its own words and is NOT tripped, and the distinction is stated rather than
assumed.** G-0.2's falsifier convicts *"committing the worktree deletion **as-is**"*. OP-1 **did**
commit it — to `kf-sacred-snapshot-2026-09-17`, a **preservation ref**, never to `master`. A naive
reading convicts that act; it does not hold, because **the manifest coordinate is the execution
substrate** (COHESION §0j.C **KF-WRITE**: `master` == `origin/master`), and `8281638c` plus every ref
descending from it is **DISQUALIFIED as a manifest coordinate**. *Committed to a disqualified
preservation ref* and *committed as-is to the substrate* are different acts; only the second revives
census F-1, and only the first happened. The ruling makes the snapshot ref **citable only as
provenance** — which is what keeps the act reversible without re-opening F-1.

#### Act 3 — RULING 2: `legacy-peer-deps=true` vs the two genuinely-absent peers

The spec's own words: *"either is a ruling; silence is not."* This seat refused to pick a side by
reading and **measured the predicate instead**.

```
installed 7.0.0 peer map, each entry resolved in-tree (10 peers; counting rule at the table):
    REQUIRED  @lucide/vue 1.17.0 ✔ · reka-ui 2.9.9 ✔ · tailwindcss 4.3.0 ✔ · vue 3.5.35 ✔   (4 of 4 SATISFIED)
    optional  @mkbabb/pencil-boil  → ABSENT      ← C-16's first "genuinely absent" peer
    optional  embla-carousel-vue   → ABSENT      ← C-16's second
    optional  @mkbabb/keyframes.js → ABSENT (self-peer) · @mkbabb/value.js 4.0.0 · @vueuse/core 14.3.0 · tw-animate-css 1.4.0
THE PROBE (dry run; writes nothing) — BOTH arms, because a lock built under legacy mode could encode
a tree strict mode rejects, and checking only the lock-faithful arm leaves exactly that hole:
    ⟨npm ci      --dry-run --no-legacy-peer-deps --ignore-scripts⟩ → exit 0, exit 0
    ⟨npm install --dry-run --no-legacy-peer-deps --ignore-scripts⟩ → exit 0, exit 0
    ⟨grep -ci 'ERESOLVE|could not resolve|conflicting peer' <all four runs>⟩ → 0 everywhere
CONTROL ⟨npm ci --dry-run --ignore-scripts⟩ (the flag ON, tree default) → exit 0; diff vs the strict
    run, timings elided → IDENTICAL.  The flag changes NOTHING at this coordinate.
⟨git status --short -- package.json package-lock.json .npmrc⟩ → empty   ← the probes wrote nothing
```

**RULING**: **C-16's premise is FALSIFIED at the bytes** — an optional peer is never demanded, so the
flag masks nothing; the absence is **DECLARED**; the flag is **RULED INERT and RETIRABLE**; and the
**retirement ACT is routed NO-WAVE-OWNER** because **`.npmrc` is named by no §Bounds row of this
wave** — deleting the line here would be the file-bound expansion the §Triumvirate Dispatch calls
wave-invalidating, and a ruling that invalidates its own wave is not a cure. The routed act carries
its exact form, its precondition (**re-run both arms at the coordinate of the act** — inertness is a
property of the *installed* peer map) and its falsifier (any nonzero exit or `ERESOLVE` means the flag
*is* load-bearing and the deletion is refused, not worked around). **Its expiry is §4's HOLD**: both
depend on the installed producer not advancing, so whoever lifts one re-measures the other.

#### Act 4 — G-0.5: the tripwire DECLARED, and the HOLD carried into the ruling

Banked at `artefacts/W0/headerribbon-tripwire.txt`. **LAW A Census 2, executed on the settled tree** —
the gate's own rule is that a GREEN re-derived from anything but the import graph is RED:

```
(1) SPECIFIER ⟨git grep -nF 'glass-ui/header-ribbon' origin/master -- .⟩
        → EditorShell.vue:116  ← the ONE live import
        → docs/tranches/H/audit/a-glass-ui-consumption.md:48 · docs/tranches/V/audit/R1-15-cross-repo.md:54
          (docs PROSE — non-import context, recorded, NEVER counted)
      ⟨git grep -n 'header-ribbon' origin/master -- src/ demo/ test/ scripts/⟩ → 1 hit, the same :116
      ⟨grep -rnF 'glass-ui/header-ribbon' src demo test scripts⟩ (WORKTREE) → the same one file
(2) SYMBOL   ⟨git grep -n '\bHeaderRibbon\b' origin/master -- demo/ test/ src/ scripts/⟩
        → :16 <HeaderRibbon placement="right">  ·  :50 </HeaderRibbon>  ·  :116 the import
        → resolved: all three the SAME file through the SAME specifier; no sibling-basename consumer
(3) CONSUMER SET = { demo/components/instrument/shell/EditorShell.vue } — EXACTLY ONE, tests included
PRODUCER ⟨git -C ../glass-ui ls-tree --name-only HEAD src/components/header-ribbon/⟩ → (empty)
         ⟨… '4bf53962^' …⟩ → 5 files   ⟨log -1 4bf53962⟩ → 2026-08-04 "feat(reduction): land BK #18 W-DELETE…"
         ⟨git -C ../glass-ui merge-base --is-ancestor 4bf53962 HEAD⟩ → YES   ← the delete is ANCESTRAL
         ⟨grep -c header-ribbon ../glass-ui/package.json⟩ → 0
INSTALLED ⟨ls -la node_modules/@mkbabb/glass-ui/dist/header-ribbon.js⟩ → present, 2420 B (7.0.0, cut 2026-07-16)
```

**Seat 0's R.2 GREEN-BEFORE-CURE finding is UPHELD and discharged by declaration, not by a state
change.** Disjunct (a) holds (installed 7.0.0 ≤ `4bf53962`); disjunct (b) does not (the import
stands). This unit changed no state and skipped no cure: it banked the census and carried the
**HOLD** into `MANIFEST-RULING.md` §4 — *installed glass-ui may not advance past `4bf53962` while
`origin/master:EditorShell.vue:116` imports `/header-ribbon`* — so that **G-0.5 BOUNDS G-0.2** and the
one remediation that passes G-0.2 while destroying the build is refused **by name**.

**C-15's rider discharged by measuring the reconciliation instead of assuming it**: ⟨`sed -n '16p'`⟩ →
`<HeaderRibbon placement="right">`; ⟨`grep -n 'mode="persistent"\|position="right"'`⟩ → **no hit**.
HEAD's `position="right"` — also not a 7.0.0 prop — did **not** carry forward.

#### Act 5 — E13: the three relay packets (`.b` alone, once, at close)

Appended to `docs/tranches/V/coordination/INBOX.md`, **strictly append-only** ⟨`git diff --numstat`⟩ →
**12 insertions · 0 deletions**; ⟨`git diff -U0 | grep -c '^-[^-]'`⟩ → **0**. **KF-APP-59** (unmet
peers = a closed falsifier, with the packument/tarball divergence as the producer question) ·
**EH-1** (the two repo-qualified letters named, with the shipped `d.ts` refuting the archived letter
in part, and `consumer-evidence/header-ribbon.md:3` still claiming *"RETAINED persistent-only"*
against producer HEAD) · **KF-APP-5** (producer half **MOOT**, answered by deletion; the **HOLD**
declared from this end). **No `O-n` id minted** — `O-21` is KF.W1's and was rowed at this same sitting
(COHESION §0j.C **KF-WRITE**); every packet keyed by its **banked** id, anti-rename honoured.

**Close sweep**: (1) V + V/coordination 19 + 17, `INBOX.md` self-excluded · (2) glass **BK** re-confirmed
newest ⟨`ls -dlt ../glass-ui/docs/tranches/B*/`⟩ → BK@Sep 17 > BJ@Aug 3 > BI@Jul 28 > BH@Jul 15; newest
file = **I-30, rowed** · (3) `../keyframes.js/.../coordination/` — ⟨`find … -newermt '2026-09-17 00:00'`⟩
returns **10 files, every one a 2026-09-17 BIRTHTIME with a July CONTENT date**: the reset's recreated V
docs (OP-1's FINDING), **not mail** · (4) `../keyframes-v-exec/.../coordination/` — newest is **our own
O-21** · (5) atlas 28, newest ours. **0 unrowed · 0 new `I-n` · I-30 remains the tail · 0 UNREAD in
scope.**

#### Gates

| gate | BEFORE | AFTER |
|---|---|---|
| **G-0.2** — manifest single-state | **RED-AS-EXPECTED** — four coordinates, three states (HEAD `6.0.0` optionalDeps · master `7.0.0` exact devDep · worktree DELETED from both manifests · installed `7.0.0`); `.npmrc` unruled | **GREEN** — `HEAD == origin/master == worktree == installed` at `"@mkbabb/glass-ui": "7.0.0"` **exact devDep** + lock (`:19` · `:612` integrity · `dev:true`), **AND both written rulings landed** (`MANIFEST-RULING.md` §2 the deletion · §3 `legacy-peer-deps`). The version half was reconciled **by the reset**; the ruling half is this unit's, and it is the half the gate's falsifier exists to catch. |
| **G-0.5** — header-ribbon tripwire (negative) | **RED-AS-EXPECTED as a tripwire; GREEN-BEFORE-CURE on stated disjunct (a)** (seat 0, R.2) — the HOLD was **undeclared** | **GREEN by disjunct (a), tripwire DECLARED** — consumer set re-derived from the **import graph** at **exactly one**, `headerribbon-tripwire.txt` banked, the **HOLD** carried into the ruling so **G-0.5 BOUNDS G-0.2**. No state changed; no `demo/**` or producer byte touched. |

No other gate was touched, cured or turned by this unit. G-0.1's clauses stay OP-1's and `.c`'s;
G-0.3/G-0.4 are `.c`'s; G-0.6 `.d`'s; G-0.7..G-0.10 `.e`'s.

**Banked, self-counted at the settled bytes** (⟨`wc -l`⟩, run after the writes): `MANIFEST-RULING.md`
**356 L** · `artefacts/W0/manifest-four-coordinates.txt` **132 L** · `artefacts/W0/headerribbon-tripwire.txt`
**109 L** — 597 lines, matching the commit's own `3 files changed, 597 insertions(+)`.

#### Commits

| sha | meaning |
|---|---|
| `301102692eb1f2daa08a2ea29c781c4ab6bebd39` | `docs(kf-w0/manifest)` — the ruling + the two artefacts (one meaning: the ruling and the readings it rules on do not split) |
| `ac5cc99cb481ccf6e1fc45fc18069dabffbaed85` | `docs(kf-w0/manifest)` — E13: the three relay packets + the close sweep (a second meaning: delivery, not ruling) |

Pathspec only; `scripts/dev/dev.sh` never staged (⟨`git log -1 --stat`⟩ on both commits names only the
four writable paths). §Cadence's `git diff --check` ran clean at the unit boundary, staged.

#### Residuals

1. **`.npmrc`'s retirement** — ruled INERT-and-retirable, act **routed NO-WAVE-OWNER** (`.npmrc` is
   named by no §Bounds row). Expires with the G-0.5 HOLD; both re-measured together.
2. **glass-ui 7.0.0 packument ≠ tarball** by one peer entry (bare `embla-carousel` in the lock's
   recorded map, absent from the shipped `package.json`). **Producer-owned**; relayed as part of
   KF-APP-59. Nothing in this tree changes for it. It is **C-13's class inside this wave's own
   manifest surface** — a version string agreeing while the artifacts disagree.
3. **`@mkbabb/parse-that@1.0.0` is EXTRANEOUS in `node_modules`** — absent from `package.json`
   (⟨`grep -n parse-that package.json`⟩ → no hit) and from the lock (⟨`grep -c`⟩ → 0), and neither a
   dependency nor a peer of glass-ui. All four dry-runs report `remove @mkbabb/parse-that 1.0.0`. An
   **install-state residue, not a manifest coordinate** — outside G-0.2's four, needs no act, named so
   no later seat files it as a manifest defect.
4. **The COHESION §4a (SS-6 accretion register) mirror is OWED, not written** — `COHESION.md` is
   outside this unit's writable set. The packets are durable at `INBOX.md` (the E13 ledger of record
   and the site §Bounds names); the §4a mirror is routed to the orchestrator.
5. **Prettier, declared rather than silently skipped.** §Cadence says *"Prettier over touched `.md`"*.
   Run on this unit's own new doc — ⟨`npx prettier --check .../MANIFEST-RULING.md`⟩ → *"All matched
   files use Prettier code style!"*. **NOT run on `INBOX.md` or on this record**: both are shared,
   concurrently-written files, prettier would **rewrite them whole** (E-3 forbids rewriting other
   seats' dated evidence, and this record is appended, never rewritten). Measured context, so the next
   seat is not surprised: ⟨`prettier --check`⟩ reports **DIRTY** for
   `execution/B/KF-W0.md`, `keyframes/waves/KF-W0.md` and `COHESION.md` alike — the lane's corpus is
   not prettier-formatted, and a lane-wide run is neither this unit's act nor, on immutable dated
   files, a lawful one.
6. **No escalation fired.** None of the five §Triumvirate Dispatch triggers is met: no reset by this
   seat; no write under `keyframes.js/{src,demo,test,scripts}/**` (this unit wrote **zero** bytes in
   either the consumer or the producer tree); no producer-repo write; no blanket re-anchor; **no
   MANIFEST MISMATCH** (the four coordinates agree — §1); no second, let alone third, diagnostic
   iteration on either gate. The specified cure was possible at the bytes and was performed as
   specified; nothing was substituted.

**E-3 ADDENDUM-BESIDE — 2026-09-17, amending nothing above it.** This unit's third commit
(`257fa20a`, the receipt commit) states in its own body *"append-only: **231** insertions, 0
deletions."* **The measured figure is 229**, not 231: ⟨`git diff --numstat
docs/tranches/X/execution/B/KF-W0.md`⟩, run immediately before staging → `229  0`; ⟨`git diff -U0 …
\| grep -c '^-[^-]'`⟩ → **0** (the append-only half reproduces exactly). The 231 was written from the
receipt file's own length **before** the six-line ordering note above was inserted, i.e. a figure
carried forward by arithmetic instead of re-read at the settled bytes — **this wave's own §Carry
law** (*"the denominator is re-counted at the bytes, never carried forward by arithmetic"*) convicting
its own receipt, in the seat that quotes it. **The message is NOT amended** — the correction rides
beside it, as OP-1's own `252`-vs-`226` addendum rides beside COHESION §0j.C's ruled wording.
Declared rather than absorbed; **no gate reading, ruling, artefact figure or commit content depends on
it** — the three insertion counts that are load-bearing (`3 files changed, 597 insertions(+)` ·
`12 insertions, 0 deletions` · the per-file `wc -l` triple 356/132/109) were each re-read at the bytes
and reproduce.
