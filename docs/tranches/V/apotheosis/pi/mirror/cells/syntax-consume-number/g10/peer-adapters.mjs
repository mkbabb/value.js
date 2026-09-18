const leaf = (raw, offset) => ({
    ok: true,
    end: offset + raw.length,
    representation: raw,
    value: Number(raw),
    type: raw.includes(".") || /[eE]/.test(raw) ? "number" : "integer",
    sign: raw.startsWith("+") ? "+" : raw.startsWith("-") ? "-" : null,
});

const adapter = (pattern, finite = false) => (source, offset) => {
    const match = pattern.exec(source.slice(offset));
    if (match === null || (finite && !Number.isFinite(Number(match[0])))) return { ok: false, end: offset };
    return leaf(match[0], offset);
};

export const peers = Object.freeze({
    live_regex: adapter(/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i, true),
    deposed: adapter(/^-?(?:(0|[1-9]\d*)(\.\d+)?|\.\d+)([eE][+-]?\d+)?/),
    c14: adapter(/^[+-]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/),
});

export function observePeer(name, source, offset) {
    const peer = peers[name];
    if (peer === undefined) throw new Error(`unknown peer: ${name}`);
    return peer(source, offset);
}
