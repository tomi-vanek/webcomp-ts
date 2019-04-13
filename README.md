# WebComp - TypeScript base class for web components

Base class for custom [web components](https://www.webcomponents.org/specs) written in TypeScript.

## Quick start

`npm install webcomp-ts` ... and create your component derived from WebComp base class:

``` TypeScript
import { WebComp } from "../web-comp.js";

export class FooBar extends WebComp {
    constructor() {
        super();
    }

    get html() { return `
<div class="foo">
    <p>This is a custom web component.</p>
</div>
`;
    }

    get css() { return `
.foo {
    background-color: lightyellow;
}
`; }
}
```

The custom web component can be used in HTML:

``` html
<foo-bar></foo-bar>

<script type="module">
    import { FooBar } from "./foo-bar.js";
    FooBar.defineElement();
</script>
```

## Custom components with WebComp base class

The set of W3C Web component standards eliminates need to use any opinionated web framework in development of rich single page web applications. The W3C web component standards are implemented in all major web browsers. Web components work well also on legacy browsers with [polyfill](https://www.webcomponents.org/polyfills).

WebComp base class provides helper functions and boilerplate code that minimizes the code in your custom component. This simplifies and speeds up development of standards-based custom web components: inplementation will contain only relevant code, no "plumbing" and "hacking" code.

## Definition

Custom component extends the base class WebComp

``` TypeScript
export class MyFooBar extends WebComp {
    ...
}
```

Custom component's class name must consist form more words. Component's HTML tag name is determined from the class name: class `MyFooBar` will be registered in browser as `my-foo-bar` tag. The tag is used in HTML as `<my-foo-bar></my-foo-bar>`.

Custom component has parameters `name` with class name, and `tag` with the tag name. These fields are set by base class.

New custom component is "started" with static method `MyFooBar.defineElement()` also inherited from the base class.

## Rendering

Custom element overwrites getter for HTML template and getter for CSS:

``` TypeScript
...
get html { return `
    <div class="content">
        <slot></slot>
        <p elem="task"></p>
    </div>
    <hr />
    <button elem="delete">Delete</button>
`; }

get css() { return `
    .content {
        background-color: silver;
    }
`; }
```

HTML is a template with DOM fragment:

* Fragment may have more elements in root level they do not require wrapping element.

    ```typescript
    <div>Foo Bar</div>
    <hr />
    <button elem="foo-bar">Foo Bar Action</button>
    ```

* Marking of elements with `elem` attribute gives a key for a reference to the HTML element object. Object can be accessed by method `dom`:

    ```typescript
    const task = this.dom("task");
    task.innerText = "Lorem ipsum dolor sit amet.";`
    ```

* Template may contain placeholder for inner content of the custom element in HTML - slot. For example our component can receive in HTML some text content, that will be placed into the slot of the component:

    ``` html
    <my-foo-bar>
        <h1>Deep Dive into Magic</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </my-foo-bar>
    ```

    DOM elements in the component's HTML (h1 and p) will be placed into the default slot. Advanced scenarios may use named slots with more structure data (see [Mozilla article](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) for more inspiration).

## State: HTML element attributes and object parameters

With HTML DOM elements on one side and TypeScript / JavaScript objects on other side there is a dual appearence of the same component. To keep the mental model simple and intuitive, it is practical to keep the public state of the element in DOM attributes. The state is stored in elementar types (string, number, boolean). The component state can be read and written both through DOM API and also through object parameter.

We suggest to use _Attribute getter-setter pattern_:

In custom component we keep both "worlds" bound by getter and setter for each attribute, value is stored in DOM element attribute:

``` typescript
get task(): string {
    return this.getAttribute("task") as string;
}
set task(value: string) {
    this.setAttribute("task", value);
}
```

For Boolean values it is practical to use element attributes without values. Base class offers utility method `setWithoutValue` that keeps also setters for booleans simple single-liners:

``` typescript
get done(): boolean {
    return this.hasAttribute("done");
}
set done(value: boolean) {
    this.setWithoutValue(this, "done", value);
}
```

Component can react to changes of parameters / attributes by listener defined in W3C Custom Elemens standard. The list of attributes watched by the listener is defined by overwritten method `observedAttributes` that returns array of attribute names. Listener is overwritten method `attributeChangedCallback`.

``` typescript
static get observedAttributes() {
    return ["task", "done"];
}
```

``` typescript
protected attributeChangedCallback(name: string, oldval: string, newval: string) {
    switch (name) {
        case "task":
            const task = this.dom("task");
            if (task) {
                task.innerText = newval || "none";
            }
            break;
        case "done":
            const value = newval !== null;
            this.setWithoutValue("task", "done", value);
            this.setWithoutValue("done", "checked", value);
            break;
        default:
            break;
    }
}
```

## Events

Component handles events from its elements. Simplest way to setup the event handlers is by setting event listeners in constructor of the custom component:

``` typescript
const done = this.dom("done") as HTMLInputElement;
done.addEventListener("change", () => (this.done = done.checked));
```

Component communicates with its environment (other elements / JavaScript objects) with standard DOM mechanism - by dispatching standard or custom events. Dispatching means emiting messages that bubble up the DOM tree, until the event is processed. In mini-example app the task element dispatches custom event that is processed by parent element task-list.

We may add event handlers or event listeners also outside of the direct DOM hierarchy may register for listening events by method [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener):

``` typescript
todoTask.addEventListener("done", (e) => {
    console.debug(e);
    ...
});
```

WebComp base class simplifies dispatching of custom events by method `dispatchEvent`:

``` typescript
this.dispatch("delete-task", this);
```

## Usage notes

For development I like to use ES6 modules, but TypeScript struggles to convert "non-relative" imports to ES6 module imports. I use relative inport from node_modules, and add also `.js` extension:

``` typescript
import { WebComp } from "../node_modules/webcomp-ts/dist/web-comp.js";
```

... and it should be

``` typescript
import { WebComp } from "webcomp-ts";
```

For production build I use Rollup, that bundles everything into single JavaScript file - and everything automagically works.

If you would find the right configuration of `tsconfog.json` that allows the module import without dirty hacks, please [let me know](https://github.com/tomi-vanek/webcomp-ts/issues). THANKS in advance.

## Credits

This component aggregates ideas from books

* Ben Farrell: Web Components in Action
* Cory Rylan: Web Component Essentials
