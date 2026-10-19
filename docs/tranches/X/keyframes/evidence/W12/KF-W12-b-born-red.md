SERVED MODEL: claude-fable-5-1

# KF.W12.b — G-KFW12-2 born-RED at the baseline `bf4a9a9c` · 2026-09-19

The committed gate test (`test/demo/instrument/channel-options-render-edge.test.ts`, kf `2cd314af`) was run against the wave's baseline in a detached scratch worktree (`git worktree add --detach <scratchpad>/kf-base bf4a9a9c`, `node_modules` symlinked from the live checkout, the worktree removed afterwards — the shared index was never touched).

**Baseline-copy delta (the born-RED copy only, NOT the committed test)**: at `bf4a9a9c` ChannelOptions imported `DockControl` from the producer's `dock` barrel, whose chunk closure reaches `useSpring-*.js` → `@mkbabb/keyframes.js` (the lane's known wall); the cured tree does not import it. The copy carried one extra `vi.mock("@mkbabb/glass-ui/dock", …)` stub rendering a `<button>`, plus two selector fallbacks for the baseline's own markup (`button[title="Edit easing curve"]` — the baseline pencil's fallen-through native `title`; `div[role=button]` — the baseline advanced row). Without the dock stub the baseline could not even mount:

```
⟨cmd⟩ (worktree @ bf4a9a9c) npx vitest run --project demo test/demo/instrument/channel-options-render-edge.test.ts
 FAIL  |demo| test/demo/instrument/channel-options-render-edge.test.ts [ test/demo/instrument/channel-options-render-edge.test.ts ]
Error: Cannot find package '@mkbabb/keyframes.js' imported from /Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/useSpring-9u2_shxV.js
 Test Files  1 failed (1)
      Tests  no tests
```

With the baseline-only dock stub, the four defect clauses RED and the producer-quotation clause GREEN (a producer fact, independent of the demo's bytes):

```
⟨cmd⟩ (worktree @ bf4a9a9c, dock-stubbed copy) npx vitest run --project demo test/demo/instrument/channel-options-render-edge.test.ts
     × (1) KF-CO-8 ≡ LP-3 + LP-1: the switch renders the engine's `enabled`, and an engine-side setLayerConfig through the wrapper re-renders it 105ms
     × (2) LP-1: the weight slider re-renders the engine's weight after a write through the wrapper 47ms
     × (3) KF-CO-1: the direction dropdown OPENS on click (the declared `open` prop, not the phantom `is-open`) 45ms
     × (4) KF-TFP-1 ≡ KF-ES-12: the first drag off a preset-matched quad does NOT remount EasingPicker 46ms
 FAIL … > (1) … AssertionError: expected 'false' to be 'true'          ← the switch pinned OFF while the engine says enabled: true
 FAIL … > (2) … AssertionError: expected 1 to be close to 0.99          ← the engine took the write; the pane still renders the mount-time snapshot
 FAIL … > (3) … AssertionError: expected 'false' to be 'true'          ← aria-expanded never flips: `is-open` reaches nothing, absent `open` → false → controlled-shut
 FAIL … > (4) … AssertionError: expected 10 to be 9                     ← one more EasingPicker instance after the first drag: the `:key` remount
 Test Files  1 failed (1)
      Tests  4 failed | 1 passed (5)
```

The same file on the cured tree (`2cd314af`), twice:

```
⟨cmd⟩ npx vitest run --project demo test/demo/instrument/channel-options-render-edge.test.ts
 Test Files  1 passed (1)
      Tests  5 passed (5)
⟨cmd⟩ (second run)
 Test Files  1 passed (1)
      Tests  5 passed (5)
```
