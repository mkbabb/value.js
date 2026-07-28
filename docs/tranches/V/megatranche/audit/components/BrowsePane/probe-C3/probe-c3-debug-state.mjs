/** pass-3 diagnostic: what state is the browse wall actually in? Read-only. */
import { chromium } from "playwright";

const BASE = process.env.PROBE_BASE ?? "http://192.168.1.166:9000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const console_ = [];
page.on("console", (m) => console_.push(`${m.type()}: ${m.text()}`.slice(0, 240)));
page.on("pageerror", (e) => console_.push(`PAGEERROR: ${e.message}`.slice(0, 240)));
const reqs = [];
page.on("request", (r) => reqs.push(r.url()));
page.on("requestfailed", (r) => console_.push(`REQFAIL ${r.url()} :: ${r.failure()?.errorText}`));

await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(6000);

const state = await page.evaluate(() => {
    // walk the app tree for the BrowsePane instance and read its port state
    const root = document.querySelector("#app")?.__vue_app__?._instance;
    const found = [];
    const walk = (n, d = 0) => {
        if (!n || d > 40) return;
        const nm = n.type?.__name ?? n.type?.name;
        if (nm === "BrowsePane") {
            const pm = n.setupState?.pm;
            found.push({
                browsing: pm?.browsing?.value,
                browseError: pm?.browseError?.value,
                remoteRows: pm?.remotePalettes?.value?.length,
                filteredRows: pm?.filteredBrowse?.value?.length,
                displayed: n.setupState?.displayedBrowse?.value?.length,
                hasMore: pm?.hasMore?.value,
                loadingMore: pm?.loadingMore?.value,
                searchQuery: pm?.searchQuery?.value,
                cardRefs: Object.keys(n.setupState?.cardRefs ?? {}).length,
            });
        }
        const kids = n.subTree ? [n.subTree] : [];
        const push = (v) => {
            if (!v) return;
            if (Array.isArray(v)) v.forEach(push);
            else if (v.component) walk(v.component, d + 1);
            else if (v.children) push(v.children);
        };
        kids.forEach(push);
    };
    walk(root);
    return {
        found,
        skeletons: document.querySelectorAll('[aria-label="Loading palette"]').length,
        articles: document.querySelectorAll('[role="article"]').length,
        mainText: document.querySelector("main")?.innerText?.slice(0, 400),
    };
});

console.log(JSON.stringify({ state, reqs: reqs.filter((u) => !u.includes(":9000")), console_ }, null, 2));
await page.screenshot({ path: new URL("./c3-debug-initial.png", import.meta.url).pathname });
await browser.close();
