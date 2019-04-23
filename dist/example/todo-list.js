import { WebComp } from "../web-comp.js";
export class TodoList extends WebComp {
    constructor() {
        super();
        const taskList = this.dom("task-list");
        if (taskList) {
            this.addEventListener("delete-task", (e) => {
                const detail = e.detail;
                console.debug("delete-task", detail);
                taskList.removeChild(detail);
            });
            this.addEventListener("new-task", (e) => {
                const detail = e.detail;
                console.debug("new-task", detail);
                const task = detail;
                const taskElem = document.createElement("todo-task");
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
//# sourceMappingURL=todo-list.js.map