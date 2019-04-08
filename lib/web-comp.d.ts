export declare type Fragment = DocumentFragment | HTMLElement | Node;
export declare abstract class WebComp extends HTMLElement {
    private readonly _domElems;
    private static readonly _templates;
    constructor();
    static defineElement(): void;
    dispatch(event: string, data: any): void;
    dom(elem: string): HTMLElement | undefined;
    setWithoutValue(elem: HTMLElement | string, attr: string, value: boolean): void;
    name(): string;
    tag(): string;
    render(): Fragment;
    protected html(): string;
    protected css(): string;
    private _mapDom;
}
