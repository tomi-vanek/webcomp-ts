import { WebComp } from "../web-comp.js";
export class TodoTask extends WebComp {
    constructor() {
        super();
        this.setWithoutValue("task", "done", this.done);
        this.setWithoutValue("done", "checked", this.done);
        const done = this.dom("done");
        done.addEventListener("change", () => (this.done = done.checked));
        const delButton = this.dom("delete");
        delButton.addEventListener("click", () => {
            console.debug(`Deleting "${this.task}"`);
            this.dispatch("delete-task", this);
        });
    }
    get task() {
        return this.getAttribute("task");
    }
    set task(value) {
        this.setAttribute("task", value);
    }
    get done() {
        return this.hasAttribute("done");
    }
    set done(value) {
        this.setWithoutValue(this, "done", value);
    }
    static get observedAttributes() {
        return ["task", "done"];
    }
    attributeChangedCallback(name, oldval, newval) {
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
    html() {
        return `
<div class="todo-task">
    <div class="task" elem="task">Default</div>
    <div class="ctrl">
        <input type="checkbox" elem="done"></input>
        <button elem="delete">🗑</button>
    </div>
</div>
`;
    }
    css() {
        return `
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
`;
    }
}
//# sourceMappingURL=todo-task.js.map