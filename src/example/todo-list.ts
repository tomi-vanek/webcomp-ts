import { WebComp } from "../web-comp.js";
import { TodoTask } from "./todo-task.js";

export class TodoList extends WebComp {
    constructor() {
        super();

        const taskList = this.dom("task-list");
        if (taskList) {
            this.addEventListener("delete-task", (e: Event) => {
                const detail = (e as CustomEvent<TodoTask>).detail;
                console.debug("delete-task", detail.task);
                taskList.removeChild(detail);
            });

            this.addEventListener("new-task", (e: Event) => {
                const detail = (e as CustomEvent<string>).detail;
                console.debug("new-task", detail);
                const task = detail;
                const taskElem = document.createElement("todo-task") as TodoTask;
                taskElem.task = task;
                taskList.appendChild(taskElem);
            });
        }
    }

    get html() {
        return `
<div class="todo-app-root" elem="todo">
    <slot></slot>
    <div elem="task-list"></div>
    <todo-new-task elem="new-task"></todo-new-task>
</div>
`;
    }

    get css() {
        return `
div.todo-app-root {
    padding: 5px;
    margin: 1rem;
    max-width: 600px;
    background-color: mocasine;
    border: 1px solid grey;
}
`;
    }
}
