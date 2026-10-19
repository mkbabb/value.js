// SERVED MODEL: claude-opus-5-5
// X.W12U.k3 — measure-before-edit: the ancestor chain of each pane's scroll host at W×H,
// so the unbounded box under the overlying /admin/users host is named at true bytes.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const routes = (process.argv[4] ?? "/admin/users,/mix").split(",");
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
    const ctx = await b.newContext({ viewport: { width: W, height: H } });
    await prepare(ctx, { admin: true, palettes: true, user: true, browse: "ok" });
    const p = await ctx.newPage();
    for (const r of routes) {
        await p.goto(`${BASE}/#${r}`, { waitUntil: "commit", timeout: 600000 });
        await p.waitForTimeout(10000);
        const out = await p.evaluate(() => {
            const head = [...document.querySelectorAll("main .pane-header")].find((e) => e.getClientRects().length);
            const chain = [];
            for (let e = head?.parentElement; e && e !== document.body; e = e.parentElement) {
                const cs = getComputedStyle(e);
                chain.push(`${e.tagName.toLowerCase()}.${String(e.className).split(/\s+/).slice(0, 3).join(".")} h=${Math.round(e.getBoundingClientRect().height)} sh=${e.scrollHeight} ch=${e.clientHeight} d=${cs.display} oy=${cs.overflowY} gtr=${cs.gridTemplateRows.slice(0, 40)} as=${cs.alignSelf} mh=${cs.maxHeight}`);
            }
            return { docSH: document.documentElement.scrollHeight, chain };
        });
        console.log(r, JSON.stringify(out, null, 1));
    }
} finally { await b.close(); }
