// SERVED MODEL: claude-opus-5-5 — X-W12U Repair 3: why /mix's pane header reads no .card-scroll-host at 390x844
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:9000";
const b = await chromium.launch({ headless: true });
try {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, colorScheme: "light" });
    await p.goto(`${BASE}/#/mix`, { waitUntil: "commit", timeout: 120000 });
    await p.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 120000 });
    for (const t of [500, 3000, 8000]) {
        await p.waitForTimeout(t);
        const r = await p.evaluate(() => {
            const heads = [...document.querySelectorAll("main .pane-header")];
            return heads.map((h) => {
                const chain = [];
                for (let e = h.parentElement; e && chain.length < 9; e = e.parentElement) chain.push(e.tagName.toLowerCase() + "." + [...e.classList].slice(0, 3).join("."));
                return { rects: h.getClientRects().length, title: h.textContent.trim().slice(0, 30), chain };
            });
        });
        console.log(`t+${t}`, JSON.stringify(r));
    }
} finally { await b.close(); }
