// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o22 :80 diagnosis: abort the api paths at the network layer
// (the oracle's own route), then read the dock lamp + the requests seen.
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const seen = [];
    page.on("request", (r) => { if (/\/(colors|sessions|palettes|users)\//.test(r.url())) seen.push(r.url()); });
    const reqs = [];
    page.on("request", (r) => { if (!/\.(js|css|ts|vue|woff2|svg|png)(\?|$)/.test(r.url()) && !r.url().includes("/@")) reqs.push(r.method() + " " + r.url()); });
    const mode = process.argv[3] ?? "oracle";
    const nonApi = [];
    await page.route(/\/(colors|sessions|palettes|users)\//, (route) => {
        const t = route.request().resourceType();
        if (t !== "fetch" && t !== "xhr") nonApi.push(t + " " + route.request().url());
        if (mode === "api" && t !== "fetch" && t !== "xhr") return route.continue();
        return route.abort("connectionrefused");
    });
    page.on("close", () => {});
    process.on("exit", () => console.log("non-api matched", nonApi.length, nonApi.slice(0, 4).join(" ")));
    await page.goto(base + "/");
    await page.waitForSelector(".glass-dock");
    await page.waitForTimeout(8000);
    const r = await page.evaluate(() => ({
        lamps: [...document.querySelectorAll(".api-status-chip")].map((e) => `${e.className} ${e.getAttribute("data-variant")}`),

    }));
    console.log(JSON.stringify(r));
    console.log("aborted", seen.length, seen.slice(0, 5).join(" "));
    console.log("other non-asset requests", reqs.slice(0, 15).join("\n"));
} finally {
    await browser.close();
}
