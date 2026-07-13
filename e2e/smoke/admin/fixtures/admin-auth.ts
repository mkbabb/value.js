/**
 * D.W5 Lane B — admin-auth fixture.
 *
 * The categorical opposite of the abrogated W5-C login-flow mocking
 * (which hung trying to intercept POST /sessions/admin/login).
 *
 * Strategy: seed localStorage["palette-admin-token"] via `addInitScript`
 * BEFORE the page's first script runs. `useAdminAuth` is a module-level
 * singleton with lazy init — its first call reads the storage value
 * exactly once. No login UI ever runs.
 *
 * Network: wildcard-mock every admin endpoint with shape-correct empty
 * envelopes. Anonymous-session POST /sessions is also stubbed so boot
 * stays offline-deterministic.
 *
 * Envelope shapes match `demo/@/lib/palette/types.ts`:
 *   PaginatedResponse<T> = { data: T[]; total: number; limit: number; offset: number }
 *   getAdminTags returns Tag[] (no envelope) — see api.ts line 421.
 */
import { test as base } from "@playwright/test";

const STORAGE_KEY = "palette-admin-token";
const FAKE_TOKEN = "test-admin-token";

const PAGINATED = JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 });
const RAW_ARRAY = JSON.stringify([]);

export const adminTest = base.extend({
    page: async ({ page }, use) => {
        // 1. Seed the admin token BEFORE any page script runs. useAdminAuth's
        //    lazy-init reads this value on its first call, treating the page
        //    as authenticated for the entire test lifetime.
        await page.addInitScript(
            ([key, val]) => {
                localStorage.setItem(key, val);
            },
            [STORAGE_KEY, FAKE_TOKEN],
        );

        // 2. Anonymous session POST — useSession.ensureSession() hits this
        //    on boot if no session token is present. Stub to keep boot
        //    deterministic without the API container.
        await page.route("**/sessions", (route) => {
            if (route.request().method() === "POST") {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        token: "test-session-token",
                        userSlug: "test-user",
                    }),
                });
            }
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: "{}",
            });
        });

        // 3. Wildcard admin surface — every panel's onMounted XHR gets a
        //    shape-correct empty envelope. No XHR ever hits the network.
        await page.route("**/admin/**", (route) => {
            const url = route.request().url();
            // T.W1 F4: the `palette-browser/admin/` source dir now puts `/admin/`
            // in vite MODULE URLs; mock ONLY genuine API calls (pathname `/admin/…`),
            // never module/asset requests (let those fall through to the dev server).
            if (!new URL(url).pathname.startsWith("/admin/")) return route.continue();
            // getAdminTags returns Tag[] directly (no PaginatedResponse wrapper).
            if (url.includes("/admin/tags")) {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: RAW_ARRAY,
                });
            }
            // All other admin GETs return PaginatedResponse<T>.
            // The audit endpoint also returns {data, total, limit, offset} per
            // useAdminAudit.loadAuditLog (entries.value = res.data; total = res.total).
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: PAGINATED,
            });
        });

        await use(page);
    },
});

export { expect } from "@playwright/test";
