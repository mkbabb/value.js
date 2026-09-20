SERVED MODEL: claude-opus-5[1m]

# KF.W12.f — G-KFW12-6 transcripts (born-RED → GREEN, every command double-run)

**Seat**: KF.W12.f (AXISLINE-UNIT) · 2026-09-19, third sitting · full dispatch, nothing
inherited. All commands run from `/Users/mkbabb/Programming/keyframes.js`.

## 0 · OP-1 — the lock this unit opens on, printed FIRST and claimed by nobody here

⟨cmd⟩ `grep -c 'useEventListener(window, "keydown"' demo/scenes/cube/orbital-drag/OrbitalDrag.vue`
→ **0** · **0**

**`LANDED-BY fff7232c`** (KF.W11 `.a`, the OD latch family). GREEN-BEFORE-CURE (R.2): this is
the inbound clause of this unit's own gate and it was green before this unit existed. It is
**booked, never claimed** — KF.W12.f wrote no `orbital-drag/**` byte (one cure, one home).

## 1 · The gate, BEFORE (born-RED, at kf `2a0afe7a`)

⟨cmd⟩ `ls test/demo/scenes/cube-axis-reveal.test.ts`
→ `ls: test/demo/scenes/cube-axis-reveal.test.ts: No such file or directory` · same

⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/cube-axis-reveal.test.ts`
→ `No test files found, exiting with code 1` · same

**Byte anchors, verified at TRUE bytes before a single edit** (the spec's `§Gates` "Recorded"
line, reproduced exactly):

⟨cmd⟩ `grep -n 'rotateY\|rotateZ\|1000vw' demo/scenes/cube/CubeAxisLines.vue`
→ `63:    width: 1000vw;` · `113:        transform: rotateZ(90deg);` · `117:        transform: rotateY(90deg);`

All three stand where the spec recorded them; **no anchor drift on the subject file**.

⟨cmd⟩ `grep -c 'var(--axis-active, 0)' demo/scenes/cube/CubeAxisLines.vue` → **3** · **3**
(ruling 6's count re-verified a fourth time; the corpus's ×4 cell stays dead — KF-AX-21.)

⟨cmd⟩ `grep -n '180ms' demo/scenes/cube/CubeAxisLines.vue` → `:41` · `:81`, **both comments**,
no declaration. **KF-AX-9's token rider = `LANDED-BY KF.W6`**, re-measured at this unit's open,
never claimed.

⟨cmd⟩ `wc -l demo/scenes/cube/CubeAxisLines.vue` → **120** (the §B.2 figure, unmoved at open).

## 2 · The gate, AFTER

⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/cube-axis-reveal.test.ts`
→ `Test Files  1 passed (1)` / `Tests  11 passed (11)` — **run 1**
→ `Test Files  1 passed (1)` / `Tests  11 passed (11)` — **run 2**

**G-KFW12-6: RED → GREEN.**

### The gate's clauses, each named against the case that turns it

| clause (spec `§Gates` G-KFW12-6) | the case that turns it |
|---|---|
| "the reveal lights only the axis the drag constrains" | `a registry-dispatched KeyX lights the X stroke and only the X stroke`; `each axis key lights its own stroke — the whole tuple, one at a time`; and the constraint itself proven at `DRAG: unlatched it rotates; latched it is constrained — same gesture` |
| "the `.z` stroke is legible under `rotate3d(-1,1,0,30deg)`" | `SETTLED …: the .z stroke is legible — 45.00deg, extent 0.5/unit` (extent 0.5/unit, 49.11° clear of both siblings) |
| "`rotateY(90deg)` out-of-plane is the defect, not the style" | `MOUNT t0 (identity): the redundancy holds for X-vs-Y and fails for EXACTLY Z` + `the degeneracy is TRANSIENT, and the PRM arm never shows it` — the defect is isolated to the frame, and the style is upheld by decision |
| "every geometric assertion carries its frame stamp (KF-AX-4)" | every case in suite 1 takes its attitude as an argument; `the stage attitude is re-derived, never restated` fails the moment the frame moves |
| "a registry-dispatched lock (not a window keydown) drives it" | the end-to-end case dispatches `new KeyboardEvent("keydown", { code: "KeyX" })` and the chain `registerShortcut → setAxisLatch → OrbitalDrag's emit → the lit stroke` runs with the REAL components |
| inbound: window-keydown `0` | §0 above, `LANDED-BY fff7232c` |

## 3 · The wave-level readings this unit moved (and did not move)

⟨cmd⟩ `npm run test:demo 2>&1 | tail -4`
→ `Test Files  2 failed | 52 passed (54)` / `Tests  2 failed | 453 passed (455)` · identical
both runs, **and the `Errors 1 error` line the resume recorded is GONE** (the `.e` seat's
inherited worktree hunk, cured by that seat — not this one's claim).

The two failures are the two the resume named, both pre-existing and owned:
`css-code-editor-seam.test.ts > … (2) KF-CE-1` (`.d`'s **E-d1**, carried) and
`spring-trace-truth.test.ts > … (4b)` (**KF.W11's inherited honest-RED**). **Nothing was
skipped, cast, guarded or allow-listed** to reach any reading on this page.

⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **12** · **12** —
the §0u ratchet's banked floor, **unmoved**. ⟨cmd⟩ the same output filtered for this unit's two
files (`grep -n 'CubeAxisLines\|cube-axis-reveal'`) → **no output**: neither the cured SFC nor
the new spec contributes one error.

⟨cmd⟩ `npx eslint demo/scenes/cube/CubeAxisLines.vue test/demo/scenes/cube-axis-reveal.test.ts`
→ *(no output)*, exit **0**.

## 4 · Commits

| sha | meaning |
|---|---|
| `6db80df7` | `fix(kf/axis · X.KF.W12.f · AXISLINE-UNIT — the reveal made honest, frame-stamped)` — the whole product cure, 22 roster rows |
| `2736b5e5` | `test(kf/axis · X.KF.W12.f · G-KFW12-6 — cube-axis-reveal, 11 cases, born-RED cured)` |

⟨cmd⟩ `git show --stat 6db80df7` → `demo/scenes/cube/CubeAxisLines.vue` **only**;
⟨cmd⟩ `git show --stat 2736b5e5` → `test/demo/scenes/cube-axis-reveal.test.ts` **only**. Both
pathspec'd on the commit itself; no sibling seat's path appears in either.
