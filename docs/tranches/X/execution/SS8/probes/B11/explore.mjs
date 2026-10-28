// SS8 B11 exploration: dump the browse pane's controls (headless chromium, one browser, closed in finally)
import { chromium } from "playwright";
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", (m) => { if (m.type() === "error") logs.push(m.text().slice(0, 200)); });
  await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const out = await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button,[role=button],[role=menuitem]")]
      .filter((b) => b.offsetParent !== null)
      .map((b) => (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 50));
    return { url: location.href, nBtns: btns.length, btns: [...new Set(btns)].slice(0, 70), articles: document.querySelectorAll("article").length };
  });
  console.log(JSON.stringify(out, null, 1));
  console.log("errors", logs.slice(0, 5));
  await ctx.close();
} finally { await browser.close(); }
