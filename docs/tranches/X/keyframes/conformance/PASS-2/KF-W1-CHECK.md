# KF-W1 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 2)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W1.md` (65,138 B, 290 L, repaired 2026-08-28 12:41)
**Corpus authority**: the **58** `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → **58**)
**Sole in-tree carry**: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (199,055 B) — W6's, per RULINGS R-12
**Seat**: FRESH adversarial checker, `claude-opus-5[1m]`. **Nothing is inherited** — not from the spec, not from `PASS-1/KF-W1-CHECK.md`, not from `PASS-1/RULINGS.md`. Every receipt below was re-executed this session against the bytes on disk NOW.
**Method**: the X·P terminal method — ID-KEYED CENSUS by exhaustive routing-target extraction, then per-witness re-execution.

**VERDICT: DEFECTIVE** — the census is **CLEAN** and independently re-derived (0 escapes, 0 inventions, the ∅-column finding TRUE), and pass-1's eight defects are cured faithfully. But the repair round **did not re-measure the value.js side**: one **BLOCKER** (the wave commissions an outbound ledger id that was spent nine minutes before the repair write), **four MAJOR** (three dead `INBOX.md` gate anchors · a phantom "SS-2 CARRY" provenance · a dead sibling-anchor set · an unrun E13 sweep that would have handed C-9 its own precedent), **three MINOR**, **one INFO**.

---

## §0 Headline

The empirical core holds and is re-derived from scratch here. **Zero adjudicated registry rows route to census-taxonomy `KF.W1` (Mail Cure)** — four independent extractions agree. All **six** rows carrying the collided token `KF.W1-DEP` are booked as fold-identity C-13 + §8 exclusion-with-reason. **Zero escapes. Zero inventions.** Every witness on the *keyframes* side (`keyframes-v-exec` `81a56990`, sacred `keyframes.js` `8281638c`) reproduces **byte-exact**, and the §5a drift table reproduces row for row.

What fails is the *value.js* side. `INBOX.md` was rewritten twice on 2026-08-28 — `48003630` at **12:32:16** (O-20 dispatched to glass BK) and `7a7dc6ef` at **12:33:59** (I-28/I-29 rowed; BI→BK sweep-path cure) — and the spec was repaired at **12:41**, seven to nine minutes later, carrying every pre-`48003630` measurement forward under the stamp *"re-measured 2026-08-28 by this fold seat."* The consequence is not cosmetic: the wave now commissions the mint of **O-20**, an id already spent on a different, dispatched letter.

The irony is exact and worth stating once. This is the wave whose entire thesis is I-26's sentence — *"a letter that lands untracked in a frozen checkout is NOT delivered — the path, not the content, was the defect"* — and whose C-1 lock reads *"no measurement is inherited into the addendum."* The spec reproduces that defect class inside itself, against its own ledger.

---

## §1 The routing-target vocabulary — exhaustive extraction (the census's ground)

An ID-keyed census over ~2,000 adjudicated rows is sound only if the target alphabet is closed first. Four independent extractions, all run over all 58 records this session.

**(a) Every wave-token in the corpus.** `grep -hoE 'KF\.W[0-9]+[A-Za-z-]*' kf-*.md | sort | uniq -c | sort -rn`

```
424 KF.W6   262 KF.W9   252 KF.W0   188 KF.W7   153 KF.W4    62 KF.W5    48 KF.W8
 48 KF.W2-TABS   30 KF.W4-PROSE   23 KF.W2   18 KF.W1-DEP   15 KF.W10   13 KF.W3
 12 KF.W3-SHIM    8 KF.W6-TIMELINE   7 KF.W7-TOKENS   3 KF.W5-PARTIALS
  2 KF.W6-adjacent  1 KF.W7-may-supersede  1 KF.W6-reshell-may-absorb
  1 KF.W3-gated     1 KF.W0-class
```

**22 members. Bare `KF.W1` is not one of them.** `grep -oE 'KF\.W1([^0-9A-Za-z-]|$)' kf-*.md | wc -l` → **0**. Literal substring `grep -o 'KF\.W1' kf-*.md | wc -l` → **33** = 18 `KF.W1-DEP` + 15 `KF.W10`.

**(b) Terminal-disposition arrow alphabet.** `grep -ohE '→ \*\*[^*]+\*\*' kf-*.md | sort | uniq -c | sort -rn` → `NO-WAVE-OWNER` dominant (corpus-wide `grep -o 'NO-WAVE-OWNER' | wc -l` → **1216**, matching R-15's 1,216-occurrence denominator), then `KFED-UNIT`, `KF.W6`, `EDITOR-UNIT`, `KF.W9`, `CARD-UNIT`, `KF.W4`, `KF.W8`, `KF.W5`, `glass-ui BH relay`, `KF.W0 §B-12`, `KF.W7`, `KF.W0`, `OPTIONS-UNIT`, `GLASS-OWNED`. **`KF.W1` absent.**

**(c) Bare-`W1` word-boundary sweep.** `grep -nE '(^|[^0-9A-Za-z.-])W1([^0-9A-Za-z-]|$)' kf-*.md` → **12 lines**, all accounted for:
- **7** = the routing-law preamble reciting the census wave sketch (*"W0 Substrate Settle · **W1 Mail Cure** · W2 Parse Façade…"*) — a declaration of the taxonomy, not a row routing: `kf-CopyButton:36` · `kf-EasingScene:33` · `kf-EasingSidebar:32` · `kf-EasingTarget:33` · `kf-KeyframeCard:36` · `kf-KeyframesEditor:36` · `kf-TimingFunctionPanel:34`.
- **5** = keyframes' own `DISPOSITIONS.md` **BUILD W1**. Independent census: `grep -noE 'BUILD[ -]W1' kf-*.md` → **6 anchors** — `kf-CopyButton:15` · `:40` · `kf-KeyframesEditor:10` (spelled `BUILD-W1`, which the word-boundary regex excludes) · `:40` · `:51` · `:140`.

**(d) Subject-matter sweep** — in case a row routes by mechanism rather than by number. Run across all 58 for `I-26` · `sampleBezier` · `D-GAP-6` · `lerpArray` · `parseStylesheet` · `mail cure` · `VALUEJS-INBOUND` · `parser-totality` · `library-band-r1` · `INBOX.md` · `O-8` · `O-11` · `addendum`:
- **`I-26` · `sampleBezier` · `D-GAP-6` · `lerpArray` · `parseStylesheet` · `VALUEJS-INBOUND` · `parser-totality` · `library-band-r1` · `INBOX.md` → 0 hits corpus-wide.** The addendum's payload items (b) and (d) have **no registry footprint at all**; they are census/lane-docs objects, exactly as the spec states.
- **`O-8` → 2 records** (kf-ChannelOptions, kf-LayerConfigPanel); **`O-11` → 1 record** (kf-ChannelOptions). Every hit is the substring `KF-CO-8` / `KF-CO-11` — the OPTIONS-UNIT switch/clobber rows. **Zero references to the letters.**
- `Mail Cure` → the 7 preamble records of (c). `addendum` → 15 records, none of them this letter (record-internal addenda).

**Alphabet closed. `KF.W1` ∉ the corpus's terminal-disposition vocabulary.**

---

## §2 ID-KEYED CENSUS — id for id

### 2.1 Records carrying a `KF.W1`-form token (5 of 58)

`grep -c 'KF\.W1-DEP' kf-*.md | grep -v ':0'`

| record | `KF.W1-DEP` | bare `KF.W1` | line anchors (all re-read this seat) |
|---|--:|--:|---|
| `kf-AnimationControlsGroup.md` | **4** | 0 | `:17` `:28` `:47` `:135` |
| `kf-ChannelControls.md` | **4** | 0 | `:17` `:56` `:142` `:155` |
| `kf-ControlsPaneWrapper.md` | **3** | 0 | `:6` `:60` `:149` |
| `kf-DemoGlobalChrome.md` | **4** | 0 | `:17` `:43` `:44` `:130` |
| `kf-KfPillTabs.md` | **3** | 0 | `:19` `:46` `:122` |
| **the other 53 records** | **0** | **0** | — |
| **TOTAL** | **18** | **0** | |

Anchor decomposition, measured: **5** taxonomy-preamble lines (`kf-ACG:17` · `kf-CC:17` · `kf-CPW:6` · `kf-DGC:17` · `kf-KPT:19`) + **6** routing rows (§2.2) + **5** ADJUDICATED-summary lines + **2** riders = 18. The five summary lines each name `KF.W1-DEP` as an owning fold — verified verbatim: `kf-ACG:135` *"KF.W1-DEP/W2-TABS/W3-SHIM/W7-TOKENS own their folds"* · `kf-CC:155` *"KF.W1-DEP/W2-TABS/W3-SHIM/W4-PROSE own their folds"* · `kf-CPW:149` *"KF.W1-DEP/W2-TABS/W7-TOKENS and the banked KF-APP-4 gates lane own their folds"* · `kf-DGC:130` *"KF.W1-DEP and KF.W7-TOKENS own their folds"* · `kf-KPT:122` *"…KF.W1-DEP; routings are M-25 agglomeration input"*. **The spec's repaired 18-anchor census (D-6 cure) is EXACT.**

### 2.2 The routed rows, id for id (the complete set)

Six adjudicated rows carry a `KF.W1`-form target in their terminal disposition. Every one is the same identity — **census F-1**, the phantom `@mkbabb/glass-ui` dependency.

| # | record | row id (corpus spelling) | anchor | terminal disposition (verbatim fragment) | spec treatment | state |
|---|---|---|---|---|---|---|
| R-1 | kf-AnimationControlsGroup | `F-1 severity at this component` | `:28` | *"**FOLD to census F-1 (KF.W1-DEP) at MAJOR — identity guard, not re-booked**"* | C-13 fold-identity + §8 exclusion row 5 | **BOOKED (exclusion-with-reason)** |
| R-2 | kf-AnimationControlsGroup | `L-3 / C-1` | `:47` | *"MAJOR · **FOLD → census F-1 (KF.W1-DEP)**"*; riders `.vue:124`, `.vue:126`, `useControlsKeyboardShortcuts.ts:1` (sole binding site of all 18 shortcuts) | C-13 — rider named verbatim in the spec | **BOOKED** |
| R-3 | kf-ChannelControls | `F-1 / L-20 / D-0` | `:56` | *"MAJOR · **FOLD → census F-1 (KF.W1-DEP). Identity guard — booked once at the census, never per component.**"*; rider `ChannelControls.vue:219` first failing import on clean `npm ci` | C-13 — rider verbatim | **BOOKED** |
| R-4 | kf-ControlsPaneWrapper | `B-1 / C-1` | `:60` | *"**FOLD → census F-1 (KF.W1-DEP), MAJOR at the bank.**"*; rider `.vue:166` sole `/drawer` consumer | C-13 — rider verbatim | **BOOKED** |
| R-5 | kf-DemoGlobalChrome | `L-8` (F-1 exposure) | `:44` | *"**FOLD → census F-1 (KF.W1-DEP) — identity guard, not re-booked.**"*; riders = four toast utility classes; **dissent rider `a59d3a22`** | C-13 — rider AND the `a59d3a22` dissent carried, routed to KF.W0's re-measurement | **BOOKED** |
| R-6 | kf-KfPillTabs | `F-1` | `:46` | *"MAJOR · **FOLD → census F-1 (KF.W1-DEP)**, banked with component riders"*; rider = one class + eight custom properties | C-13 — rider verbatim | **BOOKED** |

**Riders (not rows, carried anyway)**: `kf-ChannelControls:142` (residue item 11 — the F-1 reproducibility precondition) and `kf-DemoGlobalChrome:43` (rider (i), sequencing on census F-1/KF.W1-DEP, attached to the **S-9** toast-swap row whose disposition is census-S-9-owned, not KF.W1). Both ride C-13's fold; neither is a routing.

**Falsifier re-executed.** The spec's SCH-1 claim that F-1 is falsified at HEAD: `git grep -n '"@mkbabb/glass-ui"' HEAD -- package.json` in `keyframes-v-exec` → **`package.json:77: "@mkbabb/glass-ui": "7.0.0",`** — an exact devDep, present. **TRUE.**

### 2.3 Rows routed to KF-W1 **proper** (census-taxonomy Mail Cure)

**∅ — the empty set.** Confirmed four ways (§1 a–d), re-derived independently of the spec. The spec's C-14 three legs, re-verified:

- **(i)** *no `kf-*.md` routes a row to census-taxonomy KF.W1* — **TRUE**; bare-token count **0** across all 58. The repaired phrasing (33 literal = 18 + 15, token = 0) is **exact at the bytes** and survives the grep it invites. **D-7 cured.**
- **(ii)** *the intake CARRY table's kf targets — none targets KF.W1* — **TRUE.** `grep -oE 'KF\.W[0-9]+' INTAKE-ADJUDICATION-2026-08-03.md | sort | uniq -c` → `KF.W0 ×1 · KF.W4 ×3 · KF.W5 ×2 · KF.W9 ×2 · KF.W10 ×4`. **Zero `KF.W1`.** The enumeration-with-gaps the spec now carries (`B10-17 · B10-18 · B10-19 · B10-20 · B10-22 · B10-23 · B10-27 · B18-19("derivation helpers" half) · B21-17(secondary)`) matches the intake **verbatim** — `B10-21` is absent, so it no longer routes to two waves in one sentence. **D-4 cured in substance** (its anchor is not — defect D2-6).
- **(iii)** *none of the **17** NO-WAVE-OWNER packets proposes KF.W1 as a home* — **TRUE, and now RECEIPTED.** The roster the spec carries is **identical, id for id**, to R-15's canonical roster: cube · sequence · spring · spring-plot · spring-physics-facet · spring-artifact-truth · square · amiga · drag-seam · CARD-UNIT · OPTIONS-UNIT · KFED-UNIT · EDITOR-UNIT · APPLY-UNIT · AXISLINE-UNIT · dock-menu · transport/ribbon. Partition matches R-15 and the homing authority's own lists at `KF-W4.md:233-235`: **KF.W11 ×9 · KF.W12 ×6 · KF.W13 ×2 (minted)**, `dock-menu` at KF.W13. **D-3 cured.**

### 2.4 Census tally

| quantity | value |
|---|--:|
| adjudicated records swept | **58 / 58** |
| records carrying a `KF.W1`-form token | **5** |
| records with zero `KF.W1`-form tokens | **53** |
| rows routed to census-taxonomy **KF.W1 (Mail Cure)** | **0** |
| rows routed to the collided token **`KF.W1-DEP`** | **6** |
| of those, **BOOKED** (fold-identity C-13 + §8 exclusion-with-reason) | **6** |
| **ESCAPED** (routed but not carried as row / fold-identity / exclusion) | **0** |
| riders carried without being rows | 2 |

**No escape by bytes. The census is CLEAN.**

---

## §3 NO INVENTION — provenance trace, M-25 depth

Fourteen carry rows, C-1..C-14, ids untouched from pass 1 (anti-rename honoured; net row delta 0). Each re-traced to bytes this seat opened:

| row | claimed source | this seat's re-verification | verdict |
|---|---|---|---|
| **C-1** I-26 | `INBOX.md:90` | text found **verbatim** — *"**ROWED 2026-08-03**: a letter that lands untracked in a frozen checkout is NOT delivered — the path, not the content, was the defect…"* — but at **`:92`**, not `:90` (defect D2-2) | content EXACT · anchor DEAD |
| **C-2** DOCS §6 row 17 | `lane-docs.md:381` | `:381` = *"**O-11 §A2 undercount** … §A3 enumerated only 3 reachable sites and did not name keyframes' `parseStylesheet` call sites"* | **EXACT** |
| **C-3** DOCS §6 row 1 | `lane-docs.md:365` | `:365` = *"**Delivery-vehicle decision**…"* — the quoted lock verbatim | **EXACT** |
| **C-4** DOCS §6 row 11 | `lane-docs.md:375` + `INBOX.md:45` | `:375` = *"keyframes ACCEPTED the `sampleBezier` DECLINE **"only if a future 4.1 ships it"**"* ✓. `INBOX.md:45` = **I-7**, not I-10; I-10 is at **`:47`** (defect D2-2) | lane-docs EXACT · INBOX anchor DEAD |
| **C-5** SCH-5 | `CENSUS §0` / `lane-docs §0/§6` | drift class confirmed at bytes (§5 below); all four W5 carve shas resolve in `keyframes-v-exec` (`eb4379ca` · `6f6adfaa` · `94f2c3c9` · `b3b362d9`) | **EXACT** |
| **C-6** SCH-4 | O-11 `:52`, `:82` | `:52` = *"(61 import statements total"* ✓ · `:82` = *"across 61 of your sites"* ✓ | **EXACT** |
| **C-7** DOCS §6 rows 2–10 + 14 | `lane-docs §6` | `:366` row 2 (`lerpArray` ask) ✓ · `:378` row 14 (IN-ATLAS-3 `TimingFunction` fence) ✓ | **EXACT** |
| **C-8** DOCS §6 row 16 | `lane-docs.md:380` | `:380` = the §B-12 owner-checkout row, *"one act, `git fetch && git reset --hard origin/master`, untracked V docs…"* | **EXACT** |
| **C-9** `KF-MAIL-PATH` | minted | ground = the keyframes sweep line, found **verbatim** at **`:15-16`**, not `:13-14` (defect D2-2); the law is **unrepaired** — it still names `../keyframes.js/...` | minted, grounded · anchor DEAD |
| **C-10** `KF-MAIL-LEDGER` | minted | ground = the I-26 ROWED row ✓ (at `:92`). **Max outbound row = `O-20`, not `O-19`** — the commissioned mint COLLIDES (defect D2-1) | minted · **id spent** |
| **C-11** `KF-MAIL-COPY` | minted | `find /Users/mkbabb/Programming/value.js -name '*parser-totality-exposure*' -o -name '*library-band-r1-widened*'` → **0 hits** ✓; sole copies untracked in the sacred checkout, **7,064 B** / **15,633 B**, mtimes **Jul 24 16:41** / **Jul 27 12:27** ✓ | **minted, grounded** |
| **C-12** `KF-MAIL-MARK` | minted | `INBOUND-LEDGER.md` at `81a56990` → **9 rows** (IN-ATLAS-1..5, IN-GLASS-1..2, IN-VALUE-1..2); **no IN-VALUE-3/4** ✓ | **minted, grounded** |
| **C-13** `KF-MAIL-NS` | minted | ground = the 18 `KF.W1-DEP` anchors (§2.1) ✓, now complete; the third namespace (`BUILD W1`, 6 anchors) declared and each of its three identities verified routing to KF.W0 — `FOLD to EE-01 + KF.W0` (`kf-CopyButton:40`), `FOLD to FE-3 + KF.W0` (`kf-KeyframesEditor:40`), `FOLD to EE-03 + KF.W0` (`kf-KeyframesEditor:51`), and `DISPOSITIONS.md:69` cited exactly. **D-5 and D-6 cured** | **minted, grounded, complete** |
| **C-14** `KF-MAIL-∅` | minted | ground = §2.3 (i)(ii)(iii) all TRUE, leg (iii) now receipted against R-15's roster | **minted, grounded** |

**Invention count: 0.** Eight rows trace to banked ids (`I-26`, `SCH-4`, `SCH-5`, `DOCS §6` rows 1/2–10/11/14/16/17); six are declared minted and each names a ground re-opened at the bytes. **No row appears from nowhere, and no row was manufactured to fill the ∅ column.**

**M-25 transcription depth — PASSES.** Cure-shape locks are **carried, not cited**: C-1's *"Amend, do not re-send"* + ANTI-STALENESS · C-2's *"only the three missed sites — LIB §4.1's 13-site inventory is KF.W2's object"* · C-3's HARD NEGATIVE (never re-asked, no cut date) · C-7's *"no re-ask, no re-scope, no severity change, no new obligation"* + anti-rename on `K1–K4`/`G-L7a–d` · C-8's HARD NEGATIVE + DESIGN LOCK · C-9's SIZING LOCK (*"two lines plus one sentence — not a routing subsystem, not a script, not a linter"*) · C-10's ORDERING lock (void ahead of G-KF1-1) · C-11's SEQ-LOCK + verbatim-retention lock · C-12's HARD NON-GATING lock · C-14's L-19 lock.

**Riders carried**: all five F-1 component riders named verbatim (`useControlsKeyboardShortcuts.ts:1` · `ChannelControls.vue:219` · `ControlsPaneWrapper.vue:166` · the four toast utility classes · one class / eight custom properties). **Dissents carried, not resolved**: the `a59d3a22` rider (routed to KF.W0's re-measurement) · the KF-W0 reverse-edge **conflict** (recorded for the COHESION §3 check, neither spec rewriting the other) · C-4's *"Recorded asymmetry (not a dissent)"*. **In-transit locks restated** at cross-edge 9: comment-stated invariants are test obligations (kf-SquareScene) · LP-1 sequencing · MbabbMenu MUST-CARRY at KF.W13 · TD-1/TD-2 bundle unsplit · glass-producer rows to SS-6, never demo-side hacks.

---

## §4 GATES — born-RED audit + L-19

Twelve gates. §1's repaired tally: **10 born-RED · 1 DECLARED-SATISFIED (G-KF1-11) · 1 stay-GREEN INVARIANT (G-KF1-12)**. §1's twelve hard-gate conditions map **one-to-one, in order**, onto §6's twelve gates — re-checked item by item.

| gate | witness re-executed by this seat | result |
|---|---|---|
| **G-KF1-1** | `ls keyframes-v-exec/docs/tranches/V/coordination/` | **9 files + `vnext/`** — ATLAS ×2, GLASS ×2, `INBOUND-LEDGER.md`, SPEEDTEST ×1, VALUEJS-2026-07-17 ×3. **No addendum, no O-8, no O-11.** HEAD `81a56990`. **RED ✓ EXACT** |
| **G-KF1-2** | `git cat-file -e HEAD:src/animation/compile/value-ast.ts` · `…/easing/easing-registry.ts` · `…/emit/backward.ts` | all three **ABSENT** ✓. `git grep -n parseCssScalar HEAD -- src/animation/resolve/browser.ts` → **`:162`** (packet says `:165`) ✓. `git grep -n '"@mkbabb/value.js"' HEAD -- package.json` → **`:70`** (packet says `:69`) ✓ | **RED ✓ EXACT** |
| **G-KF1-3** | `git grep -n 'parseStylesheet' HEAD -- src` | call sites **`compile/adapter.ts:222`** · **`scroll/grammar.ts:109`** · **`validate.ts:182`**; imports **`:7`** / **`:37`** / **`:47`** — all six ✓. O-11 `:34` NEW CLASS ✓, `:40` THROW ✓, `:52-63` names 0 of 3 ✓ | **RED ✓ EXACT** |
| **G-KF1-4** | `git grep -h -o -E 'from "@mkbabb/value\.js[^"]*"' HEAD -- src \| sort \| uniq -c` | `/css` **29** · `/value` **16** · `/color` **7** · `/math` **5** · `/easing` **3** · `/transform` **2** = **62** — digit for digit ✓ | **RED ✓ EXACT** |
| **G-KF1-5** | O-8 body + `CARRY-CUT-LEDGER.md:186` | O-8 `:101-103` = *"**Decision we need from you:** … We will not cut a version into your dependency graph without your answer."* ✓ (the spec's `:100-102` is off by one line — `:100` is blank; INFO-grade). `:186` = CC-084 *"no emergency 4.0.1 — ruled"* ✓; X-W9 at `:255` ✓ | **RED ✓** (near-exact) |
| **G-KF1-6** | `INBOX.md:45` + `library-band.md:205` | `library-band.md:205` = *"DECLINE — `sampleBezier`"* ✓. **`INBOX.md:45` = row I-7, NOT I-10.** I-10 is at **`:47`** | **RED in substance · ANCHOR DEAD (D2-2)** |
| **G-KF1-7** | `INBOX.md:90` + max-O grep | **`:90` = row I-21a, NOT I-26.** I-26 is at **`:92`** (text verbatim). `grep -oE '^\| O-[0-9]+' INBOX.md \| sort -t- -k2 -n \| tail -1` → **`O-20`**, not `O-19` | **RED in substance · ANCHOR DEAD · ID COLLIDES (D2-1, D2-2)** |
| **G-KF1-8** | `grep -n 'keyframes.js/docs/tranches' INBOX.md` | returns **4 lines** — `:15` (the sweep-path law, text verbatim) `:66` `:72` `:75` (O-2/O-8/O-11 path cells). **`:13-14` is now the glass BI→BJ→BK note.** Sacred checkout: `8281638c` ✓, `41 1` ✓, **252** dirty ✓. The law itself is **unrepaired** — still names the frozen tree | **RED in substance · ANCHOR DEAD + witness output misstated (D2-2, D2-8)** |
| **G-KF1-9** | `find … -name '*parser-totality-exposure*' -o -name '*library-band-r1-widened*'` | **0 hits** ✓. Retained set = **7 files, 07-19 ×1 + 07-20 ×6, no 07-21** ✓ — the spec's §9 correction to the CARRY is itself correct | **RED ✓ EXACT** |
| **G-KF1-10** | `git show HEAD:…/INBOUND-LEDGER.md \| grep -oE 'IN-[A-Z]+-[0-9]+' \| sort -u` | **9 rows**: IN-ATLAS-1..5, IN-GLASS-1..2, IN-VALUE-1..2 ✓; **no IN-VALUE-3/4** ✓. Newest kf-authored letter in value's tree = `keyframes-inbox-2026-07-18-vnext-*` → silence **41 days** ✓; O-8 **35** ✓; O-11 **32** ✓ | **RED ✓ EXACT** |
| **G-KF1-11** | `test -e …/KF-W1.md` | **PRESENT** (65,138 B). Correctly relabelled **DECLARED-SATISFIED**, not born-RED; Bounds grant correctly **modify**; the execution-voice *"turned GREEN by this file's landing"* survives **only** as a quotation inside §10's repair record. **D-2 cured** | **DECLARED-SATISFIED ✓ correct treatment** |
| **G-KF1-12** | `git status --porcelain \| wc -l` in `/Users/mkbabb/Programming/keyframes.js` | **252** ✓; `EXECUTION-HANDOFF.md:13-18` = *"no mutating git, no npm operations there, ever"* ✓; packet bytes **7,064** / **15,633**, mtimes **Jul 24 16:41** / **Jul 27 12:27** ✓ | **GREEN-INVARIANT ✓ EXACT** |

**§5a drift table — re-executed row for row at `81a56990`**: row 1 `compile/value/compile.ts:32` = `const parsed = parseCssValues(value);` ✓ · row 2 `browser.ts:162` ✓ · row 3 `easing/registry.ts:36` = *"Stable identities let the serializer distinguish named curves from closures."* ✓ · row 4 `easing-serialize.ts:71-73` = the `timingFunctionEntries.find(([_name, func]) => func === easing.fn)?.[0]` reverse-map ✓ · row 5 `emit/backward/` holds exactly `backward.ts, color.ts, index.ts, walk.ts` ✓ · rows 6–8 `emit/backward/color.ts` present, **385 lines** (so `:171`/`:250`/`:263` are in range; correctly declared not-re-measured) · row 9 `package.json:70` ✓ · row 10 `engine/options.ts:31` ✓ · row 11 `internal/leaves.ts:28` byte-identical ✓ · row 12 `load-engine.ts:65` byte-identical ✓ · row 13 `emit/css-text.ts:41` byte-identical ✓ · row 14 `test/internal/leaves-parity.test.ts` **PRESENT** ✓. **Every keyframes-side anchor holds.**

**Commit refs — no phantoms**: `acff6265` ✓ · `b6e09ed4` ✓ (value.js) · `81a56990` · `a59d3a22` · `eb4379ca` · `6f6adfaa` · `94f2c3c9` · `b3b362d9` ✓ (keyframes-v-exec) · `8281638c` ✓ (sacred checkout HEAD).

**L-19 — proof-script contrivance: PASSES, affirmatively.** No gate is a script. Every witness is `ls` / `find` / `git grep` / `git cat-file` / `grep` against a tree that exists. §8 excludes *"Mail tooling — a routing script, a path linter, a delivery cron"* under an explicit `KISS / L-19` reason; C-9 carries the SIZING LOCK. **No phantom script anywhere in this spec** — the R-11 `build:gh-pages` class does not occur here.

---

## §5 E-3 + STATUS

| check | result |
|---|---|
| Zero `VERIFIED` stamps | **PASS.** `grep -n 'VERIFIED' KF-W1.md` → **2 hits, both negative**: `:41` *"VERIFIED \| **NO** \| — stamped only at X·KF's close (KF.W10)"* and `:206` restating the four-verb block as VERIFIED=NO. |
| Status planned everywhere | **PASS.** `:5` `**Status**: **planned**`; the only other status mention (`:206`) quotes it. |
| No execution verbs in current voice | **PASS.** §3/§4b are infinitive/imperative scope statements ("Back-fill", "Author", "Deliver", "Repair"). The pass-1 blemish (*"turned GREEN by this file's landing"*) is gone from the gate and survives only as a quotation of the struck phrase inside §10 row 3. |
| Opens no product source | **PASS, emphatically.** `:19` *"This wave opens **no product source in either repo** — not one `src/` file, not one `.vue`."* §4 Bounds: **5 write grants, all `docs/` + `coordination/`** (re-listed and checked). Every `src/` path is named READ-ONLY. `:21` SACRED-CHECKOUT LAW forbids all writes under `keyframes.js/`. §8 excludes *"Any product source in either repo … `scripts/dev/dev.sh`"*. |
| Execution-gate declaration | **PASS.** `:19` *"**EXECUTION IS NOT AUTHORIZED BY THIS FILE.**"* |
| §1 twelve conditions ↔ §6 twelve gates | **PASS.** One-to-one, in order, re-checked item by item. |
| E-3 (addenda, not patches) | **PASS in form** — §9 and §10 record every correction rather than silently applying it, and no dated document is rewritten. **Undermined in fact** by D2-3: the "CARRY" the addenda amend is not in tree. |

---

## §6 POSTURE AXES

| axis | binding? | finding |
|---|---|---|
| **KF.W4 = DECLARED SEQUENCING HEAD** | YES | `KF-W4.md:223` — *"**This wave is the declared sequencing head of X·KF.** No repair packet and no UNIT may open before **G-KFW4-1**"*. KF-W1 claims a **different** headship — *"the DECLARED MAIL HEAD of X·KF"* (`:43`) — grounded in ⟨`COHESION.md:76`, re-read verbatim: *"**I-26 mail cure (KF.W1) precedes any kf wave consuming O-8/O-11 obligations.**"*⟩ and ⟨`CENSUS-2026-08-03.md:264`: *"**The mail cure precedes everything kf-side.**"*⟩. **NO CONFLICT** — mail-precedence vs. gate-precedence are orthogonal, and KF-W4 reciprocates at its `:242` *"KF.W1 · Mail Cure \| PRECONDITION on anchor citability"*. **SQUARES.** |
| **KF.W3 GATED via PLAW-BIND, never scheduled** | YES | KF-W1 names it *"KF.W3 (Parser Consumption, **GATED**)"* and schedules nothing: cross-edge 6 declares X·P a **NON-EDGE** (*"carries no parser schedule … the letter states the ruling (CC-084) and nothing about timing"*); C-3 adds *"No cut date is promised"*; §8 excludes *"A cut date for 4.1"* citing OWNER-GATED PLAW-BIND. Reciprocated at `KF-W3.md:220` — *"**KF.W1 · Mail Cure (O-8/O-11) + E13 \| DEPENDS ON**"*. **SQUARES.** |
| **KF-AV-28 rider present wherever governed rows are cured** | **N/A — correctly** | R-10 assigns the STANDING CLAUSE to the six specs that carry governed rows and drop the rider (KF-W2/W3/W4/W6/W9/W10). **KF-W1 is not among them and must not be** — it books zero registry rows and spends zero cures, so it governs nothing. It nonetheless names the rider once, correctly, as a lock that **travels with** the homed packets (`:253`). **Correct by omission, and correct where it appears.** |
| **Pass-1 rulings faithfully applied** | YES | Both §END directives executed. **R-15**: cardinality 16→17 at all three sites, roster id-for-id identical to the ruling, partition matching `KF-W4.md:233-235` (W11 ×9 / W12 ×6 / W13 ×2 minted, dock-menu at W13), the cohesion FLAG marked DISCHARGED-at-the-homing-authority rather than deleted. **R-19d**: reciprocity re-measured over all seven authored siblings; **cross-edge 11 declared** for KF-W10 with its three hard-blocking citations and its 8 × `O-8` / 3 × `O-11` receipt — **re-measured here: `grep -c 'O-8' KF-W10.md` → 8, `grep -c 'O-11' → 3`, exact.** The conditional §3.1 mark on KF-W2 discharged **on the grep** (re-measured: W2 `O-8` 1 hit = `KF-CO-8` at `:342`, `O-11` 0; W7 2/0 = `KF-CO-8`; W8 0/0; all three bare-`KF.W1` = 0). Pass-1's D-1..D-8 are all cured in substance. **APPLIED.** |
| **Namespace hygiene (self-imposed, `:11-17`)** | YES | **Now closed over all three meanings** and complete at 18/18 anchors and 6/6 `BUILD W1` anchors. **PASSES.** |
| **Anchor liveness (self-imposed, C-1/C-5/§5a's D-19 re-resolve edict)** | YES | **FAILS on the value.js side and on the sibling set** — D2-1, D2-2, D2-4, D2-6, D2-7. |
| **Provenance (R-12's general rule)** | YES | **FAILS — D2-3.** |

---

## §7 DEFECT REGISTER

### D2-1 · BLOCKER — the wave commissions **O-20**, an outbound id spent nine minutes before the repair write

G-KF1-7's witness asserts, as a literal re-executed command: *"`grep -oE '^\| O-[0-9]+' docs/tranches/V/coordination/INBOX.md | sort -t- -k2 -n | tail -1` → **O-19**. No outbound row exists for a letter that does not exist."*

Re-executed by this seat against the current bytes: **`O-20`**.

`INBOX.md:95` reads: *"| O-20 | 2026-08-28 | glass (BK) | `../glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-08-28-o20-authoring-block-batch.md` — **THE SS-6 BATCHED COMMUNIQUE at the X authoring-block boundary** … 26 entries…"* — minted by commit `48003630` (**2026-08-28 12:32:16**, *"docs(X/SS-6): O-20 dispatched"*) and independently recorded at `COHESION.md:129` (*"**DISPATCHED 2026-08-28** … assembled into **O-20**"*).

KF-W1.md was repaired at **12:41** — nine minutes later — and commissions the mint of **O-20** at five load-bearing sites: `:30` (§1 hard-gate condition 7, *"I-26 CURED + O-20 minted"*), `:75` (§3 item 6, *"mint outbound row **O-20**"*), `:89` (§4 Bounds, *"a new outbound row O-20"*), `:132` (C-10 (ii), *"mint **O-20** naming payload items (a)–(d)"*), `:187`/`:189` (G-KF1-7's title and GREEN condition, plus *"O-8/O-11's rows keep their text plus an amended-by-O-20 pointer"*).

Executing this wave as written writes a **second, different O-20** into the same E13 ledger, and back-points O-8 and O-11 at it. That is a duplicate live id in the mail ledger under a spec whose own C-10 carries an **ANTI-RENAME** lock (*"I-26 keeps its id for life"*) and an **ORDERING** lock whose stated purpose is *"a ledger that marks CURED ahead of delivery reproduces I-26 in the ledger layer."* This reproduces I-26 in the ledger layer by a different route. **The correct mint is `O-21`**, and the gate's witness must read `O-20` as the measured maximum.

### D2-2 · MAJOR — all three `INBOX.md` gate anchors are dead, each stamped "re-verified 2026-08-28"

`INBOX.md` is 97 lines, clean in git, last written by `7a7dc6ef` (**2026-08-28 12:33:59** — *"I-28/I-29 rowed … BI→BK sweep-path cure"*), seven minutes before the repair write. Measured now:

| spec's anchor | what is actually there | where the quoted text actually lives |
|---|---|---|
| `INBOX.md:13-14` (C-9, §3.5, §4 Bounds, **G-KF1-8**, §9.6) | the **glass** sweep note — *"(ACTIVE-TRANCHE path — glass moved BI→BJ→BK … The stale BI pin here cost 19 days on the 08-09 letters → I-28/I-29)"* | **`:15-16`**, verbatim as quoted |
| `INBOX.md:45` (C-4, **G-KF1-6**, §9.6) | row **I-7** (`keyframes-inbox-2026-07-17-v-execution-open.md`) | **I-10 at `:47`** |
| `INBOX.md:90` (C-1, §4 Bounds, **G-KF1-7**, §9.6) | row **I-21a** (D-2 card-condense ratification) | **I-26 at `:92`**, *"ROWED 2026-08-03"* verbatim |

§4 Bounds is the sharpest instance: it grants *"**modify** — exactly three edits: the sweep-path law at `:13-14` · I-26 at `:90` ROWED→CURED · a new outbound row O-20"* — **three surgical edits, two of them aimed at the wrong lines and the third at a taken id.** §6's preamble claims *"All witnesses below are **literal commands with literal outputs, re-measured 2026-08-28 by this fold seat**"*; §9 item 6 lists *"`INBOX.md:13-14` / `:45` (I-10) / `:90` (I-26 "ROWED 2026-08-03")"* among *"Everything else in the CARRY re-verified EXACT."*

The three gates remain **born-RED in substance** — the sweep-path law still names `../keyframes.js/...`, I-10's conditional is still live, I-26 still reads ROWED — so the cure is editorial. But the defect is the wave's own subject matter turned on itself: C-1's ANTI-STALENESS lock reads *"no measurement is inherited into the addendum — every anchor, count and interval is re-measured at authoring,"* and C-5's lock reads *"The findings survive; the anchors do not."*

### D2-3 · MAJOR — the "SS-2 CARRY" this spec is authored from does not exist in tree (R-12's general rule, never run here)

`find docs -iname '*CARRY*'` returns, under `X/keyframes/`, exactly one file: **`carry/KF-W6-CARRY.md`** — W6's, and per **RULINGS R-12** *"the ONLY in-tree carry."* `grep -rl 'SS-2 CARRY' docs/` returns **one path: `KF-W1.md` itself.**

Yet the spec's **SPECIFIED verb rests on it and on nothing else**. `:39`, the evidence cell: *"the **SS-2 CARRY consumed whole (14/14 rows, §5)**; §8 states every non-carry with its reason."* That is verbatim the *"N rows carried, 0 dropped"* claim R-12 orders struck — *"striking every 'N rows carried, 0 dropped' claim keyed to a ledger that does not exist."* The dependence runs deeper than one cell: `:7` (*"The CARRY names `waves/W1.md` and records the parent directory ABSENT at 2026-08-25"*), `:87` (*"The CARRY-era **create** grant is **SPENT**"*), `:119` (*"Every SS-2 CARRY row, agglomerated by identity"*), and the whole of §9 — six numbered *"Authoring-time corrections to the CARRY"* quoting CARRY content (*"07-19, 07-20 ×5, 07-21 present"* · *"12 rows"* · *"38 days at 08-25"* · *"directory ABSENT at 2026-08-25"*) that resolves against **no file in the repository**. Independently searched: `grep -rn '07-21 present\|07-20 ×5' docs/` → only KF-W1.md.

**Mitigation, stated plainly**: R-12's §END directive map routes exactly two directives to this wave (R-15, R-19d) and does **not** list R-12, so the repair seat executed its assignment faithfully; pass-1's local check never ran the rule here either. The rule itself is nonetheless general and binding — *"No other wave may cite a per-wave CARRY as provenance"* — and the cure is the one R-12 already prescribes: strike the phantom citations and restate provenance as *"authored from the 58-record registry directly; the routed denominator is the registry's (PASS-2 census: 6 routed / 6 booked / 0 escaped)."* The **substance survives intact** — this seat re-derived the census independently and the fourteen rows are all grounded (§3).

### D2-4 · MAJOR — every sibling anchor carrying the R-19d reciprocity proof is dead at current bytes

The reciprocity paragraph (`:45-48`) and cross-edges 1, 2 and 11 — the R-19d cure's entire receipt — cite sibling `file:line` anchors. Re-executed:

| cited | what is at that line now | where the quoted text lives now |
|---|---|---|
| `KF-W4.md:206` (*"PRECONDITION on anchor citability"*) | a markdown table separator `\|---\|---\|---\|---\|---\|` | **`:242`** |
| `KF-W3.md:209` (*"DEPENDS ON"*) | an **X·P / X.P.W4** row | **`:220`** |
| `KF-W10.md:16` (*"Opens after … X.KF.W1"*) | blank | **`:20`** |
| `KF-W10.md:50` (**OP-3**, *"UNLANDED … false close"*) | a precondition table header | **`:54`** |
| `KF-W10.md:296` (*"W10 depends"*) | blank | **`:332`** |
| `KF-W0.md:269` / `:306` (the REVERSE-edge conflict) | EE-01 witness lines / a G-0.x GREEN condition | elsewhere in the re-authored file |

**The substance survives at every one** — this seat re-located each edge and all are still declared, in the same direction and with the same force (`KF-W4.md:242` PRECONDITION · `KF-W3.md:220` DEPENDS ON · `KF-W10.md:20` Opens-after, `:54` OP-3 UNLANDED, `:332` *"W10 depends"*). So **R-19d is cured in kind**; only its receipts are phantom.

**Mitigation**: the siblings were repaired at **13:10–13:15**, after KF-W1's **12:41** write — this is intra-round drift, not negligence. It is recorded because a fresh seat reading KF-W1 **today** bounces off all six, which is precisely the failure mode I-26 names, and because the cure is trivial (re-anchor at close of the repair round, or cite by section id rather than line).

### D2-5 · MAJOR — the E13 sweep was not re-run before the repair write, and it would have handed C-9 its own precedent

§7's standing law: *"the wave opens with the four-path mail sweep."* §2's preconditions record no new mail; §9 records no sweep.

Commit `7a7dc6ef` (**12:33:59**, seven minutes pre-repair) did two things in the very file this wave plans to edit. It **rowed two new inbound letters** — I-28 and I-29 at `INBOX.md:96-97`, glass BK #76, 8.0.0 addendum + constellation remainder — and it **performed a sweep-path cure of exactly C-9's defect class**: a codified sweep path pointing at a stale tree, cured by naming the live one, with the cost recorded in-line — *"glass moved BI→BJ→BK; sweep the LIVE tranche's coordination dir, not a pinned letter. **The stale BI pin here cost 19 days on the 08-09 letters → I-28/I-29**"*.

C-9 `KF-MAIL-PATH` argues, correctly and at length, that *"I-26 is not a slip; it is our codified procedure executing correctly"* and that *"unrepaired, the next letter reproduces it exactly."* It cites no precedent — and a second, independently-discovered instance of the same law-level defect, cured in the same block minutes earlier at a measured cost of 19 days, is the strongest possible corroboration of C-9's thesis and the natural template for its two-line cure. The two new rows are out of this wave's scope (glass → X·V fold), so no UNREAD-mail-at-close breach follows; the miss is evidentiary and design-level, not a scope breach.

### D2-6 · MINOR — `INTAKE-ADJUDICATION-2026-08-03.md:144-145` is a dead anchor for the D-4 cure

C-14 leg (ii) and §10 row 4 both cite `:144-145` for the intake's enumeration-with-gaps. Measured: **`:144-145` is the tail of the KF.W0 block** (*"is ever cited."* + a blank line). The KF.W4 enumeration is at **`:147-149`**, under the heading *"### KF.W4 · K-Quartet Hygiene"* at `:146`. The enumerated content the spec carries is **exact** (`B10-17 · B10-18 · B10-19 · B10-20 · B10-22 · B10-23 · B10-27 (the four gate-design rules) · B18-19("derivation helpers" half) · B21-17(secondary)`), so D-4's substance is cured and only its receipt is wrong.

### D2-7 · MINOR — C-14 leg (iii)'s reconciliation cites a sibling line that no longer holds it

The spec grounds the canonical 17 as *"the reconciliation of `KF-W0.md:276`'s 15 and `KF-W9.md` S-11's 14."* `KF-W0.md` was re-cut to the canonical 17 in the same repair round: its `:26` R-15 row reads *"re-cut from this file's stale **15** to the **canonical 17**"* and the roster lives at `:401`. `:276` now holds an unrelated N-3 witness line. The historical statement is true; the anchor is not. Same drift class as D2-4, same trivial cure.

### D2-8 · MINOR — G-KF1-8's witness misstates its own grep's output

The gate presents `grep -n 'keyframes.js/docs/tranches' docs/tranches/V/coordination/INBOX.md` as returning `:13-14`. Re-executed, it returns **four** lines: `:15` (the sweep-path law) plus `:66`, `:72`, `:75` — the O-2 / O-8 / O-11 outbound path cells, which have been in the ledger since 2026-07-17/24/27 and were therefore already there at authoring. A seat re-running the witness does not get the quoted single result even once the anchor is corrected; the witness needs a narrowed pattern (e.g. `grep -n '^- \`\.\./keyframes\.js'`) or an explicit "4 hits, the law at the first."

### D2-9 · INFO — §5a row 14 is the one anchor the spec's own re-resolve edict leaves un-run

Row 14 (`test/internal/leaves-parity.test.ts`) is honestly marked *"inherited EXACT from lane-docs; **re-measure at authoring**"* / *"not re-measured here"* — under a §5a header whose law is *"Anchors are re-resolved at authoring, **never copied**"* (the D-19 edict). This seat ran it: `git cat-file -e HEAD:test/internal/leaves-parity.test.ts` at `81a56990` → **PRESENT**. The declaration is exemplary; recorded only so the last inherited figure in the spec is now measured and the executing seat inherits nothing.

---

## §8 What holds — recorded so the defects are read at their true weight

- **The ∅-column finding is real and independently re-derived.** This seat closed the routing alphabet four ways and found **zero** rows routed to census-taxonomy `KF.W1`. C-14's `LOCK (L-19): a wave with no registry rows gets no manufactured ones` is honoured — **no invented row, no invented gate, no invented bounds item.**
- **The census is CLEAN**: 6 routed, 6 booked, **0 escaped**, 0 inventions, 2 riders carried without being rows. Every one of the six is the same identity (census F-1), correctly routed away by declaration rather than by editing the bank.
- **Every keyframes-side witness reproduces byte-exact** — the 9-entry coordination listing, the three ABSENT anchors, `:165→:162`, `:69→:70`, the three `parseStylesheet` sites and their imports, the 62-import split 29/16/7/5/3/2, the 9-row INBOUND-LEDGER with no IN-VALUE-3/4, `package.json:77` glass-ui `7.0.0`, and the sacred checkout at `8281638c` / `41 1` / 252 dirty / 7,064 B / 15,633 B. **The §5a drift table reproduces row for row**, all 14.
- **All eight pass-1 defects are cured in substance**, none by deletion: the born-RED tally is honestly 10 (D-2), the reciprocity set is the authored set with KF-W10's cross-edge 11 declared (D-1/R-19d), the cardinality is the receipted canonical 17 (D-3/R-15), the intake enumeration no longer double-routes `B10-21` (D-4), the third `W1` namespace is declared with all six anchors verified (D-5), the alias census is complete at 18/18 (D-6), C-14 leg (i) survives the grep it invites (D-7), and the KF-W2 cohesion mark is discharged by measurement with W7/W8 named alongside (D-8).
- **Every quoted lock is verbatim at its lane-docs anchor** (`:365` `:366` `:375` `:378` `:380` `:381`), `COHESION.md:76` and `CENSUS-2026-08-03.md:264` are exact, and **every dissent is carried rather than resolved** — the `a59d3a22` rider, the KF-W0 reverse-edge conflict, C-4's recorded asymmetry.
- **L-19 holds affirmatively**: no gate is a script, no phantom command is cited, the one gate that could not fail was relabelled rather than kept for the count, and the mail tooling a lesser spec would have minted is excluded by name.
- **The failure is confined to one axis**: measurements taken on the value.js side before `48003630`/`7a7dc6ef` and carried across a repair round that re-stamped them as fresh. Six of the nine defects are one editorial pass on `INBOX.md` anchors and one id; D2-3 is R-12's prescribed strike-and-restate; D2-4 is a re-anchor at round close.

**Local verdict: DEFECTIVE — 1 BLOCKER · 4 MAJOR · 3 MINOR · 1 INFO. Census CLEAN (6 routed / 6 booked / 0 escaped). Zero inventions. Every cure is editorial and lands inside this file, except D2-1, which must move a ledger id before the wave can be opened.**

*Fresh adversarial seat, PASS 2. Sole write = this file. Nothing here stamps a verb, authorizes execution, or opens product source.*
