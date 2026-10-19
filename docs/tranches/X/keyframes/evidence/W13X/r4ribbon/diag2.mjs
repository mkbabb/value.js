// SERVED MODEL: claude-opus-5-5 — KF.W13X.r4ribbon: which elements carry the ribbon's scrub label (instrument check). Read-only; browser closed in finally.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(process.argv[2] + "#/cube", { waitUntil: "networkidle" });
    await p.waitForTimeout(2500);
    console.log(JSON.stringify(await p.evaluate(() => ({
        labelled: [...document.querySelectorAll('[aria-label="Scrub animation timeline"]')].map((e) => `${e.tagName}.${e.className.toString().slice(0, 40)} role=${e.getAttribute("role")}`),
        rails: document.querySelectorAll(".scrub-rail").length,
        store: localStorage.getItem("animation-groups-control-options-store")?.slice(0, 300),
    })), null, 1));
} finally { await b.close(); }
