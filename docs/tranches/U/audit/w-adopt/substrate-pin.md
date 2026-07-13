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
