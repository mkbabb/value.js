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

### KF.W12.b

SERVED MODEL: claude-fable-5-1 · OPTIONS-UNIT · 2026-09-19 · keyframes.js base `bf4a9a9c` (= `origin/master` at open; ⟨cmd⟩ `git rev-parse --short HEAD` → `bf4a9a9c`, ⟨cmd⟩ `git rev-parse --short origin/master` → `bf4a9a9c`).

**Crash-recovery (Step 0)**: ⟨cmd⟩ `git status --short` (kf) → 2 untracked coordination letters under `docs/tranches/V/coordination/` (out of bounds, untouched) and, later in the sitting, `?? test/demo/instrument/keyframe-card-offset-loop.test.ts` (the `.a` sibling's, untouched); (value.js) → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` — both outside this unit's writable set, never staged. No inherited dirty path inside the set.

**Baseline, measured before the first edit** (matches the record's `bf4a9a9c` row): ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **24**; the 7 inside this unit's rows: `useTimingFunctionEditor.ts(136,13)/(157,13)/(177,9)` · `ChannelOptions.vue(272,34)` · `LayerConfigPanel.vue(87,10)` · `TimingFunctionPanel.vue(32,14)` · `ChannelControls.vue(329,7)` · `EasingSidebar.vue(27,14)` (8 diagnostics in 7 rows — the record's "7" counts rows; this receipt zeroes all 8). ⟨cmd⟩ `npm run test:demo` → `Test Files 1 failed | 47 passed (48)`, the failure `test/demo/scenes/spring-trace-truth.test.ts (4b)` = KF.W11's inherited honest-RED (KF11-E(j1)), not this unit's.

#### The producer's names, quoted from the installed 7.0.0 `.d.ts` (the LOCK's evidence)

⟨cmd⟩ `sed -n 1,60p node_modules/@mkbabb/glass-ui/dist/components/labeled-field/types.d.ts` →
`LabeledFieldCommonProps { label: string; description?: string; requirement?: …; layout?: …; errorLive?: … }` — **no `tooltip`, no `labelClass`, no `descriptions`, no `isOpen`**;
`LabeledSelectProps { modelValue: string; items; open?: boolean; placeholder?; invalid?; disabled?; required? }`, emits `"update:modelValue": (value: string)` · `"update:open": (value: boolean)`;
`LabeledSwitchProps = Omit<SwitchProps, "class" | "modelValue"> & LabeledFieldCommonProps & { modelValue: boolean }`, emit `"update:modelValue": (value: boolean)` — **no `checked`, no `update:checked`**;
`LabeledSliderProps = Omit<SliderProps, "class" | "modelValue"> & LabeledFieldCommonProps & { modelValue: number }` — no readout seam.
Compiled `dist/labeled-field.js`: LabeledSelect `open: { type: Boolean }` (no default) forwarded `open: e.open` unconditionally → an ABSENT `open` casts to `false` and pins reka's SelectRoot controlled-shut (the KF-CO-1 mechanism); LabeledSwitch `modelValue: { type: Boolean }` → absent = permanently OFF (KF-CO-8); ⟨cmd⟩ `grep -c inheritAttrs dist/labeled-field.js` → 0.
`dist/components/easing/EasingPicker.vue.d.ts`: props `mode? · preset? · steps? · term? · readout? · playback? · label?` + model `modelValue?: EasingPickerValue`, emit `update:modelValue(EasingPickerValue | undefined)`; `useEasingPicker.d.ts`: `EasingPickerValue { mode; css; fn: EasingFn; points: BezierPoints; steps: number; term: JumpTerm }` (**no `preset` field**), `JumpTerm = (typeof jumpTerms)[number]` (value.js's four terms — the store's `jumpTerm` union is the SAME four literals, `animationOptionsStore.ts:13-18`, so no cast is needed between them). `dist/easing.js` runtime exports: ⟨cmd⟩ `grep -o 'export {[^}]*}' dist/easing.js` → `EasingConfigurator, EasingPicker, useEasingPicker` — **`STEP_COUNT_MIN/MAX` and `DEFAULT_BEZIER_PRESET` exist in `constants.d.ts` (1 · 12 · "ease-out-back") but are NOT exported from the `./easing` subpath** (a producer ask, below). Compiled write-through (my print, `dist/easing.js:196-211`): the model watch is `{deep, immediate}`; an incoming value equal to the last EMITTED value is swallowed (the vendor's own echo suppressor); otherwise mode is set, points are applied through `setHandle` only if some coordinate differs (stamping preset `"custom"`), `steps` is projected `Math.max(1, Math.min(12, Math.round(steps)))`, `term` applied if in the list — and if the resulting value differs from the written one **the vendor emits its projection** (the KF-CO-9 domain echo).
`dist/components/drawer/styles.css`: `:root { --drawer-inset-block-end: 0px; … }` and `.glass-drawer[data-glass-drawer-snap-points="true"][data-glass-drawer-direction="bottom"] { bottom: var(--drawer-inset-block-end); height: calc(100% - var(--drawer-inset-block-end)); max-height: calc(100% - var(--drawer-inset-block-end)); }`; `Drawer.vue.d.ts:42` `snapPoints?: (number | string)[]`.

#### The five steps — five commits, in the record's order (the ORDER clause)

| step | sha | files | meaning |
|---|---|---|---|
| 1 | `98675047` | ChannelOptions.vue · LayerConfigPanel.vue · ControlsPaneWrapper.vue | **KF-CO-1 ×4 + KF-CO-8 ≡ LP-3 + LP-1 in ONE commit (the write→render LOCK)**: `:is-open`→`:open` at direction/fillMode/blend (LabeledSelect's declared prop), the switch on `model-value`/`update:model-value`, LP-16's callback pair retired for an `open` model; LP-1's render edge at the wrapper — `layerRevision` stamped on every `layerConfigUpdate` the wrapper relays, `controlHosts` re-snapshots `{ ...layer }` + `blendAvailable` from the engine on that stamp (the engine's `setLayerConfig` is `Object.assign` + a dirty flag, no event — stated at the byte; writes that bypass the wrapper, e.g. `transitionLayer` springs, are NOT covered → KF.W5's engine-seam ask) |
| 2 | `ebbc8259` | ChannelOptions.vue · TimingFunctionPanel.vue · useTimingFunctionEditor.ts | KF-CO-3 `commitOption` (apply → persist only on acceptance → `invalid` + `#error` with the engine's message; `AnimationOptionError` by name, anything else rethrown) · KF-CO-4 `resolveTimingFunction` — a `cubic-bezier(…)`/`steps(…)` literal is passed through byte-for-byte and the store RECONCILED from it (never rebuilt from the stale quad) · KF-CO-10 engine half (`step-start`/`step-end` parse to `steps(1, jump-*)` and persist as the keyword) · KF-CO-13 departure (no flatten, no persist on open, the disclosure rendered) · KF-CO-14 `DIRECTIONS`/`FILL_MODES` read synchronously off `kfEngine()` · KF-CO-16 `progress` prop + `:progress` deleted, the panel `v-if`'d · the three composable TS2379s fall with `TimingFunctionLiteral` + type-guard predicates (no `as`) |
| 3 | `fcafcff8` | ChannelOptions.vue · TimingFunctionPanel.vue · useTimingFunctionEditor.ts | KF-CO-10 selection half (`selectedCurveKey: string` — keywords select themselves, literals their draft kind, an unclassifiable bucket selects nothing → placeholder; ChannelOptions(272,34)→0) · KF-CO-40 ≡ KF-TFP-5 (N-10: the bezier arm writes the STORE and emits; the parent owns the engine — one construction, one frames walk per pointermove) · N-4 (one stored spelling `"infinite"`, `∞` displayed; the unreachable `=== Infinity` arm deleted) · N-9 · **KF-CO-9 ≡ TFP-6 ESCALATED, not patched** (below) |
| 4 | `0e31d417` | ChannelOptions.vue · TimingFunctionPanel.vue · ChannelControls.vue | KF-CO-5 ≡ KF-TFP-7 + KF-CO-46: `:inert` on every collapsed `.panel-row` (find-in-page residual stated at the byte); focus follows the row swap (pencil→Back, Back→pencil, advanced row→its Back, Back→the row; `focusBack` exposed by the panel); the unread `tabsContentEl` ref + its template hook deleted (ChannelControls(329,7)→0; the L-2/C-2 `:key` row untouched — KF.W7's) |
| 5 | `b67dae6f` | ChannelOptions.vue · LayerConfigPanel.vue · useTimingFunctionEditor.ts | the hygiene tail (roster below) + LP-20; ⟨cmd⟩ `npx prettier --check LayerConfigPanel.vue` → clean |

#### KF-CO-47 — the per-field decision, written down (rides KF-CO-2 ≡ LP-4 · KF-CO-31 · SPF-1/-2/-13)

Per field, two seams were available and both were REJECTED, so the gloss is **deleted**, not renamed:
- `description` (persistent copy) — the compiled LabeledField renders it inside `.labeled-field-copy`, **grid item #1 = the shared `auto` label track of the §LABEL-subgrid idiom** (design-idioms.css:289-311, out of this unit's bounds), so five 30-50-char glosses would widen the label column for EVERY row and squeeze every control (LP-4's geometry rider). A demo span rule for `.labeled-field-description` would be a byte in design-idioms.css — out of bounds and a second row grammar.
- hover — unavailable on a LabeledField row: 7.0.0 exposes no label-action slot (L·I-6 re-verified at `LabeledField.vue.d.ts`), and an `as-child` Tooltip onto a non-focusable `<label>` is the mouse-only defect KF-CO-22 names.
Decision: `tooltip` ×10 · `label-class` ×5 · `:descriptions` ×3 → **0** (⟨cmd⟩ `grep -c 'tooltip=\|label-class=\|:descriptions=' ChannelOptions.vue LayerConfigPanel.vue` → 0 · 0). What a field ACCEPTS surfaces through the `#error` seam on rejection (KF-CO-3); the labels take the producer's one `.glass-label` register (KF-CO-31: the vendor default is the higher-contrast side). The three description tables (`DIRECTION_DESCRIPTIONS` · `FILL_MODE_DESCRIPTIONS` · `COMPOSITE_OPERATOR_DESCRIPTIONS`, `animationDescriptions.ts`) become consumerless exports — **carried to the reference-data owner** (the file is out of bounds); the per-item gloss is a producer ask (LabeledSelect item-description slot → SS-6). The SAME decision is recorded for **SPF-1 / SPF-2 / SPF-13** — SpringPhysicsFacet.vue's bytes are the spring facet owner's.

#### `useEasingPickerSeat` — SPECIFIED HERE, BEFORE THE BYTE (KF-ES-12 · KF-TFP-1 ≡ KF-ES-12 · KF-CO-17 · KF-ES-4 split-seam · KF-ES-3 cure-lock · KF-ES-1 · KF-ES-5 · KF-ES-18 · KF-TFP-2/-3/-15)

ONE composable at `demo/components/instrument/transport/channel-controls/composables/useEasingPickerSeat.ts`, consumed at BOTH seats (TimingFunctionPanel.vue; EasingSidebar.vue's seat call-site). Neither donor is lifted (the registry's ruling: both are defective).

- **Parameters (two, one of them "where truth lives")**: `truth: () => SeatTruth` and `onAuthored: (v: EasingPickerValue) => void`. `SeatTruth = { mode: "bezier" | "steps"; points: readonly [n,n,n,n]; steps: number; term: JumpTerm; presetName?: string | undefined }`. `presetName` is resolved BY THE CONSUMER against `NAMED_EASING_BEZIER` only — never `bezierPresets` (KF-ES-3's cure-lock; the catalogues are never merged; `smooth-step-3` stays engine-native).
- **`seed`** (computed): the picker's initial props `{ mode, steps, term }` + `preset` ONLY when `presetName` is set — built without `undefined` keys, which is what cures the two `exactOptionalPropertyTypes` TS2379s (TimingFunctionPanel(48,14) · EasingSidebar(27,14)) instead of casting.
- **`key`** (shallowRef counter): bumped ONLY by `reseat()` when truth carries a NAMED preset the mounted picker does not already show — never derived from the picker's own emissions (kills KF-TFP-1's self-triggering `:key`: the first drag off a preset-matched quad changes `points`, not `presetName`-as-shown, so no remount) — and NOT bumped when the last adopted picker value already equals the new truth by value (a preset pick INSIDE the picker that `nameForQuad` maps to a named curve re-enters as truth already displayed → no remount under the user's fingers, KF-ES-5).
- **`model`** (shallowRef<EasingPickerValue | undefined>) bound `:model-value`: a custom quad, steps and term reach the mounted picker through the vendor's own `{deep, immediate}` write-through (KF-CO-17 / KF-ES-4: model-writable for steps + custom quads; remount-with-`preset` only for NAMED display, because a points write stamps `"custom"`). On a named remount the model's points equal the preset's (byte-exact subset), so the vendor applies no `setHandle` and the preset label survives. Every value the vendor emits is ADOPTED back as the model, so the vendor's own suppressor swallows its re-entry.
- **`isEcho(v)` — a LIVE-state predicate over `truth()`**, never over a stale seed and never over a hard-coded `"ease-out-back"` (kills KF-ES-1 · KF-TFP-3 · KF-TFP-15's default coupling): mode mismatch → not an echo; bezier → `quadEq(v.points, truth.points)` at 5e-4; steps → `v.term === truth.term && (v.steps === truth.steps || v.steps === clamp(truth.steps, 1, 12))`. The clamp arm is **KF-CO-9's in-bounds half**: a stored count outside the vendor's 1–12 domain is DISPLAYED projected (the vendor emits its projection), and that projection is the echo of the truth-as-displayed — adopted, **never persisted**; the store keeps its count until the user authors one. The bounds are quoted from `constants.d.ts` because the subpath does not export them — booked as a KF-TFP-15-class MINOR coupling with the SS-6 ask (export `STEP_COUNT_MIN/MAX` from `./easing`).
- **`onPickerChange(v)`**: `undefined` → ignore; echo → adopt only; else `onAuthored(v)` then adopt.
- **`reseat()`**: called by the consumer's `watch` on its truth; reads truth, then: already shown by value → nothing; named preset → key bump (remount on `seed`); else → model write of a synthesized `EasingPickerValue` (css + fn from the demo's own `timingCurveUtils`).
- **`containerStyle`**: `{ containerType: "inline-size" }` bound via `:style` on the same host each seat already uses (the panel's `.easing-editor` div; the sidebar's Card) — KF-ES-18: **no `container-name`** (inert, and two scoped blocks were leaking one name into the flat global namespace); both scoped `.easing-editor` rules are deleted. The sidebar's rule + the Card's `easing-editor` class are read as part of the seat call-site (the seat's container host); the duration slider and its CSS remain untouched (out of bounds).
- **Consumers**: the panel's truth is `storedAnimationOptions` (mode from the literal's kind — `step-start`/`step-end` → `{1, jump-*}`; `presetName` via `NAMED_EASING_BEZIER`); its writer: steps → store `stepOptions` + emit `"steps"`; bezier → store `controlPoints` + emit `"cubic-bezier"` (KF-CO-40 ≡ TFP-5: the parent owns the engine write). The sidebar's truth is `demo.currentEasingName / bezierControlPoints / stepOptions`; its writer is the existing seam (steps → `stepOptions` + `selectEasing("steps")`; a quad that `nameForQuad` maps → `selectEasing(named)`; else `updateBezierPoints`). `test/demo/easing-catalogue.test.ts` (stubs `EasingPicker` at the module seam; asserts `preset === name` for NAMED tiles, `undefined` for steps tiles, `not.toBe(name)` for gap tiles) must stay green — the stub declares no `modelValue`, so the model binding falls through as an attribute.

#### D-B1 / N-2 / C-2 — the inset, decided before the byte (MISS-1 cure form · D-M12 recompute · D-M3 prose)

`<DrawerContent :style="{ '--drawer-inset-block-end': 'var(--dock-band-reserve-stable)' }">` — the custom property is set on the portalled `.glass-drawer` element itself (drawer.js merges `style`), never through a scoped selector (MISS-1: the consumer's `data-v-*` cannot reach a Teleport child). **Token choice**: `--dock-band-reserve-stable` (layout.css:108-118, the MONOTONIC peak of the measured menubar band) over the live `--dock-band-reserve`: the sheet's bottom edge must never drop mid-session when the menubar momentarily measures shorter (a live band would let the sheet jump), the token's own contract says over-reservation only ever keeps the subject MORE clear, and no cycle can form (the drawer's inset does not feed the menubar's ResizeObserver). SS-13 measures the tether at both detents; the token is one string to swap if measurement disagrees.
**D-M12 recompute**: with inset `b` (viewport fraction) the sheet's height is `(1 − b)·vh`, so a detent `t` shows `t·(1 − b)` of the viewport and leaves `(1 − b)(1 − t)` of stage above it; net of the ~0.11 top-dock band the unoccluded floor 0.45 requires `t ≤ (0.44 − b)/(1 − b)` — at `b = 0` that is 0.44 (the shipped 0.40 was right, D-M3), at `b = 0.08` (a 64px band on 800px) 0.39, at `b = 0.10` 0.378. **`EXPANDED_SUBJECT` 0.40 → 0.36** (holds the floor up to `b ≈ 0.12`; at `b = 0.10` unoccluded = 0.9·0.64 − 0.11 = 0.466). D-M12's chrome budget restated: at 667px vh the peek detent 0.12 shows `0.12·(667 − b·667)` = 80px at 0px inset, 72px at 67px inset — **below the 130px fixed chrome (44 + 24 + 54 + 8) before AND after the inset**; the sheet's peek is a grab handle, not a control row. The producer accepts px-string snap points (`snapPoints?: (number | string)[]`), so a chrome-fitting peek (`"140px"`) is the follow-on repair — NOT adopted here unmeasured (probe parsimony; the detent → `--glass-drawer-t` mapping for a string rung is not source-derivable at this seat). D-M3: the `.vue` and `.css` prose that still says 0.48 and points at the retired `proof:stage-visible` gate is rewritten to the shipped numbers; the two comments asserting "no bottom-inset lever" are rewritten to the consumed lever.

#### Part 2 — the seat, the inset and the gate LANDED · close at kf `2cd314af` (appended after part 1's `c8d4c2ac`; part 1 stands as written, E-3)

| commit | files | meaning |
|---|---|---|
| `7ff3acfa` feat | `composables/useEasingPickerSeat.ts` (CREATE, 225 L) · TimingFunctionPanel.vue · EasingSidebar.vue | the seat AS SPECIFIED above, byte for byte: `truth()` + `onAuthored` parameters; `seed` without `undefined` keys; `key` bumped only by an external named re-seat; `model` never `undefined` (the second half of the TS2379 cure — `modelValue?: EasingPickerValue` refuses `| undefined` under `exactOptionalPropertyTypes`); `isEcho` over the LIVE truth with the 1–12 projection arm; `reseat()` (shown-by-value → nothing · named → key bump · else → model write); `containerStyle` via `:style` on both hosts, both scoped `.easing-editor` rules deleted. Consumers: the panel (truth from the store; `presetName` via `NAMED_EASING_BEZIER` — its `bezierPresets` seed retired, KF-ES-3) and the sidebar's seat call-site (truth from the demo context; the writer unchanged in effect). ⟨cmd⟩ `npx vitest run --project demo test/demo/easing-catalogue.test.ts` → `31 passed (31)` — the cure-lock's own falsifier stays green |
| `cbd87a85` fix | ControlsPaneWrapper.vue · .css | D-B1 exactly as decided above: `:style="{ '--drawer-inset-block-end': 'var(--dock-band-reserve-stable)' }"` on `<DrawerContent>`; `EXPANDED_SUBJECT = 0.36` with the derivation beside it; D-M3 prose truth at the four sites (`.vue:14-26`, `:168`, `:313-325`; `.css:17-21`); ⟨cmd⟩ `grep -n 'proof:stage-visible\|0\.48' ControlsPaneWrapper.vue ControlsPaneWrapper.css` → only the `.css` sentence that names the retired pointer as retired |
| `2cd314af` test | `test/demo/instrument/channel-options-render-edge.test.ts` (CREATE) | G-KFW12-2's runtime clause — 5 tests: (0) the producer's names quoted at RUNTIME from the real `@mkbabb/glass-ui/labeled-field` module (`LabeledSelect.props` has `open` not `isOpen`; `.emits` has `update:open`; `LabeledSwitch.props` has `modelValue` not `checked`); (1) the switch renders the engine's `enabled: true` and re-renders `false` after a click that travels LayerConfigPanel → ChannelOptions → ChannelControls → the wrapper's edge → the parent's `group.setLayerConfig` (the app's own wiring, reproduced in the harness); (2) the weight slider: a keyboard step on the REAL reka Slider → the same chain → `aria-valuenow` 1 → 0.99 with the engine at 0.99; (3) the direction dropdown's `aria-expanded` flips on a primary-button mouse `pointerdown` on the REAL reka SelectTrigger; (4) the pencil seats `ease-in-out` as a preset, the first drag emits an unmatched quad, the store and the persisted literal move, and the EasingPicker instance count does NOT grow. **Born-RED 4 of 5 at `bf4a9a9c`** (the baseline copy carried one extra `dock` stub and two selector fallbacks for the baseline's own markup — stated in `evidence/W12/KF-W12-b-born-red.md`), GREEN 5 of 5 at the close, twice |

**What the gate test stubs, and why (a correction to the record's inherited "clean subpaths" list)**: computed over `dist/*.js` imports (`evidence/W12/KF-W12-b-producer-quotation.md`), the ROOT barrel, `button`, `number-field` (its stepper Button → `useLiquidPress` → `useSpring`), `easing`, `drawer` and `dock` all reach a `@mkbabb/keyframes.js` import and cannot load under vitest's externalized resolution; `labeled-field`, `tooltip`, `select`, `separator`, `card`, `motion-core` are clean. The test keeps `labeled-field` (the gate's subject: real reka Select / Switch / Slider) and `tooltip` real and stubs the rest at the module seam — the lane idiom every card-mounting demo test already uses. jsdom gaps polyfilled as symbols only (ResizeObserver · `scrollIntoView` · the pointer-capture trio reka's trigger calls before it opens); none alters a component under test.

**Gate readings at the close (double-run; transcripts in `evidence/W12/KF-W12-b-gate-transcripts.md`)**: G-KFW12-2 byte clauses `:is-open` **4 → 0** · `@update:checked` **1 → 0** · phantoms **18 → 0** · `container-name: easing-editor` **2 → 0**; runtime clause **5 passed (5)**; LOCK clause — `98675047` carries KF-CO-1 ×4 + KF-CO-8 + LP-1 together; ORDER clause — five step commits in the record's order, then feat → fix → test. §0u: vue-tsc **24 → 16**, this unit's 8 → **0**, no `as`/`@ts-expect-error`/`eslint-disable` written. `npm run test:demo` → `49 passed | 1 failed (50)` files, `428 passed | 1 failed (429)` tests — the failure is KF.W11's inherited RED, unchanged. `git diff --check` clean; eslint 0 on every file this unit touched except the pre-existing `vue/no-mutating-props` rows (TimingFunctionPanel 4 → 3, ControlsPaneWrapper 3 → 3, all baseline lines — KF-CO-45's carried question).

#### Roster — per id

**LANDED**: KF-CO-1 (×4 sites: direction · fillMode · blend · LP-16's model) · KF-CO-2 ≡ LP-4 · KF-CO-3 (+N-1, N-15) · KF-CO-4 · KF-CO-5 ≡ KF-TFP-7 · KF-CO-6 · KF-CO-8 ≡ LP-3 · KF-CO-10 (both halves) · KF-CO-13 · KF-CO-14 ≡ L·M-6 · KF-CO-16 · KF-CO-17 ≡ KF-ES-4 (the split seam, as ruled) · KF-CO-18 (kept, comment condensed) · KF-CO-21 · KF-CO-22 · KF-CO-23 · KF-CO-24 (re-scoped to the Button's own box) · KF-CO-26 · KF-CO-27 · KF-CO-28 · KF-CO-29 · KF-CO-31 · KF-CO-32 · KF-CO-33 · KF-CO-34 (+L·N-7) · KF-CO-37 ≡ LP-10 · KF-CO-38 · KF-CO-40 ≡ KF-TFP-5 (N-4, N-9, N-10) · KF-CO-41 · KF-CO-42 · KF-CO-44 · KF-CO-46 · KF-CO-47 (decided + executed) · L·N-16 · LP-1 · LP-2 · LP-6 · LP-11 · LP-12 · LP-13 · LP-14 (by deletion of the readout row) · LP-15 · LP-16 · LP-17 · LP-18 · LP-20 · LP-21 · LP-23 · KF-TFP-1 · KF-TFP-2 · KF-TFP-3 · KF-TFP-15 (the default coupling; the STEP bound coupling remains, below) · KF-ES-1 · KF-ES-3 (held) · KF-ES-5 · KF-ES-6 (the sidebar's rebuilt seat is born on the LIVE quad, never `ease`) · KF-ES-12 · KF-ES-18 · D-B1/N-2/C-2 · MISS-1 · D-M3 · D-M12 (recomputed; the px-string peek is the named follow-on).
**LANDED-BY frontier, booked GREEN-BEFORE-CURE (not claimed)**: KF-CO-35 ≡ LP-8 (NumberField, W6-I) · KF-CO-39 (dissolves with KF-CO-14's synchronous items) · N-5 / N-8 (⟨cmd⟩ `grep -rn 'omission\|empty value\|COLOR_SPACE\|HUE_METHOD' channel-controls/` → 0 at the baseline already).
**KF-CO-9 ≡ TFP-6 — in-bounds half LANDED, store half ESCALATED**: the seat displays an out-of-domain count projected and never persists the projection; the token itself — `defaultStepOptions.steps: 100` at `demo/state/animationOptionsStore.ts:54` — is outside this unit's writable set. The specified cure ("clamp the store default into the vendor domain") is one byte in a file this unit may not write; not substituted. → the store's owner (one-line change; the seat needs nothing further).
**ESCALATED, out of the writable set (not substituted, stated)**: KF-CO-12 (seed the bucket from `animation.options` — `getStoredAnimationOptions` in `animationOptionsStore.ts`) and KF-CO-11 (sequenced after 12 by the registry's own ruling); KF-CO-15 options half (`useAnimationSync.ts` — add `options.duration` to the bridge; a `:key` remount of PlaybackRibbon was REJECTED as a workaround; → KF.W13's C-2 joint commit); KF-CO-36 (`easingGroups.ts`); KF-CO-40's N-3 / N-8 residue in `useAnimationSync.ts` / reference-data; LP-22 (`useAnimationGroupActions.ts`); the three consumerless description tables (`animationDescriptions.ts`, reference-data owner); the four stale BG-11 comments (layout.css:99 · TransportDock.vue · AnimationControlsGroup.css · CubeScene.vue).
**CARRIED with reasons**: KF-CO-45 (store-leaf prop mutation in TimingFunctionPanel — a getter-threading refactor of a prop the parent owns; the three `vue/no-mutating-props` rows are its measure); KF-ES-2 (step-start/step-end edits on the stage — the sidebar's WRITER is out of this unit's two-call-site bound; the seat's truth already models the two keywords as `steps(1, jump-*)`, so the writer's cure is one branch when its owner opens it); KF-ES-23 (the `setStepOptions`/`setDuration` methods on the demo composable); the `vue/no-mutating-props` rows on ControlsPaneWrapper (baseline lines).
**SPF-1 / SPF-2 / SPF-13**: the KF-CO-47 decision above is recorded for them; SpringPhysicsFacet.vue's bytes are its owner's.

#### Residuals, stated

- **The render edge covers writes that CROSS the wrapper** (the app's whole UI path). An engine write that bypasses it (`transitionLayer` springs, a scene's direct `setLayerConfig`) is not re-rendered until the next crossing; the engine's `setLayerConfig` is `Object.assign` + a dirty flag with no event — a live subscription needs an engine seam (KF.W5's ask). A demo-side poll was not written.
- **The STEP bound coupling** (`STEP_COUNT_MIN/MAX` quoted from `constants.d.ts` because `./easing` does not export them) is a KF-TFP-15-class MINOR; it is the only producer value this unit spells demo-side.
- **`:inert` on collapsed rows** removes them from find-in-page while closed (stated at the byte).
- **D-M12's chrome-vs-peek**: the peek detent is shorter than the sheet's fixed chrome at every phone viewport, before and after the inset; the px-string rung is the follow-on and needs a measured detent → `--glass-drawer-t` mapping first.
- **The `.a` sibling's concurrent commits in the same checkout** were observed (its `KeyframesEditor.vue` diagnostics closed mid-sitting; its new test file appeared untracked and later committed). No pathspec of this unit ever included a sibling path.

#### Producer rows for SS-6 (relayed at `.g`, not sent from here)

1. `LabeledSelect` `open` — declare `default: undefined` (OP-5's shape) so an absent prop is uncontrolled rather than pinned shut; the same for `LabeledSwitch` `modelValue`'s absent case (or make it required in the type, as it already is).
2. `EasingPicker` — a `preset` field on the model (or an `initialPoints` prop) so a NAMED preset can be re-seated without a remount; export `STEP_COUNT_MIN/MAX` and `DEFAULT_BEZIER_PRESET` from the `./easing` subpath.
3. `LabeledSlider` — a readout seam (value affordance in the label track) so consumers stop welding the number into the label string.
4. `LabeledSelect` — an item-description slot (the per-item gloss the demo's three description tables carried and now cannot render).
5. `LabeledField` — a label-action slot (the pencil's seat; the hand-rolled label row would fold into the wrapper).
6. `DockControl.vue.d.ts` — say the hit-cell guarantee is dock-scoped (KF-CO-42's docstring note).
7. Vitest loadability — `button`, `number-field`, `easing` reach `useSpring` → `@mkbabb/keyframes.js`; a consumer with the self-alias cannot load them under externalized resolution (informational; the demo stubs at the seam).

#### The close sha KF.W13's KF-CO-15 carve opens on

kf **`2cd314af`** (this unit's last commit; ChannelOptions.vue's frontier for the KF-CO-15 options half). value.js record: part 1 `c8d4c2ac`, part 2 this commit. **Status: DONE with the named escalations** — every cure inside the writable set landed as specified; nothing was substituted, skipped, guarded or allow-listed.

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

---

### KF.W12.c

**SERVED MODEL: claude-fable-5-1** · unit **KFED-UNIT** (phase 2; after `.a` and after KF.W11 `.b`) ·
opened on kf **`2cd314af`** (`.b`'s close; `.a`'s head `ed96f2b0` is an ancestor — ⟨cmd⟩
`git -C ../keyframes.js rev-parse --short HEAD` → `2cd314af`; `origin/master` → `bf4a9a9c`, the
wave's open sha, unpushed by design until the orchestrator's merge) · sitting of record 2026-09-17
(the begin-word), wall clock 2026-09-19.

#### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**, both
value.js-delivered mail packets under `docs/tranches/V/coordination/` — outside every path in this
unit's writable set. ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 22 rows,
every one a sibling seat's (`demo/**`, `vite.config.ts`, `plugins/**`, `docs/tranches/V/**`,
`docs/tranches/X/waves/W5/`, `docs/tranches/V/megatranche/workflows/gates/`) plus `scripts/dev/dev.sh`
(**unowned, never staged, never touched**). `execution/B/KF-W12.md` clean at HEAD;
`docs/tranches/X/keyframes/evidence/W12/` holds only `.a`/`.b`'s committed files. **Zero dirty paths
inside this unit's writable set; zero inherited hunks; nothing finished, nothing rewritten, nothing
stashed, nothing restored.**

#### OP-6 — WHICH KF.W0 frontier repairs exist, verified at the bytes (the FIRST act, its own commit)

The bank (`kf-KeyframesEditor.md:10`) named two blockers *already repaired at the frontier*: FE-3's
`startScalar` (KF-KE-1) and EE-03's length-watch (KF-KE-9). Measured at three coordinates, double-run:

| repair | at `bf4a9a9c` (wave open) | at `2cd314af` (this open) | reading |
|---|---|---|---|
| **FE-3 `startScalar`** — ⟨cmd⟩ `grep -c 'startScalar' demo/components/instrument/keyframes/components/KeyframeCardList.vue` | **2 · 2** (the spec's own OP-6 figure reproduced) | **1 · 1** — ⟨cmd⟩ `grep -n 'startScalar' …` → `:92`, a COMMENT (KC-1's own prose naming what it replaced) | **SUPERSEDED, not regressed**: `.a`'s `f6a51e23` (KC-1 + KC-27) replaced FE-3's half-cure with the canonical `selectorText(frame.start)` — ⟨cmd⟩ `grep -c 'selectorText' …/KeyframeCardList.vue` → **4 · 4**, the binding at `:46`; ⟨cmd⟩ `grep -c '\.toString()' …/KeyframeCardList.vue` → **0 · 0**. The `[object Object]` guard FE-3 owed is `.a`'s KF-KC-48 clause (1) (`keyframe-card-offset-loop.test.ts:371`, `not.toContain("[object Object]")`), executed and GREEN. **This unit spends NO byte on KF-KE-1** and re-lands nothing over it. |
| **EE-03 length-watch** — ⟨cmd⟩ `grep -c 'templateFrames.length' demo/components/instrument/keyframes/composables/useKeyframesParsing.ts` | **1 · 1** | **1 · 1** — ⟨cmd⟩ `grep -n` → `:97 () => animation.templateFrames.length,` (`flush: "post"` + `nextTick`, the DISPOSITIONS §D cure verbatim); last commit on the file `fb2b1295` (pre-X) | **LIVE at the frontier, UNMOVED by this wave**; the file is `.e`'s row, not this unit's. **RE-REGRESSION GUARD ONLY**: G-KFW12-3's test carries a clause that mounting the editor raises no Vue *"Invalid watch source"* warning and that a structural removal reprojects — the EE-03 *watch-warn-count → 0* gate as an executed witness, never a cure. |

**Consequence for the cures below**: every KFED cure is written against `2cd314af`'s bytes, where
KC-1/KC-2/KC-3/KC-8/KC-9/KC-10/KC-15/KC-17/KC-18/KC-27/KC-28/KC-34 are `.a`'s LANDED work — a cure
written from the bank alone (`:43` frozen write, `:11` `.toString()`, `:186` `parseCssScalar`) would
re-introduce two fixed defects; the bank's anchors are re-resolved at the true bytes in each act.

**OP-2 — MET BY VACANCY, stated in this unit's own voice.** ⟨cmd⟩ `git log --oneline 69095552..HEAD --
demo/components/instrument/keyframes/composables/useKeyframeOps.ts` → *(no output)*; the file's last
commit is `0d456cff` (KF.W8 `.c`). KF.W11 `.b` spent no byte of it and KF.W11 is CLOSED, so the §B.2
clause *"the `:58-69` hunk is never re-touched"* is **vacuous** — there is no hunk to avoid and no
parallel writer. This unit takes the file whole under its row; `:58-69` (`updateFromString`'s parse +
`adoptCompiled` body) is left alone except where a named cure reaches it (KF-KE-55's dead
`kfControls.keyframes` write at `:59` and the §0u `(80,13)` diagnostic at `:79-80`, both this unit's).

**§0u ratchet, banked at this open**: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'`
→ **16 · 16** (the wave floor 24, never risen; `.a` −2, `.b` −8 in the same checkout). Inside this
unit's rows: **3** — `useKeyframeOps.ts(80,13)` TS2322 (the named one) and
`KeyframesEditor.vue(445,39)` · `(446,37)` TS2345 (the two `.a` DISCLOSED as moved into this region:
`setTargets(el1|el2)` over `HTMLElement | null | undefined` inside `removeKeyframe` — KF-KE-7's site).
All three fall with the cure that owns them; no cast, `@ts-expect-error` or `eslint-disable`.

**G-KFW12-3 at this open, double-run** (all from `/Users/mkbabb/Programming/keyframes.js`):
runtime ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/keyframes-editor-honest.test.ts` →
`No test files found` (⟨cmd⟩ `ls …` → `No such file or directory`, ×2) **RED (born)**; byte clauses
⟨cmd⟩ `grep -c 'parseCssScalar' …/KeyframesEditor.vue` → **2 · 2**; ⟨cmd⟩ `grep -c 'class="absolute top-2 right-4' …/components/KeyframeCard.vue`
→ **1 · 1**; ⟨cmd⟩ `grep -c 'toLowerCase()' …/composables/useKeyframesState.ts` → **1 · 1**; the
`:38-47` comment limb is at `KeyframeCard.vue:54-102` at these bytes (three comment blocks `.a`
re-stated and handed to this seat by name: KF-KE-45's *"KF-KE-5 is UNCURED at these bytes"*, KF-KC-22's
overlay hit-test, KC-25/KF-KC-28's `z-modal` + dead `sticky`). ⟨cmd⟩ `grep -rc 'keyframes-style-' demo | grep -v ':0$'`
→ `useKeyframesState.ts:2` · same — the headline defect reproduces.

#### KF-KE-4 — THE APPLY IDENTITY, DECIDED HERE BEFORE A BYTE (§Sequencing 8; the LOCK)

**The chain at `2cd314af`, re-walked**: the class added to every target is `getClassName()` =
`options.styleId` (`useKeyframeBrushApply.ts:33` → `useApplyCSS.ts:47-49`) = `keyframesStyleId` =
`` `keyframes-style-${animationUUID}` `` (`useKeyframesState.ts:16`); the injected sheet is
`CSSKeyframesToString(animation, getTmpAnimationName())` (`useKeyframesParsing.ts:37-40`) whose only
selector rule is `` `.${name} {` `` + `animation-name: ${name}` + `` `@keyframes ${name}` ``
(`src/animation/compile/emit/format/options.ts:37-…`, `format.ts:365-…`, read at the source), and
`getTmpAnimationName()` = `keyframesStyleId.replace("keyframes-style-", "").toLowerCase()`
(`useKeyframesState.ts:41-43`). `"keyframes-style-" + X ≠ X.toLowerCase()` for every `X`.
LAW A census (§B.3(4)) re-run: ⟨cmd⟩ `grep -rn 'keyframes-style-' demo src test` → the two
`useKeyframesState.ts` sites and two PROSE mentions (`src/animation/public.ts:146`,
`test/_root/public-surface.test.ts:17`, both N-8's example) — **nothing else keys on the class token.**

**DECISION — arm (i), `class = selector`, taken at `useKeyframesState.ts:41-43` alone.**
`getTmpAnimationName()` returns **`keyframesStyleId` verbatim** — the very token the brush
composable already adds as the class — so the class on the target, the `.selector`, the
`animation-name` and the `@keyframes` name are ONE string **by construction**, not by agreement
between two derivations. The `.replace(…)` and `.toLowerCase()` are deleted (G-KFW12-3's
`toLowerCase()` clause 1 → 0); the function keeps its exported name because its two consumers
(`useKeyframesParsing.ts:26/:39` — `.e`'s row; `KeyframesStringControls.vue:75` — `.d`→`.e`) are
outside this unit's carve, and its docstring is rewritten to say what it now is.

**Rejected — arm (ii), "pass `getTmpAnimationName()` as the class"**: its bytes are
`useKeyframeBrushApply.ts:33` (§B.2 assigns `:33` to `.e`) and the `KeyframesStringControls.vue:75`
import (`.d`→`.e`), both outside this seat; and it would keep the lowercased strip alive as the
identity's source — exactly the second hand-rolled derivation beside `cssIdent` that N-8 forbids and
§L-18 (ii) names as a failure base.

**What this unit deliberately does NOT do**: no sanitization, no case-folding, no second derivation.
The raw `` `${superKey}-${animationId}` `` interpolation (`createAnimationUUId`,
`animationOptionsStore.ts:124-131`) stays; routing it through KF.W5's published `cssIdent`
(`dist/keyframes.d.ts:788`, body `name.replace(/[^a-zA-Z0-9_-]/g, "-")` + a leading `a` when needed)
is N-8, `.e`'s FIRST row. **Measured consequence, named for `.e` rather than patched here**: an
`animation.name` carrying a space — `useSpringKeyframesEditor.ts:66` sets `"Spring Keyframes"` — makes
the ONE token `keyframes-style-<superKey>-Spring Keyframes`, which `Element.classList.add` REJECTS
(`InvalidCharacterError`) and `#id` selector syntax rejects; that holds under BOTH arms and today's
bytes alike, and only the `cssIdent` route cures it. This unit's gate therefore executes the identity
on an ident-clean animation id that carries an UPPERCASE letter (`offsets-Transform`-class), so the
proof is independent of case and the space case is `.e`'s G-KFW12-5.

**Proof by execution, not by reading (§L-18 (v))**: `keyframes-editor-honest.test.ts` mounts the REAL
editor over a REAL parsed animation with a REAL target element, activates the Apply control, then
reads (a) `target.classList` and (b) the injected `<style>`'s `textContent`, and asserts that the
selector `.${class}`, `animation-name: ${class};` and `@keyframes ${class}` all name the SAME string
as (a). Both strings are pasted below from the executed run.

**Then L-M3 / C-B2's residue is re-derived against the working feature** (in the KF-KE-6/KF-KE-12
block below, after the identity lands), because until Apply applies something, "two owners of one
working stylesheet" cannot be observed.

**The KF-KE-6 lift, designed here (the same decision-before-patch law)**: the `<style>` node, the
`isApplied` flag and `prevPaused` move from per-instance refs to a **module-level registry keyed by
the style id** — `holders` refcounted on mount/unmount across the three closures over one animation
(`KeyframesEditor.vue` ×2 slot copies + `KeyframesStringControls.vue` ×1 force-mounted under `v-show`);
the node is created **lazily on the first `setContent`** (KF-KE-66: no empty `<style>` per mount);
the LAST holder out removes it and, if the identity is applied, `clear()`s — pause state restored,
class removed (KF-KE-12 ≡ N-5's `clear()` into `onUnmounted`, made refcount-aware so an owner
leaving while another is live does NOT tear the feature down under it). Both owners read ONE
`isApplied`, so `aria-pressed` on either brush is the truth (C-B2's cross-restoration). No
`querySelector('#' + id)` adoption remains (the registry IS the adoption).

**KF-KE-7's gate, designed here**: the exit choreography is DECORATION and the removal is the
COMMAND — the command commits whether the choreography resolves, rejects or is skipped: a `departing`
set makes a second click on a leaving stop a no-op (the re-click window over shifting indices), the
neighbour motion runs only when a neighbour EXISTS (the `(445,39)`/`(446,37)` diagnostics fall with
the guard, never with a cast), the motion's rejection is REPORTED through the house non-toast boundary
and the removal still lands (headless, `warpLeft` rejects with `BrowserScalarResolutionError` — `.a`'s
measured finding; a rejected flourish never drops a delete again), and under reduced motion the group
snaps (`AnimationGroup.respectReducedMotion` defaults `true` at `group/group.ts:66` — LANDED-BY KF.W5,
booked GREEN-BEFORE-CURE, never claimed; the brush's standalone bag is this unit's KF-KE-8 byte). The
editor's duplicate last-keyframe guard is deleted so `removeKeyframeData`'s toast is the live floor
(KF-KE-61); `.a`'s `canRemove` keeps the control disabled there.

---

### KF.W12.d

SERVED MODEL: claude-fable-5-1 · **EDITOR-UNIT** (phase 2, Fable-worker seat) · 2026-09-19 · keyframes.js base **`2cd314af`** (⟨cmd⟩ `git rev-parse --short HEAD` → `2cd314af`; = `origin/master` at this seat's open; `.a` closed at `ed96f2b0`, `.b` at `2cd314af`).

**Crash-recovery (standing law, first act)**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → the two untracked value.js-delivered coordination letters only (outside every path of this set); ⟨cmd⟩ `git -C value.js status --porcelain` → 21 modified + 3 untracked rows, every one outside this unit's writable set (`scripts/dev/dev.sh` unowned, never staged, never touched; the demo/ rows are a sibling track's). **Zero dirty paths inside this unit's writable set; zero inherited hunks; nothing stashed, nothing restored.**

**Baseline, measured before the first edit (double-run)**: byte clauses ⟨cmd⟩ `grep -c 'tabFocusMode' …/keyframes/CSSCodeEditor.vue` → **0 · 0**; ⟨cmd⟩ `grep -c 'isFormatting' …/keyframes/KeyframesStringControls.vue` → **4 · 4**; ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **16 · 16** (the wave's 24 already lowered by `.a`/`.b`); inside this unit's rows exactly two, both `KeyframesStringControls.vue` — `(54,9)` TS6133 `'CSSKeyframesAnimation'` and `(75,5)` TS6133 `'getTmpAnimationName'` — **both `.e`'s by the re-open table** (the apply/teardown region; this unit's latch cure does not reach either import, so neither is zeroed here — stated now so it is not read as a miss later). Tests naming the subject at open: ⟨cmd⟩ `grep -rln 'CSSCodeEditor\|monaco' test/` → *(no output)* — KF-CE-44 reproduced at the frontier.

**Frontier re-anchor of the record's rows (D-19), at `2cd314af`** — the file is 261 L and several rows are ALREADY LANDED at the frontier, each booked GREEN-BEFORE-CURE, never claimed: **KF-CE-11** (the `.js`-suffixed specifier at `:48` and `:72` and the narrowed `typeof Monaco` — `LANDED-BY 5388907b`, KF.W4 `.a`; vue-tsc reports 0 diagnostics in the file); **KF-CE-16's call-site half** (`debounce(fn, 200)`, two args — same sha); **KF-CE-17 / KF-CE-23** (`<Card cartoon :shadow="false">` — `LANDED-BY 58987052`, KF.W6); **KF-CE-20** (`--font-mono` read at create — `LANDED-BY 67ad9766`, KF.W6 `.k`). Still true at the bytes: `accessibilitySupport: "off"` (:176 → :185 after commit 1), the Promise.all over both `?worker` chunks, `m.languages.register({ id: "css" })` with no tokenizer, three `setValue` rituals, the 200 ms debounce with no cancel, the header's "the `css` language" sentence and its two "4 MB" figures (KF-CE-41), `formatCSSContent` with no error path, the Ï dead-key literal at KSC `:101` (the "correct chord idiom" the record cites at `KeyframesAddDialog.vue:138-141` is GONE at the frontier — ⟨cmd⟩ `grep -n 'metaKey\|ctrlKey\|e.key' …/KeyframesAddDialog.vue` → no chord; the dialog was swapped for the `CSSPasteDialog` shell — so the chord is re-derived here, below).

#### Commit 1 — KF-CE-3 FIRST (the lock) · kf **`7cda421c`**

`tabFocusMode: true` at `editor.create`, contrib-free (the ruling's own cheapened cure: `codeEditorWidget` seeds the `tabDoesNotMoveFocus` context key from `options.get(tabFocusMode) || TabFocus.getTabFocusMode()`), with a docblock true at the bytes; `accessibilitySupport: "off"` left in place for KF-CE-5. G-KFW12-4 case (1) — a Tab keydown dispatched at the focused `.monaco-editor textarea` — **born-RED (`defaultPrevented` true) → GREEN**; byte clause **0 → 2 · 2**. Evidence: `evidence/W12/KF-W12-d-born-red.md` §1–2 (the whole 4-of-4 RED transcript at the base bytes, then the 3-of-4 after this commit).

#### The KF-CE-1 / KF-CE-4 fork — DECIDED HERE, BEFORE THE ARM'S BYTE (§B.3(2); §Sequencing 8)

The census (evidence §3, read-only at the installed 0.55.1): the `editor.api` closure already carries `setMonarchTokensProvider` + `setLanguageConfiguration` and the Monarch compiler; monaco's own `basic-languages/css/css.js` is **pure data with zero imports** (`conf` + the Monarch `language`); the only path that drags the contribution set back is `css.contribution.js` → `_.contribution.js` (killed #3, DEAD, not taken). `vendor-monaco` re-measured at the base bytes (evidence §4): **2,525,021 B** (+ `css.worker` 1,054,628 B + `editor.worker` 279,948 B) — U.D5's figure is not cited as like-for-like.

**ARM (b) — hand-register the tokenizer + the language configuration; bytes stay saved; the contribution set stays absent BY DECISION.** Reasons, in order: (i) the trap is already cured by option (commit 1), so arm (a)'s one a11y advantage (`toggleTabFocusMode` returning) buys nothing the user does not already have; (ii) the surface is a 450px / 250px keyframes SNIPPET editor whose format is one chord away — find/folding/context-menu/comment-toggle/multicursor are desktop-IDE affordances the demo's own perf program (U.D5, E.W4 S1, the LCP outlier) chose to pay for with their absence; restoring ~1.6 MB of contributions for them reverses a measured product decision this unit was not asked to reverse; (iii) arm (b) makes the css language SERVICE worker deletable (KF-CE-15's "Monarch-only → delete both the import and the arm"), so the lazily fetched bytes go DOWN by ~1 MB rather than up; (iv) the tokenizer used is the VENDOR'S OWN definition imported directly (`basic-languages/css/css.js`), not a hand-written grammar — the honest reading of "hand-register": the registration is ours, the grammar is monaco's, no contribution loader in between. **Said to be absent, by decision**: the find widget, the context menu, comment toggle (Ctrl+/), folding, bracket-matching decorations, multicursor, hover, clipboard actions beyond the browser's own, the unicode highlighter — none is restored; a future seat that wants them takes arm (a) at that cost and re-measures. D-9's pinned note (overflow widgets) does not revive: no suggest controller is loaded under (b). **Consequence for the theme rows**: §B.2 makes the theme JSONs writable *"conditional on arm (a)"*; under (b) the Monarch tokens make the two themes' token rules live just as (a) would (the token scopes `tag · attribute.name · attribute.value · keyword · comment · string · number` are the ones the vendored rules name), but the bound is the bound — **the theme files are NOT written by this unit; KF-CE-33 / KF-CE-34 / KF-CE-47 are ESCALATED below with the measured reason**, not patched around.

**The re-measurement AFTER the arm is appended to evidence §5 at the arm commit** (WRITE-THEN-MEASURE: a fresh `npm run gh-pages`, the same `stat -f %z`).

#### LAW A census — `debounce`'s additive `.cancel` handle (§B.3(1)), pasted BEFORE it lands

⟨cmd⟩ `grep -rln 'debounce' demo | xargs grep -ln helpers` → `demo/utils/helpers.ts` (the definition) · `…/keyframes/composables/useKeyframesEditor.ts` · `…/keyframes/CSSCodeEditor.vue` · `…/keyframes/composables/useKeyframeOps.ts` · `…/keyframes/composables/useKeyframesParsing.ts`. **Corrected by reading**: `useKeyframesEditor.ts` matches only on the identifier `debouncedUpdateAllStrings` (`:47`) and imports nothing from helpers — it is NOT a consumer. The consumers are exactly the spec's three: **`CSSCodeEditor.vue`** (`:60` import, `:132` `debouncedEmit`) · **`useKeyframeOps.ts`** (`:3` import; `:86` `updateAnimationFromKeyframesString`, `:107` `updateAnimationFromKeyframeString`) · **`useKeyframesParsing.ts`** (`:1` import; `:62` `debouncedUpdateAllStrings`). The change is ADDITIVE — the returned function keeps its call signature and trailing-edge semantics and gains a `.cancel()` property; **no consumer's behaviour changes when it does not call `.cancel()`** (the two composables never will; they are `.c`'s / `.e`'s rows and are not touched). It lands ALONE in its own commit.

*(part 2 — the remaining commits, gate readings BEFORE→AFTER, roster, residuals, escalations — appended below after they land)*

#### KF.W12.d — part 2: the commits, the gate BEFORE→AFTER, the roster, the escalations · unit head kf **`ec49bbef`** (appended after part 1's `e52c2f2c`; part 1 stands as written, E-3)

**Status: ESCALATED** — every row inside the writable set that does not need the tokenizer LANDED as specified; the arm's ONE byte cannot land under §0u without a five-line ambient declaration that lives outside this unit's set (E-d1, below); nothing was substituted, skipped, guarded or allow-listed. Seven kf commits (SELF-COUNT: ⟨cmd⟩ `git log --oneline 2cd314af..HEAD | grep -c 'X.KF.W12.d'` → **7**); transcripts in `evidence/W12/KF-W12-d-gate-transcripts.md`; the fork, the census, the re-measurement and the preserved hunk in `evidence/W12/KF-W12-d-born-red.md`.

| # | sha | files | meaning |
|---|---|---|---|
| 1 | `7cda421c` | CSSCodeEditor.vue | **KF-CE-3 FIRST** — `tabFocusMode: true` at create (part 1) |
| — | *(not landed)* | CSSCodeEditor.vue | **KF-CE-1/4 arm (b)** — the vendor's own Monarch css definition + `setLanguageConfiguration` hand-registered in the boot, the css worker and its `label === "css"` arm deleted (KF-CE-15), the editor worker's import moved inside `getWorker` off the boot path (KF-CE-39), the header rewritten to the bytes (KF-CE-41), the narrow `IStandaloneThemeData` cast (KF-CE-29). Built and measured (**+4,255 B** on `vendor-monaco`, **−1,054,628 B** css.worker not emitted, U.D6 entry clause 0/0), runtime GREEN (case (2)) — then **taken back out of the shared tree** because it raises the ratchet by one TS7016 (monaco ships no `css.d.ts`; `exports` has no types condition). Hunk preserved byte-exact in the evidence → **E-d1** |
| 2 | `ccda20c7` | helpers.ts | **the `debounce` `.cancel` handle, ALONE**, its LAW A census pasted in part 1 before the byte; additive; no consumer's behaviour changes when it does not call it |
| 3 | `850b62a9` | CSSCodeEditor.vue | **KF-CE-2 child half + KF-CE-8 + the re-projection contract** through ONE `replaceContent()` seam (KF-CE-31): cancel-on-external-write, cancel-on-unmount (KF-CE-18), `executeEdits` between undo stops never `setValue` (KF-CE-6), echo suppression on `lastEmitted`, the focus guard that DEFERS a mid-authoring round-trip to blur and applies the model's CURRENT truth there, immediate projection when unfocused; `formatCSS` writes through the seam AND emits synchronously (KF-CE-7); `setValue`/`getValue`/`editor()` exposes deleted (KF-CE-27 — zero consumers: the two parents bind `v-model` and reach only `formatCSS`) |
| 4 | `b6914c36` | KeyframesStringControls.vue · RibbonBar.vue | **KF-CE-9 + KF-CE-37 ≡ RB M-3/C-8, ONE boundary** at `formatEditor` — both the chord and the ribbon's Format button reach it; the rejection caught in the house `withErrorToastAsync` form (toast + description + Retry; the idiom is module-private to `useKeyframeOps.ts`, `.c`'s file, so it is written in its form, not imported), the latch released in `finally`; the ribbon's un-awaited call SAID to be so by design at the byte; KF-CE-35 the chord is Shift+Alt+F on `e.code` (the `Ï` literal was that chord's macOS dead-key output; the record's cited idiom at `KeyframesAddDialog.vue:138-141` no longer exists — re-derived); KF-CE-36 one stable toast id on the parse pair |
| 5 | `6f065d36` | CSSCodeEditor.vue · KeyframesStringControls.vue (the `aria-label` its parent passes) | **the tail** — KF-CE-5 (`accessibilitySupport` at monaco's own `auto`) · KF-CE-10 (a rejected boot dropped, not cached; alert + reason + a real Retry) · KF-CE-14 (`aria-busy` under the producer's `Skeleton` sheen — root-barrel-only at 7.0.0, already eager, no new chunk; killed #2 stands) · KF-CE-13 (theme chosen with `forced-colors` in hand: monaco's hc pair when active) · KF-CE-19 (`updateOptions` on the geometry props) · KF-CE-21 (`ariaLabel` prop; the pane names its editor "Keyframes CSS") · KF-CE-24 component half + 25 + 26 + 49 (the print width from the editor's OWN layout — `contentWidth` over the rendered font's half-width advance; the `convertPixelsToCh` reach and both unreachable guards gone) · KF-CE-28 (`onFlipSettled`, unsubscribed on unmount) |
| 6 | `b965afa1` | test/demo/instrument/css-code-editor-seam.test.ts (CREATE) | **G-KFW12-4's runtime clause** — four behaviours against the REAL monaco 0.55.1 under jsdom through the component's own boot; born-RED 4 of 4 at `2cd314af` |
| 7 | `ec49bbef` | the test | harness: the docblock's skip-census literal reworded; the canvas shim installed by `defineProperty` (tsc test-perimeter diagnostic 1 → 0); no assertion touched |

**Gate G-KFW12-4, BEFORE → AFTER (double-run, `evidence/W12/KF-W12-d-gate-transcripts.md`)**: runtime `No test files found` → `4 failed (4)` (the file first) → **`1 failed | 3 passed (4)` · same** — (1) Tab not swallowed GREEN · (3) the stale emit cancelled GREEN · (4) the rejected format surfaced, the latch released, the good format reaching the model GREEN · **(2) the tokenizer RED, pending E-d1** (GREEN with the hunk in the tree, measured); byte clauses `tabFocusMode` **0 → 2 · 2** · `isFormatting` **4 → 6 · 6** (recorded); the fork written down with `vendor-monaco` re-measured (part 1 + evidence §4–5); every docblock the seam carries re-read at the head bytes — the contract block, the boundary block, the three-state well, the width, the chord, the flip — each describes what is there. **Verdict at this head: RED on one limb of five, by the escalation alone.** §0u: total **16 → 15 · 15** (moved under `.c`'s concurrent work; this unit's own rows unchanged at 2, both `.e`'s); never raised. `npm run test:demo` → `2 failed | 50 passed (52)` twice — KF.W11's inherited (4b) + this unit's case (2). Skip census **0**; masking census **0**; eslint clean; `git diff --check` clean.

#### Roster — per id (U4's list; ids for life)

**LANDED**: KF-CE-2 (child half) · 3 · 5 · 6 · 7 · 8 (+ the re-projection contract, kf-KeyframesStringControls `:47`'s joint obligation — the child's law is written at the bytes; the PARENT-side wiring of a Controls-tab option edit into `cssKeyframesString` — the projector the record says does not exist — is `.e`'s / the composables' owner's, named, not reached across for) · 9 · 10 · 13 · 14 · 18 · 19 · 21 · 24 (the component's ONE width fn; the inert twin in `useKeyframesState.ts`/`useKeyframesEditor.ts` is out of set → carried) · 25 · 26 · 27 · 28 · 31 · 35 · 36 · 37 · 44 (the born-RED gate exists; enabled WITHOUT KF-CE-48 by the module-graph identity of `editor.api` under vitest) · 49.
**LANDED-BY frontier, booked GREEN-BEFORE-CURE (not claimed)**: KF-CE-11 + KF-CE-16's call-site half (`5388907b`, KF.W4 `.a`) · KF-CE-17 / KF-CE-23 (`58987052`, KF.W6) · KF-CE-20 (`67ad9766`, KF.W6 `.k`).
**ESCALATED — E-d1 (the arm; ride the preserved hunk)**: KF-CE-1 · 4 · 15 · 39 · 41 (the header's "4 MB" ×2 and "the `css` language" sentence are rewritten INSIDE the hunk and therefore still stand at today's bytes — stated, not hidden) · 29.
**ESCALATED — E-d2 (theme files, §B.2 "conditional on arm (a)")**: KF-CE-33 (Dracula `editor.selectionBackground` = `editor.lineHighlightBackground` = `#44475a`, a `colors` key that paints TODAY) · 34 (no `editorLineNumber.foreground` in either theme) · 47 — under arm (b) the Monarch tokens make the vendored token rules live exactly as (a) would, so the bound's condition is mechanically moot, but the bound is the bound: not written.
**CARRIED with reasons (out of the writable set or a decision the record leaves open)**: KF-CE-38 (the edit path bypasses the 1000 ms guarded op — the false comment lives in `useKeyframeOps.ts`, `.c`'s, and re-wiring `onEditorChange` through it is a parse-RATE decision the record leaves to "deliberately"; not spent) · KF-CE-40 (`keyframes/index.ts` barrel) · KF-CE-43 (`formatEditorCSS.ts`'s `scss` parser) · KF-CE-45 (the `border` prop's name — its second consumer is the read-only timeline) · KF-CE-48 (`monacoBoot.ts` extraction — a new file outside the set; the gate proved authorable without it) · KF-CE-24's inert-twin delete.
**Not this unit's, named**: KF-CE-2 parent half (KF.W7, landed) · KF-CE-16's gate half (KF.W4) · KF-CE-12/42 (KF.W8) · 22 · 23 · 30 · 32 · 46 (their waves).
**Single-row routings from kf-EasingSidebar / kf-EasingScene into EDITOR-UNIT**: ⟨cmd⟩ `grep -n 'EDITOR-UNIT' kf-EasingSidebar.md kf-EasingScene.md` → *(no output)* — **none exist at the registry bytes**; nothing booked, nothing excluded.

#### Escalations, returned (per §Triumvirate — a specified cure impossible inside the set; not substituted)

- **E-d1 — the arm's ambient declaration.** `import("monaco-editor/esm/vs/basic-languages/css/css.js")` is TS7016 at the installed 0.55.1 (no `css.d.ts`; `exports` `"./*"` has no types condition). The grant asked: the five-line `declare module "monaco-editor/esm/vs/basic-languages/css/css.js" { … conf: languages.LanguageConfiguration; language: languages.IMonarchLanguage }` in **`demo/env.d.ts`** (the demo's ambient-shim home; not a §B.2 row) — or the orchestrator's KF-WRITE. On the grant, the preserved hunk lands as `feat(kf/editor · X.KF.W12.d · KF-CE-1/4 arm (b) …)` (it was diffed over `7cda421c`; later commits shifted its context — apply with `git apply -3` or by the block text), case (2) turns GREEN, and `vendor-monaco` is re-measured a third time at the landed sha. `@ts-expect-error`, an `as` widening, or a non-literal specifier were each refused by name.
- **E-d2 — the theme repairs** (KF-CE-33/34/47): one key each in `Dracula.json` / `GitHub.json`; the §B.2 condition names arm (a) only. Ask: read the condition as "once a tokenizer is registered" and let `.d` (or `.g`) land the three keys.
- **Handed to owners, not sailed**: the parent-side re-projection wiring (KF-CE-8's other half; the option-edit → `cssKeyframesString` projector) → `.e` / the composables' owner; KF-CE-38's rate decision → `.c` with its comment.

#### Residuals, stated

- The latch's 300 ms grace after release is a timing window: a format-induced parse whose awaits outlast it would toast "Keyframes parsed" beside "CSS formatted"; the parse toast's stable id makes that a replacement, not a stack.
- The focus guard's premise — nothing but this editor's own emits moves the model while the user holds text focus — is stated at the bytes; a future parent that writes the model from a keyboard shortcut scoped INTO the editor would defer its own write to blur.
- The boot-failure Retry re-runs `initEditor` (verified by reading; no test provokes a boot rejection — a fetch failure is not reproducible inside vitest's module graph).
- The hc theme choice under `forced-colors: active` is closed on source; its rendered result is SS-13 #4's (UNPROVEN-NEEDS-LIVE, unchanged).
- `grep -c accessibilitySupport` reads 1 at the head: the comment that names the option monaco is left to decide.

#### E13

Swept read-only at this seat's clock (four paths + the register): 24 · 9 · 13 · 28 entries; the only file newer than 2026-09-19 00:00 outside `INBOX.md` is keyframes' own `INBOUND-LEDGER.md` (a ledger, not a letter); BK is still the newest glass tranche dir; ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **80 · 80**; the positional Status-cell leading-verb scan → **0** UNREAD; tail `I-35` / `O-40`. **No unread mail in this unit's scope; no row minted, no row's status changed.** Producer rows this unit surfaces for `.g`'s SS-6 relay: (1) monaco ships no `.d.ts` beside its `basic-languages/*/<lang>.js` grammars and its `exports` wildcard carries no types condition — an upstream ask, informational; (2) glass-ui `Skeleton` is root-barrel-only (killed #2 re-verified at 7.0.0: no `./skeleton` subpath).

#### The shas `.e` opens on

| shared path | last commit by this unit |
|---|---|
| `demo/components/instrument/keyframes/KeyframesStringControls.vue` | **`6f065d36`** (the boundary at `b6914c36`; the `aria-label` at `6f065d36`) |
| `demo/components/instrument/transport/controls-pane/RibbonBar.vue` | **`b6914c36`** |
| `demo/components/instrument/keyframes/CSSCodeEditor.vue` (not shared, recorded) | **`6f065d36`** |
| `demo/utils/helpers.ts` (not shared, recorded) | **`ccda20c7`** |
| **unit head** | **`ec49bbef`** |

`.e` inherits by name: `KeyframesStringControls.vue(55,9)` · `(76,5)` — its two TS6133s, untouched, now one line lower than the re-open table's `(54,9)` · `(75,5)` because of this unit's boundary docblock.

### KF.W12.c — part 2 (the close)

SERVED MODEL: claude-fable-5-1

**Status: PARTIAL** — G-KFW12-3 GREEN on every clause (runtime 7 of 7, four consecutive runs; byte clauses 2→0 · 1→0 · 1→0; the `:38-47` comment rewritten); the §0u ratchet gate RED on ONE diagnostic, ESCALATED at its root (E-c1) — nothing narrowed, cast, guarded or allow-listed. Twelve kf commits (SELF-COUNT: ⟨cmd⟩ `git log --oneline 2cd314af..HEAD | grep -c 'X.KF.W12.c'` → **12**); unit head **`c82f92ea`**. Transcripts in `evidence/W12/KF-W12-c-gate-transcripts.md`; the born-RED and the bites in `evidence/W12/KF-W12-c-born-red.md`; the identity's both strings, chain and the L-M3/C-B2 re-derivation in `evidence/W12/KF-W12-c-apply-identity.md`. (This part sits below `.d`'s receipt because `.d` appended first; the unit's part 1 is at `### KF.W12.c` above — E-3, nothing edited in place.)

#### The acts, in order, each with its sha

| # | act | sha | proof |
|---|---|---|---|
| 0 | OP-6 frontier verification + OP-2 by vacancy + §0u banked 16·16 (value.js) | `88655c02` | part 1 |
| 0′ | the apply identity DECIDED before a byte; KF-KE-6/-7 designed (value.js) | `ec334c53` | part 1 |
| 1 | **KF-KE-4** — class = selector: `getTmpAnimationName()` returns `keyframesStyleId` verbatim; the strip + `toLowerCase()` deleted | `1b29fb22` | born-RED `class="keyframes-style-kfed-offsets-Transform"` vs `selector="kfed-offsets-transform"` → GREEN all four strings equal, twice (pasted, evidence §3) |
| 2 | **KF-KE-6 + KF-KE-12 ≡ N-5** — sheet/`isApplied`/`prevPaused` lifted to registries keyed by style id (refcounted, lazy, last-holder-out); `clear()` into `onBeforeUnmount`, refcount-aware; adoption = the registry, never `querySelector` | `7a10d7ff` | clause (5); the bite reds `expected +0 to be 1` |
| 3 | **KF-KE-5 (BLOCKER)** — cluster on `z-content` + `pointer-events-none`/`-auto` row; the `<pre>` loses `relative`; the `:38-47` comment and two more (KF-KE-45 / KF-KC-22 / KC-25) rewritten to describe what is there; the offset field's `sticky` + `z-modal` gone (KC-25 ≡ KF-KC-28 ≡ KF-KE-41 ≡ KF-KE-22's sticky half) | `d10ab8b4` | clause (3); byte clause 1→0; `.a`'s nine card cases green |
| 4 | **KF-KE-3 (+ -26 · -37 · -46)** — `requireKeyframeSelector` at the field; commit on `change` from a local draft; `invalid` → `aria-invalid` + described-by status in the house register; the editor's seam replaces the frozen selector whole | `73e57a93` | clause (2): `500%`/`-20%` refused at the field with the model untouched; keystrokes alone commit nothing; `25%`/`from`/`entry 50%` commit whole; byte clause 2→0 |
| 5 | **KF-KE-7 (+ KF-CB-11's shell = `.a`'s KC-3, standing together; KF-KE-61)** — removal = command, motion = decoration under a budget; departing set keyed by frame id; the motion targets only elements that exist (the two TS2345 fall with the guard) | `eda8bc43` | clauses (4a)/(4b) |
| 6 | **KF-KE-8** — the brush (standalone, infinite) opts in via `respectReducedMotion: true`; the group rides `AnimationGroup.respectReducedMotion = true` (KF.W5, LANDED-BY); sweeps via their bags (KAD-11) | `a10e5793` | bytes; `.e`'s D-25 named as the other half |
| 7 | **KF-KE-24 pipeline half** — the hljs theme injected under `@layer components` (so `bg-transparent` outranks the theme's `.hljs` plate by layer order); the KF-KE-32 comment re-stated as landed | `c026121a` | bytes + clause (1)/(3) still green |
| 8 | **the tail** — KF-KE-13 · 19 (stated) · 20 · 28 · 33 · 38 · 44 · 48 · 49 · 51 · 55 · 56 · 58 · 60(ii) · 62 · 63 · 65 · 57 (the last hyphenated literal); the one TS2322 named at its root | `eba0bd6b` | bytes; suite green |
| 9 | **G-KFW12-3** — the harness + 7 cases (8 with the (4a)/(4b) split) | `5e95bdf3` | `7 passed (7)` |
| 10 | **KF-KE-7 correction, found BY the gate** — budget = 2 × the motion's declared length (was + one frame; a loaded runner's 730 ms landing read as a hang and the removal committed before the card left) | `781ac250` | evidence born-red §6 |
| 11 | (4a) deterministic at the `AnimationGroup.of` seam; (4b)'s window follows the new budget | `4fa6efec` | 3 consecutive 7/7; `test:demo` 2 failed (neither mine) ×2 |
| 12 | KF-CE-41 prose — the card comment names the replaced parser by kind, not the retired token (a false hit for the wider byte census) | `c82f92ea` | census 0 across the set ×2 |

**Order clause**: OP-6 first (`88655c02`, value.js, before any kf byte); identity decided (`ec334c53`) before `1b29fb22`; the record's order KF-KE-4 → -6/-12 → -5 → -3 → -7 → -8 → -24 → tail → test kept; the three post-gate commits are corrections found by the gate, each stated as such.

#### Gates, BEFORE → AFTER (double-run; `evidence/W12/KF-W12-c-gate-transcripts.md`)

- **G-KFW12-3 runtime**: `No test files found` → **`7 passed (7)` · same · same · same**. Identity strings at the head: all four `keyframes-style-kfed-identity-Transform`.
- **Byte clauses**: `parseCssScalar` in `KeyframesEditor.vue` **2 → 0 · 0** (and 0 · 0 across the whole writable set after `c82f92ea`); `class="absolute top-2 right-4` **1 → 0 · 0**; `toLowerCase()` in `useKeyframesState.ts` **1 → 0 · 0**; the `:38-47` comment rewritten (`d10ab8b4`).
- **§0u ratchet**: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **16 · 16 → 14 · 14**; this unit's rows **3 → 1**: `KeyframesEditor.vue(445,39)`/`(446,37)` TS2345 fell with KF-KE-7's existence guard (`eda8bc43`, never a cast); `useKeyframeOps.ts(80,13)` → now `(91,13)` TS2322 **remains, ESCALATED (E-c1)**. Never rose. **This gate reads RED for the unit** by that one diagnostic.
- **`npm run test:demo`**: `2 failed | 50 passed (52)` · same — `.d`'s `css-code-editor-seam (2)` (pending E-d1) and KF.W11's `spring-trace-truth (4b)`; neither this unit's. Skip/masking census **0**; eslint clean; `git diff --check` clean; bounds clean (twelve shas, writable paths only).

#### Per-id roster

| id | disposition |
|---|---|
| OP-6 · OP-2 | verified / met by vacancy — `88655c02` |
| KF-KE-4 · L-M3 | **LANDED** `1b29fb22`; L-M3 = the identity defect entire (evidence apply-identity) |
| KF-KE-6 · C-B2 · KF-KE-66 | **LANDED** `7a10d7ff` (lazy creation = -66) |
| KF-KE-12 ≡ N-5 | **LANDED** `7a10d7ff` |
| KF-KE-5 · KF-KE-45(comment) · KF-KC-22 · KC-25 ≡ KF-KC-28 ≡ KF-KE-41 ≡ KF-KE-22 (sticky half) | **LANDED** `d10ab8b4` |
| KF-KE-3 · -26 · -37 · -46 | **LANDED** `73e57a93` |
| KF-KE-7 · KF-KE-61 · KF-KE-47 (the null-slot neighbour: `leaving == null` return, `neighbour == null` → the group without the pop) | **LANDED** `eda8bc43` (+ `781ac250` correction); KF-CB-11's shell = `.a`'s KC-3, LANDED-BY |
| KF-KE-8 · -21 (the sweep's rest under the flag) | **LANDED** `a10e5793` (the brush half) + `eda8bc43` (the sweep's bag); the demo-wide MECHANISM = KF.W9's; the lifetime half = `.e`'s D-25 |
| KF-KE-24 pipeline half · KF-KE-32 (comment) | **LANDED** `c026121a`; the TOKEN decision = KF.W6's rider (unchanged) |
| KF-KE-13 · 20 · 28 · 33 · 38 · 44 · 48 · 49 · 51 · 55 · 56 · 58 · 60(ii) · 62 · 63 · 65 | **LANDED** `eba0bd6b` |
| KF-KE-57 | cured at the bytes (`updateCSS` at both levels — `KeyframeCard.vue:308`, the editor's `cardListBindings`); the last hyphenated literal fell at `eba0bd6b` |
| KF-KE-19 | STATED (snapshot contract in the barrel's docblock, `eba0bd6b`); a live getter reaches the parsing half = `.e`'s row |
| KF-KE-27 | LANDED-BY `f6a51e23` (`.a`; `aria-label="Offset"` at `KeyframeCard.vue:77`, verified at the head) |
| KF-KE-35 | LANDED-BY `7e795a52` (2026-09-18; the add dialog is the `CSSPasteDialog` shell — no `DialogDescription` inside `DialogTitle` at the head) |
| KF-KE-52 | LANDED-BY `e5235ca0` (`.a`; the `highlightedFrom` WeakMap replaced the two-valued `highlighted` marker) |
| KF-KE-64 | LANDED-BY KF.W5 arm 0 (`themeStyleHolders` refcount at `useHighlightCSS.ts:196`, KAD-14(d)); the apply sheet now shares the same discipline via the registry (`7a10d7ff`) |
| KF-KE-14 ≡ KF-APP-4 | → KF.W4 (dedupe stated by the spec) |
| KF-KE-2 · KF-KE-29 | → `.a` (the card seam / `KeyframeCardList.vue`) |
| KF-KE-11 (`selectedKeyframesControl` watch, `useKeyframesParsing.ts:80`) · KF-KE-25 (project in place, `useKeyframesParsing.ts:50`) | → **`.e`** (the file is the APPLY-UNIT's by the re-open table; not written here) |
| KF-KE-10 ≡ SPF-20 (the re-sample doubles the stops: `fromString` APPENDS) · SPF-19 (`seedKeyframes` without a boundary + the redundant `.parse()`) | **ESCALATED E-c2** — the cure bytes are `demo/composables/useSpringKeyframesEditor.ts:71-77`, outside this unit's set |
| SPF-11 (`container-type: inline-size` on `.keyframes-editor-scroll`) | **ESCALATED E-c3** — the byte is `demo/scenes/spring/SpringPhysicsFacet.vue:333`, outside the set (0 hits across the set) |
| SPF-23 (the mounted footer's `p-4 m-4` against the panel's 1 rem) | **OPEN** (INFO rider) — `KeyframesEditor.vue:62` still `p-4 m-4`; not re-derived in this unit, handed to `.g`'s census |
| KF-KE-18 (the prop-graph mutation contract, eight sites) · KF-KE-34 (the retiming Slider's name/readout) · KF-KE-50 (`templateRef: string`) | **OPEN** — not written, not claimed; listed for `.g`'s census with their bytes verified live at the head (`useKeyframeBrushApply.ts:10`; the Slider block in `KeyframesEditor.vue`) |
| KF-KE-17 · -54 (kf-engine.ts prose, out of set) | **OPEN** — -54's byte is `demo/kf-engine.ts:9`, outside the set; -17 not re-derived here |
| KF-KE-62 / KF-KC-35's `proof:accent-census` residue | not re-derived here (KF-W4 §Excluded 18 stands); `.g` |
| `KeyframesAddDialog.vue` · `useToolbarKeyboard.ts` | in the set, NOT written (the dialog's KAD folds are KF.W7's; nothing in this unit's rows reached the toolbar) |
| EE-03 | re-regression guard only — clause (6) |

#### Escalations (each a byte outside this unit's set, named)

- **E-c1 (§0u)** — `useKeyframeOps.ts(91,13)` TS2322 is caused by `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:9`: `EditorAnimationOptions = Omit<CSSAnimationOptions,"timingFunction"> & { timingFunction?: string }` widens the engine's `serializeTimingFunction` return (`CssEasingLiteral`) to `string`. The one-token cure (`timingFunction?: CssEasingLiteral`) lives in a file no unit of this wave owns; a downstream re-narrowing guard is a shim over the widening and a cast is refused by the ruling. An attempted in-set cure via `serializeTimingFunction(animation.options.timingFunction)` produced TS2345 (`Easing` is the RESOLVED easing, not the parser's structured value) and was reverted. → `.g` / the owner of `utils/`.
- **E-c2 (KF-KE-10 ≡ SPF-20, SPF-19)** — `demo/composables/useSpringKeyframesEditor.ts:71-77`. → `.g`; the engine-side REPLACE ruling (KF-W5R4 (1)) is not in the tree either — `fromString` still appends.
- **E-c3 (SPF-11)** — `demo/scenes/spring/SpringPhysicsFacet.vue:333`. → `.g`.
- **E-c4 (engine contract, → KF.W5 letter)** — a throw inside the draw loop leaves `play()` pending forever (`src/animation/group/lifecycle.ts:92-95`); `finished`/`play()` must settle (reject) on a draw-loop throw. The editor bounds the hostage; the engine owes the settle.
- **E-c5 (idiomatic home, → `.a`'s row)** — the exit choreography's idiomatic Vue seat is a `<TransitionGroup>` leave hook at `KeyframeCardList.vue`; landed here at the handler because the list is `.a`'s file.
- **E-c6 (N-8, → `.e`)** — the identity is not `cssIdent`-safe; an `animation.name` with a space throws `InvalidCharacterError` at `classList.add` under either arm (measured; `useSpringKeyframesEditor.ts:66`).

#### Residuals (recorded, not defects of this unit)

- `KeyframeCard.vue` fails `prettier --check` on class ordering at the baseline (`.a`'s lines); not reformatted.
- `useHighlightCSS.ts:190-203`'s theme-driver docblock still says "adopt-or-create" of the theme node — true of the theme driver (KF.W5's own refcount), distinct from the apply-sheet registry; re-read, left as is.
- The `kfControls.keyframes` and `dialogOpen` schema members in `controlOptionsStore.ts` are now unread — named for the store's owner (`eba0bd6b`).
- Shared index disclosure: `.d` committed on the same branch throughout (`7cda421c` … `ec49bbef`); no path staged by both.

#### E13

INBOX **80 · 80** rows, positional Status scan → **0 UNREAD** (re-swept at the close, unchanged from part 1; tail `I-35` / `O-40`); the four paths' newest letters unmoved. No row minted, no status changed.

#### The shas `.e` opens on

| path | last commit by this unit |
|---|---|
| `composables/useKeyframesState.ts` | **`eba0bd6b`** (the identity at `1b29fb22`) |
| `composables/useApplyCSS.ts` | **`7a10d7ff`** |
| `composables/useKeyframeBrushApply.ts` | **`eba0bd6b`** (the lift at `a10e5793`/`7a10d7ff`) |
| `composables/useHighlightCSS.ts` | **`c026121a`** |
| `composables/useKeyframeOps.ts` · `composables/useKeyframesEditor.ts` | **`eba0bd6b`** |
| `KeyframesEditor.vue` | **`781ac250`** |
| `components/KeyframeCard.vue` | **`c82f92ea`** |
| `test/demo/instrument/keyframes-editor-honest.test.ts` | **`4fa6efec`** |
| **unit head** | **`c82f92ea`** |

`.e` inherits by name: `KeyframesStringControls.vue(55,9)` · `(76,5)` (its two TS6133s, `.d`'s receipt); N-8 (E-c6); KF-KE-11 · -25 (its file); D-25's lifetime half.

---

## Close

SERVED MODEL: claude-opus-5[1m]

**Seat**: KF.W12.g — CLOSE (phase 4, serial, last), **VERIFY-ONLY — this seat cured nothing**, wrote
no keyframes.js byte and no product byte anywhere. **Date** 2026-09-19; **sitting of record
2026-09-17** (the owner's begin-word, COHESION §0j).
**Substrate named, never assumed**: keyframes.js `/Users/mkbabb/Programming/keyframes.js` —
⟨cmd⟩ `git rev-parse --short HEAD` → **`c82f92ea`**; ⟨cmd⟩ `git rev-parse --short origin/master` →
`bf4a9a9c` at this seat's open (36 commits unpublished; pushed at act 7 below). value.js
`tranche-u`, HEAD `2b8b13c9` → `2fa82bdb` → `70ef1063` **during this sitting** — **SHARED INDEX
DISCLOSED**: sibling Track-A and Track-C seats committed into this same checkout throughout (their
dirty rows are named under Crash-recovery). Every commit this seat makes carries its own pathspec
**on the commit itself**; nothing of a sibling's was staged, reset or unstaged.

**VERDICT: PARTIAL.** Four of six product units ran. **`.e` (APPLY-UNIT) and `.f` (AXISLINE-UNIT)
— the whole of phase 3 — WERE NEVER DISPATCHED.** That is not a reading of a weak gate; it is an
absence at the bytes, proven three ways below. Three gates are GREEN, four are RED, and **no RED is
masked, weakened or re-described**.

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**,
both value.js-delivered mail packets under `docs/tranches/V/coordination/` — outside every KF.W12
writable path, untouched.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **7 rows**:
`demo/DESIGN.md` · `demo/styles/foundation.css` · `demo/styles/shell.css` ·
`docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs` ·
`docs/tranches/V/reformation/CARRY-LEDGER.md` (all five a sibling Track-A seat's, untouched) ·
`scripts/dev/dev.sh` (**unowned, never staged, never touched**) · `?? docs/tranches/X/waves/W5/
born-red/B1-B2-B3-layout-utilization-2026-09-19.json` (Track A's, untouched).
**Zero dirty paths inside this seat's writable set** — `execution/B/KF-W12.md` clean, `LEDGER.md`
clean, `evidence/W12/**` clean. **Zero inherited hunks; nothing finished, nothing rewritten,
nothing stashed, nothing restored.**

### ACT 1 — the commit roster, audited to §Bounds

⟨cmd⟩ `git rev-list --count bf4a9a9c..HEAD` → **36** keyframes.js commits. SELF-COUNT by unit
(⟨cmd⟩ `git log bf4a9a9c..HEAD --format='%s' | grep -c 'X.KF.W12.<u>'`): **`.a` 9 · `.b` 8 ·
`.c` 12 · `.d` 7 = 36 ✓**. `.e` **0**. `.f` **0**.

| unit | n | shas (oldest → newest) | bounds verdict (`git show --stat` each) |
|---|---|---|---|
| **`.a`** CARD | 9 | `e5235ca0` · `f6a51e23` · `dec084a8` · `5b80d54c` · `8099b19e` · `361d2d17` · `697d045d` · `dffcffd5` · `ed96f2b0` | **CLEAN** — only `KeyframeCard.vue` · `KeyframeCardList.vue` · `KeyframesEditor.vue` · `useHighlightCSS.ts` · the created test |
| **`.b`** OPTIONS | 8 | `98675047` · `ebbc8259` · `fcafcff8` · `0e31d417` · `b67dae6f` · `7ff3acfa` · `cbd87a85` · `2cd314af` | **CLEAN** — only `ChannelOptions.vue` · `LayerConfigPanel.vue` · `TimingFunctionPanel.vue` · `useTimingFunctionEditor.ts` · `useEasingPickerSeat.ts` (create) · `ChannelControls.vue` · `ControlsPaneWrapper.{vue,css}` · `EasingSidebar.vue` (see the disclosure below) · the created test |
| **`.c`** KFED | 12 | `1b29fb22` · `7a10d7ff` · `d10ab8b4` · `73e57a93` · `eda8bc43` · `a10e5793` · `c026121a` · `eba0bd6b` · `5e95bdf3` · `781ac250` · `4fa6efec` · `c82f92ea` | **CLEAN** — only `KeyframesEditor.vue` · `KeyframeCard.vue` · `useHighlightCSS.ts` · `useKeyframesEditor.ts` · `useKeyframeOps.ts` · `useKeyframesState.ts` · `useApplyCSS.ts` · `useKeyframeBrushApply.ts` · the created test |
| **`.d`** EDITOR | 7 | `7cda421c` · `ccda20c7` · `850b62a9` · `b6914c36` · `6f065d36` · `b965afa1` · `ec49bbef` | **CLEAN** — only `CSSCodeEditor.vue` · `helpers.ts` (ALONE at `ccda20c7` ✓) · `KeyframesStringControls.vue` · `RibbonBar.vue` · the created test |
| **`.e`** APPLY | **0** | — | **NEVER DISPATCHED** |
| **`.f`** AXISLINE | **0** | — | **NEVER DISPATCHED** |

**The whole touched-path set, enumerated** — ⟨cmd⟩ `git log bf4a9a9c..HEAD --name-only --format='' |
sort -u` → **26 paths**, every one a §B.2 row. **Wave-invalidating bounds, each measured EMPTY**:
`src/**` **0** · `demo/scenes/cube/orbital-drag/**` **0** · `node_modules/**` **0** ·
`package.json`/`vitest.config.ts` **0** · every glass-ui tree **0** · `demo/components/instrument/
timeline/**` **0** · `demo/components/playback/**` **0** · `TransportDock*` / `demo/app/**` **0** ·
`demo/components/instrument/shell/**` **0** · `scripts/dev/dev.sh` **0**
(⟨cmd⟩ `git log bf4a9a9c..HEAD --name-only --format='' | sort -u | grep -c 'dev.sh'` → **0**).
`monaco-themes/{Dracula,GitHub}.json` untouched (arm (b) taken; E-d2 owes them).
**Unwritten but in-bounds** (no row reached them): `useToolbarKeyboard.ts` · `KeyframesAddDialog.vue`
· `useKeyframesParsing.ts` · `CubeAxisLines.vue` · the four existing witness tests.

**value.js**: 8 receipt commits — `9976852f` (`.a`) · `c8d4c2ac` + `9615a004` (`.b`) · `88655c02` +
`ec334c53` + `2b8b13c9` (`.c`) · `e52c2f2c` + `04cf44d4` (`.d`). Every one pathspec-bounded to
`docs/tranches/X/execution/B/KF-W12.md` and `docs/tranches/X/keyframes/evidence/W12/**`. **No
sibling path rode any commit in either repo; `dev.sh` in 0 of 44.**

**DISCLOSED, not a landed-wrong — `EasingSidebar.vue`'s carve, read strictly.** §B.2 row 114 bounds
it to *"the two `EasingPicker` seat call-sites ONLY — every other byte of the file is out of
bounds"*, and a bounds expansion here **invalidates the wave** (§Scope triumvirate). The measured
diff is ⟨cmd⟩ `git diff --stat bf4a9a9c..HEAD -- demo/scenes/easing/EasingSidebar.vue` → **92
insertions / 132 deletions**, three hunks — large for a "call-site". Read hunk by hunk it is the
seat and nothing else: the deleted `PickerSeed`/`seedFor`/`pickerSeed` (**seed**), `isSeedEcho`
(**live-state echo predicate**), the `:key` recipe (**key**), the `.easing-editor` scoped block
(**container CSS**) and the new `truth()` parameter (**one parameter for where truth lives**) are
**the exact five members §Scope 2 enumerates for `useEasingPickerSeat`** — the hand-rolled donor
being consumed, not the scene being rewritten. `catalogueGap`/`syncGap` are **moved, not deleted**
(they must follow `const seat = …` so the watch can call `seat.reseat()`) — present at the head,
⟨cmd⟩ `grep -n 'catalogueGap' EasingSidebar.vue` → `:49` · `:160` · `:162`. The one byte with no
member to claim it is the dropped `container-name: easing-editor`; its behaviour survives in the
composable (⟨cmd⟩ `grep -n 'containerStyle' useEasingPickerSeat.ts:222` →
`{ containerType: "inline-size" }`) and it has **zero consumers** (⟨cmd⟩ `grep -rn 'easing-editor'
demo/` → *(no output)*; ⟨cmd⟩ `grep -rn '@container easing' demo/` → *(no output)*). The gallery,
the duration slider, the BG-8 caption and every other style are untouched. **This seat reads the
carve as HELD and records the reading so a challenge pass can overturn it on the record rather than
discover it.**

### ACT 2 — every spec gate, re-run at this seat, BEFORE → AFTER, double-run

All commands from `/Users/mkbabb/Programming/keyframes.js`. BEFORE = the re-open baseline at kf
`bf4a9a9c`. SELF-COUNT: ⟨cmd⟩ `grep -c '^\*\*G-KFW12-' keyframes/waves/KF-W12.md` → **7**; seven
rows.

| gate | BEFORE (`bf4a9a9c`) | AFTER (this seat, run 1 · run 2) | verdict |
|---|---|---|---|
| **G-KFW12-1** CARD | `No test files found` | **`Test Files 1 passed (1)` / `Tests 9 passed (9)`** · same | **GREEN** |
| **G-KFW12-2** OPTIONS | `No test files found` | **`Test Files 1 passed (1)` / `Tests 5 passed (5)`** · same | **GREEN** |
| **G-KFW12-3** KFED | `No test files found` | **`Test Files 1 passed (1)` / `Tests 7 passed (7)`** · same | **GREEN** |
| **G-KFW12-4** EDITOR | `No test files found` | **`Test Files 1 failed (1)` / `Tests 1 failed \| 3 passed (4)`** · same | **RED — one limb of four** |
| **G-KFW12-5** APPLY | `No test files found` | **`No test files found, exiting with code 1`** · same | **RED — born-RED, UNMOVED (`.e` never dispatched)** |
| **G-KFW12-6** AXISLINE | `No test files found` | **`No test files found, exiting with code 1`** · same | **RED — born-RED, UNMOVED (`.f` never dispatched)** |
| **G-KFW12-7** close | RED | **RED on three limbs** (below) | **RED** |

**The six `create` files, proven at the bytes** — ⟨cmd⟩ `ls <path>` ×6 →
`keyframe-card-offset-loop.test.ts` **EXISTS** · `channel-options-render-edge.test.ts` **EXISTS** ·
`keyframes-editor-honest.test.ts` **EXISTS** · `css-code-editor-seam.test.ts` **EXISTS** ·
`apply-css-identity.test.ts` **`No such file or directory`** · `cube-axis-reveal.test.ts` **`No such
file or directory`**. That absence is the sole cause of G-5's and G-6's readings: both are
**RED-AS-EXPECTED, unmoved from born**, not UNRUNNABLE and not failures of a cure.

**The one failing case of G-KFW12-4**, named rather than summarised: `(2) KF-CE-1: the tokenizer the
boot registered classifies 'a { color: red }'` — `.d`'s **E-d1**, the arm's five-line ambient
declaration for monaco's untyped `basic-languages/css/css.js`, whose home (`demo/env.d.ts`) is not a
§B.2 row. Cases (1) Tab-not-swallowed, (3) the cancelled stale emit and (4) the loud format failure
are **GREEN**. Nothing was substituted, cast, guarded or allow-listed to reach that 3.

**Byte clauses — eleven, every one double-run, BEFORE → AFTER:**

| clause | gate | BEFORE | AFTER (run 1 · run 2) | must read | verdict |
|---|---|---|---|---|---|
| `grep -c 'frame.start.value = starts' KeyframesEditor.vue` | G-1 | 1 | **0 · 0** | 0 | **GREEN** |
| `grep -rc ':is-open' channel-controls \| grep -v ':0$'` | G-2 | 4 (3+1) | **nothing · nothing** | nothing | **GREEN** |
| `grep -c '@update:checked' LayerConfigPanel.vue` | G-2 | 1 | **0 · 0** | 0 | **GREEN** |
| `grep -c 'parseCssScalar' KeyframesEditor.vue` | G-3 | 2 | **0 · 0** | 0 | **GREEN** |
| `grep -c 'class="absolute top-2 right-4' KeyframeCard.vue` | G-3 | 1 | **0 · 0** | 0 | **GREEN** |
| `grep -c 'toLowerCase()' useKeyframesState.ts` | G-3 | 1 | **0 · 0** | 0 | **GREEN** |
| `grep -c 'tabFocusMode' CSSCodeEditor.vue` | G-4 | 0 | **2 · 2** | ≥ 1 | **GREEN** |
| `grep -c 'isFormatting' KeyframesStringControls.vue` | G-4 | 4 | **6 · 6** | recorded | recorded |
| `grep -c 'cssIdent' dist/keyframes.d.ts` (clock clause) | G-5 | 2 | **2 · 2** | printed | printed |
| `grep -rc 'cssIdent' demo` — **non-comment** consumers | G-5 | 0 (1 comment) | **0 · 0** (2 hits, **both comments**: `helpers.ts:10`, `useKeyframesState.ts:58`) | ≥ 1 | **RED** |
| `grep -c 'useEventListener(window, "keydown"' OrbitalDrag.vue` | G-6 | 1 | **0 · 0** | 0 | **GREEN (LANDED-BY KF.W11 `.a`)** |

**Order and lock clauses, read from `git log` and `git show --stat`, not from prose:**

- **G-KFW12-1 order clause (KC-34, OP-3)** — ⟨cmd⟩ `git log --reverse` → `e5235ca0` (KC-34 highlight)
  **precedes** `5b80d54c` (KC-8/KC-9 keep-mounted). **GREEN.**
- **G-KFW12-2 lock clause** — the commit that turns both byte clauses green is `98675047`, and
  ⟨cmd⟩ `git show --stat 98675047` names **`ChannelOptions.vue` · `LayerConfigPanel.vue` ·
  `ControlsPaneWrapper.vue`** — the render-edge hunk is **in the same commit**. **GREEN.**
- **G-KFW12-2 order clause** — five steps, five commits, in sequence: `98675047` STEP 1 → `ebbc8259`
  STEP 2 → `fcafcff8` STEP 3 → `0e31d417` STEP 4 → `b67dae6f` STEP 5. **GREEN.**
- **`.d`'s KF-CE-3-first lock** — ⟨cmd⟩ `git log --reverse … | grep 'X.KF.W12.d' | head -1` →
  `7cda421c` KF-CE-3. **GREEN.**
- **`.a`'s KC-2 ≡ KF-KE-2 MUST-NOT-SPLIT** — one commit, `dec084a8`, `KeyframesEditor.vue` alone.
  **GREEN.**
- **`.d`'s "`debounce` lands ALONE"** — `ccda20c7` touches `demo/utils/helpers.ts` and nothing else.
  **GREEN.**

**G-KFW12-7, limb by limb:**

| limb | reading (double-run) | verdict |
|---|---|---|
| `npm run test:demo` — every `test/demo/**` passes | **`Test Files 2 failed \| 50 passed (52)` / `Tests 2 failed \| 438 passed (440)`** · same | **RED** (the two named below) |
| `git diff bf4a9a9c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` → 0 | literal **1**; the single hit is a **docblock prose line** — `+ * seat's remount discipline is observable as a mount count. No test.skip, no` — a clause reading prose, the exact false-gate pathology `.a` and `.c` each caught. Disambiguated: ⟨cmd⟩ `git diff … \| grep '^+' \| grep -E '(test\|it\|describe)\.(skip\|only)\('` → *(no output)*; ⟨cmd⟩ `grep -rnE '(test\|it\|describe)\.(skip\|only)\(' test/` → *(no output)* across the whole tree | **GREEN (0 real)** |
| `git log bf4a9a9c..HEAD --format=%B \| grep -c 'KF-APP-41\|C-22'` → 0 | literal **5**; every hit is the substring `C-22` inside **`KF-KC-22` / `KC-22`**, CARD-UNIT's own row ids. Disambiguated: ⟨cmd⟩ `… \| grep -cE '(^\|[^A-Z-])C-22'` → **0**; ⟨cmd⟩ `… \| grep -c 'KF-APP-41'` → **0** | **GREEN (0 real)** |
| `grep -c 'DISCHARGED by KF.W7 SWAP verdict' execution/B/KF-W12.md` → 0 | literal **1** before this Close was written; **3 after** — and **all three are gate quotations, zero are receipts**: `:430` (the §Agent Units `.g` block quoting its own gate command, *"must read 0"*) and `:1474` · `:1611` (**this row and the positive statement below — the clause's own prose re-entering its own file**). WRITE-THEN-MEASURE caught this at the append: a census whose report is inside the censused file rises by the act of reporting. Disambiguated by position, not by count. **Zero SWAP-discharge receipts written by any unit.** | **GREEN (0 real)** |
| `npx vue-tsc … \| grep -c 'error TS'` → 0 (OP-0 re-run) | **14 · 14** | **RED under the literal clause; read under §0u below** |
| the seven producer rows appear as SS-6 relay rows with their date | **0 rows appended** — the relay is `.g`'s act on a **completing** close; this wave is PARTIAL and `.e`/`.f` have surfaced none of theirs | **RED — owed, booked as residual R-7** |
| zero demo-side producer workarounds in the diff | scoped-style override **0** · re-implemented primitive **0** · copied producer selector **0** (`.b` quoted the installed 7.0.0 `.d.ts` verbatim — `evidence/W12/KF-W12-b-producer-quotation.md`) · `node_modules` patch **0** | **GREEN** |
| every id in §Carry reads LANDED / KILLED-with-rationale / carried | U1 · U2 · U3 · U4 rostered per id in their receipts; **U5 (APPLY) and U6 (AXISLINE) are entirely unspent** | **RED** |
| `value4-editor-boundary.test.ts`'s timeout NOT widened | ⟨cmd⟩ `git diff bf4a9a9c..HEAD -- test/demo/instrument/value4-editor-boundary.test.ts \| wc -l` → **0** — the file is not in the diff at all | **GREEN** |

**The two `test:demo` failures, each named and owned** — neither is masked, neither is curable by
weakening:
1. `test/demo/instrument/css-code-editor-seam.test.ts > (2) KF-CE-1` — **`.d`'s E-d1**, this wave's,
   escalated at its root (an ambient declaration outside every §B.2 row).
2. `test/demo/scenes/spring-trace-truth.test.ts > (4b)` — **KF.W11's carried honest-RED**
   (ESCALATION KF11-E(j1) / j-R5), **outside every KF.W12 §B.2 row**, untouched and unweakened by
   all 36 commits.

**GREEN-BEFORE-CURE (R.2), re-read at this close — three, booked, none claimed:**
1. **KF-AX-9's three raw `180ms` token rider** — `LANDED-BY KF.W6`; unmoved (comments only).
2. **G-KFW12-6's inbound clause** — `useEventListener(window, "keydown")` reads **0 · 0**;
   **LANDED-BY KF.W11 `.a`**, not by this wave, which writes no `orbital-drag/**` byte. OP-1 is met
   and `.f` had no blocker left — its absence is a dispatch gap, not a precondition.
3. The first sitting's booking (1) (`test:demo` green at open) was already **WITHDRAWN** at the
   re-open and is not revived.

### §0u ratchet — the reading this wave owes, and what it measured

⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **14 · 14**.
**Banked floor at open: 24. It FELL to 14 and NEVER ROSE.** Decomposition (⟨cmd⟩ `… | sed 's/(.*//'
| sort | uniq -c | sort -rn`; SELF-COUNT 3+2+2+2+1+1+1+1+1 = 14 ✓; by code `7 TS6133 · 3 TS2322 ·
2 TS2339 · 1 TS2379 · 1 TS2345` = 14 ✓):

| owner | at open | at close | note |
|---|---|---|---|
| **`.a`** `KeyframesEditor.vue(76,73)`/`(81,41)` TS2339 | 2 | **0** | fell WITH KC-2 ≡ KF-KE-2, never by a cast |
| **`.b`** `ChannelOptions.vue` · `LayerConfigPanel.vue` · `TimingFunctionPanel.vue` · `EasingSidebar.vue` · `useTimingFunctionEditor.ts` ×3 · `ChannelControls.vue` | 8 | **0** | each fell with the cure that owns it |
| **`.c`** `useKeyframeOps.ts(80,13)` → now `(91,13)` TS2322 | 1 | **1** | **ESCALATED E-c1** — root is `utils/parseAnimationCSS.ts:9`, a file no unit owns |
| **`.e`** `KeyframesStringControls.vue(54,9)`/`(75,5)` → now `(55,9)`/`(76,5)` TS6133 | 2 | **2** | **`.e` never dispatched.** `(76,5)` `'getTmpAnimationName' is declared but its value is never read` is still **the type-level shadow of KF-KE-4's unrouted half** |
| **KF.W12 total, in-bounds** | **13** | **3** | owed 13 → 0; delivered 13 → 3 |
| outside (KF.W13 5 · KF11-E2 3 · KF11-E3 2 · KF11-E4 1) | 11 | **11** | unmoved, untouched, owners named |

**No cast, no `@ts-expect-error`, no `// eslint-disable` was written as a cure anywhere in the
window** — the ruling refuses each by name and the diff carries none. The literal zero is KF.W13's
close (§0u part (3)); this citation is the ruling's, not this seat's relief.

### ACT 3 — §Verification artefacts, run as written

- ⟨cmd⟩ `npm run check` → **exit 2 at leg 1** on the same **14**; legs 2 and 3 not reached. Recorded,
  not re-described.
- ⟨cmd⟩ `npm run test:demo` → **`2 failed | 50 passed (52)` / `2 failed | 438 passed (440)`**, twice.
  **The denominator grew 48 → 52** — exactly the four created gate files; **the six creations' full
  growth to 45 files / the spec's arithmetic is unmet by two files, `.e`'s and `.f`'s.**
- ⟨cmd⟩ `npx eslint demo/components/instrument demo/scenes/cube/CubeAxisLines.vue demo/utils/helpers.ts`
  → **7 problems (7 errors, 0 warnings)**. **UNMOVED — none introduced by this wave**, proven at the
  open bytes rather than asserted: `vue/no-mutating-props` on `TimingFunctionPanel.vue` ⟨cmd⟩
  `git show bf4a9a9c:… | grep -nE 'props\.storedAnimationOptions\.…'` → **3 at open, 3 at close**;
  on `ControlsPaneWrapper.vue` → **3 at open, 3 at close**; `vue/valid-v-for` on
  `TransportDock.vue:124` (a KF.W13 file, out of bounds here) → **1 at open, 1 at close**.
  `git blame` puts five of the seven on pre-window shas at pre-KF.W8 paths; the two lines `.b`
  re-touched (`7ff3acfa9:152`, `fcafcff85:156`) sit inside a mutation block whose first line
  (`:151`) blames pre-window — the rule already fired on that file at open. Booked as `.b`'s
  declared CARRIED residual (KF-CO-45), not as a regression.
- ⟨cmd⟩ `git diff --check bf4a9a9c..HEAD` → *(no output)*. **CLEAN.**
- **Artefacts on disk** (⟨cmd⟩ `ls evidence/W12/`): **9 files** — `KF-W12-a-gate-transcripts.md` ·
  `KF-W12-b-{born-red,gate-transcripts,producer-quotation}.md` ·
  `KF-W12-c-{born-red,gate-transcripts,apply-identity}.md` · `KF-W12-d-{born-red,gate-transcripts}.md`.
  **ABSENT, owed by the two undispatched units**: `.e`'s apply-identity route evidence and OP-4's
  close grep; `.f`'s Z triptych and OP-1's grep-at-0 receipt.

### ACT 4 — E13, the four-path sweep, re-run at this seat's own clock

Swept read-only; classification read from each row's **Status cell by position**, never from a bare
`grep -i unread`; `INBOX.md` **self-excluded**.

1. `docs/tranches/V/` + `V/coordination/` — newest are the five 2026-09-18 letters already rowed
   **O-34 … O-38** plus `valuejs-outbound-…-kfw7-bh-relay-ADDENDUM-A9.md` = **O-31**. Nothing unrowed.
2. `../glass-ui/docs/tranches/` — **BK re-confirmed newest** (⟨cmd⟩ `/bin/ls -dt … | head -3` →
   `BK/` · `BJ/` · `BI/`); newest letter `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**.
3. `../keyframes.js/docs/tranches/V/coordination/` — newest inbound-grammar file
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21 / I-26**, ours, delivered;
   `INBOUND-LEDGER.md` is keyframes' own ledger, not a letter.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — newest
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12**, ours; path UNMOVED.

⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **80**; the positional Status-cell scan →
**0 UNREAD**; tail **I-35 / O-40** (O-39 and O-40 are sibling Track-C/Track-P seats' rows minted
since the re-open, both ours, both rowed). **ZERO unrowed letters addressed to value.js · ZERO new
`I-n` minted · ZERO UNREAD Status cells. No wave scope carries unread mail.** `INBOX.md` not touched
by this seat — nothing to row, and the SS-6 relay this wave owes is booked as residual R-7 rather
than sent on an incomplete wave.

### The four-verb line — moved ONLY as §State permits

The spec's verb table is a **dated spec byte and IMMUTABLE (E-3)**; this seat amends nothing there
and records the reading here.

| verb | state | basis at this close |
|---|---|---|
| AUDITED | **YES** | unchanged |
| SPECIFIED | **YES** | unchanged |
| **IMPLEMENTED** | **NO — stays NO** | §State's own condition is *"stays NO until the gates green after the sequencing head lands"*. Four of seven gates are RED; two units of six never ran. **This seat does not stamp it.** |
| VERIFIED | **NO** | *"a successor close's act"* — **not this seat's to stamp**, and a PARTIAL wave offers nothing to verify. |

### Residuals — each with a named owner

| # | residual | owner |
|---|---|---|
| **R-1** | **`.e` APPLY-UNIT never dispatched** — U5 entire: **N-8** (the one `cssIdent`-derived name for `getClassName` and the emitted selector) · **RB-6** (one lifetime for the applied state and its affordance) · D-2/L-M-8 · N-7 · **D-25** (the PRM half of `.c`'s KF-KE-8, specified as ONE motion and now split by absence) · S-6-as-corrected · the `:57`/`:59`/`:65`/`:67` rows · `useKeyframesParsing.ts`'s emitted-selector carve · KF-KE-11 · KF-KE-25 · `test/demo/instrument/apply-css-identity.test.ts`. Preconditions were MET (`.c` at `c82f92ea`, `.d` at `ec49bbef`; OP-4 re-measured 2·2 at the artifact, 0 demo consumers). | a `.e` seat; opens on the shas `.c`/`.d` recorded |
| **R-2** | **`.f` AXISLINE-UNIT never dispatched** — U6 entire: KF-AX-1 (consumer half) · KF-AX-2 · **#57 the Z stroke** · KF-AX-4..-10 · -13 · -14 · -16..-23 · -28..-30 (22 rostered) · `test/demo/scenes/cube-axis-reveal.test.ts`. **OP-1 IS MET** — the window latch reads 0 · 0 — so nothing blocked it. | a `.f` seat; opens on `bf4a9a9c`+ |
| **R-3** | **E-d1** — the arm's five-line ambient declaration for `monaco-editor/esm/vs/basic-languages/css/css.js` (TS7016 at 0.55.1); home `demo/env.d.ts`, not a §B.2 row. The built hunk is preserved byte-exact in `evidence/W12/KF-W12-d-born-red.md` with its measured delta (+4,255 B `vendor-monaco`, −1,054,628 B css.worker). G-KFW12-4 case (2) turns GREEN on the grant. | owner of `demo/env.d.ts` / orchestrator KF-WRITE |
| **R-4** | **E-d2** — KF-CE-33/34/47, one key each in `Dracula.json`/`GitHub.json`; §B.2 conditions them on arm (a) and arm (b) was taken. | `.d` or `.g` on a widened reading |
| **R-5** | **E-c1** — `useKeyframeOps.ts(91,13)` TS2322, rooted at `utils/parseAnimationCSS.ts:9` (`timingFunction?: string` widens the engine's `CssEasingLiteral`). The one-token cure is outside every unit's set; a downstream guard is a shim and a cast is refused. **The only in-bounds §0u diagnostic this wave owed and did not zero.** | owner of `demo/components/instrument/keyframes/utils/` |
| **R-6** | **E-c2 · E-c3 · E-c4 · E-c6** — SPF-20/-19 (`useSpringKeyframesEditor.ts:71-77`) · SPF-11 (`SpringPhysicsFacet.vue:333`) · the engine's draw-loop settle (`src/animation/group/lifecycle.ts:92-95` → a KF.W5 letter) · N-8's `cssIdent`-safety finding (a name with a space throws `InvalidCharacterError` at `classList.add` under either arm). | their file owners; E-c4 → KF.W5; E-c6 → `.e` |
| **R-7** | **The SS-6 producer relay is UNSENT.** Nine rows stand collected and unrelayed: `.b`'s seven (`LabeledSelect` `open` `default: undefined` + `LabeledSwitch` `modelValue` = OP-5's ask · `EasingPicker` preset field / `STEP_COUNT_MIN`-`MAX` export · `LabeledSlider` readout seam · `LabeledSelect` item-description slot · `LabeledField` label-action slot · `DockControl` hit-cell docstring · vitest loadability), `.d`'s two (monaco ships no `.d.ts` beside `basic-languages/*/<lang>.js`; glass-ui `Skeleton` is root-barrel-only at 7.0.0), plus `.a`'s measured refutation (per-thumb `aria-valuetext` is not expressible at the installed `dist/slider-DzqeQmMu.js` — 0 occurrences, one forwarded `aria-label`, no thumb slot). **Nothing was cured demo-side to compensate** (that clause is GREEN). **Glass-ui stayed READ-ONLY throughout.** | the completing `.g` seat |
| **R-8** | `.b`'s render edge covers writes that CROSS the wrapper; an engine write that bypasses it needs an engine seam (`setLayerConfig` is `Object.assign` + a dirty flag with no event) — **a KF.W5 ask, and a demo-side poll was refused, not written.** Plus `.b`'s STEP-bound coupling, `:inert` find-in-page note and D-M12 chrome-vs-peek. | KF.W5 / `.b`'s successor |
| **R-9** | `.c`'s open ids — KF-KE-18 · -34 · -50 · -17 · -54 · SPF-23 · the `proof:accent-census` residue; `KeyframesAddDialog.vue` and `useToolbarKeyboard.ts` in-bounds and unwritten. `.d`'s carried KF-CE-38 · -40 · -43 · -45 · -48. `.a`'s seven unspent (KC-6 ≡ KF-KC-21 · KC-11 ≡ KF-KC-27 · KC-24 · KC-25 ≡ KF-KC-28 · KF-KC-22 · KC-29 half · KC-32) and KC-12's behavioural half DECLINED WITH REASON. | the completing seat's census |
| **R-10** | eslint 7 · 7 UNMOVED (5 pre-window outright; 2 lines `.b` re-touched inside a pre-existing block) — `vue/no-mutating-props` ×6, `vue/valid-v-for` ×1 (the last on `TransportDock.vue`, KF.W13's file). | KF-CO-45's owner / KF.W13 |
| **R-11** | `KeyframeCard.vue` fails `prettier --check` on class ordering at the baseline; not reformatted. `useHighlightCSS.ts:190-203`'s theme-driver docblock re-read and left. Unread `controlOptionsStore.ts` schema members named for the store's owner. | as named |

### Escalations returned by this close

- **KF12-E2 — THE DISPATCH GAP (this close's own escalation, and the reason the verdict is PARTIAL).**
  Phase 3 was never dispatched. The evidence is threefold and independent: **zero commits** carrying
  `X.KF.W12.e` or `X.KF.W12.f` in 36 (⟨cmd⟩ `git log bf4a9a9c..HEAD --format='%s' | grep -c`); **zero
  receipts** under `## Unit receipts` (⟨cmd⟩ `grep -n '^### KF\.W12\.' execution/B/KF-W12.md` → the
  plan blocks `:282-424` and the receipts `.b :719` · `.a :819` · `.c :995` · `.d :1131` ·
  `.c` part 2 `:1216` — **no `### KF.W12.e`, no `### KF.W12.f`**); and **two absent test files**.
  **Neither unit was blocked.** `.e`'s predecessors closed (`.c` `c82f92ea`, `.d` `ec49bbef`, both
  recording the shas `.e` opens on); `.f`'s sole precondition OP-1 is **MET at the bytes** (0 · 0).
  This is an orchestration omission, not a cure failure, and this seat **cures nothing** — it returns
  it. **The wave is resumable without re-opening a single landed byte**: `.e` and `.f` are
  directory-disjoint from each other and from everything landed, and phase 3 is peak-2 inside the cap.
- **Carried, unresolved, each already stated by its unit and none re-described here**: **E-d1**
  (R-3) · **E-d2** (R-4) · **E-c1** (R-5) · **E-c2/-c3/-c4/-c5/-c6** (R-6) · `.b`'s KF-CO-9 store
  half, KF-CO-11/-12, KF-CO-15's options half and KF-CO-36/LP-22 (all out of the writable set) ·
  **KF11-E(j1)** (the `spring-trace-truth (4b)` honest-RED, KF.W11's, carried untouched).

### Positive statements the close gate asks for, stated as such

- **ZERO SWAP-discharge receipts** were written by any unit. The literal `DISCHARGED by KF.W7 SWAP
  verdict` now appears **3×** in this file — `:430`, and twice inside this Close's own reporting of
  the clause — and **every occurrence is a gate quotation, none is a receipt** (read by position,
  as the row above records). The KF-AV-28 discharge alphabet has **zero members** and nothing here
  wrote it.
- **ZERO re-bookings**: `KF-APP-41` **0**, kf-EditorShell `C-22` **0**, word-bounded, over all 36
  commit messages.
- **ZERO demo-side producer cures**: no scoped-style override, no re-implemented primitive, no
  copied producer selector, no `node_modules` patch. `.b` quoted the installed 7.0.0 `.d.ts`
  verbatim rather than guessing a prop name; `.a` refuted `aria-valuetext` and `LabeledSlider` at
  the installed bytes and landed `LabeledField` instead of reaching into rendered thumbs.
- **ZERO masking**: no `test.skip`/`it.skip`/`.only` anywhere in the tree, no `try/catch` around a
  defect, no allowlist, no widened timeout — `value4-editor-boundary.test.ts` is not in the diff at
  all.
- **The killed "both animate the same target simultaneously" scenario appears nowhere as this
  wave's work** (G-KFW12-5's anti-work clause holds vacuously — `.e` never ran).

### What this close asserts, and what it refuses to assert

It asserts: **G-KFW12-1, G-KFW12-2 and G-KFW12-3 are GREEN on every clause, double-run, at
`c82f92ea`** — the card's offset loop round-trips, the options card is live in both directions on a
render edge in the record's fixed order, and **Apply-CSS applies something** (KF-KE-4's chain, the
row the spec calls *"the single row that makes this wave's name honest"*, is cured and **proven by
execution with both strings pasted**, not by reading).

It refuses to assert: that the **goal criterion** is met. The spec's own words — *"A wave that …
lands sixty hygiene edits and leaves `getClassName()` producing `keyframes-style-X` while the
injected sheet's selector is `.x`, has failed this goal"* — are answered at `.c`'s half of the
identity, but **N-8's one-derivation route is `.e`'s and does not exist**, the axis-lock reveal is
untouched, and `getTmpAnimationName` still reads as an unused import at
`KeyframesStringControls.vue(76,5)`. **Four of six units is not the wave.**

### LEDGER

Track B row cells and the dated event line updated by this seat: status **`PARTIAL — .e (APPLY-UNIT)
and .f (AXISLINE-UNIT) never dispatched; G-KFW12-5/-6 born-RED unmoved; G-KFW12-4 RED on E-d1;
G-KFW12-7 RED on the vue-tsc, SS-6 and §Carry limbs`**, with the 36 + 8 commit roster in the commit
cell.

---

## Check 1

SERVED MODEL: claude-opus-5[1m]

**Seat**: FRESH ADVERSARIAL CHECK (L-20, pass 1) — VERIFY-ONLY. This seat authored **no** byte of
this wave's cures, of any unit receipt, of `## Close`, of the spec, or of the LEDGER row it reads.
**ZERO keyframes.js bytes · ZERO glass-ui bytes · ZERO product bytes** written anywhere.
**Date** 2026-09-19; sitting of record **2026-09-17** (the owner's begin-word, COHESION §0j).

**Crash-recovery (standing law, first act)**: ⟨cmd⟩ `git -C ../keyframes.js status --porcelain` →
**2 untracked rows**, both value.js-delivered coordination letters under `docs/tranches/V/coordination/`
— outside every KF.W12 path, untouched. ⟨cmd⟩ `git -C . status --porcelain` → **4 rows**:
`docs/tranches/V/reformation/CARRY-LEDGER.md` · `docs/tranches/X/parse-that/SEAM-CONTRACT.md` ·
`?? docs/tranches/X/parse-that/ADJUDICATION-W4.md` (all three sibling Track-A/Track-D seats', untouched)
· `scripts/dev/dev.sh` (**unowned, never staged, never touched**). **Zero dirty paths inside this
seat's writable set** (`execution/B/KF-W12.md`, `LEDGER.md`); **zero inherited hunks.**

**Substrate**: keyframes.js HEAD **`c82f92ea`** = `origin/master` (the 36 are published; the close's
push reproduces). value.js `tranche-u`.

### VERDICT: **NOT-CONFORMANT** — 1 BLOCKER · 1 HIGH · 2 MINOR · 2 INFO

**All seven gate verdicts reproduce at this seat's own commands, double-run** — 3 GREEN, 4 RED, and
**exactly one of the four REDs is relieved** under the spec's own heads. The close is *honest*: it
returns the dispatch gap as its own escalation, refuses the goal criterion in its own voice, and
masks nothing. Honesty is not conformance. **Two of six product units were never dispatched and
neither was blocked** — that is incompleteness, and COHESION **§0x** rules the class by name one
track over: *"F.W3 closed NOT-CONFORMANT because unit `.b` halted correctly on an unruled owner flag
and the chassis therefore never dispatched `.d`, `.e`, `.f` — **incompleteness, not relief**."*

### Axis 1 — every claimed GREEN reproduces (7 of 7 gate verdicts, double-run at this seat)

| gate | close's verdict | THIS seat, run 1 · run 2 | reproduces |
|---|---|---|---|
| **G-KFW12-1** CARD | GREEN 9/9 | `Tests 9 passed (9)` · same | **YES** |
| **G-KFW12-2** OPTIONS | GREEN 5/5 | `Tests 5 passed (5)` · same | **YES** |
| **G-KFW12-3** KFED | GREEN 7/7 | `Tests 7 passed (7)` · same | **YES** |
| **G-KFW12-4** EDITOR | RED, 1 of 4 | `Tests 1 failed \| 3 passed (4)` · same; the one case is `(2) KF-CE-1 … expected 0 to be greater than or equal to 2` at `css-code-editor-seam.test.ts:216` | **YES** |
| **G-KFW12-5** APPLY | RED, born, unmoved | `No test files found` · same; ⟨cmd⟩ `ls test/demo/instrument/apply-css-identity.test.ts` → `No such file or directory` | **YES** |
| **G-KFW12-6** AXISLINE | RED, born, unmoved | `No test files found` · same; ⟨cmd⟩ `ls test/demo/scenes/cube-axis-reveal.test.ts` → `No such file or directory` | **YES** |
| **G-KFW12-7** close | RED on 3 limbs | `test:demo` `2 failed \| 50 passed (52)` / `2 failed \| 438 passed (440)` · same; `vue-tsc` **14 · 14**; SS-6 **0 rows**; §Carry U5/U6 unspent | **YES** |

**Eleven byte clauses re-measured at this seat, all eleven identical to the close's AFTER column**:
`frame.start.value = starts` **0** · `:is-open` in `channel-controls` ***(no output)*** ·
`@update:checked` **0** · `parseCssScalar` **0** · `class="absolute top-2 right-4` **0** ·
`toLowerCase()` in `useKeyframesState.ts` **0** · `tabFocusMode` **2** · `isFormatting` **6** ·
`cssIdent` in `dist/keyframes.d.ts` **2** · `cssIdent` in `demo` → **2 hits, both comments**
(`helpers.ts:10`, `useKeyframesState.ts:58`) = **0 non-comment consumers, RED** ·
`useEventListener(window, "keydown"` in `OrbitalDrag.vue` **0**.

**All six order / lock / no-split clauses re-derived from `git log --reverse`, not from prose**:
KC-34 `e5235ca0` **precedes** keep-mounted `5b80d54c` (OP-3) · the five OPTIONS steps are five commits
in sequence `98675047`→`ebbc8259`→`fcafcff8`→`0e31d417`→`b67dae6f` · the STEP-1 lock holds —
⟨cmd⟩ `git show --stat 98675047` names `ChannelOptions.vue` · `LayerConfigPanel.vue` ·
**`ControlsPaneWrapper.vue`**, so LP-1's render edge rides the same commit as the capability
restorations · KF-CE-3 `7cda421c` is `.d`'s first · KC-2 ≡ KF-KE-2 is ONE commit `dec084a8`
(`KeyframesEditor.vue` alone) · `debounce` lands ALONE at `ccda20c7` (`demo/utils/helpers.ts`, 1 file).

**The three GREENs were read at the cure, not at the gate.** KF-KE-4's chain — *"the single row that
makes this wave's name honest"* — is genuinely cured at `useKeyframesState.ts` (`getTmpAnimationName`
returns `keyframesStyleId` verbatim; the strip and the case-fold are gone) and genuinely **proven by
execution**: case (1) mounts the editor, clicks Apply, reads the class off the REAL target and the
selector out of the injected `<style>`, asserts `selectorName === className === animationName ===
keyframesName`, and then asserts `className !== className.toLowerCase()` so the audited case-folded
derivation cannot pass. KF-TFP-1's BLOCKER is cured by a real 225-line `useEasingPickerSeat`
consumed by **both** seats (⟨cmd⟩ `grep -rn 'useEasingPickerSeat' demo` → `TimingFunctionPanel.vue:162`
and `EasingSidebar.vue:156`), carrying all five members §Scope 2 enumerates. KC-2's rail declares
`:min="0" :max="100" :step="0.1" :marks` and writes `frame.start = percentSelector(percent)`.

### Axis 2 — bounds

⟨cmd⟩ `git log bf4a9a9c..HEAD --name-only --format='' | sort -u` → **26 paths, every one a §B.2 row**.
Wave-invalidating bounds each measured EMPTY at this seat: `src/**` **0** · `orbital-drag/**` **0** ·
`node_modules/**` **0** · `package.json` / `vitest.config.ts` **0** · every glass-ui tree **0** ·
`timeline/**` **0** · `playback/**` **0** · `TransportDock*` / `demo/app/**` **0** · `shell/**` **0** ·
`PlaybackRibbon.vue` **0** · **`scripts/dev/dev.sh` in 0 of 44 commits** (36 kf + 8 value.js).
Per-unit SELF-COUNT reproduces: `.a` **9** · `.b` **8** · `.c` **12** · `.d` **7** = 36; `.e` **0** ·
`.f` **0** · `.g` **0**. Every value.js commit is pathspec-bounded to `execution/B/KF-W12.md`,
`keyframes/evidence/W12/**`, `LEDGER.md` or `V/coordination/INBOX.md` (⟨cmd⟩ `git show --name-only`
each of the twelve). See MINOR-1 for the one carve read strictly.

### Axis 3 — masking census, run independently

⟨cmd⟩ `grep -rnE '(test|it|describe)\.(skip|only)\(' test/` → ***(no output)*** tree-wide.
⟨cmd⟩ `git diff bf4a9a9c..HEAD -- test | grep '^+' | grep -E '(test|it|describe)\.(skip|only)\('`
→ ***(no output)*** (the literal clause's **1** is the prose line the close disambiguated; confirmed).
⟨cmd⟩ `git diff bf4a9a9c..HEAD -- demo test | grep '^+' | grep -E 'ts-ignore|ts-expect-error|eslint-disable|as any|@ts-nocheck'`
→ ***(no output)*** — **zero** suppressions, **zero** `as any`, in 44 commits.
The five added `try/catch` blocks were read whole: KF-CE-10's un-cached boot rejection (renders the
failure + a real Retry), KF-CE-9's one format boundary (toast + description + Retry, latch released
in `finally`), and three `reportAsync` error postures — **every one surfaces the error; none swallows
a defect.** The five `as unknown as` are test scaffolding (an `Element.prototype` pointer-capture
surface, two `ResizeObserver` stubs, one `vm` handle, one frame-shape probe). `value4-editor-boundary.test.ts`
⟨cmd⟩ `git diff … | wc -l` → **0** — the named masking class (§L-18 (iv)) did not occur.
**No existing witness test was modified at all** — the only `test/**` paths in the diff are the four
created files — so no assertion was weakened anywhere.
The one judgement call read in full: `4fa6efec` re-cut G-3 case (4a) to hand the handler a group that
settles at `AnimationGroup.of` instead of racing a real rAF motion. It is **not** a narrowing — the
handler's contract is still asserted (the frames removed, the second press a no-op, **no** `"exit
motion did not settle"` warning), the predecessor `781ac250` is a real root-cause cure of the hostage
bound found BY the gate, and (4b)'s window moved **with** that cure (≥1300 / <3000), not against it.

### Axis 4 — commit families · Axis 5 — E-3 · Axis 6 — mail · Axis 7 — the four-verb line

- **Families**: the three MUST-NOT-SPLIT families are one sha each (above). One commit per meaning
  across all 36; `.a` 9 / `.c` 12 exceed §Commit plan's *expected* 7 / 10 by genuine extra meanings
  (the KF-KE-7 budget correction found by its own gate, the KF-CE-41 prose commit) — the plan says
  "Expected", not "exactly".
- **E-3**: ⟨cmd⟩ over the twelve value.js commits' `--name-only` → **0** hits on
  `registry/adjudicated/` or `keyframes/waves/`. The spec `KF-W12.md`'s last commit is **`f208ff31`**
  (the authoring fold) — byte-untouched by this wave. Conformance artefacts, sibling specs,
  `RULINGS-4`'s `.focus-ring` census: untouched. **E-3 HELD.**
- **Mail**: ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **80** (reproduces);
  ⟨cmd⟩ `grep -nE '\| *UNREAD *\|' INBOX.md` → ***(no output)*** — **0 UNREAD Status cells**. The
  bare `grep -c 'UNREAD'` → 78 is the header vocabulary and prose, exactly the false-gate the close
  refused to read. **No wave scope carries unread mail.**
- **The four-verb line**: **UNMOVED, and lawfully so.** §State's own condition is *"stays NO until
  the gates green after the sequencing head lands"*; four gates are RED, so IMPLEMENTED stays NO and
  the close did not stamp it. VERIFIED is a successor's. **GREEN.**

### Axis 8 — the spec's own goal criterion, read at the bytes

The criterion has six legs. **CARD · OPTIONS · KFED · EDITOR** are met or honestly escalated at the
bytes. **APPLY is absent** — *"the applied stylesheet binds the class it adds under one
`cssIdent`-derived name with one lifetime"*: the class/selector identity is cured at `.c`, but the
**one `cssIdent`-derived name** is N-8, `.e`'s row, and ⟨cmd⟩ `grep -rn 'cssIdent' demo` returns
**two comments and zero consumers**; RB-6's one lifetime is unwritten. **AXISLINE is absent
entirely** — *"the axis-lock reveal reveals what it claims on the demo's one keyboard registry"*:
`CubeAxisLines.vue` is byte-unchanged across all 36 commits, and ⟨cmd⟩
`grep -n 'rotateY\|rotateZ\|1000vw' demo/scenes/cube/CubeAxisLines.vue` still reads `:63` · `:113` ·
`:117` exactly as the spec banked them. **The goal criterion is NOT MET**, and the close says so in
its own voice.

### Axis 9 — the record's published figures reproduce (write-then-measure)

Reproduced: the 36/26-path bounds audit · the per-unit SELF-COUNTs · all eleven byte clauses · the
`vue-tsc` **14 · 14** and its nine-file decomposition (`.c` 1 · `.e` 2 in-bounds; 11 outside, owners
named) · `eslint` **7 problems** with the open-vs-close mutation-site comparison (TFP **3 → 3**,
CPW **3 → 3**) · `git diff --check` clean · the nine evidence files on disk · the two `test:demo`
failures by name · INBOX 80 / 0 UNREAD. **One figure does not reproduce** — INFO-1 below.

### Axis 10 — HONEST-RED ADJUDICATION, gate by gate, at the spec's bytes

| RED gate | the relief the close offers | adjudged at the spec's bytes |
|---|---|---|
| **G-KFW12-4** (case (2), the tokenizer) | **E-d1** — the arm's cure needs a five-line ambient declaration for monaco's untyped `basic-languages/css/css.js`, whose only lawful home is `demo/env.d.ts` (⟨cmd⟩ `find demo -name '*.d.ts' -maxdepth 2` → **`demo/env.d.ts`, the only one**), **not a §B.2 row**. The built hunk is preserved byte-exact in `evidence/W12/KF-W12-d-born-red.md` with its measured delta; `@ts-expect-error`, a cast and a non-literal specifier were each **refused by name**; owner named at **R-3**. | **RELIEVED — honest-RED.** The standing law makes a write outside §File Bounds an ESCALATION to be *returned*, not worked around; the unit returned it and cured everything reachable (3 of 4 cases GREEN). An ambient module declaration cannot live in an SFC. **Owner-named. This is the honest-RED set.** |
| **G-KFW12-7 — `vue-tsc` literal-zero limb** | COHESION **§0u part (3)** relocates the literal zero to **KF.W13's close**. | **RELIEVED as to the literal zero** — verified at the COHESION bytes (`085b2121`, §0u at `:1568`), quoted by the close verbatim and correctly. §0u part (2) — *"every unit zeroes the diagnostics inside its own §Bounds rows"* — is met for `.a` (2→0) and `.b` (8→0), and for `.c` **only by escalation** (E-c1's root is `keyframes/utils/parseAnimationCSS.ts`, verified **not** a §B.2 row → relieved). **It is NOT met for `.e`'s two**, for the reason in BLOCKER-1. |
| **G-KFW12-5** (APPLY) | none offered. The close names `"a .e seat"` as R-1's owner. | **NOT RELIEVED.** Not producer-owned; **not routed to a successor by the spec** — §Execution shape puts `.e` in *this* wave's phase 3; not an honest-RED the spec names by id. The close itself measures that the preconditions were **MET** (`.c` `c82f92ea`, `.d` `ec49bbef`, OP-4 re-read). A residual naming "a `.e` seat" is the wave owing itself its own work. |
| **G-KFW12-6** (AXISLINE) | none offered. R-2's owner is `"a .f seat"`. | **NOT RELIEVED**, and more starkly: `.f`'s **sole** precondition OP-1 reads **0 · 0** at my own grep. Nothing blocked it. |
| **G-KFW12-7 — §Carry limb** | none. | **NOT RELIEVED** — U5 and U6 are entirely unspent; the clause requires *every* id LANDED / KILLED-with-rationale / carried. |
| **G-KFW12-7 — SS-6 relay limb** | *"the relay is `.g`'s act on a completing close"*. | **NOT RELIEVED** — see HIGH-1. |

**The honest-RED set is exactly {G-KFW12-4}.** Three other REDs stand unrelieved.

### Successor conjuncts

**KF.W13** is the only successor naming this wave: §State `:30` — *"**KF.W12 `.b` (OPTIONS-UNIT)
CLOSED** — for `.b`'s C-2 joint commit only"*, and cross-edge `:235`. That conjunct is **GREEN**:
`.b` closed at kf `2cd314af` with G-KFW12-2 **5/5 at this seat's own double-run**, and LP-1's render
edge is in `98675047` (verified by `git show --stat`). **No successor is lawfully blocked by this
wave.** KF.W12's own `.e` and `.f` remain resumable without re-opening a landed byte — they are
directory-disjoint from each other and from all 36 commits.

### Register — severity · claim · receipt · cure

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **1** | **BLOCKER** | **Phase 3 — `.e` APPLY-UNIT ∥ `.f` AXISLINE-UNIT, two of six product units — was never dispatched, and NEITHER WAS BLOCKED. G-KFW12-5 and G-KFW12-6 are born-RED and unmoved with no relief under any of the three canonical heads, and the spec's own goal criterion is unmet at the bytes (the APPLY leg's one `cssIdent`-derived name and one lifetime; the AXISLINE leg entire).** | ⟨cmd⟩ `git log bf4a9a9c..HEAD --format='%s' \| grep -c 'X.KF.W12.e'` → **0**; same for `.f` → **0** · ⟨cmd⟩ `grep -n '^### KF\.W12\.' execution/B/KF-W12.md` → no `.e`, no `.f` receipt · ⟨cmd⟩ `ls …/apply-css-identity.test.ts` and `…/cube-axis-reveal.test.ts` → `No such file or directory` ×2 · ⟨cmd⟩ `grep -rn 'cssIdent' demo` → 2 hits, **both comments** · ⟨cmd⟩ `git log bf4a9a9c..HEAD -- demo/scenes/cube/CubeAxisLines.vue` → *(no output)* · OP-1 ⟨cmd⟩ `grep -c 'useEventListener(window, "keydown"' OrbitalDrag.vue` → **0 · 0** — `.f` had no blocker. COHESION **§0x** (`:1606`) rules this exact class one track over: *"incompleteness, not relief."* | Dispatch `[.e ∥ .f]` on `c82f92ea` (peak 2, inside the cap) per §Execution shape and the close's own R-1/R-2 rosters, then a completing `.g`. Nothing landed needs re-opening. |
| **2** | **HIGH** | **G-KFW12-7's SS-6 relay limb was not merely RED — it was deferred although the close held both the authority and the evidence to turn it green.** §B.2 grants `.g` write access to `INBOX.md` and the SS-6 accretion register; nine producer rows stand collected and written down (R-7), glass-ui stayed READ-ONLY, and the standing BH/BI relay law makes the relay a formation invariant, not an option. | ⟨cmd⟩ `git show --name-only 6f878106` → `execution/B/KF-W12.md` **alone**; no `INBOX.md`, no SS-6 register row · the close's own words: *"**0 rows appended** — the relay is `.g`'s act on a **completing** close"* · R-7 enumerates all nine with their producers. | Relay the nine collected rows (`.b`'s seven incl. OP-5's `default: undefined` ask, `.d`'s two) at the completing `.g`, with `.a`'s `aria-valuetext` refutation recorded; `.e`/`.f` add theirs when they run. Mitigation: nothing is lost — every row is written down. |
| **3** | MINOR | **§0u part (2) is unmet for two of the three in-bounds diagnostics.** `KeyframesStringControls.vue(55,9)` and `(76,5)` TS6133 stand at close; `(76,5)` — *"'getTmpAnimationName' is declared but its value is never read"* — is, in the re-open table's own words, *"the type-level shadow of KF-KE-4's unrouted half"*. Consequence of BLOCKER-1, registered so the register is complete. | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep 'error TS' \| sed 's/(.*//' \| sort \| uniq -c` → 14 total, `KeyframesStringControls.vue` **2**, `useKeyframeOps.ts` **1**, the other 11 outside. The ratchet **fell 24 → 14 and never rose** — part (2)'s no-raise half holds, and **no cast, `@ts-expect-error` or `eslint-disable` was written as a cure anywhere** (verified independently at Axis 3). E-c1's 1 IS relieved: `keyframes/utils/parseAnimationCSS.ts` is not a §B.2 row. | Falls with `.e`'s N-8 route; E-c1 with its named owner. |
| **4** | MINOR | **`EasingSidebar.vue`'s carve is read generously.** §B.2 `:114` bounds the file to *"the two `EasingPicker` seat call-sites ONLY — every other byte of the file is out of bounds"* and §Scope's triumvirate makes expansion wave-invalidating; the measured diff is **92 insertions / 132 deletions** across three hunks, including the deletion of the whole `.easing-editor` scoped-style block and a rewritten `watch`. | ⟨cmd⟩ `git diff --stat bf4a9a9c..HEAD -- demo/scenes/easing/EasingSidebar.vue` → 92/132. Read hunk by hunk at this seat: every deletion maps to one of the **five members §Scope 2 itself enumerates** for `useEasingPickerSeat` (seed · live-state echo predicate · key · container CSS · one truth parameter); `container-type` survives as `seat.containerStyle` (`{containerType:"inline-size"}`); ⟨cmd⟩ `grep -rn 'easing-editor' demo/` → ***(no output)*** — the dropped `container-name` has **zero** consumers; `catalogueGap`/`syncGap`/`nameForQuad`/the gallery/the duration slider/the BG-8 caption all survive. | **MITIGATED, not blocking** — the close DISCLOSED the reading on the record rather than letting a challenge discover it, and the spec's own §Scope names "container CSS" a seat member. Recorded so a pass-2 seat may still overturn it at the record. |
| **5** | INFO | **One published figure does not reproduce.** ACT 2 reports the `DISCHARGED by KF.W7 SWAP verdict` census as *"**3 after**"* with occurrences at `:430` · `:1474` · `:1611`. | ⟨cmd⟩ `grep -c 'DISCHARGED by KF.W7 SWAP verdict' execution/B/KF-W12.md` → **2 · 2**; ⟨cmd⟩ `grep -n …` → `:430` and `:1474` only. The third is line-wrapped across `SWAP` / `verdict` in the close's own §Positive-statements prose and therefore cannot match a line grep. **WRITE-THEN-MEASURE, disclosed at this seat's own append**: writing this row raised the census to **3 · 3** (`:430` · `:1474` · `:1823`) — the same self-counting pathology the close caught, one seat later. Read by position: `:1823` is **this row**, a citation of the clause, not a receipt. | Substance unaffected — **all** hits are gate quotations or citations of the clause, **zero** are receipts; the KF-AV-28 discharge alphabet is empty and nothing in this check wrote it. |
| **6** | INFO | The LEDGER Track-B row carries a duplicated tail fragment — `… close \`6f878106\` + this row** · this row**`. | ⟨cmd⟩ `sed -n '56p' execution/LEDGER.md \| tail -c 200`. | Cosmetic; a minimal in-place cell repair by a seat that owns the row. |

### What this check asserts, and what it refuses

It asserts: **every GREEN the close claims reproduces at this seat's own double-run commands**, the
bounds are clean over 44 commits, **nothing is masked anywhere in the diff**, E-3 holds, the mail is
clean, the four-verb line was moved lawfully (i.e. not at all), and the close's escalation KF12-E2 is
**true and correctly returned**. The three landed gates are landed at the cure, not at the gate —
KF-KE-4's chain, audited four times without a reader noticing, is cured and proven by execution.

It refuses to assert: that a wave missing two of six units, whose own goal criterion is unmet at the
bytes and whose two born-RED gates carry **no** relief the spec grants, may be read as CLOSED —
under any qualifier. **The LEDGER row stays PARTIAL.** `.e` and `.f` are the whole of the remaining
work and they are unblocked; the honest-RED set for a future close is, on today's bytes, exactly
**{G-KFW12-4}**.

---

## Resume — 2026-09-19, THIRD SITTING: `.e` half-landed and killed, `.f` never dispatched

**SERVED MODEL: claude-opus-5[1m]** · SEAT 0 (OPEN, RESUME MODE), VERIFY-AND-BANK only — this seat
wrote **zero** keyframes.js bytes, **zero** glass-ui bytes and **zero** product bytes anywhere.
**E-3**: nothing above this line is amended; every figure above stands as its seat wrote it.
**Sitting of record: 2026-09-17**, the owner's begin-word (COHESION §0j). Wall clock 2026-09-19 23:0x EDT.

**Disposition**: the LEDGER cell reads `KF.W12 = OPEN 2026-09-17 → **PARTIAL 2026-09-19**` — not
CLOSED — and this record exists, so the wave re-enters in **RESUME MODE**. `.a` · `.b` · `.c` · `.d`
stand on their landed commits and receipts and are **NEVER re-dispatched**. Owed: **`.e`** (partial —
four commits landed, then the seat was killed), **`.f`** (zero commits, zero bytes), **`.g`**
(a re-close: the close of record returned `PARTIAL` on **KF12-E2**, the phase-3 dispatch gap, and
CHECK 1 sustained it `NOT-CONFORMANT`; with phase 3 landed the wave cannot reach a verdict without a
second close seat).

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` →
`M demo/components/instrument/keyframes/KeyframesStringControls.vue` ⊕ two untracked
`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-*` letters (outbound copies value.js authored;
not product). **The one modified product path is a §B.2 row owned by `.e`** (`.d` → `.e`, serial) and
its hunks name themselves: ⟨cmd⟩ `git diff -- …/KeyframesStringControls.vue --stat` → **50 insertions,
4 deletions**, carrying `D-4 (X.KF.W12.e)` — the editor-well shake target — and
`N-7 (X.KF.W12.e)` — the one-deep promise queue over `onEditorChange`. **This seat does not touch it**
(it is not SEAT 0's writable set); it is handed to the resumed `.e` under the crash-recovery law,
named here so nothing inherits silently.

**The inherited hunk is live-broken, and the baseline must not be read without it**: ⟨cmd⟩
`grep -c 'setTargets' …/KeyframesStringControls.vue` → **3** in the worktree · ⟨cmd⟩
`git show HEAD:…/KeyframesStringControls.vue | grep -c 'setTargets'` → **0** at HEAD. The demo suite
therefore raises `TypeError: parseErrorShake.setTargets is not a function` at
`KeyframesStringControls.vue:217:25` (surfaced through `css-code-editor-seam.test.ts`'s mount) —
**a working-tree error, present in neither the committed tree nor any close reading above**.

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain -- docs/tranches/X/execution/ docs/tranches/V/coordination/INBOX.md`
→ `M A/X-W5.md` · `M A/X-W9.md` · `M B/KF-W13.md` · `M LEDGER.md`. **All four are sibling seats'
in-flight bytes** (Track A's X-W9 RESUME-OPEN row and event line are the LEDGER's dirty hunks, read
whole before writing this line); **none is restored, stashed or staged by this seat**, and the LEDGER
commit below is taken only against a re-read of the file (see §LEDGER at the foot).

### Substrate

keyframes.js `/Users/mkbabb/Programming/keyframes.js` — ⟨cmd⟩ `git rev-parse --short HEAD` →
**`2a0afe7a`**; ⟨cmd⟩ `git rev-parse --short origin/master` → **`c82f92ea`**. **HEAD is four commits
ahead of the remote — `.e`'s four, unpushed** (⟨cmd⟩ `git log --oneline c82f92ea..HEAD` → `5bbb7b20`
N-8 routed arm · `30efb823` RB-6 one lifetime · `d0665322` D-5/L-M-4/C-4 optional seat ref ·
`2a0afe7a` D-23 + the emitted-selector carve). value.js on `tranche-u`.

### The finding this sitting adds — `.e` landed bytes and no receipt, and its gate is still born-RED

The close of record (§Close) and CHECK 1 both measured **zero** `X.KF.W12.e` commits among 36. That
was true at their clock and is **false now**, by four commits timestamped **10:08 · 10:09 · 10:26 ·
12:44** — i.e. `.e` was dispatched *after* the close seat sat, and was then killed mid-work (the
worktree's last write is **12:45**, one minute after its last commit, and nothing has moved since).
What `.e` owes is therefore exactly what a killed seat leaves behind, measured three ways:

1. **No receipt** — ⟨cmd⟩ `grep -n '^### KF\.W12\.e' execution/B/KF-W12.md` → *(no output)*, twice.
2. **No gate artefact** — ⟨cmd⟩ `ls test/demo/instrument/apply-css-identity.test.ts` →
   `No such file or directory`, twice. **G-KFW12-5 is still born-RED**, so nothing `.e` landed is
   proven by execution.
3. **Uncommitted product bytes** — the 50-insertion `KeyframesStringControls.vue` hunk above, which
   the suite proves is not merely unfinished but **erroring**.

`.e` is therefore **re-dispatched in RESUME form** — never re-run from the top. Its four landed
commits are a **standing substrate**: the resumed seat re-does none of them, re-decides nothing they
decided, and opens its receipt by naming them. This is the crash-recovery law applied to the one unit
it was written for, not a re-dispatch of landed work.

### E13 Step-0 — the four-path mail sweep, at this seat's own clock

| path | confirmed | result |
|---|---|---|
| `value.js/docs/tranches/V/` + `…/V/coordination/` | yes | no letter dated 2026-09-19; the tail is the 09-18 4.1.0 packet, every file rowed |
| `../glass-ui/docs/tranches/BK/coordination/` | **BK is still the newest** — ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ \| head -3` → `BK/` · `BJ/` · `BI/` | two `*-valuejs-*` letters (`…-09-17-o20-disposition`, `…-09-18-o26-reply`), **both already rowed** (grep hits 3 and 33) |
| `../keyframes.js/docs/tranches/V/coordination/` | yes | newest value-addressed item `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` — **rowed** (36 hits) |
| `../sci-report/atlas/docs/tranches/P/coordination/` | yes | newest is 2026-07-27; nothing new |

⟨cmd⟩ `ls <the four dirs> | grep '2026-09-19'` → *(no output)* — **no mail landed anywhere today.**
**INBOX census**: ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **81** rows; positional scan of the
status column (field 6 of the `| # | Date | From | Letter | Status | Owner |` table) over every
`I-` row → `FOLDED 16 · ROWED 9 · READ 7 · ACTED 1 · RATIFIED 1 · RECONCILED 1` — **0 UNREAD**.
**0 unrowed · 0 UNREAD in this wave's scope.** No row was added; a dated sweep line is appended at
the file's end.

### Preconditions — re-measured at this sitting, at kf `2a0afe7a`

| # | precondition | reading |
|---|---|---|
| **OP-0** | `G-KFW4-1` — a **RATCHET**, not a threshold (COHESION **§0u**, `085b2121`) | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` → **12 · 12**. Banked at the re-open as **14**; the ratchet has **FALLEN by 2 and never risen** (`.e`'s D-23 zeroed its own two). **MET.** |
| **OP-1** | KF.W11 `.a`'s OD latch family landed | ⟨cmd⟩ `grep -c 'useEventListener(window, "keydown"' demo/scenes/cube/orbital-drag/OrbitalDrag.vue` → **0 · 0**. **MET** — `.f` opens. |
| **OP-2** | KF.W11 `.b`'s `useKeyframeOps.ts` carve | spent at `.c`; `.c` is CLOSED at `c82f92ea`. **MET, and no owed unit writes the file.** |
| **OP-4** | the `cssIdent` publication | ⟨cmd⟩ `grep -c 'cssIdent' dist/keyframes.d.ts` → **2 · 2** (clock clause); ⟨cmd⟩ `grep -rc 'cssIdent' demo \| grep -v ':0$'` → `helpers.ts:1` (comment) · **`useKeyframesState.ts:5`** · **`useKeyframesParsing.ts:1`** — the demo now has **two non-comment consumer files**, landed by `.e`'s own `5bbb7b20`/`2a0afe7a`. **The routed arm is the arm of record**; `.e`'s receipt prints this grep. |
| **`.e` opens after** | `.c` ⊕ `.d` | `.c` `c82f92ea` · `.d` `ec49bbef`, both recorded in their receipts. **MET.** |
| **`.g` opens after** | `.a`..`.f` | **NOT YET** — `.g` is the last group, after `.e` and `.f` land. |

### Baseline (resume) — only the gates the owed units turn, re-run READ-ONLY, double-run

Per the STALL-WATCHDOG resume clause: **G-KFW12-5 · -6 · -7** are re-run at this seat's own clock;
**G-KFW12-1 · -2 · -3 · -4** are **cited from the close's banked table** (§Close ACT 2) and re-run by
**`.g`**, not here — no landed byte of theirs moved (`.e`'s four commits touch
`useKeyframesState.ts`, `useApplyCSS.ts`, `useKeyframeBrushApply.ts`, `useKeyframesParsing.ts`,
`RibbonBar.vue`, `KeyframesStringControls.vue`, all §B.2 `.e` rows).

| gate | command | reading (run 1 · run 2) | verdict |
|---|---|---|---|
| **G-KFW12-1** CARD | banked | `9 passed (9)` · same | GREEN (cited, not re-run) |
| **G-KFW12-2** OPTIONS | banked | `5 passed (5)` · same | GREEN (cited, not re-run) |
| **G-KFW12-3** KFED | banked | `7 passed (7)` · same | GREEN (cited, not re-run) |
| **G-KFW12-4** EDITOR | banked | `1 failed \| 3 passed (4)` · same | RED — E-d1 alone (cited) |
| **G-KFW12-5** APPLY | ⟨cmd⟩ `ls test/demo/instrument/apply-css-identity.test.ts` | `No such file or directory` · same | **RED — born-RED, UNMOVED** |
| **G-KFW12-6** AXISLINE | ⟨cmd⟩ `ls test/demo/scenes/cube-axis-reveal.test.ts` | `No such file or directory` · same | **RED — born-RED, UNMOVED** |
| **G-KFW12-7** close | ⟨cmd⟩ `npm run test:demo 2>&1 \| tail -4` | **`Test Files 2 failed \| 50 passed (52)` · `Tests 2 failed \| 438 passed (440)` · `Errors 1 error`** — identical both runs (23:03:27 · 23:04:02) | **RED** |
| **G-KFW12-7** `vue-tsc` limb | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | **12 · 12** | RED against the literal 0; **the ratchet fell 14 → 12** |

**The two failing files, named, both pre-existing and owned**: `css-code-editor-seam.test.ts`
`(2) KF-CE-1: the tokenizer the boot registered classifies 'a { color: red }'` — `.d`'s **E-d1**,
carried; and `spring-trace-truth.test.ts` `(4b)` — **KF.W11's inherited honest-RED**, unweakened and
not this wave's. **The `Errors 1 error` line is NEW and is the inherited worktree hunk**, not a third
failing test: it disappears the moment `.e` finishes or reverts its own uncommitted `setTargets` call.
Nothing was skipped, cast, guarded or allow-listed to reach any reading above.

**Byte/clock clauses re-measured for the two owed product units (double-run):** `cssIdent` in `dist`
**2 · 2**; `cssIdent` non-comment consumers in `demo` **2 files** (`useKeyframesState.ts:5`,
`useKeyframesParsing.ts:1`); window-keydown **0 · 0**; ⟨cmd⟩
`grep -n 'rotateY\|rotateZ\|1000vw' demo/scenes/cube/CubeAxisLines.vue` → `:63 width: 1000vw` ·
`:113 rotateZ(90deg)` · `:117 rotateY(90deg)` — **`.f` has written nothing; all three stand as the
spec recorded them.**

### GREEN-BEFORE-CURE (R.2) at this resume — two carried, one new, none claimed

1. **G-KFW12-6's inbound clause — `LANDED-BY fff7232c`** (KF.W11 `.a`). **0 · 0**, carried unchanged
   from the re-open's booking; `.f` prints it and claims none of it.
2. **KF-AX-9's three raw `180ms` token rider — `LANDED-BY KF.W6`**; ⟨cmd⟩
   `grep -n '180ms' demo/scenes/cube/CubeAxisLines.vue` → `:41` · `:81`, **both comments**, no
   declaration. Re-measured at `.f`'s open; never claimed.
3. **NEW — G-KFW12-5's byte clause reads GREEN before its gate: `LANDED-BY 5bbb7b20` ⊕ `2a0afe7a`.**
   The clause (`≥ 1` non-comment `cssIdent` consumer in `demo`) is satisfied by **`.e`'s own landed
   commits**, so it is a *partial cure already banked*, **not** a green this wave inherits from
   elsewhere — booked by sha so the resumed `.e` claims the runtime clause only, and re-proves the
   byte clause rather than re-cutting it.

**No other gate or clause reads green before its cure.**

### Unit plan (resume) — 3 owed units in 2 ordered groups; the four landed units are NOT re-dispatched

**`alreadyDone` — never re-dispatched, and no byte of theirs is re-opened**: `KF.W12.a` (9 commits,
receipt `:819`) · `KF.W12.b` (8, `:719`) · `KF.W12.c` (12, `:995` + `:1216`) · `KF.W12.d` (7, `:1131`).
⟨cmd⟩ `git log --oneline -200 | grep -o 'X\.KF\.W12\.[a-g]' | sort | uniq -c` → `9 .a · 8 .b · 12 .c
· 7 .d · 4 .e` — and `.f` **absent**, exactly as the close measured.

**Groups (spec §Sequencing, unchanged — phase 3 then phase 4; peak concurrency 2, inside the cap)**:

1. **`[.e ∥ .f]`** — disjoint at the bytes: `.e` writes `…/instrument/keyframes/**` ⊕
   `…/transport/controls-pane/RibbonBar.vue`; `.f` writes `demo/scenes/cube/CubeAxisLines.vue`.
   **No shared modify path.** Both append their receipt to the end of THIS file under the wave's own
   append-only law (§B.2, `every unit`) — each re-reads the file immediately before appending.
2. **`[.g]`** — the **re-close**, serial, last.

**`KF.W12.e` — RESUME (Opus).** Opens on `.c` `c82f92ea` ⊕ `.d` `ec49bbef`, at kf HEAD `2a0afe7a`.
**First act, before any cure**: read the inherited 50-insertion `KeyframesStringControls.vue` diff
WHOLE (D-4's `editorWellRef` shake target; N-7's `editorChangeTail` promise queue), judge every hunk
against §Scope 5, **finish what conforms and rewrite what does not** — the `parseErrorShake.setTargets`
call is not a function on the seat the file holds and is the suite's live `1 error`; it is cured at
the root (the correct seat API, or the target passed at construction), **never by a try/catch, a
skip or a revert-and-forget**. Then: print OP-4's two greps; state which N-8 arm was taken (the
**routed** arm is landed — `useKeyframesState.ts:5` + `useKeyframesParsing.ts:1`); write
`test/demo/instrument/apply-css-identity.test.ts` and turn **G-KFW12-5** green on every limb
(uppercase-id `getClassName()` ≡ the selector inside `getCSSString()` via ONE `cssIdent` route; the
target animates under the injected sheet; RB-6's one lifetime; `clear()` wired); name the killed
"both animate the same target" scenario as killed; then append `### KF.W12.e` — the receipt the
killed seat never wrote — naming its four landed shas as inherited-and-kept, the inherited path, and
the §0u ratchet reading for its own §Bounds rows.

**`KF.W12.f` — AXISLINE-UNIT (Opus), full dispatch, nothing inherited.** Zero commits, zero bytes,
and its sole precondition **OP-1 is MET (0 · 0)**. Brief unchanged from `:404-422` above.

**`KF.W12.g` — RE-CLOSE (Opus, VERIFY-ONLY).** The close of record stands verbatim (E-3); the
re-close appends a dated `## Close — second sitting` that re-runs **all seven** gates at its own
double-run clock (G-1..-4 are re-run there, not cited), audits the **full** commit roster including
`.e`'s four and `.f`'s, re-reads the §0u ratchet against the banked floor, sails the SS-6 producer
rows, runs E13, and moves the LEDGER cell off `PARTIAL` only if the measurements earn it. **KF12-E2
is answered by landing, not by argument**; CHECK 1's BLOCKER-1 and HIGH-1 are addressed head-on and
each is either discharged with its receipt or re-stated as carried.

### Dispatch note (resume)

Order: `[.e ∥ .f] → [.g]`. Models: **Opus** for all three (the three design-shaped units `.b`/`.c`/`.d`
are landed; no fresh design decision is owed). `.e` and `.f` write keyframes.js product bytes plus
their value.js receipts; `.g` writes value.js only. **The four landed units are never re-dispatched.**

### LEDGER — the row edit and the event line are **WITHHELD**, and here is why, with the text banked

⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/LEDGER.md` → `M …/LEDGER.md`; ⟨cmd⟩
`git diff --numstat -- …/LEDGER.md` → **`2 1`**, read twice at 23:0x with the same figures. The diff,
read whole, is **Track A's**: the `X-W9` row's cell moved to `RESUME-OPEN 2026-09-19` and one X-W9
RESUME event line appended — a sibling seat's in-flight bytes in a file four tracks share. A pathspec
commit names paths, not hunks, so committing `LEDGER.md` here would sweep Track A's uncommitted row
into a Track B commit. **This is the fourth withholding of the day on this exact mechanism**
(R.9.5 · R.9.7 · §0ag); the law that forbids it is the one that produced three contaminated commits
at X-W0. **Nothing is staged, nothing is restored, the `PARTIAL` cell is left unregressed.**

**Banked, to be landed by `.g` (or by any seat that finds the file clean) — the cell edit is a
MINIMAL in-place replacement, never a rewrite, and it PRESERVES `PARTIAL` rather than regressing it
to `OPEN`:**

> **cell** (row `KF.W11 · W12 · W13`, the `KF.W12 = …` clause): `KF.W12 = OPEN 2026-09-17 →
> **PARTIAL 2026-09-19**` → `KF.W12 = OPEN 2026-09-17 → **PARTIAL 2026-09-19** → **RESUME-OPEN
> 2026-09-19** (SEAT 0, third sitting: `.e` half-landed and killed, `.f` never dispatched, `.g`
> re-closes; `.a`–`.d` stand)`
>
> **event line** (appended at the file end): `- 2026-09-19 — **X.KF.W12 RESUME MODE, THIRD SITTING
> (Track B · X·KF, SEAT 0, `claude-opus-5[1m]`, VERIFY-AND-BANK — 0 product bytes).** `.a`·`.b`·`.c`·`.d`
> are `alreadyDone` (9·8·12·7 commits, four receipts) and are NEVER re-dispatched. **`.e` is a
> KILLED PARTIAL, discovered here**: four commits landed 10:08–12:44 (`5bbb7b20` N-8 routed ·
> `30efb823` RB-6 · `d0665322` D-5 · `2a0afe7a` D-23) — *after* the close seat measured zero — then
> no receipt, no `apply-css-identity.test.ts`, and **50 uncommitted insertions in
> `KeyframesStringControls.vue`** whose `parseErrorShake.setTargets` (3 in worktree · **0 at HEAD**)
> raises the suite's new `Errors 1 error`. `.f` is owed in full (0 commits; OP-1 **MET 0·0**).
> Baseline re-run for the owed gates only: **G-5 RED** (`No such file or directory` ×2) · **G-6 RED**
> (×2) · **G-7 RED** (`2 failed | 50 passed (52)` · `438 passed (440)` · `1 error`, ×2), the §0u
> ratchet **14 → 12 · 12, fallen never risen**; G-1/-2/-3 GREEN and G-4 RED cited from the close's
> banked table and re-run by `.g`. OP-4 re-measured: `dist` **2·2**, demo non-comment consumers
> **2 files** — the ROUTED arm is landed. E13: four paths swept, **0 unrowed · 0 UNREAD · 81 rows**,
> no mail dated 2026-09-19 anywhere. Dispatch `[.e ∥ .f] → [.g]`, peak 2. **The LEDGER row edit was
> WITHHELD this sitting** — Track A's uncommitted X-W9 hunk sits in the same file (numstat `2 1`,
> read twice) and a pathspec commit would sweep it.`

### What this sitting asserts, and what it refuses

**Asserts**: the four measured readings above (G-5, G-6, G-7, the ratchet), the crash-recovery
inventory, the mail census, and that `.e`'s four commits exist. **Refuses**: any verdict on whether
`.e`'s landed four are *correct* — no gate of `.e`'s has ever run, and this seat ran no product
code; that judgement is the resumed `.e`'s and then `.g`'s. It also refuses to re-grade `.a`–`.d`,
to re-open CHECK 1's register, and to write one byte of keyframes.js.

---

### KF.W12.e

**SERVED MODEL: claude-opus-5[1m]** · APPLY-UNIT, **RESUME** (third sitting, 2026-09-19).
Opened on `.c` `c82f92ea` ⊕ `.d` `ec49bbef`, at kf HEAD **`2a0afe7a`**. Closed at kf
**`c9346000`**. **E-3**: nothing above this line is amended; the resume section's figures stand as
that seat wrote them, and the one correction this unit measured is written as a reading BESIDE the
figure, never over it.

#### ACT 0 — crash-recovery, and the inherited hunk judged whole (the FIRST act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` →
`M demo/components/instrument/keyframes/KeyframesStringControls.vue` ⊕ two untracked
`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-*` letters (not product).

**Inherited path, named as the law requires**:
`demo/components/instrument/keyframes/KeyframesStringControls.vue` — **50 insertions, 4 deletions**,
a killed predecessor seat's partial work on THIS unit. It was read WHOLE before a byte moved, and
each hunk judged against §Scope 5:

| hunk | row | judgement |
|---|---|---|
| `ref="editorWellRef"` on the editor well + its comment | D-4 | **CONFORMS in target, INCOMPLETE in cure** — rewritten (below) |
| `onEditorChange` → `applyEditorChange` + a one-deep promise tail | **N-7** (§Scope 5 by name) | **CONFORMS — finished and landed unchanged** |
| `void parseErrorShake.play()` | N-7's hygiene | CONFORMS (superseded by the D-4 rewrite's own call site) |
| `presets.shake({respectReducedMotion:true})` at setup + `setTargets` in `onMounted` | D-4 ⊕ D-25 | **REWRITTEN at the root** |

**The four landed shas are SUBSTRATE — inherited and KEPT, re-done by nothing here, re-decided by
nothing here**: `5bbb7b20` (N-8, the ROUTED arm) · `30efb823` (RB-6) · `d0665322` (D-5/L-M-4/C-4) ·
`2a0afe7a` (D-23 + the emitted-selector carve). Each was read at its bytes and measured green by the
gate this unit then wrote; none was re-opened.

#### ACT 0b — the `setTargets` error: root cause, and why the cure is where it is

The resume seat handed this unit a live suite error and the instruction to cure it at the root,
never by a try/catch, a skip or a revert-and-forget. **Measured first, decided second.**

⟨cmd⟩ `grep -rn -A6 "type PresetFactory" src/` → `(options?: InputAnimationOptions) =>
CSSKeyframesAnimation<any>`; ⟨cmd⟩ `grep -rn "setTargets" src/animation/engine/` →
`src/animation/engine/animation.ts:484  setTargets(...targets: HTMLElement[])`, on the base class
every preset returns, returning `this`. `InputAnimationOptions` (`constants/types.ts:242-270`) has
**no targets member**, so *"the target passed at construction"* is not reachable through a preset
factory: `setTargets` **is** the correct seat API, it is the folder's own idiom
(`KeyframesEditor.vue:552` `presets.warpLeft().setTargets(leaving)`;
`useKeyframeBrushApply.ts:62`), and the inherited call was **type-correct and runtime-correct against
the real engine**.

**The throw came from a test double, not from the product.**
⟨cmd⟩ `sed -n '132,138p' test/demo/instrument/css-code-editor-seam.test.ts` →
`vi.mock("@kf-engine", () => ({ kfEngine: () => ({ …, presets: { shake: () => ({ play() {} }) }, … }) }))`
— a stub whose `shake()` answers an object with `play` alone, where the real factory answers a
`CSSKeyframesAnimation`. That file is **`.d`'s created row and outside this unit's writable set**, so
it is **not touched**; see §Residuals, where it is booked with its owner.

Shaping the product around a stub would be the workaround the law forbids, so the cure was chosen on
**D-4's own bytes**, and the bank states that row as TWO defects on one line
(`kf-KeyframesStringControls.md:64`): *"constructed target-less and never given targets — the
parse-error motion affordance animates zero elements, **while its construction cost (a full
`fromString` parse) is paid at every setup**."* The inherited form cured the second half and left the
first standing. **Both fall together here**: the preset is built ON the first parse failure, over the
well, and memoized for the instance's life — a session that never fails to parse never parses the
preset. That is `.e`'s own landed accounting at D-5 (`d0665322`: no glyph ⇒ no engine read, no parse,
no loop), applied to its sibling row. The `1 error` disappearing is a **consequence** of that cure,
not its motive, and the double's infidelity is **recorded, not hidden**.

#### ACT 1 — N-7, landed alone · kf **`6f5929dd`**

The inherited hunks were reduced to N-7's alone, verified by ⟨cmd⟩ `git diff --stat` → `23
insertions, 2 deletions`, and committed as one meaning. The handler was `async` off
`update:model-value`, so two edits inside one another's await window raced and the last call to
**resolve** won rather than the last edit typed — reinstating an older buffer over a newer one in the
animation AND in the store that path rewrites. It is now a queue of one, chained on the previous
run's settlement, returning that settlement as the caller's handle; the tail never rejects because
`applyEditorChange` catches every failure itself.

#### ACT 2 — D-4 / L-M-3 / C-3 ⊕ D-25, the rewrite · kf **`c5b474b8`**

`parseErrorShake` becomes a lazily-built, memoized animation behind one `shakeEditorWell()` seam
called from the catch: `presets.shake({ respectReducedMotion: true }).setTargets(well)` on first
failure only. D-25 rides with it and stops being vacuous — the bank booked D-25 INFO *because*
neither animation rendered (D-4 here, D-5 at the brush); D-5's decoy is deleted and this one now
renders, so `respectReducedMotion` on the standalone play path is live work. Same one PRM motion
KF-KE-8 gave the delete choreography and this unit gave the brush. ⟨cmd⟩
`npx vitest run --project demo test/demo/instrument/css-code-editor-seam.test.ts` →
`Tests 1 failed | 3 passed (4)` with **no `Errors` line** — `.d`'s carried **E-d1** alone, exactly as
the resume's banked table has it.

#### ACT 3 — N-8, the arm, stated · **ROUTED**

OP-4 at this unit's open, double-run: ⟨cmd⟩ `grep -c 'cssIdent' dist/keyframes.d.ts` → **2 · 2**;
⟨cmd⟩ `grep -rc 'cssIdent' demo | grep -v ':0$'` → `helpers.ts:1` · `useKeyframesState.ts:5` ·
`useKeyframesParsing.ts:1`, identical both runs. **The ROUTED arm was taken** — the library's own
published `cssIdent` is the demo's ONE derivation (`useKeyframesState.ts:24` reads it at setup scope
per KF-KE-51; `:56` is the single call), landed by the substrate commits `5bbb7b20` ⊕ `2a0afe7a`.
**No second hand-rolled derivation exists**, and none was added.

**Correction, measured (E-3 — a reading beside the resume's figure, not over it).** The resume reads
*"two non-comment consumer files"*. ⟨cmd⟩ `grep -rn 'cssIdent' demo` resolves every hit to its line:
`helpers.ts:10` and `useKeyframesParsing.ts:39` are **comments**, so the non-comment census is **ONE
file, two sites** (`useKeyframesState.ts:24` · `:56`). The clause asks `≥ 1`; the arm is unchanged;
the figure above stands as its seat wrote it.

#### ACT 4 — G-KFW12-5's artefact · kf **`5198fd68`**, amended **`c9346000`**

`test/demo/instrument/apply-css-identity.test.ts` created — four clauses, every one EXECUTED over the
real seat, the real composables and the real engine with a real target in the document. Only the
producer (`@mkbabb/glass-ui`) and the toast surface are stubbed; **`@kf-engine` deliberately is
NOT** — the one `cssIdent` route the gate is about lives behind it, and a stub of it would be the
gate reading itself (and would be the very infidelity ACT 0b found one file over).

The strings the run itself printed, pasted (full transcript at
`evidence/W12/KF-W12-e-gate-transcripts.md`):

```
[G-KFW12-5/N-8] class="keyframes-style-kfapply-Apply-Transform"
                selector="keyframes-style-kfapply-Apply-Transform"
                animation-name="keyframes-style-kfapply-Apply-Transform"
                @keyframes="keyframes-style-kfapply-Apply-Transform"
                cssIdent="keyframes-style-kfapply-Apply-Transform"
[G-KFW12-5/binds] selectorText=".keyframes-style-kfapply-Spring-Keyframes"
                  matchesTarget=true
                  @keyframes="keyframes-style-kfapply-Spring-Keyframes"
```

Clause (2) uses L-BL-2's own shipped fixture (`"Spring Keyframes"`): the space folds to `-`,
`classList.add` no longer throws, and the injected rule is read back through **CSSOM** and matched
against the element (`target.matches(rule.selectorText)` → true) — a sheet that parses but selects
nothing reds there, which is L-BL-1's whole shape. Clause (3) clicks the **ribbon's** Apply, then
moves `selectedControl` off `keyframes` and asserts class, sheet and state all come down with the
affordance. Clause (4) unmounts the sole holder while applied and asserts the PRIOR pause state is
restored (`true` before, `false` applied, `true` after) with the class stripped and the sheet gone.

**The bites — measured, not asserted.** The gate was born-RED as an absent file, so this unit proved
the clauses are not vacuous by breaking the cure twice, measuring, and reverting each probe with
`git checkout --` against that one path (no stash, no blanket restore):
(i) restoring the audited second derivation in `useKeyframesParsing.ts` → `Tests 2 failed | 2 passed
(4)`, `expected 'kfapply-apply-transform' to be 'keyframes-style-kfapply-Apply-Transfo…'`;
(ii) emptying the ribbon's RB-6 watch body → `Tests 1 failed | 3 passed (4)`.

`c9346000` names the seat's `defineExpose` surface as one `ApplySeat` contract: the first landing
read `wrapper.vm.getCSSString()` and siblings directly and `tsc -p tsconfig.test.json` answered
**TS2722 ×7** (VTU types exposed members as possibly-absent). Seven non-null assertions would have
been the masking shape; one named contract — the same surface the ribbon consumes through
`activeKeyframesRef?.clearAppliedCSS?.()` — is the honest one. **7 → 0**, suite unchanged 4/4.

#### ACT 5 — the rest of §Scope 5, row by row

| row | state | receipt |
|---|---|---|
| **N-8** (first, the lock) | LANDED (substrate `5bbb7b20` ⊕ `2a0afe7a`) | ROUTED arm; ACT 3; proven by clause (1) |
| **RB-6** | LANDED (substrate `30efb823`) | proven by clause (3), first execution ever |
| **D-2 / L-M-8** | **FOLD, not this unit's cure** | the record books it *"FOLD → banked KF-CE-36 … Identity guard — NOT re-booked"*; its rider (no dedupe `id` on this file's toasts) is **DISCHARGED at the bytes by `.d`** — `KeyframesStringControls.vue:144`/`:150` both carry `{ id: "kf-parse" }`. Zero re-booking. |
| **N-7** | LANDED this sitting | ACT 1, `6f5929dd` |
| **D-25** | LANDED this sitting | ACT 2, `c5b474b8`; one PRM motion with KF-KE-8 and the brush |
| **S-6-as-corrected** | **KEPT WHOLE** | `useApplyCSS.ts:61-62`/`:72` — `prevPaused` saved and restored, never a blind resume; clause (4) executes it |
| `:57` **N-2** | LANDED at `.c` | the refcounted sheet + one `applyStates` record per id; the mount-policy half stays banked elsewhere, not re-booked |
| `:59` **N-5 ≡ KF-KE-12** | LANDED at `.c`, **wired to its lifetimes here** | `useApplyCSS`'s `onBeforeUnmount` ⊕ the ribbon's RB-6 branch; clause (4) |
| `:65` **D-4 / L-M-3 / C-3** | LANDED this sitting | ACT 2 — **both limbs** |
| `:67` **D-5 / L-M-4 / C-4** | LANDED (substrate `d0665322`) | the optional `templateRef`; no decoy, no infinite loop |

**The killed scenario, named as killed**: the filed *"both animate the same target simultaneously"*
is **DEAD at the bank (L-BL-1)**. It is cured by no commit of this unit, witnessed by no clause, and
appears in no commit message — ⟨cmd⟩ `grep -c 'animate the same target'
test/demo/instrument/apply-css-identity.test.ts` → **1**, the docblock's single naming of it AS
killed. Only the residue was cured.

#### Gates, BEFORE → AFTER (double-run)

| gate | BEFORE (at `2a0afe7a`) | AFTER (at `c9346000`) | verdict |
|---|---|---|---|
| **G-KFW12-5** runtime | ⟨cmd⟩ `ls test/demo/instrument/apply-css-identity.test.ts` → `No such file or directory` · ×2 | ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/apply-css-identity.test.ts` → `Test Files 1 passed (1)` · `Tests 4 passed (4)` · ×2 | **GREEN** |
| **G-KFW12-5** byte clause (`≥ 1` non-comment `cssIdent` consumer) | `helpers.ts:1` (comment) ⊕ `useKeyframesState.ts:5` ⊕ `useKeyframesParsing.ts:1` · ×2 | unchanged · ×2; resolved census **1 file, 2 non-comment sites** | **GREEN** (booked **`LANDED-BY 5bbb7b20 ⊕ 2a0afe7a`**, R.2 — the byte clause was green before this sitting's cure and is **claimed by neither**; only the runtime clause is claimed) |
| **G-KFW12-5** clock clause | `grep -c 'cssIdent' dist/keyframes.d.ts` → **2 · 2** | **2 · 2** | recorded, open and close |
| **G-KFW12-5** anti-work clause | — | the killed scenario appears nowhere as this unit's work | **GREEN** |
| **§0u ratchet** (this unit's part (2)) | `vue-tsc` **12 · 12**; in-bounds rows **0** | **12 · 12**; in-bounds rows **0** | **MET — not raised, and every `.e` §B.2 row is at zero with no cast, no `@ts-expect-error`, no `eslint-disable`** |
| `tsc -p tsconfig.test.json`, this unit's file | n/a (absent) | **0** (from 7 at first landing) | GREEN |
| `eslint` over the unit's rows | — | *(no output)* | GREEN |
| masking census | — | ⟨cmd⟩ `git diff 2a0afe7a..HEAD -- test demo \| grep -c 'test.skip\|it.skip\|\.only(\|@ts-expect-error\|eslint-disable'` → **0** | GREEN |

**Not re-run here, by the resume clause**: G-KFW12-1/-2/-3/-4 are cited from the close's banked table
(`.d`'s **E-d1** still RED); **G-KFW12-6 and G-KFW12-7 are NOT this unit's** — `.f` was writing
`demo/scenes/cube/CubeAxisLines.vue` and `test/demo/scenes/cube-axis-reveal.test.ts` concurrently
throughout this sitting (⟨cmd⟩ `git status --porcelain` shows both as a sibling seat's in-flight
bytes), so a whole-suite reading taken here would measure another seat's work in motion. `.g` runs
all seven at its own clock.

#### Commits (5; every one pathspec'd on the commit itself)

| sha | repo | meaning |
|---|---|---|
| **`6f5929dd`** | kf | N-7 — the transplants land in the order they were typed |
| **`c5b474b8`** | kf | D-4/L-M-3/C-3 ⊕ D-25 — the parse-error shake has something to shake, and costs nothing until a parse fails |
| **`5198fd68`** | kf | test — G-KFW12-5, four executed clauses |
| **`c9346000`** | kf | test — the seat's exposed surface named, TS2722 ×7 → 0 |
| **`5db5d0f0`** | value.js | `evidence/W12/KF-W12-e-gate-transcripts.md` |

⊕ this receipt. Inherited-and-kept substrate (NOT re-done): `5bbb7b20` · `30efb823` · `d0665322` ·
`2a0afe7a`. Bounds: every write landed inside this unit's §B.2 rows; **zero** `src/**`, **zero**
`orbital-drag/**`, **zero** glass-ui, **zero** `node_modules`, `scripts/dev/dev.sh` never staged, and
the two sibling-dirty paths (`demo/scenes/cube/CubeAxisLines.vue`, `test/demo/scenes/cube-axis-reveal.test.ts`
— `.f`'s) never touched, never staged, never restored.

#### E13 — the four-path sweep, at this seat's own clock

| path | result |
|---|---|
| `value.js/docs/tranches/V/coordination/` | newest is the 09-18 parse-that/fourier pair; **nothing dated 2026-09-19 or -20** |
| `../glass-ui/docs/tranches/BK/coordination/` | BK still newest; newest letter 09-18 (`…-o26-reply`), already rowed |
| `../keyframes.js/docs/tranches/V/coordination/` | newest value-addressed item is `…-2026-09-17-o8-o11-amendment-addendum.md`, rowed |
| `../sci-report/atlas/docs/tranches/P/coordination/` | newest 2026-07-27; nothing new |

⟨cmd⟩ `ls <the four dirs> | grep -E '2026-09-(19|20)'` → *(no output)*. **INBOX**: ⟨cmd⟩
`grep -c '^| I-\|^| O-' INBOX.md` → **81** rows; ⟨cmd⟩ `grep -n '| UNREAD\|UNREAD |\|\*\*UNREAD\*\*'
INBOX.md` → **one hit, `:208`, inside a prose sweep line, not a status cell** — **0 rows carry UNREAD
status**, both runs. No row owed by this unit; INBOX.md is dirty with a sibling seat's bytes and was
**not written**.

#### Residuals — each with a named owner

1. **`.d`'s `@kf-engine` double is unfaithful, and it is a live trap — owner `.g` (or the next seat
   that lawfully opens `.d`'s row).** `test/demo/instrument/css-code-editor-seam.test.ts:132-138`
   stubs `presets` as `{ shake: () => ({ play() {} }) }`, where the real `PresetFactory` answers a
   `CSSKeyframesAnimation` carrying `setTargets`, `pause`, `settle`, `reset` and the rest. Any
   future seat that legitimately calls a preset method on the mount path will be told the product is
   broken when the double is. **This unit did not touch it** (out of its writable set), did not shape
   its own cure to satisfy it, and states the infidelity here so the next reader meets it as a
   finding rather than as a mystery. The faithful counter-example is this unit's own test, which
   stubs no engine at all.
2. **`.d`'s E-d1 is carried, unweakened** — `css-code-editor-seam.test.ts (2) KF-CE-1: the tokenizer
   the boot registered classifies 'a { color: red }'` still fails. Not this unit's row; no timeout
   widened, no assertion touched.
3. **The §0u floor is 12, not 0** — unchanged by this unit (**12 · 12**, in-bounds rows **0**). The
   literal zero is KF.W13's close, per §0u part (3).
4. **`tsconfig.test.json` carries 60 diagnostics repo-wide**, **0** of them in this unit's file (7 at
   first landing, cured at `c9346000`). Three of the sixty are `.f`'s in-flight
   `cube-axis-reveal.test.ts`; the rest pre-date this sitting. Not a gate of this wave; recorded so
   the close does not read the total as a regression.
5. **The LEDGER row is not written by this unit** (`.g`'s row, §B.2), and the file remains dirty with
   Track A's uncommitted X-W9 hunk — the fourth withholding the resume section documents. Nothing was
   staged, restored or unstaged.

#### Escalations

**None.** Every cure §Scope 5 specifies was reachable inside this unit's writable set. The one act
that would have required a byte outside it — repairing `.d`'s engine double — is **declined and
booked as residual 1**, not substituted and not silently worked around: the product cure was decided
on D-4's own two limbs at the bank's bytes, and the double's infidelity is published rather than
absorbed.

#### The shas `.g` opens on

keyframes.js **`c9346000`** (HEAD; **nine** commits ahead of `origin/master` `c82f92ea` — `.e`'s four
inherited plus this sitting's four kf commits, all unpushed at this unit's close) · value.js
`tranche-u`. `.f` was running concurrently and will move kf HEAD again; `.g` re-reads rather than
citing this line.

#### What this unit asserts, and what it refuses

**Asserts**: G-KFW12-5 GREEN on every limb, double-run, by execution and not by reading — the class
the press adds, the selector/`animation-name`/`@keyframes` the sheet carries, and `cssIdent`'s own
answer are one string for an uppercase-bearing id; the injected rule **matches the target element**
for a whitespace-bearing name; the applied state and the ribbon's affordance share one lifetime; and
`clear()` runs on the sole holder's unmount and restores the prior pause state. The ROUTED arm is the
arm of record. The inherited 50-insertion hunk is finished, rewritten where it was incomplete, and
named.

**Refuses**: any verdict on `.a`–`.d`, on `.f`, or on the wave's close; any whole-suite reading taken
while a sibling seat's bytes are in motion; any claim on the byte clause it found already green
(booked `LANDED-BY`); and any claim that `.d`'s test double is now correct — it is not, it is
recorded.

---

### KF.W12.f

**SERVED MODEL: claude-opus-5[1m]** · AXISLINE-UNIT, phase 3, **full dispatch — nothing
inherited** (0 commits, 0 bytes at open, exactly as the resume seat measured). Opened at kf
**`2a0afe7a`**; product cure at **`6db80df7`**, gate at **`2736b5e5`**. **E-3**: nothing above
this line is amended; every correction this unit measured is written BESIDE the figure it
corrects, never over it.

#### ACT 0 — crash-recovery (standing law, first act)

⟨cmd⟩ `git status --porcelain` in **keyframes.js** → ` M demo/components/instrument/keyframes/KeyframesStringControls.vue` + two 2026-07 untracked coordination letters. **Not one path inside this unit's writable set** — `demo/scenes/cube/CubeAxisLines.vue` and `test/demo/scenes/cube-axis-reveal.test.ts` were both clean (the second did not exist). The dirty SFC is the sibling `.e` seat's in-flight work and was **never read for judgement, never staged, never touched**. ⟨cmd⟩ the same in **value.js** → 17 modified + 8 untracked, of which the only path in my writable set is `docs/tranches/X/execution/B/KF-W12.md`, dirty with **`.e`'s own appended receipt** (numstat `272 0`, a pure end-append) — a sibling seat's bytes, handled at ACT 7 below. **Nothing inherited, nothing stashed, nothing restored.**

#### ACT 1 — OP-1, printed at **0** first, and claimed by nobody here

⟨cmd⟩ `grep -c 'useEventListener(window, "keydown"' demo/scenes/cube/orbital-drag/OrbitalDrag.vue` → **0** · **0**.

**`LANDED-BY fff7232c`** (KF.W11 `.a`, the OD latch family). This is this unit's own gate's *inbound* clause and it was green before this unit existed: **GREEN-BEFORE-CURE (R.2), booked, never claimed.** Read at the bytes rather than at the ledger: the registry adoption is live at `OrbitalDrag.vue:263-300` (`registerShortcut(code, …)` ×2 per axis over an `AXIS_KEYS` tuple, `event: "keyup"` on the release arm, labelled `group: "Cube"` so the bindings reach the shortcuts modal), with the blur/visibilitychange clears at `:302-308`. **This wave wrote no `orbital-drag/**` byte** — one cure, one home.

#### ACT 2 — the baseline, born-RED, and every anchor verified at TRUE bytes before an edit

⟨cmd⟩ `ls test/demo/scenes/cube-axis-reveal.test.ts` → `No such file or directory` · same.
⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/cube-axis-reveal.test.ts` → `No test files found, exiting with code 1` · same. **G-KFW12-6 born-RED, unmoved since the wave opened.**

| anchor the brief gave | at true bytes | disposition |
|---|---|---|
| `width: 1000vw` at `:63` | `63:    width: 1000vw;` | **EXACT** |
| `rotateZ(90deg)` at `:113` | `113:        transform: rotateZ(90deg);` | **EXACT** |
| `rotateY(90deg)` at `:117` | `117:        transform: rotateY(90deg);` | **EXACT** |
| the reveal binds `lock.x/y/z` at `:11-14` | `:12-13` / `:17-18` / `:22-23` — the `:class` **and** a `:style` per axis | **CORRECTED, and it is the KF-AX-14 row**: the brief's single binding is two, and the second is inline |
| `180ms` ×3 raw | ⟨cmd⟩ `grep -n '180ms'` → `:41` · `:81`, **both comments**, no declaration | **`LANDED-BY KF.W6`**, re-measured at open, never claimed |
| `var(--axis-active, 0)` fallbacks | ⟨cmd⟩ `grep -c` → **3** · **3** | ruling 6's count re-verified a **fourth** time; the corpus's ×4 cell stays dead |
| the frame "lives in KF.W11's `useCubeDemo.ts`" | `GRAPH_ATTITUDE` is declared at **`useCubeRelit.ts:62`** and *imported* by `useCubeDemo.ts:14` | **DRIFTED ANCHOR → INTENT at the true bytes, recorded**: the frame was read, re-derived and asserted from `useCubeRelit.ts`, READ-ONLY; neither file was edited |
| `wc -l CubeAxisLines.vue` | **120** | the §B.2 figure, unmoved at open |

#### ACT 3 — the two decisions, TAKEN AND WRITTEN BEFORE A BYTE (order 8, "the decision precedes the patch")

**KF-AX-2 — what the reveal MEANS.** The record grades this MAJOR and rules β's MINOR made
"against a third of it". Re-derived at the bytes, the row is false three ways and all three are
live: (1) the latch gates the **FIRST** branch of **both** `drag` (`useOrbitalPointer.ts:117`)
and `handleWheel` (`:155`) — six operations share it (drag-rotate/translate/roll ·
wheel-rotate/translate/scale), so *"single-axis rotation"*, written twice, named one of six;
(2) it is **ARMED, not ACTIVE** — `setAxisLatch` flips on the bare keydown with no gesture in
flight; (3) the wheel limb is the one β never reached. **DECISION**: take the DISSENT's own
reading — `lock` = *which axis the next constrained gesture is pinned to* — and pay it in
**prose, not props**. The prop stays the latch, because the latch is exactly the fact; the file
now says what the latch is and refuses the promise about rotation. **The labels limb is NOT
cured here**: the deuteranopia rider (X-red / Y-green, no text) rides **J-lane C6's ask**, and
DESIGN.md §8 OD-U9 already assigns the active-channel readout to the ruled `.stage-whisper`
(KF-AX-10) — a second encoding invented here would be a third. Written in the file at the
template docblock, so the next reader meets the decision, not the rumour.

**#57 / KF-AX-5 — the Z stroke.** **DECISION: `rotateY(90deg)` STAYS.** Derived in the settled
`rotate3d(-1,1,0,30deg)` frame the `.z` stroke reads **45.00°** at extent **0.50000/unit**,
**49.11°** clear of *both* siblings; the degeneracy the corpus graded MAJOR "source-certain" is
real at **exactly one frame** — mount t0, where `.z`'s screen extent is `0.00000` — and the PRM
arm, which snaps straight to the attitude, **never shows it at all**. The corpus's cure rider
(*a tilt would make Z lie*) is upheld as written: a tilt that kept the stroke legible at t0
would move it off the axis it names. So the cure is the **frame stamp and the prose**, not the
geometry. Banked whole at `docs/tranches/X/keyframes/evidence/W12/KF-W12-f-z-triptych.md`.

**What that triptych is**: the **derived** triptych (three frames, closed form, from the tree's
own `GRAPH_ATTITUDE`/`rotateByAttitude`), double-run and independently re-asserted by the gate
test against the live function. It is **NOT** the rendered SS-13 #1 capture, which stays
**KF.W9's** — probe parsimony §5.2, and no browser was spent. It settles all three rows SS-13 #1
was booked to decide (the KF-AX-5 residue — *exactly nothing* at t0, so both challenge
predictions, the "sub-pixel needle" and the "vertical flare", die at both frames; KF-AX-6's
comparison, source-decided per ruling 7; and the β-miss-4 coupling, whose scheduling clause
discharges because the filter gate changes what `.z` COMPOSITES, not what it PROJECTS). What
only pixels can settle is listed in that file with **KF.W9** named against each.

#### ACT 4 — the cure, row by row (22 AXISLINE-UNIT rows; `6db80df7`)

| row | sev | what landed |
|---|---|---|
| **KF-AX-1** | MAJOR | consumer half: the reveal reads the latch **the ONE registry writes**, and the file says so instead of describing a window latch that no longer exists. Proven END TO END by the gate, not by prose. Upstream half `LANDED-BY fff7232c`. |
| **KF-AX-2** | MAJOR | ACT 3's decision, written at the template docblock; the two *"single-axis rotation"* claims retired. |
| **KF-AX-4** | MAJOR | **every** geometric claim in the file and the test carries its frame; the numbers are re-derived from `GRAPH_ATTITUDE`, never restated, so a frame change **reds the gate**. |
| **KF-AX-5 · #57** | MINOR | ACT 3's decision + the triptych. |
| **KF-AX-6** | MINOR | the ill-formed `--z-behind < --z-content` citation replaced by what is true (the only `--z-content` consumer sits two stacking contexts down; within `.graph` the sole competitor declares no z-index) and by what this comment **cannot** answer — the render, SS-13 #2. `z-index` itself unchanged: the comment was the defect. |
| **KF-AX-7** | MINOR | the false *"PRM-respecting via the wrapper below"* retired; the **reliance STATED** — the guard is the vendor's universal `*:not([data-allow-motion])` rule, under which the reveal becomes a step and stays legible. Not duplicated demo-side (a local PRM block would be a producer behaviour re-implemented here). |
| **KF-AX-8** | MINOR | **driver-only** transition list, the house `--lit` idiom: `transition: --axis-active …`. The derived channels recompute from the interpolating driver instead of each easing its own copy. |
| **KF-AX-9** | MINOR | `filter` **gated** under `.axis-line--locked` — the resident pass and its three shadow buffers on a 1000vw box are gone. Ruling 8 honoured **by name**: the de-grouping benefit is **not** claimed (`opacity: 0.45` at rest is itself a grouping property), and the gate's cost — the bloom drops in one frame on release — is stated in the file rather than discovered later. |
| **KF-AX-10** | MINOR | recorded in-file: the reveal is a second encoding beside DESIGN.md §8 OD-U9's ruled `.stage-whisper`; the reconciliation is **U.B8's** when it lands. α-3's WCAG 2.1.1 limb (keyboard **and** pointer needed together) is OrbitalDrag's surface — cured upstream with KF-AX-1's adoption, not re-booked here. |
| **KF-AX-13** | MINOR | `border-block-start`: one logical edge, so the zero-height box stops painting a 2 px double stroke with two end caps. |
| **KF-AX-14** | MINOR | **the class is the sole driver** — `&.axis-line--locked { --axis-active: 1 }`, and the per-axis inline `:style` is **deleted**. The reveal is finally reachable by a media query, which is what made KF-AX-17 authorable at all. |
| **KF-AX-16** | MINOR | `lock: Pick<PressedKeys, "x" \| "y" \| "z">` sliced off the owner's type (a rename now fails the build), and the three strokes render from the owner's own `axes` tuple — the `--axis-*` namespace has a **fourth** live member (`--axis-w`, MatrixEditor), which is what made a hand-unrolled list a drift risk. |
| **KF-AX-17** | MINOR | a `@media (forced-colors: active)` block: the halo the OS cannot recolour is dropped and the surviving tells are the ones the mode keeps — stroke style and `Highlight`. The vendor's two forced-colors blocks are class- and ARIA-keyed (ruling 3) and match none of these bare divs. |
| **KF-AX-18** | MINOR | **CARRIED, NOT CURED — out of §Bounds.** The dead scoped-slot seam is `OrbitalDrag.vue:3-7`, i.e. `orbital-drag/**`, which this wave writes no byte of. Named owner below. |
| **KF-AX-19** | MINOR | **CARRIED, NOT CURED — out of §Bounds.** `changeGraphPerspectiveAnim`'s missing teardown lives in `CubeScene.vue:214-216` / `useCubeDemo.ts`. Named owner below. |
| **KF-AX-20** | INFO | `1000vw` **kept**, with the reason written: the codex charge is dead (register #10/#11) and what made the width expensive was the resident filter, now gated. |
| **KF-AX-21** | INFO | the three unreachable `, 0` fallbacks removed — the property is registered with `initial-value: 0`. |
| **KF-AX-22** | INFO | `defineOptions({ inheritAttrs: false })` — the fragment's attrs contract DECLARED, with the reason a single root is not available (CSS `perspective` reaches its own children only, so a wrapper would flatten every stroke). |
| **KF-AX-23** | INFO | `aria-hidden="true"`, matching `face-relit` at `CubeTarget.vue:85-86`; the non-visual channel named (the registry's labelled bindings in the shortcuts modal). |
| **KF-AX-28** | INFO | the four verbatim thesis restatements collapsed to **one**. Duplication was the drift mechanism that let `:44`'s claim go stale (below). |
| **KF-AX-29** | INFO | the `rotateX(0deg)` identity's reading stated: deliberate, because any non-`none` transform makes a stacking context and a containing block, and all three strokes must be on identical terms. |
| **KF-AX-30** | INFO | reactive props destructure (`const { lock } = defineProps<…>()`), §9.2's positive form. |

#### ACT 5 — the gate, BEFORE → AFTER (`2736b5e5`)

⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/cube-axis-reveal.test.ts`
**BEFORE** → `No test files found, exiting with code 1` · same.
**AFTER** → `Test Files  1 passed (1)` / `Tests  11 passed (11)` · **identical both runs**.
**G-KFW12-6: RED → GREEN.**

Three suites, 11 cases, and **no case reads its subject's source text**: the component had zero
coverage (KF-AX-16's last limb) and a grep-test would have proved only that the grep ran.

1. **the Z stroke, frame-stamped** (5 cases) — the attitude is imported, so `the stage attitude
   is re-derived, never restated` reds the day KF.W11's frame moves; the settled orientations
   (175.89° / 94.11° / 45.00°) and separations (81.79° / 49.11° / 49.11°) are asserted against
   the live `rotateByAttitude`; the mount-t0 case isolates the degeneracy to **exactly** `.z`;
   the last case fixes the PRM arm's freedom from it.
2. **the reveal on the ONE registry** (3 cases) — the **real** `OrbitalDrag` and the **real**
   `CubeAxisLines` are mounted in the CubeTarget wiring, a genuine
   `new KeyboardEvent("keydown", { code: "KeyX" })` is dispatched at `window`, and the chain
   `registerShortcut → setAxisLatch → the emit → the lit stroke` runs unmocked. Each axis key
   lights its own stroke and only its own; keyup clears it; no root carries an inline
   `--axis-active`; every root is `aria-hidden`.
3. **KF-AX-2's six operations** (3 cases) — `useOrbitalPointer` with counting stubs: the same
   drag rotates unlatched and is constrained latched, the **wheel** path reads the same latch
   (the limb β never reached), and the latch arms with every counter at zero.

Every gate clause is mapped to the case that turns it in
`evidence/W12/KF-W12-f-gate-transcripts.md`, beside OP-1's grep at 0 and the anchors above.

#### ACT 6 — commits, bounds, and one disclosed deviation from §Commit plan

| sha | message | `git show --stat` |
|---|---|---|
| `6db80df7` | `fix(kf/axis · X.KF.W12.f · AXISLINE-UNIT — the reveal made honest, frame-stamped)` | `demo/scenes/cube/CubeAxisLines.vue` **only** — 185 insertions, 80 deletions |
| `2736b5e5` | `test(kf/axis · X.KF.W12.f · G-KFW12-6 — cube-axis-reveal, 11 cases, born-RED cured)` | `test/demo/scenes/cube-axis-reveal.test.ts` **only** — 290 insertions |

Both pathspec'd **on the commit itself**; no sibling seat's path appears in either, and the
`KeyframesStringControls.vue` hunk that was dirty at ACT 0 is in neither. `dev.sh`: **0**.
`src/**`: **0**. `orbital-drag/**`: **0**. `node_modules/**`: **0**. glass-ui: **0** (its
`a11y-overrides.css` / `accessibility.css` / `keyboard.js` were **read** to quote the guard and
the two forced-colors keyings, never edited). Both paths are §B.2 rows of `.f`.

**DISCLOSED DEVIATION.** §Commit plan expects five `.f` commits (`KF-AX-1` · `KF-AX-2` · `#57` ·
`roster` · `test`); **two** landed. The reason is a property of this file, not a convenience:
KF-AX-28 is *"collapse the four verbatim thesis restatements"*, and those four restatements are
exactly the sites the other rows' comments live in — a per-row commit series would have had each
commit edit the same four blocks and the collapse would have had to be un-done and re-done four
times. KF-AX-14 compounds it: deleting the inline `:style` (template) and adding
`--axis-active: 1` (style block) is **one** mechanism that cannot be halved without shipping a
reveal that does not light. The five meanings are therefore **one** meaning at these bytes, and
the commit message enumerates all 22 rows so the close's roster audit resolves every id. **No
family was split**; nothing was squashed after the fact; no history was reconstructed.

#### ACT 7 — the readings this unit moved, and the ones it did not

| measure | reading | note |
|---|---|---|
| **G-KFW12-6** | `No test files found` → **11 passed (11)** ×2 | **RED → GREEN** |
| `npm run test:demo` | `2 failed \| 52 passed (54)` / `453 passed (455)` ×2 | was `2 failed \| 50 passed (52)` / `438 passed (440)` **+ `Errors 1 error`** at the resume. The **`Errors` line is GONE** — the `.e` seat cured its own inherited hunk; **not this unit's claim.** The two failures are the two the resume named: `css-code-editor-seam.test.ts (2) KF-CE-1` (`.d`'s **E-d1**) and `spring-trace-truth.test.ts (4b)` (**KF.W11's inherited honest-RED**). |
| `vue-tsc … grep -c 'error TS'` | **12** · **12** | the §0u ratchet's banked floor, **unmoved — neither risen nor fallen**. Filtered for this unit's two files: **no output**; neither contributes an error. |
| `eslint` on both paths | *(no output)*, exit **0** | |

**Nothing was skipped, cast, guarded, allow-listed or timed-out** to reach any reading above:
zero `test.skip` / `it.skip` / `.only`, zero `@ts-ignore` / `@ts-expect-error` /
`eslint-disable`, zero `as any`, zero `try/catch`, and no existing witness was modified or
weakened. `value4-editor-boundary.test.ts` is not in this unit's diff.

#### GREEN-BEFORE-CURE (R.2) — two, both booked, **neither claimed**

1. **G-KFW12-6's inbound clause — `LANDED-BY fff7232c`** (KF.W11 `.a`): window-keydown **0 · 0**.
2. **KF-AX-9's three raw `180ms` token rider — `LANDED-BY KF.W6`**: `:41` / `:81`, both comments.

#### A THIRD reading, booked beside its owner's row and NOT claimed

`CubeAxisLines.vue:44` asserted that `--axis-x/-y/-z` are *"three theme-INVARIANT `:root`
literals"*. Re-measured 2026-09-19: **two of the three no longer are** — `--axis-y` and
`--axis-z` took `light-dark()` arms at **KF.W6 (`0bd0215b`)**, `style.css:147-148`; `--axis-x`
(`:146`) is still a single literal. **KF-AX-3 stays KF.W6's row**, its landed half is **not**
claimed here and its open half is not cured here; only the false sentence — in *this* unit's
file, under the law that a comment is part of the defect surface — was retired, with the
measurement written beside it. This is exactly the drift KF-AX-28's four restatements produced.

#### Residuals — each with a named owner

| # | residual | owner |
|---|---|---|
| **f-1** | **KF-AX-18** — the dead scoped-slot seam (`OrbitalDrag.vue:3-7`; the parent consumes the `@pressedKeys` emit, so the `:pressed-keys` slot prop is unreachable for its stated use) | **`orbital-drag/**`'s owner (KF.W11 `.a`'s home)** — out of this wave's §Bounds by the same one-cure-one-home dedupe that sent KF-AX-1's upstream half there |
| **f-2** | **KF-AX-19** — the scene's one engine animation has no teardown; re-anchored at true bytes: `CubeScene.vue:229-231` stops **only** `animationGroup` (the record's `:214-216` has drifted) | **the cube scene's owner** — `CubeScene.vue` / `useCubeDemo.ts` are outside this unit's writable set |
| **f-3** | SS-13 **#1 · #2 · #3 · #4 · #6 · #8** — the rendered witnesses; #1 must be shot **before and after** the filter gate, which landed at `6db80df7` | **KF.W9** |
| **f-4** | KF-AX-9's release asymmetry — the bloom now drops in one frame on unlock (a filter declaration cannot interpolate out of existence). Stated in-file; if SS-13 #8 finds it reads as a glitch, the reprice is a fade on the driver, not an ungated filter | **KF.W9 → a successor** |
| **f-5** | KF-AX-3's open half (`--axis-x`'s missing dark arm) | **KF.W6** |
| **f-6** | KF-AX-2's deuteranopia labels limb; KF-AX-10's two-encoding reconciliation | **J-lane C6** · **U.B8** |

#### Escalations

**NONE.** No §Bounds expansion was needed, no specified cure was impossible at the bytes, and no
diagnostic loop reached three. The two out-of-bounds rows (f-1, f-2) are **carried with owners**,
not escalated: the spec's §Bounds names `orbital-drag/**` as another wave's and this unit obeyed
it rather than asking to widen.

#### What this receipt asserts, and what it refuses

**Asserts**: the readings above, each double-run at this seat's own clock and read from settled
bytes; that G-KFW12-6 is GREEN on every clause; that the 22 AXISLINE-UNIT rows are each LANDED,
CARRIED-with-owner or booked LANDED-BY another wave, with none silently dropped; and the two
decisions of ACT 3 as decisions, taken before the bytes and written where the next reader meets
them. **Refuses**: any verdict on `.a`–`.e`, on CHECK 1's register, or on whether the wave may
leave `PARTIAL` — those are `.g`'s; any claim on the rendered SS-13 witnesses, which no
derivation can discharge; and any claim to KF.W11's latch adoption, KF.W6's duration rung or
KF.W6's two landed `light-dark()` arms, all three of which this unit measured and none of which
it wrote.

---

## Close — second sitting

SERVED MODEL: claude-opus-5[1m]

**Seat**: KF.W12.g — **RE-CLOSE** (phase 4, serial, last; third sitting). **VERIFY-ONLY — this seat
cured nothing, wrote ZERO keyframes.js bytes, ZERO glass-ui bytes and ZERO product bytes anywhere.**
**Date** 2026-09-19; **sitting of record 2026-09-17** (the owner's begin-word, COHESION §0j).
**E-3**: `## Close` (`:1320`), `## Check 1` (`:1652`), the resume section and the `.e`/`.f` receipts
are IMMUTABLE. This block is a dated close BESIDE them; it rewrites nothing, amends nothing, and
every correction it measures is written beside the figure it corrects, never over it.

**Substrate, named, never assumed**: keyframes.js `/Users/mkbabb/Programming/keyframes.js` —
⟨cmd⟩ `git rev-parse --short HEAD` → **`2736b5e5`**; ⟨cmd⟩ `git rev-parse --short origin/master` →
`c82f92ea` at this seat's open (**10 unpublished**: `.e`'s eight and `.f`'s two) → **`2736b5e5`**
after ACT 9's push. value.js `tranche-u`. **SHARED INDEX DISCLOSED**: sibling Track-A/C/D seats hold
28 dirty product and doc rows in this same checkout throughout; every commit below carries its own
pathspec **on the commit itself**, and nothing of a sibling's was staged, reset or unstaged.

**VERDICT: CLOSED — honest-RED on G-KFW12-4 and G-KFW12-7.** Phase 3 landed. **All six product
units have now run**; **five of seven gates are GREEN at this seat's own double-run commands**
(G-1 · G-2 · G-3 · G-5 · G-6), and the two REDs are the two the formation already has heads for.
**CHECK 1's BLOCKER-1 is discharged by landing, not by argument; its HIGH-1 is discharged by this
seat's own act** (ACT 7). No RED is masked, weakened or re-described.

### ACT 0 — crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**, both
2026-07 `VALUEJS-INBOUND-*` coordination letters value.js authored — not product, outside every
KF.W12 path, untouched. **The `KeyframesStringControls.vue` modification the resume section handed
`.e` is GONE**: `.e` committed it (ACT 1/ACT 2 of its receipt, `6f5929dd` ⊕ `c5b474b8`), so the
worktree carries **zero modified product paths**. Verified, not assumed.

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain -- docs/tranches/X/execution/B/KF-W12.md
docs/tranches/X/execution/LEDGER.md docs/tranches/V/coordination/INBOX.md docs/tranches/X/COHESION.md
docs/tranches/X/keyframes/evidence/W12/` → ***(no output)***. **Every path in this seat's writable
set is CLEAN — zero inherited hunks, nothing finished, nothing rewritten, nothing stashed, nothing
restored.** The 28 dirty rows elsewhere in the checkout (Track A's `execution/A/X-W5.md`, Track B's
sibling `execution/B/KF-W13.md`, `V/reformation/CARRY-LEDGER.md`, the `demo/**`/`src/**`/`test/**`
rows of other tracks, and `scripts/dev/dev.sh` — **unowned, never staged, never touched**) belong to
sibling seats and were not read for judgement.

**`LEDGER.md` IS CLEAN AT THIS SEAT'S CLOCK.** The resume section withheld its row edit because
Track A's uncommitted X-W9 hunk sat in the file (numstat `2 1`, read twice). That hunk is committed;
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/LEDGER.md` → *(no output)*, twice. **The
fourth withholding is therefore DISCHARGED, not carried** — the banked text lands at ACT 11.

### ACT 1 — the FULL commit roster, audited to §Bounds

⟨cmd⟩ `git rev-list --count bf4a9a9c..HEAD` → **46**. SELF-COUNT by unit
(⟨cmd⟩ `git log bf4a9a9c..HEAD --format='%s' | grep -c 'X.KF.W12.<u>'`): **`.a` 9 · `.b` 8 · `.c` 12
· `.d` 7 · `.e` 8 · `.f` 2 · `.g` 0 = 46 ✓**. The close of record's 36 stand unchanged; the ten new
are phase 3's.

| unit | n | shas (oldest → newest) | bounds verdict (`git show --stat` each) |
|---|---|---|---|
| **`.a`** CARD | 9 | as `## Close` ACT 1 lists them, `e5235ca0` … `ed96f2b0` | **CLEAN**, re-verified |
| **`.b`** OPTIONS | 8 | `98675047` … `2cd314af` | **CLEAN**, re-verified (the `EasingSidebar.vue` carve read at ACT 8 / MINOR-4) |
| **`.c`** KFED | 12 | `1b29fb22` … `c82f92ea` | **CLEAN**, re-verified |
| **`.d`** EDITOR | 7 | `7cda421c` … `ec49bbef` | **CLEAN**, re-verified (`helpers.ts` ALONE at `ccda20c7`) |
| **`.e`** APPLY | **8** | `5bbb7b20` · `30efb823` · `d0665322` · `2a0afe7a` (the four inherited-and-kept) ⊕ `6f5929dd` · `c5b474b8` · `5198fd68` · `c9346000` | **CLEAN with ONE DISCLOSED CROSS-UNIT WRITE** — see below |
| **`.f`** AXISLINE | **2** | `6db80df7` · `2736b5e5` | **CLEAN** — `CubeAxisLines.vue` alone, then `cube-axis-reveal.test.ts` alone |

**The whole touched-path set, enumerated** — ⟨cmd⟩ `git log bf4a9a9c..HEAD --name-only --format='' |
sort -u` → **30 paths** (the close's 26 ⊕ `useKeyframesParsing.ts` · `apply-css-identity.test.ts` ·
`CubeAxisLines.vue` · `cube-axis-reveal.test.ts`), **every one a §B.2 row**.

**Wave-invalidating bounds, each measured EMPTY over all 46** (⟨cmd⟩ the enumerated path list piped
through `grep -c` per pattern): `src/**` **0** · `demo/scenes/cube/orbital-drag/**` **0** ·
`node_modules/**` **0** · `package.json` **0** · `vitest.config.ts` **0** · every glass-ui tree **0**
· `instrument/timeline/**` **0** · `components/playback/**` **0** · `TransportDock*` **0** ·
`demo/app/**` **0** · `instrument/shell/**` **0** · `PlaybackRibbon.vue` **0** ·
`monaco-themes/**` **0** (arm (b) taken; E-d2 owes them) · **`scripts/dev/dev.sh` in 0 of 46**.

**DISCLOSED — one in-wave cross-unit write, found by this audit and named rather than smoothed.**
`2a0afe7a` (an `.e` commit, one of the four the killed seat landed before the resume) touches
`demo/components/instrument/keyframes/composables/useKeyframesEditor.ts` — a **§B.2 row, but assigned
to `.c`**, not one of the eight `§Disjointness` serial shares. Read at the bytes: ⟨cmd⟩
`git show 2a0afe7a --stat -- …/useKeyframesEditor.ts` → **3 insertions, 2 deletions** — the barrel's
`getTmpAnimationName:` re-export line deleted and the docblock that describes the barrel's surface
updated to say why. It is **not** a bounds expansion of the wave (the path is a §B.2 row), **not**
wave-invalidating (none of §Scope's five triumvirate bounds), and **not** a collision (`.c` closed at
`c82f92ea`, hours before `2a0afe7a` at 12:44; no seat held the file). It is the inseparable tail of
D-23, which the commit itself states is *"one row, landed whole"*: deleting an accessor and leaving
its barrel re-export standing does not compile. **Recorded as a deviation from the §B.2 unit
assignment, disclosed on the record rather than left for a challenge pass to discover.**

**value.js** — ⟨cmd⟩ `git log --oneline --format='%h %s' -- docs/tranches/X/execution/B/KF-W12.md
docs/tranches/X/keyframes/evidence/W12/` → **16 commits**, oldest → newest: `beacd880` (open attempt)
· `a9c1a6fd` (open) · `9976852f` (.a) · `c8d4c2ac` + `9615a004` (.b) · `88655c02` + `ec334c53` +
`2b8b13c9` (.c) · `e52c2f2c` + `04cf44d4` (.d) · **`6f878106`** (the close of record) · **`57afb188`**
(CHECK 1) · **`6afffdab`** (the resume) · **`5db5d0f0`** + **`46eb4ea5`** (`.e`) · **`3464a1c9`**
(`.f`) ⊕ this block's below. Every one pathspec-bounded to `execution/B/KF-W12.md`,
`keyframes/evidence/W12/**`, `LEDGER.md`, `COHESION.md` or `V/coordination/INBOX.md`. **No sibling
path rode any commit in either repo.**

### ACT 2 — all SEVEN gates, RE-RUN at this seat's own clock, double-run

Per the re-close brief, **G-1..G-4 are RE-RUN here, not cited**. All commands from
`/Users/mkbabb/Programming/keyframes.js`. BEFORE = the wave's born-RED baseline at `bf4a9a9c`.
SELF-COUNT: ⟨cmd⟩ `grep -c '^\*\*G-KFW12-' keyframes/waves/KF-W12.md` → **7**; seven rows.

| gate | BEFORE (`bf4a9a9c`) | AFTER (this seat, run 1 · run 2) | verdict |
|---|---|---|---|
| **G-KFW12-1** CARD | `No test files found` | **`Test Files 1 passed (1)` / `Tests 9 passed (9)`** · same | **GREEN** |
| **G-KFW12-2** OPTIONS | `No test files found` | **`Test Files 1 passed (1)` / `Tests 5 passed (5)`** · same | **GREEN** |
| **G-KFW12-3** KFED | `No test files found` | **`Test Files 1 passed (1)` / `Tests 7 passed (7)`** · same | **GREEN** |
| **G-KFW12-4** EDITOR | `No test files found` | **`Test Files 1 failed (1)` / `Tests 1 failed \| 3 passed (4)`** · same | **RED — one limb of four; E-d1, honest-RED** |
| **G-KFW12-5** APPLY | `No test files found` | **`Test Files 1 passed (1)` / `Tests 4 passed (4)`** · same | **GREEN — RED→GREEN, `.e`** |
| **G-KFW12-6** AXISLINE | `No test files found` | **`Test Files 1 passed (1)` / `Tests 11 passed (11)`** · same | **GREEN — RED→GREEN, `.f`** |
| **G-KFW12-7** close | RED by construction | **RED on two limbs** (ACT 3) | **RED — honest** |

**The six `create` files, proven at the bytes** — ⟨cmd⟩ `ls <path>` ×6 → **all six EXIST**. The
close of record's two `No such file or directory` readings (`apply-css-identity.test.ts`,
`cube-axis-reveal.test.ts`) are cured at the bytes, not re-described: they are `5198fd68` and
`2736b5e5`. **The absence that caused G-5's and G-6's born-RED is gone.**

**The one failing case of G-KFW12-4, named rather than summarised**: `(2) KF-CE-1: the tokenizer the
boot registered classifies 'a { color: red }'` — `.d`'s **E-d1**, the arm's five-line ambient
declaration for monaco's untyped `basic-languages/css/css.js`, whose only lawful home
(⟨cmd⟩ `find demo -name '*.d.ts' -maxdepth 2` → **`demo/env.d.ts`, the only one**) is not a §B.2 row.
Cases (1) Tab-not-swallowed, (3) the cancelled stale emit and (4) the loud format failure are
**GREEN**. Nothing was substituted, cast, guarded or allow-listed to reach that 3.

**Byte clauses — eleven, every one re-measured double at this seat, BEFORE → AFTER:**

| clause | gate | BEFORE | AFTER (run 1 · run 2) | must read | verdict |
|---|---|---|---|---|---|
| `grep -c 'frame.start.value = starts' KeyframesEditor.vue` | G-1 | 1 | **0 · 0** | 0 | **GREEN** |
| `grep -rc ':is-open' channel-controls \| grep -v ':0$'` | G-2 | 4 (3+1) | **nothing · nothing** | nothing | **GREEN** |
| `grep -c '@update:checked' LayerConfigPanel.vue` | G-2 | 1 | **0 · 0** | 0 | **GREEN** |
| `grep -c 'parseCssScalar' KeyframesEditor.vue` | G-3 | 2 | **0 · 0** | 0 | **GREEN** |
| `grep -c 'class="absolute top-2 right-4' KeyframeCard.vue` | G-3 | 1 | **0 · 0** | 0 | **GREEN** |
| `grep -c 'toLowerCase()' useKeyframesState.ts` | G-3 | 1 | **0 · 0** | 0 | **GREEN** |
| `grep -c 'tabFocusMode' CSSCodeEditor.vue` | G-4 | 0 | **2 · 2** | ≥ 1 | **GREEN** |
| `grep -c 'isFormatting' KeyframesStringControls.vue` | G-4 | 4 | **6 · 6** | recorded | recorded |
| `grep -c 'cssIdent' dist/keyframes.d.ts` (clock) | G-5 | 2 | **2 · 2** | printed | printed |
| `grep -rc 'cssIdent' demo` — **non-comment** consumers | G-5 | 0 (1 comment) | **1 file, 2 sites** · same | ≥ 1 | **GREEN — RED→GREEN** |
| `grep -c 'useEventListener(window, "keydown"' OrbitalDrag.vue` | G-6 | 1 | **0 · 0** | 0 | **GREEN (LANDED-BY KF.W11 `.a` `fff7232c`)** |

**The `cssIdent` census resolved line by line at this seat, so the figure cannot be read loosely** —
⟨cmd⟩ `grep -rn 'cssIdent' demo` → **7 hits in 3 files**: `helpers.ts:10` (comment) ·
`useKeyframesState.ts:18`/`:31`/`:39` (comments) · **`useKeyframesState.ts:24`** (`const { cssIdent }
= kfEngine()`) · **`:56`** (`cssIdent(\`keyframes-style-${animationUUID}\`)`) ·
`useKeyframesParsing.ts:39` (comment). **ONE consumer file, TWO non-comment sites.** This reproduces
`.e`'s ACT 3 correction exactly and stands beside — never over — the resume section's looser *"two
non-comment consumer files"*.

**Order and lock clauses, ALL SIX re-derived at this seat from `git log --reverse` and
`git show --stat`, never from prose:**

- **G-1 order clause (KC-34, OP-3)** — `e5235ca0` (KC-34 highlight) **precedes** `5b80d54c` (KC-8/KC-9
  keep-mounted) in `git log --reverse`. **GREEN.**
- **G-2 lock clause** — ⟨cmd⟩ `git show --stat 98675047` → `ChannelOptions.vue` ·
  `LayerConfigPanel.vue` · **`ControlsPaneWrapper.vue`** (3 files, 101+/15−). LP-1's render edge is
  in the SAME commit as the capability restorations. **GREEN.**
- **G-2 order clause** — five steps, five commits, in sequence: `98675047` STEP 1 → `ebbc8259`
  STEP 2 → `fcafcff8` STEP 3 → `0e31d417` STEP 4 → `b67dae6f` STEP 5. **GREEN.**
- **`.d`'s KF-CE-3-first lock** — ⟨cmd⟩ `git log --reverse … | grep 'X.KF.W12.d' | head -1` →
  `7cda421c` KF-CE-3. **GREEN.**
- **`.a`'s KC-2 ≡ KF-KE-2 MUST-NOT-SPLIT** — one commit `dec084a8`, ⟨cmd⟩ `git show --stat` →
  `KeyframesEditor.vue` **alone** (1 file). **GREEN.**
- **`.d`'s "`debounce` lands ALONE"** — `ccda20c7`, ⟨cmd⟩ `git show --stat` → `demo/utils/helpers.ts`
  **alone** (1 file). **GREEN.**

**G-5's anti-work clause** — the killed *"both animate the same target simultaneously"* scenario:
⟨cmd⟩ `grep -c 'animate the same target' test/demo/instrument/apply-css-identity.test.ts` → **1**,
the docblock's single naming of it **AS killed**. It is cured by no commit, witnessed by no clause,
and appears in no commit message. **GREEN.**

### ACT 3 — G-KFW12-7, limb by limb, at this seat's own clock

| limb | reading (double-run) | verdict |
|---|---|---|
| `npm run test:demo` — every `test/demo/**` passes | **`Test Files 2 failed \| 52 passed (54)` / `Tests 2 failed \| 453 passed (455)`** · identical both runs, **and NO `Errors` line** | **RED** on the two named below |
| `git diff bf4a9a9c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` → 0 | literal **1**; the single hit is a **docblock prose line** forbidding the practice. Disambiguated: ⟨cmd⟩ `git diff … \| grep '^+' \| grep -E '(test\|it\|describe)\.(skip\|only)\('` → *(no output)*; ⟨cmd⟩ `grep -rnE '(test\|it\|describe)\.(skip\|only)\(' test/` → *(no output)* **tree-wide** | **GREEN (0 real)** |
| `git log bf4a9a9c..HEAD --format=%B \| grep -c 'KF-APP-41\|C-22'` → 0 | literal **5**; every hit is `C-22` inside `KF-KC-22`/`KC-22`, CARD-UNIT's own ids. Disambiguated word-bounded: ⟨cmd⟩ `… \| grep -cE '(^\|[^A-Z-])C-22'` → **0**; ⟨cmd⟩ `… \| grep -c 'KF-APP-41'` → **0** | **GREEN (0 real)** |
| `grep -c 'DISCHARGED by KF.W7 SWAP verdict' execution/B/KF-W12.md` → 0 | **3 · 3** before this block: `:430` (the `.g` plan block quoting its own gate command) · `:1474` (the close's clause row) · `:1823` (CHECK 1's INFO-5 row). **All three are gate quotations or citations of the clause; ZERO are receipts.** Read by position, never by count — and this block's own reporting of the clause raises it again, the third seat to meet the same self-counting pathology and the third to disclose it at the append | **GREEN (0 real)** |
| `npx vue-tsc … \| grep -c 'error TS'` → 0 | **12 · 12** | **RED under the literal clause; RELIEVED under COHESION §0u part (3) — ACT 4** |
| the seven producer rows appear as SS-6 relay rows with their date | **ELEVEN rows appended at ACT 7** (`.b` 7 · `.d` 2 · `.a` 2); four of the spec's seven *predicted names* were surfaced by **no unit** — named as NOT-SURFACED, never invented | **PARTLY GREEN — the relay is SENT; the literal "seven" is answered with a measurement, ACT 7** |
| zero demo-side producer workarounds in the diff | scoped-style override **0** · re-implemented primitive **0** · copied producer selector **0** · `node_modules` patch **0** | **GREEN** |
| every id in §Carry reads LANDED / KILLED-with-rationale / carried | **all six UNITs rostered per id** — U1/U2/U3/U4 at `:786`/`:1176`/`:1250` + their receipts, **U5 at `.e`'s ACT 5 (10 rows)**, **U6 at `.f`'s ACT 4 (22 rows)** — ACT 6 | **GREEN — RED→GREEN** |
| `value4-editor-boundary.test.ts`'s timeout NOT widened | ⟨cmd⟩ `git diff bf4a9a9c..HEAD -- test/demo/instrument/value4-editor-boundary.test.ts \| wc -l` → **0** — the file is not in the diff at all, over all 46 commits | **GREEN** |

**The two `test:demo` failures, each named and owned** — neither masked, neither curable by weakening:
1. `test/demo/instrument/css-code-editor-seam.test.ts > (2) KF-CE-1` — **`.d`'s E-d1**, this wave's,
   escalated at its root (an ambient declaration outside every §B.2 row; owner at R-3).
2. `test/demo/scenes/spring-trace-truth.test.ts > (4b)` — **KF.W11's carried honest-RED**
   (ESCALATION KF11-E(j1) / j-R5), **outside every KF.W12 §B.2 row**, untouched and unweakened by
   all 46 commits.

**The denominator moved and the movement is accounted**: `48 → 52 → 54` test files and
`415 → 440 → 455` tests across the wave — **exactly the six created gate files**, the spec's own
arithmetic, now met by six and not by four. **The `Errors 1 error` line the resume section measured
is GONE** — `.e` finished its own inherited hunk at `c5b474b8`; this seat measured its absence and
claims none of the cure.

### ACT 4 — the §0u ratchet, read against the banked floor

⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **12 · 12**.
**Banked floor at the close of record: 14. Read at the resume: 12. Read here: 12. THE RATCHET HAS
FALLEN 24 → 14 → 12 AND HAS NEVER RISEN.** Decomposition (⟨cmd⟩ `… | sed 's/(.*//' | sort | uniq -c
| sort -rn`; SELF-COUNT 3+2+2+1+1+1+1+1 = **12 ✓**; by code ⟨cmd⟩ `… | grep -o 'error TS[0-9]*' |
sort | uniq -c` → `5 TS6133 · 3 TS2322 · 2 TS2339 · 1 TS2345 · 1 TS2379` = **12 ✓**):

| file | n | owner |
|---|---|---|
| `demo/components/instrument/transport/TransportDock.vue` | 3 | **KF.W13** |
| `demo/scenes/easing/useEasingDemo.ts` | 2 | **KF11-E3** (routed at COHESION §0ad) |
| `demo/app/dock/MbabbMenu.vue` | 2 | **KF.W13** |
| `src/animation/{group/composite/compositor,group/waapi,physics/smooth}.ts` | 3 | **KF11-E2** (routed at §0ad; `src/**` is out of every KF.W12 bound) |
| `demo/components/instrument/shell/EditorShell.vue` | 1 | **KF11-E4** (routed at §0ad) |
| **`demo/components/instrument/keyframes/composables/useKeyframeOps.ts`** | **1** | **E-c1** — root `keyframes/utils/parseAnimationCSS.ts:9`, verified **NOT** a §B.2 row |

**KF.W12's in-bounds §0u residue is now ONE, and it is the relieved one.** The close of record
delivered 13 → 3; this close reads **13 → 1**. The two that fell are `KeyframesStringControls.vue`'s
TS6133 pair, and they fell exactly as §0u part (2) requires — **WITH the cure that owns them**
(`.e`'s `2a0afe7a`, D-23: the second name for the one name deleted), never by a cast. ⟨cmd⟩
`npx vue-tsc … | grep 'KeyframesStringControls'` → *(no output)*. **CHECK 1's MINOR-3 is DISCHARGED
at the bytes**, including its own words — *"the type-level shadow of KF-KE-4's unrouted half"* — the
half is routed and the shadow is gone.

**No cast, no `@ts-expect-error`, no `// eslint-disable` was written as a cure anywhere in the
window.** ⟨cmd⟩ `git diff bf4a9a9c..HEAD -- demo test | grep '^+' | grep -E
'ts-ignore|ts-expect-error|eslint-disable|as any|@ts-nocheck'` → **one hit, and it is prose
forbidding the practice**: `+// narrow against the engine's own tuples (no \`as any\` — N-15).`
Disambiguated by reading, not by count. **Zero suppressions, zero `as any`, in 46 commits.**
The literal zero is KF.W13's close (§0u part (3)); this citation is the ruling's, not this seat's
relief.

### ACT 5 — §Verification artefacts, run as written

- ⟨cmd⟩ `npm run check` → **exit 2 at leg 1** on the same **12** (the roster above verbatim); legs 2
  and 3 not reached. Recorded, not re-described.
- ⟨cmd⟩ `npm run test:demo` → **`2 failed | 52 passed (54)` / `2 failed | 453 passed (455)`**, twice,
  no `Errors` line.
- ⟨cmd⟩ `npx eslint demo/components/instrument demo/scenes/cube/CubeAxisLines.vue demo/utils/helpers.ts`
  → **7 problems (7 errors, 0 warnings)** — **UNMOVED from the close of record's 7**, and `.f`'s file
  contributes **0**: `vue/no-mutating-props` ×3 on `TimingFunctionPanel.vue` (`:151` · `:152` ·
  `:156`), ×3 on `ControlsPaneWrapper.vue` (`:62` · `:328` · `:366`), `vue/valid-v-for` ×1 on
  `TransportDock.vue:124` (a KF.W13 file, out of bounds here). **Phase 3 introduced none.** Booked as
  `.b`'s declared CARRIED residual (KF-CO-45).
- ⟨cmd⟩ `git diff --check bf4a9a9c..HEAD` → *(no output)*. **CLEAN over all 46.**
- **Artefacts on disk** — ⟨cmd⟩ `ls docs/tranches/X/keyframes/evidence/W12/` → **12 files** (the
  close of record's 9 ⊕ **`KF-W12-e-gate-transcripts.md`** ⊕ **`KF-W12-f-gate-transcripts.md`** ⊕
  **`KF-W12-f-z-triptych.md`**). **The two the close booked ABSENT are present**: `.e`'s apply route
  evidence with OP-4's greps, and `.f`'s Z triptych with OP-1's grep-at-0. §B.2's `evidence/W12/**`
  row is fully spent.

### ACT 6 — §Carry, read to the end: every id LANDED / KILLED-with-rationale / carried

The close of record read this limb RED because *"U5 (APPLY) and U6 (AXISLINE) are entirely
unspent"*. Both are now spent, and this seat resolves all six rosters at their headings rather than
transcribing them (the ids are the records', for life; M-25 forbids transcription):

| §Carry unit | roster of record | reading |
|---|---|---|
| **U1 · CARD (`.a`)** | `#### Rows LANDED — SELF-COUNT 27` ⊕ `#### Rows measured and NOT spent — each named for its owner` (`.a`'s receipt) | **COMPLETE** — 27 LANDED; seven unspent named with owners (R-9); KC-12's behavioural half DECLINED WITH REASON; KC-13 → KF.W4 |
| **U2 · OPTIONS (`.b`)** | `#### Roster — per id` `:786` | **COMPLETE** — the five steps + KF-TFP-1 ≡ KF-ES-12 + D-B1 + KF-CO-15's options half + the KF-CO-47 decision written; KF-CO-7 → KF.W4 |
| **U3 · KFED (`.c`)** | `#### Per-id roster` `:1250` | **COMPLETE** — open ids carried at R-9; KF-KE-2 → U1, KF-KE-14 → KF.W4, EE-03 guard-only, each stated as a dedupe not a drop |
| **U4 · EDITOR (`.d`)** | `#### Roster — per id (U4's list; ids for life)` `:1176` | **COMPLETE** — carried KF-CE-38/-40/-43/-45/-48 named; KF-CE-16 → KF.W4; E-d1/E-d2 escalated with owners |
| **U5 · APPLY (`.e`)** | `#### ACT 5 — the rest of §Scope 5, row by row` | **COMPLETE — NEW** — 10 rows: N-8 · RB-6 · D-2/L-M-8 (FOLD, not re-booked) · N-7 · D-25 · S-6-as-corrected KEPT · `:57` N-2 · `:59` N-5 ≡ KF-KE-12 · `:65` D-4/L-M-3/C-3 · `:67` D-5/L-M-4/C-4; **the killed scenario named as killed** |
| **U6 · AXISLINE (`.f`)** | `#### ACT 4 — the cure, row by row (22 AXISLINE-UNIT rows)` | **COMPLETE — NEW** — 22 of 22: 20 LANDED, **KF-AX-18 and KF-AX-19 CARRIED-with-owner** (both root in `orbital-drag/**` / `CubeScene.vue`, out of §Bounds by the spec's own one-cure-one-home dedupe), KF-AX-9's `180ms` rider booked `LANDED-BY KF.W6` and never claimed |

**SELF-COUNT of the §Carry denominators**: U6's roster is the spec's own ⟨cmd⟩ `grep '^| KF-AX'
kf-CubeAxisLines.md | grep -c AXISLINE` → **22**, and `.f` answers 22. **GREEN.**

**Zero re-bookings, stated positively**: ⟨cmd⟩ over all 46 commit messages → `KF-APP-41` **0**,
kf-EditorShell `C-22` **0** (word-bounded). `KF-AX-18`/`-19` are **carried with named owners, not
adopted**; `D-2/L-M-8` is a FOLD by reference at its banked id; the `.e` receipt states *"Zero
re-booking"* on its own row.

### ACT 7 — the SS-6 producer relay, SENT (CHECK 1's HIGH-1, discharged by act)

CHECK 1 graded the deferral HIGH: *"§B.2 grants `.g` write access to `INBOX.md` and the SS-6
accretion register; nine producer rows stand collected and written down (R-7), glass-ui stayed
READ-ONLY, and the standing BH/BI relay law makes the relay a formation invariant, not an option."*
**This seat appends them.** Landed at `COHESION.md` **§4a**, rows **KFW12-1 … KFW12-11**, each with
its date, its source unit and its evidence — **ELEVEN**, not nine: R-7's enumeration folded `.a`'s
KC-20 into prose and this seat rows it separately, as `.a`'s own receipt routes it (`… | .g / SS-6`).

**Composition, measured at the unit receipts rather than restated**: `.b` **7**
(`#### Producer rows for SS-6 (relayed at .g, not sent from here)` `:803-811`) · `.d` **2**
(`:1202`) · `.a` **2** (KC-20's re-scoped BH relay `:927`; the `aria-valuetext` refutation `:928`).
**`.e` surfaced none** (its residual 1 is `.d`'s own test double, a consumer artefact, not a producer
row — relayed nowhere and booked at R-3b below). **`.f` surfaced none as an ASK**: it READ glass-ui's
`a11y-overrides.css` / `accessibility.css` / `keyboard.js` to quote the universal PRM guard and the
two class/ARIA-keyed `forced-colors` blocks, and **stated its reliance in-file instead of
re-implementing it demo-side** — which is the law working, not a row.

**The spec's §Scope 7 named SEVEN producer rows this wave would surface. Measured against what the
units actually found, that prediction is 2-of-7, and this seat says so rather than inventing five
rows to satisfy a count:**

| the spec's predicted name | measured disposition |
|---|---|
| the preset seam | **SURFACED** — `.b`'s row 2 (`EasingPicker` `preset` field / `STEP_COUNT_MIN`-`MAX` export) = **KFW12-2** |
| the slider readout seam | **SURFACED** — `.b`'s row 3 (`LabeledSlider` readout seam) = **KFW12-3** |
| the keyboard registry's missing `defaultPrevented`/scope | **NOT A PRODUCER ROW at the bytes** — the registry is the **demo's own**, and the cure landed **upstream in `orbital-drag/**` at KF.W11 `.a` `fff7232c`** (`.f` ACT 1 read the adoption at `OrbitalDrag.vue:263-308`). Nothing to relay to glass-ui |
| the viewport-gated grid | **SURFACED BY NO UNIT** — no unit's §B.2 rows reached it; not invented here |
| the `steps(1, jump-none)` render throw | **SURFACED BY NO UNIT** — `.b`'s steps cluster (KF-CO-9 ≡ KF-TFP-6, KF-CO-10, KF-CO-40) landed without meeting it; not invented here |
| unlayered scoped styles | **SURFACED BY NO UNIT** as a producer ask; `.f` measured the adjacent fact (the vendor's forced-colors blocks are class/ARIA-keyed) and stated it in-file |
| the lossy `cn` table | **SURFACED BY NO UNIT**; not invented here |

**This is the one limb of G-KFW12-7 that a count cannot close honestly.** The relay is **SENT** for
every row the wave MEASURED; four of the spec's predicted names have no measured finding behind
them, and **a relayed row nobody measured would be a fabricated producer ask** — the exact class the
`.d.ts`-quotation law exists to forbid. Booked as residual **R-12** for a challenge pass to overturn
at the record if it disagrees. **Glass-ui was READ-ONLY at every seat throughout** (⟨cmd⟩
`git -C ../glass-ui status --porcelain` at `.f`'s own clock, and **0** glass-ui paths in all 46
commits).

⟨cmd⟩ `git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l` → **0**, at this seat's
own clock. Glass-ui is unmodified.

### ACT 8 — CHECK 1's register, head by head

| # | severity | CHECK 1's claim | disposition at THIS seat's bytes |
|---|---|---|---|
| **1** | **BLOCKER** | phase 3 — `.e` ∥ `.f`, two of six units — never dispatched, neither blocked; G-5/G-6 born-RED unmoved; the goal criterion unmet at the bytes | **DISCHARGED BY LANDING.** ⟨cmd⟩ `git log bf4a9a9c..HEAD --format='%s' \| grep -c 'X.KF.W12.e'` → **8**; `.f` → **2**. ⟨cmd⟩ `grep -n '^### KF\.W12\.' execution/B/KF-W12.md` now returns **`.e` `:2079` and `.f` `:2351`**. Both test files EXIST. **G-KFW12-5 `4 passed (4)` ×2 · G-KFW12-6 `11 passed (11)` ×2.** ⟨cmd⟩ `grep -rn 'cssIdent' demo` → **one non-comment consumer file, two sites** (was *"2 hits, both comments"*). ⟨cmd⟩ `git log bf4a9a9c..HEAD -- demo/scenes/cube/CubeAxisLines.vue` → **`6db80df7`** (was *(no output)*). **Answered by landing, not by argument**, exactly as the resume required |
| **2** | **HIGH** | the SS-6 relay limb was deferred although the close held both authority and evidence | **DISCHARGED BY ACT** — eleven rows appended to COHESION §4a with dates, sources and evidence; the four unmeasured spec names disclosed rather than invented (ACT 7, residual R-12) |
| **3** | MINOR | §0u part (2) unmet for `KeyframesStringControls.vue(55,9)`/`(76,5)` — *"the type-level shadow of KF-KE-4's unrouted half"* | **DISCHARGED** — ⟨cmd⟩ `npx vue-tsc … \| grep 'KeyframesStringControls'` → *(no output)*. Both fell WITH `.e`'s D-23 cure (`2a0afe7a`), never by a cast. In-bounds residue **13 → 1**, and that one is E-c1, already relieved (ACT 4) |
| **4** | MINOR | `EasingSidebar.vue`'s carve read generously (92/132 across three hunks) | **RE-MEASURED, UNCHANGED, STILL MITIGATED.** ⟨cmd⟩ `git diff --stat bf4a9a9c..HEAD -- demo/scenes/easing/EasingSidebar.vue` → **92 insertions / 132 deletions**, identical to both prior readings; ⟨cmd⟩ `grep -rn 'easing-editor' demo/` → *(no output)* — the dropped `container-name` still has **zero** consumers. Phase 3 wrote not one byte of this file. **Recorded a third time so a pass-2 seat may overturn it at the record; this seat does not re-grade a sibling's carve** |
| **5** | INFO | the SWAP census figure did not reproduce (3 vs 2, a line-wrap) | **RE-MEASURED: 3 · 3** at `:430` · `:1474` · `:1823`, each read by position and each a gate quotation or a citation of the clause. **ZERO receipts.** This block's own reporting raises it again — disclosed at the append, the third seat in a row to meet and publish the same self-counting pathology |
| **6** | INFO | the LEDGER Track-B row carries a duplicated tail fragment `… close \`6f878106\` + this row** · this row**` | **CURED at ACT 11** — this seat owns the row's cells, the file is clean at its clock, and the repair is a minimal in-place replacement of the duplicated fragment, nothing else |

**CHECK 1's own refusal, answered**: *"it refuses to assert that a wave missing two of six units …
may be read as CLOSED — under any qualifier."* **The wave is no longer missing them.** Its honest-RED
forecast — *"the honest-RED set for a future close is, on today's bytes, exactly {G-KFW12-4}"* —
holds at this close for the runtime gates, with G-KFW12-7 joining it on the limbs ACT 3 enumerates.

### ACT 9 — KF12-E2, answered by landing; and the publication

**KF12-E2 (the dispatch gap) is CLOSED.** It was returned by the close of record as an orchestration
omission, sustained by CHECK 1 as `NOT-CONFORMANT` incompleteness under COHESION §0x
(*"incompleteness, not relief"*), and the resume section then discovered `.e` had in fact been
dispatched **after** the close seat sat and killed mid-work. The remedy was the one the escalation
itself named — dispatch `[.e ∥ .f]` on the landed substrate, peak 2, nothing re-opened — and it is
executed: **46 commits, 30 paths, zero out of bounds, zero landed bytes re-opened.**

**Publication.** At this seat's open keyframes.js HEAD was **10 commits ahead of `origin/master`**
(`.e`'s eight, `.f`'s two — both units closed before pushing, `.f`'s receipt noting `.e` would move
HEAD again). Under the owner's 2026-09-17 begin-word (COHESION §0j, publish/push authorized) and the
close of record's own precedent (it published the first 36), this seat pushed:
⟨cmd⟩ `git push origin HEAD:master` → **`c82f92ea..2736b5e5  HEAD -> master`**;
⟨cmd⟩ `git rev-parse --short origin/master` → **`2736b5e5`** = HEAD. **All 46 wave commits are
published.** No byte was written to do it.

### ACT 10 — E13, the four-path sweep, re-run at this seat's own clock

Swept read-only; classification read from each row's **Status cell by position** (field 6 of
`| # | Date | From | Letter | Status | Owner |`), never from a bare `grep -i unread`; `INBOX.md`
self-excluded.

| path | confirmed | result |
|---|---|---|
| `docs/tranches/V/` + `V/coordination/` | ⟨cmd⟩ `/bin/ls -t` | newest four are the **2026-09-18** 4.1.0 packets (parse-that addendum-2 · fourier facility19 delta · glassui r1 relay · atlas export-delta refresh), **all rowed**; nothing newer |
| `../glass-ui/docs/tranches/` | ⟨cmd⟩ `/bin/ls -dt …/*/ \| head -3` → `BK/` · `BJ/` · `BI/` — **BK still newest** | newest letter `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed |
| `../keyframes.js/docs/tranches/V/coordination/` | ⟨cmd⟩ `/bin/ls -t` | newest value-addressed item `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`, **rowed**; `INBOUND-LEDGER.md` is keyframes' own ledger, not a letter |
| `../sci-report/atlas/docs/tranches/P/coordination/` | ⟨cmd⟩ `/bin/ls -t` | newest **2026-07-27** (`valuejs-inbound-…-library-band-export-delta.md` = O-12, ours); path UNMOVED |

⟨cmd⟩ `ls <the four dirs> | grep -E '2026-09-(19|20)'` → *(no output)* — **no mail landed anywhere
at this seat's clock.**

**INBOX census**: ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **81**; tail **O-41**
(O-41 is a sibling Track-B/X·F seat's row minted since the resume, ours, rowed). The bare
⟨cmd⟩ `grep -c 'UNREAD' INBOX.md` → **81** is the header vocabulary and prose — exactly the false
gate three seats have now refused. The **positional Status-cell scan** returns **four** rows whose
Status cell *contains the word*, and every one is prose about a **prior** state: O-20 (*"two UNREAD
glass 08-09 letters found this boundary"*), I-31 (*"Prior status, kept: **UNREAD 2026-09-17**"*),
I-32 (*"The advance from `UNREAD` records an act already performed"*), O-39 (*"**UNANSWERED** as of
this row"*). **ZERO rows carry UNREAD status. ZERO unrowed letters addressed to value.js. ZERO new
`I-n` minted.** No wave scope carries unread mail; a dated sweep line is appended at `INBOX.md`'s
end and no row's status was changed.

### ACT 11 — the LEDGER

**The resume section's fourth withholding is DISCHARGED, not carried.** ⟨cmd⟩
`git status --porcelain -- docs/tranches/X/execution/LEDGER.md` → *(no output)*, read twice before
the edit and again immediately before the commit. Track A's X-W9 hunk (numstat `2 1`) is committed;
there is nothing of a sibling's to sweep. **Three minimal in-place acts, no rewrite:**

1. the `KF.W12 = …` clause of row `KF.W11 · W12 · W13` advanced from `**PARTIAL 2026-09-19**` to the
   second close's verdict, **preserving the whole PARTIAL history rather than regressing it**;
2. **CHECK 1's INFO-6 cured** — the duplicated tail fragment `+ this row** · this row**` reduced to
   one `· this row**`;
3. one dated event line appended at the file's end.

### The four-verb line — moved ONLY as §State permits

The spec's verb table is a **dated spec byte and IMMUTABLE (E-3)**; this seat amends nothing there
and records the reading here.

| verb | state | basis at this close |
|---|---|---|
| AUDITED | **YES** | unchanged |
| SPECIFIED | **YES** | unchanged |
| **IMPLEMENTED** | **NO — stays NO** | §State's condition is *"stays NO until the gates green after the sequencing head lands"*. **Five of seven are GREEN; two are RED.** Honest-RED is not green, and this seat does not stamp a verb on a qualifier. **The row moves to CLOSED-honest-RED; the verb does not move.** |
| VERIFIED | **NO** | *"a successor close's act"* — and **no adversarial CHECK has run against THIS close.** CHECK 1 read the first close and returned `NOT-CONFORMANT`; its two blocking heads are discharged above at the bytes, but a pass-1 seat that authored none of this block has not yet reproduced them. **Not this seat's to stamp.** |

### Residuals — each with a named owner (the close of record's R-1..R-11, re-read, plus one new)

| # | residual | state at this close | owner |
|---|---|---|---|
| **R-1** | `.e` APPLY-UNIT never dispatched | **DISCHARGED** — 8 commits, receipt `:2079`, G-KFW12-5 GREEN | — |
| **R-2** | `.f` AXISLINE-UNIT never dispatched | **DISCHARGED** — 2 commits, receipt `:2351`, G-KFW12-6 GREEN | — |
| **R-3** | **E-d1** — the five-line ambient declaration for `monaco-editor/esm/vs/basic-languages/css/css.js` (TS7016 at 0.55.1); home `demo/env.d.ts`, **not a §B.2 row**. Built hunk preserved byte-exact in `evidence/W12/KF-W12-d-born-red.md` with its measured delta. G-KFW12-4 case (2) turns GREEN on the grant | **CARRIED** — the sole cause of both RED gates' runtime limbs | owner of `demo/env.d.ts` / orchestrator KF-WRITE |
| **R-3b** | **NEW, from `.e`** — `.d`'s `@kf-engine` double at `css-code-editor-seam.test.ts:132-138` stubs `presets` as `{ shake: () => ({ play() {} }) }` where the real `PresetFactory` answers a `CSSKeyframesAnimation`. **A live trap**: the next seat that lawfully calls a preset method on that mount path will be told the product is broken when the double is. `.e` declined to touch it (outside its set), did not shape its cure to satisfy it, and published the infidelity | **CARRIED, published not absorbed** | `.d`'s row owner / a successor seat |
| **R-4** | **E-d2** — KF-CE-33/34/47, one key each in `Dracula.json`/`GitHub.json`; §B.2 conditions them on arm (a) and arm (b) was taken | **CARRIED** | `.d` or a widened reading |
| **R-5** | **E-c1** — `useKeyframeOps.ts(91,13)` TS2322, rooted at `keyframes/utils/parseAnimationCSS.ts:9`. **The only in-bounds §0u diagnostic this wave owed and did not zero** — and it is relieved: the root is not a §B.2 row, the one-token cure is outside every unit's set, a downstream guard is a shim and a cast is refused | **CARRIED, relieved** | owner of `keyframes/.../utils/` |
| **R-6** | **E-c2 · E-c3 · E-c4 · E-c6** — SPF-20/-19 · SPF-11 · the engine's draw-loop settle (→ a KF.W5 letter) · N-8's `cssIdent`-safety finding. **E-c6 is DISCHARGED**: `.e`'s `5bbb7b20` carries L-I-1/E-c6 — every non-ident byte folds to `-`, so `classList.add` no longer throws and the `#`+styleId lookup no longer parses as a descendant selector; G-KFW12-5 clause (2) executes it on `"Spring Keyframes"` | **E-c6 DISCHARGED; the rest CARRIED** | their file owners; E-c4 → KF.W5 |
| **R-7** | the SS-6 producer relay UNSENT | **DISCHARGED** — eleven rows at COHESION §4a (ACT 7) | — |
| **R-8** | `.b`'s render edge covers writes that CROSS the wrapper; an engine write that bypasses it needs an engine seam (`setLayerConfig` is `Object.assign` + a dirty flag with no event). **A demo-side poll was refused, not written** | **CARRIED** | KF.W5 / `.b`'s successor |
| **R-9** | the open ids: `.c`'s (KF-KE-18 · -34 · -50 · -17 · -54 · SPF-23 · the `proof:accent-census` residue; `KeyframesAddDialog.vue` and `useToolbarKeyboard.ts` in-bounds and unwritten) · `.d`'s carried KF-CE-38/-40/-43/-45/-48 · `.a`'s seven unspent and KC-12's DECLINED half · `.f`'s **KF-AX-18** (`OrbitalDrag.vue:3-7`) and **KF-AX-19** (`CubeScene.vue:229-231`, re-anchored at true bytes from the record's drifted `:214-216`) | **CARRIED, each with an owner in its receipt** | as named |
| **R-10** | eslint **7 · 7 UNMOVED** (5 pre-window outright; 2 lines `.b` re-touched inside a pre-existing mutation block) | **CARRIED** | KF-CO-45's owner / KF.W13 |
| **R-11** | `KeyframeCard.vue` fails `prettier --check` on class ordering at the baseline, not reformatted; `useHighlightCSS.ts:190-203`'s theme-driver docblock re-read and left; unread `controlOptionsStore.ts` schema members named | **CARRIED** | as named |
| **R-12** | **NEW, this close** — **four of §Scope 7's seven predicted producer rows were surfaced by NO unit** (the viewport-gated grid · `steps(1, jump-none)` · unlayered scoped styles · the lossy `cn` table), and a fifth (the keyboard registry's `defaultPrevented`/scope) is measured **not to be a producer row at all** — the registry is the demo's and its cure landed upstream at KF.W11 `.a`. **No row was invented to satisfy the count.** This is the one G-KFW12-7 limb a count cannot close honestly | **DISCLOSED** | a challenge pass, at the record |
| **R-13** | **NEW, this close** — `.f`'s SS-13 asks: **#1 · #2 · #3 · #4 · #6 · #8**, the rendered witnesses no derivation can discharge; **#1 must be shot BEFORE and AFTER the filter gate**, which landed at `6db80df7`. Plus KF-AX-9's release asymmetry (the bloom drops in one frame on unlock, stated in-file), KF-AX-3's open half (`--axis-x`'s missing dark arm), KF-AX-2's deuteranopia labels limb, KF-AX-10's two-encoding reconciliation | **CARRIED** | **KF.W9** · **KF.W6** · **J-lane C6** · **U.B8** |

### Escalations returned by this close

- **NONE NEW.** No §Bounds expansion was needed, no specified cure was impossible at the bytes, no
  diagnostic loop reached three, and this seat wrote no product byte in any repo.
- **KF12-E2 — CLOSED** by landing (ACT 9). It is the only escalation the close of record raised and
  it is the only one this close retires.
- **Carried, unresolved, each already stated by its unit and none re-described here**: **E-d1**
  (R-3) · **E-d2** (R-4) · **E-c1** (R-5) · **E-c2/-c3/-c4** (R-6; **E-c6 discharged**) · `.b`'s
  KF-CO-9 store half, KF-CO-11/-12, KF-CO-15's options-half tail and KF-CO-36/LP-22 (all out of the
  writable set) · **KF11-E(j1)** (the `spring-trace-truth (4b)` honest-RED, KF.W11's, carried
  untouched and unweakened through all 46 commits).

### Positive statements the close gate asks for, stated as such

- **ZERO SWAP-discharge receipts** were written by any unit, `.a` through `.g`. The literal
  `DISCHARGED by KF.W7 SWAP verdict` appears **3 · 3** in this file before this block and rises with
  this block's own reporting; **every occurrence is a gate quotation or a citation of the clause,
  none is a receipt** (read by position: `:430`, `:1474`, `:1823`). **The KF-AV-28 discharge alphabet
  has zero members and nothing here wrote it** — the verdict is settled six KEEP-BESPOKE, ZERO SWAP.
- **ZERO re-bookings**: `KF-APP-41` **0**, kf-EditorShell `C-22` **0**, word-bounded, over all 46
  commit messages. KF-AX-18/-19 are carried with owners, not adopted; D-2/L-M-8 is a fold by
  reference at its banked id.
- **ZERO demo-side producer cures**: no scoped-style override, no re-implemented primitive, no copied
  producer selector, no `node_modules` patch, in 46 commits. `.b` quoted the installed 7.0.0 `.d.ts`
  verbatim rather than guessing a prop name; `.a` refuted `aria-valuetext` and `LabeledSlider` at the
  installed `dist/slider-DzqeQmMu.js` and landed `LabeledField` instead of reaching into rendered
  thumbs; `.f` **stated its reliance** on the vendor's universal PRM guard in-file rather than
  duplicating it demo-side. **Glass-ui `status --porcelain` → 0 at this seat's own clock.**
- **ZERO masking**: no `test.skip`/`it.skip`/`.only` anywhere in the tree, no `try/catch` around a
  defect, no allowlist, no widened timeout. **`value4-editor-boundary.test.ts` is not in the diff at
  all** (`wc -l` → 0) — §L-18 (iv)'s named masking class did not occur. The five added `try/catch`
  blocks were read whole by CHECK 1 and every one surfaces its error.
- **The killed "both animate the same target simultaneously" scenario appears nowhere as this wave's
  work** — G-KFW12-5's anti-work clause now holds **at a run**, not vacuously: the sole occurrence is
  `apply-css-identity.test.ts`'s docblock naming it AS killed.
- **`scripts/dev/dev.sh`**: **0 of 46** keyframes.js commits and **0 of 20** value.js commits (⟨cmd⟩ the `--name-only` union
over every value.js commit whose message names `x-kf-w12` → `grep -c 'dev.sh'` → **0**). Never
  staged, never touched, never read for judgement.

### What this close asserts, and what it refuses to assert

**It asserts**: that **all six product units have run**; that **G-KFW12-1, -2, -3, -5 and -6 are
GREEN on every clause, double-run, at kf `2736b5e5`**; that the spec's goal criterion is now answered
on all six legs at the bytes — a card's offset reads, writes and removes; the options card is live in
both directions **on a render edge in the record's fixed order**; **Apply-CSS applies something**
(KF-KE-4's chain proven by execution with both strings pasted, and now with `cssIdent`'s own answer
as a third string in the identity); the code editor is keyboard-escapable and fails loudly; **the
applied stylesheet binds the class it adds under ONE `cssIdent`-derived name with ONE lifetime**
(N-8's routed arm, RB-6's watch, `clear()` wired, the CSSOM read-back matching a real target for a
whitespace-bearing name); and **the axis-lock reveal reveals what it claims on the demo's one
keyboard registry** (a real `KeyboardEvent` at `window` driving `registerShortcut → setAxisLatch →
the lit stroke`, unmocked, with every geometric assertion frame-stamped against
`rotate3d(-1,1,0,30deg)` and re-derived from the tree's own attitude so a frame change reds the
gate). It asserts that the bounds are clean over 46 commits and 30 paths, that nothing is masked
anywhere in the diff, that E-3 holds, that the mail is clean, and that the four-verb line was moved
lawfully — i.e. not at all.

**It refuses to assert**: that the wave is **VERIFIED** — no adversarial CHECK has read THIS close,
and the verb is a successor's by §State's own words. That **G-KFW12-4 or G-KFW12-7 is green** — they
are not, and their relief is cited to named heads (E-d1's out-of-bounds home; §0u part (3)'s
relocation of the literal zero to KF.W13's close; KF11-E(j1)'s ownership of the second `test:demo`
failure) rather than argued. That the **SS-6 limb is literally seven-of-seven** — it is eleven
measured rows sent and four predicted names with no finding behind them, said plainly at R-12. That
`.e`'s cross-unit write of `useKeyframesEditor.ts` was in its own §B.2 assignment — it was not, and
the deviation is disclosed at ACT 1 rather than smoothed. And it refuses to re-grade `.a`–`.f`, to
re-open CHECK 1's register, to overturn a sibling's `EasingSidebar.vue` carve reading, or to write
one byte of keyframes.js or glass-ui.

### LEDGER

Track B row cells and the dated event line updated by this seat: the `KF.W12 = …` clause advanced
from `**PARTIAL 2026-09-19**` to **`CLOSED 2026-09-17 (honest-RED: G-KFW12-4 · G-KFW12-7)
2026-09-19, SECOND CLOSE`**, with the full **46 keyframes.js + 20 value.js** commit roster, CHECK 1's BLOCKER-1/HIGH-1 both
discharged at the bytes, and INFO-6's duplicated tail fragment repaired in place.

---

### ACT 11 — POSTSCRIPT, dated 2026-09-19, appended beside the block above (E-3, nothing rewritten)

**The LEDGER bytes landed. They did not land in a Track B commit, and this seat says so rather than
letting the roster read as if they had.**

The sequence, measured and not reconstructed:

1. This seat read `LEDGER.md` **CLEAN** twice (⟨cmd⟩ `git status --porcelain -- …/LEDGER.md` →
   *(no output)*) and wrote its two acts — the minimal in-place cell replacement at row `:56` and the
   appended event line. ⟨cmd⟩ `git diff --numstat` immediately after → **`1 1`** for the cell alone,
   exactly a minimal replacement.
2. **Before the commit could be taken**, ⟨cmd⟩ `git diff -U0 -- …/LEDGER.md | grep '^@@'` read
   **THREE** hunks: `@@ -32 +32 @@` (Track A's `X-W9` row, advanced to `X-W9.f LANDED`),
   `@@ -56 +56 @@` (mine) and `@@ -418,0 +419,4 @@` (**two** appended event lines — Track A's
   `X-W9.f LANDED` line above mine). **A sibling seat's uncommitted bytes had entered the same file
   between the clean reading and the write.** A pathspec commit names paths, not hunks, so committing
   `LEDGER.md` here would have swept Track A's row into a Track B commit — the mechanism that
   produced three contaminated commits at X-W0 and that the third sitting withheld for four times.
   **This seat therefore did not commit the file**, and committed its three uncontaminated paths
   (`execution/B/KF-W12.md` `f12aff08` · `COHESION.md` `8971b57f` · `INBOX.md` `9c444c66`) instead.
3. **A third seat took the file first.** ⟨cmd⟩ `git log --oneline -1 -- …/LEDGER.md` → **`3c1bcf8c`**
   — `docs(x-f-w9/repair-1/ledger): the dated event line — HIGH-1 cured, G-F9-6 GREEN on the
   measurement, row stays PARTIAL`, a **Track C · X·F** seat. ⟨cmd⟩
   `git show --numstat --format='' 3c1bcf8c` → **`8 2  docs/tranches/X/execution/LEDGER.md`** — one
   path, pathspec-correct on its face, and **eight insertions where its own act was one row cell and
   one event line**. It swept **Track A's X-W9 row, Track A's X-W9.f event line, this wave's KF.W12
   row cell and this wave's KF.W12 event line** along with its own.

**State at the bytes, verified rather than assumed** — ⟨cmd⟩
`git status --porcelain -- …/LEDGER.md` → *(no output)*, clean; ⟨cmd⟩ `sed -n '56p' …` →
`KF.W12 = OPEN 2026-09-17 → **PARTIAL 2026-09-19** → **CLOSED 2026-09-17 (honest-RED: G-KFW12-4 ·
G-KFW12-7) 2026-09-19 — SECOND CLOSE, third sitting**`, byte-intact; ⟨cmd⟩
`git show HEAD:…/LEDGER.md | grep -c 'X.KF.W12 SECOND CLOSE →'` → **1**, the event line intact;
⟨cmd⟩ `sed -n '56p' … | grep -c 'this row\*\* · this row\*\*'` → **0** — **CHECK 1's INFO-6 is
cured** and the repair is in HEAD. **The LEDGER obligation is DISCHARGED at the bytes; the
attribution is not this wave's.**

**What this seat did NOT do, by name**: it did not `reset`, `unstage`, `revert` or amend another
seat's commit; it did not `git checkout --` the file (that would have destroyed two sibling seats'
uncommitted work); it did not re-commit the same bytes to claim them; and it did not `stash`. **A
sibling's landed commit is a fact to be recorded, not edited.**

**Booked as residual R-14 and escalated as a FORMATION finding, not a wave defect** — the four-track
shared index makes "pathspec on the commit itself" **necessary but not sufficient**: a path shared by
four tracks carries whatever is dirty in it at commit time, whoever wrote it. Four withholdings, one
contaminated Track-C commit and this postscript are five measurements of the same mechanism in two
days. **The cure is not a seat's to invent** — it is an orchestrator act (a per-track ledger file, or
a serialized ledger-write lane), and it is returned here as **KF12-E3**, unresolved, with the
evidence above.
