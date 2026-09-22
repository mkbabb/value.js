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

---

## Close

**Seat**: `.f` CLOSE (VERIFY-ONLY), `claude-opus-5[1m]`, 2026-09-20. **Cured nothing**: zero keyframes.js product bytes, zero glass-ui bytes, zero test bytes written at this seat. Every figure below is this seat's own double-run from the settled bytes.

**Frontier at close** — keyframes.js `HEAD` = **`51f39a19`** (6 commits over the open sha `9d814f6c`); value.js `HEAD` = `35c8e1f9` at entry.

**The wave did not finish.** Both implementing units were returned **DEAD** by the runner (`{"KF.W13.a2":{"status":"DEAD","commits":[]}, "KF.W13.e":{"status":"DEAD","commits":[]}}`) — **but the unit returns are wrong at the bytes**: six commits carrying those two unit ids are in `git log`, and this close audits them as landed work rather than taking the DEAD return's empty commit list. Neither unit appended a receipt to §Unit receipts, so §Unit receipts stays empty and this Close is the wave's only receipt.

### Gate table — BEFORE (Baseline, kf `9d814f6c`) → AFTER (kf `51f39a19`), each double-run

| Gate | Clause | BEFORE | AFTER | Verdict |
|---|---|---|---|---|
| **G-KFW13-0** | `npx vitest run --project demo test/demo/app/dock-context-slot-resolution.test.ts` | `No test files found` | **`Test Files 1 passed (1)` · `Tests 3 passed (3)`** · re-run `1 passed (1)` | **GREEN** |
| | `grep -rc 'useOptionalDockContext' demo \| grep -v ':0'` (no `demo/**` byte in its sha) | `ChromeDock.vue:1` | `ChromeDock.vue:1` at `6a960349` (`git show --stat` names the created test **only**) | **GREEN** |
| **G-KFW13-1** | `grep -rn 'itemsPopupOpen\|items-popup-open\|mbabbPopupOpen' demo \| wc -l` (must be **0**) | **7** · **7** | **0** · **0** | **GREEN** |
| | MUST-CARRY `grep -c 'v-model:open="open"' demo/app/dock/MbabbMenu.vue` (must STILL be **1**) | **1** · **1** | **1** · **1** | **GREEN** |
| | `sed -n '109,113p' demo/app/dock/ChromeDock.vue \| grep -c 'cannot hold the dock open'` (must be **0**) | **1** · **1** | **0** · **0** | **GREEN** |
| | OP-8 `git show 600246c3 \| grep -c 'ComponentExposed\|Pick<'` (must be **0**) | — | **0** | **GREEN** |
| | **runtime clause** `npx vitest run --project demo test/demo/app/mbabb-menu-self-hold.test.ts` | `No test files found` | **`Tests 3 failed \| 2 passed (5)`** · re-run `1 failed (1)` — and **the file is UNCOMMITTED** (`git status --porcelain` → `?? test/demo/app/mbabb-menu-self-hold.test.ts`) | **RED** |
| **G-KFW13-1 overall** | byte clauses ∧ runtime clause | RED | **SPLIT — four byte clauses GREEN, the runtime clause RED** | **RED** |
| **G-KFW13-2** | `git diff 9d814f6c..HEAD -- demo/app \| grep -c "headerLeft"` (must be **0**) | 0 by construction | **0** · **0** (no 'fill' arm; the trap was not sprung) | **GREEN limb** |
| | the roster limb — every id of P1's 27-row family + the ChromeDock roster reads LANDED / KILLED-with-rationale / carried in a receipt | RED by construction | **RED — no roster commit exists** (`git log 9d814f6c..HEAD` carries M-4 alone from P1; MM-1/MM-6's four-part cure, MM-29, TD-36 and the chrome roster never landed; no unit receipt was written) | **RED** |
| **G-KFW13-7** | `npm run test:demo` | `Test Files 2 failed \| 55 passed (57)` · `Tests 2 failed \| 484 passed (486)` | **`Test Files 3 failed \| 56 passed (59)` · `Tests 5 failed \| 489 passed (494)`**, reproduced twice on a warm pool | **RED** |
| | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` (must be **0**) | **9** | **9** · **9** | **RED** |
| | `npm run check` (exit 0) | — | **exit 2** | **RED** |
| | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` (must be **0**) | — | **0** | **GREEN** |
| | sweep `git grep -l 'btn-playback' HEAD -- demo \| wc -l` | **9** | **9** · **9** — beside RULINGS-4's **7** and the spec's **8**, **amending neither** (E-3) | **DRIFT, declared** |
| | sweep bare `.focus-ring` class applications | **0** | **0** · **0** — beside RULINGS-4's **4** and the spec's **2**, amending neither | **DRIFT, declared** |
| | `grep -c 'DISCHARGED by KF.W7 SWAP verdict' execution/B/KF-W13S.md` | 0 | **0** | **GREEN** |
| **G-KFW12-4** | `css-code-editor-seam.test.ts` all green | 1 failed (KF-CE-1) | **1 failed** — `(2) KF-CE-1: expected 0 to be greater than or equal to 2` at `:216:30`, unmoved | **RED** |
| **G-KFW12-7** | test:demo green ∧ vue-tsc 0 | RED | **RED** (both limbs above) | **RED** |
| **G-KFW11-4** | `spring-trace-truth.test.ts` all green | 1 failed ((4b)) | **1 failed** — `SpringHeatmap.vue no longer declares DAMPING_MIN` at `:276:19`, unmoved | **RED** |
| **G-KFW11-10** | test:demo green ∧ vue-tsc 0 | RED | **RED** | **RED** |

**Score: 1 GREEN (G-KFW13-0, the wave's one real green) · 1 SPLIT (G-KFW13-1) · 6 RED.** Zero gates were argued green; zero were re-based.

### The close seat's own re-run (2026-09-20, second close pass, VERIFY-ONLY)

This Close's gate table above was begun by a predecessor close seat that was killed before
the roster. **Every figure in it was re-measured at THIS seat's own double-run commands
before the table was kept** (CRASH-RECOVERY: the inherited paths are `execution/B/KF-W13S.md`
— the `## Close` heading through the score line — and `keyframes/evidence/W13S/KF-W13-a2-g0-proof.md`,
which was untracked; both are inside `.f`'s writable set, both judged against the spec, and
both are named here and committed rather than taken on their word). **All twelve figures
reproduce**: G-KFW13-0 `Tests 3 passed (3)` · `3 passed (3)`; G-KFW13-1's runtime clause
`Tests 3 failed | 2 passed (5)` · `3 failed | 2 passed (5)`; `itemsPopupOpen` **0** · **0**;
MUST-CARRY **1** · **1**; the false prose **0** · **0**; `headerLeft` **0** · **0**;
`npm run test:demo` `Test Files 3 failed | 56 passed (59)` · `Tests 5 failed | 489 passed (494)`,
twice; `vue-tsc` **9** · **9**; `npm run check` **exit 2** · **exit 2**; `btn-playback` **9** · **9**;
the bare `.focus-ring` class applications **0** · **0**; skip/only in the test diff **0** · **0**.
**One correction, dated beside** (E-3, the predecessor's text is not rewritten): the two
`MbabbMenu.vue` TS2339 rows the Baseline maps at **`(208,12)`/`(208,36)`** now read
**`(248,12)`/`(248,36)`** — `600246c3` moved them and cured neither, which is why the OP-0 count
is unmoved at 9.

### Commit roster — six shas over `9d814f6c..51f39a19`, every path audited against §Bounds

⟨cmd⟩ `git rev-list --count 9d814f6c..HEAD` → **6**. Oldest → newest:

| # | sha | unit | `git show --stat` names | writable set | verdict |
|---|---|---|---|---|---|
| 1 | `242f3378` | `.a2` | `vitest.config.ts` (+17: one key, 16 lines of its rationale — ⟨cmd⟩ `grep -c 'inline: \["@mkbabb/glass-ui"\]'` → **1**) | the ADDENDUM's lifted key, `test.server.deps.inline` alone | **IN BOUNDS** |
| 2 | `6a960349` | `.a2` | `test/demo/app/dock-context-slot-resolution.test.ts` (+158, create) — **and nothing else** | `.a2` create row | **IN BOUNDS · lock (i) HELD** |
| 3 | `6ad8ea10` | `.e` | `demo/components/instrument/transport/TransportDock.vue` (+21/−4) | `.e`'s TD-37-only carve | **IN BOUNDS** |
| 4 | `600246c3` | `.a2` | `demo/app/App.vue` (13) · `demo/app/dock/ChromeDock.vue` (36) · `demo/app/dock/MbabbMenu.vue` (54) — **ONE sha** | `.a2`'s three modify rows | **IN BOUNDS · lock (ii) HELD** |
| 5 | `d4375768` | `.e` | `demo/styles/playback-idiom.css` (+74/−23) — **ONE sha for all six E-b1 halves** | `.e`'s E-b1 row | **IN BOUNDS** |
| 6 | `51f39a19` | `.e` | `test/demo/instrument/channel-options-render-edge.test.ts` (+8) | `.e`'s C-11 one-line row | **IN BOUNDS** |

**Zero out-of-bounds paths over the six shas** — ⟨cmd⟩ `git show --pretty=format: --name-only <sha>`
per commit, printed above; no `src/**`, no `node_modules/**`, no glass-ui byte, no
`demo/components/instrument/timeline/**`, no `demo/scenes/**`, no `dev.sh`, and no value.js path
in any of the six. Every sha carries the `Claude-Session:` trailer (⟨cmd⟩
`git log --format='%h %(trailers:key=Claude-Session,valueonly=true)'` → six non-empty values).
**LANDED-WRONG: EMPTY at the paths.**

### The declared families and locks, proven at the shas

| lock | where declared | measured at the bytes | verdict |
|---|---|---|---|
| **(i)** commit 1 = the mechanism proof, **NO product byte** | `.a2` locks, KF-W13 §Gates `:186` | `6a960349` names the created test ONLY; ⟨cmd⟩ `grep -rc 'useOptionalDockContext' demo \| grep -v ':0'` at that sha → `ChromeDock.vue:1` (the false comment, untouched) | **HELD** |
| **(ii)** M-4's deletion + the self-hold + the corrected `:109-113` prose + the KEPT binding = **ONE sha** | `.a2` locks; §Sequencing `:218` | `600246c3` carries all four in one commit: 7 → 0 round-trip lines, `useOptionalDockContext` now at `MbabbMenu.vue:3`, prose gone, `v-model:open="open"` still **1** | **HELD** |
| **L-1** no deletion before the proof | §Sequencing `:211` | `git log` order: `242f3378` → `6a960349` (proof) → `600246c3` (deletion) | **HELD** |
| **OP-8** no `ComponentExposed<>` / `Pick<>` | §0 OP-8, §Gates `:188` | ⟨cmd⟩ `git show 600246c3 \| grep -c 'ComponentExposed\|Pick<'` → **0** | **HELD** |
| **ARB-1** no `headerLeft` 'fill' arm | §Gates G-KFW13-2 | ⟨cmd⟩ `git diff 9d814f6c..HEAD -- demo/app \| grep -c "headerLeft"` → **0** · **0** | **HELD** |
| **TD-37 + TD-21's shared-Set rider, one family; `.stop` symmetry undisturbed** | `.e` locks | `6ad8ea10` carries both in one sha; ⟨cmd⟩ `grep -c '\.stop' TransportDock.vue` → **0**, `ChromeDock.vue` → **0** (symmetric, both passes) | **HELD** |
| **E-b1's six halves, ONE sha by subject** | `.e` brief | `d4375768`, one file, all six subjects named in its body | **HELD** |
| **(iii)** MM-1/MM-6's four-part cure = ONE sha | `.a2` locks | **no such sha exists** — the cure never landed | **NOT REACHED** (absence, not a split) |
| **no masking** — no `test.skip`/`it.skip`/`.only(`, no allowlist, no `node_modules` patch, no copied producer selector | Standing law | ⟨cmd⟩ `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` → **0**; KF13-E2 is a harness key, not a mock or a patch | **HELD** |

**No declared family was split.** The two that failed did so by **never being written**, which the
gate table records as RED rather than as a lock violation.

### What never landed — the absent work, by unit

**`KF.W13.a2`** (returned DEAD; four shas at the bytes): after `600246c3` the unit stops.
Unwritten: **MM-1/MM-6's four-part cure** (repair `:100` · dispose `setPPMode` with the KF-APP-17
sweep · the C-14 bucket split · MM-5's CheckboxItem), the **`kf-MbabbMenu.md:169` 27-row family**,
**MM-29's `:5-14` typography/brand arm**, **TD-36's `ChromeDock.vue:299`/`:302` pointer-events pair**,
the **kf-ChromeDock chrome roster** (M-5/C-6 … R3-8), the two `MbabbMenu.vue:248` TS2339 rows, and
the unit receipt. **`test/demo/app/mbabb-menu-self-hold.test.ts` exists in the keyframes.js worktree
UNCOMMITTED** (⟨cmd⟩ `git status --porcelain` → `?? test/demo/app/mbabb-menu-self-hold.test.ts`) and
**fails 3 of its 5 cases** at this seat's double-run — so G-KFW13-1's runtime clause is RED **and its
witness is not in the tree**. This is the L-18 (i) hazard reached from the other side: M-4's deletion
LANDED, its byte clauses are GREEN, the MUST-CARRY binding survived — and the runtime proof that the
menu still opens and holds the dock **is red and uncommitted**. The path is `.a2`'s, not `.f`'s: this
seat did not touch it, stage it, or cure it.

**`KF.W13.e`** (returned DEAD; two shas at the bytes): TD-37 and E-b1 and C-11 landed. Unwritten:
`css-code-editor-seam.test.ts`'s preset double gaining `setTargets` · `demo/env.d.ts`'s five-line
ambient monaco declaration · `CSSCodeEditor.vue`'s KF-CE-1/4 arm (b) · KF11-E2's three TS6133
deletions · KF11-E(f1)'s `spring-trace-truth.test.ts` (4b) re-bind · KF11-E3's three-file typed seam ·
KF11-E4's `EditorShell.vue:175` `:key` · E-c1's `parseAnimationCSS.ts` root token. **`useKeyframeOps.ts`
was NOT touched** — the ESCALATION clause that guards it never fired, because its root cure never ran.

**`KF.W13.f`**: this Close. No unit appended to `## Unit receipts`; it stays empty and says so.

### Residuals — stated positively, each with a named owner

| # | residual | owner |
|---|---|---|
| **R-1** | **G-KFW13-1's runtime clause is RED and its witness is uncommitted** — `mbabb-menu-self-hold.test.ts`, 3 failed / 2 passed (5), double-run, untracked in keyframes.js. M-4's deletion is in the tree without the runtime proof the spec's L-18 (i) names as the wave's likeliest failure. **The menu's opening is UNPROVEN at runtime, not disproven**: the four byte clauses are GREEN and OP-3's re-measurement at `600246c3` records that the producer HAS since shipped `default: void 0` on `open`/`defaultOpen`, which relaxes the rider's shape. | a re-dispatched `KF.W13.a2` (or its successor seat) — the owner rules whether the failing cases are the cure's defect or the witness's |
| **R-2** | `.a2`'s unwritten roster: MM-1/MM-6's four-part cure, the `:169` 27-row family, MM-29's `:5-14`, TD-36's pointer-events pair, the kf-ChromeDock chrome roster, the two `MbabbMenu.vue:248` TS2339 rows | `KF.W13.a2`'s successor |
| **R-3** | `.e`'s unwritten list: `setTargets` · `env.d.ts` · `CSSCodeEditor.vue` KF-CE-1/4 arm (b) · the three TS6133 (KF11-E2) · the (4b) re-bind (KF11-E(f1)) · KF11-E3 · KF11-E4 · E-c1 | `KF.W13.e`'s successor |
| **R-4** | **OP-0 is not zero**: `vue-tsc` **9** · **9**. Seven rows are `.e`'s uncured list, two are `.a2`'s `MbabbMenu.vue:248`. G-KFW13-7, G-KFW12-7 and G-KFW11-10 are RED on this limb alone. | R-2 ∧ R-3's owners |
| **R-5** | `npm run test:demo` **3 failed \| 56 passed (59)** — `mbabb-menu-self-hold.test.ts` (uncommitted, R-1), `css-code-editor-seam.test.ts` (G-KFW12-4, R-3), `spring-trace-truth.test.ts` (G-KFW11-4, R-3). `npm run check` **exit 2** (its typecheck limb is R-4). | R-1 ∧ R-3's owners |
| **R-6** | **The unit returns contradict the bytes**: the runner returned `{"KF.W13.a2":{"status":"DEAD","commits":[]},"KF.W13.e":{"status":"DEAD","commits":[]}}`, and six commits carrying those two unit ids are in `git log`. This close audits the bytes, not the return. Neither unit wrote a receipt, so no seat's own account of its work exists. | the orchestrator / the owner |
| **R-7** | **`§Unit receipts` is EMPTY** — the record's own append-only receipt obligation (`:115`) is unmet by both implementing units; this Close is the wave's only receipt. | as R-6 |
| **R-8** | **The LEDGER commit carries a sibling's stranded hunk** — `LEDGER.md` held an uncommitted **Track A · X-W6 CHECK 1** row rewrite ⊕ its event line, authored at `02:07:20` and stranded by a dead seat (mtime 15 h before this close). A pathspec commit of `LEDGER.md` takes WORKING-TREE content, so that hunk rides this wave's ledger commit. It is **carried verbatim, never altered, never reverted**, and named here and in the commit body. | Track A's X-W6 seat (the text is theirs) |
| **R-9** | **value.js is NOT pushed** — the wave's own `.f` rule (`:138`, d-R9): push value.js only when no sibling path is staged. ⟨cmd⟩ `git status --porcelain` shows `D  demo/shell/PaneSegmentedControl.vue` **staged** by a sibling track, plus nine unstaged sibling product paths. keyframes.js IS pushed (below). | the next value.js seat that finds a clean index |
| **R-10** | Two untracked value.js-authored coordination letters sit in keyframes.js (`2026-07-24` parser-totality, `2026-07-27` library-band) — predating this wave, outside every unit's writable set, left untouched for the fourth sitting running. | the X·KF mail owner |

### Escalations

**EMPTY.** No write landed outside any unit's §File Bounds writable set; no glass-ui or
`node_modules` byte; no masking fallback of any kind (no `try/catch` around a defect, no
`test.skip`/`it.skip`/`.only(`, no allowlist, no copied producer selector, no local patch). The one
`Do NOT touch` entry that was written — `vitest.config.ts` — is the ADDENDUM's own lifted key and
nothing else. The `useKeyframeOps.ts` escalation clause did not fire because `.e` never reached it.

### E13 — the close sweep, four paths, positional read

Re-swept at this seat's own clock, after the open sweep. (1) `docs/tranches/V/**` → the only items
newer than 2026-09-20 00:00 are **`ARCHITECTURE.md`** and **`reformation/CARRY-LEDGER.md`**, Track A's
committed canon, **not letters and addressed to no one**. (2) `../glass-ui/docs/tranches/` → newest
dir **`BK/`**; ⟨cmd⟩ `find BK/coordination -maxdepth 1 -name '*.md' -newermt "2026-09-19 12:00"` →
**empty**. (3) `../keyframes.js/docs/tranches/V/coordination/` → **empty** at the same predicate.
(4) `../sci-report/atlas/docs/tranches/P/coordination/` → **empty**. Census double-run: ⟨cmd⟩
`grep -c '^| I-\|^| O-' INBOX.md` → **90** · **90**; positional UNREAD read → **0** · **0**.
**ZERO unrowed letters addressed to value.js · ZERO new `I-n` minted · ZERO rows reading UNREAD.**
**SS-6 / BH relay**: no letter is minted here. The only producer row this wave touched —
`dropdown-menu`'s Boolean-cast defaults — was **re-measured CURED at the installed dist** by
`600246c3` (`open`/`defaultOpen` = `{ type: Boolean, default: void 0 }`), so the ask the spec
reserved for SS-6 has no live subject; an accretion entry is not written for a producer row the
producer has already shipped.

### Push

**keyframes.js: PUSHED.** ⟨cmd⟩ `git -C ../keyframes.js push origin HEAD` →
`9d814f6c..51f39a19  HEAD -> master`; verified after: ⟨cmd⟩ `git rev-parse --short HEAD` → `51f39a19`,
⟨cmd⟩ `git rev-parse --short origin/master` → `51f39a19`, ⟨cmd⟩
`git rev-list --left-right --count origin/master...HEAD` → **0	0**. No force, no pull, no merge commit;
the two untracked coordination letters and the untracked `mbabb-menu-self-hold.test.ts` were neither
staged nor pushed (R-1, R-10).
**value.js: NOT PUSHED** — R-9: a sibling track's staged deletion (`D  demo/shell/PaneSegmentedControl.vue`)
sits in the shared index, and this wave's own `.f` rule forbids the push while it does. The two value.js
commits of this close are on the local branch `tranche-u` and are named in the LEDGER row.

### The four-verb line — moved only as §State permits

| verb | state | basis |
|---|---|---|
| **AUDITED** | **YES** | this Close: six shas audited path-by-path against §Bounds at zero out of bounds; ten of the spec's own gate clauses plus four re-read gates re-run double at a seat that cured nothing |
| **SPECIFIED** | **YES** | `KF-W13.md` whole ⊕ the dated ADDENDUM `:299` ⊕ COHESION §0ai — unamended by this wave (E-3) |
| **IMPLEMENTED** | **NO — PARTIAL** | §State's own condition: *"stays NO until the gates green after the sequencing head lands."* Of the four gates of record: **G-KFW13-0 GREEN · G-KFW13-1 SPLIT (four byte clauses GREEN, the runtime clause RED) · G-KFW13-2 RED · G-KFW13-7 RED**; the four re-read gates (G-KFW12-4 · -7, G-KFW11-4 · -10) are **RED, unmoved**. Six commits of real, in-bounds, unsplit work landed and are pushed; the wave did not finish |
| **VERIFIED** | **NO** | unchanged — a successor close's act, and this seat is not designated to stamp it. **Nothing was argued green; no gate was re-based; no dated authority was amended** |

**Verdict: PARTIAL.** The honest reading is that KF.W13S **advanced** the supplement — the harness
root-cure (KF13-E2) that made every mounted-dock test possible, the executed mechanism proof
(G-KFW13-0, the wave's one clean GREEN), M-4's round-trip deleted in ONE sha with the MUST-CARRY rider
kept, TD-37's one face order, E-b1's six halves and C-11's seam — and **left both implementing units
unfinished**, with the one runtime clause that separates a cure from a shipped regression (R-1) RED
and its witness uncommitted.

### Push — the value.js half, measured beside (addendum to §Push, same seat, same clock)

The push was **attempted, not assumed**. ⟨cmd⟩ `git rev-list --left-right --count @{u}...HEAD` on
`tranche-u` → **1	79** (one behind `origin/tranche-u`, seventy-nine ahead). ⟨cmd⟩
`git push origin HEAD` →
```
 ! [rejected]          HEAD -> tranche-u (non-fast-forward)
```
Two independent walls, both named rather than climbed: the branch is **behind by one**, so only a
force or an integrating pull would land it — **no force is prescribed by this spec or by COHESION §0j**,
and the pull is the d-R9 hazard exactly, because the shared index holds a sibling track's **staged
deletion** (`D  demo/shell/PaneSegmentedControl.vue`) that a merge commit would carry. **Nothing was
stashed, reset, force-pushed or unstaged.** The two close commits — `af208bc8` (record ⊕ inherited
evidence) and `f44f09b1` (the LEDGER row) — are local on `tranche-u` and named in R-9's row, whose
owner is the next value.js seat that finds a clean index.

---

## Close — CHECK 1 (dated addendum beside, E-3; the predecessor Close is rewritten in no byte)

**Seat**: the re-dispatched `.f` CLOSE seat, CHECK 1, `claude-opus-5[1m]`, 2026-09-20, **VERIFY-ONLY**. This seat
authored **no byte** of the six shas, of `mbabb-menu-self-hold.test.ts`, of the evidence file, or of the
predecessor Close's text; it cured nothing in either repo. Every figure below is its own, double-run, from the
settled bytes. The unit returns handed to this seat are the same two the predecessor read:
`{"KF.W13.a2":{"status":"DEAD","commits":[]},"KF.W13.e":{"status":"DEAD","commits":[]}}`.

**Frontier, unmoved since the Close**: keyframes.js `HEAD` = **`51f39a19`** = `origin/master`
(⟨cmd⟩ `git rev-list --left-right --count origin/master...HEAD` → **0	0**); value.js `HEAD` = **`e675414e`**.
⟨cmd⟩ `git rev-list --count 9d814f6c..HEAD` → **6**, the same six shas.

### Gate re-reading — every clause re-run at this seat's own commands

| Gate | Clause | Close published | CHECK 1 reads | Verdict |
|---|---|---|---|---|
| **G-KFW13-0** | `npx vitest run --project demo test/demo/app/dock-context-slot-resolution.test.ts` | `Tests 3 passed (3)` | **`Test Files 1 passed (1)` · `Tests 3 passed (3)`** · re-run **`3 passed (3)`** | **GREEN — reproduces** |
| | `grep -rc 'useOptionalDockContext' demo \| grep -v ':0'` | `ChromeDock.vue:1` at `6a960349` | at HEAD: `MbabbMenu.vue:3` · `ChromeDock.vue:1` (the self-hold landed at `600246c3`, not in the proof's sha); ⟨cmd⟩ `git show --pretty=format: --name-only 6a960349` → the created test **alone** | **GREEN — lock (i) HELD** |
| **G-KFW13-1** | `grep -rn 'itemsPopupOpen\|items-popup-open\|mbabbPopupOpen' demo \| wc -l` | **0** | **0** · **0** | **GREEN** |
| | MUST-CARRY `grep -c 'v-model:open="open"' demo/app/dock/MbabbMenu.vue` | **1** | **1** · **1** | **GREEN** |
| | `sed -n '109,113p' demo/app/dock/ChromeDock.vue \| grep -c 'cannot hold the dock open'` | **0** | **0** · **0** | **GREEN** |
| | OP-8 `git show 600246c3 \| grep -c 'ComponentExposed\|Pick<'` | **0** | **0** | **GREEN** |
| | **runtime clause** `npx vitest run --project demo test/demo/app/mbabb-menu-self-hold.test.ts` | `3 failed \| 2 passed (5)` | **`Tests 3 failed \| 2 passed (5)`** · re-run **`3 failed \| 2 passed (5)`**; cases (2) hold-on-open, (3) hold-through-collapse, (4) unmount-leak; ⟨cmd⟩ `git status --porcelain` → `?? test/demo/app/mbabb-menu-self-hold.test.ts` — **still UNTRACKED** | **RED — reproduces** |
| **G-KFW13-1 overall** | byte ∧ runtime | SPLIT | **SPLIT, unmoved** | **RED** |
| **G-KFW13-2** | `git diff 9d814f6c..HEAD -- demo/app \| grep -c "headerLeft"` | **0** | **0** · **0** — the ARB-1 trap unsprung | **GREEN limb** |
| | the roster limb | RED (no roster sha) | **RED** — the six shas carry M-4 alone from P1; no MM-1/MM-6 sha, no `:169` family, no MM-29, no TD-36, no chrome roster, and `## Unit receipts` is still **empty** | **RED** |
| **G-KFW13-7** | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | **9** · **9** | **9** · **9** (the nine rows enumerated below) | **RED** |
| | `npm run check` (exit 0) | exit **2** | **exit 2** · **exit 2**, 9 `error TS` in both | **RED** |
| | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | **0** | **0** · **0** | **GREEN** |
| | `git grep -l 'btn-playback' HEAD -- demo \| wc -l` | **9** | **9** · **9** — beside RULINGS-4's **7** and the spec's **8**, **amending neither** (E-3) | **DRIFT, declared** |
| | bare `.focus-ring` class applications | **0** | **0** · **0** — beside RULINGS-4's **4** and the spec's **2**, amending neither | **DRIFT, declared** |
| | `npm run test:demo` | `3 failed \| 56 passed (59)` | **DOES NOT REPRODUCE — see CHECK 1's one correction** | **RED** |
| **G-KFW12-4** | `css-code-editor-seam.test.ts` | 1 failed | **`Tests 1 failed \| 3 passed (4)`** — `(2) KF-CE-1: expected 0 to be greater than or equal to 2`, unmoved | **RED** |
| **G-KFW12-7** | test:demo ∧ vue-tsc 0 | RED | **RED** | **RED** |
| **G-KFW11-4** | `spring-trace-truth.test.ts` | 1 failed | **`Tests 1 failed \| 11 passed (12)`** — `SpringHeatmap.vue no longer declares DAMPING_MIN`, unmoved | **RED** |
| **G-KFW11-10** | test:demo ∧ vue-tsc 0 | RED | **RED** | **RED** |

**CHECK 1 score: 1 GREEN · 1 SPLIT · 6 RED — identical to the Close.** Zero gates argued green, zero re-based,
zero dated authorities amended.

*(Inherited-partial note, appended by the RESUME SEAT 0 below, 2026-09-22: the CHECK 1 section above was found UNCOMMITTED in this record — a killed VERIFY-ONLY seat's partial. It is kept verbatim and committed beside, not rewritten (E-3). It ends at its score line; the "CHECK 1's one correction" it cites for the `test:demo` row was never written. This RESUME's baseline below re-measures that row: `3 failed | 56 passed (59)` — the Close's published figure DOES reproduce at 2026-09-22.)*

---

## RESUME — SEAT 0 (OPEN, RESUME MODE), 2026-09-22

**Seat**: SEAT 0, `claude-opus-5-5[1m]`, VERIFY-AND-BANK — zero keyframes.js bytes, zero glass-ui bytes, zero product bytes. **Sitting of record**: the owner's begin-word 2026-09-17 (COHESION §0j); the owner's 2026-09-22 relay orders every workflow re-deployed with no item deferred — so the Close's residuals R-1..R-5 (owned by "`.a2`'s / `.e`'s successor") are dispatched now, not carried.

**Why RESUME**: LEDGER `:55` status cell reads **PARTIAL 2026-09-20** (not CLOSED). The record exists. ⟨cmd⟩ `git -C keyframes.js log --oneline 9d814f6c..HEAD` → six shas under the unit ids `KF.W13.a2` (`242f3378` · `6a960349` · `600246c3`) and `KF.W13.e` (`6ad8ea10` · `d4375768` · `51f39a19`). Those two ids carry commits and are therefore **alreadyDone — never re-dispatched**; their unspent lists are minted as successor units **`KF.W13.a3`** (R-1 ∧ R-2) and **`KF.W13.e2`** (R-3), and the close as **`KF.W13.f2`**, exactly as the Close's residual table names their owners. No ruling after §0ai touches this wave (⟨cmd⟩ `grep -n 'W13S' COHESION.md` → hits at `:2314`-`:2365` only; §0aj/§0ak are Track C / Track A).

### CRASH-RECOVERY
- value.js, this seat's set: ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B/ docs/tranches/V/coordination/` → ` M execution/B/KF-W13S.md` — the CHECK 1 partial above (+42 lines), inherited, kept, committed with this RESUME.
- keyframes.js: ⟨cmd⟩ `git status --porcelain` → `?? test/demo/app/mbabb-menu-self-hold.test.ts` (**`.a3`'s inherited witness**, 3 failed / 2 passed of 5 — handed to `.a3` to judge hunk-by-hunk, not touched here) · two untracked 2026-07 value.js letters (R-10, outside every set, untouched). `origin/master...HEAD` → **0 0** at `51f39a19`.
- Sibling dirty paths in value.js (Track A/C product + `X-W5.md` + `CARRY-LEDGER.md` + the staged `D demo/shell/PaneSegmentedControl.vue` + `scripts/dev/dev.sh`) — NOT touched, NOT staged.

### E13 Step-0 (four paths, 2026-09-22)
⟨cmd⟩ `ls -dt glass-ui/docs/tranches/*/ | head -1` → `BK/` (still newest). ⟨cmd⟩ `find <path> -maxdepth 1 -name '*.md' -newermt "2026-09-20 00:00"` → `V/`: `ARCHITECTURE.md` (Track A canon, not a letter) · `V/coordination/`: `INBOX.md` (the ledger itself) · `BK/coordination`: **empty** · `keyframes.js/.../V/coordination`: **empty** · `atlas/.../P/coordination`: **empty**. Census ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **90**; positional UNREAD read (the Open's awk) → **0**. **0 unrowed · 0 new `I-n` · 0 UNREAD.** One sweep line appended at INBOX's end.

### Baseline — RESUME, read-only, at kf `51f39a19` / vjs `7509da22` (byte clauses double-run, quoted `·`)

| Gate / row | Command | Reads | Verdict |
|---|---|---|---|
| G-KFW13-0 | (banked GREEN at the Close, 3/3 twice; no byte moved since) | cited, not re-run | GREEN (banked) |
| G-KFW13-1 bytes | round-trip grep · MUST-CARRY · `:109-113` prose | **0·0** · **1·1** · **0·0** | GREEN |
| G-KFW13-1 runtime | `npm run test:demo` → `mbabb-menu-self-hold.test.ts` | cases (2) (3) (4) **FAIL**, file **untracked** | **RED** |
| G-KFW13-2 | `git diff 9d814f6c..HEAD -- demo/app \| grep -c headerLeft` | **0·0**; no roster sha | **RED** (roster) |
| G-KFW13-7 / OP-0 | `npx vue-tsc --noEmit -p tsconfig.json \| grep 'error TS'` | **9** — the Open's nine-row map, `MbabbMenu.vue` now `:248` ×2 | **RED** |
| G-KFW13-7 | `npm run test:demo` | **Test Files 3 failed \| 56 passed (59)** · **Tests 5 failed \| 489 passed (494)**, EXIT 1 | **RED** |
| G-KFW12-4 | `css-code-editor-seam.test.ts` (2) KF-CE-1 | FAIL; `grep -c setTargets` → **0·0**; `env.d.ts` `basic-languages` → **0·0** | **RED** |
| G-KFW11-4 | `spring-trace-truth.test.ts` (4b) | FAIL; `grep -c DAMPING_AXIS` → **0·0** | **RED** |
| KF11-E4 | `grep -n 'key=' EditorShell.vue` | `:176 :key="superKey"` | RED |
| E-c1 | `parseAnimationCSS.ts:9` | `timingFunction?: string;` | RED |
| skip/only | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | **0·0** | GREEN |
| drift | `git grep -l btn-playback HEAD -- demo \| wc -l` | **9·9** (beside 7/8, amending neither) | declared |
| `npm run check` | not re-run (its typecheck limb is the 9 above) — Close's **exit 2** cited | RED (banked) |

**GREEN-BEFORE-CURE: EMPTY.** Every owed row reads born-RED.

### RESUME unit plan

**alreadyDone** (commits exist — never re-dispatched): `KF.W13.a2` · `KF.W13.e`. **Owed**, serial, **1 concurrent** (this dispatch's cap; the sets are disjoint anyway): **[`KF.W13.a3`] → [`KF.W13.e2`] → [`KF.W13.f2`]**. All Opus (no Fable/adjudicator seat named by §0ai). Every unit appends its OWN receipt under `## Unit receipts` (R-7: the section is still empty) and banks evidence at `keyframes/evidence/W13S/**`.

**`KF.W13.a3`** — successor of `.a2`: R-1 ∧ R-2. Sections: KF-W13 §Agent Units `.a` `:152-156`, §B.2 `:91-94`/`:105-106`/`:116`, §B.3 LAW A (1)(4) `:118-120`, G-KFW13-1 `:188`, G-KFW13-2 `:190`, §Carry P1 `:136`, ADDENDUM `:299`; §0ai `:2320-2327`. Writable (kf): `demo/app/dock/ChromeDock.vue` · `demo/app/dock/MbabbMenu.vue` · `demo/app/dock/index.ts` (carve) · `demo/app/App.vue` (carve) · `test/demo/app/mbabb-menu-self-hold.test.ts` (inherited untracked) · `test/demo/app/dock-context-slot-resolution.test.ts`; vjs: this record (receipt) · `evidence/W13S/**`. Gates: G-KFW13-1 runtime → GREEN; G-KFW13-2 → GREEN; the two `MbabbMenu.vue:248` TS2339 → 0. Locks: MM-1/MM-6 four-part cure ONE sha under ARB-1; `headerLeft` in diff = 0; MUST-CARRY stays 1; OP-8 `ComponentExposed|Pick<` 0; no skip/mock-masking.

**`KF.W13.e2`** — successor of `.e`: R-3. Sections: ADDENDUM `:299` `.e` clause; §0ai `:2336-2358`; G-KFW12-4, G-KFW11-4/-10. Writable (kf): `test/demo/instrument/css-code-editor-seam.test.ts` · `demo/env.d.ts` · `demo/components/instrument/keyframes/CSSCodeEditor.vue` · `src/animation/group/composite/compositor.ts` · `src/animation/group/waapi.ts` · `src/animation/physics/smooth.ts` (three declarations only) · `test/demo/scenes/spring-trace-truth.test.ts` · `demo/scenes/easing/{useEasingDemo.ts,EasingSidebar.vue,EasingTarget.vue}` · `demo/components/instrument/shell/EditorShell.vue` (`:175-176` key only) · `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts`; vjs: record (receipt) · `evidence/W13S/**`. Gates: G-KFW12-4 · G-KFW11-4 green; seven OP-0 rows → 0 (`useKeyframeOps.ts:91` BY ROOT — that file NOT writable). Locks: KF-CE-1/4 arm byte-exact from `evidence/W12/KF-W12-d-born-red.md` with `env.d.ts` in the same motion; no cast/shim/narrowing guard.

**`KF.W13.f2`** — successor close (the `.f` clause, `:170-174`, G-KFW13-7 `:200`, §0ai `:2359-2362`). Writable (vjs): this record · LEDGER (this row's cells + appended lines) · INBOX (append) · `evidence/W13S/**`. Gates: all eight re-run double; `vue-tsc` 0; `test:demo` all green; `npm run check` exit 0; skip/only 0; kf pushed; vjs pushed only with no sibling path staged (R-9).

---

## Unit receipt — KF.W13.a3

### KF.W13.a3

SERVED MODEL: claude-opus-5-5[1m]

**Seat**: successor of `.a2` (R-1 ∧ R-2), 2026-09-22. kf `51f39a19` → `220bd93a` (10 shas, all pathspec). Spec read whole once (KF-W13.md, 299 L); record read header → Unit plan, Close §What never landed/§Residuals/§Escalations, RESUME; COHESION §0ai `:2314-2335` (no later ruling touches W13S — §0aj/§0ak are Track C/A).

**CRASH-RECOVERY.** ⟨cmd⟩ `git -C keyframes.js status --porcelain` → `?? test/demo/app/mbabb-menu-self-hold.test.ts` (inherited, mine) + the two 2026-07 letters (R-10, untouched). value.js set: record + `evidence/W13S/` clean. Inherited witness judged case-by-case (below) and committed green.

**Act 1 — G-KFW13-1 runtime clause (R-1).** ⟨cmd⟩ `npx vitest run --project demo test/demo/app/mbabb-menu-self-hold.test.ts` → BEFORE **3 failed | 2 passed (5)** (cases 2 `:148`, 3 `:160`, 4 `:195`). Verdict: **all three are the WITNESS's defects; the cure at `600246c3` is correct** — no product byte moved to turn it:
- (3) `vi.useFakeTimers()` faked `Date`; runtime-dom's invoker drops an event whose `_vts` ≤ its listener's attach time (both `Date.now()`), so the trigger's capture `pointerdown` was ignored — traced: `mm.open` stayed `false` after pointerdown under fake timers, `true` under real. Cure: `toFake: ["setTimeout","clearTimeout"]`.
- (4) `findComponent(MbabbMenu).unmount()` throws in VTU (root-only). Cure: the Host's own `menuMounted` v-if (the product's unmount shape).
- (2) reka settles an Escape close a macrotask later (measured: `data-state="open"` two ticks after keydown, gone ≤16 ms) — flaky both ways. Cure: `await vi.waitFor(...)`, assertion unchanged. The synthetic click carries `detail: 1` (a pointer click's count).
AFTER ⟨cmd⟩ same → **5 passed (5)** ×3 runs; `dock-context-slot-resolution` stays **3/3**. Sha **`4bd1f8d5`**.

**Act 2 — the chrome roster, one sha per family (all `demo/app/**`).**

| sha | family | rows |
|---|---|---|
| `a759f65f` | hold/hover batch | M-5/C-6 (prose → the touch-gate truth, watchdog KEPT) · RR-2 MISSED #1 (the demoting `expand()` deleted) · R3-2 (mirror HOVER = expanded ∧ ¬pinned) · C-14 (one watcher) |
| `16dc1e33` | control zone DECIDED | M-2/C-4 (inline arm DELETED — unreachable: facets union onto the triad ⇒ tabs ≥2 or 0) · M-3 (`currentLabel` prop + App binding + orphan computed) · D-8 (dies with branch) · D-10's rider (dead CSS/rationale) |
| `fe598702` | BLOCKER | D-18/C-1 (focusable glass `Button` in `#collapsed`; keyboard focus hands off to the expanded Scene trigger) + TD-39's rider (one stable name "Scene", no split) |
| `22d71bd3` | panel toggle | D-20 (`:active` → aria-pressed/data-active/seat; stable name "Controls panel") · D-21 (one action grammar; mobile chevron down-when-open) |
| `40ca9d5e` | ink + prose | D-3 (asset truth measured: 3 raster, 1 hsl, 2 tokens) · D-2-RESCOPED + RR-1 MISSED #2 (no glyph declares ink) · RR-1 MISSED #3 (aria-hidden, 13 glyph sites) · D-12 (`flex-shrink:0` in `.dock-glyph`) · m-1/C-7+m-9 (guarded icon computed) · D-16/L-i-1 (this file's stale prose) |
| `74c6becc` | the two Selects | D-25 (sr-only `SelectLabel` ×2) · D-26 + D-28's px-3 · RR-2 MISSED #2 (`v-model:open`) · D-6 (no-op clamp) · D-11 (nav separator gated) · m-12 · m-8 · C-8 emit half (`ControlSurface`) · m-3/R3-6 (`./select`) · R3-4 (`homeScene {id,label}`, App end) |
| `89bf55b2` | App comment | R3-8 |
| `55ebe2ea` | MbabbMenu family | MM-7 · MM-10 · MM-11 · MM-13+MM-20+MM-42 (DS Dialog) · MM-16 · MM-17 · MM-18 · MM-21 · MM-22 · MM-24 · MM-26 (+MM-2 row 5) · MM-32 · MM-39 · MM-40 |
| `220bd93a` | fix-forward | MM-31 held under MM-26's label (probe measured 600 → 400) |

**Probe (§5.2, one dev-server session, 7 Playwright calls).** Home: after 3.5 s idle the summary layer holds a `<button data-slot="button" … data-size="sm">`; one `Tab` → activeElement = `BUTTON aria-label="Scene"` inside `.dock-layer--full.is-active` (D-18 GREEN at runtime). Menu screenshot: 28px glyph column aligned, Dark-mode subtitle, ppmycota URL on its own line, GitHub spelling. "Clear all & reload" → `role=dialog` open, focus inside (Cancel); Enter → dialog gone, `body.style.pointerEvents` = "" (no leaked lock). `#/cube`: toggle renders `aria-pressed="true" data-active aria-label="Controls panel"`; zero console errors/warnings (the one 404 is the pre-existing favicon).

**Roster ledger — `kf-MbabbMenu.md:169` (27 ids + the MM-1/MM-6 cure law).** SELF-COUNT: 27 ids below.
- **LANDED here (`55ebe2ea`/`220bd93a`)** — 16: MM-7 · MM-10 · MM-11 · MM-13 · MM-16 · MM-17 · MM-18 · MM-20 · MM-21 · MM-22 · MM-24 (Avatar's `./avatar` gap → BH relay) · MM-26 · MM-32 · MM-39 · MM-40 · MM-42 (caveat comment).
- **LANDED-BY earlier shas (GREEN-BEFORE-CURE, never claimed)** — 6: MM-8 · MM-9 · MM-29 (`:5-14` site 1 + site 2) · MM-30 · MM-31 — `3cc7e126` (KF.W6.d); MM-19 — `998124e1` (EH-4: the `title` dropped).
- **ESCALATED (ESC-a3-1)** — 1: MM-5 (bound into the four-part edit).
- **CARRIED, named owner** — 4: MM-2 rows 1/2 + MM-3 (hoisting actuation to the item needs an open seam on `SharePopover.vue` [demo/components/instrument/shell, outside the set] and a headless toggle on glass `DarkModeToggle` [producer — BH relay]; row 5's arm LANDED as MM-26) · MM-12 (`.dark` `--filter-brand-color` arm or mask mark lives in `style.css`/`brand.css`) · MM-25 (one callback/emit contract across SharePopover's three consumers — EditorHeader/EditorShell outside the set; a unilateral MbabbMenu half would pre-empt the decision).
Count: 16 + 6 + 1 + 4 = 27.

**Roster ledger — kf-ChromeDock (every row of the record, `:35-100`).**
- LANDED here: D-18/C-1 · M-5/C-6 · RR-2 M#1 · R3-2 · M-2/C-4 · M-3 · D-3 · C-8 (emit half) · D-20 · D-2-RESCOPED · RR-1 M#2 · RR-1 M#3 · RR-2 M#2 · D-6 (no-op half) · D-7/C-15 (see KILLED) · D-8 (died with branch) · D-11 · D-12 · D-25 · D-26 · m-12 · m-3/R3-6 · R3-4 · D-21 · m-1/C-7+m-9 · m-8 · D-16+L/i-1 (file half) · C-14 · R3-8 · D-28 (px-3 half).
- LANDED-BY: M-4 + i-2 — `600246c3`; D-22 — `412b8324`; D-5 + D-10 (KF-APP-26) — `4cf174eb`; D-23/C-5 — `e64103be`; D-24 — `7b721d10`; C-2/B-2 (KF-APP-4 gate + the :128 TS2322) — `5388907b`.
- KILLED-with-rationale: D-7/C-15 — the glyph/marker inversion died with StatusDot (`7b721d10`); the "missing `<Home v-else>`" half is refused: menu rows iterate non-home descriptors that MUST define `icon` (scenes.ts `:86-87`), so a Home fallback there would mislabel a scene as Home.
- CARRIED (fold / outside file / measurement-owned): D-1 (≡KF-APP-6), L/B-1 (frontier-cured), M-1/C-3/D-14+R3-7 + m-2/C-13 + D-15 (≡KF-APP-13 registry cure — `surfaceTabs.ts`/`controlSurfaces.ts`), D-17 (≡KF-APP-24), D-27 (≡ACG D-3), D-9 (≡KF-APP-33), C-12 (≡KF-APP-42), C-8 prop half (needs `demo/state` store typing), D-4 (raster asset format — `assets/icons`), D-6 truncation contract + C-10 (live-overflow / computed-style witnesses the rows route to KF.W9), D-13 + RR-1 M#4 (shared collapse clock / boot posture needs `TransportDock.vue`; drift ledger → BH relay), D-16's `--z-dock` prose (`style.css`), D-28 glyph-direction note (a11y spec input).

**Producer asks recorded for `.f2` (SS-6 / BH relay)**: touch gate must consult the hold counter + portal stamp (M-5); a focusable-by-construction summary layer / keyboard `onClickCollapsed` (D-18); `./avatar` subpath (MM-24); a headless `DarkModeToggle` toggle/v-model (MM-2 row 2); useDockShellProps doc drift (D-13); `dropdown-menu` Boolean defaults — measured SHIPPED at 7.0.0 (`open`/`defaultOpen` `default: void 0`), so the MUST-CARRY rider's shape is relaxed and its obligation holds (`v-model:open="open"` still 1).

**Escalations.**
- **ESC-a3-1 — MM-1/MM-6 four-part cure (ONE sha under ARB-1) + the two `MbabbMenu.vue:328` (was `:248`) TS2339 rows — NOT LANDED, no substitute.** The cure law (kf-App KF-APP-1/-17; kf-CubeScene C-1/C-14 + ARB-1) binds four parts into one edit: repair `stored.value.ppMode` (the TS2339 pair IS this line), dispose `setPPMode` WITH the KF-APP-17 `headerLeft` delete arm, resolve the C-14 bucket split, land MM-5's CheckboxItem. Measured at the bytes: ⟨cmd⟩ `grep -rn 'setPPMode\|headerLeft' demo/scenes` → `CubeScene.vue:96-97` (`setPPMode`), `:129-134` (`headerLeft` render fn), `:267` (its export) — **`demo/scenes/cube/CubeScene.vue` is KF.W11's file and outside `.a3`'s writable set.** Repairing `:328` alone lands TWO writers for one persisted flag — the exact act the law forbids — so the TS2339 rows are not typed away. Needed: `CubeScene.vue` (delete arm: `:96-97`, `:129-135`, `:267` + its dead imports) added to this unit's set for ONE joint sha with `MbabbMenu.vue`, or a joint commit with a KF.W11 seat. NB the G-KFW13-2 lock counts deletion lines too: `sceneExposedApi.ts:43`'s `headerLeft?` member must NOT be deleted in this wave's `demo/app` diff.
- **ESC-a3-2 — TD-36.** The spec homes TD-36's bytes at `ChromeDock.vue:299/:302` (today `:309/:312`); at the true bytes that pair is the PRECEDENT guard (`pointer-events-none` host + `pointer-events-auto` child), already correct. The defect is the transport host, `TransportDock.vue:2-8` (`fixed left-0 right-0 z-dock`, no pointer-events term) — outside `.a3`'s set. Needed: that two-class carve granted to a transport seat (`.e2`/`.b`-class).

**Gates (double-run, kf `220bd93a`).**
| gate | BEFORE (RESUME baseline) | AFTER |
|---|---|---|
| G-KFW13-1 runtime — `mbabb-menu-self-hold.test.ts` | 3 fail / 5, untracked | **5/5 ×2, committed `4bd1f8d5`** GREEN |
| G-KFW13-1 bytes — round-trip · MUST-CARRY · `:109-113` prose | 0 · 1 · 0 | **0·0 · 1·1 · 0·0** GREEN |
| OP-8 — `git log -p 9d814f6c..HEAD -- demo/app test/demo/app \| grep -c 'ComponentExposed\|Pick<'` | 0 | **0·0** |
| G-KFW13-2 — `git diff 9d814f6c..HEAD -- demo/app \| grep -c headerLeft` | 0 | **0·0**; roster spent except ESC-a3-1 → **RED on the MM-1/MM-6 sha alone** |
| OP-0 `MbabbMenu` TS2339 ×2 | 2 | **2** RED (ESC-a3-1) · `vue-tsc` total **9·9** (the other 7 are `.e2`'s) |
| skip/only — `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | 0 | **0·0** |
| `npm run test:demo` | 3 failed files \| 5 failed tests (494) | **2 failed \| 57 passed (59) · 2 failed \| 492 passed (494)** ×2 — both `.e2`'s (G-KFW12-4 `css-code-editor-seam` (2), G-KFW11-4 `spring-trace-truth` (4b)) |

Inherited path named: `test/demo/app/mbabb-menu-self-hold.test.ts`. No glass-ui/node_modules/src byte; no `vitest.config.ts` byte; `dev.sh` untouched; kf not pushed (`.f2`'s act).

---

## Close — `KF.W13.f2` (RESUME sitting 2026-09-22; dated addendum beside, E-3 — no prior section rewritten)

**Seat**: `.f2` close, `claude-opus-5-5[1m]`, **VERIFY-ONLY** — cured nothing; **0** keyframes.js bytes, **0** glass-ui bytes, **0** product bytes. Sitting of record 2026-09-17 (COHESION §0j). **Crash-recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → the two untracked 2026-07 value.js letters only (R-10, outside every set, untouched); value.js paths in this seat's set (`execution/B/`, `keyframes/evidence/W13S/`, `V/coordination/`, LEDGER) → **clean**; sibling dirty rows (Track A/C product, `X-W5.md`, `CARRY-LEDGER.md`, staged `D demo/shell/PaneSegmentedControl.vue`, `dev.sh`) NOT touched, NOT staged.

**Dispatch actually run this sitting**: the runner returned **one** unit, `KF.W13.a3` (`ESCALATED`). **`KF.W13.e2` was not dispatched** — ⟨cmd⟩ `git -C keyframes.js log --oneline 51f39a19..HEAD` → **10** shas, every one under the `KF.W13.a3` id; no `.e2` receipt exists in this record. Its rows (G-KFW12-4 · G-KFW11-4 · seven OP-0 rows) therefore stand exactly as the RESUME baseline read them.

### Gate table — BEFORE (RESUME baseline, kf `51f39a19`) → AFTER (kf `220bd93a`), each double-run at this seat

| Gate | Command (from kf root) | BEFORE | AFTER (run 1 · run 2) | Verdict |
|---|---|---|---|---|
| G-KFW13-0 runtime | `npx vitest run --project demo test/demo/app/dock-context-slot-resolution.test.ts` (in the 7-file batch below) | banked GREEN 3/3 | pass · pass | **GREEN** |
| G-KFW13-0 byte | `grep -rc useOptionalDockContext demo \| grep -v :0` | `ChromeDock.vue:1` + `MbabbMenu` (a2 cure) | `MbabbMenu.vue:3` · `ChromeDock.vue:1` (both runs) | post-cure state (M-4 spent at `600246c3`) |
| G-KFW13-1 runtime | `… test/demo/app/mbabb-menu-self-hold.test.ts` | 3 FAIL / 2 pass, untracked | 5/5 · 5/5, tracked at `4bd1f8d5` | **GREEN** |
| G-KFW13-1 bytes | round-trip `grep -rn 'itemsPopupOpen\|items-popup-open\|mbabbPopupOpen' demo \| wc -l` · MUST-CARRY `grep -c 'v-model:open="open"' MbabbMenu.vue` · `sed -n 109,113p ChromeDock.vue \| grep -c 'cannot hold the dock open'` | 0·0 · 1·1 · 0·0 | **0·0 · 1·1 · 0·0** | **GREEN** |
| G-KFW13-1 OP-8 | `git show <sha> \| grep -c 'ComponentExposed\|Pick<'` over all 10 `.a3` shas | — | **0** ×10 · **0** ×10 | **GREEN** |
| G-KFW13-2 `headerLeft` | `git diff 9d814f6c..HEAD -- demo/app \| grep -c headerLeft` | 0·0 | **0·0** | clause GREEN |
| G-KFW13-2 roster | the receipt's ledger (MbabbMenu 27 = 16 here + 6 earlier + 1 escalated + 4 carried; kf-ChromeDock roster accounted) | no roster sha | spent except **MM-1/MM-6's four-part ONE-sha cure** (ESC-a3-1) | **RED** (lawfully escalated) |
| G-KFW13-2 witnesses | `cube-scene.test.ts` (in batch) | green | pass · pass | GREEN |
| G-KFW13-3 | `transport-keyboard-propagation.test.ts` (batch) · bytes `.stop` TD/CD · `registerShortcut("Space"` | banked GREEN | pass · pass · **0 · 0 · 1** both runs | GREEN (unmoved) |
| G-KFW13-4 | `transport-play-actuation` + `transport-icon-spin` (batch) · `instanceof HTMLElement` · `blur\|orphan\|stale` | banked GREEN | pass · pass · **0 · 8** both runs | GREEN (unmoved) |
| G-KFW13-5 | `playback-ribbon-contract.test.ts` (batch) · `aria-label`/`valueCommit`/`:step`/`gatedSliderDown` | banked GREEN | pass · pass · **2 · 3 · 2 · 0** both runs | GREEN (unmoved) |
| G-KFW13-6 | `grep -c 'box-shadow: var(--focus-ring-shadow)' playback-idiom.css` · `sed -n 106,116p design-idioms.css \| grep -c outline` | banked GREEN (Repair 1) | **0 · 1** both runs | GREEN (unmoved) |
| 7-file batch | the six W13 witnesses + `cube-scene.test.ts` | — | **7 files / 59 tests passed** · **7 / 59** | GREEN |
| G-KFW13-7 OP-0 | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | 9·9 | **9 · 9** — `MbabbMenu.vue(333,12)`+`(333,36)` TS2339 (ESC-a3-1) + the seven `.e2` rows (`useKeyframeOps.ts:91` · `EditorShell.vue:175` · `useEasingDemo.ts:294`/`:310` · `compositor.ts:79` · `waapi.ts:9` · `smooth.ts:194`) | **RED** |
| G-KFW13-7 test:demo | `npm run test:demo 2>&1 \| tail` | 3 failed files \| 5 failed (494) | **2 failed \| 57 passed (59) · Tests 2 failed \| 492 passed (494)**, EXIT 1 — both runs; the two are `spring-trace-truth (4b)` (G-KFW11-4) and `css-code-editor-seam (2)` KF-CE-1 (G-KFW12-4) — `.e2`'s | **RED** |
| G-KFW13-7 skip/only | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | 0·0 | **0·0** | GREEN |
| G-KFW13-7 sweeps | `git grep -l btn-playback HEAD -- demo \| wc -l` · bare `focus-ring` `class=` census | 9 · — | **9 · 0** both runs — beside RULINGS-4's **7** and **4** and the spec's **8** and **2**, amending none (E-3) | declared |

**Net movement this sitting**: G-KFW13-1 RED → **GREEN**; `test:demo` 5 failed → **2** failed; vue-tsc 9 → **9** (unmoved — the two `MbabbMenu` rows are escalated, the seven are `.e2`'s undispatched rows). GREEN-BEFORE-CURE: none claimed.

### Commit roster — ten kf shas over `51f39a19..220bd93a` + one vjs receipt sha, every path audited against §B.2

⟨cmd⟩ `git -C keyframes.js show --stat <sha>` per sha:

| sha | unit | paths | in `.a3`'s set? |
|---|---|---|---|
| `4bd1f8d5` | `.a3` | `test/demo/app/mbabb-menu-self-hold.test.ts` (inherited) | yes |
| `a759f65f` | `.a3` | `demo/app/dock/ChromeDock.vue` | yes |
| `16dc1e33` | `.a3` | `ChromeDock.vue` · `demo/app/App.vue` (−2: `:current-label` binding + `currentLabel` computed) | ChromeDock yes · App.vue **see LW-1** |
| `fe598702` | `.a3` | `ChromeDock.vue` | yes |
| `22d71bd3` | `.a3` | `ChromeDock.vue` | yes |
| `40ca9d5e` | `.a3` | `ChromeDock.vue` | yes |
| `74c6becc` | `.a3` | `ChromeDock.vue` · `App.vue` (`:home-scene-id` → `:home-scene` + the `homeScene` import) | ChromeDock yes · App.vue **see LW-1** |
| `89bf55b2` | `.a3` | `App.vue` (the R3-8 comment over `dockHoveredRef`) | **see LW-1** |
| `55ebe2ea` | `.a3` | `demo/app/dock/MbabbMenu.vue` | yes |
| `220bd93a` | `.a3` | `MbabbMenu.vue` | yes |
| vjs `f4242a66` | `.a3` | this record (receipt) · `keyframes/evidence/W13S/KF-W13-a3-gates.md` | yes |

No glass-ui, `node_modules`, `src/**`, `demo/scenes/**`, `vitest.config.ts` or `dev.sh` byte in any sha.

**Landed-wrong (recorded, never fixed here)**:
- **LW-1 (MINOR, self-disclosed by the receipt)** — §B.2 carves `demo/app/App.vue` to *"`:29` · `:37` · `:369` · `:372` — M-4's App sites; the KF-APP-1 motion's `:100`-class repair as consumed, delete arm only"*, and §B.2's Do-NOT-touch list names *"`App.vue` beyond M-4's sites and the consumed motion"*. `16dc1e33`, `74c6becc` and `89bf55b2` write App.vue at the ChromeDock **consumer ends** of M-3 (`currentLabel`), R3-4 (`homeScene`) and R3-8 (a comment) — none is an M-4 site or the KF-APP-1 motion. The edits are behaviour-coherent (the prop contracts they follow were changed in the same sha, so the family did not split) and vue-tsc shows no App.vue row, but they sit outside the literal carve. Owner: the Check seat adjudicates whether the carve's "consumed motion" covers a prop's other end; no revert is owed by this seat.
- No other landed-wrong finding.

### Residuals — each with a named owner

| id | residual | owner |
|---|---|---|
| R-f2-1 | **ESC-a3-1** — MM-1/MM-6's four-part ONE-sha cure (`stored.value.ppMode` TS2339 ×2 at `MbabbMenu.vue:333`; `setPPMode` disposal + the KF-APP-17 `headerLeft` delete arm at `demo/scenes/cube/CubeScene.vue` `:96-97`/`:129-135`/`:267`; C-14 bucket; MM-5's CheckboxItem) — its delete arm is KF.W11's file | the orchestrator: grant `CubeScene.vue`'s delete-arm lines to an `.a4` seat, or a joint commit with a KF.W11 seat (ARB-1) |
| R-f2-2 | **ESC-a3-2** — TD-36's true bytes are `TransportDock.vue:2-8` (the host's missing pointer-events term), not `ChromeDock.vue:309/:312` | a transport seat granted the two-class carve on `TransportDock.vue` |
| R-f2-3 | **`KF.W13.e2` never dispatched** — G-KFW12-4 (`css-code-editor-seam (2)` KF-CE-1), G-KFW11-4 (`spring-trace-truth (4b)`), and the seven OP-0 rows (`useKeyframeOps.ts:91` by root · `EditorShell.vue:175` · `useEasingDemo.ts:294`/`:310` · `compositor.ts:79` · `waapi.ts:9` · `smooth.ts:194`), KF11-E4, E-c1 | `KF.W13.e2` (the RESUME plan's writable set, unchanged) — to be dispatched, not carried |
| R-f2-4 | MbabbMenu family carries: MM-2 rows 1/2 + MM-3 (SharePopover/DarkModeToggle seams), MM-12 (`style.css`/`brand.css`), MM-25 (SharePopover three-consumer contract) | the seams' owning waves as the `.a3` receipt names them |
| R-f2-5 | Producer asks (touch gate consults the hold counter + portal stamp; focusable collapsed summary; `./avatar` subpath; headless DarkModeToggle; `useDockShellProps` doc drift) — recorded, **not yet relayed** to BK | the BH/BK relay seat (O-n letter); none cured demo-side |
| R-f2-6 | value.js push — see §Push | the orchestrator (R-9: a sibling path is staged in the shared index) |
| R-f2-7 | `npm run check` not re-run at this seat — its typecheck limb is the vue-tsc **9** above, so it cannot exit 0 | follows R-f2-1 ∧ R-f2-3 |

### Escalations

- **ESC-a3-1** and **ESC-a3-2** stand exactly as the `.a3` receipt states them (R-f2-1, R-f2-2). This seat re-read the premise of each: ⟨cmd⟩ `grep -c 'error TS' ` over vue-tsc → the two `MbabbMenu.vue(333,…)` TS2339 rows are present (both runs), and `headerLeft` in `9d814f6c..HEAD -- demo/app` reads **0** — so the cure has lawfully NOT been substituted by a MbabbMenu-only repair (two writers for one persisted flag).
- **ESC-f2-1 (new)** — `KF.W13.e2` was planned by the RESUME and was not dispatched in this run; the wave cannot close while R-f2-3's rows stand born-RED with no cure attempted. Dispatch `.e2` (its writable set is disjoint from `.a3`'s and from the ESC-a3-1 grant).

### E13 — the close sweep, four paths (2026-09-22, this seat's clock)

⟨cmd⟩ `ls -dt glass-ui/docs/tranches/*/ | head -1` → `BK/`. ⟨cmd⟩ `find <path> -maxdepth 1 -name '*.md' -newermt "2026-09-22 00:00"` → `value.js/docs/tranches/V`: **empty** · `V/coordination`: `INBOX.md` (the ledger itself) · `glass-ui/…/BK/coordination`: **`glass-outbound-2026-09-22-consumers-10.0.0.md`** — addressed *"To: slides (the feedback-coder deck) and atlas"* (the 10.0.0 cut of `ColorResolver`/`defaultBlobColorResolver`/`ringsAt`), **not addressed to value.js**, so no `I-n` is minted; noted in the sweep line · `keyframes.js/…/V/coordination`: **empty** · `atlas/…/P/coordination`: **empty**. Census ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **90 · 90**; positional UNREAD awk → **0 · 0**. **No UNREAD mail in scope.** One sweep line appended at INBOX's end.

### Push

- **keyframes.js PUSHED**: ⟨cmd⟩ `git push origin HEAD` → `51f39a19..220bd93a  HEAD -> master`; after `git fetch`, `git rev-list --left-right --count origin/master...HEAD` → **0 0**. All ten `.a3` shas published; no force.
- **value.js**: see the addendum line below (measured after this record's commit).

### The four-verb line — moved only as §State permits

KF.W13S is **not IMPLEMENTED**: G-KFW13-2 (roster, ESC-a3-1) and G-KFW13-7 (vue-tsc **9**, `test:demo` **2** failed) read RED at the bytes, and `.e2` was never dispatched. The line stays **PARTIAL** — the LEDGER row reads `PARTIAL 2026-09-22 — what remains: ESC-a3-1 (MM-1/MM-6 ONE-sha cure, CubeScene.vue grant) · ESC-a3-2 (TD-36 on TransportDock.vue) · .e2 (G-KFW12-4 · G-KFW11-4 · seven OP-0 rows)`. VERIFIED is not this seat's to stamp.

- **value.js push (measured after `49b550d6` + LEDGER `a1db8d49`)**: ⟨cmd⟩ `git push origin HEAD` → **rejected, non-fast-forward** (`origin/tranche-u...HEAD` → **1 · 104**; the remote carries `6fc1212e`). Not forced; not pulled — the shared index holds a sibling track's staged `D demo/shell/PaneSegmentedControl.vue`, and `git merge` aborts on a non-clean index (R-9). **ESC-PUSH stands** → R-f2-6, owner: the orchestrator (integrate `6fc1212e` once the sibling stage clears).

---

## Check 1 — fresh adversarial L-20 pass 1 of the `.f2` close (2026-09-22; dated addendum beside, E-3)

**Seat**: independent check, `claude-opus-5-5[1m]`, VERIFY-ONLY. I wrote no byte of this wave's cures: **0** keyframes.js bytes, **0** glass-ui bytes, **0** product bytes. **Crash-recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → only the two untracked 2026-07 value.js letters (R-10, untouched). value.js paths in my set (this record, LEDGER) → clean. Sibling dirty rows NOT touched, NOT staged. **Frontier**: kf `220bd93a` (`origin/master...HEAD` → **0 0**) · vjs `e53c7ef9`.

### Verdict: **NOT-CONFORMANT**

Every GREEN the close claims reproduces at the bytes. But two gates of record are still RED, and the spec gives neither of them relief. G-KFW13-7 is RED because `.e2` was never dispatched: the addendum `:299` gives its whole cure list to this wave's `.e` line, and §0ai's Close requires `vue-tsc` **0** as a literal. G-KFW13-2 is RED because the MM-1/MM-6 ONE-sha cure is unspent (ESC-a3-1). No later wave takes either one over, neither is producer-owned, and the spec does not name either as honest-RED. The addendum's "all four honest-REDs" describes the KF.W13 gates this supplement was **minted to cure**, not ones it may close on. The close's own four-verb line reads PARTIAL, and this check agrees. The LEDGER status cell is left unchanged.

### Axis (1) and (9): the close's GREENs and figures, re-run by this seat (all double-run, `·` separated)

| Gate | ⟨cmd⟩ (kf root) | Record | This seat | Reproduces |
|---|---|---|---|---|
| 7-file W13 witness batch (G-KFW13-0/-1/-3/-4/-5 runtime + `cube-scene`) | `npx vitest run --project demo <the 6 W13 files> <cube-scene.test.ts>` | 7/59 · 7/59 | **7 passed (7), 59 passed (59)** · **same** | YES |
| G-KFW13-1 bytes | round-trip `wc -l` · MUST-CARRY · `:109-113` prose | 0·0 · 1·1 · 0·0 | **0·0 · 1·1 · 0·0** | YES |
| G-KFW13-1 OP-8 | `git show <sha> \| grep -c 'ComponentExposed\|Pick<'` over all 16 shas `9d814f6c..HEAD` | 0 ×10 | **0 ×16** | YES |
| G-KFW13-2 `headerLeft` | `git diff 9d814f6c..HEAD -- demo/app \| grep -c headerLeft` | 0·0 | **0·0** | YES |
| G-KFW13-3 bytes | `.stop` TD · CD | 0·0 | **0 0 · 0 0** | YES |
| G-KFW13-4 bytes | `instanceof HTMLElement` · `blur\|orphan\|stale` | 0 · 8 | **0 8 · 0 8** | YES |
| G-KFW13-5 bytes | `aria-label`/`valueCommit`/`:step`/`gatedSliderDown` | 2·3·2·0 | **2 3 2 0 · 2 3 2 0** | YES |
| G-KFW13-6 bytes | focus-ring-shadow · `106,116p` outline | 0 · 1 | **0 1 · 0 1** | YES |
| skip/only | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | 0·0 | **0·0** | YES |
| sweeps | `btn-playback` files · bare `focus-ring` `class=` | 9 · 0 | **9 · 0** both runs (declared beside 7/4 and 8/2; amending none) | YES |
| vue-tsc (RED) | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | 9·9 | **9 · 9**, the same nine rows (`MbabbMenu.vue(333,12)/(333,36)` TS2339 + the seven `.e2` rows) | YES (RED) |
| test:demo (RED) | `npm run test:demo` | 2 failed \| 57 passed (59) · 2 \| 492 (494) | **2 failed \| 57 passed (59) · Tests 2 failed \| 492 passed (494), EXIT 1**, both runs; failing: `spring-trace-truth (4b)` and `css-code-editor-seam (2) KF-CE-1` | YES (RED) |

**gatesReproduced = 11** claimed GREEN rows (all of them). **0** claimed GREEN failed to reproduce. The published figures reproduce, including the RED ones.

### Axes (2)–(8)

- **(2) Bounds**: I ran ⟨cmd⟩ `git -C keyframes.js show --stat` on all **16** shas `9d814f6c..220bd93a`. Paths: `vitest.config.ts` (242f3378, the addendum's one-key grant) · `test/demo/app/*.test.ts` ×2 · `demo/app/dock/{ChromeDock,MbabbMenu}.vue` · `demo/app/App.vue` · `TransportDock.vue` (6ad8ea10, TD-37) · `playback-idiom.css` (d4375768) · `channel-options-render-edge.test.ts` (51f39a19). All are inside the addendum's sets except **LW-1** below. ⟨cmd⟩ `git log 58c1ba11..HEAD -- scripts/dev/dev.sh` → **empty** (`dev.sh` untouched). No glass-ui, `node_modules` or `src/**` byte.
- **(3) Masking**: ⟨cmd⟩ `git diff 9d814f6c..HEAD | grep '^+.*\(catch\|\.skip\|allowlist\|as any\|as unknown\|@ts-\|eslint-disable\)'` → **5** hits. All five are `(window as unknown as {ResizeObserver?/matchMedia}) =` jsdom polyfills inside the two created test files. That is the repo's standing polyfill idiom, and 6a960349's body names it. They are not a masking fallback. No `try/catch`, no skip, no allowlist, no copied producer selector, no patched `node_modules`.
- **(4) Families**: `600246c3` = M-4 deletion + self-hold + kept binding + prose, **ONE sha** (App/ChromeDock/MbabbMenu). `6a960349` (proof) has no `demo/**` byte and precedes it in `git log`. `242f3378` (KF13-E2) is its own sha. `6ad8ea10` = TD-37 with TD-21's rider in one sha. `d4375768` = E-b1's six halves in one sha. The MM-1/MM-6 four-part family was **not split**: it is **unspent** (see D-2).
- **(5) E-3**: ⟨cmd⟩ `git diff --stat 58c1ba11..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/keyframes/conformance` → **empty**. KF.W11/W12/W13 CLOSED cells are unrewritten.
- **(6) Mail**: the `.f2` close sweep reads 90 rows / **0** UNREAD (positional awk). The one new BK letter (`glass-outbound-2026-09-22-consumers-10.0.0.md`) is addressed to slides/atlas. No UNREAD mail is in scope.
- **(7) Four-verb line**: it stayed **PARTIAL**. That is lawful, because the close did not claim IMPLEMENTED over RED gates.
- **(8) Goal criterion**: the dock-menu half is **MET at the bytes**: the self-hold is proven (5/5) and the round-trip is gone. The transport and ribbon halves stand GREEN from KF.W13. The **supplement's own goal is NOT met**: §0ai's Close literal (`vue-tsc` **0**, `test:demo` all green, `npm run check` exit 0) reads **9 / 2 failed / not run**.

### Axis (10): honest-RED adjudication, per RED gate at the spec bytes

| RED gate | Relief the spec gives? | Owner in the register? | Ruling |
|---|---|---|---|
| **G-KFW13-7** (vue-tsc **9**; `test:demo` **2** failed; `npm run check` not exit 0) | **NONE.** The addendum `:299` gives all seven `.e2` rows, G-KFW12-4 and G-KFW11-4 to **this wave's** `.e`. §0ai `:2360-2361` makes `vue-tsc` **0** the sub-tranche's literal. No later wave takes them over and none is producer-owned. The two `MbabbMenu.vue:333` rows are part of ESC-a3-1. | R-f2-3 / ESC-f2-1 → "`KF.W13.e2`, to be dispatched" | **UNRELIEVED RED**: an owner is named, but the owner is **this wave**, still undispatched |
| **G-KFW12-4** · **G-KFW11-4** (gates of record the addendum re-reads) | **NONE**, for the same reason: `.e`'s list, and neither `setTargets` nor the `(4b)` re-bind was attempted | R-f2-3 | **UNRELIEVED RED** |
| **G-KFW13-2** (roster; MM-1/MM-6 four-part ONE-sha cure; TD-36) | **Partial.** The escalation is lawful: the delete arm is in `demo/scenes/cube/CubeScene.vue`, outside §B.2, and ARB-1 is shared with KF.W11. But the spec **requires** the ONE sha in `.a` (§Agent Units `:154`, G-KFW13-2 `:190`) and routes it to no successor wave. The relief it needs is an orchestrator grant, not a spec routing. | R-f2-1 / R-f2-2 → orchestrator grant (`.a4` or a joint commit with a KF.W11 seat) | **UNRELIEVED RED** (escalation lawful; the RED stays open until the grant) |

**Honest-RED set: EMPTY.** No remaining RED is relieved by the spec's own terms.

**Successor "Opens after"**: ⟨cmd⟩ `grep -n 'W13S' COHESION.md LEDGER.md EXECUTION-RUNBOOK.md | grep -i 'after'` → no wave declares KF.W13S as an opens-after conjunct. KF.W3 stays gate-keyed on RC-P(V). **No successor is blocked by this wave.**

### Register (severity · claim · receipt · cure)

| # | Sev | Claim | Receipt | Cure |
|---|---|---|---|---|
| D-1 | **HIGH** | G-KFW13-7, G-KFW12-4 and G-KFW11-4 are RED with no spec relief. The `.e2` cure list (KF-CE-1 `setTargets` + `env.d.ts` arm (b), `(4b)` DAMPING_AXIS re-bind, 7 OP-0 rows, KF11-E4, E-c1) was never dispatched | vue-tsc **9·9**; test:demo **2 failed** ×2; no `.e2` sha in `9d814f6c..HEAD` | Dispatch `KF.W13.e2` on the RESUME plan's writable set, byte-exact for KF-CE-1/4 from the banked hunk; then re-close |
| D-2 | **HIGH** | G-KFW13-2 is RED: the MM-1/MM-6 four-part ONE-sha cure (and the two `MbabbMenu.vue:333` TS2339 rows) is unspent | ESC-a3-1; vue-tsc rows `MbabbMenu.vue(333,12)/(333,36)` | Orchestrator grants `CubeScene.vue`'s delete-arm lines to an `.a4` seat (or a joint commit with a KF.W11 seat under ARB-1); land the four parts as ONE sha, with no `headerLeft` fill arm |
| D-3 | MEDIUM | TD-36 is unspent: the true bytes are `TransportDock.vue:2-8`, outside `.a3`'s set | ESC-a3-2 | Grant the two-class carve on `TransportDock.vue` to a transport seat |
| D-4 | MEDIUM | G-KFW13-7's "every producer row relayed" clause is unmet: R-f2-5's five producer asks are recorded but **not relayed** to BK | R-f2-5 | Relay seat: send an O-n letter to BK (no demo-side cure) |
| D-5 | MINOR | LW-1: App.vue is written beyond §B.2's literal carve. `16dc1e33` and `74c6becc` write the consumer ends of props changed in the same sha, so the families are unsplit and vue-tsc has no App.vue row. `89bf55b2` is comment-only (R3-8) | `git show --stat` above | Mitigated. The next close records the carve reading ("consumed motion" covers a prop's other end); no revert owed |
| D-6 | INFO | The value.js push was rejected non-fast-forward (R-9: a sibling path is staged) | e53c7ef9's body | The orchestrator integrates `6fc1212e` once the sibling stage clears |
| D-7 | INFO | The `as unknown as` jsdom polyfills in two tests are the standing idiom, not masking | axis (3) | none |

**LEDGER**: the status cell is **left unchanged** (PARTIAL stands; the bar for CLOSED is not met). One event line is appended.

---

## Repair 1 — the Check 1 register, cured (2026-09-22; dated addendum beside, E-3; no prior section rewritten)

**Seat**: REPAIR SEAT round 1, `claude-opus-5-5[1m]`. **CRASH-RECOVERY**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → the two untracked 2026-07 value.js letters only (R-10, outside every set, untouched). There were no inherited edits in this seat's set. value.js sibling dirty rows (Track A/C product, `X-W5.md`, `F-W10S.md`, `CARRY-LEDGER.md`, the staged `D demo/shell/PaneSegmentedControl.vue`, `scripts/dev/dev.sh`) were NOT touched and NOT staged. **Frontier**: kf `220bd93a` → **`8ae71f51`** (pushed; ⟨cmd⟩ `git rev-list --left-right --count origin/master...HEAD` → `0 0`).

**Bounds used**: the ADDENDUM `:299` `.e` clause (the RESUME plan's `KF.W13.e2` writable set, unchanged) for D-1. For D-3, KF-W13 §B.2's `TransportDock.vue` row: TD-36 is this wave's row, and its true bytes are in a §B.2 path. For D-4, §B.2's value.js INBOX + SS-6 register rows plus `evidence/W13S/**`.

### Defect → cure → commit

| Check-1 # | Sev | Cure (the spec's own idiom) | kf commit(s) | Verdict |
|---|---|---|---|---|
| D-1 | HIGH | **`KF.W13.e2` executed**, each row its own meaning-commit: **KF11-E2**, the three unused `src/**` declarations deleted with their TS6133 rows · **E-c1**: `parseAnimationCSS.ts`'s `timingFunction?: string` becomes `ReturnType<AnimationEngine["serializeTimingFunction"]>`, which is the serializer's own `CssEasingLiteral`. `useKeyframeOps.ts:91` closes BY ROOT, and that file is untouched · **KF11-E4**: `:key="superKey ?? ''"` · **E-d1 / R-3**: the KF-CE-1/4 arm (b) re-landed from `evidence/W12/KF-W12-d-born-red.md`, with `demo/env.d.ts`'s five-line ambient declaration in the same sha. Byte-exactness: ⟨cmd⟩ `cmp` of the applied `+`/`-` lines against the banked hunk's → **IDENTICAL, 82 lines**. Hunk 1 needed context fuzz 3, because `850b62a9`/`6f065d36` moved two import lines of context. No change line was re-derived · **KF.W12 `.e` residual 1**: the preset double gains `setTargets` · **KF11-E(f1)**: (4b) is re-bound to `import { DAMPING_AXIS }`, and the regex read dies · **KF11-E3** (keyframes half): `cssValue` is typed at its source. The editor modes are translated to real CSS, and the getter returns `NonNullable<InputAnimationOptions["timingFunction"]>`. `currentEasingName`/`selectEasing` carry an `EasingName` contract. No cast. | `6ae324c6` · `2ee8f850` · `dc93e424` · `72e532a9` · `17d3e227` · `96079974` · `c03141bc` | **CURED**, except KF11-E3's two boundary rows (**ESC-r1-2**) |
| D-2 | HIGH | Not curable in bounds. The MM-1/MM-6 four-part ONE-sha cure needs `demo/scenes/cube/CubeScene.vue`'s delete arm (`setPPMode` `:96-97`, `headerLeft` `:129-135`, `:267`). `demo/scenes/**` is on KF-W13's *"Bounds whose expansion invalidates the wave"* list (§Scope, Triumvirate dispatch). Repairing `MbabbMenu.vue:333` alone lands two writers for one persisted flag, which ARB-1 forbids. | — | **ESCALATED (ESC-r1-1)**, carried from ESC-a3-1 unchanged |
| D-3 | MEDIUM | **TD-36**: the ChromeDock pair adopted as ruled (`kf-TransportDock.md:84`, *"adopt the ChromeDock pair (two classes)"*). The host gets `pointer-events-none` on `fixed left-0 right-0 z-dock`, and the `GlassDock` pill is wrapped in `<div class="pointer-events-auto">`, exactly as at `ChromeDock.vue:384`/`:387`. | `8ae71f51` | **CURED** (the SS-13 #9 occluded-extent witness stays SS-13's and is not taken here) |
| D-4 | MEDIUM | **O-48 relayed.** The letter is `keyframes/evidence/W13S/KF-W13S-bk-producer-relay-2026-09-22.md` (five asks plus one status note, each at its registry fact). The INBOX `O-48` row is SENT, with carriage on the SS-6 batch per the O-47 precedent because glass-ui is READ-ONLY. The rows accrete at COHESION §4a as `KFW13-1..6`. Nothing was cured demo-side. | vjs (this commit) | **CURED** |
| D-5 | MINOR | **The carve reading, recorded** (Check 1's own cure): KF-W13 §B.2's `App.vue` row reads *"M-4's sites and the consumed motion"*. A prop contract changed in `ChromeDock.vue`/`MbabbMenu.vue` has its consumer end at `App.vue`, and that end is part of the same consumed motion (`16dc1e33`, `74c6becc`), so the families stay unsplit. `89bf55b2` is a comment-only R3-8 edit at the same seam. No revert is owed. | — | **CURED (recorded)** |
| D-6 | INFO | The value.js push rule is unchanged: push only with no sibling path staged (see §Push below). | — | carried |
| D-7 | INFO | Needs no cure. Beside it: the two `as Monaco.editor.IStandaloneThemeData` casts in `72e532a9` are **inside the banked byte-exact hunk** (KF-CE-29, which replaced `as any`). They are not a new cast of this seat. | — | none |

### Gate re-reading after the cures (kf `8ae71f51`; every figure read from the settled bytes, double-run, `·` separated)

| Gate / row | ⟨cmd⟩ (kf root) | Check 1 | Repair 1 |
|---|---|---|---|
| G-KFW13-7 / OP-0 | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | 9 · 9 | **4 · 4**: `MbabbMenu.vue(333,12)`/`(333,36)` TS2339 (ESC-r1-1) + `EasingSidebar.vue(150,27)` · `EasingTarget.vue(251,62)` TS2345 (ESC-r1-2) |
| G-KFW13-7 test limb | `npm run test:demo` | 2 failed \| 57 passed (59) · Tests 2 \| 492 (494) | **Test Files 59 passed (59) · Tests 494 passed (494)**, both runs |
| G-KFW12-4 | `css-code-editor-seam.test.ts` (4 cases, incl. (2) KF-CE-1) | RED | **GREEN**, 4/4 (inside the 59/59) |
| G-KFW11-4 | `spring-trace-truth.test.ts` (12 cases, incl. (4b)) | RED | **GREEN**, 12/12 |
| skip/only | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | 0 · 0 | **0 · 0** |
| masking | `git diff 220bd93a..HEAD \| grep -c '^+.*\(as any\|as unknown\|@ts-\|eslint-disable\|\.skip\)'` | — | **0** (the two theme casts are D-7's banked-hunk note) |
| byte rows | `setTargets` in the seam test · `basic-languages` in `env.d.ts` · `DAMPING_AXIS` in (4b) · `superKey ?? ` in EditorShell · `pointer-events` in TransportDock | 0 · 0 · 0 · 0 · 0 | **2 · 2 · 3 · 1 · 4**, both runs |
| G-KFW13-2 `headerLeft` | `git diff 9d814f6c..HEAD -- demo/app \| grep -c headerLeft` | 0 · 0 | **0 · 0** |
| sweep | `git grep -l btn-playback HEAD -- demo \| wc -l` | 9 | **9 · 9** (beside RULINGS-4's 7 and the spec's 8, amending neither) |
| `npm run check` | exit code | not run (typecheck limb 9) | **exit 2 · exit 2**. Leg 1 (vue-tsc) is the **4** above. Leg 2 (`tsc --noEmit -p tsconfig.test.json`, run on its own) gives **47**. Of those, 46 are in test files this repair did not touch, and 24 of those 46 are `spring-heatmap-reversibility.test.ts`'s named imports from a `.vue` module under the `*.vue` shim. The one row this repair adds is the same class: (4b)'s `import { DAMPING_AXIS }`, the exact form §0ai prescribes. Leg 3 `proof:structure` → **PASS** |
| lint | `npx eslint` over the six touched demo files · `git diff --check` | — | clean · clean |
| `dev.sh` | `git log 58c1ba11..HEAD -- scripts/dev/dev.sh` (vjs) | empty | **empty** |

### Escalations (returned; measured reasons)

- **ESC-r1-1 = ESC-a3-1 (D-2), unchanged.** The MM-1/MM-6 four-part ONE-sha cure has its delete arm in `demo/scenes/cube/CubeScene.vue`. That file is KF.W11's, and `demo/scenes/**` is a bound whose expansion invalidates this wave. **Needed**: an orchestrator grant of `CubeScene.vue` `:96-97`/`:129-135`/`:267` (plus its dead imports) to an `.a4` seat, or a joint commit with a KF.W11 seat under ARB-1. It lands as ONE sha with `MbabbMenu.vue:333`, with no `headerLeft` fill arm, and `sceneExposedApi.ts:43`'s `headerLeft?` stays out of this wave's `demo/app` diff. This closes vue-tsc rows 1–2.
- **ESC-r1-2: KF11-E3's two boundary rows.** Once `cssValue` is typed at its source, the string origin shows up at the two call sites that feed the `EasingName` contract. `EasingSidebar.vue:150` passes `nameForQuad`'s `Object.keys(NAMED_EASING_BEZIER)` key, and `NAMED_EASING_BEZIER` is `Record<string, …>` at `demo/utils/reference-data/animationDescriptions.ts:19`. `EasingTarget.vue:251` passes the tile ToggleGroup's value, and the tiles are built from `CurveGroupItem.name: string` at `demo/utils/reference-data/easingGroups.ts:7`. Both roots are **catalogue files outside the three-file carve** that §0ai grants. Inside the carve, the only way to close these rows is a type predicate or a cast at the call site, and the RESUME plan's lock (*"no cast/shim/narrowing guard"*) refuses both, so neither was landed. **Needed**: grant `easingGroups.ts` and `animationDescriptions.ts` to type their names by the `EasingName` contract (`name: EasingName` · `Partial<Record<EasingName, Quad>>`). The two sites then resolve by typed lookup (`visibleCurves.find(c => c.name === v)?.name`, and an iteration over the typed catalogue in `nameForQuad`). The row count is unchanged across this move (2 at `useEasingDemo.ts:294/:310` → 2 at the boundary), and no row lands outside the carve.

### Residuals

- A stale comment, which is not a defect of this wave's bytes: `useKeyframeOps.ts:80-89` still narrates E-c1 as open (*"the projection's own type … widens it to `string`"*). The file is KF.W12's Do-NOT-touch tree, and the RESUME plan bars it for `.e2`. Its prose goes to its owner (KF.W12's successor) as a one-comment correction.
- The E-d1 bundle delta receipt (+4,255 B vendor-monaco, −1,054,628 B css.worker) is **cited from the banked measurement** and not re-measured here, because the change lines are identical to the banked hunk.

### E13 · push · LEDGER

- **E13**: four paths swept (the INBOX sweep line appended). UNREAD in scope: **0**. O-48 was minted outbound.
- **Push**: keyframes.js pushed `220bd93a..8ae71f51` (fast-forward, `0 0`). value.js is pushed only if ⟨cmd⟩ `git status --porcelain | grep '^[MADR]'` shows no sibling path staged. At this seat's clock the sibling's staged `D demo/shell/PaneSegmentedControl.vue` stands, so the value.js push is **withheld** (d-R9) and the commit is local.
- **LEDGER**: the status cell is unchanged. **PARTIAL stands**, because G-KFW13-7 (vue-tsc 4) and G-KFW13-2 (the MM-1/MM-6 sha) are still RED on ESC-r1-1 and ESC-r1-2. One event line is appended.

---

## Check 2 — fresh adversarial L-20 pass 2 of the Repair 1 close (2026-09-22; dated addendum beside, E-3)

**Seat**: independent check, `claude-opus-5-5[1m]`, VERIFY-ONLY. I wrote no byte of this wave's cures: **0** keyframes.js bytes, **0** glass-ui bytes, **0** product bytes. **Crash-recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → only the two untracked 2026-07 value.js letters (R-10, untouched). ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B docs/tranches/X/execution/LEDGER.md` → **clean**. Sibling dirty rows (the staged `D demo/shell/PaneSegmentedControl.vue`, `X-W5.md`, `CARRY-LEDGER.md`, `dev.sh`, Track A product) were NOT touched and NOT staged. **Frontier**: kf `8ae71f51` (`origin/master...HEAD` → **0 0**) · vjs `8bb71fda`.

### Verdict: **NOT-CONFORMANT**

Every GREEN that Repair 1 claims reproduces at the bytes, and Repair 1 cured Check 1's D-1, D-3, D-4 and D-5 in bounds. Two gates of record are still RED, and the spec gives neither of them relief:

- **G-KFW13-7**: `vue-tsc` reads **4·4**, and `npm run check` exits **2·2**. §0ai's Close literal requires **0** and exit 0.
- **G-KFW13-2**: the MM-1/MM-6 four-part ONE-sha cure is unspent.

Both REDs rest on returned escalations: ESC-r1-1 needs a `CubeScene.vue` grant, and ESC-r1-2 needs the easing catalogues. Relief for either is an **orchestrator grant**. The spec does not route either one to a successor wave, neither is producer-owned, and the spec does not name either as honest-RED. **Honest-RED set: EMPTY.** The LEDGER status cell is left unchanged: **PARTIAL stands**.

### Axes (1) and (9): the claimed GREENs and the published figures, re-run by this seat (kf root, double-run, `·` separated)

| Gate / row | ⟨cmd⟩ | Record (Repair 1) | This seat | Reproduces |
|---|---|---|---|---|
| W13 + gates-of-record batch (G-KFW13-0/-1/-3/-4/-5 runtime · `cube-scene` · G-KFW12-4 `css-code-editor-seam` · G-KFW11-4 `spring-trace-truth`) | `npx vitest run --project demo <the 6 W13 files> css-code-editor-seam spring-trace-truth cube-scene` | 59 + 4 + 12 | **9 files / 75 tests passed · 9 / 75** | YES |
| G-KFW13-7 test limb | `npm run test:demo` | 59/59 · 494/494 | **Test Files 59 passed (59), Tests 494 passed (494), exit 0 · same** | YES |
| G-KFW13-1 bytes | round-trip `wc -l` · MUST-CARRY · `:109-113` prose | 0 · 1 · 0 | **0 1 0 · 0 1 0** | YES |
| OP-8 | `git show <sha> \| grep -c 'ComponentExposed\|Pick<'` over all **24** shas `9d814f6c..HEAD` | 0 | **0 ×24** | YES |
| G-KFW13-2 `headerLeft` | `git diff 9d814f6c..HEAD -- demo/app \| grep -c headerLeft` | 0 · 0 | **0 · 0** | YES |
| G-KFW13-3 bytes | `.stop` TD · CD · `registerShortcut("Space"` | 0 0 1 | **0 0 1 · 0 0 1** | YES |
| G-KFW13-4 bytes | `instanceof HTMLElement` · `blur\|orphan\|stale` | 0 · 8 | **0 8 · 0 8** | YES |
| G-KFW13-5 bytes | `aria-label` · `valueCommit` · `:step` · `gatedSliderDown` | 2 3 2 0 | **2 3 2 0 · 2 3 2 0** | YES |
| G-KFW13-6 bytes | focus-ring-shadow · `106,116p` outline | 0 · 1 | **0 1 · 0 1** | YES |
| TD-36 bytes | `grep -c pointer-events TransportDock.vue` | 4 | **4 · 4** | YES |
| skip/only | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | 0 · 0 | **0 · 0** | YES |
| sweeps | `btn-playback` files · bare `focus-ring` `class=` | 9 · 0 | **9 0 · 9 0**, declared beside RULINGS-4's 7/4 and the spec's 8/2, amending none | YES |
| vue-tsc (RED) | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | 4 · 4 | **4 · 4**: `MbabbMenu.vue(333,12)`/`(333,36)` TS2339 · `EasingSidebar.vue(150,27)` · `EasingTarget.vue(251,62)` TS2345 | YES (RED) |
| `npm run check` (RED) | exit code · `npx tsc --noEmit -p tsconfig.test.json \| grep -c 'error TS'` | exit 2 · 47 | **exit 2 · exit 2 · 47** | YES (RED) |

**gatesReproduced = 15** claimed-GREEN rows. **0** claimed GREEN failed to reproduce, and the RED figures reproduce exactly.

### Axes (2)–(8)

- **(2) Bounds**: I ran ⟨cmd⟩ `git -C keyframes.js show --stat` on all 8 Repair-1 shas `220bd93a..8ae71f51`. Each path is inside the ADDENDUM `.e` set (true-byte spellings from the Unit plan) or inside §B.2's `TransportDock.vue` row:
  - `6ae324c6`: the three `src/**` files
  - `2ee8f850`: `parseAnimationCSS.ts`
  - `dc93e424`: `EditorShell.vue`
  - `72e532a9`: `CSSCodeEditor.vue` + `env.d.ts`
  - `17d3e227`: the seam test
  - `96079974`: `spring-trace-truth.test.ts`
  - `c03141bc`: `useEasingDemo.ts`
  - `8ae71f51`: `TransportDock.vue`. The raw stat reads 190+/184−. ⟨cmd⟩ `git show -w --stat` → **7+/1−**: two classes plus the wrapper, and the rest is re-indentation.

  `useKeyframeOps.ts` is untouched. ⟨cmd⟩ `git log 58c1ba11..HEAD -- scripts/dev/dev.sh` → **empty**. No glass-ui or `node_modules` byte.
- **(3) Masking**: ⟨cmd⟩ `git diff 220bd93a..HEAD | grep '^+.*\(catch\|\.skip\|\.only(\|allowlist\| as \|@ts-\|eslint-disable\)'` → the only code casts are the two `as Monaco.editor.IStandaloneThemeData` lines. ⟨cmd⟩ `grep -n IStandaloneThemeData evidence/W12/KF-W12-d-born-red.md` → `:204`/`:208`, which is **inside the banked hunk**. They are not new. `c03141bc` adds no ` as ` or `!` in its `+` lines. E-c1 is one type-level token (`ReturnType<AnimationEngine["serializeTimingFunction"]>`). **No masking fallback.**
- **(4) Families**: E-d1's arm and `env.d.ts` are ONE sha (`72e532a9`). Each `.e2` row is its own meaning-commit. TD-36 is ONE sha. The MM-1/MM-6 family is **unspent, not split**.
- **(5) E-3**: ⟨cmd⟩ `git diff --stat 58c1ba11..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/keyframes/conformance` → **empty**. Prior sections of this record are unrewritten.
- **(6) Mail**: ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **92**. The positional UNREAD awk returns **0**. The new BK files since 2026-09-22 00:00 are the 10.0.0 consumers letter (to slides/atlas), `fourier-to-glass-…-nwo1-bh-relay.md` (fourier→glass) and our own outbound `value-to-glassui-…-fw4-relay.md`. **None is addressed to value.js, and no UNREAD mail is in scope.** O-48 is rowed SENT.
- **(7) Four-verb line**: it stayed **PARTIAL**. That is lawful, because no IMPLEMENTED claim was made over RED gates.
- **(8) Goal criterion**: KF-W13's chrome goal is **MET at the bytes** for the dock-menu hold (5/5 self-hold, round-trip 0, MUST-CARRY 1), the transport bundles, the ribbon, and TD-36's pointer trap. The **supplement's own goal is NOT met**: §0ai's Close literal requires `vue-tsc` **0** and `npm run check` exit 0, and these read **4** and **exit 2**.

### Axis (10): honest-RED adjudication at the spec bytes

| RED gate | Relief the spec gives? | Owner named? | Ruling |
|---|---|---|---|
| **G-KFW13-7**, OP-0 limb (`vue-tsc` **4**) | **NONE.** Rows 1–2 (`MbabbMenu.vue:333`) belong to the MM-1/MM-6 ONE sha that §Agent Units and ADDENDUM `.a2` give to **this** wave. Rows 3–4 (`EasingSidebar:150`, `EasingTarget:251`) sit in files §0ai names as **`.e`'s carve** (*"the three-file easing-name contract … is `.e`'s carve; no cast"*). Their string roots are in two catalogue files outside that carve, so ESC-r1-2 is a lawful return. §0ai's Close makes `vue-tsc` **0** the literal. No successor wave is routed and none of it is producer-owned. | ESC-r1-1 / ESC-r1-2 → "orchestrator grant" | **UNRELIEVED RED** (the escalations are lawful; the RED stands until the grants) |
| **G-KFW13-7**, `npm run check` (exit **2**) | **NONE.** Leg 2 (`tsconfig.test.json`) reads **47**: 46 in files this wave did not touch (24 in `spring-heatmap-reversibility.test.ts`, 5 in `channel-options-render-edge.test.ts` at `:214-216`/`:306`/`:309`, which are not the C-11 line at `:103`) plus (4b)'s `import { DAMPING_AXIS } from "…SpringHeatmap.vue"` under the `*.vue` shim (TS2614). That import is §0ai's prescribed form. | **Mis-owned.** R-f2-7 says the limb *"follows R-f2-1 ∧ R-f2-3"*, but leg 2 stays **47** whatever `vue-tsc` reads. | **UNRELIEVED RED; no true owner in the register** |
| **G-KFW13-2** (MM-1/MM-6 ONE sha) | **NONE by routing.** The delete arm is in `demo/scenes/cube/CubeScene.vue`, which is KF.W11's file and on the "expansion invalidates the wave" list. ARB-1 is shared with KF.W11, but the spec **requires** the sha in this wave's `.a` and routes it nowhere else. | ESC-r1-1 → orchestrator grant (`.a4`, or a joint commit with a KF.W11 seat) | **UNRELIEVED RED** |

**Honest-RED set: EMPTY.**

**Successor "Opens after"**: ⟨cmd⟩ `grep -n 'W13S' COHESION.md EXECUTION-RUNBOOK.md LEDGER.md | grep -i 'opens after'` → the only hit is KF.W13S's own conjunct (`COHESION.md:2373`, *"opens after KF.W13 CLOSED"*), which is GREEN. No wave declares KF.W13S as a conjunct. **No successor is blocked by this wave.** KF.W3 stays gate-keyed on RC-P(V), which is not this wave's conjunct.

### Register (severity · claim · receipt · cure)

| # | Sev | Claim | Receipt | Cure |
|---|---|---|---|---|
| C2-1 | **HIGH** | G-KFW13-7 is RED with no spec relief. `vue-tsc` **4** ≠ the §0ai literal **0** (ESC-r1-1 rows 1–2 · ESC-r1-2 rows 3–4). | vue-tsc 4·4, rows quoted above | The orchestrator grants `easingGroups.ts` and `animationDescriptions.ts` (type `name: EasingName` and `Partial<Record<EasingName, Quad>>`) so the two boundary rows close by typed lookup with no cast. It also grants C2-2's `CubeScene.vue` lines. Then re-close. |
| C2-2 | **HIGH** | G-KFW13-2 is RED: the MM-1/MM-6 four-part ONE-sha cure is unspent. | ESC-r1-1; `MbabbMenu.vue(333,…)` TS2339 ×2 | Grant `CubeScene.vue` `:96-97`/`:129-135`/`:267` to an `.a4` seat, or make a joint commit with a KF.W11 seat under ARB-1. Land the four parts plus `MbabbMenu.vue:333` as ONE sha, with no `headerLeft` fill arm. |
| C2-3 | MEDIUM | The `npm run check` limb (a §0ai Close literal) has **no true owner**. Leg 2 is **47** independent of `vue-tsc`. R-f2-7's "follows R-f2-1 ∧ R-f2-3" is false by measurement, and one of the 47 is this wave's own (4b) import under the `*.vue` shim. | `tsc -p tsconfig.test.json` → 47; per-file census above | The next close names the leg-2 owner. Either the orchestrator rules the pre-existing 46 to their test-owning waves and types the `*.vue` shim's named exports (or re-points (4b) at a `.ts` export of `DAMPING_AXIS`), or it rules the leg out of §0ai's literal. Nothing is narrowed or skipped. |
| C2-4 | INFO | The value.js push is withheld (d-R9): a sibling's staged `D demo/shell/PaneSegmentedControl.vue` stands. | `git status --porcelain \| grep '^[MADR]'` | Orchestrator, once the stage clears. |
| C2-5 | INFO | The `useKeyframeOps.ts:80-89` stale E-c1 narration is routed to KF.W12's successor, and its owner is named. The two Monaco theme casts are banked-hunk bytes. | Repair 1 §Residuals; `KF-W12-d-born-red.md:204/:208` | none owed here |

**LEDGER**: the status cell is **unchanged** (PARTIAL stands; the CLOSED bar is not met). One event line is appended.

## Repair 2 — the Check 2 register, round 2 (2026-09-22; dated addendum beside, E-3; no prior section rewritten)

**Seat**: REPAIR (round 2), `claude-opus-5-5[1m]`. **Crash-recovery**: ⟨cmd⟩ `git -C keyframes.js status --porcelain` → only the two untracked 2026-07 value.js letters (outside every writable set, untouched); ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B docs/tranches/X/execution/LEDGER.md` → **clean** — no inherited partial work. Sibling dirty rows (staged `D demo/shell/PaneSegmentedControl.vue`, Track A product, `X-W5.md`, `CARRY-LEDGER.md`, `dev.sh`) NOT touched, NOT staged. **Frontier**: kf `8ae71f51` (`master...origin/master` even) · vjs `3ece0690`.

**Grant search (the premise of every cure owed)**: ⟨cmd⟩ `grep -n 'easingGroups\|animationDescriptions\|ESC-r1-1\|ESC-r1-2\|C2-1\|C2-2\|C2-3' COHESION.md LEDGER.md` → no grant; COHESION's last sections are §0aj (Track C, F.W10S) and §0ak (X-W9.f → X.W11.p) — **no addendum after Check 2 grants `CubeScene.vue`, the two easing catalogues, `package.json`, `demo/env.d.ts` beyond its five-line declaration, or any foreign test file to this wave.** The bounds are therefore §B.2 ⊕ the 2026-09-20 ADDENDUM exactly as Check 2 read them.

### Register → cure → commit

| # | Sev | Defect | Cure at this seat | Commit | Disposition |
|---|---|---|---|---|---|
| C2-1 | HIGH | G-KFW13-7 OP-0 limb: `vue-tsc` **4** ≠ §0ai's **0** | **None lawful in bounds.** Rows 1–2 (`MbabbMenu.vue(333,12)`/`(333,36)` TS2339, `stored.value.ppMode` on `StoredAnimationGroupControlOptions`) are the MM-1/MM-6 ONE-sha family (C2-2); a lone `:333` repair is a split family and two writers for one persisted flag (ARB-1). Rows 3–4 (`EasingSidebar.vue(150,27)` · `EasingTarget.vue(251,62)` TS2345 `string` → `EasingName`) root in `demo/utils/reference-data/animationDescriptions.ts:19` (`Record<string, …>`) and `easingGroups.ts:7` (`name: string`), outside the three-file carve; inside the carve only a cast or a narrowing type-predicate closes them, and the RESUME plan's lock (*"no cast/shim/narrowing guard"*) plus the standing no-masking law refuse both. | — | **ESCALATED (ESC-r2-1 = ESC-r1-1 ∪ ESC-r1-2)** |
| C2-2 | HIGH | G-KFW13-2: MM-1/MM-6 four-part ONE sha unspent | **None lawful in bounds.** The delete arm (`setPPMode` `:96-97`, `headerLeft` `:129-135`, `:267`) is in `demo/scenes/cube/CubeScene.vue` — KF.W11's file, on §Scope's *"Bounds whose expansion invalidates the wave"* list; no grant exists (grant search above). | — | **ESCALATED (ESC-r2-2 = ESC-r1-1)** |
| C2-3 | MEDIUM | `npm run check` leg 2 exit 2, **47** errors, no true owner | **None lawful in bounds** (measured below): 18 of the 47 are TS2614 *named export from a `.vue` under the default-only `*.vue` shim* (17 in `spring-heatmap-reversibility.test.ts`, KF.W11's test; 1 = this wave's (4b) `spring-trace-truth.test.ts:42`, §0ai's prescribed form). Their root is `check`'s leg 2 running plain `tsc` over SFCs (`package.json:37`) — `package.json` is Do-NOT-touch, and `demo/env.d.ts` is granted only for its five-line monaco declaration; re-pointing (4b) needs a `.ts` home for `DAMPING_AXIS` under `demo/scenes/**` (KF.W11's). The other 29 sit in 12 foreign test files. The cure is an owner ruling, which Check 2 itself names as the cure. | — | **ESCALATED (ESC-r2-3)** |
| C2-4 | INFO | value.js push withheld (d-R9) | Re-read: ⟨cmd⟩ `git status --porcelain \| grep '^[MADR]'` → `D  demo/shell/PaneSegmentedControl.vue` — the sibling stage still stands; push stays withheld. | — | no cure owed (orchestrator) |
| C2-5 | INFO | Monaco casts banked; `useKeyframeOps.ts:80-89` routed | — | — | no cure owed |

**cured = 0.** No byte of keyframes.js was written at this seat; no masking fallback was substituted for a grant.

### Gate re-reading (kf root, at `8ae71f51` = Check 2's frontier; double-run)

No cure landed, so no gate could move; kf `HEAD` is byte-identical to Check 2's (`8ae71f51`), and every GREEN Check 2 reproduced (15/15) stands as banked there. The RED limbs the escalations bear on were re-read at this seat's clock:

| Gate / limb | ⟨cmd⟩ | Run 1 | Run 2 |
|---|---|---|---|
| G-KFW13-7 OP-0 | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | **4** (`MbabbMenu.vue(333,12)`/`(333,36)` TS2339 · `EasingSidebar.vue(150,27)` · `EasingTarget.vue(251,62)` TS2345) | **4** |
| G-KFW13-7 `check` leg 2 | `npx tsc --noEmit -p tsconfig.test.json 2>&1 \| grep -c 'error TS'` | **47** (per file: 24 spring-heatmap-reversibility · 5 channel-options-render-edge · 4 group · 3 animation · 2 value4-easing-contract · 2 platform-adopt · 1 each diagnostics-channel, aurora-opacity-ceiling, spring-trace-truth, strict-options, w0-crashes, scroll-scene, waapi-lifecycle) | **47** |
| G-KFW13-7 `check` | `npm run check; echo $?` | **exit 2** | **exit 2** |

**Measurement banked for ESC-r2-3's ruling (informational, not a gate):** ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.test.json 2>&1 \| grep -c 'error TS'` → **33** (exit 2). Leg 2 under `vue-tsc` kills all 18 TS2614 rows (the (4b) row included) but surfaces rows plain `tsc` cannot see through the shim, among them **one in this wave's own `test/demo/instrument/playback-ribbon-contract.test.ts(230,66)` TS2769** (the listener bag `{ [x: string]: unknown }` spread into `h(PlaybackRibbon, …)`) and the 4 `vue-tsc` product rows above. Whichever form the ruling takes, that row is this wave's to cure at the ruling's clock (`.b`/`.c`'s create, in bounds).

### Escalations returned (orchestrator grants / rulings; none is producer-owned)

- **ESC-r2-1 (C2-1)** — grant `demo/utils/reference-data/easingGroups.ts` (`CurveGroupItem.name: EasingName`) and `demo/utils/reference-data/animationDescriptions.ts` (`NAMED_EASING_BEZIER: Partial<Record<EasingName, Quad>>`) so `EasingSidebar.vue:150` / `EasingTarget.vue:251` close by typed lookup with no cast; with ESC-r2-2 this reads `vue-tsc` **0**. Reason: the string roots are outside §0ai's three-file carve and the in-carve forms (cast, narrowing predicate) are refused by the RESUME lock and the no-masking law.
- **ESC-r2-2 (C2-2)** — grant `demo/scenes/cube/CubeScene.vue` `:96-97` / `:129-135` / `:267` (+ its then-dead imports) to an `.a4` seat, or a joint commit with a KF.W11 seat under ARB-1; the four parts + `MbabbMenu.vue:333` land as ONE sha with no `headerLeft` fill arm. Reason: `demo/scenes/**` is on KF-W13's wave-invalidating bounds list; a lone `MbabbMenu.vue:333` repair splits the family.
- **ESC-r2-3 (C2-3)** — name leg 2's owner: either (i) leg 2 becomes `vue-tsc -p tsconfig.test.json` (`package.json:37`, Do-NOT-touch here) — root-cures the 18 TS2614 rows, measured **47 → 33**, then the 29 residual foreign-test rows route to their test-owning waves and the one `playback-ribbon-contract.test.ts:230` row to this wave; or (ii) re-point (4b) at a `.ts` export of `DAMPING_AXIS` under `demo/scenes/**` (KF.W11's) and route the rest likewise; or (iii) rule leg 2 out of §0ai's Close literal. Reason: every arm writes outside §B.2 ⊕ ADDENDUM; nothing is narrowed or skipped.

**Four-verb line**: **PARTIAL stands** (G-KFW13-2 and G-KFW13-7 RED on grants not yet made; no IMPLEMENTED claim). **value.js push**: withheld (C2-4). **E13**: ⟨cmd⟩ `grep -c "^| I-\|^| O-" INBOX.md` → **93** (a sibling row added since Check 2's 92); positional UNREAD awk → **0**; the BK files dated 2026-09-22 are the three Check 2 already classified (none addressed to value.js). No UNREAD mail in scope; this seat made no mail act.

**SELF-COUNT**: ⟨cmd⟩ `sed -n '/^## Repair 2/,$p' KF-W13S.md | grep -c '^| C2-'` → **5** register rows; ⟨cmd⟩ `… | grep -c '^- \*\*ESC-r2-'` → **3** escalations; cured **0**.

## Check 3 — fresh adversarial L-20 pass 3 of the Repair 2 close (2026-09-22; dated addendum beside, E-3; no prior section rewritten)

**Seat**: CHECK (pass 3), VERIFY-ONLY, `claude-opus-5-5[1m]`. Zero keyframes.js / glass-ui / product bytes. **Crash-recovery**: ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B docs/tranches/X/execution/LEDGER.md` → clean; kf ⟨cmd⟩ `git status -sb` → `## master...origin/master` + the two untracked 2026-07 value.js letters (outside every set). **Frontier**: kf `8ae71f51` (unmoved since Check 2 and Repair 2) · vjs `8d4b540d`. **Grant search**: COHESION's last section is still §0ak (⟨cmd⟩ `grep -n '^## §0a' COHESION.md | tail -1` → `:2425 §0ak`); no ruling answers ESC-r2-1/-2/-3.

### Gates re-run at this seat (kf root, double-run)

| Gate / limb | ⟨cmd⟩ | Run 1 | Run 2 | Verdict |
|---|---|---|---|---|
| G-KFW13-1 bytes | round-trip grep · `v-model:open="open"` in MbabbMenu | **0** · **1** | **0** · **1** | GREEN reproduces |
| G-KFW13-2 fill arm | `git diff 9d814f6c..HEAD -- demo/app \| grep -c headerLeft` | **0** | **0** | clause GREEN; MM-1/MM-6 sha still absent → gate RED |
| OP-8 | `git grep -c 'ComponentExposed\|Pick<' HEAD -- demo/app \| wc -l` | **0** | **0** | GREEN |
| skip/only | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | **0** | **0** | GREEN |
| G-KFW13-7 sweeps | `git grep -l btn-playback HEAD -- demo \| wc -l` · bare `.focus-ring` `class=` | **9** · **0** | **9** · **0** | as banked (declared drift beside RULINGS-4's 7/4) |
| W13 batch | `vitest run --project demo test/demo/app/ + transport-keyboard-propagation + transport-play-actuation + transport-icon-spin + playback-ribbon-contract` | **7 files · 52/52** | — | GREEN |
| `test:demo` | `npm run test:demo` (quiet host) | **59/59 · 494/494, EXIT 0** | **59/59 · 494/494, EXIT 0** | GREEN reproduces |
| G-KFW13-7 OP-0 | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | **4** | **4** | **RED** (§0ai literal 0) |
| `check` leg 2 | `npx tsc --noEmit -p tsconfig.test.json 2>&1 \| grep -c 'error TS'` | **47** | **47** | **RED** |
| `npm run check` | `npm run check; echo $?` | **exit 2** | — | **RED** (§0ai literal exit 0) |

The four `vue-tsc` rows are byte-identical to Repair 2's (`MbabbMenu.vue(333,12)`/`(333,36)` TS2339 · `EasingSidebar.vue(150,27)` · `EasingTarget.vue(251,62)` TS2345). ⟨cmd⟩ `git blame -L 332,333 demo/app/dock/MbabbMenu.vue` → `440e5c30` (2026-07-03) on `:333`: the row pre-dates this wave; not wave-introduced.

**Load note (INFO)**: a first pair of `test:demo` runs, taken while `vue-tsc` ran beside it at host load **26.4**, read **2 failed | 57 passed · 2 failed | 492 passed** — both `Test timed out in 5000ms` on the first case of `typing-dots-engine-seam.test.ts` and `value4-editor-boundary.test.ts`; those two files re-run alone → **8/8 · 8/8**, and two quiet full runs → **494/494 · 494/494**. Contention, not a defect of this wave; recorded so the next seat does not mistake it.

### Axes

(2) Bounds: ⟨cmd⟩ `git -C keyframes.js diff --stat 9d814f6c..HEAD` → 19 paths, every one a §B.2 `.a` row or an ADDENDUM 2026-09-20 grant (`vitest.config.ts`'s diff is the one `server.deps.inline` key plus its comment); ⟨cmd⟩ `git show --stat 8d4b540d` (the only sha since Check 2) → `KF-W13S.md` + `LEDGER.md`. `scripts/dev/dev.sh` untouched. (3) Masking: added `as unknown as` hits are jsdom `ResizeObserver`/`matchMedia` shims inside test files (banked INFO at Check 2 C2-5); no try/catch around a defect, no skip, no allowlist, no node_modules byte. (4) Families: unchanged since Check 2 — no new kf sha. (5) E-3: ⟨cmd⟩ `git diff --stat 58c1ba11..HEAD -- docs/tranches/X/keyframes/waves/ docs/tranches/V/megatranche/registry/adjudicated/` → **empty**. (6) Mail: ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **93**; positional UNREAD awk → **0**. (7) Four-verb line: PARTIAL held at every seat since `.f2`; no IMPLEMENTED claim — lawful. (8) Goal criterion: the menu self-holds and opens (G-KFW13-1 runtime GREEN), transport/ribbon rows green; **but §0ai's close literal (`vue-tsc` 0, `check` exit 0) and the MM-1/MM-6 roster row are not met at the bytes.** (9) Published figures: Repair 2's 4·4 / 47·47 / exit 2 reproduce exactly.

### (10) Honest-RED adjudication

| RED gate | Relief at the spec bytes? | Verdict |
|---|---|---|
| G-KFW13-7 OP-0 (`vue-tsc` 4) | None. §0ai's Close asserts `vue-tsc` **0** as *"the sub-tranche's literal"*; the ADDENDUM's "all four honest-REDs" names the state KF.W13 closed in, which KF.W13S was minted to cure — it is not relief for the supplement. Not producer-owned (all four rows are consumer code), no successor wave is routed the rows. The owner/orchestrator is named only as the grant-holder of ESC-r2-1/-2. | **UNRELIEVED** |
| G-KFW13-7 `npm run check` (exit 2, leg 2 = 47) | None. §0ai: *"`npm run check` exit 0"*. ESC-r2-3 asks for a ruling; none exists. | **UNRELIEVED** |
| G-KFW13-2 (MM-1/MM-6 four-part ONE sha) | None. The spec's §Commit plan lists it as `.a`'s; `CubeScene.vue`'s delete arm needs a grant (ESC-r2-2) no ruling has made. | **UNRELIEVED** |

**Honest-RED set: EMPTY** (no RED is relieved by the spec's own terms).

### Register

| # | Sev | Claim | Receipt | Cure |
|---|---|---|---|---|
| C3-1 | HIGH | G-KFW13-7 RED: `vue-tsc` **4** ≠ §0ai's **0** | `vue-tsc … \| grep -c 'error TS'` → 4 · 4 | owner/orchestrator grant ESC-r2-1 (easing catalogues) + ESC-r2-2 (CubeScene arm), then a seat lands both |
| C3-2 | HIGH | G-KFW13-2 RED: MM-1/MM-6 ONE sha unspent | no roster sha in `git log 9d814f6c..HEAD`; `MbabbMenu.vue:333` TS2339 still live | ESC-r2-2 grant → `.a4` joint commit, no fill arm |
| C3-3 | MEDIUM | `npm run check` exit 2 (leg 2 = 47), §0ai literal exit 0 | `tsc -p tsconfig.test.json` → 47 · 47; `check` → exit 2 | ESC-r2-3 ruling (leg-2 owner), then route |
| C3-4 | INFO | `test:demo` times out 2 cases under host load 26 | see load note; quiet runs 494/494 ×2 | none owed |
| C3-5 | INFO | value.js push still withheld (sibling staged `D demo/shell/PaneSegmentedControl.vue`) | `git status --porcelain \| grep '^[MADR]'` | orchestrator |

**Successor conjuncts**: X-W11 (*"everything"*, LEDGER `:39`) carries KF.W13S's CLOSED as a conjunct — **RED**; X-W11 is **lawfully blocked** on this row. No other wave names KF.W13S in its opens-after.

**Verdict: NOT-CONFORMANT.** Every claimed GREEN reproduces (10 limbs); three REDs stand with no relief at the spec's bytes; honest-RED set EMPTY; LEDGER status stays **PARTIAL** (not promoted).

**SELF-COUNT**: ⟨cmd⟩ `sed -n "/^## Check 3/,$p" KF-W13S.md | grep -c "^| C3-"` → **5** · **5** register rows (2 HIGH · 1 MEDIUM · 2 INFO).

---

## RESUME 2 — SEAT 0 (OPEN, RESUME MODE on COHESION §0am), 2026-09-22

SERVED MODEL: claude-opus-5-5[1m] (this section's seat; the file's line 1 names its creator and is not rewritten, E-3)

**Seat**: SEAT 0, VERIFY-AND-BANK — zero keyframes.js bytes, zero glass-ui bytes, zero product bytes. **Sitting of record**: the owner's begin-word 2026-09-17 (COHESION §0j). **Spec of record for this resume**: KF-W13.md **ADDENDUM 2026-09-22** (`:303`) under **COHESION §0am** (`:2471-2507`, commit `63d56244`), read whole; §0ai (`:2322-2375`) still carries the close literal.

**Why RESUME**: LEDGER `:55` status reads **PARTIAL 2026-09-22** (not CLOSED); this record exists. ⟨cmd⟩ `git -C keyframes.js log --oneline 9d814f6c..HEAD` → the unit ids `KF.W13.a2` (`242f3378` · `6a960349` · `600246c3`) · `KF.W13.e` (`6ad8ea10` · `d4375768` · `51f39a19`) · `KF.W13.a3` (`4bd1f8d5` … `220bd93a`, 10 shas) · `KF.W13.e2` (`6ae324c6` … `c03141bc`, 7 shas) + the Check 2 repair `8ae71f51` (TD-36). Those four ids are **alreadyDone — never re-dispatched**. No sha under `.a4` / `.e3` / `.t` exists (kf HEAD = `8ae71f51`).

### CRASH-RECOVERY
- value.js, this seat's set: ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B/ docs/tranches/X/execution/LEDGER.md docs/tranches/V/coordination/` → clean. Sibling dirty paths (Track A product, `X-W5.md`, `CARRY-LEDGER.md`, the **staged** `D demo/shell/PaneSegmentedControl.vue`, `scripts/dev/dev.sh`) — NOT touched, NOT staged.
- keyframes.js: ⟨cmd⟩ `git status --porcelain` → only the two untracked 2026-07 value.js letters (outside every set; untouched). ⟨cmd⟩ `git rev-list --left-right --count origin/master...HEAD` → **0 0** at `8ae71f51`. No inherited partial work.

### E13 Step-0 (four paths, 2026-09-22)
⟨cmd⟩ `ls -dt glass-ui/docs/tranches/*/ | head -1` → `BK/` (still newest). ⟨cmd⟩ `find <path> -maxdepth 1 -name '*.md' -newermt "2026-09-21 00:00"` → value.js `V/`: empty · `V/coordination`: `INBOX.md` (the ledger) · BK: `glass-outbound-2026-09-22-consumers-10.0.0.md` (addressed to slides + atlas; its `:87-89` reads *"value.js: zero hits"* — already noted by three prior 09-22 sweeps, ⟨cmd⟩ `grep -c glass-outbound-2026-09-22 INBOX.md` → 3) · `fourier-to-glass-…-nwo1-bh-relay.md` + `value-to-glassui-2026-09-DD-fw4-relay.md` (value.js's own outbound copies, O-23 / O-32, LANDED) · keyframes.js `V/coordination`: empty · atlas `P/coordination`: empty. Census ⟨cmd⟩ `grep -c '^| I-\|^| O-' INBOX.md` → **93**; positional UNREAD (status column) → **0**. **0 unrowed · 0 new `I-n` · 0 UNREAD in scope.** One sweep line appended at INBOX's end.

### Preconditions
- **KF.W13S's own opens-after**: KF.W13 CLOSED (honest-RED) — LEDGER `:57`; unchanged. **MET.**
- **§0am's grants exist at the bytes**: `63d56244` (COHESION `:2471` + KF-W13.md `:303`). **MET.**
- **ESC-a3-2 discharged**: kf `8ae71f51` is `origin/master`; TD-36 rows no longer owed. **MET.**
- **Grant anchors re-resolved at `8ae71f51`**: `CubeScene.vue:96-98` `const setPPMode = () => {…}` · `:129-135` `const headerLeft = () => h(Popover, …, onClick: setPPMode …)` · `:267` `headerLeft,` in the export — all at the ruled offsets. `MbabbMenu.vue:331-333` `togglePpMode()` → `stored.value.ppMode` (the TS2339 pair). `demo/utils/reference-data/{easingGroups,animationDescriptions}.ts` present. `package.json:37` = `"check": "vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"`. **MET.**
- MM-5's `CheckboxItem`: ⟨cmd⟩ `grep -c CheckboxItem demo/app/dock/MbabbMenu.vue` → **0** (born-RED, `.a4`'s to land).

### Baseline — RESUME 2, read-only, at kf `8ae71f51` / vjs `e68e8889` (double-run, quoted `·`; host load 27.4)

| Gate / row | ⟨cmd⟩ (kf root) | Reads | Verdict |
|---|---|---|---|
| G-KFW13-1 bytes | round-trip grep · `grep -c 'v-model:open="open"' MbabbMenu.vue` | **0·0** · **1·1** | GREEN (landed `.a2`/`.a3`) |
| G-KFW13-2 fill arm | `git diff 9d814f6c..HEAD -- demo/app \| grep -c headerLeft` | **0·0** | clause GREEN; MM-1/MM-6 ONE sha absent → **RED** (`.a4`) |
| `MbabbMenu.vue:333` TS2339 | from the `vue-tsc` run below | **2·2** (`(333,12)` · `(333,36)`) | **RED** (`.a4`) |
| cube witnesses | `vitest run --project demo test/demo/scenes/cube-*.test.ts` | **3 files · 38/38 · 38/38** | GREEN (must stay) |
| OP-0 / G-KFW13-7 | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | **4·4** (MbabbMenu ×2 · `EasingSidebar.vue(150,27)` · `EasingTarget.vue(251,62)` TS2345) | **RED** (§0ai literal 0) |
| leg 2 today | `npx tsc --noEmit -p tsconfig.test.json 2>&1 \| grep -c 'error TS'` | **47·47** | **RED** |
| leg 2 as ruled | `npx vue-tsc --noEmit -p tsconfig.test.json 2>&1 \| grep -c 'error TS'` | **33·33** (§0am's 47 → 33 reproduces) | **RED** (`.e3` → `.t`) |
| `test:demo` | `npm run test:demo` | **59/59 · 494/494**, twice | GREEN (must stay) |
| `npm run check` | `npm run check; echo $?` | **exit 2** | **RED** (§0ai literal exit 0) |
| OP-8 | `git grep -c 'ComponentExposed\|Pick<' HEAD -- demo/app \| wc -l` | **0·0** | GREEN |
| skip/only | `git diff 9d814f6c..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | **0·0** | GREEN |
| drift | `git grep -l btn-playback HEAD -- demo \| wc -l` | **9·9** (beside RULINGS-4's 7 and the spec's 8; amends neither) | declared |

**The 33 leg-2 rows, enumerated** (⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.test.json 2>&1 | grep 'error TS'`):
- the 4 `vue-tsc` product rows above (→ `.a4` ×2, `.e3` ×2) · `test/demo/instrument/playback-ribbon-contract.test.ts(230,66)` TS2769 (→ `.e3`);
- **inside `test/demo/**`** (12 rows / 5 files, → `.t`): `apply-css-identity.test.ts` (179,18) TS2322 · (291,17) TS2739 · `channel-options-render-edge.test.ts` (214,5) (215,5) (216,5) TS2412 · (306,14) (309,14) TS2352 · `keyframe-card-offset-loop.test.ts` (317,18) (345,18) (541,13) TS2322 · `keyframes-editor-honest.test.ts` (266,18) TS2322 · `scenes/spring-heatmap-reversibility.test.ts` (388,56) TS2339;
- **OUTSIDE `test/demo/**`** (16 rows / 8 files): `test/compile/diagnostics-channel.test.ts` (94,51) TS2345 · `test/compile/value4-easing-contract.test.ts` (13,58) (37,60) TS2345 · `test/engine/animation.test.ts` (1,36) (19,15) (30,15) TS6133 · `test/engine/strict-options.test.ts` (55,45) TS2345 · `test/engine/w0-crashes.test.ts` (207,17) TS2322 · `test/group/group.test.ts` (1,36) (2,33) (5,1) (32,15) TS6133 · `test/ingest/platform-adopt.test.ts` (20,21) TS6133 · (32,1) TS6192 · `test/scroll/scroll-scene.test.ts` (36,5) TS6133 · `test/waapi/waapi-lifecycle.test.ts` (241,45) TS2345.

**FINDING B-1 (carve vs count, recorded for the orchestrator, not re-opened)**: §0am counts *"29 rows across 12 foreign test files"* and grants `.t` **`test/demo/**`**. Measured: **28** foreign rows across **13** files, and **16 of the 28 sit outside `test/demo/**`** (the eight files above). As written, `.t` cannot lawfully write those files; its brief therefore RETURNS each by `file:line` as an escalation unless a dated grant widens the carve before `.t` dispatches. Leg 2 → 0 (and `npm run check` exit 0) cannot turn without it.

**GREEN-BEFORE-CURE: EMPTY.** Every owed gate (MM-1/MM-6 sha, `vue-tsc` 0, leg 2 0, `check` exit 0) reads born-RED; the GREEN rows are prior units' landed bytes or must-stay witnesses.

### RESUME 2 unit plan

**alreadyDone** (commits exist — never re-dispatched): `KF.W13.a2` · `KF.W13.e` · `KF.W13.a3` · `KF.W13.e2`. **Owed, strictly serial, 1 concurrent, every seat Opus** (§0am *"Mechanism"*): **[`KF.W13.a4`] → [`KF.W13.e3`] → [`KF.W13.t`] → [`KF.W13.f2`]**. Each unit appends its OWN receipt below under `### Unit receipt — <id> (RESUME 2)`; keyframes.js pushed at every unit's close.

**`KF.W13.a4`** — ADDENDUM `:303` `.a4` clause · §0am ESC-r2-2 (`:2476-2482`) · KF-W13 §Agent Units `.a` `:152-156` · G-KFW13-2 `:190` · §Commit plan `:270` (the MM-1/MM-6 subject) · §Excluded `headerLeft` fill arm. Writable (kf): `demo/app/dock/MbabbMenu.vue` · `demo/scenes/cube/CubeScene.vue` `:96-98` `:129-135` `:267` + their dead imports ONLY · MM-5's `CheckboxItem` site (inside MbabbMenu). vjs: this record. Gates: MM-1/MM-6 four-part cure ONE sha; `MbabbMenu.vue:333` TS2339 ×2 → 0; `git diff 9d814f6c..HEAD -- demo/app | grep -c headerLeft` → 0; `sceneExposedApi.ts:43` untouched; cube witnesses 38/38; `test:demo` 494/494; vue-tsc 4 → 2. Locks: ARB-1 delete-arm only; ONE sha.

**`KF.W13.e3`** — ADDENDUM `.e3` clause · §0am ESC-r2-1 (`:2483-2487`) + ESC-r2-3 (`:2488-2496`). Writable (kf): `demo/utils/reference-data/easingGroups.ts` · `demo/utils/reference-data/animationDescriptions.ts` · `demo/scenes/easing/EasingSidebar.vue` `:150` · `demo/scenes/easing/EasingTarget.vue` `:251` (only if the catalogue typing demands) · `package.json` line 37 ONLY · `test/demo/instrument/playback-ribbon-contract.test.ts:230`. Gates: `vue-tsc -p tsconfig.json` → **0** ×2; leg 2 BEFORE/AFTER 47 → 33 → n banked; `test:demo` green.

**`KF.W13.t`** — ADDENDUM `.t` clause · §0am ESC-r2-3 (`:2488-2496`). Writable (kf): `test/demo/**` + a demo type-declaration module where a row's root is a type declaration. Gates: leg 2 → 0 ×2; `check` exit 0 ×2; `test:demo` green ×2. **Bound note (FINDING B-1)**: the 16 rows in `test/{compile,engine,group,ingest,scroll,waapi}/**` are outside the written carve → RETURNED by `file:line` as ESCALATION unless a dated grant lands first.

**`KF.W13.f2`** — ADDENDUM `.f2` clause · §0ai close (`:2367-2371`) · §0am R-f2-4/-5/-6. Writable (vjs): this record · LEDGER (row cells + appended lines) · INBOX (append) · SS-6 accretion · `keyframes/evidence/W13S/**` · the BK relay letter (mail only). VERIFY-ONLY close.

### Unit receipts (RESUME 2)

