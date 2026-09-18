/**
 * Canonical text order for every formation authority.
 *
 * ECMAScript relational comparison is lexicographic over unsigned UTF-16 code
 * units. It is therefore independent of locale, ICU data, normalization and
 * case folding, and returns zero only for exactly equal JavaScript strings.
 * This is the RFC 8785 object-member order, not UTF-8 byte order.
 */
export function compareCanonicalText(left, right) {
    if (typeof left !== "string" || typeof right !== "string") {
        throw new TypeError("canonical text comparison requires two strings");
    }
    return left < right ? -1 : left > right ? 1 : 0;
}

function assertWellFormedUnicode(value) {
    for (let index = 0; index < value.length; index += 1) {
        const code = value.charCodeAt(index);
        if (code >= 0xd800 && code <= 0xdbff) {
            const next = value.charCodeAt(index + 1);
            if (!(next >= 0xdc00 && next <= 0xdfff)) throw new TypeError("lone high surrogate is not valid JCS text");
            index += 1;
        } else if (code >= 0xdc00 && code <= 0xdfff) {
            throw new TypeError("lone low surrogate is not valid JCS text");
        }
    }
}

const utf8 = new TextDecoder("utf-8", { fatal: true });

export function decodeUtf8Strict(source) {
    if (typeof source === "string") return source;
    if (!(source instanceof Uint8Array)) throw new TypeError("strict JSON input must be a string or UTF-8 byte view");
    if (source.length >= 3 && source[0] === 0xef && source[1] === 0xbb && source[2] === 0xbf) {
        throw new SyntaxError("UTF-8 BOM is forbidden in canonical JSON");
    }
    try {
        return utf8.decode(source);
    } catch {
        throw new SyntaxError("malformed UTF-8 is forbidden in canonical JSON");
    }
}

export function canonicalize(value) {
    if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
    if (value && typeof value === "object") {
        const keys = Object.keys(value);
        for (const key of keys) assertWellFormedUnicode(key);
        return `{${keys
            .sort(compareCanonicalText)
            .map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`)
            .join(",")}}`;
    }
    if (typeof value === "string") assertWellFormedUnicode(value);
    return JSON.stringify(value);
}

class StrictJsonParser {
    constructor(source) {
        this.source = source;
        this.index = 0;
    }

    parse() {
        const value = this.value();
        this.space();
        if (this.index !== this.source.length) this.error("trailing input");
        return value;
    }

    error(message) {
        throw new SyntaxError(`${message} at UTF-16 code-unit offset ${this.index}`);
    }

    space() {
        while ([" ", "\t", "\r", "\n"].includes(this.source[this.index])) this.index += 1;
    }

    value() {
        this.space();
        const character = this.source[this.index];
        if (character === "{") return this.object();
        if (character === "[") return this.array();
        if (character === '"') return this.string();
        for (const [literal, value] of [["true", true], ["false", false], ["null", null]]) {
            if (this.source.startsWith(literal, this.index)) {
                this.index += literal.length;
                return value;
            }
        }
        const match = this.source.slice(this.index).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);
        if (match) {
            this.index += match[0].length;
            const value = Number(match[0]);
            if (!Number.isFinite(value)) this.error("JSON number is outside the finite IEEE-754 domain");
            return value;
        }
        this.error("expected JSON value");
    }

    string() {
        const start = this.index;
        this.index += 1;
        while (this.index < this.source.length) {
            const character = this.source[this.index++];
            if (character === "\\") {
                if (this.index >= this.source.length) this.error("unterminated escape");
                this.index += 1;
            } else if (character === '"') {
                const value = JSON.parse(this.source.slice(start, this.index));
                try {
                    assertWellFormedUnicode(value);
                } catch {
                    this.error("lone surrogate is not valid JCS text");
                }
                return value;
            }
        }
        this.error("unterminated string");
    }

    object() {
        this.index += 1;
        const result = Object.create(null);
        const keys = new Set();
        this.space();
        if (this.source[this.index] === "}") {
            this.index += 1;
            return result;
        }
        while (true) {
            this.space();
            if (this.source[this.index] !== '"') this.error("expected object key");
            const key = this.string();
            if (keys.has(key)) this.error(`duplicate object key ${JSON.stringify(key)}`);
            keys.add(key);
            this.space();
            if (this.source[this.index++] !== ":") this.error("expected colon");
            Object.defineProperty(result, key, {
                configurable: true,
                enumerable: true,
                value: this.value(),
                writable: true,
            });
            this.space();
            const separator = this.source[this.index++];
            if (separator === "}") return result;
            if (separator !== ",") this.error("expected comma or closing brace");
        }
    }

    array() {
        this.index += 1;
        const result = [];
        this.space();
        if (this.source[this.index] === "]") {
            this.index += 1;
            return result;
        }
        while (true) {
            result.push(this.value());
            this.space();
            const separator = this.source[this.index++];
            if (separator === "]") return result;
            if (separator !== ",") this.error("expected comma or closing bracket");
        }
    }
}

export function parseJsonStrict(source) {
    return new StrictJsonParser(decodeUtf8Strict(source)).parse();
}

function equal(left, right) {
    return canonicalize(left) === canonicalize(right);
}

function resolveReference(root, reference) {
    if (!reference.startsWith("#/")) throw new Error(`unsupported non-local schema reference ${reference}`);
    return reference
        .slice(2)
        .split("/")
        .map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"))
        .reduce((value, key) => value?.[key], root);
}

export function validateJsonSchema(value, schema, root = schema, pointer = "") {
    const errors = [];
    const at = pointer || "/";
    const add = (message) => errors.push(`${at}: ${message}`);

    if (schema === true) return errors;
    if (schema === false) {
        add("boolean schema rejects this value");
        return errors;
    }

    if (schema.$ref) return validateJsonSchema(value, resolveReference(root, schema.$ref), root, pointer);

    if (schema.oneOf) {
        const branches = schema.oneOf.map((branch) => validateJsonSchema(value, branch, root, pointer));
        const passing = branches.filter((branch) => branch.length === 0);
        if (passing.length !== 1) add(`expected exactly one oneOf branch; matched ${passing.length}`);
    }
    if (schema.allOf) {
        for (const branch of schema.allOf) errors.push(...validateJsonSchema(value, branch, root, pointer));
    }
    if (schema.if) {
        const condition = validateJsonSchema(value, schema.if, root, pointer);
        if (condition.length === 0 && schema.then) errors.push(...validateJsonSchema(value, schema.then, root, pointer));
        if (condition.length !== 0 && schema.else) errors.push(...validateJsonSchema(value, schema.else, root, pointer));
    }
    if (schema.not && validateJsonSchema(value, schema.not, root, pointer).length === 0) {
        add("value matches forbidden not schema");
    }

    if ("const" in schema && !equal(value, schema.const)) add(`must equal ${JSON.stringify(schema.const)}`);
    if (schema.enum && !schema.enum.some((candidate) => equal(value, candidate))) add("value is outside enum");

    if (schema.type) {
        const actual = Array.isArray(value) ? "array" : value === null ? "null" : Number.isInteger(value) ? "integer" : typeof value;
        const accepted = schema.type === "number" && typeof value === "number" ? true : actual === schema.type;
        if (!accepted) {
            add(`expected ${schema.type}; found ${actual}`);
            return errors;
        }
    }

    if (typeof value === "string") {
        if (schema.minLength !== undefined && value.length < schema.minLength) add(`minimum length is ${schema.minLength}`);
        if (schema.pattern && !new RegExp(schema.pattern).test(value)) add(`does not match ${schema.pattern}`);
        if (schema.format === "date-time" && (!value.includes("T") || Number.isNaN(Date.parse(value)))) add("invalid date-time");
    }

    if (typeof value === "number") {
        if (!Number.isFinite(value)) add("number must be finite");
        if (schema.type === "integer" && !Number.isSafeInteger(value)) add("integer must be safe");
        if (schema.minimum !== undefined && value < schema.minimum) add(`minimum is ${schema.minimum}`);
    }

    if (Array.isArray(value)) {
        if (schema.minItems !== undefined && value.length < schema.minItems) add(`minimum item count is ${schema.minItems}`);
        if (schema.uniqueItems && new Set(value.map(canonicalize)).size !== value.length) add("items must be unique");
        if (schema.items) {
            value.forEach((item, index) => errors.push(...validateJsonSchema(item, schema.items, root, `${pointer}/${index}`)));
        }
    } else if (value && typeof value === "object") {
        for (const required of schema.required ?? []) {
            if (!Object.prototype.hasOwnProperty.call(value, required)) errors.push(`${pointer}/${required}: required property missing`);
        }
        const declared = new Set(Object.keys(schema.properties ?? {}));
        for (const [key, child] of Object.entries(value)) {
            const childPointer = `${pointer}/${key}`;
            const propertyDeclared = Object.prototype.hasOwnProperty.call(schema.properties ?? {}, key);
            if (propertyDeclared) errors.push(...validateJsonSchema(child, schema.properties[key], root, childPointer));
            else if (schema.additionalProperties === false || schema.unevaluatedProperties === false) errors.push(`${childPointer}: additional property forbidden`);
            else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
                errors.push(...validateJsonSchema(child, schema.additionalProperties, root, childPointer));
            }
        }
        if (schema.propertyNames?.pattern) {
            const pattern = new RegExp(schema.propertyNames.pattern);
            for (const key of Object.keys(value)) if (!pattern.test(key)) errors.push(`${pointer}/${key}: property name does not match ${schema.propertyNames.pattern}`);
        }
        void declared;
    }

    return errors;
}
