/**
 * CHALLENGE-D (second seat) probe 1 — is the F8 inset hairline ring ever
 * PAINTED on PreviewStrip?
 *
 * Hypothesis: CSS paints an element's inset box-shadow above its own
 * background but BELOW its in-flow descendants. PreviewStrip carries its
 * colour payload in opaque CHILD spans that fill the padding box, so the ring
 * is occluded. PreviewRamp carries its payload as a background-image on the
 * element itself, so the same declaration IS painted there.
 *
 * A/B: same box-shadow declaration, two components, real app, DSF 4.
 *   A = /generate  Preset menu  .preview-strip   (payload in children)
 *   B = /mix       Space  menu  .preview-chip    (payload in own background)
 * Plus C = a synthetic in-page control pair that isolates the mechanism.
 *
 * Read-only against the repo. Writes PNGs + JSON next to this file.
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:9000";
const log = {};

const styleOf = (sel, props) => [sel, props];

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 4,
        colorScheme: "light",
    });
    const page = await ctx.newPage();

    // ---------- A · PreviewStrip on /generate ----------
    await page.goto(`${BASE}/#/generate`, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    await page.getByLabel("Generation preset").click();
    await page.waitForSelector(".preview-strip");
    await page.waitForTimeout(400);

    log.strip = await page.evaluate(() => {
        const el = document.querySelector(".preview-strip");
        const cs = getComputedStyle(el);
        const seg = el.firstElementChild;
        const segCs = getComputedStyle(seg);
        const r = el.getBoundingClientRect();
        // font-size chain: the 1em the "golden plate" is measured against
        const chain = [];
        for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
            chain.push({
                tag: n.tagName + (n.className ? "." + String(n.className).split(" ")[0] : ""),
                fontSize: getComputedStyle(n).fontSize,
            });
            if (chain.length >= 5) break;
        }
        return {
            rect: { w: +r.width.toFixed(3), h: +r.height.toFixed(3) },
            ratio: +(r.width / r.height).toFixed(4),
            boxShadow: cs.boxShadow,
            borderRadius: cs.borderRadius,
            display: cs.display,
            overflow: cs.overflow,
            fontSize: cs.fontSize,
            rootFontSize: getComputedStyle(document.documentElement).fontSize,
            segCount: el.children.length,
            segBg: segCs.backgroundColor,
            segRect: (() => {
                const s = seg.getBoundingClientRect();
                return { w: +s.width.toFixed(3), h: +s.height.toFixed(3) };
            })(),
            dataStops: el.getAttribute("data-stops"),
            fontChain: chain,
        };
    });
    await page.locator(".preview-strip").first().screenshot({ path: join(OUT, "A-strip.png") });

    // Synthetic control C, injected into the same document/scheme so the
    // ring colour resolves identically. Two boxes, same box-shadow:
    //   C1 = payload as background-color on the box itself
    //   C2 = payload as an opaque child that fills the box
    log.control = await page.evaluate(() => {
        const host = document.createElement("div");
        host.id = "__probeD2";
        host.style.cssText =
            "position:fixed;left:8px;top:8px;z-index:99999;display:flex;gap:8px;background:#fff;padding:8px";
        const ring =
            "inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent)";
        const mk = (child) => {
            const b = document.createElement("span");
            b.style.cssText = `display:inline-flex;inline-size:2.618rem;block-size:1rem;overflow:hidden;border-radius:4px;box-shadow:${ring};`;
            if (child) {
                const c = document.createElement("span");
                c.style.cssText = "flex:1 1 0;block-size:100%;background-color:#d2792f";
                b.appendChild(c);
            } else {
                b.style.backgroundColor = "#d2792f";
            }
            return b;
        };
        const c1 = mk(false);
        const c2 = mk(true);
        c1.id = "__c1";
        c2.id = "__c2";
        host.append(c1, c2);
        document.body.appendChild(host);
        return {
            resolvedRing: getComputedStyle(c1).boxShadow,
            note: "C1 = background on self; C2 = opaque child fills box",
        };
    });
    await page.locator("#__c1").screenshot({ path: join(OUT, "C1-bg-on-self.png") });
    await page.locator("#__c2").screenshot({ path: join(OUT, "C2-opaque-child.png") });
    await page.evaluate(() => document.getElementById("__probeD2")?.remove());
    await page.keyboard.press("Escape");

    // ---------- count sweep: what does the strip PAINT vs what it HOLDS ----------
    const sweep = [];
    const slider = page.locator('[role="slider"][aria-label="Color count"]');
    await slider.click();
    await page.keyboard.press("Home"); // count = 1
    for (let n = 1; n <= 12; n++) {
        if (n > 1) await page.keyboard.press("ArrowRight");
        await page.waitForTimeout(120);
        await page.getByLabel("Generation preset").click();
        await page.waitForSelector(".preview-strip");
        await page.waitForTimeout(180);
        const row = await page.evaluate(() => {
            const el = document.querySelector(".preview-strip");
            const stops = (el.getAttribute("data-stops") || "").split("|").filter(Boolean);
            const painted = [...el.children].map((c) => getComputedStyle(c).backgroundColor);
            const last = el.lastElementChild;
            return {
                held: stops.length,
                painted: painted.length,
                truncated: el.classList.contains("preview-strip--truncated"),
                segW: +el.firstElementChild.getBoundingClientRect().width.toFixed(3),
                paintedColors: painted,
                heldStops: stops,
                lastMask: getComputedStyle(last).maskImage,
            };
        });
        sweep.push({ count: n, ...row });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(120);
        await slider.click();
    }
    log.sweep = sweep;

    // ---------- B · PreviewRamp on /mix ----------
    await page.goto(`${BASE}/#/mix`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    try {
        await page.getByLabel("Color space").click();
        await page.waitForSelector(".preview-chip", { timeout: 5000 });
        await page.waitForTimeout(400);
        log.ramp = await page.evaluate(() => {
            const el = document.querySelector(".preview-chip");
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return {
                cls: el.className,
                rect: { w: +r.width.toFixed(3), h: +r.height.toFixed(3) },
                ratio: +(r.width / r.height).toFixed(4),
                boxShadow: cs.boxShadow,
                display: cs.display,
                childCount: el.children.length,
                bgImage: cs.backgroundImage.slice(0, 90) + "…",
            };
        });
        await page.locator(".preview-chip").first().screenshot({ path: join(OUT, "B-ramp.png") });
    } catch (e) {
        log.ramp = { error: String(e).slice(0, 200) };
    }

    // ---------- /atmosphere row rhythm + the chip's 1em anchor ----------
    await page.goto(`${BASE}/#/atmosphere`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    try {
        await page.getByLabel("Palette harmony").click();
        await page.waitForSelector(".preview-strip", { timeout: 5000 });
        await page.waitForTimeout(400);
        log.atmo = await page.evaluate(() => {
            const el = document.querySelector(".preview-strip");
            const r = el.getBoundingClientRect();
            const rows = [...document.querySelectorAll('[role="option"]')].map((o) => ({
                text: (o.textContent || "").trim().slice(0, 24),
                h: +o.getBoundingClientRect().height.toFixed(2),
                w: +o.getBoundingClientRect().width.toFixed(2),
                accName: o.getAttribute("aria-label") || (o.textContent || "").trim(),
            }));
            return {
                rect: { w: +r.width.toFixed(3), h: +r.height.toFixed(3) },
                ratio: +(r.width / r.height).toFixed(4),
                fontSize: getComputedStyle(el).fontSize,
                segCount: el.children.length,
                dataStops: el.getAttribute("data-stops"),
                rows,
                chipAreaSharePct: +(
                    ((r.width * r.height) /
                        (rows[0].w * rows[0].h)) *
                    100
                ).toFixed(2),
            };
        });
        await page.locator(".preview-strip").first().screenshot({ path: join(OUT, "D-atmo-strip.png") });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
        // sibling rows without a chip
        await page.getByLabel("Zone arrangement").click();
        await page.waitForTimeout(300);
        log.atmoSibling = await page.evaluate(() =>
            [...document.querySelectorAll('[role="option"]')].map((o) => ({
                text: (o.textContent || "").trim().slice(0, 20),
                h: +o.getBoundingClientRect().height.toFixed(2),
            })),
        );
    } catch (e) {
        log.atmo = { error: String(e).slice(0, 300) };
    }

    writeFileSync(join(OUT, "ring-occlusion.json"), JSON.stringify(log, null, 2));
    console.log(JSON.stringify(log, null, 2).slice(0, 12000));
    await browser.close();
}

main().catch((e) => {
    console.error("FAIL", e);
    process.exit(1);
});
