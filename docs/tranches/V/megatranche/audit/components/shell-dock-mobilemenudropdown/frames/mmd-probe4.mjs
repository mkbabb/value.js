import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const URL = "http://localhost:9000/#/";
const out = {};
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, colorScheme: "light" });
const page = await ctx.newPage();
await page.addInitScript(() => localStorage.setItem("palette-user-slug", "amaranthine-quokka-northern-marches"));
await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(3000);
await page.locator(".dock-dropdown-trigger").first().click();
await page.waitForTimeout(700);

out.attrs = await page.evaluate(() => {
  const item = [...document.querySelectorAll('[role="menuitem"]')].find((e) => /GitHub/.test(e.textContent));
  const av = document.querySelector('[role="menu"] [class*="avatar"], [role="menu"] span[data-slot], [role="menu"] img')?.closest("*");
  return {
    githubItemAttrs: item ? [...item.attributes].map((a) => a.name + "=" + a.value.slice(0, 40)) : null,
    avatarHost: (() => { const img = document.querySelector('[role="menu"] img'); if (!img) return null; const host = img.parentElement; return { hostTag: host.tagName, hostCls: String(host.className).slice(0, 60), hostAttrs: [...host.attributes].map((a) => a.name), imgAlt: img.getAttribute("alt"), imgAria: img.getAttribute("aria-hidden"), imgSrc: img.getAttribute("src").slice(0, 50), imgRect: (() => { const r = img.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })() }; })(),
    // the identity block: is it inside the menu but not a menuitem?
    identityBlock: (() => { const d = [...document.querySelectorAll('[role="menu"] > div')].find((e) => /mbabb/.test(e.textContent) && !e.getAttribute("role")); if (!d) return null; const r = d.getBoundingClientRect(); return { cls: String(d.className), role: d.getAttribute("role"), tabIndex: d.tabIndex, h: +r.height.toFixed(1), focusableChildren: d.querySelectorAll("a,button,[tabindex]").length }; })(),
    labelBlock: (() => { const d = document.querySelector('[role="menu"] .dropdown-menu__label'); if (!d) return null; return { role: d.getAttribute("role"), cls: String(d.className), text: d.textContent.trim().slice(0, 40) }; })(),
    menuAria: (() => { const m = document.querySelector('[role="menu"]'); return { ariaLabel: m.getAttribute("aria-label"), ariaLabelledby: m.getAttribute("aria-labelledby"), ariaOrientation: m.getAttribute("aria-orientation") }; })(),
    tabbables: [...document.querySelectorAll('[role="menu"] a, [role="menu"] button')].map((e) => ({ tag: e.tagName, tabIndex: e.tabIndex, text: (e.textContent || "").trim().slice(0, 16) })),
  };
});

// pixel sample of the description text band
const shot = await page.screenshot({ clip: { x: 0, y: 290, width: 390, height: 70 } });
fs.writeFileSync(`${OUT}/mmd-desc-band.png`, shot);
const b64 = shot.toString("base64");
out.pixels = await page.evaluate(async (b) => {
  const blob = await (await fetch("data:image/png;base64," + b)).blob();
  const bmp = await createImageBitmap(blob);
  const cv = document.createElement("canvas"); cv.width = bmp.width; cv.height = bmp.height;
  const cx = cv.getContext("2d"); cx.drawImage(bmp, 0, 0);
  const d = cx.getImageData(0, 0, cv.width, cv.height).data;
  const px = (x, y) => { const i = (y * cv.width + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
  const lum = ([r, g, b2]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b2); };
  const cr = (a, b2) => { const l1 = lum(a), l2 = lum(b2); return +((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2); };
  // scan the description line band for darkest ink and lightest ground
  const band = { y0: 40, y1: 56, x0: 95, x1: 330 };
  let darkest = [255, 255, 255], lightest = [0, 0, 0];
  for (let y = band.y0; y < band.y1; y++) for (let x = band.x0; x < band.x1; x++) {
    const p = px(x, y);
    if (lum(p) < lum(darkest)) darkest = p;
    if (lum(p) > lum(lightest)) lightest = p;
  }
  // ground samples inside the menu, left of and right of the text
  const groundA = px(360, 48), groundB = px(90, 20);
  return { size: [cv.width, cv.height], darkestInk: darkest, lightestGround: lightest, contrastInkVsLightestGround: cr(darkest, lightest), groundA, groundB, contrastInkVsGroundA: cr(darkest, groundA) };
}, b64);

await browser.close();
fs.writeFileSync(`${OUT}/mmd-probe4.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
