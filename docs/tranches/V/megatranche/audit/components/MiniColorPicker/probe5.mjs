// CHALLENGE-D probe 5 — does the sRGB-HSV instrument destroy an authored wide-gamut CSS colour?
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await p.waitForTimeout(2500);
await p.click('button[aria-label="Filters"]');
await p.waitForTimeout(600);

const field = p.locator('input[aria-label="Search by CSS color"]');
await field.fill("oklch(0.72 0.31 145)");           // a colour far outside sRGB
const typed = await field.inputValue();

await p.click('button[aria-label^="Open color picker"]');
await p.waitForTimeout(600);
const afterOpen = await field.inputValue();

const box = await p.evaluate(() => {
    const r = document.querySelector(".sv-canvas").getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
});
await p.mouse.move(box.x + box.w * 0.42, box.y + box.h * 0.42);
await p.mouse.down();
await p.waitForTimeout(120);
await p.mouse.up();
await p.waitForTimeout(300);
const afterOneTap = await field.inputValue();

// what the picker can and cannot express
const gamut = await p.evaluate(() => {
    const hex = document.querySelector(".sv-canvas").closest('[role="dialog"]').querySelector("span.fira-code").textContent.trim();
    return { hex, canExpressP3: null };
});

const out = { typed, afterOpen, afterOneTap, clobbered: typed !== afterOneTap, gamut };
console.log(JSON.stringify(out, null, 2));
writeFileSync(resolve(HERE, "probe5.json"), JSON.stringify(out, null, 2));
await b.close();
