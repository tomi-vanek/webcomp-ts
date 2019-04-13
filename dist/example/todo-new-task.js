import { WebComp } from "../web-comp.js";
export class TodoNewTask extends WebComp {
    constructor() {
        super();
        const newTask = this.dom("new-task");
        if (newTask) {
            newTask.addEventListener("submit", (e) => {
                e.preventDefault();
                const taskInput = this.dom("task-input");
                const task = taskInput.value;
                taskInput.value = "";
                this.dispatch("new-task", task);
            });
        }
    }
    get html() {
        return `
<div class="todo-task">
    <form name="new-task" elem="new-task">
        <label for="task">New Task:</label>
        <input class="task" name="task" type="text" elem="task-input"></input>
        <div class="ctrl">
            <input class="plus" type="submit" value="➕"></input>
        </div>
    </form>
</div>
`;
    }
    get css() {
        return `
div.todo-task {
    padding: 5px;
    margin: 0;
    width: auto;
    background-color: lightyellow;
}
div.todo-task > div.task {
    display: inline-block;
    margin-right: auto;
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
input.plus {
    padding: .2rem;
    margin: auto 0;
}
input.task {
    display: inline;
    color: navy;
    width: 45%;
    padding: .3rem;
    background-color: palegoldenrod;
    border: 2px solid white;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.4);
    border-radius: 7px;
}
div.ctrl {
    float: right;
    margin-left: auto;
    font-height: 0.8rem;
}
`;
    }
}
//# sourceMappingURL=todo-new-task.js.map