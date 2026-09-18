/** CHALLENGE-C pass-4 adjudication of pass-3's two BLOCKERs: P-1 (store whiteout) and C-3 (dead emits). */
import { chromium } from "playwright";
const browser = await chromium.launch();

// ── P-1: does '{"version":1}' blank the whole app? ──
for (const [label, payload] of [["control", null], ["version-only", '{"version":1}']]) {
  for (const route of ["/#/", "/#/palettes", "/#/blob"]) {
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(e.message.split("\n")[0]));
    if (payload) await page.addInitScript((p) => localStorage.setItem("color-palettes", p), payload);
    await page.goto("http://localhost:9000" + route, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    const m = await page.evaluate(() => ({
      bodyText: document.body.innerText.trim().length,
      appHTML: (document.querySelector("#app") || document.body).innerHTML.length,
      canvases: document.querySelectorAll("canvas").length,
    }));
    console.log(`P-1 ${label.padEnd(13)} ${route.padEnd(13)} bodyText=${String(m.bodyText).padStart(4)} appHTML=${String(m.appHTML).padStart(6)} canvas=${m.canvases} pageErrors=${pageErrors.length} ${pageErrors[0] ?? ""}`);
    await page.close();
  }
}

// ── C-3: does emit('commitEdit') reach usePaneRouter's "onCommit-edit"? ──
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const probe = await page.evaluate(() => {
  // find the PalettesPane instance and inspect the props its parent actually passed
  const grid = document.querySelector(".pane-scroll-fade");
  let inst = grid && grid.__vueParentComponent;
  while (inst && !(inst.setupState && "cardRefs" in inst.setupState)) inst = inst.parent;
  if (!inst) return "PalettesPane instance not found";
  const vprops = inst.vnode.props || {};
  return {
    propKeysPassedToPalettesPane: Object.keys(vprops),
    hasOnCommitEdit: "onCommitEdit" in vprops,
    hasKebabOnCommitEdit: "onCommit-edit" in vprops,
  };
});
console.log("\nC-3", JSON.stringify(probe, null, 2));
await browser.close();
