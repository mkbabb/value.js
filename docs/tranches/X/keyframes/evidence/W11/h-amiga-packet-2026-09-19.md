SERVED MODEL: claude-opus-5[1m]

# KF.W11.h — the amiga packet · evidence (2026-09-19)

**Unit** KF.W11.h (Track B · X·KF · phase 2, after `.b`) · **Repo** `/Users/mkbabb/Programming/keyframes.js` @ `master`
**Open** `ba12b2ba` · **Close** `c8e3c56a` · **Gate** G-KFW11-8 · **Spec** `keyframes/waves/KF-W11.md` §Agent Units `:261-265` · §Carry P8 `:205-207` · §Bounds `:125-126` · §Gates `:303` · §Sequencing 7 `:323` · §Commit plan 5 `:380`

Every figure below is read from settled bytes and double-run. Commands run from
`/Users/mkbabb/Programming/keyframes.js` unless stated.

---

## §1 Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**, both
value.js-delivered mail packets (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…`,
`…-2026-07-27-…`). **Outside this unit's writable set — not touched.**
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh` — **a sibling seat's row and the unowned dirty row; neither touched, neither staged.**
**Zero inherited hunks inside this unit's own set** (`demo/scenes/amiga/**`, `test/demo/scenes/amiga-*.test.ts`): nothing to finish, nothing to rewrite. Nothing in this receipt inherits a predecessor's work.

## §2 Baseline — G-KFW11-8 born RED, twice, at `ba12b2ba`

| ⟨cmd⟩ | run 1 | run 2 |
|---|---|---|
| `ls test/demo/scenes/amiga-paused-pose.test.ts` | `No such file or directory` | `No such file or directory` |
| `npx vitest run --project demo test/demo/scenes/amiga-paused-pose.test.ts` | `No test files found, exiting with code 1` | `No test files found, exiting with code 1` |
| `grep -c 'it(' test/demo/scenes/amiga-sphere-spin.test.ts` | **5** | **5** |
| `npm run test:demo` | 42 files / **339 passed** | — |
| `npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'` | **25** (global, four tracks share this tree) | — |
| `npx vue-tsc --noEmit -p tsconfig.json \| grep -ci amiga` | **0** | **0** |

**The §0u ratchet floor for THIS unit's rows is 0, at open and at every later measurement.**

### The gate's own born-RED reading (the file present, uncommitted, before any cure)

⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/amiga-paused-pose.test.ts` → **11 failed (11)**,
each for its own mechanism, quoted from the run:

| case | born-RED reading |
|---|---|
| D-1 · paused + `setProgress(t)` | `expected +0 to be close to 5` — the pose read **+5**, the stage stayed at **0** |
| D-1 · the frame that consumes a scrub is LIVE | `expected false to be true` |
| D-1 · a scrub takes the stage back from a settle | `expected +0 to be close to 5` |
| D-1 · a pause with no scrub still settles HOME | `expected +0 to be close to 5` |
| L-B1 · a drag declares the frame LIVE | `expected false to be true` |
| D-3 · resume does not teleport | `expected 2.2241836164595425 to be less than …` — **the whole gap in ONE frame** |
| C-18/M-3 · a 60 s frame cannot complete the settle | `expected 0 to be greater than 0.1` |
| L-M4/C-2 · the seam carries the channel's velocity | `TypeError: createPoseContinuity is not a function` |
| D-2 · the subject carries the square's a11y set | `expected false to be true` |
| D-2 · the keyboard turns the ball | `expected false to be true` |
| MISSED-E · fastest at the floor, slowest at the apex | `expected 0.018131970257547092 to be greater than 0.08159386615896191` — **the inversion, measured: the apex approach is 4.5× the floor approach** |

**The scrub reaches `pose` and only the stage was deaf**, proved separately at the baseline:
⟨cmd⟩ a probe run printing `useAmigaDemo()`'s pose after `setChildTime(bouncingX, 2000).render()` →
`poseAfterScrub: { px: 5, py: 0, pz: 0, spin: 0 }` beside `mesh.position.x = 0`. That is D-1's whole
mechanism in two numbers.

## §3 OP-3 / D-19 — the geometry re-derivation, BEFORE the geometry cure

The framing cure (D-6 + D-11) is the only geometry act in this packet. Both banked figures were
re-derived at this unit's open sha before a byte was written, and **both reproduce exactly**:

| figure | banked (kf-AmigaScene) | this seat, at `ba12b2ba` | verdict |
|---|---|---|---|
| view-axis distance | — | `hypot(1.5, 13.8)` = **13.8813** | — |
| vertical half-extent at the ball plane | 6.4728 | `13.8813 · tan 25°` = **6.4728** | REPRODUCES |
| the fit inequality | aspect ≥ 0.927 | `6 / 6.4728` = **0.92696** | REPRODUCES |
| frustum ∩ ball plane, top | +6.20 | `1.5 + 13.8·tan(25° − 6.204°)` = **+6.199** | REPRODUCES |
| frustum ∩ ball plane, bottom | −6.86 | `1.5 − 13.8·tan(25° + 6.204°)` = **−6.861** | REPRODUCES |
| headroom : footroom | 1.72:1 | `3.199 : 1.861` = **1.719:1** | REPRODUCES |

**After the cure** (lift 1.5 → 1.75, the one free parameter): top `+6.173`, bottom `−6.954`,
headroom `3.173`, footroom `1.954` → **1.624:1** against φ = 1.618 — **0.4 %**. The fit term is a
DOLLY along the camera's own view axis (`position.multiplyScalar`), so a user's orbit angle survives
a resize and the authored arc is never scaled — N-SQ-4's sibling law, applied here by the row's own
words (*"scale the camera, never the arc"*).

## §4 LAW A — every delete this unit booked, with its census

| delete | census ⟨cmd⟩ | reading | verdict |
|---|---|---|---|
| **C-5** the three returned animations | `grep -rn "bouncingX\|bouncingY\|\.spinning" demo test scripts` | **0** consumers outside the module | AUTHORIZED |
| **C-10** the `pz` channel | `grep -rn "\bpz\b" demo test scripts` | 7 hits, **all inside the amiga module**; written by **nothing** (the transform writes x, y, spin only) | AUTHORIZED |
| **C-13** the `SCENE_ID` alias | `grep -rn "SCENE_ID" demo test \| grep -v AMIGA_SCENE_ID` | zero amiga hits (only easing/square/cube's own ids) | AUTHORIZED |
| **MISSED-C** the UV override | `grep -rn "\buv\b\|setAttribute(\"uv\"" demo test` | one hit, the override itself; no reader | AUTHORIZED |
| **L-m3** the duplicated `CONTACT_FLOOR` + epsilon | both sites read; single-sourced, not dropped | 2 → 1 declaration | AUTHORIZED |
| **C-20** `checkerboard.jpg` | `grep -rn "checkerboard" demo test src scripts` → **3 prose hits, 0 code references**; `ls -l` → **103890 B** | census CLEAN | **NOT TAKEN — out of bounds** (§6) |

## §5 Close measurements — every gate figure, double-run at the settled bytes

| ⟨cmd⟩ | run 1 | run 2 |
|---|---|---|
| `npx vitest run --project demo test/demo/scenes/amiga-paused-pose.test.ts` | 1 file / **11 passed (11)** | 1 file / **11 passed (11)** |
| `npx vitest run --project demo test/demo/scenes/amiga-sphere-spin.test.ts` | **10 passed (10)** | — |
| `grep -c 'it(' test/demo/scenes/amiga-sphere-spin.test.ts` | **10** (was 5 — extended, never weakened) | **10** |
| `npx vitest run --project demo` | 44 files / **364 passed (364)** | 44 files / **364 passed (364)** |
| `npx vue-tsc --noEmit -p tsconfig.json \| grep -ci amiga` | **0** | **0** |
| `npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'` | **24** (global; 25 at open — a sibling's) | **24** |
| `npx tsc --noEmit -p tsconfig.test.json \| grep -ci amiga` | **0** | — |
| `npx eslint demo/scenes/amiga test/demo/scenes/amiga-*.test.ts` | exit **0**, no output | — |
| `git diff ba12b2ba..HEAD -- test/demo/scenes/amiga-*.test.ts \| grep -c 'test.skip\|it.skip\|\.only('` | **0** | **0** |
| `git diff --check` | clean | — |

## §6 The commit roster, audited against §Bounds by `git show --stat`

| sha | meaning | files touched |
|---|---|---|
| `c0d81c7d` | D-1 + L-B1 (+ L-m6) — one gate, two missing edges | `AmigaScene.vue` |
| `adb99d16` | D-3 + C-18 + M-3 + L-M4/C-2 (+ L-i3) — the continuity lanes | `AmigaScene.vue` · `useAmigaDemo.ts` |
| `da10a50a` | D-2 + MISSED-F (+ MISSED-A declared) | `AmigaScene.vue` · `useSphereSpin.ts` |
| `1e338dde` | MISSED-E — per-segment easing | `useAmigaDemo.ts` |
| `c7f84b93` | L-M1/C-8 + MISSED-G + the witness extension | `useSphereSpin.ts` · `amiga-sphere-spin.test.ts` |
| `d28cb8e2` | the room: D-8 + C-9 + L-M2/C-14 + D-6/D-11 + M-4 + M-5 + M-6 + L-M5/C-4 | `useAmigaThree.ts` · `useAmigaDemo.ts` · `AmigaScene.vue` |
| `ec8e1d62` | the model: C-12/L-i2 + C-10 + C-5 + C-13 + L-m3 + M-6 | the four amiga modules |
| `a88df330` | MISSED-C — the UV override | `utils.ts` |
| `7a482d9b` | the prose/probe tail: C-16 + C-17 + L-M3/C-11 + D-13/D-14/D-15/L-i7 + MISSED-I + L-i8 | `AmigaScene.vue` · `useAmigaThree.ts` · `useAmigaDemo.ts` |
| `c8e3c56a` | `test(… G-KFW11-8)` — the born-RED gate **and the P8 roster** | `amiga-paused-pose.test.ts` (create) |

**Every path in every stat line is a `.h` row of §Bounds `:125-126` + the two test files of `:135`/`:137`.**
Zero writes outside the set: no `src/**`, no `vitest.config.ts`, no `package.json`, no `node_modules`,
no glass-ui byte, no sibling track's path, no `scripts/dev/dev.sh` (never staged), no `demo/DESIGN.md`.
Every commit used `git add <exact paths>` **and** `-- <the same exact paths>` on the commit itself.
One amend, on this unit's own tip and before any sibling commit landed on it
(`1d2f43a2` → `c8e3c56a`): the message's backticked spans had been eaten by the shell.

## §7 §Sequencing 7 — the borrow, verified against `.b`'s LANDED cure

The lock: *"D-2's shared idiom is a BORROWING from SquareScene and is verified against `.b`'s LANDED
cure, never against the bank's description of it."*

- `.b` closed at `2c5f8c04`; the a11y cure is `3af1422b` (*"input + disclosure"*), **in the tree at
  this unit's open** — ⟨cmd⟩ `git log --oneline -8 -- demo/scenes/square/SquareScene.vue` names it.
- The idiom was read at the exemplar's **bytes**: `role="group"` · `aria-label` · `aria-keyshortcuts`
  · `:aria-describedby` · `tabindex="0"` · `@keydown` · `kf-focus-ring` · **two** visually-hidden
  `role="slider"` children with `aria-valuemin/max/now/text`.
- The gate **asserts it that way too**: `amiga-paused-pose.test.ts` reads `SquareScene.vue` at
  runtime, **strips its comments** (the exemplar explains its contract ABOVE the element, and a naive
  index reads the prose — this seat hit exactly that and fixed the reader, not the assertion), takes
  the attribute set off the element that carries `role="group"`, and requires every member of it on
  the amiga subject. A description of the exemplar is never consulted.
- Amiga's own shape: the children are the canvas's **fallback content** — the accessible subtree of a
  replaced element, which the browser never paints — so **no DOM layer joins the stage** and the
  scene's own T.A10 stage-inventory ruling is untouched. The keyboard route lands in the GESTURE
  layer (`nudge`/`rest` on `useSphereSpin`), so T.A7's one-offset-author discipline survives.

## §8 The rows that did NOT land, and why

| row | disposition |
|---|---|
| **MISSED-A** (no visible touch affordance) | **PARTIAL, declared.** The AT channel is open (name · keyboard · description · per-axis sliders). The VISIBLE half has exactly two shapes: a DOM layer on the stage — foreclosed by the scene's own T.A10 ruling, which this seat has no authority to re-open — or an in-canvas painted legend, a taste act inside the grid-room composition that is **PENDING-OWNER**. Routed with its reason; SS-13 confirms on-device. |
| **C-20** (delete `checkerboard.jpg`) | **NOT TAKEN — BOUNDS.** Census clean (3 prose hits, 0 code references, 103890 B). The path is **not** in this unit's writable set (`§Bounds :125-126` names `AmigaScene.vue` + five carve modules), and a delete is a write. Returned as a one-command act for a seat that owns the path. |
| **D-14's archaeology limb** | **PARTIALLY LANDED.** The actionable halves are cured: the removal changelog inside the rendered template is gone, the probe's false oracles are corrected, forced-colors is handled. The residue is the house-wide tranche-tag idiom (`T.A7`, `I.W3 S2`, `R.W6-decomp`, `J.W7a`), which every demo file carries; dropping it in amiga alone would make this scene the only one a reader cannot cross-reference. Named, not unilaterally spent. |
| **D-11's perceptual verdict** | The ARITHMETIC landed (1.719 → 1.624 against φ); whether the re-framed stage *reads* right is SS-13's, by the row's own scoping. |
| **M-5** | Landed as the row's **second arm** — *"or record the cost as accepted"*. The cost is recorded at the loop with its mechanism, and the comment that claimed an idle CPU is corrected. Standing the FRAME down would require every input edge to re-arm the loop before its own first frame, which inverts this scene's liveness contract (the scene tells the loop what is live, from inside the loop) and would have re-opened L-B1 by construction. |

## §9 Rows surfaced for other seats (no demo-side workaround was taken)

1. **MISSED-F, the house-wide half.** `touch-action: pinch-zoom` landed on the amiga canvas (the
   largest such surface in the tree). The row calls the idiom house-wide at **six** scene sites; the
   other five are other units' files. Routed to `.j`, not reached around.
2. **No glass-ui producer row was surfaced by this packet.** The scene's only producer edge is
   `resolveCanvasColor` from `@mkbabb/glass-ui/canvas` (utils.ts), which is consumed as shipped and
   was not touched. **Zero SS-6 asks from `.h`.**
3. **L-i5** (the checker texture baked once at mount, theme-blind) stays **KF.W6's rider** — its own
   routing. This unit touched the bake site and did **not** adopt the row: the re-bake hook belongs
   beside the mesh's construction seat under that wave's token discipline.

## §10 E13 — the mail sweep at this seat's clock

Four paths swept read-only; classification by the **Status cell's position**, never a bare
`grep -i unread` (the phrase appears in four rows' prose and in none of their Status cells):
⟨cmd⟩ `grep -E '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md | awk -F'|' '…$6=="UNREAD"…'` → **0** · **0**
(double-run) over **79** rows. Newest letter on each path is rowed (`V/coordination/` → the four
2026-09-18 value-4.1 letters · glass `BK/` → `glass-outbound-2026-09-18-valuejs-o26-reply.md` = I-35 ·
keyframes `V/coordination/` → `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = O-21 ·
atlas `P/coordination/` → the 2026-07-27 export-delta = O-12). **No wave-scope mail is UNREAD; this
unit mints no letter.**

## §11 SELF-COUNT

**10** commits listed here and **10** exist in `git log` for this unit · **23** named P8 rows + the
INFO bag, all accounted in §Commit-plan 5's roster commit (`c8e3c56a`) · **11** gate cases, each with
a born-RED reading and a settled-GREEN reading, each double-run · **6** LAW A censuses · **6**
re-derived geometry figures, all reproducing · **1** escalation (C-20, bounds) · **1** partial
(MISSED-A) · **0** figures in this file not read from settled bytes.
