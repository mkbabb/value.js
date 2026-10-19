SERVED MODEL: claude-opus-5[1m]

# KF.W11.g — spring-artifact-truth · evidence

**Unit**: `KF.W11.g` (phase 2, after `.c`) · **Spec**: `docs/tranches/X/keyframes/waves/KF-W11.md`
§Agent Units `:255-259` · §Carry P6 `:195-197` · §Bounds row `:120` · §Gates G-KFW11-6 `:299` ·
§0 OP-5 `:44` · §Commit plan 5 `:380`. **Home record**: `registry/adjudicated/kf-StartingStyleTarget.md`
(39 rows; the NO-WAVE-OWNER terminal line at `:140`). **Open sha (keyframes.js)**: `c8e3c56a`.
**Commits**: `3252a7c2` · `c0b0ff19` · `0e604af8`.

This file holds the measurements, censuses and transcripts in full; the receipt in
`execution/B/KF-W11.md` §KF.W11.g states the acts and the verdicts.

---

## 1 · Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C ../keyframes.js status --porcelain` → two untracked
`docs/tranches/V/coordination/VALUEJS-INBOUND-*.md` letters, **zero modified product paths**.
⟨cmd⟩ `git -C . status --porcelain -- docs/tranches/X/execution/B/KF-W11.md docs/tranches/X/keyframes/evidence/W11`
→ **empty**. ⟨cmd⟩ `git -C ../keyframes.js log --oneline --all | grep -i 'W11.g'` → **no output**.

**Zero inherited hunks on any path in this unit's writable set** — nothing to finish, nothing to
rewrite, no inherited paths to name. Dirty rows outside the set (value.js's `CARRY-LEDGER.md`, the
gradient/demo tree, and `scripts/dev/dev.sh`) were read in `git status` and left untouched;
`scripts/dev/dev.sh` was never staged.

## 2 · Anchors re-resolved at true bytes (KF-AT-28 / D-19)

The home record binds to `81a56990` and describes a **216-line** file; at this unit's open it is
**297 L**. Four banked anchors are dead, and three rows measured **already cured by siblings**.

| banked | frontier truth at `c8e3c56a` | disposition |
|---|---|---|
| KF-SST-5 · `text-mono-caption` on the artifact `<code>` and the API caption | ⟨cmd⟩ `grep -n 'text-mono-caption\|text-mono-small' StartingStyleTarget.vue` → `:52` and `:120` both **`text-mono-small`** | **LANDED-BY a sibling** (the KF-SS-4 W6-N sweep, cited in the file's own comments). R.2 GREEN-BEFORE-CURE: not re-cured, and the gate now **asserts** it so it cannot regress |
| KF-SST-16 · the title's `truncate`; KF-SST-28 · the declined Card family | `CardHeader`/`CardTitle`/`CardAction` present at `:24-57`; no `truncate` | **LANDED-BY a sibling** (KF.W6). Kept, and the comment re-stated in two lines |
| KF-SST-19 · a digit-free mono UI label wearing `tabular-nums` | the two `text-mono-*` sites both carry real content (a code identifier; a digit pair) | **LANDED-BY a sibling**; no cure spent |
| KF-SST-20 · *"repointed red by Lane B"*; KF-SST-21 · `ToggleChip` ×1 / `SpringSidebar` ×3 | the stale colour clause is already corrected in place (KF-SS-6); the two phantom names are gone (KF-SS-31, and `.c`'s N-5 for the composable docstring) | **LANDED-BY siblings**; this unit's prose act is KF-SST-22's sweep, below |
| KF-SST-9's figures (2190 / 21 / 943) | re-executed at this seat against the shipped emitter — **identical** (§3) | HOLDS exactly |

## 3 · The emitter probe (the oracle this unit cures against)

⟨cmd⟩ `node` against `dist/keyframes.js` — `loadAnimationEngine()` → `compileToEntry({ ".discrete-card": { enter } }, { openSelector: ".is-open", display: "flex" })` with `ENTER_KEYFRAMES`
verbatim from `useCompiledEntry.ts:24-27` and `springTimingFunction({ response: 0.5, dampingFraction: 0.825 })`:

```
KEYS: [ 'css', 'eligible', 'refusals' ]
eligible: true refusals: []
chars: 2190 lines: 21 longest: 943
.discrete-card {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
  display: none;
  transition: opacity 500ms linear(<418 chars>), transform 500ms linear(<418 chars>), display 500ms allow-discrete, overlay 500ms allow-discrete;
}

.discrete-card.is-open {
  opacity: 1;
  transform: translateY(0px) scale(1);
  display: flex;
  transition: … (as above);
}

@starting-style {
  .discrete-card.is-open {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
}
```

**2190 / 21 / 943 reproduce the record's own execution exactly**, and `eligible: true, refusals: []`
reproduces its KF-SST-12 reading: the refusal path is **latent**, not reachable through this input —
which is precisely why the reachable refusal this unit lands is the panel's own (§5).

The five KF-SST-3 divergences, re-derived at these bytes against the card as it stood:

| # | the artifact said | the card did |
|---|---|---|
| 1 | base = CLOSED (`display: none`, opacity 0) | base = OPEN |
| 2 | `.is-open` opens | `.is-hidden` closes |
| 3 | `transform: translateY(20px) scale(0.9)` | independent `translate: 0 1.25rem` + `scale: 0.9` |
| 4 | `500ms`, one number | `var(--duration-slow, 500ms)` ×4 against a 450ms token |
| 5 | an `overlay … allow-discrete` line | absent |

## 4 · The spec, written before the patch

**One source of truth** = `ENTRY_CONTRACT`, exported from the SFC, with the card's CSS authored from
it and the gate asserting the emitter satisfies it. **Direction**: the CARD moves onto the
ARTIFACT's contract. The emitter's input (`ENTER_KEYFRAMES`) and its options live in
`useCompiledEntry.ts`, which §Bounds `:116` assigns to `.c`; the artifact is also what a consumer
actually receives, so it is the published truth and the card is what must match it.

**The price, named**: superlative 2 of the home record (`:105`) praises the card's independent
`translate`/`scale` — one timeline per property — as the more modern of the two models. Moving the
card onto `transform: translateY() scale()` retires it. The fork that would keep it is emitting
`translate`/`scale` from `ENTER_KEYFRAMES`, a `.c`-owned byte; it is stated in the SFC and here, and
the binding now runs **both ways** — flipping `ENTER_KEYFRAMES` fails G-KFW11-6 until the card
follows, which is the whole function of writing the endpoints down once.

**True duration** = the artifact's 500ms (KF-SST-26's *"one duration, three numbers"* dies with the
`--duration-slow` fallback triple). **Case register** = already landed; asserted. **Viewport** =
wrap, don't scroll sideways; named, focusable region. **State model** = `unavailable` /
`mismatched` / `ready`, one string rendered and copied, refusal reachable.

## 5 · KF-SST-11/-12 — the state model, and the honest limit

The banked defect, re-read at the bytes: `<code>{{ compiledEntryCss || springCss }}</code>` beside
`<CopyButton :text="compiledEntryCss || copyableCss" />` — **two different strings, one label
describing neither**, with pending / refused / ready all laundered through one `||`.

The cure renders exactly what it copies and **verifies the promise the panel makes**: `ready`
requires that the emitted CSS carry this card's open selector, both endpoint `transform`s and the
contract duration. Anything else is a refusal with a reason, and a refusal offers no copy control —
you cannot copy an artifact that does not exist or does not describe the thing beside it.

**The limit is stated at the byte that causes it, not papered over**: an EMPTY result is both *"still
compiling"* and *"the compile refused"*, because `compileToEntry` returns `{ css, eligible, refusals }`
and `useCompiledEntry` keeps only `css` (`:108` `css.value = out.css`). That discriminator is a
`useCompiledEntry.ts` byte — `.c`'s — so this surface says which two states it cannot tell apart
instead of pretending it can.

**LAW A census for the one deletion.** ⟨cmd⟩ `grep -rn 'copyableCss' demo test src` →
`StartingStyleTarget.vue:118` (the binding) · `:187` (the declaration). **Two lines, one file, zero
consumers elsewhere**; the comment that named it dies with it, and its replacement states what
happened. ⟨cmd⟩ after: `grep -rn 'const copyableCss' demo test src` → **none**.

## 6 · KF-SST-1/-6 — the verb decision, and the half that is returned

⟨cmd⟩ `grep -n 'toggleDiscrete\|Reveal' demo/scenes/spring/SpringScene.vue` → `:226`/`:230` — the
ribbon twin is live at this unit's open, so the duplication is real and un-cured.

**DECISION: the in-card copy survives.** Three grounds, in order of weight: (1) **the gate's own byte
clause** places the surviving state in `StartingStyleTarget.vue` (`grep -c 'aria-expanded\|aria-pressed'`
must read ≥ 1 *there*) — the spec's instrument decides the fork; (2) **reachability**: SS-13 residue
1 leaves the ribbon's sub-`lg` reachability unwitnessed (sheet-at-peek), and deleting the in-card
copy risks stranding the card's only control behind a sheet, while deleting the ribbon extra costs a
duplicate — the asymmetry favours the always-visible copy; (3) `aria-controls` belongs with the
region it controls.

**Returned, not silently dropped**: retiring the ribbon twin is a `SpringScene.vue` byte, outside
this unit's writable set (§Bounds `:115`, `.c`'s, and `.c` is closed). It is declared as a residual
for `.j` with the SS-13 dependency named.

**Why `aria-expanded`, not `aria-pressed`.** This control shows and hides a region — the APG
disclosure pattern — so `aria-pressed` would assert a toggle-button role the element does not have.
The record's gain from the cure was three vendor affordances, so they are bought a different way:
⟨cmd⟩ `grep -o '.\{240\}\[aria-pressed="true"\].\{160\}' node_modules/@mkbabb/glass-ui/dist/styles/accessibility.css`
→

```
@media (forced-colors: active) { :is( [aria-current]:not([aria-current="false"]),
[aria-selected="true"], [aria-pressed="true"], [aria-checked="true"],
[data-state="checked"], [data-state="on"] ) { border-color: Highlight !important;
border-style: solid !important; border-width: 2px !im…
```

`[data-state="on"]` is in the same selector list (and in the `prefers-contrast: more` twin at
`glass/material.css`), and it is the seam this file's own retired comment already named. So the
button carries `aria-expanded` + `aria-controls` for semantics and `data-state` for the producer's
indication — **no affordance forfeited, no role misstated**.

**Producer row surfaced (for `.j`'s SS-6 relay)**: glass `accessibility.css` keys its
forced-colors / `prefers-contrast` state indication on `[aria-pressed]`, `[aria-checked]` and
`[data-state]`, and on **nothing** for `[aria-expanded]` — a correctly-authored disclosure button
gets no vendor state indication at all. Consumers can only work around it (as this one does) or
misuse `aria-pressed`. One line at the producer fixes it for every consumer.

## 7 · KF-SST-2 — the response/duration decision, with the range caveat priced

The record's mechanism re-read: `springLinearStops` is self-similar under `response` (it enters only
the sampling window), max|Δv| ≈ **2.000e-5** across 0.2→1.0 versus **3.040e-1** for ζ; the card's
duration is the constant the artifact hard-codes. So `response` is inert here on **both** axes while
the readout printed it under *"eased by"* as if it were the easing parameter.

**DECISION: the duration stays pinned to the artifact's 500ms**, and the readout names what it
expresses — `ζ <value> · 500 ms`, with the inertness disclosed in the line itself rather than left
for a designer to discover by dragging a slider that does nothing. A card whose duration diverged
from the artifact it publishes would re-open KF-SST-3 the day it landed.

**The priced fork, stated and rejected**: `transition-duration: calc(response * 4s)` reaches **4.8 s**
at the slider's max, and to stay honest it would have to change `useCompiledEntry`'s `duration: 500`
too — a range decision on the artifact's producer, not a readout edit, and not this unit's byte.

**Register note**: the params line moved to `text-mono-small` because `text-mono-caption`'s
`text-transform: uppercase` renders `ζ` as `Ζ` — a different letter. The same class of corruption
KF-SST-5 books, found on the cure's own new bytes.

## 8 · KF-SST-31 — the row the lock splits, measured at both halves

The banked cure is *"gate on `view === 'discrete'` + the house throttle; one commit with KF-SST-12's
guard"*, and §Bounds `:120` forbids this unit the `useSpringDemo.ts` byte.

- **Throttle half — LANDED-BY `48a1cdbe`** (`.c`'s KF-SS-3/N-6 recompile seam): an 80 ms trailing
  debounce plus a generation token taken before the first await and checked after each, with scope
  disposal bumping the generation (`useCompiledEntry.ts:88-133`, read at this seat). The rider the
  record names — *"~110 concurrent unguarded promises share `css.value` with no generation token"* —
  dies with it.
- **View-gate half — NOT LANDED.** ⟨cmd⟩ `grep -n 'view.value' demo/scenes/spring/useSpringDemo.ts`
  → `:567` only, inside `advanceSelectedChannel` (KF-SS-8's scene half). The recompile watch fires
  in the solver view too, where this readout is not mounted. The byte is `useCompiledEntry.ts`'s or
  `useSpringDemo.ts`'s — both `.c`'s rows — and `.c` is closed, so the row is named
  **`complete_with_misses`** exactly as the lock prescribes. **No parallel write was made.**

## 9 · KF-SST-27 — the duplicated predicate, returned

The preset-identity predicate (`1e-6`, two params) is duplicated at `StartingStyleTarget.vue` and
`SpringPhysicsFacet.vue:165-167`; the record names `springPresets.ts` as the home. **Both the
destination (`.c`'s row, `:116`) and the second site (`.f`'s row, `:119`) are outside this unit's
writable set**, and hoisting from one side alone would leave the duplication standing while moving
the byte. Returned as a residual naming `.f` and the spring composables' owner; the local copy is
untouched so the hoist remains a single act for whoever owns both ends.

## 10 · KF-SST-22 — the prose sweep, measured twice

The row books *"~30 % of the file is rationale prose … the concrete cost of minting authority at the
call site"*. This seat's mechanical count (non-blank lines wholly inside `<!-- -->`, `/* */` or `//`):

| bytes | non-blank | prose | % |
|---|---|---|---|
| open (`c8e3c56a`) | 274 | 139 | **50.7** |
| after the cure commit `3252a7c2` | 401 | 205 | **51.1** |
| after the sweep `0e604af8` | 312 | 121 | **38.8** |

**WRITE-THEN-MEASURE caught this seat writing the row's own defect.** The cure commit's explanatory
comments raised the fraction; the sweep commit is the correction, and it is a separate sha precisely
so the record shows the measure-then-cure rather than hiding it in an amend. Every comment now
carries the invariant plus the one fact a maintainer needs, and the argument for each cure lives in
this file. `demo/DESIGN.md` — where §6's ownership rule would otherwise put the rationale — is not
in this unit's writable set and was not written.

Nothing load-bearing left with the prose: the `allow-discrete`-inside-the-shorthand ground,
KF-SST-25's corrected vendor chain, KF-SST-13's *"delete the dead block and say why"*, KF-SST-2's
priced fork and KF-SST-1/-6's decision all stay stated. The file went 297 → 340 L and the growth is
entirely code (the contract constant, the three-state model, the refusal surface).

## 11 · The hygiene tail, row by row

- **KF-SST-15** — the `min-h-0` on `.stage-viewport` could never beat the scoped, unlayered
  `min-height: 7rem`. The dead utility is gone and the floor is declared once.
- **KF-SST-17** — the card gains `outline: 1px solid color-mix(…)`, the file's own surviving idiom
  (the preset chip's): it survives forced colors where the box-shadow dies, and out of flow it
  perturbs no geometry.
- **KF-SST-18** — the bare `14 %` wash is annotated as the contrast floor it is (≈4.8:1 light /
  ≈4.7:1 dark, both banked arms concordant), not a decorative percentage.
- **KF-SST-23** — the chip's block padding `0.05rem` (0.8 px on a `--radius-pill` chip) → `0.125rem`.
- **KF-SST-24** — block padding added (`py-5`) and the inert `justify-center` deleted (it distributed
  nothing: the stage child is `flex-1`).
- **KF-SST-25** — the header comment no longer asserts `tier`/`surface` props the element does not
  pass; it cites the real chain (Card's `material` default → Surface's private material→tier map →
  the `data-tier="resting"` stamp) once, correctly.
- **KF-SST-26** — `--radius-lg` fallback 1rem → 0.5rem, `--radius-md` fallback 0.5rem → 0.375rem
  (6 px), and the duration triple collapses to the artifact's one number.
- **KF-SST-29** — `label="Copy the @starting-style artifact"`; the default
  (`"Copy to clipboard"`) never identified what it copied.
- **KF-SST-13** — the local PRM block is deleted with its reason in place: glass's unlayered
  `*:not([data-allow-motion]) { … !important }` beats any normal-weight local rule, the rendered
  outcome is already right (transform is absent from that allow-list, so it snaps), and the only
  lever that would let a local rule win — `data-allow-motion` — opts the element OUT of the house
  kill switch. PRM here is the producer's, deliberately.
- **KF-SST-33** — the second *"eased by"* becomes *"emitted by"*; `emphasis="secondary"` deleted
  (⟨cmd⟩ `grep -ohE 'emphasis[^,]{0,40}' node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js` →
  `emphasis: { default: "secondary" }` — a restated default).

## 12 · KF-SST-10 (OP-5) — witness-only, and why

⟨cmd⟩ `git -C ../keyframes.js log --oneline -40 | grep -i 'KF-ES-2\|EditorShell'` → **no output**.
KF-ES-2's facility-honesty spec has not landed at this unit's open, so OP-5's own instruction
applies: the row lands **witness-only** and says so. The witness is an assertion, not a comment —
`entryAnim.name === "Entry"` and `entryAnim.targets.length === 0`, so the channel the facility
contract says must paint is pinned as painting nothing. When KF-ES-2's cure lands, that case is what
proves it; nothing about it is cured here and no mechanism is re-booked.

## 13 · Gate transcripts

**G-KFW11-6, runtime.** ⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/starting-style-artifact.test.ts`

- BEFORE (`c8e3c56a`, ×2): `No test files found, exiting with code 1` · `No test files found, exiting with code 1`;
  ⟨cmd⟩ `ls test/demo/scenes/starting-style-artifact.test.ts` → `No such file or directory`.
- AFTER (settled bytes, ×2): `Tests  12 passed (12)` · `Tests  12 passed (12)`.

**G-KFW11-6, byte clause.** ⟨cmd⟩ `grep -c 'aria-expanded\|aria-pressed' demo/scenes/spring/StartingStyleTarget.vue`
→ BEFORE **0 · 0** (must read ≥ 1) → AFTER **3 · 3**, read at the SETTLED bytes `0e604af8` and
double-run: `:52` and `:55` (the decision comment) and **`:59` `:aria-expanded="visible"`, the
binding itself**. It read **5 · 5** at `3252a7c2`; KF-SST-22's prose sweep retired two comment
mentions and touched no attribute. **Both readings are published, neither silently elected** —
this seat's first figure was taken before the sweep commit settled the file, and the clause's
acceptance form (≥ 1) is met at every sha in this unit's range. GREEN.

**§0u ratchet.** ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **24 · 24**
before and **24 · 24** after; ⟨cmd⟩ `… | grep -c 'StartingStyleTarget'` → **0** before and **0**
after. The count did not rise and this unit's row is 0.

**The wave's neighbours, unmoved.** ⟨cmd⟩ `npm run test:demo` → `Test Files 45 passed (45)` ·
`Tests 376 passed (376)`.

**The §Format cadence.** ⟨cmd⟩ `npx eslint demo/scenes/spring/StartingStyleTarget.vue test/demo/scenes/starting-style-artifact.test.ts`
→ exit 0, no output. ⟨cmd⟩ `npx tsc --noEmit -p tsconfig.test.json 2>&1 | grep -c 'starting-style-artifact\|StartingStyleTarget'`
→ **0** (the leg's 23 pre-existing diagnostics are untouched). ⟨cmd⟩ `npm run proof:structure` →
`PASS: scope=src clean (0 violations across R1–R6)`. ⟨cmd⟩ `git diff --check` → clean on every
commit. `npm run check` as a whole stays RED at its first leg on the wave's banked 24 — the OP-0
ratchet's standing state, not this unit's.

**No masking.** ⟨cmd⟩ `git diff c8e3c56a..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('` →
**0**. No `@ts-expect-error`, no `as any`, no `eslint-disable`, no widened timeout, no `try/catch`
around a defect, no `node_modules` patch, no copied producer selector.

## 14 · The test's one declared compromise

`@mkbabb/glass-ui`'s dist imports `@mkbabb/keyframes.js` from inside `node_modules`, where vitest's
alias cannot reach, so any spec loading a glass entry dies at `Cannot find package
'@mkbabb/keyframes.js'` before an assertion runs. The durable cure is a runner change (inlining the
producer); `vitest.config.ts` is in §Bounds' **Do NOT touch** list and was **not** reached for. The
answer is `CSSPasteDialog.test.ts`'s existing idiom, stated plainly in the test file: glass's
primitives become slot-rendering stubs so the subject's own template, bindings, classes and
attributes all execute for real. **Nothing under test is mocked** — the card, its contract, its
state model, its refusal surface and its verb are the real component. What is not characterized is
glass's own rendering, which is glass-ui's to test.

The SFC is additionally read as **bytes** for two surfaces that admit no other reading: `<style
scoped>` is never applied in jsdom, and `tsc -p tsconfig.test.json` resolves `*.vue` through
`demo/env.d.ts`'s narrowed shim, which declares a default export only — so importing the SFC's named
export would have added a new leg-2 diagnostic (the shape
`aurora-opacity-ceiling.test.ts(61,30): error TS2339` already exhibits). Widening the shim is
another unit's byte. Reading the source is this suite's own idiom (`spring-derby-truth.test.ts`),
and it pins the constant's literal bytes as well as its value.

## 15 · Bounds

**Zero writes outside the writable set.** Two keyframes.js paths
(`demo/scenes/spring/StartingStyleTarget.vue`, `test/demo/scenes/starting-style-artifact.test.ts`)
and two value.js paths (this file, the wave record). No `src/**` byte · no `useSpringDemo.ts` · no
`useCompiledEntry.ts` · no `SpringScene.vue` · no `SpringPhysicsFacet.vue` · no `springPresets.ts` ·
no `demo/DESIGN.md` · no `vitest.config.ts` · no `package.json` · no `node_modules` · no glass-ui
byte · no sibling track's path · `scripts/dev/dev.sh` never staged · the LEDGER is `.j`'s and was
not touched. Every commit carried its own pathspec on the commit itself.

## 16 · E13 mail sweep at this seat's clock

⟨cmd⟩ `grep -n 'UNREAD' docs/tranches/V/coordination/INBOX.md` → hits at `:4`, `:5`, `:23`, `:33`
(the law's own text) and inside historical status quotations in rows I-30/I-31/I-32/I-35; **no row
carries a live `UNREAD` status**. ⟨cmd⟩
`grep -rln 'StartingStyle\|KF-SST' docs/tranches/V/coordination/ ../keyframes.js/docs/tranches/V/coordination/`
→ `INBOX.md` alone (a routing cell). **No mail addressed to this unit's scope; nothing owed, nothing
blocked.** The two untracked `VALUEJS-INBOUND-*` letters in the keyframes tree are the wave's
standing pre-existing rows and are not this unit's to move.
