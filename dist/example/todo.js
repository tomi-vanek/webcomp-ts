import { TodoList } from "./todo-list.js";
import { TodoNewTask } from "./todo-new-task.js";
import { TodoTask } from "./todo-task.js";
export default function todo() {
    TodoTask.defineElement();
    TodoNewTask.defineElement();
    TodoList.defineElement();
}
//# sourceMappingURL=todo.js.map