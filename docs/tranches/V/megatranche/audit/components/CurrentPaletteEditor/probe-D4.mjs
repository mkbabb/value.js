// CHALLENGE-D pass 2 — CurrentPaletteEditor design probe.
// Read-only against the live dev server. Seeds localStorage only.
import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const OUT = new URL("./probe-D4.json", import.meta.url).pathname;
const FRAMES = new URL("./frames-D4/", import.meta.url).pathname;
mkdirSync(FRAMES, { recursive: true });

const FIVE = [
    "rgb(226 87 31)",
    "rgb(31 119 226)",
    "rgb(52 168 83)",
    "rgb(234 179 8)",
    "rgb(147 51 234)",
];

const results = {};

function seedScript(saved, palettes) {
    return `(() => {
    localStorage.setItem("color-picker", JSON.stringify({
        inputColor: ${JSON.stringify(saved[0] ?? "rgb(226 87 31)")},
        savedColors: ${JSON.stringify(saved)}
    }));
    localStorage.setItem("color-palettes", JSON.stringify(${JSON.stringify({
        version: 1,
        palettes,
    })}));
})()`;
}

const mkPalette = (name, i) => ({
    id: `local-${i}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    colors: [{ css: "rgb(10 10 10)", position: 0 }],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: true,
});

// ── measurement helpers injected into the page ──────────────────────────────
const MEASURE = `
(() => {
  const q = (s, r = document) => r.querySelector(s);
  const rect = (el) => { if (!el) return null; const r = el.getBoundingClientRect();
    return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) }; };
  const cs = (el, props) => { if (!el) return null; const c = getComputedStyle(el); const o = {};
    for (const p of props) o[p] = c.getPropertyValue(p); return o; };
  function srgb(c) {
    const m = c.match(/[\\d.]+/g); if (!m) return null;
    return m.slice(0,3).map(Number);
  }
  function lum(rgb) {
    const f = rgb.map(v => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); });
    return 0.2126*f[0] + 0.7152*f[1] + 0.0722*f[2];
  }
  function contrast(fg, bg) {
    const a = lum(srgb(fg)), b = lum(srgb(bg));
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return +(((hi + 0.05) / (lo + 0.05)).toFixed(3));
  }
  // resolve an element's effective painted background by walking up until opaque
  function paintedBg(el) {
    let n = el;
    while (n && n !== document.documentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      const m = bg.match(/[\\d.]+/g);
      if (m && (m.length < 4 || Number(m[3]) >= 0.99)) return bg;
      n = n.parentElement;
    }
    return getComputedStyle(document.documentElement).backgroundColor;
  }

  const well = q(".dashed-well");
  if (!well) return { error: "no .dashed-well" };
  const row = q(".swatch-row", well);
  const label = well.querySelector("span.font-display, span.text-small");
  const countSpan = [...well.querySelectorAll("span")].find(s => /\\d+ colors?$/.test(s.textContent.trim()));
  const dots = [...well.querySelectorAll("[data-testid=watercolor-swatch]")];
  const buttons = [...well.querySelectorAll("button")];
  const input = q("input", well);

  const wellBg = paintedBg(well);

  const out = {
    viewport: { w: innerWidth, h: innerHeight },
    scheme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    well: {
      rect: rect(well),
      style: cs(well, ["display","flex-direction","gap","padding","border","border-radius","background-color","box-shadow","align-items"]),
      paintedBg: wellBg,
      childCount: well.children.length,
      zones: [...well.children].map(c => ({ cls: c.className.toString().slice(0, 70), rect: rect(c) })),
    },
    label: label ? {
      text: label.textContent.trim(),
      rect: rect(label),
      style: cs(label, ["font-family","font-size","font-weight","font-style","line-height","color"]),
      contrastOnWell: contrast(getComputedStyle(label).color, wellBg),
    } : null,
    count: countSpan ? {
      text: countSpan.textContent.trim(),
      style: cs(countSpan, ["font-family","font-size","font-weight","color"]),
      contrastOnWell: contrast(getComputedStyle(countSpan).color, wellBg),
    } : null,
    row: row ? {
      rect: rect(row),
      style: cs(row, ["display","flex-wrap","gap","align-items"]),
      childCount: row.children.length,
      children: [...row.children].map(c => ({
        tag: c.tagName, cls: c.className.toString().slice(0,50), rect: rect(c),
        display: getComputedStyle(c).display, lineHeight: getComputedStyle(c).lineHeight,
      })),
    } : null,
    dots: dots.map(d => ({
      variant: d.dataset.variant, ariaHidden: d.getAttribute("aria-hidden"),
      pointerEvents: getComputedStyle(d).pointerEvents, tag: d.tagName,
      rect: rect(d), childElementCount: d.childElementCount,
      hasSvgNonFilter: [...d.children].some(c => c.tagName.toLowerCase() === "svg" && !c.classList.contains("watercolor-filter-host")),
    })),
    buttons: buttons.map(b => ({
      accName: (b.getAttribute("aria-label") || b.textContent.trim()),
      disabled: b.disabled, rect: rect(b),
      style: cs(b, ["height","min-height","width","border-radius","font-size"]),
    })),
    input: input ? {
      placeholder: input.placeholder, value: input.value, maxLength: input.maxLength,
      ariaInvalid: input.getAttribute("aria-invalid"),
      ariaDescribedby: input.getAttribute("aria-describedby"),
      rect: rect(input),
      style: cs(input, ["height","font-size","text-overflow"]),
    } : null,
    tabbables: [...well.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')]
      .map(e => ({ tag: e.tagName, name: e.getAttribute("aria-label") || e.textContent.trim() || e.placeholder || "" })),
    liveRegions: [...document.querySelectorAll('[role=alert],[role=status],[aria-live]')]
      .map(e => ({ role: e.getAttribute("role"), live: e.getAttribute("aria-live"), text: e.textContent.trim().slice(0,60) })),
    dupRow: (() => {
      const el = [...well.children].find(c => /already exists/.test(c.textContent));
      if (!el) return null;
      return { text: el.textContent.replace(/\\s+/g," ").trim(), rect: rect(el),
        role: el.getAttribute("role"), ariaLive: el.getAttribute("aria-live"),
        msgStyle: cs(el.querySelector("span"), ["font-family","font-size","font-style","color"]),
        buttons: [...el.querySelectorAll("button")].map(b => ({ text: b.textContent.trim(), rect: rect(b), h: getComputedStyle(b).height })) };
    })(),
    docScroll: { bodyScrollH: document.body.scrollHeight, docClientH: document.documentElement.clientHeight,
      bodyOverflow: getComputedStyle(document.body).overflow, htmlOverflow: getComputedStyle(document.documentElement).overflow },
    floatingPanel: (() => {
      const p = document.querySelector("body > .floating-panel");
      if (!p) return null;
      return { rect: rect(p), position: getComputedStyle(p).position, inlineStyle: p.getAttribute("style"),
        ariaHidden: p.getAttribute("aria-hidden"),
        buttons: [...p.querySelectorAll("button")].map(b => b.getAttribute("aria-label")) };
    })(),
    popoverContent: (() => {
      const p = document.querySelector("[data-reka-popper-content-wrapper], [role=dialog][data-state=open]");
      return p ? { rect: rect(p), text: p.textContent.trim().slice(0,80) } : null;
    })(),
  };
  return out;
})()
`;

async function scenario(browser, name, { viewport, dark, saved, palettes, hasTouch, after }) {
    const ctx = await browser.newContext({
        viewport,
        colorScheme: dark ? "dark" : "light",
        hasTouch: !!hasTouch,
        isMobile: false,
        deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 120)));
    page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + String(e).slice(0, 120)));
    await page.addInitScript(seedScript(saved, palettes));
    await page.goto(ORIGIN + "/#/palettes", { waitUntil: "load" });
    await page.waitForSelector(".dashed-well", { timeout: 20000 });
    await page.waitForTimeout(2200);
    let extra = {};
    if (after) extra = (await after(page)) ?? {};
    const m = await page.evaluate(MEASURE);
    await page.screenshot({ path: FRAMES + name + ".png", fullPage: false });
    results[name] = { ...m, consoleErrors, ...extra };
    await ctx.close();
}

const b = await webkit.launch();

// S1 — empty, desktop light
await scenario(b, "s1-empty-desktop-light", {
    viewport: { width: 1440, height: 900 }, saved: [], palettes: [],
});
// S2 — five colours, desktop light
await scenario(b, "s2-five-desktop-light", {
    viewport: { width: 1440, height: 900 }, saved: FIVE, palettes: [],
});
// S3 — five colours, desktop dark
await scenario(b, "s3-five-desktop-dark", {
    viewport: { width: 1440, height: 900 }, dark: true, saved: FIVE, palettes: [],
});
// S4 — one colour (singular + first-add layout jump reference)
await scenario(b, "s4-one-desktop-light", {
    viewport: { width: 1440, height: 900 }, saved: [FIVE[0]], palettes: [],
});
// S5 — five colours at 390
await scenario(b, "s5-five-mobile-390", {
    viewport: { width: 390, height: 844 }, saved: FIVE, palettes: [],
});
// S6 — hover the first swatch on desktop (pointer path)
await scenario(b, "s6-hover-desktop", {
    viewport: { width: 1440, height: 900 }, saved: FIVE, palettes: [],
    after: async (page) => {
        const dot = page.locator(".dashed-well .swatch-row [data-testid=watercolor-swatch]").first();
        await dot.hover({ force: true });
        await page.waitForTimeout(600);
        return { probe: "hover" };
    },
});
// S7 — touch path: tap the first swatch, does the Popover open?
await scenario(b, "s7-tap-touch", {
    viewport: { width: 390, height: 844 }, hasTouch: true, saved: FIVE, palettes: [],
    after: async (page) => {
        const canHover = await page.evaluate(() => matchMedia("(hover: hover)").matches);
        const dot = page.locator(".dashed-well .swatch-row [data-testid=watercolor-swatch]").first();
        const box = await dot.boundingBox();
        let tapErr = null;
        try { await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2); }
        catch (e) { tapErr = String(e).slice(0, 100); }
        await page.waitForTimeout(700);
        const domClick = await page.evaluate(() => {
            const d = document.querySelector(".dashed-well .swatch-row [data-testid=watercolor-swatch]");
            d.click();
            return true;
        });
        await page.waitForTimeout(500);
        return { probe: "tap", canHoverMq: canHover, tapErr, domClick };
    },
});
// S8 — the add slot: is it operable at all?
await scenario(b, "s8-addslot", {
    viewport: { width: 1440, height: 900 }, saved: FIVE, palettes: [],
    after: async (page) => {
        const before = await page.evaluate(() =>
            document.querySelectorAll(".dashed-well .swatch-row [data-testid=watercolor-swatch]").length);
        const r = await page.evaluate(() => {
            const el = document.querySelector(".add-slot-ghost");
            if (!el) return { found: false };
            const before = el.outerHTML.length;
            el.click();
            return {
                found: true, tag: el.tagName, ariaHidden: el.getAttribute("aria-hidden"),
                ariaLabel: el.getAttribute("aria-label"), role: el.getAttribute("role"),
                tabIndex: el.tabIndex, pointerEvents: getComputedStyle(el).pointerEvents,
                childCount: el.childElementCount, htmlLen: before,
                innerHTML: el.innerHTML.slice(0, 200),
            };
        });
        await page.waitForTimeout(600);
        const afterCount = await page.evaluate(() =>
            document.querySelectorAll(".dashed-well .swatch-row [data-testid=watercolor-swatch]").length);
        // keyboard: can Tab reach it?
        const tabNames = await page.evaluate(() => {
            const well = document.querySelector(".dashed-well");
            return [...well.querySelectorAll("*")].filter(e => e.tabIndex >= 0)
                .map(e => e.tagName + ":" + (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 24)));
        });
        return { probe: "addslot", addSlot: r, dotsBefore: before, dotsAfter: afterCount, tabNames };
    },
});
// S9 — duplicate-name collision, then edit the name (stale-error test)
await scenario(b, "s9-dup-stale", {
    viewport: { width: 1440, height: 900 }, saved: FIVE,
    palettes: [mkPalette("Palette 1", 1), mkPalette("Palette 2", 2)],
    after: async (page) => {
        const inp = page.locator(".dashed-well input").first();
        const heightBefore = await page.evaluate(() =>
            document.querySelector(".dashed-well").getBoundingClientRect().height);
        await inp.fill("Palette 2");
        await page.locator(".dashed-well button").last().click();
        await page.waitForTimeout(500);
        const collided = await page.evaluate(() => {
            const w = document.querySelector(".dashed-well");
            return { text: w.textContent.replace(/\s+/g, " ").trim(), h: w.getBoundingClientRect().height };
        });
        // now change the name — the error must follow the field it describes
        await inp.fill("Zebra Sunset");
        await page.waitForTimeout(400);
        const afterRetype = await page.evaluate(() => {
            const w = document.querySelector(".dashed-well");
            const inp = w.querySelector("input");
            const dup = [...w.children].find(c => /already exists/.test(c.textContent));
            return {
                inputValue: inp.value,
                stillShowsCollision: !!dup,
                collisionText: dup ? dup.textContent.replace(/\s+/g, " ").trim() : null,
                updateBtn: dup ? [...dup.querySelectorAll("button")].map(b => b.textContent.trim()) : [],
            };
        });
        // press Update while the field says "Zebra Sunset"
        let overwrote = null;
        if (afterRetype.stillShowsCollision) {
            await page.getByRole("button", { name: "Update" }).click();
            await page.waitForTimeout(600);
            overwrote = await page.evaluate(() => {
                const s = JSON.parse(localStorage.getItem("color-palettes"));
                return s.palettes.map(p => ({ name: p.name, n: p.colors.length }));
            });
        }
        return { probe: "dup", heightBefore, collided, afterRetype, overwrote };
    },
});
// S10 — the placeholder name generator vs the uniqueness rule
await scenario(b, "s10-placeholder-collision", {
    viewport: { width: 1440, height: 900 }, saved: FIVE,
    palettes: [mkPalette("Palette 1", 1), mkPalette("Palette 2", 2)],
    after: async (page) => {
        // delete "Palette 1" out of the store the way the app would, then re-read
        const r = await page.evaluate(() => {
            const w = document.querySelector(".dashed-well");
            return { placeholder: w.querySelector("input").placeholder };
        });
        return { probe: "placeholder", withTwo: r };
    },
});
// S11 — very long name in the field
await scenario(b, "s11-long-name", {
    viewport: { width: 1440, height: 900 }, saved: FIVE, palettes: [],
    after: async (page) => {
        const inp = page.locator(".dashed-well input").first();
        await inp.fill("A".repeat(160));
        await page.waitForTimeout(300);
        const r = await page.evaluate(() => {
            const i = document.querySelector(".dashed-well input");
            return { valueLen: i.value.length, maxLength: i.maxLength,
                scrollW: i.scrollWidth, clientW: i.clientWidth,
                wellH: document.querySelector(".dashed-well").getBoundingClientRect().height };
        });
        return { probe: "longname", longName: r };
    },
});
// S12 — 24 colours desktop (density / zone inflation)
await scenario(b, "s12-many24-desktop", {
    viewport: { width: 1440, height: 900 },
    saved: Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 50%)`),
    palettes: [],
});

await b.close();
writeFileSync(OUT, JSON.stringify(results, null, 2));
console.log("wrote", OUT);
for (const [k, v] of Object.entries(results)) {
    console.log("—", k, v.error ?? "", "well", JSON.stringify(v.well?.rect), "dots", v.dots?.length,
        "btns", v.buttons?.map(b => b.accName || "<nameless>").join("|"));
}
