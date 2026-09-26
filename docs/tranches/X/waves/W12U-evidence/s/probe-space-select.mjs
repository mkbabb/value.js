// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-2 (home-picker) + UIA-V-5 (color-space-select) falsifier (:9000).
// Opens "Select color space" and reads the open listbox's box: GREEN iff it lies inside the
// viewport minus the 16 px gutter on both sides at 360, 390 and 430 (and 1440).
// Usage: node probe-space-select.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
for (const [W, H] of [[360, 780], [390, 844], [430, 932], [1440, 900]]) {
    const phone = W < 1024;
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/", { timeout: 90000 });
    const t = p.getByRole("combobox", { name: "Select color space" }).first();
    await t.waitFor({ timeout: 60000 });
    await p.waitForTimeout(1200);
    await t.click();
    await p.waitForTimeout(900);
    const r = await p.evaluate(() => {
        const lb = [...document.querySelectorAll("[role=listbox]")].find((e) => e.getBoundingClientRect().width > 0);
        if (!lb) return null;
        let el = lb; for (let n = lb; n; n = n.parentElement) { if (n.matches?.("[data-reka-popper-content-wrapper], [data-slot=select-content]")) { el = n; } }
        const r = el.getBoundingClientRect();
        return { l: Math.round(r.left), r: Math.round(r.right), vw: innerWidth };
    });
    const ok = r && r.l >= 16 - 0.5 && r.r <= r.vw - 16 + 0.5;
    out.push(`${ok ? "PASS" : "RED "} ${W}x${H} ${JSON.stringify(r)}`);
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
