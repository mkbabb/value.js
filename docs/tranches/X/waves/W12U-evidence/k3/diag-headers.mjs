// SERVED MODEL: claude-opus-5-5
// X.W12U.k3 — diagnostic: visible pane headers + region wrappers per route at W×H.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const [W, H, theme] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900), process.argv[4] ?? "dark"];
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme });
    await prepare(ctx, { theme, admin: true, palettes: true, user: true, browse: "ok" });
    const p = await ctx.newPage();
    for (const r of (process.argv[5] ?? "/,/palettes").split(",")) {
        await p.goto(`${BASE}/#${r}`, { waitUntil: "commit", timeout: 600000 });
        await p.waitForTimeout(12000);
        console.log(r, JSON.stringify(await p.evaluate(() => ({
            headers: [...document.querySelectorAll("main .pane-header")].map((e) => [e.getClientRects().length, Math.round(e.getBoundingClientRect().height)]),
            wrappers: [...document.querySelectorAll("main .pane-wrapper")].map((w) => [w.dataset.pane, Math.round(w.getBoundingClientRect().height), w.children.length]),
            plate: !!document.querySelector(".pane-plate"),
        }))));
    }
} finally { await b.close(); }
