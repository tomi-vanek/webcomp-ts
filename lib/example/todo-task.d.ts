import { WebComp } from "../web-comp.js";
export declare class TodoTask extends WebComp {
    constructor();
    task: string;
    done: boolean;
    static readonly observedAttributes: string[];
    protected attributeChangedCallback(name: string, oldval: string, newval: string): void;
    html(): string;
    css(): string;
}
