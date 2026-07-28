// mid-grow screenshot: stale-stamped arrival (clip released) vs healthy arrival
import { webkit } from "playwright";
const b = await webkit.launch();
const _t=120000;
const CLIP = { x: 470, y: 8, width: 560, height: 62 };

// A. stale-stamped: fresh boot on /#/browse, then hash → /#/mix, shot mid-grow
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:9000/#/browse", { waitUntil: "load", timeout: 120000 });
await p.waitForSelector(".glass-dock");
await p.waitForTimeout(5000);
console.log("A pre:", await p.evaluate(() => document.querySelector(".action-bar-toggle-slot").className));
await p.evaluate(() => { location.hash = "#/mix"; });
await p.waitForTimeout(70);
await p.screenshot({ path: "chC-abt-shot-STALE-70ms.png", clip: CLIP });
console.log("A at70:", await p.evaluate(() => {
    const s = document.querySelector(".action-bar-toggle-slot");
    const i = document.querySelector(".action-bar-toggle-inner");
    const btn = document.querySelector(".dock-tools-btn");
    return { cls: s.className, ov: getComputedStyle(i).overflow, track: getComputedStyle(s).gridTemplateColumns,
             clipW: +i.getBoundingClientRect().width.toFixed(1), paintW: +btn.getBoundingClientRect().width.toFixed(1) };
}));
await p.waitForTimeout(1500);
await p.screenshot({ path: "chC-abt-shot-STALE-rest.png", clip: CLIP });

// B. healthy: from the settled /#/mix, depart to /#/browse (settled drops), come back
await p.evaluate(() => { location.hash = "#/browse"; });
await p.waitForTimeout(1200);
console.log("B pre:", await p.evaluate(() => document.querySelector(".action-bar-toggle-slot").className));
await p.evaluate(() => { location.hash = "#/mix"; });
await p.waitForTimeout(70);
await p.screenshot({ path: "chC-abt-shot-HEALTHY-70ms.png", clip: CLIP });
console.log("B at70:", await p.evaluate(() => {
    const s = document.querySelector(".action-bar-toggle-slot");
    const i = document.querySelector(".action-bar-toggle-inner");
    const btn = document.querySelector(".dock-tools-btn");
    return { cls: s.className, ov: getComputedStyle(i).overflow, track: getComputedStyle(s).gridTemplateColumns,
             clipW: +i.getBoundingClientRect().width.toFixed(1), paintW: +btn.getBoundingClientRect().width.toFixed(1) };
}));
await b.close();
