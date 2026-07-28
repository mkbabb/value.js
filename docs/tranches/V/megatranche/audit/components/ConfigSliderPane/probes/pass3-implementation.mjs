// CHALLENGE-C pass 3 — ConfigSliderPane implementation probe.
// Read-only. Obeys ADD-CSP §5 clause 1 (THE SETTLE LAW): every computed-style
// assertion on a transitioned property is taken after an 800 ms settle.
//
//   node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/pass3-implementation.mjs
import { chromium } from "playwright";

const SETTLE = 800;
const out = {};

function rel(l) {
    return l.map((c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
}
function ratio(a, b) {
    const [r1, g1, b1] = rel(a);
    const [r2, g2, b2] = rel(b);
    const L1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
    const L2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
    const hi = Math.max(L1, L2),
        lo = Math.min(L1, L2);
    return (hi + 0.05) / (lo + 0.05);
}

const browser = await chromium.launch();

// ── A · desktop 1440×900 · /#/blob ────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e)));
    await page.goto("http://localhost:9000/#/blob", { waitUntil: "load" });
    await page.locator(".config-console .configurator-row").first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(SETTLE * 2);

    out.A_containerQuery = await page.evaluate(() => {
        const row = document.querySelector(".config-console .configurator-row");
        const chain = [];
        let el = row;
        while (el) {
            const cs = getComputedStyle(el);
            chain.push({
                sel:
                    el.tagName.toLowerCase() +
                    (el.className && typeof el.className === "string"
                        ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
                        : ""),
                containerType: cs.containerType,
                containerName: cs.containerName,
            });
            el = el.parentElement;
        }
        const declared = chain.filter((c) => c.containerType && c.containerType !== "normal");
        return {
            ancestorsInspected: chain.length,
            ancestorsDeclaringContainerType: declared.length,
            declared,
            rowMinBlockSize: getComputedStyle(row).minBlockSize,
            rowRenderedHeight: +row.getBoundingClientRect().height.toFixed(2),
            paneContainerWidth: +document
                .querySelector(".config-console")
                .getBoundingClientRect()
                .width.toFixed(2),
            viewportWidth: window.innerWidth,
            sevenCqiIfViewport: +((window.innerWidth * 7) / 100).toFixed(2),
            sevenCqiIfPane: +(
                (document.querySelector(".config-console").getBoundingClientRect().width * 7) /
                100
            ).toFixed(2),
        };
    });

    out.A_names = await page.evaluate(() => {
        const thumbs = [...document.querySelectorAll(".config-console [role='slider']")];
        const names = thumbs.map((t) => t.getAttribute("aria-label"));
        const counts = {};
        for (const n of names) counts[n] = (counts[n] || 0) + 1;
        return {
            sliderCount: thumbs.length,
            distinctNames: Object.keys(counts).length,
            duplicated: Object.entries(counts)
                .filter(([, c]) => c > 1)
                .map(([n, c]) => ({ name: n, count: c })),
            valuetextPresent: thumbs.filter((t) => t.hasAttribute("aria-valuetext")).length,
            ariaDisabledPresent: thumbs.filter((t) => t.hasAttribute("aria-disabled")).length,
            describedbyPresent: thumbs.filter((t) => t.hasAttribute("aria-describedby")).length,
        };
    });

    out.A_headings = await page.evaluate(() => {
        const pane = document.querySelector(".config-console").closest("[data-slot], .relative");
        const root = pane || document;
        return {
            sectionTitleTags: [...document.querySelectorAll(".config-section-title")].map(
                (e) => e.tagName.toLowerCase(),
            ),
            sectionTitleRoles: [...document.querySelectorAll(".config-section-title")].map(
                (e) => e.getAttribute("role"),
            ),
            groupsInConsole: document.querySelectorAll(".config-console [role='group']").length,
            headingsInConsole: document.querySelectorAll(
                ".config-console h1,.config-console h2,.config-console h3,.config-console h4,.config-console h5,.config-console h6,.config-console [role='heading']",
            ).length,
            paneHeaderTag:
                document.querySelector(".pane-header-title")?.tagName.toLowerCase() ?? null,
            h1Count: document.querySelectorAll("h1").length,
            h2Count: document.querySelectorAll("h2").length,
        };
    });

    // SETTLE-LAW paint read: transitions have had 1600ms.
    out.A_paintSettled = await page.evaluate(() => {
        const rows = [...document.querySelectorAll(".config-console .configurator-row")];
        const sample = rows.slice(0, 3).map((r) => {
            const root = r.querySelector(".glass-slider");
            const track = r.querySelector(".slider-track");
            const range = r.querySelector(".slider-range");
            const thumb = r.querySelector(".slider-thumb");
            const cs = (e) => (e ? getComputedStyle(e) : null);
            return {
                label: r.querySelector("label")?.textContent?.trim(),
                variant: root?.getAttribute("data-variant"),
                dataSize: root?.getAttribute("data-size"),
                trackBg: cs(track)?.backgroundColor,
                trackBgImage: cs(track)?.backgroundImage,
                rangeBg: cs(range)?.backgroundColor,
                rangeBgImage: cs(range)?.backgroundImage,
                rangeW: +(range?.getBoundingClientRect().width ?? 0).toFixed(2),
                trackW: +(track?.getBoundingClientRect().width ?? 0).toFixed(2),
                thumbBg: cs(thumb)?.backgroundColor,
                thumbBorder: cs(thumb)?.borderTopColor + " " + cs(thumb)?.borderTopWidth,
                thumbBox: [
                    +(thumb?.getBoundingClientRect().width ?? 0).toFixed(2),
                    +(thumb?.getBoundingClientRect().height ?? 0).toFixed(2),
                ],
            };
        });
        return {
            variants: [
                ...new Set(
                    [...document.querySelectorAll(".config-console .glass-slider")].map((e) =>
                        e.getAttribute("data-variant"),
                    ),
                ),
            ],
            rangeBackgroundsDistinct: [
                ...new Set(
                    [...document.querySelectorAll(".config-console .slider-range")].map(
                        (e) => getComputedStyle(e).backgroundColor,
                    ),
                ),
            ],
            sample,
        };
    });

    // Focus indicator in the ORDINARY register (not forced-colors).
    out.A_focusIndicator = await page.evaluate(async () => {
        const thumb = document.querySelector(".config-console [role='slider']");
        thumb.focus();
        // reka focuses on keyboard interaction; dispatch a key to force :focus-visible
        thumb.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }),
        );
        await new Promise((r) => setTimeout(r, 400));
        const cs = getComputedStyle(thumb);
        const matches = (() => {
            try {
                return thumb.matches(":focus-visible");
            } catch {
                return null;
            }
        })();
        const btn = document.querySelector(".config-action-bar button");
        btn?.focus();
        btn?.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }),
        );
        await new Promise((r) => setTimeout(r, 200));
        const bcs = btn ? getComputedStyle(btn) : null;
        return {
            thumbIsFocused: document.activeElement === thumb,
            thumbFocusVisible: matches,
            thumbOutlineStyle: cs.outlineStyle,
            thumbOutlineWidth: cs.outlineWidth,
            thumbBoxShadow: cs.boxShadow,
            focusRingShadowToken: getComputedStyle(document.documentElement)
                .getPropertyValue("--focus-ring-shadow")
                .trim(),
            ringToken: getComputedStyle(document.documentElement)
                .getPropertyValue("--ring")
                .trim(),
            actionBarButtonOutline: bcs
                ? bcs.outlineStyle + " " + bcs.outlineWidth
                : null,
            actionBarButtonBoxShadow: bcs?.boxShadow ?? null,
        };
    });

    // Step-grid alignment — the declared domain vs what the control can reach.
    out.A_stepGrid = await page.evaluate(async () => {
        const target = [...document.querySelectorAll(".config-console .configurator-row")].find(
            (r) => r.querySelector("label")?.textContent?.trim() === "Sat Radius",
        );
        const thumb = target.querySelector("[role='slider']");
        const readout = () => target.querySelector(".font-mono")?.textContent?.trim();
        const now = () => thumb.getAttribute("aria-valuenow");
        const before = { valuenow: now(), readout: readout() };
        thumb.focus();
        thumb.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true }),
        );
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const afterRight = { valuenow: now(), readout: readout() };
        thumb.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true }),
        );
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const afterLeft = { valuenow: now(), readout: readout() };
        return {
            min: thumb.getAttribute("aria-valuemin"),
            max: thumb.getAttribute("aria-valuemax"),
            declaredStep: 0.005,
            before,
            afterRight,
            afterLeft,
        };
    });

    // Readout glyph-count swing (fmt value-derived precision), measured.
    out.A_readouts = await page.evaluate(() => {
        const rows = [...document.querySelectorAll(".config-console .configurator-row")];
        const cells = rows.map((r) => ({
            label: r.querySelector("label")?.textContent?.trim(),
            readout: r.querySelector(".font-mono")?.textContent?.trim(),
            w: +(r.querySelector(".font-mono")?.getBoundingClientRect().width ?? 0).toFixed(2),
        }));
        const widths = cells.map((c) => c.w).filter((w) => w > 0);
        return {
            rows: cells.length,
            minWidth: Math.min(...widths),
            maxWidth: Math.max(...widths),
            swingPx: +(Math.max(...widths) - Math.min(...widths)).toFixed(2),
            glyphCounts: [...new Set(cells.map((c) => (c.readout ?? "").length))].sort(),
            zeroLike: cells.filter((c) => c.readout === "0" || c.readout === "-0"),
            sample: cells.slice(0, 8),
        };
    });

    // Dock coupling: does the pane's slider reach a dock context?
    out.A_dockCoupling = await page.evaluate(() => {
        const s = document.querySelector(".config-console .glass-slider");
        const docks = [...document.querySelectorAll(".glass-dock")].map((d) => ({
            y: Math.round(d.getBoundingClientRect().y),
            containsConfigSlider: d.contains(s),
            isPaneActionBar: !!d.closest(".config-action-bar"),
        }));
        return {
            dockCount: docks.length,
            docks,
            sliderInsideAnyDock: docks.some((d) => d.containsConfigSlider),
            sliderDataHeldAttr: s.getAttribute("data-held"),
            keepDockOpenPropDeclaredInDemo: false,
        };
    });

    // Divider count (canon "none")
    out.A_dividers = await page.evaluate(() => {
        const els = [...document.querySelectorAll(".config-section-header")];
        return {
            sectionHeaders: els.length,
            borderBottoms: els.map((e) => getComputedStyle(e).borderBottomWidth),
            actionBarBorderTop: getComputedStyle(document.querySelector(".config-action-bar"))
                .borderTopWidth,
        };
    });

    // Heading/label recipe identity (D-7): section title vs row label
    out.A_recipeIdentity = await page.evaluate(() => {
        const pick = (el) => {
            if (!el) return null;
            const cs = getComputedStyle(el);
            return {
                fontFamily: cs.fontFamily.split(",")[0],
                fontSize: cs.fontSize,
                fontWeight: cs.fontWeight,
                letterSpacing: cs.letterSpacing,
                textTransform: cs.textTransform,
                color: cs.color,
            };
        };
        return {
            sectionTitle: pick(document.querySelector(".config-section-title")),
            rowLabel: pick(document.querySelector(".config-console .configurator-row label")),
        };
    });

    out.A_pageErrors = pageErrors;
    await ctx.close();
}

// ── B · coarse pointer 430×932 · hit-testing the ::before ──────────────────
{
    const ctx = await browser.newContext({
        viewport: { width: 430, height: 932 },
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 3,
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "load" });
    await page.locator(".config-console .configurator-row").first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(SETTLE);
    out.B_coarse = await page.evaluate(() => {
        const row = document.querySelector(".config-console .configurator-row");
        const root = row.querySelector(".glass-slider");
        const thumb = row.querySelector(".slider-thumb");
        const track = row.querySelector(".slider-track");
        const rr = root.getBoundingClientRect();
        const tr = thumb.getBoundingClientRect();
        const hitAt = (x, y) => {
            const e = document.elementFromPoint(x, y);
            return e
                ? e.tagName.toLowerCase() +
                      (typeof e.className === "string" && e.className
                          ? "." + e.className.trim().split(/\s+/)[0]
                          : "")
                : null;
        };
        return {
            coarseMatches: matchMedia("(pointer: coarse)").matches,
            rootPosition: getComputedStyle(root).position,
            rootMinBlockSize: getComputedStyle(root).minBlockSize,
            rootBox: [+rr.width.toFixed(2), +rr.height.toFixed(2)],
            thumbBox: [+tr.width.toFixed(2), +tr.height.toFixed(2)],
            trackH: +track.getBoundingClientRect().height.toFixed(2),
            beforeBlockSize: getComputedStyle(root, "::before").blockSize,
            beforeContent: getComputedStyle(root, "::before").content,
            hitAtThumbCentre: hitAt(tr.x + tr.width / 2, tr.y + tr.height / 2),
            hitAtTrackFarRight: hitAt(rr.x + rr.width - 4, rr.y + rr.height / 2),
            hitAtRootTopEdge: hitAt(rr.x + rr.width / 2, rr.y + 2),
            rowMinBlockSize: getComputedStyle(row).minBlockSize,
            rowRenderedHeight: +row.getBoundingClientRect().height.toFixed(2),
        };
    });
    await ctx.close();
}

// ── C · forced-colors, chromium only ──────────────────────────────────────
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        forcedColors: "active",
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "load" });
    await page.locator(".config-console .configurator-row").first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(SETTLE);
    out.C_forcedColors = await page.evaluate(async () => {
        const assertion = matchMedia("(forced-colors: active)").matches;
        const thumb = document.querySelector(".config-console [role='slider']");
        thumb.focus();
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
        await new Promise((r) => setTimeout(r, 400));
        const cs = getComputedStyle(thumb);
        const btn = document.querySelector(".config-action-bar button");
        btn?.focus();
        btn?.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
        await new Promise((r) => setTimeout(r, 200));
        const bcs = btn ? getComputedStyle(btn) : null;
        const track = document.querySelector(".config-console .slider-track");
        const range = document.querySelector(".config-console .slider-range");
        return {
            forcedColorsAsserted: assertion,
            thumbOutline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor,
            thumbBoxShadow: cs.boxShadow,
            thumbBg: cs.backgroundColor,
            thumbBorder: cs.borderTopColor,
            trackBg: getComputedStyle(track).backgroundColor,
            rangeBg: getComputedStyle(range).backgroundColor,
            controlElementOutline: bcs
                ? bcs.outlineStyle + " " + bcs.outlineWidth + " " + bcs.outlineColor
                : null,
        };
    });
    await ctx.close();
}

// ── D · pure-function harness: writePath / readPath / fmt at the boundary ──
// Byte-copied from ConfigSliderPane.vue:57-86 (ESM strict mode, as the SFC runs).
{
    function readPath(obj, path) {
        let cur = obj;
        for (const seg of path.split(".")) {
            if (cur == null || typeof cur !== "object") return undefined;
            cur = cur[seg];
        }
        return cur;
    }
    function writePath(obj, path, value) {
        const segs = path.split(".");
        let cur = obj;
        for (let i = 0; i < segs.length - 1; i++) {
            cur = cur[segs[i]];
        }
        cur[segs[segs.length - 1]] = value;
    }
    function fmt(v) {
        return Number.isInteger(v) ? String(v) : v.toFixed(3);
    }
    const t = (name, fn) => {
        try {
            return { case: name, result: fn() };
        } catch (e) {
            return { case: name, threw: e.constructor.name + ": " + e.message };
        }
    };
    out.D_pureHarness = [
        // read side
        t("readPath({}, 'zones.count')", () => readPath({}, "zones.count")),
        t("fmt(readPath({},'zones.count'))", () => fmt(readPath({}, "zones.count"))),
        t("fmt(readPath({medium:{kind:'smooth'}},'medium'))", () =>
            fmt(readPath({ medium: { kind: "smooth" } }, "medium")),
        ),
        // write side — the AuroraAtoms.zones? shape
        t("writePath({}, 'zones.count', 4)", () => {
            const o = {};
            writePath(o, "zones.count", 4);
            return o;
        }),
        t("writePath({zones:undefined}, 'zones.count', 4)", () => {
            const o = { zones: undefined };
            writePath(o, "zones.count", 4);
            return o;
        }),
        t("writePath({tempo:1}, 'tempo.foo', 4)  // path through a primitive", () => {
            const o = { tempo: 1 };
            writePath(o, "tempo.foo", 4);
            return o;
        }),
        // fmt boundary
        t("fmt(0)", () => fmt(0)),
        t("fmt(-0)", () => fmt(-0)),
        t("fmt(NaN)", () => fmt(NaN)),
        t("fmt(Infinity)", () => fmt(Infinity)),
        t("fmt(1e21)", () => fmt(1e21)),
        t("fmt(0.082) // Sat Radius default", () => fmt(0.082)),
        t("fmt(1)  // Iridescence at max, step 0.01", () => fmt(1)),
        t("fmt(0.99)", () => fmt(0.99)),
        t("fmt(2500) // mergeDuration, step 100", () => fmt(2500)),
        t("fmt(undefined)", () => fmt(undefined)),
    ];

    // step-grid audit of every declared def, from source constants
    const defs = [
        ["geometry.bodyRadius", 0.08, 0.45, 0.005, 0.22],
        ["geometry.satelliteCount", 0, 4, 1, 3],
        ["geometry.satelliteRadius", 0.02, 0.2, 0.005, 0.082],
        ["geometry.orbitRadius", 0.15, 0.48, 0.005, 0.17],
        ["geometry.eccentricity", 0, 0.5, 0.01, 0.05],
        ["membrane.smoothK", 0.02, 0.45, 0.005, 0.05],
        ["membrane.warpAmp", 0, 1, 0.01, 0.35],
        ["membrane.noiseAmp", 0, 0.1, 0.001, 0.038],
        ["membrane.noiseFreq", 0.5, 10, 0.1, 3.5],
        ["membrane.noiseSpeed", 0, 0.5, 0.005, 0.08],
        ["membrane.pulseFreq", 0, 2, 0.01, 0.3],
        ["membrane.pulseAmp", 0, 0.06, 0.001, 0.008],
        ["color.hueRange", 0, 60, 1, 5],
        ["color.satShift", -0.2, 0.2, 0.005, 0],
        ["color.brightnessShift", -0.15, 0.15, 0.005, 0],
        ["color.colorNoiseFreq", 0.5, 8, 0.1, 2],
        ["color.colorNoiseSpeed", 0, 0.3, 0.005, 0.05],
        ["surface.specStrength", 0, 2, 0.02, 0.16],
        ["surface.specShininess", 8, 64, 1, 20],
        ["surface.rimStrength", 0, 2, 0.02, 0.32],
        ["surface.rimPower", 1, 5, 0.05, 2.5],
        ["surface.iridescence", 0, 1, 0.01, 0.09],
        ["surface.sssScale", 0, 1, 0.01, 0.1],
        ["surface.coreGlow", 0, 1, 0.01, 0.06],
        ["interaction.pointerAttraction", -1, 1, 0.05, 0.35],
        ["interaction.pointerStrength", 0, 0.3, 0.005, 0.1],
        ["interaction.stretch", 0, 1.5, 0.05, 0.5],
        ["interaction.clickImpulse", 0, 1, 0.02, 0.5],
        ["satellites.mergeDuration", 500, 5000, 100, 1800],
        ["satellites.emergeDuration", 500, 5000, 100, 2200],
        ["tempo", 0.25, 2.5, 0.05, 1],
        ["colorEnergy", 0, 1, 0.01, 0.76],
        ["noise", 0, 1, 0.01, 0.5],
        ["zones.count", 1, 6, 1, 6],
    ];
    const EPS = 1e-9;
    out.D_stepGridAudit = {
        defsAudited: defs.length,
        offGrid: defs
            .map(([k, min, max, step, def]) => {
                const n = (def - min) / step;
                const nearest = Math.round(n);
                return {
                    key: k,
                    min,
                    step,
                    default: def,
                    stepsFromMin: +n.toFixed(6),
                    onGrid: Math.abs(n - nearest) < 1e-6,
                    nearestReachable: +(min + nearest * step).toFixed(6),
                };
            })
            .filter((r) => !r.onGrid),
        maxNotOnGrid: defs
            .map(([k, min, max, step]) => ({
                key: k,
                max,
                stepsToMax: +((max - min) / step).toFixed(6),
                onGrid: Math.abs((max - min) / step - Math.round((max - min) / step)) < 1e-6,
            }))
            .filter((r) => !r.onGrid),
        fmtVsStep: defs
            .map(([k, min, max, step, def]) => {
                const declaredDp = Math.max(0, Math.round(-Math.log10(step)));
                const rendered = Number.isInteger(def) ? String(def) : def.toFixed(3);
                const honest = def.toFixed(declaredDp);
                return { key: k, step, declaredDp, rendered, honest, agree: rendered === honest };
            })
            .filter((r) => !r.agree),
    };
    void EPS;
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
