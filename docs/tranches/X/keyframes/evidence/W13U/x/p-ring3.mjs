// SERVED MODEL: claude-opus-5-5
import { withPage } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const r = await withPage({ distDir: "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages", label: "probe", context: { viewport: { width: 1440, height: 900 } } }, async (page, { url }) => {
  await page.goto(`${url}/#/cube`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  for (let n = 0; n < 60; n++) { await page.keyboard.press("Tab"); const l = await page.evaluate(() => document.activeElement?.getAttribute("aria-label")); if (/^(Play|Pause) animation$/.test(l || "")) break; }
  const out = {};
  for (const e of ["quiet", "primary", "secondary", "text", "tertiary", null]) out[String(e)] = await page.evaluate((e) => { const el = document.activeElement; if (e === null) el.removeAttribute("data-emphasis"); else el.setAttribute("data-emphasis", e); return getComputedStyle(el).boxShadow.slice(0, 80); }, e);
  // other focus-ring buttons in the page: count focusable glass buttons whose focus ring paints
  out.others = await page.evaluate(() => [...document.querySelectorAll("button.focus-ring")].slice(0, 30).map((b) => { b.focus({ focusVisible: true }); const cs = getComputedStyle(b); return (b.getAttribute("aria-label") || b.textContent.trim().slice(0, 12)) + ":" + b.dataset.emphasis + ":" + b.matches(":focus-visible") + ":" + (cs.boxShadow !== "none" ? "RING" : "none"); }));
  return out;
});
console.log(JSON.stringify(r, null, 1).slice(0, 5000));
