// Does an edit keystroke in card 1 scroll the editor list away from the edited card? (no End key, caret placed by click)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "load" }); await p.waitForTimeout(4000);
await p.evaluate(() => { const sec = [...document.querySelectorAll(".keyframes-section")].find(s => s.offsetParent); sec.setAttribute("data-a", 1); sec.scrollIntoView({ block: "start" }); });
const pre = p.locator('[data-a] pre[contenteditable]').nth(1);
await pre.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
const box = await pre.boundingBox(); console.log("hit", await p.evaluate(([x,y]) => { const e = document.elementFromPoint(x,y); return e.tagName + "." + String(e.className).slice(0,60); }, [box.x + 60, box.y + box.height / 2])); await pre.click(); await p.waitForTimeout(300);
const st = () => p.evaluate(() => { const sc = document.querySelector("[data-a] .keyframes-editor-scroll"); const a = document.activeElement; const pres=[...document.querySelectorAll("[data-a] pre[contenteditable]")];
  return { top: Math.round(sc.scrollTop), max: sc.scrollHeight - sc.clientHeight, active: a.tagName + (pres.indexOf(a) >= 0 ? "#pre" + pres.indexOf(a) : ""), txt1: pres[1]?.innerText.slice(0, 40), sel: getSelection().anchorOffset }; });
console.log("before", JSON.stringify(await st()));
await p.keyboard.type("0");
for (const t of [50, 150, 300, 600, 1200]) { await p.waitForTimeout(t === 50 ? 50 : 100 + t / 3); console.log("after+", t, JSON.stringify(await st())); }
await b.close();
