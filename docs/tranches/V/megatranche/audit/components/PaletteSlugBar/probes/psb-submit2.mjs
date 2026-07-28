// CHALLENGE-D · run-2 · consequence demonstration for the SearchBar submit defect.
//
// EVIDENCE OF THE CAUSE is the compiled producer source (read directly):
//   node_modules/@mkbabb/glass-ui/dist/search.js — SearchBar is `inheritAttrs: !1`;
//   `o = computed(() => { let {class: _, ...rest} = useAttrs(); return rest })` is
//   spread onto the INNER `<input type="search">`, while the root `<component :is="tag">`
//   receives only `class` and `data-surface`.
//
// THIS SCRIPT demonstrates the CONSEQUENCE of that placement: a <form> whose submit
// listener sits on its inner input instead of on the form itself performs an
// unprevented NATIVE submission. Two arms, identical but for listener placement.
import { webkit } from "playwright";

const browser = await webkit.launch();

for (const arm of ["listener-on-FORM (what the author wrote)", "listener-on-INPUT (what SearchBar produces)"]) {
    const page = await browser.newPage();
    const navs = [];
    page.on("framenavigated", (f) => { if (f === page.mainFrame()) navs.push(f.url()); });
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    navs.length = 0;

    await page.evaluate((onInput) => {
        const host = document.createElement("div");
        host.id = "__f__";
        host.innerHTML = `<form id="__form"><input id="__in" type="search" /><button id="__go" type="submit">go</button></form>`;
        document.body.appendChild(host);
        window.__handled = 0;
        const h = (e) => { window.__handled++; e.preventDefault(); };
        document.getElementById(onInput ? "__in" : "__form").addEventListener("submit", h);
    }, arm.startsWith("listener-on-INPUT"));

    await page.click("#__in");
    await page.type("#__in", "calm-rose-quiet-owl");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1500);

    const r = await page.evaluate(() => ({
        handlerRuns: window.__handled ?? "gone (page navigated)",
        formStillPresent: !!document.getElementById("__form"),
        url: location.href,
    }));
    console.log(`\n===== ${arm} =====`);
    console.log(JSON.stringify(r, null, 2));
    console.log("main-frame navigations after Enter:", JSON.stringify(navs));
    await page.close();
}
await browser.close();
