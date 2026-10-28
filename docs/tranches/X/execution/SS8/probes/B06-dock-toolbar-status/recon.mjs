// SERVED MODEL: claude-opus-5-5 — SS-8 B06 recon: dock DOM census, 1440 + 390 (one browser, context per cell).
import { chromium } from "playwright";
const BASE = "http://localhost:9000";
const browser = await chromium.launch();
try {
  for (const cell of [
    { name: "1440", viewport: { width: 1440, height: 900 } },
    { name: "390", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  ]) {
    const ctx = await browser.newContext({ viewport: cell.viewport, isMobile: cell.isMobile, hasTouch: cell.hasTouch, colorScheme: "light" });
    try {
      const page = await ctx.newPage();
      await page.goto(BASE + "/#/", { waitUntil: "domcontentloaded" });
      await page.locator(".glass-dock").first().waitFor({ state: "visible", timeout: 60000 });
      await page.waitForTimeout(3000);
      const dump = () => page.evaluate(() => {
        const d = document.querySelector(".glass-dock");
        const walk = (el, depth) => {
          if (depth > 11) return "";
          const r = el.getBoundingClientRect();
          if (r.width === 0 && depth > 2) return "";
          let s = "  ".repeat(depth) + el.tagName.toLowerCase() +
            (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 4).join(".") : "") +
            (el.id ? "#" + el.id : "") +
            (el.getAttribute("aria-label") ? ` [${el.getAttribute("aria-label")}]` : "") +
            (el.getAttribute("role") ? ` role=${el.getAttribute("role")}` : "") +
            (el.hasAttribute("inert") ? " INERT" : "") +
            ` ${r.x.toFixed(0)},${r.y.toFixed(0)} ${r.width.toFixed(1)}x${r.height.toFixed(1)}\n`;
          if (el.tagName === "svg" || el.hasAttribute("inert")) return s;
          for (const c of el.children) s += walk(c, depth + 1);
          return s;
        };
        const g = d.getAttributeNames().filter((n) => n.startsWith("data-")).map((n) => n + "=" + d.getAttribute(n)).join(" ");
        return "dock attrs: " + g + " class=" + d.className + "\n" + walk(d, 0);
      });
      console.log(`==== ${cell.name}`);
      console.log(await dump());
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
