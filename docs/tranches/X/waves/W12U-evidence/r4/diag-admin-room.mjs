// Repair 4 (C5-5): why the overlying /admin/users host reads scroll room 0 at 1440.
// X.W12U.k3 — the falsifier of A2-VA-X-14 (§0fh.6, OVERLYING-HOST-UNBOUNDED-1440),
// two arms (§0fh.6 "the probe keeps both arms"):
//   overlying-with-room — /admin/users (AdminPane, the overlying PaneShell owner,
//     47 seeded users): the `.card-scroll-host` is height-bounded (hostSH > hostCH,
//     the document does not outgrow the viewport), and glass's `<CardHeader shrink>`
//     condenses on THAT host's scroll and returns at its top;
//   seated — /mix (a seated PaneShell): the header sits above its FadingScroll
//     port, owns no `.card-scroll-host`, and keeps its rest form on a port scroll.
// Usage: BASE=http://localhost:9000 node diag-admin-room.mjs [W] [H] [light|dark]
// Prints the raw reading per arm, one GREEN/RED line per arm, then "GREEN n/n" or "RED k".
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const b = await chromium.launch({ channel: "chrome", headless: true });
let red = 0, n = 0;
const check = (arm, ok, reading) => {
    n++;
    if (!ok) red++;
    console.log(`${W}x${H} ${theme} A2-VA-X-14 ${arm} ${ok ? "GREEN" : "RED"} ${JSON.stringify(reading)}`);
};
try {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme });
    const hits = await prepare(ctx, { theme, admin: true, palettes: true, user: true, browse: "ok" });
    const p = await ctx.newPage();
    const read = async (route) => {
        await p.goto(`${BASE}/#${route}`, { waitUntil: "commit", timeout: 600000 });
        await p.waitForTimeout(12000);
        return p.evaluate(async () => {
            const tick = () => new Promise((r) => setTimeout(r, 900));
            const head = [...document.querySelectorAll("main .pane-header")].find((e) => e.getClientRects().length);
            if (!head) return { head: false };
            const host = head.closest(".card-scroll-host");
            const port = host ?? (head.nextElementSibling?.classList.contains("pane-scroll-fade") ? head.nextElementSibling : null);
            const title = head.querySelector(".pane-header-title")?.textContent?.trim();
            const scrollers = [...document.querySelectorAll("main *")].filter((e) => e.scrollHeight > e.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(e).overflowY))
                .map((e) => ({ cls: String(e.className).slice(0, 80), sh: e.scrollHeight, ch: e.clientHeight }));
            const r = { head: true, title, host: !!host, port: !!port, hostSH: host?.scrollHeight, hostCH: host?.clientHeight,
                rows: document.querySelectorAll("main tr, main [role=row]").length, scrollers,
                docSH: document.documentElement.scrollHeight, innerH: innerHeight };
            if (!port) return r;
            const titlePx = () => parseFloat(getComputedStyle(head.querySelector(".pane-header-title")).fontSize);
            r.before = head.getAttribute("data-condensed");
            r.restTitlePx = titlePx();
            port.scrollTop = port.scrollHeight;
            await tick();
            r.after = head.getAttribute("data-condensed");
            r.titlePx = titlePx();
            r.headTop = Math.round(head.getBoundingClientRect().top - port.getBoundingClientRect().top);
            port.scrollTop = 0;
            await tick();
            r.back = head.getAttribute("data-condensed");
            return r;
        });
    };
    const o = await read("/admin/users");
    console.log(JSON.stringify({ W, H, theme, hits, arm: "overlying", ...o }));
    check("overlying-with-room /admin/users", o.head && o.host && o.hostSH > o.hostCH && o.docSH <= o.innerH + 1 &&
        o.before === "false" && o.after === "true" && o.back === "false" && o.titlePx <= o.restTitlePx, { hostSH: o.hostSH, hostCH: o.hostCH, docSH: o.docSH, before: o.before, after: o.after, back: o.back });
    const s = await read("/mix");
    console.log(JSON.stringify({ W, H, theme, arm: "seated", ...s }));
    check("seated /mix", s.head && !s.host && s.port && s.after !== "true" && s.titlePx === s.restTitlePx, { host: s.host, port: s.port, after: s.after, titlePx: s.titlePx, restTitlePx: s.restTitlePx });
    console.log(red ? `RED ${red} (of ${n})` : `GREEN ${n}/${n}`);
} finally { await b.close(); }
