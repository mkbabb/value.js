// CHALLENGE-D pass 5 — probe 7: unbroken-long-tag state, control/row geometry.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(
    "docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence-p5",
);
const TAGS = [
    { name: "pastel", count: 4 },
    { name: "supercalifragilisticexpialidocious", count: 1 }, // no break opportunity
    { name: "neon", count: 2 },
];
const pal = (i) => ({ _id: `id${i}`, id: `id${i}`, slug: `p-${i}`, name: `Palette ${i}`,
    colors: ["#4488cc", "#cc8844"], visibility: "public", tier: "standard", tags: [],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    attribution: "principal", userSlug: "mbabb", owner: { slug: "mbabb" },
    votes: 1, voteCount: 1, forkCount: 0, version: 1 });

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await ctx.route(/\/colors\/tags/, (r) => r.fulfill({ status: 200, contentType: "application/json",
    headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(TAGS) }));
await ctx.route(/:3000\/palettes/, (r) => r.fulfill({ status: 200, contentType: "application/json",
    headers: { "access-control-allow-origin": "*" },
    body: JSON.stringify({ data: Array.from({ length: 4 }, (_, i) => pal(i)), nextCursor: null, hasMore: false }) }));
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await p.waitForTimeout(1600);
await p.locator('button[aria-label="Filters"]').first().click();
await p.waitForTimeout(700);

const R = await p.evaluate(`(() => {
  const pop=document.querySelector('[role="dialog"][data-state="open"]');
  const g=e=>{const r=e.getBoundingClientRect();
    return {x:+r.x.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2),right:+r.right.toFixed(2)};};
  const scroller=pop.querySelector('.max-h-28');
  const rows=[...pop.querySelectorAll('.filter-option')];
  const radios=[...pop.querySelectorAll('[role="radio"]')];
  const checks=[...pop.querySelectorAll('[role="checkbox"]')];
  const pr=g(pop);
  return {
    popover: pr,
    popoverOverflow: getComputedStyle(pop).overflow,
    scroller: scroller? {...g(scroller), scrollW:scroller.scrollWidth, clientW:scroller.clientWidth,
      scrollH:scroller.scrollHeight, clientH:scroller.clientHeight,
      overflowX:getComputedStyle(scroller).overflowX, overflowY:getComputedStyle(scroller).overflowY,
      horizontalOverflowPx:+(scroller.scrollWidth-scroller.clientWidth).toFixed(2)}:null,
    tagRows: rows.slice(5).map(r=>({t:r.textContent.trim().slice(0,40), ...g(r),
      spanScrollW:(r.querySelector('span')||{}).scrollWidth,
      spanClientW:(r.querySelector('span')||{}).clientWidth,
      escapesPopover:+(g(r).right-pr.right).toFixed(2)})),
    controlVsRow: {
      radioBox: g(radios[0]), radioRow: g(rows[0]),
      radioOverflowsRowBy:+((g(radios[0]).h-g(rows[0]).h)/2).toFixed(2),
      checkboxBox: g(checks[0]), checkboxRow: g(rows[5]),
      radioAreaOverCheckboxArea:+((g(radios[0]).w*g(radios[0]).h)/(g(checks[0]).w*g(checks[0]).h)).toFixed(2),
      hoverTargetWidths: rows.map(r=>+g(r).w.toFixed(2)),
      widestOverNarrowest:+(Math.max(...rows.map(r=>g(r).w))/Math.min(...rows.map(r=>g(r).w))).toFixed(3),
    },
    docOverflowX: document.documentElement.scrollWidth>document.documentElement.clientWidth,
  };
})()`);

await p.screenshot({ path: path.join(OUT, "p5-7-longtag-open.png") });
const sc = await p.locator('[role="dialog"][data-state="open"] .max-h-28').first().boundingBox();
if (sc) await p.screenshot({ path: path.join(OUT, "p5-7-longtag-scroller.png"),
    clip: { x: sc.x - 10, y: sc.y - 10, width: sc.width + 30, height: sc.height + 20 } });
await b.close();
fs.writeFileSync(path.join(OUT, "p5-7.json"), JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
