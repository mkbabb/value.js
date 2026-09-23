// READ-ONLY capture of fourier-analysis shell About popover (AppDock.vue).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const URL_ = "http://localhost:3100/";
const repo = "/Users/mkbabb/Programming/fourier-analysis";
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${repo} status --porcelain | wc -l`).toString().trim();
const meta = { sha, dirty, at: new Date().toISOString(), url: URL_, runs: [] };
const browser = await chromium.launch({ headless: false });
for (const [vw, vh] of [[1440, 900], [390, 844]]) {
  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, hasTouch: vw < 500, isMobile: false });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    await page.goto(URL_, { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(1500);
    const tag = `${vw}-${theme}`;
    const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    const trig = page.getByRole("button", { name: "About Fourier analysis" });
    const tb = await trig.boundingBox();
    await page.screenshot({ path: `${OUT}${tag}-0-closed.png` });
    await trig.click();
    await page.waitForTimeout(900);
    const pop = page.locator('[data-slot="popover-content"]');
    const info = await pop.evaluate((el) => {
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      const img = el.querySelector("img"); const hr = el.querySelector("hr");
      const links = [...el.querySelectorAll("a")].map((a) => { const s = getComputedStyle(a); const b = a.getBoundingClientRect(); return { text: a.textContent.trim(), href: a.href, fs: s.fontSize, ff: s.fontFamily.slice(0, 40), color: s.color, h: b.height, w: b.width }; });
      const ps = [...el.querySelectorAll("p")].map((p) => { const s = getComputedStyle(p); return { text: p.textContent.trim(), fs: s.fontSize, color: s.color, style: s.fontStyle }; });
      return { rect: { x: r.x, y: r.y, w: r.width, h: r.height }, radius: cs.borderRadius, padding: cs.padding, bg: cs.backgroundColor, bf: cs.backdropFilter, border: cs.border, shadow: cs.boxShadow.slice(0, 80), role: el.getAttribute("role"), ariaLabel: el.getAttribute("aria-label"), labelledby: el.getAttribute("aria-labelledby"), cls: el.className, img: img && { w: img.getBoundingClientRect().width, radius: getComputedStyle(img).borderRadius, natural: img.naturalWidth, complete: img.complete }, hr: hr && { color: getComputedStyle(hr).borderTopColor, mt: getComputedStyle(hr).marginTop, ml: hr.getBoundingClientRect().x }, links, ps, focused: document.activeElement?.outerHTML.slice(0, 120) };
    }).catch((e) => ({ err: String(e) }));
    await page.screenshot({ path: `${OUT}${tag}-1-open.png` });
    // crop around popover
    if (info.rect) await page.screenshot({ path: `${OUT}${tag}-1-open-crop.png`, clip: { x: Math.max(0, info.rect.x - 24), y: 0, width: Math.min(vw - Math.max(0, info.rect.x - 24), info.rect.w + 48), height: Math.min(vh, info.rect.y + info.rect.h + 24) } });
    // hover on repo link
    const links = pop.locator("a");
    if (vw > 500) { await links.nth(1).hover(); await page.waitForTimeout(300); await page.screenshot({ path: `${OUT}${tag}-2-hover-link.png`, clip: { x: Math.max(0, info.rect.x - 24), y: 0, width: info.rect.w + 48, height: info.rect.y + info.rect.h + 24 } }); }
    // escape closes?
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    const openAfterEsc = await pop.count();
    const trigFocusedAfterEsc = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
    // keyboard open: focus trigger, Enter
    await trig.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(800);
    const kbFocus = await page.evaluate(() => ({ tag: document.activeElement?.tagName, slot: document.activeElement?.getAttribute("data-slot"), text: document.activeElement?.textContent?.trim().slice(0, 40) }));
    await page.screenshot({ path: `${OUT}${tag}-3-keyboard-open.png` });
    await page.keyboard.press("Tab"); await page.waitForTimeout(250);
    const tab1 = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40));
    await page.screenshot({ path: `${OUT}${tag}-4-tab-focus.png`, clip: { x: Math.max(0, info.rect.x - 24), y: 0, width: Math.min(vw, info.rect.w + 48), height: info.rect.y + info.rect.h + 24 } });
    // outside click closes?
    await page.mouse.click(vw / 2, vh - 60); await page.waitForTimeout(500);
    const openAfterOutside = await pop.count();
    meta.runs.push({ tag, isDark, trigger: tb, info, openAfterEsc, trigFocusedAfterEsc, kbFocus, tab1, openAfterOutside, errs: errs.slice(0, 6) });
    await ctx.close();
  }
}
await browser.close();
writeFileSync(`${OUT}capture.json`, JSON.stringify(meta, null, 1));
console.log(JSON.stringify(meta, null, 1));
