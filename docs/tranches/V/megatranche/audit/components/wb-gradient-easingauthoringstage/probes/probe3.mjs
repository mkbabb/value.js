import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });

const SNAP = () => {
  const stage = document.querySelector(".easing-authoring");
  const svg = stage?.querySelector("svg");
  const vb = svg?.viewBox.baseVal;
  const r = svg?.getBoundingClientRect();
  const s = vb && r ? Math.min(r.width / vb.width, r.height / vb.height) : 0;
  return {
    alive: !!stage,
    literal: document.querySelector('[id^="easing-interval-"] code')?.textContent?.trim(),
    viewBox: svg?.getAttribute("viewBox"),
    svgBox: r ? { w: +r.width.toFixed(1), h: +r.height.toFixed(1) } : null,
    unitPx: +s.toFixed(2),
    inkH: vb ? +(vb.height * s).toFixed(1) : null,
    deadPct: vb && r ? +(100 * (1 - (vb.width * s * vb.height * s) / (r.width * r.height))).toFixed(1) : null,
    stageStyle: stage?.getAttribute("style"),
    aria: [...(svg?.querySelectorAll('[role="slider"]') || [])].map((e) => e.getAttribute("aria-valuetext")),
  };
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const pageErrs = [], consoleErrs = [];
page.on("pageerror", (e) => pageErrs.push(String(e.message ?? e)));
page.on("console", (m) => { if (m.type() === "error") consoleErrs.push(m.text().slice(0, 300)); });
await page.emulateMedia({ colorScheme: "light" });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(2500);
await page.locator('button[aria-label="Author a custom curve"]').first().click();
await page.waitForTimeout(600);

const out = { steps: [] };
const shot = async (n) => { try { await page.locator(".easing-authoring").first().screenshot({ path: `${OUT}/${n}.png`, timeout: 3000 }); } catch { await page.screenshot({ path: `${OUT}/${n}-PAGE.png` }); } };

out.steps.push({ tag: "rest", ...(await page.evaluate(SNAP)) });

// Drive control point 2 upward with arrow keys — the in-stage authoring path.
await page.locator('.easing-authoring [role="slider"]').nth(1).focus();
for (let i = 1; i <= 12; i++) {
  await page.keyboard.press("Shift+ArrowUp");
  await page.waitForTimeout(160);
  const s = await page.evaluate(SNAP);
  out.steps.push({ tag: `shiftUp x${i}`, ...s, pageErrs: pageErrs.length });
  if (!s.alive) break;
}
await shot("arrow-overshoot");

// how many keystrokes to leave the unit box?
out.pageErrs = pageErrs;
out.consoleErrs = consoleErrs;

// now try a pointer drag far above the box
if ((await page.locator(".easing-authoring").count()) > 0) {
  const box = await page.locator(".easing-authoring svg").first().boundingBox();
  await page.mouse.move(box.x + box.width * 0.62, box.y + box.height * 0.35);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.62, box.y - 60, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(600);
  out.afterDrag = await page.evaluate(SNAP);
  await shot("after-drag");
}
out.pageErrsFinal = pageErrs;
await browser.close();
fs.writeFileSync(`${OUT}/probe3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
