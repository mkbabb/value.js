/**
 * JUROR-3 — the pinned gestalt witness harness for `demo/picker/ColorPicker.vue`.
 *
 * This file IS the π obligation of MT-W48-PRIME: every visual number in
 * `jury-3-design-gestalt.md` comes from this script, and a later session
 * re-captures the identical witness by running it unchanged.
 *
 *   node docs/tranches/V/megatranche/audit/probes/../components/picker-colorpicker/probe-j3-gestalt.mjs
 *
 * Requires the dev server on :9000 (`npm run dev`). Read-only: it drives the
 * page, it never edits it.
 *
 * PINNED ROUTE (the W48 baseline colour):
 *   http://localhost:9000/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)
 *
 * PINNED MATRICES: M1 1440x900 · M3 390x844 · M5 720x450@2 (200% zoom model)
 *                  M6 360x225@4 (400% zoom model) · M7 forced-colors
 *                  M8 prefers-reduced-motion · M10 320x568
 *
 * PINNED SELECTORS: .pane-container · .pane-shell [data-slot=card] ·
 *   .picker-header · .title-row · .space-trigger · .readout ·
 *   .fig-int/.fig-frac/.fig-unit/.fig-comma · .hero-blob-anchor ·
 *   [role=slider] · nav button[aria-label]
 */
import { chromium } from "playwright";

const URL =
    "http://localhost:9000/#/?space=lab&color=lab(92%25%2088.8%2020%20%2F%2082.7%25)";
const PHI = (1 + Math.sqrt(5)) / 2;
const INV_SQRT_PHI = 1 / Math.sqrt(PHI); // 0.7861513778

const measure = () => {
    const q = (s, r = document) => r.querySelector(s);
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const cs = getComputedStyle;
    const rect = (e) => {
        const r = e.getBoundingClientRect();
        return {
            x: +r.x.toFixed(2),
            y: +r.y.toFixed(2),
            w: +r.width.toFixed(2),
            h: +r.height.toFixed(2),
        };
    };
    const ink = (el) => {
        if (!el) return [];
        const r = document.createRange();
        r.selectNodeContents(el);
        return [...r.getClientRects()].map((k) => ({
            t: +k.top.toFixed(2),
            b: +k.bottom.toFixed(2),
            w: +k.width.toFixed(2),
        }));
    };

    const trig = qa(".space-trigger");
    const readout = q(".readout");
    const ti = ink(trig[0]);
    const ri = ink(readout);
    const seam =
        ti.length && ri.length
            ? +(
                  Math.min(...ri.map((x) => x.t)) - Math.max(...ti.map((x) => x.b))
              ).toFixed(2)
            : null;
    const painted = ri.length
        ? +(
              Math.max(...ri.map((x) => x.b)) - Math.min(...ri.map((x) => x.t))
          ).toFixed(2)
        : null;
    const lines = {};
    ri.forEach((k) => {
        const key = Math.round(k.t);
        lines[key] = Math.max(lines[key] || 0, k.w);
    });

    const root = q(".pane-shell [data-slot=card]") || q(".instrument-chassis");
    const plates = qa("[data-slot=card],.instrument-chassis").filter(
        (e) => e.getBoundingClientRect().width > 300,
    );
    const container = q(".pane-container");
    const titleRow = q(".title-row");
    const blob = q(".hero-blob-anchor");

    return {
        vp: [innerWidth, innerHeight],
        dpr: devicePixelRatio,
        overflowX:
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,

        // G1 — proportion
        grid: container ? cs(container).gridTemplateColumns : null,
        plates: plates.map((e) => ({ ...rect(e), shadow: cs(e).boxShadow })),

        // G2 — seam
        instrumentTitleGap: cs(document.documentElement)
            .getPropertyValue("--instrument-title-gap")
            .trim(),
        seamGap: seam,
        readoutReservedMinusPainted:
            readout && painted != null
                ? +(readout.getBoundingClientRect().height - painted).toFixed(2)
                : null,
        titleRowMinH: titleRow ? cs(titleRow).minHeight : null,
        titleRowRenderedH: titleRow ? rect(titleRow).h : null,
        headerRowGap: q(".picker-header") ? cs(q(".picker-header")).rowGap : null,
        readoutLineInk: Object.entries(lines).map(([t, w]) => ({
            top: +t,
            ink: +w.toFixed(2),
        })),
        readoutBoxW: readout ? rect(readout).w : null,

        // G3 — pair
        labelPx: trig[0] ? +parseFloat(cs(trig[0]).fontSize).toFixed(3) : null,
        headlinePx: readout ? +parseFloat(cs(readout).fontSize).toFixed(3) : null,
        pairRatio:
            trig[0] && readout
                ? +(
                      parseFloat(cs(trig[0]).fontSize) /
                      parseFloat(cs(readout).fontSize)
                  ).toFixed(4)
                : null,
        headlineFamily: readout ? cs(readout).fontFamily.slice(0, 24) : null,
        selectorCount: trig.length,

        // G4 — reach
        h1: qa("h1").length,
        firstHeading: (() => {
            const h = qa("h1,h2,h3,h4,h5,h6")[0];
            return h ? h.tagName + ":" + h.innerText.trim().slice(0, 30) : null;
        })(),
        contenteditable: qa('[contenteditable="true"]').length,
        sliders: qa("[role=slider]").map((e) => ({
            name: e.getAttribute("aria-label"),
            ...rect(e),
        })),
        tabsWithoutPanel: qa("[role=tab]").filter((e) => !e.getAttribute("aria-controls"))
            .length,
        subFloorTargets: qa(
            'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"]),[contenteditable="true"],[role=slider]',
            root || document.body,
        )
            .filter((e) => e.offsetParent !== null)
            .map((e) => ({
                name: (e.getAttribute("aria-label") || e.innerText || "").trim().slice(0, 22),
                ...rect(e),
            }))
            .filter((r) => r.w < 24 || r.h < 24),

        // G5 — ornament honesty
        blob: blob ? { ...rect(blob), z: cs(blob).zIndex } : null,
        canvases: qa("canvas").length,

        // G7 — contraction
        cardScroll: root
            ? {
                  sh: root.scrollHeight,
                  ch: root.clientHeight,
                  overflow: root.scrollHeight - root.clientHeight,
              }
            : null,
        condensed: q(".picker-header")
            ? q(".picker-header").classList.contains("is-condensed")
            : null,
        headerH: q(".picker-header") ? rect(q(".picker-header")).h : null,

        // G8 — forced colors
        ink: {
            figInt: q(".fig-int") ? cs(q(".fig-int")).color : null,
            figFrac: q(".fig-frac") ? cs(q(".fig-frac")).color : null,
            figUnit: q(".fig-unit") ? cs(q(".fig-unit")).color : null,
            figComma: q(".fig-comma") ? cs(q(".fig-comma")).color : null,
        },

        // G9 — action parity
        navActions: qa("nav button")
            .map((b) => b.getAttribute("aria-label"))
            .filter(Boolean),

        // motion residue
        paneShellTransform: q(".pane-shell") ? cs(q(".pane-shell")).transform : null,
    };
};

async function arm(browser, label, viewport, opts = {}) {
    const ctx = await browser.newContext({
        viewport,
        deviceScaleFactor: opts.dsf || 1,
        ...(opts.ctx || {}),
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 100)));
    await page.goto(URL, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(2600);
    if (opts.scrollToEnd) {
        await page.evaluate(() => {
            const c = document.querySelector(".pane-shell [data-slot=card]");
            if (c) c.scrollTop = c.scrollHeight;
        });
        await page.waitForTimeout(1200);
    }
    const out = await page.evaluate(measure);
    out.label = label;
    out.consoleErrors = errs;
    out.pairDelta = out.pairRatio != null ? +(out.pairRatio - INV_SQRT_PHI).toFixed(4) : null;
    if (opts.shot) await page.screenshot({ path: opts.shot });
    await ctx.close();
    return out;
}

const b = await chromium.launch();
const rows = [];
rows.push(await arm(b, "M1 desktop-1440", { width: 1440, height: 900 }));
rows.push(await arm(b, "M3 phone-390", { width: 390, height: 844 }));
rows.push(await arm(b, "M5 zoom200-720@2", { width: 720, height: 450 }, { dsf: 2 }));
rows.push(await arm(b, "M6 zoom400-360@4", { width: 360, height: 225 }, { dsf: 4 }));
rows.push(
    await arm(b, "M7 forced-colors", { width: 1440, height: 900 }, {
        ctx: { forcedColors: "active" },
    }),
);
rows.push(
    await arm(b, "M8 reduced-motion", { width: 1440, height: 900 }, {
        ctx: { reducedMotion: "reduce" },
    }),
);
rows.push(await arm(b, "M10 narrow-320", { width: 320, height: 568 }));
rows.push(
    await arm(b, "G7 contraction 390x600", { width: 390, height: 600 }, {
        scrollToEnd: true,
    }),
);
console.log(JSON.stringify({ invSqrtPhi: +INV_SQRT_PHI.toFixed(7), rows }, null, 1));
await b.close();
