const table = { atKeyframes: "map", big: "x".repeat(10) };
function mk(t) { return (s) => (t.atKeyframes + s).repeat(3); }
export const pt = mk(table);
