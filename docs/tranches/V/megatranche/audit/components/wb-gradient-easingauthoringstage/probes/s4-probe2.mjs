import { webkit } from "playwright";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
const out = {};
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(3500);
await page.evaluate(() => document.querySelector('button[aria-label="Author a custom curve"]')?.click());
await page.waitForTimeout(700);

// (1) DOM ORDER of svgs inside the stage — decides whether `stage svg` / `[data-testid] svg` works
out.svgOrder = await page.evaluate(() => {
    const stage = document.querySelector(".easing-authoring");
    return [...stage.querySelectorAll("svg")].map((s, i) => ({
        i,
        role: s.getAttribute("role"),
        cls: (s.getAttribute("class") || "").slice(0, 50),
        viewBox: s.getAttribute("viewBox"),
        hasViewBoxBaseVal: !!(s.viewBox && s.viewBox.baseVal),
        vbw: s.viewBox?.baseVal?.width ?? null,
        vbh: s.viewBox?.baseVal?.height ?? null,
        parentTag: s.parentElement?.tagName,
        parentCls: (s.parentElement?.getAttribute("class") || "").slice(0, 40),
    }));
});
// what a naive repair would pick
out.naiveRepair = await page.evaluate(() => {
    const stage = document.querySelector(".easing-authoring");
    const first = stage.querySelector("svg");
    const byTestid = document.querySelector('[data-testid="easing-picker"] svg');
    const byId = document.querySelector("#easing-authoring-0 svg");
    const d = (s) => (s ? { role: s.getAttribute("role"), vb: s.getAttribute("viewBox"), w: +s.getBoundingClientRect().width.toFixed(1), h: +s.getBoundingClientRect().height.toFixed(1) } : null);
    return { stageFirstSvg: d(first), byTestidFirst: d(byTestid), byIdFirst: d(byId) };
});

// (2) add stops -> multi-instance eager mount
const btns = await page.evaluate(() =>
    [...document.querySelectorAll("button")].map((b) => ({ label: b.getAttribute("aria-label"), text: (b.textContent || "").trim().slice(0, 24) })).filter((b) => /add|stop|\+/i.test((b.label || "") + " " + b.text)),
);
out.candidateAddButtons = btns;

const clickAdd = async () => {
    const ok = await page.evaluate(() => {
        const b = [...document.querySelectorAll("button")].find((b) => /add stop/i.test((b.getAttribute("aria-label") || "") + " " + (b.textContent || "")));
        if (!b) return false;
        b.click();
        return true;
    });
    await page.waitForTimeout(450);
    return ok;
};
out.addClicks = [];
for (let i = 0; i < 3; i++) out.addClicks.push(await clickAdd());

out.afterAdds = await page.evaluate(() => {
    const stages = [...document.querySelectorAll(".easing-authoring")];
    const ids = [...document.querySelectorAll("[id]")].map((n) => n.id);
    return {
        stages: stages.length,
        pickers: document.querySelectorAll('[data-testid="easing-picker"]').length,
        sliders: document.querySelectorAll(".easing-authoring [role='slider']").length,
        visible: stages.filter((s) => s.getBoundingClientRect().width > 0).length,
        stageNodes: stages.reduce((a, s) => a + s.querySelectorAll("*").length, 0),
        totalNodes: document.querySelectorAll("*").length,
        dupIds: [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))],
        vbRatios: stages.map((s) => getComputedStyle(s).getPropertyValue("--vb-ratio").trim()),
        rowHeads: document.querySelectorAll("button[aria-controls^='easing-interval-']").length,
        tuneExpanded: [...document.querySelectorAll('button[aria-label="Author a custom curve"]')].map((b) => b.getAttribute("aria-expanded")),
    };
});

// (3) stop-removal index-key leak: open tune on the LAST row, then remove a middle stop
out.removal = await page.evaluate(() => {
    const tunes = [...document.querySelectorAll('button[aria-label="Author a custom curve"]')];
    if (tunes.length < 2) return { skipped: "not enough rows" };
    tunes[tunes.length - 1].click();
    return { opened: tunes.length - 1, count: tunes.length };
});
await page.waitForTimeout(400);
out.beforeRemove = await page.evaluate(() => ({
    tuneExpanded: [...document.querySelectorAll('button[aria-label="Author a custom curve"]')].map((b) => b.getAttribute("aria-expanded")),
    literals: [...document.querySelectorAll("[id^='easing-interval-'] code")].map((c) => c.textContent.trim()),
}));
out.removeClicked = await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((b) => /remove stop|delete stop/i.test((b.getAttribute("aria-label") || "") + " " + (b.textContent || "")));
    if (!b) return false;
    b.click();
    return true;
});
await page.waitForTimeout(500);
out.afterRemove = await page.evaluate(() => ({
    tuneExpanded: [...document.querySelectorAll('button[aria-label="Author a custom curve"]')].map((b) => b.getAttribute("aria-expanded")),
    literals: [...document.querySelectorAll("[id^='easing-interval-'] code")].map((c) => c.textContent.trim()),
    rowHeads: document.querySelectorAll("button[aria-controls^='easing-interval-']").length,
}));

console.log(JSON.stringify(out, null, 2));
await browser.close();
