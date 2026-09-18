// CHALLENGE-C pass-4 probe 5 — KILLSHOT.
// (A) Vue's patchStyle does NOT diff (runtime-dom.cjs.js:445 — `for (const key
//     in next) setStyle(...)` unconditionally). ExtractControls.vue:22 puts the
//     INVARIANT paint (`background: gradient`) in the same style object as the
//     VARIANT paint (`backgroundColor`/`boxShadow` = trackInk). Measure how much
//     unchanged gradient string is re-serialised into the CSSOM per tick, in the
//     DEVELOPED state at k=16.
// (B) `trackInk`'s degenerate is bare `var(--ink-muted)` (:124) with NO fallback,
//     while the SAME FILE's `.plate-ink` (:149) carries one. `--ink-muted` has no
//     CSS declaration anywhere — it is JS-stamped only (useAtmosphereBoot.ts:103).
//     Prove what the rail paints when that substitution is invalid.
// Read-only w.r.t. source; all mutation is in-page and dies with the tab.
import { webkit } from "playwright";

const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(3000);

// ---------------- (B) the guaranteed-invalid degenerate -----------------
out("B · `--ink-muted` — definition sites and the degenerate's paint", await page.evaluate(() => {
    const root = document.documentElement;
    const stampedInline = root.style.getPropertyValue("--ink-muted").trim();
    const computed = getComputedStyle(root).getPropertyValue("--ink-muted").trim();

    // Sacrificial element in the live cascade with the token made
    // guaranteed-invalid (`initial` on a custom property == undefined),
    // painted with the EXACT declarations ExtractControls.vue:22 emits when
    // `trackInk` takes its degenerate branch (:124).
    const host = document.createElement("div");
    host.style.setProperty("--ink-muted", "initial");
    const el = document.createElement("div");
    el.style.backgroundColor = "var(--ink-muted)";
    el.style.boxShadow = "inset 0 0 0 1.5px var(--ink-muted)";
    host.appendChild(el); document.body.appendChild(host);
    const cs = getComputedStyle(el);
    const degenerate = { backgroundColor: cs.backgroundColor, boxShadow: cs.boxShadow };

    // Control: the fallback form the rest of the repo (and this file's own
    // `.plate-ink`, :149) uses.
    const el2 = document.createElement("div");
    el2.style.backgroundColor = "var(--ink-muted, var(--muted-foreground))";
    el2.style.boxShadow = "inset 0 0 0 1.5px var(--ink-muted, var(--muted-foreground))";
    host.appendChild(el2);
    const cs2 = getComputedStyle(el2);
    const withFallback = { backgroundColor: cs2.backgroundColor, boxShadow: cs2.boxShadow };
    host.remove();

    return {
        inlineStampOnRoot: stampedInline || "(none)",
        computedOnRoot: computed || "(none)",
        DEGENERATE_AS_WRITTEN_line124: degenerate,
        WITH_FALLBACK_as_line149_writes_it: withFallback,
        VERDICT: degenerate.backgroundColor === "rgba(0, 0, 0, 0)" && degenerate.boxShadow === "none"
            ? "RAIL PAINTS NOTHING — no fill, no ring"
            : "paints something",
    };
}));

// is the degenerate branch reachable? what does the parent actually pass?
out("B · degenerate reachability — is a live pick threading?", await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const inline = rail.getAttribute("style");
    return {
        railInlineMentionsInkMuted: inline.includes("--ink-muted"),
        railBackgroundColorInline: (inline.match(/background-color:\s*([^;]+)/) || [, null])[1],
        note: "a live pick threads => degenerate not taken in this snapshot; the branch exists for the no-provider / pre-boot window",
    };
}));

// ---------------- (A) the per-tick CSSOM write cost ---------------------
// Instrument every style write on the rail element specifically.
await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    window.__writes = [];
    const proto = CSSStyleDeclaration.prototype;
    const origSet = proto.setProperty;
    const desc = Object.getOwnPropertyDescriptor(proto, "cssText");
    proto.setProperty = function (name, value, prio) {
        try {
            if (this === rail.style)
                window.__writes.push({ t: Math.round(performance.now()), prop: name, len: String(value ?? "").length, value: String(value ?? "").slice(0, 60) });
        } catch {}
        return origSet.call(this, name, value, prio);
    };
    // Vue's setStyle uses `style[name] = value` for non-custom props too;
    // catch those by observing the attribute and diffing longhands.
    window.__attrMuts = [];
    new MutationObserver((rs) => { for (const r of rs) window.__attrMuts.push({ t: Math.round(performance.now()), len: r.target.getAttribute("style").length }); })
        .observe(rail, { attributes: true, attributeFilter: ["style"] });
    void desc;
});

// Develop the plate: synthesise a many-coloured PNG in-page and feed the input.
await page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = c.height = 220;
    const g = c.getContext("2d");
    for (let i = 0; i < 22; i++) {
        g.fillStyle = `hsl(${(i * 360) / 22} 85% ${35 + (i % 5) * 9}%)`;
        g.fillRect((i % 5) * 44, Math.floor(i / 5) * 44, 44, 44);
    }
    window.__dataUrl = c.toDataURL("image/png");
});
const buf = Buffer.from((await page.evaluate(() => window.__dataUrl)).split(",")[1], "base64");
const input = page.locator('input[type="file"]').first();
await input.setInputFiles({ name: "probe.png", mimeType: "image/png", buffer: buf });
await page.waitForTimeout(2500);

// k → 16 so the gradient carries its maximum stop count
await page.evaluate(() => {
    const s = [...document.querySelectorAll('[role="slider"]')].find((e) => e.getAttribute("aria-label") === "Number of colors");
    s?.focus();
});
await page.keyboard.press("End");
await page.waitForTimeout(2500);

out("A · DEVELOPED rail at k=16 — what one style object carries", await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const cs = getComputedStyle(rail);
    const bi = cs.backgroundImage;
    return {
        k: document.querySelector('[role="slider"][aria-label="Number of colors"]')?.getAttribute("aria-valuenow"),
        gradientStops: (bi.match(/(oklch|rgb|hsl|lab|oklab|color)\(/g) || []).length,
        gradientStringLength: bi.length,
        gradientHead: bi.slice(0, 150),
        inlineStyleAttrLength: rail.getAttribute("style").length,
        backgroundColor: cs.backgroundColor,
        boxShadow: cs.boxShadow,
    };
}));

// Now drive the live-colour signal by toggling the scheme (a real trackInk
// input: `isDark` is read inside safeCss) and count the CSSOM writes.
await page.evaluate(() => { window.__writes.length = 0; window.__attrMuts.length = 0; });
for (let i = 0; i < 6; i++) {
    await page.evaluate(() => document.documentElement.classList.toggle("dark"));
    await page.waitForTimeout(220);
}
await page.waitForTimeout(600);

out("A · CSSOM writes on the rail per trackInk change", await page.evaluate(() => {
    const w = window.__writes, m = window.__attrMuts;
    const byProp = {};
    for (const x of w) { byProp[x.prop] = byProp[x.prop] || { writes: 0, totalChars: 0 }; byProp[x.prop].writes++; byProp[x.prop].totalChars += x.len; }
    return {
        setPropertyCalls: w.length,
        styleAttributeMutations: m.length,
        byProperty: byProp,
        meanStyleAttrLength: m.length ? Math.round(m.reduce((s, x) => s + x.len, 0) / m.length) : 0,
        note: "Vue patchStyle writes EVERY key in the style object on every patch (runtime-dom.cjs.js:445) — `background` (the gradient) is re-serialised even though `gradient` did not change",
    };
}));

out("pageErrors", pageErrors);
await b.close();
