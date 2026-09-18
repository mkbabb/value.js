/**
 * csp-gates.mjs — the born-RED gate battery for WAVE V·MEGA-W-CSP-1.
 *
 * worker-O (Opus 5, claude-opus-5[1m]) · mega-tranche adjudication of
 * demo/scenes/ConfigSliderPane.vue.
 *
 * Every gate here asserts a PRODUCT PROPERTY (L-2) and is RED against today's
 * tree (L-3). Run:  node docs/tranches/V/megatranche/audit/components/
 *                        ConfigSliderPane/probes/csp-gates.mjs
 * Exit code = number of RED gates. `--gate=G4` runs one.
 *
 * ENV (L-12): the dev server at http://localhost:9000 (VITE, API-less).
 *   BLIND TO: build-time defects (bundle, entry chunk), real-Safari-only
 *   behaviour (I-20: playwright-webkit != safari-app), and any data-backed
 *   state (no mongo). It CAN see: computed style, DOM structure, ARIA
 *   attributes, forced-colors emulation (Chromium ONLY — WebKit ignores
 *   Playwright's forcedColors, so a WebKit forced-colors frame is a false
 *   witness and this file refuses to run G4 on WebKit).
 * Static gates (G5c, G8, G9, G10b, G11) read the tree, not the browser.
 */
import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const BASE = process.env.CSP_BASE ?? "http://localhost:9000";
const ROOT = execSync("git rev-parse --show-toplevel").toString().trim();
const SFC = `${ROOT}/demo/scenes/ConfigSliderPane.vue`;
const only = (process.argv.find((a) => a.startsWith("--gate=")) || "").split("=")[1];

const results = [];
const gate = (id, title, red, detail) => {
    results.push({ id, title, verdict: red ? "RED" : "GREEN", detail });
};
const want = (id) => !only || only === id;

// ─────────────────────────────────────────── static gates (no browser)
const src = readFileSync(SFC, "utf8");
const grepCount = (pattern, paths) => {
    try {
        return Number(
            execSync(`grep -rho ${JSON.stringify(pattern)} ${paths} | wc -l`, { cwd: ROOT })
                .toString()
                .trim(),
        );
    } catch {
        return 0;
    }
};

if (want("G5c")) {
    const claims44 = /≥\s*44px|>=\s*44px/.test(src);
    gate("G5c", "no ≥44px touch claim in the SFC while thumbs render 12px inline", claims44,
        `SFC contains a ≥44px claim: ${claims44} (line 186-187). Measured thumb inline size: 12px (G5b).`);
}
if (want("G8")) {
    const casts = grepCount("as unknown) as Record<string, unknown>", "demo/scenes/");
    const asNumber = grepCount("as number", "demo/scenes/ConfigSliderPane.vue");
    gate("G8", "the config lens is typed: zero laundering casts, zero `as number`", casts + asNumber > 0,
        `\`(x as unknown) as Record<string, unknown>\` in demo/scenes/ = ${casts} (want 0); \`as number\` in the SFC = ${asNumber} (want 0).`);
}
if (want("G9")) {
    const specs = grepCount("ConfigSliderPane", "test/ demo/test/");
    gate("G9", "a unit suite exercises the pane's behaviour (anti-vacuity)", specs === 0,
        `Files under test/ + demo/test/ naming ConfigSliderPane: ${specs} (want > 0). Today every green-keeping mutation survives: update()→no-op, resetDefaults()→no-op, copyAsJson()→no-op, fmt()→String(v).`);
}
if (want("G10b")) {
    const fork = grepCount("aurora-row-label", "demo/scenes/atmosphere/AuroraPane.vue");
    gate("G10b", "no consumer re-mints the section-title recipe", fork > 0,
        `\`aurora-row-label\` occurrences in AuroraPane.vue: ${fork} (want 0). Its 5 declarations are byte-identical to .config-section-title (SFC :237-243).`);
}
if (want("G11")) {
    const ghostProp = /extraControls\?/.test(src) && !/extraControls\?:/.test(src.split("<template>")[0].split("defineProps")[1] ?? "");
    const emptyPromise = /Pass empty array to show empty state/.test(src);
    const hasElse = /v-else/.test(src);
    gate("G11", "the SFC documents only what it declares and renders", ghostProp || (emptyPromise && !hasElse),
        `header documents \`extraControls?\` that defineProps never declares: ${ghostProp}; JSDoc :44 promises an empty state and the template has no v-else: ${emptyPromise && !hasElse}.`);
}

// ─────────────────────────────────────────── browser gates
const needBrowser = ["G1", "G2", "G3", "G4", "G5a", "G5b", "G6", "G7", "G10a"].some(want);
if (needBrowser) {
    const browser = await chromium.launch();

    // ---- ordinary register, /#/blob
    if (["G1", "G2", "G3", "G7"].some(want)) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/blob`, { waitUntil: "networkidle" });
        await page.waitForSelector(".config-console .configurator-row");
        await page.waitForTimeout(1500);

        if (want("G1")) {
            const r = await page.evaluate(async () => {
                let vn = document.querySelector(".config-console")?.__vueParentComponent;
                let cfg = null;
                for (let i = 0; i < 8 && vn; i++) {
                    const p = vn.props;
                    if (p?.config && typeof p.config === "object" && "color" in p.config) { cfg = p.config; break; }
                    vn = vn.parent;
                }
                if (!cfg) return { reached: false };
                const before = JSON.parse(JSON.stringify(cfg.color.paletteStops));
                [...document.querySelectorAll(".config-action-bar button")]
                    .find((b) => /Reset/.test(b.textContent)).click();
                await new Promise((r) => setTimeout(r, 400));
                return { reached: true, before, after: JSON.parse(JSON.stringify(cfg.color.paletteStops)) };
            });
            const changed = r.reached && JSON.stringify(r.before) !== JSON.stringify(r.after);
            gate("G1", "Reset restores only the key paths the pane declares", !r.reached || changed,
                r.reached
                    ? `color.paletteStops BEFORE ${JSON.stringify(r.before)} → AFTER ${JSON.stringify(r.after)}. BlobPane.vue:8-9 declares this key out of the slider domain; useAtmosphere.ts:389-403 is keyed on the colour string, so the picker→blob link stays severed until a DIFFERENT colour is picked.`
                    : "could not reach the injected config (probe fault, not a verdict)");
        }

        if (want("G2")) {
            const r = await page.evaluate(() =>
                [...document.querySelectorAll(".config-console .configurator-row")].map((row) => ({
                    label: row.querySelector("label")?.textContent?.trim(),
                    readout: row.querySelector(".font-mono")?.textContent?.trim(),
                    valuetext: row.querySelector("[role=slider]")?.getAttribute("aria-valuetext"),
                    valuenow: row.querySelector("[role=slider]")?.getAttribute("aria-valuenow"),
                })));
            const bad = r.filter((x) => x.valuetext !== x.readout);
            gate("G2", "every config slider announces the value its row renders", bad.length > 0,
                `rows whose aria-valuetext !== rendered readout: ${bad.length}/${r.length}. e.g. ${JSON.stringify(bad[0])}. Same page, picker population: aria-valuetext "Lightness 92.0%" (useSliderAnnouncements.ts, U-F27) — one voice exists in-repo and is unconsumed here.`);
        }

        if (want("G3")) {
            const r = await page.evaluate(() => {
                const c = document.querySelector(".config-console");
                const labels = [...c.querySelectorAll("label")];
                return {
                    sections: c.querySelectorAll(".config-section-header").length,
                    groups: c.querySelectorAll("[role=group],fieldset").length,
                    namedGroups: [...c.querySelectorAll("[role=group],fieldset")].filter(
                        (g) => g.getAttribute("aria-label") || g.getAttribute("aria-labelledby")).length,
                    orphanLabels: labels.filter((l) => !l.getAttribute("for") && !l.querySelector("[role=slider],input")).length,
                    totalLabels: labels.length,
                };
            });
            const red = r.namedGroups !== r.sections || r.orphanLabels > 0;
            gate("G3", "drawn structure is programmatic: named groups per section, zero orphan labels", red,
                `sections drawn ${r.sections}; named role=group ${r.namedGroups} (want ${r.sections}); orphan <label> ${r.orphanLabels}/${r.totalLabels} (want 0).`);
        }

        if (want("G7")) {
            const r = await page.evaluate(() => {
                const v = document.querySelector(".config-console .configurator-row .font-mono");
                const fvn = getComputedStyle(v).fontVariantNumeric;
                const w0 = +v.getBoundingClientRect().width.toFixed(1);
                const orig = v.textContent;
                v.textContent = "-0.0005"; const wide = +v.getBoundingClientRect().width.toFixed(1);
                v.textContent = "3"; const narrow = +v.getBoundingClientRect().width.toFixed(1);
                v.textContent = orig;
                return { fvn, shipped: orig, w0, wide, narrow, minInline: getComputedStyle(v).minInlineSize };
            });
            const swing = +(r.wide - r.narrow).toFixed(1);
            gate("G7", "the live readout is tabular and reserves its widest legal representation", !/tabular-nums/.test(r.fvn) || swing > 0.5,
                `font-variant-numeric "${r.fvn}" (want tabular-nums); min-inline-size "${r.minInline}"; rendered width narrowest "3" ${r.narrow}px → widest "-0.0005" ${r.wide}px = ${swing}px swing (want ≤ 0.5px). fmt() derives precision from the VALUE (SFC :84-86), not the declared step.`);
        }
        await ctx.close();
    }

    // ---- /#/atmosphere: rhythm, dividers, type fork
    if (["G5a", "G5b", "G6", "G10a"].some(want)) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/atmosphere`, { waitUntil: "networkidle" });
        await page.waitForSelector(".config-console .configurator-row");
        await page.waitForTimeout(1500);

        if (want("G5a")) {
            const wide = await page.evaluate(() => {
                const r = document.querySelector(".config-console .configurator-row");
                let el = r, host = null;
                while (el) { if (getComputedStyle(el).containerType !== "normal") { host = el; break; } el = el.parentElement; }
                return { containerW: Math.round(host.getBoundingClientRect().width), minBlock: getComputedStyle(r).minBlockSize, rendered: +r.getBoundingClientRect().height.toFixed(2) };
            });
            await page.goto(`${BASE}/#/blob`, { waitUntil: "networkidle" });
            await page.waitForSelector(".config-console .configurator-row");
            await page.waitForTimeout(1200);
            const narrow = await page.evaluate(() => {
                const r = document.querySelector(".config-console .configurator-row");
                let el = r, host = null;
                while (el) { if (getComputedStyle(el).containerType !== "normal") { host = el; break; } el = el.parentElement; }
                return { containerW: Math.round(host.getBoundingClientRect().width), minBlock: getComputedStyle(r).minBlockSize, rendered: +r.getBoundingClientRect().height.toFixed(2) };
            });
            const ratio = +(wide.containerW / narrow.containerW).toFixed(2);
            const moved = Math.abs(wide.rendered - narrow.rendered);
            gate("G5a", "a declared container-scaled rhythm actually moves the rendered row", moved < 0.5,
                `container ${narrow.containerW}px → min-block-size ${narrow.minBlock}, rendered ${narrow.rendered}px; container ${wide.containerW}px → ${wide.minBlock}, rendered ${wide.rendered}px. Across a ${ratio}× container range the rendered row moved ${moved.toFixed(2)}px under a comment declaring "THE ONE RHYTHM SOURCE" (SFC :208-217). The clamp never binds: it resolves BELOW the row's real content height in both arms.`);
            await page.goto(`${BASE}/#/atmosphere`, { waitUntil: "networkidle" });
            await page.waitForSelector(".config-console .configurator-row");
            await page.waitForTimeout(1000);
        }

        if (want("G6")) {
            const r = await page.evaluate(() => {
                const hdrs = [...document.querySelectorAll(".config-section-header")];
                const bar = document.querySelector(".config-action-bar");
                return {
                    hdrLines: hdrs.filter((h) => parseFloat(getComputedStyle(h).borderBottomWidth) > 0).length,
                    hdrTotal: hdrs.length,
                    hdrColor: hdrs[0] ? getComputedStyle(hdrs[0]).borderBottomColor : null,
                    barLine: bar && parseFloat(getComputedStyle(bar).borderTopWidth) > 0 ? 1 : 0,
                    barColor: bar ? getComputedStyle(bar).borderTopColor : null,
                };
            });
            const lines = r.hdrLines + r.barLine;
            gate("G6", "the population contributes zero retained dividing lines", lines > 0,
                `computed dividing lines on /#/atmosphere: ${r.hdrLines} section rules + ${r.barLine} action-bar rule = ${lines} (want 0; /#/blob = 8). Colours ${r.hdrColor} / ${r.barColor}. Composited over the well they measure 1.24:1 light and 1.29:1 dark — forbidden AND too weak to group. Under Chromium forced-colors they are the ONLY surviving element in the pane (rgb(0,0,0) on a white field).`);
        }

        if (want("G10a")) {
            const r = await page.evaluate(() => {
                const pick = (el) => { const c = getComputedStyle(el); return { ff: c.fontFamily.split(",")[0], fs: c.fontSize, fw: c.fontWeight, tt: c.textTransform, ls: c.letterSpacing, color: c.color }; };
                const a = document.querySelector(".config-section-title"), b = document.querySelector(".aurora-row-label"), l = document.querySelector(".config-console .configurator-row label");
                return { sectionTitle: pick(a), auroraRowLabel: b ? pick(b) : null, rowLabel: pick(l) };
            });
            const same = r.auroraRowLabel && Object.keys(r.sectionTitle).filter((k) => r.sectionTitle[k] === r.auroraRowLabel[k]).length;
            const noStep = parseFloat(r.sectionTitle.fs) <= parseFloat(r.rowLabel.fs);
            gate("G10a", "one recipe per role: a heading is not a row label, and it steps above the rows it groups", same === 6 || noStep,
                `.config-section-title vs .aurora-row-label computed-identical on ${same}/6 properties ${JSON.stringify(r.sectionTitle)}; section heading ${r.sectionTitle.fs} vs row label ${r.rowLabel.fs} — no size step (want heading > label).`);
        }

        if (want("G5b")) {
            const r = await page.evaluate(() => {
                const t = [...document.querySelectorAll(".config-console [role=slider]")].map((x) => { const b = x.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height) }; });
                const rows = [...document.querySelectorAll(".config-console .configurator-row")].map((x) => x.getBoundingClientRect().top);
                const pitch = rows.length > 1 ? Math.round(rows[1] - rows[0]) : null;
                return { sizes: [...new Set(t.map((x) => `${x.w}x${x.h}`))], n: t.length, pitch };
            });
            const under = r.sizes.some((s) => Number(s.split("x")[0]) < 24);
            gate("G5b", "the operable handle meets the 24px inline floor on pointer:fine", under,
                `${r.n} handles, distinct sizes ${JSON.stringify(r.sizes)} (want inline ≥ 24). Row pitch ${r.pitch}px and one target per row, so WCAG 2.5.8's spacing exception is SATISFIED — this gate is the house floor (PROPORTION-AUDIT law 7), not an SC violation, and the SC claim must not be made.`);
        }
        await ctx.close();
    }

    // ---- G4: forced colours, CHROMIUM ONLY (L-12 / I-20)
    if (want("G4")) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/atmosphere`, { waitUntil: "networkidle" });
        await page.waitForSelector(".config-console .configurator-row");
        await page.waitForTimeout(1500);
        const r = await page.evaluate(() => {
            const cs = (e) => getComputedStyle(e);
            const th = document.querySelector(".config-console [role=slider]");
            th.focus();
            const btn = document.querySelector(".config-action-bar button");
            const before = { fv: th.matches(":focus-visible"), o: cs(th).outlineStyle, ow: cs(th).outlineWidth, bs: cs(th).boxShadow };
            btn.focus();
            const ctrl = { fv: btn.matches(":focus-visible"), o: cs(btn).outlineStyle, ow: cs(btn).outlineWidth };
            const track = document.querySelector(".config-console .slider-track");
            const well = document.querySelector(".console-well");
            return {
                forcedActive: matchMedia("(forced-colors: active)").matches,
                thumb: before, control: ctrl,
                trackBg: cs(track).backgroundColor, wellBg: cs(well).backgroundColor,
                trackBorderW: cs(track).borderTopWidth,
                rangeBg: cs(document.querySelector(".config-console .slider-range")).backgroundColor,
                rangeFCA: cs(document.querySelector(".config-console .slider-range")).forcedColorAdjust,
            };
        });
        if (!r.forcedActive) {
            gate("G4", "forced-colors focus survives on the config population", true,
                "FALSE-WITNESS GUARD FIRED: matchMedia('(forced-colors: active)') === false. This engine ignores the emulation; the run is void, not green.");
        } else {
            const red = r.thumb.o === "none" || parseFloat(r.thumb.ow) < 2;
            gate("G4", "forced-colors focus survives on the config population (demo-owned)", red,
                `focused config thumb: focus-visible ${r.thumb.fv}, outline-style "${r.thumb.o}", box-shadow "${r.thumb.bs}" — NO focus indicator. CONTROL in the same register: the action-bar button gets outline-style "${r.control.o}" ${r.control.ow}. So demo/styles/foundation.css:678 + :702-720 (\`:where(… [role="slider"] …):focus-visible{outline:2px solid Highlight}\`) EXISTS and WORKS — it is defeated only here, by specificity: :where() contributes 0, so the demo rule is (0,1,0) and the producer's \`.glass-slider[data-variant=spectrum] .slider-thumb[data-v-4f4cab01]:focus-visible{outline:none}\` is (0,4,0). This is a DEMO-owned cure that never lands, not a missing policy — the challenger's "grep -rn forced-colors demo/scenes/ → 0 hits" is an L-9 scope error that hides it. Adjacent dead declaration: the same block's tier-1 roster line at :693 (\`.glass-slider[data-variant="spectrum"] .slider-range{forced-color-adjust:none}\`) computes ${r.rangeFCA} over a range whose background is ${r.rangeBg} — it preserves nothing. Context (BANK B-1, glass-owned): trackBg ${r.trackBg} === wellBg ${r.wellBg}, border-width ${r.trackBorderW}.`);
        }
        await ctx.close();
    }
    await browser.close();
}

const red = results.filter((r) => r.verdict === "RED");
for (const r of results) console.log(`[${r.verdict}] ${r.id} · ${r.title}\n        ${r.detail}\n`);
console.log(`── ${red.length} RED / ${results.length} gates ──`);
process.exit(red.length);
