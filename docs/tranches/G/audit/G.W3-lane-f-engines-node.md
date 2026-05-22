# G.W3 Lane F — API-2: `engines.node` declaration

**Wave**: G.W3 (Lane F — API-2).
**Branch / HEAD at open**: `tranche-g` @ `c57ec01`.
**Finding origin**: `audit/G-AUDIT-6-api-e2e-ci.md §1.3 + §1.6` (G-OPP-API-2, FOLD-INTO-G).
**Status**: COMPLETE — sub-gate GREEN.

---

## §1 — The finding

Per `G-AUDIT-6 §1.3`: `api/package.json` declared **no `"engines"`** field, while:

- the root `value.js` `package.json` pins `"node": ">=22"`,
- `api/Dockerfile` builds against a **Node 22-alpine** base,
- `api/compose.yaml` runs that image.

The deploy environment is already Node 22+; the absence of an `engines`
declaration left that invariant **implicit**. Declaring it makes the deploy
posture explicit + aligns api/ with the constellation Node 22+ stance.

---

## §2 — The change

Added to `api/package.json`, placed conventionally after `"type": "module"` and
before `"scripts"`:

```json
"engines": {
    "node": ">=22"
}
```

This mirrors the root `value.js` `package.json` `engines.node` value verbatim.

---

## §3 — Lockfile verdict

Per the sub-gate, `cd api && npm install --legacy-peer-deps --package-lock-only`
was run to regenerate `api/package-lock.json`.

**Verdict: drift IS required — exactly 3 lines, all the `engines` mirror.**

npm propagates the root-package `engines` block into the lockfile's
`packages[""]` (root package) node. The full diff:

```diff
diff --git a/api/package-lock.json b/api/package-lock.json
@@ -22,6 +22,9 @@
                 "tsx": "^4.19.0",
                 "typescript": "^5.7.0",
                 "vitest": "^3.2.4"
+            },
+            "engines": {
+                "node": ">=22"
             }
         },
```

No dependency version churn, no `node_modules/*` entry changes — the regenerated
lockfile differs from the committed one ONLY by the `engines` block that mirrors
the `package.json` addition. The lockfile is now consistent with `package.json`.

---

## §4 — Sub-gate verification

- **`engines.node` declared** — `">=22"` in `api/package.json`. ✓
- **`npm install --legacy-peer-deps --package-lock-only`** — regenerates cleanly; the only drift is the 3-line `engines` mirror in the lockfile root node (expected + committed). ✓

**Sub-gate F: GREEN.**

---

## §5 — Files modified

| File | Change |
|---|---|
| `api/package.json` | added `"engines": { "node": ">=22" }` |
| `api/package-lock.json` | 3-line `engines` mirror in the root-package node |
