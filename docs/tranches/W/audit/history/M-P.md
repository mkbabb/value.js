# Historical audit — tranche scope M · N · O · P

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, running as a
Claude Code subagent seat. Everything below is my own verification against the tree at
`/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

**Scope**: `docs/tranches/{M,N,O,P}/`. **Method**: charter/board/close-doc read → commitment
ledger → status determined against the *current tree and git object store*, never against the
close document's own claim.

---

## §0 — Headline

**M was never ratified and never executed. N executed 6 of 15 waves, was declared CLOSED by a
successor three weeks later with a sentence that is false on its face, and left a 9-wave RATIFIED
block dead on the record. O and P shipped eight npm versions from a repository whose CI had never
once gone green and whose releases were never tagged — both facts fixed by R.W0 on 2026-07-03,
weeks after the fact. The single highest-value structural find: `docs/tranches/N/audit/lanes/
n-verify-V4.md` — cited four times as primary evidence, including for the fact that dissolved M's
entire cohort gate — has never existed in any git object.**

Counted at lane granularity: **84 distinct commitments** across M/N/O/P; **46 verified true at
HEAD** (by whatever tranche eventually delivered them — 17 of those 46 landed only in R, S, or T,
one to four closes after the tranche that promised them); **38 not landed as promised**, of which
**9** are the RATIFIED-and-never-executed N.W10–N.W18 block and **7** are silent drops with no
successor mention anywhere.

---

## §1 — The commitment ledger (M · N · O · P)

| Tranche | Waves specced | Waves executed | Version events promised | Version events delivered |
|---|---|---|---|---|
| **M** | W0–W9 (10) | **0** — planning-only, never ratified (`M/PROGRESS.md:47-49` "Gate: explicit user ratification. **Status: OPEN**") | 0.11.0, v1.0.0 | 0 (0.11.0/0.11.2 shipped **out of band** during a keyframes hand-off, `N/audit/fold-ledger.md:43,47`) |
| **N** | W0–W9 + W10–W18 + W8′/W9′ (21 wave rows) | **6** (W1, W2, W3, W4-artifacts, W5, W7) | 0.12.0, 0.13.0, v1.0.0 | 0.12.0 ✓, 0.13.0 ✓, **v1.0.0 ✗** |
| **O** | W0–W6 + W7-demo (8) | **7** (W7-demo not shipped) | 0.13.1…1.0.0 | all ✓ |
| **P** | (no charter; close doc only) | — | 1.1.0 | ✓ |

M's own board is unambiguous: every M.W1–M.W9 row reads **PLANNED**. The tranche authored three
audit ledgers and a 272-line charter and stopped.

---

## §2 — What M contained that N did NOT absorb (the silent drops)

N's supersede map (`N/audit/fold-ledger.md §3`) maps M.W1…M.W9 to N homes and closes with
"Zero items leave N un-dispositioned." That claim is false for the following rows. Each is
verified absent from N's charter text, absent from every later tranche document, **and** absent
from the tree.

### SD-1 — M.W6.B, the modern-web levers

M.W6 lane B (`M/M.md:170`): *"View Transitions / `@layer` / `@container` / `light-dark()` levers"*.

N.W6.D (`N/N.md:155`) restates M.W6 as: *"modern-web — router 4→5 + typed routes + `VIEW_MAP`
single-source; `dispatch.ts` hue-cluster → `mix.ts`; demo `Palette` id-honesty; delete the
`VITE_API_URL` hack"*. **Lane B is simply gone.** It is not in `N/audit/fold-ledger.md §3` row
"M.W6 modern-web | STILL-LIVE | N.W6.D", not in `WAVES-2.md`, not in `N.W16.md`, not in R's
N-wave disposition table (`R/R.md:132` splits N.W16 into picker-hero / docs-φ / easing / extract /
router — no levers row).

Tree verification:

```
$ grep -rn "view-transition\|startViewTransition" demo/   → 0
$ grep -rn "@container" demo/                              → 0
$ grep -rn "light-dark(" demo/styles/*.css                 → 0
```

**SILENTLY_DROPPED.** Last seen `M/M.md:170`, 2026-06-04.

### SD-2 — M.W2.B's secondary escape class

M.W2 lane B (`M/M.md:166`) is two halves: the 25 `as <Model> & { _id: unknown }` casts **and**
*"the secondary escapes (`as Record<string,unknown>` ×8, `row.x as T` ×7) typed at the
repo-aggregation boundary"*. `M/audit/fold-ledger.md:68` books the second half as its own
transposition **L-PC-2**. N.W2.A restates it as *"aggregation-boundary secondary escapes typed"*
(`N/N.md:151`) and the commit `e4b5f600` claims *"aggregation boundaries typed"*.

Measured across the escape's own lifetime:

```
$ git grep "as Record<string, unknown>" fa1a9349 -- api/src | wc -l   → 8    (N-open)
$ git grep "as Record<string, unknown>" e4b5f600 -- api/src | wc -l   → 8    (post-N.W2.A)
$ grep -rn  "as Record<string, unknown>" api/src        | wc -l       → 9    (HEAD)
```

The primary half landed and is still clean (`grep -rEn 'as [A-Z][A-Za-z]* & \{ _id' api/src` → 0;
`WithId` 44 hits). The secondary half **never moved**, and has since grown by one
(`api/src/modules/palette/service/crud-list.ts:90,222`,
`api/src/modules/admin/service/audit.ts:63,72`, …). **PARTIAL COUNTED AS DONE**, and see §5/VG-1
for why the gate could not catch it.

### SD-3 — M.W9.C's doc-reconciliation sweep (3 of 4 rows)

`M/audit/fold-ledger.md §6` books four doc-drift repairs into M.W9.C. N.W8.D
(`N/N.md:157`) restates *only* "RELEASE.md rewrite (5 contradictions), CLAUDE.md drift …,
demo/CLAUDE.md one-liner". The three K-document repairs vanish. All three are still live in the
tree today:

| M.W9.C row | Status at HEAD | Evidence |
|---|---|---|
| "VAL-9 KILLED but re-bookings not struck from `K.md §7`" | **still there** | `docs/tranches/K/K.md:213` — *"L also inherits the booked residuals that remain open at K-close: **VAL-9 spring-emitter**, …"* — beside `K.md:169` which already declares VAL-9 "KILLED (corrected 2026-06-03) … it is struck" |
| "`PROGRESS.md` K.W2 still carries the WRONG inv-K-4 framing beside the correction" | **still there** | `docs/tranches/K/PROGRESS.md:11` — *"vue-tsc 0 with glass-ui dist deleted (**inv-K-4 build-state independence proven**)"* — the mechanism that `K/PROGRESS.md:12` and `M/M.md:27` both record as a *contract-v2 precept violation that was reversed* |
| "`request-coverage.md` over-claims contract-v2 TS-half ADDRESSED" | **still there** | `docs/tranches/K/audit/request-coverage.md:25` — row 17 still reads *"ADDRESSED (runtime) / FOLDED→K.W2 (TS half)"* against a K.W2 mechanism that was reverted |

(The fourth row, the dirty `docs/precepts` submodule, *was* resolved — at R.W0 W0-7 by REVERT,
`R/FINAL.md §2`. Submodule is clean at HEAD: `63240e67 docs/precepts`.)

**SILENTLY_DROPPED ×3.**

### SD-4 — M.W9.D / N.W9.C: re-confirm L's close on the corrected substrate

This is the A2 process-integrity finding: *"L closed against an invalidated precondition (post-W2
re-preconditioned L on K.W2.5-green, never ran)"* (`M/audit/fold-ledger.md:22`). M books it to
M.W9.D. N books it to N.W9.C and specs it to executable depth —
`N/waves/N.W9-prime.md:251` enumerates the nine inv-L greps, and `:324` states the discipline:
*"NO trusting L's close — re-run the greps."* N.W9′ never executed.

```
$ grep -rn "re-confirm L\|L's close\|L close" docs/tranches/R docs/tranches/S docs/tranches/T
   → 1 hit, unrelated (T/audit/hardening/h-refine-console.md:107)
```

Nobody has ever re-run it. **SILENTLY_DROPPED.** I ran the load-bearing subset now, so the
successor need not: `api/src` `as any` = **0**, `as unknown as` = **1**, largest `api/src` file =
**325 LoC** (`modules/palette/service/crud-list.ts`, cap 350), the `visibility`/`tier` split
survives (`api/src/modules/palette/model.ts:61-64`), no Palette-model `sessionToken` (the 21
`sessionToken` hits are all Hono `c.var` context, legitimate). **L's invariants hold** — but that
is a fact nobody in M, N, O, or P established.

### SD-5 — N.W6.A: the standing per-pane Fable design facility

`N/N.md:155` lane A specs the per-pane Fable design-audit wave *"— re-runnable as a **standing
facility**"*, and `N/waves/N.W9-prime.md:437` re-affirms it as such. N.W6 died with **zero
implementation commits** (`N/PROGRESS.md:20`; the only sliver is the dock-first-paint half of
`199fd15f`). Its re-divined successors N.W12–N.W17 were RATIFIED and never executed.

```
$ grep -rn "standing facility" docs/tranches/    → 3 hits, all inside docs/tranches/N/
```

The *content* was later split across R.W3/R.W4 and re-done ad hoc in S, T, U (`U.W-VISUAL`), and V
— but the **facility** was never built. Every subsequent tranche re-authors its own per-pane
visual lane corpus from scratch. **SILENTLY_DROPPED as an artifact; the work it was meant to
systematize has been re-invented at least four times since.**

### SD-6 — CH-4…CH-8, the glass-ui primitive asks

M.W7 books them "ship-or-KILL in the 3.3.0 cut" (`M/audit/fold-ledger.md:40`). N re-books them:
*"cohort ask @ 3.13.0 cut; ship-or-KILL"* (`N/audit/fold-ledger.md:24`). Neither cut ever gated
anything. R's own deferral census scores them
*"A/K→M→N→R ≈ **8–10 (CHRONIC)**"* and folds them again as "cohort-carry"
(`R/audit/pass1/R8-DEFERRED.md:101`). **Still open. Never once shipped-or-killed despite two
explicit ship-or-KILL rulings.** Aggravating factor: the id `CH-4` has been re-used in V for an
unrelated p75-LCP close-law (`docs/tranches/V/coordination/value-inbox-2026-07-20-residual-repairs.md:15`),
so the chronic is now un-greppable by its own name.

### Rows N *did* absorb faithfully (for completeness, so the drop list is trusted)

`development` key (out-of-band at 0.11.1), band-aids/mechanism-C, self-alias→dist, reka ^2.9,
`SIBLING_WATCH_BUILDS`, desktop `@source`, WithId primary class, parseCSSColor typing, resolver
unification, `useLayerTransition` fork, blob/watercolor extirpation, aurora wiring, VAL-1,
Asks 3/5, inv-22-color, K-PALID, K-INV5, K-DISP, K-W5RT, K-W3DIFF. All present in N's charter or
fold-ledger with a named home.

---

## §3 — N: the close document is false on its face

`docs/tranches/N/FINAL.md:3` — the entire status line:

> **Status:** CLOSED as SUPERSEDED. **N.W1–W9 landed** (0.12.0 published, 2026-06-11).

Against N's own board (`N/PROGRESS.md`):

| Wave | FINAL.md claim | PROGRESS.md row | Git |
|---|---|---|---|
| N.W6 | landed | **"SUPERSEDED-BY-WAVES-2 (DIED un-implemented — zero impl commits)"** (`:20`) | no commits |
| N.W8 | landed | **"PLANNED"** (`:22`) | no commits |
| N.W9 | landed | **"PLANNED"** (`:23`) | no commits |

`git log --all --since=2026-06-10 --until=2026-06-19` shows the N impl commits terminating at
`199fd15f` (2026-06-12). There is no N.W8 commit and no N.W9 commit. **Three of the nine waves the
close document says "landed" have zero implementation commits, and one of them is documented on
the adjacent board as having *died*.**

Aggravating: `FINAL.md:6` states *"Authored lean at R.W0 (2026-07-03)"* — the close document was
written by the **successor tranche, three weeks after the fact**, and R's own audit records that
at audit time *"no `N/FINAL.md` exists (`ls docs/tranches/N` → no FINAL.md)"*
(`R/audit/pass1/R8-DEFERRED.md:100`). N ran for three weeks with no close record at all.

### What "N.W1–W9 landed" actually cost

Four N invariants were declared met by that sentence and were not:

- **inv-N-5 deployed-truth** ("the production wire serves HEAD-lineage code"). N.W4 is boarded
  **"ARTIFACTS DONE … wire deploy = the W8 ceremony"** (`N/PROGRESS.md:18`). W8 never ran. Prod
  stayed on I-era `23a7b27` code until **T.W0, 2026-07-10** — see the disease row §6/CH-A.
- **inv-N-6 registry consumption.** Never discharged; see §4.
- **inv-N-7 zero phantom classes.** Re-opened *at N.W5's own close*: `N/PROGRESS.md:19` —
  *"**inv-N-7 RE-OPENED 2026-06-12**: `watercolor-swatch` bare-use phantom … → closes at
  **N.W14.E**"*. N.W14 never ran. (It reached zero at R.W2's composite gate.)
- **inv-N-9 PRM-complete.** N's own census names the one LIVE hole (`useMixingAnimation.ts:116,206`)
  and assigns it to N.W6.C — the wave that died — then to N.W16, which never ran. It was actually
  gated at **`add509ca`, 2026-07-03, `fix(R.W2 · mix-RAF PRM)`**, three weeks after N declared the
  invariant.

---

## §4 — The "3.13.0 pin hold": did it ever land? **No — it died twice and then inverted.**

The full lifecycle, with evidence:

1. **N-open (2026-06-11)** — `N/N.md:131-135`: *"Hold `file:../glass-ui` through W5 …, migrate to
   **`^3.13.0`** when glass-ui cuts it … → the inv-N-6 registry-consumption close."*
2. **Amendment 1 (2026-06-12)** — same line, bracketed: *"**3.13.0 IS cut**, but glass-ui's BA
   tranche … cuts 4.0.0 …; the pin target is now **THE BA CUT**, discharged at N.W18."* The pin
   moved the day after it became satisfiable.
3. **N.W18 never executed.** N.W9′ (which owned the pin discharge) never executed.
4. **R.W0 Q4, RATIFIED 2026-07-03** — the target is not re-aimed, it is **abolished**:
   `R/waves/R.W0.md` — *"keep `file:../glass-ui` + `file:../keyframes.js` **deliberately** …
   registry pins during active co-development are theater (**"3.13.0" and "BA 4.0.0" both went
   stale before mattering**)."* Recorded as OBSOLETE in `R/R.md`. This is an honest
   RETIRED_WITH_RATIONALE — the only clean exit in the whole chain.
5. **Inversion (2026-07-17, V.W44).** The tree today does the opposite of both policies, in the
   wrong dependency section:

```
$ python3 - <<'PY'   # package.json at HEAD
dependencies {'@mkbabb/glass-ui': '^7.0.0', '@mkbabb/keyframes.js': '^6.0.0'}
PY
$ git show 164343c1:package.json | …   → dependencies: None          (v4 cut, 2026-07-17)
$ git show f2c8f565:package.json | …   → dependencies: {glass-ui ^7, keyframes ^6}
```

`f2c8f565` ("adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface") declares two
**demo-only** packages as **runtime `dependencies` of the published library**. The library source
imports neither (`grep -rn "glass-ui|keyframes.js" src/` → 3 hits, all prose comments; `dist/`
clean). And the edge is a cycle:

```
node_modules/@mkbabb/keyframes.js  6.0.0  dependencies: {"@mkbabb/value.js": "4.0.0"}
node_modules/@mkbabb/glass-ui      7.0.0  peerDependencies: {"@mkbabb/value.js": "^4.0.0"}
```

So `npm i @mkbabb/value.js` from HEAD would install a Vue component library, a keyframes engine,
and a **nested second copy of value.js@4.0.0**. This is precisely the topology M §3 and N §3 built
their entire publish spines to protect (*"value.js is the pure SINK — cohort-dep-free"*,
`M/M.md:124`, `N/N.md:123`).

**Not yet shipped**: `v4.0.0` tags `44ddaff7` (2026-07-16), which is **before** `f2c8f565`
(2026-07-17) — `git merge-base --is-ancestor f2c8f565 v4.0.0` → NO. The published 4.0.0 tarball is
clean. The *next* publish from HEAD is not. **This is the M/N spine invariant, inverted, un-gated,
and armed.** See VG-4.

**Verdict on the question asked**: the 3.13.0 pin hold **never landed** — target moved once, wave
that owned it never executed, policy retired at R, and the current state is the invariant's
inverse.

---

## §5 — Vacuous gates

For each: what exact input makes this RED?

### VG-1 — N.W2's WithId gate cannot see the class it claims to complete
`N/N.md:151` hard gate: `grep -E 'as \(?(Palette|ProposedName|Tag|AdminAuditEvent) &' api/src` → 0.
The wave's own lane text also promises *"aggregation-boundary secondary escapes typed"*. **No input
involving `as Record<string, unknown>` or `row.x as T` can turn this gate red.** Proven by outcome:
8 before, 8 after, 9 today (§2/SD-2). The gate measures the half that was done.

### VG-2 — N.W3's "≤14 justified-each" is a one-shot count with no standing enforcement
`N/N.md:152` gate: *"txn sites ≤14 justified-each; KISS review"*. It is a human count at one commit;
nothing re-runs it. Measured at HEAD:

```
$ grep -rn "withTransaction(" api/src | grep -v test | wc -l   → 17      (target ≤14)
$ grep -rn "createIndex("     api/src | grep -v test | wc -l   → 21      (N drove 26→22)
```

The txn count has drifted back **above** the ceiling and no gate noticed, because after the wave
closed there was no gate. **VACUOUS after the wave — which is the only period that matters.**

### VG-3 — O's dispatch gate discharges itself
`O/O.md:10` + `:686`: *"O.W1–O.W6 dispatch on explicit user ratification **AFTER N.W9′ / v1.0.0**."*
`O/PROGRESS.md:91` discharges it: *"N.W9′ / v1.0.0 closes | **DONE** — O shipped AT 1.0.0
(O.W6 = the 1.0.0 cut)."* **The gate required the predecessor to close at v1.0.0; it was satisfied
by the gated work cutting v1.0.0 itself.** No input can make this RED: any O execution path that
reaches W6 satisfies its own precondition. N.W9′ — the π lane, the L-close re-confirm, the pin
discharge, `FINAL.md` — never ran; N's FINAL.md later concedes the point
(`N/FINAL.md:20-22`: *"That version event **already shipped** at O.W6"*).

Corollary: `O/O.md:71` asserts *"The N invariants (inv-N-1..inv-N-10) **carry from N's close**"* —
written 2026-06-18, when O's own §1 records *"N.W10–N.W18 … zero implementation commits … The
block is in-flight"*. O inherited an invariant spine from a close that had not happened, two of
whose invariants (inv-N-7, inv-N-9) were at that moment openly RED.

### VG-4 — the packed-surface gate is blind to `dependencies`
`scripts/ci/verify-packed-surface.mjs` (140 lines) contains **zero** occurrences of `dependencies`.
No input to it — including the §4 inversion that adds a Vue component library as a runtime dep of a
pure-function color library — can make it RED. The one load-bearing publish gate does not inspect
the one field that determines what a consumer installs.

### VG-5 — `test:dist` inherits the retired proof idiom's shape
The five retained `proof:*` gates were reclassified into one `test:dist` entry at T.W0 (`8bbf0690`).
Not vacuous in itself, but see §6/CH-D: the idiom the owner deleted as "overfit junk" returned as
twelve scripts and was excised in two later rounds. The retained five survive on the strength of
being behavioral (they read the built dist), which is exactly the distinction the original edict
drew — a distinction O never argued for.

---

## §6 — Chronics (disease rows): the same defect wearing new names

### CH-A — the production wire · **5 names · 4 closes · ~5 weeks** · CLOSED at T.W0
| Close | Name it wore | Fate |
|---|---|---|
| M (2026-06-04) | **"Ask 3 (N1-fix, P1 critical-path)"** — M.W8.A (`M/M.md:172`) | never executed (M unratified) |
| N (2026-06-11) | **"N-P0-3: Production wire = I-era `23a7b27`"** → N.W4.C (`N/audit/fold-ledger.md:14`) | N.W4 boarded "ARTIFACTS DONE … wire deploy = **the W8 ceremony**" — W8 never ran |
| R (2026-07-04) | **"X1 — prod deploy"** | `R/FINAL.md §7`: *"FIRED-AND-BLOCKED-ON-HOST … prod still serves I-era lineage (`/health` 404)"* |
| S (2026-07-06) | **"X1 (R.W7 residue, **second carry**)"** | `S/FINAL.md:114`: *"OPEN — prod STILL I-era"* |
| T (2026-07-10) | **"W0-X1"** | `T/FINAL.md:60,290`: **EXECUTED + LIVE**, `bdfb4a5`, prod on `0441aba` |

The defect survived four closes because at each one it was re-classified as somebody else's
ceremony ("the W8 ceremony", "maintainer-on-host"). T broke it by *ruling it into a W0-executable
row at ratification* — `T/FINAL.md:179`: *"Never a silent 3rd re-book."* That is the mechanism the
next tranche should copy.

### CH-B — the NCSU alias retirement · **~6 closes** · CLOSED at T.W0
DEC-9 declared it retired at K.W2 (2026-06-03). N.W4.E: *"the NCSU-alias retirement decision
recorded honestly (DEC-9 **false on the wire**)"* → deferred to "W8 on-host item"
(`N/PROGRESS.md:18`). R.W7 X2: PENDING. S: booked §7.3. T.W0 W0-X2: LANDED. **A retirement was
*declared* three closes before it happened.**

### CH-C — desktop pane visibility · **3 names · 4 closes** · mechanism now deleted
`K.W2.6` "desktop pane-visibility P0" → `M.W2.A` "Tailwind v4 `@source` gap" → `N.W2.B` — landed
`fc23c8ee` with a CI emission probe. But N's own board immediately re-rooted the *user-visible*
kill: `N/PROGRESS.md:35-36` — *"W2.B's emission fix is in-tree and correct — **the live desktop kill
is the unlayered glass-ui dist CSS cascade** (D8-1, U11's true root), owned by N.W10.D."* N.W10 never
ran; U11/D8-1 went to R.W2 and was cured by the producer (`R/FINAL.md §1`). Then the probe that made
the first half structural was deleted: `6d6d3521` (V.W42) removes
`scripts/ci/css-emission-probe.mjs` as **"CI-orphaned"**. Same commit removes
`scripts/ci/boot-smoke.mjs` — **the enforcement mechanism of inv-N-1** — also as "CI-orphaned"
(successor named: the W44 routed-mount witness). Neither invariant was ever formally retired in the
N lineage; their gates simply stopped being wired and were then swept.

### CH-D — the retired `proof:*` idiom, re-introduced · **owner edict violated for ~5 weeks**
Standing owner edict (2026-06-02): the grep-based `proof:*` invariant-codification idiom is
"overfit junk", deleted, **never re-introduce**. M re-affirms it (`M/M.md:220`: *"The proof-idiom
stays retired … never a committed `proof:*.mjs`"*). N re-affirms it (`N/N.md:226`: *"Invariants
(structural; **the proof-idiom stays retired**)"*).

O.W0 re-introduces it on 2026-06-19 — `650a8cdb`: *"Gate: `scripts/proof-css-parity.mjs`
(`proof:css-parity`)"*. By T it is **twelve scripts**, and T.W0 (`8bbf0690`) names it exactly what
the owner did: *"**The chronic `proof:*` carry** … EXCISED-7 (the **overfit** gates …)"*. A second
sweep at V.W42 (`6d6d3521`) deletes eight further "**proof-theater** meta tests … assert canon-sync
/ gitignore / shot-policy / apparatus-grep, not product behavior". **A standing user prohibition,
re-affirmed by two consecutive charters, was violated by the next tranche and took two later
tranches to unwind.**

### CH-E — release hygiene: tags ≠ registry · **N.W8 never ran; healed by R.W0**
`N/audit/fold-ledger.md:16` N-P0-5: *"v0.11.2 untagged; master CI broken since Jun 2; 39 commits
CI-uncovered"* → N.W8.A. N.W8 never ran, and O and P repeated the defect. Proof, from the tag
objects themselves:

```
v0.12.0  tagged=2026-07-03  commit=2026-06-12
v0.13.0  tagged=2026-07-03  commit=2026-06-16
v0.13.1  tagged=2026-07-03  commit=2026-06-19
v0.14.0  tagged=2026-07-03  commit=2026-06-19
v0.15.0  tagged=2026-07-03  commit=2026-06-19
v0.16.0  tagged=2026-07-03  commit=2026-06-19
v1.0.0   tagged=2026-07-03  commit=2026-06-19
v1.0.2   tagged=2026-07-03  commit=2026-06-19
```

**Every tag from 0.12.0 to 1.0.2 was minted on one day — R.W0, 2026-07-03** — for releases
published across three weeks by N, O, and P. `P/FINAL.md:41-43` concedes the mechanism: *"the P/Q
commits and their tags were minted on `tranche-q` and **healed onto master's history at R.W0**."*

### CH-F — CI never green through N, O, P
`R/FINAL.md §7`, X3: *"**CI itself went green for the first time in the unified workflow's
history**"* — run 28722062107, 2026-07-04. The unified `ci.yml` dates from `57c0928e` (K.W2,
2026-06-03). **O shipped seven versions and P shipped one on a repository whose CI had never
passed.** O's close evidence (`O/PROGRESS.md §Born-RED gate status`) and P's
(`P/FINAL.md:40-41` — *"1901 tests green; typecheck + build clean"*) are **local runs only**; neither
close doc mentions CI. This is the green-over-broken row for the library tranches: every named gate
was green on a developer machine and the integration gate was red the entire time.

### CH-G — the glass-ui primitive asks CH-4…CH-8 · **8–10 closes, still open** (§2/SD-6)
### CH-H — CH-10 keyframes precept-pin, CH-13 fourier quiescence · BOOKed at M, BOOKed at N, BOOKed at R. Three closes, no decision either way.

---

## §7 — Declared captures missing on disk

I sampled the evidence citations. Two fail.

### DC-1 — `n-verify-V4.md` has never existed (**the load-bearing miss**)

`N/PROGRESS.md:64` heads its verified-counts table: *"**Verified-counts ledger (V-fleet, primary
evidence — `audit/lanes/n-verify-V*.md`)**"*. V4 is cited as the source of two rows and twice more
in the charter:

- `N/PROGRESS.md:74` — *"glass-ui registry 3.12.0 | ships `./goo-blob ./watercolor-dot ./aurora` … | **V1/V4**"*
- `N/PROGRESS.md:76` — *"Per-satellite blob color | **infeasible without shader change** (geometry-only uniforms) → `uSatColor[]` glass-ui ask | **V4**"*
- `N/N.md:31` — *"Verified at the registry (**V1, V4**): glass-ui 3.12.0 ships …"*
- `N/N.md:276` — *"the `uSatColor[]` per-satellite shader extension … spec: per-satellite stop index + smin color-weight threading, **V4**"*

```
$ ls docs/tranches/N/audit/lanes/ | grep -i v4        → (nothing)
$ git log --all -- 'docs/tranches/N/audit/lanes/n-verify-V4.md'   → (empty)
$ git log --all --diff-filter=A --name-only | grep -i "verify-V4" → (empty)
```

V1, V2, V3, V5 all exist. **V4 was never committed and exists in no git object in this
repository.** The two facts it uniquely underwrites are load-bearing: (a) *"the cohort gate
DISSOLVED"* — the §0 reason N was allowed to supersede M — and (b) the `uSatColor[]` shader ask,
which R later records as *"PROMOTED load-bearing by U3"*
(`R/audit/pass1/R8-DEFERRED.md:101`). A conclusion that killed a tranche's central premise rests on
a verification lane that left no artifact.

*(Mitigation, for honesty: (a) is independently corroborated by V1, which does exist, and by the
fact that the consumes subsequently landed at `e32111c7`. (b) has no corroboration on disk.)*

### DC-2 — M's audit corpus is 5/12 lanes short by its own admission

`M/audit/wave1-2-synthesis.md:4-5`: *"The per-lane full findings were written to
`/tmp/m-w1-{A..F}.md` + `/tmp/m-w2-E.md` (**ephemeral**)"*, and `:14-17`: *"**A/B/C/D/F hit the
StructuredOutput-emission failure** but their substance was recovered."* So of the "two-wave
12-agent deep audit" that `M/M.md:269` names as M's **authority**, five Wave-2 lanes produced no
output at all and seven lanes have no durable artifact — the entire durable record is a 71-line
synthesis. M's charter never discloses this; only the synthesis does.

*(Consequence, verified: M's finding #5 — *"only ONE real un-gated continuous loop
(`useWatercolorBlob`)"*, `wave1-2-synthesis.md:50` — was **wrong**. N's E1 lane corrected it: the
watercolor hole was dormant and the live one was the mix canvas
(`N/audit/fold-ledger.md:66`). The real defect went ungated until R.W2, 2026-07-03.)*

### Captures that DO exist (sampled)
`N/audit/impl/shots/` — 84 PNG/JPEG captures present. `N/audit/user-audit-2026-06-12/` — 28
screenshots + LEDGER.md present. `N/audit/lanes/` 41 files, `lanes2/` 34 files.
`docs/tranches/N/audit/impl/W5B.md:100` carries the **VAL-1 KILL with recorded rationale** — an
honest disposition, and the model for how ship-or-KILL should read.

---

## §8 — Alias smuggling / masked fallbacks

- **No alias smuggling found in M–P.** The extirpations were real: `goo-blob/`,
  `watercolor-dot/`, `webgl-utils.ts` are absent from the tree (only sibling-worktree copies under
  `.claude/worktrees/` remain), and no compat shim was left behind. `useLayerTransition` fork
  deleted at `ee458e5e`. This is the cleanest part of the record.
- **Masked fallback, N-era**: none found in `src/`/`api/src`. The masking in this scope is
  organizational, not code-level — a defect hidden behind *"= the W8 ceremony"* (CH-A) or
  *"owned by N.W10.D"* (CH-C) is the same failure mode as a `try {} catch {}`: the caller sees
  green and the error is swallowed by a wave that never runs.
- **Soft CI step**: the `continue-on-error: true` on demo typecheck is V-era (`6d6d3521`,
  2026-07-17) and was lifted the same day-window (`ef57230b`) — **not** an M–P finding. Recorded
  here so the next audit does not misattribute it.

---

## §9 — O and P, specifically

**O executed well and closed dishonestly at the seams.** Seven waves shipped with real commits and
real version cuts (`650a8cdb` → `dd9beb5c`); the two P0 crashes were genuine and genuinely fixed; the
subpath split, grammar-2026, zero-alloc, and idempotence work all verify in the tree
(`src/subpaths/*`, `package.json` exports = 7 subpaths). The failures are:

1. VG-3 — the self-discharging dispatch gate, and the inherited-from-an-unclosed-predecessor
   invariant claim (§5).
2. CH-D — the `proof:*` re-introduction against a standing prohibition (§6).
3. CH-E/CH-F — untagged releases, CI never green (§6).
4. **O.W7-demo, the only unshipped wave.** `O/PROGRESS.md:29`: *"NOT SHIPPED (demo-only; deferred —
   not a library-close blocker)"*. R's census scores it *"M→N→O(deferred, demo-only)→R ≈ **4
   (CHRONIC)**"* (`R/audit/pass1/R8-DEFERRED.md`, R8-15). **It did eventually land, honestly
   re-scoped**: R.W4 lane E4 ruled the detached pane *"contrivance"* and fused it into the input —
   verified at HEAD, `demo/color-session/useColorParsing.ts:94` (`astEcho`) and `:107`
   (`gamutVerdict`). RETIRED_WITH_RATIONALE, correctly.
   Note a live citation drift: `O/PROGRESS.md:58` names the born-RED gate `proof:parse-lab-mount`;
   `R/audit/pass1/R2-PROMPTS.md` cites the same line as `proof:il-mount`. Neither script ever
   existed.

**P is a retro-authored record, not a close.** `P/FINAL.md:5-7`: *"Authored lean at R.W0
(2026-07-03) — the P tranche shipped its version and tag but **never carried a close record**."*
There is no P charter, no wave specs, no PROGRESS board — the directory contains exactly one file.
Its content claims verify (`parseCSSSubValue`, `extractFunctions` at `src/parsing/extract.ts:124`
per the doc, `color2Into`, the `:any`→`string` narrowing, the O(N²) ctor fix), and P is the one
tranche in scope that did *record hygiene* for its predecessor (it committed the untracked
`docs/tranches/O/`). But a tranche whose close document is written by its successor cannot have
audited itself.

---

## §10 — What the next tranche should carry forward

1. **The seven silent drops (§2)** — SD-1 through SD-6 plus the K-doc trio. Five are minutes of
   work (three doc lines); two (the modern-web levers, the standing design facility) are real
   scope decisions that have never been made, only forgotten.
2. **The un-gated inversion (§4/VG-4)** — `dependencies: {glass-ui ^7, keyframes ^6}` in a pure-sink
   library, with a cycle through keyframes@6 → value.js@4.0.0, and a packed-surface gate that
   cannot see it. **This ships on the next publish.**
3. **T.W0's anti-re-book mechanism** — *"RULED-AT-RATIFICATION into a W0-EXECUTABLE item …
   Never a silent 3rd re-book"* (`T/FINAL.md:179`) is the only device in this repository's history
   that has ever killed a 4-close chronic. Every BOOK in the next charter should carry either a
   named executable row or an explicit KILL — never a wave name, because wave names are where these
   items go to die (N.W6, N.W8, N.W9, N.W10.D, N.W14.E, N.W16 all absorbed live defects and never
   ran).
4. **Two standing gates that no longer exist** — `boot-smoke.mjs` (inv-N-1) and
   `css-emission-probe.mjs` (the desktop-P0 guard) were both deleted as "CI-orphaned" at V.W42.
   Confirm the named successors actually cover them, or re-anchor the invariants.
5. **CH-4…CH-8 and CH-10/CH-13** — three closes of BOOK with no decision. Ship-or-kill them by
   name, and stop re-using retired chronic ids (`CH-4` now means two different things).

---

*Audited 2026-07-24. Every claim above is a file:line, a git object, or a pasted command output.
Nothing here is taken from a close document's own assessment of itself.*
