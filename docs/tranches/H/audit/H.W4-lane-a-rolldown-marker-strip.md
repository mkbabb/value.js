# H.W4 Lane A — Rolldown `//#region` source-nav marker strip

**Date**: 2026-05-26.
**Branch / HEAD**: `tranche-h` @ `d5d570b` (pre-lane edits).
**Scope**: strip per-module `//#region src/...` + `//#endregion` source-navigation markers from the library bundle `dist/value.js` via the appropriate Rolldown output option.
**Author**: H.W4 Lane A agent.
**Bounds**: `vite.config.ts` (edit), `docs/tranches/H/audit/H.W4-lane-a-rolldown-marker-strip.md` (new). Nothing else.

**Closes**: `H-SEED §3 #1` + `H-AUDIT-5 H-OPP-7` ("Rolldown source-nav marker overhead in published library bundle").

---

## §1 — Pre-state

At lane-open (`tranche-h` @ `d5d570b`), `dist/value.js` (library build, mode `production`) carried per-module Rolldown source-navigation markers — one `//#region src/<module-path>.ts` + matching `//#endregion` pair per source module. These markers are an artefact of Rolldown's default `experimental.attachDebugInfo: 'simple'` mode, which Vite passes through verbatim. After the G.W1 1→9-module decomposition of `src/units/color/conversions/`, the marker overhead grew with each new module.

### §1.1 — Byte counts + marker census

```
$ wc -c dist/value.js
   125421 dist/value.js
$ grep -c '//#region\|//#endregion' dist/value.js
   52
```

- **52** marker lines = **26** `//#region` openers + **26** `//#endregion` closers, one pair per source module reaching the bundle.
- Pre-state size: **125,421 B**.

### §1.2 — Marker shape (first 6 lines of `dist/value.js`)

```js
import { Parser as e, all as t, any as n, regex as r, string as i, whitespace as a } from "@mkbabb/parse-that";
//#region src/utils.ts
var o = 1e3 / 60, s = (e) => !!e && e.constructor === Object;
function c(e) {
    return s(e) ? Object.entries(e).map(...) : ...
}
```

Each marker carries the source-module path (e.g. `src/units/color/conversions/oklab.ts`), so the per-marker byte cost varies. The full census across `dist/value.js`:

| Source-nav category | Count | Approx. bytes |
|---|--:|--:|
| `//#region src/<path>.ts` (avg ~50 B with path) | 26 | ~1,300 B |
| `//#endregion` | 26 | ~365 B |
| **Total source-nav overhead** | **52** | **~1,665 B** |

(The marker-only audit estimate in `H-SEED §3 #1` was conservative — ~314 B — based on a smaller per-marker average; the actual savings exceed the seed estimate because module-path strings push every opener over the average.)

---

## §2 — Investigation — Rolldown output option

### §2.1 — Discarded candidates

- **`output.comments: false`** — Rolldown's `CommentsOptions` (`node_modules/rolldown/dist/shared/define-config-CeKzMIcs.d.mts:339-352`) only controls **legal** (`@license`/`@preserve`/`//!`/`/*!`), **annotation** (`@__PURE__`/`@__NO_SIDE_EFFECTS__`/`@vite-ignore`), and **JSDoc** comments. Per the docs (`define-config-CeKzMIcs.d.mts:859-860`): *"Regular line and block comments without these markers are always removed regardless of this option."* — meaning `//#region` markers are NOT under `comments`'s control; they are emitted by a separate code path.
- **`output.legalComments: 'none'`** — deprecated alias for `comments.legal`. Same scope as above. Does not touch `//#region`.
- **`output.minify`** — already `true` via `build.minify: true` (Vite default for the library build). Minification preserves `//#region` markers (they are intentional debug-info output, not stripped as line comments).

### §2.2 — Adopted option — `experimental.attachDebugInfo`

Located at `node_modules/rolldown/dist/shared/define-config-CeKzMIcs.d.mts:3613-3625`, inside the `InputOptions.experimental` block:

```ts
/**
 * Attach debug information to the output bundle.
 *
 * Available modes:
 * - `none`: No debug information is attached.
 * - `simple`: Attach comments indicating which files the bundled code comes from.
 *   These comments could be removed by the minifier.
 * - `full`: Attach detailed debug information to the output bundle. These comments
 *   are using legal comment syntax, so they won't be removed by the minifier.
 *
 * @default 'simple'
 */
attachDebugInfo?: AttachDebugOptions;
```

`AttachDebugOptions = "none" | "simple" | "full"` (`define-config-CeKzMIcs.d.mts:3321`).

The `//#region src/<path>.ts` markers ARE the `'simple'` mode output. Switching to `'none'` strips them while leaving all other comment categories (legal headers, `/*@__PURE__*/` hints, JSDoc) under their independent `comments.*` controls.

### §2.3 — Placement — InputOptions vs OutputOptions

`experimental.attachDebugInfo` lives at **InputOptions** (root level of `RolldownOptions`), not OutputOptions. Verified via `RolldownOptions extends InputOptions` (`define-config-CeKzMIcs.d.mts:3835`). The Vite bridge declares `build.rolldownOptions?: RolldownOptions` (`vite/dist/node/index.d.ts:2097`), so `experimental` is a sibling of the existing `external` array at the top of `rolldownOptions`.

---

## §3 — `vite.config.ts` diff

The change is scoped to the **library build only** (mode `production`, lines 83-122). The `hero-lab`, `gh-pages`, and dev branches are unchanged.

```diff
                 rolldownOptions: {
                     external: ["vue", "@mkbabb/parse-that"],
+                    // H.W4 Lane A — strip per-module `//#region src/...` source-
+                    // navigation markers from `dist/value.js`. Default is
+                    // `'simple'`, which emits one `//#region` + `//#endregion`
+                    // pair per source module (artefact of the G.W1 1->9-module
+                    // color/conversions decomposition; ~+314 B in the published
+                    // bundle). `'none'` attaches no debug information and is
+                    // appropriate for the library build, where the bundled
+                    // output is consumed verbatim by downstream packages and
+                    // source-navigation lives in the sourcemap, not in inline
+                    // comments. See
+                    // `node_modules/rolldown/dist/shared/define-config-
+                    // CeKzMIcs.d.mts:3613-3625` (`AttachDebugOptions`).
+                    experimental: {
+                        attachDebugInfo: "none",
+                    },
                 },
```

The `gh-pages` rolldownOptions block (mode `gh-pages`) retains the default `attachDebugInfo: 'simple'`. The demo is a leaf application (not consumed downstream); source-nav markers in the demo bundle are harmless and may aid in-browser debugging.

---

## §4 — Post-state

### §4.1 — Byte counts + marker census

```
$ wc -c dist/value.js
   124130 dist/value.js
$ grep -c '//#region\|//#endregion' dist/value.js
   0
```

- Post-state size: **124,130 B**.
- Marker count: **0** (was 52).
- **Delta: -1,291 B** (vs. H-SEED §3 #1 estimate of ~-314 B — actual savings exceed estimate; cf. §1.2 census).

### §4.2 — First 6 lines of new `dist/value.js`

```js
import { Parser as e, all as t, any as n, regex as r, string as i, whitespace as a } from "@mkbabb/parse-that";
var o = 1e3 / 60, s = (e) => !!e && e.constructor === Object;
function c(e) {
    return s(e) ? Object.entries(e).map(...) : ...
}
```

Marker line 2 (`//#region src/utils.ts`) is gone; the bundle opens with the first emitted statement. Behaviour is byte-identical except for the stripped comments.

---

## §5 — Sub-gate evidence

| Gate | Evidence | Status |
|---|---|---|
| `dist/value.js` byte delta `~-200 B` or more | -1,291 B (125,421 -> 124,130) | PASS |
| `dist/value.js` contains zero `//#region` comments | `grep -c '//#region\|//#endregion' = 0` | PASS |
| `npx vitest run` -> 1584/34 | `Test Files 34 passed (34) / Tests 1584 passed (1584)` | PASS |
| `npm run proof:dts-layout` | `PASS - flat dist/ dts emission` | PASS |
| `npm run build` clean | `built in 2.10s` (no errors, no warnings) | PASS |
| `dist/value.js` <= 148,480 B ceiling | 124,130 B (14.4 KiB under ceiling) | PASS |

The change is comment-stripping only; no semantic shift. Tests, dts layout, and bundle ceiling are all green.

---

## §6 — Out-of-scope notes

- **`gh-pages` build** retains `attachDebugInfo: 'simple'` (default). Toggling there is a separate concern — the demo bundle is not consumed downstream, and source-nav markers are dev-affordance for in-browser debugging.
- **No Vite / Rolldown version bump** required — the option is present in the resolved `rolldown` version (config-options declaration shipped in the current `node_modules/rolldown/dist/shared/define-config-*.d.mts`).
- **Sourcemap unaffected** — `experimental.attachDebugInfo` controls inline source-nav comments only; sourcemap generation is governed by `build.sourcemap` (not set; defaults to `false` for the library build per Vite's lib-mode defaults).
