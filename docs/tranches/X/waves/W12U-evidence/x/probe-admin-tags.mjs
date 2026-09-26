// SERVED MODEL: claude-opus-5-5
// X.W12U.x · §2.2 — /admin/tags: guard or catch-all? Headed Chromium on :9000.
// Reads, at 390x844 and 1440x900: the pane heading, the document title, the hash,
// for (a) anonymous deep-link, (b) anonymous in-app hash navigation,
// (c) admin token + populated stub, (d) admin token refused by the server (401).
// Usage: node probe-admin-tags.mjs [out.json]
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:9000";
const TAGS = [
    { id: "t1", name: "moody", category: "mood", createdAt: "2026-07-05T00:00:00.000Z" },
    { id: "t2", name: "pastel", category: "tone", createdAt: "2026-07-05T00:00:00.000Z" },
];

async function stub(page, mode) {
    await page.route("**/sessions", (r) =>
        r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "s", userSlug: "test-user" }) }),
    );
    await page.route("**/admin/**", (r) => {
        if (!new URL(r.request().url()).pathname.startsWith("/admin/")) return r.continue();
        if (mode === "refused") return r.fulfill({ status: 401, contentType: "application/json", body: '{"error":"Unauthorized"}' });
        return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) });
    });
}

async function read(page) {
    await page.waitForTimeout(1200);
    return page.evaluate(() => {
        const h = [...document.querySelectorAll("main h1, main h2, [role=main] h1, [role=main] h2, .pane-header, h1, h2")]
            .map((e) => e.textContent.trim().replace(/\s+/g, " "))
            .filter(Boolean)
            .slice(0, 4);
        return { hash: location.hash, title: document.title, headings: h, notFound: document.body.innerText.includes("This address names no view") };
    });
}

const out = [];
const browser = await chromium.launch({ headless: false });
for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    for (const state of ["anon-deeplink", "anon-hashnav", "admin-deeplink", "admin-hashnav", "admin-refused"]) {
        const ctx = await browser.newContext({ viewport: vp });
        const page = await ctx.newPage();
        const admin = state.startsWith("admin");
        if (admin) await page.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
        await stub(page, state === "admin-refused" ? "refused" : "ok");
        if (state.endsWith("hashnav")) {
            await page.goto(BASE + "/#/");
            await page.waitForTimeout(800);
            await page.evaluate(() => { location.hash = "#/admin/tags"; });
        } else {
            await page.goto(BASE + "/#/admin/tags");
        }
        out.push({ vp: `${vp.width}x${vp.height}`, state, ...(await read(page)) });
        await ctx.close();
    }
}
await browser.close();
const json = JSON.stringify(out, null, 1);
if (process.argv[2]) writeFileSync(process.argv[2], json);
console.log(json);
