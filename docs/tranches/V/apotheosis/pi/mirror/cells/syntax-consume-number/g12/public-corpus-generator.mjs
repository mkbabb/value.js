import { readFileSync } from "node:fs";

const signs = ["", "+", "-"];
const mantissas = ["7", "7.5", ".5"];
const exponents = ["", "e2", "E+2", "e-2"];

const leaf = (representation) => ({
    value: Number(representation),
    value_kind: Object.is(Number(representation), -0) ? "negative-zero"
        : Number(representation) === Infinity ? "positive-infinity"
        : Number(representation) === -Infinity ? "negative-infinity"
        : "finite",
    type: representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer",
    sign: representation.startsWith("+") ? "+" : representation.startsWith("-") ? "-" : null,
});

const specials = [
    ["max-binary64", "1.7976931348623157e308x", "1.7976931348623157e308"],
    ["min-subnormal", "5e-324x", "5e-324"],
    ["positive-underflow", "1e-324x", "1e-324"],
    ["negative-underflow", "-1e-324x", "-1e-324"],
    ["positive-overflow", "+1e309x", "+1e309"],
    ["negative-overflow", "-1e309x", "-1e309"],
    ["integer-rounding", "9007199254740993x", "9007199254740993"],
].map(([id, source, representation]) => ({ id, source, offset: 0, representation, end: representation.length, ...leaf(representation) }));

const corpus = {
    schema: "value.pi.syntax-consume-number.g12.public-corpus/v1",
    derivation: {
        oracle: "Cartesian product generated independently from CSS consume-a-number alternatives, followed by Number(representation).",
        expectation: "The harness independently derives representation, end, Number value, type, and sign from these axes; expected observations are not copied from candidate output.",
    },
    success_matrix: { signs, mantissas, exponents, offset_by_sign: { none: 2, "+": 3, "-": 4 } },
    incomplete_exponent_matrix: { signs, mantissas, suffixes: ["e", "e+", "e-"] },
    signed_integer_exponents_required: ["+7e2", "-7e2", "+7E+2", "-7e-2"],
    special_success_cases: specials,
    failure_sources: ["", "+", "-", ".", "+.", "-.", "e1", "+e1", "--1", "+-1", ".e1", "🙂+"],
    hostile_no_throw_sources: ["\u0000", "\ud800", "\udfff", "∞", "1e++2", "1e--2", "+.e2", "-e+2", "9e999999999999999999999999x", "🙂-1e+"],
    predecessor_profiles: ["undefined", "null", "false", "zero", "empty-string", "array", "object"],
    diagnostics_profiles: ["ordinary", "preseeded-ahead"],
    composition_cases: [
        { id: "percentage", source: "+12.5e-1%;", prefix: "", suffix: ";", kind: "percentage", accepts: true, value: 1.25 },
        { id: "dimension", source: "-3.5e2px!", prefix: "", suffix: "!", kind: "dimension", accepts: true, value: -350, unit: "px" },
        { id: "integer-accept", source: "+12!", prefix: "", suffix: "!", kind: "integer", accepts: true, value: 12 },
        { id: "integer-reject", source: "+12e2!", prefix: "", suffix: "!", kind: "integer", accepts: false },
        { id: "delimited", source: "(-.5e+2)", prefix: "(", suffix: ")", kind: "delimited", accepts: true, value: -50 }
    ],
    limits: { subprocess_timeout_ms: 5000, max_stdout_bytes: 1048576, max_stderr_bytes: 1048576 }
};

const rendered = `${JSON.stringify(corpus, null, 2)}\n`;
if (process.argv[2] === "--print") process.stdout.write(rendered);
else if (process.argv[2] === "--verify" && process.argv[3]) {
    if (JSON.stringify(JSON.parse(readFileSync(process.argv[3], "utf8"))) !== JSON.stringify(corpus)) throw new Error("public corpus drift");
    process.stdout.write(`${JSON.stringify({ status: "PASS", generated_successes: signs.length * mantissas.length * exponents.length + signs.length * mantissas.length * 3 + specials.length, signed_integer_exponents: 4 })}\n`);
} else throw new Error("usage: --print | --verify <public-corpus.json>");
