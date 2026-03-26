import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

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

const routes: RouteRecordRaw[] = [
    { path: "/", name: "picker", component: Stub },
    { path: "/palettes", name: "palettes", component: Stub },
    { path: "/browse", name: "browse", component: Stub },
    { path: "/extract", name: "extract", component: Stub },
    { path: "/mix", name: "mix", component: Stub },
    { path: "/generate", name: "generate", component: Stub },
    { path: "/gradient", name: "gradient", component: Stub },
    { path: "/atmosphere", name: "atmosphere", component: Stub },
    { path: "/admin/users", name: "admin-users", component: Stub, meta: { admin: true } },
    { path: "/admin/names", name: "admin-names", component: Stub, meta: { admin: true } },
    { path: "/admin/audit", name: "admin-audit", component: Stub, meta: { admin: true } },
    { path: "/admin/flagged", name: "admin-flagged", component: Stub, meta: { admin: true } },
    { path: "/admin/tags", name: "admin-tags", component: Stub, meta: { admin: true } },
    // Catch-all: redirect unknown routes to picker
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
