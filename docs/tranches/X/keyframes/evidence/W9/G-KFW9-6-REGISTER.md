SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.b` — G-KFW9-6 · THE FLAG-STATE-AND-LAYER REGISTER

**Wave** X.KF.W9 (Track B) · **unit** `.b` · **2026-09-17** · substrate **`55e9bf0d`** (SUBSTRATE-PIN §1).

The gate's CLOSES, as re-cut at repair round 4 (RULINGS-4 R4-3), is **three measurements and nothing
else**:

> *(i) the **flag-state-and-layer enumeration** — the group arm (`g.respectReducedMotion`,
> `group/group.ts:57`) and both standalone-arm options bags, published as a register row; (ii) the
> **KAD-11 pair's rest-state capture** — the idle-indistinguishability witness at 100 % width; (iii) the
> `reducedMotionScale` consumer census (R3-9's, re-cited).*

and its falsifier is explicit: ***"fails if a green is recorded on the constraint's behalf rather than on
the three measurements; fails if the register omits an arm."***

**The unification constraint is NOT measured here.** It is HANDED to **KF.W5** (engine half) and **KF.W6**
(tokenization half) as a DECLARED SEQUENCING OBLIGATION, booked at both ends, and reads **UNMEASURED** at
this seat. Recording their discharge would be a measurement of *their* act — never a green of this gate.
This register records no such discharge, because neither act has landed.

---

## Measurement (i) — THE THREE ARMS, each at its byte

The engine has **three** places where `respectReducedMotion` becomes behaviour. All three re-read at the
pin this seat, ⟨`git show 55e9bf0d:<path> | sed -n '<range>p'`⟩:

### ARM 1 · THE GROUP ARM — `group/group.ts:57`, consumed at `group/lifecycle.ts:79-80`

```
src/animation/group/group.ts:57      respectReducedMotion = false;
```
with its own docblock above it (`:55-56`): *"When true, `play()` honors `prefers-reduced-motion: reduce`
by snapping every child to its final frame in one composite, no rAF loop. **Default false.**"*

```
src/animation/group/lifecycle.ts:73  /** Start the group. Resolves when all children complete (or on stop/reset).
                              :74   * Re-entrant: an in-flight `play()` returns the same held promise. Under
                              :75   * `respectReducedMotion` + an active query, snaps to final (no rAF loop). */
                              :76  export async function play<V extends Vars>(
                              :77      group: AnimationGroup<V>,
                              :78  ): Promise<void> {
                              :79      return beginPlay(group, () => withReducedMotion(
                              :80          group.respectReducedMotion,
```
*(offsets re-read line-by-line at the pin this seat; `:80` is independently corroborated by
⟨`git grep -n 'respectReducedMotion' 55e9bf0d -- src/`⟩'s whole output, which prints
`group/lifecycle.ts:75` and `group/lifecycle.ts:80` and nothing between.)*

**The decisive property, measured**: the group's play path reads **`group.respectReducedMotion`** — the
group's own field. It never consults a child's `anim.options.respectReducedMotion`. A child carrying a
`true` flag inside a group whose field is `false` is **inert**.

**Demo-side state of ARM 1**: ⟨`grep -rn 'respectReducedMotion' demo/`⟩ → 7 lines (4 sites, 3 prose;
`PRM-ENUMERATION.md` §A.3). **Not one is a group-arm assignment** — there is no
`g.respectReducedMotion = true`, no `animationGroup.respectReducedMotion`, anywhere in `demo/`.
**The demo sets the group arm at ZERO of its 4 groups** (`useAmigaDemo.ts:153` · `useCubeDemo.ts:116` ·
`SquareScene.vue:174` · `CopyButton.vue:95`).

**And the register's sharpest row**: the cube's three group children (`useCubeDemo.ts:58`, `:80`,
`:109`) **do** carry `respectReducedMotion: true` — inherited from the stored default
(`animationOptionsStore.ts:49` → `:62` → `:108-113`'s `structuredClone`) — and every one of them is
discarded by the group arm at play. *A true flag in the bag and a false gate at the group* is the
mechanism this arm exists to expose, and it is live at the frontier's flagship scene.

### ARM 2 · STANDALONE, UP-FRONT / FINAL-FRAME — `strategies.ts:109-110`

```
src/animation/engine/play-lifecycle/strategies.ts:109    return beginPlay(anim._playback, () => withReducedMotion(
                                                  :110        anim.options.respectReducedMotion,
                                                  :111        // Reduced-motion wins over WAAPI/rAF — snap to the final frame.
                                                  :113            anim.waapiIneligibleReason = undefined;
                                                  :114            return playReducedMotion(anim);
```

Reads **the options bag** (`anim.options.respectReducedMotion`). This is the arm KF-KE-8's corrected cure
map names for the standalone play path.

### ARM 3 · STANDALONE, LIVE-FLIP PER TICK — `frame.ts:131-137`

```
src/animation/engine/play-lifecycle/frame.ts:131    const flipped = withReducedMotion(
                                             :132        anim.options.respectReducedMotion,
                                             :133        () => true,
                                             :134        () => false,
                                             :135    );
                                             :136    if (flipped) {
                                             :137        snapToReducedMotion(anim);
```

Also reads **the options bag**, once per tick, inside `playFrame` (decl `:121`) — **the rAF lane**. This
is G-KFW9-7's ENGAGEMENT anchor and is registered there in full.

### ARM REGISTER — the row this measurement publishes

| arm | site | reads | demo sites that set it | state |
|---|---|---|---|---|
| **GROUP** | `group/group.ts:57` → `group/lifecycle.ts:80` | `group.respectReducedMotion` (own field, default `false`) | **0 of 4 groups** | **UNSET everywhere** |
| **STANDALONE / up-front + final-frame** | `strategies.ts:109-110` | `anim.options.respectReducedMotion` | 3 (`useSceneSwap.ts:45` · `TypingDots.vue:91` · `AnimationVisualizer.vue:147`), **all boolean `true`** | set at 3 of 33 standalone instances |
| **STANDALONE / live-flip per tick** | `frame.ts:131-132` → `snapToReducedMotion` `:137` | `anim.options.respectReducedMotion` | same 3 bags | same 3 — **and unreachable on the WAAPI-delegated lane** (G-KFW9-7) |

**No arm is omitted** — the gate's falsifier is checked against this table explicitly. Three arms exist in
the engine; three arms are registered; the demo's state at each is measured, not inferred.

**MEASUREMENT (i): LANDED.**

---

## Measurement (ii) — the KAD-11 pair's REST-STATE capture at 100 % width

**Status: UNMEASURED — the capture band is blocked at this seat. Not deferred by choice; blocked by an
unmet wave precondition, booked at `DESKTOP-CELL-B.md` §1-2 with its commands.**

What is owed, stated precisely so the shot is unambiguous when the band opens:

- The **pair** is `KeyframesAddDialog.vue:128` `new CSSKeyframesAnimation({ duration: 1000 },
  progressBarEl.value)` and its twin `KeyframesEditor.vue:255` `new CSSKeyframesAnimation({ duration:
  1000 }, el)` — both re-read at the pin this seat, both options bags **duration-only** (no flag), both
  writing width inline. **PAIR LOCK holds: one motion, never split.**
- The witness is the **rest state under `prefers-reduced-motion: reduce`**: the standalone arm (ARM 2)
  snaps to the FINAL frame, which for a width sweep is **100 % width** — and KF-KE-21's banked finding is
  that a 100 %-width bar is **idle-indistinguishable** from the bar's own idle state. The capture must
  therefore be a **pair of frames at the same viewport**: (a) PRM off, bar at rest before play; (b) PRM
  on, bar after the gated play — and the discriminator is whether a viewer can tell them apart.
- **DISCRIMINATOR**: the two frames differ in some pixel other than the bar's fill. **FALSIFIER**: if the
  two frames are pixel-equal in the bar's region, the row's hazard is confirmed and *"land the bar's rest
  state WITH the flag, never the flag alone"* (KF-KE-8's load-bearing nuance) is measured rather than
  quoted.
- Cell: `safari-app/desktop`. Every shot per-shot sha256 + cell + substrate ref, force-added.

**What is NOT done here, and why it would be a defect**: the static half of this measurement (both bags
are duration-only; ARM 2 snaps to final; final = 100 % width) is *already* in hand and is **not** offered
as the measurement. The gate asks for a **capture**, and a static inference dressed as a rest-state
witness is exactly the substitution this wave exists to convict.

---

## Measurement (iii) — the `reducedMotionScale` consumer census

Re-derived at the pin this seat, ⟨`git grep -n 'reducedMotionScale' 55e9bf0d -- src/ demo/ test/ scripts/`⟩
→ **6 hits, whole output**:

```
55e9bf0d:src/animation/index.ts:50:export { reducedMotionScale } from "./internal/reduced-motion";
55e9bf0d:src/animation/internal/reduced-motion.ts:125:export function reducedMotionScale(respect: ReducedMotionPolicy): number {
55e9bf0d:src/animation/physics/spring/progress.ts:2:    reducedMotionScale,
55e9bf0d:src/animation/physics/spring/progress.ts:153:        this.amplitudeScale = reducedMotionScale(
55e9bf0d:src/animation/physics/spring/progress.ts:232:                this.amplitudeScale = reducedMotionScale(
55e9bf0d:src/animation/physics/spring/progress.ts:385:        this.amplitudeScale = reducedMotionScale(
```

⟨`git grep -c 'reducedMotionScale' 55e9bf0d -- demo/`⟩ → **exit 1, no hits**.

| | |
|---|---|
| **export** | `src/animation/index.ts:50` — the **LIGHT** barrel |
| **definition** | `src/animation/internal/reduced-motion.ts:125` |
| **DEMO consumers** | **0** (exit 1) |
| **LIBRARY consumers** | **3** — `physics/spring/progress.ts:153` · `:232` · `:385`, each `this.amplitudeScale = reducedMotionScale(`; import at `:2` |
| **applied at** | `:323` and `:352`, each `const s = this.amplitudeScale;` — the multiplicative displacement-from-rest scalar; the field is declared `private amplitudeScale = 1` at `:100` |

**R3-9's restatement holds at the frontier and is not weakened**: the resolver is **not** dead code — the
spring lane is the shipped in-tree precedent, so the unification **extends a live library mechanism to
the demo half rather than inventing one**. The gate's falsifier is honoured: nothing here says the
resolver is unconsumed.

**And the census's other half, which the demo half makes sharp** — the resolver's own contract, read
verbatim at `internal/reduced-motion.ts:113-131`:

> *"`respect === true` under an active query → `0` (the binary snap — zero displacement, the classic
> behavior). `respect` a number under an active query → that number, clamped to [0, 1] (the intensity)."*

**All three demo opt-ins pass boolean `true`** (`PRM-ENUMERATION.md` §2.1 finding 1). So the demo does not
merely fail to consume `reducedMotionScale` — **where it opts in at all, it opts into the value the
resolver maps to `0`, which is the binary snap the adjudicated cure names as the wrong remedy.** That is
the gap G-KFW9-6's RED was re-cut to measure, now stated as a number: **0 of 42 engine instances use a
numeric intensity.**

**MEASUREMENT (iii): LANDED.**

---

## Gate reading

**G-KFW9-6: RED → RED (correctly). 2 of the 3 required measurements landed.**

| measurement | state |
|---|---|
| (i) flag-state-and-layer register, no arm omitted | **LANDED** |
| (ii) KAD-11 pair rest-state capture at 100 % width | **UNMEASURED — capture band blocked** (`DESKTOP-CELL-B.md`) |
| (iii) `reducedMotionScale` consumer census | **LANDED** |
| the unification constraint (KF.W5 / KF.W6) | **UNMEASURED BY DESIGN** — a declared sequencing obligation; neither act has landed; recording a discharge would be a measurement of their act, never a green here |

**The gate does not close on two of three, and is not reported as closing.** *A gate that closes on the
measurements it could take, rather than the measurements it names, is the failure this wave exists to
convict; it is not done here.*
