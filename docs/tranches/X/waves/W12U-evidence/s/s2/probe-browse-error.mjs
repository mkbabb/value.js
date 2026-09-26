// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-305 falsifier (:9000). /browse with the wall's GET (a) answering 500 and
// (b) aborted at the network (the availability latch trips; Retry is then short-circuited).
// GREEN iff the error plate's detail does not repeat the headline ("Failed to load palettes:")
// and never claims the public wall is "working locally". Usage: node probe-browse-error.mjs <w> <h> [theme].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const plate = (p) => p.evaluate(() => { const e = [...document.querySelectorAll("*")].find((x) => x.children.length < 6 && /Couldn't load palettes/.test(x.textContent ?? "") && x.getBoundingClientRect().height > 20); return e ? e.innerText.replace(/\s+/g, " ").trim().slice(0, 200) : null; });
const out = [];
for (const mode of ["500", "abort"]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, browse: mode === "500" ? "error" : null });
    if (mode === "abort") await ctx.route(/\/palettes\?/, (r) => r.request().resourceType() === "fetch" ? r.abort("internetdisconnected") : r.continue());
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
    await p.waitForTimeout(3000);
    if (mode === "abort") { const r = p.getByRole("button", { name: "Retry" }); if (await r.count()) { await r.first().click(); await p.waitForTimeout(1500); } }
    const t = await plate(p);
    const ok = t && !/Failed to load palettes:/.test(t) && !/working locally/i.test(t);
    out.push(`${ok ? "PASS" : "RED "} ${mode} ${JSON.stringify(t)}`);
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
