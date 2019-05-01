export class WebComp extends HTMLElement {
    constructor() {
        super();
        this.domElems = new Map();
        console.debug("Constructor", this.name);
        const root = this.attachShadow({ mode: "open" });
        root.appendChild(this.render());
        this.mapDom(root);
        this.runAnimation();
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
            bubbles: true,
            composed: true,
            detail: data,
        }));
    }
    dom(elem) {
        return this.domElems.get(elem);
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
            throw new Error(`Element ${elem} not found in ${this.name}. Define elem="${elem}" as attribute in HTML element.`);
        }
    }
    get name() {
        return this.constructor.name;
    }
    get tag() {
        return pascalToKebab(this.name);
    }
    get html() {
        return "<!-- no visible HTML -->";
    }
    get css() {
        return "/* no visible CSS */";
    }
    render() {
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
    animation() {
        return false;
    }
    runAnimation() {
        requestAnimationFrame(() => {
            if (this.animation()) {
                this.runAnimation();
            }
        });
    }
    mapDom(root) {
        const attribute = "elem";
        root.querySelectorAll(`[${attribute}]`).forEach((c) => this.domElems.set(c.getAttribute(attribute), c));
    }
}
WebComp.templates = new Map();
function classNameOf(obj) {
    return obj
        .toString()
        .split("(" || /s+/)[0]
        .split(" " || /s+/)[1];
}
function pascalToKebab(c) {
    return c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function markupWith(html, css) {
    const cssMarkup = (css && css.length)
        ? `
<style type="text/css">
${css}
</style>
`
        : "";
    return `${html}
${cssMarkup}`;
}
//# sourceMappingURL=web-comp.js.map