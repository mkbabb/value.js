// SERVED MODEL: claude-opus-5-5
// X.W11.g13 (COHESION §0gx.4, INBOX O-114 :611) — value.js's dock first-expand-frame cell.
// O-114's defect: an edge-anchored collapsed dock lays out its FIRST expand frame at the final width,
// so a control moves under the pointer between pointerdown and pointerup and the click guard eats the click.
// Arms: 390 fine + 390 coarse (Dock.vue `:collapse` is false off desktop: read whether a pill ever exists);
// 1280 (idle-shut pill: per-rAF trace from the first morph frame, then a press held across the expand).
// usage: node first-expand-frame.mjs <origin>; one browser, one context per arm, closed in finally.
import { chromium } from "@playwright/test";

const origin = process.argv[2];
const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const out = { origin, arms: {} };
const box = (page) => page.evaluate(() => {
    const d = document.querySelector(".glass-dock");
    const r = d.getBoundingClientRect();
    return { x: r.x, w: r.width, right: r.right, cx: r.x + r.width / 2, collapsed: d.classList.contains("collapsed") };
});

// the dock idles shut only after a release (glass: DOCK_COLLAPSE_DELAY_MS after its last hover leaves).
async function idleShut(page) {
    const r = await page.evaluate(() => {
        const b = document.querySelector(".glass-dock").getBoundingClientRect();
        return { x: b.x + 3, y: b.y + b.height / 2 };
    });
    await page.mouse.move(r.x, r.y);
    await page.waitForTimeout(300);
    await page.mouse.move(2, 400);
    await page.waitForSelector(".glass-dock.collapsed", { timeout: 15000, state: "attached" });
    await page.waitForFunction(() => !document.querySelector(".glass-dock[data-morphing]"));
}

async function arm(name, opts, body) {
    const ctx = await browser.newContext(opts);
    try {
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e)));
        await page.goto(`${origin}/#/`);
        await page.waitForSelector(".glass-dock", { timeout: 60000 });
        await page.waitForTimeout(2500);
        out.arms[name] = { ...(await body(page)), pageerrors: errors };
    } finally {
        await ctx.close();
    }
}

try {
    for (const [name, opts] of [
        ["390-fine", { viewport: { width: 390, height: 844 } }],
        ["390-coarse", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }],
    ]) {
        await arm(name, opts, async (page) => {
            const before = await box(page);
            const b = await page.locator(".glass-dock").first().boundingBox();
            if (!opts.hasTouch) {
                await page.mouse.move(b.x + 3, b.y + b.height / 2);
                await page.waitForTimeout(300);
                await page.mouse.move(2, 200);
            }
            await page.waitForTimeout(5000); // past DOCK_COLLAPSE_DELAY_MS (3600)
            const after = await box(page);
            return {
                pillEver: before.collapsed || after.collapsed,
                before,
                after,
                overflowRight: after.right > 390,
                inViewport: after.x >= 0 && after.right <= 390,
            };
        });
    }

    await arm("1280", { viewport: { width: 1280, height: 800 } }, async (page) => {
        await idleShut(page);
        const rest = await box(page);
        const trace = page.evaluate(() => new Promise((res) => {
            const d = document.querySelector(".glass-dock");
            const frames = [];
            const t0 = performance.now();
            let seen = false;
            const tick = () => {
                const r = d.getBoundingClientRect();
                const m = d.hasAttribute("data-morphing");
                seen ||= m;
                frames.push({ t: Math.round(performance.now() - t0), x: +r.x.toFixed(2), w: +r.width.toFixed(2), m });
                if ((seen && !m) || performance.now() - t0 > 6000) return res(frames);
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }));
        await page.waitForTimeout(30);
        const px = rest.cx, py = await page.evaluate(() => {
            const r = document.querySelector(".glass-dock").getBoundingClientRect();
            return r.y + r.height / 2;
        });
        await page.mouse.move(px, py);
        const frames = await trace;
        const morph = frames.filter((f) => f.m);
        const first = morph[0];
        const cxs = morph.map((f) => f.x + f.w / 2);
        const expanded = await box(page);

        // the O-114 press: from the idle pill, press at the pill's centre the moment the pointer arrives,
        // hold past the expand's start, release; the guard must not discard it (the dock stays usable).
        await idleShut(page);
        await page.evaluate(() => {
            window.__press = [];
            for (const k of ["pointerdown", "pointerup", "click"]) {
                window.addEventListener(k, (e) => {
                    const c = e.target.closest?.("button,[role=combobox],[role=button]") ?? e.target;
                    const r = c.getBoundingClientRect?.();
                    window.__press.push({ k, tag: c.getAttribute?.("aria-label") ?? c.className?.toString().slice(0, 40), x: r && +r.x.toFixed(1) });
                }, true);
            }
        });
        await page.mouse.move(px, py);
        await page.mouse.down();
        await page.waitForTimeout(120);
        await page.mouse.up();
        await page.waitForFunction(() => !document.querySelector(".glass-dock[data-morphing]"));
        await page.waitForTimeout(200);
        const press = await page.evaluate(() => window.__press);
        const afterPress = await box(page);

        // a real control click on the expanded dock (the probe reads what the press left, never assumes it)
        const dockControls = await page.evaluate(() =>
            [...document.querySelectorAll(".glass-dock button, .glass-dock [role=combobox]")]
                .filter((e) => e.getBoundingClientRect().width > 0)
                .map((e) => e.getAttribute("aria-label") ?? e.textContent.trim().slice(0, 24)));
        const combo = page.locator('.glass-dock [role=combobox]').first();
        let before = null, during = null, listbox = 0;
        if (await combo.count()) {
            before = await combo.boundingBox();
            if (before) {
                await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
                await page.mouse.down();
                await page.waitForTimeout(80);
                during = await combo.boundingBox();
                await page.mouse.up();
                await page.waitForTimeout(400);
                listbox = await page.getByRole("listbox").count();
            }
        }

        return {
            rest,
            expanded,
            firstMorphFrame: first,
            firstFrameWidthDeltaFromRest: first ? +(first.w - rest.w).toFixed(2) : null,
            finalWidthDeltaFromRest: +(expanded.w - rest.w).toFixed(2),
            centreDriftAcrossMorphPx: cxs.length ? +(Math.max(...cxs) - Math.min(...cxs)).toFixed(2) : null,
            morphFrames: morph.length,
            framesHead: morph.slice(0, 6),
            press,
            afterPress,
            dockControls,
            controlMovedDuringPressPx: before && during ? +Math.abs(during.x - before.x).toFixed(2) : null,
            listboxOpened: listbox > 0,
        };
    });
} finally {
    await browser.close();
}
console.log(JSON.stringify(out, null, 1));
