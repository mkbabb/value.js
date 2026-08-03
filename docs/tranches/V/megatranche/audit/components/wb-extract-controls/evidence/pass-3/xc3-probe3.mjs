// CHALLENGE-C pass-3 probe 3 — the `disabled` prop census DURING processing,
// and the reset/debounce double-dispatch. Counts worker postMessage calls.
import { webkit } from "playwright";
const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));

// count every Worker#postMessage (one per quantize dispatch)
await page.addInitScript(() => {
    window.__wpm = [];
    const orig = Worker.prototype.postMessage;
    Worker.prototype.postMessage = function (...a) {
        window.__wpm.push({ t: performance.now(), k: a[0]?.options?.k, cw: a[0]?.options?.chromaWeight });
        return orig.apply(this, a);
    };
});

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(2500);

// large noisy image so the worker takes measurable time
await page.evaluate(async () => {
    const c = document.createElement("canvas");
    c.width = c.height = 1600;
    const x = c.getContext("2d");
    const img = x.createImageData(1600, 1600);
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

const snap = () => page.evaluate(() => {
    const grab = (t) => [...document.querySelectorAll("button")].find((b) => b.getAttribute("title") === t);
    const root = (n) => { let e = document.querySelector(`[role="slider"][aria-label="${n}"]`); while (e && !e.classList.contains("glass-slider")) e = e.parentElement; return e; };
    return {
        skeleton: !!document.querySelector(".palette-card-skeleton, [class*='skeleton']"),
        upload: !!grab("Upload image")?.disabled,
        camera: !!grab("Open camera")?.disabled,
        reset: !!grab("Reset")?.disabled,
        kAriaDisabled: root("Number of colors")?.getAttribute("data-disabled") ?? "ABSENT",
        kcAriaDisabled: root("Chroma weight")?.getAttribute("data-disabled") ?? "ABSENT",
        kThumbTabindex: document.querySelector('[role="slider"][aria-label="Number of colors"]')?.getAttribute("tabindex"),
        posts: window.__wpm.length,
    };
});

const samples = [];
for (let i = 0; i < 30; i++) { samples.push(await snap()); await page.waitForTimeout(100); }
const key = (r) => `${r.skeleton}|${r.upload}|${r.camera}|${r.reset}|${r.kAriaDisabled}|${r.kcAriaDisabled}|${r.kThumbTabindex}`;
out("disabled census through the processing window (state changes only)",
    samples.filter((r, i) => i === 0 || key(r) !== key(samples[i - 1])));
out("skeleton seen at all?", samples.some((s) => s.skeleton));
out("was ANY of upload/camera/kSlider/kcSlider ever disabled?", {
    upload: samples.some((s) => s.upload), camera: samples.some((s) => s.camera),
    k: samples.some((s) => s.kAriaDisabled !== "ABSENT"),
    kc: samples.some((s) => s.kcAriaDisabled !== "ABSENT"),
    reset: samples.some((s) => s.reset),
});

// ---- keyboard-drive the k slider DURING processing (should be inert if the
//      disabled contract held) ------------------------------------------------
await page.waitForTimeout(1200);
await page.evaluate(() => { window.__wpm.length = 0; });
const kThumb = page.locator('[role="slider"][aria-label="Number of colors"]');
await kThumb.focus();
for (let i = 0; i < 5; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(40); }
await page.waitForTimeout(1400);
out("k moved during/after processing — worker dispatches", await page.evaluate(() => window.__wpm));

// ---- RESET does not cancel the pending 300ms debounce --------------------
await page.evaluate(() => { window.__wpm.length = 0; });
await kThumb.focus();
await page.keyboard.press("ArrowLeft");          // arms a 300ms debounce
await page.waitForTimeout(60);
await page.locator('button[title="Reset"]').click();  // fires runQuantize NOW
await page.waitForTimeout(1600);
out("ArrowLeft then Reset within the debounce window — dispatches", await page.evaluate(() => window.__wpm));

console.log("\npageErrors", JSON.stringify(pageErrors));
await b.close();
