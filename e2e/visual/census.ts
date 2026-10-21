// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b — THE ROUTE CENSUS. The visual matrix's denominator.
 *
 * ─── Why this file exists (R34 / NG-11 / L-19) ───────────────────────────────
 *
 * Every visual matrix this repository has ever shipped ran a FIVE-ROUTE SAMPLE
 * and reported it as coverage. Measured read-only at `f62bf82b`:
 *
 *   PNG count per arm under docs/tranches/V/megatranche/audit/visual/shots :
 *     forced-colors-desktop: 5      keyboard-focus-desktop: 5
 *     reduced-motion-desktop: 5     rtl-desktop: 6      rtl-mobile: 5
 *     zoom-200-desktop: 5           safari-desktop-[light,dark]: 15
 *
 *   ls of the forced-colors-desktop arm :
 *     adminusers.png  blob.png  browse.png  gradient.png  picker.png
 *
 * SIX modality matrices, each holding THE SAME five routes. `extract`, `mix`,
 * `generate`, `atmosphere`, `palettes`, `admin-names`, `admin-audit`,
 * `admin-flagged`, `admin-tags` appear in none of them; `about` appears in none
 * of them *and cannot*, because About is not a route at all — it is `picker`'s
 * RIGHT PANE (`demo/shell/viewSchema.ts` VIEW_MAP.picker.right === "about").
 * R34's cure-shape lock, verbatim: *"the visual/oracle re-gate must run modality
 * matrices against the route census, not a 5-route sample."*
 *
 * ─── L-19 denominator discipline is PRESERVED, not relaxed ───────────────────
 *
 * The axes below are product-consumer axes. Each combination is one a real user
 * reaches, and no combination is minted because a cross-product could produce it:
 *
 *  · ROUTE — the 15 names `demo/app/router/index.ts` declares. Not a
 *    generated space: the router's own table, guarded for parity below.
 *  · VIEWPORT — 390 / 1024 / 3440, the three W1.md names.
 *  · SCHEME — light / dark, the two the app ships (`useGlobalDark`).
 *  · PANE — **none: one frame per (route, viewport, scheme).** The shell lays
 *    a scene's ordered `regions[]` out by SPACE (`demo/styles/shell.css`
 *    `.pane-container`, `repeat(auto-fit, minmax(min(--pane-min, 100%), 1fr))`,
 *    X.W5.c `50633f195`): side by side where two tracks fit, and stacked into the
 *    ONE scrolling column where they do not — 390 included. Every region is
 *    mounted at every width (`App.vue`'s single `v-for` over `regions`, each a
 *    `.pane-wrapper[data-pane]`), and the shutter is full-page, so one frame
 *    witnesses every region. The 390 pane axis this table used to carry — a
 *    second frame per dual scene, reached through the pane segmented control —
 *    photographed a control X.W5.c DELETED (`PaneSegmentedControl.vue`), so its
 *    sibling cells read "unreachable" on every dual scene (DISPOSITION §5a: 28
 *    cells). Re-planned at X.W11.h14 (2026-10-20, COHESION §0gd.1 E14) to the
 *    product's own route model; `capture.ts` `showPane` now proves the frame
 *    holds each region the census names, so the sameness trap stays closed.
 *
 * ─── The parity guard ────────────────────────────────────────────────────────
 *
 * `census-parity.spec.ts` re-derives this table from the product's own source
 * text and fails if the two disagree. NG-11's falsifier — *"add a route/pane to
 * the app without a matrix cell → the census reds"* — is that spec, and it is
 * the reason this file is a table rather than a copy of a list somebody kept in
 * their head.
 */

/** A pane slot as `viewSchema.ts` names it. `null` ⇒ the view is single-pane. */
export type CensusRightPane = "about" | "palettes" | "mix" | "blob" | null;

export interface CensusRoute {
    /** The router's `name` and the `VIEW_MAP` key — one identity, not two. */
    readonly id: string;
    /** The canonical deep link. The demo is a HASH router (`createWebHashHistory`). */
    readonly path: string;
    /** `VIEW_MAP[id].regions[0].pane` — the stage region's pane. */
    readonly left: string;
    /** `VIEW_MAP[id].regions[1].pane` — the inspector region's pane, or null for a one-region scene. */
    readonly right: CensusRightPane;
    /** `router` meta.admin — the route needs the admin token seeded to render. */
    readonly admin: boolean;
}

/**
 * THE CENSUS — all 15, in router declaration order.
 *
 * Bare-path navigation is a trap this repo has already sprung once: the demo is
 * a hash router, so `/browse` renders the DEFAULT view with the path intact and
 * the capture silently photographs the same pane N times (the note at
 * `docs/tranches/V/megatranche/audit/visual/capture.mjs`, "That error was made
 * once here; it must never be made again"). Every `path` below carries `/#/`.
 */
export const ROUTE_CENSUS: readonly CensusRoute[] = [
    {
        id: "picker",
        path: "/#/",
        left: "color-picker",
        right: "about",
        admin: false,
    },
    {
        id: "palettes",
        path: "/#/palettes",
        left: "color-picker",
        right: "palettes",
        admin: false,
    },
    {
        id: "browse",
        path: "/#/browse",
        left: "browse",
        right: "palettes",
        admin: false,
    },
    {
        id: "extract",
        path: "/#/extract",
        left: "extract",
        right: "palettes",
        admin: false,
    },
    {
        id: "mix",
        path: "/#/mix",
        left: "color-picker",
        right: "mix",
        admin: false,
    },
    {
        id: "generate",
        path: "/#/generate",
        left: "generate",
        right: "palettes",
        admin: false,
    },
    {
        id: "gradient",
        path: "/#/gradient",
        left: "gradient",
        right: "palettes",
        admin: false,
    },
    {
        id: "atmosphere",
        path: "/#/atmosphere",
        left: "atmosphere",
        right: null,
        admin: false,
    },
    {
        id: "blob",
        path: "/#/blob",
        left: "color-picker",
        right: "blob",
        admin: false,
    },
    {
        id: "admin-users",
        path: "/#/admin/users",
        left: "admin-users",
        right: null,
        admin: true,
    },
    {
        id: "admin-names",
        path: "/#/admin/names",
        left: "admin-names",
        right: null,
        admin: true,
    },
    {
        id: "admin-audit",
        path: "/#/admin/audit",
        left: "admin-audit",
        right: null,
        admin: true,
    },
    {
        id: "admin-flagged",
        path: "/#/admin/flagged",
        left: "admin-flagged",
        right: null,
        admin: true,
    },
    {
        id: "admin-tags",
        path: "/#/admin/tags",
        left: "admin-tags",
        right: null,
        admin: true,
    },
    // X.W5.c2 (COHESION §0ax ESC-R1-2) — `not-found`: X-W3's catch-all record,
    // made a full `ViewId` by X.W5.a. It has no path of its own (it is
    // `/:pathMatch(.*)*`), so the canonical deep link is an address the router
    // does not declare — the same one gate A7 announces.
    {
        id: "not-found",
        path: "/#/does-not-exist",
        left: "not-found",
        right: null,
        admin: false,
    },
];

/**
 * The five-route sample every shipped modality matrix ran, kept here as the
 * thing the census SUPERSEDES. `census-parity.spec.ts` asserts the census is a
 * strict superset — so the sample can never quietly become the denominator again.
 *
 * The ids are this repo's, not the shot filenames': the shots spell
 * `admin-users` as `adminusers.png`.
 */
export const SUPERSEDED_FIVE_ROUTE_SAMPLE: readonly string[] = [
    "picker",
    "gradient",
    "browse",
    "blob",
    "admin-users",
];

/** The three viewports W1.md §X.W1.b names, with the heights each width implies. */
export const VIEWPORTS = [
    { id: "390", width: 390, height: 844, form: "mobile" as const },
    { id: "1024", width: 1024, height: 768, form: "desktop" as const },
    { id: "3440", width: 3440, height: 1440, form: "desktop" as const },
] as const;

export type ViewportId = (typeof VIEWPORTS)[number]["id"];

export const SCHEMES = ["light", "dark"] as const;
export type Scheme = (typeof SCHEMES)[number];

/**
 * The frames a (route, viewport) pair needs: ONE. Every region is mounted at
 * every width and the shutter is full-page, so the stacked 390 column and the
 * side-by-side desktop row each witness the whole scene in one frame (see the
 * PANE note above). The pane index survives as the capture's argument only.
 */
export function panesFor(_route: CensusRoute, _viewport: ViewportId): readonly 0[] {
    return [0];
}

/**
 * The frame's pane label, for the golden filename and the manifest: the one
 * region's pane for a one-region scene, `both` when the frame holds two.
 */
export function paneName(route: CensusRoute, _pane: 0 | 1): string {
    return route.right === null ? route.left : "both";
}

/** Total route-arm cells, computed — never a number anyone typed. */
export function routeArmCellCount(): number {
    let n = 0;
    for (const r of ROUTE_CENSUS)
        for (const v of VIEWPORTS) n += panesFor(r, v.id).length * SCHEMES.length;
    return n;
}
