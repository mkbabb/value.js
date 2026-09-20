SERVED MODEL: claude-opus-5[1m]

# KF.W13 — Chrome, Dock & Transport Repair · EXECUTION RECORD (Track B · X·KF)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W13.md` (296 L, authored 2026-09-18 by the
SS-1/SS-2 fold seat, sitting date 2026-09-17, ref of record kf `69095552`).
**Wave status at this seat**: **BLOCKED-ON OP-0** — the spec's one wave-level HARD open
precondition (`G-KFW4-1` GREEN, *"the sequencing head"*) is **RED at this seat's own clock,
double-run: 54 · 54**. **No `§Bounds` product byte was written by this seat**; the only bytes it
wrote are this record, the LEDGER's own cells and its event line. Baseline (8 gates + 17 byte
clauses), mail sweep, nine precondition receipts and the **full 4-unit plan** are banked below so
that a grant — or a KF.W4 repair landing — dispatches the wave without a second open sitting.
**This is the THIRD and last wave of the SS-1/SS-2 block to meet this wall**: KF.W11's open attempt
(`025178c3`, record `execution/B/KF-W11.md`) returned **ESCALATION KF11-E1**; KF.W12's
(`beacd880`, record `execution/B/KF-W12.md`) returned **KF12-E1**, that same conflict with the
by-file decomposition of the 54. The escalation this seat
returns, **KF13-E1**, is the same conflict again with **this wave's own decomposition**, which is
the sharpest of the three and points the opposite way from KF.W11's (§Open, the blocking finding).

---

## Open

**Date**: 2026-09-19 (wall clock). **Sitting of record: 2026-09-17**, the owner's begin-word
(COHESION §0j).
**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`, VERIFY-AND-BANK only.
**Substrate named, never assumed**: keyframes.js sacred checkout
`/Users/mkbabb/Programming/keyframes.js`, `master` — ⟨cmd⟩ `git -C … rev-parse --short HEAD` →
**`dd28da55`**; ⟨cmd⟩ `… rev-parse --short origin/master` → **`dd28da55`** (local == remote).
value.js `tranche-u`.
**Drift from the spec's ref of record**: ⟨cmd⟩ `git rev-list --count 69095552..HEAD` → **7** — the
seven KF.W10 close commits (`95e53f5e` · `b920b190` · `025e894c` · `27ec9c37` · `b50a23de` ·
`0a329c57` · `dd28da55`). **None touches a path this wave bounds**: ⟨cmd⟩ `git log --oneline
69095552..HEAD -- demo/styles/design-idioms.css demo/styles/playback-idiom.css` → *(no output)*.
**Every anchor in §B.1 and §B.2 re-resolves at `dd28da55` exactly as the spec resolved it at
`69095552`** — 13 of 13 `wc -l` figures identical, 7 of 7 M-4 grep lines at their spec-stated
offsets, MbabbMenu `:4`/`:186`/`:192`/`:204`, ChromeDock `:114`/`:237`/`:299`/`:302` all verbatim
(§Anchors below). **One authoring-figure correction is declared, not patched** (§Baseline, G-6).

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**,
both value.js-delivered mail packets
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md`,
`…-2026-07-27-library-band-r1-widened-k1-k4.md`) — **outside every KF.W13 writable path**.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **4 rows**:
`M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling seat's; untouched), `M scripts/dev/dev.sh`
(**unowned, never staged, NEVER touched**), `?? docs/tranches/X/fourier/waves/F-W7/` (Track C's;
untouched) and `?? e2e/smoke/scene-action-contract.spec.ts` (a sibling's; untouched).
**No dirty path inside this seat's writable set** — `docs/tranches/X/execution/B/KF-W13.md` did not
exist (⟨cmd⟩ `ls docs/tranches/X/execution/B/` → **13 entries**: `KF-W0.md · KF-W1.md · KF-W2.md ·
KF-W4.md · KF-W4-usability-bundle.patch · KF-W5.md · KF-W6.md · KF-W7.md · KF-W8.md · KF-W9.md ·
KF-W10.md · KF-W11.md · KF-W12.md` — **no `KF-W13.md`**), `LEDGER.md` clean, `INBOX.md` clean.
**Zero inherited hunks; nothing to finish or rewrite; nothing stashed, nothing restored.**

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification read from each row's **Status cell by
position**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded** (SELF-COUNT law).

1. **`docs/tranches/V/` + `V/coordination/`** — ⟨cmd⟩ `/bin/ls -t docs/tranches/V/*.md
   docs/tranches/V/coordination/*.md | head -10` → `INBOX.md` (self) then the five 2026-09-18
   letters, **all ours and all rowed**: `parse-that-inbox-…-evidence-addendum-2` = **O-38** ·
   `fourier-inbox-…-facility19-delta` = **O-37** · `glassui-inbox-…-r1-relay` = **O-36** ·
   `atlas-inbox-…-export-delta-refresh` = **O-35** · `keyframes-inbox-…-cut-notice` = **O-34**;
   then `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md` = **O-31** and
   `valuejs-outbound-2026-09-18-kfw7-bh-relay.md`. Each row's presence proven by
   ⟨cmd⟩ `grep -c '<basename>' INBOX.md` → ≥ 1 for all six.
2. **`../glass-ui/docs/tranches/BK/coordination/`** — **BK re-confirmed the newest tranche dir**:
   ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/` · `BJ/` · `BI/`. Newest letter
   `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**; the next,
   `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` = **O-26**, ours. Path and tail **UNMOVED** since
   KF.W12's sweep hours earlier.
3. **`../keyframes.js/docs/tranches/V/coordination/`** — newest inbound-grammar file
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21 / I-26**, ours, delivered;
   `INBOUND-LEDGER.md` is keyframes' own ledger, not a letter.
4. **`../sci-report/atlas/docs/tranches/P/coordination/`** — newest
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12**, ours; path UNMOVED.

**Result**: **ZERO unrowed letters addressed to value.js · ZERO new `I-n` minted (register tail
stays I-35 / O-38) · ZERO UNREAD Status cells** — ⟨cmd⟩ `sed 's/\\|/@PIPE@/g' INBOX.md | awk -F'|'
'/^\| [IO]-[0-9]+[a-z]? \|/ {s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print
c+0}'` → **0**, over **78** rows (⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **78**).
**`INBOX.md` NOT touched by this seat** — nothing to row, and a blocked open appends no sweep line
(the sweep is recorded here, dated; the next KF.W13 sitting re-runs it).

### Preconditions — every `Opens after` name, measured at the bytes AND in the ledger

| # | precondition (spec §State `:30` / §0 `:39-47`) | this seat's measurement (double-run) | verdict |
|---|---|---|---|
| **OP-0** | **`G-KFW4-1` GREEN** — the sequencing head; *"All 17 sequence after G-KFW4-1"* (RUNBOOK §1.2) | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` → **54** · **54** (at `dd28da55`). LEDGER KF.W4 row = **`CLOSED 2026-09-17 (honest-RED: G-KFW4-1 · G-KFW4-3 · G-KFW4-4 · G-KFW4-5 · G-KFW4-7)`**. | **RED — HARD. THE WAVE IS BLOCKED.** |
| **OP-1** | **KF.W7's per-surface SWAP verdicts** — six KEEP-BESPOKE, zero SWAP, discharge set EMPTY | ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js cat-file -t 4c03ceda` → `commit`; LEDGER KF.W7 = **`CLOSED 2026-09-17`**. | **MET** — both packets UN-GATED; `.b` states it before spending a cure; **zero discharge receipts are emitted by anyone** (G-7's clause). |
| **OP-2** | **LP-1's write→render edge (KF.W12 `.b`)** — the C-2/KF-CO-15 joint commit's reactive `:max` and one-duration-read are inert until the options card re-renders on engine writes | ⟨cmd⟩ `grep -n ':max' demo/components/playback/PlaybackRibbon.vue` → **`:19 :max="effectiveDuration"`** · same (the rider **partly landed**, as the spec measured); LEDGER KF.W12 = **BLOCKED-ON OP-0**, its `.b` sha does not exist. | **UNLANDED** — gates `.b`'s C-2 joint commit **alone**; every other `.b` row does not wait. Subsumed by OP-0. |
| **OP-3** | **the glass-ui producer facts the MUST-CARRY rider rests on** — bare `{ type: Boolean }`, no defaults → Boolean-cast makes the primitive permanently controlled | **RE-MEASURED AT THE INSTALLED DIST** (glass-ui **7.0.0**, READ-ONLY): ⟨cmd⟩ `grep -cE '^\s+(defaultOpen\|open\|modal): \{ type: Boolean \},?$' node_modules/@mkbabb/glass-ui/dist/dropdown-menu-0gkd7rMF.js` → **5** · **5**, the Root's three at `:13` `defaultOpen` · `:14` `open` · `:16` `modal`. **The producer has NOT shipped defaults.** Demo half holds its premise: `MbabbMenu.vue:4` `<DropdownMenu v-model:open="open">` · `:204` `const open = defineModel<boolean>("open", { default: false });`. | **PREMISE STANDS UNCHANGED** — the rider's shape is not relaxed; the local binding stays MUST-CARRY. Producer half rides SS-6 at `.d`. |
| **OP-4** | **the self-hold mechanism M-4's deletion rests on** — `keepOpen()` reachable from slot content via `useOptionalDockContext()` on the `/dock` subpath MbabbMenu already imports | ⟨cmd⟩ `grep -rn 'useOptionalDockContext' demo` → **one hit, and it is the false comment itself** — `demo/app/dock/ChromeDock.vue:110` *"set up in the PARENT (App.vue), so its `useOptionalDockContext()` resolves …"*; ⟨cmd⟩ `grep -n 'useOptionalDockContext' node_modules/@mkbabb/glass-ui/dist/components/dock/index.d.ts` → **`:12`** (exported); ⟨cmd⟩ `grep -n 'glass-ui/dock' demo/app/dock/MbabbMenu.vue` → **`:192`** `import { DockTrigger } from "@mkbabb/glass-ui/dock";`. | **REACHABLE, UNEXECUTED — exactly as the spec measured.** HARD **for the deletion**: `.a`'s G-KFW13-0 proof commit executes the predicate before a site is deleted (L-1). Not an open-blocker in itself. |
| **OP-5** | **G-KFW9-9's witness pair + the re-derivation obligation** (KF-W9 D-3 + DU-M-1) | ⟨cmd⟩ `grep -n 'focus-visible' demo/styles/playback-idiom.css` → **`:74 .btn-playback:focus-visible`** (`:74-77`, `box-shadow: var(--focus-ring-shadow); outline: none;`) · ⟨cmd⟩ `grep -n 'focus-visible' demo/styles/design-idioms.css` → **`:106 .kf-focus-ring:focus-visible`** (`:106-109`) **+ `:111-116` `@media (forced-colors: active)` restoring `outline: 2px solid Highlight; outline-offset: 2px;`**. ⟨cmd⟩ `git log --oneline 69095552..HEAD -- <both files>` → *(no output)* — **the bytes are IDENTICAL to the spec's ref; the shape change is KF.W6's `a6418729`, already declared at §B.1 row 7.** LEDGER KF.W6 = **CLOSED 2026-09-17 (honest-RED)**. | **MET as a precondition; the obligation stands** — `.c` re-derives the redundancy ground for BOTH selectors before the sha, and lands one act naming both stylesheets. |
| **OP-6** | **KF.W8's extracted composables; part of the TD keyboard family already landed inside them** | ⟨cmd⟩ `grep -n 'isSpace\|spaceArmed' …/TransportDock/usePlayActuation.ts` → `:39` `const isSpace` · `:47` `let spaceArmed = false;` · `:74` · `:78` `if (!e.repeat) spaceArmed = true;` · `:82-83` — **the native Space/keyup semantics TD-38's docblock prescribes are IMPLEMENTED**; ⟨cmd⟩ `grep -c '\.stop' …/TransportDock.vue` → **5** · **5**, `…/dock/ChromeDock.vue` → **0** · **0** (the asymmetry, live). LEDGER KF.W8 = **CLOSED 2026-09-17 (honest-RED)**. `wc -l` 88 · 29 · 28, identical to §B.2. | **MET; HARD for `.b`** — `.b`'s FIRST act is the remainder derivation against landed code, receipted, **before any TD byte**. The bundle lock binds whatever remains. |
| **OP-7** | **TD-37 — one face order — is an SS-2 DESIGN DECISION** | ⟨cmd⟩ `grep -n 'TD-37\|face order' docs/tranches/X/COHESION.md` → *(no output)* — **RULED NOWHERE in §0i–§0t** (read to the file end, 1540 L). | **UNRULED — OWNER/DESIGN's, not this seat's and not `.b`'s.** `.b` lands TD-37 **only** with the ruling in hand; otherwise `complete_with_misses` naming it. Gates **one row**, never the wave. |
| **OP-8** | **R3-1's kill is RATIFIED and binds the cure's shape** — the `ComponentExposed<>`/`Pick<>` remedies MUST NOT LAND | STANDING; enforced as a byte clause inside G-KFW13-1 (`git show <sha> \| grep -c 'ComponentExposed\|Pick<'` → **0**). | **STANDING** — a constraint on `.a`, not an open-blocker. |

**Only OP-0 blocks the wave.** OP-4 is hard for `.a`'s deletion and is satisfied *by construction*
(the proof commit); OP-6 is hard for `.b` and is MET; OP-2 gates one commit of `.b` and is itself
downstream of OP-0; OP-7 gates one row and is the owner's.

**Ledger-side reading of the spec's other `Opens after` names**, each verified in
`execution/LEDGER.md` Track B **and** at the bytes:

- **KF.W4** — `CLOSED 2026-09-17 (honest-RED: G-KFW4-1 …)`. The head's gate is *carried* RED.
- **KF.W7** — `CLOSED 2026-09-17`; `4c03ceda` is a commit; six KEEP-BESPOKE, **discharge set EMPTY**. **MET.**
- **KF.W6** — `CLOSED 2026-09-17 (honest-RED)`; the `kf-focus-ring` rename is in the tree at `design-idioms.css:106` with its forced-colors parity at `:111-116`. **MET.**
- **KF.W8** — `CLOSED 2026-09-17 (honest-RED)`; the three composables exist at their §B.2 line counts. **MET.**
- **KF.W9** — `CLOSED 2026-09-17 (honest-RED: … G-KFW9-9 …)` · PARTIAL, 6 of 13 GREEN; the witness pair is held READ-ONLY there and the AFTER witness is handed back by row id at `.c`. **MET.**
- **KF.W12** — `planned` · **BLOCKED-ON OP-0**; its `.b` close sha does not exist (OP-2 above).

### Anchors — §B.1 / §B.2 re-resolved at `dd28da55` (KF.W0 §B-12; D-19)

| anchor | spec figure at `69095552` | this seat at `dd28da55` |
|---|---|---|
| `wc -l` over all 13 §B.2 product/style rows | 534 · 229 · 2 · 412 · 403 · 88 · 29 · 28 · 72 · 244 · 731 · 89 · 338 | **identical, 13 of 13** |
| M-4's seven grep lines | 5 code + 2 prose | **7**: `App.vue:29` `:items-popup-open="mbabbPopupOpen"` · `:37` `v-model:open="mbabbPopupOpen"` · `:369` (prose) · `:372` `const mbabbPopupOpen = ref(false);` · `MbabbMenu.vue:186` (prose) · `ChromeDock.vue:114` `itemsPopupOpen?: boolean;` · `:237` `const isAnyOpen = computed(() => openPopup.value !== null \|\| !!props.itemsPopupOpen);` — **every offset verbatim** |
| MbabbMenu `:4` · `:204` (the MUST-CARRY pair) | `<DropdownMenu v-model:open="open">` · `defineModel<boolean>("open", { default: false })` | **both verbatim at their spec offsets** |
| TD-36's pair | `ChromeDock.vue:299` `pointer-events-none` (the `fixed … z-dock` wrapper) · `:302` `pointer-events-auto` | **both verbatim** |
| G-KFW9-9's pair | `playback-idiom.css:74-77` · `design-idioms.css:106-109` + `:111-116` | **verbatim**; N-3's `.btn-playback:active` at `:78-80` **verbatim** |

---

## Baseline — the eight gates, run READ-ONLY at `dd28da55`, double-run

All commands from `/Users/mkbabb/Programming/keyframes.js`. **SELF-COUNT**: ⟨cmd⟩ `grep -c
'^\*\*G-KFW13-' docs/tranches/X/keyframes/waves/KF-W13.md` → **8** (value.js-relative); eight gates
banked, eight rows below.

| gate | command (spec §Gates) | reading (run 1 · run 2) | verdict |
|---|---|---|---|
| **G-KFW13-0** | `npx vitest run --project demo test/demo/app/dock-context-slot-resolution.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW13-1** | `npx vitest run --project demo test/demo/app/mbabb-menu-self-hold.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW13-2** | the roster clauses (`git diff <open-sha>..HEAD -- demo/app \| grep -c "headerLeft"` → 0; every id LANDED/KILLED/carried) | **not runnable before an open sha exists**; no roster commit exists | **RED by construction** |
| **G-KFW13-3** | `npx vitest run --project demo test/demo/instrument/transport-keyboard-propagation.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW13-4** | `npx vitest run --project demo test/demo/instrument/transport-play-actuation.test.ts test/demo/instrument/transport-icon-spin.test.ts` | **`Test Files 1 passed (1)` / `Tests 10 passed (10)`, exit 0** · same | **RED by its other clauses; see GREEN-BEFORE-CURE (1)** |
| **G-KFW13-5** | `npx vitest run --project demo test/demo/instrument/playback-ribbon-contract.test.ts` | `No test files found, exiting with code 1` · same | **RED (born)** |
| **G-KFW13-6** | the two-deletion byte clauses (below) | `box-shadow: var(--focus-ring-shadow)` in `playback-idiom.css` → **1 · 1**; `sed -n '106,116p' design-idioms.css \| grep -c 'outline'` → **3 · 3** | **RED (born)**; one **declared drift** on the second figure |
| **G-KFW13-7** | `test:demo` ⊕ `vue-tsc` ⊕ the sweep denominators ⊕ the skip/discharge clauses | `Test Files 39 passed (39)` / `Tests 286 passed (286)` — **GREEN-AT-OPEN**; `vue-tsc` → **54 · 54** — RED; denominators **8 · 8** and **2 · 2** | **RED on its `vue-tsc` and absent-file clauses; see GREEN-BEFORE-CURE (2)** |

**The five absent files, proven absent rather than asserted** — ⟨cmd⟩ `ls <path>` for each of the
five `create` rows of §B.2 → `No such file or directory` ×5 (double-run); ⟨cmd⟩ `ls test/demo/app/`
→ **`e-w1-encapsulation.test.ts` only**, twice, exactly as the spec's G-KFW13-0 recorded. That is
the sole cause of the four `No test files found` readings; every one is **RED-AS-EXPECTED
(born-RED)**, none is UNRUNNABLE.

### Byte clauses — seventeen, sixteen reproducing the spec's authoring figure (double-run)

| clause | gate | reading (run 1 · run 2) | spec's figure at `69095552` | drift |
|---|---|---|---|---|
| `grep -rc 'useOptionalDockContext' demo \| grep -v ':0'` | G-0 | `ChromeDock.vue:1` · same | `ChromeDock.vue:1` (the false comment) | none |
| `grep -rn 'itemsPopupOpen\|items-popup-open\|mbabbPopupOpen' demo \| wc -l` | G-1 | **7 · 7** (must reach 0) | 7 | none |
| `grep -c 'v-model:open="open"' demo/app/dock/MbabbMenu.vue` | G-1 | **1 · 1** (must STILL read 1 — the MUST-CARRY clause) | 1 | none |
| `sed -n '109,113p' demo/app/dock/ChromeDock.vue \| grep -c 'cannot hold the dock open'` | G-1 | **1 · 1** (must reach 0) | 1 | none |
| `grep -c '\.stop' …/transport/TransportDock.vue` | G-3 | **5 · 5** | 5 | none |
| `grep -c '\.stop' demo/app/dock/ChromeDock.vue` | G-3 | **0 · 0** (the asymmetry) | 0 | none |
| `grep -c 'registerShortcut("Space"' …/useControlsKeyboardShortcuts.ts` | G-3 | **1 · 1** | 1 | none |
| `grep -c 'instanceof HTMLElement' …/TransportDock/useIconSpin.ts` | G-4 | **2 · 2** (`:5`, `:7`; must reach 0) | 2 | none |
| `grep -c 'blur\|orphan\|stale' test/demo/instrument/transport-play-actuation.test.ts` | G-4 | **0 · 0** (must reach ≥ 3) | 0 | none |
| `grep -c 'it(' test/demo/instrument/transport-play-actuation.test.ts` | G-4 | **10 · 10** (never weakened) | 10 | none |
| `grep -c 'aria-label' demo/components/playback/PlaybackRibbon.vue` | G-5 | **0 · 0** (must reach ≥ 1) | 0 | none |
| `grep -c 'valueCommit\|value-commit' …/PlaybackRibbon.vue` | G-5 | **0 · 0** (≥ 1) | 0 | none |
| `grep -c ':step' …/PlaybackRibbon.vue` | G-5 | **0 · 0** (≥ 1) | 0 | none |
| `grep -c 'gatedSliderDown' …/PlaybackRibbon.vue` | G-5 | **2 · 2** (`:11` `@pointerdown.capture`, `:167` the handler; must reach 0 — L-M1) | 2 | none |
| `grep -c 'box-shadow: var(--focus-ring-shadow)' demo/styles/playback-idiom.css` | G-6 | **1 · 1** | 1 | none |
| `sed -n '106,116p' demo/styles/design-idioms.css \| grep -c 'outline'` | G-6 | **3 · 3** | **2** | **DECLARED DRIFT — see below** |
| `git grep -l 'btn-playback' HEAD -- demo \| wc -l` ⊕ the bare-`.focus-ring` count | G-7 | **8 · 8** ⊕ **2 · 2** | 8 ⊕ 2 | none |

**The one drift, stated as an addendum-beside and never as a patch (E-3).** G-KFW13-6's second
clause reads **3**, not the spec's **2**. It is **not tree drift**: ⟨cmd⟩ `git log --oneline
69095552..HEAD -- demo/styles/design-idioms.css` → *(no output)* — the bytes at `:106-116` are
byte-identical to the spec's own ref. The span contains **three** `outline` tokens, not two:
`:108 outline: none;` inside `.kf-focus-ring:focus-visible`, and **both** `:113 outline: 2px solid
Highlight;` **and** `:114 outline-offset: 2px;` inside the `@media (forced-colors: active)` block.
The spec's parenthetical (*"`outline: none` + the forced-colors `outline: 2px solid Highlight`"*)
names exactly the two rules it meant; the `grep -c 'outline'` spelling also counts `outline-offset`.
**`KF-W13.md` is dated and IMMUTABLE — it is not edited.** The frontier reading is recorded here,
with its command, as the figure `.c` and `.d` meet; the gate's GREEN condition is unaffected (it
turns on the *first* clause reading 0 or on a re-derived forced-colors parity, not on this count).

### GREEN-BEFORE-CURE (R.2) — three, all booked, none claimed

1. **G-KFW13-4's literal command exits 0 with everything passing** — `Test Files 1 passed (1)` /
   `Tests 10 passed (10)`, ⟨cmd⟩ `…; echo $?` → **0**. The spec predicted *"RED today: the second
   file is absent (`No test files found` for it)"*: vitest emits no such line when **one** of two
   named files matches, so the gate's own runtime command **reads green while the gate is RED**.
   Booked as a finding, not as progress: **G-KFW13-4 is RED by its byte clauses** (`instanceof
   HTMLElement` **2**, must reach 0; `blur|orphan|stale` **0**, must reach ≥ 3) **and by the absent
   `transport-icon-spin.test.ts`**. `.b` must not read the 10/10 as a discharge — the ten `it(`
   are the baseline it may never weaken, and the cancellation arm is the residue.
2. **G-KFW13-7's `npm run test:demo` limb is GREEN AT OPEN** — `Test Files 39 passed (39)` /
   `Tests 286 passed (286)` (double-run, `Duration 3.17s` / `3.13s`). The gate is nevertheless RED
   by its `vue-tsc → 0` clause (**54**) and by construction (five absent files). **39 is the
   denominator the five creations grow to 44.**
3. **OP-2's reactive `:max` rider is PARTLY LANDED** — `PlaybackRibbon.vue:19
   :max="effectiveDuration"` · same. Booked as **`LANDED-BY <sha unresolved>`** and never claimed:
   ⟨cmd⟩ `git log --oneline -1 -- demo/components/playback/PlaybackRibbon.vue` is `.b`'s to run at
   its own open, which is where the **remainder** of the KF-CO-15 rider is derived (one duration
   read, one guard — L-m9). The spec's own first R.2 booking; OP-6's Space/keyup semantics are the
   second and are recorded at OP-6 above (`usePlayActuation.ts:39-83`, landed by KF.W8).

**No other gate or clause reads green before its cure.**

---

## The blocking finding, stated whole — ESCALATION KF13-E1

The spec is unambiguous about its own open condition. §State `:30`: *"**Opens after**: **G-KFW4-1
lands GREEN** (the sequencing head; R-15: 'All 17 sequence after G-KFW4-1'; **measured RED at this
seat, twice**: … → **54** · **54**)"*; §0 row OP-0: *"**RED — 54 · 54.** HARD."*; §0's closing line
`:49`: *"**OP-0 is hard for the wave**"*; §Sequencing's cross-edge table `:231`: *"**KF.W4 —
DEPENDS ON (hard) — the sequencing head** · G-KFW4-1 GREEN before `.a`/`.b` open."* The RUNBOOK
states it twice more (§1.2's edge table — *"KF.W4 = head … 'No repair packet and no UNIT may open
before **G-KFW4-1** lands' — eight banked records state it independently"* — and, for the minted
three, *"all 17 sequence after G-KFW4-1"*). This seat re-measured that figure, unmoved, at a later
HEAD: **54 · 54**. **Under the spec that GOVERNS, the wave does not open. That is this seat's act,
and it is the conservative one.**

**The same two-reading conflict KF11-E1 and KF12-E1 returned is unresolved**: `execution/B/KF-W4.md`
CHECK 1 `:2191` / CHECK 2 `:2505` carry the verbatim row *"| **KF.W11 · W12 · W13** | §Sequencing
'No repair packet and no UNIT may open before **G-KFW4-1** lands' | the gate's **chassis landed** —
wired, running, on the merge path, its diagnostics owner-named | not blocked by this wave's RED;
they await the SS-1/SS-2 authoring block |"* — and that awaited condition **has landed**
(`f208ff31`, 2026-09-18). X.KF.W10's CHECK 1 event line (LEDGER `:317`) reads it the other way:
*"all three are **lawfully blocked** on `G-KFW4-1` GREEN."* **Two conformant readings, one head.**

**KF13-E1's new evidence — this wave's own decomposition of the 54, and it points the opposite way
from KF.W11's.** ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep 'error TS' | sed
's/(.*//' | sort | uniq -c | sort -rn` (double-run; the in-bounds count re-run separately → **5 ·
5**):

- **4 of the 54 sit inside KF.W13's own §B.2 writable rows** — `demo/app/dock/MbabbMenu.vue` ×2
  and `demo/components/instrument/transport/TransportDock.vue` ×2 — **7 %**, against KF.W11's
  **24** (`OrbitalDrag.vue` alone) and KF.W12's **13**. **A fifth sits on this wave's one declared
  cross-wave carve path**, `ChannelOptions.vue(272,34)` = **KF-CO-1 / KF.W12's OP-5**, which is
  KF.W12's row and this wave's carve.
- **All four in-bounds diagnostics are the type-level shadow of this wave's own named cures**,
  verbatim:
  - `MbabbMenu.vue(208,12)` and `(208,36)`: *"Property 'value' does not exist on type
    `StoredAnimationGroupControlOptions`"* — line `:208` is `stored.value.ppMode = !(stored.value.ppMode ?? false);`
    inside `togglePpMode()`, which is **exactly the `setPPMode` disposal named in MM-1/MM-6's
    four-part cure law** (§Scope 1: *"dispose `setPPMode` with the KF-APP-17 sweep"*).
  - `TransportDock.vue(366,9)`: *"`resetIconEl` is declared but its value is never read"* — `:366`
    is `const { resetIconEl, resetIconSpin } = useIconSpin();`, and **an unread ref is precisely
    TD-1's finding** (*"`instanceof HTMLElement` ×2 against a functional-lucide `SVGSVGElement`
    ref — 100 % dead"*). **The head's own diagnostic corroborates TD-1 independently.**
  - `TransportDock.vue(276,7)`: *"`menubarHostEl` is declared but its value is never read"* —
    `:276` is `const menubarHostEl = useMenubarMeasure();`, the **TD-34/TD-35 menubar-measure seam**.
- So for **this** wave the head's RED is neither a foreign blocker nor a large one: **it is the
  cure's own signature, four lines of it, and the wave's own G-KFW13-7 already carries `vue-tsc …
  → 0` as a close obligation.** Blocking KF.W13 on the head buys the least of the three waves and
  costs the most in sequence: KF.W13 is the last of the block and its two packets are the register's
  final two of seventeen.

**Two dispositions exist and neither is a seat's to take** — (a) blocked until a KF.W4 repair drives
54 → 0, which must widen KF.W4's bounds or hand these rows straight back to the waves that own them;
(b) the head read as CHASSIS-LANDED and the three minted waves open with the in-bounds diagnostics
as their own acceptance obligation, **which G-KFW13-7 already carries verbatim**. COHESION §0m.1
already ruled that remainder *"honest-RED with named owners … the UNIT packets KF.W12–13."* **This
seat does not choose; it measures, banks and returns.**

---

## Unit plan — 4 units, 3 phases, peak concurrency 2 (inside the four-workflow cap)

**Order (spec §Sequencing `:210-214`, binding)**: `.a ∥ .b → .c → .d`. Peak **2**.
**Tiering (M-12 TRI-FOLD; spec §Execution shape `:23`)**: *"`.a`'s proof-then-deletion and `.b`'s
remainder derivation are Fable-worker ∥ Opus-worker → fresh-Fable arbiter; `.c` and `.d` Opus
solo."*
**Worktrees (§Worktree plan `:128`)**: phase 1 in sibling worktrees `keyframes-kfw13-a` and
`keyframes-kfw13-b`, merged by the orchestrator; `.c` and `.d` serially on `master`. **No Cargo.**
**Disjointness (§Disjointness `:124`)**: `.a` = `demo/app/**` + `test/demo/app/**`; `.b` =
`transport/TransportDock*` + `AnimationControlsGroup/useControlsKeyboardShortcuts.ts` +
`playback/PlaybackRibbon.vue` + the `ChannelOptions.vue` carve + the two style rows +
`test/demo/instrument/**`. **TD-36's bytes are `.a`'s alone** (ChromeDock), which is what makes the
pair disjoint. `playback-idiom.css` and `playback-ribbon-contract.test.ts` are **`.b` → `.c`
serial**. The one cross-wave shared path, `ChannelOptions.vue`, is written by KF.W12 `.b` first and
by this `.b` (one carve) strictly after its close.
**Every unit**: receipt appended to THIS file with `SERVED MODEL` line 1, commands double-run,
SELF-COUNT, inherited paths named (CRASH-RECOVERY), out-of-bounds = ESCALATION returned.

| unit | phase | model | opens after | gates | spec sections |
|---|---|---|---|---|---|
| **KF.W13.a** dock-menu | 1 | fable (tri-fold) | OP-0 · OP-4 (by construction) | G-KFW13-0 · -1 · -2 | §Agent Units `:152-156` · §Scope 1 `:55` · §Carry P1 `:136-138` · §B.1 `:75-78`,`:83` · §B.2 `:91-94`,`:105-106`,`:111-112` · §B.3(1) `:120` · §Gates `:186`,`:188`,`:190` · §Sequencing 2 `:211` · §Commit plan 1 `:270` |
| **KF.W13.b** transport/ribbon | 1 | fable (tri-fold) | OP-0 · OP-6 (HARD, met) · **OP-2 for the C-2 joint commit alone** · OP-7 for TD-37 alone | G-KFW13-3 · -4 · -5 | §Agent Units `:158-162` · §Scope 2-3 `:56-57` · §Carry P2 `:140-144` · §B.1 `:78`,`:82` · §B.2 `:95-103`,`:107-110`,`:111-112` · §B.3(2)(4) `:120` · §Gates `:192`,`:194`,`:196` · §Sequencing 3 `:212` · §Commit plan 2 `:271` |
| **KF.W13.c** two-deletion act | 2 | opus | `.b` (shared `playback-idiom.css`) · OP-5 | G-KFW13-6 | §Agent Units `:164-168` · §Scope 4 `:58` · §0 OP-5 `:44` · §B.1 `:81-82` · §B.2 `:103-104`,`:109`,`:111-112` · §B.3(3) `:120` · §Gates `:198` · §Sequencing 4 `:213` · §Commit plan 3 `:272` |
| **KF.W13.d** close | 3 | opus | `.a` · `.b` · `.c` | G-KFW13-7 | §Agent Units `:170-174` · §Scope 5 `:59` · §B.2 `:111-114` · §Gates `:200` · §Sequencing locks `:216-225` · §Commit plan 4 `:273` · §Format `:277` |

### KF.W13.a — The Dock-Menu Packet (phase 1, Fable-worker ∥ Opus-worker → fresh-Fable arbiter)

**Writable** (kf): `demo/app/dock/ChromeDock.vue` · `demo/app/dock/MbabbMenu.vue` ·
`demo/app/dock/index.ts` (**carve** — only if the self-hold changes the barrel surface) ·
`demo/app/App.vue` (**carve** — `:29`/`:37`/`:369`/`:372` and the consumed KF-APP-1 motion's
`:100`-class repair, delete arm only) · `test/demo/app/dock-context-slot-resolution.test.ts`
(**create**) · `test/demo/app/mbabb-menu-self-hold.test.ts` (**create**). (value.js):
`docs/tranches/X/execution/B/KF-W13.md` (append) · `docs/tranches/X/keyframes/evidence/W13/**`
(create).
**Locks**: **L-1 — no deletion before the proof** (commit 1 carries **zero `demo/**` bytes**;
G-KFW13-0's byte clause checks it); **M-4's deletion + the self-hold + the corrected comments + the
KEPT `v-model:open`/`defineModel` binding are ONE sha** — *the rider is not a follow-up*, and a
commit driving `grep -c 'v-model:open="open"'` to 0 while OP-3's Boolean-cast stands has shipped the
unopenable menu the rider exists to prevent; **MM-1/MM-6's four-part cure is ONE sha** under
**ARB-1 delete-arm-only** — the `headerLeft` 'fill' arm is a **TRAP** and a `headerLeft` hit in this
wave's `demo/app` diff is a HIGH defect (G-KFW13-2); **OP-8** — `ComponentExposed<>`/`Pick<>` must
not appear; **TD-36 = one identity, one home** (its bytes are ChromeDock's, spent here, named by
both routing blocks and booked once).
**Brief**: State OP-3's dist measurement first (glass 7.0.0, 5 bare `{ type: Boolean }`, no
defaults → the rider's obligation unchanged). **Commit 1, no product byte**: author
`dock-context-slot-resolution.test.ts` so slot content mounted inside a `GlassDock` provider calls
`useOptionalDockContext()` and receives that provider's context (non-null, `keepOpen()`/`release()`
callable and observable on `expanded`); bank its output at `evidence/W13/`. **Commit 2, ONE sha**:
delete M-4's five code sites (`App.vue:29`·`:37`·`:372`, `ChromeDock.vue:114`·`:237`), correct the
two prose sites (`App.vue:369`, `MbabbMenu.vue:186`), delete-or-correct the false-mechanism claim at
`ChromeDock.vue:109-113`, make MbabbMenu self-hold via `useOptionalDockContext()` on the `/dock`
subpath it already imports (`:192`), **KEEP `:4` and `:204`**, and name `i-2`'s unpaired `release()`
as dying with the `Math.max(0, …)` clamp it rode on. Then MM-1/MM-6's four-part edit (repair `:100`,
dispose `setPPMode` with the KF-APP-17 sweep, resolve the C-14 bucket split, land the MM-5
CheckboxItem) in ONE edit, delete arm only; then the `:169` twenty-seven-row family
(MM-2·3·5·7·8·9·10·11·12·13·16·17·18·19·20·21·22·24·25·26·29·30·31·32·39·40·42) incl. MM-29's two
`normal-case` sites at `:5-14`; then TD-36's `:299`/`:302` pair; then the ChromeDock chrome roster
by id (§Scope 1's list), each **LANDED / KILLED-with-rationale / carried**, never dropped. Record the
producer ask for `.d`'s SS-6 relay. `git log` order must read G-KFW13-0 → -1 → -2.

### KF.W13.b — The Transport/Ribbon Packet (phase 1, Fable-worker ∥ Opus-worker → fresh-Fable arbiter)

**Writable** (kf): `demo/components/instrument/transport/TransportDock.vue` ·
`…/TransportDock/usePlayActuation.ts` · `…/TransportDock/useIconSpin.ts` ·
`…/TransportDock/useMenubarMeasure.ts` (**carve** — TD-34/35 only) ·
`…/AnimationControlsGroup/useControlsKeyboardShortcuts.ts` (TD-40: `:50`'s Space registration
scoped away from button targets) · `demo/components/playback/PlaybackRibbon.vue` ·
`…/transport/channel-controls/ChannelOptions.vue` (**carve — the KF-CO-15 extension ONLY, in the
C-2 joint commit, AFTER KF.W12 `.b` closes**) · `demo/styles/font-roles.json` (**carve** — `:12`'s
`.btn-playback` selector row, only if TD-39's rename lands) · `demo/styles/playback-idiom.css`
(**N-3's `:78-80` deletion and D-12's stopgap only — serial → `.c`**) ·
`test/demo/instrument/transport-keyboard-propagation.test.ts` (**create**) ·
`…/transport-icon-spin.test.ts` (**create**) · `…/playback-ribbon-contract.test.ts` (**create**) ·
`…/transport-play-actuation.test.ts` (**modify** — cases added, the ten `it(` never weakened).
(value.js): this record (append) · `evidence/W13/**`.
**Locks**: **KF-AV-28 / PR-CAUTION** — state the KEEP verdict first (six KEEP-BESPOKE, zero SWAP,
`4c03ceda`), emit **zero** `DISCHARGED by KF.W7 SWAP verdict …` receipts, and cure **ON** the glass
`Slider` the ribbon already consumes — no bespoke swap, no wrapper, no copied producer selector;
**three one-commit families, unsplit** — (1) TD-2 + TD-38 + TD-40, (2) TD-21 + TD-41, (3) TD-1 +
TD-4 + PRM + test; **a member already landed upstream does not dissolve the bundle for the rest**;
**C-2 + KF-CO-15 = ONE joint sha** naming `PlaybackRibbon.vue` AND `ChannelOptions.vue`, opened on
KF.W12 `.b`'s close sha; **N-3's `:active` deletion is its own sha with its own census** (LAW A);
**OP-7 gates TD-37 alone** — unruled today, so land it only with the ruling or return
`complete_with_misses` naming it.
**Brief**: First act, before any TD byte — **OP-6's remainder derivation, receipted**: what
`usePlayActuation.ts:39-83` already implements of TD-38's Space/keyup semantics, and what therefore
remains of TD-2/TD-38/TD-40; print the `.stop` census on both mirrors (TransportDock **5**,
ChromeDock **0**) before and after. Re-measure `useDragCapture`'s consumer at `PlaybackRibbon.vue:93`/`:137`
(KF.W11 `.i` writes that composable; its exported surface is unchanged). Then P2's families in
order: one propagation policy **written down once** and symmetric on both mirrors (symmetry is the
invariant, not `.stop`), Space scoped away from button targets, composition tests that mount the
buttons **WITH** the registry; the cancellation arm (per-control origin, release-elsewhere cleanup,
blur disarm, orphan-keyup, stale-id — the `blur|orphan|stale` clause must reach ≥ 3); the icon spin
(`instanceof HTMLElement` ×2 → 0 against the functional-lucide `SVGSVGElement` ref, TD-4's eager
`kfEngine()` + teardown, TD-17's typed refs); TD-37 (if ruled) · TD-39 (with TD-5/TD-28's prose
pass and `font-roles.json:12` if the rename lands) · TD-34/35. Then the ribbon: the C-2 joint
commit; D-1 + C-3 + C-4 (name, `valueCommit`, `:step` — the three bindings glass-ui already
forwards); D-5(+M-6) · D-6 · D-10 · L-M1 (delete the wrapper touch gate — the producer's Slider owns
`useTouchGate`; `gatedSliderDown` **2** → 0); one pressed authority (D-8/N-1/D-15); D-2's visible
playhead; the hygiene sweep incl. D-20/D-25's five false comments; N-3's own-sha deletion; D-12's
stopgap. Each family's sha listed with `git show --stat` proving it unsplit.

### KF.W13.c — The Two-Deletion Act (phase 2, Opus solo, serial after `.b`)

**Writable** (kf): `demo/styles/playback-idiom.css` (`:74-77`) · `demo/styles/design-idioms.css`
(**carve** — `:106-116` in the SAME act, nothing else in the file) ·
`test/demo/instrument/playback-ribbon-contract.test.ts` (**extend**). (value.js): this record
(append) · `evidence/W13/**`.
**Locks**: **K-5 — ONE commit naming BOTH stylesheets**; a sha touching one is the K-5 violation
(*one deletion fixes nothing*) and **fails G-KFW13-6 even if the tree is green**; **the
re-derivation receipt PRECEDES the sha** (OP-5); serial after `.b` on the shared `playback-idiom.css`.
**Brief**: Re-read KF-W9's G-KFW9-9 statement and KF.W6's KF-KE-30 block at open. Re-derive the
redundancy ground for **both** selectors at the frontier — `.btn-playback:focus-visible`
(`playback-idiom.css:74-77`, `box-shadow: var(--focus-ring-shadow); outline: none;`) and
`.kf-focus-ring:focus-visible` (`design-idioms.css:106-109`, **whose forced-colors parity at
`:111-116` KF.W6 added and ruled load-bearing** — note the frontier `grep -c 'outline'` over
`:106,116` reads **3**, not the spec's 2, because `outline-offset: 2px;` is in the span; the spec is
NOT edited). Paste both consumer censuses together in one receipt. Land whatever the re-derivation
finds — a deletion, or the forced-colors parity the counterpart already carries — as **ONE commit
naming both stylesheets**; never a silent single-file edit where the bank named two, and never a
deletion of a rule KF.W6 ruled load-bearing without saying so. Add the focus-affordance case to
`playback-ribbon-contract.test.ts` (a focused Play button carries a focus indicator under
`forced-colors: active`, with no demo-owned unlayered rule defeating it). Print G-KFW13-7's sweep
denominators beside RULINGS-4's. Hand the AFTER witness to KF.W9 by row id (S-9).

### KF.W13.d — Close (phase 3, Opus solo, serial, last)

**Writable** (value.js only): `docs/tranches/X/execution/B/KF-W13.md` ·
`docs/tranches/X/execution/LEDGER.md` (**this wave's row cells + appended lines ONLY**) ·
`docs/tranches/V/coordination/INBOX.md` (append) · `docs/tranches/X/COHESION.md` **§4a** (the SS-6
accretion register, append rows only — `:376-390`) · `docs/tranches/X/keyframes/evidence/W13/**`.
**Locks**: the discharge set stated **positively as EMPTY** — ⟨cmd⟩ `grep -c 'DISCHARGED by KF.W7
SWAP verdict' execution/B/KF-W13.md` must read **0**; **E-3** — RULINGS-4's **7** and **4** quoted
beside the frontier's **8** and **2**, **neither amended**; the eighth `btn-playback` file
(`KeyframeTimeline.vue`, KF.W7's) and the two bare `.focus-ring` sites (`SpringTarget.vue:63`,
`SquareScene.vue:46`, KF.W11's) **counted and routed, never edited**; every producer row relayed to
SS-6 and **none cured demo-side** (a demo-side cure of a producer defect is a HIGH defect).
**Brief**: Re-run all eight gates double at the close's own clock, including OP-0's `vue-tsc → 0`
and the skip census (`git diff <open-sha>..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('` →
0). Audit every sha with `git show --stat` against §Bounds, **proving each declared family unsplit**
(the proof commit product-byte-free; M-4+rider one sha; the three TD families; the C-2 joint commit;
N-3's own sha; the two-deletion act); `dev.sh` in 0 commits. Append the SS-6 accretion rows — first
the `default: undefined` ask for `dropdown-menu`'s `open`/`modal`/`defaultOpen` Boolean props (with
the dist measurement and the date; the rider is the demo-side *accommodation*, not the fix, and the
relay says so), plus any PlaybackRibbon/Slider naming-seam rows — each with zero demo-side
workaround in the diff. E13 four-path sweep. Every id in §Carry read LANDED / KILLED-with-rationale
/ carried. Residuals and escalations named (OP-7's ruling if still absent). LEDGER row cells + the
event line.

### Dispatch note

**This plan is BANKED, NOT DISPATCHED.** `groups` is returned **EMPTY** and no unit was spawned: the
wave's one wave-level HARD precondition is RED and `KF13-E1` is unresolved. On a grant (or on
`G-KFW4-1` landing GREEN), the dispatch order is exactly the table above — **`[.a, .b]` → `[.c]` →
`[.d]`**, peak 2 — with `.b`'s **C-2 joint commit alone** additionally requiring KF.W12 `.b`'s close
sha, which does not yet exist, and `.b`'s **TD-37 row alone** additionally requiring OP-7's design
ruling, which is not in COHESION §0i–§0t.

---

## Unit receipts

*(empty — no unit was dispatched; the wave did not open)*

---
---

# RE-OPEN — THE SECOND SITTING (opened 2026-09-19, COMPLETED 2026-09-20; sitting of record 2026-09-17, the owner's begin-word)

**SERVED MODEL (this sitting's seat 0): `claude-opus-5[1m]`.**
**Wave status at this seat: OPEN.** The first sitting's `BLOCKED-ON OP-0` block above is kept
WHOLE and is **not edited** (E-3) — it is superseded **by ruling, not by re-measurement**.

### CRASH-RECOVERY DISCLOSURE — this block was INHERITED half-written and every figure re-measured

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` at this seat's first act named
**`M docs/tranches/X/execution/B/KF-W13.md`** — a path inside this seat's own writable set, and
therefore a **killed predecessor seat's partial work on this unit** (⟨cmd⟩ `git diff --stat …` →
`1 file changed, 135 insertions(+)`; the hunk ran from the `RE-OPEN` header to the end of the mail
sweep and stopped — no `## Baseline`, no `## Unit plan`, no LEDGER edit, no commit). The inherited
hunk was read WHOLE and judged clause by clause. **What conforms is kept**: the §0u reading, the
three quoted operative clauses, the chassis receipt, the section shape. **What did not conform is
rewritten, not annotated**: the predecessor measured a substrate that has since moved — it banked kf
`HEAD` = `2a0afe7a` with **4 unpushed** commits and `origin/master` = `c82f92ea`, i.e. KF.W12 `.e`
**in flight**; at this seat KF.W12 is **CLOSED and PUSHED** and the sacred checkout is clean at
`2736b5e5`. Its crash-recovery row (`M KeyframesStringControls.vue`) and its mail census (**81**
rows) are likewise stale. **Every figure below is this seat's own, double-run, at its own clock; no
predecessor figure is carried forward, and none is left standing uncorrected.** Inherited path
named: `docs/tranches/X/execution/B/KF-W13.md`. Nothing stashed, nothing blanket-restored, no dirty
path outside this seat's writable set touched.

## Open (second sitting)

**The ruling that opens this wave — COHESION §0u (`085b2121`), read whole.** It is addressed to
this wave by name: *"§0u ADDENDUM 2026-09-19 — KF.W11 · KF.W12 · KF.W13's OP-0 (G-KFW4-1 GREEN) IS
CIRCULAR AS A COUNT; RULED AS A RATCHET"*, and it disposes **ESCALATION KF13-E1** exactly as it
disposed KF11-E1 and KF12-E1: *"A count-zero precondition whose residue lives inside the blocked
waves' own rows cannot be met by any lawful seat: **disposition (b), the chassis-landed reading, as
a dated addendum-beside (E-3).**"* Its three operative clauses, quoted:

1. *"The precondition each of the three waves checks at open is the **chassis**: `vue-tsc` wired as
   a blocking leg of `npm run check` on the merge path (G-KFW4-1's WIRED half, GREEN since KF.W4)."*
2. *"Each wave banks the count at its open and **may not raise it**; every unit **zeroes the
   diagnostics inside its own §Bounds rows** as part of the cure that owns them … `@ts-expect-error`,
   `as`, and `// eslint-disable` are REFUSED as cures."*
3. *"**The count reads 0 at KF.W13's close**, which asserts it double-run; G-KFW4-1 turns GREEN
   there and KF.W4's row gains the dated note."*

**KF13-E1 is DISCHARGED BY THAT RULING.** This seat re-opens the wave on §0u and re-banks
everything at its own clock; nothing is inherited from the first sitting's figures.

**Chassis verified WIRED at this seat** (§0u clause 1, the thing OP-0 actually checks) — ⟨cmd⟩
`grep -n '"check"' /Users/mkbabb/Programming/keyframes.js/package.json` → **`:37`**
`"check": "vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run
proof:structure"` — `vue-tsc` is the FIRST, `&&`-blocking leg. **WIRED.**

### Substrate, named and never assumed

keyframes.js sacred checkout `/Users/mkbabb/Programming/keyframes.js`, branch `master` (COHESION
§0j.C KF-WRITE (b)). ⟨cmd⟩ `git -C … rev-parse --short=8 HEAD` → **`2736b5e5`** ·
⟨cmd⟩ `… rev-parse --short=8 origin/master` → **`2736b5e5`** · ⟨cmd⟩ `git rev-list --count
origin/master..HEAD` → **0**. **Local == remote; nothing unpushed, no sibling seat in flight in this
tree.** `2736b5e5` is KF.W12's own SECOND-CLOSE head (⟨cmd⟩ `git log --oneline -1` → `test(kf/axis ·
X.KF.W12.f · G-KFW12-6 — cube-axis-reveal, 11 cases, born-RED cured)`). value.js on `tranche-u`.

**Drift from the spec's ref of record** — ⟨cmd⟩ `git rev-list --count 69095552..HEAD` → **122**
(7 at the first sitting, 116 at the inherited partial). **And yet the wave's own surface has not
moved**: per-path
⟨cmd⟩ `git log --oneline 69095552..HEAD -- <path> | wc -l` over all fourteen non-`create` §B.2 rows →
**0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0** for thirteen of them (`ChromeDock.vue` ·
`MbabbMenu.vue` · `dock/index.ts` · `App.vue` · `TransportDock.vue` · `usePlayActuation.ts` ·
`useIconSpin.ts` · `useMenubarMeasure.ts` · `useControlsKeyboardShortcuts.ts` · `PlaybackRibbon.vue`
· `playback-idiom.css` · `design-idioms.css` · `font-roles.json` · `transport-play-actuation.test.ts`)
and **5** for the fourteenth, `ChannelOptions.vue` — **the declared cross-edge, and the one the
spec predicted** (KF.W12 `.b`'s five STEP commits). Its `wc -l` moves **731 → 849**; every other
§B.2 `wc -l` is identical to the spec's figure (12 of 12).

### Crash-recovery (standing law, first act of this sitting)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 rows**, both
untracked value.js-delivered mail packets under `docs/tranches/V/coordination/`
(`VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md`,
`…-2026-07-27-library-band-r1-widened-k1-k4.md`) — **OUTSIDE every KF.W13 writable row**, not
touched, not stashed. The predecessor's `M KeyframesStringControls.vue` row is GONE: KF.W12 `.e`
landed and the sacred checkout is clean of product edits.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain -- <this seat's four writable
paths>` → **one row: `M docs/tranches/X/execution/B/KF-W13.md` — this seat's OWN unit path, the
killed predecessor's 135-line partial**, adjudicated whole at the disclosure block above (kept where
it conforms, rewritten where its substrate moved). `LEDGER.md` and `INBOX.md` are **clean** at this
act. The eighteen other dirty rows in the repo (`demo/**`, `e2e/**`, `docs/tranches/V/reformation/
CARRY-LEDGER.md`, `docs/tranches/X/execution/A/X-W5.md`, `A/X-W9.md`, and `scripts/dev/dev.sh`) are
**sibling seats' and the standing unowned arrangement** — none is inside this seat's writable set,
none is touched, none is staged. **Nothing stashed, nothing blanket-restored, no `reset`.**

### E13 Step-0 — the four-path mail sweep, re-run at this seat's clock

Classification read from each row's **Status cell by position — and by its LEADING TOKEN**, never by
a bare `grep -i unread`; `INBOX.md` self-excluded. The two INBOX tables have different widths
(`| # | Date | From | Letter | Status | Owner |` at `:41`, six cells; `| # | Date | To | Letter |
Status |` at `:66`, five), and Letter cells carry inline `|` inside code spans, so the Status cell is
addressed **from the back, per table**: `$(NF-2)` for an `I-` row, `$(NF-1)` for an `O-` row.

1. **`docs/tranches/V/` + `V/coordination/`** — ⟨cmd⟩ `/bin/ls -t …/*.md | head -8` → `INBOX.md`
   (self) then the five 2026-09-18 letters, all ours, **all rowed** (⟨cmd⟩ `grep -c '<basename>'
   INBOX.md` → `2 · 1 · 1 · 1 · 1`).
2. **`../glass-ui/docs/tranches/BK/coordination/`** — **BK re-confirmed the newest glass tranche
   dir**: ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -4` → `BK/` · `BJ/` · `BI/` ·
   `IOS27-MICRO/`. Newest letter `glass-outbound-2026-09-18-valuejs-o26-reply.md` → rowed (**37**
   hits). Path and tail **UNMOVED**.
3. **`../keyframes.js/docs/tranches/V/coordination/`** — newest letter
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` → rowed (**32**); ours, delivered.
4. **`../sci-report/atlas/docs/tranches/P/coordination/`** — newest
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` → rowed (**25**); ours; path UNMOVED.

**Result: ZERO unrowed letters addressed to value.js · ZERO new `I-n` · ZERO UNREAD.** ⟨cmd⟩
`grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **82** rows (78 at the first sitting, 81 at the
inherited partial, 82 at KF.W12's third close) = **37 `I-` + 45 `O-`**; register tail **I-35 /
O-42** (the newest three are Track D's X·P release/adjudication/producer-cure relays, not ours).

**The UNREAD read, stated whole because a bare grep gets it wrong.** ⟨cmd⟩
`grep -c 'UNREAD' INBOX.md` finds the word in **6** rows — and **all six are prose inside a Status
cell whose verb is something else**: `O-20` (*"two UNREAD glass 08-09 letters found this boundary"*,
verb **SENT**), `I-30` (**ROWED**), `I-31` (**FOLDED**), `I-32` (**READ IN FULL + ROUTED**), `I-35`
(**READ + FOLDED**), `O-39` (**SENT**). The positional leading-token read —
⟨cmd⟩ `awk -F'|' '/^\| I-[0-9]+[a-z]? \|/{s=$(NF-2)} /^\| O-[0-9]+[a-z]? \|/{s=$(NF-1)}
/^\| [IO]-[0-9]+[a-z]? \|/{gsub(/[*` ]/,"",s); if (substr(s,1,6)=="UNREAD") print $2}' INBOX.md
| wc -l` → **0 · 0** — is the one that decides. **ZERO UNREAD; no `I-n` is owed.** A dated sweep
line is appended at `INBOX.md`'s end.

### Preconditions, re-measured at this seat's clock (every `Opens after` name, at the bytes AND in the ledger)

| # | precondition | this seat's measurement (double-run) | verdict |
|---|---|---|---|
| **OP-0** | `G-KFW4-1` GREEN — the head | **RULED A RATCHET (COHESION §0u `085b2121`).** Chassis WIRED (above). Count banked: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` → **12 · 12**. | **MET AS RULED** — the ratchet's floor for this wave is **12**; it may not rise. |
| **OP-1** | KF.W7's per-surface SWAP verdicts — six KEEP-BESPOKE, zero SWAP, discharge set EMPTY | ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js cat-file -t 4c03ceda` → `commit`; LEDGER KF.W7 = **CLOSED 2026-09-17**. | **MET** — both packets UN-GATED; zero discharge receipts may be emitted (G-7's clause). |
| **OP-2** | LP-1's write→render edge (KF.W12 `.b`) | **NOW LANDED.** ⟨cmd⟩ `git log --oneline --all \| grep 'X.KF.W12.b'` → **8 commits**, headed by **`98675047`** *"STEP 1 — KF-CO-1 ×4 + KF-CO-8 + **LP-1**, capability restorations ON the render edge … a layer write re-reads the whole prop surface from the engine"* and closed by **`2cd314af`** (`.b`'s G-KFW12-2 test commit). LEDGER KF.W12 = **PARTIAL 2026-09-19**, `.b` CLOSED. | **MET** — `.b`'s C-2/KF-CO-15 **joint commit is UNBLOCKED** and opens on `2cd314af`. *(This is the single biggest change since the first sitting: the one row that was gated is now free.)* |
| **OP-3** | the glass-ui producer facts the MUST-CARRY rider rests on | **THE PREMISE HAS CHANGED — re-measured at the installed dist, READ-ONLY.** The chunk was rebuilt (⟨cmd⟩ `ls node_modules/@mkbabb/glass-ui/dist/dropdown-menu-*.js` → **`dropdown-menu-BlbnvMaZ.js`**, 12,925 B, mtime **Sep 19 03:02** — was `dropdown-menu-0gkd7rMF.js`; ⟨cmd⟩ `node -p "require('…/package.json').version"` → **7.0.0**, unchanged). The first sitting's command now reads **0 · 0** because the declarations moved AND gained defaults: ⟨cmd⟩ `sed -n '20,31p' …/dropdown-menu-BlbnvMaZ.js` → `open: { type: Boolean, default: void 0 }` · `defaultOpen: { type: Boolean, default: void 0 }` · `modal: { type: Boolean, default: !0 }`; ⟨cmd⟩ `grep -c 'default: void 0' …` → **3 · 3**. | **RE-MEASURED; THE OBLIGATION IS UNCHANGED.** The spec's own OP-3 anticipated this word for word: *"If the producer has shipped defaults by then, the rider's **shape** changes … **but the rider's obligation does not: the menu must open after M-4's cure, proven by G-KFW13-1's runtime clause**, never by a byte."* **`KF-W13.md` is dated and IMMUTABLE — G-KFW13-1's MUST-CARRY byte clause (`v-model:open="open"` must STILL read 1) is NOT relaxed by this seat** (E-3); a relaxation is an owner/ruling act, and the runtime clause is the one that decides. Booked as GREEN-BEFORE-CURE (5) and as a **live input to `.d`'s SS-6 relay** — the ask may already be discharged at the producer, which the relay states rather than re-asks. |
| **OP-4** | the self-hold mechanism M-4's deletion rests on | ⟨cmd⟩ `grep -rn 'useOptionalDockContext' demo` → **one hit, and it is the false comment itself** (`demo/app/dock/ChromeDock.vue:110`); ⟨cmd⟩ `grep -n 'useOptionalDockContext' node_modules/@mkbabb/glass-ui/dist/components/dock/index.d.ts` → **`:12`** (exported); ⟨cmd⟩ `grep -n 'glass-ui/dock' demo/app/dock/MbabbMenu.vue` → **`:192`**. | **REACHABLE, UNEXECUTED — unmoved from the spec's own reading.** HARD **for the deletion**, satisfied by construction: `.a`'s G-KFW13-0 proof commit executes the predicate before a site is deleted (L-1). |
| **OP-5** | G-KFW9-9's witness pair + the re-derivation obligation | ⟨cmd⟩ `grep -n 'focus-visible' demo/styles/playback-idiom.css` → **`:74 .btn-playback:focus-visible`**; ⟨cmd⟩ `… design-idioms.css` → **`:106 .kf-focus-ring:focus-visible`** + the `@media (forced-colors: active)` block at **`:111-116`** (selector at `:112`). ⟨cmd⟩ `git log --oneline 69095552..HEAD -- <both files>` → *(no output)* — **byte-identical to the spec's ref.** LEDGER KF.W6 = CLOSED, KF.W9 = CLOSED (PARTIAL). | **MET; the obligation stands** — `.c` re-derives the ground for BOTH selectors before the sha and lands ONE commit naming both stylesheets. |
| **OP-6** | KF.W8's extracted composables; part of the TD keyboard family already landed inside them | ⟨cmd⟩ `grep -c '\.stop' …/TransportDock.vue` → **5 · 5**; `… ChromeDock.vue` → **0 · 0** (the asymmetry, live). `wc -l` **88 · 29 · 28**, identical to §B.2. LEDGER KF.W8 = CLOSED. | **MET; HARD for `.b`** — `.b`'s FIRST act is the remainder derivation against landed code, receipted, **before any TD byte**. |
| **OP-7** | TD-37 — one face order — is an SS-2 DESIGN DECISION | ⟨cmd⟩ `grep -n 'TD-37\|face order' docs/tranches/X/COHESION.md` → *(no output)*, **read to the file end — 1,792 L, through §0ab (`.f2`)**, i.e. every addendum §0i–§0ab. | **STILL UNRULED — OWNER/DESIGN's.** `.b` lands TD-37 **only** with the ruling in hand; otherwise `complete_with_misses` naming it. Gates **one row**, never the wave. |
| **OP-8** | R3-1's kill is RATIFIED; the `ComponentExposed<>`/`Pick<>` remedies MUST NOT LAND | STANDING; enforced as a byte clause inside G-KFW13-1. | **STANDING** — a constraint on `.a`, not an open-blocker. |

**Ledger-side reading of every `Opens after` name** (Track B rows, read at this seat's clock):
**KF.W4** `CLOSED 2026-09-17 (honest-RED: G-KFW4-1 …)` — the head's gate is *carried* RED and is
**ruled a ratchet** · **KF.W7** `CLOSED 2026-09-17` · **KF.W6** `CLOSED 2026-09-17 (honest-RED)` ·
**KF.W8** `CLOSED 2026-09-17 (honest-RED)` · **KF.W9** `CLOSED … PARTIAL` (witness pair READ-ONLY
there) · **KF.W11** `CLOSED 2026-09-19` (its hand-off printed: *"KF.W13 finds `useDragCapture`'s
exported surface unchanged and `PlaybackRibbon.vue` never edited"* — **both re-verified true here**,
0 commits on `PlaybackRibbon.vue` since `69095552`) · **KF.W12** `PARTIAL 2026-09-19` with `.b`
CLOSED (OP-2). **ALL MET.**

### The §0u ratchet — banked at 12, homed by file

⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep 'error TS' | sed 's/(.*//' | sort | uniq -c
| sort -rn`, double-run, **12 · 12** (was 54 at KF.W11's open, 24 at KF.W12's, 14 at KF.W12's close):

| # | diagnostic | home |
|---|---|---|
| 2 | `demo/app/dock/MbabbMenu.vue(208,12)` + `(208,36)` TS2339 `Property 'value' does not exist on type 'StoredAnimationGroupControlOptions'` | **KF.W13 `.a`** — its own §B.2 modify row |
| 3 | `…/transport/TransportDock.vue(95,34)` TS2322 `'string \| null' → 'SelectionValue'` (KF.W11's **j-R4** homed this one here by name) · `(276,7)` TS6133 `'menubarHostEl'` · `(366,9)` TS6133 `'resetIconEl'` | **KF.W13 `.b`** — its own §B.2 modify row |
| 1 | `…/keyframes/composables/useKeyframeOps.ts(91,13)` TS2322 | **KF.W12** (its §B.2 row; `.e` in flight) |
| 3 | `demo/scenes/easing/useEasingDemo.ts(294,13)` + `(310,43)` · `…/instrument/shell/EditorShell.vue(175,10)` | **KF.W11 `.r`**'s unowned-remainder set (§0u part 3) |
| 3 | `src/animation/group/composite/compositor.ts(79,11)` · `src/animation/group/waapi.ts(9,1)` · `src/animation/physics/smooth.ts(194,13)` — all TS6133 | **KF11-E2, still open** — `src/**` is wave-invalidating for KF.W13 too (§Excluded) |

**`.a` owes 2 → 0 and `.b` owes 3 → 0, each zeroed BY the cure that owns it** (§0u clause 2 —
`@ts-expect-error`, `as` and `// eslint-disable` are REFUSED as cures). **Stated at open, not left
for the close: §0u part (3)'s literal `0` at KF.W13's close CANNOT be met by this wave alone.**
Five of the twelve are KF.W13's; **seven are not, and three of those seven are `src/**` rows this
wave may not write without invalidating itself.** The wave's honest reach is **12 → 7**; the
remaining seven are owned by KF.W12 (1), KF.W11 `.r` (3) and **KF11-E2** (3). `.d` states this at
the close with the owners named rather than claiming a zero it cannot produce.

---

## Baseline (second sitting) — the eight gates, run READ-ONLY at kf `2736b5e5`, double-run

Every command below was run by **this seat**, from `/Users/mkbabb/Programming/keyframes.js`, with a
clean sacred checkout (`status --porcelain` = 2 untracked mail packets only) and **no product byte
written**. Runs 1 and 2 are byte-identical unless a cell says otherwise.

| gate | command (abridged; §Gates is the authority) | BEFORE (this seat, double-run) | verdict |
|---|---|---|---|
| **G-KFW13-0** | `npx vitest run --project demo test/demo/app/dock-context-slot-resolution.test.ts` | `No test files found, exiting with code 1` · ×2. ⟨cmd⟩ `ls test/demo/app/` → `e-w1-encapsulation.test.ts` **only** | **RED (born)** |
| **G-KFW13-1** | `npx vitest run --project demo test/demo/app/mbabb-menu-self-hold.test.ts` | `No test files found, exiting with code 1` · ×2 | **RED (born)** |
| **G-KFW13-2** | the roster clause (no roster commit exists) + `git diff <open>..HEAD -- demo/app \| grep -c headerLeft` | RED **by construction**; the diff is empty at open, so the `headerLeft` count is **0** on an empty denominator — it becomes meaningful only once `.a` commits | **RED (born)** |
| **G-KFW13-3** | `npx vitest run --project demo test/demo/instrument/transport-keyboard-propagation.test.ts` | `No test files found, exiting with code 1` · ×2 | **RED (born)** |
| **G-KFW13-4** | `npx vitest run --project demo test/demo/instrument/transport-play-actuation.test.ts test/demo/instrument/transport-icon-spin.test.ts` | `Test Files 1 passed (1)` · `Tests 10 passed (10)` ×2 — **the actuation file's ten `it(` pass; `transport-icon-spin.test.ts` is ABSENT** and is silently dropped from the filter rather than reported (one filter matched), so the gate's RED is carried by the absent file + both byte clauses | **RED (born)** |
| **G-KFW13-5** | `npx vitest run --project demo test/demo/instrument/playback-ribbon-contract.test.ts` | `No test files found, exiting with code 1` · ×2 | **RED (born)** |
| **G-KFW13-6** | `grep -c 'box-shadow: var(--focus-ring-shadow)' demo/styles/playback-idiom.css` · `sed -n '106,116p' demo/styles/design-idioms.css \| grep -c 'outline'` | **1 · 1** and **3 · 3** — the act has not landed; **the second figure is 3, not the spec's 2** (§Drift D-1 below) | **RED (born)** |
| **G-KFW13-7** | `git grep -l 'btn-playback' HEAD -- demo \| wc -l` · the `.focus-ring` class sweep · `npm run test:demo \| tail -3` · `npx vue-tsc … \| grep -c 'error TS'` | **8 · 8** · **0 · 0** (spec says 2 — §Drift D-2) · `Test Files 2 failed \| 52 passed (54)` / `Tests 2 failed \| 453 passed (455)` ×2 · `12 · 12` | **RED (born)** |

**All eight born RED at this seat's own clock. `greenBeforeCure` at this sitting: EMPTY** — no gate
verdict is GREEN before its cure. (The first sitting's three R.2 bookings are *clauses* and *riders*
inside still-RED gates, not gate verdicts; they are re-stated under §GREEN-BEFORE-CURE below and
carried, never claimed.)

### Byte clauses — every §Gates figure re-measured at this seat, double-run

| clause | spec's authoring figure (`69095552`) | this seat (`2736b5e5`), ×2 | reads |
|---|---|---|---|
| G-1 round-trip `grep -rn 'itemsPopupOpen\|items-popup-open\|mbabbPopupOpen' demo \| wc -l` | 7 | **7 · 7** | identical |
| G-1 MUST-CARRY `grep -c 'v-model:open="open"' MbabbMenu.vue` | 1 | **1 · 1** | identical |
| G-1 false prose `sed -n '109,113p' ChromeDock.vue \| grep -c 'cannot hold the dock open'` | 1 | **1 · 1** | identical |
| G-3 `.stop` on `TransportDock.vue` | 5 | **5 · 5** | identical |
| G-3 `.stop` on `ChromeDock.vue` (the asymmetry) | 0 | **0 · 0** | identical |
| G-3 `grep -c 'registerShortcut("Space"' useControlsKeyboardShortcuts.ts` | 1 | **1 · 1** | identical |
| G-4 `grep -c 'instanceof HTMLElement' useIconSpin.ts` | 2 | **2 · 2** | identical |
| G-4 `grep -c 'blur\|orphan\|stale' transport-play-actuation.test.ts` | 0 | **0 · 0** | identical |
| G-4 `grep -c 'it(' transport-play-actuation.test.ts` | 10 | **10 · 10** | identical |
| G-5 `grep -c 'aria-label' PlaybackRibbon.vue` | 0 | **0 · 0** | identical |
| G-5 `grep -c 'valueCommit\|value-commit' PlaybackRibbon.vue` | 0 | **0 · 0** | identical |
| G-5 `grep -c ':step' PlaybackRibbon.vue` | 0 | **0 · 0** | identical |
| G-5 `grep -c 'gatedSliderDown' PlaybackRibbon.vue` | 2 | **2 · 2** | identical |
| G-6 `grep -c 'box-shadow: var(--focus-ring-shadow)' playback-idiom.css` | 1 | **1 · 1** | identical |
| G-6 `sed -n '106,116p' design-idioms.css \| grep -c 'outline'` | **2** | **3 · 3** | **DRIFT D-1** |
| G-7 `git grep -l 'btn-playback' HEAD -- demo \| wc -l` | 8 | **8 · 8** | identical |
| G-7 the bare-`.focus-ring` class sweep | **2** | **0 · 0** | **DRIFT D-2** |
| OP-5 offsets `grep -n 'focus-visible'` on both stylesheets | `:74` / `:106` (+`:111-116`) | **`:74`** / **`:106`, `:112`** | identical |
| §B.2 `wc -l`, thirteen modify rows | per §B.2 | **12 of 13 identical**; `ChannelOptions.vue` **731 → 849** | the declared cross-edge |

**Seventeen gate byte clauses; fifteen reproduce the spec's authoring figure exactly, two drift.**
Both drifts are **declared beside, never patched into the dated spec** (E-3).

**DRIFT D-1 — `design-idioms.css:106-116` `grep -c 'outline'` reads 3, not 2.** The bytes are
**PROVEN UNMOVED** since the spec's own ref: ⟨cmd⟩ `git log --oneline 69095552..HEAD --
demo/styles/design-idioms.css` → *(no output)*. The window `:106-116` holds `outline: none` (`:108`),
the forced-colors `@media` selector line (`:112`) and `outline: 2px solid Highlight` (`:113`) — the
authoring seat counted the two `outline:` **declarations** and the window also catches the repeated
**selector**. This is an authoring-figure erratum in a dated file: the spec is **addended beside**
here and **not edited**; `.c` re-derives the ground rather than chasing either number, and `.d`
re-runs the literal command and publishes **3**, quoting the spec's 2 beside it.

**DRIFT D-2 — the bare-`.focus-ring` sweep reads 0, not 2; LANDED-BY KF.W11.** §B.1 row 6 named two
class applications (`SquareScene.vue:46`, `SpringTarget.vue:63`) and routed them: *"Both bare sites
are KF.W11's files — this wave states the policy, KF.W11 spends the edits."* **KF.W11 spent them.**
⟨cmd⟩ `grep -rn 'focus-ring' demo | grep '\.vue:' | grep -v 'kf-focus-ring' | grep -v
'focus-ring-shadow'` → **one line, and it is prose** (`SquareScene.vue:45`, a comment naming the
producer's realized `.focus-ring:focus-visible`); ⟨cmd⟩ `… | grep -c 'class='` → **0 · 0**. Both
former sites now wear `kf-focus-ring` (`SquareScene.vue:61`, `SpringTarget.vue:105`). **This is the
wave's policy honoured by its named owner, not a cure this wave may claim** — `.d` publishes **0**
at close with RULINGS-4's **4** and §B.1's **2** quoted beside it, amending neither, and books the
movement `LANDED-BY KF.W11` under R.2.

### GREEN-BEFORE-CURE (R.2) — four bookings, none claimed as this wave's

**No gate verdict is GREEN before its cure** — all eight are RED above, so the returned
`greenBeforeCure` set is **EMPTY**. Four *sub-clauses* nevertheless arrive already satisfied and are
booked here so no unit may later claim them:

1. **OP-2's reactive `:max` rider** — `PlaybackRibbon.vue:19` already reads `:max="effectiveDuration"`.
   **`LANDED-BY` the pre-wave tree**; `.b` derives and states the remainder of KF-CO-15 rather than
   re-landing this line.
2. **OP-6's Space/keyup semantics** — `usePlayActuation.ts:39` `isSpace` · `:47` `let spaceArmed` ·
   `:74` · `:78` · `:82-83`. **`LANDED-BY KF.W8`**; `.b`'s first act is the remainder derivation and
   the bundle still binds whatever remains (§Sequencing: *"a member already landed upstream does not
   dissolve the bundle for the rest"*).
3. **OP-3's producer half** — the installed glass-ui 7.0.0 dist has since been rebuilt with
   `default: void 0` on `open`/`defaultOpen`. **`LANDED-BY` the producer**; the rider's *obligation*
   is unchanged by the spec's own words, the MUST-CARRY byte clause is NOT relaxed, and `.d`'s SS-6
   relay **states the discharge rather than re-asking for it**.
4. **DRIFT D-2's two bare `.focus-ring` sites** — **`LANDED-BY KF.W11`** (above). `.d` publishes the
   frontier denominator and claims no credit.

### The four-verb line at this open

| verb | state | why |
|---|---|---|
| AUTHORED | **YES** | `keyframes/waves/KF-W13.md`, 2026-09-18, the SS-1/SS-2 fold seat |
| AUDITED | **YES** | per the spec's own §State table |
| IMPLEMENTED | **NO** | all eight gates RED at this open |
| VERIFIED | **NO** | a successor close/CHECK act, never this seat's |

---

## Unit plan (second sitting) — 4 units, 3 ordered groups, peak concurrency 2

**Order, from §Sequencing 1 (binding)**: `[.a ∥ .b] → [.c] → [.d]`. Peak **2**, inside the owner's
four-workflow cap (feedback-max-four-workflows) and COHESION **§0ag** (all four tracks returned;
the supervisor cron `e8961b17` is deleted, so no periodic message enters the root session).

**Disjointness re-verified at this seat** (§Bounds Disjointness, L122–124): `.a` writes only
`demo/app/**` + `test/demo/app/**`; `.b` writes only `transport/**` + `playback/PlaybackRibbon.vue`
+ the `ChannelOptions.vue` carve + `demo/styles/{playback-idiom.css,font-roles.json}` +
`test/demo/instrument/**`. **No path is in both writable sets** — TD-36's bytes are `.a`'s alone
(`ChromeDock.vue:299`/`:302`), which is exactly what makes the pair disjoint.
`playback-idiom.css` and `playback-ribbon-contract.test.ts` are **`.b` → `.c` SERIAL**, never
concurrent. `.c` and `.d` are serial on `master`.

**Model assignment — read from the spec's own bytes, not presumed.** ⟨cmd⟩ `grep -n 'Fable'
keyframes/waves/KF-W13.md` → **6** lines (`:23`, `:281`, `:289`, `:291`, `:293`, `:295`), and
**`:23` is a dispatch instruction, not provenance**: *"**Tiering per M-12**: `.a`'s
proof-then-deletion and `.b`'s remainder derivation are **Fable-worker ∥ Opus-worker → fresh-Fable
arbiter**; `.c` and `.d` **Opus solo**."* The spec therefore **names a fresh-Fable arbiter seat for
`.a` and `.b`** and Opus for `.c`/`.d`. **Dispatch models: `.a` = `fable` · `.b` = `fable` · `.c` =
`opus` · `.d` = `opus`** — identical to the first sitting's committed plan headings, now sourced to
the spec line that grants them rather than to memory. (This seat first wrote the opposite from a partial
grep and corrected it under WRITE-THEN-MEASURE before publishing; the erratum is recorded rather
than silently fixed.) §Provenance `:295` separately records that the Opus arm's **standalone `.a`
design-act seat was KILLED** by the fold — the design act survives as `.a`'s first commit under the
no-deletion-before-the-proof lock, which is the same law with one fewer seat.

**The one owner-gated item, and it gates one row, not the wave.** OP-7 (TD-37, *one face order*) is
an SS-2 DESIGN DECISION and is **UNRULED** — ⟨cmd⟩ `grep -n 'TD-37\|face order' COHESION.md` →
*(no output)*, read to the file end, through **§0ag**. `.b` lands TD-37 **only** with a
ruling in hand; otherwise it returns `complete_with_misses` naming it. (⟨cmd⟩ `wc -l < COHESION.md`
→ **1,922**.) Every other owner-gated item
this wave carries is already RULED and is cited by id, never re-opened: **§0u** (OP-0 = a ratchet;
KF13-E1 discharged; the close asserts the count), **§0ad KF11-E5** (the ratchet floor is *this
seat's own* measured figure — **12**, never 54), **§0ad KF11-E2** (the three `src/**` TS6133 rows
fall to **KF.W13's close unit under a one-row dated addendum** if no KF.W12 unit carried `src/**`;
none did, so `.d` owns them — and `.d` may NOT write `src/**`, which is wave-invalidating, so the
addendum names them with their owner), **§0ad KF11-E4** (`EditorShell.vue(175,10)` rides KF.W13
*only if* its §B carries that file; **it does not** — the row stays X-W11's), **RULINGS-4 R4-8**
(the mint stands), **RULINGS-3 LAW A** (no delete on a line-count), **R3-1** (OP-8's kill).

### Group 1 (parallel, peak 2)

#### `KF.W13.a` — The Dock-Menu Packet · model `fable` (spec `:23` — fresh-Fable arbiter)

- **Spec sections executed**: §Scope 1 (`:55`) · §0 OP-3/OP-4/OP-8 (`:42-43`, `:47`) · §Bounds B.1
  rows 1·2·3·9 (`:75-77`, `:83`) · B.2 `.a` rows (`:91-94`, `:105-106`) · B.3 census (1) (`:120`) ·
  §Agent Units KF.W13.a (`:152-156`) · §Gates G-KFW13-0/-1/-2 (`:186-190`) · §Sequencing 2 (`:211`)
  + travelling locks 1 and 6 (`:218`, `:223`) + `:225` (ARB-1, R3-1, TD-36) · §Commit plan 1
  (`:270`) · §L-18 bases (i)(ii)(viii) (`:281`).
- **Writable (kf)**: `demo/app/dock/ChromeDock.vue` · `demo/app/dock/MbabbMenu.vue` ·
  `demo/app/dock/index.ts` (barrel carve only) · `demo/app/App.vue` (`:29`·`:37`·`:369`·`:372` +
  the consumed KF-APP-1 `:100` repair, **delete arm only**) · `test/demo/app/dock-context-slot-
  resolution.test.ts` (create) · `test/demo/app/mbabb-menu-self-hold.test.ts` (create).
  **Writable (value.js)**: `docs/tranches/X/execution/B/KF-W13.md` (append receipt) ·
  `docs/tranches/X/keyframes/evidence/W13/**` (create).
- **Gates turned**: G-KFW13-0 → G-KFW13-1 → G-KFW13-2, **in that order in `git log`**.
- **Locks**: commit 1 = the mechanism proof with **ZERO `demo/**` bytes in its sha**; **L-1 — no
  deletion before that proof**; commit 2 = M-4's deletion **+** the self-hold **+** the corrected
  `:109-113` and `:186` comments **+** the KEPT `v-model:open="open"`/`defineModel` binding, **ONE
  sha (MUST NOT SPLIT — the rider is not a follow-up)**; MM-1/MM-6's four-part cure **ONE sha**;
  **ARB-1 delete-arm-only** (`headerLeft` in the `demo/app` diff = HIGH defect); **OP-8** (no
  `ComponentExposed<>`/`Pick<>`); **TD-36 one identity, one home**; glass-ui and `node_modules`
  READ-ONLY (its `dock/index.d.ts` read, never edited); the §0u ratchet — `MbabbMenu.vue(208,12)`
  and `(208,36)` go **2 → 0 with the MM-1/MM-6 cure**, never by a cast or suppression.

#### `KF.W13.b` — The Transport/Ribbon Packet · model `fable` (spec `:23` — fresh-Fable arbiter)

- **Spec sections executed**: §Scope 2 and 3 (`:56-57`) · §0 OP-1/OP-2/OP-6/OP-7 (`:40-41`, `:45-46`)
  · B.1 rows 4 and 8 (`:78`, `:82`) · B.2 `.b` rows (`:95-103`, `:107-110`) · B.3 censuses (2) and
  (4) (`:120`) · §Agent Units KF.W13.b (`:158-162`) · §Gates G-KFW13-3/-4/-5 (`:192-196`) ·
  §Sequencing 3 (`:212`) + travelling locks 2·3·5 (`:219-220`, `:222`) · §Commit plan 2 (`:271`) ·
  §L-18 bases (iv)(v)(ix) (`:281`).
- **Writable (kf)**: `…/transport/TransportDock.vue` · `…/TransportDock/usePlayActuation.ts` ·
  `…/TransportDock/useIconSpin.ts` · `…/TransportDock/useMenubarMeasure.ts` (TD-34/35 carve) ·
  `…/AnimationControlsGroup/useControlsKeyboardShortcuts.ts` · `demo/components/playback/
  PlaybackRibbon.vue` · `…/channel-controls/ChannelOptions.vue` (**KF-CO-15 carve ONLY, in the C-2
  joint commit, after KF.W12 `.b`'s `2cd314af`**) · `demo/styles/font-roles.json` (`:12` row, only
  if TD-39 lands) · `demo/styles/playback-idiom.css` (**N-3's `:78-80` + D-12's stopgap ONLY — the
  `:74-77` focus rule is `.c`'s**) · `test/demo/instrument/transport-keyboard-propagation.test.ts`
  (create) · `…/transport-icon-spin.test.ts` (create) · `…/playback-ribbon-contract.test.ts`
  (create) · `…/transport-play-actuation.test.ts` (extend; **the existing ten `it(` never
  weakened**). **Writable (value.js)**: the record (append) · `evidence/W13/**`.
- **Gates turned**: G-KFW13-3 · G-KFW13-4 · G-KFW13-5.
- **Locks**: **MUST NOT SPLIT ×4** — TD-2+TD-38+TD-40 one sha (its `--stat` naming `TransportDock.vue`
  AND `useControlsKeyboardShortcuts.ts` AND the test); TD-21+TD-41 one sha; TD-1+TD-4+PRM+test one
  sha; the C-2 ⊕ KF-CO-15 **joint** sha naming `PlaybackRibbon.vue` AND `ChannelOptions.vue`.
  **A member already landed upstream does not dissolve the bundle for the rest** (OP-6).
  **PR-CAUTION** — cure ON the Slider; no `Slider` import replaced or wrapped by a bespoke
  primitive. **KF-AV-28 KEEP stated first, zero discharge receipts** (G-7 asserts the literal
  `DISCHARGED by KF.W7 SWAP verdict` reads **0** in this record). N-3's deletion is **its own sha
  with its own census** (LAW A). §0u: `TransportDock.vue`'s three rows go **3 → 0** with TD-1's,
  TD-34/35's and the `:95` selection-typing cure that owns them.

### Group 2 (serial)

#### `KF.W13.c` — The Two-Deletion Act · model `opus` (spec `:23` — Opus solo)

- **Spec sections executed**: §Scope 4 (`:58`) · §0 OP-5 (`:44`) · B.1 rows 7 and 8 (`:81-82`) ·
  B.2 rows `:103-104`, `:109` · B.3 census (3) (`:120`) · §Agent Units KF.W13.c (`:164-168`) ·
  §Gates G-KFW13-6 (`:198`) · §Sequencing 4 (`:213`) + `:225` (K-5) · §Commit plan 3 (`:272`) ·
  §L-18 basis (vi) (`:281`).
- **Writable (kf)**: `demo/styles/playback-idiom.css` (`:74-77`) · `demo/styles/design-idioms.css`
  (`:106-116` counterpart, **nothing else in the file**) · `test/demo/instrument/playback-ribbon-
  contract.test.ts` (extend — the focus-affordance case). **Writable (value.js)**: the record
  (append) · `evidence/W13/**`.
- **Gates turned**: G-KFW13-6 (and it prints G-KFW13-7's sweep denominators beside RULINGS-4's).
- **Locks**: **K-5 — ONE commit naming BOTH stylesheets** (a sha touching one is the violation, *one
  deletion fixes nothing*); **the re-derivation receipt is committed in value.js BEFORE the act's
  sha**; **LAW A** — the census is both selectors' consumers **and** the re-derived redundancy
  ground, pasted together; **KF.W6's KF-KE-30 ruling is read, not re-litigated** (the forced-colors
  parity at `:111-116` may be the re-derived *form*, and then the receipt says why); serial after
  `.b` on the shared `playback-idiom.css`; the AFTER witness is handed to KF.W9 by row id, never
  re-shot here (S-9). **DRIFT D-1 applies to this unit's own gate command** — re-derive the ground,
  do not chase 2-vs-3.

### Group 3 (serial, last)

#### `KF.W13.d` — Close · model `opus` (spec `:23` — Opus solo)

- **Spec sections executed**: §Scope 5 (`:59`) · §Agent Units KF.W13.d (`:170-174`) · §Gates
  G-KFW13-7 (`:200`) + all eight re-run double · §Format and lint cadence · §Verification artefacts
  (`:275-277`) · §Commit plan 4 (`:273`) · §Sequencing travelling lock 4 (`:221`) · COHESION §0u
  part (3) and §0ad KF11-E2/E5.
- **Writable (value.js ONLY — zero kf product bytes)**: `docs/tranches/X/execution/B/KF-W13.md`
  (`## Close`) · `docs/tranches/X/execution/LEDGER.md` (**this wave's row cells + appended lines
  only**) · `docs/tranches/V/coordination/INBOX.md` (append) · the SS-6 accretion register at
  `docs/tranches/X/COHESION.md §4a` (**append rows only**) · `docs/tranches/X/keyframes/evidence/
  W13/**`.
- **Gates turned**: G-KFW13-7 — and the eight-gate BEFORE→AFTER table at its own double-run clock.
- **Locks**: `git show --stat` **per sha** audited against §Bounds with **every MUST-NOT-SPLIT family
  proven ONE sha**; **the SS-6 relay is a completing close's act** (the `default: undefined` ask for
  `dropdown-menu`'s Boolean props — **and OP-3 measures it may already be discharged at the
  producer, so the relay STATES the discharge instead of re-asking**; PlaybackRibbon's producer
  seams beside it); **glass-ui READ-ONLY, zero demo-side producer workarounds**; the discharge set
  stated **positively as EMPTY**; **§0u part (3)'s literal `0`** asserted double-run **with the
  honest arithmetic published**: this wave's reach is **12 → 7** and the seven belong to KF.W12 (1),
  KF.W11 `.r` (3) and **KF11-E2** (3 `src/**` rows §0ad routes to *this* unit **as a one-row dated
  addendum**, since `src/**` is wave-invalidating to write); E13 four-path sweep; LEDGER row cells
  by minimal in-place replacement + one appended event line.

### Dispatch note (second sitting)

`groups = [[KF.W13.a, KF.W13.b], [KF.W13.c], [KF.W13.d]]` · `alreadyDone = []` — **no unit has
committed a byte**: ⟨cmd⟩ `git -C ../keyframes.js log --oneline --all | grep -c 'X.KF.W13'` →
**0 · 0**, and ⟨cmd⟩ `git log --oneline --all | grep -c 'x-kf-w13'` in value.js → **0 · 0** apart
from this open's own commit. `greenBeforeCure = []` — every gate is RED at this seat's clock.

## Unit receipts (second sitting)

*(empty at open — each unit appends its own `### KF.W13.<id>` receipt here, line 1
`SERVED MODEL: <id>`, commands double-run, SELF-COUNT, inherited paths named.)*
