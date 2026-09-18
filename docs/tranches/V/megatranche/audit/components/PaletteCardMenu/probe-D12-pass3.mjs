// CHALLENGE-D pass 3 — probe D12
//  A. Is the menu's own text contrast a function of USER DATA?  The panel is
//     translucent (alpha .808, backdrop blur 11px) and align="end" drops it
//     over the NEXT palette card.  Seed the neighbour dark vs light and
//     re-sample the same four elements.
//  B. Honest scroll test: a real wheel gesture over the palette list while a
//     card menu is open (probe D11 used programmatic scrollTop, which bypasses
//     hit-testing and therefore proves nothing about pointer-events:none).
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:9000";
const OUT = new URL("./probe-D12-pass3-results.json", import.meta.url).pathname;
const EV = new URL("./evidence/", import.meta.url).pathname;

const owner = {
    id: "pal-1", name: "Muted Terracotta and Deep Sea Foam Study",
    slug: "owner", isLocal: true, tier: "featured", versionCount: 4,
    colors: [{ css: "#c1663f" }, { css: "#8ec9b0" }, { css: "#24444d" }, { css: "#e8dcc0" }, { css: "#7a4a32" }],
};
const neighbour = (name, cols) => ({
    id: "pal-2", name, slug: "neigh", isLocal: true, versionCount: 1,
    colors: cols.map((c) => ({ css: c })),
});

const DARK = ["#050505", "#0a0a0a", "#101010", "#080808", "#000000"];
const LIGHT = ["#ffffff", "#fdfdfd", "#fffef8", "#ffffff", "#fcfcfc"];

const R = {};

async function arm(browser, tag, cols) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.addInitScript(
        (s) => localStorage.setItem("color-palettes", s),
        JSON.stringify({ version: 1, palettes: [owner, neighbour("Neighbour", cols)] }),
    );
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Palette menu" }).first().click();
    await page.waitForTimeout(750);
    await page.evaluate(() => {
        const item = [...document.querySelectorAll('[role="menuitem"]')].find((i) => /Publish/.test(i.textContent));
        item.setAttribute("data-disabled", "");
        const s = document.createElement("span");
        s.className = "ml-auto fira-code text-mono-caption opacity-55 tracking-wide pcm-probe-ann";
        s.style.fontVariant = "small-caps";
        s.textContent = "offline";
        item.appendChild(s);
    });
    await page.waitForTimeout(250);

    const buf = await page.locator('[role="menu"]').first().screenshot();
    fs.writeFileSync(EV + `pass3-neighbour-${tag}.png`, buf);
    const b64 = buf.toString("base64");

    const boxes = await page.evaluate(() => {
        const m = document.querySelector('[role="menu"]');
        const menu = m.getBoundingClientRect();
        const rel = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: +(r.left - menu.left).toFixed(1), y: +(r.top - menu.top).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
        const item = (re) => [...document.querySelectorAll('[role="menuitem"]')].find((i) => re.test(i.textContent));
        const cards = [...document.querySelectorAll('[role="article"]')].map((c) => { const r = c.getBoundingClientRect(); return { label: c.getAttribute("aria-label"), y: +r.y.toFixed(1), h: +r.height.toFixed(1) }; });
        return {
            menuW: +menu.width.toFixed(1), menuH: +menu.height.toFixed(1),
            menuRect: { x: +menu.x.toFixed(1), y: +menu.y.toFixed(1), w: +menu.width.toFixed(1), h: +menu.height.toFixed(1) },
            cards,
            label: rel(document.querySelector(".dropdown-menu__label")),
            annotation: rel(document.querySelector(".pcm-probe-ann")),
            rename: rel(item(/Rename/)),
            del: rel(item(/Delete/)),
        };
    });

    const blank = await ctx.newPage();
    const sampled = await blank.evaluate(async ([b64, boxes]) => {
        const img = new Image();
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0);
        const dpr = img.width / boxes.menuW;
        const d = g.getImageData(0, 0, c.width, c.height).data;
        const at = (x, y) => { const i = (Math.round(y * dpr) * c.width + Math.round(x * dpr)) * 4; return [d[i], d[i + 1], d[i + 2]]; };
        const L = (p) => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
        const scan = (b) => {
            if (!b) return null;
            const h = new Map(); const pts = [];
            for (let y = b.y + 2; y < b.y + b.h - 2; y++) for (let x = b.x + 2; x < b.x + b.w - 2; x++) { const p = at(x, y); const k = p.join(","); h.set(k, (h.get(k) || 0) + 1); pts.push(p); }
            let mk = null, mc = -1; for (const [k, v] of h) if (v > mc) { mc = v; mk = k; }
            const surface = mk.split(",").map(Number);
            let ink = surface, dd = -1; for (const p of pts) { const t = Math.abs(L(p) - L(surface)); if (t > dd) { dd = t; ink = p; } }
            return { surface, ink };
        };
        const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        const lum = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
        const ratio = (a, b) => { const x = lum(a), y = lum(b); const [hh, ll] = x > y ? [x, y] : [y, x]; return +((hh + 0.05) / (ll + 0.05)).toFixed(2); };
        const out = {};
        for (const k of ["label", "annotation", "rename", "del"]) { const s = scan(boxes[k]); out[k] = s ? { ink: s.ink, surface: s.surface, contrast: ratio(s.ink, s.surface) } : null; }
        // the bottom band of the panel — the part that lies over the neighbour card
        out.bottomBand = (() => { const s = scan({ x: 4, y: boxes.menuH - 36, w: boxes.menuW - 8, h: 30 }); return s ? { surface: s.surface } : null; })();
        return out;
    }, [b64, boxes]);
    await blank.close();
    await ctx.close();
    return { boxes, sampled };
}

const browser = await chromium.launch();
R.neighbourDark = await arm(browser, "dark", DARK);
R.neighbourLight = await arm(browser, "light", LIGHT);

// ── B: honest wheel test ────────────────────────────────────────────────────
{
    const many = Array.from({ length: 10 }, (_, i) => ({ id: `x${i}`, name: `Palette ${i}`, slug: `x${i}`, isLocal: true, versionCount: 1, colors: [{ css: "#334455" }, { css: "#aabbcc" }] }));
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 800 } });
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: [owner, ...many] }));
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3000);

    const scrollerTop = () => page.evaluate(() => {
        const e = [...document.querySelectorAll("*")].find((n) => { const cs = getComputedStyle(n); return /(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 4; });
        return e ? { top: e.scrollTop, sh: e.scrollHeight, ch: e.clientHeight, cls: (e.className || "").toString().slice(0, 40) } : null;
    });
    const centre = await page.evaluate(() => {
        const e = [...document.querySelectorAll("*")].find((n) => { const cs = getComputedStyle(n); return /(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 4; });
        const r = e.getBoundingClientRect();
        return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
    });

    const closedBefore = await scrollerTop();
    await page.mouse.move(centre.x, centre.y);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(400);
    const closedAfter = await scrollerTop();

    await page.evaluate(() => { const e = [...document.querySelectorAll("*")].find((n) => { const cs = getComputedStyle(n); return /(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 4; }); e.scrollTop = 0; });
    await page.getByRole("button", { name: "Palette menu" }).first().click();
    await page.waitForTimeout(600);
    const openBefore = await scrollerTop();
    await page.mouse.move(centre.x, centre.y);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(400);
    const openAfter = await scrollerTop();
    const stillOpen = await page.evaluate(() => !!document.querySelector('[role="menu"]'));

    R.wheel = {
        centre,
        closed: { before: closedBefore.top, after: closedAfter.top, delta: closedAfter.top - closedBefore.top, scroller: closedBefore.cls, sh: closedBefore.sh, ch: closedBefore.ch },
        menuOpen: { before: openBefore.top, after: openAfter.top, delta: openAfter.top - openBefore.top, menuStillOpen: stillOpen },
    };
    await ctx.close();
}

await browser.close();
fs.writeFileSync(OUT, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
