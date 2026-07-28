// CHALLENGE-D pass 4 — probe 6: exact-box button captures + backdrop-filter stack census
import { chromium, webkit } from "playwright";
const ENGINE = { chromium, webkit };

async function run(engineName, route, w, h, scheme, tag) {
    const browser = await ENGINE[engineName].launch();
    const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 4,
        colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:9000/${route}`, { waitUntil: "load" });
    await page.waitForTimeout(7000);

    const info = await page.evaluate(() => {
        const bar = document.querySelector(".config-action-bar");
        if (!bar) return null;
        const btn = bar.querySelector("button");
        const r = btn.getBoundingClientRect();
        // backdrop-filter stack from the button up to <body>
        const stack = [];
        let e = btn;
        while (e && e !== document.documentElement) {
            const cs = getComputedStyle(e);
            const bf = cs.backdropFilter || cs.webkitBackdropFilter;
            if (bf && bf !== "none")
                stack.push({
                    cls: (e.className?.toString?.() || e.tagName).slice(0, 60),
                    backdropFilter: bf,
                    bg: cs.backgroundColor,
                    radius: cs.borderRadius,
                    rect: [
                        +e.getBoundingClientRect().x.toFixed(1),
                        +e.getBoundingClientRect().width.toFixed(1),
                        +e.getBoundingClientRect().height.toFixed(1),
                    ],
                });
            // pseudo elements too
            for (const p of ["::before", "::after"]) {
                const pc = getComputedStyle(e, p);
                const pbf = pc.backdropFilter || pc.webkitBackdropFilter;
                if (pbf && pbf !== "none")
                    stack.push({
                        cls: (e.className?.toString?.() || e.tagName).slice(0, 50) + p,
                        backdropFilter: pbf,
                        bg: pc.backgroundColor,
                        radius: pc.borderRadius,
                        rect: null,
                    });
            }
            e = e.parentElement;
        }
        return {
            buttonRect: r.toJSON(),
            buttonText: btn.textContent.trim(),
            backdropStack: stack,
        };
    });
    if (info) {
        await page.screenshot({
            path: `csp-d4-${tag}-btnbox.png`,
            clip: {
                x: info.buttonRect.x,
                y: info.buttonRect.y,
                width: info.buttonRect.width,
                height: info.buttonRect.height,
            },
        });
    }
    console.log(`===== ${engineName} ${route} ${w}x${h} ${scheme} =====`);
    console.log(JSON.stringify(info, null, 1));
    await browser.close();
}
const [e, route, w, h, scheme, tag] = process.argv.slice(2);
await run(e, route, +w, +h, scheme, tag);
