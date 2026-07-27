/**
 * GROUND-A · scoreboard printer.
 *
 * Run: npx tsx denominator/report.ts        (add --misses for every failing probe)
 *
 * Prints the numbers the denominator report cites. Nothing here is asserted —
 * `denominator.test.ts` is what locks them.
 */
import { PRODUCTIONS, SECTIONS } from "./productions";
import type { Result, Status } from "./measure";
import { measureAll, scoreboard } from "./measure";

const ORDER: readonly Status[] = ["SHIPS", "DEFERRED", "GAP", "UNSOUND", "CRASH"];

function line(result: Result): string {
    const { production, status, measurements } = result;
    const misses = measurements.filter((m) => !m.matches).length;
    return (
        `${production.id}  T${production.tier}  ${status.padEnd(8)}` +
        `  ${String(measurements.length - misses)}/${measurements.length}` +
        `  ${production.name}`
    );
}

function main(): void {
    const results = measureAll();
    const board = scoreboard(results);
    const byId = new Map(results.map((result) => [result.production.id, result]));

    for (const section of SECTIONS) {
        console.log(`\n§${section.key}  ${section.title}`);
        for (const id of section.ids) {
            const result = byId.get(id);
            if (result) console.log("  " + line(result));
        }
    }

    console.log("\n=== SCOREBOARD ===");
    console.log(`productions = ${board.productions}    probes = ${board.probes}`);
    for (const status of ORDER) console.log(`  ${status.padEnd(9)} ${board.byStatus[status]}`);
    console.log("\nby tier:");
    for (const tier of ["1", "2", "3"] as const) {
        const row = board.byTier[tier];
        const total = ORDER.reduce((sum, status) => sum + row[status], 0);
        console.log(
            `  tier ${tier} (n=${String(total).padStart(2)}): ` +
                ORDER.map((status) => `${status}=${row[status]}`).join("  "),
        );
    }

    if (process.argv.includes("--misses")) {
        console.log("\n=== FAILING PROBES ===");
        for (const result of results) {
            for (const measurement of result.measurements) {
                if (measurement.matches) continue;
                const args =
                    measurement.arg === undefined
                        ? JSON.stringify(measurement.input)
                        : `${JSON.stringify(measurement.input)}, ${JSON.stringify(measurement.arg)}`;
                console.log(
                    `  ${result.production.id} ${result.production.entry}(${args})` +
                        ` owed=${measurement.owed} actual=${measurement.actual}` +
                        ` code=${measurement.code ?? "-"}`,
                );
            }
        }
    }

    const tierOne = results.filter((result) => result.production.tier === 1);
    console.log(
        `\ntier-1 regression surface: ${tierOne.length} productions, ` +
            `${tierOne.reduce((sum, result) => sum + result.measurements.length, 0)} probes` +
            ` (of ${PRODUCTIONS.length} / ${board.probes} total)`,
    );
}

main();
