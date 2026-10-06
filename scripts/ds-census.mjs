#!/usr/bin/env node
/**
 * X-DS · LIGHTING CENSUS (waves/X-DS.md §Gates, COHESION §0ej)
 *
 * Counts the lighting idioms the X-DS canon forbids or rations, in two halves:
 *
 *   static    The app's own CSS and Vue <style> blocks (plus Tailwind lighting
 *             utilities in Vue templates), under demo/** minus the vendored
 *             shadcn tree (demo/ui/**) and tests. glass-ui is NOT scanned
 *             statically: it is read-only to us (O-87 FLAT-LIGHTING).
 *   computed  The served pages, via real Chrome in new-headless mode
 *             (channel "chrome", headless: true; §0ei — never a visible
 *             window). Every rendered element is read with getComputedStyle,
 *             so glass-owned lighting shows up here too, attributed by owner.
 *
 * Metrics (both halves where they apply):
 *   boxShadowLayers       layers in every non-none box-shadow
 *   insetLayers           inset box-shadow layers
 *   insetHighlightLayers  inset layers painted in a light colour (bevels, rims)
 *   textShadow            non-none text-shadow
 *   filterDropShadow      filter: drop-shadow(...)
 *   filterBlur            filter: blur(...) and backdrop-filter: blur(...)
 *   gradientFills         gradient backgrounds (computed: on CONTROLS only)
 *   loopingKeyframes      @keyframes driven by an infinite animation
 *                         (computed: running infinite CSS animations on chrome)
 *
 * The canon's allowance (X-DS §The canon) is checked on the computed half:
 *   - at most ONE box-shadow layer on any element (one quiet neutral shadow);
 *   - zero inset highlights, text-shadows, drop-shadows, filter blurs on chrome;
 *   - zero gradient fills on controls (content gradients are exempt: see
 *     CONTENT_GRADIENT below — a gradient that IS the content survives);
 *   - zero looping animations on chrome.
 * The verdict is RED when any allowance is exceeded, GREEN otherwise. A
 * 0/0/0 spread ring (a hairline border or a focus ring drawn as box-shadow) is
 * not lighting: it is tallied apart as ringLayers and never counts as a layer.
 * Owner attribution is by class: an element carrying a glass-* / gl-* class is
 * "glass" (O-87, honest-RED until glass lands it); everything else is
 * "consumer". A glass atom whose root carries neither a glass-* class nor one
 * of the known atom roots reads as consumer, so the owner split is a guide and
 * the per-element offenders are the truth.
 *
 * Usage:
 *   node scripts/ds-census.mjs [--base http://localhost:9000] [--routes /#/,/#/mix]
 *        (the demo router is hash-history: routes are /#/<view>)
 *        [--static-only] [--widths 1440,390] [--themes light,dark]
 *        [--settle 2500] [--out file.json] [--top 12]
 * Output: JSON on stdout (or --out).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const opt = (k, d) => {
    const i = args.indexOf(`--${k}`);
    return i >= 0 ? args[i + 1] : d;
};
const flag = (k) => args.includes(`--${k}`);

const BASE = opt("base", "http://localhost:9000");
const ROUTES = opt(
    "routes",
    "/#/,/#/palettes,/#/browse,/#/extract,/#/mix,/#/generate,/#/gradient,/#/atmosphere,/#/blob",
).split(",");
const WIDTHS = opt("widths", "1440").split(",").map(Number);
const THEMES = opt("themes", "light,dark").split(",");
const SETTLE = Number(opt("settle", "2500"));
const TOP = Number(opt("top", "12"));
const OUT = opt("out", null);

// ─── static half ─────────────────────────────────────────────────────────────

const SCAN_DIR = path.join(ROOT, "demo");
const EXCLUDE = [/^demo\/ui\//, /^demo\/@\/components\/ui\//, /^demo\/test\//, /\.test\./];

function walk(dir, acc = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === "node_modules" || e.name.startsWith(".")) continue;
            walk(p, acc);
        } else if (/\.(css|vue)$/.test(e.name)) acc.push(p);
    }
    return acc;
}

/** Split a CSS value on top-level commas (ignores commas inside parens). */
function splitTop(v) {
    const out = [];
    let depth = 0;
    let cur = "";
    for (const ch of v) {
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        if (ch === "," && depth === 0) {
            out.push(cur.trim());
            cur = "";
        } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
}

const LIGHT_RE =
    /(#fff\b|#ffffff\b|white|255,\s*255,\s*255|255 255 255|hsl\(\s*0\s+0%\s+100%|oklch\(\s*1\b|oklch\(\s*(0\.9\d*|9\d(\.\d+)?%)|--glass-rim-top|--glass-edge-light|--glass-material-rim|highlight|specular|gleam)/i;

function templateOf(file, text) {
    if (!file.endsWith(".vue")) return "";
    const m = text.match(/<template>([\s\S]*)<\/template>/);
    return m ? m[1] : "";
}

function lineAt(text, idx) {
    return text.slice(0, idx).split("\n").length;
}

function staticCensus() {
    const files = walk(SCAN_DIR).filter((f) => {
        const rel = path.relative(ROOT, f);
        return !EXCLUDE.some((re) => re.test(rel));
    });
    const totals = {
        boxShadowDecls: 0,
        boxShadowLayers: 0,
        insetLayers: 0,
        insetHighlightLayers: 0,
        multiLayerShadowDecls: 0,
        textShadow: 0,
        filterDropShadow: 0,
        filterBlur: 0,
        backdropBlur: 0,
        gradientFills: 0,
        loopingKeyframes: 0,
        lightingTokenDefs: 0,
        twShadowUtilities: 0,
        twLoopUtilities: 0,
        twGradientUtilities: 0,
    };
    const sites = [];
    const add = (kind, file, text, idx, snippet) => {
        sites.push({
            kind,
            at: `${path.relative(ROOT, file)}:${lineAt(text, idx)}`,
            css: snippet.replace(/\s+/g, " ").trim().slice(0, 160),
        });
    };

    const paints = (layer) => {
        // a zero-extent or fully transparent layer paints nothing
        if (/^\s*(none|transparent)?\s*$/i.test(layer)) return false;
        if (/\btransparent\b/.test(layer) && !/color-mix|var\(/.test(layer)) return false;
        const nums = layer.replace(/\([^)]*\)/g, "").match(/-?[\d.]+(px|rem|em)?\b/g);
        return !nums || nums.some((n) => parseFloat(n) !== 0);
    };
    function scanDecls(file, raw, base, css) {
        for (const m of css.matchAll(/(^|[;{\s])(--[\w-]+|[a-z-]+)\s*:\s*([^;{}]+)/g)) {
            const prop = m[2];
            const val = m[3].replace(/!important/g, "").trim();
            const idx = base + m.index + m[1].length;
            if (/^(none|initial|unset|inherit|revert)$/i.test(val)) continue;
            if (prop.startsWith("--")) {
                if (
                    /shadow|glow|gleam|specular|rim|highlight|halo|bloom|bevel/i.test(prop) &&
                    /(drop-shadow|blur\(|\binset\b|-?\d+px\s+-?\d+px|-gradient\()/.test(val)
                ) {
                    totals.lightingTokenDefs++;
                    add("lighting-token", file, raw, idx, `${prop}: ${val}`);
                }
                continue;
            }
            if (prop === "box-shadow") {
                const layers = splitTop(val).filter(paints);
                if (!layers.length) continue;
                totals.boxShadowDecls++;
                totals.boxShadowLayers += layers.length;
                if (layers.length > 1) totals.multiLayerShadowDecls++;
                for (const l of layers) {
                    if (/\binset\b/.test(l)) {
                        totals.insetLayers++;
                        if (LIGHT_RE.test(l) || /var\(--background\)/.test(l)) totals.insetHighlightLayers++;
                    }
                }
                add(layers.length > 1 ? "box-shadow-multi" : "box-shadow", file, raw, idx, `${prop}: ${val}`);
            } else if (prop === "text-shadow") {
                totals.textShadow++;
                add("text-shadow", file, raw, idx, `${prop}: ${val}`);
            } else if (prop === "filter" || prop === "-webkit-filter") {
                if (/drop-shadow\(/.test(val)) {
                    totals.filterDropShadow++;
                    add("filter-drop-shadow", file, raw, idx, `${prop}: ${val}`);
                }
                if (/(^|\s)blur\((?!0(px)?\))/.test(val)) {
                    totals.filterBlur++;
                    add("filter-blur", file, raw, idx, `${prop}: ${val}`);
                }
            } else if (prop === "backdrop-filter") {
                if (/blur\((?!0(px)?\))|--glass-blur/.test(val)) {
                    totals.backdropBlur++;
                    add("backdrop-blur", file, raw, idx, `${prop}: ${val}`);
                }
            } else if (/^background(-image)?$/.test(prop) && /-gradient\(/.test(val)) {
                totals.gradientFills++;
                add("gradient-fill", file, raw, idx, `${prop}: ${val}`);
            } else if (/^animation(-iteration-count)?$/.test(prop) && /\binfinite\b/.test(val)) {
                totals.loopingKeyframes++;
                add("looping-animation", file, raw, idx, `${prop}: ${val}`);
            }
        }
    }

    for (const file of files) {
        const raw = fs.readFileSync(file, "utf8");
        // Each CSS region keeps its own offset into the file so sites cite real lines.
        const regions = file.endsWith(".css")
            ? [{ base: 0, css: raw }]
            : [...raw.matchAll(/(<style[^>]*>)([\s\S]*?)<\/style>/g)].map((m) => ({
                  base: m.index + m[1].length,
                  css: m[2],
              }));
        for (const { base, css: rawCss } of regions) {
            // blank comments in place (keeps offsets)
            const css = rawCss.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));
            scanDecls(file, raw, base, css);
        }
        const tpl = templateOf(file, raw);
        if (tpl) {
            const tplBase = raw.indexOf(tpl);
            for (const m of tpl.matchAll(/(?<![\w-])(?:[a-z0-9-]+:)*(shadow-(?:sm|md|lg|xl|2xl|inner|cartoon[\w-]*|card[\w-]*|glass[\w-]*|elevated|soft|dock[\w-]*|modal|\[[^\]]+\]|\([^)]+\))|drop-shadow(?:-[a-z0-9]+|-\[[^\]]+\])?|text-shadow[\w-]*)(?![\w-])/g)) {
                totals.twShadowUtilities++;
                add("tw-shadow", file, raw, tplBase + m.index, m[0]);
            }
            for (const m of tpl.matchAll(/\banimate-(pulse|spin|ping|bounce)\b/g)) {
                totals.twLoopUtilities++;
                add("tw-loop", file, raw, tplBase + m.index, m[0]);
            }
            for (const m of tpl.matchAll(/\bbg-(?:linear|radial|conic|gradient)-[\w\[\]-]+/g)) {
                totals.twGradientUtilities++;
                add("tw-gradient", file, raw, tplBase + m.index, m[0]);
            }
        }
    }
    return { scanned: files.length, totals, sites };
}

// ─── computed half ───────────────────────────────────────────────────────────

/**
 * Runs in the page. "Chrome" = every rendered element that is not inside a
 * canvas/svg/img subject; "controls" = interactive roles. A gradient that IS
 * the content (colour tracks, spectrum, swatches, gradient previews, alpha
 * checker) is exempt by CONTENT_GRADIENT.
 */
function pageProbe(top) {
    const CONTROL =
        "button,a[href],input,select,textarea,label,summary,[role=button],[role=tab],[role=slider],[role=switch],[role=menuitem],[role=option],[role=combobox],[role=checkbox],[role=radio]";
    const CONTENT_GRADIENT =
        /(slider|track|spectrum|swatch|gradient|checker|alpha|hue|chip-color|preview|stop|ramp|strip|plate|dot|well)/i;
    // Colour of a computed shadow layer as {light: 0..1 lightness-ish, a}. Chrome
    // serialises rgb(), color(srgb ...), oklab() and oklch() here.
    const colourOf = (s) => {
        let m = s.match(/rgba?\(([^)]+)\)/);
        if (m) {
            const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
            return { light: Math.min(p[0], p[1], p[2]) / 255, a: p.length > 3 ? p[3] : 1 };
        }
        m = s.match(/color\(srgb ([^)]+)\)/);
        if (m) {
            const p = m[1].split(/[ /]+/).filter(Boolean).map(Number);
            return { light: Math.min(p[0], p[1], p[2]), a: p.length > 3 ? p[3] : 1 };
        }
        m = s.match(/ok(?:lab|lch)\(([^)]+)\)/);
        if (m) {
            const p = m[1].split(/[ /]+/).filter(Boolean).map(Number);
            return { light: p[0], a: p.length > 3 ? p[3] : 1 };
        }
        return null;
    };
    // [x, y, blur, spread] of a layer, colour functions removed.
    const lengthsOf = (l) =>
        (l.replace(/[a-z-]+\([^)]*\)/g, "").match(/-?[\d.]+px/g) || []).map(parseFloat);
    const splitTop = (v) => {
        const out = [];
        let d = 0,
            cur = "";
        for (const ch of v) {
            if (ch === "(") d++;
            else if (ch === ")") d--;
            if (ch === "," && d === 0) {
                out.push(cur.trim());
                cur = "";
            } else cur += ch;
        }
        if (cur.trim()) out.push(cur.trim());
        return out;
    };
    const describe = (el) => {
        const cls = (el.getAttribute("class") || "").trim().split(/\s+/).slice(0, 4).join(".");
        const id = el.id ? `#${el.id}` : "";
        const dt = [...el.attributes].filter((a) => a.name.startsWith("data-")).slice(0, 2).map((a) => `[${a.name}]`).join("");
        return `${el.tagName.toLowerCase()}${id}${cls ? "." + cls : ""}${dt}`;
    };
    // glass-owned = the element carries a glass-ui class (glass-*, gl-*, or a
    // known glass atom root: goo-blob-*, badge-atom, segmented-*,
    // control-surface); everything else is the consumer's own paint.
    const owner = (el) =>
        /(^|\s)(glass|gl-|goo-blob|badge-atom|segmented-|control-surface)[\w-]*/.test(el.getAttribute("class") || "") ? "glass" : "consumer";
    const t = {
        elements: 0,
        boxShadowElements: 0,
        boxShadowLayers: 0,
        maxLayersOnOneElement: 0,
        multiLayerElements: 0,
        ringLayers: 0,
        insetLayers: 0,
        insetHighlightLayers: 0,
        textShadow: 0,
        filterDropShadow: 0,
        filterBlur: 0,
        backdropBlur: 0,
        gradientFillsOnControls: 0,
        contentGradientsExempt: 0,
        loopingAnimations: 0,
    };
    const byOwner = { glass: {}, consumer: {} };
    const bump = (o, k, n = 1) => (byOwner[o][k] = (byOwner[o][k] || 0) + n);
    const offenders = [];
    const note = (kind, el, detail) => offenders.push({ kind, owner: owner(el), el: describe(el), detail: String(detail).slice(0, 180) });

    for (const el of document.querySelectorAll("body *")) {
        if (el.closest("canvas,svg,img,video,picture,script,style,noscript,template")) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
        t.elements++;
        const o = owner(el);
        if (cs.boxShadow && cs.boxShadow !== "none") {
            const painted = splitTop(cs.boxShadow).filter((l) => {
                // a fully transparent or zero-extent layer paints nothing
                const c = colourOf(l);
                if (c && c.a === 0) return false;
                return lengthsOf(l).some((n) => n !== 0);
            });
            // A 0/0/0 spread ring is a border or focus ring, not lighting: it is
            // tallied as a ring and does not count toward the layer allowance.
            const isRing = (l) => {
                const [x = 0, y = 0, b = 0] = lengthsOf(l);
                return x === 0 && y === 0 && b === 0;
            };
            const layers = painted.filter((l) => !isRing(l));
            t.ringLayers += painted.length - layers.length;
            if (layers.length) {
                t.boxShadowElements++;
                t.boxShadowLayers += layers.length;
                bump(o, "boxShadowLayers", layers.length);
                t.maxLayersOnOneElement = Math.max(t.maxLayersOnOneElement, layers.length);
                if (layers.length > 1) {
                    t.multiLayerElements++;
                    bump(o, "multiLayerElements");
                    note("box-shadow-multi", el, cs.boxShadow);
                }
                for (const l of layers) {
                    if (/\binset\b/.test(l)) {
                        t.insetLayers++;
                        const c = colourOf(l);
                        if (c && c.light > 0.78) {
                            t.insetHighlightLayers++;
                            bump(o, "insetHighlightLayers");
                            note("inset-highlight", el, l);
                        }
                    }
                }
            }
        }
        if (cs.textShadow && cs.textShadow !== "none") {
            t.textShadow++;
            bump(o, "textShadow");
            note("text-shadow", el, cs.textShadow);
        }
        if (cs.filter && cs.filter !== "none") {
            if (/drop-shadow\(/.test(cs.filter)) {
                t.filterDropShadow++;
                bump(o, "filterDropShadow");
                note("filter-drop-shadow", el, cs.filter);
            }
            if (/(^|\s)blur\((?!0px)/.test(cs.filter)) {
                t.filterBlur++;
                bump(o, "filterBlur");
                note("filter-blur", el, cs.filter);
            }
        }
        const bf = cs.backdropFilter || cs.webkitBackdropFilter;
        if (bf && bf !== "none" && /blur\((?!0px)/.test(bf)) {
            t.backdropBlur++;
            bump(o, "backdropBlur");
        }
        if (/-gradient\(/.test(cs.backgroundImage) && el.matches(CONTROL + "," + CONTROL.split(",").map((s) => s + " *").join(","))) {
            const hint = `${el.getAttribute("class") || ""} ${[...el.attributes].map((a) => a.name).join(" ")} ${el.getAttribute("aria-label") || ""}`;
            if (CONTENT_GRADIENT.test(hint) || el.getAttribute("style")?.includes("gradient")) t.contentGradientsExempt++;
            else {
                t.gradientFillsOnControls++;
                bump(o, "gradientFillsOnControls");
                note("gradient-on-control", el, cs.backgroundImage);
            }
        }
    }
    for (const a of document.getAnimations()) {
        const tgt = a.effect && a.effect.target;
        if (!tgt || !(tgt instanceof Element)) continue;
        if (tgt.closest("canvas,svg,img,video")) continue;
        const it = a.effect.getComputedTiming().iterations;
        if (it === Infinity && a.playState === "running") {
            t.loopingAnimations++;
            bump(owner(tgt), "loopingAnimations");
            note("looping-animation", tgt, a.animationName || a.id || "web-animation");
        }
    }
    const seen = new Map();
    for (const off of offenders) {
        const k = `${off.kind}|${off.el}|${off.detail}`;
        seen.set(k, { ...off, count: (seen.get(k)?.count || 0) + 1 });
    }
    return {
        totals: t,
        byOwner,
        offenders: [...seen.values()].sort((a, b) => b.count - a.count).slice(0, top),
    };
}

async function computedCensus() {
    const { chromium } = await import(path.join(ROOT, "node_modules/playwright/index.mjs"));
    // §0ei: the real Chrome binary, new-headless; never a visible window.
    const browser = await chromium.launch({ channel: "chrome", headless: true });
    const pages = [];
    try {
        for (const theme of THEMES)
            for (const width of WIDTHS) {
                const ctx = await browser.newContext({
                    viewport: { width, height: width <= 500 ? 844 : 900 },
                    colorScheme: theme,
                });
                await ctx.addInitScript((th) => {
                    try {
                        localStorage.setItem("vueuse-color-scheme", th);
                    } catch {}
                }, theme);
                const page = await ctx.newPage();
                for (const route of ROUTES) {
                    const rec = { route, theme, width };
                    try {
                        await page.goto(BASE + route, { waitUntil: "load", timeout: 90_000 });
                        await page.waitForTimeout(SETTLE);
                        Object.assign(rec, await page.evaluate(pageProbe, TOP));
                    } catch (e) {
                        rec.error = String(e).slice(0, 240);
                    }
                    pages.push(rec);
                }
                await ctx.close();
            }
    } finally {
        await browser.close();
    }
    const sum = {};
    const sumOwner = { glass: {}, consumer: {} };
    let maxLayers = 0;
    for (const p of pages) {
        if (!p.totals) continue;
        for (const [k, v] of Object.entries(p.totals)) {
            if (k === "maxLayersOnOneElement") maxLayers = Math.max(maxLayers, v);
            else sum[k] = (sum[k] || 0) + v;
        }
        for (const o of ["glass", "consumer"])
            for (const [k, v] of Object.entries(p.byOwner[o])) sumOwner[o][k] = (sumOwner[o][k] || 0) + v;
    }
    sum.maxLayersOnOneElement = maxLayers;
    return { base: BASE, routes: ROUTES, widths: WIDTHS, themes: THEMES, totals: sum, byOwner: sumOwner, pages };
}

// ─── verdict ─────────────────────────────────────────────────────────────────

const ALLOWANCE = {
    maxLayersOnOneElement: 1,
    insetHighlightLayers: 0,
    textShadow: 0,
    filterDropShadow: 0,
    filterBlur: 0,
    gradientFillsOnControls: 0,
    loopingAnimations: 0,
};

function verdict(computed) {
    if (!computed) return { verdict: "UNMEASURED", reason: "static-only run" };
    const over = {};
    for (const [k, cap] of Object.entries(ALLOWANCE)) {
        const v = computed.totals[k] ?? 0;
        if (v > cap) over[k] = { value: v, allowance: cap };
    }
    return { verdict: Object.keys(over).length ? "RED" : "GREEN", allowance: ALLOWANCE, over };
}

const result = {
    census: "X-DS lighting census",
    app: "value.js",
    at: new Date().toISOString(),
    static: staticCensus(),
};
if (!flag("static-only")) result.computed = await computedCensus();
result.gate = verdict(result.computed);

const json = JSON.stringify(result, null, 2);
if (OUT) {
    fs.mkdirSync(path.dirname(path.resolve(OUT)), { recursive: true });
    fs.writeFileSync(OUT, json + "\n");
    console.log(JSON.stringify({ out: OUT, gate: result.gate, static: result.static.totals, computed: result.computed?.totals }, null, 2));
} else console.log(json);
