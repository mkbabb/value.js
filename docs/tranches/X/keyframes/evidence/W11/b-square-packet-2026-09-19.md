SERVED MODEL: claude-opus-5[1m]

# KF.W11.b — the square packet (evidence)

**Unit** KF.W11.b · Track B · X·KF · **Date** 2026-09-19
**Repo of work** `/Users/mkbabb/Programming/keyframes.js` (branch `master`)
**Open sha** `1233e42e~1` = `bc5cc128` · **Close sha** `2c5f8c04`
**Rows** `kf-SquareScene.md` + `kf-SquareInstrument.md` (adjudicated registry)

Every figure below is read from the **settled bytes** and **double-run**. Each is
quoted by command (⟨cmd⟩ … → output). Nothing here is recalled.

---

## 1. G-KFW11-7 — acceptance, double-run

⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/square-editor-seam.test.ts`
→ run 1 `Test Files 1 passed (1) · Tests 7 passed (7)`
→ run 2 (with `square-scene.test.ts`) `Test Files 2 passed (2) · Tests 30 passed (30)`

Born RED at open — `No test files found` — exactly as the spec records it.

**The gate's four acceptance limbs, and where each is witnessed:**

| limb | witness | verdict |
|---|---|---|
| after `updateFromString`, `usesDefaultRenderer(frame.transform)` is `false` for the nested leaf | `square-editor-seam.test.ts` group (a) — a real `useKeyframeOps.updateFromString` round-trip on the square's own animation, asserting the SAME renderer **function object** survives, `unflatten` stays true, and the identity is idempotent under a re-`parse()` | GREEN |
| the takeover edge dispatches PAUSE **through the machine** | the byte clause (`animationGroup.pause()` census empty) + `square-scene.test.ts`'s takeover-before-reseat ordering assertion (8 branches) | GREEN |
| the tour test asserts settle-pacing | `square-scene.test.ts` — advance fake timers 10 s → **no movement**; four settles → four legs **in order**; extra settles → nothing | GREEN |
| the instrument renders against a subject travelling ±110 px **without a `viewBox`** (N-SQ-4) | `square-editor-seam.test.ts` group (d) — no user-space box, no `preserveAspectRatio`, `--tether-travel` style, home at the envelope centre, reach exactly ±travel, control point orthogonal to the chord to 1e-6 | GREEN |

## 2. G-KFW11-7 — byte clauses, double-run

| ⟨cmd⟩ | spec: today · must read | run 1 | run 2 |
|---|---|---|---|
| `grep -c 'setTimeout(step, 520)' demo/scenes/square/useSquareKeyboard.ts` | 1 · **0** | 0 | 0 |
| `grep -rc 'animationGroup.pause()' demo \| grep -v ':0'` | `SquareScene.vue:1` · **nothing** | *(empty)* | *(empty)* |
| `sed -n '29p' demo/scenes/square/useSquareDemo.ts \| grep -c ':161'` | 1 · **0** | 0 | 0 |
| `grep -c 'viewBox' demo/scenes/square/SquareInstrument.vue` | 0 · **still 0** | 0 | 0 |
| `grep -rl 'usesDefaultRenderer\|adoptCompiled' test/demo \| wc -l` *(witness census)* | 0 today | 1 | 1 |

**Self-trip disclosure.** Three of these clauses tripped on **my own prose**
mid-unit — the gate greps bytes, and a comment that quotes the banned string is
a byte. `animationGroup.pause()` read **2** (both my comments), `viewBox` read
**4**, `setTimeout(step, 520)` read **1**. Each was reworded, never suppressed
("the group's own `pause()`", "user-space box attribute", "a fixed 520 ms
timer"), and each re-read **0** twice. Recorded because a future seat reading a
clean count should know the count was earned, not inherited.

## 3. The ratchet (§0u / OP-0) and the project suite

| ⟨cmd⟩ | open | close |
|---|---|---|
| `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -E 'square\|Square'` | *(empty)* | *(empty)* |
| `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` (global, context only) | 29 | 25 |
| `npm run test:demo` | 41 files / 328 passed (328) | 41 files / 328 passed (328) |
| `npx eslint demo/scenes/square test/demo/scenes/square-*.test.ts` | clean | clean |
| `git diff 1233e42e~1..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | — | **0** |

**0 diagnostics in this unit's rows at every measurement; the count never rose.**
The global figure is *not* mine to own: `.r`'s receipt re-derives the CI-faithful
floor as **31 → 29**, and the tree is shared by four tracks. Mid-unit the global
figure rose 29 → 30 and I enumerated it by file before continuing: the new
diagnostic was `demo/scenes/cube/CubeTarget.vue`, unit `.a`'s row, from sibling
commit `bc5cc128` in this same working tree. My rows measured 0 before and
after; nothing of mine changed. It now reads 25 — siblings have been curing.

## 4. L-2 — GREEN-BEFORE-CURE (R.2), and the sha KF.W12 asked for

**`L-2` sha = `d7f68225`** — *"fix(kf/w5.d): the renderer belongs to the RECEIVER,
and a failed frame degrades instead of wedging (G-RENDERER + G-RAF)"*, landed
2026-09-17 by KF.W5.d. **This is KF.W12 KFED-UNIT's open point.**

`kf-SquareScene.md:40` disposes L-2 as an **OR**: *"`updateFromString` must
re-supply the animation's own renderer, **or** `adoptCompiled` must preserve a
receiver's non-default transform."* The **library arm landed first**. The cure
in `src/animation/engine/compile-bridge.ts`:

```ts
// THE RENDERER IS THE RECEIVER'S (X.KF.W5 C-1 / G-RENDERER).
const receiver = rendererOf(anim);
const sourceDeclared = rendererOf(source).declared;
…
const keptRenderer = sourceDeclared === undefined ? receiver.own : undefined;
if (keptRenderer !== undefined) {
    for (const frame of anim.templateFrames) frame.transform = keptRenderer;
    for (const frame of anim.frames) frame.transform = keptRenderer;
}
if (keptRenderer === undefined || receiver.declared === undefined) {
    anim.unflatten = source.unflatten;
}
```

Pre-cure (⟨cmd⟩ `git show d7f68225^:src/animation/engine/compile-bridge.ts`) it
was a bare transplant plus `anim.unflatten = source.unflatten` with **no
renderer clause at all** — which is precisely the mechanism L-2 names.

Per **R.2** the row is booked **`LANDED-BY d7f68225`** — *born witness written,
passes twice at my open sha, cause named, not re-cured and not claimed.*
Consequence, stated plainly: **`useKeyframeOps.ts` is byte-unchanged by this
unit.** The `:58-69` carve in my writable set was not spent. The one diagnostic
in that file, `useKeyframeOps.ts(80,13)`, is **outside** the carve and is left
to KF.W12 untouched.

The **`RAFPlayback` degrade-not-wedge rider** (D-27/L-7/C-9) split the same way:
the **library** half landed at `d7f68225` (G-RAF); I landed the **demo** half —
`num()` made TOTAL with a once-per-spelling `console.error`, and `colorAt`'s two
static parses moved out of the frame path (MISS-4) so the throw class that
bricked the loop for the mount's lifetime has no site left in the hot path.

## 5. OP-3 — the geometry re-derivation, performed before the geometry cure

| quantity | arithmetic | figure |
|---|---|---|
| full-drag half-extent | 96 px × 1.12 + 110 + 8 (separator ring) | **225.5 px** |
| tour-corner half-extent | 96 px × 1.08 + 90 + 8 | **201.7 px** |
| mobile half-width | @375 · @390 | **187.5 px · 195 px** |

Both half-extents exceed both mobile half-widths, inside an `overflow: hidden`
plate — the subject and its ring **amputated during the scene's own headline
animation**. This reproduces the record's figures and is what justifies the
clamp. After the cure both numbers are viewport-relative and bottom out
together, so the `[-1,1]` field stays **square** and reachable at every width:

| width | travel | size | half-extent | plate half-width | verdict |
|---|---|---|---|---|---|
| 375 | 78.8 px | 112.5 px | 151.8 | 187.5 | fits |
| 320 | 67.2 px | 96.0 px | 128.9 | 160 | fits |
| ≥524 | max | max | — | — | byte-identical to the fixed pair |

`--square-travel: clamp(4rem, 21svi, 6.875rem)` is the px figure the composable
**reads and re-reads on resize**, so the spring's coordinate world and the
painted geometry cannot drift apart: the tether derives from the same number and
the tour's authored corner stops are re-seated proportionally at `90/110`.

## 6. OP-7 — the gated subset, named BEFORE any cure was spent

OP-7 gates a **named subset** of SquareInstrument on the owner's decision; no
layer may be deleted un-ruled. **The subset, stated and left untouched:**

| row | what it would do | why it is gated |
|---|---|---|
| **D-2** | the caption / telemetry **prune** — which layers live | the OD-5/T.M2 sign-off is the decider; this is a deletion of shipped surface |
| **D-18** | the badge live region | the adjudication rides it on D-2 (it may not survive the prune) |
| **D-10** | legend casing (UPPERCASE vs lowercase) | *moot if D-2's prune takes the legend* |
| **N-SQ-5** | the title rung | rides the D-2 sign-off (same block, same decision) |
| **D-22** *(added by this seat)* | three type registers in the four-line corner block; italic doing no semantic work | the block IS the legend — its type register cannot be unified without pre-empting D-10 and the prune. **Declared gated by adjacency, not cured.** |

Note the **scene**'s D-9 (chrome title and protagonist at the identical
`text-display` rung) is the same decision as N-SQ-5 and is gated with it. The
**instrument**'s D-9 core ≡ C-7 is a *different* row — an orphaned class token,
not a layer — and was cured (§7).

## 7. Rows landed by this unit

**kf-SquareScene** — L-2 *(LANDED-BY `d7f68225`, R.2)* · D-27/L-7/C-9 demo half ·
L-1/C-3 · L-8/C-2 · C-4 · L-3 · L-5 · ARB-1 · D-14/L-9 · MISS-9 · C-1 · L-11/C-5(a) ·
MISS-4 · MISS-5 · L-22a · D-5/L-17 · D-6/L-6 · D-19 · D-4 · L-15 · C-6 · MISS-1 ·
MISS-10 · N-SQ-1 · D-7/N-SQ-2/N-SQ-3 · MISS-3/N-SQ-9 · D-8 · D-21 · D-13/C-13.2 ·
D-16 · D-17 · C-8 · MISS-8 · D-25 · L-22b · N-SQ-8.

**kf-SquareInstrument** — D-1+D-6+D-16+N-SQ-4 *(the tether family, ONE commit,
never split, cured by deriving from travel — never by adding a user-space box,
as N-SQ-4 orders)* · C-3/L-D3+N-SQ-1+L-D5+N-SQ-8 *(instrument-truth, ONE commit)* ·
D-3/D-11-scene · D-9 core ≡ C-7 · D-14 ≡ L-D4 · D-11 · D-15 · D-17 (4th site) ·
L-D8 · L-D10 *(premise retired by C-6)* · N-SQ-6 · C-9.

## 8. Residuals — declared, not silently dropped

1. **L-2's library half** — DECLARED, never written. Landed at `d7f68225`; a
   second implementation would be a re-cure of a GREEN row.
2. **L-16/C-10** (`useSweepScene` mints a stub `ScenePlayback` the square
   discards; the cure is to make the adapter opt-in **at the seam**) — the seam
   is `@composables/scene-runtime/useSweepScene`, **outside this unit's writable
   set**. Not written. Routes to whichever unit owns that file.
3. **L-13/C-11** (`animationGroup.singleTarget = false`, a raw poke) — the
   adjudication routes it as *NO-WAVE-OWNER **+ a library rider***. The demo
   half has no honest cure without the library seam; left with the row's own
   note. SS-13 #10 re-derives L-13's grouped-path paint *if* `singleTarget` ever
   reverts.
4. **L-D6** (per-frame Vue re-render on the paint hot path) — the adjudication
   itself scopes this as **SS-13 #8, a trace**, not a cure: *"the cost = SS-13
   #8; the INconsistency is the defect."* Measuring it is a probe wave's work.
5. **D-20 / D-12 RTL** — a house-wide rider the registry routes to **KF.W9**,
   not to this packet.
6. **D-16 magnitude** — the row marks it *UNPROVEN*, with SS-13 #10 asking for a
   re-derivation **under the producer PRM override** (transition-duration forced
   to 0.1 s). I cured the mechanism (no transition on the frame-driven state);
   the *magnitude* measurement remains SS-13's.

## 9. ESCALATION — the one thing I could not witness in-process

**`SquareScene` cannot be mounted under vitest.**

⟨cmd⟩ *(mount attempt inside the witness)* →
`Error: Cannot find package '@mkbabb/keyframes.js' imported from
node_modules/@mkbabb/glass-ui/dist/useSpring-9u2_shxV.js`

The producer's built chunk imports this package **by bare specifier**, and the
demo project's vitest resolver has no alias for it. The fix is one alias entry
in `vitest.config.ts` — and **`vitest.config.ts` is explicitly in §Bounds'
"Do NOT touch" list.** I did not patch it, did not patch `node_modules`, did not
`vi.mock` the producer, and did not skip the case: each of those is the
masking-fallback class the dispatch names a HIGH defect.

**Consequence, bounded:** the gate's second limb ("the takeover edge dispatches
PAUSE through the machine") is witnessed **without a mount** — by the byte clause
(`animationGroup.pause()` census empty, so the group's own `pause()` has exactly
one caller and it is behind the machine) **plus** `square-scene.test.ts`'s
8-branch takeover-before-reseat ordering assertion on the composable. That is a
real witness of the invariant; it is not a mounted-component witness.

**The ask:** whichever unit owns `vitest.config.ts` adds the
`@mkbabb/keyframes.js` alias for the demo project. Every square scene-level
mount witness in this wave and the next is blocked on it.

## 10. Commits (all on `keyframes.js` `master`, each by exact pathspec)

| sha | packet |
|---|---|
| `1233e42e` | L-2 born witness — GREEN-BEFORE-CURE at `d7f68225` |
| `769f3aec` | D-27/L-7/C-9 — degrade in the frame path; L-10's docblock |
| `61f3fdb4` | ONE playback authority (the machine) + a jump-free takeover both ways |
| `43cb2c05` | colour packet — the channel paints; the `:29` docblock's `:161`→`:163` |
| `b9b5476c` | tether-truth — D-1 + D-6 + D-16 + N-SQ-4 (the family, unsplit) |
| `f6ea8ba1` | instrument-truth — C-3/L-D3 + N-SQ-1 + L-D5 + N-SQ-8 |
| `3af1422b` | input + disclosure — MISS-1, D-6/L-6, D-19, C-6 |
| `c71642c9` | field — D-7 + N-SQ-2 + N-SQ-3 (the published idiom, consumed) |
| `8c0122e1` | MISS-3 — settle-paced tour **and its assertion, one commit** (the lock) |
| `2c5f8c04` | geometry + chrome + hygiene tail (D-8 · D-11 · D-21 · D-15 · the tail) |

`.a`'s commits are interleaved in this same tree; none of mine touch its paths.
`scripts/dev/dev.sh` was never staged and is untouched.
