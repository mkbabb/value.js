// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · the dock action bar at phone widths + desktop (:9000, headed).
//  V-8/V-10  actions layer: every live control inside the viewport and the dock box.
//  V-9/X-13  input and propose modes: Back, the field's Apply/send and the arm toggle inside both.
//  V-79      typing 40 characters into the field moves the dock's width by ≤ 1 px; the empty
//            propose field is not a stub (≥ 100 px).
//  V-11      (desktop 1440) opening the input with the pointer resting on the dock: 1.5 s later
//            the dock is still expanded and the field is visible.
// Usage: node probe-dock-bar.mjs <width> <height> [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const phone = W < 1024;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true });
const p = await ctx.newPage();
const out = [];
const arm = (n, ok, d) => out.push(`${ok ? "PASS" : "RED "} ${n} ${d}`);
await p.goto("http://localhost:9000/#/", { timeout: 90000 });
await p.locator(".glass-dock").first().waitFor({ timeout: 60000 });
await p.waitForTimeout(1500);
if (!phone) { const c = p.locator(".glass-dock.collapsed"); if (await c.count()) { await c.click(); await p.waitForTimeout(1200); } }
const fit = () => p.evaluate(() => {
    const dock = document.querySelector(".glass-dock").getBoundingClientRect();
    const ctl = [...document.querySelectorAll(".dock-band button, .dock-band input, .dock-band [role=textbox]")]
        .filter((e) => e.getBoundingClientRect().width > 0 && !e.closest("[inert]"))
        .map((e) => { const r = e.getBoundingClientRect(); return { n: e.getAttribute("aria-label") || e.tagName, l: Math.round(r.left), r: Math.round(r.right) }; });
    const bad = ctl.filter((c) => c.l < 0 || c.r > innerWidth || c.l < dock.left - 1 || c.r > dock.right + 1);
    return { dock: [Math.round(dock.left), Math.round(dock.right)], w: dock.width, bad, names: ctl.map((c) => c.n) };
});
await p.getByRole("button", { name: "Toggle action bar" }).first().click();
await p.waitForTimeout(1000);
let r = await fit();
arm("V-8/V-10 actions layer fits", r.bad.length === 0 && r.names.includes("Open color input"), `dock=${JSON.stringify(r.dock)} bad=${JSON.stringify(r.bad)}`);
const toggleBox = await p.getByRole("button", { name: "Open color input" }).first().boundingBox();
await p.getByRole("button", { name: "Open color input" }).first().click();
if (!phone) await p.mouse.move(toggleBox.x + toggleBox.width / 2, toggleBox.y + toggleBox.height / 2);
await p.waitForTimeout(1500);
r = await fit();
arm("V-9 input mode fits", r.bad.length === 0 && r.names.includes("Back") && r.names.includes("Apply color"), `dock=${JSON.stringify(r.dock)} bad=${JSON.stringify(r.bad)}`);
if (!phone) {
    const collapsed = await p.locator(".glass-dock.collapsed").count();
    const fieldVis = await p.getByRole("textbox", { name: "Enter a CSS color" }).first().isVisible().catch(() => false);
    arm("V-11 dock holds open under the resting pointer", collapsed === 0 && fieldVis, `collapsed=${collapsed} field=${fieldVis}`);
}
const w0 = r.w;
const field = p.getByRole("textbox", { name: "Enter a CSS color" }).first();
await field.click();
await p.keyboard.press("ControlOrMeta+a");
await p.keyboard.type("color-mix(in oklab, rebeccapurple 40%, teal)");
await p.waitForTimeout(400);
r = await fit();
arm("V-79 typing does not resize the dock", Math.abs(r.w - w0) <= 1 && r.bad.length === 0, `w ${Math.round(w0)}→${Math.round(r.w)} bad=${JSON.stringify(r.bad)}`);
if (!phone) { const c = p.locator(".glass-dock.collapsed"); if (await c.count()) { await c.click(); await p.waitForTimeout(1200); } }
await p.getByRole("button", { name: /Propose color name|Close input/ }).first().click();
await p.waitForTimeout(1000);
r = await fit();
const pw = await p.getByRole("textbox", { name: /Propose a color name|Enter a CSS color/ }).first().evaluate((e) => e.getBoundingClientRect().width).catch(() => 0);
arm("V-9 propose mode fits; field not a stub", r.bad.length === 0 && pw >= 100, `dock=${JSON.stringify(r.dock)} field=${Math.round(pw)} bad=${JSON.stringify(r.bad)}`);
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
