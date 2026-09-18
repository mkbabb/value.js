import { chromium } from "@playwright/test";

const port = process.env.PORT ?? "9000";
const b = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto(`http://localhost:${port}/#/gradient`, { waitUntil: "load" });
await p.waitForTimeout(6000);
const tune = p.locator("button[aria-label='Author a custom curve']").first();
await tune.click({ timeout: 15000 });
await p.waitForTimeout(1200);

const stage = p.locator(".easing-authoring").first();
const m = await stage.evaluate((el) => {
    const svg = el.querySelector("svg[viewBox]");
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scale = Math.min(r.width / vb.width, r.height / vb.height);
    const cs = getComputedStyle(svg);
    return {
        roleImgCount: el.querySelectorAll("svg[role='img']").length,
        canvasRole: svg.getAttribute("role"),
        stageInlineStyle: el.getAttribute("style"),
        elementBox: [+r.width.toFixed(1), +r.height.toFixed(1)],
        elementAspect: +(r.width / r.height).toFixed(4),
        liveViewBox: [vb.x, vb.y, vb.width, +vb.height.toFixed(4)],
        vbAspect: +(vb.width / vb.height).toFixed(4),
        drawnPlot: [+(scale * vb.width).toFixed(1), +(scale * vb.height).toFixed(1)],
        letterboxPxX: +(r.width - scale * vb.width).toFixed(1),
        letterboxPctX: +(100 * (1 - (scale * vb.width) / r.width)).toFixed(1),
        computed: { blockSize: cs.blockSize, aspectRatio: cs.aspectRatio, marginLeft: cs.marginLeft },
        pickerGridCols: getComputedStyle(el.querySelector("[data-testid='easing-picker']")).gridTemplateColumns,
    };
});
console.log(JSON.stringify(m, null, 2));
await stage.screenshot({ path: process.env.OUT ?? "stage.png" });

// Regime flip: press ease-out-back and re-measure (the "liquid morph" law).
await p.locator("[data-specimen='ease-out-back']").first().click();
await p.waitForTimeout(1200);
const m2 = await stage.evaluate((el) => {
    const svg = el.querySelector("svg[viewBox]");
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scale = Math.min(r.width / vb.width, r.height / vb.height);
    return {
        stageInlineStyle: el.getAttribute("style"),
        elementBox: [+r.width.toFixed(1), +r.height.toFixed(1)],
        liveViewBox: [vb.x, +vb.y.toFixed(4), vb.width, +vb.height.toFixed(4)],
        drawnPlot: [+(scale * vb.width).toFixed(1), +(scale * vb.height).toFixed(1)],
        letterboxPctX: +(100 * (1 - (scale * vb.width) / r.width)).toFixed(1),
    };
});
console.log("AFTER ease-out-back:", JSON.stringify(m2, null, 2));
await stage.screenshot({ path: (process.env.OUT ?? "stage.png").replace(".png", "-back.png") });
await b.close();
