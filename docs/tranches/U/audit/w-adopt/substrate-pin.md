# U.W-ADOPT — glass-ui substrate pin

**Lane:** substrate-pin (U.W-ADOPT)
**Date:** 2026-07-13
**Consumer:** value.js `tranche-u` · `@mkbabb/glass-ui: file:../glass-ui`

## The pin

**Pin ref: `2e559f7a`** (glass-ui `tranche/BI` — "BI B0 registrar 2: regen-exports --write
re-pin: ./blob in, ./goo-blob OUT, typesVersions follow").

### Why this ref

The live producer tree (`tranche/BI` HEAD `da051943`, ~158 dirty files, active fleet) ships a
`dist/` that is broken on two axes **unrelated to value.js**:

1. **Dangling CSS import.** `dist/styles/dock.css` `@import`s `./dock/morph-bridge.css`, a file
   the B3 morph-bridge→morph split dropped without regenerating the aggregator import list
   (`dist/styles/dock/morph.css` ships; `morph-bridge.css` does not). value.js `PaneHeader.vue`
   pulls a dock style subpath → Vite CSS resolver hard-fails → `npm run gh-pages` dies.
2. **Zero `.d.ts`.** The HEAD dist ships `find dist -name '*.d.ts' | wc -l` = **0**. value.js
   `npm run typecheck` (vue-tsc) dies **TS7016** on every glass-ui subpath import.

`2e559f7a` is the **most recent producer ref whose tree is coherent**:

- **post-blob-rename** — `./blob` export live, `./goo-blob` gone (the L17 consume-swap landed
  value.js-side at `110b56f` requires this; the substrate must export `./blob`).
- **pre-morph-churn** — both the `morph-bridge.css` *source file* AND the `dock.css` aggregator
  `@import` exist, so a clean build produces a resolvable CSS graph.

dist is `.gitignore`d in glass-ui (not committed), so the pin required a **build**, done in an
isolated detached worktree — **zero writes to the producer tree**:

```
git -C ../glass-ui worktree add .claude/worktrees/glass-ui-pinned 2e559f7a   # metadata-only
cd .claude/worktrees/glass-ui-pinned && npm ci && npm run build              # 198 pkgs; vite + emit-types
```

## Verification of the pinned build

| check | pinned `2e559f7a` | broken HEAD `da051943` |
|---|---|---|
| `./blob` export in package.json | `{types: ./dist/blob.d.ts, import: ./dist/blob.js}` | same key, but no `.d.ts` on disk |
| `dist/blob.js` | PRESENT (103,906 B) | present |
| `dist/blob.d.ts` | PRESENT (42 B) | **absent** |
| `.d.ts` count in dist | **773** | **0** |
| CSS `@import` audit (111 files / 110 imports) | **0 unresolved** | 1 unresolved (`morph-bridge.css`) |
| `dist/styles/dock/morph-bridge.css` | PRESENT | **MISSING** (dangling import) |
| package.json version | `5.0.0` | `5.0.0` |

CSS audit = every `@import "…"` in every `dist/styles/**/*.css` resolved against the importing
file's dir; all 110 targets exist.

`.goo-blob-*` internal contract preserved across the L17 rename (verified in the `2e559f7a`
blob source): class renamed `GooBlob`→`Blob`, subpath `./goo-blob`→`./blob`, but
`.goo-blob-wrapper` / `.goo-blob-canvas` / `.goo-blob-hit` + `data-testid="goo-blob-canvas"` /
`data-testid="goo-blob-hit"` are byte-stable. value.js `HeroBlob.vue` binds `.goo-blob-hit`;
the contract holds.

## Repoint (both substrate paths)

value.js resolves `file:../glass-ui` through two symlinks; both retargeted to the pinned build.

| path | nature | OLD target | NEW target |
|---|---|---|---|
| `node_modules/@mkbabb/glass-ui` (MAIN tree) | plain symlink | `../../../glass-ui` (→ sibling) | `/Users/mkbabb/Programming/value.js/.claude/worktrees/glass-ui-pinned` |
| `.claude/worktrees/glass-ui` (LANE substrate) | plain symlink (NOT a linked worktree) | `/Users/mkbabb/Programming/glass-ui` (→ sibling) | `glass-ui-pinned` (relative, same dir) |

The LANE substrate symlink is the `file:../glass-ui` target for every value.js lane worktree
(a lane's `node_modules/@mkbabb/glass-ui -> ../../../glass-ui` resolves to
`.claude/worktrees/glass-ui`). Retargeting that ONE symlink repoints every lane to the pinned
dist. Both symlinks resolve to glass-ui `5.0.0` with `dist/blob.js` reachable.

## Consumer verification (MAIN tree, `tranche-u`)

- `npm run typecheck` → **exit 0** (no TS7016 — the 773 `.d.ts` land).
- `npm run gh-pages` → **green** (`✓ built in ~5s`; no morph-bridge/CSS resolution error;
  `dist/gh-pages/index.html` + assets emitted). The only build warnings are @vueuse/core
  `/* #__PURE__ */` Rolldown annotation notes — unrelated to glass-ui.

## Unpin condition

Unpin and resume tracking `file:../glass-ui` at HEAD when **either** lands first:

1. the glass-ui **5.0.0 tag** (which U.W-ADOPT floats on), **or**
2. a **coherent producer dist at HEAD** (`.d.ts` present + CSS `@import` graph fully resolved).

At unpin: retarget both symlinks back to `/Users/mkbabb/Programming/glass-ui` (the OLD targets
above) and remove the `glass-ui-pinned` worktree
(`git -C ../glass-ui worktree remove .claude/worktrees/glass-ui-pinned`).

## E-3 note (honest)

This pins the **consumed build at a coherent producer ref** — the same discipline value.js CI
already applies by pinning `tranche/BG`. **No consumer shim** (value.js source untouched — the
L17 import sites already target `./blob`), **no producer patch** (the glass-ui tree was never
written; the build ran in an isolated worktree). The producer's dist incoherence is theirs to
fix in the 5.0.0 cut; value.js merely selects the last coherent ref to consume until then.

## E-2 relay (owner standing edict)

Filed to the active glass-ui BI inbox:
`../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-13-bi-dist-breakage.md`
— committed path-scoped on `tranche/BI` at **`c66b5354`** (1 file, 117 insertions; the fleet's
own dirty files untouched). **NOT pushed**: `tranche/BI` has no upstream branch, so a plain
`git push` has no destination; per the plain-push-only / never-force rule the relay commit is
left **local** for the fleet to push with their own branch. Content: the A1/A2 breakage
evidence, the L17 landed-consume-swap confirmation, the pin notice, and the ask (5.0.0 ships a
whole dist).

## §co-land-preview — the U.W-LIB rename preview applied to the sandbox (2026-07-13)

**Trigger.** U.W-LIB landed the export renames (`d5efe2b` + barrel edits, HEAD `87b4eca`). The
pinned dist (`2e559f7a`) externalizes `@mkbabb/value.js` under the OLD names, so `npm run gh-pages`
died resolving them against the renamed `tranche-u` tree (demo unbootable). This section records the
**co-land PREVIEW**: the sanctioned migration applied to the **detached sandbox as UNCOMMITTED
working-tree edits only** — the real sibling migration stays owner-held at U.W-ADOPT, executed from
`docs/tranches/U/audit/w-lib/publish-packet.md §3`. **NO commit in the pinned worktree; NO write to
`/Users/mkbabb/Programming/glass-ui` (the live checkout) or its branches.**

### Mapping A — glass-ui pinned SRC (uncommitted working-tree edits, 6 files, 43/43 name-only)

The mapping comes from the LANDED tree (`git show HEAD:src/index.ts`), never guessed. Applied
case-sensitive, whole-word (`perl -i -pe 's/\bOLD\b/NEW/g'`) across `src/**/*.{ts,vue}`:

| Old (gone) | New | occ in pinned src |
|---|---|---|
| `srgbToOKLab` | `srgb2oklab` | 11 |
| `rawOklabToOklch` | `rawOklab2oklch` | 11 |
| `rawOklchToOklab` | `rawOklch2oklab` | 13 |
| `oklabToLinearSRGB` | `oklab2linearSrgb` | 6 |
| `oklabToRgb255` | `oklab2rgb255` | 5 |

**Reconciliation with publish-packet §3 (U-F34).** The packet's U-F34 table (probed against
glass-ui `c66b5354`) enumerates **3** renamed conversion imports. The **pinned substrate ref
`2e559f7a`** — the ref this sandbox actually builds — imports **5**: it adds `oklabToLinearSRGB`
(`composables/color/index.ts`) and `oklabToRgb255`, both externalized by the pre-rebuild pinned
dist (`color-CN343HXv.js`). This is src drift between `2e559f7a` (consumed) and `c66b5354`
(packet-probed). **The real ADOPT migration must extend U-F34 to the 5-name set against whichever
glass-ui ref the 5.0.0 cut carries.** NOT touched: glass-ui-internal `linearToSrgb` (own fn,
`auroraFallbackGround.ts`), `oklabToLinearSrgb`/`srgbToLinear` (GLSL/WGSL shader fns) — case- and
spelling-distinct, verified untouched (58/42/13 occ before ≡ after).

### Mapping B — keyframes pinned NODE_MODULES copy (sandbox dist artifact)

The task premise ("keyframes clean") held only for the *conversion* names; the U-F29 rename
`parseCSSSubValue → parseCSSValues` (publish-packet §3 keyframes bullet, `329932b`) is a **second
break** the demo hits via glass-ui's dist → its bundled keyframes. The offending importer is the
sandbox copy `glass-ui-pinned/node_modules/@mkbabb/keyframes.js/dist/parse-flatten-ZZUSEQEL.js` (a
**real dir**, NOT a symlink — a node_modules artifact inside the sandbox, same nature as the
value.js copy refreshed below). Patched the single import specifier
(`parseCSSSubValue as s` → `parseCSSValues as s`), sandbox-only. **The LIVE keyframes checkout
(`/Users/mkbabb/Programming/keyframes.js/dist/engine/index.js`) was NOT touched** and still carries
the old name — its real migration rides U-F77 at its own cut (packet §3).

### node_modules resolution repoint

`glass-ui-pinned/node_modules/@mkbabb/value.js` was a stale **`3.1.0` copy** (36 OLD-name occ in its
dist) used by glass-ui's `emit-types` (vue-tsc). Refreshed its `dist/` + `package.json` from the
live renamed build (`npm run build` in the main tree first) → **0** OLD-name occ; `srgb2oklab`
resolvable in its `index.d.ts`. Sandbox node_modules only.

### Rebuild verification (pinned dist — `npm run build` = vite + vue-tsc emit-types, green)

| check | pre-rebuild | post-rebuild | want |
|---|---|---|---|
| OLD value.js names externalized in `dist/*.js` | **9** | **0** | 0 |
| NEW names externalized | — | `srgb2oklab`×3 `rawOklab2oklch`×3 `rawOklch2oklab`×1 `oklab2linearSrgb`×1 `oklab2rgb255`×1 | present |
| `.d.ts` count in dist | 773 | **773** | 773 |
| `dist/blob.js` | 103906 B | **103906 B** | 103906 |
| `dist/blob.d.ts` | 42 B | **42 B** | 42 |
| `dist/styles/dock/morph-bridge.css` | PRESENT | **PRESENT** | present |
| CSS `@import` audit | 111 files / 110 imports | **0 unresolved** | 0 |
| `./blob` export + package.json version | `5.0.0` | **`5.0.0`** | 5.0.0 |

### Consumer verification (value.js MAIN tree, `tranche-u`)

- `npm run build` → renamed dist (0 OLD conversion names).
- `npm run typecheck` → **exit 0**.
- `npm run gh-pages` → **GREEN** (exit 0; `dist/gh-pages/index.html` 13886 B + 120 assets; only the
  documented `@vueuse/core` `/* #__PURE__ */` Rolldown annotation notes remain).
- `npx vitest run test/tranche-u-lib.test.ts` → **20/20** (LIB slate green; the sibling-SRC census
  reads the renamed names, no old readers).
- Owner demo `http://localhost:9000/` → **HTTP 200**, app mount `<body id="app">` served, main
  entry + glass-ui subpath resolve 200/200, zero old-name resolution errors in the dev log
  (`scripts/dev/dev.sh up`, full honest stack: docker mongo `rs0` + local api :3000 + `VITE_API_URL`).

### Unpin / real-migration condition — UNCHANGED

The preview edits are **ephemeral sandbox state**, discarded when the pin lifts. The real migration
(both siblings' floor-widen + source rename, the 5-name glass-ui set + keyframes `parseCSSValues`)
executes for real at **U.W-ADOPT from publish-packet §3**, floating on the glass-ui `5.0.0` tag. The
unpin steps (retarget both symlinks to `/Users/mkbabb/Programming/glass-ui`, remove the worktree)
stand as written above.
