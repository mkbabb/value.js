import { chromium } from "@playwright/test";
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:9000/#/palettes", { waitUntil: "load", timeout: 180000 });
  await p.locator(".glass-dock").first().waitFor({ timeout: 180000 });
  await p.waitForTimeout(8000);
  const r = await p.evaluate(() => {
    const st = [...document.querySelectorAll('main [role="status"] p.font-display')].map(e => { const c = getComputedStyle(e); return { t: e.textContent.trim(), fs: c.fontSize, fw: c.fontWeight, fvs: c.fontVariationSettings }; });
    const well = [...document.querySelectorAll('.current-palette-well span')].map(e => { const c = getComputedStyle(e); return { t: e.textContent.trim(), fs: c.fontSize, fw: c.fontWeight }; });
    return { st, well };
  });
  await p.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
  await p.locator(".glass-dock").first().waitFor({ timeout: 180000 });
  await p.waitForTimeout(6000);
  const mix = await p.evaluate(() => { const b = [...document.querySelectorAll("main button")].find(x => x.textContent.trim() === "Mix"); return b ? { cls: b.className, attrs: [...b.attributes].map(a => a.name + "=" + a.value).join(" ") } : null; });
  console.log(JSON.stringify({ ...r, mix }, null, 1));
} finally { await b.close(); }
