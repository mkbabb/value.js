// SERVED MODEL: claude-opus-5-5
// X.W8.d — the bounded browser arms of G-8 (Dock.md G-B rendered-motion arm)
// and G-13 (the dock band's live chrome tint). One chromium, one context per
// scheme, everything closed in `finally`. Run through the guard:
//   ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/X/waves/W8-witness/probe-g8-g13.mjs <port>
import { chromium } from "@playwright/test";

const port = process.argv[2] ?? "9000";
const url = `http://localhost:${port}/#/`;
const out = { url, schemes: {} };

const browser = await chromium.launch({ headless: true });
try {
    for (const scheme of ["light", "dark"]) {
        const context = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            colorScheme: scheme,
        });
        try {
            const page = await context.newPage();
            const pageErrors = [];
            page.on("pageerror", (e) => pageErrors.push(String(e.message).slice(0, 200)));
            page.on("console", (m) => {
                if (m.type() === "error" && /useChromeAccentFn/.test(m.text())) pageErrors.push(m.text().slice(0, 200));
            });
            await page.goto(url, { waitUntil: "load" });
            const toggle = page.locator('[aria-label="Toggle action bar"]');
            await toggle.waitFor({ state: "visible", timeout: 30_000 });
            await page.waitForTimeout(1500); // boot settle (atmosphere + probe epoch)

            // ── G-13: the band's painted element and the certified ink ──
            const g13 = await page.evaluate(() => {
                const plate = document.querySelector(".dock-plate");
                const dock = document.querySelector(".glass-dock");
                const ink = document.querySelector('[data-o18="profile-trigger"], [data-o18="login-trigger"]')
                    ?? [...document.querySelectorAll(".glass-dock button, .glass-dock a")]
                        .find((b) => /^\s*(Login|Profile)\s*$/.test(b.textContent ?? ""));
                return {
                    darkClass: document.documentElement.classList.contains("dark"),
                    dockPlateBg: plate ? getComputedStyle(plate).backgroundColor : null,
                    glassDockBg: dock ? getComputedStyle(dock).backgroundColor : null,
                    inkHost: ink ? `${ink.tagName.toLowerCase()} "${ink.textContent?.trim()}"` : null,
                    inkInlineColor: ink ? ink.style.color || null : null,
                    inkComputedColor: ink ? getComputedStyle(ink).color : null,
                };
            });

            // ── G-8: actions ↔ input crossfade, sampled per frame ──
            await toggle.click();
            const open = page.locator('[aria-label="Open color input"]');
            await open.waitFor({ state: "visible", timeout: 10_000 });
            await page.waitForTimeout(600);
            const g8 = await page.evaluate(async () => {
                const btn = document.querySelector('[aria-label="Open color input"]');
                // The ActionBarLayer's own sub-layer crossfade (actions ↔ input):
                // the toggle sits beside it, so climb to the ancestor that holds it.
                let xf = null;
                for (let n = btn.parentElement; n && !xf; n = n.parentElement) {
                    xf = n.querySelector(":scope > .dock-crossfade.dock-layer-grid");
                }
                if (!xf) throw new Error("no ActionBarLayer crossfade beside the toggle");
                const faces = () => [...xf.querySelectorAll(":scope > .dock-face")];
                const read = () => faces().map((f) => {
                    const cs = getComputedStyle(f);
                    return {
                        id: f.getAttribute("data-face") ?? f.id ?? null,
                        cls: [...f.classList].filter((c) => c.startsWith("is-")).join(" ") || "-",
                        opacity: Number(cs.opacity),
                        transitionDuration: cs.transitionDuration,
                        crossfadingAncestor: f.closest("[data-crossfading]") !== null,
                    };
                });
                const t0 = performance.now();
                btn.click();
                const frames = [];
                let at60 = null;
                await new Promise((resolve) => {
                    const tick = () => {
                        const t = performance.now() - t0;
                        const sample = { t: +t.toFixed(1), faces: read() };
                        frames.push(sample);
                        if (at60 === null && t >= 60) at60 = sample;
                        if (t < 700) requestAnimationFrame(tick);
                        else resolve();
                    };
                    requestAnimationFrame(tick);
                });
                const extremeBoth = frames.filter((f) =>
                    f.faces.length >= 2
                    && f.faces.some((x) => x.cls.includes("is-leaving"))
                    && f.faces.every((x) => x.opacity === 0 || x.opacity === 1));
                // The motion window: first → last frame with a face strictly
                // between the extremes. A snap is an extreme frame INSIDE it;
                // the rest frame before and the settled frames after are the
                // endpoints of the motion, not a snap.
                const moving = (f) => f.faces.some((x) => x.opacity > 0 && x.opacity < 1);
                const first = frames.findIndex(moving);
                const last = frames.length - 1 - [...frames].reverse().findIndex(moving);
                const snapFramesInsideMotion = first < 0 ? null
                    : frames.slice(first, last + 1).filter((f) => !moving(f)).length;
                return {
                    at60,
                    motionWindowMs: first < 0 ? null : [frames[first].t, frames[last].t],
                    movingFrames: frames.filter(moving).length,
                    snapFramesInsideMotion,
                    frameCount: frames.length,
                    framesWithTwoFaces: frames.filter((f) => f.faces.length >= 2).length,
                    framesBothFacesAtExtremesWhileLeaving: extremeBoth.length,
                    extremeFrames: extremeBoth.map((f) => ({ t: f.t, faces: f.faces.map((x) => `${x.cls}@${x.opacity}${x.crossfadingAncestor ? "+xf" : ""}`) })),
                    firstFrames: frames.slice(0, 8),
                };
            });
            out.schemes[scheme] = { g13, g8, pageErrors };
            await page.close();
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
console.log(JSON.stringify(out, null, 2));
