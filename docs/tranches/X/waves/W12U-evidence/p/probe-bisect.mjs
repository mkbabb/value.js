// SERVED MODEL: claude-opus-5-5
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const MODE = process.env.MODE ?? "normal";
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.addInitScript(() => localStorage.setItem("vueuse-color-scheme", "dark"));
await p.goto((process.env.ORIGIN ?? "http://localhost:9873") + "/#/?space=lab");
await p.waitForTimeout(6000);
if (MODE !== "normal") await p.evaluate((pref) => {
  const orig = CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty = function (n, v, pr) { if (this === document.documentElement.style && pref.some((x) => n.startsWith(x))) return; return orig.call(this, n, v, pr); };
}, MODE === "freeze-root" ? ["--"] : MODE.split(","));
const cdp = await p.context().newCDPSession(p);
const ev = []; cdp.on("Tracing.dataCollected", (e) => ev.push(...e.value));
const CH = process.env.CH ?? "L"; const s = CH === "surface" ? p.locator(".spectrum-picker").first() : p.getByRole("slider", { name: CH + " channel" }).first();
const bb = await s.boundingBox();
await p.mouse.move(bb.x + bb.width * 0.1, bb.y + bb.height / 2); await p.mouse.down();
await cdp.send("Tracing.start", { categories: "devtools.timeline,v8.execute,disabled-by-default-devtools.timeline", transferMode: "ReportEvents" });
const N = 40;
for (let i = 0; i < N; i++) { await p.mouse.move(bb.x + bb.width * (0.1 + (i % 20) * 0.04), CH === "surface" ? bb.y + bb.height * (0.15 + (i % 20) * 0.035) : bb.y + bb.height / 2); await p.waitForTimeout(30); }
const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r)); await cdp.send("Tracing.end"); await done;
await p.mouse.up();
const main = new Set(ev.filter((e) => e.ph === "M" && e.args?.name === "CrRendererMain").map((e) => e.tid));
const by = new Map(); const cnt = new Map();
for (const e of ev) if (e.ph === "X" && main.has(e.tid) && e.dur) { by.set(e.name, (by.get(e.name) ?? 0) + e.dur); cnt.set(e.name,(cnt.get(e.name)??0)+1); }
const els = ev.filter(e => e.name === "UpdateLayoutTree" && main.has(e.tid) && e.args?.elementCount).map(e => e.args.elementCount);
console.log([...by.entries()].sort((a,b)=>b[1]-a[1]).slice(0,18).map(([n,d])=>n+"="+(d/1000).toFixed(0)+"/"+cnt.get(n)).join(" "));
console.log(MODE, ["UpdateLayoutTree","Layout","Paint","FunctionCall","RunTask"].map(n => `${n}=${((by.get(n)??0)/1000).toFixed(0)}ms/${cnt.get(n)??0}`).join(" "), "avgElems", els.length ? Math.round(els.reduce((a,b)=>a+b,0)/els.length) : "?");
await b.close();
