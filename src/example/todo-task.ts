import { WebComp } from "../web-comp.js";

export class TodoTask extends WebComp {
    constructor() {
        super();

        this.setWithoutValue("task", "done", this.done);
        this.setWithoutValue("done", "checked", this.done);

        const doneButton = this.dom("done") as HTMLElement;
        doneButton.addEventListener("click", () => {
            this.done = !this.done;
            this.edit = false;
        });

        const editButton = this.dom("edit") as HTMLElement;
        editButton.addEventListener("click", () => {
            if (!this.done) {
                this.edit = !this.edit;
            }
        });

        const taskInput = this.dom("input") as HTMLInputElement;
        taskInput.addEventListener("keypress", (event) => {
            const pressedEnter = event.which === 13 || event.keyCode === 13;
            if (pressedEnter) {
                event.preventDefault();
                this.edit = false;
            }
            return !pressedEnter;
        });

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
        const task = this.dom("task") as HTMLElement;
        task.innerText = this.task;
        const taskInput = this.dom("input") as HTMLInputElement;
        taskInput.value = this.task;
    }

    get done(): boolean {
        return this.hasAttribute("done");
    }
    set done(value: boolean) {
        this.setWithoutValue(this, "done", value);
        const doneButton = this.dom("done") as HTMLElement;
        doneButton.innerText = this.done ? "✘" : "✔︎";
    }

    get edit(): boolean {
        return this.hasAttribute("edit");
    }
    set edit(value: boolean) {
        this.setWithoutValue(this, "edit", value);
        const task = this.dom("task") as HTMLElement;
        const taskInput = this.dom("input") as HTMLInputElement;
        if (this.edit) {
            taskInput.value = task.innerText;
            task.classList.add("hidden");
            taskInput.classList.remove("hidden");
        } else {
            task.innerText = taskInput.value;
            task.classList.remove("hidden");
            taskInput.classList.add("hidden");
        }
    }

    static get observedAttributes(): string[] {
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

    get html(): string {
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
`; }

    get css(): string {
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
`; }
}
