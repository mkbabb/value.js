// dock-mobile-menu capture — READ-ONLY audit seat (X §0bl). Headed Chromium, real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const URL_ = process.env.URL || "http://localhost:9000/";
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();
const log = [];
const note = (m) => { log.push(m); console.log(m); };
note(`tree ${sha} dirty=${dirty} url=${URL_} at ${new Date().toISOString()}`);
const browser = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
const VPS = [{ n: "390", w: 390, h: 844, mobile: true }, { n: "1440", w: 1440, h: 900, mobile: false }];
async function measure(page) {
  return page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    if (!menu) return null;
    const cs = getComputedStyle(menu);
    const r = menu.getBoundingClientRect();
    const items = [...menu.querySelectorAll('[role="menuitem"], [data-identity-verdict], .slug-pill, [role="separator"]')].map((el) => {
      const s = getComputedStyle(el), b = el.getBoundingClientRect();
      return { tag: el.tagName, role: el.getAttribute("role"), cls: (el.className?.baseVal ?? el.className).slice(0, 80), text: el.textContent.trim().slice(0, 50), h: Math.round(b.height), w: Math.round(b.width), radius: s.borderRadius, font: `${s.fontFamily.split(",")[0]} ${s.fontSize}/${s.fontWeight}`, color: s.color, bg: s.backgroundColor, border: `${s.borderWidth} ${s.borderColor}` };
    });
    const trig = document.querySelector('[aria-label="Menu"]');
    const tb = trig?.getBoundingClientRect();
    return { menu: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, backdrop: cs.backdropFilter, shadow: cs.boxShadow.slice(0, 80), cls: menu.className.slice(0, 200), pad: cs.padding }, trigger: tb && { x: Math.round(tb.x), y: Math.round(tb.y), w: Math.round(tb.width), h: Math.round(tb.height), radius: getComputedStyle(trig).borderRadius }, items };
  });
}
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
for (const theme of ["light", "dark"]) for (const vp of VPS) for (const auth of ["out", "in"]) {
  if (ONLY && !ONLY.includes(`${theme}-${vp.n}-${auth}`)) continue;
  try {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2, isMobile: vp.mobile, hasTouch: vp.mobile, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript(([t, a]) => {
    try {
      localStorage.setItem("vueuse-color-scheme", t);
      if (a === "in") localStorage.setItem("palette-user-slug", "vivid-heron-42");
      else localStorage.removeItem("palette-user-slug");
    } catch {}
  }, [theme, auth]);
  const page = await ctx.newPage();
  const errs = []; page.on("pageerror", (e) => errs.push(String(e))); page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
  const tag = `${theme}-${vp.n}-${auth}`;
  try {
    await page.goto(URL_, { waitUntil: "load", timeout: 60000 });
  } catch (e) { note(`${tag} goto: ${e.message.split("\n")[0]}`); }
  await page.waitForTimeout(2500);
  const slugNow = await page.evaluate(() => localStorage.getItem("palette-user-slug"));
  note(`${tag} slug-after-boot=${slugNow}`);
  await page.screenshot({ path: `${OUT}${tag}-0-closed.png` });
  const trig = page.locator('[aria-label="Menu"]').first();
  const vis = await trig.isVisible().catch(() => false);
  note(`${tag} menu-trigger-visible=${vis}`);
  if (!vis) {
    // desktop twin: the @mbabb profile trigger (MobileMenu is lg:hidden) — capture the equivalent surface.
    const prof = page.locator('button:has-text("@mbabb"), [aria-label*="profile" i], [aria-label*="account" i]').first();
    if (await prof.isVisible().catch(() => false)) { await prof.click(); await page.waitForTimeout(700); await page.screenshot({ path: `${OUT}${tag}-1-desktop-twin-open.png` }); note(`${tag} desktop-twin ${JSON.stringify(await measure(page))}`); }
    else note(`${tag} no desktop twin trigger found`);
    note(`${tag} errors=${JSON.stringify(errs.slice(0, 5))}`);
    await ctx.close(); continue;
  }
  await trig.click(); await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}${tag}-1-open.png` });
  note(`${tag} open ${JSON.stringify(await measure(page))}`);
  // hover + keyboard focus states
  const first = page.locator('[role="menu"] [role="menuitem"]').first();
  await first.hover().catch(() => {}); await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}${tag}-2-hover-first.png` });
  await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}${tag}-3-keyfocus.png` });
  // link copied (Share color)
  const shareIdx = await page.$$eval('[role="menu"] [role="menuitem"]', (els) => els.findIndex((e) => /Share/.test(e.textContent)));
  const share = page.locator('[role="menu"] [role="menuitem"]').nth(Math.max(shareIdx, 0));
  if (await share.isVisible().catch(() => false)) {
    await ctx.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});
    await share.click(); await page.waitForTimeout(120);
    const stillOpen = await page.locator('[role="menu"]').isVisible().catch(() => false);
    const txt = await share.textContent({ timeout: 500 }).catch(() => "");
    note(`${tag} share: menuStillOpen=${stillOpen} rowText=${JSON.stringify(txt?.trim())}`);
    await page.screenshot({ path: `${OUT}${tag}-4-link-copied.png` });
  }
  if (auth === "in") {
    const copy = page.locator('[role="menu"] [role="menuitem"]:has-text("Copy slug")').first();
    if (await copy.isVisible().catch(() => false)) {
      await copy.click(); await page.waitForTimeout(300);
      note(`${tag} copySlug: menuOpen=${await page.locator('[role="menu"]').isVisible().catch(() => false)} rowText=${JSON.stringify((await copy.textContent().catch(() => ""))?.trim())}`);
      await page.screenshot({ path: `${OUT}${tag}-5-copy-slug.png` });
    }
    // identity verdict via Regenerate (dev api; writes a throwaway user to the local dev DB)
    if (theme === "light") {
      const regen = page.locator('[role="menu"] [role="menuitem"]:has-text("Regenerate")').first();
      if (await regen.isVisible().catch(() => false)) {
        await regen.click(); await page.waitForTimeout(80);
        await page.screenshot({ path: `${OUT}${tag}-6-regen-pending.png` });
        await page.waitForTimeout(2500);
        const v = await page.locator("[data-identity-verdict]").textContent().catch(() => null);
        note(`${tag} regen verdict=${JSON.stringify(v)} slugNow=${await page.evaluate(() => localStorage.getItem("palette-user-slug"))}`);
        note(`${tag} after-regen ${JSON.stringify(await measure(page))}`);
        await page.screenshot({ path: `${OUT}${tag}-7-identity-verdict.png` });
      }
    }
    // Switch account → where does it go?
    const sw = page.locator('[role="menu"] [role="menuitem"]:has-text("Switch account")').first();
    if (await sw.isVisible().catch(() => false)) {
      await sw.click(); await page.waitForTimeout(800);
      await page.screenshot({ path: `${OUT}${tag}-8-switch-account.png` });
      note(`${tag} after switch: focused=${await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 200))}`);
    }
  } else {
    // Login → where does it go?
    await page.keyboard.press("Escape"); await page.waitForTimeout(300);
    await trig.click(); await page.waitForTimeout(600);
    const login = page.locator('[role="menu"] [role="menuitem"]:has-text("Login")').first();
    if (await login.isVisible().catch(() => false)) {
      await login.click(); await page.waitForTimeout(800);
      await page.screenshot({ path: `${OUT}${tag}-8-login-clicked.png` });
      note(`${tag} after login: focused=${await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 200))}`);
    } else note(`${tag} NO Login item`);
  }
  note(`${tag} errors=${JSON.stringify(errs.slice(0, 5))}`);
  await ctx.close();
  } catch (e) { note(`${theme}-${vp.n}-${auth} FAILED ${e.message.split("\n")[0]}`); }
}
await browser.close();
writeFileSync(`${OUT}capture-log${process.env.ONLY ? "-" + process.env.ONLY.replace(/,/g, "_") : ""}.txt`, log.join("\n") + "\n");
