import { Parser, all, any, regex } from "@mkbabb/parse-that/core";
const transactional = <T>(inner: Parser<T>) => new Parser<T>((state) => {
    const saved = state.save();
    const cursor = state["offset"];
    inner.call(state);
    if (state.isError) { state.restore(saved); state.isError = true; }
    return state;
});
const body = all(regex(/[+-]/).opt(), any(regex(/[0-9]+/), regex(/\.[0-9]+/)), regex(/[eE][+-]?[0-9]+/).opt());
export const consumeNumber = transactional(body).map(() => Object.freeze({ sign: null, type: "integer" as const, value: 0 }));
