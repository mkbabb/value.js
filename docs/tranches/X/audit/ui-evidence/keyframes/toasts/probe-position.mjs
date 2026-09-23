// toaster positioning probe — READ-ONLY; is the sonner viewport fixed, and is sonner's stylesheet loaded?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const out = { tree: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim() + "+" + execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length + "dirty", runs: {} };
const b = await chromium.launch({ headless: false });
for (const [vp, VP] of [["1440", { width: 1440, height: 900 }], ["390", { width: 390, height: 844 }]]) {
  const ctx = await b.newContext({ viewport: VP, deviceScaleFactor: 2, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  await page.evaluate(() => navigator.clipboard.writeText("x"));
  // fire a toast through the app's own ribbon path is covered in capture.mjs; here read structure right after a share error
  const hover = async () => { const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1100); };
  await hover(); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(800); await page.locator("[aria-label='Share animation']").first().click(); await page.waitForTimeout(900);
  await page.getByLabel("Share URL or hash to load").first().fill("@@bad@@"); await page.keyboard.press("Enter"); await page.waitForTimeout(700);
  out.runs[vp] = await page.evaluate(() => {
    const ol = document.querySelector("[data-sonner-toaster]"); const t = document.querySelector("[data-sonner-toast]"); const cs = getComputedStyle(ol); const ct = getComputedStyle(t);
    const sheets = [...document.styleSheets]; let sonnerRules = 0; for (const s of sheets) { try { for (const r of s.cssRules) if ((r.cssText || "").includes("data-sonner-toaster")) sonnerRules++; } catch {} }
    const chain = []; let e = ol; while (e) { chain.push(e.tagName + (e.id ? "#" + e.id : "")); e = e.parentElement; }
    return { olPosition: cs.position, olBottom: cs.bottom, olRight: cs.right, olZ: cs.zIndex, olDisplay: cs.display, olListStyle: cs.listStyleType, toastPosition: ct.position, toastTransform: ct.transform, toastShadowFull: ct.boxShadow, sonnerRuleCount: sonnerRules, chain, docScrollH: document.documentElement.scrollHeight, innerH: innerHeight, htmlOverflow: getComputedStyle(document.documentElement).overflow, bodyOverflow: getComputedStyle(document.body).overflow, toastRect: t.getBoundingClientRect().toJSON(), inViewport: t.getBoundingClientRect().top < innerHeight, shadowLgToken: getComputedStyle(document.documentElement).getPropertyValue("--shadow-lg").trim().slice(0, 120) };
  });
  // can the user even scroll to it?
  await page.mouse.move(VP.width / 2, VP.height / 2); await page.mouse.wheel(0, 2000); await page.waitForTimeout(500);
  out.runs[vp].afterWheel = await page.evaluate(() => ({ scrollY, top: document.querySelector("[data-sonner-toast]")?.getBoundingClientRect().top }));
  await page.screenshot({ path: OUT + `11-FULLPAGE-error-${vp}.png`, fullPage: true });
  await ctx.close();
}
writeFileSync(OUT + "probe-position.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1)); await b.close();
