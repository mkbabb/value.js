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
 *  · ROUTE — the 15 names `demo/color-picker/router/index.ts` declares. Not a
 *    generated space: the router's own table, guarded for parity below.
 *  · VIEWPORT — 390 / 1024 / 3440, the three W1.md names.
 *  · SCHEME — light / dark, the two the app ships (`useGlobalDark`).
 *  · PANE — **mobile only**. At 1024 and 3440 both panes render side by side, so
 *    one frame witnesses both. At 390 the shell shows ONE pane at a time
 *    (`defaultPaneIndex` in VIEW_MAP picks which), so the sibling pane — About,
 *    Mix, Blob, Palettes — is unreachable in the default frame. The pane axis
 *    exists at 390 *because a mobile user reaches the other pane by tapping the
 *    segmented control*, and is absent at desktop *because there is nothing
 *    there to reach*. That is L-19 applied, not evaded: it is precisely the
 *    "pane-hosted surfaces ARE reached" clause of R34.
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
    /** `VIEW_MAP[id].left` — the left pane component. */
    readonly left: string;
    /** `VIEW_MAP[id].right` — the right pane, or null for single-pane views. */
    readonly right: CensusRightPane;
    /** `router` meta.admin — the route needs the admin token seeded to render. */
    readonly admin: boolean;
    /** `VIEW_MAP[id].defaultPaneIndex ?? 0` — which pane a fresh mobile arrival shows. */
    readonly defaultPaneIndex: 0 | 1;
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
        defaultPaneIndex: 0,
    },
    {
        id: "palettes",
        path: "/#/palettes",
        left: "color-picker",
        right: "palettes",
        admin: false,
        defaultPaneIndex: 1,
    },
    {
        id: "browse",
        path: "/#/browse",
        left: "browse",
        right: "palettes",
        admin: false,
        defaultPaneIndex: 0,
    },
    {
        id: "extract",
        path: "/#/extract",
        left: "extract",
        right: "palettes",
        admin: false,
        defaultPaneIndex: 0,
    },
    {
        id: "mix",
        path: "/#/mix",
        left: "color-picker",
        right: "mix",
        admin: false,
        defaultPaneIndex: 1,
    },
    {
        id: "generate",
        path: "/#/generate",
        left: "generate",
        right: "palettes",
        admin: false,
        defaultPaneIndex: 0,
    },
    {
        id: "gradient",
        path: "/#/gradient",
        left: "gradient",
        right: "palettes",
        admin: false,
        defaultPaneIndex: 0,
    },
    {
        id: "atmosphere",
        path: "/#/atmosphere",
        left: "atmosphere",
        right: null,
        admin: false,
        defaultPaneIndex: 0,
    },
    {
        id: "blob",
        path: "/#/blob",
        left: "color-picker",
        right: "blob",
        admin: false,
        defaultPaneIndex: 0,
    },
    {
        id: "admin-users",
        path: "/#/admin/users",
        left: "admin-users",
        right: "palettes",
        admin: true,
        defaultPaneIndex: 0,
    },
    {
        id: "admin-names",
        path: "/#/admin/names",
        left: "admin-names",
        right: "palettes",
        admin: true,
        defaultPaneIndex: 0,
    },
    {
        id: "admin-audit",
        path: "/#/admin/audit",
        left: "admin-audit",
        right: "palettes",
        admin: true,
        defaultPaneIndex: 0,
    },
    {
        id: "admin-flagged",
        path: "/#/admin/flagged",
        left: "admin-flagged",
        right: "palettes",
        admin: true,
        defaultPaneIndex: 0,
    },
    {
        id: "admin-tags",
        path: "/#/admin/tags",
        left: "admin-tags",
        right: "palettes",
        admin: true,
        defaultPaneIndex: 0,
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
        defaultPaneIndex: 0,
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
 * The mobile pane axis: at 390 a dual-pane view needs TWO frames to witness both
 * panes. Returns the pane indices this (route, viewport) pair actually renders
 * to a user — one at 390 per frame, and a single combined frame at desktop.
 */
export function panesFor(route: CensusRoute, viewport: ViewportId): readonly (0 | 1)[] {
    if (viewport !== "390") return [route.defaultPaneIndex];
    if (route.right === null) return [0];
    return [0, 1];
}

/** The pane's own name, for the golden filename and the manifest. */
export function paneName(route: CensusRoute, pane: 0 | 1): string {
    return pane === 0 ? route.left : (route.right ?? "none");
}

/** Total route-arm cells, computed — never a number anyone typed. */
export function routeArmCellCount(): number {
    let n = 0;
    for (const r of ROUTE_CENSUS)
        for (const v of VIEWPORTS) n += panesFor(r, v.id).length * SCHEMES.length;
    return n;
}
