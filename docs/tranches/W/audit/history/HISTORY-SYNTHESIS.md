# HISTORY-SYNTHESIS — what this repository has actually been doing for 22 tranches

**Seat:** history synthesis, tranche W audit
**Substrate:** `/Users/mkbabb/Programming/value.js` @ branch `tranche-u`, HEAD `c654824e`
**Inputs:** ten history seats (A–D, E–H, I–L, M–P, Q–S, T, U, V-core, V-apotheosis, V-vnext)
and four cross seats (prompt-recap, canon-drift, consumer-truth, gate-soundness), all under
`docs/tranches/W/audit/history/`; plus first-hand measurement of the git object store.
**Date:** 2026-07-24

## Model receipt

I observe myself to be **Claude Opus 4.5** (`claude-opus-4-5-20251101`), running as a Claude Code
subagent with a 1M-token context window. The harness labels this seat `Opus 5 (1M context)` /
`claude-opus-5[1m]`; I have no introspective access confirming a model by that name, and I record
the discrepancy rather than assert the harness label as self-knowledge. Every number below is
reproducible from the pasted commands regardless of which model ran them.

---

## 0. Method, and its one honest weakness

Everything below is measured, not inferred from close documents. Three measurement choices need
declaring because they bound the conclusions:

1. **Tranche attribution of commits** is by subject-line marker (`(D.W3`, `(v-w44`, `U.W-PERF`,
   `tranche-s`). This repo tags commits consistently, so attribution is high-confidence — but
   ~2,929 file-touches in `src/demo/api` carry no tranche marker (mostly the pre-2026-05-18
   modernization era, plus the `feat(v4)!` cut commits which use a version prefix rather than a
   wave prefix). Where the unattributed set matters I measure those commits individually.
2. **"Session"** is a commit cluster with an internal gap ≤ 3 hours. This is a proxy. It will
   over-count if the author committed after a long break inside one working session, and
   under-count if two sessions ran back to back. I also report distinct commit-days and calendar
   days so the projection does not rest on one definition.
3. **"Product"** is `src/ demo/ api/` restricted to `.ts .vue .js .mjs .css .glsl`. Docs, tests,
   e2e and CI config are excluded from product and counted separately, deliberately: the question
   is what the *shipping artifact* did.

**The weakness:** commit-subject attribution cannot see work that never reached a commit. Tranches
M, C, and the un-run tails of K, N and V′ are measured as zero product because they *are* zero
product — but a fair reading should note that a wave which produced a decision and no code is not
necessarily worthless. I address that directly in §3 rather than hiding it in a footnote.

---

## 1. The trend in real delivered value per tranche

### 1.1 The single number

```
$ git log --all --numstat --format='%H' --until=2026-05-17 -- src demo api | awk ...
PRE-TRANCHE era (initial commit → 2026-05-17):
  added=72239  deleted=46714  net=+25525  touches=2497

$ git log --all --numstat --format='%H' --since=2026-05-18 -- src demo api | awk ...
TRANCHE era (2026-05-18 → HEAD, 22 tranches, 61 calendar days):
  added=83358  deleted=85909  net=-2551   touches=3074
```

**Twenty-two tranches of formal process produced a net *reduction* of 2,551 lines in the shipping
tree.** The informal pre-tranche era — the same codebase, no tranche machinery, no wave specs, no
gate matrices — produced +25,525.

This is not by itself damning. A rewrite that deletes more than it adds can be enormous value
(the v4 cut is exactly that). So the net figure is a headline, not a verdict. The verdict needs the
per-tranche breakdown.

### 1.2 Per-tranche delivered value

Product bytes are `git ls-tree -r -l <ref> -- src demo api` filtered to code extensions.
Landing rate is `promised / landed` as independently verified by the ten history seats.

| Tranche | Waves prom/exec | Published | Product Δ (attributed churn +/−) | Landing rate | Verdict |
|---|---|---|---|---|---|
| A | 8/8 | — | +1877 / −1610 | — | Opened the 3 oldest chronics; shipped design |
| B | 5/5 | — | +634 / −993 | — | Real (pane router, 22 files deleted) |
| C | 3/0 | — | 0 / 0 | — | **NET NEGATIVE** — retired, never executed |
| D | 7/7 | v0.6.0 | +7811 / −3995 | 14/120 = **12%** | Big ship, one gate (`api tsc`) |
| E | 6/6 | v0.7.0 | +6261 / −1632 | — | Real |
| F | 5/5 | v0.8.0 | +555 / −4768 | — | Real (killed the 126-error baseline by `rm -rf`) |
| G | 6/6 | v0.9.0 | +2571 / −1752 | 26/52 = 50% | Real, but its headline axis was false at merge |
| H | 6/6 | v0.10.0 | +2210 / −1166 | (in E–H) | Real |
| I | 5/5 | — | +817 / −233 | — | Real (api contract) |
| J | 5/5 | — | (landed in K commits) | 40/77 = 52% | **NET NEGATIVE** — all of WAVE-D deleted at T.W1 |
| K | 9/**3** | v0.11.0 | +1900 / −260 | (in I–L) | **NET NEGATIVE** — shipped a known precept violation |
| L | 4/5 | — | +475 / −373 | — | Real; the one honest re-scope in the corpus |
| M | 9/**0** | — | **0 / 0** | 46/84 = 55% | **NET NEGATIVE** — superseded before ratification |
| N | 18/**9** | 0.11.2–0.13.0 | +6015 / −2758 | (in M–P) | Half-executed; FINAL.md written by R |
| O | 8/7 | 0.13.1–1.0.2 | +1917 / −150 | — | Real (7 versions) |
| P | 1/1 | 1.1.0 | — | — | Retro-authored close record only |
| Q | 1/1 | 1.1.1, 1.2.0 | — | 45/82 = 55% | **NET NEGATIVE** — all 3 deliverables deleted |
| R | 8/7 | 2.0.0, 2.0.1 | +6016 / −4552 | (in Q–S) | Real (ΔE, OKHSL, boundary — all later deleted) |
| S | 10/10 | 3.0.0, 3.1.0 | +12266 / −7244 | (in Q–S) | Real |
| T | 12/12 | — | +14603 / −9801 | 70/149 = **47%** | Design work survives; no version cut |
| U | 10/10 | 4.0.0 | +3245 / −1352 | 35/104 = **34%** | Real, then largely un-guarded by V |
| V′ | 18/**8** | — | +3867 / −2175 + the v4 cut | 5/18 = **28%** | Mixed, trending negative (§3.6) |

Aggregate across all ten seats: **1,005 commitments promised, 380 verified landed = 37.8%.**
Excluding the V-apotheosis seat (whose 96 "landed" are document rows written, not product
shipped): **284 / 885 = 32.1%.**

### 1.3 The trend: FALLING, on three independent axes

**Axis 1 — landing rate falls monotonically across the arc's second half.**
G 50% → I–L 52% → M–P 55% → Q–S 55% → **T 47% → U 34% → V-core 28% → V-vnext 1.5%**.
The peak is the middle of the arc; the last four measurements are the four lowest.

**Axis 2 — wave abandonment appears and then dominates.**
No tranche before K abandoned a ratified wave. From K onward: K 6-of-9 abandoned, M 9-of-9,
N 9-of-18, V′ 10-of-18, vnext 193-of-193. The formal machinery got heavier at exactly the point
it began failing to finish.

**Axis 3 — verification capacity collapses while output is declared green.**

```
$ for c in 6e14e90c 164343c1 HEAD; do git show "$c:.github/workflows/ci.yml" | wc -l; done
6e14e90c 2026-07-13 ci.yml=593 lines
164343c1 2026-07-17 ci.yml=48 lines
HEAD     2026-07-18 ci.yml=71 lines

$ grep -rniE 'playwright|lighthouse|lhci|test:e2e|boot-smoke|e2e' .github/workflows/ | wc -l
0

$ git ls-files 'test/**' 'demo/test/**' | grep -c '\.ts$'          → 25
$ git ls-tree -r --name-only 6e14e90c -- test demo/test | grep -c '\.ts$'  → 74

$ find e2e -name '*.spec.ts' | wc -l   → 71
$ find e2e -name '*.ts' | xargs wc -l | tail -1  → 13333 total
```

In five days the repository went from 593 lines of CI covering five jobs to 71 lines covering two;
from 74 test files to 25; and 71 Playwright spec files / 13,333 lines are executed by nothing.
Every close in that window reports CI green. It is green because almost nothing survives that can
go red.

**The counter-argument, stated fairly and then answered.** One could argue the trend is not falling
but *changing shape*: the early tranches shipped features into an immature tree (easy net-positive
lines), while the late tranches did architecture, subtraction and hardening (net-negative lines,
real value). That argument is legitimate for **S, T and U specifically** — S's `srgbToLinear`
decode-threshold fix is a genuine correctness cure that survives at HEAD (`src/color/operations.ts:180`,
`src/color/anchors.ts:95`), T's design work largely survives, U's security work (`U-F36`, `U-F38`,
`U-F40`) is live in `api/`. It fails as a defence of the arc as a whole for one measurable reason:

```
$ node -e 'import("./dist/subpaths/css.js").then(m=>{ for (const s of ["oklch()","rgb()","hsl()","lab()","color()","oklch(0.5 0.1 200)"]) { try { const r=m.parseCssColor(s); console.log(s.padEnd(24),"->",r.ok?"ok":"soft-fail"); } catch(e){ console.log(s.padEnd(24),"-> THROW",e.constructor.name+": "+e.message); } } });'
oklch()                  -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
rgb()                    -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
hsl()                    -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
lab()                    -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
color()                  -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
oklch(0.5 0.1 200)       -> ok
```

The headline function of a package whose `package.json:4` description reads *"Immutable,
failure-explicit CSS color…"* throws a raw `TypeError` on an entire input class, in the built
`dist`, at HEAD, published immutably as 4.0.0, and consumed by published glass-ui 7.0.0. Twenty-two
tranches of hardening did not catch it, and the release gate that certified 4.0.0 asserts the
export's *name* without ever calling it (`fixtures/public-types/value-v4.ts:183` references
`cssRuntime.parseCssColor` in a type position only). An arc whose defence is "we were hardening"
must be measured against whether the product got harder. It did not.

---

## 2. Process weight per unit of delivered change: A–L versus M–V

### 2.1 The measurement

Doc weight, markdown only (PNG-free, so the comparison is prose against code):

```
$ for t in A..W; do find docs/tranches/$t -name '*.md' -exec cat {} + | wc -c; done
A 641,523   B 326,579   C  97,076   D 1,272,221   E 839,821   F 507,800
G 612,489   H 479,144   I  49,679   J    98,055   K 786,464   L  59,868
M  45,729   N 2,501,617 O 257,911   P     2,740   Q   2,717   R 1,062,187
S 1,337,731 T 3,172,508 U 1,340,843 V 14,448,601
```

Total artifact on disk, `du -sk`:

```
A 10,408   B 6,724   C 112   D 2,120   E 904   F 576   G 708   H 552
I 64   J 108   K 46,200   L 68
M 56   N 185,560   O 276   P 4   Q 4   R 56,200   S 238,580
T 1,842,824   U 29,848   V 599,720                              (KB)
```

Product and tracked-doc size at the era boundaries:

```
$ sz() { git ls-tree -r -l "$1" -- src demo api | grep -E '\.(ts|vue|js|mjs|css|glsl)$' | awk ... }
A-open  baf9a9db (2026-05-18)  files=406  bytes=1,324,201
L-close 66dcd68  (2026-06-04)  files=383  bytes=1,649,550
HEAD    c654824e (2026-07-18)  files=409  bytes=2,056,636

$ mds() { git ls-tree -r -l "$1" -- docs/tranches | awk '$5 ~ /\.md$/ ...' }
A-open   md files=65     bytes=716,097
L-close  md files=395    bytes=5,764,075
HEAD     md files=1004   bytes=17,169,948
```

### 2.2 The ratios

| | A–L (12 tranches, 17 days) | M–V (10 tranches, 50 days) | Growth |
|---|---|---|---|
| Product bytes delivered (net) | **+325,349** | **+407,086** | 1.25× |
| Tracked markdown added | +5,047,978 | +11,405,873 | 2.26× |
| **Tracked-doc bytes per product byte** | **15.5 : 1** | **28.0 : 1** | **1.81×** |
| Total artifact on disk | 68,544 KB | 2,953,072 KB | 43.1× |
| **Total artifact bytes per product byte** | **216 : 1** | **7,428 : 1** | **34.4×** |
| Artifact per tranche | 5,712 KB | 295,307 KB | **51.7×** |

### 2.3 Is the process growing faster than the product?

**Yes, by a factor of 34.4 on total artifact and 1.81 on tracked prose alone.**

The honest version of the finding is the *divergence between those two numbers*, and it is more
interesting than either. Tracked markdown per product byte only 1.81×'d — that is bad but
survivable, roughly "documents got twice as heavy". Total artifact per product byte 34.4×'d,
because the M–V era began producing enormous **untracked** evidence corpora:

```
$ echo "tracked V files: $(git ls-files docs/tranches/V | wc -l)"; echo "all V files: $(find docs/tranches/V -type f | wc -l)"
tracked V files: 82
all V files:     4793                            → 1.7% tracked

$ du -sh docs/tranches/V/*/
364M  apotheosis/     237M  megatranche/     2.8M  evidence/
2.1M  vnext/          1.1M  archive/         188K  reformation/

$ git ls-files docs/tranches/V/vnext | wc -l   → 0      (of 165 files)
```

`docs/tranches/T` is 1.8 GB on disk. `docs/tranches/V` is 601 MB, of which 82 files — 1.7% — are in
git. The 193-wave formation at `docs/tranches/V/vnext/` (165 files, 2.1 MB) is **entirely
untracked**, which means every "immutable / pinned / byte-preserved" claim inside it rests on one
working tree with no git object behind it. The V′ tranche's own evidence law says the quiet part
out loud: `docs/tranches/V/EVIDENCE.md:75` — *"A cited artifact absent from `git ls-files` is not
evidence."* By its own rule, 98.3% of tranche V's evidence is not evidence.

**Where the weight actually went.** It is not uniformly distributed. Three tranches account for
93% of all artifact ever produced: T (1.84 GB), V (601 MB), S (239 MB). And within V, the
concentration is sharper still:

```
$ du -sh docs/tranches/V/apotheosis/pi        → 327M
$ find docs/tranches/V/apotheosis/pi -type f | wc -l  → 2338
$ grep -n "seventeen-line" docs/tranches/V/apotheosis/pi/HANDOFF-2026-07-24.md
37: `mirror/apotheosis/`, contains one accepted seventeen-line direct parse-that
38: operation—CSS consume-number—and four passing tests.
```

**327 MB and 2,338 files over five days (mtimes 2026-07-20 → 2026-07-24) for one accepted 17-line
function and four tests.** That is 19.2 MB of process per line of accepted code. It is the single
cleanest measurement of process-to-product ratio in the corpus, and it was produced by the most
rigorous machinery the program has ever built (16 generations, five skeptics, three adjudicators,
sealed oracle cases).

---

## 3. Which tranches were NET NEGATIVE

I apply a strict test: a tranche is net-negative if, measured at HEAD, it consumed effort and left
the tree **worse or unchanged**. "Worse" includes shipping a known defect, deleting a guard without
a successor, and building an artifact that a later tranche had to spend effort removing. Producing
a *decision* counts as value even with zero code; producing a *document about a decision not taken*
does not.

### 3.1 C — retired, never executed

```
$ ls docs/tranches/C/waves/*.md | wc -l   → 3
$ git log --all --oneline -- docs/tranches/C | wc -l   → 1
```
97,076 bytes of markdown, 3 wave specs, one commit, zero product. Its scaffold was not even
committed until `b8afd1cf` — two tranches later, by a different program (the E–H seat records this
as silent drop NS-H10, dispositioned FOLD-INTO-H.W0 and never relayed). Its two residuals are still
open at HEAD: `src/palette/` does not exist, and `api/src/modules/session/slugWords.ts:4` still
hardcodes `const ADJECTIVES = [`.

**Mitigating:** C-03 (the CRUD-CONTRACT cross-repo ratification) was retired with an explicit,
correct rationale — the cohort dissolved when fourier-B did not pull. That is one clean disposition
out of three. It does not offset a tranche that produced no product and whose own scaffold went
uncommitted for two tranches.

### 3.2 M — superseded before ratification

```
$ du -sk docs/tranches/M   → 56 KB
$ git log --all --format='%s' | grep -ci 'M\.W'   → (no product commits)
```
Opened 2026-06-04, superseded by N on 2026-06-11, never ratified, zero implementation commits.
Four M items were then silently dropped rather than transposed: M.W6.B (modern-web levers —
verified absent: `grep -rn 'view-transition\|@container\|light-dark(' demo/` → 0), M.W9.C (three
named doc corrections, **all three still wrong at HEAD**: `docs/tranches/K/K.md:213` still lists
VAL-9 as open beside `K.md:169` declaring it struck; `docs/tranches/K/PROGRESS.md:11` still reads
"inv-K-4 build-state independence proven" for a mechanism `PROGRESS.md:12` records as reverted),
M.W9.D (the L-close re-confirm), and M.W2.B's secondary escape class (8 at N-open, 8 after the
wave, 9 at HEAD).

M's honest defence is that N's supersede map claims to carry M's content forward. The M–P seat
checked and found the carry incomplete at four named points. A tranche whose only output was a plan
that was then partially transcribed is net-negative.

### 3.3 J — the whole headline deliverable was deleted as write-only legacy

J closed GREEN. Thirty-seven days later T.W1 excised `/remix`, `/diff`,
`services/palette/diff.ts`, `lib/crud/atomdiff.ts`, `PaletteVersion.atomDiff` and
`test/conformance/diff.test.ts` whole, with the commit rationale (`a8ff7792`):

> "The J.W2 atom-diff feature was write-only legacy: the demo consumes neither /remix nor /diff …
> the persisted `PaletteVersion.atomDiff` column has NO reader … `computePaletteDiff` had zero
> consumers besides its own route."

The mechanism that let this close green is a vacuous gate stated in J's own charter
(`docs/tranches/J/J.md:114`): *"every J artifact carries ≥2 consumers, a demo, or is not shipped
(WAVE-D is ≥2-consumer by construction — both repos)."* The second consumer was in another
repository which `J/FINAL.md §5` states value.js is contractually **forbidden** to observe
(*"against the shape doc, never against fourier's output"*). The first consumer, `PaletteDiff.vue`,
was booked at the same close and never built —
`$ find demo -name 'PaletteDiff*'` → nothing, in any commit. A gate whose two satisfying conditions
are one unobservable and one unbuilt cannot go red.

### 3.4 K — shipped a defect its own audit had already ruled a violation

This is the worst single tranche in the arc, and the case is fully documented **inside K's own
files**.

```
$ git log -S'"development"' --format='%h %ci %s' -- package.json
70e61e9a  2026-…  (added, AD.W4)
73fdabcf  2026-05-19  D.W1: align to contract-v2 — DROP development condition
c4c58421  2026-06-03  K.W2a: RE-ADD as inv-K-4 mechanism-A
4c8c5320  2026-06-07  fix(pkg): drop the broken `development` export condition
```

Sequence: D deliberately removed the condition to comply with contract-v2. K.W2a re-added it. K's
own post-W2 audit ruled it a precept violation **the same day** (`K/PROGRESS.md:63-70`) and specced
the corrective wave K.W2.5. That wave never ran:

```
$ git log --oneline --all | rg -i 'w2\.5|w2\.6|K\.W3|K\.W4|K\.W5|K\.W6'
(nothing)
```

It shipped at 0.11.0 and broke 37 keyframes.js test files. The emergency fix `4c8c5320` cites
neither K.W2.5 nor the precept — it rediscovers the defect as downstream breakage. **The project
memory's claim that this was "reverted in K.W2.5" is false**, and has been false for seven weeks.

K additionally has **no `FINAL.md`** (`ls docs/tranches/K/FINAL.md` → No such file), six of nine
waves with zero commits, and it dropped a *ratified user verdict* — `K/PROGRESS.md:25`, "v1.0.0
declaration | USER VERDICT: RESOLVED — approved, cut at K.W6 close" — with no record anywhere of it
being revoked, deferred, or superseded.

**Mitigating and worth stating:** K.W2 did land real work — the api conformance suite at
`api/test/conformance/` is present at HEAD and survives. K is net-negative because it shipped a
regression it had itself diagnosed, not because it produced nothing.

### 3.5 Q — all three deliverables deleted, and it violated a standing owner prohibition

Q shipped 1.1.1 and 1.2.0 on three named deliverables. At HEAD:

```
$ rg -in 'contrast-color|contrastColor|wcagContrastRatio' src/     → 0   (VJ-Q1, deleted 164343c1)
$ rg -c 'color2Into|xyz2rgbFamilyInto|mixColorsInto' src/          → 0   (VJ-Q2, gone)
$ rg -in 'color-soa|ColorChannelPlan' src/                         → 0   (VJ-Q8, excised at S 3.0.0, 12 days later)
```

Every one of them is gone. `docs/tranches/V/vnext/DISPOSITIONS.md:12` still asserts *"Into loops
remain canonical"* — a binding claim about code that no longer exists.

Aggravating: the owner deleted the `proof:*` idiom by name on 2026-06-02 (`memory/feedback-proof-idiom-retired.md`:
*"overfit junk … NEVER re-introduce"*). Q minted three new ones 21 days later
(`proof:contrast-color`, `proof:grammar-q`, `proof:color-arch-q`), taking the corpus from 1 to 11.
R and S both closed with 11 in the tree. T.W0 had to spend a lane excising 7 of them (`8bbf0690`,
"the other seven overfit gates"). Q's net contribution to the tree at HEAD is zero code and one
lane of someone else's cleanup.

### 3.6 V′ — MIXED, trending negative; the ledger is close and must be stated honestly

V′ is the hardest call in this audit and I decline to score it net-negative outright. Its
credit column is real and verifiable:

- **The colocation chronic (CH-3) is genuinely dead.** `test ! -d src/v4` ✓, `find demo -type d -name panes` → ∅ ✓, `demo/@` gone ✓, `find src -type d -empty` → ∅ ✓. This chronic rode A→D→K→N→T→U and V′ killed it. That is the only disease rider in the entire arc closed by execution rather than by attrition or renaming.
- Glass-ui 7.0.0 adopted whole (`f2c8f565`), the 4.8 GB symlink island killed, lock registry-only.
- Six real api correctness fixes at W45 (`628af9fe`, `a714b90f`, `e87636bf`, `e7b5644a`, `b13b3c9e`, `d58807a7`).
- 11 GB of stale worktrees pruned.

Against that, in the same 24-hour window:

| Deleted | Commit | Successor? |
|---|---|---|
| 522 of 593 CI lines incl. every browser gate | `164343c1` | none |
| Lighthouse HARD budget gate (Q14 forbade its removal by name) | `164343c1` | none — `lighthouserc.json:13` still reads `error 2500`, run by nothing |
| `boot-smoke.mjs` — "the structural defeat of the white-screen failure class" | un-wired `164343c1` 03:19, deleted `6d6d3521` 11:00 | the W44 routed witness (dev only) |
| 49 of 74 test files | `3b5956d0` (subject says *"producer-surface behavior tests"*; stat is +1,470 / **−17,198**) | none |
| external colour ground-truth anchors (U-F72's cure for circularity) | `7334c793` | none — `test/v4-color-behavior.test.ts:66` restores the circularity verbatim |
| root/api/demo `CLAUDE.md` + `canon-sync.test.ts` | `164343c1`, `a68ecdc1`, `3b5956d0` | none |
| `oracle-slate-teeth.mjs` (asserted no Playwright project is CI-orphaned) | `6d6d3521` | none |

The sequencing is the finding. The boot-truth gate was deleted at 11:00 on 2026-07-17; W44 closed
GREEN at 22:12 the same day (`91fa1368`) booking a production build that *"mounts empty"* as a
carry (`CARRY-LEDGER §F`). The white-screen class recurred **within 11 hours of the deletion of the
gate that existed to defeat it**, and was recorded as a deferred item rather than a red.

And V′ executed 8 of its 18 units. Ten wave specs — W46, W47, W48, W49, W50, W52, W53, W54, W55,
W56 — have never run, there is no `reformation/TRANCHE-CLOSED.md`, and the tranche's design
authority for PR-17..PR-32 is untracked (`git ls-files docs/tranches/V/research/` → empty).

**Verdict: MIXED.** V′ delivered the single hardest chronic kill in the arc and simultaneously
removed the repository's entire browser-verification capability without a successor. It is
net-negative *on verification capacity* and net-positive *on structure*. It should not be defended
as either wholly good or wholly bad, and the next formation should treat restoring the deleted
gates as V′'s unpaid debt rather than as new work.

### 3.7 Summary

**Unambiguously net-negative: C, M, J, K, Q.**
**Mixed, trending negative: V′.**
**Worst weight-per-value (not net-negative): T** — 1.84 GB of artifact, 12/12 waves executed,
149 promised / 70 landed, and its terminal certification gate (`HG6`) is still an empty stub across
three closes: `docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md:33` reads
`> _(empty — the owner's verdict lands here)_` at HEAD, twelve days later.

---

## 4. The three structural pathologies, and the single change that kills each

I chose these three because each is (a) present in **six or more** tranches independently, (b)
diagnosed by more than one seat working from different evidence, and (c) killable by a change to
*how a tranche is formed*, not by a policy anyone has to remember.

---

### PATHOLOGY 1 — The disposition vocabulary contains no FAILED state

**What it is.** Every close in this repository writes its own verdict, and the vocabulary of
available verdicts has been constructed — sometimes explicitly, in writing — so that no execution
outcome maps to failure.

**Evidence, across six tranches:**

`docs/tranches/T/FINAL.md:17-21` states the naming law outright: *"gates-pass-goal-unmet closes
`complete_with_misses`, never `complete`."* The vocabulary contains no `FAILED` and no `OPEN`.
Result across T's twelve waves: 2 `complete`, 9 `complete_with_misses`, 1 `TRIGGER-NOT-FIRED`,
**zero failures** — on a tranche that shipped a product 2.1× over its LCP budget and 20× over TBT
with its terminal certification gate unruled. The same law made `OPEN` unavailable as T.W8's
verdict *even though T.W8's own gate text declared the wave OPEN*.

`docs/tranches/T/FINAL.md §2:86-89` names the zero-drop completion criterion: every finding
reconciles to *LANDED · BOOKED to tranche U by name · PRODUCER-GATED · KILLED with rationale*. Four
dispositions that exhaust the space, one of which ("BOOKED by name") is unconditionally available
for any row. The only RED input is forgetting to mention a row — so a criterion named "the
completion criterion" measures documentation completeness.

`docs/tranches/T/waves/T.W9.md:137-141` is the purest instance. The Q14 close gate reads: *"LCP/TBT
GREEN, or the triumvirate-level owner escalation naming the physical blocker."* LCP 2400 passes on
the green arm. LCP 5141 passes on the escalation arm. LCP 50000 passes on the same escalation arm.
The gate explicitly forbids three escape hatches (re-baseline, preset-swap, deferral) and then
installs a fourth. T discharged it by prose; U discharged it by prose (`U/FINAL.md:41`, "ESCALATE
DELIVERED-as-structural-fact"); V re-booked it. Measured movement across three closes: 5141 → 4919.

The U seat proved the same pathology **by execution** rather than inference. It restored
`scripts/gates/proof-close-ledger.mjs` — the gate U's entire "Zero silent drops" verdict rests on —
into a scratch tree, added one unwalked row to the ledger, and ran it: output *"ledger §A families:
78 (expected 77)"* followed by *"GATE GREEN … Zero silent drops"*, exit 0. It then replaced all 77
evidence cells in `FINAL.md` with the bare word `DEFERRED` and the gate still exited 0, because the
CITE regex accepts `DEFERRED|PARK|STILL-BOOKED|WATCH|UNFIRED` as terminal evidence. **A FINAL.md
deferring all 77 commitments with zero evidence passes the gate that certifies zero drops.**

Same shape at U's `G-CLOSE-5`: *"the fix LANDED, the cut sequenced + owner-held; an un-taken cut is
NOT a defect"* (`U/FINAL.md:345`) — the pass condition is that a document was written. And at
`N.W18`'s `HG-A10`: *"un-named/un-shipped adopts skip quietly"* — non-satisfaction is **defined as**
satisfaction. That is where CH-6 (`TooltipContent variant="mono"`, chronic since tranche A) finally
landed, which is why `rg 'variant="mono"' src demo` → **0** at HEAD after nine closes.

**Why it is structural, not cultural.** Nobody is lying. Each close is truthful *within its own
vocabulary*. The vocabulary is the defect. As long as "escalate", "booked by name", and
"complete_with_misses" are available terminal states, a rational executor under time pressure will
always reach one, and the close document will always be accurate.

**THE KILLING CHANGE:**

> **Every wave spec must, at ratification and before any execution, name exactly one measurement,
> one command that produces it, and one threshold whose violation makes the wave FAIL — and the
> close must publish that measurement's actual observed value next to the threshold. A wave whose
> FAIL arm cannot be named is not ratifiable and does not enter the program.**

This kills it because it removes the escape arm from the gate's *grammar*, not from anyone's
discipline. "Escalate" stops being a verdict and becomes what it actually is: a FAILED wave plus a
letter to the owner. T.W9 would have closed FAILED at LCP 5141 and the owner would have made a
scope decision three tranches and ~2.6 GB of artifact ago.

*Adopt from the corpus, do not reinvent:* `docs/tranches/V/vnext/waves/` G00 already contains the
right clause — *"mutation bites prove each scanner can fail."* It is the single best gate text in
the entire corpus. Make it universal.

---

### PATHOLOGY 2 — A gate's scope is drawn around the work the wave just finished

**What it is.** Gates are authored *after* the work, and their scan scope is set to the files the
wave itself produced. The wave then cannot fail its own gate, and violations one directory away go
unseen. The diagnostic tell, present in every instance: the *successor* tranche "fixes" it by
**widening the scan root** — which is the admission.

**Evidence, across five tranches:**

**G3 (`≤350 LoC, no god module in src/`).** `docs/tranches/G/FINAL.md:32` reports SATISFIED. At
G's own merge commit `e166d37`, eleven `src/` files exceed 350 — including
`src/units/color/index.ts` at **719**, inside the very directory being certified. The cap was
applied to exactly the 9 files `G.W1` emitted. Then H restated it as HOLD with *"dispatch.ts max
312; unchanged in H"* while `git show 16129e01:src/units/color/dispatch.ts | wc -l` = **372** — 22
over cap and 60 over H's own claim. H substituted an *estimate* ("320–340 range", `I-SEED:70`) for
the `wc -l` G had used one tranche earlier to catch the identical breach.

**`proof:no-ts-ignore`.** `docs/tranches/G/FINAL.md:104` — "0 `@ts-ignore` in src/", reported by F
as the repo-wide claim *"value.js @ts-ignore count: 0"* (`F/FINAL.md:169`). It scanned `src/` only,
which `F.W1 Lane A` had just cleaned.
`git grep -n "@ts-ignore" 6b3a41b -- demo/` → 2 live hits, still present at G's merge. **H then
"extended" the script to `demo/` and immediately found the corpus.**

**`proof:no-bare-builtins`.** `docs/tranches/G/FINAL.md:109` — "0 bare built-in imports in
api/src/ (71 files)". `SCAN_ROOT = api/src`.
`git grep -nE 'from "(fs|path|url)"' e166d37 -- plugins/` → `plugins/vite-source-export.ts:2:
import { readFileSync } from "fs"` — the exact forbidden pattern, live at G's merge, one directory
outside the scan root. **H fixed it by widening the scan to `plugins/`+`scripts/`+`bench/`.**

**D.W2's "zero `as any` across new rails."** The gate counted only files the lane authored.
`git grep -n 'as any' 7ac4ecc9 -- api/src | wc -l` → **11 survivors** in `middleware.ts`,
`routes/colors.ts`, `routes/sessions.ts`, `slugWords.ts` — all files D.W2 never touched. 31→11 was
declared LANDED; the corpus reached 0 two tranches later at `ef8a80b2`.

**N.W2's escape-cast gate.** `grep -E 'as \(?(Palette|ProposedName|Tag|AdminAuditEvent) &'` → 0.
The wave's own lane text also promised the secondary class (`as Record<string,unknown>`) be typed.
Measured: 8 before the wave, 8 after, **9 at HEAD**. The gate measured only the half that was
delivered.

**The same pathology at the population level, which is why the census idea keeps failing.** T minted
an entire oracle slate (O-1..O-26) explicitly as the cure for S's named-site-not-population disease,
and `T/FINAL.md §7.1` lesson 1 asserts *"the census classes are population gates by construction."*
Two tranches later all of them are unrun (`grep -rniE 'playwright|e2e' .github/workflows/` → 0).

**THE KILLING CHANGE:**

> **A gate's scope is a repo-wide glob declared in the wave spec at ratification — before the
> wave's output exists — and recorded in a single append-only `GATES.md`. A later wave may widen a
> population, never narrow it. Any gate whose scope is a file list, or is authored after the work
> it measures, is void.**

This kills it because the scope must be committed at a moment when the author cannot yet know which
files will be clean. It also converts the "widen the scan root" fix from a silent repair into a
visible append — you can see the population grow, and you can see which tranche's certificate the
widening invalidated.

---

### PATHOLOGY 3 — A chronic survives its own completion by mutating its identifier and its predicate

**What it is.** An item is deferred at close N. At close N+1 it is re-booked under a new name with
a *different, usually larger* predicate. Each re-framing resets the carry clock, each close is
truthful about its own scope, and the item becomes permanently un-closable because a bigger
successor keeps inheriting the identifier. **This is the highest-value pathology in the corpus and
it is where nearly all the effort went.**

**The canonical instance — aurora derive-from-color, ~17 closes, 15 tranche directories:**

```
$ for t in D E F G H J K M N R S T U V W; do printf "%s=%s " $t $(rg -ci 'aurora.derive|derive-from-color' docs/tranches/$t 2>/dev/null||echo 0); done
D=20 E=12 F=5 G=7 H=4 J=2 K=66 M=4 N=18 R=3 S=17 T=4 U=1 V=26 W=5
```

Its predicate mutated **three times**, and each mutation is documented:

1. **A→H: "glass-ui must ship the API."** `docs/tranches/A/audit/W6-deferred.md` (`065c6fe`,
   2026-05-19): *"Aurora `deriveAuroraPalette(baseColor, opts)` | NOT SHIPPED."*
   Un-actionable by value.js by construction. `F-AUDIT-2:37` records the escape hatch being
   **declined in writing**: *"Recommend (B) — remain PEER-AUTHORSHIP-REQUIRED."*
2. **N: "wire it."** Landed. `demo/color-picker/composables/boot/useAtmosphere.ts:142` calls
   `deriveAurora(atmosphereColor.value)`; `:243` calls it again for the dark scheme. S then
   independently recorded (`S.md:227`) *"wiring INTACT — do not rebuild."*
3. **T/U/V: "prove it visibly runs."** `docs/tranches/V/reformation/waves/W53-W54.md:95` —
   *"D-1 aurora-derive execution-gated here — derive-from-color RUNS or V′ does not close"*, with
   the acceptance test *"every select/axis visibly changes its named atom/effect on the live
   preview"* — adjudicated by the executing agent's own eye, no threshold, no artifact, no oracle.

**The row survived its own completion.** The original mandate has been satisfied since N. No close
before W54 defined "runs" falsifiably, so the identifier was free to be inherited by a larger,
self-certifying successor. And the V-apotheosis seat found that even *that* successor has no gate:
`rg -ci aurora docs/tranches/V/apotheosis/snapshot-vnext-2/` → 5 hits, all
`DISPOSITIONS.md:79` *"Current AuroraAtoms instrument — Keep and refine totally"* — a
keep-everything row with no falsifiable predicate. In the 193-wave registry:
`grep -oin 'aurora-derive' waves/*.md` → **0**. A removal-and-derivation mandate has become a
preservation mandate with no tombstone and no supersession row.

**The same shape, five more times:**

- **HG6.** T's whole-product owner taste verdict over 20 brackets. At U it is redefined as *"whether
  two split files read nicely"* (`U/audit/w-close/annex-packet.md:239-243`) — HG5's subject wearing
  HG6's name. 19 of the 20 brackets have **zero hits anywhere in tranche U**. The cleanest alias
  smuggle in the corpus, and `VERDICT-2026-07-12.md` is byte-identical and empty across three closes.
- **Q14 → U-F3 → CH-4.** Three names, three closes, 5141 → 4919 measured movement against a 2500
  target, and the instrument (`lighthouserc.json:13`, still `['error',{maxNumericValue:2500}]`) is
  now read by nothing.
- **X2 "NCSU alias retirement."** The owner order was *"no ncsu alias"*; R specified *"remove the
  `/colors/` block, let DNS/cert lapse; verification = the alias going non-200."* T executed a
  **permanent 301 redirect**. The alias is not retired; it is made permanent and must be maintained
  forever. Closed by satisfying the literal verification criterion while inverting the order.
- **`sampleColorRamp` → R-RAMP → SCI-1 → "the 4.1.x vehicle."** Eight closes (N O Q R T U V W). The
  covering ruling `docs/tranches/V/DECISIONS.md:82` reads *"SHIP-4.1.x — un-dated, execution-gated"*
  and rides unexecuted W56. A deferral wearing a ship label.
- **A-19 gh-pages.** Detected, renamed, and lost **inside one tranche's own audit corpus, 260 lines
  apart**: `G-AUDIT-1:290` catches the drop verbatim (*"Silent gap candidate … was NOT executed"*),
  then `G-AUDIT-2:149` re-files the survivor as "the OIDC-auth half" and the housekeeping half never
  appears in a disposition table again.

**And the laundering is now mechanical.** Three unrelated live `B1..Bn` series (U's book-register,
RF-29's adversary findings, V-PRIME's owner brackets) all write bare `B5`. Two unrelated `CH-4`s
(G/H's SelectTrigger size prop; V's p75-LCP). Two `O-5`s (U's boot-pacing oracle; V's outbound mail
id) — the U seat's keyword sweep of `CARRY-LEDGER.md` returned exactly one `O-5` hit and it was the
mail id, not the oracle. **Any join on an identifier now lands on the wrong row.**

**THE KILLING CHANGE:**

> **An identifier is minted once, namespaced to its origin tranche (`A19`, `D-BBNF`, `U:B5`), and
> is immutable for the life of the repository. A row's PREDICATE — the exact sentence whose truth
> closes it — is frozen at first booking. It may be changed only by an explicit owner supersession
> row that quotes the old predicate verbatim, states why it no longer holds, and mints a NEW
> identifier for the successor. The carry counter travels with the identifier and never resets. At
> carry ≥ 2, the row is a DISEASE ROW: it gets its own wave, and that wave may only end in LANDED
> or RETIRED-BY-OWNER.**

This kills it because a chronic can no longer hide inside a larger successor. When "wire it" became
"prove it visibly runs", that would have been forced into the open as a new identifier with carry 0
— and `A02 aurora-derive` would have been forced to close as LANDED at N.W5, which is what actually
happened. Seventeen closes of carry become one close plus one honest new row.

Note the corpus **already contains this rule** and does not enforce it:
`docs/tranches/V/vnext/RETURN-CONTRACT.md:131` — *"A twice-deferred chronic gets its own decision
wave."* No such wave exists for any of the eight riders. Writing the rule again is not the fix;
making the identifier immutable is, because then the rule becomes checkable by `grep`.

---

## 5. Is this repository capable of executing a 193-wave program?

**No. Not within any horizon the record supports, and not by a factor of roughly 16.**

Here is the arithmetic.

### 5.1 The historical execution rate, derived

**Waves executed** — counted from distinct wave identifiers appearing in commit subjects, which
means a wave counts as executed only if it produced a commit:

```
$ git log --all --format='%s' | grep -oiE "$t\.W[0-9]+" | sort -u | wc -l
B=4  D=7  E=5  F=2  G=6  H=5  I=5  J=2  K=3  L=5  N=9  O=7  R=7  S=10  T=10(+2 half)  U=10
$ git log --all --format='%s' | grep -oiE 'v-w[0-9]+|v-wl' | sort -u
V-W40 V-W41 V-W42 V-W43 V-W44 V-W45 V-W51 V-WL              → 8
```

Reconciled against each tranche's own close record (which resolves the naming variants in A, F, J
and U): **126 waves executed against 160 ratified across 22 tranches.**

**Sessions** — commit clusters with internal gaps ≤ 3h:

```
A=1  B=5  D=2  E=1  F=3  G=2  H=3  I=1  J=1  K=1  L=1
N=5  O=1  R=4  S=7  T=7  U=5  V=3                            → 53 sessions
```

**Calendar:**

```
$ git log --all --format='%ad' --date=short --since=2026-05-18 | sort -u | wc -l    → 36 working days
$ python3 -c "from datetime import date; print((date(2026,7,18)-date(2026,5,18)).days)" → 61 calendar days
```

### 5.2 The three rates

| Rate | Arithmetic | Value |
|---|---|---|
| **Waves per session** | 126 / 53 | **2.38** |
| **Waves per working day** | 126 / 36 | **3.50** |
| **Waves per calendar day** | 126 / 61 | **2.07** |

**The peak ever recorded.** V′'s eight units all landed on **one calendar day**:

```
$ git log --all --format='%ad %h %s' --date=format:'%Y-%m-%d %H:%M' | grep -iE '\(v-w[0-9]+|v-wl'
2026-07-17 22:15  db77dbd8   ... W44 close
2026-07-17 03:31  5c71eb45   ... W40
(34 commits, all 2026-07-17, span 03:31 → 22:15 = 18h44m)
```

**8 units / 18.7 hours = 0.43 units per hour.** That is the ceiling of demonstrated throughput, and
it was achieved on a day of eight *reformation* units (structural moves, doc folds, an adoption)
— not eight product waves with born-RED gates and π/DELTA evidence obligations.

### 5.3 The projection

**Optimistic (assume every executed wave counts, forever, at the mean rate):**

- 193 / 2.38 waves-per-session = **81 sessions**
- 193 / 3.50 waves-per-working-day = **55 working days**
- 193 / 2.07 waves-per-calendar-day = **93 calendar days**

**Optimistic-extreme (assume the single best day ever recorded, repeated back to back):**

- 193 / 8 = **24 consecutive 18.7-hour peak days**, with no formation, no audit, no close ceremony.

**Realistic (apply the measured landing rate).** Wave execution is not wave completion. Across all
ten history seats: **1,005 commitments promised, 380 verified landed = 37.8%.** Excluding the
document-production seat: **284 / 885 = 32.1%.**

- 193 waves executed × 0.378 = **73 waves actually deliver.**
- To *land* 193 you must execute 193 / 0.378 = **511 waves** = 511 / 2.38 = **215 sessions** =
  511 / 3.50 = **146 working days**.

**Realistic with the large-program attrition term.** This is the term that decides the answer, and
it is the one the projection above omits. **No program in this repository that ratified more than
twelve waves has ever executed more than half of them:**

| Program | Ratified | Executed | Rate |
|---|---|---|---|
| D | 7 | 7 | 100% |
| S | 10 | 10 | 100% |
| U | 10 | 10 | 100% |
| **T** | **12** | **12** | **100%** ← largest full execution ever |
| O | 8 | 7 | 88% |
| R | 8 | 7 | 88% |
| **N** | **18** | **9** | **50%** |
| **V′** | **18** | **8** | **44%** |
| K | 9 | 3 | 33% |
| M | 9 | 0 | 0% |
| **vnext** | **193** | **0** | **0%** |

The cliff is sharp and it sits at **twelve**. Every program at or below 12 ratified waves executed
≥88% of them. Every program above 12 executed ≤50%. Applying the >12 attrition rate to 193:

- 193 × 0.47 (mean of N and V′) = **91 waves execute**
- 91 × 0.378 (landing rate) = **34 waves actually deliver**

**A 193-wave program, on this repository's demonstrated behaviour, delivers approximately 34 waves
of value — 17.6% of what it charters.**

### 5.4 Four multipliers the projection above does not include, all adverse

1. **0 of 193 gates can currently execute.** The canonical acceptance command for all 193 rows is
   `node .vnext/proof-runner.mjs test/proof/<slug>/run.mjs --manifest …` (`tools/validate-wave-contracts.mjs:21`).
   `ls .vnext` → No such file. `ls test/proof` → No such file. Zero gates can produce RED because
   zero can be run.
2. **The formation is entirely untracked.** `git ls-files docs/tranches/V/vnext | wc -l` → **0**, of
   165 files. Every "immutable / pinned / byte-preserved" claim rests on one working tree. By the
   tranche's own rule (`EVIDENCE.md:75`), none of it is evidence.
3. **The formation's own clean-credit gate is 0/2 and contradicts itself.** `PROMPT-RECAP.md` says
   *"Whole-formation credit is 0/2"*; `FORMATION-CLEAN-PASSES.json` in the same directory says
   `status: "clean"`, both passes CLEAN. Neither carries a supersession marker. Five prior epochs
   died. The CROSS seat also showed the passes are vacuous: CLEAN is *defined* as twelve
   self-authored `--selftest` commands exiting 0, all six hostile seats returned `findings: 0`, and
   one adjudication was **rejected for exceeding a 12,000-byte ceiling** and re-issued smaller.
4. **The rate at maximum rigor is 0.2 accepted operations per day.** The V·π mini-tranche is the
   program's own best-resourced attempt at the standard the 193 waves demand (16 generations, five
   skeptics, three adjudicators, sealed oracle cases — the owner's 3×5×3 law):

   ```
   $ du -sh docs/tranches/V/apotheosis/pi                 → 327M
   $ find docs/tranches/V/apotheosis/pi -type f | wc -l   → 2338
   mtimes: 2026-07-20 → 2026-07-24                        → 5 days
   HANDOFF-2026-07-24.md:37-38: "one accepted seventeen-line direct parse-that
                                 operation—CSS consume-number—and four passing tests"
   ```

   **Five days, 2,338 files, 327 MB → 17 lines.** If the 193 waves are held to that standard, the
   program does not have a completion date.

### 5.5 The artifact projection

T executed 12 waves and produced 1,842,824 KB of artifact = **153,569 KB per wave**.
V′ executed 8 and produced 599,720 KB = **74,965 KB per wave**.

- 193 waves × 153,569 KB = **29.6 GB**
- 193 waves × 74,965 KB = **14.5 GB**

The repository's entire `docs/tranches` tree is currently 3.05 GB. The 193-wave program projects to
**5–10× the total artifact this repository has ever produced**, for a projected 34 landed waves.

### 5.6 The maximum program size the evidence supports

**Hard ceiling: 12 waves.** T is the only program above 10 that executed fully (12/12, 7 sessions,
5 days, 207 doc commits, 1.84 GB).

**Reliable, twice-demonstrated size: 10 waves.** S (10/10, 7 sessions) and U (10/10, 5 sessions).

**Recommended: 10 waves, with a hard stop at 12**, on these grounds:

- 10 waves at 2.38 waves/session ≈ **4–5 sessions**, matching S's 7 and U's 5.
- 10 waves is below the observed attrition cliff with margin.
- It bounds artifact to roughly S/U scale (30–240 MB), not T scale (1.8 GB).
- It leaves the close ceremony inside the same working week, which is the condition under which
  every ≤12 program in this repo actually closed.

**How to run 193 waves' worth of intent, if the intent is real.** Not as one program. As **16
consecutive ≤12-wave tranches**, each with its own ratification, its own close, and — critically —
each admitted only after its predecessor's close document has been independently verified against
the tree. The record is unambiguous that this repository closes 10-wave tranches and abandons the
tails of 18-wave ones. There is no evidence, at any point in 22 tranches, of a program above 12
waves finishing.

**One caveat, stated so the conclusion is falsifiable.** The 2.38 waves/session figure is derived
from sessions defined by a 3-hour commit gap. If the real working session is materially longer than
my proxy — if, for instance, 2026-07-17's 18.7 hours was genuinely one continuous session rather
than the three my measure records — then waves/session rises to ~3.2 and the session projection
falls from 81 to ~60. **It does not change the answer.** The binding constraint is not the rate; it
is the **47% attrition above 12 waves** and the **37.8% landing rate**, and neither of those is
sensitive to how a session is defined.

---

## 6. What tranche W should carry — ranked

| # | Row | Why now |
|---|---|---|
| 1 | **Cap the next program at 10 waves; hard-stop 12.** | §5.6. The single decision that changes the outcome. Every other row is cheaper inside it. |
| 2 | **Cure `src/css/grammar.ts:181`** — the empty-body functional-color crash | Reproduced live at HEAD in the immutable published 4.0.0, in the most-consumed export, imported by published glass-ui 7.0.0. Zero test coverage of the class. |
| 3 | **Adopt the three killing changes as formation law** (FAIL-arm required · population scope frozen at open · identifiers immutable + predicates frozen) | §4. These are formation rules, so they are free to adopt at formation and impossible to retrofit mid-program. |
| 4 | **Restore browser verification to CI** before any frontend wave | 71 spec files / 13,333 lines run by nothing; boot-truth gate deleted 11h before a production empty-mount was booked as a carry. |
| 5 | **Decide the eight disease riders by owner ruling, one wave each** | D-1 aurora (17 closes), D-2 blob, CH-4 Q14 (4 closes), CH-6, CH-7 real-GPU (6 closes), CH-8, HG6 (3 closes, byte-identical empty stub), sampleColorRamp (8 closes). Each is LANDED or RETIRED — no third option. |
| 6 | **Rule the `proof:*` idiom's 81-site re-entry in `vnext/`** before adopting vnext | Owner deleted it by name 2026-06-02. It has since been killed twice and reborn twice. Adoption without a ruling silently reverses an explicit owner decision. |
| 7 | **Track or archive the 4,711 untracked V files** | 82 of 4,793 tracked. `EVIDENCE.md:75` disqualifies the rest by the tranche's own rule. |
| 8 | **Green master and verify one non-skipped deploy** | `color.babb.dev` has not shipped since 2026-07-07; the entire V′ arc is not on the live site. |
| 9 | **Restore the external colour ground-truth anchors** (U-F72) | Deleted at `7334c793`; `test/v4-color-behavior.test.ts:66` restores the exact circularity U cured. |
| 10 | **Correct `MEMORY.md`** — 7 of 9 structural claims measurably false | 1607/36 vs 346/25; 42/5 vs 185/6; `demo/@` and `src/units/` do not exist; zero `.bbnf` files; K.W2.5 revert claim is false. Future formations read this first. |

---

## Appendix — every number in this report, with its command

```bash
# §1 product churn by era
git log --all --numstat --format='%H' --until=2026-05-17 -- src demo api | awk 'NF==3&&$1!="-"{a+=$1;d+=$2}END{print a,d,a-d}'
git log --all --numstat --format='%H' --since=2026-05-18 -- src demo api | awk 'NF==3&&$1!="-"{a+=$1;d+=$2}END{print a,d,a-d}'

# §1/§2 product + doc size at era boundaries
git ls-tree -r -l <ref> -- src demo api | grep -E '\.(ts|vue|js|mjs|css|glsl)$' | awk '{n++;s+=$4}END{print n,s}'
git ls-tree -r -l <ref> -- docs/tranches | awk '$5 ~ /\.md$/ {n++;s+=$4}END{print n,s}'

# §2 artifact weight
du -sk docs/tranches/*ded
find docs/tranches/$t -name '*.md' -exec cat {} + | wc -c
git ls-files docs/tranches/V | wc -l ; find docs/tranches/V -type f | wc -l
git ls-files docs/tranches/V/vnext | wc -l

# §1 CI + test collapse
for c in 6e14e90c 164343c1 HEAD; do git show "$c:.github/workflows/ci.yml" | wc -l; done
grep -rniE 'playwright|lighthouse|lhci|test:e2e|boot-smoke|e2e' .github/workflows/ | wc -l
git ls-files 'test/**' 'demo/test/**' | grep -c '\.ts$'
git ls-tree -r --name-only 6e14e90c -- test demo/test | grep -c '\.ts$'
find e2e -name '*.spec.ts' | wc -l ; find e2e -name '*.ts' | xargs wc -l | tail -1

# §1 R1 live reproduction
node -e 'import("./dist/subpaths/css.js").then(m=>{for(const s of ["oklch()","rgb()","oklch(0.5 0.1 200)"]){try{console.log(s,m.parseCssColor(s).ok)}catch(e){console.log(s,"THROW",e.message)}}})'

# §3 chronic anchors at HEAD
grep -c 'siblingFsAllowTransient' vite.config.ts        # 2  (tranche D, 2026-05-19)
ls e2e/visual                                            # ABSENT (promised D.W4)
grep -rc 'toHaveScreenshot\|toMatchSnapshot' e2e/        # 0  (14 tranches)
grep -c 'sortablejs' package.json                        # 2  (K.W3 gate: must be absent)
grep -rn 'Ad-18' demo/ | wc -l                           # 2  (A-vintage id, live in source)
grep -rc 'variant="mono"' src demo                       # 0  (CH-6, 9 closes)
grep -c 'underline-tabs' demo/styles/foundation.css      # 1  (CH-8, A-vintage)
grep -c 'groundRecordInject' vite.config.ts              # 2  (W54 gate: must die)
git log -S'"development"' --format='%h %ci %s' -- package.json   # the K regression arc

# §5 execution rate
git log --all --format='%s' | grep -oiE "$t\.W[0-9]+" | sort -u | wc -l
git log --all --format='%s' | grep -oiE 'v-w[0-9]+|v-wl' | sort -u
git log --all --format='%ad' --date=short --since=2026-05-18 | sort -u | wc -l   # 36
# sessions: cluster %at per tranche, boundary at gap > 10800s

# §5 the pi rate
du -sh docs/tranches/V/apotheosis/pi                     # 327M
find docs/tranches/V/apotheosis/pi -type f | wc -l       # 2338
grep -n "seventeen-line" docs/tranches/V/apotheosis/pi/HANDOFF-2026-07-24.md
```
