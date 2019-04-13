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
<div class="todo-task">
    <div class="task" elem="task">Default</div>
    <div class="ctrl">
        <input type="checkbox" elem="done"></input>
        <button elem="delete">🗑</button>
    </div>
</div>
<hr />
`; }

    get css() { return `
div.todo-task {
    padding: 5px;
    margin: 0;
    width: auto;
    background-color: lightyellow;
}
div.todo-task:hover {
    position: relative;
    top: -1px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
}
div.todo-task:hover > div {
    position: initial;
    top: 0;
    box-shadow: none;
    cursor: initial;
}
div.todo-task > div.task {
    display: inline-block;
    margin-right: auto;
}
div.todo-task > div.task[done] {
    text-decoration: line-through;
    font-style: italic;
    color: gray;
}
div.todo-task > div.ctrl {
    float: right;
    margin-left: auto;
}
`; }
}
