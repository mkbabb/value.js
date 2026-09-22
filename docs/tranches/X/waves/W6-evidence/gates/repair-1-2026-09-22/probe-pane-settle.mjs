// SERVED MODEL: claude-opus-5-5[1m] — X-W6 Repair 1 probe (read-only against a vite dev server; argv[2] = origin)
import { chromium } from "@playwright/test";
const origin = process.argv[2];
const b = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto(origin + "/");
const vs = p.getByRole("combobox", { name: "Select view" });
await vs.click({ timeout: 30000 });
await p.getByRole("option", { name: "Gradient" }).click();
for (const t of [1000, 4000, 10000]) {
  await p.waitForTimeout(t === 1000 ? 1000 : t - 1000);
  const r = await p.evaluate(() => [".pane-container", ".pane-wrapper", ".pane-wrapper > *"].flatMap(s => [...document.querySelectorAll(s)]).filter(el => getComputedStyle(el).transform !== "none").map(el => `${el.tagName}.${String(el.className).slice(0,80)} tf=${getComputedStyle(el).transform} anims=${el.getAnimations().map(a=>(a.animationName||a.transitionProperty)+":"+a.playState+":"+Math.round(a.currentTime??-1)).join(",")}`));
  console.log(t, JSON.stringify(r).slice(0, 900));
}
await b.close();
