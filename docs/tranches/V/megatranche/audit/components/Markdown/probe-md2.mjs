// CHALLENGE-D · Markdown.vue — probe 2: measure, code-chip split, dark chroma,
// header collision, mobile reachability, forced-colors.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const OUT = resolve(HERE, "frames");
mkdirSync(OUT, { recursive: true });

const out = {};

// ── A. prose measure at three desktop widths ──────────────────────────────
{
    const browser = await webkit.launch();
    out.measure = [];
    for (const w of [1440, 1920, 2560]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 1000 }, colorScheme: "light" });
        const page = await ctx.newPage();
        await page.goto(ORIGIN + "/#/", { waitUntil: "networkidle" });
        await page.waitForTimeout(3500);
        const m = await page.evaluate(() => {
            const body = document.querySelector(".markdown-body");
            if (!body) return null;
            const cs = getComputedStyle(body);
            // ch measured OUTSIDE the content-visibility subtree
            const probe = document.createElement("span");
            probe.style.cssText = "position:fixed;left:-9999px;top:0;white-space:pre;";
            probe.style.fontFamily = cs.fontFamily;
            probe.style.fontSize = cs.fontSize;
            probe.textContent = "0".repeat(100);
            document.body.appendChild(probe);
            const ch = probe.getBoundingClientRect().width / 100;
            probe.remove();
            const p = body.querySelector(":scope > p");
            return {
                maxInlineSize: cs.maxInlineSize,
                bodyPx: +body.getBoundingClientRect().width.toFixed(1),
                chPx: +ch.toFixed(3),
                bodyCh: +(body.getBoundingClientRect().width / ch).toFixed(1),
                paraCh: p ? +(p.getBoundingClientRect().width / ch).toFixed(1) : null,
            };
        });
        out.measure.push({ viewportWidth: w, ...m });
        await ctx.close();
    }
    await browser.close();
}

// ── B/C/D. code-chip split, dark chroma, header collision ─────────────────
for (const scheme of ["light", "dark"]) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "networkidle" });
    await page.waitForTimeout(3500);

    const codeSplit = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        const codes = [...body.querySelectorAll("code")];
        const groups = {};
        for (const c of codes) {
            const parent = c.parentElement.tagName;
            const s = getComputedStyle(c);
            const key = `${parent}>code`;
            groups[key] ??= { n: 0, color: s.color, paddingLeft: s.paddingLeft, paddingTop: s.paddingTop, fontSize: s.fontSize, bg: s.backgroundColor };
            groups[key].n++;
        }
        return { total: codes.length, groups };
    });

    const inkDeltas = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        const g = (sel) => { const e = body.querySelector(sel); return e ? getComputedStyle(e).color : null; };
        // resolve to rgb by painting
        const resolve = (css) => {
            const d = document.createElement("div");
            d.style.color = css; document.body.appendChild(d);
            const v = getComputedStyle(d).color; d.remove(); return v;
        };
        const parse = (s) => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
        const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
        const relLum = ([r, gg, b]) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
        const contrast = (a, b) => { const [x, y] = [relLum(a) + 0.05, relLum(b) + 0.05].sort((m, n) => n - m); return +(x / y).toFixed(2); };
        const h2 = parse(resolve(g("h2")));
        const h3 = parse(resolve(g("h3")));
        const p = parse(resolve(g("p")));
        const plate = (() => { const card = body.closest(".about-card"); let el = card; while (el) { const bg = getComputedStyle(el).backgroundColor; if (bg && bg !== "rgba(0, 0, 0, 0)" && !/, 0\)$/.test(bg)) return parse(bg); el = el.parentElement; } return [255, 255, 255]; })();
        const dist = (a, b) => +Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]).toFixed(1);
        return {
            h2Rgb: h2, h3Rgb: h3, pRgb: p, plateRgb: plate,
            h2_vs_p_rgbDist: dist(h2, p),
            h2_vs_h3_rgbDist: dist(h2, h3),
            h2_contrast_on_plate: contrast(h2, plate),
            p_contrast_on_plate: contrast(p, plate),
            h2_contrast_vs_p: contrast(h2, p),
        };
    });

    // header collision: scroll the card and measure overlap
    const collision = await page.evaluate(async () => {
        const body = document.querySelector(".markdown-body");
        const scroller = body.closest(".about-card");
        const header = document.querySelector(".about-card .pane-header");
        if (!header) return { headerFound: false };
        scroller.scrollTop = 2000;
        await new Promise((r) => setTimeout(r, 600));
        const hr = header.getBoundingClientRect();
        const hcs = getComputedStyle(header);
        const before = getComputedStyle(header, "::before");
        const overlapping = [];
        for (const el of body.querySelectorAll("h2,h3,p,li")) {
            const r = el.getBoundingClientRect();
            if (r.bottom > hr.top && r.top < hr.bottom && r.height > 0) {
                overlapping.push({ tag: el.tagName, text: (el.textContent || "").trim().slice(0, 46), overlapPx: +(Math.min(r.bottom, hr.bottom) - Math.max(r.top, hr.top)).toFixed(1), opacity: getComputedStyle(el).opacity });
            }
        }
        return {
            headerFound: true,
            headerPosition: hcs.position,
            headerZ: hcs.zIndex,
            headerBg: hcs.backgroundColor,
            veilBg: before.backgroundColor,
            veilOpacity: before.opacity,
            headerRect: { top: +hr.top.toFixed(1), height: +hr.height.toFixed(1) },
            overlappingCount: overlapping.length,
            overlapping: overlapping.slice(0, 6),
        };
    });

    out[scheme] = { codeSplit, inkDeltas, collision };
    await page.screenshot({ path: resolve(OUT, `${scheme}-header-collision.png`), clip: { x: 1010, y: 130, width: 430, height: 320 } }).catch(() => {});
    await browser.close();
}

// ── E. mobile reachability of the About pane ──────────────────────────────
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ ...devices["iPhone 14"], colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "networkidle" });
    await page.waitForTimeout(3500);
    const controls = await page.evaluate(() =>
        [...document.querySelectorAll("button,[role=tab],[role=button]")].map((b) => ({
            tag: b.tagName, label: (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 30),
        })).filter((x) => x.label),
    );
    let found = await page.locator(".markdown-body").count();
    // try swiping the pane deck
    if (!found) {
        await page.mouse.move(300, 500); await page.mouse.down(); await page.mouse.move(40, 500, { steps: 12 }); await page.mouse.up();
        await page.waitForTimeout(2500);
        found = await page.locator(".markdown-body").count();
    }
    let m = null;
    if (found) {
        m = await page.evaluate(() => {
            const b = document.querySelector(".markdown-body");
            const cs = getComputedStyle(b);
            return { widthPx: +b.getBoundingClientRect().width.toFixed(1), maxInlineSize: cs.maxInlineSize, scrollW: b.scrollWidth, clientW: b.clientWidth, overflowX: b.scrollWidth - b.clientWidth };
        });
        await page.locator(".markdown-wrapper").first().scrollIntoViewIfNeeded().catch(() => {});
        await page.waitForTimeout(600);
        await page.screenshot({ path: resolve(OUT, "mobile-light-markdown.png") });
    }
    out.mobile = { markdownFound: !!found, controls: controls.slice(0, 24), measure: m };
    await browser.close();
}

// ── F. forced-colors + reduced-motion ─────────────────────────────────────
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "networkidle" });
    await page.waitForTimeout(3500);
    out.forced = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        if (!body) return { found: false };
        const g = (s) => { const e = body.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return { color: c.color, bg: c.backgroundColor, transitionDuration: c.transitionDuration, forcedColorAdjust: c.forcedColorAdjust }; };
        return { found: true, h2: g("h2"), h3: g("h3"), p: g("p"), code: g("code"), mark: g("mark.cs-name"), hr: g("hr") };
    });
    await page.screenshot({ path: resolve(OUT, "forced-colors-markdown.png") });
    await browser.close();
}

writeFileSync(resolve(HERE, "probe-md2.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
