const classNameOf = (obj) => obj
    .toString()
    .split("(" || /s+/)[0]
    .split(" " || /s+/)[1];
const pascalToKebab = (c) => c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const markupWith = (html, css) => {
    const cssMarkup = css && css.length ? `
<style>
${css}
</style>
` : "";
    return `${html}
${cssMarkup}`;
};
export class WebComp extends HTMLElement {
    constructor() {
        super();
        this._domElems = new Map();
        console.debug("Constructor", this.name());
        const root = this.attachShadow({ mode: "open" });
        root.appendChild(this.render());
        this._mapDom(root);
    }
    static defineElement() {
        const name = classNameOf(this);
        const tag = pascalToKebab(name);
        if (window.customElements && !window.customElements.get(tag)) {
            if (tag.split("-").length < 2) {
                throw new Error(`Class name must consist from more pascal-case words, "${name}" has only one capital letter.`);
            }
            console.debug("Register", tag, name);
            window.customElements.define(tag, this);
        }
    }
    dispatch(event, data) {
        this.dispatchEvent(new CustomEvent(event, {
            detail: data,
            bubbles: true,
            composed: true,
        }));
    }
    dom(elem) {
        return this._domElems.get(elem);
    }
    setWithoutValue(elem, attr, value) {
        const e = elem instanceof HTMLElement ? elem : this.dom(elem);
        if (e) {
            if (value) {
                e.setAttribute(attr, "");
            }
            else {
                e.removeAttribute(attr);
            }
        }
        else {
            console.debug(`Element ${elem} not found.`);
        }
    }
    name() {
        return this.constructor.name;
    }
    tag() {
        return pascalToKebab(this.name());
    }
    render() {
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
    html() {
        return "<!-- no visible HTML -->";
    }
    css() {
        return "/* no visible CSS */";
    }
    _mapDom(root) {
        const attribute = "elem";
        root.querySelectorAll(`[${attribute}]`).forEach(c => this._domElems.set(c.getAttribute(attribute), c));
        if (this._domElems.size) {
            console.debug(`Elems in ${this.name()}: ${Array.from(this._domElems.keys()).join(", ")}`);
        }
    }
}
WebComp._templates = new Map();
//# sourceMappingURL=web-comp.js.map