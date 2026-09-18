// SERVED MODEL: claude-opus-5[1m]
// X.KF.W9 `.d` — the `chromium/emulated-forced-colors` and `webkit-engine` cells.
//
// I-20, stated before a pixel is written: THIS IS NOT THE WHC CELL. `windows/real-HCM`
// requires a Windows host in real High Contrast Mode; a chromium emulation wearing that
// label is the I-20 failure by name (KF-W9.md §Sequencing S-13). Every row below carries
// its OWN cell id and its verdict NEVER enters a `safari-app` or `windows` column.
import { chromium, webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const ORIGIN = "http://127.0.0.1:9123";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/safari-real";
const SUBSTRATE_SHA = "55e9bf0d2391bbc6d9871bb3f0555a6225daae92";
const BUNDLE_SHA = "1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448";
mkdirSync(OUT, { recursive: true });
const out = { substrateSha: SUBSTRATE_SHA, bundleSha256: BUNDLE_SHA, origin: ORIGIN, rows: [] };

async function shot(page, name) {
  const p = `${OUT}/${name}`;
  await page.screenshot({ path: p, animations: "disabled" });
  const { readFileSync } = await import("node:fs");
  const d = createHash("sha256").update(readFileSync(p)).digest("hex");
  writeFileSync(`${p}.sha256`, `${d}  ${name}\n`);
  return { path: p.replace("/Users/mkbabb/Programming/value.js/", ""), sha256: d };
}

const CAP = () => ({
  fc: matchMedia("(forced-colors: active)").media,
  fcMatch: matchMedia("(forced-colors: active)").matches,
  prt: matchMedia("(prefers-reduced-transparency: reduce)").media,
  prtMatch: matchMedia("(prefers-reduced-transparency: reduce)").matches,
  prm: matchMedia("(prefers-reduced-motion: reduce)").media,
  prmMatch: matchMedia("(prefers-reduced-motion: reduce)").matches,
  ua: navigator.userAgent, dpr: devicePixelRatio,
});

// Focus a selector with a REAL Tab-established keyboard modality, then read the paint.
const READ = (sel) => {
  const el = document.querySelector(sel);
  if (!el) return { absent: true, selector: sel };
  el.scrollIntoView({ block: "center" });
  el.focus();
  const cs = getComputedStyle(el);
  let fv = null;
  try { fv = el.matches(":focus-visible"); } catch (e) { fv = "ERR"; }
  return {
    selector: sel, isActive: document.activeElement === el, focusVisible: fv,
    tag: el.tagName.toLowerCase(),
    cls: (typeof el.className === "string" ? el.className : "").slice(0, 200),
    outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth,
    outlineColor: cs.outlineColor, outlineOffset: cs.outlineOffset,
    boxShadow: cs.boxShadow, forcedColorAdjust: cs.forcedColorAdjust,
    focusRingShadowToken: cs.getPropertyValue("--focus-ring-shadow").trim(),
  };
};

const AT = () => {
  const q = (s) => [...document.querySelectorAll(s)];
  return {
    sliders: q('[role="slider"]').map((e) => ({
      cls: (typeof e.className === "string" ? e.className : "").slice(0, 80),
      label: e.getAttribute("aria-label"), labelledby: e.getAttribute("aria-labelledby"),
      describedby: e.getAttribute("aria-describedby"), title: e.getAttribute("title"),
      now: e.getAttribute("aria-valuenow"), vt: e.getAttribute("aria-valuetext"),
      min: e.getAttribute("aria-valuemin"), max: e.getAttribute("aria-valuemax"),
    })),
    liveRegions: q('[role="status"],[aria-live]').map((e) => ({
      role: e.getAttribute("role"), live: e.getAttribute("aria-live"),
      parentTag: e.parentElement && e.parentElement.tagName.toLowerCase(),
      parentRole: e.parentElement && e.parentElement.getAttribute("role"),
      text: (e.textContent || "").trim().slice(0, 40),
    })),
    applications: q('[role="application"]').map((e) => ({
      label: (e.getAttribute("aria-label") || "").slice(0, 260),
      labelWords: (e.getAttribute("aria-label") || "").trim().split(/\s+/).filter(Boolean).length,
      describedby: e.getAttribute("aria-describedby"),
      valuenow: e.getAttribute("aria-valuenow"), valuetext: e.getAttribute("aria-valuetext"),
      tabindex: e.getAttribute("tabindex"), childCount: e.children.length,
      childrenAriaHidden: [...e.children].map((c) => c.getAttribute("aria-hidden")),
    })),
    sceneLabelled: q('[aria-label="Scene"]').map((e) => ({
      tag: e.tagName.toLowerCase(), role: e.getAttribute("role"),
      text: (e.innerText || "").trim().slice(0, 40),
    })),
    canvases: q("canvas").map((c) => ({
      role: c.getAttribute("role"), label: c.getAttribute("aria-label"),
      tabindex: c.getAttribute("tabindex"), ariaHidden: c.getAttribute("aria-hidden"),
      title: c.getAttribute("title"), textLen: (c.textContent || "").trim().length,
      cursor: getComputedStyle(c).cursor,
      w: Math.round(c.getBoundingClientRect().width), h: Math.round(c.getBoundingClientRect().height),
    })),
    copyButtons: q("button").filter((b) => /copy/i.test((b.getAttribute("aria-label") || "") + " " + (typeof b.className === "string" ? b.className : "")))
      .slice(0, 5).map((b) => ({
        label: b.getAttribute("aria-label"), cls: (typeof b.className === "string" ? b.className : "").slice(0, 70),
        nestedStatus: [...b.querySelectorAll('[role="status"],[aria-live]')].map((s) => ({
          role: s.getAttribute("role"), live: s.getAttribute("aria-live"), text: (s.textContent || "").trim().slice(0, 24),
        })),
      })),
    namelessButtons: q('button,[role="button"]').filter((b) =>
      !(b.getAttribute("aria-label") || b.getAttribute("aria-labelledby") || (b.textContent || "").trim())).length,
    headings: q("h1,h2,h3").map((h) => h.tagName + ":" + (h.innerText || "").trim().slice(0, 24)),
    landmarks: q("main,nav,header,footer,aside").length,
    dragHintInText: /drag|grab|swipe|pinch/i.test(document.body.innerText || ""),
    bodyTextLen: (document.body.innerText || "").trim().length,
  };
};

// ───────── chromium/emulated-forced-colors ─────────
for (const fc of ["active", "none"]) {
  const cellId = fc === "active" ? "chromium/emulated-forced-colors" : "chromium";
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, forcedColors: fc, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/#/easing`, { waitUntil: "networkidle", timeout: 30000 }).catch((e) => out.rows.push({ navError: String(e).slice(0, 120) }));
  await page.waitForTimeout(3500);
  const cap = await page.evaluate(CAP);
  await page.keyboard.press("Tab"); // establish keyboard modality
  const ribbon = await page.evaluate(READ, ".btn-playback");
  const ring = await page.evaluate(READ, ".focus-ring");
  const s1 = fc === "active" ? await shot(page, "hcm-chromium-emulated-forced-colors-easing-ribbon.png") : null;
  out.rows.push({
    cell: cellId, driver: "playwright-chromium", forcedColorsEmulation: fc,
    substrateSha: SUBSTRATE_SHA, bundleSha256: BUNDLE_SHA, route: "/#/easing",
    capability: cap, btnPlayback: ribbon, focusRing: ring, shot: s1,
    NOT_WHC: "This is the chromium column. windows/real-HCM requires a Windows host; this row NEVER enters that column (I-20 / S-13).",
  });

  await page.goto(`${ORIGIN}/#/sequence`, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3500);
  await page.keyboard.press("Tab");
  const seq = await page.evaluate(READ, ".seq-handle");
  const s2 = fc === "active" ? await shot(page, "hcm-chromium-emulated-forced-colors-sequence-slider.png") : null;
  out.rows.push({ cell: cellId, driver: "playwright-chromium", forcedColorsEmulation: fc, route: "/#/sequence",
    substrateSha: SUBSTRATE_SHA, bundleSha256: BUNDLE_SHA, seqHandle: seq, shot: s2,
    NOT_WHC: "chromium column only." });
  await b.close();
}

// ───────── the AT PRECONDITION inventory ─────────
// NOT an AT utterance and NOT the safari-app cell. These are DOM/ARIA attributes —
// the preconditions each at/* probe's discriminator is checked against.
//
// DRIVER CHOICE, MEASURED AND STATED: playwright 1.60.0 resolves webkit to
// `webkit-2287`, and only `webkit-2311` is installed on this host, so
// `webkit.launch()` throws. Rather than label a chromium reading `webkit-engine`
// — which is the I-20 failure in its other direction — the inventory is taken in
// the `chromium` cell and BOOKED THERE. The `webkit-engine` cell stays UNMEASURED.
const ENGINE = process.env.W9D_ENGINE === "webkit" ? webkit : chromium;
const ENGINE_CELL = process.env.W9D_ENGINE === "webkit" ? "webkit-engine" : "chromium";
const ENGINE_DRIVER = process.env.W9D_ENGINE === "webkit" ? "playwright-webkit" : "playwright-chromium";
{
  const b = await ENGINE.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  for (const r of ["/#/easing", "/#/spring", "/#/sequence", "/#/amiga", "/#/cube", "/#/square"]) {
    await page.goto(ORIGIN + r, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3000);
    const cap = await page.evaluate(CAP);
    const at = await page.evaluate(AT);
    out.rows.push({ cell: ENGINE_CELL, driver: ENGINE_DRIVER, route: r,
      substrateSha: SUBSTRATE_SHA, bundleSha256: BUNDLE_SHA, capability: cap, atInventory: at,
      NOTE: "AT-PRECONDITION INVENTORY — DOM/ARIA attributes as authored. NOT an AT utterance; at/voiceover-safari, at/nvda and at/jaws stay UNREACHABLE-IN-CELL. NEVER enters a safari-app column (I-20)." });
  }
  await b.close();
}

writeFileSync("/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/dcap3.json", JSON.stringify(out, null, 1));
console.error("ROWS", out.rows.length);
