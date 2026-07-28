import { chromium } from "playwright";

const b = await chromium.launch();
const out = {};

const measure = async (scheme, route, w, h, label) => {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 1, hasTouch: w < 500, isMobile: w < 500 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/" + route, { waitUntil: "networkidle" });
  await p.waitForTimeout(3500);
  const r = await p.evaluate(() => {
    // resolve any CSS color to sRGB bytes via canvas 2D
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    const toRgb = (col) => { cx.clearRect(0,0,1,1); cx.fillStyle = "#000"; cx.fillRect(0,0,1,1); cx.fillStyle = col; cx.fillRect(0,0,1,1); const d = cx.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]]; };
    const Lc = (c)=>{const s=c/255;return s<=0.03928?s/12.92:Math.pow((s+0.055)/1.055,2.4)};
    const lum = (n)=>0.2126*Lc(n[0])+0.7152*Lc(n[1])+0.0722*Lc(n[2]);
    const cr = (a,bb)=>{const A=lum(toRgb(a)),B=lum(toRgb(bb));const hi=Math.max(A,B),lo=Math.min(A,B);return +((hi+0.05)/(lo+0.05)).toFixed(2)};
    const res = { toRgbCheck: toRgb("oklch(44.71% 0.0038 34.6deg)") };

    const console_ = document.querySelector(".config-console");
    if (!console_) return { absent: true, bodyLen: document.body.innerText.length, tabs: [...document.querySelectorAll('[role="tab"],button')].map(e=>e.textContent.trim()).filter(Boolean).slice(0,12) };

    const well = document.querySelector(".console-well");
    const wellBg = getComputedStyle(well).backgroundColor;
    const trackBg = getComputedStyle(console_).getPropertyValue("--slider-track-bg").trim();
    // the actual painted track: find descendant of glass-slider with non-transparent bg
    const gs = console_.querySelector(".glass-slider");
    let painted = [];
    if (gs) {
      for (const n of [gs, ...gs.querySelectorAll("*")]) {
        const c = getComputedStyle(n);
        if (c.backgroundColor !== "rgba(0, 0, 0, 0)" && c.backgroundImage === "none") {
          const rr = n.getBoundingClientRect();
          painted.push({ cls: String(n.className).slice(0,60), slot: n.dataset.slot, bg: c.backgroundColor, w: +rr.width.toFixed(1), h: +rr.height.toFixed(1) });
        } else if (c.backgroundImage !== "none") {
          const rr = n.getBoundingClientRect();
          painted.push({ cls: String(n.className).slice(0,60), slot: n.dataset.slot, bgImage: c.backgroundImage.slice(0,120), w: +rr.width.toFixed(1), h: +rr.height.toFixed(1) });
        }
      }
    }
    res.paintedTrackLayers = painted;
    res.wellBg = wellBg;
    res.trackToken = trackBg;
    res.contrast = {
      trackVsWell: cr(trackBg, wellBg),
      valueInkVsWell: cr(getComputedStyle(console_.querySelector(".font-mono")).color, wellBg),
      sectionTitleVsWell: cr(getComputedStyle(document.querySelector(".config-section-title")).color, wellBg),
      labelVsWell: cr(getComputedStyle(console_.querySelector("label")).color, wellBg),
      thumbBorderVsTrack: cr(getComputedStyle(console_.querySelector('[role="slider"]')).borderColor, trackBg),
    };
    // the Card root
    const card = console_.closest('[class*="glass-"]') || console_.closest("div.relative.w-full.mx-auto");
    if (card) { const c = getComputedStyle(card); const rr = card.getBoundingClientRect();
      res.card = { cls: String(card.className).slice(0,220), tier: card.dataset.tier, surface: card.dataset.surface, bg: c.backgroundColor, backdrop: (c.backdropFilter||c.webkitBackdropFilter), shadow: c.boxShadow.slice(0,60), rect: {w:+rr.width.toFixed(1),h:+rr.height.toFixed(1),x:+rr.x.toFixed(1),y:+rr.y.toFixed(1)} }; }
    // every stacked material inside the pane
    res.materials = [...document.querySelectorAll(".config-console, .console-well, [class*='glass-dock'], [data-slot='dock']")].map(n=>{const c=getComputedStyle(n);return {cls:String(n.className).slice(0,60),bg:c.backgroundColor,backdrop:(c.backdropFilter||c.webkitBackdropFilter)}});
    // scroll
    const sc = document.querySelector(".pane-scroll-fade");
    if (sc) { const c = getComputedStyle(sc); res.scroll = { clientH: sc.clientHeight, scrollH: sc.scrollHeight, hiddenPct: +(100*(1 - sc.clientHeight/sc.scrollHeight)).toFixed(1), mask: (c.maskImage||"none"), wkMask: (c.webkitMaskImage||"none"), contain: c.contain, scrollTimeline: c.scrollTimeline || "n/a" }; }
    // label column x for slider rows vs slot rows (aurora)
    const sliderLabelX = console_.querySelector("label")?.getBoundingClientRect().x;
    const slotLabelX = document.querySelector(".aurora-row-label")?.getBoundingClientRect().x;
    const secTitleX = document.querySelector(".config-section-title")?.getBoundingClientRect().x;
    res.columns = { sliderLabelX, slotLabelX, secTitleX };
    // aurora row label vs section title computed equality
    const arl = document.querySelector(".aurora-row-label");
    if (arl) { const a = getComputedStyle(arl), s = getComputedStyle(document.querySelector(".config-section-title"));
      res.labelSpeciesCollision = { auroraRow: {f:a.fontFamily.split(",")[0],s:a.fontSize,t:a.textTransform,ls:a.letterSpacing,c:a.color}, sectionTitle: {f:s.fontFamily.split(",")[0],s:s.fontSize,t:s.textTransform,ls:s.letterSpacing,c:s.color} }; }
    // action bar
    const bar = document.querySelector(".config-action-bar");
    if (bar) { const rr = bar.getBoundingClientRect(); res.actionBar = { h: +rr.height.toFixed(1), pct: null, buttons: [...bar.querySelectorAll("button")].map(bt=>{const c=getComputedStyle(bt);const q=bt.getBoundingClientRect();return {txt:bt.textContent.trim(),fontSize:c.fontSize,w:+q.width.toFixed(1),h:+q.height.toFixed(1),bg:c.backgroundColor}}) }; }
    // pane + preview areas
    const paneRoot = console_.closest("div.relative.w-full.mx-auto") || console_.closest("div.relative.w-full");
    const pr = paneRoot?.getBoundingClientRect();
    const blob = document.querySelector(".goo-blob-canvas")?.getBoundingClientRect();
    res.areas = { form: pr ? +(pr.width*pr.height).toFixed(0) : null, formWH: pr?[+pr.width.toFixed(1),+pr.height.toFixed(1)]:null, preview: blob ? +(blob.width*blob.height).toFixed(0) : null, previewWH: blob?[+blob.width.toFixed(1),+blob.height.toFixed(1)]:null };
    // readout reflow: measure width of the readout at each legal step of a range
    const mk = (v) => { const sp = document.createElement("span"); sp.className = "truncate text-micro font-mono"; sp.style.position="absolute"; sp.style.visibility="hidden"; sp.textContent = v; console_.appendChild(sp); const w = sp.getBoundingClientRect().width; sp.remove(); return +w.toFixed(2); };
    const fmt = (v) => Number.isInteger(v) ? String(v) : v.toFixed(3);
    const widths = {};
    for (const [name, min, max, step] of [["membrane.noiseFreq",0.5,10,0.1],["tempo",0.25,2.5,0.05],["surface.specShininess",8,64,1],["satellites.mergeDuration",500,5000,100]]) {
      let lo = Infinity, hi = -Infinity, loS="", hiS="";
      for (let v = min; v <= max + 1e-9; v += step) { const s = fmt(+v.toFixed(6)); const w = mk(s); if (w<lo){lo=w;loS=s} if (w>hi){hi=w;hiS=s} }
      widths[name] = { minW: lo, minStr: loS, maxW: hi, maxStr: hiS, deltaPx: +(hi-lo).toFixed(2) };
    }
    res.readoutReflow = widths;
    res.nRows = console_.querySelectorAll(".configurator-row").length;
    res.thumbsUnder24w = [...console_.querySelectorAll('[role="slider"]')].filter(t=>t.getBoundingClientRect().width<24).length;
    return JSON.parse(JSON.stringify(res));
  });
  out[label] = r;
  await ctx.close();
};

await measure("light", "blob", 1440, 900, "blob-1440-light");
await measure("dark", "blob", 1440, 900, "blob-1440-dark");
await measure("light", "atmosphere", 1440, 900, "atmos-1440-light");
await measure("light", "atmosphere", 390, 844, "atmos-390-light");
await measure("light", "blob", 390, 844, "blob-390-light");
console.log(JSON.stringify(out, null, 1));
await b.close();
