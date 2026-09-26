// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-101 falsifier (:9000). /palettes (6 saved) and /browse (8 remote) at a
// coarse phone width: every card's "Palette menu" button lies inside its card's box (no edge
// crossing the card's bottom or top). Usage: node probe-menu-seat.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const out = [];
for (const route of ["palettes", "browse"]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, palettes: true, browse: "ok" });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:9000/#/${route}`, { timeout: 90000 });
    await p.waitForTimeout(2500);
    const r = await p.evaluate(() => [...document.querySelectorAll('button[aria-label="Palette menu"]')].map((t) => {
        const c = t.closest("[role=article]"); if (!c) return null;
        const a = t.getBoundingClientRect(), k = c.getBoundingClientRect();
        return { over: Math.round(Math.max(a.bottom - k.bottom, k.top - a.top, 0)), btn: Math.round(a.height) };
    }).filter(Boolean));
    const bad = r.filter((x) => x.over > 0);
    out.push(`${bad.length ? "RED " : "PASS"} /${route} ${r.length} cards, ${bad.length} crossing ${JSON.stringify(bad.slice(0, 2))} btn ${r[0]?.btn}`);
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
