// CHALLENGE-C (2nd audit) probe C2-03 — independent live re-measurement.
// Cells: {webkit, chromium} x {no-preference, reduce} x {desktop 1440x900,
// iPhone-14 390x664} over four routes. Everything read from the SHIPPED app on
// http://localhost:9000 — no injected CSS.
import { webkit, chromium, devices } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:9000";
const ROUTES = ["/#/", "/#/gradient", "/#/palettes", "/#/admin/users"];

const READ = async () => {
    /* eslint-disable */
    const vis = (el) => el.offsetParent !== null || el.getClientRects().length > 0;
    const titles = Array.from(document.querySelectorAll(".pane-header-title"));
    const out = titles.map((t) => {
        const cs = getComputedStyle(t);
        const hdr = t.closest(".pane-header");
        const before = hdr ? getComputedStyle(hdr, "::before") : null;
        const wrap = hdr ? hdr.querySelector(".pane-header-desc-wrap") : null;
        const p = wrap ? wrap.querySelector("p") : null;
        const r = t.getBoundingClientRect();
        const hr = hdr ? hdr.getBoundingClientRect() : null;
        return {
            text: (t.textContent || "").trim().slice(0, 34),
            tag: t.tagName,
            visible: vis(t),
            ratio: cs.getPropertyValue("--pane-title-shrink-ratio").trim(),
            fontFamily: cs.fontFamily.split(",")[0],
            fontWeight: cs.fontWeight,
            fontSize: cs.fontSize,
            tf: cs.transform,
            titleH: +r.height.toFixed(2),
            titleW: +r.width.toFixed(2),
            titleRight: +r.right.toFixed(2),
            hdrH: hr ? +hr.height.toFixed(2) : null,
            hdrW: hr ? +hr.width.toFixed(2) : null,
            veil: before ? before.opacity : null,
            descOp: p ? getComputedStyle(p).opacity : null,
            descH: p ? +p.getBoundingClientRect().height.toFixed(2) : null,
            slottedEls: Array.from(t.children).map(
                (c) => c.tagName + "." + (c.className || "").toString().split(" ")[0],
            ),
        };
    });
    return {
        titles: out,
        h1: document.querySelectorAll("h1").length,
        headingOutline: Array.from(
            document.querySelectorAll("h1,h2,h3,h4,h5,h6"),
        )
            .filter(vis)
            .map((h) => h.tagName + (h.classList.contains("pane-header-title") ? "*" : ""))
            .join(" "),
    };
    /* eslint-enable */
};

const SCRUB = async (y) => {
    /* eslint-disable */
    const host = Array.from(document.querySelectorAll(".pane-scroll-fade")).find(
        (el) => el.offsetParent !== null && el.scrollHeight > el.clientHeight,
    );
    if (!host) return "NO-SCROLLABLE-HOST";
    host.scrollTop = y;
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    return host.scrollTop;
    /* eslint-enable */
};

async function run(engName, eng, ctxOpts, label, prm) {
    const b = await eng.launch();
    const ctx = await b.newContext({
        ...ctxOpts,
        reducedMotion: prm ? "reduce" : "no-preference",
    });
    const p = await ctx.newPage();
    for (const route of ROUTES) {
        await p.goto(BASE + route, { waitUntil: "load" });
        await p
            .locator("main .pane-header")
            .first()
            .waitFor({ state: "visible", timeout: 20000 })
            .catch(() => {});
        await p.waitForTimeout(1800);
        const rest = await p.evaluate(READ);
        const at = await p.evaluate(SCRUB, 300);
        await p.waitForTimeout(120);
        const stuck = await p.evaluate(READ);
        const tag = `${engName}/${label}/prm=${prm ? "reduce" : "no-pref"} ${route}`;
        console.log(`\n--- ${tag}  (scrolled to ${at}) ---`);
        console.log(`    h1Count=${rest.h1}`);
        console.log(`    outline: ${rest.headingOutline}`);
        rest.titles.forEach((r, i) => {
            const s = stuck.titles[i] ?? {};
            console.log(
                `    [${i}] "${r.text}" <${r.tag}> vis=${r.visible} ratio=${r.ratio} font=${r.fontFamily}/${r.fontWeight}/${r.fontSize} slotted=${JSON.stringify(r.slottedEls)}`,
            );
            console.log(
                `         REST  tf=${r.tf} titleW=${r.titleW} titleH=${r.titleH} right=${r.titleRight} hdrH=${r.hdrH} hdrW=${r.hdrW} veil=${r.veil} descOp=${r.descOp} descH=${r.descH}`,
            );
            console.log(
                `         STUCK tf=${s.tf} titleW=${s.titleW} titleH=${s.titleH} right=${s.titleRight} hdrH=${s.hdrH} hdrW=${s.hdrW} veil=${s.veil} descOp=${s.descOp} descH=${s.descH}`,
            );
        });
    }
    await b.close();
}

for (const [n, e] of [
    ["webkit", webkit],
    ["chromium", chromium],
]) {
    for (const prm of [false, true]) {
        await run(n, e, { viewport: { width: 1440, height: 900 } }, "desktop", prm);
    }
}
// phone arm — the "self-neutralising no-op" claim (PaneHeader.vue:136-138)
await run("webkit", webkit, devices["iPhone 14"], "iphone14", false);
await run("chromium", chromium, devices["Pixel 7"], "pixel7", false);
