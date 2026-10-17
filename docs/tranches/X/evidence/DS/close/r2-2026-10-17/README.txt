X-DS CLOSE r2 (2026-10-17): gate evidence.

Heads: value.js 08ef4d5ab (tranche-u), keyframes.js 8e34f482 (master), fourier 2e11542 (m/w1-bump-migration).
value.js and keyframes.js were gated in detached worktrees at those heads (other seats' dirty hunks excluded); fourier in place (clean at HEAD).

HOST STOP: at 08:07 guarded refused the heavy slot: "kernel zone data.kalloc.1024 at 13.2M (panics near 20.8M): reboot the Mac"
(~/.claude/guard/log/zone.log: 13.16M at 07:46 -> 13.38M at 08:06). Per the machine law every heavy run stopped there
(value/vitest-1-refused-zone.log). Only --light type-checks ran after it.

Ran (x2, exit 0 both): value typecheck (clone worktree), keyframes `npm run check` (worktree), fourier `vue-tsc -b`.
Attempt 1 (value worktree with SYMLINKED node_modules; kept, discarded as a gate read, in value/symlinked-worktree-discarded/):
  typecheck 0 x2; vitest run 1 1225/1234 (the standing 7 + plate-mass G20/N-17, page.evaluate "execution context destroyed" on the
  cold vite dep cache), run 2 1227/1234 (exactly the standing 7);
  e2e smoke+smoke-admin+smoke-mobile (331 tests, workers 1, headless, own server :9293): 313 passed / 16 failed / 2 skipped.
  14 of the 16 are the standing X-W10 cells (W10-ADDENDUM-2026-10-16-cprime.md §1: o18 x5, o19 x4, o26, o28, webgl-blob-idle x2, o23:225).
  2 are worktree artefacts: B3 a11y-select-title:497 EISDIR (its file walker read the demo/app/node_modules SYMLINK as a file) and
  crash-battery R19:400 (console errors: KaTeX fonts 403 "outside of Vite serving allow list" through the symlinked node_modules).
  Run 2 was stopped to re-seat the worktree on APFS clones; the clone rerun was then stopped by the zone watchdog.
Not run (heavy, refused): value vitest/e2e on the clone worktree, keyframes lint/test, fourier vitest/e2e.
gates.sh / fourier/e2e-run.sh / fourier/vite-private.mjs are the ready re-run scripts (serial, guarded) for after the reboot.
To re-run after the reboot: recreate the worktrees first (they were removed at close), then run gates.sh under nothing else heavy:
  value.js:     git worktree add --detach .worktrees/ds-close-r2 HEAD; cd .worktrees/ds-close-r2;
                cp -c -R ../../node_modules node_modules; cp -c -R ../../api/node_modules api/; cp -c -R ../../demo/app/node_modules demo/app/
  keyframes.js: git worktree add --detach .worktrees/ds-close-r2 HEAD; ln -s ../../node_modules .worktrees/ds-close-r2/node_modules
