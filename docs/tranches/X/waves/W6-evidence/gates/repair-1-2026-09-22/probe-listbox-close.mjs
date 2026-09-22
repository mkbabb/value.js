// SERVED MODEL: claude-opus-5-5[1m] — X-W6 Repair 1 probe (read-only against a vite dev server; argv[2] = origin)
import { chromium } from "@playwright/test";
const origin = process.argv[2];
const b = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto(origin + "/");
const card = p.locator(".about-card");
await card.waitFor({ state: "visible", timeout: 30000 });
const trig = card.getByRole("combobox", { name: "Select color space" });
const labels = ["Display P3", "HSL", "Lab", "OKLCh", "XYZ", "HWB", "Rec. 2020", "sRGB Linear", "Kelvin", "RGB"];
let stuck = 0;
for (const label of labels) {
  await trig.click();
  const lb = p.getByRole("listbox");
  await lb.waitFor({ state: "visible" });
  const opt = lb.getByRole("option", { name: label, exact: true });
  if (!(await opt.count())) { console.log("no option", label); await p.keyboard.press("Escape"); await p.waitForTimeout(500); continue; }
  await opt.click();
  const t0 = Date.now();
  let hidden = false;
  try { await lb.waitFor({ state: "hidden", timeout: 8000 }); hidden = true; } catch {}
  const info = hidden ? "" : await p.evaluate(() => [...document.querySelectorAll('[role="listbox"]')].map(el => {
    const chain = []; let n = el; for (let i=0;i<5 && n;i++){ const cs=getComputedStyle(n); chain.push(`${n.tagName}.${(n.className||"").toString().slice(0,60)} ds=${n.getAttribute("data-state")} op=${cs.opacity} anim=${cs.animationName}|${cs.animationDuration}|${cs.animationPlayState} tr=${cs.transitionProperty}|${cs.transitionDuration} anims=${n.getAnimations().map(a=>(a.animationName||a.transitionProperty)+":"+a.playState+":"+Math.round(a.currentTime??-1)).join(",")}`); n=n.parentElement; }
    return chain.join("\n     ");
  }).join("\n  --\n  "));
  if (!hidden) stuck++;
  console.log(label, "hidden:", hidden, Date.now() - t0, "ms", info ? "\n  " + info : "");
  if (!hidden) { await p.keyboard.press("Escape"); await p.waitForTimeout(1000); }
}
console.log("stuck", stuck);
await b.close();
