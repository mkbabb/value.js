// SS-8 · B20 probe-a — GradientCodeEditor items (SS8-0563..0576), Chromium headless.
// One browser for the run; one context per cell (lib.cell closes it in finally).
import { launch, cell, goGradient, typeCSS, save, EDITOR, EVID } from "./lib.mjs";
import { rgba, cr } from "./px.mjs";

const ONLY = process.argv[2] ? process.argv[2].split(",") : null;
const want = (k) => !ONLY || ONLY.some((o) => k.startsWith(o));
const INVALID = "linear-gradient(90deg, nope 0%, red 100%)";
const HL = ["hljs-comment", "hljs-keyword", "hljs-title", "hljs-string", "hljs-number", "hljs-attr"];

// In-page: wrap columns of the editor text (char scan of line-box tops).
const WRAPS = `(() => {
  const ed = document.querySelector('${EDITOR}');
  const text = ed.textContent; const walker = document.createTreeWalker(ed, NodeFilter.SHOW_TEXT);
  const chars = []; let n; while ((n = walker.nextNode())) for (let i = 0; i < n.data.length; i++) chars.push([n, i]);
  const r = document.createRange(); let lastTop = null, col = 0, out = [];
  chars.forEach(([node, i], k) => {
    const ch = node.data[i];
    if (ch === "\\n") { col = 0; lastTop = null; return; }
    r.setStart(node, i); r.setEnd(node, i + 1); const b = r.getClientRects()[0];
    if (!b) { col++; return; }
    if (lastTop !== null && b.top - lastTop > 4) {
      const prev = text[k - 1] || "", next = ch;
      out.push({ col, prev, next, midWord: /\\S/.test(prev) && prev !== " " && /\\S/.test(next) && !/[,( ]/.test(prev) });
      col = 0;
    }
    lastTop = b.top; col++;
  });
  const cs = getComputedStyle(ed);
  return { wordBreak: cs.wordBreak, overflowWrap: cs.overflowWrap, width: ed.clientWidth, font: cs.fontSize, lines: text.split("\\n").map((l) => l.length), wraps: out };
})()`;

const b = await launch();
const out = { at: new Date().toISOString() };
try {
    // ── 0563 fonts · 0564 crayons · 0565 verdict clip · 0566 severance ──
    for (const w of [1440, 390, 320]) for (const dark of [false, true]) {
        if (w === 320 && dark) continue;
        const key = `ed-${w}-${dark ? "dark" : "light"}`;
        if (!want(key)) continue;
        out[key] = await cell(b, { w, h: w === 1440 ? 900 : 844, dark }, async (page) => {
            await goGradient(page);
            const base = await page.evaluate(({ EDITOR, HL }) => {
                const ed = document.querySelector(EDITOR);
                const cs = getComputedStyle(ed);
                const probes = HL.map((c) => { const s = document.createElement("span"); s.className = c; s.textContent = "x"; ed.appendChild(s); return [c, getComputedStyle(s).color]; });
                const ink = { base: cs.color, bg: cs.backgroundColor, classes: probes };
                [...ed.querySelectorAll("span")].filter((s) => s.textContent === "x").forEach((s) => s.remove());
                return { ink, editorFont: cs.fontSize, editorClass: ed.className, dark: document.documentElement.classList.contains("dark") };
            }, { EDITOR, HL });
            const cols = await rgba(page, [base.ink.bg, base.ink.base, ...base.ink.classes.map((c) => c[1])]);
            const ground = cols[0];
            const contrast = { ground, groundAlpha: ground[3], base: cr(cols[1], ground) };
            base.ink.classes.forEach(([c], i) => (contrast[c] = cr(cols[i + 2], ground)));
            const wraps = await page.evaluate(WRAPS);
            await typeCSS(page, INVALID);
            const verdict = await page.evaluate(({ EDITOR }) => {
                const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
                if (!v) return null;
                const vr = v.getBoundingClientRect(), ed = document.querySelector(EDITOR);
                let p = v.parentElement, clip = null;
                while (p) { const s = getComputedStyle(p); if (/auto|scroll|hidden|clip/.test(s.overflowY) && p !== document.body) { const r = p.getBoundingClientRect(); clip = { cls: String(p.className).slice(0, 60), rect: [r.x, r.y, r.width, r.height].map(Math.round), scrollTop: p.scrollTop, sh: p.scrollHeight, ch: p.clientHeight }; break; } p = p.parentElement; }
                const cx = vr.x + vr.width / 2, cy = vr.y + vr.height / 2;
                const hit = document.elementFromPoint(cx, cy);
                return {
                    text: v.textContent.trim(), font: getComputedStyle(v).fontSize, ff: getComputedStyle(v).fontFamily.slice(0, 40),
                    editorFont: getComputedStyle(ed).fontSize, editorSpanFont: ed.querySelector("span") ? getComputedStyle(ed.querySelector("span")).fontSize : null,
                    rect: [vr.x, vr.y, vr.width, vr.height].map((n) => +n.toFixed(1)), vh: innerHeight, docScrollY: scrollY,
                    inViewport: vr.top >= 0 && vr.bottom <= innerHeight, visibleFrac: Math.max(0, Math.min(vr.bottom, innerHeight) - Math.max(vr.top, 0)) / vr.height,
                    clip, hitIsVerdict: !!hit && v.contains(hit), editorRect: (() => { const r = ed.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(Math.round); })(),
                };
            }, { EDITOR });
            await page.screenshot({ path: `${EVID}/a-${key}-verdict.png` });
            return { base, contrast, wraps, verdict };
        });
    }

    // ── 0565 (A-7) the edge case: the editor's bottom parked at the viewport floor, caret on line 1 ──
    for (const w of [1440, 390]) {
        const key = `edge-${w}`;
        if (!want(key)) continue;
        out[key] = await cell(b, { w, h: w === 1440 ? 900 : 844 }, async (page) => {
            await goGradient(page);
            await page.evaluate((s) => { const ed = document.querySelector(s); const r = ed.getBoundingClientRect(); window.scrollBy(0, r.bottom - innerHeight + 2); }, EDITOR);
            await page.waitForTimeout(300);
            const er = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; }, EDITOR);
            await page.mouse.click(er[0] + 40, er[1] + 20); // caret on the first line
            await page.keyboard.press("End");
            await page.keyboard.type("x");
            await page.waitForTimeout(900);
            const r = await page.evaluate(() => {
                const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
                if (!v) return { verdict: null };
                const vr = v.getBoundingClientRect();
                return { verdict: v.textContent.trim(), rect: [vr.x, vr.y, vr.width, vr.height].map((n) => +n.toFixed(1)), vh: innerHeight, scrollY, visibleFrac: +(Math.max(0, Math.min(vr.bottom, innerHeight) - Math.max(vr.top, 0)) / vr.height).toFixed(2), role: v.getAttribute("role") };
            });
            await page.screenshot({ path: `${EVID}/a-${key}.png` });
            return { editorRectBefore: er.map((n) => +n.toFixed(1)), ...r };
        });
    }

    // ── 0567 aria-valuenow beyond max ──
    if (want("aria")) out.aria = await cell(b, {}, async (page) => {
        await goGradient(page);
        const res = {};
        for (const t of ["linear-gradient(100turn, red, blue)", "linear-gradient(720deg, red, blue)", "linear-gradient(-90deg, red, blue)"]) {
            await typeCSS(page, t, { blur: true, wait: 900 });
            res[t] = await page.evaluate(() => {
                const s = document.querySelector('[role="slider"][aria-label="Gradient direction"]');
                const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
                const ed = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
                return { valuenow: s?.getAttribute("aria-valuenow"), min: s?.getAttribute("aria-valuemin"), max: s?.getAttribute("aria-valuemax"), valuetext: s?.getAttribute("aria-valuetext"), verdict: v?.textContent.trim() ?? null, editor: ed.textContent.slice(0, 60), readout: [...document.querySelectorAll("span")].find((x) => /deg$/.test(x.textContent.trim()) && x.className.includes("plate-ink"))?.textContent.trim() };
            });
        }
        return { res };
    });

    // ── 0573 focus ring paint ──
    for (const dark of [false, true]) {
        const key = `ring-${dark ? "dark" : "light"}`;
        if (!want(key)) continue;
        out[key] = await cell(b, { dark }, async (page) => {
            await goGradient(page);
            await page.evaluate(() => { const c = [...document.querySelectorAll("button")].find((x) => /Copy rendered CSS/.test(x.getAttribute("title") || x.getAttribute("aria-label") || "")); c?.focus(); });
            const steps = [];
            for (let i = 0; i < 6; i++) {
                await page.keyboard.press("Tab");
                const a = await page.evaluate(() => ({ role: document.activeElement?.getAttribute("role"), label: document.activeElement?.getAttribute("aria-label") }));
                steps.push(a);
                if (a.label === "Gradient CSS") break;
            }
            await page.waitForTimeout(400);
            const st = await page.evaluate(() => {
                const ed = document.activeElement, cs = getComputedStyle(ed);
                return { isEditor: ed.getAttribute("aria-label") === "Gradient CSS", focusVisible: ed.matches(":focus-visible"), boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, color: cs.color, colorRing: getComputedStyle(document.documentElement).getPropertyValue("--color-ring").trim(), twRingColor: cs.getPropertyValue("--tw-ring-color").trim() };
            });
            const r = await page.evaluate(() => { const b = document.activeElement.getBoundingClientRect(); return [b.x, b.y, b.width, b.height]; });
            await page.screenshot({ path: `${EVID}/a-${key}.png`, clip: { x: Math.max(0, r[0] - 12), y: Math.max(0, r[1] - 12), width: r[2] + 24, height: Math.min(r[3] + 24, 300) } });
            return { steps, st };
        });
    }

    // ── 0572 reduced-transparency computed background ──
    for (const dark of [false, true]) {
        const key = `rt-${dark ? "dark" : "light"}`;
        if (!want(key)) continue;
        out[key] = await cell(b, { dark }, async (page, ctx) => {
            await goGradient(page);
            const read = () => page.evaluate(() => { const ed = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]'); const cs = getComputedStyle(ed); return { bg: cs.backgroundColor, mq: matchMedia("(prefers-reduced-transparency: reduce)").matches }; });
            const normal = await read();
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-transparency", value: "reduce" }] });
            await page.waitForTimeout(300);
            const reduced = await read();
            const [n, r] = await rgba(page, [normal.bg, reduced.bg]);
            return { normal: { ...normal, rgba: n }, reduced: { ...reduced, rgba: r } };
        });
    }

    // ── 0569 native undo after a blurred re-render ──
    if (want("undo")) out.undo = await cell(b, {}, async (page) => {
        await goGradient(page);
        const txt = () => page.evaluate((s) => document.querySelector(s).textContent, EDITOR);
        const log = [];
        await page.click(EDITOR); await page.keyboard.press("ControlOrMeta+End");
        log.push(["t0-canonical", await txt()]);
        await page.keyboard.type("x"); await page.waitForTimeout(800);
        log.push(["t1-typed-x(focused)", await txt()]);
        await page.keyboard.press("ControlOrMeta+z"); await page.waitForTimeout(800);
        log.push(["t2-undo-control(focused, no re-render)", await txt()]);
        await typeCSS(page, "linear-gradient(90deg, red, blue)", { wait: 900 });
        log.push(["t3-authored-valid(focused)", await txt()]);
        await page.evaluate(() => document.activeElement?.blur()); await page.waitForTimeout(400);
        log.push(["t4-after-blur(re-render)", await txt()]);
        await page.click(EDITOR); await page.keyboard.press("ControlOrMeta+End");
        await page.keyboard.press("ControlOrMeta+z"); await page.waitForTimeout(800);
        log.push(["t5-undo-after-rerender", await txt()]);
        await page.keyboard.press("ControlOrMeta+z"); await page.waitForTimeout(400);
        log.push(["t6-undo-again", await txt()]);
        return { log };
    });

    // ── 0568 forced-colors (Chromium emulation only — NOT real WHCM) ──
    if (want("forced")) out.forced = await cell(b, {}, async (page) => {
        await page.emulateMedia({ forcedColors: "active" });
        await goGradient(page);
        const read = () => page.evaluate((s) => { const ed = document.querySelector(s), cs = getComputedStyle(ed); return { border: cs.borderTopColor, bg: cs.backgroundColor, color: cs.color, fca: cs.forcedColorAdjust }; }, EDITOR);
        const resting = await read();
        await typeCSS(page, INVALID, { blur: true });
        const error = await read();
        await page.screenshot({ path: `${EVID}/a-forced-emulated.png` });
        return { resting, error, same: resting.border === error.border };
    });

    // ── 0575 / R-9 crash classes ──
    for (const [k, t] of [["crash-oklch", "linear-gradient(90deg, oklch() 0%, red 100%)"], ["crash-calc", "linear-gradient(90deg, calc() 0%, red 100%)"], ["crash-foo", "linear-gradient(90deg, foo() 0%, red 100%)"], ["crash-midthought", "linear-gradient(90deg, oklch("]]) {
        if (!want(k)) continue;
        out[k] = await cell(b, {}, async (page) => {
            await goGradient(page);
            const before = await page.evaluate(() => document.body.innerText.length);
            await typeCSS(page, t, { wait: 1200 });
            return await page.evaluate((before) => ({
                bodyBefore: before, bodyAfter: document.body.innerText.length,
                boundary: !!document.querySelector(".vj-error-boundary"), tryAgain: /Try again/i.test(document.body.innerText),
                verdict: document.querySelector('[data-testid="gradient-parse-verdict"]')?.textContent.trim() ?? null,
                editorAlive: !!document.querySelector('[role="textbox"][aria-label="Gradient CSS"]'),
            }), before);
        });
    }

    // ── 0575 cross-route: keystroke on Gradient, navigate to Mix inside the 500 ms window ──
    if (want("xroute")) out.xroute = await cell(b, {}, async (page) => {
        await goGradient(page);
        await page.click(EDITOR); await page.keyboard.press("ControlOrMeta+a");
        await page.keyboard.insertText("linear-gradient(90deg, oklch() 0%, red 100%)");
        await page.evaluate(() => { location.hash = "#/mix"; });
        await page.waitForTimeout(2000);
        const r = await page.evaluate(() => ({ hash: location.hash, boundary: !!document.querySelector(".vj-error-boundary"), boundaryText: document.querySelector(".vj-error-boundary")?.innerText.slice(0, 200) ?? null, tryAgain: /Try again/i.test(document.body.innerText) }));
        await page.screenshot({ path: `${EVID}/a-xroute.png` });
        return r;
    });
} finally {
    await b.close();
}
const p = save(`probe-a${ONLY ? "-" + ONLY.join("_") : ""}.json`, out);
console.log("saved", p);
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify(v).slice(0, 700));
