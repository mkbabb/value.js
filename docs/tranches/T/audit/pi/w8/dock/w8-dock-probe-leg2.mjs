/**
 * T.W8 · CRITIQUE PASS 9 (dock + nav + menus) — follow-up probe legs.
 * The leg-1 census matched the flex wrapper span instead of the label span
 * (reka SelectItemText wraps once more) — this leg targets the LABEL
 * elements precisely, carries the T-52 ring-carrier forensic to its root,
 * drives the @mbabb + mobile ⋮ menus, and runs the T-37 adversarial
 * second-color leg (a PALE self-derived field — does the seal's
 * figure/ground survive by construction, or only at dark waxes?).
 * PROBE-ONLY; lane server :8680; the owner's :9000 untouched.
 */
import { chromium } from "@playwright/test";
import { appendFileSync } from "node:fs";

const BASE = "http://localhost:8680";
const OUT = "docs/tranches/T/audit/pi/w8/dock";

const browser = await chromium.launch({ headless: false, channel: "chromium" });
const report = [];
const log = (s) => { console.log(s); report.push(s); };
const consoleErrors = [];

const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const wcag = (a, b) => { const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const oklabL = ([r, g, b]) => {
    const [lr, lg, lb] = [lin(r), lin(g), lin(b)];
    const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
    const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
    const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
    return 0.2104542553 * Math.cbrt(l) + 0.793617785 * Math.cbrt(m) - 0.0040720468 * Math.cbrt(s);
};
const hueOf = ([r, g, b]) => {
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    if (mx === mn) return null;
    let h;
    if (mx === r) h = (g - b) / (mx - mn);
    else if (mx === g) h = 2 + (b - r) / (mx - mn);
    else h = 4 + (r - g) / (mx - mn);
    return ((h * 60) + 360) % 360;
};

async function newPage(ctx, tag) {
    const page = await ctx.newPage();
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(`[${tag}] ${m.text().slice(0, 160)}`); });
    page.on("pageerror", (e) => consoleErrors.push(`[${tag}] PAGEERROR ${String(e).slice(0, 160)}`));
    return page;
}
const settle = async (page, ms = 2400) => { await page.waitForSelector(".dock-band", { timeout: 15000 }); await page.waitForTimeout(ms); };

async function samplePixels(page, clip, pts) {
    const buf = await page.screenshot({ clip });
    const b64 = buf.toString("base64");
    return await page.evaluate(async ({ b64, pts, w }) => {
        const img = new Image();
        img.src = `data:image/png;base64,${b64}`;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const scale = img.naturalWidth / w;
        return pts.map(([x, y]) => { const d = ctx.getImageData(Math.round(x * scale), Math.round(y * scale), 1, 1).data; return [d[0], d[1], d[2]]; });
    }, { b64, pts, w: clip.width });
}

const OWNER = `${BASE}/#/?space=lab&color=lab(38%25 32 24)`;

for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme });
    const tag = `1440-${scheme}`;

    // ── A · view menu precise label census + ramp pixel truth ──
    {
        const page = await newPage(ctx, `${tag}-menuA`);
        await page.goto(OWNER);
        await settle(page);
        const roots = await page.evaluate(() => {
            const s = getComputedStyle(document.documentElement);
            return ["--palettes-ramp-0", "--palettes-ramp-1", "--palettes-ramp-2"].map((v) => `${v}:${s.getPropertyValue(v).trim() || "UNSET"}`);
        });
        log(`\n[${tag}] root ramp tokens: ${roots.join(" · ")}`);
        await page.locator('[aria-label="Select view"]').click();
        await page.waitForTimeout(600);
        const census = await page.evaluate(() => {
            return [...document.querySelectorAll('[role="option"]')].map((o) => {
                const spans = [...o.querySelectorAll("span")].filter((x) => x.children.length === 0 && x.textContent.trim());
                const label = spans[spans.length - 1];
                const s = label ? getComputedStyle(label) : null;
                const ramp = o.querySelector(".palettes-ramp-text");
                return {
                    text: o.textContent.trim(),
                    labelWeight: s?.fontWeight,
                    labelBg: s ? (s.backgroundImage === "none" ? "none" : s.backgroundImage.slice(0, 120)) : null,
                    labelClip: s ? (s.webkitBackgroundClip || s.backgroundClip) : null,
                    labelColor: s?.color,
                    hasRampClass: !!ramp,
                    rampBg: ramp ? getComputedStyle(ramp).backgroundImage.slice(0, 160) : null,
                };
            });
        });
        for (const c of census)
            log(`[${tag}] opt "${c.text}" weight=${c.labelWeight} ink=${c.labelColor} rampClass=${c.hasRampClass} bg=${c.labelBg === "none" ? "none" : "GRADIENT"}${c.rampBg ? ` rampBg=${c.rampBg}` : ""}`);

        // ramp pixel truth: sample the "Palettes" label strip; letterform stems =
        // extreme-luminance pixels vs the menu ground; hue spread across the word
        const pal = page.locator('[role="option"]', { hasText: "Palettes" }).first();
        const lb = await pal.locator(".palettes-ramp-text").boundingBox().catch(() => null);
        if (lb) {
            const clip = { x: lb.x - 2, y: lb.y - 2, width: lb.width + 4, height: lb.height + 4 };
            const cols = 24, rows = 8, pts = [];
            for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++)
                pts.push([2 + (i / (cols - 1)) * lb.width, 2 + (1 + j / (rows - 1) * (lb.height - 2))]);
            const px = await samplePixels(page, clip, pts);
            const Ls = px.map(oklabL);
            const ground = px.filter((p, i) => Ls[i] > (scheme === "light" ? 0.85 : -1) && Ls[i] < (scheme === "light" ? 2 : 0.45));
            const sorted = px.map((p, i) => [Ls[i], p]).sort((a, b) => scheme === "light" ? a[0] - b[0] : b[0] - a[0]);
            const stems = sorted.slice(0, 30).map((x) => x[1]);
            const hues = stems.map(hueOf).filter((h) => h !== null);
            const mean = (arr) => arr.reduce((s, p) => s.map((v, k) => v + p[k] / arr.length), [0, 0, 0]).map(Math.round);
            const ms = mean(stems);
            const groundMean = ground.length ? mean(ground) : null;
            log(`[${tag}] RAMP PIXEL TRUTH "Palettes" label: stem mean rgb(${ms}) L=${oklabL(ms).toFixed(3)} hue spread=[${Math.min(...hues).toFixed(0)}°, ${Math.max(...hues).toFixed(0)}°]${groundMean ? ` · vs ground rgb(${groundMean}) WCAG=${wcag(ms, groundMean).toFixed(2)}:1` : ""}`);
            await page.screenshot({ path: `${OUT}/${tag}-ramp-label-zoom.png`, clip: { x: lb.x - 12, y: lb.y - 10, width: lb.width + 60, height: lb.height + 20 } });
        } else log(`[${tag}] .palettes-ramp-text NOT FOUND in the open menu`);
        await page.close();
    }

    // ── B · T-52 ring-carrier forensic ──
    {
        const page = await newPage(ctx, `${tag}-t52b`);
        await page.goto(`${BASE}/#/gradient?space=lab&color=lab(38%25 32 24)`);
        await settle(page);
        const f = await page.locator('[aria-label="Select view"]').evaluate((el) => {
            const read = (n, pseudo) => {
                const s = getComputedStyle(n, pseudo || undefined);
                if (pseudo && (s.content === "none" || s.content === "")) return null;
                return {
                    border: `${s.borderStyle} ${s.borderWidth} ${s.borderColor}`.slice(0, 90),
                    boxShadow: s.boxShadow.slice(0, 140),
                    outline: `${s.outlineStyle} ${s.outlineWidth}`,
                    bg: s.backgroundColor,
                    rect: pseudo ? null : n.getBoundingClientRect().toJSON(),
                };
            };
            const out = { self: read(el), selfBefore: read(el, "::before"), selfAfter: read(el, "::after"), kids: [] };
            for (const k of el.querySelectorAll("*")) {
                const s = getComputedStyle(k);
                if ((s.borderStyle !== "none" && parseFloat(s.borderWidth) > 0) || s.boxShadow !== "none")
                    out.kids.push({ tag: k.tagName, cls: (k.className?.baseVal ?? k.className ?? "").toString().slice(0, 60), border: `${s.borderStyle} ${s.borderWidth}`, shadow: s.boxShadow.slice(0, 100), rect: k.getBoundingClientRect().toJSON() });
            }
            const layer = el.closest(".dock-layer");
            const ls = layer ? getComputedStyle(layer) : null;
            out.layer = ls ? { overflow: `${ls.overflowX}/${ls.overflowY}`, mask: ls.maskImage.slice(0, 120), pad: ls.padding, rect: layer.getBoundingClientRect().toJSON() } : null;
            return out;
        });
        log(`\n[${tag}] T-52 trigger self: border=${f.self.border} shadow=${f.self.boxShadow} outline=${f.self.outline}`);
        if (f.selfBefore) log(`[${tag}] T-52 ::before: ${JSON.stringify(f.selfBefore)}`);
        if (f.selfAfter) log(`[${tag}] T-52 ::after: ${JSON.stringify(f.selfAfter)}`);
        for (const k of f.kids) log(`[${tag}] T-52 kid <${k.tag} ${k.cls}> border=${k.border} shadow=${k.shadow} x=[${k.rect.left.toFixed(1)},${k.rect.right.toFixed(1)}]`);
        if (f.layer) log(`[${tag}] T-52 .dock-layer: overflow=${f.layer.overflow} pad=${f.layer.pad} mask=${f.layer.mask} x=[${f.layer.rect.left.toFixed(1)},${f.layer.rect.right.toFixed(1)}]`);
        await page.close();
    }

    // ── C · @mbabb menu + Login button ──
    {
        const page = await newPage(ctx, `${tag}-mbabb`);
        await page.goto(OWNER);
        await settle(page);
        const login = page.getByRole("button", { name: "Login" }).first();
        if (await login.isVisible().catch(() => false)) {
            const lc = await login.evaluate((el) => { const s = getComputedStyle(el); return { pad: s.padding, h: el.getBoundingClientRect().height.toFixed(1), border: `${s.borderStyle} ${s.borderWidth}`, color: s.color }; });
            log(`\n[${tag}] Login button: pad=${lc.pad} h=${lc.h} border=${lc.border} ink=${lc.color}`);
        }
        const mb = page.getByRole("button", { name: "@mbabb" }).first();
        if (await mb.isVisible().catch(() => false)) {
            await mb.click();
            await page.waitForTimeout(550);
            const menu = page.locator('[role="menu"]').first();
            if (await menu.isVisible().catch(() => false)) {
                const mm = await menu.evaluate((el) => { const s = getComputedStyle(el); return { bf: s.backdropFilter.slice(0, 60), bg: s.backgroundColor, radius: s.borderRadius }; });
                const bx = await menu.boundingBox();
                const clipped = bx.x < 0 || bx.x + bx.width > 1440;
                log(`[${tag}] @mbabb menu: ${JSON.stringify(mm)} box=${Math.round(bx.width)}x${Math.round(bx.height)} viewport-clipped=${clipped}`);
                await page.screenshot({ path: `${OUT}/${tag}-mbabb-menu.png`, clip: { x: Math.max(0, bx.x - 30), y: Math.max(0, bx.y - 70), width: Math.min(bx.width + 60, 1440), height: bx.height + 100 } });
            } else log(`[${tag}] @mbabb menu did not open`);
            await page.keyboard.press("Escape");
        } else log(`[${tag}] @mbabb wordmark not visible`);
        await page.close();
    }

    // ── E · T-37 adversarial pale-wax leg ──
    {
        const page = await newPage(ctx, `${tag}-sealpale`);
        await page.goto(`${BASE}/#/?space=oklch&color=oklch(92%25 0.06 95)`);
        await settle(page);
        await page.mouse.move(720, 880);
        await page.waitForTimeout(7000);
        const seal = page.locator(".dock-seal");
        if (await seal.isVisible().catch(() => false)) {
            const sb = await seal.boundingBox();
            const cx = sb.x + sb.width / 2, cy = sb.y + sb.height / 2, r = sb.width / 2;
            const clip = { x: cx - r * 3, y: Math.max(0, cy - r * 2.2), width: r * 6, height: r * 4.4 };
            const pts = [];
            for (let i = 0; i < 8; i++) { const a = (i / 8) * 2 * Math.PI; pts.push([cx - clip.x + Math.cos(a) * r * 0.72, cy - clip.y + Math.sin(a) * r * 0.72]); }
            for (let i = 0; i < 8; i++) { const a = (i / 8) * 2 * Math.PI; pts.push([cx - clip.x + Math.cos(a) * r * 1.8, cy - clip.y + Math.sin(a) * r * 1.8]); }
            const px = await samplePixels(page, clip, pts);
            const mean = (arr) => arr.reduce((s, p) => s.map((v, k) => v + p[k] / arr.length), [0, 0, 0]).map(Math.round);
            const mw = mean(px.slice(0, 8)), mf = mean(px.slice(8));
            log(`\n[${tag}] T-37 PALE wax rgb(${mw}) L=${oklabL(mw).toFixed(3)} · field rgb(${mf}) L=${oklabL(mf).toFixed(3)} · ΔL=${Math.abs(oklabL(mw) - oklabL(mf)).toFixed(3)} · WCAG=${wcag(mw, mf).toFixed(2)}:1`);
            await page.screenshot({ path: `${OUT}/${tag}-seal-pale-zoom.png`, clip });
        } else log(`\n[${tag}] pale leg: seal did not collapse`);
        await page.close();
    }

    // ── D · mobile ⋮ menu @390 ──
    {
        const page = await newPage(ctx, `390-${scheme}-mobilemenu`);
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(OWNER);
        await settle(page);
        const dots = page.locator('[aria-label="Menu"]').first();
        if (await dots.isVisible().catch(() => false)) {
            await dots.click();
            await page.waitForTimeout(550);
            const menu = page.locator('[role="menu"]').first();
            if (await menu.isVisible().catch(() => false)) {
                const probe = await menu.evaluate((el) => {
                    const s = getComputedStyle(el);
                    const items = [...el.querySelectorAll('[role="menuitem"]')].map((i) => {
                        const cs = getComputedStyle(i);
                        return { text: i.textContent.trim().slice(0, 24), color: cs.color, weight: cs.fontWeight };
                    });
                    const bx = el.getBoundingClientRect();
                    return { bf: s.backdropFilter.slice(0, 50), bg: s.backgroundColor, items, box: { x: +bx.x.toFixed(1), r: +bx.right.toFixed(1), w: +bx.width.toFixed(1) } };
                });
                log(`\n[390-${scheme}] ⋮ menu: bf=${probe.bf} bg=${probe.bg} box=${JSON.stringify(probe.box)} clipped=${probe.box.x < 0 || probe.box.r > 390}`);
                for (const i of probe.items) log(`[390-${scheme}]   item "${i.text}" ink=${i.color} weight=${i.weight}`);
                await page.screenshot({ path: `${OUT}/390-${scheme}-mobile-menu.png` });
            } else log(`\n[390-${scheme}] ⋮ menu did not open`);
        } else log(`\n[390-${scheme}] ⋮ trigger not visible`);
        await page.close();
    }

    await ctx.close();
}

log(`\n=== LEG-2 CONSOLE ERRORS (${consoleErrors.length}) ===`);
consoleErrors.forEach((e) => log(e));
appendFileSync(`${OUT}/w8-dock-probe-log.txt`, "\n\n===== LEG 2 =====\n" + report.join("\n") + "\n");
await browser.close();
console.log("DONE");
