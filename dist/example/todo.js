import { TodoClock } from "./todo-clock.js";
import { TodoList } from "./todo-list.js";
import { TodoNewTask } from "./todo-new-task.js";
import { TodoRow } from "./todo-row.js";
import { TodoTask } from "./todo-task.js";
export default function todo() {
    TodoRow.defineElement();
    TodoTask.defineElement();
    TodoNewTask.defineElement();
    TodoList.defineElement();
    TodoClock.defineElement();
}
//# sourceMappingURL=todo.js.map