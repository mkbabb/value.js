SERVED MODEL: claude-opus-5[1m]

# X.KF.W5.c — Arm B (LIBRARY RULINGS AND CURES) · the receipt sheet

**Unit**: `X.KF.W5.c` · Track B · X·KF · wave KF.W5 · arm B.
**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W5.md` — §0 R-3 · §Bounds *Arm B* · §Carry
*Arm B* · §Gates G-ROLE · G-REFUSE · G-REVERT · G-STAGGER-DOC · G-PRM-FLIP · G-DELAY · G-FROMSTRING ·
G-CSSIDENT · G-OPTSET · §Sequencing S-2 · S-3 · S-4. IMMUTABLE under E-3; every correction below is a
dated addendum-beside, never a patch to the spec.
**Rulings consumed, never re-opened**: COHESION §0j.C **KF-W5R4** (1)–(4), read to the file end
(§0j · §0k ×2 · §0l · §0m).
**Substrate**: keyframes.js `master`, this wave's HEAD `8bc83753` (arm 0's last commit) → `99834edc`.
**Every figure below is read from the settled bytes and double-run; both runs agree.**

---

## 0 · The shared-worktree fact this sheet is measured against

A concurrent **X.KF.W2** seat writes the SAME keyframes.js worktree and index throughout this unit's
window. It committed four times inside my commit range (`f7cbc41c`, `49cd647b`, `46f0b77b`,
`36b4615a`) and held `src/animation/compile/emit/format/format.ts`,
`.../emit/view-transition.ts`, `src/animation/ingest/cssom.ts` and the new
`src/animation/compile/parse-facade.ts` mid-edit at various points.

Consequences, stated so no figure here is read as this unit's when it is not:

- **Every commit carries its own pathspec ON THE COMMIT** (`git commit … -- <exact paths>`); no
  `git add -A`, no `-u`, no `commit -a`, nothing of a sibling's ever staged. Verified after each
  landing with `git show --stat`.
- **`npx tsc --noEmit -p tsconfig.lib.json` fluctuated 3 → 4 → 7 → 3** across the window as the
  sibling's modules went in and out of a consistent state. The floor that is *this unit's* is the
  banked **3** pre-existing `TS6133`s (`group/composite/compositor.ts:79`, `group/waapi.ts:9`,
  `physics/smooth.ts:194`), and it is where the tree finished.
- **`npx tsc --noEmit -p tsconfig.test.json` reads 28 at close against the record's banked floor of
  24.** ⟨`… | grep -cE '<my ten spec filenames>'`⟩ → **0** twice, and ⟨`… | grep '^src/'`⟩ names only
  the three pre-existing `TS6133`s — **no diagnostic names a file this unit wrote**. The +4 arrived
  with the sibling's mid-edit `format.ts`/`view-transition.ts` and is theirs to settle.
- **`proof:structure` finishes at ONE violation** — `ingest/cssom.ts` 530 L — the sibling's file.
  This unit's three (below) were cured before close.

---

## 1 · S-2 · RULE-BEFORE-FIX — the four rulings

Taken at COHESION §0j.C KF-W5R4 and **cited, never re-opened**. Landing order is the spec's:
`fromString` heads the queue, then `delay`, then the PRM inversion, then `singleTarget`.

| # | ruling | landed as | receipt |
|---|---|---|---|
| **(1)** | `fromString` **REPLACES** | **ESCALATED — no byte in bounds** | §4 below. The RED is measured and pinned by an executable gate; the cure's only site is outside this unit's writable set |
| **(2)** | `delay` is **PER-PLAY** | `1c481b09` — `engine/play-lifecycle/frame.ts` | one predicate (`delayPending`) decides BOTH the sleep and the start-time phase, read before `onStart` runs so the two cannot disagree |
| **(3)** | PRM default **INVERTED engine-wide** | `d002ce7e` — `group/group.ts` · `orchestration/sequence/sequence.ts` · `internal/reduced-motion.ts` · `orchestration/view-transition/view-transition.ts` | the two organs that defaulted `false` now match the third; the policy docblock stops calling `false` "the conservative default" |
| **(4)** | `singleTarget` gains a **SUPPORTED opt-out** | `0b593743` — `group/group.ts`, ONE commit serving four rows | assignment DECLARES; one private derivation shared by the ctor and the `setTargets` recompute, a no-op while a declaration stands; `deriveSingleTarget()` is the inverse |

**Ruling (3)'s bounded residual, declared:** "engine-wide" reaches every default this unit may write.
Four seeds of `respectReducedMotion: false` remain, ALL outside the writable set —
`src/animation/constants/defaults.ts:87` (the animation-level default, the primary one),
`physics/smooth.ts:43`, `physics/numeric.ts:89`, `physics/spring/types.ts:119`. Named with their
lines so the next seat does not re-derive the list. ⟨`git grep -n 'respectReducedMotion' -- src`⟩.

**Ruling (4)'s reading, recorded because a seat could take the other one:** KF-CB-15's ctor
mis-derivation (`undefined === undefined → true` over target-less children) is discharged **by the
opt-out being honoured**, exactly as the ruling says it is discharged "for free" — the `every()`
formula itself is NOT changed. Changing it would flip `test/group/group.test.ts:71-76` ("detects
singleTarget with no targets (both empty)" → `true`), a tracked spec **outside this unit's writable
set**, which would have turned a free discharge into an escalation.

---

## 2 · The cures, with their gates

| gate | command | BEFORE (measured against the un-cured bytes) | AFTER (double-run) | commit |
|---|---|---|---|---|
| **G-ROLE** | `npx vitest run --project library test/orchestration/split-text-implicit-role.test.ts` | **RED by absence**; the three split-text specs together → **11 failed \| 10 passed** against the un-cured file | **8 passed / 8 passed** | `2549c133` |
| **G-REFUSE** | `… test/orchestration/split-text-refuse.test.ts` | as above | **7 passed / 7 passed** | `2549c133` |
| **G-REVERT** | `… test/orchestration/split-text-revert.test.ts` | as above | **6 passed / 6 passed** | `2549c133` |
| **G-STAGGER-DOC leg 1** | `npx tsc --noEmit -p tsconfig.test.json` | the fixture ABSENT; the example did not typecheck | **0 diagnostics attributable to the fixture / 0**; spec itself **3 passed / 3 passed** | `c0727002` |
| **G-STAGGER-DOC leg 2 (P-8)** | `… test/group/group-viability.test.ts` | **RED by absence** — "no evidence in the tree either way" | **5 passed / 5 passed** (the answer is recorded, §3) | `c0727002` |
| **G-PRM-FLIP** | `… test/engine/prm-engagement.test.ts` | **2 failed \| 3 passed** against the un-cured pair — both failures `"wedged"` | **5 passed / 5 passed** | `685ca13f` |
| **G-DELAY** | `… test/engine/delay-semantics.test.ts` | **2 failed \| 3 passed** against un-cured `frame.ts` | **5 passed / 5 passed** | `1c481b09` + `f0f86ed8` |
| **G-FROMSTRING** | `… test/engine/fromstring-idempotence.test.ts` | 3 frames → **6** (same text) · 3 → **5** (different text) | **RED — 1 passed \| 2 expected fail**; ESCALATED, §4 | `e9b64342` |
| **G-CSSIDENT** | `… test/_root/public-surface.test.ts` | **5 failed \| 2 passed** against the un-published surface | **7 passed / 7 passed** | `2e0d91ae` |
| **G-OPTSET** | `… test/engine/option-setter-propagation.test.ts` | **9 failed \| 2 passed** against the un-cured trio | **11 passed / 11 passed** | `24bbeda2` |

**The ten created specs, by full filename** (the spec's own enumeration, all present):
`test/orchestration/split-text-implicit-role.test.ts` · `test/orchestration/split-text-refuse.test.ts` ·
`test/orchestration/split-text-revert.test.ts` · `test/orchestration/stagger-doc-example.test.ts` ·
`test/group/group-viability.test.ts` · `test/engine/prm-engagement.test.ts` ·
`test/engine/delay-semantics.test.ts` · `test/engine/fromstring-idempotence.test.ts` ·
`test/engine/option-setter-propagation.test.ts` · `test/_root/public-surface.test.ts`.
Line 1 of each is `// SERVED MODEL: claude-opus-5[1m]`. No tracked spec outside the writable set was
edited; no zone directory was claimed — ownership is by filename.

**Suite at close**: ⟨`npx vitest run --project library`⟩ → **110 files passed \| 5 skipped**,
**1211 passed \| 3 expected fail \| 14 skipped**. The 3 expected-fails = the repo's 1 pre-existing
(`test/group/group-snapshot-identity.test.ts`) + this unit's 2 born-RED `it.fails` rows (§4).
⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ → **✔ 0 violations, 160 modules, 702
dependencies** (from 159/687 at open: +1 module is the sibling's `parse-facade.ts`).
⟨`node scripts/gates/surface/index.mjs`⟩ (`proof:publish`) → **PASS**, 22 curated exports,
`llms.txt`/`llms-full.txt` byte-identical to a fresh generation.

---

## 3 · Two answers this unit MEASURED rather than asserted

**P-8 — is a multi-target, delayed, infinite `AnimationGroup` viable at all?** The wave said there was
"no evidence in the tree either way". There is now, and it is recorded in the spec itself:

- (a) a multi-target group derives `singleTarget === false`, and `isGroupWAAPIEligible` refuses it by
  name (`"group requires one shared target"`) — it stays on the rAF compositor;
- (b) **per-child `delay` IS honoured through the group's own advance**: one `group.advanceTo(1000)`
  gives three children `startTime` `1000` / `1120` / `1240` from a `stagger(3, { each: 120 })`;
- (c) `iterationCount: Infinity` children keep the group un-done and it reads their state rather than
  keeping its own;
- (d) a managed child's own `play()` throws — the group owns the loop.

So "N per-instance perpetual rAF callbacks for a 3-glyph ellipsis" is not the only shape available.
**The prescription is NOT taken here**: B-4's group-rewrite cure stays SEVERED, and the component-side
evaluation (evaluate, not mechanical swap) stays KF.W6's.

**The vacuity this unit caught in its own gate.** G-OPTSET leg 4's first fixtures asserted a
`custom-renderer` refusal over hand-authored `KeyframesAnimation`s — which compile to
`NOOP_TRANSFORM`, so `probeChildRefusal` refuses them `custom-renderer` UP FRONT for an unrelated
reason. Measured against the un-cured file, those three tests **passed**, i.e. they were a green gate
measuring nothing (the G-L7d class this very wave names). Re-cut onto CSS-ingested fixtures, they go
RED before the cure and GREEN after. Recorded because the discipline — run every new gate against the
un-cured bytes before trusting it — is what caught it.

---

## 4 · ESCALATIONS (two), each with its measured reason

### E-1 · `fromString` REPLACES (B-9 / G-FROMSTRING) — **the cure has no site in this unit's bounds**

- The RED reproduces exactly as banked: **3 template frames → a second `fromString` + `parse` → 6**,
  selectors duplicated; a second ingest of DIFFERENT text (2 stops) → **5**, the union of both texts.
- The sole `fromString` declaration is **`src/animation/engine/css/animation.ts:166`**
  ⟨`git grep -n 'fromString' -- src`⟩, and the cure is one act there: clear the template set before
  the ingest loop. **That file is NOT in `.c`'s writable set** (the wave record assigns it to `.d`).
- **No other seam exists**: the loop calls `this.addFrame(...)` directly; `addFrame` only pushes; and
  nothing `.c` owns sits between the two. A cure staged from `engine/animation.ts` would be half a
  cure, and writing "fromString replaces" into a docblock while it appends would manufacture exactly
  the false-comment class this wave repairs.
- **Disposition**: the ruling is pinned by an executable gate riding the repo's own documented
  born-RED idiom (`it.fails`, as `test/group/group-snapshot-identity.test.ts` uses it). Not a skip,
  not an allowlist: the assertions execute, they fail, and each FLIPS the day the cure lands.

### E-2 · the `setTargets` element contract (B-19 / KF-CB-30) — **the ripple leaves the bounds**

The spec's row carves all three declarations in ONE commit: `engine/animation.ts:465` ·
`group/group.ts:195` · `orchestration/sequence/sequence.ts:310` (all three verified at the true bytes
this seat). The parameter type cannot move alone: `setTargets` assigns `this.targets`, so the field
`engine/animation.ts:63` and the ctor parameter `:175` carry the contract with it.

**Measured, twice, at a clean tree** — widen the three declarations + the field + the ctor param to
`Element` and run `npx tsc --noEmit -p tsconfig.lib.json`: **9 new diagnostics across 5 files**
(beyond the 3 pre-existing `TS6133`s):

| file | diagnostics | in `.c`'s bounds? |
|---|---|---|
| `src/animation/engine/animation.ts` (156,37) | 1 | **yes** |
| `src/animation/group/waapi.ts` (53,30) | 1 | **yes** |
| `src/animation/engine/compile-bridge.ts` (27,32) · (106,72) | 2 | **no** — it is `.d`'s file |
| `src/animation/engine/interpolate.ts` (279,40) · (284,40) · (325,9) | 3 | **no** |
| `src/animation/resolve/element-resolve.ts` (144,72) · (191,38) | 2 | **no** |

**A finding rides this escalation**: `resolve/element-resolve.ts(191,38)` is
`Property 'style' does not exist on type 'Element'` — a GENUINE HTML-only member reach on the target
path, which **refutes** B-19's INFO rationale ("grep-verified HTML-only members → 0"). The row is not
merely out of bounds; it is larger than its severity says. Filed as a dated addendum-beside, not a
patch to the spec.

Per METHOD ("if the specified cure is impossible at the bytes, do NOT substitute"), **nothing was
written**: no cast, no partial widening, no `HTMLElement | SVGElement` substitute. The three
declarations stand unchanged.

---

## 5 · Residuals and errata, declared

1. **Two commit-message words eaten by the shell.** `24bbeda2`'s body renders
   *"Leg 3 (KF-TFP-27):  yields [] …"* and *"…'neither asserts nor can observe'.  is that
   observation…"*: backticked tokens inside a double-quoted `-m` were taken as command substitution by
   zsh (`(eval):1: command not found: frames` / `KeyframesAnimation.compiled`). The two missing words
   are **`frames`** and **`KeyframesAnimation.compiled`**. The commit is NOT amended — a shared index
   makes an amend a contamination risk — so the correction travels as this dated note (E-3), and every
   later commit in this unit avoids backticks in `-m` bodies.
2. **A docblock trim rode the wrong commit.** The `singleTarget` docblock was shortened by 5 lines to
   clear `proof:structure` R4 (the 500-line ceiling) AFTER `0b593743` had landed, and the trim was
   swept into `9e5aec60` (the doc-rot commit) rather than a commit of its own. Both are this unit's
   own bytes in this unit's own file; no other seat's work was touched.
3. **`proof:structure` regressions this unit CAUSED and cured before close**: `engine/animation.ts`
   507 L and `group/group.ts` 502 L (both over the 500-line ceiling, from this unit's docblocks) and
   `R6 WAAPIDelegationHooks has no consumer`. Cured by trimming prose to 497/498 L and by naming the
   hook type at its call site (`99834edc`) — never by editing the allowlist, and never by carving a
   module, which is `.e`'s act under S-6.
4. **`test/_root/public-surface.test.ts` needed `git add -f`**: `.gitignore:9` is the bare rule `_*`,
   which matches the tree's own `test/_root/` zone directory. The sibling tracked spec
   `test/_root/resolve-easing.test.ts` carries the identical exemption. `.gitignore` is not edited.
5. **B-16 is NOT a G-OPTSET leg** — OP-4 resolved demo-side (0 hits under `src`), so it is KF.W8's
   shadow-name row. Not armed here.
6. **`constants/types.ts`**: `:182` (the `Partial<…>` tautology, at `:234` today) taken; `:195`'s
   `| string` arm is KF.W4's and already landed at `0c52152a`. The split is honoured.
7. **Five `Partial<InputAnimationOptions>` sites keep the tautology**, all outside the writable set:
   `engine/css/animation.ts:47`, `engine/css/metadata.ts:59-60`, `ingest/cssom.ts` (×2),
   `svg/{draw,morph,motion-path}` option interfaces (which *extend* it).
8. **B-22 (KF-ET-1) riders — RELAYED, not re-booked.** This wave carries only the two riders, and they
   are carried verbatim here for the wave's mail seat: value.js needs **a lossless timing-function
   serializer twin for `parseTimingFunction`**, and **`easing()`'s analytic-first resolution order
   documented in the `.d.ts`**. Both cross-reference the V·π parser-proof round-trip concern. The row
   itself is NO-WAVE-OWNER and CURE-LOCKED by KF-ET-2; nothing was written for it here.
9. **B-5 / B-18 are records, not bytes.** B-5 (the S★-2 lift) is carried beside B-4 as the account of
   how B-4 was reached. B-18's magnitude is KF.W9's one `performance.measure`; the design question
   ("should a discontinuous timing function enter the densifier at all?") is untouched by this unit.
10. **Nothing pushed.** Under KF-WRITE the push of `origin HEAD` is the WAVE's close, not a unit's.
11. **E13**: the record's open-time four-path sweep stands; this unit minted no mail, consumed no
    routed letter, and leaves **0 UNREAD in its scope**.
