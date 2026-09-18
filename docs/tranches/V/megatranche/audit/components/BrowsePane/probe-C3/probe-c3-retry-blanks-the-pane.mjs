/**
 * CHALLENGE-C pass 3 · probe C3-5 — THE HEADLINE.
 *
 * Press Retry on the error plate (BrowsePane.vue:69-76) and the pane's entire
 * body disappears and never returns. This probe proves the STATE says "render
 * the error plate" while the DOM holds nothing, which localises the fault to
 * the `<Transition name="vj-morph" mode="out-in">` at BrowsePane.vue:40 rather
 * than to the composable's state machine.
 *
 * Read-only. `/palettes` is aborted at the network layer so the pane is in the
 * exact state 4-of-4 Safari matrices photographed.
 */
import { chromium } from "playwright";

const BASE = process.env.PROBE_BASE ?? "http://192.168.1.166:9000";
const API = "https://api.color.babb.dev";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route(`${API}/**`, (r) =>
    r.fulfill({
        status: 200,
        headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
        body: "[]",
    }),
);
await page.route(`${API}/palettes**`, (r) => r.abort("connectionrefused"));

const consoleLog = [];
page.on("console", (m) => consoleLog.push(`${m.type()}: ${m.text()}`.slice(0, 160)));
page.on("pageerror", (e) => consoleLog.push(`PAGEERROR: ${e.message}`.slice(0, 200)));

await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

/** the pane's own reactive state + what its grid container actually contains */
const readPane = () =>
    page.evaluate(() => {
        const root = document.querySelector("#app")?.__vue_app__?._instance;
        let pane = null;
        const walk = (n, d = 0) => {
            if (!n || d > 40 || pane) return;
            if ((n.type?.__name ?? n.type?.name) === "BrowsePane") pane = n;
            const push = (v) => {
                if (!v) return;
                if (Array.isArray(v)) v.forEach(push);
                else if (v.component) walk(v.component, d + 1);
                else if (v.children) push(v.children);
            };
            if (n.subTree) push(n.subTree);
        };
        walk(root);
        const pm = pane?.setupState?.pm;

        // BrowsePane's grid container is the div that holds the <Transition>
        const grid = document.querySelector("main .grid.gap-3.pb-3");
        return {
            state: {
                browsing: pm?.browsing?.value,
                browseError: pm?.browseError?.value,
                displayedBrowseLength: pane?.setupState?.displayedBrowse?.value?.length,
                hasMore: pm?.hasMore?.value,
                loadingMore: pm?.loadingMore?.value,
            },
            templatePredicts:
                pm?.browsing?.value
                    ? "developing (skeletons)"
                    : pm?.browseError?.value && pane?.setupState?.displayedBrowse?.value?.length === 0
                      ? "error (EmptyState + Retry)"
                      : "wall (PaletteCardGrid)",
            domActually: grid
                ? {
                      childNodes: [...grid.childNodes].map((n) =>
                          n.nodeType === 8
                              ? `<!--${n.textContent}-->`
                              : `${n.nodeName}.${n.className ?? ""}`.slice(0, 60),
                      ),
                      innerTextLen: grid.innerText.length,
                      elementChildren: grid.childElementCount,
                  }
                : "GRID CONTAINER NOT FOUND",
        };
    });

const out = {};
out.beforeRetry = await readPane();

await page.getByRole("button", { name: "Retry" }).first().focus();
const t0 = Date.now();
await page.keyboard.press("Enter");

out.after = [];
for (const wait of [400, 1000, 3000, 5000, 10000]) {
    while (Date.now() - t0 < wait) await page.waitForTimeout(50);
    out.after.push({ tMs: Date.now() - t0, ...(await readPane()) });
}

out.focusAfter = await page.evaluate(() => document.activeElement?.tagName);
out.consoleTail = consoleLog.slice(-6);
await page.screenshot({
    path: new URL("./c3-retry-blanked-pane.png", import.meta.url).pathname,
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
