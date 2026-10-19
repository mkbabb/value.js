// SERVED MODEL: claude-opus-5-5 — SS-8 B05 secondary Chromium cells (headless; one browser,
// one context per cell, closed in finally). CELLS env picks a subset.
// routes  — ABT C-2/D-06 AX census (every VIEW_MAP route + an unknown route), ABN U-3 gradient
//           gutters, U-6 disabled-seat hover scan, U-2 seat colour serialisation.
// mobile  — ABT L-1 widths @390 (coarse), D-07 mobile rect.
// zoom    — ABT D-07 zoom-200 rect + label (720x450 @ DSF 2 = 1440x900 at 200 %).
// prm/noprm — ABT D-01 PRM amputation / L-7 non-PRM stuck repro on NAMED routes.
// forced  — ABL D-17 · ABT D-08 rest · ABN U-11 Chromium forced-colors arm.
// rtl     — ABT D-11 render with dir=rtl.
// coarse  — ABN U-9 emulated coarse ≥1024 tap (NOT a real device).
// swap    — ABN U-10 pointer parked on a seat across a keyboard-driven route change.
import { chromium } from "playwright";
import { boot, parkOnDock, parkAway, dockState, toolsState, barState, save, EVID, ORIGIN } from "./lib.mjs";

const ROUTES = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob", "/admin/users", "/admin/names", "/no-such-route"];

async function openBar(page) {
    await parkOnDock(page);
    if (/collapsed/.test((await dockState(page)).cls)) { await page.locator(".glass-dock.collapsed").click(); await page.waitForTimeout(900); await parkOnDock(page); }
    const t = page.getByRole("button", { name: "Toggle action bar" });
    if (!(await t.count())) return false;
    await t.click({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(800);
    return true;
}

const CELLS = {
    async routes(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const out = [];
        try {
            const page = await ctx.newPage();
            const cdp = await ctx.newCDPSession(page);
            for (const r of ROUTES) {
                await boot(page, r, 2400);
                const tools = await toolsState(page);
                await cdp.send("Accessibility.enable");
                const ax = await cdp.send("Accessibility.getFullAXTree");
                const n = ax.nodes.find((x) => x.name?.value === "Toggle action bar");
                const row = { route: r, resolved: await page.evaluate(() => location.hash + " · " + document.title), slotVisible: tools.slotClass?.includes("is-visible") ?? null, slotW: tools.slotRect?.w ?? null, slotInert: tools.slotInert ?? null, btnW: tools.btnRect?.w ?? null,
                    ax: n ? { ignored: n.ignored, reasons: (n.ignoredReasons ?? []).map((x) => x.name), pressed: n.properties?.find((p) => p.name === "pressed")?.value?.value ?? null } : "absent" };
                if (row.slotVisible && (await openBar(page))) {
                    const b = await barState(page);
                    row.bar = { endGaps: b.endGaps, interGaps: b.interGaps, pitch: b.pitch, row: b.row, seatCount: b.seats.length,
                        seats: b.seats.map((s) => ({ t: s.token, st: s.state, dis: s.disabledAttr, aria: s.ariaDisabled, cursor: s.cursor, hoverColor: /--hover-color:\s*([^;]+)/.exec(s.glyph?.style ?? "")?.[1] ?? null })) };
                    const dead = b.seats.find((s) => s.disabledAttr || s.ariaDisabled === "true");
                    if (dead) {
                        await page.mouse.move(dead.btn.x + dead.btn.w / 2, dead.btn.y + dead.btn.h / 2);
                        await page.waitForTimeout(500);
                        row.deadHover = { token: dead.token, ...(await page.evaluate((tok) => { const g = document.querySelector(`[data-scene-action="${tok}"] svg`); const cs = getComputedStyle(g); return { hover: g.matches(":hover"), transform: cs.transform, stroke: cs.stroke, btnCursor: getComputedStyle(g.closest("button")).cursor }; }, dead.token)) };
                    }
                }
                out.push(row);
            }
        } finally { await ctx.close(); }
        return out;
    },

    async mobile(browser) {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
        const out = [];
        try {
            const page = await ctx.newPage();
            for (const r of ["/", "/mix", "/gradient", "/generate", "/palettes"]) {
                await boot(page, r, 2400);
                const t = await toolsState(page);
                out.push({ route: r, coarse: await page.evaluate(() => matchMedia("(pointer: coarse)").matches), slotW: t.slotRect?.w, slotVisible: t.slotClass, btn: t.btnRect, label: t.label?.text ?? null, svgs: t.svgs?.map((s) => [s.w, s.h]) });
            }
            await boot(page, "/", 2400);
            await page.screenshot({ path: `${EVID}mobile-390-dock.png`, clip: { x: 0, y: 0, width: 390, height: 90 } });
        } finally { await ctx.close(); }
        return out;
    },

    async zoom(browser) {
        const ctx = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await boot(page, "/", 2400);
            const t = await toolsState(page);
            await page.screenshot({ path: `${EVID}zoom200-dock.png`, clip: { x: 0, y: 0, width: 720, height: 80 } });
            return { cssViewport: "720x450 @2 (=1440x900 at 200%)", btn: t.btnRect, label: t.label, ariaLabel: "Toggle action bar", slotW: t.slotRect?.w };
        } finally { await ctx.close(); }
    },

    async prm(browser) { return roundTrip(browser, "reduce"); },
    async noprm(browser) { return roundTrip(browser, "no-preference"); },

    async forced(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
        try {
            const page = await ctx.newPage();
            await boot(page, "/", 2400);
            await parkOnDock(page);
            const read = () => page.evaluate(() => {
                const q = (s) => document.querySelector(s);
                const pick = (el) => el && { stroke: getComputedStyle(el).stroke, color: getComputedStyle(el).color, fca: getComputedStyle(el).forcedColorAdjust };
                return { mq: matchMedia("(forced-colors: active)").matches, toolsSvg: pick(q('[aria-label="Toggle action bar"] svg')), toolsLabel: pick(q('[aria-label="Toggle action bar"] span')), toolsBtn: (() => { const b = q('[aria-label="Toggle action bar"]'); const cs = getComputedStyle(b); return { border: cs.border, outline: cs.outline, bg: cs.backgroundColor }; })(),
                    seatSvg: pick(q("[data-scene-action] svg")), inputToggleSvg: pick(q(".toggle-btn")) };
            });
            const rest = await read();
            await page.screenshot({ path: `${EVID}forced-rest-dock.png`, clip: { x: 400, y: 0, width: 640, height: 80 } });
            await page.getByRole("button", { name: "Toggle action bar" }).click();
            await page.waitForTimeout(800);
            const bar = await read();
            await page.getByRole("button", { name: "Back" }).focus();
            await page.keyboard.press("Tab");
            const seatFocus = await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { label: a.getAttribute("aria-label"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, boxShadow: cs.boxShadow }; });
            await page.screenshot({ path: `${EVID}forced-bar-seatfocus.png`, clip: { x: 400, y: 0, width: 640, height: 80 } });
            return { rest, bar, seatFocus };
        } finally { await ctx.close(); }
    },

    async rtl(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await boot(page, "/", 2400);
            const shipped = await page.evaluate(() => ({ htmlDir: document.documentElement.getAttribute("dir"), anyRtl: !!document.querySelector('[dir="rtl"]') }));
            await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
            await page.waitForTimeout(800);
            await parkOnDock(page);
            const arrow = await page.evaluate(() => { const b = document.querySelector('[aria-label="Toggle action bar"]'); const svgs = [...b.querySelectorAll("svg")]; return svgs.map((s) => ({ cls: s.getAttribute("class").split(" ").slice(0, 3).join(" "), x: +s.getBoundingClientRect().x.toFixed(1), transform: getComputedStyle(s).transform, display: getComputedStyle(s).display })); });
            await page.screenshot({ path: `${EVID}rtl-forced-dock.png`, clip: { x: 400, y: 0, width: 640, height: 80 } });
            return { shipped, arrow };
        } finally { await ctx.close(); }
    },

    async coarse(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, hasTouch: true, isMobile: false });
        try {
            const page = await ctx.newPage();
            await boot(page, "/", 2400);
            const coarse = await page.evaluate(() => matchMedia("(pointer: coarse)").matches);
            const b0 = await toolsState(page);
            await page.getByRole("button", { name: "Toggle action bar" }).tap();
            await page.waitForTimeout(900);
            const bar = await barState(page);
            const seat = bar.seats.find((s) => s.token === "color.random") ?? bar.seats[0];
            const colorBefore = await page.evaluate(() => document.title + " | " + (document.querySelector('[aria-label="Toggle action bar"] svg')?.getAttribute("style") ?? ""));
            await page.touchscreen.tap(seat.btn.x + seat.btn.w / 2, seat.btn.y + seat.btn.h / 2);
            await page.waitForTimeout(700);
            const hints = await page.evaluate(() => [...document.querySelectorAll("p.text-subheading")].filter((p) => p.getBoundingClientRect().width > 0).map((p) => p.textContent.trim()));
            const colorAfter = await page.evaluate(() => document.title + " | " + (document.querySelector('[aria-label="Toggle action bar"] svg')?.getAttribute("style") ?? ""));
            return { coarse, toolsBtn: b0.btnRect, seat: seat.token, seatBtn: seat.btn, hintsAfterTap: hints, actionFired: colorBefore !== colorAfter, colorBefore, colorAfter };
        } finally { await ctx.close(); }
    },

    async swap(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await boot(page, "/gradient", 2400);
            await openBar(page);
            const bar = await barState(page);
            const seat = bar.seats[1] ?? bar.seats[0];
            await page.mouse.move(seat.btn.x + seat.btn.w / 2, seat.btn.y + seat.btn.h / 2);
            await page.waitForTimeout(900);
            const hints = () => page.evaluate(() => [...document.querySelectorAll("p.text-subheading")].filter((p) => p.getBoundingClientRect().width > 0).map((p) => { const r = p.getBoundingClientRect(); return { text: p.parentElement.textContent.trim().slice(0, 60), x: +r.x.toFixed(1) }; }));
            const before = { seat: seat.token, hints: await hints(), tokens: bar.seats.map((s) => s.token) };
            // keyboard-driven route change: the hash moves while the pointer stays parked.
            await page.evaluate(() => { location.hash = "#/mix"; });
            await page.waitForTimeout(1500);
            const b2 = await barState(page);
            const after = { hash: await page.evaluate(() => location.hash), barPresent: b2.present, tokens: b2.seats?.map((s) => s.token), hints: await hints(),
                underPointer: await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e?.closest("button")?.getAttribute("aria-label") ?? e?.tagName; }, [seat.btn.x + seat.btn.w / 2, seat.btn.y + seat.btn.h / 2]) };
            await page.screenshot({ path: `${EVID}swap-route-hint.png`, clip: { x: 300, y: 0, width: 840, height: 200 } });
            return { before, after, note: "route change driven by location.hash (keyboard-equivalent: no pointer event), pointer never moved" };
        } finally { await ctx.close(); }
    },
};

async function roundTrip(browser, reducedMotion) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion });
    const out = { reducedMotion, legs: [] };
    try {
        const page = await ctx.newPage();
        await boot(page, "/gradient", 2400);
        await parkOnDock(page);
        const snap = async (label) => { const t = await toolsState(page); out.legs.push({ label, cls: t.slotClass, overflow: t.innerOverflow, slotW: t.slotRect?.w }); };
        await snap("gradient-boot");
        for (const [to, label] of [["#/atmosphere", "→atmosphere"], ["#/gradient", "→gradient"], ["#/atmosphere", "→atmosphere-2"], ["#/gradient", "→gradient-2"]]) {
            await page.evaluate((h) => { location.hash = h; }, to);
            await page.waitForTimeout(1500);
            await snap(label);
        }
        // Hover the Tools trigger: the producer capsule scales ×1.1 — measure what the inner box clips.
        const btn = page.getByRole("button", { name: "Toggle action bar" });
        const bb = await btn.boundingBox();
        await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
        await page.waitForTimeout(700);
        out.hover = await page.evaluate(() => {
            const b = document.querySelector('[aria-label="Toggle action bar"]');
            const inner = b.closest(".action-bar-toggle-inner");
            const br = b.getBoundingClientRect(), ir = inner.getBoundingClientRect();
            const ov = getComputedStyle(inner).overflow;
            return { overflow: ov, btn: [br.x, br.right, br.y, br.bottom].map((v) => +v.toFixed(2)), inner: [ir.x, ir.right, ir.y, ir.bottom].map((v) => +v.toFixed(2)),
                clippedPx: ov === "visible" ? 0 : { l: +(ir.x - br.x).toFixed(2), r: +(br.right - ir.right).toFixed(2), t: +(ir.y - br.y).toFixed(2), b: +(br.bottom - ir.bottom).toFixed(2) }, transform: getComputedStyle(b).transform, boxShadow: getComputedStyle(b).boxShadow.slice(0, 80) };
        });
        await page.screenshot({ path: `${EVID}${reducedMotion === "reduce" ? "prm" : "noprm"}-tools-hover.png`, clip: { x: bb.x - 30, y: bb.y - 15, width: bb.width + 60, height: bb.height + 30 } });
    } finally { await ctx.close(); }
    return out;
}

const want = (process.env.CELLS ?? Object.keys(CELLS).join(",")).split(",");
const browser = await chromium.launch();
try {
    for (const name of want) {
        try { save(`cell-${name}.json`, await CELLS[name](browser)); console.log(name, "ok"); }
        catch (e) { save(`cell-${name}.json`, { error: String(e.message).split("\n").slice(0, 3).join(" | ") }); console.log(name, "ERR", String(e.message).split("\n")[0]); }
    }
} finally { await browser.close(); }
void parkAway; void ORIGIN;
