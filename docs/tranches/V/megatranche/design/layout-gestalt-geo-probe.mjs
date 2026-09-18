import { webkit } from "playwright";

const VPS = [
    { l: "390", w: 390, h: 844 },
    { l: "1440", w: 1440, h: 900 },
    { l: "2560", w: 2560, h: 1440 },
    { l: "3440", w: 3440, h: 1440 },
];
const ROUTES = ["#/", "#/blob"];

const b = await webkit.launch();
const rows = [];
for (const vp of VPS) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h } });
    const p = await ctx.newPage();
    for (const r of ROUTES) {
        await p.goto("http://localhost:9000/" + r, { waitUntil: "load" });
        await p.waitForTimeout(2200);
        const m = await p.evaluate(() => {
            const de = document.documentElement;
            const cs = getComputedStyle(de);
            const rect = (s) => {
                const e = document.querySelector(s);
                if (!e) return null;
                const b = e.getBoundingClientRect();
                return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
            };
            // union of painted content inside main
            const main = document.querySelector("main");
            let ux0 = 1e9, uy0 = 1e9, ux1 = -1e9, uy1 = -1e9, n = 0;
            if (main) {
                for (const e of main.querySelectorAll("*")) {
                    const s = getComputedStyle(e);
                    if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) continue;
                    const bb = e.getBoundingClientRect();
                    if (bb.width < 2 || bb.height < 2) continue;
                    ux0 = Math.min(ux0, bb.left); uy0 = Math.min(uy0, bb.top);
                    ux1 = Math.max(ux1, bb.right); uy1 = Math.max(uy1, bb.bottom);
                    n++;
                }
            }
            return {
                vw: innerWidth, vh: innerHeight,
                contentMaxH: cs.getPropertyValue("--content-max-h").trim(),
                paneMax: cs.getPropertyValue("--pane-max").trim(),
                padX: cs.getPropertyValue("--app-padding-x").trim(),
                dockGap: cs.getPropertyValue("--dock-gap").trim(),
                layout: document.querySelector(".app-layout")?.dataset.layout ?? null,
                appLayout: rect(".app-layout"),
                dockBand: rect(".dock-band"),
                paneMain: rect(".pane-main"),
                paneContainer: rect(".pane-container"),
                gridCols: (() => { const e = document.querySelector(".pane-container"); return e ? getComputedStyle(e).gridTemplateColumns : null; })(),
                configRows: document.querySelectorAll(".config-console [role=slider]").length,
                configConsole: !!document.querySelector(".config-console"),
                textLen: (document.body.innerText || "").replace(/\s+/g, " ").trim().length,
                unionCount: n,
                union: n ? { x: +ux0.toFixed(1), y: +uy0.toFixed(1), w: +(ux1 - ux0).toFixed(1), h: +(uy1 - uy0).toFixed(1) } : null,
                docScrollable: document.documentElement.scrollHeight - document.documentElement.clientHeight,
            };
        });
        rows.push({ vp: vp.l, route: r, ...m });
    }
    await ctx.close();
}
await b.close();

for (const r of rows) {
    const wCov = r.paneContainer ? ((r.paneContainer.w / r.vw) * 100).toFixed(1) : "-";
    const uwCov = r.union ? ((r.union.w / r.vw) * 100).toFixed(1) : "-";
    const uhCov = r.union ? ((r.union.h / r.vh) * 100).toFixed(1) : "-";
    const scene = r.paneMain ? r.paneMain.h : 0;
    const pcHcov = r.paneContainer && scene ? ((r.paneContainer.h / scene) * 100).toFixed(1) : "-";
    console.log(
        `${r.vp.padEnd(5)} ${r.route.padEnd(7)} layout=${String(r.layout).padEnd(7)} ` +
        `pc=${r.paneContainer ? r.paneContainer.w + "x" + r.paneContainer.h : "-"} ` +
        `wCov=${wCov}% unionW=${uwCov}% unionH=${uhCov}% pcH/scene=${pcHcov}% ` +
        `cmh=${r.contentMaxH} cols=${r.gridCols} cfg=${r.configConsole}/${r.configRows} text=${r.textLen} scroll=${r.docScrollable}`
    );
}
console.log("\nRAW\n" + JSON.stringify(rows, null, 1));
