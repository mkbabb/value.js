// CHALLENGE-D pass 5 — probe 5: is the dock collapse CAUSED by SearchFilterBar?
// Control arms: (a) no interaction, (b) click blank pane, (c) click the search
// input, (d) click the Filters trigger, (e) open the sibling PaletteCardMenu.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(
    "docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence-p5",
);
fs.mkdirSync(OUT, { recursive: true });

const HEX = ["#4488cc", "#cc8844", "#44cc88", "#cc4488", "#8844cc"];
const pal = (i) => ({
    _id: `id${i}`, id: `id${i}`, slug: `palette-${i}`, name: `Palette ${i}`,
    colors: HEX, visibility: "public", tier: "standard", tags: [],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    attribution: "principal", userSlug: "mbabb", owner: { slug: "mbabb" },
    votes: 1, voteCount: 1, forkCount: 0, version: 1,
});
async function stub(ctx) {
    await ctx.route(/\/colors\/tags/, (r) => r.fulfill({ status: 200, contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        body: JSON.stringify([{ name: "pastel", count: 3 }, { name: "neon", count: 2 }]) }));
    await ctx.route(/:3000\/palettes/, (r) => r.fulfill({ status: 200, contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        body: JSON.stringify({ data: Array.from({ length: 6 }, (_, i) => pal(i)), nextCursor: null, hasMore: false }) }));
}

const DOCKTEXT = `(() => {
  const d=document.querySelector('[class*="dock"]');
  const r=d?d.getBoundingClientRect():null;
  return { text:(d?d.innerText:'').replace(/\\n/g,'|').trim(),
    rect:r?{w:+r.width.toFixed(1),h:+r.height.toFixed(1)}:null,
    innerHTMLLen: d?d.innerHTML.length:0,
    expandedAttr: (()=>{const e=document.querySelector('[data-dock-expanded],[data-expanded]');
      return e?e.getAttribute('data-dock-expanded')||e.getAttribute('data-expanded'):null;})() };
})()`;

async function arm(name, act) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await stub(ctx);
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 120)));
    page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 120)));
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    const before = await page.evaluate(DOCKTEXT);
    await act(page);
    await page.waitForTimeout(1200);
    const after = await page.evaluate(DOCKTEXT);
    await page.mouse.move(700, 500);
    await page.waitForTimeout(1200);
    const settled = await page.evaluate(DOCKTEXT);
    await page.screenshot({ path: path.join(OUT, `p5-5-${name}.png`), clip: { x: 400, y: 0, width: 640, height: 110 } });
    await browser.close();
    return { name, before, after, settled, errs: [...new Set(errs)].slice(0, 6) };
}

const R = [];
R.push(await arm("a-no-interaction", async () => {}));
R.push(await arm("b-click-blank-pane", async (p) => { await p.mouse.click(400, 700); }));
R.push(await arm("c-click-search-input", async (p) => {
    await p.locator(".search-seated input").first().click();
}));
R.push(await arm("d-click-filters-trigger", async (p) => {
    await p.locator('button[aria-label="Filters"]').first().click();
}));
R.push(await arm("e-filters-open-then-escape", async (p) => {
    await p.locator('button[aria-label="Filters"]').first().click();
    await p.waitForTimeout(600);
    await p.keyboard.press("Escape");
}));
R.push(await arm("f-palette-card-menu", async (p) => {
    const m = p.locator('[role="article"] button').last();
    if (await m.count()) await m.click({ force: true });
}));
R.push(await arm("g-hover-dock-then-filters", async (p) => {
    await p.mouse.move(720, 44);
    await p.waitForTimeout(400);
    await p.locator('button[aria-label="Filters"]').first().click();
}));

fs.writeFileSync(path.join(OUT, "p5-5.json"), JSON.stringify(R, null, 2));
for (const r of R) {
    console.log(
        r.name.padEnd(28),
        "| before:", JSON.stringify(r.before.text).slice(0, 44).padEnd(46),
        "| settled:", JSON.stringify(r.settled.text).slice(0, 44).padEnd(46),
        "| htmlLen", r.before.innerHTMLLen, "->", r.settled.innerHTMLLen,
        "| errs", r.errs.length,
    );
}
