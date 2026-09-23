// dock-mbabb-menu capture — READ-ONLY audit seat (X §0bl). Headed Chromium, real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const URL_ = process.env.URL ?? "http://localhost:9000/";
const repo = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${repo} status --porcelain`).toString().split("\n").filter(Boolean).length;
const log = { url: URL_, sha, dirty, at: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const probe = async (page) => page.evaluate(() => {
  const cs = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    const o = { rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }; for (const p of props) o[p] = s[p]; return o; };
  const menu = document.querySelector('[role="menu"]');
  const items = menu ? [...menu.querySelectorAll('[role="menuitem"]')] : [];
  const seps = menu ? [...menu.querySelectorAll('[role="separator"]')] : [];
  const header = menu?.querySelector('.flex.items-center.gap-2');
  const avatar = header?.querySelector('span,img');
  const trigger = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '@mbabb') ?? document.querySelector('button[aria-label="Menu"]');
  return {
    html: document.documentElement.className,
    trigger: cs(trigger, ["borderRadius","fontSize","fontFamily","color","backgroundColor","paddingLeft","height","textDecorationLine"]),
    triggerCls: trigger?.className,
    triggerExpanded: trigger?.getAttribute("aria-expanded"),
    menu: cs(menu, ["borderRadius","padding","backgroundColor","backdropFilter","boxShadow","minWidth","fontFamily","className"]),
    menuCls: menu?.className,
    items: items.map(i => ({ text: i.textContent.trim(), ...cs(i, ["borderRadius","fontSize","lineHeight","paddingLeft","paddingTop","height","color","backgroundColor","fontFamily","gap"]), highlighted: i.hasAttribute("data-highlighted"), tag: i.tagName })),
    seps: seps.map(s => cs(s, ["marginTop","marginLeft","backgroundColor","height"])),
    header: cs(header, ["paddingLeft","paddingTop"]),
    avatar: cs(avatar, ["borderRadius","width"]),
    headerLink: cs(header?.querySelector('a'), ["fontSize","fontFamily","color"]),
    headerTag: cs(header?.querySelector('p'), ["fontSize","fontFamily","fontStyle","color"]),
    icons: items.map(i => { const svg = i.querySelector('svg'); return svg ? [Math.round(svg.getBoundingClientRect().width), Math.round(svg.getBoundingClientRect().height)] : null; }),
  };
});

for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
  for (const theme of ["light", "dark"]) { if (process.env.ONLY && process.env.ONLY !== `${vp.w}-${theme}`) continue;
    const tag = `${vp.w}-${theme}`;
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"], deviceScaleFactor: vp.w === 390 ? 2 : 1 });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const page = await ctx.newPage();
    const errs = []; page.on("pageerror", e => errs.push(String(e))); page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
    const run = { tag, shots: [], probes: {}, errs };
    try {
      await page.goto(URL_, { waitUntil: "load", timeout: 45000 }); await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
      await sleep(2500);
      const trig = vp.w >= 1024 ? page.getByRole("button", { name: "@mbabb", exact: true }) : page.locator('button[aria-label="Menu"]');
      // dock may have collapsed: nudge pointer to the dock region to expand
      if (!(await trig.isVisible().catch(() => false))) { await page.mouse.move(vp.w / 2, 30); await sleep(800); }
      if (!(await trig.isVisible().catch(() => false))) { await page.mouse.click(vp.w / 2, 30); await sleep(1200); }
      await page.screenshot({ path: `${OUT}${tag}-0-closed.png` }); run.shots.push(`${tag}-0-closed.png`);
      run.probes.closed = await probe(page);
      // hover trigger
      await trig.hover(); await sleep(400);
      const tb = await trig.boundingBox();
      if (tb) { await page.screenshot({ path: `${OUT}${tag}-1-trigger-hover.png`, clip: { x: Math.max(0, tb.x - 260), y: Math.max(0, tb.y - 20), width: Math.min(vp.w - Math.max(0, tb.x - 260), 360), height: tb.height + 40 } }); run.shots.push(`${tag}-1-trigger-hover.png`); }
      run.probes.triggerHover = await probe(page);
      // open
      await trig.click(); await sleep(700);
      await page.screenshot({ path: `${OUT}${tag}-2-open.png` }); run.shots.push(`${tag}-2-open.png`);
      const menu = page.locator('[role="menu"]');
      const mb = await menu.boundingBox();
      const clipOf = (b) => ({ x: Math.max(0, b.x - 24), y: Math.max(0, b.y - 70), width: Math.min(vp.w - Math.max(0, b.x - 24), b.width + 48), height: b.height + 94 });
      if (mb) { await page.screenshot({ path: `${OUT}${tag}-2b-open-zoom.png`, clip: clipOf(mb) }); run.shots.push(`${tag}-2b-open-zoom.png`); }
      run.probes.open = await probe(page);
      // hover share row
      const share = menu.getByRole("menuitem", { name: /Share color/ });
      await share.hover(); await sleep(350);
      if (mb) { await page.screenshot({ path: `${OUT}${tag}-3-hover-share.png`, clip: clipOf(mb) }); run.shots.push(`${tag}-3-hover-share.png`); }
      run.probes.hoverShare = await probe(page);
      // keyboard focus walk
      await page.keyboard.press("ArrowDown"); await sleep(250);
      if (mb) { await page.screenshot({ path: `${OUT}${tag}-4-kbd-focus.png`, clip: clipOf(mb) }); run.shots.push(`${tag}-4-kbd-focus.png`); }
      run.probes.kbd = await probe(page);
      // click share -> Copied!
      await share.click(); await sleep(250);
      const mb2 = await menu.boundingBox().catch(() => null);
      if (mb2) { await page.screenshot({ path: `${OUT}${tag}-5-copied.png`, clip: clipOf(mb2) }); run.shots.push(`${tag}-5-copied.png`); }
      run.probes.copied = await probe(page);
      run.clipboard = await page.evaluate(() => navigator.clipboard.readText().catch(e => "ERR " + e));
      await sleep(2300);
      run.probes.afterReset = await probe(page);
      // dark mode toggle
      const dm = page.locator('[role="menu"]').getByRole("menuitem", { name: /Dark mode/ });
      await dm.click(); await sleep(900);
      await page.screenshot({ path: `${OUT}${tag}-6-toggled.png` }); run.shots.push(`${tag}-6-toggled.png`);
      const mb3 = await page.locator('[role="menu"]').boundingBox().catch(() => null);
      if (mb3) { await page.screenshot({ path: `${OUT}${tag}-6b-toggled-zoom.png`, clip: clipOf(mb3) }); run.shots.push(`${tag}-6b-toggled-zoom.png`); }
      run.probes.toggled = await probe(page);
      // escape closes and focus returns
      await page.keyboard.press("Escape"); await sleep(400);
      run.focusAfterEsc = await page.evaluate(() => { const a = document.activeElement; return a ? `${a.tagName} ${a.getAttribute("aria-label") ?? a.textContent.trim().slice(0, 30)}` : null; });
      run.menuAfterEsc = await page.locator('[role="menu"]').count();
    } catch (e) { run.error = String(e); await page.screenshot({ path: `${OUT}${tag}-ERR.png` }).catch(() => {}); }
    log.runs.push(run);
    await ctx.close();
  }
}
await browser.close();
writeFileSync(`${OUT}capture-log.json`, JSON.stringify(log, null, 2));
console.log("done", sha, dirty, log.runs.map(r => `${r.tag}:${r.shots.length}${r.error ? " ERR " + r.error.slice(0, 200) : ""}`).join(" | "));
