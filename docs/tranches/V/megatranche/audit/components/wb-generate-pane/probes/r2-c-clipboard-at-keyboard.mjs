import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleAll = [];
page.on("console", (m) => consoleAll.push(`${m.type()}: ${m.text().slice(0, 160)}`));
page.on("pageerror", (e) => consoleAll.push("PAGEERROR " + String(e).slice(0, 160)));

await page.goto("http://localhost:9000/#/generate", { waitUntil: "networkidle" });
await page.waitForSelector("[data-generate-plate]", { timeout: 20000 });
await page.waitForTimeout(600);

// Force the clipboard channel to REJECT (the Safari / insecure-context / denied-permission case).
await page.evaluate(() => {
  window.__written = [];
  window.__rejections = 0;
  const orig = navigator.clipboard.writeText.bind(navigator.clipboard);
  Object.defineProperty(navigator.clipboard, "writeText", {
    configurable: true,
    value: (t) => { window.__written.push(t); window.__rejections++; return Promise.reject(new DOMException("denied", "NotAllowedError")); },
  });
  window.__unhandled = 0;
  window.addEventListener("unhandledrejection", () => { window.__unhandled++; });
  const plate = document.querySelector("[data-generate-plate]");
  window.__plateHtmlBefore = plate.outerHTML.length;
  window.__ariaLiveBefore = [...document.querySelectorAll("[aria-live],[role=status],[role=alert]")].map((n) => n.textContent.trim());
});

await page.click('[data-generate-plate] button[aria-label="Copy all colors"]');
await page.waitForTimeout(500);

const copyResult = await page.evaluate(() => {
  const plate = document.querySelector("[data-generate-plate]");
  return {
    payload: window.__written[0] ?? null,
    payloadLen: (window.__written[0] || "").length,
    writeAttempts: window.__rejections,
    unhandledRejections: window.__unhandled,
    plateHtmlChanged: plate.outerHTML.length !== window.__plateHtmlBefore,
    ariaLiveAfter: [...document.querySelectorAll("[aria-live],[role=status],[role=alert]")].map((n) => n.textContent.trim()),
    ariaLiveBefore: window.__ariaLiveBefore,
    copyBtnClasses: document.querySelector('[data-generate-plate] button[aria-label="Copy all colors"]').className,
  };
});

// The plate's colour output as exposed to AT
const atView = await page.evaluate(() => {
  const plate = document.querySelector("[data-generate-plate]");
  const clone = plate.cloneNode(true);
  clone.querySelectorAll("[aria-hidden=true]").forEach((n) => n.remove());
  return { visibleToAT: clone.textContent.replace(/\s+/g, " ").trim().slice(0, 220) };
});

// Keyboard walk of the whole pane: what a keyboard user can reach
await page.click('[data-generate-plate] input[aria-label="Palette name"]');
const walk = [];
for (let i = 0; i < 10; i++) {
  const cur = await page.evaluate(() => {
    const a = document.activeElement;
    if (!a) return "none";
    const st = getComputedStyle(a);
    return `${a.tagName}[${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 18)}] outline=${st.outlineWidth}/${st.outlineStyle} ring=${st.boxShadow.slice(0, 34)}`;
  });
  walk.push(cur);
  await page.keyboard.press("Tab");
}

console.log(JSON.stringify({ copyResult, atView, walk, consoleTail: consoleAll.slice(-6) }, null, 1));
await browser.close();
