// gate-gesture.mjs — MT-GRADSTOP-1 r3 gates G8 (grab-offset teleport, C11),
// G9 (pointer-select focuses, C12), G10 (primary-button-only add, C14).
// DOM-behaviour cell: dev server :9000, chromium desktop 1440x900 (fine pointer).
// RED today — arbiter-F's own run 2026-07-28, pasted:
//   G8  {"grabbed_px_right_of_centre":8,"pointer_travelled_px":1,"handle_travelled_px":10.11,"label_after":"Gradient stop at 2%","RED":true}
//   G9  {"activeElement_after_click":"BODY/","keyboard_had_effect":false,"RED":true}
//   G10 {"stops_before":2,"stops_after":3,"minted":true}  <- the C14 mint REPRODUCED
//   pageerrors: []  ->  GATE: RED (exit 1)
import { chromium } from "playwright";

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle", timeout: 45000 });
await p.waitForTimeout(1500);

const handleSel = 'button[data-stop-id][aria-label="Gradient stop at 0%"]';
const handle = p.locator(handleSel).first();
const box = await handle.boundingBox();
const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

// ── Arm A (G8): grab 8px right of centre, travel 1px ──
await p.mouse.move(cx + 8, cy);
await p.mouse.down();
await p.mouse.move(cx + 9, cy);
await p.waitForTimeout(120);
const boxAfter = await p.locator("button[data-stop-id]").first().boundingBox();
const handleTravel = boxAfter.x + boxAfter.width / 2 - cx;
const labelAfter = await p.locator("button[data-stop-id]").first().getAttribute("aria-label");
await p.mouse.up();
const A = {
    grabbed_px_right_of_centre: 8,
    pointer_travelled_px: 1,
    handle_travelled_px: Math.round(handleTravel * 100) / 100,
    label_after: labelAfter,
    RED: Math.abs(handleTravel) > 2, // a grab must not teleport the stop
};

// ── Arm B (G9): real mouse click on the 100% handle → focus + keyboard ──
const h100 = p.locator('button[data-stop-id][aria-label="Gradient stop at 100%"]').first();
const b100 = await h100.boundingBox();
await p.mouse.click(b100.x + b100.width / 2, b100.y + b100.height / 2);
await p.waitForTimeout(120);
const active1 = await p.evaluate(() => {
    const a = document.activeElement;
    return { tag: a?.tagName, label: a?.getAttribute?.("aria-label") ?? null };
});
const labelsBefore = await p.$$eval("button[data-stop-id]", (els) => els.map((e) => e.getAttribute("aria-label")));
await p.keyboard.press("ArrowRight");
await p.keyboard.press("ArrowRight");
await p.waitForTimeout(120);
const labelsAfterKeys = await p.$$eval("button[data-stop-id]", (els) => els.map((e) => e.getAttribute("aria-label")));
const B = {
    activeElement_after_click: `${active1.tag}/${active1.label ?? ""}`,
    keyboard_had_effect: JSON.stringify(labelsBefore) !== JSON.stringify(labelsAfterKeys),
    RED: active1.tag !== "BUTTON" || JSON.stringify(labelsBefore) === JSON.stringify(labelsAfterKeys),
};

// ── Arm C (G10 / C14): right-click on bare rail must not mint ──
const bar = await p.locator('[data-testid="gradient-stop-bar"]').boundingBox();
const nBefore = (await p.$$("button[data-stop-id]")).length;
await p.mouse.click(bar.x + bar.width * 0.3, bar.y + 4, { button: "right" });
await p.waitForTimeout(200);
const nAfter = (await p.$$("button[data-stop-id]")).length;
const C = { stops_before: nBefore, stops_after: nAfter, minted: nAfter > nBefore };

console.log("G8 grab-offset:", JSON.stringify(A));
console.log("G9 pointer-focus:", JSON.stringify(B));
console.log("G10 right-click-mint:", JSON.stringify(C));
console.log("pageerrors:", JSON.stringify(errs));
const red = A.RED || B.RED || C.minted;
console.log("GATE:", red ? "RED" : "GREEN");
await b.close();
process.exit(red ? 1 : 0);
