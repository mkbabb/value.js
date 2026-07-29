import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

const net = [];
p.on("request", (r) => { if (/sessions/.test(r.url())) net.push(["REQ", r.method(), r.url(), r.postData()]); });
p.on("response", async (r) => { if (/sessions/.test(r.url())) net.push(["RES", r.status(), r.url(), (await r.text().catch(() => "")).slice(0, 200)]); });
const consoleMsgs = [];
p.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text().slice(0, 300)}`));
p.on("pageerror", (e) => consoleMsgs.push(`PAGEERROR: ${e.message}`));

await p.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(2500);

const before = await p.evaluate(() => ({
    url: location.href,
    slug: localStorage.getItem("palette-user-slug"),
    admin: localStorage.getItem("palette-admin-token"),
}));

// Hidden-focusable census: can the tab order reach the (occluded) slug form?
const hiddenFocusable = await p.evaluate(() => {
    const inp = document.querySelector('input[placeholder="enter slug or token..."]');
    if (!inp) return "(no slug input)";
    const r = inp.getBoundingClientRect();
    let anc = inp, inert = false, ariaHidden = false, hiddenAttr = false;
    while (anc) {
        if (anc.inert) inert = true;
        if (anc.getAttribute && anc.getAttribute("aria-hidden") === "true") ariaHidden = true;
        if (anc.hasAttribute && anc.hasAttribute("hidden")) hiddenAttr = true;
        anc = anc.parentElement;
    }
    inp.focus();
    return {
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        visibility: getComputedStyle(inp).visibility,
        display: getComputedStyle(inp).display,
        opacityChain: (() => { let n = inp, o = 1; while (n) { o *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return o; })(),
        anyAncestorInert: inert,
        anyAncestorAriaHidden: ariaHidden,
        anyAncestorHiddenAttr: hiddenAttr,
        focusLanded: document.activeElement === inp,
    };
});

// Drive the shipped slug form natively (the dock face occludes real clicks).
const driven = await p.evaluate(() => {
    const inp = document.querySelector('input[placeholder="enter slug or token..."]');
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(inp, "zzzz-yyyy-xxxx-wwww");
    inp.dispatchEvent(new Event("input", { bubbles: true }));
    const form = inp.closest("form");
    return { hasForm: !!form, value: inp.value };
});
await p.waitForTimeout(300);
const btnDisabled = await p.locator('[aria-label="Switch to slug"]').isDisabled();
await p.evaluate(() => {
    const inp = document.querySelector('input[placeholder="enter slug or token..."]');
    inp.closest("form").requestSubmit();
});
await p.waitForTimeout(4000);

const after = await p.evaluate(() => ({
    url: location.href,
    slug: localStorage.getItem("palette-user-slug"),
    admin: localStorage.getItem("palette-admin-token"),
    bodyInnerTextHits: (document.body.innerText.match(/[^\n]*(not found|failed|error|already|too many|invalid)[^\n]*/gi) || []).slice(0, 10),
    bodyInnerTextLen: document.body.innerText.length,
    liveRegions: [...document.querySelectorAll("[aria-live],[role=alert],[role=status]")].map((n) => n.textContent.trim()).filter(Boolean),
    fieldValue: document.querySelector('input[placeholder="enter slug or token..."]')?.value ?? "(field gone)",
    activeElement: (document.activeElement?.tagName ?? "") + ":" + (document.activeElement?.getAttribute?.("aria-label") ?? document.activeElement?.getAttribute?.("placeholder") ?? ""),
}));

console.log("BEFORE:", JSON.stringify(before));
console.log("HIDDEN-FOCUSABLE:", JSON.stringify(hiddenFocusable, null, 1));
console.log("DRIVEN:", JSON.stringify(driven), "submitBtnDisabled:", btnDisabled);
console.log("AFTER:", JSON.stringify(after, null, 1));
console.log("NET:", JSON.stringify(net, null, 1));
console.log("CONSOLE(last 15):", JSON.stringify(consoleMsgs.slice(-15), null, 1));
await b.close();
