// read-only: drop a NON-image (.txt) on the empty stage — isImageFile() rejects it client-side, so no upload/API write happens.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); const reqs = [];
p.on("request", (r) => { if (r.method() !== "GET") reqs.push(r.method() + " " + r.url()); });
await p.goto("http://localhost:3100/visualize", { waitUntil: "networkidle" }); await p.waitForTimeout(600);
const r = await p.evaluate(() => { const el = document.querySelector(".drop-target"); const dt = new DataTransfer(); dt.items.add(new File(["hello"], "notes.txt", { type: "text/plain" }));
  for (const t of ["dragenter", "dragover", "drop"]) el.dispatchEvent(new DragEvent(t, { bubbles: true, cancelable: true, dataTransfer: dt })); return document.querySelector(".drop-target")?.hasAttribute("data-dragging"); });
await p.waitForTimeout(1200);
await p.screenshot({ path: new URL("d-light-7-drop-rejected-txt.png", import.meta.url).pathname });
console.log(JSON.stringify({ stillDragging: r, nonGetRequests: reqs, toasts: await p.evaluate(() => [...document.querySelectorAll("[role=status],[role=alert],[data-sonner-toast],.toast")].map((e) => e.textContent.trim().slice(0, 80))) }));
await b.close();
