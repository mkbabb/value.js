// CHALLENGE-C probe 2 — the ERROR PATH: abort the doc chunk, then read the
// "Detailed Guide" section precisely (the prior probe matched the unrelated
// dev-misconfig banner via a global [role=alert] query).
import { webkit } from "playwright";

const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: "light" });
const p = await c.newPage();
const errs = [];
const rejections = [];
p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 200)));
p.on("console", (m) => {
  const t = m.text();
  if (m.type() === "error" && !t.includes("MISCONFIGURED")) errs.push("CONSOLE " + t.slice(0, 240));
  if (/unhandled|rejection/i.test(t)) rejections.push(t.slice(0, 240));
});

await p.route(/assets\/docs\/lab\.md/, (route) => route.abort("failed"));
await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(15000);

const s = await p.evaluate(() => {
  const heads = [...document.querySelectorAll("h2")].filter((h) => /Detailed Guide/.test(h.textContent));
  const section = heads[0]?.parentElement ?? null;
  const shot = (el) =>
    el
      ? {
          tag: el.tagName,
          cls: (el.className || "").toString().slice(0, 120),
          text: el.textContent.trim().slice(0, 120),
        }
      : null;
  return {
    sectionFound: !!section,
    sectionHTMLLen: section ? section.innerHTML.length : 0,
    sectionChildren: section ? [...section.children].map(shot) : [],
    markdownBodyPresent: !!document.querySelector(".markdown-body"),
    // the skeleton root, exactly as the template writes it
    skeletonRoot: !!section?.querySelector(":scope > div.flex.items-center.space-x-4.h-full"),
    skeletonCount: section ? section.querySelectorAll('[class*="shimmer"], [data-slot="skeleton"]').length : 0,
    ohSnap: /Oh snap/.test(section?.textContent ?? ""),
    scopedAlerts: section ? [...section.querySelectorAll('[role="alert"]')].map((a) => a.textContent.trim().slice(0, 80)) : [],
  };
});
console.log(JSON.stringify({ state: s, errors: errs.slice(0, 10), rejections: rejections.slice(0, 5) }, null, 2));
await p.screenshot({ path: "docs/tranches/V/megatranche/audit/components/Markdown/frames/C2-chunk-abort.png" });
await b.close();
