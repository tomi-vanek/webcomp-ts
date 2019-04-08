import { TodoTask } from "./todo-task.js";
import { TodoNewTask } from "./todo-new-task.js";
import { TodoList } from "./todo-list.js";
export default function start() {
    TodoTask.defineElement();
    TodoNewTask.defineElement();
    TodoList.defineElement();
}
//# sourceMappingURL=start.js.map