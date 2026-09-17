# X.KF.W9 — Safari visual audit, keyframes.js demo · PER-CELL RESULTS

**FOLDED 2026-09-17 by seat `.e`** over `.a`'s skeleton, with `.c`'s foreclosures and `.d`'s cells.
**7 captures across 3 cells · 9 of 10 cells carry a reading or a NAMED foreclosure · 13 of 590 probe
rows are terminal.** Machine form: `REPORT.json`. Fold apparatus, re-runnable and printing its own
mapping: `docs/tranches/X/keyframes/evidence/W9/W9e-fold.mjs`.

**Substrate**: keyframes.js `55e9bf0d2391bbc6d9871bb3f0555a6225daae92` — **HELD** per COHESION §0m.2
(*"no re-pin on a seat's authority"*). The frontier has since moved to `3e81f500`, **10 commits past
the pin**, and the pin is still its **ancestor** ⟨`git merge-base --is-ancestor 55e9bf0d HEAD`⟩ → yes.
The disqualified `8281638c` is preserved by ref at `kf-sacred-snapshot-2026-09-17` = `6d280ee7`.

**Bundle**: `1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448` — **MEASURED, not
asserted**: built by `.d` in the §0m.2 capture clone (`/Users/mkbabb/Programming/keyframes-w9-capture`,
`npm ci && npm run gh-pages`, 54 files) and **re-hashed double-run identical at `.e`**. The clone is
clean at the pin, holds no commit of ours, was never pushed, and **is not the sacred checkout**.

**Denominator**: **590** = 565 enumerated + 25 prose-carried, over 58 adjudicated records, published at
`docs/tranches/X/keyframes/evidence/W9/SURFACE-LIST.md`. Re-derived at this sitting's open by the
**amended** command (`##` **or** `###` headings matching UNPROVEN/SS-13), double-run identical:
`h2-only: 563 · h2+h3: 565 · records with items: 57 · files: 58`. **S-13's material-divergence trigger
is NOT armed.** The Kronecker **73,568** stays **REJECTED** (B18-26) and is named only as the thing
rejected.

## What this file replaced, and why

The bytes here until `.a`'s skeleton were the **2026-07-24 value.js-route corpus** — *"4 matrices × 15
routes = 60 captures"*, origin `http://localhost:9000`, API-less. **That corpus is G-KFW9-3's born-RED
witness**: value.js routes, pre-X, **zero real-Safari execution against any keyframes.js tree**.
**Nothing is destroyed**: the prior bytes are in git at `c0078d96` and recover with
`git show c0078d96:docs/tranches/V/megatranche/audit/visual/REPORT.md`.

## Cell ledger (I-20) — all ten cells, every state measured or ruled, never absent

An **absent** cell is how a `webkit-engine` reading ends up in a `safari-app` column by default. So
every cell appears with a state, and an unrun cell may only say `UNMEASURED` · `UNREACHABLE-IN-CELL` ·
`UNVERIFIABLE-HERE`. **Green without a per-shot `sha256` FAILS** — and this fold is not vacuous on that
point: **7 of 7 PNGs were re-hashed at `.e` and equal their `.sha256` sidecars.**

| cell | column | seat | state | shots | the measured bound, where the cell did not open |
|---|---|---|---|---:|---|
| `safari-app/desktop` | safari-app | `.b`/`.d` | **PARTIAL** | 3 | opened and productive, then **closed mid-seat**: *"You must enable 'Allow remote automation'"*; `safaridriver --enable` → **`Password:Password is not valid`** (interactive admin); the running Safari is the **owner's** (pid 23725, 6 windows) and was not quit. **Its forced-colors arm is UNREACHABLE-IN-CELL by PLATFORM** — see below |
| `safari-app/ios-device` | safari-app | `.c` | **UNREACHABLE-IN-CELL** | 0 | `xcrun devicectl list devices` → `No devices found.` (double-run); `system_profiler SPUSBDataType \| grep -ic 'iPhone\|iPad'` → 0. **RULED at COHESION §0m.2** |
| `safari-app/ios-simulator` | safari-app | `.c` | **UNREACHABLE-IN-CELL** | 0 | `safaridriver --help \| grep -ci simulator` → **0** (the flag the roster named does not exist); `POST /session {safari:useSimulator:true}` → *"The 'macOS' platform is incompatible with requested capability"* (double-run byte-identical). 18 simulators installed — the **driver** forecloses it, not the host. **RULED at §0m.2** |
| `webkit-engine` | webkit-engine | `.b` | **UNMEASURED** | 0 | playwright 1.60.0 resolves webkit to `webkit-2287`; only `webkit-2311` is installed, so `webkit.launch()` throws. **A chromium reading was NOT given this label** — the cell is empty rather than wrong |
| `chromium` | chromium | `.d` | **MEASURED** (8 rows) | 2 | — (the forced-colors-OFF control twin + the AT-precondition inventory over 6 routes) |
| `chromium/emulated-forced-colors` | chromium | `.d` | **MEASURED** | 2 | — (`fcMatch: true`, against the `chromium` control's `false`). **This row NEVER enters the `windows` column** |
| `windows/real-HCM` | windows | `.d` | **UNREACHABLE-IN-CELL** | 0 | `uname -a` → `Darwin 25.4.0`; no Parallels/VMware/UTM/VirtualBox/CrossOver in `/Applications`; `command -v qemu-system-x86_64` → no output. **No Windows host and no virtualization host** |
| `at/voiceover-safari` | at | `.d` | **UNREACHABLE-IN-CELL** | 0 | **both legs**: the safaridriver leg is the admin-gated closure above; VoiceOver is not running (`pgrep -x VoiceOver \| wc -l` → **0**) and starting it takes over the owner's live machine with no grant |
| `at/nvda` | at | `.d` | **UNREACHABLE-IN-CELL** | 0 | no Windows host, no VM host |
| `at/jaws` | at | `.d` | **UNREACHABLE-IN-CELL** | 0 | no Windows host, no VM host |

**A chromium emulation labelled as WHC is the I-20 failure by name (S-13), and it is not committed here
under any spelling.** No capture in this corpus is labelled `windows/real-HCM` or `webkit-engine`.

### OP-4 capability record — owed PER CELL, never inherited

`safari-app/desktop`, Safari **26.4** / macOS **26.4.1** (25E253), `safari:useSimulator: false`, window
requested 1280×900 / **actual 1280×848** (the clamp recorded): all three `.media` strings **PARSE**;
`(forced-colors: active)` **false**, `(forced-colors: none)` **true**, `(prefers-reduced-transparency:
reduce)` false, `(prefers-reduced-motion: reduce)` false, `(prefers-contrast: more)` false, `dpr 2`.

**AND THE COLUMN IS STILL FORECLOSED — a different question, measured with a control.** That the media
strings parse says the UA can *express* the query; it does not say the mode can be *entered*. Measured
reversibly at `.d`: with `defaults write com.apple.universalaccess increaseContrast -int 1`,
`(prefers-contrast: more)` **flipped true LIVE** in the same `matchMedia` batch, no restart — so the
host setting demonstrably reaches Safari's media-query engine — while `(forced-colors: active)` **did
not move**. **macOS/WebKit implements no forced-colors mode**: the `safari-app` forced-colors arm is
**UNREACHABLE-IN-CELL by PLATFORM**, not by capability and not by omission. The host a11y setting was
**fully restored** (`defaults delete …`, re-read → *"does not exist"*).

`safari-app/ios-device` and `safari-app/ios-simulator`: OP-4 **NOT TAKEN**, because no session opens in
either — booked **UNREACHABLE-IN-CELL with the host named**, which is what OP-4 demands instead of a
silent blank, and **explicitly not inherited** from the desktop cell.

## The registers (published with the surface list, G-KFW9-12)

| register | figures | file |
|---|---|---|
| negative | **6 records · 11 probes · 4 traps** | `evidence/W9/NEGATIVE-REGISTER.md` |
| escalation | **13 armed triggers over 12 records** (3 can reach BLOCKER) | `evidence/W9/ESCALATION-REGISTER.md` |

**A retired probe re-entering the surface list is a GATE FAILURE.** **A probe satisfied by both
hypotheses is a SPEC DEFECT, not a measurement.** Both are mechanized in `capture.mjs`
(`assertNotRetired` / `assertProbeTerminal`), not merely asked for.

**All 13 escalation triggers now carry a dated ADDENDUM under their ORIGINAL ids** in
`registry/adjudicated/kf-*.md` (14 appended blocks over 12 records — trigger 13 binds two records).
**Every one reads PROVISIONAL (unrun) with its exact precondition**; **no banked severity moved.**

## Probe tally — self-counted from the settled `SURFACE-LIST.json`, double-run

| state | count |
|---|---:|
| EXECUTED | **1** |
| RETIRED | 0 |
| UNREACHABLE-IN-CELL | **12** |
| **UNMEASURED** | **577** |
| **total** | **590** |

**The 12 UNREACHABLE-IN-CELL** are `.c`'s two foreclosed iOS cells reaching the residue rows that name
their ids: S-8 family (v) — `CSSPasteDialog#7` (R-9) · `SharePopover#4` (SP-4) · `KeyframesAddDialog#10`
(R-20/KAD-F4) · `KeyframeCard#9` (KF-KC-16/25) · `SequenceScrubber#1` (KF-SCR-1) · `SequenceScrubber#4`
(K-13) · `SpringTarget#5` (i-13/C-3) · `TimelineCaret#10`; and S-8 family (iii) — `App#5` (KF-APP-6) ·
`App#7` (KF-APP-8) · `TransportDock#1` (TD-36) · `EditorStartScreen#3` (KF-EST-4).

**The 1 EXECUTED** is `SequenceTarget#8` (ST-1's render under `forced-colors: active` with a row handle
keyboard-focused) in **`chromium/emulated-forced-colors`**, with capture + sha256 + substrate + cell +
discriminator + falsifier all non-null — and **in that cell alone**. It is **not** written into the
`safari-app` or `windows` columns, which is why **G-KFW9-9 stays RED**.

**WHY THE TALLY IS NOT LARGER, STATED RATHER THAN AVERAGED.** The fold maps a banked defect id onto a
probe row **only when the record's own residue line contains that id at a word boundary** — the
mapping is a command, and `W9e-fold.mjs` prints the matched line for every row it moves. Most of the
wave's terminal dispositions are on banked ids whose residue item does not name itself (the corpus's
own *route (d) discharges BY ITEM* shape), so they are carried at **row level** in
`REPORT.json.fold.unmappedRowDispositions` with their evidence and are **NOT forced onto a row**.
**Two deliberate under-claims are recorded there as decisions rather than oversights**: `App#14`
(KF-APP-33) and the family-(vi) AT rows are structurally confirmed but stay **UNMEASURED**, because the
probes as worded ask for an AT **utterance** and `.d` declared S-8 family (vi) **UNSPENT** — no member
is spent by a structural read, and none may later be skipped on the ground that a seat "already looked".

`RibbonBar#1` (RB-1) stays **UNMEASURED** and carries its **BEFORE witness** in-row
(`hcm-chromium-emulated-forced-colors-easing-ribbon.png`, sha `bb2434b5…`): the probe has two halves,
and the **AFTER** half ("delete the demo rule and assert the Highlight outline returns") is **KF.W13's**
two-deletion act. **S-9: it reads UNMEASURED and is never inherited.**

## OP-5 — the standing blocker `.a` booked is CURED, by the ruling's design

`.a` booked an OP-5 break: the `dist/gh-pages` bundle was destroyed **twice** in the shared kf checkout
(15:26:18 and 16:31:58) by a sibling's `npm prepare` → `build:lib` self-emptying `dist/`, and `.b`
measured that a bundle there has **a lifetime of minutes**. A rebuild in that tree is a kf write §Bounds
forbids outright. **COHESION §0m.2 shape (b) dissolves it**: a clone at a named ref is immune to the
frontier's motion. The bundle now exists, is built at the pin, and its digest is measured above.
**`.a`'s residual 2 (the un-measured `bundleSha256`) is DISCHARGED** — no seat defaulted the field.

## Gate readings at the fold (BEFORE = this sitting's open)

| gate | before | after | basis |
|---|---|---|---|
| **G-KFW9-1** | RED — ⟨`git ls-files …/safari-real/ \| wc -l`⟩ → **7** tracked, ⟨`\| grep -ci sha256`⟩ → **0** | **RED, MOVED** | re-measured at this seat: **25** tracked of **52** on disk, **7** `.sha256` sidecars, 7 captures force-added, each carrying cell + substrate ref + measured bundle. The cell the gate names (`safari-app`, via `safaridriver`) opened and then closed mid-seat |
| **G-KFW9-2** | RED — 10 cells UNMEASURED, 9 of 10 `capability: null` | **RED, MOVED** | **9 of 10** cells carry a reading or a **named** foreclosure; only `webkit-engine` reads UNMEASURED, with its bound measured; every result carries its cell label, no verdict crosses a column, and 7 of 7 shots carry a sha256. **It stays RED on one clause, named**: the CLOSES asks that *each* cell carry OP-4's `.media` capability record, and **3 of 10 do** — the foreclosed cells carry a named bound instead, which is what OP-4 demands of an unopenable cell but is not the same thing as a capability reading |
| **G-KFW9-3** | GREEN | **GREEN** | the scoped list is one, kf-scoped, published before any fraction, and now folded; denominator re-derived 590 |
| **G-KFW9-4** | RED — 0 of 590 terminal | **RED, MOVED** | **13 of 590** terminal (1 EXECUTED · 12 UNREACHABLE-IN-CELL); the rest carry named preconditions. Shared-capture families honoured — **family (v) and family (vi) are DECLARED UNSPENT** |
| **G-KFW9-5** | GREEN | **GREEN** | ONE enumeration exists (`evidence/W9/PRM-ENUMERATION.md`); 18 of 18 §A rows resolve; the lane file is untouched at the byte; the census amendment is **drafted and placed** at `evidence/W9/CENSUS-AMENDMENT-DRAFT-PRM.md` by the seat the bounds name |
| **G-KFW9-13** | RED — ⟨`grep -rl 'ADDENDUM.*2026-09-17' kf-*.md \| wc -l`⟩ → **0**, ⟨`grep -rl PROVISIONAL`⟩ → **0** | **GREEN on the gate's own disjunctive arm — and the ground is stated so it can be overturned** | **12 records** now carry the addendum (**14 blocks over 13 triggers**; trigger 13 binds two records), ⟨`grep -rl PROVISIONAL kf-*.md \| wc -l`⟩ → **12**. The CLOSES reads *"each trigger's measured value + resulting severity written back as an ADDENDUM under the ORIGINAL id; **unrun triggers reported PROVISIONAL at close**"*, and §Goal states the same as an explicit *"either … or"*. Every one of the thirteen is reported PROVISIONAL under its original id, dated, from the only lawful seat, with its exact unmet precondition — **none is silently inherited**, which is the failure §H names. **FALSIFIER, stated rather than buried: 0 of 13 triggers were MEASURED.** A reviewer who holds this gate to its measurement arm alone reads it **RED**, and it stays RED until a cell opens |
| **G-KFW9-8 · -9 · -11 · -14** | RED | **RED** | `.d`'s and `.c`'s limbs, unchanged by this fold |

## Residuals, each with a named owner

1. **The `safari-app` + `windows/real-HCM` forced-colors arms of G-KFW9-8/-9.** OWNER: a **different
   platform** (macOS implements no forced-colors mode — measured with a control) and a **Windows host**
   (none exists). Not a different seat.
2. **The `safari-app/desktop` cell's re-authorization.** OWNER: a hand that can answer an interactive
   admin prompt, or the owner's Safari restarted. `.d` left `com.apple.Safari AllowRemoteAutomation = 1`
   (revert: `defaults delete com.apple.Safari AllowRemoteAutomation`).
3. **Both iOS cells and every probe behind them.** OWNER: a paired iOS device / a WebDriver endpoint
   that can host an iOS-Simulator Safari session. **Neither is curable by any grant to this wave**, and
   COHESION §0m.2 already rules the cells UNREACHABLE-IN-CELL.
4. **`webkit-engine`.** OWNER: whoever installs `webkit-2287` (or moves playwright). **Cheap, measured,
   and deliberately left empty rather than filled with a chromium reading.**
5. **The OD-V3 packet (0 of 16 cells), OD-V5's 390 at-rest (not observed), the Glass §4 dock re-verify
   (0 of 4 marks) and the V-A95 aurora surface verify (not produced).** OWNER: the orchestrator at
   **KF.W10 `.g`** (ruling + `complete_with_misses`), **glass-ui → SS-6** for OD-V5's mark, **KF.W6** for
   the dock re-verify's sibling half. Indexed whole, with each exact precondition, at
   `safari-real/SS-13-CAPTURE-RECEIPT.md`. **This wave produces and rules nothing there.**
6. **The census amendment is a DRAFT.** OWNER: whoever holds the write grant on
   `formation/keyframes/CENSUS-2026-08-03.md`. No KF.W9 seat has it, and none took it.
7. **KF.W13 must re-word the redundancy ground before the two-deletion act lands** — the producer ships
   **no `.btn-playback` rule at any coordinate**; the row survives via the **co-present `.focus-ring`
   class**. Landed as a dated addendum under the original ids. **The act itself is unchanged, and is
   still ONE act.**
