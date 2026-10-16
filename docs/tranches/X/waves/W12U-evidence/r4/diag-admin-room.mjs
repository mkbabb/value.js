// Repair 4 (C5-5): why the overlying /admin/users host reads scroll room 0 at 1440.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
    const ctx = await b.newContext({ viewport: { width: W, height: H } });
    const hits = await prepare(ctx, { admin: true, palettes: true, user: true, browse: "ok" });
    const p = await ctx.newPage();
    await p.goto(`${BASE}/#/admin/users`, { waitUntil: "commit", timeout: 600000 });
    await p.waitForTimeout(12000);
    const r = await p.evaluate(() => {
        const head = [...document.querySelectorAll("main .pane-header")].find((e) => e.getClientRects().length);
        const host = head?.closest(".card-scroll-host");
        const title = head?.querySelector(".pane-header-title")?.textContent?.trim();
        const scrollers = [...document.querySelectorAll("main *")].filter((e) => e.scrollHeight > e.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(e).overflowY))
            .map((e) => ({ cls: String(e.className).slice(0, 80), sh: e.scrollHeight, ch: e.clientHeight }));
        return { title, host: !!host, hostSH: host?.scrollHeight, hostCH: host?.clientHeight, rows: document.querySelectorAll("main tr, main [role=row]").length, scrollers, docSH: document.documentElement.scrollHeight };
    });
    console.log(JSON.stringify({ W, H, hits, ...r }));
} finally { await b.close(); }
