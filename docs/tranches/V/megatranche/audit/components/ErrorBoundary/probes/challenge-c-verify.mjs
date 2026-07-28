/**
 * CHALLENGE-C (verification pass) — live probes the first pass did NOT run.
 * READ-ONLY: intercepts network at the browser only; edits no source file.
 *
 *   node docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes/challenge-c-verify.mjs
 */
import { chromium } from "playwright";

const URL = "http://localhost:9000";
const EV = "docs/tranches/V/megatranche/audit/components/ErrorBoundary/evidence";

const probe = () => ({
    hash: location.hash,
    paneContainer: !!document.querySelector(".pane-container"),
    boundaryPresent: !!document.querySelector(".vj-error-boundary"),
    boundaryText: (document.querySelector(".vj-error-boundary")?.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160),
    mainText: (document.querySelector("main.pane-main")?.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 120),
});

async function session(name, arm) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const log = [];
    page.on("console", (m) => {
        if (m.type() === "error" || m.type() === "warning") log.push(m.type() + ": " + m.text().slice(0, 140));
    });
    page.on("pageerror", (e) => log.push("PAGEERROR: " + String(e).slice(0, 140)));
    let out;
    try {
        out = await arm(page, log);
    } catch (e) {
        out = { PROBE_ERROR: String(e).slice(0, 220) };
    }
    await browser.close();
    return { name, ...out, log: log.slice(0, 10) };
}

const results = [];

// --- V-1 · NETWORK FAILURE on a lazily-imported pane chunk -------------------
// usePaneRouter's ten defineAsyncComponent calls carry no errorComponent.
// What does the user see when the chunk does not arrive at all?
results.push(
    await session("V-1 chunk-abort", async (page) => {
        await page.goto(URL + "/#/", { waitUntil: "load" });
        await page.waitForTimeout(3000);
        await page.route("**/BrowsePane.vue**", (r) => r.abort("failed"));
        await page.evaluate(() => { location.hash = "#/browse"; });
        await page.waitForTimeout(7000);
        const state = await page.evaluate(probe);
        await page.screenshot({ path: EV + "/V1-chunk-abort.png" });
        return { state };
    }),
);

// --- V-2 · a NON-Error thrown value -----------------------------------------
// `detail` is `err instanceof Error ? err.message : String(err)`.
results.push(
    await session("V-2 non-Error throw", async (page) => {
        await page.route("**/BrowsePane.vue**", (r) =>
            r.fulfill({
                status: 200,
                contentType: "text/javascript",
                body: 'export default { setup(){ return () => { throw { code: "color_progress_out_of_range", at: 7 }; }; } };',
            }),
        );
        await page.goto(URL + "/#/browse", { waitUntil: "load" });
        await page.waitForTimeout(5000);
        const state = await page.evaluate(probe);
        await page.screenshot({ path: EV + "/V2-non-error-throw.png" });
        return { state };
    }),
);

// --- V-3 · focus THEFT out of a live text field (REAL in-repo repro) ---------
// The gradient CSS box parses on a 500 ms debounce; the repo's record has a
// malformed colour function throwing out of that parse. The user is still
// typing when the boundary catches. Does it yank the caret?
results.push(
    await session("V-3 focus theft (gradient CSS box)", async (page) => {
        await page.goto(URL + "/#/gradient", { waitUntil: "load" });
        await page.waitForTimeout(5000);
        const box = page.locator('[role="textbox"][aria-label="Gradient CSS"]');
        await box.click();
        const before = await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            label: document.activeElement?.getAttribute("aria-label"),
        }));
        // Select-all then type a gradient with an empty colour function.
        await page.keyboard.press("Control+a");
        await page.keyboard.type("linear-gradient(90deg, oklch() 0%, red 100%)", { delay: 25 });
        await page.waitForTimeout(2500);
        const after = await page.evaluate(() => {
            const ae = document.activeElement;
            const cs = ae ? getComputedStyle(ae) : null;
            return {
                tag: ae?.tagName,
                role: ae?.getAttribute("role"),
                isBody: ae === document.body,
                outline: cs ? cs.outlineStyle + " " + cs.outlineWidth : null,
                boxShadow: cs ? cs.boxShadow : null,
                focusVisible: (() => { try { return ae?.matches(":focus-visible"); } catch { return null; } })(),
                selectionCollapsedInBoundary: (() => {
                    const s = getSelection();
                    return s && s.anchorNode
                        ? !!document.querySelector(".vj-error-boundary")?.contains(s.anchorNode)
                        : null;
                })(),
            };
        });
        const state = await page.evaluate(probe);
        await page.screenshot({ path: EV + "/V3-focus-theft.png" });
        return { focusBefore: before, focusAfter: after, state };
    }),
);

// --- V-4 · measured geometry + the duplicate role=alert ----------------------
results.push(
    await session("V-4 geometry + alert ambiguity", async (page) => {
        await page.route("**/BrowsePane.vue**", (r) =>
            r.fulfill({
                status: 200,
                contentType: "text/javascript",
                body: 'export default { setup(){ return () => { throw new Error("GEO"); }; } };',
            }),
        );
        await page.goto(URL + "/#/browse", { waitUntil: "load" });
        await page.waitForTimeout(5000);
        const geo = await page.evaluate(() => {
            const eb = document.querySelector(".vj-error-boundary");
            const btn = eb?.querySelector("button");
            const b = btn?.getBoundingClientRect();
            const ebr = eb?.getBoundingClientRect();
            return {
                button: b ? { w: Math.round(b.width), h: Math.round(b.height) } : null,
                buttonName: btn?.textContent?.replace(/\s+/g, " ").trim(),
                boundaryRect: ebr ? { x: Math.round(ebr.x), y: Math.round(ebr.y), w: Math.round(ebr.width), h: Math.round(ebr.height) } : null,
                boundaryPosition: eb ? getComputedStyle(eb).position : null,
                boundaryZ: eb ? getComputedStyle(eb).zIndex : null,
                boundaryOverflow: eb ? getComputedStyle(eb).overflow : null,
                canvasPosition: getComputedStyle(document.querySelector(".atmosphere-canvas")).position,
                canvasZ: getComputedStyle(document.querySelector(".atmosphere-canvas")).zIndex,
                paneWrapperZ: null,
                alertsInDocOrder: [...document.querySelectorAll('[role="alert"]')].map((a) => ({
                    text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 46),
                    visible: a.getBoundingClientRect().width > 0,
                })),
                headingCount: document.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
                headingsInBoundary: eb ? eb.querySelectorAll("h1,h2,h3,h4,h5,h6").length : null,
            };
        });
        return { geo };
    }),
);

console.log(JSON.stringify(results, null, 2));
