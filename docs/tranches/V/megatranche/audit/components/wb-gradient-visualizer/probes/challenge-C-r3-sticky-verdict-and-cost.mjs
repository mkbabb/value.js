/**
 * CHALLENGE-C round 3 — (A) the stale verdict survives a real model edit,
 * (B) a REAL clipboard paste of multi-line CSS, (C) hover-ghost recompute cost.
 * Read-only against http://localhost:9000.
 *
 *   node docs/.../probes/challenge-C-r3-sticky-verdict-and-cost.mjs
 */
import { chromium } from "playwright";

const log = (...a) => console.log(...a);
const browser = await chromium.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"],
});
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();

const state = () =>
    page.evaluate(() => {
        const ed = [...document.querySelectorAll('[role="textbox"][aria-label="Gradient CSS"]')].pop();
        const v = [...document.querySelectorAll('[data-testid="gradient-parse-verdict"]')].pop();
        return {
            handles: [...document.querySelectorAll("[data-stop-id]")].map((e) => e.getAttribute("aria-label")),
            editor: ed?.textContent ?? null,
            invalid: ed?.getAttribute("aria-invalid") ?? null,
            verdict: v?.textContent?.trim() ?? null,
        };
    });

const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
const bar = main.getByTestId("gradient-stop-bar").last();
await editor.scrollIntoViewIfNeeded();

// ── A · blur race, then a REAL keyboard model edit (arrow nudge on a handle) ──
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await editor.type("linear-gradient(90deg, notacolor 0%, blue 100%)", { delay: 0 });
await page.waitForTimeout(120);
await editor.evaluate((el) => el.blur());
await page.waitForTimeout(1200);
log("A0) after the blur race:", JSON.stringify(await state()));

const firstHandle = main.locator("[data-stop-id]").first();
await firstHandle.focus();
for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(700);
log("A1) after 8 ArrowRight on the first stop (model REALLY changed):", JSON.stringify(await state()));

// ── B · a real paste of multi-line CSS ──
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const editor2 = main.getByRole("textbox", { name: "Gradient CSS" }).last();
await editor2.scrollIntoViewIfNeeded();
await page.evaluate(() =>
    navigator.clipboard.writeText("linear-gradient(\n  90deg,\n  red 0%,\n  blue 100%\n)"),
);
await editor2.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.press("ControlOrMeta+v");
await page.waitForTimeout(1300);
const b = await page.evaluate(() => {
    const ed = [...document.querySelectorAll('[role="textbox"][aria-label="Gradient CSS"]')].pop();
    const v = [...document.querySelectorAll('[data-testid="gradient-parse-verdict"]')].pop();
    return {
        textContent: ed.textContent,
        innerText: ed.innerText,
        html: ed.innerHTML.slice(0, 200),
        verdict: v?.textContent?.trim() ?? null,
    };
});
log("B) real paste of multi-line CSS:", JSON.stringify(b));

// ── C · hover-ghost recompute cost per pointermove ──
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const bar2 = main.getByTestId("gradient-stop-bar").last();
await bar2.scrollIntoViewIfNeeded();
const box = await bar2.boundingBox();
const t0 = Date.now();
const N = 60;
for (let i = 0; i < N; i++) {
    await page.mouse.move(box.x + 20 + ((box.width - 40) * i) / N, box.y + box.height / 2);
}
const wall = Date.now() - t0;
const ghost = await page.evaluate(() => {
    const g = document.querySelector('[data-testid="gradient-stop-bar"] [aria-hidden="true"]');
    return g ? g.getAttribute("style").slice(0, 150) : null;
});
log("C) 60 real mouse moves across the rail:", JSON.stringify({ wallMs: wall, msPerMove: +(wall / N).toFixed(2) }));
log("C) ghost style:", JSON.stringify(ghost));

// how expensive is the per-move recompute itself?
const cost = await page.evaluate(() => {
    // approximate the ghost's per-move work: nothing exposed, so time a forced
    // style read + the observable style mutation rate instead
    const rail = document.querySelector('[data-testid="gradient-stop-bar"]');
    let writes = 0;
    const mo = new MutationObserver((r) => (writes += r.length));
    mo.observe(rail, { attributes: true, attributeFilter: ["style"], subtree: true });
    return new Promise((res) => {
        const rect = rail.getBoundingClientRect();
        let i = 0;
        const step = () => {
            rail.dispatchEvent(
                new PointerEvent("pointermove", {
                    bubbles: true, cancelable: true, pointerId: 41, pointerType: "mouse",
                    isPrimary: true, buttons: 0,
                    clientX: rect.left + 20 + ((rect.width - 40) * i) / 60,
                    clientY: rect.top + rect.height / 2,
                }),
            );
            if (++i < 60) requestAnimationFrame(step);
            else setTimeout(() => { mo.disconnect(); res({ synthMoves: 60, styleWrites: writes }); }, 120);
        };
        requestAnimationFrame(step);
    });
});
log("C) style-attribute writes under 60 synthetic hover moves:", JSON.stringify(cost));

await browser.close();
