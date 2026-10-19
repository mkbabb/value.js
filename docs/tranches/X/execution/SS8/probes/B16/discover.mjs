// Discovery: what the palettes pane exposes with a mocked one-palette wall.
import { chromium, newCell, mockApi, gotoPalettes, save, EV } from "./lib.mjs";
const b = await chromium.launch({ headless: true });
try {
  const { ctx, page, errs } = await newCell(b, {});
  try {
    const log = [];
    await mockApi(ctx, { log });
    await gotoPalettes(page);
    const dump = await page.evaluate(() => [...document.querySelectorAll("button,[role=article],[role=tab],a,[role=menuitem]")]
      .filter((e) => e.offsetParent).map((e) => `${e.tagName} ${e.getAttribute("role") ?? ""} [${e.getAttribute("aria-label") ?? ""}] ${e.textContent.trim().slice(0, 40)}`).slice(0, 80));
    await page.screenshot({ path: EV + "discover-1440-light.png" });
    save("discover.json", { url: page.url(), dump, log: log.slice(0, 30), errs });
    console.log(dump.join("\n"));
  } finally { await ctx.close(); }
} finally { await b.close(); }
