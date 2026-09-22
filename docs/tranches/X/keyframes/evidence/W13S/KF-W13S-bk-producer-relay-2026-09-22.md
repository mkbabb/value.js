SERVED MODEL: claude-opus-5-5[1m]

# value.js → glass-ui (BK) — the KF.W13S producer relay (O-48)

**Date**: 2026-09-22. **From**: X·KF Track B, wave `KF.W13S`, Repair 1 (the relay limb of G-KFW13-7: *"every producer row relayed and none cured demo-side"*). **To**: glass-ui, the active tranche's coordination seat `glass-ui/docs/tranches/BK/coordination/` (newest glass tranche dir at this clock). **Carriage**: glass-ui is READ-ONLY to every value.js/keyframes.js seat, so this letter stands at its value.js path; the cross-repo hand-off rides the standing **SS-6** boundary batch (the O-47 precedent). The same rows accrete at COHESION §4a as `KFW13-1..6`.

**Source of record**: `docs/tranches/X/execution/B/KF-W13S.md` — the `.a3` receipt's *"Producer asks recorded for `.f2`"* line and the `.f2` Close's residual **R-f2-5** (*"recorded, not yet relayed to BK"*). No row below was cured demo-side. None is re-derived here. Ids are the adjudicated registry's own (`docs/tranches/V/megatranche/registry/adjudicated/kf-ChromeDock.md` · `kf-MbabbMenu.md`).

## The asks

| # | id (home) | producer surface | ask |
|---|---|---|---|
| 1 | kf-ChromeDock **M-5** | `dock` — the touch gate | Route the touch-gate deactivation through the same guard the pointer path uses. Per the registry, GlassDock wires `useTouchGate` with `collapse`, and that watcher (`!isActive && expanded && !isPinned && !alwaysExpanded && collapse()`, dock.js `:633-634` at the adjudicated read) consults **neither the hold counter** (`keepOpen()`/`release()`) **nor the portal stamp** (`data-glass-dock-portal`). A slot child holding the dock open can therefore still be collapsed on the touch axis. The consumer keeps its watchdog meanwhile. |
| 2 | kf-ChromeDock **D-18** | `dock` — the collapsed summary layer | The collapsed summary renders as a bare `<div>` with `onClick` only, with no role, no tabindex and no name, while the full layer is `inert`. The collapsed dock therefore has **zero tab stops**. Make the summary **focusable and named by construction**, or give `onClickCollapsed` a keyboard path. The consumer re-supplied a tab stop at `fe598702`. That byte is an accommodation, and the primitive should not need it. |
| 3 | kf-MbabbMenu **MM-24** | package exports | Publish an **`./avatar` subpath**. Avatar is reachable only through the root barrel today. |
| 4 | kf-MbabbMenu **MM-2** row 2 | `DarkModeToggle` | Provide a **headless toggle** (`v-model` or an exposed `toggle()`) so that a menu item can actuate the theme flip itself instead of nesting the whole control. |
| 5 | kf-ChromeDock **D-13** | `startCollapsed` (the dock-shell props and their docs) | `startCollapsed: { type: Boolean }` is declared with **no default**. Vue's Boolean cast therefore resolves an absent attribute to `false`, so the `startCollapsed ?? true` arm (dock.js `:520` at the adjudicated read) is dead on the SFC path. Declare `default: undefined` so the arm is live, or correct the docs to the runtime truth. |
| 6 | kf-MbabbMenu **MM-28** (the MUST-CARRY rider's producer half) | `dropdown-menu` `open`/`defaultOpen`/`modal` | This one is a **status note**, not an ask. The `default: undefined` ask is measured SHIPPED at 7.0.0 (`open`/`defaultOpen` → `default: void 0`, per the `.a3` receipt). The consumer's rider obligation still holds (`v-model:open="open"` reads 1), and its shape is relaxed. The ask is not re-sent. |

## What this letter does not do

- It writes no glass-ui byte, and no demo-side workaround stands in for any row.
- It does not re-send any row that O-20, O-26 or the KF.W6 BH relay (`valuejs-outbound-2026-09-18-kfw6-bh-relay.md`) already carried. Row 6 is recorded as a status note so that the ledger closes.
- **Nothing in KF.W13S waits on the reply.** Every consumer half has landed or is carried by id in the record.
