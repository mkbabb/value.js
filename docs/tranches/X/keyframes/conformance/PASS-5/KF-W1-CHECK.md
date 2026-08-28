# KF-W1 — FRESH ADVERSARIAL SPEC CHECK, PASS 5 (L-18/L-20)

**Target**: `docs/tranches/X/keyframes/waves/KF-W1.md` — **572 L / 200,681 B**, mtime **2026-08-28 17:32:20**.
**Seat**: FRESH. Every list, count, anchor and verdict below is this seat's own command output at the current bytes. `PASS-4/KF-W1-CHECK.md`, `PASS-4/RULINGS-4.md` and `PASS-4/CLOSE-CERT.md` were read **only** to know what was ruled, what was claimed cured, and what LAW C(4) commissioned — never as a source of a measurement. The census below is derived **BY RECORD** from the 58 `kf-*.md` files themselves (the nine-block partition stays retired, RULINGS-3 R3-5).
**Corpus**: `docs/tranches/V/megatranche/registry/adjudicated/`, `ls kf-*.md | wc -l` → **58**; sole carry `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (`find docs/tranches/X/keyframes -iname '*CARRY*'` → the dir plus exactly one file).
**TREE LAW**: keyframes witnesses verified at **`origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1`** in `/Users/mkbabb/Programming/keyframes.js` (read-only; zero writes, zero git mutations, zero npm). `keyframes-v-exec` HEAD re-verified `81a56990`, porcelain **0**. Local `8281638c` opened **only** as declared historical context, per R3-2.
**First act, per RULINGS-4 §END**: `PASS-4/CLOSE-CERT.md` audited against the bytes — see **§0**.

**VERDICT: DEFECTIVE — 0 BLOCKER · 5 MAJOR · 3 MINOR · 2 INFO.**
**Census: CLEAN — 6 routed · 6 booked · 0 escaped · 0 inventions.**

**The severity head stays MONOTONE-flat (pass 4 = 0·5·3·2 → pass 5 = 0·5·3·2), and all ten PASS-4 local defects are verified CURED at the bytes.** What pass 5 finds is that **the drift class LAW C and the RECONCILE seat were built to kill is not dead — it re-fired inside the very round that named it, on the very claim D4-5 cured**, and the certification that was supposed to prove otherwise is itself falsified by a per-wave file that wrote **22 seconds after it**.

---

## §0 · FIRST ACT — `PASS-4/CLOSE-CERT.md` AUDITED AGAINST THE BYTES

RULINGS-4 §END, the RECONCILE row: *"The round does not close without it; the pass-5 union seat audits it as its first act."* LAW C(4)(i) requires *"the mtime table of all 11 specs proving it wrote last."*

`stat -f '%Sm %z %N' -t '%Y-%m-%d %H:%M:%S'`, run this seat:

| spec | CLOSE-CERT §1 says | measured this seat | Δ |
|---|---|---|---|
| `KF-W3.md` | 16:56:52 · 168,078 | 16:56:52 · 168,078 | — |
| `KF-W0.md` | 16:58:59 · 224,173 | 16:58:59 · 224,173 | — |
| `KF-W6.md` | 16:59:25 · 240,976 | 16:59:25 · 240,976 | — |
| `KF-W4.md` | 16:59:44 · 209,984 | 16:59:44 · 209,984 | — |
| `KF-W2.md` | 17:30:52 · 286,177 | 17:30:52 · 286,177 | — |
| **`KF-W10.md`** | **17:31:54 · 209,902** | **17:38:21 · 209,923** | **+6m27s, +21 B** |
| `KF-W9.md` | 17:32:08 · 221,965 | 17:32:08 · 221,965 | — |
| `KF-W1.md` | 17:32:20 · 200,681 | 17:32:20 · 200,681 | — |
| `KF-W5.md` | 17:32:57 · 252,821 | 17:32:57 · 252,821 | — |
| `KF-W7.md` | 17:33:23 · 210,113 | 17:33:23 · 210,113 | — |
| `KF-W8.md` | 17:34:06 · 195,418 | 17:34:06 · 195,418 | — |
| `CLOSE-CERT.md` | (writes last) | **17:37:59 · 27,004** | — |

**Ten of eleven reproduce exactly. `KF-W10.md` does not**, and its write is **after** the certification's own. See **D5-3**.

**What DOES hold in the certification, re-run this seat**: `grep -c 'RECONCILE SEAT, 2026-08-28' KF-W*.md` → `W1 1 · W2 5 · W5 1 · W7 1 · W8 3 · W9 1 · W10 4`, and `1+5+1+1+3+1+4 = 16` — the §3 column, the §4 finding count and the tree agree, exactly as §3's counting-rule note claims. The R-10 finding (KF-W1's W0 stamp taken one write early) is correct and its cure is present and correct at C-13. The R-12 finding (W7's adopted alphabet byte-checked at W10) reproduces. **The instrument's method is sound; its central proof-of-last-write is not true at the bytes.**

---

## §1 · AXIS 1 — ID-KEYED CENSUS, BY RECORD (escapes measured by bytes)

### 1.1 The routing alphabet, closed four ways — every figure re-run this seat

| probe | command | result |
|---|---|---|
| corpus size | `ls kf-*.md \| wc -l` | **58** |
| `KF.W1-DEP` occurrences | `grep -o 'KF\.W1-DEP' kf-*.md \| wc -l` | **18** |
| records carrying them | `grep -c` per file | **5** — ACG **4** · CC **4** · CPW **3** · DGC **4** · KPT **3** |
| literal `KF.W1` substring | `grep -o 'KF\.W1' kf-*.md \| wc -l` | **33** |
| `KF.W10` substring | `grep -o 'KF\.W10' kf-*.md \| wc -l` | **15** |
| **bare `KF.W1` token** | `grep -oE 'KF\.W1([^0-9A-Za-z-]\|$)' kf-*.md \| wc -l` | **0** |
| terminal-disposition alphabet | `grep -ohE '→ \*\*[^*]*W1[^*]*\*\*' kf-*.md \| sort -u` | **`→ **KF.W10**` only** |

33 = 18 + 15 exactly. **The spec's alias-block census reproduces at the bytes, per-file counts included.**

### 1.2 The routed rows, id for id — every hit read and classified this seat

Six adjudicated rows carry a `KF.W1`-form target. All six are **one identity** — census **F-1**, the phantom `@mkbabb/glass-ui` dependency, collided into this namespace by `lane-frontend.md §10`'s superseded taxonomy.

| # | record : line | routing text (read) | booked as | state |
|---|---|---|---|---|
| R-1 | `kf-AnimationControlsGroup:28` | *"FOLD to census F-1 (KF.W1-DEP) at MAJOR — identity guard, not re-booked"*; rider *"`useControlsKeyboardShortcuts.ts:1` is the sole binding site of all 18 shortcuts"* — **verbatim** | C-13 + §8 row 5 | **BOOKED** |
| R-2 | `kf-AnimationControlsGroup:47` | *"L-3 / C-1 — MAJOR · FOLD → census F-1 (KF.W1-DEP)"*; three specifiers, the third *"the sole binding site of all 18 shortcuts"* — **verbatim** | C-13 + §8 row 5 | **BOOKED** |
| R-3 | `kf-ChannelControls:56` | *"FOLD → census F-1 (KF.W1-DEP). Identity guard"*; rider *"`ChannelControls.vue:219` (root-barrel `TooltipProvider, Button`) is the first import that fails"* — **verbatim** | C-13 + §8 row 5 | **BOOKED** |
| R-4 | `kf-ControlsPaneWrapper:60` | *"FOLD → census F-1 (KF.W1-DEP), MAJOR at the bank"*; rider *"`.vue:166` is the demo's SOLE `/drawer` consumer"* — **verbatim** | C-13 + §8 row 5 | **BOOKED** |
| R-5 | `kf-DemoGlobalChrome:44` | *"L-8 (F-1 exposure) — FOLD → census F-1 (KF.W1-DEP) — identity guard, not re-booked"*; the four toast classes `text-body`/`text-small`/`bg-foreground`/`text-background` **verbatim**; **`a59d3a22` dissent carried, not resolved** | C-13 + §8 row 5 | **BOOKED** |
| R-6 | `kf-KfPillTabs:46` | *"F-1 — MAJOR · FOLD → census F-1 (KF.W1-DEP)"*; rider *"one class + eight custom properties, seven glass-ui-owned"* — **verbatim** | C-13 + §8 row 5 | **BOOKED** |

**Anchor decomposition, re-derived from the 18 printed hits**: **5** taxonomy-preamble (`ACG:17` · `CC:17` · `CPW:6` · `DGC:17` · `KPT:19`) + **6** routing rows + **5** ADJUDICATED-summary (`ACG:135` · `CC:155` · `CPW:149` · `DGC:130` · `KPT:122`) + **2** riders (`CC:142` · `DGC:43`) = **18**. Closed.

**Six rows across five records — ACG carries two.** D3-5's cure at §8 row 5 and the alias block holds, and C-13's *"five"* is correctly labelled a RECORD count.

### 1.3 Escape sweep — every other channel, by bytes

- `Mail Cure` → **7 records** (`kf-CopyButton` · `kf-EasingTarget` · `kf-EasingScene` · `kf-EasingSidebar` · `kf-KeyframeCard` · `kf-KeyframesEditor` · `kf-TimingFunctionPanel`). Every one read: all are the Routing-law preamble reciting the census wave sketch (*"W0 Substrate Settle · **W1 Mail Cure** · W2 Parse Façade …"*) — a declaration of the alphabet, **not a routing**. No row in any of the seven disposes to W1.
- `O-8` → **2 records** (`kf-ChannelOptions` · `kf-LayerConfigPanel`) — all `KF-CO-8` substrings. `O-11` → **1 record** (`kf-ChannelOptions`) — all `KF-CO-11`/`KF-CO-12` substrings. ⟨**PASS-4 §1.3 stated `O-11` → 2 records; it does not reproduce — D5-9, INFO.** The census verdict is unaffected: no hit under either token is a letter citation.⟩
- **ZERO** hits corpus-wide for `X.KF.W1` · `KF-W1` · `I-26` · `INBOX` · `VALUEJS-INBOUND` · `sampleBezier` · `D-GAP-6` · `parseStylesheet` · `lerpArray`.
- **Third namespace re-verified**: keyframes' own `BUILD W1` is live at **exactly six anchors** — `kf-CopyButton:15` · `:40` · `kf-KeyframesEditor:10` (spelled **`BUILD-W1`**, hyphenated) · `:40` · `:51` · `:140`. The spec's six-anchor claim is **EXACT**.
- **The carry** (`KF-W6-CARRY.md`, 366 L / 199,055 B, mtime **10:49:45** — genuinely frozen, the one substrate in this round that did not move): bare `KF.W1` token **0** · `KF.W1-DEP` **1** (the same booked F-1 identity) · literal `KF.W1` **3** · `Mail Cure` **0** · `O-8`/`O-11` **0**. **Nothing escapes to this wave through the carry.**

### 1.4 Census tally

| quantity | value |
|---|---|
| rows routed to census-taxonomy **KF.W1 (Mail Cure)** | **0** |
| rows routed to the collided token **`KF.W1-DEP`** | **6** |
| **ROUTED (denominator)** | **6** |
| **BOOKED** (fold-identity C-13 + §8 row 5 exclusion-with-reason, all six by anchor) | **6** |
| **ESCAPED** | **0** |
| **INVENTIONS** | **0** |

**The ∅-column finding is TRUE and independently re-derived from the records. C-14's L-19 lock holds** — no gate is a script, no row or bounds item was manufactured, and the mail tooling a lesser spec would mint is excluded by name. **D4-3's booking mechanism is now sound at both ends**: the five component riders are **PRESENT at KF-W0's final bytes** (§2.1).

---

## §2 · AXIS 2 — RECEIPT REALITY AT **FINAL** SIBLING BYTES (the drift class must be dead)

### 2.1 What HOLDS — the receipts that survive the whole round

| receipt | measured this seat, at the sibling's FINAL bytes | verdict |
|---|---|---|
| **KF-W0 §Carry `C-1.F` row `F-1` — the D4-3 rider landing** | `KF-W0.md` **224,173 B / 16:58:59**: `useControlsKeyboardShortcuts.ts:1` **2** · `ChannelControls.vue:219` **2** · `ControlsPaneWrapper.vue:166` **1** · `toast utility classes` **2** · `eight-custom-property` **1**; landing row at `:226`, naming *"`KF-W1.md` §Repair Round 4, directive D4-3"* as its sending end | ✓ **FIVE OF FIVE — the round's best-executed cure** |
| **KF-W0 §Sequencing OUTBOUND row `KF.W1 · Mail Cure`** | `:643` | ✓ |
| **KF-W0 §Excluded row `KF.W1's mail re-delivery`** | `:681` — *"Depends on this wave, is not performed by it."* | ✓ |
| **KF-W0 §Sequencing packet-roster, the canonical 17** | `:651`, self-declaring *"re-cut this round from this file's stale 15"*; roster id-for-id matches KF-W1's C-14 leg (iii) and §8 | ✓ |
| **KF-W4 §Preconditions `OP-5`** | `:37` — *"**OPEN — KF.W1's.**"*, and it now names **`O-21` by id** per §END R3-11(f) D-12 with the amended-by pointer clause | ✓ |
| **KF-W4 §Sequencing row `KF.W1 · Mail Cure`** | `:263` — *"**PRECONDITION on anchor citability**"* | ✓ |
| **KF-W3 §Preconditions `OP-5`** | `:43` — *"**KF.W1 Mail Cure** … UNLANDED"* | ✓ |
| **KF-W3 `L-4`** | `:274` | ✓ |
| **KF-W3 §Cross-edges row `KF.W1 · Mail Cure (O-8/O-11) + E13`** | `:301` — *"**DEPENDS ON**"* | ✓ |
| **KF-W10 §1 `Opens after`** | `:20` — carries `X.KF.W1` | ✓ anchor (but the **quotation** fails — D5-5) |
| **KF-W10 §Preconditions `OP-3`** | `:65`, still **UNLANDED** | ✓ anchor (quotation fails — D5-5) |
| **KF-W10 §Sequencing `B. → KF.W1 (Mail Cure, SS-2)`** | `:515` | ✓ anchor (quotation fails — D5-5) |
| **KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER** (cross-edge 9's anchor-only second end) | `:543` — exists, three rows, cargo **9 + 6 + 2 = 17**, six travelling locks, minting citations by §-anchor, verb `MINTED-UNAUTHORED` | ✓ **the anchor-only forward reference resolves** |
| **KF-W2 §Excluded row `KF-CO-1 / KF-CO-8`** | `:824` | ✓ |
| **KF-W2 §Excluded sibling-packet row** (dock-menu) | `:827` — *"The cube · sequence · spring · **dock-menu** · CARD-UNIT packets — routing restated on the canonical 17-packet roster (RULINGS R-15)"* **verbatim** | ✓ |
| **KF-W7 §Excluded row `KF-CO-1/KF-CO-8`** + **N-10** | `:378` / `:127` | ✓ both |
| **KF-W9 §Carry `S-10.1`** (the declared non-edge, anchor-only) | `:251` — *"KF.W1, KF.W2, KF.W3 and KF.W8 are **not** edges"* | ✓ |
| **`INTAKE-ADJUDICATION-2026-08-03.md` §3** | `:146` heading; `:147-149` = `B10-17 · B10-18 · B10-19 · B10-20 · B10-22 · B10-23 · B10-27 · B18-19 · B21-17` — **gap-preserving; `B10-21` correctly absent** | ✓ |
| **`CARRY-CUT-LEDGER.md:186`** | CC-084 row; `grep -c 'no emergency 4.0.1 — ruled'` → **1**, at `:186` | ✓ verbatim |
| **`CARRY-CUT-LEDGER.md:255`** | the X-W9 row | ✓ |
| **`COHESION.md` §2** | `:76` — *"**I-26 mail cure (KF.W1) precedes any kf wave consuming O-8/O-11 obligations.**"* | ✓ verbatim |
| **census (c)5 / (c)6** | `:260` · `:264` — *"The mail cure precedes everything kf-side."* | ✓ |
| **`lane-docs.md §7.2`** | `:407` — *"**Amend, do not re-send.**"* | ✓ verbatim |
| **`library-band.md:205-206`** (the D4-8 cure) | `:205` ends *"…`strictTypes: 62` deletion. DECLINE — `sampleBezier`"* · `:206` opens *"(permanently, measured zero demand)"*; corroborated at `:173` | ✓ **the span cure is EXACT** |
| **`kf-LayerConfigPanel.md:12`** | *"F-1/SCH-1 (→ KF.W0 §B-12, FALSIFIED-AT-HEAD …)"* | ✓ subject present |
| **`EXECUTION-HANDOFF.md:13-18`** (the D4-7 cure) | quoted whole this seat by `sed -n '13,18p'`: the expiry clause *"This invariant survives until W2 completes."* and the `a59d3a22` / *"~254 dirty paths"* record are **both present and both now carried** | ✓ **EXACT** |

### 2.2 Value-side `INBOX.md` — UNCHANGED, every re-key HOLDS, the mint still correct

**97 L / 56,702 B**, clean. Sweep-path law at **`:15-16`** ✓ (narrowed grep → exactly **1**; broad grep → **5**: `:15 :66 :68 :72 :75`). **I-26 at `:92`**, *"ROWED 2026-08-03"* verbatim ✓. **I-10 at `:47`** ✓. **Max outbound `O-20` at `:95`** ✓ — **`O-21` is still `max+1`** and C-10's MINT LAW is satisfied at this clock, at both ends (KF-W4 `OP-5`, KF-W10 `OP-3`/`§Sequencing B.` all name it by id).

### 2.3 What FAILS — the drift class, alive

**D5-1** (KF-W7's bare token, the D4-5 claim re-falsified) · **D5-3** (the CLOSE-CERT itself) · **D5-4** (the three stale KF-W10 figures) · **D5-5** (three stage-2 quotations that are now truncations) · **D5-6** (the §13 substrate table) · **D5-8** (W10's reverse receipt into this file, 5 of 9).

---

## §3 · AXIS 3 — M-25 DEPTH + THE LAW-A / FRONTIER CENSUSES, RE-RUN

### 3.1 Every keyframes-side witness reproduces byte-exact at `origin/master 81a56990`

Re-executed this seat, read-only:

- three ABSENT packet anchors (`compile/value-ast.ts` · `compile/easing/easing-registry.ts` · `compile/emit/backward.ts`) ✓
- `resolve/browser.ts:162` = `const parsed = parseCssScalar(source);` ✓ · `compile/value/compile.ts:32` = `const parsed = parseCssValues(value);` ✓ · `easing/registry.ts:36` docstring *"Stable identities let the serializer distinguish named curves from closures."* ✓ · `easing-serialize.ts:71` = `const registryName = timingFunctionEntries.find(` ✓
- `emit/backward/` = exactly `backward.ts, color.ts, index.ts, walk.ts` ✓ · `color.ts` **385 L** ✓ · **§5a rows 6–8 EXACT**: `:171` = `const sampleRamp = (` · `:250` = the `stopCount` call · `:263` = the `1024` call ✓
- `package.json:70` value.js `"4.0.0"` ✓ · **`:77` glass-ui `"7.0.0"` — SCH-1's falsifier, F-1 FALSIFIED-AT-HEAD** ✓
- `options.ts:31` ✓ · `leaves.ts:28` ✓ · `load-engine.ts:65` ✓ · `css-text.ts:41` ✓ · `test/internal/leaves-parity.test.ts` **PRESENT** ✓
- `parseStylesheet` raw output = **nine** lines: call sites `adapter.ts:222` · `scroll/grammar.ts:109` · `validate.ts:182`; imports `:7`/`:37`/`:47`; prose `adapter.ts:202`/`validate.ts:41`/`validate.ts:130` ✓ **exactly as G-KF1-3 states**
- import census **62** = `/css` 29 · `/value` 16 · `/color` 7 · `/math` 5 · `/easing` 3 · `/transform` 2 ✓
- exec clone: coordination dir = **9 entries + `vnext/`**, no addendum/O-8/O-11 ✓; `INBOUND-LEDGER` = **9 rows** (IN-ATLAS-1..5 · IN-GLASS-1..2 · IN-VALUE-1..2), no IN-VALUE-3/4 ✓

**§5b's three-substrate receipt reproduces EXACTLY**: worktree census **61** (`/css` 29 · `/value` **15** · `/color` 7 · `/math` 5 · `/easing` 3 · `/transform` 2) · bare `8281638c` **81** over a **disjoint alphabet** (`/parsing` 24 · `/units` 26; `/css` and `/value` absent) · frontier **62**. Glass-ui triple: worktree **absent from the manifest** · `8281638c:package.json:71` = `"6.0.0"` · `origin/master:package.json:77` = `"7.0.0"`. **Sacred checkout**: `41  1` ✓ · **252** dirty ✓ · both bodies **7,064 B** (Jul 24 16:41) / **15,633 B** (Jul 27 12:27) ✓.

### 3.2 LAW A — §4c's census now REPRODUCES AND SUMS (D4-2 fully cured)

Every leg re-run this seat at the current tree bytes:

| leg | spec says | measured this seat |
|---|---|---|
| (1) `grep -rnF 'keyframes.js/docs/tranches/V/coordination' docs/ --include='*.md'` | **26 hits / 18 files** | **26 / 18** ✓ |
| (1b) `grep -rnF '../keyframes.js/docs/tranches/V/' docs/ --include='*.md'` | **15 hits / 8 files** | **15 / 8** ✓ |
| (2) the narrowed subject grep | **1**, at `INBOX.md:15` | **1**, `:15` ✓ |

**The nine-class partition is exhaustive, disjoint and sums by construction — every member verified this seat**: A `INBOX.md:15` · B `:66 :68 :72 :75` · C the two dated letters · D **seven** apotheosis files (`armA/edict-matrix-draft:140` · `armA/edict-matrix:143` · `armB/final-PA-parse:73` · `armB/final-PB-color:224` · `armB/program-PA-parse:72` · `armB/program-PB-color:151` · `probe/coordination/…handoff:456`) · E `lane-docs:290` · F `harvest/packet-seat-O11-O15-receipts:11` · G `DISPOSITIONS:51`, `W40:136`, `WL:63` · H `PASS-1/KF-W1-CHECK:125`, `PASS-4/KF-W1-CHECK:189` · I this spec at **`:74 :136 :198 :322 :337`** — **1+4+2+7+1+1+3+2+5 = 26.** Census (1b)'s sub-alphabet likewise: `5 + 4 + 2 + 4 = 15`, this spec's four at `:139 :159 :198 :337`. ✓

⟨**Self-reference disclosure, honoured**: this file enters class H at its next reading. The spec's STABLE DENOMINATOR — *"the count of sites that EXECUTE the path"* — is **TWO** for a fourth round running (`INBOX.md:15-16` in bounds; `~/.claude/…/memory/feedback-mail-inbox-law.md:16` out of bounds and routed to the OWNER, re-verified this seat). **There is no third.** This is the cleanest cure of the round: the census that could not reproduce at pass 4 now reproduces, sums, and names its own instability.⟩

**SCOPE RECEIPTS (R4-10(1)) verified BY SCOPE, not by instance**: §Bounds access column enumerated whole — **6 rows, `modify` ×2 + `create` ×4, ZERO carrying `delete`/`modify-delete`/`repoint`/`shim`/`move`** → LAW-A censuses owed **0**, present **0**, and the one census in the file is owed by a declared act. SUBJECT-IDENTITY: symbol-bearing bounds rows **0**; all eleven gate-witness symbols carried with file AND line at a named substrate; bare leaves **0**. ✓ Both receipts are true at the bytes.

### 3.3 M-25 depth

**All ten locks present and verbatim** (C-1 · C-3 · C-6's LAW-B substrate lock · C-7 · C-8 · C-9 · C-10 · C-11 · C-12 · C-14). **All five F-1 component riders verbatim at the records** (§1.2) **and now verbatim at the routing target** (§2.1). **All three dissents carried, not resolved**: the `a59d3a22` rider (routed to KF.W0's re-measurement) · the KF-W0 reverse-edge conflict (recorded for COHESION §3 and the owner) · C-4's recorded asymmetry. Ids anti-rename; `SCH-4` untouched. **Agglomeration by identity is correct — one identity, six rows, booked once.**

---

## §4 · AXIS 4 — GATES BORN-RED WITH REACHABLE GREEN · CLOSES IN-GRANT · NO SELF-VOICED CLOSURE

**Tally agrees at every altitude**: §1's header, §6, §11, §12 and §13 all read **10 born-RED · 1 DECLARED-SATISFIED · 1 stay-GREEN INVARIANT**. G-KF1-1..10 are each genuinely RED right now, each with a re-executable witness this seat watched fail (§3.1). G-KF1-11 and G-KF1-12 are correctly relabelled and correctly excluded from the count.

**G-KF1-4's reachable GREEN is RESTORED — D4-4 is cured, and cured on the right pattern.** The gate now commissions the **SENTENCE TEMPLATE** plus a four-part **SUBSTRATE-NAMING RULE** (dated worktree-state tuple, never a bare sha · the non-re-derivability statement · the frontier split beside it · the disqualified reading named as contrast), with *"every numeral in (i)–(iv) FILLED AT AUTHORING by re-running §5b's three commands."* C-6's round-3 sentence is preserved as a **dated exemplar** (E-3), and the falsifier gained the two legs that make the pattern enforceable: *fails if any numeral is carried from this spec instead of re-measured*, and *fails if the two readings are stated without their two distinct substrates named*. This is C-10's MINT LAW applied where it was owed, and it removes nothing from the cure.

**Closes in-grant.** Every gate's GREEN lands inside §4's six bounds rows. G-KF1-10's counterparty half is explicitly NOT a close condition (C-12's HARD NON-GATING lock) — the wave stays completable by construction. G-KF1-12's external authority is now quoted **with** its expiry clause and with the independence declaration that the value-side prohibition does not depend on it.

**LAW B — no self-voiced closure.** The header PROVENANCE, the alias block, §11's close stamp and the round-2/3/4 records all cite the conformance artifact **by path and date**, state what it found, **and state that it returned DEFECTIVE**. The round-2 *"NO line number anywhere"* clause remains struck with its falsification named. **The axis is discharged in FORM — but the citation is split across two passes at five live sites: D5-2.**

---

## §5 · AXIS 5 — POSTURE

| item | verdict |
|---|---|
| **W4 head honored** | ✓ No conflict. KF-W1 declares PRECEDES-on-anchor-citability; KF-W4 reciprocates at `OP-5` (`:37`) and its §Sequencing row (`:263`), and names **`O-21` by id** at both. W4's vue-tsc sequencing head is untouched: W1 opens no source and no `package.json`. |
| **W3 gated-unscheduled** | ✓ KF-W1 names it *"KF.W3 (Parser Consumption, **GATED**)"* at cross-edge 1 and schedules nothing. KF-W3 reciprocates at `OP-5` (`:43`) · `L-4` (`:274`) · §Cross-edges (`:301`). |
| **O-21 at every mint site** | ✓ **CLEAN.** All five load-bearing sites plus cross-edge 11's trailing citation commission **O-21**; `INBOX.md`'s maximum is still **O-20** at `:95`, so the literal is still `max+1`, and the MINT LAW governs over the literal at open. Surviving `O-20` tokens are all *measurements* of the ledger maximum. |
| **W11/W12/W13 disposition per RULINGS-4** | ✓ **PRESENT AND COHERENT AT BOTH ENDS.** KF-W1 cross-edge 9's round-4 addition records the flag **REGISTERED** (not merely answered), cites R4-8 arm (a), names the verb `MINTED-UNAUTHORED — AUTHORING = the SS-1/SS-2 authoring block`, and carries the second end **anchor-only** per LAW C(3). `KF-W10 §6.D` (`:543`) exists with three rows, cargo **9 + 6 + 2 = 17** matching R-15 and KF-W1 §8 id-for-id, the six travelling locks, and the two minting citations. **This wave's own posture is untouched: it homes ZERO of the seventeen, and §8 says so.** |
| **W10's greens conditioned on artifacts that EXIST** | ✓ **G-2's right-hand union is re-conditioned** to *"the union of **AUTHORED** X·KF wave bounds ∪ §6.D's cargo enumeration"* at both its altitudes (`KF-W10:240` §3.2 head · `:368` G-2's statement), citing R4-8 item 3. R-A's VERIFIED scope is re-cut to the **authored eleven** (`:45`), and §6.D's closing states *"never this close's precondition (OP-5, re-conditioned)."* **MECHANISM F is declared** (`:120`, `:566`) — *"a mint with neither an authored spec nor a register row is a hard escape on sight."* ⚠ **One residue**: OP-5's own row (`:67`) still reads only *"KF.W2..W9 bounds are FINAL"* — R4-8 item 3's *"every packet home either (i) has an authored spec, or (ii) is named in §6.D"* clause landed at G-2 and at §6.D's prose but **not in the OP-5 cell itself**. The green is nonetheless reachable through G-2, and this is KF-W10's residue, not this wave's. |
| **W10's obligations closed by carriage not omission** | ✓ (not this wave's). The carry routes **nothing** here; W1 mints no new obligation and hands W10 **the row**, not a frozen id. |

---

## §6 · DEFECTS

### D5-1 · **MAJOR** — the bare-`KF.W1` zero is false again, one sibling over: KF-W7 carries 1, and the hit is NEW this round

§1 `:60`: *"Bare-`KF.W1` token … is **0** in **FIVE** (KF-W2 · KF-W5 · KF-W6 · **KF-W7** · KF-W8)."* Cross-edge 1 (`:368`), §9 item 5 (`:415`) and §13's substrate table (`:563`, *"token 0"* against KF-W7) repeat it.

Measured this seat at KF-W7's final bytes (**210,113 B / 17:33:23**): `grep -oE 'KF\.W1([^0-9A-Za-z-]|$)' KF-W7.md | wc -l` → **1**, at **`KF-W7.md:343`**:

> *"**BACKWARD (stage-1 siblings — KF.W0 · **KF.W1** · KF.W2 · KF.W3 · KF.W4 · KF.W5 · KF.W6): quoted-by-command at their FINAL stage-1 bytes**…"*

That is W7's own **LAW C SUBSTRATE DISCLOSURE** paragraph, added at its round-4 stage-2 write (**17:17:02**) — *after* this file's 17:00:23 write. **The hit did not exist before this round**: `git show HEAD:…/KF-W7.md | grep -cE 'KF\.W1([^0-9A-Za-z-]|$)'` → **0**.

This is **D4-5 reproduced verbatim in shape**: the same sentence, the same axis (*the one that defines this wave's consumer set*), a different sibling, one round later. Round 4 corrected W9's `1` and left the universal *"0 in FIVE"* standing over a set whose fifth member acquired a hit eighteen minutes after this seat read it. **Substantively the finding is unchanged and strengthened** — W7's mention is a stage-roster listing, not an O-8/O-11 citation (`grep -c 'O-11' KF-W7.md` → **0**; both `O-8` hits are `KF-CO-8` substrings), so the load-bearing claim (*zero real O-8/O-11 letter citations across the six non-consumers*) **HOLDS**. But the stated measurement is false at four sites, and **the RECONCILE seat swept seven KF-W7 receipts and four KF-W1 receipts in the same pass and connected neither to the other.** The cure is the one W9 already got: *0 in FOUR, 1 in KF-W7 and 1 in KF-W9, both declared non-edges* — or, better, retire the per-sibling zeros entirely for the property that survives writing (`O-11` = 0; every `O-8` a substring).

### D5-2 · **MAJOR** — the freshest-artifact census-carriage citation is split PASS-4 / PASS-3 across five live sites, and one of them still calls PASS-3 "the freshest artifact"

The header's own rule (`:7`): *"When a newer pass supersedes this one, the citation is **re-pointed**, never re-asserted here."* §13 change **#12** claims it executed: *"The census-carriage citations are re-pointed PASS-3 → PASS-4 **at the header PROVENANCE and the alias block**."*

Measured this seat — sites carrying a `PASS-n/KF-W1-CHECK.md` carriage citation:

| site | cites | status |
|---|---|---|
| `:7` header PROVENANCE | **PASS-4** (+ PASS-3 preserved as dated predecessor) | ✓ re-pointed |
| `:13` alias block | **PASS-4** (+ PASS-3 preserved) | ✓ re-pointed |
| **`:186` §5 preamble** | **PASS-3** — *"its carriage is certified at `conformance/PASS-3/KF-W1-CHECK.md` §1 (2026-08-28) — 6 routed · 6 booked · 0 escaped · 0 inventions"* | ✗ **not swept** |
| **`:233` C-14** | **PASS-3** — *"`conformance/PASS-3/KF-W1-CHECK.md` §1 (2026-08-28) re-enumerated the routing alphabet … found the ∅ column TRUE"* | ✗ **not swept** |
| **`:478` §11 "Still standing"** | **PASS-3**, and calls it ***"the freshest artifact"*** | ✗ **not swept, and now false on its face** |

§12 row 6 (`:495`) enumerates the LAW-B conversion set as *"The header PROVENANCE, the alias block…, **§5's preamble**, **C-14's** …, §11's close stamp and its ***"Still standing"* paragraph**"* — **six sites**. Round 4 swept **two**. This is exactly **R4-10(1)**, the scope law the same round wrote: *"a repair that cures the named instance and not the stated scope leaves the law green over its own counterexample"* — and the file's SCOPE RECEIPTS block (`:542-545`) enumerates three classes and **not this one**, so the receipt is complete over the classes it names and silent over the class its own change #12 opened.

The result is the **D3-4 class (*one file, two verdicts*) in citation form**: one quantity (6/6/0/0), two named "freshest" artifacts, in one file. `:478` sits inside a dated round-2 record, so the file's own mechanism there is a `⟨STAMP CORRECTED at repair round 5⟩` marker — which §11 already carries twice, so the instrument exists and was not used. `:186` and `:233` are **live spec body** and take the re-point directly.

### D5-3 · **MAJOR** — `PASS-4/CLOSE-CERT.md`'s proof-of-last-write is falsified: `KF-W10.md` wrote 22 seconds AFTER the certification

LAW C(4)(i) and §END: the certification must carry *"the mtime table of all 11 specs **proving it wrote last**"*, and *"the round does not close without it."* CLOSE-CERT §1 tables `KF-W10.md` at **17:31:54 / 209,902 B** and reads: *"**Every per-wave write precedes every reconcile write** — the last per-wave write was `KF-W10.md` at **17:21:25**, and this seat's first edit was at **17:30:52**, a **nine-minute clear margin**."* §9 item 1 certifies the same.

Measured this seat: `KF-W10.md` = **17:38:21 / 209,923 B** — **6m 27s later and 21 bytes larger** than the tabled value, and **22 seconds after `CLOSE-CERT.md` itself (17:37:59)**. Ten of eleven specs reproduce byte-exact against the table (§0); W10 alone does not, and `grep -c 'RECONCILE SEAT, 2026-08-28' KF-W10.md` is still **4**, so the change is **not** a reconcile insertion.

**The consequence is exact and narrow**: the certification's method is sound and its sixteen repairs are real, but its single load-bearing structural claim — *this seat wrote last, therefore every receipt below was checked at final bytes* — **is not true at the bytes**, and the file it is untrue about is the one this wave has its **hardest downstream dependency** on. Under LAW C(4) as written, the round did not close. **The cure is one re-run**: the RECONCILE seat re-sweeps every receipt naming `KF-W10.md`, re-tables the mtimes, and re-certifies — or `CLOSE-CERT.md` gains a dated addendum recording the post-certification write and the re-verification of the receipts that depend on it. **Not this wave's to cure**; owner = the RECONCILE seat, and it is the reason **D5-4** and **D5-5** below survived the round.

### D5-4 · **MAJOR** — the three KF-W10 receipt figures are stale at W10's final bytes, at three sites, one of them carrying no substrate at all

| site | spec says | measured this seat at `KF-W10.md` 17:38:21 |
|---|---|---|
| §1 `:58` (the KF-W10 bullet) | *"Re-measured this seat: `grep -c 'O-8' KF-W10.md` → **8**, `grep -c 'O-11' KF-W10.md` → **3**"* | `O-8` → **10** · `O-11` → **5** |
| cross-edge 11 `:383` | *"Re-measured this seat: 8 × `O-8`, 3 × `O-11`, all real letter citations."* | **10** · **5** |
| §9 item 5 `:415` | *"**KF-W10 8**"* (bare-token census) and *"8 × `O-8` and 3 × `O-11`"* | token occurrences → **18** |

All three were **true at the stamped substrate** — `git show HEAD:…/KF-W10.md` gives token **8**, `O-8` **8** lines, `O-11` **3** lines, matching §13's table entry (`155,227 B / 15:51:10`) exactly. They are false at the round's end.

Two aggravations distinguish this from an honest dated reading. **(a)** §1 `:58`'s bullet carries **no substrate stamp and no command substrate** — unlike the six-non-consumer bullet at `:60`, which correctly declares *"every figure in this bullet is this seat's own command output over the sibling bytes listed in the §13 mtime table, at 2026-08-28 16:44 EDT."* The KF-W10 figures read as current. **(b)** §13's NUMERIC-ARM scope receipt (`:545`) claims *"every pasted command re-run at write time"* and enumerates eight classes; **the KF-W10 `O-8`/`O-11` pair is not among them**, so the receipt is true over what it lists and silent over what it omits — the same shape as D5-2.

**The load-bearing conclusion STRENGTHENS on re-measurement**: 10 and 5 make KF.W10 an even harder O-8/O-11 consumer than stated, so cross-edge 11's *"the hardest downstream consumer this wave has"* is more true, not less. The cure is the one D4-6 already chose for KF-AV-28 — **drop the numerals, keep the citation**, and state the property (*W10 cites both letters by id, repeatedly, at three declared anchors*) which no sibling write can falsify.

### D5-5 · **MAJOR** — three quoted-prose receipts to a STAGE-2 sibling are truncations at that sibling's final bytes, in a file that declares its stage-2 receipts carry no quoted prose

§13's posture block (`:525`) declares: *"forward references to **stage-2** siblings (KF-W7 · KF-W8 · KF-W9 · **KF-W10**) carry the **stable anchor ALONE**, per **LAW C(3)** — **no quoted prose**, no line numbers."*

§1 `:58` and cross-edge 11 (`:383`) both carry **three quoted-prose receipts to KF-W10**. Each was verbatim at W10's round-3 bytes and is a **truncation** at its final bytes:

| quoted as | KF-W10 at 17:38:21 |
|---|---|
| *"**X.KF.W1** (Mail Cure — the O-8/O-11 amendment-addendum on an exec-visible path)**,** **X.KF.W9**…"* | `:20` — the parenthesis now **continues**: *"…on an exec-visible path, **carried by KF.W1's outbound row `O-21`, named by id at repair round 4 — §END KF-W10 D-8**), **X.KF.W9/SS-13**…"*. The quoted string, with its closing paren where it sits, **does not exist**. |
| *"**KF.W1's O-8/O-11 amendment-addendum is exec-visible.** … **UNLANDED.**"* | `:65` — the bolded clause now reads *"…is exec-visible **— and the instrument that carries it is now NAMED BY ID: KF.W1's outbound row `O-21`**"*. The sentence-with-period quoted here is gone; **UNLANDED** survives. |
| *"**W10 depends.** No coordination terminalization (G-6) before the O-8/O-11 amendment-addendum lands on an exec-visible path."* | `:515` — *"W10 depends. **THE INSTRUMENT IS NAMED BY ID AT REPAIR ROUND 4 (…).** No coordination terminalization … on an exec-visible path **— and the vehicle that lands it is KF.W1's outbound row `O-21`**."* Two elisions, neither marked. |

Under **LAW D(1)** a quotation labelled verbatim is byte-diffed at write time or labelled a paraphrase with ellipsis. Under **LAW C(3)** these receipts should not have carried prose at all. **The direction, force and substance of all three edges are unchanged and every §-anchor resolves (§2.1)** — and the drift is in W10's favour: all three now name **`O-21` by id**, which is what this wave commissioned. **The cure is subtraction**: strike the three quotations, keep the three §-anchors the file already names as *"the sole anchor"*, and let the reciprocity claim rest on the anchors — which is what §13 says it already does.

### D5-6 · **MINOR** — §13's LAW-C(2) substrate table stamps PRE-ROUND-4 bytes for all ten siblings, three of which were already final when this seat wrote

The table (`:555-566`) is the file's declared substrate of record for every same-round cross-wave figure. Measured this seat, every entry except KF-W0's matches `git show HEAD:…` **byte-for-byte** — i.e. the **round-3 committed** bytes:

`KF-W2 215,194` ✓= HEAD · `KF-W3 138,765` ✓= HEAD · `KF-W4 169,260` ✓= HEAD · `KF-W5 209,901` ✓= HEAD · `KF-W6 181,977` ✓= HEAD · `KF-W7 174,104` ✓= HEAD · `KF-W8 144,190` ✓= HEAD · `KF-W9 177,670` ✓= HEAD · `KF-W10 155,227` ✓= HEAD.

Per CLOSE-CERT §1's reconstructed order this file wrote **6th, at 17:00:23**. By then **four stage-1 peers had already published round-4 bytes** — `KF-W3` 16:56:52 · `KF-W0` 16:58:59 · `KF-W6` 16:59:25 · `KF-W4` 16:59:44. Only W0 was re-read (and, per CLOSE-CERT R-10, one write early — correctly caught and correctly cured at C-13). **W3, W4 and W6 were final and available and were stamped at superseded bytes anyway.**

LAW C(1)'s *"KF-W1..KF-W6 in any order"* is the loophole CLOSE-CERT §8 itself names as where the stale stamp survives; this is that finding, read from the KF-W1 end. **No figure in the table is load-bearing for a gate, a row or a disposition, and the two figures that matter (KF-W4 token 5, KF-W6 token 0 / `O-8` 4/2 / `O-11` 0) re-measure IDENTICAL at final bytes** — so nothing is wrong except the stamps. The cure is one sweep: re-stamp W3/W4/W6 at their round-4 mtimes and re-run their three figures, or mark the table *"round-3 bytes, superseded — see the RECONCILE certification."*

### D5-7 · **MINOR** — §13's dated KF-AV-28 reading is stale on seven of ten at the final bytes

`:568` records, deliberately as a dated reading of named bytes: *"W0 6/3 · W2 10/7 · W3 5/5 · W4 6/5 · **W5 0/0** · W6 13/12 · W7 13/12 · W8 4/2 · W9 15/12 · W10 6/5. **Live in nine of ten.**"*

Measured this seat, occurrences / lines: **W0 8/4 · W2 15/12 · W3 7/7 · W4 8/5 · W5 0/0 · W6 13/12 · W7 16/14 · W8 5/3 · W9 15/12 · W10 12/11.** Only **W5, W6 and W9** reproduce; **seven of ten do not.**

**This is the least serious finding in the file and is close to lawful**: the cell explicitly declares *"a reading of named, dated, mid-round bytes … not a claim about the round's final state"*, states that four of the ten write later, and **no gate, lock or cross-edge depends on it**. The **load-bearing claim is TRUE at the final bytes**: KF-AV-28 is live in **nine of ten**, absent only from KF-W5 — exactly as stated, and D4-6's chosen arm (drop the numerals from the operative sentence, keep the citation) is correctly applied at cross-edge 9. It is recorded here only because the same table's stamps are what D5-6 convicts, and because a dated reading whose substrate table is itself stale (D5-6) is dated against a clock that never existed. The cure is deletion of the numerals, not re-measurement.

### D5-8 · **MINOR** — KF-W10's reverse receipt into this file prints 5 of 9 hits: the CLOSE-CERT's own "short transcript" class, uncaught

`KF-W10.md:515` pastes: *"Quoted by command at KF-W1's **post-round-4 stage-1 bytes** ⟨`stat` → mtime **2026-08-28 17:00:23**; `grep -n 'O-21' KF-W1.md` → **`:88` `:199` `:331` `:383` `:455`**⟩."*

Measured this seat at KF-W1's final bytes: `grep -n 'O-21' KF-W1.md` → **NINE lines — `:37 :88 :102 :199 :331 :334 :383 :424 :455`.** The four dropped are `:37` (§1's hard-gate condition 7), `:102` (§4 Bounds' three-edit grant), `:334` (G-KF1-7's GREEN) and `:424` (§9 item 6(d)'s mint record) — **four of the five load-bearing mint sites C-10 governs**, including the Bounds grant and the gate GREEN. The count is unchanged at KF-W1's 17:00:23 bytes (this file's only later write is the single reconcile insertion at C-13, which contains no `O-21`), so the transcript was short **when written**.

This is CLOSE-CERT §8's own named residual class 2 — *"a figure or coordinate list printed beside a pasted command that is not that command's output"* — firing a **fourth** time (after `TEN S-9` 2-of-3, `KF-APP-41` 3-of-10, `66-75` two-of-six), in the direction of the file this seat audits, **and it is not among the sixteen repairs.** Nothing is at risk: all five printed coordinates resolve, the quoted `:88` text is byte-exact, and the four dropped hits **corroborate** the receipt. Owner = **KF-W10**; the cure is to re-run the grep or to drop the coordinates and keep the row-id anchor, which the file's own idiom prefers.

### D5-9 · **INFO** — the PASS-4 register's own escape-sweep figure does not reproduce

`PASS-4/KF-W1-CHECK.md` §1.3: *"`O-8` → **2 records** … `O-11` → **2 records**; all `KF-CO-11`/`KF-CO-12` substrings."* Measured this seat: `grep -l 'O-11' kf-*.md` → **1 record** (`kf-ChannelOptions.md` alone; `kf-LayerConfigPanel.md` carries `O-8`-form substrings only).

The registry is READ-ONLY and unchanged, so this is a mis-transcription at the pass-4 seat, not drift. **Nothing follows for the census** — every hit under both tokens is a `KF-CO-*` substring and none is a letter citation, so the escape sweep's verdict (0 escaped) is unaffected. It is recorded because the header PROVENANCE and the alias block now cite that artifact as the freshest carriage authority, and PASS-n checks are never edited: the correction belongs in this register, which is where it is.

### D5-10 · **INFO** — the filename-reconciliation block carries a round-2 byte figure that is now off by 3.1×

`:9`: *"this spec's home is **`KF-W1.md`** (PRESENT, **65,138 B** at this repair's open)."* Measured: **200,681 B**. The clause is scoped *"Re-measured 2026-08-28, **repair round 2**, this seat"* and *"at this repair's open"*, so it is a dated record and lawful in form — and the load-bearing halves (`KF-W1.md` PRESENT, `W1.md` ABSENT, both re-verified this seat) are unchanged.

It is noted only because this file's own C-1 ANTI-STALENESS lock says *"no measurement is inherited"* and because the same figure appears at `KF-W10.md:67`'s OP-5 cell in the same round-2 spelling — two files, one inherited byte count, three rounds after the round that measured it. A `⟨round-2 figure; the file is 200,681 B at repair round 5⟩` marker costs one clause and retires the class.

---

## §7 · WHAT STANDS

- **The census is CLEAN and re-derived BY RECORD from the 58 files' bytes**: **6 routed / 6 booked / 0 escaped / 0 inventions**, closed four ways (bare token · substring decomposition 33 = 18 + 15 · terminal-disposition alphabet · carry sweep), all six routing rows read and classified individually, all five component riders verbatim at the records. **Zero rows, gates or bounds items were manufactured to fill the ∅ column.**
- **All ten PASS-4 local defects are CURED at the bytes**, and three of them are cured well beyond the letter of the ruling:
  - **D4-2** — §4c's LAW-A census now **reproduces (26/18 · 15/8 · 1)**, **sums by construction** through an exhaustive nine-class partition this seat verified member by member, and **names its own instability** through the STABLE-DENOMINATOR rule. The census that could not survive its own round now survives it.
  - **D4-3** — the five component riders are **PRESENT at KF-W0's final bytes (5 of 5)**, at `C-1.F` row `F-1`, whose text names this file's D4-3 directive as its sending end. **Both dated readings are preserved** (the pre-landing zeros as the record of the defect, the post-landing verification beside it), and the RECONCILE seat's correction of the stamp is itself carried at C-13. The six-row booking is no longer a routing into a void.
  - **D4-4** — G-KF1-4 has a **reachable GREEN** again, on the C-10 MINT-LAW pattern, with the exemplar preserved and the falsifier widened by two legs.
- **Every keyframes-side witness reproduces byte-exact at `origin/master 81a56990`** — §5a row for row, §5b's three censuses (61 / 81 / 62) and the glass-ui triple (absent / `6.0.0`@`:71` / `7.0.0`@`:77`), the nine-line `parseStylesheet` output, the 9-row `INBOUND-LEDGER`, the 9-entry coordination listing, the sacred tuple (`8281638c` · `41 1` · **252** · 7,064 B / 15,633 B).
- **Every value-side `INBOX.md` anchor HOLDS unchanged** (97 L / 56,702 B, `:15-16`, `:47`, `:92`, max `O-20` at `:95`) — **`O-21` is still `max+1`**, and the posture is clean at all three ends (this file, KF-W4 `OP-5`, KF-W10 `OP-3`/`§Sequencing B.`).
- **Every external quotation now carries its qualifier**: `EXECUTION-HANDOFF.md:13-18` quoted whole with *"This invariant survives until W2 completes"* and the `a59d3a22` / ~254 record (D4-7 EXACT); `library-band.md:205-206` as the span, corroborated at `:173` (D4-8 EXACT); `lane-docs §7.2`, `COHESION §2`, census (c)5/(c)6, `CARRY-CUT-LEDGER:186`/`:255` and `INTAKE §3`'s gap-preserving enumeration all verbatim at their sources.
- **The W11/W12/W13 disposition is coherent at both ends** — R4-8 arm (a) recorded here as REGISTERED with the second end anchor-only, `KF-W10 §6.D` present with the 9+6+2 = 17 partition, the six travelling locks, the minting citations and the `MINTED-UNAUTHORED` verb; G-2's union and R-A's scope re-conditioned on the authored eleven; MECHANISM F declared.
- **The scope receipts are true**: access column 6 rows, 0 owed / 0 missing; symbol-bearing bounds rows 0; eleven gate-witness symbols each with file AND line at a named substrate; bare leaves 0.

**Local verdict: DEFECTIVE — 0 BLOCKER · 5 MAJOR · 3 MINOR · 2 INFO. Census CLEAN (6 / 6 / 0). Zero inventions.**

**The head is flat, not falling, and the reason is a single class.** Nine of the ten defects above are one shape: **a figure or quotation that was true when written and false when the round ended.** Round 4 wrote two laws against exactly that (LAW C, LAW D) and commissioned an instrument to enforce them (the RECONCILE seat), and the class still fired — at KF-W7 on the very sentence D4-5 cured (**D5-1**), at KF-W10 on three figures and three quotations (**D5-4**, **D5-5**), at three stage-1 peers on their substrate stamps (**D5-6**), and at the certification's own proof-of-last-write (**D5-3**). **D5-2 is the exception and is this file's alone**: two of five carriage citations were re-pointed and the scope receipt did not cover the class, which is R4-10(1) failing on the round that wrote it.

**Nothing here touches a row, a gate, a count or a disposition.** Every cure is editorial and eight of ten land inside this file; **D5-3** and **D5-8** land at the RECONCILE seat and KF-W10. The census, the carry-row set (C-1..C-14, net delta 0), the gate tally (10 · 1 · 1), the ∅-column finding and every lock and dissent are unchanged and re-verified.

---

*Pass-5 conformance seat, KF-W1. Sole write = this file. Nothing here stamps a verb, authorizes execution, or opens product source. Every keyframes-side figure was re-derived read-only at `origin/master 81a56990` in `/Users/mkbabb/Programming/keyframes.js` and `/Users/mkbabb/Programming/keyframes-v-exec` before it was written; the sacred checkout was read (`git rev-parse`, `git rev-list`, `git status`, `git grep`, `grep`, `sed`, `ls`) and never written, and no npm or mutating git ran there. `8281638c` was opened only as declared historical context, per R3-2. This file enters §4c's census class H at its next reading, per that census's own self-reference disclosure.*
