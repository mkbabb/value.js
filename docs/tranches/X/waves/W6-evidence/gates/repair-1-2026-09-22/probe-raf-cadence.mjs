// SERVED MODEL: claude-opus-5-5[1m] — X-W6 Repair 1 probe (read-only against a vite dev server; argv[2] = origin)
import { chromium } from "@playwright/test";
const origin = process.argv[2]; const noBlur = process.argv[3] === "noblur";
const b = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto(origin + "/");
await p.locator(".about-card").waitFor({ state: "visible", timeout: 30000 });
if (noBlur) await p.addStyleTag({ content: "*{backdrop-filter:none!important}" });
await p.waitForTimeout(4000);
const cad = () => p.evaluate(() => new Promise(res => { const ts=[]; const t0=performance.now(); const step=(t)=>{ ts.push(Math.round(t-t0)); if(ts.length<8) requestAnimationFrame(step); else res(ts); }; requestAnimationFrame(step); setTimeout(()=>res(ts), 20000); }));
console.log(noBlur ? "noblur" : "asis", "idle rAF@", JSON.stringify(await cad()));
await p.evaluate(() => document.documentElement.style.setProperty("--saved-bg-0", "#ff0000"));
console.log(noBlur ? "noblur" : "asis", "ground-transition rAF@", JSON.stringify(await cad()));
await b.close();
