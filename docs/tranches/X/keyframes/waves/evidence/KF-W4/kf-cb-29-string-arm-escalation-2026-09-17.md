SERVED MODEL: claude-opus-5[1m]

# KF-CB-29 — the `| string` arm: ESCALATED, with both candidate cures measured

**Unit** X.KF.W4.`e` · **Gate** G-KFW4-13 · **Date** 2026-09-17 · **Substrate** keyframes.js
`master` at `30ccd4dc` (`.c`'s last commit) before this unit's `92955f89`.
**E-3**: this is a dated addendum-beside. No spec byte, no dated record, no prior evidence file is
edited by it.

---

## 1. What the spec instructs, verbatim

§Bounds row (L72) · §Gates G-KFW4-13 (L239) · unit brief:

> Delete `types.ts:195`'s `| string` arm **AND** `:27`'s `| "steps"` — deleting `| string` alone is
> insufficient, and bare `steps` throws.

Two acts. **`:27` is landed** (commit `92955f89`), fully in-bounds, zero fallout outside this unit's
writable set. **`:195` is NOT landed.** This file is why.

## 2. The measurement the spec's own LAW A census did not take

The spec's LAW A census for this row (round 4, R4-10's access-column rule) censused the SYMBOL
`TimingFunctionNames`:

⟨`git grep -n 'TimingFunctionNames\|TimingFunctionName\b' origin/master -- src/ demo/ test/ scripts/`⟩
→ 12 hits / 6 files, and it concluded *"every demo consumer already widens the type back … so
deleting the `:195` `| string` arm surfaces those widenings as the diagnostics they are."*

**That census measured the wrong subject.** The act deletes an arm of
`InputAnimationOptions["timingFunction"]`, whose consumer set is every site that ASSIGNS a string to
that field — a set the `TimingFunctionNames` grep cannot see, because none of those sites mentions
the symbol. Re-measured at this seat by performing the deletion and reading the library typecheck:

⟨`npx tsc --noEmit -p tsconfig.lib.json`⟩ with `| string` deleted →
**14 new `error TS` lines the baseline does not carry**, in **two files, both OUTSIDE `.e`'s
§Bounds**:

| file | count | shape |
|---|---|---|
| `src/animation/presets/catalog.ts` | **13** | the SHIPPED preset catalogue's own CSS literals — `:59` `:73` `:81` `:178` `:194` `:202` `:228` `:236` `:244` `:252` `"cubic-bezier(…)"`, `:107` `"steps(40, jump-end)"`, `:185` `"steps(2, jump-start)"`, and `:320` the resulting `PresetSpec` argument |
| `src/animation/engine/css/metadata.ts` | **1** | `:63` `base.timingFunction = serializeTimingFunction(opt.timingFunction);` — `serializeTimingFunction` is declared `: string` at `src/animation/compile/emit/css-text.ts:30` |

Baseline for comparison, double-run: ⟨`npx tsc --noEmit -p tsconfig.lib.json | grep -c 'error TS'`⟩ →
**4** before and after the `:27`-only landing (the pre-existing `.c` residues + the four untracked
F-1 substrate files).

**These are not demo widenings.** They are the library's own published preset surface and its own
CSS-shorthand ingest path. The `| string` arm is over-broad — that is the defect KF-CB-29 names and
it is real — but the arm is also load-bearing for a KIND the union does not express: a CSS easing
LITERAL (`cubic-bezier(…)`, `steps(…)`, `linear(…)`, `step-start`, `step-end`), which
`resolveTimingFunction` resolves through its parser branch and which is NOT a registry name.

## 3. The second candidate cure, also measured

Replace the arm with a precise CSS-literal type declared in the same (in-bounds) module:

```ts
export type CssEasingLiteral =
    | `cubic-bezier(${string})`
    | `steps(${string})`
    | `linear(${string})`
    | "step-start"
    | "step-end";
```

Probed at this seat (applied, measured, reverted — `cp` to the scratchpad and back; no `git stash`):

⟨`npx tsc --noEmit -p tsconfig.lib.json`⟩ → **exactly ONE residual beyond baseline**:

```
src/animation/engine/css/metadata.ts(63,9): error TS2322: Type 'string' is not assignable to type
'Easing | TimingFunction | TimingFunctionNames | CssEasingLiteral | undefined'.
```

Its cure is one type-only token at `src/animation/compile/emit/css-text.ts:30` (narrow
`serializeTimingFunction`'s `: string` return to `CssEasingLiteral | TimingFunctionNames`) — **also
outside `.e`'s §Bounds**. `"banana"` is rejected under this shape, so G-KFW4-13's oracle is reached.

## 4. Why this seat did not choose

Both candidates require a write **outside §Bounds** to reach GREEN — §Sequencing L276's first
triumvirate trigger, verbatim *"any write outside §Bounds"*, and *"never an implementer's
decision."* Choosing candidate (3) over the spec's literal instruction would also be a substitution
for the specified cure, which this unit's method forbids. So the arm stands at `origin/master`'s
bytes, the gate stays RED on that limb, and the choice is handed up.

**The RED is witnessed, not asserted.** `test/compile/timing-function-names.test.ts:139` carries the
`@ts-expect-error` the gate names, and it is UNUSED today:

⟨`npx tsc --noEmit -p tsconfig.test.json`⟩ →
`test/compile/timing-function-names.test.ts(139,13): error TS2578: Unused '@ts-expect-error' directive.`

— which is G-KFW4-13's falsifier text word for word (*"today the `@ts-expect-error` is unused
(TS2578) — that is the RED"*). The fixture is born-RED on exactly this limb and goes GREEN the
moment the arm falls.

## 5. What the triumvirate is asked to rule

1. **Widen §Bounds** to `src/animation/presets/catalog.ts` + `src/animation/engine/css/metadata.ts`
   and take the bare deletion (13 preset literals must then become names, typed `Easing` values, or
   a declared literal type — a behaviour-adjacent edit to a published preset surface); **or**
2. **Adopt `CssEasingLiteral`** in `src/animation/constants/types.ts` (in-bounds) and widen §Bounds
   by the single type-only token at `src/animation/compile/emit/css-text.ts:30`; **or**
3. **Re-route KF-CB-29** to a wave whose §Bounds contains `css-text.ts` and `catalog.ts`.

Whichever is ruled, the `:27` limb (KF-CB-24) is already landed and does not move.

## 6. A second, smaller residue this seat also did not cure — the G-13 DEMO TWIN

The `:27` deletion is landed, and it made two previously-invisible demo defects visible now that
`vue-tsc` runs (G-1, `.a`):

```
demo/components/instrument/transport/channel-controls/composables/useTimingFunctionEditor.ts(136,13):
  error TS2367: This comparison appears to be unintentional because the types 'TimingFunctionNames'
  and '"steps"' have no overlap.
demo/components/instrument/transport/channel-controls/composables/useTimingFunctionEditor.ts(157,13):
  error TS2367: … types '"cubic-bezier" | TimingFunctionNames' and '"steps"' have no overlap.
```

This is **the defect, surfacing at its true consumer**: the demo's own editor DRAFT kinds are
`"cubic-bezier"` and `"steps"` (`animationDescriptions.ts` `DETAIL_TIMING_FUNCTIONS`), and the
composable typed only the first of them as its own, relying on the LIBRARY's phantom `"steps"`
member to type the second. The cure is a two-site type widening —
`TimingFunctionNames | "cubic-bezier"` → `TimingFunctionNames | "cubic-bezier" | "steps"` at `:129`
and `:154`. **`useTimingFunctionEditor.ts` is outside `.e`'s writable set**, so it is routed, not
touched. It is exactly the class G-KFW4-13's own row calls *"the demo twin [that] closes only behind
G-1"*, now reachable for the first time.

**Net vue-tsc effect of this unit: 31 → 31** (⟨`npx vue-tsc --noEmit -p tsconfig.json | grep -c 'error TS'`⟩,
double-run) — two cured (`animationDescriptions.ts:108`/`:116`, `.c`'s handover) and these two
surfaced.
