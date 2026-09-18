// CHALLENGE-D · ExtractWorkbench — geometry / material / state probe.
// WebKit (Safari engine). Read-only: navigates, measures, screenshots. No app mutation.
//
// Closes the evidence gap left by visual/states.mjs, whose ROUTES list
// (["#/","#/gradient","#/browse","#/blob","#/admin/users"]) never includes #/extract —
// so zoom-200 / reduced-motion / forced-colors / RTL / keyboard-focus have NO prior
// capture for this component.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "frames");
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9000";
const ROUTE = "/#/extract";

const MATRIX = [
    { id: "desk-light", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
    { id: "desk-dark", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
    { id: "mobile-light", ctx: { ...devices["iPhone 14"], colorScheme: "light" } },
    { id: "zoom-200", ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, colorScheme: "light" } },
    { id: "zoom-400", ctx: { viewport: { width: 360, height: 450 }, deviceScaleFactor: 4, colorScheme: "light" } },
    { id: "forced-colors", ctx: { viewport: { width: 1440, height: 900 }, forcedColors: "active", colorScheme: "light" } },
    { id: "reduced-motion", ctx: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", colorScheme: "light" } },
    { id: "rtl-desk", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" }, rtl: true },
];

const MEASURE = () => {
    const R = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
    };
    const cs = (el, p) => (el ? getComputedStyle(el).getPropertyValue(p).trim() : null);
    const q = (s) => document.querySelector(s);
    const de = document.documentElement;

    const pane = [...document.querySelectorAll("[data-slot='card'],.card,[class*='rounded-card']")]
        .find((e) => e.textContent.includes("Pull palettes from any image"));
    const drop = [...document.querySelectorAll("[role='button']")].find((e) =>
        (e.getAttribute("aria-label") || "").startsWith("Upload image"));
    const ghost = q("[data-slot='shadow-palette']");
    const kRail = q("[data-o18='extract-k-rail']");
    const kcWrap = q("[data-o18='extract-kc']");
    const sliders = [...document.querySelectorAll("[role='slider'],[data-slot='slider-thumb'],span[aria-label]")]
        .filter((e) => ["Number of colors", "Chroma weight"].includes(e.getAttribute("aria-label")));
    const tracks = [...document.querySelectorAll("[data-slot='slider-track'],.slider-track")];
    const caption = [...document.querySelectorAll("p")].find((e) => /undeveloped plate/i.test(e.textContent));

    // every button / role=button in the extract pane
    const btns = pane
        ? [...pane.querySelectorAll("button,[role='button']")].map((b) => {
              const r = b.getBoundingClientRect();
              return {
                  tag: b.tagName.toLowerCase(),
                  title: b.getAttribute("title"),
                  ariaLabel: b.getAttribute("aria-label"),
                  ariaLabelledby: b.getAttribute("aria-labelledby"),
                  text: b.textContent.trim().slice(0, 30),
                  w: +r.width.toFixed(1),
                  h: +r.height.toFixed(1),
                  named: !!(b.getAttribute("aria-label") || b.getAttribute("aria-labelledby") || b.textContent.trim()),
                  cls: String(b.className).split(/\s+/).slice(0, 3).join("."),
              };
          })
        : [];

    const segs = [...document.querySelectorAll(".shadow-seg")];
    const swatches = [...document.querySelectorAll(".shadow-swatch")];

    return {
        vw: de.clientWidth,
        overflowX: de.scrollWidth - de.clientWidth,
        dir: de.getAttribute("dir"),
        rects: {
            pane: R(pane),
            dropZone: R(drop),
            ghost: R(ghost),
            kRail: R(kRail),
            kcWrap: R(kcWrap),
            caption: R(caption),
            thumbs: sliders.map((s) => ({ label: s.getAttribute("aria-label"), ...R(s) })),
            tracks: tracks.map((t) => R(t)),
            seg0: R(segs[0]),
            swatch0: R(swatches[0]),
        },
        captionLines: caption
            ? Math.round(caption.getBoundingClientRect().height / parseFloat(getComputedStyle(caption).lineHeight))
            : null,
        colors: {
            paneBg: cs(pane, "background-color"),
            ghostBg: cs(ghost, "background-color"),
            ghostBorder: cs(ghost, "border-top-color"),
            ghostShadow: cs(ghost, "box-shadow"),
            segBg: cs(segs[0], "background-color"),
            swatchBg: cs(swatches[0], "background-color"),
            skeletonInk: ghost ? getComputedStyle(ghost).getPropertyValue("--skeleton-ink").trim() : null,
            dropBorder: cs(drop, "border-top-color"),
            dropBg: cs(drop, "background-color"),
            kRailBg: cs(kRail, "background-color"),
            kRailShadow: cs(kRail, "box-shadow"),
            kcTrackBg: kcWrap ? cs(kcWrap.querySelector("[data-slot='slider-track'],.slider-track,span"), "background-color") : null,
            captionColor: cs(caption, "color"),
            inkMuted: getComputedStyle(de).getPropertyValue("--ink-muted").trim(),
            wellBg: getComputedStyle(de).getPropertyValue("--well-bg").trim(),
        },
        buttons: btns,
        nameless: btns.filter((b) => !b.named).map((b) => b.title || b.cls),
        animCount: document.getAnimations ? document.getAnimations().length : -1,
        pulsing: document.getAnimations
            ? document.getAnimations().filter((a) => a.playState === "running").length
            : -1,
    };
};

const rows = [];
const browser = await webkit.launch();
for (const m of MATRIX) {
    const context = await browser.newContext(m.ctx);
    const page = await context.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
    await page.goto(ORIGIN + ROUTE, { waitUntil: "networkidle", timeout: 45000 }).catch((e) => errs.push("nav:" + e));
    await page.waitForTimeout(2500);
    if (m.rtl) {
        await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await page.waitForTimeout(1200);
    }
    const probe = await page.evaluate(MEASURE).catch((e) => ({ err: String(e).slice(0, 300) }));
    await page.screenshot({ path: resolve(OUT, `${m.id}.png`), fullPage: true }).catch(() => {});
    rows.push({ matrix: m.id, ...probe, pageErrors: errs });
    console.log(
        `\n=== ${m.id} vw=${probe.vw} overflowX=${probe.overflowX} err=${errs.length} anims=${probe.animCount}`,
    );
    console.log("  rects:", JSON.stringify(probe.rects));
    console.log("  colors:", JSON.stringify(probe.colors));
    console.log("  nameless:", JSON.stringify(probe.nameless), " captionLines=", probe.captionLines);
    await page.close();
    await context.close();
}
await browser.close();
writeFileSync(resolve(HERE, "probe-D-geometry.json"), JSON.stringify(rows, null, 1));
console.log("\nwrote probe-D-geometry.json");
