declare module "*.vue" {
    import type { ComponentOptions } from "vue";

    const Component: ComponentOptions;
    export default Component;
}

declare module "*.md" {
    import type { ComponentOptions } from "vue";

    const Component: ComponentOptions;
    export default Component;
}

declare module "*.glsl?raw" {
    const content: string;
    export default content;
}
