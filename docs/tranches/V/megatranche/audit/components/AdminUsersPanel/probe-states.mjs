// CHALLENGE-D · AdminUsersPanel — the uncaptured states.
// The mega-tranche matrices captured forced-colors / keyboard-focus / rtl /
// zoom-200 for this route ONLY in the no-token state (zero rows), so the row
// focus ring, the forced-colors row treatment and the RTL row anatomy have
// never been observed. This probe captures them on a POPULATED roster.
//
// READ-ONLY. Writes ONLY under this component's audit directory.

import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const FRAMES = resolve(HERE, "frames");
const ORIGIN = "http://localhost:9000";

const USERS = [
  { slug: "aurora-drifting-lantern-4471", createdAt: "2026-07-01T10:00:00Z", status: "active", paletteCount: 12 },
  { slug: "empty-ghost-quiet-meadow-33", createdAt: "2026-06-02T10:00:00Z", status: "active", paletteCount: 0 },
  { slug: "empty-ghost-quiet-meadow-77", createdAt: "2026-06-03T10:00:00Z", status: "suspended", paletteCount: 0 },
];

const init = `try{
  localStorage.setItem('vueuse-color-scheme','light');
  localStorage.setItem('palette-admin-token','PROBE-FAKE-ADMIN-TOKEN');
  document.documentElement.classList.remove('dark');
}catch(e){}`;

async function mount(browser, opts) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light", ...opts });
  await context.addInitScript(init);
  await context.route("**/admin/users?**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: 3, limit: 50, offset: 0 }) }));
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3400);
  return { context, page };
}

const out = {};
const browser = await webkit.launch();

// ---- keyboard focus on a real row ------------------------------------------
{
  const { context, page } = await mount(browser, {});
  await page.evaluate(() => document.querySelector('[role="button"][aria-expanded]')?.focus());
  await page.waitForTimeout(400);
  await page.screenshot({ path: resolve(FRAMES, "H-desktop-light-row-focused.png") });
  out.rowFocus = await page.evaluate(() => {
    const r = document.querySelector('[role="button"][aria-expanded]');
    const cs = getComputedStyle(r);
    return {
      isActive: document.activeElement === r,
      outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor,
      boxShadow: cs.boxShadow, background: cs.backgroundColor,
      classList: r.className,
    };
  });
  await context.close();
}

// ---- forced colors, focused row --------------------------------------------
{
  const { context, page } = await mount(browser, { forcedColors: "active" });
  await page.evaluate(() => document.querySelector('[role="button"][aria-expanded]')?.focus());
  await page.waitForTimeout(500);
  await page.screenshot({ path: resolve(FRAMES, "I-forced-colors-populated-focused.png") });
  out.forcedColors = await page.evaluate(() => {
    const r = document.querySelector('[role="button"][aria-expanded]');
    const cs = getComputedStyle(r);
    const pill = document.querySelector("main .slug-pill");
    const pcs = pill ? getComputedStyle(pill) : null;
    return {
      forced: matchMedia("(forced-colors: active)").matches,
      rowOutline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
      rowBoxShadow: cs.boxShadow,
      rowBg: cs.backgroundColor,
      pillColor: pcs?.color, pillBorder: pcs?.borderColor,
      // does any focus signal survive?
      anyFocusSignal: cs.outlineStyle !== "none" || (cs.boxShadow && cs.boxShadow !== "none"),
    };
  });
  await context.close();
}

// ---- RTL, populated ---------------------------------------------------------
{
  const { context, page } = await mount(browser, {});
  await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: resolve(FRAMES, "J-rtl-populated.png") });
  out.rtl = await page.evaluate(() => {
    const qa = (s) => [...document.querySelectorAll(s)];
    const box = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), w: +b.width.toFixed(1) }; };
    const r = document.querySelector('[role="button"][aria-expanded]');
    const pill = document.querySelector("main .slug-pill");
    return {
      dir: document.documentElement.dir,
      rowBox: r ? box(r) : null,
      pillBox: pill ? box(pill) : null,
      pillText: pill?.textContent?.trim(),
      // is the slug LTR-isolated per VISUAL-CONSTITUTION 6.1?
      pillDirAttr: pill?.getAttribute("dir"),
      pillUnicodeBidi: pill ? getComputedStyle(pill).unicodeBidi : null,
      pillDirection: pill ? getComputedStyle(pill).direction : null,
      actionBoxes: qa('[role="button"][aria-expanded] button').map((b) => ({ l: b.getAttribute("aria-label") || b.textContent.trim(), ...box(b) })),
      docScrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
    };
  });
  await context.close();
}

await browser.close();
writeFileSync(resolve(HERE, "probe-states.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
