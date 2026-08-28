# KF-W9 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 2)

**Spec under trial** `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W9.md` (285 lines, repaired at round 1)
**Corpus authority** the 58 `kf-*.md` records at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → **58**). The sole in-tree carry is `carry/KF-W6-CARRY.md`; there is no KF.W9 carry ledger — the spec's round-1 strike of that citation is correct.
**Seat posture** FRESH. Every figure below was re-derived this session against the bytes. Pass 1's register and `PASS-1/RULINGS.md` were read to know *what was ordered*, never to inherit *what was found* — and one pass-1 booking is **refuted** below (§3, E-3).
**Method** ID-keyed census. All 58 records machine-scanned for `KF.W9` / bare `W9` (**293 hit lines**); each hit classified as routing-law preamble / section header / closing verdict / **terminal disposition**. Terminal dispositions were reduced to distinct **(record, id)** pairs and reconciled against the spec's §Carry (76 bullets), named fold-identities, §Excluded, and §H's SS-13 aggregate — with **record attribution enforced** (a bare `D-2` matching some other record's `D-2` in the spec is NOT a booking).

**Verdict** **DEFECTIVE** — the round-1 repair is substantially real (all five rulings applied verbatim; 76/76 recount exact; 13 gates with witnesses this seat re-executed true), but **3 routed ids still escape all four booking mechanisms**, and the spec's own headline repair claim — *"no routed id now escapes all four mechanisms"* (`:88`) — is **false at the bytes**.

---

## 0 · Booking law used (identical to the spec's own, at `:88`)

A routed row is **BOOKED** if the spec carries it (a) as a §Carry bullet by id at its own record, (b) as a named fold-identity inside a §Carry bullet, (c) as an §Excluded row with a named receiving owner, or (d) as a residue line-item inside the **record's own** `UNPROVEN-NEEDS-LIVE` list (route into §H's SS-13 aggregate). A routed id discharged by none of the four is an **ESCAPE**.

---

## 1 · Counts (this seat's own)

| quantity | value | receipt |
|---|--:|---|
| records scanned | **58** | `ls kf-*.md \| wc -l` |
| `KF.W9` / `W9` hit lines | **293** | scripted scan, all 58 |
| roster rows whose own disposition cell routes to KF.W9 | **90** | bullet/table-row extraction |
| per-record KF.W9 routing-summary lines | **21** | `grep "\*\*KF\.W9\*\*[:—-]"` |
| **distinct (record, id) pairs routed to KF.W9** | **147** | union of the two above, deduped |
| **BOOKED** (row / fold / exclusion / own-residue) | **144** | |
| **ESCAPED by bytes** | **3** | §3 |
| §Carry bullets the spec claims | 76 | `:87` |
| §Carry bullets the spec **contains** | **76** — A 18 · B 5 · C 1 · D 8 · E 7 · F 11 · G 18 · H 8 | recount by script — **pass-1 D-2 CURED, exact** |
| gates | **13** live (`-1..-9`, `-11..-14`) + 1 struck-with-disposition (`-10`) | 14 bullets, one labelled STRUCK; preamble's "Thirteen" is true |
| gates whose named witness this seat could not locate | **0** | §2 |
| `VERIFIED` tokens | 2, both negative (`VERIFIED \| NO`, `UNVERIFIED`) — **E-3 HOLD** | |

*Denominator note.* The spec inherits PASS-1's **167** roster-level figure and attributes it as such (`:88`, *"The PASS-1 id-keyed census finds 167"*). This seat's independent classification yields **147** distinct record-scoped pairs. The two are not in conflict as bookkeeping (different fold/limb granularity), and the spec's honesty about the provenance is correct; but **147 is this seat's own number and the escapes below are keyed to it, not to 167.**

---

## 2 · Gate witnesses — RE-EXECUTED, not read

Every measurable witness in the file was run this session. **All true.**

| gate / clause | claim | measured this session |
|---|---|---|
| G-KFW9-1 | `safari-real/` 4 tracked vs 31 on disk | `git ls-files … \| wc -l` → **4**; `ls \| wc -l` → **31**; the four names match verbatim (`MATRIX-SAFARI.md`, `ROUTE-MATRIX.json`, `STATE-MATRIX.json`, `picker-safari26.4-light.png`) ✓ |
| G-KFW9-1 | `shots/` 11 on disk / 0 tracked | **11 / 0** ✓ |
| G-KFW9-3 | `152 × 11 × 4 × 11 = 73,568`; split `46,816 + 26,752` | both exact ✓ |
| G-KFW9-4 | 563 enumerated residue line-items | this seat's independent awk/py recount: **565** (see D-11) |
| G-KFW9-5 | `lane-frontend.md:462` verbatim *"13 enforcement sites across 12 files"* | `:462` = `### 6.5 \`prefers-reduced-motion\` — 13 enforcement sites across 12 files` ✓ **verbatim** |
| G-KFW9-8 | `grep -rn forced-colors demo/` → 0 vs 13+ PRM | **0** forced-colors · **18** PRM hits across **16** files ✓ |
| G-KFW9-9 | both copies unlayered, different selectors, same (0,2,0) | `design-idioms.css:76` `.focus-ring:focus-visible` + `:78` `outline: none`; `playback-idiom.css:72` `.btn-playback:focus-visible` ✓ (D-19 repair is substantively right — see D-12 for the offset nit) |
| G-KFW9-14 / OP-5 / §H | **`npm run gh-pages`** exists | `package.json` script keys contain **`gh-pages`**, not `build:gh-pages`; `:43` = `"gh-pages": "vite build --mode gh-pages"` ✓ — **R-11 applied at all 3 binding sites (`:43`, `:190`, `:212`); the 4 residual `build:gh-pages` strings are all inside the correction prose, correctly** |
| G-KFW9-14 | `8281638c` local vs `origin/master 81a56990` | `git rev-parse` both exact ✓ |
| OP-5 | the four byte-offset-dependent records | kf-CSSPasteDialog **#8** · kf-KeyframeTimeline **#13** · kf-TimelineCaret **#12** · kf-TimelineTrack **#11** — all four residue items exist at exactly those ordinals ✓ |
| OP-3 | safaridriver reachable | `/System/Cryptexes/App/usr/bin/safaridriver` exists ✓ |
| §Bounds | harness + evidence paths | `workflows/safari-real-matrix.js`, `audit/visual/capture.mjs`, `states.mjs`, `REPORT.md`, `REPORT.json`, `STATES.json`, `formation/keyframes/CENSUS-2026-08-03.md`, `audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md` — **all 8 exist** ✓ |
| §H negative register | 6 records · 11 probes · 4 traps | enumeration counts exactly: KSM 1 · KSC 4 · KeyframeCard 2 · MbabbMenu 2 · TimelineTrack 1 · SequenceAxis 1 = **11** across **6**; traps ChromeDock · SpringHeatmap · EasingTarget · SquareScene = **4**. **Both dependent cells (§H head and G-KFW9-12) now read the same figures — pass-1 D-10 CURED** ✓ |

**No phantom script survives. L-19 HOLDS.** The spec authors no proof-script and correctly convicts the two it inherits (`proof:sequence-rows-draggable`; the demo gate's named exclusions, KF-AX-26).

---

## 3 · ESCAPES — id for id, named by bytes

Three routed ids are discharged by **none** of the four mechanisms.

### E-1 · `D-2` ⟨kf-AmigaScene⟩ — MAJOR at the bank

* **Routed, twice.** `kf-AmigaScene.md:42` — *"**Disposition: NO-WAVE-OWNER (scene-repair wave, shared-idiom scope); KF.W9's Safari audit witnesses.**"* And `:158`, the record's routing summary — *"**KF.W9**: D-7/C-15/L-m8 … + witnesses for **D-2**/D-4/D-5/D-6/MISSED-A/MISSED-B/MISSED-F …"*.
* **Not route (d).** That record's residue (`:130-141`, 12 items) carries L-B1, D-1, D-6, D-4/D-5, MISSED-B, MISSED-C, C-6/S-9, C-9, C-17, L-i5, D-15, C-15. **No D-2.**
* **Not routes (a)/(b)/(c).** The spec's only kf-AmigaScene carries are `D-7 / C-15 / L-m8` (§A `:92`), `MISSED-F` (§D `:129`), and `D-15 (kf-AmigaScene)` inside KF-CE-13's fold list (§B `:113`). `grep "D-2 ⟨kf-AmigaScene⟩"` → **0**. The bare token `D-2` appears in the spec only as *other records'* ids (`KAD-7/D-2`, `KF-SST-13 · D-4`-neighbourhood, etc.) — a substring collision, not a booking.
* **Why it matters.** D-2 is the bare-`<canvas>` a11y row (no role, name, tabindex, keydown, fallback) — **exactly the AT/announcement class R-1e was written to sweep.** The repair booked the seven ids pass 1 named and did not sweep the class; this one was outside pass 1's list and stayed out.

### E-2 · `MISSED-A` ⟨kf-AmigaScene⟩ — MAJOR at the bank

* **Routed, twice.** `kf-AmigaScene.md:54` — *"CONFIRMED (MAJOR) … **Disposition: NO-WAVE-OWNER (scene-repair wave; SS-13 confirms on-device).**"* And `:158`'s KF.W9 witness list names **MISSED-A** by id.
* **Not route (d).** The residue carries MISSED-**B** (#5) and MISSED-**C** (#6). **No MISSED-A.**
* **Not (a)/(b)/(c).** `grep -c "MISSED-A" KF-W9.md` → **0**.
* **Substance.** On touch there is **no affordance at all** for the scene's primary interaction (`cursor: grab` is the whole discoverability story; the gesture legend was deleted at T.A10) — and, with D-2, *"zero discoverable interaction on a phone-filling canvas."* This is a **mobile-Safari-cell** finding on the wave whose named condition is a real mobile Safari. It is the single most on-thesis escape in the file.

### E-3 · `KF-HA-10` ⟨kf-HeroAurora⟩ — MINOR-band, and **pass 1 booked it wrongly**

* **Routed.** `kf-HeroAurora.md:52` — *"| **KF-HA-10** | L:D-12 | `motion: "drifting"` resolves to a nonzero drift quadruple … a whole-session full-viewport GPU loop under the least-visible layer on the page … | **KF.W6** (owner ruling: is the drift register blessed?), **frame cost → KF.W9** |"*.
* **Not route (d).** That record's residue is the named set **P-1..P-8** (`:103-114`): P-1 (KF-HA-1/-8) · P-2 (KF-HA-2) · P-3 (KF-HA-3) · P-4 (KF-HA-7 fold) · P-5 (KF-HA-9) · P-6 (KF-HA-12) · P-7 (version probe) · P-8 (heap/leak). **KF-HA-10 appears nowhere in it** — `grep -n "KF-HA-10" kf-HeroAurora.md` → **exactly one hit, its own roster row at `:52`**.
* **Not (a)/(b)/(c).** `grep -c "KF-HA-10" KF-W9.md` → **0**.
* **Pass-1 refutation, on the record.** `PASS-1/KF-W9-CHECK.md §4` asserts *"kf-HeroAurora — KF-HA-3 (SS-13 P-3), KF-HA-8 (P-1), **KF-HA-10 (frame cost)** all have residue homes. **BOOKED.**"* KF-HA-3 and KF-HA-8 do (P-3; P-1's parenthetical `KF-HA-1/-8`). **KF-HA-10 does not.** A spot-check that asserts a residue home for an id its record never lists is the same citation-inheritance failure the corpus convicts elsewhere — recorded here so pass 3 does not inherit it either.

**Cluster reading.** All three escapes are *witness/magnitude* rows attached to records whose §Carry presence is otherwise strong. The round-1 repair cured the ten ids pass 1 enumerated **by list**, not the **class**; the class (a routed witness with neither a §Carry line nor a residue ordinal) still has members.

---

## 4 · BOOKED — the 144, audited by mechanism

Spot-checks confirming route (d) is discharging honestly and is not being used as a blanket:

* **kf-App** — KF-APP-1/-2/-3/-5/-6/-7/-8/-11/-14/-16/-20/-22/-30/-33 each carry a numbered residue item (`:147-163`, items 1-15). **BOOKED via §H**; -5/-6/-16/-33/-1 additionally as §G/§F bullets. **DOUBLE-BOOKED, correctly.**
* **kf-CubeTarget** — `:101` routes `#10` + witnesses `#8/#9/#11/#32/#58`; the spec names **all six explicitly** at §A (`:95`) and §E (`:141`). **BOOKED by id.**
* **kf-SpringTarget** — the seven R-1e additions verified at the bank: D-5's *"if eggs are ruled pointer-only by design, the row reduces to the `aria-hidden` half"* (`:54`), D-6 (`:55`), and the cure lock **verbatim** at `:63` — *"**NO-WAVE-OWNER + KF.W9 (one binding, with N-4).**"* and N-4 `:76` — *"**NO-WAVE-OWNER + KF.W9 (with D-14).**"* The spec restates both locks word-for-word. **M-25 satisfied.**
* **kf-ControlsPaneWrapper** — the pass-1 D-8 dangling cite is **genuinely repaired at the bytes**: `:77` **is** `D-m9` (*"zero forced-colors / prefers-contrast / prefers-reduced-transparency handling demo-wide"*) and `:94` **is** the unnumbered `MISSED (RR-1, adopted) — INFO` PRM-inert row. Both coordinates resolve exactly as the spec cites them.
* **kf-CSSCodeEditor** — the spec's §H claim that KF-CE-47 escaped route (d) at authoring is **byte-true**: that record's residue names KF-CE-1/-3/-11/-13/-15/-25/-33/-46 — **not KF-CE-47**. Booking it as a named §H line-item is the correct cure.
* **kf-SequenceScrubber** — the "AT churn row" rides residue **#5**; KF-SCR-1 rides **#1**; K-13 rides **#4**. **BOOKED.**
* **kf-EasingTarget KF-ET-12** — pass-1 D-18's "correctly omitted" is refined: KF-ET-12 **is** in that record's residue and **is** carried in the spec (§H's I-20 row, *"KF-ET-26/12's freeze half"*). Not an escape either way.

**NO INVENTION — HOLDS, machine-verified.** Every one of the **76** §Carry bullets was parsed for its `⟨record⟩` attribution and every id inside its head was tested against **that record's own bytes**: **zero ids fail to resolve at their cited record.** (The only bullets without a record attribution are §H's wave-law rows, which lawfully cite `INTAKE-ADJUDICATION §3`, `X-W6 §MATRIX`, `all 58 records`, etc.)

---

## 5 · DEFECT REGISTER

### HIGH

**D-1 · The repair's headline exhaustiveness claim is FALSE at the bytes.**
`:88` — *"all ten are booked at repair round 1 … so **no routed id now escapes all four mechanisms**."* Three do: kf-AmigaScene **D-2**, kf-AmigaScene **MISSED-A**, kf-HeroAurora **KF-HA-10** (§3). The clause is not a summary of a measurement; it is an inference from *"the ten pass-1 named are cured"* to *"the set is closed"* — and the set was never re-enumerated after the cure. A spec whose central claim is exhaustive carry may not close its census by inheriting the previous seat's list; §3's three are the receipt.

**D-2 · The AT/announcement sweep was executed as a list, not as a class.**
R-1e's cure shape and the spec's own §F preamble (*"S-12's '≥8 records' is made TRUE BY CARRIAGE, not by assertion"*) assert closure over the AT/announcement arm. E-1 (`kf-AmigaScene` D-2 — *no role, name, tabindex, keydown, or fallback content*) and E-2 (`MISSED-A` — *no touch affordance, zero discoverable interaction*) are AT/discoverability rows routed to KF.W9 at both their own dispositions and their record's KF.W9 routing summary, and neither is in §F. The arm reads "ten records" because ten were listed, not because the class was swept.

### MEDIUM

**D-3 · `KF-W4.md:193` no longer resolves — cited twice, both load-bearing.**
The spec cites `KF-W4.md:193` at OP-6 (`:44`) and at G-KFW9-10's strike grounds (`:208`) for *"This wave is the declared sequencing head of X·KF. No repair packet and no UNIT may open before G-KFW4-1 lands."* At the bytes that sentence is now at **`KF-W4.md:223`**; `:193` is `| **G-KFW4-12** | manifest hygiene | …`. KF-W4 was repaired in the same round and its lines moved; W9's citations were not re-anchored. This is a direct breach of the spec's **own carried law** — §Protocol 7 / KF-AT-28 (*"one pass, one pinned commit, re-anchored lines"*) and G-KFW9-14's CLOSES. The whole OP-6 posture argument hangs on a coordinate that points at the wrong row.

**D-4 · `KF-W0.md:276` no longer resolves.**
S-11 (`:226`) cites *"W0's 15 at `KF-W0.md:276`"*. At the bytes `:276` reads *"the cure line ABSENT at HEAD (N-3 — the bare `templateFrames.length` grep is NOT the witness…)"*. W0's packet-roster line is now at **`:401`** (and its repair note at `:26`), and W0 has **already been re-cut to the canonical 17** — so the sentence cites a stale coordinate *and* a superseded state as if current. Same class as D-3.

**D-5 · The escalation register's arithmetic — three numbers again, one register over.**
§H's escalation row enumerates, by ` · `, **13** armed triggers. Two dependent cells assert **fourteen**: §Goal `:24` (*"the fourteen **provisional** severities"*) and G-KFW9-13's witness `:211` (*"**fourteen** banked severities PROVISIONAL"*). The head's ⟨twelve records⟩ and the *"three can reach BLOCKER"* cell both check out exactly. This is precisely the **D-10 class the round just cured for the sibling negative register** — and the fix was applied to one register and not the other, in the same section.

**D-6 · The repair ledger miscounts its own dispositions.**
`:253` — *"**Check defects: 19 booked · 18 cured · 1 declined.**"* At the bytes the table carries `**CURED**` **17** times, `**DECLINED**` once (D-14), `NO DEFECT` once (D-18). **17 + 1 + 1 = 19.** "18 cured" is off by one — D-18 was recorded as *no defect*, not cured. The round-1 repair's own signature act was curing an off-by-one census claim (D-2); its ledger reproduces the fault one section later.

**D-7 · The dissent roster is stale after the repair that widened it.**
The closing provenance line (`:284`) enumerates **nine** dissents, and `:281` states *"**Unchanged by design**: … the nine dissents."* The file now carries **eleven** `Dissent preserved` instances plus one `DISSENT` — R-1e's §F additions brought three more in (kf-SpringTarget D-5 reader-1's MAJOR, D-6 reader-1's MAJOR, kf-PlaybackRibbon D-12 DU's MAJOR). The dissents are all *present and correct in the body*; what is wrong is the roster that claims to enumerate them and the ledger line that claims they were unchanged.

**D-8 · KF-AV-28's governed-row enumeration is under-inclusive against the bank it quotes.**
§H `:193` enumerates **four** governed rows carried in this spec (KF-AV-19/D-8 · KF-SCR-1 · K-13 · D·D-8's limb) — R-10's named set. But the rider is banked at **three** coordinates the spec itself cites, and `kf-PlaybackRibbon.md:36` reads *"Standing rider: **KF.W7's timeline-evaluate verdict may supersede any NO-WAVE-OWNER cure below** (the KF-AV-28 rider)"* — governing **every** NO-WAVE-OWNER row at that record. This spec carries **four** kf-PlaybackRibbon rows (D-3+DU-M-1 §B · D-24 §A · D-1/L-i1 §F · D-12 §F), of which D-1/L-i1 is explicitly *"→ NO-WAVE-OWNER (transport packet)"* — and the spec's own **S-11 states the transport/ribbon packet "carries the KF-AV-28 rider."** So S-11 says the ribbon is governed and §H's by-id enumeration names no ribbon row. Under R-10 the clause travels *"plus their own governed-row enumeration"*; this one is R-10's list, not the wave's own. The wave spends no cure, so the practical exposure is bounded to G-KFW9-13's discharge reporting — but the enumeration as written cannot support the discipline it declares.

### LOW

**D-9 · kf-RibbonBar `D-15` is booked only by identity, never by id.** That record's KF.W9 routing summary (`:133`) names *"RB-1 + **the D-15 fold**"*, and `:57` routes `D-15` → CPW `D-m9` + `KF-CE-13` → KF.W9. The spec carries both fold targets (§B RB-1 names D-m9 and KF-CE-13) so the identity is discharged — but the banked id `D-15 (kf-RibbonBar)` appears nowhere, and the file elsewhere books `D-15` as *kf-SequencePlayhead's* RTL row, so a reader resolving "D-15" in this spec lands on the wrong record. Route (b) is satisfied; the anti-rename trail is not.

**D-10 · `.focus-ring:focus-visible` is pinned one selector-line late.** §B (`:116`) — *"`design-idioms.css:78` is **`.focus-ring:focus-visible`**"*. At the bytes `:76` is the selector and `:78` is `outline: none`. The §Bounds row's `76-79` range is right and the substance of the D-19 repair (two different selectors, same (0,2,0), both unlayered) is fully confirmed; only the pinpoint is off by two.

**D-11 · The 563 cell is 2 short of this seat's independent recount.** Re-derived per record over each record's own `UNPROVEN` / `SS-13 additions` sections, counting `- ` / `N. ` / numbered line-items: **565**, not 563 (`+25` prose-carried unchanged: CubeAxisLines 9 · TransportDock 8 · CubeTarget 8, all three verified at the bytes). Both figures round to the spec's own `≈588` and S-13's triumvirate trigger fires only on a *material* divergence, so this is a precision note, not a conviction — recorded because G-KFW9-4's witness states 563 as a measured cell and the denominator "re-derives at open."

**D-12 · §F's "ten records" counts a §H line-item and a site-reference.** The AT arm's roster includes `kf-CSSCodeEditor (KF-CE-47, booked in §H's SS-13 list)` and `kf-ChromeDock (:241/:291 sites under KF-APP-33)`. §F itself carries rows from **eight** records. The claim is stated with its sources visible and S-12's bar is "≥8", so it clears — but "ten records" is not the §F bullet count and should not be read as one.

---

## 6 · POSTURE AXES

| axis | verdict | receipt |
|---|---|---|
| **KF.W4 head honoured** | **HOLD on substance · D-3 on the coordinate** | The wave now spends **zero** cure: G-KFW9-10 struck to declaration S-15 (ST-1's bytes → KF.W11 after G-KFW4-1); G-KFW9-9 closes on the **before-witness pair only** with the two-deletion act homed at KF.W13; §Bounds' five EXECUTION-TIME-ONLY kf grants are struck (`~~EXECUTION-TIME ONLY~~ → READ-ONLY WITNESS SURFACE`, ×4 rows / 5 paths) and `:69` states *"ZERO write grants in the kf tree"*. Every gate's CLOSES clause was read: **none lands a product edit.** OP-6 is therefore true by construction — but its citation `KF-W4.md:193` is stale (D-3). |
| **KF.W3 gated, never scheduled** | **HOLD** | `grep -c "KF\.W3\|PLAW-BIND" KF-W9.md` → **0**. The one parser-adjacent row (kf-CubeScene #10) is §Excluded → **V·π parser program** with the bank's *"Cross-repo, NOT SS-13"*. Clean, unchanged from pass 1. |
| **KF-AV-28 rider carried, not cited** | **HOLD with D-8** | `grep -c KF-AV-28` → **10** (pass 1: 0). R-10's clause is present **verbatim** — both the "Banked at …" head and the "Rows in this spec governed by the rider are spent CONDITIONALLY …" tail match the ruling string-for-string. S-10's KF.W7 edge names it by id. The governed-row enumeration is under-inclusive (D-8). |
| **E-3 + STATUS** | **HOLD** | 2 `VERIFIED` tokens, both negative. `planned` ×6. Past-tense execution verbs (`we ran` / `was captured` / `screenshots were` / `executed the capture` / `opened a session`) → **0**. §Bounds marks all 58 records `read-only, IMMUTABLE (E-1/E-3)`; write-backs are ADDENDA under original ids (G-KFW9-13). **No product source is opened by this file.** |
| **L-19 — gates born-RED with real witnesses** | **HOLD** | 13 live gates, all stated RED, each with a witness this seat re-executed or located on disk (§2). The pass-1 blocker (`build:gh-pages`) is fully cured at all three binding sites and the residual mentions are correction prose. **No phantom script.** |
| **NO INVENTION / M-25 depth** | **HOLD at the row level** | All 76 §Carry ids resolve at their cited records (script-verified). Cure-shape locks carried verbatim where they exist — K-5 (one deletion fixes nothing), K-6, K-3, the M-6 cure-map reversal, KF-KE-8's final-frame rest-state constraint, the KAD-11 pair lock, MM-4's unopenable-menu rider, D-23's selector-string-diff law, the D-14/N-4 *"one binding"* lock (restored **verbatim**), D-B3's lattice-decision lock, S-14's N-1 time-domain lock. Dissents preserved in the body (roster stale — D-7). |
| **Rulings applied** | **5 of 5, verbatim** | **R-1e** — seven §F rows + KF-CE-47 as an §H line-item + KF-AV-28 as the §H rider; net §F 4→11, §H 7→8, total 68→76 ✓. **R-9a** — items 1-5 all executed ✓. **R-10** — clause verbatim ✓. **R-11** — 3 sites ✓. **R-15** — the canonical 17-packet roster string and the `KF.W11 ×9 · KF.W12 ×6 · KF.W13 ×2` homing both present verbatim ✓. |

---

## 7 · What pass 2 confirms (recorded so pass 3 does not re-litigate)

1. **The 76/76 recount is exact** — A 18 · B 5 · C 1 · D 8 · E 7 · F 11 · G 18 · H 8, counted by script. Pass-1 D-2 is genuinely cured *by counting*, not by re-assertion.
2. **The measure-vs-cure fault is genuinely resolved.** Pass-1's D-3/D-4/D-5/D-9 were one fault seen four ways; all four cure paths have left the wave and the §Bounds grants are struck. This was the file's hardest defect and it is closed.
3. **Every witness that can be executed, executes true** — 4/31, 11/0, forced-colors 0, PRM 18/16, `lane-frontend.md:462` verbatim, both shas, `npm run gh-pages` present, all eight bounds paths on disk, all four OP-5 residue ordinals exact.
4. **The pass-1 dangling cite (D-8) is repaired at the bytes**, not papered over: `kf-ControlsPaneWrapper.md:77` **is** D-m9 and `:94` **is** the unnumbered RR-1 INFO row, exactly as the spec now says.
5. **The negative register's three-numbers fault is cured and both dependent cells agree** — 6 records · 11 probes · 4 traps, verified by enumeration.
6. **The D-14/N-4 cure lock is verbatim from the bank**, and the D-17 sign correction (kf-CubeScene D-16's PRM half is a *killed* claim at the opposite valence) is carried with its valence stated rather than silently dropped.

---

## 8 · Pass-2 verdict

**DEFECTIVE.**

The repair round did real work: the wave now knows that it measures, it holds no write grant in the keyframes tree, its rider is carried by id, its phantom script is gone, and its central carry claim survives a byte-level recount. What it did **not** do is re-open the census. It cured the ten ids pass 1 handed it and then wrote *"no routed id now escapes all four mechanisms"* — a closure claim about a set nobody re-enumerated. Three ids escape: **kf-AmigaScene D-2**, **kf-AmigaScene MISSED-A**, **kf-HeroAurora KF-HA-10** — two of them AT/discoverability rows on the mobile-Safari cell this wave exists to open, and one of them a row **pass 1 affirmatively mis-booked**.

Around that sit six MEDIUM defects of one family: **counts and coordinates asserted rather than re-derived after the repair moved things** — "fourteen" triggers over thirteen, "18 cured" over seventeen, "nine dissents" over eleven, and two cross-wave citations (`KF-W4.md:193`, `KF-W0.md:276`) that the same repair round invalidated by editing the sibling specs. The wave carries the law that fixes all six — *re-anchor lines, recount at the bytes* — and applies it to the corpus while exempting itself.

⟨PASS 2 · authored 2026-08-28 by a fresh adversarial L-18/L-20 seat. Corpus: 58 `kf-*.md` at `registry/adjudicated/`, 293 `W9` hit lines classified, 147 distinct routed (record, id) pairs reconciled. Every numeric claim above was executed against the tree this session; **no figure is inherited, and one pass-1 booking is refuted by name**. Status of this file: a check record, not a spec amendment — E-3 addenda-not-patch. Sole write = this file.⟩
