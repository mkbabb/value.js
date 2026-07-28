// CHALLENGE-D · AboutPane — design probe (read-only against the live dev server).
// Writes ONLY under docs/tranches/V/megatranche/audit/components/AboutPane/.
//   node docs/tranches/V/megatranche/audit/components/AboutPane/probe-D1.mjs
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const FRAMES = resolve(HERE, "frames");
mkdirSync(FRAMES, { recursive: true });

const out = { origin: ORIGIN, when: new Date().toISOString(), runs: [] };

// ── the in-page measurement, executed inside the settled page ────────────────
const MEASURE = () => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const card = q(".about-card");
  if (!card) return { present: false };
  const r = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), bottom: +b.bottom.toFixed(2) }; };
  const cs = (el, p) => getComputedStyle(el).getPropertyValue(p);

  // sibling pane (the Picker) for two-pane alignment
  const picker = q(".picker-shell") || q("[class*='picker-shell']");

  // heading tree of the whole document, in source order
  const headings = qa("h1,h2,h3,h4,h5,h6").map((h) => ({
    tag: h.tagName, text: (h.textContent || "").trim().slice(0, 48),
    inAbout: card.contains(h),
    fontFamily: cs(h, "font-family").split(",")[0].replace(/["']/g, ""),
    fontSize: cs(h, "font-size"),
    fontWeight: cs(h, "font-weight"),
  }));

  // dividers inside About
  const seps = qa("[data-slot='separator'],[data-orientation],hr", card)
    .filter((e) => e.tagName === "HR" || e.getAttribute("data-slot") === "separator" || e.getAttribute("role") === "separator" || e.getAttribute("data-slot") === "separator-root");
  const sepRects = seps.map(r);

  // prose measure — every <p> rendered inside the guide
  const guide = qa("p", card).map((p) => {
    const b = p.getBoundingClientRect();
    const fs = parseFloat(cs(p, "font-size"));
    // 1ch of the element's own font
    const probe = document.createElement("span");
    probe.textContent = "0";
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
    probe.style.font = cs(p, "font");
    document.body.appendChild(probe);
    const ch = probe.getBoundingClientRect().width || fs * 0.5;
    probe.remove();
    return { text: (p.textContent || "").trim().slice(0, 40), w: +b.width.toFixed(1), ch: +(b.width / ch).toFixed(1), maxInline: cs(p, "max-inline-size"), fontSize: cs(p, "font-size") };
  }).filter((p) => p.text.length > 20);

  const detailedGuide = qa("h2", card).find((h) => /Detailed Guide/i.test(h.textContent || ""));
  const guideBody = detailedGuide ? detailedGuide.parentElement.querySelectorAll(":scope > *:not(h2)").length : -1;

  return {
    present: true,
    cardRect: r(card),
    cardTag: card.tagName,
    cardRole: card.getAttribute("role"),
    pickerRect: picker ? r(picker) : null,
    scroll: { scrollHeight: card.scrollHeight, clientHeight: card.clientHeight, hidden: card.scrollHeight - card.clientHeight, overflowY: cs(card, "overflow-y") },
    headings,
    h1Count: qa("h1").length,
    mainCount: qa("main").length,
    separatorsInAbout: sepRects.length,
    separatorRects: sepRects,
    prose: guide,
    detailedGuidePresent: !!detailedGuide,
    detailedGuideBodyChildren: guideBody,
    detailedGuideVisible: detailedGuide ? (detailedGuide.getBoundingClientRect().top < window.innerHeight && detailedGuide.getBoundingClientRect().bottom > 0) : false,
    detailedGuideStyle: detailedGuide ? { fontFamily: cs(detailedGuide, "font-family").split(",")[0].replace(/["']/g, ""), fontSize: cs(detailedGuide, "font-size"), fontWeight: cs(detailedGuide, "font-weight") } : null,
    // inline selector inside the pane title
    selector: (() => {
      const t = q(".pane-header-title [data-slot='select-trigger'],.pane-header-title button,.pane-header-title [role='combobox']", document);
      const title = q(".pane-header-title");
      if (!t || !title) return null;
      return {
        triggerRect: r(t),
        triggerColor: cs(t, "color"),
        titleColor: cs(title, "color"),
        triggerFontSize: cs(t, "font-size"),
        titleFontSize: cs(title, "font-size"),
        titleLines: Math.round(title.getBoundingClientRect().height / parseFloat(cs(title, "line-height"))),
      };
    })(),
    // tokens
    tokens: {
      phi3: cs(document.documentElement, "--phi-3"),
      phi4: cs(document.documentElement, "--phi-4"),
      typeTitle: cs(document.documentElement, "--type-title"),
      typeHeading: cs(document.documentElement, "--type-heading"),
    },
  };
};

async function run(label, { device, colorScheme, media = {}, url = "/#/", act }) {
  const browser = await webkit.launch();
  const ctx = await browser.newContext({
    ...(device ?? { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }),
    colorScheme,
    ...media,
  });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  await page.goto(ORIGIN + url, { waitUntil: "load" });
  await page.waitForTimeout(3500);
  if (act) await act(page);
  await page.waitForTimeout(1200);
  const data = await page.evaluate(MEASURE);
  await page.screenshot({ path: resolve(FRAMES, `${label}.png`), fullPage: false });
  out.runs.push({ label, colorScheme, url, consoleErrors, ...data });
  await browser.close();
  console.log(label, "→", data.present ? `card ${data.cardRect.w}x${data.cardRect.h} hidden=${data.scroll.hidden} seps=${data.separatorsInAbout} h1=${data.h1Count}` : "ABSENT");
}

const desktop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };

await run("d1-desktop-light", { device: desktop, colorScheme: "light" });
await run("d2-desktop-dark", { device: desktop, colorScheme: "dark" });

// the seven color spaces with NO markdown module — orphan "Detailed Guide"
for (const sp of ["display-p3", "rec2020", "jzazbz"]) {
  await run(`d3-nomodule-${sp}`, {
    device: desktop, colorScheme: "light",
    url: `/#/?space=${sp}&color=oklch(0.7 0.15 200)`,
  });
}

// mobile — About is pane index 1 behind the segmented control; the 60-shot
// matrix never reached it.
await run("d4-mobile-light-about", {
  device: devices["iPhone 14"], colorScheme: "light",
  act: async (p) => { await p.getByText("About", { exact: true }).first().click(); },
});
await run("d5-mobile-dark-about", {
  device: devices["iPhone 14"], colorScheme: "dark",
  act: async (p) => { await p.getByText("About", { exact: true }).first().click(); },
});

// reduced motion + forced colors
await run("d6-reduced-motion", { device: desktop, colorScheme: "light", media: { reducedMotion: "reduce" } });
await run("d7-forced-colors", { device: desktop, colorScheme: "light", media: { forcedColors: "active" } });

// 200% zoom (desktop viewport halved in CSS px == 2x zoom)
await run("d8-zoom200", { device: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 }, colorScheme: "light" });

// RTL
await run("d9-rtl", {
  device: desktop, colorScheme: "light",
  act: async (p) => { await p.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); },
});

writeFileSync(resolve(HERE, "probe-D1.json"), JSON.stringify(out, null, 2));
console.log("wrote probe-D1.json");
