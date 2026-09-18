// CHALLENGE-C pass-3 probe 2 — thumb ARIA, aria-label duplication, the camera
// double-start stream leak, and the disabled-census DURING processing.
import { webkit } from "playwright";
const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));

// ---- stub getUserMedia BEFORE any app code runs, and count track stops ----
await page.addInitScript(() => {
    window.__gum = { calls: 0, streams: [], stops: [] };
    const mk = () => {
        const id = ++window.__gum.calls;
        const track = {
            kind: "video", id: `t${id}`, readyState: "live",
            stop() { this.readyState = "ended"; window.__gum.stops.push(this.id); },
            addEventListener() {}, removeEventListener() {},
        };
        const stream = { id: `s${id}`, getTracks: () => [track], getVideoTracks: () => [track], _track: track };
        window.__gum.streams.push(stream);
        return stream;
    };
    Object.defineProperty(navigator, "mediaDevices", {
        configurable: true,
        value: { getUserMedia: async () => mk() },
    });
});

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(3000);

// ---------- 1. aria-label DUPLICATION: root + thumb ----------------------
out("aria-label carriers (root leak vs thumb)", await page.evaluate(() =>
    [...document.querySelectorAll('[aria-label="Number of colors"],[aria-label="Chroma weight"]')].map((el) => {
        const r = el.getBoundingClientRect();
        return {
            label: el.getAttribute("aria-label"),
            tag: el.tagName.toLowerCase(),
            cls: String(el.className).split(" ").slice(0, 2).join("."),
            role: el.getAttribute("role"),
            valuenow: el.getAttribute("aria-valuenow"),
            valuetext: el.getAttribute("aria-valuetext"),
            valuemin: el.getAttribute("aria-valuemin"),
            valuemax: el.getAttribute("aria-valuemax"),
            tabindex: el.getAttribute("tabindex"),
            w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        };
    })));

// ---------- 2. kC READOUT vs aria across a keyboard walk -----------------
const kcRead = () => page.evaluate(() => {
    const kc = document.querySelector('[data-o18="extract-kc"]');
    const spans = [...kc.children].filter((e) => e.tagName === "SPAN");
    const thumb = kc.querySelector('[role="slider"]');
    return {
        readout: spans.length ? spans[spans.length - 1].textContent.trim() : null,
        readoutClientW: spans.length ? spans[spans.length - 1].clientWidth : null,
        readoutScrollW: spans.length ? spans[spans.length - 1].scrollWidth : null,
        ariaNow: thumb?.getAttribute("aria-valuenow"),
        ariaText: thumb?.getAttribute("aria-valuetext"),
    };
});
await page.locator('[data-o18="extract-kc"] [role="slider"]').focus();
await page.keyboard.press("Home");
await page.waitForTimeout(250);
const walk = [await kcRead()];
for (let i = 0; i < 15; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(70);
    walk.push(await kcRead());
}
out("kC keyboard walk 0 -> 1.5 (aria-valuenow vs .toFixed(1) readout)", walk);

// ---------- 3. k readout width at k=16 ------------------------------------
await page.locator('[data-o18="extract-k-rail"]').evaluate(() => {});
const kThumb = page.locator('[role="slider"][aria-label="Number of colors"]');
await kThumb.focus();
await page.keyboard.press("End");
await page.waitForTimeout(400);
out("k readout @ End", await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const l = rail.parentElement.parentElement.querySelector("label");
    const t = document.querySelector('[role="slider"][aria-label="Number of colors"]');
    return {
        labelText: l.textContent.trim(), clientW: l.clientWidth, scrollW: l.scrollWidth,
        ariaNow: t.getAttribute("aria-valuenow"), ariaMax: t.getAttribute("aria-valuemax"),
    };
}));

// ---------- 4. CAMERA: press "Open camera" TWICE -------------------------
const cam = page.locator('button[title="Open camera"]');
out("camera button disabled BEFORE first press", await cam.isDisabled());
await cam.click();
await page.waitForTimeout(900);
out("after 1st press", await page.evaluate(() => ({
    gumCalls: window.__gum.calls,
    stops: [...window.__gum.stops],
    liveTracks: window.__gum.streams.map((s) => s._track.readyState),
    cameraVisible: !!document.querySelector("video"),
    cameraBtnDisabled: [...document.querySelectorAll("button")].find((b) => b.getAttribute("title") === "Open camera")?.disabled,
    uploadBtnDisabled: [...document.querySelectorAll("button")].find((b) => b.getAttribute("title") === "Upload image")?.disabled,
    resetBtnDisabled: [...document.querySelectorAll("button")].find((b) => b.getAttribute("title") === "Reset")?.disabled,
    kSliderPointerEvents: getComputedStyle(document.querySelector('[data-o18="extract-k-rail"]').parentElement).pointerEvents,
})));

await cam.click();
await page.waitForTimeout(900);
out("after 2nd press — THE LEAK", await page.evaluate(() => ({
    gumCalls: window.__gum.calls,
    stops: [...window.__gum.stops],
    trackStates: window.__gum.streams.map((s) => ({ id: s.id, track: s._track.id, state: s._track.readyState })),
})));

// navigate away (unmount) and re-check
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
await page.waitForTimeout(1200);
out("after unmount (route change) — orphaned tracks", await page.evaluate(() => ({
    stops: [...window.__gum.stops],
    trackStates: window.__gum.streams.map((s) => ({ id: s.id, track: s._track.id, state: s._track.readyState })),
})));

// ---------- 5. DISABLED census DURING processing --------------------------
await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(2500);
// a big image so quantize takes measurable time
await page.evaluate(async () => {
    const c = document.createElement("canvas");
    c.width = c.height = 1400;
    const x = c.getContext("2d");
    const img = x.createImageData(1400, 1400);
    for (let i = 0; i < img.data.length; i += 4) {
        img.data[i] = (i * 7) % 255; img.data[i + 1] = (i * 13) % 255;
        img.data[i + 2] = (i * 29) % 255; img.data[i + 3] = 255;
    }
    x.putImageData(img, 0, 0);
    const blob = await new Promise((r) => c.toBlob(r, "image/png"));
    const dt = new DataTransfer();
    dt.items.add(new File([blob], "big.png", { type: "image/png" }));
    const input = document.querySelector('input[type="file"]');
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
});
const census = [];
for (let i = 0; i < 24; i++) {
    census.push(await page.evaluate(() => {
        const grab = (t) => [...document.querySelectorAll("button")].find((b) => b.getAttribute("title") === t);
        const root = (n) => { let e = document.querySelector(`[role="slider"][aria-label="${n}"]`); while (e && !e.classList.contains("glass-slider")) e = e.parentElement; return e; };
        const skel = !!document.querySelector('[class*="skeleton"],[data-skeleton]');
        return {
            t: Date.now() % 100000,
            processingUI: skel,
            upload: !!grab("Upload image")?.disabled,
            camera: !!grab("Open camera")?.disabled,
            reset: !!grab("Reset")?.disabled,
            kDisabled: root("Number of colors")?.hasAttribute("data-disabled") ?? null,
            kcDisabled: root("Chroma weight")?.hasAttribute("data-disabled") ?? null,
        };
    }));
    await page.waitForTimeout(120);
}
const changed = census.filter((r, i) => i === 0 || JSON.stringify(r).replace(/"t":\d+,/, "") !== JSON.stringify(census[i - 1]).replace(/"t":\d+,/, ""));
out("DISABLED census sampled through the processing window (deduped)", changed);
out("any sample where reset was disabled while others enabled", census.filter((r) => r.reset).slice(0, 3));

console.log("\npageErrors", JSON.stringify(pageErrors));
await b.close();
