// CHALLENGE-D pass 4 — probe 4: the veil transmission number + the mobile action bar chrome
import { webkit, chromium } from "playwright";
const ENGINE = { webkit, chromium };

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

    const info = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        const out = {};
        out.tokens = {
            glassBgResting: root.getPropertyValue("--glass-bg-resting").trim(),
            glassBlurResting: root.getPropertyValue("--glass-blur-resting").trim(),
            typeDisplay1: root.getPropertyValue("--type-display-1").trim(),
            typeHeading: root.getPropertyValue("--type-heading").trim(),
            dockTouchTarget: root.getPropertyValue("--dock-touch-target").trim(),
        };
        const h = document.querySelector(".pane-header");
        if (h) {
            const b = getComputedStyle(h, "::before");
            out.veil = {
                background: b.background.slice(0, 120),
                backgroundColor: b.backgroundColor,
                opacity: b.opacity,
                backdropFilter: b.backdropFilter,
                maskImage: b.maskImage.slice(0, 90),
                headerH: +h.getBoundingClientRect().height.toFixed(1),
            };
            const t = document.querySelector(".pane-header-title");
            out.title = {
                fontSize: getComputedStyle(t).fontSize,
                rect: t.getBoundingClientRect().toJSON(),
                shrinkRatio: getComputedStyle(h)
                    .getPropertyValue("--pane-title-shrink-ratio")
                    .trim(),
            };
        }
        const sc = document.querySelector(".pane-scroll-fade");
        const con = document.querySelector(".config-console");
        if (sc && con) {
            const rows = con.querySelectorAll(".configurator-row");
            out.pane = {
                scrollH: sc.scrollHeight,
                clientH: sc.clientHeight,
                rowCount: rows.length,
                rowH: rows[0] ? +rows[0].getBoundingClientRect().height.toFixed(1) : null,
                rowsUnderHeaderBand:
                    rows[0] && out.veil
                        ? +(out.veil.headerH / rows[0].getBoundingClientRect().height).toFixed(2)
                        : null,
                paneH: +sc.parentElement.getBoundingClientRect().height.toFixed(1),
                headerShareOfPane: out.veil
                    ? +(
                          (out.veil.headerH /
                              sc.parentElement.getBoundingClientRect().height) *
                          100
                      ).toFixed(1)
                    : null,
            };
        }
        const bar = document.querySelector(".config-action-bar");
        if (bar) {
            const r = bar.getBoundingClientRect();
            out.bar = { rect: r.toJSON(), h: +r.height.toFixed(1) };
            const layers = [...bar.querySelectorAll("*")].map((e) => {
                const cs = getComputedStyle(e);
                const rr = e.getBoundingClientRect();
                return {
                    tag: e.tagName,
                    cls: (e.className?.toString?.() || "").slice(0, 60),
                    rect: [
                        +rr.x.toFixed(1),
                        +rr.y.toFixed(1),
                        +rr.width.toFixed(1),
                        +rr.height.toFixed(1),
                    ],
                    bg: cs.backgroundColor,
                    bgImage: cs.backgroundImage.slice(0, 60),
                    radius: cs.borderRadius,
                    fontSize: cs.fontSize,
                    overflow: cs.overflow,
                };
            });
            out.barLayers = layers;
        }
        return out;
    });

    if (info.bar) {
        await page.screenshot({
            path: `csp-d4-${tag}-actionbar.png`,
            clip: {
                x: Math.max(0, info.bar.rect.x),
                y: Math.max(0, info.bar.rect.y - 4),
                width: Math.min(w, info.bar.rect.width),
                height: Math.min(h, info.bar.rect.height + 8),
            },
        });
    }
    console.log(`===== ${engineName} ${route} ${w}x${h} ${scheme} =====`);
    console.log(JSON.stringify(info, null, 1));
    await browser.close();
}
const [engineName, route, w, h, scheme, tag] = process.argv.slice(2);
await run(engineName, route, +w, +h, scheme, tag);
