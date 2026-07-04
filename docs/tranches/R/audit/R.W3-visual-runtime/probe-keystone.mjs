#!/usr/bin/env node
/**
 * R.W3 gate-(f) keystone probe — authored FRESH (the W0-2 .w6a scratch stays dead).
 *
 * A computed-truth (CSSOM + measured-rect) probe driving the BUILT demo,
 * asserting the Lane-A keystone truths. Born-RED pre-wave; GREEN post-wave.
 *
 *   K1 — font root:   document.fonts.check('16px "Fraunces"') is true AND a
 *        `.font-display` UTILITY probe element's computed font-family resolves
 *        Fraunces FIRST AND the SOURCE token `--font-stack-display` resolves
 *        Fraunces (pre-wave it aliases var(--font-stack-text) → Jakarta — the
 *        split-brain: the demo's dead `@theme --font-display` var says Fraunces
 *        while glass-ui's own display rungs ride the un-cured stack source)
 *        AND a REAL Plus Jakarta Sans face is loaded (pre-wave the corpus
 *        `@mkbabb/glass-ui/styles/fonts` is un-imported: only the metric
 *        "Plus Jakarta Sans Fallback" face ships — body text paints system-ui).
 *   K2 — accent axis:  `--accent-live` exists on :root, resolves to a CHROMATIC
 *        color (rgb channel spread ≥ 8) that differs from resolved --foreground,
 *        AND computed `--primary` is chromatic in the LIGHT scheme (pre-wave the
 *        inherited light arm is byte-identical to --foreground → ink → RED).
 *   K3 — container clamp: `--pane-max` is minted, the `.pane-container` computed
 *        max-width at 1440×900 ≥ 1200px (pre-wave cap ≈ 1008px), zero
 *        `lg:max-w-desktop-pane` self-clamps survive in the DOM, and the picker
 *        pane shell's measured width ≥ 560px (pre-wave frozen at ≤ 480px).
 *
 * Usage: node probe-keystone.mjs [baseURL]   (default http://localhost:4179)
 * Exit 0 = all GREEN · exit 1 = any RED.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:4179";
const results = [];
const record = (id, pass, detail) => {
    results.push({ id, pass, detail });
    console.log(`${pass ? "GREEN" : "RED  "}  ${id}  ${detail}`);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
});
await ctx.addInitScript(() => {
    try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {}
});
const page = await ctx.newPage();
await page.goto(`${BASE}/#/picker`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);

const probe = await page.evaluate(() => {
    const root = document.documentElement;
    const rootStyle = getComputedStyle(root);

    // resolve an arbitrary CSS <color> through a live probe element
    const resolve = (cssColor) => {
        const el = document.createElement("div");
        el.style.color = cssColor;
        el.style.display = "none";
        document.body.appendChild(el);
        const out = getComputedStyle(el).color;
        el.remove();
        return out;
    };
    const rgb = (s) => {
        const m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
        return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
    };
    const spread = (c) => (c ? Math.max(...c) - Math.min(...c) : 0);

    // K1 — the .font-display UTILITY (not the runtime var)
    const fd = document.createElement("div");
    fd.className = "font-display";
    fd.textContent = "K1";
    document.body.appendChild(fd);
    const fdFamily = getComputedStyle(fd).fontFamily;
    fd.remove();
    const frauncesLoaded = document.fonts.check('16px "Fraunces"');
    const firstFamily = (fdFamily.split(",")[0] ?? "").trim().replace(/^["']|["']$/g, "");
    const stackDisplayRaw = rootStyle.getPropertyValue("--font-stack-display").trim();
    // resolve the source token through a probe element so var()-aliasing collapses
    const sd = document.createElement("div");
    sd.style.fontFamily = "var(--font-stack-display)";
    sd.style.display = "none";
    document.body.appendChild(sd);
    const stackDisplayResolved = getComputedStyle(sd).fontFamily;
    sd.remove();
    const stackDisplayFirst = (stackDisplayResolved.split(",")[0] ?? "")
        .trim()
        .replace(/^["']|["']$/g, "");
    const jakartaReal = document.fonts.check('16px "Plus Jakarta Sans"');

    // K2 — the accent axis
    const accentLiveRaw = rootStyle.getPropertyValue("--accent-live").trim();
    const accentResolved = accentLiveRaw ? resolve(accentLiveRaw) : "";
    const fgResolved = resolve(rootStyle.getPropertyValue("--foreground").trim() || "canvastext");
    const primaryResolved = resolve(rootStyle.getPropertyValue("--primary").trim() || "transparent");

    // K3 — the container clamp
    const paneMax = rootStyle.getPropertyValue("--pane-max").trim();
    const container = document.querySelector(".pane-container");
    const containerMaxW = container ? getComputedStyle(container).maxWidth : "";
    const selfClamps = document.querySelectorAll('[class*="lg:max-w-desktop-pane"]').length;
    const shell = document.querySelector(".pane-shell") ?? document.querySelector(".pane-wrapper > *");
    const shellW = shell ? shell.getBoundingClientRect().width : 0;

    return {
        fdFamily, firstFamily, frauncesLoaded,
        stackDisplayRaw, stackDisplayFirst, jakartaReal,
        accentLiveRaw, accentResolved,
        accentRgb: rgb(accentResolved), fgRgb: rgb(fgResolved), primaryRgb: rgb(primaryResolved),
        accentSpread: spread(rgb(accentResolved)),
        primarySpread: spread(rgb(primaryResolved)),
        paneMax, containerMaxW, selfClamps, shellW,
    };
});

// K1
record(
    "K1-font-root",
    probe.frauncesLoaded &&
        probe.firstFamily === "Fraunces" &&
        probe.stackDisplayFirst === "Fraunces" &&
        probe.jakartaReal,
    `fonts.check(Fraunces)=${probe.frauncesLoaded} · .font-display=[${probe.fdFamily}] · --font-stack-display→[${probe.stackDisplayFirst || "(unset)"}] · realJakarta=${probe.jakartaReal}`,
);

// K2
const accentExists = probe.accentLiveRaw.length > 0;
const accentChromatic = probe.accentSpread >= 8;
const accentNotInk =
    probe.accentRgb && probe.fgRgb
        ? probe.accentRgb.join() !== probe.fgRgb.join()
        : false;
const primaryChromatic = probe.primarySpread >= 8;
record(
    "K2-accent-axis",
    accentExists && accentChromatic && accentNotInk && primaryChromatic,
    `--accent-live="${probe.accentLiveRaw || "(absent)"}" → ${probe.accentResolved || "n/a"} (spread ${probe.accentSpread}) · --primary → spread ${probe.primarySpread}`,
);

// K3
const maxWpx = parseFloat(probe.containerMaxW) || 0;
record(
    "K3-container-clamp",
    probe.paneMax.length > 0 && maxWpx >= 1200 && probe.selfClamps === 0 && probe.shellW >= 560,
    `--pane-max="${probe.paneMax || "(absent)"}" · container max-width=${probe.containerMaxW} · self-clamps=${probe.selfClamps} · shell width=${Math.round(probe.shellW)}px`,
);

await browser.close();
const red = results.filter((r) => !r.pass);
console.log(red.length === 0 ? "\nPROBE: ALL GREEN" : `\nPROBE: ${red.length}/3 RED`);
process.exit(red.length === 0 ? 0 : 1);
