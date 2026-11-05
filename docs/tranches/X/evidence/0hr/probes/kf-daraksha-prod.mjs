// X·§0hr C — keyframes.babb.dev Daraksha skin, prod (kf 6.2.1, deploy-pages @ 36a73f89).
// Re-authored after the scratchpad loss, from keyframes.js scripts/probe/kf-daraksha-skin.mjs.
// One headless Chromium per run, a new context per cell, all closed in finally.
// Run: ~/.claude/guard/guarded --timeout 20 -- node kf-daraksha-prod.mjs <tag> [base]
// Per cell (1440x900 / 390x844 × motion / reduced motion):
//   crayon (before): the tonal step — ΔE_OK(fill, its --face-crayon) per face (top/bottom/sides > 0, front/back 0)
//   Daraksha (rest): each face ΔE_OK against her declared register (≤ 0.01)
//   unfurl: every fill's scale + opacity per rAF frame from just before the radio press to rest
//           → no snap-back (opacity never drops > 0.05 after rising; no fill re-closes), real stagger
//   reduced motion: .cube-bob rest pose 0°, die centred (|dx|,|dy| ≤ 0.5 px), no unfurl frames
//   0 console / page errors
import fs from "node:fs";
import { deltaEOK, parseCssColor } from "/Users/mkbabb/Programming/value.js/dist/subpaths/color.js";
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";

const TAG = process.argv[2] || "r1";
const BASE = (process.argv[3] || "https://keyframes.babb.dev/").replace(/\/?$/, "/");
const OUT = `${process.env.HOME}/.dev-logs/x-0hr/kf/${TAG}`;
fs.mkdirSync(OUT, { recursive: true });

const FACES = ["efflorescence", "haldi", "tulsi", "zari", "gulabi", "sheesham"];
const REGISTER = {
    efflorescence: "oklch(73% 0.185 2)", haldi: "oklch(82% 0.145 76)", tulsi: "oklch(72% 0.055 145)",
    zari: "oklch(72% 0.12 88)", gulabi: "oklch(90% 0.055 18)", sheesham: "oklch(55% 0.085 56)",
};
const dE = (a, b) => {
    const x = parseCssColor(a), y = parseCssColor(b);
    if (!x.ok || !y.ok) return null;
    const d = deltaEOK(x.value, y.value);
    return d.ok ? +d.value.toFixed(4) : null;
};
const CELLS = [
    { w: 1440, h: 900, reduce: false }, { w: 390, h: 844, reduce: false },
    { w: 1440, h: 900, reduce: true }, { w: 390, h: 844, reduce: true },
];

function readDie() {
    const bob = document.querySelector(".cube-bob");
    const sides = [...document.querySelectorAll(".cube-side")];
    const faces = sides.map((s) => {
        const f = s.querySelector(":scope > .face-fill");
        const probe = document.createElement("span");
        probe.style.cssText = "position:absolute;width:0;height:0;background-color:var(--face-crayon)";
        (f ?? s).appendChild(probe);
        const crayon = getComputedStyle(probe).backgroundColor; probe.remove();
        return { side: [...s.classList].filter((c) => /^(front|back|left|right|top|bottom)$/.test(c))[0] ?? null, bg: f ? getComputedStyle(f).backgroundColor : null, crayon };
    });
    const die = document.querySelector(".cube"), host = bob?.parentElement;
    let off = null;
    if (die && host) {
        const d = die.getBoundingClientRect(), h = host.getBoundingClientRect();
        off = { dx: +(d.x + d.width / 2 - (h.x + h.width / 2)).toFixed(2), dy: +(d.y + d.height / 2 - (h.y + h.height / 2)).toFixed(2) };
    }
    const m = bob ? getComputedStyle(bob).transform : "none";
    let deg = 0;
    if (m && m !== "none") { const v = m.replace(/^matrix(3d)?\(|\)$/g, "").split(",").map(Number); deg = +(Math.atan2(v[1], v[0]) * 180 / Math.PI).toFixed(3); }
    return { skin: bob?.getAttribute("data-cube-skin") ?? null, faces, bobTransform: m, deg, off };
}

function startSampler() {
    const fills = [...document.querySelectorAll(".cube-side > .face-fill")];
    const t0 = performance.now();
    window.__samp = [];
    window.__sampOn = true;
    const tick = () => {
        const live = [...document.querySelectorAll(".cube-side > .face-fill")];
        window.__samp.push({ t: +(performance.now() - t0).toFixed(1), f: live.map((f) => {
            const cs = getComputedStyle(f);
            let s = 1;
            if (cs.transform && cs.transform !== "none") { const v = cs.transform.replace(/^matrix(3d)?\(|\)$/g, "").split(",").map(Number); s = Math.hypot(v[0], v[1]); }
            return [+s.toFixed(4), +(+cs.opacity).toFixed(4), f.style.transform ? 1 : 0];
        }) });
        if (window.__sampOn && performance.now() - t0 < 3500) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return fills.length;
}

async function chooseDaraksha(page) {
    const trig = page.locator('[aria-label="@mbabb menu"]').first();
    const dock = page.locator(".glass-dock").filter({ has: trig }).first();
    const db = await dock.boundingBox();
    await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2);
    await page.waitForTimeout(1200);
    let bb = await trig.boundingBox();
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await page.waitForTimeout(1200);
    bb = await trig.boundingBox();
    await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
    const item = page.getByRole("menuitemradio", { name: /Daraksha/ });
    await item.waitFor({ state: "visible", timeout: 8000 });
    await page.evaluate(startSampler);
    await item.click();
    const checked = await item.getAttribute("aria-checked");
    bb = await trig.boundingBox();
    await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
    return checked;
}

function analyseUnfurl(samp) {
    if (!samp.length) return { frames: 0 };
    const n = samp[0].f.length;
    const per = [];
    for (let i = 0; i < n; i++) {
        let start = null, open = null, maxOp = 0, snapBack = 0, reclose = false, minAfterOpen = 1;
        let sawClosed = false;
        for (const fr of samp) {
            const [s, op] = fr.f[i] ?? [1, 1];
            if (op < 0.05) sawClosed = true;
            if (sawClosed && start == null && op > 0.05) start = fr.t;
            if (sawClosed && open == null && op > 0.98) open = fr.t;
            if (!sawClosed) continue; // the crayon die's open faces close at the swap: the unfurl's 0% frame, not a snap-back
            if (op < maxOp - 0.05) snapBack = Math.max(snapBack, +(maxOp - op).toFixed(3));
            if (open != null) { minAfterOpen = Math.min(minAfterOpen, op); if (op < 0.5 || s < 0.5) reclose = true; }
            maxOp = Math.max(maxOp, op);
        }
        const last = samp[samp.length - 1].f[i];
        per.push({ i, sawClosed, start, open, snapBack, reclose, minAfterOpen: +minAfterOpen.toFixed(3), last });
    }
    const starts = per.map((p) => p.start).filter((x) => x != null);
    const gaps = starts.slice(1).map((s, k) => +(s - starts[k]).toFixed(1));
    return {
        frames: samp.length, spanMs: samp[samp.length - 1].t, per,
        startGaps: gaps, staggerMs: starts.length > 1 ? +(Math.max(...starts) - Math.min(...starts)).toFixed(1) : 0,
        monotoneStarts: gaps.every((g) => g >= 0),
        anySnapBack: per.some((p) => p.snapBack > 0 || p.reclose),
        allOpened: per.every((p) => p.open != null),
        inlineFramesSeen: samp.some((fr) => fr.f.some((x) => x[2])),
    };
}

const rows = [];
const browser = await chromium.launch({ headless: true });
try {
    for (const cell of CELLS) {
        const ctx = await browser.newContext({ viewport: { width: cell.w, height: cell.h }, reducedMotion: cell.reduce ? "reduce" : "no-preference" });
        const errors = [];
        const tag = `${cell.w}${cell.reduce ? "-prm" : ""}`;
        try {
            const page = await ctx.newPage();
            page.on("console", (m) => { if (m.type() === "error") errors.push("CE " + m.text().slice(0, 160)); });
            page.on("pageerror", (e) => errors.push("PE " + String(e).slice(0, 160)));
            await page.goto(`${BASE}#/cube`, { waitUntil: "networkidle", timeout: 60000 });
            await page.waitForSelector(".cube-side > .face-fill", { timeout: 20000 });
            await page.waitForTimeout(1500);
            const before = await page.evaluate(readDie);
            await page.screenshot({ path: `${OUT}/crayon-${tag}.png` });
            const checked = await chooseDaraksha(page);
            await page.waitForTimeout(150);
            await page.screenshot({ path: `${OUT}/mid-${tag}.png` });
            await page.waitForTimeout(3600);
            const samp = await page.evaluate(() => { window.__sampOn = false; return window.__samp; });
            const rest = await page.evaluate(readDie);
            await page.screenshot({ path: `${OUT}/daraksha-${tag}.png` });
            const crayonStep = before.faces.map((f) => ({ side: f.side, dE: dE(f.bg, f.crayon) }));
            const faces = rest.faces.map((f, i) => ({ side: f.side, name: FACES[i], bg: f.bg, dE: dE(f.bg, REGISTER[FACES[i]]) }));
            rows.push({
                cell: tag, beforeSkin: before.skin, radioChecked: checked, skin: rest.skin,
                crayonStep, crayonStepPresent: crayonStep.filter((c) => /top|bottom|left|right/.test(c.side)).every((c) => c.dE > 0.01),
                faces, maxFaceDE: Math.max(...faces.map((f) => f.dE ?? Infinity)),
                restDeg: rest.deg, restOff: rest.off, bobTransform: rest.bobTransform,
                unfurl: analyseUnfurl(samp), errors,
            });
            fs.writeFileSync(`${OUT}/samples-${tag}.json`, JSON.stringify(samp));
        } catch (e) { rows.push({ cell: tag, error: String(e).slice(0, 300), errors }); }
        finally { await ctx.close(); }
    }
} finally { await browser.close(); }
fs.writeFileSync(`${OUT}/kf.json`, JSON.stringify(rows, null, 1));
for (const r of rows) {
    const u = r.unfurl ?? {};
    console.log(JSON.stringify({ cell: r.cell, err: r.error, skin: r.skin, checked: r.radioChecked, maxFaceDE: r.maxFaceDE, crayonStep: r.crayonStep?.map((c) => `${c.side}:${c.dE}`).join(" "), stepOk: r.crayonStepPresent, restDeg: r.restDeg, restOff: r.restOff, frames: u.frames, staggerMs: u.staggerMs, startGaps: u.startGaps, snapBack: u.anySnapBack, allOpened: u.allOpened, inline: u.inlineFramesSeen, errors: r.errors?.length, e: r.errors?.slice(0, 2) }));
}
