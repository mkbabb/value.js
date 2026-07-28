import { webkit } from "playwright";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const errs = [];
p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
p.on("pageerror", (e) => errs.push("PAGEERR " + e.message));

await p.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await p.waitForTimeout(4500);

const probe = await p.evaluate(() => {
  const r = {};
  const well = document.querySelector(".dashed-well");
  const wellRect = well?.getBoundingClientRect();
  r.wellRect = wellRect && { w: +wellRect.width.toFixed(1), h: +wellRect.height.toFixed(1) };

  const ghost = document.querySelector(".add-slot-ghost");
  if (ghost) {
    const cs = getComputedStyle(ghost);
    const gr = ghost.getBoundingClientRect();
    r.ghost = {
      tagName: ghost.tagName,
      outerHTMLHead: ghost.outerHTML.slice(0, 500),
      attrs: [...ghost.attributes].map((a) => `${a.name}="${a.value}"`),
      pointerEvents: cs.pointerEvents,
      ariaHidden: ghost.getAttribute("aria-hidden"),
      svgClasses: [...ghost.querySelectorAll("svg")].map((s) => String(s.getAttribute("class"))),
      rect: { w: +gr.width.toFixed(1), h: +gr.height.toFixed(1) },
      tabIndex: ghost.tabIndex,
      isFocusable: ghost.matches("button,a[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"),
    };
    if (wellRect) r.ghostAreaShareOfWell = +((gr.width * gr.height) / (wellRect.width * wellRect.height)).toFixed(4);
  } else r.ghost = null;

  r.swatches = [...document.querySelectorAll("[data-testid=watercolor-swatch]")].map((el) => ({
    tag: el.tagName, cls: String(el.className).slice(0, 60), ariaHidden: el.getAttribute("aria-hidden"),
    pe: getComputedStyle(el).pointerEvents, tagAttr: el.getAttribute("tag"),
  }));

  const sel = [...document.querySelectorAll("span")].find((s) => s.textContent.trim() === "Selected");
  if (sel) {
    const cs = getComputedStyle(sel);
    r.selectedLabel = { cls: sel.className, font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, tt: cs.textTransform, ls: cs.letterSpacing, color: cs.color };
  }
  const cslab = [...document.querySelectorAll("*")].find((s) => s.children.length === 0 && s.textContent.trim().toLowerCase() === "color space");
  if (cslab) {
    const cs = getComputedStyle(cslab);
    r.colorSpaceLabel = { cls: cslab.className, font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, tt: cs.textTransform, ls: cs.letterSpacing, color: cs.color };
  }

  const mixBtn = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "Mix");
  r.mixButton = mixBtn && { disabled: mixBtn.disabled, aria: mixBtn.getAttribute("aria-disabled") };

  const tl = document.querySelector("[role=tablist],[role=group]");
  r.tabsRole = tl && { role: tl.getAttribute("role"), aria: tl.getAttribute("aria-label"), html: tl.outerHTML.slice(0, 260) };

  r.allButtons = [...document.querySelectorAll("button")].map((x) => {
    const rr = x.getBoundingClientRect();
    return { name: (x.getAttribute("aria-label") || x.textContent.trim() || x.title || "«NONE»").slice(0, 42), w: +rr.width.toFixed(0), h: +rr.height.toFixed(0) };
  });
  return r;
});

console.log("=== PROBE ===");
console.log(JSON.stringify(probe, null, 1));

const before = await p.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
try {
  await p.locator(".add-slot-ghost").click({ timeout: 3000, force: true });
} catch (e) { console.log("CLICK-FAILED:", String(e).split("\n")[0]); }
await p.waitForTimeout(700);
const after = await p.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
console.log("ADD-SLOT FORCE-CLICK: chips before =", before, " after =", after);

const focusables = await p.evaluate(() => {
  const well = document.querySelector(".dashed-well");
  const pane = well && well.parentElement;
  if (!pane) return "no pane";
  return [...pane.querySelectorAll("button,a[href],input,select,textarea,[tabindex]")].map(
    (e) => `${e.tagName}|name=${(e.getAttribute("aria-label") || e.textContent.trim() || "«NONE»").slice(0, 28)}`,
  );
});
console.log("FOCUSABLES IN SOURCE SELECTOR SUBTREE:", JSON.stringify(focusables));

await p.screenshot({ path: `${OUT}/WBMSS-desktop-1440.png` });

// palettes mode
try {
  await p.getByRole("button", { name: "Palettes", exact: true }).first().click({ timeout: 3000 });
} catch (e) {
  try { await p.getByText("Palettes", { exact: true }).first().click({ timeout: 3000 }); }
  catch (e2) { console.log("tab click fail", String(e2).split("\n")[0]); }
}
await p.waitForTimeout(1000);
await p.screenshot({ path: `${OUT}/WBMSS-desktop-1440-palettes.png` });
const pal = await p.evaluate(() => ({ mainText: document.querySelector("main")?.innerText?.slice(0, 500) }));
console.log("PALETTES MODE:", JSON.stringify(pal));

console.log("CONSOLE ERRORS:", JSON.stringify(errs));
await b.close();
