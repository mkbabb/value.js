# O.W1 — Subpath structural pre-work

- **Band:** A · **Class:** structural pre-work — the enabling seam for O.W2 (the exports
  map); each S-clause is a typecheck-clean step
- **Gate:** typecheck holds per step (no new TS errors after each S-clause); a
  `proof:subpath-precheck` node gate confirms the `units/` subpath is parse-that-free
- **Folds:** D2 (grammar ownership — value.js owns the one grammar; subpaths are the
  delivery vehicle), D7 (SOTA perf — subpath split is the prerequisite for tree-shaking
  the parse-that weight), the campaign blueprint §3 O.W1 row
- **Precept cure:** the 145 KB monolith dissolved — no consumer currently gets a tree-
  shaken value.js; every import pulls the full grammar + parse-that chain

---

## Context

value.js 0.13.0 ships as a single entry: `dist/value.js`. Every consumer that imports
`@mkbabb/value.js` receives the complete graph:

```
./dist/value.js
  → src/parsing/index.ts         (imports @mkbabb/parse-that)
  → src/parsing/stylesheet.ts    (imports @mkbabb/parse-that)
  → src/parsing/color.ts         (imports @mkbabb/parse-that)
  → src/parsing/math.ts          (imports @mkbabb/parse-that)
  → src/parsing/easing.ts        (imports @mkbabb/parse-that)
  → src/units/index.ts           (line 1: re-exports from ../parsing/color →
                                   pulls @mkbabb/parse-that into the units subgraph)
```

A consumer that only needs `Color`, `ValueUnit`, `lerpValue`, or `SpringProgress` — zero
CSS parsing — still pays for the full parse-that grammar. The subpath split (O.W2) changes
this: `@mkbabb/value.js/color` → zero parse-that in the chunk. O.W1 authors the three
structural changes that make O.W2 possible without breaking the monolithic build:

1. **Sever `units/index.ts:1`'s parse-that edge** (the re-export from `../parsing/color`
   that pulls the full parsing subgraph into the units chunk).
2. **Lazify `parseCSSValue`** so the heavy parsing path is not eagerly imported by
   color/unit consumers.
3. **Author `vite.library.ts`** — the multi-entry config (glass-ui pattern) that O.W2
   wires into `vite.config.ts`.

Each step is independently typecheck-clean. The existing monolithic `production` build
continues to pass throughout (no behavior change until O.W2 wires the new entries).

### The `units/index.ts:1` parse-that edge

`src/units/index.ts` line 1:
```ts
export { registerColorNames, clearCustomColorNames, getCustomColorNames } from "../parsing/color";
```

`src/parsing/color.ts` line 22:
```ts
import { Parser, all, any, dispatch, regex, string, whitespace } from "@mkbabb/parse-that";
```

This re-export draws `@mkbabb/parse-that` into the static import graph of `units/index.ts`.
Any subpath that re-exports from `units/index.ts` (the natural root of the `./units`
subpath) will bundle parse-that unless this edge is severed.

**The fix:** move `registerColorNames`, `clearCustomColorNames`, `getCustomColorNames` out of
`units/index.ts` into a separate `src/units/color-registry.ts` barrel (or move them to a
`src/parsing-utils.ts` that sits in the parsing subgraph where they belong). The `./units`
subpath barrel then re-exports only from `../units/` files that do NOT import parse-that.

### The `parseCSSValue` lazy edge

`src/index.ts` currently static-imports `parseCSSValue` from `src/parsing/index.ts`. For
the `./color` and `./units` subpaths to be parse-that-free, the root barrel (`src/index.ts`)
must not static-import from `src/parsing/` when those subpaths compose from it. The natural
solution is that each subpath barrel (authored in O.W2) imports ONLY from the modules it
needs — the subpath barrels are new files that compose from the existing source files without
going through the monolithic `src/index.ts`. `src/index.ts` keeps its current shape; it is
the `"."` root export, not the subpath entry. This is the glass-ui pattern (curated barrels
per subpath, not a re-export of the monolithic root).

For `parseCSSValue` specifically: it remains in `src/parsing/index.ts`; the `./parsing`
subpath barrel imports it. No consumers of `./color` or `./units` reach `parseCSSValue`.
"Lazify" in the campaign blueprint means: make the import graph such that static analysis can
tree-shake parse-that out of the non-parsing subpaths — achieved by the subpath-barrel
composition, not by a runtime `await import()`.

### The `vite.library.ts` multi-entry config (glass-ui pattern)

glass-ui's `vite.library.ts` (at `/Users/mkbabb/Programming/glass-ui/vite.library.ts`) is
the reference implementation. It exports:

```ts
export function libraryEntries(rootDir: string): Record<string, string>
export function libraryFileName(_format: string, entryName: string): string
export const libraryExternal: string[]
```

`libraryEntries` maps logical entry names (`"index"`, `"color"`, `"parsing"`, …) to absolute
source paths. `vite.config.ts`'s `production` mode calls `libraryEntries(import.meta.dirname)`
and passes the result as `build.lib.entry`. Each entry produces one chunk in `dist/` —
`dist/color.js`, `dist/parsing.js`, etc.

O.W1 authors the `vite.library.ts` for value.js. Its entries are a SPEC (the actual
barrel files are authored in O.W2; O.W1 only creates the config file and the stub
barrel files needed for it to typecheck). The production build continues to use only the
`"index"` entry (the monolithic root) throughout O.W1 — the multi-entry build fires in O.W2.

---

## Scope

### S1 — `units/index.ts:1` parse-that edge severed

**Breach.** `src/units/index.ts:1` re-exports
`{ registerColorNames, clearCustomColorNames, getCustomColorNames }` from
`../parsing/color`, which statically imports `@mkbabb/parse-that`. This drags the full
parse-that module graph into the static closure of `units/index.ts`.

**Cure.** Move the three color-name registry symbols out of `units/index.ts` into a
dedicated module that sits in the parsing subgraph. Two valid approaches:

- **Option A (preferred, KISS):** Create `src/parsing/color-registry.ts` that ONLY re-exports
  the three symbols from `../parsing/color` (a thin barrel). Update `units/index.ts:1` to
  re-export from `../parsing/color-registry` only IF the units subpath barrel needs them;
  otherwise remove the re-export from `units/index.ts` entirely and add them to the root
  `src/index.ts` barrel directly (they already appear there as part of the monolithic surface).
  
- **Option B:** Delete line 1 from `units/index.ts` entirely. Add a direct re-export from
  `src/parsing/color.ts` in `src/index.ts` (the monolithic root already covers this surface —
  confirm the three symbols appear in the root barrel; if so, the `units/index.ts` re-export
  is redundant for the monolithic path).

The decision between A and B is an implementation choice; both produce the same observable.
The invariant: after S1, `src/units/index.ts` has ZERO static imports (direct or transitive)
from `@mkbabb/parse-that`.

**Falsifiable check.** After S1: `npx madge --circular src/units/index.ts` shows no
`parse-that` node in the dependency graph of `units/index.ts`; `tsc --noEmit` (via
`npm run typecheck`) exits 0; the existing test suite passes.

### S2 — Subpath barrel stubs authored (`src/subpaths/*.ts`)

**Breach.** No subpath barrels exist. O.W2 cannot wire the exports map without files to
point at.

**Cure.** Author stub subpath barrels in `src/subpaths/`:

| File | Re-exports from |
|---|---|
| `src/subpaths/color.ts` | `../units/color/…` + `../units/color-registry.ts` (or the color-only nodes from `src/units/`) |
| `src/subpaths/parsing.ts` | `../parsing/index.ts`, `../parsing/stylesheet.ts`, `../parsing/scroll-timeline.ts`, `../parsing/extract.ts`, `../parsing/animation-shorthand.ts` |
| `src/subpaths/math.ts` | `../math.ts` (the math/scale/lerp utilities) |
| `src/subpaths/easing.ts` | `../parsing/easing.ts` (the easing parser) |
| `src/subpaths/transform.ts` | `../parsing/transform.ts` (if it exists) or the transform-related nodes |
| `src/subpaths/units.ts` | `../units/index.ts` (post-S1, parse-that-free) |
| `src/subpaths/quantize.ts` | `../parsing/quantize/…` or the quantize module |

The stub barrels only need to compile cleanly — the exact re-export set is finalized in
O.W2. O.W1 authors enough to make `vite.library.ts` typecheck and to confirm each stub
imports from a parse-that-free source (for the non-parsing subpaths).

**Falsifiable check.** `npm run typecheck` exits 0 after stub authoring. Each
non-parsing subpath stub (`color`, `math`, `units`, `quantize`) has zero parse-that
nodes in its `madge` graph after S1.

### S3 — `vite.library.ts` authored (multi-entry config, glass-ui pattern)

**Breach.** `vite.config.ts` production mode uses a single-entry `lib.entry`:
```ts
lib: {
    entry: path.resolve(import.meta.dirname, "src/index.ts"),
    name: "Value",
    fileName: "value",
    formats: ["es"],
},
```
A multi-entry build requires the entry to be a `Record<string, string>` (Rolldown/Vite
multi-lib pattern) — not supported by the current single-entry shape.

**Cure.** Author `vite.library.ts` at the repo root (parallel to the existing
`vite.config.ts`) following the glass-ui pattern:

```ts
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

// Entry map: logical name → absolute path to subpath barrel
export function libraryEntries(rootDir: string): Record<string, string> {
    const curated: Record<string, string> = {
        // The monolithic root (the "." export) — always present
        index: resolve(rootDir, "src/index.ts"),
    };

    // Batch-resolve the src/subpaths/*.ts barrels authored in S2
    const subpathsDir = resolve(rootDir, "src/subpaths");
    const batched: Record<string, string> = {};
    for (const file of readdirSync(subpathsDir)) {
        if (!file.endsWith(".ts")) continue;
        const name = file.slice(0, -3); // strip .ts
        batched[name] = resolve(subpathsDir, file);
    }

    return { ...curated, ...batched };
}

// Chunk filename: index → "value.js" (legacy name preserved); others → "<name>.js"
export function libraryFileName(_format: string, entryName: string): string {
    return entryName === "index" ? "value.js" : `${entryName}.js`;
}

// External modules: never bundled into any subpath chunk
export const libraryExternal: (string | RegExp)[] = [
    "@mkbabb/parse-that",
    /^prettier(\/.*)?$/,
];
```

O.W1 authors this file; O.W2 wires it into `vite.config.ts` and verifies the multi-entry
build actually produces separate chunks.

**Falsifiable check.** `vite.library.ts` exists at the repo root; it typechecks; importing
it from `vite.config.ts` (as a dry `import { libraryEntries }` without changing the build
mode) does not break the existing production build.

### S4 — Typecheck invariant: clean at each step

**Breach (risk).** The three structural changes in S1–S3 could introduce TS errors if
re-exports are removed before being provided elsewhere, or if the subpath stub barrels
have type mismatches.

**Cure.** Each S-clause is independently committed (or confirmed independently clean)
against `npm run typecheck` — i.e., `vue-tsc -p tsconfig.lib.json --noEmit` and
`vue-tsc -p tsconfig.demo.json --noEmit` both exit 0. The monolithic
`npm run build` (production mode, single-entry) also passes after each step.

**Falsifiable check.** After each of S1, S2, S3: `npm run typecheck` exits 0 AND
`npm run build` exits 0. No new TS errors introduced at any step.

---

## Born-RED gate

**Gate name:** `proof:subpath-precheck` (NEW, this wave — a node gate).
**Tier:** hygiene (static-import-graph analysis, no browser).

**The REAL observable.** The gate must confirm the parse-that edge is severed — not by
inspecting source text (a source-grep would pass even if the re-export was merely moved
to a differently-named file), but by tracing the ACTUAL import graph from `units/index.ts`
and asserting the absence of `@mkbabb/parse-that` in the transitive closure.

**Structure.** `scripts/proof-subpath-precheck.mjs` (a node gate):

```
1. Run `npx madge --json src/units/index.ts` (or equivalent) and assert
   no entry in the dependency tree mentions `@mkbabb/parse-that` or
   `node_modules/@mkbabb/parse-that`.
   Born-RED condition: today `units/index.ts` transitively reaches
   `parsing/color.ts` → `@mkbabb/parse-that`.

2. Assert `src/vite.library.ts` exists and can be imported without throwing.

3. Assert each stub barrel in `src/subpaths/` exists (the set from S2).

4. Assert `npm run typecheck` exits 0 (a process.spawn check).
```

**Today's tree result.** `proof:subpath-precheck` exits 1 on today's tree:
- Clause 1: `madge src/units/index.ts` reveals `@mkbabb/parse-that` in the transitive
  closure (the `../parsing/color` re-export at line 1 is live).
- Clause 2: `vite.library.ts` does not exist.
- Clause 3: `src/subpaths/` does not exist.
The gate REDs because none of the three structural prerequisites exist yet.

**Green condition.** All three clauses pass: `units/index.ts` is parse-that-free, the
`vite.library.ts` config exists and loads, and the subpath stubs exist and typecheck.
`npm run typecheck` and `npm run build` are clean.

---

## Dependencies

- **O.W0 (the P0 crash fix) is a soft predecessor.** O.W1 does not require O.W0 to be
  done first — the structural re-wiring in S1–S3 does not touch `handleGradient` or the
  nesting parser. However, since O.W0 modifies `src/parsing/index.ts` and O.W1 modifies
  `src/units/index.ts` + authors new files, they touch disjoint surfaces and CAN be
  done in parallel. The DAG shows O.W0 ∥ O.W1 (both are Band-A).
- **parse-that A.W0 is NOT required.** The `units/index.ts` edge severs against the
  CURRENT parse-that import (removing the re-export from `units/index.ts` doesn't
  require parse-that to change). The clean separation is value.js-internal.
- **O.W2 depends on O.W1.** O.W2 wires the multi-entry build and authors the exports
  map — it requires `vite.library.ts` (S3), the stub barrels (S2), and the parse-that-free
  units subgraph (S1) to exist.

---

## Excluded from this wave

- **The actual multi-entry build** (producing `dist/color.js`, `dist/parsing.js`, etc.)
  — O.W2. O.W1 only authors the config and stubs.
- **The `exports` map in `package.json`** — O.W2. No `package.json` change in O.W1.
- **`sideEffects` annotation** — O.W2.
- **The full subpath barrel content** (exact re-export sets, covering every public symbol
  in each subpath) — O.W2 finalizes the barrel content; O.W1 authors stubs sufficient for
  typechecking.
- **Any grammar or perf work** — O.W3 through O.W6.
