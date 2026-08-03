// CHALLENGE-D round 6 probe 3 — the coarse-pointer register (the SHIPPED touch state),
// plus rendered-pixel contrast of the verb under base / contrast-more / reduced-transparency.
import { chromium } from "playwright";
import fs from "node:fs";

const ORIGIN = "http://localhost:9000/#/mix";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/img";

const EVAL = `
const barTrig = (n) => [...document.querySelectorAll('button[role="combobox"]')].find(b => b.getAttribute('aria-label') === n);
const verbOf = () => [...document.querySelectorAll('button')].find(b => (b.textContent||'').trim() === 'Mix' && b.closest('main'));
const g = (el) => { if(!el) return null; const c = getComputedStyle(el); const r = el.getBoundingClientRect();
  return { x:+r.x.toFixed(2), y:+r.y.toFixed(2), w:+r.width.toFixed(2), h:+r.height.toFixed(2),
    minH:c.minHeight, height:c.height, font:c.fontSize+'/'+c.lineHeight, pad:c.paddingTop+' '+c.paddingRight+' '+c.paddingBottom+' '+c.paddingLeft,
    bg:c.backgroundColor, color:c.color, bw:c.borderWidth, bc:c.borderColor, opacity:c.opacity, overflow:c.overflow };
};
`;

async function mobileCell() {
    const b = await chromium.launch();
    const ctx = await b.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(ORIGIN, { waitUntil: "load" });
    await page.waitForTimeout(2800);
    const r = await page.evaluate(
        new Function(`${EVAL}
        const rs = getComputedStyle(document.documentElement);
        const t = barTrig('Color space'), h = barTrig('Hue method'), v = verbOf();
        const span = t ? t.querySelector('span') : null;
        const sv = span ? span.getBoundingClientRect() : null;
        const tv = t ? t.getBoundingClientRect() : null;
        return {
          media: { coarse: matchMedia('(pointer: coarse)').matches, fine: matchMedia('(pointer: fine)').matches,
                   anyCoarse: matchMedia('(any-pointer: coarse)').matches },
          tokens: { uiScale: rs.getPropertyValue('--ui-scale').trim(),
                    coarseScale: rs.getPropertyValue('--ui-coarse-scale').trim(),
                    controlFloor: rs.getPropertyValue('--control-floor').trim(),
                    controlHMd: rs.getPropertyValue('--control-h-md').trim(),
                    controlHSm: rs.getPropertyValue('--control-h-sm').trim(),
                    touch: rs.getPropertyValue('--touch-target').trim() },
          spaceTrigger: g(t), hueTrigger: g(h), verb: g(v),
          valueSpan: span ? { text: span.textContent.trim(), ...g(span) } : null,
          spanOverflowsTrigger: (sv && tv) ? { spanH: +sv.height.toFixed(2), trigInnerH: +tv.height.toFixed(2),
                                               spanTop: +(sv.top - tv.top).toFixed(2), spanBottom: +(tv.bottom - sv.bottom).toFixed(2) } : null,
          labels: [...document.querySelectorAll('label.section-label')].map(l => ({ text:l.textContent.trim(), ...g(l) })),
          bar: g(verbOf().parentElement),
          grid: g(verbOf().parentElement.firstElementChild),
          gaps: { bar: getComputedStyle(verbOf().parentElement).rowGap,
                  grid: getComputedStyle(verbOf().parentElement.firstElementChild).columnGap,
                  field: getComputedStyle(verbOf().parentElement.firstElementChild.firstElementChild).rowGap },
          rootFont: getComputedStyle(document.documentElement).fontSize,
        };`),
    );
    await b.close();
    return r;
}

function toLin(c) {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function lum([r, g, b]) {
    return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}
function ratio(a, b) {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
}

async function pixelCell(scheme) {
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(ORIGIN, { waitUntil: "load" });
    await page.waitForTimeout(2500);

    const shots = {};
    const cdp = await ctx.newCDPSession(page);

    const capture = async (tag) => {
        const rect = await page.evaluate(
            new Function(`${EVAL}
            const v = verbOf(); const r = v.getBoundingClientRect();
            const card = v.closest('.card') || v.closest('[class*="glass-resting"]');
            const cr = card ? card.getBoundingClientRect() : null;
            return { v:{x:r.x,y:r.y,w:r.width,h:r.height},
                     cardBg: card ? getComputedStyle(card).backgroundColor : null,
                     probe:{x:r.x, y:r.y - 12} };`),
        );
        const file = `${OUT}/verb-${scheme}-${tag}.png`;
        await page.screenshot({
            path: file,
            clip: { x: rect.v.x - 8, y: rect.v.y - 16, width: rect.v.w + 16, height: rect.v.h + 24 },
        });
        shots[tag] = { file, cardBg: rect.cardBg, rect: rect.v };
    };

    await capture("base");
    await page.emulateMedia({ contrast: "more" });
    await page.waitForTimeout(400);
    await capture("contrast-more");
    await page.emulateMedia({ contrast: "no-preference" });
    await cdp.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
    });
    await page.waitForTimeout(400);
    await capture("reduced-transparency");
    await cdp.send("Emulation.setEmulatedMedia", { features: [] });

    await b.close();
    return shots;
}

const out = {};
out.mobile = await mobileCell();
out.pixLight = await pixelCell("light");
out.pixDark = await pixelCell("dark");
fs.writeFileSync(
    "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/r6-out3.json",
    JSON.stringify(out, null, 1),
);
console.log(JSON.stringify(out, null, 1));
