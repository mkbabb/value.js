import { readFileSync, writeFileSync } from "node:fs";
const runs = [1,2,3,4,5].map(i => JSON.parse(readFileSync(`raw-run-${i}.json`,"utf8")));
const c = runs[2]; // representative canonical run (run 3)
const med = a => { const s=[...a].sort((x,y)=>x-y); return s[Math.floor(s.length/2)]; };
const mn = a => Math.min(...a), mx = a => Math.max(...a);
const keys = c.rows.map(r => `${r.engine}/${r.scenario}`);
const rows = keys.map(k => {
  const rs = runs.map(run => run.rows.find(r => `${r.engine}/${r.scenario}`===k));
  const first = rs[0];
  return {
    engine: first.engine, scenario: first.scenario, kind: first.kind,
    corpus_items: first.corpus_items, corpus_bytes: first.corpus_bytes,
    mbps_peak: { median: med(rs.map(r=>r.mbps.peak)), min: mn(rs.map(r=>r.mbps.peak)), max: mx(rs.map(r=>r.mbps.peak)) },
    mbps_sample_median: { median: med(rs.map(r=>r.mbps.median)) },
    ns_per_call: { median: med(rs.map(r=>r.ns_per_call.median)) },
    ratio_peak: { median: med(rs.map(r=>r.ratio_peak)), min: mn(rs.map(r=>r.ratio_peak)), max: mx(rs.map(r=>r.ratio_peak)) },
    floor: first.floor,
    meets_floor_median: med(rs.map(r=>r.ratio_peak)) >= first.floor,
  };
});
const final = {
  schema: "p3-comparative-bench-aggregate/1",
  generated: new Date().toISOString(),
  invocations: 5,
  samples_per_invocation: c.method.samples,
  inner_iterations_N: c.method.inner_iterations_N,
  machine: c.machine,
  method: c.method,
  corpus: c.corpus,
  subjects: c.subjects,
  json_normaliser_MBs_across_runs: {
    peak_median: med(runs.map(r=>r.json_normaliser_MBs.peak)),
    peak_min: mn(runs.map(r=>r.json_normaliser_MBs.peak)),
    peak_max: mx(runs.map(r=>r.json_normaliser_MBs.peak)),
    doc_reference_MBs: 90,
  },
  rows,
  gate: {
    bar_source: c.gate.bar_source,
    VALUE_RATIO_FLOOR: c.gate.VALUE_RATIO_FLOOR,
    SHEET_RATIO_FLOOR: c.gate.SHEET_RATIO_FLOOR,
    statistic: c.gate.statistic,
    assay: "c14 (@mkbabb/parse-that 1.0.0 combinator prototype)",
    assay_value_ratio_median: med(runs.map(r=>r.gate.assay_value_ratio)),
    assay_value_meets: med(runs.map(r=>r.gate.assay_value_ratio)) >= c.gate.VALUE_RATIO_FLOOR,
    assay_sheet_ratio_median: med(runs.map(r=>r.gate.assay_sheet_ratio)),
    assay_sheet_meets: med(runs.map(r=>r.gate.assay_sheet_ratio)) >= c.gate.SHEET_RATIO_FLOOR,
    verdict_all_runs: runs.map(r=>r.gate.verdict),
    verdict: runs.every(r=>r.gate.verdict==="RED") ? "RED" : (runs.every(r=>r.gate.verdict==="GREEN") ? "GREEN" : "MIXED"),
    calibration_crosscheck: {
      note: "deposed engine on its native historical corpus — the gate's own calibration subject. Documented cured PEAK on the Vite-built dist / 18-core box was ~0.0596 value / ~0.1250 sheet.",
      deposed_value_historical_ratio_median: med(runs.map(r=>r.gate.calibration_crosscheck.deposed_value_historical_ratio)),
      deposed_sheet_historical_ratio_median: med(runs.map(r=>r.gate.calibration_crosscheck.deposed_sheet_historical_ratio)),
      floor_portability: "On THIS machine (M5 Max) + uniform-esbuild build, the deposed calibration subject ITSELF undershoots both floors (~0.046 value / ~0.097 sheet). The absolute floors were calibrated on a Vite-built dist + slower reference box (jsonParser ~90 MB/s vs ~113 here); the co-scaling ratio did not fully hold across this arch+build delta. Absolute-bar transfer to this environment: OWNER-CONFIRM.",
    },
    comparative_reading: {
      note: "assay vs baselines on the identical common corpus + uniform esbuild build (the fair apples-to-apples).",
      value_common_ratio: { live: med(runs.map(r=>r.rows.find(x=>x.engine==='live'&&x.scenario==='value-common').ratio_peak)), deposed: med(runs.map(r=>r.rows.find(x=>x.engine==='deposed'&&x.scenario==='value-common').ratio_peak)), c14: med(runs.map(r=>r.rows.find(x=>x.engine==='c14'&&x.scenario==='value-common').ratio_peak)) },
      sheet_common_ratio: { live: med(runs.map(r=>r.rows.find(x=>x.engine==='live'&&x.scenario==='sheet-common').ratio_peak)), deposed: med(runs.map(r=>r.rows.find(x=>x.engine==='deposed'&&x.scenario==='sheet-common').ratio_peak)), c14: med(runs.map(r=>r.rows.find(x=>x.engine==='c14'&&x.scenario==='sheet-common').ratio_peak)) },
    },
  },
};
writeFileSync("bench-results.json", JSON.stringify(final, null, 2));
console.log("wrote bench-results.json");
console.log("gate verdict:", final.gate.verdict, "| all runs:", final.gate.verdict_all_runs.join(","));
