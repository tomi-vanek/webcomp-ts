import { WebComp } from "../web-comp.js";

export class TodoRow extends WebComp {
    constructor() {
        super();
    }

    get html(): string {
        return `
<div class="row">
    <slot></slot>
</div>
`; }

    get css(): string {
        return `
.row {
    padding: 5px;
    margin: 0;
    background-color: lightyellow;
}
.row:hover {
    position: relative;
    top: -1px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
}
`; }
}
