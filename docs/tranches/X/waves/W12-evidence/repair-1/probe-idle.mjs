// SERVED MODEL: claude-opus-5-5
// X-W12 Repair 1 probe (read-only). BASE=http://localhost:<port> node probe-idle.mjs
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: false, args: [] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
async function measure(label) {
    const r = await page.evaluate(() => new Promise((res) => {
        const f = []; let last = 0; let n = 0;
        const tick = (t) => { if (last) f.push(t - last); last = t; if (++n < 150) requestAnimationFrame(tick); else res(f); };
        requestAnimationFrame(tick);
    }));
    r.sort((a, b) => a - b);
    const p = (q) => r[Math.min(r.length - 1, Math.floor((q / 100) * r.length))].toFixed(2);
    console.log(`${label}: n=${r.length} p50=${p(50)} p95=${p(95)} max=${r.at(-1).toFixed(2)} over16.7=${r.filter((x) => x > 16.7).length} over20=${r.filter((x) => x > 20).length}`);
}
await page.setContent("<html><body style='background:#222'>blank</body></html>");
await page.waitForTimeout(1000);
await measure("blank");
await measure("blank");
await page.addInitScript(() => localStorage.setItem("vueuse-color-scheme", "dark"));
await page.goto((process.env.BASE ?? "http://localhost:9000") + "/#/?space=lab");
await page.getByRole("slider", { name: "L channel" }).first().waitFor({ state: "visible", timeout: 30000 });
await page.waitForTimeout(4000);
await measure("app idle");
await measure("app idle");
await browser.close();
