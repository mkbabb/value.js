import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const probe = () => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect();
    return { x:+b.x.toFixed(2), y:+b.y.toFixed(2), w:+b.width.toFixed(2), h:+b.height.toFixed(2) }; };
  const fades = [...document.querySelectorAll(".pane-scroll-fade")];
  const info = fades.map((el) => { const t = el.querySelector(".pane-header-title"); const cs = getComputedStyle(el);
    return { title: t ? t.textContent.trim() : null, titleTag: t ? t.tagName : null, rect: r(el),
      scrollH: el.scrollHeight, clientH: el.clientHeight, scrollable: el.scrollHeight > el.clientHeight + 1,
      contain: cs.contain, overflowY: cs.overflowY, ovX: cs.overflowX, radius: cs.borderRadius,
      shadow: cs.boxShadow.slice(0,90), bg: cs.backgroundColor, tag: el.tagName }; });
  const extract = fades.find((el) => { const t = el.querySelector(".pane-header-title"); return t && t.textContent.trim() === "Extract"; });
  const parent = extract ? extract.parentElement : null;
  const grand  = parent ? parent.parentElement : null;
  const wb = extract ? extract.querySelector(".pane-header").nextElementSibling : null;
  const cs = wb ? getComputedStyle(wb) : null;
  const dashed = [...document.querySelectorAll("[class*='border-dashed']")].map((e)=>({rect:r(e)}));
  const ghosts = [...document.querySelectorAll('[aria-hidden="true"]')]
      .filter(e => String(e.className||"").includes("rounded-card")).map(e=>({rect:r(e)}));
  return { vw: innerWidth, vh: innerHeight, panes: info, extractRect: r(extract),
    parentRect: r(parent), parentCls: parent && parent.className, grandCls: grand && grand.className, grandRect: r(grand),
    mainRect: r(document.querySelector("main")),
    wbRect: r(wb), wbCls: wb && wb.className,
    wbPad: cs && [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].join(" "),
    headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(h=>h.tagName+":"+h.textContent.trim().slice(0,28)),
    dashed, ghosts, pulses: document.querySelectorAll(".animate-pulse").length,
    docScrollable: document.documentElement.scrollHeight > innerHeight + 1,
    docScrollH: document.documentElement.scrollHeight };
};

const run = async (w,h,dark,tag) => {
  const b = await webkit.launch();
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:2, colorScheme: dark?"dark":"light" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/extract", { waitUntil:"load" });
  await p.waitForTimeout(3500);
  console.log("### " + tag);
  console.log(JSON.stringify(await p.evaluate(probe), null, 1));
  await p.screenshot({ path: `${OUT}/xD-${tag}.png` });
  await b.close();
};
await run(1440,900,false,"d1440-light");
await run(390,844,false,"m390-light");
