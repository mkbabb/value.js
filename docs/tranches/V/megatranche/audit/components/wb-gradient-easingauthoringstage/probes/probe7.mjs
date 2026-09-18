import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const out = {};

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.emulateMedia({ colorScheme: "light" });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(2500);
await page.locator('button[aria-label="Author a custom curve"]').first().click();
await page.waitForTimeout(600);

// alignment + accent census (bezier)
out.bezier = await page.evaluate(() => {
  const st = document.querySelector(".easing-authoring");
  const card = st.querySelector(".glass-card");
  const svg = st.querySelector("svg");
  const chrome = st.querySelector("[data-testid='easing-picker'] > div:nth-child(2)");
  const label = chrome?.querySelector("span");
  const R = (e) => (e ? (({ x, width, y, height }) => ({ x: +x.toFixed(1), r: +(x + width).toFixed(1), y: +y.toFixed(1), h: +height.toFixed(1) }))(e.getBoundingClientRect()) : null);
  return { card: R(card), svg: R(svg), chrome: R(chrome), label: R(label), labelText: label?.textContent?.trim(), labelFont: label ? getComputedStyle(label).fontFamily.slice(0, 30) + " / " + getComputedStyle(label).fontSize + " / " + getComputedStyle(label).textTransform : null, motionAccent: getComputedStyle(st).getPropertyValue("--motion-accent").trim(), curveAccent: getComputedStyle(st.querySelector("[data-testid='easing-picker']")).getPropertyValue("--easing-curve-accent").trim() };
});

// well with/without the producer ::before specular
await page.locator(".easing-authoring .glass-card").first().screenshot({ path: `${OUT}/well-with-before.png` });
await page.addStyleTag({ content: ".easing-authoring .glass-card::before{display:none !important}" });
await page.waitForTimeout(300);
await page.locator(".easing-authoring .glass-card").first().screenshot({ path: `${OUT}/well-no-before.png` });

// steps mode: slider fill vs specimen ink
const t = page.locator('[data-specimen="steps"]').first();
await t.scrollIntoViewIfNeeded().catch(() => {});
await t.click();
await page.waitForTimeout(800);
out.stepsAccents = await page.evaluate(() => {
  const st = document.querySelector(".easing-authoring");
  const cs = (e, p) => (e ? getComputedStyle(e)[p] : null);
  const range = st.querySelector('[data-testid="easing-steps-n"]');
  const parts = range ? [...range.querySelectorAll("*")].slice(0, 8).map((e) => ({ tag: e.tagName + "." + String(e.className).slice(0, 34), bg: cs(e, "backgroundColor"), bgImg: cs(e, "backgroundImage").slice(0, 60) })) : null;
  const R = (e) => (e ? (({ x, width }) => ({ x: +x.toFixed(1), r: +(x + width).toFixed(1) }))(e.getBoundingClientRect()) : null);
  return { motionAccent: getComputedStyle(st).getPropertyValue("--motion-accent").trim(), sliderParts: parts, sliderRect: R(range), cardRect: R(st.querySelector(".glass-card")), svgRect: R(st.querySelector("svg")) };
});

// crash → sample painted pixel of the boundary statement
await page.evaluate(() => location.reload());
await page.waitForTimeout(3000);
await page.locator('button[aria-label="Author a custom curve"]').first().click();
await page.waitForTimeout(400);
await page.locator('.easing-authoring [role="slider"]').nth(1).focus();
await page.keyboard.press("Shift+ArrowUp"); await page.waitForTimeout(200);
await page.keyboard.press("Shift+ArrowUp"); await page.waitForTimeout(1200);
out.ambient = await page.evaluate(() => {
  const kids = [...document.body.children].map((e) => { const c = getComputedStyle(e); return { tag: e.tagName + "." + String(e.className).slice(0, 24), pos: c.position, z: c.zIndex, inset: c.inset, pe: c.pointerEvents, opacity: c.opacity, bg: c.backgroundImage.slice(0, 50) || c.backgroundColor, isolation: c.isolation, mix: c.mixBlendMode }; });
  const b = document.querySelector(".vj-error-boundary");
  const p = b?.querySelector("p");
  const btn = b?.querySelector("button");
  const cs = (e) => { const c = getComputedStyle(e); return { pos: c.position, z: c.zIndex, transform: c.transform, isolation: c.isolation, willChange: c.willChange }; };
  return { bodyKids: kids, main: cs(document.querySelector("main")), boundary: cs(b), statement: cs(p), button: cs(btn), mainCS: (() => { const c = getComputedStyle(document.querySelector("main")); return { bg: c.backgroundColor, mask: c.maskImage.slice(0, 60), contain: c.contain, overflow: c.overflow, viewTransitionName: c.viewTransitionName }; })() };
});
await page.screenshot({ path: `${OUT}/crash-crop.png`, clip: { x: 460, y: 400, width: 520, height: 200 } });

await browser.close();
fs.writeFileSync(`${OUT}/probe7.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
