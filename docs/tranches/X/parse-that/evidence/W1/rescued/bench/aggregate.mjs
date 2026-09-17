import { readFileSync } from "node:fs";
const runs = [1,2,3,4,5].map(i => JSON.parse(readFileSync(`raw-run-${i}.json`,"utf8")));
const med = a => { const s=[...a].sort((x,y)=>x-y); return s[Math.floor(s.length/2)]; };
const keys = runs[0].rows.map(r => `${r.engine}/${r.scenario}`);
console.log("scenario                     ratio_med  ratio_min ratio_max  mbpsPeak_med");
for (const k of keys) {
  const rs = runs.map(run => run.rows.find(r => `${r.engine}/${r.scenario}`===k));
  const ratios = rs.map(r => r.ratio_peak);
  const peaks = rs.map(r => r.mbps.peak);
  console.log(`  ${k.padEnd(26)} ${med(ratios).toFixed(4)}    ${Math.min(...ratios).toFixed(4)}   ${Math.max(...ratios).toFixed(4)}    ${med(peaks).toFixed(1)}`);
}
const jr = runs.map(r=>r.json_normaliser_MBs.peak);
console.log(`\njsonParser peak MB/s across runs: med ${med(jr).toFixed(1)} [${Math.min(...jr).toFixed(1)}, ${Math.max(...jr).toFixed(1)}]`);
const gv = runs.map(r=>r.gate.verdict);
console.log(`gate verdicts across runs: ${gv.join(", ")}`);
const c14s = runs.map(r=>r.gate.assay_sheet_ratio);
const c14v = runs.map(r=>r.gate.assay_value_ratio);
console.log(`C14 assay value ratio: med ${med(c14v).toFixed(4)} [${Math.min(...c14v).toFixed(4)}, ${Math.max(...c14v).toFixed(4)}]`);
console.log(`C14 assay sheet ratio: med ${med(c14s).toFixed(4)} [${Math.min(...c14s).toFixed(4)}, ${Math.max(...c14s).toFixed(4)}]`);
