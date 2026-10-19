SERVED MODEL: claude-fable-5-1

# KF.W11.d — the sequence packet (evidence)

**Unit** KF.W11.d · Track B · X·KF · **Date** 2026-09-19
**Repo of work** `/Users/mkbabb/Programming/keyframes.js` (branch `master`)
**Open sha** `2c5f8c04` · **Close sha** `ba12b2ba` (the sha KF.W11.i opens on)
**Rows** `kf-SequenceScene.md` · `kf-SequenceTarget.md` · `kf-SequenceAxis.md` · `kf-SequencePlayhead.md` · `kf-SequenceScrubber.md`

Every figure below is read from the **settled bytes** and **double-run**. Each is
quoted by command (⟨cmd⟩ … → output). Nothing here is recalled. The canonical-domain
decision, the gesture spec, the state-signal spec, SC-2's decision, the OP-3
re-derivation and ESCALATION KF11-E(d1) are in the wave record's `### KF.W11.d`
head (value.js `532f8985`), written BEFORE the family's first commit; this file is
the measurement side.

## 1 · The born-RED gate, twice at the open sha

⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/sequence-instrument-truth.test.ts` at `2c5f8c04` (the file untracked, its five cases written against the ids) → run 1 `Tests  5 failed (5)` · run 2 `Tests  5 failed (5)`.

The five cases and the id each is born RED against:

| # | case | ids |
|---|------|-----|
| 1 | the ruler's terminal label IS `sequence.duration`; `demo.duration` is the engine's; the terminal label carries the unit legend, the first reads `0` | N-1 · N-10 · L-12 ≡ N-10 · D-4 (axis) |
| 2 | a row re-time moves the engine's clock through its ONE public writer (`add()` on a rebuilt Sequence); `reset()` restores the original span | N-2 · SC-2 |
| 3 | the scrubber announces milliseconds — `"<t> ms of <d> ms"` — before and after a scrub | N-14 (after N-1) |
| 4 | the reel's running state is the Button's `loading` contract (`:loading="demo.isReeling.value"`, no bespoke class); re-time refused while reeling; every timer disposed with the scope | ST-4 · D-9 · D-15 · L-8/ST-6 · SC-3/L-5 |
| 5 | three-rect equality BY CONSTRUCTION — stage `gap: 0.5rem var(--col-gap)` ≡ subgrid `column-gap`; axis, row track and playhead track each `grid-column: 2`; no transcribed `left`/`top`; no `--track-inset` anywhere in the three files | N-10 · D-1 · D-2/L-4/C-5 · D-10/L-2 · D-13/L-12 · N-8 |

## 2 · The gate at the close sha — and every other gate, twice

⟨cmd⟩ the loop below, at `a83f2df8` (family L) and again at `ba12b2ba` (family M, the demo suite only):

```
=== RUN 1 @ a83f2df8 ===
gate: Tests  5 passed (5)
focus-ring vue: 1
ring-shadow css: 0
mount: Tests  10 passed (10)
test:demo: Test Files  42 passed (42) Tests  337 passed (337)
vue-tsc total: 25 / sequence: 0
=== RUN 2 @ a83f2df8 ===
gate: Tests  5 passed (5)
focus-ring vue: 1
ring-shadow css: 0
mount: Tests  10 passed (10)
test:demo: Test Files  42 passed (42) Tests  337 passed (337)
vue-tsc total: 25 / sequence: 0
skip-grep: 0
diff-check: clean
```

where `focus-ring vue` = ⟨cmd⟩ `grep -c 'focus-ring' demo/scenes/sequence/SequenceTarget.vue`, `ring-shadow css` = ⟨cmd⟩ `grep -c 'box-shadow: var(--focus-ring-shadow)' demo/scenes/sequence/SequenceTarget.css` (the two byte clauses of G-KFW11-2, both flipped in ONE sha, `f4249cb0`), `skip-grep` = ⟨cmd⟩ `git diff 2c5f8c04..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('`, `diff-check` = ⟨cmd⟩ `git diff --check 2c5f8c04..HEAD -- demo/scenes/sequence test/demo`.

At `ba12b2ba` (after the scene-test extension): ⟨cmd⟩ `npm run test:demo` → run 1 `Test Files  42 passed (42)  Tests  339 passed (339)` · run 2 `Test Files  42 passed (42)  Tests  339 passed (339)`; skip-grep `0` both runs; ⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/sequence-scene.test.ts` → `6 passed (6)` twice (was 4 at open); vue-tsc total `25`.

**§0u ratchet**: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → `25` at open (this seat's crash-recovery figure), `25` after every family, `25 · 25` at close; ⟨cmd⟩ `… | grep 'error TS' | grep -c 'scenes/sequence'` → `0` throughout. No cast, no `@ts-expect-error`, no `eslint-disable` written. (The wave's dd28da55 figure of 54 is not this seat's: the whole-tree count read 25 at this seat's open and never rose.)

**The mount bound** (unchanged from the record head): a Target mount under vitest dies in glass-ui's chunk (`useSpring-9u2_shxV.js` → bare `@mkbabb/keyframes.js`); the fix is the alias in `vitest.config.ts` (Do-NOT-touch). Cases 4 and 5 therefore witness the Target's clauses at the bytes (case 4 additionally drives the REAL `useSequenceDemo` under fake timers); the leaves (`SequenceAxis`, `SequenceScrubber`) mount against the real demo. The pixel witness of the three-rect equality is SS-13 #1/#10's.

## 3 · Commits — 12 on keyframes.js master, each by exact pathspec, each with the session trailer

⟨cmd⟩ `git log --oneline 2c5f8c04..HEAD` →

| family | sha | subject |
|---|---|---|
| A | `36ec392e` | feat · the canonical-domain decision + instrument-truth core (N-1 · N-2 · N-14 · N-4 · L-10/C-4 · C-11) |
| B | `b235ab03` | fix · SC-2 transport surface (reset EXPOSED; nine names DELETED; D19(a)) |
| C | `e8f973cf` | fix · reel packet (D7 · SC-3/L-5 · ST-7/L-9 · L-8/ST-6 · SA-5/N-17) |
| D | `e15eb9ed` | fix · geometry after D-19 (D-1 · D-2/L-4/C-5 · D-10/L-2 · D-13/L-12 · N-8 · L-3/C-3/D-6b · D-6 · D-3 · D-14 · D2/SA-1 · D10 · D-13 · ST-9 · D-22 · D-8) |
| E | `26467cf2` | fix · stacking — the one deletion (D-3/L-3) |
| F | `d09e1911` | chore · property-hygiene family (D-11 · L-9/C-6 · D-14 · N-9 · N-5 · N-6 · N-7 · N-15 · L-9 · D-17/D-18 · D-12) |
| G | `f4249cb0` | fix · ST-1 one word + one deletion (both byte clauses in ONE sha; L-9) |
| H | `da8281df` | fix · ST-4 — the state-signal spec (D-9.2 · D-15 · ST-2/SC-7 · ST-10 · C-2/D22 · D9 · D20) |
| I | `344c0ba2` | feat · applyScrub gesture spec (C-2/L-D-4 · KF-SCR-6 · C-12 · C-5/L-D-3 · L-D-8 · C-11 · D-6 · D-5 · KF-SCR-3 · D-2 ruling 5 · D-12 · N-3 · N-13 · N-18 · D-6/C-8 comet) |
| J | `dd3eb6eb` | fix · axis trio + `--tick-count` (D-3/D-2/D-4 · L-2 · SA-2 · D-8a/L-10 · SA-4 · D-13 · N-20) |
| K | `f26966a5` | chore · prose-truth sweep + store hygiene + hygiene tail (SC-1/D23 · L-6/C-5 · L-11/C-4 · D21 · N-19/D-4/D-5/L-7 · L-8 · D-5) |
| L | `a83f2df8` | test · G-KFW11-2 (the born-RED gate, committed last of the cures) |
| M | `ba12b2ba` | test · sequence-scene extension (SC-2's census as a witness; D7's guard) |

Every sha audited by ⟨cmd⟩ `git show --stat <sha>`: every path under the `.d` writable set; `scripts/dev/dev.sh` never staged (it is a value.js path; the keyframes.js tree's two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*` files are unowned and untouched).

**Two corrections to commit prose (a commit message is not an E-3 artefact, but it is a record)**: family I's message says the mount witness went "9 → 15 cases" — the true figure is **6 → 10** (15 was the two-file run's total); family L's message calls itself the sha `.i` opens on — **superseded by family M**: `.i` opens on `ba12b2ba`.

## 4 · The id roster — every §Carry id for this unit reads LANDED / KILLED-with-rationale / carried / ESCALATED

**LANDED** (by family): kf-SequenceScene D2/SA-1 D · D3 D · D6 H · D7 C · D8 D · D9 H · D10 D · D19(a) B · D20 H · D21 K · D22 H · D23/SC-1 K · SC-2 B · SC-3 C · SC-4 (the `:584` cite) I · SC-7 H · SC-8 D · L-5 C · L-6/C-5 K · L-8 C · L-9 C · L-11/C-4 (the sequence instance) K · L-13 A; kf-SequenceTarget ST-1 G · ST-2 H · ST-3 A · ST-4 H · ST-5 D · ST-6 C · ST-7 C · ST-9 D · ST-10 H · L-5 A · L-8 K · L-9 F · L-10/C-4 A · L-12 A · C-2 H · C-11 A · C-12 A · D-3 D · D-5 K · D-6 D · D-8 D · D-13 D · D-14 D · D-17/D-18 F · D-22 D · D-23 F · D-24 D; kf-SequenceAxis D-2 J · D-3 J · D-4 J · D-6b D · D-7/SA-1 D · D-8a/L-10 J · D-13 J · L-2 J · L-3/C-3 D · L-10 J · L-12 A+J · SA-2 J · SA-4 J · SA-5 C; kf-SequencePlayhead N-1 A · N-2 A · N-3 I · N-4 A · N-5 F · N-6 F · N-7 F · N-8 D · N-9 F · N-10 A+D+L · N-11 F · N-13 I · N-14 A · N-15 F · N-16 D · N-17 C · N-18 I · N-19 K · N-20 J · D-1 D · D-2/L-4/C-5 D · D-3/L-3 E · D-4 K · D-5 K · D-6/C-8 I · D-10/L-2 D · D-11 F · D-12 F · D-13/L-12 D · D-14 F · L-7 K · L-9/C-6 F; kf-SequenceScrubber KF-SCR-1 I · KF-SCR-3 I · KF-SCR-4 I · KF-SCR-6 I · C·C-2/L·D-4 I · C·C-5/L·D-3 I · C·C-11 I · C·C-12 I · D·D-2 (ruling 5) I · D·D-5 I · D·D-6 I · D·D-12 I · L·D-8 I · L·D-10 A+I · L·D-12 (remainder) I.

**GREEN-BEFORE-CURE** (booked, not re-cured): kf-SequenceScene D25 — LANDED-BY `3c8a5525` (KF.W4 `.c`).

**KILLED-with-rationale**: kf-SequenceAxis **SA-3** (a `scaleX` wipe distorts glyphs; the mask the record proposes is paint-phase and the boot arm already clip-wipes — the ruler's boot is the stage's, one arm, N-20's family); kf-SequenceTarget **D16** (its ring rule is superseded by ST-1's producer-contract ring — the `kf-focus-ring` affordance with its forced-colors arm; a second declaration would re-open L-9).

**carried** (declared by path, not dropped): kf-SequenceAxis **D-9** (the raw `1023px` literal — no breakpoint-token family exists in the tree; T.F's gate; named in both stylesheets); kf-SequenceScene **L-11/C-4** other two instances — `demo/scenes/easing/EasingScene.vue:24` → KF.W12 OPTIONS-UNIT, `demo/scenes/spring/SpringScene.vue:74-77` → `.c` (both out of this unit's bounds); kf-SequenceScene **D-10/L-11** scene-token rename (the `--ball-*` names are idiom-owned in `design-idioms.css`, read-only — a rename there is a fleet decision); kf-SequencePlayhead **N-12** (the diamond as a drag affordance — declared NOT an affordance by the gesture spec: the rail is the one scrub surface; carried as the record of that choice); kf-SequenceTarget **ST-8** (error posture of the guarded inject — throws, by C-11's ruling; the scene-level boundary is the shell's); kf-SequenceScrubber **C-13** (the default projector — `.i`'s, the `useDragScrub` owner); kf-SequenceScene **D21** partial: the wrapper is gone and the target is the scene's root; the Target's own root column keeps the width bound (`max-w-3xl`) because the stage cell, not the scene, is what bounds it — the remaining question (whether the CELL should own that bound) is the shell's (KF.W12).

**ESCALATED**: **KF11-E(d1)** — the loop-seam family L-3 + L-10 + SC-5 + SC-6 (one `SweepSceneOptions` parameter in `demo/composables/scene-runtime/useSweepScene.ts`, out of bounds); nothing of it landed, the family not split (`scenePlayback` is still built internally for `facility.playback`, exactly as at open). **The vitest alias ask** (`.b`'s, repeated): `vitest.config.ts` needs the `@mkbabb/keyframes.js` alias before any scene-level Target mount can exist.

## 5 · SELF-COUNT

⟨cmd⟩ `wc -l demo/scenes/sequence/*.vue demo/scenes/sequence/*.css demo/scenes/sequence/*.ts test/demo/scenes/sequence-instrument-truth.test.ts test/demo/instrument/sequence-scrubber-mount.test.ts` → Axis 122 · Playhead 134 · Scene 37 · Scrubber 226 · Target.vue 317 · Target.css 316 · sequenceKeys 8 · useSequenceDemo 564 · useSequenceInstrument 70 · useTypedTrigger 31 · instrument-truth 183 · scrubber-mount 217 (at `a83f2df8`; `sequence-scene.test.ts` 69 → 124 at `ba12b2ba`). Every SFC under the ≤500L demo ceiling (`useSequenceDemo.ts` at 564 is a composable, not an SFC — its length is the loop-seam escalation's to reduce: the internal adapter and the held-PLAY bookkeeping leave with KF11-E(d1)). ⟨cmd⟩ `git diff --stat 2c5f8c04..a83f2df8` → `10 files changed, 994 insertions(+), 387 deletions(-)`; families = 13 commits declared, 13 landed (A–M), zero split.
