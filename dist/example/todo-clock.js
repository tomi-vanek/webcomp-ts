import { WebComp } from "../web-comp.js";
export class TodoClock extends WebComp {
    get html() {
        return `<span elem="clock"></span>`;
    }
    animation() {
        const clock = this.dom("clock");
        clock.innerHTML = `${(new Date()).toISOString().replace(/[TZ]/g, " ")} GMT`;
        return true;
    }
}
//# sourceMappingURL=todo-clock.js.map