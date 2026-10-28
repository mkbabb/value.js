// Discovery 2: #/browse wall (mocked) + #/palettes with one seeded local palette.
import { chromium, newCell, mockApi, save, EV, APP } from "./lib.mjs";
const now = new Date().toISOString();
const SEED = JSON.stringify({ version: 1, palettes: [{ id: "ss8-local-1", name: "Moss", slug: "ss8-local-1", colors: ["oklch(0.5 0.1 140)", "oklch(0.75 0.12 120)", "oklch(0.3 0.05 150)"].map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true }] });
const dumpFn = () => [...document.querySelectorAll("button,[role=article],[role=listitem],[role=menuitem]")]
  .filter((e) => e.offsetParent).map((e) => `${e.tagName} ${e.getAttribute("role") ?? ""} [${e.getAttribute("aria-label") ?? ""}] ${e.textContent.trim().slice(0, 40)}`).slice(0, 60);
const b = await chromium.launch({ headless: true });
const out = {};
try {
  for (const [tag, route] of [["browse", "#/browse"], ["palettes", "#/palettes"]]) {
    const { ctx, page, errs } = await newCell(b, { seed: SEED });
    try {
      const log = []; await mockApi(ctx, { log });
      await page.goto(APP + route, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
      out[tag] = { dump: await page.evaluate(dumpFn), log: log.slice(0, 15), errs, ls: await page.evaluate(() => Object.keys(localStorage)) };
      await page.screenshot({ path: EV + `discover-${tag}.png` });
    } finally { await ctx.close(); }
  }
  save("discover2.json", out);
  for (const k in out) console.log("==", k, "\n" + out[k].dump.filter((l) => !/channel|color\b|Select color space/.test(l)).join("\n"), "\n", JSON.stringify(out[k].log), out[k].errs.slice(0, 3), out[k].ls);
} finally { await b.close(); }
