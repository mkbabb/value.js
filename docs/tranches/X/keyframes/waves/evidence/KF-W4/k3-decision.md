SERVED MODEL: claude-opus-5[1m]

# k3-decision.md — R-9's measured basis, recorded BEFORE the field was opened

**Unit**: X.KF.W4.`.c` · **Ruling**: KF-W4.md **R-9** (L155) · **§Bounds row**: L69
(`src/animation/engine/css/animation.ts` — the `_boundTimeline` wire-or-delete DECISION).
**Substrate**: `/Users/mkbabb/Programming/keyframes.js`, branch `master`,
⟨`git rev-parse --short=8 origin/master`⟩ → `55e9bf0d`; local HEAD at open `fb509edd`
(`.b`'s commit 2, parent `5388907b` = `.a`'s commit 1). **Date**: 2026-09-17.

R-9 is **total**: *"if it has a named consumer at `origin/master`, wire the guard; else delete the
field **and its prose together** in one commit."* The two commands below were re-run at this seat's
own clock, double-run, **before a byte of `animation.ts` was written**.

## The symbol census — re-run at open, both runs byte-identical

⟨`git grep -n '_boundTimeline' -- src/ demo/ test/ scripts/`⟩ → RUN1 == RUN2:

```
src/animation/engine/css/animation.ts:5: * (S.B2 — C-1). Its fields (`propertyRegistry`, `scrollOptions`, `_boundTimeline`)
src/animation/engine/css/animation.ts:54:    private _boundTimeline?: Timeline;
src/animation/engine/css/animation.ts:82:        this._boundTimeline = timeline;
```

**Three hits, one file.** ⟨`git grep -c '_boundTimeline' -- .`⟩ → `src/animation/engine/css/animation.ts:3`
plus three `docs/tranches/**` dated records (Q.WD1.md 4 · R/audit/lib-engine.md 1 ·
S/audit/pass1/audit32/a17-zone-engine.md 1), which are **immutable history and not consumers**
(§Bounds *"Do NOT touch … anything under `docs/tranches/**`"*).

**Delta against §Bounds' round-3 census: NONE.** The spec's three hits, at `:5`, `:54`, `:82`,
reproduce at their stated coordinates, and the specifier census is vacuous for the same stated
reason (the field is `private`, so there is no specifier to census).

## Every hit resolved — the reading R-9's rule turns on

| hit | text | kind | a READ? |
|---|---|---|---|
| `:5` | class docblock, *"Its fields (`propertyRegistry`, `scrollOptions`, `_boundTimeline`)"* | **prose** | no |
| `:54` | `private _boundTimeline?: Timeline;` | **declaration** | no |
| `:82` | `this._boundTimeline = timeline;` (inside `bindTimeline`) | **write** | no |

**Zero reads.** R-9's own definition governs — *"an assignment is not a named consumer"* — so the
write at `:82` decides nothing on its own.

**Consumer set = ∅ ⇒ R-9 selects the ELSE-BRANCH: delete the field and its prose together, in one
commit.** This is recorded here before the field is opened, as §Artefacts requires.

## A second measured finding, recorded not smoothed (the else-branch's own justification)

The field's declaration docblock at `:48-53` states the field's purpose in the source's own voice:

⟨`sed -n '48,54p' src/animation/engine/css/animation.ts`⟩ →

```
     * Q.WD1-bind S2 (DM-22) — the timeline a scroll-range named selector resolves
     * its phase against. Stored by {@link bindTimeline} for the no-timeline guard's
     * check; `undefined` until a timeline is bound. A scroll-context operation
     * specific to CSS keyframes with named selectors (the base `Animation` class is
     * value.js-/scroll-agnostic), so the field + method live here.
     */
    private _boundTimeline?: Timeline;
```

*"Stored … for the no-timeline guard's check"* is **false at the bytes**. The no-timeline guard is
`src/animation/engine/interpolate.ts:92` (⟨`git grep -n 'bindTimeline(timeline) before play' -- src/`⟩
→ `interpolate.ts:92`), and ⟨`git grep -c '_boundTimeline' -- src/animation/engine/interpolate.ts`⟩
returns **nothing — zero hits**. The guard the docblock names as the field's sole consumer **does not
read the field**; it decides on the frames' own resolved/unresolved state.

So the else-branch is not merely permitted by the arithmetic — the field is a **phantom authority of
exactly the class this wave exists to extinguish** (a comment asserting a consumer that does not
exist), which is why *"its prose"* in R-9's sentence is read at its true width: the `:5` field-list
mention **and** the `:48-53` declaration docblock die with `:54` and `:82`, in one commit.

## Bound

The whole resolution is inside `src/animation/**` — **no triumvirate trigger** (§Bounds L69's own
closing sentence). `bindTimeline` the **method** keeps every one of its consumers
(⟨`git grep -c 'bindTimeline' -- test/engine/nan-frame.test.ts`⟩ → **11** lines in that one spec
alone, counting rule: one unit = one output line of that command, i.e. one matching line); only the never-read
private field and the prose that describes it are removed. The method's `return this` and its
named-selector walk are untouched, so no behaviour changes.
