/**
 * X.W7.c — a real-layout seat for the palette N-fixture assertions.
 *
 * jsdom has no layout engine (`scrollWidth`/`clientWidth` read 0), so a G9
 * overflow assertion there is vacuous. This helper serves the harness page
 * through the repo's own `vite.config.ts` (dev mode: the same PostCSS/Tailwind
 * pipeline and aliases as the shipped demo) and drives it in Playwright's
 * Chromium at the gate's viewport.
 */
import { createHash } from "node:crypto";
import { createServer as createNetServer } from "node:net";
import path from "node:path";
import { createServer, type ViteDevServer } from "vite";
import { chromium, type Browser, type Page } from "@playwright/test";

const REPO = path.resolve(import.meta.dirname, "../../../..");

export interface HarnessSeat {
    page: Page;
    close: () => Promise<void>;
}

export interface HarnessOptions {
    /**
     * Absolute paths of modules a suite mounts into the page AFTER it loads
     * (a dynamic `import("/@fs…")`), outside the harness's own entry graph.
     * Vite's dep scanner crawls only the declared entries, so a bare import
     * reachable solely through such a module (PaletteCardSkeleton's
     * `@mkbabb/glass-ui` root) was discovered at runtime on a cold cache: the
     * optimizer re-bundled and forced a full page reload mid-test, destroying
     * the evaluate's execution context (X-W11 §0gc, producer-plate-mass).
     * Declaring them here puts them in the pre-scan, so the optimized dep set
     * is complete before the first navigation.
     */
    mounts?: readonly string[];
}

/** A port the OS reports free on 127.0.0.1: listen on 0, read it, close. */
function freePort(): Promise<number> {
    return new Promise((resolve, reject) => {
        const probe = createNetServer();
        probe.once("error", reject);
        probe.listen(0, "127.0.0.1", () => {
            const address = probe.address();
            if (!address || typeof address === "string") {
                probe.close();
                reject(new Error("free-port probe has no port"));
                return;
            }
            probe.close(() => resolve(address.port));
        });
    });
}

/** "" for the bare harness; a stable suffix naming any other entry set. */
function cacheKey(mounts: readonly string[]): string {
    if (mounts.length === 0) return "";
    const set = [...new Set(mounts.map((m) => path.relative(REPO, m)))].sort().join("\n");
    return `-${createHash("sha256").update(set).digest("hex").slice(0, 12)}`;
}

export async function openHarness(
    viewport = { width: 390, height: 844 },
    { mounts = [] }: HarnessOptions = {},
): Promise<HarnessSeat> {
    const server: ViteDevServer = await createServer({
        configFile: path.join(REPO, "vite.config.ts"),
        mode: "development",
        root: path.join(import.meta.dirname, "harness"),
        // Its own optimized-deps cache: the harness root optimizes a smaller
        // dep set, and writing it into the shared `node_modules/.vite` broke
        // the live :9000 dev server's boot (X-DS VC3-01). Keyed by the entry
        // set: Vite's dep hash omits `optimizeDeps.entries`, so a seat with
        // mounts that found a cache written by a seat without them read it as
        // "Hash is consistent", skipped its own scan, and met the mounts' deps
        // at runtime (the cold `npm test` reload, X-W11 §0gc).
        cacheDir: path.join(REPO, `node_modules/.vite-harness${cacheKey(mounts)}`),
        // `entries` replaces the default (the root's `index.html`), so the
        // harness page is named alongside the suite's late mounts.
        optimizeDeps: { entries: ["index.html", ...mounts] },
        // An explicit free port, never `port: 0`: Vite 8 reads 0 as "unset"
        // and binds the shared default 5173 (X-W11 §0gr.5), so a seat could
        // land on — or collide with — another server. The OS names a free
        // port; `strictPort` makes a lost race fail loudly instead of
        // drifting to a neighbour's port.
        server: { port: await freePort(), host: "127.0.0.1", strictPort: true },
        logLevel: "error",
    });
    await server.listen();
    const address = server.httpServer?.address();
    if (!address || typeof address === "string") throw new Error("harness server has no port");
    const browser: Browser = await chromium.launch();
    const page = await browser.newPage({ viewport });
    await page.goto(`http://127.0.0.1:${address.port}/`);
    await page.waitForSelector("[role=article][data-case]");
    return {
        page,
        close: async () => {
            await browser.close();
            await server.close();
        },
    };
}

export interface CardGeometry {
    scrollWidth: number;
    clientWidth: number;
    height: number;
    nameWidth: number;
    /** The card's containing grid column width (the shipped list's). */
    gridWidth: number;
    cardWidth: number;
    /** `documentElement.scrollWidth` vs the viewport — page-level overflow. */
    docScrollWidth: number;
    viewportWidth: number;
}

/** Geometry of the card mounted for `key`. */
export function measureCard(page: Page, key: string): Promise<CardGeometry> {
    return page.evaluate((k) => {
        const card = document.querySelector<HTMLElement>(`[role=article][data-case="${k}"]`);
        if (!card) throw new Error(`no card for case ${k}`);
        const name = card.querySelector<HTMLElement>("[data-palette-name]");
        return {
            scrollWidth: card.scrollWidth,
            clientWidth: card.clientWidth,
            height: card.getBoundingClientRect().height,
            nameWidth: name ? name.getBoundingClientRect().width : 0,
            gridWidth: (card.parentElement as HTMLElement).clientWidth,
            cardWidth: card.getBoundingClientRect().width,
            docScrollWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
        };
    }, key);
}
