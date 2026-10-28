// SS-8 · Z3 · GenerateControls (route #/generate) — headless witness cells.
import { cell, go, runCells, png, cr } from "./lib.mjs";

const PLATE = "[data-generate-plate]";

const RECON = () => {
    const plate = document.querySelector("[data-generate-plate]");
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const rect = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round(r.x * 10) / 10, Math.round(r.y * 10) / 10, Math.round(r.width * 10) / 10, Math.round(r.height * 10) / 10]; };
    const sw = [...document.querySelectorAll(".generate-swatch")];
    const swatches = sw.map((el) => ({
        tag: el.tagName, role: el.getAttribute("role"), aria: el.getAttribute("aria-label"), ariaHidden: el.getAttribute("aria-hidden"),
        tabIndex: el.tabIndex, pe: cs(el).pointerEvents, cls: el.className.toString().slice(0, 160), rect: rect(el),
        hasWatercolorSwatch: el.classList.contains("watercolor-swatch") || !!el.querySelector(".watercolor-swatch"),
        transition: cs(el).transitionProperty + " " + cs(el).transitionDuration,
    }));
    const labels = [...(plate?.querySelectorAll("[aria-label]") || [])].map((e) => e.tagName + ":" + e.getAttribute("aria-label"));
    const buttons = [...document.querySelectorAll("main button, main [role=button]")].map((b) => ({
        name: (b.getAttribute("aria-label") || b.innerText || "").trim().slice(0, 60), variant: b.getAttribute("variant"), emphasis: b.getAttribute("data-emphasis"),
        inPlate: !!plate?.contains(b), vis: cs(b).visibility, rect: rect(b),
    }));
    const allRegen = [...document.querySelectorAll("button")].filter((b) => /regenerate/i.test((b.getAttribute("aria-label") || "") + " " + b.innerText)).map((b) => ({ name: (b.getAttribute("aria-label") || b.innerText).trim().slice(0, 50), inPlate: !!plate?.contains(b), inDock: !!b.closest("nav,[data-dock],.dock,[class*=dock]"), vis: cs(b).visibility, rect: rect(b) }));
    const sliders = [...document.querySelectorAll("main [role=slider]")].map((s) => {
        const lb = s.getAttribute("aria-labelledby");
        const root = s.closest("[data-slot=slider],[class*=slider]") || s.parentElement?.parentElement;
        return { name: s.getAttribute("aria-label"), labelledby: lb, labelText: lb ? lb.split(" ").map((i) => document.getElementById(i)?.textContent.trim()).join("|") : null,
            now: s.getAttribute("aria-valuenow"), min: s.getAttribute("aria-valuemin"), max: s.getAttribute("aria-valuemax"), text: s.getAttribute("aria-valuetext"), rect: rect(s),
            trackRect: rect(root), trackBg: root ? cs(root).backgroundImage.slice(0, 300) : null };
    });
    const live = [...document.querySelectorAll("[aria-live],[role=status],[role=alert]")].map((e) => ({ tag: e.tagName, role: e.getAttribute("role"), live: e.getAttribute("aria-live"), text: e.textContent.trim().slice(0, 80) }));
    const card = plate?.closest(".glass-card,[data-tier],[class*=card]")?.parentElement?.closest(".glass-card,[data-tier],[class*=card]") || plate?.parentElement?.closest("[class*=card]");
    const badges = [...(plate?.querySelectorAll("[data-slot=badge],.badge,[class*=badge]") || [])].map((b) => ({ text: b.textContent.trim(), aria: b.getAttribute("aria-label") }));
    const rootCS = getComputedStyle(document.documentElement);
    return {
        swatchCount: sw.length, swatches: swatches.slice(0, 3), labels, buttons, allRegen, sliders, live, badges,
        plate: plate ? { rect: rect(plate), border: cs(plate).borderTopWidth + " " + cs(plate).borderTopColor, bg: cs(plate).backgroundColor, shadow: cs(plate).boxShadow.slice(0, 120), transition: cs(plate).transitionProperty + " " + cs(plate).transitionDuration } : null,
        card: card ? { cls: card.className.toString().slice(0, 120), border: cs(card).borderTopWidth, bg: cs(card).backgroundColor, shadow: cs(card).boxShadow.slice(0, 120) } : null,
        tokens: { card: rootCS.getPropertyValue("--card").trim(), wellBg: rootCS.getPropertyValue("--well-bg").trim() },
        title: plate?.querySelector("input") ? { value: plate.querySelector("input").value, aria: plate.querySelector("input").getAttribute("aria-label"), rect: rect(plate.querySelector("input")) } : null,
        visibleCountText: [...(plate?.parentElement?.querySelectorAll("*") || [])].filter((e) => e.children.length === 0 && /^\d+$/.test(e.textContent.trim())).map((e) => e.tagName + ":" + e.textContent.trim() + ":" + (e.closest("[aria-hidden=true]") ? "hidden" : "shown")).slice(0, 6),
    };
};

/** distinct line tops among a flex container's children */
const ROWS = () => {
    const plate = document.querySelector("[data-generate-plate]");
    return [...plate.querySelectorAll("div")].filter((d) => getComputedStyle(d).display.includes("flex") && d.children.length > 1).map((d) => {
        const tops = [...new Set([...d.children].map((c) => Math.round(c.getBoundingClientRect().top)))];
        return { cls: d.className.toString().slice(0, 60), kids: d.children.length, lines: tops.length, w: Math.round(d.getBoundingClientRect().width), sw: d.scrollWidth, cw: d.clientWidth };
    });
};

const cells = {
    recon: (b) => cell(b, "recon", {}, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        await p.screenshot({ path: png("gc-recon-1440-light"), fullPage: false });
        return { r: await p.evaluate(RECON) };
    }),
    dark: (b) => cell(b, "dark", { dark: true }, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const r = await p.evaluate(RECON);
        return { plate: r.plate, card: r.card, tokens: r.tokens };
    }),
    copy: (b) => cell(b, "copy", { permissions: ["clipboard-read", "clipboard-write"] }, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const before = await p.evaluate(RECON);
        await p.evaluate(() => navigator.clipboard.writeText("SENTINEL"));
        const hit = await p.evaluate(() => { const s = document.querySelector(".generate-swatch"); const r = s.getBoundingClientRect(); const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { hitTag: e?.tagName, hitIsSwatch: !!e && (s === e || s.contains(e)) }; });
        await p.locator(".generate-swatch").first().click();
        await p.waitForTimeout(400);
        const clip = await p.evaluate(() => navigator.clipboard.readText());
        const after = await p.evaluate(() => ({ aria: document.querySelector(".generate-swatch")?.getAttribute("aria-label"), live: [...document.querySelectorAll("[aria-live],[role=status]")].map((e) => e.getAttribute("aria-live") + ":" + e.textContent.trim().slice(0, 80)).filter((t) => t.length > 8) }));
        // copy-all verb
        await p.evaluate(() => navigator.clipboard.writeText("SENTINEL2"));
        await p.getByRole("button", { name: "Copy all colors" }).first().click();
        await p.waitForTimeout(400);
        const clipAll = await p.evaluate(() => navigator.clipboard.readText());
        const afterAll = await p.evaluate(() => [...document.querySelectorAll("[aria-live],[role=status]")].map((e) => e.getAttribute("aria-live") + ":" + e.textContent.trim().slice(0, 100)).filter((t) => t.length > 8));
        // keyboard reach
        await p.locator(".generate-swatch").first().focus();
        const focused = await p.evaluate(() => document.activeElement?.classList.contains("generate-swatch"));
        return { firstSwatchBefore: before.swatches[0], hit, clip, after, clipAll, afterAll, focusable: focused };
    }),
    save: (b) => cell(b, "save", {}, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const input = p.locator(`${PLATE} input`).first();
        await input.fill("Z3 witness name");
        await input.press("Tab");
        await p.getByRole("button", { name: "Save palette" }).first().click();
        await p.waitForTimeout(1200);
        const store = await p.evaluate(() => { const o = {}; for (const k of Object.keys(localStorage)) { if (/palette/i.test(k)) o[k] = localStorage.getItem(k).slice(0, 1500); } return o; });
        const live = await p.evaluate(() => [...document.querySelectorAll("[aria-live],[role=status],[role=alert]")].map((e) => e.textContent.trim().slice(0, 100)).filter(Boolean));
        return { store, live };
    }),
    wrap: (b) => cell(b, "wrap", {}, async (p) => {
        const res = {};
        for (const w of [1440, 1024, 768, 390]) {
            await p.setViewportSize({ width: w, height: 900 });
            if (!res.loaded) { await go(p, "#/generate", PLATE, 2500); res.loaded = true; } else await p.waitForTimeout(900);
            res[w] = { plateW: await p.evaluate(() => Math.round(document.querySelector("[data-generate-plate]").getBoundingClientRect().width)), rows: await p.evaluate(ROWS) };
        }
        return res;
    }),
    count: (b) => cell(b, "count", {}, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const sl = await p.evaluate(() => [...document.querySelectorAll("main [role=slider]")].map((s, i) => i + ":" + (s.getAttribute("aria-label") || s.getAttribute("aria-labelledby")) + ":" + s.getAttribute("aria-valuenow") + "/" + s.getAttribute("aria-valuemax")));
        // find count slider = the one whose max is ~12
        const idx = await p.evaluate(() => [...document.querySelectorAll("main [role=slider]")].findIndex((s) => +s.getAttribute("aria-valuemax") >= 8 && +s.getAttribute("aria-valuemax") <= 16));
        if (idx < 0) return { sl, note: "no count slider found" };
        const thumb = p.locator("main [role=slider]").nth(idx);
        const meas = async () => p.evaluate((idx) => {
            const s = document.querySelectorAll("main [role=slider]")[idx];
            let root = s; for (let k = 0; k < 6 && root; k++) { root = root.parentElement; if (root && root.getBoundingClientRect().width > s.getBoundingClientRect().width * 4) break; }
            const tr = root.getBoundingClientRect(), th = s.getBoundingClientRect();
            const imgs = [root, ...root.querySelectorAll("*")].map((e) => getComputedStyle(e).backgroundImage).filter((x) => x && x !== "none").map((x) => x.slice(0, 400));
            const n = document.querySelectorAll(".generate-swatch").length;
            return { now: +s.getAttribute("aria-valuenow"), min: +s.getAttribute("aria-valuemin"), max: +s.getAttribute("aria-valuemax"), swatches: n,
                thumbCentreFrac: +(((th.x + th.width / 2) - tr.x) / tr.width).toFixed(3), thumbWH: [th.width, th.height], trackW: tr.width, gradients: imgs.slice(0, 3) };
        }, idx);
        await thumb.focus();
        await p.keyboard.press("Home");
        await p.waitForTimeout(300);
        for (let i = 0; i < 4; i++) await p.keyboard.press("ArrowRight");
        await p.waitForTimeout(600);
        const at5 = await meas();
        await p.keyboard.press("End");
        await p.waitForTimeout(600);
        const atMax = await meas();
        return { sl, idx, at5, atMax };
    }),
    m390: (b) => cell(b, "m390", { w: 390, h: 844, touch: true, mobile: true }, async (p) => {
        await go(p, "#/generate", PLATE, 2500);
        const r = await p.evaluate(RECON);
        await p.screenshot({ path: png("gc-390-light") });
        return { sliders: r.sliders, swatches: r.swatches, buttons: r.buttons.filter((x) => x.inPlate), rows: await p.evaluate(ROWS) };
    }),
};

runCells("gc", cells);
