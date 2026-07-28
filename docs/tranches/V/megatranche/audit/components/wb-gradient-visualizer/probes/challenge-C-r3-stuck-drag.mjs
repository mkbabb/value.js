/**
 * CHALLENGE-C round 3 — isolate what a lost pointer capture does to the rail.
 * Captures pageerror/console and reads <main> after every step.
 *
 *   node docs/.../probes/challenge-C-r3-stuck-drag.mjs
 */
import { chromium } from "playwright";

const log = (...a) => console.log(...a);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
const consoleErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e.message)));
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });

await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const bar = main.getByTestId("gradient-stop-bar").last();
await bar.scrollIntoViewIfNeeded();

const snap = async (tag) => {
    const s = await page.evaluate(() => ({
        handles: [...document.querySelectorAll("[data-stop-id]")].map((e) => e.getAttribute("aria-label")),
        rail: !!document.querySelector('[data-testid="gradient-stop-bar"]'),
        tile: !!document.querySelector('[data-testid="gradient-render-tile"]'),
        mainText: (document.querySelector("main")?.innerText ?? "").slice(0, 180).replace(/\n/g, " | "),
    }));
    log(tag, JSON.stringify(s));
};

await snap("S0 baseline");

// step 1 — pointerdown on the FIRST handle, then a silent capture loss
await bar.evaluate(async (el) => {
    const h = el.querySelector("[data-stop-id]");
    const hb = h.getBoundingClientRect();
    const base = { bubbles: true, cancelable: true, pointerId: 21, pointerType: "mouse", isPrimary: true };
    h.dispatchEvent(new PointerEvent("pointerdown", { ...base, clientX: hb.left + hb.width / 2, clientY: hb.top + hb.height / 2, buttons: 1 }));
    await new Promise((r) => setTimeout(r, 60));
    h.dispatchEvent(new PointerEvent("lostpointercapture", { ...base, clientX: hb.left, clientY: hb.top }));
    await new Promise((r) => setTimeout(r, 60));
});
await snap("S1 after pointerdown + lostpointercapture (no pointerup)");

// step 2 — ONE buttonless hover at 20%
await bar.evaluate(async (el) => {
    const rect = el.getBoundingClientRect();
    const base = { bubbles: true, cancelable: true, pointerId: 21, pointerType: "mouse", isPrimary: true, buttons: 0 };
    el.dispatchEvent(new PointerEvent("pointermove", { ...base, clientX: rect.left + rect.width * 0.2, clientY: rect.top + rect.height / 2 }));
    await new Promise((r) => setTimeout(r, 150));
});
await snap("S2 after ONE buttonless hover at 20%");

// step 3 — hover at 45% and 70%
for (const f of [0.45, 0.7]) {
    await bar.evaluate(async ([el, frac]) => {
        const rect = el.getBoundingClientRect();
        const base = { bubbles: true, cancelable: true, pointerId: 21, pointerType: "mouse", isPrimary: true, buttons: 0 };
        el.dispatchEvent(new PointerEvent("pointermove", { ...base, clientX: rect.left + rect.width * frac, clientY: rect.top + rect.height / 2 }));
        await new Promise((r) => setTimeout(r, 150));
    }, [await bar.elementHandle(), f]).catch((e) => log("   (step threw:", String(e).slice(0, 90), ")"));
    await snap(`S3 after buttonless hover at ${f * 100}%`);
}

log("pageErrors:", JSON.stringify(pageErrors.slice(0, 4)));
log("consoleErrors:", JSON.stringify(consoleErrors.slice(0, 4)));
await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/evidence/challenge-C-r3-stuck-drag.png" });
await browser.close();
