export type DocModule = () => Promise<{ default: any }>;

export interface DocItem {
    name: string;
    path: string;
    module: DocModule;
}
