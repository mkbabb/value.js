# KF-W0 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 4)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W0.md` — 631 lines, **thrice repaired** (round 1 vs `PASS-1/RULINGS.md`, round 2 vs `PASS-2/RULINGS-2.md`, round 3 vs `PASS-3/RULINGS-3.md`).

**Seat**: FRESH. Nothing below is inherited from `PASS-1`/`PASS-2`/`PASS-3` registers, from any RULINGS file, or from the spec's own prose. **The inherited nine-block partition is RETIRED**: this seat's census is derived **by record**, from the 58 `kf-*.md` bytes themselves, and every receipt is re-executed at its own anchor.

**Substrate of record (TREE LAW)**: keyframes.js `origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1` (`git rev-parse origin/master`, run this seat, read-only). Local HEAD `8281638c0ac4ac8c54a67a018ca5bf6a9117174f` is **DISQUALIFIED** and read only where a gate's own subject *is* the schism (G-0.1..G-0.4 RED baselines), which is lawful and declared at each use. `git merge-base --is-ancestor 8281638c 81a56990` → **false**; the two lines diverge.

**Corpus**: the 58 `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58) + the sole carry `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`.

**Date**: 2026-08-28.

---

## §0 — Census unit and method (BY RECORD)

**Unit** = one ⟨record : banked obligation⟩ **pair** routed to KF.W0. A pair is **BOOKED** only when `KF-W0.md` resolves it **by bytes** to a named disposition **and the id resolves to that record**. A pair whose content is carried but whose **banked id is absent by bytes** is an **ESCAPE** — the spec's own C-1.G rule, applied to the spec.

**Derivation executed this seat at the current bytes** (the spec's stated predicate, re-run to check it reproduces):

```
$ cd docs/tranches/V/megatranche/registry/adjudicated
$ ls kf-*.md | wc -l                                              → 58
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | wc -l                       → 237   (pre-discard lines)
$ grep -l -E 'KF\.W0|KF-W0' kf-*.md | wc -l                       →  50   (pre-discard records)
$ BP='ADJUDICATED, not VERIFIED|agglomeration input|wave sketch|census lane taxonomy|census taxonomy|Status verbs per M-25'
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | grep -cE "$BP"              →  64   (discarded)
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | grep -vE "$BP" | wc -l      → 173   (post-discard lines)
$ per-record survivor count > 0                                   →  44   (post-discard RECORDS)
$ records the discard drops whole                                 →   6
    kf-AnimationVisualizer · kf-CSSCodeEditor · kf-KeyframeCardList
    kf-KeyframeTimeline · kf-TimelineHoverPreview · kf-TransportDock
```

**The round-3 D-5 cure reproduces byte-exactly** — 237/50 · 64 · 173/44 · and the six dropped-whole records are the six the spec names. The struck 200/48 is genuinely retired. **D-5 is CLOSED.**

Each of the 173 survivors was resolved to its banked ⟨record : id⟩ pair and grepped against `KF-W0.md`. Added: the pairs the discard drops but that still route (`kf-KeyframeCardList:120`, booked at C-1.F F-12 — the spec's own declared instrument limit (i), which holds), the sole carry's `:174`–`:179` claimant block and `:354`/`:361` edges, and the inbound obligations declared **from a sibling spec's end** (`KF-W10.md` §6.A ordering 3 / §6.B lock 1 / §Sequencing A; `KF-W4.md` §Sequencing).

**Result: routed 121 · booked 114 · escaped 7.**

The spec's stated §Carry denominator — **76 addressable rows** (22 C-1..C-22 + 13 C-1.F + 22 C-1.G + 5 C-1.R + 14 C-17.R) — **reproduces exactly at the bytes**, counted this seat by table-row scan: 22 / 13 / 22 / 5 / 14 = 76. The arithmetic is sound. **55 of the 58 records are named in the file**; the three that are not (`kf-ChannelControls`, `kf-SpringPhysicsFacet`, `kf-TimelineTrack`) carry no KF.W0 token, which is lawful — but two of them carry the escape at E-1 below.

---

## §1 — THE SEVEN ESCAPES (named by bytes)

| # | Escaped pair | Banked routing words / anchor | Byte receipt against `KF-W0.md` |
|---|---|---|---|
| **E-1** | **`D-19` — THE RE-ANCHOR LAW'S BANKED ID, cited in 35 of the 58 records, absent from this wave entirely** | ⟨kf-RibbonBar:35⟩ *"Anchors bind to worktree ≡ `origin/master` `81a56990`; **re-anchor before any cure (D-19 law)**"* · ⟨kf-EditorHeader:29⟩ *"re-resolve all EditorShell/MbabbMenu anchors at `origin/master` before any cure (**D-19 law** + kf-App ruling 1)"* · ⟨kf-ControlsPaneWrapper:31⟩ · ⟨kf-KeyframeTimeline:37,:166⟩ · ⟨kf-SharePopover:30⟩ · ⟨kf-PlaybackRibbon:36⟩ · ⟨kf-TimelineHoverPreview:38⟩ · ⟨kf-KfPillTabs:118⟩ (*"D-19 lesson"*) · ⟨kf-TimelineTrack:155⟩ · ⟨kf-ChannelControls:150⟩ … | `grep -c 'D-19' KF-W0.md` → **0**. `grep -lE 'D-19' kf-*.md` + a re-anchor-context filter → **35 records**. The re-anchor law's **CONTENT** is carried richly (C-2, C-21, G-0.9, *"the corpus-wide re-anchor clause"*, the per-file exemplar); its **ID** — the single most widely-cited routing id in the corpus — reaches no table. This is **exactly the C-1.G class the wave built four sub-tables to catch** (*"the F-1-fold ids whose CONTENT C-1 already carried and whose **id** was absent by bytes"*), at the largest amplitude in the corpus, and it is the one id the index never swept for. A `.e` seat sweeping the 58 records for the re-anchor obligation **by its banked id** finds nothing in the spec to key against — and G-0.9's whole content is that every record names the ref it cures against. |
| **E-2** | **kf-EasingTarget `KF-ET-27` — a FOURTH S-10 census-slot claimant** | `:69` — *"→ **NO-WAVE-OWNER** (one home for 14px + fix the sheet); **C's proposed S-10 census arm** over `design-idioms.css` (glass overlap + contract truth) **is ADOPTED as a KF.W5 input**."* | C-17.R's row-13 receipt asserts, in this file's own voice: *"`grep -n 'S-10' kf-*.md` over the 58 records returns **exactly three census-slot claims** … and **three per-record roster indices that are not census claims at all** … **There is no fourth or fifth S-10 claimant in the corpus.**"* The actual grep returns **37 hits across 15 records**. `kf-EasingTarget:69` is a **seventh** hit that is neither of the two enumerated kinds: an *adopted* S-10 census arm. `grep -c 'KF-ET-27' KF-W0.md` → **0**. Under §Scope 6's own mint monopoly — *"no wave other than KF.W0 mints or renumbers a census slot"* — an adopted S-10 census arm routed to **KF.W5** is either a claimant the mint must see or a monopoly breach that must be ruled. It is neither. |
| **E-3** | **kf-EasingSidebar `KF-ES-20` — the second record naming the same S-10 arm** | `:61` — *"→ **KF.W5** (census-truth arm, **with the KF-ET-27/S-10 design-idioms precedent**)."* | `grep -c 'KF-ES-20' KF-W0.md` → **0**. Two independent records name one S-10 census arm and route it to a sibling wave; the mint roster that declares itself re-derived *"at the corpus bytes"* saw neither. This is E-7/E-8 of pass 3 reproduced one round later at a **corpus-side** source rather than a carry-side one — the roster's instrument now misses claimants the corpus enumerates, having been repaired to stop missing claimants the *carry* enumerates. |
| **E-4** | **kf-EditorStartScreen `KF-EST-1` — the THIRD dead-`proof:*` residue family** | `:58` — *"**Eight `proof:*` citations across two files** name gates deleted by `70b32501`/`92746148` as **binding authority** — `:15` styled as an OWNER lock, `:56`, `:134`, **`:159`**, **`:180`** + TypingDots `:45`, `:51`, `:59`"*; routed at the bank to **KF.W4**'s provenance-gate law | `grep -c 'KF-EST-1' KF-W0.md` → **0** · `grep -c 'L-EST-3'` → **0** · `grep -c '92746148'` → **0**. G-0.7 declares *"One roster, one owner, one sweep"* and states it **receives two residue families INBOUND from KF.W4 under R-8** (kf-DemoGlobalChrome **L-6**, kf-AnimationControlsGroup **D-13**). There is a **third of exactly that class**, and the wave's own worked-example list independently cites **two of its eight sites** — `EditorStartScreen.vue:180` (under `proof:font-census`) and `EditorStartScreen.vue:159` (under `proof:styling-idioms`) — without ever naming the family, its id, or its second file (`TypingDots.vue`, three further sites). The roster disposes the sites and loses the family. |
| **E-5** | **LAW A Census 1's SYMBOL census is short — two hits outside `P` left unresolved under a sentence claiming all are resolved** | `KF-W0.md` §LAW-A CENSUSES, Census 1 (2): *"**every hit outside P resolved to its own specifier**"* then seven hits, closing *"→ **ZERO additional direct consumers of P**."* | Re-executed at `81a56990` over the barrel's real export set (verified byte-exact: 8 values + 5 types): **`test/compile/compile-roundtrip.test.ts:42-44`** — `import { compileToCSS, DEFAULT_DELTA_E_EPSILON } from "../../src/animation/compile"` (the **largest** consumer of the symbol in the tree, ~15 call sites, and the *same class* as the two `test/engine/*` hits the census does enumerate) and **`src/animation/load-engine.ts:47`** — `compileToCSS` from `"./public"`. Both are absent from the resolution table. The **conclusion survives** (both reach P through barrels), but LAW A's requirement is that **each hit be resolved**, and an unresolved hit is precisely the failure LAW A exists to catch — committed inside the block that promulgates it. |
| **E-6** | **The `:447` transit-roster self-anchor is STALE by 141 lines** | Repair Round 3's landing-site table: *"**`:447`'s transit roster** gains the KF-AV-28 standing supersession rider…"*; the round-3 altitude sweep: *"**E-3** → **`:447` only** (the roster is the file's single enumeration of travelling locks)"* | `grep -c ':447' KF-W0.md` → **4**. The transit roster is at **`:588`** (§Sequencing, the NO-WAVE-OWNER packets row). `sed -n '447p'` returns a **bare code fence** inside G-0.4's static tier. The **cure itself landed correctly** (verified below); what escaped is its *record of landing* — the four cells that tell a later seat where the cure lives point at the wrong line, with no §-heading beside them, in a file whose own **R2-7 citation idiom** requires a stable anchor with line numbers *"riding parenthetically and declared non-load-bearing."* A round-3 edit moved the roster and the round-3 header was not swept behind it. |
| **E-7** | **G-0.1's falsifier denominator `73` is ARITHMETIC over two non-nested sets; the measured figure is `225`** | *Falsifier*: *"A record that disposes only the 252 status rows fails: **73 files of the frontier-diff surface are not in that set**."* (`325 − 252 = 73`) | Re-measured this seat, read-only: `comm -13 <(git status --short \| sed 's/^...//' \| sort -u) <(git diff --name-only origin/master \| sort -u) \| wc -l` → **225**. The reverse difference → **152** (the 124 untracked files plus 28 more are in the status set and **not** in the frontier-diff set, which only walks tracked paths). The two sets are **not nested**, so their sizes cannot be subtracted. See D-2. |

---

## §2 — DEFECTS

### D-1 · MAJOR — `D-19`, the corpus's most-cited routing id, reaches no table; the wave that owns the re-anchor never names the law by its banked name

E-1, stated as a defect, because it is the sharpest one this pass found.

Thirty-five of fifty-eight adjudicated records — **60 % of the corpus** — carry the same sentence-shape:

> ⟨kf-RibbonBar:35⟩ *"Anchors bind to worktree ≡ `origin/master` `81a56990`; **re-anchor before any cure (D-19 law)**."*
> ⟨kf-KeyframeTimeline:37⟩ *"Line anchors are keyframes `8281638c`; **re-resolve before any cure (D-19)**."*
> ⟨kf-EditorHeader:29⟩ *"re-resolve all EditorShell/MbabbMenu anchors at `origin/master` before any cure (**D-19 law** + kf-App ruling 1)."*

`grep -c 'D-19' KF-W0.md` → **0**.

This is not an absence of the obligation — the **content** is carried better here than anywhere in the program (C-2's law, C-21's per-file proof, G-0.9's whole GREEN, and, new this round, the kf-AmigaScene per-file exemplar). It is an absence of the **id**, which is the entire mechanism the wave's four id-keyed sub-tables exist to close. C-1.G's own charter reads: *"the fold ids whose **CONTENT C-1 already carried** and whose **id was absent by bytes**, indexed with each row's banked routing words. **Nothing is re-booked** — indexing is not curing; **it is what makes the fold's closure checkable.**"* The index ran over 22 rows and never over the one id 35 records use.

**Why it bites at execution, not just on paper.** `.e`'s charge is the 58-record ref-of-record stamp, and G-0.9's GREEN is *"every record carries a stamped ref-of-record."* A seat working the 58 will grep each record for its re-anchor obligation, find `(D-19)`, and have **nothing in the spec to key the stamp against** — no row, no disposition, no owner. Two of the 35 records (`kf-ChannelControls`, `kf-TimelineTrack`) are among the **three records this file never names at all**, so for them the id is the *only* thread back to the wave.

**Sharper still**: `D-19` is an **overloaded token**, exactly like the `S-10` overload C-17.R just learned to declare — `kf-KeyframesAddDialog:69` uses `D-19` as a component-local dead-token row id (*"KAD-16 — dead-token cluster (D-12/D-18/D-14/D-19 …)"*). The wave has, this round, written the id-overload lesson into C-17.R's heading for `S-10` and not applied it to the id 35 records route on.

**Cure**: a C-1.G row (or a C-1.R guard, since the disposition is *carry-not-cure*) reading `D-19 — the re-anchor/re-resolve-before-cure law: CONTENT carried whole at C-2 · C-21 · G-0.9; NO RE-BOOK; the id is record-qualified because kf-KeyframesAddDialog:69 overloads it`, with the 35-record receipt pasted, and G-0.9's stamp keyed to it.

---

### D-2 · MAJOR — G-0.1's falsifier states an arithmetic denominator over two non-nested sets; the real exposure is 3× what it names, in the leg that decides whether the gate can be gamed

E-7, stated as a defect.

`KF-W0.md` G-0.1 *Falsifier*:

> *"A record that disposes only the 252 status rows fails: **73 files of the frontier-diff surface are not in that set**."*

The same framing rides the **L-18 rider**: *"a disposition record covering the 252 status rows over a 325-file frontier surface."* `grep -c '73 files'` → **2**.

**Re-measured this seat, read-only:**

```
$ git status --short | wc -l                            → 252
$ git diff --name-only origin/master | wc -l            → 325
$ comm -13 <(git status --short | sed 's/^...//' | sort -u) \
           <(git diff --name-only origin/master | sort -u) | wc -l   → 225   ← frontier-diff files NOT in the status set
$ comm -23 <(git status --short | sed 's/^...//' | sort -u) \
           <(git diff --name-only origin/master | sort -u) | wc -l   → 152   ← status files NOT in the frontier-diff set
```

`325 − 252 = 73` is only meaningful if the 252 is a **subset** of the 325. It is not: `git status --short` counts 124 **untracked** paths that `git diff --name-only origin/master` never walks, plus 28 further tracked rows that differ from HEAD but not from the frontier. The sets overlap in **100** files, so a record disposing "the 252 plus 73 more" leaves **125 frontier-diff files unreconciled** and stamps the gate.

This is the wave's own recorded disease, in its most load-bearing sentence. §Carry's preamble: *"the denominator is **re-counted at the bytes, never carried forward by arithmetic** (R2-5(g); round 1's stated **65** was arithmetic over a roster that was itself short, **which is how the count outlived the escape it hid**)."* Round 1 was convicted for arithmetic over a §Carry roster; three rounds later the same arithmetic sits in a **gate falsifier**, where a wrong number does not merely mis-describe a table — it defines the condition under which the gate cannot be cheated.

**Cure**: G-0.1's falsifier and the L-18 rider both carry the **measured** figure with its command — *"a record that disposes only the 252 status rows leaves **225** frontier-diff files undispositioned (`comm -13`, pasted); the two surfaces are **not nested** — 152 status rows are outside the frontier diff, 124 of them untracked — so the GREEN requires **both** enumerations, not one plus a difference."*

---

### D-3 · MAJOR — C-17.R's row-13 re-derivation receipt is unreproducible as pasted, and its closing sentence is a self-voiced closure claim over an enumerable set, inside the row that invokes LAW B's corollary

E-2 / E-3, stated as a defect.

C-17.R row 13, verbatim:

> *"**Re-derivation pasted, per LAW B's corollary** … `grep -n 'S-10' kf-*.md` over the 58 records returns **exactly three census-slot claims** — `kf-KeyboardShortcutsModal.md:29,:68` · `kf-KeyframesEditor.md:63` · `kf-SquareInstrument.md:78,:140` — and **three per-record roster indices that are not census claims at all**: `kf-App.skeleton.md:91`, `kf-ChromeDock.md:125`, `kf-ControlsPaneWrapper.md:122`. **There is no fourth or fifth S-10 claimant in the corpus.**"*

**Re-run at this seat**: the stated command returns **37 hits across 15 records**, not six across six. Nine records the receipt never touches: `kf-EasingScene` · `kf-EasingTarget` · `kf-EasingSidebar` · `kf-LayerConfigPanel` · `kf-OrbitalDrag` · `kf-RibbonBar` · `kf-SpringPhysicsFacet` · `kf-SpringScene` · `kf-SquareScene`.

**Most of the excess is a substring artifact** — `KF-ES-10`, `MISS-10`, `KF-SS-10` — and the seat that wrote the row plainly read past them. **Two hits are not**:

- `kf-EasingTarget:69` — *"C's proposed **S-10 census arm** over `design-idioms.css` (glass overlap + contract truth) is **ADOPTED** as a KF.W5 input"* (E-2).
- `kf-EasingSidebar:61` — *"→ KF.W5 (census-truth arm, **with the KF-ET-27/S-10 design-idioms precedent**)"* (E-3).

**Two failures, and the second is the graver.**

**(a) The claimant is real and unenumerated.** An *adopted* S-10 census arm, cross-referenced by a second record, routed to **KF.W5** — against §Scope 6's *"no wave other than KF.W0 mints or renumbers a census slot"* and C-17's *"Claims are inputs to the mint; a claim is never a slot."* G-0.6's second falsifier fires by construction: *"a mint whose roster is short by a claimant the wave's own carry enumerates is the defect, not an approximation of the cure."* Round 3 closed the *carry-side* short-roster (KAD-12) and re-opened a *corpus-side* one.

**(b) The receipt does not reproduce and the sentence asserts closure.** *"There is no fourth or fifth S-10 claimant in the corpus"* is a completeness assertion over an enumerable set, in this file's own voice — **the precise construction LAW B bans** — written inside the one row that cites *"LAW B's corollary"* as its authority. LAW B's own text: *"No sentence in this file asserts, in its own voice, completeness / closure / zero-escape over an enumerable set … Each such clause now **cites the freshest conformance census artifact** … and states what that artifact found *including its defects*."* The row does the opposite: it re-asserts, on a command whose output it did not paste and does not match.

**Cure**: paste the **37/15** reading with its command; state the substring-overload discard rule (`KF-ES-10` / `MISS-10` / `KF-SS-10` are not `S-10`) so membership reproduces; **adopt `KF-ET-27` as the fourth S-10 claimant** with `kf-EasingSidebar KF-ES-20` as its second provenance leg and *"the design-idioms census arm is KF.W5's"* as its disposition; and replace *"there is no fourth or fifth claimant"* with the LAW B form — the claim cites this artifact, which found one.

---

### D-4 · MINOR-rising-to-MAJOR — the round-3 cures landed, but three of their landing-site records point at coordinates that no longer hold

E-6, generalized. The round-3 header table and altitude sweep are the file's own record of **where** each cure lives; a later seat re-verifying round 3 reads them first.

- **`:447` × 4** — the transit roster is at `:588`; `:447` is a bare code fence (E-6). No §-heading rides beside it.
- The same sweep line reads *"**E-3** → `:447` **only**"*, so a seat auditing E-3's carriage checks one wrong line and finds nothing.

Against this, the **substance** of every round-3 cure verified TRUE at this seat (see §4), so the defect is bookkeeping, not carriage — but it is the D-1-of-round-3 mechanism (*a receipt that proves the thing next door*) reproduced one altitude up, in the file's own change log, and the file's R2-7 idiom exists to forbid exactly a bare, load-bearing line number.

**Cure**: the round-3 table's landing cells cite **§-headings** (*"§Sequencing, the NO-WAVE-OWNER packets row"*), with `:588` parenthetical and declared non-load-bearing.

---

### D-5 · MINOR — LAW A's symbol census is incomplete under its own completeness sentence

E-5, stated as a defect. The census's export roster is **byte-exact** (8 values + 5 types, verified against `origin/master:src/animation/compile/emit/backward/index.ts`), the specifier census reproduces **exactly**, the alias census reproduces **exactly** (5 `@src/animation/compile` hits, none into `P`), and Census 2 reproduces **byte-for-byte at one consumer**. The single gap is that two symbol hits outside `P` — `test/compile/compile-roundtrip.test.ts:42` and `src/animation/load-engine.ts:47` — are not resolved in a table that says *"every hit outside P resolved to its own specifier."* The **consumer set is unchanged**; the **claim** is not reproducible.

Two cosmetic riders in the same block: *"backward/{backward,color,index,walk}.ts + **10 flat siblings**"* counts `format/{format,index,options}.ts` as flat when the frontier carries them in a `format/` sub-dir (7 flat + 3 in a module); and *"all other hits are **docs/ prose**"* is false of two in-source comment hits inside `P` itself (`backward/index.ts:2`, `backward/walk.ts:2`).

**Cure**: add the two rows with their specifiers, restate the flat-sibling count as **7 flat + `format/` ×3**, and qualify the docs-prose clause.

---

### D-6 · MINOR — G-0.7 claims one roster, one owner, one sweep while receiving two of three residue families by id

E-4, stated as a defect. `kf-EditorStartScreen` **KF-EST-1** (*"eight `proof:*` citations across two files name gates deleted by `70b32501`/`92746148` as binding authority — five styled as **OWNER locks**"*) is the third member of the class G-0.7 receives under R-8, and the wave cites two of its eight sites under other names while never naming the family. `TypingDots.vue:45,:51,:59` — three of the eight — appear nowhere in the roster's worked examples at all.

The roster's **GREEN survives** (it is name-keyed with per-site disposition, so those sites are disposed by name inside the 53), which is why this is MINOR and not MAJOR. What is lost is the **family accounting** the gate's own falsifier (b) turns on: *"an unenumerated dependent set … is undecidable, not green"* — the exact reason R2-17.2 enumerated D-13's seven.

---

## §3 — AXIS VERDICTS

| Axis | Verdict | Ground |
|---|---|---|
| **(1) ID-KEYED CENSUS (by record)** | **DEFECTIVE** | routed **121** · booked **114** · **escaped 7**. The §Carry denominator (**76**) reproduces exactly by table-row scan (22/13/22/5/14) and the D-5 sweep reproduces byte-exactly (237/50 · 64 · 173/44 · six dropped-whole). What escapes is **membership, not arithmetic** — for the fourth round running, and now at the largest amplitude yet: **`D-19`, the id 35 of 58 records route their re-anchor obligation on, has zero hits in the wave that owns the re-anchor** (E-1/D-1). Two further escapes are a **fourth S-10 claimant the mint roster's own re-derivation receipt declares does not exist** (E-2/E-3/D-3). |
| **(2) ANCHOR + SUBJECT-IDENTITY** | **HOLDS — every receipt this seat re-executed resolves at its anchor AND its target mentions its subject** | Re-run read-only at `81a56990`: **G-0.1** 41/1/252/325/124/`a59d3a22`, neither an ancestor ✔ (six of six) · **G-0.2** HEAD `:71` 6.0.0 optionalDep · frontier `:70` value.js 4.0.0 / `:77` glass-ui 7.0.0 devDep · worktree 0/0 · locks 3/3 · installed 7.0.0 · `.npmrc` single line · no pencil-boil ✔ · **G-0.3** the four-path diff stat reproduces line-for-line ✔ · **G-0.4** `bounceInEase`→`easeInBounce` at `:42`, `.start.toString()`→`startScalar` at `:11`, the cure line at `:97`, CopyButton status empty, `live-session.mjs:77` + mobile `:89` the only budget importers, `smoke.mjs` **0** `pageerror` bytes, no `e2e/`, `V.md:73` carries the `[object Object]` born-RED gate ✔ · **G-0.5** glass-ui HEAD header-ribbon **empty**, `4bf53962^` five files, consumer `:116` intact, `dist/header-ribbon.js` present ✔ · **G-0.6** src `.ts` **153**, demo `.vue` **58**, demo `.ts\|.vue` **185** ✔ · **G-0.7** three entry points `:50/:51/:52`, `check` `:37` with **no vue-tsc**, `lint` `:44`, **9** gate files by exact name, **54 distinct + 1 bare token = 55**, **116 hits / 51 files**, brittleness ×3 sites, **68** docs files ✔ (every figure) · **G-0.9** `?? demo/utils/formatEditorCSS.ts` + `keyframeSelector.ts` untracked ✔, **and the TypingDots inversion reproduces exactly** — `git diff --stat origin/master -- …/TypingDots.vue` **EMPTY** while HEAD differs by 13 lines, so the falsifier's instrument is real ✔ · **G-0.10** `dist/gh-pages/assets/index-CL_QYCiO.css` mtime **Jul 16 09:11** ✔, **both repo-qualified letters exist** — value.js archive (2 878 B) and `origin/master:docs/tranches/V/coordination/…consumer-updates.md` ✔ · **C-19's receipt re-derives to 32 names, minus the two named anti-firings = 30, partition 16+8+4+2=30** ✔ · **LAW A Census 2 reproduces at one consumer, byte-for-byte** ✔ · the EE-02 **subject-identity** rows resolve (`:143` `pts` → `:144` the bezier-drag write → `:145-147` the comment → `:148` the twin) ✔ · **KF-AV-28's rider is carried VERBATIM** against `kf-PlaybackRibbon:36`, word for word including the §7 caution and the NON-bespoke clause ✔. **Not one anchor resolved to the wrong subject.** The only anchor failures are **self**-anchors (D-4) and the two unresolved LAW-A symbol hits (D-5). |
| **(3) M-25 DEPTH (locks / riders / dissents)** | **MIXED — the carriage is now genuinely deep; the id-keying is where it fails** | Pass 3's three M-25 drops are all **CLOSED**: **KF-AV-28** now travels for **both** governed packets with the §7 caution and the NON-bespoke limb verbatim, and `KF-W4.md` is named as carrying the supersession core so neither end drops a half ✔; **C-17.R row 4** regains *"owned by KF.W6"* ✔; **kf-SpringTrace `D-15`** is booked as a one-line NO-RE-BOOK guard, explicitly disambiguated from kf-EditorHeader's `D-15/D-17` ✔. The dissent surface is deep and correct (β-miss-1 at §Excluded, B18-26 split adoption, B18-27 unresolved-by-design, DISSENT 1/3/4, C-20 as the named test case, reader-B's vacated caveats preserved as dated record). Against that: **E-1** is an M-25 failure of the first order — *"a sequencing rider dropped in transit is a silent drop"* is this file's own preamble, and the re-anchor law is the rider **35 records** attach to every anchor they bank. |
| **(4) GATES BORN-RED with REACHABLE GREEN · LAW A · LAW B** | **DEFECTIVE (two MAJOR), otherwise the file's strongest axis** | **Born-RED**: all ten baselines re-execute byte-exactly at `81a56990`; no gate is green-by-authoring; no witness inherited; the disqualified ref read only where the schism is the subject and declared at each use ✔. **Reachable GREEN**: G-0.7's roster-not-strike re-cut is genuinely satisfiable by writing `docs/**` only ✔; G-0.4's static tier is three addressable file:line assertions and the D-6 scope word landed (the coordinate is *"the settled worktree, dated, with `git rev-parse HEAD` pasted"*) ✔; G-0.6's *"one motion"* is reachable ✔. **No unpassable oracle.** **Falsifier integrity — RED**: G-0.1's falsifier convicts on a denominator that is **arithmetic over non-nested sets and 3× understated** (D-2). **LAW A**: Census 2 is exemplary — derived from the graph, reproducing at one consumer; Census 1's specifier and alias arms reproduce exactly and its export roster is byte-exact, but its symbol arm is short under its own completeness sentence (D-5). **LAW B**: three of the four declared conversions hold (§Carry preamble, C-1.G closing note, G-0.7's roster clauses all cite `PASS-3/KF-W0-CHECK.md` **with its defects**) ✔ — and the fourth region **re-commits the ban**: C-17.R row 13's *"There is no fourth or fifth S-10 claimant in the corpus"*, and Census 1's *"every hit outside P resolved"*, are self-voiced closure claims over enumerable sets, both false by bytes (D-3, D-5). |
| **(5) POSTURE** | **MIXED — four legs hold, one fails** | **W4 head** ✔ — §Sequencing declares KF.W4 *"may not open before this re-anchor"*, *"G-0.7's roster is KF.W4's precondition"*, packets *"sequence after KF.W4's vue-tsc gate"*; KF-W4's own head is the vue-tsc gate, so the order is right way round, and the `npm run check` re-cut composes (W4 replaces only the bare `tsc --noEmit` arm of the live `:37`, preserving the test-project arm and `proof:structure`). **W3 gated-unscheduled** ✔ — *"KF.W3 is GATED on PLAW-BIND → V.L1/V.L5 → packed Value release"*, with the three value.js-side carries named so no KF wave books them. **KF-AV-28 at all governed sites** ✔ — **cured this round**, both packets, verbatim, both ends agreeing. **O-21 (not O-20)** ✔ *vacuously and correctly* — the wave names **no mint site**, so it cannot carry a spent id; `grep -o -E 'O-[0-9]+'` returns only `KF-CO-*` fragments plus the real O-8/O-11 obligation packets. **The W10-seam five-edge table** ✘ **— now four of five.** (1) §B-12 is W0's act — carried ✔. (2) the manifest-schism re-baseline law — carried as C-2 ✔. (3) X-1's v8 binding on W10's scope stamp — carried at C-18/G-0.8 ✔. (4) **the C-17-mint consumption edge — CLOSED AT BOTH ENDS this round** ✔, and verified from W10's side: `KF-W10.md:412` (§6.A ordering 3) and `:423` (§6.B lock 1) and `:435` (the carried-lock table naming *"KF-W0 §Sequencing, the `KF.W10 · Fold Discharge & Close` OUTBOUND row"*) all say what W0 says they say, with the stale `:363`/`:374` parentheticals **declared non-load-bearing** per R2-7 — R2-7-compliant, not a defect; and W10's *"11 of 13"* verb split matches W0's post-round-3 roster (8 minted + 1 dead + 1 refused + 3 S-10 = 11 minted / 2 enumerated) exactly. (5) **the EH-1 two-repo-letter rider — CURED** ✔, both letters repo-qualified at C-14 **and** G-0.10 **and** the §Sequencing FYI row, with the *"NONEXISTENT path"* sentence struck loudly per E-3. **What fails is not an edge in that table but the roster the table's hardest edge consumes**: W10's `CARRY-C-3` terminalizes *"one terminal verb PER CLAIMANT"* against C-17.R, and C-17.R is short by `KF-ET-27` (D-3) — so the seam is closed and the cargo is short. |

---

## §4 — WHAT REPAIR ROUND 3 ACTUALLY FIXED (verified at this seat, not taken on the spec's word)

Every one of the round-3 directives was re-executed. **All seven landed, and six landed cleanly.**

- **R3-10.1 / D-4 (the C-17-mint seam)** — **CLOSED at both ends**, and W10's end independently confirms it at `:412`/`:423`/`:435`. The C-22 precedent is now swept to the sibling declaring the hardest dependency. **Closed.**
- **R3-11(f) D-1 (the two repo-qualified letters)** — the *"NONEXISTENT path"* sentence is **struck loudly** at C-14 with the strike declared, and **both** letters ride at C-14, G-0.10's GREEN and the §Sequencing FYI row. Both files verified present, one per tree. This was pass 3's must-not-survive defect. **Closed.**
- **R3-11(f) D-2 (C-17.R)** — `KAD-12` **adopted** ✔ (10 hits) · the `/number-field` claim **re-keyed** to `LP-8 ≡ KF-CO-35` with the four provenance legs retained beneath the head id ✔ · the coined **`F1(c)` retired** with the `grep -rn` → 0-hits receipt and the strike declared at every altitude ✔ · row 13 **named and struck as a duplicate of `KF-KE-21`, kept in the table as an enumerated strike** ✔. Four of four cured — **but the re-derivation that produced the fix is itself defective** (D-3), which is why the table is short again, at a new source.
- **R3-11(f) D-5 + R3-11(a)2/3/4 (the sweep)** — the 200/48 figure is **struck**; both readings pasted **with the discard predicate stated**, and the predicate **reproduces byte-exactly at this seat** including the six dropped-whole records; membership keyed to records, not lines; the two instrument limits declared honestly. **kf-SequenceScene's F-1 family + countable-cell datum** enter C-1.G row 22 ✔ · **the kf-AmigaScene per-file offset** (`useAmigaDemo −2 below :73`) enters G-0.9 as the exemplar ✔ · **the kf-SpringTrace `D-15` guard** enters C-1.R row 5 with the record-qualification receipt ✔. **This is the strongest single repair of the round.** Closed.
- **R3-11(f) D-3 (C-19)** — the headline reads **30 ledger members + 2 anti-firings**; the `grep -o -E 'kf-[A-Za-z.]+' | sort -u | wc -l` → **32** receipt reproduces exactly; the two anti-firings are the two the cell itself declares (`kf-CubeAxisLines`, `kf-AnimatedText`); the partition **16+8+4+2 = 30** sums; G-0.9's sweep is keyed to 30. **Closed.**
- **R3-11(f) E-3 / E-5 / D-6** — the KF-AV-28 rider travels for **both** packets with both limbs, verbatim against the bank ✔ · C-17.R row 4 carries *"owned by KF.W6"* with the banked owner terms ✔ · G-0.4's two negative probes carry their scope word, and the choice of *"the settled worktree, dated"* over a ref is argued rather than asserted ✔. **Closed** — modulo the stale `:447` bookkeeping (D-4).
- **LAW A** — introduced, inventoried honestly (*"exactly two acts, both carried rather than performed"*), with a declared-negative sweep over the remaining bounds rows. Census 2 is exemplary. Census 1 is 90 % exemplary (D-5).
- **LAW B** — three of four conversions hold and are genuinely non-trivial: the §Carry preamble now names the artifact **and its ten escapes**, which is the honest form. The regression is that two *new* sentences re-commit the ban (D-3, D-5).

**The file is materially stronger than its pass-3 state.** Its measurement layer is excellent — every one of the ten gates' RED baselines re-executes byte-exactly, no figure is carried by arithmetic **inside §Carry**, and the round-3 receipts reproduce where round-2's did not. Its remaining defects are, once again, **not the ones it was repaired for**: they are the surfaces the repairs exposed.

---

## §5 — VERDICT

**DEFECTIVE.**

Three MAJOR defects and three MINOR, over seven census escapes.

The pattern is now four rounds old and worth naming plainly: **this wave measures better than any file in the program and enumerates worse.** Every command reproduces; every anchor resolves; every gate is born RED for its intended reason and green by a reachable route. And in the same file, the id 60 % of the corpus routes its re-anchor obligation on reaches no table (**D-1**); a gate falsifier subtracts two sets that do not nest and understates its own exposure threefold (**D-2**); and the mint roster's freshly-written re-derivation receipt asserts a completeness its own command refutes, inside the row that cites LAW B as its authority (**D-3**). Each is small, checkable, and fatal to a closure sweep — which is exactly the shape of the three that preceded them.

**D-1 is the one that must not survive another round.** `D-19` is not an obscure id; it is the most-cited routing id in the corpus, it is overloaded (so it needs the record-qualification the wave just wrote for `S-10`), it governs the obligation this wave exists to discharge, and two of the three records this file never names reach the wave only through it.

**Ordered for repair**: **D-1** (index `D-19` — a C-1.R carry-not-cure guard with the 35-record receipt and the overload declared; key G-0.9's stamp to it) · **D-2** (G-0.1's falsifier and the L-18 rider carry the measured **225** with `comm -13` pasted, and the non-nesting stated) · **D-3** (paste the 37/15 reading with the substring-overload discard rule; adopt `KF-ET-27` as the fourth S-10 claimant with `KF-ES-20` as its second leg; retire the *"no fourth or fifth"* sentence for the LAW B form) · **D-4** (the round-3 landing cells re-anchored on §-headings; `:447` → §Sequencing) · **D-5** (the two symbol hits resolved; the flat-sibling count and the docs-prose clause corrected) · **D-6** (`KF-EST-1` named as the third R-8 residue family, its eight sites listed, `TypingDots.vue`'s three entered in the roster).

*Register written 2026-08-28. Substrate `81a56990`, read-only. Census derived by record from the 58 adjudicated bytes. Nothing inherited.*
