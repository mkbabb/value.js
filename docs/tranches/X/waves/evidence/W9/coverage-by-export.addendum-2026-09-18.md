SERVED MODEL: `claude-opus-5[1m]`

# X-W9 · REPAIR 1 — ADDENDUM-BESIDE to `coverage-by-export.md`, dated 2026-09-18

**E-3.** The committed document `coverage-by-export.md` (landed at `83da21d5`, measured in X-W9.e's
worktree `/Users/mkbabb/Programming/value.js-x-w9-e` @ `fdebfef5`) is **not rewritten and not
corrected in place**. This file sits beside it and re-publishes the same measure at the settled
bytes, because the denominator moved after that document was written.

Cures **Check 1 · D-4** (MINOR) and the close's own **LW-4**.

---

## 1. What D-4 found

`coverage-by-export.md` publishes a headline of **73 / 73 = 100.0%** (`:65`, `:76`) and
**70 / 73 = 95.9%** (`:78`, `:93`) over a runtime denominator of **73**, and a declared-name
denominator of **131** (`:29`). G19's falsifier is, verbatim, *"Publish a number without its
command, or **change the denominator without re-recording it**"* (`W9.md` §Hard Gate G19).

The denominator changed. The gate reads GREEN at a fresh seat's own run **because the command is
committed beside the prose and re-records honestly** — but the prose's figures are stale, and the
stale figures are what a later reader would cite. This file re-records them.

## 2. The recorded command, unchanged and double-run

```
⟨cmd⟩ node docs/tranches/X/waves/evidence/W9/coverage-by-export.mjs
```

Substrate: `tranche-u`, this repository (no worktree), node **v26.0.0**, darwin arm64, against the
`dist/subpaths/` standing at these bytes. Run twice, output diffed:

```
⟨cmd⟩ node …/coverage-by-export.mjs > cov1.txt ; node …/coverage-by-export.mjs > cov2.txt
⟨cmd⟩ diff -q cov1.txt cov2.txt   → silent (identical); exit 0 both runs
```

## 3. The settled reading

| denominator | `coverage-by-export.md` (`fdebfef5`) | **at these bytes** | delta |
|---|---|---|---|
| declared export names (`^export declare ` across `dist/subpaths/*.d.ts`) | **131** | **146** | **+15** |
| runtime exports across the seven subpaths | **73** | **75** | **+2** |
| first-party modules visited outside `src/` (whole suite) | 78 | **78** | 0 |
| first-party modules visited outside `src/` (minus the snapshot) | 77 | **77** | 0 |

### 3.1 Whole suite — **74 / 75 = 98.7%**

| subpath | covered / runtime exports | uncovered |
|---|---|---|
| color | **23 / 24** | `isAnyColor` |
| value | 1 / 1 | — |
| css | **20 / 20** | — |
| easing | 16 / 16 | — |
| math | 9 / 9 | — |
| transform | 3 / 3 | — |
| quantize | 2 / 2 | — |
| **TOTAL** | **74 / 75 = 98.7%** | |

### 3.2 The same measure with `test/v4-c1.test.ts` removed — **71 / 75 = 94.7%**

| subpath | covered / runtime exports | reached only by the snapshot |
|---|---|---|
| color | **23 / 24** | — (`isAnyColor` is uncovered in both halves) |
| value | 0 / 1 | `isLayoutTrackingUnit` |
| css | **18 / 20** | `collectDeclarations`, `parseKeyframeSelector` |
| easing | 16 / 16 | — |
| math | 9 / 9 | — |
| transform | 3 / 3 | — |
| quantize | 2 / 2 | — |
| **TOTAL** | **71 / 75 = 94.7%** | **three** names snapshot-only; four uncovered in all (75 − 71), `isAnyColor` being uncovered in both halves |

## 4. Why the denominator moved — measured, not inferred

`coverage-by-export.md` was written in X-W9.e's worktree at `fdebfef5`, which carried X-W9.a
(`97ab3991`) and X-W9.b (`4be22189`) but **not** X-W9.d. Both new runtime names arrive in **one**
commit:

```
⟨cmd⟩ git log --oneline -S'serializeCssValue' -- src/subpaths/css.ts src/css/index.ts
  c8848bed  refactor(css/surface): PSL-1 derivation, colour boundary, stylesheet split
⟨cmd⟩ git log --oneline -S'isAnyColor' -- src/
  c8848bed  refactor(css/surface): PSL-1 derivation, colour boundary, stylesheet split
  164343c1  feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees
```

- **`./css` 19 → 20**: `serializeCssValue`. Its publication is **required by G15** (*"`'serializeCssValue' in CSS`"*), so this +1 is a gate's own consequence, not drift.
- **`./color` 23 → 24**: `isAnyColor`, carried onto the barrel by PSL-1's derivation — `src/color/index.ts:10` states it explicitly (*"`isAnyColor` is listed for that"*). It is the one uncovered name in both halves.
- **declared 131 → 146**: the same commit's `.d.ts` re-emission under the derived barrels.

```
⟨cmd⟩ node -e "…Object.keys(await import('./dist/subpaths/css.js'))…"  → 20 names, serializeCssValue present
⟨cmd⟩ node -e "…Object.keys(await import('./dist/subpaths/color.js'))…" → 24 names, isAnyColor present
⟨cmd⟩ grep -h '^export declare ' dist/subpaths/*.d.ts | wc -l          → 146
```

## 5. What this does and does not change

- **G19 stays GREEN**, on the same basis it was green at Check 1: the number is published with the
  command that produced it, over a denominator now recorded at the settled bytes.
- **PUBLISHED, NOT GATED** still holds. No threshold is asserted here either; the script exits 0
  regardless (*"a coverage floor with no consumer is L-19 contrivance"*, `W9.md` :261-262).
- `coverage-by-export.md`, `coverage-by-export.mjs` and `coverage-by-export.txt` are **byte-untouched
  by this repair**. A reader who cites 73/73 should cite this file instead; the epoch rule keeps the
  original readable as what X-W9.e measured when it measured it.
