// CHALLENGE-D pass 3 — probe D4b.
// Decides: (a) the duplicated count datum, (b) whether Tailwind 4 `ring-2` is a box-shadow,
// (c) the WatercolorDot trio species on an Admin route, (d) live-region census,
// (e) the 390 toolbar rail geometry.
// Read-only against the live dev server. No repo source touched.
import { chromium } from "playwright";

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/admin/users", { waitUntil: "networkidle", timeout: 45000 });
await p.waitForTimeout(2500);

const out = await p.evaluate(() => {
    // (a) every leaf node in <main> rendering the roster count
    const nodes = [...document.querySelectorAll("main *")].filter(
        (e) => e.children.length === 0 && /^0( users?)?$/.test((e.textContent || "").trim()),
    );
    const dup = nodes.map((e) => {
        const r = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        return {
            t: e.textContent.trim(), tag: e.tagName, cls: String(e.className).slice(0, 60),
            x: Math.round(r.x), y: Math.round(r.y), font: cs.fontFamily.split(",")[0], size: cs.fontSize,
        };
    });

    // (b) what `ring-2 ring-ring` actually compiles to
    const probe = document.createElement("div");
    probe.className = "ring-2 ring-ring";
    document.body.appendChild(probe);
    const pcs = getComputedStyle(probe);
    const ring = { boxShadow: pcs.boxShadow, outline: pcs.outlineStyle + " " + pcs.outlineWidth };
    probe.remove();

    // (c) EmptyState ghost trio species on this route
    const trio = [...document.querySelectorAll('[data-slot="empty-state-trio"]')].map((e) => {
        const r = e.getBoundingClientRect();
        return {
            n: e.children.length, w: Math.round(r.width), h: Math.round(r.height),
            ariaHidden: e.getAttribute("aria-hidden"),
            childColors: [...e.children].map((c) => c.getAttribute("style") || "").slice(0, 3),
        };
    });

    // (d) live-region census
    const live = [...document.querySelectorAll('[role="status"],[role="alert"],[aria-live]')].map(
        (e) => `${e.getAttribute("role") || e.getAttribute("aria-live")}: ${(e.textContent || "").trim().slice(0, 50)}`,
    );
    return { dupCount: dup, ring, trio, live };
});
console.log("DESKTOP", JSON.stringify(out, null, 1));

// (e) 390 rail geometry
const ctx2 = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p2 = await ctx2.newPage();
await p2.goto("http://localhost:9000/#/admin/users", { waitUntil: "networkidle", timeout: 45000 });
await p2.waitForTimeout(2500);
const m = await p2.evaluate(() => {
    const btns = [...document.querySelectorAll("button")].filter((x) => /Prune empty|Refresh/.test(x.textContent || ""));
    const cnt = [...document.querySelectorAll("span")].find((s) => /^\d+ users?$/.test((s.textContent || "").trim()));
    const row = btns[0] ? btns[0].parentElement : null;
    const rect = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
    return {
        btns: btns.map((x) => ({ t: x.textContent.trim(), ...rect(x) })),
        count: cnt ? rect(cnt) : null,
        toolbar: row ? rect(row) : null,
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
});
console.log("MOBILE390", JSON.stringify(m, null, 1));
await b.close();
