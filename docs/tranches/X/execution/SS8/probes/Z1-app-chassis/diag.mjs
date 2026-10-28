// SERVED MODEL: claude-opus-5-5 — Z1 diag: does ORIGIN boot (console errors, dock presence)?
import { chromium } from "playwright";
import { ORIGIN, save, EVID } from "./lib.mjs";
const b = await chromium.launch({ headless: true });
try { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    try { const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(String(e).slice(0, 300))); p.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 300)); });
        await p.goto(`${ORIGIN}/#/`, { waitUntil: "load", timeout: 180000 }); await p.waitForTimeout(8000);
        const o = await p.evaluate(() => ({ dock: document.querySelectorAll(".glass-dock").length, nav: document.querySelector("nav")?.innerHTML.length ?? -1, main: (document.querySelector("main")?.innerText ?? "").length, app: document.getElementById("app")?.innerHTML.length ?? -1 }));
        await p.screenshot({ path: EVID + "r2-diag-9420.png" });
        const out = { ORIGIN, ...o, errs: errs.slice(0, 12) }; save("r2-diag-9420.json", out); console.log(JSON.stringify(out).slice(0, 2000));
    } finally { await ctx.close(); } } finally { await b.close(); }
