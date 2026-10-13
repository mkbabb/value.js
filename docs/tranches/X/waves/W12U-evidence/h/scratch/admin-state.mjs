// SERVED MODEL: claude-opus-5-5
// X.W12U.h scratch — what the inspector region shows on an /admin route under the refused seed.
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [route = "/admin/tags", refused = "1", admin = "1"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const hits = await prepare(ctx, { theme: "light", admin: admin === "1", refused: refused === "1" });
if (process.env.OUTAGE) await ctx.route("**/admin/**", (r) => new URL(r.request().url()).pathname.startsWith("/admin/") ? r.fulfill({ status: 500, contentType: "application/json", body: '{"error":"boom"}' }) : r.continue());
const p = await ctx.newPage();
const reqs = [];
p.on("request", (r) => { if (/admin/.test(r.url()) && !/\.(vue|ts|js|css)/.test(r.url())) reqs.push(r.method() + " " + r.url().slice(0, 90)); });
await p.goto((process.env.BASE ?? "http://localhost:9000") + "/#" + route, { timeout: 240000 });
await p.waitForFunction(() => document.querySelectorAll(".pane-wrapper .pane-header-title").length > 0, null, { timeout: 90000 }).catch(() => {});
await p.waitForTimeout(4000);
console.log("url", p.url());
console.log("reqs", JSON.stringify(reqs.slice(0, 8)), "hits", JSON.stringify(hits ?? null));
console.log(await p.evaluate(() => [...document.querySelectorAll(".pane-wrapper")].map((w) => [...w.classList].join(".") + " :: " + w.innerText.replace(/\s+/g, " ").slice(0, 400)).join("\n")));
console.log("btns", await p.evaluate(() => [...document.querySelectorAll(".pane-wrapper--inspector button")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 24) + (e.disabled || e.getAttribute("aria-disabled") === "true" ? "[dis]" : ""))));
console.log("alerts", await p.evaluate(() => [...document.querySelectorAll("[role=alert],[role=status],[data-admin-access]")].map((e) => e.getAttribute("role") + "|" + e.getAttribute("data-admin-access") + "|" + e.getBoundingClientRect().width + "|" + e.innerText.slice(0, 80))));
await b.close();
