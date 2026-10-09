// SERVED MODEL: claude-opus-5-5
// scratch: does .glass-dock become visible in bundled chromium (the smoke project's engine)? UNDO=1 lifts the m2 containment.
import { chromium } from "@playwright/test";
const b = await chromium.launch({ channel: process.env.CH || "chromium", headless: true, args: process.env.SW ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] : [] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
if (process.env.UNDO) await ctx.addInitScript(() => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = ".pane-wrapper{contain:none !important}"; document.head.append(s); }));
const p = await ctx.newPage(); const t0 = Date.now();
await p.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 90000 });
try { await p.locator(".glass-dock").first().waitFor({ timeout: 45000 }); console.log("visible after", Date.now() - t0, "ms"); }
catch { console.log("RAF", await p.evaluate(() => new Promise((r) => { let n = 0; const f = () => { n++; requestAnimationFrame(f); }; requestAnimationFrame(f); setTimeout(() => r(`${n} frames/3s wall`), 3000); })), await p.evaluate(() => document.querySelector(".glass-dock").closest("nav").getAnimations({ subtree: true }).slice(0, 3).map((a) => `${a.constructor.name}:${a.transitionProperty ?? a.animationName}:${Math.round(a.currentTime)}/${a.effect.getComputedTiming().endTime}`).join(" "))); console.log("HIDDEN", await p.evaluate(() => { const d = document.querySelector(".glass-dock"); let a = d, o = []; while (a) { const s = getComputedStyle(a); if (s.visibility !== "visible" || s.display === "none" || s.opacity === "0") o.push(`${a.tagName}.${String(a.className).split(" ").slice(0, 3).join(".")} vis=${s.visibility} op=${s.opacity}`); a = a.parentElement; } return o.join(" | ") + " anims=" + (d.closest("nav,header,div")?.getAnimations({ subtree: true }).map((x) => x.animationName + ":" + x.playState + ":" + x.effect.getTiming().iterations).join(",")); })); }
await b.close();
