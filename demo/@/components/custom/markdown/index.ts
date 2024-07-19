export { default as Markdown } from "./Markdown.vue";

export interface DocModule {
    default: () => any;
}

export interface DocItem {
    name: string;
    path: string;
    module: DocModule;
}
