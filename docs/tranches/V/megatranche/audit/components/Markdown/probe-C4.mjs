// CHALLENGE-C probe 4 — the doc-less color spaces.
// AboutPane's `markdownModules` covers 11 of the 18 spaces the About
// ColorSpaceSelector offers (it iterates DISPLAY_COLOR_SPACE_NAMES whole).
// `<Markdown v-if="activeMarkdownModule">` therefore does not mount at all for
// the other 7 — so Markdown.vue's designed `v-else` Alert ("We couldn't find
// the documentation for the selected color space") is unreachable and the
// "Detailed Guide" section renders as a bare heading over nothing.
import { webkit } from "playwright";

const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(8000);

const readSection = () =>
  p.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((x) => /Detailed Guide/.test(x.textContent));
    const sec = h?.parentElement ?? null;
    return {
      sectionFound: !!sec,
      childCount: sec ? sec.children.length : 0,
      childTags: sec ? [...sec.children].map((e) => e.tagName + "." + (e.className || "").toString().split(" ")[0]) : [],
      sectionText: sec ? sec.textContent.replace(/\s+/g, " ").trim().slice(0, 90) : null,
      sectionHeight: sec ? +sec.getBoundingClientRect().height.toFixed(1) : null,
      mdWrapper: !!document.querySelector(".markdown-wrapper"),
      mdBodyLen: document.querySelector(".markdown-body")?.textContent.trim().length ?? 0,
      ohSnap: /Oh snap/.test(sec?.textContent ?? ""),
      trigger: document.querySelectorAll('[aria-label="Select color space"]').length,
    };
  });

const results = { baseline: await readSection(), perSpace: {} };

// The About pane's own selector is the SECOND [aria-label="Select color space"]
// trigger on the page (the picker plate carries the first).
async function pick(name) {
  const triggers = p.locator('[aria-label="Select color space"]');
  const n = await triggers.count();
  await triggers.nth(n - 1).click();
  await p.waitForTimeout(700);
  const item = p.locator('[role="option"]', { hasText: new RegExp("^\\s*" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
  await item.first().click({ timeout: 5000 });
  await p.waitForTimeout(2500);
}

for (const name of ["Display P3", "Rec. 2020", "ICtCp", "Jzazbz", "sRGB Linear", "Adobe RGB", "ProPhoto RGB"]) {
  try {
    await pick(name);
    results.perSpace[name] = await readSection();
  } catch (e) {
    results.perSpace[name] = { error: String(e).slice(0, 140) };
  }
}
await p.screenshot({ path: "docs/tranches/V/megatranche/audit/components/Markdown/frames/C4-docless-space.png" });
console.log(JSON.stringify(results, null, 2));
await b.close();
