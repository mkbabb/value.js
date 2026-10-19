// shared in-page probe: per-face inline --lit vs the lit the RENDERED DOM geometry implies
export const probe = () => {
  const KL = (() => { const v = [0.45, -0.6, 0.66]; const m = Math.hypot(...v); return v.map(x => x / m); })();
  const lin = (el) => { // linear 3x3 (col-major DOMMatrix) of transform/rotate/scale of el
    const cs = getComputedStyle(el);
    let M = new DOMMatrix();
    if (cs.rotate && cs.rotate !== "none") M = M.multiply(new DOMMatrix(`rotate3d(${cs.rotate.includes(" ")&&cs.rotate.split(" ").length===4?cs.rotate.split(" ").slice(0,3).join(","):"0,0,1"}, ${cs.rotate.split(" ").pop()})`));
    if (cs.transform && cs.transform !== "none") M = M.multiply(new DOMMatrix(cs.transform));
    return M;
  };
  const faces = [...document.querySelectorAll(".cube .cube-side")];
  const root = document.querySelector(".graph")?.parentElement;
  const out = faces.map((f, i) => {
    let M = new DOMMatrix(); let e = f; const chain = [];
    while (e && e !== root) { M = lin(e).multiply(M); if (getComputedStyle(e).transform !== "none") chain.push(e.className.toString().split(" ")[0]); e = e.parentElement; }
    // local outward normal +Z mapped through linear part
    const n = [M.m31, M.m32, M.m33]; const m = Math.hypot(...n); const nn = n.map(x => x / m);
    const d = nn[0]*KL[0] + nn[1]*KL[1] + nn[2]*KL[2];
    const trueLit = Math.min(1, Math.max(0, 0.5 + 0.5 * d));
    return { i, cls: f.className.toString().split(" ")[1], inl: f.style.getPropertyValue("--lit"), cs: getComputedStyle(f).getPropertyValue("--lit").trim(), trueLit: +trueLit.toFixed(2), nz: +nn[2].toFixed(2) };
  });
  const od = document.querySelector(".idle-hover")?.parentElement;
  return { faces: out, orbitStyle: od?.getAttribute("style") || "", graphTf: getComputedStyle(document.querySelector(".graph")).transform,
    anims: document.getAnimations().map(a => `${a.animationName || a.transitionProperty || a.id || "?"}@${(a.effect?.target?.className?.toString()||"").split(" ")[0]}:${a.playState}`) };
};
