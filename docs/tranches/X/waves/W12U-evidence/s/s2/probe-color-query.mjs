// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-33 falsifier (:9000). /browse (route-stubbed wall) → Filters →
// "Search by CSS color": (a) type `hsl(0 100% 50%)` + Enter → GREEN iff the query colour is
// what is searched (the swatch reads rgb(255, 0, 0) and the Filters badge counts 1) with no
// alert; (b) type `nope` + Enter → GREEN iff a role=alert names it, the field is aria-invalid,
// and no search is counted. Usage: node probe-color-query.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const out = [];
async function run(text) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, browse: "ok" });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
    await p.waitForTimeout(1000);
    await p.getByRole("button", { name: "Filters" }).first().click();
    await p.waitForTimeout(400);
    const f = p.getByRole("textbox", { name: "Search by CSS color" });
    await f.fill(text);
    await f.press("Enter");
    await p.waitForTimeout(500);
    const r = await p.evaluate(() => {
        const sw = document.querySelector('button[aria-label^="Open color picker"]');
        const fld = document.querySelector('input[aria-label="Search by CSS color"]');
        const alert = [...document.querySelectorAll("[role=alert]")].map((e) => e.innerText.trim()).filter(Boolean).join(" | ");
        const badge = document.querySelector('button[aria-label="Filters"] span')?.innerText.trim() ?? "";
        return { swatch: sw ? getComputedStyle(sw).backgroundColor : null, invalid: fld?.getAttribute("aria-invalid"), alert, badge };
    });
    await ctx.close();
    return r;
}
const a = await run("hsl(0 100% 50%)");
out.push(`${a.swatch === "rgb(255, 0, 0)" && a.badge === "1" && !a.alert ? "PASS" : "RED "} (a) hsl(0 100% 50%) → ${JSON.stringify(a)}`);
const c = await run("nope");
out.push(`${/nope/.test(c.alert) && c.invalid === "true" && c.badge === "" ? "PASS" : "RED "} (b) nope → ${JSON.stringify(c)}`);
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
