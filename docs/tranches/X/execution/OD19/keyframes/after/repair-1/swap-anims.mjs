// repair-1: which animations run in the frames after the swap commits (cube -> Easing / Spring), sampled at
// several instants after the pick. usage: node swap-anims.mjs <dist>
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [dist] = process.argv.slice(2);
const out = [];
const server = await serveDist(dist);
try {
  await withBrowser(async (browser) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    try {
      const page = await ctx.newPage(); page.setDefaultTimeout(15000);
      await page.goto(server.url + "/#/cube", { waitUntil: "load" }); await page.waitForTimeout(4000);
      for (const target of ["Easing", "Spring"]) {
        const d = page.locator(".glass-dock").first(); const b = await d.boundingBox();
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000);
        await d.locator('[aria-label="Scene"]:visible').last().click(); await page.waitForTimeout(600);
        await page.evaluate(() => {
          window.__s = []; const t0 = performance.now();
          const desc = (el) => el ? (el.tagName?.toLowerCase() ?? String(el)) + (el.id ? "#" + el.id.slice(0, 20) : "") + (el.classList ? "." + [...el.classList].slice(0, 3).join(".") : "") : "?";
          const tick = () => { const t = performance.now() - t0; if (t > 120 && window.__s.length < 12) { const a = document.getAnimations().filter((x) => x.playState === "running"); window.__s.push({ t: Math.round(t), n: a.length, list: a.slice(0, 14).map((x) => `${x.animationName || x.transitionProperty || x.constructor.name}@${desc(x.effect?.target)}${x.effect?.pseudoElement || ""} ${Math.round(x.effect?.getComputedTiming().duration || 0)}ms`) }); }
            if (t < 1400) setTimeout(tick, 90); };
          tick();
        });
        await page.getByRole("option", { name: target }).click();
        await page.waitForTimeout(1600);
        out.push({ target, samples: await page.evaluate(() => window.__s) });
        await page.mouse.move(1437, 450); await page.waitForTimeout(2500);
      }
    } finally { await ctx.close(); }
  }, { label: "swap-anims" });
} finally { await server.close(); }
console.log(JSON.stringify(out, null, 1));
