// Transport wiring probe: dock Play vs ribbon Play, sampler motion, scrubber presence.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const KF="/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
const snap = (tag) => p.evaluate((tag) => {
  const vis = e => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== "hidden";
  return { tag,
    sampler: [...document.querySelectorAll(".sampler-ball")].map(e => +e.getBoundingClientRect().x.toFixed(1)),
    samplerTf: document.querySelector(".sampler-ball")?.style.transform,
    scrubbers: [...document.querySelectorAll('[aria-label="Scrub animation timeline"]')].map(e => ({ now: e.getAttribute("aria-valuenow"), vis: vis(e), role: e.getAttribute("role"), tag: e.tagName })),
    playBtns: [...document.querySelectorAll("button")].filter(e => /^(Play|Pause)/.test(e.getAttribute("aria-label") || e.innerText.trim())).map(e => ({ l: (e.getAttribute("aria-label") || e.innerText.trim()), vis: vis(e), x: Math.round(e.getBoundingClientRect().x), y: Math.round(e.getBoundingClientRect().y), pressed: e.getAttribute("aria-pressed") })),
    sweepReadout: document.querySelector(".readout-accent")?.innerText,
    readouts: [...document.querySelectorAll(".readout-accent")].map(e=>e.innerText).slice(0,3),
  };
}, tag);
const r = { khead: khead() };
await p.mouse.click(420,420); await p.waitForTimeout(1500);
await p.mouse.move(140,430); await p.mouse.down(); for (let k=0;k<=40;k++){ await p.mouse.move(140+k*7.5,430-k*5.5); await p.waitForTimeout(25);} await p.mouse.up(); await p.waitForTimeout(500);
await p.locator(".preset-cell",{hasText:"Bouncy"}).first().click(); await p.waitForTimeout(800);
await p.evaluate(() => [...document.querySelectorAll("button")].find(b => b.innerText.trim() === "Re-seat" && b.getBoundingClientRect().width)?.click()); await p.waitForTimeout(2600);
await p.mouse.move(1400,880); await p.waitForTimeout(300);
r.s0 = await snap("rest");
await p.click('button[aria-label="Play animation"] >> visible=true');
await p.waitForTimeout(500); r.s1 = await snap("dock play +500");
await p.waitForTimeout(500); r.s2 = await snap("dock play +1000");
// ribbon Play in the pane via JS click
await p.evaluate(() => [...document.querySelectorAll("button")].find(b => b.innerText.trim() === "Play" && b.getBoundingClientRect().width)?.click());
await p.waitForTimeout(500); r.s3 = await snap("ribbon play +500");
await p.waitForTimeout(500); r.s4 = await snap("ribbon play +1000");
fs.writeFileSync(OUT + "probe-transport-after-interactions.json", JSON.stringify(r, null, 1));
console.log(JSON.stringify(r));
await p.screenshot({ path: OUT + "probe-transport-after-interactions.png" });
await b.close();
