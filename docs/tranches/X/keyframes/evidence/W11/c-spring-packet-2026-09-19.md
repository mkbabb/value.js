SERVED MODEL: claude-opus-5[1m]

# KF.W11.c — the spring packet · evidence (2026-09-19)

Unit `KF.W11.c` (phase 2, Opus). Spec `KF-W11.md` §Agent Units `:231-235` · §Carry P3 `:180-185` ·
§B.1 rows 5/6 `:85-86` · §Bounds rows `:115-117` · §B.3(2) `:147` · §Gates G-KFW11-3 `:293` ·
§Commit plan 4 `:379`. Repo `/Users/mkbabb/Programming/keyframes.js`, branch `master`.

**Open sha** `ba12b2ba` · **last sha of this unit** `cc8ef498`.

---

## 0 · CRASH-RECOVERY (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain -- demo/scenes/spring test/demo/scenes`
→ **empty**.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain -- docs/tranches/X/execution/B/KF-W11.md docs/tranches/X/keyframes/evidence/W11`
→ **empty**.

**ZERO inherited hunks on any path this unit may write** — nothing to finish, nothing to rewrite,
no inherited paths to name. Dirty rows outside the set were read and left alone: keyframes' two
untracked `VALUEJS-INBOUND-*` mail packets; value.js's `CARRY-LEDGER.md` (a sibling seat's) and
`scripts/dev/dev.sh` (**unowned — never touched, never staged**).

## 1 · Open measurements (double-run where the gate asks)

| what | command | reading |
|---|---|---|
| open sha | `git rev-parse --short HEAD` | `ba12b2ba` |
| G-KFW11-3 runtime | `npx vitest run --project demo test/demo/scenes/spring-derby-truth.test.ts` | `No test files found` (the banked born-RED form) |
| G-KFW11-3 byte | `grep -c 'class="spring-rail stage-field-x focus-ring' demo/scenes/spring/SpringTarget.vue` | **1** · **1** |
| §0u ratchet, this unit's rows | `npx vue-tsc --noEmit -p tsconfig.json \| grep 'error TS' \| grep 'demo/scenes/spring'` | **1** — `useSpringDemo.ts(1,29) TS6133 'onScopeDispose'` |
| §Seq 6 — `.a`'s carve inherited landed | `grep -rc 'variant:' demo \| grep -v ':0'` | **nothing** (4 → 0 at `.a`'s `dc3f0900`) |
| mount witness probe | a scratch import of `SpringTarget.vue` under `--project demo` | `Cannot find package '@mkbabb/keyframes.js' imported from node_modules/@mkbabb/glass-ui/dist/useSpring-9u2_shxV.js` |

## 2 · Re-anchor of the six prose coordinates (B.1 row 6's law, at true bytes)

The banked anchors bind to `81a56990`. ⟨cmd⟩ `git show 81a56990:demo/scenes/spring/SpringTarget.vue | wc -l` → **470**;
the file at this unit's open is **476**. Each coordinate was re-resolved at both refs before any cure:

| banked | content, verified | at `ba12b2ba` | drift |
|---|---|---|---|
| `SpringTarget.vue:126-130` | the on-stage `<p>` — *"Tap or drag the rail — the ball springs to the new target"* | `:126-130` | **0** |
| `SpringTarget.vue:75-79` | *"the rail's right edge = the spring's target"* | `:75-79` | **0** |
| `SpringTarget.vue:179-180` | the orphaned *"clamp the \*marker\* position"* comment | `:179-180` | **0** |
| `SpringTarget.vue:91-93` | the live-ball painter comment | `:91-93` | **0** |
| `SpringTarget.vue:402-403` | *"Absolutely overlaid on the rail region; fades in/out."* | **`:411`** | **+8** — RE-ANCHORED |
| `useSpringDerby.ts:100-101` | *"drain back to the calm red resting state"* | `:100-101` | **0** |
| `SpringScene.vue:192-193` | *"(or taps the rail — `reseat` re-arms the loop directly)"* | **`:250`** | **+57** — RE-ANCHORED |

§B.1 row 6's own subject (the clamp sites) re-resolved at open: `SpringTarget.vue:210`
(`clamp(live.sampled, 0, 1)`) · `:222` (`clamp(trackValues[i] ?? 0, 0, 1.18)`) — **the spec's frontier
figures reproduce exactly**. Both are now the single `railPct` map.

## 3 · D-19 geometry re-derivation (OP-3), before any geometry cure

Measured at `ba12b2ba`, pasted into `SpringTarget.vue` beside the cure:

- 375w: viewport 375 − `SpringScene`'s own `px-6` (48) = **327** Card border box; Card content box
  = 327 − its own `px-6` (48) = **279** (ruling 14's frame, reproduced).
- the ball is 36 px, `left: 0; margin-left: -18px`, painted `translateX(v·100cqw)` → at value `v`
  its box is `[279v − 18, 279v + 18]`; `overflow-hidden` clips at the Card's **padding** edge,
  279 + 24 = **303**.
- `v = 1` → `[261, 297]` — fits. `v = 1.18` → `[311.2, 347.2]` — **44.2 px off the plate**.
- at the `lg` measure (`max-w-3xl` = 768): `v = 1.18` → box right 924 vs padding edge 800 —
  **124 px off the plate**.

**Conclusion that decided the cure**: the failure scales with width, so **no fixed-px reserve can
hold a fractional overshoot**. The axis must carry it → the remap, with the allowance stated once.

Derived figures, asserted in the gate: `railPct(0)` = **13.2353 %** · `railPct(1)` = **86.7647 %** ·
`railPct(1.18)` = **100 %** · `railPct(1.205)` ≡ `railPct(1.18)` (the engine's worst documented peak
is held AT the stated allowance, not truncated at 1 and not painted off-plate).

## 4 · LAW A censuses (§B.3(2)), each run before its delete

| symbol | ⟨cmd⟩ | reading | comment dies with it? |
|---|---|---|---|
| `derbyRunning` | `grep -rn derbyRunning demo test` | **4 lines**, all `useSpringDerby.ts` (declaration · guard read · set · clear); zero consumers elsewhere | no comment documented it |
| `samplerCss` | `grep -rn samplerCss demo test` (minus `useSpringDemo.ts`) | **0** | YES — its paragraph is replaced by the census note |
| `repaintSprings` (export) | `grep -rn repaintSprings demo test` (minus the two owning files) | **0** | no |
| `demo.scenePlayback` | `grep -rn 'demo.scenePlayback' demo test` | **0** | YES — the duplicate-publication note replaces it |
| `demo.progress` in the spring scene | `grep -rn 'demo.progress' demo/scenes/spring` | **0** (one comment only) | no |
| `spring-lane-<name>` class | `grep -rn 'spring-lane-' demo` | the four **token** names + comments; **zero selector matches** | YES |
| `derby-fade-in` | `grep -rn derby-fade-in demo` | the declaration + its single `.derby-lanes` reference, both in this file | YES |
| `.spring-rail`/`.sampler-track` flex (m-7) | every child enumerated: `.progress-rail` · `.progress-ball` · `.spring-target-marker` · `.spring-track` · `.derby-lanes` — **all absolutely positioned, both axes resolved** | inert | YES |

**The M-4→M-3 census was NOT run**, because the delete it governs was not authorized at this
unit's bounds — see §6.

## 5 · The commit roster, audited to §Bounds

| # | sha | meaning | files (`git show --stat`) |
|---|---|---|---|
| 1 | `8dcf5882` | C-1 contract head (+ D-3 flag pass · KF-SS-8 scene half · KF-SS-33 · KF-SS-2 declared · the §0u row) | `useSpringDemo.ts` · `SpringScene.vue` |
| 2 | `0c8e4096` | honest instrument M-2 + D-2 + D-7/C-8 (+ C-5/N-8 · KF-SS-5/D-4 · N-2 tracking · m-6 · m-7 · m-10 · N-7 · the prose) | `SpringTarget.vue` |
| 3 | `14bf3a32` | M-5 (+ the derby settle's chase re-arm) | `useSpringDerby.ts` · `useSpringDemo.ts` |
| 4 | `db588faa` | N-1 (+ the two false fade cells) | `SpringTarget.vue` |
| 5 | `cf5fb201` | the gesture spec D-5 · m-11 · i-18 · N-3 (+ KF-SS-30) | `SpringTarget.vue` |
| 6 | `a683198b` | the a11y one-edit family D-6 · D-14 · N-4 (+ KF-SS-32 · §B.1 row 5's second host) | `SpringTarget.vue` |
| 7 | `c41a9a74` | D-9 · C-7 · N-2 · D-11 · D-13 · i-15 · i-16 · N-5 | `SpringTarget.vue` · `useSpringLinearStops.ts` |
| 8 | `48a1cdbe` | KF-SS-3/N-6 recompile seam + the scene sweep (KF-SS-19 · -23 · -27 · -29 · -34) | `useCompiledEntry.ts` · `SpringScene.vue` |
| 9 | `cc8ef498` | `test(… G-KFW11-3)` | `test/demo/scenes/spring-derby-truth.test.ts` |

**Bounds audit: every path in all nine commits is a `.c` row of §Bounds `:115-116` or the
`test/demo/scenes/spring-derby-truth.test.ts` create row (`:130`). Zero writes outside the set; zero
`src/**` bytes; `useSpringKeyframesEditor.ts` read as a witness and never written; zero sibling paths
swept in (every commit carried its own pathspec on the commit itself).**

## 6 · ESCALATION KF11-E(c1) — M-4→M-3's bytes are not this unit's

**The conflict, at the spec's own bytes.** §Commit plan 4 (`:379`) gives `.c` the commit
*"M-4→M-3 trace onto .fn — parser, guards, regex die together"*, and §Carry P3 (`:183`) lists
**M-4→M-3** among the Target's rows. But the cure's bytes are the ~40-line regex reparse at
`SpringTrace.vue:50-86` — and §Bounds `:118` assigns `demo/scenes/spring/SpringTrace.vue` to unit
**`.e`**, `:115-116` do not list it, §Disjointness (`:151`) enumerates exactly **three** serially
shared paths and this is not one of them, and the orchestrator's dispatch card for `.c` does not
carry it.

**What this seat did.** It did not write the file. The standing law is explicit — *"any write
outside it is an ESCALATION — stop and return it"* — and the registry's own routing is equally
explicit that the swap is one edit: *"the swap deletes M-3 and both dead guards"* in `SpringTrace.vue`.
Landing half of it (changing what `SpringTarget` passes down, leaving the parser to receive it)
would have shipped a broken prop surface; manufacturing a numeric export in `useSpringLinearStops.ts`
against a consumer that does not exist yet would have been dead code written on speculation.

**Consequences, stated plainly.**
- G-KFW11-3's case **(b)** (*the trace's first/last plotted x = 0/100*) is **not written and not
  skipped**. The reason is recorded in the test file's own header, at the case's place.
- §Sequencing 2 (*"`.e` after `.c`'s M-3 commit"*) has **no M-3 sha to name**. `.e`'s open point is
  this unit's terminal sha **`cc8ef498`**; the packet's prop surface at that sha is **unchanged**
  (`<SpringTrace :response :damping-fraction>`), so `.e` opens on exactly the surface it banked.
- The row is **carried, not killed**. M-3/M-4's mechanism is untouched and fully described at its
  home record.

**The ask, one of two.** Either (i) widen `.c`'s writable set by the single file `SpringTrace.vue`
for the M-3 carve, serial before `.e`, and re-dispatch this unit for that one family; or (ii) re-home
the M-4→M-3 commit to `.e`, whose §Bounds row already owns the file, and strike §Sequencing 2's
dependency — `.e`'s own core (D-1 + N-1 + N-2 + C-2/L-3) is the same file and the same family.
**(ii) is the smaller act and the one this seat recommends**, because the identity note at §Carry P4
(`:189`) already says `.e` *"consumes the new prop surface"* — and under (ii) there is no new prop
surface to consume, only one file with one owner.

## 7 · Rows named to other units (not reached across)

| row | byte | named to |
|---|---|---|
| **KF-SS-8**'s ribbon half (the transport's `:max` / time-space contract) | `PlaybackRibbon.vue` and the transport's own surfaces | **KF.W13** (C-2; OP-6's declared seam) |
| **KF-SS-3**'s API satellite (C-m6: `springTimingFunction` cannot yield `.fn` without paying for eager `.css`) | `src/**` | **KF.W5** — RECORDED, no `src` byte written |
| **N-2**'s third site (ζ U+03B6 rendered as Ζ U+0396 by `text-mono-caption`) | `SpringTrace.vue:12-13` | **`.e`** |
| **D-10** (the label rows' `mb-2` vs `mb-1`; the plot's `overflow: visible` argues for MORE clearance, so the edit is the PLOT's) | `SpringTrace.vue:14` | **`.e`** |
| **KF-SS-2**'s routing (the machine's `applyEffects` has **no `RESET` arm** — PLAY/PAUSE/RESUME/SCENE_READY only — so the dock's Reset, `R` and `Escape` drive no adapter) | `demo/state/useSceneMachine.ts` | **the owning wave / SS-6 relay** — declared in the `reset` docblock, never shimmed |
| **KF-SS-22** (two reverse authorities over one markRaw flag; the second ref is the ribbon's) | `PlaybackRibbon.vue` | **KF.W13** |
| **KF-SS-4 · -24 · -25 · -28 · -37** | `StartingStyleTarget.vue` (`.g`) · `SpringPhysicsFacet.vue` / `SpringHeatmap.vue` (`.f`) | **`.g`** / **`.f`** |
| **m-12** (extract `SpringDerbyLanes.vue`) | a NEW file in `demo/scenes/spring/` | **CARRIED** — the writable set is enumerated by filename and does not admit a create here |
| **KF-SS-41** (C-i2: the scrub handler narrows the emit payload to `{ t }`) | `SpringScene.vue` | **RECORDED INFO** — harmless until a second ribbon binds; the discriminating shape is `AnimationControlsGroup`'s and the row is its family's |
| the **`vitest.config.ts` glass-ui alias** (repeating `.b`'s and `.d`'s ask) | a §Bounds *Do NOT touch* row | **whichever unit owns it** — every scene-level mount witness in this wave is blocked on it |

## 8 · Close measurements (double-run)

| gate / clause | command | reading |
|---|---|---|
| **G-KFW11-3** runtime | `npx vitest run --project demo test/demo/scenes/spring-derby-truth.test.ts` | **9 passed (9)** · **9 passed (9)** |
| G-KFW11-3 byte (recorded) | `grep -c 'class="spring-rail stage-field-x focus-ring' …/SpringTarget.vue` | **0** · **0** (was 1 · 1 — see the disposition below) |
| §0u ratchet, this unit's rows | `npx vue-tsc … \| grep -c 'demo/scenes/spring'` | **0** · **0** (was **1**) |
| demo suite | `npm run test:demo \| tail` | **44 files / 364 tests passed** · **44 / 364 passed** |
| test-config leg | `npx tsc --noEmit -p tsconfig.test.json \| grep 'error TS'` | **0** rows in this unit's files |
| eslint | `npx eslint demo/scenes/spring test/demo/scenes/spring-derby-truth.test.ts` | clean, exit 0 |
| whitespace | `git diff --check` | clean |
| `.a`'s carve, still 0 | `grep -rc 'variant:' demo \| grep -v ':0'` | nothing · nothing |
| self-trip (G-10's forbidden string) | this file and the receipt never spell it | — |

**G-KFW11-3's byte clause, disposition stated (the spec asks for exactly this).** The clause is
*recorded, not acceptance*. It reads **0** because the a11y family replaced the bare `focus-ring`
with `kf-focus-ring` (§B.1 row 5's second and last host — `.b` cured `SquareScene.vue:46`, this cured
`SpringTarget.vue:63`, and ⟨cmd⟩ the bare-class census over `demo` now returns **zero applications**,
one comment in `.b`'s own file aside) **and** because `stage-field-x` moved off the rail onto the
inset value track, where its quarter gridlines mark true value quarters. Both moves are cures the
packet owns; neither weakens anything the clause was watching.

## 9 · Born-RED basis, per case

The gate's banked RED form is *"No test files found"*, reproduced at open (§1) and at the wave
record's own baseline. Per case, the pre-cure byte each assertion contradicts:

- **(a)** `useSpringDemo.ts` at `ba12b2ba`, `frame()` line 1: `if (machine.status.value !== "playing") { … return false; }` — ahead of `liveSpring.tickDt`. A paused machine could not tick the solver, so *"the protagonist travelled while the machine stayed paused"* was unreachable.
- **(c)** `useSpringDerby.ts` at `ba12b2ba`: `derbyRunning` cleared at `launchSpan + 900` = 4·110 + 900 = **1340 ms**, so at t = 1500 ms `if (derbyRunning) return` did **not** fire; the second `derby()` then ran `derbyTimers.length = 0` and pushed **6** new handles, i.e. `vi.getTimerCount()` **1 → 7**. The gate asserts it is unchanged.
- **(d)** `useSpringDemo.ts` at `ba12b2ba`: the derby's settle callback was `() => reseat(0)`, so `target.value` after a derby was **0** regardless of the pose; the gate asserts 0.4 survives. And `SpringTarget.vue` at `ba12b2ba` carried `class="spring-target-line settle-pulse"` with `@keyframes spring-settle-pulse` animating `border-right-color`; the gate asserts the pulse is on the marker and the keyframes animate `border-color`.
- **axis** — `translateX(${live.value * 100}cqw)` was unclamped at `:207`, so *"every `.style.transform` write goes through one map"* was false by inspection.

## 10 · E13 mail sweep at this seat's clock

Four paths swept read-only, Status read by CELL POSITION (never a bare `grep -i unread`),
`INBOX.md` self-excluded:

1. `docs/tranches/V/coordination/` — newest = the 2026-09-18 `*-inbox-2026-09-18-value-4.1-*` letters, ours and rowed.
2. `../glass-ui/docs/tranches/BK/coordination/` — newest = `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**.
3. `../keyframes.js/docs/tranches/V/coordination/` — newest inbound-grammar file = `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21, ours, delivered**.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — newest = `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12, ours**; path UNMOVED.

⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **79** rows · ⟨cmd⟩ the positional Status-cell
scan for UNREAD → **0**. **ZERO unrowed letters addressed to value.js; ZERO UNREAD in scope.**

## 11 · Defect caused by this seat, disclosed (RESIDUAL c-R1)

While amending **my own** commit's message (one word had been eaten by shell backtick substitution),
HEAD had moved: sibling unit `.h` had landed `c0d81c7d` between my two calls, and
`git commit --amend` rewrote **that** commit's message with mine.

**Detected immediately and repaired in the same minute**: `.h`'s original message was recovered from
`c0d81c7d` and re-amended back. ⟨cmd⟩ `git rev-parse c0d81c7d^{tree}` and `git rev-parse 73b424da^{tree}`
→ **`5d87991ef3ac2ed18f8d7d2f7be3cf67d2deffbc` both** — `.h`'s tree, message, author and content are
**byte-identical**; nothing of `.h`'s work was altered or lost.

**The residual is the SHA ONLY**: `.h`'s commit is now **`73b424da`**, not `c0d81c7d`. If `.h`'s
receipt prints `c0d81c7d`, that is the same commit content at a superseded id (the old object is
still resolvable from the reflog but is no longer on `master`). **`.j` should read `.h`'s roster
against `73b424da`.**

**Rule taken, and it should be a wave rule**: in a four-track shared index, `git commit --amend` is
never safe — HEAD is not yours between two calls. This seat used `--amend` twice and will not again;
every later commit here was written with `-F <file>` so no shell substitution could eat a word in
the first place. My own commit `0c8e4096` therefore keeps its one eaten word (`leaves  for
translateX`) rather than risking a third amend; the content is unaffected.

---

*Written by the unit that ran the commands. Every figure above is read from the settled bytes and
double-run where the gate asks for it.*
