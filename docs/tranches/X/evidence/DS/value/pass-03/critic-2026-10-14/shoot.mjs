// X-DS value critic 2026-10-14: HEAD frames + computed probe, headless real Chrome (§0ei), serial.
import fs from "node:fs"; import path from "node:path";
import { chromium } from "@playwright/test";
const OUT = import.meta.dirname; const BASE = "http://localhost:9000";
const jobs = JSON.parse(process.argv[2]);
const probe = {};
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 120000 });
try {
  for (const j of jobs) {
    const ctx = await browser.newContext({ viewport: { width: j.w, height: j.w <= 500 ? 844 : 900 }, colorScheme: j.t });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, j.t);
    const page = await ctx.newPage();
    try {
      console.log(new Date().toISOString(),"goto",j.name); await page.goto(BASE + j.r, { waitUntil: "load", timeout: 180000 }); console.log(new Date().toISOString(),"loaded");
      await page.locator(".glass-dock").first().waitFor({ timeout: 180000 });
      console.log("dock"); await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 180000 }); console.log("card");
      await page.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 180000 }).catch(() => {});
      await page.waitForTimeout(4000);
      if (j.click) { await page.getByRole("button", { name: j.click }).first().click().catch((e) => console.log("click fail", String(e).slice(0,120))); await page.waitForTimeout(1200); }
      if (j.scroll) { await page.mouse.move(j.w * 0.7, 500); await page.mouse.wheel(0, j.scroll); await page.waitForTimeout(1200); }
      await page.screenshot({ path: path.join(OUT, j.name + ".png") });
      probe[j.name] = await page.evaluate(() => {
        const out = {};
        const cs = (el) => getComputedStyle(el);
        const rt = document.querySelector("#route-title"); if (rt) { const r = rt.getBoundingClientRect(); out.routeTitle = { text: rt.textContent.trim(), y: r.y, h: r.height, font: cs(rt).fontFamily.split(",")[0], size: cs(rt).fontSize, color: cs(rt).color }; }
        const btns = [...document.querySelectorAll("main button")].filter(b => b.offsetParent);
        out.buttonsWithShadow = btns.map(b => ({ t: (b.innerText || b.getAttribute("aria-label") || "").trim().slice(0,30), sh: cs(b).boxShadow, bg: cs(b).backgroundImage.slice(0,80), dis: b.disabled })).filter(x => x.sh !== "none").slice(0, 20);
        out.dockItems = [...document.querySelectorAll(".glass-dock button, .glass-dock a")].filter(b=>b.offsetParent).map(b => (b.innerText || b.getAttribute("aria-label") || "").trim().slice(0,24));
        out.errors = [...document.querySelectorAll("main *")].filter(e => /could not be loaded/i.test(e.textContent) && e.children.length === 0).map(e => e.textContent.trim());
        return out;
      });
      console.log("ok", j.name);
    } catch (e) { console.log("FAIL", j.name, String(e).slice(0, 200)); }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(OUT, "probe-" + (process.argv[3] || "a") + ".json"), JSON.stringify(probe, null, 2));
