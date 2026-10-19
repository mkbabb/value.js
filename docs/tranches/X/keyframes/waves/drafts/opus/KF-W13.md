SERVED MODEL: claude-opus-5[1m]

# KF.W13 — Chrome, Dock & Transport Repair

**Wave**: KF.W13 · Chrome, Dock & Transport Repair — the two packets the X·KF census never owned: **dock-menu · transport/ribbon**.
**Half**: **demo** (keyframes.js `demo/app/dock/**` + `demo/app/App.vue` + `demo/components/instrument/transport/TransportDock**` + `demo/components/playback/PlaybackRibbon.vue` + `demo/styles/playback-idiom.css`). **Sub-tranche**: X·KF. Spec home `docs/tranches/X/keyframes/waves/KF-W13.md` (this file is the **opus author's blind draft** at `waves/drafts/opus/KF-W13.md`, authored under M-23's twice-authored idiom; the agglomerated file at the ratified path is the fold seat's product, never this one).
**Authority**: `docs/tranches/X/COHESION.md` §0/§0d/§1, ratified under `docs/tranches/V/megatranche/SCOPE.md` **M-25**. **Minting authority — and this wave is the one that was MINTED EXPLICITLY**: `KF-W4 §Sequencing`, the **R-15 homing block**, the bullet *"**KF.W13 · Chrome, Dock & Transport Repair (2) — MINTED here, declared** (a wave beyond the census sketch is minted explicitly, per KF-W1 cross-edge 9's cohesion flag)"*. **Terminal disposition of record**: `KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER`, row 3 — cited by **STABLE ANCHOR ALONE (LAW C(3))**; the two ends name each other and neither carries the other's line numbers.
**Status**: **planned**. No product byte is written by this file. Authoring opened no product source for writing — every keyframes.js anchor below was re-resolved **read-only via `git show origin/master:<path>` / `git grep … origin/master`**. Execution awaits the **SS-1/SS-2 authoring block's fold and ratification**; the wave enters no order until then (`EXECUTION-RUNBOOK.md` §4.5).

**Alias law (R-B idiom).** `KF.W13` denotes `X.KF.W13`; a search alias, never a rename. **The mint stands**: RULINGS-4 **R4-8 arm (a)** read the minting bytes and found the minting *"deliberate, load-bearing, and flagged-and-answered — striking them as accidental (arm (b)) is untenable at the bytes."* **The COHESION FLAG KF-W1 cross-edge 9 raised is recorded by that edge as DISCHARGED, not deleted — the mint answered it.**

**Ref of record.** keyframes.js `origin/master` **`69095552`**, measured by this seat 2026-09-18. ⟨cmd⟩ `git rev-list --count 81a56990..origin/master` → **203**. **The drift here is the most consequential of the three successors**, because §6.D row 3's inbound blast-radius receipt is a **pair of censuses** — the `btn-playback` file list and the `.focus-ring` consumer list — **and both have moved at the frontier**. §B.1 states each drift with its command **beside** RULINGS-4's fixed figure; **RULINGS-4 is not amended** (E-3, dated authorities immutable).

**Provenance.** Authored **blind** (M-23 twice-authored: this is the **opus arm**). Rows consumed **by mechanism, deduped by identity, never transcribed** (M-25). Sources: the banked routing blocks in `docs/tranches/V/megatranche/registry/adjudicated/` — **kf-ChromeDock · kf-MbabbMenu · kf-App · kf-DemoGlobalChrome · kf-TransportDock · kf-PlaybackRibbon · kf-AnimationControlsGroup · kf-SharePopover · kf-KeyboardShortcutsModal** (9 records); `KF-W4 §Sequencing` R-15 (the homing, and the mint); `KF-W10 §6.D` row 3; `execution/B/KF-W7.md` §3 + Act 3 + its **→ KF.W13** cross-edge. **No gate exists here without a named live witness (L-19).** Validated at authoring against `WAVE_SPEC.md` and `STYLE.md` (**L-20**).

| verb | state | basis |
|---|---|---|
| AUDITED | **YES** | the 9 adjudicated records above, each ADJUDICATED-not-VERIFIED, each routing its behavioral remainder `NO-WAVE-OWNER` into one of this wave's two packets by name |
| SPECIFIED | **NO — this draft is one arm of the authoring, not the spec** | SPECIFIED is stamped by the **fold seat** over the agglomerated file at `waves/KF-W13.md` |
| IMPLEMENTED | NO | gates green + bytes landed in the named execution site stamps this |
| VERIFIED | NO | stamped at the successor sub-tranche's close, never here and never by KF.W10 (**§6.D**) |

**Goal criterion.** This wave succeeds if, after it, **the chrome a user presses does what the chrome says it does** — the @mbabb menu opens and stays open by its own hold rather than by a five-site round-trip built on a false Vue mechanism; one propagation policy governs both keyboard mirrors and is stated once; the transport's actuation cancels cleanly on release-elsewhere and on blur; and the ribbon's instrument reports the time-space it is scrubbing. A wave that deletes the round-trip and ships an **unopenable menu** has **failed this goal and has shipped a regression**: `kf-ChromeDock M-4`'s cure **as worded** does exactly that, and **the MbabbMenu MUST-CARRY rider is the only thing standing between the cure and the regression** (§Sequencing L-2).

**Execution shape**: **4 seats, 3 phases** — phase 1: 1 serial (`.a` the M-4 mechanism verification + the MUST-CARRY rider's design, **before any deletion**); phase 2: 2 parallel (`.b` dock-menu ∥ `.c` transport/ribbon); phase 3: 1 serial (`.d` the two-deletion act with the K-5 lock + close). **Peak concurrency 2**, inside the owner's four-workflow cap (§5.1). The design act is deliberately alone and first: M-4's cure is a **deletion whose safety depends on a claim about Vue's `inject` resolution**, and the register's own history here is a superlative awarded for a false statement about Vue and then withdrawn.

---

## §0 Open preconditions (checked at wave-open; NOT close gates)

| # | precondition | state at authoring (measured by this seat, 2026-09-18, at `69095552`) |
|---|---|---|
| **OP-1** | **This spec exists at the ratified path**, folded from the two blind arms and ratified. | **OPEN BY CONSTRUCTION.** `ls docs/tranches/X/keyframes/waves/KF-W13.md` → *No such file*. A MINTED-UNAUTHORED wave cannot open on a draft. |
| **OP-2** | **`G-KFW4-1` GREEN** — the `vue-tsc --noEmit` gate chassis (R-15: *"All 17 sequence after G-KFW4-1"*). | **LANDED, HONEST-RED AT CLOSE** (LEDGER row KF.W4). **HARD.** |
| **OP-3** | **KF.W7's per-surface SWAP verdicts STATED** — the transport/ribbon packet sequences after them (KF-AV-28's rider; `kf-PlaybackRibbon.md:36`). | **DISCHARGED, positively.** `execution/B/KF-W7.md` §3: **six surfaces, six KEEP-BESPOKE, ZERO SWAP**; **discharge set EMPTY**; *"KF.W13 — **both packets are un-gated by a swap that did not happen** … the transport/ribbon packet keeps the rider it supplies the counter-evidence for. The locks this end re-affirms are unchanged: **TD-1/TD-2's cures BUNDLE**, TD-2+TD-38+TD-40 and TD-21+TD-41 **must not split**, and **kf-ChromeDock M-4's cure ships an unopenable menu without the MbabbMenu MUST-CARRY rider**."* **This wave inherits work, not a deletion.** |
| **OP-4** | **Write authority named** (census §(c) gap 5; KF-W3 OP-2, UNRESOLVED). | **UNRESOLVED.** Named, not answered. **HARD.** |
| **OP-5** | **KF.W8 Structure & Colocation Settle IMPLEMENTED** — and **it moved this wave's subject matter more than the bank can express**. | **LANDED** (`69095552` is KF.W8 `.g`'s own commit). `usePlayActuation.ts`, `useIconSpin.ts`, `useMenubarMeasure.ts` are **extracted composables that did not exist when kf-TransportDock was banked**, and **part of the TD keyboard family appears already landed inside them** (§B.1 row 4). **`.c`'s FIRST act is deriving what remains, receipted** — a cure written from the bank alone re-lands a repaired defect. **HARD.** |
| **OP-6** | **The `isAnyOpen` / dock keep-open mutex's producer side is stable at installed glass-ui 7.0.0.** | **STABLE, and the governing kills are RATIFIED.** kf-ChromeDock's R3-1 (`InstanceType` = slot bag; 5 latent TS2339s) is **KILLED** — third-derived at the real package: `x.expanded: boolean`, `x.expand()/keepOpen()/release()` all clean, so **C-2's cure is NOT gated** and the `ComponentExposed<>`/`Pick<>` remedies **must not land**. `useOptionalDockContext` **is exported from the `/dock` subpath already imported**. |
| **OP-7** | **The `.focus-ring` / `btn-playback` censuses of §6.D row 3 are re-resolved before any sweep.** | **BOTH HAVE DRIFTED** (§B.1 rows 5 and 6). The register quotes RULINGS-4, *"this round's fixed authority, not … a spec that moves"* — and the tree moved anyway. **This is OP-7 and not a footnote because a sweep run on the register's list edits the wrong files.** |

**OP-1, OP-2, OP-4, OP-5 are hard.** OP-7 is a measurement obligation, discharged by §B.1 and re-run at execution.

---

## §Scope — two packets, and the design act that precedes them

| # | packet | seat | one-sentence subject |
|---|---|---|---|
| 0 | *(not a packet — the design act)* | `.a` | **M-4's mechanism, verified at the tree, and the MUST-CARRY rider designed** — no deletion is spent before this lands |
| 1 | **dock-menu** | `.b` | the dock-menu actuation / typography / brand family: MbabbMenu's 27-row roster + MM-1/MM-6's cure law, ChromeDock's M-4 round-trip deletion **with the MbabbMenu MUST-CARRY rider**, and the KF-APP-1/-17 motion under ARB-1's delete-arm-only law |
| 2 | **transport/ribbon** | `.c` + `.d` | the instrument-truth core, the KF-CO-15 extension, the keyboard-propagation commit, the actuation-cancellation commit, the one-prop/one-token cures, **G-KFW9-9's two-deletion act with the K-5 lock intact**, and D-12's demo-side stopgap bytes |

**What this wave is not.** Not a re-audit (ids for life; folds by reference at the banked id). Not a homing act (**KF.W4 homed both**). Not a glass-producer cure site (§Sequencing L-4). **And it is not a place where a lock may be honoured in spirit**: three of its five locks are *"must not split"* commit-family locks, and a split is a defect whatever the bytes look like afterwards.

---

## §Bounds

### B.1 Frontier re-anchor (performed by this authoring seat, read-only, at `origin/master` `69095552`, 2026-09-18)

**Six inherited anchors re-resolved; four needed correction, and two of those are the register's own inbound blast-radius censuses.**

| # | inherited anchor ⟨bank · register⟩ | frontier truth (this seat's measurement, `69095552`) | disposition |
|---|---|---|---|
| 1 | **kf-ChromeDock M-4** — *"the `itemsPopupOpen` prop and its five-site round-trip rest on a provably false Vue mechanism claim (`:73-78`)"* | **HOLDS; the claim has MOVED and is now longer.** ⟨cmd⟩ `git show origin/master:demo/app/dock/ChromeDock.vue \| sed -n '105,120p'` → the claim sits at **`:109-113`**: *"The slot content is set up in the PARENT (App.vue), so its `useOptionalDockContext()` resolves **ABOVE this provider and cannot hold the dock open itself**; the parent surfaces the open state here so the dock's own keep-open hold (dockRef) pins it."* **The false mechanism is stated in the file, in prose, as the design's justification.** | **RE-ANCHORED (`:73-78` → `:109-113`); the defect is unchanged and the comment is part of it** (KF-CE-41's law) |
| 2 | **M-4's "five-site round-trip"** — *"a prop, an `isAnyOpen` term (`:172`), `v-model:open` in MbabbMenu.vue:96, a ref + two bindings in App.vue"* | **FIVE SITES CONFIRMED, every coordinate moved.** ⟨cmd⟩ `git grep -n "itemsPopupOpen\|items-popup-open\|mbabbPopupOpen" origin/master -- demo/` → `App.vue:29` (`:items-popup-open="mbabbPopupOpen"`) · `App.vue:37` (`v-model:open="mbabbPopupOpen"`) · `App.vue:369` (the prose) · **`App.vue:372` (`const mbabbPopupOpen = ref(false);`)** · `ChromeDock.vue:114` (the prop) · **`ChromeDock.vue:237` (`isAnyOpen`, was `:172`)** · `MbabbMenu.vue:186` (the prose). Plus ⟨cmd⟩ `git grep -n "const open" origin/master -- demo/app/dock/MbabbMenu.vue` → **`:204 const open = defineModel<boolean>("open", { default: false });`** (was `:96`). **The round-trip is: ref → prop → `isAnyOpen` → `defineModel` → back.** | **CORRECTED, all five re-pinned.** This is G-KFW13-1's denominator: **5 → 0** |
| 3 | **`useOptionalDockContext` is reachable from the already-imported `/dock` subpath** — the kill that makes M-4's deletion possible (C/S-2 + C-17 KILLED: *"Vue resolves `inject` along the runtime parent chain, and the tree itself proves it inside this very render"*) | **THE EXPORT IS REACHABLE; THE DEMO DOES NOT CALL IT.** ⟨cmd⟩ `git grep -n "useOptionalDockContext" origin/master -- demo/` → **one hit, and it is the false comment itself** (`ChromeDock.vue:110`). **No demo file calls it.** | **LOAD-BEARING FINDING.** The kill's *premise* (the API exists and resolves along the runtime parent chain) is the registry's, ratified; **its consequence is unexecuted at the tree.** `.a` verifies the call in a running mount **before** `.b` deletes anything — G-KFW13-1's phase-1 predicate |
| 4 | **kf-TransportDock's keyboard-propagation family** — TD-2 + TD-38 + TD-40, *"`.stop` symmetry on both mirrors decided once, Space registration scoped away from button targets, composition tests that mount the buttons WITH the registry"* | **PARTLY LANDED UPSTREAM, AND THE REMAINDER IS SHARPER.** ⟨cmd⟩ `git grep -c "\.stop" origin/master -- …/TransportDock.vue …/dock/ChromeDock.vue` → **TransportDock `5`, ChromeDock *(no output; exit 1)* = `0`** — **the asymmetry TD-2 names is live and measurable in one command.** But: ⟨cmd⟩ `git grep -n "isSpace\|spaceArmed" origin/master -- …/TransportDock/usePlayActuation.ts` → `:39-40` (`isSpace`), `:46` (*"keydown arms, keyup actuates once"*), `:74`, `:82` — **the native Space semantics TD-38's docblock prescribes are IMPLEMENTED**, in a composable that **did not exist when the record was banked**. | **DECLARED RE-ANCHOR, and an OP-5 obligation**: `.c` re-derives **what remains of TD-2/TD-38/TD-40** against landed code and receipts it. **The bundle lock (L-3) still binds whatever remains** — a bundle with one member already landed is still one commit for the rest |
| 5 | **`btn-playback` demo-scoped files = 7**, enumerated by RULINGS-4 R4-4 (*"8" is struck*): `demo/DESIGN.md` · `PlaybackRibbon.vue` · `EasingScene.vue` · `SpringScene.vue` · `StartingStyleTarget.vue` · `font-roles.json` · `playback-idiom.css` | **EIGHT AT THE FRONTIER — and the eighth is a NEW file, not the struck one.** ⟨cmd⟩ `git grep -l "btn-playback" origin/master -- demo/` → **8**, double-run: the register's seven **plus `demo/components/instrument/timeline/KeyframeTimeline.vue`** (3 hits). Per-file hits: `DESIGN.md 2` · `KeyframeTimeline.vue 3` · `PlaybackRibbon.vue 6` · `EasingScene.vue 1` · `SpringScene.vue 2` · `StartingStyleTarget.vue 1` · `font-roles.json 1` · `playback-idiom.css 11`. | **DECLARED DRIFT — RULINGS-4 IS NOT AMENDED (E-3).** The register's *"8 is struck"* was true **of its own corpus at `81a56990`**, where the eighth candidate was a miscount; the frontier's eighth is a **different file that adopted the class after the census ran**. **Both statements are true at their own coordinates**, and confusing them is exactly what a re-anchor pass exists to prevent. **The sweep's denominator at execution is 8, re-derived by command** |
| 6 | **`.focus-ring` consumers = exactly 4** class applications / 4 files (`KeyframeCard.vue:45` · `SpringHeatmap.vue:30` · `SpringTarget.vue:63` · `SquareScene.vue:46`; *"five" struck*) | **HALVED — two of the four migrated to the `kf-` prefixed idiom.** ⟨cmd⟩ `git grep -n '\bfocus-ring\b' origin/master -- demo/ \| grep -v kf-focus-ring \| grep -v focus-ring-shadow` → **bare `.focus-ring` class applications = 2**: `SpringTarget.vue:63` · `SquareScene.vue:46`. `KeyframeCard.vue` → `kf-focus-ring` at `:117`; `SpringHeatmap.vue` → `kf-focus-ring` at `:37`. The cause is KF.W6's landed **KF-KE-30** rule, stated in `design-idioms.css:77-78` (*"WHY THE NAME IS `kf-` PREFIXED, and not `focus-ring`"* — glass-ui 7.0.0 ships a realized `.focus-ring:focus-visible` inside `@layer components`). | **DECLARED DRIFT (E-3 — RULINGS-4 stands).** **Both remaining bare sites are KF.W11's files**, so this wave's half of the census is **the policy statement, not the edits** (§Cross-edges → KF.W11) |
| 7 | **kf-PlaybackRibbon D-12** — *"W13 owns `playback-idiom.css`, and `design-idioms.css`'s copy rides the same single act"* | **THE COPY IS GONE.** ⟨cmd⟩ `git grep -c "btn-playback" origin/master -- demo/styles/design-idioms.css` → *(no output; exit 1)* = **0**. `playback-idiom.css` holds **11** hits and is the sole home (`:18`, `:30`, `:46`, `:60`, `:67`, `:74`, `:78`, `:81`, `:86`, + the `:5`/`:58` prose). | **DECLARED: the "same single act" is now a SINGLE-FILE act.** The lock survives as *one act*, with one fewer file — **and the seat states that rather than silently editing one file where the bank named two** |

### B.2 Owned files — demo half (all under `/Users/mkbabb/Programming/keyframes.js/`)

Line counts are `git show origin/master:<path> | wc -l`, measured twice at `69095552`.

| file | L | access | packet · why |
|---|---|---|---|
| `demo/app/dock/ChromeDock.vue` | 534 | modify | **dock-menu** — M-4's round-trip: the prop `:114`, `isAnyOpen` `:237`, **the false-mechanism comment `:109-113`**; TD-36's pointer-events pair (`:299`/`:302`) |
| `demo/app/dock/MbabbMenu.vue` | 229 | modify | **dock-menu** — the 27-row actuation/typography/brand roster; `:204`'s `defineModel<"open">`; **the self-hold via `useOptionalDockContext()`**; MM-5's CheckboxItem; MM-29's two `normal-case` sites |
| `demo/app/dock/index.ts` | 2 | modify | **dock-menu** — the barrel, if the self-hold changes the surface |
| `demo/app/App.vue` | 412 | modify | **dock-menu** — the round-trip's other three sites (`:29`, `:37`, `:369`, `:372`); the KF-APP-1/-17 motion's host half |
| `demo/components/instrument/transport/TransportDock.vue` | 403 | modify | **transport/ribbon** — the keyboard-propagation commit (`.stop` ×5 at `:205-209`), the actuation-cancellation commit, TD-37's face order, TD-39's stable name |
| `demo/components/instrument/transport/TransportDock/usePlayActuation.ts` | 88 | modify | **transport/ribbon** — **the landed Space/keyup semantics** (`:39-40`, `:46`, `:74`, `:82`); the per-control origin, release-elsewhere cleanup, blur-class disarm, orphan-keyup + stale-id cases |
| `demo/components/instrument/transport/TransportDock/useIconSpin.ts` · `useMenubarMeasure.ts` | 29 · 28 | modify (**narrow**) | **transport/ribbon** — TD-34/TD-35 (the TD-31 cluster) only |
| `demo/components/playback/PlaybackRibbon.vue` | 244 | modify | **transport/ribbon** — the instrument-truth core; `:19`'s `:max="effectiveDuration"`, `:9`/`:74`'s `is-disabled` pair, C-3's `valueCommit`, C-4's `:step`, the one-prop/one-token cures, the five-false-comments prose sweep |
| `demo/styles/playback-idiom.css` | — | modify | **transport/ribbon** — D-12's demo-side stopgap bytes; **11 `btn-playback` hits, the sole home** (§B.1 row 7) |
| `demo/components/instrument/transport/components/DemoGlobalChrome.vue` | 59 | modify (**narrow**) | **dock-menu** — only the rows kf-DemoGlobalChrome homes here |
| `demo/components/instrument/shell/SharePopover.vue` · `KeyboardShortcutsModal.vue` | — | modify (**narrow**) | **dock-menu** — the menu's two destinations; only the rows their records home here |
| `demo/styles/font-roles.json` | — | modify (**`.btn-playback` selector row only**) | **transport/ribbon** — `:12`'s selector row, if TD-39's rename lands |
| `docs/tranches/X/keyframes/evidence/W13/**` *(in value.js)* | — | create | born-RED baselines, **the mounted self-hold proof**, the propagation-policy matrix, the two-deletion receipt |
| `docs/tranches/V/coordination/INBOX.md` *(in value.js)* | — | modify-append | the SS-6 relays this wave surfaces (glass-ui's bare `{ type: Boolean }` declarations among them) |

### B.3 Read-only witness sites (named, never opened for writing by this wave)

- `demo/components/playback/AnimationVisualizer.vue` — **KF.W11's drag-seam packet owns it.** KF.W7 ruled it **KEEP-BESPOKE**; this wave reads its `grabOffset` seam as context for the transport's actuation and writes nothing.
- `demo/components/instrument/transport/AnimationControlsGroup.vue` + its four composables — **kf-AnimationControlsGroup's ACG D-1 portal-architecture cure is the CUBE packet's rider (KF.W11's)**; TD rows that *name* ACG are read-only here.
- `demo/components/instrument/timeline/KeyframeTimeline.vue` — **KF.W7's**, and the **eighth `btn-playback` file** (§B.1 row 5). This wave's sweep **counts** it and **routes** it; it does not edit a KF.W7 surface.
- `demo/scenes/spring/SpringTarget.vue:63` and `demo/scenes/square/SquareScene.vue:46` — the **two remaining bare `.focus-ring` sites**, both **KF.W11's files**. This wave states the policy; KF.W11 spends the edits (§Cross-edges).
- `demo/styles/design-idioms.css:75-92` — the KF-KE-30 rule that caused §B.1 row 6's migration. **KF.W6's bytes**, read to understand the drift, never re-written.
- glass-ui `dist/components/dock/index.d.ts` — the producer's `expanded` / `expand()` / `keepOpen()` / `release()` surface, and `useOptionalDockContext`'s export. **glass-ui is READ-ONLY ALWAYS.**

### B.4 Explicitly out of bounds

- **glass-ui, always.** Its bare `{ type: Boolean }` declarations make the dock primitive permanently controlled — **that is a producer row and it rides SS-6**, never a demo-side hack. It is also the *reason* M-4's cure as worded ships an unopenable menu, which is why the rider exists.
- `demo/scenes/**` — **KF.W11's**.
- `demo/components/instrument/keyframes/**`, `channel-controls/**`, `controls-pane/**`, `shell/**` beyond the two narrow files — **KF.W12's**.
- `demo/components/instrument/timeline/**` — **KF.W7's**, CLOSED.
- `src/**` — the library.
- value.js `scripts/dev/dev.sh` — **never staged**.

### B.5 LAW A censuses — every delete this wave books

**LAW A (RULINGS-3): no delete is authorized on a line-count.** **Three deletes, and one of them is the wave's headline risk.**

1. **M-4's five-site round-trip deletion.** Census = the five sites at §B.1 row 2, **plus** every consumer of `isAnyOpen` inside `ChromeDock.vue` (the mutex the scene/controls Selects ride — BLK-8 / D9). **The delete's safety predicate is not a count**: it is that `MbabbMenu` can hold the dock itself via `useOptionalDockContext()`. **§B.1 row 3 shows that call is not made anywhere in the demo today**, so the predicate is **unexecuted**. `.a` executes it in a mounted proof; **`.b` may not delete a site before that proof is banked** (L-1). *(Rider: `i-2`'s unpaired `release()` — safe today only by the undocumented `Math.max(0, …)` clamp — **dies with the round-trip** and must be named as dying, not discovered later.)*
2. **kf-SequenceScene N-3's `:76-78` deletion** in `PlaybackRibbon.vue` — the row is **kf-SequenceScene's finding, this wave's bytes**. Census = whatever `:76-78` renders and who reads it, re-derived at execution.
3. **G-KFW9-9's two-deletion act** — **the pair is ONE act and the K-5 lock is intact: one deletion fixes nothing.** Census = both targets' consumers, pasted together in one receipt. **A commit containing one of the two fails L-5 even if it is green.**

### B.6 Scope receipts (R4-10(1) — a sweep's enumeration source is the SCOPE, never the example list)

- **Packet count**: 2 — `dock-menu`, `transport/ribbon` — matching §6.D row 3's cargo **member for member**. No third packet name occurs in §Scope, §Carry or §Gates.
- **Record count**: 9, enumerated at §Provenance; **none is re-audited**.
- **Sweep denominators, re-derived not inherited**: `btn-playback` files = **8** (§B.1 row 5); bare `.focus-ring` class applications = **2** (row 6); M-4 round-trip sites = **5** (row 2); `.stop` asymmetry = **5 / 0** (row 4). **Each is a command in §Gates, and each is re-run at execution before the sweep that consumes it.**

---

## §Carry — the two packets, cargo by banked id (never transcribed, deduped by identity)

**Carriage is not asserted in this file's voice (LAW B).**

### C-1 · **dock-menu** (`.a` design act, then `.b`) — kf-MbabbMenu · kf-ChromeDock · kf-App · kf-DemoGlobalChrome · kf-SharePopover · kf-KeyboardShortcutsModal

**The actuation / typography / brand family, verbatim from the bank's routing block:**
MM-2 · 3 · 5 · 7 · 8 · 9 · 10 · 11 · 12 · 13 · 16 · 17 · 18 · 19 · 20 · 21 · 22 · **24 (consistency)** · 25 · 26 · 29 · 30 · 31 · 32 · 39 · 40 · 42 — **twenty-seven rows** — **plus MM-1/MM-6's cure law**.

- **MM-1/MM-6's cure law ≡ the banked KF-APP-1 motion**, and it is a four-part single edit: *repair `:100`, dispose `setPPMode` with the **KF-APP-17** sweep, resolve the **C-14 bucket split**, land the **MM-5 CheckboxItem** in the same edit.*
- **ARB-1's sequencing law binds it**: **delete arm only, until the glass-ui M-A relay lands.** **The `headerLeft` 'fill' arm is a TRAP** — it lands inside an inert toolbar, so **until the KF-APP-5 producer relay lands, DELETE is the only self-contained cure.** *(This is a travelling lock the cube packet also carries; both waves obey it and neither re-books it.)*
- **M-4 — the round-trip, and the MUST-CARRY rider.** The `itemsPopupOpen` prop and its five-site round-trip **rest on a provably false Vue mechanism claim**, ruled at the bank with its mirror kills (C/S-2 + C-17 KILLED: Vue resolves `inject` along the **runtime parent chain**, and the tree proves it inside ChromeDock's own render — glass-ui's `SelectContent`, authored by ChromeDock as slot content inside GlassDock's default slot, calls `useOptionalDockContext()` and stamps `data-glass-dock-portal`/`data-glass-dock-owner`, *"a stamp unreachable under lexical resolution"*; `<DockSeparator>` rides the same DI).
  **THE RIDER, CARRIED WHOLE AND NOT CITED** (§6.D row 3, first travelling lock): **kf-ChromeDock M-4's MUST-CARRY MbabbMenu rider — *glass-ui's bare `{ type: Boolean }` declarations make the primitive permanently controlled, so M-4's cure AS WORDED ships an unopenable menu without it.*** **MbabbMenu must self-hold** via `useOptionalDockContext()` on the subpath it already imports, **in the same act** as the deletion.
  *(Cost being removed, per the bank: a prop, an `isAnyOpen` term, `v-model:open`, a ref and two bindings — **all reaching a `keepOpen()` MbabbMenu can call directly**. `i-2`'s unpaired `release()` **dies with it**.)*
- **R3-1's kills are RATIFIED and bind the cure's shape**: `x.expanded: boolean`, `x.expand()/keepOpen()/release()` are typed today at the real package; **the five call sites are typed; C-2's cure is NOT gated; the `ComponentExposed<>`/`Pick<>` remedies MUST NOT LAND.** *(A superlative awarded for a false statement about Vue was **withdrawn, not qualified** — the register's own words, and the reason `.a` is a separate phase.)*
- **The typography/brand arm** — MM-29's two `normal-case` sites (`MbabbMenu.vue:5-14`: `normal-case` cancels `text-transform` and **nothing else**), the `text-admin-label` 10px all-caps mono chip register, the `text-micro` rung, and the rest of the register pass.
- **TD-36** — the ChromeDock pointer-events pair, **two classes** (`:299` `pointer-events-none` / `:302` `pointer-events-auto`). *(Banked at kf-TransportDock; **its bytes are ChromeDock's**, so it lands in this packet's file and is named in both routing blocks — one identity, one home.)*

### C-2 · **transport/ribbon** (`.c`, then `.d`'s two-deletion act) — kf-TransportDock · kf-PlaybackRibbon
*"HOMED for the first time"* (`kf-PlaybackRibbon.md:36`), **under the KF.W7 rider**.

**From kf-TransportDock — the transport repair packet gains:**
- **the keyboard-propagation commit** — **TD-2 + TD-38 + TD-40**: *one propagation policy — `.stop` symmetry on both mirrors **decided once**, Space registration scoped away from button targets, composition tests that mount the buttons **WITH** the registry.* **Re-derived against landed code per OP-5/§B.1 row 4.**
- **the actuation-cancellation commit** — **TD-21 (+r2 rider) + TD-41**: per-control origin, release-elsewhere cleanup, blur-class disarm, **orphan-keyup + stale-id test cases**.
- **TD-36** (routed to C-1 above, by bytes) · **TD-37** (one face order — an SS-2 design decision) · **TD-39** (one stable name, with **TD-5/TD-28's prose pass**) · **TD-34/TD-35** (the TD-31 cluster).
- **TD-1 / TD-2's cures BUNDLE** — TD-1's *"cure with TD-4 + PRM + test, one commit"*; TD-2's one-commit-with-TD-38/TD-40 lock. **The bundle is the TRANSPORT PACKET'S, never an authoring UNIT's** (R-15's *"see below"* defers it here; the bank's own naming: *"the transport repair packet"*).

**From kf-PlaybackRibbon — under the KF.W7 rider:**
- **instrument-truth core** — **D-1** (+N-2's demo half) · **D-2's demo arm** · **C-2 (the time-space contract; the channel mount is the pin; cure JOINTLY with the KF-CO-15 extension so scale and space land together)**.
- **the KF-CO-15 riders** — reactive `:max` (live at `:19` as `:max="effectiveDuration"` — **verify what remains**), one duration read, one guard (L-m9).
- **C-3** (`valueCommit`) · **C-4** (`:step`).
- **one-prop/one-token cures** — D-5 (+M-6) · D-6 (`disabled`) · D-10 (accent pair) · **L-M1 (delete the wrapper gate, carry S-3)**.
- **hygiene sweep** — D-7 (`size`) · **D-8/N-1/D-15 (one pressed authority; borders authored or deleted)** · N-3 (delete `:76-78`) · D-17/N-4 (one icon rung) · D-13 (`--control-text`) · D-16 (delete both heights **and** the comment) · D-19 (rename) · **D-20/D-25 (the five-false-comments prose sweep)** · D-23-as-preconditions (with KF-ES-2's owner) · L-m5/L-m6/L-m9/C-9/C-11/N-5/N-6 · L-i2/C-15 (doc obligations).
- **G-KFW9-9's two-deletion act with the K-5 lock intact — one deletion fixes nothing, the pair is ONE act** (§6.D row 3; §B.5(3)).
- **D-12's demo-side stopgap bytes** — *whose measurement KF.W9 holds and whose cure is this packet's*. **W13 owns `playback-idiom.css`** (and `design-idioms.css`'s copy **is already gone** — §B.1 row 7, so the "same single act" is now single-file).
- **Born-RED candidates the packet inherits** (the bank's own list): the **signed-seek witness** (residue 9), a **keyboard-scrub pause/resume assertion** (C-3), an **axe/name assertion on the thumb** (D-1), a **forced-colors focus screenshot** (D-3).

---

## §Agent Units

| unit | seat | packet | writes | closes when |
|---|---|---|---|---|
| `.a` | Fable-worker ∥ Opus-worker → fresh-Fable arbiter (**a deletion whose safety rests on a mechanism claim is the toughest work this wave has**) | *(design act)* | `evidence/W13/**` **only** — **NO product byte** | **G-KFW13-0 GREEN**: a mounted proof that `MbabbMenu` holds the dock open via `useOptionalDockContext()`, banked with its output. **No deletion is lawful before this.** |
| `.b` | Opus solo (a roster + one bounded deletion, on a proven predicate) | **dock-menu** | `demo/app/dock/**` · `demo/app/App.vue` · `DemoGlobalChrome.vue` · `SharePopover.vue`/`KeyboardShortcutsModal.vue` (narrow) | G-KFW13-1 · G-KFW13-2 GREEN; **the MUST-CARRY rider lands in the SAME commit as the deletion** |
| `.c` | Fable-worker ∥ Opus-worker → fresh-Fable arbiter | **transport/ribbon** | `TransportDock.vue` · `TransportDock/**` · `PlaybackRibbon.vue` · `playback-idiom.css` · `font-roles.json` | G-KFW13-3 · G-KFW13-4 · G-KFW13-5 GREEN; **OP-5's remainder derivation receipted FIRST** |
| `.d` | Opus solo | **transport/ribbon** (the two-deletion act) + close | the two deletion targets · the close record | G-KFW13-6 GREEN; **both deletions in ONE commit** (K-5); the close record written; **zero SWAP-discharge receipts** (OP-3: the set is empty) |

**Receipts every seat**: line 1 = `SERVED MODEL: <id>`; ⟨cmd⟩ provenance on every published figure; **self-count law**; dated corrections appended, never rewritten (E-3).

---

## §Gates — eight, every one **BORN-RED**, every one with its literal command

**SELF-COUNT (LAW D(3), the counting rule stated at the enumeration).** ⟨cmd⟩ `grep -c '^### G-KFW13' KF-W13.md` → **8** — `G-KFW13-0` (the phase-1 safety predicate) plus `G-KFW13-1` … `G-KFW13-7`. The ordinals start at **0** because the design act is a gate with no product byte behind it, and a gate that gates a *deletion* must be numbered before the thing it gates.

**Gate law.** No gate exists without a named live witness (L-19). Every command was **run read-only at `69095552` by this authoring seat** and its output is quoted. Commands are portable BSD.

### G-KFW13-0 — the self-hold is PROVEN before anything is deleted · **BORN-RED** *(phase 1; the wave's safety predicate)*
**Statement.** In a mounted render, `MbabbMenu` calling `useOptionalDockContext()` resolves the **provider ChromeDock installs** and its `keepOpen()` / `release()` pin the dock — **without** the `itemsPopupOpen` round-trip.
**Falsifier today.** ⟨cmd⟩ `git grep -n "useOptionalDockContext" origin/master -- demo/` → **one hit, and it is the comment asserting the opposite**: `ChromeDock.vue:110`, inside `:109-113`'s claim that the slot content's call *"resolves ABOVE this provider and cannot hold the dock open itself"*. **No demo file calls the function.** The registry KILLED that claim at the bank (runtime-parent-chain resolution, proven by glass-ui's own portal stamp inside ChromeDock's render) — **but the kill is a reading, and this gate is an execution.**
**GREEN requires** the mounted proof banked at `evidence/W13/` with its output. **A cure spent on a reading fails this gate**, and the register's own history here — *"a superlative was awarded for a false statement about Vue; it is withdrawn, not qualified"* — is why the gate exists at all.

### G-KFW13-1 — the round-trip is gone and the menu still opens · **BORN-RED** *(dock-menu; the MUST-CARRY rider in gate form)*
⟨cmd⟩ `git grep -n "itemsPopupOpen\|items-popup-open\|mbabbPopupOpen" origin/master -- demo/` → **5 code sites + 2 prose sites**: `App.vue:29`, `:37`, `:372` · `ChromeDock.vue:114`, `:237` · prose `App.vue:369`, `MbabbMenu.vue:186`. ⟨cmd⟩ `git grep -n "const open" origin/master -- demo/app/dock/MbabbMenu.vue` → `:204 const open = defineModel<boolean>("open", { default: false });`.
**GREEN requires, in ONE commit** (the rider is not a follow-up):
(a) the first command returns **0**;
(b) **`MbabbMenu` self-holds** via `useOptionalDockContext()` — G-KFW13-0's proof, now in the shipped bytes;
(c) **the menu opens and stays open in a mounted assertion** — *glass-ui's bare `{ type: Boolean }` declarations make the primitive permanently controlled, so a cure that deletes the round-trip without the hold **ships an unopenable menu***;
(d) `i-2`'s unpaired `release()` is **named as dying with the round-trip**;
(e) `:109-113`'s false-mechanism comment is **deleted or corrected** (KF-CE-41's law);
(f) **`ComponentExposed<>` / `Pick<>` do not appear** — ⟨cmd⟩ `git grep -c 'ComponentExposed\|Pick<' <diff>` → **0** (R3-1's kill is ratified; those remedies must not land).
**RED today on all six.**

### G-KFW13-2 — the dock-menu roster is spent under ARB-1's law · **BORN-RED**
**GREEN requires**: every id in C-1's 27-row roster reads **LANDED** / **KILLED with rationale** / **carried**; **MM-1/MM-6's four-part cure lands as ONE edit** (repair `:100` + dispose `setPPMode` with KF-APP-17 + resolve the C-14 bucket split + land the MM-5 CheckboxItem); and **ARB-1's law is obeyed at the diff**: ⟨cmd⟩ on the diff shows **no `headerLeft` 'fill' arm** — **DELETE is the only self-contained cure until the KF-APP-5 producer relay lands.** A 'fill' arm in this wave's diff is a **HIGH defect** (it lands inside an inert toolbar) **and** a lock violation.

### G-KFW13-3 — one propagation policy, stated once, symmetric on both mirrors · **BORN-RED** *(transport/ribbon)*
⟨cmd⟩ `git grep -c "\.stop" origin/master -- demo/components/instrument/transport/TransportDock.vue demo/app/dock/ChromeDock.vue` → **`TransportDock.vue:5`** (at `:205-209`: `@pointerdown.stop`, `@pointerup.stop`, `@pointercancel.stop`, `@keydown.stop`, `@keyup.stop`) and **ChromeDock: no output (exit 1) = 0**. **The asymmetry is the defect and it is one command wide.**
**GREEN requires**: the policy **written down once** and **both mirrors conform to it** (whatever it decides — symmetry is the invariant, not `.stop`); **Space registration scoped away from button targets**; and **composition tests that mount the buttons WITH the registry** (the bank's words — a test that mounts them without it proves nothing).
**OP-5 obligation inside the gate**: ⟨cmd⟩ `git grep -n "isSpace\|spaceArmed" origin/master -- …/TransportDock/usePlayActuation.ts` → `:39-40` · `:46` · `:74` · `:82` — **the native Space/keyup semantics are ALREADY LANDED** in a composable the bank predates. **`.c` states what remains of TD-2/TD-38/TD-40 before spending a cure**; the bundle lock (L-3) binds the remainder.

### G-KFW13-4 — actuation cancels · **BORN-RED**
**TD-21 (+r2 rider) + TD-41**: per-control origin, release-elsewhere cleanup, blur-class disarm.
**GREEN requires** the two named test cases — **orphan-keyup** and **stale-id** — passing, with the RED run pasted. **RED today**: ⟨cmd⟩ `git grep -c "usePlayActuation" origin/master -- test/` → **0** — no test names the composable.

### G-KFW13-5 — the ribbon reports the time-space it scrubs · **BORN-RED**
**C-2 is the gate's spine**: the time-space contract, **cured JOINTLY with the KF-CO-15 extension so scale and space land together** — the channel mount is the pin.
⟨cmd⟩ `git grep -n ":max\|is-disabled" origin/master -- demo/components/playback/PlaybackRibbon.vue` → `:9` · `:19` (`:max="effectiveDuration"`) · `:74`. **The reactive `:max` rider appears partly landed; `.c` derives the remainder and says so.**
**Four born-RED witnesses the packet inherits, asserted in this gate's run**: the **signed-seek witness** (residue 9) · a **keyboard-scrub pause/resume assertion** (C-3's `valueCommit`) · an **axe/name assertion on the thumb** (D-1) · a **forced-colors focus screenshot** (D-3). **Probe parsimony (§5.2)**: the forced-colors pass and the axe pass are **one shared capture each**, keyed to apotheosis row ids, never free-form.
**Plus the prose limb**: D-20/D-25's **five false comments** are corrected in the same motion (KF-CE-41's law).

### G-KFW13-6 — the two-deletion act is ONE act · **BORN-RED** *(close-adjacent; K-5's lock in gate form)*
**G-KFW9-9's two deletions land in a single commit.** **One deletion fixes nothing; the pair is ONE act** (§6.D row 3, verbatim).
**GREEN requires**: one commit, both targets, **both consumer censuses pasted together** (§B.5(3)); and **N-3's `:76-78` deletion** carries its own census in its own commit. **A commit containing exactly one of the pair fails this gate even if the tree is green** — that is what a commit-family lock means.

### G-KFW13-7 — the two sweeps use the frontier's denominators, and neither amends a dated authority · **BORN-RED** *(cross-cutting; OP-7 in gate form)*
⟨cmd⟩ `git grep -l "btn-playback" origin/master -- demo/ | wc -l` → **8** (double-run **8**). ⟨cmd⟩ `git grep -n '\bfocus-ring\b' origin/master -- demo/ | grep -v kf-focus-ring | grep -v focus-ring-shadow` → **2 class applications** (`SpringTarget.vue:63`, `SquareScene.vue:46`).
**GREEN requires**: (a) the sweep's receipt states **8** and **2** with these commands, **re-run at execution**; (b) the receipt **quotes RULINGS-4's 7 and 4 beside them and amends neither** (**E-3** — a dated authority is corrected by an addendum-beside, never in place); (c) the eighth `btn-playback` file (`KeyframeTimeline.vue`) is **routed, not edited** — it is a KF.W7 surface; (d) the **two bare `.focus-ring` sites are KF.W11's files** and this wave **states the policy and edits neither** (§Cross-edges).
**This gate exists because the register's own words — *"the figures above are quoted from RULINGS-4, which is this round's fixed authority, not from a spec that moves"* — are true about the authority and silent about the tree, and the tree moved 203 commits.**

---

## §Sequencing

### Locks (binding on execution order, inside and around this wave)

- **L-1 · NO DELETION BEFORE G-KFW13-0.** `.a` is a separate, serial, product-byte-free phase. **The M-4 deletion's safety is a mechanism claim, and the register's history at this exact row is a mechanism claim that was false.** The proof precedes the cure.
- **L-2 · kf-ChromeDock M-4's MUST-CARRY MbabbMenu RIDER — carried, not cited** (§6.D row 3, travelling lock 1). **M-4's cure as worded ships an unopenable menu without it.** The self-hold and the deletion are **ONE commit**; a follow-up commit is a shipped regression with a fix pending.
- **L-3 · THE TD-1/TD-2 BUNDLE, WHOLE** (§6.D row 3, travelling lock 2) — TD-1's *"cure with TD-4 + PRM + test, one commit"*; **TD-2's one-commit-with-TD-38/TD-40 lock**; and **TD-21 + TD-41 must not split**. The bundle is the **transport packet's**, never an authoring UNIT's (R-15's *"see below"*; the bank's own *"the transport repair packet"*). **A member already landed upstream does not dissolve the bundle for the rest.**
- **L-4 · KF-AV-28's STANDING SUPERSESSION RIDER on the transport/ribbon surfaces** (§6.D row 3, travelling lock 3). **The verdict is IN: six KEEP-BESPOKE, ZERO SWAP, discharge set EMPTY.** `.c` **STATES this before spending any cure** (KF-W7 G15's discharge discipline) and **emits zero `DISCHARGED by KF.W7 SWAP verdict <surface>, <date>` receipts** — *"the inverse error (a downstream wave assuming a swap happened) costs exactly as much as a silent discharge."*
- **L-5 · K-5's TWO-DELETION LOCK** — G-KFW9-9's pair is ONE act. **One deletion fixes nothing.**
- **L-6 · GLASS-PRODUCER ROWS → SS-6, NEVER DEMO-SIDE HACKS** (§6.D row 3, travelling lock 4). The bare `{ type: Boolean }` declarations that make the dock primitive permanently controlled are **the** producer row of this wave, and the rider at L-2 is the demo-side *accommodation* of it — **not a fix of it**. The relay says so.
- **L-7 · ARB-1's delete-arm-only law inside the KF-APP-1/-17 motion** — **the `headerLeft` 'fill' arm is a TRAP**; DELETE is the only self-contained cure until the KF-APP-5 producer relay lands. *(Shared with KF.W11's cube packet; both obey, neither re-books.)*
- **L-8 · R3-1's KILL IS RATIFIED AND BINDS THE CURE'S SHAPE** — the five ChromeDock call sites are typed today; **C-2's cure is NOT gated**; **`ComponentExposed<>` / `Pick<>` must not land.** A seat that "fixes types" here is curing a defect the registry killed with three concordant real-package probes.
- **L-9 · THE SWEEPS RE-DERIVE, THE AUTHORITIES STAND** — §B.1 rows 5/6/7 are **frontier readings beside** RULINGS-4's fixed figures. **E-3: dated specs, the adjudicated registry, conformance artifacts and prior evidence are IMMUTABLE — corrections are dated addenda-beside.**
- **L-10 · TD-36's ONE IDENTITY, ONE HOME** — banked at kf-TransportDock, **bytes in `ChromeDock.vue`**, carried in C-1. It appears in two routing blocks and is **spent once**.

### Cross-edges, declared from this end

| → | subject | form |
|---|---|---|
| **KF.W11** | (a) **the two remaining bare `.focus-ring` sites are KF.W11's files** (`SpringTarget.vue:63`, `SquareScene.vue:46`) — **this wave states the policy, KF.W11 spends the edits**; (b) the **spring packet is "sequenced with the transport/ribbon packet"** (kf-SpringScene's own words) — the ordering is declared from both ends; (c) **kf-SequenceScene N-3's `:76-78` deletion** is KF.W11's finding and **this wave's bytes**; (d) **ARB-1's delete-arm-only law is shared** and re-booked by neither; (e) **ACG D-1's portal cure is KF.W11's rider**, read-only here | **DECLARED, no reciprocation promised** — KF.W11 is MINTED-UNAUTHORED and this seat promises nothing from an unauthored spec |
| **KF.W12** | the **`.focus-ring` census's other half**: `KeyframeCard.vue` migrated to `kf-focus-ring` at `:117` (KF.W12's file, its §B.1 row 6). The two halves of RULINGS-4's four-site census now sit in two successor waves and **neither amends the census** | **DECLARED** |
| **KF.W7** | **consumed, not owed**: the six KEEP-BESPOKE verdicts, the **EMPTY discharge set**, and the explicit → KF.W13 edge (*"both packets are un-gated by a swap that did not happen"*; the three re-affirmed locks). Also: `KeyframeTimeline.vue` is a KF.W7 surface and the **eighth `btn-playback` file** — **counted, routed, not edited** | **INBOUND ONLY** — KF.W7 is CLOSED |
| **KF.W9 / SS-13** | **D-12's measurement is KF.W9's and the cure is this packet's**; the four born-RED witnesses (signed-seek · keyboard-scrub pause/resume · axe/name on the thumb · forced-colors focus) ride by **apotheosis row id** under **one shared capture each** (§5.2) | **DECLARED** |
| **SS-6 (glass BH relay)** | glass-ui's **bare `{ type: Boolean }` declarations** (the permanently-controlled primitive) and every other producer row this wave surfaces | **MAIL, per L-6** |

---

## §Excluded — everything not carried, with its reason and its named owner

| excluded | owner · reason |
|---|---|
| **Fixing glass-ui's `{ type: Boolean }` declarations** | **SS-6 / glass-ui** — READ-ONLY always. The MUST-CARRY rider **accommodates** the producer defect; it does not cure it, and it says so |
| **The `ComponentExposed<>` / `Pick<>` remedies for R3-1** | **KILLED (ratified)** — three concordant real-package probes vs one hand-mirror. **They must not land** (L-8) |
| **The `headerLeft` 'fill' arm** | **TRAPPED — ARB-1** — it lands inside an inert toolbar. DELETE only, until the **KF-APP-5** producer relay lands |
| **`AnimationVisualizer.vue` and the drag-seam** | **KF.W11** — §6.D row 1's cargo. KF.W7 ruled the surface KEEP-BESPOKE; this wave reads it and writes nothing |
| **`AnimationControlsGroup**` and ACG D-1's portal cure** | **KF.W11** (the cube packet's C-15 limb rider) |
| **`KeyframeTimeline.vue`** — the frontier's eighth `btn-playback` file | **KF.W7**, CLOSED. **Counted in the sweep's denominator, routed, never edited** (G-KFW13-7(c)) |
| **`SpringTarget.vue:63` · `SquareScene.vue:46`** — the two bare `.focus-ring` sites | **KF.W11's files.** This wave sets the policy; those bytes are another packet's |
| **`KeyframeCard.vue`'s `kf-focus-ring`** | **KF.W12** — the census's other half |
| **Amending RULINGS-4's `btn-playback` (7) and `.focus-ring` (4) figures** | **E-3** — dated authorities are immutable. §B.1 rows 5–6 are frontier readings **beside** them, each with its command |
| **Re-auditing any of the 9 records** | **the registry's** — ADJUDICATED; ids for life; folds by reference at the banked id |
| **Emitting any `DISCHARGED by KF.W7 SWAP verdict <surface>, <date>` receipt** | **KF.W7's set is EMPTY** — six KEEP-BESPOKE, zero SWAP. This wave adds nothing to a set that has no members |

---

## §Commit plan, artefacts, and the L-18 rider

| # | scope | body required | family lock |
|---|---|---|---|
| 1 | `docs(X·KF W13): the self-hold proof — useOptionalDockContext resolves the ChromeDock provider` | yes — the mounted proof's output, pasted | **NO product byte in this commit** (L-1) |
| 2 | `refactor(kf/dock): delete the itemsPopupOpen round-trip; MbabbMenu self-holds` | yes — the five sites, the hold, `i-2`'s death, the corrected `:109-113` comment | **MUST NOT SPLIT** — rider + deletion are ONE commit (L-2) |
| 3 | `fix(kf/dock): MM-1/MM-6 — repair :100, dispose setPPMode with KF-APP-17, C-14 split, MM-5 CheckboxItem` | yes — **delete arm only**, ARB-1 stated | **four parts, ONE edit** (L-7) |
| 4 | `fix(kf/dock): the actuation / typography / brand roster (27 rows)` | yes — every id LANDED or KILLED-with-rationale | — |
| 5 | `fix(kf/dock): TD-36 — the ChromeDock pointer-events pair` | yes — one identity, one home | L-10 |
| 6 | `docs(X·KF W13): the TD keyboard-family remainder, derived against landed code` | yes — **what `usePlayActuation.ts` already implements**, and what remains | **precedes commit 7** (OP-5) |
| 7 | `fix(kf/transport): one propagation policy — TD-2 + TD-38 + TD-40, both mirrors` | yes — the policy stated once; the registry-mounted composition tests | **BUNDLE, MUST NOT SPLIT** (L-3) |
| 8 | `fix(kf/transport): actuation cancellation — TD-21 + TD-41` | yes — orphan-keyup + stale-id cases, RED run pasted | **MUST NOT SPLIT** (L-3) |
| 9 | `fix(kf/transport): TD-1's cure with TD-4 + PRM + test` | yes | **one commit** (TD-1's own words) |
| 10 | `fix(kf/ribbon): the time-space contract — C-2 with the KF-CO-15 extension` | yes — scale and space **land together**; the channel mount named as the pin | **JOINT, MUST NOT SPLIT** |
| 11 | `fix(kf/ribbon): the one-prop/one-token cures + one pressed authority` | yes — D-5/D-6/D-10/L-M1; D-8/N-1/D-15 | — |
| 12 | `chore(kf/ribbon): the hygiene sweep + the five-false-comments prose pass` | yes — D-20/D-25 enumerated | — |
| 13 | `fix(kf/ribbon): D-12's stopgap — playback-idiom.css (single-file now; design-idioms' copy is gone)` | yes — §B.1 row 7's command, and the sweep's denominators (**8** / **2**) with RULINGS-4's **7** / **4** quoted beside them, **unamended** | — |
| 14 | `fix(kf/ribbon): G-KFW9-9 — the two-deletion act` | yes — **both consumer censuses, pasted together** | **BOTH DELETIONS, ONE COMMIT** (L-5) |
| 15 | `docs(X·KF W13 close): close record + SS-6 relays + E13 discharge + SS-13 routing` | yes — gate table, commits, **the discharge set stated positively as EMPTY** | — |

**Pathspec commits only**, on the commit itself; `scripts/dev/dev.sh` never staged; four tracks share this git index. **Artefacts**: `evidence/W13/**` (the mounted self-hold proof, born-RED baselines, the propagation-policy matrix, the two-deletion receipt, the four SS-13-keyed witnesses), the close record at `execution/B/KF-W13.md`, the `LEDGER.md` row advanced by minimal in-place cell replacement.

**L-18 rider.** Passing all eight gates makes X.KF.W13 **IMPLEMENTED**. It never makes it **ACCEPTED**. Per L-18 the implementation must first survive **two challenging gestalt passes**, each a quartet of Opus 5 agents assuming it is wrong, across all three altitudes — total-tranche, wave, feature — reporting defects **and** superlatives with provenance and proof, then adjudicated into an apotheosis by a **singular fresh Fable instance**; any incongruity is addressed and dispatched, never parked (L-18 §5). Reference, not ceremony: for a chrome-and-transport wave the quartet's most probable finds are **a deletion landed on a reading rather than an execution** (G-KFW13-0's class — and the register's own withdrawn superlative is the precedent), **the MUST-CARRY rider landed as a follow-up commit** (L-2's class, which ships an unopenable menu for one commit's width), **a bundle split because one member was already landed upstream** (L-3's class, and OP-5 makes it likely), **a sweep run on RULINGS-4's file list rather than the frontier's** (G-KFW13-7's class — 7 vs 8 and 4 vs 2), and **a "types fixed" commit re-curing R3-1's killed defect** (L-8's class). Each is already a named falsifier above; the quartet exists to find the ones that are not.
