SERVED MODEL: claude-opus-5[1m]

# K1 / R-2 — the reverse-map RETIREMENT is not executable inside `.c`'s §Bounds

**Dated addendum-beside (E-3). No byte of `KF-W4.md`, the registry or any conformance
artefact is edited by this file.**

**Unit** X.KF.W4.`.c` · **Ruling** R-2 (`KF-W4.md` L127) · **§Bounds row** L65
(`src/animation/compile/emit/easing-serialize.ts`, the `:71-73` reverse-map) ·
**Gate** G-KFW4-5 · **Trigger** §Sequencing L276, *"any write outside §Bounds"*.
**Substrate** `/Users/mkbabb/Programming/keyframes.js`, branch `master`,
⟨`git rev-parse --short=8 origin/master`⟩ → `55e9bf0d`; `@mkbabb/value.js` **4.0.0**.
**Date** 2026-09-17.

## What R-2 orders, quoted

> *"`easing-serialize.ts:71-73`'s reverse-map is **RETIRED, not proven injective** … The name
> travels **with** the serialized easing record; identity is never re-derived from function
> identity."*

and §Bounds L65's own operative finding:

> *"**R-2's shape is therefore a REPLACEMENT, never a removal** … Retiring the `.find`
> **without** the name-carrying record reds five test files and silently converts nine
> registry names into throws."*

So the act has two halves. **Half one — putting the name on the record — is the one that is
not writable by any unit of this wave**, and half two cannot be spent without it.

## The measured reason: where the name would have to be put

`serializeEasing(easing: Easing)` reads its argument. The record is
`Easing`, declared at `src/animation/constants/types.ts:57-62`:

⟨`git grep -n -A 5 'export interface Easing' -- src/animation/constants/types.ts`⟩ →

```
57:export interface Easing {
58:    /** The callable curve — the hot-path interpolation function. */
59:    fn: TimingFunction;
60:    /** CSS easing string that faithfully reproduces `fn`, when one exists. */
61:    css?: string;
62:}
```

Two fields. There is no name on the record and no index signature, so under `strict` +
`exactOptionalPropertyTypes` a `name` cannot be attached anywhere without amending this
declaration. **Every site that would have to be written, measured, with its bound:**

| # | file · site | what it would have to do | in `.c`'s writable set? |
|---|---|---|---|
| 1 | `src/animation/constants/types.ts` **`:57-62`** | `Easing` gains the name field | **NO.** The file is **`.e`'s** row (§Bounds L72) and **`.e`'s carve is `:25` · `:27` · `:195`** — `:57-62` is in **no unit's** carve in this wave |
| 2 | `src/animation/compile/easing/option.ts` **`:27` · `:30` · `:65`** | `resolveEasingOption` — the heavy-surface input resolver — would carry the name it was handed | **NO.** In no KF.W4 unit's writable set |
| 3 | `src/animation/easing.ts` **`:27` · `:95-98`** | `toEasing` / `resolveEasing(name)` — the light-boundary constructors | **NO.** `.e` holds this file for **`:44` prose only** |
| 4 | `src/animation/constants/defaults.ts` **`:85`** | the library's DEFAULT easing record | **NO.** In no KF.W4 unit's writable set |
| 5 | `src/animation/resolve/spring-css.ts` **`:81`** | `resolveSpringTiming` | **NO.** In no KF.W4 unit's writable set |
| 6 | `src/animation/engine/css/animation.ts` **`:225`** at `origin/master` (`:222` after this unit's commit `3c8a5525` shortened the file — a drift this unit authored, recorded not smoothed) | the `fromString` per-stop path, `easing = css ? { fn: resolvedFn, css } : { fn: resolvedFn }` | file is `.c`'s, but the row's carve (L69) is **the `_boundTimeline` site**, not this line |

## The decisive one, measured rather than argued — `defaults.ts:85`

⟨`sed -n '85p' src/animation/constants/defaults.ts`⟩ → `    timingFunction: { fn: easeInOutCubic },`
⟨`git grep -n 'easeInOutCubic' -- src/animation/constants/defaults.ts`⟩ → `:13 import { easeInOutCubic } from "@mkbabb/value.js/easing";`

That record carries **no `.css` and no name**. Probed live against the installed pin:

```
defaults.ts's easeInOutCubic named-export reference, found in the registry memo as: "ease-in-out-cubic"
```

**So the library's own default animation easing is serializable TODAY only because the
reverse-map resolves its reference back to a registry name.** Retire the `.find` while that
record cannot carry a name and **every default-easing serialization throws** — the exact
outcome §Bounds L65 forbids (*"silently converts nine registry names into throws"*), reached
through the one record no unit of this wave may write.

## What was therefore NOT done, and what was

- **NOT done**: no byte of `easing-serialize.ts` was written. The `.find` at `:71-73`
  stands. **No substitute was invented** — not a `Map`-keyed reverse index (that is the same
  act, memoised), not a name stamped onto the function object (that is the same act at a
  different address), not a second parameter threaded through the seventeen call sites (all
  seventeen are outside §Bounds). Each would have been the workaround the standing law
  forbids, and R-2's *"RETIRED, not proven injective"* rules out the injective-wrapper
  dodge by name.
- **DONE, and it is the half that was in bounds and was genuinely missing**: R-2's *"Memoise
  kf-side now … so every name hands out one stable reference forever"* was **half-landed at
  the frontier**. The map was built at module evaluation, but `resolveTimingFunction` tried
  `parseTimingFunction` FIRST, so the four registry names that are also CSS keywords —
  `ease`, `ease-in`, `ease-out`, `ease-in-out` — took the parse path and got a fresh
  `easing()` instance on every call, **outside the memo**. Measured consequence:
  `serializeEasing({ fn: resolveTimingFunction("ease") })` **THREW** *"a custom
  TimingFunction has no CSS animation-timing-function representation"* on the library's own
  registry keyword. Ordering the memo first is the whole cure (commit `ea126540`); it moves
  no curve (40 names × 33 grid samples, 0 deltas) and touches neither the roster nor the
  `:43` fence.

## LAW A census for the act that was NOT spent, re-derived at this seat

⟨`git grep -n '\bserializeEasing\b' origin/master -- src/ demo/ test/ scripts/ | wc -l`⟩ →
**49** lines, reproducing §Bounds L65's partition **to the digit**. The same command at this
unit's post-commit bytes returns **56**, and the delta of seven is **entirely this unit's
own and is accounted for rather than smoothed**: `test/compile/easing-identity.test.ts`
**6** lines (the fixture created at commit `ea126540`) + `registry.ts:156` **1** line (the
new comment naming the throw this unit measured). Counting rule: one unit = one output line
of the command. The consumer set that binds the act is unchanged:
**17 call sites + 2 published re-exports + 3 asserting specs**, none of which may change
behaviour. The four `test/compile/roundtrip-easing.test.ts` assertions the row names
(`:48` · `:68`/`:71`/`:102` · `:97` · `:127`) all re-run **GREEN** at this seat, and a fifth
fact the row does not state was measured here: **`:48`, `:97` and `:127` do not reach the
reverse-map at all** — their easings carry `.css` (`"linear"` / a `linear(` twin), so
`serializeEasing` returns at its first line. The reverse-map's only live duty is
**registry-membership detection** (throw vs densify), which is precisely the duty that
cannot be discharged without the name on the record.

## Gate consequence, stated plainly

**G-KFW4-5 is RED.** Its fixture is created and passes 45/45, its memoise arm is landed and
proved, the nine collisions are proved value-identical twins on the 33-point grid per
§0j.C **KF-SS3** — and its falsifier clause *"fails if the reverse-map survives"* is
**unreachable inside `.c`'s §Bounds**. This is the born-RED-with-unreachable-GREEN class the
§Gates head convicts, arriving from the bounds rather than from the spec, and it is routed,
not smoothed.

**Honest dispositions available to the triumvirate, named and not chosen here:**
(i) widen `.c`'s (or a successor seat's) writable set to the five files above and spend the
replacement as one commit; (ii) route the retirement whole to a later kf wave that already
holds `constants/types.ts` and the two construction seams; (iii) book G-KFW4-5
GREEN-EXCEPT-R-2 with the reverse-map named as a declared residue — which the gate's own
falsifier forbids, and is recorded here only so the option is visible rather than assumed
away.
