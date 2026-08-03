// CHALLENGE-D round 6 probe 2 — corrected element selection (the BAR's own triggers,
// not the picker's), plus --ui-scale, rails, and content-vs-field sizing.
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000/#/mix";

const PICK = `
const barTrig = (name) => [...document.querySelectorAll('button[role="combobox"]')]
    .find(b => b.getAttribute('aria-label') === name);
const verbOf = () => [...document.querySelectorAll('button')]
    .find(b => (b.textContent||'').trim() === 'Mix' && b.closest('main'));
`;

async function run(scheme) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(ORIGIN, { waitUntil: "load" });
    await page.waitForTimeout(2500);

    const snap = async (tag) =>
        await page.evaluate(
            new Function(`
        ${PICK}
        const t = barTrig('Color space');
        const h = barTrig('Hue method');
        const v = verbOf();
        const lab = [...document.querySelectorAll('label.section-label')];
        const g = (el) => { if (!el) return null; const c = getComputedStyle(el); const r = el.getBoundingClientRect();
            return { x: Math.round(r.x*100)/100, y: Math.round(r.y*100)/100, w: Math.round(r.width*100)/100, h: Math.round(r.height*100)/100,
                bg: c.backgroundColor, color: c.color, bw: c.borderWidth, bs: c.borderStyle, bc: c.borderColor,
                opacity: c.opacity, radius: c.borderRadius, shadow: c.boxShadow.slice(0,70),
                backdrop: c.backdropFilter, pad: c.paddingLeft + '/' + c.paddingRight,
                font: c.fontFamily.split(',')[0] + ' ' + c.fontSize + '/' + c.fontWeight,
                minH: c.minHeight, height: c.height };
        };
        const rs = getComputedStyle(document.documentElement);
        const span = t ? t.querySelector('span') : null;
        return {
            tag: ${JSON.stringify(tag)},
            match: { contrast: matchMedia('(prefers-contrast: more)').matches,
                     rt: matchMedia('(prefers-reduced-transparency: reduce)').matches,
                     fc: matchMedia('(forced-colors: active)').matches,
                     dark: matchMedia('(prefers-color-scheme: dark)').matches },
            tokens: { glassLevel: rs.getPropertyValue('--glass-level').trim(),
                      glassDef: rs.getPropertyValue('--glass-definition').trim(),
                      tint: rs.getPropertyValue('--glass-tint-strength').trim(),
                      surfaceTint15: rs.getPropertyValue('--surface-tint-15').trim(),
                      controlHMd: rs.getPropertyValue('--control-h-md').trim(),
                      uiScale: rs.getPropertyValue('--ui-scale').trim(),
                      touch: rs.getPropertyValue('--touch-target').trim() },
            spaceTrigger: g(t), hueTrigger: g(h), verb: g(v),
            labels: lab.map(l => ({ text: l.textContent.trim(), ...g(l) })),
            valueSpan: span ? { text: span.textContent.trim(), ...g(span) } : null,
        };
      `),
        );

    const out = { scheme, rows: [] };
    out.rows.push(await snap("base"));

    await page.emulateMedia({ contrast: "more" });
    await page.waitForTimeout(400);
    out.rows.push(await snap("contrast-more"));
    await page.emulateMedia({ contrast: "no-preference" });

    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(400);
    out.rows.push(await snap("forced-colors"));
    await page.emulateMedia({ forcedColors: "none" });

    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
    });
    await page.waitForTimeout(400);
    out.rows.push(await snap("reduced-transparency"));
    await cdp.send("Emulation.setEmulatedMedia", { features: [] });
    await page.waitForTimeout(200);

    // --ui-scale sweep
    out.uiScale = await page.evaluate(
        new Function(`
        ${PICK}
        const res = [];
        for (const s of ['1','1.25','1.5','0.85']) {
            document.documentElement.style.setProperty('--ui-scale', s);
            const t = barTrig('Color space'), v = verbOf();
            const grid = v.parentElement.firstElementChild;
            const cs = getComputedStyle(document.documentElement);
            res.push({ scale: s,
                trigH: t.getBoundingClientRect().height,
                trigMinH: getComputedStyle(t).minHeight,
                trigPadL: getComputedStyle(t).paddingLeft,
                trigFont: getComputedStyle(t).fontSize,
                verbH: v.getBoundingClientRect().height,
                verbMinH: getComputedStyle(v).minHeight,
                gridGap: getComputedStyle(grid).columnGap,
                barGap: getComputedStyle(v.parentElement).rowGap,
                labelGap: getComputedStyle(grid.firstElementChild).rowGap,
                labelFont: getComputedStyle(document.querySelector('label.section-label')).fontSize,
                controlHMd: cs.getPropertyValue('--control-h-md').trim() });
        }
        document.documentElement.style.removeProperty('--ui-scale');
        return res;
    `),
    );

    // content vs field: measure text widths in the trigger's own font
    out.contentFit = await page.evaluate(
        new Function(`
        ${PICK}
        const t = barTrig('Color space');
        const c = getComputedStyle(t.querySelector('span') || t);
        const font = c.fontStyle + ' ' + c.fontWeight + ' ' + c.fontSize + ' ' + c.fontFamily;
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.font = font;
        const spaces = ['sRGB','Linear sRGB','HSL','HSV','Lab','LCh','OKLab','OKLCh','Display P3'];
        const hues = ['Shorter','Longer','Increasing','Decreasing'];
        const strat = ['Discard extras','Repeat to pad','Distribute'];
        const w = (a) => a.map(s => ({ s, w: Math.round(ctx.measureText(s).width*10)/10 }));
        return { font, spaces: w(spaces), hues: w(hues), strat: w(strat),
                 fieldW: t.getBoundingClientRect().width,
                 padInline: parseFloat(c.paddingLeft||'0'),
                 triggerPad: getComputedStyle(t).paddingLeft + '/' + getComputedStyle(t).paddingRight,
                 chevronW: t.querySelector('svg') ? t.querySelector('svg').getBoundingClientRect().width : null };
    `),
    );

    await browser.close();
    return out;
}

const res = [await run("light"), await run("dark")];
console.log(JSON.stringify(res, null, 1));
