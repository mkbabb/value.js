# H.W3 Lane E — `proof:no-bare-builtins` scope extension (codifies H-AUDIT-5 + H-AUDIT-6)

**Branch**: `tranche-h` @ `3b0d933` (H.W3 execution).
**Scope**: extend the G.W3 Lane K `proof:no-bare-builtins` gate from
`api/src/`-only to its full Node-executed surface — `api/src/` + `plugins/` +
`scripts/` + `bench/` — and fix the single outlier surfaced by the extended
probe, per `H.W3.md §"Lane E"` + `H-AUDIT-5` + `H-AUDIT-6`.

---

## The finding

G.W3 Lane K installed `proof:no-bare-builtins` to codify the `node:*` prefix
discipline for built-in imports, but scoped the scan to `api/src/` only. The
H-AUDIT pass surfaced that the Node-executed surface at this repo is
strictly larger: the Vite plugin in `plugins/`, the proof + codemod scripts
in `scripts/`, and the benchmark harnesses in `bench/` all run under the
same Node 22+ ESM loader as `api/src/` and share the same fragility class —
a future `plugins/util/` or `scripts/events/` directory would silently
shadow the built-in under bundler resolution if the import is bare.

Extending the gate to those three directories surfaced **exactly one**
outlier — `plugins/vite-source-export.ts:2`, predating the G.W3 Lane K
convention.

## Outliers found

| # | File | Line | Bare-builtin module | Snippet |
|---|---|---|---|---|
| 1 | `plugins/vite-source-export.ts` | 2 | `fs` | `import { readFileSync } from "fs";` |

Probe command (run against the extended scope, both ESM `from "<x>"` form
and the bare side-effect `import "<x>"` / dynamic
`require\|import\(<x>\)` forms — same three pattern shapes the proof
script enforces):

```
$ grep -rnE 'from "(fs|path|url|crypto|child_process|os|stream|util|events|buffer|fs/promises|http|https|net|querystring|zlib|assert|tty|process|readline|worker_threads|perf_hooks|module|vm|dns|tls|cluster|console|timers|string_decoder|repl)"' plugins/ scripts/ bench/ api/src/
plugins/vite-source-export.ts:2:import { readFileSync } from "fs";
```

Dynamic `require("fs")` + side-effect `import "fs"` probes both returned
zero rows — no further outliers exist in the extended scope. The single
outlier is not a deliberate-bare-for-ESM-compat case: it is a residue of
the pre-G.W3-Lane-K convention, with no bundler-resolution rationale to
preserve.

## Fixes applied

`plugins/vite-source-export.ts:2`:

```diff
-import { readFileSync } from "fs";
+import { readFileSync } from "node:fs";
```

That is the entire fix surface. The plugin still resolves `readFileSync`
under Node 22+ (which accepts both forms) and the gate now codifies that
the `node:` prefix is required throughout the Node-executed surface.

## Proof script scope extension

`scripts/proof-no-bare-builtins.mjs` — single-root → four-root iteration.
The pattern bank, the file-walk, the violation-emit, the exit codes, and
the no-match handling all remain byte-identical; only the iteration shape
widens.

**Before** (single root):

```js
const SCAN_ROOT = join(ROOT, "api", "src");
// ...
for (const file of walkSource(SCAN_ROOT)) { ... }
```

**After** (four roots, ordered alphabetically by leaf):

```js
const SCAN_ROOTS = [
    join(ROOT, "api", "src"),
    join(ROOT, "plugins"),
    join(ROOT, "scripts"),
    join(ROOT, "bench"),
];
const SCAN_LABEL = "api/src/ + plugins/ + scripts/ + bench/";
// ...
for (const root of SCAN_ROOTS) {
    for (const file of walkSource(root)) { ... }
}
```

The PASS + FAIL log lines were retargeted from the hardcoded
`"in api/src/"` string to the `SCAN_LABEL` const so the log surface always
reflects the actual scope (no second-source-of-truth drift). The header
comment was rewritten to document the H.W3 Lane E extension and the
fragility-class rationale for the three new roots.

## Sub-gate evidence

```
$ npm run proof:no-bare-builtins
> @mkbabb/value.js@0.9.0 proof:no-bare-builtins
> node scripts/proof-no-bare-builtins.mjs

[proof:no-bare-builtins] PASS — scanned 86 file(s) in api/src/ + plugins/ + scripts/ + bench/; zero bare built-in imports
$ echo $?
0
```

```
$ node --version
v22.15.0
```

Node 22+ requirement is satisfied — `node:` prefix is universally
supported, and the local dev + CI matrix both run Node 24 (CI) / 22+
(local), so the prefix is portable across the matrix.

```
$ npm run build
> @mkbabb/value.js@0.9.0 build
> vite build --mode production

vite v8.0.13 building client environment for production...
✓ 42 modules transformed.
[vite:dts] Declaration files built in 665ms.
✓ built in 753ms
$ echo $?
0
```

Build clean — the `vite-source-export.ts` plugin still works with
`node:fs` (Vite + Vite-DTS resolve the prefixed form identically to the
bare form under Node 22+).

Cross-root probe — confirms zero residue across the extended scope:

```
$ grep -rnE 'from "(fs|path|url|crypto|child_process|os|stream|util|events|buffer|fs/promises|http|https)"' plugins/ scripts/ bench/ api/src/ | grep -v 'node:'
(no output)
$ echo $?
1   # grep exit-1 on no-match — the clean signal
```

## Sub-gate E — status

- [x] Single outlier surfaced + fixed (`plugins/vite-source-export.ts:2` —
  `fs` → `node:fs`).
- [x] Proof script scope extended (`SCAN_ROOT` → `SCAN_ROOTS` of four; PASS/FAIL
  log lines retargeted to `SCAN_LABEL`).
- [x] `npm run proof:no-bare-builtins` exits 0 with the extended scope (86 files scanned).
- [x] `npm run build` clean — `vite-source-export.ts` still loads under Node 22+.
- [x] Node 22+ requirement check (local `v22.15.0`; CI matrix is Node 24).
- [x] No side-effects in `src/`, `demo/`, `api/src/`, `e2e/` — only the Lane-E
  bounds (`plugins/vite-source-export.ts`, `scripts/proof-no-bare-builtins.mjs`,
  this audit doc) were touched.
- [x] Cross-root probe returns zero residue across `api/src/` + `plugins/` +
  `scripts/` + `bench/`.

## Files

- `plugins/vite-source-export.ts` — `from "fs"` → `from "node:fs"` (1-line fix).
- `scripts/proof-no-bare-builtins.mjs` — `SCAN_ROOT` (single) → `SCAN_ROOTS`
  (four-root array) + `SCAN_LABEL` const + header rewrite documenting the
  H.W3 Lane E extension.
- `docs/tranches/H/audit/H.W3-lane-e-no-bare-builtins-scope-ext.md` — this doc.
