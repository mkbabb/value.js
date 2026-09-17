export function recursiveReturnValidatorArgs({ historicalGateReplay, offline }) {
    if (historicalGateReplay) return ["--historical-certificate"];
    if (offline) return ["--offline"];
    return [];
}
