// glass-10.1.2 live probe (keyframes + fourier share this file): the declared-seat
// contract (G-4 b-ii) and the O-101 resize read. Headless Chromium (Playwright's
// default headless shell), ONE browser per run, a new context per cell, every
// context and the browser closed in finally.
//
// Usage: node <this> <origin> <routes-json> <out.json>
//   routes-json: [{ "name": "home", "path": "/#/", "prep": "canvas-tab"? }]
//
// Keyboard read, per route at 1440x900 and 390x844, per glass dock on the page:
//   - the run's direct children: declared (data-glass-dock-seat), separator,
//     reka form select, or undeclared; and every tabbable inside an undeclared child;
//   - role: `toolbar` must appear iff >=1 declared seat and every child is declared
//     (glass separator / reka form select aside);
//   - Tab walk (forward from the dock's first tabbable, until focus leaves the dock):
//     the stops must be exactly {persistent tabbables} + {ONE declared run stop} +
//     {every tabbable inside an undeclared child};
//   - arrows: from the run's stop, ArrowRight/Down x(n+1), then Home, End: every
//     landing is a declared seat, in order, no wrap; an arrow pressed inside an
//     undeclared child never moves focus onto a declared seat.
// Resize read, per route: docks collapsed at 1440, rAF-sampled through 1440->390,
//   an expand at 390, a collapse, 390->1440 and an expand at 1440: every frame's
//   documentElement scrollWidth vs clientWidth (and body's).
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const [origin, routesJson, out] = process.argv.slice(2);
const routes = JSON.parse(routesJson);
const VIEWPORTS = [
    { name: "1440", width: 1440, height: 900 },
    { name: "390", width: 390, height: 844 },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function prep(page, route) {
    if (route.prep === "canvas-tab" && page.viewportSize().width < 640) {
        const tab = page.getByRole("tab", { name: "Canvas" });
        if (await tab.isVisible().catch(() => false)) await tab.click().catch(() => {});
        await sleep(800);
    }
}

async function docks(page) {
    return page.evaluate(() =>
        [...document.querySelectorAll(".glass-dock")].map((d, i) => {
            d.setAttribute("data-probe-dock", String(i));
            const r = d.getBoundingClientRect();
            return { i, cls: d.className, visible: r.width > 0 && r.height > 0 && getComputedStyle(d).visibility !== "hidden",
                box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] };
        }),
    );
}

async function settle(page, i, want) {
    const d = page.locator(`[data-probe-dock="${i}"]`);
    const t0 = Date.now();
    while (Date.now() - t0 < 8000) {
        const s = await d.evaluate((el) => ({ exp: el.classList.contains("expanded"), m: el.hasAttribute("data-morphing") })).catch(() => null);
        if (s && s.exp === want && !s.m) return true;
        await sleep(100);
    }
    return false;
}

async function expand(page, i) {
    const d = page.locator(`[data-probe-dock="${i}"]`);
    const b = await d.boundingBox();
    if (!b) return false;
    await page.mouse.move(2, 2); // leave first, so the move in is a fresh mouseenter
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    return settle(page, i, true);
}

// In-page: classify the run and tag every tabbable inside the dock.
async function anatomy(page, i) {
    return page.locator(`[data-probe-dock="${i}"]`).evaluate((dock) => {
        const SEAT = "data-glass-dock-seat";
        let n = 0;
        const tag = (el) => {
            if (!el.hasAttribute("data-probe-id")) el.setAttribute("data-probe-id", `d${dock.dataset.probeDock}-e${n++}`);
            return el.getAttribute("data-probe-id");
        };
        const name = (el) => (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
        const tabbable = (el) => {
            if (el.tabIndex < 0 || el.matches(":disabled") || el.closest("[inert]")) return false;
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none";
        };
        const FOCUSABLE = "a[href],button,input,select,textarea,[tabindex],[contenteditable=true],summary";
        const run = dock.querySelector(".dock-run");
        const orientation = dock.classList.contains("vertical") ? "vertical" : "horizontal";
        const kids = [...run.children].map((c) => {
            const declared = c.hasAttribute(SEAT);
            const sep = c.classList.contains("dock-separator");
            const formSelect = c.matches('select[aria-hidden="true"][tabindex="-1"]');
            const inner = declared ? [] : [c, ...c.querySelectorAll("*")].filter((e) => e.matches(FOCUSABLE) || e.tabIndex >= 0).filter(tabbable).map((e) => ({ id: tag(e), name: name(e), tag: e.tagName, tabIndex: e.tabIndex }));
            const minus1Inner = declared ? [] : [...c.querySelectorAll("[tabindex='-1']")].filter((e) => !e.matches('select[aria-hidden="true"]')).map((e) => ({ id: tag(e), name: name(e), tag: e.tagName }));
            return { id: tag(c), tag: c.tagName, cls: String(c.className).slice(0, 60), name: name(c), declared, sep, formSelect,
                tabIndex: declared ? c.tabIndex : null, ariaDisabled: c.getAttribute("aria-disabled"), nativeDisabled: c.matches(":disabled"),
                undeclaredTabbables: inner, undeclaredMinus1: minus1Inner };
        });
        const declared = kids.filter((k) => k.declared);
        const allDeclared = declared.length > 0 && kids.every((k) => k.declared || k.sep || k.formSelect);
        const role = run.getAttribute("role");
        const ariaOrientation = run.getAttribute("aria-orientation");
        const runStops = declared.filter((k) => k.tabIndex === 0).map((k) => k.id);
        const persistent = [...dock.querySelectorAll(".dock-persistent")].flatMap((p) => [...p.querySelectorAll(FOCUSABLE)].filter(tabbable).map((e) => ({ id: tag(e), name: name(e) })));
        const expected = [...persistent.map((p) => p.id), ...runStops, ...kids.flatMap((k) => k.undeclaredTabbables.map((t) => t.id))];
        return { orientation, kids, declaredCount: declared.length, allDeclared, role, ariaOrientation,
            roleOk: allDeclared ? role === "toolbar" && ariaOrientation === orientation : role === null,
            runStops, runStopOk: declared.length === 0 || runStops.length === 1, persistent, expected };
    });
}

const activeId = (page) => page.evaluate(() => document.activeElement?.getAttribute("data-probe-id") ?? `${document.activeElement?.tagName}.${String(document.activeElement?.className).slice(0, 30)}`);
const inDock = (page, i) => page.evaluate((i) => !!document.activeElement?.closest(`[data-probe-dock="${i}"]`), i);

async function tabWalk(page, i, a) {
    const first = a.expected[0];
    if (!first) return { stops: [], note: "no tabbable" };
    await page.locator(`[data-probe-id="${first}"]`).focus();
    const stops = [await activeId(page)];
    for (let k = 0; k < 40; k++) {
        await page.keyboard.press("Tab");
        if (!(await inDock(page, i))) break;
        stops.push(await activeId(page));
    }
    // and backward from the first, to catch anything ahead of it in the dock
    await page.locator(`[data-probe-id="${first}"]`).focus();
    const back = [];
    for (let k = 0; k < 40; k++) {
        await page.keyboard.press("Shift+Tab");
        if (!(await inDock(page, i))) break;
        back.push(await activeId(page));
    }
    const walked = [...new Set([...back.reverse(), ...stops])];
    const missing = a.expected.filter((e) => !walked.includes(e));
    const extra = walked.filter((e) => !a.expected.includes(e));
    // An extra stop the anatomy's visibility filter did not list (e.g. a slider thumb
    // painted 0x0 at read time) is classified where focus actually landed: inside an
    // undeclared run child it IS an undeclared control keeping its own Tab stop (the
    // contract); anywhere else (a second declared stop) it fails.
    const extraClass = await page.evaluate(({ i, extra }) => {
        const dock = document.querySelector(`[data-probe-dock="${i}"]`);
        const run = dock.querySelector(".dock-run");
        // re-walk is not possible here; classify by the walk's recorded descriptor
        return extra.map((e) => {
            const el = dock.querySelector(`[data-probe-id="${e}"]`) ?? [...dock.querySelectorAll("*")].find((x) => `${x.tagName}.${String(x.className).slice(0, 30)}` === e);
            if (!el) return { e, where: "unknown" };
            const kid = [...run.children].find((c) => c.contains(el));
            return { e, where: kid ? (kid.hasAttribute("data-glass-dock-seat") ? "declared" : "undeclared-child") : "outside-run" };
        });
    }, { i, extra });
    const badExtra = extraClass.filter((x) => x.where !== "undeclared-child");
    return { walked, missing, extra, extraClass, ok: missing.length === 0 && badExtra.length === 0 };
}

async function arrows(page, a, i) {
    const declared = a.kids.filter((k) => k.declared).map((k) => k.id);
    const res = { declared, walk: [], ok: true, undeclared: [] };
    if (declared.length) {
        const next = a.orientation === "vertical" ? "ArrowDown" : "ArrowRight";
        await page.locator(`[data-probe-id="${declared[0]}"]`).focus();
        res.walk.push(await activeId(page));
        for (let k = 0; k < declared.length; k++) {
            await page.keyboard.press(next);
            res.walk.push(await activeId(page));
        }
        await page.keyboard.press("Home");
        res.home = await activeId(page);
        await page.keyboard.press("End");
        res.end = await activeId(page);
        const expectWalk = [...declared, declared[declared.length - 1]];
        res.ok = JSON.stringify(res.walk) === JSON.stringify(expectWalk) && res.home === declared[0] && res.end === declared[declared.length - 1];
    }
    for (const k of a.kids.filter((k) => !k.declared)) {
        for (const t of k.undeclaredTabbables) {
            if (t.tag === "INPUT") { res.undeclared.push({ id: t.id, name: t.name, skipped: "input (its own keys)" }); continue; }
            await page.locator(`[data-probe-id="${t.id}"]`).focus();
            if ((await activeId(page)) !== t.id) { res.undeclared.push({ id: t.id, name: t.name, skipped: "could not focus (dock not expanded)" }); res.ok = false; continue; }
            await page.keyboard.press(a.orientation === "vertical" ? "ArrowDown" : "ArrowRight");
            const after = await activeId(page);
            const ontoSeat = declared.includes(after);
            res.undeclared.push({ id: t.id, name: t.name, after, ontoSeat });
            if (ontoSeat) res.ok = false;
            await page.keyboard.press("Escape");
            await expand(page, i); // an Escape may collapse the dock; re-open it before the next control
        }
    }
    return res;
}

async function keyboardCell(browser, route, vp) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    try {
        const page = await ctx.newPage();
        await page.goto(`${origin}${route.path}`, { waitUntil: "load", timeout: 120_000 });
        await sleep(3000);
        await prep(page, route);
        const list = await docks(page);
        const outDocks = [];
        for (const d of list.filter((x) => x.visible)) {
            const exp = d.cls.includes("expanded") ? true : await expand(page, d.i);
            const a = await anatomy(page, d.i);
            const tab = await tabWalk(page, d.i, a);
            const arr = await arrows(page, a, d.i);
            outDocks.push({ dock: d, expanded: exp, anatomy: a, tab, arrows: arr, ok: a.roleOk && a.runStopOk && tab.ok && arr.ok });
            await page.keyboard.press("Escape");
            await page.mouse.move(2, vp.height / 2);
            await sleep(400);
        }
        return { docks: outDocks, ok: outDocks.every((d) => d.ok) };
    } finally {
        await ctx.close();
    }
}

async function sample(page, ms) {
    return page.evaluate((ms) => new Promise((resolve) => {
        const frames = [];
        const t0 = performance.now();
        const de = document.documentElement;
        const tick = () => {
            const ds = [...document.querySelectorAll(".glass-dock")].map((d) => ({
                exp: d.classList.contains("expanded"), m: d.hasAttribute("data-morphing"),
                px: getComputedStyle(d).getPropertyValue("--dock-expanded-px").trim(), w: Math.round(d.getBoundingClientRect().width),
                over: Math.round(Math.max(d.getBoundingClientRect().right - innerWidth, -d.getBoundingClientRect().left)) }));
            frames.push({ t: Math.round(performance.now() - t0), sw: de.scrollWidth, cw: de.clientWidth, bsw: document.body.scrollWidth, bcw: document.body.clientWidth, iw: innerWidth, ds });
            if (performance.now() - t0 < ms) requestAnimationFrame(tick); else resolve(frames);
        };
        requestAnimationFrame(tick);
    }), ms);
}
const summarize = (phase, frames) => {
    // html/body may clip (overflow-x hidden), so the dock's own box past the viewport is read too.
    const bad = frames.filter((f) => f.sw > f.cw || f.bsw > f.bcw);
    const dockBad = frames.filter((f) => f.ds.some((d) => d.over > 0));
    return { phase, frames: frames.length, overflowFrames: bad.length, dockPastViewportFrames: dockBad.length,
        maxDockPastViewport: Math.max(0, ...frames.flatMap((f) => f.ds.map((d) => d.over))),
        maxOverflow: Math.max(0, ...frames.map((f) => Math.max(f.sw - f.cw, f.bsw - f.bcw))),
        firstBad: bad[0] ?? null, last: frames[frames.length - 1] };
};

async function resizeCell(browser, route) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        await page.goto(`${origin}${route.path}`, { waitUntil: "load", timeout: 120_000 });
        await sleep(3000);
        await page.mouse.move(2, 450);
        const list = await docks(page);
        const collapsible = list.filter((d) => d.visible && !d.cls.includes("always-expanded"));
        for (const d of collapsible) await settle(page, d.i, false);
        const htmlOverflowX = await page.evaluate(() => [getComputedStyle(document.documentElement).overflowX, getComputedStyle(document.body).overflowX]);
        const pre = await page.evaluate(() => [...document.querySelectorAll(".glass-dock")].map((d) => d.className));
        const phases = [];
        let p = sample(page, 2500); await sleep(50);
        await page.setViewportSize({ width: 390, height: 844 });
        phases.push(summarize("collapsed 1440->390", await p));
        await prep(page, route);
        for (const d of (await docks(page)).filter((x) => x.visible && !x.cls.includes("expanded"))) {
            const b = await page.locator(`[data-probe-dock="${d.i}"]`).boundingBox();
            if (!b) continue;
            p = sample(page, 1800); await sleep(20);
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
            phases.push({ ...summarize(`expand at 390 · dock ${d.i}`, await p), dock: d.i });
            await page.mouse.move(2, 422);
            await settle(page, d.i, false);
        }
        p = sample(page, 2500); await sleep(50);
        await page.setViewportSize({ width: 1440, height: 900 });
        phases.push(summarize("collapsed 390->1440", await p));
        for (const d of (await docks(page)).filter((x) => x.visible && !x.cls.includes("expanded"))) {
            const b = await page.locator(`[data-probe-dock="${d.i}"]`).boundingBox();
            if (!b) continue;
            p = sample(page, 1800); await sleep(20);
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
            phases.push({ ...summarize(`expand at 1440 · dock ${d.i}`, await p), dock: d.i });
            await page.mouse.move(2, 450);
            await settle(page, d.i, false);
        }
        return { pre, htmlOverflowX, phases, ok: phases.every((ph) => ph.overflowFrames === 0 && ph.dockPastViewportFrames === 0) };
    } finally {
        await ctx.close();
    }
}

const result = { origin, at: new Date().toISOString(), keyboard: {}, resize: {} };
const browser = await chromium.launch({ headless: true });
try {
    for (const route of routes) {
        for (const vp of VIEWPORTS) {
            try { result.keyboard[`${route.name}@${vp.name}`] = await keyboardCell(browser, route, vp); }
            catch (e) { result.keyboard[`${route.name}@${vp.name}`] = { error: String(e).slice(0, 300), ok: false }; }
        }
        try { result.resize[route.name] = await resizeCell(browser, route); }
        catch (e) { result.resize[route.name] = { error: String(e).slice(0, 300), ok: false }; }
    }
} finally {
    await browser.close();
}
writeFileSync(out, JSON.stringify(result, null, 1));
const brief = {
    keyboard: Object.fromEntries(Object.entries(result.keyboard).map(([k, v]) => [k, v.error ? `ERROR ${v.error}` : v.docks.map((d) => `dock${d.dock.i}:${d.ok ? "ok" : "FAIL"} role=${d.anatomy.role} declared=${d.anatomy.declaredCount}/${d.anatomy.kids.length} undeclTabbables=${d.anatomy.kids.reduce((s, k) => s + k.undeclaredTabbables.length, 0)}`).join(" | ")])),
    resize: Object.fromEntries(Object.entries(result.resize).map(([k, v]) => [k, v.error ? `ERROR ${v.error}` : v.phases.map((p) => `${p.phase}: ${p.overflowFrames}/${p.frames} max ${p.maxOverflow} dockPast ${p.dockPastViewportFrames} max ${p.maxDockPastViewport}`).join(" | ")])),
};
console.log(JSON.stringify(brief, null, 1));
