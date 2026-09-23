// UIA fourier shape-extractor-internal — headed Chromium, real GPU. READ-ONLY on the app tree.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
const tree = () => `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")} | glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")} | ${new Date().toISOString()}`;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = { treeStart: tree() }; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const measure = (page) => page.evaluate(() => {
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopStyle + " " + cs.borderTopColor, font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 30), color: cs.color, pad: cs.padding, outline: cs.outline, shadow: cs.boxShadow.slice(0, 60) }; };
  const q = (s) => document.querySelector(s);
  return { title: document.title, metaDesc: q('meta[name=description]')?.content?.slice(0, 80), htmlClass: document.documentElement.className,
    main: box(q("main")), page: box(q(".extractor-page")), h1: box(q(".extractor-page h1")), h2: [...document.querySelectorAll(".extractor-page h2")].map(box),
    svgs: [...document.querySelectorAll(".subject-svg")].map(box), btn: box(q("#extract-btn")), status: box(q("#extract-status")), statusText: q("#extract-status")?.textContent,
    out: box(q("#output")), outLen: q("#output")?.textContent.length, outScrollH: q("#output")?.scrollHeight,
    bodyBg: getComputedStyle(document.body).backgroundColor, scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight, vw: innerWidth,
    chrome: [...document.querySelectorAll("nav, header, [role=navigation], .dock, [class*=dock]")].slice(0, 6).map((e) => e.tagName + "." + (e.className?.baseVal ?? e.className).toString().slice(0, 60)),
    active: document.activeElement?.outerHTML.slice(0, 100), win: typeof window.__fourierShapeData };
});
for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${vp}-${theme}: ${m.text().slice(0, 200)}`); });
  page.on("pageerror", (e) => errors.push(`${vp}-${theme} PAGEERR: ${e.message.slice(0, 200)}`));
  const k = `${vp}-${theme}`;
  try {
    const t0 = Date.now();
    await page.goto(BASE + "/demo/shape-extractor", { waitUntil: "networkidle", timeout: 30000 });
    // loading state: before the 200ms auto-extract
    await page.screenshot({ path: `${OUT}${k}-0-early.png` });
    await page.waitForTimeout(1500);
    metrics[k + "-1-default"] = { ...(await measure(page)), loadMs: Date.now() - t0 };
    await page.screenshot({ path: `${OUT}${k}-1-default.png` });
    await page.screenshot({ path: `${OUT}${k}-1b-fullpage.png`, fullPage: true });
    if (vp === "d") {
      await page.hover("#extract-btn"); await page.waitForTimeout(500);
      metrics[k + "-2-btn-hover"] = { btn: (await measure(page)).btn };
      await page.locator("#extract-btn").screenshot({ path: `${OUT}${k}-2-btn-hover.png` });
      await page.mouse.move(5, 5);
      await page.keyboard.press("Tab"); let tries = 0;
      while (tries++ < 30 && !(await page.evaluate(() => document.activeElement?.id === "extract-btn"))) await page.keyboard.press("Tab");
      await page.waitForTimeout(400);
      metrics[k + "-3-btn-focus"] = { tabs: tries, btn: (await measure(page)).btn };
      await page.screenshot({ path: `${OUT}${k}-3-btn-focus.png` });
      await page.keyboard.press("Tab"); await page.waitForTimeout(400);
      metrics[k + "-4-output-focus"] = { active: (await measure(page)).active, out: (await measure(page)).out };
      await page.screenshot({ path: `${OUT}${k}-4-output-focus.png` });
      await page.click("#extract-btn"); await page.waitForTimeout(500);
      metrics[k + "-5-after-click"] = { status: (await measure(page)).statusText };
    }
  } catch (e) { errors.push(`${k} FAIL ${e.message.slice(0, 200)}`); }
  await ctx.close();
}
metrics.treeEnd = tree(); metrics.errors = errors;
writeFileSync(OUT + "metrics.json", JSON.stringify(metrics, null, 1));
await browser.close();
console.log("done", errors.length);
