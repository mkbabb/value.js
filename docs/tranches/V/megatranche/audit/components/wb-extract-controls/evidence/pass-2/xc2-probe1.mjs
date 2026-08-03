import { webkit } from "playwright";

const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [], consoleErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(2500);

// ---------- 1. range vs track paint --------------------------------------
out("SLIDER PAINT (range vs track)", await page.evaluate(() => {
    const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
    const cr = (a, b2) => { const l1 = Math.max(L(a), L(b2)), l2 = Math.min(L(a), L(b2)); return +((l1 + 0.05) / (l2 + 0.05)).toFixed(3); };
    const px = (css) => { const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d"); x.fillStyle = "#808080"; x.fillRect(0, 0, 1, 1); x.fillStyle = css; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const res = [];
    for (const name of ["Number of colors", "Chroma weight"]) {
        const thumb = document.querySelector(`[aria-label="${name}"]`);
        if (!thumb) { res.push({ name, missing: true }); continue; }
        let root = thumb;
        while (root && !root.querySelector('[class*="slider-track"]')) root = root.parentElement;
        const range = root.querySelector('[class*="slider-range"]');
        const track = root.querySelector('[class*="slider-track"]');
        const rcs = getComputedStyle(range), tcs = getComputedStyle(track);
        res.push({
            name,
            rootCls: root.className,
            rangeBg: rcs.backgroundColor, rangeImg: rcs.backgroundImage.slice(0, 70),
            trackBg: tcs.backgroundColor, trackImg: tcs.backgroundImage.slice(0, 70),
            rangeVsTrackContrast: cr(px(rcs.backgroundColor), px(tcs.backgroundColor)),
            rangeW: +range.getBoundingClientRect().width.toFixed(1),
            trackW: +track.getBoundingClientRect().width.toFixed(1),
        });
    }
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const rcs2 = getComputedStyle(rail);
    res.push({ rail: true, bgColor: rcs2.backgroundColor, bgImage: rcs2.backgroundImage, boxShadow: rcs2.boxShadow });
    return res;
}));

// ---------- 2. thumb a11y attributes -------------------------------------
out("THUMB A11Y", await page.evaluate(() =>
    [...document.querySelectorAll('[aria-label="Number of colors"],[aria-label="Chroma weight"]')].map((t) => ({
        label: t.getAttribute("aria-label"), role: t.getAttribute("role"),
        valuenow: t.getAttribute("aria-valuenow"), valuetext: t.getAttribute("aria-valuetext"),
        min: t.getAttribute("aria-valuemin"), max: t.getAttribute("aria-valuemax"),
        tabindex: t.getAttribute("tabindex"),
    }))));

// ---------- 3. keyboard-step kC, watch the raw float ---------------------
await page.locator('[aria-label="Chroma weight"]').focus();
const steps = [];
for (let i = 0; i < 11; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(40);
    steps.push(await page.evaluate(() => {
        const t = document.querySelector('[aria-label="Chroma weight"]');
        const readout = [...document.querySelectorAll("span.tabular-nums")].find((s) => /^\d\.\d$/.test(s.textContent.trim()));
        return { now: t.getAttribute("aria-valuenow"), vt: t.getAttribute("aria-valuetext"), shown: readout ? readout.textContent.trim() : null };
    }));
}
out("kC KEYBOARD STEPS (raw aria-valuenow vs shown)", steps);

out("kC READOUT BOX at max", await page.evaluate(() => {
    const s = [...document.querySelectorAll("span.tabular-nums")].find((n) => /^\d\.\d$/.test(n.textContent.trim()));
    return s ? { text: s.textContent.trim(), clientW: s.clientWidth, scrollW: s.scrollWidth, offsetW: s.offsetWidth, clipped: s.scrollWidth > s.clientWidth, overflow: getComputedStyle(s).overflow, cls: s.className } : null;
}));

// ---------- 4. certifyAccentInk cost ------------------------------------
out("certifyAccentInk COST", await page.evaluate(async () => {
    try {
        const m = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/ink.ts");
        const f = m.certifyAccentInk;
        const cs = ["oklch(0.55 0.22 10)", "oklch(0.7 0.15 200)", "oklch(0.35 0.09 300)"];
        f(cs[0], 0.8, 3);
        const N = 300;
        const t0 = performance.now();
        for (let i = 0; i < N; i++) f(cs[i % 3], 0.6 + (i % 40) / 200, 3);
        const dt = performance.now() - t0;
        return { N, totalMs: +dt.toFixed(2), perCallMs: +(dt / N).toFixed(4) };
    } catch (e) { return { error: String(e) }; }
}));

// ---------- 5. malformed cssColor into the certify path -----------------
out("certifyAccentInk MALFORMED INPUTS", await page.evaluate(async () => {
    const m = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/ink.ts");
    const probes = ["oklch()", "", "rgb(", "oklch(none none none)", "color(display-p3 1 0 0)", "oklch(0 0 0)", "oklch(1 0 0)", "transparent", "rgb(0 0 0 / 0)", "NaN"];
    return probes.map((p) => {
        try { return { in: p, out: String(m.certifyAccentInk(p, 0.8, 3)).slice(0, 60) }; }
        catch (e) { return { in: p, THREW: String(e).slice(0, 100) }; }
    });
}));

await ctx.close();
await b.close();
console.log("\npageErrors:", JSON.stringify(pageErrors));
console.log("consoleErrors:", JSON.stringify(consoleErrors.slice(0, 5)));
