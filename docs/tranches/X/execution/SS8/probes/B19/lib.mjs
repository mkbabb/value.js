// SS-8 · B19-color-chips — shared probe harness.
// One browser per run (caller), one context per cell, all closed in finally.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B19-color-chips", process.env.B19_RUN ?? "");
mkdirSync(EVID, { recursive: true });
export const BASE = process.env.B19_BASE ?? "http://localhost:9000";

export async function launch() {
    return chromium.launch({ headless: true });
}

export async function cell(browser, opts, fn) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    try {
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
        const out = await fn(page, ctx);
        return { ...out, pageErrors: errors.slice(0, 5) };
    } catch (e) {
        return { error: String(e).slice(0, 400) };
    } finally {
        await ctx.close();
    }
}

export function save(name, obj) {
    const p = resolve(EVID, name);
    writeFileSync(p, JSON.stringify(obj, null, 2));
    return p;
}

export async function go(page, route) {
    await page.goto(`${BASE}/#/${route}`, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.waitForTimeout(2500);
}

/** Open the Select whose LabeledField label text is `label`. */
export async function openSelect(page, label) {
    const ok = await page.evaluate((label) => {
        document.querySelectorAll("[data-b19-target]").forEach((e) => e.removeAttribute("data-b19-target"));
        const c = [...document.querySelectorAll("[role=combobox]")].find((c) => {
            const id = c.getAttribute("aria-labelledby");
            return id && document.getElementById(id)?.textContent?.trim() === label;
        });
        if (!c) return false;
        c.setAttribute("data-b19-target", "1");
        return true;
    }, label);
    if (!ok) throw new Error("no combobox labelled " + label);
    const t = page.locator("[data-b19-target]");
    await t.scrollIntoViewIfNeeded();
    await t.click();
    await page.waitForSelector("[role=listbox]", { timeout: 8000 });
    await page.waitForTimeout(500);
    return t;
}

/** Measure every chip in the open listbox. */
export async function measureChips(page) {
    return page.evaluate(() => {
        const lb = document.querySelector("[role=listbox]");
        const content = lb?.closest("[data-reka-popper-content-wrapper]") ?? lb?.parentElement;
        const r = (el) => {
            const b = el.getBoundingClientRect();
            return { x: +b.x.toFixed(3), y: +b.y.toFixed(3), w: +b.width.toFixed(3), h: +b.height.toFixed(3) };
        };
        const rows = [...(lb?.querySelectorAll("[role=option]") ?? [])].map((opt) => {
            const chip = opt.querySelector(".preview-chip");
            const desc = chip?.parentElement;
            const text = desc?.querySelector(".text-micro") ?? opt.querySelector(".text-micro");
            const cs = chip ? getComputedStyle(chip) : null;
            return {
                label: opt.textContent.trim().slice(0, 60),
                selected: opt.getAttribute("aria-selected"),
                disabled: opt.hasAttribute("data-disabled"),
                row: r(opt),
                chip: chip ? r(chip) : null,
                aspect: chip ? +(chip.getBoundingClientRect().width / chip.getBoundingClientRect().height).toFixed(4) : null,
                chipCS: cs && {
                    bg: cs.backgroundImage.slice(0, 300),
                    bgColor: cs.backgroundColor,
                    shadow: cs.boxShadow,
                    radius: cs.borderTopLeftRadius,
                    fca: cs.forcedColorAdjust,
                    minW: cs.minWidth,
                },
                stops: chip?.getAttribute("data-stops")?.slice(0, 400),
                stampedN: chip?.getAttribute("data-stops")?.split("|").length ?? 0,
                paintedN: cs ? (cs.backgroundImage.match(/oklch\(|rgba?\(|color\(|oklab\(/g) ?? []).length : 0,
                oldReStamped: chip ? [...(chip.getAttribute("data-stops") ?? "").matchAll(/oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g)].length : 0,
                oldRePainted: cs ? [...cs.backgroundImage.matchAll(/oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g)].length : 0,
                segments: chip ? [...chip.querySelectorAll(".preview-strip-segment")].map((s) => ({ ...r(s), bg: getComputedStyle(s).backgroundColor, mask: getComputedStyle(s).maskImage })) : [],
                desc: desc ? r(desc) : null,
                descFont: text ? getComputedStyle(text).fontSize + "/" + getComputedStyle(text).lineHeight : null,
                textRect: text ? r(text) : null,
                textOverflow: text ? { scrollW: text.scrollWidth, clientW: text.clientWidth } : null,
                comments: [...opt.childNodes].filter((n) => n.nodeType === 8).map((n) => n.data).slice(0, 3),
            };
        });
        return {
            listbox: lb ? r(lb) : null,
            content: content ? r(content) : null,
            contentScroll: lb ? { sh: lb.scrollHeight, ch: lb.clientHeight } : null,
            menuBg: content ? getComputedStyle(content.firstElementChild ?? content).backgroundColor : null,
            dir: document.documentElement.dir || null,
            rows,
        };
    });
}
