/**
 * useDocumentTitle — the live `document.title`, driven off the route.
 *
 * The demo shipped a STATIC `<title>Color Picker</title>` (index.html) that
 * never reflected the app's live state (U.W-VISUAL census row 16 · sub-item d,
 * the zd3-microchrome roster: `document.title` static/generic, `dynamic=false`).
 * This wires the trivial dynamic-title cure the census named: the title carries
 * the app's live VOICE — the picked COLOR (the C3 color-as-data datum) and the
 * current PANE (the view label) — while always identifying the app.
 *
 * WHY a router `afterEach` guard (not an App.vue watcher):
 * - It is the canonical Vue home for `document.title`; it touches only the
 *   router config, never a header/mount surface (the U-F76 single-writer law —
 *   the header/mount chain has ONE writer, the header lane; the rider stays off
 *   those files).
 * - Both live signals are already ON THE ROUTE: `to.name` is the `ViewId` (→ the
 *   pane voice via `VIEW_MAP`), and `to.query.color` is the resolved colour
 *   voice (a named colour like `tomato`, or a hex / CSS string) — the exact
 *   string the app uses as the colour's shareable identity everywhere.
 *
 * WHY it does not thrash (the census "debounce if the colour changes per-frame"
 * clause): the colour reaches the title ONLY through the URL, and the model→URL
 * sync is DEBOUNCED at 300 ms (`useColorUrl.ts` `syncModelToUrl`), which writes
 * via `router.replace`. `afterEach` can therefore only fire as often as the
 * debounced URL sync navigates — a per-frame spectrum drag lands at most one
 * title update per ~300 ms. View changes are discrete and title instantly (no
 * added lag — the throttle lives upstream, on the colour path alone, exactly
 * where the per-frame churn is).
 */

import type { Router, RouteLocationNormalized } from "vue-router";
import { VIEW_MAP, isViewId } from "../../shell/viewSchema";

/** The app identity — kept in sync with the static `<title>` fallback. */
const APP_TITLE = "Color Picker";

/**
 * Compose the tab title from the route's live signals. Restrained by design —
 * a title, not a ticker: at most two live segments (colour · pane) plus the app
 * name. The picker (home) view titles by colour alone: its `label` ("Home") is
 * redundant with the app name, so it is elided to avoid "Home — Color Picker".
 */
export function composeTitle(name: unknown, color: unknown): string {
    const colorVoice =
        typeof color === "string" && color.trim() ? color.trim() : null;

    // The pane voice — omitted on the picker (home) view (redundant with the
    // app name below). Any unknown route name contributes no pane segment.
    const paneVoice =
        name !== "picker" && isViewId(name) ? VIEW_MAP[name].label : null;

    const live = [colorVoice, paneVoice].filter(Boolean).join(" · ");
    return live ? `${live} — ${APP_TITLE}` : APP_TITLE;
}

/**
 * Install the live-title guard on the router. Idempotent per router instance in
 * spirit — call once at router construction (`router/index.ts`), before mount.
 */
export function installDocumentTitle(router: Router): void {
    const apply = (to: RouteLocationNormalized): void => {
        document.title = composeTitle(to.name, to.query.color);
    };

    // Every navigation (view switch OR the debounced colour→URL `replace`).
    router.afterEach((to) => apply(to));

    // Seed the initial title once the first route resolves — `afterEach` covers
    // the initial navigation, but this guarantees a correct title even if the
    // guard were ever registered after `isReady`.
    void router.isReady().then(() => apply(router.currentRoute.value));
}
