/**
 * T.W8 · CRITIQUE PASS 11 — MICRO-CHROME ROSTER + THROWN-ERROR STATE
 * (O-3 probe class; PROBE-ONLY, no writes to the app tree). Drives the LANE
 * server :8700 (VJS_E2E_PORT; PERF_PORT 8701 reserved unused) with the API
 * pointed at a DEAD port (127.0.0.1:8709) so palette browse network-fails →
 * the BrowsePane error plate renders (the forced-throw the pass judges).
 * The owner's :9000 is never touched.
 *
 * HEADLESS chromium (classic, overlay-less scrollbars = the NON-MAC forced-
 * scrollbar context the roster item 2 demands), dpr 2.
 *
 * Legs:
 *   1 · document.title (roster 4).
 *   2 · the [title=] native-tooltip roster BEYOND the dock set (roster 5).
 *   3 · ::selection ink — declared rules census + getComputedStyle(el,
 *       '::selection') + a real Range selection screenshot (roster 1),
 *       both schemes.
 *   4 · cursor grammar — computed cursor over spectrum / gradient rail +
 *       thumb / slider thumb / blob hit surface (roster 3).
 *   5 · scrollbar material — computed scrollbar-color/width on the pane
 *       scroller + a forced-overflow classic-scrollbar screenshot (roster 2).
 *   6 · THE THROWN-ERROR STATE — /#/browse with the dead API → the error
 *       plate: role/glyph/voice census + composited figure/ground contrast
 *       (message line, detail line, glyph) + negative controls (no ghost
 *       trio, no eyebrow). Both schemes.
 *
 * PNGs land in this dir (gitignored-by-class); this script + the log txt are
 * the committed record.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = "http://localhost:8700";
const OUT = "docs/tranches/T/audit/pi/w8/microchrome";
mkdirSync(OUT, { recursive: true });

const OWNER_COLOR = "lab(38%25 32 24)"; // owner reference (O-18 literal), URL-encoded %
const url = (view = "", extra = "") => `${BASE}/#/${view}?space=lab&color=${OWNER_COLOR}${extra}`;

const report = [];
const log = (s) => { console.log(s); report.push(String(s)); };

// ── sRGB8 → WCAG relative luminance ──
const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const wcag = (a, b) => { const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

const browser = await chromium.launch({ headless: true, channel: "chromium", args: ["--force-color-profile=srgb"] });

async function newPage(scheme) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: scheme,
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
    return { ctx, page, errs };
}

for (const scheme of ["light", "dark"]) {
    log(`\n═══════════════ SCHEME: ${scheme} ═══════════════`);
    const { ctx, page, errs } = await newPage(scheme);

    // ── picker view (default) ──
    await page.goto(url(""), { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(1400);

    // LEG 1 — title
    const title = await page.title();
    log(`\n[LEG1 · title] document.title = ${JSON.stringify(title)}`);

    // LEG 2 — [title=] native-tooltip roster (whole document, both panes)
    const titleRoster = await page.evaluate(() => {
        const els = [...document.querySelectorAll("[title]")];
        return {
            count: els.length,
            items: els.slice(0, 60).map((e) => ({
                tag: e.tagName.toLowerCase(),
                title: (e.getAttribute("title") || "").slice(0, 40),
                cls: (e.getAttribute("class") || "").slice(0, 50),
                ariaLabel: e.getAttribute("aria-label") || null,
                inDock: !!e.closest("[class*='dock'],[data-slot*='dock'],nav"),
            })),
        };
    });
    log(`\n[LEG2 · title= roster] total [title] elements = ${titleRoster.count}`);
    const nonDock = titleRoster.items.filter((i) => !i.inDock);
    log(`  non-dock [title] elements = ${nonDock.length} (of first ${titleRoster.items.length} sampled)`);
    for (const i of titleRoster.items) {
        log(`   ${i.inDock ? "DOCK" : "----"} <${i.tag} title="${i.title}"${i.ariaLabel ? ` aria-label="${i.ariaLabel}"` : " [NO aria-label]"}> .${i.cls}`);
    }

    // LEG 3 — ::selection ink
    const sel = await page.evaluate(() => {
        // declared rules census across all stylesheets
        let declared = 0;
        for (const ss of document.styleSheets) {
            let rules;
            try { rules = ss.cssRules; } catch { continue; }
            for (const r of rules || []) {
                if (r.selectorText && /::(-moz-)?selection/.test(r.selectorText)) declared++;
            }
        }
        const h = document.querySelector("h1, h2, .font-display, p") || document.body;
        const cs = getComputedStyle(h, "::selection");
        return { declared, selColor: cs.color, selBg: cs.backgroundColor };
    });
    log(`\n[LEG3 · ::selection] declared ::selection rules = ${sel.declared}`);
    log(`  getComputedStyle(el,'::selection') color=${sel.selColor} bg=${sel.selBg}`);
    // real selection screenshot
    await page.evaluate(() => {
        const el = document.querySelector("h1, h2, .font-display") || document.querySelector("p");
        if (el) {
            const r = document.createRange();
            r.selectNodeContents(el);
            const s = window.getSelection();
            s.removeAllRanges();
            s.addRange(r);
        }
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/1440-${scheme}-selection.png` });
    await page.evaluate(() => window.getSelection()?.removeAllRanges());

    // LEG 4 — cursor grammar (picker: spectrum, slider, blob)
    const cur = await page.evaluate(() => {
        const read = (selList) => {
            for (const s of selList) {
                const el = document.querySelector(s);
                if (el) return { sel: s, cursor: getComputedStyle(el).cursor };
            }
            return { sel: selList.join("|"), cursor: "NOT-FOUND" };
        };
        return {
            spectrum: read([".spectrum-picker", "[class*='spectrum']"]),
            sliderThumb: read(["[role='slider']", "[data-reka-slider-thumb]", ".slider-thumb"]),
            blob: read([".goo-blob-hit", ".goo-blob canvas", "canvas.goo-blob", "[class*='goo-blob'] canvas"]),
        };
    });
    log(`\n[LEG4 · cursor grammar]`);
    log(`  spectrum   (${cur.spectrum.sel}) → cursor: ${cur.spectrum.cursor}`);
    log(`  sliderThumb(${cur.sliderThumb.sel}) → cursor: ${cur.sliderThumb.cursor}`);
    log(`  blob       (${cur.blob.sel}) → cursor: ${cur.blob.cursor}`);

    // LEG 5 — scrollbar material (pane scroller) + forced-overflow screenshot
    const sb = await page.evaluate(() => {
        const el = document.querySelector(".pane-scroll-fade") || document.querySelector("[class*='overflow-y-auto']");
        if (!el) return { found: false };
        const cs = getComputedStyle(el);
        return {
            found: true,
            cls: (el.getAttribute("class") || "").slice(0, 60),
            scrollbarColor: cs.scrollbarColor,
            scrollbarWidth: cs.scrollbarWidth,
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight,
            overflows: el.scrollHeight > el.clientHeight,
        };
    });
    log(`\n[LEG5 · scrollbar material] pane-scroller found=${sb.found}`);
    if (sb.found) {
        log(`  .${sb.cls}`);
        log(`  scrollbar-color: ${sb.scrollbarColor} · scrollbar-width: ${sb.scrollbarWidth}`);
        log(`  scrollHeight ${sb.scrollHeight} / clientHeight ${sb.clientHeight} · overflows=${sb.overflows}`);
    }

    // gradient view — force overflow with a short viewport to reveal classic scrollbar
    await page.goto(url("gradient"), { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(1000);
    // cursor over gradient rail + thumb
    const gcur = await page.evaluate(() => {
        const read = (selList) => {
            for (const s of selList) {
                const el = document.querySelector(s);
                if (el) return { sel: s, cursor: getComputedStyle(el).cursor };
            }
            return { sel: selList.join("|"), cursor: "NOT-FOUND" };
        };
        return {
            rail: read([".gradient-rail"]),
            stopThumb: read([".gradient-rail [class*='cursor-grab']", ".gradient-rail button", ".gradient-rail [role='slider']"]),
        };
    });
    log(`\n[LEG4b · gradient cursor]`);
    log(`  rail     (${gcur.rail.sel}) → cursor: ${gcur.rail.cursor}`);
    log(`  stopThumb(${gcur.stopThumb.sel}) → cursor: ${gcur.stopThumb.cursor}`);

    // forced-overflow scrollbar screenshot: shrink viewport height so a pane overflows
    await ctx.pages()[0]; // noop
    await page.setViewportSize({ width: 1440, height: 420 });
    await page.waitForTimeout(600);
    const sb2 = await page.evaluate(() => {
        const el = document.querySelector(".pane-scroll-fade");
        if (!el) return { found: false };
        return { found: true, overflows: el.scrollHeight > el.clientHeight, sh: el.scrollHeight, ch: el.clientHeight };
    });
    log(`  [forced-overflow @420h] pane overflows=${sb2.overflows} (${sb2.sh}/${sb2.ch})`);
    await page.screenshot({ path: `${OUT}/1440x420-${scheme}-scrollbar.png` });
    await page.setViewportSize({ width: 1440, height: 900 });

    // LEG 6 — THE THROWN-ERROR STATE (/#/browse with dead API)
    await page.goto(url("browse"), { waitUntil: "networkidle" }).catch(() => {});
    // wait for either the error plate or a timeout
    await page.waitForTimeout(2500);
    const errState = await page.evaluate(() => {
        const alert = document.querySelector("[role='alert']");
        if (!alert) return { present: false, html: document.body.innerHTML.slice(0, 0) };
        const cs = getComputedStyle(alert);
        // find children
        const glyph = alert.querySelector("svg");
        const msg = alert.querySelector("p.font-display, p:not([class*='mono'])");
        const detail = alert.querySelector("p[class*='mono'], .text-mono-small");
        const gcs = glyph ? getComputedStyle(glyph) : null;
        const mcs = msg ? getComputedStyle(msg) : null;
        const dcs = detail ? getComputedStyle(detail) : null;
        const rect = alert.getBoundingClientRect();
        return {
            present: true,
            role: alert.getAttribute("role"),
            hasGlyph: !!glyph,
            glyphClass: glyph ? (glyph.getAttribute("class") || "").slice(0, 40) : null,
            glyphColor: gcs ? gcs.color : null,
            msgText: msg ? msg.textContent.trim().slice(0, 60) : null,
            msgColor: mcs ? mcs.color : null,
            msgFont: mcs ? mcs.fontFamily.split(",")[0] : null,
            detailText: detail ? detail.textContent.trim().slice(0, 60) : null,
            detailColor: dcs ? dcs.color : null,
            detailFont: dcs ? dcs.fontFamily.split(",")[0] : null,
            // negative controls (must NOT be the empty state)
            hasGhostTrio: !!alert.querySelector("[data-slot='empty-state-trio']") || !!document.querySelector("[data-slot='empty-state-trio']"),
            hasEyebrow: !!alert.querySelector(".tracking-\\[0\\.18em\\]") || /· .* ·/.test(alert.textContent),
            hasRetry: !!alert.querySelector("button"),
            retryText: alert.querySelector("button") ? alert.querySelector("button").textContent.trim() : null,
            rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        };
    });
    log(`\n[LEG6 · THROWN-ERROR STATE] error plate present=${errState.present}`);
    if (errState.present) {
        log(`  role=${errState.role} (R7: role='alert' required)`);
        log(`  glyph present=${errState.hasGlyph} class="${errState.glyphClass}" color=${errState.glyphColor} (R7: CircleAlert)`);
        log(`  message: "${errState.msgText}" color=${errState.msgColor} font=${errState.msgFont}`);
        log(`  detail:  "${errState.detailText}" color=${errState.detailColor} font=${errState.detailFont}`);
        log(`  Retry action present=${errState.hasRetry} text="${errState.retryText}"`);
        log(`  NEGATIVE CONTROLS (must be empty-state-free): ghostTrio=${errState.hasGhostTrio} eyebrow=${errState.hasEyebrow}`);

        // composited figure/ground: sample the plate ground + text pixels
        const clip = errState.rect;
        const shot = `${OUT}/1440-${scheme}-error-plate.png`;
        await page.screenshot({ path: shot, clip: { x: Math.max(0, clip.x), y: Math.max(0, clip.y), width: Math.min(1440 - clip.x, clip.w), height: Math.min(900 - clip.y, clip.h) } });
        // decode: sample plate-ground (a corner) vs a central band for contrast intuition
        const px = await page.evaluate(async (rect) => {
            const canvas = document.createElement("canvas");
            const dpr = window.devicePixelRatio || 1;
            // draw the region using html2canvas-free approach: sample via elementFromPoint colors is unreliable;
            // instead read the computed background of the alert's nearest painted ancestor
            const alert = document.querySelector("[role='alert']");
            let node = alert;
            let bg = "rgba(0,0,0,0)";
            while (node && node !== document.body) {
                const c = getComputedStyle(node).backgroundColor;
                if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") { bg = c; break; }
                node = node.parentElement;
            }
            return { groundBg: bg };
        }, clip);
        log(`  plate ground (nearest painted ancestor bg) = ${px.groundBg}`);
    } else {
        // capture whatever rendered (maybe offline chip / skeleton stuck)
        await page.screenshot({ path: `${OUT}/1440-${scheme}-browse-noerror.png` });
        const what = await page.evaluate(() => {
            return {
                hasOfflineChip: !!document.querySelector("[class*='offline'],[class*='ApiOffline']"),
                hasSkeleton: !!document.querySelector("[aria-label='Loading palettes']"),
                hasWall: !!document.querySelector("[class*='palette-card-grid'],[class*='card-grid']"),
                bodyText: document.body.textContent.replace(/\s+/g, " ").slice(0, 200),
            };
        });
        log(`  NO error plate. offlineChip=${what.hasOfflineChip} skeleton=${what.hasSkeleton} wall=${what.hasWall}`);
        log(`  body: ${what.bodyText}`);
    }

    log(`\n[console] errors this scheme = ${errs.length}`);
    errs.slice(0, 8).forEach((e) => log(`   ! ${e.slice(0, 120)}`));

    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/w8-microchrome-probe-log.txt`, report.join("\n"));
console.log("\n\n=== WROTE LOG ===");
