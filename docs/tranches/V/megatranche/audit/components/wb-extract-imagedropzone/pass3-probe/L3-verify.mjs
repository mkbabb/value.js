// CHALLENGE-L pass 3 — independent re-measurement of the token/material claims
// carried forward from pass 2, plus the error-channel probe pass 2 did not run.
// Read-only against the live dev server. Usage: node L3-verify.mjs
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const TARGET = "http://localhost:9000/#/extract";
const out = {};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));
await page.goto(TARGET, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// ── 1 · token A/B: the drop zone's material vs the certified ladder ──
out.tokens = await page.evaluate(() => {
  const cs = getComputedStyle(document.documentElement);
  const zone = document.querySelector('[role="button"][aria-label*="Upload image"]');
  const zs = zone ? getComputedStyle(zone) : null;
  const well = document.querySelector(".dashed-well");
  const ws = well ? getComputedStyle(well) : null;
  const g = (n) => cs.getPropertyValue(n).trim();
  return {
    root: {
      primary: g("--primary"),
      accentLive: g("--accent-live"),
      wellBg: g("--well-bg"),
      cardEdge: g("--card-edge"),
      inkMuted: g("--ink-muted"),
      mutedForeground: g("--muted-foreground"),
      radiusPanel: g("--radius-panel"),
      radiusCard: g("--radius-card"),
      defaultDur: g("--default-transition-duration"),
      defaultEase: g("--default-transition-timing-function"),
      durNormal: g("--duration-normal"),
      easeStandard: g("--ease-standard"),
    },
    zone: zs && {
      backgroundColor: zs.backgroundColor,
      borderTopColor: zs.borderTopColor,
      borderTopWidth: zs.borderTopWidth,
      borderTopStyle: zs.borderTopStyle,
      borderRadius: zs.borderTopLeftRadius,
      boxShadow: zs.boxShadow,
      transitionDuration: zs.transitionDuration,
      transitionTimingFunction: zs.transitionTimingFunction,
      rect: zone.getBoundingClientRect().toJSON(),
    },
    dashedWellOnPage: !!well,
    dashedWell: ws && {
      backgroundColor: ws.backgroundColor,
      borderTopColor: ws.borderTopColor,
      borderTopWidth: ws.borderTopWidth,
      borderRadius: ws.borderTopLeftRadius,
      boxShadow: ws.boxShadow,
    },
    // .plate-ink resolved value + whether the fallback arm can ever fire
    plateInk: (() => {
      const el = document.querySelector(".plate-ink");
      return el ? getComputedStyle(el).color : null;
    })(),
  };
});

// ── 2 · the error channel: does a non-image reach a user-visible error? ──
const bodyBefore = await page.evaluate(() => document.body.innerText);
await page.setInputFiles('input[type="file"]', {
  name: "not-an-image.txt",
  mimeType: "text/plain",
  buffer: Buffer.from("definitely not a png"),
});
await page.waitForTimeout(2500);

out.afterTxt = await page.evaluate(() => {
  const img = document.querySelector('img[alt="Uploaded image"]');
  const destructive = [...document.querySelectorAll("*")]
    .filter((e) => e.children.length === 0 && /fail|error|could not|invalid|unsupported/i.test(e.textContent || ""))
    .map((e) => e.textContent.trim())
    .slice(0, 5);
  const zone = document.querySelector('[role="button"]');
  return {
    imgPresent: !!img,
    imgSrcPrefix: img ? img.src.slice(0, 44) : null,
    imgNaturalWidth: img ? img.naturalWidth : null,
    destructiveText: destructive,
    zoneAria: zone ? zone.getAttribute("aria-label") : null,
    zoneTabindex: zone ? zone.getAttribute("tabindex") : null,
    bodyTextLength: document.body.innerText.trim().length,
  };
});
out.pageErrors = pageErrors;
out.bodyTextLenBefore = bodyBefore.trim().length;

await page.screenshot({ path: new URL("./after-txt.png", import.meta.url).pathname, fullPage: false });
await browser.close();

writeFileSync(new URL("./L3-verify.json", import.meta.url), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
