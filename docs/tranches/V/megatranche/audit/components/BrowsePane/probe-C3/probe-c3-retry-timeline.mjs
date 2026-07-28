/**
 * CHALLENGE-C pass 3 · probe C3-4 — what the user sees for how long after
 * pressing Retry (BrowsePane.vue:69-76), the sole affordance on the ONLY state
 * the Safari visual matrix ever photographed. Polls the pane at 100 ms.
 * Read-only.
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

await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

const sample = () =>
    page.evaluate(() => {
        const main = document.querySelector("main");
        const t = main?.innerText ?? "";
        return {
            errorPlate: t.includes("The commons is unreachable"),
            retryBtn: [...(main?.querySelectorAll("button") ?? [])].some(
                (b) => b.textContent?.trim() === "Retry",
            ),
            skeletons: main?.querySelectorAll('[aria-label="Loading palette"]').length ?? 0,
            focus: document.activeElement?.tagName,
        };
    });

const timeline = [];
timeline.push({ t: 0, note: "before Retry", ...(await sample()) });

await page.getByRole("button", { name: "Retry" }).first().focus();
const t0 = Date.now();
await page.keyboard.press("Enter");
for (let i = 0; i < 60; i++) {
    timeline.push({ t: Date.now() - t0, ...(await sample()) });
    await page.waitForTimeout(100);
}

// collapse to state transitions only
const key = (s) => `${s.errorPlate}|${s.retryBtn}|${s.skeletons}|${s.focus}`;
const transitions = [];
let last = null;
for (const s of timeline) {
    if (key(s) !== last) {
        transitions.push(s);
        last = key(s);
    }
}
console.log(
    JSON.stringify(
        { transitions, totalSampledMs: timeline.at(-1).t, samples: timeline.length },
        null,
        2,
    ),
);
await browser.close();
