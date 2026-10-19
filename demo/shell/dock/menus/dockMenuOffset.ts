/**
 * X-DS VC6-01: the side offset every dock-seated dropdown opens at.
 *
 * A dock menu anchors to its TRIGGER, and the trigger sits centred in the dock
 * plate (the 56 px pill; a 31–32 px trigger leaves ~12.5 px of plate below it).
 * Glass's default 4 px offset therefore opened the menu INSIDE the plate's
 * footprint, its top over the dock's lower rim. 17 px = the plate below the
 * trigger (12.5) + the 4 px floater gap, rounded up: the menu hangs below the
 * dock (menu.top >= dock.bottom + 4) at 1440 and 390. Glass exposes no
 * dock-menu offset; if it ever owns dock-menu placement (O-88), this goes.
 */
export const DOCK_MENU_SIDE_OFFSET = 17;
