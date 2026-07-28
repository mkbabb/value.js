// CHALLENGE-D pass-3 · probe 3 — API-TRUTH, DEAD-STATE, PIXEL CONTRAST, FOCUS REGISTER.
// Read-only. WebKit + one Chromium arm for forced-colors (WebKit does not substitute the
// forced-colors palette, so it cannot decide that state).
import { webkit, chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "evidence-p3");
const SHOTS = resolve(HERE, "shots-p3");
mkdirSync(OUT, { recursive: true });
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";

const TAGS = ["pastel", "neon", "earthy", "monochrome", "retro", "vaporwave", "muted", "high-contrast", "warm", "cool", "sunset", "forest"]
    .map((name, i) => ({ name, count: 30 - i, id: String(i) }));
const PALETTES = Array.from({ length: 6 }, (_, i) => ({
    slug: `p3-${i}`, name: `P3 ${i}`, colors: ["#4488cc", "#cc4488", "#88cc44", "#cccc44"],
    oklabColors: [{ L: 0.6, a: -0.02, b: -0.12 }], userSlug: "someone", visibility: "public",
    tier: i % 2 ? "featured" : null, tags: [TAGS[i % TAGS.length].name], votes: 3, forkCount: 1,
    createdAt: new Date().toISOString(),
}));

const requestLog = [];
async function stubAll(context) {
    await context.route("**/*", async (route) => {
        const url = route.request().url();
        // Only the cross-origin API is stubbed. Every same-origin dev-server asset
        // (including source paths that happen to contain the word "colors") passes through.
        const sameOrigin = url.startsWith(ORIGIN);
        if (sameOrigin && !url.startsWith(`${ORIGIN}/api/`)) return route.continue();
        requestLog.push(url);
        if (/tags/.test(url)) return route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(TAGS) });
        if (/colors/.test(url)) return route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ palettes: PALETTES, nextCursor: null }) });
        return route.continue();
    });
}

const MEASURE = () => {
    const r = (n) => (n == null ? null : +Number(n).toFixed(2));
    // canvas-resolved sRGB for ANY css colour string
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const toSRGB = (css) => {
        try { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 1, 1); ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; } catch { return null; }
    };
    const overSolid = (fg, bgStack) => {
        // composite bgStack (front→back, each [r,g,b,a]) onto white/black-neutral last entry
        let out = bgStack[bgStack.length - 1].slice(0, 3);
        for (let i = bgStack.length - 2; i >= 0; i--) {
            const c = bgStack[i]; const a = c[3];
            out = [0, 1, 2].map((k) => c[k] * a + out[k] * (1 - a));
        }
        const a = fg[3];
        const ink = [0, 1, 2].map((k) => fg[k] * a + out[k] * (1 - a));
        const lum = (c) => { const f = c.map((v) => { const x = v / 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
        const la = lum(ink), lb = lum(out);
        return { ratio: +(((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05))).toFixed(2), ink: ink.map((v) => Math.round(v)), ground: out.map((v) => Math.round(v)) };
    };
    const bgStack = (el) => {
        const stack = [];
        let n = el;
        while (n && n !== document.documentElement) {
            const bg = toSRGB(getComputedStyle(n).backgroundColor);
            if (bg && bg[3] > 0) { stack.push(bg); if (bg[3] >= 0.999) return stack; }
            n = n.parentElement;
        }
        const root = toSRGB(getComputedStyle(document.documentElement).backgroundColor);
        stack.push(root && root[3] > 0 ? [root[0], root[1], root[2], 1] : [255, 255, 255, 1]);
        return stack;
    };
    const contrastOf = (el) => {
        if (!el) return null;
        const fg = toSRGB(getComputedStyle(el).color);
        return fg ? overSolid(fg, bgStack(el)) : null;
    };

    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    const trig = document.querySelector('button[aria-label="Filters"]');
    if (!dlg) return { open: false };

    const options = [...dlg.querySelectorAll(".filter-option")];
    const labels = [...dlg.querySelectorAll(".section-label")];
    const input = dlg.querySelector('input[aria-label="Search by CSS color"]');
    const searchBtn = input ? input.parentElement.querySelector("button") : null;
    const swatch = dlg.querySelector('button[aria-label^="Open color picker"]');
    const clearBtn = [...dlg.querySelectorAll("button")].find((b) => b.textContent.includes("Clear all"));
    const scroller = dlg.querySelector(".max-h-28");
    const badge = trig?.querySelector("span");

    // --- glass-ui API leak census -------------------------------------------
    const apiLeak = {
        triggerAttrs: trig ? [...trig.attributes].map((a) => `${a.name}=${a.value}`) : null,
        triggerClass: trig?.className ?? null,
        clearAttrs: clearBtn ? [...clearBtn.attributes].map((a) => `${a.name}=${a.value}`) : null,
        clearClass: clearBtn?.className ?? null,
        popoverClass: dlg.className,
        popoverPadding: getComputedStyle(dlg).padding,
        checkboxes: [...dlg.querySelectorAll('[role="checkbox"]')].map((c) => ({
            state: c.getAttribute("data-state"), ariaChecked: c.getAttribute("aria-checked"),
            attrs: [...c.attributes].map((a) => `${a.name}=${a.value}`).filter((s) => /checked/i.test(s)),
        })),
        checkboxHostAttrs: (() => {
            const first = dlg.querySelector('[role="checkbox"]');
            return first ? [...first.attributes].map((a) => a.name) : null;
        })(),
    };

    return {
        open: true,
        apiLeak,
        contrasts: {
            sectionLabel: contrastOf(labels[0]),
            optionText: contrastOf(options[0]),
            searchPill: contrastOf(searchBtn),
            clearAll: contrastOf(clearBtn),
            input: contrastOf(input),
            badge: badge ? (() => { const fg = toSRGB(getComputedStyle(badge).color); const bg = toSRGB(getComputedStyle(badge).backgroundColor); return fg && bg ? overSolid(fg, [bg, [255, 255, 255, 1]]) : null; })() : null,
        },
        tags: scroller ? {
            count: scroller.querySelectorAll("label").length,
            clientH: scroller.clientHeight, scrollH: scroller.scrollHeight,
            overflowing: scroller.scrollHeight > scroller.clientHeight + 1,
            hiddenRows: r((scroller.scrollHeight - scroller.clientHeight) / (scroller.querySelector("label")?.getBoundingClientRect().height || 1)),
            scrollbarPx: r(scroller.offsetWidth - scroller.clientWidth),
            maskImage: getComputedStyle(scroller).maskImage,
            boxShadow: getComputedStyle(scroller).boxShadow,
            firstCheckboxAriaChecked: scroller.querySelector('[role="checkbox"]')?.getAttribute("aria-checked") ?? null,
        } : null,
        swatchStyleAttr: swatch?.getAttribute("style") ?? null,
        swatchComputedBg: swatch ? getComputedStyle(swatch).backgroundColor : null,
        swatchForcedAdjust: swatch ? getComputedStyle(swatch).forcedColorAdjust : null,
        forcedColorsActive: matchMedia("(forced-colors: active)").matches,
        badgeText: badge?.textContent.trim() ?? null,
    };
};

const out = { requestLog: null };

// ---------------------------------------------------------------- WebKit arm
{
    const browser = await webkit.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await stubAll(context);
    const page = await context.newPage();
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2800);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(700);

    // --- DEAD-STATE PROOF: can `searching` ever paint? -----------------------
    const spinnerWatch = await page.evaluate(async () => {
        const dlg = document.querySelector('[role="dialog"][data-state="open"]');
        const input = dlg.querySelector('input[aria-label="Search by CSS color"]');
        const btn = input.parentElement.querySelector("button");
        let sawSpinner = 0, sawDisabled = 0, frames = 0;
        const mo = new MutationObserver(() => {
            if (dlg.querySelector(".animate-spin")) sawSpinner++;
            if (btn.hasAttribute("disabled")) sawDisabled++;
        });
        mo.observe(dlg, { subtree: true, childList: true, attributes: true });
        const raf = () => new Promise((res) => requestAnimationFrame(res));
        btn.click();
        for (let i = 0; i < 30; i++) { await raf(); frames++; if (dlg.querySelector(".animate-spin")) sawSpinner++; if (btn.hasAttribute("disabled")) sawDisabled++; }
        mo.disconnect();
        return { sawSpinner, sawDisabled, frames, buttonHTML: btn.innerHTML.trim().slice(0, 80) };
    });

    // --- COLOUR SUBSTITUTION -------------------------------------------------
    const substitution = await page.evaluate(async () => {
        const dlg = document.querySelector('[role="dialog"][data-state="open"]');
        const input = dlg.querySelector('input[aria-label="Search by CSS color"]');
        const btn = input.parentElement.querySelector("button");
        const setVal = (v) => {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
            setter.call(input, v);
            input.dispatchEvent(new Event("input", { bubbles: true }));
        };
        const results = [];
        for (const v of ["hsl(200 50% 50%)", "rebeccapurple", "oklch(0.7 0.15 30)", "#abc", "not-a-color", "#FF0000"]) {
            setVal(v);
            await new Promise((r) => setTimeout(r, 60));
            const swatchBefore = dlg.querySelector('button[aria-label^="Open color picker"]').getAttribute("aria-label");
            btn.click();
            await new Promise((r) => setTimeout(r, 200));
            const trig = document.querySelector('button[aria-label="Filters"]');
            results.push({
                typed: v,
                fieldAfter: input.value,
                swatchLabel: swatchBefore,
                badge: trig.querySelector("span")?.textContent.trim() ?? null,
                anyErrorNode: !!dlg.querySelector('[role="alert"],[aria-invalid="true"],.text-destructive'),
                inputAriaInvalid: input.getAttribute("aria-invalid"),
            });
        }
        return results;
    });

    // --- FOCUS REGISTER -------------------------------------------------------
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(600);
    const focusWalk = [];
    for (let i = 0; i < 16; i++) {
        await page.keyboard.press("Tab");
        await page.waitForTimeout(90);
        const f = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el) return null;
            const cs = getComputedStyle(el);
            const b = el.getBoundingClientRect();
            return {
                tag: el.tagName.toLowerCase(), role: el.getAttribute("role"),
                name: (el.getAttribute("aria-label") || el.textContent.trim() || el.placeholder || "").slice(0, 30),
                outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
                boxShadow: cs.boxShadow.slice(0, 90),
                rect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
                insidePopover: !!el.closest('[role="dialog"]'),
            };
        });
        focusWalk.push(f);
    }
    const popoverStillOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"][data-state="open"]'));
    // reopen if the tab walk escaped, then photograph focus on the two hand-rolled buttons
    if (!popoverStillOpen) { await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700); }
    const focusShots = await page.evaluate(() => {
        const sw = document.querySelector('button[aria-label^="Open color picker"]');
        if (sw) sw.focus();
        const cs = sw ? getComputedStyle(sw) : null;
        const b = sw?.getBoundingClientRect();
        return { swatchFocusOutline: cs ? `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}` : null, swatchFocusShadow: cs?.boxShadow.slice(0, 140) ?? null, rect: b ? { x: +b.x.toFixed(1), y: +b.y.toFixed(1) } : null };
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: resolve(SHOTS, "P3-focus-swatch.png"), clip: { x: 440, y: 740, width: 240, height: 110 } });
    const pillFocus = await page.evaluate(() => {
        const i = document.querySelector('input[aria-label="Search by CSS color"]');
        const btn = i?.parentElement?.querySelector("button");
        if (!btn) return null;
        btn.focus();
        const cs = getComputedStyle(btn);
        return { active: document.activeElement === btn, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, boxShadow: cs.boxShadow.slice(0, 140), tabIndex: btn.tabIndex };
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: resolve(SHOTS, "P3-focus-searchpill.png"), clip: { x: 440, y: 740, width: 240, height: 110 } });

    out.webkit = await page.evaluate(MEASURE);
    out.webkit.popoverStillOpenAfter16Tabs = popoverStillOpen;
    out.webkit.focusShots = focusShots;
    out.webkit.pillFocus = pillFocus;
    out.webkit.spinnerWatch = spinnerWatch;
    out.webkit.substitution = substitution;
    out.webkit.focusWalk = focusWalk;
    await page.screenshot({ path: resolve(SHOTS, "P3-tagged-open.png") });
    await context.close(); await browser.close();
}

// ------------------------------------------------------- Chromium forced-colors
{
    const browser = await chromium.launch();
    for (const [id, opts] of [
        ["chromium-forced-colors", { viewport: { width: 1440, height: 900 }, forcedColors: "active", colorScheme: "light" }],
        ["chromium-light", { viewport: { width: 1440, height: 900 }, colorScheme: "light" }],
    ]) {
        const context = await browser.newContext(opts);
        await stubAll(context);
        const page = await context.newPage();
        await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
        await page.waitForTimeout(2600);
        await page.click('button[aria-label="Filters"]');
        await page.waitForTimeout(700);
        out[id] = await page.evaluate(MEASURE);
        await page.screenshot({ path: resolve(SHOTS, `P3-${id}-open.png`) });
        await context.close();
    }
    await browser.close();
}

out.requestLog = [...new Set(requestLog)].slice(0, 30);
writeFileSync(resolve(OUT, "P3-3-truth.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify({
    requestLog: out.requestLog,
    tags: out.webkit?.tags,
    apiLeak: out.webkit?.apiLeak,
    contrasts: out.webkit?.contrasts,
    spinnerWatch: out.webkit?.spinnerWatch,
    substitution: out.webkit?.substitution,
    focusWalk: out.webkit?.focusWalk,
    forced: { bg: out["chromium-forced-colors"]?.swatchComputedBg, adjust: out["chromium-forced-colors"]?.swatchForcedAdjust, active: out["chromium-forced-colors"]?.forcedColorsActive, contrasts: out["chromium-forced-colors"]?.contrasts },
}, null, 1));
