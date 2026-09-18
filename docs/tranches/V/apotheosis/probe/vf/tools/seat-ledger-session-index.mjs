import { compareCanonicalText } from "./json-contract.mjs";

/** Build the formation seat lookup without allowing filesystem order to pick a session. */
export function indexUniqueAgentSessions(rows) {
    const result = new Map();
    const ordered = [...rows].sort((left, right) => compareCanonicalText(left.file, right.file));
    for (const row of ordered) {
        if (typeof row.agent_path !== "string" || row.agent_path === "") {
            throw new Error("session index row has no agent_path");
        }
        if (result.has(row.agent_path)) throw new Error(`duplicate session agent_path ${row.agent_path}`);
        result.set(row.agent_path, row.value);
    }
    return result;
}
