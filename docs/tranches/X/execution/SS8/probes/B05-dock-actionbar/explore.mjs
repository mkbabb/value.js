// SERVED MODEL: claude-opus-5-5 — SS-8 B05 exploratory DOM census (one browser, one context).
import { chromium } from "playwright";
const URL = process.env.URL ?? "http://localhost:9000/#/";
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  try {
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const dump = () => page.evaluate(() => {
      const d = document.querySelector(".glass-dock");
      const walk = (el, depth) => {
        if (depth > 7) return "";
        const r = el.getBoundingClientRect();
        let s = "  ".repeat(depth) + el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0,6).join(".") : "") +
          (el.getAttribute("aria-label") ? ` [${el.getAttribute("aria-label")}]` : "") + (el.hasAttribute("inert") ? " INERT" : "") +
          (el.getAttribute("data-face") ? ` face=${el.getAttribute("data-face")}` : "") +
          ` ${r.x.toFixed(1)},${r.y.toFixed(1)} ${r.width.toFixed(1)}x${r.height.toFixed(1)}\n`;
        if (el.tagName === "svg") return s;
        for (const c of el.children) s += walk(c, depth + 1);
        return s;
      };
      return walk(d, 0);
    });
    console.log(await dump());
    await page.getByRole("button", { name: "Toggle action bar" }).click();
    await page.waitForTimeout(1200);
    console.log("---- after toggle");
    console.log(await dump());
  } finally { await ctx.close(); }
} finally { await browser.close(); }
