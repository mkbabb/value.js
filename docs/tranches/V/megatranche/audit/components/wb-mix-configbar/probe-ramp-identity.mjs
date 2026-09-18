import { mixColors, convertColor } from "/Users/mkbabb/Programming/value.js/dist/subpaths/color.js";
import { parseCssColor, serializeCssColor } from "/Users/mkbabb/Programming/value.js/dist/subpaths/css.js";

const CSS_PICKER_SPACES = new Set(["rgb","hsl","hwb","lab","lch","oklab","oklch","xyz","srgb-linear","display-p3","a98-rgb","prophoto-rgb","rec2020"]);
function vot(r){ if(r.ok) return r.value; throw new Error("THROW:"+r.error.code); }
function parsePicker(s){ const r = parseCssColor(s.trim()); if(r.ok) return r.value; throw new Error("PARSE"); }
function convertPicker(c,sp){ return vot(convertColor(c,sp)); }
function serializePicker(c){ const cc = CSS_PICKER_SPACES.has(c.space)? c : convertPicker(c,"oklch"); return vot(serializeCssColor(cc)); }
function colorToCss(c, out){ return serializePicker(out? convertPicker(c,out): c); }
function parseColorIn(s, sp){ return convertPicker(parsePicker(s), sp); }
function serializeStop(st){ return colorToCss(st,"oklch").replace(/ \/ 1\)$/, ")"); }

const RAMP_SAMPLE_COUNT = 16;
function sampleInterpolationRamp(operandsCss, space, hueMethod, k = RAMP_SAMPLE_COUNT){
  if (operandsCss.length < 2) return null;
  const operands = [];
  for (const css of operandsCss){
    try { operands.push(parseColorIn(css, space)); } catch { return null; }
  }
  const segments = operands.length - 1;
  const perSegment = Math.max(2, Math.ceil(k/segments)+1);
  const stops = [];
  for (let i=0;i<segments;i++){
    for (let j = i===0?0:1; j<perSegment; j++){
      const result = mixColors(operands[i], operands[i+1], j/(perSegment-1), { space, hue: hueMethod });
      if (!result.ok) return null;
      stops.push(serializeStop(result.value));
    }
  }
  return stops;
}

const SPACES = ["oklch","oklab","lab","lch","hsl","hsv","hwb","rgb","xyz"];
const HUES = ["shorter","longer","increasing","decreasing"];
const ops = ["#ff0055", "#0066ff"];

console.log("=== PROBE 1: hue quartet distinctness per space (2 operands) ===");
for (const sp of SPACES){
  const vals = HUES.map(h => { const r = sampleInterpolationRamp(ops, sp, h); return r? r.join("|") : "NULL"; });
  const uniq = new Set(vals);
  console.log("space=" + sp.padEnd(6) + " distinct_hue_ramps=" + uniq.size + "/4 " + (uniq.size===1?"<-- ALL FOUR CHIPS IDENTICAL":""));
}

console.log("");
console.log("=== PROBE 2: default app state (useMixingState colorSpace default = 'oklab') ===");
for (const h of HUES){
  const r = sampleInterpolationRamp(ops, "oklab", h);
  console.log(h.padEnd(11), r[0], "|", r[8], "|", r[16]);
}

console.log("");
console.log("=== PROBE 3: timing — full MixConfigBar computed workload ===");
function fullWork(o){
  const t0 = performance.now();
  const sm = new Map(SPACES.map(s=>[s, sampleInterpolationRamp(o, s, "shorter")]));
  const hm = new Map(HUES.map(m=>[m, sampleInterpolationRamp(o, "oklab", m)]));
  return [performance.now()-t0, sm, hm];
}
for (const n of [2,3,6,12]){
  const o = Array.from({length:n},(_,i)=>"oklch(" + (0.4+0.03*i).toFixed(2) + " 0.2 " + (i*29) + ")");
  fullWork(o);
  let best=Infinity; for(let i=0;i<7;i++){ const t=fullWork(o)[0]; best=Math.min(best,t); }
  const sm = fullWork(o)[1];
  const stopsTotal = SPACES.reduce((a,s)=>a+(sm.get(s)?sm.get(s).length:0),0);
  console.log("operands=" + String(n).padStart(2) + "  spaceRamps+hueRamps = " + best.toFixed(2) + " ms  (space stops total " + stopsTotal + ")");
}

console.log("");
console.log("=== PROBE 4: error paths through serializeStop (UNGUARDED) ===");
const evil = [
  ["none channels", ["rgb(none 0 0)", "rgb(0 0 255)"]],
  ["oklch none hue", ["oklch(0.5 0.2 none)", "oklch(0.7 0.1 200)"]],
  ["transparent", ["transparent", "red"]],
  ["huge oklch", ["oklch(1e9 1e9 1e9)", "red"]],
  ["negative zero", ["rgb(-0 -0 -0)", "white"]],
  ["alpha half", ["#ff000080", "#0000ffff"]],
  ["color() p3", ["color(display-p3 1 0 0)", "blue"]],
  ["identical ops", ["red","red"]],
  ["currentcolor", ["currentcolor","red"]],
  ["empty string", ["","red"]],
  ["whitespace", ["   ","red"]],
  ["gray achromatic", ["#808080","#404040"]]
];
for (const ev of evil){
  const name = ev[0], o = ev[1];
  for (const sp of ["oklch","hsv","xyz","rgb"]){
    try {
      const r = sampleInterpolationRamp(o, sp, "shorter");
      const bad = r && r.some(s=>/NaN|Infinity|undefined/.test(s));
      console.log(name.padEnd(16) + " " + sp.padEnd(6) + " -> " + (r===null?"null":(r.length + " stops")) + (bad?"  *** NaN/Infinity IN STOPS ***":"") + ((r&&!bad)?("  e.g. " + r[1]):""));
    } catch (e) {
      console.log(name.padEnd(16) + " " + sp.padEnd(6) + " -> *** THREW: " + e.message + " ***");
    }
  }
}
