/**
 * CHALLENGE-C pass 3 · probe C3-6 — is the post-Retry blank recoverable?
 * After the pane blanks, try: (1) a second Retry (there is no button), (2) a
 * search keystroke, (3) leave the view and come back, (4) restore the backend
 * and re-enter. Read-only.
 */
import { chromium } from "playwright";

const BASE = process.env.PROBE_BASE ?? "http://192.168.1.166:9000";
const API = "https://api.color.babb.dev";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let backendDown = true;
await page.route(`${API}/**`, (r) =>
    r.fulfill({
        status: 200,
        headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
        body: "[]",
    }),
);
await page.route(`${API}/palettes**`, async (r) => {
    if (backendDown) return r.abort("connectionrefused");
    const res = await fetch(r.request().url(), { headers: { accept: "application/json" } });
    r.fulfill({
        status: res.status,
        headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
        body: await res.text(),
    });
});

await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

const snap = async (note) => {
    const s = await page.evaluate(() => {
        const grid = document.querySelector("main .grid.gap-3.pb-3");
        const main = document.querySelector("main");
        // read BrowsePane's own reactive state alongside the DOM
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
        // setupState is proxyRefs()-wrapped: refs auto-unwrap on read
        const displayed = pane?.setupState?.displayedBrowse;
        return {
            paneState: {
                browsing: pm?.browsing?.value,
                browseError: pm?.browseError?.value ?? null,
                remoteRows: pm?.remotePalettes?.value?.length,
                displayedRows: Array.isArray(displayed) ? displayed.length : "n/a",
            },
            gridElementChildren: grid?.childElementCount ?? -1,
            gridInnerTextLen: grid?.innerText.length ?? -1,
            errorPlate: (main?.innerText ?? "").includes("The commons is unreachable"),
            retryBtn: [...(main?.querySelectorAll("button") ?? [])].some(
                (b) => b.textContent?.trim() === "Retry",
            ),
            cards: main?.querySelectorAll('[role="article"]').length ?? 0,
            skeletons: main?.querySelectorAll('[aria-label="Loading palette"]').length ?? 0,
        };
    });
    return { note, ...s };
};

const out = [];
out.push(await snap("0 · error plate on entry"));

await page.getByRole("button", { name: "Retry" }).first().click();
await page.waitForTimeout(2000);
out.push(await snap("1 · after Retry"));

// (2) a search keystroke — does a fresh state change unstick it?
const box = page.locator('input[placeholder="Search the commons..."]').first();
await box.fill("ocean");
await page.waitForTimeout(1800);
out.push(await snap("2 · after typing 'ocean' (backend still down)"));
await box.fill("");
await page.waitForTimeout(1800);
out.push(await snap("3 · after clearing the search"));

// (3) leave the view and come back — the pane is KeepAlive'd
await page.goto(`${BASE}/#/picker`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1200);
await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
out.push(await snap("4 · after leaving and re-entering /#/browse"));

// (4) backend restored, re-enter
backendDown = false;
await page.goto(`${BASE}/#/picker`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1000);
await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
out.push(await snap("5 · backend restored, re-entered"));

await page.screenshot({ path: new URL("./c3-blank-recovery-final.png", import.meta.url).pathname });
console.log(JSON.stringify(out, null, 2));
await browser.close();
