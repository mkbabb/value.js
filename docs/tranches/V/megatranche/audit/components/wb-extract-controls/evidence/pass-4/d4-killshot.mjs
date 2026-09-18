import { webkit } from "playwright";
const URL = "http://localhost:9000/#/extract";

const browser = await webkit.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(3500);

// KILL-SHOT: does --slider-track-bg accept a linear-gradient()? If yes, the
// decoy rail div + transparent-track override is entirely unnecessary.
const k1 = await page.evaluate(() => {
    const s = [...document.querySelectorAll(".glass-slider")][0];
    const track = s.querySelector(".slider-track");
    const before = getComputedStyle(track).backgroundImage;
    s.style.setProperty(
        "--slider-track-bg",
        "linear-gradient(90deg, rgb(255,0,0) 0%, rgb(0,255,0) 50%, rgb(0,0,255) 100%)",
    );
    const after = getComputedStyle(track).backgroundImage;
    return {
        before,
        after,
        acceptsGradient: after.includes("gradient"),
        trackRect: track.getBoundingClientRect().toJSON(),
    };
});
console.log("=== KILL-SHOT 1: --slider-track-bg accepts a gradient ===");
console.log(JSON.stringify(k1, null, 1));

await page.screenshot({
    path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/WBEC-D4-gradient-in-trackbg.png",
    clip: { x: 210, y: 470, width: 500, height: 110 },
});

// KILL-SHOT 2: identical rects — decoy div vs real track
const k2 = await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const track = [...document.querySelectorAll(".glass-slider")][0].querySelector(".slider-track");
    const a = rail.getBoundingClientRect(),
        b = track.getBoundingClientRect();
    return {
        decoyDiv: { x: a.x, y: a.y, w: a.width, h: a.height },
        realTrack: { x: b.x, y: b.y, w: b.width, h: b.height },
        deltaPx: {
            x: +(a.x - b.x).toFixed(3),
            y: +(a.y - b.y).toFixed(3),
            w: +(a.width - b.width).toFixed(3),
            h: +(a.height - b.height).toFixed(3),
        },
    };
});
console.log("\n=== KILL-SHOT 2: decoy div rect vs real track rect ===");
console.log(JSON.stringify(k2, null, 1));

// KILL-SHOT 3: type roles + contrast of the two readouts
const k3 = await page.evaluate(() => {
    const g = (c) => {
        const m = document.createElement("canvas").getContext("2d");
        m.fillStyle = c;
        const h = m.fillStyle;
        return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
    };
    const lin = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    const L = (c) => {
        const [r, gg, b] = g(c).map(lin);
        return 0.2126 * r + 0.7152 * gg + 0.0722 * b;
    };
    const ratio = (a, b) => {
        const [x, y] = [L(a), L(b)].sort((p, q) => q - p);
        return +((x + 0.05) / (y + 0.05)).toFixed(2);
    };
    const kc = document.querySelector('[data-o18="extract-kc"]');
    const kLabel = document.querySelector("label.text-mono-small.plate-ink");
    const kcLabel = kc.querySelector("label");
    const spans = [...kc.querySelectorAll("span")];
    const readout = spans[spans.length - 1];
    let el = kc,
        ground = null;
    while (el && el !== document.body) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)") {
            ground = { node: el.tagName + "." + String(el.className).slice(0, 50), bg };
            break;
        }
        el = el.parentElement;
    }
    const desc = (e) =>
        e
            ? {
                  text: e.textContent.trim(),
                  fontFamily: getComputedStyle(e).fontFamily.split(",")[0],
                  fontSize: getComputedStyle(e).fontSize,
                  fontWeight: getComputedStyle(e).fontWeight,
                  color: getComputedStyle(e).color,
                  width: getComputedStyle(e).width,
                  textAlign: getComputedStyle(e).textAlign,
                  scrollW: e.scrollWidth,
                  clientW: e.clientWidth,
                  overflowsBox: e.scrollWidth > e.clientWidth,
              }
            : null;
    return {
        ground,
        kLabel: desc(kLabel),
        kcLabel: desc(kcLabel),
        kcReadout: desc(readout),
        contrast: ground
            ? {
                  kLabel: ratio(getComputedStyle(kLabel).color, ground.bg),
                  kcLabel: ratio(getComputedStyle(kcLabel).color, ground.bg),
                  kcReadout: ratio(getComputedStyle(readout).color, ground.bg),
              }
            : null,
    };
});
console.log("\n=== KILL-SHOT 3: the three text atoms ===");
console.log(JSON.stringify(k3, null, 1));

await browser.close();
