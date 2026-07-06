# S.W7-6 — investigation records (the wave's §Verification artefacts rows)

Probed live at the W7-6 working tree (post-W7-1/W7-2 commits), Vite dev at a
fresh dep-optimizer cache, `VITE_API_URL=http://localhost:59999` (dead-API
churn), Chromium via Playwright MCP. Three records; each is measured, none is
speculative.

## 1. THE PRM RIDER — the dock never expands past the collapsed circle (W6 gate observation, routed here). ROOT-CAUSED; producer-owned; GAP row.

**Reproduced** (reducedMotion: reduce, 1440×900, tap-to-expand on the collapsed
circle):

| probe | value |
|---|---|
| class after tap | `glass-dock … expanded …` (the STATE flips correctly) |
| box after tap | **44px** — stuck at the collapsed endpoint; 3s later still 44px |
| `--dock-morph-t` | `"0"` — seated synchronously at arm, never advanced |
| `data-morphing` / `data-punching` | **stuck true** (never cleared) |
| `--dock-live` | `calc(44px + (59px − 44px) * clamp(0, 0, 1))` — the blend reads t=0 forever |

**Root cause (the full chain, all in producer code — verified in both trees'
source):**

1. **keyframes.js** `physics/spring/managed-play.ts` `springPlay()`: under PRM
   (`respectReducedMotion: true` + active query) the gate's snap arm calls
   `spring.snap()` → `_snapSettled()`, which `emit()`s **only to `subscribe()`
   subscribers** — it never invokes the `onFrame` callback that `.play(onFrame)`
   just bound. The non-PRM already-settled arm DOES call `onFrame` — the PRM arm
   is asymmetric, and the function's own docstring promises "one emit, no loop".
   (Compounding: `useDockSpring.playTo` sets `active.target = to` BEFORE
   `.play()`, and the target-setter's PRM arm snaps+settles immediately, so the
   spring is already settled when `.play` runs — only the snap arm's missing
   emit stands between PRM and a working dock.)
2. **glass-ui** `dock/composables/useDockSpring.ts` routes BOTH the per-frame
   writer AND settle detection through the `.play` callback (`if (active.settled)
   → onSettle`), so under PRM neither `--dock-morph-t` writes nor `settleAll()`
   ever run.
3. **glass-ui** `dockMorphContext.ensureSpringRunning()` seats `--dock-morph-t: 0`
   synchronously before `playTo` — the box blend therefore HOLDS the collapsed
   endpoint while `[data-morphing]`/`[data-punching]` linger forever.

**The one-line producer cure** (keyframes.js, `springPlay` PRM arm):
`() => { spring.snap(); onFrame?.(spring.value, spring.velocity); }` — the dock
orchestrator's `onFrame` then receives value 1 → writes the scalar → its
`tValue >= 1` arrival branch runs `settleAll()` → attrs drop → the TRUE expanded
box seats in one frame (exactly the producer's own PRM contract: jump, no
motion frames). A belt-and-braces glass-ui half: `useDockSpring.playTo` checking
`active.settled` immediately after `.play()`.

**Routing**: producer write (keyframes.js + optionally glass-ui) — out of this
wave's bounds (`S.W7.md §File bounds`: no `../glass-ui` writes; sibling writes
are triumvirate territory). NO consumer shim authored (a demo CSS override of
`[data-morphing]` would paper over a producer defect — the prohibited class).
**Recorded as the wave's producer-gap row; re-verify at W8's adopt walk** (the
same hedge shape as L4/W6's GAP rows). The demo-side PRM posture is otherwise
correct by construction: the seal's stamp swap degrades to the 100ms cross-fade
(glass-ui's `:not([data-allow-motion])` regime), and no demo code participates
in the expand morph.

## 2. The unowned idle `#/gradient → #/browse` navigation (design-gradient P1-12). NO REPRO at HEAD; recorded honestly, no speculative patch.

- **Static enumeration**: zero `switchView("browse")` / `router.push`-to-browse
  call sites in the tree (grep over `demo/`). The only programmatic navigations:
  `usePaletteManagerWiring` → `"palettes"` (×2, palette-save flows) and
  `"picker"` (admin-logout guard); `Dock.vue` action-bar → `"palettes"`/
  `"extract"`; `useDockAdminMode` → `"admin-users"`/`"picker"`; `useViewManager
  .goBack` → previous view.
- **Live arm 1**: 100s idle on `#/gradient`, zero interaction, dead-API churn,
  `hashchange` listener armed → **zero events**, hash unchanged.
- **Live arm 2** (the audit's probe pattern): 90s idle with periodic DOM reads
  (full-dock `getBoundingClientRect` sweeps + computed-style reads every 3s)
  → **zero events**, hash unchanged.
- Per the wave's halt rule the diagnostic loop stops before a third arm.
  **Assessment**: not reproducible at HEAD. The two observations (2026-07-01
  audit, repo `c5aa091`) predate two mechanism changes that plausibly owned the
  defect surface: S.W2 moved ALL view navigation onto vue-router 5 (the audit
  era's hash-writer sync was hand-rolled), and S.W0 replaced the silent
  CORS-death-against-prod dev posture (the audit's exact churn condition) with
  the designed `misconfigured` state. If the ghost returns, instrument
  `router.afterEach` with a stack capture first (the arm-2 harness above).

## 3. The collapsed-layer pointer-interception (P1-12 second half / P1-9). CURED UPSTREAM — verified, no demo change.

- **Expanded dock**: `.dock-layer--summary` computes `pointer-events: none;
  opacity: 0; visibility: hidden`; `elementFromPoint` over the Tools toggle
  resolves the toggle itself; a real Playwright click on "Toggle action bar"
  succeeds, no misdirected navigation.
- **Collapsed dock**: the hidden main-layer controls are NOT reachable (the
  locator times out waiting — correct occlusion semantics, no misdirect; the
  audit era instead landed a phantom `#/extract` navigation).
- The producer's 3-state crossfade hit-test contract (the a11y-006 clause,
  BG-era dock) landed between the audit pin and the current glass-ui consume —
  the interception class is dead at HEAD. Recorded as verified-cured;
  the W7 close π quadrant re-witnesses the collapsed/expanded pair.
