export declare class FunctionValue<T = any, N extends string = string> {
    name: N;
    values: Array<ValueUnit<T> | FunctionValue<T>>;
    constructor(name: N, values: Array<ValueUnit<T> | FunctionValue<T>>);
    setSubProperty(subProperty: any): void;
    setProperty(property: any): void;
    setTargets(targets: HTMLElement[]): void;
    setValue(value: T, index?: number): void;
    valueOf(): any[];
    toString(): string;
    toJSON(): any;
    clone(): FunctionValue<T>;
}

declare const UNITS: readonly ["px", "cm", "mm", "Q", "in", "pc", "pt", "em", "ex", "ch", "rem", "lh", "rlh", "vw", "vh", "vmin", "vmax", "vb", "vi", "svw", "svh", "lvw", "lvh", "dvw", "dvh", "s", "ms", "deg", "rad", "grad", "turn", "%", "dpi", "dpcm", "dppx", "cqw", "var", "calc", "string", "color", "", any];

export declare class ValueArray<T = any> extends Array<ValueUnit<T> | FunctionValue<T>> {
    constructor(...args: Array<ValueUnit<T> | FunctionValue<T>>);
    setSubProperty(subProperty: any): void;
    setProperty(property: any): void;
    setTargets(targets: HTMLElement[]): void;
    setValue(value: T, index?: number): void;
    valueOf(): (any[] | T)[];
    toString(): string;
    toJSON(): any[];
    clone(): ValueArray<T>;
}

export declare class ValueUnit<T = any, U = (typeof UNITS)[number] | string> {
    value: T;
    unit?: U;
    superType?: string[];
    subProperty?: string;
    property?: string;
    targets?: HTMLElement[];
    constructor(value: T, unit?: U, superType?: string[], subProperty?: string, property?: string, targets?: HTMLElement[]);
    setSubProperty(subProperty: any): void;
    setProperty(property: any): void;
    setTargets(targets: HTMLElement[]): void;
    valueOf(): T;
    setValue(value: T): void;
    toString(): string;
    toJSON(): T;
    toFixed(fractionDigits?: number): string;
    clone(): ValueUnit<T>;
    coalesce(right?: ValueUnit, inplace?: boolean): ValueUnit;
}

export { }
