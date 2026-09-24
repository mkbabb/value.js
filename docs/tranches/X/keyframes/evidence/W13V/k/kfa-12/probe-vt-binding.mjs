// SERVED MODEL: claude-opus-5-5
// Probe: is kf's viewTransition() actually reaching the native startViewTransition
// on the served page? The hook preserves NATIVE semantics (an unbound call throws
// "Illegal invocation" exactly as the platform does) — it only records `this`.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const kf = { head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim() };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.addInitScript(() => {
    window.__calls = [];
    const orig = Document.prototype.startViewTransition;
    Document.prototype.startViewTransition = function (arg) {
        const rec = { t: performance.now(), thisIsDocument: this === document, argKind: typeof arg, stack: new Error().stack.split("\n").slice(1, 5).join(" | ") };
        window.__calls.push(rec);
        if (!(this instanceof Document)) { rec.threw = "Illegal invocation"; throw new TypeError("Illegal invocation"); }
        const vt = orig.call(this, arg);
        rec.native = true;
        return vt;
    };
});
const errs = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 200)); });
await page.goto("http://localhost:5173/#/cube");
await page.waitForTimeout(3500);
// Raw platform fact, independent of the hook: unbound native call.
const raw = await page.evaluate(() => {
    const s = Object.getOwnPropertyDescriptor(Document.prototype, "startViewTransition");
    return { typeofOnDocument: typeof document.startViewTransition };
});
const combo = page.getByRole("combobox", { name: "Scene" });
await page.locator('[aria-label="Scene"]:visible').first().hover();
await combo.waitFor({ state: "visible" });
await page.waitForTimeout(400);
await combo.click();
await page.getByRole("option", { name: "Amiga", exact: true }).click();
await page.waitForTimeout(2500);
const res = await page.evaluate(() => ({ calls: window.__calls, hash: location.hash }));
// Control: a bound native call on the same page DOES run a VT.
const control = await page.evaluate(async () => {
    const vt = document.startViewTransition(() => {});
    await vt.ready.catch(() => {});
    const n = document.getAnimations().filter((a) => a.effect?.pseudoElement?.includes("view-transition")).length;
    await vt.finished.catch(() => {});
    return { vtPseudoAnimsWhenBound: n };
});
const unboundNative = await page.evaluate(() => {
    const s = Object.getPrototypeOf(Document.prototype.startViewTransition) && HTMLDocument.prototype.startViewTransition;
    return "n/a (hooked)";
});
const out = { kf, raw, res, control, errs: errs.slice(0, 10) };
fs.writeFileSync(new URL("./probe-vt-binding.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await b.close();
// Unhooked raw check in a clean context
const b2 = await chromium.launch({ headless: false });
const p2 = await (await b2.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p2.goto("http://localhost:5173/#/cube");
const raw2 = await p2.evaluate(() => { const s = document.startViewTransition; try { s(() => {}); return "no throw"; } catch (e) { return String(e); } });
console.log("UNHOOKED unbound native call:", raw2);
fs.appendFileSync(new URL("./probe-vt-binding.json", import.meta.url), "\n// unhooked unbound native call: " + raw2 + "\n");
await b2.close();
