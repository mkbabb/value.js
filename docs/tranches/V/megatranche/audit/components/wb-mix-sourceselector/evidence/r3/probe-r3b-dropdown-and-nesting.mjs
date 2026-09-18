import { chromium } from "playwright";

const now = new Date().toISOString();
const mk = (name, slug, cols) => ({
  id: `local-${slug}`, name, slug, colors: cols.map((css, i) => ({ css, position: i })),
  createdAt: now, updatedAt: now, isLocal: true,
});
const store = {
  version: 1,
  palettes: [
    mk("Sunrise", "sunrise", ["#ff5a5f", "#ffb400", "#00a699"]),
    mk("Deep Sea", "deep-sea", ["#012a4a", "#2a6f97", "#a9d6e5"]),
  ],
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 120)); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + e.message));

await page.addInitScript((s) => {
  window.localStorage.setItem("color-palettes", JSON.stringify(s));
}, store);

await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const trig = page.getByText("From palettes");
console.log("FROM-PALETTES-VISIBLE", await trig.count());
if (await trig.count()) {
  await trig.first().click();
  await page.waitForTimeout(700);
}

const dropProbe = await page.evaluate(() => {
  const dots = Array.from(document.querySelectorAll('[data-testid="watercolor-swatch"]'));
  const swatches = dots.filter((d) => d.className.includes("w-8 h-8"));
  return swatches.slice(0, 3).map((d) => {
    const cs = getComputedStyle(d);
    const r = d.getBoundingClientRect();
    return {
      tagName: d.tagName, ariaHidden: d.getAttribute("aria-hidden"),
      ariaLabel: d.getAttribute("aria-label"), title: d.getAttribute("title"),
      pointerEvents: cs.pointerEvents, tabIndex: d.tabIndex,
      w: Math.round(r.width), h: Math.round(r.height),
    };
  });
});
console.log("PALETTE-SWATCH-PROBE", JSON.stringify(dropProbe, null, 1));

let e1 = null;
try { await page.locator('[data-testid="watercolor-swatch"].w-8').first().click({ timeout: 2500 }); }
catch (e) { e1 = String(e).split("\n")[0]; }
try { await page.locator('[data-testid="watercolor-swatch"].w-8').first().click({ force: true, timeout: 2500 }); }
catch (e) { e1 = (e1 || "") + " | FORCE:" + String(e).split("\n")[0]; }
await page.waitForTimeout(400);
console.log("SWATCH-CLICK-ERR", e1);
console.log("SOURCES-AFTER-SWATCH-CLICK", await page.locator("[data-mix-source]").count());
console.log("ROLE-ADD-COLOR-BUTTONS", await page.getByRole("button", { name: /^Add color / }).count());

await page.getByRole("button", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(800);

const palProbe = await page.evaluate(() => {
  const out = { nestedInteractive: [] };
  for (const b of document.querySelectorAll("main button")) {
    const inner = b.querySelectorAll("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1']), [role='button'], [role='article']");
    if (inner.length) {
      out.nestedInteractive.push({
        outerLabel: (b.getAttribute("aria-label") || "").slice(0, 50),
        innerCount: inner.length,
        innerKinds: Array.from(inner).slice(0, 8).map((x) => x.tagName + (x.getAttribute("role") ? `[role=${x.getAttribute("role")}]` : "") + (x.getAttribute("aria-label") ? `{${x.getAttribute("aria-label").slice(0, 24)}}` : "")),
      });
    }
  }
  return out;
});
console.log("PALETTES-MODE-NESTED", JSON.stringify(palProbe, null, 1));

const validity = await page.evaluate(() => {
  const res = [];
  document.querySelectorAll("main button button, main button [role='article']").forEach((el) => {
    res.push(el.tagName + "|" + (el.getAttribute("role") || "") + "|" + (el.getAttribute("aria-label") || el.textContent.trim().slice(0, 30)));
  });
  return res;
});
console.log("INTERACTIVE-IN-BUTTON", JSON.stringify(validity, null, 1));

try {
  await page.getByRole("button", { name: /Select palette Sunrise/ }).click({ timeout: 3000 });
} catch (e) { console.log("SELECT-ERR", String(e).split("\n")[0]); }
await page.waitForTimeout(500);
console.log("MIX-SOURCES-PALETTE-MODE", await page.locator("[data-mix-source]").count());
console.log("ARIA-PRESSED", JSON.stringify(await page.evaluate(() => Array.from(document.querySelectorAll("main button[aria-pressed]")).map((b) => b.getAttribute("aria-label") + " => " + b.getAttribute("aria-pressed")))));

const taps = await page.evaluate(() => {
  const bad = [];
  for (const el of document.querySelectorAll("main button, main [role='button'], main a[href]")) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.width < 24 || r.height < 24)) {
      bad.push({ n: (el.getAttribute("aria-label") || el.textContent.trim() || "(none)").slice(0, 40), w: +r.width.toFixed(1), h: +r.height.toFixed(1) });
    }
  }
  return bad;
});
console.log("SMALL-TAP-TARGETS", JSON.stringify(taps, null, 1));
console.log("CONSOLE-ERRORS", JSON.stringify(consoleErrors, null, 1));
await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/mix-palettes-mode.png" });
await browser.close();
