import { webkit } from "playwright";

const URL = "http://localhost:9000/#/extract";

const MEASURE = () => {
    const out = {};
    const q = (s) => document.querySelector(s);
    const r = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), x: +b.x.toFixed(2), y: +b.y.toFixed(2) };
    };

    const rail = q('[data-o18="extract-k-rail"]');
    out.kRailDiv = r(rail);
    if (rail) {
        const cs = getComputedStyle(rail);
        out.kRailStyle = {
            backgroundImage: cs.backgroundImage.slice(0, 140),
            backgroundColor: cs.backgroundColor,
            boxShadow: cs.boxShadow,
            height: cs.height,
        };
    }

    const sliders = [...document.querySelectorAll(".glass-slider")];
    out.sliders = sliders.map((s) => {
        const track = s.querySelector(".slider-track");
        const thumb = s.querySelector(".slider-thumb");
        const cs = getComputedStyle(s);
        const tcs = track ? getComputedStyle(track) : null;
        return {
            ariaLabel: thumb?.getAttribute("aria-label") ?? s.getAttribute("aria-label"),
            size: s.getAttribute("data-size"),
            variant: s.getAttribute("data-variant"),
            disabledAttr: s.getAttribute("data-disabled"),
            trackRect: r(track),
            thumbRect: r(thumb),
            trackBgImage: tcs ? tcs.backgroundImage.slice(0, 100) : null,
            trackBgColor: tcs ? tcs.backgroundColor : null,
            thumbSizeVar: cs.getPropertyValue("--slider-thumb-size").trim(),
            trackHeightVar: cs.getPropertyValue("--slider-track-height").trim(),
        };
    });

    const kcRow = q('[data-o18="extract-kc"]')?.parentElement;
    out.rowSeparators = kcRow
        ? [...kcRow.querySelectorAll('[role="separator"], .dock-separator')].map((el) => {
              const cs = getComputedStyle(el);
              return {
                  cls: String(el.className),
                  role: el.getAttribute("role"),
                  ariaOrientation: el.getAttribute("aria-orientation"),
                  rect: r(el),
                  bg: cs.backgroundColor,
                  bgImage: cs.backgroundImage.slice(0, 60),
                  borderL: cs.borderLeftWidth + " / " + cs.borderLeftColor,
                  opacity: cs.opacity,
                  display: cs.display,
              };
          })
        : null;

    out.rowButtons = kcRow
        ? [...kcRow.querySelectorAll("button")].map((b) => ({
              title: b.getAttribute("title"),
              ariaLabel: b.getAttribute("aria-label"),
              ariaLabelledby: b.getAttribute("aria-labelledby"),
              text: b.textContent.trim(),
              disabled: b.disabled,
              rect: r(b),
          }))
        : null;

    const label = q('[data-o18="extract-kc"] label');
    out.kcLabelColor = label ? getComputedStyle(label).color : null;
    out.kcLabelRect = r(label);
    const readout = q('[data-o18="extract-kc"] span');
    out.kcReadoutRect = r(readout);
    out.kcReadoutStyle = readout
        ? {
              textAlign: getComputedStyle(readout).textAlign,
              width: getComputedStyle(readout).width,
              overflow: getComputedStyle(readout).overflow,
              scrollW: readout.scrollWidth,
              clientW: readout.clientWidth,
          }
        : null;

    out.inkMuted = getComputedStyle(document.documentElement).getPropertyValue("--ink-muted").trim();
    out.touchGateApplied = document.querySelectorAll(".touch-gate-target").length;
    return out;
};

async function run(label, ctxOpts, extra = {}) {
    const browser = await webkit.launch();
    const context = await browser.newContext(ctxOpts);
    const page = await context.newPage();
    if (extra.emulate) await page.emulateMedia(extra.emulate);
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    const data = await page.evaluate(MEASURE);
    console.log("##### " + label + " #####");
    console.log(JSON.stringify(data, null, 1));
    console.log();
    await browser.close();
}

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" };
const MOBILE = {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    colorScheme: "dark",
};

await run("DESKTOP-1440-light", DESKTOP);
await run("MOBILE-390-dark", MOBILE);
await run("DESKTOP-forced-colors", DESKTOP, { emulate: { forcedColors: "active" } });
