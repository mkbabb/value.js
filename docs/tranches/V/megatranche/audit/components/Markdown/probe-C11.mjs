// CHALLENGE-C probe 11 — look at the markdown body itself (element screenshot),
// light + dark, and read back the mark / heading inks it paints.
import { webkit } from "playwright";

const b = await webkit.launch();
for (const scheme of ["light", "dark"]) {
  const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: scheme, deviceScaleFactor: 2 });
  const p = await c.newPage();
  await p.goto("http://localhost:9000/#/?space=oklch&color=" + encodeURIComponent("oklch(0.6 0.15 30)"), {
    waitUntil: "domcontentloaded",
  });
  await p.waitForSelector(".markdown-body", { timeout: 20000 });
  await p.waitForTimeout(2500);
  // force everything visible so the element screenshot is the true document
  await p.addStyleTag({ content: ".markdown-body > * { content-visibility: visible !important; }" });
  await p.waitForTimeout(600);
  await p.locator(".markdown-body").screenshot({
    path: `docs/tranches/V/megatranche/audit/components/Markdown/frames/C11-body-${scheme}.png`,
  });
  const inks = await p.evaluate(() => {
    const g = (s) => {
      const e = document.querySelector(s);
      return e ? { color: getComputedStyle(e).color, bg: getComputedStyle(e).backgroundColor, text: e.textContent.slice(0, 30) } : null;
    };
    return {
      h2: g(".markdown-body > h2"),
      h3: g(".markdown-body > h3"),
      mark: g("mark.cs-name"),
      inlineCode: g(".markdown-body p > code"),
      hr: (() => { const e = document.querySelector(".markdown-body > hr"); return e ? { borderColor: getComputedStyle(e).borderTopColor, opacity: getComputedStyle(e).opacity } : null; })(),
      markCount: document.querySelectorAll("mark.cs-name").length,
    };
  });
  console.log(scheme, JSON.stringify(inks));
  await c.close();
}
await b.close();
