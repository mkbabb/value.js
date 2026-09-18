// CHALLENGE-D probe 3: the duplicate-name state, the leave-transition anchor,
// the well/card boundary strength per scheme, and the save-button focus ring.
import { webkit } from "@playwright/test";
import fs from "node:fs";
const ORIGIN = "http://localhost:9000";
const ROOT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const OUT = `${ROOT}/frames-D`;
const FIVE = ["#e2571f", "#12b8bd", "#ffc60b", "#25232b", "#6aab2f"];
const STORE = {
    version: 1,
    palettes: [{
        id: "seed-1", name: "Palette 2", slug: "palette-2", isLocal: true,
        colors: [{ css: "#123456", position: 0 }], tags: [],
        createdAt: "2026-07-01T00:00:00.000Z", updatedAt: "2026-07-01T00:00:00.000Z",
        visibility: "private", tier: "standard",
    }],
};

async function scene(browser, label, scheme) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    await ctx.addInitScript(([cols, store]) => {
        localStorage.setItem("color-picker", JSON.stringify({ inputColor: "#e2571f", savedColors: cols }));
        localStorage.setItem("color-palettes", JSON.stringify(store));
    }, [FIVE, STORE]);
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(4200);

    const structural = await page.evaluate(() => {
        const well = Array.from(document.querySelectorAll(".dashed-well")).filter((w) => w.getBoundingClientRect().width > 0)[0];
        const row = well.querySelector(".swatch-row");
        const wrap = row.querySelector("div.relative");
        const lum = (str) => {
            const m = str.match(/[\d.]+/g); if (!m) return null;
            const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
            return +(0.2126 * f(+m[0]) + 0.7152 * f(+m[1]) + 0.0722 * f(+m[2])).toFixed(4);
        };
        const opaqueBg = (el) => {
            let n = el;
            while (n && n !== document.documentElement) {
                const b = getComputedStyle(n).backgroundColor;
                const m = b.match(/[\d.]+/g);
                if (m && (m[3] === undefined || +m[3] === 1) && b !== "rgba(0, 0, 0, 0)") return { el: n.className?.toString().slice(0, 60), bg: b };
                n = n.parentElement;
            }
            return null;
        };
        // canvas-sample the two surfaces for a real rendered delta
        const cardBg = opaqueBg(well.parentElement);
        return {
            rowPosition: getComputedStyle(row).position,
            rowOffsetParent: row.offsetParent ? (row.offsetParent.tagName + "." + String(row.offsetParent.className).slice(0, 60)) : null,
            wrapOffsetParent: wrap.offsetParent ? (wrap.offsetParent.tagName + "." + String(wrap.offsetParent.className).slice(0, 60)) : null,
            wrapPosition: getComputedStyle(wrap).position,
            wellBg: getComputedStyle(well).backgroundColor,
            cardBg,
            wellBorderColor: getComputedStyle(well).borderColor,
        };
    });

    // click the save button -> duplicate-name row
    const clicked = await page.evaluate(() => {
        const well = Array.from(document.querySelectorAll(".dashed-well")).filter((w) => w.getBoundingClientRect().width > 0)[0];
        const b = well.querySelector("button");
        if (!b) return false;
        b.click();
        return true;
    });
    await page.waitForTimeout(600);
    const dup = await page.evaluate(() => {
        const well = Array.from(document.querySelectorAll(".dashed-well")).filter((w) => w.getBoundingClientRect().width > 0)[0];
        const rows = Array.from(well.children);
        const dupRow = rows.find((r) => /already exists/.test(r.textContent ?? ""));
        if (!dupRow) return null;
        const r = dupRow.getBoundingClientRect();
        const btns = Array.from(dupRow.querySelectorAll("button")).map((b) => {
            const br = b.getBoundingClientRect();
            return { text: b.textContent.trim(), w: +br.width.toFixed(1), h: +br.height.toFixed(1), fontSize: getComputedStyle(b).fontSize };
        });
        const msg = dupRow.querySelector("span");
        return {
            text: dupRow.textContent.replace(/\s+/g, " ").trim(),
            rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            role: dupRow.getAttribute("role"), ariaLive: dupRow.getAttribute("aria-live"),
            liveRegionsOnPage: Array.from(document.querySelectorAll("[aria-live],[role=status],[role=alert]")).map((e) => e.textContent.trim().slice(0, 50)),
            buttons: btns,
            msgFont: msg ? { family: getComputedStyle(msg).fontFamily.split(",")[0], size: getComputedStyle(msg).fontSize, style: getComputedStyle(msg).fontStyle } : null,
            wellHeight: +well.getBoundingClientRect().height.toFixed(1),
        };
    });
    await page.screenshot({ path: `${OUT}/${label}-duplicate.png` });
    const well = await page.evaluate(() => {
        const w = Array.from(document.querySelectorAll(".dashed-well")).filter((x) => x.getBoundingClientRect().width > 0)[0];
        const r = w.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    await page.screenshot({ path: `${OUT}/${label}-duplicate-well.png`, clip: { x: well.x - 18, y: well.y - 18, width: well.w + 36, height: well.h + 36 } });

    // focus the save button via keyboard
    await page.keyboard.press("Escape");
    const focusInfo = await page.evaluate(() => {
        const wellEl = Array.from(document.querySelectorAll(".dashed-well")).filter((x) => x.getBoundingClientRect().width > 0)[0];
        const b = wellEl.querySelector("button");
        if (!b) return { none: true, wellText: wellEl.textContent.replace(/\s+/g," ").trim().slice(0,120) };
        b.focus();
        const cs = getComputedStyle(b);
        return { outline: cs.outline, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow.slice(0, 120), activeEl: document.activeElement === b };
    });
    await ctx.close();
    return { label, scheme, structural, clicked, dup, focusInfo };
}

const browser = await webkit.launch();
const out = [];
out.push(await scene(browser, "dup-light", "light"));
out.push(await scene(browser, "dup-dark", "dark"));
await browser.close();
fs.writeFileSync(`${ROOT}/probe-D3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
