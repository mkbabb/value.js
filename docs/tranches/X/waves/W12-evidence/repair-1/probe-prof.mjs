// SERVED MODEL: claude-opus-5-5
// X-W12 Repair 1 probe (read-only). BASE=http://localhost:<port> node probe-prof.mjs
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: false, args: ["--window-position=2600,200"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(() => localStorage.setItem("vueuse-color-scheme", "dark"));
if (process.env.BLOCK) await page.addInitScript((re) => {
    const orig = CSSStyleDeclaration.prototype.setProperty;
    const rx = new RegExp(re);
    let armed = false;
    setTimeout(() => (armed = true), 6000);
    CSSStyleDeclaration.prototype.setProperty = function (n, v, p) {
        if (armed && this === document.documentElement.style && rx.test(n)) return;
        return orig.call(this, n, v, p);
    };
}, process.env.BLOCK);
await page.goto((process.env.BASE ?? "http://localhost:9000") + "/#/?space=lab");
const target = page.getByRole("slider", { name: `${process.env.C ?? "L"} channel` }).first();
await target.waitFor({ state: "visible", timeout: 30000 });
await page.waitForTimeout(Number(process.env.SETTLE ?? 3000));
const b = await target.boundingBox();
const y = b.y + b.height / 2, x0 = b.x + b.width * 0.08, x1 = b.x + b.width * 0.92;
await page.mouse.move(x0, y);
await page.mouse.down();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Profiler.enable");
await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
await cdp.send("Profiler.start");
const start = Date.now();
let moves = 0;
while (Date.now() - start < 2000) {
    const u = ((Date.now() - start) / 2000) * 2;
    const f = u <= 1 ? u : 2 - u;
    await page.mouse.move(x0 + (x1 - x0) * f, y);
    moves++;
}
const { profile } = await cdp.send("Profiler.stop");
await page.mouse.up();
const dt = profile.timeDeltas ?? [];
const self = new Map();
(profile.samples ?? []).forEach((id, j) => self.set(id, (self.get(id) ?? 0) + (dt[j] ?? 0)));
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const incl = new Map();
function total(n) {
    let t = self.get(n.id) ?? 0;
    for (const c of n.children ?? []) t += total(byId.get(c));
    const cf = n.callFrame;
    const file = (cf.url.split("/").pop() ?? "").split("?")[0];
    if (/\.(vue|ts)$/.test(file) && !/vue\.runtime|node_modules/.test(cf.url)) {
        const k = `${cf.functionName || "(anon)"}@${file}:${cf.lineNumber + 1}`;
        // count only outermost frame for a key along a stack
        n.__t = t;
        incl.set(k, (incl.get(k) ?? 0) + t);
    }
    return t;
}
const root = profile.nodes[0];
total(root);
const selfBy = new Map();
for (const n of profile.nodes) {
    const cf = n.callFrame;
    if (["(idle)", "(root)", "(program)"].includes(cf.functionName)) continue;
    const k = `${cf.functionName || "(anon)"}@${(cf.url.split("/").pop() ?? "").split("?")[0]}:${cf.lineNumber + 1}`;
    selfBy.set(k, (selfBy.get(k) ?? 0) + (self.get(n.id) ?? 0));
}
let busy = 0; for (const [id, t] of self) { const cf = byId.get(id).callFrame; if (cf.functionName !== "(idle)") busy += t; }
console.log(`moves=${moves} busy=${(busy / 1000).toFixed(0)}ms`);
console.log("INCL " + [...incl.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, us]) => `${k}=${(us / 1000).toFixed(0)}`).join("\n     "));
console.log("SELF " + [...selfBy.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, us]) => `${k}=${(us / 1000).toFixed(0)}`).join(" · "));
await browser.close();
