// SERVED MODEL: claude-opus-5-5
// X.W12U.m3 — R-m-2 (COHESION §0fh.5): the route H1's type rung. Reads the H1's computed font-size,
// font-family and box, the caption/micro/small rungs resolved on the same page, the dock band and the
// stage top. GREEN iff the H1's font-size equals a resolved rung (caption: the nearest to the prior
// 13 px) and its box fits the title band (h1 top >= band bottom, h1 bottom <= stage top), and the
// display face is kept (family contains the display stack's first family).
// Usage: node probe-h1-rung-m3.mjs <width> <height> [light|dark] [route]
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 844), Number(process.argv[3] ?? 390)];
const theme = process.argv[4] ?? "light";
const route = process.argv[5] ?? "/";
const phone = Math.min(W, H) < 600;
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, user: true });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:9000/#${route}`, { timeout: 90000 });
    await p.locator("h1.route-title").waitFor({ timeout: 60000 });
    await p.waitForTimeout(1200);
    const g = await p.evaluate(() => {
        const h1 = document.querySelector("h1.route-title");
        const cs = getComputedStyle(h1);
        const rung = (v) => { const e = document.createElement("span"); e.style.fontSize = `var(${v})`; document.body.append(e); const px = getComputedStyle(e).fontSize; e.remove(); return px; };
        const r = h1.getBoundingClientRect();
        const band = document.querySelector(".dock-band").getBoundingClientRect();
        const stage = document.querySelector(".pane-wrapper--stage")?.getBoundingClientRect();
        const display = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || getComputedStyle(document.documentElement).getPropertyValue("--font-stack-display").trim();
        return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, family: cs.fontFamily.slice(0, 60), displayToken: display.slice(0, 60), rungs: { micro: rung("--text-micro"), caption: rung("--text-caption"), small: rung("--text-small") }, h1: [Math.round(r.top), Math.round(r.bottom)], bandBottom: Math.round(band.bottom), stageTop: stage ? Math.round(stage.top) : null };
    });
    const onRung = g.fontSize === g.rungs.caption;
    const fits = g.h1[0] >= g.bandBottom && (g.stageTop === null || g.h1[1] <= g.stageTop);
    const face = g.displayToken === "" || g.family.split(",")[0].replace(/["']/g, "").trim() === g.displayToken.split(",")[0].replace(/["']/g, "").trim();
    console.log(`${W}x${H} ${theme} ${route}`, JSON.stringify(g), `onRung(caption) ${onRung} fits ${fits} face ${face}`, onRung && fits && face ? "GREEN" : "RED");
} finally { await b.close(); }
