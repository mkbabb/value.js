/**
 * View schema — pure data + types for the demo's view system.
 *
 * The single source of truth for `ViewId`, the pane layout map (`VIEW_MAP`),
 * and the supporting structural types (`LeftPane`, `RightPane`, `PaneConfig`).
 *
 * History: extracted from `useViewManager.ts` at D.W3 Lane D to retire the
 * 4-copy `ViewId` enumeration that grew across the demo (`useViewManager`,
 * `router/index.ts`, `usePaletteDialogState`, plus any future router shape).
 * Schema (this file) and runtime state (`useViewManager`) are now disjoint;
 * consumers that need the type or the route table import here.
 *
 * No reactivity. No vue-router. Pure constants + types — safe to import from
 * type-only positions and from non-Vue surfaces (e.g. tests).
 */

import type { Component } from "vue";
import {
    Palette,
    Search,
    Camera,
    Shield,
    Tag,
    Home,
    Sparkles,
    Blend,
    Wand2,
    Rainbow,
    ScrollText,
    Flag,
    Droplets,
} from "@lucide/vue";

/** Every named view the demo exposes; the route name AND the `VIEW_MAP` key. */
export type ViewId =
    | "picker"
    | "palettes"
    | "browse"
    | "extract"
    | "atmosphere"
    | "blob"
    | "mix"
    | "generate"
    | "gradient"
    | "admin-users"
    | "admin-names"
    | "admin-audit"
    | "admin-flagged"
    | "admin-tags";

/** The component rendered in the left pane. */
export type LeftPane =
    | "color-picker"
    | "browse"
    | "extract"
    | "atmosphere"
    | "generate"
    | "gradient"
    | "admin-users"
    | "admin-names"
    | "admin-audit"
    | "admin-flagged"
    | "admin-tags";

/** The component rendered in the right pane, or `null` for single-pane views. */
export type RightPane = "about" | "palettes" | "mix" | "blob" | null;

/** Per-view layout shape: left + right panes + labels + dock icon. */
export interface PaneConfig {
    left: LeftPane;
    right: RightPane;
    label: string;
    leftLabel: string;
    rightLabel: string | null;
    icon: Component;
    /**
     * R.W4 Lane B / B2 — the per-view accent: an OKLCh HUE ROTATION (deg)
     * applied to the R.W3 `--accent-live` axis via the CSS relative-color
     * derivation in style.css (`--accent-view`). Pure data; ONE resolver
     * path (App.vue writes `--view-hue-shift`), zero bespoke color math.
     * The nine primary views are proportioned around the wheel in 40°
     * steps in dock order; admin views stay at 0° — admin identity is the
     * gold accent, not a hue turn.
     */
    accentHueShift: number;
}

/**
 * The canonical view → pane-config table. The keys are `ViewId`s; the
 * values are the layout for each. Read-only — `as const` would erase the
 * component types, so we leave the index signature explicit.
 */
export const VIEW_MAP: Record<ViewId, PaneConfig> = {
    picker: {
        left: "color-picker",
        right: "about",
        label: "Home",
        leftLabel: "Picker",
        rightLabel: "About",
        icon: Home,
        accentHueShift: 0,
    },
    palettes: {
        left: "color-picker",
        right: "palettes",
        label: "Palettes",
        leftLabel: "Picker",
        rightLabel: "Palettes",
        icon: Palette,
        accentHueShift: 40,
    },
    browse: {
        left: "browse",
        right: "palettes",
        label: "Browse",
        leftLabel: "Browse",
        rightLabel: "Palettes",
        icon: Search,
        accentHueShift: 80,
    },
    extract: {
        left: "extract",
        right: "palettes",
        label: "Extract",
        leftLabel: "Extract",
        rightLabel: "Palettes",
        icon: Camera,
        accentHueShift: 120,
    },
    mix: {
        left: "color-picker",
        right: "mix",
        label: "Mix",
        leftLabel: "Picker",
        rightLabel: "Mix",
        icon: Blend,
        accentHueShift: 160,
    },
    generate: {
        left: "generate",
        right: "palettes",
        label: "Generate",
        leftLabel: "Generate",
        rightLabel: "Palettes",
        icon: Wand2,
        accentHueShift: 200,
    },
    gradient: {
        left: "gradient",
        right: "palettes",
        label: "Gradient",
        leftLabel: "Gradient",
        rightLabel: "Palettes",
        icon: Rainbow,
        accentHueShift: 240,
    },
    atmosphere: {
        left: "atmosphere",
        right: null,
        label: "Atmosphere",
        leftLabel: "Atmosphere",
        rightLabel: null,
        icon: Sparkles,
        accentHueShift: 280,
    },
    blob: {
        left: "color-picker",
        right: "blob",
        label: "Blob",
        leftLabel: "Picker",
        rightLabel: "Blob",
        icon: Droplets,
        accentHueShift: 320,
    },
    "admin-users": {
        left: "admin-users",
        right: "palettes",
        label: "Users",
        leftLabel: "Users",
        rightLabel: "Palettes",
        icon: Shield,
        accentHueShift: 0,
    },
    "admin-names": {
        left: "admin-names",
        right: "palettes",
        label: "Names",
        leftLabel: "Names",
        rightLabel: "Palettes",
        icon: Tag,
        accentHueShift: 0,
    },
    "admin-audit": {
        left: "admin-audit",
        right: "palettes",
        label: "Audit Log",
        leftLabel: "Audit",
        rightLabel: "Palettes",
        icon: ScrollText,
        accentHueShift: 0,
    },
    "admin-flagged": {
        left: "admin-flagged",
        right: "palettes",
        label: "Flagged",
        leftLabel: "Flagged",
        rightLabel: "Palettes",
        icon: Flag,
        accentHueShift: 0,
    },
    "admin-tags": {
        left: "admin-tags",
        right: "palettes",
        label: "Tags",
        leftLabel: "Tags",
        rightLabel: "Palettes",
        icon: Tag,
        accentHueShift: 0,
    },
};

/** Type predicate — narrows a string to `ViewId` if it is a known view name. */
export function isViewId(name: unknown): name is ViewId {
    return typeof name === "string" && name in VIEW_MAP;
}
