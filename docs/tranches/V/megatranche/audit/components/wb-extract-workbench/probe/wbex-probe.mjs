import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-extract-workbench/probe";
mkdirSync(OUT, { recursive: true });

const URL = "http://localhost:9000/#/extract";
const log = [];
const say = (...a) => {
    const s = a.map((x) => (typeof x === "string" ? x : JSON.stringify(x, null, 1))).join(" ");
    console.log(s);
    log.push(s);
};

const MAKE_FILE = `(async () => {
  const c = document.createElement('canvas'); c.width=200; c.height=200;
  const g = c.getContext('2d');
  const bands = ['#c81e5a','#1e5ac8','#5ac81e','#e8e0d0'];
  bands.forEach((b,i)=>{ g.fillStyle=b; g.fillRect(0, i*50, 200, 50); });
  return c.toDataURL('image/png');
})()`;

const browser = await webkit.launch();

// ─────────────────────────────── A: baseline empty, desktop light
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: "networkidle" });
    await p.waitForTimeout(3500);

    const geo = await p.evaluate(() => {
        const q = (s) => document.querySelector(s);
        const sp = q('[data-slot="shadow-palette"]');
        const dz = [...document.querySelectorAll('[role="button"]')].find((n) =>
            /Upload image/.test(n.getAttribute("aria-label") || ""),
        );
        const cap = [...document.querySelectorAll("p")].find((n) =>
            /undeveloped plate/i.test(n.textContent),
        );
        const rail = q('[data-o18="extract-k-rail"]');
        const cs = (el) => (el ? getComputedStyle(el) : null);
        const rect = (el) => (el ? el.getBoundingClientRect().toJSON() : null);
        const seg = sp?.querySelector(".shadow-seg");
        const sw = sp?.querySelector(".shadow-swatch");
        return {
            shadowPalette: rect(sp),
            spBg: cs(sp)?.backgroundColor,
            segBg: seg ? getComputedStyle(seg).backgroundColor : null,
            swatchBg: sw ? getComputedStyle(sw).backgroundColor : null,
            segAnim:
                (seg ? getComputedStyle(seg).animationName : "") +
                " " +
                (seg ? getComputedStyle(seg).animationDuration : ""),
            dropZone: rect(dz),
            caption: rect(cap),
            captionText: cap?.textContent.trim(),
            captionFS: cs(cap)?.fontSize + " / ls " + cs(cap)?.letterSpacing,
            captionColor: cs(cap)?.color,
            rail: rect(rail),
            skeletonInk: getComputedStyle(document.documentElement).getPropertyValue("--skeleton-ink"),
            inkMuted: getComputedStyle(document.documentElement).getPropertyValue("--ink-muted"),
        };
    });
    say("=== A. baseline desktop light, empty ===");
    say(JSON.stringify(geo, null, 1));
    await p.screenshot({ path: `${OUT}/A-empty-desktop-light.png` });
    say("shot A written");
    await ctx.close();
}

// ─────────────────────────────── B: populated
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: "networkidle" });
    await p.waitForTimeout(3000);
    const dataUrl = await p.evaluate(MAKE_FILE);
    const b64 = dataUrl.split(",")[1];
    await p.setInputFiles('input[type="file"]', {
        name: "bands.png",
        mimeType: "image/png",
        buffer: Buffer.from(b64, "base64"),
    });
    await p.waitForTimeout(3000);

    const st = await p.evaluate(() => {
        const cs = (el) => (el ? getComputedStyle(el) : null);
        const disp = document.querySelector(".font-display.text-display");
        const paneTitle = document.querySelector(
            "main h1, main h2, main h3, [class*='pane'] h2",
        );
        const codes = [...document.querySelectorAll("code")].map((c) => ({
            text: c.textContent.trim(),
            w: Math.round(c.getBoundingClientRect().width),
            scrollW: c.scrollWidth,
            truncated: c.scrollWidth > c.clientWidth + 1,
        }));
        return {
            codes,
            displayText: disp?.textContent.replace(/\s+/g, " ").trim(),
            displayFS: cs(disp)?.fontSize,
            displayFF: cs(disp)?.fontFamily?.slice(0, 50),
            paneTitleTag: paneTitle?.tagName,
            paneTitleText: paneTitle?.textContent.trim().slice(0, 40),
            paneTitleFS: cs(paneTitle)?.fontSize,
            paneTitleFF: cs(paneTitle)?.fontFamily?.slice(0, 50),
            headings: [...document.querySelectorAll("h1,h2,h3,h4")].map(
                (h) => h.tagName + ":" + h.textContent.trim().slice(0, 30),
            ),
            nameless: [...document.querySelectorAll("button")]
                .filter((b) => b.offsetParent !== null)
                .filter(
                    (b) =>
                        !(
                            b.getAttribute("aria-label") ||
                            b.getAttribute("aria-labelledby") ||
                            b.textContent.trim()
                        ),
                )
                .map((b) => ({ title: b.getAttribute("title"), cls: b.className.slice(0, 50) })),
        };
    });
    say("=== B. populated desktop light ===");
    say(JSON.stringify(st, null, 1));
    await p.screenshot({ path: `${OUT}/B-populated-desktop-light.png` });

    await p
        .locator('[role="button"][aria-label*="sample"]')
        .hover({ timeout: 3000 })
        .catch((e) => say("hover failed: " + e.message.slice(0, 80)));
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${OUT}/B2-populated-hover.png` });
    say("shots B written");
    await ctx.close();
}

// ─────────────────────────────── C: camera active (stubbed stream)
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const p = await ctx.newPage();
    await p.addInitScript(() => {
        window.__streams = [];
        const c = document.createElement("canvas");
        c.width = 640;
        c.height = 480;
        const g = c.getContext("2d");
        const paint = () => {
            g.fillStyle = "#2f6f4f";
            g.fillRect(0, 0, 640, 480);
            g.fillStyle = "#d8a13a";
            g.fillRect(0, 300, 640, 180);
            requestAnimationFrame(paint);
        };
        paint();
        Object.defineProperty(navigator, "mediaDevices", {
            configurable: true,
            value: {
                getUserMedia: async () => {
                    const s = c.captureStream(30);
                    window.__streams.push(s);
                    return s;
                },
            },
        });
    });
    await p.goto(URL, { waitUntil: "networkidle" });
    await p.waitForTimeout(3000);
    await p.click('button[title="Open camera"]');
    await p.waitForTimeout(1800);

    const cam = await p.evaluate(() => {
        const v = document.querySelector("video");
        const box = v?.closest("div.rounded-panel") ?? v?.parentElement;
        const btns = [...(box?.querySelectorAll("button") ?? [])].map((b) => ({
            title: b.getAttribute("title"),
            aria: b.getAttribute("aria-label"),
            text: b.textContent.trim(),
            rect: b.getBoundingClientRect().toJSON(),
        }));
        const sliders = [...document.querySelectorAll('[role="slider"]')].map((s) => ({
            label: s.getAttribute("aria-label"),
            ariaDisabled: s.getAttribute("aria-disabled"),
            dataDisabled: s.hasAttribute("data-disabled"),
        }));
        return {
            videoRect: v?.getBoundingClientRect().toJSON(),
            videoHasSrc: !!v?.srcObject,
            videoAria: v?.getAttribute("aria-label"),
            videoTitle: v?.getAttribute("title"),
            viewfinderButtons: btns,
            allButtons: [...document.querySelectorAll("button")]
                .filter((b) => b.offsetParent !== null)
                .map((b) => ({ t: b.getAttribute("title") ?? b.textContent.trim().slice(0, 18), disabled: b.disabled })),
            sliders,
            streamCount: window.__streams.length,
            trackStates: window.__streams.flatMap((s) => s.getTracks().map((t) => t.readyState)),
        };
    });
    say("=== C. camera active ===");
    say(JSON.stringify(cam, null, 1));
    await p.screenshot({ path: `${OUT}/C-camera-active.png` });

    // C1b — does the k slider still act while the camera is up?
    await p.evaluate(() => {
        const s = [...document.querySelectorAll('[role="slider"]')].find(
            (x) => x.getAttribute("aria-label") === "Number of colors",
        );
        s?.focus();
    });
    await p.keyboard.press("ArrowRight");
    await p.waitForTimeout(400);
    const kAfter = await p.evaluate(() => {
        const s = [...document.querySelectorAll('[role="slider"]')].find(
            (x) => x.getAttribute("aria-label") === "Number of colors",
        );
        const segs = document.querySelectorAll(
            '[data-slot="shadow-palette"] .shadow-seg',
        ).length;
        return { ariaValue: s?.getAttribute("aria-valuenow"), shadowSegs: segs };
    });
    say("=== C1b. k slider live while camera up ===", JSON.stringify(kAfter));

    // C2 — re-open the camera while it is already active
    await p.click('button[title="Open camera"]');
    await p.waitForTimeout(1500);
    const leak = await p.evaluate(() => ({
        streamCount: window.__streams.length,
        trackStates: window.__streams.flatMap((s) => s.getTracks().map((t) => t.readyState)),
    }));
    say("=== C2. camera re-opened while active (stream-leak probe) ===");
    say(JSON.stringify(leak, null, 1));

    // C3 — escape hatch
    await p.keyboard.press("Escape");
    await p.waitForTimeout(600);
    const afterEsc = await p.evaluate(() => !!document.querySelector("video"));
    say("=== C3. Escape pressed; video still present: " + afterEsc);
    await ctx.close();
}

// ─────────────────────────────── D: camera DENIED
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const p = await ctx.newPage();
    await p.addInitScript(() => {
        Object.defineProperty(navigator, "mediaDevices", {
            configurable: true,
            value: {
                getUserMedia: async () => {
                    throw new DOMException(
                        "The request is not allowed by the user agent or the platform in the current context.",
                        "NotAllowedError",
                    );
                },
            },
        });
    });
    await p.goto(URL, { waitUntil: "networkidle" });
    await p.waitForTimeout(3000);
    await p.click('button[title="Open camera"]');
    await p.waitForTimeout(1500);
    const err = await p.evaluate(() => {
        const nodes = [...document.querySelectorAll("div,p,span")].filter(
            (d) => /Camera access/i.test(d.textContent) && d.children.length === 0,
        );
        const e = nodes[0];
        return {
            found: nodes.length,
            text: e?.textContent.trim(),
            color: e ? getComputedStyle(e).color : null,
            role: e?.getAttribute("role"),
            ariaLive: e?.getAttribute("aria-live"),
            rect: e ? e.getBoundingClientRect().toJSON() : null,
        };
    });
    say("=== D. camera denied ===");
    say(JSON.stringify(err, null, 1));
    await p.screenshot({ path: `${OUT}/D-camera-denied.png` });
    await ctx.close();
}

writeFileSync(`${OUT}/probe-log.txt`, log.join("\n"));
await browser.close();
console.log("DONE");
