// SS-8 B02 probe 1 — ComponentSliders live witnesses (R-1, R-2, R-5, coarse thumb/row box, R-4 sweep, R-3 forced colors).
// Headless Chromium, ONE browser, a NEW context per cell, closed in finally.
// Run: ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/b02-p1-sliders.mjs
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EV = resolve(HERE, "../evidence/B02-picker-sliders-debug");
mkdirSync(EV, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:9000/";
const out = { base: BASE, at: new Date().toISOString(), cells: {} };

async function boot(page, hash = "#/") {
    await page.goto(BASE + hash, { waitUntil: "load" });
    await page.waitForSelector(".sliders-console .channel-slider", { timeout: 30000 });
    await page.waitForTimeout(1200);
}

const sliderState = (page, i = 0) =>
    page.evaluate((i) => {
        const roots = [...document.querySelectorAll(".sliders-console .channel-slider")];
        const r = roots[i];
        const thumb = r.querySelector('[role="slider"]');
        const rect = r.getBoundingClientRect();
        return {
            n: roots.length,
            label: thumb?.getAttribute("aria-label"),
            valuenow: thumb?.getAttribute("aria-valuenow"),
            meter: r.closest(".channel-strip")?.querySelector(".channel-meter")?.textContent,
            rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
            ontouchstart: "ontouchstart" in window,
            coarse: matchMedia("(pointer: coarse)").matches,
            anyCoarse: matchMedia("(any-pointer: coarse)").matches,
            gateActive: r.closest(".touch-gate-target")?.classList.contains("touch-gate-active"),
        };
    }, i);

const cells = {
    // R-1: two-arm click differential — plain desktop vs touch-capable desktop, MOUSE clicks.
    async r1_plainDesktop(browser) {
        return r1Arm(browser, { viewport: { width: 1440, height: 900 }, hasTouch: false });
    },
    async r1_touchCapableDesktop(browser) {
        return r1Arm(browser, { viewport: { width: 1440, height: 900 }, hasTouch: true });
    },
    // R-2 cold: same-space none deep link.
    async r2_cold_none_link(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            const errs = [];
            page.on("pageerror", (e) => errs.push(String(e.message).slice(0, 200)));
            page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 200)));
            await page.goto(BASE + "#/?space=rgb&color=rgb(none%2050%2050)", { waitUntil: "load" });
            await page.waitForTimeout(5000);
            const r = await page.evaluate(() => ({
                appInnerTextLen: (document.querySelector("#app")?.innerText ?? "").length,
                hasConsole: !!document.querySelector(".sliders-console"),
                hasAlert: !!document.querySelector('[role="alert"]'),
                alertText: document.querySelector('[role="alert"]')?.textContent?.slice(0, 200),
                hash: location.hash,
                bodyBg: getComputedStyle(document.body).backgroundColor,
            }));
            await page.screenshot({ path: `${EV}/r2-cold-none-1440-light.png` });
            return { ...r, errs: errs.slice(0, 12), errCount: errs.length };
        } finally { await ctx.close(); }
    },
    // R-2 warm: commit a none colour after boot, then probe recovery (wedged vs re-throw per read).
    async r2_warm_none(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            const errs = [];
            page.on("pageerror", (e) => errs.push("pageerror: " + String(e.message).slice(0, 140)));
            page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 140)));
            await boot(page, "#/?space=rgb&color=rgb(200%2050%2050)");
            const snap = async (tag) => {
                const e = errs.length;
                const r = await page.evaluate(() => ({
                    hasConsole: !!document.querySelector(".sliders-console"),
                    alerts: [...document.querySelectorAll('[role="alert"]')].map((a) => a.textContent.trim().slice(0, 90)),
                    meters: [...document.querySelectorAll(".sliders-console .channel-meter")].map((m) => m.textContent),
                    hash: decodeURIComponent(location.hash),
                }));
                return { tag, ...r, errsSoFar: e };
            };
            const steps = [await snap("boot")];
            await page.evaluate(() => { location.hash = "#/?space=rgb&color=rgb(none%2050%2050)"; });
            await page.waitForTimeout(1500);
            steps.push(await snap("after-none-commit"));
            await page.evaluate(() => { location.hash = "#/?space=rgb&color=rgb(20%20180%2090)"; });
            await page.waitForTimeout(1500);
            steps.push(await snap("after-valid-commit"));
            await page.mouse.move(700, 600); await page.waitForTimeout(400);
            steps.push(await snap("after-pointer-move"));
            const tryAgain = page.getByRole("button", { name: /try again/i });
            const nTry = await tryAgain.count();
            for (let i = 0; i < nTry; i++) { await tryAgain.first().click().catch(() => {}); await page.waitForTimeout(800); }
            steps.push({ ...(await snap("after-try-again")), tryAgainClicked: nTry });
            await page.screenshot({ path: `${EV}/r2-warm-final-1440-light.png` });
            return { steps, errTotal: errs.length, errSample: [...new Set(errs)].slice(0, 8) };
        } finally { await ctx.close(); }
    },
    async r3_baseline_unforced(browser) {
        return forced(browser, { viewport: { width: 1440, height: 900 } }, "nofc-rest-1440", false);
    },
    // R-5: wrapper-map retention after 8 space switches.
    async r5_retention(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await boot(page, "#/?space=rgb");
            const spaces = ["hsl", "hsv", "hwb", "lab", "lch", "oklab", "oklch", "xyz"];
            const seen = [];
            for (const sp of spaces) {
                await page.evaluate((sp) => {
                    const u = new URLSearchParams(location.hash.split("?")[1] ?? "");
                    u.set("space", sp);
                    location.hash = "#/?" + u.toString();
                }, sp);
                await page.waitForTimeout(900);
                seen.push(await page.evaluate(() => [...document.querySelectorAll(".sliders-console [role=slider]")].map((t) => t.getAttribute("aria-label")).join(",")));
            }
            const census = await page.evaluate(() => {
                let inst = document.querySelector(".sliders-console")?.__vueParentComponent;
                while (inst && inst.type?.__name !== "ComponentSliders") inst = inst.parent;
                if (!inst) return { error: "ComponentSliders instance not found" };
                const map = inst.setupState.sliderWrapperEls;
                const keys = Object.keys(map);
                return { mapKeys: keys.length, detached: keys.filter((k) => !map[k].isConnected).length, keys, connected: keys.filter((k) => map[k].isConnected) };
            });
            return { spaces, seen, census };
        } finally { await ctx.close(); }
    },
    // Items 4/5: coarse thumb height + mobile row box at 390x844 (touch, coarse).
    async geom_mobile(browser) {
        return geom(browser, { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 }, "mobile-390");
    },
    async geom_desktop(browser) {
        return geom(browser, { viewport: { width: 1440, height: 900 } }, "desktop-1440");
    },
    // R-4: viewport sweep of the container width + clamp outputs.
    async r4_sweep(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await boot(page);
            const rows = [];
            for (let w = 360; w <= 1920; w += 20) {
                await page.setViewportSize({ width: w, height: 900 });
                await page.waitForTimeout(250);
                rows.push(await page.evaluate((w) => {
                    const rowsEl = document.querySelector(".sliders-console .channel-rows");
                    let c = rowsEl?.parentElement;
                    while (c && getComputedStyle(c).containerType === "normal") c = c.parentElement;
                    const strip = document.querySelector(".sliders-console .channel-strip");
                    return {
                        vw: w,
                        container: c ? `${c.className}`.split(" ")[0] : null,
                        containerW: c ? +c.getBoundingClientRect().width.toFixed(1) : null,
                        containerContentW: c ? c.clientWidth - parseFloat(getComputedStyle(c).paddingLeft) - parseFloat(getComputedStyle(c).paddingRight) : null,
                        rowGap: rowsEl ? getComputedStyle(rowsEl).rowGap : null,
                        stripMinBlock: strip ? getComputedStyle(strip).minBlockSize : null,
                        stripH: strip ? +strip.getBoundingClientRect().height.toFixed(2) : null,
                    };
                }, w));
            }
            return { rows };
        } finally { await ctx.close(); }
    },
    // R-3/R-26: forced-colors computed values (rest) + gate-active state on a touch context.
    async r3_forced_rest(browser) {
        return forced(browser, { viewport: { width: 1440, height: 900 }, forcedColors: "active" }, "fc-rest-1440", false);
    },
    async r3_forced_gate_active(browser) {
        return forced(browser, { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, forcedColors: "active" }, "fc-gate-390", true);
    },
};

async function r1Arm(browser, opts) {
    const ctx = await browser.newContext(opts);
    try {
        const page = await ctx.newPage();
        await boot(page, "#/?space=rgb&color=rgb(128%20128%20128)");
        const s0 = await sliderState(page, 0);
        await page.mouse.click(s0.rect.x + s0.rect.w * 0.2, s0.rect.y + s0.rect.h / 2);
        await page.waitForTimeout(500);
        const s1 = await sliderState(page, 0);
        await page.mouse.click(s0.rect.x + s0.rect.w * 0.85, s0.rect.y + s0.rect.h / 2);
        await page.waitForTimeout(500);
        const s2 = await sliderState(page, 0);
        return { s0, click1: { valuenow: s1.valuenow, meter: s1.meter, gateActive: s1.gateActive }, click2: { valuenow: s2.valuenow, meter: s2.meter, gateActive: s2.gateActive } };
    } finally { await ctx.close(); }
}

async function geom(browser, opts, tag) {
    const ctx = await browser.newContext(opts);
    try {
        const page = await ctx.newPage();
        await boot(page);
        const g = await page.evaluate(() => {
            const r = (el) => { const b = el.getBoundingClientRect(); return [+b.x.toFixed(1), +b.y.toFixed(1), +b.width.toFixed(2), +b.height.toFixed(2)]; };
            const strips = [...document.querySelectorAll(".sliders-console .channel-strip")];
            const root = document.querySelector(".sliders-console .channel-slider");
            const thumb = root.querySelector('[role="slider"]');
            const track = root.querySelector(".slider-track") ?? root.firstElementChild;
            const before = getComputedStyle(root, "::before");
            const rowsEl = document.querySelector(".sliders-console .channel-rows");
            return {
                coarse: matchMedia("(pointer: coarse)").matches,
                strips: strips.map(r),
                stripPitch: strips.length > 1 ? +(strips[1].getBoundingClientRect().y - strips[0].getBoundingClientRect().y).toFixed(2) : null,
                rowGap: getComputedStyle(rowsEl).rowGap,
                root: r(root),
                thumb: r(thumb),
                thumbParent: thumb.parentElement ? r(thumb.parentElement) : null,
                track: track ? r(track) : null,
                before: { content: before.content, position: before.position, height: before.height, top: before.top, inset: before.inset },
            };
        });
        await page.locator(".sliders-console").screenshot({ path: `${EV}/geom-${tag}.png` });
        return g;
    } finally { await ctx.close(); }
}

async function forced(browser, opts, tag, activate) {
    const ctx = await browser.newContext(opts);
    try {
        const page = await ctx.newPage();
        await boot(page, "#/?space=rgb&color=rgb(200%2080%2040)");
        const read = () => page.evaluate(() => [...document.querySelectorAll(".sliders-console .touch-gate-target")].map((t) => {
            const tr = t.querySelector(".slider-track") ?? t.querySelector(".channel-slider")?.firstElementChild;
            const th = t.querySelector(".slider-thumb") ?? t.querySelector('[role="slider"]');
            const cs = getComputedStyle(t), ts = tr ? getComputedStyle(tr) : null, hs = th ? getComputedStyle(th) : null;
            return {
                active: t.classList.contains("touch-gate-active"),
                outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
                trackBgImage: ts ? ts.backgroundImage.slice(0, 80) : null,
                trackBoxShadow: ts?.boxShadow,
                trackFCA: ts?.forcedColorAdjust,
                thumbBg: hs?.backgroundColor,
                thumbBorder: hs?.borderColor,
            };
        }));
        const rest = await read();
        let act = null;
        if (activate) {
            const box = await page.locator(".sliders-console .channel-slider").first().boundingBox();
            await page.touchscreen.tap(box.x + box.width * 0.5, box.y + box.height / 2);
            await page.waitForTimeout(400);
            act = (await read())[0];
        }
        await page.locator(".sliders-console").screenshot({ path: `${EV}/${tag}.png` });
        return { forced: await page.evaluate(() => matchMedia("(forced-colors: active)").matches), rest, activeRow0: act };
    } finally { await ctx.close(); }
}

const only = process.argv[2]?.split(",");
const browser = await chromium.launch({ headless: true });
try {
    for (const [name, fn] of Object.entries(cells)) {
        if (only && !only.includes(name)) continue;
        try { out.cells[name] = await fn(browser); } catch (e) { out.cells[name] = { error: String(e).slice(0, 400) }; }
        console.log("cell", name, "done");
    }
} finally {
    await browser.close();
}
const OUTF = `${EV}/p1-sliders${only ? "-" + only.join("+") : ""}.json`;
writeFileSync(OUTF, JSON.stringify(out, null, 1));
console.log("wrote", OUTF);
