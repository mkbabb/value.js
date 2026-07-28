// worker-O probe 3 — D2-03 crossing drag (RED gate input), D2-17 forced-colors substitution, C4 vacuity mutation
import { chromium, webkit } from "playwright";
const URL = "http://localhost:9000/#/gradient";

// ---------- D2-03: drag the leftmost handle PAST its neighbour ----------
{
    const b = await chromium.launch();
    const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await c.newPage();
    await p.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await p.waitForTimeout(2200);
    const bar = await p.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    await p.mouse.click(bar.x + bar.w * 0.5, bar.y + bar.h / 2); // add at ~50%
    await p.waitForTimeout(400);
    const before = await p.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((h) => h.getAttribute("aria-label")));
    const h0 = await p.evaluate(() => { const h = document.querySelector("[data-stop-id]"); const r = h.getBoundingClientRect(); return { cx: r.x + r.width / 2, cy: r.y + r.height / 2 }; });
    await p.mouse.move(h0.cx, h0.cy);
    await p.mouse.down();
    for (let i = 1; i <= 12; i++) await p.mouse.move(h0.cx + (bar.w * 0.8 * i) / 12, h0.cy);
    await p.mouse.up();
    await p.waitForTimeout(600);
    const after = await p.evaluate(() => ({
        labels: [...document.querySelectorAll("[data-stop-id]")].map((h) => h.getAttribute("aria-label")),
        lefts: [...document.querySelectorAll("[data-stop-id]")].map((h) => h.style.left),
        css: (document.querySelector('[contenteditable="true"]')?.innerText || "").replace(/\s+/g, " ").slice(0, 220),
        railHead: getComputedStyle(document.querySelector('[data-testid="gradient-stop-bar"]')).backgroundImage.slice(0, 160),
    }));
    console.log("D2-03 before:", JSON.stringify(before));
    console.log("D2-03 after :", JSON.stringify(after));
    await b.close();
}

// ---------- D2-17: does the engine SUBSTITUTE colours in forced-colors? ----------
for (const [name, engine] of [["webkit", webkit], ["chromium", chromium]]) {
    const b = await engine.launch();
    const c = await b.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
    const p = await c.newPage();
    await p.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await p.waitForTimeout(2500);
    const out = await p.evaluate(() => {
        const hs = [...document.querySelectorAll("[data-stop-id]")];
        if (!hs.length) return { noHandles: true, media: matchMedia("(forced-colors: active)").matches };
        const read = (el) => { const cs = getComputedStyle(el); return { border: cs.borderTopColor, bg: cs.backgroundImage.slice(0, 60), scale: cs.transform }; };
        const unselected = read(hs[0]);
        hs[0].dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 0, clientY: 0, pointerId: 1 }));
        return { media: matchMedia("(forced-colors: active)").matches, unselected, afterSelect: read(hs[0]), forcedColorAdjust: getComputedStyle(hs[0]).forcedColorAdjust };
    });
    console.log(`D2-17 live ${name}:`, JSON.stringify(out));
    await b.close();
}
