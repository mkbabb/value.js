// X-DS value pass 18: the admin walk's hash navigation (users -> names), read over time: does the
// pane's <h1 id=route-title> mount? Real Chrome, new headless (§0ei); one browser, closed in finally.
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";
const BASE = process.argv[2] || "http://localhost:9481";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
    const page = await newPage(browser, 1440, "light");
    await page.addInitScript(() => { localStorage.setItem("palette-admin-token", "test-admin-token"); });
    page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
    page.on("console", (m) => m.type() === "error" && console.log("CONSOLE", m.text().slice(0, 300)));
    await bootRoute(page, BASE + "/#/admin/users", { allowAlert: true });
    for (const sub of ["names", "audit", "flagged", "tags"]) {
        await page.goto(BASE + "/#/admin/" + sub);
        for (const t of [300, 1500, 4000]) {
            await page.waitForTimeout(t);
            console.log(sub, t, JSON.stringify(await page.evaluate(() => ({
                h1: [...document.querySelectorAll("main h1")].map((h) => `${h.id}:${h.textContent.trim()}`),
                region: document.querySelector("main [role=region], main section")?.innerHTML.length ?? null,
                panes: [...document.querySelectorAll("main .pane-wrapper")].length,
                text: (document.querySelector("main .pane-wrapper")?.innerText ?? "").replace(/\s+/g, " ").slice(0, 160), html: (document.querySelector("main .pane-wrapper")?.outerHTML ?? "").slice(0, 1500),
                busy: document.querySelector("main [aria-busy=true]") ? true : false,
            }))));
        }
    }
} finally { await browser.close(); }
