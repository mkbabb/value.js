import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3500);
const main = p.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();

// 1) Playwright accname resolution
const n = await main.getByRole("button", { name: "Copy CSS", exact: true }).count();
console.log("A) buttons in <main> with accessible name exactly 'Copy CSS':", n);

// 2) Chrome's own accessibility tree via CDP (authoritative accname)
const cdp = await p.context().newCDPSession(p);
await cdp.send("Accessibility.enable");
await cdp.send("DOM.enable");
const { root } = await cdp.send("DOM.getDocument", { depth: -1, pierce: true });
const q = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: "main .dock-icon-button, main button" });
let found = 0;
for (const nodeId of q.nodeIds) {
  const ax = await cdp.send("Accessibility.getPartialAXTree", { nodeId, fetchRelatives: false });
  for (const node of ax.nodes) {
    if (node.role?.value !== "button") continue;
    const name = node.name?.value ?? "";
    const nameFrom = node.name?.sources?.filter(s => s.value).map(s => s.type + "=" + (s.attribute ?? "")).join(",");
    if (/copy/i.test(name) || name === "") {
      found++;
      console.log("B) CDP AX button:", JSON.stringify({ name, nameFrom, ignored: node.ignored }));
    }
  }
  if (found > 6) break;
}

// 3) enumerate ALL buttons inside <main> whose CDP accname is empty
const q2 = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: "main button" });
const empties = [];
for (const nodeId of q2.nodeIds) {
  const ax = await cdp.send("Accessibility.getPartialAXTree", { nodeId, fetchRelatives: false });
  const node = ax.nodes.find(x => x.role?.value === "button");
  if (node && !(node.name?.value)) {
    const d = await cdp.send("DOM.getOuterHTML", { nodeId });
    empties.push(d.outerHTML.slice(0, 130));
  }
}
console.log("C) buttons inside <main> with EMPTY CDP accessible name:", empties.length);
for (const e of empties) console.log("   ", e);
await b.close();
