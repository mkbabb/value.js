// repair-1 frames + DOM facts for C1-KF-04/09/10/11 over a prod build.
// usage: node frames.mjs <distDir> <outDir> <tag>
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [dist, OUT, TAG] = process.argv.slice(2);
const res = [];
async function crop(page, el, name, pad = 16) { const b = await el.boundingBox(); if (!b) return null; const vp = page.viewportSize(); const x = Math.max(0, b.x - pad), y = Math.max(0, b.y - pad); await page.screenshot({ path: `${OUT}/${name}.png`, clip: { x, y, width: Math.min(vp.width - x, b.width + 2 * pad), height: Math.min(vp.height - y, b.height + 2 * pad) } }); return b; }
const server = await serveDist(dist);
try {
  await withBrowser(async (browser) => {
    for (const scheme of ["dark", "light"]) {
      const w = 1440, h = 900, tag = `${TAG}-${scheme}-${w}`, cell = { tag, notes: [] };
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
      try {
        const page = await ctx.newPage(); page.setDefaultTimeout(15000);
        await page.goto(server.url + "/#/cube", { waitUntil: "load" }); await page.waitForTimeout(3500); await page.mouse.move(w - 3, h - 3); await page.waitForTimeout(600);
        // C1-KF-09: every visible option trigger's chevron, its rendered rotation, and the open ancestor that flips it.
        cell.chevrons = await page.evaluate(() => {
          const rows = [];
          const trig = [...document.querySelectorAll('[role="combobox"], [aria-labelledby][aria-haspopup="dialog"]')].filter((e) => e.getBoundingClientRect().width > 0);
          for (const e of trig) {
            const svgs = [...e.querySelectorAll("svg")]; const chev = svgs[svgs.length - 1];
            const m = chev ? new DOMMatrix(getComputedStyle(chev).transform === "none" ? undefined : getComputedStyle(chev).transform) : null;
            const anc = e.parentElement?.closest('[data-state="open"]');
            rows.push({ text: e.innerText.trim().slice(0, 20), chevron: chev?.getAttribute("class")?.match(/lucide-[a-z-]+/)?.[0], rot: m ? Math.round(Math.atan2(m.b, m.a) * 180 / Math.PI) : null, rotate: chev ? getComputedStyle(chev).rotate : null, ancestorState: anc?.getAttribute("data-state") ?? null, openAncestor: anc ? anc.tagName.toLowerCase() + "." + [...anc.classList].slice(0, 3).join(".") + (anc.dataset.slot ? "[slot=" + anc.dataset.slot + "]" : "") : null });
          }
          return rows;
        });
        const combos = page.locator('[role="combobox"]:visible');
        const nC = await combos.count();
        if (nC) { const f = await combos.first().boundingBox(); const l = await combos.nth(nC - 1).boundingBox(); await page.screenshot({ path: `${OUT}/K3-selects-${tag}.png`, clip: { x: Math.max(0, f.x - 140), y: Math.max(0, f.y - 10), width: Math.min(w - Math.max(0, f.x - 140), f.width + 160), height: Math.min(h - f.y, l.y + l.height - f.y + 70) } }); }
        // C1-KF-11: the Reverse disc.
        const rev = page.locator('button[aria-pressed]:has(.sr-only:text-is("Reverse"))').first();
        if (await rev.count()) { await crop(page, rev, `K4-reverse-disc-${tag}`, 14); cell.reverse = await rev.evaluate((e) => { const s = e.querySelector("svg"); const r = s.getBoundingClientRect(); return { glyph: s.getAttribute("class").match(/lucide-[a-z-]+/)?.[0], px: [Math.round(r.width), Math.round(r.height)], disc: Math.round(e.getBoundingClientRect().width) }; }); } else cell.notes.push("no Reverse disc");
        // C1-KF-10: open the Editor surfaces menu with the Controls pane showing.
        const dock = page.locator(".glass-dock").first(); const b = await dock.boundingBox();
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200);
        await page.locator('[aria-label="Editor surfaces"]:visible').first().click(); await page.waitForTimeout(700);
        const menu = page.locator('[role="menu"]:visible').first();
        cell.surfaces = await page.evaluate(() => [...document.querySelectorAll("[data-dock-surface-item]")].map((e) => ({ t: e.textContent.trim(), role: e.getAttribute("role"), checked: e.getAttribute("aria-checked"), dot: !!e.querySelector(".menu__radio-dot") && getComputedStyle(e.querySelector(".menu__radio-dot")).opacity !== "0" && e.querySelector(".menu__radio-dot").getBoundingClientRect().width > 0 })));
        if (await menu.count()) await crop(page, menu, `K6-surfaces-menu-${tag}`, 12);
        // Scene list beside it, for the comparison.
        await page.keyboard.press("Escape"); await page.waitForTimeout(400);
        // C1-KF-04: the editor with the Keyframes surface.
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(800);
        await page.locator('[aria-label="Editor surfaces"]:visible').first().click(); await page.waitForTimeout(500);
        await page.locator('[data-dock-surface-item][data-surface="keyframes"]').click(); await page.waitForTimeout(3500);
        await page.mouse.move(w - 3, h - 3); await page.waitForTimeout(400);
        const ed = page.locator(".monaco-editor:visible").first();
        if (await ed.count()) await crop(page, ed, `K7-editor-${tag}`, 8); else cell.notes.push("no editor");
        cell.inks = await page.evaluate(() => { const m = {}; for (const s of document.querySelectorAll(".monaco-editor .view-line span span")) { const c = getComputedStyle(s).color; m[c] = (m[c] || []).concat(s.textContent.trim()).slice(0, 4); } return m; });
      } catch (e) { cell.notes.push(String(e).slice(0, 200)); } finally { await ctx.close(); }
      res.push(cell);
    }
  }, { label: "repair-1-frames" });
} finally { await server.close(); }
console.log(JSON.stringify(res, null, 1));
