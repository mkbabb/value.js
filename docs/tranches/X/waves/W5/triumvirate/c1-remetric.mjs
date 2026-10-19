// SERVED MODEL: claude-fable-5-1
//
// X.W5.t — gate C1 under the §0aq RE-METRIC (COHESION §0aq X-W5 block, dated
// 2026-09-22): "C1 reads `textContent` ≥ 0.9; rider: every About section
// stays reachable by scroll at 390 (one assertion in the same probe).
// Shrinking desktop is still caught by the existing clause."
//
// Per route (the fifteen `VIEW_MAP` members + the 404 witness), at 390×844
// and 1440×900: `<main>` `textContent` length (the parity metric), `innerText`
// length (the born-red literal, recorded beside — it omits
// `content-visibility: auto` sections that sit off-viewport by specification,
// which is the browser's optimisation and not amputation), and the count of
// `content-visibility: auto` carriers. Ratio = narrow / wide of `textContent`.
// The desktop-shrink clause: the 1440 `textContent` is also compared against
// the banked green record's `textContentWide` per route.
//
// THE ABOUT-SCROLL RIDER (390×844, `#/`): every `<section>` / `<h2>` inside the
// About region (`.pane-wrapper--inspector`) is scrolled into view by
// `scrollIntoView` and then read back: its bounding box must intersect the
// viewport AND its `innerText` must be non-empty after the scroll (the
// `content-visibility: auto` section has rendered). A section that cannot be
// brought into the viewport, or that stays empty once there, fails the rider.
// The scroll container is whichever ancestor actually scrolled (document or
// the card's own `overflow-y:auto`), recorded per section.
//
// Usage: PROBE_BASE=http://127.0.0.1:<port> node c1-remetric.mjs  (the BUILT
// bundle). Output: JSON on stdout; exit 0 iff every route ratio ≥ 0.9 AND the
// rider holds.

import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.PROBE_BASE ?? "http://localhost:8091";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROUTES = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob", "/admin/users", "/admin/names", "/admin/audit", "/admin/flagged", "/admin/tags", "/does-not-exist"];
let banked = null;
try { banked = JSON.parse(readFileSync(path.join(HERE, "../green/C1-C2-C5-C6-2026-09-22.json"), "utf8")); } catch { banked = null; }

function readMain() {
    const main = document.querySelector("main");
    const all = main ? [...main.querySelectorAll("*")] : [];
    return {
        textContent: (main?.textContent ?? "").replace(/\s+/g, " ").trim().length,
        innerText: (main?.innerText ?? "").replace(/\s+/g, " ").trim().length,
        cvAuto: all.filter((n) => getComputedStyle(n).contentVisibility === "auto").length,
        regions: [...document.querySelectorAll(".pane-wrapper")].map((el) => ({ label: el.getAttribute("aria-label"), w: el.offsetWidth, h: el.offsetHeight, textContent: (el.textContent ?? "").replace(/\s+/g, " ").trim().length })),
        h1: document.querySelector("main h1")?.textContent?.trim() ?? null,
    };
}

async function aboutRider(page) {
    return page.evaluate(async () => {
        const about = document.querySelector(".pane-wrapper--inspector");
        if (!about) return { ok: false, reason: "no inspector region on #/", sections: [] };
        const targets = [...about.querySelectorAll("section, h2")];
        const vh = innerHeight;
        const out = [];
        for (const el of targets) {
            const before = { docY: scrollY, cardY: null };
            el.scrollIntoView({ block: "center", inline: "nearest" });
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const r = el.getBoundingClientRect();
            const inView = r.bottom > 0 && r.top < vh && r.height > 0;
            let scroller = "document";
            let a = el.parentElement;
            while (a && a !== document.body) { const cs = getComputedStyle(a); if (/(auto|scroll)/.test(cs.overflowY) && a.scrollHeight > a.clientHeight && a.scrollTop > 0) { scroller = a.className.toString().split(" ").slice(0, 3).join(" "); break; } a = a.parentElement; }
            const text = (el.innerText ?? "").replace(/\s+/g, " ").trim();
            out.push({ tag: el.tagName.toLowerCase(), heading: (el.matches("h2") ? el : el.querySelector("h2"))?.textContent?.trim().slice(0, 40) ?? null, top: Math.round(r.top), height: Math.round(r.height), inView, textLen: text.length, scroller, docYBefore: before.docY, docYAfter: scrollY });
        }
        return { ok: out.length > 0 && out.every((s) => s.inView && s.textLen > 0), count: out.length, sections: out };
    });
}

const browser = await chromium.launch({ headless: true });
const results = [];
for (const [name, vp] of [["narrow390", { width: 390, height: 844 }], ["wide1440", { width: 1440, height: 900 }]]) {
    const ctx = await browser.newContext({ viewport: vp, colorScheme: "light", deviceScaleFactor: 2 });
    await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch { /* */ } });
    const page = await ctx.newPage();
    const rows = {};
    let rider = null;
    for (const r of ROUTES) {
        await page.goto(`${BASE}/#${r}`, { waitUntil: "load" });
        await page.waitForTimeout(r === ROUTES[0] ? 2800 : 1600);
        rows[r] = await page.evaluate(readMain);
        if (name === "narrow390" && r === "/") rider = await aboutRider(page);
    }
    await ctx.close();
    results.push({ viewport: name, rows, rider });
}
await browser.close();

const narrow = results[0].rows;
const wide = results[1].rows;
const table = ROUTES.map((r) => {
    const ratio = wide[r].textContent ? Number((narrow[r].textContent / wide[r].textContent).toFixed(4)) : null;
    const innerRatio = wide[r].innerText ? Number((narrow[r].innerText / wide[r].innerText).toFixed(4)) : null;
    const bankedWide = banked?.C1?.rows?.find((x) => x.route === r)?.textContentWide ?? null;
    return { route: r, textContentNarrow: narrow[r].textContent, textContentWide: wide[r].textContent, ratio, innerTextNarrow: narrow[r].innerText, innerTextWide: wide[r].innerText, innerTextRatio: innerRatio, cvAutoNarrow: narrow[r].cvAuto, cvAutoWide: wide[r].cvAuto, bankedTextContentWide: bankedWide, desktopShrunk: bankedWide != null ? wide[r].textContent < 0.9 * bankedWide : null, pass: ratio != null && ratio >= 0.9 };
});
const rider = results[0].rider;
const pass = table.every((t) => t.pass) && !!rider?.ok && !table.some((t) => t.desktopShrunk);
console.log(JSON.stringify({ gate: "C1 (§0aq re-metric)", probe: "c1-remetric.mjs", servedModel: "claude-fable-5-1", unit: "X.W5.t", at: new Date().toISOString(), base: BASE, metric: "main textContent narrow/wide ≥ 0.9; innerText beside; About-scroll rider at 390", routes: table.length, passing: table.filter((t) => t.pass).length, rider, table, pass }, null, 2));
process.exit(pass ? 0 : 1);
