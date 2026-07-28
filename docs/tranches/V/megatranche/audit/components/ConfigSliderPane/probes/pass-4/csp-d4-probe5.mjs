// CHALLENGE-D pass 4 — probe 5: cross-engine title shrink + action-bar chrome stack
import { chromium, webkit } from "playwright";
const ENGINE = { chromium, webkit };

async function run(engineName, route, w, h, scheme, tag) {
    const browser = await ENGINE[engineName].launch();
    const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 3,
        colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:9000/${route}`, { waitUntil: "load" });
    await page.waitForTimeout(7000);

    const out = await page.evaluate(async () => {
        const r = {};
        const t = document.querySelector(".pane-header-title");
        const h = document.querySelector(".pane-header");
        const sc = document.querySelector(".pane-scroll-fade");
        r.rest = {
            titleFontSize: getComputedStyle(t).fontSize,
            titleTransform: getComputedStyle(t).transform,
            headerH: +h.getBoundingClientRect().height.toFixed(2),
        };
        if (sc && sc.scrollHeight > sc.clientHeight) {
            sc.scrollTop = 600;
            await new Promise((res) =>
                requestAnimationFrame(() => requestAnimationFrame(res))
            );
            const m = getComputedStyle(t).transform.match(/matrix\(([^,]+)/);
            r.scrolled = {
                scale: m ? +(+m[1]).toFixed(4) : null,
                effectivePx: m
                    ? +(+m[1] * parseFloat(getComputedStyle(t).fontSize)).toFixed(2)
                    : null,
                headerH: +h.getBoundingClientRect().height.toFixed(2),
            };
            sc.scrollTop = 0;
        } else {
            r.scrolled = { note: "no overflow at this viewport" };
        }
        // action bar chrome stack
        const bar = document.querySelector(".config-action-bar");
        if (bar) {
            const pick = (sel) => {
                const e = bar.querySelector(sel);
                if (!e) return null;
                const cs = getComputedStyle(e);
                const rr = e.getBoundingClientRect();
                return {
                    cls: e.className.toString().slice(0, 70),
                    rect: [
                        +rr.x.toFixed(1),
                        +rr.y.toFixed(1),
                        +rr.width.toFixed(1),
                        +rr.height.toFixed(1),
                    ],
                    bg: cs.backgroundColor,
                    radius: cs.borderRadius,
                    fontSize: cs.fontSize,
                    boxShadow: cs.boxShadow.slice(0, 70),
                    before: {
                        content: getComputedStyle(e, "::before").content,
                        bg: getComputedStyle(e, "::before").backgroundColor,
                        bgImage: getComputedStyle(e, "::before").backgroundImage.slice(0, 60),
                        inset: [
                            getComputedStyle(e, "::before").top,
                            getComputedStyle(e, "::before").right,
                            getComputedStyle(e, "::before").bottom,
                            getComputedStyle(e, "::before").left,
                        ].join("/"),
                        radius: getComputedStyle(e, "::before").borderRadius,
                    },
                    after: {
                        content: getComputedStyle(e, "::after").content,
                        bg: getComputedStyle(e, "::after").backgroundColor,
                        bgImage: getComputedStyle(e, "::after").backgroundImage.slice(0, 60),
                        radius: getComputedStyle(e, "::after").borderRadius,
                    },
                };
            };
            r.chrome = {
                bar: pick(":scope"),
                dock: pick(".glass-dock"),
                plate: pick(".dock-plate"),
                layer: pick(".dock-layer"),
                button: pick("button"),
            };
            r.barRect = bar.getBoundingClientRect().toJSON();
            r.buttonFontSizes = [...bar.querySelectorAll("button")].map(
                (b) => getComputedStyle(b).fontSize
            );
        }
        const st = document.querySelector(".config-section-title");
        r.sectionTitleFontSize = st ? getComputedStyle(st).fontSize : null;
        const lbl = document.querySelector(".configurator-row label");
        r.rowLabelFontSize = lbl ? getComputedStyle(lbl).fontSize : null;
        r.rootFontSize = getComputedStyle(document.documentElement).fontSize;
        return r;
    });

    if (out.barRect) {
        await page.screenshot({
            path: `csp-d4-${tag}-bar.png`,
            clip: {
                x: out.barRect.x,
                y: out.barRect.y,
                width: out.barRect.width,
                height: out.barRect.height,
            },
        });
    }
    console.log(`===== ${engineName} ${route} ${w}x${h} ${scheme} =====`);
    console.log(JSON.stringify(out, null, 1));
    await browser.close();
}
const [e, route, w, h, scheme, tag] = process.argv.slice(2);
await run(e, route, +w, +h, scheme, tag);
