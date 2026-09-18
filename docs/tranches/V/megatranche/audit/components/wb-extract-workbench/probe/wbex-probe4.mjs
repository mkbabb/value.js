import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
const OUT =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-extract-workbench/probe";
const URL = "http://localhost:9000/#/extract";
const log = [];
const say = (s) => {
    console.log(s);
    log.push(String(s));
};
const J = (o) => JSON.stringify(o, null, 1);

const MAKE_FILE = `(async () => {
  const c = document.createElement('canvas'); c.width=200; c.height=200;
  const g = c.getContext('2d');
  ['#c81e5a','#1e5ac8','#5ac81e','#e8e0d0'].forEach((b,i)=>{ g.fillStyle=b; g.fillRect(0, i*50, 200, 50); });
  return c.toDataURL('image/png');
})()`;

async function load(p, dataUrlEval = true) {
    await p.goto(URL, { waitUntil: "networkidle" });
    await p.waitForTimeout(3000);
    const d = await p.evaluate(MAKE_FILE);
    await p.setInputFiles('input[type="file"]', {
        name: "bands.png",
        mimeType: "image/png",
        buffer: Buffer.from(d.split(",")[1], "base64"),
    });
    await p.waitForTimeout(3500);
}

const browser = await webkit.launch();

// ── P1: dominant readout vs the card's FIRST swatch ──────────────────
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 1400 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const p = await ctx.newPage();
    await load(p);
    const r = await p.evaluate(() => {
        const code = document.querySelector("code.fira-code");
        // the card's colour strip cells + swatch seats, in DOM order
        const strip = [...document.querySelectorAll('[data-slot="palette-color-strip"] > *')].map(
            (n) => getComputedStyle(n).backgroundColor,
        );
        const swatches = [...document.querySelectorAll("[class*='swatch'], .w-12.h-12, .sm\\:w-14")]
            .filter((n) => n.offsetParent)
            .slice(0, 8)
            .map((n) => ({
                bg: getComputedStyle(n).backgroundColor,
                title: n.getAttribute("title") ?? n.getAttribute("aria-label"),
            }));
        const disp = document.querySelector(".font-display.text-display");
        const eyebrow = [...document.querySelectorAll("span")].find(
            (s) => s.textContent.trim() === "dominant",
        );
        const paneH = document.querySelector("h3");
        const cs = (e) => (e ? getComputedStyle(e) : {});
        return {
            dominantTitle: code?.getAttribute("title"),
            dominantVisible: code?.textContent.trim(),
            codeClientW: code?.clientWidth,
            codeScrollW: code?.scrollWidth,
            codeTruncated: code ? code.scrollWidth > code.clientWidth + 1 : null,
            strip,
            swatches,
            displayText: disp?.textContent.replace(/\s+/g, " ").trim(),
            displayFontSize: cs(disp).fontSize,
            displayFontFamily: cs(disp).fontFamily?.slice(0, 30),
            eyebrowFontSize: cs(eyebrow).fontSize,
            paneTitleFontSize: cs(paneH).fontSize,
            paneTitleText: paneH?.textContent.trim(),
            dominanceRowRect: disp?.parentElement?.parentElement?.getBoundingClientRect().toJSON(),
        };
    });
    say("=== P1. dominance readout vs card order (1440x1400) ===");
    say(J(r));
    await ctx.close();
}

// ── P2: the fold at 1440x900 — is the palette card reachable/announced? ──
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const p = await ctx.newPage();
    await load(p);
    const r = await p.evaluate(() => {
        const sc = document.querySelector(".pane-scroll-fade");
        const code = document.querySelector("code.fira-code");
        const strip = document.querySelector('[data-slot="palette-color-strip"]');
        const img = document.querySelector('img[alt="Uploaded image"]');
        const rect = (e) => (e ? e.getBoundingClientRect().toJSON() : null);
        return {
            viewportH: innerHeight,
            scroller: sc ? { clientH: sc.clientHeight, scrollH: sc.scrollHeight, scrollTop: sc.scrollTop, overflow: getComputedStyle(sc).overflowY } : null,
            imageRect: rect(img),
            dominanceRect: rect(code),
            stripRect: rect(strip),
            hiddenBelowFold: sc ? sc.scrollHeight - sc.clientHeight : null,
        };
    });
    say("=== P2. fold at 1440x900 (default desktop) ===");
    say(J(r));
    await p.screenshot({ path: `${OUT}/P2-fold-1440x900.png` });
    await ctx.close();
}

// ── P3: k-drag morph — layout jump across the out-in swap ──────────────
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 1400 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const p = await ctx.newPage();
    await load(p);
    const heights = await p.evaluate(async () => {
        const col = document.querySelector("code.fira-code")?.closest(".flex.flex-col.gap-3.min-w-0");
        const s = [...document.querySelectorAll('[role="slider"]')].find(
            (x) => x.getAttribute("aria-label") === "Number of colors",
        );
        const samples = [];
        const tick = () => samples.push(Math.round(col?.getBoundingClientRect().height ?? -1));
        tick();
        s?.focus();
        for (let i = 0; i < 6; i++) {
            s?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
            await new Promise((r) => setTimeout(r, 60));
            tick();
        }
        for (let i = 0; i < 24; i++) {
            await new Promise((r) => setTimeout(r, 100));
            tick();
        }
        return { samples, min: Math.min(...samples), max: Math.max(...samples) };
    });
    say("=== P3. result-column height across a k drag (px) ===");
    say(J(heights));
    await ctx.close();
}

// ── P4: mobile 390 truncation + caption wrap ───────────────────────────
{
    const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        colorScheme: "light",
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
    });
    const p = await ctx.newPage();
    await load(p);
    const r = await p.evaluate(() => {
        const code = document.querySelector("code.fira-code");
        const disp = document.querySelector(".font-display.text-display");
        return {
            codeVisible: code?.textContent.trim(),
            codeClientW: code?.clientWidth,
            codeScrollW: code?.scrollWidth,
            codeTruncated: code ? code.scrollWidth > code.clientWidth + 1 : null,
            visibleFraction: code ? +(code.clientWidth / code.scrollWidth).toFixed(2) : null,
            displayText: disp?.textContent.replace(/\s+/g, " ").trim(),
            rowW: disp?.parentElement?.parentElement?.getBoundingClientRect().width,
        };
    });
    say("=== P4. mobile 390 dominance row ===");
    say(J(r));
    await p.screenshot({ path: `${OUT}/P4-mobile390-populated.png`, fullPage: true });
    await ctx.close();
}

// ── P5: the missing state matrices for /#/extract ──────────────────────
const STATES = [
    { id: "reduced-motion", opts: { reducedMotion: "reduce" } },
    { id: "forced-colors", opts: { forcedColors: "active" } },
    { id: "rtl", opts: {}, rtl: true },
    { id: "zoom-200", opts: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 } },
];
for (const st of STATES) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 1400 },
        colorScheme: "light",
        deviceScaleFactor: 2,
        ...st.opts,
    });
    const p = await ctx.newPage();
    if (st.rtl) await p.addInitScript(() => document.documentElement.setAttribute("dir", "rtl"));
    await load(p);
    const r = await p.evaluate(() => {
        const de = document.documentElement;
        const seg = document.querySelector('[data-slot="shadow-palette"] .shadow-seg');
        const code = document.querySelector("code.fira-code");
        const disp = document.querySelector(".font-display.text-display");
        const row = disp?.parentElement?.parentElement;
        const cs = (e) => (e ? getComputedStyle(e) : {});
        const kids = row ? [...row.children].map((c) => ({ t: c.textContent.trim().slice(0, 24), x: Math.round(c.getBoundingClientRect().x) })) : [];
        const clipped = [...document.querySelectorAll("main *")]
            .filter((el) => el.getBoundingClientRect().width > 0)
            .filter((el) => el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2)
            .slice(0, 10)
            .map((el) => el.tagName.toLowerCase() + "." + String(el.className).split(/\s+/).slice(0, 2).join("."));
        return {
            dir: de.getAttribute("dir"),
            overflowX: Math.max(0, de.scrollWidth - de.clientWidth),
            segAnimDuration: seg ? getComputedStyle(seg).animationDuration : "(no shadow)",
            dominanceRowChildrenLTRorder: kids,
            codeTruncated: code ? code.scrollWidth > code.clientWidth + 1 : null,
            displayColor: cs(disp).color,
            clipped,
        };
    });
    say(`=== P5.${st.id} /#/extract ===`);
    say(J(r));
    await p.screenshot({ path: `${OUT}/P5-${st.id}-extract.png`, fullPage: false });
    await ctx.close();
}

writeFileSync(`${OUT}/probe4-log.txt`, log.join("\n"));
await browser.close();
console.log("DONE");
