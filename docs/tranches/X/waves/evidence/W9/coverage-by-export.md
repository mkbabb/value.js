SERVED MODEL: claude-opus-5[1m]

# X-W9.e · G19 — coverage-by-export, published over a recorded denominator

**PUBLISHED, NOT GATED.** No threshold is asserted anywhere and the measuring script always exits 0
— *"a coverage floor with no consumer is L-19 contrivance"* (`W9.md` :261-262). The number below is
a reading, not a bar.

Substrate: worktree `/Users/mkbabb/Programming/value.js-x-w9-e` @ `fdebfef5` (X-W9.a `97ab3991` and
X-W9.b `4be22189` landed), node **v26.0.0**, darwin arm64, `dist/` freshly built by `npm run build`.

---

## 1. The recorded command

One command produces every number in this file, and it is committed beside it:

```
⟨cmd⟩ node docs/tranches/X/waves/evidence/W9/coverage-by-export.mjs
```

Run from the repository root with `dist/` built. It is **double-run** — ⟨cmd⟩ `diff -q run1 run2`
→ **silent**, twice. Its full output is banked at `coverage-by-export.txt` beside this file.

## 2. The denominators, measured

| denominator | command inside the script | at the spec's substrate (`aa8c8cbd`) | **at this open (`fdebfef5`)** |
|---|---|---|---|
| declared export names | `^export declare ` lines across `dist/subpaths/*.d.ts` | **142** | **131** lines / 131 distinct |
| runtime exports | `Object.keys(await import("dist/subpaths/<entry>.js"))`, 7 subpaths | **79** | **73** |

The wave's record banked **142 / 79** at open (`X-W9.md` §Baseline G19) and both reproduce exactly
when the same command is run against a build of `aa8c8cbd`, the last commit before X-W9 touched
`src/` — measured, not assumed:

```
⟨cmd⟩ git worktree add --detach <scratch> aa8c8cbd && npm run build && grep -h '^export declare ' dist/subpaths/*.d.ts | wc -l
     142
⟨cmd⟩ … node -e over the seven dist/subpaths/*.js
BEFORE runtime: color 23 · value 1 · css 19 · easing 16 · math 9 · transform 9 · quantize 2 = 79
```

**The denominator moved, and it is re-recorded here rather than carried** (G19's falsifier: *"change
the denominator without re-recording it"*). Both deltas have one cause — X-W9.b's matrix-family
retirement (CC-094 · G27), measured name by name:

- runtime **79 → 73**: `decomposeMatrix2D` `decomposeMatrix3D` `recomposeMatrix2D` `recomposeMatrix3D`
  `interpolateDecomposed` `slerp` left `./transform`.
- declared **142 → 131**: those six, plus the four types that existed only for them
  (`DecomposedMatrix2D` `DecomposedMatrix3D` `Vec4` `Mat4`); `interpolateDecomposed` occupied two
  `export declare` lines, which is the eleventh. `transform.d.ts` reads **16 → 5**; the five that
  stay are `PathGeometry` `PathSample` `Point` `getPointAtLength` `getTotalLength`.

## 3. Coverage-by-export

An export is **covered** iff a module in the suite's own reachable source graph, **outside `src/`**,
imports that name from a value.js specifier and references it. The graph is seeded with vitest's own
include globs read from `vitest.config.ts` (`test/**/*.test.ts`, `demo/test/**/*.test.ts` — **36
seed files**) and closed over first-party imports (relative, `@src/…`, `@mkbabb/value.js/…`, and the
`<script>` body of any `.vue` reached); `src/**` terminates a branch, because an internal src→src use
is not consumer coverage. Import forms handled: named, aliased, namespace member access,
namespace element access, and namespace destructuring (`const { isLayoutTrackingUnit } = value`, the
shape `test/v4-c1.test.ts:12` uses). Parsing is the TypeScript compiler API, not a grep.

### 3.1 Whole suite — **73 / 73 = 100.0%** (78 first-party modules visited outside `src/`)

| subpath | covered / runtime exports |
|---|---|
| color | 23 / 23 |
| value | 1 / 1 |
| css | 19 / 19 |
| easing | 16 / 16 |
| math | 9 / 9 |
| transform | 3 / 3 |
| quantize | 2 / 2 |
| **TOTAL** | **73 / 73 = 100.0%** |

### 3.2 The same measure with `test/v4-c1.test.ts` removed — **70 / 73 = 95.9%**

`test/v4-c1.test.ts` is the exact-runtime-surface **snapshot**: it names every published export by
construction, so a single figure that leans on it would over-claim. The script therefore reports the
measure twice, and this is the honest half:

| subpath | covered / runtime exports | reached only by the snapshot |
|---|---|---|
| color | 23 / 23 | — |
| value | 0 / 1 | `isLayoutTrackingUnit` |
| css | 17 / 19 | `collectDeclarations`, `parseKeyframeSelector` |
| easing | 16 / 16 | — |
| math | 9 / 9 | — |
| transform | 3 / 3 | — |
| quantize | 2 / 2 | — |
| **TOTAL** | **70 / 73 = 95.9%** | three names |

**Read this as the finding it is**: three published entries — `isLayoutTrackingUnit`,
`collectDeclarations`, `parseKeyframeSelector` — are reached by nothing but a name-enumeration
snapshot. `verify-packed-surface.mjs`'s behavioural half (G20) now invokes all three against the
packed tarball, so they are exercised somewhere; they are not exercised by a behavioural test in the
tree. Recorded, not repaired: authoring three tests is not this unit's named mechanism.

## 4. What this measure is NOT

It is **reachability-by-name**, not statement or branch coverage. It answers *"does the suite
exercise this published name at all"* — the same question G20's behavioural half asks of the
**tarball** — and it does not claim a covered name's branches are covered. It cannot see a name
reached only through a dynamic property lookup.

No coverage provider is installed in this repository: ⟨cmd⟩ `ls node_modules | grep -i coverage` →
**nothing**, and ⟨cmd⟩ `grep -c coverage vite.config.ts vitest.config.ts` → **0 / 0**, reproducing
G19's born-RED reading exactly. Installing `@vitest/coverage-v8` is a `package.json` edit, and
`package.json` is **X-W9.f's** file, not this unit's — so a provider-based measure was not available
and is not claimed. The `NODE_V8_COVERAGE` route was tried and measured **unusable** here: vitest
evaluates transformed modules under synthetic URLs, so ⟨cmd⟩
`NODE_V8_COVERAGE=<dir> npx vitest run --pool=forks` produced 958 script URLs of which **0** resolve
to `src/`, giving no per-export attribution.
