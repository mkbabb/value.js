SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 — Safari Visual Audit (frontend half) · EXECUTION RECORD

Governing spec: `docs/tranches/X/keyframes/waves/KF-W9.md` (722 L, agglomerated 2026-08-28, seven repair
rounds; PASS-7 the last). Track B (X·KF). Seat 0 (OPEN), 2026-09-17, on the owner's begin-word
(COHESION §0j, verbatim). Runbook of record: `EXECUTION-RUNBOOK.md` §1.2 (order) · §3.4 (locks) · §5
(seat law). Every owner-gated item in this wave is RULED at COHESION **§0j.C** — cited by id below,
never presumed, never re-opened.

---

## Open

**Date**: 2026-09-17. **Status set**: `planned` → **OPEN 2026-09-17**.

### Preconditions — verified at the bytes AND in the ledger

The wave's only *blocking* opening edge is **KF.W0 §B-12** (runbook §1.2 edge `KF.W0 → KF.W9`;
`KF-W9.md` §State *"Opens after"*). OP-2..OP-7 are §Open-preconditions rows checked at open, not close
gates; each is stated here with its measurement or its ruling.

| # | precondition | verdict | receipt (command → output) |
|---|---|---|---|
| **OP-1** | KF.W0 §B-12 names the execution substrate (hard blocking) | **MET** | LEDGER Track B row: `KF.W0` = **CLOSED 2026-09-17**, close commits `3a7efda5` · `a8abec97`, kf snapshot `6d280ee7`. At the bytes: ⟨`git -C ../keyframes.js rev-parse --abbrev-ref HEAD`⟩ → `master`; ⟨`git -C ../keyframes.js rev-parse HEAD`⟩ → `55e9bf0d2391bbc6d9871bb3f0555a6225daae92`; ⟨`git -C ../keyframes.js rev-parse origin/master`⟩ → the **same sha** (local == remote); ⟨`git -C ../keyframes.js rev-parse kf-sacred-snapshot-2026-09-17`⟩ → `6d280ee7bec7793846b2e2e1d250e1ea0a21859a` (the OWNER'S-HAND record, preserved by ref). `execution/B/KF-W0.md` rows 4–5 carry §0j.C **KF-OP1** and **KF-WRITE** as RULED. |
| **OP-2** | write authority for keyframes.js named | **MET — RULED, and moot for this wave** | §0j.C **KF-WRITE**: *"after §B-12, the sacred checkout on `master` (= `origin/master`) is the execution substrate for KF.W2 · W4 · W5 · W6 · W7 · W8 · **W9** · W10"*, hand = the value.js orchestrator under the 2026-09-17 grant. Moot here because R-9a struck all five EXECUTION-TIME-ONLY grants: **this wave holds ZERO write grants in the kf tree** and writes its evidence into value.js. |
| **OP-3** | a real Safari cell is reachable at all | **PRESENT at the binary; reachability MEASURED AT RUN (ruled)** | §0j.C **KF-ODV3 / KF-ODV5 / KF-AT**: *"KF.W9's capture band is AUTHORIZED to run (PACKET-FIRST binding; **OP-3's Safari reachability is measured at run, never assumed**)"*. Measured read-only at this seat: ⟨`which safaridriver`⟩ → `/System/Cryptexes/App/usr/bin/safaridriver`; ⟨`ls /usr/bin/safaridriver`⟩ → present; ⟨`defaults read /Applications/Safari.app/Contents/Info.plist CFBundleShortVersionString`⟩ → **26.4**; ⟨`sw_vers`⟩ → macOS **26.4.1** (25E253). `safaridriver --enable` + Develop ▸ Allow Remote Automation are a **session-open act**, performed and recorded by `.a` (G-KFW9-1's opening), not asserted here. |
| **OP-4** | UA-capability feature tests, asserted not assumed | **OWED PER CELL — assigned** | The three `.media` strings (`(forced-colors: active)` · `(prefers-reduced-transparency: reduce)` · `(prefers-reduced-motion: reduce)`) are evaluated **inside each cell** and written to that cell's sidecar by the seat that owns the cell (`.b` desktop · `.c` mobile/iOS · `.d` hcm/at). Not measurable at open by construction. |
| **OP-5** | a build exists at the named ref (`npm run gh-pages`) | **MET BY MEASUREMENT — no kf byte written** | The script exists: ⟨`grep -n '"gh-pages"' ../keyframes.js/package.json`⟩ → `43:        "gh-pages": "vite build --mode gh-pages",` (R-11 confirmed at the frontier; `build:gh-pages` still exists at no coordinate). A build is on disk from KF.W0 `.e`'s single regenerate: ⟨`ls -la ../keyframes.js/dist/gh-pages`⟩ → `index.html` 8,381 B, `assets/` (53 entries), `apple-touch-icon.png`, `robots.txt`, all **2026-09-17 13:37**. **It is fresh at the source bytes**: ⟨`git -C ../keyframes.js diff --name-only 81a56990..55e9bf0d`⟩ → **exactly one path**, `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` — a docs-only commit (KF.W1's delivery). **Zero source delta** between the built ref and the frontier, so the byte-offset trust OP-5 protects is intact without a rebuild. **Bound stated, not evaded**: `.a` re-verifies this delta and hashes the served bundle; if any **source** byte ever differs, a rebuild writes into the kf tree, which this wave's §Bounds forbids (*"Do NOT touch — any keyframes.js byte"*) → **S-13 bounds expansion → triumvirate**, never a quiet build. |
| **OP-6** | KF.W4's gate chassis is NOT a precondition | **STANDS, TRUE BY CONSTRUCTION** | Runbook §1.2 edge row: *"OP-6: KF.W4 is not a precondition — after RULINGS R-9a every cure arm has LEFT the wave … KF.W9 runs concurrent with the whole W4 fan-out."* Verified at the bytes: this wave's three ex-cure arms are homed elsewhere (two-deletion act → KF.W13 · ST-1's edit → KF.W11 · the five write grants struck), and G-KFW9-10 is struck as a gate. LEDGER `KF.W4` = `planned`; **this wave does not wait on it**. |
| **OP-7** | the AT-cell scope question (≡ S-12) | **MET — RULED** | §0j.C **KF-AT**: *"**AT runs inside KF.W9 `.d`'s arm** (the proposed resolution); no new lane is minted."* The S-12 dissent is therefore **decided**, not carried: `.d` keeps its AT arm and does not shed it. |

**Owner-gated items, each cited to its ruling (never presumed):**

- **OD-V3 / OD-V5** — §0j.C **KF-ODV3 / KF-ODV5**: this wave **produces the capture packet and rules
  nothing**. *"the transport-home ruling is taken by the orchestrator **from the OD-V3 packet** at
  KF.W10 `.g`'s sitting under this delegation, and if the packet does not exist by then KF.W10 closes
  `complete_with_misses` on that row citing its exact precondition"*; *"**OD-V5 stays DEFERRED** pending
  glass's dock mark … the `complete_with_misses` shape is authorized in advance."* Ruling source at the
  bytes: kf `docs/tranches/V/OWNER-DECISIONS.md` OD-V3 *"Decide per capture review"* · OD-V5
  *"Defer to glass's dock fix"*. The enumeration that scopes the packet reproduces:
  ⟨`grep -n 'DP2-06' ../keyframes.js/docs/tranches/V/audit/R2-01-visual-design.md`⟩ →
  `150:## DP2-06 — Transport/play affordance duplicated on subject/editor scenes; placement inconsistent (P3)`.
- **The §B-3 dock-contract re-verify (CH2-02 ×4)** — anchor re-run at the frontier under LAW D:
  ⟨`git -C ../keyframes.js grep -n 'CH2-02' origin/master -- docs/tranches/V/FOLD-FORWARD.md`⟩ →
  `:34` *"**Glass §4 dock contract** (PEEK is NOT native; binary FSM + opacity crossfade; manual-mode
  suppression): our dock consumption re-verifies against THIS shipped contract — subsumes the folded
  CH2-02 ×4 (BG-5, GU-1, GU-2, subject-legible)."* Byte-exact as the spec quotes it.

### Mail sweep (E13 Step-0, four paths, read-only)

Swept at this seat's clock and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`, classification taken from each row's **STATUS CELL**.

1. `docs/tranches/V/` + `docs/tranches/V/coordination/` — 19 + 18 entries; `INBOX.md` self-excluded
   (SELF-COUNT law). Newest: `value-inbox-2026-09-17-o8-o11-amendment-addendum.md` — **our own
   outbound**, delivered by KF.W1, not inbound mail.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest tranche dir**
   ⟨`ls -dlt ../glass-ui/docs/tranches/*/ | head -4`⟩ → `BK/` (Sep 17 12:49) · `BJ/` · `BI/` ·
   `IOS27-MICRO/`. 4 files; newest `glass-outbound-2026-08-29-valuejs-o20-ack.md` = **I-30**, rowed
   2026-08-30, the standing ledger tail.
3. `../keyframes.js/docs/tranches/V/coordination/` — 12 files + `vnext/`. Every `VALUEJS-INBOUND-*` is
   ours (outbound); `GLASS-INBOUND-*`, `ATLAS-INBOUND-*`, `SPEEDTEST-INBOUND-*` and `INBOUND-LEDGER.md`
   are addressed to keyframes, not to value.js.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 28 files, all ≤ 2026-07-27 and none newly
   value-addressed. Sweep widened to atlas **Q/** (the newer dir, and I-31's source): its two
   value-addressed letters are both already rowed —
   ⟨`grep -c 'ATLAS-TO-VALUE-2026-08-03-RULINGS' INBOX.md`⟩ → **2**;
   ⟨`grep -c 'ATLAS-TO-VALUE-2026-07-28-PASS2' INBOX.md`⟩ → **3**. `SCI-BEAD-INBOUND.md` is atlas's own
   inbound ledger, not value-addressed.

**Result: 0 unrowed · 0 UNREAD in this wave's scope.** Rows on file: ⟨`grep -c '^| I-' INBOX.md`⟩ →
**33** (ids I-1..I-31 plus the I-21a/I-24a re-rows); every status cell carries a settled disposition
(FOLDED ×6 · ROWED ×7+ · READ ×3 · RECONCILED · RATIFIED · CURED · NO ACTION). **I-30 remains the
tail.** No new row minted. A dated sweep line is appended at `INBOX.md`'s end.

---

## Baseline — the thirteen born-RED gates, run READ-ONLY at open

Gate set per `KF-W9.md` §Gates: **thirteen**, ids `-1..-9` and `-11..-14` (G-KFW9-10 struck as a gate at
repair round 1, R-9a item 1; the id is retained and not reused). Every row below is a command re-run at
this seat, not inherited from the spec's authoring-time cell.

| gate | verdict at open | witness measured here |
|---|---|---|
| **G-KFW9-1** · a real-Safari cell exists at all | **RED** | ⟨`git ls-files docs/tranches/V/megatranche/audit/visual/safari-real/ \| wc -l`⟩ → **4** (`MATRIX-SAFARI.md`, `ROUTE-MATRIX.json`, `STATE-MATRIX.json`, `picker-safari26.4-light.png`) vs ⟨`ls -1 …/safari-real/ \| wc -l`⟩ → **31** on disk — **27 uncommitted and therefore nonexistent (L-7)**. Corroborating: ⟨`git ls-files …/shots/ \| wc -l`⟩ → **0** tracked vs ⟨`ls -1 …/shots/ \| wc -l`⟩ → **11** on disk. The tracked corpus is **value.js routes, pre-X**; zero real-Safari execution against any keyframes.js tree. |
| **G-KFW9-2** · cell separation (I-20) | **RED** | ⟨`grep -c 'safari-app\|webkit-engine\|ios-device\|ios-simulator' …/capture.mjs …/states.mjs`⟩ → `capture.mjs:0` · `states.mjs:0`. **No separating matrix exists**; the harness cannot express a cell label today. |
| **G-KFW9-3** · the wave's own scoped surface list | **RED** | ⟨`head -10 …/audit/visual/REPORT.md`⟩ → *"# Mega-tranche visual audit — Safari (WebKit), desktop + mobile, light + dark / Origin: `http://localhost:9000` · 4 matrices × 15 routes = **60 captures**"* — the **value.js** corpus, not a kf-scoped list. B18-26's `152 × 11 × 4 × 11 = 73,568` (split `46,816 + 26,752` exact) stands rejected as a denominator; **no scoped list exists**. |
| **G-KFW9-4** · SS-13 residue discharge, 0 of ≈590 | **RED — and the denominator re-derives exactly** | The **amended** command (§Surface-list protocol 2: `- ` / `N. ` top-level items inside every `##` **or `###`** heading matching `UNPROVEN`/`SS-13`, identity-guards excluded), run over ⟨`ls -1 …/registry/adjudicated/kf-*.md \| wc -l`⟩ → **58** records, both variants side by side: **`h2-only: 563 · h2+h3: 565 · records with items: 57 · files: 58`** — reproducing the published figure to the digit, including the unamended form's 563. **565 enumerated + 25 prose-carried ⇒ ≈590; 0 executed.** **S-13's material-divergence trigger is NOT armed** (zero divergence, and measured with the amended form as S-13 requires). |
| **G-KFW9-5** · the PRM census is made true | **RED** | ⟨`sed -n '462p' …/formation/keyframes/lane-frontend.md`⟩ → `### 6.5 `prefers-reduced-motion` — 13 enforcement sites across 12 files` — the false claim still stands at the byte; no replacing enumeration exists anywhere in the tree. |
| **G-KFW9-6** · the intensity form + the final-frame hazard | **RED** | ⟨`sed -n '87p' ../keyframes.js/src/animation/constants/defaults.ts`⟩ → `    respectReducedMotion: false,`; ⟨`sed -n '50p' …/src/animation/index.ts`⟩ → `export { reducedMotionScale } from "./internal/reduced-motion";` (LIGHT barrel); ⟨`grep -rn 'reducedMotionScale' demo/ \| wc -l`⟩ → **0** demo consumers; **three live library consumers** ⟨`grep -rn 'amplitudeScale' src/`⟩ → `physics/spring/progress.ts:153` · `:232` · `:385` each `this.amplitudeScale = reducedMotionScale(`, applied at `:323`/`:352` (the R3-9 re-cut reproduces at the frontier, full path `src/animation/physics/spring/progress.ts`). The gap the gate measures — *the DEMO half does not consume the resolver the LIBRARY half already ships* — is live. |
| **G-KFW9-7** · the two-direction PRM pair, one pass, substrate named | **RED** | ⟨`grep -n 'snapToReducedMotion' …/engine/play-lifecycle/{strategies,frame}.ts`⟩ → `strategies.ts:76 export function snapToReducedMotion<V extends Vars>(` (docblock `:66-75` above it) and `frame.ts:137         snapToReducedMotion(anim);`, sole call site, inside `playFrame` — **the rAF lane**. ⟨`grep -c 'withReducedMotion' …/src/animation/waapi/delegation.ts`⟩ → **0, exit 1** — absent entirely, so KF-TD-1's *"`shadowTick` never consults it"* stands; ⟨`grep -n 'shadowTick' …/delegation.ts`⟩ → **`:53`** decl (the D4-4 pinpoint correct at the frontier) · `:64` `animation.playback.loop(shadowTick);`. **Neither direction witnessed.** |
| **G-KFW9-8** · the producer's forced-colors rule measured back into effect; demo-side count stays zero | **RED** | ⟨`grep -rn 'forced-colors' demo/ \| wc -l`⟩ (in `../keyframes.js`) → **0** — the eighth independent seat to measure it. No WHC capture exists in any cell. The **recorded result** this gate closes on is that the demo-side count is **still 0** and the indicator returns anyway (R-9a item 4 / D-9). |
| **G-KFW9-9** · the authored REMOVAL, measured — both copies, before-witness held | **RED** | ⟨`sed -n '74,80p' demo/styles/design-idioms.css`⟩ → `.focus-ring:focus-visible {` at **:76** with `box-shadow: var(--focus-ring-shadow);` + `outline: none;` (`:76-79`); ⟨`sed -n '70,76p' demo/styles/playback-idiom.css`⟩ → `.btn-playback:focus-visible {` at **:72** with the same pair (`:72-75`). **Both unlayered copies present, different selectors, same (0,2,0) specificity.** No before-witness shot. The **two-deletion cure is KF.W13's** (K-5: ONE act, never split); the AFTER witness reads UNMEASURED here. |
| **G-KFW9-11** · the repo's own iOS no-zoom floor honoured where needed | **RED** | ⟨`grep -rn 'clampIOSNoZoomFontSize' src/ demo/ test/`⟩ → declared `demo/components/instrument/utils/iosTextEntry.ts:10`, consumed at **exactly one** site `CSSCodeEditor.vue:39`/`:137`, unit-tested 14→16 at `test/demo/instrument/ios-text-entry.test.ts:88-89`; ⟨`grep -rn 'initIOSPlatformClass' demo/`⟩ → `EditorShell.vue:115`/`:133`. **Unused at the two surfaces that need it** (R-9's 14px, SP-4's ~12.2px); no iOS session has ever run. |
| **G-KFW9-12** · every probe carries a discriminator and a falsifier | **RED** | ⟨`ls docs/tranches/X/keyframes/evidence/W9/`⟩ → **No such file or directory**. **No register exists** for the **6 records · 11 probes · 4 traps** §H enumerates. |
| **G-KFW9-13** · escalation triggers close with measurements, addenda under original ids | **RED** | ⟨`grep -rl 'PROVISIONAL' …/registry/adjudicated/kf-*.md \| wc -l`⟩ → **0** records carry a provisional-severity resolution; ⟨`grep -rlc 'ADDENDUM.*2026-09-17' …/kf-*.md \| wc -l`⟩ → **0** — **zero W9 addenda banked**. §H's **thirteen armed triggers over twelve records** stand unmeasured (KC-25 · KF-ES-3 · D-M3 branch (a) · TimelineTrack M-7/missed-4 **+** D-4 as one row · KAD-7/D-2 · KF-SST-15/-16/-17 · KF-TFP-7 · KF-TD-8 · KF-AV-41 · KAD-F4 · KF-ET-8's dark arm · N-5 · L-M-10/N-3 + KF-TFP-19). Three can reach BLOCKER. |
| **G-KFW9-14** · substrate naming and witness refresh | **RED — and RE-STAMPED at open** | The frontier has moved since authoring. **Substrate of record for this wave**: kf `master` == `origin/master` == **`55e9bf0d2391bbc6d9871bb3f0555a6225daae92`**, whose only delta from the spec's pinned `81a56990` is one docs-only commit (⟨`git diff --name-only 81a56990..55e9bf0d`⟩ → one `.md` coordination path). The disqualified `8281638c` is preserved by ref only, at `kf-sacred-snapshot-2026-09-17` = `6d280ee7`. **Six untracked kf files** remain on disk ⟨`git ls-files --others --exclude-standard`⟩ (2 coordination letters + 4 `src/animation/{compile,group}` files) — named so no capture silently inherits them. **RED**: no capture names substrate ref + sha + cell, because no capture exists. |

**Born-RED tally: 13 RED · 0 GREEN · 0 UNRUNNABLE · 0 DIVERGENT.**

**R.2 — GREEN-BEFORE-CURE: none.** Every one of the thirteen is RED at its own witness before any cure.

**Two facts banked that are NOT greens**, so they are never read as such later:

1. **OP-5 is discharge-ready by measurement, not by a build.** The gh-pages bundle on disk is
   source-identical to the frontier (zero source delta). G-KFW9-14 still closes only on captures that
   *name* substrate ref + sha + cell — none exist, so the gate is RED.
2. **G-KFW9-4's denominator reproduces exactly** (565/563/57/58). That is the gate's *precondition*
   holding, not the gate closing: 0 of ≈590 probes are executed.

**Apparatus present and read-only**: ⟨`ls -la …/megatranche/workflows/safari-real-matrix.js`⟩ → 9,788 B
(EXECUTE, NO WRITE — shared with X-W11 G8 at **separate cells**; a harness edit is a bounds expansion →
triumvirate). **Absent and owed**: `…/safari-real/SS-13-CAPTURE-RECEIPT.md` (`.e` creates it) and
`docs/tranches/X/keyframes/evidence/W9/` (all seats create under it).

---

## Unit plan

**Shape, from §State's binding Agents line**: 5 seats · 4 sequential phases ·
`.a` serial chassis → `.b`/`.c`/`.d` parallel and **cell-disjoint** → `.e` serial → close. The spec
declares peak concurrency 3; the **owner's cap applied here is 2 concurrent**, so phase 2 is cut
`[.b ∥ .c]` then `[.d]`. The cut is also the right engineering: `.b` and `.c` drive **different**
drivers (desktop safaridriver vs iOS device/simulator), while `.d` needs the desktop Safari session
again *and* an exclusive VoiceOver pass — pairing it with `.b` would contend for one session.

**Models**: all five **Opus**. The spec names no Fable, fresh-Fable, adjudicator or design-author seat
for this wave; every seat is a measurement/census/capture seat, which runbook §5.1 assigns to Opus solo.

**Ordered groups**: `[.a]` → `[.b, .c]` → `[.d]` → `[.e]`.
No two concurrent units share a modify path: `.b` writes only `safari-real/desktop-*`, `.c` only
`safari-real/mobile-*`, `.d` only `safari-real/hcm-*` and `safari-real/at-*`; `REPORT.*`/`STATES.json`
are written by `.a` and `.e` **alone** (§Disjointness: *"two seats editing the surface list is how one
surface list becomes three"*).

### `.a` — chassis: substrate pin · surface list · the two registers (SERIAL; nothing dispatches until it commits)

- **Sections**: §Surface-list protocol 1–7 (`:83-92`) · §Gates G-KFW9-14 · G-KFW9-3 · G-KFW9-4 ·
  G-KFW9-12 and §H's two registers (`:207-219`) · §Sequencing S-1 (`:108-109`) · §Bounds `:56-82`.
- **Writable**: `docs/tranches/V/megatranche/audit/visual/capture.mjs` ·
  `…/audit/visual/states.mjs` (modify-carve, `.a` ALONE) · `…/audit/visual/REPORT.md` · `REPORT.json` ·
  `STATES.json` (skeleton only) · `docs/tranches/X/keyframes/evidence/W9/**` (create).
- **Gates**: G-KFW9-14 (pin) · G-KFW9-3 (publish) · G-KFW9-4 (denominator re-derived at open) ·
  G-KFW9-12 (registers published **with** the list) · G-KFW9-2 (cell roster expressible in the harness).
- **Locks**: S-1 — no phase-2 seat dispatches before `.a` commits. `safari-real-matrix.js` is
  EXECUTE-NO-WRITE: a cell label that cannot be expressed in `capture.mjs`/`states.mjs` is a harness
  redesign shared with X-W11 G8 → **triumvirate**, never a quiet edit.

### `.b` — desktop-Safari cell · the PRM band (∥ `.c`)

- **Sections**: §Gates G-KFW9-5 · -6 · -7 (`:220-244` band) · §Sequencing S-3 (`:116-118`) ·
  S-8 families (i)(ii) + the **1280 arm** of (iii-a) (`:125-141`) · §A carry (`:104-124`).
- **Writable**: `…/audit/visual/safari-real/desktop-*` (create/write, force-added) ·
  `docs/tranches/X/keyframes/evidence/W9/**`.
- **Gates**: G-KFW9-5 · G-KFW9-6 (three measurements only) · G-KFW9-7 · plus its share of -1/-2/-4/-14.
- **Locks**: G-KFW9-6's **unification constraint is HANDED to KF.W5/KF.W6** as a declared sequencing
  obligation and reads **UNMEASURED** here — recording their discharge is a measurement of their act,
  never a green of its own. S-8: no probe double-spent. KF-AV-28 rider = witness-ordering only.

### `.c` — mobile-Safari / iOS cell · the device session (∥ `.b`)

- **Sections**: §Gates G-KFW9-11 · §Sequencing S-6 (`:121-122`) · S-7 (`:123-124`) ·
  S-8 families (iii) 390×844 + 375×667, **(iii-a) 390 arm** and **(iii-b) the OD-V5 390 at-rest
  observation** (`:125-141`) · §D carry (`:137-147`).
- **Writable**: `…/audit/visual/safari-real/mobile-*` (create/write, force-added) ·
  `docs/tranches/X/keyframes/evidence/W9/**`.
- **Gates**: G-KFW9-11 · plus its share of -1/-2/-4/-14.
- **Locks**: **ONE** iOS device session discharges family (v) whole (R-9 · SP-4 · KAD-F4 · KF-KC-16/25
  · KF-SCR-1 · i-13/C-3 · K-13 · TimelineCaret probe 10). **OD-V5 is DEFERRED by ruling** (§0j.C
  KF-ODV5) — record the at-rest state *either way* and rule nothing.

### `.d` — contrast / forced-colors / AT cell (SERIAL after `[.b ∥ .c]`)

- **Sections**: §Gates G-KFW9-8 · -9 · the held ex-G-KFW9-10 witnesses (`:81-88` of §Gates) ·
  §Sequencing S-2 (`:110-115`) · S-8 families (iv) + (vi) · S-15 (`:316-317`) · §B (`:125-132`) ·
  §E (`:148-158`) · §F (`:159-182`).
- **Writable**: `…/audit/visual/safari-real/hcm-*` and `…/safari-real/at-*` (create/write,
  force-added) · `docs/tranches/X/keyframes/evidence/W9/**`.
- **Gates**: G-KFW9-8 · G-KFW9-9 (BEFORE witness only) · plus its share of -1/-2/-4/-14.
- **Locks**: **the two-deletion act is KF.W13's** — `.d` spends no cure and deletes no byte; the AFTER
  witness reads UNMEASURED until that act lands (S-9). **AT runs here by ruling** (§0j.C KF-AT); no new
  lane. A **chromium emulation labelled as WHC is the I-20 failure** — if the safari-app column is
  UNREACHABLE by UA capability *and* no Windows HCM cell exists, book UNREACHABLE-IN-CELL with the
  bound stated (S-13).

### `.e` — write-backs · census amendment · the BH-relay evidence packet (SERIAL, last)

- **Sections**: §Gates G-KFW9-13 · G-KFW9-5's amendment half · §Bounds' adjudicated-record **CELL
  SPLIT** row and the `SS-13-CAPTURE-RECEIPT.md` row (`:70`/`:81`) · §Sequencing S-10/S-10.1
  (`:145-161`, `:306`) · S-11 (`:307-312`) · S-14 (`:313-315`).
- **Writable**: `…/megatranche/registry/adjudicated/kf-*.md` (**APPEND-ONLY dated addenda under ORIGINAL
  ids, `.e` ALONE**) · `…/audit/visual/safari-real/SS-13-CAPTURE-RECEIPT.md` (create) ·
  `…/audit/visual/REPORT.md` · `REPORT.json` · `STATES.json` (fold ONLY) ·
  `docs/tranches/X/keyframes/evidence/W9/**`.
- **Gates**: G-KFW9-13 · G-KFW9-4's terminal accounting · G-KFW9-5 (draft) · G-KFW9-3's final fold.
- **Locks**: **E-1/E-3** — existing record bytes immutable; an addendum that edits an existing line, or
  mints a new id, or lands from any seat but `.e`, is a bounds expansion → **triumvirate**. The census
  amendment lands as a **DRAFT under `evidence/W9/**`**: `CENSUS-2026-08-03.md` and `lane-frontend.md
  §6.5` are **read-only, both paths** and this wave writes no byte of either. The OD-V3 packet's
  **DISCRIMINATOR** binds the receipt: a single home, or either home at one viewport only, does not
  satisfy it — if either half is missing, the receipt records the packet incomplete **with its exact
  precondition**, which is the shape §0j.C authorizes KF.W10 to close `complete_with_misses` on.

### Standing on every seat

Probe parsimony (owner edict 2026-07-12, runbook §5.2) as a LAW block · **webkit-engine and safari-app
are separate evidence cells; never infer one from the other** · every capture force-added with a
**per-shot sha256** sidecar + cell label + substrate ref (`55e9bf0d`) · contrast numerals **re-derived at
capture** (KF-SKEL-22), frames stamped (KF-AX-4) · **zero kf writes** · glass-ui READ-ONLY always
(producer rows ride the SS-6 BH relay, never demo-side hacks) · `scripts/dev/dev.sh` NEVER touched ·
pathspec commits with the session trailer · **this wave measures; it authors no product cure and claims
no CI colour**.

---

## Unit receipts

*(empty — appended by each unit as it lands)*
