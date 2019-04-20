import { WebComp } from "../web-comp.js";

export class TodoClock extends WebComp {
    get html() {
        return `<span elem="clock"></span>`;
    }

    get time(): string {
        return this.getAttribute("time") as string;
    }
    set time(value: string) {
        this.setAttribute("time", value);
    }

    protected animation(): boolean {
        const now = `${(new Date()).toISOString().split(".")[0].replace(/[TZ]/g, " ")} GMT`;
        if (this.time !== now) {
            this.time = now;
        }
        return true;
    }

    static get observedAttributes() {
        return ["time"];
    }

    protected attributeChangedCallback(name: string, oldval: string, newval: string) {
        const clock = this.dom("clock") as HTMLSpanElement;
        clock.innerHTML = newval;
    }
}
