// SERVED MODEL: claude-opus-5[1m]
//
// Navigation guards for the demo router.
//
// X-W3 · X.W3.6 · G-18 (P0). `router/index.ts` declared `meta: { admin: true }`
// on five records and enforced it nowhere — `grep -rn "beforeEach\|beforeEnter"
// demo` returned ZERO, so the flag was decorative and anyone who typed
// `/#/admin/users` mounted `AdminPane` in full. This file is the enforcement the
// flag always implied, registered beside `installDocumentTitle` in the file
// whose own comment already calls itself "the canonical navigation-guard home".

import type { Router, RouteLocationNormalized, RouteLocationRaw } from "vue-router";

import { useAdminAuth } from "../../platform/auth/useAdminAuth";

/**
 * Where an unauthorized admin navigation lands: the `not-found` record, at the
 * address the visitor typed.
 *
 * Resolving to not-found rather than to the picker is the fail-closed choice —
 * a bounce to `/` would confirm that `/admin/users` is a real route while
 * `/admin/nonsense` is not, handing an anonymous prober the admin route table.
 * The path is carried through as `pathMatch` so the address is not rewritten;
 * the record differs from the admin one, so vue-router runs this guard exactly
 * once more against a target whose `meta.admin` is undefined, and stops.
 */
function notFoundAt(to: RouteLocationNormalized): RouteLocationRaw {
    return {
        name: "not-found",
        params: { pathMatch: to.path.substring(1).split("/") },
        query: to.query,
    };
}

/**
 * Fail-close every `meta.admin` route against the admin token.
 *
 * WHY the token is read INSIDE the guard, per navigation, and not captured at
 * registration: `useAdminAuth` is a module-level singleton whose lazy init reads
 * `localStorage` on its first call (`useAdminAuth.ts:19-24`). Calling it here
 * keeps Storage off the import path — the SSR/Safari-private safety that
 * composable was written for — while still resolving SYNCHRONOUSLY, which is
 * what makes a cold deep-link safe in both directions: the guard cannot
 * fail-open on an auth race (there is no async hop to lose), and it cannot evict
 * an admin who deep-links with a held token (the value is already on disk when
 * the first navigation resolves). The computed `isAuthenticated` then tracks
 * login/logout for the rest of the session without re-reading Storage.
 */
export function installAdminGuard(router: Router): void {
    router.beforeEach((to) => {
        if (to.meta.admin !== true) return true;

        const { isAuthenticated } = useAdminAuth();
        return isAuthenticated.value ? true : notFoundAt(to);
    });
}
