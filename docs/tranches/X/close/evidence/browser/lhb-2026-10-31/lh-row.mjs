// SERVED MODEL: claude-opus-5-5
// X.W11.lhb (COHESION §0gy.6): one row per Lighthouse collect, with the browser version the LHR itself records.
// usage: node lh-row.mjs <lhr.json>
import { readFileSync } from "node:fs";
const r = JSON.parse(readFileSync(process.argv[2]));
const a = r.audits;
const ua = r.environment.hostUserAgent;
console.log(
    JSON.stringify({
        browser: (ua.match(/(HeadlessChrome|Chrome)\/[\d.]+/) ?? [ua])[0],
        hostUserAgent: ua,
        lighthouse: r.lighthouseVersion,
        mode: r.configSettings.throttlingMethod,
        cpu: r.configSettings.throttling.cpuSlowdownMultiplier,
        benchmarkIndex: r.environment.benchmarkIndex,
        tbt: Math.round(a["total-blocking-time"].numericValue),
        lcp: Math.round(a["largest-contentful-paint"].numericValue),
        cls: a["cumulative-layout-shift"].numericValue,
        perf: r.categories.performance.score,
        a11y: r.categories.accessibility.score,
        longest: (a["long-tasks"].details?.items ?? [])
            .slice(0, 3)
            .map((i) => Math.round(i.duration)),
    }),
);
