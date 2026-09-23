/**
 * X.W7.c — a real-layout seat for the palette N-fixture assertions.
 *
 * jsdom has no layout engine (`scrollWidth`/`clientWidth` read 0), so a G9
 * overflow assertion there is vacuous. This helper serves the harness page
 * through the repo's own `vite.config.ts` (dev mode: the same PostCSS/Tailwind
 * pipeline and aliases as the shipped demo) and drives it in Playwright's
 * Chromium at the gate's viewport.
 */
import path from "node:path";
import { createServer, type ViteDevServer } from "vite";
import { chromium, type Browser, type Page } from "@playwright/test";

const REPO = path.resolve(import.meta.dirname, "../../../..");

export interface HarnessSeat {
    page: Page;
    close: () => Promise<void>;
}

export async function openHarness(viewport = { width: 390, height: 844 }): Promise<HarnessSeat> {
    const server: ViteDevServer = await createServer({
        configFile: path.join(REPO, "vite.config.ts"),
        mode: "development",
        root: path.join(import.meta.dirname, "harness"),
        server: { port: 0, host: "127.0.0.1", strictPort: false },
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
