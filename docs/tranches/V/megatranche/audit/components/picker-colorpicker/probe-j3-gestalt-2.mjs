/**
 * JUROR-3 — companion witness harness #2 for `demo/picker/ColorPicker.vue`.
 *
 * Together with `probe-j3-gestalt.mjs` this file IS the π obligation of MT-W48-PRIME.
 * Read-only: it drives the page, it never edits it. Requires the dev server on :9000.
 *
 *   node docs/tranches/V/megatranche/audit/components/picker-colorpicker/probe-j3-gestalt-2.mjs
 *
 * PINNED ROUTE  http://localhost:9000/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)
 * ARM A  contraction reachability under real scroll — M3 390x844 · M5 720x450@2 ·
 *        M6 360x225@4 · M10 320x568 · M11 390x600
 * ARM B  the vertical argument: label ink · blob rect · headline ink · stage top · rail top
 * ARM C  boot cost of the flagship route vs a non-GL route (/#/browse)
 * ARM D  the headline write path: one keystroke, then an independent model write
 */
import { chromium } from "playwright";

const URL =
    "http://localhost:9000/#/?space=lab&color=lab(92%25%2088.8%2020%20%2F%2082.7%25)";

/* ---------------- ARM A — is the whole-header contraction reachable at all? --------- */
const armA = async (browser, label, viewport, dsf = 1) => {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: dsf });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(2600);
    const before = await page.evaluate(() => {
        const c = document.querySelector(".pane-shell [data-slot=card]");
        const h = document.querySelector(".picker-header");
        const H = h ? h.getBoundingClientRect().height : null;
        return {
            cardOverflow: c ? c.scrollHeight - c.clientHeight : null,
            cardClientH: c ? c.clientHeight : null,
            headerH: H,
            // useHeaderCondense.ts:93-99 — savings = expandedH - (condensedH || expandedH*0.5)
            gateRequiresOverflowGT: H != null ? +(H * 0.5 + 16).toFixed(1) : null,
            condensed: h ? h.classList.contains("is-condensed") : null,
        };
    });
    // real scroll: wheel over the card, then a direct scrollTop slam, then settle
    await page.evaluate(() => {
        const c = document.querySelector(".pane-shell [data-slot=card]");
        if (c) c.scrollTop = c.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1400);
    const after = await page.evaluate(() => {
        const h = document.querySelector(".picker-header");
        const c = document.querySelector(".pane-shell [data-slot=card]");
        return {
            condensed: h ? h.classList.contains("is-condensed") : null,
            headerH: h ? +h.getBoundingClientRect().height.toFixed(2) : null,
            scrollTop: c ? c.scrollTop : null,
            windowScrollY: window.scrollY,
        };
    });
    await ctx.close();
    return {
        label,
        vp: [viewport.width, viewport.height],
        dsf,
        ...before,
        gateOpens: before.cardOverflow > before.gateRequiresOverflowGT,
        after,
    };
};

/* ---------------- ARM B — the vertical argument, top to bottom ---------------------- */
const armB = async (browser, label, viewport, dsf = 1) => {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: dsf });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(2600);
    const out = await page.evaluate(() => {
        const q = (s) => document.querySelector(s);
        const r = (e) =>
            e
                ? {
                      t: +e.getBoundingClientRect().top.toFixed(2),
                      b: +e.getBoundingClientRect().bottom.toFixed(2),
                      h: +e.getBoundingClientRect().height.toFixed(2),
                  }
                : null;
        const inkT = (el) => {
            if (!el) return null;
            const rg = document.createRange();
            rg.selectNodeContents(el);
            const ks = [...rg.getClientRects()];
            return ks.length
                ? {
                      t: +Math.min(...ks.map((k) => k.top)).toFixed(2),
                      b: +Math.max(...ks.map((k) => k.bottom)).toFixed(2),
                  }
                : null;
        };
        const card = q(".pane-shell [data-slot=card]");
        const cardT = card ? card.getBoundingClientRect().top : 0;
        const rel = (v) => (v == null ? null : +(v - cardT).toFixed(2));
        const label = inkT(q(".space-trigger"));
        const head = inkT(q(".readout"));
        const blob = r(q(".hero-blob-anchor"));
        const stage = r(q(".spectrum-picker")) || r(q("canvas"));
        const rail = r(q(".channel-slider")) || r(q("[role=slider]")?.closest("div"));
        return {
            cardH: card ? +card.getBoundingClientRect().height.toFixed(2) : null,
            labelInk: label && { t: rel(label.t), b: rel(label.b) },
            blob: blob && { t: rel(blob.t), b: rel(blob.b), h: blob.h },
            headlineInk: head && { t: rel(head.t), b: rel(head.b) },
            stage: stage && { t: rel(stage.t), b: rel(stage.b), h: stage.h },
            rail: rail && { t: rel(rail.t), h: rail.h },
            headerH: r(q(".picker-header"))?.h ?? null,
            gap_label_to_headline:
                label && head ? +(head.t - label.b).toFixed(2) : null,
            gap_headline_to_stage:
                head && stage ? +(stage.t - head.b).toFixed(2) : null,
            blobEntirelyAboveHeadline:
                blob && head ? blob.b <= head.t : null,
        };
    });
    await ctx.close();
    return { label, vp: [viewport.width, viewport.height], dsf, ...out };
};

/* ---------------- ARM C — boot cost of the flagship route --------------------------- */
const armC = async (browser, label, url) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
        window.__lt = [];
        window.__lcp = 0;
        try {
            new PerformanceObserver((l) => {
                for (const e of l.getEntries())
                    window.__lt.push(+e.duration.toFixed(1));
            }).observe({ entryTypes: ["longtask"] });
        } catch {}
        try {
            new PerformanceObserver((l) => {
                for (const e of l.getEntries())
                    window.__lcp = +e.startTime.toFixed(1);
            }).observe({ type: "largest-contentful-paint", buffered: true });
        } catch {}
        const orig = HTMLCanvasElement.prototype.getContext;
        window.__ctx = [];
        HTMLCanvasElement.prototype.getContext = function (t, ...a) {
            window.__ctx.push(t);
            return orig.call(this, t, ...a);
        };
    });
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 120)));
    const t0 = Date.now();
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    const loadMs = Date.now() - t0;
    await page.waitForTimeout(5000);
    const out = await page.evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0] || {};
        return {
            domContentLoaded: +(nav.domContentLoadedEventEnd || 0).toFixed(1),
            loadEvent: +(nav.loadEventEnd || 0).toFixed(1),
            lcpMs: window.__lcp,
            longTasks: window.__lt,
            longTaskTotalMs: +window.__lt.reduce((a, b) => a + b, 0).toFixed(1),
            longTasksOver50: window.__lt.filter((d) => d > 50).length,
            canvasContexts: window.__ctx,
            domNodes: document.getElementsByTagName("*").length,
            canvases: document.querySelectorAll("canvas").length,
        };
    });
    await ctx.close();
    return { label, url, loadMs, ...out, consoleErrors: errs };
};

/* ---------------- ARM D — the headline write path ----------------------------------- */
const armD = async (browser) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/?space=lab&color=lab(50%25%2020%2030)", {
        waitUntil: "load",
        timeout: 45000,
    });
    await page.waitForTimeout(2600);
    const read = () =>
        page.evaluate(() => ({
            cells: [...document.querySelectorAll(".readout-fig")].map((e) =>
                e.innerText.replace(/\s+/g, " ").trim(),
            ),
            cell0html: document.querySelector(".readout-fig")?.innerHTML ?? null,
            valuetext: [...document.querySelectorAll("[role=slider]")].map((e) =>
                e.getAttribute("aria-valuetext"),
            ),
            title: document.title,
            hash: location.hash,
        }));
    const t0 = await read();
    // one keystroke into the FIRST cell (l), caret at end
    await page.evaluate(() => {
        const c = document.querySelector('[contenteditable="true"]');
        c.focus();
        const s = getSelection();
        const r = document.createRange();
        r.selectNodeContents(c);
        r.collapse(false);
        s.removeAllRanges();
        s.addRange(r);
        document.execCommand("insertText", false, "5");
    });
    await page.waitForTimeout(1200);
    const t1 = await read();
    // now move the SAME channel by an independent path: the L slider, 6 steps left
    await page.evaluate(() => document.querySelector("[role=slider]").focus());
    for (let i = 0; i < 6; i++) await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(1200);
    const t2 = await read();
    await ctx.close();
    return { t0_settled: t0, t1_afterOneKeystroke: t1, t2_afterIndependentWrite: t2 };
};

const b = await chromium.launch();
const out = { A_contraction: [], B_argument: [], C_boot: [], D_writePath: null };
out.A_contraction.push(await armA(b, "M3 390x844", { width: 390, height: 844 }));
out.A_contraction.push(await armA(b, "M5 720x450@2", { width: 720, height: 450 }, 2));
out.A_contraction.push(await armA(b, "M6 360x225@4", { width: 360, height: 225 }, 4));
out.A_contraction.push(await armA(b, "M10 320x568", { width: 320, height: 568 }));
out.A_contraction.push(await armA(b, "M11 390x600", { width: 390, height: 600 }));
out.B_argument.push(await armB(b, "M1 1440x900", { width: 1440, height: 900 }));
out.B_argument.push(await armB(b, "M3 390x844", { width: 390, height: 844 }));
out.B_argument.push(await armB(b, "M5 720x450@2", { width: 720, height: 450 }, 2));
out.C_boot.push(await armC(b, "picker /#/", URL));
out.C_boot.push(await armC(b, "browse /#/browse", "http://localhost:9000/#/browse"));
out.D_writePath = await armD(b);
console.log(JSON.stringify(out, null, 1));
await b.close();
