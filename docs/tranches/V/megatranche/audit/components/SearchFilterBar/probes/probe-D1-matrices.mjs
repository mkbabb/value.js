// CHALLENGE-D · SearchFilterBar — live read-only probe.
// Opens the ⋮ Filters popover on /#/browse and measures it across matrices.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/sfb";
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9000";

const TAGS = [
  { name: "pastel" }, { name: "neon" }, { name: "earth" }, { name: "monochrome" },
  { name: "retro" }, { name: "vaporwave" }, { name: "high-contrast-accessible-set" },
];

const MATRIX = [
  { id: "desktop-light", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
  { id: "desktop-dark",  ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
  { id: "mobile-light",  ctx: { ...devices["iPhone 14"] } },
  { id: "forced-colors", ctx: { viewport: { width: 1440, height: 900 }, forcedColors: "active" } },
  { id: "reduced-motion",ctx: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" } },
  { id: "zoom-200",      ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 } },
  { id: "rtl-desktop",   ctx: { viewport: { width: 1440, height: 900 } }, rtl: true },
];

const rows = [];
const browser = await webkit.launch();

for (const m of MATRIX) {
  const context = await browser.newContext(m.ctx);
  // Neuter the dev-misconfig latch so /colors/tags actually fires, then stub it.
  await context.route("**/platform/transport/availability.ts*", async (route) => {
    const res = await route.fetch();
    let body = await res.text();
    body = body.replace(
      /function assertApiAttemptAllowed\(\)\s*\{/,
      "function assertApiAttemptAllowed() { return;"
    );
    await route.fulfill({ response: res, body, headers: { ...res.headers(), "content-type": "text/javascript" } });
  });
  await context.route("https://api.color.babb.dev/**", async (route) => {
    const url = route.request().url();
    const cors = {
      "access-control-allow-origin": ORIGIN,
      "access-control-allow-credentials": "true",
      "access-control-allow-headers": "*",
      "access-control-allow-methods": "*",
      "content-type": "application/json",
    };
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors, body: "" });
    if (url.includes("/colors/tags")) return route.fulfill({ status: 200, headers: cors, body: JSON.stringify(TAGS) });
    return route.fulfill({ status: 200, headers: cors, body: JSON.stringify([]) });
  });

  const page = await context.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (c) => { if (c.type() === "error") errs.push("console:" + c.text().slice(0, 160)); });
  await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 }).catch(e => errs.push("nav:" + e));
  await page.waitForTimeout(2500);
  if (m.rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(800); }

  const trig = page.locator('button[aria-label="Filters"]');
  const trigBox = await trig.boundingBox().catch(() => null);
  await trig.click({ timeout: 8000 }).catch(e => errs.push("click:" + String(e).slice(0, 120)));
  await page.waitForTimeout(1200);

  await page.screenshot({ path: `${OUT}/${m.id}-popover.png`, fullPage: false });

  const measured = await page.evaluate(() => {
    const q = (s, r = document) => r.querySelector(s);
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const content = qa('[data-radix-popper-content-wrapper],[data-reka-popper-content-wrapper]')
      .map(w => w.firstElementChild).filter(Boolean).pop()
      || qa('[role="dialog"]').pop();
    if (!content) return { found: false, html: document.body.innerHTML.length };
    const r = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const cs = (el, ...p) => { const s = getComputedStyle(el); return Object.fromEntries(p.map(k => [k, s.getPropertyValue(k)])); };
    const sections = qa(".filter-section", content).map(s => ({
      label: q(".section-label", s)?.textContent?.trim() ?? null,
      rect: r(s),
      labelStyle: q(".section-label", s) ? cs(q(".section-label", s), "font-family", "font-size", "font-weight", "line-height", "color", "text-transform", "letter-spacing") : null,
    }));
    const opts = qa(".filter-option", content).map(o => {
      const kids = [...o.children].map(k => ({ tag: k.tagName.toLowerCase(), rect: r(k), role: k.getAttribute("role") }));
      const txt = o.querySelector("span");
      return { text: o.textContent.trim(), rect: r(o), textX: txt ? +txt.getBoundingClientRect().x.toFixed(1) : null, kids };
    });
    const dividerHost = q(".divide-y", content);
    const dividers = dividerHost ? [...dividerHost.children].slice(1).map(c => getComputedStyle(c).borderTopWidth) : [];
    const swatch = qa("button", content).find(b => (b.getAttribute("aria-label") || "").startsWith("Open color picker"));
    const input = q("input", content);
    const searchBtn = qa("button", content).find(b => b.textContent.trim() === "Search");
    const clearBtn = qa("button", content).find(b => b.textContent.trim().includes("Clear all"));
    const tagScroll = q(".max-h-28", content);
    const checkboxes = qa('[role="checkbox"]', content).map(c => ({ rect: r(c), state: c.getAttribute("aria-checked"), attrs: [...c.attributes].map(a => a.name) }));
    return {
      found: true,
      content: { rect: r(content), style: cs(content, "background-color", "border-color", "border-width", "box-shadow", "border-radius", "padding", "animation-name", "animation-duration", "transition-property", "transition-duration", "z-index", "overflow") },
      sections, opts, dividers,
      dividerColor: dividerHost ? getComputedStyle(dividerHost.children[1] ?? dividerHost).borderTopColor : null,
      swatch: swatch ? { rect: r(swatch), style: cs(swatch, "box-shadow", "outline-width", "outline-color", "border-color", "border-width", "transition-property", "transition-duration"), label: swatch.getAttribute("aria-label"), cls: swatch.className } : null,
      input: input ? { rect: r(input), style: cs(input, "font-family", "font-size", "padding-inline-end", "padding-inline-start", "text-overflow", "background-color", "color"), placeholder: input.placeholder, label: input.getAttribute("aria-label") } : null,
      searchBtn: searchBtn ? { rect: r(searchBtn), style: cs(searchBtn, "font-size", "background-color", "color", "border-radius", "transition-property"), disabled: searchBtn.disabled } : null,
      clearBtn: clearBtn ? { rect: r(clearBtn), text: clearBtn.textContent.trim() } : null,
      tagScroll: tagScroll ? { rect: r(tagScroll), scrollH: tagScroll.scrollHeight, clientH: tagScroll.clientHeight, style: cs(tagScroll, "max-height", "overflow-y", "scrollbar-width", "mask-image") } : null,
      checkboxes,
      radios: qa('[role="radio"]', content).map(x => ({ rect: r(x), checked: x.getAttribute("aria-checked") })),
      contentDir: getComputedStyle(content).direction,
      overflowY: document.documentElement.scrollHeight - document.documentElement.clientHeight,
      offscreen: r(content).y + r(content).h > innerHeight || r(content).x < 0 || r(content).x + r(content).w > innerWidth,
      innerW: innerWidth, innerH: innerHeight,
    };
  });

  rows.push({ matrix: m.id, trigBox, errs, ...measured });
  await context.close();
}

await browser.close();
writeFileSync(`${OUT}/measure.json`, JSON.stringify(rows, null, 1));
console.log(JSON.stringify(rows.map(r => ({ m: r.matrix, found: r.found, sections: r.sections?.length, opts: r.opts?.length, cbs: r.checkboxes?.length, errs: r.errs.slice(0, 3) })), null, 1));
