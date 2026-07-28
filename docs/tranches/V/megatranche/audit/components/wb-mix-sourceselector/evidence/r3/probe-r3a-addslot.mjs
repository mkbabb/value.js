import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + e.message));

await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const probe = await page.evaluate(() => {
  const out = {};
  const dots = Array.from(document.querySelectorAll('[data-testid="watercolor-swatch"]'));
  out.dotCount = dots.length;
  // add slot: the one with class add-slot-ghost
  const add = document.querySelector(".add-slot-ghost");
  if (add) {
    const cs = getComputedStyle(add);
    const r = add.getBoundingClientRect();
    out.addSlot = {
      tagName: add.tagName,
      ariaHidden: add.getAttribute("aria-hidden"),
      ariaLabel: add.getAttribute("aria-label"),
      hasTagAttr: add.getAttribute("tag"),
      disabledAttr: add.getAttribute("disabled"),
      innerHTMLHasSvgPlus: /lucide|plus/i.test(add.innerHTML),
      childElementCount: add.childElementCount,
      pointerEvents: cs.pointerEvents,
      rect: { w: Math.round(r.width), h: Math.round(r.height) },
      tabIndex: add.tabIndex,
      outerHTMLHead: add.outerHTML.slice(0, 320),
    };
  } else out.addSlot = null;
  out.buttonsInMain = Array.from(document.querySelectorAll("main button")).map((b) => ({
    name: (b.getAttribute("aria-label") || b.textContent.trim() || b.getAttribute("title") || "").slice(0, 40),
    w: Math.round(b.getBoundingClientRect().width),
    h: Math.round(b.getBoundingClientRect().height),
    cls: b.className.slice(0, 60),
  }));
  out.mixSources = document.querySelectorAll("[data-mix-source]").length;
  return out;
});
console.log("PROBE-1", JSON.stringify(probe, null, 1));

// try clicking the add slot (force, since pointer-events may be none)
let clickErr = null;
try {
  await page.locator(".add-slot-ghost").click({ timeout: 3000 });
} catch (e) { clickErr = String(e).split("\n")[0]; }
await page.waitForTimeout(500);
const after = await page.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
console.log("CLICK-ERR", clickErr);
console.log("SOURCES-AFTER-NORMAL-CLICK", after);

// force click bypassing actionability
let forceErr = null;
try {
  await page.locator(".add-slot-ghost").click({ force: true, timeout: 3000 });
} catch (e) { forceErr = String(e).split("\n")[0]; }
await page.waitForTimeout(500);
const after2 = await page.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
console.log("FORCE-ERR", forceErr);
console.log("SOURCES-AFTER-FORCE-CLICK", after2);

// role query, exactly as the e2e specs do
const roleCount = await page.getByRole("button", { name: "Add current color to the mix" }).count();
console.log("ROLE-BUTTON-ADD-CURRENT-COUNT", roleCount);

// accessible-name check on all buttons within main
const nameless = await page.evaluate(() => {
  const bad = [];
  for (const b of document.querySelectorAll("main button")) {
    const n = (b.getAttribute("aria-label") || b.textContent.trim() || b.getAttribute("title") || "");
    if (!n) bad.push({ cls: b.className.slice(0, 80), w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height) });
  }
  return bad;
});
console.log("NAMELESS", JSON.stringify(nameless, null, 1));

console.log("CONSOLE-ERRORS", JSON.stringify(consoleErrors, null, 1));
await browser.close();
