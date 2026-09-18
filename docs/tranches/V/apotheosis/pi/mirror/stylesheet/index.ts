import { failure } from "../result.js";
import type { ParseResult, Stylesheet } from "../types.js";

export {
    collectAnimationOptions,
    collectCustomFunctions,
    collectDeclarations,
    collectKeyframes,
    collectPropertyDescriptors,
    collectStyleRules,
    collectTimelineOptions,
} from "./collect.js";

export function parseStylesheet(source: string): ParseResult<Stylesheet> {
    return failure(source);
}
