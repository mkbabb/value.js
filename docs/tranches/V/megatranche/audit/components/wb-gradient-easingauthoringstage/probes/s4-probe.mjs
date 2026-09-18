import { webkit } from "playwright";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
const out = {};
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(3500);

const census = () =>
    page.evaluate(() => {
        const stages = [...document.querySelectorAll(".easing-authoring")];
        const pickers = [...document.querySelectorAll('[data-testid="easing-picker"]')];
        const ids = [...document.querySelectorAll("[id]")].map((n) => n.id);
        const dupIds = ids.filter((v, i) => ids.indexOf(v) !== i);
        const stageIds = stages.flatMap((s) => [...s.querySelectorAll("[id]")].map((n) => n.id));
        return {
            stages: stages.length,
            pickers: pickers.length,
            svgs: document.querySelectorAll(".easing-authoring svg").length,
            sliders: document.querySelectorAll(".easing-authoring [role='slider']").length,
            ariaLiveInStage: document.querySelectorAll(".easing-authoring [aria-live]").length,
            statusInStage: document.querySelectorAll(".easing-authoring [role='status']").length,
            stageIds,
            dupIdsGlobal: [...new Set(dupIds)],
            stageNodeCount: stages.reduce((a, s) => a + s.querySelectorAll("*").length, 0),
            totalNodes: document.querySelectorAll("*").length,
            visibleStages: stages.filter((s) => s.getBoundingClientRect().width > 0).length,
            displays: stages.map((s) => {
                let n = s, chain = [];
                while (n && chain.length < 4) { chain.push(getComputedStyle(n).display); n = n.parentElement; }
                return chain.join(">");
            }),
        };
    });

out.t0_default = await census();

// add stops -> more intervals -> more eager stage mounts
const addBtn = await page.$('button[aria-label*="Add" i], button:has-text("Add stop")');
out.addBtnFound = !!addBtn;
if (addBtn) {
    for (let i = 0; i < 3; i++) { await addBtn.click(); await page.waitForTimeout(350); }
}
out.t1_after3Adds = await census();

// open the tune disclosure on row 0
await page.evaluate(() => document.querySelector('button[aria-label="Author a custom curve"]')?.click());
await page.waitForTimeout(600);
out.t2_tuneOpen = await census();

// geometry + handle size, independent measurement
out.geometry = await page.evaluate(() => {
    const svg = document.querySelector(".easing-authoring svg");
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const ctm = svg.getScreenCTM();
    const pt = (x, y) => { const p = new DOMPoint(x, y).matrixTransform(ctm); return { x: p.x, y: p.y }; };
    const tl = pt(vb.x, vb.y), br = pt(vb.x + vb.width, vb.y + vb.height);
    const stage = svg.closest(".easing-authoring");
    const h = [...document.querySelectorAll(".easing-authoring circle[role='slider']")].map((c) => {
        const b = c.getBoundingClientRect(); return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), label: c.getAttribute("aria-label") };
    });
    return {
        svgRole: svg.getAttribute("role"),
        roleImgCount: document.querySelectorAll(".easing-authoring svg[role='img']").length,
        vbRatioVar: getComputedStyle(stage).getPropertyValue("--vb-ratio").trim(),
        viewBox: svg.getAttribute("viewBox"),
        box: { w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
        letterbox: { dL: +Math.abs(tl.x - r.left).toFixed(2), dR: +Math.abs(br.x - r.right).toFixed(2), dT: +Math.abs(tl.y - r.top).toFixed(2), dB: +Math.abs(br.y - r.bottom).toFixed(2) },
        computed: { inlineSize: getComputedStyle(svg).inlineSize, blockSize: getComputedStyle(svg).blockSize, aspectRatio: getComputedStyle(svg).aspectRatio, transitionProperty: getComputedStyle(svg).transitionProperty },
        handles: h,
    };
});

// PRESET DESYNC: pick a preset in the picker combobox, then click a strip tile
const readState = () =>
    page.evaluate(() => {
        const row = document.querySelector("#easing-interval-0");
        const trig = row?.querySelector('[role="combobox"], button[aria-label="Easing preset"]');
        const pressed = [...(row?.querySelectorAll("[data-specimen]") ?? [])].filter((b) => b.getAttribute("aria-pressed") === "true" || b.dataset.selected === "true" || b.getAttribute("aria-checked") === "true").map((b) => b.dataset.specimen);
        return {
            literal: row?.querySelector("code")?.textContent?.trim() ?? null,
            presetTrigger: (trig?.textContent || "").trim().slice(0, 40),
            pressedTiles: pressed,
            headName: document.querySelector("button[aria-controls='easing-interval-0'] span:last-of-type")?.textContent?.trim() ?? null,
        };
    });
out.desync_t0 = await readState();
try {
    await page.click('#easing-interval-0 [role="combobox"]', { timeout: 3000 });
    await page.waitForTimeout(400);
    await page.click('[role="option"]:has-text("ease-in-out-quad")', { timeout: 3000 });
    await page.waitForTimeout(500);
    out.desync_t1_afterPresetPick = await readState();
    await page.click("#easing-interval-0 [data-specimen='ease-out-sine']", { timeout: 3000 });
    await page.waitForTimeout(600);
    out.desync_t2_afterTile = await readState();
} catch (e) { out.desyncErr = String(e).slice(0, 200); }

console.log(JSON.stringify(out, null, 2));
await browser.close();
