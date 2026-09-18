// CHALLENGE-C pass-3 probe 1 — ExtractControls implementation interrogation.
// Read-only: navigates, uploads a synthetic PNG built IN-PAGE, measures.
import { webkit } from "playwright";

const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [], consoleErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(3000);

// ---------- 1. BUTTON NAMES: which are "nameless" by the capture rule ----
out("BUTTONS (capture-script nameless rule)", await page.evaluate(() => {
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    return [...document.querySelectorAll('button,[role="button"]')].filter(vis).map((el) => ({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).split(" ").slice(0, 2).join("."),
        ariaLabel: el.getAttribute("aria-label"),
        title: el.getAttribute("title"),
        text: el.textContent.trim().slice(0, 24),
        NAMELESS_BY_CAPTURE: !(el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.textContent.trim()),
    }));
}));

for (const t of ["Upload image", "Open camera", "Reset"]) {
    const n = await page.getByRole("button", { name: t, exact: true }).count();
    console.log(`playwright accname role=button name="${t}" -> ${n} match(es)`);
}

// ---------- 2. THE RAIL pre-image -----------------------------------------
out("RAIL pre-image", await page.evaluate(() => {
    const el = document.querySelector('[data-o18="extract-k-rail"]');
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage.slice(0, 160),
        boxShadow: cs.boxShadow,
        boxShadowHasInset: cs.boxShadow.includes("inset"),
        overflow: cs.overflow,
        rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
    };
}));

// ---------- 3. LABEL CLIPPING (w-5 boxes) ---------------------------------
const labelMetrics = () => page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const kLabel = rail.parentElement.parentElement.querySelector("label");
    const kc = document.querySelector('[data-o18="extract-kc"]');
    const kcRead = kc.querySelector("span");
    const m = (el) => ({
        text: el.textContent.trim(),
        clientW: el.clientWidth, scrollW: el.scrollWidth,
        OVERFLOWS: el.scrollWidth > el.clientWidth,
        overflow: getComputedStyle(el).overflow,
        rectW: +el.getBoundingClientRect().width.toFixed(2),
        whiteSpace: getComputedStyle(el).whiteSpace,
    });
    return { kLabel: m(kLabel), kcReadout: m(kcRead) };
});
out("LABELS @ default k=5 kC=0.5", await labelMetrics());

await page.getByRole("slider", { name: "Number of colors" }).focus();
await page.keyboard.press("End");
await page.getByRole("slider", { name: "Chroma weight" }).focus();
await page.keyboard.press("End");
await page.waitForTimeout(700);
out("LABELS @ k=16 kC=1.5", await labelMetrics());

out("SLIDER aria after End", await page.evaluate(() =>
    ["Number of colors", "Chroma weight"].map((n) => {
        const el = document.querySelector(`[aria-label="${n}"]`);
        const r = el.getBoundingClientRect();
        return {
            n, role: el.getAttribute("role"),
            valuenow: el.getAttribute("aria-valuenow"),
            valuetext: el.getAttribute("aria-valuetext"),
            min: el.getAttribute("aria-valuemin"), max: el.getAttribute("aria-valuemax"),
            w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        };
    })));

// ---------- 4. ORPHAN <label> census --------------------------------------
out("ORPHAN LABELS", await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const root = rail.parentElement.parentElement.parentElement;
    return [...root.querySelectorAll("label")].map((l) => ({
        text: l.textContent.trim(),
        htmlFor: l.getAttribute("for"),
        controlInside: !!l.querySelector("input,select,textarea,button,[role]"),
        title: l.getAttribute("title"),
    }));
}));

// ---------- 5. RESET reachability pre-image (k is now 16) -----------------
out("RESET pre-image, k=16", await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) => b.getAttribute("title") === "Reset");
    return btn ? { disabled: btn.disabled, ariaDisabled: btn.getAttribute("aria-disabled") } : "not found";
}));

// ---------- 6. UPLOAD an image built in-page ------------------------------
await page.evaluate(async () => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const x = c.getContext("2d");
    const bands = ["rgb(220,40,40)", "rgb(40,190,60)", "rgb(40,70,210)", "rgb(186,178,168)"];
    bands.forEach((col, i) => { x.fillStyle = col; x.fillRect(0, i * 16, 64, 16); });
    const blob = await new Promise((r) => c.toBlob(r, "image/png"));
    const file = new File([blob], "bands.png", { type: "image/png" });
    const dt = new DataTransfer();
    dt.items.add(file);
    const input = document.querySelector('input[type="file"]');
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
});
await page.waitForTimeout(3500);

const dev = await page.evaluate(() => {
    const el = document.querySelector('[data-o18="extract-k-rail"]');
    const cs = getComputedStyle(el);
    // contrast helpers (sRGB relative luminance, WCAG)
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const g = cv.getContext("2d");
    const px = (css) => { g.fillStyle = "#000"; g.fillRect(0, 0, 1, 1); g.fillStyle = css; g.fillRect(0, 0, 1, 1); return [...g.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
    const cr = (a, b) => { const l1 = Math.max(L(a), L(b)), l2 = Math.min(L(a), L(b)); return +((l1 + 0.05) / (l2 + 0.05)).toFixed(3); };

    const img = cs.backgroundImage;
    // ring colour = the box-shadow colour (first colour token of the shadow)
    const ringColor = (cs.boxShadow.match(/rgba?\([^)]*\)|oklch\([^)]*\)|#[0-9a-f]{3,8}/i) || [])[0];
    // gradient stop colours
    const stops = [...img.matchAll(/(rgba?\([^)]*\)|oklch\([^)]*\)|lab\([^)]*\))\s*([\d.]+%)/g)]
        .map((m) => ({ css: m[1], pos: m[2] }));
    const ringPx = ringColor ? px(ringColor) : null;
    return {
        backgroundColor: cs.backgroundColor,
        boxShadow: cs.boxShadow,
        ringColor,
        gradientStopCount: stops.length,
        ringVsStop: ringPx ? stops.map((s) => ({ stop: s.css, pos: s.pos, contrastVsRing: cr(ringPx, px(s.css)) })) : null,
        backgroundImageHead: img.slice(0, 260),
    };
});
out("RAIL developed — inset ring vs the gradient it is painted ON", dev);

// ---------- 7. DISABLED census (hasImage=true, steady) --------------------
out("DISABLED census (steady, hasImage=true)", await page.evaluate(() => {
    const grab = (t) => [...document.querySelectorAll("button")].find((b) => b.getAttribute("title") === t);
    const sr = (n) => { let e = document.querySelector(`[aria-label="${n}"]`); while (e && !e.classList.contains("glass-slider")) e = e.parentElement; return e; };
    return {
        upload: !!grab("Upload image")?.disabled,
        camera: !!grab("Open camera")?.disabled,
        reset: !!grab("Reset")?.disabled,
        kSlider_dataDisabled: sr("Number of colors")?.hasAttribute("data-disabled") ?? null,
        kcSlider_dataDisabled: sr("Chroma weight")?.hasAttribute("data-disabled") ?? null,
    };
}));

// ---------- 8. kC FLOAT TRUTH — walk 0 -> 1.5 by ArrowRight ---------------
await page.getByRole("slider", { name: "Chroma weight" }).focus();
await page.keyboard.press("Home");
await page.waitForTimeout(200);
const walk = [];
for (let i = 0; i < 15; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(60);
    walk.push(await page.evaluate(() => {
        const el = document.querySelector('[aria-label="Chroma weight"]');
        const kc = document.querySelector('[data-o18="extract-kc"]');
        return { aria: el.getAttribute("aria-valuenow"), readout: kc.querySelector("span").textContent.trim() };
    }));
}
out("kC keyboard walk (aria-valuenow vs the .toFixed(1) readout)", walk);

console.log("\npageErrors", JSON.stringify(pageErrors));
console.log("consoleErrors", JSON.stringify(consoleErrors.slice(0, 8)));
await b.close();
