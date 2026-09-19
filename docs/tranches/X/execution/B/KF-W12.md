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
