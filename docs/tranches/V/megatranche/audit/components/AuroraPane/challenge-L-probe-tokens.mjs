import { webkit } from "playwright";
const b = await webkit.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" });
await p.waitForTimeout(2000);
console.log(JSON.stringify(await p.evaluate(() => {
  const cs = getComputedStyle(document.documentElement);
  const t = document.querySelector("[aria-label='Palette harmony']");
  return {
    "--control-h-sm": cs.getPropertyValue("--control-h-sm").trim(),
    "--control-h-md": cs.getPropertyValue("--control-h-md").trim(),
    triggerRenderedHeightPx: t.getBoundingClientRect().height,
    triggerClassList: t.className,
    labelAssociated: !!document.querySelector(".aurora-row-label[for], .aurora-row-label[id]"),
  };
}), null, 1));
await b.close();
