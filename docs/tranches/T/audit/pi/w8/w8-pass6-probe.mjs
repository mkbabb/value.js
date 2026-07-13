/**
 * T.W8 · CRITIQUE PASS 6 (MIX + GENERATE) — the probe instrument (O-3 class;
 * probe-only, no writes to the app tree). Drives the LANE servers :8650 (dev,
 * VITE_API_URL same-origin) / :8651 (built gh-pages, tree-fresh rebuild) — the
 * owner's :9000 is never touched.
 *
 * The two cards are judged TOGETHER as the T-45 card-border-clip population
 * (owner plural, t33-audit-13), now under the §0.7 T-53 PERSISTENCE lens (the
 * owner re-sighted the class at 5e4f1f6 WITH the Lane-M carrier landed —
 * t49-audit-05, the Generate top edge).
 *
 * Legs:
 *   A · BUILT (:8651) — the T-45/T-53 carrier truth: Mix + Generate ×
 *       light+dark @1440 dpr2 (+390 dark), the owner reference color
 *       lab(40.39% 52.94 47.26 / 82.7%) driving a bright field. Per card:
 *       carrier forensics (who hosts the ::before, is the card's own filter
 *       dead, box alignment host↔card, radii, clip-path), corner crops ×4,
 *       top-edge strip crop + a NUMERIC per-row luminance profile (the
 *       edge-band metric the Lane-M gate used: bright-band-inside-edge vs
 *       interior baseline, 8-bit).
 *   B · DEV (:8650) — the 6-cell coherence sweep (1440·768·390 × light+dark):
 *       console attest, full frames, T-41 Mix empty-state probe (palettes
 *       mode: EmptyState trio present / ShadowPalette fillers ZERO), T-24
 *       neutrals census (card / well plate / chrome inks), T-54 swatch
 *       species witness, T-55 verb-cluster register witness.
 *   C · DEV @1440 dark — interaction drives: Generate regenerate (seed
 *       re-stamp), Mix colors-mode convergence (add ×2 → Mix → result plate
 *       inks), with frames + the result plate judged over the bright field.
 *   D · BUILT @1440 dark — a light pane-swap screencast witness
 *       (picker→Mix→Generate); the T-58 mechanism re-analysis stays pass-2's.
 *
 * PNGs land under pi/w8/mix-generate/ (gitignored-by-class, the standing
 * convention); this script + the log txt are the committed record.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const DEV = "http://localhost:8650";
const BUILT = "http://localhost:8651";
const OUT = "docs/tranches/T/audit/pi/w8/mix-generate";
mkdirSync(`${OUT}/motion`, { recursive: true });

const OWNER_COLOR = "lab(40.39% 52.94 47.26 / 82.7%)";
const deepLink = (base, view) =>
    `${base}/#/${view}?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`;

const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

const browser = await chromium.launch({ headless: false, channel: "chromium" });

const ENV_NOISE =
    /Failed to load resource|\b(429|503|504)\b|Too Many Requests|blocked by CORS policy/;
const BUILT_DESIGNED =
    /VITE_API_URL|misconfigured|DevMisconfigError|api\.color\.babb\.dev/i;

async function newPage(scheme, viewport) {
    const ctx = await browser.newContext({
        viewport,
        colorScheme: scheme,
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const errors = { raw: [], filtered: [], designed: [] };
    page.on("console", (m) => {
        if (m.type() !== "error") return;
        const t = m.text();
        errors.raw.push(t);
        if (BUILT_DESIGNED.test(t)) errors.designed.push(t);
        else if (!ENV_NOISE.test(t)) errors.filtered.push(t);
    });
    page.on("pageerror", (e) => {
        errors.raw.push(String(e));
        errors.filtered.push(String(e));
    });
    return { ctx, page, errors };
}

async function settle(page) {
    await page.waitForSelector(".glass-dock", { timeout: 20000 });
    await page.waitForTimeout(3500); // past the boot overture
}

/** Resolve the pane card that contains the given header title text. */
async function paneCard(page, title) {
    const card = page
        .locator(`.glass-resting:has(h2:text-is("${title}"))`)
        .first();
    if (await card.count()) return card;
    return page.locator(`.glass-resting:has-text("${title}")`).first();
}

/** THE CARRIER FORENSIC — who blurs, where the clip band lands. */
async function carrierForensic(page, cardLoc) {
    return cardLoc.evaluate((card) => {
        const cs = getComputedStyle(card);
        const box = (el) => {
            const r = el.getBoundingClientRect();
            return {
                x: +r.x.toFixed(1),
                y: +r.y.toFixed(1),
                w: +r.width.toFixed(1),
                h: +r.height.toFixed(1),
            };
        };
        const out = {
            cardBackdropFilter: cs.backdropFilter,
            cardWebkitBackdropFilter:
                cs.webkitBackdropFilter ?? "(unsupported)",
            cardRadius: cs.borderRadius,
            cardBox: box(card),
            radiusCardVar: getComputedStyle(document.documentElement)
                .getPropertyValue("--radius-card")
                .trim(),
            blurRestingVar: cs.getPropertyValue("--glass-blur-resting").trim(),
            blurRadiusVar: cs
                .getPropertyValue("--glass-blur-resting-radius")
                .trim(),
            carriers: [],
        };
        let el = card;
        for (let depth = 0; el && depth <= 4; depth++, el = el.parentElement) {
            const p = getComputedStyle(el, "::before");
            if (p.content !== "none" && p.backdropFilter !== "none") {
                out.carriers.push({
                    depth,
                    tag: el.tagName,
                    cls: String(el.className).slice(0, 90),
                    hostBox: box(el),
                    beforeBackdropFilter: p.backdropFilter,
                    beforeInset: `${p.top} ${p.right} ${p.bottom} ${p.left}`,
                    beforeClipPath: p.clipPath,
                    hostPosition: getComputedStyle(el).position,
                });
            }
        }
        return out;
    });
}

/** Numeric edge profile: clip screenshot → decode in-page → per-row means. */
async function edgeProfile(page, clip, label) {
    const buf = await page.screenshot({ clip });
    const b64 = buf.toString("base64");
    const rows = await page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        const means = [];
        for (let y = 0; y < c.height; y++) {
            let s = 0;
            for (let x = 0; x < c.width; x++) {
                const i = (y * c.width + x) * 4;
                s += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
            }
            means.push(+(s / c.width).toFixed(2));
        }
        return means;
    }, b64);
    // Device rows (dpr2). Edge sits at CSS offset `clipEdge` from clip top.
    return { label, rows };
}

function bandMetric(rows, edgeCssOffset, dpr = 2) {
    const e = Math.round(edgeCssOffset * dpr);
    // inside band: CSS +1.5..+10 px inside the edge (the ≈blur-radius smear zone)
    const band = rows.slice(e + 3, e + 20);
    // interior baseline: CSS +14..+22 px inside
    const base = rows.slice(e + 28, e + 44);
    const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
    const bm = mean(base);
    return {
        bandMax: +Math.max(...band).toFixed(2),
        bandMean: +mean(band).toFixed(2),
        baseMean: +bm.toFixed(2),
        deltaMax: +(Math.max(...band) - bm).toFixed(2),
        deltaMean: +(mean(band) - bm).toFixed(2),
    };
}

async function cardEdgeLeg(page, cardLoc, stem) {
    const b = await cardLoc.boundingBox();
    if (!b) return log(`  !! ${stem}: no bounding box`);
    const f = await carrierForensic(page, cardLoc);
    log(`  ${stem} · card bf=${f.cardBackdropFilter} radius=${f.cardRadius}`);
    log(
        `  ${stem} · --radius-card=${f.radiusCardVar} --glass-blur-resting=${f.blurRestingVar || "(unset)"} --glass-blur-resting-radius=${f.blurRadiusVar || "(unset)"}`,
    );
    if (f.carriers.length === 0)
        log(`  ${stem} · !! NO ::before carrier found on card or 4 ancestors`);
    for (const c of f.carriers) {
        const dx = +(c.hostBox.x - f.cardBox.x).toFixed(1);
        const dy = +(c.hostBox.y - f.cardBox.y).toFixed(1);
        const dw = +(c.hostBox.w - f.cardBox.w).toFixed(1);
        const dh = +(c.hostBox.h - f.cardBox.h).toFixed(1);
        log(
            `  ${stem} · carrier depth=${c.depth} <${c.tag} class="${c.cls}"> pos=${c.hostPosition} bf=${c.beforeBackdropFilter}`,
        );
        log(
            `  ${stem} · carrier host↔card box delta: dx=${dx} dy=${dy} dw=${dw} dh=${dh} · inset=${c.beforeInset} · clip=${c.beforeClipPath}`,
        );
    }
    // corner crops (120 CSS px) + top-edge strip
    const P = 26; // outside margin so the field beyond the edge is in frame
    const crop = async (name, clip) => {
        clip.x = Math.max(0, clip.x);
        clip.y = Math.max(0, clip.y);
        await page.screenshot({ path: `${OUT}/${name}.png`, clip });
    };
    await crop(`${stem}-corner-tl`, { x: b.x - P, y: b.y - P, width: 130, height: 130 });
    await crop(`${stem}-corner-tr`, { x: b.x + b.width - 104, y: b.y - P, width: 130, height: 130 });
    await crop(`${stem}-corner-bl`, { x: b.x - P, y: b.y + b.height - 104, width: 130, height: 130 });
    await crop(`${stem}-corner-br`, { x: b.x + b.width - 104, y: b.y + b.height - 104, width: 130, height: 130 });
    await crop(`${stem}-top-edge`, {
        x: b.x + 60,
        y: b.y - 14,
        width: Math.min(b.width - 120, 640),
        height: 60,
    });
    // numeric top-edge profile — clip starts 10 CSS px ABOVE the edge
    const prof = await edgeProfile(
        page,
        {
            x: b.x + Math.min(120, b.width / 4),
            y: b.y - 10,
            width: Math.min(400, b.width / 2),
            height: 42,
        },
        stem,
    );
    const m = bandMetric(prof.rows, 10);
    log(
        `  ${stem} · TOP-EDGE PROFILE (8-bit): band(max ${m.bandMax} · mean ${m.bandMean}) vs interior ${m.baseMean} → Δmax ${m.deltaMax} · Δmean ${m.deltaMean}`,
    );
    return { forensic: f, metric: m };
}

async function openViewViaDock(page, name) {
    const collapsed = page.locator(".glass-dock.collapsed");
    if (await collapsed.count()) {
        await collapsed.click();
        await page.waitForTimeout(900);
    }
    await page.getByRole("combobox", { name: "Select view" }).click();
    const opt = page.getByRole("option", { name, exact: true });
    await opt.waitFor({ state: "visible", timeout: 5000 });
    await opt.click();
}

/* ═══ LEG A · BUILT carrier truth ══════════════════════════════════════ */
log("═══ LEG A · BUILT (:8651) T-45/T-53 carrier truth ═══");
for (const [scheme, vp, tag] of [
    ["dark", { width: 1440, height: 900 }, "1440-dark"],
    ["light", { width: 1440, height: 900 }, "1440-light"],
    ["dark", { width: 390, height: 844 }, "390-dark"],
]) {
    for (const view of ["mix", "generate"]) {
        const { ctx, page, errors } = await newPage(scheme, vp);
        await page.goto(deepLink(BUILT, view));
        await settle(page);
        const stem = `built-${view}-${tag}`;
        await page.screenshot({ path: `${OUT}/${stem}-full.png` });
        const title = view === "mix" ? "Mix" : "Generate";
        const card = await paneCard(page, title);
        if (await card.count()) {
            await cardEdgeLeg(page, card, stem);
        } else log(`  !! ${stem}: pane card not found`);
        // the SECOND card in view (population read, 1440 only)
        if (vp.width === 1440) {
            const otherTitle = view === "mix" ? "Lab" : "Palettes";
            const other = page
                .locator(".glass-resting")
                .filter({ hasNot: page.locator(`h2:text-is("${title}")`) })
                .first();
            if (await other.count())
                await cardEdgeLeg(page, other, `${stem}-sibling-${otherTitle.toLowerCase()}`);
        }
        log(
            `  ${stem} · console raw=${errors.raw.length} designed(misconfig)=${errors.designed.length} REAL=${errors.filtered.length}${errors.filtered.length ? " → " + errors.filtered.join(" | ").slice(0, 300) : ""}`,
        );
        await ctx.close();
    }
}

/* ═══ LEG B · DEV 6-cell coherence sweep ═══════════════════════════════ */
log("═══ LEG B · DEV (:8650) 6-cell sweep ═══");
const CELLS = [
    [{ width: 1440, height: 900 }, "1440"],
    [{ width: 768, height: 1024 }, "768"],
    [{ width: 390, height: 844 }, "390"],
];
for (const [vp, vtag] of CELLS) {
    for (const scheme of ["light", "dark"]) {
        for (const view of ["mix", "generate"]) {
            const { ctx, page, errors } = await newPage(scheme, vp);
            await page.goto(deepLink(DEV, view));
            await settle(page);
            const stem = `dev-${view}-${vtag}-${scheme}`;
            await page.screenshot({ path: `${OUT}/${stem}-full.png` });

            if (view === "mix") {
                // T-41: palettes mode — the true-empty state
                const palettesTab = page
                    .getByRole("main")
                    .getByText("Palettes", { exact: true })
                    .first();
                if (await palettesTab.count()) {
                    await palettesTab.click();
                    await page.waitForTimeout(700);
                    const probe = await page.evaluate(() => {
                        const main =
                            document.querySelector("main") ?? document.body;
                        const ghosts = main.querySelectorAll(
                            "[class*='shadow-palette'], [data-shadow-palette]",
                        ).length;
                        const skeletons = main.querySelectorAll(
                            "[class*='skeleton'], [class*='animate-pulse']",
                        ).length;
                        const empty = main.querySelector(
                            "[class*='empty'], [data-empty-state]",
                        );
                        const dots = main.querySelectorAll(
                            ".watercolor-swatch, [class*='watercolor']",
                        ).length;
                        return {
                            ghosts,
                            skeletons,
                            emptyPresent: !!empty,
                            emptyText: empty?.textContent?.trim().slice(0, 120),
                            watercolorNodes: dots,
                        };
                    });
                    log(
                        `  ${stem} · T-41 palettes-empty: ShadowPalette-fillers=${probe.ghosts} skeleton-nodes=${probe.skeletons} EmptyState=${probe.emptyPresent} watercolor-nodes=${probe.watercolorNodes}`,
                    );
                    log(`  ${stem} · empty text: "${probe.emptyText}"`);
                    await page.screenshot({
                        path: `${OUT}/${stem}-palettes-empty.png`,
                    });
                }
            }

            if (view === "generate" && vtag === "1440") {
                // T-24 neutrals + T-54 + T-55 witnesses
                const w = await page.evaluate(() => {
                    const cs = (el, p) => (el ? getComputedStyle(el)[p] : null);
                    const card = document.querySelector(
                        "main .glass-resting",
                    );
                    const plate = document.querySelector(
                        "[data-generate-plate]",
                    );
                    const swatch = document.querySelector(".generate-swatch");
                    const verbs = [
                        ...(plate?.querySelectorAll("button") ?? []),
                    ]
                        .filter((b) =>
                            /Regenerate|Save palette|Copy all colors/.test(
                                b.getAttribute("aria-label") ?? b.textContent,
                            ),
                        )
                        .map((b) => ({
                            name: (
                                b.getAttribute("aria-label") ??
                                b.textContent.trim()
                            ).slice(0, 20),
                            bg: cs(b, "backgroundColor"),
                            border: cs(b, "borderColor"),
                            bw: cs(b, "borderWidth"),
                            h: b.getBoundingClientRect().height.toFixed(1),
                            radius: cs(b, "borderRadius"),
                        }));
                    return {
                        cardBg: cs(card, "backgroundColor"),
                        plateBg: cs(plate, "backgroundColor"),
                        plateRadius: cs(plate, "borderRadius"),
                        plateShadow: cs(plate, "boxShadow")?.slice(0, 120),
                        swatchRadius: cs(swatch, "borderRadius"),
                        swatchTag: swatch?.tagName,
                        swatchIsWatercolor:
                            !!swatch?.closest("[class*='watercolor']") ||
                            swatch?.className.includes("watercolor"),
                        verbs,
                    };
                });
                log(`  ${stem} · T-24 cardBg=${w.cardBg} plateBg=${w.plateBg}`);
                log(
                    `  ${stem} · T-54 swatch: <${w.swatchTag}> radius=${w.swatchRadius} watercolor=${w.swatchIsWatercolor}`,
                );
                for (const v of w.verbs)
                    log(
                        `  ${stem} · T-55 verb "${v.name}": bg=${v.bg} border=${v.bw} ${v.border} h=${v.h} r=${v.radius}`,
                    );
                const plate = page.locator("[data-generate-plate]");
                await plate.screenshot({ path: `${OUT}/${stem}-plate.png` });
            }

            log(
                `  ${stem} · console raw=${errors.raw.length} REAL=${errors.filtered.length}${errors.filtered.length ? " → " + errors.filtered.join(" | ").slice(0, 300) : ""}`,
            );
            await ctx.close();
        }
    }
}

/* ═══ LEG C · interaction drives @1440 dark (DEV) ══════════════════════ */
log("═══ LEG C · DEV interaction drives ═══");
{
    // Generate: regenerate re-stamps the seed
    const { ctx, page, errors } = await newPage("dark", {
        width: 1440,
        height: 900,
    });
    await page.goto(deepLink(DEV, "generate"));
    await settle(page);
    const plate = page.locator("[data-generate-plate]");
    const seed = plate.getByText(/seed: [0-9a-f]{8}/);
    const before = ((await seed.textContent()) ?? "").trim();
    await plate.getByRole("button", { name: "Regenerate" }).click();
    await page.waitForTimeout(400);
    const after = ((await seed.textContent()) ?? "").trim();
    log(
        `  generate · regenerate: "${before}" → "${after}" (${before !== after ? "RE-STAMPED" : "!! UNCHANGED"})`,
    );
    await plate.screenshot({ path: `${OUT}/dev-generate-1440-dark-plate-after-regen.png` });
    log(`  generate-interact · console REAL=${errors.filtered.length}`);
    await ctx.close();
}
{
    // Mix: colors mode — add ×2, Mix, converge, result plate
    const { ctx, page, errors } = await newPage("dark", {
        width: 1440,
        height: 900,
    });
    await page.goto(deepLink(DEV, "mix"));
    await settle(page);
    const main = page.getByRole("main");
    const addSlot = main.getByRole("button", {
        name: "Add current color to the mix",
    });
    await addSlot.click();
    await addSlot.click();
    await main.getByRole("button", { name: "Mix", exact: true }).click();
    await page.waitForTimeout(650); // mid-convergence
    await page.screenshot({ path: `${OUT}/dev-mix-1440-dark-converging.png` });
    await main
        .getByText(/^oklab\(/)
        .first()
        .waitFor({ timeout: 8000 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/dev-mix-1440-dark-result.png` });
    const resultProbe = await page.evaluate(() => {
        const el = [...document.querySelectorAll("main *")].find((n) =>
            /^oklab\(/.test(n.textContent?.trim() ?? "") &&
            n.children.length === 0,
        );
        const plate = el?.closest("div[class*='rounded']");
        if (!plate) return null;
        const cs = getComputedStyle(plate);
        return {
            bg: cs.backgroundColor,
            radius: cs.borderRadius,
            backdrop: cs.backdropFilter,
        };
    });
    log(`  mix · result plate: ${JSON.stringify(resultProbe)}`);
    log(`  mix-interact · console REAL=${errors.filtered.length}${errors.filtered.length ? " → " + errors.filtered.join(" | ").slice(0, 200) : ""}`);
    await ctx.close();
}

/* ═══ LEG D · pane-swap screencast witness (BUILT, dark) ═══════════════ */
log("═══ LEG D · pane-swap witness (BUILT) ═══");
{
    const { ctx, page } = await newPage("dark", { width: 1440, height: 900 });
    await page.goto(deepLink(BUILT, ""));
    await settle(page);
    const cdp = await ctx.newCDPSession(page);
    const frames = [];
    cdp.on("Page.screencastFrame", async (f) => {
        frames.push({ ts: f.metadata.timestamp, data: f.data });
        await cdp
            .send("Page.screencastFrameAck", { sessionId: f.sessionId })
            .catch(() => {});
    });
    await cdp.send("Page.startScreencast", {
        format: "png",
        everyNthFrame: 1,
        maxWidth: 1440,
        maxHeight: 900,
    });
    await openViewViaDock(page, "Mix");
    await page.waitForTimeout(1400);
    await openViewViaDock(page, "Generate");
    await page.waitForTimeout(1400);
    await cdp.send("Page.stopScreencast");
    const t0 = frames[0]?.ts ?? 0;
    for (const f of frames)
        writeFileSync(
            `${OUT}/motion/f${String(Math.round((f.ts - t0) * 1000)).padStart(5, "0")}ms.png`,
            Buffer.from(f.data, "base64"),
        );
    const gaps = frames
        .slice(1)
        .map((f, i) => (f.ts - frames[i].ts) * 1000);
    const worst = gaps.length ? Math.max(...gaps).toFixed(0) : "n/a";
    log(
        `  swap screencast: ${frames.length} frames · worst inter-frame gap ${worst}ms (compositor-frame series; the T-58 mechanism analysis is pass-2's)`,
    );
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/../w8-pass6-probe-log.txt`, report.join("\n") + "\n");
log("DONE");
