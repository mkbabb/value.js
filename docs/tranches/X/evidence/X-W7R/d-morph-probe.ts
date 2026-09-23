// SERVED MODEL: claude-opus-5-5 — X.W7R.d instrument (run from a scratch tree root)
// X.W7R.d — OA-41/OA-48: value.js's dock small<->large morph, headed real GPU (§5.2 parsimony).
// Transitions: large->small = the producer's idle auto-collapse (pointer away, collapse-delay 5000);
// small->large = a click on the collapsed seal; plus the layer morph (Tools <-> Back) as DOCK-MORPH-ROOT's cross-read.
// Per rAF frame: dock box, classes, data-morphing, --dock-morph-t, and for every VISIBLE text leaf
// (and the seal glyph) the effective ancestor chain: blur(>0) filter, non-unit scale, line-box count.
// After settle: clip screenshots at +0/+120/+300/+600 ms vs a +1500 ms reference (mean-abs diff /255).
// Usage: node d-morph-probe.ts <origin> <label> <outDir>
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { decodePng, meanAbsDiff } from "./e2e/smoke/fixtures/frame-diff.ts";

const [origin, label, outDir] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const res: Record<string, any> = { origin, label, at: new Date().toISOString(), transitions: [] };
const browser = await chromium.launch({ channel: "chromium", headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const errors: string[] = [];
page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
await page.goto(origin + "/");
await page.locator("main").first().waitFor({ state: "visible", timeout: 30000 });
await page.waitForTimeout(8000);
res.renderer = await page.evaluate(() => {
    const gl = document.createElement("canvas").getContext("webgl2");
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    return ext ? gl!.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "n/a";
});
res.tokens = await page.evaluate(() => {
    const d = document.querySelector(".glass-dock") as HTMLElement;
    const cs = getComputedStyle(d);
    const g = (k: string) => cs.getPropertyValue(k).trim();
    return { springDockSettle: g("--spring-dock-settle"), springDockDuration: g("--spring-dock-duration"),
        motionTempo: g("--motion-tempo"), springSnappyDuration: g("--spring-snappy-duration"),
        durationFast: g("--duration-fast"), durationNormal: g("--duration-normal") };
});

// ── the in-page rAF sampler (installed once; start/stop per transition) ──
await page.evaluate(() => {
    const w = window as any;
    const dock = () => document.querySelector(".glass-dock") as HTMLElement;
    function chain(el: Element) {
        let blur = 0, op = 1;
        for (let a: Element | null = el; a && a !== document.documentElement; a = a.parentElement) {
            const cs = getComputedStyle(a);
            const m = /blur\(([\d.]+)px\)/.exec(cs.filter);
            if (m && +m[1] > 0) blur = Math.max(blur, +m[1]);
            op *= +cs.opacity;
            if (cs.visibility === "hidden" || cs.display === "none") op = 0;
        }
        return { blur, op };
    }
    function srcOf(el: Element) { // the nearest transformed ancestor (the scale's source)
        for (let a: Element | null = el; a && a !== document.body; a = a.parentElement) {
            const cs = getComputedStyle(a); const t = cs.transform;
            if ((t !== "none" && t !== "matrix(1, 0, 0, 1, 0, 0)") || (cs.scale !== "none" && cs.scale !== "1")) return (a.getAttribute("class") || a.tagName).split(" ").slice(0, 2).join(".");
        }
        return "?";
    }
    function frame(t0: number) {
        const d = dock(); const r = d.getBoundingClientRect();
        let textBlur = 0, textScaled = 0, glyphBlur = 0, glyphScaled = 0, lines = 0, texts = 0;
        const wrapped: string[] = [], scaledNames: string[] = [];
        for (const el of Array.from(d.querySelectorAll("*"))) {
            const isSvg = el.tagName.toLowerCase() === "svg";
            const hasText = !isSvg && Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim());
            if (!isSvg && !hasText) continue;
            const br = el.getBoundingClientRect();
            if (br.width < 1 || br.height < 1) continue;
            const { blur, op } = chain(el);
            if (op < 0.05) continue;
            const lw = isSvg ? parseFloat(getComputedStyle(el).width) : (el as HTMLElement).offsetWidth;
            const s = lw > 0 ? br.width / lw : 1;
            const sc = Math.abs(s - 1) > 0.01;
            if (sc && scaledNames.length < 4) scaledNames.push(`${srcOf(el)}>${isSvg ? "svg" : el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").split(" ")[0]}:${(el.textContent || el.closest("[aria-label]")?.getAttribute("aria-label") || "").trim().slice(0, 16)}@${s.toFixed(3)}`);
            if (isSvg) { if (blur) glyphBlur++; if (sc) glyphScaled++; continue; }
            texts++; if (blur) textBlur++; if (sc) textScaled++;
            // line boxes of the element's OWN text nodes only (a range over an icon+text span reads
            // the icon's rect as a second "line" — measured artefact on Login, corrected)
            let n = 0;
            for (const tn of Array.from(el.childNodes)) { if (tn.nodeType !== 3 || !tn.textContent!.trim()) continue;
                const rg = document.createRange(); rg.selectNodeContents(tn);
                n = Math.max(n, new Set(Array.from(rg.getClientRects()).filter((q) => q.width > 0).map((q) => Math.round(q.top))).size); }
            lines += n;
            if (n > 1) wrapped.push((el.textContent || "").trim().slice(0, 24));
        }
        return { t: +(performance.now() - t0).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
            cls: d.classList.contains("collapsed") ? "C" : "E", morph: d.hasAttribute("data-morphing") ? 1 : 0,
            mt: d.style.getPropertyValue("--dock-morph-t").slice(0, 6), texts, lines, wrapped, scaledNames,
            textBlur, textScaled, glyphBlur, glyphScaled };
    }
    // Armed, not free-running: a rAF loop doing this much work starves the producer's idle
    // collapse (measured: with a free-running sampler the dock never collapsed in 12 s), so the
    // loop starts on the dock's first class / data-morphing mutation (style is written continuously by the producer's measure + backdrop sampler).
    w.__dStart = (subtree = false) => { w.__s = []; w.__run = true; const t0 = performance.now(); w.__s.push(frame(t0));
        const tick = () => { if (!w.__run) return; w.__s.push(frame(t0)); requestAnimationFrame(tick); };
        const mo = new MutationObserver(() => { mo.disconnect(); requestAnimationFrame(tick); });
        mo.observe(dock(), { attributes: true, attributeFilter: ["class", "data-morphing"], subtree }); w.__mo = mo; }; // subtree only for the layer morph (no dock-level mutation)
    w.__dStop = () => { w.__run = false; w.__mo?.disconnect(); return w.__s; };
});

const cdp = await page.context().newCDPSession(page);
// Sharpness = mean |dx|+|dy| of luma over the crop (gradient energy); blurred text lowers it.
// A crop reads BLURRED when its sharpness falls >5% below the +1500 ms settled reference.
function sharp(img: { width: number; height: number; channels: number; data: Uint8Array }) {
    const { width: W, height: H, channels: C, data: D } = img; const L = (x: number, y: number) => { const i = (y * W + x) * C; return 0.2126 * D[i] + 0.7152 * D[i + 1] + 0.0722 * D[i + 2]; };
    let e = 0; for (let y = 0; y < H - 1; y++) for (let x = 0; x < W - 1; x++) { const l = L(x, y); e += Math.abs(L(x + 1, y) - l) + Math.abs(L(x, y + 1) - l); }
    return e / ((W - 1) * (H - 1));
}
function analyse(s: any[]) {
    const key = (f: any) => `${f.w}|${f.h}|${f.cls}|${f.morph}`;
    const last = s[s.length - 1];
    let k = s.length - 1; while (k > 0 && key(s[k - 1]) === key(last)) k--;
    let a = 0; while (a < s.length - 1 && key(s[a]) === key(s[0])) a++;
    const pre = s.slice(a, k), post = s.slice(k);
    const sum = (xs: any[], f: string) => xs.filter((x) => x[f] > 0).length;
    return { frames: s.length, from: { w: s[0].w, h: s[0].h, cls: s[0].cls }, to: { w: last.w, h: last.h, cls: last.cls },
        startMs: s[a].t, settleMs: s[k].t, morphMs: +(s[k].t - s[a].t).toFixed(1), morphFrames: k - a,
        distinctW: new Set(s.map((f) => f.w)).size, distinctH: new Set(s.map((f) => f.h)).size,
        morphAttrFrames: s.filter((f) => f.morph).length,
        duringBlurText: sum(pre, "textBlur"), duringScaledText: sum(pre, "textScaled"),
        duringBlurGlyph: sum(pre, "glyphBlur"), duringScaledGlyph: sum(pre, "glyphScaled"),
        afterSettleFrames: post.length, afterBlurText: sum(post, "textBlur"), afterScaledText: sum(post, "textScaled"),
        afterBlurGlyph: sum(post, "glyphBlur"), afterScaledGlyph: sum(post, "glyphScaled"),
        finalLines: last.lines, finalTexts: last.texts, finalWrapped: last.wrapped, finalScaled: last.scaledNames,
        wrappedDuring: [...new Set(pre.flatMap((f) => f.wrapped))], scaledDuring: [...new Set(pre.flatMap((f) => f.scaledNames.map((n: string) => n.split("@")[0])))],
        wrapFrames: s.filter((f) => f.lines > f.texts).length, wrapThenSnap: pre.some((f) => f.lines > f.texts) && last.lines === last.texts,
        heightOvershoot: Math.max(...s.map((f) => f.h)) - Math.max(s[0].h, last.h),
        series: s.map((f) => [f.t, f.w, f.h, f.cls, f.morph, f.mt, f.lines - f.texts, f.textBlur + f.textScaled, f.glyphBlur + f.glyphScaled]) };
}
async function transition(name: string, arm: () => Promise<void>, fire: () => Promise<number | void>, waitMs: number, subtree = false) {
    await arm();
    const shots: { ts: number; data: string }[] = [];
    const onFrame = (f: any) => { shots.push({ ts: f.metadata.timestamp * 1000, data: f.data }); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); };
    cdp.on("Page.screencastFrame", onFrame);
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 60, maxWidth: 720, everyNthFrame: 1 });
    await page.evaluate((st) => (window as any).__dStart(st), subtree);
    let tFire = Date.now();
    const fired = await fire(); if (typeof fired === "number") tFire = fired;
    await page.waitForTimeout(waitMs);
    const s = await page.evaluate(() => (window as any).__dStop());
    await cdp.send("Page.stopScreencast"); cdp.off("Page.screencastFrame", onFrame);
    const an = analyse(s);
    // after-settle sharpness: dock crops vs a +1500 ms reference
    const box = await page.locator(".glass-dock").first().boundingBox();
    const clip = { x: Math.max(0, box!.x - 8), y: Math.max(0, box!.y - 8), width: box!.width + 16, height: box!.height + 16 };
    const crops: any[] = []; const t1 = Date.now();
    for (const off of [0, 120, 300, 600]) { const dt = off - (Date.now() - t1); if (dt > 0) await page.waitForTimeout(dt);
        crops.push({ off: Date.now() - t1, png: await page.screenshot({ clip }) }); }
    await page.waitForTimeout(Math.max(0, 1500 - (Date.now() - t1)));
    const ref = await page.screenshot({ clip }); await page.waitForTimeout(400); const ref2 = await page.screenshot({ clip });
    const R = decodePng(ref);
    const sR = sharp(R);
    an.afterSettleCropDiff = crops.map((c) => { const I = decodePng(c.png); return { ms: c.off, diff: +meanAbsDiff(I, R).toFixed(3), sharpRatio: +(sharp(I) / sR).toFixed(4) }; });
    an.steadyNoise = +meanAbsDiff(decodePng(ref2), R).toFixed(3); an.steadySharpRatio = +(sharp(decodePng(ref2)) / sR).toFixed(4);
    an.blurredCropsAfterSettle = an.afterSettleCropDiff.filter((c: any) => c.sharpRatio < 0.95).length;
    writeFileSync(`${outDir}/${name}-settled.png`, ref);
    const keep = shots.filter((x) => x.ts >= tFire - 100 && x.ts <= tFire + 900);
    keep.forEach((x, i) => writeFileSync(`${outDir}/${name}-f${String(i).padStart(2, "0")}-${Math.round(x.ts - tFire)}ms.jpg`, Buffer.from(x.data, "base64")));
    an.screencastFrames = keep.length;
    res.transitions.push({ name, ...an });
    const { series, ...brief } = an; console.log(name, JSON.stringify(brief));
}

const dockSel = ".glass-dock";
// Six transitions, three per direction, each a distinct producer writer:
//   c1 idle collapse (the FIRST collapse since boot; the idle timer arms on pointer-leave)
//   c1 hover expand (pointer onto the seal, no click)      c2 idle collapse (a SECOND idle collapse)
//   c2 click expand, pointer rests (a click pins: class `pinned`, measured)
//   c3 outside-click collapse                              c3 click expand, pointer leaves at once
const idleArm = async () => { const bb = await page.locator(dockSel).first().boundingBox(); await page.mouse.move(bb!.x + 20, bb!.y + 10);
    await page.waitForTimeout(300); await page.mouse.move(5, 895); await page.waitForTimeout(2500); };
const idleFire = async () => { await page.waitForSelector(`${dockSel}.collapsed`, { timeout: 12000 }); return Date.now() - 40; };
const center = async () => { const b = await page.locator(dockSel).first().boundingBox(); return [b!.x + b!.width / 2, b!.y + b!.height / 2]; };
await transition("c1-large-to-small-idle-first", idleArm, idleFire, 1300);
await transition("c1-small-to-large-hover", async () => {}, async () => { const [x, y] = await center(); await page.mouse.move(x, y); }, 1300);
await transition("c2-large-to-small-idle-second", async () => { await page.mouse.move(5, 895); await page.waitForTimeout(2500); }, idleFire, 1300);
await transition("c2-small-to-large-click-rest", async () => {}, async () => { const [x, y] = await center(); await page.mouse.click(x, y); }, 1300);
await transition("c3-large-to-small-outside", async () => { await page.mouse.move(5, 450); await page.waitForTimeout(400); },
    async () => { await page.mouse.click(5, 450); }, 1300);
await transition("c3-small-to-large-click-pointer-off", async () => {},
    async () => { const [x, y] = await center(); await page.mouse.click(x, y); await page.mouse.move(5, 450); }, 1300);
// DOCK-MORPH-ROOT cross-read: the layer morph (Tools -> action bar -> Back), pointer on the dock (held expanded)
const tools = page.locator('.glass-dock button[aria-label="Toggle action bar"]').first();
if (await tools.count()) {
    await transition("layer-main-to-action", async () => {}, async () => { await tools.click(); }, 1300, true);
    await transition("layer-action-to-main", async () => {}, async () => { await page.locator('.glass-dock [aria-label="Back"]').first().click(); }, 1300, true);
}
res.pageErrors = errors;
writeFileSync(`${outDir}/result.json`, JSON.stringify(res, null, 1));
await browser.close();
