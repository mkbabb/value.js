// CHALLENGE-L r2 — read-only live probe against the running dev server.
// ONE navigation, ONE evaluate. Answers, on the real app:
//   1. does the mounted Vue app have an app.config.errorHandler?
//   2. does anything hold window.onerror?
//   3. where does the ONE onErrorCaptured instance sit relative to the Dock?
//   4. how many DOM subtrees are OUTSIDE <main> (i.e. outside containment)?
// Run: node docs/.../ErrorBoundary/probes-L-r2/live-net.mjs
import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage();
await p.goto("http://localhost:9000/", { waitUntil: "networkidle" });

const out = await p.evaluate(() => {
    const host = document.getElementById("app");
    // Vue stamps __vue_app__ on the mount host.
    const app = host && host.__vue_app__;
    const cfg = app ? app.config : null;

    // Walk the component tree for onErrorCaptured carriers.
    const carriers = [];
    const walk = (inst, depth, path) => {
        if (!inst || depth > 40) return;
        const name = inst.type?.name || inst.type?.__name || "anon";
        if (inst.ec && inst.ec.length) carriers.push({ name, depth, path: path.join(" > ") });
        const sub = inst.subTree;
        const kids = [];
        const collect = (v) => {
            if (!v) return;
            if (Array.isArray(v)) return v.forEach(collect);
            if (v.component) kids.push(v.component);
            else if (Array.isArray(v.children)) v.children.forEach(collect);
        };
        collect(sub);
        kids.forEach((k) => walk(k, depth + 1, [...path, name]));
    };
    if (app?._instance) walk(app._instance, 0, []);

    const main = document.querySelector("main");
    const rootChildren = [...(document.getElementById("app")?.children ?? [])];
    const layout = document.querySelector(".app-layout");
    const layoutKids = layout ? [...layout.children].map((e) => e.tagName.toLowerCase()) : [];

    const total = document.querySelectorAll("#app *").length;
    const contained = main ? main.querySelectorAll("*").length + 1 : 0;

    return {
        containment_coverage: {
            elements_under_app: total,
            elements_inside_main_the_only_guarded_region: contained,
            pct: Math.round((contained / total) * 1000) / 10,
        },
        app_mounted: !!app,
        errorHandler: cfg ? typeof cfg.errorHandler : "no-app",
        warnHandler: cfg ? typeof cfg.warnHandler : "no-app",
        window_onerror: typeof window.onerror,
        onErrorCaptured_carriers: carriers,
        app_layout_children: layoutKids,
        main_present: !!main,
        // Everything under #app that is NOT inside <main> is uncontained.
        uncontained_top_level: rootChildren
            .map((e) => e.tagName.toLowerCase() + (e.className ? "." + String(e.className).split(" ")[0] : ""))
            .filter(Boolean),
    };
});

console.log(JSON.stringify(out, null, 2));
await b.close();
