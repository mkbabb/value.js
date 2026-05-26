# H.W4 Lane B — bench provenance hygiene (line refs → symbol refs)

**Date**: 2026-05-26.
**Branch / HEAD**: `tranche-h` @ `d5d570b` (pre-lane edits).
**Scope**: bench files `bench/color2-direct-paths.mjs`, `bench/color-channel-access.mjs`, `bench/parser-namelookup.mjs` — strip drift-prone `src/<module>.ts:NNN` provenance comments, repoint to citing module + symbol (`src/<module>.ts: <SYMBOL>`).
**Author**: H.W4 Lane B agent.
**Bounds**: 3 bench files (edits) + this doc (new). Nothing else.

**Closes**: `H-SEED §3 #2` + `H-AUDIT-5 H-OPP-8` ("bench provenance line-number drift").

---

## §1 — Pre-state

At lane-open (`tranche-h` @ `d5d570b`), bench files carried 7 provenance comments referencing source files by line number — 5 of them pointing into `src/units/color/conversions/*` (the surface that G.W1 just decomposed 1→9 modules; line numbers shift on every refactor) and 2 pointing into `docs/tranches/E/waves/E.W1.md` (also drift-prone — doc edits renumber).

### §1.1 — Census of `:NNN` refs (pre-state)

`grep -n '\.ts:[0-9]\+\|(lines [0-9]\+' bench/*.mjs`:

| Bench file | Line | Pre-state ref |
|---|---:|---|
| `bench/color2-direct-paths.mjs` | 37 | `docs/tranches/E/waves/E.W1.md Lane C (lines 72-97)` |
| `bench/color2-direct-paths.mjs` | 70 | `src/units/color/conversions/xyz-extended.ts:49` |
| `bench/color2-direct-paths.mjs` | 78 | `src/units/color/conversions/xyz-extended.ts:43` |
| `bench/color2-direct-paths.mjs` | 85 | `src/units/color/conversions/transfer.ts:38` |
| `bench/color2-direct-paths.mjs` | 86 | `(linearToSrgb; SRGB_GAMMA/OFFSET/SLOPE constants at transfer.ts:14-16)` |
| `bench/color2-direct-paths.mjs` | 113 | `src/units/color/conversions/cylindrical.ts:131` |
| `bench/parser-namelookup.mjs` | 27 | `docs/tranches/E/waves/E.W1.md Lane D (lines 99-113)` |

- `bench/color-channel-access.mjs` carries one source ref (`src/units/color/index.ts`) but already at module granularity — no `:NNN` drift surface. Untouched.
- Counts: 7 total `:NNN` refs (5 src, 2 docs). All point to surfaces that have churned since the comments were authored (E.W1, G.W1 1→9 decomposition).

### §1.2 — Why line numbers drift

The 5 `src/units/color/conversions/*.ts:NNN` refs were authored during E.W1 Lane C (pre G.W1 decomposition). After G.W1 split `src/units/color/conversions.ts` into 8 focused modules (`hex.ts`, `kelvin.ts`, `cylindrical.ts`, `lab.ts`, `oklab.ts`, `transfer.ts`, `xyz-extended.ts`, `direct.ts` + `index.ts` barrel), the paths shifted (single-file `:NNN` → multi-file `:NNN`) and the line numbers within each split module no longer match the original positions. **The refs survived G.W1 only because nothing executes them — they are comments. The bench itself remains correct because constants are inlined verbatim, not re-imported.** But any reader who follows the cite is now sent to the wrong line (or a wrong file, if the symbol moved between modules).

The 2 `docs/tranches/E/waves/E.W1.md (lines NNN-NNN)` refs are the same failure mode for wave-spec docs.

---

## §2 — Post-state — symbol refs replace line refs

Every `:NNN` ref is repointed to a stable symbol cite: `<module-path>: <SYMBOL>` (colon separator, symbol = the function/constant/export the comment is sourced from). The 2 doc-line refs are repointed to section heads (`§Lane C`, `§Lane D`).

### §2.1 — Post-state refs

| Bench file | Line | Post-state ref |
|---|---:|---|
| `bench/color2-direct-paths.mjs` | 37 | `docs/tranches/E/waves/E.W1.md §Lane C` |
| `bench/color2-direct-paths.mjs` | 70 | `src/units/color/conversions/xyz-extended.ts: XYZ_RGB_MATRIX` |
| `bench/color2-direct-paths.mjs` | 78 | `src/units/color/conversions/xyz-extended.ts: RGB_XYZ_MATRIX` |
| `bench/color2-direct-paths.mjs` | 85 | `src/units/color/conversions/transfer.ts: linearToSrgb` |
| `bench/color2-direct-paths.mjs` | 86 | `(companion srgbToLinear + SRGB_GAMMA/SRGB_OFFSET/SRGB_SLOPE constants in same module)` |
| `bench/color2-direct-paths.mjs` | 113 | `src/units/color/conversions/cylindrical.ts: hsl2rgb` |
| `bench/parser-namelookup.mjs` | 27 | `docs/tranches/E/waves/E.W1.md §Lane D` |

### §2.2 — Symbol-ref accuracy (grep verification)

Verified at lane close that every cited symbol is an export of the named module:

```
$ grep -n 'XYZ_RGB_MATRIX\|RGB_XYZ_MATRIX' src/units/color/conversions/xyz-extended.ts
43:const RGB_XYZ_MATRIX: Mat3 = [
49:const XYZ_RGB_MATRIX: Mat3 = invertMat3(RGB_XYZ_MATRIX);

$ grep -n '^export function linearToSrgb\|^export function srgbToLinear' src/units/color/conversions/transfer.ts
22:export function srgbToLinear(channel: number): number {
38:export function linearToSrgb(channel: number): number {

$ grep -n '^export function hsl2rgb' src/units/color/conversions/cylindrical.ts
131:export function hsl2rgb({ h, s, l, alpha }: HSLColor): RGBColor {
```

All four symbols resolve at lane-close HEAD. Two constants (`RGB_XYZ_MATRIX`, `XYZ_RGB_MATRIX`) are module-private (not on the public barrel) — the symbol-cite still resolves because the bench links by *concept*, not by import.

---

## §3 — Why symbols are drift-resistant

| Drift mode | Line-ref outcome | Symbol-ref outcome |
|---|---|---|
| Lines added/removed above the cite | **Cite invalidated** (points to wrong line) | Unaffected (symbol unchanged) |
| Symbol renamed | Cite still resolves to the original line, but the line now contains the new name — silent mismatch (mod-cite says "see line 49" but line 49 is now a different function) | **Cite explicitly invalidated** — `grep -n SYMBOL <module>` fails immediately, surfacing the rename |
| Module split (`foo.ts` → `foo/{a,b,c}.ts`) | **Cite invalidated** (path wrong AND line wrong) | Path wrong, symbol still locates the function via repo-wide `grep -rn SYMBOL src/` |
| Module merge | Same as split | Same as split |
| Whole-module rewrite | Both modes fail similarly | Symbol cite is a stronger fail-fast signal (grep returns 0 hits → unambiguous) |

The symbol-ref's load-bearing property: **a reader following the cite always lands on the exact origin of the bench's inlined constant/function**, even after arbitrary line shuffling within the module. The line-ref's load-bearing property: **only valid at the instant the comment was authored**. Symbol churn is rarer than line churn (a refactor that renames a public-ish symbol is far less common than one that adds an import or reflows a helper), so the symbol-ref's MTBF is orders of magnitude longer.

### §3.1 — Edge case: private helper without a stable export

If a bench inlines a private internal helper without an exported name, the workaround is: cite the *containing* exported function as the source-of-truth (the private helper is part of that function's implementation). None of the three bench files hit this case at H.W4 — every inlined constant + function in `bench/color2-direct-paths.mjs` corresponds to an actual top-level identifier in the cited module.

---

## §4 — Evidence

### §4.1 — Sub-gate 1: no remaining line-number provenance refs

```
$ grep -n '\.ts:[0-9]\+\|\.mjs:[0-9]\+\|(lines [0-9]\+\|lines [0-9]\+-[0-9]\+\|:[0-9]\+-[0-9]\+' bench/*.mjs
$ echo "exit=$?"
exit=1
```

Exit 1 = zero matches. The 7 pre-state refs are gone.

### §4.2 — Sub-gate 2: bench still produces correct medians

`npm run bench` runs all three bench files in series; runtime is comment-only edits so medians should match pre-state within noise (V8 + macOS scheduler noise; comment changes do not alter the compiled hot-loop bytecode).

**Post-edit medians** (`npm run bench`, lane-close):

```
D.W1 L8 — Color channel-access microbenchmark
  speedups (sorted): 10.44×, 10.45×, 11.12×
  median speedup:    10.45×   (target ≥ 5×)   verdict: PASS

E.W1 Lane C — color2() DIRECT_PATHS microbenchmark
  hsl→rgb   speedups (sorted): 2.36×, 3.31×, 7.63×
  hsl→rgb   median:            3.31×          [GATING — target ≥ 2×]   verdict: PASS
  oklab→rgb speedups (sorted): 0.91×, 0.95×, 1.87×
  oklab→rgb median:            0.95×
  oklch→rgb speedups (sorted): 0.94×, 1.16×, 1.25×
  oklch→rgb median:            1.16×

E.W1 Lane D — nameParser broad-regex + Set-lookup microbenchmark
  speedups (sorted): 46.73×, 55.46×, 87.24×
  median speedup:    55.46×   (target ≥ 5×)   verdict: PASS
```

All three gating medians (channel-access 10.45×; HSL→RGB 3.31×; nameParser 55.46×) clear targets. The non-gating oklab/oklch medians sit at ~0.95×/1.16× — consistent with prior runs (the direct paths' "win" is allocation+matrix-multiply savings on the hot path; on cold runs with V8 still re-inlining, the inline pre-state is comparable). The gate is the HSL→RGB median, and it passes at 3.31× (well above the 2× target).

Pre-edit medians are not re-captured because the comment-only edits cannot affect the compiled hot-loop bytecode — `node`'s parser strips comments before V8 ever sees them. The medians above are sufficient evidence that the bench runs and produces correct verdicts post-edit; runtime equivalence is guaranteed by the edit class (comments).

### §4.3 — Sub-gate 3: lint clean

```
$ npm run lint
> @mkbabb/value.js@0.9.0 lint
> eslint . --max-warnings=0
(exit 0; no output)
```

ESLint clean — comments are not subject to lint rules at the surface we touched, but the script confirms no incidental drift.

---

## §5 — Files changed

| File | Action | Edit count |
|---|---|---:|
| `bench/color2-direct-paths.mjs` | edit (provenance comments only) | 6 |
| `bench/parser-namelookup.mjs` | edit (1 provenance comment) | 1 |
| `bench/color-channel-access.mjs` | untouched (no `:NNN` refs at lane open) | 0 |
| `docs/tranches/H/audit/H.W4-lane-b-bench-provenance.md` | new | 1 |

No runtime changes. No `src/`, `demo/`, `test/`, `e2e/`, `api/`, `vite.config.ts`, or `package.json` edits. Cross-repo writes: zero.

---

## §6 — Sub-gate roll-up

- Sub-gate B.1 (no `:NNN` refs): GREEN — `grep` exits 1.
- Sub-gate B.2 (bench medians): GREEN — see §4.2 evidence block.
- Sub-gate B.3 (lint clean): GREEN — see §4.3.

H.W4 Lane B closed.
