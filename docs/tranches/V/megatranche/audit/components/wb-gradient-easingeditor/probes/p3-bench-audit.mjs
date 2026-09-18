import { chromium } from "playwright";

const b = await chromium.launch({ args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"], channel: "chromium" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [], pageErrs = [];
page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
page.on("pageerror", e => pageErrs.push(String(e.message ?? e)));

async function openGradient() {
  await page.goto("http://localhost:9000/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const pill = page.locator(".glass-dock.collapsed");
  if (await pill.count()) { await pill.click(); await page.waitForTimeout(700); }
  await page.getByRole("combobox", { name: "Select view" }).click();
  await page.waitForTimeout(350);
  await page.getByRole("option", { name: "Gradient", exact: true }).click();
  await page.waitForTimeout(1400);
}
await openGradient();

const row = page.locator("#easing-interval-0");

// ── A11y: nameless buttons on this route, and which subtree they live in
const nameless = await page.evaluate(() => {
  const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden"; };
  return [...document.querySelectorAll('button,[role="button"]')].filter(vis)
    .filter(el => !(el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.textContent.trim()))
    .map(el => ({ cls: el.className, inEasing: !!el.closest("[id^='easing-interval-'], .specimen-strip"), html: el.outerHTML.slice(0,180) }));
});
console.log("NAMELESS BUTTONS:", JSON.stringify(nameless, null, 2));

// ── Tap targets inside the easing bench
const taps = await page.evaluate(() => {
  const host = document.querySelector("#easing-interval-0")?.parentElement?.parentElement;
  if (!host) return "no bench";
  const vis = el => { const r = el.getBoundingClientRect(); return r.width>0 && r.height>0; };
  return [...host.querySelectorAll("button,[role='button'],a,input")].filter(vis).map(el => {
    const r = el.getBoundingClientRect();
    return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), label: el.getAttribute("aria-label") ?? el.textContent.trim().slice(0,26), cls: String(el.className).slice(0,40) };
  }).filter(m => m.w < 24 || m.h < 24);
});
console.log("BENCH SMALL TAP TARGETS (<24px):", JSON.stringify(taps, null, 2));

// ── FadingScroll port truth
const port = await page.evaluate(() => {
  const el = document.querySelector("#easing-interval-0 .fading-scroll");
  if (!el) return "no port";
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const rowr = el.querySelector(".strip-row")?.getBoundingClientRect();
  return { overflowX: cs.overflowX, clientW: el.clientWidth, scrollW: el.scrollWidth, scrollLeft: el.scrollLeft,
           portRight: +r.right.toFixed(1), stripRight: rowr ? +rowr.right.toFixed(1) : null,
           docW: document.documentElement.clientWidth, tabbableTiles: el.querySelectorAll("[data-specimen]").length };
});
console.log("FADING-SCROLL PORT:", JSON.stringify(port));

// ── aria-live anywhere in the bench?
const live = await page.evaluate(() => {
  const host = document.querySelector("#easing-interval-0");
  return { inRow: host ? host.querySelectorAll("[aria-live],[role=status],[role=alert]").length : -1,
           inDoc: document.querySelectorAll("[aria-live],[role=status],[role=alert]").length };
});
console.log("ARIA-LIVE:", JSON.stringify(live));

// ── DOM cost per interval: add stops through the rail's add-ghost is fiddly;
//    use the code editor to apply a 6-stop gradient instead.
const before = await page.evaluate(() => ({
  tiles: document.querySelectorAll("[data-specimen]").length,
  pickers: document.querySelectorAll("[data-testid='easing-picker']").length,
  svgPaths: document.querySelectorAll("svg path").length,
  all: document.querySelectorAll("*").length,
}));
console.log("DOM @2 stops:", JSON.stringify(before));

const editor = page.locator("textarea, [contenteditable='true']").first();
console.log("code editor found:", await editor.count());
if (await editor.count()) {
  await editor.click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type("linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.7 0.16 200) 20%, oklch(0.65 0.18 265) 40%, oklch(0.6 0.2 320) 60%, oklch(0.7 0.14 60) 80%, oklch(0.8 0.1 100) 100%)");
  await page.waitForTimeout(1400);
  const after = await page.evaluate(() => ({
    heads: document.querySelectorAll("button[aria-controls^='easing-interval-']").length,
    tiles: document.querySelectorAll("[data-specimen]").length,
    pickers: document.querySelectorAll("[data-testid='easing-picker']").length,
    svgPaths: document.querySelectorAll("svg path").length,
    all: document.querySelectorAll("*").length,
  }));
  console.log("DOM @6 stops:", JSON.stringify(after));
}

// ── Keyboard: can the accordion head be reached & toggled; where does focus go on collapse
const kb = await page.evaluate(async () => {
  const head = document.querySelector("button[aria-controls='easing-interval-0']");
  if (!head) return "no head";
  head.focus();
  const beforeFocus = document.activeElement === head;
  head.click(); // collapse
  await new Promise(r => setTimeout(r, 120));
  return { headFocusable: beforeFocus, expandedAfter: head.getAttribute("aria-expanded"),
           activeAfter: document.activeElement?.tagName + "." + String(document.activeElement?.className).slice(0,30) };
});
console.log("KEYBOARD/FOCUS:", JSON.stringify(kb));

console.log("\nconsole errors:", JSON.stringify(errs.filter(e=>!e.includes("MISCONFIGURED")), null, 2));
console.log("pageerrors:", JSON.stringify(pageErrs, null, 2));
await b.close();
