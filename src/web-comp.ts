const classNameOf = (obj: any): string =>
    obj
        .toString()
        .split("(" || /s+/)[0]
        .split(" " || /s+/)[1];
const pascalToKebab = (c: string): string => c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const markupWith = (html: string, css: string): string => {
    const cssMarkup = css && css.length ? `
<style>
${css}
</style>
` : "";
    return `${html}
${cssMarkup}`;
};

export type Fragment = DocumentFragment | HTMLElement | Node;

// Base class for Web Components
// has basic boilerplate code to simplify custom element implementation
export abstract class WebComp extends HTMLElement {
    // Cached reference to elements marked with `elem` attribute in HTML markup
    private readonly _domElems: Map<string, HTMLElement> = new Map();

    // Cached templates of derived web components
    private static readonly _templates: Map<string, HTMLTemplateElement> = new Map();

    constructor() {
        super();

        console.debug("Constructor", this.name());

        // Instantiate and attach the shadow root
        const root = this.attachShadow({ mode: "open" });
        root.appendChild(this.render());
        this._mapDom(root);
    }

    // Registering of the custom element - has to be called explicitly for each derived web component
    // i.e. `TodoTask.defineElement();`
    public static defineElement(): void {
        const name = classNameOf(this);
        const tag = pascalToKebab(name);
        if (window.customElements && !window.customElements.get(tag)) {
            if (tag.split("-").length < 2) {
                throw new Error(
                    `Class name must consist from more pascal-case words, "${name}" has only one capital letter.`,
                );
            }
            console.debug("Register", tag, name);
            window.customElements.define(tag, this);
        }
    }

    // Helper function: dispatching custom events with standard DOM communication
    // Event bubbles up the DOM tree
    public dispatch(event: string, data: any): void {
        this.dispatchEvent(
            new CustomEvent(event, {
                detail: data,
                bubbles: true,
                composed: true,
            }),
        );
    }

    // Access to cached elements
    public dom(elem: string): HTMLElement | undefined {
        return this._domElems.get(elem);
    }

    // Helper function: setting attributes of element without value (boolean)
    public setWithoutValue(elem: HTMLElement | string, attr: string, value: boolean): void {
        const e = elem instanceof HTMLElement ? elem : this.dom(elem);
        if (e) {
            if (value) {
                e.setAttribute(attr, "");
            } else {
                e.removeAttribute(attr);
            }
        } else {
            console.debug(`Element ${elem} not found.`);
        }
    }

    // Web component's class name
    public name(): string {
        return this.constructor.name;
    }

    // Web component's tag
    public tag(): string {
        return pascalToKebab(this.name());
    }

    // Render the component as DOM fragment - includes markup from this.html() and this.css()
    public render(): Fragment {
        console.debug("Render", this.name());
        let template = WebComp._templates.get(this.name());
        if (!template) {
            const templateElem = document.createElement("template");
            templateElem.innerHTML = markupWith(this.html(), this.css());
            template = document.importNode(templateElem, true);
            WebComp._templates.set(this.name(), template);
        }
        return template.content.cloneNode(true);
    }

    // HTML markup of the web component
    // overwritten by derived components
    protected html(): string {
        return "<!-- no visible HTML -->";
    }

    // CSS of the web component
    // overwritten by derived components
    protected css(): string {
        return "/* no visible CSS */";
    }

    // Adds all marked elements into elem cache
    private _mapDom(root: ShadowRoot): void {
        const attribute = "elem";
        root.querySelectorAll(`[${attribute}]`).forEach(c =>
            this._domElems.set(c.getAttribute(attribute) as string, c as HTMLElement),
        );
        if (this._domElems.size) {
            console.debug(`Elems in ${this.name()}: ${Array.from(this._domElems.keys()).join(", ")}`);
        }
    }
}
