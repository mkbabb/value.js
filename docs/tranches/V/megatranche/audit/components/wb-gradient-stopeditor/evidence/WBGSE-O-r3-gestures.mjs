// worker-O re-derivation probe 1 — D2-01 blast radius, C11 grab offset, C12 focus, C14 button guard, D2-12 rootFS
import { chromium } from "playwright";
const URL = "http://localhost:9000/#/gradient";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE " + m.text().slice(0, 160)); });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

const census = () => page.evaluate(() => ({
    stops: document.querySelectorAll("[data-stop-id]").length,
    bar: !!document.querySelector('[data-testid="gradient-stop-bar"]'),
    tile: !!document.querySelector('[data-testid="gradient-render-tile"]'),
    main: !!document.querySelector("main"),
    nav: !!document.querySelector("nav"),
    dockBtns: document.querySelectorAll("nav button").length,
    alert: !!document.querySelector('[role="alert"]'),
    alertText: (document.querySelector('[role="alert"]')?.innerText || "").replace(/\s+/g, " ").slice(0, 160),
    bodyLen: document.body.innerText.length,
    paneCount: document.querySelectorAll("main .pane-container > *").length,
}));

console.log("A0 baseline:", JSON.stringify(await census()));

// ---- C11: grab offset teleport ----
const geo = await page.evaluate(() => {
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
    const r = bar.getBoundingClientRect();
    const hs = [...document.querySelectorAll("[data-stop-id]")].map((h) => {
        const b = h.getBoundingClientRect();
        return { label: h.getAttribute("aria-label"), cx: b.x + b.width / 2, cy: b.y + b.height / 2, w: b.width, left: b.x };
    });
    const cs = getComputedStyle(bar);
    return { barX: r.x, barW: r.width, barY: r.y, barH: r.height, border: cs.borderLeftWidth, bgSize: cs.backgroundSize, bgOrigin: cs.backgroundOrigin, handles: hs, rootFS: getComputedStyle(document.documentElement).fontSize };
});
console.log("B geometry:", JSON.stringify(geo));

const h0 = geo.handles[0];
await page.mouse.move(h0.cx + 8, h0.cy);
await page.mouse.down();
await page.mouse.move(h0.cx + 9, h0.cy);
await page.waitForTimeout(120);
const afterTeleport = await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((h) => ({ l: h.getAttribute("aria-label"), cx: h.getBoundingClientRect().x + h.getBoundingClientRect().width / 2 })));
await page.mouse.up();
console.log("C11 teleport: before", JSON.stringify({ l: h0.label, cx: h0.cx }), "after", JSON.stringify(afterTeleport[0]));

// ---- C12: pointer selection never focuses ----
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const g2 = await page.evaluate(() => {
    const h = document.querySelector("[data-stop-id]");
    const b = h.getBoundingClientRect();
    return { cx: b.x + b.width / 2, cy: b.y + b.height / 2 };
});
await page.mouse.click(g2.cx, g2.cy);
await page.waitForTimeout(150);
const focusState = await page.evaluate(() => ({
    active: document.activeElement.tagName + "/" + (document.activeElement.getAttribute("aria-label") || ""),
    labels: [...document.querySelectorAll("[data-stop-id]")].map((h) => h.getAttribute("aria-label")),
    scales: [...document.querySelectorAll("[data-stop-id]")].map((h) => getComputedStyle(h).transform),
}));
await page.keyboard.press("ArrowRight");
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(150);
const afterKeys = await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((h) => h.getAttribute("aria-label")));
console.log("C12 focus:", JSON.stringify({ ...focusState, afterKeys }));

// ---- C6/D2-06/D2-13: roles and keyboard census (tab to handle first) ----
const attrs = await page.evaluate(() => {
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
    const h = document.querySelector("[data-stop-id]");
    return {
        bar: { role: bar.getAttribute("role"), tabindex: bar.getAttribute("tabindex"), aria: bar.getAttribute("aria-label"), tag: bar.tagName, cursor: getComputedStyle(bar).cursor },
        handleAttrs: [...h.attributes].map((a) => a.name + "=" + a.value).filter((s) => !s.startsWith("style") && !s.startsWith("class")),
        headings: [...document.querySelectorAll("main h1,main h2,main h3")].map((n) => n.tagName + ":" + n.innerText.trim()).slice(0, 12),
    };
});
console.log("C6/D2-13 attrs:", JSON.stringify(attrs));

// keyboard: focus by keyboard then press Home/End/Up/Down/Enter/Space
await page.evaluate(() => document.querySelector("[data-stop-id]").focus());
const kb = {};
for (const k of ["Home", "End", "ArrowUp", "ArrowDown", "Enter", " "]) {
    const before = await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((h) => h.getAttribute("aria-label")));
    await page.keyboard.press(k === " " ? "Space" : k);
    await page.waitForTimeout(80);
    const after = await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map((h) => h.getAttribute("aria-label")));
    kb[k] = { before: before.join("|"), after: after.join("|"), changed: before.join("|") !== after.join("|") };
}
console.log("D2-06 keys:", JSON.stringify(kb));

// ---- C14: middle / right click on bare rail ----
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const barBox = await page.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
const cnt = () => page.evaluate(() => document.querySelectorAll("[data-stop-id]").length);
const beforeMid = await cnt();
await page.mouse.click(barBox.x + barBox.w * 0.4, barBox.y + barBox.h / 2, { button: "middle" });
await page.waitForTimeout(250);
const afterMid = await cnt();
await page.mouse.click(barBox.x + barBox.w * 0.6, barBox.y + barBox.h / 2, { button: "right" });
await page.waitForTimeout(250);
const afterRight = await cnt();
console.log("C14 buttons:", JSON.stringify({ beforeMid, afterMid, afterRight }));

// ---- D2-12: root font-size 20px overhang ----
const overhang = await page.evaluate(() => {
    const read = () => {
        const bar = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect();
        const h = document.querySelector("[data-stop-id]").getBoundingClientRect();
        return { barLeft: +bar.x.toFixed(2), handleLeft: +h.x.toFixed(2), handleW: +h.width.toFixed(2), overhang: +(bar.x - h.x).toFixed(2), rootFS: getComputedStyle(document.documentElement).fontSize };
    };
    const before = read();
    document.documentElement.style.fontSize = "20px";
    return new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => { const after = read(); document.documentElement.style.fontSize = ""; res({ before, after }); })));
});
console.log("D2-12 rootFS:", JSON.stringify(overhang));

// ---- D2-01: blast radius ----
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2200);
console.log("D0 before-type:", JSON.stringify(await census()));
const editor = page.locator('[contenteditable="true"]').first();
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.type("linear-gradient(90deg, oklch() 0%, red 100%)", { delay: 8 });
await page.waitForTimeout(1800);
console.log("D1 after-oklch-empty:", JSON.stringify(await census()));
console.log("errs:", JSON.stringify(errs));
await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/gse/o-D201.png" });

await browser.close();
