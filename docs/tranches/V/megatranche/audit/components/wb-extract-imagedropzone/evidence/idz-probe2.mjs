// IDZ probe 2 — REAL browser drag events via CDP Input.dispatchDragEvent.
// Measures: (a) the dragleave strobe when the drag crosses onto a child,
//           (b) the silent non-image drop, (c) the unvalidated picker path.
import { chromium } from "playwright";
import { makePng } from "./idz-probe1.mjs";

const out = {};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const cdp = await page.context().newCDPSession(page);
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e).slice(0, 160)));
page.on("console", (m) => { if (m.type() === "error") (out.consoleErrors ??= []).push(m.text().slice(0, 160)); });
page.on("filechooser", async (fc) => { try { await fc.setFiles([]); } catch {} });

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForTimeout(2500);

const ZONE = '[role="button"][aria-label*="image" i]';
const zoneState = () =>
    page.evaluate((sel) => {
        const z = document.querySelector(sel);
        const cs = getComputedStyle(z);
        return {
            dragging: z.className.includes("border-primary") && z.className.includes("bg-primary/10"),
            borderColor: cs.borderTopColor,
            transform: cs.transform,
        };
    }, ZONE);

const box = await page.locator(ZONE).boundingBox();
out.zoneBox = box;

// A payload the drop handler should ACCEPT (image) and one it must REJECT.
const dragData = (mime, data) => ({
    items: [{ mimeType: mime, data }],
    dragOperationsMask: 1,
    files: [],
});

// ── (a) real drag: enter at the padding, then move onto the <img>/child ──
// with no image yet the child is the placeholder <div>; measure the strobe.
await cdp.send("Input.setInterceptDrags", { enabled: true });

const dragTo = async (x, y, type, data) => {
    await cdp.send("Input.dispatchDragEvent", { type, x, y, data });
    await page.waitForTimeout(60);
};

const payload = dragData("text/uri-list", "file:///tmp/x.png");
const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
const edgeX = box.x + 4, edgeY = box.y + 4;

out.dragSequence = [];
await dragTo(edgeX, edgeY, "dragEnter", payload);
out.dragSequence.push({ step: "dragEnter@edge", ...(await zoneState()) });
await dragTo(edgeX, edgeY, "dragOver", payload);
out.dragSequence.push({ step: "dragOver@edge", ...(await zoneState()) });
// now cross onto the inner placeholder block (a child element)
await dragTo(cx, cy, "dragOver", payload);
out.dragSequence.push({ step: "dragOver@centre(child)", ...(await zoneState()) });
// read what the child under the centre actually is
out.childAtCentre = await page.evaluate(([x, y]) => {
    const el = document.elementFromPoint(x, y);
    return { tag: el?.tagName, cls: (el?.className || "").toString().slice(0, 80) };
}, [cx, cy]);

// Explicit spec-faithful crossing: dragleave at the root while still inside.
await page.dispatchEvent(ZONE, "dragleave", { bubbles: true });
out.afterDragLeaveOnRoot = await zoneState();

await cdp.send("Input.dispatchDragEvent", { type: "dragCancel", x: cx, y: cy, data: payload });
await page.waitForTimeout(200);
await cdp.send("Input.setInterceptDrags", { enabled: false });

// ── (b) SILENT non-image drop (synthesised DataTransfer, real handler) ────
out.beforeBadDrop = await page.evaluate(() => ({
    errorLine: document.querySelector(".text-destructive")?.textContent?.trim() ?? null,
    hasPreview: !!document.querySelector('img[alt="Uploaded image"]'),
}));
await page.evaluate((sel) => {
    const z = document.querySelector(sel);
    const dt = new DataTransfer();
    dt.items.add(new File(["%PDF-1.4 not an image"], "report.pdf", { type: "application/pdf" }));
    z.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: dt }));
    z.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: dt }));
}, ZONE);
await page.waitForTimeout(1200);
out.afterBadDrop = await page.evaluate(() => ({
    errorLine: document.querySelector(".text-destructive")?.textContent?.trim() ?? null,
    hasPreview: !!document.querySelector('img[alt="Uploaded image"]'),
    zoneClass: document.querySelector('[role="button"][aria-label*="image" i]').className.includes("border-primary"),
    ariaLive: [...document.querySelectorAll("[aria-live]")].map((n) => n.textContent.trim()).filter(Boolean),
}));

// ── (c) the picker path takes ANY file — no type guard at all ─────────────
out.pageErrors = out.pageErrors ?? [];
const errBefore = out.pageErrors.length;
await page.setInputFiles('input[type=file]', {
    name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("this is not an image at all"),
});
await page.waitForTimeout(2000);
out.afterTxtViaPicker = await page.evaluate(() => {
    const img = document.querySelector('img[alt="Uploaded image"]');
    return {
        imgRendered: !!img,
        srcPrefix: img?.getAttribute("src")?.slice(0, 40) ?? null,
        naturalWidth: img?.naturalWidth ?? null,
        errorLine: document.querySelector(".text-destructive")?.textContent?.trim() ?? null,
        zoneLabel: document.querySelector('[role="button"][aria-label*="image" i]')?.getAttribute("aria-label"),
        zoneTabIndex: document.querySelector('[role="button"][aria-label*="image" i]')?.tabIndex,
    };
});
out.newPageErrors = out.pageErrors.slice(errBefore);
await page.screenshot({ path: "./idz-txt-accepted.png" });

console.log(JSON.stringify(out, null, 2));
await browser.close();
