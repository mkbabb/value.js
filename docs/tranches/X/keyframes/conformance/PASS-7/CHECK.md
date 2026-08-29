# X·KF PASS-7 — FRESH ADVERSARIAL WHOLE-CORPUS CHECK (L-18/L-20, pass 7)

**Path**: `docs/tranches/X/keyframes/conformance/PASS-7/CHECK.md`. **Seat**: ONE fresh hostile seat, whole program, 2026-08-29. **Mandate**: VERIFY-ONLY. **Sole write = this file.** No spec, no prior-pass artifact, no work order, no certificate and no registry record was edited. No product source was opened for writing.

**Substrate**: the eleven specs at `docs/tranches/X/keyframes/waves/`; corpus authority = the 58 `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/`; sole carry = `carry/KF-W6-CARRY.md`; frontier = keyframes.js `origin/master` `81a56990` (read-only, re-resolved at this seat).

**VERDICT: NON-CONFORMANT.** One BLOCKER stands unrepaired from the seal's own return (**P7-1**), one **new HIGH** this pass found and the seal did not (**P7-2**), four MAJORs. The census is **CLEAN — 0 escapes**. Hashes are **CLEAN — 11 of 11**. The receipt layer is the strongest surface in the program and reproduced without a single exception.

---

## §0 — FIRST ACT: THE HASH DIFF

Re-hashed at this seat, `shasum -a 256`, run from `waves/`, diffed against `PASS-6/CLOSE-CERT-3.md` §HASH:

```
79f2388886cbab1a1ae7af753767890caf89f40f1392e53cd3f26280d9fa9ad7  KF-W0.md
ee33bf25cb2a77daba206ae2a16e05cb78ada702dd40cebb211300a822b97aa7  KF-W1.md
c3ae7794fa1542cd854078f7d15d332e74c45a659dfffd82fe472b1c2962e296  KF-W10.md
902f12924a681f042cfa7123890faf766761595df639c6f2f8e1d6dedb392d2c  KF-W2.md
c2d648ad05850c113b13a2ffffe1ecf37c8ed6593ba13c753b38c9df43e8db00  KF-W3.md
bd8bc495e07810a04d7bde26c233718b61101a418c6e6670d61912b8bca63521  KF-W4.md
61b9183ff1765806c79df0d9a11423177898a6cb307e410a87ae1076dcea296c  KF-W5.md
6019f5bf907bdb947e54f092eaed864e958d819221719f9f0cf127b1a45effdc  KF-W6.md
c9fb9a565097bb071e54734a6b911c4d14b2fa2c6de5255a9130af50b148f52a  KF-W7.md
706f37cfdf095897df1f205e815bb67d1a4b8f624e24c415bcc59a16e33cc8fe  KF-W8.md
917da19189dc62f32b3afb1826000065aa84a1e973caaea02b0e1131bce6d618  KF-W9.md
```

**ELEVEN OF ELEVEN IDENTICAL. Zero mismatches. Nothing convicts on hash.** Byte sizes and mtimes also match §HASH's substrate stamp exactly (`KF-W0` 257,985 B 16:49 … `KF-W8` 264,219 B 17:07). **The specs have not moved since the seal.**

---

## §1 — AXIS 1 · ID-KEYED CENSUS BY RECORD OVER ALL 58 — **CLEAN, 0 ESCAPES**

**Method (this seat's own, seventh independent enumeration).** All 58 records parsed mechanically for roster rows in **both** shapes the corpus uses — leading table cell (`| **ID** |`) and leading bullet bold (`- **ID** ·`). **2,632 candidate rows** extracted; **all 58 records yielded rows** (zero records unparsed — the failure mode that cost PASS-3 38 pairs at 8 records). Of these, **758 carry an explicit `KF.W<n>` routing token on the row** and **1,011 carry `NO-WAVE-OWNER`**.

Each routed row was tested by record-qualified token match against its routed wave's final bytes.

| result | count |
|---|--:|
| booked at the routed wave, by id, directly | **730** |
| booked only at a different wave or the carry (candidate mis-route) | 14 |
| absent from all eleven specs **and** the carry (candidate escape) | 14 |
| **adjudicated at the bytes → LAWFUL** | **28 of 28** |
| **HARD ESCAPES** | **0** |

**The 28 residual candidates, adjudicated individually.** The spec's four lawful discharge mechanisms (KF-W9 §Carry preamble: (a) §Carry bullet by id · (b) named fold-identity · (c) §Excluded row with a named receiving owner · (d) residue line-item inside §H's SS-13 aggregate **with record attribution enforced**) resolve every one:

- **KF-APP-2 · -3 · -7 · -8 · -11 · -20 · -22 · -30** ⟨kf-App⟩ — eight rows whose *primary* disposition is `NO-WAVE-OWNER` with a **witness limb** `→ KF.W9 SS-13`. **Route (d)**: all eight are named, by id, in that record's own `## UNPROVEN-NEEDS-LIVE residue — SS-13 inputs, routed whole to KF.W9` list at `kf-App.md:146-165` (items 2, 3, 6, 7, 8, 10, 12, 13). Record attribution satisfied. **DISCHARGED.**
- **LP-21** ⟨kf-LayerConfigPanel⟩ — the row's `KF.W4` token is the phrase *"trivial under the KF.W4 gate"*, an enabling condition, not a routing; its terminal disposition is **OPTIONS-UNIT**, enumerated at that record's routing summary `:130` under *"OPTIONS-UNIT (NO-WAVE-OWNER, SS-1/SS-2 intake)"*. **DISCHARGED.**
- **KF-KE-17** ⟨kf-KeyframesEditor⟩ — `→ **KFED-UNIT** … sequenced after KF.W4 makes it checkable`. Sequencing token, not a routing. **DISCHARGED.**
- **KF-AX-16** ⟨kf-CubeAxisLines⟩ — `AXISLINE-UNIT after KF.W4`. Same shape. **DISCHARGED.**
- **KC-2** ⟨kf-KeyframeCardList⟩ — `→ **CARD-UNIT**; the type witness attaches to **KF.W4**`. **Route (b)**: the type witness is booked at `KF-W4.md` as **KC-37** (`grep -oE 'KC-[0-9]+' KF-W4.md` → KC-1 KC-3 KC-8 KC-9 **KC-13** KC-17 KC-34 KC-35 **KC-37**), which the record names as the falsifier converting KC-2 into a one-command type-gate catch. **DISCHARGED.**
- **SPF-1** ⟨kf-SpringPhysicsFacet⟩ — `**FOLD ≡ KF-CO-2**`; KF-CO-2 resolves at `KF-W2.md` and `KF-W6.md`. Route (b). **DISCHARGED.**
- **K-28** ⟨kf-SequencePlayhead⟩ — a **killed-claims register** id (`| **K-28** | … | **BOOKING KILLS (rulings 4-5)** |`), not a routed defect row. Kills do not book. **NOT A ROUTED ROW.**
- **D-2-RESCOPED · REGISTER-LAUNDER** — extractor truncation artefacts of this seat's own regex; both resolve (`D-2-RESCOPED` at `KF-W9.md` ×1 — the `C-27` landing; `REGISTER-LAUNDER` at W4/W6/W7 + the carry). **NOT ESCAPES.**
- **RR-D · L-17 · N-1 · N-3 · SUP-4 · D-minor · B-1 · L-8 · S-5 · MISS-6** — the ten bare-token candidates, all from the **five records that use the superseded `lane-frontend.md §10` seven-wave numbering** (kf-ChannelControls, kf-KfPillTabs, kf-AnimationControlsGroup, kf-DemoGlobalChrome, kf-ControlsPaneWrapper — identifiable by their wave sets carrying no W0/W9/W10). Their `KF.W1`/`KF.W2` tokens are re-homed whole by the **TAXONOMY RECONCILIATION** binding at `KF-W6-CARRY.md` head (*"KF.W2-TABS ⇒ THIS WAVE … KF.W3-SHIM ⇒ THIS WAVE … KF.W5-PARTIALS ⇒ THIS WAVE … KF.W7-TOKENS ⇒ THIS WAVE"*), and every one resolves at KF.W6 or the carry. Additionally the **STANDING ID RULE** (KF-W9 §Carry preamble) forbids treating a bare token as a key. **DISCHARGED.**

**Record-attribution sweep, independent of the row sweep.** Every one of the 58 record slugs is cited by name in at least one spec — minimum `kf-TransportDock` at 10 citations, maximum `kf-ChannelControls` at 84, median ≈36. **Zero uncited records.**

**AXIS 1 VERDICT: CLEAN. censusEscapes = 0.** This is the seventh independent enumeration of this corpus (167 · 147 · 139 · 168 · 181 · pass-6 · this), run at a granularity larger again (2,632 candidates), and per LAW B it is reported as **this seat's dated measurement**, never as a closure of the class.

---

## §2 — AXIS 2 · THE PASS-6 REGISTER, INDIVIDUALLY CLOSED AT THE BYTES

`WORK-ORDER.md` re-parsed at this seat by heading enumeration, independent of the seal:

```
130 distinct edit ids
C 34 · W6 17 · T7 15 · T2 13 · T4 12 · T5 11 · T8 10 · TR 8 · T0 6 · T3 4
TR ids present: TR-01 TR-02 TR-03 TR-04 TR-05 TR-06 TR-07 TR-08
```

**Exactly the seal's §1 arithmetic, re-derived, not inherited.** 17 + 34 + (6+13+4+12+11+15+10+8 = 79) = **130**. 122 landed + 8 TR = 130. 114 spec-targeted + 8 cert-targeted = 122. **Internally consistent at every seam.**

### The six top-tier repairs — CLOSED

| item | probe re-run at this seat | result |
|---|---|--:|
| `W6-08` LAW F(1) self-verifying law | `grep -noE 'SHADOW \(LAW F\(1\)' KF-W6.md \| wc -l` | **6** ✓ (the law names its own pattern and passes it 6-of-6) |
| `W6-08` its stated cardinality | `grep -c 'SIX acts carry a LAW F(1) verb in this file'` | **1** ✓ |
| `W6-17` / `T8-02` the R5-6(3) reciprocal | W6 end **1**; W8 end old clause **0**, new clause **2** | ✓ two-ended and agreeing |
| `C-28` the `EH-*` NO-WAVE-OWNER six | `grep -oE 'EH-[0-9]+' KF-W10.md \| sort -u \| wc -l` | **14** ✓ |
| `C-33` the ten-row substrate strike | three clauses, each **1** | ✓ |
| `C-19`/`C-20` the col-B deletion | `col B DELETED…` **1**; the struck sibling-write clause **0** | ✓ |

### The two hard escapes — DEAD, re-measured

- **Hard escape 1** (`OP-4` locus, `W0 D-1`): `OP-4` **5** · `B-16` **3** · `locus` **3** · `parseAnimationCSS` **3**, against a pre-repair state of 0·0·0·1. **The commissioned act has a surface at the wave named as its actor.** CLOSED.
- **Hard escape 2** (the six `EH-*`): all six ordered ids resolve individually (`EH-2` `EH-3` `EH-12` `EH-13` `EH-14` `EH-15`, each ×1) on the row `ROW 10 OF MECHANISM D` (present ×1); the corrected partition `1 + 3 + 2 + 6 + 4 = 16` is present ×1 and the work order's erroneous `3 + 2 + 6 + 4 = 16` is present only as the dated correction note. **CLOSED, and the executing seat's in-flight arithmetic catch is confirmed genuine — this remains the round's best single act.**

### The numeral tail — CLOSED except where §5 books it

Every `T0`/`T2`/`T3`/`T4`/`T5`/`T7`/`T8` probe below reproduced. **The `TR` tail is the exception and is `P7-1`.**

---

## §3 — AXIS 3 · RECEIPT / NUMERAL REALITY — **40+ RECEIPTS RE-RUN, ZERO EXCEPTIONS**

Every receipt in `CLOSE-CERT-3.md` §3 was re-executed at this seat against final bytes, plus the cross-repo frontier legs the seal declared out of scope. **Not one figure differed.** The eight `↓0` negative probes all returned 0; a strike that returns a hit is the failure mode this class exists to catch and none did.

```
W6-01 MISS-7 → 2          W6-02 ↓0 → 0         W6-08 → 6 / 1        W6-17 → 1
C-12 → 1                  C-19 → 1             C-20 ↓0 → 0          C-27 → 1 / 1
C-28 → 14                 C-33 → 1 / 1 / 1
T0-01 OP-4 → 5            T0-02 B-16 → 3       T0-03 → 3            T0 locus → 3
T2-05 → 3 / 1             T2-12 → 3            T3-01 PASS-6 → 4
T4-01 → 4 / 1             T4-02 ↓0 → 0         T4-02b → 1/1/1/9/2/7  T4-03 → 1
T4-04 → 1                 T4-05 ↓0 → 0         T4-05b → 1
T5-02 → 1                 T5-03 ↓0 → 0         T5-06 → 1            T5-08 ↓0 → 0 / 1
T7-04 :782 → 2            T7-06 ↓0 → 0 / 1     T7-08 → 3 / 1        T7-11 → 1
T7-12 ↓0 → 0              T7-14 → 2            T7-15 → 1
T8-01 → 2                 T8-02 ↓0 → 0 / 2     T8-05 → 1            T8-06 → 1
T8-09 → 1                 T8-09b :25-28 → 7    T8-10 → 1
```

**Cross-repo frontier legs (KF-W1's surface — the most falsifiable in the corpus; the seal did not touch these).** Re-run at `keyframes-v-exec`:

```
HEAD                        → 81a56990736ced5b5edde0b84c527680ac7689b1   ✓ (= kf origin/master)
git status --porcelain | wc -l → 0                                        ✓
value.js import split        → /css 29 · /value 16 · /color 7 · /math 5 · /easing 3 · /transform 2 = 62  ✓ EXACT
resolve/browser.ts           → :3 import · :162 parseCssScalar            ✓
package.json                 → :70 "@mkbabb/value.js": "4.0.0" · :77 "@mkbabb/glass-ui": "7.0.0"  ✓
INBOUND-LEDGER.md rows       → IN-ATLAS-1..5 · IN-GLASS-1..2 · IN-VALUE-1..2 = 9  ✓
coordination/ listing        → 9 entries + vnext/                          ✓
three ABSENT packet anchors  → value-ast.ts · easing-registry.ts · backward.ts all ABSENT  ✓
kf origin/master FOLD-FORWARD.md:34 → "Glass §4 dock contract (PEEK is NOT native; …)"  ✓ byte-exact
```

**Every cross-repo receipt reproduced exactly.** The `keyframes-v-exec` clone exists and is at the declared frontier with a clean tree.

**Doc-path resolvability sweep (novel this pass).** All 104 distinct `docs/…md` paths cited in backticks across the eleven specs were tested for existence in the correct tree. **83 resolve.** Of the 21 that do not: 13 resolve in the **keyframes.js** tree (the subject repo — lawful cross-repo citations, spot-verified above), 4 are forward-declared **creates** the waves own (`FINAL-KF.md`, `KF-W6-BH-COMMUNIQUE.md`, `KF-W8-CLOSE.md`, `registries/POSTURES.md` — the last carried as an explicit `create` row at `KF-W2.md:129`), 1 is a deliberate **negative probe** (`parse-that/RELEASE-CONDITION.md` → *"No such file"*, asserted and true), 2 are **struck historical spellings** (`X/kf/waves/KF.W5.md`, explicitly STRUCK in place), and 1 is a glob **notation** (`X/waves/W0..W11.md`). **No unlawful dangling doc path.** The one genuine dangling-instrument class is `RULINGS-6` / `§9`, booked at `P7-1` / `P7-3`.

**AXIS 3 VERDICT: the strongest surface in the program.** No false universal was found in the receipt layer. The one false universal found in current voice anywhere is `P7-2`, and it is in the *posture* layer, not the receipt layer.

---

## §4 — AXIS 4 · GATES, LAW-A CENSUSES, PORTABLE COMMANDS, LAWFUL SURFACES

**Gates.** Distinct gate ids per spec (any `G-` family; W0 uses the `G-N.M` form): W1 17 · W2 12 · W3 11 · W4 17 · W5 6 · W6 20 · W7 3 · W8 3 · W9 18 · W10 6. `born-RED` is asserted in all eleven (W0 5 · W1 21 · W2 8 · W3 7 · W4 23 · W5 10 · W6 11 · W7 6 · W8 6 · W9 15 · W10 7), each with a reachable-GREEN condition stated beside it. Spot-read of `G-KFW4-1` (the sequencing head) and `G-KFW9-4` (SS-13 residue, 0 of ≈590 — RED) confirms both are born-RED with a named live witness (L-19). **No gate found green-at-birth.**

**LAW-A censuses.** Present and section-scoped in W0 10 · W1 8 · W2 13 · W5 5 · W6 25 · W7 2 · W8 2 · W9 13 · W10 2. KF-W9's §Carry recount is re-derived at every repair round rather than incremented, and says so in its own voice (*"the count is re-derived, never arithmetic on the previous count"*) — the correct construction.

**Portable commands.** Four commands across the eleven carry absolute `/Users/mkbabb/…` paths. Three are **cross-repo by necessity** (a three-tree `grep -rn '4\.0\.1'`, a `git -C …/keyframes.js rev-parse`, an `ls …/keyframes-v-exec/…/coordination/`) and one is a `find` over the value.js root. All four execute correctly at this seat. **MINOR portability note only — booked at `P7-8`.**

**Lawful surfaces.** No product source was opened for writing by this seat. The specs' `§Bounds` rows are documentation-and-test surfaces plus declared creates; `KF-W1`'s single sibling-tree write is a coordination-mail file in the `<SENDER>-INBOUND-*` grammar, which is what a mail path is for. `KF-W3` is `GATED, never scheduled` and writes nothing.

---

## §5 — AXIS 5 · POSTURE

| item | measured at this seat | verdict |
|---|---|---|
| **W4 head** | `KF-W4.md:1` *"X.KF.W4 - K-Quartet Hygiene and the Gate Chassis"*; `sequencing head` ×3; `G-KFW4-1` named *"the sequencing head"* | **HOLDS** |
| **W3 gated** | `KF-W3.md:1` *"# KF.W3 — Parser Consumption (GATED, never scheduled)"*; `never scheduled` ×3; `GATED` ×4 | **HOLDS** |
| **status planned** | all eleven declare it (W0 *"Status is unchanged: `planned`"* · W6 *"Status stays `planned`; no gate ran; no product source was opened"* · W9 *"status fields stay `planned`"*) | **HOLDS** |
| **zero VERIFIED stamps** | no wave stamps VERIFIED at its own close; the four-verb blocks read SPECIFIED=YES / IMPLEMENTED=NO / VERIFIED=NO. The three `**VERIFIED**` cells at `KF-W8.md:23-25` are *quotation*-verification cells inside a blockquote whose date column is itself struck as a live claim; `KF-W10.md:334`'s `IMPLEMENTED → VERIFIED` is a described **future** act at close, and the spec proves it is the only such line by command | **HOLDS** |
| **O-21** | W1 13 · W10 7 · W2 6 · W4 2 · W9 2 | **HOLDS** |
| **§6.D + COHESION §0d** | §6.D in all eleven (4–21 each); COHESION in W0/W1/W2/W3/W4/W5/W10 | **HOLDS** |
| **KF-AV-28** | present in ten of eleven (4–14 each). **Absent from KF-W5 — adjudicated LAWFUL**: KF-AV-28 is the standing supersession rider over the **transport/ribbon** and **drag-seam** demo packets; KF-W5 is the *library* half (keyframes.js `src/**`) and owns neither (`transport` 4 hits, all incidental; `ribbon`/`drag-seam`/`TransportDock`/`PlaybackRibbon` all **0**) | **HOLDS** |
| **E-3 — dated evidence never rewritten** | PASS-1 (12:04–12:35 Aug 28) · PASS-2 (13:23–13:55) · PASS-3 (14:36–15:26) · PASS-4 (16:05–17:37) all untouched by the Aug-29 round. PASS-5's checks are Aug 28 17:49–18:38; only `PASS-5/CLOSE-CERT-2.md` carries Aug 29 15:24 — its own round's late seal, written *before* the PASS-6 checks (15:38) and work order (16:46), not a retro-edit of dated evidence | **HOLDS** |
| **no product source opened** | declared in every spec; no contrary evidence | **HOLDS** |

**AXIS 5 VERDICT: posture is clean at all nine items.**

---

## §6 — THE DEFECT REGISTER

### **P7-1 · BLOCKER — `PASS-6/RULINGS-6.md` does not exist; 8 of 130 edits never landed; LAW G is cited 12 times in current voice with no instrument anywhere**

**Independently confirmed at this seat, not inherited from the seal.**

```
find docs -name 'RULINGS-6*'                      → (nothing)
ls conformance/PASS-6/                            → 11 KF-W*-CHECK.md · UNION.md · WORK-ORDER.md
                                                     · CLOSE-CERT-6.md · CLOSE-CERT-3.md   — no RULINGS-6.md
grep -c 'RULINGS-6' waves/KF-W*.md                → 0 in ALL ELEVEN
grep -c 'LAW G'     waves/KF-W*.md                → W2 1 · W4 1 · W5 2 · W6 2 · W7 2 · W8 1 · W9 2 · W10 1  = 12
grep -rl 'LAW G (the false-universal ban)' docs/tranches/X/
                                                  → WORK-ORDER.md and CLOSE-CERT-3.md ONLY
```

`TR-01`…`TR-08` are the round's eight **standing instruments** — `TR-04` lands LAW G's verbatim text; `TR-01`/`TR-02`/`TR-03` land the U6-C, U6-D and U6-E instruments on which the round's three largest class cures rest; `TR-05` the R5-6(3) commissioning; `TR-06` the R5-12(2) sweep; `TR-07` the LAW E(5) actor re-cut closing hard escape 1's mechanism; `TR-08` LAW F(1)/(2)'s enforcement clause. **All eight are unwritten.** Twelve landed strikes across eight specs cite a law that exists in no instrument of record, and not one of them even names the missing file — they cite *"LAW G"* bare, so the dangle is invisible to a reader.

**The per-spec repairs are correct; they are unbacked.** This is a BLOCKER because the round's entire generalisation layer — the thing that distinguishes a class cure from twelve coincidences — has no substrate.

**Mitigation available**: none at the specs. Either `RULINGS-6.md` is written (the eight `TR` edits are fully specified in `WORK-ORDER.md` and can be executed as contracted), or the twelve citations are re-pointed at an instrument that exists. This is the check's ruling and the loop cannot close before it.

---

### **P7-2 · HIGH (NEW — the seal did not find this) — `KF-W9.md:258-282`: the block headed "VERIFIED, NOT DELEGATED" delegates three times in current voice, and one delegate is falsified at the bytes**

The block at `KF-W9.md:258-282` exists to demonstrate LAW E(4). Its header asserts, in current voice and in bold:

> **VERIFIED, NOT DELEGATED — the six by command (RULINGS-5 R5-8(a); PASS-5 check D5-2).**

Three delegations follow it inside the same block:

1. **`:258`** — *"…because KF.W10 writes last and **CLOSE-CERT-5 re-verifies under LAW E(5)(ii)**."*
2. **`:282`** — *"LAW E(4) makes the anchor the receipt and the offset a dated reading. **CLOSE-CERT-5 re-verifies.**"*
3. **`:269-271`** (landed **at round 6**) — *"…and the verifier of record for their final-bytes offsets is **`PASS-6/CLOSE-CERT-6.md` §ERRATA E-2**, which re-derives them."*

**Delegates 1 and 2 are chronologically impossible.** `CLOSE-CERT-5` is the round-**5** certificate (`PASS-5/CLOSE-CERT-2.md`, which self-names `CLOSE-CERT-5` at its line 1), mtime **2026-08-29 15:24:27**. `KF-W10.md`'s final write is **17:00:22** the same day. A certificate that closed 1h36m before the file it is said to re-verify stopped moving cannot re-verify it. This is exactly the class `R5-8(a)` struck one round earlier — *"the delegation becomes a verification"* — re-introduced at the block that ruling repaired.

**Delegate 3 points at figures that are false.** E-2 certifies col C *"is correct and **reproduces exactly at final bytes** (`:22 :68 :513 :547 :206 :197`)"*. Re-run at this seat against `KF-W10.md`'s final bytes:

| anchor | E-2 "final bytes" | measured here | Δ |
|---|--:|--:|--:|
| A1 `X.KF.W9` | `:22` | `:22` | 0 |
| A2 `OP-4` | `:68` | `:68` (of 5: 68 232 530 537 541) | 0 |
| A3 `PACKET-FIRST` | `:513` | **`:519`** | **+6** |
| A4 `D. → KF.W9 (Safari Visual Audit)` | `:547` | **`:553`** | **+6** |
| A5 `surface verify` | `:206` | **`:212`** | **+6** |
| A6 `CH2-02` | `:197` | **`:203`** | **+6** |

**Four of six wrong.** So the spec, in current voice, nominates as its *"verifier of record"* a section whose central certification — the word **"exactly"** — is false at the exact property it certifies.

**Why this is HIGH and not a repeat of the seal's S-5.** The seal found E-2 stale and stopped there, writing *"the anchors are intact and E-2's argument survives untouched."* That is true **of E-2 in isolation**. What the seal did not trace is that a **landed round-6 edit inside the wave spec delegates verification authority to it** — so the staleness is not confined to a certificate erratum, it is load-bearing inside the spec, in the block whose own header forbids delegation. Three live delegations under a bold "NOT DELEGATED" universal is **LAW G's exact shape** (a false universal in current voice) committed at the instrument LAW E exists to make unfalsifiable — and LAW G is the one law with no instrument (`P7-1`), so nothing in the corpus can convict it.

**Mitigation available**: strike the two `CLOSE-CERT-5 re-verifies` clauses (a round-5 instrument cannot certify round-6 bytes at all), and either re-point `:269-271` at a verifier whose figures reproduce or replace the delegation with the six commands' whole output inline — which is what the block's own closing rule already demands (*"If a numeral must ever ride, it is printed as its command's WHOLE output"*). The six anchors themselves are sound: **6 of 6 resolve and every quoted passage is byte-exact**, so no substance moves.

---

### **P7-3 · MAJOR — `CLOSE-CERT-6.md` has no `§9`; 34 landed citations point at it**

`grep -n '^#' PASS-6/CLOSE-CERT-6.md` → **exactly two headings**: the title and `## §ERRATA`. Its own head defers §9 to *"the RECONCILE seat's act at round-6 close"*, which never ran.

Measured at final bytes, occurrences of the literal ``CLOSE-CERT-6.md` §9``:

```
TOTAL 34  —  KF-W8 27 · KF-W2 4 · KF-W10 2 · KF-W5 1 · KF-W9 0
(36 bare CLOSE-CERT-6 mentions in all: the same five files, KF-W9 contributing 2 non-§9)
```

These are the **stamp authority the entire U6-C cure re-points to** — `C-33` (KF-W10's ten-row substrate table), `T8-04` (KF-W8's twenty per-seat stamps), `T7-03`, `T5-03`, `T2-12`, `C-34`. Every one of those edits landed; every one now cites a section that does not exist. The round's LAW E(4) retirement rests on a dangling pointer.

**Sub-defect (MINOR, inside this finding).** `CLOSE-CERT-3.md` §S-2 prints the per-file list *"KF-W8 27 · KF-W2 4 · KF-W10 2 · KF-W9 2 · KF-W5 1"* directly beneath the `→ 34` command, where it reads as the §9 breakdown; it sums to **36** and is in fact the *bare-mention* census. The true §9 breakdown has **KF-W9 at 0**, not 2. The parenthetical that follows disambiguates it, so nothing rides — but a census figure mis-seated under the command that did not produce it is the class the round is prosecuting.

**Mitigation available**: add a §9 to `CLOSE-CERT-6.md`, or re-point the 34 citations at `CLOSE-CERT-3.md` §HASH — which is, by this seat's measurement, **the only hash bracket that exists in PASS-6**.

---

### **P7-4 · MAJOR — two round-6 certificates under two bare names, in the round whose own erratum bans exactly that — and the repair made the class strictly worse**

`PASS-6/CLOSE-CERT-6.md` (16,060 B, 16:55:39) and `PASS-6/CLOSE-CERT-3.md` (29,505 B, 17:19:53). `CLOSE-CERT-6` §ERRATA **E-11(b)**, read verbatim at this seat:

> *"**(b) One name per certificate**: the round-6 instrument is `PASS-6/CLOSE-CERT-6.md`, bare name `CLOSE-CERT-6`, round-numbered — ending the `CLOSE-CERT-2` / `CLOSE-CERT-5` dual spelling that produced two of this round's census defects (E-4, E-5) by making a single quantity greppable two ways."*

**The sharpening this seat adds.** The dual spelling E-11(b) retired was benign in kind: `CLOSE-CERT-2` and `CLOSE-CERT-5` name **one file**, and that file declares both — `PASS-5/CLOSE-CERT-2.md:1` reads *"# X·KF REPAIR ROUND 5 — CLOSE CERTIFICATE (**CLOSE-CERT-5**)"* and `:3` gives *"**Path of record**: `…/PASS-5/CLOSE-CERT-2.md`"*. Both spellings resolve; the defect was greppability (63 occurrences of `CLOSE-CERT-5` across 7 specs — W5 35 · W9 10 · W1 9 · W0 3 · W7 3 · W3 2 · W8 1 — against 72 of `CLOSE-CERT-2`).

The collision E-11(b) **created** is worse in kind: `CLOSE-CERT-6` and `CLOSE-CERT-3` name **two different files with different contents** — one carries §ERRATA, the other carries the round's verification receipts and its only hash bracket. *"The round-6 certificate"* is now a phrase with two referents pointing at disjoint content. **A rule written to end a dual spelling was violated by the same round that wrote it, at the same instrument class, in the harder direction.**

**Mitigation available**: one of the two is renamed or merged, and E-11(b) is restated to bind the *round*, not the *instrument*. Neither file is redundant, so a merge must preserve both payloads.

---

### **P7-5 · MAJOR — `CLOSE-CERT-6` §ERRATA E-2's "reproduces exactly at final bytes" is false at four of six**

The measurement table is at `P7-2` above; it is filed separately here because it convicts E-2 **as an instrument** independently of the spec that delegates to it. The certificate closed 16:55; `KF-W10.md`'s last write landed 17:00:22; `C-28`/`C-29`/`C-33`/`C-34` inserted six lines above four of the six anchors. E-2's *argument* survives — six of six anchors resolve, all six quoted passages are byte-exact, and *"six of six offsets moved"* is now demonstrable across three clocks instead of two, which strengthens it. **What is false is the word "exactly" applied to a numeral captured before the file it describes stopped moving — the exact class E-2 was written to convict, committed by E-2.**

**Mitigation available**: E-2's parenthetical is re-run at final bytes or dropped; the argument needs no numeral.

---

### **P7-6 · MAJOR — the stale-coordinate class is not a singleton; a mechanical sweep finds ~14 further instances the seal reported at one**

The seal's S-6 books `T5-01`: `KF-W5.md`'s two cured sibling coordinates went stale **again inside the same round**, under a live *"Command, run this seat"* label. Confirmed at this seat:

```
grep -n 'The ten rulings this spec owes' KF-W4.md   → 100   (spec prints :99)
grep -n 'Census S-2'                    KF-W4.md   → 125   (spec prints :124)
```

**New this pass — the class, swept.** This seat extracted **51 cross-spec `grep -n '<pat>' KF-W<n>.md → :N` assertions** from all eleven specs and re-executed every one. After discarding multi-hit and mis-parsed candidates, **~14 clean single-hit assertions are stale**:

| source → target | pattern | printed | measured | Δ |
|---|---|--:|--:|--:|
| W8 → W6 | `THE ACT: ONE ATOMIC COMMIT, three limbs` | 416 | **464** | +48 |
| W8 → W5 | `Structure & Colocation` (4 sites) | 430 | **444** | +14 |
| W8 → W5 | `OP-4 · LOCUS DECLARED` | 339 | **353** | +14 |
| W8 → W5 | `^\| \*\*D-6` | 364 | **378** | +14 |
| W10 → W8 | `TRIGGER, named` | 391 | **411** | +20 |
| W8 → W2 | `ORDERED: KF.W8 precedes` | 59 | **63** | +4 |
| W7 → W2 | `KF.W7 may not decide` | 782 | **786** | +4 |
| W7 → W2 | `Both directions are now declared at both ends` | 825 | **829** | +4 |
| W2 → W6 | `Taxonomy (binding` (2 sites) | 18 / 35 | **38** | +20 / +3 |
| W5 → W4 | the two S-6 coordinates | 99 / 124 | **100 / 125** | +1 |

**Mitigation stated and real.** LAW E(4) already makes *the anchor the receipt and the offset a dated reading*, and **every one of these anchors resolves and every quoted passage is byte-exact** — this seat verified that for all of them. So nothing load-bearing moves. The finding is that the round diagnosed the class (`E-10`, `S-6`), cured one instance, and closed with the class at roughly fifteen — and several of the printed numerals sit under present-tense labels rather than dated ones, which is the half LAW E(4) does not cover. **The correct cure is class-shaped: coordinates in current-voice cells are re-run at close or dropped, and the sweep is a command.**

---

### **P7-7 · MINOR — `CLOSE-CERT-6` §ERRATA E-5's corrected census does not reproduce**

E-5 corrects *"63 sites"* to *"64 occurrences on 37 lines"*. Re-run at this seat at final bytes:

```
grep -oh 'CLOSE-CERT-5' waves/KF-W*.md | wc -l   → 63
sum of grep -c 'CLOSE-CERT-5' per file            → 36
```

**63 on 36, not 64 on 37** — off by one in the same direction as the figure it struck. Same mechanism as `P7-5`: E-5 was written 16:55; `KF-W5.md` closed 17:01, `KF-W7.md` 17:04, `KF-W8.md` 17:07.

**Mitigation**: nothing rides it — both spellings resolve for every reader (see `P7-4`), and E-5 says so itself. Booked because it is a census figure restated *with its counting rule* at the instrument whose whole authority is that its figures reproduce.

---

### **P7-8 · MINOR — four commands carry absolute machine paths**

`ls /Users/mkbabb/Programming/keyframes-v-exec/…`, `grep -rn '4\.0\.1' /Users/…/value.js/… /Users/…/keyframes.js/… /Users/…/keyframes-v-exec/…`, `find /Users/mkbabb/Programming/value.js -name '*parser-totality-exposure*' …`, `git -C /Users/mkbabb/Programming/keyframes.js rev-parse master origin/master`.

**Mitigation**: three of the four are cross-repo and a path is unavoidable; all four execute correctly at this seat and the two clones they name (`keyframes.js`, `keyframes-v-exec`) both exist at the declared refs. The `find` over the value.js root is the only one that could be made relative. **No action required; noted for the portable-commands axis.**

---

### **P7-9 · MINOR — `T8-09` cured one site of a class of eight**

`grep -c ':25-28' KF-W8.md` → **7** at final bytes. The order named the §Bounds row and the seat landed it exactly (`:25-28` → `:25-27`, with the reason stated). The same docblock extent survives at R-1, S-2, the A-5 non-import-context receipt and four further citing cells, three of which call `:25-28` *"docblock prose"* — the exact predicate `D-9` falsified.

**Mitigation**: out of the edit's stated scope and correctly executed against its contract; in scope for the class. Carried forward as a one-command sweep.

---

## §7 — WHAT THIS SEAT AFFIRMS

A hostile pass that reports only faults has not looked either. Recorded:

- **The hashes are clean, 11 of 11**, and the specs have not moved since the seal.
- **The census is clean, 0 escapes**, at the largest granularity yet attempted (2,632 candidate rows, all 58 records parsed, both row shapes). Every one of 28 residual candidates resolves at the bytes by a mechanism the corpus declared in advance.
- **The receipt layer did not produce a single exception in 40+ re-runs**, including all eight `↓0` negative probes and every cross-repo frontier leg — the 62-import split, the ledger's 9 rows, the 3 absent anchors, `FOLD-FORWARD.md:34` — all byte-exact.
- **`C-28` remains the round's best act**: the executing seat caught a live arithmetic error in the work order (`3 + 2 + 6 + 4 = 16` sums to fifteen and drops `EH-1`'s leg), corrected it in flight at both targets, and **stated the correction as a dated note rather than applying it silently**. Verified whole at this seat.
- **`W6-08` is the corpus's best-constructed law**: it names its own verification pattern and passes it 6-of-6.
- **Posture holds at all nine mandated items**, including the one that looked like a miss (`KF-AV-28`'s absence from `KF-W5`, adjudicated lawful on scope).
- **E-3 holds structurally**: four prior passes' dated evidence is untouched.

---

## §8 — VERDICT

**NON-CONFORMANT.**

The bar is *zero BLOCKER/CRITICAL/HIGH, hashes clean, census closed, every remaining defect MINOR-or-below with a stated mitigation.* Three of those four are met: **hashes clean · census closed (0 escapes) · receipts real.** The fourth is not.

**`P7-1` is a standing BLOCKER** — the round's entire standing-instrument layer is unwritten, and the one law it was written to install (LAW G) is cited twelve times in current voice with no instrument anywhere in the tree. The seal found it, declined to seal on it, and it is unrepaired at this seat's bytes.

**`P7-2` is a new HIGH** — a landed round-6 edit inside `KF-W9.md` delegates verification authority to a section whose central certification is false at four of six, inside a block whose own bold header asserts *"VERIFIED, NOT DELEGATED"*, alongside two further delegations to a certificate that closed before the file it is said to verify stopped moving. It is a false universal in current voice at the instrument LAW E exists to make unfalsifiable — and it is unconvictable by the corpus's own machinery precisely because of `P7-1`.

Four MAJORs follow (`P7-3` §9 dangling ×34 · `P7-4` the two-name collision the round's own erratum bans · `P7-5` E-2's false "exactly" · `P7-6` the stale-coordinate class at ~15 and not 1). Three MINORs carry stated mitigations.

**The wave layer's substance is sound and its execution was faithful.** What is not closed is the layer *above* the specs: the instruments that make the round's laws real, the certificate's hash section, and the certificate's own name. Six seats measured; the seventh moved the file; and the round's generalisations were never written down.

*PASS-7 CHECK SEAT. Verification only. This file is the seat's sole write. No spec, no check, no union, no work order, no certificate and no registry record was edited, and no figure above was inherited — every one is the output of a command re-run at this seat.*
