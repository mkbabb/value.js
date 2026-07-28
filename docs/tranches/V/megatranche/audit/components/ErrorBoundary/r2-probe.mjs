// CHALLENGE-D round 2 — independent probe.
// New ground vs r1: (A) does the ink paint AT ALL (pixel-identity test, no cure
// mutation); (B) the failure register's contrast as a FUNCTION OF THE USER SEED
// (VISUAL-CONSTITUTION §2 forbids seed tint outside the ambient field — this
// plate sits ON the ambient field, so the seed is a free variable of legibility);
// (C) mobile tap-target of the SOLE recovery affordance; (D) motion inventory.
import { webkit } from "playwright";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/ErrorBoundary/evidence-r2";
fs.mkdirSync(OUT, { recursive: true });
const DOC_RE = /\/assets\/docs\/[a-z-]+\.md/;

const relLum = ([r, g, b]) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const cr = (a, b) => { const [x, y] = [relLum(a), relLum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

async function meanPng(page, buf) {
    return page.evaluate(async (b64) => {
        const img = new Image();
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data;
        let R = 0, G = 0, B = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; n++; }
        return [Math.round(R / n), Math.round(G / n), Math.round(B / n)];
    }, buf.toString("base64"));
}


import crypto from "node:crypto";
const digest = (b) => crypto.createHash("sha256").update(b).digest("hex").slice(0, 16);

const results = { seeds: {}, paintIdentity: null, mobileTap: null, motion: null };

// seeds chosen to bracket the space: the shipped default, a crimson (the same
// hue family as `--destructive`), a near-white, a near-black.
const SEEDS = [
    { name: "default", url: "http://localhost:9000/#/" },
    { name: "crimson", url: "http://localhost:9000/#/?space=hex&color=%23e11d48" },
    { name: "paper",   url: "http://localhost:9000/#/?space=hex&color=%23fafaf9" },
    { name: "ink",     url: "http://localhost:9000/#/?space=hex&color=%230b1020" },
];

for (const seed of SEEDS) {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.route(DOC_RE, (r) => r.abort("failed"));
    await page.goto(seed.url, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(9000);

    const present = await page.evaluate(() => !!document.querySelector(".vj-error-boundary"));
    if (!present) { results.seeds[seed.name] = { caught: false }; await b.close(); continue; }

    // --- (A) PAINT IDENTITY, run once on the default seed, BEFORE any mutation.
    if (seed.name === "default") {
        const rects = await page.evaluate(() => {
            const eb = document.querySelector(".vj-error-boundary");
            const [svg, msg] = [...eb.children];
            const g = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }; };
            return { svg: g(svg), msg: g(msg) };
        });
        const withInk = await page.screenshot({ clip: rects.msg });
        const withIconInk = await page.screenshot({ clip: rects.svg });
        await page.evaluate(() => { const eb = document.querySelector(".vj-error-boundary"); [...eb.children].slice(0, 3).forEach((c) => (c.style.visibility = "hidden")); });
        await page.waitForTimeout(250);
        const noInk = await page.screenshot({ clip: rects.msg });
        const noIconInk = await page.screenshot({ clip: rects.svg });
        results.paintIdentity = {
            note: "identical digests ⇒ the ink contributes ZERO pixels; no cure mutation was applied",
            messageRect: rects.msg, iconRect: rects.svg,
            messageWithInk: digest(withInk), messageInkHidden: digest(noInk),
            messageIdentical: digest(withInk) === digest(noInk),
            iconWithInk: digest(withIconInk), iconInkHidden: digest(noIconInk),
            iconIdentical: digest(withIconInk) === digest(noIconInk),
        };
        await page.evaluate(() => { const eb = document.querySelector(".vj-error-boundary"); [...eb.children].slice(0, 3).forEach((c) => (c.style.visibility = "")); });
        await page.waitForTimeout(200);
    }

    // --- (B) seed sweep: lift the plate so the COMPOSITED relation is measurable
    await page.evaluate(() => { document.querySelector(".vj-error-boundary").style.position = "relative"; });
    await page.waitForTimeout(400);
    const boxes = await page.evaluate(() => {
        const eb = document.querySelector(".vj-error-boundary");
        const [svg, msg, detail] = [...eb.children];
        const g = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }; };
        const toRgb = (c) => { const cv = document.createElement("canvas"); cv.width = cv.height = 1; const x = cv.getContext("2d"); x.fillStyle = c; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3); };
        return {
            svg: g(svg), msg: g(msg), detail: detail ? g(detail) : null,
            msgInk: toRgb(getComputedStyle(msg).color),
            iconInk: toRgb(getComputedStyle(svg).color),
            iconOpacity: getComputedStyle(svg).opacity,
            accentLive: getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim(),
        };
    });
    await page.screenshot({ path: `${OUT}/R2-seed-${seed.name}-lifted.png` });
    await page.evaluate(() => { const eb = document.querySelector(".vj-error-boundary"); [...eb.children].forEach((c) => (c.style.visibility = "hidden")); });
    await page.waitForTimeout(250);
    const bgMsg = await meanPng(page, await page.screenshot({ clip: boxes.msg }));
    const bgIcon = await meanPng(page, await page.screenshot({ clip: boxes.svg }));
    results.seeds[seed.name] = {
        caught: true, accentLive: boxes.accentLive,
        messageInk: boxes.msgInk, messageBackdrop: bgMsg, messageContrast: +cr(boxes.msgInk, bgMsg).toFixed(2),
        iconInk: boxes.iconInk, iconBackdrop: bgIcon, iconContrast: +cr(boxes.iconInk, bgIcon).toFixed(2),
        iconRect: boxes.svg,
    };
    await b.close();
}

// --- (C) MOBILE tap target of the sole recovery affordance + (D) motion ----
{
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.route(DOC_RE, (r) => r.abort("failed"));
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(8000);
    await page.evaluate(() => {
        const host = document.querySelector(".dock-mobile-panes");
        const btns = host ? [...host.querySelectorAll("button")] : [];
        if (btns.length >= 2) btns[btns.length - 1].click();
    });
    await page.waitForTimeout(4000);
    results.mobileTap = await page.evaluate(() => {
        const eb = document.querySelector(".vj-error-boundary");
        if (!eb) return { caught: false };
        const btn = eb.querySelector("button");
        const r = btn.getBoundingClientRect();
        const cs = getComputedStyle(btn);
        const ebr = eb.getBoundingClientRect();
        return {
            caught: true,
            buttonRect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: +r.x.toFixed(1), y: +r.y.toFixed(1) },
            meets44: r.width >= 44 && r.height >= 44,
            buttonClasses: btn.className,
            accessibleName: btn.textContent.replace(/\s+/g, " ").trim(),
            boundaryRect: { w: +ebr.width.toFixed(1), h: +ebr.height.toFixed(1) },
            inkAreaShare: null,
            winW: window.innerWidth, winH: window.innerHeight,
            // distance from the button's centre to the nearest viewport edge — a
            // reachability read for a one-handed thumb on the sole exit.
            buttonCentreY: +(r.y + r.height / 2).toFixed(1),
        };
    });
    // --- (D) motion inventory on the caught plate
    results.motion = await page.evaluate(() => {
        const eb = document.querySelector(".vj-error-boundary");
        const btn = eb.querySelector("button");
        const cs = getComputedStyle(eb), bs = getComputedStyle(btn);
        const anims = (el) => (el.getAnimations ? el.getAnimations().map((a) => ({ name: a.animationName || a.constructor.name, playState: a.playState })) : "n/a");
        const canvas = document.querySelector(".atmosphere-canvas");
        return {
            boundary: { animationName: cs.animationName, transition: cs.transitionProperty + " " + cs.transitionDuration, running: anims(eb) },
            button: { animationName: bs.animationName, transitionProperty: bs.transitionProperty, transitionDuration: bs.transitionDuration, running: anims(btn) },
            canvasStillPresent: !!canvas,
            canvasAnimations: canvas ? anims(canvas) : null,
            documentAnimations: document.getAnimations ? document.getAnimations().length : "n/a",
        };
    });
    await b.close();
}

// --- (E) reduced-motion arm: does anything change on the caught plate? -----
{
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.route(DOC_RE, (r) => r.abort("failed"));
    let rafTicks = 0;
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(9000);
    results.reducedMotion = await page.evaluate(async () => {
        const eb = document.querySelector(".vj-error-boundary");
        if (!eb) return { caught: false };
        // count rAF callbacks over 1.5s while the caught plate is up
        let n = 0; const t0 = performance.now();
        await new Promise((res) => { const tick = () => { n++; if (performance.now() - t0 > 1500) return res(); requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
        return {
            caught: true,
            rafPer1_5s: n,
            docAnimations: document.getAnimations().map((a) => a.animationName || "(css-transition)").slice(0, 20),
            boundaryAnimations: eb.getAnimations().length,
        };
    });
    await b.close();
}

fs.writeFileSync(`${OUT}/R2-measurements.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
