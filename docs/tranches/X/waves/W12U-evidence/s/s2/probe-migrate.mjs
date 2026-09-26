// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-133 · V-331 · V-333 · V-334 · V-335 · V-336 falsifier (:9000). 6 saved
// palettes, the dock Login layer, a slug typed + Enter → the migrate dialog (switch mode). The
// login answers 404 after 1.2 s. GREEN iff the dialog has no ✕ and a footer Cancel, opens
// with focus on Cancel (not on a publishing choice), names the target slug, describes every
// choice, keeps ≥ 12 px from each viewport edge; "Just switch" leaves it OPEN while the login
// runs and after it fails, with the failure said inside it; Cancel then closes it.
// Usage: node probe-migrate.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const phone = W < 1024;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, palettes: true });
await ctx.route("**/sessions/login", async (r) => { await new Promise((res) => setTimeout(res, 1200)); r.fulfill({ status: 404, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "User not found", status: 404 }) }); });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/", { timeout: 90000 });
await p.getByRole("button", { name: "Menu" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(1000);
await p.getByRole("button", { name: "Menu" }).first().click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: /^Login$/ }).first().click();
await p.waitForTimeout(700);
await p.getByRole("textbox", { name: "Slug or admin token" }).first().fill("brave-quiet-amber-fox");
await p.keyboard.press("Enter");
await p.waitForTimeout(900);
const read = () => p.evaluate(() => {
    const d = [...document.querySelectorAll("[role=dialog]")].find((e) => /palette/i.test(e.textContent) && e.getBoundingClientRect().width > 0);
    if (!d) return null;
    const k = d.getBoundingClientRect();
    const btns = [...d.querySelectorAll("button")];
    return { title: d.querySelector("h2")?.textContent.trim(), close: btns.some((x) => /close/i.test(x.getAttribute("aria-label") ?? "") || x.textContent.trim() === "Close"),
        cancel: btns.some((x) => x.textContent.trim() === "Cancel"), focus: document.activeElement?.textContent.trim().slice(0, 30),
        described: btns.filter((x) => x.hasAttribute("aria-describedby")).length, gutter: Math.round(Math.min(k.left, innerWidth - k.right)),
        alert: d.querySelector("[role=alert]")?.textContent.trim() ?? null };
});
const open = await read();
let during = null, after = null, cancelled = null;
if (open) {
    await p.locator("[role=dialog]").getByRole("button", { name: /Just switch/ }).click();
    await p.waitForTimeout(400);
    during = await read();
    await p.waitForTimeout(1500);
    after = await read();
    if (after) { await p.locator("[role=dialog]").getByRole("button", { name: "Cancel" }).click(); await p.waitForTimeout(600); cancelled = (await read()) === null; }
}
const ok = open && !open.close && open.cancel && /Cancel/.test(open.focus ?? "") && /brave-quiet-amber-fox/.test(open.title ?? "") && open.described >= 3 && open.gutter >= 12
    && during !== null && after !== null && /did not complete/.test(after.alert ?? "") && cancelled === true;
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify({ open, during: !!during, after, cancelled })}`);
await b.close();
process.exit(ok ? 0 : 1);
