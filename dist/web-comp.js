export class WebComp extends HTMLElement {
    constructor() {
        super();
        this.domElems = new Map();
        console.debug("Constructor", this.className);
        this.root = this.attachShadow({ mode: "open" });
        this.root.appendChild(this.render());
        this.mapDom();
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
        let result = this.domElems.get(elem);
        if (!result) {
            this.mapDom();
            result = this.domElems.get(elem);
        }
        return result;
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
            throw new Error(`Element ${elem} not found in ${this.className}. Define elem="${elem}" as attribute in HTML element.`);
        }
    }
    get className() {
        return this.constructor.name;
    }
    get tag() {
        return pascalToKebab(this.className);
    }
    get html() {
        return "";
    }
    get css() {
        return "";
    }
    render() {
        console.debug("Render", this.className);
        const text = markupWith(this.html, this.css);
        const hash = hashCode(this.className + text);
        let template = WebComp.templates.get(hash);
        if (!template) {
            const templateElem = document.createElement("template");
            templateElem.innerHTML = text;
            template = document.importNode(templateElem, true);
            WebComp.templates.set(hash, template);
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
    mapDom() {
        const attribute = "elem";
        this.root.querySelectorAll(`[${attribute}]`).forEach((c) => this.domElems.set(c.getAttribute(attribute), c));
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
function hashCode(s) {
    let hash = 0;
    if (s.length) {
        let i = s.length;
        while (--i) {
            hash = (((hash << 5) - hash) + s.charCodeAt(i)) | 0;
        }
    }
    return "" + hash;
}
//# sourceMappingURL=web-comp.js.map