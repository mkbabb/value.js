// SERVED MODEL: claude-opus-5-5 · SS-8 B15-palettes · PalettesPane U-10 (insecure-origin save end state) + PaletteSlugBar U-1 (built CSS cascade).
// U-10: the LAN origin (http://<lan-ip>:9000) is unreachable from this host (curl exit 56 to 10.158.60.99:9000), so the
// insecure-context half is reproduced exactly instead: a non-localhost HTTP origin `http://lan.test:9411` (resolver-mapped to
// 127.0.0.1) served through an in-process Host-rewriting proxy to the dev server — `isSecureContext === false`, the precise
// condition under which `crypto.randomUUID` is undefined. The proxy is closed in finally.
// PSB U-1: the built gh-pages index CSS (dist/gh-pages/assets/index-*.css) is loaded into a blank page; the computed cascade
// of `text-small font-display` is read.
// Usage: node b15-misc.mjs <dist/gh-pages/assets dir>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import net from "node:net";
import { hue } from "./b15-seed.mjs";
const EV = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../evidence/B15-palettes");
const DIST = process.argv[2];
const out = {};
const proxy = http.createServer((req, res) => {
    const up = http.request({ host: "127.0.0.1", port: 9000, path: req.url, method: req.method, headers: { ...req.headers, host: "localhost:9000" } }, (u) => { res.writeHead(u.statusCode, u.headers); u.pipe(res); });
    up.on("error", () => { res.writeHead(502); res.end(); });
    req.pipe(up);
});
proxy.on("upgrade", (req, sock, head) => { const u = net.connect(9000, "127.0.0.1", () => { u.write(`${req.method} ${req.url} HTTP/1.1\r\n` + Object.entries({ ...req.headers, host: "localhost:9000" }).map(([k, v]) => `${k}: ${v}`).join("\r\n") + "\r\n\r\n"); u.write(head); sock.pipe(u).pipe(sock); }); u.on("error", () => sock.destroy()); sock.on("error", () => u.destroy()); });
await new Promise((r) => proxy.listen(9411, "127.0.0.1", r));
const b = await chromium.launch({ args: ["--host-resolver-rules=MAP lan.test 127.0.0.1"] });
const cell = async (name, fn) => { try { out[name] = await fn(); } catch (e) { out[name] = { ERROR: String(e).slice(0, 400) }; } };
try {
    await cell("PP-U10-insecure-save", async () => {
        const res = {};
        for (const origin of ["http://lan.test:9411", "http://localhost:9000"]) {
            const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
            try {
                const cur = hue(5, 10);
                await ctx.addInitScript((c) => { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("color-picker", JSON.stringify({ inputColor: c[4], savedColors: c })); }, cur);
                const p = await ctx.newPage(); const errs = [];
                p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));
                p.on("console", (m) => m.type() === "error" && errs.push("CONSOLE " + m.text().slice(0, 160)));
                await p.goto(origin + "/#/palettes", { timeout: 120000 });
                await p.locator(".dashed-well").first().waitFor({ timeout: 90000 }); await p.waitForTimeout(1500);
                const pre = await p.evaluate(() => ({ secure: isSecureContext, uuid: typeof crypto.randomUUID, swatches: document.querySelectorAll(".swatch-row button[aria-label^='Color swatch']").length }));
                await p.fill("input[aria-label='New palette name']", "LAN save");
                await p.getByRole("button", { name: "Save palette" }).click();
                await p.waitForTimeout(1500);
                const post = await p.evaluate(() => {
                    const app = document.querySelector("#app");
                    const panes = [...document.querySelectorAll("h1")].filter((h) => { const r = h.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight; }).length;
                    let saved = null; try { saved = JSON.parse(localStorage.getItem("color-palettes") ?? "null")?.palettes?.map((x) => x.name); } catch {}
                    return { appHtmlLen: app?.innerHTML.length ?? 0, panesOnScreen: panes, swatches: document.querySelectorAll(".swatch-row button[aria-label^='Color swatch']").length,
                        storedDraft: JSON.parse(localStorage.getItem("color-picker") ?? "{}").savedColors?.length ?? null, savedNames: saved };
                });
                await p.screenshot({ path: path.join(EV, `pp-u10-${origin.includes("lan") ? "insecure" : "localhost"}-after-save.png`) });
                res[origin] = { pre, post, errs: errs.slice(0, 8) };
            } finally { await ctx.close(); }
        }
        return res;
    });
    await cell("PSB-U1-built-css", async () => {
        const css = fs.readdirSync(DIST).filter((f) => /^index-.*\.css$/.test(f));
        const ctx = await b.newContext();
        try {
            const p = await ctx.newPage();
            await p.route("http://built.test/**", (r) => { const f = path.basename(new URL(r.request().url()).pathname);
                return f ? r.fulfill({ status: 200, contentType: "text/css", body: fs.readFileSync(path.join(DIST, f)) })
                    : r.fulfill({ status: 200, contentType: "text/html", body: `<!doctype html><html><head>${css.map((x) => `<link rel=stylesheet href="http://built.test/${x}">`).join("")}</head><body>
                    <span id=a class="text-small font-display">Ag</span> <span id=b class="text-small">Ag</span> <span id=c class="font-display">Ag</span>
                    <div class="font-display"><span id=d class="text-small">Ag</span></div></body></html>` }); });
            await p.goto("http://built.test/");
            const r = await p.evaluate(() => { const cs = (id) => { const s = getComputedStyle(document.getElementById(id)); return { family: s.fontFamily.slice(0, 90), size: s.fontSize, weight: s.fontWeight }; };
                return { cssFiles: [...document.styleSheets].map((s) => s.href), both: cs("a"), textSmallOnly: cs("b"), fontDisplayOnly: cs("c"), textSmallInsideFontDisplayParent: cs("d") }; });
            r.verdict = r.both.family === r.fontDisplayOnly.family ? "font-display WINS (same element)" : r.both.family === r.textSmallOnly.family ? "text-small WINS (same element)" : "neither";
            r.distMtime = fs.statSync(path.join(DIST, css[0])).mtime.toISOString();
            return r;
        } finally { await ctx.close(); }
    });
} finally { await b.close(); await new Promise((r) => proxy.close(r)); proxy.closeAllConnections?.(); }
fs.writeFileSync(path.join(EV, "b15-misc.out.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
