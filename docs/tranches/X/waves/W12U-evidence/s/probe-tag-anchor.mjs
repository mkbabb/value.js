// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-28 = A2-VA-X-4 falsifier (:9000). Browse (route-stubbed remote palettes,
// logged-in): "Edit Tags" from card 0 and from card 4 (below the fold). GREEN iff the tag
// popover's box lies inside the viewport AND touches its card's box (anchored: vertical gap
// to the card ≤ 24 px and horizontal overlap > 0), sampled 0.3 s and 1.3 s after the open.
// Usage: node probe-tag-anchor.mjs <width> <height> [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const out = [];
for (const card of [0, 4]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, user: true, browse: "ok" });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
    await p.waitForTimeout(1200);
    const trig = p.getByRole("button", { name: "Palette menu" }).nth(card);
    await trig.scrollIntoViewIfNeeded();
    await trig.click();
    await p.waitForTimeout(400);
    await p.getByRole("menuitem", { name: "Edit Tags" }).first().click();
    const s = [];
    for (const t of [300, 1000]) {
        await p.waitForTimeout(t);
        s.push(await p.evaluate((i) => {
            const d = [...document.querySelectorAll("[role=dialog]")].find((e) => e.getBoundingClientRect().width > 0 && /tags/i.test(e.innerText));
            const c = [...document.querySelectorAll('button[aria-label="Palette menu"]')][i]?.closest("[role=article]");
            if (!d || !c) return { miss: !d ? "popover" : "card" };
            const r = d.getBoundingClientRect(), k = c.getBoundingClientRect();
            const inside = r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth;
            const gap = Math.max(k.top - r.bottom, r.top - k.bottom, 0);
            const ovl = Math.min(r.right, k.right) - Math.max(r.left, k.left);
            return { box: [r.left, r.top, r.right, r.bottom].map(Math.round), card: [k.left, k.top, k.right, k.bottom].map(Math.round), inside, gap: Math.round(gap), ovl: Math.round(ovl) };
        }, card));
    }
    const ok = s.every((x) => x.inside && x.gap <= 24 && x.ovl > 0);
    out.push(`${ok ? "PASS" : "RED "} card ${card} ${JSON.stringify(s)}`);
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
