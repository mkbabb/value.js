// SERVED MODEL: claude-opus-5-5 · B25 · wb-extract-imagedropzone cells (headless Chromium, 1440×900 unless noted).
// Cells: empty-light, empty-dark (U-7) · click (U-2) · commit (U-4) · swap (U-5) · preview (U-3) · forced (U-1 + EC-8 emulation).
import { launch, open, makePng, feed, waitRail, save, ratio, RESOLVE, pixels, EVID } from "./lib.mjs";

const which = process.argv.slice(2);
const want = (c) => which.length === 0 || which.includes(c);
const Z = '[aria-label="Upload image"], [aria-label="Sample colors from the image"]';

async function emptyCell(b, theme) {
    const { ctx, p, errors } = await open(b, { theme });
    try {
        await p.mouse.move(5, 895);
        await p.waitForTimeout(400);
        const z = await p.evaluate(([Z, RES]) => {
            const res = eval(RES);
            const el = document.querySelector(Z); const cs = getComputedStyle(el); const r = el.getBoundingClientRect().toJSON();
            const texts = [...el.querySelectorAll("*")].filter((n) => n.childNodes.length && [...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())).map((n) => ({ text: n.textContent.trim(), family: getComputedStyle(n).fontFamily, size: getComputedStyle(n).fontSize, color: getComputedStyle(n).color, bytes: res(getComputedStyle(n).color), rect: n.getBoundingClientRect().toJSON() }));
            const pane = el.closest("[data-pane]"); const paneTexts = pane ? [...pane.querySelectorAll("p, span")].filter((n) => /Fira/i.test(getComputedStyle(n).fontFamily) && n.textContent.trim().length > 20).map((n) => ({ t: n.textContent.trim().slice(0, 80), size: getComputedStyle(n).fontSize })) : [];
            return { cls: el.className, rect: r, borderStyle: cs.borderTopStyle, borderWidth: cs.borderTopWidth, borderColor: cs.borderTopColor, borderBytes: res(cs.borderTopColor), bgImage: cs.backgroundImage.slice(0, 200), outline: cs.outline, texts, longMonoCopyInPane: paneTexts };
        }, [Z, RESOLVE]);
        const shot = await p.screenshot();
        const r = z.rect;
        // Border band pixels along the top edge (the painted dash), and the ground just outside / just inside.
        const edgeXs = Array.from({ length: 60 }, (_, i) => r.x + 20 + ((r.width - 40) * i) / 59);
        const edge = await pixels(p, shot, edgeXs.map((x) => [x, r.y + 0.5]));
        const edge2 = await pixels(p, shot, edgeXs.map((x) => [x, r.y + 1.5]));
        const outside = await pixels(p, shot, [[r.x + r.width / 2, r.y - 4], [r.x - 4, r.y + r.height / 2]]);
        const inside = await pixels(p, shot, [[r.x + 12, r.y + 12], [r.x + r.width - 12, r.y + r.height - 12]]);
        // Prompt ground: hide the text, re-shoot, sample under the prompt.
        const prompt = z.texts.find((t) => /Upload image/.test(t.text));
        await p.evaluate((Z) => { document.querySelector(Z).querySelectorAll("span, svg").forEach((n) => (n.style.visibility = "hidden")); }, Z);
        const shot2 = await p.screenshot();
        const pg = prompt ? await pixels(p, shot2, [[prompt.rect.x + prompt.rect.width / 2, prompt.rect.y + prompt.rect.height / 2]]) : null;
        const darkestEdge = [...edge, ...edge2].map((px) => ({ px, r: ratio(px, outside[0]) })).sort((a, b) => b.r - a.r)[0];
        const out = { theme, z, edgeMaxVsOutside: darkestEdge, edgeSample: edge.filter((_, i) => i % 10 === 0), outside, inside, borderTokenVsOutside: ratio(z.borderBytes, outside[0]), borderTokenVsInside: ratio(z.borderBytes, inside[0]), promptGround: pg, promptInk: prompt ? ratio(prompt.bytes, pg[0]) : null, errors };
        save(`dz-empty-${theme}.json`, out);
        await p.evaluate((Z) => { document.querySelector(Z).querySelectorAll("span, svg").forEach((n) => (n.style.visibility = "")); }, Z);
        await p.screenshot({ path: `${EVID}/dz-empty-${theme}.png`, clip: { x: r.x - 10, y: r.y - 10, width: r.width + 20, height: r.height + 20 } });
        return out;
    } finally { await ctx.close(); }
}

async function clickCell(b) {
    const { ctx, p, errors } = await open(b, {});
    try {
        const r = await p.evaluate((Z) => document.querySelector(Z).getBoundingClientRect().toJSON(), Z);
        const before = await p.screenshot({ clip: { x: r.x - 6, y: r.y - 6, width: r.width + 12, height: r.height + 12 } });
        let chooser = false;
        p.once("filechooser", () => (chooser = true));
        await p.mouse.click(r.x + r.width / 2, r.y + r.height / 2);
        await p.waitForTimeout(500);
        const st = await p.evaluate((Z) => { const el = document.querySelector(Z); const a = document.activeElement; const cs = getComputedStyle(el); return { focused: a === el, focus: el.matches(":focus"), focusVisible: el.matches(":focus-visible"), outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor, boxShadow: cs.boxShadow.slice(0, 160) }; }, Z);
        const after = await p.screenshot({ clip: { x: r.x - 6, y: r.y - 6, width: r.width + 12, height: r.height + 12 } });
        const diff = Buffer.compare(before, after) !== 0;
        // Keyboard arm for contrast: Tab onto the zone from the element before it.
        await p.evaluate((Z) => document.querySelector(Z).blur(), Z);
        await p.keyboard.press("Shift+Tab"); await p.keyboard.press("Tab");
        await p.waitForTimeout(200);
        const kb = await p.evaluate((Z) => { const el = document.querySelector(Z); const cs = getComputedStyle(el); return { focused: document.activeElement === el, focusVisible: el.matches(":focus-visible"), outline: cs.outline }; }, Z);
        const out = { chooserOpenedByClick: chooser, afterMouseClick: st, pixelsChangedAroundZone: diff, keyboard: kb, errors };
        save("dz-click.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function commitCell(b) {
    const { ctx, p, errors } = await open(b, {});
    try {
        const png = await makePng(p, 1600, 1000);
        await p.focus(Z);
        await p.keyboard.press("Shift"); // keyboard modality
        const fcP = p.waitForEvent("filechooser", { timeout: 20000 });
        await p.keyboard.press("Enter");
        const fc = await fcP;
        await p.evaluate((Z) => {
            window.__tr = []; const t0 = performance.now();
            const tick = () => { const z = document.querySelector('[role="button"][aria-label="Upload image"], [role="button"][aria-label="Sample colors from the image"]'); const a = document.activeElement;
                window.__tr.push({ t: +(performance.now() - t0).toFixed(0), tabindex: z?.getAttribute("tabindex"), label: z?.getAttribute("aria-label"), ariaDisabled: z?.getAttribute("aria-disabled"), active: a === z ? "ZONE" : a === document.body ? "BODY" : (a?.tagName + ":" + (a?.getAttribute("aria-label") ?? a?.textContent?.trim().slice(0, 20))), zoneConnected: !!z });
                if (performance.now() - t0 < 4000) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
        }, Z);
        await fc.setFiles({ name: "img.png", mimeType: "image/png", buffer: png });
        await p.waitForTimeout(4500);
        const tr = await p.evaluate(() => window.__tr);
        // compress: keep state transitions only
        const changes = tr.filter((x, i) => i === 0 || JSON.stringify({ ...x, t: 0 }) !== JSON.stringify({ ...tr[i - 1], t: 0 }));
        const out = { frames: tr.length, changes, final: tr.at(-1), errors };
        save("dz-commit.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function swapCell(b) {
    const { ctx, p, errors } = await open(b, {});
    try {
        await feed(p, await makePng(p, 600, 1400));
        await waitRail(p);
        await p.waitForTimeout(800);
        const wide = await makePng(p, 1600, 500);
        await p.evaluate(() => {
            window.__sw = []; const t0 = performance.now();
            const tick = () => { const z = document.querySelector('[role="button"][aria-label="Sample colors from the image"], [role="button"][aria-label="Upload image"]'); const imgs = z ? [...z.querySelectorAll("img")] : [];
                window.__sw.push({ t: +(performance.now() - t0).toFixed(0), zh: z ? +z.getBoundingClientRect().height.toFixed(1) : null, n: imgs.length, op: imgs.map((i) => +(+getComputedStyle(i).opacity).toFixed(2)), nat: imgs.map((i) => i.naturalWidth + "x" + i.naturalHeight), cls: imgs.map((i) => i.className.replace(/.*rounded-panel\s*/, "")) });
                if (performance.now() - t0 < 3000) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
        });
        await feed(p, wide, "wide.png", "image/png", "replace");
        await p.waitForTimeout(3500);
        const tr = await p.evaluate(() => window.__sw);
        const blank = tr.filter((x) => x.n === 0 || x.op.every((o) => o === 0));
        const changes = tr.filter((x, i) => i === 0 || JSON.stringify({ ...x, t: 0 }) !== JSON.stringify({ ...tr[i - 1], t: 0 }));
        const out = { frames: tr.length, blankFrames: blank.length, blankSpanMs: blank.length ? [blank[0].t, blank.at(-1).t] : null, changes: changes.slice(0, 60), errors };
        save("dz-swap.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function previewCell(b, w, h) {
    const { ctx, p, errors } = await open(b, {});
    try {
        await feed(p, await makePng(p, w, h, "stripes"), `s-${w}x${h}.png`);
        await p.waitForSelector('[aria-label="Sample colors from the image"] img', { timeout: 60000 });
        await p.waitForTimeout(1500);
        const r = await p.evaluate(() => document.querySelector('[aria-label="Sample colors from the image"]').getBoundingClientRect().toJSON());
        const shot = await p.screenshot();
        const pts = []; for (let i = 0; i < 25; i++) for (let j = 0; j < 25; j++) pts.push([r.x + 2 + ((r.width - 4) * (i + 0.5)) / 25, r.y + 2 + ((r.height - 4) * (j + 0.5)) / 25]);
        const px = await pixels(p, shot, pts);
        const ref = [[255, 0, 255], [0, 255, 0], [0, 0, 255], [255, 255, 0]];
        const hit = px.filter((q) => ref.some((c) => Math.hypot(q[0] - c[0], q[1] - c[1], q[2] - c[2]) < 60)).length;
        const out = { size: `${w}x${h}`, zone: r, imageColouredOf625: hit, errors };
        return out;
    } finally { await ctx.close(); }
}

async function forcedCell(b) {
    const { ctx, p, errors } = await open(b, { forcedColors: "active", color: "oklch(0.7 0.15 40)" });
    try {
        const read = (Z) => { const el = document.querySelector(Z); const cs = getComputedStyle(el); return { label: el.getAttribute("aria-label"), cls: el.className.slice(0, 160), borderStyle: cs.borderTopStyle, borderWidth: cs.borderTopWidth, borderColor: cs.borderTopColor, forced: matchMedia("(forced-colors: active)").matches }; };
        const empty = await p.evaluate(read, Z);
        await feed(p, await makePng(p, 1600, 1000));
        await waitRail(p);
        await p.mouse.move(5, 895);
        await p.waitForTimeout(500);
        const populated = await p.evaluate(read, Z);
        const r = await p.evaluate((Z) => document.querySelector(Z).getBoundingClientRect().toJSON(), Z);
        const shot = await p.screenshot();
        const edge = await pixels(p, shot, Array.from({ length: 10 }, (_, i) => [r.x + 30 + i * ((r.width - 60) / 9), r.y + 0.5]));
        await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.waitForTimeout(400);
        const hovered = await p.evaluate(read, Z);
        // EC-8 emulation arm: the k rail + track under forced colours.
        const rail = await p.evaluate(() => { const rl = document.querySelector('[data-o18="extract-k-rail"]'); const cs = getComputedStyle(rl); return { bg: cs.backgroundColor, bgImage: cs.backgroundImage.slice(0, 80), boxShadow: cs.boxShadow, forcedAdjust: cs.forcedColorAdjust, rect: rl.getBoundingClientRect().toJSON() }; });
        const rr = rail.rect;
        const railPx = await pixels(p, shot, Array.from({ length: 9 }, (_, i) => [rr.x + 10 + i * ((rr.width - 20) / 8), rr.y + rr.height / 2]));
        await p.screenshot({ path: `${EVID}/dz-forced-populated.png`, clip: { x: r.x - 10, y: r.y - 10, width: Math.max(r.width, rr.x + rr.width - r.x) + 20, height: Math.max(r.height, rr.y + rr.height - r.y) + 20 } });
        const out = { empty, populated, populatedTopEdgePx: edge, hovered, ec8Rail: { ...rail, railPx }, errors };
        save("dz-forced.json", out);
        return out;
    } finally { await ctx.close(); }
}

const b = await launch();
try {
    const res = {};
    if (want("empty")) { res.emptyLight = await emptyCell(b, "light"); res.emptyDark = await emptyCell(b, "dark"); }
    if (want("click")) res.click = await clickCell(b);
    if (want("commit")) res.commit = await commitCell(b);
    if (want("swap")) res.swap = await swapCell(b);
    if (want("preview")) { res.preview = []; for (const [w, h] of [[1600, 1000], [600, 1400], [3000, 300], [300, 3000]]) res.preview.push(await previewCell(b, w, h)); save("dz-preview.json", res.preview); }
    if (want("forced")) res.forced = await forcedCell(b);
    for (const [k, v] of Object.entries(res)) console.log(k, JSON.stringify(k.startsWith("empty") ? { z: { cls: v.z.cls, bs: v.z.borderStyle, bw: v.z.borderWidth, bc: v.z.borderColor, bg: v.z.bgImage.slice(0, 120), texts: v.z.texts.map((t) => [t.text, t.family.slice(0, 30), t.size]), mono: v.z.longMonoCopyInPane }, edgeMax: v.edgeMaxVsOutside, tokOut: v.borderTokenVsOutside, tokIn: v.borderTokenVsInside, outside: v.outside, promptInk: v.promptInk, errors: v.errors } : v).slice(0, 2500));
} finally { await b.close(); }
