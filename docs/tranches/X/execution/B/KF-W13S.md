SERVED MODEL: claude-opus-5[1m]

# KF.W13S — the X·KF supplement wave (record)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W13.md` **whole** ⊕ its dated **ADDENDUM 2026-09-20** (`:299`).
**Ruling of record**: `docs/tranches/X/COHESION.md` **§0ai** (2026-09-20, `:2314-2366`) — KF13-E2 · OP-7/TD-37 · E-b1 · M-1 · C-11 · KF.W12 `.e` residual 1 · E-d1/R-3 · KF11-E2 · KF11-E(f1) · KF11-E3 · KF11-E4 · E-c1 · the close.
**Sitting of record**: the owner's begin-word 2026-09-17 (COHESION §0j). Track B · X·KF (keyframes.js).
**Standing law**: KF-W13 §"Standing law for every unit" (`:176-178`) binds every unit of this wave verbatim.
**E-3**: KF.W11's, KF.W12's and KF.W13's CLOSED ledger cells and every dated spec / registry / conformance artefact are IMMUTABLE here. This wave never rewrites them; corrections are dated addenda beside.

---

## Open

**Date**: 2026-09-20. **Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]` — VERIFY-AND-BANK: **zero** keyframes.js bytes, **zero** glass-ui bytes, **zero** product bytes written at this seat.

### Preconditions, at the bytes AND in the ledger

| # | Condition | Receipt | Verdict |
|---|---|---|---|
| 1 | KF.W13 **CLOSED** (§0ai's "opens after") | ⟨cmd⟩ `grep -o 'KF\.W13 = CLOSED[^.]*' LEDGER.md` → `KF.W13 = CLOSED 2026-09-17 (honest-RED: G-KFW13-0 · G-KFW13-1 · G-KFW13-2 · G-KFW13-7) ⟵ CHECK 2 (fresh adversarial L-20 pass 2, VERIFY-ONLY)` | **MET** |
| 2 | KF.W13S's row exists and is not CLOSED | LEDGER `:55` status cell → `planned (RULED 2026-09-20, §0ai)` | **MET** (fresh OPEN, not RESUME) |
| 3 | The ruling is present and read whole | COHESION `:2314-2366` read end-to-end at this seat; no §0aj or later addendum exists (⟨cmd⟩ `wc -l COHESION.md` → **2366**, §0ai is the file's last section) | **MET** |
| 4 | The addendum is present and read whole | KF-W13.md `:299`, `ADDENDUM 2026-09-20 (dated, beside — E-3; COHESION §0ai)`; ⟨cmd⟩ `wc -l` → **299** (the addendum is the file's last line) | **MET** |
| 5 | The four honest-REDs are still RED at the frontier | banked below as the BEFORE baseline; **0 GREEN-BEFORE-CURE** | **MET** |
| 6 | CRASH-RECOVERY — no killed predecessor work inside this seat's writable set | ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/ docs/tranches/V/coordination/` → `M docs/tranches/X/execution/A/X-W5.md` **only** (Track A's seat, a sibling's path — NOT touched, NOT staged, NOT stashed). `execution/B/KF-W13S.md` did not exist. keyframes.js ⟨cmd⟩ `git status --porcelain` → two **untracked** value.js-authored mail files under `docs/tranches/V/coordination/` (2026-07-24 · 2026-07-27), predating this wave, outside every unit's writable set — left untouched. **No inherited partial work on any unit of this wave.** | **MET** |

**Frontier at open** — keyframes.js `HEAD` = **`9d814f6c`** (`test(kf/ribbon · X.KF.W13.c · G-KFW13-6's runtime clause …)`); value.js `HEAD` = **`58c1ba11`**.

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock and compared against **every** row of `docs/tranches/V/coordination/INBOX.md`.

1. `docs/tranches/V/` + `V/coordination/` — newest letters are the **2026-09-18** 4.1.0 quartet ⊕ the parse-that addendum-2, all ours and all rowed. ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -name '*.md' -newermt "2026-09-19 12:00" ! -name INBOX.md` → **`ARCHITECTURE.md`** + **`reformation/CARRY-LEDGER.md`** — Track A's committed canon documents, **not letters, addressed to no one**.
2. `../glass-ui/docs/tranches/` — ⟨cmd⟩ `ls -dt …/tranches/*/ | head -3` → **`BK/` · `BJ/` · `BI/`**: **BK re-confirmed the newest glass tranche dir**. Newest BK coordination item ⟨cmd⟩ `ls -t BK/coordination/*.md | head -1` → `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, already rowed**. ⟨cmd⟩ `find BK/coordination -maxdepth 1 -name '*.md' -newermt "2026-09-19 12:00"` → **empty**.
3. `../keyframes.js/docs/tranches/V/coordination/` — newest value-addressed item is our own `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`; `INBOUND-LEDGER.md` is keyframes' own register, not a letter. ⟨cmd⟩ `find … -newermt "2026-09-19 12:00"` → **empty**.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — **UNMOVED**, tail `valuejs-inbound-2026-07-27-library-band-export-delta.md`, rowed. ⟨cmd⟩ `find … -newermt "2026-09-19 12:00"` → **empty**.

**Census, double-run**: ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **90** · **90**. The classification is the **positional leading-token read** of each table's Status cell, never a bare `grep -c UNREAD` (the two tables have different widths and Letter cells carry inline `|` inside code spans — the bare grep answers **89**, which is this file's prose vocabulary, not a row census): ⟨cmd⟩ `awk -F'|' '/^\| *[IO]-[0-9]+[a-z]? *\|/ { s=$(NF-2); t=$(NF-1); if (s ~ /^ *UNREAD/ || t ~ /^ *UNREAD/) print $2 }' INBOX.md | wc -l` → **0**.

**Result: ZERO unrowed letters addressed to value.js · ZERO new `I-n` minted · ZERO rows reading UNREAD.** The wave opens with no UNREAD mail in scope. One sweep line appended at `INBOX.md`'s end; no row minted, no status cell changed.

---

## Baseline — BEFORE, read-only, at kf `9d814f6c` / vjs `58c1ba11`

All commands run from `/Users/mkbabb/Programming/keyframes.js` unless the path says otherwise. WRITE-THEN-MEASURE: the byte clauses below were **double-run** in one loop (both passes printed identical figures, quoted once with `·`).

### The four gates of record (KF.W13's honest-REDs)

| Gate | Command | BEFORE | Verdict |
|---|---|---|---|
| **G-KFW13-0** | `ls test/demo/app/` | `e-w1-encapsulation.test.ts` **only** — `dock-context-slot-resolution.test.ts` ABSENT | **RED** |
| | `grep -rc 'useOptionalDockContext' demo \| grep -v ':0'` | `demo/app/dock/ChromeDock.vue:1` · `:1` (the false comment — the reading, not the cure) | |
| **G-KFW13-1** | `ls test/demo/app/mbabb-menu-self-hold.test.ts` | ABSENT (`No test files found`) | **RED** |
| | `grep -rn 'itemsPopupOpen\|items-popup-open\|mbabbPopupOpen' demo \| wc -l` | **7** · **7** (must read **0**) | |
| | `grep -c 'v-model:open="open"' demo/app/dock/MbabbMenu.vue` | **1** · **1** — **the MUST-CARRY clause: must STILL read 1** | |
| | `sed -n '109,113p' demo/app/dock/ChromeDock.vue \| grep -c 'cannot hold the dock open'` | **1** · **1** (must read **0**) | |
| **G-KFW13-2** | no roster commit exists at HEAD; `grep -rc 'headerLeft' demo/app \| grep -v ':0'` | `demo/app/scene/sceneExposedApi.ts:2` **only** — zero `headerLeft` in `demo/app/dock/**`; the gate's diff clause (`git diff <open-sha>..HEAD -- demo/app \| grep -c "headerLeft"` → **0**) is measured against open-sha **`9d814f6c`** | **RED by construction** |
| **G-KFW13-7** | `npm run test:demo 2>&1 \| tail -3` | **Test Files 2 failed \| 55 passed (57)** · **Tests 2 failed \| 484 passed (486)** | **RED** |
| | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | **9** (must read **0** — OP-0) | |
| | `git grep -l 'btn-playback' HEAD -- demo \| wc -l` | **9** · **9** — the spec's dated figure is **8**; **DRIFT, declared here, never amended** (E-3) | |
| | `grep -rn 'focus-ring' demo \| grep '\.vue:' \| grep -v 'kf-focus-ring' \| grep -v 'focus-ring-shadow' \| grep -c 'class='` | **0** · **0** — the spec's dated figure is **2**; the two-deletion act (KF.W13 `.c`, `9ceea648`) moved it. **DRIFT, declared, never amended** | |

### The two failing demo files — both inside `.e`'s carve

```
FAIL |demo| test/demo/instrument/css-code-editor-seam.test.ts > G-KFW12-4 — the Monaco seam > (2) KF-CE-1: the tokenizer the boot registered classifies `a { color: red }`
AssertionError: expected 0 to be greater than or equal to 2   (test/demo/instrument/css-code-editor-seam.test.ts:216:30)

FAIL |demo| test/demo/scenes/spring-trace-truth.test.ts > SpringTrace — the ceiling's coupling to the ζ floor (L-14) > (4b) the floor the heatmap declares is not below the one the plot pins
Error: SpringHeatmap.vue no longer declares `DAMPING_MIN = <number>` — L-14's coupling anchor moved; re-bind the plot's PLOT_DAMPING_FLOOR witness to the new declaration   (test/demo/scenes/spring-trace-truth.test.ts:276:19)
```
These are exactly **E-d1 / KF.W12 R-3**'s KF-CE-1/4 arm and **KF11-E(f1)**'s (4b) re-bind. Both are `.e`'s rows. `npm run test:demo` green is therefore reachable inside this wave's carves.

### The nine `vue-tsc` diagnostics, mapped to a carve — the map `.f` will assert against

```
demo/app/dock/MbabbMenu.vue(208,12)  TS2339 'value' does not exist on StoredAnimationGroupControlOptions   -> .a2
demo/app/dock/MbabbMenu.vue(208,36)  TS2339 (same)                                                          -> .a2
demo/components/instrument/keyframes/composables/useKeyframeOps.ts(91,13) TS2322 string -> Easing union     -> .e, BY ROOT (E-c1)
demo/components/instrument/shell/EditorShell.vue(175,10) TS2379 exactOptionalPropertyTypes                   -> .e (KF11-E4)
demo/scenes/easing/useEasingDemo.ts(294,13) TS2322 string -> Easing union                                    -> .e (KF11-E3)
demo/scenes/easing/useEasingDemo.ts(310,43) TS2345 string -> Easing union                                    -> .e (KF11-E3)
src/animation/group/composite/compositor.ts(79,11) TS6133 'groupedKeys'                                      -> .e (KF11-E2)
src/animation/group/waapi.ts(9,1)             TS6133 'KeyframesAnimation'                                    -> .e (KF11-E2)
src/animation/physics/smooth.ts(194,13)       TS6133 '_startLoop'                                            -> .e (KF11-E2)
```
**The `useKeyframeOps.ts:91` row is NOT an escalation** and is not outside every carve, though it sits in KF.W12's Do-NOT-touch tree. The file's own §0u comment (`:80-89`) names its root at the byte: *"`parseAnimationCSS.ts:9`, `timingFunction?: string` … widens it to `string` … The cure is that one token in a file no unit of this wave owns."* §0ai **E-c1 grants exactly that file to `.e`** for "the one type-level root cure (no cast, no shim)". Curing `parseAnimationCSS.ts`'s projection type zeroes this diagnostic **without editing `useKeyframeOps.ts`** — which is the ruling's whole point. **`.e` must not touch `useKeyframeOps.ts`; if the root cure does not zero row 3, that is an ESCALATION, not a narrowing guard.**

### `.e`'s other BEFORE bytes

| Row | Command | BEFORE |
|---|---|---|
| **KF13-E2** (`.a2`) | `grep -c 'server' vitest.config.ts` | **0** — no `test.server.deps.inline`; only the S.B7 `alias` block (`:18-41`) |
| **C-11** | `grep -n 'vi.mock' test/demo/instrument/channel-options-render-edge.test.ts` | 4 mocks — `@mkbabb/glass-ui` · `/number-field` · `/drawer` · `/easing`; **`/button` ABSENT** |
| **KF.W12 `.e` residual 1** | `grep -c 'setTargets' test/demo/instrument/css-code-editor-seam.test.ts` | **0** |
| **E-d1** | `grep -c 'basic-languages' demo/env.d.ts` | **0** (the five-line ambient monaco css declaration absent) |
| **TD-37** (OP-7) | `sed -n '161p' …/TransportDock.vue` | `<!-- Collapsed state: animation name first, play button on right -->` — **name-leading**; OP-7 rules **play leading on BOTH faces** |
| **E-b1** | `wc -l demo/styles/playback-idiom.css` | **116** — the spec's dated `89` and its six half-line numbers (`:30-33` · `:23` · `:19` · `:33/:48/:69/:88` · `:87-90` · `:12-13`) are **drifted**; `.e` records INTENT at the true bytes per the addendum's own instruction |

### GREEN-BEFORE-CURE (R.2)

**EMPTY.** Every gate of record and every byte clause above reads its born-RED value at this seat's own double-run. No cure of this wave is already landed, and nothing is claimed that the frontier already gives.

---

## Unit plan

**Order** (§0ai's Mechanism, binding): group 1 = **[`KF.W13.a2` ∥ `KF.W13.e`]** (disjoint modify sets, verified path-by-path below) → group 2 = **[`KF.W13.f`]** (serial, last). At most **2** concurrent seats; **no two concurrent units share a modify path**. All three seats are **Opus** — the spec names no Fable, adjudicator or design-author seat for this supplement (`.f` is an implementing close, not §3.5's declared-Fable pass).

**Path drift, resolved once here** (the addendum: *"a seat that finds a path drifted records INTENT at the true bytes"*). The writable sets below are the **true bytes at `9d814f6c`**; the addendum's §B.2/KF-W11/KF-W12 spellings are given beside so intent is traceable:
`src/animation/engine/compositor.ts` → **`src/animation/group/composite/compositor.ts`** · `src/animation/waapi.ts` → **`src/animation/group/waapi.ts`** · `src/animation/smooth.ts` → **`src/animation/physics/smooth.ts`** · `demo/components/editor/EditorShell.vue` → **`demo/components/instrument/shell/EditorShell.vue`** (the TS2379 row is at `:175`, unmoved) · `keyframes/utils/parseAnimationCSS.ts` → **`demo/components/instrument/keyframes/utils/parseAnimationCSS.ts`**. `demo/styles/playback-idiom.css` is at the named path but is **116** lines, not 89 — its six E-b1 half line-numbers are stale and `.e` re-locates each by its subject, not its number.

**Receipts** (§Agent Units `:150`, §Bounds `:111-112`): every unit appends its own receipt to `## Unit receipts` **below** — append-only, `SERVED MODEL:` first line of any file it creates — and banks command output under `docs/tranches/X/keyframes/evidence/W13S/**`. `LEDGER.md` cells and `INBOX.md` rows are **`.f`'s alone**.

### KF.W13.a2 — the harness row, then the dock-menu packet (Opus)

- **Spec sections**: KF-W13 §Agent Units `KF.W13.a` `:152-156` (the mechanism verbatim) · §Bounds B.2 rows `:91-94` + `:105-106` + the Do-NOT-touch paragraph `:116` · §B.3 LAW A censuses **(1)** and **(4)** `:118-120` · §Gates **G-KFW13-0** `:186`, **G-KFW13-1** `:188`, **G-KFW13-2** `:190` · §Carry **P1** `:136` · §Sequencing `:206-242` · ADDENDUM `:299` (`.a2` clause) · COHESION **§0ai** `:2320-2327` (KF13-E2) and `:2334-2335` (M-1, ratified beside — no act owed).
- **Writable set** (keyframes.js-relative): `vitest.config.ts` — **one key only**, `test.server.deps.inline: ["@mkbabb/glass-ui"]`; the §Bounds Do-NOT-touch entry is lifted **for that key alone** · `demo/app/dock/ChromeDock.vue` · `demo/app/dock/MbabbMenu.vue` · `demo/app/dock/index.ts` (carve — only if the self-hold changes the surface) · `demo/app/App.vue` (carve — M-4's `:29`/`:37`/`:369`/`:372` sites + the KF-APP-1 motion's delete arm only) · `test/demo/app/dock-context-slot-resolution.test.ts` (create) · `test/demo/app/mbabb-menu-self-hold.test.ts` (create). value.js: `docs/tranches/X/execution/B/KF-W13S.md` (§Unit receipts, append-only) · `docs/tranches/X/keyframes/evidence/W13S/**` (create).
- **Gates it turns**: **G-KFW13-0** → **G-KFW13-1** → **G-KFW13-2**, GREEN **in that order in `git log`**. It also owes `.f` the two `MbabbMenu.vue:208` TS2339 rows of the OP-0 zero.
- **Locks / same-commit families**: (i) **commit 1 = the mechanism proof, NO product byte** — `git show <sha> --stat` must name only the created test; **no `demo/**` byte is in G-KFW13-0's sha**; (ii) **commit 2 = M-4's deletion + the self-hold + the corrected `:109-113` comment + the KEPT `v-model:open="open"` binding, ONE sha** — the MUST-CARRY rider is not a follow-up; (iii) MM-1/MM-6's four-part cure is **ONE sha** under ARB-1; (iv) the KF13-E2 harness row lands **before** any mounted-dock test can pass and is its own sha, named in the receipt as KF13-E2's cure; (v) **OP-8**: `git show <sha> | grep -c 'ComponentExposed\|Pick<'` → **0**; (vi) no `headerLeft` / 'fill' arm anywhere in this wave's `demo/app` diff (a HIGH defect and a lock violation); (vii) **LAW A**: no delete on a count — M-4's deletion's safety predicate **is** G-KFW13-0's executed proof, and `i-2`'s `release()` is named as dying in the body.
- **Brief**: First land KF13-E2: add `test.server.deps.inline: ["@mkbabb/glass-ui"]` to `vitest.config.ts` (the producer's dist chunks are then Vite-transformed so the S.B7 alias resolves the bare `@mkbabb/keyframes.js` self-specifier) — one key, own sha, no mock, no patch, no copied selector. Then commit 1: create `dock-context-slot-resolution.test.ts` mounting slot content inside a `GlassDock` provider and asserting `useOptionalDockContext()` resolves non-null with `keepOpen()`/`release()` observable on `expanded`; bank its output; **no product byte in that sha**. Then commit 2, ONE sha: delete M-4's five-site `itemsPopupOpen` round-trip (7 → 0), give `MbabbMenu` its self-hold via `useOptionalDockContext()`, correct `ChromeDock.vue:109-113`'s false prose, and **keep** `v-model:open="open"` (must still read 1). Then MM-1/MM-6's four-part cure as one sha, the `:169` 27-row family, MM-29's `:5-14`, TD-36's `:299`/`:302` pair, the chrome roster — every id LANDED / KILLED-with-rationale / carried. Cure `MbabbMenu.vue:208`'s two TS2339 rows at their root. Record the producer ask for `.f`; print OP-3's dist measurement.

### KF.W13.e — the addendum's cure list (Opus)

- **Spec sections**: ADDENDUM `:299` (`.e` clause — **the governing list**) · COHESION **§0ai** `:2328-2358` (OP-7/TD-37 · E-b1 · C-11 · KF.W12 `.e` residual 1 · E-d1/R-3 · KF11-E2 · KF11-E(f1) · KF11-E3 · KF11-E4 · E-c1) · KF-W13 §Bounds `:95` and `:103` + `:116` · §Gates G-KFW13-3's byte clauses `:192` (read-only context for the `.stop` symmetry TD-37 must not disturb) · KF-W12 §Gates **G-KFW12-4** `:238` · KF-W11 §Gates **G-KFW11-4** `:295` and **G-KFW11-10** `:307`.
- **Writable set** (true bytes): `demo/styles/playback-idiom.css` (E-b1's six halves: D-10 · D-13 · D-16 · N-1 ×4 · D-8/D-15 · D-20 — relocated by subject) · `demo/components/instrument/transport/TransportDock.vue` (**TD-37 only**, under OP-7, with TD-21's shared-Set rider) · `test/demo/instrument/channel-options-render-edge.test.ts` (**C-11: one line**, `vi.mock("@mkbabb/glass-ui/button")`) · `test/demo/instrument/css-code-editor-seam.test.ts` (the preset double gains the real seat API `setTargets`) · `demo/env.d.ts` (the five-line ambient declaration for monaco `basic-languages/css/css.js`) · `demo/components/instrument/keyframes/CSSCodeEditor.vue` (the KF-CE-1/4 arm (b), **byte-exact** from `evidence/W12/KF-W12-d-born-red.md`) · `src/animation/group/composite/compositor.ts` · `src/animation/group/waapi.ts` · `src/animation/physics/smooth.ts` (§Excluded lifted for **exactly** the three TS6133 declarations) · `test/demo/scenes/spring-trace-truth.test.ts` ((4b) re-bind) · `demo/scenes/easing/useEasingDemo.ts` · `demo/scenes/easing/EasingSidebar.vue` · `demo/scenes/easing/EasingTarget.vue` (KF11-E3's three-file contract) · `demo/components/instrument/shell/EditorShell.vue` **`:175` only** · `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts` (E-c1, type-level). value.js: `execution/B/KF-W13S.md` (§Unit receipts, append-only) · `keyframes/evidence/W13S/**`.
- **Gates it turns**: **G-KFW12-4** (`css-code-editor-seam.test.ts` all green) · **G-KFW11-4** (`spring-trace-truth.test.ts` all green) · seven of the nine OP-0 rows (`useEasingDemo` ×2 · `EditorShell` ×1 · the three TS6133 · `useKeyframeOps.ts:91` **by root**) · the two failing demo files of the baseline → green, which is **G-KFW11-10**'s and **G-KFW13-7**'s `npm run test:demo` limb.
- **Locks / same-commit families**: TD-37 lands **only** under OP-7's ruling, with TD-21's shared-Set rider **in the same family**, and must leave G-KFW13-3's `.stop` symmetry (0 on both faces) untouched. The KF-CE-1/4 arm is re-landed **byte-exact from the banked hunk** — a re-derivation is a defect; `env.d.ts`'s ambient declaration rides the same motion, and the bundle delta (+4,255 B vendor-monaco, −1,054,628 B css.worker) is quoted as the cure's own receipt. **No cast, no shim, no narrowing guard anywhere**: KF11-E3 types `cssValue` at its source (bare `steps`/`cubic-bezier` editor modes translated into real CSS **before** the seam, the getter returning the `Easing` union), KF11-E4 is exactly `:key="superKey ?? ''"` with the public prop contract untouched, E-c1 is one type-level token in `parseAnimationCSS.ts`. **`demo/components/instrument/keyframes/composables/useKeyframeOps.ts` is NOT writable** — its TS2322 must fall out of E-c1's root cure; if it does not, that is an ESCALATION returned, never narrowed here. The three TS6133 declarations **die** (unused declarations are deleted with their diagnostics, not `void`-ed or renamed). One commit per meaning.
- **Brief**: Take the addendum's list in order, each as its own meaning-commit. TD-37 first under OP-7: make the collapsed pill `[play][name]` so both faces are **play-leading** (`TransportDock.vue:161`'s comment currently reads name-first), carrying TD-21's shared-Set rider in the same sha and leaving the stated propagation policy and the 0/0 `.stop` symmetry intact. Then E-b1's six `playback-idiom.css` halves, relocated by subject (the file is 116 lines, not the spec's 89). Then C-11's one `vi.mock("@mkbabb/glass-ui/button")` line, and `css-code-editor-seam.test.ts`'s preset double gaining `setTargets`. Then E-d1: `env.d.ts`'s five-line ambient monaco css declaration ⊕ the KF-CE-1/4 arm (b) re-landed byte-exact from `evidence/W12/KF-W12-d-born-red.md`, greening the baseline's KF-CE-1 failure. Then KF11-E2: delete `groupedKeys`, `KeyframesAnimation`, `_startLoop`. Then KF11-E(f1): `spring-trace-truth.test.ts` (4b) `import { DAMPING_AXIS }` and assert `DAMPING_AXIS.min >= PLOT_DAMPING_FLOOR`, the regex read dying. Then KF11-E3's three-file typed seam, KF11-E4's `:key`, and E-c1's one token.

### KF.W13.f — close (Opus, serial last)

- **Spec sections**: KF-W13 §Agent Units `KF.W13.d` `:170-174` (mechanism verbatim) · §Gates **G-KFW13-7** `:200` · §Bounds `:111-114` · ADDENDUM `:299` (`.f` clause) · COHESION **§0ai** `:2359-2362` (Close) and §4a (the SS-6 accretion register).
- **Writable set** (value.js only): `docs/tranches/X/execution/B/KF-W13S.md` · `docs/tranches/X/execution/LEDGER.md` (**this wave's row cells + appended lines ONLY**; minimal in-place edits, re-read immediately before each) · `docs/tranches/V/coordination/INBOX.md` (append: the close sweep line ⊕ the SS-6 accretion) · `docs/tranches/X/keyframes/evidence/W13S/**`.
- **Gates it turns**: **G-KFW13-0 · -1 · -2 · -7** re-run double from the settled bytes, plus **G-KFW12-4 · G-KFW12-7** and **G-KFW11-4 · G-KFW11-10** re-read (§0ai's "gates of record for the supplement"). Literals: `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **0** · `npm run test:demo` every `test/demo/**` file passing · `npm run check` exit **0** · `git diff 9d814f6c..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('` → **0**.
- **Locks**: `vue-tsc` **0** is the sub-tranche's literal — §0u's ratchet ends where the count ends, and a non-zero count closes honest-RED rather than being re-based. The two drifted sweep denominators (**9** for `btn-playback`, **0** for the bare focus-ring sites) are re-run at close and published **beside** RULINGS-4's `7`/`4` and the spec's `8`/`2`, **amending neither** (E-3). **KF.W11's, KF.W12's and KF.W13's CLOSED cells are NEVER rewritten** — this wave moves only its own `KF.W13S` row. keyframes.js is pushed; **value.js is pushed ONLY when no sibling path is staged** (d-R9's rule — four tracks share this index). Pathspec commits on the commit itself, always.
- **Brief**: Re-run all eight gates double from `git show HEAD:<f>`, publishing BEFORE→AFTER against this record's Baseline. Audit every sha of the wave with `git show --stat` against §Bounds, proving each declared family unsplit and naming any out-of-bounds path. Assert `vue-tsc` 0 with the nine-row map above as the accounting. Run `npm run test:demo` and `npm run check`. Write the SS-6 / BH accretion for any producer row the two units relayed (glass-ui READ-ONLY; no letter is minted unless one is actually delivered). Do the E13 close sweep on the four paths, positional read, and append the line. Set `KF.W13S`'s LEDGER status cell by minimal in-place replacement and append its event line. Push keyframes.js; push value.js only if `git status --porcelain` shows no staged sibling path. State the residual/escalation set positively, EMPTY or enumerated.

---

## Unit receipts

_(append-only; each unit writes its own, `SERVED MODEL:` named)_
