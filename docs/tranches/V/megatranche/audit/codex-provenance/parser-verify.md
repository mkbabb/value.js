# Codex provenance audit — PARSER LANE: hash + arithmetic verification

Lane: parser hash/arithmetic verification
Auditor: Claude (Opus 5), one lane of the M-21 provenance fleet
Date executed: 2026-08-03
Subject: Codex-authored parser/CSS pause + resurrection packets and the
performance-law arithmetic they carry.

Method: every claim below was re-derived from bytes on disk with `shasum`,
`stat`, `git`, and independent Python re-computation over the sealed raw
artifacts. No Codex-authored summary was accepted as evidence for its own
number. Nothing was written outside this file. No `git add/reset/clean/checkout`
was run in any repo. `~/.codex/**` and `~/Documents/Codex/**` were read and
hashed only.

**Environment caveat (material to §2 and §5).** macOS TCC granted this session
read access to `~/Documents/Codex/**` for roughly the first third of the lane
and then revoked it. All `~/Documents/Codex` results in §1 were captured while
access was live and are reproduced verbatim from command output. Checks that
later required that root are marked `UNVERIFIABLE-THIS-SESSION` rather than
passed or failed. `~/.codex/worktrees/**` remained readable throughout.

---

## 0. Verdict

| Item | Result |
|---|---|
| §9 checklist 1 — pause-handoff SHA | **PASS**, exact |
| §9 checklist 2 — `BUILD-V12.py` SHA + identity | **PASS**, exact |
| §9 checklist 3 — `__pycache__` residue SHA + identity | **PASS**, exact |
| §9 checklist 4 — v12 target absence | **PASS**, absent |
| Item 5 — 6 further hash claims | **5 PASS / 1 SEVERE drift** (+2 cascading receipt failures found) |
| Item 6 — candidate-side attribution (3 numbers) | **PASS**, all three reproduce to the microsecond |
| Item 6 — the `1,870,633 µs` denominator | **FAIL — unreceipted and unreproducible (SEVERE)** |
| Item 6 — P3 KILL rows `1.0656–1.5238×` | **PASS**, all 36 ratios recomputed exactly from raw batches |
| Item 6 — A3 KILL rows `0.9208–1.0390×` | **PASS**, all 7 ratios recomputed exactly to full float precision |

Headline: **the parser lane's evidence discipline is, with one exception,
unusually good — three of the four load-bearing profile numbers reproduce
byte-exactly from the sealed `.cpuprofile` under clean, guessable rules, and
every published ratio recomputes from banked raw batches. The one exception is
the single most load-bearing number in the whole lane: the denominator
`1,870,633 µs`, from which the `10x`, `3x` and `2x` budgets in the Value-side
performance-law amendment are all divided.** It does not reproduce, it has no
primary receipt in either repository, and my best independent reconstruction
puts it **14.3% high**.

---

## 1. Pause-handoff §9 checklist, executed literally

### 1.1 Item 1 — pause handoff hash

```
$ shasum -a 256 /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md
ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7  .../PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md
$ wc -c ...
   10205
```

Expected `ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7`.
**MATCH.**

### 1.2 Item 2 — `BUILD-V12.py`

```
$ shasum -a 256 ~/Documents/Codex/2026-08-02/parser-novelty-v12-construction/BUILD-V12.py
0732ebc27bc712d64d0b6ade30db13b9d8c7817524268af7d3d7474654b64ee8  .../BUILD-V12.py
$ stat -f '%N size=%z mode=%OLp nlink=%l mtime=%Sm' ...
.../BUILD-V12.py size=243827 mode=644 nlink=1 mtime=Aug  2 13:19:15 2026
```

Handoff §3.2 claims SHA-256 `0732ebc27bc712d64d0b6ade30db13b9d8c7817524268af7d3d7474654b64ee8`,
`243,827 bytes; mode 0644; nlink 1`. **MATCH on all four fields.**
Full actual hash recorded above as requested.

### 1.3 Item 3 — preserved `__pycache__` residue

```
$ shasum -a 256 .../parser-novelty-v12-construction/__pycache__/BUILD-V12.cpython-314.pyc
de1d62ff18da4851968136b1e3190c00f6c463b9b8a5e7b5d23103155cc00937  .../BUILD-V12.cpython-314.pyc
$ stat -f '%N size=%z mode=%OLp nlink=%l mtime=%Sm' ...
... size=154221 mode=644 nlink=1 mtime=Aug  2 11:36:36 2026
```

Handoff claims `de1d62ff18da4851968136b1e3190c00f6c463b9b8a5e7b5d23103155cc00937`,
`154,221 bytes; mode 0644; nlink 1; creator unknown`. **MATCH on all four
fields.** The residue was not touched.

Observation worth crediting: the `.pyc` mtime (`11:36:36`) *precedes* the
builder mtime (`13:19:15`), so the residue is a compile of an **earlier**
`BUILD-V12.py` revision, and CPython does not normally emit `__pycache__` for a
script run as `__main__` — meaning something *imported* the builder. The
handoff does not paper over either fact; it labels the residue "creator
unknown", classifies it as evidence, and forbids its removal (§3.2, §7). That
is the correct disposition for an artifact whose provenance is genuinely
unknown, and it is the opposite of contrivance.

### 1.4 Item 4 — v12 target absence

```
$ test -e /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12 && echo PRESENT || echo ABSENT
ABSENT (as expected)
$ ls -d /Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12
ls: ...: No such file or directory
```

Directory listing of `~/Documents/Codex/2026-08-02/` confirms
`parser-novelty-and-experiment-v1` … `-v11` exist and `-v12` does not, while
`parser-novelty-v12-construction` does. **ABSENT as the handoff requires.** The
handoff's derived conclusion — "The absent target means no generated packet,
parser run, experiment, review, or acceptance exists" — is therefore sound.

---

## 2. Item 5 — further hash claims, spot-verified

### 2.1 The canonical packet (`988d5394…`) — PASS

```
$ shasum -a 256 -c docs/tranches/V/megatranche/RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256
docs/tranches/V/megatranche/CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md: OK
docs/tranches/V/megatranche/PARSER-RESURRECTION-HANDOFF-2026-07-31.md: OK
docs/tranches/V/megatranche/RESURRECTION-HANDOFF-MANIFEST-2026-07-31.json: OK
docs/tranches/V/apotheosis/pi/HANDOFF.md: FAILED
docs/tranches/V/megatranche/formation/CROSS-REPO-MOBILE-SAFARI-KRONECKER-AUDIT-LAW-2026-08-01.md: OK
/Users/mkbabb/Programming/parse-that-css-totality/docs/tranches/B/PARSER-RESURRECTION-HANDOFF-2026-07-31.md: OK
shasum: WARNING: 1 computed checksum did NOT match
```

The canonical parse-that packet verifies at
`988d539431168a6cabbbc8a97a12da3c62a1c113032b84b58eecfbe5f9d03d3d`, and its
claimed identity holds exactly:

```
$ stat -f '%N size=%z mode=%OLp nlink=%l' .../parse-that-css-totality/docs/tranches/B/PARSER-RESURRECTION-HANDOFF-2026-07-31.md
... size=11632 mode=644 nlink=1
```
(claimed "11,632 bytes, mode 0644, nlink 1"). **PASS.**

### 2.2 The pause handoff's two pinned authorities — PASS

```
$ shasum -a 256 /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7  ...
$ shasum -a 256 /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md
aa891714b3b6bb3386afda45201b203ac5aa1f2ef028466f303831197e992767  ...
```

Both **MATCH** handoff §3.1 and §3.3 exactly.

The matrix's `14/34 = 41.18%` claim is also internally sound: the file names
exactly 20 distinct open cell IDs (`P01–P09` = 9, `C01–C08` = 8, `Q01–Q03` = 3),
34 − 20 = 14, and 14/34 = 41.1764…% → 41.18%.

```
$ grep -oE '\b[PCQ][0-9]{2}\b' VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md | sort -u | wc -l
      20
```

The DREI-v11 block in handoff §3.3 also checks out arithmetically:
188 controls → 188 × 187 = **35,156** ordered non-owner pairs, exactly as
stated; 183 parsed + 5 raw = 188.

### 2.3 The manifest's own dependency pin (`0cc04422…`) — PASS

```
$ shasum -a 256 /Users/mkbabb/.codex/worktrees/7e28/.../RESURRECTION-DEPENDENCY-SAFE-BOUNDARY-2026-08-01.md
0cc044228f902c0f7c95c817643aff655240c0afce4c184c6bf53d596d8f76ab  ...
```
**MATCH** `RESURRECTION-HANDOFF-MANIFEST-2026-07-31.json` →
`repos.value.latestDependencyReceipt.sha256`.

### 2.4 The 2026-08-02 pause-checksums file, 65/65 replay claim — PASS (re-run as 75/75)

```
$ shasum -a 256 -c docs/tranches/V/megatranche/coordination/CONSTELLATION-AUDIT-PAUSE-CHECKSUMS-2026-08-02.sha256 | grep -c ': OK$'
75
$ ... | grep -c 'FAILED'
0
$ wc -l  # rows
      75
```

**All 75 rows replay GREEN.** The "65/65" claim
(`CONSTELLATION-CURRENT-ELIGIBILITY-TYPED-DAG-V8-REVIEW-A-2026-08-03.md:18`,
`…-V8-INTEGRATION-AUDIT-2026-08-03.md:22`) refers to the file's pre-integration
65-row state; the V8 integration then appended exactly 10 rows
(5 × `VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-*`, 5 × `…TYPED-DAG-V4-V7/V8-*`),
65 + 10 = 75. That accounting is honest, self-disclosed
("which replayed 65/65 **before these integration writes**"), and my superset
re-run substantiates it. **The replay claim survives.**

### 2.5 SEVERE — `docs/tranches/V/apotheosis/pi/HANDOFF.md` breaks its frozen pin

| Source of pin | Pinned SHA-256 | Pinned bytes |
|---|---|---|
| `RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256:4` | `4775251edb3dd95023be32602482861b53972fbb0af9cc1610dd22394eefaffc` | — |
| `RESURRECTION-HANDOFF-MANIFEST-2026-07-31.json:35-36` | `4775251e…` | `41897` |
| `CONSTELLATION-EIGHT-HOUR-CHECKSUMS-2026-08-03.sha256:1` | `92341bbc32a7b98d329a9c0b2609686041634ff4910105b646be34a19cc29918` | — |
| `CONSTELLATION-AUDIT-PAUSE-CHECKSUMS-2026-08-02.sha256:1` | `160cf37b7c1c7abd16d454c5af5b8078646b89a75c6905adf95fcb7fc05004f4` | — |
| **actual on disk** | **`160cf37b7c1c7abd16d454c5af5b8078646b89a75c6905adf95fcb7fc05004f4`** | **`76719`** (mtime Aug 3 04:32:30) |

The file has been rewritten twice since the 2026-07-31 freeze and grew
`41,897 → 76,719` bytes. **Neither the 07-31 checksums file nor the 07-31
manifest was ever marked superseded** — I grepped the megatranche tree and
found no supersession statement for either. Both still assert a live `4775251e`
pin for a file that has not had that content for two days.

This matters because the pause handoff's own §9 makes it a stop condition:

> "Missing bytes, a present v12 target, a changed builder, a changed residue,
> or **a stale owner receipt means STOP and request a new ruling**."

A resumer executing §9 literally, as I did, hits a STOP on the first
resurrection receipt. Mitigation: the newer `CONSTELLATION-AUDIT-PAUSE-CHECKSUMS`
re-pins the current value, so the drift is *captured*, just never *reconciled*.

### 2.6 SEVERE — the eight-hour convergence receipt is self-invalidated

`CONSTELLATION-EIGHT-HOUR-CONVERGENCE-LAW-2026-08-03.md:44` requires the H+7..H+8
block to produce "a replay-green checksum packet, no fresh lineage". It does not
replay green:

```
$ shasum -a 256 -c docs/tranches/V/megatranche/coordination/CONSTELLATION-EIGHT-HOUR-CHECKSUMS-2026-08-03.sha256
docs/tranches/V/apotheosis/pi/HANDOFF.md: FAILED
docs/tranches/V/megatranche/coordination/CONSTELLATION-AUDIT-PAUSE-CHECKSUMS-2026-08-02.sha256: FAILED
docs/tranches/V/megatranche/coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md: FAILED
docs/tranches/V/megatranche/coordination/CONSTELLATION-REMAINING-AUDIT-MATRIX-2026-08-02.json: FAILED
shasum: WARNING: 4 computed checksums did NOT match
```
(20 of 24 rows OK.)

Chronology from mtimes: the eight-hour receipt was sealed at `Aug 3 03:17:57`;
a later Codex session rewrote `pi/HANDOFF.md` (04:32:30), the remaining-audit
matrix (04:33:22), the plan (04:33:37) and the pause-checksums file (04:34:18) —
**75 minutes after sealing, without re-issuing or superseding the seal.** The
V8 integration audit discloses the *fact* of post-seal writes, which is to its
credit, but the receipt file itself was left broken on disk.

Related orphan: `…-V8-INTEGRATION-AUDIT-2026-08-03.md:21` pins the
pre-integration checksum file at `edf0c4fd…`. That hash appears **nowhere else
in either repository** and matches no file on disk; the eight-hour file records
a *third*, also-unreachable value (`db68859f…`) for the same path; the current
file hashes `a537a2af…`. Three recorded generations, two unreachable. The exact
pinned form of the "65/65 replay" is therefore not independently re-runnable —
only its current 75-row successor is (which I did run, green).

Systemic smell behind both findings: `CONSTELLATION-AUDIT-PAUSE-CHECKSUMS-**2026-08-02**.sha256`
carries an immutable-looking date stamp in its filename but is a **mutable
file**, rewritten on 08-03 to add 08-03 rows. Date-stamped names that get
rewritten are how frozen receipts silently rot.

### 2.7 MODERATE — the parse-that HEAD pin is 39 commits stale, and the "canonical" packet is untracked

`PARSER-RESURRECTION-HANDOFF-2026-07-31.md` (Value side) states the boundary as
branch `codex/css-totality-combinators-20260729`, HEAD
`fd6062bda4ad6a7c575a7bfde2885a7997c2f08b`, "Tracked tree: clean. Protected
untracked `data` remains untouched." Actual:

```
$ git -C /Users/mkbabb/Programming/parse-that-css-totality rev-parse HEAD
f5757082ca160dd5f25fcf437e692c9df8f7e78d
$ git merge-base --is-ancestor fd6062bd HEAD && echo ANCESTOR-OF-HEAD
ANCESTOR-OF-HEAD
$ git log --oneline fd6062bd..HEAD | wc -l
      39
$ git status --porcelain
?? data
?? docs/tranches/B/PARSER-RESURRECTION-HANDOFF-2026-07-31.md
```

Two observations:

1. **Not a pause-law violation.** All 39 commits are `docs(parser…)` and the
   latest is `2026-08-02 06:49:24 -0400`, i.e. before the 13:50 pause. The
   research legitimately continued between the 07-31 handoff and the 08-02
   pause. But the Value-side receiver still publishes `fd6062bd` as *the*
   boundary and nothing in the Value tree corrects it, so §9's "recompute every
   hash and census before acting" produces a second false STOP.
2. **The canonical packet has no commit provenance.** The file the pause
   handoff calls "the complete parser-owned handoff … Read [it] first" is
   `??` untracked in git. Its only durable identity is the sha256 pin in the
   Value-side receiver. A single `git clean` in that repo destroys the lane's
   named canonical authority. The receiver's own sentence — "Protected
   untracked `data` remains untouched" — enumerates one protected untracked
   path and does not mention that the packet itself is the second one.

### 2.8 NOT a Codex defect — recorded for the fleet

`VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-CHECKSUMS-2026-08-03.sha256` fails 1 of
6 rows: `docs/tranches/V/megatranche/registry/COMPLETENESS-LEDGER.md`
(pinned `1c7da6f0…`, actual `8b61853215183ffb747d457135144ba70ad63a133f260067e610b59f69215145`).
That file's mtime is `Aug 3 10:39:15` — the same minute as
`CONSTELLATION-COMMISSION-2026-08-03.md` (10:39) and adjacent to `FORMATION-LAWS.md`
(10:38) / `SCOPE.md` (10:43), i.e. **this provenance commission's own setup**,
hours after the last Codex activity. Attributing it to Codex would be wrong.

`CONSTELLATION-OWNER-SLOT-ADMISSION-CHECKSUMS-2026-08-02.sha256` shows 12 OK /
5 `FAILED open or read` — all five are `~/Documents/Codex/**` paths hit after
TCC revocation. **`UNVERIFIABLE-THIS-SESSION`, not a defect.**

---

## 3. Item 6 — the arithmetic

### 3.1 Where the numbers live

`1,870,633 µs` and `311,883 µs` appear in exactly four places:

| File | Line | Role |
|---|---|---|
| `parse-that-css-totality/docs/tranches/B/PROGRESS.md` | 57 | first statement of all four attribution numbers |
| `parse-that-css-totality/docs/tranches/B/FINDINGS-AND-RESUME-HANDOFF-2026-07-29.md` | 231-233, 453-455 | restatement + budget block |
| `value.js/docs/tranches/V/megatranche/audit/cross-repo/PARSER-P3-ROOT-FEASIBILITY-RULING-2026-07-29.md` | 78 | the "10x impossible" conclusion |
| `value.js/docs/tranches/V/megatranche/CONSTELLATION-CONVERGENCE-LOOP-AND-PERFORMANCE-LAW-AMENDMENT-2026-07-30.md` | 97, 101-103 | **the 10x/3x/2x budget table** |

Notably, `B/FINAL.md:62` and `B/B.md:310-311` cite only `311,883` against "the
complete `187,063 µs` 10× budget" and never state the denominator, and
`B/research/PERFORMANCE-LAW-AMENDMENT-PORTFOLIO-2026-07-30.md` never mentions
either number. So the denominator surfaces in the *narrative* layer and in the
*Value-side law amendment*, but not in the parse-that tranche's own terminal
documents.

### 3.2 The primary receipt

The claim is "conservative call-tree attribution of the sealed P3 CPU profile".
The sealed profile is
`parse-that-css-totality/docs/tranches/B/artifacts/pass3/p3-direct-closure/p3-direct-closure.cpuprofile`
(1,446,969 B), whose manifest verifies clean:

```
$ shasum -a 256 -c docs/tranches/B/artifacts/pass3/p3-direct-closure/MANIFEST.sha256
typescript/test/prototypes/pass3/p3/closure.ts: OK
typescript/test/prototypes/pass3/p3/products.ts: OK
typescript/test/prototypes/pass3/p3/closure.test.ts: OK
typescript/test/prototypes/pass3/p3/profile.ts: OK
typescript/test/prototypes/pass3/p3/vitest.config.ts: OK
grammar/tests/json/valid.jsonl: OK
grammar/tests/json/invalid.jsonl: OK
docs/.../README.md: OK
docs/.../profile-abba.json: OK
docs/.../p3-direct-closure.cpuprofile: OK
docs/.../v8-deopt-gc.log: OK
```
11/11 OK. Profile spans `602040499003 → 602044927172` = **4,428,169 µs**;
`sum(timeDeltas)` = 4,428,127 µs over 3,616 samples.

### 3.3 Three of four numbers reproduce **exactly**

I re-derived self-time per node (`Σ timeDeltas` keyed by sample node id), built
the parent map from `children`, and attributed each sample to the nearest
identifying ancestor (`m2-baseline` path → M2; `p3/closure.ts` or
`p3/products.ts` → candidate; `p3/profile.ts` → harness).

| Claim | Rule that reproduces it | Computed | Claimed | Δ |
|---|---|---:|---:|---:|
| direct candidate runtime | self-time of `p3/closure.ts` | **1,157,659** | 1,157,659 | **0** |
| candidate-native RegExp | `RegExp: …` frames whose nearest identifying ancestor is the candidate | **144,501** | 144,501 | **0** |
| required candidate products | self-time of `p3/products.ts` **under a `closure.ts` ancestor** | **167,382** | 167,382 | **0** |

The products split is the sharpest confirmation that a real call-tree walk was
performed rather than a whole-file total: `products.ts` self-time partitions as
`{under closure.ts: 167,382, under harness (grammar construction): 5,059,
module-eval: 3,831}` = 176,272 total. The published figure is the **middle**
number, not the total — you only get 167,382 if you actually walked the tree.
Likewise total RegExp time is 314,603 µs, which splits
`{candidate: 144,501, M2: 169,764, other: 338}`; again the published figure is
the call-tree share, not the gross.

`144,501 + 167,382 = 311,883` ✓, and every number derived from it is exact:

```
budget overrun            311,883 − 187,063 =  124,820  ✓ (POST-P6 …AGGLOMERATION:155)
budget left after products 187,063 − 167,382 =   19,681  ✓
matching speedup if fixed  144,501 /  19,681 = 7.3421574107006755×  ✓
matching work removed      124,820 / 144,501 = 86.38002505172975%   ✓
1,870,633 / 10 = 187,063.3 → "about 187,063"  ✓
1,870,633 /  3 = 623,544.3 → "about 623,544"  ✓
1,870,633 /  2 = 935,316.5 → "about 935,317"  ✓
623,544 − 311,883 = 311,661  ✓   935,317 − 311,883 = 623,434  ✓
```

### 3.4 SEVERE — the denominator `1,870,633 µs` does not reproduce

Applying the **same rule that reproduces all three candidate numbers** to the
M2 control arm:

```
M2 self-time by file (µs)
  typescript/src/parse/parser.ts        751,837
  typescript/src/parse/leaf.ts          383,681
  typescript/src/parse/utils.ts         276,248
  typescript/src/parse/state.ts          27,600
  typescript/src/parse/lazy.ts           23,771
  typescript/src/parse/debug.ts           2,513
  typescript/src/parse/parsers/json.ts    1,256
  typescript/src/parse/packrat.ts            10
                              TOTAL   1,466,916
M2-attributed native RegExp             169,764
M2-attributed product construction            0   (products.ts under M2 ancestor = 0)
                    M2 COMPARABLE     1,636,680
```

Cross-check by whole-profile partition (self-times sum to 4,428,127):
`M2 1,636,680 + CAND 1,478,432 + HARNESS 277,653 + OTHER 1,035,362` = 4,428,127.
(`CAND` = 1,157,659 + 176,272 + 144,501; `OTHER` includes GC 129,764,
`(program)` 55,954, `(idle)` 40,113 and ~810k of module loading.)

**Reconstructed denominator: 1,636,680 µs. Claimed: 1,870,633 µs.
Δ = +233,953 µs = +14.3%.**

I could not find any rule that yields 1,870,633:

- No node in the profile has inclusive time within ±200 µs of 1,870,633.
- No natural bucket combination reaches it: `M2 self + M2 RegExp + GC` =
  1,766,444; `+ (program) + (idle)` = 1,862,511; `+ s/result.ts` = various —
  none land on the value. An exhaustive subset-sum over all 99 per-URL buckets
  finds only nonsense combinations (68-term sets mixing `api-extractor` and
  `graceful-fs`), i.e. numerical coincidence, not a rule.
- Attributing harness frames whose subtree contains M2 gives 1,682,957 — closer,
  still 187,676 short.
- **No other sealed profile produces it either.** I ran the same partition over
  every `pass3` `.cpuprofile`:

  | profile | total | M2 self | M2 comparable |
  |---|---:|---:|---:|
  | `l-source-leaves/p2-source-leaves` | 7,942,464 | 1,508,892 | 2,585,436 |
  | `p2-cold-hot/p2-cold-hot` | 4,213,164 | 520,666 | 521,930 |
  | `p2-shaped-products/p2-shaped-products` | 3,867,501 | 1,148,647 | 1,307,053 |
  | `p2-unordered-overlap/p2-unordered-overlap` | 1,952,426 | 106,407 | 106,407 |
  | `p3-direct-closure/p3-direct-closure` | 4,428,127 | 1,466,916 | **1,636,680** |

  None is 1,870,633.

- The only file on disk I located containing the string `1157659` outside the
  two prose documents is
  `~/Documents/Codex/2026-07-29/parser-p4-fresh-sol-adjudication/outputs/P4-EVIDENCE-REPLAY.json`
  (found by an exhaustive grep over `~/Documents/Codex/2026-07-29` and
  `2026-07-30` while access was live). **TCC revoked access before I could open
  it**, so I cannot confirm whether it also carries 1,870,633 or how it derives
  it. `UNVERIFIABLE-THIS-SESSION`. Note that even if it does carry the number,
  that file is a Codex output in a non-version-controlled evidence root, not a
  measurement, and it is not cited as the receipt by any of the four documents
  that publish the number.

**Suspicion assessment — is the denominator a Codex construction worth
challenging?** Partly. It is not fabricated out of nothing: it is the right
order of magnitude, it is on the correct side of the measured ratios
(1,870,633 / 1,469,542 = 1.273×, sitting inside the measured 1.0656–1.5238×
band and near the 36-point median 1.2759×), and its three sibling numbers are
byte-exact. The most likely explanation is a *different, undocumented and
unreproduced attribution rule* for the control arm than for the candidate arm —
which is itself the defect: an asymmetric denominator is precisely the failure
mode the parse-that laws elsewhere forbid ("same-root repair, silent re-pin,
timeout widening, or **denominator rewrite**", pause handoff §6 PRUNE).

**Direction of the error, and what survives.** The error is *conservative
toward the candidate*: overstating M2 makes the 10× budget **larger** and 10×
look **more** achievable. Recomputing with the reconstructed denominator:

| Floor | Published budget | Reconstructed budget | matching+products | Published headroom | Reconstructed headroom |
|---|---:|---:|---:|---:|---:|
| 10× | 187,063 | **163,668** | 311,883 | impossible | **impossible (1.906× over, vs 1.667× published)** |
| 3× | 623,544 | **545,560** | 311,883 | 311,661 | **233,677 (−25.0%)** |
| 2× | 935,317 | **818,340** | 311,883 | 623,434 | **506,457 (−18.8%)** |

So: **the "10× is impossible" conclusion is robust and in fact strengthens.**
What does *not* survive intact is the quantitative case in
`CONSTELLATION-CONVERGENCE-LOOP-AND-PERFORMANCE-LAW-AMENDMENT-2026-07-30.md`
lines 101–103 — the headroom the amendment offers the reopened 2×–3× band is
overstated by 19–25%. The amendment's own hedge ("not contradicted by the
existing complete-product lower-bound arithmetic … also not yet justified as
the final law") keeps the *claim* honest; the *table* is off.

### 3.5 The KILL rows trace to real bench outputs

**P3 `1.0656–1.5238×` — fully receipted.** `profile-abba.json` (33,906 B,
manifest-verified) carries 36 points, each with 11 raw control batches, 11 raw
candidate batches, an 11-element AB/BA order vector, both medians and the ratio.
I recomputed every one:

```
points checked 36   mismatches 0
```
— i.e. for all 36 points, `median(control.batches) == control.median`,
`median(candidate.batches) == candidate.median`, and
`control.median / candidate.median == ratio` to <1e-12. Order vectors are
strictly alternating in all 36 (no two adjacent entries equal). Extremes:

```
MIN 1.065580049126865   (json,    scale 96, plane state)  → README "1.0656×"
MAX 1.5237972171498628  (fixture, scale  4, plane state)  → README "1.5238×"
count >= 10x: 0    count < 1: 0
```
Construction ratios recompute to 1.9534095607335273 / 1.7117604617604630
(README: 1.9534× / 1.7118×); failure-view ratios to 1.7556572994195714 /
1.3459080154261090 (README: 1.7557× / 1.3459×). **Everything in the P3 README
table derives from banked raw batches. Nothing is hand-typed.**

**A3 `0.9208–1.0390×` — fully receipted.** `P6-SIR-A3-OWNER-SOL-ADJUDICATION-2026-07-30.md:141-146`
publishes seven PID/seed/control-ns/candidate-ns rows. Recomputing
`control/candidate`:

```
77275 191034286   0.9611933701657459
77280 578311243   1.0282306996226354
77277 1204938528  0.9207681564329404   ← min
77279 2218842770  1.0389571550178254   ← max
77276 2845470055  1.0004920383769338
77281 3232747012  0.9510631577613196
77278 3859374297  0.9983931248513334
min 0.9207681564329404   max 1.0389571550178254
```
**All seven match to the last digit of the published full-precision range**
`0.9207681564329404x–1.0389571550178254x`. The document's derived statements —
seven unique PIDs/seeds, 70 batches, 2,000 selections/arm/batch, 140,000
selections/arm, 280,000 total arm parses — are internally consistent
(7 × 10 = 70 batches; 70 × 2,000 = 140,000; ×2 arms = 280,000).

Caveat: the 715,430-byte A3 raw artifact behind that table is **not in the
repository** — `find . -name '*.json' -size +600k -size -800k` returns nothing —
it lives under `~/Documents/Codex`, now inaccessible. So the A3 rows are
verifiable *as arithmetic* but their upstream raw is a Codex evidence-root
dependency outside version control. Same structural exposure as §2.7.

---

## 4. Findings, ranked

| # | Sev | Finding | Provenance |
|---|---|---|---|
| F-1 | **SEVERE** | The `1,870,633 µs` M2 denominator — sole basis for the `187,063` 10× budget and the `623,544` / `935,317` 3×/2× budgets — has no primary receipt and does not reproduce from the sealed P3 profile under the rule that reproduces its three siblings. Independent reconstruction: `1,636,680 µs` (+14.3% overstatement). Published 3×/2× headroom is overstated by 25.0% / 18.8%. The 10×-impossible conclusion survives and strengthens. | `CONSTELLATION-CONVERGENCE-LOOP-AND-PERFORMANCE-LAW-AMENDMENT-2026-07-30.md:97,101-103`; `audit/cross-repo/PARSER-P3-ROOT-FEASIBILITY-RULING-2026-07-29.md:78`; `parse-that…/B/PROGRESS.md:57`; recomputation over `…/pass3/p3-direct-closure/p3-direct-closure.cpuprofile` |
| F-2 | **SEVERE** | `RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256` FAILS: `pi/HANDOFF.md` pinned `4775251e…`/41,897 B, actual `160cf37b…`/76,719 B. The 07-31 manifest carries the same dead pin. No supersession recorded anywhere. Trips the pause handoff's own §9 STOP. | `shasum -c` output above; `RESURRECTION-HANDOFF-MANIFEST-2026-07-31.json:35-36` |
| F-3 | **SEVERE** | `CONSTELLATION-EIGHT-HOUR-CHECKSUMS-2026-08-03.sha256` FAILS 4 of 24 rows. A Codex session rewrote 4 pinned files 75 min after sealing (mtimes 04:32–04:34 vs seal 03:17) without re-issuing the receipt, violating the eight-hour law's own H+7..H+8 requirement of "a replay-green checksum packet". | `shasum -c`; `CONSTELLATION-EIGHT-HOUR-CONVERGENCE-LAW-2026-08-03.md:44`; mtimes |
| F-4 | MODERATE | Orphan pin: `…V8-INTEGRATION-AUDIT-2026-08-03.md:21` pins the pause-checksums file at `edf0c4fd…`, which exists nowhere on disk or in either repo; the eight-hour file records a third unreachable value `db68859f…`. The "65/65 replay" is therefore not re-runnable in its pinned form (its 75-row successor is, and is green). | grep across `docs/`; `shasum` of current file `a537a2af…` |
| F-5 | MODERATE | The Value-side parser receiver still publishes parse-that HEAD `fd6062bd…` as the boundary; actual HEAD is `f5757082…`, 39 commits later (all pre-pause, docs-only — not a pause-law breach, but a second false §9 STOP). | `git rev-parse HEAD`, `git log fd6062bd..HEAD` |
| F-6 | MODERATE | The named "canonical parser-owned handoff" is **untracked** (`??`) in parse-that; its only durable identity is a sha256 pin in another repo. The receiver's protected-untracked sentence names only `data`. | `git status --porcelain` |
| F-7 | LOW | Naming/chronology drift: `RESURRECTION-HANDOFF-MANIFEST-**2026-07-31**.json` has `snapshotAtUtc: 2026-08-02T00:08:36Z` and mtime Aug 1 20:17 EDT; `CONSTELLATION-AUDIT-PAUSE-CHECKSUMS-**2026-08-02**.sha256` is a mutable file rewritten twice on 08-03. Date-stamped names that get rewritten are how frozen receipts rot silently (root cause of F-2/F-3/F-4). | manifest key; `stat` mtimes |
| F-8 | LOW | A3's 715,430-byte raw artifact and the P4 evidence replay both live only under `~/Documents/Codex/**`, outside version control. The published tables are arithmetically exact but their upstream raw is a single-point-of-failure evidence root. | `find` returns nothing in-repo |

Explicitly **not** charged to Codex: the `COMPLETENESS-LEDGER.md` checksum
failure (§2.8, mtime 10:39 today = this commission's own setup), and the 5
`FAILED open or read` rows in the owner-slot manifest (TCC, §2.8).

---

## 5. Done well — superlatives, with proof

1. **The candidate-side attribution is genuinely, independently reproducible.**
   Three numbers published nine months of prose ago land to the microsecond from
   the sealed profile: 1,157,659 / 144,501 / 167,382. I did not need the Codex
   method description to get them — the rules are the obvious ones. This is the
   strongest evidence in the lane and it is real. (§3.3)
2. **The products figure proves a real call-tree walk, not a file total.**
   167,382 is `products.ts` *under a `closure.ts` ancestor*; the file total is
   176,272. Getting the sub-figure right requires the walk. Same for RegExp
   (144,501 of a 314,603 gross). (§3.3)
3. **Every derived arithmetic statement is exact**, including the awkward ones:
   `144,501/19,681 = 7.3421574107006755×` and `124,820/144,501 = 86.38002505172975%`.
   No rounding laundering. (§3.3)
4. **P3's 36 ratios all recompute from banked 11-batch raw with strictly
   alternating AB/BA order vectors and 0 mismatches.** The manifest verifies
   11/11 including the prototype `.ts` sources. This is a properly sealed
   benchmark. (§3.5)
5. **A3's seven ratios recompute to the last float digit** from published
   control/candidate ns totals, and the min/max are exactly the published range.
   (§3.5)
6. **The pause handoff's stop conditions are honest and self-incriminating.**
   §5 enumerates four *static falsifiers of its own builder* (OR05 declaring 18
   predicate IDs against 20 formulas; misbound trailing IDs; the S01
   universal-mismatch vs three-way-byte-equality contradiction; RR01's
   consequent inability to aggregate). A packet that names the precise reasons
   it is RED is doing the opposite of overclaiming. §4 closes its own broad
   novelty claims as prior-art overlap and retains one narrow falsifiable
   hypothesis. §6's PRUNE list names "denominator rewrite" as forbidden.
7. **The `__pycache__` residue disposition is exemplary.** Timestamps show it
   predates the current builder and implies an unexplained import; the handoff
   records it as evidence with "creator unknown" and forbids cleaning rather
   than regenerating or explaining it away. (§1.3)
8. **The 65/65 replay claim is scoped honestly** — "before these integration
   writes" — and the 65 + 10 = 75 accounting reconciles exactly; my superset
   re-run is 75/75 green. (§2.4)
9. **The P3 README refuses to launder its own weak spots**: it lists the
   candidate's *larger* retained parse-state heap (70,824 vs 63,016 B), the
   RED `proof:perf` at +16.0%, two rejected micro-variants that went *below*
   1×, and states plainly that the 66.9% source cut "is a structural comparison,
   not performance credit."
10. **The parse-that terminal documents are more disciplined than the Value-side
    amendment.** `B/FINAL.md` and `B/B.md` cite only `311,883` against "the
    complete 187,063 µs 10× budget" and never restate the unreproducible
    denominator; the research portfolio doc never mentions either. The defect in
    F-1 is confined to the narrative/receiver layer.

---

## 6. Not verified this session

| Target | Reason |
|---|---|
| `~/Documents/Codex/2026-07-29/parser-p4-fresh-sol-adjudication/outputs/P4-EVIDENCE-REPLAY.json` — the only located file containing `1157659`; would likely settle F-1 | TCC revoked `~/Documents` mid-session (`ls`, `shasum`, `Read`, background exec, and sandbox-disabled exec all return `EPERM`) |
| Interrupted A1 root census (`/Users/mkbabb/Documents/Codex/2026-07-30/parser-law-pass1-common-luna-prototype-a1/outputs`): claimed 13 regular files, 0 subdirs, 675,033,756 B, no `MANIFEST.sha256`, raw JSONL 3,394 lines / 674,304,045 B / SHA `92516e02…` | same |
| 5 owner-slot manifest rows under `~/Documents/Codex/2026-08-01` and `2026-08-02` | same |
| PEP-552 source-hash check of `BUILD-V12.cpython-314.pyc` against the current `BUILD-V12.py` (would confirm the residue is from a superseded revision, as mtimes suggest) | same; size + SHA of both were captured before revocation and match the handoff exactly |
| A3's 715,430 B raw artifact | not in either repository; lives under the same revoked root |

Recommend the fleet re-run §6 of this lane with `~/Documents` access restored;
`P4-EVIDENCE-REPLAY.json` is the single artifact most likely to convert F-1 from
"unreceipted" to either "receipted under an asymmetric rule" or "fabricated".

---

## 7. Recommended owner actions

1. **F-1**: require the parser lane to publish the exact M2 attribution rule and
   re-derive the denominator from `p3-direct-closure.cpuprofile`, or restate the
   amendment's 3×/2× table against the reconstructed `1,636,680 µs`. Until then
   the 3×/2× headroom figures should not be cited.
2. **F-2/F-3/F-4**: re-issue `RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256`
   and `CONSTELLATION-EIGHT-HOUR-CHECKSUMS-2026-08-03.sha256`, or mark both
   SUPERSEDED in place, and resolve or retract the `edf0c4fd…` pin. §9's STOP is
   currently tripped by the packet's own receipts.
3. **F-7 (root cause)**: forbid rewriting date-stamped `.sha256` files. Append a
   new dated file instead; a receipt that changes is not a receipt.
4. **F-6**: commit `parse-that-css-totality/docs/tranches/B/PARSER-RESURRECTION-HANDOFF-2026-07-31.md`
   or add it to the protected-untracked enumeration.
