// B03 · U — BlobPane BPC-1 engine read: does a membrane write reach the GPU? Hooks every uniform* call (by
// uniform NAME via getUniformLocation) and every UNIFORM_BUFFER bufferData/bufferSubData payload, snapshots
// before/after each slider write (idle arm, loop live), and diffs. Plus the pane-count threshold bisect.
// One chromium browser; one context per cell.
import { chromium } from "playwright";
import { BASE, save } from "./lib.mjs";

const INIT = () => {
    const U = (window.__u = {}); window.__ubo = {};
    for (const P of [window.WebGL2RenderingContext?.prototype, window.WebGLRenderingContext?.prototype]) {
        if (!P) continue;
        const gl = P.getUniformLocation;
        P.getUniformLocation = function (prog, name) { const loc = gl.call(this, prog, name); if (loc) loc.__name = name; return loc; };
        for (const fn of Object.getOwnPropertyNames(P).filter((n) => /^uniform(\d|Matrix)/.test(n))) {
            const o = P[fn];
            P[fn] = function (loc, ...a) { if (loc?.__name) U[loc.__name] = Array.from(a.flat ? a.flat(2) : a).map((v) => (typeof v === "number" ? +v.toFixed(5) : ArrayBuffer.isView(v) ? Array.from(v).map((x) => +x.toFixed(5)) : v)).flat(); return o.call(this, loc, ...a); };
        }
        for (const fn of ["bufferData", "bufferSubData"]) {
            const o = P[fn];
            P[fn] = function (target, data, ...rest) { if (target === 0x8a11 && data && ArrayBuffer.isView(data)) { const f = new Float32Array(data.buffer, data.byteOffset, Math.floor(data.byteLength / 4)); window.__ubo[`${fn}@${typeof rest[0] === "number" && fn === "bufferSubData" ? data.byteOffset : 0}:${f.length}`] = Array.from(f).map((x) => +x.toFixed(5)); } return o.call(this, target, data, ...rest); };
        }
    }
};
const out = {};
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        await ctx.addInitScript(INIT);
        const page = await ctx.newPage();
        await page.goto(BASE + "#/blob", { waitUntil: "load", timeout: 90000 });
        await page.waitForTimeout(6000);
        const snap = () => page.evaluate(() => JSON.parse(JSON.stringify({ u: window.__u, ubo: window.__ubo })));
        const diff = (a, b) => { const d = {}; for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) { const x = a[k], y = b[k]; if (JSON.stringify(x) !== JSON.stringify(y)) { if (Array.isArray(x) && Array.isArray(y) && x.length === y.length && x.length > 4) d[k] = x.map((v, i) => (v !== y[i] ? [i, v, y[i]] : null)).filter(Boolean).slice(0, 12); else d[k] = [x, y]; } } return d; };
        out.uniformNames = Object.keys((await snap()).u);
        out.uboKeys = Object.keys((await snap()).ubo);
        out.writes = [];
        for (const [name, key] of [["Warp", "End"], ["Noise amplitude", "End"], ["Smoothness", "End"], ["Hue range", "End"]]) {
            await page.waitForTimeout(500);
            const a = await snap();
            await page.waitForTimeout(500);
            const noise = diff(a.u, (await snap()).u); // what changes with NO write (time, etc.)
            const b = await snap();
            const t = page.locator(`[data-slot=configurator-row] [role=slider][aria-label="${name}"]`).first();
            const vb = await t.getAttribute("aria-valuenow");
            await t.focus(); await page.keyboard.press(key); await t.blur();
            await page.waitForTimeout(800);
            const c = await snap();
            const du = diff(b.u, c.u); for (const k of Object.keys(noise)) delete du[k];
            out.writes.push({ slider: name, valBefore: vb, valAfter: await t.getAttribute("aria-valuenow"), uniformsChanged: du, uboChanged: diff(b.ubo, c.ubo), timeVarying: Object.keys(noise) });
        }
    } finally { await ctx.close(); }
    out.bisect = [];
    for (const w of [1000, 980, 960, 940, 900, 880, 840]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        try {
            const page = await ctx.newPage();
            await page.goto(BASE + "#/blob", { waitUntil: "load", timeout: 90000 });
            await page.waitForTimeout(2500);
            out.bisect.push({ w, ...(await page.evaluate(() => { const ps = [...document.querySelectorAll(".pane-shell")].filter((p) => !p.parentElement.closest(".pane-shell")); return { inView: ps.map((p) => { const b = p.getBoundingClientRect(); return [(p.querySelector("h1,h2")?.textContent ?? "Picker").trim().slice(0, 10) || "Picker", b.top < innerHeight && b.bottom > 0 && b.left < innerWidth && b.right > 0]; }) }; })) });
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
save("U-uniforms.json", out);
console.log(JSON.stringify(out).slice(0, 6000));
