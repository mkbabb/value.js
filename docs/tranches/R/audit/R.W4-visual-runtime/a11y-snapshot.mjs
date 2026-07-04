#!/usr/bin/env node
// R.W4 gate-(d) a11y snapshot — aria snapshots of the touched views.
// usage: a11y-snapshot.mjs <baseURL> <outDir>
// Run once against the pre-wave tree (worktree @ d465873, dev server) and
// once against the close tree (built demo) — diff the YAML for parity.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2];
const OUT = process.argv[3];
if (!BASE || !OUT) { console.error("usage: a11y-snapshot.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const VIEWS = ["picker", "browse", "palettes", "extract", "gradient"];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
for (const view of VIEWS) {
    await page.goto(`${BASE}/#/${view}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    const snap = await page.locator("main").last().ariaSnapshot();
    writeFileSync(path.join(OUT, `${view}.yaml`), snap + "\n");
    console.log("snap", view, snap.split("\n").length, "lines");
}
await browser.close();
