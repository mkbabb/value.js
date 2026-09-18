// CHALLENGE-C probe 6 — can a shareable URL drive `useMarkdownColors`' three
// `throw` statements? They live inside a `computed` bound to `:style` on the
// markdown wrapper, i.e. on the RENDER path, under App.vue's single
// ErrorBoundary that wraps the WHOLE two-pane grid.
import { webkit } from "playwright";

const cases = [
  "oklch(none 0.2 30)",
  "oklch(0.6 none 30)",
  "oklch(0.6 0.2 none)",
  "oklch(none none none)",
  "color(display-p3 none 0.5 0.5)",
  "lab(none 20 30)",
  "oklch(NaN 0.2 30)",
  "oklch(1e400 0.2 30)",
];

const b = await webkit.launch();
const out = [];
for (const color of cases) {
  const c = await b.newContext({ viewport: { width: 1200, height: 900 }, colorScheme: "light" });
  const p = await c.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 120)));
  p.on("console", (m) => {
    const t = m.text();
    if (t.includes("MISCONFIGURED")) return;
    if (m.type() === "error" || /Invalid color/.test(t)) errs.push(m.type()[0].toUpperCase() + ": " + t.slice(0, 150));
  });
  const url = `http://localhost:9000/#/?space=oklch&color=${encodeURIComponent(color)}`;
  await p.goto(url, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(7000);
  const s = await p.evaluate(() => ({
    boundary: !!document.querySelector(".vj-error-boundary"),
    boundaryDetail: document.querySelector(".vj-error-boundary")?.textContent.replace(/\s+/g, " ").trim().slice(0, 150) ?? null,
    mdBody: !!document.querySelector(".markdown-body"),
    styleAttr: document.querySelector(".markdown-wrapper")?.getAttribute("style")?.slice(0, 90) ?? null,
    picker: !!document.querySelector(".picker-shell"),
  }));
  out.push({ color, ...s, errs: errs.slice(0, 3) });
  await c.close();
}
console.log(JSON.stringify(out, null, 2));
await b.close();
