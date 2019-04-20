import { WebComp } from "../web-comp.js";
export class TodoClock extends WebComp {
    get html() {
        return `<span elem="clock"></span>`;
    }
    get time() {
        return this.getAttribute("time");
    }
    set time(value) {
        this.setAttribute("time", value);
    }
    animation() {
        const now = `${(new Date()).toISOString().split(".")[0].replace(/[TZ]/g, " ")} GMT`;
        if (this.time !== now) {
            this.time = now;
        }
        return true;
    }
    static get observedAttributes() {
        return ["time"];
    }
    attributeChangedCallback(name, oldval, newval) {
        const clock = this.dom("clock");
        clock.innerHTML = newval;
    }
}
//# sourceMappingURL=todo-clock.js.map