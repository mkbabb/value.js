// SERVED MODEL: claude-opus-5-5
import path from "node:path";
import { createServer } from "vite";
import { chromium } from "@playwright/test";
const REPO = "/Users/mkbabb/Programming/value.js";
const t = Date.now();
const server = await createServer({ configFile: path.join(REPO, "vite.config.ts"), mode: "development", root: path.join(REPO, "demo/test/palettes/n-fixtures/harness"), server: { port: 0, host: "127.0.0.1", strictPort: false }, logLevel: "error" });
await server.listen();
const a = server.httpServer.address();
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = []; p.on("pageerror", (e) => errs.push(String(e).slice(0, 200))); p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
await p.goto(`http://127.0.0.1:${a.port}/`, { timeout: 400000 });
console.log("load in", Date.now() - t);
await p.waitForSelector("[role=article][data-case]", { timeout: 120000 }).catch((e) => console.log("nosel", String(e).slice(0, 100)));
console.log("cases", await p.evaluate(() => document.querySelectorAll("[role=article][data-case]").length), "errs", JSON.stringify(errs.slice(0, 5)), "t", Date.now() - t);
await b.close(); await server.close(); process.exit(0);
