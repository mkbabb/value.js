import { chromium } from "playwright";
const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await chromium.launch({
    args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream", "--autoplay-policy=no-user-gesture-required"],
});
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, permissions: ["camera"] });
await ctx.addInitScript(() => {
    window.__gum = 0; window.__stops = 0; window.__streams = [];
    const md = navigator.mediaDevices;
    const orig = md.getUserMedia.bind(md);
    md.getUserMedia = async (c) => {
        window.__gum++;
        const s = await orig(c);
        window.__streams.push(s);
        for (const t of s.getTracks()) { const os = t.stop.bind(t); t.stop = function () { window.__stops++; return os(); }; }
        return s;
    };
});
const p = await ctx.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(String(e)));
await p.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await p.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await p.waitForTimeout(2500);

const snap = (tag) => p.evaluate((t) => ({
    t, gum: window.__gum, stops: window.__stops,
    live: window.__streams.map((s) => s.getTracks().map((x) => x.readyState).join("|")),
    videos: document.querySelectorAll("video").length,
    camDisabled: [...document.querySelectorAll("button")].filter((x) => x.title === "Open camera").map((x) => x.disabled),
    uploadDisabled: [...document.querySelectorAll("button")].filter((x) => x.title === "Upload image").map((x) => x.disabled),
    sliderAriaDisabled: [...document.querySelectorAll('[data-slot="slider"]')].map((r) => r.getAttribute("aria-disabled")).join(","),
    err: [...document.querySelectorAll(".text-destructive")].map((n) => n.textContent.trim()),
}), tag);

const trace = [await snap("before")];
for (let i = 1; i <= 3; i++) {
    await p.locator('button[title="Open camera"]').click();
    await p.waitForTimeout(900);
    trace.push(await snap(`after-click-${i}`));
}
out("CAMERA — three clicks (fake device, real MediaStream)", trace);

await p.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
await p.waitForTimeout(1500);
out("AFTER LEAVING /#/extract (component unmounted)", await snap("after-unmount"));

await ctx.close(); await b.close();
console.log("\npageErrors:", JSON.stringify(errs));
