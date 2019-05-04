import { WebComp } from "../web-comp.js";

export class TodoNewTask extends WebComp {
    constructor() {
        super();

        const newTask = this.dom("new-task");
        if (newTask) {
            newTask.addEventListener("submit", (e) => {
                e.preventDefault();
                const taskInput = this.dom("task-input") as HTMLInputElement;
                const task = taskInput.value || "none";
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
        <input name="task" type="text" elem="task-input"></input>
        <button type="submit">➕</input>
    </form>
</todo-row>
`; }

    get css(): string {
        return `
form {
    display: flex;
    align-items: center;
}
form * {
    margin: 0 3px;
}
input[type="text"] {
    flex: 1;
    color: navy;
    padding: .3rem;
    background-color: palegoldenrod;
    border: 2px solid white;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.4);
    border-radius: 7px;
}
`; }
}
