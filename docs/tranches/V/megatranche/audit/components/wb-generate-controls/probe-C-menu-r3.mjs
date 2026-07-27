import { chromium } from "@playwright/test";
const out = (k, v) => console.log(`\n### ${k}\n` + JSON.stringify(v, null, 1));
const b = await chromium.launch({ channel: "chromium", headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const ctx = await b.newContext({ viewport: { width: 430, height: 900 } });
const p = await ctx.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
await p.goto("http://localhost:9000/#/generate", { waitUntil: "load", timeout: 60000 });
await p.waitForSelector("[data-generate-plate]", { timeout: 30000 });
await p.waitForTimeout(3000);
out("0-in-view", await p.evaluate(() => { const r = document.querySelector("[data-generate-plate]").getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) }; }));

// wrap arithmetic at this width
out("1-chrome-row-parts", await p.evaluate(() => {
    const plate = document.querySelector("[data-generate-plate]");
    const row = plate.querySelector("input[aria-label='Palette name']").parentElement;
    const cs = getComputedStyle(row);
    const kids = [...row.children].map((el) => ({ tag: el.tagName, cls: String(el.className).slice(0, 30), w: el.offsetWidth, h: el.offsetHeight, top: el.offsetTop }));
    return { rowW: row.offsetWidth, padding: [cs.paddingLeft, cs.paddingRight], colGap: cs.columnGap, kids,
        contentW: row.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
        lines: new Set(kids.map((k) => k.top + Math.round(k.h / 2))).size };
}));

const t0 = Date.now();
await p.getByRole("combobox", { name: "Generation preset" }).click({ timeout: 15000 }).catch((e) => console.log("open threw", String(e).split("\n")[0]));
await p.waitForTimeout(900);
const menuInfo = await p.evaluate(() => {
    const chips = [...document.querySelectorAll("[data-stops]")];
    const opts = [...document.querySelectorAll("[role='option']")];
    return {
        options: opts.length, chips: chips.length,
        stopsPerChip: chips.map((c) => c.getAttribute("data-stops").split("|").length),
        segmentsPerChip: chips.map((c) => c.children.length),
        firstStop: chips[0]?.getAttribute("data-stops").split("|")[0],
        optionNames: opts.slice(0, 3).map((o) => o.innerText.replace(/\s+/g, " ").trim().slice(0, 70)),
        optionMinH: Math.min(...opts.map((o) => Math.round(o.getBoundingClientRect().height))),
    };
});
out("2-menu-open", { openMs: Date.now() - t0, ...menuInfo });

// THE O-20 COMPARISON, both sides from the same page
out("3-o20-both-sides", await p.evaluate(() => {
    const chips = [...document.querySelectorAll("[data-stops]")];
    const vibrant = [...document.querySelectorAll("[role='option']")].find((o) => o.innerText.startsWith("Vibrant"));
    const stamped = vibrant?.querySelector("[data-stops]")?.getAttribute("data-stops").split("|") ?? [];
    const live = [...document.querySelectorAll(".generate-swatch")].map((el) => getComputedStyle(el).backgroundColor);
    return { stamped_first: stamped[0], live_first: live[0], equal: JSON.stringify(stamped) === JSON.stringify(live) };
}));
await p.keyboard.press("Escape");
await p.waitForTimeout(500);

// menu open cost, repeated
const times = [];
for (let i = 0; i < 3; i++) {
    const t = Date.now();
    await p.getByRole("combobox", { name: "Generation preset" }).click().catch(() => {});
    await p.waitForSelector("[role='option']", { timeout: 8000 }).catch(() => {});
    times.push(Date.now() - t);
    await p.keyboard.press("Escape");
    await p.waitForTimeout(300);
}
out("4-menu-open-times-ms", times);

// harmony menu at count 12
await p.getByRole("slider", { name: "Color count" }).focus();
for (let i = 0; i < 15; i++) await p.keyboard.press("ArrowRight");
await p.waitForTimeout(400);
await p.getByRole("combobox", { name: "Color harmony" }).click({ timeout: 12000 }).catch((e) => console.log("harmony open threw", String(e).split("\n")[0]));
await p.waitForTimeout(700);
out("5-harmony@count12", await p.evaluate(() => {
    const chips = [...document.querySelectorAll("[data-stops]")];
    return { count: document.querySelector(".slider-thumb")?.getAttribute("aria-valuenow"),
        options: document.querySelectorAll("[role='option']").length,
        stopsPerChip: chips.map((c) => c.getAttribute("data-stops").split("|").length),
        segmentsPerChip: chips.map((c) => c.children.length) };
}));
await p.keyboard.press("Escape");

// keyboard reach: tab order through the plate
out("6-tab-order", await p.evaluate(() => [...document.querySelectorAll("[data-generate-plate] *")]
    .filter((e) => e.tabIndex >= 0)
    .map((e) => `${e.tagName}[${e.tabIndex}]:${e.getAttribute("aria-label") ?? e.textContent.trim().slice(0, 20)}`)));

out("7-errors", errs);
await b.close();
