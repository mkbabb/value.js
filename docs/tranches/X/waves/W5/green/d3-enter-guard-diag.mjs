// SERVED MODEL: claude-opus-5-5[1m] — X.W5.d3 read-only diagnostic: logs Vue BaseTransition enter-guard drops by fulfilling the dev prebundle with two logging lines (served to the probe browser only; node_modules untouched). Run: CASES='[["gradient",800],["",800],["",0]]' node <this> (vite on :8893).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const [ROUTE, DELAY] of JSON.parse(process.env.CASES)) {
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route(/\/(workbenches|scenes|palettes)\/.*Pane\.vue/, async (r) => { await new Promise((z) => setTimeout(z, DELAY)); await r.continue(); });
await ctx.route(/vue\.runtime\.esm-bundler-.*\.js/, async (r) => {
  const res = await r.fetch(); let s = await res.text();
  s = s.replace("if (!isHmrUpdating && leavingVNodesCache[key] === vnode) return;", "if (!isHmrUpdating && leavingVNodesCache[key] === vnode) { console.log('DIAG enter-dropped key=' + key + ' cls=' + el.className); return; } console.log('DIAG enter-run key=' + key);");
  s = s.replace("if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) leavingVNode.el[leaveCbKey]();", "console.log('DIAG beforeEnter key=' + key + ' leaving=' + !!leavingVNode + ' same=' + (leavingVNode===vnode) + ' leavingElHasCb=' + !!(leavingVNode && leavingVNode.el && leavingVNode.el[leaveCbKey]) + ' leavingEl=' + (leavingVNode && leavingVNode.el && leavingVNode.el.nodeName + '.' + (leavingVNode.el.className||'').slice(0,40))); if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) leavingVNode.el[leaveCbKey]();");
  await r.fulfill({ response: res, body: s });
});
const p = await ctx.newPage();
p.on("console", (m) => { if (m.text().startsWith("DIAG enter-dropped")) console.log(m.text().slice(0, 300)); });
await p.goto(`http://localhost:8893/#/${ROUTE}`, { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(3000);
console.log(ROUTE, DELAY, 'stuck=', await p.evaluate(() => document.querySelectorAll('[class*="vj-enter-enter-"]').length));
await ctx.close(); }
await b.close();
