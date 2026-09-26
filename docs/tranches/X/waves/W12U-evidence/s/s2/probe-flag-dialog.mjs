// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-131 · V-327 · V-328 · V-330 (+ A2-VA-X-10 at 844×390) falsifier (:9000).
// /browse logged in → a foreign card's menu → Report. GREEN iff the dialog is the glass confirm
// idiom (no ✕ "Close" button; glass surface), the detail field is the glass Textarea
// (data-slot=textarea), the dialog box lies inside the viewport, and while the report is in
// flight (POST /flag held 1.5 s) Cancel is disabled and Escape does not close it.
// Usage: node probe-flag-dialog.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true, browse: "ok" });
await ctx.route(/\/palettes\/[^/]+\/flag$/, async (r) => { await new Promise((res) => setTimeout(res, 1500)); r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: '{"flagged":true}' }); });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1200);
await p.getByRole("button", { name: "Palette menu" }).nth(1).click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: "Report" }).click();
await p.waitForTimeout(700);
const r = await p.evaluate(() => {
    const d = [...document.querySelectorAll("[role=dialog]")].find((e) => /Report/.test(e.textContent));
    if (!d) return { miss: true };
    const k = d.getBoundingClientRect();
    return { close: [...d.querySelectorAll("button")].some((x) => /close/i.test(x.getAttribute("aria-label") ?? x.textContent ?? "")),
        glass: d.getAttribute("data-surface") ?? d.className.toString().match(/glass[\w-]*/)?.[0] ?? null,
        textarea: d.querySelector("textarea")?.getAttribute("data-slot") ?? d.querySelector("textarea")?.closest("[data-slot]")?.getAttribute("data-slot") ?? null,
        box: [Math.round(k.top), Math.round(k.bottom)], inside: k.top >= 0 && k.bottom <= innerHeight + 0.5 };
});
let inflight = null;
if (!r.miss) {
    const dlg = p.locator("[role=dialog]").filter({ hasText: "Report" });
    await dlg.getByText("Spam", { exact: true }).click();
    await dlg.getByRole("button", { name: "Report" }).click();
    await p.waitForTimeout(250);
    const cancelDisabled = await dlg.getByRole("button", { name: "Cancel" }).isDisabled();
    await p.keyboard.press("Escape");
    await p.waitForTimeout(250);
    const stillOpen = await dlg.count() > 0 && await dlg.first().isVisible();
    inflight = { cancelDisabled, stillOpenAfterEsc: stillOpen };
}
const ok = !r.miss && !r.close && r.textarea === "textarea" && r.inside && inflight?.cancelDisabled && inflight?.stillOpenAfterEsc;
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify({ ...r, inflight })}`);
await b.close();
process.exit(ok ? 0 : 1);
