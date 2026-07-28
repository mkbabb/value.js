// CHALLENGE-C probe 7 — the LIVE element census across all 11 docs that
// AboutPane's `markdownModules` can hand this component (its complete input
// domain). Answers, per doc: which of the 340-line scoped stylesheet's
// selectors have any subject at all; the heading-level sequence; the
// `mark.cs-name` count; the direct-child count that content-visibility:auto
// applies to; and whether `.markdown-body` carries the parent scope id (the
// line-98 non-`:deep()` rule's liveness).
import { webkit } from "playwright";

const SPACES = [
  ["rgb", "RGB"],
  ["hex", "Hex"],
  ["hsl", "HSL"],
  ["hsv", "HSV"],
  ["hwb", "HWB"],
  ["lab", "Lab"],
  ["lch", "LCh"],
  ["oklab", "OKLab"],
  ["oklch", "OKLCh"],
  ["xyz", "XYZ"],
  ["kelvin", "Kelvin"],
];

const SELECTORS = {
  pre: "pre",
  preCode: "pre code",
  table: "table",
  th: "th",
  blockquote: "blockquote",
  img: "img",
  taskList: "ul.contains-task-list",
  callout: ".callout",
  dl: "dl",
  footnotes: ".footnotes",
  footnoteRef: ".footnote-ref",
  toc: ".toc",
  h1: ":scope > h1",
  h5: ":scope > h5",
  h6: ":scope > h6",
  a: "a",
  inlineCodeP: "p > code",
  katexDisplay: ":scope > div.inline-block:has(> .katex-display)",
  katexInline: "p div.inline-block:has(> .katex)",
  hr: ":scope > hr",
  ol: ":scope > ol",
  ul: ":scope > ul",
};

const b = await webkit.launch();
const rows = [];
for (const [space, name] of SPACES) {
  const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
  const p = await c.newPage();
  await p.goto(`http://localhost:9000/#/?space=${space}&color=${encodeURIComponent("oklch(0.6 0.15 30)")}`, {
    waitUntil: "domcontentloaded",
  });
  try {
    await p.waitForSelector(".markdown-body", { timeout: 20000 });
  } catch {
    rows.push({ space, error: "no .markdown-body" });
    await c.close();
    continue;
  }
  await p.waitForTimeout(1500);
  const r = await p.evaluate((sel) => {
    const body = document.querySelector(".markdown-body");
    const counts = {};
    for (const [k, s] of Object.entries(sel)) {
      try {
        counts[k] = body.querySelectorAll(s).length;
      } catch (e) {
        counts[k] = "SELECTOR_ERR";
      }
    }
    return {
      bodyAttrs: [...body.attributes].map((a) => a.name),
      directChildren: body.children.length,
      cvAuto: [...body.children].filter((k) => getComputedStyle(k).contentVisibility === "auto").length,
      headings: [...body.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]),
      marks: body.querySelectorAll("mark.cs-name").length,
      textLen: body.textContent.trim().length,
      counts,
    };
  }, SELECTORS);
  rows.push({ space, name, ...r });
  await c.close();
}
await b.close();

// aggregate
const agg = {};
for (const k of Object.keys(SELECTORS)) agg[k] = rows.reduce((s, r) => s + (typeof r.counts?.[k] === "number" ? r.counts[k] : 0), 0);
console.log(JSON.stringify({ rows, aggregateAcrossAll11Docs: agg }, null, 2));
