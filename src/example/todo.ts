import { TodoClock } from "./todo-clock.js";
import { TodoList } from "./todo-list.js";
import { TodoNewTask } from "./todo-new-task.js";
import { TodoRow } from "./todo-row.js";
import { TodoTask } from "./todo-task.js";

export default function todo(): void {
    TodoRow.defineElement();
    TodoTask.defineElement();
    TodoNewTask.defineElement();
    TodoList.defineElement();
    TodoClock.defineElement();

    // ... and the application is running
}
