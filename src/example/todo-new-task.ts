import { WebComp } from "../web-comp.js";

export class TodoNewTask extends WebComp {
    constructor() {
        super();

        const newTask = this.dom("new-task");
        if (newTask) {
            newTask.addEventListener("submit", (e) => {
                e.preventDefault();
                const taskInput = this.dom("task-input") as HTMLInputElement;
                const task = taskInput.value;
                taskInput.value = "";
                this.dispatch("new-task", task);
            });
        }
    }

    get html(): string {
        return `
<todo-row>
    <form elem="new-task">
        <label for="task">New Task:</label>
        <input class="task" name="task" type="text" elem="task-input"></input>
        <div class="ctrl">
            <input class="plus" type="submit" value="➕"></input>
        </div>
    </form>
</todo-row>
`; }

    get css(): string {
        return `
form[elem="new-task"] {
    display: flex;
    align-items: center;
}
form[elem="new-task"] * {
    margin: 0 3px;
}
input.plus {
    padding: .2rem;
    margin: auto 0;
}
input.task {
    flex: 1;
    color: navy;
    padding: .3rem;
    background-color: palegoldenrod;
    border: 2px solid white;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.4);
    border-radius: 7px;
}
.ctrl {
    margin-left: auto;
    font-height: 0.8rem;
}
`; }
}
