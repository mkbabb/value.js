SERVED MODEL: claude-fable-5-1

# C3 — the fork census PARTITIONED (dated 2026-09-22; COHESION §0aq X-W5: "the capability-only rows are classified OUT of the gate (dated); the three layout forks → X-W8 `.i`")

⟨cmd⟩ `grep -rnE 'useBreakpoint|isDesktop|isMobile|mobilePaneIndex' demo/ --include='*.vue' --include='*.ts' | grep -v '^demo/ui/'`
→ **23 occurrences / 9 files** at HEAD `ad65d992` (reproduces R4.3's 23 / 9 and Check 3's figure; ×2 identical).

| class | occurrences (file:line · the query) | count | disposition |
|---|---|---|---|
| **capability-only** (no viewport dimension; the gate's own falsifier names these as the queries that MUST survive) | `demo/workbenches/mix/MixAnimationCanvas/composables/useMixingAnimation.ts:41,70` · `(prefers-reduced-motion: reduce)` — `demo/workbenches/extract/ImageEyedropper/composables/useInertiaGesture.ts:2,37` · `(prefers-reduced-motion: reduce)` — `demo/palettes/browser/card/composables/useHoverPopover.ts:3,11` · `(hover: hover)` | **6 / 3 files** | **OUT of C3** (§0aq, dated here). They read a user capability, not a layout; `useBreakpoint` is glass-ui's `matchMedia` idiom and the identifier is the only reason the spec regex catches them. |
| **layout forks** (a `min-width` query steering the component's own layout/behaviour) | `demo/workbenches/extract/ExtractWorkbench.vue:188,226` · `isWide = useBreakpoint("(min-width: 640px)")` — `demo/picker/controls/ComponentSliders/ConsoleRail.vue:93,118` · `isLgViewport = useBreakpoint("(min-width: 1024px)")` — `demo/picker/visual/HeroBlob.vue:38,71` · `isLgViewport = useBreakpoint("(min-width: 1024px)")` | **6 / 3 files** | **→ X-W8 `.i`** (§0aq). Each is a width rung inside a workbench/picker interior (outside W5 §4), not the shell's mount fork that C3 was authored against; the three files are the `.i` bounds. |
| **dock `isDesktop` family** (`useMediaQuery("(min-width: 1024px)")` at `Dock.vue:87`, propagated as a prop) | `demo/shell/dock/Dock.vue:87,88,164,227,240` — `demo/shell/dock/DockViewSelect.vue:15,21,87` — `demo/shell/dock/ActionBarToggle.vue:38,43,96` | **11 / 3 files** | **→ X-W8 `.h`** via the RUNBOOK §1.1 back-gate on Dock G-L (Check 1 K1.3 row "C3, Dock rows"; honest-RED by route, unchanged by this partition). |

Totals: 6 + 6 + 11 = **23** ✓ · 3 + 3 + 3 = **9 files** ✓ (SELF-COUNT: the three classes are disjoint by file).

**C3 as read after this partition**: gate-scoped occurrences = 23 − 6 (capability, OUT) = **17**, all routed
(6 → X-W8 `.i`, 11 → X-W8 `.h`); **0 unrouted layout forks remain in W5's surface** (`App.vue`, `usePaneRouter.ts`,
`useViewManager.ts`, `PaneSlot.vue`, `viewSchema.ts`: ⟨cmd⟩ the same grep over `demo/shell/*.ts demo/shell/*.vue
demo/color-picker/` → **0**). The gate stays honest-RED by route until X-W8 `.h`/`.i` close — no seat in W5 may
turn it by editing those files (all outside W5 §4).

Falsifier for the partition itself: a "capability" row that steers layout (e.g. a `hover` query that hides a
region) would belong in class 2 — each of the three OUT rows was read at its site: PRM gates a rAF narration
(`useMixingAnimation.ts:70`), PRM gates inertia (`useInertiaGesture.ts:37`), `hover` gates a popover's open
gesture (`useHoverPopover.ts:11`). None hides, moves or remounts a region.
