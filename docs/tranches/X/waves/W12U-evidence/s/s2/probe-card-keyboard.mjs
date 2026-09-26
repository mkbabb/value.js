// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-31 falsifier (:9000). /browse (stubbed wall) and /palettes (saved
// palettes): Tab from the page start (≤ 60 presses) until focus lands on a palette card
// (role=article); Enter. GREEN iff a card takes focus, it shows a focus ring (a non-none
// box-shadow/outline differing from its rest), and Enter selects it (data-selected +
// aria-current). Usage: node probe-card-keyboard.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
for (const [route, opts] of [["browse", { browse: "ok" }], ["palettes", { palettes: true }]]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme });
    await prepare(ctx, { theme, ...opts });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:9000/#/${route}`, { timeout: 90000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
    await p.waitForTimeout(1200);
    const rest = await p.evaluate(() => { const c = document.querySelector("[role=article]"); return c ? getComputedStyle(c).boxShadow : null; });
    let tabs = 0, hit = false;
    for (; tabs < 60 && !hit; tabs++) {
        await p.keyboard.press("Tab");
        hit = await p.evaluate(() => document.activeElement?.getAttribute("role") === "article");
    }
    let r = { tabs, focused: hit };
    if (hit) {
        await p.waitForTimeout(250);
        const ring = await p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { shadow: cs.boxShadow, outline: cs.outlineStyle }; });
        await p.keyboard.press("Enter");
        await p.waitForTimeout(500);
        const sel = await p.evaluate(() => { const e = document.activeElement?.closest("[role=article]") ?? document.querySelector("[role=article][data-selected]"); return { selected: e?.hasAttribute("data-selected") ?? false, current: e?.getAttribute("aria-current") }; });
        r = { ...r, ringed: ring.shadow !== rest || ring.outline !== "none", ...sel };
    }
    const ok = r.focused && r.ringed && r.selected && r.current === "true";
    out.push(`${ok ? "PASS" : "RED "} /${route} ${JSON.stringify(r)}`);
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
