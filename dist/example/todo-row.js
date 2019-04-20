import { WebComp } from "../web-comp.js";
export class TodoRow extends WebComp {
    constructor() {
        super();
    }
    get html() {
        return `
<div class="todo-row">
    <div class="todo-content">
        <slot></slot>
    </div>
</div>
`;
    }
    get css() {
        return `
div.todo-row {
    padding: 5px;
    margin: 0;
    width: auto;
    background-color: lightyellow;
}
div.todo-row div.todo-content {
    display: inline-block;
    margin-right: auto;
}
div.todo-row:hover {
    position: relative;
    top: -1px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
}
div.todo-row:hover > div {
    position: initial;
    top: 0;
    box-shadow: none;
    cursor: initial;
}
`;
    }
}
//# sourceMappingURL=todo-row.js.map