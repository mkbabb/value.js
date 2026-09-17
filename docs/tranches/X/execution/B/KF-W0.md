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

### KF.W0.d

**SERVED MODEL: claude-opus-5[1m]** · **Date**: 2026-09-17 · **Substrate**:
`/Users/mkbabb/Programming/keyframes.js` at the SETTLED coordinate — ⟨`date "+%Y-%m-%d"`⟩ →
**2026-09-17**, ⟨`git rev-parse HEAD`⟩ → **`81a56990736ced5b5edde0b84c527680ac7689b1`** =
⟨`git rev-parse origin/master`⟩, branch `master`, ⟨`git status --short | wc -l`⟩ → **6** ·
**Charge**: spec §Agent Units `:675` · §Gates G-0.6 `:589-605` · §Scope 5, 6, 7 (`:309`–`:311`) ·
§Carry C-8 `:368` · C-9 `:369` · C-10 `:370` · C-11 `:371` · C-17 `:377` · **C-17.R `:457-482`** ·
§Sequencing KF.W5 `:691` + KF.W10 `:695` · §Excluded X-4 / SCH-7 / SCH-2 (`:707`–`:709`) · **`OP-4`**
⟨§Carry `:455`⟩ · COHESION §0j.C **KF-OGKF1** (185 adopted). Ran **after OP-1**, concurrent with `.e`
(§Disjointness: `.d` owns `COUNTS-*` + `CENSUS` + both lane files; `.e` owns `GATE-ROSTER` /
`REF-OF-RECORD` / `V8-DISPOSITION` / the 58 records / `INTAKE-ADJUDICATION` / `lane-docs`; **no
shared modify path** — verified at staging: the five paths this unit committed are disjoint from
`.e`'s untracked `GATE-ROSTER.md` / `gate-roster.txt` / `glass-citation-rederivation.txt`).

**This unit moved no byte in `keyframes.js` and none in any producer tree.** Every probe is `git` /
`grep` / `sed` / `wc` / `node -p` / `find`, read-only; `node_modules/@mkbabb/glass-ui/**` was read
only. **No install, no build, no `depcruise`, no dev server, no fetch.** Every published figure was
**double-run**; both runs agreed on every count.

#### Act 1 — measure before you write (read-only, double-run)

```
⟨git rev-parse HEAD⟩ = ⟨git rev-parse origin/master⟩ → 81a56990736ced5b5edde0b84c527680ac7689b1
⟨git rev-parse --abbrev-ref HEAD⟩ → master        ⟨git status --short | wc -l⟩ → 6
run1/run2:  SCH-3=153  SCH-6=58  X-2=185  glass-lines=83  glass-files=43  glass-.vue=37   (identical)
```

#### Act 2 — SCH-1..SCH-7 + X-2, command + literal output + date (§Scope 5)

Banked whole at `docs/tranches/X/keyframes/artefacts/W0/counts-2026-09-17.txt` (**412** L,
self-counted at the settled bytes) and written up at `W0/COUNTS-2026-09-17.md` §1 (**434** L).

| row | reading of record, 2026-09-17 @ `origin/master` | note |
|---|---|---|
| SCH-1 | `package.json:77` `"@mkbabb/glass-ui": "7.0.0"` EXACT devDep · lock **3** | count-claim only; **the ruling is `.b`'s** and is not restated |
| SCH-2 | 4 files; `124 + 93 = 217` | **re-verified, NOT re-booked** (§Excluded). The banked 217 reproduced **by its operands** |
| SCH-3 | **153** `.ts` · **22 778** LOC, basis stated with the count | **X-4 NOT reconciled — KF.W5's** |
| SCH-4 | **62 / 16 / 40 modules** — see Act 3 | MEASURE-AT-OPEN, discharged |
| SCH-5 | 4 banked paths ABSENT · **all 13 Tier-A sites alive**, 9 at their banked line | re-anchor table in both the counts doc and `lane-library.md` |
| SCH-6 | **58** | holds |
| SCH-7 | L-1 + L-2 witnesses reproduce statically; **`depcruise` NOT run** | restated *unverified-at-HEAD*, as ruled |
| X-2 | **185** | adopted per §0j.C KF-OGKF1; 184 was the stale-worktree figure both censuses agreed on |

#### Act 3 — SCH-4 discharged: the predicate FIRST, then both readings (the seat-0 route-in)

Seat 0 banked SCH-4 as *"does not reproduce at any spelling this seat can state"* over three
readings. **All three reproduce here** — and they are the wrong scope: **SCH-4 is a LIBRARY-lane row
and the library lane censused `src/`.** The predicate was read off the lane file, never inherited:
⟨`lane-library.md:26`⟩ *"`grep -rn 'from "@mkbabb/value.js' src/ | wc -l` → 61"*, re-expressed
**ref-resolved** because a `grep -r` over a working tree names no coordinate.

```
⟨git grep -h 'from "@mkbabb/value.js'       origin/master -- src | wc -l⟩ →  62   [bank 61]
⟨git grep -h 'from "@mkbabb/value.js/value' origin/master -- src | wc -l⟩ →  16   [bank 15]
⟨git grep -l 'from "@mkbabb/value.js'       origin/master -- src | wc -l⟩ →  40   [bank 39]
same predicate elsewhere:  8281638c → 81 · /value 0      kf-sacred-snapshot-2026-09-17 → 48 · /value 10
seat-0's three scopes, reproduced:  src demo test scripts → 148 / 30      repo-wide → 207
per-subpath at the frontier: /css 29 · /value 16 · /color 7 · /math 5 · /easing 3 · /transform 2 = 62
bank's table:                /css 29 · /value 15 · /color 7 · /math 5 · /easing 3 · /transform 2 = 61
```

**DOCS's 62/16 reproduces byte-for-byte; LIB's 61/15 reproduces at NO committed coordinate; the whole
delta is one `/value` line.** The sharpest reading is stated rather than buried: **`/value` = 0 at the
stale pin** — the subpath spelling did not exist in `src/` at `8281638c`, so the two lanes were not
counting the same object, which is §0's schism in one subpath. Seat 0's sentence is **corrected beside
it, never rewritten** (E-3).

#### Act 4 — C-9's cascade-coupled column, landed FIRST (the hard order, observable)

**Write order, stated because the lock is an order lock**: the column landed in
`CENSUS-2026-08-03.md` §(ii) **before** the F-1 row disposition was written into `lane-frontend.md`
§B — so *"F-1's remediation scopes its regression surface"* against a surface that counts cascade
coupling, and against **C-1.F's full thirteen**, never six.

```
import census re-run:  83 mention lines [82] · 43 files [42] · 37 .vue [37] → 21 .vue with NO import [21]
PREDICATE (stated): a zero-import .vue is cascade-coupled if its bytes carry any of
  text-mono-caption · text-caption · text-muted-foreground · border-border ·
  --radius-pill · z-controls · --muted-foreground · --border
  — each DEFINED ZERO TIMES in the demo (⟨git grep -c '<tok>:' origin/master -- demo⟩ → 0 for all)
→ 10 of the 21 are CASCADE-COUPLED.   WIDENED by text-foreground (also vendor-bridged) → 11 (+CopyButton.vue)
definers, both sides measured: @utility text-mono-caption ⟨dist/styles/typography/utilities.css⟩ ·
  --radius-pill: 9999px ⟨dist/styles/theme/radius.css⟩ vs 5 demo USES / 0 definitions ·
  --z-index-controls: var(--z-controls) ⟨dist/styles/theme/bridges.css, @theme inline⟩ — GENERATED ·
  --z-controls itself ⟨dist/styles/tokens/scheme-motion.css⟩
chain by path: demo/styles/style.css:3 → exports["./styles"] = dist/styles/index.css
               → ./theme.css / ./typography.css / ./accessibility.css → utilities/a11y-overrides.css
```

**Both readings are published and the roster is declared a FLOOR** — a predicate is a choice, and a
choice unstated is a choice unreproducible. The token-namespace probe half stays **KF.W6's**.

#### Act 5 — C-10 + C-11 in ONE motion, at the roster's real home (D-4)

All in `lane-frontend.md` §C, one appended motion: **§6.5's roster · §9's tally row · both z-index
cells**. `CENSUS-2026-08-03.md` received **the pointer-cell correction only**.

- **All 13 PRM sites reproduce at their banked `file:line`, byte-for-byte.** The roster's *sites* are
  right; its **denominator and its meaning** are not: **13 sites · 13 PATHS · 12 COMPONENTS** — "12
  files" is reachable only by counting `scenes/easing/EasingTarget` once across its `.css` block
  (`:48`) and its `.vue` query (`:234`). The unit is now named instead of inferred.
- **A roster of local guards is not a coverage roster** (KF-AX-32). The floor is the vendor's
  universal rule, at the installed bytes: `dist/styles/utilities/a11y-overrides.css`, **byte 0,
  unlayered**, `@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { … !important } }`.
- **Both "Gaps" rows HOLD** — `TypingDots.vue:121` and `KeyframeTimeline.vue:94` are correct
  delegations; *"unverified statically"* is discharged. **And `KeyframeTimeline.vue:94` cites the
  WRONG VENDOR FILE**, with the reason measured rather than asserted: `dist/styles/transitions.css`
  exists and carries a PRM block, but that block is **class-scoped** (`.fade-*` / `.tab-fade-*` /
  `.pane-swap-*` / `.metric-swap-*`) and covers none of the timeline's motion. **Correct conclusion,
  wrong file** — C-13's own class, caught inside the row that discharges the gap.
- **Both z cells corrected** (`lane-frontend.md:253` and `:442`): ⟨`git grep -n 'z-index' origin/master
  -- demo/scenes/cube/CubeAxisLines.vue`⟩ → **`:67 z-index: var(--z-behind);`** — a TOKEN. The only
  `z-index: -10` string left in `demo/` is **prose** at `styles/style.css:38`; ⟨`git grep -n 'z-\[[-0-9]'`⟩
  → **no hits**. **The z-contract has ZERO raw-value exceptions at the frontier.** The prose recut is
  KF.W6's; the dead-gate citation inside that same comment is `.e`'s roster, untouched here.
- **`:194`'s `EditorHeader.vue` row**: 108 L and class `G` hold; **liveness does not** —
  barrel-exported at `shell/index.ts:2`, styled for at `layout.css:15`, and ⟨`git grep -n
  '<EditorHeader' origin/master -- demo`⟩ → **no instantiation site anywhere**. That is the condition
  the shadow census omitted and the mint now books as **S-10**.

#### Act 6 — C-17: the mint, ONE motion, the whole C-17.R roster (§Scope 6)

**The id-space rule was measured and stated BEFORE the first assignment**, because *"fresh
non-colliding"* had to be given a meaning the bytes support:

```
⟨grep -o 'S-<n>' kf-*.md⟩ over the 58 records:
  S-9 raw=127/31rec · S-10 raw=40/15 · S-11 19/7 · S-12 17/4 · S-13 782/58(!) · S-14 6/3 · S-15 5/3
  S-16 18/5 · S-17 8/4 · S-18 13/5 · S-19 6/3 · S-20 48/30 · S-21 6/3 · S-22 15/5
→ NOT ONE bare S-n spelling is free as a substring (S-13 reaches all 58 through SS-13), so
  non-colliding cannot mean substring-free and no numbering could make it so.
⟨grep -c '^### S-' lane-frontend.md⟩ → 8   ⟨grep -oE '\bS-[0-9]+\b' lane-frontend.md | sort -u⟩ → S-1..S-8
⟨the same over CENSUS-2026-08-03.md⟩ → S-1..S-8
→ RULE: a slot's full spelling is `lane-frontend.md §5 S-n`; S-9..S-20 are free in the ONLY
  namespace where a slot id resolves. A bare S-n elsewhere is a claim token, another record's
  local roster index, or a substring — never a slot.
```

**Assigned in one motion: 12 slots `S-9 … S-20`, each citing its originating record** — S-9 C-M-1
⟨kf-SpringHeatmap⟩ · S-10 F1≡KF-APP-41 ⟨kf-EditorHeader; the ask id-less at `:117`, stated as such⟩ ·
S-11 LP-8≡KF-CO-35+ME-18 ⟨the carry's head id⟩ · S-12 C-6 ⟨kf-AmigaScene, **owned by KF.W6**⟩ ·
S-13 KF-AV-28 ⟨kf-AnimationVisualizer, **carrying the standing supersession rider by name**⟩ ·
S-14 R-5 ⟨kf-CSSPasteDialog⟩ · S-15 D-5/L-3/C-2 ⟨kf-DemoGlobalChrome⟩ · S-16 KAD-12
⟨kf-KeyframesAddDialog, the sole carry's own claimant⟩ · S-17 C-9 ⟨kf-KeyboardShortcutsModal, its
self-ruled renumber **superseded**⟩ · S-18 KF-KE-21 ⟨kf-KeyframesEditor⟩ · S-19 C-12
⟨kf-SquareInstrument⟩ · S-20 KF-ET-27 + KF-ES-20 ⟨kf-EasingTarget / kf-EasingSidebar — **the arm is
KF.W5's act**⟩. **Three receive no slot and are ENUMERATED**: `K-6` dead ⟨kf-SpringTrace⟩ · `C·C-2`
refused-per-anti-rename ⟨kf-SharePopover⟩ · the anonymous fifth row **struck as a duplicate of
S-18**. **Arithmetic at the rows**: 10 S-9 claimants (8 minted · 1 dead · 1 refused) + 4 S-10
claimants (4 minted) = **14 live**, + 1 enumerated strike = **15** = C-17.R's row count; **12 slots
minted**, 3 dispositioned without one.

**The claim-token crosswalk is published with the mint** — banked `S-9` → {S-9…S-16} ∪ {K-6, C·C-2};
banked `S-10` → {S-17…S-20} ∪ {the strike → S-18}; and the **five non-claim `S-10` occurrences**
(three records' local roster indices + two cross-references) receive nothing and are named. C-17.R
row 13's readings reproduce at this seat: **37 raw / 15 records**, discards `KF-ES-10` ×11 ·
`MISS-10` ×4 · `KF-SS-10` ×3, **19 post-discard lines across 9 records**.

**Handed forward as consumed, not as assumed**: KF.W10's `CARRY-C-3`/`CARRY-C-5` consume these twelve
ids **at these bytes**; KF.W6 inherits seven evaluations under these ids; KF.W5 inherits S-20's arm;
KF.W7 governs S-13. **The E-3 addendum at `kf-KeyboardShortcutsModal` recording its supersession is
`.e`'s act** (the 58 records are `.e`'s writable set) and is named in the counts doc so it is not lost.

#### Act 7 — OP-4's locus probe: MEASURED, home NOT decided

```
⟨git grep -n 'parseAnimationCSS' 81a56990 -- src demo⟩
  demo/components/instrument/keyframes/composables/useKeyframeOps.ts:7 :64 :116 :162
  demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:26   ← the declaration
  demo/components/instrument/timeline/utils/timelineEngine.ts:11 :79
```

7 hits · 3 files · 1 declaration · 2 importing consumers · 4 call sites · **0 hits under `src`**.
**This seat states no home and arms nothing** — `KF-W8`'s `B-16` arms on the measurement, not on this
seat's reading. §Sequencing's engine-lane row `:699`, which asserts *"Engine work, not substrate
work"*, is **left standing untouched** with the output now beside it: that row routes the CURE and
does not resolve the LOCUS.

#### WRITE-THEN-MEASURE — one figure this unit published and then corrected before it shipped

The mint's note first claimed **`grep -c '^### S-'` → 8 → 20**. **It did not reproduce**: the twelve
minted rows land as `^#### S-` (they are subordinate to the appended note's section E, and promoting
them to `###` would break them out of the section that authorises them). Measured at the settled
bytes: `^### S-` → **8, unchanged** · `^#### S-` → **12** · **`^#{3,4} S-[0-9]` → 20**. The
prediction was replaced by the three measured readings in **both** places that carried it
(`lane-frontend.md` §E, `COUNTS-2026-09-17.md` §5.1), and the wave spec's own quoted instrument is
left **true** rather than silently redefined. Caught inside the unit, before the commit — this wave's
§Carry law (*"the denominator is re-counted at the bytes, never carried forward"*) applied to its own
receipt.

#### E-3 compliance, measured

Every one of the three dated formation files was **appended to, never rewritten** —
⟨`git diff --cached --numstat`⟩ at staging:

```
95   0   CENSUS-2026-08-03.md        (342 → 437)
365  0   lane-frontend.md            (624 → 989)
137  0   lane-library.md             (582 → 719)
434  0   W0/COUNTS-2026-09-17.md     (new)
412  0   artefacts/W0/counts-2026-09-17.txt (new)
                    → 1443 insertions, 0 deletions, 5 paths
```

**Zero deletions on all three.** ⟨`git diff --check`⟩ → clean at the unit boundary.
**Prettier**: run on this unit's own new doc only — ⟨`npx prettier --check W0/COUNTS-2026-09-17.md`⟩ →
*"All matched files use Prettier code style!"*. **NOT run** on `CENSUS`, `lane-frontend`,
`lane-library` or this record: prettier rewrites a file whole, and rewriting another seat's dated
evidence is precisely what E-3 forbids (`.b`'s precedent, same reasoning, independently re-reached).
One prettier side-effect was caught and repaired rather than shipped: it mangled two `**`-glob spans
inside bold runs (`src/**/*.ts`, `demo/**`) into escaped, space-glued text; both sentences were
re-worded to state the same fact without the glob, and the file re-checked clean.

#### E13 — mail, at this unit's scope

Four-path sweep re-run read-only at this seat: `docs/tranches/V/coordination` **17** files ·
`../glass-ui/docs/tranches/BK/coordination` **4** · `../keyframes.js/docs/tranches/V/coordination`
**12** · `../sci-report/atlas/docs/tranches/P/coordination` **28**. **Two mtime traps named rather
than tripped**: (i) every file in the keyframes coordination dir now carries a **2026-09-17 mtime** —
that is OP-1's absorption finding, not a delivery; the newest **dated packet name** there is
**2026-07-27**, ours; (ii) the one file dated today in value.js's own coordination dir,
`value-inbox-2026-09-17-o8-o11-amendment-addendum.md`, is a **RETAINED COPY of KF.W1.b's OUTBOUND**
(its line 1 says so). **0 unrowed · 0 UNREAD in this unit's scope · I-30 remains the tail.**
`INBOX.md` appends stay `.b`'s alone, once, at close (§Disjointness) — this unit wrote none.

#### Gates

| gate | BEFORE (seat-0 baseline) | AFTER |
|---|---|---|
| **G-0.6** | **RED-AS-EXPECTED** — 153/58/185 banked without a re-run of SCH-1/2/5/7; **SCH-4 banked as reproducing at no stateable spelling**; no cascade column; §6.5 roster and both z cells unexamined at the frontier; **no mint — three records claiming "S-10", four claiming "S-9"** | **GREEN on every clause this unit owns** — 8 rows each with command + literal output + date (+ the 412-L artefact); **SCH-4 discharged with its predicate stated ahead of both readings (62/16; the census's 61/15 unreachable at all three committed coordinates; the delta localised to one `/value` line)**; the cascade column landed **before** the F-1 disposition (10 of 21, 11 widened, four definers proved vendor-only, chain by path); §6.5 + tally row + both z cells re-scoped **in one motion at the roster's real home**, CENSUS taking the pointer cell only; **the mint run in ONE motion over all 15 C-17.R rows — 12 slots S-9..S-20 citing their records, 2 enumerated, 1 struck, plus the crosswalk and the stated id-space rule** |

**Falsifiers, each checked rather than assumed**: *a figure restated without its command* — **not
fired** (every figure in §1 is a command and its output). *A mint over four-plus-one* — **not fired**
(the roster was re-read at the spec's post-round-4 bytes and includes both claimants prior rounds
were short by, `KAD-12` and `KF-ET-27`+`KF-ES-20`). *Green-by-basis-reconciliation* — **not fired**
(X-4 is declared KF.W5's and no basis is reconciled). *A roster naming fewer than its measured
surface* — the cascade roster is declared a **floor** with both predicates published.

No other gate was touched, cured or turned by this unit.

#### Commits

| sha | meaning |
|---|---|
| **`a331fae6`** | `docs(kf-w0/counts)` — the family, unsplit: `COUNTS-2026-09-17.md` · `counts-2026-09-17.txt` · `CENSUS-2026-08-03.md` · `lane-frontend.md` · `lane-library.md`. Pathspec only; `scripts/dev/dev.sh` neither staged nor touched. |

#### Residuals

1. **The cascade-coupled roster is a FLOOR, not a closure** — 10 under the published eight-token
   predicate, 11 under the widened one. A wider vendor-token set returns more, and the note says so
   in place of a completeness claim.
2. **`KeyframeTimeline.vue:94`'s wrong-file citation is recorded, not repaired** — repairing it is a
   `demo/**` byte and therefore Dispatch-fatal in this wave. It is booked in `lane-frontend.md` §C.1
   for whichever wave owns that file's prose.
3. **The `kf-KeyboardShortcutsModal` E-3 addendum** (its self-ruled S-10 renumber superseded by this
   mint, slot = **S-17**) is owed **at the record, by `.e`** — named in `COUNTS-2026-09-17.md` §7 so
   it cannot be lost between the two concurrent units.
4. **`lane-library.md`'s §4.2 / §4.3 anchors** (`ingest/cssom.ts`, the six Tier-C regexes) were **not**
   re-anchored by this unit and are **not** asserted to have moved or held. Only Tier A was in scope.
5. **No escalation fired.** None of the five §Triumvirate Dispatch triggers is met: no reset by this
   seat; **zero** bytes written under `keyframes.js/**` (or any producer tree); no blanket
   re-anchor — the re-anchor is per-file and per-site throughout; no manifest mismatch (the four
   coordinates agree, and the ruling is `.b`'s in any case); no second, let alone third, diagnostic
   iteration on G-0.6. The specified cure was possible at the bytes and was performed as specified;
   nothing was substituted, skipped, or masked.

### KF.W0.e

**SERVED MODEL**: `claude-opus-5[1m]` · **Ref of record**: keyframes.js `origin/master`
**`81a56990736ced5b5edde0b84c527680ac7689b1`** (== `HEAD` since OP-1's settle; local `8281638c`
**DISQUALIFIED**). **Sub-gates**: G-0.7 · G-0.8 · G-0.9 · G-0.10. **Concurrent with `.d`**; no shared
modify path (spec §Disjointness).

**Seat continuity, declared loudly rather than smoothed over.** This unit ran in **two sittings of the
same seat** (identical `Claude-Session` trailer on every commit below). The first sitting landed the
three commit families 13:46–14:23 and **ended before it could append this receipt**; the second
sitting **re-measured every published figure from the settled bytes** before writing a word of it, so
nothing below is inherited from the first sitting's prose. Where a figure is quoted it is **re-run and
double-run at the second sitting's clock** and marked *reproduces*; two figures that could only be
read at a superseded coordinate (`D-19`'s pre-stamp census; the pre-build asset) were re-derived from
`git archive` of the parent commit and from the banked transcript respectively, and both are named as
such.

#### Act 1 — G-0.7: the gate roster, ROSTER + ROUTE, **zero struck** (`e12eeb91`)

`docs/tranches/X/keyframes/W0/GATE-ROSTER.md` + `artefacts/W0/gate-roster.txt`.

⟨`git ls-tree -r --name-only origin/master scripts/gates/`⟩ → **9 files**, printed by path ·
⟨`git show origin/master:package.json | grep -n 'proof:'`⟩ → `:50` `proof:structure` · `:51`
`proof:publish` · `:52` `proof:owner-golden` — **3 entry points**, with `:37` `check` (**no
`vue-tsc`**), `:43` `"gh-pages": "vite build --mode gh-pages"`, `:44` `depcruise src` stated beside
them. ⟨`git grep -c 'build:gh-pages' origin/master`⟩ → **no hits** (R-11 re-verified at execution).

The denominator, **re-run at authoring and again at this sitting, double-run**:

```
git grep -ho 'proof:[a-z0-9-]*' origin/master -- demo/ | grep -v -- '-$' | sort -u   → 55 tokens
   … | grep -cx 'proof:'            →  1   (the bare token)
   … | grep -vx 'proof:' | wc -l    → 54   DISTINCT NAMES
   runnable as an npm script        →  1   (proof:publish)      54 − 1 → 53 DEAD
git grep -c 'proof:' origin/master -- demo/                     → 51 files / 116 lines
```

**Roster completeness, measured not asserted** — the §4 roster body (`GATE-ROSTER.md` lines 143–340)
was scanned for backtick-quoted `proof:*` tokens, deduped ⟨`awk … | grep -oE … | sort -u | wc -l`⟩ →
**54**, and diffed against the 54 the sweep measures ⟨`comm -23 <the sweep's 54> <the roster's 54>`⟩ →
**∅ — not one name in the measured set is missing from the roster**. Every name carries its sites and a disposition under the six stated routing rules
(R1 struck-in-owner-wave KF.W4 · R2 `proof:brittleness` → **KF.W6, family whole** (R2-13) · R3 routed
with the grant word printed · R4 → the NO-WAVE-OWNER packet, homing left to SS-1/SS-2 · R5 a loud
`NO-WAVE-OWNER` line terminalized at `KF-W10.md` §E `NWO-TERMINAL-SWEEP` · R6 repoint beats strike).
The **three R-8 residue families are received by name AND by family**: D-13's seven (§6(i), derived as
8 distinct names − the `live-session-mobile` carve-out = the banked seven), L-6's **16 hits / 13
files** (§4.1, split per site), **KF-EST-1's eight sites over six names incl. `TypingDots.vue:45` /
`:51` / `:59`** (§6(iii)).

**W0 STRUCK NOTHING** — ⟨`git -C /Users/mkbabb/Programming/keyframes.js status --short -- demo/`⟩ →
**0 rows**; ⟨`… --untracked-files=no`⟩ → **0 rows**. Every byte this unit wrote is under
`value.js/docs/**`. Falsifier (c) — the Dispatch-fatal one — does not fire.

#### Act 2 — G-0.10: provenance re-derived against the **consumed dist**, one build (`e12eeb91`)

`artefacts/W0/glass-citation-rederivation.txt`, and the landings appended at the registry ids.

⟨`grep -c 'glass-ui/src' registry/adjudicated/kf-*.md`⟩ → **4 records, 1 line each** —
`kf-CSSPasteDialog` · `kf-KeyframeCardList` · `kf-KeyframeTimeline` · `kf-SharePopover`; each is a
**meta-citation about the provenance defect**, not a live `file:line` claim into glass source, so none
is struck and each is re-derived at its load-bearing token. The artifact is pinned **by bytes, never
by a version string** (C-13's whole content): ⟨`shasum -a 256 $(find node_modules/@mkbabb/glass-ui/dist
-type f | sort) | shasum -a 256`⟩ → `3cc72cc9d84879c7a1ada0ae2d210fbf11ca39904cb5909759c8717bc45da6f2`,
**double-run identical at this sitting**.

**C-14's re-read ran over BOTH repo-qualified letters AND the shipped artifact** — (a) value.js
`V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md:15-19`; (b) keyframes.js
`origin/master:V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md` (⟨`wc -l`⟩ →
**26**); (c) `dist/header-ribbon.js` — ⟨`grep -c`⟩ → `anchor` **4** · `pinned` **3** · `inert` **2** ·
`aria-hidden` **2** · `anchorLabel` **0** · `HeaderRibbonMode` **0**. **Five of letter (a)'s seven
claimed deletions are falsified by the shipping 7.0.0**; EH-1 holds byte-exact. **XR-4 is FALSIFIED at
the settled frontier**: ⟨`sed -n '16p' EditorShell.vue`⟩ → `<HeaderRibbon placement="right">` and
⟨`grep -c 'defineExpose' EditorShell.vue`⟩ → **0** — both of letter (b)'s consumer updates already
applied; C-15's HEAD-only `position="right"` did **not** carry forward.

**ONE `npm run gh-pages`, run once at 13:37:14** (`package.json:43`; **no `build:gh-pages` at any
coordinate**). `index-CL_QYCiO.css` (571142 B, Jul 16 09:11) → `index-CBB2Hr7m.css` (571192 B, Sep 17
13:37). **The artefact banked is the hash**: ⟨`find dist/gh-pages -type f | sort | xargs shasum -a 256
| shasum -a 256`⟩ → `bad6ea595fb59899e6589ad731b542d77eb19079a67d10548f6c07fc3c9564d2` over **54**
files — **re-verified double-run at this sitting, byte-identical**. **This sitting did NOT re-run the
build**: a second run would breach the spec's *exactly one*, so the banked hash is the standing
witness. All **seven** corpus byte-offset receipts re-derive GREEN in the fresh build; the one delta
(the `@layer` statement order) is **declared, not absorbed**, and appended at `kf-EditorHeader`.
⟨`grep -l 'index-CL_QYCiO' kf-*.md`⟩ → **10 records** carry the dead asset name; the coordinate is
superseded and the findings are not — the supersession is appended at all ten (E-3), and the 14 dated
challenge files under `audit/kf-components/` were **not touched**.

#### Act 3 — G-0.9: all 58 records stamped, **append-only**, per-file, keyed to `D-19` (`7c569bb0`, continued at `5645e476`)

`docs/tranches/X/keyframes/W0/REF-OF-RECORD.md` + `artefacts/W0/refofrecord-stamp-audit.txt` + the
58 records + `lane-docs.md` §B-12 row 16.

⟨`ls kf-*.md | wc -l`⟩ → **58** · ⟨`grep -l 'REF-OF-RECORD — KF.W0' kf-*.md | wc -l`⟩ → **58** ·
⟨`grep -c … | awk -F: '$2!=1'`⟩ → **0** records carry the stamp more than once. **E-3 is measured, not
promised**: ⟨`git show --numstat --format= 7c569bb0 -- …/adjudicated`⟩ → **58 files · 1204 added · 0
deleted**; the continuation `5645e476` → **14 added · 0 deleted**. **Not one byte of dated evidence
was rewritten.**

**The stamp is keyed to `D-19` via C-1.R row 6.** The pre-stamp census cannot be read at today's bytes
(the stamps themselves name the id), so it was re-derived from the settled coordinate
⟨`git archive 7c569bb0^ …/adjudicated | tar -x`⟩ and re-run there: bare token → **42 records / 94
lines**; by the row's stated re-anchor predicate → **34 records / 39 lines**; stamps present → **0**.
**Both banked figures reproduce exactly.** The **eight** records whose `D-19` is a component-local id
are named so a bare grep does not book a dead-token cluster, and the records the token never reaches
are stamped anyway — which is why the stamp is written at all 58 and not at the 42.

**C-19 resolved at its corrected denominator**: ⟨`sed -n '<the C-19 cell>p' KF-W0.md | grep -oE
'kf-[A-Za-z.]+' | sort -u | wc -l`⟩ → **32 distinct records**, **minus the 2 declared ANTI-firings**
(`kf-CubeAxisLines`, `kf-AnimatedText`) ⇒ **30 ledger members**, each to a named disposition, the two
anti-firings carrying an anti-firing line and **never swept as firings**. **C-20 resolved by
measurement** at both banks. **C-21 honoured — the pass is demonstrably PER-FILE**: every stamp
carries that record's own subject and its own ⟨`git diff --numstat 8281638c 81a56990 -- <subject>`⟩
offset; the corpus's one measured exemplar (kf-AmigaScene `:155`, *"comment-only drift, useAmigaDemo
−2 below `:73`"*) is carried; `TypingDots.vue`'s inversion is stamped in its own polarity with its
three travelling corrections **scoped to that file alone**. **The blanket-pass falsifier was run**:
⟨`git diff --stat origin/master -- …/TypingDots.vue`⟩ is empty **and** the TypingDots stamp does not
say *"stale HEAD"* — it states the measured `+4/−9` against the disqualified pin. **Not RED.**

**The six named corrections landed by id** — ⟨`grep -l 'of the six named at G-0.9' kf-*.md`⟩ →
**exactly 6 records**: `kf-App` (i, `demo/app/App.vue:176`, path-qualified) · `kf-TransportDock` (ii,
9 live + 1 prose, with the second predicate declared) · `kf-App.skeleton` (iii, KF-SKEL-7) ·
`kf-AnimationVisualizer` (iv, worktree-scope) · `kf-KeyboardShortcutsModal` (v, the renumber demoted
to a claim-input — **continued at `5645e476`**, which names the mint's assigned slot **S-17**
⟨`grep -n 'S-17' lane-frontend.md`⟩ → `:918`, discharging `.d`'s residual 3) · `kf-KeyframeTimeline`
(vi, the *"working tree = the audited tree"* equation false at every coordinate).

**§Excluded respected exactly**: ⟨`grep -oE '\*\*EH-[0-9]+' kf-EditorHeader.md | sort -u | wc -l`⟩ →
**16 ids**, and ⟨`grep -oE 'EH-[0-9]+'` over this unit's appended stamp at that record⟩ → **`EH-1`
×1, nothing else**. EH-4/5/8 (KF.W6, LIVE) · EH-9/10 (KF.W6, by twin) · EH-2/3/12/13/14/15
(NO-WAVE-OWNER, G-2) · EH-6/7/11/16 (their banked homes) were **enumerated, never booked here**.

**`lane-docs.md` §B-12 row 16** carved to **EXECUTED 2026-09-17** with the prior disposition carried
**verbatim** inside the cell (E-3) and `:145`'s live-unexecuted-maintenance-act framing untouched —
the only `modify-carve` row in the unit's bounds, and the carve is one cell.

#### Act 4 — G-0.8: the v8 pin dispositioned as RULED (`fc92ed52`)

`docs/tranches/X/keyframes/W0/V8-DISPOSITION.md` + `artefacts/W0/v8-disposition.txt` +
`INTAKE-ADJUDICATION-2026-08-03.md` (modify-append).

The ruling is **written as ruled at `COHESION.md` §0j.C `KF-OGKF1`** and neither made, softened,
widened nor re-opened here: the lineage is **STALE-BY-SUBSTRATE and does not continue**; citable only
as *"345 exact / 12 partial / 57 unresolved @ `8281638c`"*, never as HEAD coverage; **the five
conditional TCC re-reads (B10-9 · B19-10 pin half · B19-11 · B20-6 · B21-7) NEVER OPEN** — closed by
the ruling, enumerated so the closure is checkable by name. The verdict token is
**STALE-BY-SUBSTRATE**; the falsifier's *"carried"* / *"pending"* appear nowhere.

**X-2 — 185 adopted**, re-run and **double-run at this sitting**: ⟨`git ls-tree -r --name-only
origin/master demo/ | grep -cE '\.(ts|vue)$'`⟩ → **185 · 185**; the same command at the disqualified
pin → **183**. **The claimed 184 reproduces at NEITHER committed coordinate** — it is the pin's
*dirty disk* reading, so the Codex/census agreement at 184 is upgraded from an inference to a
demonstration of shared substrate error (C-19 at its largest amplitude). The 414 / 152 / 73 568
denominators each carry an explicit disposition (**NEVER CITABLE** · **REJECTED** at B18-26) so no
naive check leaves them live; B18-27 and B18-12/13/14 are carried unresolved **by design**, KF.W10's.

**`OG-KF1` is NAMED and NOT RULED** — §6 states it, and states the distinction the spec's §Excluded
turns on: **`KF-OGKF1`** (the §0j.C ruling on the contract's citability, *consumed* here) and
**`OG-KF1`** (the owner row on the lineage's continuation, *named* here for KF.W10's owner block
beside OD-V3/OD-V5) are **different items** — shared stem, different rows. A seat that ruled `OG-KF1`
here would fail the wave; this seat did not.

#### Act 5 — the verification sitting: every figure re-derived from the settled bytes

Nothing in Acts 1–4 was accepted on its own prose. Re-run and double-run at this sitting: the 9 gate
files · the 3 entry points · `55 tokens / 54 names / 1 runnable / 53 dead / 116 hits / 51 files` · the
roster's 54-name coverage with an **empty** `comm -23` residue · 58 records / 58 stamps / 0 duplicates
· `1204 + 0 −` and `14 + 0 −` · the pre-stamp `D-19` census at `7c569bb0^` (42/94, 34/39, 0 stamps) ·
C-19's 32 → 30 + 2 · the 16 `EH-*` ids and the single `EH-1` booking · `185 · 185` vs `183` · the
consumed-dist digest · the build hash over 54 files · the 4 `glass-ui/src` citations · the 10
`index-CL_QYCiO` citers · `header-ribbon.js`'s six surface counts · `EditorShell.vue:16` and its
`defineExpose` → 0 · letter (b) at 26 L · `0` tracked modifications and `0` `demo/` rows in
keyframes.js. **Every one reproduced.** No figure needed correction, and none was written that this
sitting had not itself produced.

#### Act 6 — the one gap this sitting found and closed (`58be3626`)

**G-0.10 was the only one of this unit's four gates whose reading reached no doc.** G-0.7's is
`GATE-ROSTER.md` §7, G-0.8's is `V8-DISPOSITION.md` §7, G-0.9's is `REF-OF-RECORD.md` §8 — G-0.10's
existed only inside a `.txt` transcript, discoverable by a seat that thinks to open it. A turned gate
whose reading lives nowhere a conformance pass reads is a roster defect of exactly the class G-0.7
exists to kill, one altitude up. **`REF-OF-RECORD.md` §9** now carries it: the three GREEN clauses,
the three falsifiers run, the dead-asset disposition and the no-product-byte receipt — **appended, not
rewritten** ⟨`git diff --numstat`⟩ → **47 added · 0 deleted**. No new claim is made there; every figure
is one this sitting re-executed.

#### E13 — mail, at this unit's scope

Re-swept read-only at this sitting against all rowed entries. (1) `docs/tranches/V/coordination/` —
17 entries, `INBOX.md` self-excluded (SELF-COUNT law); the three mtime-fresh files are **our own
outbound retained copies**, `value-inbox-2026-09-17-o8-o11-amendment-addendum.md` being **O-21**,
already rowed. (2) `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed newest**
⟨`ls -dlt ../glass-ui/docs/tranches/B*/`⟩ → `BK`@Sep 17 12:49 > `BJ`@Aug 3 > `BI`@Jul 28; 4 files,
newest = **I-30, rowed**. (3) `../keyframes.js/docs/tranches/V/coordination/` — 12 entries; ⟨`find …
-newermt '2026-09-17 00:00'`⟩ returns 9, **every one a 2026-09-17 birthtime over a July content
date** — the frontier's own V docs that `reset --hard` unlinked and recreated (OP-1's FINDING), **not
new mail**; one of them is C-14's letter (b), consumed at G-0.10. (4)
`../sci-report/atlas/docs/tranches/P/coordination/` — 28 files; newest is ours, outbound. **Result: 0
unrowed · 0 new `I-n` · I-30 remains the inbound tail · 0 UNREAD in KF.W0.e's scope.** **`INBOX.md` is
NOT in this unit's writable set** — it is `.b`'s alone, once, at close (spec §Disjointness), and `.b`
already banked the post-settle close sweep; this unit appends nothing there.

#### Gates — BEFORE → AFTER

| gate | BEFORE (baseline, this record) | AFTER (this unit, re-run at its own clock) |
|---|---|---|
| **G-0.7** | **RED-AS-EXPECTED** — 3 entry points · 9 gate files · 54 names + 1 bare token · 1 runnable → 53 dead · 116/51; no roster exists | **GREEN** — `GATE-ROSTER.md` dated in the tree; (i) roster of 3 entry points + 9 files by path + **all 53 dead names** enumerated, the command block re-run at authoring; (ii) **54 rows, every one disposed** (strike-in-owner-wave / routed-with-named-owner / repoint / loud NO-WAVE-OWNER), `proof:brittleness` → **KF.W6 family whole**; falsifiers (a) short roster, (b) non-disposition, (c) **a `demo/**` strike by W0 — 0 rows moved** all run and none fires |
| **G-0.8** | **RED-AS-EXPECTED** — no disposition exists anywhere | **GREEN** — `V8-DISPOSITION.md`: the §0j.C ruling written as ruled, verdict token **STALE-BY-SUBSTRATE**; **185 adopted** (double-run; 184 reproduces at no committed coordinate); the seal citable only as `345/12/57 @ 8281638c`; the five TCC re-reads **never open**; **`OG-KF1` NAMED, explicitly not ruled** |
| **G-0.9** | **RED-AS-EXPECTED** — 58 records, **0** stamped; `D-19` reaches 42 by bare token; six inbound corrections absent | **GREEN** — 58/58 stamped exactly once, **1204 + / 0 −** (append-only, E-3); keyed to `D-19` via C-1.R row 6 (42/94 bare, 34/39 re-anchor, re-derived at `7c569bb0^`); **C-19 at 30 members + 2 anti-firings enumerated separately**; C-20 resolved by measurement; the pass **demonstrably per-file** with the kf-AmigaScene exemplar and the TypingDots inversion in its own polarity; **the six named corrections landed by id**; blanket-pass falsifier run and not firing |
| **G-0.10** | **RED-AS-EXPECTED** — the corpus's byte-offset receipts ride a **Jul 16 09:11** artifact | **GREEN** — the 4 surviving `glass-ui/src/**` citations re-derived against the consumed dist (digest `3cc72cc9…`, double-run); XR-4 / IN-GLASS-1 / `DISPOSITIONS.md:21` re-read against **both repo-qualified letters AND `dist/header-ribbon.js`** (XR-4 **falsified at the frontier**); **one** `npm run gh-pages`, hash `bad6ea59…` over 54 files banked; 7/7 byte-offset receipts re-derive, the `@layer` delta declared; **reading written at `REF-OF-RECORD.md` §9** |

**4 of 4 sub-gates GREEN. 0 RED. 0 escalations.**

#### Commits

| hash | family | meaning |
|---|---|---|
| `e12eeb91` | `docs(kf-w0/roster+provenance)` | G-0.7 + G-0.10 — 53 dead names rostered and routed, **zero struck**; glass citations re-derived against the consumed dist; one fresh `gh-pages` banked |
| `7c569bb0` | `docs(kf-w0/ref-of-record)` | G-0.9 — all 58 records stamped by appended correction, per-file, keyed to `D-19`; C-20 resolved; `lane-docs` §B-12 row 16 EXECUTED |
| `fc92ed52` | `docs(kf-w0/v8)` | G-0.8 — the v8 pin **STALE-BY-SUBSTRATE** as ruled at §0j.C; 185 adopted; `OG-KF1` NAMED for KF.W10 |
| `5645e476` | `docs(kf-w0/ref-of-record)` | correction (v) continued — the C-17 mint's assigned slot **S-17** named at the record, discharging `.d`'s residual 3 |
| `58be3626` | `docs(kf-w0/roster+provenance)` | G-0.10's **gate reading** written at `REF-OF-RECORD.md` §9 (47 + / 0 −) |

Pathspec commits only; `scripts/dev/dev.sh` never staged (⟨`git log --stat` over all five⟩ → it
appears in none). The three declared families are intact and unsplit: `roster+provenance` carries
G-0.7 **and** G-0.10 because the gates share one measurement surface, exactly as the spec pairs them.

#### Residuals — carried, none blocking

1. **`dist/gh-pages/**` is regenerate-only and git-ignored** at the frontier (`.gitignore:10`
   `dist/`), so the one build **commits nothing**. The witness is the banked hash
   `bad6ea595fb59899e6589ad731b542d77eb19079a67d10548f6c07fc3c9564d2`, not the bytes. A later seat
   that needs those bytes **re-runs the build and re-hashes**; it must not assume the tree it finds
   is this one.
2. **The `@layer` statement delta** (corpus cell: *"base, components, demo, properties, theme,
   utilities"*; fresh build: five layer-ats as `properties · theme · base · components · utilities`,
   **no `demo` layer**) is **declared and appended at `kf-EditorHeader`**, never rewritten (E-3). It
   is a reading delta, not a defect of this wave, and it is charged nowhere here.
3. **`+5` dead names sit outside the 53** — `proof:easing-sidebar-minimal` ·
   `proof:amiga-decay-visible` · `proof:bezier-{no-scroll,single-card,grown}` — recovered from the six
   line-wrapped/brace-set tokens the denominator's own `-$` filter discards. They are rostered as a
   **loud addendum-beside** (`GATE-ROSTER.md` §2.2), **not** folded into the 53, because the 53 is the
   spec's stated denominator and re-basing it here would mint a fifth basis (the X-4 lesson). The
   bezier trio already carries a banked home (OPTIONS-UNIT @ KF.W12).
4. **Four untracked `src/` files survive in keyframes.js** (`compiled-frame.ts` · `interp-slot.ts` ·
   `value-ast.ts` · `composite-storage.ts`) — OP-1's reset artefact, **not this unit's**, recorded
   here only because this unit's no-strike receipt greps that tree: they are **untracked**, so
   ⟨`git status --short --untracked-files=no`⟩ → **0**, and no product byte moved.
5. **`OG-KF1` remains OPEN by design** — named here, **ruled at KF.W10**'s owner block beside
   OD-V3/OD-V5, never proxied.

#### Escalations

**None.** No Dispatch trigger fired: no reset by this seat · no write under
`keyframes.js/{src,demo,test,scripts}/**` · no producer-repo write (glass-ui was **read and hashed
only**, and at this sitting not opened at all) · no blanket per-repo re-anchor (the pass is per-file
by construction and the falsifier was run) · no MANIFEST MISMATCH surfaced by this unit · no third
diagnostic iteration on any gate. Every write landed inside the unit's §File Bounds writable set.

---

## Close

**SERVED MODEL: claude-opus-5[1m]** · **Date**: 2026-09-17 · **Seat**: KF.W0 CLOSE (Track B ·
**VERIFY-ONLY — this seat cured nothing and wrote no byte in `keyframes.js` or any producer tree**).
**Charge**: spec §Gates `:492-663` re-run whole at this seat's own clock · §Cadence/Artefacts `:747-753`
· §State `:283-301` (the four-verb line) · §Bounds `:325-353` (every unit's commits audited against its
writable set) · runbook §5.3 (E13) · COHESION §0j.C **KF-WRITE**.

**Substrate at close, double-run** (both runs identical on every figure):

```
⟨git -C ../keyframes.js rev-parse HEAD⟩          → 81a56990736ced5b5edde0b84c527680ac7689b1
⟨… rev-parse origin/master⟩                      → 81a56990736ced5b5edde0b84c527680ac7689b1
⟨… rev-parse kf-sacred-snapshot-2026-09-17⟩      → 6d280ee7bec7793846b2e2e1d250e1ea0a21859a
⟨… rev-list --count HEAD..origin/master⟩ → 0     ⟨… origin/master..HEAD⟩ → 0
⟨… status --short | wc -l⟩ → 6  (tracked rows → 0)   ⟨… diff --name-only origin/master | wc -l⟩ → 0
⟨… merge-base HEAD origin/master⟩ → 81a56990…    ⟨… diff --check⟩ → clean
⟨git -C ../glass-ui status --short | wc -l⟩ → 0   HEAD 887a0db9   ← producer READ-ONLY, honoured
```

### §1 · Gate table — BEFORE → AFTER, every gate re-run by this seat

Each AFTER cell is this seat's own reading against the spec's stated GREEN, not a unit's prose. Every
count double-run.

| gate | BEFORE (seat-0 baseline, 2026-09-17) | AFTER (re-run at the CLOSE seat's clock) | verdict |
|---|---|---|---|
| **G-0.1** Substrate settled | RED — 41 behind · 1 ahead · 252 status · 325 frontier-diff · 124 untracked; merge-base `a59d3a22`, neither ref an ancestor | **0 / 0 / 6 (0 tracked) / 0 / 6**, merge-base `81a56990`, `diff --check` clean; the 1-ahead commit COMMITTED to `6d280ee7`; **both enumerations dispositioned member-by-member** at `SUBSTRATE-SETTLE-2026-09-17.md` §4 (A=252) / §5 (B=225) / §6 (overlap=100), the three `comm` probes pasted and `325 − 252 = 73` used nowhere; the flat `emit/{backward,backward-walk,backward-color}.ts` triad **ABSENT ×3 by `test -e`** with `emit/` carrying `backward/` + `format/` as modules + 7 flat siblings (§7); C-15 **diffed at four coordinates**, `position="right"` and `mode="persistent"` both **0** at the settled worktree (§8) | **GREEN** |
| **G-0.2** Manifest single-state | RED — four coordinates, **three** states (HEAD `6.0.0` optionalDeps · master `7.0.0` exact devDep · worktree DELETED from both manifests · installed `7.0.0`); `.npmrc` unruled | HEAD `:77` == origin/master `:77` == worktree `:77` == `"@mkbabb/glass-ui": "7.0.0"`, installed `7.0.0`, lock **3** — **four coordinates, ONE state**; **both written rulings present**: `MANIFEST-RULING.md` §2 (the worktree deletion **DISCARDED-AND-SUPERSEDED**, preserved only on the disqualified snapshot ref) and §3 (`legacy-peer-deps=true` **RULED INERT AND RETIRABLE** against the two genuinely-absent peers, both dry-run arms exit 0) | **GREEN** |
| **G-0.3** EE-02 css-twin not regressed | RED — the four-path diff at `6 insertions(+) / 76 deletions(−)` | ⟨`git diff origin/master --stat -- <the four paths>`⟩ → **EMPTY**; the twin present at both write sites; **direction disk←master** proven by content, by the unmoved frontier ref, and by the snapshot holding the disk's prior bytes | **GREEN** |
| **G-0.4** Re-regression guard | RED — three oracles red at the audited disk, green at the frontier | coordinate pasted beside each output (**2026-09-17 · HEAD `81a56990…`**): EE-01 `:42` = `timingFunction: "easeInBounce",` · FE-3 `:11` = `:frame-start="startScalar(frames[i].start)"` · EE-03 `:97` = `() => animation.templateFrames.length,`; negatives **on the settled worktree** — `bounceInEase` in `demo/` → **0**, `.start.toString()` in `demo/` → **0**. Run **after** the migration landed, never before | **GREEN** |
| **G-0.5** Header-ribbon tripwire (negative) | RED-as-tripwire; **GREEN-BEFORE-CURE** on stated disjunct (a), HOLD undeclared | **disjunct (a) HOLDS** — installed 7.0.0 ≤ `4bf53962`, producer HEAD carries an empty `src/components/header-ribbon/`; consumer set re-derived **from the import graph**: 1 live specifier (`EditorShell.vue:116`) + 2 docs-prose hits never counted, symbol census `:16`/`:50`/`:116` all the same file through the same specifier ⇒ **EXACTLY ONE consumer, tests included**; `headerribbon-tripwire.txt` banked and the **HOLD** carried into `MANIFEST-RULING.md` §4, so **G-0.5 BOUNDS G-0.2** by name | **GREEN** |
| **G-0.6** Counts re-run | RED — 153/58/185 banked without a re-run of SCH-1/2/5/7; SCH-4 banked as reproducing at no stateable spelling; no cascade column; no mint | SCH-3 **153** · SCH-6 **58** · X-2 **185**, double-run identical; all 8 rows with command + literal output + date at `COUNTS-2026-09-17.md` (434 L) + `counts-2026-09-17.txt` (412 L); **SCH-4 discharged** with its predicate stated ahead of both readings; the **cascade-coupled legend column** exists at `CENSUS-2026-08-03.md` §(ii) and landed **before** the F-1 disposition; §6.5's PRM roster + tally row + both z cells re-scoped **in one motion** at `lane-frontend.md`, CENSUS taking the pointer cell only; **the mint ran in ONE motion** — `^### S-` **8** (unchanged) · `^#### S-` **12** (`S-9`…`S-20`, each citing its record) · `^#{3,4} S-[0-9]` **20**, with 2 enumerated and 1 struck against C-17.R's 15 rows | **GREEN** |
| **G-0.7** Gate-inventory truth | RED — 3 entry points · 9 gate files · 54 names + 1 bare token · 1 runnable → **53 dead** · 116/51; no roster artifact exists | roster present and dated (`GATE-ROSTER.md`, 351 L + `gate-roster.txt`, 508 L); the denominator re-run double: **55 tokens = 54 distinct + 1 bare**, `proof:publish` the sole runnable ⇒ **53 dead**, `116 hits / 51 files`, `build:gh-pages` → **0 hits**, `scripts/gates/` → **9 files** over 3 entry points; **coverage measured, not asserted** — ⟨`comm -23 <the sweep's 54> <the roster's names>`⟩ → **∅**; falsifier (c), the Dispatch-fatal one, checked at the bytes: ⟨`git -C ../keyframes.js status --short -- demo/`⟩ → **0 rows**, ⟨`… --untracked-files=no`⟩ → **0 rows** ⇒ **W0 STRUCK NOTHING** | **GREEN** |
| **G-0.8** Codex v8 pin dispositioned | RED — `V8-DISPOSITION.md` does not exist; no disposition anywhere | `V8-DISPOSITION.md` (128 L) written **as ruled** at COHESION §0j.C `KF-OGKF1`: verdict token **STALE-BY-SUBSTRATE**, the seal citable only as `345 exact / 12 partial / 57 unresolved @ 8281638c`, the five conditional TCC re-reads **never open**, **185 adopted** (double-run; 183 at the disqualified pin, so the claimed 184 reproduces at no committed coordinate); the falsifier's tokens *"carried"* / *"pending"* appear as no verdict (⟨`grep -ci '^\*\*verdict.*(carried\|pending)'`⟩ → **0**); **`OG-KF1` NAMED and explicitly NOT RULED**, with the `KF-OGKF1` / `OG-KF1` distinction stated | **GREEN** |
| **G-0.9** Registry re-anchor | RED — **58** records, **0** stamped; `D-19` reaches 42 by bare token; six inbound corrections absent | **58 records · 58 stamped · 0 duplicated** (double-run); append-only **measured**: `7c569bb0` → **58 files, 1204 added, 0 deleted**, `5645e476` → **14 added, 0 deleted**; the **six named corrections landed by id** — ⟨`grep -l 'of the six named at G-0.9' kf-*.md`⟩ → **exactly 6** (`kf-App` · `kf-App.skeleton` · `kf-AnimationVisualizer` · `kf-KeyboardShortcutsModal` · `kf-KeyframeTimeline` · `kf-TransportDock`); **the blanket-pass falsifier RUN and NOT FIRING** — `git diff --stat origin/master -- …/TypingDots.vue` is empty **and** that record's stamp states the measured per-file `+4/−9` against the disqualified pin rather than a *"stale HEAD"* verdict (the five `stale HEAD` strings in that file are pre-existing dated body prose, untouched under E-3) | **GREEN** |
| **G-0.10** Source-over-dist provenance | RED — the corpus's byte-offset receipts ride a **Jul 16 09:11** artifact; no re-derivation | the **4** surviving `glass-ui/src/**` citations (1 line each, all meta-citations) re-derived against the **consumed dist**, pinned by digest ⟨`shasum -a 256 $(find node_modules/@mkbabb/glass-ui/dist -type f | sort) | shasum -a 256`⟩ → `3cc72cc9d848…da6f2`, **re-verified at this seat**; **BOTH repo-qualified letters present and named** — (a) value.js `V/archive/…-persistent-only.md`, (b) keyframes.js `origin/master:V/coordination/…-consumer-updates.md` — plus `dist/header-ribbon.js` re-read (`anchor` 4 · `pinned` 3 · `inert` 2 · `aria-hidden` 2 · `anchorLabel` **0** · `HeaderRibbonMode` **0**); **exactly one** `npm run gh-pages`, banked by hash — this seat re-hashed the tree without rebuilding: **54 files → `bad6ea595fb5…64d2`, byte-identical to the banked artefact**; the gate reading itself written at `REF-OF-RECORD.md` §9 | **GREEN** |

**10 born-RED gates · 10 GREEN · 0 RED · 0 UNRUNNABLE · 0 DIVERGENT.** Not one AFTER figure needed
correction against the unit that published it.

### §2 · Verification Artefacts — §Cadence `:751` run as written

All twelve banked, self-counted at the settled bytes by this seat (⟨`wc -l`⟩):

| artefact | L | artefact | L |
|---|---:|---|---:|
| `substrate-open.txt` | 78 | `headerribbon-tripwire.txt` | 109 |
| `substrate-close.txt` | 127 | `counts-2026-09-17.txt` | 412 |
| `manifest-four-coordinates.txt` | 132 | `gate-roster.txt` | 508 |
| `ee02-diff-open.txt` | 59 | `refofrecord-stamp-audit.txt` | 219 |
| `ee02-diff-close.txt` | 79 | `glass-citation-rederivation.txt` | 197 |
| `oracle-ee01-fe3-ee03.txt` | 76 | `v8-disposition.txt` | 69 |

**12 of 12 present; 0 owed.** The `npm run gh-pages` **build hash** rides inside
`glass-citation-rederivation.txt` (`:138`) as the spec requires — the artefact is the hash, not the
bytes (`dist/gh-pages/**` is git-ignored at the frontier). Work product, self-counted:
`SUBSTRATE-SETTLE-2026-09-17.md` **750 L** · `COUNTS-2026-09-17.md` **434 L** ·
`MANIFEST-RULING.md` **356 L** · `GATE-ROSTER.md` **351 L** · `REF-OF-RECORD.md` **241 L** ·
`V8-DISPOSITION.md` **128 L** — six of six §Bounds `create` rows landed.

**E-3 held over the governing spec**: ⟨`shasum -a 256 docs/tranches/X/keyframes/waves/KF-W0.md`⟩ →
`5c82b06d8e7f…ac4b` == ⟨`git show 97e6a5f2:<the same path> | shasum -a 256`⟩. **The spec's bytes did
not move between the wave's opening commit and its close.** No executing seat edited it.

### §3 · Commit roster

**keyframes.js — 1 commit, the only product-byte act of the wave:**

| sha | meaning |
|---|---|
| `6d280ee7bec7793846b2e2e1d250e1ea0a21859a` | `snapshot(kf): …` — the ruled OWNER'S-HAND snapshot, COHESION §0j.C step (2), message verbatim as ruled; 226 files (219 M + 7 D), 4483+/6156−. Held by the local ref `kf-sacred-snapshot-2026-09-17` |

**value.js — 19 commits, in landing order:**

| # | sha | family | unit |
|---:|---|---|---|
| 1 | `97e6a5f2` | `docs(X·exec)` — KF.W0 OPEN, baseline banked, 5 units planned | seat 0 |
| 2 | `e898b65e` | `docs(kf-w0/op-1)` — receipt + `substrate-open.txt` + `substrate-close.txt` | OP-1 |
| 3 | `a10e33ad` | `docs(X·exec)` — LEDGER, OP-1 line | OP-1 |
| 4 | `388dbf1f` | `docs(kf-w0/settle)` — `SUBSTRATE-SETTLE-*.md` + 3 artefacts, family unsplit | `.c` |
| 5 | `30110269` | `docs(kf-w0/manifest)` — the ruling + 2 artefacts, family unsplit | `.b` |
| 6 | `ac5cc99c` | `docs(kf-w0/manifest)` — E13, the three relay packets at `INBOX.md` | `.b` |
| 7 | `8ae115b2` | `docs(kf-w0/settle)` — `.c` receipts | `.c` |
| 8 | `257fa20a` | `docs(kf-w0/manifest)` — `.b` receipts | `.b` |
| 9 | `71bdf8d5` | `docs(kf-w0/manifest)` — the E-3 addendum-beside on `257fa20a`'s 231-vs-229 | `.b` |
| 10 | `a331fae6` | `docs(kf-w0/counts)` — 5 paths, family unsplit | `.d` |
| 11 | `6894d4ed` | `docs(X·exec)` — `.d` receipts | `.d` |
| 12 | `71590e49` | `docs(X·exec/ledger)` — `.d` line | `.d` |
| 13 | `e12eeb91` | `docs(kf-w0/roster+provenance)` — G-0.7 + G-0.10 | `.e` |
| 14 | `7c569bb0` | `docs(kf-w0/ref-of-record)` — G-0.9, the 58 + `lane-docs` §B-12 row 16 | `.e` |
| 15 | `fc92ed52` | `docs(kf-w0/v8)` — G-0.8 | `.e` |
| 16 | `5645e476` | `docs(kf-w0/ref-of-record)` — correction (v) continued, slot `S-17` named | `.e` |
| 17 | `58be3626` | `docs(kf-w0/roster+provenance)` — G-0.10's gate reading at `REF-OF-RECORD.md` §9 | `.e` |
| 18 | `d7ae45ce` | `docs(X·exec)` — `.e` receipts | `.e` |
| 19 | `821dee93` | `docs(X·exec/ledger)` — `.e` line | `.e` |

**`scripts/dev/dev.sh` appears in ZERO of the twenty** — ⟨per-commit `git show --name-only | grep -c`, summed⟩ → **0**. It stayed dirty and unstaged throughout, as the standing arrangement requires.

**The three declared commit families are intact and unsplit**: `settle` carries the record with its
three artefacts; `manifest` carries the ruling with the two readings it rules on; `counts` carries all
five of `.d`'s paths in one motion. `roster+provenance` carries G-0.7 **and** G-0.10, as the spec
pairs them.

### §4 · Landed-wrong — 2 findings, both bounds-shaped, neither byte-shaped

Reported here and **not fixed** (this seat is verify-only, and both were already dispositioned at the
receiving track's record by the seats whose bytes they are).

**LW-1 · `a10e33ad` carries one path outside KF.W0's writable set** —
`docs/tranches/X/execution/D/X-P-W0.md` (**+203 / −0**), the X.P.W0.b receipt block of **Track D**.
This is the shared-index race between concurrent seats on one repository, already booked as **X.P.W0
CHECK 1 · D-2** (*"§9's commit ④ family split across tracks by a shared-index race — 4 of `.d`'s 5
paths rode `9c72f097`, `.b`'s block rode `a10e33ad`"*), with the disposition *recorded, not
rewritten*. Nothing is lost or duplicated: the bytes are Track D's own, they are in `HEAD`, and no
history was rewritten because a mid-flight reset would hand a live sibling seat an index it did not
create.

**LW-2 · `58be3626` carries six paths outside KF.W0's writable set** —
`megatranche/CONVERGENCE-RESUME-HANDOFF-2026-07-29.md` · `IN-FLIGHT-RESUME-HANDOFF-2026-07-29.md` ·
`registry/COMPLETENESS-LEDGER.md` · `registry/HYDRATION-LEDGER.md` ·
`workflows/hydrate-reports.mjs` · `workflows/validate-completeness.mjs`. Every one of the six is
**Track A's X-W0.c** writable set (`X/waves/W0.md` §Bounds names all six), and that seat's record
books the event at **§C9 · "Landing, and the shared-index event a fourth time"**, verifying all six
⟨`diff <(git show HEAD:<f>) <f>`⟩ **IDENTICAL ×6** and noting that `58be3626`'s only *foreign* path
from Track A's side is `.e`'s own `REF-OF-RECORD.md`. Same disposition: **recorded, not rewritten**;
the follow-on `549353fd` was made with the pathspec on the commit itself.

**What this seat adds rather than inherits**: the two events are the **same mechanism read from the
other end**, and the mechanism is not a seat's carelessness but `git`'s shared index under the
four-concurrent-workflow cap — an `add`-then-`commit` pair is not atomic across seats, so a sibling's
`git commit <pathspec>` between them sweeps whatever is staged. **The lawful guard is to put the
pathspec on the `commit` call, not on a preceding `add`** (X-W0.i's I10 guard, independently reached
at `549353fd`). Booked here so the X·KF lane carries it too. **No KF.W0 byte landed in a foreign
commit, and no foreign byte was altered by a KF.W0 seat** — in both events the sweeping commit
*preserved* the sibling's bytes exactly.

**Zero landed-wrong of the substantive kind**: no product byte moved in `keyframes.js` beyond the
ruled reset (⟨`git status --short --untracked-files=no`⟩ → **0**, ⟨`status --short -- demo/`⟩ → **0**);
no producer byte moved (glass-ui **0 rows**, HEAD `887a0db9`); the 58 records are append-only at
**1204 + 14 added / 0 deleted**; the governing spec's hash is unmoved.

### §5 · Escalations

**None fired at any seat, and none fires at this one.** All five §Triumvirate Dispatch triggers
re-checked at the close bytes: (1) the reset was performed by the **ruled OP-1 hand** under the
owner's 2026-09-17 begin-word, in the §0j.C three-step order and no other — never by another seat and
never as a bare reset; (2) **no write under `keyframes.js/{src,demo,test,scripts}/**`** beyond the
reset's own act, and the two EE-02 paths were **verified, never authored**; (3) **no producer-repo
write**; (4) **no blanket per-repo re-anchor** — the pass is per-file by construction and its
falsifier was run and did not fire; (5) **no MANIFEST MISMATCH after the settle** — the four
coordinates agree at `7.0.0`; and no gate took a third diagnostic iteration (every gate turned on its
first run at the unit that owned it).

**One escalation-shaped item that is NOT this wave's and is named so it is not read as ours**: Track
A's **HG-7** is RED and escalated to the triumvirate at `X-W0.c`. It shares this repository and this
session but no gate, no bound and no id with KF.W0.

### §6 · E13 — mail, at the wave's scope, re-swept at the close seat

Four paths swept read-only at this seat's clock, classified **per status cell** and never per
`grep -i unread` line (X.P.W0 CHECK 1 · D-1):

1. `docs/tranches/V/` (10) + `docs/tranches/V/coordination/` (17) — `INBOX.md` self-excluded
   (SELF-COUNT law); the three files dated today are **our own outbound retained copies**
   (`value-inbox-2026-09-17-o8-o11-amendment-addendum.md` = **O-21**, plus the two 07-24/07-27
   back-fills), every one already rowed.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir**
   ⟨`ls -dlt ../glass-ui/docs/tranches/B*/`⟩ → `BK`@Sep 17 > `BJ`@Aug 3 > `BI`@Jul 28 > `BH`@Jul 15;
   4 files, newest `glass-outbound-2026-08-29-valuejs-o20-ack.md` = **I-30, rowed**.
3. `../keyframes.js/docs/tranches/V/coordination/` (the SACRED checkout, read-only) — 12 entries;
   newest **content** date **2026-07-27**, ours. The uniform 2026-09-17 mtimes are OP-1's absorption
   finding (`reset --hard` unlinked and recreated 175 V paths), **not mail** — the trap is named, not
   tripped, for the third time in this record.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 28 files; newest **2026-07-27**, ours,
   outbound.

**The one row in the whole ledger whose status cell literally reads `UNREAD 2026-09-17` is `I-31`**,
and its own Routing cell assigns it to **X-W0 (Track A)** — *"X-W0 close reads this row and marks it
FOLDED"* — **not to X·KF and not to KF.W0's scope**. **Result: 0 unrowed · 0 new `I-n` minted ·
I-31 the inbound tail · O-21 the outbound tail · 0 UNREAD in KF.W0's scope.** The wave does not close
with unread mail. `INBOX.md` was appended by `.b` alone, once, at close (§Disjointness) and this seat
appends nothing to it.

### §7 · Residuals — carried forward with named owners, none blocking

| # | residual | owner |
|---:|---|---|
| R-1 | **The 118-file untracked absorption is IRREVERSIBLE** — `reset --hard` skips `verify_absent`, so 118 of 124 untracked files (97 of 99 V docs) were overwritten with `origin/master` bytes; no git object holds the prior bytes and no filesystem signal names the members. **E13 consequence NIL** (both value.js-delivered mail packets are among the 6 survivors, byte- and mtime-intact); the 97 are keyframes' own V docs now at their frontier state. Re-cut in the record as **226 COMMITTED · 118 DISCARDED · 6 KEPT** | **closed as a finding; the pre-act probe is booked for the next substrate seat anywhere in X** (§11.1 of the settle record) |
| R-2 | **The snapshot ref `kf-sacred-snapshot-2026-09-17` is LOCAL-ONLY and not an ancestor of the frontier** — every "COMMITTED" disposition in the settle record cites it, so 226 tracked rows and 7 deletions lose their receipt if it is deleted. **STILL OPEN at this close, deliberately**: the close's push instruction is `push origin HEAD` and nothing else, and §Bounds grants this wave `keyframes.js` refs *"via the §0j.C three-step command sequence only"* — publishing a second branch to a sibling remote is outside both, so this seat declined it rather than widening its own grant to discharge a residual. **The act to perform, stated in its exact form so no seat has to re-derive it**: `git -C /Users/mkbabb/Programming/keyframes.js push origin kf-sacred-snapshot-2026-09-17` | **orchestrator / owner — OPEN** |
| R-3 | **The remote advanced one docs-only commit past the pin** (`55e9bf0d`, KF.W1's own delivery, parent `81a56990`) — benign today, a live hazard for any later seat that fetches in the sacred checkout. **Every anchor in this wave names the sha, for that reason** | every later X·KF wave |
| R-4 | **Four orphaned flat-layout `src/` drafts survive untracked** in keyframes.js (`compile/{compiled-frame,interp-slot,value-ast}.ts` · `group/composite-storage.ts`) — unreachable by any frontier specifier; the reset could not remove them because their paths are absent upstream. `src/**` is out of this wave's bounds, so the finding is stated and nothing is cured | a wave whose §Bounds carries `src/**` |
| R-5 | **`.npmrc`'s retirement** — ruled INERT-and-retirable; the *act* is routed **NO-WAVE-OWNER** because `.npmrc` is named by no §Bounds row here, and deleting it would be the file-bound expansion the Dispatch calls wave-invalidating. Expires with the G-0.5 HOLD; both re-measured together | NO-WAVE-OWNER (SS-1/SS-2) |
| R-6 | **The G-0.5 HOLD is live**: installed glass-ui may **not** advance past `4bf53962` while `origin/master:EditorShell.vue:116` imports `/header-ribbon`. Cheap to lift, but only by a **migration** (which chrome host replaces the band), never by a version bump | NO-WAVE-OWNER migration decision; HOLD carried at `MANIFEST-RULING.md` §4 |
| R-7 | **The COHESION §4a (SS-6 accretion register) mirror is OWED, not written** — `COHESION.md` is outside every KF.W0 unit's writable set; the three relay packets are durable at `INBOX.md` | orchestrator |
| R-8 | **glass-ui 7.0.0 packument ≠ tarball** by one peer entry (bare `embla-carousel` in the lock's recorded map, absent from the shipped `package.json`) — C-13's class inside this wave's own manifest surface. Relayed under KF-APP-59 | glass-ui producer |
| R-9 | **`@mkbabb/parse-that@1.0.0` is EXTRANEOUS** in keyframes' `node_modules` — an install-state residue outside G-0.2's four coordinates; named so no later seat files it as a manifest defect | none; informational |
| R-10 | **`KeyframeTimeline.vue:94` cites the WRONG vendor file** for its PRM delegation (`transitions.css`'s block is class-scoped) — correct conclusion, wrong file; recorded at `lane-frontend.md` §C.1, **not repaired**, a `demo/**` byte being Dispatch-fatal here | whichever wave owns that file's prose |
| R-11 | **The cascade-coupled roster is a FLOOR, not a closure** (10 under the published eight-token predicate, 11 widened) — stated in place of a completeness claim | KF.W6 (the token-namespace probe half) |
| R-12 | **`+5` dead `proof:*` names sit outside the 53** (`proof:easing-sidebar-minimal` · `proof:amiga-decay-visible` · `proof:bezier-{no-scroll,single-card,grown}`), recovered from line-wrapped tokens the denominator's own `-$` filter discards. Rostered as a **loud addendum-beside** at `GATE-ROSTER.md` §2.2 and deliberately **not** folded into the 53, because re-basing the spec's stated denominator here would mint a fifth basis (the X-4 lesson) | KF.W4 / OPTIONS-UNIT @ KF.W12 (the bezier trio's banked home) |
| R-13 | **The `@layer` statement delta** between the corpus cell and the fresh build — declared and appended at `kf-EditorHeader`, charged nowhere | none; a reading delta |
| R-14 | **`lane-library.md` §4.2/§4.3 anchors** (`ingest/cssom.ts`, the six Tier-C regexes) were not re-anchored and are **not** asserted to have moved or held — only Tier A was in scope | KF.W5 |
| R-15 | **`dist/gh-pages/**` is git-ignored, so the one build commits nothing** — the witness is the banked hash `bad6ea59…`, re-verified at this close. A later seat that needs those bytes **re-runs the build and re-hashes**; it must not assume the tree it finds is this one | any consuming wave (KF.W6/KF.W9) |
| R-16 | **`OG-KF1` remains OPEN by design** — NAMED here, **RULED at KF.W10**'s owner block beside OD-V3/OD-V5, never proxied | KF.W10 (owner) |
| R-17 | **The shared-index commit-sweep hazard** of §4 — the guard (pathspec on the `commit`, never only on a preceding `add`) is booked here for the X·KF lane | every concurrent seat in this session |

### §8 · The four-verb line — moved exactly as §State prescribes

| verb | before | after | authority |
|---|---|---|---|
| AUDITED | YES | **YES** (unchanged) | 58 adjudicated records + CENSUS + INTAKE-ADJUDICATION |
| SPECIFIED | YES | **YES** (unchanged) | `KF-W0.md`, 2026-08-28, L-20-validated through repair round 6 |
| IMPLEMENTED | NO | **YES — 2026-09-17** | spec §State: *"stamped at this wave's own close"*; §Cadence: *"the last stamps **IMPLEMENTED**"*. Ten born-RED gates re-run GREEN by this seat |
| VERIFIED | NO | **NO** | spec §State: *"stamped only at KF.W10's sub-tranche release close (R-A)"*. **This seat does not move it, and no KF.W0 seat may.** |

**Goal criterion (§State `:299`), met at the bytes**: every adjudicated X·KF record now names the ref
it cures against (58/58, stamped once each), **that ref is one ref** (`origin/master`
`81a56990736ced5b5edde0b84c527680ac7689b1`, which since the settle **is** the sacred checkout's
`HEAD`), and the counts, gates, glass-ui citations and Codex denominators a later wave may cite are
each dated, commanded and measured on a named tree. The wave changed no product behaviour: the only
product bytes that moved were moved by the owner's reset, toward the frontier.

### §9 · Push

The owner's 2026-09-17 begin-word authorizes publish/push/pull. Two pushes performed, **exactly the
two the close charges and no third**, never forced:

- `git -C /Users/mkbabb/Programming/keyframes.js push origin HEAD` — expected **inert**: `HEAD` ==
  `origin/master` == `81a56990`, the wave's one keyframes commit lives on the local snapshot ref and
  not on `master`, so this push publishes nothing and is run to *prove* that rather than to assume it.
- `git -C /Users/mkbabb/Programming/value.js push origin HEAD` — publishes the wave's nineteen
  commits on `tranche-u`.

**Not pushed, and declined on the record**: the snapshot ref (R-2). See that row for why and for the
one command that discharges it.
