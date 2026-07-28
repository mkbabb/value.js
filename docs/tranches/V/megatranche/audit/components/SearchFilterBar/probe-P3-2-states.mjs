// CHALLENGE-D pass-3 · probe 2 — HIT GEOMETRY, DIVIDERS, LIGHT SOURCE, CONTRAST, STATE MATRIX.
// Read-only. Network responses are stubbed (no source edits) so the Tags section, the badge and
// the Clear-all row actually render. WebKit.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "evidence-p3");
const SHOTS = resolve(HERE, "shots-p3");
mkdirSync(OUT, { recursive: true });
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";

const TAGS = ["pastel", "neon", "earthy", "monochrome", "retro", "vaporwave", "muted", "high-contrast", "warm", "cool"]
    .map((name, i) => ({ name, count: 20 - i }));
const PALETTES = Array.from({ length: 6 }, (_, i) => ({
    slug: `p3-${i}`, name: `P3 ${i}`,
    colors: ["#4488cc", "#cc4488", "#88cc44", "#cccc44"],
    oklabColors: [{ L: 0.6, a: -0.02, b: -0.12 }],
    userSlug: "someone", visibility: "public", tier: i % 2 ? "featured" : null,
    tags: [TAGS[i % TAGS.length].name], votes: 3, forkCount: 1,
    createdAt: new Date().toISOString(),
}));

async function stub(context) {
    await context.route(/\/colors\/tags/, (r) =>
        r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) }));
    await context.route(/\/colors(\?|$)/, (r) =>
        r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ palettes: PALETTES, nextCursor: null }) }));
    await context.route(/api\.color\.babb\.dev\/.*/, (r) => {
        const u = r.request().url();
        if (u.includes("/colors/tags")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) });
        if (u.includes("/colors")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ palettes: PALETTES, nextCursor: null }) });
        return r.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
}

const MEASURE = () => {
    const r = (n) => (n == null ? null : +Number(n).toFixed(2));
    const rect = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: r(b.x), y: r(b.y), w: r(b.width), h: r(b.height), right: r(b.right), bottom: r(b.bottom) }; };

    // ---- srgb contrast ------------------------------------------------------
    const toRGB = (s) => {
        const m = s.match(/-?[\d.]+/g);
        if (!m) return null;
        if (s.startsWith("oklab") || s.startsWith("oklch") || s.startsWith("color(")) return "NONSRGB:" + s;
        return [+m[0], +m[1], +m[2], m[3] !== undefined ? +m[3] : 1];
    };
    const lum = (c) => { const f = c.map((v) => { const x = v / 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
    const contrast = (fg, bg) => {
        const a = toRGB(fg), b = toRGB(bg);
        if (!Array.isArray(a) || !Array.isArray(b)) return { fg, bg, ratio: null };
        const la = lum(a), lb = lum(b);
        return { fg, bg, ratio: +(((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05))).toFixed(2) };
    };
    const effectiveBg = (el) => {
        let n = el;
        while (n && n !== document.documentElement) {
            const bg = getComputedStyle(n).backgroundColor;
            const m = bg.match(/-?[\d.]+/g);
            if (bg && bg !== "transparent" && !(m && m.length === 4 && +m[3] === 0)) return bg;
            n = n.parentElement;
        }
        return getComputedStyle(document.body).backgroundColor;
    };

    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    const trig = document.querySelector('button[aria-label="Filters"]');
    if (!dlg) return { open: false };

    const carrier = dlg.querySelector(".divide-y");
    const sections = [...dlg.querySelectorAll(".filter-section")];
    const options = [...dlg.querySelectorAll(".filter-option")];

    // ---- A. hit-test scan through the option column --------------------------
    const first = options[0], last = options[options.length - 1];
    const scanX = first ? first.getBoundingClientRect().x + 8 : 0;
    const y0 = Math.round(first.getBoundingClientRect().y) - 12;
    const y1 = Math.round(options[4]?.getBoundingClientRect().bottom ?? last.getBoundingClientRect().bottom) + 12;
    const scan = [];
    for (let y = y0; y <= y1; y += 1) {
        const el = document.elementFromPoint(scanX, y);
        if (!el) { scan.push({ y, hit: null }); continue; }
        const ownerRow = options.findIndex((o) => o === el || o.contains(el));
        const geomRow = options.findIndex((o) => { const b = o.getBoundingClientRect(); return y >= b.y && y <= b.bottom; });
        scan.push({ y, tag: el.tagName.toLowerCase(), role: el.getAttribute("role"), ownerRow, geomRow });
    }
    const mismatches = scan.filter((s) => s.ownerRow >= 0 && s.geomRow >= 0 && s.ownerRow !== s.geomRow);
    const deadBand = scan.filter((s) => s.geomRow >= 0 && s.ownerRow < 0);

    // marker boxes vs row boxes
    const rows = options.map((o, i) => {
        const marker = o.querySelector('button[role="radio"],button[role="checkbox"],[role="radio"],[role="checkbox"]');
        const spans = [...o.querySelectorAll("span")];
        const textSpan = spans[spans.length - 1];
        const mr = rect(marker), or = rect(o);
        // visible indicator ink: the marker's own painted box (border-box of its deepest styled child, else itself)
        let vis = null;
        if (marker) {
            const cs = getComputedStyle(marker);
            vis = { padding: cs.padding, borderRadius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderWidth + " " + cs.borderColor, before: getComputedStyle(marker, "::before").content };
            const kid = marker.firstElementChild;
            vis.childRect = rect(kid);
        }
        return {
            i, label: o.textContent.trim().slice(0, 20), row: or, marker: mr, markerStyle: vis,
            textInkX: textSpan ? r(textSpan.getBoundingClientRect().x) : null,
            markerOverhangTop: mr && or ? r(or.y - mr.y) : null,
            markerOverhangLeft: mr && or ? r(or.x - mr.x) : null,
        };
    });
    const rowPitch = rows.length > 1 && rows[0].row && rows[1].row ? r(rows[1].row.y - rows[0].row.y) : null;
    const markerOverlap = rows.length > 1 && rows[0].marker && rows[1].marker ? r(rows[0].marker.bottom - rows[1].marker.y) : null;

    // ---- C. dividers ---------------------------------------------------------
    const dividers = carrier ? [...carrier.children].map((ch, i) => {
        const c = getComputedStyle(ch);
        return { i, cls: String(ch.className).slice(0, 30), top: c.borderTopWidth, bottom: c.borderBottomWidth, topColor: c.borderTopColor, bottomColor: c.borderBottomColor };
    }) : [];
    const paintedDividers = dividers.filter((d) => parseFloat(d.top) > 0 || parseFloat(d.bottom) > 0).length;

    // ---- D. light source -----------------------------------------------------
    const swatch = dlg.querySelector('button[aria-label^="Open color picker"]');
    const seated = document.querySelector(".search-seated");
    const card = document.querySelector("article, .glass-card, [class*='card']");
    const rootCS = getComputedStyle(document.documentElement);
    const light = {
        tokenCartoon: rootCS.getPropertyValue("--shadow-cartoon").trim(),
        tokenCartoonSm: rootCS.getPropertyValue("--shadow-cartoon-sm").trim(),
        tokenCartoonMd: rootCS.getPropertyValue("--shadow-cartoon-md").trim(),
        tokenCard: rootCS.getPropertyValue("--shadow-card").trim(),
        swatchShadow: swatch ? getComputedStyle(swatch).boxShadow : null,
        seatedShadow: seated ? getComputedStyle(seated).boxShadow : null,
        popoverShadow: getComputedStyle(dlg).boxShadow,
        cardShadow: card ? getComputedStyle(card).boxShadow : null,
    };

    // ---- E. contrast ---------------------------------------------------------
    const badge = trig?.querySelector("span");
    const input = dlg.querySelector('input[aria-label="Search by CSS color"]');
    const searchBtn = input ? input.parentElement.querySelector("button") : null;
    const clearBtn = [...dlg.querySelectorAll("button")].find((b) => b.textContent.includes("Clear all"));
    const label0 = dlg.querySelector(".section-label");
    const contrasts = {
        badge: badge ? contrast(getComputedStyle(badge).color, getComputedStyle(badge).backgroundColor) : null,
        optionInk: options[0] ? contrast(getComputedStyle(options[0]).color, effectiveBg(options[0])) : null,
        sectionLabel: label0 ? contrast(getComputedStyle(label0).color, effectiveBg(label0)) : null,
        searchPill: searchBtn ? contrast(getComputedStyle(searchBtn).color, effectiveBg(searchBtn)) : null,
        clearAll: clearBtn ? contrast(getComputedStyle(clearBtn).color, effectiveBg(clearBtn)) : null,
        inputInk: input ? contrast(getComputedStyle(input).color, effectiveBg(input)) : null,
    };

    // ---- F. tags overflow ----------------------------------------------------
    const scroller = dlg.querySelector(".max-h-28");
    const tags = scroller ? {
        rect: rect(scroller), scrollH: scroller.scrollHeight, clientH: scroller.clientHeight,
        overflowing: scroller.scrollHeight > scroller.clientHeight + 1,
        count: scroller.querySelectorAll("label").length,
        scrollbarWidthPx: r(scroller.offsetWidth - scroller.clientWidth),
        overflowY: getComputedStyle(scroller).overflowY,
        maskImage: getComputedStyle(scroller).maskImage,
        rowsVisible: r(scroller.clientHeight / (scroller.querySelector("label")?.getBoundingClientRect().height || 1)),
    } : null;

    // ---- G. clear-all row rhythm ---------------------------------------------
    const clearRow = clearBtn ? clearBtn.parentElement : null;
    const rhythm = carrier ? [...carrier.children].map((ch) => {
        const c = getComputedStyle(ch);
        return { cls: String(ch.className).slice(0, 24), pad: `${c.paddingTop}/${c.paddingRight}/${c.paddingBottom}/${c.paddingLeft}`, h: r(ch.getBoundingClientRect().height) };
    }) : [];

    // ---- H. motion -----------------------------------------------------------
    const spinner = dlg.querySelector(".animate-spin");
    const motion = {
        optionTransition: options[0] ? getComputedStyle(options[0]).transition : null,
        swatchTransition: swatch ? getComputedStyle(swatch).transition : null,
        searchPillTransition: searchBtn ? getComputedStyle(searchBtn).transition : null,
        dialogAnimation: getComputedStyle(dlg).animation,
        dialogTransition: getComputedStyle(dlg).transition,
        spinnerPresent: !!spinner,
        prefersReducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
        forcedColors: matchMedia("(forced-colors: active)").matches,
        // does any stylesheet carry a reduced-motion blanket?
        reducedMotionBlanketRules: (() => {
            let n = 0;
            for (const sheet of document.styleSheets) {
                let rules; try { rules = sheet.cssRules; } catch { continue; }
                const walk = (l) => { for (const rr of l) { if (rr.media && String(rr.media.mediaText).includes("prefers-reduced-motion")) n++; if (rr.cssRules) walk(rr.cssRules); } };
                walk(rules);
            }
            return n;
        })(),
    };

    // ---- I. forced-colors truth on the swatch --------------------------------
    const swatchPaint = swatch ? {
        inlineStyle: swatch.getAttribute("style"),
        computedBg: getComputedStyle(swatch).backgroundColor,
        computedBorder: getComputedStyle(swatch).borderColor,
        forcedColorAdjust: getComputedStyle(swatch).forcedColorAdjust,
    } : null;

    // ---- J. overflow / containment ------------------------------------------
    const de = document.documentElement;
    const geometry = {
        dialog: rect(dlg),
        viewport: { w: innerWidth, h: innerHeight },
        dialogTallerThanViewport: dlg.getBoundingClientRect().height > innerHeight,
        dialogBottomOverflowPx: r(dlg.getBoundingClientRect().bottom - innerHeight),
        dialogTopOverflowPx: r(0 - dlg.getBoundingClientRect().top),
        dialogOverflowY: getComputedStyle(dlg).overflowY,
        dialogScrollH: dlg.scrollHeight, dialogClientH: dlg.clientHeight,
        docHorizontalOverflow: de.scrollWidth - de.clientWidth,
        dir: de.getAttribute("dir") || getComputedStyle(de).direction,
    };

    return {
        open: true, geometry, rows, rowPitch, markerOverlap,
        hitScan: { scanX: r(scanX), y0, y1, mismatchCount: mismatches.length, mismatches: mismatches.slice(0, 40), deadBandCount: deadBand.length },
        dividers, paintedDividers, light, contrasts, tags, rhythm, motion, swatchPaint,
        badgeRect: badge ? rect(badge) : null,
        badgeText: badge?.textContent.trim() ?? null,
        triggerRect: rect(trig), triggerContain: trig ? getComputedStyle(trig).contain : null,
        searchPillRect: searchBtn ? rect(searchBtn) : null,
        inputRect: input ? rect(input) : null,
    };
};

const MATRIX = [
    { id: "P3-tall-desktop-light", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
    { id: "P3-tall-desktop-dark", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
    { id: "P3-tall-mobile", ctx: { ...devices["iPhone 14"] } },
    { id: "P3-tall-forced-colors", ctx: { viewport: { width: 1440, height: 900 }, forcedColors: "active" } },
    { id: "P3-tall-reduced-motion", ctx: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" } },
    { id: "P3-tall-zoom200", ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 } },
    { id: "P3-tall-rtl", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" }, rtl: true },
];

const browser = await webkit.launch();
const out = {};
for (const m of MATRIX) {
    const context = await browser.newContext(m.ctx);
    await stub(context);
    const page = await context.newPage();
    if (m.rtl) await page.addInitScript(() => {
        document.addEventListener("DOMContentLoaded", () => document.documentElement.setAttribute("dir", "rtl"));
        new MutationObserver(() => { if (document.documentElement.getAttribute("dir") !== "rtl") document.documentElement.setAttribute("dir", "rtl"); }).observe(document.documentElement, { attributes: true });
    });
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2800);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(600);
    // drive to the TALLEST legal state: Featured + two tags => badge = 3, Clear-all visible
    await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"][data-state="open"]');
        [...dlg.querySelectorAll("label")].find((l) => l.textContent.trim() === "Featured")?.click();
    });
    await page.waitForTimeout(300);
    await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"][data-state="open"]');
        const tagLabels = [...(dlg.querySelector(".max-h-28")?.querySelectorAll("label") ?? [])];
        tagLabels[0]?.click(); tagLabels[1]?.click();
    });
    await page.waitForTimeout(500);
    out[m.id] = await page.evaluate(MEASURE);
    await page.screenshot({ path: resolve(SHOTS, `${m.id}-open.png`) });
    // closed frame, so the badge is photographed
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    out[m.id].closedBadge = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Filters"]');
        const s = t?.querySelector("span");
        if (!s) return null;
        const b = s.getBoundingClientRect(), tb = t.getBoundingClientRect();
        const cs = getComputedStyle(s);
        const hits = {};
        for (const [k, [x, y]] of Object.entries({
            centre: [b.x + b.width / 2, b.y + b.height / 2],
            top: [b.x + b.width / 2, b.y + 1.5],
            right: [b.right - 1.5, b.y + b.height / 2],
        })) { const el = document.elementFromPoint(x, y); hits[k] = el === s; }
        return {
            rect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
            overhangTop: +(tb.top - b.top).toFixed(1), overhangRight: +(b.right - tb.right).toFixed(1),
            overhangLeft: +(tb.left - b.left).toFixed(1),
            text: s.textContent.trim(), bg: cs.backgroundColor, color: cs.color, fontSize: cs.fontSize,
            triggerContain: getComputedStyle(t).contain, hits,
            hitCount: Object.values(hits).filter(Boolean).length,
        };
    });
    await page.screenshot({ path: resolve(SHOTS, `${m.id}-closed.png`) });
    await context.close();
}
await browser.close();
writeFileSync(resolve(OUT, "P3-2-states.json"), JSON.stringify(out, null, 1));
console.log("WROTE", resolve(OUT, "P3-2-states.json"));
for (const [k, v] of Object.entries(out)) {
    console.log("==", k, "open:", v.open, "paintedDividers:", v.paintedDividers,
        "hitMismatch:", v.hitScan?.mismatchCount, "markerOverlap:", v.markerOverlap,
        "badge:", JSON.stringify(v.closedBadge?.rect), "hits:", v.closedBadge?.hitCount);
}
