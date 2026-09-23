import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const logs = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") logs.push(m.type() + ": " + m.text().slice(0, 200)); });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: OUT + "00-fresh-load.png" });
const info = await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const r = (el) => el && (({ x, y, width, height }) => ({ x: Math.round(x), y: Math.round(y), w: Math.round(width), h: Math.round(height) }))(el.getBoundingClientRect());
  const gl = document.createElement("canvas").getContext("webgl2");
  const dbg = gl && gl.getExtension("WEBGL_debug_renderer_info");
  return {
    hash: location.hash,
    renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : null,
    target: r(q(".spring-target")), rail: r(q(".spring-rail")), ball: r(q(".spring-ball")), marker: r(q(".spring-target-marker")),
    ballTf: q(".spring-ball")?.style.transform, markerTf: q(".spring-target-marker")?.style.transform,
    badge: q(".status-badge")?.textContent?.trim(), readout: q(".spring-readout-primary")?.textContent,
    live: q(".spring-target")?.classList.contains("spring-target--live"),
    buttons: [...document.querySelectorAll("button")].map((b) => (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 30)).filter(Boolean).slice(0, 60),
    anims: document.getAnimations().length,
  };
});
console.log(JSON.stringify(info, null, 1));
console.log(logs.slice(0, 10).join("\n"));
await browser.close();
