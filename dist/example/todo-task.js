import { WebComp } from "../web-comp.js";
export class TodoTask extends WebComp {
    constructor() {
        super();
        this.setWithoutValue("task", "done", this.done);
        this.setWithoutValue("done", "checked", this.done);
        const doneButton = this.dom("done");
        doneButton.addEventListener("click", () => {
            this.done = !this.done;
            this.edit = false;
        });
        const editButton = this.dom("edit");
        editButton.addEventListener("click", () => {
            if (!this.done) {
                this.edit = !this.edit;
            }
        });
        const taskInput = this.dom("input");
        taskInput.addEventListener("keypress", (event) => {
            const pressedEnter = event.which === 13 || event.keyCode === 13;
            if (pressedEnter) {
                event.preventDefault();
                this.edit = false;
            }
            return !pressedEnter;
        });
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
        const task = this.dom("task");
        task.innerText = this.task;
        const taskInput = this.dom("input");
        taskInput.value = this.task;
    }
    get done() {
        return this.hasAttribute("done");
    }
    set done(value) {
        this.setWithoutValue(this, "done", value);
        const doneButton = this.dom("done");
        doneButton.innerText = this.done ? "✘" : "✔︎";
    }
    get edit() {
        return this.hasAttribute("edit");
    }
    set edit(value) {
        this.setWithoutValue(this, "edit", value);
        const task = this.dom("task");
        const taskInput = this.dom("input");
        if (this.edit) {
            taskInput.value = task.innerText;
            task.classList.add("hidden");
            taskInput.classList.remove("hidden");
        }
        else {
            task.innerText = taskInput.value;
            task.classList.remove("hidden");
            taskInput.classList.add("hidden");
        }
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
    get html() {
        return `
<todo-row>
    <div class="content">
        <span elem="task">none</span>
        <input type="text" elem="input" class="hidden"></input>
        <div>
            <button elem="done">✔︎</button>
            <button elem="edit">✎</button>
            <button elem="delete">🗑</button>
        </div>
    </div>
</todo-row>
<hr />
`;
    }
    get css() {
        return `
.content {
    display: flex;
    align-items: center;
}
[elem="task"], [elem="input"] {
    flex: 1;
}
[elem="task"] {
    padding: 0.3rem;
}
[elem="task"][done] {
    text-decoration: line-through;
    font-style: italic;
    color: gray;
}
.hidden {
    display: none;
}
[elem="input"] {
    flex: 1;
    color: navy;
    padding: .3rem;
    background-color: palegoldenrod;
    border: 2px solid white;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.4);
    border-radius: 7px;
}
[elem="edit"] {
    transform: scaleX(-1);
}
`;
    }
}
//# sourceMappingURL=todo-task.js.map