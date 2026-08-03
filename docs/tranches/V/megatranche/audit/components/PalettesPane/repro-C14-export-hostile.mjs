/**
 * CHALLENGE-C pass-5 probe #14 — the SHIPPING export path, exercised with the
 * inputs a real palette can hold.
 *
 * PalettesPane.vue:96 wires `@export="(p, fmt) => onExport(p, fmt)"` →
 * `usePaletteExport.ts:12-24` → `demo/palettes/export.ts`. The palette NAME is
 * user-authored (PaletteCard inline rename) and the colour strings are raw CSS.
 *
 * Loads the REAL modules through Vite's /@fs/ graph in a real browser (so
 * DOMParser, canvas and Blob are the browser's own).
 */
import { chromium } from "playwright";

const FS = "/@fs/Users/mkbabb/Programming/value.js/demo/palettes";
const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

const out = await page.evaluate(async (fs) => {
    const m = await import(`${fs}/export.ts`);
    const mk = (name, colors) => ({
        id: "x",
        name,
        slug: "x",
        colors: colors.map((css, i) => ({ css, position: i })),
        createdAt: "",
        updatedAt: "",
        isLocal: true,
    });
    const parseXml = (s) => {
        const d = new DOMParser().parseFromString(s, "image/svg+xml");
        const err = d.querySelector("parsererror");
        return err ? `PARSE ERROR: ${err.textContent.replace(/\s+/g, " ").slice(0, 90)}` : "well-formed";
    };
    const res = {};

    // ── 1. an ampersand in the palette name (XML text content) ──────────────
    {
        const p = mk("Reds & Blues", ["#ff0000"]);
        const svg = m.exportAsSVG(p).content;
        res.ampersandName = { xml: parseXml(svg), excerpt: svg.split("\n").at(-2).trim().slice(0, 90) };
        try {
            await m.exportAsPNG(p);
            res.ampersandPng = "resolved";
        } catch (e) {
            res.ampersandPng = `REJECTED: ${e.message}`;
        }
    }

    // ── 2. markup in the palette name ───────────────────────────────────────
    {
        const p = mk(`</text><script>alert(1)</script><text>`, ["#ff0000"]);
        const svg = m.exportAsSVG(p).content;
        res.markupName = {
            xml: parseXml(svg),
            containsRawScriptTag: svg.includes("<script>"),
            filename: m.exportAsSVG(p).filename,
        };
    }

    // ── 3. a colour string with a quote (attribute context) ─────────────────
    {
        const p = mk("Q", [`red" onload="alert(1)`]);
        const svg = m.exportAsSVG(p).content;
        res.quotedColor = {
            xml: parseXml(svg),
            rect: svg.split("\n")[1].trim().slice(0, 110),
        };
    }

    // ── 4. an EMPTY palette — PaletteCard.vue:220-223 calls this reachable ──
    {
        const p = mk("Empty", []);
        const e = m.exportAsSVG(p);
        res.emptySvg = { width: e.content.match(/width="(\d+)"/)?.[1], xml: parseXml(e.content) };
        try {
            await m.exportAsPNG(p);
            res.emptyPng = "resolved";
        } catch (err) {
            res.emptyPng = `REJECTED: ${err.message}`;
        }
    }

    // ── 5. a name with no [a-z0-9] at all → the filename stem ───────────────
    {
        res.emojiFilenames = {
            json: m.exportAsJSON(mk("🎨", ["#f00"])).filename,
            css: m.exportAsCSSCustomProperties(mk("🎨", ["#f00"])).filename,
            svg: m.exportAsSVG(mk("🎨", ["#f00"])).filename,
            cssBody: m.exportAsCSSCustomProperties(mk("🎨", ["#f00"])).content.trim(),
        };
    }

    // ── 6. a wide palette — canvas dimensions for PNG ───────────────────────
    {
        const many = Array.from({ length: 80 }, (_, i) => `hsl(${i * 4} 80% 50%)`);
        const p = mk("Wide", many);
        const svgW = Number(m.exportAsSVG(p).content.match(/width="(\d+)"/)[1]);
        res.wide = { colors: many.length, svgWidth: svgW, pngCanvasWidth: svgW * 2 };
    }

    // ── 7. does downloadExport revoke before the download can start? ────────
    {
        const created = [];
        const revoked = [];
        const oc = URL.createObjectURL.bind(URL);
        const or = URL.revokeObjectURL.bind(URL);
        URL.createObjectURL = (b) => {
            const u = oc(b);
            created.push({ t: performance.now(), u });
            return u;
        };
        URL.revokeObjectURL = (u) => {
            revoked.push({ t: performance.now(), u });
            return or(u);
        };
        const origClick = HTMLAnchorElement.prototype.click;
        let anchorInDom = null;
        HTMLAnchorElement.prototype.click = function () {
            anchorInDom = document.contains(this);
        };
        m.downloadExport(m.exportAsJSON(mk("Timing", ["#f00"])));
        HTMLAnchorElement.prototype.click = origClick;
        URL.createObjectURL = oc;
        URL.revokeObjectURL = or;
        res.downloadTiming = {
            createdCount: created.length,
            revokedCount: revoked.length,
            sameTick: created.length === 1 && revoked.length === 1,
            msBetweenCreateAndRevoke: +(revoked[0].t - created[0].t).toFixed(3),
            anchorWasInDocumentAtClick: anchorInDom,
        };
    }

    // ── 8. does onExport surface anything at all on failure? ────────────────
    {
        const { onExport } = await import(`${fs}/usePaletteExport.ts`).then((x) =>
            x.usePaletteExport(),
        );
        const r = await onExport(mk("Empty", []), "png"); // the rejecting case
        res.onExportReturn = { value: r, isUndefined: r === undefined };
        res.onExportUnknownFormat = (await onExport(mk("X", ["#f00"]), "yaml")) === undefined;
    }

    return res;
}, FS);

console.log(JSON.stringify(out, null, 2));
await browser.close();
