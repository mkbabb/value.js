/**
 * View schema — pure data + types for the demo's view system.
 *
 * The single source of truth for `ViewId`, the scene table (`VIEW_MAP`), and
 * the supporting structural types (`PaneId`, `RegionRole`, `SceneRegion`,
 * `PaneConfig`).
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
    Compass,
} from "@lucide/vue";

/**
 * Every named view the demo exposes; the route name AND the `VIEW_MAP` key.
 *
 * `not-found` (X-W3 · G-20) is a full member, not a special case: the router's
 * catch-all resolves to it, so `useViewManager`'s `isViewId` clamp must accept
 * it or an unknown address would fall back to the picker exactly as the retired
 * `redirect: "/"` did. It is deliberately absent from the dock's `userViews` /
 * `adminViews` lists (`useDockAdminMode.ts:26-27`) — a destination, never a
 * place to navigate TO.
 */
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
    | "admin-tags"
    | "not-found";

/** Every pane component a scene region can seat. */
export type PaneId =
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
    | "admin-tags"
    | "not-found"
    | "about"
    | "palettes"
    | "mix"
    | "blob";

/**
 * What a region IS in its scene — never where it sits (X.W5.c · V·L2 · gate C8).
 *
 * The retired schema encoded a PHYSICAL axis: a left-pane field, a right-pane
 * field (thirteen rows of it — gate C8's census), a label per side, and a
 * default pane INDEX that named which physical side a phone was allowed to
 * see. The retired spellings are quoted once, in the wave record at
 * docs/tranches/X/execution/A/X-W5.md § X.W5.c, so C8's census can read zero
 * in this file and mean it. Every one of those words is a
 * layout decision taken in a data table, and the shell then needed a JS
 * breakpoint fork to honour it — which is how a region became a subtree a
 * viewport could remount out of existence.
 *
 * A role says what the region does, so the SHELL owns the arrangement:
 *   · `stage`     — the protagonist; the reason the route exists. Exactly one.
 *   · `inspector` — the companion that reads, edits or extends the stage.
 *   · `action`    — a region whose content is a command surface in its own
 *                   right. No route declares one today (the dock is the app's
 *                   action surface); the role is part of the vocabulary the
 *                   shell keys motion and layout on, not a required member.
 */
export type RegionRole = "stage" | "inspector" | "action";

/**
 * One region of one scene.
 *
 * ⟨PSC-12, binding⟩: a pane without a label must be UNREPRESENTABLE, or the
 * `?? ''` masking seam that the retired `rightLabel: string | null` forced on
 * every consumer simply re-forms at the new seam. The pair is the type.
 */
export interface SceneRegion {
    role: RegionRole;
    pane: PaneId;
    /** The region's own accessible name — never derived, never nullable. */
    label: string;
}

/** Per-view scene shape: the ordered regions + the dock icon. */
export interface PaneConfig {
    label: string;
    /**
     * The scene's regions IN ORDER. Non-empty by construction: a route with no
     * region is not a scene, and the tuple type is what refuses one.
     */
    regions: readonly [SceneRegion, ...SceneRegion[]];
    icon: Component;
    /**
     * The per-view accent: an OKLCh HUE ROTATION (deg) applied to the R.W3
     * `--accent-live` axis. Pure data; ONE resolver path — since S.W7-4 the
     * shift feeds `useViewAccents`, which resolves each view's token THROUGH
     * THE LIBRARY (gamut-map to the cusp + contrast re-guard + WCAG 3:1
     * floor) and writes `--accent-view-<id>`/`--accent-view` as static root
     * tokens (the former CSS relative-color derivation trusted the browser
     * clamp and failed the graphics floor at cyan/green hues). The nine
     * primary views are proportioned around the wheel in 40° steps in dock
     * order; admin views stay at 0° — admin identity is the gold accent,
     * not a hue turn.
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
        label: "Home",
        regions: [
            { role: "stage", pane: "color-picker", label: "Picker" },
            { role: "inspector", pane: "about", label: "About" },
        ],
        icon: Home,
        accentHueShift: 0,
    },
    palettes: {
        label: "Palettes",
        regions: [
            { role: "stage", pane: "color-picker", label: "Picker" },
            { role: "inspector", pane: "palettes", label: "Palettes" },
        ],
        icon: Palette,
        accentHueShift: 40,
    },
    browse: {
        label: "Browse",
        regions: [
            { role: "stage", pane: "browse", label: "Browse" },
            { role: "inspector", pane: "palettes", label: "Palettes" },
        ],
        icon: Search,
        accentHueShift: 80,
    },
    extract: {
        label: "Extract",
        regions: [
            { role: "stage", pane: "extract", label: "Extract" },
            { role: "inspector", pane: "palettes", label: "Palettes" },
        ],
        icon: Camera,
        accentHueShift: 120,
    },
    mix: {
        label: "Mix",
        regions: [
            { role: "stage", pane: "color-picker", label: "Picker" },
            { role: "inspector", pane: "mix", label: "Mix" },
        ],
        icon: Blend,
        accentHueShift: 160,
    },
    generate: {
        label: "Generate",
        regions: [
            { role: "stage", pane: "generate", label: "Generate" },
            { role: "inspector", pane: "palettes", label: "Palettes" },
        ],
        icon: Wand2,
        accentHueShift: 200,
    },
    gradient: {
        label: "Gradient",
        regions: [
            { role: "stage", pane: "gradient", label: "Gradient" },
            { role: "inspector", pane: "palettes", label: "Palettes" },
        ],
        icon: Rainbow,
        accentHueShift: 240,
    },
    atmosphere: {
        label: "Atmosphere",
        regions: [{ role: "stage", pane: "atmosphere", label: "Atmosphere" }],
        icon: Sparkles,
        accentHueShift: 280,
    },
    blob: {
        label: "Blob",
        regions: [
            { role: "stage", pane: "color-picker", label: "Picker" },
            { role: "inspector", pane: "blob", label: "Blob" },
        ],
        icon: Droplets,
        accentHueShift: 320,
    },
    // ⟨AdminNamesPanel · M-DU11⟩, BINDING: the admin routes each carried a
    // palettes-pane companion in the retired right-hand field — a DIFFERENT
    // route's pane, seated on every admin console, which is where four canon
    // rows and the route's only a11y-battery findings came from. The console is
    // the whole scene; it gets the stage and nothing beside it.
    "admin-users": {
        label: "Users",
        regions: [{ role: "stage", pane: "admin-users", label: "Users" }],
        icon: Shield,
        accentHueShift: 0,
    },
    "admin-names": {
        label: "Names",
        regions: [{ role: "stage", pane: "admin-names", label: "Names" }],
        icon: Tag,
        accentHueShift: 0,
    },
    "admin-audit": {
        label: "Audit Log",
        regions: [{ role: "stage", pane: "admin-audit", label: "Audit" }],
        icon: ScrollText,
        accentHueShift: 0,
    },
    "admin-flagged": {
        label: "Flagged",
        regions: [{ role: "stage", pane: "admin-flagged", label: "Flagged" }],
        icon: Flag,
        accentHueShift: 0,
    },
    "admin-tags": {
        label: "Tags",
        regions: [{ role: "stage", pane: "admin-tags", label: "Tags" }],
        icon: Tag,
        accentHueShift: 0,
    },
    // X-W3 · G-20 — the terminal view for an address that names no route, and
    // the destination `router/guards.ts` fail-closes an unauthenticated admin
    // deep-link to. One region: a dead end shows one thing. No hue turn — it is
    // not a place in the 40°-step dock fan.
    "not-found": {
        label: "Not Found",
        regions: [{ role: "stage", pane: "not-found", label: "Not Found" }],
        icon: Compass,
        accentHueShift: 0,
    },
};

/** Type predicate — narrows a string to `ViewId` if it is a known view name. */
export function isViewId(name: unknown): name is ViewId {
    return typeof name === "string" && name in VIEW_MAP;
}
