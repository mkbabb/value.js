import { chromium } from "playwright";

const probeInstall = () => {
    // Read-only instrumentation: wrap querySelector to record the exact
    // collectStage() lookup of [data-mix-target].
    const orig = Element.prototype.querySelector;
    const origAll = Element.prototype.querySelectorAll;
    window.__mixProbe = [];
    window.__t0 = performance.now();
    Element.prototype.querySelector = function (sel) {
        const r = orig.call(this, sel);
        if (typeof sel === "string" && sel.includes("data-mix-target")) {
            window.__mixProbe.push({
                kind: "target-lookup",
                t: +(performance.now() - window.__t0).toFixed(1),
                found: r !== null,
                rootClientWidth: this.clientWidth,
                rootScrollHeight: this.scrollHeight,
                fallbackX: this.clientWidth / 2,
                fallbackY: +(this.scrollHeight * 0.7).toFixed(1),
            });
        }
        return r;
    };
    Element.prototype.querySelectorAll = function (sel) {
        const r = origAll.call(this, sel);
        if (typeof sel === "string" && sel.includes("data-mix-source")) {
            window.__mixProbe.push({
                kind: "source-lookup",
                t: +(performance.now() - window.__t0).toFixed(1),
                n: r.length,
            });
        }
        return r;
    };
};

const sampleCanvas = () => {
    const c = document.querySelector('main canvas[aria-hidden="true"]');
    if (!c) return { err: "no canvas" };
    const ctx = c.getContext("2d");
    const dpr = c.width / (c.clientWidth || 1);
    const img = ctx.getImageData(0, 0, c.width, c.height).data;
    let best = { a: 0, x: -1, y: -1 };
    let painted = 0;
    for (let y = 0; y < c.height; y += 4) {
        for (let x = 0; x < c.width; x += 4) {
            const a = img[(y * c.width + x) * 4 + 3];
            if (a > 8) painted++;
            if (a > best.a) best = { a, x, y };
        }
    }
    return {
        cssW: c.clientWidth, cssH: c.clientHeight, pxW: c.width, pxH: c.height, dpr,
        brightestCss: best.x < 0 ? null : { x: +(best.x / dpr).toFixed(1), y: +(best.y / dpr).toFixed(1), a: best.a },
        paintedSamples: painted,
    };
};

const geom = () => {
    const c = document.querySelector('main canvas[aria-hidden="true"]');
    const root = c?.parentElement;
    if (!root) return { err: "no root" };
    const off = (el) => {
        let x = 0, y = 0, n = el;
        while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
        return { x: +(x + el.offsetWidth / 2).toFixed(1), y: +(y + el.offsetHeight / 2).toFixed(1) };
    };
    const dot = root.querySelector("[data-mix-target]");
    const plate = root.querySelector(".mix-plate");
    return {
        wellPresent: !!dot,
        wellCenter: dot ? off(dot) : null,
        plateCenter: plate ? off(plate) : null,
        ghost: !!root.querySelector(".mix-plate--ghost"),
        rootClientWidth: root.clientWidth,
        rootScrollHeight: root.scrollHeight,
        fallback: { x: root.clientWidth / 2, y: +(root.scrollHeight * 0.7).toFixed(1) },
        plateText: plate ? plate.innerText.replace(/\s+/g, " ").slice(0, 90) : null,
    };
};

const run = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
    page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });

    await page.addInitScript(probeInstall);
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);

    const main = page.getByRole("main");
    const addSlot = main.getByRole("button", { name: "Add current color to the mix" });
    await addSlot.click();
    await addSlot.click();
    await page.waitForTimeout(400);

    const mixBtn = main.getByRole("button", { name: "Mix", exact: true });
    const out = { errors };

    // ── MIX #1 ──────────────────────────────────────────────────────────
    await page.evaluate(() => { window.__mixProbe.length = 0; });
    await mixBtn.click();
    await page.waitForTimeout(140);
    out.mix1_lookups = await page.evaluate(() => window.__mixProbe.slice());
    out.mix1_geom_at140 = await page.evaluate(geom);
    await page.waitForTimeout(680);
    out.mix1_paint_at820 = await page.evaluate(sampleCanvas);
    await page.waitForTimeout(1000);
    out.mix1_geom_settled = await page.evaluate(geom);

    // ── MIX #2 — re-mix while phase === "done" ──────────────────────────
    await page.evaluate(() => { window.__mixProbe.length = 0; });
    await mixBtn.click();
    await page.waitForTimeout(140);
    out.mix2_lookups = await page.evaluate(() => window.__mixProbe.slice());
    out.mix2_geom_at140 = await page.evaluate(geom);
    await page.waitForTimeout(680);
    out.mix2_paint_at820 = await page.evaluate(sampleCanvas);
    await page.waitForTimeout(1000);
    out.mix2_geom_settled = await page.evaluate(geom);

    console.log(JSON.stringify(out, null, 1));
    await browser.close();
};

run().catch((e) => { console.error("FAIL", e); process.exit(1); });
