// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-124 falsifier (:9000). /browse logged in (an owned remote card), the tag
// catalogue GET answers 503. Edit Tags. GREEN iff the popover says the catalogue failed
// (role=alert) and does NOT claim "No tags available.", offers Retry, and Retry (the
// catalogue now answering) lists the tags. Usage: node probe-tag-catalog.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true, browse: "ok" });
let up = false;
await ctx.route(/\/tags(\?|$)/, (r) => up
    ? r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(["moody", "pastel", "neon"].map((name, i) => ({ id: `t${i}`, name, category: "mood" }))) })
    : r.fulfill({ status: 503, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: '{"error":"down"}' }));
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1200);
await p.getByRole("button", { name: "Palette menu" }).first().click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: "Edit Tags" }).first().click();
await p.waitForTimeout(900);
const dlg = () => p.evaluate(() => { const d = [...document.querySelectorAll("[role=dialog]")].find((e) => /tags/i.test(e.textContent)); return d ? { text: d.innerText.replace(/\s+/g, " ").trim(), alert: d.querySelector("[role=alert]")?.textContent.trim() ?? null } : null; });
const down = await dlg();
const retry = p.locator("[role=dialog]").getByRole("button", { name: "Retry" });
const hasRetry = await retry.count() > 0;
let back = null;
if (hasRetry) { up = true; await retry.click(); await p.waitForTimeout(900); back = await dlg(); }
const ok = down && down.alert && !/No tags available/.test(down.text) && hasRetry && /moody/.test(back?.text ?? "");
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify({ down, hasRetry, back })}`);
await b.close();
process.exit(ok ? 0 : 1);
