// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube · UIA-KF-158: choosing Matrix Controls while the cube plays (usage: node matrixfacet.mjs <baseUrl>)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(process.argv[2] + "/#/cube"); await p.waitForSelector(".cube-side"); await p.waitForTimeout(2500);
const st = () => p.evaluate(() => ({ play: !!document.querySelector("button[aria-label='Pause animation']"), cube: getComputedStyle(document.querySelector(".cube")).transform.slice(0, 40) }));
console.log("rest", JSON.stringify(await st()));
const clickName = (n) => p.evaluate((n) => [...document.querySelectorAll("button,[role=option]")].filter((e) => e.getBoundingClientRect().width > 0).find((e) => (e.getAttribute("aria-label") || e.textContent).trim() === n).click(), n);
await p.getByRole("combobox", { name: "Select animation" }).click(); await p.waitForTimeout(400);
console.log(await p.evaluate(() => [...document.querySelectorAll("[role=option]")].map((e) => e.textContent.trim().slice(0, 30)).join(" | ")));
await p.getByRole("option", { name: "Matrix" }).click(); await p.waitForTimeout(800); console.log("matrix ch", JSON.stringify(await st()));
console.log(await p.evaluate(() => [...document.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 30)).slice(0, 8).join(" | ")));
const trace = p.evaluate(() => new Promise((res) => { const s = []; const t0 = performance.now(); const a = (sel) => { const m = new DOMMatrix(getComputedStyle(document.querySelector(sel)).transform); return Math.round(Math.acos(Math.max(-1, Math.min(1, (m.m11 + m.m22 + m.m33 - 1) / 2))) * 180 / Math.PI); }; const f = () => { s.push(Math.round(performance.now() - t0) + ":" + a(".cube") + "/" + a(".cube-pose") + "/" + a(".cube-bob")); if (performance.now() - t0 < 700) setTimeout(f, 50); else res(s.join(" ")); }; f(); }));
await p.waitForTimeout(200);
await p.evaluate(() => [...document.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0).find((e) => (e.getAttribute("aria-label") || e.textContent).trim() === "Matrix Controls").click()); await p.waitForTimeout(800); console.log("trace", await trace); console.log("matrix controls", JSON.stringify(await st())); await p.waitForTimeout(1000); console.log("matrix controls +1s", JSON.stringify(await st()));
const moving = await p.evaluate(() => new Promise((res) => { const s = new Set(); const t0 = performance.now(); const f = () => { s.add(getComputedStyle(document.querySelector(".cube")).transform + getComputedStyle(document.querySelector(".cube-pose")).transform); if (performance.now() - t0 < 600) requestAnimationFrame(f); else res(s.size); }; requestAnimationFrame(f); })); console.log("distinct poses over 600ms", moving);
await b.close();
