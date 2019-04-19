import { WebComp } from "../web-comp.js";

export class TodoClock extends WebComp {
    get html() {
        return `<span elem="clock"></span>`;
    }

    protected animation(): boolean {
        const clock = this.dom("clock") as HTMLSpanElement;
        clock.innerHTML = `${(new Date()).toISOString().replace(/[TZ]/g, " ")} GMT`;
        return true;
    }
}
