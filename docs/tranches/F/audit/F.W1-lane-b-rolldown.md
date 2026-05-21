# F.W1 Lane B — Rolldown declarative `codeSplitting` adoption

**Tranche / Wave**: F / F.W1 Lane B
**Dispatch HEAD**: `bdfecf2` (F.W0 close, branch `tranche-f`)
**Scope** (per `docs/tranches/F/waves/F.W1.md` Lane B): retire the imperative
`output.manualChunks(id)` function-form in the `gh-pages` build branch and
adopt Rolldown 1.x's declarative `output.codeSplitting` API.
**Substrate motive** (F-AUDIT-5 §5.2): Vite 9 future-proofing — Rolldown's
function-form `manualChunks` is explicitly `@deprecated` in the published
type defs; the declarative `codeSplitting.groups` shape is the canonical
forward path.
**Verdict**: **PASS**.

---

## 1. Investigation — what does Rolldown 1.x actually expose?

Versions confirmed in this repo:

```
rolldown:  1.0.1
vite:      8.0.13
```

Top-level `rolldown` exports (`node -e "console.log(Object.keys(require('rolldown')));"`):

```
RUNTIME_MODULE_ID, RolldownMagicString, VERSION, build, defineConfig, rolldown, watch
```

The chunking surface is contained inside `OutputOptions`, exposed through
`@types` re-export. Three knobs exist at output-level:

| Field            | Status       | Schema (verbatim from
`node_modules/rolldown/dist/shared/define-config-CeKzMIcs.d.mts`) |
| ---------------- | ------------ |
-------------------------------------------------------------------------- |
| `manualChunks`   | `@deprecated` "Please use `codeSplitting` instead" (d.mts:784–785) | `ManualChunksFunction` — function-form ONLY; doc-block explicitly states "Note that unlike Rollup, **object form is not supported**" (d.mts:782) |
| `advancedChunks` | `@deprecated` "Please use `codeSplitting` instead" (d.mts:826) | `{ groups?: CodeSplittingGroup[]; minSize? maxSize? … }` (d.mts:834–842) |
| `codeSplitting`  | **canonical, default `true`** (d.mts:824) | `boolean \| CodeSplittingOptions` where `CodeSplittingOptions = { groups: CodeSplittingGroup[]; minSize? … }` |

The runtime translation is visible in
`node_modules/rolldown/dist/shared/rolldown-build-BVD3dIdE.mjs:3036–3085`
(`bindingifyCodeSplitting`):

- If `codeSplitting` is set, both `manualChunks` and `advancedChunks` are
  silenced with a warning (lines 3060–3065).
- If only `manualChunks` is set, Rolldown internally wraps it into
  `{ groups: [{ name(moduleId, ctx) { return manualChunks(moduleId, …); } }] }`
  (lines 3066–3068) — i.e. the function-form is now a thin sugar layer over
  `codeSplitting.groups`.

The `CodeSplittingGroup.test` field (d.mts:1041–1055) accepts string,
`RegExp`, or function — the regex shape is the natural fit for the prefix
matches in `vite.config.ts`. Path-separator guidance (d.mts:1049–1052) is
`[\\/]` for cross-platform safety.

**Conclusion**: declarative `codeSplitting: { groups: [{ name, test }, …] }`
is the canonical Rolldown 1.x API; the "object-form `manualChunks`" pattern
sketched in F-AUDIT-5 §5.2 (`{ "vendor-katex": ["katex"] }`) **does not exist
in Rolldown** (only Rollup). Lane B adopts the actual Rolldown shape, not
the audit's paraphrase.

---

## 2. Diff applied to `vite.config.ts`

Only the `gh-pages` mode branch is touched (lines 161–170 pre-edit). The
`production` branch (`external: ["vue", "@mkbabb/parse-that"]`) needs no
change — it does not chunk. The `hero-lab` and `dev` branches have no
`rolldownOptions`.

### Before (lines 161–170)

```ts
rolldownOptions: {
    output: {
        manualChunks(id) {
            if (id.includes("node_modules")) {
                if (id.includes("katex")) return "vendor-katex";
                if (id.includes("highlight")) return "vendor-highlight";
            }
        },
    },
},
```

### After

```ts
rolldownOptions: {
    output: {
        // Declarative code-splitting (Rolldown 1.x). Replaces the legacy
        // `manualChunks` function-form per the deprecation notice in
        // node_modules/rolldown/dist/shared/define-config-CeKzMIcs.d.mts:784
        // ("Please use `codeSplitting` instead"). Each group's `test`
        // regex captures modules under `node_modules/<pkg>/`; matched
        // modules are emitted into a chunk whose `[name]` placeholder is
        // filled from the group's `name`. Path separator is `[\\/]` per
        // Rolldown's Windows guidance at d.mts:1050.
        codeSplitting: {
            groups: [
                {
                    name: "vendor-katex",
                    test: /node_modules[\\/]katex/,
                },
                {
                    name: "vendor-highlight",
                    test: /node_modules[\\/]highlight/,
                },
            ],
        },
    },
},
```

No dead-code stacking: the function-form was deleted, the declarative form
is now the only chunking instruction.

---

## 3. Build-output comparison — pre vs post

### Methodology

```
# pre-edit
npm run gh-pages
find dist/gh-pages/assets/ -name '*.js' | xargs wc -c | sort -n
  → /tmp/pre-edit-chunks.txt

# apply edit, then post-edit
npm run gh-pages
find dist/gh-pages/assets/ -name '*.js' | xargs wc -c | sort -n
  → /tmp/post-edit-chunks.txt

diff /tmp/pre-edit-chunks.txt /tmp/post-edit-chunks.txt
```

### Result

```
=== chunk lists IDENTICAL ===
```

Byte-identical filenames AND sizes across all 40 emitted JS chunks. The
vendor chunks of interest:

| Chunk                              | Pre (bytes) | Post (bytes) | Δ   |
| ---------------------------------- | -----------:| ------------:| --- |
| `vendor-katex-k7BK6QKS.js`         |     258,876 |      258,876 | 0   |
| `vendor-highlight-QRU0io6_.js`     |      34,240 |       34,240 | 0   |
| Total JS bundle (all 40 chunks)    |   1,339,499 |    1,339,499 | 0   |

Content hashes (`k7BK6QKS`, `QRU0io6_`) are stable, confirming the module
graph fed into each chunk is identical — Rolldown's regex-based group
matcher captured the same module set as the original function-form did.

Build wall-clock: pre-edit `1.10s`, post-edit `948ms` (within noise).

---

## 4. Verification matrix

| Gate                                        | Command                                             | Outcome                                         |
| ------------------------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| HEAD verification                           | `git log -1 --format=%H`                            | `bdfecf2a8396…` ✓ matches dispatch              |
| gh-pages build (post-edit)                  | `npm run gh-pages`                                  | exit 0, `built in 948ms`, 40 JS chunks emitted, both vendor chunks present ✓ |
| Library build (regression sentinel)         | `npm run build`                                     | exit 0, `built in 669ms`, dts pipeline clean ✓  |
| Lint (eslint flat config, `--max-warnings=0`) | `npm run lint`                                    | exit 0 ✓                                        |
| Type-check (vue-tsc, F.W0 threshold ≤118)   | `npx vue-tsc --noEmit \| grep -c 'error TS'`        | **118** ✓ (unchanged from F.W0 baseline)        |
| Chunk parity (byte-equiv)                   | `diff pre-chunks.txt post-chunks.txt`               | IDENTICAL ✓                                     |

Dev server / HMR check skipped per dispatch instruction (cost-benefit).
Type-check ≤118 covers the surface a dev-server boot would exercise.

---

## 5. API surface — Rolldown declarative `codeSplitting` reference

For successor lanes / consumers, the canonical shape adopted here:

```ts
output: {
    codeSplitting: {
        // Optional global thresholds (omitted — defaults are fine for demo):
        // minSize?: number;
        // maxSize?: number;
        // maxModuleSize?: number;
        // minModuleSize?: number;
        // minShareCount?: number;
        groups: [
            {
                name: "vendor-katex",                      // string | (id) => string | null
                test: /node_modules[\\/]katex/,            // string | RegExp | (id) => boolean
                // priority?: number;                      // default 0 — higher wins
                // minSize?: number;                       // bytes; group ignored if smaller
                // maxSize?: number;                       // bytes; splits group above this
                // maxModuleSize?: number;
                // minModuleSize?: number;
                // minShareCount?: number;                 // default 1
            },
            { name: "vendor-highlight", test: /node_modules[\\/]highlight/ },
        ],
    },
}
```

**Path-separator note**: Rolldown explicitly recommends `[\\/]` over `/` in
regex tests for Windows compatibility (d.mts:1050) — Lane B follows this.

**Multiple-group resolution**: when a module matches multiple groups, the
higher `priority` wins; on ties, the lower array-index wins (d.mts:1057–
1086). Lane B's two groups are mutually exclusive (`katex` vs `highlight`)
so `priority` is unused.

---

## 6. Sub-gate verdict

**PASS** — Lane B is complete. Rolldown declarative `codeSplitting` API is
adopted in the `gh-pages` build branch with byte-identical chunk output
(40 chunks unchanged, 1,339,499 B total unchanged, both vendor chunk
content hashes unchanged). The deprecated `manualChunks` function-form is
fully retired from `vite.config.ts`; no dead-code coexistence. Lint clean,
library build clean, vue-tsc holds at the F.W0 baseline of 118.

**Files written**:

- `vite.config.ts` — `gh-pages` branch `rolldownOptions.output`: replaced
  `manualChunks` function with `codeSplitting.groups` declarative array
  (+19/−9 lines incl. comment-block).
- `docs/tranches/F/audit/F.W1-lane-b-rolldown.md` — this document.

**Files NOT touched** (per Lane B's hard bounds): everything else in the
repo. No commits authored.
