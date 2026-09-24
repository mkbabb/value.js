// SERVED MODEL: claude-opus-5-5
// KF.W13V.s — OA-39 landing geometry on the served page (home route).
// Usage: node landing.mjs <baseUrl> [vps=390x844,360x740,1440x900] [themes=light,dark]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", vps = "390x844,360x740,1440x900", th = "light,dark", shot] = process.argv.slice(2);
const b = await chromium.launch({ headless: false });
for (const theme of th.split(",")) for (const vp of vps.split(",")) {
    const [w, h] = vp.split("x").map(Number);
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    const p = await ctx.newPage();
    await p.goto(base.replace(/#.*$/, "") + "#/", { waitUntil: "networkidle" });
    await p.waitForTimeout(3000);
    const m = await p.evaluate(() => {
        const R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height }; };
        const faces = [...document.querySelectorAll(".scene-host .cube")];
        // the cube's painted box = union of its faces' boxes (3D-projected)
        const fr = [...document.querySelectorAll(".scene-host .cube .face, .scene-host .cube [class*=face]")].map(R).filter((r) => r && r.w > 0);
        const cube = fr.length ? fr.reduce((a, r) => ({ l: Math.min(a.l, r.l), t: Math.min(a.t, r.t), r: Math.max(a.r, r.r), b: Math.max(a.b, r.b) }), { l: 1e9, t: 1e9, r: -1e9, b: -1e9 }) : R(faces[0]);
        const topDock = R(document.querySelector("[data-dock-tether=top] .glass-dock"));
        const trans = [...document.querySelectorAll("[data-dock-tether]")].filter((e) => e.getAttribute("data-dock-tether") !== "top").map((e) => R(e.querySelector(".glass-dock") ?? e));
        // the ink box: the union of the element's VISIBLE text-line rects (an
        // sr-only mirror or a clipped duplicate is excluded).
        const txt = (sel) => {
            const e = document.querySelector(sel); if (!e) return null;
            const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); const rs = [];
            for (let n = w.nextNode(); n; n = w.nextNode()) {
                if (!n.textContent.trim()) continue;
                const pe = n.parentElement, cs = getComputedStyle(pe);
                if (cs.visibility === "hidden" || cs.position === "absolute" && (pe.getBoundingClientRect().width <= 1)) continue;
                if (cs.clip !== "auto" || cs.clipPath.startsWith("inset(50%")) continue;
                const rg = document.createRange(); rg.selectNodeContents(n);
                for (const r of rg.getClientRects()) if (r.width > 0 && r.height > 0) rs.push(r);
            }
            if (!rs.length) return null;
            return { l: Math.min(...rs.map((r) => r.left)), t: Math.min(...rs.map((r) => r.top)), r: Math.max(...rs.map((r) => r.right)), b: Math.max(...rs.map((r) => r.bottom)) };
        };
        const h1 = txt(".hero-display");
        const sub = txt(".hero-deck");
        const cubeBox = R(document.querySelector(".scene-host .cube"));
        const band = R(document.querySelector(".hero-band"));
        const hint = R(document.querySelector(".hero-band p, .hero-band .hero-deck"));
        const px = (v) => { const d = document.createElement("div"); d.style.cssText = `position:absolute;height:var(${v}, -1px)`; document.body.append(d); const r = d.getBoundingClientRect().height; d.remove(); return r > 0 ? r : null; };
        const stageTopInset = px("--stage-top-inset"), stageBottomInset = px("--stage-bottom-inset");
        return { stageTopInset, stageBottomInset, cube, cubeBox, sub, faces: fr.length, topDock, trans, h1, band, hint, vw: innerWidth, vh: innerHeight };
    });
    const tb = m.trans[0];
    // The stage region: the layout's declared band-to-band region where the
    // tokens exist (phone), else the visible docks' inner edges (desktop).
    const stageTop = m.stageTopInset ?? m.topDock?.b ?? 0, stageBot = m.stageBottomInset != null ? m.vh - m.stageBottomInset : (tb?.t ?? m.vh);
    const sc = { x: m.vw / 2, y: (stageTop + stageBot) / 2 };
    // the cube's box = the .cube element's own box (its rotation centre); the
    // painted faces' union is the overlap test's (stricter) footprint.
    const cc = m.cubeBox ? { x: (m.cubeBox.l + m.cubeBox.r) / 2, y: (m.cubeBox.t + m.cubeBox.b) / 2 } : null;
    const pc = m.cube ? { x: (m.cube.l + m.cube.r) / 2, y: (m.cube.t + m.cube.b) / 2 } : null;
    const blk = m.band;
    const inter = (a, c) => a && c && !(a.r <= c.l || c.r <= a.l || a.b <= c.t || c.b <= a.t);
    const h1c = m.h1 ? (m.h1.l + m.h1.r) / 2 : null;
    console.log(`${theme} ${vp} stage=[${stageTop.toFixed(0)},${stageBot.toFixed(0)}] cubeCentre=(${cc?.x.toFixed(1)},${cc?.y.toFixed(1)}) stageCentre=(${sc.x.toFixed(1)},${sc.y.toFixed(1)}) dx=${(cc.x - sc.x).toFixed(1)} dy=${(cc.y - sc.y).toFixed(1)} | h1=[${m.h1?.l.toFixed(0)},${m.h1?.t.toFixed(0)},${m.h1?.r.toFixed(0)},${m.h1?.b.toFixed(0)}] h1dx=${(h1c - m.vw / 2).toFixed(1)} h1∩cube=${inter(m.h1, m.cube)} deck∩cube=${inter(m.sub, m.cube)} deckdx=${m.sub ? ((m.sub.l + m.sub.r) / 2 - m.vw / 2).toFixed(1) : "-"} painted=(${pc?.x.toFixed(1)},${pc?.y.toFixed(1)} ${m.cube ? (m.cube.b - m.cube.t).toFixed(0) : ""}h) visibleDocksCentreY=${(((m.topDock?.b ?? 0) + (m.trans[0]?.t ?? m.vh)) / 2).toFixed(1)}`);
    if (shot) await p.screenshot({ path: `${shot}-${vp}-${theme}.png` });
    await ctx.close();
}
await b.close();
