// CHALLENGE-C (2nd audit) probe C2-07 — the three consequences that decide severity.
//
// (a) O-11 gate 3's assertion (`veil at scrollTop 64 === 1`) replicated VERBATIM
//     at the e2e viewport (1280x720) and at 1440x900 / 1512x982, on Gradient.
// (b) the About pane's colour-space <button> — slotted INSIDE the <h3> that the
//     shrink scales — measured rest vs scrolled on WebKit at 1280x900.
// (c) the header's pointer-opaque dead band, and whether the opacity:0
//     description still wins the hit test.
import { webkit, chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:9000";

async function open(ctx, route) {
    const p = await ctx.newPage();
    p.setDefaultNavigationTimeout(180000);
    await p.goto(BASE + route, { waitUntil: "domcontentloaded" });
    for (let i = 0; i < 6; i++) {
        const ok = await p
            .locator("main .pane-header")
            .first()
            .waitFor({ timeout: 30000 })
            .then(() => true)
            .catch(() => false);
        if (ok) break;
        await p.reload({ waitUntil: "domcontentloaded" });
    }
    await p.waitForTimeout(3500);
    return p;
}

// ---- (a) gate 3 replication -------------------------------------------------
console.log("=== (a) O-11 gate 3 assertion `at64.opacity === 1`, Gradient ===");
for (const [engName, eng] of [["chromium", chromium], ["webkit", webkit]]) {
    const b = await eng.launch();
    for (const vp of [
        { width: 1280, height: 720 },
        { width: 1440, height: 900 },
        { width: 1512, height: 982 },
    ]) {
        const ctx = await b.newContext({ viewport: vp });
        const p = await open(ctx, "/#/gradient");
        const r = await p.evaluate(async () => {
            const host = Array.from(
                document.querySelectorAll("main .pane-scroll-fade"),
            ).find(
                (el) => el.offsetParent !== null && el.scrollHeight > el.clientHeight,
            );
            if (!host) return { err: "no scrollable pane host found" };
            const hdr = host.querySelector(".pane-header");
            const read = async (y) => {
                host.scrollTop = y;
                await new Promise((r2) => requestAnimationFrame(() => r2(null)));
                await new Promise((r2) => requestAnimationFrame(() => r2(null)));
                return {
                    asked: y,
                    got: host.scrollTop,
                    veil: Number(getComputedStyle(hdr, "::before").opacity),
                };
            };
            return {
                title: (hdr.querySelector(".pane-header-title").textContent || "").trim(),
                max: host.scrollHeight - host.clientHeight,
                at48: await read(48),
                at64: await read(64),
                at300: await read(300),
            };
        });
        console.log(
            `  ${engName} ${vp.width}x${vp.height} -> ${JSON.stringify(r)}  gate3(at64===1)? ${r.at64 ? r.at64.veil === 1 : "n/a"}`,
        );
        await ctx.close();
    }
    await b.close();
}

// ---- (b) the slotted control at the pole ------------------------------------
console.log("\n=== (b) About colour-space <button>, slotted inside the <h3> ===");
{
    const b = await webkit.launch();
    for (const vp of [
        { width: 1280, height: 900 },
        { width: 1440, height: 900 },
    ]) {
        const ctx = await b.newContext({ viewport: vp });
        const p = await open(ctx, "/#/");
        const r = await p.evaluate(async () => {
            const host = Array.from(
                document.querySelectorAll("main .pane-scroll-fade"),
            ).find(
                (el) =>
                    el.offsetParent !== null &&
                    el.scrollHeight - el.clientHeight > 200,
            );
            const hdr = host.querySelector(".pane-header");
            const btn = hdr.querySelector(".pane-header-title button");
            const snap = () => {
                const q = btn.getBoundingClientRect();
                const cx = q.left + q.width / 2;
                const cy = q.top + q.height / 2;
                const hit =
                    cx >= 0 && cy >= 0 && cx <= innerWidth && cy <= innerHeight
                        ? document.elementFromPoint(cx, cy)
                        : null;
                return {
                    name: (btn.textContent || "").trim(),
                    rect: {
                        x: +q.x.toFixed(1),
                        y: +q.y.toFixed(1),
                        w: +q.width.toFixed(1),
                        h: +q.height.toFixed(1),
                    },
                    inViewport:
                        q.right > 0 && q.bottom > 0 && q.left < innerWidth && q.top < innerHeight,
                    wcag258_24px: q.width >= 24 && q.height >= 24,
                    hitAtCentre: hit ? hit.tagName + "." + (hit.className || "").toString().split(" ")[0] : "OFF-VIEWPORT",
                };
            };
            host.scrollTop = 0;
            await new Promise((r2) => requestAnimationFrame(() => r2(null)));
            const rest = snap();
            host.scrollTop = 300;
            await new Promise((r2) => requestAnimationFrame(() => r2(null)));
            await new Promise((r2) => requestAnimationFrame(() => r2(null)));
            const stuck = snap();
            return { rest, stuck };
        });
        console.log(`  webkit ${vp.width}x${vp.height}`);
        console.log(`    REST  ${JSON.stringify(r.rest)}`);
        console.log(`    STUCK ${JSON.stringify(r.stuck)}`);
        await ctx.close();
    }
    await b.close();
}

// ---- (c) the dead band -------------------------------------------------------
console.log("\n=== (c) header dead band + the opacity:0 description's hit test ===");
{
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await open(ctx, "/#/");
    const r = await p.evaluate(async () => {
        const host = Array.from(
            document.querySelectorAll("main .pane-scroll-fade"),
        ).find(
            (el) => el.offsetParent !== null && el.scrollHeight - el.clientHeight > 200,
        );
        const hdr = host.querySelector(".pane-header");
        host.scrollTop = 300;
        await new Promise((r2) => requestAnimationFrame(() => r2(null)));
        await new Promise((r2) => requestAnimationFrame(() => r2(null)));
        const h = hdr.getBoundingClientRect();
        const t = hdr.querySelector(".pane-header-title").getBoundingClientRect();
        const d = hdr.querySelector(".pane-header-desc-wrap > p");
        const dr = d.getBoundingClientRect();
        const cx = h.left + h.width / 2;
        const samples = [];
        for (let y = Math.round(t.bottom) + 2; y < h.bottom; y += 12) {
            const el = document.elementFromPoint(cx, y);
            samples.push(`${y}:${el ? el.tagName + "." + (el.className || "").toString().split(" ")[0] : "null"}`);
        }
        return {
            headerH: +h.height.toFixed(1),
            viewportH: innerHeight,
            titleBottom: +t.bottom.toFixed(1),
            headerBottom: +h.bottom.toFixed(1),
            deadBandPx: +(h.bottom - t.bottom).toFixed(1),
            deadBandPctViewport: +(((h.bottom - t.bottom) / innerHeight) * 100).toFixed(1),
            descOpacity: getComputedStyle(d).opacity,
            descRectH: +dr.height.toFixed(1),
            descAriaHidden: d.getAttribute("aria-hidden"),
            hitColumn: samples,
        };
    });
    console.log("  " + JSON.stringify(r, null, 2).replace(/\n/g, "\n  "));
    await b.close();
}
