// OD19 P2 AFTER probe — F7 (control row, /equation) + F8 (hovered timeline caret, /v), light/dark x 1440/390.
// Headless; ONE browser; a context per cell; closed in finally.
// Run: ~/.claude/guard/guarded --timeout 15 -- node probe.mjs
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const B = process.env.BASE ?? "http://localhost:3100";
const VIZ = "/v/hazy-etching-cream-elk";
const R = {};
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const w of [1440, 390]) {
    const cell = `${scheme}-${w}`; const H = w === 390 ? 844 : 900; const C = (R[cell] = {});
    const ctx = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      await page.goto(B + "/equation", { waitUntil: "load" }); await page.waitForTimeout(2500);
      const row = page.locator(".control-row").first();
      if (await row.count()) { await row.scrollIntoViewIfNeeded(); await row.screenshot({ path: `${OUT}${cell}-F7-control-row.png` });
        C.F7 = await row.evaluate((r) => [".glass-slider", ".slider-track", ".slider-range", ".slider-thumb"].map((s) => { const e = r.querySelector(s); if (!e) return `${s}: absent`; const cs = getComputedStyle(e); const b = e.getBoundingClientRect(); return `${s} ${Math.round(b.width)}x${Math.round(b.height)} variant=${e.dataset.variant ?? "-"} border=${cs.borderTopWidth} opacity=${cs.opacity} bgImage=${cs.backgroundImage === "none" ? "none" : cs.backgroundImage.slice(0, 40)} tint=${cs.getPropertyValue("--liquid-fill-tint").trim().slice(0, 30)}`; })); }
      await page.goto(B + VIZ, { waitUntil: "load" }); await page.waitForTimeout(3000);
      if (w < 1024) await page.getByRole("tab", { name: "Canvas" }).click().catch(() => {});
      const dock = page.locator(".animation-dock"); const db = await dock.boundingBox();
      if (db) { await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2); await page.waitForTimeout(900);
        const rb = await page.locator(".animation-dock .timeline-row").boundingBox();
        if (rb) { await page.mouse.move(rb.x + rb.width * 0.4, rb.y + rb.height / 2); await page.waitForTimeout(700);
          C.F8 = await page.evaluate(() => { const c = document.querySelector(".caret-value"); if (!c) return null; const b = c.getBoundingClientRect(); const hit = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2);
            const t = document.querySelector(".animation-dock .timeline-slider [role=slider]").getBoundingClientRect();
            const out = { caret: [b.x, b.y, b.width, b.height].map(Math.round), thumbX: Math.round(t.x), thumbTop: Math.round(t.y), inDock: !!c.closest(".animation-dock"), hitIsCaret: !!hit && (c.contains(hit) || hit.contains(c)), clippers: [] };
            for (let e = c.parentElement; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.overflow !== "visible" || cs.clipPath !== "none") { const r = e.getBoundingClientRect(); out.clippers.push(`${String(e.className).slice(0, 40)} ovf=${cs.overflow} box=${Math.round(r.y)}..${Math.round(r.bottom)}`); } } return out; });
          await page.screenshot({ path: `${OUT}${cell}-F8-caret.png`, clip: { x: 0, y: Math.max(0, rb.y - 80), width: w, height: rb.height + 120 } }); } }
    } catch (e) { C.error = e.message.slice(0, 200); } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`${OUT}probe.json`, JSON.stringify(R, null, 1)); console.log(JSON.stringify(R, null, 1).slice(0, 6000));
