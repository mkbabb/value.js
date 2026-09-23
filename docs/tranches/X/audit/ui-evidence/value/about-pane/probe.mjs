// Targeted DOM probe for about-pane findings (read-only). node probe.mjs [base]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const BASE = process.argv[2] ?? "http://localhost:9000";
const repo = "/Users/mkbabb/Programming/value.js";
const out = { sha: execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${repo} status --porcelain`).toString().trim().split("\n").filter(Boolean).length };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(`${BASE}/#/`, { waitUntil: "load", timeout: 90000 });
await p.waitForSelector(".about-card .markdown-wrapper", { timeout: 60000 });
await p.waitForTimeout(1500);
out.strong = await p.evaluate(() => [...document.querySelectorAll(".about-card .markdown-body strong")].slice(0, 3).map((e) => { const cs = getComputedStyle(e); const pcs = getComputedStyle(e.parentElement); return { t: e.textContent.slice(0, 30), fw: cs.fontWeight, color: cs.color, parentFw: pcs.fontWeight, parentColor: pcs.color, ts: cs.textShadow, filter: cs.filter, ff: cs.fontFamily.slice(0, 40) }; }));
out.layout = await p.evaluate(() => {
  const card = document.querySelector(".about-card"); const chain = []; let e = card;
  for (let i = 0; i < 6 && e; i++, e = e.parentElement) { const cs = getComputedStyle(e); chain.push({ tag: e.tagName, cls: String(e.className).slice(0, 70), h: Math.round(e.getBoundingClientRect().height), maxH: cs.maxHeight, ovY: cs.overflowY, pos: cs.position }); }
  const picker = document.querySelector("[aria-label='Select color space']")?.closest("[data-slot=card], .card, section");
  return { chain, pickerH: picker ? Math.round(picker.getBoundingClientRect().height) : null, docH: document.documentElement.scrollHeight, cardBg: getComputedStyle(card).backgroundColor, cardCls: card.className };
});
// the selector-trigger focus-ring after a mouse pick
const trig = p.locator(".about-card [aria-label='Select color space']");
await trig.click(); await p.waitForTimeout(500);
await p.locator("[role=option][data-space='lab']").click(); await p.waitForTimeout(700);
out.afterPick = await p.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { active: a.getAttribute("aria-label"), fv: a.matches(":focus-visible"), outline: cs.outlineStyle + " " + cs.outlineWidth, boxShadow: cs.boxShadow.slice(0, 80), border: cs.borderStyle + " " + cs.borderWidth + " " + cs.borderColor, radius: cs.borderRadius }; });
// the graph chip tooltip: content node + role
const chip = p.locator(".about-card .bg-well.rounded-panel").first();
await chip.scrollIntoViewIfNeeded(); await chip.hover(); await p.waitForTimeout(800);
out.tooltip = await p.evaluate(() => [...document.querySelectorAll("[data-slot=tooltip-content], [role=tooltip]")].map((e) => ({ slot: e.getAttribute("data-slot"), role: e.getAttribute("role"), text: e.textContent.trim().slice(0, 60), rect: (({ width, height }) => ({ width, height }))(e.getBoundingClientRect()), display: getComputedStyle(e).display })));
out.chip = await chip.evaluate((e) => ({ cursor: getComputedStyle(e).cursor, tabindex: e.getAttribute("tabindex"), role: e.getAttribute("role"), onclick: typeof e.onclick }));
// sibling inspector (palettes) bounded?
await p.goto(`${BASE}/#/palettes`, { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(4000);
out.palettes = await p.evaluate(() => ({ docH: document.documentElement.scrollHeight, vh: innerHeight }));
console.log(JSON.stringify(out, null, 1));
await b.close();
