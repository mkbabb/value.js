/**
 * E.W3 Lane A — user-auth fixture for non-admin smoke flows.
 *
 * Mirrors the admin-auth.ts shape (D.W5 Lane B): seed localStorage BEFORE
 * the page's first script runs, then wildcard-mock every backend
 * endpoint the user-facing flows hit so no XHR escapes to the network.
 *
 * Strategy parallel to admin-auth:
 *   1. addInitScript seeds palette-user-slug + palette-user-token
 *      (the keys useUserAuth.ts module reads on first call).
 *   2. page.route mocks /sessions, /sessions/me, /palettes/*, /colors/*,
 *      and /palettes/<slug>/{vote,flag,fork,versions} with shape-correct
 *      envelopes (matched against demo/@/lib/palette/types.ts).
 *
 * Envelope shapes:
 *   PaginatedResponse<T> = { data: T[]; total: number; limit: number; offset: number }
 *   Session: { token, userSlug }
 *   Palette: { slug, name, colors, userSlug, voteCount, voted, isLocal, ... }
 *
 * Per-spec route handlers may override these defaults via additional
 * `page.route` calls AFTER the fixture installs (the most-recent route
 * wins in Playwright). Use that to fulfill specific mutate endpoints.
 */
import { test as base } from "@playwright/test";

const SLUG_STORAGE = "palette-user-slug";
const TOKEN_STORAGE = "palette-user-token";
const SESSION_STORAGE = "palette-session-token";
const FAKE_SLUG = "test-user";
const FAKE_TOKEN = "test-user-token";

const PAGINATED = JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 });
const SESSION_BODY = JSON.stringify({ token: FAKE_TOKEN, userSlug: FAKE_SLUG });
const ME_BODY = JSON.stringify({ userSlug: FAKE_SLUG, slug: FAKE_SLUG });

/**
 * True for the palette REST API surface — the `/palettes` path component and
 * its sub-paths — but never the demo's own Vite source modules (e.g.
 * `/@fs/.../demo/@/lib/palette/api/palettes.ts`, the H.W3 api.ts split). The
 * REST path has no Vite source namespace and no module extension; the source
 * module lives under `/@fs/`, `/@id/`, or `/node_modules/` and ends in `.ts`.
 */
const isPaletteApi = (url: URL): boolean => {
    if (/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname)) return false;
    if (/\.(ts|tsx|js|mjs|cjs|jsx|vue|css)$/.test(url.pathname)) return false;
    return /(^|\/)palettes(\/|$)/.test(url.pathname);
};

export const userTest = base.extend({
    page: async ({ page }, use) => {
        // 1. Seed user creds BEFORE any page script runs. useUserAuth's
        //    lazy-init reads these on its first call — page boots as
        //    authenticated, no auto-register XHR fires.
        await page.addInitScript(
            ([slugKey, slugVal, tokenKey, tokenVal, sessionKey]) => {
                localStorage.setItem(slugKey, slugVal);
                localStorage.setItem(tokenKey, tokenVal);
                sessionStorage.setItem(sessionKey, tokenVal);
            },
            [SLUG_STORAGE, FAKE_SLUG, TOKEN_STORAGE, FAKE_TOKEN, SESSION_STORAGE],
        );

        // 2. Session endpoints — POST /sessions (anonymous registration),
        //    GET /sessions/me (slug confirmation), DELETE /sessions
        //    (logout). All stubbed so boot stays offline-deterministic.
        await page.route("**/sessions", (route) => {
            const m = route.request().method();
            if (m === "POST") {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: SESSION_BODY,
                });
            }
            return route.fulfill({ status: 204, body: "" });
        });
        await page.route("**/sessions/me", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: ME_BODY,
            }),
        );
        await page.route("**/sessions/login", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: SESSION_BODY,
            }),
        );

        // 3. Palette browse — covers `/palettes`, `/palettes/mine`,
        //    `/palettes/<slug>/versions`, `/palettes/<slug>/forks`,
        //    `/colors/approved`, `/colors/search`, `/colors/tags`.
        //    Each per-spec fixture may override individual routes to
        //    fulfill a mutate endpoint with a custom shape.
        //
        //    NOTE: the glob must NOT swallow the demo's own Vite source
        //    module `/@fs/.../demo/@/lib/palette/api/palettes.ts` (the
        //    H.W3 api.ts decomposition created that path). A `**/palettes**`
        //    glob matched it and fulfilled the JS module with a JSON body,
        //    so the browser failed the module load ("Expected a
        //    JavaScript-or-Wasm module script") and the app never booted.
        //    Match the API endpoint by its path component only — the
        //    `/palettes` REST path, never a `.ts`/`.vue` source module under
        //    a Vite `/@fs/`, `/@id/`, or `/node_modules/` namespace.
        await page.route(isPaletteApi, (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: PAGINATED,
            }),
        );
        await page.route("**/colors/**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: PAGINATED,
            }),
        );

        await use(page);
    },
});

export { expect } from "@playwright/test";
