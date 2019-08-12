export declare type Fragment = DocumentFragment | HTMLElement | Node;
export declare abstract class WebComp extends HTMLElement {
    static defineElement(): void;
    private static readonly templates;
    private readonly domElems;
    private readonly root;
    constructor();
    dispatch<T>(event: string, data: T): void;
    dom(elem: string): HTMLElement | undefined;
    setWithoutValue(elem: HTMLElement | string, attr: string, value: boolean): void;
    readonly className: string;
    readonly tag: string;
    protected readonly html: string;
    protected readonly css: string;
    render(): Fragment;
    protected animation(): boolean;
    protected runAnimation(): void;
    private mapDom;
}
