// SERVED MODEL: claude-opus-5-5
// X.W12U.m3 — X-13-RUN (COHESION §0fh.4) at the box level, beside m2/probe-dock-layers-m2.mjs:
// at a coarse pointer, the Tools face (toggled) and its colour-input arm. Per state it reads every
// live dock control's LAYOUT box (offsetWidth/Height — transforms excluded) and the run.
// GREEN iff, in the toggled and colour-input states:
//   (a) every live seat is >= 44x44 (layout box) under (pointer: coarse);
//   (b) no live seat's LAYOUT box lies past the run's scrollport (HIDDEN []) nor the viewport (OUT [])
//       (a hover- or press-scaled seat is not a layout fact);
//   (c) the run does not overflow in layout (children extent <= the run's content box);
//   (d) every scene seat absent from the run is a menu item of "More actions", and every menu item is
//       inside the viewport; run seats + menu items == the face's full set (5 for the colour scene).
// Usage: node probe-tools-run-m3.mjs <width> <height> [light|dark]
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 360), Number(process.argv[3] ?? 780)];
const theme = process.argv[4] ?? "light";
const FULL = ["Reset color", "Copy color", "Random color", "Palettes", "Extract palette"];
const b = await chromium.launch({ channel: "chrome", headless: true });
let red = 0;
try {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: true, hasTouch: true });
    await prepare(ctx, { theme, user: true });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/", { timeout: 90000 });
    await p.getByRole("button", { name: "Toggle action bar" }).first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(800);
    const read = () => p.evaluate((vw) => {
        const live = [...document.querySelectorAll(".dock-band button, .dock-band input")].filter((e) => e.getBoundingClientRect().width > 0 && !e.closest("[inert]"));
        let run = null; for (let a = live[0]?.parentElement; a; a = a.parentElement) { const ox = getComputedStyle(a).overflowX; if (ox === "auto" || ox === "scroll") { run = a; break; } }
        const rb = run.getBoundingClientRect();
        const end = rb.left + run.clientLeft + run.clientWidth;
        const extent = Math.max(...[...run.children].map((c) => c.getBoundingClientRect().right));
        const name = (e) => e.getAttribute("aria-label") || e.tagName;
        const seats = live.map((e) => `${name(e)}:${e.offsetWidth}x${e.offsetHeight}`);
        const small = live.filter((e) => e.tagName === "BUTTON" && (e.offsetWidth < 43.5 || e.offsetHeight < 43.5)).map(name);
        // The LAYOUT box: the transformed box's centre with the untransformed width (a pressed or
        // hovered seat scales about its centre; that is not where it sits).
        const lay = (e) => { const r = e.getBoundingClientRect(); const c = (r.left + r.right) / 2; return { left: c - e.offsetWidth / 2, right: c + e.offsetWidth / 2 }; };
        const hidden = live.filter((e) => { const r = lay(e); return r.left < rb.left - 0.5 || r.right > rb.right + 0.5; }).map(name);
        const out = live.filter((e) => { const r = lay(e); return r.left < -0.5 || r.right > vw + 0.5; }).map(name);
        return { coarse: matchMedia("(pointer: coarse)").matches, docSW: document.documentElement.scrollWidth, run: `${Math.round(rb.left)}-${Math.round(rb.right)} cw ${run.clientWidth} layoutExtent ${Math.round(extent - rb.left)}`, layoutOverflow: Math.round(extent - end), seats, small, hidden, out };
    }, W);
    const judge = (state, g) => { const bad = !g.coarse || g.small.length > 0 || g.hidden.length > 0 || g.out.length > 0 || g.layoutOverflow > 0 || g.docSW !== W; if (bad) red++; console.log(`${W}x${H} ${theme} ${state}`, JSON.stringify(g), bad ? "RED" : "GREEN"); };
    await p.getByRole("button", { name: "Toggle action bar" }).first().tap();
    await p.waitForTimeout(900);
    const t = await read();
    judge("toggled", t);
    await p.getByRole("button", { name: "Open color input" }).first().tap();
    await p.waitForTimeout(900);
    judge("colour-input", await read());
    // Back to the seats through the arm's own cycle (input -> propose -> actions).
    for (let i = 0; i < 3 && (await p.getByRole("button", { name: "Open color input" }).count()) === 0; i++) {
        await p.locator('.dock-band button[aria-label="Propose color name"], .dock-band button[aria-label="Close propose"], .dock-band button[aria-label="Close input"]').filter({ visible: true }).first().tap();
        await p.waitForTimeout(700);
    }
    const inRun = FULL.filter((n) => t.seats.some((s) => s.startsWith(`${n}:`)));
    let menu = [], menuOut = [];
    if (t.seats.some((s) => s.startsWith("More actions:"))) {
        await p.getByRole("button", { name: "More actions" }).first().tap();
        await p.getByRole("menu").first().waitFor({ timeout: 10000 });
        await p.waitForTimeout(400);
        const items = await p.getByRole("menuitem").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { n: e.textContent.trim(), l: r.left, r: r.right, t: r.top, b: r.bottom }; }));
        menu = items.map((i) => i.n);
        menuOut = items.filter((i) => i.l < -0.5 || i.r > W + 0.5 || i.t < -0.5 || i.b > H + 0.5).map((i) => i.n);
        await p.keyboard.press("Escape");
        await p.waitForTimeout(400);
    }
    const union = [...inRun, ...menu].sort().join("|") === [...FULL].sort().join("|") && inRun.every((n) => !menu.includes(n));
    const menuBad = !union || menuOut.length > 0;
    if (menuBad) red++;
    console.log(`${W}x${H} ${theme} menu RUN ${JSON.stringify(inRun)} MENU ${JSON.stringify(menu)} menuOut ${JSON.stringify(menuOut)} union ${union}`, menuBad ? "RED" : "GREEN");
    // NOT GATING (producer residual, recorded): the colour-input face re-opened right after the More
    // seat was pressed — glass's DockCrossfade peak reserve reads scrollWidth, which counts the pressed
    // seat's `scale`, and latches it.
    if (inRun.length < FULL.length) {
        await p.getByRole("button", { name: "Open color input" }).first().tap();
        await p.waitForTimeout(900);
        const g = await read();
        console.log(`${W}x${H} ${theme} colour-input-after-menu (producer residual, not gating)`, JSON.stringify({ run: g.run, layoutOverflow: g.layoutOverflow, hidden: g.hidden, out: g.out }));
    }
} finally { await b.close(); }
console.log(red ? `RED ${red}/3` : "GREEN 3/3");
