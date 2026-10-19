// SS-8 · B13 probe A — desktop 1440×900 cells (light + dark). One browser, one context per cell.
import { launch, cell, routeWall, gotoBrowse, save, palette, WALL, EVID } from "./lib.mjs";

const wall = [
    palette("Probe Zero", 0),
    ...WALL,
    palette("Probe Weighted", 5),
    palette("Probe Invalid", 3),
];
// weighted: 75 / 6.25 ×4 (the U-7 roster); invalid: a non-colour css in the middle band.
wall.find((p) => p.name === "Probe Weighted").colors.forEach((c, i) => (c.weight = i === 0 ? 0.75 : 0.0625));
wall.find((p) => p.name === "Probe Invalid").colors[1].css = "notacolor";

const card = (n) => `[role="article"][aria-label="Palette: ${n}"]`;

/** In-page helpers (contrast via canvas resolution of any CSS colour). */
const HELPERS = () => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    window.__rgba = (css) => {
        cx.clearRect(0, 0, 1, 1);
        cx.fillStyle = "#000";
        cx.fillStyle = css;
        cx.fillRect(0, 0, 1, 1);
        const d = cx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2], d[3] / 255];
    };
    const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    window.__lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    window.__over = (fg, bg) => {
        const a = fg[3];
        return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1);
    };
    window.__cr = (a, b) => {
        const [x, y] = [window.__lum(a), window.__lum(b)].sort((p, q) => q - p);
        return +((x + 0.05) / (y + 0.05)).toFixed(2);
    };
    /** Effective opaque background of an element: walk up compositing bg colours. */
    window.__bg = (el) => {
        const stack = [];
        for (let e = el; e; e = e.parentElement) {
            const c = getComputedStyle(e).backgroundColor;
            const v = window.__rgba(c);
            if (c !== "rgba(0, 0, 0, 0)") stack.push(c);
            if (v[3] === 1 && c !== "rgba(0, 0, 0, 0)") break;
        }
        let acc = [255, 255, 255, 1];
        for (const c of stack.reverse()) acc = window.__over(window.__rgba(c), acc);
        return { acc: acc.map((v, i) => (i < 3 ? Math.round(v) : v)), stack };
    };
};

async function expand(page, name) {
    const before = await page.$eval(card(name), (e) => e.getBoundingClientRect().height);
    await page.click(card(name), { position: { x: 30, y: 20 } });
    await page.waitForTimeout(1200);
    const after = await page.$eval(card(name), (e) => {
        const sw = e.querySelector("[data-palette-swatches]");
        const r = sw?.getBoundingClientRect();
        return {
            h: e.getBoundingClientRect().height,
            panel: sw ? { w: r.width, h: r.height, children: sw.children.length, nodes: sw.querySelectorAll("*").length, filters: sw.querySelectorAll("filter").length, swatches: sw.querySelectorAll('[aria-label^="Color swatch"]').length } : null,
            selected: e.hasAttribute("data-selected"),
        };
    });
    return { before, ...after, delta: +(after.h - before).toFixed(2) };
}

async function desk(page, scheme) {
    await page.addInitScript(HELPERS);
    await routeWall(page, wall);
    await gotoBrowse(page);
    const out = { scheme };

    // ── V-2: expansion geometry per N (expand, measure, collapse) ──
    out.v2 = {};
    for (const n of ["Probe Zero", "Probe Five", "Probe Twentyfour"]) {
        await page.$eval(card(n), (e) => e.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(300);
        out.v2[n] = await expand(page, n);
        await page.click(card(n), { position: { x: 30, y: 20 } }); // collapse
        await page.waitForTimeout(900);
    }

    // ── strip rows: U-4 share, U-6 invalid, U-7 equal + weighted, U-8 RTL ──
    out.strips = await page.evaluate(() => {
        const q = (n) => document.querySelector(`[role="article"][aria-label="Palette: ${n}"]`);
        const bands = (n) => {
            const s = q(n).querySelector("[data-color-strip]");
            const W = s.getBoundingClientRect().width;
            return { W, pct: [...s.querySelectorAll("[data-band]")].map((b) => +((b.getBoundingClientRect().width / W) * 100).toFixed(4)), bg: [...s.querySelectorAll("[data-band]")].map((b) => getComputedStyle(b).backgroundColor) };
        };
        const share = (n) => {
            const c = q(n), s = c.querySelector("[data-color-strip]");
            return { strip: s.getBoundingClientRect().height, host: c.getBoundingClientRect().height, pct: +((s.getBoundingClientRect().height / c.getBoundingClientRect().height) * 100).toFixed(1) };
        };
        const six = bands("Probe Six"), wt = bands("Probe Weighted"), inv = bands("Probe Invalid");
        // RTL: flip one card and read band x order
        const c = q("Probe Three"), s = c.querySelector("[data-color-strip]");
        const xs = () => [...s.querySelectorAll("[data-band]")].map((b) => Math.round(b.getBoundingClientRect().x));
        const ltr = xs(); c.setAttribute("dir", "rtl"); const rtl = xs(); c.removeAttribute("dir");
        return { equal6: six.pct, weighted: wt.pct, invalid: inv.bg, rtl: { ltr, rtl, htmlDir: document.documentElement.getAttribute("dir"), bodyDir: getComputedStyle(document.body).direction }, shareCollapsed: share("Probe Five") };
    });

    // ── WHCM/print roster: does any forced-colors / print rule select the strip? ──
    out.roster = await page.evaluate(() => {
        const s = document.querySelector("[data-color-strip]");
        const hits = { "forced-colors": [], print: [] };
        const walk = (rules, ctx) => {
            for (const r of rules) {
                if (r.media) {
                    const m = r.media.mediaText;
                    const k = /forced-colors/.test(m) ? "forced-colors" : /\bprint\b/.test(m) ? "print" : ctx;
                    walk(r.cssRules, k);
                } else if (r.cssRules && !r.selectorText) walk(r.cssRules, ctx);
                else if (ctx && r.selectorText) {
                    try { if (s.matches(r.selectorText) || s.querySelector("[data-band]")?.matches(r.selectorText)) hits[ctx].push(r.selectorText.slice(0, 120)); } catch {}
                }
            }
        };
        for (const sh of document.styleSheets) { try { walk(sh.cssRules, null); } catch {} }
        return hits;
    });

    // ── expand Five for swatch-level reads ──
    await page.$eval(card("Probe Five"), (e) => e.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(300);
    await expand(page, "Probe Five");
    out.shareExpanded = await page.$eval(card("Probe Five"), (c) => {
        const s = c.querySelector("[data-color-strip]");
        return { strip: s.getBoundingClientRect().height, host: c.getBoundingClientRect().height, pct: +((s.getBoundingClientRect().height / c.getBoundingClientRect().height) * 100).toFixed(1) };
    });

    // ── V-3 numerals at HEAD ──
    out.v3 = await page.$eval(card("Probe Five"), (c) => {
        const bg = window.__bg(c).acc;
        const name = c.querySelector("[data-palette-name]");
        const slug = c.querySelector("[data-palette-swatches] .font-mono")?.parentElement;
        const seamEl = c.querySelector("[data-palette-swatches] > div");
        const nm = getComputedStyle(name), sl = slug && getComputedStyle(slug);
        const seamC = window.__rgba(getComputedStyle(seamEl).borderTopColor);
        return {
            cardFill: bg,
            name: { size: nm.fontSize, weight: nm.fontWeight, family: nm.fontFamily.slice(0, 40), color: nm.color, cr: window.__cr(window.__rgba(nm.color), bg) },
            slug: sl && { size: sl.fontSize, weight: sl.fontWeight, color: sl.color, cr: window.__cr(window.__over(window.__rgba(sl.color), bg), bg) },
            seam: { css: getComputedStyle(seamEl).borderTopColor, width: getComputedStyle(seamEl).borderTopWidth, cr: window.__cr(window.__over(seamC, bg), bg) },
        };
    });

    // ── V-8: 14-Tab transcript from the expanded card ──
    await page.focus(card("Probe Five"));
    out.v8 = [];
    for (let i = 0; i < 14; i++) {
        await page.keyboard.press("Tab");
        out.v8.push(await page.evaluate(() => {
            const a = document.activeElement, r = a.getBoundingClientRect();
            return `${a.tagName.toLowerCase()}|${a.getAttribute("aria-label") ?? a.textContent.trim().slice(0, 30)}|${Math.round(r.width)}x${Math.round(r.height)}|ariaHiddenAnc=${!!a.closest('[aria-hidden="true"]')}`;
        }));
    }
    // ring on the keyboard-focused slug copy (V-3 ring limb)
    await page.focus(card("Probe Five"));
    await page.keyboard.press("Tab");
    out.ring = await page.evaluate(() => {
        const a = document.activeElement, cs = getComputedStyle(a), r = a.getBoundingClientRect();
        return { label: a.getAttribute("aria-label"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} off ${cs.outlineOffset}`, boxShadow: cs.boxShadow.slice(0, 160), rect: [r.x, r.y, r.width, r.height].map(Math.round) };
    });
    if (out.ring.rect) {
        const [x, y, w, h] = out.ring.rect;
        await page.screenshot({ path: `${EVID}/ring-${scheme}.png`, clip: { x: x - 8, y: y - 8, width: w + 16, height: h + 16 } });
    }
    await page.mouse.move(5, 5);
    await page.evaluate(() => document.activeElement?.blur());

    // ── SH-14 / U-3: wrapper vs swatch box ──
    out.sh14 = await page.$$eval(`${card("Probe Five")} [aria-label^="Color swatch"]`, (bs) =>
        bs.slice(0, 2).map((b) => {
            const w = b.parentElement.closest("div.relative") ?? b.parentElement;
            const br = b.getBoundingClientRect(), wr = w.getBoundingClientRect();
            return { swatch: [br.width, br.height], wrapper: [wr.width, wr.height], wrapperDisplay: getComputedStyle(w).display, lineHeight: getComputedStyle(w).lineHeight };
        }),
    );

    // ── V-1 / SH U-1 / U-4: hover a swatch, read the panel ──
    const sw = page.locator(`${card("Probe Five")} [aria-label^="Color swatch"]`).nth(2);
    const scrollH0 = await page.evaluate(() => document.scrollingElement.scrollHeight);
    // V-7 instrumentation: mutation count on sibling swatch hosts while hovering
    await page.$eval(card("Probe Five"), (c) => {
        const hosts = [...c.querySelectorAll("[data-palette-swatches] div.relative")];
        window.__mut = new Set();
        window.__mo = new MutationObserver((ms) => ms.forEach((m) => { const h = hosts.findIndex((x) => x.contains(m.target)); if (h >= 0) window.__mut.add(h); }));
        hosts.forEach((h) => window.__mo.observe(h, { subtree: true, attributes: true, childList: true }));
    });
    await sw.hover();
    await page.waitForTimeout(900);
    out.hover = await page.evaluate((h0) => {
        const p = document.querySelector('[aria-label^="Actions for"]');
        const r = p?.getBoundingClientRect();
        const wrap = p?.closest("[data-reka-popper-content-wrapper]");
        return {
            open: !!p, rect: r && [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(2)),
            position: p && getComputedStyle(wrap ?? p).position,
            inlineTop: (wrap ?? p)?.style.top || null,
            padding: p && getComputedStyle(p).padding,
            buttons: p && [...p.querySelectorAll("button")].map((b) => [b.getAttribute("aria-label"), +b.getBoundingClientRect().width.toFixed(2), +b.getBoundingClientRect().height.toFixed(2)]),
            ariaHidden: p && !!p.closest('[aria-hidden="true"]'),
            scrollH: [h0, document.scrollingElement.scrollHeight],
            viewport: [innerWidth, innerHeight],
            mutatedHosts: [...window.__mut],
        };
    }, scrollH0);
    await page.screenshot({ path: `${EVID}/hover-panel-1440-${scheme}.png` });

    // ── V-7: hover sweep cost over N=24 (frame times + mutated hosts) ──
    await page.mouse.move(5, 5);
    await page.waitForTimeout(400);
    await page.click(card("Probe Five"), { position: { x: 30, y: 20 } });
    await page.waitForTimeout(700);
    await page.$eval(card("Probe Twentyfour"), (e) => e.scrollIntoView({ block: "start" }));
    await expand(page, "Probe Twentyfour");
    await page.$eval(card("Probe Twentyfour"), (c) => {
        const hosts = [...c.querySelectorAll("[data-palette-swatches] div.relative")];
        window.__mut2 = new Map();
        new MutationObserver((ms) => ms.forEach((m) => { const h = hosts.findIndex((x) => x.contains(m.target)); if (h >= 0) window.__mut2.set(h, (window.__mut2.get(h) ?? 0) + 1); })).observe(c.querySelector("[data-palette-swatches]"), { subtree: true, attributes: true, childList: true });
        window.__frames = []; let last = performance.now();
        const tick = (t) => { window.__frames.push(t - last); last = t; if (window.__frames.length < 400) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
    });
    const boxes = await page.$$eval(`${card("Probe Twentyfour")} [aria-label^="Color swatch"]`, (bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }));
    for (const [x, y] of boxes.slice(0, 12)) { await page.mouse.move(x, y, { steps: 4 }); await page.waitForTimeout(120); }
    out.v7 = await page.evaluate(() => {
        const f = window.__frames.slice(2).sort((a, b) => a - b);
        const pct = (p) => +f[Math.floor((f.length - 1) * p)].toFixed(2);
        return { frames: f.length, p50: pct(0.5), p95: pct(0.95), max: pct(1), over33: f.filter((x) => x > 33.4).length, mutationsPerHost: Object.fromEntries(window.__mut2) };
    });

    // ── V-4: press spring on the card under a swatch ──
    await page.mouse.move(5, 5);
    await page.waitForTimeout(500);
    const [px, py] = boxes[0];
    await page.mouse.move(px, py);
    await page.evaluate(() => { window.__press = []; const c = document.querySelector('[role="article"][aria-label="Palette: Probe Twentyfour"]'); const t0 = performance.now(); const s = () => { window.__press.push([Math.round(performance.now() - t0), c.style.getPropertyValue("--card-press-t") || getComputedStyle(c).getPropertyValue("--card-press-t"), +c.getBoundingClientRect().height.toFixed(2), getComputedStyle(c).transform.slice(0, 60)]); if (performance.now() - t0 < 700) requestAnimationFrame(s); }; requestAnimationFrame(s); });
    await page.mouse.down();
    await page.waitForTimeout(400);
    await page.mouse.up();
    await page.waitForTimeout(400);
    out.v4 = await page.evaluate(() => { const p = window.__press; return { samples: p.length, first: p[0], peakT: p.reduce((m, x) => Math.max(m, parseFloat(x[1]) || 0), 0), heights: [Math.min(...p.map((x) => x[2])), Math.max(...p.map((x) => x[2]))], transforms: [...new Set(p.map((x) => x[3]))].slice(0, 4), styleAttr: document.querySelector('[role="article"][aria-label="Palette: Probe Twentyfour"]').getAttribute("style") }; });
    out.popoverAfterPress = await page.evaluate(() => !!document.querySelector('[aria-label^="Actions for"]'));

    // ── V-11: glass `touch-hit-area` live read ──
    out.v11 = await page.evaluate(() => {
        const d = document.createElement("button");
        d.className = "touch-hit-area"; d.textContent = "x";
        Object.assign(d.style, { position: "fixed", left: "300px", top: "300px", width: "20px", height: "20px", zIndex: 99999 });
        document.body.appendChild(d);
        const b = getComputedStyle(d, "::before");
        const r = d.getBoundingClientRect();
        const hitOutside = document.elementFromPoint(r.x - 6, r.y + 10) === d;
        const res = { content: b.content, position: b.position, inset: b.inset, pointerEvents: b.pointerEvents, minW: b.minWidth, width: b.width, height: b.height, hitAt6pxOutside: hitOutside, ruleFound: [...document.styleSheets].some((s) => { try { return [...s.cssRules].some((x) => (x.cssText || "").includes("touch-hit-area")); } catch { return false; } }) };
        d.remove();
        return res;
    });

    // ── SH U-5: accessible swatch nodes ──
    out.a11y = { swatchButtons: await page.getByRole("button", { name: /Color swatch/ }).count(), snapshot: (await page.locator(`${card("Probe Twentyfour")} [data-palette-swatches]`).ariaSnapshot()).split("\n").slice(0, 6) };
    return out;
}

const browser = await launch();
try {
    const res = {};
    for (const scheme of ["light", "dark"]) {
        res[scheme] = await cell(browser, { colorScheme: scheme }, (p) => desk(p, scheme));
    }
    console.log(save("probe-a.json", res));
    console.log(JSON.stringify(res).slice(0, 200));
} finally {
    await browser.close();
}
