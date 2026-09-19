SERVED MODEL: claude-opus-5[1m]

# X-W9.b — the matrix family's deletion proof (CC-094 · G27)

Every count below was read from the settled bytes and double-run. The census command is one
`grep -rnE` over the six retired names, run against each tree named in its own row:

```
grep -rnE 'decomposeMatrix2D|decomposeMatrix3D|recomposeMatrix2D|recomposeMatrix3D|interpolateDecomposed|slerp' <tree>
```

## 1. Consumer census — measured at `e24a7cfb`, BEFORE the deletion

| tree | hits | what they are |
|---|---|---|
| `demo/` | **0** | — |
| `api/` + `e2e/` | **0** | — |
| `src/` outside the family | **1** | PROSE only: `src/foundation/math.ts:42` names `interpolateDecomposed` in a docstring (X-W9.c's file) |
| `test/` outside the family | **6** | `test/v4-c1.test.ts:549-557`, the exact-runtime-surface snapshot — see §4 |
| `scripts/` | **3** | `scripts/ci/verify-packed-surface.mjs:39-41`, the expected-export list (X-W9.e's file) — see §4 |
| `../keyframes.js/src` | **0** | — |
| `../glass-ui/src` | **0** | — |
| `../fourier-analysis` | **0** | — |
| `../sci-report/atlas` | **0** | — |

The spec's banked census (§Agent Units X.W9.b, §6 G27) said *zero consumers in `demo/` and
`../keyframes.js/src`*. That reproduces exactly, and the sweep is widened here to four sibling trees,
`api/`, `e2e/`, `scripts/` and the rest of `test/`. **No executable consumer of any of the six exists
anywhere.** The two non-zero rows are a docstring mention and two inventory lists of the published
surface — no call site.

## 2. What was deleted

| path | lines | disposition |
|---|---|---|
| `src/transform/decompose.ts` | 617 | DELETED whole. Every one of its private helpers (`mat4Identity`, `m4Get`, `m4Set`, `mat4Multiply`, `mat4Transpose`, `mat4Determinant`, `mat4Inverse`, `vec3Length`, `vec3Cross`, `vec3Dot`, `matrixToQuaternion`, `quaternionToMatrix`) existed only for the six; nothing outside the module referenced any of them |
| `test/transform/decompose-targeted.test.ts` | 475 | DELETED whole — its subject retires with it (27 tests) |
| `src/subpaths/transform.ts` | 24 → 13 | the six `export`s and the four now-unreachable type exports (`DecomposedMatrix2D`, `DecomposedMatrix3D`, `Vec4`, `Mat4`) dropped |

The four types went with the functions: measured `git grep -n -w`, their only references outside
`decompose.ts` were the subpath re-export block and the deleted test. **No shim. No forwarding
export. Nothing was moved anywhere.**

## 3. Preserved seams (G27's other half)

| symbol | keyframes files | import sites |
|---|---|---|
| `PathGeometry` | **4** (`src/animation/index.ts`, `src/animation/svg/index.ts`, `src/animation/svg/morph-svg.ts`, `src/animation/svg/morph-geometry.ts`) | `morph-svg.ts:45` and `morph-geometry.ts:18` — `import { PathGeometry } from "@mkbabb/value.js/transform"` |
| `getTotalLength` | **1** (`src/animation/svg/draw-svg.ts`) | none — INFO: that file reads the **DOM** `SVGGeometryElement.getTotalLength()`, not this export. The banked G27 line counts the file; the export is preserved either way |
| `getPointAtLength` | 0 | none — preserved as declared |

`./transform` runtime exports: **9 → 3** (`PathGeometry`, `getPointAtLength`, `getTotalLength`).
`PathGeometry.sampleAtLength`, which MorphSVG calls at `morph-svg.ts:104`, keeps its signature and
its behaviour.

## 4. The two references this seat may NOT touch — raised, not worked around

1. **`test/v4-c1.test.ts:548-558`** — *"Value 4 exact runtime surfaces — contains no extra, default,
   root-facade, or retired runtime name"* pins `./transform` at all nine names, and now fails
   9-expected vs 3-actual. The file is in **no unit's writable set** and is absent from W9.md
   §File Bounds entirely. Its cure is to drop the six retired names, which turns the snapshot into
   G27's own ratchet. The same snapshot will collide with X-W9.d (PSL-2) and X-W9.f
   (`toHex`/`easingNames`/SCI-1).
2. **`scripts/ci/verify-packed-surface.mjs:39-41`** — the expected-export list still names the six.
   That file is **X-W9.e's** (`modify`), and X-W9.e already rewrites it (G20, behavioural half); the
   six must leave that list in the same act or the packed-surface check reddens at the 4.1.0 tag.
3. **`docs/tranches/V/megatranche/audit/probes/src-surface-totality.mjs:74`** — G1's probe, held
   `execute, no write (re-run unmodified)` by §File Bounds, calls `TR.decomposeMatrix3D(...)`
   directly at MTS-05 and now **dies** `TypeError: TR.decomposeMatrix3D is not a function` before
   printing its verdict. Independently observed by X-W9.a at
   `src-surface-totality.integrated.txt`. No unit may edit it; the E-3-conformant cure is a dated
   addendum-beside probe (MTS-05 restated as *retired, see G27*) or an orchestrator ruling that
   G27 discharges MTS-05.
