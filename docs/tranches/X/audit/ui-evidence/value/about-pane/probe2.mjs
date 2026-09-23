// Probe 2 (read-only): bold rendering, 390 KaTeX overflow, selector row values. node probe2.mjs [base]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const BASE = process.argv[2] ?? "http://localhost:9000";
const repo = "/Users/mkbabb/Programming/value.js";
const out = { sha: execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${repo} status --porcelain`).toString().trim().split("\n").filter(Boolean).length };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto(`${BASE}/#/`, { waitUntil: "load", timeout: 90000 });
await p.waitForSelector(".about-card .markdown-wrapper", { timeout: 60000 });
await p.waitForTimeout(1500);
out.bold = await p.evaluate(async () => {
  await document.fonts.ready;
  const s = document.querySelector(".about-card .markdown-body li > strong");
  if (!s) return null;
  const w700 = s.getBoundingClientRect().width; s.style.fontWeight = "400"; const w400 = s.getBoundingClientRect().width; s.style.fontWeight = "";
  const faces = [...document.fonts].filter((f) => /Jakarta/.test(f.family)).map((f) => `${f.family}|${f.weight}|${f.status}`);
  return { text: s.textContent, fw: getComputedStyle(s).fontWeight, w700, w400, faces: faces.slice(0, 8) };
});
out.katex = await p.evaluate(() => [...document.querySelectorAll(".about-card .katex-display")].map((k) => { const box = k.parentElement; const cs = getComputedStyle(box); return { sw: box.scrollWidth, cw: box.clientWidth, ovx: cs.overflowX, scrollbarW: cs.scrollbarWidth, mask: cs.maskImage?.slice(0, 40), tex: (k.querySelector("annotation")?.textContent || "").slice(0, 60) }; }).filter((k) => k.sw > k.cw + 1));
const trig = p.locator(".about-card [aria-label='Select color space']");
await trig.scrollIntoViewIfNeeded(); await trig.click(); await p.waitForTimeout(700);
out.rows = await p.evaluate(() => [...document.querySelectorAll("[role=option]")].map((o) => o.textContent.replace(/\s+/g, " ").trim().slice(0, 70)));
await p.screenshot({ path: new URL("./390-light-10-selector-open-about.png", import.meta.url).pathname });
out.selectorRect = await p.evaluate(() => { const c = document.querySelector("[role=listbox]"); const r = c?.getBoundingClientRect(); return r && { x: r.x, w: r.width, right: r.right, y: r.y, h: r.height }; });
console.log(JSON.stringify(out, null, 1));
await b.close();
