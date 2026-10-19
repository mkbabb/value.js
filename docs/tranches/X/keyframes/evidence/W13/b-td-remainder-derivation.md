SERVED MODEL: claude-fable-5-1

# KF.W13.b — Act 0: the KF-AV-28 KEEP verdict stated, and the TD keyboard-family remainder derived against landed code (OP-6)

Seat: KF.W13.b · 2026-09-20 · keyframes.js `2736b5e5` (clean; `git status --porcelain` → two untracked mail packets, zero paths inside this unit's writable set — no inherited edits) · glass-ui installed dist `7.0.0`.

## 1. KF-AV-28 — KEEP, stated first (OP-1)

KF.W7's per-surface SWAP verdicts are IN: six KEEP-BESPOKE, zero SWAP, discharge set EMPTY (value.js `4c03ceda`; ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js cat-file -t 4c03ceda` → `commit`). The transport/ribbon packet keeps the rider it supplies the counter-evidence for. **This unit emits ZERO discharge receipts**; every ribbon row below is cured ON the `Slider` the ribbon already consumes (PR-CAUTION) — no `Slider` import is replaced or wrapped.

## 2. OP-6 — what `usePlayActuation.ts:39-83` already implements (LANDED-BY KF.W8; never claimed here)

⟨cmd⟩ `grep -n 'isSpace\|spaceArmed' demo/components/instrument/transport/TransportDock/usePlayActuation.ts` → `:39` `const isSpace` · `:47` `let spaceArmed = false;` · `:74` · `:78` `if (!e.repeat) spaceArmed = true;` · `:82-83` (×2, identical).

Landed: Space arms on keydown (preventDefault, repeat swallowed) and actuates ONCE on keyup; Enter actuates on keydown with `e.repeat` guarded; pointerup gated on a pointerdown press-origin + `isPrimary` + button 0; pointercancel clears the origin. Ten `it(` cover it (⟨cmd⟩ `grep -c 'it(' test/demo/instrument/transport-play-actuation.test.ts` → **10 · 10**) and they are never weakened.

## 3. The remainder, row by row (measured at the bytes, double-run)

| row | banked defect | what is LANDED | what REMAINS (this unit's bytes) |
|---|---|---|---|
| **TD-2** | Space on the focused expanded Play actuates twice (window registry + local keyup) | the local arm is native (keyup once) | the registry arm still fires: ⟨cmd⟩ `grep -c 'registerShortcut("Space"' …/useControlsKeyboardShortcuts.ts` → **1 · 1**, `preventDefault: true`, and the dispatcher (`glass-ui/dist/keyboard.js` `f(e)`) skips only `INPUT/TEXTAREA/SELECT/contenteditable/.monaco-editor` — ⟨cmd⟩ `grep -c 'BUTTON' node_modules/@mkbabb/glass-ui/dist/keyboard.js` → **0 · 0**; it calls `preventDefault()` BEFORE the handler (`_()`), so a `preventDefault: true` registration cannot be scoped from inside its handler. REMAINS: scope the Space registration away from button targets demo-side — the handler owns `preventDefault` conditionally. |
| **TD-38** | the collapsed mirror's five `.stop`s are inverted against the dock's listener phases | nothing | ⟨cmd⟩ `grep -c '\.stop' …/TransportDock.vue` → **5 · 5** (`:205-209`); `…/dock/ChromeDock.vue` → **0 · 0**. Dock listener census at the dist (`dock.js`): root `onPointerdownCapture` (`:809`), `onPointerCancelCapture`, `onClickCapture` (`:811`) — capture phase, unreachable by `.stop`; `onFocusin` (`:804`) bubble; the summary layer's `onClick` → `onClickCollapsed` → `"pinned"` (`:840`, `:330`) bubble — the one listener `.stop` COULD reach and the five do not stop (the pointer path pins as a side effect; the keyboard path's `preventDefault` kills the synthesized click, so it never does). REMAINS: one policy, stated once, symmetric on both mirrors. |
| **TD-40** | Space inoperable on Reset / Collapse-timeline; fires playback instead | nothing | same registry mechanism as TD-2 (window bubble listener, no BUTTON skip, preventDefault-before-handler cancels the browser's activation click for `@click`-only buttons). REMAINS: the same demo-side scoping cures both — one commit with TD-2/TD-38. |
| **TD-21 (+r2)** | press-origin `Set` shared by both mirrors; stale id on release-over-neither | pointercancel clears | `:45` `new Set<number>()` keyed by pointerId only — "either control", not "same control"; a mouse release over neither control (no pointerup on either mirror) leaves the id in the Set for the next up (persistent mouse pointerId). REMAINS: per-control origin + release-elsewhere cleanup. |
| **TD-41** | `spaceArmed` has no cancellation path; one closure shared by both mirrors | — | `:47` is cleared only in `onPlayKeyup`; no blur/pointerleave disarm; ⟨cmd⟩ `grep -c 'blur\|orphan\|stale' test/demo/instrument/transport-play-actuation.test.ts` → **0 · 0**. REMAINS: blur-class disarm across both arms + the orphan-keyup and stale-id cases. |
| **TD-1 / TD-4 / TD-17** | `instanceof HTMLElement` ×2 dead against an `SVGSVGElement`; eager `kfEngine()`; hard-coded string refs | — | ⟨cmd⟩ `grep -c 'instanceof HTMLElement' …/useIconSpin.ts` → **2 · 2**; `kfEngine()` + `fromString` at setup (`:12-20`); no teardown; `useTemplateRef<HTMLElement>("resetIconEl")` by string inside the composable (and `useMenubarMeasure` likewise) — the §0u TS6133 pair at `TransportDock.vue:276/:366` is the type-level shadow. REMAINS: all of it. |

**The bundle locks bind the remainder whole** (spec §Sequencing lock 2): TD-2+TD-38+TD-40 one sha; TD-21+TD-41 one sha; TD-1+TD-4+PRM+test one sha.

## 4. The propagation policy (written once; the bytes cite this)

**The transport's play mirrors do not stop propagation, on either face.** Grounds: (a) the dock's own pointer/click listeners are capture-phase — `.stop` on the button never reaches them, so the three pointer `.stop`s were inert; (b) the window keyboard registry is scoped away from button targets at the registry seat (TD-40's cure), so no keyboard `.stop` is load-bearing for TD-2 immunity; (c) the one bubble listener the dock registers (the summary layer's `onClickCollapsed`) is the producer's declared meaning of a click on its collapsed face and the transport does not second-guess it — what a mirror press does to the dock is decided by the dock, and by `actuatePlay()`'s explicit `expand()`, never by an accidental `.stop`. Symmetry is the invariant: **0 `.stop` on TransportDock.vue's mirrors, 0 on ChromeDock's** — the asymmetry 5/0 becomes 0/0. LAW A (4): the five deletions carry the listener-phase census above, not a count.

## 5. `useDragCapture`'s consumer, re-measured at open (KF.W11 `.i` wrote the composable)

⟨cmd⟩ `git log --oneline -1 -- demo/components/instrument/transport/composables/useDragCapture.ts` → `383bcf3b` (X.KF.W11.i); its docblock: *"The exported surface — `{ isDragging, onPointerDown }` and the handler bag — is unchanged: `PlaybackRibbon` consumes this seam and is not this unit's."* Consumer: `PlaybackRibbon.vue:148` `const { onPointerDown: onScrubPointerDown } = useDragCapture({ onStart, onEnd })` · `:178` called from `gatedSliderDown`. The surface this unit consumes is the same two names; L-M1 deletes the wrapper gate around the call, not the call.

## 6. OP-7 — TD-37

⟨cmd⟩ `grep -n 'TD-37\|face order' /Users/mkbabb/Programming/value.js/docs/tranches/X/COHESION.md` → *(no output)*, read to the file end (1,922 L). **UNRULED** → this unit lands nothing for TD-37 and names it at close (`complete_with_misses`).
