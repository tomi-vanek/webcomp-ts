const classNameOf = (obj: any): string =>
    obj
        .toString()
        .split("(" || /s+/)[0]
        .split(" " || /s+/)[1];

const pascalToKebab = (c: string): string => c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const markupWith = (html: string, css: string): string => {
    const cssMarkup =
        (css && css.length)
            ? `
<style>
${css}
</style>
`
            : "";
    return `${html}
${cssMarkup}`;
};

export type Fragment = DocumentFragment | HTMLElement | Node;

// Base class for Web Components
// has basic boilerplate code to simplify custom element implementation
export abstract class WebComp extends HTMLElement {
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

    // Cached templates of derived web components
    private static readonly templates: Map<string, HTMLTemplateElement> = new Map();

    // Cached reference to elements marked with `elem` attribute in HTML markup
    private readonly domElems: Map<string, HTMLElement> = new Map();

    constructor() {
        super();
        console.debug("Constructor", this.name);

        // Instantiate and attach the shadow root
        const root = this.attachShadow({ mode: "open" });
        root.appendChild(this.render());
        this._mapDom(root);
    }

    // Helper function: dispatching custom events with standard DOM communication
    // Event bubbles up the DOM tree
    public dispatch(event: string, data: any): void {
        this.dispatchEvent(
            new CustomEvent(event, {
                bubbles: true,
                composed: true,
                detail: data,
            }),
        );
    }

    // Access to cached elements
    public dom(elem: string): HTMLElement | undefined {
        return this.domElems.get(elem);
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
            throw new Error(
                `Element ${elem} not found in ${this.name}. Define elem="${elem}" as attribute in HTML element.`);
        }
    }

    // Web component's class name
    public get name(): string {
        return this.constructor.name;
    }

    // Web component's tag
    public get tag(): string {
        return pascalToKebab(this.name);
    }

    // HTML markup of the web component
    // overwritten by derived components
    protected get html(): string {
        return "<!-- no visible HTML -->";
    }

    // CSS of the web component
    // overwritten by derived components
    protected get css(): string {
        return "/* no visible CSS */";
    }

    // Render the component as DOM fragment.
    // Default implementation combines markup from this.html and this.css
    public render(): Fragment {
        console.debug("Render", this.name);
        let template = WebComp.templates.get(this.name);
        if (!template) {
            const templateElem = document.createElement("template");
            templateElem.innerHTML = markupWith(this.html, this.css);
            template = document.importNode(templateElem, true);
            WebComp.templates.set(this.name, template);
        }
        return template.content.cloneNode(true);
    }

    // Adds all marked elements into elem cache
    private _mapDom(root: ShadowRoot): void {
        const attribute = "elem";
        root.querySelectorAll(`[${attribute}]`).forEach(
            (c) => this.domElems.set(c.getAttribute(attribute) as string, c as HTMLElement));
    }
}
