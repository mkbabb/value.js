// CHALLENGE-C probe 12 — the direct-DOM-mutation hazard.
// `highlightColorSpaceName` replaces text nodes Vue rendered, inside a child
// component (`<component :is>`), with a DocumentFragment. Switch spaces back and
// forth and check for text corruption (duplicated/lost prose), mark leakage, and
// orphaned wrappers.
import { webkit } from "playwright";

const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/?space=lab&color=" + encodeURIComponent("oklch(0.6 0.15 30)"), {
  waitUntil: "domcontentloaded",
});
await p.waitForSelector(".markdown-body", { timeout: 20000 });
await p.waitForTimeout(2000);

const read = () =>
  p.evaluate(() => {
    const bodies = document.querySelectorAll(".markdown-body");
    const b0 = bodies[0];
    return {
      wrappers: document.querySelectorAll(".markdown-wrapper").length,
      bodies: bodies.length,
      marks: b0 ? b0.querySelectorAll("mark.cs-name").length : 0,
      textLen: b0 ? b0.textContent.trim().length : 0,
      firstH3: b0?.querySelector("h3")?.textContent.trim() ?? null,
      // integrity: any word doubled at a mark seam, e.g. "LabLab"
      seamDupes: b0 ? (b0.textContent.match(/(\b\w{2,10}\b)\1/g) ?? []).slice(0, 5) : [],
    };
  });

async function pick(name) {
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  const t = p.locator('[aria-label="Select color space"]');
  await t.nth((await t.count()) - 1).click();
  await p.waitForTimeout(700);
  // the option's visible NAME node is `.specimen-name`; match it exactly
  await p
    .locator(".specimen-name", { hasText: new RegExp("^" + name.replace(/\./g, "\\.") + "$") })
    .first()
    .click({ timeout: 8000 });
  await p.waitForTimeout(2000);
}

const log = [{ step: "boot(lab)", ...(await read()) }];
for (const s of ["OKLCh", "Lab", "XYZ", "Lab", "HSL", "Lab"]) {
  try {
    await pick(s);
    log.push({ step: s, ...(await read()) });
  } catch (e) {
    log.push({ step: s, error: String(e).slice(0, 100) });
  }
}
console.log(JSON.stringify(log, null, 2));
await b.close();
