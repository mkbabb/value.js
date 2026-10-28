// SS-8 B08 ApiOfflineChip (successor: demo/shared/ui/api-status/ApiStatusChip.vue) witnesses.
// Cells: ap-dual (U-1 adjacent fact + U-5 pulse timing) · ap-dark (U-8) · ap-rtl (U-2) · ap-forced (U-3) · ap-200 (U-4) · ap-latch (U-7)
import { chromium } from "playwright";
import { O, EV, routeApi, newCell, settle } from "./lib.mjs";
const want = process.argv.slice(2);
const on = (c) => !want.length || want.includes(c);

async function offlineSurface(browser, opts = {}) {
  const ctx = await newCell(browser, opts);
  const hits = await routeApi(ctx, () => "abort");
  const page = await ctx.newPage();
  await page.goto(O + "/#/palettes", { waitUntil: "load" });
  await settle(page, 3000);
  // HEAD: the add slot is glass Button.add-slot-ghost (aria-label "Add current color …"); click via DOM (the press-armed squish never reports stable under load)
  await page.waitForSelector(".current-palette-well .add-slot-ghost", { timeout: 20000 });
  await page.evaluate(() => document.querySelector(".current-palette-well .add-slot-ghost").click());
  await page.waitForSelector('.api-status-chip[data-seat="surface"]', { timeout: 10000 });
  await page.waitForTimeout(400);
  return { ctx, page, hits };
}
const chipFacts = () => [...document.querySelectorAll(".api-status-chip")].map((c) => {
  const r = c.getBoundingClientRect(); const dot = c.querySelector(".api-status-dot");
  const well = c.closest(".dashed-well");
  return { seat: c.dataset.seat, variant: c.dataset.variant, role: c.getAttribute("role"), text: c.textContent.trim(), rect: [r.x, r.y, r.width, r.height].map(Math.round),
    sw: c.scrollWidth, cw: c.clientWidth, bdi: c.querySelectorAll("bdi").length,
    dot: dot && { w: dot.getBoundingClientRect().width, ariaHidden: dot.getAttribute("aria-hidden") ?? dot.closest("[aria-hidden]")?.getAttribute("aria-hidden"), anims: dot.getAnimations().map((a) => ({ name: a.animationName, dur: a.effect.getTiming().duration, it: a.effect.getTiming().iterations })) },
    well: well && { rect: (() => { const w = well.getBoundingClientRect(); return [w.x, w.y, w.width, w.height].map(Math.round); })(), overflow: getComputedStyle(well).overflow, clippedRight: r.right > well.getBoundingClientRect().right + 0.5, sw: well.scrollWidth, cw: well.clientWidth } };
});

const browser = await chromium.launch();
try {
  if (on("ap-dual")) {
    const { ctx, page } = await offlineSurface(browser);
    try {
      const f = await page.evaluate(chipFacts);
      const live = await page.evaluate(() => [...document.querySelectorAll("[role=status],[role=alert],[aria-live]")].filter((e) => /backend offline/.test(e.textContent)).map((e) => `${e.tagName}.${e.className.toString().slice(0, 30)} role=${e.getAttribute("role")} live=${e.getAttribute("aria-live")}`));
      await page.locator('.api-status-chip[data-seat="surface"]').screenshot({ path: `${EV}ap-surface-chip-light.png` });
      console.log("ap-dual", JSON.stringify({ chips: f, liveRegionsCarryingSentence: live }));
    } finally { await ctx.close(); }
  }
  if (on("ap-dark")) {
    const { ctx, page } = await offlineSurface(browser, { scheme: "dark" });
    try {
      const f = await page.evaluate(() => { const well = document.querySelector(".current-palette-well"); const chip = document.querySelector('.api-status-chip[data-seat="surface"]');
        return { dark: document.documentElement.classList.contains("dark"), wellBg: getComputedStyle(well).backgroundColor, wellGround: __ss8.ground(well), chipText: __ss8.ink(chip.querySelector(".api-status-label")) }; });
      await page.locator(".current-palette-well").screenshot({ path: `${EV}ap-u8-well-dark.png` });
      // pixel sample of the well ground: a 9x9 patch near the well's top-left inside the dashed border
      const box = await page.locator(".current-palette-well").boundingBox();
      const buf = await page.screenshot({ clip: { x: box.x + 6, y: box.y + 6, width: 9, height: 9 } });
      const px = await page.evaluate(async (b64) => { const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let r = 0, g = 0, bl = 0, n = d.length / 4; for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; bl += d[i + 2]; } return [r / n, g / n, bl / n].map(Math.round); }, buf.toString("base64"));
      console.log("ap-dark", JSON.stringify({ ...f, wellPixelMean: px }));
    } finally { await ctx.close(); }
  }
  if (on("ap-rtl")) {
    const { ctx, page } = await offlineSurface(browser);
    try {
      await page.evaluate(() => { document.documentElement.dir = "rtl"; });
      await page.waitForTimeout(600);
      const f = await page.evaluate(chipFacts);
      await page.locator(".current-palette-well").screenshot({ path: `${EV}ap-u2-surface-rtl.png` });
      console.log("ap-rtl", JSON.stringify(f));
    } finally { await ctx.close(); }
  }
  if (on("ap-forced")) {
    const { ctx, page } = await offlineSurface(browser, { forced: "active" });
    try {
      const f = await page.evaluate(() => [...document.querySelectorAll(".api-status-dot")].map((d) => { const s = getComputedStyle(d); return { seat: d.closest(".api-status-chip").dataset.seat, bg: s.backgroundColor, border: `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, fca: s.forcedColorAdjust, boxShadow: s.boxShadow, outline: s.outlineStyle, w: d.getBoundingClientRect().width, kids: d.children.length }; }));
      await page.locator('.api-status-chip[data-seat="surface"]').screenshot({ path: `${EV}ap-u3-forced-surface.png` });
      await page.locator('.api-status-chip[data-seat="dock"]').screenshot({ path: `${EV}ap-u3-forced-dock.png` }).catch(() => {});
      console.log("ap-forced", JSON.stringify(f));
    } finally { await ctx.close(); }
  }
  if (on("ap-200")) {
    for (const cell of [{ name: "root-font-200", w: 1440, h: 900 }, { name: "zoom-200-720x450", w: 720, h: 450 }, { name: "root-font-200@390", w: 390, h: 844 }]) {
      const { ctx, page } = await offlineSurface(browser, { w: cell.w, h: cell.h });
      try {
        if (cell.name.startsWith("root-font")) { await page.addStyleTag({ content: "html{font-size:200% !important}" }); await page.waitForTimeout(800); }
        const f = await page.evaluate(chipFacts);
        await page.locator(".current-palette-well").screenshot({ path: `${EV}ap-u4-${cell.name}.png` });
        console.log("ap-200", cell.name, JSON.stringify(f.filter((c) => c.seat === "surface")));
      } finally { await ctx.close(); }
    }
  }
  if (on("ap-latch")) {
    const ctx = await newCell(browser);
    let phase = "abort";
    const hits = await routeApi(ctx, () => phase);
    const page = await ctx.newPage();
    const errs = []; page.on("console", (m) => m.type() === "error" && errs.push({ t: Date.now(), m: m.text().slice(0, 120) }));
    try {
      await page.goto(O + "/#/palettes", { waitUntil: "load" });
      await settle(page, 3000);
      const clientUrl = await page.evaluate(() => performance.getEntriesByType("resource").map((e) => e.name).find((n) => /platform\/transport\/client\.ts/.test(n)));
      const s0 = await page.evaluate(async (u) => (await import(u)).BASE_URL, clientUrl);
      const avail = async () => page.evaluate(async (u) => (await import(u.replace("client.ts", "availability.ts"))).apiAvailability.value, clientUrl);
      const tripped = await avail();
      const nTrip = hits.length;
      // inside the cooldown: N parallel calls must short-circuit (zero requests)
      const fire = (n) => page.evaluate(async ([u, n]) => { const { request } = await import(u);
        const rs = await Promise.race([Promise.allSettled(Array.from({ length: n }, () => request("/colors/approved"))), new Promise((r) => setTimeout(() => r("pending"), 3000))]);
        return rs === "pending" ? "some-pending(hanging)" : rs.map((x) => x.status + ":" + (x.reason?.name ?? "")).join(","); }, [clientUrl, n]);
      const inWindow = await fire(8); const nIn = hits.length - nTrip;
      phase = "hang";
      await page.waitForTimeout(31000); // past RETRY_COOLDOWN_MS = 30_000
      const h0 = hits.length; const e0 = errs.length;
      const past = await fire(8);
      await page.waitForTimeout(1500);
      console.log("ap-latch", JSON.stringify({ baseUrl: s0, clientUrl, tripped, tripRequests: nTrip, inWindowResult: inWindow, inWindowRequests: nIn, pastCooldownResult: past, pastCooldownRequestsIssued: hits.length - h0, pastCooldownHits: hits.slice(h0).map((h) => h.mode + " " + h.url.slice(-40)), newConsoleErrors: errs.length - e0, availAfter: await avail() }));
    } finally { await ctx.close(); }
  }
  if (on("ap-misconf")) for (const mode of ["plain", "rtl", "forced"]) {
    // the dock's misconfigured face, rendered by the REAL chip: the live availability cell is set to
    // "misconfigured" through the app's own module instance (the precondition itself is unreachable
    // on this origin because VITE_API_URL is set).
    const { ctx, page } = await offlineSurface(browser, { forced: mode === "forced" ? "active" : "none" });
    try {
      await page.evaluate(async () => { const u = performance.getEntriesByType("resource").map((e) => e.name).find((n) => /transport\/availability\.ts/.test(n)); (await import(u)).apiAvailability.value = "misconfigured"; });
      if (mode === "rtl") await page.evaluate(() => { document.documentElement.dir = "rtl"; });
      await page.waitForTimeout(800);
      const f = await page.evaluate(() => [...document.querySelectorAll(".api-status-chip")].map((c) => { const d = c.querySelector(".api-status-dot"); const k = d.querySelector("*") || d; const s = getComputedStyle(k); const r = c.getBoundingClientRect();
        return { seat: c.dataset.seat, variant: c.dataset.variant, role: c.getAttribute("role"), text: c.textContent.trim(), bdi: c.querySelectorAll("bdi,code").length, rect: [r.x, r.y, r.width, r.height].map(Math.round), dotChild: { tag: k.tagName, cls: (k.getAttribute("class") || "").slice(0, 60), bg: s.backgroundColor, border: `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, fill: s.fill, stroke: s.stroke, fca: s.forcedColorAdjust } }; }));
      await page.locator('.api-status-chip[data-seat="dock"]').screenshot({ path: `${EV}ap-misconf-dock-${mode}.png` });
      console.log("ap-misconf", mode, JSON.stringify(f));
    } finally { await ctx.close(); }
  }
  if (on("ap-forced-kids")) {
    const { ctx, page } = await offlineSurface(browser, { forced: "active" });
    try {
      const f = await page.evaluate(() => { const d = document.querySelector('.api-status-chip[data-seat="surface"] .api-status-dot'); return [d, ...d.querySelectorAll("*")].map((k) => { const s = getComputedStyle(k); return { tag: k.tagName, cls: (k.getAttribute("class") || "").slice(0, 60), bg: s.backgroundColor, border: `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, fca: s.forcedColorAdjust }; }); });
      console.log("ap-forced-kids", JSON.stringify(f));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
