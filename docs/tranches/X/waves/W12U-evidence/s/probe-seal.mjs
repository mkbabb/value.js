// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-6 falsifier (:9000, 1440x900 headed). The collapsed dock's wax seal
// carries the current view's glyph (.dock-seal-ink, a painted svg inside the seal box), and in
// admin mode (an admin view, token seeded) the glyph wears the gold-shimmer-icon ink.
// Usage: node probe-seal.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
for (const admin of [false, true]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await prepare(ctx, { theme, admin });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:9000/#/${admin ? "admin/users" : "palettes"}`, { timeout: 90000 });
    await p.locator(".glass-dock").first().waitFor({ timeout: 60000 });
    await p.mouse.move(700, 600);
    await p.waitForTimeout(6000); // the dock collapses to its seal at rest
    const r = await p.evaluate(() => {
        const seal = document.querySelector(".dock-seal");
        const ink = seal?.querySelector(".dock-seal-ink");
        if (!seal || !ink) return { seal: !!seal, ink: false };
        const s = seal.getBoundingClientRect(), i = ink.getBoundingClientRect();
        const inside = i.width > 4 && i.left >= s.left - 1 && i.right <= s.right + 1 && i.top >= s.top - 1 && i.bottom <= s.bottom + 1;
        return { seal: true, ink: true, inside, gold: ink.classList.contains("gold-shimmer-icon"), iw: Math.round(i.width), sw: Math.round(s.width), color: getComputedStyle(ink).color };
    });
    const ok = r.ink && r.inside && (admin ? r.gold : !r.gold);
    out.push(`${ok ? "PASS" : "RED "} admin=${admin} ${JSON.stringify(r)}`);
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
