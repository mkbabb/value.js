// OD19 value — DOM dump of the dock subtree (layers with paint + radius). Headless shell.
import { chromium } from "@playwright/test";
const BASE = process.env.BASE ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 120000 });
  await page.locator(".glass-dock").first().waitFor({ timeout: 120000 });
  await page.waitForTimeout(3000);
  const dump = () => page.evaluate(() => {
    const root = document.querySelector(".glass-dock");
    const out = [];
    const walk = (el, d) => {
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      const paints = cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none" || cs.boxShadow !== "none" || cs.backdropFilter !== "none" || cs.borderTopWidth !== "0px";
      if (d < 4 || paints) out.push(`${"  ".repeat(Math.min(d,8))}${el.tagName.toLowerCase()}.${[...el.classList].join(".").slice(0,90)} ${Math.round(r.width)}x${Math.round(r.height)} rad=${cs.borderRadius} bg=${cs.backgroundColor.slice(0,40)} img=${cs.backgroundImage.slice(0,40)} bf=${cs.backdropFilter} tf=${cs.transform.slice(0,40)} clip=${cs.clipPath.slice(0,30)}`);
      for (const c of el.children) walk(c, d + 1);
    };
    // walk up to show ancestors
    let a = root.parentElement, ups = [];
    while (a && ups.length < 4) { const cs = getComputedStyle(a); ups.push(`UP ${a.tagName}.${[...a.classList].join(".")} rad=${cs.borderRadius} bg=${cs.backgroundColor}`); a = a.parentElement; }
    walk(root, 0);
    return ups.concat(out).join("\n");
  });
  console.log("=== MAIN ===\n" + (await dump()));
  const tools = page.locator('.glass-dock button[aria-label*="ools" i], .glass-dock [data-action-bar-toggle], .glass-dock button:has-text("Tools")').first();
  console.log("tools count", await tools.count());
  const labels = await page.$$eval(".glass-dock button", (bs) => bs.map((b) => b.getAttribute("aria-label") || b.textContent.trim().slice(0, 20)));
  console.log("buttons:", JSON.stringify(labels));
} finally { await browser.close(); }
