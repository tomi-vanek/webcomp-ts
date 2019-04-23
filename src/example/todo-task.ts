import { WebComp } from "../web-comp.js";

export class TodoTask extends WebComp {
    constructor() {
        super();

        this.setWithoutValue("task", "done", this.done);
        this.setWithoutValue("done", "checked", this.done);

        const done = this.dom("done") as HTMLInputElement;
        done.addEventListener("change", () => (this.done = done.checked));

        const delButton = this.dom("delete") as HTMLElement;
        delButton.addEventListener("click", () => {
            console.debug(`Deleting "${this.task}"`);
            this.dispatch("delete-task", this);
        });
    }

    get task(): string {
        return this.getAttribute("task") as string;
    }
    set task(value: string) {
        this.setAttribute("task", value);
    }

    get done(): boolean {
        return this.hasAttribute("done");
    }
    set done(value: boolean) {
        this.setWithoutValue(this, "done", value);
    }

    static get observedAttributes() {
        return ["task", "done"];
    }

    protected attributeChangedCallback(name: string, oldval: string, newval: string) {
        console.debug(`Value of ${name} changed form "${oldval}" to "${newval}"`);
        switch (name) {
            case "task":
                const task = this.dom("task");
                if (task) {
                    task.innerText = newval || "none";
                }
                break;
            case "done":
                const value = newval !== null;
                this.setWithoutValue("task", "done", value);
                this.setWithoutValue("done", "checked", value);
                break;
            default:
                break;
        }
    }

    get html() { return `
<todo-row>
    <div class="content">
        <span class="task" elem="task">none</span>
        <input type="checkbox" elem="done"></input>
        <button elem="delete">🗑</button>
    </div>
</todo-row>
<hr />
`; }

    get css() { return `
.content {
    display: flex;
}
.task[elem="task"] {
    flex: 1;
}
.task[done] {
    text-decoration: line-through;
    font-style: italic;
    color: gray;
}
`; }
}
