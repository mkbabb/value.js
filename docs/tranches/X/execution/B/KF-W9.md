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

### `.a` — chassis · SERVED MODEL: claude-opus-5[1m] · 2026-09-17

**Commit**: `dfe890e1` — *"feat(X·KF.W9/.a): the chassis — substrate pinned, 590-probe surface list
published, both registers, I-20 roster carved into the harness"*. **ONE commit** because G-KFW9-12
requires the registers be published **WITH** the list and S-1 names the four as one chassis (a family
that must not split). 13 paths, all inside `.a`'s writable set; `scripts/dev/dev.sh` and
`docs/tranches/V/reformation/CARRY-LEDGER.md` were dirty on arrival and are **untouched and unstaged**.

**Status: PARTIAL.** Every act `.a` owns landed. **One wave-level precondition is BROKEN and escalated**
(act 2 below) — it is a sibling's collateral, not this seat's, and curing it is outside this unit's
bounds.

---

#### Act 0 — inherited state, measured before writing

`capture.mjs` arrived **already `M`** with an *"X.KF.W9 `.a` CARVE"* header and a live
`ROSTER_DIGEST_PLACEHOLDER`, and `evidence/W9/SUBSTRATE-PIN.md` existed untracked (mtime **15:24**) —
an **interrupted prior `.a` run, never committed**. Its work is completed and corrected here rather
than duplicated. `states.mjs` was **clean** (`git status --short` → empty): the carve had not reached it.

#### Act 1 — OP-3: a real Safari session, opened and recorded (§0j.C **KF-ODV3**, *"measured at run, never assumed"*)

⟨`safaridriver --version`⟩ → `Included with Safari 26.4 (21624.1.16.11.4)` · ⟨`sw_vers`⟩ → macOS
**26.4.1** (25E253) · ⟨`defaults read com.apple.Safari IncludeDevelopMenu`⟩ → `1`.

⟨`defaults read com.apple.Safari AllowRemoteAutomation`⟩ → **`does not exist`** (key absent from the
container plist on macOS 26) and `safaridriver --enable` needs an interactive admin authorization this
seat cannot supply. **Neither is claimed as run.** What is claimed is measured:

⟨`nohup /usr/bin/safaridriver -p 4601 &` ; `lsof -nP -iTCP:4601 -sTCP:LISTEN`⟩ → `com.apple 85467 …
TCP 127.0.0.1:4601 (LISTEN)` + `[::1]:4601 (LISTEN)`; ⟨`curl -s :4601/status`⟩ →
`{"value":{"message":"","ready":true}}`.

⟨`curl -s -X POST :4601/session -d '{"capabilities":{"alwaysMatch":{"browserName":"safari"}}}'`⟩ →
**HTTP 200**, `sessionId 7BB393EF-45A2-4EB5-9B01-C12155925F97`, `browserVersion 26.4`,
`safari:platformVersion 26.4.1`, `safari:platformBuildVersion 25E253`, **`safari:useSimulator: false`**.
**OP-3 = MET**, in the `safari-app/desktop` cell — and `useSimulator: false` is carried so the app cell
is never read as the simulator cell (I-20's whole subject).

**OP-4 baseline, `safari-app/desktop`** ⟨`POST /session/<id>/execute/sync`⟩ →
`{"fc":"(forced-colors: active)","prt":"(prefers-reduced-transparency: reduce)","prm":"(prefers-reduced-motion: reduce)","fcMatch":false,"prtMatch":false,"prmMatch":false,"dpr":2,"iw":800,"ih":600}`.
**All three `.media` strings round-trip byte-identical** (a query Safari cannot parse serialises
`not all`; none does) ⇒ **that column is NOT foreclosed by UA capability**, so a row reporting
UNREACHABLE-IN-CELL there must name a reason that is not capability. The three `*Match` are `false`:
the host is not *in* those modes — a **baseline, not a finding**, and it binds **no other cell**.

⟨`curl -s -X DELETE :4601/session/7BB393EF-…`⟩ → **200** · ⟨`pkill -f 'safaridriver -p 4601'` ;
`lsof … | grep -c LISTEN`⟩ → **0**. Single-session discipline: `.b`/`.c`/`.d` open their own.

#### Act 2 — G-KFW9-14: the substrate pinned · **and OP-5 found BROKEN**

`evidence/W9/SUBSTRATE-PIN.md`. Pin, by command: ⟨`rev-parse --abbrev-ref HEAD`⟩ → `master`;
⟨`rev-parse HEAD`⟩ = ⟨`rev-parse origin/master`⟩ = **`55e9bf0d2391bbc6d9871bb3f0555a6225daae92`**;
⟨`rev-parse kf-sacred-snapshot-2026-09-17`⟩ → `6d280ee7…`; ⟨`merge-base --is-ancestor 8281638c
kf-sacred-snapshot-2026-09-17`⟩ → exit 0; ⟨`rev-parse kf-sacred-snapshot-2026-09-17^`⟩ →
**`8281638c0ac4…`** — the disqualified head is the snapshot's **direct parent**, preserved by ref and
never a witness substrate. ⟨`git diff --name-only 81a56990..55e9bf0d`⟩ → **exactly one docs path**, so
the source trees are identical and every byte-offset receipt the spec carries holds at the execution
substrate **without re-anchoring**.

**Six untracked kf files** named ⟨`ls-files --others --exclude-standard`⟩: 2 coordination letters + 4
`src/` files. The four are **orphans at pre-carve paths** — the live modules are at
`src/animation/compile/frame/{compiled-frame,interp-slot}.ts` ⟨`git ls-files | grep -E …`⟩, `value-ast`
and `composite-storage` have **no tracked file at any path**, **no importer resolves to an orphan**
⟨`git grep -nE '…' -- src demo test scripts | wc -l`⟩ → **0**, and mtimes are 2026-07-16.

**TWO tracked modifications, and the earlier draft's `0` is STRUCK.** ⟨`git diff --name-only`⟩ →
`package.json` · `package-lock.json` (⟨`--stat`⟩ → 2 files, +1007/−5). Content: a `vue-tsc` `check`
script + `eslint`/`eslint-plugin-vue`/`vue-tsc` devDeps — **KF.W4's type-cure chassis**, which OP-6
authorises to run concurrent with this wave. **This wave wrote none of it** (zero kf write grants).
⟨`git diff --name-only -- src/ demo/`⟩ → **0** and ⟨`ls-files --others -- demo/`⟩ → **0**: every byte
the gh-pages bundle compiles is identical to `55e9bf0d`.

> **THE BREAK.** ⟨`ls -la ../keyframes.js/dist/gh-pages/`⟩ → **`No such file or directory`**. The
> bundle the wave opened against (index.html 8,381 B + assets/ 53 entries, 13:37) **is gone**, and the
> earlier draft's hashes `bad6ea59…` / `5abf8bf7…` are **STRUCK** — they describe bytes nobody can
> re-hash. **Mechanism measured, not guessed**: ⟨`grep -n 'outDir:\|emptyOutDir:' vite.config.ts`⟩ →
> the production/lib branch sets **no** `outDir` ⇒ vite's default self-emptying `dist/`;
> ⟨`grep -n '"prepare"' package.json`⟩ → `36: "prepare": "npm run build:lib"`;
> ⟨`stat -f '%N %Sm'`⟩ → `package.json` **15:26:13** → `package-lock.json`/`node_modules/vue-tsc`
> **15:26:16** → `dist/keyframes.js` **15:26:18**. A sibling's install fired `prepare` → `build:lib`,
> which emptied `dist/` and took `dist/gh-pages/` with it.
>
> **`.a` does NOT rebuild.** A rebuild writes kf bytes; §Bounds is *"Do NOT touch — any keyframes.js
> byte"*; S-13 makes it a **bounds expansion → triumvirate, never a quiet build**. Booked whole at
> `SUBSTRATE-PIN.md` §7 with the fix, the grant it needs, and what must not happen instead.

**Gate reading — G-KFW9-14: RED → RED (correctly).** The pin is published and the harness stamps
`substrateRef`/`substrateSha`/`bundleSha256` on every row, but the gate closes on **captures** and `.a`
takes none: ⟨`git ls-files …/safari-real/ | wc -l`⟩ → **4** vs **31** on disk; ⟨`git ls-files …/shots/
| wc -l`⟩ → **0** vs **11**. *Recording a precondition holding as a gate closing is the failure this
wave exists to convict, and it is not done here.*

#### Act 3 — G-KFW9-4: the denominator re-derived with the AMENDED command

One script, both variants side by side, **run twice, identical**:

```
h2-only: 563 · h2+h3: 565 · records with items: 57 · files: 58
```

**Reproduces the published figure to the digit, including the struck 563.** The delta is *located*:
⟨`--delta`⟩ → `DELTA +2  kf-ChannelOptions.md`, and the pair is exactly the one the spec names —
⟨`sed -n '174p;223p;225p;226p'`⟩ → `## ADDENDUM R2` (`:174`) · **`### G. SS-13 additions (append to the
standing list)`** (`:223`, an **h3** nested under a non-matching h2) · item **11** dropdown WIDTH
overflow (`:225`) · item **12** focus-ring 2px bleed (`:226`). **563 + 2 = 565.**
⟨`--per-record | awk '$1==0'`⟩ → `kf-CubeAxisLines.md` — the one record of 58 with zero enumerated
items, which is why the figure is **57 of 58**.

The **25 prose-carried** re-read at their bytes: `kf-CubeAxisLines:104` *"nine-item queue … three
sharpenings"* (**9**) · `kf-TransportDock:122` *"1–8 carried from r1"* (**8**) · `kf-CubeTarget:83`
*"r1 items 1–4 and 6–8 unchanged"* + *"r1 item 5 is amended"* (**8**). **9+8+8 = 25. 565+25 = 590.**

**S-13's material-divergence trigger is NOT armed** — measured with the amended form, exactly 565, zero
divergence. *A seat that measures 563 has run the retired command, not found a corpus change*; the
retired form is named as a trap in the published list so it cannot manufacture one.

**Gate reading — G-KFW9-4: RED → RED.** The denominator re-derives (the gate's *precondition*); **0 of
590** probes have reached a terminal state. `.a`'s limb only.

#### Act 4 — G-KFW9-3: the scoped surface list PUBLISHED

`evidence/W9/SURFACE-LIST.md` + `SURFACE-LIST.json`. **590 addressable probe rows**, self-counted from
the settled bytes ⟨`node -e '…d.probes.length'`⟩ → **590** (565 enumerated + **the 25 prose-carried made
individually addressable** — a queue that is counted but not itemised is not a list and cannot reach a
terminal state per probe).

B18-26 carried verbatim from ⟨`sed -n '151p' …/intakes/lane-keyframes-b10-b21.md`⟩: *"TRUE as
arithmetic; UNPROVEN as coverage (manufactured denominator) … a Kronecker self-cross-product with no
product consumer … **the denominator must be replaced by KF.W9's own scoped surface list, not
inherited**"*. **73,568 REJECTED**; it appears in this wave only as the thing rejected.

**Seeds never denominators** ⟨`sed -n '215p' …/INTAKE-ADJUDICATION-2026-08-03.md`⟩ →
*"VISUAL-AUDIT-INPUT (marker; **10 rows — enumeration seeds, never denominators**)"*; V6-18/-19/-21/-22/-23/-28
(catalog-only) · V6-33 · V6-34 · CM-15 · XF-6 carried as **seeds**, none multiplied into anything.
**KF-AX-26 honoured and measured**: `excludedSurfacesInherited: 0`, `e2eExists: false` — the demo
gate's own exclusions are **not** inherited, because *the excluded surface is exactly the one no
instrument has ever seen*.

**Gate reading — G-KFW9-3: RED → GREEN.** BEFORE ⟨`head -10 REPORT.md`⟩ → *"4 matrices × 15 routes =
**60 captures**"*, the 2026-07-24 **value.js** corpus, *"not a kf-scoped list"*. AFTER: the list is
published, derived from the banked 590, seeds as seeds, KF-AX-26 honoured — and **no fraction is quoted
anywhere before it**, which is this gate's explicit fail condition.

#### Act 5 — G-KFW9-12: BOTH registers published WITH the list

`NEGATIVE-REGISTER.md`/`.json` — **6 records · 11 probes · 4 traps**, self-counted ⟨`node -e`⟩ →
`retired rows: 11 | traps: 4 | distinct records: 6`. **All fifteen re-read at their banked bytes**, not
carried from the spec's prose: `kf-KeyboardShortcutsModal:114` (*"R-A's Tab-reach probe is retired …
do not spend a probe on it"*) · `kf-KeyframesStringControls:161` (the four, with `:86`'s
`origin/master:77` measurement and `:194`'s two-limb disambiguation) · `kf-KeyframeCard:25`/`:109`
(L-10/C-5 **struck**, containment; KF-KC-28 survives) · `kf-MbabbMenu:165` (`useHideOthers` **MOOTED**
+ D-7's leading question) · `kf-TimelineTrack:146` (#12 checked-and-negative) · `kf-SequenceAxis:84`
(#5 killed). The **4 traps** verified byte-exact: ChromeDock `:23` (*"the discriminating observation is
combobox-vs-bare-div — handed to KF.W9"*) · SpringHeatmap `:107` (*"(Light→dark is NOT the tell — K-6.)"*
· *"cured-by-resize-not-by-retoggle is the signature"*) · EasingTarget `:66` (KF-ET-24, *"observable
only on a filter change while paused mid-scrub"*) · SquareScene `:145` (*"if the pixel tracks the swept
hue the row dies"*).

`ESCALATION-REGISTER.md`/`.json` — **13 armed triggers over 12 records**, self-counted ⟨`node -e`⟩ →
`triggers: 13 | distinct records: 12 | canReachBlocker: 3`. **The record figure is DERIVED, not
inherited**: each trigger homed by ⟨`grep -l`⟩ then its decisive line read. Two homings corrected in
the process — **KF-TD-8 is `kf-TypingDots`, not TransportDock**, and **KF-ES-3 is
`kf-EasingScene:42`** (the `jump-none`-faults-render limb), **not** `kf-EasingSidebar:41`'s
smooth-step-3 polarity row of the same id. Twelve records because (5)+(10) share
`kf-KeyframesAddDialog`, (7) and (13)'s KF-TFP-19 limb share `kf-TimingFunctionPanel`, and (13)'s other
limb `L-M-10/N-3` at `kf-KeyframesStringControls:159` supplies the twelfth. §H's figures **reproduce at
the bank**.

**Every probe carries a DISCRIMINATOR and a FALSIFIER** ⟨`node -e`⟩ → `every trigger has
discriminator+falsifier: true` · `every trap has discriminator+falsifier: true`. Baseline re-measured:
⟨`grep -rl 'PROVISIONAL' kf-*.md | wc -l`⟩ → **0** · ⟨`grep -rl 'ADDENDUM.*2026-09-17' kf-*.md | wc -l`⟩
→ **0**.

**Gate reading — G-KFW9-12: RED → GREEN.** BEFORE ⟨`ls …/evidence/W9/`⟩ → *"No such file or
directory"*, **no register exists**. AFTER: both published **with** the list, and both rules
**mechanized** rather than requested (act 6).

#### Act 6 — G-KFW9-2: the I-20 roster carved into the harness

**Witness moved**: ⟨`grep -c 'safari-app\|webkit-engine\|ios-device\|ios-simulator' capture.mjs
states.mjs`⟩ → **`capture.mjs:0 · states.mjs:0`** (born-RED) → **`capture.mjs:14 · states.mjs:10`**.
Ten cells in both files, with `ROSTER_DIGEST =
255695bc616c2a1420639ccf56848bdaf5df2c87618587c0c736fda4ef762035` — each file hashes its own `CELLS`
literal at run time, so **editing one roster without the other aborts the run**. (`REPORT.json`'s
`rosterDigest` matches the harness's: `true`.) The roster is duplicated because §Bounds makes those two
files the only writable harness surface; **divergence is made DETECTABLE rather than trusted**.

**The guards are exercised, not asserted** — lifted verbatim out of `capture.mjs` into a scratchpad
harness and run against real inputs:

```
-- assertCell (I-20) --
  THROWS: webkit driver wearing a safari-app label   -> I-20 VIOLATION: cell 'safari-app/desktop' requires driver 'safaridriver'…
  THROWS: chromium emulation wearing windows/real-HCM -> I-20 VIOLATION: cell 'windows/real-HCM' requires driver 'windows-host'…
  THROWS: a cell outside the ten-cell roster          -> I-20: 'safari-app/ipad' is not in the ten-cell roster
  PASSES: webkit driver in the webkit-engine cell · PASSES: safaridriver in safari-app/desktop
-- assertProbeTerminal (G-KFW9-12) --
  THROWS: a RETIRED probe re-entering · no discriminator · no falsifier · no sha256 · no cell
  PASSES: a fully-formed EXECUTED probe · PASSES: an UNMEASURED probe with nothing filled
```

⟨`node capture.mjs`⟩ (no `--bundle-sha`) → **aborts at `assertSubstrate`, before any browser launch** —
which also proves `rosterGuard()` passed with the injected digest, since execution reached it.
⟨`node states.mjs`⟩ → the same abort. Both ⟨`node --check`⟩ clean.

`states.mjs` additionally labels `forced-colors-desktop` as `chromium/emulated-forced-colors` under
`ENGINE=chromium` and **never** `windows/real-HCM` — *a chromium emulation labelled as WHC is the I-20
failure by name* (S-13). `safari-real-matrix.js` was **executed-not-written** (untouched: not in the
commit).

**Gate reading — G-KFW9-2: RED → GREEN at `.a`'s limb** (every roster label is expressible and
enforced, per-shot sha256 mandatory, OP-4 recorded per cell). The wave-level gate turns when results
exist.

#### Act 7 — the `REPORT.*` / `STATES.json` skeleton

Rewritten as the **kf-scoped** skeleton: substrate, ten-cell ledger (**all `UNMEASURED`**, every cell
present with its owning seat — *an absent cell is how a webkit reading lands in a safari column by
default*), denominator 590, both registers' figures, probe tally `UNMEASURED: 590`, and the OP-5 break
as a standing blocker. **Nothing destroyed**: the 2026-07-24 value.js corpus these files held is
tracked and recovers with ⟨`git show c0078d96:<path>`⟩ — named inside the new files, not merely known.

#### Locks, bounds and mail

- **S-1 discharged**: the chassis is committed at `dfe890e1`; **phase 2 may dispatch** (subject to the
  OP-5 blocker below, which `.b`/`.c`/`.d` cannot capture around).
- **Bounds clean**: ⟨`git diff --cached --name-only`⟩ → the 13 intended paths, nothing else.
  `scripts/dev/dev.sh` and `CARRY-LEDGER.md` arrived dirty and are **untouched/unstaged**;
  `docs/tranches/X/keyframes/waves/evidence/KF-W4/` (15:54) is a **sibling's**, not this seat's.
  `LEDGER.md` is not in `.a`'s writable set and was **not** edited.
- **Zero keyframes.js bytes written.** Zero glass-ui bytes. `safari-real-matrix.js` unmodified.
- **Mail**: no new mail in scope since seat 0's four-path sweep at open; `INBOX.md` tail remains
  **I-30**. **0 UNREAD.**

#### Residuals handed forward

1. **OP-5 / the gh-pages bundle — ESCALATED** (`SUBSTRATE-PIN.md` §7). Blocks `.b`/`.c`/`.d`'s capture
   limbs and therefore G-KFW9-1/-2/-14's capture halves. Needs a **named grant to write the kf tree**;
   the act itself is one command at `55e9bf0d` and moves no substrate.
2. **`bundleSha256` is unfilled by design.** Both harnesses abort without `--bundle-sha=`. Whoever
   rebuilds hashes the tree and passes it; **no seat may default it**.
3. **OP-4 is owed per cell.** Only `safari-app/desktop` has a reading, and it is a baseline that binds
   only that cell.
4. **Two kf tracked rows are dirty from KF.W4's chassis.** Recorded so no later seat reads a nonzero
   `git status` as a moved substrate; the source trees are identical.

##### `.a` ADDENDUM 16:14 — a SECOND blocker, found on the closing sweep

Re-measured after the chassis committed: ⟨`git -C ../keyframes.js diff --name-only -- demo/ | wc -l`⟩ →
**21** (it was **0** at 15:50), newest write **16:13:48** (`CubeScene.vue`, `OrbitalDrag.vue`,
`ControlsPaneWrapper.vue`); ⟨`rev-parse HEAD`⟩ → `55e9bf0d` **unchanged — the edits are uncommitted**.
**KF.W4's concurrent fan-out is editing the exact `demo/` surface this wave photographs.**

This is **harder than the missing bundle**, and it is not the same problem. A rebuild taken now would
compile 21 uncommitted files, so the artifact **could not honestly carry `substrateSha: 55e9bf0d`** —
a receipt against a moving substrate, the same class that disqualified `8281638c` in the first place
(§H's witness-substrate law). The capture band therefore has **two** unmet preconditions: **no bundle**
(curable by one command under a named grant) and **no stable source** (not curable by this wave at all).

**`.a` books it and stops** — no rebuild, no stash, no checkout of a sibling's worktree, and **no
softening of the substrate stamp so a capture can proceed anyway**. Three lawful shapes are offered for
the orchestrator's decision at `SUBSTRATE-PIN.md` §8 — **(a)** wait for KF.W4 to commit and re-pin ·
**(b)** build and serve from a clean clone at `55e9bf0d` (preserves the published pin exactly) ·
**(c)** re-pin forward to KF.W4's post-commit sha, with its stated cost. **Capturing now and stamping
`55e9bf0d` is named as the one option that is not available.** Commit `d629be8b`.

---

### `.c` — mobile-Safari / iOS cell · SERVED MODEL: claude-opus-5[1m] · 2026-09-17

**Commit**: `6119fe6f` — *"the mobile/iOS cells booked terminal — both foreclosed, 27 probes
UNREACHABLE-IN-CELL with hosts named, G-KFW9-11 RED→RED"*. **ONE commit**, 3 paths, all inside `.c`'s
writable set.

**Status: ESCALATED.** Both cells this seat owns are foreclosed on this host, **two of the three
foreclosures by conditions no grant to this wave could cure**. Nothing was substituted: no desktop shot
wears a mobile label, no simulator shot wears the device label, no engine reading enters a `safari-app`
column. **0 captures · 0 sidecars · 0 gates turned · 0 keyframes.js bytes.**

Record of substance: `…/audit/visual/safari-real/mobile-CELL-RECORD-2026-09-17.md` (+ its JSON twin);
seat index `…/evidence/W9/UNIT-C-MOBILE-INDEX.md`.

---

#### Act 0 — anchors verified at true bytes; two drifted, INTENT taken at the bytes

The dispatch carried `§Gates G-KFW9-11 (:220-244)` · `S-6 (:121-122)` · `S-7 (:123-124)` ·
`S-8 (:125-141)` · `§D carry (:137-147)`. At the file's true bytes ⟨`grep -n '^## '
waves/KF-W9.md`⟩ → `220:## Gates` · `245:## Sequencing`, so **the §Gates band resolves exactly as
given** and **the §Sequencing offsets do not** — `:121` is a §A carry bullet (`KF-SKEL-11`). Re-resolved
by heading and id, which is the sole anchor (R2-7): **G-KFW9-11 `:240`** · **S-6 `:252`** · **S-7
`:253`** · **S-8 `:254`** (families (iii) / (iii-a) / (iii-b) / (v) all inside that one line) ·
**§D carry `:137-147`** — that last one resolving exactly as dispatched
⟨`grep -n '^### '`⟩ → `137:### D · iOS / mobile / touch (the device session — family (v))`.
**Subjects are identical at both readings; only the offsets drifted.** Recorded, not worked around.

#### Act 1 — F-1: the `safari-app/ios-device` cell does not exist on this host

⟨`xcrun devicectl list devices`⟩ → **`No devices found.`**, **double-run, identical**. Two independent
corroborations: ⟨`system_profiler SPUSBDataType | grep -ic 'iPhone\|iPad'`⟩ → **0**;
⟨`xcrun xctrace list devices`⟩ → the whole `== Devices ==` section is **one entry, the host MacBook Pro**.

**Named missing host: a paired iOS device running Safari 26.x.** The bank forecloses every substitute by
its own words, carried at §Carry D: *"**KF.W9 owns the live witness** (zoom is hardware-only)"* and
*"only this wave's Safari-mobile cell can witness it."* A desktop window at 390 px does not auto-zoom on
focus — filing one as this cell would be I-20's convicted failure one cell over, the class S-13 names as
*"a chromium emulation labelled as WHC"*. Not done.

#### Act 2 — F-2: the `safari-app/ios-simulator` cell cannot be opened through the apparatus

18 simulators are installed (⟨`xcrun xctrace list devices`⟩ — `iPhone 16/17/Air Simulator (26.0)` …), so
the cell is foreclosed by the **driver**, measured:

⟨`safaridriver --help`⟩ → six options (`-h` `--version` `-p` `-b` `--enable` `--diagnose`); ⟨`safaridriver
--help | grep -ci simulator`⟩ → **0** — **the flag the roster names does not exist**.
⟨`curl -s :4605/status`⟩ → `{"value":{"message":"","ready":true}}` (the driver is up; `.a` opened a real
`safari-app/desktop` session on this same binary — the control).
⟨`POST :4605/session -d '{… "safari:useSimulator":true}'`⟩ → **`session not created: "The 'macOS'
platform is incompatible with requested capability: safari:useSimulator."`** — **double-run,
byte-identical**. ⟨`pkill -f 'safaridriver -p 4605'` ; `lsof … | grep -c LISTEN`⟩ → **0** (single-session
discipline; nothing left listening).

**Named missing host: a WebDriver endpoint able to host an iOS-Simulator Safari session.**

> **Dated correction-beside (E-3 — `.a`'s artifact NOT edited).** `evidence/W9/CELL-ROSTER.md` §1 row 3
> names this cell's driver **`safaridriver --use-simulator`**. That flag does not exist in `safaridriver`
> 26.4 and its capability form is refused by the platform. **The roster's cell *separation* is untouched
> and correct** — rows 2 and 3 stay distinct and `assertCell()` still throws; one **driver** cell is
> corrected, beside, at `mobile-CELL-RECORD-2026-09-17.md` §2.

#### Act 3 — F-3: the pin went stale **during** this seat's run

`.a`'s two blockers were re-measured at 16:17 and both stood: ⟨`ls -la ../keyframes.js/dist/gh-pages`⟩ →
`No such file or directory`; ⟨`git -C ../keyframes.js diff --name-only -- demo/ | wc -l`⟩ → **23**
(widened from `.a`'s 21). **At 16:20 both were gone and a third had replaced them**:
⟨`git rev-parse HEAD`⟩ → **`5388907b`** ⟨`git log --oneline -1`⟩ → *"build(kf/check): wire vue-tsc into
`check` … (X.KF.W4 .a / G-KFW4-1)"*; ⟨`git rev-parse origin/master`⟩ → **`55e9bf0d`** (unchanged);
⟨`git rev-list --left-right --count origin/master...HEAD`⟩ → `0	1` — **1 ahead, UNPUSHED**;
⟨`git diff --name-only -- demo/ | wc -l`⟩ → **0** (clean); ⟨`stat -f '%Sm %N' dist/gh-pages`⟩ →
**2026-09-17T16:17:47**, `index.html` 8,381 B, 51 assets; ⟨`shasum -a 256 dist/gh-pages/index.html`⟩ →
`b127991c0f1e9ff0ff662fd5fba329269c5d4c188190972eb652ceba9e05343e`.

**The bundle exists again and is built from `5388907b`, not from the pin**:
⟨`git diff --stat 55e9bf0d..5388907b`⟩ → **26 files changed, 1200 insertions(+), 73 deletions(-)**;
⟨`--name-only … -- demo/ | wc -l`⟩ → **23**; ⟨`… -- src/ | wc -l`⟩ → **0**. The 23 are this seat's
photographic subjects **by name** — `EditorShell.vue` (D-25's shell + the `initIOSPlatformClass()`
caller) · `CSSCodeEditor.vue` (R-9's sole `clampIOSNoZoomFontSize` consumer) · `ChromeDock.vue` (S-6's
whole session) · `EditorStartScreen.vue` (KF-EST-3/4, S-7's P-1/P-2 head) · `ControlsPaneWrapper.vue` ·
and `CubeScene.vue` / `OrbitalDrag.vue` / `EasingTarget.vue` / `useSquareDemo.ts` — **three of OD-V3's
four duplicating scenes**.

**Two consequences, neither softened.** (1) A capture from this bundle **cannot honestly carry
`substrateSha: 55e9bf0d`** — the receipt-against-a-moving-substrate class that disqualified `8281638c`
(§H's witness-substrate law), which `.a` named *"the one option that is not available."* Not taken.
(2) **`master == origin/master` is FALSE at the bytes** — the identity COHESION §0j.C **KF-WRITE** uses
to *define* this wave's execution substrate. **Re-pinning is G-KFW9-14's act**, escalated by `.a` to the
orchestrator at `SUBSTRATE-PIN.md` §8; **a phase-2 cell seat does not choose among its three shapes and
does not re-pin.** Note for whoever takes (c): `5388907b` is unpushed, and re-pinning re-points every
byte-offset receipt this wave carries across a 23-file demo delta.

#### Act 4 — OP-4, owed per cell and honestly untaken

The three `.media` strings are **NOT TAKEN** for either cell, because no session opens in either.
Booked **UNREACHABLE-IN-CELL with the host named** — which is what OP-4 demands instead of *"a silent
blank"* — and **explicitly NOT inherited** from `.a`'s `safari-app/desktop` reading (*"No cell inherits
another's"*).

#### Act 5 — every probe in scope booked terminal, with its exact precondition

**27 rows**, self-counted from the settled JSON by command, **double-run**:
⟨`node -e '…family_v.length + family_iii.length + odv3.cellsRequired + 1 + 3'`⟩ → **27 = published 27,
match true** (pass 1 and pass 2 identical). *The first writing of the cell said 26; the re-run corrected
it — the family-(iii) table's five rows carry **seven** subjects (`KF-APP-6`/`-8` and `KF-EST-3`/`-4`
are paired rows). The figure of record is the command's.*

- **S-8 family (v), 8 members** — R-9 · SP-4 · R-20/KAD-F4 · KF-KC-16/25 · KF-SCR-1 · i-13/C-3 · K-13 ·
  TimelineCaret probe 10 — all **UNREACHABLE-IN-CELL**. **The family is NOT double-spent**: no session
  opened, so none of the eight is spent and the family stays intact as one re-runnable unit. KAD-F4's
  armed trigger (**R-A's MAJOR**) is **neither revived nor resolved** and stays PROVISIONAL. K-13 stays
  owed **before either packet writes its focus cure** (S-7).
- **S-8 family (iii), 7 subjects** — KF-APP-6/-8 · EditorShell D-25/D-6 · TD-36 · KF-EST-3/4 — all
  **UNREACHABLE-IN-CELL**. **S-7's order is published and unspent** so the next seat inherits it, not its
  absence: KF-EST **P-1 first**, then **P-2**; **D-25 + KF-APP-6 in ONE 390×844 capture**, never
  separately; KF-APP-1's crash-witness before kf-CubeScene SS-13 #8.
- **S-8 (iii-a) — the OD-V3 390 arm: NOT PRODUCED, 0 of 8 cells** (4 scenes × 2 homes). **DISCRIMINATOR
  honoured** (nothing partial filed as satisfying it) and **FALSIFIER honoured** (no scene shot at 390
  alone, because none is shot). **Exact precondition written for KF.W10**, which §0j.C **KF-ODV3**
  authorizes it to close `complete_with_misses` upon: *a servable build whose source sha the capture may
  honestly stamp (F-3), rendered at 390 in a cell this host can open (F-1/F-2)*. **This seat rules
  nothing** — the transport-home ruling is the orchestrator's at KF.W10 `.g`, *"Never proxied."*
- **S-8 (iii-b) — OD-V5's 390 at-rest: NOT OBSERVED**, and **nothing is ruled**; OD-V5 stays DEFERRED
  pending glass's dock mark (§0j.C **KF-ODV5**). **Zero glass-ui bytes read or written.**
- **S-6 — the ChromeDock touch/menu session: NOT RUN.** M-5/C-6 witness, the M-4 rider check (the two
  kf-MbabbMenu MUST-CARRY riders, whose carrier's *cure as worded ships an unopenable menu*) and MM-4's
  computed-style falsifier all stay owed; `ChromeDock.vue` is itself inside the F-3 delta.

#### Act 6 — what *was* measured: the static anchors, re-verified at the pin, read-only

Taken with `git show`/`git grep` **at `55e9bf0d`**, never at the worktree, so they read the pinned
substrate exactly. **6 rows, all reproducing**: `viewport-fit` absent repo-wide ⟨exit 1⟩ against
`index.html:6`'s viewport meta (**D-25**) · `initIOSPlatformClass` at `EditorShell.vue:115`/`:133`
(decl `iosTextEntry.ts:14`) · `clampIOSNoZoomFontSize` decl `:10` with **exactly one** consumer
`CSSCodeEditor.vue:39`/`:137`, tested `:88`/`:89`/`:97` (**R-9**; G-KFW9-11's born-RED witness holds at
the pin) · **`autocapitalize` / `autocorrect` / `spellcheck` each `exit 1`, zero hits repo-wide**
(**R-20/KAD-F4/KF-KC-25**) · the three source-code `contenteditable` surfaces present
(`CSSPasteDialog.vue:17` · `KeyframeCard.vue:46`, its `<pre` at `:41` · `KeyframesAddDialog.vue`) ·
**six** `touch-action: none` scene declarations (`AmigaScene.vue:254` · `CubeScene.vue:12` ·
`CubeTarget.vue:4` · `OrbitalDrag.vue:350` · `SequenceTarget.css:134` · `SquareScene.css:64`), the
banked figure to the digit (**MISSED-F / i-13 / C-3**).

**This is the probes' SUBJECT reproducing; it is NOT the device witness and it closes nothing.** The
bank's standing — *"mechanisms closed statically, device confirmation outstanding"* — is left exactly
where it was.

#### Gate readings

| gate | BEFORE | AFTER | basis |
|---|---|---|---|
| **G-KFW9-11** | RED | **RED** | its CLOSES names *one real-iOS-Safari session*; neither iOS cell opens (F-1/F-2) and no servable build exists at the pin (F-3). The born-RED witness re-verifies at `55e9bf0d` (Act 6) — RED at its own witness, and not turned by a substitute cell |
| `.c`'s share of **-1 / -2 / -4 / -14** | — | **0 / 0 / 0 / 0** | 0 captures · 0 labelled rows · 0 probe discharges · 0 substrate-stamped shots, each stated as a zero rather than left to inference |

#### Locks, bounds and mail

- **Cell-disjoint with `.b` held**: this seat wrote **only** `safari-real/mobile-*` (2 files) plus
  `evidence/W9/UNIT-C-MOBILE-INDEX.md`. ⟨`git diff --cached --name-only`⟩ → exactly those 3.
- **Untouched on arrival and left so**: `scripts/dev/dev.sh` (unowned, NEVER), `CARRY-LEDGER.md`,
  `workflows/validate-completeness.mjs` (a sibling's, dirty when this seat arrived).
- **Zero keyframes.js bytes. Zero glass-ui bytes.** `safari-real-matrix.js` **not written and not
  executed** — it has no lawful bundle to point at. `capture.mjs`/`states.mjs` untouched (`.a`'s alone).
  `SURFACE-LIST.*`, `REPORT.*`, `STATES.json` untouched. No adjudicated record touched (`.e`'s alone).
- **`LEDGER.md` not edited** — no row cell of this wave changed state at this seat.
- **Mail (E13)**: no new mail in scope since seat 0's four-path sweep; `INBOX.md` tail remains **I-30**.
  **0 UNREAD.**
- **Probe parsimony**: two short `safaridriver` sessions, both terminated and verified closed; no
  Playwright, no DevTools-MCP, no page ever loaded.

#### Residuals and escalations handed forward

1. **F-1 — no paired iOS device. NOT curable by any grant.** Either a device is provided, or the horizon
   is re-planned so `safari-app/ios-device` is a **declared** UNREACHABLE cell for this pass and the
   family-(v) rows close as UNREACHABLE-IN-CELL at wave close rather than as owed.
2. **F-2 — the simulator cell cannot be opened by `safaridriver` 26.4. NOT curable by any grant.** It is
   also a **separate cell** and could not discharge G-KFW9-11's device witness even if it opened.
3. **F-3 — the pin is stale. CURABLE**, by the orchestrator taking one of `.a`'s three shapes at
   `SUBSTRATE-PIN.md` §8. **(a)** and **(c)** are now *available* where they were not at 16:14.
   **F-3 alone does not rescue this seat**: with a lawful pin and bundle there is still no mobile cell.
4. **If the orchestrator wants OD-V3's 390 arm taken in `safari-app/desktop` at a 390-wide viewport**,
   that is a **different cell, a different seat (`.b`) and a different filename prefix** — lawful only
   if labelled `safari-app/desktop`, and **not this seat's to file under `mobile-*`**. A wave-level call.
5. **Escalation class**: **S-13 — a gate failure not local-recoverable.** The spec's own head case is
   *"G-KFW9-1 RED because safaridriver cannot be enabled (**the named condition is unreachable → the
   horizon is re-planned, not faked with webkit**)"*. **This is that class at G-KFW9-11.**
