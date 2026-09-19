SERVED MODEL: claude-opus-5[1m]

# KF.W11.a — the cube packet · evidence bank (2026-09-19)

Unit `KF.W11.a`, spec `KF-W11.md` §Agent Units `:219-223` · §Carry P1 `:163-168` · §Bounds rows
`:96-103` · §B.3(3) · §Gates G-KFW11-1 `:289` · §Commit plan 1 `:376`. Open sha (keyframes.js)
**`2b649a1d`** — `.r`'s last commit, `origin/master` at this unit's open.

---

## 1 · Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C ../keyframes.js status --porcelain -- demo/scenes/cube demo/scenes/spring/SpringScene.vue test/demo/scenes demo/DESIGN.md`
→ **empty**.
⟨cmd⟩ `git -C . status --porcelain -- docs/tranches/X/execution/B/KF-W11.md docs/tranches/X/keyframes/evidence/W11`
→ **empty**.

**ZERO inherited hunks on any path this unit may write.** The keyframes.js tree carried two
untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*` mail packets (outside the set, untouched);
value.js carried `CARRY-LEDGER.md`, `scripts/dev/dev.sh` (unowned — never staged) and
`docs/tranches/X/fourier/conformance/union-prototype-walk.md`, all sibling-seat rows.

## 2 · OP-0 re-derivation at this unit's open (KF11-E5's instruction, discharged)

`.r` escalated **KF11-E5**: *"the banked OP-0 count 54 is not reproducible … `.a` must re-derive its
own OP-0 reading at its open before spending a cure against the banked 24."* Re-derived:

⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **29** (whole tree, at
`2b649a1d`, with `npm ci` settled).

⟨cmd⟩ the per-file histogram of that run, filtered to this unit's §Bounds rows:

| file | diagnostics at open | banked in the wave record |
|---|---|---|
| `demo/scenes/cube/orbital-drag/OrbitalDrag.vue` | **0** | 24 |
| `demo/scenes/cube/matrix-editor/useTransformState.ts` | **2** (`TS6133` ×2 — `MATRIX_AXES`, `transformSliderOptions`) | 2 |
| `demo/scenes/cube/matrix-editor/MatrixEditor.vue` | **1** (`TS6133` — `resetMatrix`) | 1 |
| `demo/scenes/cube/CubeScene.vue` | **1** (`TS6133` — `computed`) | 1 |
| | **4** | 28 |

**KF11-E5 REPRODUCES EXACTLY.** The banked 24 `OrbitalDrag.vue` rows (`TS2339 Property 'rotate'`,
`TS2769 No overload`) **do not exist** under the lockfile's pins, so this unit's ratchet duty is
**4 → 0**, not 28 → 0. No cure was spent against a diagnostic that is not there, and none was
manufactured to make a banked figure true. **Nothing was suppressed**: no `@ts-expect-error`, no
`as`, no `eslint-disable`, in any commit.

**AFTER** (double-run, at `4226e566`): ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep 'error TS' | grep -Ei 'scenes/cube|orbital-drag|matrix-editor' | wc -l` → **0** · **0**.
Every one of the four fell WITH the cure that owned it (the two dead imports with the sync-topology
rewrite, `resetMatrix` with the dead-emit deletion and its LAW A census, `computed` with the
hygiene tail).

*Whole-tree count at close reads **25**, and it is NOT this unit's figure to claim: a sibling seat
(`.b`, square) is writing the same index concurrently and its in-flight rows rise and fall inside
this unit's window (observed 29 → 31 → 29 → 25). This unit reports only its own rows.*

## 3 · The P1 anchors, re-resolved at the open sha (D-19 / §B-12)

| anchor as banked | measured at `2b649a1d` | disposition |
|---|---|---|
| §B.1 row 7 — four `variant:` sites | ⟨cmd⟩ `grep -rn 'variant:' demo` → `CubeScene.vue:192` · `:198` · `SpringScene.vue:202` · `:225`, all `variant: "outline"` inside `h()` | **DRIFTED by 1 line** (banked `:193`/`:198`; CubeScene's first site reads `:192`). INTENT at the true bytes; the denominator (4) HOLDS. |
| kf-CubeTarget #53 — `useTransformState.ts:121-125` / `:207-211` | both call sites present, both handing `{ transform: matrix3dEnd.value }` whole | HOLDS |
| #56 — `useCubeDemo.ts:144-151` authored, `:166` PRM literal | `rotate3d(-1,1,0,30deg)` at both; `useCubeRelit` receives `transform` ALONE (`CubeTarget.vue`) | HOLDS — the contract gap is real |
| #4 — `KEY_LIGHT = [0.45, 0.6, 0.66]` | `useCubeRelit.ts:22` verbatim | HOLDS |
| #1 — `useDoubleTap({ el: cubeEl })` vs `setPointerCapture` on the container | `CubeTarget.vue` recognizer on `cubeEl`; `useOrbitalPointer.ts:222` captures on `containerRef` | HOLDS |
| #2 — nested-object roll frames | `from: { transform: { rotateX: "0deg", rotateY: "0deg" } }` | HOLDS |
| §B.3(3) latch census | ⟨cmd⟩ `grep -c 'useEventListener(window, "keydown"' …/OrbitalDrag.vue` → **1** | HOLDS |

## 4 · LAW A censuses, run before each delete

**§B.3(3) — the `useEventListener(window, …)` latch.** Census = every reader of
`pointer.updatePressedKeys`:

```
⟨cmd⟩ grep -rn "updatePressedKeys" demo test scripts
demo/scenes/cube/orbital-drag/composables/useOrbitalPointer.ts:169:    const updatePressedKeys = (event: KeyboardEvent, isPressed: boolean) => {
demo/scenes/cube/orbital-drag/composables/useOrbitalPointer.ts:251:        updatePressedKeys,
demo/scenes/cube/orbital-drag/OrbitalDrag.vue:276: useEventListener(window, "keydown", … pointer.updatePressedKeys(e, true));
demo/scenes/cube/orbital-drag/OrbitalDrag.vue:277: useEventListener(window, "keyup",   … pointer.updatePressedKeys(e, false));
```

**Exactly two readers tree-wide, and both are the listeners being replaced.** The decoder therefore
dies WITH them; the STATE it wrote (`pressedKeys`) survives and keeps all 21 of its own readers.

**The dead `resetMatrix` emit** (a second delete this unit books, so it carries its own census):

```
⟨cmd⟩ grep -rn "onResetMatrix|@reset-matrix|resetMatrix" demo test
MatrixEditor.vue:113  (e: "resetMatrix"): void;      ← the declaration
MatrixEditor.vue:177  const resetMatrix = () => emit("resetMatrix")   ← ZERO call sites
CubeScene.vue:184     onResetMatrix: resetMatrix,    ← the sole declared consumer
CubeScene.vue:195     onClick: () => resetMatrix()   ← the LIVE path (the composable's own verb)
```

The emit had one declared consumer and **no reachable raiser**; the live Reset is the ribbon
Button's direct call and is untouched. Deleted as a triple, in one commit, with the comment stating
the census.

## 5 · The three decisions this unit wrote before its patches

**(a) ME-30/ME-31 as ONE sync-topology spec** — written at the head of `useTransformState.ts` before
the first byte of the family changed. Four clauses: one writer per channel and the writer is an
INTENT never an echo; never write both endpoints from one pose; `acos(diagonal)` is not a rotation
read; one retained animation per concern. The echo guard is the house form (OrbitalDrag guards its
own quaternion↔Euler round trip the same way) — **read as precedent, not copied**.

**(b) ME-42's EDIT representation, stated** — the field has no model behind it, so its rendered text
IS its editable state and a single 2-dp formatter governed display AND the write path at once. The
policy names both: **DISPLAY = 2 dp** (the tabular column) · **EDIT = the cell's full stored
precision**, switched on focus, with the full value carried in `title` in both states (ME-43's
recovery affordance). **A display-only cure would have been the defect**; the pair lives in
`transformMath.ts` beside the values it formats, which is also what makes it gate-reachable.

**(c) #56 as a graph-attitude PARAMETER** — `GRAPH_ATTITUDE` is single-sourced beside the geometry
that needs it and consumed by three sites (the eased intro keyframe, the PRM snap, the relight's room
hop). `useCubeRelit`'s second parameter is **REQUIRED**: a lighting model that cannot see the stage
cannot pin a light to a room. **A bare `0.6 → −0.6` is measured failing** in the gate — the
attitude-blind reading is kept beside the attitude-aware one and asserted unequal.

## 6 · Gate G-KFW11-1 — BEFORE → AFTER, every figure double-run

| clause | BEFORE (at `2b649a1d`) | AFTER (at `4226e566`) |
|---|---|---|
| runtime `npx vitest run --project demo test/demo/scenes/cube-roll-and-prestart.test.ts` | `No test files found, exiting with code 1` (⟨cmd⟩ `ls` → no such file), twice | **17 passed (17)** · **17 passed (17)** |
| byte: `grep -c 'useEventListener(window, "keydown"' demo/scenes/cube/orbital-drag/OrbitalDrag.vue` | **1** · **1** | **0** · **0** |
| byte: `grep -rc 'variant:' demo \| grep -v ':0'` | `CubeScene.vue:2` · `SpringScene.vue:2` (both passes) | **nothing** · **nothing** (exit 1, no rows) |
| §0u ratchet, this unit's rows | **4** · **4** | **0** · **0** |
| `npm run test:demo` | 39 files / 286 tests (seat 0's baseline) | **316 passed (316)** · **316 passed (316)** *(includes `.b`'s concurrent additions)* |
| self-trip `git diff 2b649a1d..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | — | **0** |
| `npx eslint demo/scenes/cube demo/composables test/demo/scenes/cube-*.test.ts` | 1 error (`vue/require-v-for-key`, MatrixEditor `:8` — PRE-EXISTING at the open sha, proven by linting the open-sha file itself) | exit **0** |
| `npx tsc --noEmit -p tsconfig.test.json`, this unit's rows | 0 | **0** |
| `git diff --check` | — | clean |

**The gate's named cases, each satisfied:** a pre-start model change → `el.style.transform` matches
`/^matrix3d\(/` (#53) · the Roll stack's four defects asserted separately (#1 trigger reachable on the
capture surface · #2 a real `rotateX(...)` paint with `transform.rotateX` empty · #5 roll 2 opens at
roll 1's landing, never at identity · #6 `.cube` untouched while the roll paints) · `useCubeRelit`
receives the graph attitude and a bare sign fix fails (#56) · a >2-dp cell round-trips an edit with
full precision and `-1000` is recoverable on the selected cell (ME-42/ME-43) · the OD latch clears on
blur (OD-5) and a `Mod+Z` chord does not latch it (OD-4's rider).

## 7 · Born-RED, stated positively

Each case fails against the open sha by construction, not by assertion-tuning: `matrix3dCss`,
`matrixCellDisplayText`/`matrixCellEditText`, `rotateByAttitude`, `GRAPH_ATTITUDE` and
`OrbitalDrag`'s exposed `containerRef`/`resetPressedKeys` **did not exist** at `2b649a1d`, and
`useTransformState`'s arity was different; the roll cases assert paint and continuity that the
pre-cure code cannot produce at all (its writes went to `transform.rotateX`, a name CSSOM discards).

## 8 · Residuals and declarations

- **#7 (library half) — DECLARED TO KF.W5 BY ID.** The renderer's silent object-skip
  (`src/animation/compile/value/compile.ts`, the `typeof value === "object"` `continue`) is a `src/**`
  byte and is NOT this wave's. The demo half landed alone; the cure class the record names is
  fail-explicit diagnostics on the existing `KeyframesAnimation.diagnostics` channel. **No `src/**`
  byte was written by this unit.**
- **#31/#57 (axis-reveal) — BOOKED, NOT CURED.** `CubeAxisLines.vue` is KF.W12's AXISLINE-UNIT.
- **KF-AX-1's consumer half** — AXISLINE-UNIT opens on **`fff7232c`**, this unit's OD latch-family sha.
- **kf-CubeScene L-2/C-5 — `complete_with_misses`, declared in the source.** `isPlaying` has no
  writer anywhere; its ONE authority is shared with kf-SquareScene L-8/C-2 and its writer lives in
  `demo/app/scene/useSceneMachineShellBinding.ts`, which is KF.W13's bounds and outside this wave's.
  A scene-side derivation off the raw (non-reactive) group would have been a SECOND authority — the
  exact defect the row exists to retire — so nothing was shimmed.
- **#10 (PRM on the roll)** — routed to KF.W9 by the registry (`K10` ≡ kf-CubeScene D-8+M-7); the
  roll still does not pass `respectReducedMotion`. Named, not spent.
- **#16 / #36 (lighting-truth)** — carried by id. Their r1 text is superseded at the registry path
  (`kf-CubeTarget.md` r2: *"the r1 text at this path is superseded whole, its rows carried by id"*),
  so no quotable cell exists at this seat's bytes; the family's ONE cure (the sign + the attitude
  parameter) is the one the r2 record itself names, and it landed.
- **SS-6 producer row (new)** — `registerShortcut`'s combo chip renders a `code` spelling verbatim
  (`formatCombo("KeyX")` → `"KeyX"`). Registering SPATIAL bindings by `event.code` is what discharges
  OD-4's layout limb, so the ask is producer-side: a display override on `ShortcutOptions`, or
  `formatComboParts` learning the `Key*`/`Digit*` family. **Relayed at `.j`, never worked around
  demo-side.**
- **HARNESS FINDING (new)** — the demo vitest lane **cannot import any SFC that transitively loads
  `@mkbabb/glass-ui`'s spring chunk**: ⟨cmd⟩ a probe importing `MatrixEditor.vue` → `Error: Cannot
  find package '@mkbabb/keyframes.js' imported from node_modules/@mkbabb/glass-ui/dist/useSpring-*.js`,
  while `CubeTarget.vue` and `OrbitalDrag.vue` import clean. Vite externalises `node_modules`, so the
  `vitest.config.ts` self-alias does not reach inside an externalised dep. This is the same class of
  silent coverage cap that KF.W4's G-KFW4-2 cured for the SFC transform, and it caps every future
  glass-consuming mount. `vitest.config.ts` is in §Excluded's *"Do NOT touch"* list, so **nothing was
  changed to work around it**: the ME-42/ME-43 policy was lifted into `transformMath.ts` (a better
  home regardless) and is asserted there. **Returned to the orchestrator.**
- **`useCubeDemo.ts`'s private CSS-value builders** were consolidated into `transformMath.ts` (the
  module that already owned `cssVariable` and that `useCubeDemo` already imported from) rather than
  duplicated for the roll's use. Mechanical, type-identical, zero behaviour change; declared here
  because it touches a carve row for a reason the carve does not name.

## 9 · Commit roster (keyframes.js `master`, local; not pushed — a sibling seat shares this index)

| sha | meaning |
|---|---|
| `bc5cc128` | #53 + #7 demo half — the pre-start orientation writer paints |
| `37764477` | roll stack (#1·#2·#5·#6·#20) + lighting frame contract (#4·#56) |
| `9e7aca87` | latch/pointer seam (#54 · #55 · OD-25) |
| `dd7c6008` | matrix-editor family (ME-30/31 topology · ME-7 · ME-1 · ME-38 · ME-39 · ME-42 · ME-43) |
| `dc3f0900` | **the four phantom `variant:` sites, ONE commit, two files** (MUST NOT SPLIT — honoured) |
| `fff7232c` | **OD latch family → registry** (KF-AX-1; **KF.W12 AXISLINE-UNIT's open point**) |
| `5f1c8208` | hygiene tail + prose truth (MISS-3 law) |
| `482e5aa0` | `test(… G-KFW11-1)` — the born-RED gate |
| `4226e566` | hygiene — the keyless `v-for` and the #56 single-source witness |

Every commit carries its own pathspec on the commit itself; `git show --stat` per sha audited
against §Bounds rows `:96-103` — **zero writes outside the writable set**, and the only non-cube
product byte in the roster is the two-line `SpringScene.vue` carve the spec assigns to this unit.
No `src/**` byte · no `CubeAxisLines.vue` byte · no `node_modules` byte · no glass-ui byte ·
`scripts/dev/dev.sh` never staged · no `git stash`, no `reset --hard`, no force-push.
