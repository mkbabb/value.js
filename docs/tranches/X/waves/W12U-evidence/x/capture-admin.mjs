// SERVED MODEL: claude-opus-5-5
// X.W12U.x · §2.1 — admin, populated. Headed Chromium (real GPU) on :9000.
// For each admin route x viewport x theme: metrics (measure-x.js) at rest, after
// paging to page 2, and with the first destructive confirm dialog open.
// Usage: node capture-admin.mjs <out.json> [vpTags comma list] [frames dir]
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { prepare, VIEWPORTS, isPhone } from "./seed-x.mjs";

const HERE = dirname(new URL(import.meta.url).pathname);
const BASE = process.env.BASE ?? "http://localhost:9000";
const MX = readFileSync(join(HERE, "measure-x.js"), "utf8");
const OUT = process.argv[2] ?? "/dev/stdout";
const TAGS = (process.argv[3] ?? Object.keys(VIEWPORTS).join(",")).split(",");
const FR = process.argv[4];
if (FR) mkdirSync(FR, { recursive: true });
const ROUTES = ["/admin/users", "/admin/names", "/admin/audit", "/admin/flagged", "/admin/tags"];

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const res = [];
for (const tag of TAGS) {
    const [w, h] = VIEWPORTS[tag];
    for (const theme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: isPhone(tag), isMobile: isPhone(tag) });
        const hits = await prepare(ctx, { theme, admin: true });
        await ctx.addInitScript(MX);
        const page = await ctx.newPage();
        for (const route of ROUTES) {
            const row = { tag, theme, route };
            await page.goto(BASE + "/#" + route);
            // settle: the admin pane's list (or its empty/error plate) is painted, not the scene loader
            await page.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 30000 }).catch(() => {});
            await page.waitForTimeout(1500);
            row.rest = await page.evaluate(() => window.__mx());
            const slug = route.slice(7);
            if (FR) await page.screenshot({ path: join(FR, `${tag}-${theme}-${slug}.jpg`), type: "jpeg", quality: 50, fullPage: true });
            // pager → page 2
            const next = page.getByRole("button", { name: /next/i }).first();
            if (await next.isVisible().catch(() => false)) {
                await next.click().catch(() => {});
                await page.waitForTimeout(700);
                row.page2 = await page.evaluate(() => window.__mx());
            } else row.page2 = null;
            // first destructive confirm
            const destr = page.locator("main button").filter({ hasText: /delete|dismiss|remove|reject/i })
                .or(page.locator("main button[aria-label*='elete'], main button[aria-label*='ismiss'], main button[aria-label*='emove']")).first();
            if (await destr.isVisible().catch(() => false)) {
                row.destrLabel = ((await destr.getAttribute("aria-label")) || (await destr.textContent()) || "").trim().slice(0, 40);
                await destr.click().catch(() => {});
                await page.waitForTimeout(600);
                row.confirm = await page.evaluate(() => window.__mx());
                if (FR && row.confirm.dialogs.length) await page.screenshot({ path: join(FR, `${tag}-${theme}-${slug}-confirm.jpg`), type: "jpeg", quality: 50 });
                await page.keyboard.press("Escape");
                await page.waitForTimeout(300);
            } else row.confirm = null;
            res.push(row);
        }
        res.push({ tag, theme, adminHits: hits.admin });
        await ctx.close();
    }
    console.log(tag, "done");
}
await browser.close();
writeFileSync(OUT, JSON.stringify(res, null, 1));
