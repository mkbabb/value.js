# F.W3 — Lane D — dts-shape invariant guard

**Date**: 2026-05-21
**Lane**: F.W3 Lane D — CI hygiene (dts layout regression guard).
**Authority**: F.W3.md Lane D + F-AUDIT-3 §6 + F-AUDIT-6 §6.
**Dispatch HEAD**: `df0650c` (F.W2 close).
**Files touched**: `scripts/proof-dts-layout.mjs` (new), `package.json` (script entry), `.github/workflows/node.js.yml` (CI step).

---

## §1 — Motivation

The W12-unblocker commit `e1549e0` flattened `dist/` dts emission. Pre-unblocker, vite-plugin-dts emitted typings under `dist/src/...`; post-unblocker, they emit flat (`dist/index.d.ts` + per-subdir like `dist/units/`, `dist/parsing/`, etc.).

F.W3 Lane D adds a guard so any regression back to the per-source `dist/src/` layout fails CI before downstream consumers (keyframes.js, glass-ui) hit the broken types resolution.

The check is intentionally minimal — two filesystem assertions are sufficient signal:

1. `dist/index.d.ts` MUST exist (the barrel typings).
2. `dist/src/` MUST NOT exist (regression marker).

---

## §2 — Barrel filename verification

The F.W3.md spec named `dist/value.d.ts` as a probe but instructed verifying the actual barrel filename. Verification:

```
$ ls dist/*.d.ts
dist/easing.d.ts
dist/index.d.ts
dist/math.d.ts
dist/utils.d.ts

$ grep -c '^export' dist/index.d.ts
40

$ jq -r '.types, .exports["."].types' package.json
./dist/index.d.ts
./dist/index.d.ts
```

The canonical barrel is **`dist/index.d.ts`** (carries 40 `export ...` lines and matches both `package.json` "types" and `exports["."].types`). The script's check uses `index.d.ts`, not `value.d.ts`.

---

## §3 — Files added/modified

### A. `scripts/proof-dts-layout.mjs` (NEW)

```javascript
#!/usr/bin/env node
/**
 * Verifies dist/ dts emission is at the flat layout (post-W12-unblocker e1549e0).
 * ...
 */
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "../dist");
const errors = [];

if (!fs.existsSync(path.join(dist, "index.d.ts"))) {
    errors.push("dist/index.d.ts MISSING (W12-unblocker regression)");
}
if (fs.existsSync(path.join(dist, "src"))) {
    errors.push("dist/src/ PRESENT (W12-unblocker regression — should be flat)");
}

if (errors.length > 0) {
    console.error("[proof:dts-layout] FAIL");
    errors.forEach((e) => console.error("  - " + e));
    process.exit(1);
}
console.log("[proof:dts-layout] PASS — flat dist/ dts emission");
```

Style matches `scripts/proof-resolution-contract.mjs`: ESM, `node:fs`/`node:path`, top-level await/imports, `process.exit(0|1)` semantics, `[proof:<name>] PASS|FAIL` log convention.

### B. `package.json` — script entry

Added under `"scripts"`:

```json
"proof:dts-layout": "node scripts/proof-dts-layout.mjs",
```

### C. `.github/workflows/node.js.yml` — CI step

Added immediately after `npm run build` + `Log dist sizes`:

```yaml
            - name: Proof — dts layout invariant (W12-unblocker regression guard)
              run: npm run proof:dts-layout
```

---

## §4 — Verification matrix

| Check | Method | Outcome |
|-------|--------|---------|
| YAML syntax valid | `python3 -c "import yaml; yaml.safe_load(...)"` | PASS |
| `dist/index.d.ts` exists | filesystem | PRESENT |
| `dist/src/` does not exist | filesystem | ABSENT |
| `npm run proof:dts-layout` (fresh build) | `npm run build && npm run proof:dts-layout` | PASS — flat dist/ dts emission |
| Script idiomatic ESM | top-level `import`, `import.meta.dirname`, `process.exit` | MATCHES sibling proof script |
| Barrel resolution matches package.json | "types" / exports["."].types both `./dist/index.d.ts` | CONSISTENT |

---

## §5 — Sub-gate verdict

**Lane D sub-gate: PASS**

`scripts/proof-dts-layout.mjs` authored, `proof:dts-layout` npm script wired, CI step added immediately after `npm run build`. A `dist/src/` regression or missing `dist/index.d.ts` will now fail CI. Local `npm run proof:dts-layout` confirms PASS at F.W3 Lane D close.
