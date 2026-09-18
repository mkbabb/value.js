import { chromium, webkit } from "playwright";
// Reproduce AdminUsersPanel.vue:78-131 verbatim in structure: role=button row containing two <button>s
const HTML = `<!doctype html><meta charset=utf-8><title>t</title><body>
<div role="button" tabindex="0" aria-expanded="false">
  <div><span title="ghost-empty-1733">ghost-empty-1733</span><span>3</span></div>
  <div><button type="button">Palettes</button><button type="button" aria-label="Delete user ghost-empty-1733">x</button></div>
</div></body>`;
for (const [n,e] of [["chromium",chromium],["webkit",webkit]]) {
  const b = await e.launch(); const p = await (await b.newContext()).newPage();
  await p.setContent(HTML);
  const snap = await p.locator("body").ariaSnapshot();
  console.log("=== "+n+" ===\n"+snap);
  await b.close();
}
