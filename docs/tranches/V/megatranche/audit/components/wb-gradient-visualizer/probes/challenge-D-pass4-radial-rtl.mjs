// CHALLENGE-D pass 4 — two reproductions the prior three passes did not run.
//
// G-1  radial + CSS-panel keystroke destroys `direction`
//      chain: GradientVisualizer.vue:102-108 -> useGradientModel.applyCSS:158-168
//             -> gradientParse.ts:214 (`direction = type === "linear" ? 180 : 0`)
//             -> useGradientCSS.ts:151-155 (serializeGradient emits NO preamble for radial)
//
// G-4  E-6 (carried unverified by passes 2 and 3): the Direction range fill does not
//      mirror under dir=rtl — it grows from the physical left in BOTH directions.
//
// Read-only: no app source is touched. Run: node <this file>
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const out = {};

const browser = await chromium.launch();

// ── G-1 ───────────────────────────────────────────────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${ORIGIN}/#/gradient`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const read = () =>
    page.evaluate(() => {
      const th = document.querySelector('[aria-label="Gradient direction"] .slider-thumb');
      const range = document.querySelector('[aria-label="Gradient direction"] .slider-range');
      const track = document.querySelector('[aria-label="Gradient direction"] .slider-track');
      const ta = document.querySelector('[aria-label="Gradient CSS"]');
      const type = document.querySelector('[aria-label="Gradient type"]');
      const tile = document.querySelector('[data-testid="gradient-render-tile"]');
      const readout = [...document.querySelectorAll("span")].find((s) => /^\d+°$/.test(s.textContent.trim()));
      return {
        type: type?.textContent.trim() ?? null,
        valuenow: th?.getAttribute("aria-valuenow") ?? null,
        readout: readout?.textContent.trim() ?? null,
        fillFrac: range && track
          ? +(range.getBoundingClientRect().width / track.getBoundingClientRect().width).toFixed(4)
          : null,
        editor: (ta?.textContent ?? "").slice(0, 120),
        tile: (getComputedStyle(tile).backgroundImage || "").slice(0, 70),
      };
    });

  // Type := Radial
  await page.click('[aria-label="Gradient type"]');
  await page.waitForTimeout(400);
  await page.click('[role="option"]:has-text("Radial")');
  await page.waitForTimeout(600);
  out.g1_afterRadial = await read();

  // A CLEAN edit in the CSS panel (must parse) — the success path is the one
  // that writes `direction`. Attempt 1 (a trailing space) rejected, so the
  // model was never touched; that is recorded too.
  const ta = page.locator('[aria-label="Gradient CSS"]').first();
  await ta.click();
  await page.keyboard.press("End");
  await page.keyboard.type(" ");
  await page.waitForTimeout(1600);
  out.g1_afterRejectedEdit = await read();
  const verdict1 = await page.evaluate(() => document.querySelector('[data-testid="gradient-parse-verdict"]')?.textContent?.trim() ?? null);
  out.g1_verdictAfterRejectedEdit = verdict1;

  await ta.click();
  await page.evaluate(() => { const el = document.querySelector('[aria-label="Gradient CSS"]'); el.focus(); const r = document.createRange(); r.selectNodeContents(el); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); });
  await page.keyboard.type("radial-gradient(oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 90%)");
  await page.waitForTimeout(1600);
  out.g1_afterCleanEdit = await read();
  out.g1_verdictAfterCleanEdit = await page.evaluate(() => document.querySelector('[data-testid="gradient-parse-verdict"]')?.textContent?.trim() ?? null);
  await page.close();
}

// ── G-4 ───────────────────────────────────────────────────────────────────────
for (const dir of ["ltr", "rtl"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${ORIGIN}/#/gradient`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.evaluate((d) => document.documentElement.setAttribute("dir", d), dir);
  await page.waitForTimeout(1200);
  out[`g4_${dir}`] = await page.evaluate(() => {
    const R = (el) => { const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), w: +r.width.toFixed(1), right: +r.right.toFixed(1) }; };
    const track = document.querySelector('[aria-label="Gradient direction"] .slider-track');
    const range = document.querySelector('[aria-label="Gradient direction"] .slider-range');
    const th = document.querySelector('[aria-label="Gradient direction"] .slider-thumb');
    const tr = R(track), rg = R(range);
    return {
      dir: document.documentElement.getAttribute("dir"),
      valuenow: th?.getAttribute("aria-valuenow") ?? null,
      track: tr,
      range: rg,
      fillFrac: +(rg.w / tr.w).toFixed(4),
      fillAnchoredAt: Math.abs(rg.x - tr.x) < 1 ? "physical-left" : Math.abs(rg.right - tr.right) < 1 ? "physical-right" : "neither",
      expectedAnchor: document.documentElement.getAttribute("dir") === "rtl" ? "physical-right" : "physical-left",
    };
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
