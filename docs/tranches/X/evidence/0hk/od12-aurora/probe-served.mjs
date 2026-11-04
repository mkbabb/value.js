// X·§0hk OD-12 — the SERVED aurora-fidelity falsifier.
//
// For each chosen colour × scheme × viewport: load the app seeded by the
// share link, wait for the atmosphere's arrival, hide everything but the
// canvas, capture, and read the canvas-only frame in OKLab:
//   · dominant region = the largest k-means (k=3) cluster centroid;
//     dEdom = ΔE_OK(dominant, seed), hueErr = |h_dom − h_seed| (C ≥ 0.05)
//   · dEarea = ΔE_OK(area mean, seed)
//   · medL = the frame's median OKLab L (the re-seed determinism read)
//   · ground = --saved-bg-1 at DOMContentLoaded and at rest (no snap)
// Gate (OD-12 merged design): dEdom ≤ 0.05 · dEarea ≤ 0.07 · hueErr ≤ 8°
// (median ≤ 5°) · re-seed ΔmedL ≤ 0.01 · ground first-paint ≡ rest (ΔE ≤ 0.02).
//
// Run (machine law: one browser per run, a context per cell, closed in finally):
//   ~/.claude/guard/guarded --timeout 30 -- node probe-served.mjs \
//       [base=http://localhost:9000/] [tag=local] [desk|mob]
// Frames + table: ~/.dev-logs/x-0hk/aurora/<tag>-<view>/.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";

const BASE = process.argv[2] || "http://localhost:9000/";
const TAG = process.argv[3] || "local";
const VIEWNAME = process.argv[4] || "desk";
const VIEW = VIEWNAME === "mob"
    ? { width: 390, height: 844, deviceScaleFactor: 2 }
    : { width: 1800, height: 1000, deviceScaleFactor: 2 };
const OUT = `${process.env.HOME}/.dev-logs/x-0hk/aurora/${TAG}-${VIEWNAME}`;
fs.mkdirSync(OUT, { recursive: true });

const SEEDS = [
    ["efflorescence", "oklch(73% 0.185 2)"],
    ["gulabi", "oklch(90% 0.055 18)"],
    ["haldi", "oklch(82% 0.145 76)"],
    ["zari", "oklch(72% 0.12 88)"],
    ["sheesham", "oklch(55% 0.085 56)"],
    ["tulsi", "oklch(72% 0.055 145)"],
    ["curry-leaf", "oklch(43% 0.085 152)"],
    ["jamun", "oklch(39% 0.1 356)"],
    ["rebeccapurple", "rebeccapurple"],
    ["teal", "teal"],
    ["tomato", "tomato"],
    ["skyblue", "skyblue"],
].filter(([n]) => !process.env.ONLY || process.env.ONLY.split(",").includes(n));
const SCHEMES = (process.env.SCHEMES || "dark,light").split(",");
const RESEED = new Set((process.env.RESEED ?? "efflorescence,tulsi,teal").split(","));

// In-page analysis (runs in the analyzer page; no node-side image deps).
function analyze({ b64, css }) {
    const lin = (u) => { u /= 255; return u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4); };
    const toLab = (R, G, B) => {
        const r = lin(R), g = lin(G), b = lin(B);
        const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
        const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
        const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
        return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
    };
    const cssLab = (c) => {
        const t = document.createElement("canvas").getContext("2d", { colorSpace: "srgb" });
        t.fillStyle = c; t.fillRect(0, 0, 1, 1);
        const p = t.getImageData(0, 0, 1, 1).data;
        return toLab(p[0], p[1], p[2]);
    };
    return (async () => {
        const blob = await (await fetch(`data:image/png;base64,${b64}`)).blob();
        const bmp = await createImageBitmap(blob);
        const W = 180, H = 100;
        const cv = new OffscreenCanvas(W, H);
        const cx = cv.getContext("2d");
        cx.drawImage(bmp, 0, 0, W, H);
        const d = cx.getImageData(0, 0, W, H).data;
        const X = [];
        for (let i = 0; i < d.length; i += 4) X.push(toLab(d[i], d[i + 1], d[i + 2]));
        const seed = cssLab(css);
        const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        // k-means k=3, deterministic init at the L quantiles 1/6, 1/2, 5/6.
        const byL = [...X].sort((a, b) => a[0] - b[0]);
        let cen = [1 / 6, 1 / 2, 5 / 6].map((q) => byL[Math.floor(q * byL.length)].slice());
        let asg = new Array(X.length).fill(0);
        for (let it = 0; it < 30; it++) {
            for (let i = 0; i < X.length; i++) {
                let best = 0, bd = Infinity;
                for (let j = 0; j < 3; j++) { const dd = dist(X[i], cen[j]); if (dd < bd) { bd = dd; best = j; } }
                asg[i] = best;
            }
            cen = cen.map((c, j) => {
                const pts = X.filter((_, i) => asg[i] === j);
                if (!pts.length) return c;
                return [0, 1, 2].map((k) => pts.reduce((s, p) => s + p[k], 0) / pts.length);
            });
        }
        const cnt = [0, 1, 2].map((j) => asg.filter((a) => a === j).length);
        const jd = cnt.indexOf(Math.max(...cnt));
        const dom = cen[jd];
        const mean = [0, 1, 2].map((k) => X.reduce((s, p) => s + p[k], 0) / X.length);
        const Ls = X.map((p) => p[0]).sort((a, b) => a - b);
        const lch = (v) => [v[0], Math.hypot(v[1], v[2]), ((Math.atan2(v[2], v[1]) * 180) / Math.PI + 360) % 360];
        const hd = (a, b) => { const x = Math.abs(a - b) % 360; return Math.min(x, 360 - x); };
        const dl = lch(dom), sl = lch(seed);
        return {
            dom: dl.map((v) => +v.toFixed(3)), share: +(cnt[jd] / X.length).toFixed(2),
            seed: sl.map((v) => +v.toFixed(3)),
            dEdom: +dist(dom, seed).toFixed(4), hueErr: sl[1] >= 0.05 ? +hd(dl[2], sl[2]).toFixed(1) : null,
            dEarea: +dist(mean, seed).toFixed(4), medL: +Ls[Ls.length >> 1].toFixed(4),
        };
    })();
}

const browser = await chromium.launch({ args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
const rows = [];
try {
    const analyzer = await browser.newPage();
    const cell = async (name, css, scheme, pass) => {
        const ctx = await browser.newContext({ viewport: { width: VIEW.width, height: VIEW.height }, deviceScaleFactor: VIEW.deviceScaleFactor, colorScheme: scheme });
        try {
            await ctx.addInitScript((s) => {
                try { localStorage.setItem("vueuse-color-scheme", s); } catch {}
                document.addEventListener("DOMContentLoaded", () => {
                    const st = getComputedStyle(document.documentElement);
                    window.__od12FirstGround = [0, 1, 2, 3].map((i) => st.getPropertyValue(`--saved-bg-${i}`).trim());
                });
            }, scheme);
            const page = await ctx.newPage();
            await page.goto(`${BASE}#/?space=oklch&color=${encodeURIComponent(css)}`, { waitUntil: "load", timeout: 60000 });
            await page.waitForSelector(".atmosphere-canvas--arrived", { timeout: 20000 }).catch(() => {});
            await page.waitForTimeout(3500);
            const info = await page.evaluate(() => {
                const st = getComputedStyle(document.documentElement);
                const gl = document.createElement("canvas").getContext("webgl2");
                const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
                return {
                    dark: document.documentElement.classList.contains("dark"),
                    renderer: ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)).slice(0, 48) : "none",
                    first: window.__od12FirstGround ?? null,
                    rest: [0, 1, 2, 3].map((i) => st.getPropertyValue(`--saved-bg-${i}`).trim()),
                };
            });
            await page.addStyleTag({ content: "body *:not(.atmosphere-canvas){visibility:hidden!important} .atmosphere-canvas{visibility:visible!important}" });
            await page.waitForTimeout(300);
            const buf = await page.screenshot({ type: "png", scale: "css" });
            const f = `${OUT}/${name}-${scheme}${pass ? "-reseed" : ""}.png`;
            fs.writeFileSync(f, buf);
            const m = await analyzer.evaluate(analyze, { b64: buf.toString("base64"), css });
            const g = await analyzer.evaluate(({ a, b, css }) => {
                const lin = (u) => { u /= 255; return u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4); };
                const lab = (c) => {
                    const t = document.createElement("canvas").getContext("2d"); t.fillStyle = c; t.fillRect(0, 0, 1, 1);
                    const p = t.getImageData(0, 0, 1, 1).data; const r = lin(p[0]), g = lin(p[1]), bb = lin(p[2]);
                    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * bb), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * bb), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * bb);
                    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
                };
                const dE = (x, y) => { const p = lab(x), q = lab(y); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
                return {
                    snap: a && a[0] ? +Math.max(...a.map((s, i) => dE(s, b[i]))).toFixed(4) : null,
                    ground1VsSeed: b[1] ? +dE(b[1], css).toFixed(4) : null,
                };
            }, { a: info.first, b: info.rest, css });
            const row = { name, scheme, pass, ...m, ground: info.rest.join(" "), groundSnap: g.snap, ground1dE: g.ground1VsSeed, renderer: info.renderer, isDark: info.dark };
            rows.push(row);
            console.log(`${name.padEnd(14)} ${scheme.padEnd(5)}${pass ? "*" : " "} dom L${m.dom[0]} C${m.dom[1]} h${m.dom[2]} (${Math.round(m.share * 100)}%) dEdom ${m.dEdom} hue ${m.hueErr} dEarea ${m.dEarea} medL ${m.medL} | ground1 dE ${g.ground1VsSeed} snap ${g.snap}`);
        } finally {
            await ctx.close();
        }
    };
    for (const [name, css] of SEEDS) {
        for (const scheme of SCHEMES) {
            await cell(name, css, scheme, 0);
            if (VIEWNAME === "desk" && RESEED.has(name)) await cell(name, css, scheme, 1);
        }
    }
} finally {
    await browser.close();
}

// The gate.
const first = rows.filter((r) => !r.pass);
const hues = first.map((r) => r.hueErr).filter((h) => h != null).sort((a, b) => a - b);
const reseed = rows.filter((r) => r.pass).map((r) => {
    const a = first.find((x) => x.name === r.name && x.scheme === r.scheme);
    return { name: r.name, scheme: r.scheme, dMedL: +Math.abs(a.medL - r.medL).toFixed(4) };
});
const gate = {
    worstDEdom: Math.max(...first.map((r) => r.dEdom)),
    worstDEarea: Math.max(...first.map((r) => r.dEarea)),
    worstHue: hues.at(-1) ?? null,
    medianHue: hues.length ? hues[hues.length >> 1] : null,
    worstReseed: reseed.length ? Math.max(...reseed.map((r) => r.dMedL)) : null,
    worstSnap: Math.max(...first.map((r) => r.groundSnap ?? 0)),
};
gate.pass = gate.worstDEdom <= 0.05 && gate.worstDEarea <= 0.07 && (gate.worstHue ?? 0) <= 8
    && (gate.medianHue ?? 0) <= 5 && (gate.worstReseed ?? 0) <= 0.01 && gate.worstSnap <= 0.02;
fs.writeFileSync(`${OUT}/table.json`, JSON.stringify({ base: BASE, view: VIEW, gate, reseed, rows }, null, 1));
console.log("GATE", JSON.stringify(gate), "reseed", JSON.stringify(reseed));
process.exitCode = gate.pass ? 0 : 1;
