import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" });
await p.waitForSelector(".aurora-row"); await p.waitForTimeout(1200);
const cdp = await p.context().newCDPSession(p);
await cdp.send("DOM.enable"); await cdp.send("Accessibility.enable");
const { root } = await cdp.send("DOM.getDocument", { depth: -1, pierce: true });
const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: '[aria-label="Palette harmony"]' });
const { nodes } = await cdp.send("Accessibility.getPartialAXTree", { nodeId, fetchRelatives: true });
console.log(JSON.stringify(nodes.slice(0,3), null, 1));
// and the innerHTML of the trigger
console.log("TRIGGER HTML:", await p.locator('[aria-label="Palette harmony"]').innerHTML());
await b.close();
