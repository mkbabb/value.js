// CHALLENGE-C probe 3 — what ACTUALLY happens on doc-chunk failure.
// Dump the about-card subtree + install a window-level rejection/error trap
// BEFORE app boot (init script), so nothing is swallowed.
import { webkit } from "playwright";

const mode = process.argv[2] ?? "abort"; // "abort" | "ok"
const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: "light" });
await c.addInitScript(() => {
  window.__trap = { rejections: [], errors: [] };
  window.addEventListener("unhandledrejection", (e) =>
    window.__trap.rejections.push(String(e.reason && (e.reason.message || e.reason)).slice(0, 200)),
  );
  window.addEventListener("error", (e) => window.__trap.errors.push(String(e.message).slice(0, 200)));
});
const p = await c.newPage();
const consoleWarns = [];
p.on("console", (m) => {
  const t = m.text();
  if (t.includes("MISCONFIGURED")) return;
  if (m.type() === "error" || m.type() === "warning") consoleWarns.push(m.type().toUpperCase() + " " + t.slice(0, 220));
});
p.on("pageerror", (e) => consoleWarns.push("PAGEERROR " + e.message.slice(0, 220)));

if (mode === "abort") await p.route(/assets\/docs\/.*\.md/, (route) => route.abort("failed"));
await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(15000);

const s = await p.evaluate(() => {
  const card = document.querySelector(".about-card");
  const html = card ? card.innerHTML : document.getElementById("app")?.innerHTML ?? "";
  return {
    aboutCardPresent: !!card,
    aboutCardTextTail: card ? card.textContent.replace(/\s+/g, " ").trim().slice(-260) : null,
    aboutCardHTMLLen: html.length,
    tailHTML: html.slice(-900),
    trap: window.__trap,
    skeletons: document.querySelectorAll('[data-slot="skeleton"]').length,
    mdBody: !!document.querySelector(".markdown-body"),
    wrapper: !!document.querySelector(".markdown-wrapper"),
  };
});
console.log(JSON.stringify({ mode, state: s, console: consoleWarns.slice(0, 12) }, null, 2));
await p.screenshot({ path: `docs/tranches/V/megatranche/audit/components/Markdown/frames/C3-${mode}.png` });
await b.close();
