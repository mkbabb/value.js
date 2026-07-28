// CHALLENGE-C probe C4 — deterministic replay of MixSourceSelector.vue:79-98
// (the "Stable keys for TransitionGroup" mechanism), byte-for-byte.
// Question: after removing chip 0 from [A,B,C], do B and C KEEP their keys?
// If not, TransitionGroup destroys + re-creates every surviving chip.

let swatchKeyCounter = 0;
const swatchKeyMap = new Map();

// computed swatchKeys — MixSourceSelector.vue:81-89
function swatchKeys(selectedColors) {
    return selectedColors.map((sc, i) => {
        const mapKey = `${sc.css}::${i}`;
        if (!swatchKeyMap.has(mapKey)) swatchKeyMap.set(mapKey, swatchKeyCounter++);
        return swatchKeyMap.get(mapKey);
    });
}
// watch pruner — MixSourceSelector.vue:90-98
function prune(selectedColors) {
    const validKeys = new Set(selectedColors.map((sc, i) => `${sc.css}::${i}`));
    for (const key of swatchKeyMap.keys()) if (!validKeys.has(key)) swatchKeyMap.delete(key);
}

const A = { css: "#ff0000", source: "picker" };
const B = { css: "#00ff00", source: "picker" };
const C = { css: "#0000ff", source: "picker" };

const log = [];
let list = [];
// three adds (useMixingState.addColor replaces the array each time)
for (const c of [A, B, C]) {
    list = [...list, c];
    prune(list);
    log.push({ op: `add ${c.css}`, list: list.map((x) => x.css), keys: swatchKeys(list) });
}
const keysBefore = swatchKeys(list);

// removeColor(0) — useMixingState.ts:59-61
list = list.filter((_, i) => i !== 0);
prune(list);
const keysAfter = swatchKeys(list);

log.push({ op: "removeColor(0)", list: list.map((x) => x.css), keys: keysAfter });

const survivorsB = keysBefore[1] === keysAfter[0];
const survivorsC = keysBefore[2] === keysAfter[1];

// Control: what a plain :key="i" would do — B and C keep keys 0 and 1.
const result = {
    log,
    keysBefore,
    keysAfter,
    "B kept its key (patched in place)": survivorsB,
    "C kept its key (patched in place)": survivorsC,
    verdict:
        !survivorsB && !survivorsC
            ? "EVERY surviving chip is re-keyed => TransitionGroup unmounts + remounts all of them (full leave+enter churn). The mechanism is strictly WORSE than :key=\"i\", which patches survivors in place."
            : "keys survived",
    mapSizeAfter: swatchKeyMap.size,
    counterAfter: swatchKeyCounter,
};
console.log(JSON.stringify(result, null, 2));
