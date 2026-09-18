import { chromium } from "playwright";

const seed = () => {
    const now = new Date().toISOString();
    const mk = (name, slug, css) => ({
        id: slug, name, slug, isLocal: true, createdAt: now, updatedAt: now,
        colors: css.map((c, i) => ({ css: c, position: i })),
    });
    localStorage.setItem("color-palettes", JSON.stringify({
        version: 1,
        palettes: [
            mk("Probe A", "probe-a", ["#ff0000", "#00ff00", "#0000ff"]),
            mk("Probe B", "probe-b", ["#ffff00", "#00ffff", "#ff00ff"]),
        ],
    }));
};

const probeInstall = () => {
    const orig = Element.prototype.querySelector;
    window.__mixProbe = [];
    window.__t0 = performance.now();
    Element.prototype.querySelector = function (sel) {
        const r = orig.call(this, sel);
        if (typeof sel === "string" && sel.includes("data-mix-target")) {
            window.__mixProbe.push({
                kind: "collectStage target lookup",
                t: +(performance.now() - window.__t0).toFixed(1),
                FOUND: r !== null,
                rootClientWidth: this.clientWidth,
                rootScrollHeight: this.scrollHeight,
                fallbackUsed: r === null
                    ? { x: this.clientWidth / 2, y: +(this.scrollHeight * 0.7).toFixed(1), r: 28 }
                    : null,
            });
        }
        return r;
    };
};

const sampleCanvas = () => {
    const c = document.querySelector('main canvas[aria-hidden="true"][class*="absolute"]');
    if (!c) return { err: "no canvas" };
    const ctx = c.getContext("2d");
    const dpr = c.width / (c.clientWidth || 1);
    const img = ctx.getImageData(0, 0, c.width, c.height).data;
    let best = { a: 0, x: -1, y: -1 };
    let painted = 0;
    for (let y = 0; y < c.height; y += 3)
        for (let x = 0; x < c.width; x += 3) {
            const a = img[(y * c.width + x) * 4 + 3];
            if (a > 8) painted++;
            if (a > best.a) best = { a, x, y };
        }
    return {
        cssW: c.clientWidth, cssH: c.clientHeight, dpr: +dpr.toFixed(2),
        brightestCss: best.x < 0 ? null : { x: +(best.x / dpr).toFixed(0), y: +(best.y / dpr).toFixed(0), a: best.a },
        paintedSamples: painted,
    };
};

const geom = () => {
    const c = document.querySelector('main canvas[aria-hidden="true"][class*="absolute"]');
    const root = c?.parentElement;
    if (!root) return { err: "no root" };
    const off = (el) => {
        let x = 0, y = 0, n = el;
        while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
        return { x: +(x + el.offsetWidth / 2).toFixed(0), y: +(y + el.offsetHeight / 2).toFixed(0) };
    };
    const dot = root.querySelector("[data-mix-target]");
    const plate = root.querySelector(".mix-plate");
    const ghostDot = plate?.querySelector('[data-variant="ghost"]');
    return {
        dataMixTargetInDOM: !!dot,
        ghostWellRendered: !!ghostDot,
        ghostWellCenter: ghostDot ? off(ghostDot) : null,
        plateCenter: plate ? off(plate) : null,
        plateGhostClass: !!root.querySelector(".mix-plate--ghost"),
        fallbackTarget: { x: root.clientWidth / 2, y: +(root.scrollHeight * 0.7).toFixed(0) },
        rootScrollHeight: root.scrollHeight,
        plateText: plate ? plate.innerText.replace(/\s+/g, " ").slice(0, 100) : null,
    };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });
await page.addInitScript(seed);
await page.addInitScript(probeInstall);
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const main = page.getByRole("main");
// palettes mode — the ONLY working source path (native <button> cards)
await main.getByRole("button", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(400);
await main.getByRole("button", { name: /Select palette Probe A/ }).click();
await main.getByRole("button", { name: /Select palette Probe B/ }).click();
await page.waitForTimeout(300);

const out = { errors, sources: await page.locator("[data-mix-source]").count() };

const mixBtn = main.getByRole("button", { name: "Mix", exact: true });
await page.evaluate(() => { window.__mixProbe.length = 0; });
await mixBtn.click();
await page.waitForTimeout(150);
out.mix1_lookups = await page.evaluate(() => window.__mixProbe.slice());
out.mix1_geom_150ms = await page.evaluate(geom);
await page.waitForTimeout(650);
out.mix1_paint_800ms = await page.evaluate(sampleCanvas);
await page.waitForTimeout(1200);
out.mix1_geom_settled = await page.evaluate(geom);
await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/WBMIXPANE-C-settled.png" });

// re-mix (phase === done)
await page.evaluate(() => { window.__mixProbe.length = 0; });
await mixBtn.click();
await page.waitForTimeout(150);
out.mix2_lookups = await page.evaluate(() => window.__mixProbe.slice());
out.mix2_geom_150ms = await page.evaluate(geom);
await page.waitForTimeout(500);
await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/WBMIXPANE-C-midflight.png" });
out.mix2_paint_650ms = await page.evaluate(sampleCanvas);
await page.waitForTimeout(1200);
out.mix2_geom_settled = await page.evaluate(geom);

console.log(JSON.stringify(out, null, 1));
await browser.close();
