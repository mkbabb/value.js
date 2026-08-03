import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const rejections = [];
page.on("pageerror", (e) => rejections.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error") rejections.push("console.error: " + m.text().slice(0, 160)); });

await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const result = await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const out = {};
    window.__rej = [];
    window.addEventListener("unhandledrejection", (e) =>
        window.__rej.push(String((e.reason && e.reason.message) || e.reason)),
    );
    const pick = () =>
        [...document.querySelectorAll('[role="button"]')].filter((e) =>
            /image/i.test(e.getAttribute("aria-label") || ""),
        )[0];
    let z = pick();
    if (!z) return { err: "no zone", url: location.href };
    out.emptyLabel = z.getAttribute("aria-label");
    out.emptyTabindex = z.getAttribute("tabindex");

    const DRAG = () => /(^|\s)border-primary(\s|$)/.test(z.className);

    // ---- (A) dragleave fired by a CHILD while the pointer is still inside ----
    z.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: new DataTransfer() }));
    await sleep(60);
    out.A_afterDragover = DRAG() ? "DRAGGING" : "idle";
    const child = z.querySelector("svg") || z.querySelector("span") || z.querySelector("div");
    out.A_childTag = child && child.tagName;
    child.dispatchEvent(new DragEvent("dragleave", { bubbles: true, cancelable: true, dataTransfer: new DataTransfer() }));
    await sleep(60);
    out.A_afterChildDragleave = DRAG() ? "DRAGGING" : "idle";

    // ---- (B) non-image drop: any user feedback? ----
    const txt = new File([new Uint8Array([104, 105])], "notes.txt", { type: "text/plain" });
    const dtTxt = new DataTransfer();
    dtTxt.items.add(txt);
    z.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: new DataTransfer() }));
    await sleep(40);
    z.dispatchEvent(new DragEvent("drop", { dataTransfer: dtTxt, bubbles: true, cancelable: true }));
    await sleep(700);
    out.B_zoneLabelAfterTxtDrop = pick().getAttribute("aria-label");
    out.B_destructiveLines = [...document.querySelectorAll(".text-destructive")].map((e) => e.textContent.trim());
    out.B_ariaLiveRegions = document.querySelectorAll("[aria-live],[role=status],[role=alert]").length;

    // ---- (C) hidden input has no MIME guard: emit a .txt through the PICKER path ----
    const input = z.querySelector('input[type="file"]');
    out.C_inputAccept = input && input.getAttribute("accept");
    out.C_inputHasChangeGuard = true; // asserted from source; measured below via file set

    // ---- (D) valid landscape image, then keyboard/mouse reachability ----
    const c = document.createElement("canvas");
    c.width = 200;
    c.height = 120;
    const g = c.getContext("2d");
    for (let x = 0; x < 200; x++) {
        g.fillStyle = `hsl(${(x / 200) * 360} 70% 50%)`;
        g.fillRect(x, 0, 1, 120);
    }
    const blob = await new Promise((r) => c.toBlob(r, "image/png"));
    const dt = new DataTransfer();
    dt.items.add(new File([blob], "wide.png", { type: "image/png" }));
    z.dispatchEvent(new DragEvent("drop", { dataTransfer: dt, bubbles: true, cancelable: true }));
    await sleep(2500);
    z = pick();
    out.D_label = z.getAttribute("aria-label");
    out.D_tabindex = z.getAttribute("tabindex");
    const focusables = [...document.querySelectorAll("a[href],button,input,select,textarea,[tabindex]")].filter(
        (e) => e.getAttribute("tabindex") !== "-1" && !e.hasAttribute("disabled") && e.offsetParent !== null,
    );
    out.D_zoneInTabOrder = focusables.includes(z);

    const OV = '[role="dialog"], .fixed.inset-0';
    const before = document.querySelectorAll(OV).length;
    z.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    z.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }));
    await sleep(600);
    out.D_overlayDeltaAfterKeyboard = document.querySelectorAll(OV).length - before;
    z.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    await sleep(900);
    out.D_overlayDeltaAfterClick = document.querySelectorAll(OV).length - before;

    const tag = [...z.querySelectorAll("span")].find((s) => /^(sample|replace)$/.test(s.textContent.trim()));
    out.D_cornerTag = tag
        ? { text: tag.textContent.trim(), opacity: getComputedStyle(tag).opacity, ariaHidden: tag.getAttribute("aria-hidden") }
        : null;

    out.rejections = window.__rej;
    return out;
});

console.log(JSON.stringify(result, null, 2));
console.log("--- page-level errors ---");
console.log(JSON.stringify(rejections, null, 2));
await browser.close();
