// PROBE E3/E4 (retry) — cardRefs retention + publish in-flight guard.
import { chromium } from "playwright";
const KEY = "color-palettes";
const API = "https://api.color.babb.dev";
const mk = (names) => JSON.stringify({ version: 1, palettes: names.map((n, i) => ({
    id: `id-${n}`, name: n, slug: n.toLowerCase(),
    colors: [{ css: "#ff0000", position: 0 }, { css: "#0000ff", position: 1 }],
    createdAt: "2026-01-01T00:00:00.000Z", updatedAt: `2026-01-0${i + 1}T00:00:00.000Z`, isLocal: true,
})) });
const browser = await chromium.launch();

const FIND = `(() => {
  const g = document.querySelector('.palette-card-grid');
  if (!g) return null;
  let c = g.__vueParentComponent;
  while (c && !(c.type && (c.type.__name === 'PalettesPane' || (c.type.__file||'').endsWith('PalettesPane.vue')))) c = c.parent;
  return c;
})()`;

// ── E3 · cardRefs retention ─────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
    const page = await ctx.newPage();
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, mk(["Alpha", "Beta", "Gamma", "Delta", "Epsilon"])]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const read = () => page.evaluate(`(() => {
      const c = ${FIND};
      return { cards: document.querySelectorAll('[role="article"]').length,
               refKeys: c ? Object.keys(c.setupState.cardRefs).length : 'N/A',
               keys: c ? Object.keys(c.setupState.cardRefs) : [] };
    })()`);
    console.log("=== E3 cardRefs retention (5 stored; filter churn) ===");
    console.log("initial   :", JSON.stringify(await read()));
    for (let r = 1; r <= 5; r++) {
        await page.fill('input[placeholder="Search your palettes..."]', "alpha");
        await page.waitForTimeout(180);
        await page.fill('input[placeholder="Search your palettes..."]', "beta");
        await page.waitForTimeout(180);
        const s = await read();
        console.log(`round ${r}  :`, JSON.stringify({ cards: s.cards, refKeys: s.refKeys }));
    }
    await page.fill('input[placeholder="Search your palettes..."]', "zzzznone");
    await page.waitForTimeout(400);
    console.log("filter->0 :", JSON.stringify(await read()));
    // now DELETE every palette and re-check
    await page.fill('input[placeholder="Search your palettes..."]', "");
    await page.waitForTimeout(300);
    await page.click('[aria-label="Delete all saved palettes"]');
    await page.waitForTimeout(400);
    await page.getByRole("button", { name: /^Delete all$/i }).last().click();
    await page.waitForTimeout(700);
    console.log("after delete-all:", JSON.stringify(await read()));
    await ctx.close();
}

// ── E4 · publish in-flight guard ────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
    const page = await ctx.newPage();
    const reqs = [];
    await page.route(API + "/**", async (route) => {
        const u = new URL(route.request().url());
        reqs.push(route.request().method() + " " + u.pathname);
        if (/session/.test(u.pathname)) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "u", expiresAt: "2099-01-01T00:00:00Z" }) });
        await new Promise((r) => setTimeout(r, 1200));
        return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ name: "Solo", slug: "solo", colors: [], createdAt: "", updatedAt: "", isLocal: false }) });
    });
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, mk(["Solo"])]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    console.log("\n=== E4 publish: menu + in-flight behaviour ===");
    await page.click('[aria-label="Palette menu"]');
    await page.waitForTimeout(400);
    const menu = await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"]')].map((e) => e.textContent.trim()));
    console.log("menu items:", JSON.stringify(menu));
    const clickPublish = async () => {
        const el = page.getByRole("menuitem", { name: /publish/i }).first();
        if (await el.count()) { await el.click(); return true; }
        return false;
    };
    const ok1 = await clickPublish();
    await page.waitForTimeout(150);
    await page.click('[aria-label="Palette menu"]').catch(() => {});
    await page.waitForTimeout(300);
    const ok2 = await clickPublish();
    await page.waitForTimeout(3000);
    console.log("clicked publish twice?", ok1, ok2);
    console.log("API requests:", JSON.stringify(reqs));
    const fb = await page.evaluate(() => document.body.innerText.match(/Published!|Failed to publish[^\n]*/g) || []);
    console.log("on-screen feedback:", JSON.stringify(fb));
    await ctx.close();
}
await browser.close();
