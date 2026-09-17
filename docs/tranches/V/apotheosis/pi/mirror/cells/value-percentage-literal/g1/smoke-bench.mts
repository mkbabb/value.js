import { percentageLiteral } from "./candidates/h3/value-unit.ts";
import { priorPercentageParser } from "../g0/benchmark-peers.ts";

const corpus = ["0%", "+12%", "-.5%", "1.25e2%", "-0%", "+.0e-0%", "000%", "1E-2%", "100%", "101%"];

const lanes = {
    h3(iterations: number) {
        let checksum = 0;
        for (let i = 0; i < iterations; i += 1) for (const source of corpus) {
            const state = percentageLiteral.parseState(source);
            if (state.isError || state.offset !== source.length) throw new Error(source);
            checksum += state.value.number.value + source.length;
        }
        return checksum;
    },
    prior(iterations: number) {
        let checksum = 0;
        for (let i = 0; i < iterations; i += 1) for (const source of corpus) {
            const value = priorPercentageParser(source);
            if (value === null) throw new Error(source);
            checksum += value.number.value + source.length;
        }
        return checksum;
    },
};

lanes.h3(10_000);
lanes.prior(10_000);
const ratios = [];
for (let block = 0; block < 20; block += 1) {
    const times: Record<string, number> = {};
    for (const name of block % 2 === 0 ? ["h3", "prior"] as const : ["prior", "h3"] as const) {
        const start = process.hrtime.bigint();
        lanes[name](20_000);
        times[name] = Number(process.hrtime.bigint() - start);
    }
    ratios.push(times.h3! / times.prior!);
}
console.log(JSON.stringify({ ratios, geometricMean: Math.exp(ratios.reduce((sum, ratio) => sum + Math.log(ratio), 0) / ratios.length) }));
