// Supplement: steps authoring (exact `steps` tile), chip state paints (rest/hover/pressed).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();
const legs = (process.argv[2] ?? "1440-light,390-light,1440-dark").split(",");
const out = [];
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const leg of legs) {
  const [w, theme] = leg.split("-"); const vp = w === "390" ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const ctx = await b.newContext({ viewport: vp, colorScheme: theme, hasTouch: w === "390" });
  await ctx.addInitScript(`(() => { try { if (sessionStorage.getItem('__a')) return; sessionStorage.setItem('__a','1'); localStorage.clear(); localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(theme)}); } catch (e) {} })();`);
  const p = await ctx.newPage(); const errs = []; p.on("pageerror", e => errs.push(String(e).slice(0, 200)));
  const rec = { leg, sha, dirty, errs };
  try {
    await p.goto("http://localhost:9000/#/gradient", { waitUntil: "commit", timeout: 240000 });
    const panel = p.locator(".easing-panel"); await panel.waitFor({ timeout: 90000 }); await p.waitForTimeout(2500);
    const paint = (sel) => p.locator(sel).filter({ visible: true }).first().evaluate(el => { const cs = getComputedStyle(el); return { bg: cs.backgroundColor, bs: cs.boxShadow.slice(0, 120), bc: cs.borderColor, state: el.getAttribute("data-state") }; });
    rec.pressedLinear = await paint(".specimen-tile[data-specimen='linear']");
    rec.restEase = await paint(".specimen-tile[data-specimen='ease']");
    await p.locator(".specimen-tile[data-specimen='ease']").filter({ visible: true }).first().hover(); await p.waitForTimeout(400);
    rec.hoverEase = await paint(".specimen-tile[data-specimen='ease']");
    await p.locator("button[aria-label='Author a custom curve']").filter({ visible: true }).first().click(); await p.waitForTimeout(700);
    const st = p.locator(".specimen-tile[data-specimen='steps']").filter({ visible: true }).first();
    await st.click(); await p.waitForTimeout(1000);
    await panel.evaluate(el => el.scrollIntoView({ block: "start" })); await p.evaluate(() => window.scrollBy(0, -60)); await p.waitForTimeout(400);
    await p.screenshot({ path: OUT + `${leg}-10-authoring-steps.png` }); await panel.screenshot({ path: OUT + `${leg}-10-authoring-steps-el.png` });
    rec.stepsText = await p.locator("[data-testid=easing-picker]").filter({ visible: true }).first().innerText();
    rec.head = await p.locator(".interval-head").first().innerText();
    rec.readout = await p.locator(".readout-rail code").filter({ visible: true }).first().innerText();
    rec.ctrls = await p.locator("[data-testid=easing-picker]").filter({ visible: true }).first().evaluate(el => [...el.querySelectorAll("button,[role=slider],[role=combobox]")].filter(e => e.offsetParent).map(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return `${e.getAttribute("role") || e.tagName}|${e.getAttribute("aria-label") || e.innerText.trim().slice(0, 20)}|${Math.round(r.width)}x${Math.round(r.height)}|r=${cs.borderRadius}|fs=${cs.fontSize}`; }));
  } catch (e) { errs.push("SCRIPT " + String(e).slice(0, 200)); }
  out.push(rec); await ctx.close();
}
await b.close();
writeFileSync(OUT + "supp-log.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1));
