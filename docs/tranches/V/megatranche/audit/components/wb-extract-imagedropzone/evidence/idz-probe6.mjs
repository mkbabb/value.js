// IDZ probe 6 — the shipped drop failure, its consequence, and the cure.
import { chromium } from "playwright";
import { makePng } from "./idz-probe1.mjs";
import fs from "node:fs";

fs.writeFileSync("/tmp/idz-red.png", makePng(64, 64, [220, 40, 40]));
fs.writeFileSync("/tmp/idz-blue.png", makePng(48, 48, [30, 60, 220]));
const ZONE = '[role="button"][aria-label*="image" i]';
const out = {};
const browser = await chromium.launch();

async function run(label, { patchDragEnter = false, preload = false, path }) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const cdp = await page.context().newCDPSession(page);
    const nav = [];
    page.on("framenavigated", (f) => { if (f === page.mainFrame()) nav.push(f.url()); });
    const perr = [];
    page.on("pageerror", (e) => perr.push(String(e).slice(0, 120)));
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForTimeout(2400);

    if (preload) {
        await page.setInputFiles('input[type=file]', {
            name: "blue.png", mimeType: "image/png", buffer: fs.readFileSync("/tmp/idz-blue.png"),
        });
        await page.waitForTimeout(2200);
    }

    await page.evaluate(([sel, patch]) => {
        window.__mark = "boot"; window.__ev = [];
        const z = document.querySelector(sel); window.__z = z;
        const id = (e) => e === z ? "ROOT"
            : e?.tagName === "IMG" ? "img.preview"
            : e?.tagName === "SPAN" ? "span.prompt"
            : e?.tagName === "svg" ? "svg.icon"
            : String(e?.className || "").includes("flex flex-col items-center") ? "div.placeholder"
            : e?.tagName;
        for (const t of ["dragenter", "dragover", "dragleave", "drop"])
            window.addEventListener(t, (e) => window.__ev.push({ dispatch: window.__mark, type: t, target: id(e.target) }), true);
        if (patch) z.addEventListener("dragenter", (e) => e.preventDefault());
    }, [ZONE, patchDragEnter]);

    const box = await page.locator(ZONE).boundingBox();
    const pt = {
        P1: [box.x + 4, box.y + 4],
        P2: [box.x + box.width / 2, box.y + box.height / 2 + 14],
        P3: [box.x + box.width / 2, box.y + box.height / 2 - 18],
    };
    const D = { items: [], files: ["/tmp/idz-red.png"], dragOperationsMask: 1 };
    await cdp.send("Input.setInterceptDrags", { enabled: true });
    for (const [type, name] of path) {
        await page.evaluate((m) => (window.__mark = m), `${type}@${name}`);
        await cdp.send("Input.dispatchDragEvent", { type, x: pt[name][0], y: pt[name][1], data: D });
        await page.waitForTimeout(110);
    }
    await page.waitForTimeout(2600);

    out[label] = await page.evaluate(() => {
        const img = document.querySelector('img[alt="Uploaded image"]');
        return {
            dropEventsDelivered: window.__ev.filter((e) => e.type === "drop").length,
            trace: window.__ev.map((e) => `${e.dispatch} -> ${e.type}@${e.target}`),
            previewNaturalW: img?.naturalWidth ?? null,
            errorLine: document.querySelector(".text-destructive")?.textContent?.trim() ?? null,
            statusText: [...document.querySelectorAll("[aria-live],[role=status],[role=alert]")].map((n) => n.textContent.trim()),
        };
    });
    out[label].navigations = nav;
    out[label].pageErrors = perr;
    out[label].finalUrl = page.url();
    await cdp.send("Input.setInterceptDrags", { enabled: false });
    await page.close();
}

const travel = [["dragEnter","P1"],["dragOver","P1"],["dragOver","P2"],["dragOver","P3"],["drop","P2"]];
const still  = [["dragEnter","P1"],["dragOver","P1"],["dragOver","P1"],["drop","P1"]];

await run("G1_shipped_travelThenRelease",   { path: travel });
await run("G2_cured_travelThenRelease",     { path: travel, patchDragEnter: true });
await run("G3_shipped_stillPointer",        { path: still });
await run("G4_shipped_replaceOverPreview",  { path: travel, preload: true });

console.log(JSON.stringify(out, null, 2));
await browser.close();
