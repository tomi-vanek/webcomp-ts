import { WebComp } from "../web-comp.js";
export declare class TodoClock extends WebComp {
    readonly html: string;
    time: string;
    protected animation(): boolean;
    static readonly observedAttributes: string[];
    protected attributeChangedCallback(name: string, oldval: string, newval: string): void;
}
