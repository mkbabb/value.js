// CHALLENGE-D probe — SearchFilterBar.vue (demo/palettes/browser/search/SearchFilterBar.vue)
// Read-only. Drives the LIVE dev server at :9000. WebKit (Safari engine) to match the
// mega-tranche visual matrix.
//
//   node docs/tranches/V/megatranche/audit/components/SearchFilterBar/probe.mjs
//
import { webkit, devices } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = "http://localhost:9000";

const rect = (el) => {
  const b = el.getBoundingClientRect();
  return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
};

const MATRIX = [
  { id: "desktop-light", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
  { id: "desktop-dark", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
  { id: "mobile-light", ctx: { ...devices["iPhone 14"] } },
  { id: "zoom-200", ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 } },
];

const browser = await webkit.launch();
const out = {};

for (const m of MATRIX) {
  const context = await browser.newContext(m.ctx);
  const page = await context.newPage();
  const console_ = [];
  page.on("console", (c) => c.type() === "error" && console_.push(c.text().slice(0, 160)));
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2500);

  // --- closed state: the trigger ------------------------------------------------
  const closed = await page.evaluate(() => {
    const t = document.querySelector('button[aria-label="Filters"]');
    if (!t) return { missing: true };
    const b = t.getBoundingClientRect();
    const cs = getComputedStyle(t);
    const glyph = t.querySelector("svg");
    const gb = glyph?.getBoundingClientRect();
    // the SearchBar pill that hosts it
    const pill = t.closest("[class*=search], form, div");
    return {
      trigger: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
      ariaExpanded: t.getAttribute("aria-expanded"),
      ariaHaspopup: t.getAttribute("aria-haspopup"),
      ariaControls: t.getAttribute("aria-controls"),
      role: t.getAttribute("role"),
      glyphAriaHidden: glyph?.getAttribute("aria-hidden") ?? null,
      glyph: gb ? { w: +gb.width.toFixed(1), h: +gb.height.toFixed(1) } : null,
      color: cs.color,
      bg: cs.backgroundColor,
      cls: t.className,
      badge: !!t.querySelector("span"),
      siblingInput: (() => {
        const i = document.querySelector('input[placeholder="Search the commons..."]');
        if (!i) return null;
        const r = i.getBoundingClientRect();
        return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
      })(),
    };
  });

  await page.screenshot({ path: resolve(SHOTS, `${m.id}-closed.png`), fullPage: false });

  // --- open the popover ---------------------------------------------------------
  await page.click('button[aria-label="Filters"]').catch(() => {});
  await page.waitForTimeout(900);
  await page.screenshot({ path: resolve(SHOTS, `${m.id}-open.png`), fullPage: false });

  const open = await page.evaluate(() => {
    const t = document.querySelector('button[aria-label="Filters"]');
    const content = document.querySelector('[data-radix-popper-content-wrapper], [data-reka-popper-content-wrapper]')
      || document.querySelector('[role="dialog"][data-state="open"]');
    const pc = document.querySelector('[data-state="open"][class*="w-60"]')
      || document.querySelector('[role="dialog"][data-state="open"]');
    const R = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const root = pc || content;
    if (!root) return { missing: true, ariaExpanded: t?.getAttribute("aria-expanded") ?? null };
    const cs = getComputedStyle(root);
    const sections = [...root.querySelectorAll(".filter-section")].map((s) => ({
      label: s.querySelector(".section-label")?.textContent?.trim(),
      rect: R(s),
      labelCS: (() => { const l = s.querySelector(".section-label"); if (!l) return null; const c = getComputedStyle(l); return { ff: c.fontFamily.split(",")[0], fs: c.fontSize, fw: c.fontWeight, lh: c.lineHeight, color: c.color }; })(),
    }));
    const opt = root.querySelector(".filter-option");
    const optCS = opt ? (() => { const c = getComputedStyle(opt); return { ff: c.fontFamily.split(",")[0], fs: c.fontSize, fw: c.fontWeight, lh: c.lineHeight, pad: c.padding, rect: R(opt) }; })() : null;
    const dividers = [...root.querySelectorAll("*")].filter((el) => {
      const c = getComputedStyle(el);
      return (parseFloat(c.borderTopWidth) > 0 || parseFloat(c.borderBottomWidth) > 0) && el.className && String(el.className).includes("divide") === false;
    }).length;
    const divideY = root.querySelector(".divide-y");
    const colorInput = root.querySelector('input[aria-label="Search by CSS color"]');
    const searchBtn = [...root.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Search");
    const swatch = root.querySelector('button[aria-label^="Open color picker"]');
    const radios = [...root.querySelectorAll('[role="radio"]')].map((r) => ({
      checked: r.getAttribute("aria-checked"), value: r.getAttribute("value") ?? r.dataset.value ?? null,
      name: (r.closest("label")?.textContent ?? "").trim(), rect: R(r),
    }));
    const checkboxes = [...root.querySelectorAll('[role="checkbox"]')].map((r) => ({
      checked: r.getAttribute("aria-checked"), name: (r.closest("label")?.textContent ?? "").trim(), rect: R(r),
    }));
    return {
      ariaExpanded: t?.getAttribute("aria-expanded") ?? null,
      contentRect: R(root),
      contentRole: root.getAttribute("role"),
      contentAriaLabel: root.getAttribute("aria-label"),
      contentAriaLabelledby: root.getAttribute("aria-labelledby"),
      contentCS: { bg: cs.backgroundColor, backdrop: cs.backdropFilter, radius: cs.borderRadius, shadow: cs.boxShadow.slice(0, 90), pad: cs.padding, ov: cs.overflow },
      sections,
      optCS,
      divideYPresent: !!divideY,
      dividerChildCount: divideY ? divideY.children.length : 0,
      dividerBorders: divideY ? [...divideY.children].map((c) => getComputedStyle(c).borderTopWidth) : [],
      radios, checkboxes,
      colorInput: colorInput ? { rect: R(colorInput), cs: (() => { const c = getComputedStyle(colorInput); return { ff: c.fontFamily.split(",")[0], fs: c.fontSize, pr: c.paddingRight, h: c.height }; })() } : null,
      searchBtn: searchBtn ? { rect: R(searchBtn), text: searchBtn.textContent.trim(), disabled: searchBtn.disabled, cs: (() => { const c = getComputedStyle(searchBtn); return { fs: c.fontSize, bg: c.backgroundColor, color: c.color }; })() } : null,
      swatch: swatch ? { rect: R(swatch), label: swatch.getAttribute("aria-label"), type: swatch.getAttribute("type") } : null,
      tagsSectionPresent: sections.some((s) => s.label === "Tags"),
      focusedAfterOpen: document.activeElement ? `${document.activeElement.tagName.toLowerCase()}[${(document.activeElement.getAttribute("aria-label") || document.activeElement.textContent || "").trim().slice(0, 30)}]` : null,
      // overflow of the popover past the viewport
      viewport: { w: innerWidth, h: innerHeight },
      overflowRight: +(R(root).x + R(root).w - innerWidth).toFixed(1),
      overflowBottom: +(R(root).y + R(root).h - innerHeight).toFixed(1),
    };
  });

  out[m.id] = { closed, open, consoleErrors: console_, pageErrors: errs };

  // ---- desktop-light only: state-machine probes --------------------------------
  if (m.id === "desktop-light") {
    // 1. is the `searching` spinner state reachable at all?
    const spinner = await page.evaluate(async () => {
      const root = document.querySelector('[role="dialog"][data-state="open"]') || document;
      const btn = [...root.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Search");
      if (!btn) return { err: "no search button" };
      let sawSpinner = false, sawDisabled = false;
      const obs = new MutationObserver(() => {
        if (btn.querySelector("svg.animate-spin")) sawSpinner = true;
        if (btn.disabled) sawDisabled = true;
      });
      obs.observe(btn, { childList: true, subtree: true, attributes: true });
      const raf = () => new Promise((r) => requestAnimationFrame(r));
      btn.click();
      for (let i = 0; i < 40; i++) {
        if (btn.querySelector("svg.animate-spin")) sawSpinner = true;
        if (btn.disabled) sawDisabled = true;
        await raf();
      }
      obs.disconnect();
      return { sawSpinner, sawDisabled, finalText: btn.textContent.trim() };
    });

    // 2. the placeholder promise: type a non-hex CSS color and search
    await page.fill('input[aria-label="Search by CSS color"]', "hsl(200 50% 50%)");
    const beforeBadge = await page.evaluate(() => document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null);
    const nonHex = await page.evaluate(async () => {
      const root = document.querySelector('[role="dialog"][data-state="open"]') || document;
      const btn = [...root.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Search");
      const swatch = root.querySelector('button[aria-label^="Open color picker"]');
      const swatchBefore = swatch ? getComputedStyle(swatch).backgroundColor : null;
      const errsHere = [];
      const onRej = (e) => errsHere.push("unhandledrejection:" + String(e.reason).slice(0, 120));
      addEventListener("unhandledrejection", onRej);
      btn.click();
      await new Promise((r) => setTimeout(r, 400));
      removeEventListener("unhandledrejection", onRej);
      const input = root.querySelector('input[aria-label="Search by CSS color"]');
      return {
        inputValueAfter: input?.value,
        swatchBefore,
        swatchAfter: swatch ? getComputedStyle(swatch).backgroundColor : null,
        anyErrorTextInPopover: /invalid|error|not a color/i.test(root.textContent || ""),
        unhandled: errsHere,
      };
    });
    const afterBadge = await page.evaluate(() => document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null);
    await page.screenshot({ path: resolve(SHOTS, "desktop-light-nonhex-searched.png") });

    // 3. nested popover: open MiniColorPicker inside the filter popover, then Escape
    await page.click('button[aria-label^="Open color picker"]').catch(() => {});
    await page.waitForTimeout(700);
    const nestedOpen = await page.evaluate(() => ({
      openDialogs: document.querySelectorAll('[role="dialog"][data-state="open"]').length,
      rects: [...document.querySelectorAll('[role="dialog"][data-state="open"]')].map((d) => {
        const b = d.getBoundingClientRect();
        return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), z: getComputedStyle(d.parentElement || d).zIndex };
      }),
    }));
    await page.screenshot({ path: resolve(SHOTS, "desktop-light-nested-open.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    const afterEsc = await page.evaluate(() => ({
      openDialogs: document.querySelectorAll('[role="dialog"][data-state="open"]').length,
      triggerExpanded: document.querySelector('button[aria-label="Filters"]')?.getAttribute("aria-expanded") ?? null,
      focused: document.activeElement ? `${document.activeElement.tagName.toLowerCase()}[${(document.activeElement.getAttribute("aria-label") || document.activeElement.textContent || "").trim().slice(0, 30)}]` : null,
    }));
    await page.screenshot({ path: resolve(SHOTS, "desktop-light-after-escape.png") });

    // 4. keyboard reach inside the open popover
    await page.click('button[aria-label="Filters"]').catch(() => {});
    await page.waitForTimeout(500);
    await page.click('button[aria-label="Filters"]').catch(() => {});
    await page.waitForTimeout(700);
    const tabs = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(80);
      tabs.push(await page.evaluate(() => {
        const ae = document.activeElement;
        if (!ae) return null;
        const cs = getComputedStyle(ae);
        return {
          el: `${ae.tagName.toLowerCase()}${ae.getAttribute("role") ? "[" + ae.getAttribute("role") + "]" : ""}`,
          name: (ae.getAttribute("aria-label") || ae.textContent || "").trim().slice(0, 28),
          ring: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0 ? `outline ${cs.outlineWidth} ${cs.outlineColor}` : (cs.boxShadow !== "none" ? "boxShadow" : "NONE"),
        };
      }));
    }
    out.stateProbes = { spinner, nonHex, beforeBadge, afterBadge, nestedOpen, afterEsc, tabs };

    // 5. compare with the sibling ⋮ on /admin/users (UserSortMenu) — one family?
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    const sibling = await page.evaluate(() => {
      const t = document.querySelector('button[aria-label="Sort users"]');
      if (!t) return { missing: true };
      const b = t.getBoundingClientRect();
      const cs = getComputedStyle(t);
      return {
        rect: { w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
        cls: t.className, ariaHaspopup: t.getAttribute("aria-haspopup"),
        radius: cs.borderRadius, bg: cs.backgroundColor,
        glyphAriaHidden: t.querySelector("svg")?.getAttribute("aria-hidden") ?? null,
      };
    });
    out.sibling = sibling;
  }

  await context.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
