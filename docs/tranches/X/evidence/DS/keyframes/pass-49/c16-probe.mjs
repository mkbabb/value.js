// X-DS keyframes r7 pass 16 (critic C16) — falsifier + AFTER frames. Headless real Chrome only (§0ei).
// KF-C16-01  every route frame is taken AT REST, before any hover or click (the spring-390 sheet at scrollTop 0,
//            its 'Physics' heading in frame); no scroller is moved by the probe before the capture.
// KF-C16-02  #/cube Keyframes ribbon: Copy / Format / Compiled are all words or all glyphs, never alternating.
// KF-C16-G1  frames only (glass-owned, O-87 / O-88).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const SETTLE = 6000;
const ROUTES = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const rep = { cells: {}, fails: [] };
const ribbonState = () => {
  const row = [...document.querySelectorAll("button[aria-label='Copy keyframes']")].find((b) => b.checkVisibility())?.parentElement;
  if (!row) return null;
  return { rowWidth: Math.round(row.getBoundingClientRect().width), verbs: [...row.querySelectorAll("button")].slice(1).map((b) => {
    const s = b.querySelector("span"); const cs = s && getComputedStyle(s);
    return { name: b.getAttribute("aria-label"), worded: !!s && cs.position !== "absolute" && s.getBoundingClientRect().width > 1 };
  }) };
};
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    for (const route of ROUTES) {
      const page = await ctx.newPage();
      const name = route || "home"; const key = `${name}-${w}-${scheme}`;
      try {
        await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
        // KF-C16-01: capture FIRST, at rest; record every scroller's offset so the frame's state is on file.
        const scrolled = await page.evaluate(() => [...document.querySelectorAll("*")].filter((e) => e.scrollTop > 0 && e !== document.scrollingElement).map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].slice(0, 2).join(".")}:${Math.round(e.scrollTop)}`));
        await page.screenshot({ path: path.join(OUT, `${name}-${w}-${scheme}.png`) });
        rep.cells[`${key}-scrolled`] = scrolled;
        if (scrolled.length) rep.fails.push(`${key}: frame not at rest (${scrolled.join(", ")})`);
        if (route === "spring") {
          const head = await page.evaluate(() => { const e = [...document.querySelectorAll("h1,h2,h3,h4,[role=heading],span,div")].find((x) => x.childElementCount === 0 && x.textContent.trim() === "Physics" && x.checkVisibility()); const r = e?.getBoundingClientRect(); return r ? Math.round(r.y) : null; });
          rep.cells[`${key}-physics-heading-y`] = head;
          if (head === null || head < 0 || head > h) rep.fails.push(`${key}: 'Physics' heading not in frame (${head})`);
        }
        if (route === "cube") {
          // KF-C16-02: open the Keyframes surface from the dock and read the ribbon's verbs.
          const face = await page.evaluate(() => { const e = [...document.querySelectorAll(".scene-mini")].find((x) => x.checkVisibility()); const b = e?.getBoundingClientRect(); return b ? { x: b.x + b.width / 2, y: b.y + b.height / 2 } : null; });
          if (face) { await page.mouse.move(face.x, face.y); await page.waitForTimeout(1200); }
          const item = await page.evaluateHandle(() => [...document.querySelectorAll("[data-dock-surface-item]")].find((x) => x.checkVisibility() && /keyframes/i.test(`${x.getAttribute("aria-label") ?? ""} ${x.textContent}`)) ?? null);
          const el = item.asElement();
          if (!el) rep.fails.push(`${key}: no Keyframes dock item (${await page.evaluate(() => [...document.querySelectorAll("[data-dock-surface-item]")].map((x) => x.getAttribute("aria-label") || x.textContent.trim()).join("|"))})`);
          else {
            await el.click(); await page.mouse.move(1, 1); await page.waitForTimeout(1500);
            const rb = await page.evaluate(ribbonState);
            rep.cells[`${key}-ribbon`] = rb;
            if (!rb) rep.fails.push(`${key}: ribbon row not visible`);
            else {
              const worded = new Set(rb.verbs.map((v) => v.worded));
              if (worded.size !== 1) rep.fails.push(`${key}: ribbon alternates ${JSON.stringify(rb.verbs)}`);
              const row = await page.evaluate(() => { const r = [...document.querySelectorAll("button[aria-label='Copy keyframes']")].find((b) => b.checkVisibility())?.parentElement?.getBoundingClientRect(); return r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null; });
              if (row && row.width > 0 && row.y >= 0 && row.y + row.height <= 900) await page.screenshot({ path: path.join(OUT, `crop-cube-ribbon-${w}-${scheme}.png`), clip: { x: Math.max(0, row.x - 16), y: Math.max(0, row.y - 16), width: Math.min(w - Math.max(0, row.x - 16), row.width + 32), height: row.height + 32 } });
              await page.screenshot({ path: path.join(OUT, `cube-keyframes-${w}-${scheme}.png`) });
            }
          }
        }
      } finally { await page.close(); }
    }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c16-probe.json"), JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep.fails, null, 1));
for (const [k, v] of Object.entries(rep.cells)) console.log(k, JSON.stringify(v));
process.exit(rep.fails.length ? 1 : 0);
