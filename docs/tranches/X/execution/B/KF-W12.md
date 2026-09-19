SERVED MODEL: claude-opus-5[1m]

# KF.W12 — Authoring-Surface Repair · EXECUTION RECORD (Track B · X·KF)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W12.md` (348 L, authored 2026-09-18 by the
SS-1/SS-2 fold seat, sitting date 2026-09-17, ref of record kf `69095552`).
**Wave status at this seat**: **BLOCKED-ON OP-0** — the spec's one HARD open precondition
(`G-KFW4-1` GREEN) is **RED at this seat's own clock, double-run: 54 · 54**. **No `§Bounds` product
byte was written by this seat**; the only bytes it wrote are this record, the LEDGER's own cells and
its event line. Baseline (7 gates), mail sweep, seven precondition receipts and the **full 7-unit
plan** are banked below so that a grant — or a KF.W4 repair landing — dispatches the wave without a
second open sitting.
**This is the SECOND wave of the SS-1/SS-2 block to meet this wall**; KF.W11's open attempt
(`025178c3`, record `execution/B/KF-W11.md`) returned **ESCALATION KF11-E1** on the same condition
hours earlier. The escalation this seat returns, **KF12-E1**, is that same conflict **with new
measured evidence** (§Open, the blocking finding).

> **ADDENDUM-BESIDE 2026-09-19 (SECOND SITTING, E-3 — nothing above or below this line is amended).**
> **KF12-E1 was RULED.** COHESION **§0u** (`085b2121`) answers it by name: OP-0 is a **RATCHET, not
> a threshold** — the chassis is the precondition, the count is banked at open and may not rise,
> each unit zeroes the diagnostics in its own §Bounds rows, and the literal zero is **KF.W13's
> close**. **KF.W12 is therefore OPEN.** Every figure below is the first sitting's, at kf
> `dd28da55`, and stands as that seat wrote it; the re-measured baseline at kf `bf4a9a9c`, the met
> preconditions, the withdrawn GREEN-BEFORE-CURE booking and the dispatch are in **`## Re-open —
> 2026-09-19`**, below the first sitting's `### Dispatch note`.

---

## Open

**Date**: 2026-09-19 (wall clock, 01:3x–02:0x EDT). **Sitting of record: 2026-09-17**, the owner's
begin-word (COHESION §0j).
**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`, VERIFY-AND-BANK only.
**Substrate named, never assumed**: keyframes.js sacred checkout `/Users/mkbabb/Programming/keyframes.js`,
`master` — ⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD` → **`dd28da55`**;
⟨cmd⟩ `… rev-parse --short origin/master` → **`dd28da55`** (local == remote). value.js `tranche-u`.
**Drift from the spec's ref of record**: ⟨cmd⟩ `git rev-list --count 69095552..HEAD` → **7** — the
seven KF.W10 close commits (`95e53f5e` · `b920b190` · `025e894c` · `27ec9c37` · `b50a23de` ·
`0a329c57` · `dd28da55`). **None touches a path this wave bounds**: ⟨cmd⟩ `git log --oneline
69095552..HEAD -- demo/scenes/cube/orbital-drag/` → *(no output)*; ⟨cmd⟩ `… --
demo/components/instrument/keyframes/composables/useKeyframeOps.ts` → *(no output)*. **Every byte
clause in §Gates below re-measures at `dd28da55` exactly as the spec measured it at `69095552`** —
9 clauses, 9 identical figures, each double-run (§Baseline).

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**, both
value.js-delivered mail packets (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md`,
`…-2026-07-27-library-band-r1-widened-k1-k4.md`) — **outside every KF.W12 writable path**.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **3 rows**:
`docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling seat's; untouched), `scripts/dev/dev.sh`
(**unowned, never staged, never touched**) and `?? docs/tranches/X/fourier/design/` (Track C's;
untouched). **No dirty path inside this seat's writable set** — `docs/tranches/X/execution/B/KF-W12.md`
did not exist, `LEDGER.md` clean, `INBOX.md` clean. **Zero inherited hunks; nothing to finish or
rewrite; nothing stashed, nothing restored.**

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification read from each row's **Status cell by
position**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded** (SELF-COUNT law).

1. **`docs/tranches/V/` + `V/coordination/`** — ⟨cmd⟩ `/bin/ls -t docs/tranches/V/*.md
   docs/tranches/V/coordination/*.md | head -8` → `INBOX.md` (self) then the five 2026-09-18 letters
   **that are ours and rowed**: `parse-that-inbox-…-evidence-addendum-2` = **O-38** ·
   `fourier-inbox-…-facility19-delta` = **O-37** · `glassui-inbox-…-r1-relay` = **O-36** ·
   `atlas-inbox-…-export-delta-refresh` = **O-35** · `keyframes-inbox-…-cut-notice` = **O-34**;
   `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md` = **O-31**.
2. **`../glass-ui/docs/tranches/BK/coordination/`** — **BK re-confirmed the newest tranche dir**:
   ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/` · `BJ/` · `BI/`. Newest letter
   `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**; the next,
   `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` = **O-26**, ours.
3. **`../keyframes.js/docs/tranches/V/coordination/`** — newest inbound-grammar file
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21 / I-26**, ours, delivered;
   `INBOUND-LEDGER.md` is keyframes' own ledger, not a letter.
4. **`../sci-report/atlas/docs/tranches/P/coordination/`** — newest
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12**, ours; path UNMOVED.

**Result**: **ZERO unrowed letters addressed to value.js · ZERO new `I-n` minted (register tail
stays I-35 / O-38) · ZERO UNREAD Status cells** — ⟨cmd⟩ `sed 's/\\|/@PIPE@/g' INBOX.md | awk -F'|'
'/^\| [IO]-[0-9]+[a-z]? \|/ {s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print
c+0}'` → **0**, over **78** rows (⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'` → **78**).
**`INBOX.md` NOT touched by this seat** — nothing to row, and a blocked open appends no sweep line
(the sweep is recorded here, dated; the next KF.W12 sitting re-runs it).

### Preconditions — every `Opens after` name, measured at the bytes AND in the ledger

| # | precondition (spec §State / §0) | this seat's measurement | verdict |
|---|---|---|---|
| **OP-0** | **`G-KFW4-1` GREEN** — the sequencing head; *"nothing in it is defensible until a `.vue` file can fail a build"*, five of the six records' own precondition | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` → **54** · **54** (double-run, at `dd28da55`). LEDGER KF.W4 row = **`CLOSED 2026-09-17 (honest-RED: G-KFW4-1 · G-KFW4-3 · G-KFW4-4 · G-KFW4-5 · G-KFW4-7)`**. | **RED — HARD. THE WAVE IS BLOCKED.** |
| **OP-1** | **KF.W11 `.a` — the OD latch family LANDED** (AXISLINE's upstream half; gates `.f` alone) | ⟨cmd⟩ `grep -c 'useEventListener(window, "keydown"' demo/scenes/cube/orbital-drag/OrbitalDrag.vue` → **1** · **1** (must read **0**); ⟨cmd⟩ `git log --oneline 69095552..HEAD -- demo/scenes/cube/orbital-drag/` → *(no output)*; LEDGER: KF.W11 **BLOCKED-ON OP-0**. | **UNLANDED** — gates `.f`; subsumed by OP-0. |
| **OP-2** | **KF.W11 `.b` — the `useKeyframeOps.ts` L-2 carve LANDED** (gates `.c` alone) | ⟨cmd⟩ `git log --oneline 69095552..HEAD -- …/composables/useKeyframeOps.ts` → *(no output)*; LEDGER: KF.W11 **BLOCKED-ON OP-0**. | **UNLANDED** — gates `.c`; subsumed by OP-0. |
| **OP-3** | **KC-34's edict** — the highlight path stops replacing Vue-owned DOM BEFORE KC-8/KC-9 | `.a`'s first commit is KC-34; enforced at §Sequencing order 2 and G-KFW12-1's order clause. | **BY CONSTRUCTION** — an ordering obligation, not an open-blocker. |
| **OP-4** | **the `cssIdent` publication** (library half KF.W5; demo half = APPLY-UNIT) | ⟨cmd⟩ `grep -c 'cssIdent' dist/keyframes.d.ts` → **2** · **2**; ⟨cmd⟩ `grep -rc 'cssIdent' demo \| grep -v ':0$'` → `demo/utils/helpers.ts:1` · **1** (a comment). | **PRESENT AT THE ARTIFACT, ABSENT AS A CONSUMER** — exactly as the spec measured; re-measured at `.e`'s open. |
| **OP-5** | **the glass-ui producer half of KF-CO-1/KF-CO-8** (`default: undefined`) | producer-side; the consumer cure is ours and lands regardless; the row rides SS-6 (COHESION §4a). Glass-ui **READ-ONLY, always**. | **NOT BLOCKING** — a relay obligation at `.g`. |
| **OP-6** | **KF.W0's two frontier repairs (KFED)** — verify WHICH exist before spending a cure | ⟨cmd⟩ `grep -c 'startScalar' …/components/KeyframeCardList.vue` → **2** · **2** (FE-3 present at the frontier). | **RECEIPT OBLIGATION** — `.c`'s first act; not an open-blocker. |

**Ledger-side reading of the spec's other `Opens after` names**, each verified in
`execution/LEDGER.md` Track B **and** at the bytes:

- **KF.W6 CLOSED 2026-09-17 (honest-RED)** — ⟨cmd⟩ `git ls-tree origin/master -- demo/components/instrument/shell/EditorHeader.vue` → *(no output)*: the file is gone, the R4-1 atomic adoption landed. **MET.**
- **KF.W7 CLOSED 2026-09-17** — KF-CE-2's parent half is W7's landed work; the six-surface verdict table (`4c03ceda`) is KEEP-BESPOKE ×6, **discharge set EMPTY**. **MET.**
- **KF.W8 CLOSED 2026-09-17 (honest-RED)** — ⟨cmd⟩ `git ls-tree origin/master --name-only -- demo/components/instrument/keyframes/components/KeyframeCard.vue` → the path exists (the card cluster moved); ⟨cmd⟩ `git cat-file -t 34b051eb` → `commit`. **MET.**
- **KF.W0 CLOSED 2026-09-17** — the §B-12 re-baseline law inherited; OP-6's guard obligation stands. **MET.**
- **KF.W11** — `planned` · **BLOCKED-ON OP-0**; its `.a` and `.b` commits do not exist (OP-1/OP-2 above).

**Only OP-0 blocks the wave.** OP-1 and OP-2 gate one unit each and are themselves downstream of OP-0.

### The blocking finding, stated whole — ESCALATION KF12-E1

The spec is unambiguous about its own open condition. §State: *"**Opens after**: **G-KFW4-1 lands
GREEN** (the sequencing head … **measured RED at this seat, twice**: … → **54** · **54** …; **this
is the hardest precondition this wave has, because every defect it cures lives in the one surface
nothing type-checks**)"*; §0 row OP-0: *"**RED — 54 · 54.** HARD."*; §0's closing line: *"**OP-0 is
hard.**"* The RUNBOOK states it a third time (§1.2, the edge table: *"KF.W4 = head … 'No repair
packet and no UNIT may open before **G-KFW4-1** lands' — eight banked records state it
independently"*; and for the minted three: *"all 17 sequence after G-KFW4-1"*). This seat
re-measured that figure, unmoved, at a later HEAD: **54 · 54**. **Under the spec that GOVERNS, the
wave does not open. That is this seat's act, and it is the conservative one.**

**The head's own close dispositions these three successors the other way** — `execution/B/KF-W4.md`
CHECK 1 `:2191` and CHECK 2 `:2505`, verbatim row: *"| **KF.W11 · W12 · W13** | §Sequencing 'No
repair packet and no UNIT may open before **G-KFW4-1** lands' | the gate's **chassis landed** —
wired, running, on the merge path, its diagnostics owner-named | not blocked by this wave's RED;
they await the SS-1/SS-2 authoring block |"* — and that awaited condition **has landed** (`f208ff31`,
2026-09-18: the three specs of record exist). **A fresh, independent seat read it the other way
eighteen hours later**: X.KF.W10's CHECK 1 event line (LEDGER `:317`) states *"**Successors**: none
of KF.W11/W12/W13 names KF.W10 in its `Opens after`; all three are **lawfully blocked on
`G-KFW4-1` GREEN**, a sibling wave's carried honest-RED (54 `vue-tsc` errors)"*. **Two conformant
readings, opposite verbs, on one condition** — that is the escalation, and it is KF11-E1's, raised
again here because it now blocks a second wave.

**NEW EVIDENCE THIS SEAT ADDS — the circularity is not rhetorical; it is 37 of the 54 diagnostics.**
⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep 'error TS' | sed 's/(.*//' | sort | uniq -c
| sort -rn` decomposes the head's RED **by file**:

```
  24 demo/scenes/cube/orbital-drag/OrbitalDrag.vue          ← KF.W11 `.a`'s own writable surface
   3 …/transport/channel-controls/composables/useTimingFunctionEditor.ts   ← KF.W12 `.b`
   2 demo/scenes/easing/useEasingDemo.ts                     (no packet)
   2 demo/scenes/easing/EasingScene.vue                      (no packet)
   2 demo/scenes/cube/matrix-editor/useTransformState.ts     (KF.W11 P1)
   2 demo/components/instrument/transport/TransportDock.vue  (KF.W13)
   2 …/instrument/keyframes/KeyframesStringControls.vue      ← KF.W12 `.d`/`.e`
   2 …/instrument/keyframes/KeyframesEditor.vue              ← KF.W12 `.a`/`.c`
   2 demo/app/dock/MbabbMenu.vue                             (KF.W13)
   1 src/animation/physics/smooth.ts · 1 src/animation/group/waapi.ts · 1 …/composite/compositor.ts
   1 demo/scenes/spring/useSpringDemo.ts · 1 demo/scenes/cube/matrix-editor/MatrixEditor.vue
   1 demo/scenes/cube/CubeScene.vue · 1 demo/scenes/easing/EasingSidebar.vue      ← `.b`'s carve
   1 …/channel-controls/TimingFunctionPanel.vue · 1 …/LayerConfigPanel.vue
   1 …/channel-controls/ChannelOptions.vue · 1 …/channel-controls/ChannelControls.vue   ← KF.W12 `.b`
   1 demo/components/instrument/shell/EditorShell.vue        (excluded here; §Excluded)
   1 …/instrument/keyframes/composables/useKeyframeOps.ts    ← KF.W12 `.c` (after KF.W11 `.b`)
```

⟨cmd⟩ by code → `20 TS2339 · 15 TS6133 · 5 TS2322 · 4 TS2379 · 3 TS7053 · 3 TS2769 · 2 TS2367 ·
2 TS2345` (sums to 54 ✓, SELF-COUNT). **Mapped onto §B.2's writable rows: 13 of the 54 sit inside
KF.W12's own bounds** (`KeyframesEditor.vue` 2 · `useKeyframeOps.ts` 1 · `KeyframesStringControls.vue`
2 · `ChannelOptions.vue` 1 · `LayerConfigPanel.vue` 1 · `TimingFunctionPanel.vue` 1 ·
`useTimingFunctionEditor.ts` 3 · `ChannelControls.vue` 1 · `EasingSidebar.vue` 1 — the last with the
carve caveat, `:27` being one of the two seat call-sites `.b` owns) **and 24 more sit in KF.W11
`.a`'s. 37 of 54 — 69% — belong to the two waves the head blocks.** COHESION §0m.1 already ruled the
behavioural remainder *"**honest-RED with named owners** (KF.W6 / the UNIT packets KF.W12–13)"*.

**And six of this wave's thirteen are the type-level shadow of its own named cures** — the diagnostic
text, quoted:

| diagnostic | the cure it is the shadow of |
|---|---|
| `KeyframesEditor.vue(76,73)` · `(81,41)`: *"Property 'value' does not exist on type 'KeyframeSelector'"* | **KC-2 ≡ KF-KE-2** — the frozen-selector write at `:81` and the fraction read at `:76`, the wave's headline card-seam cure |
| `LayerConfigPanel.vue(87,10)`: *"Argument of type '{ label: string; tooltip: string; checked: boolean…"* | **KF-CO-8 ≡ LP-3** — the `:checked`/`@update:checked` switch rewire |
| `ChannelOptions.vue(272,34)`: TS2379 *"{ modelValue: string \| undefined; 'onUpdate:modelVa…"* | **KF-CO-1 / OP-5** — the Boolean-cast prop family |
| `TimingFunctionPanel.vue(32,14)` · `EasingSidebar.vue(27,14)`: the identical TS2379 *"{ key: string; mode: 'steps' \| 'bezier'; preset…"* | **KF-TFP-1 ≡ KF-ES-12** — the two `EasingPicker` seat call-sites `useEasingPickerSeat` unifies |
| `KeyframesStringControls.vue(75,5)`: *"'getTmpAnimationName' is declared but its value is never read"* | **KF-KE-4** — whose disposition reads *"class = selector, **or pass `getTmpAnimationName()` as the class**"*: the unused import **is** the missing identity |

**So the head's RED and this wave's cargo are the same defects seen at two altitudes.** This seat
takes no verb from that reading — it does not open the wave, and it writes no product byte. It
returns the measurement, because whichever way the sitting rules, the ruling should be made over
these numbers rather than over the sentence alone. **Two dispositions are available and neither is
a seat's to take**: (a) **KF.W12 stays blocked** and a KF.W4 repair seat drives 54 → 0 first — but
37 of the 54 live in bounds that belong to KF.W11/KF.W12 and are out of KF.W4's, so that seat
either widens by dated addendum or hands them straight back; or (b) **the head is read as
CHASSIS-LANDED** (KF-W4.md CHECK 1/2's own row) and KF.W11 · KF.W12 · KF.W13 open with the
diagnostics **inside their own bounds** booked as each wave's own acceptance obligation —
G-KFW12-7 already carries that clause verbatim (*"`npx vue-tsc --noEmit … | grep -c 'error TS'` →
**0** (OP-0 re-run at close)"*), which makes (b) auditable rather than permissive.
**ESCALATION KF12-E1 is returned unresolved. This seat does not choose.**

---

## Baseline — the seven gates, run READ-ONLY at `dd28da55`, double-run

All commands from `/Users/mkbabb/Programming/keyframes.js`. **SELF-COUNT**: ⟨cmd⟩ `grep -c
'^\*\*G-KFW12-' docs/tranches/X/keyframes/waves/KF-W12.md` → **7** (value.js-relative); seven gates
banked, seven rows below.

| gate | command (spec §Gates) | reading (run 1 · run 2) | verdict |
|---|---|---|---|
| **G-KFW12-1** | `npx vitest run --project demo test/demo/instrument/keyframe-card-offset-loop.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-2** | `npx vitest run --project demo test/demo/instrument/channel-options-render-edge.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-3** | `npx vitest run --project demo test/demo/instrument/keyframes-editor-honest.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-4** | `npx vitest run --project demo test/demo/instrument/css-code-editor-seam.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-5** | `npx vitest run --project demo test/demo/instrument/apply-css-identity.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-6** | `npx vitest run --project demo test/demo/scenes/cube-axis-reveal.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-7** | `npm run test:demo 2>&1 \| tail -3` ⊕ `npx vue-tsc … \| grep -c 'error TS'` ⊕ the skip/anti-re-book/SS-6 clauses | **test:demo `Test Files 39 passed (39)` / `Tests 286 passed (286)` — GREEN-AT-OPEN**; vue-tsc **54 · 54** — RED | **RED on the vue-tsc clause; see GREEN-BEFORE-CURE (1)** |

**The six absent files, proven absent rather than asserted** — ⟨cmd⟩ `ls <path>` for each of the six
`create` rows of §B.2 → `No such file or directory` ×6 (double-run). That is the sole cause of the
six `No test files found` readings; every one is **RED-AS-EXPECTED (born-RED)**, none is UNRUNNABLE.

### Byte clauses — nine, every one reproducing the spec's authoring figure (double-run)

| clause | gate | reading (run 1 · run 2) | spec's figure at `69095552` | drift |
|---|---|---|---|---|
| `grep -c 'frame.start.value = starts' …/keyframes/KeyframesEditor.vue` | G-1 | **1 · 1** | 1 | none |
| `grep -rc ':is-open' …/transport/channel-controls \| grep -v ':0$'` | G-2 | `LayerConfigPanel.vue:1` · `ChannelOptions.vue:3` (=**4**) · same | ×4 (§B.1 row 7's correction) | none |
| `grep -c '@update:checked' …/LayerConfigPanel.vue` | G-2 | **1 · 1** | 1 | none |
| `grep -c 'parseCssScalar' …/keyframes/KeyframesEditor.vue` | G-3 | **2 · 2** | 2 | none |
| `grep -c 'class="absolute top-2 right-4' …/keyframes/components/KeyframeCard.vue` | G-3 | **1 · 1** | 1 | none |
| `grep -c 'toLowerCase()' …/keyframes/composables/useKeyframesState.ts` | G-3 | **1 · 1** | 1 | none |
| `grep -c 'tabFocusMode' …/keyframes/CSSCodeEditor.vue` | G-4 | **0 · 0** (and `accessibilitySupport` **1 · 1**) | 0 / 1 | none |
| `grep -c 'isFormatting' …/keyframes/KeyframesStringControls.vue` | G-4 | **4 · 4** | 4 | none |
| `grep -c 'cssIdent' dist/keyframes.d.ts` ⊕ `grep -rc 'cssIdent' demo \| grep -v ':0$'` | G-5 | **2 · 2** ⊕ `helpers.ts:1` · same | 2 ⊕ 1 (a comment) | none |
| `grep -c 'useEventListener(window, "keydown"' …/orbital-drag/OrbitalDrag.vue` | G-6 | **1 · 1** | 1 | none |

**The headline defect reproduces in a two-line grep** (G-3's witness): ⟨cmd⟩ `grep -rc
'keyframes-style-' demo | grep -v ':0$'` → `…/composables/useKeyframesState.ts:2` · same — the class
at `:16` and the lowercased strip at `:42`, `"keyframes-style-" + X ≠ X.toLowerCase()`
unconditionally (**KF-KE-4**).

**AXISLINE anchors re-read** — ⟨cmd⟩ `grep -n 'rotateY\|rotateZ\|1000vw' demo/scenes/cube/CubeAxisLines.vue`
→ `:63 width: 1000vw;` · `:113 transform: rotateZ(90deg);` · `:117 transform: rotateY(90deg);`
(the spec's §Gates recorded `:63 · :113 · :117` — **identical**; note §Scope 6's prose cites `:117`
for the `rotateY` and `:113` for the `rotateZ`, which is what the tree reads).

### GREEN-BEFORE-CURE (R.2) — two, both booked, neither claimed

1. **G-KFW12-7's `npm run test:demo` limb is GREEN AT OPEN** — `Test Files 39 passed (39)` /
   `Tests 286 passed (286)` / `Duration 3.59s`. The spec calls this gate *"RED by construction (six
   absent files)"*: that is true of the **gate**, whose GREEN requires those six files to exist and
   pass, but **the literal command in the gate's own text passes today**. Booked as a finding, not
   as progress: **G-KFW12-7 is RED only by its `vue-tsc` (54), skip-census, anti-re-book and SS-6
   clauses**, and `.g` must not read the 39/286 as a discharge. The 39 files are the denominator
   the six creations grow to **45**.
2. **KF-AX-9's three raw `180ms` token rider — `LANDED-BY KF.W6`** (the spec's own declared
   booking, §B.1 row 9). Re-measured: ⟨cmd⟩ `grep -n '180ms' demo/scenes/cube/CubeAxisLines.vue` →
   `:41` and `:81`, **both inside comments**, no declaration. Re-measured again at `.f`'s open;
   never claimed as this wave's work.

**No other gate or clause reads green before its cure.**

---

## Unit plan — 7 units, 4 phases, peak concurrency 2 (inside the four-workflow cap)

**Order (spec §Sequencing, binding)**: `.a ∥ .b → .c ∥ .d → .e ∥ .f → .g`.
**Tiering (M-12 TRI-FOLD, spec §Execution shape)**: the three **design-shaped** units — `.b` (the
five-step order + the `useEasingPickerSeat` specification), `.c` (the apply identity), `.d` (the
Monaco arm with its byte budget) — are **Fable-worker ∥ Opus-worker → fresh-Fable arbiter**; `.a`,
`.e`, `.f`, `.g` are **Opus solo**.
**Worktrees**: parallel units in sibling worktrees `keyframes-kfw12-<unit>`, merged by the
orchestrator in phase order; serial dependents open on the merged sha named in the predecessor's
receipt. **No Cargo.**
**Disjointness**: eight shared paths, each resolved SERIALLY by the phase order and never in
parallel — `KeyframeCard.vue` · `KeyframesEditor.vue` · `useHighlightCSS.ts` (`.a`→`.c`);
`useKeyframesState.ts` · `useApplyCSS.ts` · `useKeyframeBrushApply.ts` (`.c`→`.e`);
`KeyframesStringControls.vue` · `RibbonBar.vue` (`.d`→`.e`). Cross-wave serial: `useKeyframeOps.ts`
(KF.W11 `.b` → this `.c`) and `ChannelOptions.vue` (this `.b` → KF.W13's KF-CO-15 carve).
**Every unit**: receipt appended to THIS file with `SERVED MODEL` line 1, commands double-run,
SELF-COUNT, inherited paths named (CRASH-RECOVERY), out-of-bounds = ESCALATION returned.

| unit | phase | model | opens after | gate | spec sections |
|---|---|---|---|---|---|
| **KF.W12.a** CARD-UNIT | 1 | opus | OP-0 | G-KFW12-1 | §Agent Units `:180-184` · §Carry U1 `:150-152` · §Scope 1 `:53` · §B.2 `:92-95`,`:118`,`:124` · §Gates `:232` |
| **KF.W12.b** OPTIONS-UNIT | 1 | fable (tri-fold) | OP-0 | G-KFW12-2 | §Agent Units `:186-190` · §Carry U2 `:154-156` · §Scope 2 `:54` · §B.2 `:109-116`,`:119` · §Gates `:234` |
| **KF.W12.c** KFED-UNIT | 2 | fable (tri-fold) | `.a` ⊕ KF.W11 `.b` (OP-2) ⊕ KF.W0 (OP-6) | G-KFW12-3 | §Agent Units `:192-196` · §Carry U3 `:158-160` · §Scope 3 `:55` · §B.2 `:93-102`,`:120`,`:124` · §Gates `:236` |
| **KF.W12.d** EDITOR-UNIT | 2 | fable (tri-fold) | OP-0 | G-KFW12-4 | §Agent Units `:198-202` · §Carry U4 `:162-164` · §Scope 4 `:56` · §B.2 `:104-108`,`:121`,`:124` · §B.3(1)(2) `:134` · §Gates `:238` |
| **KF.W12.e** APPLY-UNIT | 3 | opus | `.c` ⊕ `.d` (OP-4 re-measured) | G-KFW12-5 | §Agent Units `:204-208` · §Carry U5 `:166-168` · §Scope 5 `:57` · §B.2 `:100-108`,`:122` · §Gates `:240` |
| **KF.W12.f** AXISLINE-UNIT | 3 | opus | KF.W11 `.a` (OP-1) | G-KFW12-6 | §Agent Units `:210-214` · §Carry U6 `:170-172` · §Scope 6 `:58` · §B.2 `:117`,`:123` · §Gates `:242` |
| **KF.W12.g** Close | 4 | opus | `.a`..`.f` | G-KFW12-7 | §Agent Units `:216-220` · §Scope 7 `:59` · §B.2 `:125-128` · §Gates `:244` · §Commit plan `:315-325` |

### KF.W12.a — CARD-UNIT (phase 1, Opus)

**Writable** (kf): `demo/components/instrument/keyframes/components/KeyframeCardList.vue` ·
`…/components/KeyframeCard.vue` (the a11y triad + the ref contract only — serial → `.c`) ·
`…/keyframes/KeyframesEditor.vue` (the card seam `:76-88` only — serial → `.c`) ·
`…/keyframes/composables/useHighlightCSS.ts` (KC-34 only — serial → `.c`) ·
`test/demo/instrument/keyframe-card-offset-loop.test.ts` (create) · the existing witnesses of §B.2
`:124` it owns. (value.js): `docs/tranches/X/execution/B/KF-W12.md` (append) ·
`docs/tranches/X/keyframes/evidence/W12/**` (create).
**Locks**: KC-34 **before** KC-8/KC-9 (OP-3; G-KFW12-1's order clause reads `git log`); **KC-2 ≡
KF-KE-2's freeze-and-unit commit MUST NOT SPLIT**; KC-1 lands with KC-27.
**Brief**: In KC-34's order: stop the highlight path replacing Vue-owned DOM (commit 1, before any
keep-mounted byte); KC-1 render `selectorText(frames[i].start)` — the surviving obligations after
FE-3's `startScalar` (fraction-for-percent, the named-selector fallthrough, the canonical renderer
bypass), landing WITH KC-27's offset-bearing aria names; KC-2 ≡ KF-KE-2 in ONE commit — read via
`selectorPercent`, write by whole-selector replacement through `percentSelector`
(`demo/utils/keyframeSelector.ts:44`/`:49`), domain `0..100`, fractional step, `marks`, per-thumb
`aria-valuetext`, KF-KE-34 riding, freeze and unit fixed together (KF-KC-19's `0..1`/`−10..110`
pair routed through the total pair); KC-8/KC-9 keep-mounted (the one-timer-for-N-cards loss);
KC-10 removal + KF-CB-11's shell; KC-28/-29; KC-17/-18/-32; the tail; then KF-KC-48, its RED run
pasted before its GREEN. Record the shas `.c` opens on.

### KF.W12.b — OPTIONS-UNIT (phase 1, Fable-worker ∥ Opus-worker → fresh-Fable arbiter)

**Writable** (kf): `…/transport/channel-controls/ChannelOptions.vue` · `…/LayerConfigPanel.vue` ·
`…/TimingFunctionPanel.vue` · `…/composables/useTimingFunctionEditor.ts` ·
`…/composables/useEasingPickerSeat.ts` (**create**) · `…/ChannelControls.vue` (carve: KF-CO-5/-46's
`inert` posture ONLY — the L-2/C-2 `:key` row is KF.W7's and is NOT touched) ·
`…/transport/controls-pane/ControlsPaneWrapper.{vue,css}` (carve) · `demo/scenes/easing/EasingSidebar.vue`
(**the two `EasingPicker` seat call-sites ONLY**) · `test/demo/instrument/channel-options-render-edge.test.ts`
(create). (value.js): the receipt + `evidence/W12/**`.
**Locks**: **KF-CO-1 (×4) + KF-CO-8 + LP-1 in ONE commit** (the write→render lock; G-KFW12-2's lock
clause); **the five-step order IS the commit order** (a persistence cure landed first fails the gate
even if every row is green); the one-prop cure for KF-TFP-1 is **DEAD** (register #3).
**Brief**: Commit 1 = the capability restorations ON the render edge: `:is-open`→`:open` ×4
(`ChannelOptions.vue:96`/`:120`/`:479` + `LayerConfigPanel.vue:11`) + the switch `:model-value` /
`@update:model-value` rewire (`:90-91`) + LP-1's whole prop surface (`blendAvailable`,
`singleTarget`'s post-mount recompute), **the producer's prop name quoted from the installed `.d.ts`**
— a guessed name is a copied producer selector, a HIGH defect. Then step 2 (KF-CO-3/-4/-11/-12/-13/
-14/-16/-17), step 3 (KF-CO-9 ≡ TFP-6 · -10 · -40 ≡ TFP-5), step 4 (KF-CO-5 ≡ TFP-7 + -46's `inert`
+ focus), step 5 (hygiene + LP-20 tail), each its own commit in sequence. Beside the order:
**specify `useEasingPickerSeat` in this receipt before the byte** (seed · key · live-state echo
predicate · container CSS · one parameter for where truth lives), then create it and consume it at
both seats; D-B1/N-2/C-2's inset via `:style` on `<DrawerContent>` (never the scoped selector) with
D-M12's detent budget recomputed in the same edit; the `proof:stage-visible` residue; KF-CO-15's
options half; **write the KF-CO-47 decision down**. Producer rows → SS-6 at `.g`.

### KF.W12.c — KFED-UNIT (phase 2, Fable-worker ∥ Opus-worker → fresh-Fable arbiter)

**Writable** (kf): `…/keyframes/KeyframesEditor.vue` (the rest, after `.a`) ·
`…/keyframes/components/KeyframeCard.vue` (KF-KE-5's z rung + the `:38-47` comment) ·
`…/composables/useHighlightCSS.ts` (KF-KE-6, `:30-33`/`:58-61`) · `…/composables/useKeyframesEditor.ts` ·
`…/composables/useKeyframeOps.ts` (**after KF.W11 `.b`'s L-2 hunk; that hunk never re-touched**) ·
`…/composables/useToolbarKeyboard.ts` · `…/components/KeyframesAddDialog.vue` (carve) ·
`…/composables/useKeyframesState.ts` (the identity — serial → `.e`) · `…/composables/useApplyCSS.ts`
(serial → `.e`) · `…/composables/useKeyframeBrushApply.ts` (KF-KE-12 — serial → `.e`) ·
`test/demo/instrument/keyframes-editor-honest.test.ts` (create). (value.js): the receipt +
`evidence/W12/**`.
**Locks**: OP-6's frontier verification is the FIRST act and its own value.js commit; the apply
identity is **decided in the receipt before a byte** and **proven by execution, both strings pasted**
(a fix proven by reading is the exact failure that let four audits miss KF-KE-4); KF-KE-7's gate and
KF-CB-11's shell land together; KF-KE-8's PRM is one motion with `.e`'s D-25.
**Brief**: Verify and receipt WHICH KF.W0 frontier repairs exist (`startScalar` 2, EE-03's
length-watch) — a cure written from the bank alone re-introduces a fixed defect. Then KF-KE-4: one
apply identity — class = selector, or pass `getTmpAnimationName()` as the class — killing the
`"keyframes-style-" + X` / `X.toLowerCase()` mismatch at `useKeyframesState.ts:16`/`:42`, executed,
both strings pasted; re-derive L-M3/C-B2's residue against a working feature. Then KF-KE-6's lift
(per-animation, refcounted node ownership across the three-closures seam); KF-KE-12 ≡ N-5's
`clear()` wired into `onUnmounted`; KF-KE-3's `requireKeyframeSelector` at the field (retiring
`parseCssScalar` at `:240`/`:303`, S-5/C-S5 posture kept); KF-KE-5's z rung (or drop the `<pre>`'s
`relative`) **with the `:38-47` comment re-written to describe what is there**; KF-KE-7; KF-KE-8;
the pipeline half of -24; the tail (-10..-66 as rostered); SPF-11/-19/-20/-23. Record `.e`'s shas.

### KF.W12.d — EDITOR-UNIT (phase 2, Fable-worker ∥ Opus-worker → fresh-Fable arbiter)

**Writable** (kf): `…/keyframes/CSSCodeEditor.vue` · `demo/utils/helpers.ts` (**`debounce` only,
`:31-39`, an additive `.cancel` handle — lands ALONE**) · `…/keyframes/monaco-themes/{Dracula,GitHub}.json`
(**conditional on arm (a)**) · `…/keyframes/KeyframesStringControls.vue` (the `isFormatting` latch —
serial → `.e`) · `…/transport/controls-pane/RibbonBar.vue` (the `:28`-class format path — serial →
`.e`) · `test/demo/instrument/css-code-editor-seam.test.ts` (create). (value.js): the receipt +
`evidence/W12/**`.
**Locks**: **KF-CE-3 is the unit's FIRST commit** (the WCAG 2.1.2 keyboard trap outranks the
highlighting — the bank's ruling on `5fe2e4cb`); the KF-CE-1/-4 fork is **decided in the receipt
before any byte** with `vendor-monaco` **re-measured** (U.D5's 4.18→2.53 MB is never re-cited as
like-for-like); the "cheap highlighting-only import" is **DEAD**; the `debounce` change lands alone
with its three-consumer LAW A census pasted first; no `node_modules/monaco-editor` patch (HIGH).
**Brief**: Commit 1 — `tabFocusMode: true` at create (contrib-free), leaving
`accessibilitySupport: "off"` at `:176` for KF-CE-5's un-propping. Then write the fork down: arm (a)
restore the contribution set (bytes and a11y contribs return) or arm (b) hand-register a Monarch
tokenizer + `setLanguageConfiguration` (bytes stay saved; comment-toggle/find/context-menu stay
absent **by decision and are said to be absent**) — either way re-measure `vendor-monaco` and paste
the delta. Then the additive `debounce.cancel` (census = `CSSCodeEditor.vue` · `useKeyframeOps.ts` ·
`useKeyframesParsing.ts`; the receipt states no consumer's behaviour changes when it does not call
`.cancel()`); KF-CE-2's child half through one `replaceContent()` seam (cancel-on-external-write +
cancel-on-unmount; the parent half is KF.W7's, not re-booked); KF-CE-8 + the model→editor
re-projection contract; **KF-CE-9 + KF-CE-37 ≡ RB M-3/C-8 as ONE boundary** (`formatCSSContent`'s
error path via the house `withErrorToastAsync` idiom; `isFormatting` released); the tail. KF-CE-41's
law binds every docblock touched.

### KF.W12.e — APPLY-UNIT (phase 3, Opus)

**Writable** (kf): `…/composables/useKeyframesState.ts` (N-8's derivation route, after `.c`) ·
`…/composables/useApplyCSS.ts` (RB-6's lifetime, D-25's PRM) · `…/composables/useKeyframeBrushApply.ts`
(`:33` `getClassName`) · `…/composables/useKeyframesParsing.ts` (carve: the emitted-selector half,
`:26`/`:39`) · `…/keyframes/KeyframesStringControls.vue` (the apply/brush/teardown rows, after `.d`) ·
`…/transport/controls-pane/RibbonBar.vue` (`:13`/`:46`/`:49`, after `.d`) ·
`test/demo/instrument/apply-css-identity.test.ts` (create). (value.js): the receipt + `evidence/W12/**`.
**Locks**: **N-8 first**, before every other `.e` row — ONE `cssIdent`-derived name shared by
`getClassName` and the emitted selector; **a second hand-rolled derivation beside `cssIdent` is
forbidden by name**; D-25 + KF-KE-8 are ONE PRM motion; the killed "both animate the same target"
scenario is **named as killed, never cured** (G-KFW12-5's anti-work clause).
**Brief**: Re-measure OP-4 at open and read the export's exact shape (`grep -c 'cssIdent'
dist/keyframes.d.ts` → printed at open and close; `grep -rc 'cssIdent' demo`). If the demo consumer
count is 0, land the identity cure's derivation against the demo's existing in-tree derivation and
name KF.W5's export as the edge — never a second hand-rolled one. Route `.c`'s landed identity
through that ONE derivation so `getClassName()` strictly equals the selector name inside
`getCSSString()` for an id containing uppercase. Then RB-6 — the applied state and its affordance
get ONE lifetime (`v-if === 'keyframes'` strands applied residue across tabs with no visible undo);
D-2/L-M-8; N-7; D-25's `respectReducedMotion` on brush and sweep; S-6-as-corrected KEPT (the
`prevPaused` mechanism is right); the `:57`/`:59`/`:65`/`:67` rows as routed. Say which arm was
taken.

### KF.W12.f — AXISLINE-UNIT (phase 3, Opus)

**Writable** (kf): `demo/scenes/cube/CubeAxisLines.vue` · `test/demo/scenes/cube-axis-reveal.test.ts`
(create). (value.js): the receipt + `evidence/W12/**` (the Z triptych).
**Locks**: opens ONLY on KF.W11 `.a`'s OD latch-family sha (OP-1: the window-keydown grep must read
**0**); **this wave writes no `orbital-drag/**` byte** (one cure, one home); every geometric
assertion **frame-stamped** against the mount-time `rotate3d(-1,1,0,30deg)` frame, which lives in
KF.W11's `useCubeDemo.ts` and is re-derived READ-ONLY; KF-AX-9's `180ms` rider is `LANDED-BY KF.W6`
and never claimed.
**Brief**: Print OP-1's grep at 0 in the receipt first. KF-AX-1's consumer half — the reveal consumes
the ONE keyboard registry (`allowInInput`, keyup events, modal are the registry's own cures), not a
window latch; today it binds `lock.x/y/z` at `CubeAxisLines.vue:11-14`. KF-AX-2 — the reveal is
false three ways (rotate/translate/scale; armed-vs-active; the wheel sixth op): a prose/prop decision
plus the labels rider (the deuteranopia rider rides J-lane C6's ask). **#57 / the Z stroke** —
`rotateY(90deg)` at `:117` puts the stroke in a plane containing the view direction under
`perspective: 1200px` (`rotateZ(90deg)` at `:113`; `width: 1000vw` at `:63`): the orientation
redundancy holds for X-vs-Y and fails for exactly Z. Then KF-AX-4..-10, -13, -14, -16..-23, -28..-30
by id, 32 rows standing (0 BLOCKER · 4 MAJOR · 17 MINOR · 11 INFO). Discrete rows to KF.W0 / KF.W6 /
KF.W9-SS-13 stay theirs.

### KF.W12.g — Close (phase 4, Opus, serial, last)

**Writable** (value.js only): `docs/tranches/X/execution/B/KF-W12.md` ·
`docs/tranches/X/execution/LEDGER.md` (this wave's row cells + appended lines ONLY) ·
`docs/tranches/V/coordination/INBOX.md` (append) · `docs/tranches/X/COHESION.md` **§4a** (the SS-6
accretion register, append rows only — `:376-388`) · `docs/tranches/X/keyframes/evidence/W12/**`.
**Locks**: zero SWAP-discharge receipts (⟨cmd⟩ `grep -c 'DISCHARGED by KF.W7 SWAP verdict'` must
read **0**) and zero re-bookings (`grep -c 'KF-APP-41\|C-22'` over the wave's commit messages must
read **0**) **stated positively**; `value4-editor-boundary.test.ts`'s timeout is **NOT widened**; a
demo-side cure of a producer defect is a HIGH defect.
**Brief**: Re-run all seven gates double at the close's own clock, including OP-0's `vue-tsc` → 0
and the skip census (`git diff <open-sha>..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('` →
0). Audit every sha with `git show --stat` against §Bounds (`dev.sh` in 0 commits). Append the SS-6
accretion rows: OP-5's `default: undefined` ask plus the seven producer rows this wave surfaces
(the viewport-gated grid · the `steps(1, jump-none)` render throw · the preset seam · the slider
readout seam · the keyboard registry's missing `defaultPrevented`/scope · unlayered scoped styles ·
the lossy `cn` table), each with its date and evidence, **each with zero demo-side workaround in the
diff**. E13 four-path sweep; every id in §Carry read LANDED / KILLED-with-rationale / carried;
residuals and escalations named; the LEDGER row cells + the event line.

### Dispatch note

**This plan is BANKED, NOT DISPATCHED.** `groups` is returned EMPTY and no unit was spawned: the
wave's one HARD precondition is RED and `KF12-E1` is unresolved. On a grant (or on `G-KFW4-1`
landing GREEN), the dispatch order is exactly the table above — `[.a, .b]` → `[.c, .d]` → `[.e, .f]`
→ `[.g]` — with `.c` and `.f` additionally requiring KF.W11 `.b` and `.a`'s shas, which do not yet
exist.

---

## Re-open — 2026-09-19, SECOND SITTING: THE RULING LANDED; KF.W12 IS **OPEN**

**SERVED MODEL: claude-opus-5[1m]** · **Seat**: SEAT 0 (OPEN), re-dispatch, VERIFY-AND-BANK only.
**Sitting of record: 2026-09-17**, the owner's begin-word (COHESION §0j); wall clock 2026-09-19.
**Nothing above this line is amended** (E-3). The first sitting's `BLOCKED-ON OP-0` verdict, its
baseline at `dd28da55` and ESCALATION KF12-E1 stand exactly as that seat wrote them; this block is
the dated addendum-beside that records what changed, re-measures every figure at a later head, and
opens the wave.

### What unblocked it — the ruling, quoted, not presumed

**COHESION §0u (`085b2121`, 2026-09-19)** — *"KF.W11 · KF.W12 · KF.W13's OP-0 (G-KFW4-1 GREEN) IS
CIRCULAR AS A COUNT; RULED AS A RATCHET"*. It names this wave by id, cites the very decomposition
the first sitting returned (*"**13** inside KF.W12's §B.2 rows (six the type-level shadow of its own
named cures)"*), and takes **disposition (b)**, the chassis-landed reading, as a dated
addendum-beside:

> **OP-0, as ruled — a RATCHET, not a threshold.** (1) The precondition each of the three waves
> checks at open is the **chassis**: `vue-tsc` wired as a blocking leg of `npm run check` on the
> merge path (G-KFW4-1's WIRED half, GREEN since KF.W4). (2) Each wave banks the count at its open
> and **may not raise it**; every unit **zeroes the diagnostics inside its own §Bounds rows** as
> part of the cure that owns them (a diagnostic that is the type-level shadow of a named cure falls
> WITH that cure, never before it by a cast or a suppression — `@ts-expect-error`, `as`, and
> `// eslint-disable` are REFUSED as cures). (3) **The count reads 0 at KF.W13's close**, which
> asserts it double-run; G-KFW4-1 turns GREEN there and KF.W4's row gains the dated note.

**ESCALATION KF12-E1 is therefore DISCHARGED by ruling** — §0u answers it in the same words it was
raised in, and by name. This seat re-opens the wave on that word; it takes no verb of its own.

**Chassis verified WIRED at this seat, not assumed** — ⟨cmd⟩ `node -e "process.stdout.write(require('./package.json').scripts.check)"`
→ `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure`
(twice, identical): **`vue-tsc` is the FIRST, blocking leg of `npm run check`** — G-KFW4-1's WIRED
half, the half §0u part (1) makes the open precondition, is GREEN at this seat's own reading.

### Crash-recovery (standing law, first act — re-run at this sitting)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**,
both value.js-delivered mail packets (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md`
· `…-2026-07-27-library-band-r1-widened-k1-k4.md`) — **outside every KF.W12 writable path**, and the
same two the first sitting measured.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **5 rows**:
`demo/color-picker/composables/boot/atmosphere-calibration.ts` · `demo/color-picker/composables/boot/useAtmosphere.ts`
· `demo/test/glass/aurora-bracket.test.ts` (Track A's, untouched) · `docs/tranches/V/reformation/CARRY-LEDGER.md`
(a sibling seat's, untouched) · `scripts/dev/dev.sh` (**unowned, never staged, never touched**).
**No dirty path inside this seat's writable set** — `execution/B/KF-W12.md` clean at HEAD,
`LEDGER.md` clean, `INBOX.md` clean. **Zero inherited hunks; nothing finished, nothing rewritten,
nothing stashed, nothing restored.**
**No KF.W12 unit commit exists in either repo** — ⟨cmd⟩ `git -C ../keyframes.js log --oneline --all --grep='X.KF.W12'`
→ *(no output)*; ⟨cmd⟩ `git log --oneline --grep='x-kf-w12' -i` → only `beacd880`, the first
sitting's blocked-open record. **`alreadyDone` is EMPTY; all seven units are owed.**

### Substrate, and the drift the ruling brought with it

| reading | command | value |
|---|---|---|
| kf HEAD | `git -C ../keyframes.js rev-parse --short HEAD` | **`bf4a9a9c`** |
| kf origin/master | `… rev-parse --short origin/master` | **`bf4a9a9c`** — local == remote (KF.W11's re-close pushed all 69) |
| drift from the spec's ref of record | `git rev-list --count 69095552..HEAD` | **76** (was 7 at the first sitting) |
| drift from the first sitting's head | `git rev-list --count dd28da55..HEAD` | **69** — KF.W11's whole execution |
| **KF.W11 commits touching ANY KF.W12 §B.2 path** | `git log --oneline 69095552..HEAD -- demo/components/instrument/keyframes/ …/transport/channel-controls/ …/transport/controls-pane/ demo/utils/helpers.ts demo/scenes/easing/EasingSidebar.vue demo/scenes/cube/CubeAxisLines.vue` | ***(no output)*** — **ZERO**. Every §B.1 anchor and every byte clause below re-measures unmoved; each unit still re-anchors at its own open (KF.W0 §B-12 · D-19 · KF-AT-28). |

### E13 Step-0 — the four-path mail sweep, re-run at this seat's own clock

Swept read-only and compared against **every row** of `docs/tranches/V/coordination/INBOX.md`;
status read from each row's cell **by position and leading verb**, never a bare `grep -i unread`;
`INBOX.md` **self-excluded** (SELF-COUNT).

1. **`docs/tranches/V/` + `V/coordination/`** — ⟨cmd⟩ `/bin/ls -t …` → `INBOX.md` (self) then the
   five 2026-09-18 `value-4.1` letters, **all ours and rowed** (`…evidence-addendum-2` = O-38 ·
   `…facility19-delta` = O-37 · `…r1-relay` = O-36 · `…export-delta-refresh` = O-35 ·
   `…cut-notice` = O-34), then `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md` = O-31.
2. **`../glass-ui/docs/tranches/BK/coordination/`** — **BK re-confirmed the newest glass tranche
   dir**: ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/` · `BJ/` · `BI/`.
   Newest letter `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**; UNMOVED.
3. **`../keyframes.js/docs/tranches/V/coordination/`** — newest inbound-grammar letter
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21, ours**; `INBOUND-LEDGER.md`
   is keyframes' own ledger, not a letter.
4. **`../sci-report/atlas/docs/tranches/P/coordination/`** — newest
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12, ours**; path UNMOVED.

**Delta since KF.W11's re-close sweep hours earlier** — ⟨cmd⟩ `find <each of the four paths> -maxdepth 1 -type f -newermt "2026-09-19 00:00"`
→ exactly **two**, both self-or-ours: `INBOX.md` (self-excluded) and keyframes' own
`INBOUND-LEDGER.md` (its ledger, carrying no new letter).

**Result**: **ZERO unrowed letters addressed to value.js · ZERO new `I-n` minted · ZERO UNREAD** —
⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **79** · **79**; positional leading-verb scan
→ **0**. Register tail unmoved at **I-35 / O-39**. A dated sweep line is appended at `INBOX.md`'s
foot by this seat.

### Preconditions — every `Opens after` name, re-measured at the bytes AND in the ledger, at `bf4a9a9c`

| # | precondition | this seat's measurement (double-run) | verdict |
|---|---|---|---|
| **OP-0** | **`G-KFW4-1`** — the sequencing head | **RULED A RATCHET** at COHESION §0u (`085b2121`), quoted above, naming KF.W12. Chassis WIRED (`npm run check` leg 1 = `vue-tsc`). Count at this open: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` → **24** · **24** (was 54 at `dd28da55`; KF.W11 drove it −30 and it NEVER ROSE). | **MET AS RULED** — banked at **24**, the ratchet's floor for this wave. |
| **OP-1** | **KF.W11 `.a`'s OD latch family LANDED** (gates `.f`) | ⟨cmd⟩ `grep -c 'useEventListener(window, "keydown"' demo/scenes/cube/orbital-drag/OrbitalDrag.vue` → **0** · **0** (was 1 · 1). ⟨cmd⟩ `git log --oneline 69095552..HEAD -- demo/scenes/cube/orbital-drag/` → `5f1c8208` · **`fff7232c`** *"fix(kf/cube · X.KF.W11.a · OD latch family): the axis latch adopts the demo's one keyboard registry"* · `9e7aca87` · `37764477`. KF.W11's close names `fff7232c` as KF.W12's OD conjunct. | **MET — `.f` opens on `fff7232c`.** |
| **OP-2** | **KF.W11 `.b`'s `useKeyframeOps.ts` L-2 carve LANDED** (gates `.c`) | ⟨cmd⟩ `git log --oneline 69095552..HEAD -- …/composables/useKeyframeOps.ts` → ***(no output)***; last commit on the file remains `0d456cff` (KF.W8 `.c`). KF.W11's close states it in its own voice: *"its `useKeyframeOps.ts` conjunct satisfied **without a sha** (carve unspent, file byte-unchanged)"*. | **MET BY VACANCY, and stated as such** — the condition exists to keep `.c` off a hunk KF.W11 was writing; **KF.W11 wrote none and is CLOSED**, so there is no hunk to avoid and no parallel writer. `.c` takes the file whole under its §B.2 row; `:173`'s `requireKeyframeSelector` entry is live (⟨cmd⟩ `grep -n 'requireKeyframeSelector'` → `:8` import · `:173` call). **Not a blocker; the §B.2 "never re-touched" clause is vacuous and `.c` says so in its receipt.** |
| **OP-3** | **KC-34's edict** — the highlight path stops replacing Vue-owned DOM BEFORE KC-8/KC-9 | `.a`'s first commit is KC-34; enforced at §Sequencing order 2 and G-KFW12-1's order clause. | **BY CONSTRUCTION** — an ordering obligation, not an open-blocker. |
| **OP-4** | **the `cssIdent` publication** | ⟨cmd⟩ `grep -c 'cssIdent' dist/keyframes.d.ts` → **2** · **2**; ⟨cmd⟩ `grep -rc 'cssIdent' demo \| grep -v ':0$'` → `demo/utils/helpers.ts:1` · same (**a comment**). | **PRESENT AT THE ARTIFACT, ABSENT AS A CONSUMER** — unmoved; re-measured again at `.e`'s open, the export's exact shape read there. |
| **OP-5** | **the glass-ui producer half of KF-CO-1/KF-CO-8** | producer-side; the consumer cure is ours and lands regardless; the row rides SS-6 (COHESION §4a) at `.g`. Glass-ui **READ-ONLY, always**; the prop name is **quoted from the installed `.d.ts`** by `.b` — a guessed name is a copied producer selector, a HIGH defect. | **NOT BLOCKING** — a relay obligation. |
| **OP-6** | **KF.W0's two frontier repairs (KFED)** | ⟨cmd⟩ `grep -c 'startScalar' …/components/KeyframeCardList.vue` → **2** · **2** (FE-3 present at the frontier, unmoved). | **RECEIPT OBLIGATION** — `.c`'s first act, its own value.js commit. |

**Ledger-side reading of the other `Opens after` names**, each verified in `execution/LEDGER.md`
Track B **and** at the bytes:

- **KF.W0 CLOSED 2026-09-17** (ledger `:45`) — the §B-12 re-baseline law inherited. **MET.**
- **KF.W6 CLOSED 2026-09-17 (honest-RED)** (`:50`) — ⟨cmd⟩ `git ls-tree origin/master -- demo/components/instrument/shell/EditorHeader.vue` → *(no output)*: the file is gone; R4-1's atomic adoption landed. **MET.**
- **KF.W7 CLOSED 2026-09-17** (`:51`) — KF-CE-2's parent half is W7's landed work; the six-surface verdict table (`4c03ceda`) is KEEP-BESPOKE ×6, **discharge set EMPTY**. **MET.**
- **KF.W8 CLOSED 2026-09-17 (honest-RED)** (`:52`) — ⟨cmd⟩ `git ls-tree origin/master --name-only -- demo/components/instrument/keyframes/components/KeyframeCard.vue` → the path exists (the card cluster moved by `34b051eb`). **MET.**
- **KF.W11** (`:56`) — **CLOSED 2026-09-19, `complete_with_misses`**, re-closed by a second fresh seat; all 69 commits PUBLISHED (`origin/master` = `bf4a9a9c`). Its two conjuncts to this wave are OP-1 (met at `fff7232c`) and OP-2 (met by vacancy). **MET.**

**Every `Opens after` name is MET. The wave OPENS.**

---

## Baseline (re-open) — the seven gates, run READ-ONLY at `bf4a9a9c`, double-run

All commands from `/Users/mkbabb/Programming/keyframes.js`. **SELF-COUNT**: ⟨cmd⟩ `grep -c '^\*\*G-KFW12-' docs/tranches/X/keyframes/waves/KF-W12.md`
→ **7** (value.js-relative); seven gates banked, seven rows below.

| gate | command (spec §Gates) | reading (run 1 · run 2) | verdict |
|---|---|---|---|
| **G-KFW12-1** | `npx vitest run --project demo test/demo/instrument/keyframe-card-offset-loop.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-2** | `npx vitest run --project demo test/demo/instrument/channel-options-render-edge.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-3** | `npx vitest run --project demo test/demo/instrument/keyframes-editor-honest.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-4** | `npx vitest run --project demo test/demo/instrument/css-code-editor-seam.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-5** | `npx vitest run --project demo test/demo/instrument/apply-css-identity.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-6** | `npx vitest run --project demo test/demo/scenes/cube-axis-reveal.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW12-7** | `npm run test:demo 2>&1 \| tail -3` ⊕ `npx vue-tsc … \| grep -c 'error TS'` ⊕ the skip / anti-re-book / SS-6 clauses | `Test Files 1 failed \| 47 passed (48)` / `Tests 1 failed \| 414 passed (415)` · same (Duration 3.97s · 3.36s); vue-tsc **24** · **24** | **RED** on BOTH limbs — see the two readings below |

**The six absent files, proven absent rather than asserted** — ⟨cmd⟩ `ls <path>` for each of the six
`create` rows of §B.2 → `No such file or directory` ×6 (double-run). That is the sole cause of the
six `No test files found` readings; every one is **RED-AS-EXPECTED (born-RED)**, none is UNRUNNABLE.
**6 born-RED · 1 RED-with-inherited-cause · 0 UNRUNNABLE · 0 DIVERGENT.**

### G-KFW12-7's `test:demo` limb — the first sitting's GREEN-BEFORE-CURE booking (1) is WITHDRAWN

The first sitting booked *"`Test Files 39 passed (39)` / `Tests 286 passed (286)` — GREEN-AT-OPEN"*
as GREEN-BEFORE-CURE (1). **At this head that booking no longer holds and is withdrawn, not carried**:
⟨cmd⟩ `npm run test:demo` → `1 failed | 47 passed (48)` / `1 failed | 414 passed (415)`, twice. The
one failure is **not this wave's and not this wave's to cure**:

> ⟨cmd⟩ `npm run test:demo 2>&1 | grep -E 'FAIL|×'` →
> `FAIL |demo| test/demo/scenes/spring-trace-truth.test.ts > SpringTrace — the ceiling's coupling to the ζ floor (L-14, documented AND enforced) > (4b) the floor the heatmap declares is not below the one the plot pins`
> `❯ test/demo/scenes/spring-trace-truth.test.ts:276:19`

That is **KF.W11's carried honest-RED** — its G-KFW11-4 / G-KFW11-10, one case, registered MINOR-1
and not laundered, with **ESCALATION KF11-E(j1)** and residual **j-R5** standing open (a one-line
witness re-bind: `.e`'s regex anchors `SpringHeatmap.vue`'s `DAMPING_MIN`, which `.f`'s contract
re-homed as the exported `DAMPING_AXIS.min`; the invariant itself was independently re-verified
HOLDING). **This wave inherits it as a RED it did not cause and may not cure by weakening**: the
file is outside every KF.W12 §B.2 row, and `value4-editor-boundary.test.ts`'s timeout is **NOT**
widened (§L-18 (iv), the masking class). `.g` reads G-KFW12-7's suite limb as GREEN **when every
`test/demo/**` file this wave owns passes and the only residual failure is KF11-E(j1)'s**, and says
so in those words, or the re-bind has landed from a keyframes-side seat by then and the limb is
unqualified. The denominator the six creations grow to is **48 → 54**.

### G-KFW12-7's `vue-tsc` limb — read under §0u, and what each unit owes

The gate's literal clause is *"→ **0** (OP-0 re-run at close)"*. **§0u part (3) relocates that
zero**: *"The count reads 0 at **KF.W13's close**"*. Under the ruling this wave's obligation is
parts (1) and (2): the chassis is WIRED, the count is banked at **24** and **may not rise**, and
**every unit zeroes the diagnostics inside its own §Bounds rows with the cure that owns them** —
never by a cast, `@ts-expect-error` or `// eslint-disable`, each REFUSED as a cure by name. The
decomposition, ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep 'error TS'`, homed row by
row (24 = 13 + 11; SELF-COUNT: 2+1+2+1+1+3+1+1+1 = 13 · 2+3+1+2+3 = 11):

| diagnostic | owner | note |
|---|---|---|
| `KeyframesEditor.vue(76,73)` · `(81,41)` TS2339 *"Property 'value' does not exist on type 'KeyframeSelector'"* | **`.a`** | the type-level shadow of **KC-2 ≡ KF-KE-2** — the fraction read at `:76` and the frozen-selector write at `:81`, the wave's headline card-seam cure. Falls WITH it. |
| `useKeyframeOps.ts(80,13)` TS2322 | **`.c`** | inside `.c`'s row and OUTSIDE the (unspent) `:58-69` carve — KF.W11's re-close named it KF.W12's by name. |
| `KeyframesStringControls.vue(75,5)` TS6133 *"'getTmpAnimationName' is declared but its value is never read"* | **`.e`** (path serial `.d`→`.e`) | the shadow of **KF-KE-4**, whose disposition reads *"class = selector, **or pass `getTmpAnimationName()` as the class**"* — the unused import **is** the missing identity. |
| `KeyframesStringControls.vue(54,9)` TS6133 `'CSSKeyframesAnimation'` | **`.e`** (`.d` may zero it if its own cure reaches the import) | the apply/teardown region's dead type import. |
| `ChannelOptions.vue(272,34)` TS2379 | **`.b`** | the shadow of **KF-CO-1 / OP-5** — the Boolean-cast prop family. |
| `LayerConfigPanel.vue(87,10)` TS2345 | **`.b`** | the shadow of **KF-CO-8 ≡ LP-3** — the `:checked`/`@update:checked` switch rewire. |
| `TimingFunctionPanel.vue(32,14)` · `EasingSidebar.vue(27,14)` — the identical TS2379 | **`.b`** | the shadow of **KF-TFP-1 ≡ KF-ES-12** — the two `EasingPicker` seat call-sites `useEasingPickerSeat` unifies. `EasingSidebar.vue:27` is inside `.b`'s two-call-site carve; every other byte of that file is out of bounds. |
| `useTimingFunctionEditor.ts(136,13)` · `(157,13)` TS2367 · `(177,9)` TS2322 | **`.b`** | this unit's own composable row; three. |
| `ChannelControls.vue(329,7)` TS6133 `'tabsContentEl'` | **`.b`** | inside the KF-CO-5/-46 `inert` carve; the L-2/C-2 `:key` row is KF.W7's and is NOT touched. |
| **Total inside KF.W12's §B.2 rows** | | **13** — `.a` 2 · `.b` 7 · `.c` 1 · `.e` 3 |
| `TransportDock.vue(95,34)` · `(276,7)` · `(366,9)` · `MbabbMenu.vue(208,12)` · `(208,36)` | **KF.W13** | 5; KF.W13's own §B.2 rows (its open record names four of them the shadows of its own cures). |
| `useEasingDemo.ts(294,13)` · `(310,43)` | **KF11-E3** | 2; the unowned remainder `.r` enumerated — no packet; NOT this wave's (§Excluded: `demo/scenes/**` except `CubeAxisLines.vue` and the two seat call-sites). |
| `EditorShell.vue(175,10)` | **KF11-E4** | 1; `demo/components/instrument/shell/**` is §Excluded here by name. |
| `src/animation/{physics/smooth.ts,group/waapi.ts,group/composite/compositor.ts}` | **KF11-E2** | 3; **any `src/**` write is wave-invalidating** (§Scope triumvirate bounds) — escalated to KF.W5/KF.W8, never touched here. |
| **Total outside** | | **11** |

**The ratchet's floor for KF.W12 is 24, and its own owed movement is 13 → 0.** `.g` asserts
double-run that the total has **not risen above 24** and that KF.W12's thirteen read **0**, prints
the residual eleven with their owners, and cites §0u part (3) for the literal zero being KF.W13's
close. **That is a ruling citation, not a relief this seat invents.**

### Byte clauses — ten, re-measured at `bf4a9a9c`, double-run

| clause | gate | reading (run 1 · run 2) | figure at `dd28da55` / `69095552` | drift |
|---|---|---|---|---|
| `grep -c 'frame.start.value = starts' …/keyframes/KeyframesEditor.vue` | G-1 | **1 · 1** | 1 | none |
| `grep -rc ':is-open' …/transport/channel-controls \| grep -v ':0$'` | G-2 | `ChannelOptions.vue:3` + `LayerConfigPanel.vue:1` (=**4**) · same | ×4 | none |
| `grep -c '@update:checked' …/LayerConfigPanel.vue` | G-2 | **1 · 1** | 1 | none |
| `grep -c 'parseCssScalar' …/keyframes/KeyframesEditor.vue` | G-3 | **2 · 2** | 2 | none |
| `grep -c 'class="absolute top-2 right-4' …/keyframes/components/KeyframeCard.vue` | G-3 | **1 · 1** | 1 | none |
| `grep -c 'toLowerCase()' …/keyframes/composables/useKeyframesState.ts` | G-3 | **1 · 1** | 1 | none |
| `grep -c 'tabFocusMode' …/keyframes/CSSCodeEditor.vue` | G-4 | **0 · 0** (and `accessibilitySupport` **1 · 1**) | 0 / 1 | none |
| `grep -c 'isFormatting' …/keyframes/KeyframesStringControls.vue` | G-4 | **4 · 4** | 4 | none |
| `grep -c 'cssIdent' dist/keyframes.d.ts` ⊕ `grep -rc 'cssIdent' demo \| grep -v ':0$'` | G-5 | **2 · 2** ⊕ `helpers.ts:1` · same | 2 ⊕ 1 (a comment) | none |
| `grep -c 'useEventListener(window, "keydown"' …/orbital-drag/OrbitalDrag.vue` | G-6 (inbound) | **0 · 0** | 1 | **MOVED 1 → 0 — LANDED-BY `fff7232c`** (KF.W11 `.a`; this wave writes no `orbital-drag/**` byte) |

**Nine of ten reproduce unmoved; the tenth moved exactly as the spec designed it to** — G-KFW12-6's
inbound clause was written *"must read **0** by KF.W11 `.a` — this wave does not write it."*

**The headline defect still reproduces in a two-line grep** (G-3's witness): ⟨cmd⟩
`grep -rc 'keyframes-style-' demo | grep -v ':0$'` → `…/composables/useKeyframesState.ts:2` · same —
the class at `:16` and the lowercased strip at `:42`; `"keyframes-style-" + X ≠ X.toLowerCase()`
unconditionally (**KF-KE-4**, the row that makes this wave's name honest).

**AXISLINE anchors re-read** — ⟨cmd⟩ `grep -n 'rotateY\|rotateZ\|1000vw' demo/scenes/cube/CubeAxisLines.vue`
→ `:63 width: 1000vw;` · `:113 transform: rotateZ(90deg);` · `:117 transform: rotateY(90deg);` —
**identical to both prior readings**.

### GREEN-BEFORE-CURE (R.2) at the re-open — two, both booked, neither claimed

1. **G-KFW12-6's inbound clause — `LANDED-BY fff7232c`** (KF.W11 `.a`'s OD latch family). The
   window-keydown grep reads **0 · 0** at this open, having read 1 · 1 at both prior sittings. It is
   the spec's own OP-1 and the sibling wave's work; `.f` prints it at 0 in its receipt and **claims
   none of it**.
2. **KF-AX-9's three raw `180ms` token rider — `LANDED-BY KF.W6`** (the spec's own declared booking,
   §B.1 row 9). Re-measured: ⟨cmd⟩ `grep -n '180ms' demo/scenes/cube/CubeAxisLines.vue` → `:41` and
   `:81`, **both inside comments**, no declaration. Re-measured again at `.f`'s open; never claimed.

**WITHDRAWN from the first sitting**: booking (1) there, `test:demo` 39/39 GREEN-AT-OPEN — the suite
now carries KF.W11's inherited failure (above). **No other gate or clause reads green before its cure.**

---

## Unit plan — CONFIRMED UNCHANGED, and now DISPATCHED

The 7-unit / 4-phase plan banked at the first sitting (`## Unit plan`, above) is re-read whole
against the spec at this clock and **stands byte-for-byte**: `.a ∥ .b → .c ∥ .d → .e ∥ .f → .g`,
peak concurrency **2** (inside the four-workflow cap), tiering per M-12 TRI-FOLD — `.b` · `.c` · `.d`
are **Fable-worker ∥ Opus-worker → fresh-Fable arbiter** (the three design-shaped units: the
five-step order + the `useEasingPickerSeat` specification · the apply identity · the Monaco arm with
its byte budget), and `.a` · `.e` · `.f` · `.g` are **Opus solo**. Writable sets, locks, gates and
spec-section citations are exactly the table and the seven unit blocks above; nothing is re-derived
here.

**The three deltas this sitting adds to that plan, and only these three:**

1. **`.f` opens NOW, on `fff7232c`** — OP-1 is met at the bytes (grep 0 · 0). Its receipt prints the
   grep at 0 and names the sha; it writes no `orbital-drag/**` byte (one cure, one home).
2. **`.c`'s OP-2 is MET BY VACANCY** — KF.W11 `.b` spent no byte of `useKeyframeOps.ts` and KF.W11
   is CLOSED. `.c` takes its §B.2 row whole, states in its receipt that the *"`:58-69` hunk never
   re-touched"* clause is **vacuous because the hunk was never written**, and still leaves
   `:58-69` alone unless its own named cure reaches it. It also owns `(80,13)`'s diagnostic.
3. **Every unit carries its §0u ratchet row** — the per-unit homing table above is binding: each
   unit's last commit leaves **0** diagnostics in its own §Bounds rows, cured by the cure that owns
   them, and the wave total never rises above **24**. A cast, `@ts-expect-error` or `// eslint-disable`
   written as a cure is a HIGH defect by the ruling's own words.

**Dispatch order**: `[.a ∥ .b]` → `[.c ∥ .d]` → `[.e ∥ .f]` → `[.g]`. The first sitting's
`### Dispatch note` ("BANKED, NOT DISPATCHED") is **superseded by this block** and left standing as
the dated record of that sitting (E-3).

---

## Unit receipts

*(empty — no unit was dispatched; the wave did not open)*

---

### KF.W12.a

**SERVED MODEL: claude-opus-5[1m]** · unit **CARD-UNIT** (phase 1, Opus solo) ·
**status DONE** · opened on kf `bf4a9a9c`, closed at kf **`ed96f2b0`** ·
**9 commits** (SELF-COUNT: ⟨cmd⟩ `git log --oneline bf4a9a9c..HEAD | grep -c 'X.KF.W12.a'` → **9**).
Full transcripts: `docs/tranches/X/keyframes/evidence/W12/KF-W12-a-gate-transcripts.md`.

#### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**, both
value.js-delivered mail packets (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…`,
`…-2026-07-27-…`) — outside every path in this unit's writable set.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → `CARRY-LEDGER.md` (a sibling
seat's, untouched) and `scripts/dev/dev.sh` (**unowned, never staged, never touched**).
**Zero dirty paths inside this unit's writable set; zero inherited hunks; nothing finished, nothing
rewritten, nothing stashed, nothing restored.**

#### Acts, in KC-34's order

| # | sha | act |
|---|---|---|
| 1 | **`e5235ca0`** | **KC-34 (D-17), FIRST by OP-3.** The host's text and its colourisation become ONE write through ONE seam (`syncHostSource`), and the card renders the `<pre>` **childless**: `<code>{{ formattedCSS }}</code>` had made Vue the second owner of a subtree `el.innerHTML = …` replaces wholesale, so every paint detached the element Vue's vnode still pointed at. `highlight` hoisted to a module-level `paintHost` (the boot and the idempotence `WeakMap` were already shared; only the theme node is per-instance). |
| 2 | **`f6a51e23`** | **KC-1 + KC-27, together** (KC-1 is KC-27's prerequisite). The list binds `selectorText(frames[i].start)`; FE-3's `startScalar` and the card's defensive `displayStart` twin both go. **KF-KC-3 / KF-KC-26** ride: the card root becomes a `role="group"` named by its offset, the `<pre>` drops the positional `CSS for keyframe ${index}`, the nameless `<Input>` gains `Offset`. |
| 3 | **`dec084a8`** | **KC-2 ≡ KF-KE-2 — freeze and unit in ONE commit, NOT SPLIT.** Whole-selector replacement through `percentSelector`, read through `selectorPercent`, domain `0..100`, `step 0.1`, `marks` at the quarters. **KF-KE-34**'s naming half rides via `LabeledField` + `control-labelable=false`. Only moved stops are replaced, so a neighbour's NAMED selector is not flattened. |
| 4 | **`5b80d54c`** | **KC-8 / KC-9 — keep-mounted.** Rows come from `frames` keyed by frame id, so a projection pass is a prop update rather than a full unmount; the two string projections become genuinely OPTIONAL (absence is passed down as absence, never laundered into `""`). Dies with it: **KC-14 / KF-KC-43** (the guard asymmetry — the frame is the loop variable now) and **KC-31**'s runtime-dead `?? s`. |
| 5 | **`8099b19e`** | **KC-3 ≡ KF-KC-2 ≡ KF-CB-11 + KC-7 + KC-10 + KF-KC-34 + KF-KC-35 + KC-23's demo half.** The bare `<svg>` becomes the producer's `Button` (`icon-only`, `tone="destructive"`, offset-bearing name, house Tooltip); `canRemove` makes the last-keyframe floor expressible; the list restores focus to a survivor's command and announces the removal in a polite live region. |
| 6 | **`361d2d17`** | **KC-28 + KC-15 + KC-36 + KC-18.** The card declares `rootEl` (the contract had promised `$el` "via defineExpose" while exposing `{ preEl }` alone); `cardInstances` is a `shallowRef` **rebuilt in `onBeforeUpdate`** rather than index-patched forever. |
| 7 | **`697d045d`** | **The tail — KC-16 · KC-17 · KC-19 · KC-22 · KC-33**, plus the comment re-statements KF-CE-41's law obliges (below). |
| 8 | **`dffcffd5`** | **KC-15 / KC-10 correction, found BY the born-RED gate**: a departing card fires its ref with `null` *after* survivors re-seat, blanking the slot a survivor just took — which is how the focus hand-off landed on `<body>`. With the rebuild in place a null write can only destroy information, so it is ignored. |
| 9 | **`ed96f2b0`** | **KF-KC-48 — the acceptance test, born RED**, 9 cases, RED run pasted before the GREEN. |

**Bounds audit** — ⟨cmd⟩ `git show --stat` over all nine: every path touched is
`…/keyframes/components/KeyframeCard{,List}.vue`, `…/keyframes/KeyframesEditor.vue`,
`…/keyframes/composables/useHighlightCSS.ts`, `test/demo/instrument/keyframe-card-offset-loop.test.ts`.
**Zero writes outside the writable set. Zero `src/**`, zero `orbital-drag/**`, zero `node_modules`,
zero glass-ui.** `scripts/dev/dev.sh` never staged, never touched.

**SHARED INDEX, disclosed.** `.b` is committing into this same checkout concurrently (`98675047`
landed between acts 5 and 6, and `ChannelOptions.vue` / `useTimingFunctionEditor.ts` were dirty
throughout). Every commit above carries its own pathspec **on the commit itself**; nothing of `.b`'s
was staged, reset or unstaged, and ⟨cmd⟩ `git show --stat` confirms no sibling path rode any of the
nine.

#### Gate readings — G-KFW12-1, BEFORE → AFTER

| clause | BEFORE (`bf4a9a9c`) | AFTER (`ed96f2b0`) | verdict |
|---|---|---|---|
| runtime | `No test files found, exiting with code 1` (born-RED; `ls` → `No such file or directory`, ×2) | `Test Files 1 passed (1)` · `Tests 9 passed (9)` — **double-run** | **GREEN** |
| byte — `grep -c 'frame.start.value = starts' …/KeyframesEditor.vue` | **1 · 1** | **0 · 0** | **GREEN** |
| order (KC-34, read from `git log`) | n/a | `e5235ca0` (highlight) **precedes** `5b80d54c` (keep-mounted) | **GREEN** |

**A false reading was caught at this seat**: the first KC-2 comment quoted the defect verbatim and
held the byte clause at `1` over a file whose defect was already gone. The comment names the
mechanism without reproducing the token; the clause now reads code, not prose.

**THE BITE, EXECUTED** (§L-18 (v) — proven by execution, never by reading). Regressing
`percentSelector(percent)` to a hand-rolled `{ kind: "percent", value: percent }` reds two cases with
`['0%','3750%','100%']` and `['1000%','6000%','9000%']` — **the exact 100× destructive write L-B1
warned of**, the outcome of curing the freeze without the unit. Restored; ⟨cmd⟩ `git diff --stat`
→ *(no output)*.

#### §0u ratchet

| reading | value |
|---|---|
| wave total at this unit's open | **24 · 24** |
| wave total at this unit's last commit | **18 · 18** |
| this unit's two named diagnostics — `KeyframesEditor.vue(76,73)` · `(81,41)`, TS2339 | **0** |

They fell **with** the cure that owns them (KC-2, `dec084a8`) — never by a cast, `@ts-expect-error`
or `// eslint-disable`, each REFUSED by name. The total FELL from the banked floor; it never rose.
(The wave total moves under `.b`'s concurrent work in the same checkout; the figure is this unit's
own reading at its own last commit.)

**DISCLOSED — two diagnostics MOVED into `.c`'s region, for that seat**:
`KeyframesEditor.vue(445,39)` and `(446,37)`, TS2345, `setTargets(el1|el2)` receiving
`HTMLElement | null | undefined` inside `removeKeyframe`. They were suppressed by `cardInstances`
being `ref<any[]>`; typing the ref store (KC-17 / KC-18) is what makes **KC-15's own named
consequence** — a stale or absent index handed to `setTargets` — visible to the checker. There is no
green path that is not `any`: under `noUncheckedIndexedAccess`, indexing **any** array yields
`| undefined`, so even a filtered non-null `HTMLElement[]` reds at the same call. The guard's site is
`removeKeyframe`, outside this unit's `:76-88` card seam and inside the region `.c` already rewrites
for KF-KE-7 / KF-KE-8.

#### Rows LANDED — SELF-COUNT **27**

KC-1 · KC-2 (≡ KF-KE-2, carrying KF-KE-34's naming half and KF-KC-19's total pair) · KC-3 (≡ KF-KC-2
≡ KF-CB-11) · KC-4 (≡ KF-KC-3) · KC-7 · KC-8 · KC-9 · KC-10 · KC-14 (dies structurally) · KC-15 ·
KC-16 · KC-17 · KC-18 · KC-19 · KC-22 · KC-23 (demo half) · KC-26 (group half ≡ KF-KC-26) · KC-27 ·
KC-28 · KC-31 (dies structurally) · KC-33 · KC-34 · KC-36 · KF-KC-34 · KF-KC-35 · KF-KC-43 (dies
structurally) · KF-KC-48.

**GREEN-BEFORE-CURE (R.2), booked, never claimed**: **KC-5** — the `focus:border-transparent` /
`focus:shadow-none` pair that defeated glass's keyboard-focus affordance on the offset field is
**already absent** at these bytes (the W6 comment at the file head states the cure). Booked
**LANDED-BY KF.W6**; this unit spent nothing on it.

#### Rows measured and NOT spent — each named for its owner

| row | measurement at these bytes | owner |
|---|---|---|
| **KC-6 ≡ KF-KC-21** (the dead structural watch) | `useKeyframesParsing.ts:96-103` — outside this unit's §B.2 rows | `.c` / `.e` |
| **KC-11 ≡ KF-KC-27** (PRM + the mutation gated behind the 700 ms exit) | `removeKeyframe`, outside the `:76-88` seam | `.c` (KF-KE-7 / KF-KE-8) |
| **KC-24** (three payload key names for one positional concept) | the consumer handlers are at `KeyframesEditor.vue:299+/330+/349+`, outside the seam; renaming the emits alone would break them | `.c` |
| **KC-25 ≡ KF-KC-28** (`z-modal` + a `sticky` of provably ZERO travel — one edit, since the dead `sticky` is what makes the rung apply) | still present on the `<Input>`; §B.2 hands **the z rung on this file** to `.c` | `.c` |
| **KF-KC-22** (the overlay is a dead click zone that swallows caret placement) | this container carries no `pointer-events-none`; only the identity block does — the guard is one level too deep. Same stacking/hit-testing decision as KF-KE-5 on the same bytes | `.c` |
| **KC-29** (the architectural root: two index-parallel projections, one reactive) | half-addressed — the row set is now the model's; the full cure (one `ref` of row records) belongs where the projection is BUILT | `.c` / `.e` |
| **KC-32** (the exposed contract mixes a ComputedRef with a plain function) | both consumer sites (`KeyframesEditor.vue:293`, `:354`) are outside the seam; KC-15's rebuild makes the unfiltered member correct, so what remains is shape alone | `.c` |
| **KC-20** (the divider's contrast + missing `forced-colors` arm) | re-scoped glass BH relay, per the bank's own correction | `.g` / SS-6 |
| per-thumb `aria-valuetext` on the retiming rail | **not expressible at the installed producer** — measured at `dist/slider-DzqeQmMu.js`: 0 occurrences of `aria-valuetext`, one `aria-label`/`aria-labelledby` forwarded from `$attrs` to EVERY thumb, no thumb slot. `LabeledSlider` is additionally refuted for this control (`modelValue: number`, single-thumb) | **SS-6 relay at `.g`** — see §4.1 of the evidence file for the ask |

**DECLINED WITH REASON — KC-12's behavioural half** (the identity readout being unselectable): making
the watermark selectable means giving this overlay back exactly the pointer surface **KF-KC-22**
condemns it for having. One of the two is wrong, and it is not the caret. The token half of KC-12
(`--muted-foreground` in place of the alpha) is already landed by KF.W6.

#### Comment-stated invariants re-stated (KF-CE-41's law, §Sequencing's travelling lock)

`KeyframeCard.vue`'s `KF-KE-45` block described *"a 24px `<X>` and the copy control adjacent with NO
gap"* — false after KC-3's promotion and KC-23's `gap-1`. It is re-stated at the bytes this unit
leaves, and its own precondition (**KF-KE-5 UNCURED**: the cluster still `absolute top-2 right-4`
with no z rung, the `<pre>` still a later z-auto sibling whose class list still ends `relative`) is
**re-measured and stands**. The list's `?? s` comment claiming *"an honest pre-format frame, never a
blank"* died with KC-16, the window it described having never existed (KC-33).

#### The headless finding the gate carries but does not assert

⟨probe⟩ `AnimationGroup.of(presets.warpLeft().setTargets(el1), presets.jumpUp().setTargets(el2)).play()`
→ `BrowserScalarResolutionError: Could not resolve "translateX(0%) rotate(0deg)" for "transform" to a
numeric CSS scalar`. `removeKeyframe` **awaits** that choreography with no `catch`, so headless the
delete is silently dropped — **KF-KC-27's third aggravation reproduced verbatim**. Clause (3) of the
gate therefore witnesses the removal COMMAND at the seam this unit owns: asserting the defect would
red the moment `.c` cures it, and waiting on it would gate this unit on another unit's work.

#### Suite, lint, masking census

⟨cmd⟩ `npx vitest run --project demo` → `1 failed | 48 passed (49)` · `1 failed | 423 passed (424)`,
twice. The denominator grew by exactly this unit's one file (48 → 49). The single failure is
**unmoved and not this unit's**: `test/demo/scenes/spring-trace-truth.test.ts > … (4b)` — KF.W11's
carried honest-RED (ESCALATION KF11-E(j1), residual j-R5), the one this wave's re-open block names.
It was not touched and nothing was weakened to make it pass.
⟨cmd⟩ `git diff bf4a9a9c..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('` → **0**.
`value4-editor-boundary.test.ts` **not touched, timeout NOT widened**; no timeout in this unit's diff
exceeds a default. ⟨cmd⟩ `npx tsc --noEmit -p tsconfig.test.json | grep keyframe-card-offset` →
*(no output)*. ⟨cmd⟩ `npx eslint` over this unit's four product files and its test → clean.
**Zero `try/catch` around a defect, zero allowlist, zero copied producer selector, zero `node_modules`
patch, zero cast/`@ts-expect-error`/`eslint-disable` used as a cure.**

#### E13

Swept read-only at this seat's clock: ⟨cmd⟩ positional leading-verb scan of
`docs/tranches/V/coordination/INBOX.md` → **UNREAD: 0** over **80** rows; the four paths' newest
letters are unmoved from the re-open sweep. **No unread mail in this unit's scope.** One producer row
is HANDED UP, not sailed here (the per-thumb `aria-valuetext` ask, §4.1 of the evidence file) — `.g`
owns the SS-6 relay.

#### The shas `.c` opens on

| shared path | last commit by this unit |
|---|---|
| `demo/components/instrument/keyframes/components/KeyframeCard.vue` | **`697d045d`** |
| `demo/components/instrument/keyframes/KeyframesEditor.vue` | **`dec084a8`** |
| `demo/components/instrument/keyframes/composables/useHighlightCSS.ts` | **`e5235ca0`** |
| `demo/components/instrument/keyframes/components/KeyframeCardList.vue` (not shared, recorded) | **`dffcffd5`** |
| **unit head** | **`ed96f2b0`** |

**`.c` also inherits, by name**: the two moved diagnostics at `KeyframesEditor.vue(445,39)`/`(446,37)`;
KF-KE-25's blanking write at `useKeyframesParsing.ts:50` (this unit made the list immune to it rather
than reaching across for it — the write itself is still there); and the seven rows in the
"measured and NOT spent" table above.

**Escalations: none.** No cure specified for this unit was impossible at the bytes; every row outside
the writable set is carried as a named residual with its owner, not substituted for.
