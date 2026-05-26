# H.W3 Lane D — `proof:no-ts-ignore` extension to `demo/`

**Wave**: H.W3  **Lane**: D  **Source**: `docs/tranches/H/audit/H-AUDIT-6-api-e2e-ci.md` (Gap H4) + `docs/tranches/H/waves/H.W3.md` §Lane D

**Scope (file bounds)**:

- `demo/color-picker/vite.d.ts` (edited — added `*.css?inline` module declaration)
- `demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts` (edited — 2 `@ts-ignore` retired)
- `scripts/proof-no-ts-ignore.mjs` (edited — scope extended to `src/` + `demo/`, vendored `ui/` excluded)
- `docs/tranches/H/audit/H.W3-lane-d-no-ts-ignore-demo-ext.md` (new — this doc)

**Sister-lane coordination**: Lane A in `demo/@/lib/palette/api/` — no overlap. Lane C in `demo/@/components/custom/color-picker/index.ts` + `colorSpaceInfo.ts` — no overlap. Lane E in `scripts/proof-no-bare-builtins.mjs` + `plugins/vite-source-export.ts` — no overlap.

---

## Mission recap

`scripts/proof-no-ts-ignore.mjs` (added at G.W3 Lane C) codifies the F.W1 Lane A invariant: zero `@ts-ignore` annotations in `src/`. The G.W3-shipped script was `src/`-scoped only — `demo/` still carried 2 unswept `@ts-ignore` hits (`useMarkdownHighlighting.ts:5,7`), each suppressing a `*.css?inline` import that lacked a TypeScript module declaration. H.W3 Lane D adds the declaration, removes the suppressions, and extends the proof script to gate `demo/` alongside `src/` (excluding the vendored shadcn-vue tree at `demo/@/components/ui/` per `VENDOR-POLICY.md`).

---

## Site 1 — 2 `@ts-ignore` retired

### File: `demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts`

### Before (lines 5–8)

```ts
// @ts-ignore
import darkTheme from "highlight.js/styles/github-dark.css?inline";
// @ts-ignore
import lightTheme from "highlight.js/styles/github.css?inline";
```

The two suppressions silenced TS2307 ("Cannot find module 'highlight.js/styles/github-dark.css?inline' or its corresponding type declarations") at each import. Vite's `?inline` query suffix instructs the bundler to inline the asset's contents as a string export at build time — a Vite-bundler-specific URL convention with no native TypeScript resolution path. The previous lane authors reached for `@ts-ignore` instead of declaring the module.

### After (lines 5–6)

```ts
import darkTheme from "highlight.js/styles/github-dark.css?inline";
import lightTheme from "highlight.js/styles/github.css?inline";
```

The imports now resolve against the new `*.css?inline` module declaration (see Site 2). The `@ts-ignore` lines are deleted outright — no `@ts-expect-error` substitute is needed because the underlying error is genuinely retired, not merely silenced.

### Verdict — RETIRED (2/2)

- **Classification**: missing-module-declaration. The `@ts-ignore` was masking a real ambient-declaration gap, not an irreducible cast. Adding the declaration is the structurally honest fix.
- **No regression risk**: the same `?inline` import pattern is already used in `demo/@/components/custom/gradient/GradientCodeEditor.vue:11-12` (Vue SFC, where TS checks run through `<script setup>` and the missing declaration was silently masked by `vue-tsc`'s SFC pipeline). With the declaration now in place, both call sites type-check identically.

---

## Site 2 — `*.css?inline` module declaration added

### File: `demo/color-picker/vite.d.ts`

### Before

```ts
declare module "*.vue" { ... }
declare module "*.md" { ... }
declare module "*.glsl?raw" {
    const content: string;
    export default content;
}
```

### After (declaration appended)

```ts
declare module "*.glsl?raw" {
    const content: string;
    export default content;
}

declare module "*.css?inline" {
    const content: string;
    export default content;
}
```

Mirrors the existing `*.glsl?raw` shape (which itself mirrors `src/vite-env.d.ts`'s `*.bbnf?raw`): Vite's `?inline` and `?raw` query suffixes both materialise the asset as a `string` default export.

### Inventory of `?inline` / `?raw` callsites under `demo/@/`

```
demo/@/components/custom/gradient/GradientCodeEditor.vue:11      highlight.js/styles/github-dark.css?inline
demo/@/components/custom/gradient/GradientCodeEditor.vue:12      highlight.js/styles/github.css?inline
demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts:5  highlight.js/styles/github-dark.css?inline  (was: @ts-ignored)
demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts:6  highlight.js/styles/github.css?inline       (was: @ts-ignored)
demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:3     ../shaders/metaball.vert.glsl?raw           (covered by existing *.glsl?raw decl)
demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:4     ../shaders/metaball.frag.glsl?raw           (covered by existing *.glsl?raw decl)
```

The single `*.css?inline` declaration covers all four `?inline` callsites. The two `?raw` callsites are already covered by the pre-existing `*.glsl?raw` declaration. No further surface is needed.

---

## Site 3 — `proof:no-ts-ignore.mjs` scope extension

### File: `scripts/proof-no-ts-ignore.mjs`

### Before (G.W3 Lane C shipped)

```js
const out = execSync('grep -rn "@ts-ignore" src/ || true', {
    cwd: ROOT,
    encoding: "utf8",
});
```

Success message: `[proof:no-ts-ignore] PASS — zero @ts-ignore in src/`

### After (H.W3 Lane D)

```js
const out = execSync(
    'grep -rn --exclude-dir=ui "@ts-ignore" src/ demo/ || true',
    { cwd: ROOT, encoding: "utf8" },
);
```

Success message: `[proof:no-ts-ignore] PASS — zero @ts-ignore in src/ + demo/`

### Why `--exclude-dir=ui` and not a path-prefix filter

- `find` confirmed exactly one `ui/` directory under `src/` + `demo/`: `demo/@/components/ui/` (the vendored shadcn-vue tree). GNU grep's `--exclude-dir` matches base names — the single `ui/` base is unambiguous.
- The exclusion is policy-aligned with `VENDOR-POLICY.md`: generated shadcn-vue code is exempt from the hand-written no-suppression invariant.
- The header comment + failure message both explicitly call out the vendored exclusion so future readers see the rationale at the source.

---

## Sub-gate evidence

| Gate | Pre-Lane-D | Post-Lane-D | Status |
|---|---|---|---|
| `grep -rn "@ts-ignore" demo/ \| grep -v 'demo/@/components/ui/' \| wc -l` | 2 | **0** | down by 2 |
| `grep -rn "@ts-ignore" src/ \| wc -l` | 0 | **0** | unchanged (still clean) |
| `npm run proof:no-ts-ignore` exit code | 0 (src/-scoped) | **0 (src/ + demo/-scoped)** | PASS with broader scope |
| `npx vue-tsc --noEmit` on Lane D files | n/a | **0 errors in `useMarkdownHighlighting.ts` + `vite.d.ts`** | clean (3 pre-existing errors in `color-picker/index.ts` belong to Lane C's WIP, outside Lane D bounds) |
| `npm run gh-pages` | exit 0 | **exit 0 (built in 1.21s)** | clean (demo still builds with new `*.css?inline` decl) |

### Note on the residual vue-tsc errors

The full `vue-tsc --noEmit` run reports 3 errors in `demo/@/components/custom/color-picker/index.ts` (TS2323 / TS2484 — `Cannot redeclare exported variable 'colorSpaceInfo'`). These belong to **Lane C's in-flight `colorSpaceInfo` lift** (see file bounds in `H.W3.md` Lane C row + the un-tracked `demo/@/components/custom/color-picker/colorSpaceInfo.ts` at `git status`). They are outside Lane D's file bounds and will resolve when Lane C lands. Filtered vue-tsc output across Lane D's files (`markdown\|vite.d.ts\|css?inline`) returns zero errors.

---

## Cross-references

- Source gaps: `docs/tranches/H/audit/H-AUDIT-6-api-e2e-ci.md` Gap H4 (proof-script scope drift).
- Wave plan: `docs/tranches/H/waves/H.W3.md` §Lane D.
- Codified invariant: F.W1 Lane A (zero `@ts-ignore` in library), G.W3 Lane C (proof-script codification, `src/`-scoped).
- Vendored exclusion policy: `VENDOR-POLICY.md` (`demo/@/components/ui/` is generator-owned shadcn-vue).
- Sibling proof scripts: `scripts/proof-no-deprecated.mjs` (G.W3 Lane B), `scripts/proof-as-any-budget.mjs` (G.W3 Lane D), `scripts/proof-no-bare-builtins.mjs` (G.W3 Lane K, extended at H.W3 Lane E).
- Module-declaration precedent: `src/vite-env.d.ts` (`*.bbnf?raw`), `demo/color-picker/vite.d.ts` pre-Lane-D (`*.glsl?raw`).
