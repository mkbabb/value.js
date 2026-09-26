// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-32 (= A2-VA-L2-1 at 844×390) falsifier (:9000). /browse (stubbed wall,
// logged-in so the tag catalogue fills) → Filters. GREEN iff the popover's box lies inside the
// viewport AND "Find by Color" and (with a filter active) "Clear all filters" can be reached:
// each is inside the viewport, or inside a scroller that can bring it there.
// Usage: node probe-filter-fit.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true, browse: "ok" });
await ctx.route("**/tags*", (r) => r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" },
    body: JSON.stringify(["moody", "pastel", "duotone", "earthy", "neon", "muted", "vintage", "tropical", "monochrome", "warm", "cool", "retro"].map((name, i) => ({ id: `t${i}`, name, category: "mood", createdAt: "2026-07-05T00:00:00.000Z" }))) }));
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1000);
const trig = p.getByRole("button", { name: "Filters" }).first();
await trig.click();
await p.waitForTimeout(500);
// one active filter so Clear all renders
const featured = await p.locator("[role=dialog]").getByText("Featured", { exact: true }).click({ timeout: 4000 }).then(() => "clicked", () => "unreachable");
await p.waitForTimeout(500);
const r = await p.evaluate((FEAT) => {
    const d = [...document.querySelectorAll("[role=dialog]")].find((e) => /Find by Color/.test(e.textContent));
    if (!d) return { miss: true };
    const box = d.getBoundingClientRect();
    const reach = (re) => {
        const el = [...d.querySelectorAll("*")].filter((e) => re.test((e.textContent ?? "").trim())).pop();
        if (!el) return "absent";
        const k = el.getBoundingClientRect();
        if (k.top >= 0 && k.bottom <= innerHeight) return "in";
        let s = el.parentElement;
        while (s && s !== document.body) {
            const cs = getComputedStyle(s);
            if (/(auto|scroll)/.test(cs.overflowY) && s.scrollHeight > s.clientHeight) {
                const sb = s.getBoundingClientRect();
                if (sb.top >= 0 && sb.bottom <= innerHeight) return "scroller";
            }
            s = s.parentElement;
        }
        return `out(${Math.round(k.top)}..${Math.round(k.bottom)})`;
    };
    return { featured: FEAT, box: [box.top, box.bottom].map(Math.round), inside: box.top >= 0 && box.bottom <= innerHeight + 0.5, find: reach(/^Find by Color$/), clear: reach(/Clear all filters/) };
}, featured);
const ok = r.inside && ["in", "scroller"].includes(r.find) && ["in", "scroller"].includes(r.clear);
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify(r)}`);
await b.close();
process.exit(ok ? 0 : 1);
