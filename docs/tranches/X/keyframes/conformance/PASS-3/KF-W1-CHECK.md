# KF-W1 — FRESH ADVERSARIAL SPEC CHECK, PASS 3 (L-18/L-20)

**Target**: `docs/tranches/X/keyframes/waves/KF-W1.md` (336 L, mtime 2026-08-28 14:25)
**Seat**: FRESH — everything below re-derived from the bytes. No list, count, anchor or verdict inherited from `PASS-1/KF-W1-CHECK.md`, `PASS-2/KF-W1-CHECK.md`, `PASS-1/RULINGS.md` or `PASS-2/RULINGS-2.md`. Those four were read to know *what was claimed cured*, never to source a measurement.
**Corpus**: the **58** `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58) + the sole carry `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`.
**Frontier of record (TREE LAW)**: keyframes `origin/master` = **`81a56990`**. `keyframes-v-exec` HEAD = `81a56990`, porcelain **0**. The local `keyframes.js` HEAD **`8281638c`** is **DISQUALIFIED** and was opened only to date drift and to test what a repo-unscoped `HEAD` resolves to.

**VERDICT: DEFECTIVE — 1 BLOCKER · 5 MAJOR · 3 MINOR · 2 INFO.**
**Census: CLEAN — 6 routed · 6 booked · 0 escaped · 0 inventions.**

The census axis is clean and reproduces independently. Every keyframes-side witness at the frontier and every value-side `INBOX.md` anchor reproduces **byte-exact** — round 2's re-keying holds without exception. What pass 3 finds is on the other four axes, and the headline is new to this pass: **the wave's diagnosis of its own subject is inverted at the bytes**, and the gate built on that diagnosis commissions a *new* false certification into the cure letter.

---

## §1 · AXIS 1 — ID-KEYED CENSUS (full re-enumeration; escapes by bytes)

### 1.1 Closing the routing alphabet first

| probe | command | result |
|---|---|---|
| corpus size | `ls kf-*.md \| wc -l` | **58** |
| `KF.W1-DEP` anchors | `grep -o 'KF\.W1-DEP' kf-*.md \| wc -l` | **18** |
| records carrying them | `grep -c 'KF\.W1-DEP' kf-*.md \| grep -v ':0$'` | **5** — ACG **4** · CC **4** · CPW **3** · DGC **4** · KPT **3** |
| literal `KF.W1` substring | `grep -o 'KF\.W1' kf-*.md \| wc -l` | **33** |
| `KF.W10` substring | `grep -o 'KF\.W10' kf-*.md \| wc -l` | **15** |
| **bare `KF.W1` token** | `grep -oE 'KF\.W1([^0-9A-Za-z-]\|$)' kf-*.md \| wc -l` | **0** |
| terminal dispositions containing `W1` | `grep -ohE '→ \*\*[^*]*W1[^*]*\*\*' kf-*.md \| sort -u` | **`→ **KF.W10**` only** |

33 = 18 + 15 exactly. **The spec's alias-block census (18 anchors / 5 records / token 0 / literal 33) is EXACT at the bytes**, per-file counts included.

### 1.2 The routed rows, id for id

Six adjudicated rows carry a `KF.W1`-form target. All six are one identity — **census F-1**, the phantom `@mkbabb/glass-ui` dependency, collided into this namespace by `lane-frontend.md §10`'s superseded taxonomy.

| # | record | anchor | booked as | state |
|---|---|---|---|---|
| R-1 | kf-AnimationControlsGroup | `:28` | C-13 fold-identity + §8 exclusion row 5 | **BOOKED** |
| R-2 | kf-AnimationControlsGroup | `:47` | C-13; rider `useControlsKeyboardShortcuts.ts:1` **verbatim at the record** ("the sole binding site of all 18 shortcuts") | **BOOKED** |
| R-3 | kf-ChannelControls | `:56` | C-13; rider `ChannelControls.vue:219` **verbatim** ("root-barrel `TooltipProvider, Button` … the first import that fails") | **BOOKED** |
| R-4 | kf-ControlsPaneWrapper | `:60` | C-13; rider `.vue:166` **verbatim** ("the demo's SOLE `/drawer` consumer") | **BOOKED** |
| R-5 | kf-DemoGlobalChrome | `:44` | C-13; four toast classes **verbatim** (`text-body`/`text-small`/`bg-foreground`/`text-background`); **`a59d3a22` dissent carried, not resolved** | **BOOKED** |
| R-6 | kf-KfPillTabs | `:46` | C-13; rider **verbatim** ("one class + eight custom properties, seven glass-ui-owned") | **BOOKED** |

Anchor decomposition, measured: **5** taxonomy-preamble (`:17`/`:17`/`:6`/`:17`/`:19`) + **6** routing rows + **5** ADJUDICATED-summary + **2** riders (`kf-ChannelControls:142`, `kf-DemoGlobalChrome:43`) = **18**. Closed.

### 1.3 Escape sweep by bytes — every other channel

`Mail Cure` **7 records** — all the routing-law taxonomy preamble reciting the census sketch (verified at `kf-CopyButton:36`: *"W0 Substrate Settle §B-12 · **W1 Mail Cure** · W2 Parse Façade…"*), a declaration of the alphabet, not a routing. `O-8\b` **2 records** / `O-11\b` **1 record** — every hit inspected: all are `KF-CO-8` / `KF-CO-11` substrings in kf-ChannelOptions and kf-LayerConfigPanel. **Zero** hits corpus-wide for `X.KF.W1` · `KF-W1` · `W1 ·` · `I-26` · `INBOX` · `VALUEJS-INBOUND` · `sampleBezier` · `D-GAP-6` · `parseStylesheet` · `lerpArray`.

**The carry** (`KF-W6-CARRY.md`): bare `KF.W1` token **0** · `KF.W1-DEP` **1** (the same booked F-1 identity) · literal `KF.W1` **3** · `Mail Cure` **0**. **Nothing escapes to this wave through the carry.**

### 1.4 Census tally

| quantity | value |
|---|---|
| rows routed to census-taxonomy **KF.W1 (Mail Cure)** | **0** |
| rows routed to the collided token **`KF.W1-DEP`** | **6** |
| **ROUTED (denominator)** | **6** |
| **BOOKED** (fold-identity C-13 + §8 exclusion-with-reason) | **6** |
| **ESCAPED** | **0** |
| **INVENTIONS** (rows/gates/bounds manufactured to fill the ∅ column) | **0** |

**The ∅-column finding is TRUE and independently re-derived. C-14's L-19 lock is honoured.** — but see **D3-5**: the booking *site* the header cites states the wrong cardinality.

---

## §2 · AXIS 2 — AUTHORITY REALITY (every cross-spec receipt at its anchor)

### 2.1 Stable anchors — ALL RESOLVE

| receipt | measured |
|---|---|
| **KF-W4 §Preconditions `OP-5`** | `:35` — *"**OPEN — KF.W1's.** … the amendment-addendum must land before they are honestly citable"* ✓ verbatim |
| **KF-W4 §Sequencing row `KF.W1 · Mail Cure`** | `:253` — *"**PRECONDITION on anchor citability**"* ✓ |
| **KF-W3 §Preconditions `OP-5`** | `:42` — *"UNLANDED"* ✓ |
| **KF-W3 §Cross-edges row `KF.W1 · Mail Cure (O-8/O-11) + E13`** | `:221` — *"**DEPENDS ON** \| L-4"* ✓ |
| **KF-W10 §1 `Opens after`** | `:20` ✓ verbatim |
| **KF-W10 §Preconditions `OP-3`** | `:59` — *"**UNLANDED** … records a **false close** (G-6 depends on this, not the reverse)"* ✓ verbatim |
| **KF-W10 §Sequencing `B. → KF.W1 (Mail Cure, SS-2)`** | `:382` ✓ verbatim |
| **KF-W0 §Sequencing OUTBOUND `KF.W1 · Mail Cure`** | `:439` ✓ verbatim (reverse edge, conflict correctly recorded) |
| **KF-W0 §Excluded `KF.W1's mail re-delivery`** | `:477` ✓ verbatim |
| **KF-W0 §Sequencing packet-roster `the canonical 17`** | `:447` ✓ — self-declares *"re-cut this round from this file's stale 15"*; roster id-for-id matches KF-W1's |
| **KF-W0 §Sequencing OUTBOUND `KF.W4 · K-Quartet Hygiene`** | `:440` ✓ — gap-preserving `B10-17/18/19/20/22/23 + B10-27 + B18-19 + B21-17` |
| **`INTAKE-ADJUDICATION-2026-08-03.md` §3 `### KF.W4 · K-Quartet Hygiene …`** | `:146`, enumeration `:147-148` ✓ |
| **`CARRY-CUT-LEDGER.md:186`** (CC-084) · **`:255`** (X-W9) | ✓ both |
| **`library-band.md:205`** | ✓ *"DECLINE — `sampleBezier`"* |

### 2.2 Reciprocity — re-measured over ALL TEN authored siblings

`grep -oE 'KF\.W1([^0-9A-Za-z-]|$)'` → **KF-W0 4 · KF-W3 5 · KF-W4 2 · KF-W10 8**; **0** for KF-W2 · W5 · W6 · W7 · W8 · W9. Identical to the spec's §9 item 5. `grep -c 'O-11'` → **0** in all six non-consumers; every `O-8` occurrence in them inspected individually and every one is a `KF-CO-8`/`KF-CO-1` substring. **The COHESION §3.1 conditional mark discharges on the measurement across all six.** Consumer set stands at four (W3/W4/W10 forward, W0 reverse-with-conflict-recorded). Spec set = measured set.

### 2.3 Value-side `INBOX.md` — every round-2 re-key HOLDS

97 L / **56,702 B** ✓ · sweep-path law **`:15-16`** ✓ verbatim · glass BI→BJ→BK note now at `:13-14` ✓ (incl. *"cost 19 days on the 08-09 letters → I-28/I-29"* — C-9's precedent, exact) · **I-10 at `:47`** ✓ (`:45` = I-7 ✓) · **I-26 at `:92`** ✓ (`:90` = I-21a ✓) · max outbound **`O-20` at `:95`** ✓ · narrowed grep → **1 hit** ✓ · broad grep → **5 hits** `:15 :66 :68 :72 :75` ✓ (the spec's declared departure from RULINGS-2 R2-1 item 4 is **correct**; the ruling's four-item enumeration omits `:68`). Commits `48003630` (12:32:16) and `7a7dc6ef` (12:33:59) exist with those timestamps ✓.

### 2.4 The failures — see D3-3, D3-4, D3-6.

---

## §3 · AXIS 3 — M-25 DEPTH (locks · riders · dissents)

**Locks, all present and verbatim**: C-1 *"Amend, do not re-send"* + ANTI-STALENESS · C-3 HARD NEGATIVE (never re-asked, no cut date) · C-7 no-re-ask/no-re-scope/no-severity-change + anti-rename on `K1–K4`/`G-L7a–d` · C-8 HARD NEGATIVE + DESIGN LOCK (completable without §B-12) · C-9 SIZING LOCK (two lines, no tooling) · C-10 ORDERING (void ahead of G-KF1-1) + **MINT LAW** · C-11 SEQ-LOCK + verbatim-retention · C-12 HARD NON-GATING · C-14 L-19.

**Riders**: all five F-1 component riders verified **verbatim at the records** (§1.2). **Dissents carried, not resolved**: the `a59d3a22` rider (routed to KF.W0's re-measurement) · the KF-W0 reverse-edge **conflict** (recorded for COHESION §3 and the owner; neither spec rewrites the other) · C-4's recorded asymmetry. **Agglomeration by identity is correct** — one identity, six rows, booked once, never re-booked per component.

**Depth defect**: **D3-8** (the transit rider roster drops KF-AV-28).

---

## §4 · AXIS 4 — GATES BORN-RED, REAL WITNESSES AT THE FRONTIER

### 4.1 Frontier witnesses — every one reproduces byte-exact

`keyframes-v-exec` HEAD `81a56990`, porcelain 0. Coordination dir = **9 entries + `vnext/`**, no addendum, no O-8, no O-11 ✓. `INBOUND-LEDGER` = **9 rows** (IN-ATLAS-1..5 · IN-GLASS-1..2 · IN-VALUE-1..2), no IN-VALUE-3/4 ✓. `parseStylesheet` raw output = **nine** lines: call sites `adapter.ts:222` · `scroll/grammar.ts:109` · `validate.ts:182`, imports `:7`/`:37`/`:47`, prose `adapter.ts:202`/`validate.ts:41`/`validate.ts:130` ✓ exactly as G-KF1-3 states. Import census **62** = `/css` 29 · `/value` 16 · `/color` 7 · `/math` 5 · `/easing` 3 · `/transform` 2 ✓.

**§5a drift table, row for row at `81a56990`**: three ABSENT anchors ✓ · `compile/value/compile.ts:32` = `const parsed = parseCssValues(value);` ✓ · `browser.ts:162` ✓ · `easing/registry.ts:36` docstring ✓ · `easing-serialize.ts:71-73` reverse-map ✓ · `emit/backward/` = exactly `backward.ts, color.ts, index.ts, walk.ts` ✓ · `color.ts` **385 L** ✓ · `package.json:70` value.js `4.0.0` ✓ · **`:77` glass-ui `"7.0.0"` exact — SCH-1's falsifier, F-1 FALSIFIED-AT-HEAD** ✓ · `options.ts:31` ✓ · `leaves.ts:28` ✓ · `load-engine.ts:65` ✓ · `css-text.ts:41` ✓ · `test/internal/leaves-parity.test.ts` PRESENT ✓. **All 14 left-column anchors verified to be genuine packet anchors** (each greps in O-8 or O-11).

**Sacred checkout**: `41  1` ✓ · **252** dirty ✓ · both bodies **7,064 B** / **15,633 B** at the stated mtimes ✓ · O-8 `:101-103` verbatim ✓ (`:100` blank ✓) · O-11 `:34`/`:40`/`:52`/`:82` verbatim ✓ · **O-11 §A3's site table names three sites — `browser.ts:165`, `options.ts:31`, `value-ast.ts:71` — and ZERO `parseStylesheet` call sites.** C-2/G-KF1-3's "0 of 3" is **TRUE**.

**Born-RED honesty**: G-KF1-1..10 are each genuinely RED right now (addendum absent; anchors drifted; certification live; question live; conditional live; I-26 ROWED with max `O-20`; sweep law unchanged; back-fill `find` → **0**; no IN-VALUE-3/4). G-KF1-11 DECLARED-SATISFIED and G-KF1-12 stay-GREEN INVARIANT are correctly relabelled and correctly excluded from the born-RED tally. **L-19 holds affirmatively: no gate is a script, no row was manufactured, the mail tooling a lesser spec would mint is excluded by name.**

### 4.2 The failures — D3-1, D3-2, D3-6, D3-10, D3-11.

---

## §5 · AXIS 5 — POSTURE

| item | verdict |
|---|---|
| **W4 head honored** | ✓ No conflict. KF-W1 declares PRECEDES-on-anchor-citability; KF-W4 reciprocates at `OP-5` and at its §Sequencing row. W4's role as the *vue-tsc sequencing head* for other waves is untouched by W1, which opens no source and no `package.json`. |
| **W4's `npm run check` re-cut COMPOSES with the live scripts** | ✓ **COMPOSES.** Live at `81a56990`: `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"`. W4's re-cut `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure` swaps only the first conjunct; `tsconfig.json`, `tsconfig.test.json` and `proof:structure` all exist at the frontier, and W4 declares the `+vue-tsc` devDep add its re-cut needs. |
| **W3 gated-unscheduled** | ✓ KF-W1 names it *"KF.W3 (Parser Consumption, **GATED**)"* at cross-edge 1 and schedules nothing for it. |
| **KF-AV-28 present where governed** | ⚠ Present at §8's 17-packet row ("the KF-AV-28 supersession rider on the W7-evaluated surfaces"); **absent from cross-edge 9's parallel transit roster** — **D3-8**. |
| **O-21 (not O-20) at W1's mint sites** | ✓ **CLEAN.** All five load-bearing sites plus the cross-edge 11 trailing citation commission **O-21**; every surviving `O-20` token is a *measurement* of the current ledger maximum, which is correct. R2-1's cure is fully discharged, and C-10's MINT LAW makes the literal non-load-bearing. |
| **W10's carry-routed obligations closed by carriage not omission** | ✓ (not this wave's). `KF-W6-CARRY.md` routes **nothing** to KF.W1 (§1.3). W1 carries W10's dependency in the other direction at cross-edge 11 as a record, mints no new obligation, and correctly hands W10 *the row*, not a frozen id. |

---

## §6 · DEFECTS

### D3-1 · **BLOCKER** — G-KF1-4's GREEN commissions a NEW false certification into the cure letter

C-6 and G-KF1-4 both order the addendum to withdraw *"matches your tree exactly"* by **"naming the tree it matched (`8281638c`) and the tree it does not (`81a56990`)"**.

Measured at the disqualified sha:

```
git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' 8281638c -- src | sort | uniq -c
  10 from "@mkbabb/value.js"        24 from "@mkbabb/value.js/parsing"
   9 from "@mkbabb/value.js/color"  26 from "@mkbabb/value.js/units"
   5 from "@mkbabb/value.js/easing"  2 from "@mkbabb/value.js/transform"
   5 from "@mkbabb/value.js/math"           → 81 total
```

O-11 `:52` states **61 total**, split `/css` 29 · `/value` 15 · `/color` 7 · `/math` 5 · `/easing` 3 · `/transform` 2. At `8281638c` that split matches on **zero of six lines** — `/css` and `/value` do not exist there at all, and `/parsing` (24) and `/units` (26) do. `parseStylesheet` returns **0** hits in `src` at `8281638c`; `browser.ts` has no `parseCssScalar`.

The tree O-11 actually matched is the sacred checkout's **252-dirty uncommitted worktree**:

```
grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' -r src | sort | uniq -c   # keyframes.js worktree
   7 /color   29 /css   3 /easing   5 /math   2 /transform   15 /value   → 61 total
```

**Byte-identical to O-11's certification.** Writing "`8281638c`" into the addendum withdraws one false certification by inscribing another — the SCH-4 defect class reproduced inside its own cure, exactly as R2-1 caught the ledger-id defect reproducing I-26 one layer up. The honest sentence names an *uncommitted working tree at 41-behind-plus-252-dirty*, which is not a sha and cannot be re-derived by the recipient — and that, not an off-by-one, is what makes the certification unusable.

### D3-2 · **MAJOR** — the wave's thesis about its own subject is inverted at the bytes

§1's Goal criterion: *"The letters were not wrong. They were unreachable, **and they certified a tree they had not measured**."* C-5: *"Both packets measured the stale tree."* C-6: *"import-census **off-by-one**."*

Measured in the sacred worktree — **every** anchor §5a marks ABSENT or DRIFTED resolves **exactly**:

| §5a says | worktree |
|---|---|
| `compile/value-ast.ts` **ABSENT** | **PRESENT**; `:71` = `const parsed = parseCssValues(value);` — O-11's cited line, exact |
| `compile/easing/easing-registry.ts` **ABSENT** | **PRESENT**; `:36` = the exact docstring |
| `compile/emit/backward.ts` **ABSENT** · `backward-color.ts` **ABSENT** | **both PRESENT** |
| `resolve/browser.ts:165` → `:162` | **`:165`** = `const parsed = parseCssScalar(source);` |
| `package.json:69` → `:70` | **`:69`** = `"@mkbabb/value.js": "4.0.0"` |
| `emit/easing-serialize.ts:70-71` → `:71-73` | `:71` = `const registryName = timingFunctionEntries.find(` |
| import census "off-by-one" | **61, split exact** — no error at all |

The packets measured a live tree **precisely** and certified it **accurately**. They named no sha. `grep -c 'worktree\|working tree\|uncommitted' KF-W1.md` → **0**: the spec records "252 dirty" twice yet never entertains the worktree as the baseline, so it attributes to the *senders* an error the senders did not make. For a wave whose entire product is a letter telling an external repo what went wrong, relaying "your letters measured a stale tree and were off by one" is a false statement about their tree. The operational payload (re-anchor at `origin/master`; the drift table) survives intact and is still correct and useful — only the causal account and the certification sentence are wrong.

### D3-3 · **MAJOR** — the round-2 close stamp is falsified by its own file

§11 row 7's U-2 stamp certifies: *"**Every edge is now carried at its §-heading + row label alone, with NO line number anywhere on this file's cross-spec receipts.**"*

**Five** survive, and **four are dead**:

| site | spec asserts | measured |
|---|---|---|
| cross-edge 2 (`:229`) | KF-W0 OUTBOUND row "at **`:393`**" | row is at **`:439`**; `:393` = *"(ii) EVERY NAME DISPOSED, AND W0 STRIKES NOTHING"* |
| cross-edge 2 (`:229`) | KF-W0 §Excluded row "at **`:431`**" | row is at **`:477`**; `:431` = *"**Within the wave.** OP-1 → (.b ∥ .c) …"* |
| cross-edge 11 (`:243`) | KF-W10 `Opens after` "at **`:20`**" | **`:20`** ✓ ALIVE |
| cross-edge 11 (`:243`) | KF-W10 `OP-3` "at **`:54`**" | `OP-3` is at **`:59`**; `:54` is **blank** |
| cross-edge 11 (`:243`) | KF-W10 `B. → KF.W1` "at **`:332`**" | it is at **`:382`**; `:332` is **blank** |

Every *edge* survives at its stable anchor in the same direction and force (§2.1) — this is a receipts defect, not a substance defect. But R2-7's whole point is that a stamp certifying zero coordinates while carrying five is worse than carrying five openly.

### D3-4 · **MAJOR** — one file, two verdicts on the same four coordinates

§1's KF-W10 bullet struck `:54` and `:332` **by name**, stating each *"was blank at the current bytes"*; §7 cross-edge 11 then asserts both as live locations ("at `:54`", "at `:332`"). §1's KF-W0 bullet struck `:393`/`:431` as *"had both drifted … and no line numbers ride these receipts"*; §7 cross-edge 2 rides both. A downstream seat reading §1 and a seat reading §7 get contradictory instructions about the same four anchors, in a file whose §11 declares dated-correction discipline (E-3) as its governing idiom.

### D3-5 · **MAJOR** — census cardinality schism at the booking site the header cites

Header PROVENANCE: *"**6 routed · 6 booked · 0 escaped** (all six the census-F-1 identity under the collided `KF.W1-DEP` token; §5 C-13, **§8 row 5**)."*
§8 row 5, the cited receipt, at `:255`: *"**All five `KF.W1-DEP` / census F-1 rows** and their component riders."*

Measured: **six** routed rows across **five** records — `kf-AnimationControlsGroup` carries **two** (`:28` the F-1 severity row, `:47` the L-3/C-1 row that owns the `useControlsKeyboardShortcuts.ts:1` sole-binding-site rider). C-13's "five" is correct (records); §8 row 5's "five **rows**" is not. The header points at the exclusion row as its booking receipt, and that row under-books by one — a seat booking from §8's cardinality drops R-2 and its rider. This is the same unreceipted-cardinality class the spec itself struck as "**16** was stated by no document in the tree" at C-14 leg (iii), applied to fourteen figures and skipped for this one.

### D3-6 · **MAJOR** — the two gates whose GREEN turns on tree identity are the two whose witnesses name no tree

G-KF1-3 (*"in `keyframes-v-exec`"*) and G-KF1-10 (*"in `keyframes-v-exec`"*) scope their repo. **G-KF1-2 and G-KF1-4 do not** — both run bare `HEAD` with no repo named, and both are the gates whose GREEN conditions turn on *which tree was measured*. §4's SACRED-CHECKOUT LAW puts `/Users/mkbabb/Programming/keyframes.js/**` in bounds as a read target, G-KF1-12's own witness runs there, and OP-1's `ls` runs there — so it is the tree a seat is most likely to already be sitting in. There, `HEAD` = the **DISQUALIFIED `8281638c`**:

- G-KF1-4 returns **81**, not 62, across a subpath alphabet sharing no name with the stated split.
- G-KF1-2's `git grep -n 'parseCssScalar' HEAD -- src/animation/resolve/browser.ts` returns **nothing** — the assertion `→ :162` cannot even fail informatively.
- `git grep -c 'parseStylesheet' 8281638c -- src` → **0 files**.

§6's blanket preamble declares the frontier in prose; the commands are what a seat runs. Two words (`in keyframes-v-exec`) cure it, in the idiom two sibling gates already use.

### D3-7 · **MINOR** — the hard-gate count re-inflates by two what §1's next paragraph deflates by two

§1 `:32`: *"**Hard gate**: **twelve** conditions in §6."* §6 `:209`: G-KF1-11 is *"**NOT a close gate this wave passes**"*; `:214`: G-KF1-12 is an INVARIANT, *"not born-RED"*; §11: the tally is *"10 born-RED · 1 DECLARED-SATISFIED · 1 stay-GREEN INVARIANT."* A condition explicitly declared not to be a close gate cannot be one of twelve hard-gate conditions. The honest header is *"ten hard conditions + one declared-satisfied + one invariant."*

### D3-8 · **MINOR** — the transit rider roster drops KF-AV-28

§8's 17-packet row lists the riders that travel with the homings and includes *"the KF-AV-28 supersession rider on the W7-evaluated surfaces."* Cross-edge 9's parallel list — introduced as *"**the locks that must travel WITH those homings, restated so they are not lost in transit**"* — enumerates five (kf-SquareScene test obligations · LP-1 sequencing · MbabbMenu MUST-CARRY · TD-1/TD-2 bundle · SS-6 producer routing) and **omits KF-AV-28**. The omission is in the operative transit declaration, which is precisely the one that must not lose a rider. (KF-AV-28 is live across the sibling set: W9 ×11 · W6 ×10 · W7 ×7 · W2/W10 ×5 · W4/W3 ×4 · W8 ×2 · W0 ×1.)

### D3-9 · **MINOR** — the discharge tally mixes two metrics in one enumeration

§9 item 5 / §11 row 10: *"every `O-8` hit is the `KF-CO-8` substring (**KF-W5 ×1, KF-W6 ×2, KF-W9 ×5**) — each inspected line-by-line this seat."* Measured **occurrences**: W5 **1** · W6 **4** · W9 **5**. Measured **lines**: W5 1 · W6 2 · W9 3. W5 and W9 are occurrence counts; W6 is a line count; no single command yields the stated triple. **The load-bearing claim is TRUE** — every occurrence in all six non-consumers is a `KF-CO-8`/`KF-CO-1` substring, zero real letter citations, verified individually here.

### D3-10 · **INFO** — the one gate clause in §6 that cannot be re-executed as written

G-KF1-5's third witness leg: *"Grep of both coordination trees for any withdrawal → **0**."* No pattern, no path, no command — in a section whose own preamble promises *"literal commands with literal outputs."* Every sibling leg in the same gate is literal (`sed` on O-8 `:101-103`; `CARRY-CUT-LEDGER.md:186`). A seat cannot reproduce or falsify this one.

### D3-11 · **INFO** — §5a rows 6–8 keep the posture §11 row 8 cured for row 14

Rows 6–8 read *"line anchors **NOT re-measured at spec-authoring** — the executing seat resolves all three,"* under a §5a header whose own law is *"Re-measured 2026-08-28 … The executing seat re-derives this table again"* and a C-5 lock reading *"Anchors are re-resolved at authoring, **never copied**."* §11 row 8 measured row 14 for exactly this reason (*"the executing seat now inherits nothing"*) and left rows 6–8 as the file's remaining unmeasured figures. `emit/backward/color.ts` is **385 L** at the frontier, so `:171`/`:250`/`:263` are all in range and resolvable by the same one-line command already run for rows 10–13.

---

## §7 · WHAT STANDS

- **The census is CLEAN and independently re-derived**: 6 routed / 6 booked / **0 escaped** / **0 inventions**, closed four ways (token · substring decomposition · terminal-disposition alphabet · carry sweep). The **∅-column finding is TRUE** and no row, gate or bounds item was manufactured to fill it.
- **Every keyframes-side witness at the frontier reproduces byte-exact**, and the §5a drift table reproduces row for row, with all 14 left-column anchors verified to be genuine packet anchors.
- **Every value-side `INBOX.md` re-key from round 2 HOLDS** — `:15-16`, `:47`, `:92`, `:95`, 97 L / 56,702 B, both greps. The spec's declared **departure** from RULINGS-2 R2-1 item 4 (five broad-grep hits, not four) is **correct at the bytes**; R2-5 was applied rightly.
- **R2-1 is fully discharged**: `O-21` at every commissioned site, the MINT LAW written into C-10, both witnesses re-cut, the C-9 precedent receipted at `7a7dc6ef`, the phantom "SS-2 CARRY" provenance struck.
- **Reciprocity is the authored set**: four consumers measured, six non-consumers discharged by measurement, KF-W0's reverse-edge conflict recorded and not silently reconciled.
- **M-25 depth is real**: all five F-1 component riders verbatim at the records, all three dissents carried rather than resolved, all ten locks intact, one identity booked once.
- **L-19 holds affirmatively.** No gate is a script; the mail tooling a lesser spec would mint is excluded by name; the two non-gates are labelled as such rather than kept for the count.

**Local verdict: DEFECTIVE — 1 BLOCKER · 5 MAJOR · 3 MINOR · 2 INFO. Census CLEAN (6 / 6 / 0). Zero inventions.**

Nine of the eleven cures are editorial and land inside this file. **D3-1 and D3-2 do not** — they change what the addendum says to keyframes about keyframes' own tree, and they must be settled before `.b` authors a single line, because the letter this wave exists to send would otherwise carry a fresh false certification out of the repo.
