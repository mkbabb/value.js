// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.mobile · A2-KE-L1-10 measurement (escalated, not cured): ChannelControls hosts
// mounted per scene at 1440x900 (one per channel behind v-show) and the visible one.  usage: DIST=<dist> node mounts.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const route of ["cube", "amiga", "square", "easing", "spring"]) {
  await p.goto(`${srv.url}/#/${route}`, { waitUntil: "load" }); await p.waitForTimeout(2200);
  const m = await p.evaluate(() => { const hosts = [...document.querySelectorAll(".controls-pane-wrapper .controls-surface")]; return { hosts: hosts.length, visible: hosts.filter((e) => e.getBoundingClientRect().height > 0).length, tabpanels: document.querySelectorAll(".controls-pane-wrapper [role=tabpanel]").length }; });
  console.log(`#/${route} controls-surface hosts ${m.hosts} (visible ${m.visible}) tabpanels ${m.tabpanels}`);
}
await b.close(); process.exit(0);
