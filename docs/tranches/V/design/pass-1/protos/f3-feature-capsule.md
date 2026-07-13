# V · pass-1 · PROTO — Family 3 · FEATURE-CAPSULE (RAN, isolated worktree)

**Prototyper**: `wf_cb377abc-406-12` · **Date**: 2026-07-13 · **Mode**: **RAN** (one sub-claim —
demo playwright smoke — is SPEC-ONLY; the reason is a pre-existing environment gap, characterised
below). Worktree HEAD `6abef80` (tranche-t-close era); pinned glass-ui `5.0.0`. Every number below
carries its command; scripts live at `_proto/*.mjs` in the worktree (NOT merged — evidence only).

> **Self-assignment** (the launcher passed unsubstituted `${x.id}/${x.family}/${x.brief}`, as the
> r1 researcher also recorded): this batch is `wf_cb377abc-406-{10,11,12}` — 3 parallel prototypers,
> one workflow. The only collision-free rule three uncoordinated agents can each follow is index →
> family: index 2 (`-12`) → **Family 3 · FEATURE-CAPSULE**. I built the two prototypes spec-f3 §6
> names.

---

## Verdict up front

- **PROTOTYPE 2 (src `color` capsule merge) — FULLY RAN, thesis CONFIRMED with a sharpened caveat.**
  Merging `parsing/color` into the color directory eliminates the color-parse↔color-repr cross-
  boundary coupling (**11 → 0** edges) AND the `/color` publish barrel stays parse-that-free with the
  grammar now physically colocated (**`proof:subpath-budget` 11/11 GREEN**, real build). This is the
  load-bearing "**directory ≠ export map**" coexistence proof, RUN not argued. **Caveat sharpened**:
  the merge does NOT make the capsule acyclic — it inherits `units/color`'s pre-existing 17-file
  barrel SCC and adds a `color → parsing` grammar-util dependency (5 edges). Cycle severance is F2's
  job, not F3's.
- **PROTOTYPE 1 (demo `palette` colocation) — RAN with ZERO regression; smoke SPEC-ONLY (env).**
  The palette bucket is *already a de-facto sealed capsule*: `usePaletteManager` (22 consumers) is
  the barrel; its 9 sub-composables have **0** external consumers. Colocating them into a
  `usePaletteManager/` capsule dir touched **only 2 external files** (the 22 manager consumers were
  untouched — the alias dir-index resolves). Typecheck delta vs baseline = **0 new errors**.

---

## PROTOTYPE 2 — merge the src `color` capsule (`units/color` + `parsing/color`)

### The measured leak (before) — `node _proto/census.mjs src current`
Method: resolve every relative `import/export … from` in `src/**` (dedup specifiers per file via a
Set), classify endpoints into dir-clusters, count cross-cluster edges + Tarjan SCC. `subpaths/` excluded.

| edge | count | reading |
|---|---|---|
| `parsing/color → units/color` | **11** | the capsule-boundary leak (color-parse bound to color-repr) |
| `units/color → parsing/color` | **0** | clean |
| `units/color → parsing` | **0** | clean — **color-repr NEVER imports the grammar** |
| `parsing/color → parsing` | 5 | color-parse shares the grammar utils |
| `units → parsing` (back-edge) | **2** | the `units ↔ parsing` cycle (`layout-cache.ts`) |
| `parsing → units` | 10 | value-model substrate |

- Tarjan (cluster graph, current): ONE SCC = `{parsing/color, parsing, units/color, units}` (4-node).
- **My `parsing/color→units/color` count is 11**, not the research doc's 15 — a pure methodology
  delta (I dedupe specifiers per file; the research counted at statement granularity). Both show the
  same load-bearing shape: the coupling is **strictly one-directional** (`units/color → parsing* = 0`).

### The move (physical) — `git mv` + `_proto/merge-codemod.mjs`
`git mv src/parsing/color src/units/color/parse`, then a path.relative codemod rewrote imports in the
4 moved files + repointed the **3** external consumers (`src/index.ts`, `src/parsing/units.ts`,
`src/subpaths/parsing.ts`). Diffstat: **7 files, 29+/29-** (4 renames). Small blast for a capsule merge.

### After — `node _proto/census.mjs src current` on the moved tree
- `parsing/color → units/color` = **0** (the 11 edges are now intramural to `units/color`). ✔
- **New cost**: `units/color → parsing` = **5** — the moved parse files legitimately depend on the
  shared grammar utils (`parsing/{utils,units,math}`). The color capsule now imports the parsing kernel.
- Tarjan (cluster graph, after): SCC shrank 4-node → **3-node `{parsing, units/color, units}`** — the
  cycle is NOT eliminated; `units/color` is pulled INTO the `units↔parsing` cluster cycle.
- Tarjan (file-level, inside the 34-file merged capsule): a **17-file internal SCC**, every member a
  `units/color/*` leaf routed through `units/color/index.ts` (the barrel megacycle — base/contrast/
  mix/normalize/spaces/dispatch/colorFilter all `import "./index"`). **NO `parse/` file is in it** —
  the merge *seam* is acyclic; the SCC is pre-existing and F3-orthogonal.

### The load-bearing proof: directory ≠ export map
- `npx vue-tsc -p tsconfig.lib.json --noEmit` → **exit 0** (merged tree compiles).
- C1 esbuild trace of `src/subpaths/color.ts` on the merged tree (parse-that external, read metafile
  inputs): **34 modules, 0 from `src/parsing/`, 0 from `units/color/parse/`**. The grammar is now in
  the color *directory* yet the `/color` *barrel* never pulls it — because the barrel imports only
  `units/color/*` leaves and those leaves never import `parse/` (one-directional).
- `npm run build && npm run proof:subpath-budget` → **GATE GREEN 11/11** (C0 exists · C1 real bundle
  trace · C2 dist closure parse-that-free · C3 grammar-free · C4 units · C5 parsing DOES pull grammar
  · C6 root keeps parseCSSValue · C7 `.d.ts` declares Color · C8 math/transform/quantize free).

**Reading**: F3's "a `color/` capsule dir + a parse-that-free `/color` subpath barrel coexist" is
**PROVEN by a running gate**. But F3's "internally acyclic" is **FALSE as stated** — the capsule
inherits the barrel SCC and gains a `color→parsing` grammar-util edge. **F3 kills the cross-boundary
color coupling and keeps the publish surface clean; it does NOT resolve cycles — it composes with F2.**

---

## PROTOTYPE 1 — colocate the demo `composables/palette/` bucket

### Consumer census — `node _proto/palette-consumers.mjs`
| composable | external consumers | note |
|---|---|---|
| `usePaletteManager` | **22** (color-picker·dock·gradient·mix·palette-browser·panes) | KERNEL / barrel |
| `usePaletteExport` | 2 (BrowsePane, PalettesPane) | near-leaf → panes |
| `usePaletteStore` | 1 (image-palette-extractor) | shared → 2nd kernel |
| the other **9** | **0** | imported ONLY by `usePaletteManager` — its private parts |

The bucket is **already a sealed capsule**: `usePaletteManager` composes 9 privates (`useBrowse
Palettes`, `useColorNameQueue`, `usePaletteActions`, `useSlugMigration`, `useTagEdit`, `useVersion
History`, `useAdmin{Audit,Flagged,Tags}`) that no other file imports. This maps exactly onto spec-f3
§6 ("9 files INTO a `usePaletteManager` capsule + 1 kernel float").

### The move
- `usePaletteManager.ts` + its 9 privates → `composables/palette/usePaletteManager/` (manager becomes
  `index.ts`, the barrel). Relative imports rewritten (`../` → `../../`, `./usePaletteStore` →
  `../usePaletteStore`); sibling `./useX` unchanged.
- `usePaletteStore` stays at `palette/` (kernel #2 — shared with image-extractor). 0 changes.
- `usePaletteExport` → `components/custom/panes/composables/` (LCA of its 2 pane consumers).
- Diffstat: **13 files, 20+/20-** (12 renames). **Only 2 external consumers touched** (the panes, for
  `usePaletteExport`). The **22 `usePaletteManager` consumers were NOT touched** — their alias
  `@composables/palette/usePaletteManager` now resolves to the capsule's `index.ts` (dir-index).

### Typecheck — delta is ZERO
`npm run typecheck` exits **2** both before and after my change. All **12** errors are
`@mkbabb/glass-ui/goo-blob` module-resolution failures; **0** reference `palette`/`usePalette*`/
`units/color/parse`. Proven by `git stash` baseline: stashed = 12 goo-blob errors; unstashed = the
same 12. My colocation + src merge introduce **0 new type errors**, and the dir-index alias resolves.

### Smoke — SPEC-ONLY (environment, not the change)
`npx playwright test --project=smoke` needs a vite-built demo. The pinned glass-ui is **5.0.0**, whose
exports map has `./blob` but **not `./goo-blob`** (`node -e '…exports["./goo-blob"]' → false`), and the
tranche-t-era demo imports `@mkbabb/glass-ui/goo-blob` (HeroBlob.vue, BlobPane.vue, useAtmosphere.ts).
The demo therefore cannot build in this worktree — **identical in baseline**, so the block is a
pinned-glass-ui version skew, not a consequence of the colocation. The typecheck-delta (0 regression)
carries the correctness evidence in smoke's place.

---

## Honest frictions (the goblins)

1. **Relative-import codemods must track the CO-MOVED set.** My first `merge-codemod.mjs` pass
   resolved every specifier against the *old* dir, so co-moved siblings (`./color-unit`) were
   rewritten to point back at the deleted `../../../parsing/color/` path. Caught by a
   `grep parsing/color src/` post-check; fixed with a `s{…/parsing/color/}{./}` sweep. Lesson for
   F6 (codemod family): the moved-set membership is load-bearing, not incidental.
2. **F3's "acyclic capsule" over-promises for src.** Measured: the merge is *seam*-clean but the
   capsule (a) inherits `units/color`'s 17-file barrel SCC and (b) gains `color→parsing`=5. F3 alone
   does not deliver an acyclic color capsule — it must compose with F2 (sever the `units↔parsing`
   back-edge at `layout-cache.ts`; break the `index.ts` barrel cycle).
3. **Research 15 vs my 11** for `parsing/color→units/color` — a methodology gap (statement vs
   deduped-specifier), not a disagreement; both show the one-directional shape that makes the merge safe.
4. **The demo win is real precisely because the capsule was already sealed** — 9 privates, 0 external
   consumers. Where a bucket is NOT pre-sealed (e.g. `composables/color/`'s 15 single-consumers fan
   into different features), the same move will touch far more consumers. The palette result is the
   best case, honestly labelled.

## Composition read
F3 answers **WHAT tree** (product/domain ontology) and is validated on its two strong surfaces (D1
demo, D2 api-is-template). It does NOT own cycle severance (F2) or the atomic move mechanism (F5/F6).
The two prototypes prove the shape is *reachable with a small, typecheck-clean blast* — the merge move
is 7 files / 3 consumer repoints (src) and 13 files / 2 external consumers (demo).

## Reproduce
- `_proto/census.mjs <srcRoot> current|merged` — cross-cluster edge census + Tarjan.
- `_proto/merge-codemod.mjs` — the `parsing/color → units/color/parse` move + import rewrite.
- `_proto/palette-consumers.mjs` — the demo palette consumer census.
- `npm run build && npm run proof:subpath-budget` → 11/11 GREEN on the merged tree.
- Baseline delta: `git stash push -u` → `npx vue-tsc -p tsconfig.demo.json --noEmit` → 12 goo-blob
  errors identical before/after.
