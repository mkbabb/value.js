// SS-8 · B18 — measurement helpers (page-side reads + composited contrast).
import { EVID } from "./lib.mjs";

export async function gotoAdmin(page, tab, { hash } = {}) {
    await page.goto(hash ?? `http://localhost:9000/#/admin/${tab}`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector(`[data-pane="admin-${tab}"]`, { timeout: 90000 });
    await page.waitForTimeout(1200);
}

/** Composited WCAG contrast of `sel`'s text over what is painted behind it. */
export async function contrast(page, sel, nth = 0) {
    const loc = page.locator(sel).nth(nth);
    const box = await loc.boundingBox();
    if (!box) return { error: "no box", sel };
    const fg = await loc.evaluate((e) => getComputedStyle(e).color);
    await loc.evaluate((e) => e.setAttribute("data-ss8-ink", ""));
    await page.addStyleTag({ content: "[data-ss8-ink],[data-ss8-ink] *{color:transparent!important;text-shadow:none!important;caret-color:transparent!important}" });
    await page.waitForTimeout(80);
    const png = await page.screenshot({ clip: { x: box.x, y: box.y, width: Math.max(1, box.width), height: Math.max(1, box.height) } });
    await page.evaluate(() => { document.querySelectorAll("style").forEach((s) => { if (s.textContent.includes("data-ss8-ink")) s.remove(); }); document.querySelectorAll("[data-ss8-ink]").forEach((e) => e.removeAttribute("data-ss8-ink")); });
    return page.evaluate(async ({ b64, fg }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const x = c.getContext("2d");
        x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data;
        const rs = [], gs = [], bs = [];
        for (let i = 0; i < d.length; i += 4) { rs.push(d[i]); gs.push(d[i + 1]); bs.push(d[i + 2]); }
        const med = (a) => a.sort((p, q) => p - q)[a.length >> 1];
        const bg = [med(rs), med(gs), med(bs)];
        const k = document.createElement("canvas"); k.width = k.height = 1;
        const kx = k.getContext("2d");
        kx.fillStyle = `rgb(${bg.join(",")})`; kx.fillRect(0, 0, 1, 1);
        kx.fillStyle = fg; kx.fillRect(0, 0, 1, 1);
        const f = [...kx.getImageData(0, 0, 1, 1).data.slice(0, 3)];
        const lum = ([r, g, b]) => { const t = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * t(r) + 0.7152 * t(g) + 0.0722 * t(b); };
        const L1 = lum(f), L2 = lum(bg);
        const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        return { fgComputed: fg, fgComposited: f, bgMedian: bg, ratio: +ratio.toFixed(3) };
    }, { b64: png.toString("base64"), fg });
}

/** Rects of many selectors at once. */
export async function rects(page, map) {
    return page.evaluate((map) => {
        const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); };
        const out = {};
        for (const [k, s] of Object.entries(map)) out[k] = [...document.querySelectorAll(s)].slice(0, 8).map(r);
        return out;
    }, map);
}

/** The nearest card ancestor of a pane, with its overflow numbers. */
export async function paneCard(page, pane) {
    return page.evaluate((pane) => {
        const p = document.querySelector(`[data-pane="${pane}"]`);
        if (!p) return null;
        const r = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); };
        const chain = [];
        let e = p;
        for (let i = 0; i < 12 && e; i++, e = e.querySelector(":scope > *")) {
            chain.push({ tag: e.tagName.toLowerCase(), slot: e.getAttribute("data-slot"), cls: (e.className?.baseVal ?? e.className ?? "").toString().slice(0, 80), rect: r(e), cw: e.clientWidth, sw: e.scrollWidth, ch: e.clientHeight, sh: e.scrollHeight, ox: getComputedStyle(e).overflowX });
        }
        return { pane: r(p), main: r(document.querySelector("main") ?? document.body), vw: innerWidth, chain };
    }, pane);
}

export const shot = (page, name, opts = {}) => page.screenshot({ path: `${EVID}/${name}.png`, ...opts });
