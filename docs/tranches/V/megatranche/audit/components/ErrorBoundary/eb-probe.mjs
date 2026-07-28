import { webkit } from "playwright";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/ErrorBoundary/evidence";
fs.mkdirSync(OUT, { recursive: true });

const DOC_RE = /\/assets\/docs\/[a-z-]+\.md/;

function inspect() {
  const eb = document.querySelector(".vj-error-boundary");
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  const cs = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const o = {}; for (const p of props) o[p] = s.getPropertyValue(p); return o; };
  const kids = eb ? [...eb.children].map((el) => ({
    tag: el.tagName.toLowerCase(),
    cls: el.getAttribute("class"),
    text: (el.textContent || "").trim().slice(0, 80),
    rect: r(el),
    style: cs(el, ["display", "color", "font-family", "font-size", "font-weight", "line-height", "opacity", "visibility"]),
  })) : null;
  const ae = document.activeElement;
  return {
    boundaryPresent: !!eb,
    boundaryRect: r(eb),
    boundaryText: eb ? (eb.textContent || "").replace(/\s+/g, " ").trim() : null,
    boundaryHTML: eb ? eb.innerHTML.replace(/\s+/g, " ").trim().slice(0, 900) : null,
    boundaryStyle: cs(eb, ["display", "overflow", "height", "min-height", "padding", "gap", "align-items", "justify-content"]),
    childCount: eb ? eb.children.length : 0,
    children: kids,
    paneContainerPresent: !!document.querySelector(".pane-container"),
    pickerPresent: !!document.querySelector(".picker-shell"),
    mainRect: r(document.querySelector("main")),
    mainStyle: cs(document.querySelector("main"), ["height", "min-height", "overflow", "display"]),
    h1Count: document.querySelectorAll("h1").length,
    headingCount: document.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
    activeElement: ae ? { tag: ae.tagName.toLowerCase(), cls: ae.getAttribute("class")?.slice(0, 60) ?? null, outline: getComputedStyle(ae).outlineStyle + " " + getComputedStyle(ae).outlineWidth + " " + getComputedStyle(ae).outlineColor, boxShadow: getComputedStyle(ae).boxShadow.slice(0, 80) } : null,
    inkMuted: getComputedStyle(document.documentElement).getPropertyValue("--ink-muted").trim(),
    foreground: getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim(),
    destructive: getComputedStyle(document.documentElement).getPropertyValue("--destructive").trim(),
    docWidth: document.documentElement.scrollWidth,
    winWidth: window.innerWidth,
    docHeight: document.documentElement.scrollHeight,
    winHeight: window.innerHeight,
  };
}

async function run(name, { width, height, colorScheme, extra = {}, after = null }) {
  const b = await webkit.launch();
  const ctx = await b.newContext({ viewport: { width, height }, colorScheme, deviceScaleFactor: 2, ...extra });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));
  page.on("console", (m) => { if (m.type() === "error" && !/MISCONFIGURED/.test(m.text())) errs.push("CONSOLE " + m.text().slice(0, 160)); });
  await page.route(DOC_RE, (route) => route.abort("failed"));
  await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(9000);
  const state = await page.evaluate(inspect);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  let post = null;
  if (after) post = await after(page);
  await b.close();
  return { name, width, height, colorScheme, state, post, errs: errs.slice(0, 5) };
}

const results = [];

results.push(await run("EB1-caught-desktop-1440-light", { width: 1440, height: 900, colorScheme: "light" }));
results.push(await run("EB2-caught-desktop-1440-dark", { width: 1440, height: 900, colorScheme: "dark" }));
results.push(await run("EB3-caught-mobile-390-light", { width: 390, height: 844, colorScheme: "light" }));
results.push(await run("EB4-caught-rtl-desktop-light", { width: 1440, height: 900, colorScheme: "light", extra: { locale: "ar-EG" }, after: async (p) => { await p.evaluate(() => { document.documentElement.dir = "rtl"; }); await p.waitForTimeout(400); await p.screenshot({ path: `${OUT}/EB4-caught-rtl-desktop-light.png` }); const btn = await p.$(".vj-error-boundary button"); const svg = await p.$(".vj-error-boundary button svg"); const bb = btn && await btn.boundingBox(); const sb = svg && await svg.boundingBox(); return { dir: "rtl", buttonBox: bb, iconBox: sb, iconLeftOfLabel: bb && sb ? sb.x < bb.x + bb.width / 2 : null }; } }));

// TRY AGAIN + ROUTE-CHANGE behavioural probe
results.push(await run("EB5-recovery-desktop-light", { width: 1440, height: 900, colorScheme: "light", after: async (p) => {
  const before = await p.evaluate(inspect);
  // 1) click Try again
  await p.click(".vj-error-boundary button");
  await p.waitForTimeout(2500);
  const afterRetry = await p.evaluate(inspect);
  await p.screenshot({ path: `${OUT}/EB5a-after-try-again.png` });
  // 2) change route via hash (what the Dock does)
  await p.evaluate(() => { window.location.hash = "#/gradient"; });
  await p.waitForTimeout(3000);
  const afterRoute = await p.evaluate(inspect);
  await p.screenshot({ path: `${OUT}/EB5b-after-route-change-to-gradient.png` });
  return {
    beforeBoundary: before.boundaryPresent,
    afterRetryBoundary: afterRetry.boundaryPresent,
    afterRetryActive: afterRetry.activeElement,
    afterRouteHash: await p.evaluate(() => location.hash),
    afterRouteBoundary: afterRoute.boundaryPresent,
    afterRoutePaneContainer: afterRoute.paneContainerPresent,
    afterRouteText: afterRoute.boundaryText,
  };
} }));

// 200% zoom + forced colors
results.push(await run("EB6-caught-zoom200-desktop-light", { width: 720, height: 450, colorScheme: "light", after: async (p) => {
  const m = await p.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    const main = document.querySelector("main");
    if (!eb) return null;
    return { ebH: +eb.getBoundingClientRect().height.toFixed(1), ebScrollH: eb.scrollHeight, mainH: +main.getBoundingClientRect().height.toFixed(1), mainScrollH: main.scrollHeight, clipped: eb.scrollHeight > eb.clientHeight, docScrollH: document.documentElement.scrollHeight, winH: window.innerHeight };
  });
  return m;
} }));

results.push(await run("EB7-caught-forced-colors-desktop", { width: 1440, height: 900, colorScheme: "light", extra: { forcedColors: "active" } }));

fs.writeFileSync(`${OUT}/EB-measurements.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
