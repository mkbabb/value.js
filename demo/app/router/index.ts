import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { isViewId, type ViewId } from "../../shell/viewSchema";
import { preloadView } from "../../shell/usePaneRouter";
import { useAdminAuth } from "../../platform/auth/useAdminAuth";

import { installDocumentTitle } from "./useDocumentTitle";
import { installAdminGuard } from "./guards";
import NotFoundPane from "../../scenes/notfound/NotFoundPane.vue";

/**
 * Hash-based router for the color picker demo.
 * Uses hash mode to avoid server-side routing requirements (GitHub Pages, etc.).
 *
 * URL structure: /#/browse?sort=popular&color=oklch(0.7,0.15,180)&space=oklch
 *
 * Each route maps to a ViewId used by useViewManager to determine pane layout.
 * The actual pane rendering stays in App.vue — routes just control which view is active.
 */

// All routes use the same App.vue layout — we don't use <router-view> for rendering.
// Instead, the route name drives useViewManager's currentView, which controls pane config.
// A stub component is needed for vue-router but never rendered.
const Stub = { render: () => null };

// X.W5.c2 · N14 (ATP-33, COHESION §0ax ESC-R1-3) — one view identity, declared
// ONCE (`ViewId`, `demo/shell/viewSchema.ts`) and type-visible here: every
// record's `name` is a `ViewId`, so a misspelt or retired route name is a
// `vue-tsc` error at this declaration instead of a silent `isViewId` miss in
// `useViewManager`. (Exhaustiveness — every `ViewId` routed — is the byte-parity
// arm `e2e/visual/census-parity.spec.ts` holds.)
type ViewRoute = RouteRecordRaw & { readonly name: ViewId };

const routes: ViewRoute[] = [
    { path: "/", name: "picker", component: Stub },
    { path: "/palettes", name: "palettes", component: Stub },
    { path: "/browse", name: "browse", component: Stub },
    { path: "/extract", name: "extract", component: Stub },
    { path: "/mix", name: "mix", component: Stub },
    { path: "/generate", name: "generate", component: Stub },
    { path: "/gradient", name: "gradient", component: Stub },
    { path: "/atmosphere", name: "atmosphere", component: Stub },
    { path: "/blob", name: "blob", component: Stub },
    { path: "/admin/users", name: "admin-users", component: Stub, meta: { admin: true } },
    { path: "/admin/names", name: "admin-names", component: Stub, meta: { admin: true } },
    { path: "/admin/audit", name: "admin-audit", component: Stub, meta: { admin: true } },
    { path: "/admin/flagged", name: "admin-flagged", component: Stub, meta: { admin: true } },
    { path: "/admin/tags", name: "admin-tags", component: Stub, meta: { admin: true } },
    // X-W3 · G-20 — the catch-all is a NAMED record over a REAL component, not a
    // `redirect: "/"`. The redirect rewrote every unknown address to the picker,
    // which rendered correctly and answered the wrong question; `not-found` is a
    // view in `viewSchema.ts` like any other, so the pane system resolves it
    // through the one path it resolves everything else through. This is the
    // wave's ONE non-`Stub` record (W3.md §Dispositions D-4) — the pattern X-W5
    // generalizes to the fourteen above, which stay `Stub` here by that ruling.
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundPane },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// X-W3 · G-18 (P0) — fail-close the five `meta: { admin: true }` records against
// the admin token. Registered BEFORE the title guard: `beforeEach` fences the
// navigation, `afterEach` names whatever survived it, so the tab of a refused
// admin deep-link reads "Not Found" and never leaks the admin view's label.
installAdminGuard(router);

// The live tab title tracks the route's voice — the picked colour + the current
// pane — instead of the static "Color Picker". Registered here (the canonical
// navigation-guard home) so no header/mount file is touched. See useDocumentTitle.
installDocumentTitle(router);

// OD19-ALL (owner docket 2026-10-19: "All loading times for all apps needs to be
// improved, every page") — the DEEP LINK's pane chunks start at module evaluation.
// Before, a cold `#/gradient` requested its pane graph only when PaneSlot mounted,
// after the entry chunk had evaluated, the router had resolved and the app had
// begun its mount: measured on the built bundle at CPU 4x, the entry finished at
// 54 ms and `GradientPane` was requested at 654 ms (OD19/value.md "### load").
// The hash is the whole address under hash history, so `resolve` names the view
// synchronously here; the chunk then downloads and compiles off-thread while the
// boot evaluates. An admin view is warmed only for a held token: the guard would
// refuse it anyway, and a refused link fetches nothing it will not render.
if (typeof window !== "undefined") {
    const linked = router.resolve(window.location.hash.slice(1) || "/");
    if (isViewId(linked.name) && (!linked.meta.admin || useAdminAuth().isAuthenticated.value))
        preloadView(linked.name);
}
