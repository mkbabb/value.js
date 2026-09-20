SERVED MODEL: claude-opus-5[1m]

# KF.W13.a2 — KF13-E2 (the harness row) and G-KFW13-0 (the mechanism proof), executed

All commands from `/Users/mkbabb/Programming/keyframes.js`, 2026-09-20, from the
settled bytes, double-run.

## 1 · KF13-E2 — the root, measured BEFORE the cure

⟨cmd⟩ `grep -c 'server' vitest.config.ts` → **0** (matches the wave record's baseline).

⟨cmd⟩ `grep -n '@mkbabb/keyframes' node_modules/@mkbabb/glass-ui/dist/dock.js`
```
24:import { SpringProgress as fe } from "@mkbabb/keyframes.js";
```

⟨cmd⟩ `npx vitest run --project demo test/demo/app/dock-context-slot-resolution.test.ts`
(with the proof file present and `vitest.config.ts` UNCHANGED):
```
 ❯ |demo| test/demo/app/dock-context-slot-resolution.test.ts (0 test)
 FAIL  |demo| test/demo/app/dock-context-slot-resolution.test.ts
Error: Cannot find package '@mkbabb/keyframes.js' imported from
  /Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/useSpring-9u2_shxV.js
 Test Files  1 failed (1)
      Tests  no tests
```
The failure is at IMPORT, before a single assertion — §0ai's diagnosis reproduced
at this seat's own clock, and the reason no mounted-dock test could exist.

## 2 · The cure — one key, no mock, no patch, no copied selector

`vitest.config.ts` gains, inside the root `test` block (inherited by all three
projects through `extends: true`):
```ts
server: { deps: { inline: ["@mkbabb/glass-ui"] } },
```
Vite then transforms the producer's chunks, so `resolve.alias`'s S.B7 entry
(`"@mkbabb/keyframes.js" → src/animation/index.ts`) resolves the bare
self-specifier. ONE realm for producer and library.

## 3 · G-KFW13-0 — GREEN, double-run

⟨cmd⟩ `npx vitest run --project demo test/demo/app/dock-context-slot-resolution.test.ts`
→ `Test Files  1 passed (1)` · `Tests  3 passed (3)` — twice, identical.

Byte clause (the proof's sha carries NO `demo/**` byte):
⟨cmd⟩ `grep -rc 'useOptionalDockContext' demo | grep -v ':0'`
→ `demo/app/dock/ChromeDock.vue:1` · `demo/app/dock/ChromeDock.vue:1` — still the
false comment alone, unchanged by the proof.

The three executed cases:
1. slot content authored in the PARENT resolves `useOptionalDockContext()`
   NON-NULL, with a `glass-dock-*` id and callable `keepOpen`/`release`;
2. the resolved context is THIS provider's — the slot child's `held` and the
   dock's exposed `isHeld` move together;
3. `keepOpen()` taken from the slot child survives 2 000 ms of fake time with
   `expanded === true`; after `release()` the producer re-arms and the dock
   collapses (`expanded === false`). The hold is observable on `expanded`.

Nothing is stubbed but jsdom's absent `ResizeObserver` (the repo's standing
polyfill idiom — `timeline-hover-preview.test.ts`, `KfPillTabs.test.ts`,
`resize-tracks.test.ts`). The provider, its `provideDockContext` and its collapse
machine are the installed producer's.

**`ChromeDock.vue:109-113`'s claim is FALSE at the bytes, executed.** M-4's
deletion has its safety predicate (§B.3 LAW A (1)); no delete is spent on a
reading.
