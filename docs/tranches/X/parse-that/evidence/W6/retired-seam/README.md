SERVED MODEL: claude-opus-5-5

# Retired seam — parse-that's CSS surface, moved here as evidence (X.P.W6.r, 2026-09-23)

Authority: owner ruling 2026-09-23, verbatim *"What you recommend. No custom grammar, unless it's BBNF."* — value.js COHESION §0by; spec `docs/tranches/X/parse-that/waves/W6.md` §Units `.r`.

Source: parse-that master `2382b30ec2bb5054f6af8c2e99c7c7304419be47` (bytes via `git archive HEAD`, paths preserved relative to the parse-that root). Removed from parse-that by the one ordinary `.r` commit that follows this one.

- `typescript/src/css/**` — the AC-1 22-op algebra, reifier, JS + Wasm lowerings, `build/ac1.wasm` (27 files)
- `typescript/test/css*` — css-color5 (WPT-derived), css-equivalence (differential harness + corpus), css-recovery, css-totality, css-var-animation (59 files)
- `typescript/scripts/` — css-only scripts: css-bench-three-leg, css-dual-target-identity, css-recovery-closure, css-universe, packed-candidate-surface, r1-anchor-candidate, rc-p-evaluate, wasm-admission (8 files)
- `experiments/w2/ac1-tagless/**` — the AC-1 prototype and the second tracked `ac1.wasm` (20 files)
- `uncommitted-x-p-w5-inflight.patch` — the stopped X.P.W5 seat's uncommitted edits to `typescript/src/css` (11 files, +58/−14), captured before deletion so nothing is lost

`MANIFEST.sha256` lists every file's sha256. `.b`/`.h` port the WPT cases and the harness/corpus from here into value.js tests.

- `untracked-x-p-w5-inflight/` — two UNTRACKED files the stopped X.P.W5.g seat left in `typescript/src/css` (`surface-widenings.mjs`, `build/css-surface.d.ts`), captured before removal (not in `MANIFEST.sha256`, which covers the tracked bytes)
