import { webkit } from "playwright";
const out = (t, v) => console.log(`\n=== ${t} ===\n` + (typeof v === "string" ? v : JSON.stringify(v, null, 1)));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
// Replace getUserMedia with a REAL MediaStream (canvas.captureStream) and count stops.
await ctx.addInitScript(() => {
    window.__gum = 0; window.__stops = 0; window.__streams = [];
    const cv = document.createElement("canvas"); cv.width = cv.height = 32;
    navigator.mediaDevices.getUserMedia = async () => {
        window.__gum++;
        const s = cv.captureStream(5);
        window.__streams.push(s);
        for (const t of s.getTracks()) {
            const os = t.stop.bind(t);
            t.stop = function () { window.__stops++; return os(); };
        }
        return s;
    };
});
const p = await ctx.newPage();
const pageErrors = [];
p.on("pageerror", (e) => pageErrors.push(String(e)));
await p.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await p.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await p.waitForTimeout(2500);

// ---- A. certifyAccentInk cost + malformed-input crash class -----------
out("certifyAccentInk COST", await p.evaluate(async () => {
    try {
        const m = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/ink.ts");
        const f = m.certifyAccentInk;
        const cs = ["oklch(0.55 0.22 10)", "oklch(0.7 0.15 200)", "oklch(0.35 0.09 300)"];
        for (let i = 0; i < 30; i++) f(cs[i % 3], 0.8, 3);
        const N = 400, t0 = performance.now();
        for (let i = 0; i < N; i++) f(cs[i % 3], 0.55 + (i % 50) / 250, 3);
        const dt = performance.now() - t0;
        return { N, totalMs: +dt.toFixed(2), perCallMs: +(dt / N).toFixed(4), sixteenPerFrameMs: +((dt / N) * 16).toFixed(3) };
    } catch (e) { return { error: String(e) }; }
}));
out("certifyAccentInk MALFORMED INPUT (parseCssColor crash class)", await p.evaluate(async () => {
    const m = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/ink.ts");
    const probes = ["oklch()", "", "rgb(", "oklch(none none none)", "color(display-p3 1 0 0)",
        "oklch(0 0 0)", "oklch(1 0 0)", "transparent", "rgb(0 0 0 / 0)", "NaN", "oklch(NaN NaN NaN)",
        "oklch(Infinity 0 0)", "#", "var(--nope)", "oklch(-0 0 0)"];
    return probes.map((s) => {
        try { return { in: s, out: String(m.certifyAccentInk(s, 0.8, 3)).slice(0, 55) }; }
        catch (e) { return { in: s, THREW: String(e).slice(0, 90) }; }
    });
}));

// ---- B. camera: three clicks, real MediaStreams -----------------------
const trace = [];
const snap = (t) => p.evaluate((tag) => ({
    t: tag, gum: window.__gum, stops: window.__stops,
    live: window.__streams.map((s) => s.getTracks().map((x) => x.readyState).join("|")),
    videos: document.querySelectorAll("video").length,
    camBtnDisabled: [...document.querySelectorAll("button")].filter((x) => x.title === "Open camera").map((x) => x.disabled),
}), t);
trace.push(await snap("before"));
for (let i = 1; i <= 3; i++) {
    await p.locator('button[title="Open camera"]').click();
    await p.waitForTimeout(700);
    trace.push(await snap(`after-click-${i}`));
}
out("CAMERA — three clicks on the Open camera control", trace);

// ---- C. navigate away: does unmount stop them? -----------------------
await p.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
await p.waitForTimeout(1200);
out("AFTER LEAVING THE ROUTE", await snap("after-route-change"));

await ctx.close(); await b.close();
console.log("\npageErrors:", JSON.stringify(pageErrors));
