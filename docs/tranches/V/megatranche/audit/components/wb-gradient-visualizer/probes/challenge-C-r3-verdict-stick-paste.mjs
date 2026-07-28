/**
 * CHALLENGE-C round 3 — (P3) verdict stickiness after the blur race,
 * (P4) innerText vs textContent on the contenteditable, (P5) paste of
 * multi-line CSS, (P6) stuck drag after a lost pointer capture,
 * (P7) hover-ghost recompute cost per pointermove. Read-only.
 *
 *   node docs/.../probes/challenge-C-r3-verdict-stick-paste.mjs
 */
import { chromium } from "playwright";

const log = (...a) => console.log(...a);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
const bar = main.getByTestId("gradient-stop-bar").last();
await editor.scrollIntoViewIfNeeded();

const state = () =>
    page.evaluate(() => {
        const ed = [...document.querySelectorAll('[role="textbox"][aria-label="Gradient CSS"]')].pop();
        const v = [...document.querySelectorAll('[data-testid="gradient-parse-verdict"]')].pop();
        return {
            text: ed?.textContent ?? null,
            invalid: ed?.getAttribute("aria-invalid") ?? null,
            verdict: v?.textContent?.trim() ?? null,
        };
    });

// ── P3 · does the stale verdict ever clear on its own? ──
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await editor.type("linear-gradient(90deg, notacolor 0%, blue 100%)", { delay: 0 });
await page.waitForTimeout(120);
await editor.evaluate((el) => el.blur());
await page.waitForTimeout(1200);
log("P3) after the blur race:", JSON.stringify(await state()));

// now edit the model by dragging the first handle — a legitimate authoring act
await bar.scrollIntoViewIfNeeded();
const box = await bar.boundingBox();
await page.mouse.move(box.x + 12, box.y + box.height / 2);
await page.mouse.down();
await page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2, { steps: 8 });
await page.mouse.up();
await page.waitForTimeout(600);
log("P3) after dragging a stop (model changed, editor re-rendered):", JSON.stringify(await state()));

// ── P4 · innerText would have preserved the break that textContent drops ──
const p4 = await page.evaluate(() => {
    const ed = [...document.querySelectorAll('[role="textbox"][aria-label="Gradient CSS"]')].pop();
    ed.innerHTML = "linear-gradient(90deg, red<div>0%, blue 100%)</div>";
    return { textContent: ed.textContent, innerText: ed.innerText };
});
log("P4) textContent:", JSON.stringify(p4.textContent));
log("P4) innerText  :", JSON.stringify(p4.innerText));

// ── P5 · paste multi-line CSS (the normal way a gradient arrives) ──
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const editor2 = main.getByRole("textbox", { name: "Gradient CSS" }).last();
await editor2.scrollIntoViewIfNeeded();
await editor2.click();
await page.keyboard.press("ControlOrMeta+a");
await page.evaluate(() => {
    const dt = new DataTransfer();
    dt.setData("text/plain", "linear-gradient(\n  90deg,\n  red 0%,\n  blue 100%\n)");
    const ed = [...document.querySelectorAll('[role="textbox"][aria-label="Gradient CSS"]')].pop();
    ed.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
});
await page.waitForTimeout(1200);
log("P5) after pasting multi-line CSS:", JSON.stringify(await state()));

// ── P6 · lost pointer capture mid-drag → is the drag stuck? ──
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const bar2 = main.getByTestId("gradient-stop-bar").last();
await bar2.scrollIntoViewIfNeeded();
const p6 = await bar2.evaluate(async (el) => {
    const labels = () => [...document.querySelectorAll("[data-stop-id]")].map((e) => e.getAttribute("aria-label"));
    const before = labels();
    const h = el.querySelector("[data-stop-id]");
    const hb = h.getBoundingClientRect();
    const base = { bubbles: true, cancelable: true, pointerId: 21, pointerType: "mouse", isPrimary: true };
    h.dispatchEvent(new PointerEvent("pointerdown", { ...base, clientX: hb.left + hb.width / 2, clientY: hb.top + hb.height / 2, buttons: 1 }));
    await new Promise((r) => setTimeout(r, 40));
    // capture silently lost (element re-keyed, browser revoke, …): no pointerup, no pointercancel
    h.dispatchEvent(new PointerEvent("lostpointercapture", { ...base, clientX: hb.left, clientY: hb.top }));
    await new Promise((r) => setTimeout(r, 40));
    const rect = el.getBoundingClientRect();
    // a plain BUTTONLESS hover across the rail
    for (const f of [0.2, 0.45, 0.7]) {
        el.dispatchEvent(new PointerEvent("pointermove", { ...base, clientX: rect.left + rect.width * f, clientY: rect.top + rect.height / 2, buttons: 0 }));
        await new Promise((r) => setTimeout(r, 40));
    }
    await new Promise((r) => setTimeout(r, 200));
    return { before, afterButtonlessHover: labels(), cursor: getComputedStyle(el).cursor };
});
log("P6)", JSON.stringify(p6));

// ── P7 · hover-ghost recompute per pointermove ──
const p7 = await bar2.evaluate(async (el) => {
    const rect = el.getBoundingClientRect();
    const base = { bubbles: true, cancelable: true, pointerId: 31, pointerType: "mouse", isPrimary: true, buttons: 0 };
    // settle: leave then re-enter
    el.dispatchEvent(new PointerEvent("pointerleave", { ...base, clientX: rect.left, clientY: rect.top }));
    await new Promise((r) => setTimeout(r, 100));
    let ghostStyleWrites = 0;
    const mo = new MutationObserver((recs) => { ghostStyleWrites += recs.length; });
    mo.observe(el, { attributes: true, attributeFilter: ["style"], subtree: true });
    const t0 = performance.now();
    const N = 60;
    for (let i = 0; i < N; i++) {
        el.dispatchEvent(new PointerEvent("pointermove", { ...base, clientX: rect.left + 20 + (rect.width - 40) * (i / N), clientY: rect.top + rect.height / 2 }));
        await new Promise((r) => requestAnimationFrame(r));
    }
    const dt = performance.now() - t0;
    mo.disconnect();
    return { moves: N, ms: +dt.toFixed(1), msPerMove: +(dt / N).toFixed(2), ghostStyleWrites };
});
log("P7)", JSON.stringify(p7));

await browser.close();
