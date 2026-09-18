// CHALLENGE-D · SearchFilterBar — probe 2. Tall viewport so the whole popover fits:
// measures the Find-by-Color row, LTR vs RTL, checkbox-vs-radio shape, focus, tag toggle,
// the searching state, and reduced-motion.
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/sfb";
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9000";
const TAGS = [{ name: "pastel" }, { name: "neon" }, { name: "earth" }, { name: "monochrome" }, { name: "retro" }, { name: "vaporwave" }, { name: "high-contrast-accessible-set" }];

const CASES = [
  { id: "tall-ltr", vp: { width: 1440, height: 1400 } },
  { id: "tall-rtl", vp: { width: 1440, height: 1400 }, rtl: true },
  { id: "tall-reduced", vp: { width: 1440, height: 1400 }, reduced: true },
];

const rows = [];
const browser = await webkit.launch();

for (const c of CASES) {
  const context = await browser.newContext({ viewport: c.vp, ...(c.reduced ? { reducedMotion: "reduce" } : {}) });
  await context.route("**/platform/transport/availability.ts*", async (route) => {
    const res = await route.fetch();
    let body = (await res.text()).replace(/function assertApiAttemptAllowed\(\)\s*\{/, "function assertApiAttemptAllowed() { return;");
    await route.fulfill({ response: res, body, headers: { ...res.headers(), "content-type": "text/javascript" } });
  });
  await context.route("https://api.color.babb.dev/**", async (route) => {
    const cors = { "access-control-allow-origin": ORIGIN, "access-control-allow-credentials": "true", "access-control-allow-headers": "*", "access-control-allow-methods": "*", "content-type": "application/json" };
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors, body: "" });
    if (route.request().url().includes("/colors/tags")) return route.fulfill({ status: 200, headers: cors, body: JSON.stringify(TAGS) });
    return route.fulfill({ status: 200, headers: cors, body: JSON.stringify([]) });
  });

  const page = await context.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 }).catch(e => errs.push("nav" + e));
  await page.waitForTimeout(2500);
  if (c.rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(800); }
  await page.locator('button[aria-label="Filters"]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/${c.id}-full.png` });

  const m = await page.evaluate(() => {
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const content = qa('[data-reka-popper-content-wrapper],[data-radix-popper-content-wrapper]').map(w => w.firstElementChild).filter(Boolean).pop() || qa('[role="dialog"]').pop();
    const r = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), right: +b.right.toFixed(1) }; };
    const S = (el, ...p) => { const s = getComputedStyle(el); return Object.fromEntries(p.map(k => [k, s.getPropertyValue(k)])); };
    const labelOf = (o) => [...o.children].find(k => k.tagName === "SPAN");
    const opts = qa(".filter-option", content).map(o => {
      const l = labelOf(o);
      return { text: o.textContent.trim().slice(0, 24), row: r(o), labelRect: l ? r(l) : null, labelStyle: l ? S(l, "font-family", "font-size", "line-height", "color") : null, dir: getComputedStyle(o).direction, kids: [...o.children].map(k => ({ t: k.tagName, r: r(k) })) };
    });
    const radios = qa('[role="radio"]', content).map(x => ({ r: r(x), br: getComputedStyle(x).borderRadius, dir: getComputedStyle(x).direction, parentDirAttr: x.closest("[dir]")?.getAttribute("dir") ?? null }));
    const cbs = qa('[role="checkbox"]', content).map(x => ({ r: r(x), br: getComputedStyle(x).borderRadius, w: getComputedStyle(x).width, h: getComputedStyle(x).height }));
    const swatch = qa("button", content).find(b => (b.getAttribute("aria-label") || "").startsWith("Open color picker"));
    const input = content.querySelector("input");
    const searchBtn = qa("button", content).find(b => b.textContent.trim() === "Search");
    const clearBtn = qa("button", content).find(b => b.textContent.trim().includes("Clear all"));
    const sections = qa(".filter-section", content).map(s => ({ label: s.querySelector(".section-label")?.textContent.trim(), r: r(s), borderTop: getComputedStyle(s).borderTopWidth + " " + getComputedStyle(s).borderTopColor, textAlign: getComputedStyle(s.querySelector(".section-label")).textAlign }));
    return {
      contentRect: r(content), contentStyle: S(content, "background-color", "backdrop-filter", "-webkit-backdrop-filter", "max-height", "overflow", "transition-duration", "animation-name"),
      sections, opts, radios, cbs,
      swatch: swatch ? { r: r(swatch), style: S(swatch, "outline-style", "outline-width", "outline-color", "outline-offset", "box-shadow") } : null,
      input: input ? { r: r(input), style: S(input, "padding-inline-start", "padding-inline-end", "padding-left", "padding-right", "direction", "font-size", "font-family"), scrollW: input.scrollWidth, clientW: input.clientWidth, placeholder: input.placeholder } : null,
      searchBtn: searchBtn ? { r: r(searchBtn), style: S(searchBtn, "font-size", "inset-inline-end", "right", "left", "position") } : null,
      clearBtn: clearBtn ? { r: r(clearBtn), text: clearBtn.textContent.trim() } : null,
      badge: (() => { const b = document.querySelector('button[aria-label="Filters"] span'); return b ? { r: r(b), style: S(b, "font-size", "background-color", "color") } : null; })(),
      trigger: (() => { const t = document.querySelector('button[aria-label="Filters"]'); return { r: r(t), style: S(t, "height", "width", "min-height", "border-radius"), ariaExpanded: t.getAttribute("aria-expanded") }; })(),
      docDir: document.documentElement.getAttribute("dir"),
      tokens: S(document.documentElement, "--duration-fast", "--font-serif", "--type-small", "--type-micro", "--animation-slide-sm", "--animation-slide-md"),
    };
  });

  // Interaction: toggle a tag checkbox and see whether anything changes.
  const cbBefore = await page.evaluate(() => [...document.querySelectorAll('[role="checkbox"]')].map(c => c.getAttribute("aria-checked")));
  await page.locator('[role="checkbox"]').first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(600);
  const cbAfter = await page.evaluate(() => [...document.querySelectorAll('[role="checkbox"]')].map(c => c.getAttribute("aria-checked")));
  const badgeAfter = await page.evaluate(() => document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null);

  // Focus the swatch: is there any visible focus affordance?
  const focusProbe = await page.evaluate(() => {
    const sw = [...document.querySelectorAll("button")].find(b => (b.getAttribute("aria-label") || "").startsWith("Open color picker"));
    if (!sw) return null;
    sw.focus();
    const s = getComputedStyle(sw);
    return { outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`, boxShadow: s.boxShadow.slice(0, 200), matchesFV: sw.matches(":focus-visible") };
  });

  // Search click: does the `searching` spinner ever paint?
  const searchProbe = await page.evaluate(async () => {
    const btn = [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Search");
    if (!btn) return null;
    let sawSpinner = false;
    const obs = new MutationObserver(() => { if (btn.querySelector("svg")) sawSpinner = true; });
    obs.observe(btn, { childList: true, subtree: true, attributes: true });
    btn.click();
    await new Promise(r => setTimeout(r, 400));
    obs.disconnect();
    return { sawSpinner, htmlAfter: btn.innerHTML.slice(0, 80), disabled: btn.disabled };
  });

  rows.push({ id: c.id, errs, ...m, cbBefore, cbAfter, badgeAfter, focusProbe, searchProbe });
  await context.close();
}
await browser.close();
writeFileSync(`${OUT}/measure2.json`, JSON.stringify(rows, null, 1));
console.log("done");
