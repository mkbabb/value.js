import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@playwright/test/index.mjs";
const [origin, width] = [process.argv[2], +process.argv[3]];
const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width, height: 844 } });
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && console.log("console.error", m.text().slice(0, 200)));
  page.on("pageerror", (e) => console.log("pageerror", String(e).slice(0, 300)));
  await page.goto(`${origin}/v/hazy-etching-cream-elk`);
  await page.waitForTimeout(3000);
  const t = page.getByRole("tab", { name: "Canvas" }).filter({ visible: true }).first();
  if (await t.count()) { await t.click(); await page.waitForTimeout(800); }
  const edit = page.getByRole("button", { name: "Edit contour" }).first();
  const info = await edit.evaluate((el) => { const r = el.getBoundingClientRect(); const at = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    const dock = el.closest(".glass-dock"); return { r: [r.x, r.y, r.width, r.height], at: at && (at === el || el.contains(at)) ? "self" : at?.outerHTML.slice(0, 160), dock: dock.className, morph: dock.hasAttribute("data-morphing"), inert: !!el.closest("[inert]") }; });
  console.log("before", JSON.stringify(info));
  await page.evaluate(() => { window.__ev = []; const b = [...document.querySelectorAll('button[aria-label="Edit contour"]')][0];
    for (const t of ["pointerover","pointerdown","pointerup","click"]) document.addEventListener(t, (e) => { const r = b.getBoundingClientRect(); window.__ev.push({ t, phase: "cap", tgt: (e.target.getAttribute?.("aria-label") || e.target.className?.baseVal || e.target.className || e.target.tagName).toString().slice(0,40), x: e.clientX, bx: Math.round(r.x), morph: b.closest(".glass-dock").hasAttribute("data-morphing"), cls: b.closest(".glass-dock").className.includes("expanded") }); }, true);
    b.addEventListener("click", () => window.__ev.push({ t: "click@button" })); });
  await edit.click({ timeout: 5000 }).catch((e) => console.log("click err", String(e).slice(0, 300)));
  await page.waitForTimeout(1500);
  console.log("events", JSON.stringify(await page.evaluate(() => window.__ev.filter((e) => e.t !== "pointerover" || true).slice(-12))));
  console.log("after", JSON.stringify(await page.evaluate(() => ({ shells: [...document.querySelectorAll(".editor-shell")].map((e) => e.className + " parent=" + e.parentElement.className.slice(0, 40)), docks: [...document.querySelectorAll(".glass-dock")].map((d) => d.className.slice(0, 70)) }))));
} finally { await browser.close(); }
