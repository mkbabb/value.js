// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.overlays · the Share popover + the Keyboard shortcuts dialog, served (READ-ONLY falsifier)
// Rows: UIA-KF-016 · 070 · 071 · 072 · 139 · 140 · 141 · 142 · 145 · 147 · 224 · 248 · 249 · 250 · 251 · A2-KE-L2-12.
// Usage: BASE=http://localhost:5246 RUN=before-r1 node overlays.mjs   (prints one GREEN/RED line per row x config)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5246"; const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const lines = []; const R = (id, bad, msg) => { const l = `${bad ? "RED  " : "GREEN"} ${id} ${msg}`; lines.push(l); console.log(l); };
const b = await chromium.launch({ headless: false });
async function page(w, h, theme) {
  const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, reducedMotion: "reduce", isMobile: touch, hasTouch: touch });
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
  const p = await ctx.newPage(); await p.goto(`${BASE}/#/cube`); await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.reload(); await sleep(3000);
  return { ctx, p };
}
const trig = (p) => p.locator('[data-dock-tether=top] [aria-label="@mbabb menu"]').first();
async function openMenu(p) {
  const d = p.locator("[data-dock-tether=top] .glass-dock").first();
  for (let k = 0; k < 5 && !(await d.evaluate((e) => e.classList.contains("expanded"))); k++) { await d.hover({ force: true }).catch(() => {}); await sleep(500); }
  // a touch context TAPS the trigger (a forced mouse click on a touch page alternates the dock's collapse instead)
  const touch = await p.evaluate(() => matchMedia("(pointer: coarse)").matches);
  for (let k = 0; k < 4; k++) { if (await p.locator("[role=menu]").count()) return true; await (touch ? trig(p).tap() : trig(p).click({ force: true })).catch(() => {}); await sleep(700); }
  return (await p.locator("[role=menu]").count()) > 0;
}
const menuRow = (p, name) => p.locator("[role=menu] [role=menuitem]").filter({ hasText: new RegExp(`^\\s*${name}\\s*$`) }).first();
const pop = (p) => p.locator("[data-reka-popper-content-wrapper] [role=dialog]:has(input)").first();
async function openShare(p) { if (!(await openMenu(p))) return false; await menuRow(p, "Share").focus(); await p.keyboard.press("Enter"); await sleep(700); return (await pop(p).count()) > 0; }

for (const [w, h, theme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const cfg = `${w}x${h}-${theme}`;
  // ── A · Share ───────────────────────────────────────────────────────────────
  let { ctx, p } = await page(w, h, theme);
  if (!(await openShare(p))) { R("SHARE-OPEN", true, `${cfg} share did not open`); await ctx.close(); continue; }
  await p.screenshot({ path: `${FR}share-open-${cfg}.png` });
  const s = await p.evaluate(() => {
    const d = [...document.querySelectorAll("[data-reka-popper-content-wrapper] [role=dialog]")].find((x) => x.querySelector("input")); const r = d.getBoundingClientRect(); const cs = getComputedStyle(d);
    const inp = d.querySelector("input"); const ir = inp.getBoundingClientRect();
    const inner = r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const btns = [...d.querySelectorAll("button")].map((x) => ({ text: x.textContent.trim(), title: x.getAttribute("title") }));
    const t = document.querySelector('[aria-label="Share animation"]'); const tr = t?.getBoundingClientRect();
    return { left: r.left, right: r.right, vw: innerWidth, inputW: ir.width, inner, focus: document.activeElement?.tagName + ":" + (document.activeElement?.textContent.trim() || document.activeElement?.getAttribute("aria-label")),
      titles: [...d.querySelectorAll("[title]")].length, btns, trig: tr ? { w: tr.width, h: tr.height, cls: t.className } : null, placeholder: inp.placeholder, pScroll: inp.scrollWidth > inp.clientWidth };
  });
  R("A2-KE-L2-12", s.left < 16 || s.vw - s.right < 16, `${cfg} popover x[${s.left.toFixed(1)},${s.right.toFixed(1)}] of ${s.vw} (>=16 gutter)`);
  R("UIA-KF-141", s.inputW < s.inner * 0.95, `${cfg} field ${s.inputW.toFixed(1)} of ${s.inner.toFixed(1)} inner`);
  R("UIA-KF-071", !s.btns.some((x) => /copy link/i.test(x.text)), `${cfg} buttons ${JSON.stringify(s.btns.map((x) => x.text || "(icon)"))}`);
  R("UIA-KF-248", /^INPUT/.test(s.focus), `${cfg} focus on open ${s.focus}`);
  R("UIA-KF-224", s.titles > 0, `${cfg} native title attrs in popover ${s.titles}`);
  R("UIA-KF-140", !!s.trig && (Math.abs(s.trig.w - s.trig.h) > 1 || /opacity-50/.test(s.trig.cls)), `${cfg} trigger ${s.trig ? `${s.trig.w}x${s.trig.h} ${/opacity-50/.test(s.trig.cls) ? "hover:opacity-50" : "no-fade"}` : "none (row is the trigger)"}`);
  // 142 · a refused load marks the field
  const inp = pop(p).locator("input");
  await inp.fill("@@not-base64@a"); await inp.press("Enter"); await sleep(500);
  const e = await p.evaluate(() => { const i = document.querySelector("[data-reka-popper-content-wrapper] [role=dialog] input"); const ids = (i?.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
    return { inv: i?.getAttribute("aria-invalid"), msg: ids.map((id) => document.getElementById(id)?.textContent.trim()).filter(Boolean).join(" | ") }; });
  await p.screenshot({ path: `${FR}share-error-${cfg}.png` });
  R("UIA-KF-142", e.inv !== "true" || !e.msg, `${cfg} aria-invalid=${e.inv} described="${e.msg}"`);
  // 249 + 070 · a successful load clears the field and dismisses the whole menu stack
  const url = await p.evaluate(async () => { const { encodeStateToHash } = { encodeStateToHash: null }; return location.href; });
  await inp.fill(""); await p.evaluate(() => navigator.clipboard.writeText(""));
  const copyBtn = pop(p).locator("button").filter({ hasText: /copy link/i });
  if (await copyBtn.count()) await copyBtn.first().click(); else await pop(p).locator('button[title="Copy share link"]').first().click();
  await sleep(900);
  const afterCopy = await p.evaluate(() => ({ menu: !!document.querySelector("[role=menu]"), pe: getComputedStyle(document.body).pointerEvents, focus: document.activeElement?.getAttribute("aria-label") || document.activeElement?.className?.toString().slice(0, 40) }));
  const link = await p.evaluate(() => navigator.clipboard.readText());
  R("UIA-KF-070", afterCopy.menu || afterCopy.pe === "none" || afterCopy.focus !== "@mbabb menu", `${cfg} after copy: menu ${afterCopy.menu} body-pe ${afterCopy.pe} focus ${afterCopy.focus}`);
  if (!(await pop(p).count())) await openShare(p);
  await pop(p).locator("input").fill(link); await pop(p).locator("input").press("Enter"); await sleep(1200);
  const afterLoad = await p.evaluate(() => ({ menu: !!document.querySelector("[role=menu]"), pe: getComputedStyle(document.body).pointerEvents, focus: document.activeElement?.getAttribute("aria-label") }));
  R("UIA-KF-070", afterLoad.menu || afterLoad.pe === "none" || afterLoad.focus !== "@mbabb menu", `${cfg} after load (link ${link.length} ch): menu ${afterLoad.menu} body-pe ${afterLoad.pe} focus ${afterLoad.focus}`);
  await p.keyboard.press("Escape"); await sleep(300); await p.keyboard.press("Escape"); await sleep(300);
  await openShare(p); const val = await pop(p).locator("input").inputValue().catch(() => "(no field)");
  R("UIA-KF-249", val !== "", `${cfg} field on reopen after a load: "${val.slice(0, 40)}"`);
  await ctx.close();

  // ── B · Keyboard shortcuts ─────────────────────────────────────────────────
  ({ ctx, p } = await page(w, h, theme));
  await openMenu(p); await p.locator("[role=menu] [role=menuitem]").filter({ hasText: "Keyboard shortcuts" }).first().click(); await sleep(900);
  await p.screenshot({ path: `${FR}shortcuts-open-${cfg}.png` });
  const k = await p.evaluate(() => {
    const d = document.querySelector("[role=dialog]:has(dl)"); const port = d.querySelector("[role=region]");
    const h3 = d.querySelector("h3"); const hs = getComputedStyle(h3); const row = d.querySelector("dl > div"); const rs = getComputedStyle(row);
    const del = [...d.querySelectorAll("dl > div")].find((x) => /delete/i.test(x.querySelector("dt")?.textContent || ""));
    return { title: d.querySelector("h2")?.textContent.trim(), desc: d.querySelector("p")?.textContent.trim().replace(/\s+/g, " "), dSH: d.scrollHeight, dCH: d.clientHeight,
      pSH: port.scrollHeight, pCH: port.clientHeight, pPos: getComputedStyle(port).position, h3pos: hs.position, h3bg: hs.backgroundColor, rowRadius: rs.borderRadius, rowBg: rs.backgroundColor,
      focus: document.activeElement?.getAttribute("role") || document.activeElement?.tagName, sbw: getComputedStyle(port).scrollbarWidth, sbg: getComputedStyle(port).scrollbarGutter,
      delCaps: del ? [...del.querySelectorAll("kbd")].map((x) => x.textContent.trim()) : null };
  });
  R("UIA-KF-016", k.dSH > k.dCH + 1, `${cfg} dialog scroll ${k.dSH}/${k.dCH} port position ${k.pPos}`);
  R("UIA-KF-072", k.h3pos === "sticky" && k.h3bg !== "rgba(0, 0, 0, 0)", `${cfg} heading ${k.h3pos} bg ${k.h3bg}`);
  R("UIA-KF-139", k.focus === "region" || k.title === "Keyboard Shortcuts", `${cfg} focus on open ${k.focus} · title "${k.title}"`);
  if (w >= 1024) R("UIA-KF-147", k.pSH > k.pCH + 1, `${cfg} port ${k.pSH}/${k.pCH} (all rows visible without scrolling)`);
  R("UIA-KF-250", k.sbw !== "none" && !/stable/.test(k.sbg), `${cfg} port scrollbar-width ${k.sbw} gutter ${k.sbg}`);
  R("UIA-KF-251", /register/.test(k.desc) || k.title !== "Keyboard shortcuts" || k.rowRadius !== "0px", `${cfg} desc "${k.desc}" · row radius ${k.rowRadius} bg ${k.rowBg}`);
  R("UIA-KF-145", !!k.delCaps && new Set(k.delCaps).size !== k.delCaps.length | k.delCaps.includes("Backspace") && k.delCaps.includes("⌫"), `${cfg} Delete caps ${JSON.stringify(k.delCaps)}`);
  await p.locator("[role=dialog]:has(dl) [role=region]").first().evaluate((e) => e.scrollTo(0, e.scrollHeight)); await sleep(300);
  await p.mouse.wheel(0, 1200); await sleep(400);
  const k2 = await p.evaluate(() => { const d = document.querySelector("[role=dialog]:has(dl)"); return { dST: d.scrollTop, closeY: d.querySelector("button[aria-label], button:has(.sr-only)")?.getBoundingClientRect().top ?? null }; });
  await p.screenshot({ path: `${FR}shortcuts-wheel-end-${cfg}.png` });
  R("UIA-KF-016", k2.dST > 0, `${cfg} after wheel past end: dialog scrollTop ${k2.dST}`);
  await ctx.close();
}
await b.close(); fs.writeFileSync(`${OUT}overlays-${RUN}.txt`, lines.join("\n") + "\n");
