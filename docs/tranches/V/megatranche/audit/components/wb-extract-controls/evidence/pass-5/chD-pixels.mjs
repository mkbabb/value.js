import { webkit } from "playwright";
import zlib from "node:zlib";

// ---- minimal PNG decoder (truecolor/alpha, 8-bit) --------------------------
function decodePNG(buf) {
    let p = 8, w = 0, h = 0, ct = 0, bd = 0;
    const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p);
        const type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") {
            w = data.readUInt32BE(0); h = data.readUInt32BE(4);
            bd = data[8]; ct = data[9];
        } else if (type === "IDAT") idat.push(data);
        else if (type === "IEND") break;
        p += 12 + len;
    }
    if (bd !== 8) throw new Error("bitDepth " + bd);
    const ch = { 0: 1, 2: 3, 4: 2, 6: 4 }[ct];
    if (!ch) throw new Error("colorType " + ct);
    const raw = zlib.inflateSync(Buffer.concat(idat));
    const stride = w * ch;
    const px = Buffer.alloc(h * stride);
    let rp = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[rp++];
        const line = raw.subarray(rp, rp + stride); rp += stride;
        const cur = px.subarray(y * stride, (y + 1) * stride);
        const prev = y ? px.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
        for (let i = 0; i < stride; i++) {
            const a = i >= ch ? cur[i - ch] : 0, b = prev[i], c = i >= ch ? prev[i - ch] : 0;
            let v = line[i];
            if (f === 1) v += a;
            else if (f === 2) v += b;
            else if (f === 3) v += (a + b) >> 1;
            else if (f === 4) {
                const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
                v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
            }
            cur[i] = v & 255;
        }
    }
    return { w, h, ch, px };
}
const at = (img, x, y) => {
    const i = y * img.w * img.ch + x * img.ch;
    return [img.px[i], img.px[i + 1], img.px[i + 2]];
};
const lum = ([r, g, b]) => {
    const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return +((x + 0.05) / (y + 0.05)).toFixed(3);
};

// ---------------------------------------------------------------------------
const ORIGIN = "http://localhost:9000";
const browser = await webkit.launch();
const out = {};

for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: scheme,
        deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3500);

    const geo = await page.evaluate(() => {
        const R = (s) => {
            const e = document.querySelector(s);
            if (!e) return null;
            const b = e.getBoundingClientRect();
            return { l: b.left, t: b.top, w: b.width, h: b.height };
        };
        const rail = R('[data-o18="extract-k-rail"]');
        const thumbs = [...document.querySelectorAll('[role="slider"]')].map((t) => {
            const b = t.getBoundingClientRect();
            return { label: t.getAttribute("aria-label"), l: b.left, t: b.top, w: b.width, h: b.height };
        });
        const seps = [...document.querySelectorAll('.dock-separator')].map((s) => {
            const b = s.getBoundingClientRect();
            return { l: b.left, t: b.top, w: b.width, h: b.height };
        });
        const kcRail = (() => {
            const kc = document.querySelector('[data-o18="extract-kc"]');
            const sl = kc?.querySelector(".glass-slider");
            if (!sl) return null;
            const b = sl.getBoundingClientRect();
            return { l: b.left, t: b.top, w: b.width, h: b.height };
        })();
        const kLabel = (() => {
            const l = document.querySelector('[data-o18="extract-k-rail"]')?.closest(".flex.items-center")?.querySelector("label");
            if (!l) return null;
            const b = l.getBoundingClientRect();
            return { l: b.left, t: b.top, w: b.width, h: b.height, text: l.textContent.trim() };
        })();
        return { rail, thumbs, seps, kcRail, kLabel, dz: R(".border-dashed") };
    });

    const shotBuf = await page.screenshot({ type: "png" });
    const img = decodePNG(shotBuf);
    const P = (x, y) => at(img, Math.round(x), Math.round(y));

    const r = geo.rail;
    const kThumb = geo.thumbs.find((t) => t.label === "Number of colors");
    const midY = Math.round(r.t + r.h / 2);
    const leftOfThumb = P(r.l + 8, midY);
    const justLeftOfThumb = P(kThumb.l - 6, midY);
    const justRightOfThumb = P(kThumb.l + kThumb.w + 6, midY);
    const rightEnd = P(r.l + r.w - 8, midY);
    const groundBelow = P(r.l + r.w / 2, r.t + r.h + 8);

    // kC rail samples
    const kcThumb = geo.thumbs.find((t) => t.label === "Chroma weight");
    const kc = geo.kcRail;
    const kcMidY = Math.round(kc.t + kc.h / 2);
    const kcLeft = P(kc.l + 6, kcMidY);
    const kcRight = P(kc.l + kc.w - 6, kcMidY);

    // separator column: sample the full column height around the control row
    const sepScan = geo.seps.map((s) => {
        const col = [];
        for (let dy = -22; dy <= 22; dy++) col.push(P(s.l, s.t + dy).join(","));
        return { x: s.l, y: s.t, uniqueColors: [...new Set(col)].length, sample: col.slice(18, 26) };
    });

    out[scheme] = {
        geo,
        railFillLeft: leftOfThumb,
        railJustLeftOfThumb: justLeftOfThumb,
        railJustRightOfThumb: justRightOfThumb,
        railRightEnd: rightEnd,
        groundBelow,
        contrast_railVsGround: contrast(leftOfThumb, groundBelow),
        contrast_fillVsTrack_k: contrast(justLeftOfThumb, justRightOfThumb),
        kcLeft, kcRight,
        contrast_fillVsTrack_kc: contrast(kcLeft, kcRight),
        contrast_kRail_vs_kcRail: contrast(leftOfThumb, kcLeft),
        sepScan,
    };

    // ---- k label overflow at max ----
    const overflow = await page.evaluate(() => {
        const l = document.querySelector('[data-o18="extract-k-rail"]')?.closest(".flex.items-center")?.querySelector("label");
        const kc = document.querySelector('[data-o18="extract-kc"]');
        const kcOut = kc ? kc.querySelector("span.tabular-nums") : null;
        const measure = (el, text) => {
            if (!el) return null;
            const probe = document.createElement("span");
            probe.className = el.className.replace(/\bw-5\b/, "");
            probe.style.position = "absolute";
            probe.style.whiteSpace = "pre";
            probe.textContent = text;
            document.body.appendChild(probe);
            const w = probe.getBoundingClientRect().width;
            probe.remove();
            return +w.toFixed(2);
        };
        return {
            kLabelBoxW: l ? +l.getBoundingClientRect().width.toFixed(2) : null,
            kInk_1: measure(l, "1"),
            kInk_16: measure(l, "16"),
            kcBoxW: kcOut ? +kcOut.getBoundingClientRect().width.toFixed(2) : null,
            kcText: kcOut ? kcOut.textContent.trim() : null,
            kcCls: kcOut ? kcOut.className : null,
            kcInk_00: measure(kcOut, "0.0"),
            kcInk_15: measure(kcOut, "1.5"),
        };
    });
    out[scheme].reservation = overflow;

    await ctx.close();
}

// ---- RTL arm --------------------------------------------------------------
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3000);
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(600);
    out.rtl = await page.evaluate(() => {
        const row = document.querySelector('[data-o18="extract-k-rail"]')?.closest(".flex.items-center");
        const l = row?.querySelector("label");
        const rail = document.querySelector('[data-o18="extract-k-rail"]');
        const kc = document.querySelector('[data-o18="extract-kc"]');
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { l: +b.left.toFixed(1), r: +b.right.toFixed(1), w: +b.width.toFixed(1) }; };
        const cs = l ? getComputedStyle(l) : null;
        return {
            dir: document.documentElement.dir,
            labelRect: R(l),
            labelTextAlign: cs ? cs.textAlign : null,
            railRect: R(rail),
            kcRect: R(kc),
            kcLabelRect: R(kc?.querySelector("label")),
            kcReadoutRect: R(kc?.querySelector("span.tabular-nums")),
            overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
    });
    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
